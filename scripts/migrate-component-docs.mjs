#!/usr/bin/env node

/**
 * migrate-component-docs.mjs
 *
 * Automates the migration of component MDX documentation pages from the old
 * <ComponentPage> / ## Import pattern to the new Button-style pattern:
 *
 *   1. ## Basic          — <PreviewCard> with full copy-pasteable code
 *   2. ## Installation   — CLI install with npm/pnpm/yarn/bun tabs
 *   3. ## Or install the full package — npm package with tabs
 *   4. ## Anatomy        — Import statement + JSX usage snippet
 *   5. All <ComponentPage .../> blocks → <PreviewCard .../> blocks
 *   6. Remove wrapping </ComponentPage> closing tags
 *
 * Usage:
 *   node scripts/migrate-component-docs.mjs                  # Dry-run all
 *   node scripts/migrate-component-docs.mjs --write          # Write all
 *   node scripts/migrate-component-docs.mjs --file alert.mdx # Single file dry-run
 *   node scripts/migrate-component-docs.mjs --file alert.mdx --write
 *   node scripts/migrate-component-docs.mjs --file alert.mdx --diff  # Show diff
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, basename } from "node:path";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const CONTENT_DIR = join(
	import.meta.dirname ?? ".",
	"..",
	"content",
	"components",
);
const COMPONENTS_SRC = join(
	import.meta.dirname ?? ".",
	"..",
	"packages",
	"unified-ui",
	"src",
	"components",
);

const SKIP_FILES = new Set(["index.mdx", "button.mdx"]);

const args = process.argv.slice(2);
const WRITE = args.includes("--write");
const DIFF = args.includes("--diff");
const SINGLE_FILE = (() => {
	const idx = args.indexOf("--file");
	return idx !== -1 ? args[idx + 1] : null;
})();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Kebab-case filename → CLI name (e.g. "alert-dialog.mdx" → "alert-dialog") */
function cliName(filename) {
	return filename.replace(/\.mdx$/, "");
}

/** Kebab-case → PascalCase (e.g. "alert-dialog" → "AlertDialog") */
function toPascal(kebab) {
	return kebab
		.split("-")
		.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
		.join("");
}

/**
 * Extract the primary component import names from the file's import block.
 * Returns an array like ["Alert"] or ["Dialog", "DialogTrigger", ...].
 */
function extractComponentImports(content) {
	const imports = [];
	// Match: import { X, Y, Z } from "@work-rjkashyap/unified-ui"
	const re =
		/import\s*\{([^}]+)\}\s*from\s*["']@work-rjkashyap\/unified-ui["']/g;
	let m;
	while ((m = re.exec(content)) !== null) {
		const names = m[1]
			.split(",")
			.map((s) => s.trim())
			.filter(Boolean);
		imports.push(...names);
	}
	return imports;
}

/**
 * Detect whether the file already has Tab/Tabs imports.
 */
function hasTabsImport(content) {
	return (
		/import\s*\{[^}]*\bTab\b[^}]*\bTabs\b[^}]*\}\s*from\s*["']fumadocs-ui\/components\/tabs["']/.test(
			content,
		) ||
		/import\s*\{[^}]*\bTabs\b[^}]*\bTab\b[^}]*\}\s*from\s*["']fumadocs-ui\/components\/tabs["']/.test(
			content,
		)
	);
}

/**
 * Detect whether the file already has Callout import.
 */
function hasCalloutImport(content) {
	return /import\s*\{[^}]*\bCallout\b[^}]*\}\s*from\s*["']fumadocs-ui\/components\/callout["']/.test(
		content,
	);
}

/**
 * Build the installation block for a component.
 */
