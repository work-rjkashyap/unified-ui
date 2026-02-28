# Unified UI

> A token-driven React design system and interactive documentation portal — built with Next.js 16, Tailwind CSS v4, Radix UI, and Framer Motion.

[![npm version](https://img.shields.io/npm/v/@work-rjkashyap/unified-ui)](https://www.npmjs.com/package/@work-rjkashyap/unified-ui)
[![npm downloads](https://img.shields.io/npm/dm/@work-rjkashyap/unified-ui)](https://www.npmjs.com/package/@work-rjkashyap/unified-ui)
[![license](https://img.shields.io/npm/l/@work-rjkashyap/unified-ui)](./packages/unified-ui/LICENSE)

---

## Overview

This is an **npm workspace monorepo** containing two packages:

| Package                          | Path                   | Description                                                                                                           |
| -------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **`@work-rjkashyap/unified-ui`** | `packages/unified-ui/` | Standalone, publishable design system with 23+ components, design tokens, theme system, motion presets, and utilities |
| **Docs App**                     | `./` (root)            | Next.js 16 documentation portal built with [Fumadocs](https://fumadocs.dev/) that consumes the design system          |

---

## Features

- **Token-driven design** — Colors, spacing, radius, shadows, typography, and motion all flow from a single source of truth
- **23+ production-ready components** — Built on Radix UI primitives with full accessibility support
- **Tailwind CSS v4** — First-class integration via `@theme` and `ds-*` utility classes
- **Framer Motion** — Consistent animation presets with `prefers-reduced-motion` support
- **Dark mode** — CSS variable–based theming with automatic `.dark` class support
- **Tree-shakeable** — 7 independent entry points with ESM/CJS dual output and code splitting
- **Type-safe** — Full TypeScript coverage with exported types for every prop, variant, and token
- **Interactive docs** — Live component previews, search (Orama), OG image generation, and LLM-friendly routes

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 20.0.0
- **npm** ≥ 9 (ships with Node 20+)

### Installation

```bash
git clone https://github.com/imrj05/unified-ui.git
cd unified-ui
npm install
```

### Development

```bash
# Start the docs app (Next.js dev server)
npm run dev

# Start the design system in watch mode (in a separate terminal)
npm run dev:ds
```

Open [http://localhost:3000](http://localhost:3000) to view the documentation portal.

### Build

```bash
# Build the design system package
npm run build:ds

# Build the docs app
npm run build

# Pack the design system for local testing
npm run pack:ds
```

---

## Project Structure

```
unified-ui/
├── packages/
│   └── unified-ui/                  ← @work-rjkashyap/unified-ui (standalone, publishable)
│       ├── src/
│       │   ├── tokens/              ← Layer 1: Design tokens (colors, spacing, typography, etc.)
│       │   ├── theme/               ← Layer 2: Theme system (CSS vars + provider)
│       │   ├── primitives/          ← Layer 3: Typography, Layout, Divider
│       │   ├── components/          ← Layer 4: 23 composite components
│       │   ├── motion/              ← Layer 5: Framer Motion presets & hooks
│       │   └── utils/               ← Layer 6: cn, mergeSlots, contrast, focus-ring
│       ├── styles.css               ← Tailwind @theme + CSS custom properties
│       ├── package.json
│       ├── tsup.config.ts           ← Build config (ESM + CJS + .d.ts)
│       ├── CHANGELOG.md
│       └── README.md
├── src/
│   ├── app/                         ← Next.js App Router pages
│   │   ├── (home)/                  ← Landing page
│   │   ├── docs/                    ← Documentation layout & pages
│   │   ├── components/              ← Component showcase pages
│   │   ├── showcase/                ← Showcase section
│   │   ├── api/search/              ← Orama search route handler
│   │   ├── og/                      ← Dynamic OG image generation
│   │   ├── llms-full.txt/           ← Full docs aggregated for LLMs
│   │   └── llms.mdx/                ← Per-page markdown for LLMs
│   ├── components/                  ← Docs-specific components
│   │   ├── home/                    ← Landing page components
│   │   ├── layout/                  ← Layout components (notebook, etc.)
│   │   ├── ui/                      ← Radix-based UI primitives for docs
│   │   ├── ai/                      ← AI-related components
│   │   └── toc/                     ← Table of contents components
│   ├── lib/                         ← Docs app utilities & source loader
│   └── mdx-components.tsx           ← MDX component mappings
├── content/
│   ├── docs/                        ← MDX documentation content
│   │   └── design-system/           ← Design system docs (tokens, theming, etc.)
│   ├── components/                  ← Component documentation
│   ├── resources/                   ← Resource pages
│   ├── company/                     ← Company pages
│   └── legal/                       ← Legal pages
├── source.config.ts                 ← Fumadocs MDX collection schemas
├── package.json                     ← Root workspace config
├── biome.json                       ← Biome linter/formatter config
├── tsconfig.json                    ← Root TypeScript config
└── next.config.mjs                  ← Next.js configuration
```

---

## Design System Architecture

The design system follows a strict layered architecture — each layer only depends on layers below it.

```
┌─────────────────────────────────────────────────┐
│  Layer 6: Utilities         cn, mergeSlots, etc. │
│  Layer 5: Motion            Framer Motion presets │
│  Layer 4: Components        23 composite widgets  │
│  Layer 3: Primitives        Typography, Layout    │
│  Layer 2: Theme             CSS vars + provider   │
│  Layer 1: Tokens            Colors, spacing, etc. │
└─────────────────────────────────────────────────┘
```

### Components (23)

|            |              |                 |
| ---------- | ------------ | --------------- |
| Accordion  | Dialog       | Select          |
| Alert      | DropdownMenu | Sheet           |
| Avatar     | Input        | Skeleton        |
| Badge      | Pagination   | Switch          |
| Breadcrumb | Popover      | Table           |
| Button     | Radio        | Tabs            |
| Card       | Checkbox     | Textarea        |
| DataTable  |              | Toast / Tooltip |

### Entry Points

The package provides 7 independently importable entry points for optimal tree-shaking:

```tsx
// Barrel import (everything)
import { Button, Heading, fadeIn, cn } from "@work-rjkashyap/unified-ui";

// Layer-specific imports (better tree-shaking)
import { spacing, radius } from "@work-rjkashyap/unified-ui/tokens";
import { DSThemeProvider } from "@work-rjkashyap/unified-ui/theme";
import { Typography, Heading } from "@work-rjkashyap/unified-ui/primitives";
import { Button, DataTable } from "@work-rjkashyap/unified-ui/components";
import { slideUp, motionProps } from "@work-rjkashyap/unified-ui/motion";
import { cn, mergeSlots } from "@work-rjkashyap/unified-ui/utils";

// CSS (must be imported after tailwindcss)
import "@work-rjkashyap/unified-ui/styles.css";
```

> For full usage instructions, see the [design system README](./packages/unified-ui/README.md).

---

## Scripts

### Root (Docs App + Workspace)

| Script                | Command                                        | Description                       |
| --------------------- | ---------------------------------------------- | --------------------------------- |
| `npm run dev`         | `next dev`                                     | Start the docs app dev server     |
| `npm run build`       | `next build`                                   | Build the docs app for production |
| `npm run start`       | `next start`                                   | Start the production docs server  |
| `npm run build:ds`    | `tsup` (workspace)                             | Build the design system package   |
| `npm run dev:ds`      | `tsup --watch` (workspace)                     | Watch mode for the design system  |
| `npm run pack:ds`     | build + `npm pack`                             | Create a `.tgz` for local testing |
| `npm run types:check` | `fumadocs-mdx && next typegen && tsc --noEmit` | Type-check everything             |
| `npm run lint`        | `biome check`                                  | Lint with Biome                   |
| `npm run format`      | `biome format --write`                         | Auto-format with Biome            |

### Design System (`packages/unified-ui/`)

| Script              | Command        | Description                    |
| ------------------- | -------------- | ------------------------------ |
| `npm run build`     | `tsup`         | Build ESM + CJS + declarations |
| `npm run dev`       | `tsup --watch` | Watch mode                     |
| `npm run clean`     | `rm -rf dist`  | Remove build artifacts         |
| `npm run typecheck` | `tsc --noEmit` | Type-check the package         |

---

## CSS Variable Prefix

All design system CSS custom properties use the `--ds-` prefix to avoid collisions:

```
--ds-color-primary
--ds-radius-md
--ds-shadow-lg
--ds-duration-normal
--ds-easing-standard
--ds-font-sans
```

After importing the styles, use `ds-*` prefixed Tailwind utilities:

```html
<div
	class="bg-ds-primary text-ds-primary-foreground rounded-ds-md shadow-ds-lg"
>
	Styled with design tokens
</div>
```

---

## Key Files

| File                                 | Purpose                                      |
| ------------------------------------ | -------------------------------------------- |
| `packages/unified-ui/src/index.ts`   | Design system barrel entry point             |
| `packages/unified-ui/styles.css`     | CSS custom properties + Tailwind `@theme`    |
| `packages/unified-ui/tsup.config.ts` | Build configuration                          |
| `packages/unified-ui/package.json`   | Standalone package manifest with exports map |
| `src/lib/source.ts`                  | Content source loader for Fumadocs           |
| `source.config.ts`                   | MDX collection & schema configuration        |
| `src/mdx-components.tsx`             | MDX component mappings                       |
| `src/app/docs/[[...slug]]/page.tsx`  | Main documentation page component            |
| `src/app/api/search/route.ts`        | Orama search route handler                   |

---

## Tech Stack

| Category           | Technology                                         |
| ------------------ | -------------------------------------------------- |
| Framework          | [Next.js 16](https://nextjs.org/) (App Router)     |
| Design System      | `@work-rjkashyap/unified-ui`                       |
| Documentation      | [Fumadocs](https://fumadocs.dev/)                  |
| Styling            | [Tailwind CSS v4](https://tailwindcss.com/)        |
| UI Primitives      | [Radix UI](https://www.radix-ui.com/)              |
| Animation          | [Framer Motion](https://www.framer.com/motion/)    |
| Data Tables        | [TanStack Table](https://tanstack.com/table/)      |
| Icons              | [Lucide React](https://lucide.dev/)                |
| Linting/Formatting | [Biome](https://biomejs.dev/)                      |
| Build (DS)         | [tsup](https://tsup.egoist.dev/)                   |
| Language           | [TypeScript 5.9+](https://www.typescriptlang.org/) |

---

## Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository and clone your fork
2. **Install** dependencies: `npm install`
3. **Create** a feature branch: `git checkout -b feat/my-feature`
4. **Develop** — run `npm run dev` and `npm run dev:ds` side by side
5. **Lint** your changes: `npm run lint`
6. **Type-check**: `npm run types:check`
7. **Submit** a pull request

### Adding a New Component

1. Create `packages/unified-ui/src/components/<name>.tsx`
2. Use CVA for variant composition (if the component has variants)
3. Use `cn()` for all class merging
4. Forward refs with `React.forwardRef`
5. Add `data-ds`, `data-ds-component`, and relevant `data-ds-*` state attributes
6. Export from `packages/unified-ui/src/components/index.ts`
7. Re-export from `packages/unified-ui/src/index.ts`
8. Write documentation in `content/docs/design-system/components/<name>.mdx`

### Code Style

- **Biome** is used for both linting and formatting — do not add Prettier or ESLint
- Run `npm run format` before committing
- Use the `cn()` utility for all Tailwind class merging — never concatenate class strings manually

---

## License

MIT © [Rajeshwar Kashyap](https://github.com/imrj05)
