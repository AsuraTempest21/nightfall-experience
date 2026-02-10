import FadeIn from "@/components/FadeIn";
import menuHero from "@/assets/menu-hero.jpg";

const cocktails = [
  { name: "The Tichuka Sour", desc: "Bourbon, yuzu, egg white, smoked honey", price: "₹650" },
  { name: "Emerald Negroni", desc: "Gin, Campari, sweet vermouth, matcha", price: "₹700" },
  { name: "Midnight Margarita", desc: "Reposado tequila, activated charcoal, agave, lime", price: "₹600" },
  { name: "Gold Rush Old Fashioned", desc: "Rye whiskey, saffron bitters, demerara", price: "₹750" },
  { name: "Lychee Martini", desc: "Vodka, lychee liqueur, elderflower, lime", price: "₹600" },
];

const mains = [
  { name: "Miso Glazed Sea Bass", desc: "White miso, dashi broth, bok choy", price: "₹1200" },
  { name: "Lamb Rendang", desc: "Slow-cooked lamb, coconut, lemongrass, steamed rice", price: "₹1100" },
  { name: "Truffle Mushroom Ramen", desc: "Porcini broth, truffle oil, soft egg, nori", price: "₹900" },
  { name: "Thai Basil Chicken", desc: "Stir-fried chicken, holy basil, bird's eye chilli", price: "₹850" },
];

const smallPlates = [
  { name: "Prawn Tempura", desc: "Tiger prawns, wasabi mayo, pickled ginger", price: "₹550" },
  { name: "Edamame Truffle", desc: "Steamed edamame, truffle salt, chilli flakes", price: "₹350" },
  { name: "Tuna Tataki", desc: "Seared tuna, ponzu, sesame, microgreens", price: "₹650" },
  { name: "Charred Corn Ribs", desc: "Smoked paprika butter, lime, coriander", price: "₹400" },
];

interface MenuSectionProps {
  title: string;
  items: { name: string; desc: string; price: string }[];
}

const MenuSection = ({ title, items }: MenuSectionProps) => (
  <div className="mb-16 last:mb-0">
    <FadeIn>
      <h2 className="section-heading mb-8">{title}</h2>
      <div className="gold-divider-left mb-8" />
    </FadeIn>
    <div className="space-y-6">
      {items.map((item, i) => (
        <FadeIn key={item.name} delay={i * 0.08}>
          <div className="flex justify-between items-baseline gap-4 group">
            <div>
              <h3 className="font-heading text-base md:text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </div>
            <span className="text-sm text-primary shrink-0 font-medium">{item.price}</span>
          </div>
        </FadeIn>
      ))}
    </div>
  </div>
);

const MenuPage = () => (
  <main className="pb-16 md:pb-0">
    {/* Hero */}
    <section className="relative h-[50vh] md:h-[60vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img src={menuHero} alt="Menu" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80" />
      </div>
      <div className="relative z-10 container pb-12">
        <FadeIn>
          <p className="section-heading mb-4">Our Offerings</p>
          <h1 className="font-heading text-3xl md:text-5xl text-foreground">The Menu</h1>
        </FadeIn>
      </div>
    </section>

    {/* Menu Content */}
    <section className="py-16 md:py-24">
      <div className="container max-w-2xl">
        <MenuSection title="Signature Cocktails" items={cocktails} />
        <MenuSection title="Asian Mains" items={mains} />
        <MenuSection title="Small Plates" items={smallPlates} />
      </div>
    </section>
  </main>
);

export default MenuPage;
