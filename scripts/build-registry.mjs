#!/usr/bin/env node
// ============================================================================
// Unified UI — Registry Build Script
// ============================================================================
// Reads component source files from packages/unified-ui/src/ and generates
// a registry of JSON items at public/r/<name>.json for each component,
// plus a registry index at public/r/index.json.
//
// Usage:
//   node scripts/build-registry.mjs
//
// The generated registry powers:
//   - `npx unified-ui add <component>` CLI
//   - Copy-paste from the docs site UI
//   - /r/<name>.json API served by Next.js from public/
//
// Schema (Unified UI Registry — NOT shadcn):
//   See registry-schema.md for the full spec.
// ============================================================================
import {
	readFileSync,
	writeFileSync,
	mkdirSync,
	existsSync,
	readdirSync,
} from "node:fs";
import { join, basename, extname } from "node:path";
// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const ROOT = new URL("..", import.meta.url).pathname;
const DS_PKG = JSON.parse(
	readFileSync(join(ROOT, "packages/unified-ui/package.json"), "utf-8"),
);
const DS_SRC = join(ROOT, "packages/unified-ui/src");
const COMPONENTS_DIR = join(DS_SRC, "components");
const UTILS_DIR = join(DS_SRC, "utils");
const MOTION_DIR = join(DS_SRC, "motion");
const TOKENS_DIR = join(DS_SRC, "tokens");
const THEME_DIR = join(DS_SRC, "theme");
const PRIMITIVES_DIR = join(DS_SRC, "primitives");
const OUTPUT_DIR = join(ROOT, "public/r");
const STYLES_PATH = join(ROOT, "packages/unified-ui/styles.css");
// ---------------------------------------------------------------------------
// Registry schema version
// ---------------------------------------------------------------------------
const SCHEMA_VERSION = "1.0.0";
const REGISTRY_NAME = "unified-ui";
const REGISTRY_HOMEPAGE = "https://unified-ui-rajeshwar.vercel.app";
// ---------------------------------------------------------------------------
// Dependency maps
// ---------------------------------------------------------------------------
// These define the npm packages required by each internal import pattern.
// When a component imports from e.g. "class-variance-authority", that
// package is listed as a dependency in the registry item.
// ---------------------------------------------------------------------------
const NPM_DEPENDENCY_MAP = {
	"class-variance-authority": "class-variance-authority",
	clsx: "clsx",
	"tailwind-merge": "tailwind-merge",
	"framer-motion": "framer-motion",
	"radix-ui": "radix-ui",
	"react-resizable-panels": "react-resizable-panels",
	sonner: "sonner",
	vaul: "vaul",
	"@tanstack/react-table": "@tanstack/react-table",
	recharts: "recharts",
};
// ---------------------------------------------------------------------------
// Internal dependency categories
// ---------------------------------------------------------------------------
const INTERNAL_FILE_CATEGORIES = {
	"utils/cn": { type: "utils", name: "cn" },
	"utils/focus-ring": { type: "utils", name: "focus-ring" },
	"utils/contrast": { type: "utils", name: "contrast" },
	"utils/types": { type: "utils", name: "types" },
	motion: { type: "motion", name: "motion" },
};
// ---------------------------------------------------------------------------
// Component metadata overrides
// ---------------------------------------------------------------------------
// Some components need manual metadata because it can't be inferred from
// the source file alone.
// ---------------------------------------------------------------------------
const COMPONENT_META = {
	accordion: {
		title: "Accordion",
		description: "Collapsible sections with single/multiple expand modes.",
		category: "navigation",
	},
	"alert-dialog": {
		title: "Alert Dialog",
		description:
			"Blocking confirmation dialog that requires explicit user action.",
		category: "overlay",
		status: "updated",
		sinceVersion: "0.3.0",
	},
	alert: {
		title: "Alert",
		description:
			"5 semantic variants with auto icons, dismissible, collapsible, animated entrance.",
		category: "feedback",
	},
	"aspect-ratio": {
		title: "Aspect Ratio",
		description: "Constrains child content to a given aspect ratio.",
		category: "layout",
	},
	avatar: {
		title: "Avatar",
		description:
			"Image with fallback, initials, status dot, and group stacking.",
		category: "data-display",
	},
	badge: {
		title: "Badge",
		description:
			"8 semantic variants, dot indicator, avatar/icon slots, removable.",
		category: "data-display",
	},
	banner: {
		title: "Banner",
		description:
			"Full-width dismissible announcement banner with slide animation.",
		category: "feedback",
	},
	breadcrumb: {
		title: "Breadcrumb",
		description:
			"Navigation trail with separator, ellipsis, and custom items.",
		category: "navigation",
	},
	button: {
		title: "Button",
		description:
			"4 variants, 3 sizes, loading state, icon support, polymorphic rendering.",
		category: "form",
	},
	calendar: {
		title: "Calendar",
		description:
			"Month/year grid calendar with single and range selection.",
		category: "form",
	},
	card: {
		title: "Card",
		description:
			"4 variants including interactive, with header/body/footer slots.",
		category: "data-display",
	},
	carousel: {
		title: "Carousel",
		description:
			"Horizontal/vertical carousel with animated slides, arrows, dots, and autoplay.",
		category: "data-display",
	},
	chart: {
		title: "Chart",
		description: "Card wrapper for Recharts with design system theming.",
		category: "data-display",
	},
	checkbox: {
		title: "Checkbox",
		description:
			"Checkbox with label, description, indeterminate, and group support.",
		category: "form",
	},
	code: {
		title: "Code",
		description:
			"Inline code and code block with copy button, line numbers, and syntax highlighting.",
		category: "data-display",
	},
	collapsible: {
		title: "Collapsible",
		description:
			"Animated show/hide section with smooth height transitions.",
		category: "navigation",
	},
	"color-picker": {
		title: "Color Picker",
		description:
			"Color selection with spectrum picker, hue slider, HEX input, and presets.",
		category: "form",
		status: "updated",
		sinceVersion: "0.3.0",
	},
	combobox: {
		title: "Combobox",
		description:
			"Searchable select with single and multi-select, grouped options.",
		category: "form",
	},
	command: {
		title: "Command",
		description:
			"Command palette with fuzzy search, groups, and keyboard navigation.",
		category: "navigation",
		status: "updated",
		sinceVersion: "0.3.0",
	},
	"confirm-dialog": {
		title: "Confirm Dialog",
		description:
			"Pre-composed confirmation dialog with danger variant and loading state.",
		category: "overlay",
	},
	"context-menu": {
		title: "Context Menu",
		description: "Right-click context menu with nested submenus.",
		category: "overlay",
	},
	"copy-button": {
		title: "Copy Button",
		description: "Click-to-copy icon button with animated check feedback.",
		category: "feedback",
	},
	"data-list": {
		title: "Data List",
		description:
			"Semantic key-value pair list with horizontal/vertical layouts.",
		category: "data-display",
	},
	"data-table-toolbar": {
		title: "Data Table Toolbar",
		description:
			"Filtering, sorting, column visibility toolbar for DataTable.",
		category: "data-display",
		status: "updated",
		sinceVersion: "0.3.0",
	},
	"data-table": {
		title: "Data Table",
		description:
			"Full-featured table with TanStack Table: sorting, filtering, pagination.",
		category: "data-display",
	},
	"date-picker": {
		title: "Date Picker",
		description:
			"Date or date-range input with calendar popover and locale formatting.",
		category: "form",
	},
	dialog: {
		title: "Dialog",
		description:
			"Modal dialog with 4 sizes, focus trap, and slot composition.",
		category: "overlay",
		status: "updated",
		sinceVersion: "0.3.0",
	},
	drawer: {
		title: "Drawer",
		description:
			"Bottom drawer with drag-to-dismiss interaction. Built on vaul.",
		category: "overlay",
	},
	"dropdown-menu": {
		title: "Dropdown Menu",
		description:
			"Context menu with items, checkboxes, radios, and submenus.",
		category: "overlay",
	},
	"empty-state": {
		title: "Empty State",
		description:
			"Placeholder for empty lists with animated icon, title, and CTA.",
		category: "feedback",
	},
	"file-upload": {
		title: "File Upload",
		description:
			"Drag-and-drop file upload zone with file list and progress.",
		category: "form",
	},
	"form-field": {
		title: "Form Field",
		description:
			"Composable field wrapper: label + control + description + error.",
		category: "form",
	},
	"hover-card": {
		title: "Hover Card",
		description: "Rich preview card on hover with spring animation.",
		category: "overlay",
	},
	"image-gallery": {
		title: "Image Gallery",
		description: "Responsive image grid with interactive lightbox viewer.",
		category: "data-display",
	},
	"infinite-scroll": {
		title: "Infinite Scroll",
		description:
			"Scroll-triggered infinite loading with Intersection Observer.",
		category: "navigation",
	},
	"input-group": {
		title: "Input Group",
		description: "Composed input with prefix/suffix icons and text addons.",
		category: "form",
		status: "updated",
		sinceVersion: "0.3.0",
	},
	input: {
		title: "Input",
		description:
			"Text input with icons, clearable, error/success validation states.",
		category: "form",
	},
	kbd: {
		title: "Kbd",
		description:
			"Keyboard shortcut display in a styled monospaced element.",
		category: "data-display",
	},
	label: {
		title: "Label",
		description:
			"Accessible label with required indicator and description text.",
		category: "form",
	},
	markdown: {
		title: "Markdown",
		description:
			"Renders markdown strings into styled HTML with prose styling.",
		category: "data-display",
	},
	menubar: {
		title: "Menubar",
		description: "Desktop application-style menubar with nested menus.",
		category: "navigation",
	},
	"navigation-menu": {
		title: "Navigation Menu",
		description: "Accessible top-level navigation with dropdown panels.",
		category: "navigation",
	},
	"number-input": {
		title: "Number Input",
		description:
			"Numeric stepper with +/− buttons, keyboard nav, min/max clamping.",
		category: "form",
	},
	pagination: {
		title: "Pagination",
		description: "Page navigation with smart ellipsis and compact variant.",
		category: "navigation",
	},
	"pin-input": {
		title: "Pin Input",
		description: "OTP/PIN code input with auto-advance and paste support.",
		category: "form",
	},
	popover: {
		title: "Popover",
		description: "Floating content panel with arrow and close button.",
		category: "overlay",
	},
	progress: {
		title: "Progress",
		description:
			"Linear progress bar with indeterminate, striped, and labeled variants.",
		category: "feedback",
	},
	radio: {
		title: "Radio",
		description: "Radio group with standard and card variants.",
		category: "form",
	},
	resizable: {
		title: "Resizable",
		description: "Resizable split panels with drag handle.",
		category: "layout",
	},
	"scroll-area": {
		title: "Scroll Area",
		description:
			"Custom scrollbar container for consistent cross-browser appearance.",
		category: "navigation",
	},
	"search-input": {
		title: "Search Input",
		description:
			"Search field with debounce, clear button, and keyboard shortcut hint.",
		category: "form",
	},
	select: {
		title: "Select",
		description:
			"Dropdown select with groups, labels, and keyboard navigation.",
		category: "form",
	},
	sheet: {
		title: "Sheet",
		description: "Slide-out panel from any edge with size options.",
		category: "overlay",
		status: "updated",
		sinceVersion: "0.3.0",
	},
	sidebar: {
		title: "Sidebar",
		description:
			"Collapsible app sidebar with sections, icons, and mobile overlay.",
		category: "navigation",
		status: "updated",
		sinceVersion: "0.3.0",
	},
	skeleton: {
		title: "Skeleton",
		description: "Loading placeholders in text, circle, and rect shapes.",
		category: "feedback",
	},
	slider: {
		title: "Slider",
		description:
			"Range slider with single/dual thumb, step marks, and tooltip.",
		category: "form",
	},
	sonner: {
		title: "Sonner",
		description: "Stacked toast system with promise/loading states.",
		category: "feedback",
	},
	spinner: {
		title: "Spinner",
		description:
			"Animated loading spinner with 4 sizes and reduced-motion support.",
		category: "feedback",
	},
	stat: {
		title: "Stat",
		description:
			"KPI card with animated count-up value and trend indicator.",
		category: "data-display",
	},
	steps: {
		title: "Steps",
		description:
			"Step indicator for multi-stage flows with active/completed states.",
		category: "navigation",
	},
	switch: {
		title: "Switch",
		description: "Toggle switch with spring animation and label support.",
		category: "form",
		status: "updated",
		sinceVersion: "0.3.0",
	},
	table: {
		title: "Table",
		description: "Data table with sorting, density options, and alignment.",
		category: "data-display",
	},
	tabs: {
		title: "Tabs",
		description:
			"3 visual variants with animated indicator and vertical support.",
		category: "navigation",
	},
	textarea: {
		title: "Textarea",
		description: "Multi-line input with auto-resize and character count.",
		category: "form",
		status: "updated",
		sinceVersion: "0.3.0",
	},
	"theme-toggle": {
		title: "Theme Toggle",
		description:
			"Light/dark/system mode switcher with icon and segmented variants.",
		category: "utility",
	},
	timeline: {
		title: "Timeline",
		description:
			"Vertical timeline with icons, status colors, and stagger animations.",
		category: "data-display",
	},
	toast: {
		title: "Toast",
		description:
			"Stackable notifications with 5 positions and action support.",
		category: "feedback",
	},
	"toggle-group": {
		title: "Toggle Group",
		description: "Single or multi-select group of toggle buttons.",
		category: "form",
	},
	toggle: {
		title: "Toggle",
		description: "Pressable on/off button for toolbar actions.",
		category: "form",
	},
	tooltip: {
		title: "Tooltip",
		description:
			"Lightweight info popup with arrow, delay, and 4-side placement.",
		category: "feedback",
	},
	"tree-view": {
		title: "Tree View",
		description:
			"Expandable tree structure with checkable nodes and keyboard nav.",
		category: "navigation",
	},
	"video-player": {
		title: "Video Player",
		description:
			"Styled video with custom controls, poster image, and keyboard shortcuts.",
		category: "data-display",
	},
	"virtual-list": {
		title: "Virtual List",
		description:
			"Virtualized list that only renders visible items for performance.",
		category: "layout",
	},
	"visually-hidden": {
		title: "Visually Hidden",
		description: "Screen-reader-only content wrapper.",
		category: "utility",
	},
	separator: {
		title: "Separator",
		description:
			"Visual divider with horizontal/vertical orientation, label support, and gradient variant.",
		category: "layout",
		status: "new",
		sinceVersion: "0.3.0",
	},
};
// ---------------------------------------------------------------------------
// Cross-component internal dependency map
// ---------------------------------------------------------------------------
// When component A imports from component B (e.g. confirm-dialog imports
// alert-dialog), that's a registryDependency — the user also needs B.
// ---------------------------------------------------------------------------
const COMPONENT_DEPENDENCY_MAP = {
	"alert-dialog": ["button"],
	"confirm-dialog": ["alert-dialog", "button"],
	combobox: ["badge"],
	command: ["dialog", "input"],
	"context-menu": ["dropdown-menu"],
	"copy-button": ["button", "tooltip"],
	"data-table": ["table", "button", "checkbox", "select", "badge"],
	"data-table-toolbar": ["input", "button", "select", "badge", "data-table"],
	"date-picker": ["calendar", "popover", "button", "input"],
	drawer: ["sheet"],
	"dropdown-menu": [],
	"file-upload": ["button", "progress", "badge"],
	"form-field": ["label"],
	"hover-card": [],
	"image-gallery": ["button"],
	"infinite-scroll": ["spinner"],
	"input-group": ["input", "button"],
	menubar: ["dropdown-menu"],
	"navigation-menu": [],
	"number-input": ["input", "button"],
	"pin-input": ["input"],
	"search-input": ["input", "kbd"],
	sidebar: ["sheet", "button", "tooltip"],
	sonner: [],
	"theme-toggle": ["button"],
	"toggle-group": ["toggle"],
};
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
/**
 * Read a source file and return its content.
 */
