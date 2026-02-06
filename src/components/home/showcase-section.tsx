"use client";

const _showcaseItems = [
  {
    title: "Component Library",
    description:
      "Access 50+ pre-built, customizable components ready for production use.",
    gradient: "from-purple-500 to-pink-500",
    link: "/docs",
  },
  {
    title: "Design System",
    description:
      "Comprehensive design tokens and guidelines for consistent UIs across your products.",
    gradient: "from-blue-500 to-cyan-500",
    link: "/docs",
  },
  {
    title: "Templates & Examples",
    description:
      "Start fast with battle-tested templates and real-world implementation examples.",
    gradient: "from-indigo-500 to-purple-500",
    link: "/docs",
  },
];

export function ShowcaseSection() {
  return (
    <section className="relative py-24 border-y border-fd-border/50 bg-fd-background/50">
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-purple-600 dark:text-purple-400 uppercase mb-4">
              Global Standards
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tighter">
              Built for scale. <br /> Trusted by millions.
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Large Feature */}
          <div className="md:col-span-8 group relative aspect-video md:aspect-auto md:h-[500px] rounded-3xl overflow-hidden border border-fd-border bg-fd-card shadow-sm transition-all duration-500 hover:shadow-xl hover:border-fd-muted-foreground/20">
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-fd-background/80" />
            <div className="absolute inset-0 flex items-center justify-center p-12 opacity-40 group-hover:opacity-60 transition-opacity">
              <div className="w-full h-full border-2 border-dashed border-fd-border rounded-xl flex items-center justify-center">
                <span className="text-xs font-mono uppercase tracking-widest text-fd-foreground">
                  Interactive Component Demo
                </span>
              </div>
            </div>
            <div className="absolute bottom-10 left-10 max-w-md">
              <h4 className="text-2xl font-bold mb-3 tracking-tight">
                Real-time Analytics Dashboard
              </h4>
              <p className="text-sm text-fd-muted-foreground font-light leading-relaxed">
                Monitor your performance with our built-in analytics suite. Get
                deep insights into your users' behavior with zero configuration.
              </p>
            </div>
          </div>

          {/* Small Features */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex-1 group relative rounded-3xl overflow-hidden border border-fd-border bg-fd-card p-8 transition-all duration-500 hover:shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full" />
              <h4 className="text-xl font-bold mb-3 tracking-tight">
                Multi-region Support
              </h4>
              <p className="text-sm text-fd-muted-foreground font-light leading-relaxed mb-6">
                Deploy your docs globally with local performance.
              </p>
              <div className="w-full aspect-square md:aspect-auto md:h-24 bg-fd-muted/50 rounded-xl border border-fd-border border-dashed flex items-center justify-center">
                <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest text-fd-foreground">
                  Global Map View
                </span>
              </div>
            </div>
            <div className="flex-1 group relative rounded-3xl overflow-hidden border border-fd-border bg-fd-card p-8 transition-all duration-500 hover:shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
              <h4 className="text-xl font-bold mb-3 tracking-tight">
                Advanced Security
              </h4>
              <p className="text-sm text-fd-muted-foreground font-light leading-relaxed mb-6">
                Enterprise-grade encryption by default.
              </p>
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-fd-muted/50 border border-fd-border"
                  />
                ))}
                <div className="w-8 h-8 rounded-full bg-fd-foreground flex items-center justify-center text-[10px] text-fd-background font-bold tracking-tighter">
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
