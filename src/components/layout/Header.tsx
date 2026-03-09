"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Atom } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Research", href: "/research" },
  { label: "Publications", href: "/publications" },
  {
    label: "Work",
    href: "#",
    children: [
      { label: "Initiatives", href: "/initiatives" },
      { label: "Startups", href: "/startups" },
      { label: "Services", href: "/services" },
      { label: "Collaborations", href: "/collaborations" },
    ],
  },
  { label: "Achievements", href: "/achievements" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setWorkOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href !== "#" && (pathname === href || pathname.startsWith(href + "/"));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border-subtle shadow-sm"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container-max section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Ransford Oppong — Home"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-accent text-white rounded-sm group-hover:bg-gold transition-colors">
              <Atom size={16} strokeWidth={1.5} />
            </div>
            <span className="font-serif text-lg font-bold text-primary-text hidden sm:block">
              Ransford Oppong
            </span>
            <span className="font-serif text-lg font-bold text-primary-text sm:hidden">
              RO
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} className="relative group">
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-sm transition-colors
                      ${workOpen ? "text-accent bg-accent/5" : "text-primary-text hover:text-accent hover:bg-accent/5"}`}
                    onClick={() => setWorkOpen(!workOpen)}
                    onBlur={() => setTimeout(() => setWorkOpen(false), 150)}
                    aria-expanded={workOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${workOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {workOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-card border border-border-subtle rounded-sm shadow-lg py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2 text-sm transition-colors
                            ${isActive(child.href) ? "text-accent bg-accent/5 font-medium" : "text-primary-text hover:text-accent hover:bg-accent/5"}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-sm transition-colors
                    ${isActive(item.href) ? "text-accent bg-accent/8 font-semibold" : "text-primary-text hover:text-accent hover:bg-accent/5"}`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link href="/services" className="hidden md:inline-flex btn-primary text-xs px-4 py-2">
              Hire Me
            </Link>
            <button
              className="lg:hidden p-2 text-primary-text hover:text-accent transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-t border-border-subtle shadow-lg">
          <nav className="container-max section-padding py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold mt-2">
                    {item.label}
                  </p>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block px-5 py-2 text-sm rounded-sm transition-colors
                        ${isActive(child.href) ? "text-accent font-medium bg-accent/5" : "text-primary-text hover:text-accent"}`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-sm transition-colors
                    ${isActive(item.href) ? "text-accent bg-accent/8 font-semibold" : "text-primary-text hover:text-accent hover:bg-accent/5"}`}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="pt-3 mt-2 border-t border-border-subtle">
              <Link href="/services" className="btn-primary w-full justify-center">
                Hire Me
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
