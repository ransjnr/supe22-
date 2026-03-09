import type { Metadata } from "next";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedSection from "@/components/shared/AnimatedSection";
import ResearchList from "@/components/research/ResearchList";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Daily R&D log and research deep dives on Quantum ML, Physics-informed Neural Networks, AI engineering, and frontier machine learning from Ransford Oppong.",
};

export default function ResearchPage() {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <div className="pt-24 pb-20">
      <div className="container-max section-padding">
        <AnimatedSection className="mb-12">
          <SectionHeader
            label="R&D Log"
            heading="Research & Writing"
            subheading="Deep dives, tutorials, and research updates on Quantum ML, Physics-informed AI, and frontier engineering. Published openly."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <ResearchList posts={posts} categories={categories} />
        </AnimatedSection>
      </div>
    </div>
  );
}
