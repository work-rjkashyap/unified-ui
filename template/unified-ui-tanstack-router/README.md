# unified-ui — TanStack Router Template

A React 19 + Vite + TanStack Router starter pre-wired with [`@work-rjkashyap/unified-ui`](https://unified-ui.space).

## What's included

- **React 19** — with TypeScript
- **Vite 7** — with `@vitejs/plugin-react` for fast HMR
- **TanStack Router** — 100% type-safe, file-based routing with nested layouts, search params, and loaders
- **@work-rjkashyap/unified-ui** — 75+ components, design tokens, theme provider, motion presets, and utilities
- **Tailwind CSS v4** — via `@tailwindcss/vite` plugin (no PostCSS config needed)
- **lucide-react** — icon set used throughout the design system

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## How unified-ui is wired in

### 1. Vite plugin — `vite.config.ts`

```ts
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), tanstackRouter({ target: "react" }), viteReact()],
});
```

Tailwind CSS v4 is wired in via the official Vite plugin — no `postcss.config.js` required.

### 2. Styles — `src/styles.css`

```css
@import "@work-rjkashyap/unified-ui/styles.css";
@import "tailwindcss";

@source "../node_modules/@work-rjkashyap/unified-ui/dist";
```

The `@source` directive tells Tailwind v4 to scan the compiled unified-ui bundle so that all component utility classes are included in the generated CSS.

### 3. Theme provider — `src/routes/__root.tsx`

```tsx
import { DSThemeProvider } from "@work-rjkashyap/unified-ui/theme";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import "../styles.css";

export const Route = createRootRoute({ component: RootComponent });

function RootComponent() {
  return (
    <DSThemeProvider>
      <Outlet />
    </DSThemeProvider>
  );
}
```

`DSThemeProvider` mounts the CSS custom property token system and handles light/dark mode switching. Every route rendered by `<Outlet />` automatically inherits the full token system.

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
├── styles.css                  ← unified-ui styles + Tailwind import
├── main.tsx                    ← React root — RouterProvider
├── router.tsx                  ← createRouter + routeTree
├── routes/
│   ├── __root.tsx              ← Root layout — DSThemeProvider + devtools
│   ├── index.tsx               ← Home page — component showcase
│   └── about.tsx               ← About page — template overview
└── components/
    ├── Header.tsx              ← Sticky nav using unified-ui Button + ThemeToggle
    ├── Footer.tsx              ← Footer using unified-ui Badge
    └── ThemeToggle.tsx         ← Re-export of ThemeToggle from unified-ui
```

## Adding a new route

TanStack Router uses file-based routing. Create a new file in `src/routes/` and it will be automatically picked up:

```tsx
// src/routes/dashboard.tsx
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardBody } from "@work-rjkashyap/unified-ui";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

function Dashboard() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <Card>
        <CardBody className="p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </CardBody>
      </Card>
    </main>
  );
}
```

## Customising the theme

All design tokens are exposed as CSS custom properties. Override them in `src/styles.css` after the unified-ui import:

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

## Available scripts

| Script            | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start the dev server on port 3000   |
| `npm run build`   | Type-check and build for production |
| `npm run preview` | Preview the production build        |
| `npm run test`    | Run tests with Vitest               |

## Useful links

- [Unified UI Docs](https://unified-ui.space/docs)
- [Component Reference](https://unified-ui.space/components)
- [GitHub](https://github.com/imrj05/unified-ui)
- [TanStack Router Docs](https://tanstack.com/router/latest/docs/framework/react/overview)
- [Vite Docs](https://vite.dev)
- [TailwindCSS v4 Docs](https://tailwindcss.com/docs)
