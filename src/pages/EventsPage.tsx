import { useState, useEffect } from "react";
import FadeIn from "@/components/FadeIn";
import EventCard from "@/components/events/EventCard";
import EventDetailPanel from "@/components/events/EventDetailPanel";
import { eventsData, type EventItem } from "@/data/eventsData";
import { Calendar, Clock, MapPin, ArrowDown, Sparkles } from "lucide-react";
import eventsHero from "@/assets/events-hero.jpg";

const featured = eventsData.find((e) => e.isFeatured)!;
const upcoming = eventsData.filter((e) => !e.isFeatured);

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedEvent]);

  const scrollToEvents = () => {
    document.getElementById("upcoming-events")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="pb-16 md:pb-0">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src={eventsHero}
          alt="Tichuka events"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative z-10 text-center px-4">
          <FadeIn>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-primary/60 mb-4">
              Events
            </p>
            <h1 className="font-heading text-4xl md:text-6xl uppercase tracking-[0.12em] text-foreground mb-3">
              After Dark at Tichuka
            </h1>
            <div className="gold-divider mt-4 mb-5" />
            <p className="text-sm md:text-base text-muted-foreground tracking-wide max-w-md mx-auto">
              Curated nights. Elevated experiences.
            </p>
            <button
              onClick={scrollToEvents}
              className="mt-10 inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-gold-light transition-all duration-500"
            >
              View Upcoming Events
              <ArrowDown size={14} />
            </button>
          </FadeIn>
        </div>
      </section>

      {/* ─── FEATURED EVENT ─── */}
      <section className="relative py-16 md:py-24 bg-accent/30 menu-texture">
        <div className="container">
          <FadeIn>
            <p className="section-heading mb-8 text-center">Featured Event</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div
              className="grid md:grid-cols-2 gap-8 md:gap-12 items-center cursor-pointer group"
              onClick={() => setSelectedEvent(featured)}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>

              {/* Details */}
              <div className="space-y-5">
                <h2 className="font-heading text-2xl md:text-4xl uppercase tracking-[0.1em] text-foreground group-hover:text-primary transition-colors duration-300">
                  {featured.title}
                </h2>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} className="text-primary" />
                    {featured.day} | {featured.time}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={14} className="text-primary" />
                    {featured.location}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {featured.shortDesc}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {featured.fullDesc}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(featured);
                    }}
                    className="px-6 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.15em] hover:bg-gold-light transition-all duration-500"
                  >
                    Book Now
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(featured);
                    }}
                    className="px-6 py-3 border border-primary text-primary text-xs uppercase tracking-[0.15em] hover:bg-primary hover:text-primary-foreground transition-all duration-500"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── UPCOMING EVENTS GRID ─── */}
      <section id="upcoming-events" className="py-16 md:py-24 menu-texture">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="section-heading mb-4">What's Coming</p>
              <h2 className="font-heading text-2xl md:text-4xl text-foreground mb-3">Upcoming Events</h2>
              <div className="gold-divider" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcoming.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                index={i}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRIVATE EVENTS CTA ─── */}
      <section className="py-16 md:py-24 border-t border-border/40">
        <div className="container max-w-3xl text-center">
          <FadeIn>
            <Sparkles size={20} className="text-primary mx-auto mb-4" />
            <p className="section-heading mb-4">Private Events</p>
            <h2 className="font-heading text-2xl md:text-4xl text-foreground mb-4">
              Host Your Event at Tichuka
            </h2>
            <div className="gold-divider mb-6" />
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto mb-8">
              Birthdays. Corporate Nights. Celebrations. Let us craft an unforgettable evening tailored to your vision.
            </p>
            <a
              href="/reserve"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-gold-light transition-all duration-500"
            >
              Enquire Now
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Detail Panel */}
      <EventDetailPanel event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </main>
  );
};

export default EventsPage;
