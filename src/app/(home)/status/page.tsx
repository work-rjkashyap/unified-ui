import { CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { buttonVariants as uiButtonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const systems = [
    {
        name: "Website",
        status: "Operational",
        description: "The main documentation portal",
        uptime: "99.99%",
    },
    {
        name: "API Service",
        status: "Operational",
        description: "Backend services and search API",
        uptime: "99.95%",
    },
    {
        name: "Documentation Sync",
        status: "Operational",
        description: "MDX to search index synchronization",
        uptime: "100%",
    },
    {
        name: "Global CDN",
        status: "Operational",
        description: "Static content delivery",
        uptime: "99.99%",
    },
];

const incidents = [
    {
        date: "February 5, 2026",
        title: "Search API Latency",
        status: "Resolved",
        description:
            "Successfully resolved brief latency spikes affecting global search results.",
    },
    {
        date: "January 28, 2026",
        title: "Scheduled Database Maintenance",
        status: "Completed",
        description:
            "Database patches applied during the scheduled window with no downtime.",
    },
];

export default function StatusPage() {
    return (
        <div className="flex flex-col min-h-screen pt-20">
            <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-3">
                            System Status
                        </h1>
                        <p className="text-fd-muted-foreground text-lg">
                            Check the current health and uptime of our services.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full border border-green-500/20 text-sm font-semibold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        All Systems Operational
                    </div>
                </div>

                {/* Status Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20 md:mb-24">
                    {systems.map((system) => (
                        <div
                            key={system.name}
                            className="group p-6 rounded-2xl border border-fd-border/50 bg-fd-card/50 hover:bg-fd-card hover:border-fd-border transition-all duration-300 shadow-sm"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="space-y-1">
                                    <h3 className="font-bold text-lg">{system.name}</h3>
                                    <p className="text-sm text-fd-muted-foreground leading-relaxed">
                                        {system.description}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                                    <CheckCircle2 className="size-3" />
                                    {system.status}
                                </div>
                            </div>
                            <div className="pt-4 border-t border-fd-border/30 flex items-center justify-between text-[11px] font-medium uppercase tracking-widest text-fd-muted-foreground">
                                <span>Last 30 days</span>
                                <span className="text-fd-foreground">{system.uptime}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Incident History */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <Clock className="size-5 text-fd-muted-foreground" />
                        <h2 className="text-xl font-bold tracking-tight">
                            Incident History
                        </h2>
                    </div>
                    <div className="space-y-6">
                        {incidents.map((incident) => (
                            <div
                                key={`${incident.date}-${incident.title}`}
                                className="relative pl-8 before:content-[''] before:absolute before:left-2.75 before:top-8 before:bottom-0 before:w-px before:bg-fd-border/50 last:before:hidden"
                            >
                                <div className="absolute left-0 top-1 p-1 bg-fd-background">
                                    <div className="size-4 rounded-full border-2 border-fd-muted-foreground/30 bg-fd-background" />
                                </div>
                                <div className="space-y-2">
                                    <span className="text-xs font-bold text-fd-muted-foreground uppercase tracking-[0.2em]">
                                        {incident.date}
                                    </span>
                                    <div className="p-5 rounded-xl border border-fd-border/40 bg-fd-muted/10">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold text-base">{incident.title}</h4>
                                            <span className="px-2 py-0.5 rounded-md bg-fd-muted text-[10px] font-bold uppercase tracking-widest text-fd-muted-foreground">
                                                {incident.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-fd-muted-foreground leading-relaxed">
                                            {incident.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Simple Footer / Contact */}
            <div className="border-t border-fd-border/30 bg-fd-muted/20 py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-fd-muted-foreground text-sm mb-4">
                        Having issues not reported here?
                    </p>
                    <Link
                        href="/company/contact"
                        className={cn(
                            uiButtonVariants({ color: "secondary" }),
                            "rounded-full px-8",
                        )}
                    >
                        Reach out to Support
                    </Link>
                </div>
            </div>
        </div>
    );
}
