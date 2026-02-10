import { Instagram, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-background border-t border-border py-12">
    <div className="container">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h3 className="font-heading text-xl tracking-[0.15em] text-primary mb-2">TICHUKA</h3>
          <p className="text-xs text-muted-foreground tracking-wider">Crafted Cocktails. Global Flavours. After Dark.</p>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Instagram size={18} />
          </a>
          <a href="tel:+910000000000" className="text-muted-foreground hover:text-primary transition-colors">
            <Phone size={18} />
          </a>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <MapPin size={18} />
          </a>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">© 2026 Tichuka. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
