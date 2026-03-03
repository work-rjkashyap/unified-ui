// ============================================================================
// Unified UI — WCAG Contrast Audit Runner
// ============================================================================
// Standalone script that audits all critical color pairings defined in the
// design system against WCAG 2.1 contrast requirements.
//
// Usage:
//   npx tsx scripts/contrast-audit.ts
// ============================================================================

import {
  type AuditResult,
  auditContrast,
  DS_DARK_CRITICAL_PAIRS,
  DS_LIGHT_CRITICAL_PAIRS,
} from "../packages/unified-ui/src/utils/contrast";

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const WHITE = "\x1b[37m";
const BG_RED = "\x1b[41m";
const BG_GREEN = "\x1b[42m";

function badge(pass: boolean, label: string): string {
  if (pass) {
    return `${BG_GREEN}${WHITE}${BOLD} ${label} ${RESET}`;
  }
  return `${BG_RED}${WHITE}${BOLD} ${label} ${RESET}`;
}

function ratioColor(ratio: number): string {
  if (ratio >= 7.0) return GREEN;
  if (ratio >= 4.5) return CYAN;
  if (ratio >= 3.0) return YELLOW;
  return RED;
}

function padRight(str: string, len: number): string {
  return str.length >= len ? str : str + " ".repeat(len - str.length);
}

function padLeft(str: string, len: number): string {
  return str.length >= len ? str : " ".repeat(len - str.length) + str;
}

// ---------------------------------------------------------------------------
// Report rendering
// ---------------------------------------------------------------------------

function printHeader(title: string): void {
  const line = "═".repeat(76);
  console.log();
  console.log(`${BOLD}${CYAN}╔${line}╗${RESET}`);
  console.log(
    `${BOLD}${CYAN}║${RESET}  ${BOLD}${title}${RESET}${" ".repeat(76 - title.length - 2)}${BOLD}${CYAN}║${RESET}`,
  );
  console.log(`${BOLD}${CYAN}╚${line}╝${RESET}`);
  console.log();
}

function printThemeResults(theme: string, results: AuditResult[]): void {
  const failures = results.filter((r) => !r.aa);
  const warnings = results.filter((r) => r.aa && !r.aaa);
  const passing = results.filter((r) => r.aaa);

  const statusIcon =
    failures.length === 0 ? `${GREEN}✓${RESET}` : `${RED}✗${RESET}`;

  console.log(
    `${BOLD}${statusIcon} ${theme} Theme${RESET}  ${DIM}(${results.length} pairs)${RESET}`,
  );
  console.log(`${"─".repeat(78)}`);

  // Column headers
  console.log(
    `  ${DIM}${padRight("Label", 42)} Ratio    AA   AA-Lg  AAA  AAA-Lg  UI${RESET}`,
  );
  console.log(`  ${DIM}${"·".repeat(74)}${RESET}`);

  for (const r of results) {
    const ratio = r.ratio.toFixed(2);
    const color = ratioColor(r.ratio);

    const label = padRight(
      r.label.length > 40 ? `${r.label.slice(0, 37)}...` : r.label,
      42,
    );
    const ratioStr = `${color}${padLeft(ratio, 5)}:1${RESET}`;

    const aa = r.aa ? `${GREEN} ✓ ${RESET}` : `${RED} ✗ ${RESET}`;
    const aaLarge = r.aaLarge ? `${GREEN}  ✓  ${RESET}` : `${RED}  ✗  ${RESET}`;
    const aaa = r.aaa ? `${GREEN} ✓ ${RESET}` : `${YELLOW} – ${RESET}`;
    const aaaLarge = r.aaaLarge
      ? `${GREEN}  ✓   ${RESET}`
      : `${YELLOW}  –   ${RESET}`;
    const nonText = r.nonTextAA ? `${GREEN} ✓${RESET}` : `${RED} ✗${RESET}`;

    console.log(
      `  ${label} ${ratioStr}  ${aa}  ${aaLarge} ${aaa}  ${aaaLarge} ${nonText}`,
    );
  }

  console.log();

  // Summary
  console.log(
    `  ${BOLD}Summary:${RESET}  ` +
      `${GREEN}${passing.length} AAA${RESET}  ` +
      `${CYAN}${warnings.length} AA-only${RESET}  ` +
      `${failures.length > 0 ? RED : GREEN}${failures.length} failing${RESET}`,
  );

  if (failures.length > 0) {
    console.log();
    console.log(`  ${RED}${BOLD}Failures:${RESET}`);
    for (const f of failures) {
      console.log(
        `    ${RED}✗${RESET} ${f.label}  ${DIM}(${f.ratio.toFixed(2)}:1, need ≥ 4.5:1)${RESET}`,
      );
      console.log(`      ${DIM}fg: rgb(${f.fg})  bg: rgb(${f.bg})${RESET}`);
    }
  }

  console.log();
}

