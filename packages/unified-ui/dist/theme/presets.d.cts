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

export { COLOR_PRESETS, COLOR_PRESET_KEYS, type ColorPreset, type ColorPresetKey, DEFAULT_FONT_KEY, DEFAULT_MENU_ACCENT_KEY, DEFAULT_MENU_COLOR_KEY, DEFAULT_RADIUS_KEY, DEFAULT_SHADOW_KEY, DEFAULT_STYLE_KEY, DEFAULT_SURFACE_STYLE_KEY, DEFAULT_THEME_CONFIG, FONT_PRESETS, type FontPreset, MENU_ACCENT_PRESETS, MENU_COLOR_PRESETS, type MenuAccentPreset, type MenuColorPreset, type PresetSemanticColors, RADIUS_PRESETS, type RadiusPreset, SHADOW_PRESETS, STYLE_PRESETS, SURFACE_STYLE_PRESETS, type ShadowPreset, type StylePreset, type SurfaceStylePreset, type ThemeConfig, buildThemeOverrides, generateThemeCSS, getColorPreset, getFontPreset, getMenuAccentPreset, getMenuColorPreset, getRadiusPreset, getShadowPreset, getStylePreset };
