import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, "../../data/nightfall.db");
const sqlite = new Database(dbPath);
sqlite.pragma("foreign_keys = ON");

console.log("Seeding database...");

// ─── Menu Categories ───
const categories = [
  { id: "signature-cocktails", label: "Signature Cocktails", tagline: "Crafted in-house with global inspirations.", sort_order: 0 },
  { id: "classic-cocktails", label: "Classic Cocktails", tagline: "Timeless recipes, perfected.", sort_order: 1 },
  { id: "spirits", label: "Spirits", tagline: "Curated pours from around the world.", sort_order: 2 },
  { id: "small-plates", label: "Small Plates", tagline: "Bold bites to share.", sort_order: 3 },
  { id: "asian-mains", label: "Asian Mains", tagline: "Wok-fired, slow-braised, soulful.", sort_order: 4 },
  { id: "global-mains", label: "Global Mains", tagline: "World flavours on one plate.", sort_order: 5 },
  { id: "sushi-specialties", label: "Sushi & Specialties", tagline: "Precision cuts, premium fish.", sort_order: 6 },
  { id: "desserts", label: "Desserts", tagline: "Sweet finales, curated indulgences.", sort_order: 7 },
  { id: "mocktails", label: "Mocktails", tagline: "Zero proof, full flavour.", sort_order: 8 },
];

const insertCategory = sqlite.prepare(
  `INSERT OR REPLACE INTO menu_categories (id, label, tagline, sort_order) VALUES (?, ?, ?, ?)`
);
for (const c of categories) {
  insertCategory.run(c.id, c.label, c.tagline, c.sort_order);
}
console.log(`  ✓ ${categories.length} categories`);

