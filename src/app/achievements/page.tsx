import type { Metadata } from "next";
import { Trophy, Star, Target, Gift } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { sanityFetch } from "@/sanity/client";
import { achievementsQuery } from "@/sanity/queries";
import { cn } from "@/lib/utils";
import type { Achievement } from "@/types";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Awards, grants, recognitions, and milestones earned by Ransford Oppong in AI, quantum computing, and research.",
};

const TYPE_CONFIG: Record<Achievement["type"], { icon: typeof Trophy; color: string; bg: string }> = {
  award: { icon: Trophy, color: "text-gold", bg: "bg-gold/10" },
  recognition: { icon: Star, color: "text-purple-600", bg: "bg-purple-50" },
  milestone: { icon: Target, color: "text-emerald-600", bg: "bg-emerald-50" },
  grant: { icon: Gift, color: "text-blue-600", bg: "bg-blue-50" },
};

export default async function AchievementsPage() {
  const achievements = await sanityFetch<Achievement[]>({ query: achievementsQuery, tags: ["achievement"] });
  const sorted = achievements;

  return (
    <div className="pt-24 pb-20">
      <div className="container-max section-padding">
        <AnimatedSection className="mb-12">
          <SectionHeader
            label="Recognition"
            heading="Awards & Milestones"
            subheading="A record of awards, grants, community recognition, and meaningful milestones."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sorted.map((achievement, i) => {
            const config = TYPE_CONFIG[achievement.type];
            const Icon = config.icon;
            return (
              <AnimatedSection key={achievement.id} delay={i * 0.07}>
                <div className="card-base flex gap-4 h-full group hover:border-accent/30 transition-colors">
                  <div className={cn("shrink-0 w-10 h-10 rounded-sm flex items-center justify-center", config.bg)}>
                    <Icon size={18} className={config.color} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-serif text-base text-primary-text leading-snug">
                        {achievement.title}
                      </h3>
                      <span className="text-xs text-primary-text/40 whitespace-nowrap">
                        {achievement.year}
                      </span>
                    </div>
                    <p className="text-xs text-gold font-semibold uppercase tracking-wide mb-2">
                      {achievement.issuer}
                    </p>
                    {achievement.description && (
                      <p className="text-sm text-primary-text/65 leading-relaxed">
                        {achievement.description}
                      </p>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </div>
  );
}
