/** An RGB color represented as a tuple of [red, green, blue] (0–255 each). */
type RGB = readonly [number, number, number];
/** Text size category for WCAG contrast thresholds. */
type TextSize = "normal" | "large";
/** Full result of a contrast check between two colors. */
interface ContrastResult {
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
/** Minimum contrast ratio for WCAG AA normal text. */
declare const WCAG_AA_NORMAL = 4.5;
/** Minimum contrast ratio for WCAG AA large text. */
declare const WCAG_AA_LARGE = 3;
/** Minimum contrast ratio for WCAG AAA normal text. */
declare const WCAG_AAA_NORMAL = 7;
/** Minimum contrast ratio for WCAG AAA large text. */
declare const WCAG_AAA_LARGE = 4.5;
/** Minimum contrast ratio for WCAG AA non-text UI components (SC 1.4.11). */
declare const WCAG_NON_TEXT_AA = 3;
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
declare function relativeLuminance(color: RGB): number;
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
declare function contrastRatio(foreground: RGB, background: RGB): number;
/**
 * Check if a contrast ratio meets WCAG AA requirements.
 *
 * @param ratio - The contrast ratio to check
 * @param textSize - "normal" (default, ≥ 4.5:1) or "large" (≥ 3:1)
 * @returns `true` if the ratio meets the AA threshold
 */
declare function meetsAA(ratio: number, textSize?: TextSize): boolean;
/**
 * Check if a contrast ratio meets WCAG AAA requirements.
 *
 * @param ratio - The contrast ratio to check
 * @param textSize - "normal" (default, ≥ 7:1) or "large" (≥ 4.5:1)
 * @returns `true` if the ratio meets the AAA threshold
 */
declare function meetsAAA(ratio: number, textSize?: TextSize): boolean;
/**
 * Check if a contrast ratio meets WCAG AA for non-text elements (SC 1.4.11).
 * This applies to UI component boundaries, focus indicators, and graphical objects.
 *
 * @param ratio - The contrast ratio to check
 * @returns `true` if the ratio meets ≥ 3:1
 */
declare function meetsNonTextAA(ratio: number): boolean;
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
declare function parseRGBString(rgbString: string): RGB;
/**
 * Convert an RGB tuple back to a space-separated string.
 *
 * @param color - RGB tuple [r, g, b]
 * @returns Space-separated string, e.g. "79 70 229"
 */
declare function toRGBString(color: RGB): string;
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
declare function parseHex(hex: string): RGB;
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
declare function checkDSContrast(fgRGBString: string, bgRGBString: string): ContrastResult;
/**
 * Perform a comprehensive WCAG contrast check between two hex colors.
 *
 * @param fgHex - Foreground hex color (e.g. "#FFFFFF")
 * @param bgHex - Background hex color (e.g. "#4F46E5")
 * @returns Full contrast result with ratio and pass/fail for each WCAG level
 */
declare function checkHexContrast(fgHex: string, bgHex: string): ContrastResult;
/** A named color pair for batch auditing. */
interface ColorPair {
    /** Human-readable label for the pair (e.g. "primary on background"). */
    label: string;
    /** Foreground color as space-separated RGB string. */
    fg: string;
    /** Background color as space-separated RGB string. */
    bg: string;
}
/** Result of a single pair in a batch audit. */
interface AuditResult extends ContrastResult {
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
declare function auditContrast(pairs: ColorPair[]): AuditResult[];
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
declare const DS_LIGHT_CRITICAL_PAIRS: ColorPair[];
/**
 * Critical color pairs from the Unified UI dark theme that must meet
 * WCAG AA contrast. Use with `auditContrast()` for automated checks.
 */
declare const DS_DARK_CRITICAL_PAIRS: ColorPair[];

export { type AuditResult, type ColorPair, type ContrastResult, DS_DARK_CRITICAL_PAIRS, DS_LIGHT_CRITICAL_PAIRS, type RGB, type TextSize, WCAG_AAA_LARGE, WCAG_AAA_NORMAL, WCAG_AA_LARGE, WCAG_AA_NORMAL, WCAG_NON_TEXT_AA, auditContrast, checkDSContrast, checkHexContrast, contrastRatio, meetsAA, meetsAAA, meetsNonTextAA, parseHex, parseRGBString, relativeLuminance, toRGBString };
