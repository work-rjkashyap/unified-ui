import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cn } from "@/lib/cn";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ChangelogEntry {
	version: string;
	date: string | null;
	isUnreleased: boolean;
	sections: ChangelogSection[];
}

interface ChangelogSection {
	title: string; // e.g. "Added", "Fixed", "Changed"
	subsections: ChangelogSubsection[];
	items: string[];
}

interface ChangelogSubsection {
	title: string;
	items: string[];
}

// ---------------------------------------------------------------------------
// Parser — reads the real CHANGELOG.md and parses it into structured data
// ---------------------------------------------------------------------------

function parseChangelog(raw: string): ChangelogEntry[] {
	const entries: ChangelogEntry[] = [];
	let currentEntry: ChangelogEntry | null = null;
	let currentSection: ChangelogSection | null = null;
	let currentSubsection: ChangelogSubsection | null = null;

	const lines = raw.split("\n");

	for (const line of lines) {
		// Match version heading: ## [0.2.1] — 2026-03-06 or ## [Unreleased]
		const versionMatch = line.match(/^## \[([^\]]+)\](?:\s*—\s*(.+))?/);
		if (versionMatch) {
			currentSection = null;
			currentSubsection = null;
			currentEntry = {
				version: versionMatch[1],
				date: versionMatch[2]?.trim() || null,
				isUnreleased: versionMatch[1].toLowerCase() === "unreleased",
				sections: [],
			};
			entries.push(currentEntry);
			continue;
		}

		if (!currentEntry) continue;

		// Match section heading: ### Added, ### Fixed, ### Changed, ### Planned
		const sectionMatch = line.match(/^### (.+)/);
		if (sectionMatch) {
			currentSubsection = null;
			currentSection = {
				title: sectionMatch[1].trim(),
				subsections: [],
				items: [],
			};
			currentEntry.sections.push(currentSection);
			continue;
		}

		if (!currentSection) continue;

		// Match subsection heading: #### 40 New Components
		const subMatch = line.match(/^#### (.+)/);
		if (subMatch) {
			currentSubsection = {
				title: subMatch[1].trim(),
				items: [],
			};
			currentSection.subsections.push(currentSubsection);
			continue;
		}

		// Match list items: - **Something** — description
		const itemMatch = line.match(/^- (.+)/);
		if (itemMatch) {
			const text = itemMatch[1].trim();
			if (currentSubsection) {
				currentSubsection.items.push(text);
			} else {
				currentSection.items.push(text);
			}
		}
	}

	return entries;
}

// ---------------------------------------------------------------------------
// Badge helpers
// ---------------------------------------------------------------------------

const sectionColors: Record<string, { bg: string; text: string; dot: string }> =
	{
		Added: {
			bg: "bg-green-500/10 dark:bg-green-500/15",
			text: "text-green-700 dark:text-green-400",
			dot: "bg-green-500",
		},
		Fixed: {
			bg: "bg-blue-500/10 dark:bg-blue-500/15",
			text: "text-blue-700 dark:text-blue-400",
			dot: "bg-blue-500",
		},
		Changed: {
			bg: "bg-amber-500/10 dark:bg-amber-500/15",
			text: "text-amber-700 dark:text-amber-400",
			dot: "bg-amber-500",
		},
		Planned: {
			bg: "bg-purple-500/10 dark:bg-purple-500/15",
			text: "text-purple-700 dark:text-purple-400",
			dot: "bg-purple-500",
		},
		Deprecated: {
			bg: "bg-red-500/10 dark:bg-red-500/15",
			text: "text-red-700 dark:text-red-400",
			dot: "bg-red-500",
		},
		Removed: {
			bg: "bg-red-500/10 dark:bg-red-500/15",
			text: "text-red-700 dark:text-red-400",
			dot: "bg-red-500",
		},
		Security: {
			bg: "bg-rose-500/10 dark:bg-rose-500/15",
			text: "text-rose-700 dark:text-rose-400",
			dot: "bg-rose-500",
		},
	};

const defaultColor = {
	bg: "bg-fd-muted/50",
	text: "text-fd-muted-foreground",
	dot: "bg-fd-muted-foreground",
};

function getSectionColor(title: string) {
	return sectionColors[title] ?? defaultColor;
}

// ---------------------------------------------------------------------------
// Render helpers
// ---------------------------------------------------------------------------

/** Parse **bold** and `code` in a changelog item string into JSX */
function renderInlineMarkdown(text: string) {
	const parts: (string | React.ReactElement)[] = [];
	// Combined regex for **bold**, `code`, and [links](url)
	const regex = /\*\*(.+?)\*\*|`(.+?)`|\[(.+?)\]\((.+?)\)/g;
	let lastIndex = 0;
	let match: RegExpExecArray | null;
	let key = 0;

	match = regex.exec(text);
	while (match !== null) {
		if (match.index > lastIndex) {
			parts.push(text.slice(lastIndex, match.index));
		}

		if (match[1]) {
			// Bold
			parts.push(
				<strong
					key={key++}
					className="font-semibold text-fd-foreground"
				>
					{match[1]}
				</strong>,
			);
		} else if (match[2]) {
			// Inline code
			parts.push(
				<code
					key={key++}
					className="text-[0.9em] font-mono bg-fd-muted/60 px-1.5 py-0.5 rounded-md text-fd-foreground"
				>
					{match[2]}
				</code>,
			);
		} else if (match[3] && match[4]) {
			// Link
			parts.push(
				<a
					key={key++}
					href={match[4]}
					target={match[4].startsWith("http") ? "_blank" : undefined}
					rel={
						match[4].startsWith("http")
							? "noopener noreferrer"
							: undefined
					}
					className="font-medium text-fd-primary underline underline-offset-2 decoration-fd-primary/30 hover:decoration-fd-primary/60 transition-colors"
				>
					{match[3]}
				</a>,
			);
		}

		lastIndex = match.index + match[0].length;
		match = regex.exec(text);
	}

	if (lastIndex < text.length) {
		parts.push(text.slice(lastIndex));
	}

	return parts;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SectionBadge({ title }: { title: string }) {
	const color = getSectionColor(title);
	return (
		<span
			className={cn(
				"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider",
				color.bg,
				color.text,
			)}
		>
			<span className={cn("w-1.5 h-1.5 rounded-full", color.dot)} />
			{title}
		</span>
	);
}

function ChangelogItem({ text }: { text: string }) {
	return (
		<li className="relative pl-5 text-sm leading-7 text-fd-muted-foreground before:absolute before:left-0 before:top-[13px] before:h-1.5 before:w-1.5 before:rounded-full before:bg-fd-border">
			{renderInlineMarkdown(text)}
		</li>
	);
}

function ChangelogSectionBlock({ section }: { section: ChangelogSection }) {
	return (
		<div className="space-y-3">
			<SectionBadge title={section.title} />

			{/* Direct items (no subsection) */}
			{section.items.length > 0 && (
				<ul className="space-y-1.5 ml-0.5">
					{section.items.map((item, i) => (
						<ChangelogItem key={i} text={item} />
					))}
				</ul>
			)}

			{/* Subsections */}
			{section.subsections.map((sub, i) => (
				<div key={i} className="space-y-2">
					<h4 className="text-sm font-semibold text-fd-foreground/80 pl-0.5">
						{sub.title}
					</h4>
					<ul className="space-y-1.5 ml-0.5">
						{sub.items.map((item, j) => (
							<ChangelogItem key={j} text={item} />
						))}
					</ul>
				</div>
			))}
		</div>
	);
}

function VersionEntry({
	entry,
	isLatest,
}: {
	entry: ChangelogEntry;
	isLatest: boolean;
}) {
	return (
		<div className="relative grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-10">
			{/* Left: version + date (sticky on desktop) */}
			<div className="md:sticky md:top-24 self-start space-y-2">
				<span
					className={cn(
						"inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold border",
						entry.isUnreleased
							? "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20"
							: isLatest
								? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
								: "bg-fd-muted/50 text-fd-foreground border-fd-border",
					)}
				>
					{entry.isUnreleased ? "Unreleased" : `v${entry.version}`}
				</span>

				{entry.date && (
					<p className="text-xs text-fd-muted-foreground font-medium pl-0.5">
						{formatDate(entry.date)}
					</p>
				)}

				{isLatest && !entry.isUnreleased && (
					<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-green-500/10 text-green-600 dark:text-green-400">
						<span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
						Latest
					</span>
				)}
			</div>

			{/* Right: sections */}
			<div className="space-y-8 pb-10 border-b border-fd-border/40 last:border-b-0">
				{entry.sections.map((section, i) => (
					<ChangelogSectionBlock key={i} section={section} />
				))}
			</div>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Date formatting
// ---------------------------------------------------------------------------

function formatDate(dateStr: string): string {
	try {
		const date = new Date(dateStr);
		if (Number.isNaN(date.getTime())) return dateStr;
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	} catch {
		return dateStr;
	}
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

function ChangelogStats({ entries }: { entries: ChangelogEntry[] }) {
	const releases = entries.filter((e) => !e.isUnreleased);
	const totalFeatures = entries.reduce((acc, e) => {
		for (const s of e.sections) {
			if (s.title === "Added" || s.title === "Planned") {
				acc += s.items.length;
				for (const sub of s.subsections) {
					acc += sub.items.length;
				}
			}
		}
		return acc;
	}, 0);
	const totalFixes = entries.reduce((acc, e) => {
		for (const s of e.sections) {
			if (s.title === "Fixed") {
				acc += s.items.length;
				for (const sub of s.subsections) {
					acc += sub.items.length;
				}
			}
		}
		return acc;
	}, 0);

	const stats = [
		{ label: "Releases", value: releases.length.toString() },
		{ label: "Features", value: totalFeatures.toString() },
		{ label: "Bug Fixes", value: totalFixes.toString() },
		{
			label: "Latest",
			value: releases[0] ? `v${releases[0].version}` : "—",
		},
	];

	return (
		<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
			{stats.map((stat) => (
				<div
					key={stat.label}
					className="rounded-xl border border-fd-border bg-fd-card/40 px-4 py-3 text-center"
				>
					<div className="text-2xl font-bold tracking-tight text-fd-foreground">
						{stat.value}
					</div>
					<div className="text-xs font-medium text-fd-muted-foreground uppercase tracking-wider mt-0.5">
						{stat.label}
					</div>
				</div>
			))}
		</div>
	);
}

// ---------------------------------------------------------------------------
// Main component (Server Component — reads file at build time)
// ---------------------------------------------------------------------------

export function ChangelogRenderer() {
	const changelogPath = join(
		process.cwd(),
		"packages",
		"unified-ui",
		"CHANGELOG.md",
	);

	let raw: string;
	try {
		raw = readFileSync(changelogPath, "utf-8");
	} catch {
		return (
			<div className="rounded-xl border border-fd-border bg-fd-card/40 p-8 text-center">
				<p className="text-fd-muted-foreground">
					Could not load changelog. Run{" "}
					<code className="text-sm font-mono bg-fd-muted/60 px-1.5 py-0.5 rounded-md">
						npm run build:ds
					</code>{" "}
					to generate it.
				</p>
			</div>
		);
	}

	const entries = parseChangelog(raw);

	if (entries.length === 0) {
		return (
			<div className="rounded-xl border border-fd-border bg-fd-card/40 p-8 text-center">
				<p className="text-fd-muted-foreground">
					No changelog entries found.
				</p>
			</div>
		);
	}

	// Find first non-unreleased entry to mark as "latest"
	const firstReleasedIndex = entries.findIndex((e) => !e.isUnreleased);

	return (
		<div>
			<ChangelogStats entries={entries} />

			<div className="space-y-10">
				{entries.map((entry, i) => (
					<VersionEntry
						key={entry.version}
						entry={entry}
						isLatest={i === firstReleasedIndex}
					/>
				))}
			</div>

			{/* Footer */}
			<div className="mt-12 pt-6 border-t border-fd-border/40 text-center">
				<p className="text-sm text-fd-muted-foreground">
					This changelog is auto-generated from{" "}
					<a
						href="https://github.com/imrj05/unified-ui/blob/main/packages/unified-ui/CHANGELOG.md"
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium text-fd-primary underline underline-offset-2 decoration-fd-primary/30 hover:decoration-fd-primary/60 transition-colors"
					>
						packages/unified-ui/CHANGELOG.md
					</a>{" "}
					using{" "}
					<a
						href="https://www.conventionalcommits.org"
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium text-fd-primary underline underline-offset-2 decoration-fd-primary/30 hover:decoration-fd-primary/60 transition-colors"
					>
						Conventional Commits
					</a>
					.
				</p>
			</div>
		</div>
	);
}
