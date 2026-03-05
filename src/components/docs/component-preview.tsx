"use client";

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Maximize2, Minimize2, Moon, Sun } from "lucide-react";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { VSCodeCodeBlock } from "@/components/docs/vscode-code-block";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ComponentPreviewProps {
	/** The component(s) to render in the preview area. */
	children?: ReactNode;
	/** Raw source code string to display in the code tab. */
	code?: string;
	/** Title shown above the preview. */
	title?: string;
	/** Optional description below the title. */
	description?: string;
	/** Extra class names on the outer wrapper. */
	className?: string;
	/**
	 * If true the preview container stretches to full width instead of
	 * centering content with a max-width constraint.
	 * @default false
	 */
	fluid?: boolean;
	/**
	 * Whether to show the theme toggle inside the preview pane.
	 * @default true
	 */
	showThemeToggle?: boolean;
	/**
	 * Whether to show the copy-code button.
	 * @default true
	 */
	showCopyButton?: boolean;
	/**
	 * Whether to show the fullscreen toggle button.
	 * @default true
	 */
	showFullscreenToggle?: boolean;
	/**
	 * Default active tab.
	 * @default "preview"
	 */
	defaultTab?: "preview" | "code";
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * `<ComponentPreview>` — a self-contained preview card for component
 * documentation pages. It renders the live component inside an isolated
 * container that carries the `data-ds` attribute, supports toggling
 * between light and dark mode *within the preview only*, provides a
 * tabbed code view with a one-click copy button, and can be maximized
 * to fullscreen or minimized back to inline.
 *
 * Register this in `src/mdx-components.tsx` so MDX pages can use it
 * without explicit imports:
 *
 * ```tsx
 * import { ComponentPreview } from "@/components/docs/component-preview";
 *
 * // inside getMDXComponents:
 * ComponentPreview,
 * ```
 *
 * Usage in MDX:
 *
 * ```mdx
 * <ComponentPreview
 *   title="Default Button"
 *   code={`<Button variant="primary">Click me</Button>`}
 * >
 *   <Button variant="primary">Click me</Button>
 * </ComponentPreview>
 * ```
 */
/** Derive a filename from title or code. "Alert Dialog" → "alert-dialog.tsx" */
function deriveFilename(title?: string, code?: string): string {
	if (title) {
		return `${title.toLowerCase().replace(/\s+/g, "-")}.tsx`;
	}
	// Try to detect the first component name from JSX: <Button … → "button.tsx"
	const match = code?.match(/<([A-Z][A-Za-z0-9]*)/);
	if (match) {
		// PascalCase → kebab-case: "AlertDialog" → "alert-dialog"
		const kebab = match[1]
			.replace(/([a-z])([A-Z])/g, "$1-$2")
			.toLowerCase();
		return `${kebab}.tsx`;
	}
	return "example.tsx";
}

export function ComponentPreview({
	children,
	code,
	title,
	description,
	className,
	fluid = false,
	showThemeToggle = true,
	showCopyButton = true,
	showFullscreenToggle = true,
	defaultTab = "preview",
}: ComponentPreviewProps) {
	const [activeTab, setActiveTab] = useState<"preview" | "code">(defaultTab);
	const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");
	const [isFullscreen, setIsFullscreen] = useState(false);

	// Sync initial preview theme with the page's current theme
	useEffect(() => {
		const root = document.documentElement;
		const current = root.classList.contains("dark") ? "dark" : "light";
		setPreviewTheme(current);
	}, []);

	// Fullscreen toggle
	const toggleFullscreen = useCallback(() => {
		setIsFullscreen((prev) => !prev);
	}, []);

	// Close fullscreen on Escape key & prevent body scroll
	useEffect(() => {
		if (!isFullscreen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsFullscreen(false);
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		// Prevent body scroll when fullscreen
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = originalOverflow;
		};
	}, [isFullscreen]);

	return (
		<>
			{/* Fullscreen backdrop */}
			{isFullscreen && (
				<div
					className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
					onClick={() => setIsFullscreen(false)}
					onKeyDown={(e) => {
						if (e.key === "Escape") setIsFullscreen(false);
					}}
					aria-hidden="true"
				/>
			)}

			<div
				className={cn(
					"my-6 space-y-2",
					isFullscreen && "fixed inset-4 z-50 my-0 flex flex-col",
					className,
				)}
			>
				{/* Optional header — hidden in fullscreen to maximise preview area */}
				{(title || description) && !isFullscreen && (
					<div className="space-y-0.5">
						{title && (
							<h3 className="text-lg font-semibold tracking-tight text-fd-foreground">
								{title}
							</h3>
						)}
						{description && (
							<p className="text-sm text-fd-muted-foreground leading-relaxed">
								{description}
							</p>
						)}
					</div>
				)}

				{/* Card */}
				<div
					className={cn(
						"rounded-lg border border-fd-border bg-fd-card overflow-hidden transition-all duration-300",
						isFullscreen &&
							"flex-1 flex flex-col rounded-xl shadow-2xl",
					)}
				>
					{/* Tab bar */}
					<div className="flex items-center justify-between border-b border-fd-border shrink-0">
						<div className="flex items-center">
							<button
								type="button"
								onClick={() => setActiveTab("preview")}
								className={cn(
									"relative px-4 py-2.5 text-sm font-medium transition-colors",
									activeTab === "preview"
										? "text-fd-foreground"
										: "text-fd-muted-foreground hover:text-fd-foreground",
								)}
							>
								Preview
								{activeTab === "preview" && (
									<span className="absolute inset-x-0 bottom-0 h-0.5 bg-fd-primary" />
								)}
							</button>
							{code && (
								<button
									type="button"
									onClick={() => setActiveTab("code")}
									className={cn(
										"relative px-4 py-2.5 text-sm font-medium transition-colors",
										activeTab === "code"
											? "text-fd-foreground"
											: "text-fd-muted-foreground hover:text-fd-foreground",
									)}
								>
									Code
									{activeTab === "code" && (
										<span className="absolute inset-x-0 bottom-0 h-0.5 bg-fd-primary" />
									)}
								</button>
							)}
						</div>

						{/* Right-side actions */}
						<div className="flex items-center gap-1 pr-2">
							{/* Preview theme toggle */}
							{showThemeToggle && activeTab === "preview" && (
								<button
									type="button"
									onClick={() =>
										setPreviewTheme((t) =>
											t === "light" ? "dark" : "light",
										)
									}
									className="inline-flex size-8 items-center justify-center rounded-md text-fd-muted-foreground transition-colors hover:bg-fd-muted hover:text-fd-foreground"
									aria-label={`Switch preview to ${previewTheme === "light" ? "dark" : "light"} mode`}
								>
									{previewTheme === "light" ? (
										<Moon className="size-3.5" />
									) : (
										<Sun className="size-3.5" />
									)}
								</button>
							)}

							{/* Fullscreen toggle */}
							{showFullscreenToggle && (
								<button
									type="button"
									onClick={toggleFullscreen}
									className="inline-flex size-8 items-center justify-center rounded-md text-fd-muted-foreground transition-colors hover:bg-fd-muted hover:text-fd-foreground"
									aria-label={
										isFullscreen
											? "Minimize preview"
											: "Maximize preview"
									}
									title={
										isFullscreen
											? "Minimize (Esc)"
											: "Maximize"
									}
								>
									{isFullscreen ? (
										<Minimize2 className="size-3.5" />
									) : (
										<Maximize2 className="size-3.5" />
									)}
								</button>
							)}
						</div>
					</div>

					{/* Preview pane — always mounted, visibility toggled */}
					<div
						className={cn(
							activeTab === "preview" ? undefined : "hidden",
							isFullscreen && "flex-1 overflow-auto",
						)}
					>
						<div
							className={cn(
								"relative transition-colors duration-300",
								isFullscreen && "h-full",
								previewTheme === "dark"
									? "bg-neutral-950 text-white"
									: "bg-white text-neutral-950",
							)}
							data-ds=""
							data-theme={previewTheme}
							data-ds-theme={previewTheme}
						>
							{/* Dot grid background */}
							<div
								className={cn(
									"pointer-events-none absolute inset-0 bg-[radial-gradient(circle,currentColor_0.5px,transparent_0.5px)] bg-size-[16px_16px]",
									previewTheme === "dark"
										? "opacity-[0.04]"
										: "opacity-[0.07]",
								)}
								aria-hidden="true"
							/>

							<div
								className={cn(
									"relative z-10 flex items-center justify-center p-6 sm:p-8 md:p-10",
									isFullscreen ? "min-h-full" : "min-h-50",
									fluid ? "w-full" : "mx-auto max-w-lg",
								)}
							>
								<div className="w-full flex justify-center">
									{children}
								</div>
							</div>
						</div>
					</div>

					{/* Code pane */}
					{code && (
						<div
							className={cn(
								activeTab === "code" ? undefined : "hidden",
								isFullscreen && "flex-1 overflow-auto",
							)}
						>
							<VSCodeCodeBlock
								code={code}
								filename={deriveFilename(title, code)}
								language="tsx"
								showCopyButton={showCopyButton}
								showWordWrapToggle
								maxHeight={isFullscreen ? 9999 : 480}
								collapsible={!isFullscreen}
								className="rounded-none border-x-0 border-b-0"
							>
								<DynamicCodeBlock
									lang="tsx"
									code={code}
									codeblock={{ allowCopy: false }}
								/>
							</VSCodeCodeBlock>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
