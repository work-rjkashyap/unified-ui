# Unified UI Monorepo — Starter Kit Overlays

This directory contains the overlay files that the Unified UI CLI applies on top
of freshly scaffolded framework projects.

## How it works

When a user runs `npx @work-rjkashyap/unified-ui init`, the CLI:

1. **Asks which framework** → vite-react, nextjs, vuejs, or laravel-blade
2. **Asks for a project name**
3. **Runs the official scaffolding tool** for that framework:
    - `vite-react` → `npm create vite@latest <name> -- --template react-ts`
    - `nextjs` → `npx create-next-app@latest <name> --ts --tailwind --app --src-dir --import-alias "@/*"`
    - `vuejs` → `npm create vue@latest <name>`
    - `laravel-blade` → `composer create-project laravel/laravel <name>`
4. **Installs `@work-rjkashyap/unified-ui`** and framework-specific dependencies
5. **Overlays files** — replaces/patches config, CSS, layouts, and demo pages

## Directory structure

```
starters/
├── README.md               ← This file
├── vite-react/             ← Overlay files for Vite + React
│   ├── vite.config.ts      ← Adds @tailwindcss/vite plugin
│   ├── src/
│   │   ├── index.css       ← Replaces default with unified-ui imports
│   │   ├── main.tsx        ← Wraps app with DSThemeProvider
│   │   └── App.tsx         ← Demo page with components
├── nextjs/                 ← Overlay files for Next.js
│   ├── src/app/
│   │   ├── globals.css     ← Replaces default with unified-ui imports
│   │   ├── layout.tsx      ← Adds ThemeProvider + DSThemeProvider
│   │   └── page.tsx        ← Demo page with components
├── vuejs/                  ← Overlay files for Vue.js
│   ├── vite.config.ts      ← Adds @tailwindcss/vite plugin
│   ├── src/
│   │   ├── style.css       ← Replaces default with unified-ui imports
│   │   ├── main.ts         ← Clean Vue entry
│   │   ├── lib/cn.ts       ← cn() utility (clsx + tailwind-merge)
│   │   ├── App.vue         ← Demo page with component showcase
│   │   └── components/
│   │       ├── ThemeToggle.vue
│   │       └── ui/         ← 10 Vue SFC components
│   │           ├── index.ts
│   │           ├── Button.vue
│   │           ├── Badge.vue
│   │           ├── Card.vue / CardHeader / CardBody / CardFooter
│   │           ├── Input.vue
│   │           ├── Alert.vue
│   │           ├── Heading.vue
│   │           └── Text.vue
└── laravel-blade/          ← Overlay files for Laravel
    ├── vite.config.js      ← Adds @tailwindcss/vite plugin
    ├── resources/
    │   ├── css/app.css     ← Adds unified-ui imports
    │   ├── js/app.js       ← Adds theme toggle
    │   └── views/
    │       ├── layouts/app.blade.php
    │       ├── welcome.blade.php
    │       └── components/ui/   ← 10 Blade anonymous components
    │           ├── button.blade.php
    │           ├── badge.blade.php
    │           ├── card.blade.php / card-header / card-body / card-footer
    │           ├── input.blade.php
    │           ├── alert.blade.php
    │           ├── heading.blade.php
    │           └── text.blade.php
```

## Notes

- **React starters** (vite-react, nextjs) get the full 75+ component library
- **Vue starter** gets 10 Vue SFC components (Button, Badge, Card, Input, Alert, Heading, Text, etc.)
- **Laravel starter** gets 10 Blade anonymous components (same set, `<x-ui.button>` syntax)
- All starters get the full CSS design tokens + Tailwind theme
- The overlay content is embedded in `packages/unified-ui/bin/cli.mjs` for runtime use
- This directory serves as the canonical source for overlay files during development
