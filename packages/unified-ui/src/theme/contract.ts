// ============================================================================
// Unified UI — Theme Contract
// ============================================================================
// Defines the mapping between semantic token names and CSS custom properties.
// This contract is the bridge between the token layer and the CSS variable
// layer. Both the light and dark themes must satisfy this contract — if a
// variable is defined here, every theme must provide a value for it.
//
// PREFIX DECISION (documented):
//   Chosen prefix: `--ds-` (design-system).
//   Alternatives considered: `--uui-` (branded).
//   Rationale: `--ds-` is already used consistently across all token layers,
//   CSS custom properties, Tailwind @theme mappings, component data attributes
//   (`data-ds`, `data-ds-component`), and utility functions (`dsVar`,
//   `dsColorVar`, `dsAttr`, `dsStateAttr`). Renaming would touch every file
//   in the system with no functional benefit. The `--ds-` prefix is short,
//   unambiguous, and already avoids collisions with Fumadocs (`--color-fd-*`)
//   and third-party libraries. If a future rename is needed, update the
//   `PREFIX` constant below and run a codebase-wide find/replace.
//
// Color variables store raw RGB channel strings (e.g. "99 102 241") so
// they can be used with Tailwind's opacity modifier syntax:
//   bg-[rgb(var(--ds-color-primary)/0.5)]
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

/**
 * Prefix for all Unified UI CSS custom properties.
 *
 * This is the single source of truth for the variable namespace. Every CSS
 * custom property in the design system is derived from this constant:
 *   `${PREFIX}-color-primary` → `--ds-color-primary`
 *
 * If you ever need to rebrand the prefix (e.g. to `--uui-`), change this
 * value and update `design-system.css` to match. All TypeScript references
 * flow through this constant automatically.
 */
const PREFIX = "--ds" as const;

// ---------------------------------------------------------------------------
// Color Contract
// ---------------------------------------------------------------------------

const colorVarNames: Record<SemanticColorKey, string> = {
  background: `${PREFIX}-color-background`,
  foreground: `${PREFIX}-color-foreground`,

  surface: `${PREFIX}-color-surface`,
  surfaceRaised: `${PREFIX}-color-surface-raised`,
  surfaceOverlay: `${PREFIX}-color-surface-overlay`,

  muted: `${PREFIX}-color-muted`,
  mutedForeground: `${PREFIX}-color-muted-foreground`,

  primary: `${PREFIX}-color-primary`,
  primaryForeground: `${PREFIX}-color-primary-foreground`,
  primaryHover: `${PREFIX}-color-primary-hover`,
  primaryActive: `${PREFIX}-color-primary-active`,
  primaryMuted: `${PREFIX}-color-primary-muted`,
  primaryMutedForeground: `${PREFIX}-color-primary-muted-foreground`,

  secondary: `${PREFIX}-color-secondary`,
  secondaryForeground: `${PREFIX}-color-secondary-foreground`,
  secondaryHover: `${PREFIX}-color-secondary-hover`,
  secondaryActive: `${PREFIX}-color-secondary-active`,

  success: `${PREFIX}-color-success`,
  successForeground: `${PREFIX}-color-success-foreground`,
  successMuted: `${PREFIX}-color-success-muted`,
  successMutedForeground: `${PREFIX}-color-success-muted-foreground`,

  warning: `${PREFIX}-color-warning`,
  warningForeground: `${PREFIX}-color-warning-foreground`,
  warningMuted: `${PREFIX}-color-warning-muted`,
  warningMutedForeground: `${PREFIX}-color-warning-muted-foreground`,

  danger: `${PREFIX}-color-danger`,
  dangerForeground: `${PREFIX}-color-danger-foreground`,
  dangerHover: `${PREFIX}-color-danger-hover`,
  dangerActive: `${PREFIX}-color-danger-active`,
  dangerMuted: `${PREFIX}-color-danger-muted`,
  dangerMutedForeground: `${PREFIX}-color-danger-muted-foreground`,

  info: `${PREFIX}-color-info`,
  infoForeground: `${PREFIX}-color-info-foreground`,
  infoMuted: `${PREFIX}-color-info-muted`,
  infoMutedForeground: `${PREFIX}-color-info-muted-foreground`,

  border: `${PREFIX}-color-border`,
  borderMuted: `${PREFIX}-color-border-muted`,
  borderStrong: `${PREFIX}-color-border-strong`,

  focusRing: `${PREFIX}-color-focus-ring`,

  input: `${PREFIX}-color-input`,
  inputForeground: `${PREFIX}-color-input-foreground`,
  inputPlaceholder: `${PREFIX}-color-input-placeholder`,

  disabled: `${PREFIX}-color-disabled`,
  disabledForeground: `${PREFIX}-color-disabled-foreground`,
} as const;

// ---------------------------------------------------------------------------
// Radius Contract
// ---------------------------------------------------------------------------

type RadiusKey = keyof typeof radius;

