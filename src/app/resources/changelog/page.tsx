import type { Metadata } from "next";
import { ChangelogRenderer } from "@/components/changelog/changelog-renderer";

export const metadata: Metadata = {
	title: "Changelog - Unified UI",
	description:
		"Keep track of every release, new component, bug fix, and breaking change in the Unified UI design system.",
};

export default function ChangelogPage() {
	return (
		<div className="relative overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
			<div className="absolute top-0 right-1/2 translate-x-1/2 w-[1000px] h-[600px] bg-fd-primary/5 rounded-full blur-[120px] -z-10 opacity-50" />

			{/* Hero Section */}
			<section className="relative pt-20 pb-16 sm:pt-32 sm:pb-24 border-b border-fd-border/40">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fd-primary/5 border border-fd-primary/10 text-xs font-medium mb-8 uppercase tracking-widest text-fd-primary animate-fade-in">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fd-primary opacity-75" />
							<span className="relative inline-flex rounded-full h-2 w-2 bg-fd-primary" />
						</span>
						Resources
					</div>
					<h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-fd-foreground mb-6 max-w-4xl mx-auto leading-[1.1]">
						Changelog
					</h1>
					<p className="text-lg sm:text-xl text-fd-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
						Every release, new component, bug fix, and improvement
						— documented and versioned. Follow along as Unified UI
						evolves.
					</p>
				</div>
			</section>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
				<ChangelogRenderer />
			</div>
		</div>
	);
}
