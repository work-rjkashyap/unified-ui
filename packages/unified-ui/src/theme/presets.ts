// ============================================================================
// Unified UI — Theme Presets
// ============================================================================
// Defines all available theme presets for the theme customizer. Each preset
// contains a complete set of semantic color tokens for both light and dark
// modes. Additionally, defines the available options for radius, font,
// shadow mode, and other style knobs.
//
// Architecture:
//   - Color presets map a human-friendly name to a full semantic color set
//   - Each preset provides both `light` and `dark` token overrides
//   - Only the "chrome" colors (primary, secondary, accent, muted, surfaces,
//     borders, ring, sidebar) change per preset — status colors (success,
//     warning, danger, info) remain constant across all presets
//   - Radius, font, and shadow presets are independent axes that can be
//     combined freely with any color preset
//
// Consumers use the `ThemeConfig` type to describe a full theme configuration.
// The customizer store persists a `ThemeConfig` to localStorage and applies
// it at runtime by injecting CSS custom properties onto :root / .dark.
//
// NEVER import individual palette stops in components. Components read CSS
// custom properties; this file is consumed only by the customizer layer.
// ============================================================================

import {
  amber,
  blue,
  brand,
  cyan,
  emerald,
  fuchsia,
  gray,
  green,
  indigo,
  lime,
  pink,
  purple,
  red,
  sky,
  slate,
  teal,
  yellow,
  zinc,
} from "@unified-ui/tokens/colors";

// ---------------------------------------------------------------------------
// Shared Status Colors (constant across all presets)
// ---------------------------------------------------------------------------
// Status colors communicate meaning (success, warning, danger, info) and
// should remain consistent regardless of the chosen color preset. Users
// should always associate green with success, red with danger, etc.
// ---------------------------------------------------------------------------

const STATUS_LIGHT = {
  success: green[600],
  successForeground: "oklch(0.145 0 0)",
  successMuted: green[50],
  successMutedForeground: green[700],

  warning: amber[500],
  warningForeground: "oklch(0.145 0 0)",
  warningMuted: amber[50],
  warningMutedForeground: amber[700],

  danger: red[600],
  dangerForeground: "oklch(0.985 0 0)",
  dangerHover: red[700],
  dangerActive: red[800],
  dangerMuted: red[50],
  dangerMutedForeground: red[700],

  destructive: red[600],
  destructiveForeground: "oklch(0.985 0 0)",

  info: blue[600],
  infoForeground: "oklch(0.985 0 0)",
  infoMuted: blue[50],
  infoMutedForeground: blue[700],
} as const;

const STATUS_DARK = {
  success: green[500],
  successForeground: "oklch(0.145 0 0)",
  successMuted: green[950],
  successMutedForeground: green[300],

  warning: amber[400],
  warningForeground: "oklch(0.145 0 0)",
  warningMuted: amber[950],
  warningMutedForeground: amber[300],

  danger: red[500],
  dangerForeground: "oklch(0.985 0 0)",
  dangerHover: red[400],
  dangerActive: red[300],
  dangerMuted: red[950],
  dangerMutedForeground: red[300],

  destructive: red[500],
  destructiveForeground: "oklch(0.985 0 0)",

  info: blue[400],
  infoForeground: "oklch(0.145 0 0)",
  infoMuted: blue[950],
  infoMutedForeground: blue[300],
} as const;

// ---------------------------------------------------------------------------
// Shared Chart Colors
// ---------------------------------------------------------------------------

const CHART_LIGHT = {
  chart1: "oklch(0.646 0.222 41.116)",
  chart2: "oklch(0.6 0.118 184.704)",
  chart3: "oklch(0.398 0.07 227.392)",
  chart4: "oklch(0.828 0.189 84.429)",
  chart5: "oklch(0.769 0.188 70.08)",
} as const;

const CHART_DARK = {
  chart1: "oklch(0.488 0.243 264.376)",
  chart2: "oklch(0.696 0.17 162.48)",
  chart3: "oklch(0.769 0.188 70.08)",
  chart4: "oklch(0.627 0.265 303.9)",
  chart5: "oklch(0.645 0.246 16.439)",
} as const;

// ---------------------------------------------------------------------------
// Semantic Color Token Type
// ---------------------------------------------------------------------------
// This is the full set of semantic color keys that every preset must satisfy.
// It mirrors `SemanticColorKey` from the tokens layer.
// ---------------------------------------------------------------------------

export type PresetSemanticColors = {
  background: string;
  foreground: string;

  surface: string;
  surfaceRaised: string;
  surfaceOverlay: string;

  card: string;
  cardForeground: string;

  popover: string;
  popoverForeground: string;

  muted: string;
  mutedForeground: string;

  primary: string;
  primaryForeground: string;
  primaryHover: string;
  primaryActive: string;
  primaryMuted: string;
  primaryMutedForeground: string;

  secondary: string;
  secondaryForeground: string;
  secondaryHover: string;
  secondaryActive: string;

  accent: string;
  accentForeground: string;

  success: string;
  successForeground: string;
  successMuted: string;
  successMutedForeground: string;

  warning: string;
  warningForeground: string;
  warningMuted: string;
  warningMutedForeground: string;

  danger: string;
  dangerForeground: string;
  dangerHover: string;
  dangerActive: string;
  dangerMuted: string;
  dangerMutedForeground: string;

  destructive: string;
  destructiveForeground: string;

  info: string;
  infoForeground: string;
  infoMuted: string;
  infoMutedForeground: string;

  border: string;
  borderMuted: string;
  borderStrong: string;

  focusRing: string;
  ring: string;

  input: string;
  inputForeground: string;
  inputPlaceholder: string;

  disabled: string;
  disabledForeground: string;

  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;

  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
};

// ---------------------------------------------------------------------------
// Color Preset Type
// ---------------------------------------------------------------------------

export interface ColorPreset {
  /** Human-readable name for display in the customizer UI */
  readonly name: string;
  /** Unique key used for localStorage persistence and lookups */
  readonly key: string;
  /** A representative color swatch (oklch) for the preset picker UI */
  readonly swatch: string;
  /** Whether this preset uses a chromatic (non-neutral) primary */
  readonly chromatic: boolean;
  /** Full light theme semantic colors */
  readonly light: PresetSemanticColors;
  /** Full dark theme semantic colors */
  readonly dark: PresetSemanticColors;
}

// ---------------------------------------------------------------------------
// Additional Color Palettes (not in tokens/colors.ts)
// ---------------------------------------------------------------------------

