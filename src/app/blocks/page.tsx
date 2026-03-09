import { ArrowLeft, BoxesIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blocks — Unified UI",
  description: "Pre-built, composable page sections and layouts. Coming soon.",
};

export default function BlocksPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80dvh] px-4 text-center">
      <div className="flex items-center justify-center size-16 rounded-2xl bg-fd-primary/10 text-fd-primary border border-fd-primary/20 mb-8">
        <BoxesIcon className="size-7" />
      </div>
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fd-primary/5 border border-fd-primary/10 text-[10px] font-bold uppercase tracking-widest text-fd-primary mb-6">
        Coming Soon
      </span>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-fd-foreground mb-4">
        Blocks
      </h1>
      <p className="text-base text-fd-muted-foreground max-w-md mx-auto leading-relaxed mb-10">
        Pre-built, composable page sections and layouts to help you ship landing
        pages, dashboards, and marketing sites faster with Unified UI.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to Home
      </Link>
    </div>
  );
}
