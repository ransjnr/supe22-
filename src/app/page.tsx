import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import ExpertiseDomains from "@/components/home/ExpertiseDomains";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import LatestResearch from "@/components/home/LatestResearch";
import SocialProof from "@/components/home/SocialProof";
import NewsletterCTA from "@/components/home/NewsletterCTA";
import { getAllPosts } from "@/lib/mdx";
import { projects } from "@/content/data/projects";
import { stats } from "@/content/data/stats";

export const metadata: Metadata = {
  title: "Ransford Oppong — AI Engineer · Quantum ML · Physics-ML Researcher",
  description:
    "AI Software Engineer and Researcher specializing in Machine Learning, Quantum ML, and Physics-informed Neural Networks. Available for consulting, research collaborations, and speaking.",
};

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

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
