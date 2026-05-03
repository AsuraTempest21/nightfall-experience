import { useMutation } from "@tanstack/react-query";
import { config } from "@/lib/config";
import type { ReservationFormValues } from "@/lib/reservation";

interface ReservationResponse {
  message: string;
  reservation: {
    id: number;
    name: string;
    email: string;
    date: string;
    time: string;
    status: string;
  };
}

interface ReservationError {
  error: string;
  details?: Record<string, string[]>;
}

export type ReservationInput = ReservationFormValues;

/**
 * Mutation hook for creating a reservation via the backend API.
 */
async function createReservation(
  data: ReservationInput
): Promise<ReservationResponse> {
  const res = await fetch(`${config.api.baseUrl}/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => null)) as ReservationError | null;
    const error = new Error(err?.error ?? "Reservation failed");
    if (err?.details) {
      (error as Error & { details?: Record<string, string[]> }).details = err.details;
    }
    throw error;
  }

  return res.json();
}

export function useCreateReservation() {
  return useMutation<ReservationResponse, Error, ReservationInput>({
    mutationFn: createReservation,
  });
}
