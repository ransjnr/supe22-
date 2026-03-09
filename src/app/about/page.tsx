import type { Metadata } from "next";
import { Code2, Brain, Atom, Zap, BookOpen, MapPin, Mail } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { timeline } from "@/content/data/timeline";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Ransford Oppong — AI Engineer, Quantum ML Researcher, and Physics-ML pioneer with expertise spanning machine learning, quantum computing, and physical sciences.",
};

const TECH_STACK = [
  { category: "AI/ML", items: ["PyTorch", "TensorFlow", "MONAI", "Autogen", "LangChain", "HuggingFace"] },
  { category: "Quantum", items: ["IBM Qiskit", "Quantum Simulation", "Photonics", "GQD Circuits"] },
  { category: "Engineering", items: ["Python", "TypeScript", "Next.js", "Node.js", "FastAPI", "Django"] },
  { category: "Data & Cloud", items: ["MongoDB", "PostgreSQL", "ConvexDB", "Azure", "AWS", "Firebase"] },
  { category: "Automation", items: ["Zapier", "Make.com", "n8n", "Langflow", "Flowise", "CI/CD"] },
  { category: "Mobile & Web", items: ["React Native", "AngularJS", "PHP", "REST API", "GraphQL"] },
];

const TYPE_COLORS = {
  education: "border-blue-400 bg-blue-50",
  work: "border-accent bg-accent/5",
  research: "border-gold bg-gold/5",
  achievement: "border-emerald-400 bg-emerald-50",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="container-max section-padding mb-20">
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Photo placeholder */}
            <div className="lg:col-span-2">
              <div className="aspect-[4/5] bg-gradient-to-br from-accent/10 via-gold/5 to-accent/5 rounded-sm border border-border-subtle flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center mx-auto mb-3">
                    <Atom size={40} className="text-accent/40" strokeWidth={1} />
                  </div>
                  <p className="text-xs text-primary-text/30">Photo coming soon</p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-primary-text/70">
                  <MapPin size={15} className="text-gold" />
                  Kumasi, Ghana · Available worldwide
                </div>
                <div className="flex items-center gap-2 text-sm text-primary-text/70">
                  <Mail size={15} className="text-gold" />
                  <a href="mailto:oppong.rans@gmail.com" className="hover:text-accent transition-colors">
                    oppong.rans@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-3">
              <p className="section-label mb-3">About Me</p>
              <h1 className="font-serif text-4xl md:text-5xl text-primary-text mb-6 leading-tight">
                Building at the frontier of AI, quantum, and biomedical engineering
              </h1>
              <div className="prose prose-sm max-w-none text-primary-text/75 space-y-4 leading-relaxed">
                <p>
                  I&apos;m Ransford Oppong — AI software engineer, biomedical engineering graduate, researcher, and
                  founder based in Kumasi, Ghana. By day, I train machines to think. By night, I convince them I&apos;m
                  still in charge. I operate at the intersection of AI engineering, quantum computing, and medical
                  technology — bringing production-grade rigor to frontier research problems.
                </p>
                <p>
                  My research spans Quantum ML and photonics (GQD biosensors for neonatal sepsis diagnostics, quantum
                  threat modelling), medical AI (HALO-UNet for thyroid nodule segmentation, Polymorphic Self-Modifying
                  Transformers for adaptive clinical decision support), and assistive technologies (GSL emotion
                  recognition engines for deaf communities). I work under Prof. Jerry John Kponyo at the QCAT Lab, KNUST.
                </p>
                <p>
                  On the engineering side, I&apos;ve architected and shipped production systems across fintech,
                  healthtech, and education — including Pollix (secure e-voting), WangaChat (enterprise comms), grad.ai
                  (AI grad school applications), and MentisMint (AI personal finance for Africa). I founded BUILD SCITECH
                  and lead a community of 600+ African student developers and builders.
                </p>
                <p>
                  I&apos;ve presented research at PA-AISS 2025 (KNUST), iN4iN 2025 (Leipzig), and IFA Berlin 2025. I
                  design and deliver workshops on AI Agents & Workflow Automation for professionals and organizations.
                  I&apos;m available for consulting, research collaborations, and speaking. If you&apos;re working at
                  the frontier — especially in Africa — I&apos;d love to connect.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Tech Stack */}
      <section className="bg-white py-16 mb-20">
        <div className="container-max section-padding">
          <AnimatedSection>
            <SectionHeader label="Toolkit" heading="Technologies & Tools" className="mb-10" />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECH_STACK.map((stack, i) => (
              <AnimatedSection key={stack.category} delay={i * 0.08}>
                <div className="card-base">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gold mb-3">
                    {stack.category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.items.map((item) => (
                      <span key={item} className="tag-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container-max section-padding">
        <AnimatedSection>
          <SectionHeader label="Journey" heading="Career Timeline" className="mb-12" />
        </AnimatedSection>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border-subtle md:-translate-x-0.5" aria-hidden />

          <div className="space-y-8">
            {timeline.map((event, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div className={cn("relative flex flex-col md:flex-row gap-6", i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse")}>
                  {/* Content */}
                  <div className="flex-1 ml-10 md:ml-0 md:w-5/12">
                    <div className={cn("card-base border-l-4", TYPE_COLORS[event.type])}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-serif text-base text-primary-text leading-snug">{event.title}</h3>
                        <span className="text-xs text-primary-text/40 whitespace-nowrap">{event.year}</span>
                      </div>
                      <p className="text-xs text-gold font-semibold uppercase tracking-wide mb-2">
                        {event.institution}
                      </p>
                      <p className="text-sm text-primary-text/70 leading-relaxed">{event.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-4 w-3 h-3 rounded-full border-2 border-accent bg-background" />

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
