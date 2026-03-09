import type { CollaborationOpportunity } from "@/types";

export const collaborations: CollaborationOpportunity[] = [
  {
    id: "quantum-algorithms",
    title: "Quantum Algorithm Development for ML",
    area: "Quantum Machine Learning",
    description:
      "Looking to collaborate on developing novel quantum algorithms that provide provable speedups for ML tasks. Particularly interested in quantum kernel methods and variational algorithms.",
    ideal:
      "Quantum computing researcher with experience in circuit design, or ML researcher interested in quantum approaches.",
    commitment: "6-12 months, remote-friendly",
    open: true,
  },
  {
    id: "climate-pinn",
    title: "Physics-Informed ML for Climate Modeling",
    area: "Physics-ML / Climate Science",
    description:
      "Collaboration on applying physics-informed neural networks to improve climate model resolution and accuracy. Aiming for journal publication and potential conference presentation.",
    ideal:
      "Climate scientist or atmospheric physicist with access to simulation data. ML background a bonus but not required.",
    commitment: "8-12 months, mixed remote/in-person",
    open: true,
  },
  {
    id: "ai-drug-discovery",
    title: "Quantum-Enhanced Drug Discovery Pipeline",
    area: "Quantum ML / Computational Biology",
    description:
      "Building a hybrid quantum-classical pipeline for molecular property prediction and drug candidate screening. Targeting top computational chemistry venues.",
    ideal:
      "Computational chemist or bioinformatician. Experience with molecular dynamics or quantum chemistry a plus.",
    commitment: "12 months",
    open: true,
  },
  {
    id: "ml-education-africa",
    title: "ML Curriculum Development for African Universities",
    area: "Education / AI",
    description:
      "Developing comprehensive, locally-relevant ML and AI curricula for African universities. Goal is to create open-access materials that reflect African scientific contexts.",
    ideal:
      "Educator or researcher at an African institution passionate about science education and open-source learning.",
    commitment: "6 months, fully remote",
    open: true,
  },
];
