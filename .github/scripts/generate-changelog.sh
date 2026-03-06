#!/usr/bin/env bash
set -euo pipefail

# ============================================================================
# generate-changelog.sh
# ============================================================================
# Scans conventional commits since the last tag / changelog bot commit,
# parses them, and prepends new entries into the [Unreleased] section of
# CHANGELOG.md.
#
# Required env vars:
#   GITHUB_REPOSITORY  — e.g. "imrj05/unified-ui" (set by GitHub Actions)
#
# Usage:
#   bash .github/scripts/generate-changelog.sh
# ============================================================================

CHANGELOG_FILE="packages/unified-ui/CHANGELOG.md"

# ── Find the last tag or the last changelog bot commit ──────────────────────
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
if [ -n "$LAST_TAG" ]; then
  echo "📌 Last tag: $LAST_TAG"
  SINCE_REF="$LAST_TAG"
else
  BOT_COMMIT=$(git log --all --oneline --author="github-actions\[bot\]" \
    --grep="chore(changelog)" -1 --format="%H" 2>/dev/null || echo "")
  if [ -n "$BOT_COMMIT" ]; then
    echo "📌 Last changelog commit: $(git log --oneline -1 "$BOT_COMMIT")"
    SINCE_REF="$BOT_COMMIT"
  else
    echo "📌 No tag or changelog commit found — using last 50 commits"
    SINCE_REF="HEAD~50"
  fi
fi

# ── Collect conventional commits since last reference ───────────────────────
echo ""
echo "📝 Scanning commits since $SINCE_REF..."
echo ""

FEATURES=""
FIXES=""
REFACTORS=""
DOCS=""
PERF=""
CHORES=""

# Regex patterns — kept in variables so YAML can never mangle them
RE_FEAT='^feat(\(([^)]+)\))?:[[:space:]](.+)'
RE_FIX='^fix(\(([^)]+)\))?:[[:space:]](.+)'
RE_REFACTOR='^refactor(\(([^)]+)\))?:[[:space:]](.+)'
RE_DOCS='^docs(\(([^)]+)\))?:[[:space:]](.+)'
RE_PERF='^perf(\(([^)]+)\))?:[[:space:]](.+)'
RE_CHORE='^chore(\(([^)]+)\))?:[[:space:]](.+)'
RE_CHORE_SKIP='chore\((release|changelog)\)'

while IFS= read -r line; do
  # Skip empty lines
  [ -z "$line" ] && continue

  HASH="${line%% *}"
  MSG="${line#* }"
  SHORT_HASH="${HASH:0:7}"
  LINK="[${SHORT_HASH}](https://github.com/${GITHUB_REPOSITORY}/commit/${HASH})"

  # Parse conventional commit prefix
  if [[ "$MSG" =~ $RE_FEAT ]]; then
    SCOPE="${BASH_REMATCH[2]}"
    BODY="${BASH_REMATCH[3]}"
    if [ -n "$SCOPE" ]; then
      FEATURES="${FEATURES}- **${SCOPE}:** ${BODY} (${LINK})\n"
    else
      FEATURES="${FEATURES}- ${BODY} (${LINK})\n"
    fi
  elif [[ "$MSG" =~ $RE_FIX ]]; then
    SCOPE="${BASH_REMATCH[2]}"
    BODY="${BASH_REMATCH[3]}"
    if [ -n "$SCOPE" ]; then
      FIXES="${FIXES}- **${SCOPE}:** ${BODY} (${LINK})\n"
    else
      FIXES="${FIXES}- ${BODY} (${LINK})\n"
    fi
  elif [[ "$MSG" =~ $RE_REFACTOR ]]; then
    SCOPE="${BASH_REMATCH[2]}"
    BODY="${BASH_REMATCH[3]}"
    if [ -n "$SCOPE" ]; then
      REFACTORS="${REFACTORS}- **${SCOPE}:** ${BODY} (${LINK})\n"
    else
      REFACTORS="${REFACTORS}- ${BODY} (${LINK})\n"
    fi
  elif [[ "$MSG" =~ $RE_DOCS ]]; then
    SCOPE="${BASH_REMATCH[2]}"
    BODY="${BASH_REMATCH[3]}"
    if [ -n "$SCOPE" ]; then
      DOCS="${DOCS}- **${SCOPE}:** ${BODY} (${LINK})\n"
    else
      DOCS="${DOCS}- ${BODY} (${LINK})\n"
    fi
  elif [[ "$MSG" =~ $RE_PERF ]]; then
    SCOPE="${BASH_REMATCH[2]}"
    BODY="${BASH_REMATCH[3]}"
    if [ -n "$SCOPE" ]; then
      PERF="${PERF}- **${SCOPE}:** ${BODY} (${LINK})\n"
    else
      PERF="${PERF}- ${BODY} (${LINK})\n"
    fi
  elif [[ "$MSG" =~ $RE_CHORE ]]; then
    # Skip release/changelog chores
    if [[ "$MSG" =~ $RE_CHORE_SKIP ]]; then
      continue
    fi
    SCOPE="${BASH_REMATCH[2]}"
    BODY="${BASH_REMATCH[3]}"
    if [ -n "$SCOPE" ]; then
      CHORES="${CHORES}- **${SCOPE}:** ${BODY} (${LINK})\n"
    else
      CHORES="${CHORES}- ${BODY} (${LINK})\n"
    fi
  fi
