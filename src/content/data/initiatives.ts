import type { Initiative } from "@/types";

export const initiatives: Initiative[] = [
  {
    id: "ai-automation-course",
    name: "AI Agents & Workflow Automation",
    tagline: "8-week hybrid workshop — from AI tinkering to enterprise-grade agents",
    description:
      "An 8-week hybrid workshop designed for professionals, founders, and freelancers to move beyond basic AI prompting into building real, automated enterprise systems. Curriculum covers automation opportunity spotting, workflow mapping, agent deployment, multi-step logic, and enterprise integrations using ChatGPT, Zapier, Make.com, n8n, and LangChain. All learners receive free ChatGPT Team and Zapier access.",
    status: "active",
    tags: ["AI Agents", "Automation", "No-Code", "Education", "Zapier", "LangChain"],
  },
  {
    id: "next-gen-tech-giants-initiative",
    name: "Next Generation of Tech Giants",
    tagline: "Technology Transfer Program for African student builders",
    description:
      "A mentorship and technology transfer initiative under BUILD SCITECH, supervising 10+ student-led research projects in health, climate, biotech, and energy innovation. Hosts weekly Technical Workshops on agentic system development and facilitates exposure to real-world engineering challenges. Community of 600+ African student developers and founders.",
    status: "active",
    link: "https://buildscitech.org",
    tags: ["Mentorship", "Africa", "AI Education", "Student Research", "Tech Transfer"],
  },
  {
    id: "qcat-lab-research",
    name: "QCAT Lab Research Program",
    tagline: "Quantum computing meets assistive technologies at KNUST",
    description:
      "Active research program at the Quantum Computing and Assistive Technologies (QCAT) Lab, KNUST. Current projects include: a multimodal emotion recognition engine for Ghanaian Sign Language platforms, a GQD photonic biosensor for neonatal sepsis diagnostics, and the HNDL quantum threat model for social media privacy. Supervised by Prof. Jerry John Kponyo.",
    status: "active",
    tags: ["Quantum Computing", "Assistive Tech", "Medical AI", "Biosensors", "Ghana", "Research"],
  },
  {
    id: "encode-africa-education",
    name: "Encode Africa — Education Division",
    tagline: "Building Africa's next generation of blockchain and AI developers",
    description:
      "Leading the Education Division at Encode Africa, designing and delivering curriculum on emerging technologies including AI, computer vision, IoT, and robotics for African student developers. Bridging the gap between theoretical education and production-grade engineering skills.",
    status: "active",
    tags: ["Education", "Africa", "Blockchain", "AI", "IoT", "Curriculum"],
  },
];
