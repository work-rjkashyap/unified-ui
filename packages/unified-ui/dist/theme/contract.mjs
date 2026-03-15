"use client";
import {
  semanticDark,
  semanticLight
} from "../tokens/colors";
import { durationCSS, easingCSS } from "../tokens/motion";
import { radius } from "../tokens/radius";
import { shadow, shadowDark } from "../tokens/shadows";
import { fontFamily } from "../tokens/typography";
import { zIndex } from "../tokens/z-index";
const colorVarNames = {
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
const radiusVarNames = {
  none: "--radius-none",
  sm: "--radius-sm",
  md: "--radius-md",
  lg: "--radius-lg",
  xl: "--radius-xl",
  full: "--radius-full"
};
const shadowVarNames = {
  none: "--shadow-none",
  xs: "--shadow-xs",
  sm: "--shadow-sm",
  md: "--shadow-md",
  lg: "--shadow-lg",
  xl: "--shadow-xl",
  "2xl": "--shadow-2xl",
  focusRing: "--shadow-focus-ring"
};
const zIndexVarNames = {
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
const durationVarNames = {
  instant: "--duration-instant",
  fast: "--duration-fast",
  moderate: "--duration-moderate",
  normal: "--duration-normal",
  slow: "--duration-slow",
  slower: "--duration-slower",
  slowest: "--duration-slowest"
};
const easingVarNames = {
  standard: "--easing-standard",
  decelerate: "--easing-decelerate",
  accelerate: "--easing-accelerate",
  emphasize: "--easing-emphasize",
  linear: "--easing-linear",
  snap: "--easing-snap"
};
const fontFamilyVarNames = {
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
const contract = {
  color: colorVarNames,
  radius: radiusVarNames,
  shadow: shadowVarNames,
  zIndex: zIndexVarNames,
  duration: durationVarNames,
  easing: easingVarNames,
  fontFamily: fontFamilyVarNames
};
const cssVar = {
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
export {
  buildDarkThemeVars,
  buildLightThemeVars,
  buildThemeCSS,
  contract,
  cssVar
};
