import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "quantum-ml-optimizer",
    title: "Quantum-Classical Hybrid Optimizer",
    description:
      "A variational quantum eigensolver (VQE) implementation with ML-guided parameter initialization for quantum chemistry simulation. Achieves 40% faster convergence than random initialization.",
    category: "Quantum",
    tags: ["Qiskit", "PyTorch", "VQE", "Quantum Chemistry", "Optimization"],
    status: "active",
    github: "https://github.com/ransfordoppong/quantum-ml-optimizer",
    featured: true,
    year: 2025,
  },
  {
    id: "physics-informed-nn",
    title: "Physics-Informed Neural Network Framework",
    description:
      "A flexible PINN framework for solving partial differential equations in fluid dynamics and heat transfer. Supports adaptive sampling and automatic differentiation.",
    category: "Physics-ML",
    tags: ["PINNs", "JAX", "PDEs", "Scientific ML", "PyTorch"],
    status: "active",
    github: "https://github.com/ransfordoppong/pinn-framework",
    demo: "https://pinn-demo.ransfordoppong.com",
    featured: true,
    year: 2025,
  },
  {
    id: "llm-research-assistant",
    title: "LLM-Powered Research Assistant",
    description:
      "An agentic AI system for accelerating scientific literature review. Uses RAG with domain-specific embeddings to surface relevant papers and synthesize findings.",
    category: "AI",
    tags: ["LangChain", "OpenAI", "RAG", "Vector DB", "Agents"],
    status: "active",
    github: "https://github.com/ransfordoppong/research-assistant",
    demo: "https://research-ai.ransfordoppong.com",
    featured: true,
    year: 2024,
  },
  {
    id: "quantum-error-mitigation",
    title: "Quantum Error Mitigation via ML",
    description:
      "Machine learning approach to quantum noise characterization and mitigation on NISQ devices. Reduces gate error rates by up to 60% using calibrated noise models.",
    category: "Quantum",
    tags: ["Qiskit", "Noise Mitigation", "NISQ", "Error Correction"],
    status: "completed",
    github: "https://github.com/ransfordoppong/quantum-error-ml",
    paper: "https://arxiv.org/abs/2024.xxxxx",
    featured: true,
    year: 2024,
  },
  {
    id: "ml-ops-platform",
    title: "MLOps Orchestration Platform",
    description:
      "End-to-end ML pipeline orchestration system with experiment tracking, model versioning, and automated deployment to cloud infrastructure.",
    category: "ML",
    tags: ["MLflow", "Kubernetes", "Docker", "FastAPI", "CI/CD"],
    status: "completed",
    github: "https://github.com/ransfordoppong/mlops-platform",
    featured: false,
    year: 2024,
  },
  {
    id: "neural-ode-solver",
    title: "Neural ODE for Dynamical Systems",
    description:
      "Neural ordinary differential equations for modeling complex dynamical systems in physics. Applied to chaotic systems prediction and climate modeling.",
    category: "Physics-ML",
    tags: ["Neural ODE", "Dynamical Systems", "JAX", "Physics"],
    status: "completed",
    github: "https://github.com/ransfordoppong/neural-ode-physics",
    featured: false,
    year: 2023,
  },
  {
    id: "transformer-molecular",
    title: "Transformer for Molecular Property Prediction",
    description:
      "Graph transformer architecture for predicting molecular properties from 3D structural data. Achieves state-of-the-art on QM9 benchmark.",
    category: "ML",
    tags: ["Transformers", "Graph Neural Networks", "Chemistry", "PyTorch"],
    status: "completed",
    github: "https://github.com/ransfordoppong/mol-transformer",
    featured: false,
    year: 2023,
  },
  {
    id: "ai-research-dashboard",
    title: "AI Research Collaboration Dashboard",
    description:
      "Real-time dashboard for distributed research teams to track experiments, share results, and coordinate on complex AI/ML projects.",
    category: "Full-Stack",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets", "D3.js"],
    status: "active",
    github: "https://github.com/ransfordoppong/research-dashboard",
    demo: "https://dashboard.ransfordoppong.com",
    featured: false,
    year: 2025,
  },
];
