import type { CollaborationOpportunity } from "@/types";

export const collaborations: CollaborationOpportunity[] = [
  {
    id: "quantum-biosensor-research",
    title: "Quantum Photonics & Biosensor Research",
    area: "Quantum Computing / Biomedical Engineering",
    description:
      "Actively developing GQD-integrated photonic biosensors for point-of-care diagnostics using IBM Qiskit simulations. Looking to collaborate on experimental validation, wet-lab integration, and clinical deployment of quantum-simulated biosensor models for African healthcare contexts.",
    ideal:
      "Experimental physicist, biomedical engineer, or clinical researcher with access to photonics or biosensing equipment. Interest in quantum simulation and low-resource diagnostics a plus.",
    commitment: "6–12 months, remote-friendly with in-person collaboration welcome",
    open: true,
  },
  {
    id: "medical-ai-collaboration",
    title: "Medical AI & Clinical Decision Support",
    area: "Medical Imaging / AI",
    description:
      "Building on HALO-UNet and PSMT research to develop clinically deployable AI tools for low-resource African healthcare settings. Seeking collaborators for dataset acquisition, multi-hospital validation, and real-world deployment studies.",
    ideal:
      "Radiologist, clinical AI researcher, or hospital partner in Ghana or Africa with access to imaging datasets. ML engineers with experience in medical segmentation also welcome.",
    commitment: "8–12 months, mixed remote/in-person",
    open: true,
  },
  {
    id: "ai-africa-education",
    title: "AI Curriculum & Education for Africa",
    area: "Education / AI Engineering",
    description:
      "Developing open-access, locally-relevant AI and ML curricula for African universities and bootcamps — rooted in African use cases, healthcare, agritech, and governance contexts. Currently expanding the AI Agents & Workflow Automation workshop to institutional partners.",
    ideal:
      "Educator, curriculum designer, or researcher at an African institution passionate about democratizing AI education. Experience with no-code tools, Python, or LLMs a bonus.",
    commitment: "6 months, fully remote",
    open: true,
  },
  {
    id: "fintech-ai-africa",
    title: "AI-Powered Fintech for African Markets",
    area: "AI / Fintech / Product",
    description:
      "Building MentisMint as the first AI personal finance platform that works in Africa. Looking for technical co-founders, ML engineers, or fintech domain experts who understand African payment systems, mobile money APIs, and informal economy financial patterns.",
    ideal:
      "ML engineer, fintech developer, or product designer with experience in African financial systems (MTN MoMo, Flutterwave, Paystack, etc.) and a passion for financial inclusion.",
    commitment: "Long-term, equity-based",
    open: true,
  },
];
