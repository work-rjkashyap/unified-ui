// Unified UI — Laravel Blade Starter
// Design tokens are loaded via CSS. This file handles theme toggling.

function initTheme() {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const theme = stored || (prefersDark ? "dark" : "light");
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Initialize on load
initTheme();

// Expose globally for Blade onclick handlers
window.toggleTheme = toggleTheme;
