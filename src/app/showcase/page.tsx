// Vercel best practice: server-serialization + async-suspense-boundaries
// The interactive showcase (filter + grid) is in a client island.
// Metadata is handled in layout.tsx. The page wrapper is a server component.

import type { Metadata } from "next";
import { Suspense } from "react";
import ShowcaseClient from "./_components/showcase-client";

export const metadata: Metadata = {
  title: "Showcase — Unified UI",
  description:
    "Explore projects built with Unified UI. From startups to enterprises, discover how teams are shipping faster.",
};

function ShowcaseLoadingSkeleton() {
  return (
    <div className="animate-pulse min-h-screen">
      {/* Hero skeleton */}
      <section className="pt-24 pb-16 border-b border-fd-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="h-6 w-28 rounded-full bg-fd-muted mx-auto" />
          <div className="h-12 w-3/4 max-w-lg rounded-md bg-fd-muted mx-auto" />
          <div className="h-5 w-2/3 max-w-md rounded-md bg-fd-muted mx-auto" />
        </div>
      </section>
      {/* Grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-[16/10] rounded-3xl bg-fd-muted" />
              <div className="h-4 w-20 rounded bg-fd-muted" />
              <div className="h-6 w-40 rounded bg-fd-muted" />
              <div className="h-4 w-full rounded bg-fd-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ShowcasePage() {
  return (
    <Suspense fallback={<ShowcaseLoadingSkeleton />}>
      <ShowcaseClient />
    </Suspense>
  );
}
