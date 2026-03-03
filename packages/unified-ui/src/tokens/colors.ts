// ============================================================================
// Unified UI — Color Tokens
// ============================================================================
// All color values are defined as complete oklch() strings so they can be
// used directly as CSS color values.
//
// NEVER use these values directly in components. They are consumed by
// the theme layer which maps them to CSS custom properties.
// ============================================================================

// ---------------------------------------------------------------------------
// Base Palette — raw color ramps from 50 → 950 (oklch)
// ---------------------------------------------------------------------------

export const slate = {
  50: "oklch(0.984 0.003 247.858)",
  100: "oklch(0.968 0.005 247.858)",
  200: "oklch(0.929 0.013 255.508)",
  300: "oklch(0.869 0.022 252.894)",
  400: "oklch(0.704 0.04 256.788)",
  500: "oklch(0.554 0.046 257.417)",
  600: "oklch(0.446 0.043 257.281)",
  700: "oklch(0.372 0.044 257.287)",
  800: "oklch(0.279 0.041 260.031)",
  900: "oklch(0.208 0.042 265.755)",
  950: "oklch(0.129 0.042 264.695)",
} as const;

export const gray = {
  50: "oklch(0.985 0.002 247.839)",
  100: "oklch(0.967 0.003 264.542)",
  200: "oklch(0.928 0.006 264.531)",
  300: "oklch(0.872 0.01 258.338)",
  400: "oklch(0.707 0.022 261.325)",
  500: "oklch(0.551 0.027 264.364)",
  600: "oklch(0.446 0.03 256.802)",
  700: "oklch(0.373 0.034 259.733)",
  800: "oklch(0.278 0.033 256.848)",
  900: "oklch(0.21 0.034 264.665)",
  950: "oklch(0.13 0.028 261.692)",
} as const;

