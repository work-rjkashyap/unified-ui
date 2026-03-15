"use strict";
"use client";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var customizer_store_exports = {};
__export(customizer_store_exports, {
  ThemeCustomizerContext: () => ThemeCustomizerContext,
  ThemeCustomizerProvider: () => ThemeCustomizerProvider,
  useThemeCustomizer: () => useThemeCustomizer
});
module.exports = __toCommonJS(customizer_store_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react = require("react");
var import_presets = require("./presets");
const STORAGE_KEY = "ds-theme-customizer";
const STYLE_ELEMENT_ID = "ds-theme-customizer";
const ThemeCustomizerContext = (0, import_react.createContext)(null);
function useThemeCustomizer() {
  const ctx = (0, import_react.useContext)(ThemeCustomizerContext);
  if (!ctx) {
    throw new Error(
      "useThemeCustomizer must be used within a <ThemeCustomizerProvider>. Wrap your application (or layout) with <ThemeCustomizerProvider>."
    );
  }
  return ctx;
}
function loadConfig() {
  if (typeof window === "undefined") return import_presets.DEFAULT_THEME_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return import_presets.DEFAULT_THEME_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      style: import_presets.STYLE_PRESETS.some((s) => s.key === parsed.style) ? parsed.style : import_presets.DEFAULT_THEME_CONFIG.style,
      colorPreset: import_presets.COLOR_PRESET_KEYS.includes(parsed.colorPreset ?? "") ? parsed.colorPreset : import_presets.DEFAULT_THEME_CONFIG.colorPreset,
      radius: import_presets.RADIUS_PRESETS.some((r) => r.key === parsed.radius) ? parsed.radius : import_presets.DEFAULT_THEME_CONFIG.radius,
      font: import_presets.FONT_PRESETS.some((f) => f.key === parsed.font) ? parsed.font : import_presets.DEFAULT_THEME_CONFIG.font,
      shadow: import_presets.SHADOW_PRESETS.some((s) => s.key === parsed.shadow) ? parsed.shadow : import_presets.DEFAULT_THEME_CONFIG.shadow,
      surfaceStyle: import_presets.SURFACE_STYLE_PRESETS.some(
        (s) => s.key === parsed.surfaceStyle
      ) ? parsed.surfaceStyle : import_presets.DEFAULT_THEME_CONFIG.surfaceStyle,
      menuColor: import_presets.MENU_COLOR_PRESETS.some((p) => p.key === parsed.menuColor) ? parsed.menuColor : import_presets.DEFAULT_THEME_CONFIG.menuColor,
      menuAccent: import_presets.MENU_ACCENT_PRESETS.some((p) => p.key === parsed.menuAccent) ? parsed.menuAccent : import_presets.DEFAULT_THEME_CONFIG.menuAccent
    };
  } catch {
    return import_presets.DEFAULT_THEME_CONFIG;
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
  const lightVars = (0, import_presets.buildThemeOverrides)(config, "light");
  const darkVars = (0, import_presets.buildThemeOverrides)(config, "dark");
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
  const [config, setConfigState] = (0, import_react.useState)(
    () => defaultConfig ?? loadConfig()
  );
  const [_resolvedMode, setResolvedMode] = (0, import_react.useState)("light");
  const configRef = (0, import_react.useRef)(config);
  configRef.current = config;
  (0, import_react.useEffect)(() => {
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
  (0, import_react.useEffect)(() => {
    if (applyStyles) {
      injectStyles(config);
    }
  }, [config, applyStyles]);
  (0, import_react.useEffect)(() => {
    saveConfig(config);
  }, [config]);
  (0, import_react.useEffect)(() => {
    return () => {
      if (applyStyles) {
        removeStyles();
      }
    };
  }, [applyStyles]);
  (0, import_react.useEffect)(() => {
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
  const setConfig = (0, import_react.useCallback)((newConfig) => {
    setConfigState(newConfig);
  }, []);
  const setStyle = (0, import_react.useCallback)((key) => {
    const preset = (0, import_presets.getStylePreset)(key);
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
  const setColorPreset = (0, import_react.useCallback)((key) => {
    setConfigState((prev) => {
      if (prev.colorPreset === key) return prev;
      return { ...prev, colorPreset: key };
    });
  }, []);
  const setRadius = (0, import_react.useCallback)((key) => {
    setConfigState((prev) => {
      if (prev.radius === key) return prev;
      return { ...prev, radius: key };
    });
  }, []);
  const setFont = (0, import_react.useCallback)((key) => {
    setConfigState((prev) => {
      if (prev.font === key) return prev;
      return { ...prev, font: key };
    });
  }, []);
  const setShadow = (0, import_react.useCallback)((key) => {
    setConfigState((prev) => {
      if (prev.shadow === key) return prev;
      return { ...prev, shadow: key };
    });
  }, []);
  const setSurfaceStyle = (0, import_react.useCallback)((key) => {
    setConfigState((prev) => {
      if (prev.surfaceStyle === key) return prev;
      return { ...prev, surfaceStyle: key };
    });
  }, []);
  const setMenuColor = (0, import_react.useCallback)((key) => {
    setConfigState((prev) => {
      if (prev.menuColor === key) return prev;
      return { ...prev, menuColor: key };
    });
  }, []);
  const setMenuAccent = (0, import_react.useCallback)((key) => {
    setConfigState((prev) => {
      if (prev.menuAccent === key) return prev;
      return { ...prev, menuAccent: key };
    });
  }, []);
  const resetConfig = (0, import_react.useCallback)(() => {
    setConfigState(import_presets.DEFAULT_THEME_CONFIG);
  }, []);
  const isDefault = configsEqual(config, import_presets.DEFAULT_THEME_CONFIG);
  const generateCSSFn = (0, import_react.useCallback)(() => {
    return (0, import_presets.generateThemeCSS)(config);
  }, [config]);
  const value = (0, import_react.useMemo)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeCustomizerContext.Provider, { value, children });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ThemeCustomizerContext,
  ThemeCustomizerProvider,
  useThemeCustomizer
});