// ---------------------------------------------------------------------------
// Non-text specific audit
// ---------------------------------------------------------------------------

function printNonTextSummary(
  lightResults: AuditResult[],
  darkResults: AuditResult[],
): void {
  const lightNonTextFails = lightResults.filter((r) => !r.nonTextAA);
  const darkNonTextFails = darkResults.filter((r) => !r.nonTextAA);
  const totalFails = lightNonTextFails.length + darkNonTextFails.length;

  if (totalFails > 0) {
    console.log(
      `${YELLOW}${BOLD}⚠ Non-text contrast failures (SC 1.4.11, need ≥ 3:1):${RESET}`,
    );
    for (const f of lightNonTextFails) {
      console.log(
        `  ${YELLOW}–${RESET} [Light] ${f.label}  ${DIM}(${f.ratio.toFixed(2)}:1)${RESET}`,
      );
    }
    for (const f of darkNonTextFails) {
      console.log(
        `  ${YELLOW}–${RESET} [Dark]  ${f.label}  ${DIM}(${f.ratio.toFixed(2)}:1)${RESET}`,
      );
    }
    console.log();
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  printHeader("Unified UI — WCAG 2.1 Contrast Audit");

  console.log(
    `${DIM}Checking design system token pairings against WCAG 2.1 thresholds:${RESET}`,
  );
  console.log(
    `${DIM}  • AA normal text  ≥ 4.5:1   • AAA normal text ≥ 7.0:1${RESET}`,
  );
  console.log(
    `${DIM}  • AA large text   ≥ 3.0:1   • AAA large text  ≥ 4.5:1${RESET}`,
  );
  console.log(`${DIM}  • Non-text UI     ≥ 3.0:1${RESET}`);
  console.log();

  // Run audits
  const lightResults = auditContrast(DS_LIGHT_CRITICAL_PAIRS);
  const darkResults = auditContrast(DS_DARK_CRITICAL_PAIRS);

  // Print per-theme results
  printThemeResults("Light", lightResults);
  printThemeResults("Dark", darkResults);

  // Non-text summary
  printNonTextSummary(lightResults, darkResults);

  // Overall verdict
  const lightFails = lightResults.filter((r) => !r.aa);
  const darkFails = darkResults.filter((r) => !r.aa);
  const totalFails = lightFails.length + darkFails.length;

  const totalPairs = lightResults.length + darkResults.length;
  const totalAAAPass = [...lightResults, ...darkResults].filter(
    (r) => r.aaa,
  ).length;

  console.log("═".repeat(78));
  console.log();

  if (totalFails === 0) {
    console.log(
      `  ${badge(true, "PASS")}  All ${totalPairs} color pairings meet ${BOLD}WCAG AA${RESET} contrast.`,
    );
  } else {
    console.log(
      `  ${badge(false, "FAIL")}  ${RED}${totalFails}${RESET} of ${totalPairs} pairings ${RED}fail WCAG AA${RESET} contrast.`,
    );
  }

  console.log(
    `  ${DIM}${totalAAAPass}/${totalPairs} also meet the stricter AAA level.${RESET}`,
  );
  console.log();

  // Exit with error code if any AA failures
  if (totalFails > 0) {
    process.exit(1);
  }
}

main();
