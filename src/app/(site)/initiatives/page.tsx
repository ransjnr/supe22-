import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { sanityFetch } from "@/sanity/client";
import { initiativesQuery } from "@/sanity/queries";
import { cn } from "@/lib/utils";
import type { Initiative } from "@/types";

export const metadata: Metadata = {
  title: "Initiatives",
  description:
    "Research initiatives, open-source projects, and community programs led by Ransford Oppong.",
};

const STATUS_STYLES = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  forming: "bg-orange-50 text-orange-700 border-orange-200",
  completed: "bg-gray-100 text-gray-600 border-gray-200",
};

export default async function InitiativesPage() {
  const initiatives = await sanityFetch<Initiative[]>({ query: initiativesQuery, tags: ["initiative"] });

  return (
    <div className="pt-24 pb-20">
      <div className="container-max section-padding">
        <AnimatedSection className="mb-12">
          <SectionHeader
            label="Initiatives"
            heading="Research & Community Programs"
            subheading="Open-source projects, education initiatives, and research programs I lead or co-lead."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initiatives.map((initiative, i) => (
            <AnimatedSection key={initiative.id} delay={i * 0.1}>
              <div className="card-base h-full flex flex-col group hover:border-accent/30 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-serif text-lg text-primary-text group-hover:text-accent transition-colors">
                    {initiative.name}
                  </h3>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium whitespace-nowrap", STATUS_STYLES[initiative.status])}>
                    {initiative.status}
                  </span>
                </div>
                <p className="text-sm font-medium text-gold mb-3">{initiative.tagline}</p>
                <p className="text-sm text-primary-text/70 leading-relaxed mb-4 flex-1">
                  {initiative.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {initiative.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
                {initiative.link && (
                  <a
                    href={initiative.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-gold transition-colors font-medium mt-auto"
                  >
                    <ExternalLink size={14} />
                    Visit project
                  </a>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
