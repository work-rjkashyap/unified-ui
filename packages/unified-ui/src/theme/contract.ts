// ============================================================================
// Unified UI — Theme Contract
// ============================================================================
// Defines the mapping between semantic token names and CSS custom properties.
// This contract is the bridge between the token layer and the CSS variable
// layer. Both the light and dark themes must satisfy this contract — if a
// variable is defined here, every theme must provide a value for it.
//
// All CSS custom properties use plain `--` prefix with no namespace infix.
// Examples: `--primary`, `--background`, `--radius-md`, `--z-modal`.
//
// Color variables store complete oklch() values. They are used directly
// as CSS color values via var() references:
//   background: var(--primary)
//
// Non-color variables (spacing, radius, shadows, z-index) are stored as
// complete CSS values since they don't need alpha composition.
// ============================================================================

import {
  type SemanticColorKey,
  semanticDark,
  semanticLight,
} from "@unified-ui/tokens/colors";
import { durationCSS, easingCSS } from "@unified-ui/tokens/motion";
import { radius } from "@unified-ui/tokens/radius";
import { shadow, shadowDark } from "@unified-ui/tokens/shadows";
import { fontFamily } from "@unified-ui/tokens/typography";
import { zIndex } from "@unified-ui/tokens/z-index";

// ---------------------------------------------------------------------------
// CSS Variable Name Mapping
// ---------------------------------------------------------------------------
// Maps each semantic token key to its CSS custom property name.
// This is the single source of truth — if you rename a variable, update
// it here and everything downstream (Tailwind, components) picks it up.
// ---------------------------------------------------------------------------



// ---------------------------------------------------------------------------
// Color Contract (no prefix — plain CSS custom properties)
// ---------------------------------------------------------------------------

const colorVarNames: Record<SemanticColorKey, string> = {
  background: "--background",
  foreground: "--foreground",

  surface: "--surface",
  surfaceRaised: "--surface-raised",
  surfaceOverlay: "--surface-overlay",

  card: "--card",
  cardForeground: "--card-foreground",

  popover: "--popover",
  popoverForeground: "--popover-foreground",

  muted: "--muted",
  mutedForeground: "--muted-foreground",

  primary: "--primary",
  primaryForeground: "--primary-foreground",
  primaryHover: "--primary-hover",
  primaryActive: "--primary-active",
  primaryMuted: "--primary-muted",
  primaryMutedForeground: "--primary-muted-foreground",

  secondary: "--secondary",
  secondaryForeground: "--secondary-foreground",
  secondaryHover: "--secondary-hover",
  secondaryActive: "--secondary-active",

  accent: "--accent",
  accentForeground: "--accent-foreground",

  success: "--success",
  successForeground: "--success-foreground",
  successMuted: "--success-muted",
  successMutedForeground: "--success-muted-foreground",

  warning: "--warning",
  warningForeground: "--warning-foreground",
  warningMuted: "--warning-muted",
  warningMutedForeground: "--warning-muted-foreground",

  danger: "--danger",
  dangerForeground: "--danger-foreground",
  dangerHover: "--danger-hover",
  dangerActive: "--danger-active",
  dangerMuted: "--danger-muted",
  dangerMutedForeground: "--danger-muted-foreground",

  destructive: "--destructive",
  destructiveForeground: "--destructive-foreground",

  info: "--info",
  infoForeground: "--info-foreground",
  infoMuted: "--info-muted",
  infoMutedForeground: "--info-muted-foreground",

  border: "--border",
  borderMuted: "--border-muted",
  borderStrong: "--border-strong",

  focusRing: "--focus-ring",
  ring: "--ring",

  input: "--input",
  inputForeground: "--input-foreground",
  inputPlaceholder: "--input-placeholder",

  disabled: "--disabled",
  disabledForeground: "--disabled-foreground",

  chart1: "--chart-1",
  chart2: "--chart-2",
  chart3: "--chart-3",
  chart4: "--chart-4",
  chart5: "--chart-5",

  sidebar: "--sidebar",
  sidebarForeground: "--sidebar-foreground",
  sidebarPrimary: "--sidebar-primary",
  sidebarPrimaryForeground: "--sidebar-primary-foreground",
  sidebarAccent: "--sidebar-accent",
  sidebarAccentForeground: "--sidebar-accent-foreground",
  sidebarBorder: "--sidebar-border",
  sidebarRing: "--sidebar-ring",
} as const;

