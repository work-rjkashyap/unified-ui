// ============================================================================
// Unified UI — Theme Layer Barrel Export
// ============================================================================
// Single entry point for the Unified UI theme system. Import from here
// rather than from individual theme files.
//
// Usage:
//   import { DSThemeProvider, useDSTheme, contract, cssVar } from "@/design-system/theme";
//   import { ThemeCustomizer, ThemeCustomizerProvider, useThemeCustomizer } from "@/design-system/theme";
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
// Theme Customizer UI Component
// ---------------------------------------------------------------------------
export {
  ThemeCustomizer,
  type ThemeCustomizerProps,
} from "./customizer";
// ---------------------------------------------------------------------------
// Theme Customizer Store (Context + Provider + Hook)
// ---------------------------------------------------------------------------
export {
  type ThemeCustomizerContextValue,
  ThemeCustomizerProvider,
  type ThemeCustomizerProviderProps,
  useThemeCustomizer,
} from "./customizer-store";
// ---------------------------------------------------------------------------
// Theme Presets & Configuration
// ---------------------------------------------------------------------------
export {
  buildThemeOverrides,
  COLOR_PRESET_KEYS,
  COLOR_PRESETS,
  type ColorPreset,
  type ColorPresetKey,
  DEFAULT_FONT_KEY,
  DEFAULT_RADIUS_KEY,
  DEFAULT_SHADOW_KEY,
  DEFAULT_STYLE_KEY,
  DEFAULT_SURFACE_STYLE_KEY,
  DEFAULT_THEME_CONFIG,
  FONT_PRESETS,
  type FontPreset,
  generateThemeCSS,
  getColorPreset,
  getFontPreset,
  getRadiusPreset,
  getShadowPreset,
  getStylePreset,
  type PresetSemanticColors,
  RADIUS_PRESETS,
  type RadiusPreset,
  SHADOW_PRESETS,
  type ShadowPreset,
  STYLE_PRESETS,
  type StylePreset,
  SURFACE_STYLE_PRESETS,
  type SurfaceStylePreset,
  type ThemeConfig,
} from "./presets";
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
