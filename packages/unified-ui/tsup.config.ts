import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";

import { dirname, extname, join, relative } from "node:path";
import { analyzeMetafile } from "esbuild";
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
 *
 * Uses a synchronous recursive walk instead of `node:fs/promises` glob so
 * that the config is compatible with Node 20 (glob was only added in Node 22).
 */
function collectEntries(srcDir: string): Record<string, string> {
  const entries: Record<string, string> = {};

  for (const filePath of walk(srcDir)) {
    if (!/\.(tsx?)$/.test(filePath)) continue;
    const normalized = relative(srcDir, filePath).replace(/\\/g, "/");
    const key = normalized.replace(/\.(tsx?)$/, "");
    entries[key] = filePath;
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
 *
 * Extension appending (.mjs / .cjs) is handled separately by rewriteExtensions,
 * which runs immediately after this step.
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
 * Rewrite all relative import/require specifiers that are missing a file
 * extension to include the correct extension for the output format.
 *
 * With `bundle: false` and custom `outExtension` (.mjs / .cjs), esbuild
 * emits extensionless relative specifiers like `require("../utils/cn")` or
 * `from "../utils/cn"`. Node's module resolution requires explicit extensions
 * for non-.js files — it will NOT fall back from `cn` → `cn.cjs`. This step
 * appends the matching extension to every relative specifier that lacks one.
 *
 * Directory imports (e.g. `from "./motion"` where `dist/motion/` is a
 * directory) are resolved to their index file: `"./motion/index.mjs"`.
 * This mirrors Node's CommonJS directory-index resolution, which does NOT
 * apply to ESM or to non-.js extensions.
 *
 * IMPORTANT: The specifier capture group must be greedy (`[^'"]+` without `?`)
 * so it consumes the full path up to the closing quote. A lazy quantifier
 * stops too early and inserts the extension mid-path (e.g. `./c.cjsomponents`).
 */
function rewriteExtensions(distDir: string) {
  const allFiles = walk(distDir).filter((f) =>
    ALL_EXTENSIONS.some((ext) => f.endsWith(ext)),
  );

  for (const filePath of allFiles) {
    const fileDir = dirname(filePath);
    const outputExt = extname(filePath) as ".mjs" | ".cjs";

    let content: string;
    try {
      content = readFileSync(filePath, "utf-8");
    } catch {
      continue;
    }

    const rewritten = content.replace(
      // Match relative import/require specifiers in ESM and CJS output.
      // Capture groups:
      //   1. prefix  — the opening keyword + quote  (from " | require(")
      //   2. specifier — the full path starting with ./ or ../  (GREEDY)
      //   3. suffix  — the closing quote (and optional paren for CJS)
      //
      // The specifier group is intentionally greedy ([^'"]+) so it captures
      // the entire path before the closing quote.  A lazy quantifier would
      // stop at the first character that satisfies the suffix, injecting the
      // extension in the middle of the path.
      /((?:from|require)\s*\(\s*["']|from\s*["'])(\.{1,2}\/[^'"]+)(["'](?:\s*\))?)/g,
      (match, prefix, specifier, suffix) => {
        // Skip specifiers that already have an explicit file extension
        // (.mjs, .cjs, .js, .json, .css, etc.)
        if (/\.[a-z]+$/i.test(specifier)) return match;

        // Resolve the absolute path this specifier points to on disk.
        const resolvedBase = join(fileDir, specifier);

        // Check whether the specifier resolves to a directory that contains
        // an index file (e.g. `./motion` → `dist/motion/index.cjs`).
        // If so, rewrite it to the explicit `./motion/index.mjs` form so
        // that Node can find the file regardless of resolution mode.
        let indexCandidate: string;
        try {
          if (statSync(resolvedBase).isDirectory()) {
            indexCandidate = `${specifier}/index${outputExt}`;
            return `${prefix}${indexCandidate}${suffix}`;
          }
        } catch {
          // resolvedBase does not exist as a directory — fall through to the
          // plain extension-append path below.
        }

        return `${prefix}${specifier}${outputExt}${suffix}`;
      },
    );

    if (rewritten !== content) {
      writeFileSync(filePath, rewritten, "utf-8");
    }
  }

  console.log("✅ Appended explicit extensions to all relative imports");
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

const ANALYZE = process.env.ANALYZE === "true";

export default defineConfig(() => {
  const srcDir = join(__dirname, "src");
  const distDir = join(__dirname, "dist");
  const entries = collectEntries(srcDir);

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
    // -------------------------------------------------------------------------
    // Bundle analysis — only active when ANALYZE=true (npm run analyze).
    //
    // tsup uses esbuild under the hood, not Rollup, so rollup-plugin-visualizer
    // cannot be wired in as a plugin. Instead we use tsup's built-in
    // `metafile: true` option which writes dist/metafile-esm.json and
    // dist/metafile-cjs.json, then feed the ESM metafile into esbuild's own
    // `analyzeMetafile` for a rich terminal report. The raw metafile JSON is
    // also retained in dist/ so it can be uploaded to https://esbuild.github.io/analyze/
    // for an interactive treemap visualisation.
    // -------------------------------------------------------------------------
    ...(ANALYZE ? { metafile: true } : {}),
    async onSuccess() {
      // Order matters:
      // 1. rewriteAliases — converts @unified-ui/* bare specifiers to relative
      //    paths (already appends the correct extension as part of the rewrite).
      // 2. rewriteExtensions — appends .mjs/.cjs to any remaining relative
      //    specifiers that esbuild emitted without an extension (e.g. internal
      //    cross-layer imports that don't use the @unified-ui/* alias).
      // 3. patchUseClient — must run last so it sees the final file content
      //    when checking whether the directive is already present.
      rewriteAliases(distDir);
      rewriteExtensions(distDir);
      patchUseClient(distDir);

      if (ANALYZE) {
        // tsup writes metafile-esm.json when metafile:true is set.
        const metaPath = join(distDir, "metafile-esm.json");
        if (statSync(metaPath, { throwIfNoEntry: false })?.isFile()) {
          const meta = readFileSync(metaPath, "utf-8");
          // analyzeMetafile prints a human-readable breakdown of every module,
          // its size, and what imported it — equivalent to webpack-bundle-analyzer
          // but for esbuild output.
          const report = await analyzeMetafile(meta, { verbose: false });
          console.log("\n📊 Bundle analysis (ESM):\n");
          console.log(report);
          console.log(
            "💡 For an interactive treemap upload dist/metafile-esm.json to:",
          );
          console.log("   https://esbuild.github.io/analyze/\n");
        } else {
          console.warn("⚠  ANALYZE=true but dist/metafile-esm.json not found.");
        }
      }

      console.log("✅ Build complete — modules preserved for tree-shaking");
    },
  };
});
