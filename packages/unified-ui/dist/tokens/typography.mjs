const fontFamily = {
  /** Display — used for hero headings, marketing text, landing pages */
  display: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  /** Sans — primary UI typeface for all interface text */
  sans: "'Outfit', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  /** Serif — long-form reading, editorial content, blog posts */
  serif: "'Lora', Georgia, 'Times New Roman', serif",
  /** Mono — code blocks, technical values, tabular data */
  mono: "'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', Consolas, 'Liberation Mono', Menlo, monospace",
  /** Inherit — use parent's font (escape hatch for third-party integration) */
  inherit: "inherit"
};
const fontSize = {
  xs: "12px",
  sm: "14px",
  base: "16px",
  lg: "18px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "30px"
};
const lineHeight = {
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
  "36": "36px"
};
const fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700"
};
const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em"
};
const typographyVariants = {
  /** Page titles — 30px bold, tight leading, sans font */
  heading1: {
    fontSize: fontSize["3xl"],
    lineHeight: lineHeight["36"],
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.tight,
    fontFamily: "sans"
  },
  /** Section titles — 24px semibold, sans font */
  heading2: {
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["32"],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
    fontFamily: "sans"
  },
  /** Subsection titles — 20px semibold, sans font */
  heading3: {
    fontSize: fontSize.xl,
    lineHeight: lineHeight["28"],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.normal,
    fontFamily: "sans"
  },
  /** Card titles, sidebar headings — 18px medium, sans font */
  subheading: {
    fontSize: fontSize.lg,
    lineHeight: lineHeight["28"],
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.normal,
    fontFamily: "sans"
  },
  /** Default body text — 16px regular, sans font */
  body: {
    fontSize: fontSize.base,
    lineHeight: lineHeight["24"],
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.normal,
    fontFamily: "sans"
  },
  /** Compact body text — 14px regular, sans font */
  bodySm: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight["20"],
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.normal,
    fontFamily: "sans"
  },
  /** Captions, helper text, timestamps — 12px regular, sans font */
  caption: {
    fontSize: fontSize.xs,
    lineHeight: lineHeight["16"],
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.wide,
    fontFamily: "sans"
  },
  /** Form labels, badges — 14px medium, sans font */
  label: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight["20"],
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.normal,
    fontFamily: "sans"
  },
  /** Overline / eyebrow text — 12px semibold, uppercased in usage, sans font */
  overline: {
    fontSize: fontSize.xs,
    lineHeight: lineHeight["16"],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.wider,
    fontFamily: "sans"
  },
  /** Code / monospace inline text — 14px regular, mono font */
  code: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight["20"],
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.normal,
    fontFamily: "mono"
  }
};
export {
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  typographyVariants
};
