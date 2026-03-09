import type { Startup } from "@/types";

export const startups: Startup[] = [
  {
    id: "quantumlabs",
    name: "QuantumLabs AI",
    tagline: "Making quantum advantage accessible to enterprises",
    description:
      "A deep-tech startup developing quantum-classical hybrid software for optimization problems in logistics, finance, and drug discovery. Building the abstraction layer between quantum hardware and business use cases.",
    role: "Co-Founder & CTO",
    status: "active",
    year: 2024,
    link: "https://quantumlabs.ai",
  },
  {
    id: "sciml-studio",
    name: "SciML Studio",
    tagline: "Physics-informed ML tools for scientists and engineers",
    description:
      "Developer tools and SaaS platform enabling scientists and engineers to build physics-informed ML models without deep learning expertise. Raised pre-seed funding.",
    role: "Founder",
    status: "active",
    year: 2023,
  },
  {
    id: "researchflow",
    name: "ResearchFlow",
    tagline: "AI-powered research collaboration platform",
    description:
      "A platform for academic research teams to collaborate on experiments, share datasets, and co-author papers with AI assistance. Acquired by a larger research software company.",
    role: "Co-Founder",
    status: "acquired",
    year: 2022,
  },
];
