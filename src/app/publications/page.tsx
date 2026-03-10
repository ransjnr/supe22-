import type { Metadata } from "next";
import { ExternalLink, FileText } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { sanityFetch } from "@/sanity/client";
import { publicationsQuery } from "@/sanity/queries";
import { cn } from "@/lib/utils";
import type { Publication } from "@/types";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Research publications, preprints, conference papers, and invited talks by Ransford Oppong in Quantum ML, Physics-informed Neural Networks, and AI.",
};

const TYPE_LABELS: Record<Publication["type"], { label: string; color: string }> = {
  paper: { label: "Journal Paper", color: "bg-accent/8 text-accent border-accent/20" },
  preprint: { label: "Preprint", color: "bg-orange-50 text-orange-700 border-orange-200" },
  conference: { label: "Conference", color: "bg-purple-50 text-purple-700 border-purple-200" },
  talk: { label: "Invited Talk", color: "bg-gold/10 text-amber-800 border-gold/30" },
  poster: { label: "Poster", color: "bg-green-50 text-green-700 border-green-200" },
};

const TYPE_ORDER: Publication["type"][] = ["paper", "preprint", "conference", "talk", "poster"];

function PublicationItem({ pub }: { pub: Publication }) {
  const typeConfig = TYPE_LABELS[pub.type];
  const link = pub.doi
    ? `https://doi.org/${pub.doi}`
    : pub.arxiv ?? pub.pdf;

  return (
    <div className="py-5 border-b border-border-subtle last:border-0 group">
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-base text-primary-text hover:text-accent transition-colors leading-snug group flex items-start gap-1"
            >
              {pub.title}
              <ExternalLink size={13} className="shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ) : (
            <h3 className="font-serif text-base text-primary-text leading-snug">{pub.title}</h3>
          )}

          <p className="text-sm text-primary-text/60 mt-1">
            {pub.authors.join(", ")}
          </p>
          <p className="text-sm text-primary-text/50 mt-0.5">
            <span className="font-medium text-accent/80">{pub.venue}</span>
            {" · "}
            {pub.year}
          </p>

          {/* Tags + links */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", typeConfig.color)}>
              {typeConfig.label}
            </span>
            {pub.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag-pill text-xs">
                {tag}
              </span>
            ))}
            {pub.arxiv && (
              <a
                href={pub.arxiv}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent hover:underline"
              >
                arXiv
              </a>
            )}
            {pub.pdf && (
              <a
                href={pub.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
              >
                <FileText size={11} />
                PDF
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function PublicationsPage() {
  const publications = await sanityFetch<Publication[]>({ query: publicationsQuery, tags: ["publication"] });
  const grouped = TYPE_ORDER.reduce(
    (acc, type) => {
      const group = publications.filter((p) => p.type === type);
      if (group.length > 0) acc[type] = group;
      return acc;
    },
    {} as Partial<Record<Publication["type"], Publication[]>>
  );

  return (
    <div className="pt-24 pb-20">
      <div className="container-max section-padding">
        <AnimatedSection className="mb-12">
          <SectionHeader
            label="Academic"
            heading="Publications & Talks"
            subheading="Research outputs including journal papers, conference proceedings, preprints, and invited talks."
          />
        </AnimatedSection>

        <div className="space-y-12">
          {(Object.entries(grouped) as [Publication["type"], Publication[]][]).map(([type, pubs], i) => (
            <AnimatedSection key={type} delay={i * 0.1}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="font-serif text-xl text-primary-text">
                    {TYPE_LABELS[type].label}s
                  </h2>
                  <span className="text-sm text-primary-text/40">({pubs.length})</span>
                </div>
                <div className="border border-border-subtle rounded-sm px-4 divide-y divide-border-subtle bg-white">
                  {pubs.map((pub) => (
                    <PublicationItem key={pub.id} pub={pub} />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
