<script setup lang="ts">
import { onMounted, ref } from "vue";

const theme = ref<"light" | "dark">("light");

onMounted(() => {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  theme.value =
    (stored as "light" | "dark") || (prefersDark ? "dark" : "light");
  applyTheme();
});

function _toggle() {
  theme.value = theme.value === "dark" ? "light" : "dark";
  applyTheme();
}

function applyTheme() {
  document.documentElement.classList.toggle("dark", theme.value === "dark");
  localStorage.setItem("theme", theme.value);
}
</script>

<template>
  <button
    class="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    @click="toggle"
  >
    Toggle {{ theme === "dark" ? "Light" : "Dark" }}
  </button>
</template>
