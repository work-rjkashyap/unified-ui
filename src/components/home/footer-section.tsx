"use client";

import { Github, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/*  Footer data                                                        */
/* ------------------------------------------------------------------ */

const footerLinks = {
	product: {
		title: "Product",
		links: [
			{ label: "Components", href: "/docs" },
			{ label: "Showcase", href: "/showcase" },
			{ label: "Templates", href: "/docs" },
			{ label: "Themes", href: "/docs" },
		],
	},
	resources: {
		title: "Resources",
		links: [
			{ label: "Documentation", href: "/docs" },
			{ label: "Blog", href: "/resources/blog" },
			{ label: "Guides", href: "/resources/guides" },
			{ label: "Changelog", href: "/resources/changelog" },
		],
	},
	community: {
		title: "Community",
		links: [
			{ label: "GitHub", href: "https://github.com/imrj05/unified-ui" },
			{ label: "Twitter", href: "https://x.com/i_am_rj05" },
			{
				label: "Discussions",
				href: "https://github.com/imrj05/unified-ui/discussions",
			},
			{
				label: "Contributing",
				href: "https://github.com/imrj05/unified-ui/blob/main/CONTRIBUTING.md",
			},
		],
	},
	legal: {
		title: "Legal",
		links: [
			{ label: "Privacy", href: "/legal/privacy" },
			{ label: "Terms", href: "/legal/terms" },
			{ label: "License", href: "/legal/license" },
		],
	},
};

const socialLinks = [
	{
		icon: Github,
		href: "https://github.com/imrj05/unified-ui",
		label: "GitHub",
	},
	{ icon: Twitter, href: "https://x.com/i_am_rj05", label: "Twitter" },
	{ icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
	{ icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export function FooterSection() {
	return (
		<footer className="relative border-t border-fd-border/40 bg-fd-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				{/* ── Main grid ── */}
				<div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
					{/* Brand column */}
					<div className="col-span-2 md:col-span-1 space-y-4">
						<Link href="/" className="inline-block">
							<Logo />
						</Link>
						<p className="text-sm text-fd-muted-foreground leading-6 max-w-50">
							A scalable, token-driven React design system for
							modern applications.
						</p>

						{/* Social links */}
						<div className="flex items-center gap-1.5">
							{socialLinks.map((social) => {
								const Icon = social.icon;
								return (
									<Link
										key={social.label}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										className={cn(
											"inline-flex items-center justify-center w-7 h-7 rounded-full",
											"text-fd-muted-foreground border border-transparent",
											"hover:bg-fd-muted hover:text-fd-foreground hover:border-fd-border/40",
											"transition-colors duration-200",
										)}
										aria-label={social.label}
									>
										<Icon className="w-3.5 h-3.5" />
									</Link>
								);
							})}
						</div>
					</div>

					{/* Link columns */}
					{Object.values(footerLinks).map((section) => (
						<div key={section.title}>
							<h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-fd-foreground/70">
								{section.title}
							</h3>
							<ul className="space-y-2">
								{section.links.map((link) => (
									<li key={link.label}>
										<Link
											href={link.href}
											className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors duration-200"
											{...(link.href.startsWith("http")
												? {
														target: "_blank",
														rel: "noopener noreferrer",
													}
												: {})}
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* ── Bottom bar ── */}
				<div className="pt-6 border-t border-fd-border/40">
					<div className="flex flex-col sm:flex-row items-center justify-between gap-3">
						<div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-xs text-fd-muted-foreground font-medium">
							<p>© {new Date().getFullYear()} Unified UI</p>
							<span className="hidden sm:inline opacity-30">
								·
							</span>
							<Link
								href="/status"
								className="inline-flex items-center gap-1.5 hover:text-fd-foreground transition-colors"
							>
								<span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
								Operational
							</Link>
						</div>

						<p className="text-xs text-fd-muted-foreground/60 text-center sm:text-right">
							Built with Next.js, Radix UI, Tailwind CSS v4 &amp;
							Fumadocs
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