// ─── Menu Items ───
const menuItems = [
  { id: "tichuka-sour", name: "The Tichuka Sour", description: "Bourbon, yuzu, egg white, smoked honey", longDescription: "Our signature pour — bourbon shaken with fresh yuzu, egg white for silk, and a drizzle of smoked honey that lingers on the palate.", price: 650, category: "signature-cocktails", isVeg: true, images: ["/placeholder.svg"], ingredients: ["Bourbon", "Yuzu juice", "Egg white", "Smoked honey", "Angostura bitters"], macros: { calories: 210, protein: 2, carbs: 18, fats: 0 }, pairing: "Prawn Tempura" },
  { id: "emerald-negroni", name: "Emerald Negroni", description: "Gin, Campari, sweet vermouth, matcha", longDescription: "A Tichuka twist on the classic — matcha-infused gin brings an earthy counterpoint to Campari's bitterness.", price: 700, category: "signature-cocktails", isVeg: true, images: ["/placeholder.svg"], ingredients: ["Gin", "Campari", "Sweet vermouth", "Matcha powder", "Orange peel"], macros: { calories: 240, protein: 0, carbs: 14, fats: 0 }, pairing: "Tuna Tataki" },
  { id: "midnight-margarita", name: "Midnight Margarita", description: "Reposado tequila, activated charcoal, agave, lime", longDescription: "Dark as the night, smooth as the hour. Activated charcoal meets reposado tequila with agave and fresh lime.", price: 600, category: "signature-cocktails", isVeg: true, images: ["/placeholder.svg"], ingredients: ["Reposado tequila", "Activated charcoal", "Agave syrup", "Lime juice", "Salt rim"], macros: { calories: 195, protein: 0, carbs: 16, fats: 0 }, pairing: "Charred Corn Ribs" },
  { id: "gold-rush-old-fashioned", name: "Gold Rush Old Fashioned", description: "Rye whiskey, saffron bitters, demerara", longDescription: "Rye whiskey stirred with house-made saffron bitters and demerara sugar — gilded, bold, unhurried.", price: 750, category: "signature-cocktails", isVeg: true, images: ["/placeholder.svg"], ingredients: ["Rye whiskey", "Saffron bitters", "Demerara sugar", "Orange zest"], macros: { calories: 220, protein: 0, carbs: 12, fats: 0 }, pairing: "Miso Glazed Sea Bass" },
  { id: "lychee-martini", name: "Lychee Martini", description: "Vodka, lychee liqueur, elderflower, lime", longDescription: "Delicate and floral — lychee liqueur and elderflower cordial shaken with premium vodka and a whisper of lime.", price: 600, category: "signature-cocktails", isVeg: true, images: ["/placeholder.svg"], ingredients: ["Vodka", "Lychee liqueur", "Elderflower cordial", "Lime juice"], macros: { calories: 185, protein: 0, carbs: 20, fats: 0 }, pairing: "Edamame Truffle" },
  { id: "classic-mojito", name: "Classic Mojito", description: "White rum, fresh mint, lime, soda", longDescription: "The eternal crowd-pleaser — fresh mint muddled with lime, topped with premium white rum and a fizz of soda.", price: 500, category: "classic-cocktails", isVeg: true, images: ["/placeholder.svg"], ingredients: ["White rum", "Fresh mint", "Lime juice", "Sugar syrup", "Soda water"], macros: { calories: 175, protein: 0, carbs: 18, fats: 0 } },
  { id: "whiskey-sour", name: "Whiskey Sour", description: "Bourbon, lemon, egg white, bitters", longDescription: "Silky egg white foam over a balanced pour of bourbon, fresh lemon, and aromatic bitters.", price: 550, category: "classic-cocktails", isVeg: true, images: ["/placeholder.svg"], ingredients: ["Bourbon", "Lemon juice", "Egg white", "Sugar syrup", "Angostura bitters"], macros: { calories: 200, protein: 2, carbs: 14, fats: 0 } },
  { id: "japanese-whisky", name: "Yamazaki 12yr", description: "Single malt, neat or on the rocks", longDescription: "Suntory's flagship — delicate notes of dried fruit, honey, and Japanese oak.", price: 1200, category: "spirits", isVeg: true, images: ["/placeholder.svg"], ingredients: ["Yamazaki 12yr Single Malt"], macros: { calories: 110, protein: 0, carbs: 0, fats: 0 } },
  { id: "hendricks-gin", name: "Hendrick's Gin", description: "Cucumber & rose petal infusion", longDescription: "Distinctively floral and refreshing — served with a thin cucumber wheel and premium tonic.", price: 600, category: "spirits", isVeg: true, images: ["/placeholder.svg"], ingredients: ["Hendrick's Gin", "Tonic water", "Cucumber"], macros: { calories: 160, protein: 0, carbs: 8, fats: 0 } },
  { id: "prawn-tempura", name: "Prawn Tempura", description: "Tiger prawns, wasabi mayo, pickled ginger", longDescription: "Crispy battered tiger prawns served with house wasabi mayo and pickled ginger on the side.", price: 550, category: "small-plates", isVeg: false, images: ["/placeholder.svg"], ingredients: ["Tiger prawns", "Tempura batter", "Wasabi", "Japanese mayo", "Pickled ginger"], macros: { calories: 380, protein: 22, carbs: 28, fats: 18 }, pairing: "Lychee Martini" },
  { id: "edamame-truffle", name: "Spicy Truffle Edamame", description: "Steamed edamame, truffle salt, chilli flakes", longDescription: "A bold blend of chilli oil, soy glaze, and truffle dust finished with toasted sesame.", price: 350, category: "small-plates", isVeg: true, images: ["/placeholder.svg"], ingredients: ["Edamame", "Truffle oil", "Chilli flakes", "Sea salt", "Sesame"], macros: { calories: 420, protein: 12, carbs: 34, fats: 22 }, pairing: "Smoked Yuzu Martini", tags: ["High Protein", "Gluten Free"] },
  { id: "tuna-tataki", name: "Tuna Tataki", description: "Seared tuna, ponzu, sesame, microgreens", longDescription: "Lightly seared yellowfin tuna sliced thin, dressed in citrus ponzu with toasted sesame and fresh microgreens.", price: 650, category: "small-plates", isVeg: false, images: ["/placeholder.svg"], ingredients: ["Yellowfin tuna", "Ponzu sauce", "Sesame seeds", "Microgreens", "Radish"], macros: { calories: 280, protein: 32, carbs: 8, fats: 12 }, pairing: "Emerald Negroni", tags: ["High Protein", "Gluten Free"] },
  { id: "charred-corn-ribs", name: "Charred Corn Ribs", description: "Smoked paprika butter, lime, coriander", longDescription: "Corn ribs charred over open flame, basted in smoked paprika butter, finished with fresh lime and coriander.", price: 400, category: "small-plates", isVeg: true, images: ["/placeholder.svg"], ingredients: ["Corn", "Smoked paprika", "Butter", "Lime", "Coriander"], macros: { calories: 310, protein: 6, carbs: 38, fats: 16 }, pairing: "Midnight Margarita" },
  { id: "miso-sea-bass", name: "Miso Glazed Sea Bass", description: "White miso, dashi broth, bok choy", longDescription: "Chilean sea bass marinated 48 hours in white miso, grilled and served over dashi broth with baby bok choy.", price: 1200, category: "asian-mains", isVeg: false, images: ["/placeholder.svg"], ingredients: ["Chilean sea bass", "White miso", "Dashi", "Bok choy", "Mirin"], macros: { calories: 520, protein: 42, carbs: 18, fats: 28 }, pairing: "Gold Rush Old Fashioned", tags: ["High Protein"] },
  { id: "lamb-rendang", name: "Lamb Rendang", description: "Slow-cooked lamb, coconut, lemongrass, steamed rice", longDescription: "Lamb slow-cooked for 6 hours in a rich coconut and lemongrass gravy — served with fragrant steamed rice.", price: 1100, category: "asian-mains", isVeg: false, images: ["/placeholder.svg"], ingredients: ["Lamb shoulder", "Coconut milk", "Lemongrass", "Galangal", "Steamed rice"], macros: { calories: 680, protein: 38, carbs: 42, fats: 36 }, tags: ["Gluten Free"] },
  { id: "truffle-ramen", name: "Truffle Mushroom Ramen", description: "Porcini broth, truffle oil, soft egg, nori", longDescription: "Rich porcini mushroom broth ladled over house-made noodles with truffle oil, a 6-minute egg, and crispy nori.", price: 900, category: "asian-mains", isVeg: true, images: ["/placeholder.svg"], ingredients: ["Porcini mushrooms", "Truffle oil", "Ramen noodles", "Soft egg", "Nori", "Spring onion"], macros: { calories: 580, protein: 18, carbs: 62, fats: 28 } },
  { id: "thai-basil-chicken", name: "Thai Basil Chicken", description: "Stir-fried chicken, holy basil, bird's eye chilli", longDescription: "Wok-tossed chicken with holy basil, garlic, and bird's eye chilli — served with jasmine rice.", price: 850, category: "asian-mains", isVeg: false, images: ["/placeholder.svg"], ingredients: ["Chicken thigh", "Holy basil", "Bird's eye chilli", "Garlic", "Fish sauce", "Jasmine rice"], macros: { calories: 620, protein: 36, carbs: 48, fats: 24 }, tags: ["Gluten Free"] },
  { id: "grilled-ribeye", name: "Grilled Ribeye", description: "200g prime cut, chimichurri, roasted garlic", longDescription: "Prime ribeye grilled to your preference, served with house chimichurri and slow-roasted garlic cloves.", price: 1400, category: "global-mains", isVeg: false, images: ["/placeholder.svg"], ingredients: ["Ribeye steak", "Chimichurri", "Roasted garlic", "Sea salt", "Black pepper"], macros: { calories: 720, protein: 52, carbs: 4, fats: 54 }, tags: ["High Protein", "Gluten Free"] },
  { id: "truffle-risotto", name: "Truffle Wild Mushroom Risotto", description: "Arborio rice, porcini, parmesan, truffle oil", longDescription: "Creamy arborio rice slowly stirred with wild mushrooms, aged parmesan, and finished with black truffle oil.", price: 950, category: "global-mains", isVeg: true, images: ["/placeholder.svg"], ingredients: ["Arborio rice", "Porcini mushrooms", "Parmesan", "Truffle oil", "White wine"], macros: { calories: 580, protein: 14, carbs: 68, fats: 26 }, tags: ["Gluten Free"] },
  { id: "salmon-nigiri", name: "Salmon Nigiri Set", description: "5pc Norwegian salmon, wasabi, pickled ginger", longDescription: "Five pieces of hand-pressed Norwegian salmon nigiri served with freshly grated wasabi and pickled ginger.", price: 800, category: "sushi-specialties", isVeg: false, images: ["/placeholder.svg"], ingredients: ["Norwegian salmon", "Sushi rice", "Wasabi", "Pickled ginger", "Soy sauce"], macros: { calories: 340, protein: 28, carbs: 38, fats: 10 }, tags: ["High Protein"] },
  { id: "dragon-roll", name: "Dragon Roll", description: "Tempura prawn, avocado, eel sauce, tobiko", longDescription: "Inside-out roll with tempura prawn and cucumber, topped with avocado slices, sweet eel sauce, and tobiko.", price: 750, category: "sushi-specialties", isVeg: false, images: ["/placeholder.svg"], ingredients: ["Tempura prawn", "Avocado", "Cucumber", "Eel sauce", "Tobiko", "Sushi rice"], macros: { calories: 420, protein: 18, carbs: 52, fats: 16 } },
  { id: "matcha-tiramisu", name: "Matcha Tiramisu", description: "Mascarpone, matcha, ladyfinger, white chocolate", longDescription: "Our Japanese-Italian fusion — layers of matcha-soaked ladyfingers and mascarpone, dusted with ceremonial matcha.", price: 450, category: "desserts", isVeg: true, images: ["/placeholder.svg"], ingredients: ["Mascarpone", "Matcha powder", "Ladyfingers", "White chocolate", "Cream"], macros: { calories: 380, protein: 8, carbs: 42, fats: 20 } },
  { id: "yuzu-cheesecake", name: "Yuzu Burnt Cheesecake", description: "Basque-style, yuzu curd, graham crust", longDescription: "Creamy Basque-style cheesecake with a yuzu curd centre and buttery graham cracker crust.", price: 500, category: "desserts", isVeg: true, images: ["/placeholder.svg"], ingredients: ["Cream cheese", "Yuzu curd", "Graham crackers", "Butter", "Eggs"], macros: { calories: 440, protein: 10, carbs: 36, fats: 28 } },
  { id: "virgin-sunset", name: "Tichuka Sunset", description: "Mango, passion fruit, lime, soda", longDescription: "Tropical and vibrant — fresh mango and passion fruit shaken with lime and topped with sparkling soda.", price: 350, category: "mocktails", isVeg: true, images: ["/placeholder.svg"], ingredients: ["Mango purée", "Passion fruit", "Lime juice", "Soda water", "Mint"], macros: { calories: 120, protein: 1, carbs: 28, fats: 0 } },
  { id: "cucumber-cooler", name: "Cucumber Elderflower Cooler", description: "Cucumber, elderflower, tonic, basil", longDescription: "Refreshingly crisp — muddled cucumber and elderflower cordial with premium tonic and fresh basil.", price: 300, category: "mocktails", isVeg: true, images: ["/placeholder.svg"], ingredients: ["Cucumber", "Elderflower cordial", "Tonic water", "Fresh basil", "Lime"], macros: { calories: 95, protein: 0, carbs: 22, fats: 0 } },
];

