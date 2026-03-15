import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ReactNode } from 'react';
import { ThemeConfig } from './presets.js';

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

export { ThemeCustomizerContext, type ThemeCustomizerContextValue, ThemeCustomizerProvider, type ThemeCustomizerProviderProps, useThemeCustomizer };
