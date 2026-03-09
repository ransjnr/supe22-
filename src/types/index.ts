export interface Project {
  id: string;
  title: string;
  description: string;
  category: "AI" | "ML" | "Quantum" | "Physics-ML" | "Full-Stack";
  tags: string[];
  status: "active" | "completed" | "archived";
  github?: string;
  demo?: string;
  paper?: string;
  featured: boolean;
  thumbnail?: string;
  year: number;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: "paper" | "preprint" | "conference" | "talk" | "poster";
  doi?: string;
  arxiv?: string;
  pdf?: string;
  abstract?: string;
  tags: string[];
}

export interface ResearchPostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  category: string;
  readingTime: string;
  published: boolean;
}

export interface TimelineEvent {
  year: string;
  title: string;
  institution: string;
  description: string;
  type: "education" | "work" | "research" | "achievement";
}

export interface Initiative {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: "active" | "forming" | "completed";
  link?: string;
  tags: string[];
}

export interface Startup {
  id: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  status: "active" | "acquired" | "sunset" | "stealth";
  year: number;
  link?: string;
  logo?: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  year: string;
  type: "award" | "recognition" | "milestone" | "grant";
  description?: string;
}

export interface CollaborationOpportunity {
  id: string;
  title: string;
  area: string;
  description: string;
  ideal: string;
  commitment: string;
  open: boolean;
}

export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  description: string;
  deliverables: string[];
  engagement: string;
  priceRange?: string;
  cta: string;
  featured: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SiteStats {
  yearsExperience: number;
  projectsCompleted: number;
  papersPublished: number;
  countriesReached: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: "general" | "consulting" | "research" | "media";
}

export interface NewsletterFormData {
  email: string;
}