const insertItem = sqlite.prepare(
  `INSERT OR REPLACE INTO menu_items (id, name, description, long_description, price, category, is_veg, images, ingredients, macro_calories, macro_protein, macro_carbs, macro_fats, pairing, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
);
for (const item of menuItems) {
  insertItem.run(
    item.id, item.name, item.description, item.longDescription ?? null,
    item.price, item.category, item.isVeg ? 1 : 0,
    JSON.stringify(item.images), JSON.stringify(item.ingredients ?? []),
    item.macros?.calories ?? null, item.macros?.protein ?? null,
    item.macros?.carbs ?? null, item.macros?.fats ?? null,
    item.pairing ?? null, JSON.stringify(item.tags ?? [])
  );
}
console.log(`  ✓ ${menuItems.length} menu items`);

// ─── Events ───
const eventsData = [
  { id: "bollywood-retro", title: "Bollywood Retro Night", date: "March 7, 2026", day: "Friday", time: "8:00 PM Onwards", location: "Rooftop Lounge", shortDesc: "Live DJ | Signature Cocktails | Dance Floor", fullDesc: "Step into a golden era of Bollywood glamour. Our resident DJ spins iconic retro tracks while you sip on themed cocktails inspired by classic Hindi cinema. Dress to impress — think vintage Bollywood royalty.", theme: "Vintage Bollywood Glamour", dressCode: "Retro / Glam", musicGenre: "Bollywood Retro & Classics", specialMenu: "Retro-themed cocktail menu", availabilityPercent: 35, isFeatured: true, image: "/placeholder.svg", tickets: [{ label: "General Entry", price: 999, perks: "Entry + 1 Drink" }, { label: "Couple Entry", price: 1799, perks: "Entry + 2 Drinks" }, { label: "VIP Table", price: 7999, perks: "Reserved seating + Bottle service" }] },
  { id: "latin-fiesta", title: "Latin Fiesta Night", date: "March 14, 2026", day: "Saturday", time: "9:00 PM Onwards", location: "Indoor Lounge", shortDesc: "Live DJ & Salsa Workshop", fullDesc: "Feel the rhythm of Latin America with a live salsa workshop followed by an electrifying night of reggaeton, bachata, and merengue beats. Our mixologists serve up Cuban-inspired cocktails all night long.", theme: "Latin Carnival", dressCode: "Smart Casual / Latin Vibes", musicGenre: "Reggaeton, Salsa, Bachata", specialMenu: "Cuban cocktail specials", availabilityPercent: 55, isFeatured: false, image: "/placeholder.svg", tickets: [{ label: "General Entry", price: 999, perks: "Entry + 1 Drink" }, { label: "Couple Entry", price: 1799, perks: "Entry + 2 Drinks" }, { label: "VIP Table", price: 5999, perks: "Reserved seating + Bottle service" }] },
  { id: "techno-underground", title: "Techno Underground", date: "March 21, 2026", day: "Saturday", time: "10:00 PM Onwards", location: "Private Hall", shortDesc: "Underground beats. Immersive experience.", fullDesc: "An intimate night of deep techno and minimal house, featuring guest DJ Arjun Vagale. Expect immersive lighting, fog machines, and a curated selection of craft cocktails. Limited capacity for an exclusive experience.", theme: "Dark & Minimal", dressCode: "All Black Encouraged", musicGenre: "Techno, Minimal House", guestArtist: "DJ Arjun Vagale", availabilityPercent: 20, isFeatured: false, image: "/placeholder.svg", tickets: [{ label: "General Entry", price: 1499, perks: "Entry + 1 Drink" }, { label: "VIP Table", price: 9999, perks: "Reserved booth + Premium bottle" }] },
  { id: "sundowner-brunch", title: "Sundowner Brunch", date: "March 22, 2026", day: "Sunday", time: "12:00 PM – 5:00 PM", location: "Rooftop Lounge", shortDesc: "Unlimited brunch. Live acoustic. Golden hour vibes.", fullDesc: "Unwind with unlimited gourmet bites and free-flowing cocktails as the sun sets over Pune. Live acoustic performances set the mood while you enjoy our curated brunch menu in the open air.", theme: "Golden Hour Elegance", dressCode: "Smart Casual", musicGenre: "Live Acoustic & Chill", specialMenu: "Unlimited brunch menu with 8 cocktail options", availabilityPercent: 60, isFeatured: false, image: "/placeholder.svg", tickets: [{ label: "Non-Alcoholic", price: 1499, perks: "Unlimited food + mocktails" }, { label: "Alcoholic", price: 2499, perks: "Unlimited food + cocktails" }, { label: "Premium", price: 3499, perks: "Unlimited food + premium spirits" }] },
  { id: "jazz-whiskey", title: "Jazz & Whiskey Evening", date: "March 28, 2026", day: "Friday", time: "7:30 PM Onwards", location: "Indoor Lounge", shortDesc: "Live jazz quartet. Curated whiskey flight.", fullDesc: "An evening of sophistication — a live jazz quartet performs while you explore a curated flight of single malts and rare whiskeys. Paired with artisanal cheese and charcuterie boards.", theme: "Speakeasy Elegance", dressCode: "Formal / Smart", musicGenre: "Live Jazz", specialMenu: "Whiskey flight + charcuterie pairing", availabilityPercent: 45, isFeatured: false, image: "/placeholder.svg", tickets: [{ label: "Standard", price: 1999, perks: "Entry + Whiskey flight (3 pours)" }, { label: "Connoisseur", price: 3999, perks: "Premium flight + Cheese board" }, { label: "Private Table", price: 11999, perks: "Private table for 4 + Full bottle" }] },
  { id: "neon-nights", title: "Neon Nights", date: "April 4, 2026", day: "Saturday", time: "9:00 PM Onwards", location: "Rooftop Lounge", shortDesc: "EDM. Neon paint. Unforgettable energy.", fullDesc: "Pune's most electrifying night returns. Glow-in-the-dark body paint stations, UV lighting, and relentless EDM drops from two resident DJs. Free neon accessories at entry.", theme: "Neon Glow Party", dressCode: "White / Neon encouraged", musicGenre: "EDM, Progressive House", availabilityPercent: 70, isFeatured: false, image: "/placeholder.svg", tickets: [{ label: "Early Bird", price: 799, perks: "Entry + Neon kit" }, { label: "General Entry", price: 1199, perks: "Entry + 1 Drink + Neon kit" }, { label: "VIP Table", price: 6999, perks: "Reserved table + Bottle + Neon kit" }] },
];

const insertEvent = sqlite.prepare(
  `INSERT OR REPLACE INTO events (id, title, date, day, time, location, short_desc, full_desc, theme, dress_code, music_genre, special_menu, guest_artist, availability_percent, is_featured, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
);
const insertTicket = sqlite.prepare(
  `INSERT OR REPLACE INTO event_tickets (event_id, label, price, perks) VALUES (?, ?, ?, ?)`
);

// Clear existing tickets before reseeding
sqlite.exec(`DELETE FROM event_tickets`);

for (const event of eventsData) {
  insertEvent.run(
    event.id, event.title, event.date, event.day, event.time, event.location,
    event.shortDesc, event.fullDesc, event.theme ?? null, event.dressCode ?? null,
    event.musicGenre ?? null, event.specialMenu ?? null, event.guestArtist ?? null,
    event.availabilityPercent, event.isFeatured ? 1 : 0, event.image
  );
  for (const ticket of event.tickets) {
    insertTicket.run(event.id, ticket.label, ticket.price, ticket.perks);
  }
}
console.log(`  ✓ ${eventsData.length} events with tickets`);

console.log("✓ Seed complete.");
sqlite.close();