const stone = {
  50: "oklch(0.985 0.001 106.424)",
  100: "oklch(0.97 0.001 106.424)",
  200: "oklch(0.923 0.003 48.717)",
  300: "oklch(0.869 0.005 56.366)",
  400: "oklch(0.709 0.01 56.259)",
  500: "oklch(0.553 0.013 58.071)",
  600: "oklch(0.444 0.011 73.639)",
  700: "oklch(0.374 0.01 67.558)",
  800: "oklch(0.268 0.007 34.298)",
  900: "oklch(0.216 0.006 56.043)",
  950: "oklch(0.147 0.004 49.25)",
} as const;

const neutral = {
  50: "oklch(0.985 0 0)",
  100: "oklch(0.97 0 0)",
  200: "oklch(0.922 0 0)",
  300: "oklch(0.87 0 0)",
  400: "oklch(0.708 0 0)",
  500: "oklch(0.556 0 0)",
  600: "oklch(0.439 0 0)",
  700: "oklch(0.371 0 0)",
  800: "oklch(0.269 0 0)",
  900: "oklch(0.205 0 0)",
  950: "oklch(0.145 0 0)",
} as const;

const violet = {
  50: "oklch(0.969 0.016 293.756)",
  100: "oklch(0.943 0.029 294.588)",
  200: "oklch(0.894 0.057 293.283)",
  300: "oklch(0.811 0.111 293.571)",
  400: "oklch(0.702 0.183 293.541)",
  500: "oklch(0.606 0.25 292.717)",
  600: "oklch(0.541 0.281 293.009)",
  700: "oklch(0.491 0.27 292.581)",
  800: "oklch(0.432 0.232 292.759)",
  900: "oklch(0.38 0.189 293.745)",
  950: "oklch(0.283 0.141 291.089)",
} as const;

const rose = {
  50: "oklch(0.969 0.015 12.422)",
  100: "oklch(0.941 0.03 12.58)",
  200: "oklch(0.892 0.058 10.001)",
  300: "oklch(0.81 0.117 11.638)",
  400: "oklch(0.712 0.194 13.428)",
  500: "oklch(0.645 0.246 16.439)",
  600: "oklch(0.586 0.253 17.585)",
  700: "oklch(0.514 0.222 16.935)",
  800: "oklch(0.455 0.188 13.697)",
  900: "oklch(0.41 0.159 10.539)",
  950: "oklch(0.271 0.105 12.094)",
} as const;

const orange = {
  50: "oklch(0.98 0.016 73.684)",
  100: "oklch(0.954 0.038 75.164)",
  200: "oklch(0.901 0.076 70.697)",
  300: "oklch(0.837 0.128 66.29)",
  400: "oklch(0.75 0.183 55.934)",
  500: "oklch(0.705 0.213 47.604)",
  600: "oklch(0.646 0.222 41.116)",
  700: "oklch(0.553 0.195 38.402)",
  800: "oklch(0.47 0.157 37.304)",
  900: "oklch(0.408 0.123 38.172)",
  950: "oklch(0.266 0.079 36.259)",
} as const;

// ---------------------------------------------------------------------------
// Helper: Build a Neutral-Based Preset
// ---------------------------------------------------------------------------
// Most presets share the same structure — they differ only in which neutral
// palette they use for chrome surfaces. This helper builds a full preset
// from a neutral palette.
// ---------------------------------------------------------------------------

function buildNeutralPreset(
  name: string,
  key: string,
  palette: Record<string, string>,
): Omit<ColorPreset, "swatch"> {
  return {
    name,
    key,
    chromatic: false,
    light: {
      background: "oklch(1 0 0)",
      foreground: palette[950],

      surface: palette[50],
      surfaceRaised: "oklch(1 0 0)",
      surfaceOverlay: palette[100],

      card: "oklch(1 0 0)",
      cardForeground: palette[950],

      popover: "oklch(1 0 0)",
      popoverForeground: palette[950],

      muted: palette[100],
      mutedForeground: palette[500],

      primary: palette[900],
      primaryForeground: palette[50],
      primaryHover: palette[800],
      primaryActive: palette[700],
      primaryMuted: palette[100],
      primaryMutedForeground: palette[900],

      secondary: palette[100],
      secondaryForeground: palette[900],
      secondaryHover: palette[200],
      secondaryActive: palette[300],

      accent: palette[100],
      accentForeground: palette[900],

      ...STATUS_LIGHT,
      ...CHART_LIGHT,

      border: palette[200],
      borderMuted: palette[100],
      borderStrong: palette[400],

      focusRing: palette[400],
      ring: palette[400],

      input: palette[200],
      inputForeground: palette[900],
      inputPlaceholder: palette[500],

      disabled: palette[100],
      disabledForeground: palette[500],

      sidebar: palette[50],
      sidebarForeground: palette[950],
      sidebarPrimary: palette[900],
      sidebarPrimaryForeground: palette[50],
      sidebarAccent: palette[100],
      sidebarAccentForeground: palette[900],
      sidebarBorder: palette[200],
      sidebarRing: palette[400],
    },
    dark: {
      background: palette[950],
      foreground: palette[50],

      surface: palette[900],
      surfaceRaised: palette[800],
      surfaceOverlay: palette[800],

      card: palette[900],
      cardForeground: palette[50],

      popover: palette[800],
      popoverForeground: palette[50],

      muted: palette[800],
      mutedForeground: palette[400],

      primary: palette[50],
      primaryForeground: palette[900],
      primaryHover: palette[200],
      primaryActive: palette[300],
      primaryMuted: palette[800],
      primaryMutedForeground: palette[50],

      secondary: palette[800],
      secondaryForeground: palette[50],
      secondaryHover: palette[700],
      secondaryActive: palette[600],

      accent: palette[700],
      accentForeground: palette[50],

      ...STATUS_DARK,
      ...CHART_DARK,

      border: `color-mix(in oklch, ${palette[50]} 10%, transparent)`,
      borderMuted: palette[800],
      borderStrong: palette[500],

      focusRing: palette[500],
      ring: palette[500],

      input: `color-mix(in oklch, ${palette[50]} 15%, transparent)`,
      inputForeground: palette[50],
      inputPlaceholder: palette[500],

      disabled: palette[800],
      disabledForeground: palette[600],

      sidebar: palette[900],
      sidebarForeground: palette[50],
      sidebarPrimary: blue[600],
      sidebarPrimaryForeground: palette[50],
      sidebarAccent: palette[800],
      sidebarAccentForeground: palette[50],
      sidebarBorder: `color-mix(in oklch, ${palette[50]} 10%, transparent)`,
      sidebarRing: palette[600],
    },
  };
}

// ---------------------------------------------------------------------------
// Helper: Build a Chromatic (Colored) Primary Preset
// ---------------------------------------------------------------------------
// Chromatic presets use a colored palette for primary/accent and a neutral
// palette for surfaces/borders/text.
// ---------------------------------------------------------------------------

