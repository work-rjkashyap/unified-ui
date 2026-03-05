"use client";

import { Badge, Button, Card, CardBody } from "@work-rjkashyap/unified-ui";
import {
	Blocks,
	Code2,
	Layers,
	Moon,
	Paintbrush,
	Palette,
	SlidersHorizontal,
	Sparkles,
	Zap,
	ArrowRight,
	TreePine,
	Accessibility,
} from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/*  Shared ButtonLink                                                  */
/* ------------------------------------------------------------------ */

function ButtonLink({
	href,
	children,
	variant = "primary",
	size = "md",
	iconLeft,
	iconRight,
	className,
	...rest
}: ComponentProps<typeof Link> & {
	variant?: ComponentProps<typeof Button>["variant"];
	size?: ComponentProps<typeof Button>["size"];
	iconLeft?: ComponentProps<typeof Button>["iconLeft"];
	iconRight?: ComponentProps<typeof Button>["iconRight"];
}) {
	return (
		<Link href={href} className="contents" {...rest}>
			<Button
				as="span"
				variant={variant}
				size={size}
				iconLeft={iconLeft}
				iconRight={iconRight}
				className={className}
			>
				{children}
			</Button>
		</Link>
	);
}

/* ------------------------------------------------------------------ */
/*  Layer architecture data                                            */
/* ------------------------------------------------------------------ */

const layers = [
	{
		icon: Palette,
		number: 1,
		title: "Design Tokens",
		description:
			"Colors (oklch), spacing, radius, shadows, typography, z-index, and motion — all as CSS custom properties.",
		files: ["colors.ts", "spacing.ts", "radius.ts", "typography.ts"],
		color: "purple",
	},
	{
		icon: Paintbrush,
		number: 2,
		title: "Theme System",
		description:
			"CSS variable-driven theming with DSThemeProvider. Light & dark mode with zero config.",
		files: ["styles.css", "theme-provider.tsx"],
		color: "blue",
	},
	{
		icon: Layers,
		number: 3,
		title: "Primitives",
		description:
			"Typography, Heading, Stack, Container, Divider — the foundation for consistent layout.",
		files: ["typography.tsx", "stack.tsx", "container.tsx"],
		color: "cyan",
	},
	{
		icon: Blocks,
		number: 4,
		title: "Components",
		description:
			"75+ production-ready composites on Radix UI. Button, Dialog, DataTable, Sidebar, and more.",
		files: ["button.tsx", "dialog.tsx", "data-table.tsx", "75+"],
		color: "green",
	},
	{
		icon: Sparkles,
		number: 5,
		title: "Motion Presets",
		description:
			"Framer Motion animation presets — fadeIn, slideUp, scaleIn, stagger — ready to compose.",
		files: ["presets.ts", "hooks.ts"],
		color: "amber",
	},
	{
		icon: Code2,
		number: 6,
		title: "Utilities",
		description:
			"cn() via tailwind-merge, mergeSlots, contrast helpers, and focus-ring classes.",
		files: ["cn.ts", "focus-ring.ts"],
		color: "rose",
	},
];

const colorMap: Record<
	string,
	{
		badge:
			| "primary"
			| "info"
			| "success"
			| "warning"
			| "danger"
			| "default";
		dot: string;
		border: string;
	}
> = {
	purple: {
		badge: "primary",
		dot: "bg-purple-500",
		border: "border-purple-500/20",
	},
	blue: { badge: "info", dot: "bg-blue-500", border: "border-blue-500/20" },
	cyan: { badge: "info", dot: "bg-cyan-500", border: "border-cyan-500/20" },
	green: {
		badge: "success",
		dot: "bg-green-500",
		border: "border-green-500/20",
	},
	amber: {
		badge: "warning",
		dot: "bg-amber-500",
		border: "border-amber-500/20",
	},
	rose: { badge: "danger", dot: "bg-rose-500", border: "border-rose-500/20" },
};

/* ------------------------------------------------------------------ */
/*  Highlight features                                                 */
/* ------------------------------------------------------------------ */

const highlights = [
	{
		icon: Zap,
		title: "Tree-Shakeable",
		description:
			"Import from the barrel or layer-specific entry points. Only what you use ships to the client.",
	},
	{
		icon: SlidersHorizontal,
		title: "CVA Variants",
		description:
			"Every component uses class-variance-authority for type-safe, composable variant APIs.",
	},
	{
		icon: Moon,
		title: "Dark Mode Native",
		description:
			"All tokens and components respect dark mode via CSS custom properties — zero config.",
	},
	{
		icon: TreePine,
		title: "Strict Layers",
		description:
			"Six dependency-ordered layers. No upward imports. Predictable, circular-dep-free architecture.",
	},
	{
		icon: Accessibility,
		title: "Accessible",
		description:
			"Built on Radix UI with proper ARIA attributes, keyboard navigation, and focus management.",
	},
	{
		icon: Sparkles,
		title: "Framer Motion",
		description:
			"First-class animation presets for page transitions, micro-interactions, and staggered reveals.",
	},
];

