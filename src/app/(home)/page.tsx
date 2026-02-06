import type { Metadata } from "next";
import { CTASection } from "@/components/home/cta-section";
import { FeaturesSection } from "@/components/home/features-section";
import { FooterSection } from "@/components/home/footer-section";
import { HeroSection } from "@/components/home/hero-section";
import { ShowcaseSection } from "@/components/home/showcase-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
export const metadata: Metadata = {
  title: "Unified UI - Build Faster with Next-Generation UI Components",
  description:
    "The platform for high-performance, scalable, and beautiful user interfaces. Ship products faster with our comprehensive component library and documentation.",
};
export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <TestimonialsSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