function buildChromaticPreset(
  name: string,
  key: string,
  primary: Record<string, string>,
  surface: Record<string, string> = zinc,
): Omit<ColorPreset, "swatch"> {
  return {
    name,
    key,
    chromatic: true,
    light: {
      background: "oklch(1 0 0)",
      foreground: surface[950],

      surface: surface[50],
      surfaceRaised: "oklch(1 0 0)",
      surfaceOverlay: surface[100],

      card: "oklch(1 0 0)",
      cardForeground: surface[950],

      popover: "oklch(1 0 0)",
      popoverForeground: surface[950],

      muted: surface[100],
      mutedForeground: surface[500],

      primary: primary[600],
      primaryForeground: "oklch(0.985 0 0)",
      primaryHover: primary[700],
      primaryActive: primary[800],
      primaryMuted: primary[50],
      primaryMutedForeground: primary[700],

      secondary: surface[100],
      secondaryForeground: surface[900],
      secondaryHover: surface[200],
      secondaryActive: surface[300],

      accent: primary[50],
      accentForeground: primary[700],

      ...STATUS_LIGHT,
      ...CHART_LIGHT,

      border: surface[200],
      borderMuted: surface[100],
      borderStrong: surface[400],

      focusRing: primary[500],
      ring: primary[500],

      input: surface[200],
      inputForeground: surface[900],
      inputPlaceholder: surface[500],

      disabled: surface[100],
      disabledForeground: surface[500],

      sidebar: surface[50],
      sidebarForeground: surface[950],
      sidebarPrimary: primary[600],
      sidebarPrimaryForeground: "oklch(0.985 0 0)",
      sidebarAccent: primary[50],
      sidebarAccentForeground: primary[700],
      sidebarBorder: surface[200],
      sidebarRing: primary[500],
    },
    dark: {
      background: surface[950],
      foreground: surface[50],

      surface: surface[900],
      surfaceRaised: surface[800],
      surfaceOverlay: surface[800],

      card: surface[900],
      cardForeground: surface[50],

      popover: surface[800],
      popoverForeground: surface[50],

      muted: surface[800],
      mutedForeground: surface[400],

      primary: primary[500],
      primaryForeground: "oklch(0.985 0 0)",
      primaryHover: primary[400],
      primaryActive: primary[300],
      primaryMuted: primary[950],
      primaryMutedForeground: primary[300],

      secondary: surface[800],
      secondaryForeground: surface[50],
      secondaryHover: surface[700],
      secondaryActive: surface[600],

      accent: primary[950],
      accentForeground: primary[300],

      ...STATUS_DARK,
      ...CHART_DARK,

      border: `color-mix(in oklch, ${surface[50]} 10%, transparent)`,
      borderMuted: surface[800],
      borderStrong: surface[500],

      focusRing: primary[500],
      ring: primary[500],

      input: `color-mix(in oklch, ${surface[50]} 15%, transparent)`,
      inputForeground: surface[50],
      inputPlaceholder: surface[500],

      disabled: surface[800],
      disabledForeground: surface[600],

      sidebar: surface[900],
      sidebarForeground: surface[50],
      sidebarPrimary: primary[500],
      sidebarPrimaryForeground: "oklch(0.985 0 0)",
      sidebarAccent: primary[950],
      sidebarAccentForeground: primary[300],
      sidebarBorder: `color-mix(in oklch, ${surface[50]} 10%, transparent)`,
      sidebarRing: primary[500],
    },
  };
}

// ============================================================================
// Color Presets Registry
// ============================================================================

export const COLOR_PRESETS: readonly ColorPreset[] = [
  // -------------------------------------------------------------------------
  // Neutral Presets (achromatic primaries)
  // -------------------------------------------------------------------------
  {
    swatch: zinc[900],
    ...buildNeutralPreset("Zinc", "zinc", zinc),
  },
  {
    swatch: slate[900],
    ...buildNeutralPreset("Slate", "slate", slate),
  },
  {
    swatch: gray[900],
    ...buildNeutralPreset("Gray", "gray", gray),
  },
  {
    swatch: stone[900],
    ...buildNeutralPreset("Stone", "stone", stone),
  },
  {
    swatch: neutral[900],
    ...buildNeutralPreset("Neutral", "neutral", neutral),
  },

  // -------------------------------------------------------------------------
  // Chromatic Presets (colored primaries)
  // -------------------------------------------------------------------------
  {
    swatch: blue[600],
    ...buildChromaticPreset("Blue", "blue", blue),
  },
  {
    swatch: green[600],
    ...buildChromaticPreset("Green", "green", green),
  },
  {
    swatch: violet[600],
    ...buildChromaticPreset("Violet", "violet", violet),
  },
  {
    swatch: rose[600],
    ...buildChromaticPreset("Rose", "rose", rose),
  },
  {
    swatch: orange[600],
    ...buildChromaticPreset("Orange", "orange", orange),
  },
  {
    swatch: red[600],
    ...buildChromaticPreset("Red", "red", red),
  },
  {
    swatch: teal[600],
    ...buildChromaticPreset("Teal", "teal", teal),
  },
  {
    swatch: brand[600],
    ...buildChromaticPreset("Brand", "brand", brand),
  },
  {
    swatch: indigo[600],
    ...buildChromaticPreset("Indigo", "indigo", indigo),
  },
  {
    swatch: purple[600],
    ...buildChromaticPreset("Purple", "purple", purple),
  },
  {
    swatch: pink[600],
    ...buildChromaticPreset("Pink", "pink", pink),
  },
  {
    swatch: cyan[600],
    ...buildChromaticPreset("Cyan", "cyan", cyan),
  },
  {
    swatch: emerald[600],
    ...buildChromaticPreset("Emerald", "emerald", emerald),
  },
  {
    swatch: yellow[600],
    ...buildChromaticPreset("Yellow", "yellow", yellow),
  },
  {
    swatch: fuchsia[600],
    ...buildChromaticPreset("Fuchsia", "fuchsia", fuchsia),
  },
  {
    swatch: sky[600],
    ...buildChromaticPreset("Sky", "sky", sky),
  },
  {
    swatch: lime[600],
    ...buildChromaticPreset("Lime", "lime", lime),
  },
  {
    swatch: amber[600],
    ...buildChromaticPreset("Amber", "amber", amber),
  },
] as const;

// ---------------------------------------------------------------------------
// Preset Lookup Helpers
// ---------------------------------------------------------------------------

/** Get a color preset by its key. Returns the default (zinc) if not found. */
export function getColorPreset(key: string): ColorPreset {
  return COLOR_PRESETS.find((p) => p.key === key) ?? COLOR_PRESETS[0];
}

/** All available color preset keys. */
export const COLOR_PRESET_KEYS = COLOR_PRESETS.map((p) => p.key);