/* ------------------------------------------------------------------ */
/*  Dependency flow visualization                                      */
/* ------------------------------------------------------------------ */

function DependencyFlow() {
	const flowItems = [
		{ label: "Tokens", variant: "primary" as const },
		{ label: "Theme", variant: "info" as const },
		{ label: "Primitives", variant: "info" as const },
		{ label: "Components", variant: "success" as const },
	];

	return (
		<div className="flex flex-col items-center gap-3">
			<p className="text-[10px] font-bold tracking-[0.2em] text-fd-muted-foreground uppercase">
				Strict Dependency Flow
			</p>
			<div className="inline-flex items-center gap-2 flex-wrap justify-center rounded-lg border border-fd-border bg-fd-card/60 px-4 py-2.5">
				{flowItems.map((item, i) => (
					<span
						key={item.label}
						className="inline-flex items-center gap-2"
					>
						<Badge variant={item.variant} size="sm">
							{item.label}
						</Badge>
						{i < flowItems.length - 1 && (
							<span className="text-fd-muted-foreground text-xs">
								→
							</span>
						)}
					</span>
				))}
				<span className="text-fd-muted-foreground/50 mx-1">|</span>
				<Badge variant="warning" size="sm">
					Motion
				</Badge>
				<span className="text-fd-muted-foreground/50">+</span>
				<Badge variant="danger" size="sm">
					Utils
				</Badge>
				<span className="text-fd-muted-foreground text-[10px] ml-1">
					(shared)
				</span>
			</div>
		</div>
	);
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export function FeaturesSection() {
	return (
		<section className="relative py-14 bg-fd-background">
			{/* Subtle divider glow */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-px bg-linear-to-r from-transparent via-purple-500/20 to-transparent pointer-events-none" />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* ── Section header ── */}
				<div className="text-center mb-10">
					<Badge variant="primary" size="sm" className="mb-3">
						Architecture
					</Badge>
					<h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-2">
						Six layers. One system.
					</h2>
					<p className="text-sm text-fd-muted-foreground leading-6 max-w-xl mx-auto">
						Organized into strict, dependency-ordered layers — no
						upward imports. Composable by design, predictable by
						architecture.
					</p>
				</div>

				{/* ── Layer grid ── */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
					{layers.map((layer) => {
						const colors = colorMap[layer.color] ?? colorMap.purple;
						return (
							<Card
								key={layer.title}
								className={cn(
									"bg-fd-card/40 border-fd-border group",
									"hover:border-fd-muted-foreground/20 transition-all duration-200",
								)}
							>
								<CardBody className="p-4 space-y-2.5">
									{/* Icon + layer badge */}
									<div className="flex flex-row items-center gap-2.5">
										<div
											className={cn(
												"relative p-2 rounded-lg bg-fd-background border",
												colors.border,
												"transition-colors group-hover:border-fd-muted-foreground/30",
											)}
										>
											<layer.icon className="w-3.5 h-3.5 text-fd-foreground" />
											{/* Dot indicator */}
											<div
												className={cn(
													"absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full",
													colors.dot,
													"ring-2 ring-fd-card/60",
												)}
											/>
										</div>
										<Badge variant={colors.badge} size="sm">
											Layer {layer.number}
										</Badge>
									</div>

									{/* Title + description */}
									<div>
										<h3 className="text-sm font-bold tracking-tight mb-1">
											{layer.title}
										</h3>
										<p className="text-xs text-fd-muted-foreground leading-5">
											{layer.description}
										</p>
									</div>

									{/* File badges */}
									<div className="flex flex-row flex-wrap gap-1">
										{layer.files.map((file) => (
											<Badge
												key={file}
												variant="outline"
												size="sm"
												className="font-mono text-[10px]"
											>
												{file}
											</Badge>
										))}
									</div>
								</CardBody>
							</Card>
						);
					})}
				</div>

				{/* ── Dependency flow ── */}
				<div className="mb-10">
					<DependencyFlow />
				</div>

				{/* ── Highlights grid ── */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
					{highlights.map((item) => (
						<div
							key={item.title}
							className="flex flex-row items-start gap-3 rounded-xl border border-fd-border bg-fd-card/40 p-4 hover:border-fd-muted-foreground/20 transition-colors duration-200"
						>
							<div className="p-1.5 rounded-md bg-fd-background border border-fd-border shrink-0 mt-0.5">
								<item.icon className="w-3.5 h-3.5 text-fd-foreground" />
							</div>
							<div>
								<h3 className="text-sm font-bold tracking-tight mb-0.5">
									{item.title}
								</h3>
								<p className="text-xs text-fd-muted-foreground leading-5">
									{item.description}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* ── Bottom CTA ── */}
				<div className="text-center">
					<ButtonLink
						href="/docs"
						variant="ghost"
						size="md"
						iconRight={<ArrowRight className="size-3.5" />}
					>
						Explore the architecture
					</ButtonLink>
				</div>
			</div>
		</section>
	);
}
