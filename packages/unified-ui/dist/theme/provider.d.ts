import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

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

export { type DSThemeContextValue, DSThemeProvider, type DSThemeProviderProps, type ResolvedTheme, type ThemeMode, useDSTheme };
