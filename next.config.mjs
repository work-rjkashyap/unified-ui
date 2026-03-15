import bundleAnalyzer from "@next/bundle-analyzer";
import { readFileSync } from "node:fs";
import { createMDX } from "fumadocs-mdx/next";

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
	// Only open the browser automatically when explicitly requested and not in CI.
	// - OPEN_ANALYZER=true  → open browser (local use)
	// - CI=true             → never open (headless / automated runs)
	openAnalyzer:
		process.env.OPEN_ANALYZER === "true" && process.env.CI !== "true",
});

const dsPkg = JSON.parse(
	readFileSync("packages/unified-ui/package.json", "utf-8"),
);

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,

	env: {
		NEXT_PUBLIC_DS_VERSION: dsPkg.version,
	},

	// ---------------------------------------------------------------------------
	// Bundle Optimization (Vercel best practice: bundle-barrel-imports)
	// ---------------------------------------------------------------------------
	// Auto-rewrite barrel imports to direct imports at build time.
	// This avoids pulling in the entire module graph for libraries with large
	// barrel files (e.g. lucide-react re-exports 1,500+ icons).
	experimental: {
		optimizePackageImports: [
			"lucide-react",
			"recharts",
			"framer-motion",
			"@work-rjkashyap/unified-ui",
		],
	},

	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
		],
	},

	// ---------------------------------------------------------------------------
	// Design System Resolution
	// ---------------------------------------------------------------------------
	// npm workspaces symlinks @work-rjkashyap/unified-ui → packages/unified-ui
	// automatically. No custom aliases needed.
	//
	// Development  → workspace symlink resolves to local packages/unified-ui.
	//                transpilePackages lets Next.js compile the source on the fly.
	//                Run `npm run dev:ds` (tsup --watch) alongside `npm run dev`
	//                so the local dist stays fresh, OR just run `npm run build:ds`
	//                once before starting dev.
	//
	// Production   → same workspace symlink, but dist is already built by the
	//                `build:ds` step. On Vercel, the build command should be:
	//                  npm run build:ds && npm run build
	//                This ensures the docs site always ships with the latest
	//                local build of the design system.
	//
	// To use the npm-published version instead of local on production deploys,
	// set the Vercel install command to:
	//                  npm install --install-strategy=nested
	// which bypasses the workspace symlink for @work-rjkashyap/unified-ui.
	// ---------------------------------------------------------------------------
	transpilePackages: ["@work-rjkashyap/unified-ui"],

	async rewrites() {
		return [
			{
				source: "/docs/:path*.mdx",
				destination: "/llms.mdx/docs/:path*",
			},
			{
				source: "/laravel/:path*.mdx",
				destination: "/llms.mdx/docs/:path*",
			},
		];
	},
};

export default withBundleAnalyzer(withMDX(config));
