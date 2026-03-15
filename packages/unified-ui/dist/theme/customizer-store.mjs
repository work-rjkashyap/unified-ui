"use client";
import { jsx } from "react/jsx-runtime";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  buildThemeOverrides,
  COLOR_PRESET_KEYS,
  DEFAULT_THEME_CONFIG,
  FONT_PRESETS,
  generateThemeCSS,
  getStylePreset,
  MENU_ACCENT_PRESETS,
  MENU_COLOR_PRESETS,
  RADIUS_PRESETS,
  SHADOW_PRESETS,
  STYLE_PRESETS,
  SURFACE_STYLE_PRESETS
} from "./presets";
const STORAGE_KEY = "ds-theme-customizer";
const STYLE_ELEMENT_ID = "ds-theme-customizer";
const ThemeCustomizerContext = createContext(null);
function useThemeCustomizer() {
  const ctx = useContext(ThemeCustomizerContext);
  if (!ctx) {
    throw new Error(
      "useThemeCustomizer must be used within a <ThemeCustomizerProvider>. Wrap your application (or layout) with <ThemeCustomizerProvider>."
    );
  }
  return ctx;
}
function loadConfig() {
  if (typeof window === "undefined") return DEFAULT_THEME_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_THEME_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      style: STYLE_PRESETS.some((s) => s.key === parsed.style) ? parsed.style : DEFAULT_THEME_CONFIG.style,
      colorPreset: COLOR_PRESET_KEYS.includes(parsed.colorPreset ?? "") ? parsed.colorPreset : DEFAULT_THEME_CONFIG.colorPreset,
      radius: RADIUS_PRESETS.some((r) => r.key === parsed.radius) ? parsed.radius : DEFAULT_THEME_CONFIG.radius,
      font: FONT_PRESETS.some((f) => f.key === parsed.font) ? parsed.font : DEFAULT_THEME_CONFIG.font,
      shadow: SHADOW_PRESETS.some((s) => s.key === parsed.shadow) ? parsed.shadow : DEFAULT_THEME_CONFIG.shadow,
      surfaceStyle: SURFACE_STYLE_PRESETS.some(
        (s) => s.key === parsed.surfaceStyle
      ) ? parsed.surfaceStyle : DEFAULT_THEME_CONFIG.surfaceStyle,
      menuColor: MENU_COLOR_PRESETS.some((p) => p.key === parsed.menuColor) ? parsed.menuColor : DEFAULT_THEME_CONFIG.menuColor,
      menuAccent: MENU_ACCENT_PRESETS.some((p) => p.key === parsed.menuAccent) ? parsed.menuAccent : DEFAULT_THEME_CONFIG.menuAccent
    };
  } catch {
    return DEFAULT_THEME_CONFIG;
  }
}
function saveConfig(config) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
  }
}
function getResolvedMode() {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}
function injectStyles(config) {
  if (typeof document === "undefined") return;
  let styleEl = document.getElementById(
    STYLE_ELEMENT_ID
  );
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = STYLE_ELEMENT_ID;
    styleEl.setAttribute("data-ds-customizer", "");
    document.head.appendChild(styleEl);
  }
  const lightVars = buildThemeOverrides(config, "light");
  const darkVars = buildThemeOverrides(config, "dark");
  const formatVars = (vars) => Object.entries(vars).map(([prop, value]) => `${prop}:${value}`).join(";");
  styleEl.textContent = [
    `:root:root{${formatVars(lightVars)}}`,
    `.dark:root{${formatVars(darkVars)}}`
  ].join("\n");
}
function removeStyles() {
  if (typeof document === "undefined") return;
  const styleEl = document.getElementById(STYLE_ELEMENT_ID);
  if (styleEl) {
    styleEl.remove();
  }
}
function configsEqual(a, b) {
  return a.style === b.style && a.colorPreset === b.colorPreset && a.radius === b.radius && a.font === b.font && a.shadow === b.shadow && a.surfaceStyle === b.surfaceStyle && a.menuColor === b.menuColor && a.menuAccent === b.menuAccent;
}
function ThemeCustomizerProvider({
  children,
  defaultConfig,
  applyStyles = true
}) {
  const [config, setConfigState] = useState(
    () => defaultConfig ?? loadConfig()
  );
  const [_resolvedMode, setResolvedMode] = useState("light");
  const configRef = useRef(config);
  configRef.current = config;
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
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (applyStyles) {
      injectStyles(config);
    }
  }, [config, applyStyles]);
  useEffect(() => {
    saveConfig(config);
  }, [config]);
  useEffect(() => {
    return () => {
      if (applyStyles) {
        removeStyles();
      }
    };
  }, [applyStyles]);
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setConfigState((prev) => {
            if (configsEqual(prev, parsed)) return prev;
            return parsed;
          });
        } catch {
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);
  const setConfig = useCallback((newConfig) => {
    setConfigState(newConfig);
  }, []);
  const setStyle = useCallback((key) => {
    const preset = getStylePreset(key);
    setConfigState((prev) => {
      if (prev.style === key) return prev;
      return {
        ...prev,
        style: key,
        radius: preset.defaults.radius,
        font: preset.defaults.font,
        shadow: preset.defaults.shadow,
        surfaceStyle: preset.defaults.surfaceStyle
      };
    });
  }, []);
  const setColorPreset = useCallback((key) => {
    setConfigState((prev) => {
      if (prev.colorPreset === key) return prev;
      return { ...prev, colorPreset: key };
    });
  }, []);
  const setRadius = useCallback((key) => {
    setConfigState((prev) => {
      if (prev.radius === key) return prev;
      return { ...prev, radius: key };
    });
  }, []);
  const setFont = useCallback((key) => {
    setConfigState((prev) => {
      if (prev.font === key) return prev;
      return { ...prev, font: key };
    });
  }, []);
  const setShadow = useCallback((key) => {
    setConfigState((prev) => {
      if (prev.shadow === key) return prev;
      return { ...prev, shadow: key };
    });
  }, []);
  const setSurfaceStyle = useCallback((key) => {
    setConfigState((prev) => {
      if (prev.surfaceStyle === key) return prev;
      return { ...prev, surfaceStyle: key };
    });
  }, []);
  const setMenuColor = useCallback((key) => {
    setConfigState((prev) => {
      if (prev.menuColor === key) return prev;
      return { ...prev, menuColor: key };
    });
  }, []);
  const setMenuAccent = useCallback((key) => {
    setConfigState((prev) => {
      if (prev.menuAccent === key) return prev;
      return { ...prev, menuAccent: key };
    });
  }, []);
  const resetConfig = useCallback(() => {
    setConfigState(DEFAULT_THEME_CONFIG);
  }, []);
  const isDefault = configsEqual(config, DEFAULT_THEME_CONFIG);
  const generateCSSFn = useCallback(() => {
    return generateThemeCSS(config);
  }, [config]);
  const value = useMemo(
    () => ({
      config,
      setConfig,
      setStyle,
      setColorPreset,
      setRadius,
      setFont,
      setShadow,
      setSurfaceStyle,
      setMenuColor,
      setMenuAccent,
      resetConfig,
      isDefault,
      generateCSS: generateCSSFn
    }),
    [
      config,
      setConfig,
      setStyle,
      setColorPreset,
      setRadius,
      setFont,
      setShadow,
      setSurfaceStyle,
      setMenuColor,
      setMenuAccent,
      resetConfig,
      isDefault,
      generateCSSFn
    ]
  );
  return /* @__PURE__ */ jsx(ThemeCustomizerContext.Provider, { value, children });
}
export {
  ThemeCustomizerContext,
  ThemeCustomizerProvider,
  useThemeCustomizer
};
