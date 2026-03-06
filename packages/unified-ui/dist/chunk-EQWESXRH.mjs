import { blue, red, amber, green, zinc, slate, gray, teal, brand, zIndex, shadow, radius, semanticLight, shadowDark, semanticDark } from './chunk-IVZAB7BV.mjs';
import { fontFamily } from './chunk-ITBG42M5.mjs';
import { easingCSS, durationCSS } from './chunk-EZ2L3XPS.mjs';
import { cn } from './chunk-ZT3PCXDF.mjs';
import { createContext, useContext, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';

// src/theme/contract.ts
var colorVarNames = {
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
  sidebarRing: "--sidebar-ring"
};
var radiusVarNames = {
  none: "--radius-none",
  sm: "--radius-sm",
  md: "--radius-md",
  lg: "--radius-lg",
  xl: "--radius-xl",
  full: "--radius-full"
};
var shadowVarNames = {
  none: "--shadow-none",
  xs: "--shadow-xs",
  sm: "--shadow-sm",
  md: "--shadow-md",
  lg: "--shadow-lg",
  xl: "--shadow-xl",
  "2xl": "--shadow-2xl",
  focusRing: "--shadow-focus-ring"
};
var zIndexVarNames = {
  base: "--z-base",
  dropdown: "--z-dropdown",
  sticky: "--z-sticky",
  overlay: "--z-overlay",
  modal: "--z-modal",
  popover: "--z-popover",
  toast: "--z-toast",
  tooltip: "--z-tooltip",
  max: "--z-max"
};
var durationVarNames = {
  instant: "--duration-instant",
  fast: "--duration-fast",
  moderate: "--duration-moderate",
  normal: "--duration-normal",
  slow: "--duration-slow",
  slower: "--duration-slower",
  slowest: "--duration-slowest"
};
var easingVarNames = {
  standard: "--easing-standard",
  decelerate: "--easing-decelerate",
  accelerate: "--easing-accelerate",
  emphasize: "--easing-emphasize",
  linear: "--easing-linear",
  snap: "--easing-snap"
};
var fontFamilyVarNames = {
  display: "--font-display",
  sans: "--font-sans",
  serif: "--font-serif",
  mono: "--font-mono",
  inherit: "--font-inherit"
};
function mapRecord(varNames, values) {
  const result = {};
  for (const key of Object.keys(varNames)) {
    result[varNames[key]] = values[key];
  }
  return result;
}
function buildLightThemeVars() {
  return {
    ...mapRecord(colorVarNames, semanticLight),
    ...mapRecord(radiusVarNames, radius),
    ...mapRecord(shadowVarNames, shadow),
    ...mapRecord(zIndexVarNames, zIndex),
    ...mapRecord(durationVarNames, durationCSS),
    ...mapRecord(easingVarNames, easingCSS),
    ...mapRecord(fontFamilyVarNames, fontFamily)
  };
}
function buildDarkThemeVars() {
  return {
    ...mapRecord(colorVarNames, semanticDark),
    ...mapRecord(radiusVarNames, radius),
    ...mapRecord(shadowVarNames, shadowDark),
    ...mapRecord(zIndexVarNames, zIndex),
    ...mapRecord(durationVarNames, durationCSS),
    ...mapRecord(easingVarNames, easingCSS),
    ...mapRecord(fontFamilyVarNames, fontFamily)
  };
}
function varsToCSS(vars) {
  return Object.entries(vars).map(([prop, value]) => `  ${prop}: ${value};`).join("\n");
}
function buildThemeCSS() {
  const lightVars = buildLightThemeVars();
  const darkVars = buildDarkThemeVars();
  return `:root {
${varsToCSS(lightVars)}
}

.dark {
${varsToCSS(darkVars)}
}`;
}
var contract = {
  color: colorVarNames,
  radius: radiusVarNames,
  shadow: shadowVarNames,
  zIndex: zIndexVarNames,
  duration: durationVarNames,
  easing: easingVarNames,
  fontFamily: fontFamilyVarNames
};
var cssVar = {
  /** Returns `var(--<key>)` for use in style props */
  color: (key) => `var(${colorVarNames[key]})`,
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
  colorAlpha: (key, alpha) => `color-mix(in oklch, var(${colorVarNames[key]}) ${Math.round(alpha * 100)}%, transparent)`,
  /** Returns `var(--radius-<key>)` */
  radius: (key) => `var(${radiusVarNames[key]})`,
  /** Returns `var(--shadow-<key>)` */
  shadow: (key) => `var(${shadowVarNames[key]})`,
  /** Returns `var(--z-<key>)` */
  zIndex: (key) => `var(${zIndexVarNames[key]})`,
  /** Returns `var(--duration-<key>)` */
  duration: (key) => `var(${durationVarNames[key]})`,
  /** Returns `var(--easing-<key>)` */
  easing: (key) => `var(${easingVarNames[key]})`,
  /** Returns `var(--font-<key>)` */
  fontFamily: (key) => `var(${fontFamilyVarNames[key]})`,
  /** Returns the raw `var(--<key>)` — same as color() since values are complete oklch */
  colorChannels: (key) => `var(${colorVarNames[key]})`
};

// src/theme/presets.ts
var STATUS_LIGHT = {
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
  infoMutedForeground: blue[700]
};
var STATUS_DARK = {
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
  infoMutedForeground: blue[300]
};
var CHART_LIGHT = {
  chart1: "oklch(0.646 0.222 41.116)",
  chart2: "oklch(0.6 0.118 184.704)",
  chart3: "oklch(0.398 0.07 227.392)",
  chart4: "oklch(0.828 0.189 84.429)",
  chart5: "oklch(0.769 0.188 70.08)"
};
var CHART_DARK = {
  chart1: "oklch(0.488 0.243 264.376)",
  chart2: "oklch(0.696 0.17 162.48)",
  chart3: "oklch(0.769 0.188 70.08)",
  chart4: "oklch(0.627 0.265 303.9)",
  chart5: "oklch(0.645 0.246 16.439)"
};
var stone = {
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
  950: "oklch(0.147 0.004 49.25)"
};
var neutral = {
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
  950: "oklch(0.145 0 0)"
};
var violet = {
  50: "oklch(0.969 0.016 293.756)",
  300: "oklch(0.811 0.111 293.571)",
  400: "oklch(0.702 0.183 293.541)",
  500: "oklch(0.606 0.25 292.717)",
  600: "oklch(0.541 0.281 293.009)",
  700: "oklch(0.491 0.27 292.581)",
  800: "oklch(0.432 0.232 292.759)",
  950: "oklch(0.283 0.141 291.089)"
};
var rose = {
  50: "oklch(0.969 0.015 12.422)",
  300: "oklch(0.81 0.117 11.638)",
  400: "oklch(0.712 0.194 13.428)",
  500: "oklch(0.645 0.246 16.439)",
  600: "oklch(0.586 0.253 17.585)",
  700: "oklch(0.514 0.222 16.935)",
  800: "oklch(0.455 0.188 13.697)",
  950: "oklch(0.271 0.105 12.094)"
};
var orange = {
  50: "oklch(0.98 0.016 73.684)",
  300: "oklch(0.837 0.128 66.29)",
  400: "oklch(0.75 0.183 55.934)",
  500: "oklch(0.705 0.213 47.604)",
  600: "oklch(0.646 0.222 41.116)",
  700: "oklch(0.553 0.195 38.402)",
  800: "oklch(0.47 0.157 37.304)",
  950: "oklch(0.266 0.079 36.259)"
};
function buildNeutralPreset(name, key, palette) {
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
      sidebarRing: palette[400]
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
      sidebarRing: palette[600]
    }
  };
}
function buildChromaticPreset(name, key, primary, surface = zinc) {
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
      sidebarRing: primary[500]
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
      sidebarRing: primary[500]
    }
  };
}
var COLOR_PRESETS = [
  // -------------------------------------------------------------------------
  // Neutral Presets (achromatic primaries)
  // -------------------------------------------------------------------------
  {
    swatch: zinc[900],
    ...buildNeutralPreset("Zinc", "zinc", zinc)
  },
  {
    swatch: slate[900],
    ...buildNeutralPreset("Slate", "slate", slate)
  },
  {
    swatch: gray[900],
    ...buildNeutralPreset("Gray", "gray", gray)
  },
  {
    swatch: stone[900],
    ...buildNeutralPreset("Stone", "stone", stone)
  },
  {
    swatch: neutral[900],
    ...buildNeutralPreset("Neutral", "neutral", neutral)
  },
  // -------------------------------------------------------------------------
  // Chromatic Presets (colored primaries)
  // -------------------------------------------------------------------------
  {
    swatch: blue[600],
    ...buildChromaticPreset("Blue", "blue", blue)
  },
  {
    swatch: green[600],
    ...buildChromaticPreset("Green", "green", green)
  },
  {
    swatch: violet[600],
    ...buildChromaticPreset("Violet", "violet", violet)
  },
  {
    swatch: rose[600],
    ...buildChromaticPreset("Rose", "rose", rose)
  },
  {
    swatch: orange[600],
    ...buildChromaticPreset("Orange", "orange", orange)
  },
  {
    swatch: red[600],
    ...buildChromaticPreset("Red", "red", red)
  },
  {
    swatch: teal[600],
    ...buildChromaticPreset("Teal", "teal", teal)
  },
  {
    swatch: brand[600],
    ...buildChromaticPreset("Brand", "brand", brand)
  }
];
function getColorPreset(key) {
  return COLOR_PRESETS.find((p) => p.key === key) ?? COLOR_PRESETS[0];
}
var COLOR_PRESET_KEYS = COLOR_PRESETS.map((p) => p.key);
var RADIUS_PRESETS = [
  { name: "None", key: "0", value: "0px", label: "0px" },
  { name: "Subtle", key: "0.25", value: "0.25rem", label: "4px" },
  { name: "Small", key: "0.375", value: "0.375rem", label: "6px" },
  { name: "Medium", key: "0.5", value: "0.5rem", label: "8px" },
  { name: "Default", key: "0.625", value: "0.625rem", label: "10px" },
  { name: "Large", key: "0.75", value: "0.75rem", label: "12px" },
  { name: "XL", key: "1", value: "1rem", label: "16px" }
];
var DEFAULT_RADIUS_KEY = "0.625";
function getRadiusPreset(key) {
  return RADIUS_PRESETS.find((r) => r.key === key) ?? RADIUS_PRESETS[4];
}
var FONT_PRESETS = [
  {
    name: "Outfit",
    key: "outfit",
    value: 'var(--font-outfit), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    sample: "Aa"
  },
  {
    name: "Inter",
    key: "inter",
    value: 'var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sample: "Aa"
  },
  {
    name: "System",
    key: "system",
    value: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    sample: "Aa"
  },
  {
    name: "Serif",
    key: "serif",
    value: 'var(--font-lora), Georgia, "Times New Roman", serif',
    sample: "Aa"
  },
  {
    name: "Mono",
    key: "mono",
    value: 'var(--font-jetbrains), "Fira Code", "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    sample: "Aa"
  }
];
var DEFAULT_FONT_KEY = "outfit";
function getFontPreset(key) {
  return FONT_PRESETS.find((f) => f.key === key) ?? FONT_PRESETS[0];
}
var SHADOW_PRESETS = [
  {
    name: "None",
    key: "none",
    description: "No shadows \u2014 flat design",
    light: {
      none: "none",
      xs: "none",
      sm: "none",
      md: "none",
      lg: "none",
      xl: "none",
      "2xl": "none"
    },
    dark: {
      none: "none",
      xs: "none",
      sm: "none",
      md: "none",
      lg: "none",
      xl: "none",
      "2xl": "none"
    }
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
      "2xl": "0 16px 32px -8px oklch(0 0 0 / 0.12)"
    },
    dark: {
      none: "none",
      xs: "0 1px 1px 0 oklch(0 0 0 / 0.1)",
      sm: "0 1px 2px 0 oklch(0 0 0 / 0.15), 0 1px 1px -1px oklch(0 0 0 / 0.15)",
      md: "0 2px 4px -1px oklch(0 0 0 / 0.2), 0 1px 2px -1px oklch(0 0 0 / 0.15)",
      lg: "0 6px 10px -2px oklch(0 0 0 / 0.2), 0 2px 4px -2px oklch(0 0 0 / 0.15)",
      xl: "0 12px 16px -4px oklch(0 0 0 / 0.25), 0 4px 6px -3px oklch(0 0 0 / 0.2)",
      "2xl": "0 16px 32px -8px oklch(0 0 0 / 0.3)"
    }
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
      "2xl": "0 25px 50px -12px oklch(0 0 0 / 0.25)"
    },
    dark: {
      none: "none",
      xs: "0 1px 2px 0 oklch(0 0 0 / 0.2)",
      sm: "0 1px 3px 0 oklch(0 0 0 / 0.3), 0 1px 2px -1px oklch(0 0 0 / 0.3)",
      md: "0 4px 6px -1px oklch(0 0 0 / 0.35), 0 2px 4px -2px oklch(0 0 0 / 0.3)",
      lg: "0 10px 15px -3px oklch(0 0 0 / 0.35), 0 4px 6px -4px oklch(0 0 0 / 0.3)",
      xl: "0 20px 25px -5px oklch(0 0 0 / 0.4), 0 8px 10px -6px oklch(0 0 0 / 0.35)",
      "2xl": "0 25px 50px -12px oklch(0 0 0 / 0.5)"
    }
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
      "2xl": "0 32px 60px -16px oklch(0 0 0 / 0.35)"
    },
    dark: {
      none: "none",
      xs: "0 1px 3px 0 oklch(0 0 0 / 0.3)",
      sm: "0 2px 4px 0 oklch(0 0 0 / 0.4), 0 1px 3px -1px oklch(0 0 0 / 0.4)",
      md: "0 6px 10px -1px oklch(0 0 0 / 0.45), 0 3px 6px -2px oklch(0 0 0 / 0.4)",
      lg: "0 14px 20px -4px oklch(0 0 0 / 0.45), 0 6px 8px -4px oklch(0 0 0 / 0.4)",
      xl: "0 24px 32px -6px oklch(0 0 0 / 0.5), 0 10px 14px -6px oklch(0 0 0 / 0.45)",
      "2xl": "0 32px 60px -16px oklch(0 0 0 / 0.6)"
    }
  }
];
var DEFAULT_SHADOW_KEY = "default";
function getShadowPreset(key) {
  return SHADOW_PRESETS.find((s) => s.key === key) ?? SHADOW_PRESETS[2];
}
var SURFACE_STYLE_PRESETS = [
  {
    name: "Bordered",
    key: "bordered",
    description: "Cards and surfaces use borders for separation"
  },
  {
    name: "Elevated",
    key: "elevated",
    description: "Cards and surfaces use shadows for depth"
  },
  {
    name: "Mixed",
    key: "mixed",
    description: "Combines borders with subtle shadows"
  }
];
var DEFAULT_SURFACE_STYLE_KEY = "bordered";
var STYLE_PRESETS = [
  {
    name: "Vega",
    key: "vega",
    description: "The classic shadcn/ui look. Clean, neutral, and familiar.",
    iconPath: "M3 3h18v18H3V3zm2 2v14h14V5H7z",
    defaults: {
      radius: "0.625",
      font: "outfit",
      shadow: "default",
      surfaceStyle: "bordered"
    },
    vars: {
      spacingUnit: "1",
      paddingCard: "1.5rem",
      paddingButtonX: "1rem",
      paddingButtonY: "0.5rem",
      gapDefault: "0.75rem",
      borderWidth: "1px",
      controlHeight: "2.25rem"
    }
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
      surfaceStyle: "bordered"
    },
    vars: {
      spacingUnit: "0.875",
      paddingCard: "1rem",
      paddingButtonX: "0.75rem",
      paddingButtonY: "0.375rem",
      gapDefault: "0.5rem",
      borderWidth: "1px",
      controlHeight: "2rem"
    }
  },
  {
    name: "Maia",
    key: "maia",
    description: "Soft and rounded, with generous spacing.",
    iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z",
    defaults: {
      radius: "0.75",
      font: "outfit",
      shadow: "default",
      surfaceStyle: "mixed"
    },
    vars: {
      spacingUnit: "1.125",
      paddingCard: "1.75rem",
      paddingButtonX: "1.25rem",
      paddingButtonY: "0.625rem",
      gapDefault: "1rem",
      borderWidth: "1px",
      controlHeight: "2.5rem"
    }
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
      surfaceStyle: "bordered"
    },
    vars: {
      spacingUnit: "1",
      paddingCard: "1.25rem",
      paddingButtonX: "1rem",
      paddingButtonY: "0.5rem",
      gapDefault: "0.75rem",
      borderWidth: "1px",
      controlHeight: "2.25rem"
    }
  },
  {
    name: "Mira",
    key: "mira",
    description: "Compact. Made for dense interfaces.",
    iconPath: "M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm0 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z",
    defaults: {
      radius: "0.375",
      font: "inter",
      shadow: "none",
      surfaceStyle: "bordered"
    },
    vars: {
      spacingUnit: "0.75",
      paddingCard: "0.75rem",
      paddingButtonX: "0.625rem",
      paddingButtonY: "0.25rem",
      gapDefault: "0.375rem",
      borderWidth: "1px",
      controlHeight: "1.75rem"
    }
  }
];
var DEFAULT_STYLE_KEY = "vega";
function getStylePreset(key) {
  return STYLE_PRESETS.find((s) => s.key === key) ?? STYLE_PRESETS[0];
}
var DEFAULT_THEME_CONFIG = {
  style: DEFAULT_STYLE_KEY,
  colorPreset: "zinc",
  radius: DEFAULT_RADIUS_KEY,
  font: DEFAULT_FONT_KEY,
  shadow: DEFAULT_SHADOW_KEY,
  surfaceStyle: DEFAULT_SURFACE_STYLE_KEY
};
function buildThemeOverrides(config, mode) {
  const vars = {};
  const colorPreset = getColorPreset(config.colorPreset);
  const colors = mode === "dark" ? colorPreset.dark : colorPreset.light;
  const colorMapping = {
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
    sidebarRing: "--sidebar-ring"
  };
  for (const [tokenKey, cssVar2] of Object.entries(colorMapping)) {
    const value = colors[tokenKey];
    if (value) {
      vars[cssVar2] = value;
    }
  }
  const radiusPreset = getRadiusPreset(config.radius);
  const baseRem = Number.parseFloat(radiusPreset.value);
  const isZero = radiusPreset.key === "0";
  vars["--radius"] = radiusPreset.value;
  vars["--radius-none"] = "0px";
  vars["--radius-sm"] = isZero ? "0px" : `${Math.max(baseRem * 0.4, 0.125)}rem`;
  vars["--radius-md"] = isZero ? "0px" : `${Math.max(baseRem * 0.6, 0.25)}rem`;
  vars["--radius-lg"] = isZero ? "0px" : `${Math.max(baseRem * 0.8, 0.375)}rem`;
  vars["--radius-xl"] = isZero ? "0px" : `${Math.max(baseRem * 1.2, 0.5)}rem`;
  vars["--radius-full"] = "9999px";
  const fontPreset = getFontPreset(config.font);
  vars["--font-sans"] = fontPreset.value;
  const shadowPreset = getShadowPreset(config.shadow);
  const shadows = mode === "dark" ? shadowPreset.dark : shadowPreset.light;
  vars["--shadow-none"] = shadows.none;
  vars["--shadow-xs"] = shadows.xs;
  vars["--shadow-sm"] = shadows.sm;
  vars["--shadow-md"] = shadows.md;
  vars["--shadow-lg"] = shadows.lg;
  vars["--shadow-xl"] = shadows.xl;
  vars["--shadow-2xl"] = shadows["2xl"];
  const stylePreset = getStylePreset(config.style);
  const sv = stylePreset.vars;
  vars["--ds-spacing-unit"] = sv.spacingUnit;
  vars["--ds-padding-card"] = sv.paddingCard;
  vars["--ds-padding-button-x"] = sv.paddingButtonX;
  vars["--ds-padding-button-y"] = sv.paddingButtonY;
  vars["--ds-gap-default"] = sv.gapDefault;
  vars["--ds-border-width"] = sv.borderWidth;
  vars["--ds-control-height"] = sv.controlHeight;
  if (config.surfaceStyle === "elevated") {
    vars["--card"] = mode === "dark" ? "oklch(0.205 0 0)" : "oklch(1 0 0)";
    vars["--border"] = mode === "dark" ? "oklch(0.205 0 0 / 0)" : "oklch(0.922 0 0 / 0)";
    vars["--border-muted"] = mode === "dark" ? "oklch(0.205 0 0 / 0)" : "oklch(0.922 0 0 / 0)";
  } else if (config.surfaceStyle === "mixed") {
    vars["--border"] = mode === "dark" ? "oklch(0.4 0 0 / 0.15)" : "oklch(0.8 0 0 / 0.3)";
    vars["--border-muted"] = mode === "dark" ? "oklch(0.4 0 0 / 0.1)" : "oklch(0.85 0 0 / 0.25)";
  }
  return vars;
}
function generateThemeCSS(config) {
  const lightVars = buildThemeOverrides(config, "light");
  const darkVars = buildThemeOverrides(config, "dark");
  const formatVars = (vars) => Object.entries(vars).map(([prop, value]) => `  ${prop}: ${value};`).join("\n");
  return [
    "/* ============================================",
    " * Unified UI \u2014 Custom Theme",
    ` * Preset: ${getColorPreset(config.colorPreset).name}`,
    ` * Style: ${getStylePreset(config.style).name}`,
    ` * Radius: ${getRadiusPreset(config.radius).label}`,
    ` * Font: ${getFontPreset(config.font).name}`,
    ` * Shadows: ${getShadowPreset(config.shadow).name}`,
    " * ============================================ */",
    "",
    ":root {",
    formatVars(lightVars),
    "}",
    "",
    ".dark {",
    formatVars(darkVars),
    "}"
  ].join("\n");
}
var STORAGE_KEY = "ds-theme-customizer";
var STYLE_ELEMENT_ID = "ds-theme-customizer";
var ThemeCustomizerContext = createContext(null);
function useThemeCustomizer() {
  const ctx = useContext(ThemeCustomizerContext);
  if (!ctx) {
    throw new Error(
      "useThemeCustomizer must be used within a <ThemeCustomizerProvider>. Wrap your application (or layout) with <ThemeCustomizerProvider>."
    );
  }
  return ctx;
}
function loadConfig() {
  if (typeof window === "undefined") return DEFAULT_THEME_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_THEME_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      style: STYLE_PRESETS.some((s) => s.key === parsed.style) ? parsed.style : DEFAULT_THEME_CONFIG.style,
      colorPreset: COLOR_PRESET_KEYS.includes(parsed.colorPreset ?? "") ? parsed.colorPreset : DEFAULT_THEME_CONFIG.colorPreset,
      radius: RADIUS_PRESETS.some((r) => r.key === parsed.radius) ? parsed.radius : DEFAULT_THEME_CONFIG.radius,
      font: FONT_PRESETS.some((f) => f.key === parsed.font) ? parsed.font : DEFAULT_THEME_CONFIG.font,
      shadow: SHADOW_PRESETS.some((s) => s.key === parsed.shadow) ? parsed.shadow : DEFAULT_THEME_CONFIG.shadow,
      surfaceStyle: SURFACE_STYLE_PRESETS.some(
        (s) => s.key === parsed.surfaceStyle
      ) ? parsed.surfaceStyle : DEFAULT_THEME_CONFIG.surfaceStyle
    };
  } catch {
    return DEFAULT_THEME_CONFIG;
  }
}
function saveConfig(config) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
  }
}
function getResolvedMode() {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}
function injectStyles(config) {
  if (typeof document === "undefined") return;
  let styleEl = document.getElementById(
    STYLE_ELEMENT_ID
  );
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = STYLE_ELEMENT_ID;
    styleEl.setAttribute("data-ds-customizer", "");
    document.head.appendChild(styleEl);
  }
  const lightVars = buildThemeOverrides(config, "light");
  const darkVars = buildThemeOverrides(config, "dark");
  const formatVars = (vars) => Object.entries(vars).map(([prop, value]) => `${prop}:${value}`).join(";");
  styleEl.textContent = [
    `:root:root{${formatVars(lightVars)}}`,
    `.dark:root{${formatVars(darkVars)}}`
  ].join("\n");
}
function removeStyles() {
  if (typeof document === "undefined") return;
  const styleEl = document.getElementById(STYLE_ELEMENT_ID);
  if (styleEl) {
    styleEl.remove();
  }
}
function configsEqual(a, b) {
  return a.style === b.style && a.colorPreset === b.colorPreset && a.radius === b.radius && a.font === b.font && a.shadow === b.shadow && a.surfaceStyle === b.surfaceStyle;
}
function ThemeCustomizerProvider({
  children,
  defaultConfig,
  applyStyles = true
}) {
  const [config, setConfigState] = useState(
    () => defaultConfig ?? loadConfig()
  );
  const [_resolvedMode, setResolvedMode] = useState("light");
  const configRef = useRef(config);
  configRef.current = config;
  useEffect(() => {
    setResolvedMode(getResolvedMode());
    const observer = new MutationObserver(() => {
      const newMode = getResolvedMode();
      setResolvedMode((prev) => {
        if (prev !== newMode) return newMode;
        return prev;
      });
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (applyStyles) {
      injectStyles(config);
    }
  }, [config, applyStyles]);
  useEffect(() => {
    saveConfig(config);
  }, [config]);
  useEffect(() => {
    return () => {
      if (applyStyles) {
        removeStyles();
      }
    };
  }, [applyStyles]);
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setConfigState((prev) => {
            if (configsEqual(prev, parsed)) return prev;
            return parsed;
          });
        } catch {
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);
  const setConfig = useCallback((newConfig) => {
    setConfigState(newConfig);
  }, []);
  const setStyle = useCallback((key) => {
    const preset = getStylePreset(key);
    setConfigState((prev) => {
      if (prev.style === key) return prev;
      return {
        ...prev,
        style: key,
        radius: preset.defaults.radius,
        font: preset.defaults.font,
        shadow: preset.defaults.shadow,
        surfaceStyle: preset.defaults.surfaceStyle
      };
    });
  }, []);
  const setColorPreset = useCallback((key) => {
    setConfigState((prev) => {
      if (prev.colorPreset === key) return prev;
      return { ...prev, colorPreset: key };
    });
  }, []);
  const setRadius = useCallback((key) => {
    setConfigState((prev) => {
      if (prev.radius === key) return prev;
      return { ...prev, radius: key };
    });
  }, []);
  const setFont = useCallback((key) => {
    setConfigState((prev) => {
      if (prev.font === key) return prev;
      return { ...prev, font: key };
    });
  }, []);
  const setShadow = useCallback((key) => {
    setConfigState((prev) => {
      if (prev.shadow === key) return prev;
      return { ...prev, shadow: key };
    });
  }, []);
  const setSurfaceStyle = useCallback((key) => {
    setConfigState((prev) => {
      if (prev.surfaceStyle === key) return prev;
      return { ...prev, surfaceStyle: key };
    });
  }, []);
  const resetConfig = useCallback(() => {
    setConfigState(DEFAULT_THEME_CONFIG);
  }, []);
  const isDefault = configsEqual(config, DEFAULT_THEME_CONFIG);
  const generateCSSFn = useCallback(() => {
    return generateThemeCSS(config);
  }, [config]);
  const value = useMemo(
    () => ({
      config,
      setConfig,
      setStyle,
      setColorPreset,
      setRadius,
      setFont,
      setShadow,
      setSurfaceStyle,
      resetConfig,
      isDefault,
      generateCSS: generateCSSFn
    }),
    [
      config,
      setConfig,
      setStyle,
      setColorPreset,
      setRadius,
      setFont,
      setShadow,
      setSurfaceStyle,
      resetConfig,
      isDefault,
      generateCSSFn
    ]
  );
  return /* @__PURE__ */ jsx(ThemeCustomizerContext.Provider, { value, children });
}
function Section({
  title,
  children,
  className
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-2", className), children: [
    /* @__PURE__ */ jsx("h4", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: title }),
    children
  ] });
}
function CheckIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: cn("size-4 shrink-0", className),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "M20 6 9 17l-5-5" })
    }
  );
}
function ColorSwatch({
  preset,
  isActive,
  onClick
}) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: cn(
        "group relative flex items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-all duration-fast ease-standard",
        "hover:border-border-strong hover:bg-muted/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive ? "border-primary bg-muted/60 shadow-sm" : "border-border bg-transparent"
      ),
      title: preset.name,
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "size-5 shrink-0 rounded-full border shadow-xs",
              isActive ? "border-primary/50 ring-2 ring-primary/20" : "border-border"
            ),
            style: { backgroundColor: preset.swatch },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "text-sm font-medium",
              isActive ? "text-foreground" : "text-muted-foreground"
            ),
            children: preset.name
          }
        ),
        isActive && /* @__PURE__ */ jsx(CheckIcon, { className: "ml-auto text-primary" })
      ]
    }
  );
}
function RadiusOption({
  preset,
  isActive,
  onClick
}) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: cn(
        "flex flex-col items-center justify-center gap-1 rounded-md border px-3 py-2 text-center transition-all duration-fast ease-standard",
        "hover:border-border-strong hover:bg-muted/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive ? "border-primary bg-muted/60 shadow-sm" : "border-border bg-transparent"
      ),
      title: `${preset.name} (${preset.label})`,
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "size-8 border-2 border-foreground/30 bg-muted",
            style: { borderRadius: preset.value },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "text-[11px] font-medium leading-none",
              isActive ? "text-foreground" : "text-muted-foreground"
            ),
            children: preset.label
          }
        )
      ]
    }
  );
}
function FontOption({
  preset,
  isActive,
  onClick
}) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: cn(
        "flex items-center gap-2 rounded-md border px-3 py-2 text-left transition-all duration-fast ease-standard",
        "hover:border-border-strong hover:bg-muted/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive ? "border-primary bg-muted/60 shadow-sm" : "border-border bg-transparent"
      ),
      title: preset.name,
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "text-base font-semibold leading-none",
              isActive ? "text-foreground" : "text-muted-foreground"
            ),
            style: { fontFamily: preset.value },
            children: preset.sample
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "text-sm",
              isActive ? "text-foreground font-medium" : "text-muted-foreground"
            ),
            children: preset.name
          }
        ),
        isActive && /* @__PURE__ */ jsx(CheckIcon, { className: "ml-auto text-primary" })
      ]
    }
  );
}
function PillToggle({
  label,
  isActive,
  onClick,
  description
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick,
      className: cn(
        "rounded-md border px-3 py-2 text-left text-sm transition-all duration-fast ease-standard",
        "hover:border-border-strong hover:bg-muted/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive ? "border-primary bg-muted/60 shadow-sm font-medium text-foreground" : "border-border bg-transparent text-muted-foreground"
      ),
      title: description,
      children: label
    }
  );
}
function StyleOption({
  preset,
  isActive,
  onClick
}) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: cn(
        "flex items-start gap-3 rounded-md border px-3 py-3 text-left transition-all duration-fast ease-standard",
        "hover:border-border-strong hover:bg-muted/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive ? "border-primary bg-muted/60 shadow-sm" : "border-border bg-transparent"
      ),
      title: preset.description,
      children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: cn(
              "size-5 shrink-0 mt-0.5",
              isActive ? "text-primary" : "text-muted-foreground"
            ),
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsx("path", { d: preset.iconPath })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "text-sm font-semibold leading-tight",
                isActive ? "text-foreground" : "text-foreground"
              ),
              children: preset.name
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "mt-0.5 text-xs leading-snug",
                isActive ? "text-muted-foreground" : "text-muted-foreground/70"
              ),
              children: preset.description
            }
          )
        ] }),
        isActive && /* @__PURE__ */ jsx(CheckIcon, { className: "shrink-0 mt-0.5 text-primary" })
      ]
    }
  );
}
function CopyButton({
  getText,
  className,
  children
}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);
  const handleCopy = useCallback(() => {
    const text = getText();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2e3);
    });
  }, [getText]);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: handleCopy,
      className: cn(
        "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-all duration-fast ease-standard",
        "hover:bg-secondary-hover active:bg-secondary-active",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      ),
      children: copied ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(CheckIcon, { className: "text-success" }),
        /* @__PURE__ */ jsx("span", { children: "Copied!" })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(
          "svg",
          {
            className: "size-4",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsx("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }),
              /* @__PURE__ */ jsx("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("span", { children: children ?? "Copy CSS" })
      ] })
    }
  );
}
function ThemeCustomizer({
  className,
  showCopyButton = true,
  showResetButton = true
}) {
  const {
    config,
    setStyle,
    setColorPreset,
    setRadius,
    setFont,
    setShadow,
    setSurfaceStyle,
    resetConfig,
    isDefault,
    generateCSS
  } = useThemeCustomizer();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("space-y-6", className),
      "data-ds": "",
      "data-ds-component": "theme-customizer",
      children: [
        /* @__PURE__ */ jsx(Section, { title: "Style", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-2", children: STYLE_PRESETS.map((preset) => /* @__PURE__ */ jsx(
          StyleOption,
          {
            preset,
            isActive: config.style === preset.key,
            onClick: () => setStyle(preset.key)
          },
          preset.key
        )) }) }),
        /* @__PURE__ */ jsx(Section, { title: "Color", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: COLOR_PRESETS.map((preset) => /* @__PURE__ */ jsx(
          ColorSwatch,
          {
            preset,
            isActive: config.colorPreset === preset.key,
            onClick: () => setColorPreset(preset.key)
          },
          preset.key
        )) }) }),
        /* @__PURE__ */ jsx(Section, { title: "Radius", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: RADIUS_PRESETS.map((preset) => /* @__PURE__ */ jsx(
          RadiusOption,
          {
            preset,
            isActive: config.radius === preset.key,
            onClick: () => setRadius(preset.key)
          },
          preset.key
        )) }) }),
        /* @__PURE__ */ jsx(Section, { title: "Font", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: FONT_PRESETS.map((preset) => /* @__PURE__ */ jsx(
          FontOption,
          {
            preset,
            isActive: config.font === preset.key,
            onClick: () => setFont(preset.key)
          },
          preset.key
        )) }) }),
        /* @__PURE__ */ jsx(Section, { title: "Shadow", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: SHADOW_PRESETS.map((preset) => /* @__PURE__ */ jsx(
          PillToggle,
          {
            label: preset.name,
            isActive: config.shadow === preset.key,
            onClick: () => setShadow(preset.key),
            description: preset.description
          },
          preset.key
        )) }) }),
        /* @__PURE__ */ jsx(Section, { title: "Surface", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: SURFACE_STYLE_PRESETS.map((preset) => /* @__PURE__ */ jsx(
          PillToggle,
          {
            label: preset.name,
            isActive: config.surfaceStyle === preset.key,
            onClick: () => setSurfaceStyle(preset.key),
            description: preset.description
          },
          preset.key
        )) }) }),
        (showCopyButton || showResetButton) && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 border-t border-border pt-4", children: [
          showCopyButton && /* @__PURE__ */ jsx(CopyButton, { getText: generateCSS, className: "flex-1" }),
          showResetButton && !isDefault && /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: resetConfig,
              className: cn(
                "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-fast ease-standard",
                "hover:bg-muted hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              ),
              children: [
                /* @__PURE__ */ jsxs(
                  "svg",
                  {
                    className: "size-4",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    "aria-hidden": "true",
                    children: [
                      /* @__PURE__ */ jsx("path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }),
                      /* @__PURE__ */ jsx("path", { d: "M3 3v5h5" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("span", { children: "Reset" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
ThemeCustomizer.displayName = "ThemeCustomizer";
var DSThemeContext = createContext(null);
function useDSTheme() {
  const ctx = useContext(DSThemeContext);
  if (!ctx) {
    throw new Error(
      "useDSTheme must be used within a <DSThemeProvider>. Wrap your application (or layout) with <DSThemeProvider>."
    );
  }
  return ctx;
}
function getSystemPreference() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function resolveTheme(theme) {
  if (theme === "system") return getSystemPreference();
  return theme;
}
var STORAGE_KEY2 = "ds-theme-preference";
function getStoredTheme() {
  if (typeof window === "undefined") return "system";
  try {
    const stored = localStorage.getItem(STORAGE_KEY2);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
  }
  return "system";
}
function storeTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY2, theme);
  } catch {
  }
}
function DSThemeProvider({
  children,
  defaultTheme,
  manageHtmlClass = false
}) {
  const [theme, setThemeState] = useState(
    () => defaultTheme ?? getStoredTheme()
  );
  const [systemPreference, setSystemPreference] = useState("light");
  useEffect(() => {
    setSystemPreference(getSystemPreference());
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      setSystemPreference(e.matches ? "dark" : "light");
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  const resolvedTheme = useMemo(
    () => theme === "system" ? systemPreference : theme,
    [theme, systemPreference]
  );
  useEffect(() => {
    if (!manageHtmlClass) return;
    const root = document.documentElement;
    if (resolvedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [resolvedTheme, manageHtmlClass]);
  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    storeTheme(newTheme);
  }, []);
  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const resolved = resolveTheme(current);
      const next = resolved === "dark" ? "light" : "dark";
      storeTheme(next);
      return next;
    });
  }, []);
  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme
    }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );
  return /* @__PURE__ */ jsx(DSThemeContext.Provider, { value, children });
}

export { COLOR_PRESETS, COLOR_PRESET_KEYS, DEFAULT_FONT_KEY, DEFAULT_RADIUS_KEY, DEFAULT_SHADOW_KEY, DEFAULT_STYLE_KEY, DEFAULT_SURFACE_STYLE_KEY, DEFAULT_THEME_CONFIG, DSThemeProvider, FONT_PRESETS, RADIUS_PRESETS, SHADOW_PRESETS, STYLE_PRESETS, SURFACE_STYLE_PRESETS, ThemeCustomizer, ThemeCustomizerProvider, buildDarkThemeVars, buildLightThemeVars, buildThemeCSS, buildThemeOverrides, contract, cssVar, generateThemeCSS, getColorPreset, getFontPreset, getRadiusPreset, getShadowPreset, getStylePreset, useDSTheme, useThemeCustomizer };
