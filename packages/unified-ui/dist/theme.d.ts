import { S as SemanticColorKey, r as radius, o as shadow, z as zIndex } from './z-index-DmLl6FUD.js';
import { b as durationCSS, f as easingCSS } from './motion-D9wQbcKL.js';
import { f as fontFamily } from './typography-DlvVjEdE.js';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ReactNode } from 'react';

declare const colorVarNames: Record<SemanticColorKey, string>;
type RadiusKey = keyof typeof radius;
declare const radiusVarNames: Record<RadiusKey, string>;
type ShadowKey = keyof typeof shadow;
declare const shadowVarNames: Record<ShadowKey, string>;
type ZIndexKey = keyof typeof zIndex;
declare const zIndexVarNames: Record<ZIndexKey, string>;
type DurationKey = keyof typeof durationCSS;
type EasingKey = keyof typeof easingCSS;
declare const durationVarNames: Record<DurationKey, string>;
declare const easingVarNames: Record<EasingKey, string>;
type FontFamilyKey = keyof typeof fontFamily;
declare const fontFamilyVarNames: Record<FontFamilyKey, string>;
/** Generate the full set of CSS variables for the light theme */
declare function buildLightThemeVars(): Record<string, string>;
/** Generate the full set of CSS variables for the dark theme */
declare function buildDarkThemeVars(): Record<string, string>;
/** Returns the complete CSS text for both :root (light) and .dark themes */
declare function buildThemeCSS(): string;
declare const contract: {
    readonly color: Record<"input" | "popover" | "disabled" | "background" | "border" | "info" | "success" | "warning" | "danger" | "primary" | "secondary" | "card" | "muted" | "sidebar" | "foreground" | "focusRing" | "surface" | "surfaceRaised" | "surfaceOverlay" | "cardForeground" | "popoverForeground" | "mutedForeground" | "primaryForeground" | "primaryHover" | "primaryActive" | "primaryMuted" | "primaryMutedForeground" | "secondaryForeground" | "secondaryHover" | "secondaryActive" | "accent" | "accentForeground" | "successForeground" | "successMuted" | "successMutedForeground" | "warningForeground" | "warningMuted" | "warningMutedForeground" | "dangerForeground" | "dangerHover" | "dangerActive" | "dangerMuted" | "dangerMutedForeground" | "destructive" | "destructiveForeground" | "infoForeground" | "infoMuted" | "infoMutedForeground" | "borderMuted" | "borderStrong" | "ring" | "inputForeground" | "inputPlaceholder" | "disabledForeground" | "chart1" | "chart2" | "chart3" | "chart4" | "chart5" | "sidebarForeground" | "sidebarPrimary" | "sidebarPrimaryForeground" | "sidebarAccent" | "sidebarAccentForeground" | "sidebarBorder" | "sidebarRing", string>;
    readonly radius: Record<"sm" | "md" | "none" | "lg" | "xl" | "full", string>;
    readonly shadow: Record<"sm" | "md" | "none" | "xs" | "lg" | "xl" | "2xl" | "focusRing", string>;
    readonly zIndex: Record<"base" | "popover" | "tooltip" | "max" | "modal" | "overlay" | "sticky" | "toast" | "dropdown", string>;
    readonly duration: Record<"instant" | "fast" | "moderate" | "normal" | "slow" | "slower" | "slowest", string>;
    readonly easing: Record<"standard" | "decelerate" | "accelerate" | "emphasize" | "linear" | "snap", string>;
    readonly fontFamily: Record<"inherit" | "display" | "serif" | "sans" | "mono", string>;
};
declare const cssVar: {
    /** Returns `var(--<key>)` for use in style props */
    readonly color: (key: SemanticColorKey) => string;
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
    readonly colorAlpha: (key: SemanticColorKey, alpha: number) => string;
    /** Returns `var(--radius-<key>)` */
    readonly radius: (key: RadiusKey) => string;
    /** Returns `var(--shadow-<key>)` */
    readonly shadow: (key: ShadowKey) => string;
    /** Returns `var(--z-<key>)` */
    readonly zIndex: (key: ZIndexKey) => string;
    /** Returns `var(--duration-<key>)` */
    readonly duration: (key: DurationKey) => string;
    /** Returns `var(--easing-<key>)` */
    readonly easing: (key: EasingKey) => string;
    /** Returns `var(--font-<key>)` */
    readonly fontFamily: (key: FontFamilyKey) => string;
    /** Returns the raw `var(--<key>)` — same as color() since values are complete oklch */
    readonly colorChannels: (key: SemanticColorKey) => string;
};
type ThemeVars = ReturnType<typeof buildLightThemeVars>;
type ColorVarName = (typeof colorVarNames)[SemanticColorKey];
type RadiusVarName = (typeof radiusVarNames)[RadiusKey];
type ShadowVarName = (typeof shadowVarNames)[ShadowKey];
type ZIndexVarName = (typeof zIndexVarNames)[ZIndexKey];
type DurationVarName = (typeof durationVarNames)[DurationKey];
type EasingVarName = (typeof easingVarNames)[EasingKey];
type FontFamilyVarName = (typeof fontFamilyVarNames)[FontFamilyKey];