function buildInstallationBlock(componentCliName) {
	return `## Installation

Install the component via the CLI in one command.

<Tabs items={['npm', 'pnpm', 'yarn', 'bun']}>
<Tab value="npm">

\`\`\`bash
npx @work-rjkashyap/unified-ui add ${componentCliName}
\`\`\`

</Tab>
<Tab value="pnpm">

\`\`\`bash
pnpm dlx @work-rjkashyap/unified-ui add ${componentCliName}
\`\`\`

</Tab>
<Tab value="yarn">

\`\`\`bash
npx @work-rjkashyap/unified-ui add ${componentCliName}
\`\`\`

</Tab>
<Tab value="bun">

\`\`\`bash
bunx @work-rjkashyap/unified-ui add ${componentCliName}
\`\`\`

</Tab>
</Tabs>

<Callout type="info">
\tIf you haven't initialized your project yet, run \`npx @work-rjkashyap/unified-ui init\` first. See the [CLI docs](/docs/cli) for details.
</Callout>

## Or install the full package

Use this approach if you prefer to install the entire design system as a dependency instead of copying individual components.

<Tabs items={['npm', 'pnpm', 'yarn', 'bun']}>
<Tab value="npm">

\`\`\`bash
npm install @work-rjkashyap/unified-ui
\`\`\`

</Tab>
<Tab value="pnpm">

\`\`\`bash
pnpm add @work-rjkashyap/unified-ui
\`\`\`

</Tab>
<Tab value="yarn">

\`\`\`bash
yarn add @work-rjkashyap/unified-ui
\`\`\`

</Tab>
<Tab value="bun">

\`\`\`bash
bun add @work-rjkashyap/unified-ui
\`\`\`

</Tab>
</Tabs>`;
}

/**
 * Build the anatomy block from the extracted import names.
 * Filters out non-component names (e.g. plain "type", "// or") and deduplicates.
 */
function buildAnatomyBlock(importNames, importSource) {
	// Deduplicate and filter out junk tokens
	const clean = [
		...new Set(
			importNames.filter(
				(n) =>
					n &&
					/^[A-Z]/.test(n) && // must start with uppercase (React component)
					!n.startsWith("//") &&
					!n.startsWith("type "),
			),
		),
	];

	if (clean.length === 0) return "";

	const importStatement =
		clean.length === 1
			? `import { ${clean[0]} } from "${importSource}";`
			: `import {\n${clean.map((n) => `\t${n},`).join("\n")}\n} from "${importSource}";`;

	return `## Anatomy

\`\`\`tsx
${importStatement}
\`\`\``;
}

// ---------------------------------------------------------------------------
// Main transform: Convert a single ComponentPage block → PreviewCard
// ---------------------------------------------------------------------------

/**
 * Convert a <ComponentPage ... /> (self-closing) to <PreviewCard ... />.
 * Also handles <ComponentPage ...>...</ComponentPage> wrapping pattern.
 */
function replaceComponentPageBlocks(content) {
	// Replace self-closing <ComponentPage ... /> → <PreviewCard ... />
	// We need to handle multi-line JSX carefully.
	// Strategy: find <ComponentPage, read until matching />
	let result = content;

	// Step 1: Replace self-closing ComponentPage tags
	// Match the opening <ComponentPage and find the self-closing />
	result = replaceTagSelfClosing(result, "ComponentPage", "PreviewCard");

	return result;
}

/**
 * Replace all instances of <OldTag .../> or <OldTag ...> with <NewTag .../> / <NewTag ...>.
 * Uses the brace-depth-aware parser to correctly find tag boundaries even when
 * props contain complex JSX expressions, template literals, etc.
 */
function replaceTagSelfClosing(content, oldTag, newTag) {
	const openPattern = `<${oldTag}`;
	let result = "";
	let cursor = 0;

	while (cursor < content.length) {
		const idx = content.indexOf(openPattern, cursor);
		if (idx === -1) {
			result += content.slice(cursor);
			break;
		}

		// Make sure this is actually a tag start and not a substring
		// (e.g. <ComponentPageFoo should not match <ComponentPage)
		const charAfter = content[idx + openPattern.length];
		if (charAfter && /[a-zA-Z0-9_]/.test(charAfter)) {
			result += content.slice(cursor, idx + openPattern.length);
			cursor = idx + openPattern.length;
			continue;
		}

		result += content.slice(cursor, idx);

		const tagInfo = findJSXOpenTagEnd(content, idx);
		if (!tagInfo) {
			// Couldn't parse — leave as-is
			result += content.slice(idx, idx + openPattern.length);
			cursor = idx + openPattern.length;
			continue;
		}

		const tagContent = content.slice(idx, tagInfo.end);
		const replaced = `<${newTag}` + tagContent.slice(openPattern.length);
		result += stripTitleDescription(replaced);
		cursor = tagInfo.end;
	}

	return result;
}

