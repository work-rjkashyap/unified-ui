# unified-ui — Vite + React Template

A React 19 + Vite starter pre-wired with [`@work-rjkashyap/unified-ui`](https://unified-ui.space).

## What's included

- **React 19** — with TypeScript
- **Vite 7** — with `@vitejs/plugin-react-swc` for fast HMR
- **@work-rjkashyap/unified-ui** — 75+ components, design tokens, theme provider, motion presets, and utilities
- **Tailwind CSS v4** — via `@tailwindcss/vite` plugin (no PostCSS config needed)
- **lucide-react** — icon set used throughout the design system

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the result.

## How unified-ui is wired in

### 1. Vite plugin — `vite.config.ts`

```ts
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
});
```

Tailwind CSS v4 is wired in via the official Vite plugin — no `postcss.config.js` required.

### 2. Styles — `src/index.css`

```css
@import "@work-rjkashyap/unified-ui/styles.css";
@import "tailwindcss";

@source "../node_modules/@work-rjkashyap/unified-ui/dist";
```

The `@source` directive tells Tailwind v4 to scan the compiled unified-ui bundle so that all component utility classes are included in the generated CSS.

### 3. Theme provider — `src/App.tsx`

```tsx
import { DSThemeProvider } from "@work-rjkashyap/unified-ui/theme";

export default function App() {
	return (
		<DSThemeProvider>
			<AppContent />
		</DSThemeProvider>
	);
}
```

`DSThemeProvider` mounts the CSS custom property token system and handles light/dark mode switching.

### 4. Importing components

```tsx
// Barrel import
import { Button, Badge, Card, Tabs } from "@work-rjkashyap/unified-ui";

// Layer-specific imports (better tree-shaking)
import { Button } from "@work-rjkashyap/unified-ui/components";
import { DSThemeProvider } from "@work-rjkashyap/unified-ui/theme";
import { fadeIn } from "@work-rjkashyap/unified-ui/motion";
import { cn } from "@work-rjkashyap/unified-ui/utils";
```

## Project structure

```
src/
├── index.css      ← unified-ui styles + Tailwind import
├── main.tsx       ← React root — mounts App
└── App.tsx        ← DSThemeProvider + component showcase demo
```

## Customising the theme

All design tokens are exposed as CSS custom properties. Override them in `src/index.css` after the unified-ui import:

```css
@import "@work-rjkashyap/unified-ui/styles.css";
@import "tailwindcss";

@source "../node_modules/@work-rjkashyap/unified-ui/dist";

/* Override tokens */
:root {
	--primary: oklch(0.55 0.2 260);
	--radius-md: 0.75rem;
}
```

## Useful links

- [Unified UI Docs](https://unified-ui.space/docs)
- [Component Reference](https://unified-ui.space/components)
- [GitHub](https://github.com/imrj05/unified-ui)
- [Vite Docs](https://vite.dev)
- [TailwindCSS v4 Docs](https://tailwindcss.com/docs)
