import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Check } from "lucide-react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import type { EventItem, TicketOption } from "@/data/eventsData";

interface EventBookingModalProps {
  event: EventItem | null;
  onClose: () => void;
}

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Enter a valid phone"),
  notes: z.string().trim().max(300).optional(),
});

const EventBookingModal = ({ event, onClose }: EventBookingModalProps) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (event) {
      const init: Record<string, number> = {};
      event.tickets.forEach((t, i) => (init[t.label] = i === 0 ? 1 : 0));
      setQuantities(init);
      setForm({ name: "", email: "", phone: "", notes: "" });
      setErrors({});
      setSubmitted(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [event]);

  const total = useMemo(() => {
    if (!event) return 0;
    return event.tickets.reduce(
      (sum, t) => sum + (quantities[t.label] ?? 0) * t.price,
      0
    );
  }, [event, quantities]);

  const totalTickets = useMemo(
    () => Object.values(quantities).reduce((a, b) => a + b, 0),
    [quantities]
  );

  const updateQty = (t: TicketOption, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [t.label]: Math.max(0, Math.min(20, (prev[t.label] ?? 0) + delta)),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    if (totalTickets === 0) {
      toast({
        title: "Select at least one ticket",
        description: "Please add at least one ticket to continue.",
        variant: "destructive",
      });
      return;
    }

    const parsed = bookingSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      Object.entries(parsed.error.flatten().fieldErrors).forEach(([k, v]) => {
        if (v && v[0]) fieldErrors[k] = v[0];
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    toast({
      title: "Booking Confirmed",
      description: `Your reservation for ${event.title} is secured. We'll be in touch shortly.`,
    });
  };

  return (
    <AnimatePresence>
      {event && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-background/85 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-card border border-border/60 rounded-sm shadow-[0_0_50px_-10px_hsl(var(--primary)/0.25)] pointer-events-auto">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="p-6 md:p-8 space-y-6">
                {!submitted ? (
                  <>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-primary/60 mb-2">
                        Reserve Your Spot
                      </p>
                      <h2 className="font-heading text-xl md:text-2xl uppercase tracking-[0.1em] text-foreground">
                        {event.title}
                      </h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        {event.day}, {event.date} · {event.time}
                      </p>
                    </div>

                    <div className="gold-divider-left" />

                    {/* Tickets */}
                    <div className="space-y-3">
                      <p className="section-heading">Select Tickets</p>
                      {event.tickets.map((t) => (
                        <div
                          key={t.label}
                          className="flex items-center justify-between gap-3 p-3 bg-muted/20 border border-border/40 rounded-sm"
                        >
                          <div className="min-w-0">
                            <p className="text-sm text-foreground font-medium truncate">
                              {t.label}
                            </p>
                            <p className="text-[11px] text-muted-foreground truncate">
                              {t.perks}
                            </p>
                            <p className="text-xs text-primary mt-0.5">
                              ₹{t.price.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => updateQty(t, -1)}
                              className="w-8 h-8 flex items-center justify-center border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
                              aria-label="Decrease"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center text-sm text-foreground">
                              {quantities[t.label] ?? 0}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(t, 1)}
                              className="w-8 h-8 flex items-center justify-center border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
                              aria-label="Increase"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <p className="section-heading">Your Details</p>

                      <div>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          maxLength={80}
                          className="w-full bg-transparent border border-border/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded-sm"
                        />
                        {errors.name && (
                          <p className="text-xs text-destructive mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <input
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            maxLength={255}
                            className="w-full bg-transparent border border-border/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded-sm"
                          />
                          {errors.email && (
                            <p className="text-xs text-destructive mt-1">{errors.email}</p>
                          )}
                        </div>
                        <div>
                          <input
                            type="tel"
                            placeholder="Phone"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            maxLength={20}
                            className="w-full bg-transparent border border-border/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded-sm"
                          />
                          {errors.phone && (
                            <p className="text-xs text-destructive mt-1">{errors.phone}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <textarea
                          placeholder="Special requests (optional)"
                          value={form.notes}
                          onChange={(e) => setForm({ ...form, notes: e.target.value })}
                          maxLength={300}
                          rows={3}
                          className="w-full bg-transparent border border-border/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded-sm resize-none"
                        />
                      </div>

                      {/* Total */}
                      <div className="flex items-center justify-between pt-4 border-t border-border/40">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                            Total ({totalTickets} {totalTickets === 1 ? "ticket" : "tickets"})
                          </p>
                          <p className="font-heading text-2xl text-primary">
                            ₹{total.toLocaleString()}
                          </p>
                        </div>
                        <button
                          type="submit"
                          className="px-6 py-4 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-gold-light transition-all duration-500"
                        >
                          Confirm Booking
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <Check size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-primary/60 mb-2">
                        Reservation Secured
                      </p>
                      <h2 className="font-heading text-2xl uppercase tracking-[0.1em] text-foreground">
                        Thank You, {form.name.split(" ")[0]}
                      </h2>
                    </div>
                    <div className="gold-divider" />
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                      Your booking for <span className="text-foreground">{event.title}</span> on{" "}
                      <span className="text-foreground">{event.date}</span> has been received.
                      A confirmation will be sent to{" "}
                      <span className="text-primary">{form.email}</span> shortly.
                    </p>
                    <div className="bg-muted/20 border border-border/40 p-4 rounded-sm text-left max-w-xs mx-auto space-y-1">
                      {event.tickets.map((t) =>
                        (quantities[t.label] ?? 0) > 0 ? (
                          <div key={t.label} className="flex justify-between text-xs">
                            <span className="text-muted-foreground">
                              {t.label} × {quantities[t.label]}
                            </span>
                            <span className="text-foreground">
                              ₹{(t.price * quantities[t.label]).toLocaleString()}
                            </span>
                          </div>
                        ) : null
                      )}
                      <div className="flex justify-between text-sm pt-2 mt-2 border-t border-border/40">
                        <span className="text-foreground">Total</span>
                        <span className="text-primary font-heading">
                          ₹{total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="mt-2 px-6 py-3 border border-primary text-primary text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-500"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EventBookingModal;
