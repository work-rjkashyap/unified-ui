import { ThemeCustomizerProvider } from "@work-rjkashyap/unified-ui";
import { RootProvider } from "fumadocs-ui/provider/next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeCustomizerTrigger } from "@/components/layout/theme-customizer-trigger";
import "./global.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Lora, Outfit } from "next/font/google";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const outfit = Outfit({
	subsets: ["latin"],
	variable: "--font-outfit",
});

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const lora = Lora({
	subsets: ["latin"],
	variable: "--font-lora",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-jetbrains",
});

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SITE_URL ??
			"https://unified-ui-rajeshwar.vercel.app",
	),
	title: {
		default: "Unified UI - Build Faster with Next-Generation UI Components",
		template: "%s - Unified UI",
	},
	description:
		"The platform for high-performance, scalable, and beautiful user interfaces. Ship products faster with our comprehensive component library and documentation.",
	keywords: [
		"Unified UI",
		"React",
		"Next.js",
		"TypeScript",
		"Tailwind CSS",
		"Fumadocs",
		"Components",
		"UI Library",
	],
};

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<html
			lang="en"
			className={cn(
				outfit.variable,
				inter.variable,
				lora.variable,
				jetbrainsMono.variable,
				outfit.className,
			)}
			suppressHydrationWarning
		>
			<body className={cn("flex flex-col min-h-screen")}>
				<RootProvider>
					<ThemeCustomizerProvider>
						<NuqsAdapter>
							{children}
							<ThemeCustomizerTrigger />
						</NuqsAdapter>
					</ThemeCustomizerProvider>
				</RootProvider>
			</body>
		</html>
	);
}
