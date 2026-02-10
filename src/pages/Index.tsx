import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";

import heroBg from "@/assets/hero-bg.jpg";
import cocktailBrand from "@/assets/cocktail-brand.jpg";
import signatureCocktails from "@/assets/signature-cocktails.jpg";
import asianMains from "@/assets/asian-mains.jpg";
import smallPlates from "@/assets/small-plates.jpg";
import barExperience from "@/assets/bar-experience.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

import { MapPin, Phone, Instagram, ExternalLink } from "lucide-react";

const menuCards = [
  { title: "Signature Cocktails", desc: "Refined mixology with house-crafted spirits and botanicals", image: signatureCocktails },
  { title: "Asian Mains", desc: "Global flavours rooted in tradition, reimagined for the night", image: asianMains },
  { title: "Small Plates", desc: "Shared bites designed to complement the bar experience", image: smallPlates },
];

const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

const Index = () => {
  return (
    <main className="pb-16 md:pb-0">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Tichuka bar interior" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-background/75" />
        </div>
        <div className="relative z-10 text-center px-6">
          <FadeIn>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl tracking-[0.1em] text-foreground mb-4">
              TICHUKA
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="gold-divider mb-6" />
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="font-heading text-sm md:text-base italic text-muted-foreground tracking-wider mb-10">
              Crafted Cocktails. Global Flavours. After Dark.
            </p>
          </FadeIn>
          <FadeIn delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/menu"
                className="px-8 py-3 border border-primary text-primary text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-500"
              >
                View Menu
              </Link>
              <Link
                to="/reserve"
                className="px-8 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-gold-light transition-all duration-500"
              >
                Reserve Table
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Brand Essence */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <FadeIn>
              <div>
                <p className="section-heading mb-6">The Experience</p>
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 leading-relaxed">
                  A late-night dining and cocktail experience blending global flavours with refined mixology.
                </h2>
                <div className="gold-divider-left" />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="aspect-[4/5] overflow-hidden">
                <img src={cocktailBrand} alt="Signature cocktail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-20 md:py-32 bg-muted">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="section-heading mb-4">Our Menu</p>
              <div className="gold-divider" />
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {menuCards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.15}>
                <div className="group">
                  <div className="aspect-[3/4] overflow-hidden mb-6">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-heading text-lg text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{card.desc}</p>
                  <Link
                    to="/menu"
                    className="text-xs uppercase tracking-[0.2em] text-primary hover:text-gold-light transition-colors"
                  >
                    View Menu →
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* The Bar */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={barExperience} alt="The bar at Tichuka" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-emerald-dark/85" />
        </div>
        <div className="relative z-10 container text-center">
          <FadeIn>
            <p className="section-heading mb-6">The Bar</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              Come for the bar. Stay for the food.
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="gold-divider mb-8" />
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
              Premium spirits, house-infused syrups, and craft cocktails served in an atmosphere
              designed for the night. Every pour is intentional.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 md:py-32">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="section-heading mb-4">Gallery</p>
              <div className="gold-divider" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {galleryImages.map((img, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="aspect-square overflow-hidden">
                  <img
                    src={img}
                    alt={`Tichuka gallery ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Location + CTA */}
      <section className="py-20 md:py-32 bg-muted">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <FadeIn>
              <div className="aspect-video md:aspect-auto md:h-full min-h-[300px] bg-card rounded-sm overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.204308!2d73.8567!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMxJzEzLjQiTiA3M8KwNTEnMjQuMSJF!5e0!3m2!1sen!2sin!4v1"
                  className="w-full h-full border-0 grayscale invert opacity-60"
                  allowFullScreen
                  loading="lazy"
                  title="Tichuka location"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex flex-col justify-center">
                <p className="section-heading mb-6">Find Us</p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-primary mt-1 shrink-0" />
                    <p className="text-sm text-muted-foreground">123 Night Street, Koregaon Park, Pune 411001</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-primary shrink-0" />
                    <p className="text-sm text-muted-foreground">+91 00000 00000</p>
                  </div>
                </div>
                <div className="gold-divider-left mb-8" />
                <div className="flex flex-col sm:flex-row gap-3">
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
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