function readSource(filePath) {
	try {
		return readFileSync(filePath, "utf-8");
	} catch {
		return null;
	}
}
/**
 * Extract npm dependencies from import statements in source code.
 */
function extractNpmDeps(source) {
	const deps = new Set();
	const importRegex = /from\s+["']([^"'./][^"']*)["']/g;
	let match;
	while ((match = importRegex.exec(source)) !== null) {
		const pkg = match[1];
		// Get the package name (handle scoped packages)
		const pkgName = pkg.startsWith("@")
			? pkg.split("/").slice(0, 2).join("/")
			: pkg.split("/")[0];
		if (NPM_DEPENDENCY_MAP[pkgName]) {
			deps.add(NPM_DEPENDENCY_MAP[pkgName]);
		}
	}
	return [...deps];
}
/**
 * Extract internal unified-ui dependencies from import statements.
 * Returns which util/motion files are needed.
 */
function extractInternalDeps(source) {
	const deps = {
		utils: new Set(),
		motion: false,
	};
	// Match @unified-ui/* imports
	const internalRegex = /from\s+["']@unified-ui\/([^"']+)["']/g;
	let match;
	while ((match = internalRegex.exec(source)) !== null) {
		const path = match[1];
		if (path.startsWith("utils/")) {
			deps.utils.add(path.replace("utils/", ""));
		}
		if (path.startsWith("motion") || path === "motion") {
			deps.motion = true;
		}
	}
	return {
		utils: [...deps.utils],
		motion: deps.motion,
	};
}
/**
 * Detect if the file has "use client" directive.
 */
