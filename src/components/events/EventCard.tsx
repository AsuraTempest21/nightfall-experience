import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import type { EventItem } from "@/data/eventsData";

interface EventCardProps {
  event: EventItem;
  index: number;
  onClick: () => void;
}

const EventCard = ({ event, index, onClick }: EventCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    onClick={onClick}
    className="group cursor-pointer bg-card border border-border/50 rounded-sm overflow-hidden hover:border-primary/40 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.15)] transition-all duration-500"
  >
    {/* Image */}
    <div className="relative aspect-[16/10] overflow-hidden">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
      {event.availabilityPercent <= 30 && (
        <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.15em] bg-destructive/90 text-destructive-foreground px-2 py-1">
          Almost Full
        </span>
      )}
    </div>

    {/* Content */}
    <div className="p-5 space-y-3">
      <h3 className="font-heading text-lg uppercase tracking-[0.1em] text-foreground group-hover:text-primary transition-colors duration-300">
        {event.title}
      </h3>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Calendar size={12} className="text-primary" />
          {event.day} | {event.date}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={12} className="text-primary" />
          {event.time}
        </span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">{event.shortDesc}</p>

      <div className="flex items-center justify-between pt-2 border-t border-border/40">
        <span className="text-xs text-muted-foreground">
          From <span className="text-primary font-medium">₹{event.tickets[0].price}</span>
        </span>
        <span className="text-[10px] uppercase tracking-[0.15em] text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Details →
        </span>
      </div>
    </div>
  </motion.div>
);

export default EventCard;
