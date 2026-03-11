import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, projectId as rawProjectId } from "./env";

// Strip whitespace/control characters that can sneak in via env vars on Windows
const projectId = rawProjectId.trim().replace(/[^-a-z0-9]/g, "");

// Lazily created — only instantiated when projectId is present
let _client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!projectId) return null;
  if (!_client) {
    _client = createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" });
  }
  return _client;
}

// Named export for scripts that need direct access (seed script, etc.)
export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: false })
  : null;

/**
 * Fetch data from Sanity with ISR caching.
 * Returns empty array / fallback gracefully when Sanity is not configured.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  fallback,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  fallback?: T;
}): Promise<T> {
  const c = getClient();
  if (!c) {
    return (fallback ?? ([] as unknown as T));
  }
  try {
    return await c.fetch<T>(query, params, {
      next: {
        revalidate: process.env.NODE_ENV === "development" ? 30 : 60,
        tags,
      },
    });
  } catch (err) {
    console.error("Sanity fetch error:", err);
    return (fallback ?? ([] as unknown as T));
  }
}
