// ============================================================================
// Unified UI — WCAG Contrast Checking Utilities
// ============================================================================
// Utilities for verifying that color combinations meet WCAG 2.1 contrast
// requirements. Used during development and testing to ensure all design
// system color pairings are accessible.
//
// Standards:
//   - WCAG 2.1 SC 1.4.3 (Contrast Minimum — Level AA):
//     - Normal text (< 18pt / < 14pt bold): ≥ 4.5:1
//     - Large text (≥ 18pt / ≥ 14pt bold): ≥ 3:1
//   - WCAG 2.1 SC 1.4.6 (Enhanced Contrast — Level AAA):
//     - Normal text: ≥ 7:1
//     - Large text: ≥ 4.5:1
//   - WCAG 2.1 SC 1.4.11 (Non-text Contrast — Level AA):
//     - UI components and graphical objects: ≥ 3:1
//
// Usage:
//   import {
//     contrastRatio,
//     meetsAA,
//     meetsAAA,
//     meetsNonTextAA,
//     parseRGBString,
//   } from "@unified-ui/utils/contrast";
//
//   // Check a foreground/background combination
//   const ratio = contrastRatio([79, 70, 229], [255, 255, 255]);
//   // → ~4.56
//
//   meetsAA(ratio)            // true  (normal text)
//   meetsAA(ratio, "large")   // true  (large text)
//   meetsAAA(ratio)           // false (normal text needs 7:1)
//
//   // Parse a design system RGB channel string
//   const rgb = parseRGBString("79 70 229"); // [79, 70, 229]
//
//   // Check a DS variable pair directly
//   const result = checkDSContrast("79 70 229", "255 255 255");
//   // → { ratio: 4.56, aa: true, aaLarge: true, aaa: false, aaaLarge: true, nonTextAA: true }
// ============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** An RGB color represented as a tuple of [red, green, blue] (0–255 each). */
export type RGB = readonly [number, number, number];

/** Text size category for WCAG contrast thresholds. */
export type TextSize = "normal" | "large";

/** Full result of a contrast check between two colors. */
export interface ContrastResult {
	/** The computed contrast ratio (e.g. 4.56). Always ≥ 1. */
	ratio: number;
	/** Meets WCAG AA for normal text (≥ 4.5:1). */
	aa: boolean;
	/** Meets WCAG AA for large text (≥ 3:1). */
	aaLarge: boolean;
	/** Meets WCAG AAA for normal text (≥ 7:1). */
	aaa: boolean;
	/** Meets WCAG AAA for large text (≥ 4.5:1). */
	aaaLarge: boolean;
	/** Meets WCAG AA for non-text UI components (≥ 3:1). */
	nonTextAA: boolean;
}

// ---------------------------------------------------------------------------
// Constants — WCAG Threshold Values
// ---------------------------------------------------------------------------

/** Minimum contrast ratio for WCAG AA normal text. */
export const WCAG_AA_NORMAL = 4.5;

/** Minimum contrast ratio for WCAG AA large text. */
export const WCAG_AA_LARGE = 3.0;

/** Minimum contrast ratio for WCAG AAA normal text. */
export const WCAG_AAA_NORMAL = 7.0;

/** Minimum contrast ratio for WCAG AAA large text. */
export const WCAG_AAA_LARGE = 4.5;

/** Minimum contrast ratio for WCAG AA non-text UI components (SC 1.4.11). */
export const WCAG_NON_TEXT_AA = 3.0;

// ---------------------------------------------------------------------------
// Relative Luminance
// ---------------------------------------------------------------------------
// Calculates the relative luminance of a color as defined by WCAG 2.1.
// Formula: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
//
// For each sRGB channel:
//   1. Normalize to 0–1 range (divide by 255)
//   2. Apply inverse sRGB companding:
//      - If value ≤ 0.04045: linear = value / 12.92
//      - Else: linear = ((value + 0.055) / 1.055) ^ 2.4
//   3. Luminance = 0.2126 * R_linear + 0.7152 * G_linear + 0.0722 * B_linear
// ---------------------------------------------------------------------------

/**
 * Linearize a single sRGB channel value (0–255) to its linear-light value.
 * Applies the inverse sRGB transfer function per the WCAG specification.
 */
