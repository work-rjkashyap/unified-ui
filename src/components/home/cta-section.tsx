"use client";

import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function CTASection() {
  return (
    <section className="relative py-24 bg-fd-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] border border-fd-border bg-fd-card/30 backdrop-blur-xl p-12 md:p-20 overflow-hidden text-center">
          <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/10 rounded-full blur-[100px]" />

          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tighter">
              Build the future of <br /> documentation today.
            </h2>
            <p className="text-sm md:text-base text-fd-muted-foreground mb-10 font-light leading-relaxed">
              Join thousands of teams who rely on our platform to deliver
              exceptional developer experiences. Scale without friction.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/docs"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full w-full sm:w-56",
                  "bg-fd-foreground text-fd-background",
                  "font-semibold text-sm transition-all duration-300",
                  "hover:shadow-[0_0_30px_rgba(var(--fd-foreground),0.3)] hover:-translate-y-1 active:scale-95",
                )}
              >
                Get Started for Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="https://github.com/work-rjkashyap/unified-ui"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full w-full sm:w-56",
                  "bg-fd-background text-fd-foreground border border-fd-border",
                  "font-semibold text-sm transition-all duration-300",
                  "hover:bg-fd-muted active:scale-95",
                )}
              >
                <Github className="w-4 h-4" />
                Star on GitHub
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-fd-card bg-fd-muted"
                  />
                ))}
              </div>
              <p className="text-[10px] md:text-xs text-fd-muted-foreground uppercase tracking-widest font-semibold">
                Loved by 1,000+ developers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
