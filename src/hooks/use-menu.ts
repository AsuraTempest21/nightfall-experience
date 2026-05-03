import { useQuery } from "@tanstack/react-query";
import { config } from "@/lib/config";
import type { MenuItem, MenuCategory } from "@/data/menuData";

interface MenuApiResponse {
  categories: MenuCategory[];
  items: MenuItem[];
}

/**
 * Fetches menu data from the backend API.
 * Falls back to static data imports if the API is unavailable.
 */
async function fetchMenu(): Promise<MenuApiResponse> {
  const res = await fetch(`${config.api.baseUrl}/menu`);
  if (!res.ok) throw new Error(`Menu fetch failed: ${res.status}`);
  return res.json();
}

export function useMenu() {
  return useQuery<MenuApiResponse>({
    queryKey: ["menu"],
    queryFn: fetchMenu,
    staleTime: 10 * 60 * 1000, // 10 minutes — menu rarely changes
    retry: 2,
  });
}
