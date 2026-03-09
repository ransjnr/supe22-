"use client";

import { useState } from "react";
import FilterBar from "@/components/shared/FilterBar";
import ProjectCard from "@/components/shared/ProjectCard";
import type { Project } from "@/types";

const FILTERS = ["All", "AI", "ML", "Quantum", "Physics-ML", "Full-Stack"];

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <FilterBar options={FILTERS} active={active} onChange={setActive} />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-sm text-primary-text/50 py-8">
            No projects in this category yet.
          </p>
        )}
      </div>
    </>
  );
}
