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
//   https://unified-ui-rajeshwar.vercel.app/r/<name>.json
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

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { createInterface } from "node:readline";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const REGISTRY_BASE_URL =
  process.env.UNIFIED_UI_REGISTRY_URL ||
  "https://unified-ui-rajeshwar.vercel.app/r";

const CONFIG_FILE = "unified-ui.json";

const DEFAULT_CONFIG = {
  $schema: "https://unified-ui-rajeshwar.vercel.app/r/schema/config.json",
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

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
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
  writeFileSync(configPath, JSON.stringify(rest, null, 2) + "\n");
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
  if (existsSync(join(root, "bun.lock")) || existsSync(join(root, "bun.lockb"))) return "bun";
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
  } catch (err) {
    logStep(
      "⚠",
      c("yellow", `Auto-install failed. Run manually:\n     ${cmd}`),
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

async function cmdInit() {
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
    logStep("✓", `Created ${c("dim", dir.replace(config.root + "/", ""))}`);
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
    ["class-variance-authority", "clsx", "tailwind-merge"],
    config.root,
  );

  log();
  logStep("🎉", c("green", "Project initialized! Start adding components:"));
  log();
  log(`     ${c("cyan", "npx @work-rjkashyap/unified-ui add button")}`);
  log(`     ${c("cyan", "npx @work-rjkashyap/unified-ui add card badge tabs")}`);
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
    logError("No component names specified. Usage: npx @work-rjkashyap/unified-ui add <component...>");
    return;
  }

  // Resolve the full dependency tree
  logStep("🔍", `Resolving dependencies for: ${c("cyan", names.join(", "))}...`);
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
    logStep("✓", c("green", r.path.replace(config.root + "/", "")));
  }

  if (skipped.length > 0) {
    log();
    for (const r of skipped) {
      logStep(
        "↩",
        `${c("dim", r.path.replace(config.root + "/", ""))} ${c("yellow", "(exists, skipped)")}`,
      );
    }
    log();
    logStep(
      "💡",
      c("dim", "Use --overwrite to replace existing files."),
    );
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
  logStep(
    "🎉",
    c("green", `Done! ${created.length} file(s) added.`),
  );
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
        log(`    ${c("cyan", item.name.padEnd(22))} ${c("dim", item.description || "")}${deps}`);
      }
      log();
    }

    log(`  ${c("dim", `${index.totalItems} items total`)}`);
    log();
    log(`  ${c("dim", "Add a component:")} npx @work-rjkashyap/unified-ui add ${c("cyan", "<name>")}`);
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
  log(`    ${c("cyan", "npx @work-rjkashyap/unified-ui")} ${c("green", "<command>")} [options]`);
  log();
  log("  Commands:");
  log(`    ${c("green", "init")}                        Initialize project config & base utils`);
  log(`    ${c("green", "add")} <component...>          Add component(s) with dependencies`);
  log(`    ${c("green", "add")} --all                   Add all components`);
  log(`    ${c("green", "list")}                        List all available components`);
  log(`    ${c("green", "diff")} <component...>         Compare local files with registry`);
  log(`    ${c("green", "help")}                        Show this help message`);
  log();
  log("  Options:");
  log(`    ${c("yellow", "--yes, -y")}                   Skip confirmation prompts`);
  log(`    ${c("yellow", "--overwrite")}                 Overwrite existing files`);
  log(`    ${c("yellow", "--all")}                       Add all components (with 'add')`);
  log();
  log("  Examples:");
  log(`    ${c("dim", "# Initialize project")} `);
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
      await cmdInit();
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
      logError(`Unknown command: "${command}". Run "npx @work-rjkashyap/unified-ui help" for usage.`);
      process.exit(1);
  }
}

main().catch((err) => {
  logError(err.message);
  process.exit(1);
});
