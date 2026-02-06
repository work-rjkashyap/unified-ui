"use client";

import { Code2, Layers, Palette, Shield, Sparkles, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized for performance with minimal bundle size and lazy loading out of the box.",
  },
  {
    icon: Shield,
    title: "Enterprise Ready",
    description:
      "Built with security and scalability in mind. Perfect for mission-critical applications.",
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    description:
      "Tailor every component to match your brand with our flexible theming system.",
  },
  {
    icon: Code2,
    title: "Developer First",
    description:
      "Intuitive API design with TypeScript support and comprehensive documentation.",
  },
  {
    icon: Layers,
    title: "Composable",
    description:
      "Build complex UIs by combining simple, reusable components with ease.",
  },
  {
    icon: Sparkles,
    title: "Modern Design",
    description:
      "Beautiful, accessible components following the latest design trends and best practices.",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-24 bg-fd-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-purple-600 dark:text-purple-400 uppercase mb-4 animate-fade-in">
            Infrastructure for Speed
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tighter animate-fade-in-up">
            Built for the next decade.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-fd-border rounded-2xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-fd-border bg-fd-card/30 backdrop-blur-sm">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-10 hover:bg-fd-accent/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
              <div className="relative space-y-5">
                <div className="p-3 rounded-xl bg-fd-background border border-fd-border w-fit shadow-xs group-hover:-translate-y-1 group-hover:shadow-md transition-all duration-300">
                  <feature.icon className="w-5 h-5 text-fd-foreground" />
                </div>
                <div>
                  <h4 className="text-xl font-bold tracking-tight mb-2 group-hover:text-purple-500 transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-fd-muted-foreground leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
                <div className="pt-2">
                  <div className="h-px w-0 group-hover:w-full bg-linear-to-r from-purple-500/50 to-transparent transition-all duration-700" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
