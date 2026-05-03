import { useQuery } from "@tanstack/react-query";
import { config } from "@/lib/config";
import type { EventItem } from "@/data/eventsData";
import { eventsData as localEventsData } from "@/data/eventsData";

/**
 * Fetches events data from the backend API.
 */
async function fetchEvents(): Promise<EventItem[]> {
  try {
    const res = await fetch(`${config.api.baseUrl}/events`);
    if (!res.ok) throw new Error(`Events fetch failed: ${res.status}`);
    return res.json();
  } catch {
    return localEventsData;
  }
}

export function useEvents() {
  return useQuery<EventItem[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 5 * 60 * 1000, // 5 minutes — events change more often
    retry: 2,
  });
}
