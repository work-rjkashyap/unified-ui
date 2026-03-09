# unified-ui — Next.js Template

A Next.js 16 (App Router) starter pre-wired with [`@work-rjkashyap/unified-ui`](https://unified-ui.space).

## What's included

- **Next.js 16** — App Router, React 19, TypeScript
- **@work-rjkashyap/unified-ui** — 75+ components, design tokens, theme provider, motion presets, and utilities
- **Tailwind CSS v4** — via `@tailwindcss/postcss`
- **lucide-react** — icon set used throughout the design system

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## How unified-ui is wired in

### 1. Styles — `app/globals.css`

```css
@import "@work-rjkashyap/unified-ui/styles.css";
@import "tailwindcss";

@source "../node_modules/@work-rjkashyap/unified-ui/dist";
```

The `@source` directive tells Tailwind v4 to scan the compiled unified-ui bundle so that all component utility classes are included in the generated CSS.

### 2. Theme provider — `app/layout.tsx`

```tsx
import { DSThemeProvider } from "@work-rjkashyap/unified-ui/theme";
import "./globals.css";

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="antialiased">
				<DSThemeProvider>{children}</DSThemeProvider>
			</body>
		</html>
	);
}
```

`DSThemeProvider` mounts the CSS custom property token system and handles light/dark mode switching. `suppressHydrationWarning` prevents React from warning when the theme class is applied on the client.

### 3. Importing components

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
app/
├── globals.css      ← unified-ui styles + Tailwind import
├── layout.tsx       ← DSThemeProvider + metadata
└── page.tsx         ← Component showcase demo
```

## Customising the theme

All design tokens are exposed as CSS custom properties. Override them in `globals.css` after the unified-ui import:

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
- [Next.js Docs](https://nextjs.org/docs)
