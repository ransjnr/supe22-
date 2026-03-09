"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, BookOpen, ArrowRight, Download } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const DOMAINS = [
  "AI Software Engineering",
  "Quantum ML",
  "Medical AI",
  "Research & Academia",
  "AI Automation",
  "Biomedical Engineering",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-60" aria-hidden />

      {/* Warm gradient orbs */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9A22740, transparent)" }}
        aria-hidden
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #1e3a5f30, transparent)" }}
        aria-hidden
      />

      <div className="container-max section-padding w-full py-20 md:py-32">
        <div className="max-w-4xl">
          <motion.div variants={container} initial="hidden" animate="show">
            {/* Status badge */}
            <motion.div variants={item} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-medium text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available for consulting & research collaborations
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={item}
              className="font-serif text-5xl sm:text-6xl md:text-7xl text-primary-text leading-none mb-4"
            >
              Ransford
              <br />
              <span className="text-accent">Oppong</span>
            </motion.h1>

            {/* Title */}
            <motion.p
              variants={item}
              className="text-lg md:text-xl text-primary-text/70 mb-2 font-medium"
            >
              AI Engineer · Quantum ML Researcher · Technical Founder
            </motion.p>

            {/* Domain pills */}
            <motion.div variants={item} className="flex flex-wrap gap-2 mb-8">
              {DOMAINS.map((domain) => (
                <span key={domain} className="tag-pill text-xs">
                  {domain}
                </span>
              ))}
            </motion.div>

            {/* Bio snippet */}
            <motion.p
              variants={item}
              className="text-base md:text-lg text-primary-text/65 leading-relaxed max-w-2xl mb-10"
            >
              By day, I train machines to think. By night, I convince them I&apos;m still in charge.
              I build production AI systems, research quantum biosensors, develop medical imaging AI,
              and run engineering education programs — all from Kumasi, Ghana, for the world.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-3 mb-12">
              <Link href="/projects" className="btn-primary">
                View Projects
                <ArrowRight size={16} />
              </Link>
              <Link href="/research" className="btn-ghost">
                Read Research
              </Link>
              <a
                href="/cv.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm text-primary-text/60 hover:text-accent transition-colors"
              >
                <Download size={15} />
                Download CV
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} className="flex items-center gap-4">
              <span className="text-xs text-primary-text/40 uppercase tracking-wider">Find me</span>
              <div className="flex gap-3">
                {[
                  { href: "https://github.com/ransjnr", icon: Github, label: "GitHub" },
                  { href: "https://linkedin.com/in/ransford-oppong-a249a9219", icon: Linkedin, label: "LinkedIn" },
                  { href: "https://x.com/farad_jr", icon: Twitter, label: "X / Twitter" },
                  { href: "/research", icon: BookOpen, label: "Research" },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2 rounded-sm border border-border-subtle text-primary-text/50
                               hover:text-accent hover:border-accent transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        aria-hidden
      >
        <span className="text-xs text-primary-text/30 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
