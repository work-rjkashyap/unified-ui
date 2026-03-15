import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { glob } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { defineConfig } from "tsup";

// ---------------------------------------------------------------------------
// Pure (no-React) layers — these never need "use client"
// ---------------------------------------------------------------------------
const PURE_DIRS = ["tokens", "utils"];

// ---------------------------------------------------------------------------
// Extensions produced for each format
// ---------------------------------------------------------------------------
const ALL_EXTENSIONS = [".mjs", ".cjs"];

// ---------------------------------------------------------------------------
// @unified-ui/* alias → src/ subdirectory mapping.
// These are the internal path aliases defined in tsconfig.json. With
// bundle:false, esbuild runs in transpile-only mode and does NOT rewrite
// them. We fix this up in a post-build step.
// ---------------------------------------------------------------------------
const ALIAS_MAP: Record<string, string> = {
  "@unified-ui/utils": "utils",
  "@unified-ui/tokens": "tokens",
  "@unified-ui/theme": "theme",
  "@unified-ui/primitives": "primitives",
  "@unified-ui/components": "components",
  "@unified-ui/motion": "motion",
  // Bare alias last — most specific prefixes must come first
  "@unified-ui": "",
};

/**
 * Collect every .ts / .tsx source file under src/ and return an entry map
 * keyed by the relative path without extension (e.g. "components/button").
 *
 * Passing every source file as an explicit entry combined with `bundle: false`
 * makes tsup emit one output file per source module — the equivalent of
 * Rollup's `preserveModules: true` — so consumers' bundlers (Vite, Webpack,
 * Rollup) can tree-shake at the individual component level.
 */
async function collectEntries(srcDir: string): Promise<Record<string, string>> {
  const entries: Record<string, string> = {};

  for await (const file of glob("**/*.{ts,tsx}", { cwd: srcDir })) {
    const normalized = file.replace(/\\/g, "/");
    const key = normalized.replace(/\.(tsx?)$/, "");
    entries[key] = join(srcDir, normalized);
  }

  return entries;
}

/**
 * Walk a directory recursively and collect all file paths.
 */
