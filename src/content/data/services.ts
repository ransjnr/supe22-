import type { ServicePackage } from "@/types";

export const services: ServicePackage[] = [
  {
    id: "ai-engineering",
    name: "AI Engineering & Development",
    tagline: "Production-ready AI systems, agents, and automation pipelines",
    description:
      "End-to-end AI engineering from architecture to deployment. I design and build intelligent systems — multi-agent pipelines, LLM-powered applications, document intelligence, and automation workflows — across healthcare, fintech, education, and enterprise contexts. Every system is built for real-world reliability, not just demos.",
    deliverables: [
      "Technical discovery and architecture design",
      "Full implementation: agents, APIs, backends, frontends",
      "CI/CD pipeline setup and cloud deployment (Azure, AWS, Render)",
      "Testing, monitoring, and performance optimization",
      "Team knowledge transfer and documentation",
      "Post-launch support (3 months)",
    ],
    engagement: "4–12 weeks depending on scope",
    priceRange: "Contact for scoping",
    cta: "Scope a Project",
    featured: true,
  },
  {
    id: "research-collaboration",
    name: "Research Collaboration",
    tagline: "Joint research in Quantum ML, Medical AI, and Biosensors",
    description:
      "Academic or industry research collaboration targeting rigorous results and publication. My active research spans Quantum ML, medical image segmentation, Polymorphic Transformers, and photonic biosensors. I bring both deep domain knowledge and strong engineering execution to joint projects — especially in African healthcare and quantum computing contexts.",
    deliverables: [
      "Research scoping and experimental design",
      "Literature review and methodology development",
      "Co-development of models, simulations, and experiments",
      "Co-authorship on resulting papers and preprints",
      "Conference presentation support",
      "Open-source artifact release where applicable",
    ],
    engagement: "6–18 months",
    cta: "Propose Research",
    featured: false,
  },
  {
    id: "workshops-training",
    name: "Workshops & AI Training",
    tagline: "From AI tinkering to enterprise-grade automation — hands-on",
    description:
      "I design and deliver high-impact AI workshops for professionals, developers, and organizations. Current flagship: the 8-week AI Agents & Workflow Automation hybrid program. Also available for bespoke corporate training on LLMs, AI agents, no-code automation (Zapier, Make.com, n8n), and responsible AI governance.",
    deliverables: [
      "Customized curriculum and workshop materials",
      "Live sessions: virtual, hybrid, or in-person",
      "Hands-on projects and AI toolkit assignments",
      "Capstone project guidance and review",
      "Access to community, recordings, and resources",
      "Certificate of completion",
    ],
    engagement: "1-day intensive to 8-week program",
    priceRange: "Contact for institutional pricing",
    cta: "Book a Workshop",
    featured: false,
  },
];
