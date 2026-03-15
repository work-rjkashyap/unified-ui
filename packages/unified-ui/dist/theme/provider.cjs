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
var provider_exports = {};
__export(provider_exports, {
  DSThemeProvider: () => DSThemeProvider,
  useDSTheme: () => useDSTheme
});
module.exports = __toCommonJS(provider_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react = require("react");
const DSThemeContext = (0, import_react.createContext)(null);
function useDSTheme() {
  const ctx = (0, import_react.useContext)(DSThemeContext);
  if (!ctx) {
    throw new Error(
      "useDSTheme must be used within a <DSThemeProvider>. Wrap your application (or layout) with <DSThemeProvider>."
    );
  }
  return ctx;
}
function getSystemPreference() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function resolveTheme(theme) {
  if (theme === "system") return getSystemPreference();
  return theme;
}
const STORAGE_KEY = "ds-theme-preference";
function getStoredTheme() {
  if (typeof window === "undefined") return "system";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
  }
  return "system";
}
function storeTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
  }
}
function DSThemeProvider({
  children,
  defaultTheme,
  manageHtmlClass = false
}) {
  const [theme, setThemeState] = (0, import_react.useState)(
    () => defaultTheme ?? getStoredTheme()
  );
  const [systemPreference, setSystemPreference] = (0, import_react.useState)("light");
  (0, import_react.useEffect)(() => {
    setSystemPreference(getSystemPreference());
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      setSystemPreference(e.matches ? "dark" : "light");
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  const resolvedTheme = (0, import_react.useMemo)(
    () => theme === "system" ? systemPreference : theme,
    [theme, systemPreference]
  );
  (0, import_react.useEffect)(() => {
    if (!manageHtmlClass) return;
    const root = document.documentElement;
    if (resolvedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [resolvedTheme, manageHtmlClass]);
  const setTheme = (0, import_react.useCallback)((newTheme) => {
    setThemeState(newTheme);
    storeTheme(newTheme);
  }, []);
  const toggleTheme = (0, import_react.useCallback)(() => {
    setThemeState((current) => {
      const resolved = resolveTheme(current);
      const next = resolved === "dark" ? "light" : "dark";
      storeTheme(next);
      return next;
    });
  }, []);
  const value = (0, import_react.useMemo)(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme
    }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DSThemeContext.Provider, { value, children });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DSThemeProvider,
  useDSTheme
});
