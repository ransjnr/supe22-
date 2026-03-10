"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Cpu,
  FlaskConical,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { href: "/about", icon: Cpu, label: "About", desc: "Background & story" },
  { href: "/projects", icon: FlaskConical, label: "Projects", desc: "Technical work" },
  { href: "/research", icon: BookOpen, label: "Research", desc: "Papers & insights" },
  { href: "/services", icon: Briefcase, label: "Services", desc: "How I can help" },
  { href: "/collaborations", icon: Users, label: "Collaborate", desc: "Work together" },
  { href: "/achievements", icon: Award, label: "Achievements", desc: "Awards & recognition" },
  { href: "/contact", icon: Mail, label: "Contact", desc: "Get in touch" },
];

const socialLinks = [
  { href: "https://github.com/ransjnr", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/ransfordoppong", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com/ransfordoppong", icon: Twitter, label: "Twitter" },
];

export default function QuickActionsPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/25 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="relative w-full max-w-sm bg-white shadow-2xl h-full flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border-subtle">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-0.5">Navigate</p>
            <h2 className="font-serif text-xl text-primary-text">Quick Actions</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100 transition-colors text-primary-text/60"
          >
            <X size={18} />
          </button>
        </div>

        {/* Links */}
        <div className="p-3 flex-1 overflow-y-auto">
          <div className="space-y-0.5">
            {quickLinks.map(({ href, icon: Icon, label, desc }) => (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className="flex items-center gap-3 p-3 rounded hover:bg-gray-50 group transition-colors"
              >
                <div className="w-9 h-9 rounded bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                  <Icon size={16} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary-text">{label}</p>
                  <p className="text-xs text-primary-text/50">{desc}</p>
                </div>
                <ArrowRight
                  size={14}
                  className="text-primary-text/25 group-hover:text-accent group-hover:translate-x-0.5 transition-all flex-shrink-0"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Social footer */}
        <div className="p-4 border-t border-border-subtle">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-text/40 mb-3">
            Connect
          </p>
          <div className="flex gap-2">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded border border-border-subtle hover:border-accent hover:text-accent transition-colors text-primary-text/60"
              >
                <Icon size={14} />
                <span className="text-xs font-medium">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
