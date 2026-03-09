import type { Initiative } from "@/types";

export const initiatives: Initiative[] = [
  {
    id: "quantum-ml-collective",
    name: "Quantum ML Collective",
    tagline: "Bridging quantum computing and machine learning research",
    description:
      "An open research initiative bringing together quantum computing and ML researchers to develop practical quantum ML algorithms. We share code, datasets, and findings openly.",
    status: "active",
    link: "https://github.com/quantum-ml-collective",
    tags: ["Quantum ML", "Open Source", "Research", "Community"],
  },
  {
    id: "physicsml-africa",
    name: "Physics-ML Africa",
    tagline: "Scientific machine learning education across Africa",
    description:
      "A mentorship and education program training the next generation of African scientists in physics-informed machine learning. Features workshops, online courses, and research collaboration.",
    status: "active",
    tags: ["Education", "Africa", "Physics-ML", "Mentorship"],
  },
  {
    id: "open-pinn",
    name: "OpenPINN",
    tagline: "Open-source physics-informed neural network library",
    description:
      "A community-driven Python library making physics-informed neural networks accessible to scientists and engineers without deep ML expertise. 500+ GitHub stars.",
    status: "active",
    link: "https://github.com/openpinn",
    tags: ["Open Source", "PINNs", "Python", "Scientific ML"],
  },
  {
    id: "ai-for-science",
    name: "AI for Science Summit",
    tagline: "Annual conference on AI applications in the physical sciences",
    description:
      "Co-organized annual summit bringing industry AI researchers and physical scientists together to accelerate scientific discovery through machine learning.",
    status: "forming",
    tags: ["Conference", "AI", "Science", "Networking"],
  },
];
