"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ExternalLink, FileText, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

const CATEGORY_COLORS: Record<Project["category"], string> = {
  AI: "bg-blue-50 text-blue-700 border-blue-200",
  ML: "bg-purple-50 text-purple-700 border-purple-200",
  Quantum: "bg-accent/8 text-accent border-accent/20",
  "Physics-ML": "bg-gold/10 text-amber-800 border-gold/30",
  "Full-Stack": "bg-green-50 text-green-700 border-green-200",
};

const STATUS_COLORS: Record<Project["status"], string> = {
  active: "bg-emerald-50 text-emerald-700",
  completed: "bg-gray-100 text-gray-600",
  archived: "bg-orange-50 text-orange-600",
};

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(30,58,95,0.10)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="card-base flex flex-col h-full group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className={cn(
            "inline-flex text-xs font-semibold px-2 py-0.5 rounded-full border",
            CATEGORY_COLORS[project.category]
          )}
        >
          {project.category}
        </span>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium",
              STATUS_COLORS[project.status]
            )}
          >
            {project.status === "active" && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            )}
            {project.status}
          </span>
          <span className="text-xs text-primary-text/40">{project.year}</span>
        </div>
      </div>

      {/* Title + Description */}
      <h3 className="font-serif text-lg text-primary-text mb-2 leading-snug group-hover:text-accent transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-primary-text/70 leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="tag-pill">
            {tag}
          </span>
        ))}
        {project.tags.length > 4 && (
          <span className="tag-pill">+{project.tags.length - 4}</span>
        )}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3 pt-3 border-t border-border-subtle">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center gap-1.5 text-xs text-primary-text/60 hover:text-accent transition-colors"
          >
            <Github size={14} />
            Code
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Live Demo"
            className="flex items-center gap-1.5 text-xs text-primary-text/60 hover:text-accent transition-colors"
          >
            <ExternalLink size={14} />
            Demo
          </a>
        )}
        {project.paper && (
          <a
            href={project.paper}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Paper"
            className="flex items-center gap-1.5 text-xs text-primary-text/60 hover:text-accent transition-colors"
          >
            <FileText size={14} />
            Paper
          </a>
        )}
      </div>
    </motion.div>
  );
}
