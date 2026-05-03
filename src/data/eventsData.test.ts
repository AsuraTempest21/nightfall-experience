import { describe, it, expect } from "vitest";
import { eventsData } from "@/data/eventsData";

describe("eventsData", () => {
  it("should export a non-empty events array", () => {
    expect(eventsData.length).toBeGreaterThan(0);
  });

  it("every event should have required fields", () => {
    eventsData.forEach((event) => {
      expect(event.id).toBeTruthy();
      expect(event.title).toBeTruthy();
      expect(event.date).toBeTruthy();
      expect(event.day).toBeTruthy();
      expect(event.time).toBeTruthy();
      expect(event.location).toBeTruthy();
      expect(event.shortDesc).toBeTruthy();
      expect(event.fullDesc).toBeTruthy();
      expect(event.image).toBeTruthy();
      expect(event.tickets.length).toBeGreaterThan(0);
      expect(event.availabilityPercent).toBeGreaterThanOrEqual(0);
      expect(event.availabilityPercent).toBeLessThanOrEqual(100);
    });
  });

  it("should have exactly one featured event", () => {
    const featured = eventsData.filter((e) => e.isFeatured);
    expect(featured.length).toBe(1);
  });

  it("ticket options should have valid pricing", () => {
    eventsData.forEach((event) => {
      event.tickets.forEach((ticket) => {
        expect(ticket.label).toBeTruthy();
        expect(ticket.price).toBeGreaterThan(0);
        expect(ticket.perks).toBeTruthy();
      });
    });
  });
});
