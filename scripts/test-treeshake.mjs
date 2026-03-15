#!/usr/bin/env node
// =============================================================================
// test-treeshake.mjs — Tree-shaking verification script
//
// Spins up a temporary Vite + rollup-plugin-visualizer app that imports only
// `Button` from @work-rjkashyap/unified-ui, builds it, prints the bundle size
// comparison (Button-only vs. all components), and opens stats.html.
//
// Usage (from repo root):
//   npm run test:treeshake
// =============================================================================

import { execSync, spawnSync } from "node:child_process";
import {
	cpSync,
	existsSync,
	mkdirSync,
	mkdtempSync,
	readFileSync,
	readdirSync,
	rmSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DS_DIST = join(ROOT, "packages", "unified-ui", "dist");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function log(msg) {
	console.log(`  ${msg}`);
}

function header(msg) {
	console.log(`\n${"─".repeat(60)}`);
	console.log(`  ${msg}`);
	console.log("─".repeat(60));
}

function bytes(n) {
	return (n / 1024).toFixed(1) + " KB";
}

function findJsFile(dir) {
	return readdirSync(dir)
		.filter((f) => f.endsWith(".js"))
		.map((f) => join(dir, f))[0];
}

function checkContent(filePath, checks) {
	const content = readFileSync(filePath, "utf8");
	const results = { present: [], absent: [], leaks: [] };

	for (const [label, key] of checks.mustExist) {
		if (content.includes(key)) results.present.push(label);
		else results.present.push(`${label} ✗ MISSING`);
	}

	for (const [label, key] of checks.mustAbsent) {
		if (content.includes(key)) results.leaks.push(label);
		else results.absent.push(label);
	}

	return results;
}

// ---------------------------------------------------------------------------
// Guard: ensure the design system has been built
// ---------------------------------------------------------------------------

if (!existsSync(DS_DIST) || !existsSync(join(DS_DIST, "components"))) {
	console.error("\n  ✘  dist/ not found. Run `npm run build:ds` first.\n");
	process.exit(1);
}

// ---------------------------------------------------------------------------
// Create temp workspace
// ---------------------------------------------------------------------------

header("Setting up temp workspace");

const tmpDir = mkdtempSync(join(tmpdir(), "unified-ui-treeshake-"));
log(`Temp dir: ${tmpDir}`);

// package.json
writeFileSync(
	join(tmpDir, "package.json"),
	JSON.stringify(
		{
			name: "treeshake-test",
			version: "0.0.0",
			private: true,
			type: "module",
			dependencies: {
				react: "^19.0.0",
				"react-dom": "^19.0.0",
			},
			devDependencies: {
				"@vitejs/plugin-react": "^4.3.4",
				"rollup-plugin-visualizer": "^5.12.0",
				vite: "^6.0.0",
			},
		},
		null,
		2,
	),
);

// Link the local design system package instead of installing from npm so the
// test always reflects the current build in dist/.
const dsPackageJson = JSON.parse(
	readFileSync(join(ROOT, "packages", "unified-ui", "package.json"), "utf8"),
);
const DS_NAME = dsPackageJson.name; // @work-rjkashyap/unified-ui

// index.html
writeFileSync(
	join(tmpDir, "index.html"),
	`<!doctype html>
<html lang="en">
  <head><meta charset="UTF-8" /><title>treeshake test</title></head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
);

// src/main.tsx  — imports ONLY Button
mkdirSync(join(tmpDir, "src"));
writeFileSync(
	join(tmpDir, "src", "main.tsx"),
	`import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "${DS_NAME}";

function App() {
  return <Button>Hello</Button>;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode><App /></StrictMode>
);`,
);

// src/main-all.tsx — imports every component
const allComponents = [
	"Accordion",
	"AccordionContent",
	"AccordionItem",
	"AccordionTrigger",
	"Alert",
	"AlertDialog",
	"AlertDialogAction",
	"AlertDialogCancel",
	"AlertDialogContent",
	"AlertDialogTrigger",
	"AspectRatio",
	"Avatar",
	"AvatarGroup",
	"Badge",
	"Banner",
	"Breadcrumb",
	"BreadcrumbItem",
	"BreadcrumbLink",
	"BreadcrumbList",
	"BreadcrumbNav",
	"Button",
	"Card",
	"CardBody",
	"CardFooter",
	"CardHeader",
	"Carousel",
	"Checkbox",
	"CheckboxGroup",
	"CodeBlock",
	"Collapsible",
	"CollapsibleContent",
	"CollapsibleTrigger",
	"Command",
	"CommandTrigger",
	"ConfirmDialog",
	"ContextMenu",
	"ContextMenuContent",
	"ContextMenuItem",
	"ContextMenuTrigger",
	"CopyButton",
	"DataList",
	"DataListDetail",
	"DataListTerm",
	"DatePicker",
	"Dialog",
	"DialogContent",
	"DialogDescription",
	"DialogFooter",
	"DialogHeader",
	"DialogTitle",
	"DialogTrigger",
	"Drawer",
	"DrawerContent",
	"DrawerTrigger",
	"DropdownMenu",
	"DropdownMenuContent",
	"DropdownMenuItem",
	"DropdownMenuTrigger",
	"EmptyState",
	"FileUpload",
	"FormField",
	"HoverCard",
	"HoverCardContent",
	"HoverCardTrigger",
	"ImageGallery",
	"InfiniteScroll",
	"Input",
	"InputGroup",
	"Kbd",
	"Label",
	"Menubar",
	"MenubarContent",
	"MenubarItem",
	"MenubarMenu",
	"MenubarTrigger",
	"NavigationMenu",
	"NavigationMenuContent",
	"NavigationMenuItem",
	"NavigationMenuList",
	"NavigationMenuTrigger",
	"NumberInput",
	"Pagination",
	"PinInput",
	"Popover",
	"PopoverContent",
	"PopoverTrigger",
	"Progress",
	"RadioGroup",
	"RadioGroupItem",
	"ResizableHandle",
	"ResizablePanel",
	"ResizablePanelGroup",
	"ScrollArea",
	"SearchInput",
	"Select",
	"SelectContent",
	"SelectItem",
	"SelectTrigger",
	"SelectValue",
	"Separator",
	"Sheet",
	"SheetContent",
	"SheetTrigger",
	"Skeleton",
	"SkeletonCircle",
	"SkeletonRect",
	"SkeletonText",
	"Slider",
	"SonnerToaster",
	"Spinner",
	"Stat",
	"Steps",
	"Switch",
	"Table",
	"TableBody",
	"TableCell",
	"TableHead",
	"TableHeader",
	"TableRow",
	"Tabs",
	"TabsContent",
	"TabsList",
	"TabsTrigger",
	"Tag",
	"Textarea",
	"ThemeToggle",
	"Timeline",
	"TimelineItem",
	"Toggle",
	"ToggleGroup",
	"ToggleGroupItem",
	"Tooltip",
	"TooltipProvider",
	"TreeView",
	"VideoPlayer",
	"VirtualList",
	"VisuallyHidden",
];

writeFileSync(
	join(tmpDir, "src", "main-all.tsx"),
	`import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
${allComponents.map((c) => `  ${c},`).join("\n")}
} from "${DS_NAME}";

function App() {
  return (
    <div>
      <Button>Button</Button>
      <Spinner />
      <Badge>Badge</Badge>
      <span style={{ display: "none" }}>{[${allComponents.filter((c) => c !== "Button" && c !== "Spinner" && c !== "Badge").join(",")}].length}</span>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode><App /></StrictMode>
);`,
);

// Shared Vite config factory written as a helper file
const sharedViteConfig = (entryFile, outDir, statsFile, title) => `
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "${statsFile}",
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: "treemap",
      title: "${title}",
    }),
  ],
  resolve: {
    alias: {
      "${DS_NAME}": "${DS_DIST.replace(/\\/g, "/")}",
    },
  },
  build: {
    outDir: "${outDir}",
    emptyOutDir: true,
    rollupOptions: {
      input: "${entryFile}",
      external: ["react", "react/jsx-runtime", "react-dom", "react-dom/client"],
      treeshake: { moduleSideEffects: (id) => id.endsWith(".css"), preset: "recommended" },
      output: {
        manualChunks: undefined,
        globals: {
          react: "React",
          "react/jsx-runtime": "ReactJSXRuntime",
          "react-dom": "ReactDOM",
          "react-dom/client": "ReactDOMClient",
        },
      },
    },
    minify: false,
  },
});
`;

writeFileSync(
	join(tmpDir, "vite.config.button.ts"),
	sharedViteConfig(
		`${tmpDir.replace(/\\/g, "/")}/src/main.tsx`,
		"dist-button",
		"dist-button/stats.html",
		"unified-ui — Button only",
	),
);

writeFileSync(
	join(tmpDir, "vite.config.all.ts"),
	sharedViteConfig(
		`${tmpDir.replace(/\\/g, "/")}/src/main-all.tsx`,
		"dist-all",
		"dist-all/stats.html",
		"unified-ui — All components",
	),
);

// ---------------------------------------------------------------------------
// Install deps
// ---------------------------------------------------------------------------

header("Installing dependencies");
execSync("npm install --silent", { cwd: tmpDir, stdio: "inherit" });

// ---------------------------------------------------------------------------
// Build: Button only
// ---------------------------------------------------------------------------

header("Building — Button only");
execSync(`npx vite build --config vite.config.button.ts`, {
	cwd: tmpDir,
	stdio: "inherit",
});

// ---------------------------------------------------------------------------
// Build: All components
// ---------------------------------------------------------------------------

header("Building — All components");
execSync(`npx vite build --config vite.config.all.ts`, {
	cwd: tmpDir,
	stdio: "inherit",
});

// ---------------------------------------------------------------------------
// Results
// ---------------------------------------------------------------------------

header("Results");

const buttonDist = join(tmpDir, "dist-button", "assets");
const allDist = join(tmpDir, "dist-all", "assets");

const buttonFile = findJsFile(buttonDist);
const allFile = findJsFile(allDist);

const buttonSize = statSync(buttonFile).size;
const allSize = statSync(allFile).size;
const savings = (((allSize - buttonSize) / allSize) * 100).toFixed(1);

console.log();
console.log(
	`  ${"Import".padEnd(26)} ${"Raw size".padStart(10)}   ${"Gzip (approx)".padStart(14)}`,
);
console.log(`  ${"─".repeat(56)}`);
console.log(
	`  ${"Button only".padEnd(26)} ${bytes(buttonSize).padStart(10)}   (react/react-dom excluded)`,
);
console.log(
	`  ${"All components".padEnd(26)} ${bytes(allSize).padStart(10)}   (react/react-dom excluded)`,
);
console.log(`  ${"─".repeat(56)}`);
console.log(`  Tree-shaking saves ${savings}% when importing only Button`);
console.log();

// ---------------------------------------------------------------------------
// Content checks
// ---------------------------------------------------------------------------

header("Content verification — Button-only bundle");

const checks = {
	mustExist: [
		["buttonVariants", "buttonVariants"],
		["focusRingClasses", "focusRingClasses"],
		["cva (class-variance-authority)", "cva"],
		["twMerge (tailwind-merge)", "twMerge"],
	],
	mustAbsent: [
		["accordionRootVariants", "accordionRootVariants"],
		["calendarDayVariants", "calendarDayVariants"],
		["drawerContentVariants", "drawerContentVariants"],
		["toastVariants", "toastVariants"],
		["DSThemeProvider", "DSThemeProvider"],
		["ThemeCustomizer", "ThemeCustomizer"],
		["staggerContainer (motion)", "staggerContainer"],
		["slideUpSm (motion)", "slideUpSm"],
		["sidebarVariants", "sidebarVariants"],
		["dataTableVariants", "dataTableVariants"],
	],
};

const { present, absent, leaks } = checkContent(buttonFile, checks);

console.log();
console.log("  Must be PRESENT (Button deps):");
for (const item of present) log(`    ✅  ${item}`);

console.log();
console.log("  Must be ABSENT (tree-shaken away):");
for (const item of absent) log(`    ✅  ${item}`);

if (leaks.length > 0) {
	console.log();
	console.log("  ❌  LEAKS DETECTED — these should have been tree-shaken:");
	for (const item of leaks) log(`    ❌  ${item}`);
	console.log();
}

// ---------------------------------------------------------------------------
// Open visualizer reports
// ---------------------------------------------------------------------------

header("Opening bundle visualizer reports");

const buttonStats = join(tmpDir, "dist-button", "stats.html");
const allStats = join(tmpDir, "dist-all", "stats.html");

for (const [label, file] of [
	["Button only", buttonStats],
	["All components", allStats],
]) {
	if (existsSync(file)) {
		log(`Opening ${label}: ${file}`);
		const opener =
			process.platform === "darwin"
				? "open"
				: process.platform === "win32"
					? "start"
					: "xdg-open";
		spawnSync(opener, [file], { detached: true, stdio: "ignore" });
	}
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

header("Done");
log(`Temp workspace: ${tmpDir}`);
log("(It will remain until you reboot or run: rm -rf " + tmpDir + ")");
log("");

if (leaks.length > 0) {
	log("⚠  Tree-shaking has leaks — see above.");
	process.exit(1);
} else {
	log("✅  Tree-shaking is working correctly.");
}
