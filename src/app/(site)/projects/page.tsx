import type { Metadata } from "next";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedSection from "@/components/shared/AnimatedSection";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import { sanityFetch } from "@/sanity/client";
import { projectsQuery } from "@/sanity/queries";
import type { Project } from "@/types";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Ransford Oppong's projects spanning AI engineering, quantum machine learning, physics-informed neural networks, and full-stack development.",
};

export default async function ProjectsPage() {
  const projects = await sanityFetch<Project[]>({ query: projectsQuery, tags: ["project"] });

  return (
    <div className="pt-24 pb-20">
      <div className="container-max section-padding">
        <AnimatedSection className="mb-12">
          <SectionHeader
            label="Work"
            heading="Projects & Builds"
            subheading="Research implementations, open-source libraries, and engineering projects across AI, Quantum ML, Physics-ML, and full-stack development."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <ProjectsGrid projects={projects} />
        </AnimatedSection>
      </div>
    </div>
  );
}
