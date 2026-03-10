import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/client";
import { allPostSlugsQuery } from "@/sanity/queries";

const BASE_URL = "https://ransfordoppong.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    { route: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { route: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { route: "/projects", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/research", priority: 0.9, changeFrequency: "daily" as const },
    { route: "/publications", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "/initiatives", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "/startups", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/collaborations", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/achievements", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { route: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const slugs = await sanityFetch<{ slug: string }[]>({ query: allPostSlugsQuery });
  const researchRoutes = slugs.map(({ slug }) => ({
    url: `${BASE_URL}/research/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...researchRoutes];
}
