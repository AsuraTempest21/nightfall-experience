import { Router } from "express";
import { db } from "../db/index.js";
import { menuCategories, menuItems } from "../db/schema.js";
import { asc } from "drizzle-orm";

const router = Router();

/**
 * GET /api/menu
 * Returns all categories with their items, ordered by sort_order.
 */
router.get("/", async (_req, res) => {
  try {
    const cats = await db
      .select()
      .from(menuCategories)
      .orderBy(asc(menuCategories.sortOrder));

    const items = await db.select().from(menuItems);

    // Shape the response to match frontend expectations
    const shaped = items.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      longDescription: item.longDescription,
      price: item.price,
      category: item.category,
      isVeg: item.isVeg,
      images: item.images,
      ingredients: item.ingredients ?? [],
      macros: item.macroCalories != null
        ? {
            calories: item.macroCalories,
            protein: item.macroProtein ?? 0,
            carbs: item.macroCarbs ?? 0,
            fats: item.macroFats ?? 0,
          }
        : undefined,
      pairing: item.pairing,
      tags: item.tags ?? [],
    }));

    res.json({ categories: cats, items: shaped });
  } catch (error) {
    console.error("[GET /api/menu] Error:", error);
    res.status(500).json({ error: "Failed to fetch menu data" });
  }
});

export default router;
