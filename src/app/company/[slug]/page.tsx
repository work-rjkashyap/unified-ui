import { notFound } from "next/navigation";
import { cn } from "@/lib/cn";
import { companySource } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}
export async function generateStaticParams() {
    return companySource.getPages().map((page) => ({
        slug: page.slugs[0],
    }));
}
export async function generateMetadata(props: PageProps) {
    const params = await props.params;
    const page = companySource.getPage([params.slug]);
    if (!page) return {};
    return {
        title: `${page.data.title} - Unified UI`,
        description: page.data.description,
    };
}
export default async function Page(props: PageProps) {
    const params = await props.params;
    const page = companySource.getPage([params.slug]);
    if (!page) notFound();
    const Content = page.data.body;
    return (
        <div className="relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-fd-primary/5 rounded-full blur-[120px] -z-10 opacity-50" />
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 sm:pt-32 sm:pb-24 border-b border-fd-border/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fd-primary/5 border border-fd-primary/10 text-[10px] md:text-xs font-medium mb-8 uppercase tracking-widest text-fd-primary animate-fade-in">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fd-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-fd-primary" />
                        </span>
                        Company
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
                    {/* Sidebar / Stats or Quick Links */}
                    <aside className="lg:col-span-4 space-y-8 order-last lg:order-first">
                        <div className="p-8 rounded-3xl border border-fd-border bg-fd-card/30 backdrop-blur-sm space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-fd-foreground/70">
                                Unified Metrics
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="text-3xl font-bold tracking-tighter text-fd-primary">
                                        10k+
                                    </div>
                                    <div className="text-xs text-fd-muted-foreground uppercase tracking-wider font-semibold">
                                        Active Developers
                                    </div>
                                </div>
                                <div className="h-px bg-fd-border/60" />
                                <div>
                                    <div className="text-3xl font-bold tracking-tighter text-fd-primary">
                                        99.9%
                                    </div>
                                    <div className="text-xs text-fd-muted-foreground uppercase tracking-wider font-semibold">
                                        Uptime SLA
                                    </div>
                                </div>
                                <div className="h-px bg-fd-border/60" />
                                <div>
                                    <div className="text-3xl font-bold tracking-tighter text-fd-primary">
                                        24/7
                                    </div>
                                    <div className="text-xs text-fd-muted-foreground uppercase tracking-wider font-semibold">
                                        Expert Support
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 rounded-3xl border border-fd-border bg-linear-to-br from-fd-primary/5 to-transparent">
                            <h4 className="font-semibold text-fd-foreground mb-2">
                                Need anything else?
                            </h4>
                            <p className="text-sm text-fd-muted-foreground mb-6">
                                Our team is always here to help you build faster.
                            </p>
                            <button
                                type="button"
                                className="w-full py-3 px-4 rounded-xl bg-fd-foreground text-fd-background text-sm font-bold hover:opacity-90 transition-opacity"
                            >
                                Get in Touch
                            </button>
                        </div>
                    </aside>
                    {/* Article Content */}
                    <article className="lg:col-span-8">
                        <div
                            className={cn(
                                "prose prose-sm sm:prose-base prose-fd dark:prose-invert max-w-none",
                                "prose-headings:font-bold prose-headings:tracking-tight",
                                "prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b prose-h2:border-fd-border/40",
                                "prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4",
                                "prose-p:leading-relaxed prose-p:text-fd-muted-foreground prose-p:text-lg prose-p:font-light",
                                "prose-li:text-fd-muted-foreground prose-li:text-lg",
                                "prose-strong:text-fd-foreground prose-strong:font-semibold",
                                "prose-img:rounded-3xl prose-img:border prose-img:border-fd-border",
                            )}
                        >
                            <Content components={getMDXComponents({})} />
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}
