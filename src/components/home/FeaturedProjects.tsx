import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import ProjectCard from "@/components/shared/ProjectCard";
import AnimatedSection from "@/components/shared/AnimatedSection";
import type { Project } from "@/types";

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="py-20">
      <div className="container-max section-padding">
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <SectionHeader
            label="Projects"
            heading="Featured Work"
            subheading="A selection of research projects, open-source tools, and engineering builds."
          />
          <Link
            href="/projects"
            className="flex items-center gap-1.5 text-sm text-accent font-medium hover:gap-3 transition-all whitespace-nowrap"
          >
            All projects
            <ArrowRight size={15} />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 0.1}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
