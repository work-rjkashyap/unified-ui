// Vercel best practice: async-suspense-boundaries
// Streaming skeleton for the home page — shows instantly while RSC resolves.

export default function HomeLoading() {
    return (
        <div className="flex flex-col animate-pulse">
            {/* Hero section skeleton */}
            <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="h-6 w-40 rounded-full bg-fd-muted" />
                    <div className="h-10 w-3/4 max-w-xl rounded-md bg-fd-muted" />
                    <div className="h-5 w-2/3 max-w-md rounded-md bg-fd-muted" />
                    <div className="flex gap-3 mt-4">
                        <div className="h-10 w-32 rounded-md bg-fd-muted" />
                        <div className="h-10 w-32 rounded-md bg-fd-muted" />
                    </div>
                </div>
            </section>

            {/* Features section skeleton */}
            <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="h-7 w-48 rounded-md bg-fd-muted mx-auto mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-48 rounded-lg bg-fd-muted"
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
