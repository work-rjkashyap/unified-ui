"use client";

import { ThemeCustomizer } from "@work-rjkashyap/unified-ui";
import { ThemeToggle, type ThemeValue } from "@work-rjkashyap/unified-ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// CustomizerSidebar
// ---------------------------------------------------------------------------
// A sticky sidebar wrapper around the design system's ThemeCustomizer
// component. Adds a header with a theme mode toggle (light/dark/system)
// so users can preview both modes while customizing.
//
// The sidebar is sticky on desktop so it stays visible as the user scrolls
// through the preview area. On mobile it renders inline above the preview.
// ---------------------------------------------------------------------------

export function CustomizerSidebar() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Avoid hydration mismatch — useTheme returns undefined on the server
	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div className="w-full lg:sticky lg:top-16 lg:max-h-[calc(100dvh-4rem)] lg:overflow-y-auto lg:scrollbar-thin">
			<div className="rounded-lg border border-border bg-card p-4 space-y-4">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-sm font-semibold">
							Customize theme
						</h2>
						<p className="text-xs text-muted-foreground mt-0.5">
							Pick colors, fonts, and style.
						</p>
					</div>
					{mounted && (
						<ThemeToggle
							value={(theme as ThemeValue) ?? "system"}
							onChange={(value) => setTheme(value)}
							mode="light-dark-system"
							variant="segmented"
							size="sm"
						/>
					)}
				</div>

				<div className="border-t border-border" />

				{/* The actual customizer controls */}
				<ThemeCustomizer
					showCopyButton
					showResetButton
				/>
			</div>
		</div>
	);
}
