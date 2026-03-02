"use client";

// ============================================================================
// Unified UI — Theme Customizer Store
// ============================================================================
// Provides a React context + provider that manages the active ThemeConfig.
// The store persists the configuration to localStorage and applies CSS
// custom property overrides at runtime by injecting a <style> tag into
// the document head.
//
// Architecture:
//   1. ThemeCustomizerProvider wraps the app (typically inside DSThemeProvider)
//   2. On mount, it reads the persisted config from localStorage
//   3. Whenever the config changes, it:
//      a. Persists to localStorage
//      b. Rebuilds the CSS override string
//      c. Injects/updates a <style id="ds-theme-customizer"> element
//   4. Components read the active config via useThemeCustomizer()
//
// The provider listens to the resolved color mode (light/dark) — either
// from the DSThemeProvider context or from the DOM `.dark` class — so that
// shadow and color overrides are mode-aware.
//
// Usage:
//   import { ThemeCustomizerProvider, useThemeCustomizer } from "@unified-ui/theme";
//
//   // In root layout:
//   <ThemeCustomizerProvider>
//     {children}
//   </ThemeCustomizerProvider>
//
//   // In any component:
//   const { config, setColorPreset, setRadius, setFont, resetConfig } = useThemeCustomizer();
// ============================================================================

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  buildThemeOverrides,
  COLOR_PRESET_KEYS,
  DEFAULT_THEME_CONFIG,
  FONT_PRESETS,
  generateThemeCSS,
  RADIUS_PRESETS,
  SHADOW_PRESETS,
  SURFACE_STYLE_PRESETS,
  type ThemeConfig,
} from "./presets";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = "ds-theme-customizer";
const STYLE_ELEMENT_ID = "ds-theme-customizer";

// ---------------------------------------------------------------------------
// Context Value Type
// ---------------------------------------------------------------------------

export interface ThemeCustomizerContextValue {
  /** The current full theme configuration */
  config: ThemeConfig;

  /** Replace the entire theme config at once */
  setConfig: (config: ThemeConfig) => void;

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

  /** Reset to the default theme configuration */
  resetConfig: () => void;

  /** Whether the current config matches the default config */
  isDefault: boolean;

  /** Generate a copyable CSS string for the current config */
  generateCSS: () => string;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const ThemeCustomizerContext =
  createContext<ThemeCustomizerContextValue | null>(null);

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

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
export function useThemeCustomizer(): ThemeCustomizerContextValue {
  const ctx = useContext(ThemeCustomizerContext);
  if (!ctx) {
    throw new Error(
      "useThemeCustomizer must be used within a <ThemeCustomizerProvider>. " +
        "Wrap your application (or layout) with <ThemeCustomizerProvider>.",
    );
  }
  return ctx;
}

// ---------------------------------------------------------------------------
// localStorage Helpers
// ---------------------------------------------------------------------------

function loadConfig(): ThemeConfig {
  if (typeof window === "undefined") return DEFAULT_THEME_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_THEME_CONFIG;
    const parsed = JSON.parse(raw) as Partial<ThemeConfig>;

    // Validate each field — fall back to defaults for invalid values
    return {
      colorPreset: COLOR_PRESET_KEYS.includes(parsed.colorPreset ?? "")
        ? parsed.colorPreset!
        : DEFAULT_THEME_CONFIG.colorPreset,
      radius: RADIUS_PRESETS.some((r) => r.key === parsed.radius)
        ? parsed.radius!
        : DEFAULT_THEME_CONFIG.radius,
      font: FONT_PRESETS.some((f) => f.key === parsed.font)
        ? parsed.font!
        : DEFAULT_THEME_CONFIG.font,
      shadow: SHADOW_PRESETS.some((s) => s.key === parsed.shadow)
        ? parsed.shadow!
        : DEFAULT_THEME_CONFIG.shadow,
      surfaceStyle: SURFACE_STYLE_PRESETS.some(
        (s) => s.key === parsed.surfaceStyle,
      )
        ? parsed.surfaceStyle!
        : DEFAULT_THEME_CONFIG.surfaceStyle,
    };
  } catch {
    return DEFAULT_THEME_CONFIG;
  }
}

function saveConfig(config: ThemeConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Silently fail if storage is unavailable
  }
}

// ---------------------------------------------------------------------------
// Resolved Mode Detection
// ---------------------------------------------------------------------------
// Detects whether we're in light or dark mode by checking the .dark class
// on <html>. This is compatible with next-themes, fumadocs RootProvider,
// and the DSThemeProvider.
// ---------------------------------------------------------------------------

