import { notFound } from "next/navigation";
import { cn } from "@/lib/cn";
import { resourceSource } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return resourceSource.getPages().map((page) => ({
        slug: page.slugs[0],
    }));
}

export async function generateMetadata(props: PageProps) {
    const params = await props.params;
    const page = resourceSource.getPage([params.slug]);

    if (!page) return {};

    return {
        title: `${page.data.title} - Unified UI`,
        description: page.data.description,
    };
}

export default async function Page(props: PageProps) {
    const params = await props.params;
    const page = resourceSource.getPage([params.slug]);

    if (!page) notFound();

    const Content = page.data.body;

    return (
        <div className="relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
            <div className="absolute top-0 right-1/2 translate-x-1/2 w-[1000px] h-[600px] bg-fd-primary/5 rounded-full blur-[120px] -z-10 opacity-50" />

            {/* Hero Section */}
            <section className="relative pt-20 pb-16 sm:pt-32 sm:pb-24 border-b border-fd-border/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fd-primary/5 border border-fd-primary/10 text-[10px] md:text-xs font-medium mb-8 uppercase tracking-widest text-fd-primary animate-fade-in">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fd-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-fd-primary" />
                        </span>
                        Resources
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-fd-foreground mb-6 max-w-4xl mx-auto leading-[1.1]">
                        {page.data.title}
                    </h1>
                    {page.data.description && (
                        <p className="text-lg sm:text-xl text-fd-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
                            {page.data.description}
                        </p>
                    )}
                </div>
            </section>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Article Content */}
                    <article className="lg:col-span-8">
                        <div
                            className={cn(
                                "prose prose-sm sm:prose-base prose-fd dark:prose-invert max-w-none",
                                "prose-headings:font-bold prose-headings:tracking-tight",
                                "prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b prose-h2:border-fd-border/40",
                                "prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4",
                                "prose-p:leading-relaxed prose-p:text-fd-muted-foreground prose-p:text-lg prose-p:font-light",
                                "prose-li:text-fd-muted-foreground prose-li:text-lg prose-li:font-light",
                                "prose-strong:text-fd-foreground prose-strong:font-semibold",
                                "prose-a:text-fd-primary prose-a:no-underline hover:prose-a:underline",
                                "prose-code:text-fd-primary prose-code:bg-fd-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none"
                            )}
                        >
                            <Content components={getMDXComponents({})} />
                        </div>
                    </article>

                    {/* Sidebar / Quick Links */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="p-8 rounded-3xl border border-fd-border bg-fd-card/30 backdrop-blur-sm space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-fd-foreground/70">
                                Quick Navigation
                            </h3>
                            <nav className="flex flex-col gap-4">
                                {[
                                    { label: "Documentation", href: "/docs" },
                                    { label: "Community", href: "https://github.com/unified-ui" },
                                    { label: "Support", href: "/company/contact" },
                                ].map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className="flex items-center justify-between group p-3 rounded-xl border border-transparent hover:border-fd-border hover:bg-fd-background/50 transition-all duration-300"
                                    >
                                        <span className="text-sm font-medium text-fd-muted-foreground group-hover:text-fd-foreground transition-colors">
                                            {link.label}
                                        </span>
                                        <div className="w-8 h-8 rounded-lg bg-fd-background flex items-center justify-center text-fd-muted-foreground group-hover:text-fd-primary group-hover:bg-fd-primary/10 transition-all">
                                            →
                                        </div>
                                    </a>
                                ))}
                            </nav>
                        </div>

                        <div className="p-8 rounded-3xl border border-fd-border bg-linear-to-br from-fd-primary/5 to-transparent">
                            <h4 className="font-semibold text-fd-foreground mb-2">
                                Stay Updated
                            </h4>
                            <p className="text-sm text-fd-muted-foreground mb-6 leading-relaxed">
                                Subscribe to our newsletter to receive the latest updates, guides, and changelogs directly in your inbox.
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="name@email.com"
                                    className="flex-1 px-4 py-2 text-sm rounded-xl border border-fd-border bg-fd-background focus:outline-hidden focus:ring-2 focus:ring-fd-primary/20 transition-all"
                                />
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-xl bg-fd-foreground text-fd-background text-sm font-bold hover:opacity-90 transition-opacity"
                                >
                                    Join
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