function linearize(channel: number): number {
	const normalized = channel / 255;
	if (normalized <= 0.04045) {
		return normalized / 12.92;
	}
	return ((normalized + 0.055) / 1.055) ** 2.4;
}

/**
 * Calculate the relative luminance of an sRGB color.
 *
 * @param color - RGB tuple [r, g, b] with values in 0–255 range
 * @returns Relative luminance in 0–1 range (0 = black, 1 = white)
 *
 * @example
 * ```ts
 * relativeLuminance([255, 255, 255]) // → 1.0 (white)
 * relativeLuminance([0, 0, 0])       // → 0.0 (black)
 * relativeLuminance([79, 70, 229])   // → ~0.067 (indigo)
 * ```
 */
export function relativeLuminance(color: RGB): number {
	const [r, g, b] = color;
	return (
		0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
	);
}

// ---------------------------------------------------------------------------
// Contrast Ratio
// ---------------------------------------------------------------------------
// Calculates the contrast ratio between two colors as defined by WCAG 2.1.
// Formula: (L1 + 0.05) / (L2 + 0.05)
// where L1 is the lighter luminance and L2 is the darker luminance.
//
// The result is always ≥ 1 (identical colors) and ≤ 21 (black on white).
// ---------------------------------------------------------------------------

/**
 * Calculate the WCAG contrast ratio between two colors.
 *
 * @param foreground - RGB tuple [r, g, b] for the foreground (text) color
 * @param background - RGB tuple [r, g, b] for the background color
 * @returns Contrast ratio ≥ 1.0 (e.g. 4.5 means "4.5:1")
 *
 * @example
 * ```ts
 * contrastRatio([0, 0, 0], [255, 255, 255])   // → 21.0 (max)
 * contrastRatio([255, 255, 255], [0, 0, 0])   // → 21.0 (order doesn't matter)
 * contrastRatio([79, 70, 229], [255, 255, 255]) // → ~4.56
 * ```
 */
export function contrastRatio(foreground: RGB, background: RGB): number {
	const l1 = relativeLuminance(foreground);
	const l2 = relativeLuminance(background);
	const lighter = Math.max(l1, l2);
	const darker = Math.min(l1, l2);
	return (lighter + 0.05) / (darker + 0.05);
}

// ---------------------------------------------------------------------------
// WCAG Level Checks
// ---------------------------------------------------------------------------

/**
 * Check if a contrast ratio meets WCAG AA requirements.
 *
 * @param ratio - The contrast ratio to check
 * @param textSize - "normal" (default, ≥ 4.5:1) or "large" (≥ 3:1)
 * @returns `true` if the ratio meets the AA threshold
 */
export function meetsAA(ratio: number, textSize: TextSize = "normal"): boolean {
	return ratio >= (textSize === "large" ? WCAG_AA_LARGE : WCAG_AA_NORMAL);
}

/**
 * Check if a contrast ratio meets WCAG AAA requirements.
 *
 * @param ratio - The contrast ratio to check
 * @param textSize - "normal" (default, ≥ 7:1) or "large" (≥ 4.5:1)
 * @returns `true` if the ratio meets the AAA threshold
 */
export function meetsAAA(
	ratio: number,
	textSize: TextSize = "normal",
): boolean {
	return ratio >= (textSize === "large" ? WCAG_AAA_LARGE : WCAG_AAA_NORMAL);
}

/**
 * Check if a contrast ratio meets WCAG AA for non-text elements (SC 1.4.11).
 * This applies to UI component boundaries, focus indicators, and graphical objects.
 *
 * @param ratio - The contrast ratio to check
 * @returns `true` if the ratio meets ≥ 3:1
 */
export function meetsNonTextAA(ratio: number): boolean {
	return ratio >= WCAG_NON_TEXT_AA;
}

// ---------------------------------------------------------------------------
// RGB String Parsing
// ---------------------------------------------------------------------------
// The design system stores colors as space-separated RGB channel strings
// (e.g. "79 70 229") to support Tailwind's opacity modifier syntax.
// These utilities convert between that format and RGB tuples.
// ---------------------------------------------------------------------------

/**
 * Parse a space-separated RGB string (as used in `design-system.css`) into
 * an RGB tuple.
 *
 * @param rgbString - Space-separated RGB channels, e.g. "79 70 229"
 * @returns RGB tuple [r, g, b]
 * @throws {Error} If the string is not a valid 3-channel RGB value
 *
 * @example
 * ```ts
 * parseRGBString("79 70 229")     // → [79, 70, 229]
 * parseRGBString("255 255 255")   // → [255, 255, 255]
 * ```
 */