/**
 * Remove title="..." and description="..." props from a PreviewCard tag string.
 * These are not used by PreviewCard (which only takes preview + code).
 */
function stripTitleDescription(tagStr) {
	// Remove title={...} or title="..."
	let result = tagStr;

	// Remove title="..." (simple string)
	result = result.replace(/\s+title="[^"]*"/g, "");
	// Remove title={'...'} or title={`...`}
	result = result.replace(/\s+title=\{['"`][^'"`]*['"`]\}/g, "");

	// Remove description="..." (simple string)
	result = result.replace(/\s+description="[^"]*"/g, "");
	// Remove multi-line description="..."
	result = result.replace(/\s+description="[^"]*"/gs, "");
	// Remove description={'...'} or description={`...`}
	result = result.replace(/\s+description=\{['"`][^'"`]*['"`]\}/g, "");

	return result;
}

/**
 * Replace </ComponentPage> closing tags with nothing (or with a section break).
 * Only removes the standalone closing tag on its own line.
 */
function removeClosingComponentPage(content) {
	return content.replace(/^\s*<\/ComponentPage>\s*$/gm, "");
}

// ---------------------------------------------------------------------------
// Brace-depth-aware JSX tag parser
// ---------------------------------------------------------------------------

/**
 * Starting from `startIdx` (which points at the `<` of a JSX tag), find the
 * end of the opening tag.  Returns `{ end, selfClosing }` where `end` is the
 * index **after** the closing `>` or `/>`.
 *
 * Strategy:
 *   At brace depth 0 we are in "JSX tag attribute" context where `"` and `'`
 *   are attribute value delimiters (e.g. title="Hello").
 *
 *   At brace depth ≥ 1 we are inside a JSX expression (`prop={...}`).
 *   Inside expressions we ONLY track template-literal backticks, because the
 *   expression values are JSX/TSX — they contain `<Tag attr="...">text</Tag>`
 *   where quotes are part of JSX attribute syntax and apostrophes appear in
 *   free text.  Trying to track `"` / `'` as JS strings inside JSX content
 *   is unreliable and causes the parser to lose sync.  Template literals
 *   (used by the `code` prop) are the only string-like construct that can
 *   contain unbalanced `{` / `}` characters, so we must track those.
 */
function findJSXOpenTagEnd(content, startIdx) {
	let i = startIdx + 1; // skip the leading `<`
	let braceDepth = 0;

	// --- state only active at brace depth 0 (tag attributes) ---
	let inAttrString = false;
	let attrStringChar = "";

	// --- state only active at brace depth ≥ 1 (JSX expressions) ---
	let inTemplateLiteral = false;
	let templateBraceDepth = 0; // tracks `${...}` inside template literals

	while (i < content.length) {
		const ch = content[i];
		const prev = i > 0 ? content[i - 1] : "";

		// =============================================================
		// 1) Inside a tag-attribute string (depth 0): title="..."
		// =============================================================
		if (inAttrString) {
			if (ch === attrStringChar) {
				inAttrString = false;
			}
			i++;
			continue;
		}

		// =============================================================
		// 2) Inside a template literal (depth ≥ 1): code={`...`}
		// =============================================================
		if (inTemplateLiteral) {
			if (ch === "`" && prev !== "\\") {
				inTemplateLiteral = false;
			} else if (
				ch === "$" &&
				i + 1 < content.length &&
				content[i + 1] === "{"
			) {
				// entering ${...} inside template literal
				templateBraceDepth++;
				i += 2;
				continue;
			} else if (templateBraceDepth > 0 && ch === "}") {
				templateBraceDepth--;
			}
			i++;
			continue;
		}

		// =============================================================
		// 3) Brace depth tracking
		// =============================================================
		if (ch === "{") {
			braceDepth++;
			i++;
			continue;
		}
		if (ch === "}") {
			braceDepth--;
			i++;
			continue;
		}

		// =============================================================
		// 4) Inside a JSX expression (depth ≥ 1)
		//    Only track template literals — ignore " and ' because they
		//    appear in JSX attribute values AND in free text (apostrophes).
		// =============================================================
		if (braceDepth > 0) {
			if (ch === "`") {
				inTemplateLiteral = true;
			}
			i++;
			continue;
		}

		// =============================================================
		// 5) At depth 0 — tag attribute context
		// =============================================================
		if (ch === '"' || ch === "'") {
			inAttrString = true;
			attrStringChar = ch;
			i++;
			continue;
		}

		if (ch === "/" && i + 1 < content.length && content[i + 1] === ">") {
			return { end: i + 2, selfClosing: true };
		}
		if (ch === ">") {
			return { end: i + 1, selfClosing: false };
		}

		i++;
	}

	return null; // could not find end
}

// ---------------------------------------------------------------------------
// Top-level ComponentPage wrapper transformation
// ---------------------------------------------------------------------------

/**
 * Detect and transform the top-level <ComponentPage ... > wrapper pattern.
 *
 * The old pattern is:
 *   <ComponentPage title="..." description="..." preview={...} code={`...`}>
 *   ## Import
 *   ...import code...
 *   ## Section
 *   ...
 *   </ComponentPage>
 *
 * The new pattern is:
 *   ## Basic
 *   <description>
 *   <PreviewCard preview={...} code={`...`} />
 *   ## Installation
 *   ...
 *   ## Anatomy
 *   ...
 *   ## Section
 *   ...
 */
function transformTopLevelWrapper(content, componentCliName, importNames) {
	// Find the first <ComponentPage in the file
	const tagStart = content.indexOf("<ComponentPage");
	if (tagStart === -1) return content;

	// Use the brace-depth parser to find where the opening tag actually ends
	const tagInfo = findJSXOpenTagEnd(content, tagStart);
	if (!tagInfo) return content;

	// We only care about the wrapping pattern (opening tag, not self-closing)
	if (tagInfo.selfClosing) return content;

	const openTag = content.slice(tagStart, tagInfo.end);

	// Verify that ## Import follows somewhere after this opening tag
	const afterOpen = content.slice(tagInfo.end);
	const importSectionMatch = afterOpen.match(/^([\s\S]*?)(## Import\b)/m);
	if (!importSectionMatch) return content;

	// --- Extract description from the opening tag props ---
	// Try description="..." (may span props in the tag)
	const descMatch = openTag.match(/description=["']([^"']+)["']/);
	// Also try description={"..."} or description={`...`}
	const descMatch2 = openTag.match(/description=\{["'`]([^"'`]+)["'`]\}/);
	const description = descMatch
		? descMatch[1]
		: descMatch2
			? descMatch2[1]
			: null;

	// --- Build the PreviewCard self-closing tag ---
	// Take the full opening tag, swap the name, strip title/description, make self-closing
	let previewCardTag = openTag.replace(/^<ComponentPage/, "<PreviewCard");
	// Remove the trailing >  and replace with />
	previewCardTag = previewCardTag.replace(/>\s*$/, "\n/>");
	previewCardTag = stripTitleDescription(previewCardTag);

	// --- Locate the ## Import section boundaries ---
	const importStart =
		tagInfo.end + importSectionMatch.index + importSectionMatch[1].length;

	const fromImport = content.slice(importStart);
	const nextSectionMatch = fromImport.match(/\n(## (?!Import\b))/m);
	const importSectionEnd = nextSectionMatch
		? importStart + nextSectionMatch.index
		: importStart + fromImport.length;

	const importSectionContent = content.slice(importStart, importSectionEnd);

	// Extract import code blocks from the Import section
	const importCodeBlocks = [];
	const codeBlockRe = /```tsx\n([\s\S]*?)```/g;
	let cbm;
	while ((cbm = codeBlockRe.exec(importSectionContent)) !== null) {
		importCodeBlocks.push(cbm[1].trim());
	}

	// --- Assemble the replacement ---
	let basicSection = "## Basic\n\n";
	if (description) {
		basicSection += `${description}\n\n`;
	}
	basicSection += previewCardTag;

	const installBlock = buildInstallationBlock(componentCliName);

	const anatomyBlock = buildAnatomyBlock(
		importNames.length > 0
			? importNames
			: extractImportNamesFromCodeBlocks(importCodeBlocks),
		"@work-rjkashyap/unified-ui",
	);

	const replacement =
		basicSection + "\n\n" + installBlock + "\n\n" + anatomyBlock;

	const before = content.slice(0, tagStart);
	const after = content.slice(importSectionEnd);

	return before + replacement + "\n" + after;
}

/**
 * Extract component names from import code blocks found in the ## Import section.
 * Deduplicates and filters out comments / type-only imports.
 */
function extractImportNamesFromCodeBlocks(codeBlocks) {
	const names = [];
	for (const block of codeBlocks) {
		// Match all import { ... } statements in the block (there may be multiple)
		const re = /import\s*\{([^}]+)\}/g;
		let m;
		while ((m = re.exec(block)) !== null) {
			const parts = m[1]
				.split(",")
				.map((s) => s.trim())
				.filter(
					(s) =>
						s &&
						!s.startsWith("//") &&
						!s.startsWith("type ") &&
						!s.startsWith("*"),
				);
			names.push(...parts);
		}
	}
	// Deduplicate while preserving order
	return [...new Set(names)];
}

// ---------------------------------------------------------------------------
// For non-wrapping pattern (e.g. Input)
// Transform ## Import section into Installation + Anatomy
// ---------------------------------------------------------------------------

function transformImportSection(content, componentCliName) {
	// Find ## Import section
	const importMatch = content.match(/(^|\n)(## Import\b[^\n]*\n)/m);
	if (!importMatch) return content;

	const importStart = importMatch.index + (importMatch[1] ? 1 : 0);
	const fromImport = content.slice(importStart);

	// Find the next ## heading
	const nextSection = fromImport.match(/\n(## (?!Import\b))/m);
	const importEnd = nextSection
		? importStart + nextSection.index
		: importStart + fromImport.length;

	const importSection = content.slice(importStart, importEnd);

	// Extract code blocks for anatomy
	const codeBlocks = [];
	const codeBlockRe = /```tsx\n([\s\S]*?)```/g;
	let m;
	while ((m = codeBlockRe.exec(importSection)) !== null) {
		codeBlocks.push(m[1].trim());
	}

	const importNames = extractImportNamesFromCodeBlocks(codeBlocks);

	// Extract any Callout blocks in the import section to preserve them
	const calloutRe = /(<Callout[\s\S]*?<\/Callout>)/g;
	const callouts = [];
	let cm;
	while ((cm = calloutRe.exec(importSection)) !== null) {
		callouts.push(cm[1]);
	}

	// Build replacement
	const installBlock = buildInstallationBlock(componentCliName);
	const anatomyBlock = buildAnatomyBlock(
		importNames,
		"@work-rjkashyap/unified-ui",
	);

	let replacement = installBlock + "\n\n" + anatomyBlock;

	if (callouts.length > 0) {
		replacement += "\n\n" + callouts.join("\n\n");
	}

	const before = content.slice(0, importStart);
	const after = content.slice(importEnd);

	return before + replacement + "\n" + after;
}

// ---------------------------------------------------------------------------
// Ensure required imports
// ---------------------------------------------------------------------------

/**
 * Find the end position of the top-level import block in the file.
 * Handles multi-line imports like:
 *   import {
 *     Foo,
 *     Bar,
 *   } from "...";
 *
 * Returns the character index right after the last import statement ends
 * (including its trailing newline if present).
 */
function findImportBlockEnd(content) {
	// Find the end of frontmatter first
	const fmEnd = content.indexOf("---", 4);
	if (fmEnd === -1) return -1;
	const searchStart = fmEnd + 3;

	// Walk through lines after frontmatter looking for import statements
	const afterFm = content.slice(searchStart);
	const lines = afterFm.split("\n");

	let lastImportEndOffset = -1;
	let inImport = false;

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const trimmed = line.trim();

		if (inImport) {
			// We're inside a multi-line import, look for the closing line
			// A line containing `from "..."` or `from '...'` ends the import
			if (/from\s+["']/.test(trimmed)) {
				inImport = false;
				lastImportEndOffset =
					searchStart + lines.slice(0, i + 1).join("\n").length;
			}
			continue;
		}

		if (trimmed.startsWith("import ") || trimmed.startsWith("import\t")) {
			// Check if it's a single-line or multi-line import
			if (/from\s+["']/.test(trimmed) && trimmed.endsWith(";")) {
				// Single-line import
				lastImportEndOffset =
					searchStart + lines.slice(0, i + 1).join("\n").length;
			} else if (/from\s+["']/.test(trimmed)) {
				// Single-line import without semicolon (valid in JS)
				lastImportEndOffset =
					searchStart + lines.slice(0, i + 1).join("\n").length;
			} else {
				// Multi-line import starts
				inImport = true;
			}
			continue;
		}

		// Skip blank lines between imports
		if (trimmed === "" && lastImportEndOffset !== -1) {
			continue;
		}

		// Non-import, non-blank line — stop
		if (trimmed !== "") {
			break;
		}
	}

	return lastImportEndOffset;
}

function ensureImports(content) {
	let result = content;

	// Add Tabs/Tab import if not present
	if (!hasTabsImport(result)) {
		const insertPos = findImportBlockEnd(result);
		if (insertPos !== -1) {
			result =
				result.slice(0, insertPos) +
				'\nimport { Tab, Tabs } from "fumadocs-ui/components/tabs";' +
				result.slice(insertPos);
		} else {
			// No imports found — add after frontmatter
			const fmEnd = result.indexOf("---", 4);
			if (fmEnd !== -1) {
				const pos = fmEnd + 3;
				result =
					result.slice(0, pos) +
					'\n\nimport { Tab, Tabs } from "fumadocs-ui/components/tabs";' +
					result.slice(pos);
			}
		}
	}

	// Add Callout import if not present
	if (!hasCalloutImport(result)) {
		const insertPos = findImportBlockEnd(result);
		if (insertPos !== -1) {
			result =
				result.slice(0, insertPos) +
				'\nimport { Callout } from "fumadocs-ui/components/callout";' +
				result.slice(insertPos);
		}
	}

	return result;
}

// ---------------------------------------------------------------------------
// Handle the non-wrapper ComponentPage-with-## Import pattern
// (e.g., Input: has ## Import section and standalone <ComponentPage> blocks)
// ---------------------------------------------------------------------------

function transformNonWrapperPattern(content, componentCliName) {
	// Check: does file have ## Import but NOT a wrapping ComponentPage (no </ComponentPage>)
	const hasImport = /^## Import\b/m.test(content);
	if (!hasImport) return content;

	// Check if there's a wrapping ComponentPage (has </ComponentPage>)
	const hasClosing = /<\/ComponentPage>/.test(content);
	if (hasClosing) return content; // Will be handled by transformTopLevelWrapper

	return transformImportSection(content, componentCliName);
}

// ---------------------------------------------------------------------------
// Handle adding ## Basic before the first <PreviewCard (if not already there)
// ---------------------------------------------------------------------------

function ensureBasicHeading(content) {
	// If there's already a ## Basic heading, skip
	if (/^## Basic\b/m.test(content)) return content;

	// Find the first <PreviewCard or <ComponentPage after the imports
	// Look for the first occurrence that's at the top of the content area
	// (i.e., not inside a ## section)

	// Find where frontmatter + imports end and content begins
	const fmEnd = content.indexOf("---", 4);
	if (fmEnd === -1) return content;

	const afterFm = content.slice(fmEnd + 3);

	// Skip past all import statements
	const lines = afterFm.split("\n");
	let contentStartLine = 0;
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();
		if (
			line === "" ||
			line.startsWith("import ") ||
			line.startsWith("} from") ||
			line.startsWith('"') ||
			line.startsWith("'") ||
			/^\t[A-Z]/.test(lines[i]) || // continuation of multi-line import
			/^\t[a-z]/.test(lines[i])
		) {
			contentStartLine = i + 1;
			continue;
		}
		break;
	}

	// Check if the first non-import content is a <PreviewCard or <ComponentPage
	const restLines = lines.slice(contentStartLine);
	const restContent = restLines.join("\n").trimStart();

	if (
		restContent.startsWith("<PreviewCard") ||
		restContent.startsWith("<ComponentPage")
	) {
		// Need to add a ## Basic heading before it
		// But only if there's no heading before it
		const firstHeading = restContent.match(/^(##\s+\w)/m);
		const firstTag = restContent.match(/^<(PreviewCard|ComponentPage)/m);

		if (
			firstTag &&
			(!firstHeading || firstTag.index < firstHeading.index)
		) {
			const insertOffset =
				fmEnd + 3 + lines.slice(0, contentStartLine).join("\n").length;
			const before = content.slice(0, insertOffset);
			const after = content.slice(insertOffset);

			return before + "\n\n## Basic\n" + after;
		}
	}

	return content;
}

// ---------------------------------------------------------------------------
// Clean up: remove excess blank lines
// ---------------------------------------------------------------------------

function cleanupBlankLines(content) {
	// Replace 3+ consecutive blank lines with 2
	return content.replace(/\n{4,}/g, "\n\n\n");
}

// ---------------------------------------------------------------------------
// Main migration for a single file
// ---------------------------------------------------------------------------

function migrateFile(filepath) {
	const filename = basename(filepath);
	const name = cliName(filename);
	const original = readFileSync(filepath, "utf-8");
	let content = original;

	// Step 0: Extract component import names before any transformation
	const componentImportNames = extractComponentImports(content);

	// Step 1: Handle wrapping <ComponentPage> → ## Basic + <PreviewCard> + Installation
	const hasClosingTag = /<\/ComponentPage>/.test(content);
	if (hasClosingTag) {
		content = transformTopLevelWrapper(content, name, componentImportNames);
		content = removeClosingComponentPage(content);
	}

	// Step 2: Handle non-wrapping pattern with ## Import
	content = transformNonWrapperPattern(content, name);

	// Step 3: Replace all remaining <ComponentPage> blocks with <PreviewCard>
	content = replaceComponentPageBlocks(content);

	// Step 4: Ensure ## Basic heading exists
	content = ensureBasicHeading(content);

	// Step 5: Ensure required imports (Tabs, Tab, Callout)
	content = ensureImports(content);

	// Step 6: Clean up formatting
	content = cleanupBlankLines(content);

	// Check if anything changed
	const changed = content !== original;

	return { original, content, changed, filename };
}

// ---------------------------------------------------------------------------
// Simple diff utility (since node:util.diffLines may not exist)
// ---------------------------------------------------------------------------

function simpleDiff(a, b) {
	const aLines = a.split("\n");
	const bLines = b.split("\n");
	const output = [];

	let ai = 0;
	let bi = 0;

	while (ai < aLines.length || bi < bLines.length) {
		if (
			ai < aLines.length &&
			bi < bLines.length &&
			aLines[ai] === bLines[bi]
		) {
			ai++;
			bi++;
			continue;
		}

		// Find next matching line
		let foundA = -1;
		let foundB = -1;

		for (let look = 1; look < 20; look++) {
			if (
				foundA === -1 &&
				bi + look < bLines.length &&
				aLines[ai] === bLines[bi + look]
			) {
				foundA = bi + look;
			}
			if (
				foundB === -1 &&
				ai + look < aLines.length &&
				aLines[ai + look] === bLines[bi]
			) {
				foundB = ai + look;
			}
		}

		if (foundA !== -1 && (foundB === -1 || foundA - bi <= foundB - ai)) {
			// Lines were added in b
			while (bi < foundA) {
				output.push(`\x1b[32m+ ${bLines[bi]}\x1b[0m`);
				bi++;
			}
		} else if (foundB !== -1) {
			// Lines were removed from a
			while (ai < foundB) {
				output.push(`\x1b[31m- ${aLines[ai]}\x1b[0m`);
				ai++;
			}
		} else {
			// Changed line
			if (ai < aLines.length) {
				output.push(`\x1b[31m- ${aLines[ai]}\x1b[0m`);
				ai++;
			}
			if (bi < bLines.length) {
				output.push(`\x1b[32m+ ${bLines[bi]}\x1b[0m`);
				bi++;
			}
		}
	}

	return output.join("\n");
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

function main() {
	const files = SINGLE_FILE
		? [join(CONTENT_DIR, SINGLE_FILE)]
		: readdirSync(CONTENT_DIR)
				.filter((f) => f.endsWith(".mdx") && !SKIP_FILES.has(f))
				.sort()
				.map((f) => join(CONTENT_DIR, f));

	let totalChanged = 0;
	let totalSkipped = 0;
	let totalErrors = 0;

	const results = [];

	for (const filepath of files) {
		const filename = basename(filepath);

		if (!existsSync(filepath)) {
			console.error(`❌ File not found: ${filepath}`);
			totalErrors++;
			continue;
		}

		try {
			const { original, content, changed } = migrateFile(filepath);

			if (changed) {
				totalChanged++;
				results.push({ filename, status: "changed" });

				if (WRITE) {
					writeFileSync(filepath, content, "utf-8");
					console.log(`✅ ${filename} — updated`);
				} else if (DIFF) {
					console.log(`\n${"=".repeat(60)}`);
					console.log(`📝 ${filename}`);
					console.log("=".repeat(60));
					console.log(simpleDiff(original, content));
				} else {
					console.log(`📝 ${filename} — would change (dry-run)`);
				}
			} else {
				totalSkipped++;
				results.push({ filename, status: "unchanged" });
				if (!SINGLE_FILE) {
					console.log(`⏭️  ${filename} — no changes needed`);
				} else {
					console.log(
						`⏭️  ${filename} — no changes needed (already migrated or no patterns found)`,
					);
				}
			}
		} catch (err) {
			totalErrors++;
			results.push({ filename, status: "error", error: err.message });
			console.error(`❌ ${filename} — error: ${err.message}`);
			if (SINGLE_FILE) {
				console.error(err.stack);
			}
		}
	}

	console.log("\n" + "─".repeat(50));
	console.log(`📊 Migration Summary`);
	console.log(`   Changed:  ${totalChanged}`);
	console.log(`   Skipped:  ${totalSkipped}`);
	console.log(`   Errors:   ${totalErrors}`);
	console.log(`   Total:    ${files.length}`);

	if (!WRITE && totalChanged > 0) {
		console.log(`\n💡 Run with --write to apply changes.`);
	}

	// Update the tracking file
	if (WRITE && totalChanged > 0) {
		updateTrackingFile(results);
	}
}

// ---------------------------------------------------------------------------
// Update COMPONENT-MIGRATION-STATUS.md
// ---------------------------------------------------------------------------

function updateTrackingFile(results) {
	const trackingPath = join(
		import.meta.dirname ?? ".",
		"..",
		"COMPONENT-MIGRATION-STATUS.md",
	);

	if (!existsSync(trackingPath)) {
		console.log("⚠️  Tracking file not found, skipping status update.");
		return;
	}

	let tracking = readFileSync(trackingPath, "utf-8");

	for (const { filename, status } of results) {
		if (status !== "changed") continue;

		const name = cliName(filename);
		// Replace ⬜ with ✅ for this component
		// Match patterns like: | 40 | Alert | `alert.mdx` | ⬜ |
		const escapedFilename = filename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const re = new RegExp(
			`(\\|[^|]*\\|[^|]*\\|\\s*\`${escapedFilename}\`\\s*\\|\\s*)⬜(\\s*\\|)`,
		);
		tracking = tracking.replace(re, "$1✅$2");
	}

	// Update counts
	const completedCount =
		(tracking.match(/\| ✅ \|/g) || []).length +
		(tracking.match(/✅/g) || []).length;

	const today = new Date().toISOString().slice(0, 10);
	const changedNames = results
		.filter((r) => r.status === "changed")
		.map((r) => `\`${r.filename}\``)
		.join(", ");

	// Add changelog entry
	if (changedNames) {
		tracking = tracking.replace(
			/(\| \| \| \|)/,
			`| ${today} | ${changedNames} | Automated migration via script |\n$1`,
		);
	}

	writeFileSync(trackingPath, tracking, "utf-8");
	console.log("📋 Updated COMPONENT-MIGRATION-STATUS.md");
}

main();