interface ThemeCustomizerProps {
    className?: string;
    showCopyButton?: boolean;
    showResetButton?: boolean;
}
declare function ThemeCustomizer({ className, showCopyButton, showResetButton, }: ThemeCustomizerProps): react_jsx_runtime.JSX.Element;
declare namespace ThemeCustomizer {
    var displayName: string;
}

type PresetSemanticColors = {
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
interface ColorPreset {
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
declare const COLOR_PRESETS: readonly ColorPreset[];
/** Get a color preset by its key. Returns the default (zinc) if not found. */
declare function getColorPreset(key: string): ColorPreset;
/** All available color preset keys. */
declare const COLOR_PRESET_KEYS: string[];
type ColorPresetKey = (typeof COLOR_PRESET_KEYS)[number];
interface RadiusPreset {
    readonly name: string;
    readonly key: string;
    /** The CSS value for `--radius` (base radius) */
    readonly value: string;
    /** Human-readable pixel approximation for display */
    readonly label: string;
}
declare const RADIUS_PRESETS: readonly RadiusPreset[];
declare const DEFAULT_RADIUS_KEY = "0.625";
declare function getRadiusPreset(key: string): RadiusPreset;
interface FontPreset {
    readonly name: string;
    readonly key: string;
    /** The CSS font-family value to inject into `--font-sans` */
    readonly value: string;
    /** A sample string for previewing the font */
    readonly sample: string;
}
declare const FONT_PRESETS: readonly FontPreset[];
declare const DEFAULT_FONT_KEY = "outfit";
declare function getFontPreset(key: string): FontPreset;
interface ShadowPreset {
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
declare const SHADOW_PRESETS: readonly ShadowPreset[];
declare const DEFAULT_SHADOW_KEY = "default";
declare function getShadowPreset(key: string): ShadowPreset;
interface SurfaceStylePreset {
    readonly name: string;
    readonly key: string;
    readonly description: string;
}
declare const SURFACE_STYLE_PRESETS: readonly SurfaceStylePreset[];
declare const DEFAULT_SURFACE_STYLE_KEY = "bordered";
interface MenuColorPreset {
    readonly name: string;
    readonly key: string;
    readonly description: string;
}
declare const MENU_COLOR_PRESETS: readonly MenuColorPreset[];
declare const DEFAULT_MENU_COLOR_KEY = "default";
declare function getMenuColorPreset(key: string): MenuColorPreset;
interface MenuAccentPreset {
    readonly name: string;
    readonly key: string;
    readonly description: string;
}
declare const MENU_ACCENT_PRESETS: readonly MenuAccentPreset[];
declare const DEFAULT_MENU_ACCENT_KEY = "subtle";
declare function getMenuAccentPreset(key: string): MenuAccentPreset;
interface StylePreset {
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
declare const STYLE_PRESETS: readonly StylePreset[];
declare const DEFAULT_STYLE_KEY = "vega";
declare function getStylePreset(key: string): StylePreset;
interface ThemeConfig {
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
declare const DEFAULT_THEME_CONFIG: ThemeConfig;
/**
 * Build the complete set of CSS custom property overrides for a given
 * theme configuration and color mode.
 *
 * @param config - The theme configuration from the customizer store
 * @param mode - The resolved color mode ("light" or "dark")
 * @returns A flat record of CSS custom property names → values
 */
declare function buildThemeOverrides(config: ThemeConfig, mode: "light" | "dark"): Record<string, string>;
/**
 * Generate a complete CSS string for a theme config that can be pasted
 * into a user's stylesheet.
 */
declare function generateThemeCSS(config: ThemeConfig): string;

interface ThemeCustomizerContextValue {
    /** The current full theme configuration */
    config: ThemeConfig;
    /** Replace the entire theme config at once */
    setConfig: (config: ThemeConfig) => void;
    /** Set the style preset (e.g. "vega", "nova", "maia", "lyra", "mira") and apply its defaults */
    setStyle: (key: string) => void;
    /** Set just the color preset (e.g. "zinc", "blue", "rose") */
    setColorPreset: (key: string) => void;
    /** Set just the radius preset (e.g. "0.5", "0.625") */
    setRadius: (key: string) => void;
    /** Set just the font preset (e.g. "outfit", "inter", "system") */
    setFont: (key: string) => void;
    /** Set just the shadow mode (e.g. "none", "subtle", "default", "heavy") */
    setShadow: (key: string) => void;
    /** Set just the surface style (e.g. "bordered", "elevated", "mixed") */
    setSurfaceStyle: (key: string) => void;
    /** Set just the menu color (e.g. "default", "muted", "inverted", "primary") */
    setMenuColor: (key: string) => void;
    /** Set just the menu accent (e.g. "none", "subtle", "bold") */
    setMenuAccent: (key: string) => void;
    /** Reset to the default theme configuration */
    resetConfig: () => void;
    /** Whether the current config matches the default config */
    isDefault: boolean;
    /** Generate a copyable CSS string for the current config */
    generateCSS: () => string;
}
declare const ThemeCustomizerContext: react.Context<ThemeCustomizerContextValue | null>;
/**
 * Access the theme customizer store.
 *
 * Must be used within a `<ThemeCustomizerProvider>`. Throws if used outside.
 *
 * @example
 * ```tsx
 * const { config, setColorPreset, setRadius, resetConfig } = useThemeCustomizer();
 * ```
 */
declare function useThemeCustomizer(): ThemeCustomizerContextValue;
interface ThemeCustomizerProviderProps {
    children: ReactNode;
    /** Override the initial config (useful for SSR or testing) */
    defaultConfig?: ThemeConfig;
    /**
     * If false, the provider will not inject <style> overrides into the DOM.
     * Useful if you only want to read the config without applying it.
     * @default true
     */
    applyStyles?: boolean;
}
/**
 * Theme customizer provider.
 *
 * Manages the active theme configuration, persists it to localStorage,
 * and injects CSS custom property overrides into the document head.
 *
 * Place this inside your theme/root provider but outside your main content:
 *
 * @example
 * ```tsx
 * <RootProvider>
 *   <ThemeCustomizerProvider>
 *     {children}
 *   </ThemeCustomizerProvider>
 * </RootProvider>
 * ```
 */
declare function ThemeCustomizerProvider({ children, defaultConfig, applyStyles, }: ThemeCustomizerProviderProps): react_jsx_runtime.JSX.Element;

type ThemeMode = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";
interface DSThemeContextValue {
    /** The user's chosen preference: "light" | "dark" | "system" */
    theme: ThemeMode;
    /** The actual resolved theme after evaluating system preference */
    resolvedTheme: ResolvedTheme;
    /** Set the theme explicitly */
    setTheme: (theme: ThemeMode) => void;
    /** Toggle between light and dark (ignores system) */
    toggleTheme: () => void;
}
/**
 * Access the design system theme context.
 *
 * Must be used within a `<DSThemeProvider>`. Throws if used outside.
 *
 * @example
 * ```tsx
 * const { resolvedTheme, toggleTheme } = useDSTheme();
 * ```
 */
declare function useDSTheme(): DSThemeContextValue;
interface DSThemeProviderProps {
    children: ReactNode;
    /** Override the initial theme (useful for testing or SSR) */
    defaultTheme?: ThemeMode;
    /**
     * If true, the provider will also manage the `.dark` class on <html>.
     * Set to false if next-themes is already handling this (default: false).
     */
    manageHtmlClass?: boolean;
}
/**
 * Design system theme provider.
 *
 * Provides theme state and a toggle mechanism to all descendant components.
 * By default, it defers `.dark` class management to `next-themes` and only
 * provides the React context. Set `manageHtmlClass={true}` if you want this
 * provider to also toggle the class on `<html>`.
 *
 * @example
 * ```tsx
 * // Root layout
 * <RootProvider>          {/* next-themes *\/}
 *   <DSThemeProvider>     {/* design system *\/}
 *     {children}
 *   </DSThemeProvider>
 * </RootProvider>
 * ```
 */
declare function DSThemeProvider({ children, defaultTheme, manageHtmlClass, }: DSThemeProviderProps): react_jsx_runtime.JSX.Element;

export { COLOR_PRESETS, COLOR_PRESET_KEYS, type ColorPreset, type ColorPresetKey, type ColorVarName, DEFAULT_FONT_KEY, DEFAULT_MENU_ACCENT_KEY, DEFAULT_MENU_COLOR_KEY, DEFAULT_RADIUS_KEY, DEFAULT_SHADOW_KEY, DEFAULT_STYLE_KEY, DEFAULT_SURFACE_STYLE_KEY, DEFAULT_THEME_CONFIG, type DSThemeContextValue, DSThemeProvider, type DSThemeProviderProps, type DurationVarName, type EasingVarName, FONT_PRESETS, type FontFamilyVarName, type FontPreset, MENU_ACCENT_PRESETS, MENU_COLOR_PRESETS, type MenuAccentPreset, type MenuColorPreset, type PresetSemanticColors, RADIUS_PRESETS, type RadiusPreset, type RadiusVarName, type ResolvedTheme, SHADOW_PRESETS, STYLE_PRESETS, SURFACE_STYLE_PRESETS, type ShadowPreset, type ShadowVarName, type StylePreset, type SurfaceStylePreset, type ThemeConfig, ThemeCustomizer, ThemeCustomizerContext, type ThemeCustomizerContextValue, type ThemeCustomizerProps, ThemeCustomizerProvider, type ThemeCustomizerProviderProps, type ThemeMode, type ThemeVars, type ZIndexVarName, buildDarkThemeVars, buildLightThemeVars, buildThemeCSS, buildThemeOverrides, contract, cssVar, generateThemeCSS, getColorPreset, getFontPreset, getMenuAccentPreset, getMenuColorPreset, getRadiusPreset, getShadowPreset, getStylePreset, useDSTheme, useThemeCustomizer };
