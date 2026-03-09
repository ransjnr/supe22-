import type { Publication } from "@/types";

// Note: Ransford has conference presentations but no peer-reviewed publications yet.
// This file will be updated as papers are submitted and published.
export const publications: Publication[] = [
  {
    id: "pa-aiss-2025",
    title: "Rating-Aware Classifications for Evidence-Based Cardio-Diagnostic AI",
    authors: ["Ransford Oppong"],
    venue: "4th Pan-African Artificial Intelligence and Smart Systems Conference (PA-AISS 2025)",
    year: 2025,
    type: "conference",
    abstract:
      "Presented a rating-aware classification framework for evidence-based AI-assisted cardiac diagnosis, exploring how patient feedback ratings can be incorporated into diagnostic AI pipelines for improved clinical utility.",
    tags: ["Medical AI", "Cardio-Diagnostics", "Classification", "Clinical AI", "Africa"],
  },
  {
    id: "ifa-berlin-2025",
    title: "Polymorphic Self-Modifying Transformers for Autonomous Medical Diagnosis and Adaptive Clinical Decision Support",
    authors: ["Ransford Oppong"],
    venue: "Innovation For All (IFA) Berlin 2025, Berlin, Germany",
    year: 2025,
    type: "conference",
    abstract:
      "Presented the PSMT architecture enabling dynamic weight and topology adaptation for medical AI. The system improves diagnostic generalization by 37.4% across evolving clinical datasets by integrating meta-reinforcement learning and differentiable architecture search (DARTS).",
    tags: ["Transformers", "Medical AI", "Adaptive ML", "Clinical Decision Support", "DARTS"],
  },
  {
    id: "in4in-2025",
    title: "Obstamed: Smart Obstacle Detection Mobility Aid for the Visually Impaired",
    authors: ["Ransford Oppong"],
    venue: "iN4iN Conference 2025, Leipzig, Germany",
    year: 2025,
    type: "conference",
    abstract:
      "Presented Obstamed, a smart obstacle detection and mobility aid system for visually impaired users, combining computer vision, embedded AI, and real-time feedback mechanisms to enable safe independent navigation.",
    tags: ["Assistive Tech", "Computer Vision", "Embedded AI", "Accessibility", "IoT"],
  },
];