function isClientComponent(source) {
	return /^["']use client["'];?\s*$/m.test(source);
}
/**
 * Extract exported symbol names from a source file.
 */
function extractExports(source) {
	const exports = [];
	// Match: export const/function/class Name
	const namedRegex = /export\s+(?:const|function|class)\s+(\w+)/g;
	let match;
	while ((match = namedRegex.exec(source)) !== null) {
		exports.push(match[1]);
	}
	// Match: export { Name, Name2 }
	const braceRegex = /export\s*\{([^}]+)\}/g;
	while ((match = braceRegex.exec(source)) !== null) {
		const names = match[1].split(",").map((s) =>
			s
				.trim()
				.split(/\s+as\s+/)
				.pop()
				.trim(),
		);
		exports.push(...names.filter(Boolean));
	}
	// Match: export type { Name }
	const typeRegex = /export\s+type\s*\{([^}]+)\}/g;
	while ((match = typeRegex.exec(source)) !== null) {
		const names = match[1].split(",").map((s) =>
			s
				.trim()
				.split(/\s+as\s+/)
				.pop()
				.trim(),
		);
		exports.push(...names.filter(Boolean));
	}
	// Match: export type Name =
	const singleTypeRegex = /export\s+type\s+(\w+)\s*=/g;
	while ((match = singleTypeRegex.exec(source)) !== null) {
		exports.push(match[1]);
	}
	// Match: export interface Name
	const interfaceRegex = /export\s+interface\s+(\w+)/g;
	while ((match = interfaceRegex.exec(source)) !== null) {
		exports.push(match[1]);
	}
	return [...new Set(exports)];
}
/**
 * Rewrite @unified-ui/* imports to local project paths.
 * e.g. @unified-ui/utils/cn -> @/lib/cn
 *      @unified-ui/utils/focus-ring -> @/lib/focus-ring
 *      @unified-ui/motion -> @/lib/motion
 *      Component cross-imports stay as local: ./button
 */