export type ColorPresetKey = (typeof COLOR_PRESET_KEYS)[number];

// ============================================================================
// Radius Presets
// ============================================================================
// Controls the global `--radius` base value. Individual radius tokens
// (--radius-sm, --radius-md, etc.) are computed relative to this base
// in styles.css. The customizer overrides only the base `--radius`.
// ============================================================================

export interface RadiusPreset {
  readonly name: string;
  readonly key: string;
  /** The CSS value for `--radius` (base radius) */
  readonly value: string;
  /** Human-readable pixel approximation for display */
  readonly label: string;
}

export const RADIUS_PRESETS: readonly RadiusPreset[] = [
  { name: "None", key: "0", value: "0px", label: "0px" },
  { name: "Subtle", key: "0.25", value: "0.25rem", label: "4px" },
  { name: "Small", key: "0.375", value: "0.375rem", label: "6px" },
  { name: "Medium", key: "0.5", value: "0.5rem", label: "8px" },
  { name: "Default", key: "0.625", value: "0.625rem", label: "10px" },
  { name: "Large", key: "0.75", value: "0.75rem", label: "12px" },
  { name: "XL", key: "1", value: "1rem", label: "16px" },
] as const;

export const DEFAULT_RADIUS_KEY = "0.625";

export function getRadiusPreset(key: string): RadiusPreset {
  return RADIUS_PRESETS.find((r) => r.key === key) ?? RADIUS_PRESETS[4];
}

// ============================================================================
// Font Family Presets
// ============================================================================
// Controls the primary body font. These map to the CSS variables already
// loaded via next/font/google in the root layout. The customizer overrides
// `--font-sans` to change the default body typeface.
// ============================================================================

export interface FontPreset {
  readonly name: string;
  readonly key: string;
  /** The CSS font-family value to inject into `--font-sans` */
  readonly value: string;
  /** A sample string for previewing the font */
  readonly sample: string;
}

