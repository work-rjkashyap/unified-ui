"use client";

// ============================================================================
// Unified UI — Theme Provider
// ============================================================================
// Provides theme context to the application and injects CSS custom properties
// for the design system. Works alongside `next-themes` which handles the
// actual light/dark class toggling on <html>. This provider layers on top
// to give components access to the current resolved theme name and a
// programmatic toggle function.
//
// Architecture:
//   next-themes  → manages .dark class on <html>, persists preference
//   ThemeProvider → provides React context for DS-aware components
//
// The CSS variables themselves are applied via the global stylesheet
// (design-system.css) using :root and .dark selectors, NOT via inline
// styles. This keeps the DOM clean and allows Tailwind to reference
// the variables at build time.
//
// Usage:
//   // In your root layout (already wrapped by next-themes RootProvider):
//   import { DSThemeProvider } from "@/design-system/theme/provider";
//
//   <DSThemeProvider>
//     {children}
//   </DSThemeProvider>
//
//   // In any component:
//   import { useTheme } from "@/design-system/theme/provider";
//
//   const { theme, resolvedTheme, toggleTheme } = useTheme();
// ============================================================================

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export interface DSThemeContextValue {
  /** The user's chosen preference: "light" | "dark" | "system" */
  theme: ThemeMode;
  /** The actual resolved theme after evaluating system preference */
  resolvedTheme: ResolvedTheme;
  /** Set the theme explicitly */
  setTheme: (theme: ThemeMode) => void;
  /** Toggle between light and dark (ignores system) */
  toggleTheme: () => void;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const DSThemeContext = createContext<DSThemeContextValue | null>(null);

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

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
export function useDSTheme(): DSThemeContextValue {
  const ctx = useContext(DSThemeContext);
  if (!ctx) {
    throw new Error(
      "useDSTheme must be used within a <DSThemeProvider>. " +
        "Wrap your application (or layout) with <DSThemeProvider>.",
    );
  }
  return ctx;
}

// ---------------------------------------------------------------------------
// System preference detection
// ---------------------------------------------------------------------------

function getSystemPreference(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(theme: ThemeMode): ResolvedTheme {
  if (theme === "system") return getSystemPreference();
  return theme;
}

// ---------------------------------------------------------------------------
// Storage
// ---------------------------------------------------------------------------

const STORAGE_KEY = "ds-theme-preference";

function getStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "system";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    // localStorage may be unavailable (e.g. SSR, privacy mode)
  }
  return "system";
}

function storeTheme(theme: ThemeMode): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Silently fail if storage is unavailable
  }
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export interface DSThemeProviderProps {
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
export function DSThemeProvider({
  children,
  defaultTheme,
  manageHtmlClass = false,
}: DSThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(
    () => defaultTheme ?? getStoredTheme(),
  );
  const [systemPreference, setSystemPreference] =
    useState<ResolvedTheme>("light");

  // Listen to system preference changes
  useEffect(() => {
    setSystemPreference(getSystemPreference());

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setSystemPreference(e.matches ? "dark" : "light");
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const resolvedTheme: ResolvedTheme = useMemo(
    () => (theme === "system" ? systemPreference : theme),
    [theme, systemPreference],
  );

  // Optionally manage .dark class on <html>
  useEffect(() => {
    if (!manageHtmlClass) return;
    const root = document.documentElement;
    if (resolvedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [resolvedTheme, manageHtmlClass]);

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
    storeTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const resolved = resolveTheme(current);
      const next: ThemeMode = resolved === "dark" ? "light" : "dark";
      storeTheme(next);
      return next;
    });
  }, []);

  const value = useMemo<DSThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );

  return (
    <DSThemeContext.Provider value={value}>{children}</DSThemeContext.Provider>
  );
}
