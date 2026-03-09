import AnimatedSection from "@/components/shared/AnimatedSection";
import NewsletterForm from "@/components/layout/NewsletterForm";

export default function NewsletterCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="container-max section-padding">
        <AnimatedSection>
          <div className="border border-gold/30 bg-gradient-to-br from-gold/5 to-accent/5 rounded-sm p-8 md:p-12 text-center max-w-2xl mx-auto">
            <p className="section-label mb-3">Stay in the loop</p>
            <h2 className="font-serif text-3xl text-primary-text mb-4">
              Research. Dispatched Weekly.
            </h2>
            <p className="text-primary-text/65 text-base leading-relaxed mb-8 max-w-md mx-auto">
              Get my best writing on Quantum ML, Physics-informed AI, and the future of
              scientific computing — delivered to your inbox. No spam, unsubscribe anytime.
            </p>
            <div className="flex justify-center">
              <NewsletterForm />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
