import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import ExpertiseDomains from "@/components/home/ExpertiseDomains";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import LatestResearch from "@/components/home/LatestResearch";
import SocialProof from "@/components/home/SocialProof";
import NewsletterCTA from "@/components/home/NewsletterCTA";
import { sanityFetch } from "@/sanity/client";
import { featuredProjectsQuery, latestPostsQuery, siteSettingsQuery } from "@/sanity/queries";
import type { Project, ResearchPostMeta, SiteStats } from "@/types";

export const metadata: Metadata = {
  title: "Ransford Oppong — AI Engineer · Quantum ML · Physics-ML Researcher",
  description:
    "AI Software Engineer and Researcher specializing in Machine Learning, Quantum ML, and Physics-informed Neural Networks. Available for consulting, research collaborations, and speaking.",
};

export default async function HomePage() {
  const [featuredProjects, latestPosts, siteSettings] = await Promise.all([
    sanityFetch<Project[]>({ query: featuredProjectsQuery, tags: ["project"] }),
    sanityFetch<ResearchPostMeta[]>({ query: latestPostsQuery, tags: ["researchPost"] }),
    sanityFetch<SiteStats | null>({ query: siteSettingsQuery, tags: ["siteSettings"], fallback: null }),
  ]);

  const stats: SiteStats = siteSettings ?? {
    yearsExperience: 4,
    projectsCompleted: 20,
    papersPublished: 3,
    countriesReached: 5,
  };

  return (
    <>
      <Hero />
      <ExpertiseDomains />
      <FeaturedProjects projects={featuredProjects} />
      <LatestResearch posts={latestPosts} />
      <SocialProof stats={stats} />
      <NewsletterCTA />
    </>
  );
}
