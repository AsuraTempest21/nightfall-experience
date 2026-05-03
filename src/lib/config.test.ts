import { describe, it, expect } from "vitest";
import { config } from "@/lib/config";

describe("config", () => {
  it("should expose api.baseUrl", () => {
    expect(config.api.baseUrl).toBeDefined();
    expect(typeof config.api.baseUrl).toBe("string");
  });

  it("should expose external URLs", () => {
    expect(config.external.zomatoUrl).toContain("http");
    expect(config.external.instagramUrl).toContain("http");
    expect(config.external.googleMapsEmbedUrl).toContain("google.com/maps");
  });

  it("should expose contact info", () => {
    expect(config.contact.phone).toBeDefined();
    expect(config.contact.phoneDisplay).toBeDefined();
    expect(config.contact.address).toBeDefined();
  });
});
