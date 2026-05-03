import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CloudflareTurnstile from "@/components/CloudflareTurnstile";
import { config } from "@/lib/config";
import {
  reservationDefaultValues,
  reservationSchema,
  type ReservationFormValues,
} from "@/lib/reservation";
import { useCreateReservation } from "@/hooks/use-reservation";

const guestOptions = Array.from({ length: 20 }, (_, index) => index + 1);

const ReservationForm = () => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const createReservation = useCreateReservation();
  const captchaEnabled = Boolean(config.captcha.turnstileSiteKey);

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: reservationDefaultValues,
  });

  useEffect(() => {
    form.setValue("captchaToken", captchaToken ?? "", {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [captchaToken, form]);

  const onSubmit = async (values: ReservationFormValues) => {
    if (captchaEnabled && !captchaToken) {
      toast.error("Please complete the CAPTCHA before submitting.");
      return;
    }

    try {
      await createReservation.mutateAsync({
        ...values,
        captchaToken: captchaToken ?? undefined,
      });

      toast.success("Reservation request submitted", {
        description: "We’ll contact you shortly to confirm your table.",
      });

      form.reset(reservationDefaultValues);
      setCaptchaToken(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit reservation.";
      toast.error("Reservation failed", { description: message });
    }
  };

  const isSubmitting = createReservation.isPending;

  return (
    <section className="rounded-sm border border-border/60 bg-card/90 p-6 md:p-8 shadow-sm">
      <div className="mb-6">
        <p className="section-heading mb-3">Reserve Online</p>
        <h2 className="font-heading text-2xl md:text-3xl text-foreground uppercase tracking-[0.12em]">
          Request a Table
        </h2>
        <div className="gold-divider-left mt-4" />
      </div>

      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Name</span>
            <Input
              {...form.register("name")}
              placeholder="Your name"
              autoComplete="name"
            />
            {form.formState.errors.name && (
              <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
            )}
          </label>

          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Email</span>
            <Input
              {...form.register("email")}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
            {form.formState.errors.email && (
              <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
            )}
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Phone</span>
            <Input
              {...form.register("phone")}
              type="tel"
              placeholder="+91 98765 43210"
              autoComplete="tel"
            />
            {form.formState.errors.phone && (
              <p className="text-xs text-destructive">{form.formState.errors.phone.message}</p>
            )}
          </label>

          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Guests</span>
            <select
              {...form.register("guests", { valueAsNumber: true })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {guestOptions.map((guestCount) => (
                <option key={guestCount} value={guestCount}>
                  {guestCount} {guestCount === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
            {form.formState.errors.guests && (
              <p className="text-xs text-destructive">{form.formState.errors.guests.message}</p>
            )}
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Date</span>
            <Input
              {...form.register("date")}
              type="date"
              min={new Date().toISOString().split("T")[0]}
            />
            {form.formState.errors.date && (
              <p className="text-xs text-destructive">{form.formState.errors.date.message}</p>
            )}
          </label>

          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Time</span>
            <Input {...form.register("time")} type="time" />
            {form.formState.errors.time && (
              <p className="text-xs text-destructive">{form.formState.errors.time.message}</p>
            )}
          </label>
        </div>

        <label className="space-y-2 block">
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Special Requests
          </span>
          <Textarea
            {...form.register("specialRequests")}
            placeholder="Birthday, anniversary, dietary needs..."
            className="min-h-[120px]"
          />
          {form.formState.errors.specialRequests && (
            <p className="text-xs text-destructive">
              {form.formState.errors.specialRequests.message}
            </p>
          )}
        </label>

        <div className="rounded-sm border border-border/60 bg-background/70 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
            Verification
          </p>
          <CloudflareTurnstile
            siteKey={config.captcha.turnstileSiteKey}
            onTokenChange={setCaptchaToken}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || (captchaEnabled && !captchaToken)}
          className="w-full uppercase tracking-[0.18em]"
        >
          {isSubmitting ? "Submitting..." : "Request Reservation"}
        </Button>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Parties over 20 should call us directly for private arrangements.
        </p>
      </form>
    </section>
  );
};

export default ReservationForm;