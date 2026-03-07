// Vercel best practice: async-suspense-boundaries
// Streaming skeleton for the themes page.

export default function ThemesLoading() {
    return (
        <div className="min-h-screen animate-pulse">
            {/* Hero header skeleton */}
            <section className="border-b border-fd-border bg-gradient-to-b from-fd-muted/30 to-fd-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                    <div className="flex flex-col items-center text-center max-w-2xl mx-auto gap-4">
                        <div className="size-12 rounded-xl bg-fd-muted" />
                        <div className="h-5 w-32 rounded-full bg-fd-muted" />
                        <div className="h-9 w-64 rounded-md bg-fd-muted" />
                        <div className="h-5 w-80 rounded-md bg-fd-muted" />
                    </div>
                </div>
            </section>

            {/* Content area skeleton */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                    {/* Sidebar skeleton */}
                    <div className="space-y-4">
                        <div className="h-8 w-full rounded-md bg-fd-muted" />
                        <div className="h-8 w-full rounded-md bg-fd-muted" />
                        <div className="h-8 w-3/4 rounded-md bg-fd-muted" />
                        <div className="h-8 w-full rounded-md bg-fd-muted" />
                        <div className="h-8 w-5/6 rounded-md bg-fd-muted" />
                    </div>
                    {/* Preview area skeleton */}
                    <div className="h-96 rounded-lg bg-fd-muted" />
                </div>
            </div>
        </div>
    );
}
