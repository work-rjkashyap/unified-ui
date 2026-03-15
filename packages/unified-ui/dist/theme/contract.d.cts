import { SemanticColorKey } from '../tokens/colors.cjs';
import { durationCSS, easingCSS } from '../tokens/motion.cjs';
import { radius } from '../tokens/radius.cjs';
import { shadow } from '../tokens/shadows.cjs';
import { fontFamily } from '../tokens/typography.cjs';
import { zIndex } from '../tokens/z-index.cjs';

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

export { type ColorVarName, type DurationVarName, type EasingVarName, type FontFamilyVarName, type RadiusVarName, type ShadowVarName, type ThemeVars, type ZIndexVarName, buildDarkThemeVars, buildLightThemeVars, buildThemeCSS, contract, cssVar };
