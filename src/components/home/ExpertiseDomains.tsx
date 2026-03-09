import { Code2, Brain, Atom, Zap, BookOpen } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedSection from "@/components/shared/AnimatedSection";

const DOMAINS = [
  {
    icon: Code2,
    title: "AI Software Engineering",
    description:
      "End-to-end AI system design: LLM applications, agentic systems, MLOps pipelines, and production ML infrastructure. I build systems that scale.",
    tags: ["LangChain", "FastAPI", "MLflow", "Kubernetes"],
  },
  {
    icon: Brain,
    title: "AI/ML & Data Science",
    description:
      "Classical and deep learning model development — from exploratory data science to fine-tuning frontier models for specialized scientific domains.",
    tags: ["PyTorch", "Transformers", "RAG", "Time Series"],
  },
  {
    icon: Atom,
    title: "Quantum Machine Learning",
    description:
      "Variational algorithms (VQE, QAOA), quantum-classical hybrid pipelines, error mitigation, and near-term NISQ device programming.",
    tags: ["Qiskit", "PennyLane", "VQE", "QAOA"],
  },
  {
    icon: Zap,
    title: "Physics-ML Synergy",
    description:
      "Physics-informed neural networks, neural ODEs, and scientific ML for solving differential equations, fluid dynamics, and materials simulation.",
    tags: ["PINNs", "JAX", "Neural ODE", "PDEs"],
  },
  {
    icon: BookOpen,
    title: "Research & Academia",
    description:
      "Published researcher with work in leading venues. Available for joint research, mentorship, workshops, and invited talks on frontier AI topics.",
    tags: ["NeurIPS", "ICML", "Peer Review", "Mentorship"],
  },
];

export default function ExpertiseDomains() {
  return (
    <section className="py-20 bg-white">
      <div className="container-max section-padding">
        <AnimatedSection>
          <SectionHeader
            label="Expertise"
            heading="Five Domains, One Mission"
            subheading="I operate at the intersection of AI engineering, quantum computing, and physical sciences — bringing mathematical rigor and engineering discipline to frontier research problems."
            className="mb-12"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {DOMAINS.map((domain, i) => {
            const Icon = domain.icon;
            return (
              <AnimatedSection key={domain.title} delay={i * 0.08}>
                <div className="card-base h-full group hover:border-accent/30 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gold/10 rounded-sm group-hover:bg-gold/20 transition-colors">
                      <Icon size={20} className="text-gold" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-base text-primary-text">{domain.title}</h3>
                  </div>
                  <p className="text-sm text-primary-text/70 leading-relaxed mb-4">
                    {domain.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {domain.tags.map((tag) => (
                      <span key={tag} className="tag-pill text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