const radiusVarNames: Record<RadiusKey, string> = {
  none: `${PREFIX}-radius-none`,
  sm: `${PREFIX}-radius-sm`,
  md: `${PREFIX}-radius-md`,
  lg: `${PREFIX}-radius-lg`,
  xl: `${PREFIX}-radius-xl`,
  full: `${PREFIX}-radius-full`,
} as const;

// ---------------------------------------------------------------------------
// Shadow Contract
// ---------------------------------------------------------------------------

type ShadowKey = keyof typeof shadow;

const shadowVarNames: Record<ShadowKey, string> = {
  none: `${PREFIX}-shadow-none`,
  xs: `${PREFIX}-shadow-xs`,
  sm: `${PREFIX}-shadow-sm`,
  md: `${PREFIX}-shadow-md`,
  lg: `${PREFIX}-shadow-lg`,
  xl: `${PREFIX}-shadow-xl`,
  "2xl": `${PREFIX}-shadow-2xl`,
  focusRing: `${PREFIX}-shadow-focus-ring`,
} as const;

// ---------------------------------------------------------------------------
// Z-Index Contract
// ---------------------------------------------------------------------------

type ZIndexKey = keyof typeof zIndex;

const zIndexVarNames: Record<ZIndexKey, string> = {
  base: `${PREFIX}-z-base`,
  dropdown: `${PREFIX}-z-dropdown`,
  sticky: `${PREFIX}-z-sticky`,
  overlay: `${PREFIX}-z-overlay`,
  modal: `${PREFIX}-z-modal`,
  popover: `${PREFIX}-z-popover`,
  toast: `${PREFIX}-z-toast`,
  tooltip: `${PREFIX}-z-tooltip`,
  max: `${PREFIX}-z-max`,
} as const;

// ---------------------------------------------------------------------------
// Motion Contract
// ---------------------------------------------------------------------------

type DurationKey = keyof typeof durationCSS;
type EasingKey = keyof typeof easingCSS;

const durationVarNames: Record<DurationKey, string> = {
  instant: `${PREFIX}-duration-instant`,
  fast: `${PREFIX}-duration-fast`,
  moderate: `${PREFIX}-duration-moderate`,
  normal: `${PREFIX}-duration-normal`,
  slow: `${PREFIX}-duration-slow`,
  slower: `${PREFIX}-duration-slower`,
  slowest: `${PREFIX}-duration-slowest`,
} as const;

const easingVarNames: Record<EasingKey, string> = {
  standard: `${PREFIX}-easing-standard`,
  decelerate: `${PREFIX}-easing-decelerate`,
  accelerate: `${PREFIX}-easing-accelerate`,
  emphasize: `${PREFIX}-easing-emphasize`,
  linear: `${PREFIX}-easing-linear`,
  snap: `${PREFIX}-easing-snap`,
} as const;

// ---------------------------------------------------------------------------
// Font Family Contract
// ---------------------------------------------------------------------------

type FontFamilyKey = keyof typeof fontFamily;

const fontFamilyVarNames: Record<FontFamilyKey, string> = {
  display: `${PREFIX}-font-display`,
  sans: `${PREFIX}-font-sans`,
  serif: `${PREFIX}-font-serif`,
  mono: `${PREFIX}-font-mono`,
  inherit: `${PREFIX}-font-inherit`,
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
// Example:
//   style={{ color: cssVar.color("primary") }}
//   → "rgb(var(--ds-color-primary))"
//
//   style={{ borderRadius: cssVar.radius("md") }}
//   → "var(--ds-radius-md)"
// ---------------------------------------------------------------------------

export const cssVar = {
  /** Returns `rgb(var(--ds-color-<key>))` for use in style props */
  color: (key: SemanticColorKey): string => `rgb(var(${colorVarNames[key]}))`,

  /** Returns `rgb(var(--ds-color-<key>) / <alpha>)` for colors with opacity */
  colorAlpha: (key: SemanticColorKey, alpha: number): string =>
    `rgb(var(${colorVarNames[key]}) / ${alpha})`,

  /** Returns `var(--ds-radius-<key>)` */
  radius: (key: RadiusKey): string => `var(${radiusVarNames[key]})`,

  /** Returns `var(--ds-shadow-<key>)` */
  shadow: (key: ShadowKey): string => `var(${shadowVarNames[key]})`,

  /** Returns `var(--ds-z-<key>)` */
  zIndex: (key: ZIndexKey): string => `var(${zIndexVarNames[key]})`,

  /** Returns `var(--ds-duration-<key>)` */
  duration: (key: DurationKey): string => `var(${durationVarNames[key]})`,

  /** Returns `var(--ds-easing-<key>)` */
  easing: (key: EasingKey): string => `var(${easingVarNames[key]})`,

  /** Returns `var(--ds-font-<key>)` */
  fontFamily: (key: FontFamilyKey): string => `var(${fontFamilyVarNames[key]})`,

  /** Returns the raw `var(--ds-color-<key>)` channels without rgb() wrapping */
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
