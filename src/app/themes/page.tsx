import type { Metadata } from "next";
import { Paintbrush, Palette, Copy, Sparkles, Component } from "lucide-react";
import { CustomizerSidebar } from "./_components/customizer-sidebar";
import { PreviewArea } from "./_components/preview-area";

export const metadata: Metadata = {
	title: "Themes — Unified UI",
	description:
		"Customize your theme. Easily select colors, fine-tune styles, and generate a theme that fits your project in seconds.",
};

export default function ThemesPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Header */}
			<section className="border-b border-border bg-linear-to-b from-muted/30 to-background">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
					<div className="flex flex-col items-center text-center max-w-2xl mx-auto">
						<div className="flex items-center justify-center size-12 rounded-xl bg-primary/10 text-primary border border-primary/20 mb-5">
							<Palette className="size-5" />
						</div>
						<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
							<Sparkles className="size-3" />
							Theme Playground
						</span>
						<h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
							Customize your theme
						</h1>
						<p className="text-base text-muted-foreground leading-relaxed max-w-lg">
							Pick colors, fine-tune styles, and preview 25+
							components in a live bento grid — then copy the CSS
							for your project in seconds.
						</p>
						<div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs text-muted-foreground">
							<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted border border-border">
								<Component className="size-3" />
								25+ Components
							</span>
							<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted border border-border">
								<Paintbrush className="size-3" />5 Style Presets
							</span>
							<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted border border-border">
								<Palette className="size-3" />
								13 Color Palettes
							</span>
							<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted border border-border">
								<Copy className="size-3" />
								Copy CSS
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* Main Content: Sidebar + Preview */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
				<div className="flex flex-col lg:flex-row gap-6">
					{/* Customizer Sidebar */}
					<aside className="w-full lg:w-85 xl:w-90 shrink-0">
						<CustomizerSidebar />
					</aside>

					{/* Preview Area */}
					<main className="flex-1 min-w-0">
						<PreviewArea />
					</main>
				</div>
			</section>
		</div>
	);
}
