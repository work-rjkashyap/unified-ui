// ============================================================================
// Unified UI — Theme Layer Barrel Export
// ============================================================================
// Single entry point for the Unified UI theme system. Import from here
// rather than from individual theme files.
//
// Usage:
//   import { DSThemeProvider, useDSTheme, contract, cssVar } from "@/design-system/theme";
// ============================================================================

// ---------------------------------------------------------------------------
// Theme Contract & CSS Variable Utilities
// ---------------------------------------------------------------------------
export {
  buildDarkThemeVars,
  buildLightThemeVars,
  buildThemeCSS,
  type ColorVarName,
  contract,
  cssVar,
  type DurationVarName,
  type EasingVarName,
  type FontFamilyVarName,
  type RadiusVarName,
  type ShadowVarName,
  type ThemeVars,
  type ZIndexVarName,
} from "./contract";

// ---------------------------------------------------------------------------
// Theme Provider & Hook
// ---------------------------------------------------------------------------
export {
  type DSThemeContextValue,
  DSThemeProvider,
  type DSThemeProviderProps,
  type ResolvedTheme,
  type ThemeMode,
  useDSTheme,
} from "./provider";
