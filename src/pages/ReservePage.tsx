import FadeIn from "@/components/FadeIn";
import SEOHead from "@/components/SEOHead";
import { config } from "@/lib/config";
import ReservationForm from "@/components/reserve/ReservationForm";
import { MapPin, Phone, Clock, ExternalLink, Instagram } from "lucide-react";

const ReservePage = () => (
  <main className="pb-16 md:pb-0 pt-20 md:pt-24 menu-texture">
    <SEOHead
      title="Reserve — Tichuka | Book Your Table"
      description="Reserve your table at Tichuka. Premium late-night dining and cocktail bar in Koregaon Park, Pune. Walk-ins welcome."
    />
    <section className="py-16 md:py-24">
      <div className="container max-w-4xl">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="section-heading mb-4">Get in Touch</p>
            <h1 className="font-heading text-3xl md:text-5xl text-foreground mb-4">Reserve Your Table</h1>
            <div className="gold-divider" />
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <FadeIn>
            <div className="space-y-8">
              <div>
                <h3 className="section-heading mb-4">Location</h3>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-primary mt-1 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {config.contact.address.replace(", Pune", ",\nPune").split("\n").map((line, i) => (
                      <span key={i}>{line}{i === 0 && <br />}</span>
                    ))}
                    , India
                  </p>
                </div>
              </div>

              <div>
                <h3 className="section-heading mb-4">Contact</h3>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-primary shrink-0" />
                  <a href={`tel:${config.contact.phone}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {config.contact.phoneDisplay}
                  </a>
                </div>
              </div>

              <div>
                <h3 className="section-heading mb-4">Hours</h3>
                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-primary mt-1 shrink-0" />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Mon – Thu: 6 PM – 1 AM</p>
                    <p>Fri – Sat: 6 PM – 2 AM</p>
                    <p>Sun: 5 PM – 12 AM</p>
                  </div>
                </div>
              </div>

              <div className="gold-divider-left" />

              <div className="flex flex-col gap-3 w-full overflow-hidden">
                <a
                  href={config.external.zomatoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-3 bg-primary text-primary-foreground text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] hover:bg-gold-light transition-all duration-500 w-full box-border"
                >
                  <ExternalLink size={14} className="shrink-0" />
                  <span className="truncate">Reserve on Zomato</span>
                </a>
                <a
                  href={`tel:${config.contact.phone}`}
                  className="flex items-center justify-center gap-2 px-3 py-3 border border-primary text-primary text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] hover:bg-primary hover:text-primary-foreground transition-all duration-500 w-full box-border"
                >
                  <Phone size={14} className="shrink-0" />
                  <span className="truncate">Call Now</span>
                </a>
                <a
                  href={config.external.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-3 border border-border text-muted-foreground text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] hover:border-primary hover:text-primary transition-all duration-500 w-full box-border"
                >
                  <Instagram size={14} className="shrink-0" />
                  <span className="truncate">Instagram</span>
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Reservation form + map */}
          <FadeIn delay={0.2}>
            <div className="space-y-8">
              <ReservationForm />

              <div className="aspect-square md:aspect-auto md:h-[420px] min-h-[300px] bg-card rounded-sm overflow-hidden">
                <iframe
                  src={config.external.googleMapsEmbedUrl}
                  className="w-full h-full border-0 grayscale invert opacity-60"
                  allowFullScreen
                  loading="lazy"
                  title="Tichuka location"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  </main>
);

export default ReservePage;
