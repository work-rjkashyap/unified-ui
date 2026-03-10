#!/usr/bin/env node
// ============================================================================
// Unified UI — CLI
// ============================================================================
// Copy-paste component installer for Unified UI.
//
// Usage:
//   npx @work-rjkashyap/unified-ui add button
//   npx @work-rjkashyap/unified-ui add button card badge
//   npx @work-rjkashyap/unified-ui add --all
//   npx @work-rjkashyap/unified-ui list
//   npx @work-rjkashyap/unified-ui init
//
// Components are fetched from the registry at:
//   https://unified-ui.space/r/<name>.json
//
// Files are written into the user's project at:
//   src/components/ui/<component>.tsx
//   src/lib/<util>.ts
//   src/lib/motion/<preset>.ts
//   src/styles/unified-ui.css
//
// This CLI resolves the full dependency tree — if you add "confirm-dialog",
// it also pulls in "alert-dialog", "button", "cn", "focus-ring", etc.
// ============================================================================
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { createInterface } from "node:readline";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const REGISTRY_BASE_URL =
  process.env.UNIFIED_UI_REGISTRY_URL || "https://www.unified-ui.space/r";
const CONFIG_FILE = "unified-ui.json";
// ---------------------------------------------------------------------------
// Starter kit templates
// ---------------------------------------------------------------------------
const FRAMEWORKS = [
  {
    name: "vite-react",
    label: "Vite + React",
    description: "Vite + React 19 SPA with full component library",
    scaffoldCmd: (name) =>
      `npm create vite@latest ${name} -- --template react-ts`,
    deps: ["@work-rjkashyap/unified-ui"],
    devDeps: ["@tailwindcss/vite", "tailwindcss"],
  },
  {
    name: "nextjs",
    label: "Next.js",
    description: "Next.js App Router with SSR + full component library",
    scaffoldCmd: (name) =>
      `npx create-next-app@latest ${name} --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --yes`,
    deps: ["@work-rjkashyap/unified-ui", "next-themes"],
    devDeps: [],
  },
  {
    name: "vuejs",
    label: "Vue.js",
    description: "Vue 3 + Vite with UI components & Tailwind theme",
    scaffoldCmd: (name) => `npm create vue@latest ${name} -- --typescript`,
    deps: ["@work-rjkashyap/unified-ui", "clsx", "tailwind-merge"],
    devDeps: ["@tailwindcss/vite", "tailwindcss"],
  },
  {
    name: "laravel-blade",
    label: "Laravel Blade",
    description: "Laravel with Blade UI components & Tailwind theme",
    scaffoldCmd: (name) => `composer create-project laravel/laravel ${name}`,
    deps: ["@work-rjkashyap/unified-ui"],
    devDeps: ["@tailwindcss/vite", "tailwindcss"],
  },
];
const DEFAULT_CONFIG = {
  $schema: "https://unified-ui.space/r/schema/config.json",
  srcDir: "src",
  aliases: {
    components: "@/components/ui",
    lib: "@/lib",
    styles: "@/styles",
  },
  typescript: true,
};
const COLORS = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};
const c = (color, text) => `${COLORS[color]}${text}${COLORS.reset}`;
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function log(msg = "") {
  console.log(msg);
}
function logStep(icon, msg) {
  console.log(`  ${icon} ${msg}`);
}
function logError(msg) {
  console.error(`\n  ${c("red", "✗")} ${msg}\n`);
}
async function confirm(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((res) => {
    rl.question(`  ${question} ${c("dim", "(y/N)")} `, (answer) => {
      rl.close();
      res(answer.trim().toLowerCase() === "y");
    });
  });
}
async function promptText(question, defaultValue = "") {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const hint = defaultValue ? ` ${c("dim", `(${defaultValue})`)}` : "";
  return new Promise((res) => {
    rl.question(`  ${question}${hint} `, (answer) => {
      rl.close();
      res(answer.trim() || defaultValue);
    });
  });
}
async function promptSelect(question, options) {
  log(`  ${question}`);
  log();
  for (let i = 0; i < options.length; i++) {
    const opt = options[i];
    log(
      `    ${c("cyan", String(i + 1))}. ${c("bold", opt.label.padEnd(18))} ${c("dim", opt.description)}`,
    );
  }
  log();
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((res) => {
    rl.question(`  ${c("dim", `Select (1-${options.length}):`)} `, (answer) => {
      rl.close();
      const idx = parseInt(answer.trim(), 10) - 1;
      res(idx >= 0 && idx < options.length ? options[idx] : null);
    });
  });
}
function runCmd(cmd, cwd, stdio = "inherit") {
  try {
    execSync(cmd, { cwd, stdio });
    return true;
  } catch {
    return false;
  }
}
function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}
function writeOverlay(targetPath, content) {
  ensureDir(dirname(targetPath));
  writeFileSync(targetPath, content);
}
async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }
  return response.json();
}
// ---------------------------------------------------------------------------
// Config management
// ---------------------------------------------------------------------------
function findProjectRoot() {
  let dir = process.cwd();
  while (dir !== dirname(dir)) {
    if (existsSync(join(dir, "package.json"))) return dir;
    dir = dirname(dir);
  }
  return process.cwd();
}
function loadConfig() {
  const root = findProjectRoot();
  const configPath = join(root, CONFIG_FILE);
  if (existsSync(configPath)) {
    try {
      return {
        root,
        ...DEFAULT_CONFIG,
        ...JSON.parse(readFileSync(configPath, "utf-8")),
      };
    } catch {
      return { root, ...DEFAULT_CONFIG };
    }
  }
  return { root, ...DEFAULT_CONFIG };
}
function saveConfig(config) {
  const root = findProjectRoot();
  const configPath = join(root, CONFIG_FILE);
  const { root: _root, ...rest } = config;
  writeFileSync(configPath, `${JSON.stringify(rest, null, 2)}\n`);
}
// ---------------------------------------------------------------------------
// Path resolution
// ---------------------------------------------------------------------------
function resolveTargetPath(config, file) {
  const srcDir = join(config.root, config.srcDir);
  switch (file.type) {
    case "component":
      return join(srcDir, "components", "ui", basename(file.path));
    case "util":
      // Preserve full subdirectory structure for lib/tokens/* and lib/motion/*
      if (file.path.startsWith("lib/tokens/")) {
        return join(srcDir, file.path);
      }
      if (file.path.includes("motion/")) {
        return join(srcDir, "lib", "motion", basename(file.path));
      }
      return join(srcDir, "lib", basename(file.path));
    case "styles":
      return join(srcDir, "styles", basename(file.path));
    case "hook":
      return join(srcDir, "hooks", basename(file.path));
    default:
      return join(srcDir, file.target || file.path);
  }
}
function basename(p) {
  return p.split("/").pop();
}
// ---------------------------------------------------------------------------
// Import path rewriting
// ---------------------------------------------------------------------------
// The registry items have imports like:
//   import { cn } from "@/lib/cn"
//   import { focusRingClasses } from "@/lib/focus-ring"
//   import { Button } from "./button"
//
// We rewrite these to match the user's alias config.
// ---------------------------------------------------------------------------
function rewriteContentImports(content, config) {
  let result = content;
  // Rewrite @/lib/* -> user's lib alias
  if (config.aliases.lib !== "@/lib") {
    result = result.replace(
      /from\s+["']@\/lib\//g,
      `from "${config.aliases.lib}/`,
    );
  }
  // Rewrite @/components/ui/* -> user's components alias
  if (config.aliases.components !== "@/components/ui") {
    result = result.replace(
      /from\s+["']@\/components\/ui\//g,
      `from "${config.aliases.components}/`,
    );
  }
  return result;
}
// ---------------------------------------------------------------------------
// Dependency resolution
// ---------------------------------------------------------------------------
async function resolveFullDependencyTree(names, registryUrl) {
  const resolved = new Map();
  const queue = [...names];
  const visited = new Set();
  while (queue.length > 0) {
    const name = queue.shift();
    if (visited.has(name)) continue;
    visited.add(name);
    try {
      const item = await fetchJSON(`${registryUrl}/${name}.json`);
      resolved.set(name, item);
      // Queue registry dependencies (other components)
      if (item.registryDependencies) {
        for (const dep of item.registryDependencies) {
          if (!visited.has(dep)) queue.push(dep);
        }
      }
      // Queue internal util dependencies
      if (item.internalDependencies) {
        for (const util of item.internalDependencies.utils || []) {
          if (!visited.has(util)) queue.push(util);
        }
        if (item.internalDependencies.motion && !visited.has("motion")) {
          queue.push("motion");
        }
      }
    } catch (err) {
      logError(`Could not fetch "${name}" from registry: ${err.message}`);
    }
  }
  return resolved;
}
// ---------------------------------------------------------------------------
// npm dependency installer
// ---------------------------------------------------------------------------
async function detectPackageManager(root) {
  if (existsSync(join(root, "bun.lock")) || existsSync(join(root, "bun.lockb")))
    return "bun";
  if (existsSync(join(root, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(root, "yarn.lock"))) return "yarn";
  return "npm";
}
function getInstallCommand(pm, deps) {
  const packages = deps.join(" ");
  switch (pm) {
    case "bun":
      return `bun add ${packages}`;
    case "pnpm":
      return `pnpm add ${packages}`;
    case "yarn":
      return `yarn add ${packages}`;
    default:
      return `npm install ${packages}`;
  }
}
async function installNpmDeps(deps, root) {
  if (deps.length === 0) return;
  const pm = await detectPackageManager(root);
  const cmd = getInstallCommand(pm, deps);
  logStep("📦", `Installing npm dependencies with ${c("cyan", pm)}...`);
  logStep("  ", c("dim", cmd));
  const { execSync } = await import("node:child_process");
  try {
    execSync(cmd, { cwd: root, stdio: "pipe" });
    logStep("✓", c("green", `${deps.length} package(s) installed`));
  } catch (_err) {
    logStep(
      "⚠",
      c("yellow", `Auto-install failed. Run manually:\n     ${cmd}`),
    );
  }
}
async function installNpmDevDeps(deps, root) {
  if (deps.length === 0) return;
  const pm = await detectPackageManager(root);
  const cmd = getInstallCommand(pm, deps)
    .replace(" add ", " add -D ")
    .replace(" install ", " install -D ");
  logStep("📦", `Installing dev dependencies with ${c("cyan", pm)}...`);
  logStep("  ", c("dim", cmd));
  try {
    execSync(cmd, { cwd: root, stdio: "pipe" });
    logStep("✓", c("green", `${deps.length} dev package(s) installed`));
  } catch (_err) {
    logStep(
      "⚠",
      c("yellow", `Auto-install failed. Run manually:\n     ${cmd}`),
    );
  }
}
// ---------------------------------------------------------------------------
// Vite + Tailwind CSS detection & setup
// ---------------------------------------------------------------------------
function detectViteConfig(root) {
  for (const name of [
    "vite.config.ts",
    "vite.config.js",
    "vite.config.mjs",
    "vite.config.mts",
  ]) {
    if (existsSync(join(root, name))) return name;
  }
  return null;
}
function hasDependency(root, pkg) {
  try {
    const raw = readFileSync(join(root, "package.json"), "utf-8");
    const json = JSON.parse(raw);
    const all = {
      ...json.dependencies,
      ...json.devDependencies,
      ...json.peerDependencies,
    };
    return Boolean(all[pkg]);
  } catch {
    return false;
  }
}
async function setupTailwindForVite(root, config) {
  const viteConfigName = detectViteConfig(root);
  if (!viteConfigName) return; // Not a Vite project

  logStep("🔍", "Detected Vite project");

  // 1. Install tailwindcss + @tailwindcss/vite if missing
  const missingDevDeps = [];
  if (!hasDependency(root, "tailwindcss")) missingDevDeps.push("tailwindcss");
  if (!hasDependency(root, "@tailwindcss/vite"))
    missingDevDeps.push("@tailwindcss/vite");
  if (missingDevDeps.length > 0) {
    await installNpmDevDeps(missingDevDeps, root);
  } else {
    logStep("✓", c("dim", "tailwindcss + @tailwindcss/vite already installed"));
  }

  // 2. Patch vite.config to add tailwindcss plugin, path import, and @ alias
  const viteConfigPath = join(root, viteConfigName);
  let viteContent = readFileSync(viteConfigPath, "utf-8");
  let viteModified = false;

  // 2a. Add @tailwindcss/vite import + plugin
  if (!viteContent.includes("@tailwindcss/vite")) {
    const tailwindImport = 'import tailwindcss from "@tailwindcss/vite";\n';
    const importMatch = viteContent.match(/^(import\s.+\n)+/m);
    if (importMatch) {
      const lastImportEnd = importMatch.index + importMatch[0].length;
      viteContent =
        viteContent.slice(0, lastImportEnd) +
        tailwindImport +
        viteContent.slice(lastImportEnd);
    } else {
      viteContent = tailwindImport + viteContent;
    }
    if (viteContent.includes("plugins:")) {
      viteContent = viteContent.replace(
        /plugins:\s*\[/,
        "plugins: [\n    tailwindcss(),",
      );
    } else if (viteContent.includes("defineConfig({")) {
      viteContent = viteContent.replace(
        /defineConfig\(\{/,
        "defineConfig({\n  plugins: [tailwindcss()],",
      );
    }
    viteModified = true;
  } else {
    logStep("✓", c("dim", `${viteConfigName} already has @tailwindcss/vite`));
  }

  // 2b. Add path import + resolve.alias for @
  if (
    !viteContent.includes("node:path") &&
    !viteContent.match(/import\s+path\s+from\s+["']path["']/)
  ) {
    const pathImport = 'import path from "node:path";\n';
    const importMatch = viteContent.match(/^(import\s.+\n)+/m);
    if (importMatch) {
      const lastImportEnd = importMatch.index + importMatch[0].length;
      viteContent =
        viteContent.slice(0, lastImportEnd) +
        pathImport +
        viteContent.slice(lastImportEnd);
    } else {
      viteContent = pathImport + viteContent;
    }
    viteModified = true;
  }

  if (
    !viteContent.includes("resolve:") &&
    !viteContent.includes("resolve.alias")
  ) {
    // Add resolve.alias block before the closing of defineConfig
    const resolveBlock = `  resolve: {\n    alias: {\n      "@": path.resolve(__dirname, "src"),\n    },\n  },`;
    if (viteContent.includes("plugins:")) {
      // Insert after plugins block — find the plugins array closing and add after
      viteContent = viteContent.replace(
        /(plugins:\s*\[[\s\S]*?\],?\n)/m,
        `$1${resolveBlock}\n`,
      );
    } else if (viteContent.includes("defineConfig({")) {
      viteContent = viteContent.replace(
        /defineConfig\(\{/,
        `defineConfig({\n${resolveBlock}`,
      );
    }
    viteModified = true;
  } else {
    logStep("✓", c("dim", `${viteConfigName} already has resolve.alias`));
  }

  if (viteModified) {
    writeFileSync(viteConfigPath, viteContent);
    logStep(
      "✓",
      `Patched ${c("cyan", viteConfigName)} with Tailwind CSS plugin + @ alias`,
    );
  }

  // 2c. Patch tsconfig to add @/* path alias
  const tsconfigCandidates = ["tsconfig.app.json", "tsconfig.json"];
  for (const tscName of tsconfigCandidates) {
    const tscPath = join(root, tscName);
    if (!existsSync(tscPath)) continue;
    const tscContent = readFileSync(tscPath, "utf-8");
    if (tscContent.includes('"@/*"')) {
      logStep("✓", c("dim", `${tscName} already has @/* path alias`));
      break;
    }
    try {
      // Strip comments for JSON parsing (single-line // comments)
      const stripped = tscContent.replace(/^\s*\/\/.*$/gm, "");
      const tsconfig = JSON.parse(stripped);
      if (!tsconfig.compilerOptions) tsconfig.compilerOptions = {};
      if (!tsconfig.compilerOptions.paths) tsconfig.compilerOptions.paths = {};
      tsconfig.compilerOptions.paths["@/*"] = ["./src/*"];
      // Also ensure baseUrl is set for paths to work
      if (!tsconfig.compilerOptions.baseUrl) {
        tsconfig.compilerOptions.baseUrl = ".";
      }
      writeFileSync(tscPath, `${JSON.stringify(tsconfig, null, 2)}\n`);
      logStep("✓", `Patched ${c("cyan", tscName)} with @/* path alias`);
    } catch {
      logStep(
        "⚠",
        c("yellow", `Could not patch ${tscName} — add @/* path alias manually`),
      );
    }
    break;
  }

  // 3. Patch CSS entry file
  const srcDir = join(root, config.srcDir);
  const cssCandidates = [
    "index.css",
    "App.css",
    "style.css",
    "main.css",
    "globals.css",
  ];
  let cssPath = null;
  for (const name of cssCandidates) {
    const candidate = join(srcDir, name);
    if (existsSync(candidate)) {
      cssPath = candidate;
      break;
    }
  }
  if (!cssPath) {
    // Create src/index.css if no CSS file found
    cssPath = join(srcDir, "index.css");
  }
  const tailwindDirective = '@import "tailwindcss";';
  const unifiedUiImport = '@import "@/styles/unified-ui.css";';
  if (existsSync(cssPath)) {
    let cssContent = readFileSync(cssPath, "utf-8");
    let modified = false;
    if (!cssContent.includes(tailwindDirective)) {
      cssContent = `${tailwindDirective}\n${cssContent}`;
      modified = true;
    }
    if (!cssContent.includes(unifiedUiImport)) {
      // Insert right after the tailwindcss import
      cssContent = cssContent.replace(
        tailwindDirective,
        `${tailwindDirective}\n${unifiedUiImport}`,
      );
      modified = true;
    }
    if (modified) {
      writeFileSync(cssPath, cssContent);
      logStep(
        "✓",
        `Updated ${c("cyan", cssPath.replace(`${root}/`, ""))} with Tailwind imports`,
      );
    } else {
      logStep(
        "✓",
        c(
          "dim",
          `${cssPath.replace(`${root}/`, "")} already has Tailwind imports`,
        ),
      );
    }
  } else {
    const content = `${tailwindDirective}\n${unifiedUiImport}\n`;
    mkdirSync(dirname(cssPath), { recursive: true });
    writeFileSync(cssPath, content);
    logStep(
      "✓",
      `Created ${c("cyan", cssPath.replace(`${root}/`, ""))} with Tailwind imports`,
    );
  }
}
// ---------------------------------------------------------------------------
// File writer
// ---------------------------------------------------------------------------
function writeFile(targetPath, content, config, overwrite = false) {
  const rewritten = rewriteContentImports(content, config);
  if (existsSync(targetPath) && !overwrite) {
    return { path: targetPath, status: "skipped" };
  }
  mkdirSync(dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, rewritten);
  return { path: targetPath, status: "created" };
}
// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Starter kit overlays (embedded content)
// ---------------------------------------------------------------------------
const OVERLAYS = {
  "vite-react": {
    files: {
      "vite.config.ts": `import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
`,
      "src/index.css": `@import "tailwindcss";
@import "@work-rjkashyap/unified-ui/styles.css";
body {
  min-height: 100svh;
}
`,
      "src/main.tsx": `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DSThemeProvider } from "@work-rjkashyap/unified-ui/theme";
import App from "./App";
import "./index.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DSThemeProvider manageHtmlClass>
      <App />
    </DSThemeProvider>
  </StrictMode>,
);
`,
      "src/App.tsx": `import { Button } from "@work-rjkashyap/unified-ui/components";
import { Heading, Body } from "@work-rjkashyap/unified-ui/primitives";
import { useDSTheme } from "@work-rjkashyap/unified-ui/theme";
function App() {
  const { theme, setTheme } = useDSTheme();
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-8 text-foreground">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-8">
        <div className="space-y-2 text-center">
          <Heading level={1}>Unified UI</Heading>
          <Body color="muted">
            Your starter project is ready. Start building!
          </Body>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button variant="primary">Get Started</Button>
          <Button
            variant="secondary"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            Toggle Theme
          </Button>
        </div>
      </div>
    </div>
  );
}
export default App;
`,
    },
  },
  nextjs: {
    files: {
      "src/app/globals.css": `@import "tailwindcss";
@import "@work-rjkashyap/unified-ui/styles.css";
body {
  min-height: 100svh;
}
`,
      "src/app/layout.tsx": `import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { DSThemeProvider } from "@work-rjkashyap/unified-ui/theme";
import "./globals.css";
export const metadata: Metadata = {
  title: "Unified UI App",
  description: "Built with Unified UI and Next.js",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DSThemeProvider>{children}</DSThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
`,
      "src/app/page.tsx": `"use client";
import { Button } from "@work-rjkashyap/unified-ui/components";
import { Heading, Body } from "@work-rjkashyap/unified-ui/primitives";
import { useDSTheme } from "@work-rjkashyap/unified-ui/theme";
export default function Home() {
  const { theme, setTheme } = useDSTheme();
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-8 text-foreground">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-8">
        <div className="space-y-2 text-center">
          <Heading level={1}>Unified UI</Heading>
          <Body color="muted">
            Your Next.js project is ready. Start building!
          </Body>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button variant="primary">Get Started</Button>
          <Button
            variant="secondary"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            Toggle Theme
          </Button>
        </div>
      </div>
    </div>
  );
}
`,
    },
  },
  vuejs: {
    files: {
      "vite.config.ts": `import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
`,
      "src/style.css": `@import "tailwindcss";
@import "@work-rjkashyap/unified-ui/styles.css";
body {
    min-height: 100svh;
}
`,
      "src/main.ts": `import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
createApp(App).mount("#app");
`,
      "src/lib/cn.ts": `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`,
      "src/App.vue": `<script setup lang="ts">
import ThemeToggle from "./components/ThemeToggle.vue";
import {
  UiButton,
  UiBadge,
  UiCard,
  UiCardHeader,
  UiCardBody,
  UiCardFooter,
  UiInput,
  UiAlert,
  UiHeading,
  UiText,
} from "./components/ui";
import { ref } from "vue";
const email = ref("");
</script>
<template>
  <div
    class="flex min-h-svh flex-col items-center justify-center gap-8 bg-background p-8 text-foreground"
  >
    <UiCard class="w-full max-w-lg">
      <UiCardHeader>
        <UiHeading :level="2">Unified UI</UiHeading>
        <UiText variant="bodySm" color="muted">
          Your Vue.js project is ready with components. Start building!
        </UiText>
      </UiCardHeader>
      <UiCardBody class="space-y-6">
        <!-- Buttons -->
        <div class="space-y-2">
          <UiText variant="label">Buttons</UiText>
          <div class="flex flex-wrap items-center gap-2">
            <UiButton variant="primary">Primary</UiButton>
            <UiButton variant="secondary">Secondary</UiButton>
            <UiButton variant="ghost">Ghost</UiButton>
            <UiButton variant="danger" size="sm">Danger</UiButton>
            <UiButton variant="primary" :loading="true" size="sm">Loading</UiButton>
          </div>
        </div>
        <!-- Badges -->
        <div class="space-y-2">
          <UiText variant="label">Badges</UiText>
          <div class="flex flex-wrap items-center gap-2">
            <UiBadge variant="default">Default</UiBadge>
            <UiBadge variant="primary">Primary</UiBadge>
            <UiBadge variant="success">Success</UiBadge>
            <UiBadge variant="warning">Warning</UiBadge>
            <UiBadge variant="danger">Danger</UiBadge>
            <UiBadge variant="info">Info</UiBadge>
            <UiBadge variant="outline">Outline</UiBadge>
          </div>
        </div>
        <!-- Input -->
        <div class="space-y-2">
          <UiText variant="label">Input</UiText>
          <UiInput v-model="email" placeholder="you@example.com" />
        </div>
        <!-- Alert -->
        <UiAlert variant="info" title="All set!">
          Your design system components are working in Vue.
        </UiAlert>
      </UiCardBody>
      <UiCardFooter class="justify-between">
        <UiButton variant="primary">Get Started</UiButton>
        <ThemeToggle />
      </UiCardFooter>
    </UiCard>
  </div>
</template>
`,
      "src/components/ThemeToggle.vue": `<script setup lang="ts">
import { ref, onMounted } from "vue";
const theme = ref<"light" | "dark">("light");
onMounted(() => {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  theme.value =
    (stored as "light" | "dark") || (prefersDark ? "dark" : "light");
  applyTheme();
});
function toggle() {
  theme.value = theme.value === "dark" ? "light" : "dark";
  applyTheme();
}
function applyTheme() {
  document.documentElement.classList.toggle("dark", theme.value === "dark");
  localStorage.setItem("theme", theme.value);
}
</script>
<template>
  <button
    class="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    @click="toggle"
  >
    Toggle {{ theme === "dark" ? "Light" : "Dark" }}
  </button>
</template>
`,
      "src/components/ui/index.ts": `export { default as UiButton } from "./Button.vue";
export { default as UiBadge } from "./Badge.vue";
export { default as UiCard } from "./Card.vue";
export { default as UiCardHeader } from "./CardHeader.vue";
export { default as UiCardBody } from "./CardBody.vue";
export { default as UiCardFooter } from "./CardFooter.vue";
export { default as UiInput } from "./Input.vue";
export { default as UiAlert } from "./Alert.vue";
export { default as UiHeading } from "./Heading.vue";
export { default as UiText } from "./Text.vue";
`,
      "src/components/ui/Button.vue": `<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/cn";
type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";
interface Props {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  iconOnly?: boolean;
  loading?: boolean;
  disabled?: boolean;
  as?: string;
  class?: HTMLAttributes["class"];
}
const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  as: "button",
  fullWidth: false,
  iconOnly: false,
  loading: false,
  disabled: false,
});
const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
  secondary:
    "bg-secondary text-secondary-foreground border border-border hover:bg-secondary-hover active:bg-secondary-active",
  ghost:
    "bg-transparent text-foreground hover:bg-muted hover:text-foreground active:bg-secondary-active",
  danger:
    "bg-danger text-danger-foreground hover:bg-danger-hover active:bg-danger-active",
};
const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-[var(--ds-control-height,36px)] px-[var(--ds-padding-button-x,16px)] text-sm gap-2",
  lg: "h-10 px-5 text-sm gap-2",
};
const iconOnlySizeClasses: Record<Size, string> = {
  sm: "w-8 !px-0",
  md: "w-9 !px-0",
  lg: "w-10 !px-0",
};
const classes = computed(() =>
  cn(
    // base
    "inline-flex items-center justify-center gap-2 text-sm font-medium leading-5 rounded-md",
    "transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-[var(--duration-fast,150ms)] ease-[var(--easing-standard,cubic-bezier(0.4,0,0.2,1))]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed select-none",
    "active:scale-[0.98] disabled:active:scale-100",
    // variant
    variantClasses[props.variant],
    // size
    sizeClasses[props.size],
    // icon only
    props.iconOnly && iconOnlySizeClasses[props.size],
    // fullWidth
    props.fullWidth && "w-full",
    // loading
    props.loading && "pointer-events-none opacity-70",
    props.class,
  ),
);
</script>
<template>
  <component
    :is="as"
    :class="classes"
    :disabled="disabled || loading"
    data-ds
    data-ds-component="button"
    :data-ds-loading="loading || undefined"
  >
    <svg
      v-if="loading"
      class="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
    <slot />
  </component>
</template>
`,
      "src/components/ui/Badge.vue": `<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/cn";
type Variant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "outline";
type Size = "sm" | "md" | "lg";
interface Props {
  variant?: Variant;
  size?: Size;
  dismissible?: boolean;
  class?: HTMLAttributes["class"];
}
const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "md",
  dismissible: false,
});
const emit = defineEmits<{ dismiss: [] }>();
const variantClasses: Record<Variant, string> = {
  default: "bg-muted text-foreground border border-transparent",
  primary:
    "bg-primary-muted text-primary-muted-foreground border border-transparent",
  secondary: "bg-secondary text-secondary-foreground border border-border",
  success:
    "bg-success-muted text-success-muted-foreground border border-transparent",
  warning:
    "bg-warning-muted text-warning-muted-foreground border border-transparent",
  danger:
    "bg-danger-muted text-danger-muted-foreground border border-transparent",
  info: "bg-info-muted text-info-muted-foreground border border-transparent",
  outline: "bg-transparent text-foreground border border-border",
};
const sizeClasses: Record<Size, string> = {
  sm: "px-2 py-0.5 text-[11px] gap-1",
  md: "px-2.5 py-1 text-xs gap-1.5",
  lg: "px-3 py-1.5 text-sm gap-2",
};
const classes = computed(() =>
  cn(
    "inline-flex items-center gap-1.5 rounded-full font-medium leading-none whitespace-nowrap",
    "transition-[color,background-color,border-color,box-shadow,opacity] duration-[var(--duration-fast,150ms)] ease-[var(--easing-standard,cubic-bezier(0.4,0,0.2,1))]",
    "select-none shrink-0",
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.class,
  ),
);
</script>
<template>
  <span :class="classes" data-ds data-ds-component="badge">
    <slot />
    <button
      v-if="dismissible"
      class="ml-0.5 inline-flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10"
      :class="size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-3.5 w-3.5' : 'h-4 w-4'"
      @click.stop="emit('dismiss')"
      aria-label="Dismiss"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-full w-full"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </span>
</template>
`,
      "src/components/ui/Card.vue": `<script setup lang="ts">
import { computed, provide, type HTMLAttributes, type InjectionKey } from "vue";
import { cn } from "@/lib/cn";
type Variant = "default" | "outlined" | "elevated" | "interactive";
type Padding = "compact" | "comfortable";
interface Props {
  variant?: Variant;
  padding?: Padding;
  fullWidth?: boolean;
  as?: string;
  class?: HTMLAttributes["class"];
}
const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  padding: "compact",
  as: "div",
  fullWidth: false,
});
export const cardPaddingKey = Symbol("cardPadding") as InjectionKey<Padding>;
provide(cardPaddingKey, props.padding);
const variantClasses: Record<Variant, string> = {
  default: "bg-surface border border-border",
  outlined: "bg-transparent border border-border-strong",
  elevated: "bg-surface-raised border border-border-muted shadow-md",
  interactive:
    "bg-surface border border-border transition-[border-color,box-shadow,transform] duration-[var(--duration-normal,200ms)] ease-[var(--easing-standard,cubic-bezier(0.4,0,0.2,1))] hover:border-border-strong hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer",
};
const classes = computed(() =>
  cn(
    "flex flex-col rounded-md overflow-hidden text-sm text-foreground",
    variantClasses[props.variant],
    props.fullWidth && "w-full",
    props.class,
  ),
);
</script>
<template>
  <component :is="as" :class="classes" data-ds data-ds-component="card">
    <slot />
  </component>
</template>
`,
      "src/components/ui/CardHeader.vue": `<script setup lang="ts">
import { inject, computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/cn";
import { cardPaddingKey } from "./Card.vue";
interface Props {
  class?: HTMLAttributes["class"];
}
const props = defineProps<Props>();
const padding = inject(cardPaddingKey, "compact");
const classes = computed(() =>
  cn(
    "flex flex-col",
    padding === "comfortable" ? "px-6 pt-6 gap-1.5" : "px-[var(--ds-padding-card,16px)] pt-[var(--ds-padding-card,16px)] gap-1",
    props.class,
  ),
);
</script>
<template>
  <div :class="classes" data-ds data-ds-component="card-header">
    <slot />
  </div>
</template>
`,
      "src/components/ui/CardBody.vue": `<script setup lang="ts">
import { inject, computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/cn";
import { cardPaddingKey } from "./Card.vue";
interface Props {
  class?: HTMLAttributes["class"];
}
const props = defineProps<Props>();
const padding = inject(cardPaddingKey, "compact");
const classes = computed(() =>
  cn(
    "flex flex-col flex-1",
    padding === "comfortable" ? "px-6 py-4 gap-4" : "px-[var(--ds-padding-card,16px)] py-3 gap-[var(--ds-gap-default,0.75rem)]",
    props.class,
  ),
);
</script>
<template>
  <div :class="classes" data-ds data-ds-component="card-body">
    <slot />
  </div>
</template>
`,
      "src/components/ui/CardFooter.vue": `<script setup lang="ts">
import { inject, computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/cn";
import { cardPaddingKey } from "./Card.vue";
interface Props {
  class?: HTMLAttributes["class"];
}
const props = defineProps<Props>();
const padding = inject(cardPaddingKey, "compact");
const classes = computed(() =>
  cn(
    "flex items-center",
    padding === "comfortable" ? "px-6 pb-6 gap-3" : "px-[var(--ds-padding-card,16px)] pb-[var(--ds-padding-card,16px)] gap-2",
    props.class,
  ),
);
</script>
<template>
  <div :class="classes" data-ds data-ds-component="card-footer">
    <slot />
  </div>
</template>
`,
      "src/components/ui/Input.vue": `<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/cn";
type Variant = "default" | "error" | "success";
type Size = "sm" | "md" | "lg";
interface Props {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  class?: HTMLAttributes["class"];
}
const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "md",
  disabled: false,
});
const model = defineModel<string>();
const variantClasses: Record<Variant, string> = {
  default:
    "border-input hover:border-border-strong focus-visible:border-border-strong",
  error:
    "border-danger text-foreground focus-visible:border-danger placeholder:text-input-placeholder",
  success:
    "border-success text-foreground focus-visible:border-success placeholder:text-input-placeholder",
};
const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-2.5 text-xs",
  md: "h-[var(--ds-control-height,36px)] px-3 text-sm",
  lg: "h-10 px-3.5 text-sm",
};
const classes = computed(() =>
  cn(
    "flex w-full text-sm leading-5 rounded-md border bg-background text-input-foreground",
    "placeholder:text-input-placeholder",
    "transition-[color,background-color,border-color,box-shadow,opacity] duration-[var(--duration-fast,150ms)] ease-[var(--easing-standard,cubic-bezier(0.4,0,0.2,1))]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled-foreground",
    "read-only:bg-muted read-only:cursor-default",
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.class,
  ),
);
</script>
<template>
  <input
    v-model="model"
    :class="classes"
    :disabled="disabled"
    data-ds
    data-ds-component="input"
  />
</template>
`,
      "src/components/ui/Alert.vue": `<script setup lang="ts">
import { computed, ref, type HTMLAttributes } from "vue";
import { cn } from "@/lib/cn";
type Variant = "info" | "success" | "warning" | "danger" | "default";
interface Props {
  variant?: Variant;
  title?: string;
  dismissible?: boolean;
  class?: HTMLAttributes["class"];
}
const props = withDefaults(defineProps<Props>(), {
  variant: "info",
  dismissible: false,
});
const dismissed = ref(false);
const variantClasses: Record<Variant, string> = {
  info: "bg-info-muted text-info-muted-foreground border-info/20",
  success: "bg-success-muted text-success-muted-foreground border-success/20",
  warning: "bg-warning-muted text-warning-muted-foreground border-warning/20",
  danger: "bg-danger-muted text-danger-muted-foreground border-danger/20",
  default: "bg-muted text-muted-foreground border-border",
};
const iconColorClasses: Record<Variant, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  default: "text-muted-foreground",
};
const classes = computed(() =>
  cn(
    "relative flex gap-3 rounded-md p-4 text-sm leading-5 border",
    "transition-colors duration-[var(--duration-fast,150ms)]",
    variantClasses[props.variant],
    props.class,
  ),
);
// SVG icon paths by variant
const iconPaths: Record<Variant, string> = {
  info: "M12 16v-4m0-4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z",
  success: "M9 12l2 2 4-4m6 2a10 10 0 11-20 0 10 10 0 0120 0z",
  warning: "M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
  danger: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a10 10 0 11-20 0 10 10 0 0120 0z",
  default: "M12 16v-4m0-4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z",
};
</script>
<template>
  <div
    v-if="!dismissed"
    :class="classes"
    role="alert"
    data-ds
    data-ds-component="alert"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-4 w-4 shrink-0 mt-0.5"
      :class="iconColorClasses[variant]"
    >
      <path :d="iconPaths[variant]" />
    </svg>
    <div class="flex-1 space-y-1">
      <p v-if="title" class="font-medium leading-5">{{ title }}</p>
      <div class="text-sm leading-5">
        <slot />
      </div>
    </div>
    <button
      v-if="dismissible"
      class="absolute top-3 right-3 inline-flex items-center justify-center rounded-md h-6 w-6 hover:bg-black/10 dark:hover:bg-white/10"
      @click="dismissed = true"
      aria-label="Dismiss"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>
</template>
`,
      "src/components/ui/Heading.vue": `<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/cn";
type Level = 1 | 2 | 3 | 4;
type Color = "default" | "foreground" | "muted" | "primary";
interface Props {
  level?: Level;
  color?: Color;
  class?: HTMLAttributes["class"];
}
const props = withDefaults(defineProps<Props>(), {
  level: 1,
  color: "default",
});
const levelClasses: Record<Level, string> = {
  1: "text-[30px] leading-[36px] font-bold tracking-tight",
  2: "text-[24px] leading-[32px] font-semibold tracking-tight",
  3: "text-[20px] leading-[28px] font-semibold tracking-normal",
  4: "text-[18px] leading-[28px] font-medium tracking-normal",
};
const colorClasses: Record<Color, string> = {
  default: "text-foreground",
  foreground: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
};
const tag = computed(() => \`h\${props.level}\` as const);
const classes = computed(() =>
  cn(levelClasses[props.level], colorClasses[props.color], props.class),
);
</script>
<template>
  <component :is="tag" :class="classes" data-ds data-ds-component="heading">
    <slot />
  </component>
</template>
`,
      "src/components/ui/Text.vue": `<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/cn";
type Variant = "body" | "bodySm" | "caption" | "label" | "overline" | "code";
type Color =
  | "default"
  | "foreground"
  | "muted"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";
interface Props {
  variant?: Variant;
  color?: Color;
  as?: string;
  class?: HTMLAttributes["class"];
}
const props = withDefaults(defineProps<Props>(), {
  variant: "body",
  color: "default",
  as: "p",
});
const variantClasses: Record<Variant, string> = {
  body: "text-[16px] leading-[24px] font-normal tracking-normal",
  bodySm: "text-[14px] leading-[20px] font-normal tracking-normal",
  caption:
    "text-[12px] leading-[16px] font-normal tracking-wide text-muted-foreground",
  label: "text-[14px] leading-[20px] font-medium tracking-normal",
  overline:
    "text-[12px] leading-[16px] font-semibold tracking-wider uppercase text-muted-foreground",
  code: "text-[14px] leading-[20px] font-normal tracking-normal font-mono",
};
const colorClasses: Record<Color, string> = {
  default: "text-foreground",
  foreground: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
};
const classes = computed(() =>
  cn(variantClasses[props.variant], colorClasses[props.color], props.class),
);
</script>
<template>
  <component :is="as" :class="classes" data-ds data-ds-component="text">
    <slot />
  </component>
</template>
`,
    },
  },
  "laravel-blade": {
    files: {
      "vite.config.js": `import tailwindcss from "@tailwindcss/vite";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/css/app.css", "resources/js/app.js"],
      refresh: true,
    }),
    tailwindcss(),
  ],
});
`,
      "resources/css/app.css": `@import "tailwindcss";
@import "@work-rjkashyap/unified-ui/styles.css";
`,
      "resources/js/app.js": `// Unified UI — Laravel Blade Starter
// Design tokens are loaded via CSS. This file handles theme toggling.
function initTheme() {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const theme = stored || (prefersDark ? "dark" : "light");
  document.documentElement.classList.toggle("dark", theme === "dark");
}
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}
// Initialize on load
initTheme();
// Expose globally for Blade onclick handlers
window.toggleTheme = toggleTheme;
`,
      "resources/views/layouts/app.blade.php": `<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Unified UI') }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="min-h-svh bg-background text-foreground antialiased">
    @yield('content')
</body>
</html>
`,
      "resources/views/welcome.blade.php": `@extends('layouts.app')
@section('content')
<div class="flex min-h-svh flex-col items-center justify-center gap-8 p-8">
    <x-ui.card class="w-full max-w-lg">
        <x-ui.card-header>
            <x-ui.heading :level="2">Unified UI</x-ui.heading>
            <x-ui.text variant="bodySm" color="muted">
                Your Laravel project is ready with components. Start building!
            </x-ui.text>
        </x-ui.card-header>
        <x-ui.card-body class="space-y-6">
            {{-- Buttons --}}
            <div class="space-y-2">
                <x-ui.text variant="label">Buttons</x-ui.text>
                <div class="flex flex-wrap items-center gap-2">
                    <x-ui.button variant="primary">Primary</x-ui.button>
                    <x-ui.button variant="secondary">Secondary</x-ui.button>
                    <x-ui.button variant="ghost">Ghost</x-ui.button>
                    <x-ui.button variant="danger" size="sm">Danger</x-ui.button>
                    <x-ui.button variant="primary" :loading="true" size="sm">Loading</x-ui.button>
                </div>
            </div>
            {{-- Badges --}}
            <div class="space-y-2">
                <x-ui.text variant="label">Badges</x-ui.text>
                <div class="flex flex-wrap items-center gap-2">
                    <x-ui.badge variant="default">Default</x-ui.badge>
                    <x-ui.badge variant="primary">Primary</x-ui.badge>
                    <x-ui.badge variant="success">Success</x-ui.badge>
                    <x-ui.badge variant="warning">Warning</x-ui.badge>
                    <x-ui.badge variant="danger">Danger</x-ui.badge>
                    <x-ui.badge variant="info">Info</x-ui.badge>
                    <x-ui.badge variant="outline">Outline</x-ui.badge>
                </div>
            </div>
            {{-- Input --}}
            <div class="space-y-2">
                <x-ui.text variant="label">Input</x-ui.text>
                <x-ui.input placeholder="you@example.com" />
            </div>
            {{-- Alert --}}
            <x-ui.alert variant="info" title="All set!">
                Your design system components are working in Laravel.
            </x-ui.alert>
        </x-ui.card-body>
        <x-ui.card-footer class="justify-between">
            <x-ui.button variant="primary">Get Started</x-ui.button>
            <x-ui.button variant="secondary" onclick="toggleTheme()">Toggle Theme</x-ui.button>
        </x-ui.card-footer>
    </x-ui.card>
</div>
@endsection
`,
      "resources/views/components/ui/button.blade.php": `@props([
    'variant' => 'primary',
    'size' => 'md',
    'as' => 'button',
    'fullWidth' => false,
    'iconOnly' => false,
    'loading' => false,
    'disabled' => false,
])
@php
$variants = [
    'primary' => 'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active',
    'secondary' => 'bg-secondary text-secondary-foreground border border-border hover:bg-secondary-hover active:bg-secondary-active',
    'ghost' => 'bg-transparent text-foreground hover:bg-muted hover:text-foreground active:bg-secondary-active',
    'danger' => 'bg-danger text-danger-foreground hover:bg-danger-hover active:bg-danger-active',
];
$sizes = [
    'sm' => 'h-8 px-3 text-xs gap-1.5',
    'md' => 'h-[var(--ds-control-height,36px)] px-[var(--ds-padding-button-x,16px)] text-sm gap-2',
    'lg' => 'h-10 px-5 text-sm gap-2',
];
$iconOnlySizes = [
    'sm' => 'w-8 !px-0',
    'md' => 'w-9 !px-0',
    'lg' => 'w-10 !px-0',
];
$classes = implode(' ', array_filter([
    'inline-flex items-center justify-center gap-2 text-sm font-medium leading-5 rounded-md',
    'transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-[var(--duration-fast,150ms)] ease-[var(--easing-standard,cubic-bezier(0.4,0,0.2,1))]',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    'disabled:pointer-events-none disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed select-none',
    'active:scale-[0.98] disabled:active:scale-100',
    $variants[$variant] ?? $variants['primary'],
    $sizes[$size] ?? $sizes['md'],
    $iconOnly ? ($iconOnlySizes[$size] ?? '') : '',
    $fullWidth ? 'w-full' : '',
    $loading ? 'pointer-events-none opacity-70' : '',
]));
@endphp
<{{ $as }}
    {{ $attributes->merge(['class' => $classes, 'disabled' => $disabled || $loading]) }}
    data-ds
    data-ds-component="button"
    @if($loading) data-ds-loading @endif
>
    @if($loading)
        <svg class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
    @endif
    {{ $slot }}
</{{ $as }}>
`,
      "resources/views/components/ui/badge.blade.php": `@props([
    'variant' => 'default',
    'size' => 'md',
    'dismissible' => false,
])
@php
$variants = [
    'default' => 'bg-muted text-foreground border border-transparent',
    'primary' => 'bg-primary-muted text-primary-muted-foreground border border-transparent',
    'secondary' => 'bg-secondary text-secondary-foreground border border-border',
    'success' => 'bg-success-muted text-success-muted-foreground border border-transparent',
    'warning' => 'bg-warning-muted text-warning-muted-foreground border border-transparent',
    'danger' => 'bg-danger-muted text-danger-muted-foreground border border-transparent',
    'info' => 'bg-info-muted text-info-muted-foreground border border-transparent',
    'outline' => 'bg-transparent text-foreground border border-border',
];
$sizes = [
    'sm' => 'px-2 py-0.5 text-[11px] gap-1',
    'md' => 'px-2.5 py-1 text-xs gap-1.5',
    'lg' => 'px-3 py-1.5 text-sm gap-2',
];
$classes = implode(' ', [
    'inline-flex items-center gap-1.5 rounded-full font-medium leading-none whitespace-nowrap',
    'transition-[color,background-color,border-color,box-shadow,opacity] duration-[var(--duration-fast,150ms)] ease-[var(--easing-standard,cubic-bezier(0.4,0,0.2,1))]',
    'select-none shrink-0',
    $variants[$variant] ?? $variants['default'],
    $sizes[$size] ?? $sizes['md'],
]);
@endphp
<span {{ $attributes->merge(['class' => $classes]) }} data-ds data-ds-component="badge">
    {{ $slot }}
    @if($dismissible)
        <button
            class="ml-0.5 inline-flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10 {{ $size === 'sm' ? 'h-3 w-3' : ($size === 'md' ? 'h-3.5 w-3.5' : 'h-4 w-4') }}"
            onclick="this.closest('[data-ds-component=badge]').remove()"
            aria-label="Dismiss"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-full w-full"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
    @endif
</span>
`,
      "resources/views/components/ui/card.blade.php": `@props([
    'variant' => 'default',
    'padding' => 'compact',
    'fullWidth' => false,
    'as' => 'div',
])
@php
$variants = [
    'default' => 'bg-surface border border-border',
    'outlined' => 'bg-transparent border border-border-strong',
    'elevated' => 'bg-surface-raised border border-border-muted shadow-md',
    'interactive' => 'bg-surface border border-border transition-[border-color,box-shadow,transform] duration-[var(--duration-normal,200ms)] ease-[var(--easing-standard,cubic-bezier(0.4,0,0.2,1))] hover:border-border-strong hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer',
];
$classes = implode(' ', array_filter([
    'flex flex-col rounded-md overflow-hidden text-sm text-foreground',
    $variants[$variant] ?? $variants['default'],
    $fullWidth ? 'w-full' : '',
]));
@endphp
<{{ $as }} {{ $attributes->merge(['class' => $classes]) }} data-ds data-ds-component="card" data-ds-padding="{{ $padding }}">
    {{ $slot }}
</{{ $as }}>
`,
      "resources/views/components/ui/card-header.blade.php": `@aware(['padding' => 'compact'])
@php
$classes = $padding === 'comfortable'
    ? 'flex flex-col px-6 pt-6 gap-1.5'
    : 'flex flex-col px-[var(--ds-padding-card,16px)] pt-[var(--ds-padding-card,16px)] gap-1';
@endphp
<div {{ $attributes->merge(['class' => $classes]) }} data-ds data-ds-component="card-header">
    {{ $slot }}
</div>
`,
      "resources/views/components/ui/card-body.blade.php": `@aware(['padding' => 'compact'])
@php
$classes = $padding === 'comfortable'
    ? 'flex flex-col flex-1 px-6 py-4 gap-4'
    : 'flex flex-col flex-1 px-[var(--ds-padding-card,16px)] py-3 gap-[var(--ds-gap-default,0.75rem)]';
@endphp
<div {{ $attributes->merge(['class' => $classes]) }} data-ds data-ds-component="card-body">
    {{ $slot }}
</div>
`,
      "resources/views/components/ui/card-footer.blade.php": `@aware(['padding' => 'compact'])
@php
$classes = $padding === 'comfortable'
    ? 'flex items-center px-6 pb-6 gap-3'
    : 'flex items-center px-[var(--ds-padding-card,16px)] pb-[var(--ds-padding-card,16px)] gap-2';
@endphp
<div {{ $attributes->merge(['class' => $classes]) }} data-ds data-ds-component="card-footer">
    {{ $slot }}
</div>
`,
      "resources/views/components/ui/input.blade.php": `@props([
    'variant' => 'default',
    'size' => 'md',
    'disabled' => false,
])
@php
$variants = [
    'default' => 'border-input hover:border-border-strong focus-visible:border-border-strong',
    'error' => 'border-danger text-foreground focus-visible:border-danger placeholder:text-input-placeholder',
    'success' => 'border-success text-foreground focus-visible:border-success placeholder:text-input-placeholder',
];
$sizes = [
    'sm' => 'h-8 px-2.5 text-xs',
    'md' => 'h-[var(--ds-control-height,36px)] px-3 text-sm',
    'lg' => 'h-10 px-3.5 text-sm',
];
$classes = implode(' ', [
    'flex w-full text-sm leading-5 rounded-md border bg-background text-input-foreground',
    'placeholder:text-input-placeholder',
    'transition-[color,background-color,border-color,box-shadow,opacity] duration-[var(--duration-fast,150ms)] ease-[var(--easing-standard,cubic-bezier(0.4,0,0.2,1))]',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled-foreground',
    'read-only:bg-muted read-only:cursor-default',
    $variants[$variant] ?? $variants['default'],
    $sizes[$size] ?? $sizes['md'],
]);
@endphp
<input {{ $attributes->merge(['class' => $classes, 'disabled' => $disabled, 'type' => 'text']) }} data-ds data-ds-component="input" />
`,
      "resources/views/components/ui/alert.blade.php": `@props([
    'variant' => 'info',
    'title' => null,
    'dismissible' => false,
])
@php
$variants = [
    'info' => 'bg-info-muted text-info-muted-foreground border-info/20',
    'success' => 'bg-success-muted text-success-muted-foreground border-success/20',
    'warning' => 'bg-warning-muted text-warning-muted-foreground border-warning/20',
    'danger' => 'bg-danger-muted text-danger-muted-foreground border-danger/20',
    'default' => 'bg-muted text-muted-foreground border-border',
];
$iconColors = [
    'info' => 'text-info',
    'success' => 'text-success',
    'warning' => 'text-warning',
    'danger' => 'text-danger',
    'default' => 'text-muted-foreground',
];
$iconPaths = [
    'info' => 'M12 16v-4m0-4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z',
    'success' => 'M9 12l2 2 4-4m6 2a10 10 0 11-20 0 10 10 0 0120 0z',
    'warning' => 'M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z',
    'danger' => 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a10 10 0 11-20 0 10 10 0 0120 0z',
    'default' => 'M12 16v-4m0-4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z',
];
$classes = implode(' ', [
    'relative flex gap-3 rounded-md p-4 text-sm leading-5 border',
    'transition-colors duration-[var(--duration-fast,150ms)]',
    $variants[$variant] ?? $variants['info'],
]);
@endphp
<div {{ $attributes->merge(['class' => $classes]) }} role="alert" data-ds data-ds-component="alert">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 shrink-0 mt-0.5 {{ $iconColors[$variant] ?? $iconColors['info'] }}">
        <path d="{{ $iconPaths[$variant] ?? $iconPaths['info'] }}"/>
    </svg>
    <div class="flex-1 space-y-1">
        @if($title)
            <p class="font-medium leading-5">{{ $title }}</p>
        @endif
        <div class="text-sm leading-5">{{ $slot }}</div>
    </div>
    @if($dismissible)
        <button
            class="absolute top-3 right-3 inline-flex items-center justify-center rounded-md h-6 w-6 hover:bg-black/10 dark:hover:bg-white/10"
            onclick="this.closest('[data-ds-component=alert]').remove()"
            aria-label="Dismiss"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
    @endif
</div>
`,
      "resources/views/components/ui/heading.blade.php": `@props([
    'level' => 1,
    'color' => 'default',
])
@php
$levels = [
    1 => 'text-[30px] leading-[36px] font-bold tracking-tight',
    2 => 'text-[24px] leading-[32px] font-semibold tracking-tight',
    3 => 'text-[20px] leading-[28px] font-semibold tracking-normal',
    4 => 'text-[18px] leading-[28px] font-medium tracking-normal',
];
$colors = [
    'default' => 'text-foreground',
    'foreground' => 'text-foreground',
    'muted' => 'text-muted-foreground',
    'primary' => 'text-primary',
];
$classes = implode(' ', [
    $levels[$level] ?? $levels[1],
    $colors[$color] ?? $colors['default'],
]);
$tag = 'h' . min(max((int)$level, 1), 6);
@endphp
<{{ $tag }} {{ $attributes->merge(['class' => $classes]) }} data-ds data-ds-component="heading">
    {{ $slot }}
</{{ $tag }}>
`,
      "resources/views/components/ui/text.blade.php": `@props([
    'variant' => 'body',
    'color' => 'default',
    'as' => 'p',
])
@php
$variants = [
    'body' => 'text-[16px] leading-[24px] font-normal tracking-normal',
    'bodySm' => 'text-[14px] leading-[20px] font-normal tracking-normal',
    'caption' => 'text-[12px] leading-[16px] font-normal tracking-wide text-muted-foreground',
    'label' => 'text-[14px] leading-[20px] font-medium tracking-normal',
    'overline' => 'text-[12px] leading-[16px] font-semibold tracking-wider uppercase text-muted-foreground',
    'code' => 'text-[14px] leading-[20px] font-normal tracking-normal font-mono',
];
$colors = [
    'default' => 'text-foreground',
    'foreground' => 'text-foreground',
    'muted' => 'text-muted-foreground',
    'primary' => 'text-primary',
    'success' => 'text-success',
    'warning' => 'text-warning',
    'danger' => 'text-danger',
    'info' => 'text-info',
];
$classes = implode(' ', [
    $variants[$variant] ?? $variants['body'],
    $colors[$color] ?? $colors['default'],
]);
@endphp
<{{ $as }} {{ $attributes->merge(['class' => $classes]) }} data-ds data-ds-component="text">
    {{ $slot }}
</{{ $as }}>
`,
    },
  },
};
// ---------------------------------------------------------------------------
// Starter kit scaffolding command
// ---------------------------------------------------------------------------
async function cmdInitWithTemplate(positional, flags) {
  log();
  log(`  ${c("bold", "Unified UI")} ${c("dim", "— Create a new project")}`);
  log();
  // 1. Pick framework
  let framework;
  const templateFlag =
    typeof flags.template === "string" ? flags.template : null;
  if (templateFlag) {
    framework = FRAMEWORKS.find((f) => f.name === templateFlag);
    if (!framework) {
      logError(
        `Unknown template: "${templateFlag}". Available: ${FRAMEWORKS.map((f) => f.name).join(", ")}`,
      );
      process.exit(1);
    }
  } else {
    framework = await promptSelect(
      "Which framework do you want to use?",
      FRAMEWORKS,
    );
    if (!framework) {
      logError(
        `Invalid selection. Available: ${FRAMEWORKS.map((f) => f.name).join(", ")}`,
      );
      process.exit(1);
    }
    log();
  }
  logStep("✓", `Framework: ${c("cyan", framework.label)}`);
  // 2. Get project name
  let projectName = positional[0];
  if (!projectName) {
    projectName = await promptText("Project name:", "my-unified-app");
  }
  const targetDir = resolve(process.cwd(), projectName);
  logStep("✓", `Project: ${c("cyan", projectName)}`);
  log();
  // 3. Run the official scaffolding command
  logStep("📦", `Scaffolding ${c("cyan", framework.label)} project...`);
  log();
  const scaffoldCmd = framework.scaffoldCmd(projectName);
  logStep("  ", c("dim", `> ${scaffoldCmd}`));
  log();
  const scaffoldOk = runCmd(scaffoldCmd, process.cwd());
  if (!scaffoldOk) {
    logError(
      `Scaffolding failed. Make sure the required tool is installed.\n` +
        (framework.name === "laravel-blade"
          ? `     Requires: ${c("cyan", "composer")} (https://getcomposer.org)\n`
          : `     Requires: ${c("cyan", "node >= 20")} and ${c("cyan", "npm")}\n`),
    );
    process.exit(1);
  }
  if (!existsSync(targetDir)) {
    logError(
      `Expected directory "${projectName}" was not created by the scaffolding tool.`,
    );
    process.exit(1);
  }
  log();
  logStep("✓", c("green", `${framework.label} project scaffolded`));
  // 4. Install Unified UI + extra deps
  logStep("📦", "Installing Unified UI design system...");
  const pm = await detectPackageManager(targetDir);
  const allDeps = [...framework.deps];
  const allDevDeps = [...framework.devDeps];
  if (allDeps.length > 0) {
    const depCmd = getInstallCommand(pm, allDeps);
    logStep("  ", c("dim", depCmd));
    runCmd(depCmd, targetDir, "pipe");
  }
  if (allDevDeps.length > 0) {
    const devDepCmd = getInstallCommand(pm, allDevDeps)
      .replace(" add ", " add -D ")
      .replace(" install ", " install -D ");
    logStep("  ", c("dim", devDepCmd));
    runCmd(devDepCmd, targetDir, "pipe");
  }
  logStep("✓", c("green", "Dependencies installed"));
  // 5. Apply overlay files
  log();
  logStep("✏️ ", "Applying Unified UI starter files...");
  const overlay = OVERLAYS[framework.name];
  if (overlay) {
    for (const [filePath, content] of Object.entries(overlay.files)) {
      const fullPath = join(targetDir, filePath);
      writeOverlay(fullPath, content);
      logStep("✓", c("green", filePath));
    }
  }
  // 6. Git commit (if git was initialized by the scaffold tool)
  const gitDir = join(targetDir, ".git");
  if (existsSync(gitDir)) {
    runCmd("git add -A", targetDir, "pipe");
    runCmd(
      'git commit -m "chore: add Unified UI design system" --no-verify',
      targetDir,
      "pipe",
    );
    logStep("✓", c("green", "Committed Unified UI changes"));
  } else {
    // Initialize git if it wasn't done by the scaffold tool
    if (runCmd("git init", targetDir, "pipe")) {
      runCmd("git add -A", targetDir, "pipe");
      runCmd(
        'git commit -m "chore: initial commit with Unified UI" --no-verify',
        targetDir,
        "pipe",
      );
      logStep("✓", c("green", "Initialized git repository"));
    }
  }
  // 7. Print success
  log();
  logStep("🎉", c("green", `Project "${projectName}" is ready!`));
  log();
  log(`  ${c("dim", "Next steps:")}`);
  log();
  log(`    ${c("cyan", `cd ${projectName}`)}`);
  if (framework.name === "laravel-blade") {
    log(`    ${c("cyan", "npm run dev")}`);
    log(`    ${c("cyan", "php artisan serve")}`);
  } else {
    log(`    ${c("cyan", "npm run dev")}`);
  }
  log();
  if (framework.name === "vuejs" || framework.name === "laravel-blade") {
    log(
      `  ${c("dim", "Note: This template includes design tokens (CSS variables + Tailwind")}`,
    );
    log(
      `  ${c("dim", "utilities) only. React components are not available in this framework.")}`,
    );
    log(`  ${c("dim", "See: https://www.unified-ui.space/docs/tokens")}`);
    log();
  } else {
    log(`  ${c("dim", "Start adding components:")}`);
    log(
      `    ${c("cyan", "npx @work-rjkashyap/unified-ui add button card badge")}`,
    );
    log();
  }
}
async function cmdInit(positional = [], flags = {}) {
  // If --template flag is present, run the full scaffolding flow
  if (flags.template) {
    return cmdInitWithTemplate(positional, flags);
  }
  log();
  log(`  ${c("bold", "Unified UI")} ${c("dim", "— Initialize project")}`);
  log();
  const config = loadConfig();
  if (existsSync(join(config.root, CONFIG_FILE))) {
    const overwrite = await confirm(
      `${c("yellow", CONFIG_FILE)} already exists. Overwrite?`,
    );
    if (!overwrite) {
      logStep("↩", "Cancelled.");
      log();
      return;
    }
  }
  saveConfig(DEFAULT_CONFIG);
  logStep("✓", `Created ${c("cyan", CONFIG_FILE)}`);
  // Create directories
  const srcDir = join(config.root, config.srcDir);
  const dirs = [
    join(srcDir, "components", "ui"),
    join(srcDir, "lib"),
    join(srcDir, "styles"),
  ];
  for (const dir of dirs) {
    mkdirSync(dir, { recursive: true });
    logStep("✓", `Created ${c("dim", dir.replace(`${config.root}/`, ""))}`);
  }
  // Fetch and write the base utilities (cn + focus-ring) and styles
  log();
  logStep("📡", "Fetching base utilities from registry...");
  const baseItems = ["cn", "focus-ring", "styles"];
  for (const name of baseItems) {
    try {
      const item = await fetchJSON(`${REGISTRY_BASE_URL}/${name}.json`);
      for (const file of item.files) {
        const targetPath = resolveTargetPath(config, file);
        writeFile(targetPath, file.content, config, true);
        logStep("✓", `${c("green", file.path)}`);
      }
    } catch {
      logStep("⚠", c("yellow", `Could not fetch ${name} — add manually later`));
    }
  }
  // Install base npm deps
  await installNpmDeps(
    ["class-variance-authority", "clsx", "tailwind-merge", "lucide-react"],
    config.root,
  );
  // Set up Tailwind CSS for Vite projects
  log();
  await setupTailwindForVite(config.root, config);
  log();
  logStep("🎉", c("green", "Project initialized! Start adding components:"));
  log();
  log(`     ${c("cyan", "npx @work-rjkashyap/unified-ui add button")}`);
  log(
    `     ${c("cyan", "npx @work-rjkashyap/unified-ui add card badge tabs")}`,
  );
  log();
}
async function cmdAdd(names, flags = {}) {
  log();
  log(`  ${c("bold", "Unified UI")} ${c("dim", "— Add components")}`);
  log();
  const config = loadConfig();
  if (!existsSync(join(config.root, CONFIG_FILE)) && !flags.yes) {
    const init = await confirm(
      `No ${c("cyan", CONFIG_FILE)} found. Initialize first?`,
    );
    if (init) {
      await cmdInit();
      log();
    }
  }
  // If --all, fetch index and add everything
  if (flags.all) {
    logStep("📡", "Fetching full registry index...");
    try {
      const index = await fetchJSON(`${REGISTRY_BASE_URL}/index.json`);
      names = index.items
        .filter((item) => item.type === "unified-ui:component")
        .map((item) => item.name);
      logStep("✓", `Found ${c("cyan", names.length.toString())} components`);
    } catch (err) {
      logError(`Could not fetch registry index: ${err.message}`);
      return;
    }
  }
  if (names.length === 0) {
    logError(
      "No component names specified. Usage: npx @work-rjkashyap/unified-ui add <component...>",
    );
    return;
  }
  // Resolve the full dependency tree
  logStep(
    "🔍",
    `Resolving dependencies for: ${c("cyan", names.join(", "))}...`,
  );
  const tree = await resolveFullDependencyTree(names, REGISTRY_BASE_URL);
  if (tree.size === 0) {
    logError("No components resolved. Check the names and try again.");
    return;
  }
  // Summarize what will be installed
  const components = [];
  const utils = [];
  const styles = [];
  const allNpmDeps = new Set();
  for (const [name, item] of tree) {
    switch (item.type) {
      case "unified-ui:component":
        components.push(name);
        break;
      case "unified-ui:util":
        utils.push(name);
        break;
      case "unified-ui:styles":
        styles.push(name);
        break;
    }
    for (const dep of item.dependencies || []) {
      allNpmDeps.add(dep);
    }
  }
  log();
  if (components.length > 0) {
    logStep("🧩", `Components: ${c("cyan", components.join(", "))}`);
  }
  if (utils.length > 0) {
    logStep("🔧", `Utilities:  ${c("dim", utils.join(", "))}`);
  }
  if (allNpmDeps.size > 0) {
    logStep("📦", `Packages:   ${c("dim", [...allNpmDeps].join(", "))}`);
  }
  log();
  // Confirm unless --yes
  if (!flags.yes) {
    const proceed = await confirm("Proceed with installation?");
    if (!proceed) {
      logStep("↩", "Cancelled.");
      log();
      return;
    }
    log();
  }
  // Write files
  const results = [];
  const overwrite = flags.overwrite || false;
  for (const [_name, item] of tree) {
    for (const file of item.files) {
      const targetPath = resolveTargetPath(config, file);
      const result = writeFile(targetPath, file.content, config, overwrite);
      results.push(result);
    }
  }
  // Report file results
  const created = results.filter((r) => r.status === "created");
  const skipped = results.filter((r) => r.status === "skipped");
  for (const r of created) {
    logStep("✓", c("green", r.path.replace(`${config.root}/`, "")));
  }
  if (skipped.length > 0) {
    log();
    for (const r of skipped) {
      logStep(
        "↩",
        `${c("dim", r.path.replace(`${config.root}/`, ""))} ${c("yellow", "(exists, skipped)")}`,
      );
    }
    log();
    logStep("💡", c("dim", "Use --overwrite to replace existing files."));
  }
  // Install npm dependencies
  const depsToInstall = [...allNpmDeps].filter((dep) => {
    // Check if already in package.json
    try {
      const pkg = JSON.parse(
        readFileSync(join(config.root, "package.json"), "utf-8"),
      );
      const allPkgDeps = {
        ...pkg.dependencies,
        ...pkg.devDependencies,
        ...pkg.peerDependencies,
      };
      return !allPkgDeps[dep];
    } catch {
      return true;
    }
  });
  if (depsToInstall.length > 0) {
    log();
    await installNpmDeps(depsToInstall, config.root);
  }
  log();
  logStep("🎉", c("green", `Done! ${created.length} file(s) added.`));
  log();
}
async function cmdList() {
  log();
  log(`  ${c("bold", "Unified UI")} ${c("dim", "— Available components")}`);
  log();
  try {
    const index = await fetchJSON(`${REGISTRY_BASE_URL}/index.json`);
    // Group by category
    const groups = {};
    for (const item of index.items) {
      if (item.type !== "unified-ui:component") continue;
      const cat = item.category || "other";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    }
    // Find category labels
    const catLabels = {};
    for (const cat of index.categories || []) {
      catLabels[cat.name] = cat.label;
    }
    for (const [cat, items] of Object.entries(groups)) {
      log(`  ${c("bold", catLabels[cat] || cat)}`);
      for (const item of items) {
        const deps =
          item.registryDependencies?.length > 0
            ? c("dim", ` → ${item.registryDependencies.join(", ")}`)
            : "";
        log(
          `    ${c("cyan", item.name.padEnd(22))} ${c("dim", item.description || "")}${deps}`,
        );
      }
      log();
    }
    log(`  ${c("dim", `${index.totalItems} items total`)}`);
    log();
    log(
      `  ${c("dim", "Add a component:")} npx @work-rjkashyap/unified-ui add ${c("cyan", "<name>")}`,
    );
    log();
  } catch (err) {
    logError(`Could not fetch registry: ${err.message}`);
  }
}
async function cmdDiff(names) {
  log();
  log(`  ${c("bold", "Unified UI")} ${c("dim", "— Diff local vs registry")}`);
  log();
  const config = loadConfig();
  for (const name of names) {
    try {
      const item = await fetchJSON(`${REGISTRY_BASE_URL}/${name}.json`);
      for (const file of item.files) {
        const targetPath = resolveTargetPath(config, file);
        if (!existsSync(targetPath)) {
          logStep("✗", `${c("red", name)}: not installed locally`);
          continue;
        }
        const localContent = readFileSync(targetPath, "utf-8");
        const registryContent = rewriteContentImports(file.content, config);
        if (localContent === registryContent) {
          logStep("✓", `${c("green", name)}: up to date`);
        } else {
          logStep("~", `${c("yellow", name)}: local changes detected`);
        }
      }
    } catch (err) {
      logStep("✗", `${c("red", name)}: ${err.message}`);
    }
  }
  log();
}
function cmdHelp() {
  log();
  log(`  ${c("bold", "Unified UI")} ${c("dim", "— Component Registry CLI")}`);
  log();
  log("  Usage:");
  log(
    `    ${c("cyan", "npx @work-rjkashyap/unified-ui")} ${c("green", "<command>")} [options]`,
  );
  log();
  log("  Commands:");
  log(
    `    ${c("green", "init")}                        Initialize existing project (copy-paste mode)`,
  );
  log(
    `    ${c("green", "init")} -t <framework>          Scaffold a new project with full setup`,
  );
  log(
    `    ${c("green", "add")} <component...>          Add component(s) with dependencies`,
  );
  log(`    ${c("green", "add")} --all                   Add all components`);
  log(
    `    ${c("green", "list")}                        List all available components`,
  );
  log(
    `    ${c("green", "diff")} <component...>         Compare local files with registry`,
  );
  log(
    `    ${c("green", "help")}                        Show this help message`,
  );
  log();
  log("  Templates (for init -t):");
  log(
    `    ${c("cyan", "vite-react")}        Vite + React 19 SPA with full component library`,
  );
  log(
    `    ${c("cyan", "nextjs")}            Next.js App Router with SSR + full component library`,
  );
  log(
    `    ${c("cyan", "vuejs")}             Vue 3 + Vite with UI components & Tailwind theme`,
  );
  log(
    `    ${c("cyan", "laravel-blade")}     Laravel with Blade UI components & Tailwind theme`,
  );
  log();
  log("  Options:");
  log(
    `    ${c("yellow", "--template, -t")}              Framework template (with 'init')`,
  );
  log(
    `    ${c("yellow", "--yes, -y")}                   Skip confirmation prompts`,
  );
  log(
    `    ${c("yellow", "--overwrite")}                 Overwrite existing files`,
  );
  log(
    `    ${c("yellow", "--all")}                       Add all components (with 'add')`,
  );
  log();
  log("  Examples:");
  log(`    ${c("dim", "# Scaffold a new project (interactive)")} `);
  log(`    npx @work-rjkashyap/unified-ui init -t`);
  log();
  log(`    ${c("dim", "# Scaffold with specific framework")}`);
  log(`    npx @work-rjkashyap/unified-ui init -t nextjs my-app`);
  log(`    npx @work-rjkashyap/unified-ui init --template vite-react my-app`);
  log();
  log(`    ${c("dim", "# Initialize existing project (copy-paste mode)")} `);
  log(`    npx @work-rjkashyap/unified-ui init`);
  log();
  log(`    ${c("dim", "# Add specific components")}`);
  log(`    npx @work-rjkashyap/unified-ui add button card badge`);
  log();
  log(`    ${c("dim", "# Add all components, skip prompts")}`);
  log(`    npx @work-rjkashyap/unified-ui add --all -y`);
  log();
  log(`    ${c("dim", "# Check for upstream changes")}`);
  log(`    npx @work-rjkashyap/unified-ui diff button card`);
  log();
  log(`  Registry: ${c("cyan", REGISTRY_BASE_URL)}`);
  log();
}
// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------
function parseArgs(argv) {
  const args = argv.slice(2);
  const command = args[0];
  const flags = {};
  const positional = [];
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--yes" || arg === "-y") {
      flags.yes = true;
    } else if (arg === "--overwrite") {
      flags.overwrite = true;
    } else if (arg === "--all") {
      flags.all = true;
    } else if (arg === "--template" || arg === "-t") {
      // Next arg is the template name (or true if none given)
      const next = args[i + 1];
      if (next && !next.startsWith("-")) {
        flags.template = next;
        i++;
      } else {
        flags.template = true; // Will trigger interactive picker
      }
    } else if (arg.startsWith("--template=")) {
      flags.template = arg.split("=")[1];
    } else if (arg.startsWith("-t=")) {
      flags.template = arg.split("=")[1];
    } else if (arg.startsWith("--registry=")) {
      flags.registryUrl = arg.split("=")[1];
    } else if (!arg.startsWith("-")) {
      positional.push(arg);
    }
  }
  return { command, positional, flags };
}
// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const { command, positional, flags } = parseArgs(process.argv);
  // Allow custom registry URL
  if (flags.registryUrl) {
    // Override the global — we use a let binding workaround below.
    // (The const REGISTRY_BASE_URL is used by all functions via closure.)
    // For simplicity, we set an env var that's already checked at the top.
    process.env.UNIFIED_UI_REGISTRY_URL = flags.registryUrl;
  }
  switch (command) {
    case "init":
      await cmdInit(positional, flags);
      break;
    case "add":
      await cmdAdd(positional, flags);
      break;
    case "list":
    case "ls":
      await cmdList();
      break;
    case "diff":
      await cmdDiff(positional);
      break;
    case "help":
    case "--help":
    case "-h":
    case undefined:
      cmdHelp();
      break;
    default:
      logError(
        `Unknown command: "${command}". Run "npx @work-rjkashyap/unified-ui help" for usage.`,
      );
      process.exit(1);
  }
}
main().catch((err) => {
  logError(err.message);
  process.exit(1);
});
