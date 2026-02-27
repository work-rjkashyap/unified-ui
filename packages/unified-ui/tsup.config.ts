import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "tsup";

// ---------------------------------------------------------------------------
// Entry points that need the "use client" directive for RSC compatibility.
// Tokens and utils are pure JS — no React, no directive needed.
// ---------------------------------------------------------------------------
const CLIENT_ENTRIES = ["index", "theme", "primitives", "components", "motion"];

const ALL_EXTENSIONS = [".mjs", ".cjs"];

/**
 * Prepend `"use client";` to the built files that need it.
 * This runs *after* the JS build completes, so rollup never sees the
 * directive and we avoid the "module level directives" warnings entirely.
 */
function patchUseClient() {
  const distDir = join(__dirname, "dist");
  const directive = '"use client";\n';

  for (const entry of CLIENT_ENTRIES) {
    for (const ext of ALL_EXTENSIONS) {
      const filePath = join(distDir, `${entry}${ext}`);
      try {
        const content = readFileSync(filePath, "utf-8");
        if (!content.startsWith('"use client"')) {
          writeFileSync(filePath, directive + content, "utf-8");
        }
      } catch {
        // File might not exist (e.g. if splitting produced only chunks)
      }
    }
  }
}

export default defineConfig({
  entry: {
    index: "src/index.ts",
    tokens: "src/tokens/index.ts",
    theme: "src/theme/index.ts",
    primitives: "src/primitives/index.ts",
    components: "src/components/index.ts",
    motion: "src/motion/index.ts",
    utils: "src/utils/index.ts",
  },
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
  splitting: true,
  treeshake: true,
  clean: true,
  outDir: "dist",
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
  ],
  async onSuccess() {
    patchUseClient();
    console.log('✅ Patched "use client" directive into client entry points');
  },
});