export const zinc = {
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

// ---------------------------------------------------------------------------
// Brand Palette — your product identity (oklch)
// ---------------------------------------------------------------------------

export const brand = {
  50: "oklch(0.962 0.018 272.314)",
  100: "oklch(0.93 0.034 272.788)",
  200: "oklch(0.87 0.065 274.039)",
  300: "oklch(0.785 0.115 274.713)",
  400: "oklch(0.673 0.182 276.935)",
  500: "oklch(0.585 0.233 277.117)",
  600: "oklch(0.511 0.262 276.966)",
  700: "oklch(0.457 0.24 277.023)",
  800: "oklch(0.398 0.195 277.366)",
  900: "oklch(0.359 0.144 278.697)",
  950: "oklch(0.257 0.09 281.288)",
} as const;

// ---------------------------------------------------------------------------
// Semantic Palettes — purpose-driven color scales (oklch)
// ---------------------------------------------------------------------------

export const blue = {
  50: "oklch(0.962 0.018 254.128)",
  100: "oklch(0.932 0.032 255.585)",
  200: "oklch(0.882 0.059 254.128)",
  300: "oklch(0.789 0.116 254.128)",
  400: "oklch(0.682 0.155 254.128)",
  500: "oklch(0.623 0.214 259.815)",
  600: "oklch(0.546 0.245 262.881)",
  700: "oklch(0.488 0.217 264.376)",
  800: "oklch(0.424 0.177 264.376)",
  900: "oklch(0.379 0.146 265.522)",
  950: "oklch(0.246 0.098 264.376)",
} as const;

export const green = {
  50: "oklch(0.962 0.044 156.743)",
  100: "oklch(0.923 0.074 155.995)",
  200: "oklch(0.863 0.126 155.995)",
  300: "oklch(0.765 0.166 150.261)",
  400: "oklch(0.692 0.194 149.214)",
  500: "oklch(0.627 0.194 149.214)",
  600: "oklch(0.546 0.176 142.495)",
  700: "oklch(0.448 0.15 148.335)",
  800: "oklch(0.384 0.122 150.261)",
  900: "oklch(0.335 0.1 152.535)",
  950: "oklch(0.226 0.083 153.921)",
} as const;

export const amber = {
  50: "oklch(0.976 0.037 95.885)",
  100: "oklch(0.954 0.077 95.885)",
  200: "oklch(0.924 0.12 95.746)",
  300: "oklch(0.852 0.154 84.101)",
  400: "oklch(0.828 0.189 84.429)",
  500: "oklch(0.769 0.188 70.08)",
  600: "oklch(0.666 0.179 58.318)",
  700: "oklch(0.554 0.135 66.442)",
  800: "oklch(0.473 0.108 67.047)",
  900: "oklch(0.414 0.09 67.047)",
  950: "oklch(0.32 0.084 57.263)",
} as const;

export const red = {
  50: "oklch(0.971 0.013 17.38)",
  100: "oklch(0.936 0.032 17.717)",
  200: "oklch(0.885 0.062 18.334)",
  300: "oklch(0.824 0.121 22.216)",
  400: "oklch(0.764 0.161 22.216)",
  500: "oklch(0.704 0.191 22.216)",
  600: "oklch(0.577 0.245 27.325)",
  700: "oklch(0.505 0.213 27.325)",
  800: "oklch(0.444 0.177 27.325)",
  900: "oklch(0.396 0.141 25.723)",
  950: "oklch(0.258 0.092 22.216)",
} as const;

export const teal = {
  50: "oklch(0.962 0.044 172.166)",
  100: "oklch(0.926 0.079 172.166)",
  200: "oklch(0.872 0.125 172.166)",
  300: "oklch(0.793 0.148 172.166)",
  400: "oklch(0.722 0.152 172.166)",
  500: "oklch(0.627 0.141 175.066)",
  600: "oklch(0.526 0.12 175.066)",
  700: "oklch(0.437 0.095 175.066)",
  800: "oklch(0.372 0.078 175.066)",
  900: "oklch(0.326 0.064 175.066)",
  950: "oklch(0.232 0.051 175.066)",
} as const;

// ---------------------------------------------------------------------------
// Pure values — black, white, transparent
// ---------------------------------------------------------------------------

export const pure = {
  white: "oklch(1 0 0)",
  black: "oklch(0 0 0)",
  transparent: "transparent",
} as const;

// ---------------------------------------------------------------------------
// Neutral Scale — the workhorse for text, borders, backgrounds
// Uses zinc for a cooler, more modern neutral.
// ---------------------------------------------------------------------------

export const neutral = zinc;

// ---------------------------------------------------------------------------
// Semantic Color Mapping
// Maps intent to specific palette stops. Consumed by the theme layer.
// ---------------------------------------------------------------------------

export const semanticLight = {
  // Core Backgrounds
  background: "oklch(1 0 0)",
  foreground: "oklch(0.145 0 0)",

  // Surfaces
  surface: "oklch(0.985 0 0)",
  surfaceRaised: "oklch(1 0 0)",
  surfaceOverlay: "oklch(0.97 0 0)",

  // Card
  card: "oklch(1 0 0)",
  cardForeground: "oklch(0.145 0 0)",

  // Popover
  popover: "oklch(1 0 0)",
  popoverForeground: "oklch(0.145 0 0)",

  // Muted
  muted: "oklch(0.97 0 0)",
  mutedForeground: "oklch(0.556 0 0)",

  // Primary (brand)
  primary: "oklch(0.205 0 0)",
  primaryForeground: "oklch(0.985 0 0)",
  primaryHover: "oklch(0.295 0 0)",
  primaryActive: "oklch(0.371 0 0)",
  primaryMuted: "oklch(0.97 0 0)",
  primaryMutedForeground: "oklch(0.205 0 0)",

  // Secondary
  secondary: "oklch(0.97 0 0)",
  secondaryForeground: "oklch(0.205 0 0)",
  secondaryHover: "oklch(0.922 0 0)",
  secondaryActive: "oklch(0.87 0 0)",

  // Accent
  accent: "oklch(0.97 0 0)",
  accentForeground: "oklch(0.205 0 0)",

  // Success
  success: green[600],
  successForeground: "oklch(0.145 0 0)",
  successMuted: green[50],
  successMutedForeground: green[700],

  // Warning
  warning: amber[500],
  warningForeground: "oklch(0.145 0 0)",
  warningMuted: amber[50],
  warningMutedForeground: amber[700],

  // Danger
  danger: red[600],
  dangerForeground: "oklch(0.985 0 0)",
  dangerHover: red[700],
  dangerActive: red[800],
  dangerMuted: red[50],
  dangerMutedForeground: red[700],

  // Destructive (alias for danger — matches shadcn/ui naming)
  destructive: red[600],
  destructiveForeground: "oklch(0.985 0 0)",

  // Info
  info: blue[600],
  infoForeground: "oklch(0.985 0 0)",
  infoMuted: blue[50],
  infoMutedForeground: blue[700],

  // Borders
  border: "oklch(0.922 0 0)",
  borderMuted: "oklch(0.97 0 0)",
  borderStrong: "oklch(0.708 0 0)",

  // Focus / Ring
  focusRing: "oklch(0.708 0 0)",
  ring: "oklch(0.708 0 0)",

  // Input
  input: "oklch(0.922 0 0)",
  inputForeground: "oklch(0.205 0 0)",
  inputPlaceholder: "oklch(0.556 0 0)",

  // Disabled
  disabled: "oklch(0.97 0 0)",
  disabledForeground: "oklch(0.556 0 0)",

  // Chart
  chart1: "oklch(0.646 0.222 41.116)",
  chart2: "oklch(0.6 0.118 184.704)",
  chart3: "oklch(0.398 0.07 227.392)",
  chart4: "oklch(0.828 0.189 84.429)",
  chart5: "oklch(0.769 0.188 70.08)",

  // Sidebar
  sidebar: "oklch(0.985 0 0)",
  sidebarForeground: "oklch(0.145 0 0)",
  sidebarPrimary: "oklch(0.205 0 0)",
  sidebarPrimaryForeground: "oklch(0.985 0 0)",
  sidebarAccent: "oklch(0.97 0 0)",
  sidebarAccentForeground: "oklch(0.205 0 0)",
  sidebarBorder: "oklch(0.922 0 0)",
  sidebarRing: "oklch(0.708 0 0)",
} as const;

export const semanticDark = {
  // Core Backgrounds
  background: "oklch(0.145 0 0)",
  foreground: "oklch(0.985 0 0)",

  // Surfaces
  surface: "oklch(0.205 0 0)",
  surfaceRaised: "oklch(0.269 0 0)",
  surfaceOverlay: "oklch(0.269 0 0)",

  // Card
  card: "oklch(0.205 0 0)",
  cardForeground: "oklch(0.985 0 0)",

  // Popover
  popover: "oklch(0.269 0 0)",
  popoverForeground: "oklch(0.985 0 0)",

  // Muted
  muted: "oklch(0.269 0 0)",
  mutedForeground: "oklch(0.708 0 0)",

  // Primary (brand)
  primary: "oklch(0.922 0 0)",
  primaryForeground: "oklch(0.205 0 0)",
  primaryHover: "oklch(0.845 0 0)",
  primaryActive: "oklch(0.768 0 0)",
  primaryMuted: "oklch(0.269 0 0)",
  primaryMutedForeground: "oklch(0.922 0 0)",

  // Secondary
  secondary: "oklch(0.269 0 0)",
  secondaryForeground: "oklch(0.985 0 0)",
  secondaryHover: "oklch(0.371 0 0)",
  secondaryActive: "oklch(0.439 0 0)",

  // Accent
  accent: "oklch(0.371 0 0)",
  accentForeground: "oklch(0.985 0 0)",

  // Success
  success: green[500],
  successForeground: "oklch(0.145 0 0)",
  successMuted: green[950],
  successMutedForeground: green[300],

  // Warning
  warning: amber[400],
  warningForeground: "oklch(0.145 0 0)",
  warningMuted: amber[950],
  warningMutedForeground: amber[300],

  // Danger
  danger: red[500],
  dangerForeground: "oklch(0.985 0 0)",
  dangerHover: red[400],
  dangerActive: red[300],
  dangerMuted: red[950],
  dangerMutedForeground: red[300],

  // Destructive (alias for danger — matches shadcn/ui naming)
  destructive: red[500],
  destructiveForeground: "oklch(0.985 0 0)",

  // Info
  info: blue[400],
  infoForeground: "oklch(0.145 0 0)",
  infoMuted: blue[950],
  infoMutedForeground: blue[300],

  // Borders
  border: "oklch(1 0 0 / 10%)",
  borderMuted: "oklch(0.269 0 0)",
  borderStrong: "oklch(0.556 0 0)",

  // Focus / Ring
  focusRing: "oklch(0.556 0 0)",
  ring: "oklch(0.556 0 0)",

  // Input
  input: "oklch(1 0 0 / 15%)",
  inputForeground: "oklch(0.985 0 0)",
  inputPlaceholder: "oklch(0.556 0 0)",

  // Disabled
  disabled: "oklch(0.269 0 0)",
  disabledForeground: "oklch(0.439 0 0)",

  // Chart
  chart1: "oklch(0.488 0.243 264.376)",
  chart2: "oklch(0.696 0.17 162.48)",
  chart3: "oklch(0.769 0.188 70.08)",
  chart4: "oklch(0.627 0.265 303.9)",
  chart5: "oklch(0.645 0.246 16.439)",

  // Sidebar
  sidebar: "oklch(0.205 0 0)",
  sidebarForeground: "oklch(0.985 0 0)",
  sidebarPrimary: "oklch(0.488 0.243 264.376)",
  sidebarPrimaryForeground: "oklch(0.985 0 0)",
  sidebarAccent: "oklch(0.269 0 0)",
  sidebarAccentForeground: "oklch(0.985 0 0)",
  sidebarBorder: "oklch(1 0 0 / 10%)",
  sidebarRing: "oklch(0.439 0 0)",
} as const;

// ---------------------------------------------------------------------------
// Type Exports
// ---------------------------------------------------------------------------

export type ColorScale = Record<string, string>;
export type SemanticColors = typeof semanticLight;
export type SemanticColorKey = keyof SemanticColors;

// All palettes bundled for tooling / documentation
export const palettes = {
  slate,
  gray,
  zinc,
  brand,
  blue,
  green,
  amber,
  red,
  teal,
} as const;