export function parseRGBString(rgbString: string): RGB {
	const parts = rgbString.trim().split(/\s+/).map(Number);
	if (
		parts.length !== 3 ||
		parts.some((n) => Number.isNaN(n) || n < 0 || n > 255)
	) {
		throw new Error(
			`Invalid RGB string: "${rgbString}". Expected 3 space-separated integers (0–255).`,
		);
	}
	return parts as unknown as RGB;
}

/**
 * Convert an RGB tuple back to a space-separated string.
 *
 * @param color - RGB tuple [r, g, b]
 * @returns Space-separated string, e.g. "79 70 229"
 */
export function toRGBString(color: RGB): string {
	return `${color[0]} ${color[1]} ${color[2]}`;
}

/**
 * Parse a hex color string into an RGB tuple.
 *
 * @param hex - Hex color string (with or without #), supports 3 or 6 digits
 * @returns RGB tuple [r, g, b]
 * @throws {Error} If the string is not a valid hex color
 *
 * @example
 * ```ts
 * parseHex("#4F46E5")    // → [79, 70, 229]
 * parseHex("4F46E5")     // → [79, 70, 229]
 * parseHex("#fff")       // → [255, 255, 255]
 * ```
 */
export function parseHex(hex: string): RGB {
	let cleaned = hex.replace(/^#/, "");

	// Expand shorthand (e.g., "fff" → "ffffff")
	if (cleaned.length === 3) {
		cleaned =
			cleaned[0] +
			cleaned[0] +
			cleaned[1] +
			cleaned[1] +
			cleaned[2] +
			cleaned[2];
	}

	if (cleaned.length !== 6 || !/^[\da-f]{6}$/i.test(cleaned)) {
		throw new Error(
			`Invalid hex color: "${hex}". Expected a 3- or 6-digit hex string.`,
		);
	}

	return [
		Number.parseInt(cleaned.slice(0, 2), 16),
		Number.parseInt(cleaned.slice(2, 4), 16),
		Number.parseInt(cleaned.slice(4, 6), 16),
	] as unknown as RGB;
}

// ---------------------------------------------------------------------------
// Full Contrast Check
// ---------------------------------------------------------------------------

/**
 * Perform a comprehensive WCAG contrast check between two colors.
 * Accepts the space-separated RGB strings used in `design-system.css`.
 *
 * @param fgRGBString - Foreground color as "R G B" string (e.g. "255 255 255")
 * @param bgRGBString - Background color as "R G B" string (e.g. "79 70 229")
 * @returns Full contrast result with ratio and pass/fail for each WCAG level
 *
 * @example
 * ```ts
 * const result = checkDSContrast("255 255 255", "79 70 229");
 * // → {
 * //   ratio: 4.56,
 * //   aa: true,
 * //   aaLarge: true,
 * //   aaa: false,
 * //   aaaLarge: true,
 * //   nonTextAA: true,
 * // }
 * ```
 */
export function checkDSContrast(
	fgRGBString: string,
	bgRGBString: string,
): ContrastResult {
	const fg = parseRGBString(fgRGBString);
	const bg = parseRGBString(bgRGBString);
	const ratio = contrastRatio(fg, bg);

	return {
		ratio: Math.round(ratio * 100) / 100,
		aa: meetsAA(ratio, "normal"),
		aaLarge: meetsAA(ratio, "large"),
		aaa: meetsAAA(ratio, "normal"),
		aaaLarge: meetsAAA(ratio, "large"),
		nonTextAA: meetsNonTextAA(ratio),
	};
}

/**
 * Perform a comprehensive WCAG contrast check between two hex colors.
 *
 * @param fgHex - Foreground hex color (e.g. "#FFFFFF")
 * @param bgHex - Background hex color (e.g. "#4F46E5")
 * @returns Full contrast result with ratio and pass/fail for each WCAG level
 */
export function checkHexContrast(fgHex: string, bgHex: string): ContrastResult {
	const fg = parseHex(fgHex);
	const bg = parseHex(bgHex);
	const ratio = contrastRatio(fg, bg);

	return {
		ratio: Math.round(ratio * 100) / 100,
		aa: meetsAA(ratio, "normal"),
		aaLarge: meetsAA(ratio, "large"),
		aaa: meetsAAA(ratio, "normal"),
		aaaLarge: meetsAAA(ratio, "large"),
		nonTextAA: meetsNonTextAA(ratio),
	};
}

// ---------------------------------------------------------------------------
// Batch Audit Helper
// ---------------------------------------------------------------------------

/** A named color pair for batch auditing. */
export interface ColorPair {
	/** Human-readable label for the pair (e.g. "primary on background"). */
	label: string;
	/** Foreground color as space-separated RGB string. */
	fg: string;
	/** Background color as space-separated RGB string. */
	bg: string;
}

/** Result of a single pair in a batch audit. */
export interface AuditResult extends ContrastResult {
	/** The label from the input pair. */
	label: string;
	/** The foreground RGB string. */
	fg: string;
	/** The background RGB string. */
	bg: string;
}

/**
 * Audit multiple color pairs against WCAG contrast requirements.
 * Returns results for each pair, making it easy to identify failing
 * combinations during design system QA.
 *
 * @param pairs - Array of labeled color pairs to check
 * @returns Array of audit results, one per input pair
 *
 * @example
 * ```ts
 * const results = auditContrast([
 *   { label: "primary text on bg", fg: "79 70 229", bg: "255 255 255" },
 *   { label: "muted text on bg", fg: "113 113 122", bg: "255 255 255" },
 *   { label: "danger on white", fg: "220 38 38", bg: "255 255 255" },
 * ]);
 *
 * // Filter to just the failures:
 * const failures = results.filter((r) => !r.aa);
 * ```
 */
export function auditContrast(pairs: ColorPair[]): AuditResult[] {
	return pairs.map((pair) => {
		const result = checkDSContrast(pair.fg, pair.bg);
		return {
			...result,
			label: pair.label,
			fg: pair.fg,
			bg: pair.bg,
		};
	});
}

// ---------------------------------------------------------------------------
// Design System Token Audit
// ---------------------------------------------------------------------------
// Pre-defined pairs that should be checked for every theme. These represent
// the most critical text-on-background combinations in the design system.
// ---------------------------------------------------------------------------

/**
 * Critical color pairs from the Unified UI light theme that must meet
 * WCAG AA contrast. Use with `auditContrast()` for automated checks.
 *
 * @example
 * ```ts
 * const results = auditContrast(DS_LIGHT_CRITICAL_PAIRS);
 * const failures = results.filter((r) => !r.aa);
 * if (failures.length > 0) {
 *   console.error("WCAG AA failures:", failures);
 * }
 * ```
 */
export const DS_LIGHT_CRITICAL_PAIRS: ColorPair[] = [
	// Primary text on backgrounds
	{ label: "foreground on background", fg: "9 9 11", bg: "255 255 255" },
	{ label: "primary on background", fg: "79 70 229", bg: "255 255 255" },
	{
		label: "primary-foreground on primary",
		fg: "255 255 255",
		bg: "79 70 229",
	},
	// Secondary
	{ label: "secondary-fg on secondary", fg: "24 24 27", bg: "244 244 245" },
	// Muted (zinc.600 = 82 82 91 — matches CSS --ds-color-muted-foreground)
	{ label: "muted-fg on background", fg: "82 82 91", bg: "255 255 255" },
	{ label: "muted-fg on muted", fg: "82 82 91", bg: "244 244 245" },
	// Semantic — foreground on solid bg (dark text on bright semantic colors)
	{ label: "success-fg on success", fg: "9 9 11", bg: "22 163 74" },
	{ label: "warning-fg on warning", fg: "9 9 11", bg: "245 158 11" },
	{ label: "danger-fg on danger", fg: "255 255 255", bg: "220 38 38" },
	{ label: "info-fg on info", fg: "255 255 255", bg: "37 99 235" },
	// Semantic — muted text on muted bg
	{
		label: "success-muted-fg on success-muted",
		fg: "21 128 61",
		bg: "240 253 244",
	},
	{
		label: "warning-muted-fg on warning-muted",
		fg: "180 83 9",
		bg: "255 251 235",
	},
	{
		label: "danger-muted-fg on danger-muted",
		fg: "185 28 28",
		bg: "254 242 242",
	},
	{
		label: "info-muted-fg on info-muted",
		fg: "29 78 216",
		bg: "239 246 255",
	},
	// Input (placeholder = zinc.500 = 113 113 122)
	{ label: "input-fg on background", fg: "24 24 27", bg: "255 255 255" },
	{
		label: "input-placeholder on background",
		fg: "113 113 122",
		bg: "255 255 255",
	},
	// Disabled (darkened to 120 120 129 for ≥ 3:1 usability target)
	{ label: "disabled-fg on disabled", fg: "120 120 129", bg: "244 244 245" },
	{
		label: "disabled-fg on background",
		fg: "120 120 129",
		bg: "255 255 255",
	},
	// Input border (non-text, darkened to 148 148 157 for ≥ 3:1)
	{
		label: "input border on background (non-text)",
		fg: "148 148 157",
		bg: "255 255 255",
	},
	// Border-strong (non-text, darkened to 148 148 157 for ≥ 3:1)
	{
		label: "border-strong on background (non-text)",
		fg: "148 148 157",
		bg: "255 255 255",
	},
	// Focus ring (non-text contrast against background)
	{
		label: "focus-ring on background (non-text)",
		fg: "99 102 241",
		bg: "255 255 255",
	},
];

/**
 * Critical color pairs from the Unified UI dark theme that must meet
 * WCAG AA contrast. Use with `auditContrast()` for automated checks.
 */
export const DS_DARK_CRITICAL_PAIRS: ColorPair[] = [
	// Primary text on backgrounds
	{ label: "foreground on background", fg: "250 250 250", bg: "9 9 11" },
	// Primary shifted to brand.400 (129 140 248) for AA on dark bg (6.67:1)
	{ label: "primary on background", fg: "129 140 248", bg: "9 9 11" },
	{
		// Primary-fg shifted to zinc.900 (24 24 27) for AA on brand.400 (5.94:1)
		label: "primary-foreground on primary",
		fg: "24 24 27",
		bg: "129 140 248",
	},
	// Secondary
	{ label: "secondary-fg on secondary", fg: "244 244 245", bg: "39 39 42" },
	// Muted
	{ label: "muted-fg on background", fg: "161 161 170", bg: "9 9 11" },
	{ label: "muted-fg on muted", fg: "161 161 170", bg: "39 39 42" },
	// Semantic — foreground on solid bg (dark text on bright semantic colors)
	{ label: "success-fg on success", fg: "9 9 11", bg: "34 197 94" },
	{ label: "warning-fg on warning", fg: "9 9 11", bg: "251 191 36" },
	{ label: "danger-fg on danger", fg: "9 9 11", bg: "239 68 68" },
	{ label: "info-fg on info", fg: "9 9 11", bg: "96 165 250" },
	// Semantic — muted text on muted bg
	{
		label: "success-muted-fg on success-muted",
		fg: "134 239 172",
		bg: "5 46 22",
	},
	{
		label: "warning-muted-fg on warning-muted",
		fg: "252 211 77",
		bg: "69 26 3",
	},
	{
		label: "danger-muted-fg on danger-muted",
		fg: "252 165 165",
		bg: "69 10 10",
	},
	{ label: "info-muted-fg on info-muted", fg: "147 197 253", bg: "23 37 84" },
	// Input (placeholder = 137 137 145 for dark theme)
	{ label: "input-fg on background", fg: "250 250 250", bg: "9 9 11" },
	{
		label: "input-placeholder on background",
		fg: "137 137 145",
		bg: "9 9 11",
	},
	// Disabled (lightened to zinc.500 = 113 113 122 for ≥ 3:1 usability target)
	{ label: "disabled-fg on disabled", fg: "113 113 122", bg: "39 39 42" },
	{ label: "disabled-fg on background", fg: "113 113 122", bg: "9 9 11" },
	// Input border (non-text, lightened to 96 96 105 for ≥ 3:1)
	{
		label: "input border on background (non-text)",
		fg: "96 96 105",
		bg: "9 9 11",
	},
	// Border-strong (non-text, lightened to zinc.500 = 113 113 122 for ≥ 3:1)
	{
		label: "border-strong on background (non-text)",
		fg: "113 113 122",
		bg: "9 9 11",
	},
	// Focus ring (non-text contrast against background)
	{
		label: "focus-ring on background (non-text)",
		fg: "129 140 248",
		bg: "9 9 11",
	},
];
