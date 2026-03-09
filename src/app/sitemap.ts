import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/mdx";

const BASE_URL = "https://ransfordoppong.com";

export default function sitemap(): MetadataRoute.Sitemap {
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

  const researchRoutes = getAllSlugs().map((slug) => ({
    url: `${BASE_URL}/research/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...researchRoutes];
}