// ---------------------------------------------------------------------------
// Radius Contract
// ---------------------------------------------------------------------------

type RadiusKey = keyof typeof radius;

const radiusVarNames: Record<RadiusKey, string> = {
  none: "--radius-none",
  sm: "--radius-sm",
  md: "--radius-md",
  lg: "--radius-lg",
  xl: "--radius-xl",
  full: "--radius-full",
} as const;

// ---------------------------------------------------------------------------
// Shadow Contract
// ---------------------------------------------------------------------------

type ShadowKey = keyof typeof shadow;

const shadowVarNames: Record<ShadowKey, string> = {
  none: "--shadow-none",
  xs: "--shadow-xs",
  sm: "--shadow-sm",
  md: "--shadow-md",
  lg: "--shadow-lg",
  xl: "--shadow-xl",
  "2xl": "--shadow-2xl",
  focusRing: "--shadow-focus-ring",
} as const;

// ---------------------------------------------------------------------------
// Z-Index Contract
// ---------------------------------------------------------------------------

type ZIndexKey = keyof typeof zIndex;

const zIndexVarNames: Record<ZIndexKey, string> = {
  base: "--z-base",
  dropdown: "--z-dropdown",
  sticky: "--z-sticky",
  overlay: "--z-overlay",
  modal: "--z-modal",
  popover: "--z-popover",
  toast: "--z-toast",
  tooltip: "--z-tooltip",
  max: "--z-max",
} as const;

// ---------------------------------------------------------------------------
// Motion Contract
// ---------------------------------------------------------------------------

type DurationKey = keyof typeof durationCSS;
type EasingKey = keyof typeof easingCSS;

const durationVarNames: Record<DurationKey, string> = {
  instant: "--duration-instant",
  fast: "--duration-fast",
  moderate: "--duration-moderate",
  normal: "--duration-normal",
  slow: "--duration-slow",
  slower: "--duration-slower",
  slowest: "--duration-slowest",
} as const;

const easingVarNames: Record<EasingKey, string> = {
  standard: "--easing-standard",
  decelerate: "--easing-decelerate",
  accelerate: "--easing-accelerate",
  emphasize: "--easing-emphasize",
  linear: "--easing-linear",
  snap: "--easing-snap",
} as const;

// ---------------------------------------------------------------------------
// Font Family Contract
// ---------------------------------------------------------------------------

type FontFamilyKey = keyof typeof fontFamily;

const fontFamilyVarNames: Record<FontFamilyKey, string> = {
  display: "--font-display",
  sans: "--font-sans",
  serif: "--font-serif",
  mono: "--font-mono",
  inherit: "--font-inherit",
} as const;

// ---------------------------------------------------------------------------
// Resolved Theme Value Maps
// ---------------------------------------------------------------------------
// These functions produce a flat Record<string, string> where each key is a
// CSS custom property name and each value is the token value. They are used
// by the theme provider to generate inline styles and by the CSS generation
// layer to produce the `:root` / `.dark` stylesheet blocks.
// ---------------------------------------------------------------------------

function mapRecord<K extends string>(
  varNames: Record<K, string>,
  values: Record<K, string>,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of Object.keys(varNames) as K[]) {
    result[varNames[key]] = values[key];
  }
  return result;
}

/** Generate the full set of CSS variables for the light theme */
export function buildLightThemeVars(): Record<string, string> {
  return {
    ...mapRecord(colorVarNames, semanticLight),
    ...mapRecord(radiusVarNames, radius),
    ...mapRecord(shadowVarNames, shadow),
    ...mapRecord(zIndexVarNames, zIndex),
    ...mapRecord(durationVarNames, durationCSS),
    ...mapRecord(easingVarNames, easingCSS),
    ...mapRecord(fontFamilyVarNames, fontFamily),
  };
}

/** Generate the full set of CSS variables for the dark theme */
export function buildDarkThemeVars(): Record<string, string> {
  return {
    ...mapRecord(colorVarNames, semanticDark),
    ...mapRecord(radiusVarNames, radius),
    ...mapRecord(shadowVarNames, shadowDark),
    ...mapRecord(zIndexVarNames, zIndex),
    ...mapRecord(durationVarNames, durationCSS),
    ...mapRecord(easingVarNames, easingCSS),
    ...mapRecord(fontFamilyVarNames, fontFamily),
  };
}

