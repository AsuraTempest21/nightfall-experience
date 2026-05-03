import { z } from "zod";

export const reservationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email is too long")
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^[+\d\s-]+$/, "Please enter a valid phone number")
    .trim(),
  date: z
    .string()
    .min(1, "Please select a date")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  time: z
    .string()
    .min(1, "Please select a time")
    .regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format"),
  guests: z.coerce
    .number()
    .int()
    .min(1, "At least 1 guest required")
    .max(20, "For parties over 20, please call us directly"),
  specialRequests: z
    .string()
    .max(500, "Special requests must be under 500 characters")
    .trim()
    .optional()
    .default(""),
  captchaToken: z.string().optional().default(""),
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;

export const reservationDefaultValues: ReservationFormValues = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: 2,
  specialRequests: "",
  captchaToken: "",
};