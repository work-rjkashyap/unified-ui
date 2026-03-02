// ============================================================================
// Unified UI — Typography Tokens
// ============================================================================
// Defines the complete typographic scale for the Unified UI design system.
// All typography values must come from these tokens — never hardcode
// font sizes, weights, or line heights in components.
//
// The scale is designed for web interfaces (not marketing pages), so it
// favors compact, readable sizes. The largest heading is 30px (text-3xl
// equivalent); body text is 14–16px.
//
// Font families support multiple typefaces loaded via next/font/google in
// the root layout. Each font family slot maps to a CSS custom property
// (--font-*) and a Tailwind utility (font-*).
// ============================================================================

// ---------------------------------------------------------------------------
// Font Families
// ---------------------------------------------------------------------------
// Each key maps to a CSS custom property in design-system.css and a
// Tailwind @theme utility. The actual font is loaded via next/font/google
// and referenced through CSS variables (e.g. var(--font-outfit)).
//
// At runtime, the CSS custom properties resolve to the loaded fonts:
//   --font-sans    → var(--font-outfit), system-ui, sans-serif
//   --font-display → var(--font-inter), system-ui, sans-serif
//   --font-serif   → var(--font-lora), Georgia, serif
//   --font-mono    → var(--font-jetbrains), Consolas, monospace
//   --font-inherit → inherit
// ---------------------------------------------------------------------------

export const fontFamily = {
  /** Display — used for hero headings, marketing text, landing pages */
  display:
    "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  /** Sans — primary UI typeface for all interface text */
  sans: "'Outfit', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  /** Serif — long-form reading, editorial content, blog posts */
  serif: "'Lora', Georgia, 'Times New Roman', serif",
  /** Mono — code blocks, technical values, tabular data */
  mono: "'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', Consolas, 'Liberation Mono', Menlo, monospace",
  /** Inherit — use parent's font (escape hatch for third-party integration) */
  inherit: "inherit",
} as const;

// ---------------------------------------------------------------------------
// Font Family Key Type
// ---------------------------------------------------------------------------
// Exported separately so components and the theme contract can reference
// the full set of font family keys without importing the values.
// ---------------------------------------------------------------------------

export type FontFamilyKey = keyof typeof fontFamily;

// ---------------------------------------------------------------------------
// Font Sizes
// ---------------------------------------------------------------------------
// Each entry is a standalone value. Paired with line heights in the
// variant presets below to enforce pairing discipline and prevent
// mismatched size/leading combinations.
// ---------------------------------------------------------------------------

export const fontSize = {
  xs: "12px",
  sm: "14px",
  base: "16px",
  lg: "18px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "30px",
} as const;

// ---------------------------------------------------------------------------
// Line Heights
// ---------------------------------------------------------------------------
// Paired with font sizes to maintain vertical rhythm on the 4px grid.
// Tight leading for headings, relaxed for body text.
// ---------------------------------------------------------------------------

export const lineHeight = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  /** Fixed pixel values for precise control */
  "16": "16px",
  "20": "20px",
  "24": "24px",
  "28": "28px",
  "32": "32px",
  "36": "36px",
} as const;

// ---------------------------------------------------------------------------
// Font Weights
// ---------------------------------------------------------------------------

export const fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

// ---------------------------------------------------------------------------
// Letter Spacing (Tracking)
// ---------------------------------------------------------------------------
// Headings use tighter tracking; body and small text use normal or wider.
// ---------------------------------------------------------------------------

export const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
} as const;

// ---------------------------------------------------------------------------
// Typographic Presets (Variants)
// ---------------------------------------------------------------------------
// Pre-composed combinations of size, weight, lineHeight, tracking, and
// font family. These are the canonical text styles for the entire
// application. Components should reference these presets rather than
// assembling individual tokens ad-hoc.
//
// The `fontFamily` field specifies which font family key to use by
// default for each variant. The Typography component maps this to the
// corresponding Tailwind utility class (e.g. "sans" → "font-sans").
// Consumers can override this per-instance via the `font` prop.
// ---------------------------------------------------------------------------

export const typographyVariants = {
  /** Page titles — 30px bold, tight leading, sans font */
  heading1: {
    fontSize: fontSize["3xl"],
    lineHeight: lineHeight["36"],
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.tight,
    fontFamily: "sans" as FontFamilyKey,
  },
  /** Section titles — 24px semibold, sans font */
  heading2: {
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["32"],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
    fontFamily: "sans" as FontFamilyKey,
  },
  /** Subsection titles — 20px semibold, sans font */
  heading3: {
    fontSize: fontSize.xl,
    lineHeight: lineHeight["28"],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.normal,
    fontFamily: "sans" as FontFamilyKey,
  },
  /** Card titles, sidebar headings — 18px medium, sans font */
  subheading: {
    fontSize: fontSize.lg,
    lineHeight: lineHeight["28"],
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.normal,
    fontFamily: "sans" as FontFamilyKey,
  },
  /** Default body text — 16px regular, sans font */
  body: {
    fontSize: fontSize.base,
    lineHeight: lineHeight["24"],
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.normal,
    fontFamily: "sans" as FontFamilyKey,
  },
  /** Compact body text — 14px regular, sans font */
  bodySm: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight["20"],
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.normal,
    fontFamily: "sans" as FontFamilyKey,
  },
  /** Captions, helper text, timestamps — 12px regular, sans font */
  caption: {
    fontSize: fontSize.xs,
    lineHeight: lineHeight["16"],
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.wide,
    fontFamily: "sans" as FontFamilyKey,
  },
  /** Form labels, badges — 14px medium, sans font */
  label: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight["20"],
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.normal,
    fontFamily: "sans" as FontFamilyKey,
  },
  /** Overline / eyebrow text — 12px semibold, uppercased in usage, sans font */
  overline: {
    fontSize: fontSize.xs,
    lineHeight: lineHeight["16"],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.wider,
    fontFamily: "sans" as FontFamilyKey,
  },
  /** Code / monospace inline text — 14px regular, mono font */
  code: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight["20"],
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.normal,
    fontFamily: "mono" as FontFamilyKey,
  },
} as const;

// ---------------------------------------------------------------------------
// Type Exports
// ---------------------------------------------------------------------------

export type FontFamily = keyof typeof fontFamily;
export type FontSize = keyof typeof fontSize;
export type LineHeight = keyof typeof lineHeight;
export type FontWeight = keyof typeof fontWeight;
export type LetterSpacing = keyof typeof letterSpacing;
export type TypographyVariant = keyof typeof typographyVariants;
export type TypographyPreset = {
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing: string;
  fontFamily: FontFamilyKey;
};
