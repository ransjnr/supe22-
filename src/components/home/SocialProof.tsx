"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import type { SiteStats } from "@/types";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function Counter({ end, suffix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

interface SocialProofProps {
  stats: SiteStats;
}

const STATS_CONFIG = [
  { key: "yearsExperience" as const, suffix: "+", label: "Years of Experience" },
  { key: "projectsCompleted" as const, suffix: "+", label: "Projects Completed" },
  { key: "papersPublished" as const, suffix: "", label: "Papers Published" },
  { key: "countriesReached" as const, suffix: "+", label: "Countries Reached" },
];

export default function SocialProof({ stats }: SocialProofProps) {
  return (
    <section className="py-16 border-y border-border-subtle">
      <div className="container-max section-padding">
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS_CONFIG.map(({ key, suffix, label }) => (
              <div key={key} className="flex flex-col items-center gap-1">
                <p className="font-serif text-4xl md:text-5xl text-accent font-bold">
                  <Counter end={stats[key]} suffix={suffix} />
                </p>
                <p className="text-xs text-primary-text/50 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
