import type { Metadata } from "next";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedSection from "@/components/shared/AnimatedSection";
import ContactForm from "@/components/shared/ContactForm";
import { sanityFetch } from "@/sanity/client";
import { servicesQuery } from "@/sanity/queries";
import { cn } from "@/lib/utils";
import type { ServicePackage } from "@/types";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Hire Ransford Oppong for AI/ML consulting, end-to-end ML system development, and research partnerships in Quantum ML and Physics-informed AI.",
};

export default async function ServicesPage() {
  const services = await sanityFetch<ServicePackage[]>({ query: servicesQuery, tags: ["service"] });

  return (
    <div className="pt-24 pb-20">
      <div className="container-max section-padding">
        {/* Header */}
        <AnimatedSection className="mb-16 text-center max-w-2xl mx-auto">
          <p className="section-label mb-3">Work with me</p>
          <h1 className="font-serif text-4xl md:text-5xl text-primary-text mb-4">
            How I Can Help
          </h1>
          <p className="text-base text-primary-text/65 leading-relaxed">
            I work with startups, enterprises, and research institutions on AI/ML strategy,
            system engineering, and frontier research in Quantum ML and Physics-informed AI.
          </p>
        </AnimatedSection>

        {/* Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {services.map((service, i) => (
            <AnimatedSection key={service.id} delay={i * 0.1}>
              <div
                className={cn(
                  "card-base flex flex-col h-full relative",
                  service.featured && "border-gold ring-1 ring-gold/30"
                )}
              >
                {service.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-0.5 bg-gold text-white text-xs font-semibold rounded-full whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-serif text-xl text-primary-text mb-1">{service.name}</h3>
                  <p className="text-sm text-gold font-medium">{service.tagline}</p>
                </div>

                <p className="text-sm text-primary-text/70 leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-primary-text/80">
                      <Check size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-border-subtle space-y-3">
                  <div className="flex justify-between text-xs text-primary-text/50">
                    <span>Engagement</span>
                    <span className="font-medium text-primary-text/70">{service.engagement}</span>
                  </div>
                  {service.priceRange && (
                    <div className="flex justify-between text-xs text-primary-text/50">
                      <span>Pricing</span>
                      <span className="font-medium text-primary-text/70">{service.priceRange}</span>
                    </div>
                  )}
                  <Link
                    href={`/contact?type=consulting&subject=${encodeURIComponent(service.cta)}`}
                    className={cn(
                      "w-full justify-center",
                      service.featured ? "btn-gold" : "btn-ghost"
                    )}
                  >
                    {service.cta}
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Inquiry form */}
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <SectionHeader
                label="Get started"
                heading="Send an Inquiry"
                subheading="Tell me about your project or challenge. I respond to all inquiries within 24 hours."
              />
              <div className="mt-6 space-y-3">
                {[
                  "AI/ML system architecture & development",
                  "Quantum ML research & implementation",
                  "Physics-informed ML for simulation",
                  "Research partnerships & co-authorship",
                  "Speaking, workshops & training",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-primary-text/70">
                    <Check size={14} className="text-gold shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3">
              <ContactForm defaultType="consulting" />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
