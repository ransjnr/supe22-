import type { Metadata } from "next";
import { ExternalLink, Rocket } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { sanityFetch } from "@/sanity/client";
import { startupsQuery } from "@/sanity/queries";
import { cn } from "@/lib/utils";
import type { Startup } from "@/types";

export const metadata: Metadata = {
  title: "Startups",
  description:
    "Startup ventures founded and co-founded by Ransford Oppong in AI, quantum computing, and scientific ML.",
};

const STATUS_STYLES = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  acquired: "bg-blue-50 text-blue-700 border-blue-200",
  sunset: "bg-gray-100 text-gray-600 border-gray-200",
  stealth: "bg-purple-50 text-purple-700 border-purple-200",
};

export default async function StartupsPage() {
  const startups = await sanityFetch<Startup[]>({ query: startupsQuery, tags: ["startup"] });

  return (
    <div className="pt-24 pb-20">
      <div className="container-max section-padding">
        <AnimatedSection className="mb-12">
          <SectionHeader
            label="Ventures"
            heading="Startup Portfolio"
            subheading="Companies I've founded and co-founded at the intersection of AI, quantum computing, and deep technology."
          />
        </AnimatedSection>

        <div className="space-y-6">
          {startups.map((startup, i) => (
            <AnimatedSection key={startup.id} delay={i * 0.1}>
              <div className="card-base flex flex-col md:flex-row gap-6 group hover:border-accent/30 transition-colors">
                {/* Logo placeholder */}
                <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 bg-accent/5 border border-border-subtle rounded-sm flex items-center justify-center">
                  <Rocket size={24} className="text-accent/40" strokeWidth={1.5} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-serif text-xl text-primary-text group-hover:text-accent transition-colors">
                        {startup.name}
                      </h3>
                      <p className="text-sm text-gold font-medium">{startup.role} · {startup.year}</p>
                    </div>
                    <span className={cn("text-xs px-2.5 py-0.5 rounded-full border font-medium", STATUS_STYLES[startup.status])}>
                      {startup.status}
                    </span>
                  </div>

                  <p className="text-sm text-primary-text/60 mb-2 italic">{startup.tagline}</p>
                  <p className="text-sm text-primary-text/70 leading-relaxed mb-4">
                    {startup.description}
                  </p>

                  {startup.link && (
                    <a
                      href={startup.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-gold transition-colors font-medium"
                    >
                      <ExternalLink size={14} />
                      Visit {startup.name}
                    </a>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
