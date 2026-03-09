import type { ServicePackage } from "@/types";

export const services: ServicePackage[] = [
  {
    id: "advisory",
    name: "AI/ML Advisory",
    tagline: "Strategic guidance for your AI journey",
    description:
      "Monthly advisory retainer for startups and enterprises navigating AI strategy, ML system architecture, and quantum readiness. Includes regular calls, async support, and document reviews.",
    deliverables: [
      "2× 1-hour strategy calls per month",
      "Async Slack/email support",
      "Quarterly AI roadmap review",
      "ML architecture document reviews",
      "Introduction to relevant researchers and networks",
    ],
    engagement: "3-month minimum retainer",
    priceRange: "Contact for pricing",
    cta: "Start Advisory",
    featured: false,
  },
  {
    id: "deep-build",
    name: "Deep Build",
    tagline: "End-to-end AI/ML system development",
    description:
      "Full-cycle AI/ML engineering engagement. From research and architecture to production deployment. Ideal for organizations building novel ML systems, physics-informed models, or quantum-classical hybrids.",
    deliverables: [
      "Technical discovery and requirements",
      "System architecture design",
      "Full implementation and testing",
      "Production deployment and monitoring",
      "Team knowledge transfer",
      "3 months post-launch support",
    ],
    engagement: "6–16 weeks",
    priceRange: "Contact for scoping",
    cta: "Scope a Project",
    featured: true,
  },
  {
    id: "research-partnership",
    name: "Research Partnership",
    tagline: "Joint research toward publication",
    description:
      "Academic or industry research collaboration targeting peer-reviewed publication. I bring both domain expertise (Quantum ML, Physics-ML) and engineering rigor to joint research efforts.",
    deliverables: [
      "Joint research scoping session",
      "Literature review and experimental design",
      "Co-development of code and experiments",
      "Co-authorship on resulting papers",
      "Conference presentation support",
      "Open-source artifact release",
    ],
    engagement: "6–18 months",
    cta: "Propose Research",
    featured: false,
  },
];
