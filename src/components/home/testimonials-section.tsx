"use client";

import { cn } from "@/lib/cn";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Engineering Lead",
    company: "TechCorp",
    content:
      "Unified UI has transformed how we build products. The components are solid, well-documented, and save us countless hours.",
    avatar: "👩‍💻",
  },
  {
    name: "Michael Rodriguez",
    role: "Product Designer",
    company: "DesignStudio",
    content:
      "The design system is incredibly well thought out. It gives us the flexibility we need while maintaining consistency.",
    avatar: "👨‍🎨",
  },
  {
    name: "Emily Thompson",
    role: "CTO",
    company: "StartupXYZ",
    content:
      "We shipped our MVP 3x faster than expected. The component library is production-ready from day one.",
    avatar: "👩‍💼",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-24 bg-fd-background">
      <div className="absolute inset-0 bg-noise opacity-[0.01] mix-blend-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-purple-600 dark:text-purple-400 uppercase mb-4 animate-fade-in">
            Infrastructure for Trust
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tighter animate-fade-in-up">
            Stories from the frontier.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                "group relative p-8 rounded-[2rem] border border-fd-border bg-fd-card/30 backdrop-blur-sm",
                "transition-all duration-500 hover:border-fd-muted-foreground/20 hover:shadow-xl hover:-translate-y-1",
                "animate-fade-in-up",
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay rounded-[2rem]" />

              <div className="relative space-y-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 rounded-full bg-purple-500/40"
                    />
                  ))}
                </div>

                <p className="text-sm md:text-base text-fd-foreground font-light leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-fd-border/50">
                  <div className="w-10 h-10 rounded-full bg-fd-muted border border-fd-border flex items-center justify-center text-xs font-bold">
                    {testimonial.name.slice(0, 1)}
                  </div>
                  <div>
                    <div className="text-sm font-bold tracking-tight">
                      {testimonial.name}
                    </div>
                    <div className="text-[10px] text-fd-muted-foreground uppercase tracking-widest font-semibold">
                      {testimonial.role} @ {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof marquee style */}
        <div className="mt-20 flex flex-col items-center gap-4 opacity-50">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-fd-background bg-fd-muted"
              />
            ))}
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-fd-muted-foreground">
            Trusted by 10,000+ Engineers Globally
          </p>
        </div>
      </div>
    </section>
  );
}