done < <(git log "${SINCE_REF}..HEAD" --format="%H %s" --no-merges --reverse 2>/dev/null || true)

# ── Build the new unreleased block ──────────────────────────────────────────
NEW_ENTRIES=""

if [ -n "$FEATURES" ]; then
  NEW_ENTRIES="${NEW_ENTRIES}### 🚀 Features\n${FEATURES}\n"
fi
if [ -n "$FIXES" ]; then
  NEW_ENTRIES="${NEW_ENTRIES}### 🐛 Bug Fixes\n${FIXES}\n"
fi
if [ -n "$PERF" ]; then
  NEW_ENTRIES="${NEW_ENTRIES}### ⚡ Performance\n${PERF}\n"
fi
if [ -n "$REFACTORS" ]; then
  NEW_ENTRIES="${NEW_ENTRIES}### 🔧 Refactors\n${REFACTORS}\n"
fi
if [ -n "$DOCS" ]; then
  NEW_ENTRIES="${NEW_ENTRIES}### 📖 Documentation\n${DOCS}\n"
fi
if [ -n "$CHORES" ]; then
  NEW_ENTRIES="${NEW_ENTRIES}### 🏗️ Miscellaneous\n${CHORES}\n"
fi

# ── Check if we have anything to add ────────────────────────────────────────
if [ -z "$NEW_ENTRIES" ]; then
  echo "✅ No new conventional commits to add. Changelog is up to date."
  exit 0
fi

echo "📋 New entries to prepend:"
echo -e "$NEW_ENTRIES"

# ── Ensure CHANGELOG file exists ────────────────────────────────────────────
if [ ! -f "$CHANGELOG_FILE" ]; then
  mkdir -p "$(dirname "$CHANGELOG_FILE")"
  printf '# Changelog\n\nAll notable changes to **@work-rjkashyap/unified-ui** will be documented in this file.\n\n' > "$CHANGELOG_FILE"
  echo "📄 Created $CHANGELOG_FILE"
fi

# ── Prepend into the [Unreleased] section ───────────────────────────────────
# We use Node.js for reliable multi-line string manipulation
ESCAPED_ENTRIES=$(printf '%s' "$NEW_ENTRIES" | node -e "
  let s = '';
  process.stdin.on('data', d => s += d);
  process.stdin.on('end', () => console.log(JSON.stringify(s)));
")

node -e "
  const fs = require('fs');
  const path = '${CHANGELOG_FILE}';
  let content = fs.readFileSync(path, 'utf-8');
  const newEntries = ${ESCAPED_ENTRIES};

  // Find the [Unreleased] section
  const unreleasedRegex = /^## \[Unreleased\].*$/m;
  const nextVersionRegex = /^## \[\d+\.\d+\.\d+\]/m;

  if (unreleasedRegex.test(content)) {
    // Find where [Unreleased] section starts
    const unreleasedMatch = content.match(unreleasedRegex);
    const unreleasedIdx = unreleasedMatch.index + unreleasedMatch[0].length;

    // Find the next version section or the --- separator after Unreleased
    const afterUnreleased = content.slice(unreleasedIdx);
    const separatorMatch = afterUnreleased.match(/^---$/m);
    const nextVerMatch = afterUnreleased.match(nextVersionRegex);

    let insertIdx;
    if (separatorMatch && (!nextVerMatch || separatorMatch.index < nextVerMatch.index)) {
      insertIdx = unreleasedIdx + separatorMatch.index;
    } else if (nextVerMatch) {
      insertIdx = unreleasedIdx + nextVerMatch.index;
    } else {
      insertIdx = content.length;
    }

    // Dedup: check if the new entries already exist
    const firstNewLine = newEntries.trim().split('\n')[0];
    const existingSection = content.slice(unreleasedIdx, insertIdx);
    if (existingSection.includes(firstNewLine)) {
      console.log('⏭️  Entries already present — skipping.');
      process.exit(0);
    }

    content = content.slice(0, insertIdx) + newEntries + '\n' + content.slice(insertIdx);
  } else {
    // No [Unreleased] section — create one after the header
    const firstSeparator = content.match(/^---$/m);
    const firstVersion = content.match(/^## \[/m);

    let insertIdx;
    if (firstSeparator && (!firstVersion || firstSeparator.index < firstVersion.index)) {
      insertIdx = firstSeparator.index + firstSeparator[0].length + 1;
    } else if (firstVersion) {
      insertIdx = firstVersion.index;
    } else {
      insertIdx = content.length;
    }

    const unreleasedBlock = '## [Unreleased]\n\n' + newEntries + '\n---\n\n';
    content = content.slice(0, insertIdx) + unreleasedBlock + content.slice(insertIdx);
  }

  fs.writeFileSync(path, content);
  console.log('✅ Changelog updated successfully.');
"
