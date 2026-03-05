"use client";

import { cn } from "@/lib/cn";
import {
	Check,
	ChevronDown,
	ChevronUp,
	Clipboard,
	Code2,
	FileCode2,
	FileJson,
	FileText,
	FileType,
	Hash,
	Terminal,
	WrapText,
} from "lucide-react";
import {
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface VSCodeCodeBlockProps {
	/** Raw source code string (used for copy-to-clipboard and line counting). */
	code: string;
	/** Filename shown in the header (e.g. "accordion.tsx"). */
	filename?: string;
	/** Language identifier for the badge & file icon (e.g. "tsx", "css"). */
	language?: string;
	/** Whether to show the copy button. @default true */
	showCopyButton?: boolean;
	/** Whether the code block is collapsible. @default true */
	collapsible?: boolean;
	/** Whether the code starts collapsed. @default false */
	defaultCollapsed?: boolean;
	/** Whether to enable word-wrap toggle. @default false */
	showWordWrapToggle?: boolean;
	/** Maximum height before scrolling (in px). @default 480 */
	maxHeight?: number;
	/** Extra class names on the outer wrapper. */
	className?: string;
	/**
	 * Pre-highlighted content to render inside the code area.
	 * Typically a `<DynamicCodeBlock>` from Fumadocs which provides
	 * Shiki-based syntax highlighting.
	 *
	 * IMPORTANT: Pass `codeblock={{ allowCopy: false }}` to DynamicCodeBlock
	 * so that only our own copy button shows up.
	 */
	children?: ReactNode;
}

// ---------------------------------------------------------------------------
// Language helpers
// ---------------------------------------------------------------------------

const LANG_CONFIG: Record<
	string,
	{ label: string; color: string; icon: typeof Code2 }
> = {
	tsx: { label: "TSX", color: "text-blue-400", icon: FileCode2 },
	ts: { label: "TS", color: "text-blue-400", icon: FileCode2 },
	typescript: { label: "TS", color: "text-blue-400", icon: FileCode2 },
	jsx: { label: "JSX", color: "text-yellow-400", icon: FileCode2 },
	js: { label: "JS", color: "text-yellow-400", icon: FileCode2 },
	javascript: { label: "JS", color: "text-yellow-400", icon: FileCode2 },
	css: { label: "CSS", color: "text-purple-400", icon: FileType },
	scss: { label: "SCSS", color: "text-pink-400", icon: FileType },
	json: { label: "JSON", color: "text-yellow-300", icon: FileJson },
	md: { label: "MD", color: "text-sky-300", icon: FileText },
	mdx: { label: "MDX", color: "text-sky-300", icon: FileText },
	html: { label: "HTML", color: "text-orange-400", icon: Code2 },
	sh: { label: "SH", color: "text-green-400", icon: Terminal },
	bash: { label: "BASH", color: "text-green-400", icon: Terminal },
	zsh: { label: "ZSH", color: "text-green-400", icon: Terminal },
	py: { label: "PY", color: "text-yellow-300", icon: Hash },
	python: { label: "PY", color: "text-yellow-300", icon: Hash },
};

function getLangConfig(filename?: string, language?: string) {
	const ext =
		language?.toLowerCase() ??
		filename?.split(".").pop()?.toLowerCase() ??
		"";
	return (
		LANG_CONFIG[ext] ?? {
			label: ext.toUpperCase(),
			color: "text-fd-muted-foreground",
			icon: Code2,
		}
	);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * `<VSCodeCodeBlock>` — a clean, theme-aware code block wrapper for
 * documentation pages. Designed to sit inside a Preview/Code tab shell
 * without creating a double-header.
 *
 * Colors adapt to light/dark mode using `fd-*` Fumadocs tokens so the
 * component looks correct in both themes.
 *
 * Features:
 * - Compact toolbar with filename, language pill, word-wrap toggle,
 *   collapse/expand, and copy button
 * - Bottom gradient fade when content overflows
 * - Smooth collapse/expand animation
 * - Strips Fumadocs default container styles so Shiki output
 *   fits seamlessly
 *
 * @example
 * ```tsx
 * <VSCodeCodeBlock code={rawCode} filename="button.tsx" language="tsx">
 *   <DynamicCodeBlock
 *     lang="tsx"
 *     code={rawCode}
 *     codeblock={{ allowCopy: false }}
 *   />
 * </VSCodeCodeBlock>
 * ```
 */
export function VSCodeCodeBlock({
	code,
	filename,
	language,
	showCopyButton = true,
	collapsible = true,
	defaultCollapsed = false,
	showWordWrapToggle = false,
	maxHeight = 480,
	className,
	children,
}: VSCodeCodeBlockProps) {
	const [collapsed, setCollapsed] = useState(defaultCollapsed);
	const [copied, setCopied] = useState(false);
	const [wordWrap, setWordWrap] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const scrollRef = useRef<HTMLDivElement>(null);
	const [isOverflowing, setIsOverflowing] = useState(false);

	const lineCount = code.split("\n").length;
	const config = getLangConfig(filename, language);
	const LangIcon = config.icon;

	// Detect if code area is scrollable
	useEffect(() => {
		const el = scrollRef.current;
		if (!el || collapsed) return;
		const check = () => setIsOverflowing(el.scrollHeight > el.clientHeight);
		check();
		const ro = new ResizeObserver(check);
		ro.observe(el);
		return () => ro.disconnect();
	}, [collapsed, children, code]);

	// Copy handler
	const handleCopy = useCallback(() => {
		navigator.clipboard.writeText(code).then(() => {
			setCopied(true);
			if (timerRef.current) clearTimeout(timerRef.current);
			timerRef.current = setTimeout(() => setCopied(false), 2000);
		});
	}, [code]);

	// Cleanup
	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	return (
		<div
			className={cn(
				"group/codeblock relative rounded-lg overflow-hidden",
				"bg-fd-secondary/50 text-fd-foreground",
				"border border-fd-border",
				className,
			)}
		>
			{/* ── Toolbar ─────────────────────────────────────────────── */}
			<div
				className={cn(
					"flex items-center justify-between gap-2",
					"px-3 py-2",
					"bg-fd-muted/80 border-b border-fd-border",
				)}
			>
				{/* Left side: icon + filename + language pill */}
				<div className="flex items-center gap-2.5 min-w-0">
					<LangIcon
						className={cn("size-3.5 shrink-0", config.color)}
					/>

					{filename && (
						<span className="text-[12px] font-medium text-fd-muted-foreground truncate">
							{filename}
						</span>
					)}

					{config.label && (
						<span
							className={cn(
								"inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium leading-none",
								"bg-fd-accent/60 text-fd-muted-foreground border border-fd-border",
							)}
						>
							{config.label}
						</span>
					)}
				</div>

				{/* Right side: actions */}
				<div className="flex items-center gap-0.5 shrink-0">
					{/* Line count */}
					<span className="text-[10px] font-mono text-fd-muted-foreground/50 mr-1.5 hidden sm:block">
						{lineCount}L
					</span>

					{/* Word wrap toggle */}
					{showWordWrapToggle && (
						<button
							type="button"
							onClick={() => setWordWrap((w) => !w)}
							className={cn(
								"inline-flex items-center justify-center size-7 rounded-md",
								"transition-colors duration-150",
								wordWrap
									? "text-fd-primary bg-fd-primary/10"
									: "text-fd-muted-foreground/50 hover:text-fd-muted-foreground hover:bg-fd-accent",
							)}
							aria-label={
								wordWrap
									? "Disable word wrap"
									: "Enable word wrap"
							}
							title={wordWrap ? "Disable word wrap" : "Word wrap"}
						>
							<WrapText className="size-3.5" />
						</button>
					)}

					{/* Collapse toggle */}
					{collapsible && (
						<button
							type="button"
							onClick={() => setCollapsed((c) => !c)}
							className={cn(
								"inline-flex items-center justify-center size-7 rounded-md",
								"text-fd-muted-foreground/50 hover:text-fd-muted-foreground hover:bg-fd-accent",
								"transition-colors duration-150",
							)}
							aria-label={
								collapsed ? "Expand code" : "Collapse code"
							}
							title={collapsed ? "Expand" : "Collapse"}
						>
							{collapsed ? (
								<ChevronDown className="size-3.5" />
							) : (
								<ChevronUp className="size-3.5" />
							)}
						</button>
					)}

					{/* Copy button */}
					{showCopyButton && (
						<button
							type="button"
							onClick={handleCopy}
							className={cn(
								"inline-flex items-center justify-center size-7 rounded-md",
								"transition-all duration-150",
								copied
									? "text-green-500 bg-green-500/10"
									: "text-fd-muted-foreground/50 hover:text-fd-muted-foreground hover:bg-fd-accent",
							)}
							aria-label={copied ? "Copied!" : "Copy code"}
							title={copied ? "Copied!" : "Copy"}
						>
							{copied ? (
								<Check className="size-3.5" />
							) : (
								<Clipboard className="size-3.5" />
							)}
						</button>
					)}
				</div>
			</div>

			{/* ── Code area ───────────────────────────────────────────── */}
			<div
				className={cn(
					"transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
					collapsed && "max-h-0 opacity-0",
				)}
				style={collapsed ? { maxHeight: 0 } : undefined}
			>
				<div
					ref={scrollRef}
					className={cn(
						"overflow-auto relative",
						wordWrap &&
							"[&_pre]:whitespace-pre-wrap! [&_code]:whitespace-pre-wrap! [&_.line]:whitespace-pre-wrap!",
					)}
					style={collapsed ? undefined : { maxHeight }}
				>
					{/*
					  Strip ALL Fumadocs / Shiki default container styles so the
					  highlighted code fits seamlessly inside our shell.
					  We force transparent backgrounds, remove margins/borders/
					  shadows/rounding from <figure> and <pre>, and forcefully
					  hide any Fumadocs-rendered copy button or figcaption
					  (in case allowCopy wasn't set to false on the consumer).
					*/}
					<div
						className={cn(
							// figure overrides
							"[&_figure]:bg-transparent! [&_figure]:m-0! [&_figure]:rounded-none!",
							"[&_figure]:border-0! [&_figure]:shadow-none!",
							// pre overrides
							"[&_pre]:bg-transparent! [&_pre]:m-0! [&_pre]:rounded-none!",
							"[&_pre]:border-0! [&_pre]:shadow-none!",
							// Hide ALL buttons inside the figure (Fumadocs copy button).
							// Fumadocs renders the copy button either as a direct child
							// of figure (when no title) or nested inside a div (when
							// title is present). This catches both cases.
							"[&_figure_button]:hidden!",
							// Hide the figcaption title bar from Fumadocs
							"[&_figure>div:first-child:has(figcaption)]:hidden!",
							// Also hide any absolutely-positioned button overlay
							// (Fumadocs copy button without title uses absolute pos)
							"[&_figure>.absolute]:hidden!",
							// code block text styling
							"[&_pre]:text-[13px]! [&_pre]:leading-relaxed!",
						)}
					>
						{children}
					</div>
				</div>

				{/* Bottom gradient fade when content overflows */}
				{isOverflowing && !collapsed && (
					<div
						className="pointer-events-none absolute bottom-0 inset-x-0 h-12 bg-linear-to-t from-fd-background to-transparent"
						aria-hidden="true"
					/>
				)}
			</div>

			{/* ── Collapsed bar ────────────────────────────────────────── */}
			{collapsed && (
				<button
					type="button"
					onClick={() => setCollapsed(false)}
					className={cn(
						"w-full flex items-center justify-center gap-1.5",
						"py-2.5 text-[11px] font-mono cursor-pointer",
						"text-fd-muted-foreground/50 hover:text-fd-muted-foreground hover:bg-fd-muted/50",
						"transition-colors duration-150",
					)}
				>
					<ChevronDown className="size-3" />
					<span>Show {lineCount} lines</span>
				</button>
			)}
		</div>
	);
}

VSCodeCodeBlock.displayName = "VSCodeCodeBlock";