function getResolvedMode(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

// ---------------------------------------------------------------------------
// Style Injection
// ---------------------------------------------------------------------------
// Injects CSS custom property overrides into a <style> element in the
// document head. Uses separate :root and .dark blocks so that mode-specific
// overrides work correctly alongside the base stylesheet.
// ---------------------------------------------------------------------------

function injectStyles(config: ThemeConfig): void {
  if (typeof document === "undefined") return;

  let styleEl = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = STYLE_ELEMENT_ID;
    styleEl.setAttribute("data-ds-customizer", "");
    document.head.appendChild(styleEl);
  }

  const lightVars = buildThemeOverrides(config, "light");
  const darkVars = buildThemeOverrides(config, "dark");

  const formatVars = (vars: Record<string, string>): string =>
    Object.entries(vars)
      .map(([prop, value]) => `${prop}:${value}`)
      .join(";");

  // Use high-specificity selectors so customizer overrides win over the
  // base stylesheet values from styles.css. The :root:root selector
  // doubles specificity without adding any semantic meaning.
  styleEl.textContent = [
    `:root:root{${formatVars(lightVars)}}`,
    `.dark:root{${formatVars(darkVars)}}`,
  ].join("\n");
}

function removeStyles(): void {
  if (typeof document === "undefined") return;
  const styleEl = document.getElementById(STYLE_ELEMENT_ID);
  if (styleEl) {
    styleEl.remove();
  }
}

// ---------------------------------------------------------------------------
// Config Equality Check
// ---------------------------------------------------------------------------

function configsEqual(a: ThemeConfig, b: ThemeConfig): boolean {
  return (
    a.colorPreset === b.colorPreset &&
    a.radius === b.radius &&
    a.font === b.font &&
    a.shadow === b.shadow &&
    a.surfaceStyle === b.surfaceStyle
  );
}

// ---------------------------------------------------------------------------
// Provider Props
// ---------------------------------------------------------------------------

export interface ThemeCustomizerProviderProps {
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

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

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
export function ThemeCustomizerProvider({
  children,
  defaultConfig,
  applyStyles = true,
}: ThemeCustomizerProviderProps) {
  const [config, setConfigState] = useState<ThemeConfig>(
    () => defaultConfig ?? loadConfig(),
  );

  // Track the resolved mode so we can re-inject styles when it changes
  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">("light");

  // Ref to avoid stale closures in the MutationObserver callback
  const configRef = useRef(config);
  configRef.current = config;

  // Detect initial mode and observe changes to .dark class on <html>
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
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Apply styles whenever config or mode changes
  useEffect(() => {
    if (applyStyles) {
      injectStyles(config);
    }
  }, [config, resolvedMode, applyStyles]);

  // Persist to localStorage whenever config changes
  useEffect(() => {
    saveConfig(config);
  }, [config]);

  // Clean up injected styles on unmount
  useEffect(() => {
    return () => {
      if (applyStyles) {
        removeStyles();
      }
    };
  }, [applyStyles]);

  // Listen for storage events from other tabs/windows
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue) as ThemeConfig;
          setConfigState((prev) => {
            if (configsEqual(prev, parsed)) return prev;
            return parsed;
          });
        } catch {
          // Ignore invalid JSON
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // -------------------------------------------------------------------
  // Actions
  // -------------------------------------------------------------------

  const setConfig = useCallback((newConfig: ThemeConfig) => {
    setConfigState(newConfig);
  }, []);

  const setColorPreset = useCallback((key: string) => {
    setConfigState((prev) => {
      if (prev.colorPreset === key) return prev;
      return { ...prev, colorPreset: key };
    });
  }, []);

  const setRadius = useCallback((key: string) => {
    setConfigState((prev) => {
      if (prev.radius === key) return prev;
      return { ...prev, radius: key };
    });
  }, []);

  const setFont = useCallback((key: string) => {
    setConfigState((prev) => {
      if (prev.font === key) return prev;
      return { ...prev, font: key };
    });
  }, []);

  const setShadow = useCallback((key: string) => {
    setConfigState((prev) => {
      if (prev.shadow === key) return prev;
      return { ...prev, shadow: key };
    });
  }, []);

  const setSurfaceStyle = useCallback((key: string) => {
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

  // -------------------------------------------------------------------
  // Context Value
  // -------------------------------------------------------------------

  const value = useMemo<ThemeCustomizerContextValue>(
    () => ({
      config,
      setConfig,
      setColorPreset,
      setRadius,
      setFont,
      setShadow,
      setSurfaceStyle,
      resetConfig,
      isDefault,
      generateCSS: generateCSSFn,
    }),
    [
      config,
      setConfig,
      setColorPreset,
      setRadius,
      setFont,
      setShadow,
      setSurfaceStyle,
      resetConfig,
      isDefault,
      generateCSSFn,
    ],
  );

  return (
    <ThemeCustomizerContext.Provider value={value}>
      {children}
    </ThemeCustomizerContext.Provider>
  );
}
