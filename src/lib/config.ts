/**
 * Centralized application configuration.
 * All environment variables are accessed through this module
 * so they are validated in one place and can be easily swapped.
 */
export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001/api",
  },
  captcha: {
    turnstileSiteKey: import.meta.env.VITE_TURNSTILE_SITE_KEY ?? "",
  },
  external: {
    zomatoUrl: import.meta.env.VITE_ZOMATO_URL ?? "https://zomato.com",
    instagramUrl: import.meta.env.VITE_INSTAGRAM_URL ?? "https://instagram.com",
    googleMapsEmbedUrl:
      import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL ??
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.204308!2d73.8567!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMxJzEzLjQiTiA3M8KwNTEnMjQuMSJF!5e0!3m2!1sen!2sin!4v1",
  },
  contact: {
    phone: import.meta.env.VITE_PHONE_NUMBER ?? "+910000000000",
    phoneDisplay: import.meta.env.VITE_PHONE_DISPLAY ?? "+91 00000 00000",
    address:
      import.meta.env.VITE_ADDRESS ??
      "123 Night Street, Koregaon Park, Pune 411001",
  },
} as const;
