import type { Startup } from "@/types";

export const startups: Startup[] = [
  {
    id: "build-scitech",
    name: "BUILD SCITECH",
    tagline: "Africa's next-gen tech company — building at the frontier",
    description:
      "A multidisciplinary tech company developing products across fintech, healthtech, agritech, and ecommerce. Operates a 3-tier business model: Communication Platform as a Service (CPaaS), business consultancy, and a technology transfer program. Founded and leads a TechExpo community of 600+ African student developers, founders, and employers with a 65% conversion rate into users and employees.",
    role: "CEO & R&D Engineer",
    status: "active",
    year: 2023,
    link: "https://buildscitech.org",
  },
  {
    id: "mentismint",
    name: "MentisMint",
    tagline: "The first AI personal finance app that truly works in Africa",
    description:
      "AI-powered personal finance platform with real-time spending tracking, intelligent budgeting, and predictive financial insights built for African markets. Architected secure integrations with local payment APIs and scalable data pipelines. Currently raising $500K pre-seed funding.",
    role: "Chief Technology Officer",
    status: "active",
    year: 2025,
  },
  {
    id: "grad-ai-startup",
    name: "grad.ai",
    tagline: "Your dream school, one click away",
    description:
      "SaaS platform automating graduate school applications with AI-powered personalized guidance, SOP generation, and university matching. Built with a multi-agent Autogen pipeline, GPT-4o backend, and Langflow orchestration. Helping students across Africa and beyond get into top global universities.",
    role: "Founder & Lead Engineer",
    status: "active",
    year: 2025,
    link: "https://gradai.app",
  },
  {
    id: "next-gen-tech-giants",
    name: "Next Generation of Tech Giants",
    tagline: "Turning Africa's student builders into world-class engineers",
    description:
      "A community-driven platform and fellowship program onboarding 500+ fellows in software engineering and digital governance. Built Bengolin, a SaaS-like community platform with AI agents, a full-stack Django + Next.js admissions portal, and a Technology Transfer Program supervising 10+ student-led research projects in health, climate, and biotech.",
    role: "Co-Founder & Full Stack Engineer",
    status: "active",
    year: 2024,
  },
];
