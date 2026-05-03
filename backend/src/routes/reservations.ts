import { Router } from "express";
import { db, sqlite } from "../db/index.js";
import { reservations } from "../db/schema.js";
import { reservationSchema } from "../validators/reservation.js";
import { and, eq } from "drizzle-orm";

const router = Router();

// Maximum concurrent reservations per time slot
const MAX_PER_SLOT = 10;

type TurnstileVerificationResponse = {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

async function verifyCaptchaToken(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();

  if (!secret) {
    return { skipped: true as const, success: true as const };
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret,
      response: token,
    }),
  });

  if (!response.ok) {
    return { skipped: false as const, success: false as const };
  }

  const payload = (await response.json()) as TurnstileVerificationResponse;
  return {
    skipped: false as const,
    success: payload.success,
    errorCodes: payload["error-codes"] ?? [],
  };
}

/**
 * POST /api/reservations
 * Creates a new reservation with strict validation and double-booking prevention.
 */
router.post("/", async (req, res) => {
  // Phase 3.1: Validate input with zod
  const parsed = reservationSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: "Validation failed",
      details: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  const data = parsed.data;

  const captchaToken = data.captchaToken?.trim();
  const captchaSecret = process.env.TURNSTILE_SECRET_KEY?.trim();

  if (captchaSecret && !captchaToken) {
    res.status(400).json({
      error: "Please complete the CAPTCHA before submitting your reservation.",
      details: { captchaToken: ["CAPTCHA is required."] },
    });
    return;
  }

  if (captchaSecret && captchaToken) {
    const captchaResult = await verifyCaptchaToken(captchaToken);

    if (!captchaResult.success) {
      res.status(400).json({
        error: "CAPTCHA verification failed. Please try again.",
        details: { captchaToken: captchaResult.errorCodes ?? ["Verification failed"] },
      });
      return;
    }
  }

  // Phase 3.4: Sanitize free-text input (strip HTML tags)
  const sanitizedRequests = data.specialRequests
    ? data.specialRequests.replace(/<[^>]*>/g, "").trim()
    : "";

  try {
    // Transactional double-booking prevention (Phase 2.3)
    // SQLite serialises writes, but we use a transaction for atomicity
    const result = sqlite.transaction(() => {
      // Count existing reservations for this date+time
      const existing = db
        .select()
        .from(reservations)
        .where(
          and(
            eq(reservations.date, data.date),
            eq(reservations.time, data.time),
            eq(reservations.status, "pending")
          )
        )
        .all();

      if (existing.length >= MAX_PER_SLOT) {
        return { error: "time_slot_full" as const };
      }

      // Insert the reservation
      const inserted = db
        .insert(reservations)
        .values({
          name: data.name,
          email: data.email,
          phone: data.phone,
          date: data.date,
          time: data.time,
          guests: data.guests,
          specialRequests: sanitizedRequests,
          status: "pending",
        })
        .returning()
        .get();

      return { reservation: inserted };
    })();

    if ("error" in result) {
      res.status(409).json({
        error: "This time slot is fully booked. Please select a different time.",
      });
      return;
    }

    res.status(201).json({
      message: "Reservation created successfully",
      reservation: result.reservation,
    });
  } catch (error) {
    console.error("[POST /api/reservations] Error:", error);
    res.status(500).json({ error: "Failed to create reservation" });
  }
});

export default router;
