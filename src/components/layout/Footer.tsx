import Link from "next/link";
import { Github, Linkedin, Twitter, BookOpen, Mail, Atom } from "lucide-react";
import NewsletterForm from "./NewsletterForm";
import { getAllPosts } from "@/lib/mdx";
import { formatDateShort } from "@/lib/utils";

const SOCIAL_LINKS = [
  { href: "https://github.com/ransfordoppong", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/ransfordoppong", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com/ransfordoppong", icon: Twitter, label: "Twitter / X" },
  { href: "https://scholar.google.com", icon: BookOpen, label: "Google Scholar" },
];

const QUICK_LINKS = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Research", href: "/research" },
  { label: "Publications", href: "/publications" },
  { label: "Initiatives", href: "/initiatives" },
  { label: "Startups", href: "/startups" },
  { label: "Services", href: "/services" },
  { label: "Collaborations", href: "/collaborations" },
  { label: "Achievements", href: "/achievements" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <footer className="bg-primary-text text-white/80 mt-20">
      <div className="container-max section-padding py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="flex items-center justify-center w-8 h-8 bg-gold text-white rounded-sm">
                <Atom size={16} strokeWidth={1.5} />
              </div>
              <span className="font-serif text-lg font-bold text-white">Ransford Oppong</span>
            </Link>
            <p className="text-sm leading-relaxed text-white/60 mb-5">
              AI Engineer · Quantum ML Researcher · Physics-ML Pioneer.
              Building bridges between physics, computation, and intelligence.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-sm bg-white/5 hover:bg-gold/20 hover:text-gold transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
              <a
                href="mailto:hello@ransfordoppong.com"
                aria-label="Email"
                className="p-2 rounded-sm bg-white/5 hover:bg-gold/20 hover:text-gold transition-colors"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-4">
              Navigate
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest Posts */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-4">
              Latest Research
            </h3>
            {latestPosts.length > 0 ? (
              <ul className="space-y-4">
                {latestPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/research/${post.slug}`}
                      className="block hover:text-white transition-colors group"
                    >
                      <p className="text-sm font-medium text-white/80 group-hover:text-white leading-snug mb-1">
                        {post.title}
                      </p>
                      <p className="text-xs text-white/40">{formatDateShort(post.date)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-white/40">Posts coming soon.</p>
            )}
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-gold mb-4">
              Research Newsletter
            </h3>
            <p className="text-sm text-white/60 mb-4 leading-relaxed">
              Weekly insights on Quantum ML, Physics-informed AI, and frontier research. No spam.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Ransford Oppong. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Built with Next.js · Designed for discovery
          </p>
        </div>
      </div>
    </footer>
  );
}
