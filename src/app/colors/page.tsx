// Vercel best practice: server-serialization + async-suspense-boundaries
// The heavy interactive color picker (~1 000 lines) lives in a client island.
// Static heading is rendered on the server for faster FCP and better SEO.

import { Suspense } from "react";
import { PaletteIcon } from "lucide-react";
import ColorsClient from "./_components/colors-client";

function ColorsLoadingSkeleton() {
    return (
        <div className="animate-pulse space-y-6">
            {/* Tabs skeleton */}
            <div className="flex gap-2 mb-6">
                <div className="h-9 w-24 rounded-md bg-muted" />
                <div className="h-9 w-24 rounded-md bg-muted" />
                <div className="h-9 w-24 rounded-md bg-muted" />
            </div>
            {/* Toolbar skeleton */}
            <div className="flex gap-3 mb-6">
                <div className="h-9 w-48 rounded-md bg-muted" />
                <div className="h-9 w-36 rounded-md bg-muted" />
            </div>
            {/* Palette rows skeleton */}
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                    <div className="flex items-center gap-3 mb-2.5">
                        <div className="size-4 rounded-full bg-muted" />
                        <div className="h-5 w-16 rounded bg-muted" />
                    </div>
                    <div className="grid grid-cols-11 gap-2">
                        {Array.from({ length: 11 }).map((_, j) => (
                            <div
                                key={j}
                                className="aspect-square sm:aspect-[2/1.4] rounded-lg bg-muted"
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function ColorsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            {/* ── Static header — rendered on server ── */}
            <div className="space-y-3 mb-10">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary border border-primary/20">
                        <PaletteIcon className="size-5" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Colors
                        </h1>
                    </div>
                </div>
                <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                    Browse palettes, pick a shade, then instantly copy the color
                    value. All colors are defined in oklch for perceptual
                    uniformity and wide-gamut display support.
                </p>
            </div>

            {/* ── Interactive client island — lazy-loaded ── */}
            <Suspense fallback={<ColorsLoadingSkeleton />}>
                <ColorsClient />
            </Suspense>
        </div>
    );
}
