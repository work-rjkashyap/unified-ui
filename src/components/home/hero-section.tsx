"use client";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
export function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-14 lg:pt-20">
            {/* Minimal Background */}
            <div className="absolute inset-0 -z-10 bg-fd-background">
                <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] opacity-50" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-fd-border to-transparent" />
            </div>
            {/* Subtle Grid */}
            <div
                className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                                 linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fd-card border border-fd-border text-[10px] md:text-xs font-medium mb-8 animate-fade-in shadow-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                    <span className="text-fd-muted-foreground uppercase tracking-widest">
                        v1.0 is now live
                    </span>
                </div>
                {/* Headline */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 animate-fade-in-up">
                    <span className="inline-block hover:scale-[1.01] transition-transform duration-300">
                        Design with
                    </span>
                    <br />
                    <span className="bg-linear-to-b from-fd-foreground via-fd-foreground/80 to-fd-foreground/60 bg-clip-text text-transparent">
                        Uncompromising Speed.
                    </span>
                </h1>
                {/* Description */}
                <p className="text-sm md:text-base text-fd-muted-foreground max-w-xl mx-auto mb-10 animate-fade-in-up animation-delay-200 leading-relaxed font-light">
                    The platform for high-performance, scalable, and beautiful user
                    interfaces. Built for teams who value both speed and design quality.
                </p>
                {/* Enhanced Prompt/Search */}
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
                    <Link
                        href="/docs"
                        className={cn(
                            "group inline-flex items-center gap-2 px-7 py-3 rounded-full",
                            "bg-fd-foreground text-fd-background",
                            "font-semibold text-sm transition-all duration-300",
                            "hover:shadow-[0_0_20px_rgba(var(--fd-foreground),0.3)] hover:-translate-y-0.5 active:scale-95",
                        )}
                    >
                        Sign up for free
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/docs"
                        className={cn(
                            "inline-flex items-center gap-2 px-7 py-3 rounded-full",
                            "bg-fd-background text-fd-foreground border border-fd-border",
                            "font-semibold text-sm transition-all duration-300",
                            "hover:bg-fd-muted hover:border-fd-muted-foreground/20 active:scale-95",
                        )}
                    >
                        Learn more
                    </Link>
                </div>
                {/* Minimal Stats */}
                <div className="mt-20 pt-10 border-t border-fd-border/50 animate-fade-in-up animation-delay-600">
                    <p className="text-[10px] md:text-xs font-semibold text-fd-muted-foreground uppercase tracking-[0.2em] mb-8">
                        Trusted by industry leaders
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-40 hover:opacity-100 transition-opacity duration-500">
                        <span className="text-lg md:text-xl font-bold italic tracking-tighter">
                            TECHCORP
                        </span>
                        <span className="text-lg md:text-xl font-bold italic tracking-tighter">
                            DATACORE
                        </span>
                        <span className="text-lg md:text-xl font-bold italic tracking-tighter">
                            SYNTHESIS
                        </span>
                        <span className="text-lg md:text-xl font-bold italic tracking-tighter">
                            NEXUS
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
function _StatCard() {
    return null; // Removed from hero for cleaner look
}
