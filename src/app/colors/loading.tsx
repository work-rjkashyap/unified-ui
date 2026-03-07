// Vercel best practice: async-suspense-boundaries
// Streaming skeleton for the colors page.

export default function ColorsLoading() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-pulse">
            {/* Header skeleton */}
            <div className="space-y-3 mb-10">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-fd-muted" />
                    <div className="h-8 w-32 rounded-md bg-fd-muted" />
                </div>
                <div className="h-5 w-full max-w-lg rounded-md bg-fd-muted" />
            </div>

            {/* Tabs skeleton */}
            <div className="flex gap-2 mb-6">
                <div className="h-9 w-24 rounded-md bg-fd-muted" />
                <div className="h-9 w-24 rounded-md bg-fd-muted" />
                <div className="h-9 w-24 rounded-md bg-fd-muted" />
            </div>

            {/* Toolbar skeleton */}
            <div className="flex gap-3 mb-6">
                <div className="h-9 w-48 rounded-md bg-fd-muted" />
                <div className="h-9 w-36 rounded-md bg-fd-muted" />
                <div className="h-9 w-28 rounded-md bg-fd-muted" />
            </div>

            {/* Shade labels row */}
            <div className="grid grid-cols-11 gap-2 mb-2">
                {Array.from({ length: 11 }).map((_, i) => (
                    <div key={i} className="h-4 rounded bg-fd-muted" />
                ))}
            </div>

            {/* Palette rows */}
            <div className="space-y-8">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i}>
                        <div className="flex items-center gap-3 mb-2.5">
                            <div className="size-4 rounded-full bg-fd-muted" />
                            <div className="h-5 w-16 rounded bg-fd-muted" />
                        </div>
                        <div className="grid grid-cols-11 gap-2">
                            {Array.from({ length: 11 }).map((_, j) => (
                                <div
                                    key={j}
                                    className="aspect-square sm:aspect-[2/1.4] rounded-lg bg-fd-muted"
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
