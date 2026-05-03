import { Instagram, Phone, MapPin } from "lucide-react";
import { config } from "@/lib/config";

const Footer = () => (
  <footer className="bg-background border-t border-border py-12">
    <div className="container">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h3 className="font-heading text-xl tracking-[0.15em] text-primary mb-2">TICHUKA</h3>
          <p className="text-xs text-muted-foreground tracking-wider">Crafted Cocktails. Global Flavours. After Dark.</p>
        </div>
        <div className="flex items-center gap-6">
          <a href={config.external.instagramUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
            <Instagram size={18} />
          </a>
          <a href={`tel:${config.contact.phone}`} className="text-muted-foreground hover:text-primary transition-colors" aria-label="Call us">
            <Phone size={18} />
          </a>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Our location">
            <MapPin size={18} />
          </a>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Tichuka. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
