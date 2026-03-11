import type { Metadata } from "next";
import Link from "next/link";
import { Users, Clock, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { sanityFetch } from "@/sanity/client";
import { collaborationsQuery } from "@/sanity/queries";
import type { CollaborationOpportunity } from "@/types";

export const metadata: Metadata = {
  title: "Collaborations",
  description:
    "Open research collaboration opportunities with Ransford Oppong in Quantum ML, Physics-ML, and AI for science.",
};

export default async function CollaborationsPage() {
  const collaborations = await sanityFetch<CollaborationOpportunity[]>({ query: collaborationsQuery, tags: ["collaboration"] });
  const open = collaborations.filter((c) => c.open);

  return (
    <div className="pt-24 pb-20">
      <div className="container-max section-padding">
        <AnimatedSection className="mb-12">
          <SectionHeader
            label="Collaborate"
            heading="Open Collaboration Slots"
            subheading="I actively seek research collaborators across quantum computing, physics-informed ML, and AI for science. Here's what I'm working on and who I'm looking for."
          />
        </AnimatedSection>

        <div className="space-y-6 mb-16">
          {open.map((collab, i) => (
            <AnimatedSection key={collab.id} delay={i * 0.1}>
              <div className="card-base group hover:border-accent/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="section-label text-xs">{collab.area}</span>
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Open
                      </span>
                    </div>
                    <h3 className="font-serif text-xl text-primary-text group-hover:text-accent transition-colors">
                      {collab.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-primary-text/50 whitespace-nowrap">
                    <Clock size={14} />
                    {collab.commitment}
                  </div>
                </div>

                <p className="text-sm text-primary-text/70 leading-relaxed mb-4">
                  {collab.description}
                </p>

                <div className="p-4 bg-gold/5 border border-gold/20 rounded-sm">
                  <div className="flex items-start gap-2">
                    <Users size={15} className="text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-gold uppercase tracking-wide mb-1">
                        Ideal collaborator
                      </p>
                      <p className="text-sm text-primary-text/70">{collab.ideal}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border-subtle">
                  <Link
                    href={`/contact?type=research&subject=${encodeURIComponent(`Collaboration: ${collab.title}`)}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-gold transition-colors"
                  >
                    Express interest
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection>
          <div className="text-center border border-border-subtle rounded-sm p-10 bg-white">
            <h2 className="font-serif text-2xl text-primary-text mb-3">
              Don&apos;t see your area listed?
            </h2>
            <p className="text-primary-text/65 mb-6 max-w-md mx-auto">
              I&apos;m open to unexpected collaborations. If you&apos;re working on something at the
              frontier of AI, physics, or quantum computing, reach out.
            </p>
            <Link href="/contact" className="btn-primary">
              Start a conversation
              <ArrowRight size={16} />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