function rewriteImports(source) {
	let result = source;
	// Rewrite @unified-ui/utils/* -> @/lib/*
	result = result.replace(
		/from\s+["']@unified-ui\/utils\/([^"']+)["']/g,
		'from "@/lib/$1"',
	);
	// Rewrite @unified-ui/motion/* or @unified-ui/motion -> @/lib/motion
	result = result.replace(
		/from\s+["']@unified-ui\/motion(?:\/([^"']+))?["']/g,
		(_, sub) =>
			sub ? `from "@/lib/motion/${sub}"` : `from "@/lib/motion"`,
	);
	// Rewrite @unified-ui/tokens/* -> @/lib/tokens/*
	result = result.replace(
		/from\s+["']@unified-ui\/tokens\/([^"']+)["']/g,
		'from "@/lib/tokens/$1"',
	);
	return result;
}
// ---------------------------------------------------------------------------
// Build a single registry item
// ---------------------------------------------------------------------------
function buildComponentItem(name) {
	const ext = ".tsx";
	const filePath = join(COMPONENTS_DIR, `${name}${ext}`);
	const source = readSource(filePath);
	if (!source) {
		console.warn(`  ⚠ Skipping ${name}: source file not found`);
		return null;
	}
	const meta = COMPONENT_META[name];
	if (!meta) {
		console.warn(`  ⚠ Skipping ${name}: no metadata defined`);
		return null;
	}
	const npmDeps = extractNpmDeps(source);
	const internalDeps = extractInternalDeps(source);
	const client = isClientComponent(source);
	const exports = extractExports(source);
	const crossDeps = COMPONENT_DEPENDENCY_MAP[name] || [];
	// Build the file list: the component itself + required utils
	const files = [
		{
			path: `components/ui/${name}${ext}`,
			content: rewriteImports(source),
			type: "component",
			target: `components/ui/${name}${ext}`,
		},
	];
	// Collect which utility files this component needs
	const requiredUtils = new Set(internalDeps.utils);
	// Also collect utils needed by cross-dependencies (transitive)
	// (We don't inline those here — they'll be resolved at install time)
	const item = {
		$schema: `${REGISTRY_HOMEPAGE}/schema/registry-item.json`,
		name,
		type: "unified-ui:component",
		title: meta.title,
		description: meta.description,
		category: meta.category,
		...(meta.status ? { status: meta.status } : {}),
		...(meta.sinceVersion ? { sinceVersion: meta.sinceVersion } : {}),
		client,
		exports,
		dependencies: npmDeps,
		registryDependencies: crossDeps,
		internalDependencies: {
			utils: [...requiredUtils],
			motion: internalDeps.motion,
		},
		files,
	};
	return item;
}
// ---------------------------------------------------------------------------
// Build utility items (cn, focus-ring, etc.)
// ---------------------------------------------------------------------------
function buildUtilItem(name) {
	const ext = ".ts";
	const filePath = join(UTILS_DIR, `${name}${ext}`);
	const source = readSource(filePath);
	if (!source) return null;
	const npmDeps = extractNpmDeps(source);
	const exports = extractExports(source);
	return {
		$schema: `${REGISTRY_HOMEPAGE}/schema/registry-item.json`,
		name,
		type: "unified-ui:util",
		title: name,
		description: `Unified UI utility: ${name}`,
		category: "utils",
		client: false,
		exports,
		dependencies: npmDeps,
		registryDependencies: [],
		internalDependencies: { utils: [], motion: false },
		files: [
			{
				path: `lib/${name}${ext}`,
				content: rewriteImports(source),
				type: "util",
				target: `lib/${name}${ext}`,
			},
		],
	};
}
// ---------------------------------------------------------------------------
// Build motion item
// ---------------------------------------------------------------------------
function buildMotionItem() {
	// Motion may have multiple files — read the index and any sub-files
	const indexPath = join(MOTION_DIR, "index.ts");
	const source = readSource(indexPath);
	if (!source) return null;
	// Check for sub-files
	const motionFiles = [];
	if (existsSync(MOTION_DIR)) {
		const entries = readdirSync(MOTION_DIR).filter(
			(f) => f.endsWith(".ts") || f.endsWith(".tsx"),
		);
		for (const entry of entries) {
			const filePath = join(MOTION_DIR, entry);
			const content = readSource(filePath);
			if (content) {
				motionFiles.push({
					path: `lib/motion/${entry}`,
					content: rewriteImports(content),
					type: "util",
					target: `lib/motion/${entry}`,
				});
			}
		}
	}
	if (motionFiles.length === 0) {
		motionFiles.push({
			path: "lib/motion.ts",
			content: rewriteImports(source),
			type: "util",
			target: "lib/motion.ts",
		});
	}
	const npmDeps = extractNpmDeps(source);
	return {
		$schema: `${REGISTRY_HOMEPAGE}/schema/registry-item.json`,
		name: "motion",
		type: "unified-ui:util",
		title: "Motion Presets",
		description:
			"Framer Motion animation presets — fadeIn, slideUp, scaleIn, stagger.",
		category: "motion",
		client: false,
		exports: extractExports(source),
		dependencies: npmDeps,
		registryDependencies: [],
		internalDependencies: { utils: [], motion: false },
		files: motionFiles,
	};
}
// ---------------------------------------------------------------------------
// Build the styles item
// ---------------------------------------------------------------------------
function buildStylesItem() {
	const source = readSource(STYLES_PATH);
	if (!source) return null;
	return {
		$schema: `${REGISTRY_HOMEPAGE}/schema/registry-item.json`,
		name: "styles",
		type: "unified-ui:styles",
		title: "Design System Styles",
		description:
			"CSS custom properties and Tailwind v4 theme integration for Unified UI.",
		category: "theme",
		client: false,
		exports: [],
		dependencies: [],
		registryDependencies: [],
		internalDependencies: { utils: [], motion: false },
		files: [
			{
				path: "styles/unified-ui.css",
				content: source,
				type: "styles",
				target: "styles/unified-ui.css",
			},
		],
	};
}
// ---------------------------------------------------------------------------
// Main build
// ---------------------------------------------------------------------------
function build() {
	console.log("🔧 Building Unified UI registry...\n");
	// Ensure output directory
	mkdirSync(OUTPUT_DIR, { recursive: true });
	const items = [];
	const errors = [];
	// 1. Build utility items
	console.log("  📦 Utils:");
	const utilFiles = readdirSync(UTILS_DIR).filter(
		(f) => f.endsWith(".ts") && f !== "index.ts",
	);
	for (const file of utilFiles) {
		const name = basename(file, extname(file));
		const item = buildUtilItem(name);
		if (item) {
			items.push(item);
			writeFileSync(
				join(OUTPUT_DIR, `${name}.json`),
				JSON.stringify(item, null, 2),
			);
			console.log(`     ✓ ${name}`);
		}
	}
	// 2. Build motion item
	console.log("\n  🎬 Motion:");
	const motionItem = buildMotionItem();
	if (motionItem) {
		items.push(motionItem);
		writeFileSync(
			join(OUTPUT_DIR, "motion.json"),
			JSON.stringify(motionItem, null, 2),
		);
		console.log("     ✓ motion");
	}
	// 3. Build styles item
	console.log("\n  🎨 Styles:");
	const stylesItem = buildStylesItem();
	if (stylesItem) {
		items.push(stylesItem);
		writeFileSync(
			join(OUTPUT_DIR, "styles.json"),
			JSON.stringify(stylesItem, null, 2),
		);
		console.log("     ✓ styles");
	}
	// 4. Build component items
	console.log("\n  🧩 Components:");
	const componentFiles = readdirSync(COMPONENTS_DIR).filter(
		(f) => f.endsWith(".tsx") && f !== "index.ts",
	);
	// Also skip code-highlight.ts (not a component)
	const skipFiles = new Set(["index.ts", "index.tsx", "code-highlight.ts"]);
	for (const file of componentFiles) {
		if (skipFiles.has(file)) continue;
		const name = basename(file, extname(file));
		const item = buildComponentItem(name);
		if (item) {
			items.push(item);
			writeFileSync(
				join(OUTPUT_DIR, `${name}.json`),
				JSON.stringify(item, null, 2),
			);
			console.log(`     ✓ ${name}`);
		} else {
			errors.push(name);
		}
	}
	// 5. Build the registry index
	const index = {
		$schema: `${REGISTRY_HOMEPAGE}/schema/registry.json`,
		version: SCHEMA_VERSION,
		packageVersion: DS_PKG.version,
		name: REGISTRY_NAME,
		homepage: REGISTRY_HOMEPAGE,
		repository: "https://github.com/imrj05/unified-ui",
		license: "MIT",
		totalItems: items.length,
		categories: [
			{ name: "form", label: "Form Controls" },
			{ name: "data-display", label: "Data Display" },
			{ name: "feedback", label: "Feedback" },
			{ name: "overlay", label: "Overlays & Dialogs" },
			{ name: "navigation", label: "Navigation" },
			{ name: "layout", label: "Layout" },
			{ name: "utility", label: "Utility" },
			{ name: "utils", label: "Internal Utils" },
			{ name: "motion", label: "Motion Presets" },
			{ name: "theme", label: "Theme & Styles" },
		],
		items: items.map((item) => ({
			name: item.name,
			type: item.type,
			title: item.title,
			description: item.description,
			category: item.category,
			...(item.status ? { status: item.status } : {}),
			...(item.sinceVersion ? { sinceVersion: item.sinceVersion } : {}),
			registryDependencies: item.registryDependencies,
			dependencies: item.dependencies,
		})),
	};
	writeFileSync(
		join(OUTPUT_DIR, "index.json"),
		JSON.stringify(index, null, 2),
	);
	// 6. Build the schema files for validation
	const registrySchema = {
		$id: `${REGISTRY_HOMEPAGE}/schema/registry.json`,
		type: "object",
		required: ["version", "name", "items"],
		properties: {
			$schema: { type: "string" },
			version: { type: "string", description: "Registry schema version" },
			name: { type: "string", description: "Registry name" },
			homepage: { type: "string", format: "uri" },
			repository: { type: "string", format: "uri" },
			license: { type: "string" },
			totalItems: { type: "integer" },
			categories: {
				type: "array",
				items: {
					type: "object",
					properties: {
						name: { type: "string" },
						label: { type: "string" },
					},
				},
			},
			items: {
				type: "array",
				items: { $ref: "#/$defs/indexItem" },
			},
		},
		$defs: {
			indexItem: {
				type: "object",
				required: ["name", "type", "title"],
				properties: {
					name: {
						type: "string",
						description: "Unique component identifier (kebab-case)",
					},
					type: {
						type: "string",
						enum: [
							"unified-ui:component",
							"unified-ui:util",
							"unified-ui:styles",
						],
						description: "Item type",
					},
					title: {
						type: "string",
						description: "Human-readable title",
					},
					description: { type: "string" },
					category: { type: "string" },
					status: {
						type: "string",
						enum: ["new", "updated"],
						description:
							"Indicates if the component is new or recently updated",
					},
					sinceVersion: {
						type: "string",
						description:
							"The version when the component was added or last significantly updated",
					},
					registryDependencies: {
						type: "array",
						items: { type: "string" },
						description: "Other registry items this depends on",
					},
					dependencies: {
						type: "array",
						items: { type: "string" },
						description: "npm packages required",
					},
				},
			},
		},
	};
	const registryItemSchema = {
		$id: `${REGISTRY_HOMEPAGE}/schema/registry-item.json`,
		type: "object",
		required: ["name", "type", "files"],
		properties: {
			$schema: { type: "string" },
			name: {
				type: "string",
				description: "Unique component identifier (kebab-case)",
			},
			type: {
				type: "string",
				enum: [
					"unified-ui:component",
					"unified-ui:util",
					"unified-ui:styles",
				],
			},
			title: { type: "string", description: "Human-readable title" },
			description: { type: "string" },
			category: {
				type: "string",
				enum: [
					"form",
					"data-display",
					"feedback",
					"overlay",
					"navigation",
					"layout",
					"utility",
					"utils",
					"motion",
					"theme",
				],
			},
			client: {
				type: "boolean",
				description: "Whether this is a 'use client' component",
			},
			status: {
				type: "string",
				enum: ["new", "updated"],
				description:
					"Indicates if the component is new or recently updated",
			},
			sinceVersion: {
				type: "string",
				description:
					"The version when the component was added or last significantly updated",
			},
			exports: {
				type: "array",
				items: { type: "string" },
				description: "Exported symbol names",
			},
			dependencies: {
				type: "array",
				items: { type: "string" },
				description:
					"npm packages required (e.g. framer-motion, radix-ui)",
			},
			registryDependencies: {
				type: "array",
				items: { type: "string" },
				description:
					"Other unified-ui registry items this depends on (by name)",
			},
			internalDependencies: {
				type: "object",
				properties: {
					utils: {
						type: "array",
						items: { type: "string" },
						description:
							"Required utility files (e.g. cn, focus-ring)",
					},
					motion: {
						type: "boolean",
						description: "Whether motion presets are required",
					},
				},
			},
			files: {
				type: "array",
				items: {
					type: "object",
					required: ["path", "type"],
					properties: {
						path: {
							type: "string",
							description: "File path relative to project root",
						},
						content: {
							type: "string",
							description: "Full file content",
						},
						type: {
							type: "string",
							enum: [
								"component",
								"util",
								"styles",
								"hook",
								"config",
							],
						},
						target: {
							type: "string",
							description:
								"Target path in the user's project (relative to src/)",
						},
					},
				},
			},
		},
	};
	// Write schemas
	const schemaDir = join(OUTPUT_DIR, "schema");
	mkdirSync(schemaDir, { recursive: true });
	writeFileSync(
		join(schemaDir, "registry.json"),
		JSON.stringify(registrySchema, null, 2),
	);
	writeFileSync(
		join(schemaDir, "registry-item.json"),
		JSON.stringify(registryItemSchema, null, 2),
	);
	// Summary
	console.log("\n" + "─".repeat(50));
	console.log(`✅ Registry built successfully!`);
	console.log(`   ${items.length} items → public/r/`);
	console.log(`   Index: public/r/index.json`);
	console.log(`   Schemas: public/r/schema/`);
	if (errors.length > 0) {
		console.log(`\n   ⚠ ${errors.length} skipped: ${errors.join(", ")}`);
	}
	console.log();
}
build();
