export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// Default to empty string so the app builds without crashing before env vars
// are set. Pages return empty arrays gracefully when Sanity is not configured.
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