export const FONT_PRESETS: readonly FontPreset[] = [
  // ---- Built-in fonts (loaded via next/font in the docs app) ----
  {
    name: "Outfit",
    key: "outfit",
    value:
      'var(--font-outfit), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    sample: "Aa",
  },
  {
    name: "Inter",
    key: "inter",
    value:
      'var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "Geist Sans",
    key: "geist-sans",
    value:
      'var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "DM Sans",
    key: "dm-sans",
    value:
      'var(--font-dm-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "Plus Jakarta Sans",
    key: "plus-jakarta-sans",
    value:
      'var(--font-plus-jakarta-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "Open Sans",
    key: "open-sans",
    value:
      'var(--font-open-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    sample: "Aa",
  },
  {
    name: "Poppins",
    key: "poppins",
    value:
      'var(--font-poppins), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "Montserrat",
    key: "montserrat",
    value:
      'var(--font-montserrat), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "Lato",
    key: "lato",
    value:
      'var(--font-lato), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    sample: "Aa",
  },
  {
    name: "Nunito",
    key: "nunito",
    value:
      'var(--font-nunito), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "Raleway",
    key: "raleway",
    value:
      'var(--font-raleway), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "Rubik",
    key: "rubik",
    value:
      'var(--font-rubik), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "Source Sans 3",
    key: "source-sans-3",
    value:
      'var(--font-source-sans-3), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    sample: "Aa",
  },
  {
    name: "Work Sans",
    key: "work-sans",
    value:
      'var(--font-work-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "Manrope",
    key: "manrope",
    value:
      'var(--font-manrope), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "Space Grotesk",
    key: "space-grotesk",
    value:
      'var(--font-space-grotesk), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  // ---- Additional popular fonts ----
  {
    name: "Figtree",
    key: "figtree",
    value:
      'var(--font-figtree), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "IBM Plex Sans",
    key: "ibm-plex-sans",
    value:
      'var(--font-ibm-plex-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "Quicksand",
    key: "quicksand",
    value:
      'var(--font-quicksand), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "Cabin",
    key: "cabin",
    value:
      'var(--font-cabin), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "Barlow",
    key: "barlow",
    value:
      'var(--font-barlow), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "Josefin Sans",
    key: "josefin-sans",
    value:
      'var(--font-josefin-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "Karla",
    key: "karla",
    value:
      'var(--font-karla), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "Mulish",
    key: "mulish",
    value:
      'var(--font-mulish), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "Noto Sans",
    key: "noto-sans",
    value:
      'var(--font-noto-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "Ubuntu",
    key: "ubuntu",
    value:
      'var(--font-ubuntu), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "Sora",
    key: "sora",
    value:
      'var(--font-sora), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  {
    name: "Lexend",
    key: "lexend",
    value:
      'var(--font-lexend), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa",
  },
  // ---- Generic stacks ----
  {
    name: "System",
    key: "system",
    value:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    sample: "Aa",
  },
  {
    name: "Serif",
    key: "serif",
    value: 'var(--font-lora), Georgia, "Times New Roman", serif',
    sample: "Aa",
  },
  {
    name: "Mono",
    key: "mono",
    value:
      'var(--font-jetbrains), "Fira Code", "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    sample: "Aa",
  },
] as const;

export const DEFAULT_FONT_KEY = "outfit";

export function getFontPreset(key: string): FontPreset {
  return FONT_PRESETS.find((f) => f.key === key) ?? FONT_PRESETS[0];
}

// ============================================================================
// Shadow Mode Presets
// ============================================================================
// Controls the global shadow intensity. "none" removes all shadows,
// "subtle" uses reduced opacity, "default" uses the standard token values,
// and "heavy" uses more pronounced shadows.
// ============================================================================

export interface ShadowPreset {
  readonly name: string;
  readonly key: string;
  /** Multiplier description for the UI */
  readonly description: string;
  /** CSS overrides for each shadow token (light mode) */
  readonly light: {
    readonly none: string;
    readonly xs: string;
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
    readonly xl: string;
    readonly "2xl": string;
  };
  /** CSS overrides for each shadow token (dark mode) */
  readonly dark: {
    readonly none: string;
    readonly xs: string;
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
    readonly xl: string;
    readonly "2xl": string;
  };
}

export const SHADOW_PRESETS: readonly ShadowPreset[] = [
  {
    name: "None",
    key: "none",
    description: "No shadows — flat design",
    light: {
      none: "none",
      xs: "none",
      sm: "none",
      md: "none",
      lg: "none",
      xl: "none",
      "2xl": "none",
    },
    dark: {
      none: "none",
      xs: "none",
      sm: "none",
      md: "none",
      lg: "none",
      xl: "none",
      "2xl": "none",
    },
  },
  {
    name: "Subtle",
    key: "subtle",
    description: "Soft, minimal shadows",
    light: {
      none: "none",
      xs: "0 1px 1px 0 oklch(0 0 0 / 0.03)",
      sm: "0 1px 2px 0 oklch(0 0 0 / 0.05), 0 1px 1px -1px oklch(0 0 0 / 0.05)",
      md: "0 2px 4px -1px oklch(0 0 0 / 0.06), 0 1px 2px -1px oklch(0 0 0 / 0.04)",
      lg: "0 6px 10px -2px oklch(0 0 0 / 0.06), 0 2px 4px -2px oklch(0 0 0 / 0.04)",
      xl: "0 12px 16px -4px oklch(0 0 0 / 0.06), 0 4px 6px -3px oklch(0 0 0 / 0.04)",
      "2xl": "0 16px 32px -8px oklch(0 0 0 / 0.12)",
    },
    dark: {
      none: "none",
      xs: "0 1px 1px 0 oklch(0 0 0 / 0.1)",
      sm: "0 1px 2px 0 oklch(0 0 0 / 0.15), 0 1px 1px -1px oklch(0 0 0 / 0.15)",
      md: "0 2px 4px -1px oklch(0 0 0 / 0.2), 0 1px 2px -1px oklch(0 0 0 / 0.15)",
      lg: "0 6px 10px -2px oklch(0 0 0 / 0.2), 0 2px 4px -2px oklch(0 0 0 / 0.15)",
      xl: "0 12px 16px -4px oklch(0 0 0 / 0.25), 0 4px 6px -3px oklch(0 0 0 / 0.2)",
      "2xl": "0 16px 32px -8px oklch(0 0 0 / 0.3)",
    },
  },
  {
    name: "Default",
    key: "default",
    description: "Standard shadow depth",
    light: {
      none: "none",
      xs: "0 1px 2px 0 oklch(0 0 0 / 0.05)",
      sm: "0 1px 3px 0 oklch(0 0 0 / 0.1), 0 1px 2px -1px oklch(0 0 0 / 0.1)",
      md: "0 4px 6px -1px oklch(0 0 0 / 0.1), 0 2px 4px -2px oklch(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px oklch(0 0 0 / 0.1), 0 4px 6px -4px oklch(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px oklch(0 0 0 / 0.1), 0 8px 10px -6px oklch(0 0 0 / 0.1)",
      "2xl": "0 25px 50px -12px oklch(0 0 0 / 0.25)",
    },
    dark: {
      none: "none",
      xs: "0 1px 2px 0 oklch(0 0 0 / 0.2)",
      sm: "0 1px 3px 0 oklch(0 0 0 / 0.3), 0 1px 2px -1px oklch(0 0 0 / 0.3)",
      md: "0 4px 6px -1px oklch(0 0 0 / 0.35), 0 2px 4px -2px oklch(0 0 0 / 0.3)",
      lg: "0 10px 15px -3px oklch(0 0 0 / 0.35), 0 4px 6px -4px oklch(0 0 0 / 0.3)",
      xl: "0 20px 25px -5px oklch(0 0 0 / 0.4), 0 8px 10px -6px oklch(0 0 0 / 0.35)",
      "2xl": "0 25px 50px -12px oklch(0 0 0 / 0.5)",
    },
  },
  {
    name: "Heavy",
    key: "heavy",
    description: "Bold, pronounced shadows",
    light: {
      none: "none",
      xs: "0 1px 3px 0 oklch(0 0 0 / 0.08)",
      sm: "0 2px 4px 0 oklch(0 0 0 / 0.14), 0 1px 3px -1px oklch(0 0 0 / 0.12)",
      md: "0 6px 10px -1px oklch(0 0 0 / 0.14), 0 3px 6px -2px oklch(0 0 0 / 0.12)",
      lg: "0 14px 20px -4px oklch(0 0 0 / 0.14), 0 6px 8px -4px oklch(0 0 0 / 0.12)",
      xl: "0 24px 32px -6px oklch(0 0 0 / 0.14), 0 10px 14px -6px oklch(0 0 0 / 0.12)",
      "2xl": "0 32px 60px -16px oklch(0 0 0 / 0.35)",
    },
    dark: {
      none: "none",
      xs: "0 1px 3px 0 oklch(0 0 0 / 0.3)",
      sm: "0 2px 4px 0 oklch(0 0 0 / 0.4), 0 1px 3px -1px oklch(0 0 0 / 0.4)",
      md: "0 6px 10px -1px oklch(0 0 0 / 0.45), 0 3px 6px -2px oklch(0 0 0 / 0.4)",
      lg: "0 14px 20px -4px oklch(0 0 0 / 0.45), 0 6px 8px -4px oklch(0 0 0 / 0.4)",
      xl: "0 24px 32px -6px oklch(0 0 0 / 0.5), 0 10px 14px -6px oklch(0 0 0 / 0.45)",
      "2xl": "0 32px 60px -16px oklch(0 0 0 / 0.6)",
    },
  },
] as const;

export const DEFAULT_SHADOW_KEY = "default";

export function getShadowPreset(key: string): ShadowPreset {
  return SHADOW_PRESETS.find((s) => s.key === key) ?? SHADOW_PRESETS[2];
}

// ============================================================================
// Surface Style Presets
// ============================================================================
// Controls the visual treatment of card/surface elements — whether they
// rely on borders, shadows, or both for differentiation.
// ============================================================================

export interface SurfaceStylePreset {
  readonly name: string;
  readonly key: string;
  readonly description: string;
}

export const SURFACE_STYLE_PRESETS: readonly SurfaceStylePreset[] = [
  {
    name: "Bordered",
    key: "bordered",
    description: "Cards and surfaces use borders for separation",
  },
  {
    name: "Elevated",
    key: "elevated",
    description: "Cards and surfaces use shadows for depth",
  },
  {
    name: "Mixed",
    key: "mixed",
    description: "Combines borders with subtle shadows",
  },
] as const;

export const DEFAULT_SURFACE_STYLE_KEY = "bordered";

// ============================================================================
// Menu Color Presets
// ============================================================================
// Controls the sidebar/navigation background scheme. Overrides the sidebar
// CSS custom properties that the color preset sets by default.
//
// Options:
//   - "default"  — Uses the color preset's built-in sidebar colors (no override)
//   - "muted"    — Sidebar matches the muted/surface color, blending with content
//   - "inverted" — Dark sidebar in light mode, lighter sidebar in dark mode
//   - "primary"  — Sidebar uses the primary color as its background
// ============================================================================

export interface MenuColorPreset {
  readonly name: string;
  readonly key: string;
  readonly description: string;
}

export const MENU_COLOR_PRESETS: readonly MenuColorPreset[] = [
  {
    name: "Default",
    key: "default",
    description: "Uses the color preset's built-in sidebar colors",
  },
  {
    name: "Muted",
    key: "muted",
    description: "Sidebar matches the muted/surface tone — blends with content",
  },
  {
    name: "Inverted",
    key: "inverted",
    description:
      "Dark sidebar in light mode, lighter sidebar in dark mode for contrast",
  },
  {
    name: "Primary",
    key: "primary",
    description: "Sidebar uses the primary color as its background",
  },
] as const;

export const DEFAULT_MENU_COLOR_KEY = "default";

export function getMenuColorPreset(key: string): MenuColorPreset {
  return MENU_COLOR_PRESETS.find((p) => p.key === key) ?? MENU_COLOR_PRESETS[0];
}

// ============================================================================
// Menu Accent Presets
// ============================================================================
// Controls how prominent the active/hover highlight is on sidebar menu items.
// Adjusts --sidebar-accent and --sidebar-accent-foreground properties.
//
// Options:
//   - "none"   — No visual accent on hover/active (transparent background)
//   - "subtle" — Soft background tint on hover/active items
//   - "bold"   — Prominent primary-colored accent on active items
// ============================================================================

export interface MenuAccentPreset {
  readonly name: string;
  readonly key: string;
  readonly description: string;
}

export const MENU_ACCENT_PRESETS: readonly MenuAccentPreset[] = [
  {
    name: "None",
    key: "none",
    description: "No visual accent highlight on sidebar items",
  },
  {
    name: "Subtle",
    key: "subtle",
    description: "Soft background tint on hover and active sidebar items",
  },
  {
    name: "Bold",
    key: "bold",
    description: "Prominent primary-colored accent on active sidebar items",
  },
] as const;

export const DEFAULT_MENU_ACCENT_KEY = "subtle";

export function getMenuAccentPreset(key: string): MenuAccentPreset {
  return (
    MENU_ACCENT_PRESETS.find((p) => p.key === key) ?? MENU_ACCENT_PRESETS[1]
  );
}

// ============================================================================
// Style Presets (Holistic Visual Personality)
// ============================================================================
// Each style preset defines a complete visual personality by bundling
// together recommended radius, shadow, surface, and font settings, plus
// component-level spacing tokens (--ds-spacing-*, --ds-border-width).
//
// When a user selects a style, it applies as a "base layer" of overrides.
// Individual knobs (radius, font, etc.) can still be tweaked independently
// after choosing a style — the style just sets a good starting point.
//
// Styles are inspired by common design system archetypes:
//   - Vega:  Classic shadcn/ui — clean, neutral, familiar
//   - Nova:  Compact — reduced padding, tighter spacing
//   - Maia:  Soft — generous spacing, large radius, gentle shadows
//   - Lyra:  Boxy — sharp corners, mono font, technical feel
//   - Mira:  Dense — ultra-compact for data-heavy interfaces
// ============================================================================

export interface StylePreset {
  readonly name: string;
  readonly key: string;
  readonly description: string;
  /** SVG path data for the style icon (rendered in a 24x24 viewBox) */
  readonly iconPath: string;
  /** Recommended sub-preset keys applied when this style is selected */
  readonly defaults: {
    readonly radius: string;
    readonly font: string;
    readonly shadow: string;
    readonly surfaceStyle: string;
  };
  /** Component-level CSS custom property overrides (mode-independent) */
  readonly vars: {
    /** Base spacing unit multiplier (rem). Default is 1. */
    readonly spacingUnit: string;
    /** Card/surface inner padding (rem) */
    readonly paddingCard: string;
    /** Button horizontal padding (rem) */
    readonly paddingButtonX: string;
    /** Button vertical padding (rem) */
    readonly paddingButtonY: string;
    /** Default gap between elements (rem) */
    readonly gapDefault: string;
    /** Border width for bordered elements */
    readonly borderWidth: string;
    /** Input/control height (rem) */
    readonly controlHeight: string;
  };
}

export const STYLE_PRESETS: readonly StylePreset[] = [
  {
    name: "Vega",
    key: "vega",
    description: "The classic shadcn/ui look. Clean, neutral, and familiar.",
    iconPath: "M3 3h18v18H3V3zm2 2v14h14V5H7z",
    defaults: {
      radius: "0.625",
      font: "outfit",
      shadow: "default",
      surfaceStyle: "bordered",
    },
    vars: {
      spacingUnit: "1",
      paddingCard: "1.5rem",
      paddingButtonX: "1rem",
      paddingButtonY: "0.5rem",
      gapDefault: "0.75rem",
      borderWidth: "1px",
      controlHeight: "2.25rem",
    },
  },
  {
    name: "Nova",
    key: "nova",
    description: "Reduced padding and margins for compact layouts.",
    iconPath: "M4 4h16v16H4V4zm1.5 1.5v13h13v-13h-13z",
    defaults: {
      radius: "0.5",
      font: "inter",
      shadow: "subtle",
      surfaceStyle: "bordered",
    },
    vars: {
      spacingUnit: "0.875",
      paddingCard: "1rem",
      paddingButtonX: "0.75rem",
      paddingButtonY: "0.375rem",
      gapDefault: "0.5rem",
      borderWidth: "1px",
      controlHeight: "2rem",
    },
  },
  {
    name: "Maia",
    key: "maia",
    description: "Soft and rounded, with generous spacing.",
    iconPath:
      "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z",
    defaults: {
      radius: "0.75",
      font: "outfit",
      shadow: "default",
      surfaceStyle: "mixed",
    },
    vars: {
      spacingUnit: "1.125",
      paddingCard: "1.75rem",
      paddingButtonX: "1.25rem",
      paddingButtonY: "0.625rem",
      gapDefault: "1rem",
      borderWidth: "1px",
      controlHeight: "2.5rem",
    },
  },
  {
    name: "Lyra",
    key: "lyra",
    description: "Boxy and sharp. Pairs well with mono fonts.",
    iconPath: "M3 3h18v18H3V3zm1 1v16h16V4H4z",
    defaults: {
      radius: "0",
      font: "system",
      shadow: "none",
      surfaceStyle: "bordered",
    },
    vars: {
      spacingUnit: "1",
      paddingCard: "1.25rem",
      paddingButtonX: "1rem",
      paddingButtonY: "0.5rem",
      gapDefault: "0.75rem",
      borderWidth: "1px",
      controlHeight: "2.25rem",
    },
  },
  {
    name: "Mira",
    key: "mira",
    description: "Compact. Made for dense interfaces.",
    iconPath:
      "M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm0 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z",
    defaults: {
      radius: "0.375",
      font: "inter",
      shadow: "none",
      surfaceStyle: "bordered",
    },
    vars: {
      spacingUnit: "0.75",
      paddingCard: "0.75rem",
      paddingButtonX: "0.625rem",
      paddingButtonY: "0.25rem",
      gapDefault: "0.375rem",
      borderWidth: "1px",
      controlHeight: "1.75rem",
    },
  },
] as const;

export const DEFAULT_STYLE_KEY = "vega";

export function getStylePreset(key: string): StylePreset {
  return STYLE_PRESETS.find((s) => s.key === key) ?? STYLE_PRESETS[0];
}

// ============================================================================
// Theme Config (Full Configuration Object)
// ============================================================================
// Represents the complete set of customizer choices. This is what gets
// persisted to localStorage and what the customizer store manages.
// ============================================================================

export interface ThemeConfig {
  /** Style preset key (e.g. "vega", "nova", "maia", "lyra", "mira") */
  style: string;
  /** Color preset key (e.g. "zinc", "blue", "rose") */
  colorPreset: string;
  /** Radius preset key (e.g. "0.5", "0.625") */
  radius: string;
  /** Font preset key (e.g. "outfit", "inter", "system") */
  font: string;
  /** Shadow mode key (e.g. "none", "subtle", "default", "heavy") */
  shadow: string;
  /** Surface style key (e.g. "bordered", "elevated", "mixed") */
  surfaceStyle: string;
  /** Menu color key (e.g. "default", "muted", "inverted", "primary") */
  menuColor: string;
  /** Menu accent key (e.g. "none", "subtle", "bold") */
  menuAccent: string;
}

/** The default theme configuration — matches the design system's built-in styles */
export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  style: DEFAULT_STYLE_KEY,
  colorPreset: "zinc",
  radius: DEFAULT_RADIUS_KEY,
  font: DEFAULT_FONT_KEY,
  shadow: DEFAULT_SHADOW_KEY,
  surfaceStyle: DEFAULT_SURFACE_STYLE_KEY,
  menuColor: DEFAULT_MENU_COLOR_KEY,
  menuAccent: DEFAULT_MENU_ACCENT_KEY,
} as const;

