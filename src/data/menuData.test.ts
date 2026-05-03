import { describe, it, expect } from "vitest";
import { categories, menuItems, type MenuItem } from "@/data/menuData";

describe("menuData", () => {
  it("should export a non-empty categories array", () => {
    expect(categories.length).toBeGreaterThan(0);
  });

  it("should export a non-empty menuItems array", () => {
    expect(menuItems.length).toBeGreaterThan(0);
  });

  it("every menu item should have required fields", () => {
    menuItems.forEach((item: MenuItem) => {
      expect(item.id).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(item.description).toBeTruthy();
      expect(typeof item.price).toBe("number");
      expect(item.price).toBeGreaterThan(0);
      expect(item.category).toBeTruthy();
      expect(typeof item.isVeg).toBe("boolean");
      expect(item.images.length).toBeGreaterThan(0);
    });
  });

  it("every menu item should belong to a valid category", () => {
    const categoryIds = categories.map((c) => c.id);
    menuItems.forEach((item) => {
      expect(categoryIds).toContain(item.category);
    });
  });

  it("macros should have valid nutritional values when present", () => {
    const itemsWithMacros = menuItems.filter((item) => item.macros);
    expect(itemsWithMacros.length).toBeGreaterThan(0);
    itemsWithMacros.forEach((item) => {
      expect(item.macros!.calories).toBeGreaterThanOrEqual(0);
      expect(item.macros!.protein).toBeGreaterThanOrEqual(0);
      expect(item.macros!.carbs).toBeGreaterThanOrEqual(0);
      expect(item.macros!.fats).toBeGreaterThanOrEqual(0);
    });
  });
});
