import FadeIn from "@/components/FadeIn";
import { MapPin, Phone, Clock, ExternalLink, Instagram } from "lucide-react";

const ReservePage = () => (
  <main className="pb-16 md:pb-0 pt-20 md:pt-24 overflow-x-hidden">
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
                    123 Night Street, Koregaon Park,<br />Pune 411001, India
                  </p>
                </div>
              </div>

              <div>
                <h3 className="section-heading mb-4">Contact</h3>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-primary shrink-0" />
                  <a href="tel:+910000000000" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    +91 00000 00000
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

              <div className="flex flex-col gap-3">
                <a
                  href="https://zomato.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-gold-light transition-all duration-500"
                >
                  <ExternalLink size={14} />
                  Reserve on Zomato
                </a>
                <a
                  href="tel:+910000000000"
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-500"
                >
                  <Phone size={14} />
                  Call Now
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-border text-muted-foreground text-xs uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-all duration-500"
                >
                  <Instagram size={14} />
                  Instagram
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Map */}
          <FadeIn delay={0.2}>
            <div className="aspect-square md:aspect-auto md:h-full min-h-[400px] bg-card rounded-sm overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.204308!2d73.8567!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMxJzEzLjQiTiA3M8KwNTEnMjQuMSJF!5e0!3m2!1sen!2sin!4v1"
                className="w-full h-full border-0 grayscale invert opacity-60"
                allowFullScreen
                loading="lazy"
                title="Tichuka location"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  </main>
);

export default ReservePage;
