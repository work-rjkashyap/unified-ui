import type { Metadata } from "next";
import { CTASection } from "@/components/home/cta-section";
import { FeaturesSection } from "@/components/home/features-section";
import { FooterSection } from "@/components/home/footer-section";
import { HeroSection } from "@/components/home/hero-section";
import { ShowcaseSection } from "@/components/home/showcase-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { DS_VERSION } from "@/lib/ds-version";

export const metadata: Metadata = {
    title: "Unified UI — A Scalable React Design System Inspired by shadcn/ui",
    description:
        "75+ production-ready React components built on Tailwind CSS v4, Radix UI, and Framer Motion. Token-driven theming, strict layer architecture, and tree-shakeable imports — inspired by shadcn/ui, packaged as a single installable library.",
    keywords: [
        "react",
        "design system",
        "component library",
        "tailwind css v4",
        "radix ui",
        "shadcn ui",
        "framer motion",
        "typescript",
        "unified ui",
        "ui components",
        "npm package",
    ],
};

export default function HomePage() {
    return (
        <div className="flex flex-col">
            <HeroSection version={DS_VERSION} />
            <FeaturesSection />
            <ShowcaseSection />
            <TestimonialsSection />
            <CTASection />
            <FooterSection />
        </div>
    );
}
