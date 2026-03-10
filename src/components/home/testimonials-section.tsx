"use client";

import { Badge, Button, Progress } from "@work-rjkashyap/unified-ui";
import {
  ArrowRight,
  Box,
  Check,
  CircleDot,
  GitBranch,
  Minus,
  Package,
  RefreshCw,
  Shield,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/*  Shared ButtonLink                                                  */
/* ------------------------------------------------------------------ */

function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  className,
  ...rest
}: ComponentProps<typeof Link> & {
  variant?: ComponentProps<typeof Button>["variant"];
  size?: ComponentProps<typeof Button>["size"];
  iconLeft?: ComponentProps<typeof Button>["iconLeft"];
  iconRight?: ComponentProps<typeof Button>["iconRight"];
}) {
  return (
    <Link href={href} className="contents" {...rest}>
      <Button
        as="span"
        variant={variant}
        size={size}
        iconLeft={iconLeft}
        iconRight={iconRight}
        className={className}
      >
        {children}
      </Button>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Comparison table data                                              */
/* ------------------------------------------------------------------ */

interface ComparisonRow {
  feature: string;
  copyPaste: "yes" | "no" | "partial";
  unifiedUI: "yes" | "no" | "partial";
}

const comparisonRows: ComparisonRow[] = [
  {
    feature: "Production-ready components",
    copyPaste: "yes",
    unifiedUI: "yes",
  },
  {
    feature: "Radix UI + Tailwind CSS v4",
    copyPaste: "yes",
    unifiedUI: "yes",
  },
  { feature: "Single npm install", copyPaste: "no", unifiedUI: "yes" },
  {
    feature: "Semantic versioning & changelog",
    copyPaste: "no",
    unifiedUI: "yes",
  },
  { feature: "Token-driven theming", copyPaste: "partial", unifiedUI: "yes" },
  { feature: "Strict layer architecture", copyPaste: "no", unifiedUI: "yes" },
  { feature: "Full source ownership", copyPaste: "yes", unifiedUI: "yes" },
  {
    feature: "Consistent across projects",
    copyPaste: "partial",
    unifiedUI: "yes",
  },
  {
    feature: "Tree-shakeable imports",
    copyPaste: "partial",
    unifiedUI: "yes",
  },
  { feature: "Motion presets included", copyPaste: "no", unifiedUI: "yes" },
];

function StatusIcon({ status }: { status: "yes" | "no" | "partial" }) {
  if (status === "yes") {
    return (
      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500/10">
        <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
      </div>
    );
  }
  if (status === "partial") {
    return (
      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/10">
        <Minus className="w-3 h-3 text-amber-600 dark:text-amber-400" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-fd-muted">
      <X className="w-3 h-3 text-fd-muted-foreground/50" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Comparison table                                                   */
/* ------------------------------------------------------------------ */

function ComparisonTable() {
  return (
    <div className="rounded-xl border border-fd-border overflow-hidden bg-fd-card/40">
      {/* Header row */}
      <div className="grid grid-cols-[1fr_100px_100px] sm:grid-cols-[1fr_120px_120px] items-center gap-0 border-b border-fd-border bg-fd-muted/30 px-4 py-2.5">
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-fd-muted-foreground">
          Feature
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-fd-muted-foreground text-center">
          Copy-paste
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-center">
          <span className="text-purple-600 dark:text-purple-400">
            Unified UI
          </span>
        </span>
      </div>

      {/* Data rows */}
      {comparisonRows.map((row, i) => (
        <div
          key={row.feature}
          className={cn(
            "grid grid-cols-[1fr_100px_100px] sm:grid-cols-[1fr_120px_120px] items-center gap-0 px-4 py-2",
            i < comparisonRows.length - 1 && "border-b border-fd-border/50",
            i % 2 === 1 && "bg-fd-muted/10",
          )}
        >
          <span className="text-sm text-fd-foreground font-medium">
            {row.feature}
          </span>
          <div className="flex justify-center">
            <StatusIcon status={row.copyPaste} />
          </div>
          <div className="flex justify-center">
            <StatusIcon status={row.unifiedUI} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reason cards data                                                  */
/* ------------------------------------------------------------------ */

const reasons = [
  {
    icon: Package,
    title: "One Package, Not Dozens",
    description:
      "Everything in @work-rjkashyap/unified-ui — 75+ components, tokens, theme, motion, and utils.",
    badge: "core" as const,
  },
  {
    icon: RefreshCw,
    title: "Versioned & Upgradeable",
    description:
      "Semver releases mean you can upgrade with confidence. Breaking changes documented, migrations clear.",
    badge: "dx" as const,
  },
  {
    icon: GitBranch,
    title: "Strict Layer Architecture",
    description:
      "Six dependency-ordered layers prevent circular deps and keep the system predictable at scale.",
    badge: "arch" as const,
  },
  {
    icon: Shield,
    title: "Radix UI Accessibility",
    description:
      "Proper ARIA attributes, keyboard navigation, and focus management baked into every component.",
    badge: "a11y" as const,
  },
  {
    icon: CircleDot,
    title: "Token-Driven Theming",
    description:
      "oklch() colors, spacing, radius tokens — all as CSS custom properties. Override a few, retheme everything.",
    badge: "theme" as const,
  },
  {
    icon: Sparkles,
    title: "shadcn/ui DNA, Evolved",
    description:
      "Same Radix + Tailwind + CVA foundation, restructured as a proper design system with tokens and layers.",
    badge: "origin" as const,
  },
];

const badgeVariantMap: Record<
  string,
  "primary" | "info" | "success" | "warning" | "danger" | "default"
> = {
  core: "primary",
  dx: "info",
  arch: "success",
  a11y: "warning",
  theme: "danger",
  origin: "default",
};

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export function TestimonialsSection() {
  return (
    <section className="relative py-14 bg-fd-background overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-px bg-linear-to-r from-transparent via-purple-500/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <div className="text-center mb-10">
          <Badge variant="primary" size="sm" className="mb-3">
            Why Unified UI
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3">
            Beyond copy-paste.
          </h2>
          <p className="text-base text-fd-muted-foreground leading-7 max-w-xl mx-auto">
            Same shadcn/ui philosophy — composable, accessible, beautifully
            styled — wrapped in a real, installable design system with tokens,
            layers, and versioning.
          </p>
        </div>

        {/* ── Two-column: comparison + reasons ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left — Comparison table */}
          <div className="lg:col-span-7">
            <ComparisonTable />

            {/* Score bar */}
            <div className="mt-3 flex items-center gap-3 rounded-lg border border-fd-border/50 bg-fd-card/30 px-4 py-2.5">
              <div className="flex items-center gap-2 shrink-0">
                <Box className="w-3.5 h-3.5 text-purple-500" />
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-fd-muted-foreground">
                  Unified UI score
                </span>
              </div>
              <div className="flex-1">
                <Progress value={100} size="sm" variant="primary" />
              </div>
              <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 shrink-0">
                10/10
              </span>
            </div>
          </div>

          {/* Right — Reason cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className={cn(
                  "flex items-start gap-3 rounded-xl border border-fd-border bg-fd-card/40 p-3.5",
                  "hover:border-fd-muted-foreground/20 transition-colors duration-200",
                )}
              >
                <div className="p-2 rounded-md bg-fd-background border border-fd-border shrink-0 mt-0.5">
                  <reason.icon className="w-4 h-4 text-fd-foreground" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-base font-bold tracking-tight truncate">
                      {reason.title}
                    </h3>
                    <Badge
                      variant={badgeVariantMap[reason.badge] ?? "default"}
                      size="sm"
                      className="shrink-0"
                    >
                      {reason.badge}
                    </Badge>
                  </div>
                  <p className="text-sm text-fd-muted-foreground leading-6">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-10 text-center">
          <ButtonLink
            href="/docs"
            variant="ghost"
            size="md"
            iconRight={<ArrowRight className="size-3.5" />}
          >
            Read the Docs
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
