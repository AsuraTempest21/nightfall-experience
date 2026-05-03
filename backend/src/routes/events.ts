import { Router } from "express";
import { db } from "../db/index.js";
import { events, eventTickets } from "../db/schema.js";
import { eq } from "drizzle-orm";

const router = Router();

/**
 * GET /api/events
 * Returns all events with their ticket options.
 */
router.get("/", async (_req, res) => {
  try {
    const allEvents = await db.select().from(events);
    const allTickets = await db.select().from(eventTickets);

    // Group tickets by event
    const ticketsByEvent = new Map<string, typeof allTickets>();
    for (const ticket of allTickets) {
      const existing = ticketsByEvent.get(ticket.eventId) ?? [];
      existing.push(ticket);
      ticketsByEvent.set(ticket.eventId, existing);
    }

    const shaped = allEvents.map((event) => ({
      id: event.id,
      title: event.title,
      date: event.date,
      day: event.day,
      time: event.time,
      location: event.location,
      shortDesc: event.shortDesc,
      fullDesc: event.fullDesc,
      theme: event.theme,
      dressCode: event.dressCode,
      musicGenre: event.musicGenre,
      specialMenu: event.specialMenu,
      guestArtist: event.guestArtist,
      availabilityPercent: event.availabilityPercent,
      isFeatured: event.isFeatured,
      image: event.image,
      tickets: (ticketsByEvent.get(event.id) ?? []).map((t) => ({
        label: t.label,
        price: t.price,
        perks: t.perks,
      })),
    }));

    res.json(shaped);
  } catch (error) {
    console.error("[GET /api/events] Error:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

export default router;
