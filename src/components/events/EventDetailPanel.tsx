import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, MapPin, Shirt, Music, Utensils, Star } from "lucide-react";
import type { EventItem } from "@/data/eventsData";

interface EventDetailPanelProps {
  event: EventItem | null;
  onClose: () => void;
}

const EventDetailPanel = ({ event, onClose }: EventDetailPanelProps) => {
  useEffect(() => {
    if (event) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [event]);

  return (
    <AnimatePresence>
      {event && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full md:w-[520px] bg-card border-l border-border overflow-y-auto"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>

            {/* Image */}
            <div className="relative aspect-[16/10]">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-6 -mt-12 relative">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary/60 mb-2">
                  {event.location}
                </p>
                <h2 className="font-heading text-2xl md:text-3xl uppercase tracking-[0.1em] text-foreground">
                  {event.title}
                </h2>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar size={14} className="text-primary" />
                  {event.day}, {event.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={14} className="text-primary" />
                  {event.time}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-primary" />
                  {event.location}
                </span>
              </div>

              <div className="gold-divider-left" />

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {event.fullDesc}
              </p>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-3">
                {event.theme && (
                  <div className="bg-muted/30 p-3 rounded-sm">
                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-primary mb-1">
                      <Star size={10} /> Theme
                    </span>
                    <p className="text-xs text-muted-foreground">{event.theme}</p>
                  </div>
                )}
                {event.dressCode && (
                  <div className="bg-muted/30 p-3 rounded-sm">
                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-primary mb-1">
                      <Shirt size={10} /> Dress Code
                    </span>
                    <p className="text-xs text-muted-foreground">{event.dressCode}</p>
                  </div>
                )}
                {event.musicGenre && (
                  <div className="bg-muted/30 p-3 rounded-sm">
                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-primary mb-1">
                      <Music size={10} /> Music
                    </span>
                    <p className="text-xs text-muted-foreground">{event.musicGenre}</p>
                  </div>
                )}
                {event.specialMenu && (
                  <div className="bg-muted/30 p-3 rounded-sm">
                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-primary mb-1">
                      <Utensils size={10} /> Special Menu
                    </span>
                    <p className="text-xs text-muted-foreground">{event.specialMenu}</p>
                  </div>
                )}
              </div>

              {event.guestArtist && (
                <div className="bg-accent/30 border border-primary/20 p-4 rounded-sm">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary mb-1">Guest Artist</p>
                  <p className="text-sm text-foreground font-heading">{event.guestArtist}</p>
                </div>
              )}

              {/* Tickets */}
              <div>
                <h3 className="section-heading mb-4">Ticket Options</h3>
                <div className="space-y-3">
                  {event.tickets.map((ticket) => (
                    <div
                      key={ticket.label}
                      className="flex items-center justify-between p-4 bg-muted/20 border border-border/40 rounded-sm"
                    >
                      <div>
                        <p className="text-sm text-foreground font-medium">{ticket.label}</p>
                        <p className="text-xs text-muted-foreground">{ticket.perks}</p>
                      </div>
                      <span className="text-primary font-heading text-lg">₹{ticket.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Availability</span>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-primary">
                    {event.availabilityPercent <= 30
                      ? "Limited Tables Remaining"
                      : event.availabilityPercent <= 50
                      ? "Filling Up Fast"
                      : "Available"}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-700"
                    style={{ width: `${100 - event.availabilityPercent}%` }}
                  />
                </div>
              </div>

              {/* CTA */}
              <div className="sticky bottom-0 pt-4 pb-2 bg-card">
                <a
                  href="https://zomato.com"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center py-4 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-gold-light transition-all duration-500"
                >
                  Book Now
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EventDetailPanel;
