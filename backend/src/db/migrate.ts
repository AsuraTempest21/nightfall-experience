import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, "../../data");
const dbPath = path.resolve(dataDir, "nightfall.db");

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

console.log("Running migrations...");

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS menu_categories (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    tagline TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS menu_items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    price REAL NOT NULL,
    category TEXT NOT NULL REFERENCES menu_categories(id),
    is_veg INTEGER NOT NULL DEFAULT 0,
    images TEXT NOT NULL DEFAULT '[]',
    ingredients TEXT,
    macro_calories INTEGER,
    macro_protein INTEGER,
    macro_carbs INTEGER,
    macro_fats INTEGER,
    pairing TEXT,
    tags TEXT
  );

  CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    day TEXT NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    short_desc TEXT NOT NULL,
    full_desc TEXT NOT NULL,
    theme TEXT,
    dress_code TEXT,
    music_genre TEXT,
    special_menu TEXT,
    guest_artist TEXT,
    availability_percent INTEGER NOT NULL DEFAULT 100,
    is_featured INTEGER NOT NULL DEFAULT 0,
    image TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS event_tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id TEXT NOT NULL REFERENCES events(id),
    label TEXT NOT NULL,
    price REAL NOT NULL,
    perks TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    guests INTEGER NOT NULL,
    special_requests TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_reservations_date_time ON reservations(date, time);
  CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);
  CREATE INDEX IF NOT EXISTS idx_event_tickets_event ON event_tickets(event_id);
`);

console.log("✓ Migrations complete. Database at:", dbPath);
sqlite.close();