function walk(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...walk(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

/**
 * Rewrite all `@unified-ui/*` import specifiers in emitted JS files to
 * correct relative paths.
 *
 * With `bundle: false`, esbuild runs in transpile-only mode and does NOT
 * resolve tsconfig path aliases. This means emitted files contain bare
 * `@unified-ui/utils/cn` specifiers that no consumer bundler can resolve
 * (there is no npm package named `@unified-ui`). This step fixes that by
 * computing the correct relative path from each emitted file to the target.
 *
 * Example: dist/components/button.mjs imports "@unified-ui/utils/cn"
 *   → resolved target dir in dist: dist/utils/
 *   → relative from dist/components/ to dist/utils/cn → "../utils/cn"
 *   → final specifier: "../utils/cn"
 */
function rewriteAliases(distDir: string) {
  // We only rewrite JS output files, not .d.ts (the DTS build uses its own
  // tsconfig paths resolution and handles aliases correctly).
  const allFiles = walk(distDir).filter((f) =>
    ALL_EXTENSIONS.some((ext) => f.endsWith(ext)),
  );

  for (const filePath of allFiles) {
    const fileDir = dirname(filePath);

    let content: string;
    try {
      content = readFileSync(filePath, "utf-8");
    } catch {
      continue;
    }

    // Quick exit — no aliases in this file
    if (!content.includes("@unified-ui")) continue;

    const rewritten = content.replace(
      // Match ESM:  from "@unified-ui/utils/cn"
      //       CJS:  require("@unified-ui/utils/cn")
      /((?:from|require)\s*\(\s*["']|from\s*["'])(@unified-ui(?:\/[^'"]+)?)(['"\s]*\)?)/g,
      (_, prefix, specifier, suffix) => {
        // Find the longest matching alias prefix (most-specific first)
        let targetSubdir = "";
        let remainder = "";

        for (const [alias, subdir] of Object.entries(ALIAS_MAP)) {
          if (specifier === alias) {
            // Exact match — e.g. "@unified-ui/motion"
            targetSubdir = subdir;
            remainder = "";
            break;
          }
          if (specifier.startsWith(`${alias}/`)) {
            // Prefix match — e.g. "@unified-ui/utils/cn"
            targetSubdir = subdir;
            remainder = specifier.slice(alias.length + 1); // strip "alias/"
            break;
          }
        }

        // Build the absolute path to the target file inside dist/.
        // The alias always resolves relative to the dist root (mirrors src/).
        const targetPath = join(distDir, targetSubdir, remainder || "index");

        // Compute the relative path from this file's directory to the target.
        let rel = relative(fileDir, targetPath).replace(/\\/g, "/");

        // Ensure it starts with "./" or "../"
        if (!rel.startsWith(".")) {
          rel = `./${rel}`;
        }

        // Preserve the original closing delimiter(s) exactly —
        // ESM suffix is just `"` or `'`, CJS suffix includes `")` or `" )`
        return `${prefix}${rel}${suffix}`;
      },
    );

    if (rewritten !== content) {
      writeFileSync(filePath, rewritten, "utf-8");
    }
  }

  // Quick sanity check — report any remaining unresolved aliases
  let unresolved = 0;
  for (const filePath of allFiles) {
    try {
      if (readFileSync(filePath, "utf-8").includes("@unified-ui")) {
        unresolved++;
        console.warn(
          `  ⚠  Unresolved @unified-ui alias in: ${relative(distDir, filePath)}`,
        );
      }
    } catch {
      // ignore
    }
  }
  if (unresolved === 0) {
    console.log("✅ All @unified-ui/* aliases rewritten to relative paths");
  }
}

/**
 * Post-build: prepend `"use client";` to every emitted JS file that belongs
 * to a React-bearing layer (components, primitives, theme, motion).
 *
 * With `bundle: false` each source file is emitted 1-to-1, so individual
 * component files that already carry `"use client"` in source come out
 * correct automatically. The barrel index files (e.g. components/index.ts)
 * do NOT have the directive in source — we patch them here.
 *
 * Token and utility files are skipped entirely — they are pure JS with no
 * React dependency and must not carry the directive.
 */
function patchUseClient(distDir: string) {
  const directive = '"use client";\n';

  const allFiles = walk(distDir).filter((f) =>
    ALL_EXTENSIONS.some((ext) => f.endsWith(ext)),
  );

  for (const filePath of allFiles) {
    const rel = relative(distDir, filePath).replace(/\\/g, "/");
    const topSegment = rel.split("/")[0].replace(/\.(mjs|cjs)$/, "");

    // Skip pure layers — tokens and utils carry no React, no directive needed
    if (PURE_DIRS.some((d) => rel.startsWith(`${d}/`) || topSegment === d)) {
      continue;
    }

    try {
      const content = readFileSync(filePath, "utf-8");
      // Check the first two lines — CJS files start with `"use strict"` so
      // the original source-level `"use client"` appears on line 2.
      const firstTwoLines = content.split("\n", 2).join("\n");
      if (!firstTwoLines.includes('"use client"')) {
        writeFileSync(filePath, directive + content, "utf-8");
      }
    } catch {
      // Safe to skip if a file is missing
    }
  }

  console.log('✅ Patched "use client" directive into client module files');
}

export default defineConfig(async () => {
  const srcDir = join(__dirname, "src");
  const distDir = join(__dirname, "dist");
  const entries = await collectEntries(srcDir);

  return {
    entry: entries,
    format: ["esm", "cjs"],
    dts: {
      compilerOptions: {
        incremental: false,
        composite: false,
        tsBuildInfoFile: undefined,
        paths: {
          "@unified-ui": ["./src/index.ts"],
          "@unified-ui/*": ["./src/*"],
        },
      },
    },
    // -------------------------------------------------------------------------
    // bundle: false — the key change that fixes tree-shaking.
    //
    // Instead of merging all modules into a small set of pre-bundled chunks
    // (which prevents consumers from tree-shaking unused components), tsup
    // transpiles each source file individually and emits it at the matching
    // path inside dist/. This mirrors the src/ directory structure 1-to-1.
    //
    // Consumers' bundlers (Vite, Webpack, Rollup) then receive proper ESM
    // with individual module boundaries and can eliminate any component that
    // is not imported by the application.
    // -------------------------------------------------------------------------
    bundle: false,
    clean: true,
    outDir: distDir,
    tsconfig: "tsconfig.json",
    outExtension({ format }) {
      return {
        js: format === "esm" ? ".mjs" : ".cjs",
      };
    },
    external: [
      "react",
      "react-dom",
      "framer-motion",
      "tailwindcss",
      "class-variance-authority",
      "tailwind-merge",
      "clsx",
      // Radix UI primitives — must not be bundled
      /^@radix-ui\//,
      // Optional / peer dependencies
      "@tanstack/react-table",
      "sonner",
      "vaul",
      "react-resizable-panels",
    ],
    async onSuccess() {
      // Order matters: rewrite aliases first so patchUseClient reads the
      // already-correct files (the directive check looks at file content).
      rewriteAliases(distDir);
      patchUseClient(distDir);
      console.log("✅ Build complete — modules preserved for tree-shaking");
    },
  };
});