// ---------------------------------------------------------------------------
// Helper: Generate CSS text for embedding in a stylesheet
// ---------------------------------------------------------------------------

function varsToCSS(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([prop, value]) => `  ${prop}: ${value};`)
    .join("\n");
}

/** Returns the complete CSS text for both :root (light) and .dark themes */
export function buildThemeCSS(): string {
  const lightVars = buildLightThemeVars();
  const darkVars = buildDarkThemeVars();

  return `:root {\n${varsToCSS(lightVars)}\n}\n\n.dark {\n${varsToCSS(darkVars)}\n}`;
}

// ---------------------------------------------------------------------------
// Exported Contract Objects
// ---------------------------------------------------------------------------
// These are the public API for the contract layer. Components and utilities
// import these to reference CSS variable names without string duplication.
// ---------------------------------------------------------------------------

export const contract = {
  color: colorVarNames,
  radius: radiusVarNames,
  shadow: shadowVarNames,
  zIndex: zIndexVarNames,
  duration: durationVarNames,
  easing: easingVarNames,
  fontFamily: fontFamilyVarNames,
} as const;

// ---------------------------------------------------------------------------
// Utility: CSS var() reference helpers
// ---------------------------------------------------------------------------
// Use these in inline styles or when constructing dynamic class strings.
//
// Color values are stored as complete oklch() values, so no rgb() wrapping
// is needed. Use var() directly.
//
// Example:
//   style={{ color: cssVar.color("primary") }}
//   → "var(--primary)"
//
//   style={{ borderRadius: cssVar.radius("md") }}
//   → "var(--radius-md)"
// ---------------------------------------------------------------------------

export const cssVar = {
  /** Returns `var(--<key>)` for use in style props */
  color: (key: SemanticColorKey): string => `var(${colorVarNames[key]})`,

  /**
   * Returns a color-mix() expression with a custom alpha channel.
   *
   * Because oklch values are stored as complete `oklch(L C H)` strings
   * in the CSS custom property, you cannot directly decompose them with
   * simple var() references. For alpha-modified colors, prefer using
   * Tailwind's built-in opacity modifier syntax (e.g. `bg-primary/50`)
   * or define a dedicated muted token.
   *
   * If you need programmatic alpha in JS, use this helper which produces
   * a color-mix() expression for broad browser support.
   */
  colorAlpha: (key: SemanticColorKey, alpha: number): string =>
    `color-mix(in oklch, var(${colorVarNames[key]}) ${Math.round(alpha * 100)}%, transparent)`,

  /** Returns `var(--radius-<key>)` */
  radius: (key: RadiusKey): string => `var(${radiusVarNames[key]})`,

  /** Returns `var(--shadow-<key>)` */
  shadow: (key: ShadowKey): string => `var(${shadowVarNames[key]})`,

  /** Returns `var(--z-<key>)` */
  zIndex: (key: ZIndexKey): string => `var(${zIndexVarNames[key]})`,

  /** Returns `var(--duration-<key>)` */
  duration: (key: DurationKey): string => `var(${durationVarNames[key]})`,

  /** Returns `var(--easing-<key>)` */
  easing: (key: EasingKey): string => `var(${easingVarNames[key]})`,

  /** Returns `var(--font-<key>)` */
  fontFamily: (key: FontFamilyKey): string => `var(${fontFamilyVarNames[key]})`,

  /** Returns the raw `var(--<key>)` — same as color() since values are complete oklch */
  colorChannels: (key: SemanticColorKey): string =>
    `var(${colorVarNames[key]})`,
} as const;

// ---------------------------------------------------------------------------
// Type Exports
// ---------------------------------------------------------------------------

export type ThemeVars = ReturnType<typeof buildLightThemeVars>;
export type ColorVarName = (typeof colorVarNames)[SemanticColorKey];
export type RadiusVarName = (typeof radiusVarNames)[RadiusKey];
export type ShadowVarName = (typeof shadowVarNames)[ShadowKey];
export type ZIndexVarName = (typeof zIndexVarNames)[ZIndexKey];
export type DurationVarName = (typeof durationVarNames)[DurationKey];
export type EasingVarName = (typeof easingVarNames)[EasingKey];
export type FontFamilyVarName = (typeof fontFamilyVarNames)[FontFamilyKey];
