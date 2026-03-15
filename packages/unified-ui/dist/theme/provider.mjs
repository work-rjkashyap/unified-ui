"use client";
import { jsx } from "react/jsx-runtime";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
const DSThemeContext = createContext(null);
function useDSTheme() {
  const ctx = useContext(DSThemeContext);
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
  const [theme, setThemeState] = useState(
    () => defaultTheme ?? getStoredTheme()
  );
  const [systemPreference, setSystemPreference] = useState("light");
  useEffect(() => {
    setSystemPreference(getSystemPreference());
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      setSystemPreference(e.matches ? "dark" : "light");
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  const resolvedTheme = useMemo(
    () => theme === "system" ? systemPreference : theme,
    [theme, systemPreference]
  );
  useEffect(() => {
    if (!manageHtmlClass) return;
    const root = document.documentElement;
    if (resolvedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [resolvedTheme, manageHtmlClass]);
  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    storeTheme(newTheme);
  }, []);
  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const resolved = resolveTheme(current);
      const next = resolved === "dark" ? "light" : "dark";
      storeTheme(next);
      return next;
    });
  }, []);
  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme
    }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );
  return /* @__PURE__ */ jsx(DSThemeContext.Provider, { value, children });
}
export {
  DSThemeProvider,
  useDSTheme
};
