import type { Metadata } from "next";
import { Github, Linkedin, Twitter, BookOpen, Mail, MessageSquare } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedSection from "@/components/shared/AnimatedSection";
import ContactForm from "@/components/shared/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ransford Oppong for consulting, research collaboration, speaking opportunities, or general inquiries.",
};

const SOCIAL = [
  { href: "mailto:hello@ransfordoppong.com", icon: Mail, label: "hello@ransfordoppong.com", desc: "Email" },
  { href: "https://github.com/ransfordoppong", icon: Github, label: "@ransfordoppong", desc: "GitHub" },
  { href: "https://linkedin.com/in/ransfordoppong", icon: Linkedin, label: "Ransford Oppong", desc: "LinkedIn" },
  { href: "https://twitter.com/ransfordoppong", icon: Twitter, label: "@ransfordoppong", desc: "Twitter / X" },
  { href: "https://scholar.google.com", icon: BookOpen, label: "Google Scholar", desc: "Publications" },
];

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container-max section-padding">
        <AnimatedSection className="mb-12">
          <SectionHeader
            label="Contact"
            heading="Let's Connect"
            subheading="Whether it's a consulting project, research collaboration, speaking engagement, or just a great idea — I'm all ears."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Response time */}
            <div className="card-base">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-sm font-semibold text-primary-text">Currently available</p>
              </div>
              <p className="text-sm text-primary-text/65">
                I typically respond within 24–48 hours. For urgent consulting needs, mention it in your message.
              </p>
            </div>

            {/* Social links */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gold mb-4">Find me</h3>
              <div className="space-y-3">
                {SOCIAL.map(({ href, icon: Icon, label, desc }) => (
                  <a
                    key={href}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="p-2 rounded-sm border border-border-subtle bg-white group-hover:border-accent group-hover:bg-accent/5 transition-colors">
                      <Icon size={16} className="text-primary-text/50 group-hover:text-accent transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary-text group-hover:text-accent transition-colors">
                        {label}
                      </p>
                      <p className="text-xs text-primary-text/40">{desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Live chat hint */}
            <div className="card-base bg-gold/5 border-gold/20">
              <div className="flex items-start gap-3">
                <MessageSquare size={18} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-primary-text mb-1">Live Chat</p>
                  <p className="text-sm text-primary-text/65">
                    The chat widget (bottom right) connects you to me directly during working hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
