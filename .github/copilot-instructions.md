# Copilot Instructions for unified-ui

This repo is an **npm workspace monorepo** containing two packages:

1. **`packages/unified-ui/`** — The standalone `@work-rjkashyap/unified-ui` design system package (publishable to npm).
2. **Root (`./`)** — A Next.js 16 documentation portal built with Fumadocs that consumes the design system.

## Architecture & Tech Stack

- **Framework**: Next.js App Router (16.1.1).
- **Design System**: `@work-rjkashyap/unified-ui` — standalone package at `packages/unified-ui/`.
- **Documentation**: [Fumadocs](https://fumadocs.dev/) (headless core + UI components).
- **Styling**: Tailwind CSS v4 with `tailwind-merge` (`cn` utility in `packages/unified-ui/src/utils/cn.ts`).
- **Icons**: Lucide React.
- **Formatting/Linting**: Biome. Avoid adding Prettier or ESLint.
- **Workspaces**: npm workspaces (`packages/*`).

## Monorepo Structure

```
unified-ui/
├── packages/
│   └── unified-ui/              ← @work-rjkashyap/unified-ui (standalone, publishable)
│       ├── src/
│       │   ├── tokens/          ← Layer 1: Design tokens
│       │   ├── theme/           ← Layer 2: Theme system (CSS vars + provider)
│       │   ├── primitives/      ← Layer 3: Typography, Layout, Divider
│       │   ├── components/      ← Layer 4: 22+ composite components
│       │   ├── motion/          ← Layer 5: Framer Motion presets
│       │   ├── utils/           ← Layer 6: cn, mergeSlots, contrast, focus-ring
│       │   └── index.ts         ← Barrel entry point
│       ├── styles.css           ← Tailwind @theme + CSS custom properties
│       ├── package.json         ← @work-rjkashyap/unified-ui package manifest
│       ├── tsconfig.json        ← Standalone TS config with @unified-ui/* paths
│       └── tsup.config.ts       ← Build config (ESM + CJS + .d.ts)
├── src/
│   ├── app/                     ← Next.js docs app
│   ├── components/              ← Docs-specific components
│   └── lib/                     ← Docs app utilities
├── content/                     ← MDX documentation content
├── package.json                 ← Root workspace config
└── tsconfig.json                ← Root TS config (extends path aliases)
```

## Design System Package (`packages/unified-ui/`)

The canonical source of truth for all design system code lives in `packages/unified-ui/src/`.

### Layer Hierarchy (strict — no upward imports)

```
Tokens → Theme → Primitives → Components
                                  ↑
                               Motion
                               Utils (shared across all layers)
```

### Internal Import Pattern

Inside the design system package, use `@unified-ui/*` path aliases:

```tsx
import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import type { FontFamilyKey } from "@unified-ui/tokens/typography";
```

These resolve via the package's own `tsconfig.json` paths.

### External Import Patterns (consumers)

```tsx
// Barrel import
import { Button, Heading, fadeIn, cn } from "@work-rjkashyap/unified-ui";

// Layer-specific imports (better tree-shaking)
import { spacing, radius } from "@work-rjkashyap/unified-ui/tokens";
import { DSThemeProvider } from "@work-rjkashyap/unified-ui/theme";
import { Button } from "@work-rjkashyap/unified-ui/components";
import { slideUp } from "@work-rjkashyap/unified-ui/motion";
import { cn } from "@work-rjkashyap/unified-ui/utils";
```

### Build & Scripts

- `npm run build:ds` — Build the standalone package (`tsup` → `packages/unified-ui/dist/`).
- `npm run dev:ds` — Watch mode for the standalone package.
- Build produces ESM (`.mjs`), CJS (`.cjs`), and TypeScript declarations (`.d.ts`/`.d.cts`).
- Client entry points (`index`, `theme`, `primitives`, `components`, `motion`) get `"use client"` patched in.
- `tokens` and `utils` are pure JS — no React, no directive.

### CSS Variable Prefix

All CSS custom properties use plain `--` prefix with **no namespace infix** (e.g. `--primary`, `--radius-md`, `--shadow-lg`, `--z-modal`, `--duration-fast`, `--easing-standard`, `--font-sans`).

All color values use **oklch()** (e.g. `oklch(0.205 0 0)`).

Tailwind utility classes map directly: `bg-primary`, `text-foreground`, `border-border`, `rounded-md`, `shadow-lg`, `duration-fast`, `ease-standard`, `z-modal`, `font-sans`.

### Adding a New Component

1. Create `packages/unified-ui/src/components/<name>.tsx`
2. Use CVA for variant composition (if the component has variants)
3. Use `cn()` for all class merging
4. Forward refs with `React.forwardRef`
5. Add `data-ds`, `data-ds-component`, and relevant `data-ds-*` state attributes
6. Export from `packages/unified-ui/src/components/index.ts`
7. Re-export from `packages/unified-ui/src/index.ts`
8. Write documentation in `content/docs/design-system/components/<name>.mdx`

## Docs App (Root)

### Core Conventions

- **Component Patterns**:
    - Shared layout logic resides in `src/components/layout/`.
    - UI primitives are in `src/components/ui/` (Radix UI based).
    - Custom MDX components are registered in `src/mdx-components.tsx`.
    - Design system components: import from `@work-rjkashyap/unified-ui` (or layer-specific like `@work-rjkashyap/unified-ui/components`).
- **Data Fetching**: Use the `source` loader from `src/lib/source.ts` to access MDX content.
    - Example: `const page = source.getPage(params.slug);`
- **Tailwind Classes**: Always use the `cn()` utility for merging classes.
- **Type Safety**: Use the generated types for MDX content. If you modify MDX structure, run `npm run types:check`.

### Critical Workflows

- **MDX Management**:
    - Content is located in `content/docs/`.
    - Schema configuration is in `source.config.ts`.
    - Run `npm run types:check` to synchronize MDX collections and generate Next.js search manifests.
- **Code Quality**:
    - Run `npm run lint` (`biome check`) to verify code style.
    - Run `npm run format` (`biome format --write`) to fix formatting issues.

### Integration Points

- **Search**: Implemented in `src/app/api/search/route.ts` using Orama via Fumadocs.
- **Layouts**:
    - `src/app/docs/layout.tsx`: Uses `DocsLayout` from Fumadocs.
    - `src/components/layout/notebook/`: Contains a custom "notebook" style layout.
- **AI Context**: Special routes for LLM consumption:
    - `src/app/llms-full.txt/route.ts`: Aggregates all documentation into one text file.
    - `src/app/llms.mdx/docs/[[...slug]]/route.ts`: Provides a clean markdown version of a specific page for LLMs.
- **Open Graph**: Dynamic OG images are handled in `src/app/og/docs/[...slug]/route.tsx`.

## Design & Layout Principles

Optimize for visual density, clarity, and consistency. Avoid oversized marketing-style layouts.

### Layout & Spacing

- **Constraints**: Always use `max-w-7xl` (1280px) and `mx-auto` for content containers.
- **Padding**: Mobile `px-4`, Tablet `px-6`, Desktop `px-8`.
- **Vertical spacing**: Default `py-10`, Hero max `py-14`. Stack with `space-y-3/4/6`.
- **Grids**: Desktop max `grid-cols-3` (4 for small icons). Tablet `grid-cols-2`. Mobile `grid-cols-1`.
- **Ideal Card Width**: 280px - 360px. Avoid edge-to-edge cards.

### Typography & Visuals

- **Text**: Base `text-sm` or `text-base` only. Headings: H1 (`text-3xl`), H2 (`text-2xl`), H3 (`text-lg`).
- **Line Height**: `leading-5` or `leading-6`. Avoid loose line heights.
- **Style**: Prefer borders (`border-border`) over shadows. Use `rounded-md` (Dialogs/Sheets `rounded-lg`).
- **Utilities to Avoid**: `py-24+`, `space-y-10+`, `gap-12+`, `text-5xl+`, `leading-loose`.

### Component Defaults (Shadcn UI)

- **Controls**: Match height for Buttons, Inputs, and Selects (`h-9` or `h-10`).
- **Cards**: Default `p-4` or `p-6`. Avoid combining `p-6` with `space-y-6`.
- **Preference**: If a design choice is unclear, choose the more compact option.

## Key Files

- `packages/unified-ui/src/index.ts`: Design system barrel entry point.
- `packages/unified-ui/package.json`: Standalone package manifest with exports map.
- `packages/unified-ui/tsup.config.ts`: Build configuration for the design system.
- `packages/unified-ui/styles.css`: CSS custom properties + Tailwind `@theme` integration.

- `src/lib/source.ts`: Main entry point for content loading.
- `source.config.ts`: Defines MDX collections and schemas.
- `src/mdx-components.tsx`: MDX component mappings.
- `src/app/docs/[[...slug]]/page.tsx`: Main page component for documentation.