// ============================================================================
// CSS Variable Builder
// ============================================================================
// Given a ThemeConfig and a resolved mode (light/dark), produces a flat
// Record<string, string> of CSS custom property overrides to apply.
// This is consumed by the customizer store to inject styles at runtime.
// ============================================================================

/**
 * Build the complete set of CSS custom property overrides for a given
 * theme configuration and color mode.
 *
 * @param config - The theme configuration from the customizer store
 * @param mode - The resolved color mode ("light" or "dark")
 * @returns A flat record of CSS custom property names → values
 */
export function buildThemeOverrides(
  config: ThemeConfig,
  mode: "light" | "dark",
): Record<string, string> {
  const vars: Record<string, string> = {};

  // -----------------------------------------------------------------------
  // 1. Color Preset
  // -----------------------------------------------------------------------
  const colorPreset = getColorPreset(config.colorPreset);
  const colors = mode === "dark" ? colorPreset.dark : colorPreset.light;

  // Map semantic color keys → CSS custom property names
  const colorMapping: Record<string, string> = {
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
  };

  for (const [tokenKey, cssVar] of Object.entries(colorMapping)) {
    const value = colors[tokenKey as keyof PresetSemanticColors];
    if (value) {
      vars[cssVar] = value;
    }
  }

  // -----------------------------------------------------------------------
  // 2. Radius Preset
  // -----------------------------------------------------------------------
  const radiusPreset = getRadiusPreset(config.radius);
  const baseRem = Number.parseFloat(radiusPreset.value); // e.g. 0.625
  const isZero = radiusPreset.key === "0";

  vars["--radius"] = radiusPreset.value;
  vars["--radius-none"] = "0px";
  vars["--radius-sm"] = isZero ? "0px" : `${Math.max(baseRem * 0.4, 0.125)}rem`;
  vars["--radius-md"] = isZero ? "0px" : `${Math.max(baseRem * 0.6, 0.25)}rem`;
  vars["--radius-lg"] = isZero ? "0px" : `${Math.max(baseRem * 0.8, 0.375)}rem`;
  vars["--radius-xl"] = isZero ? "0px" : `${Math.max(baseRem * 1.2, 0.5)}rem`;
  vars["--radius-full"] = "9999px";

  // -----------------------------------------------------------------------
  // 3. Font Preset (override --font-sans only)
  // -----------------------------------------------------------------------
  const fontPreset = getFontPreset(config.font);
  vars["--font-sans"] = fontPreset.value;

  // -----------------------------------------------------------------------
  // 4. Shadow Preset
  // -----------------------------------------------------------------------
  const shadowPreset = getShadowPreset(config.shadow);
  const shadows = mode === "dark" ? shadowPreset.dark : shadowPreset.light;
  vars["--shadow-none"] = shadows.none;
  vars["--shadow-xs"] = shadows.xs;
  vars["--shadow-sm"] = shadows.sm;
  vars["--shadow-md"] = shadows.md;
  vars["--shadow-lg"] = shadows.lg;
  vars["--shadow-xl"] = shadows.xl;
  vars["--shadow-2xl"] = shadows["2xl"];

  // -----------------------------------------------------------------------
  // 5. Style Preset (component-level spacing tokens)
  // -----------------------------------------------------------------------
  const stylePreset = getStylePreset(config.style);
  const sv = stylePreset.vars;
  vars["--ds-spacing-unit"] = sv.spacingUnit;
  vars["--ds-padding-card"] = sv.paddingCard;
  vars["--ds-padding-button-x"] = sv.paddingButtonX;
  vars["--ds-padding-button-y"] = sv.paddingButtonY;
  vars["--ds-gap-default"] = sv.gapDefault;
  vars["--ds-border-width"] = sv.borderWidth;
  vars["--ds-control-height"] = sv.controlHeight;

  // -----------------------------------------------------------------------
  // 6. Menu Color
  // -----------------------------------------------------------------------
  // Overrides sidebar tokens based on the selected menu color scheme.
  // "default" leaves the color preset's sidebar values untouched.
  const colorPresetObj = getColorPreset(config.colorPreset);
  const presetColors =
    mode === "dark" ? colorPresetObj.dark : colorPresetObj.light;

  if (config.menuColor === "muted") {
    // Sidebar matches muted/surface tones — blends with content area
    if (mode === "light") {
      vars["--sidebar"] = presetColors.muted;
      vars["--sidebar-foreground"] = presetColors.foreground;
      vars["--sidebar-border"] = presetColors.border;
    } else {
      vars["--sidebar"] = presetColors.muted;
      vars["--sidebar-foreground"] = presetColors.foreground;
      vars["--sidebar-border"] = presetColors.border;
    }
  } else if (config.menuColor === "inverted") {
    // Dark sidebar in light mode, lighter sidebar in dark mode
    if (mode === "light") {
      vars["--sidebar"] = "oklch(0.205 0 0)";
      vars["--sidebar-foreground"] = "oklch(0.95 0 0)";
      vars["--sidebar-primary"] = presetColors.primary;
      vars["--sidebar-primary-foreground"] = "oklch(0.985 0 0)";
      vars["--sidebar-border"] = "oklch(1 0 0 / 10%)";
      vars["--sidebar-ring"] = "oklch(0.439 0 0)";
    } else {
      vars["--sidebar"] = "oklch(0.269 0 0)";
      vars["--sidebar-foreground"] = "oklch(0.95 0 0)";
      vars["--sidebar-primary"] = presetColors.primary;
      vars["--sidebar-primary-foreground"] = "oklch(0.985 0 0)";
      vars["--sidebar-border"] = "oklch(1 0 0 / 8%)";
      vars["--sidebar-ring"] = "oklch(0.5 0 0)";
    }
  } else if (config.menuColor === "primary") {
    // Sidebar uses the primary color as background
    if (mode === "light") {
      vars["--sidebar"] = presetColors.primary;
      vars["--sidebar-foreground"] = presetColors.primaryForeground;
      vars["--sidebar-primary"] = presetColors.primaryForeground;
      vars["--sidebar-primary-foreground"] = presetColors.primary;
      vars["--sidebar-border"] =
        `color-mix(in oklch, ${presetColors.primaryForeground} 15%, transparent)`;
      vars["--sidebar-ring"] = presetColors.primaryForeground;
    } else {
      vars["--sidebar"] = presetColors.primary;
      vars["--sidebar-foreground"] = presetColors.primaryForeground;
      vars["--sidebar-primary"] = presetColors.primaryForeground;
      vars["--sidebar-primary-foreground"] = presetColors.primary;
      vars["--sidebar-border"] =
        `color-mix(in oklch, ${presetColors.primaryForeground} 15%, transparent)`;
      vars["--sidebar-ring"] = presetColors.primaryForeground;
    }
  }
  // "default" — no overrides, color preset sidebar values are used as-is

  // -----------------------------------------------------------------------
  // 7. Menu Accent
  // -----------------------------------------------------------------------
  // Overrides --sidebar-accent and --sidebar-accent-foreground based on
  // the selected accent intensity.
  if (config.menuAccent === "none") {
    // No visible accent — transparent hover/active background
    vars["--sidebar-accent"] = "transparent";
    vars["--sidebar-accent-foreground"] =
      vars["--sidebar-foreground"] ?? presetColors.sidebarForeground;
  } else if (config.menuAccent === "bold") {
    // Prominent primary-colored accent
    if (config.menuColor === "primary") {
      // When sidebar is already primary, use a contrast color for accent
      if (mode === "light") {
        vars["--sidebar-accent"] =
          `color-mix(in oklch, ${presetColors.primaryForeground} 20%, transparent)`;
        vars["--sidebar-accent-foreground"] = presetColors.primaryForeground;
      } else {
        vars["--sidebar-accent"] =
          `color-mix(in oklch, ${presetColors.primaryForeground} 20%, transparent)`;
        vars["--sidebar-accent-foreground"] = presetColors.primaryForeground;
      }
    } else if (config.menuColor === "inverted") {
      // On inverted sidebar, use primary as accent directly
      vars["--sidebar-accent"] = presetColors.primary;
      vars["--sidebar-accent-foreground"] = presetColors.primaryForeground;
    } else {
      // Standard: primary accent on default/muted sidebar
      if (mode === "light") {
        vars["--sidebar-accent"] = presetColors.primaryMuted;
        vars["--sidebar-accent-foreground"] = presetColors.primary;
      } else {
        vars["--sidebar-accent"] = presetColors.primaryMuted;
        vars["--sidebar-accent-foreground"] =
          presetColors.primaryMutedForeground;
      }
    }
  }
  // "subtle" — no overrides needed, color preset's default sidebar-accent is used

  // -----------------------------------------------------------------------
  // 8. Surface Style
  // -----------------------------------------------------------------------
  // "bordered" → visible borders, no card shadows
  // "elevated" → no visible borders, card shadows for depth
  // "mixed"    → subtle borders + subtle shadows
  if (config.surfaceStyle === "elevated") {
    // Remove borders on cards/surfaces, add elevation shadows
    vars["--card"] = mode === "dark" ? "oklch(0.205 0 0)" : "oklch(1 0 0)";
    vars["--border"] =
      mode === "dark" ? "oklch(0.205 0 0 / 0)" : "oklch(0.922 0 0 / 0)";
    vars["--border-muted"] =
      mode === "dark" ? "oklch(0.205 0 0 / 0)" : "oklch(0.922 0 0 / 0)";
  } else if (config.surfaceStyle === "mixed") {
    // Keep borders but make them subtler, add light shadows
    vars["--border"] =
      mode === "dark" ? "oklch(0.4 0 0 / 0.15)" : "oklch(0.8 0 0 / 0.3)";
    vars["--border-muted"] =
      mode === "dark" ? "oklch(0.4 0 0 / 0.1)" : "oklch(0.85 0 0 / 0.25)";
  }
  // "bordered" is the default — no overrides needed (colors already handle it)

  return vars;
}

