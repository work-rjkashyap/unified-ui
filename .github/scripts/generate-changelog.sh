#!/usr/bin/env bash
set -euo pipefail

# ============================================================================
# generate-changelog.sh
# ============================================================================
# Generates the full CHANGELOG.md for the design system package using git-cliff.
#
# How it works:
#   1. Uses git-cliff to generate a complete changelog from all tags + HEAD
#   2. Prepends the standard header (Keep a Changelog + SemVer notice)
#   3. Writes to packages/unified-ui/CHANGELOG.md
#
# On every push to main (via CI), this regenerates the changelog so that:
#   - Tagged versions get their own ## [x.y.z] — YYYY-MM-DD sections
#   - Commits after the latest tag land in ## [Unreleased]
#
# Requirements:
#   - git-cliff (installed via npx in CI)
#   - cliff.toml at repo root
#   - Git tags matching v[0-9]*.* for each published version
#   - GITHUB_REPOSITORY env var (set by GitHub Actions)
#
# Usage:
#   bash .github/scripts/generate-changelog.sh
# ============================================================================

CHANGELOG_FILE="packages/unified-ui/CHANGELOG.md"

HEADER="# Changelog

All notable changes to the **Unified UI** design system will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
"

# ── Generate changelog body with git-cliff ──────────────────────────────────
echo "📝 Generating changelog with git-cliff..."

# Generate the full changelog (all tags + unreleased)
BODY=$(npx --yes git-cliff --config cliff.toml 2>/dev/null || echo "")

if [ -z "$BODY" ]; then
  echo "⚠️  git-cliff produced no output — skipping."
  exit 0
fi

# ── Write the changelog ─────────────────────────────────────────────────────
mkdir -p "$(dirname "$CHANGELOG_FILE")"

printf '%s\n%s\n' "$HEADER" "$BODY" > "$CHANGELOG_FILE"

# ── Check if anything actually changed ──────────────────────────────────────
if git diff --quiet "$CHANGELOG_FILE" 2>/dev/null; then
  echo "✅ Changelog is already up to date."
else
  echo "✅ Changelog updated: $CHANGELOG_FILE"
fi
