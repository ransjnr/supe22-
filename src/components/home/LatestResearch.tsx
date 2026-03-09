import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import ResearchCard from "@/components/shared/ResearchCard";
import AnimatedSection from "@/components/shared/AnimatedSection";
import type { ResearchPostMeta } from "@/types";

interface LatestResearchProps {
  posts: ResearchPostMeta[];
}

export default function LatestResearch({ posts }: LatestResearchProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container-max section-padding">
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <SectionHeader
            label="R&D Log"
            heading="Latest Research"
            subheading="Deep dives into Quantum ML, Physics-informed AI, and frontier engineering — shared openly."
          />
          <Link
            href="/research"
            className="flex items-center gap-1.5 text-sm text-accent font-medium hover:gap-3 transition-all whitespace-nowrap"
          >
            All posts
            <ArrowRight size={15} />
          </Link>
        </AnimatedSection>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.1}>
                <ResearchCard post={post} />
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <p className="text-primary-text/50 text-sm">Research posts coming soon.</p>
        )}
      </div>
    </section>
  );
}
