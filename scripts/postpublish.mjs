#!/usr/bin/env node
// ============================================================================
// postpublish.mjs — Auto-tag & push after npm publish
// ============================================================================
// Called automatically by the `postpublish` lifecycle hook in
// packages/unified-ui/package.json.
//
// What it does:
//   1. Reads the version from packages/unified-ui/package.json
//   2. Creates an annotated git tag `v{version}` (skips if it already exists)
//   3. Pushes the tag to origin
//   4. Regenerates the changelog so the new version appears as a headed
//      section instead of "[Unreleased]"
//
// This triggers the GitHub Actions release workflow (.github/workflows/release.yml)
// which publishes a GitHub Release with changelog notes.
// ============================================================================

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PKG_PATH = resolve(ROOT, "packages/unified-ui/package.json");

// ── Read version ────────────────────────────────────────────────────────────

const pkg = JSON.parse(readFileSync(PKG_PATH, "utf-8"));
const version = pkg.version;
const tag = `v${version}`;

console.log(`\n📦 Published @work-rjkashyap/unified-ui@${version}`);

// ── Helper: run a shell command ─────────────────────────────────────────────

function run(cmd, { silent = false } = {}) {
	try {
		return execSync(cmd, {
			cwd: ROOT,
			stdio: silent ? "pipe" : "inherit",
			encoding: "utf-8",
		});
	} catch {
		return null;
	}
}

// ── Check if tag already exists ─────────────────────────────────────────────

const existingTag = run(`git tag -l "${tag}"`, { silent: true })?.trim();

if (existingTag === tag) {
	console.log(`⚠️  Tag ${tag} already exists — skipping tag creation.`);
} else {
	// ── Create annotated tag ────────────────────────────────────────────────
	console.log(`🏷️  Creating tag ${tag}...`);
	run(`git tag -a "${tag}" -m "Release ${tag}"`);

	// ── Push tag to origin ──────────────────────────────────────────────────
	console.log(`🚀 Pushing tag ${tag} to origin...`);
	const pushResult = run(`git push origin "${tag}"`);

	if (pushResult === null) {
		console.error(`❌ Failed to push tag ${tag}. Push it manually:`);
		console.error(`   git push origin ${tag}`);
		// Don't fail the publish — the package is already on npm
	} else {
		console.log(`✅ Tag ${tag} pushed — GitHub Release workflow will trigger.`);
	}
}

// ── Regenerate changelog locally ────────────────────────────────────────────

console.log("📝 Regenerating changelog...");
const cliffResult = run("bash .github/scripts/generate-changelog.sh");

if (cliffResult === null) {
	console.log(
		"⚠️  Changelog generation skipped (git-cliff not installed locally).",
	);
	console.log(
		"   The GitHub Actions workflow will update it on the next push to main.",
	);
} else {
	console.log("✅ Changelog updated with release version.\n");
}
