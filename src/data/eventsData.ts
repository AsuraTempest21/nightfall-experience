export interface TicketOption {
  label: string;
  price: number;
  perks: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  day: string;
  time: string;
  location: string;
  shortDesc: string;
  fullDesc: string;
  theme?: string;
  dressCode?: string;
  musicGenre?: string;
  specialMenu?: string;
  guestArtist?: string;
  tickets: TicketOption[];
  availabilityPercent: number; // 0-100
  isFeatured?: boolean;
  image: string;
}

export const eventsData: EventItem[] = [
  {
    id: "bollywood-retro",
    title: "Bollywood Retro Night",
    date: "March 7, 2026",
    day: "Friday",
    time: "8:00 PM Onwards",
    location: "Rooftop Lounge",
    shortDesc: "Live DJ | Signature Cocktails | Dance Floor",
    fullDesc: "Step into a golden era of Bollywood glamour. Our resident DJ spins iconic retro tracks while you sip on themed cocktails inspired by classic Hindi cinema. Dress to impress — think vintage Bollywood royalty.",
    theme: "Vintage Bollywood Glamour",
    dressCode: "Retro / Glam",
    musicGenre: "Bollywood Retro & Classics",
    specialMenu: "Retro-themed cocktail menu",
    tickets: [
      { label: "General Entry", price: 999, perks: "Entry + 1 Drink" },
      { label: "Couple Entry", price: 1799, perks: "Entry + 2 Drinks" },
      { label: "VIP Table", price: 7999, perks: "Reserved seating + Bottle service" },
    ],
    availabilityPercent: 35,
    isFeatured: true,
    image: "/placeholder.svg",
  },
  {
    id: "latin-fiesta",
    title: "Latin Fiesta Night",
    date: "March 14, 2026",
    day: "Saturday",
    time: "9:00 PM Onwards",
    location: "Indoor Lounge",
    shortDesc: "Live DJ & Salsa Workshop",
    fullDesc: "Feel the rhythm of Latin America with a live salsa workshop followed by an electrifying night of reggaeton, bachata, and merengue beats. Our mixologists serve up Cuban-inspired cocktails all night long.",
    theme: "Latin Carnival",
    dressCode: "Smart Casual / Latin Vibes",
    musicGenre: "Reggaeton, Salsa, Bachata",
    specialMenu: "Cuban cocktail specials",
    tickets: [
      { label: "General Entry", price: 999, perks: "Entry + 1 Drink" },
      { label: "Couple Entry", price: 1799, perks: "Entry + 2 Drinks" },
      { label: "VIP Table", price: 5999, perks: "Reserved seating + Bottle service" },
    ],
    availabilityPercent: 55,
    image: "/placeholder.svg",
  },
  {
    id: "techno-underground",
    title: "Techno Underground",
    date: "March 21, 2026",
    day: "Saturday",
    time: "10:00 PM Onwards",
    location: "Private Hall",
    shortDesc: "Underground beats. Immersive experience.",
    fullDesc: "An intimate night of deep techno and minimal house, featuring guest DJ Arjun Vagale. Expect immersive lighting, fog machines, and a curated selection of craft cocktails. Limited capacity for an exclusive experience.",
    theme: "Dark & Minimal",
    dressCode: "All Black Encouraged",
    musicGenre: "Techno, Minimal House",
    guestArtist: "DJ Arjun Vagale",
    tickets: [
      { label: "General Entry", price: 1499, perks: "Entry + 1 Drink" },
      { label: "VIP Table", price: 9999, perks: "Reserved booth + Premium bottle" },
    ],
    availabilityPercent: 20,
    image: "/placeholder.svg",
  },
  {
    id: "sundowner-brunch",
    title: "Sundowner Brunch",
    date: "March 22, 2026",
    day: "Sunday",
    time: "12:00 PM – 5:00 PM",
    location: "Rooftop Lounge",
    shortDesc: "Unlimited brunch. Live acoustic. Golden hour vibes.",
    fullDesc: "Unwind with unlimited gourmet bites and free-flowing cocktails as the sun sets over Pune. Live acoustic performances set the mood while you enjoy our curated brunch menu in the open air.",
    theme: "Golden Hour Elegance",
    dressCode: "Smart Casual",
    musicGenre: "Live Acoustic & Chill",
    specialMenu: "Unlimited brunch menu with 8 cocktail options",
    tickets: [
      { label: "Non-Alcoholic", price: 1499, perks: "Unlimited food + mocktails" },
      { label: "Alcoholic", price: 2499, perks: "Unlimited food + cocktails" },
      { label: "Premium", price: 3499, perks: "Unlimited food + premium spirits" },
    ],
    availabilityPercent: 60,
    image: "/placeholder.svg",
  },
  {
    id: "jazz-whiskey",
    title: "Jazz & Whiskey Evening",
    date: "March 28, 2026",
    day: "Friday",
    time: "7:30 PM Onwards",
    location: "Indoor Lounge",
    shortDesc: "Live jazz quartet. Curated whiskey flight.",
    fullDesc: "An evening of sophistication — a live jazz quartet performs while you explore a curated flight of single malts and rare whiskeys. Paired with artisanal cheese and charcuterie boards.",
    theme: "Speakeasy Elegance",
    dressCode: "Formal / Smart",
    musicGenre: "Live Jazz",
    specialMenu: "Whiskey flight + charcuterie pairing",
    tickets: [
      { label: "Standard", price: 1999, perks: "Entry + Whiskey flight (3 pours)" },
      { label: "Connoisseur", price: 3999, perks: "Premium flight + Cheese board" },
      { label: "Private Table", price: 11999, perks: "Private table for 4 + Full bottle" },
    ],
    availabilityPercent: 45,
    image: "/placeholder.svg",
  },
  {
    id: "neon-nights",
    title: "Neon Nights",
    date: "April 4, 2026",
    day: "Saturday",
    time: "9:00 PM Onwards",
    location: "Rooftop Lounge",
    shortDesc: "EDM. Neon paint. Unforgettable energy.",
    fullDesc: "Pune's most electrifying night returns. Glow-in-the-dark body paint stations, UV lighting, and relentless EDM drops from two resident DJs. Free neon accessories at entry.",
    theme: "Neon Glow Party",
    dressCode: "White / Neon encouraged",
    musicGenre: "EDM, Progressive House",
    tickets: [
      { label: "Early Bird", price: 799, perks: "Entry + Neon kit" },
      { label: "General Entry", price: 1199, perks: "Entry + 1 Drink + Neon kit" },
      { label: "VIP Table", price: 6999, perks: "Reserved table + Bottle + Neon kit" },
    ],
    availabilityPercent: 70,
    image: "/placeholder.svg",
  },
];
