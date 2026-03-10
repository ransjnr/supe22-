import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
  apiVersion: "2024-01-01",
});

// ---------------------------------------------------------------------------
// Inlined data (copied from src/content/data/*)
// ---------------------------------------------------------------------------

const projects = [
  {
    id: "halo-unet",
    title: "HALO-UNet — Thyroid Nodule Segmentation",
    description:
      "Lightweight multistage deep learning framework for thyroid nodule segmentation on real-world ultrasound datasets (TN3K, DDTI). Achieved 71% Dice score with >70% faster inference via hardware-aware pruning & quantization. Deployed to Hugging Face Inference Endpoints.",
    category: "ML",
    tags: ["PyTorch", "TensorFlow", "MONAI", "FastAPI", "Azure", "HuggingFace", "Medical Imaging"],
    status: "active",
    github: "https://github.com/ransjnr/HALO-UNet",
    demo: "https://huggingface.co/spaces/ransjnr/halo-unet",
    featured: true,
    year: 2025,
    thumbnail: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
  },
  {
    id: "pollix",
    title: "Pollix — Secure Pay-to-Vote Platform",
    description:
      "Full-stack anonymous e-voting and ticketing platform with real-time analytics, custom CMS, USSD integration, and token-based pay-to-vote system. Features department-specific admin panels and super admin dashboard.",
    category: "Full-Stack",
    tags: ["Next.js", "Node.js", "ConvexDB", "PHP", "Azure", "Tailwind CSS", "REST API"],
    status: "active",
    github: "https://github.com/ransjnr/evote",
    demo: "https://pollix.vercel.app",
    featured: true,
    year: 2024,
    thumbnail: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&q=80",
  },
  {
    id: "grad-ai",
    title: "grad.ai — Graduate School Application SaaS",
    description:
      "AI platform automating grad school applications with personalized guidance, SOP generation, and university matching. Built with multi-agent Autogen pipeline and GPT-4o backend.",
    category: "AI",
    tags: ["Python", "Langflow", "GPT-4o", "Autogen", "MongoDB", "AngularJS", "Tailwind CSS"],
    status: "active",
    demo: "https://gradai.app",
    featured: true,
    year: 2025,
    thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
  },
  {
    id: "cactus",
    title: "Cactus — Low-Latency AI Inference Engine",
    description:
      "Production-grade AI inference engine written in C optimized for mobile devices and wearables. Built as part of the Cactus x DeepMind Hackathon, targeting real-time on-device ML.",
    category: "AI",
    tags: ["C", "Embedded AI", "Mobile Inference", "On-Device ML", "DeepMind"],
    status: "active",
    github: "https://github.com/ransjnr/cactus",
    featured: true,
    year: 2025,
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
  {
    id: "gqd-biosensor",
    title: "GQD Photonic Biosensor for Neonatal Sepsis",
    description:
      "Dual-mode Graphene Quantum-Dot silicon nitride photonic biosensor achieving a simulated detection limit of 0.02 ng/mL for IL-6. Validated multiplexed detection of PCT, CRP, and IL-6 using IBM Qiskit quantum simulation models.",
    category: "Quantum",
    tags: ["IBM Qiskit", "Quantum Simulation", "Photonics", "Biosensor", "Python", "Medical"],
    status: "active",
    featured: true,
    year: 2026,
    thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
  },
  {
    id: "psmt",
    title: "Polymorphic Self-Modifying Transformers",
    description:
      "PSMT architecture enabling dynamic weight and topology adaptation, improving diagnostic generalization by 37.4% across evolving clinical datasets. Integrates meta-reinforcement and DARTS for self-optimization with 2.6x faster convergence.",
    category: "ML",
    tags: ["PyTorch", "Transformers", "DARTS", "Meta-RL", "Medical AI", "EHR"],
    status: "active",
    featured: false,
    year: 2025,
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    id: "wangachat",
    title: "WangaChat — Business Collaboration Platform",
    description:
      "Secure, scalable cloud-based team collaboration platform with end-to-end encryption, enterprise API support, and cross-platform accessibility. Privacy-first messaging for businesses and individuals.",
    category: "Full-Stack",
    tags: ["AngularJS", "Node.js", "ConvexDB", "PHP", "Azure", "REST API"],
    status: "active",
    github: "https://github.com/ransjnr/ngotchat",
    featured: false,
    year: 2024,
    thumbnail: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80",
  },
  {
    id: "multi-agent-research-assistant",
    title: "Multi-Agent Marketing Research Assistant",
    description:
      "Multi-conversational AI agent system built with AutoGen and GPT-4o-mini for market video script writing. Features proxy agents, idea generator, script writer, script reviewer, Tavily web search, and ChromaDB memory.",
    category: "AI",
    tags: ["Autogen", "GPT-4o-mini", "ChromaDB", "Tavily", "Python", "Multi-Agent"],
    status: "completed",
    github: "https://github.com/ransjnr/building-ai-agents-with-autogen",
    featured: false,
    year: 2024,
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
  },
  {
    id: "airbnb-neural-framework",
    title: "Dual-Path Neural Framework for Airbnb Pricing",
    description:
      "Content-based recommendation and dynamic pricing system for Airbnb listings using machine learning. Achieved R² of 0.989 with a dual-path neural network integrating collaborative filtering and price prediction.",
    category: "ML",
    tags: ["Python", "TensorFlow", "SHAP", "Recommendation System", "Price Prediction"],
    status: "completed",
    featured: false,
    year: 2024,
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
  },
  {
    id: "obstamed",
    title: "Obstamed — Smart Obstacle Detection Aid",
    description:
      "Smart obstacle detection mobility aid for the visually impaired. Presented at iN4iN Conference 2025 in Leipzig, Germany. Integrates computer vision and embedded AI for real-time assistive navigation.",
    category: "AI",
    tags: ["Computer Vision", "Embedded AI", "Python", "IoT", "Assistive Tech"],
    status: "completed",
    github: "https://github.com/ransjnr/obstutor",
    featured: false,
    year: 2025,
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
];

const timeline = [
  {
    year: "2026 – Present",
    title: "Research Assistant — Quantum & Photonics",
    institution: "QCAT Lab, KNUST",
    description:
      "Developing GQD photonic biosensors for neonatal sepsis diagnostics and formulating the Harvest-Now-Deceive-Later (HNDL) quantum threat model for social media behavioral reconstruction. Supervised by Prof. J. J. Kponyo.",
    type: "research",
  },
  {
    year: "2025 – Present",
    title: "Chief Technology Officer",
    institution: "MentisMint",
    description:
      "Architecting the first AI-powered personal finance platform designed for Africa, with real-time spending tracking, intelligent budgeting, and secure data pipelines. Raising $500K pre-seed.",
    type: "work",
  },
  {
    year: "2025 – Present",
    title: "Research Assistant — Responsible AI Lab",
    institution: "RAIL, KNUST",
    description:
      "Leading development of a multimodal emotion recognition engine for Ghanaian Sign Language (GSL) mental health platforms. Designed the Spatio-Temporal Emotion Graph Network (ST-EGN) achieving 84.6% cross-modal accuracy.",
    type: "research",
  },
  {
    year: "2025",
    title: "Software Engineering Fellow",
    institution: "Headstarter AI",
    description:
      "Deployed 5 production-ready AI applications, boosted user engagement by 75% through SEO and backend optimizations, and facilitated weekly stand-ups and pair programming sessions for Ghanaian fellows.",
    type: "work",
  },
  {
    year: "2024 – 2025",
    title: "Software Engineering Lead & Brand Developer",
    institution: "Masara Consult",
    description:
      "Designed and launched an AI-powered multi-curriculum e-learning platform reaching 1,000+ UK and Ghanaian students in its first month. Led architecture reviews, sprint planning, and MySQL/Node.js backend optimization.",
    type: "work",
  },
  {
    year: "2024",
    title: "Data Analysis & Marketing Intern",
    institution: "Workspace Global",
    description:
      "Published 15+ blog posts and generated 300+ qualified leads from the UK, US, and Africa using HubSpot CRM, Substack, and LinkedIn Sales Navigator. Managed and automated the company's multi-page website.",
    type: "work",
  },
  {
    year: "2023 – Present",
    title: "CEO & R&D Engineer",
    institution: "BUILD SCITECH",
    description:
      "Founded BUILD SCITECH, a tech company building products across fintech, healthtech, agritech, and ecommerce. Runs a 3-tier model: CPaaS, business consultancy, and technology transfer. Community of 600+ African student developers.",
    type: "work",
  },
  {
    year: "2022 – 2025",
    title: "BSc Biomedical Engineering",
    institution: "KNUST, Kumasi, Ghana",
    description:
      "Graduated with a BSc in Biomedical Engineering. Thesis: Multi-Stage Deep Learning Framework for Thyroid Nodule Segmentation in Low-Resource Ultrasound Imaging (HALO-UNet). VP Projects & Innovation at ENACTUS KNUST.",
    type: "education",
  },
  {
    year: "2024",
    title: "Institute for Scientific Entrepreneurship",
    institution: "StArfrica, University of Koblenz, Germany",
    description:
      "Completed the Institute for Scientific Entrepreneurship program at StArfrica Startup Germany Africa, University of Koblenz, gaining hands-on training in startup methodology and science-to-market strategies.",
    type: "education",
  },
  {
    year: "2018 – 2021",
    title: "High School Diploma — Biology",
    institution: "St. Augustine's College, Cape Coast, Ghana",
    description:
      "Completed secondary education at St. Augustine's College, Cape Coast, with a focus on Biology and the sciences.",
    type: "education",
  },
];

const achievements = [
  {
    id: "ai-education-hackathon-2025",
    title: "Winner — AI & Education Hackathon 2025",
    issuer: "Scholarly",
    year: "2025",
    type: "award",
    description:
      "1st place winner at the AI & Education Hackathon organized by Scholarly, building an AI-powered educational platform that outperformed 100+ competing teams.",
  },
  {
    id: "microsoft-scholarship",
    title: "Microsoft Scholarship — $150,000 Azure Credits",
    issuer: "Microsoft",
    year: "2024",
    type: "grant",
    description:
      "Awarded $150,000 in Microsoft Azure cloud credits to support AI and cloud research, enabling large-scale model training and cloud infrastructure development.",
  },
  {
    id: "startup-grant",
    title: "Pre-Seed Startup Grant — $8,000",
    issuer: "Startup Accelerator",
    year: "2024",
    type: "grant",
    description:
      "Received $8,000 pre-seed grant for early-stage startup development, validating the business model and product roadmap for BUILD SCITECH.",
  },
  {
    id: "agea-travel-grants",
    title: "2x AGEA Travel Grants — 10,000 EUR",
    issuer: "African German Entrepreneurship Academy (AGEA)",
    year: "2023",
    type: "grant",
    description:
      "Two-time participant in the AGEA Summer Program at Universitat Leipzig, Germany, receiving 10,000 EUR in travel and program grants for scientific entrepreneurship training.",
  },
  {
    id: "smart-green-business-runnerup",
    title: "1st Runner-up — Smart Green Business Competition",
    issuer: "Sept Competence Center, Universitat Leipzig",
    year: "2023",
    type: "award",
    description:
      "1st runner-up at the Smart Green Business Competition at University of Leipzig, Germany, pitching a sustainability-driven technology venture.",
  },
  {
    id: "trestle-inngen-hackathon",
    title: "Top 7 Project — Trestle x Inngen Hackathon",
    issuer: "Trestle & Inngen",
    year: "2024",
    type: "recognition",
    description:
      "Project selected in the Top 7 out of all submissions at the Trestle x Inngen Hackathon for innovative application of AI in a real-world context.",
  },
  {
    id: "best-student-entrepreneur",
    title: "Best Student Entrepreneur of the Year",
    issuer: "KNUST College of Engineering",
    year: "2024",
    type: "award",
    description:
      "Recognized as Best Student Entrepreneur of the Year at KNUST for founding BUILD SCITECH and leading multiple student-driven innovation programs.",
  },
  {
    id: "pa-aiss-2025",
    title: "Conference Presentation — PA-AISS 2025",
    issuer: "4th Pan-African AI & Smart Systems Conference, KNUST",
    year: "2025",
    type: "milestone",
    description:
      "Presented 'Rating-Aware Classifications for Evidence-Based Cardio-Diagnostic AI' at the 4th Pan-African Artificial Intelligence and Smart Systems Conference in Ghana.",
  },
  {
    id: "ifa-berlin-2025",
    title: "Conference Presentation — Innovation For All Berlin 2025",
    issuer: "IFA Berlin, Germany",
    year: "2025",
    type: "milestone",
    description:
      "Presented 'Polymorphic Self-Modifying Transformers for Autonomous Medical Diagnosis' at Innovation For All (IFA) Berlin 2025.",
  },
  {
    id: "in4in-2025",
    title: "Conference Presentation — iN4iN Leipzig 2025",
    issuer: "iN4iN Conference, Leipzig, Germany",
    year: "2025",
    type: "milestone",
    description:
      "Presented 'Obstamed: Smart Obstacle Detection Mobility Aid for the Visually Impaired' at the iN4iN Conference in Leipzig, Germany.",
  },
];

const startups = [
  {
    id: "build-scitech",
    name: "BUILD SCITECH",
    tagline: "Africa's next-gen tech company — building at the frontier",
    description:
      "A multidisciplinary tech company developing products across fintech, healthtech, agritech, and ecommerce. Operates a 3-tier business model: Communication Platform as a Service (CPaaS), business consultancy, and a technology transfer program. Founded and leads a TechExpo community of 600+ African student developers, founders, and employers with a 65% conversion rate into users and employees.",
    role: "CEO & R&D Engineer",
    status: "active",
    year: 2023,
    link: "https://buildscitech.org",
  },
  {
    id: "mentismint",
    name: "MentisMint",
    tagline: "The first AI personal finance app that truly works in Africa",
    description:
      "AI-powered personal finance platform with real-time spending tracking, intelligent budgeting, and predictive financial insights built for African markets. Architected secure integrations with local payment APIs and scalable data pipelines. Currently raising $500K pre-seed funding.",
    role: "Chief Technology Officer",
    status: "active",
    year: 2025,
  },
  {
    id: "grad-ai-startup",
    name: "grad.ai",
    tagline: "Your dream school, one click away",
    description:
      "SaaS platform automating graduate school applications with AI-powered personalized guidance, SOP generation, and university matching. Built with a multi-agent Autogen pipeline, GPT-4o backend, and Langflow orchestration. Helping students across Africa and beyond get into top global universities.",
    role: "Founder & Lead Engineer",
    status: "active",
    year: 2025,
    link: "https://gradai.app",
  },
  {
    id: "next-gen-tech-giants",
    name: "Next Generation of Tech Giants",
    tagline: "Turning Africa's student builders into world-class engineers",
    description:
      "A community-driven platform and fellowship program onboarding 500+ fellows in software engineering and digital governance. Built Bengolin, a SaaS-like community platform with AI agents, a full-stack Django + Next.js admissions portal, and a Technology Transfer Program supervising 10+ student-led research projects in health, climate, and biotech.",
    role: "Co-Founder & Full Stack Engineer",
    status: "active",
    year: 2024,
  },
];

const initiatives = [
  {
    id: "ai-automation-course",
    name: "AI Agents & Workflow Automation",
    tagline: "8-week hybrid workshop — from AI tinkering to enterprise-grade agents",
    description:
      "An 8-week hybrid workshop designed for professionals, founders, and freelancers to move beyond basic AI prompting into building real, automated enterprise systems. Curriculum covers automation opportunity spotting, workflow mapping, agent deployment, multi-step logic, and enterprise integrations using ChatGPT, Zapier, Make.com, n8n, and LangChain. All learners receive free ChatGPT Team and Zapier access.",
    status: "active",
    tags: ["AI Agents", "Automation", "No-Code", "Education", "Zapier", "LangChain"],
  },
  {
    id: "next-gen-tech-giants-initiative",
    name: "Next Generation of Tech Giants",
    tagline: "Technology Transfer Program for African student builders",
    description:
      "A mentorship and technology transfer initiative under BUILD SCITECH, supervising 10+ student-led research projects in health, climate, biotech, and energy innovation. Hosts weekly Technical Workshops on agentic system development and facilitates exposure to real-world engineering challenges. Community of 600+ African student developers and founders.",
    status: "active",
    link: "https://buildscitech.org",
    tags: ["Mentorship", "Africa", "AI Education", "Student Research", "Tech Transfer"],
  },
  {
    id: "qcat-lab-research",
    name: "QCAT Lab Research Program",
    tagline: "Quantum computing meets assistive technologies at KNUST",
    description:
      "Active research program at the Quantum Computing and Assistive Technologies (QCAT) Lab, KNUST. Current projects include: a multimodal emotion recognition engine for Ghanaian Sign Language platforms, a GQD photonic biosensor for neonatal sepsis diagnostics, and the HNDL quantum threat model for social media privacy. Supervised by Prof. Jerry John Kponyo.",
    status: "active",
    tags: ["Quantum Computing", "Assistive Tech", "Medical AI", "Biosensors", "Ghana", "Research"],
  },
  {
    id: "encode-africa-education",
    name: "Encode Africa — Education Division",
    tagline: "Building Africa's next generation of blockchain and AI developers",
    description:
      "Leading the Education Division at Encode Africa, designing and delivering curriculum on emerging technologies including AI, computer vision, IoT, and robotics for African student developers. Bridging the gap between theoretical education and production-grade engineering skills.",
    status: "active",
    tags: ["Education", "Africa", "Blockchain", "AI", "IoT", "Curriculum"],
  },
];

const collaborations = [
  {
    id: "quantum-biosensor-research",
    title: "Quantum Photonics & Biosensor Research",
    area: "Quantum Computing / Biomedical Engineering",
    description:
      "Actively developing GQD-integrated photonic biosensors for point-of-care diagnostics using IBM Qiskit simulations. Looking to collaborate on experimental validation, wet-lab integration, and clinical deployment of quantum-simulated biosensor models for African healthcare contexts.",
    ideal:
      "Experimental physicist, biomedical engineer, or clinical researcher with access to photonics or biosensing equipment. Interest in quantum simulation and low-resource diagnostics a plus.",
    commitment: "6-12 months, remote-friendly with in-person collaboration welcome",
    open: true,
  },
  {
    id: "medical-ai-collaboration",
    title: "Medical AI & Clinical Decision Support",
    area: "Medical Imaging / AI",
    description:
      "Building on HALO-UNet and PSMT research to develop clinically deployable AI tools for low-resource African healthcare settings. Seeking collaborators for dataset acquisition, multi-hospital validation, and real-world deployment studies.",
    ideal:
      "Radiologist, clinical AI researcher, or hospital partner in Ghana or Africa with access to imaging datasets. ML engineers with experience in medical segmentation also welcome.",
    commitment: "8-12 months, mixed remote/in-person",
    open: true,
  },
  {
    id: "ai-africa-education",
    title: "AI Curriculum & Education for Africa",
    area: "Education / AI Engineering",
    description:
      "Developing open-access, locally-relevant AI and ML curricula for African universities and bootcamps — rooted in African use cases, healthcare, agritech, and governance contexts. Currently expanding the AI Agents & Workflow Automation workshop to institutional partners.",
    ideal:
      "Educator, curriculum designer, or researcher at an African institution passionate about democratizing AI education. Experience with no-code tools, Python, or LLMs a bonus.",
    commitment: "6 months, fully remote",
    open: true,
  },
  {
    id: "fintech-ai-africa",
    title: "AI-Powered Fintech for African Markets",
    area: "AI / Fintech / Product",
    description:
      "Building MentisMint as the first AI personal finance platform that works in Africa. Looking for technical co-founders, ML engineers, or fintech domain experts who understand African payment systems, mobile money APIs, and informal economy financial patterns.",
    ideal:
      "ML engineer, fintech developer, or product designer with experience in African financial systems (MTN MoMo, Flutterwave, Paystack, etc.) and a passion for financial inclusion.",
    commitment: "Long-term, equity-based",
    open: true,
  },
];

const services = [
  {
    id: "ai-engineering",
    name: "AI Engineering & Development",
    tagline: "Production-ready AI systems, agents, and automation pipelines",
    description:
      "End-to-end AI engineering from architecture to deployment. I design and build intelligent systems — multi-agent pipelines, LLM-powered applications, document intelligence, and automation workflows — across healthcare, fintech, education, and enterprise contexts. Every system is built for real-world reliability, not just demos.",
    deliverables: [
      "Technical discovery and architecture design",
      "Full implementation: agents, APIs, backends, frontends",
      "CI/CD pipeline setup and cloud deployment (Azure, AWS, Render)",
      "Testing, monitoring, and performance optimization",
      "Team knowledge transfer and documentation",
      "Post-launch support (3 months)",
    ],
    engagement: "4-12 weeks depending on scope",
    priceRange: "Contact for scoping",
    cta: "Scope a Project",
    featured: true,
  },
  {
    id: "research-collaboration",
    name: "Research Collaboration",
    tagline: "Joint research in Quantum ML, Medical AI, and Biosensors",
    description:
      "Academic or industry research collaboration targeting rigorous results and publication. My active research spans Quantum ML, medical image segmentation, Polymorphic Transformers, and photonic biosensors. I bring both deep domain knowledge and strong engineering execution to joint projects — especially in African healthcare and quantum computing contexts.",
    deliverables: [
      "Research scoping and experimental design",
      "Literature review and methodology development",
      "Co-development of models, simulations, and experiments",
      "Co-authorship on resulting papers and preprints",
      "Conference presentation support",
      "Open-source artifact release where applicable",
    ],
    engagement: "6-18 months",
    cta: "Propose Research",
    featured: false,
  },
  {
    id: "workshops-training",
    name: "Workshops & AI Training",
    tagline: "From AI tinkering to enterprise-grade automation — hands-on",
    description:
      "I design and deliver high-impact AI workshops for professionals, developers, and organizations. Current flagship: the 8-week AI Agents & Workflow Automation hybrid program. Also available for bespoke corporate training on LLMs, AI agents, no-code automation (Zapier, Make.com, n8n), and responsible AI governance.",
    deliverables: [
      "Customized curriculum and workshop materials",
      "Live sessions: virtual, hybrid, or in-person",
      "Hands-on projects and AI toolkit assignments",
      "Capstone project guidance and review",
      "Access to community, recordings, and resources",
      "Certificate of completion",
    ],
    engagement: "1-day intensive to 8-week program",
    priceRange: "Contact for institutional pricing",
    cta: "Book a Workshop",
    featured: false,
  },
];

const publications = [
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
    title:
      "Polymorphic Self-Modifying Transformers for Autonomous Medical Diagnosis and Adaptive Clinical Decision Support",
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

const stats = {
  yearsExperience: 4,
  projectsCompleted: 20,
  papersPublished: 3,
  countriesReached: 5,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function deleteExisting(type: string): Promise<void> {
  const ids: string[] = await client.fetch(`*[_type == $type]._id`, { type });
  if (ids.length > 0) {
    const tx = client.transaction();
    ids.forEach((id) => tx.delete(id));
    await tx.commit();
    console.log(`  Deleted ${ids.length} existing ${type} documents`);
  }
}

// ---------------------------------------------------------------------------
// Seeders
// ---------------------------------------------------------------------------

async function seedProjects(): Promise<void> {
  console.log("\n[projects] Seeding...");
  await deleteExisting("project");

  for (const p of projects) {
    const doc: Record<string, unknown> & { _id: string; _type: string } = {
      _id: `project-${p.id}`,
      _type: "project",
      title: p.title,
      description: p.description,
      category: p.category,
      tags: p.tags,
      status: p.status,
      featured: p.featured,
      year: p.year,
      // Map Unsplash URL string to thumbnailUrl (not the image-upload field)
      thumbnailUrl: p.thumbnail,
    };

    if ("github" in p && p.github) doc.github = p.github;
    if ("demo" in p && p.demo) doc.demo = p.demo;

    await client.createOrReplace(doc);
  }

  console.log(`  Created ${projects.length} project documents`);
}

async function seedTimeline(): Promise<void> {
  console.log("\n[timelineEvent] Seeding...");
  await deleteExisting("timelineEvent");

  for (let i = 0; i < timeline.length; i++) {
    const t = timeline[i];
    const slug = slugify(`${t.year}-${t.title}`).slice(0, 64);

    await client.createOrReplace({
      _id: `timeline-${slug}`,
      _type: "timelineEvent",
      year: t.year,
      title: t.title,
      institution: t.institution,
      description: t.description,
      type: t.type,
      order: i + 1,
    });
  }

  console.log(`  Created ${timeline.length} timelineEvent documents`);
}

async function seedAchievements(): Promise<void> {
  console.log("\n[achievement] Seeding...");
  await deleteExisting("achievement");

  for (const a of achievements) {
    await client.createOrReplace({
      _id: `achievement-${a.id}`,
      _type: "achievement",
      title: a.title,
      issuer: a.issuer,
      year: a.year,
      type: a.type,
      description: a.description,
    });
  }

  console.log(`  Created ${achievements.length} achievement documents`);
}

async function seedStartups(): Promise<void> {
  console.log("\n[startup] Seeding...");
  await deleteExisting("startup");

  for (const s of startups) {
    const doc: Record<string, unknown> & { _id: string; _type: string } = {
      _id: `startup-${s.id}`,
      _type: "startup",
      name: s.name,
      tagline: s.tagline,
      description: s.description,
      role: s.role,
      status: s.status,
      year: s.year,
    };

    if ("link" in s && s.link) doc.link = s.link;

    await client.createOrReplace(doc);
  }

  console.log(`  Created ${startups.length} startup documents`);
}

async function seedInitiatives(): Promise<void> {
  console.log("\n[initiative] Seeding...");
  await deleteExisting("initiative");

  for (const init of initiatives) {
    const doc: Record<string, unknown> & { _id: string; _type: string } = {
      _id: `initiative-${init.id}`,
      _type: "initiative",
      name: init.name,
      tagline: init.tagline,
      description: init.description,
      status: init.status,
      tags: init.tags,
    };

    if ("link" in init && init.link) doc.link = init.link;

    await client.createOrReplace(doc);
  }

  console.log(`  Created ${initiatives.length} initiative documents`);
}

async function seedCollaborations(): Promise<void> {
  console.log("\n[collaboration] Seeding...");
  await deleteExisting("collaboration");

  for (const c of collaborations) {
    await client.createOrReplace({
      _id: `collaboration-${c.id}`,
      _type: "collaboration",
      title: c.title,
      area: c.area,
      description: c.description,
      ideal: c.ideal,
      commitment: c.commitment,
      open: c.open,
    });
  }

  console.log(`  Created ${collaborations.length} collaboration documents`);
}

async function seedServices(): Promise<void> {
  console.log("\n[service] Seeding...");
  await deleteExisting("service");

  for (let i = 0; i < services.length; i++) {
    const s = services[i];
    const doc: Record<string, unknown> & { _id: string; _type: string } = {
      _id: `service-${s.id}`,
      _type: "service",
      name: s.name,
      tagline: s.tagline,
      description: s.description,
      deliverables: s.deliverables,
      engagement: s.engagement,
      cta: s.cta,
      featured: s.featured,
      order: i + 1,
    };

    if ("priceRange" in s && s.priceRange) doc.priceRange = s.priceRange;

    await client.createOrReplace(doc);
  }

  console.log(`  Created ${services.length} service documents`);
}

async function seedPublications(): Promise<void> {
  console.log("\n[publication] Seeding...");
  await deleteExisting("publication");

  for (const p of publications) {
    await client.createOrReplace({
      _id: `publication-${p.id}`,
      _type: "publication",
      title: p.title,
      authors: p.authors,
      venue: p.venue,
      year: p.year,
      type: p.type,
      abstract: p.abstract,
      tags: p.tags,
    });
  }

  console.log(`  Created ${publications.length} publication documents`);
}

async function seedSiteSettings(): Promise<void> {
  console.log("\n[siteSettings] Seeding...");

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    yearsExperience: stats.yearsExperience,
    projectsCompleted: stats.projectsCompleted,
    papersPublished: stats.papersPublished,
    countriesReached: stats.countriesReached,
  });

  console.log("  Created/updated siteSettings singleton");
}

async function seedResearchPosts(): Promise<void> {
  console.log("\n[researchPost] Seeding...");
  await deleteExisting("researchPost");

  const researchDir = path.join(process.cwd(), "src", "content", "research");

  if (!fs.existsSync(researchDir)) {
    console.warn(`  WARNING: research directory not found at ${researchDir}, skipping.`);
    return;
  }

  const mdxFiles = fs
    .readdirSync(researchDir)
    .filter((f) => f.endsWith(".mdx"));

  let count = 0;

  for (const filename of mdxFiles) {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(researchDir, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data: frontmatter, content: body } = matter(raw);

    const doc: Record<string, unknown> & { _id: string; _type: string } = {
      _id: `research-post-${slug}`,
      _type: "researchPost",
      title: frontmatter.title ?? slug,
      slug: { _type: "slug", current: slug },
      date: frontmatter.date ?? null,
      summary: frontmatter.summary ?? "",
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      category: frontmatter.category ?? "",
      published: frontmatter.published ?? false,
      body: body.trim(),
    };

    await client.createOrReplace(doc);
    console.log(`  Created researchPost: ${slug}`);
    count++;
  }

  console.log(`  Created ${count} researchPost documents`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function seed(): Promise<void> {
  console.log("Starting Sanity seed...\n");

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    throw new Error(
      "Missing NEXT_PUBLIC_SANITY_PROJECT_ID in environment. Add it to .env.local"
    );
  }
  if (!process.env.SANITY_API_TOKEN) {
    throw new Error(
      "Missing SANITY_API_TOKEN in environment. Add it to .env.local"
    );
  }

  await seedProjects();
  await seedTimeline();
  await seedAchievements();
  await seedStartups();
  await seedInitiatives();
  await seedCollaborations();
  await seedServices();
  await seedPublications();
  await seedSiteSettings();
  await seedResearchPosts();

  console.log("\nSeed complete! Visit /studio to verify your data.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