// ============================================================================
// CSS Generation (for copy-paste / export)
// ============================================================================
// Generates a copyable CSS string from a theme config. Useful for the
// "Copy Theme" button in the customizer — users can paste this into their
// own stylesheets to use the theme without the customizer runtime.
// ============================================================================

/**
 * Generate a complete CSS string for a theme config that can be pasted
 * into a user's stylesheet.
 */
export function generateThemeCSS(config: ThemeConfig): string {
  const lightVars = buildThemeOverrides(config, "light");
  const darkVars = buildThemeOverrides(config, "dark");

  const formatVars = (vars: Record<string, string>): string =>
    Object.entries(vars)
      .map(([prop, value]) => `  ${prop}: ${value};`)
      .join("\n");

  return [
    "/* ============================================",
    " * Unified UI — Custom Theme",
    ` * Preset: ${getColorPreset(config.colorPreset).name}`,
    ` * Style: ${getStylePreset(config.style).name}`,
    ` * Radius: ${getRadiusPreset(config.radius).label}`,
    ` * Font: ${getFontPreset(config.font).name}`,
    ` * Shadows: ${getShadowPreset(config.shadow).name}`,
    ` * Menu Color: ${getMenuColorPreset(config.menuColor).name}`,
    ` * Menu Accent: ${getMenuAccentPreset(config.menuAccent).name}`,
    " * ============================================ */",
    "",
    ":root {",
    formatVars(lightVars),
    "}",
    "",
    ".dark {",
    formatVars(darkVars),
    "}",
  ]
    .filter(Boolean)
    .join("\n");
}
