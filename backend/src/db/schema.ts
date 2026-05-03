import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

// ─── Menu Categories ───
export const menuCategories = sqliteTable("menu_categories", {
  id: text("id").primaryKey(),
  label: text("label").notNull(),
  tagline: text("tagline").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

// ─── Menu Items ───
export const menuItems = sqliteTable("menu_items", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  price: real("price").notNull(),
  category: text("category")
    .notNull()
    .references(() => menuCategories.id),
  isVeg: integer("is_veg", { mode: "boolean" }).notNull().default(false),
  images: text("images", { mode: "json" }).notNull().$type<string[]>(),
  ingredients: text("ingredients", { mode: "json" }).$type<string[]>(),
  macroCalories: integer("macro_calories"),
  macroProtein: integer("macro_protein"),
  macroCarbs: integer("macro_carbs"),
  macroFats: integer("macro_fats"),
  pairing: text("pairing"),
  tags: text("tags", { mode: "json" }).$type<string[]>(),
});

// ─── Events ───
export const events = sqliteTable("events", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  day: text("day").notNull(),
  time: text("time").notNull(),
  location: text("location").notNull(),
  shortDesc: text("short_desc").notNull(),
  fullDesc: text("full_desc").notNull(),
  theme: text("theme"),
  dressCode: text("dress_code"),
  musicGenre: text("music_genre"),
  specialMenu: text("special_menu"),
  guestArtist: text("guest_artist"),
  availabilityPercent: integer("availability_percent").notNull().default(100),
  isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(false),
  image: text("image").notNull(),
});

// ─── Event Tickets ───
export const eventTickets = sqliteTable("event_tickets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  eventId: text("event_id")
    .notNull()
    .references(() => events.id),
  label: text("label").notNull(),
  price: real("price").notNull(),
  perks: text("perks").notNull(),
});

// ─── Reservations ───
export const reservations = sqliteTable("reservations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  guests: integer("guests").notNull(),
  specialRequests: text("special_requests"),
  status: text("status").notNull().default("pending"), // pending | confirmed | cancelled
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});
