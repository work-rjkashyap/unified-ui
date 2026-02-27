# Unified UI — Design System Implementation Plan

> **Project**: Unified UI Design System
> **Stack**: React 19 · Next.js 16 · TypeScript · Tailwind CSS v4 · Framer Motion · Fumadocs
> **Status**: Foundation built, expanding to full system

---

## Table of Contents

- [Current State](#current-state)
- [Phase 1 — Fix Foundations](#phase-1--fix-foundations)
- [Phase 2 — Typography System Overhaul](#phase-2--typography-system-overhaul)
- [Phase 3 — Absolute Path Aliases](#phase-3--absolute-path-aliases)
- [Phase 4 — Package as Library](#phase-4--package-as-library)
- [Phase 5 — Component Buildout](#phase-5--component-buildout)
- [Phase 6 — Documentation Site Overhaul](#phase-6--documentation-site-overhaul)
- [Phase 7 — Motion & Accessibility Hardening](#phase-7--motion--accessibility-hardening)
- [Phase 8 — Versioning & Changelog](#phase-8--versioning--changelog)
- [Phase 9 — Migration Strategy](#phase-9--migration-strategy)
- [Component Development Order](#component-development-order)

---

## Current State

### What exists (built)

| Layer                | Path                                  | Status                                                                                                                                                                                                                                        |
| -------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Design Tokens        | `packages/unified-ui/src/tokens/`     | ✅ colors, spacing, typography (multi-font), radius, shadows, z-index, motion                                                                                                                                                                 |
| Theme System         | `packages/unified-ui/src/theme/`      | ✅ CSS contract, provider, light/dark, font family contract                                                                                                                                                                                   |
| Tailwind Integration | `packages/unified-ui/styles.css`      | ✅ @theme block, CSS vars, font vars (next/font refs)                                                                                                                                                                                         |
| Primitives           | `packages/unified-ui/src/primitives/` | ✅ Typography (with `font` prop), Container, Stack, Grid, Divider                                                                                                                                                                             |
| Components           | `packages/unified-ui/src/components/` | ✅ 23 components (Button, Input, Textarea, Select, Checkbox, Radio, Switch, Card, Badge, Avatar, Tooltip, Popover, DropdownMenu, Dialog, Sheet, Tabs, Accordion, Alert, Skeleton, Toast, Table, Pagination, Breadcrumb — all barrel-exported) |
| Motion System        | `packages/unified-ui/src/motion/`     | ✅ presets (fadeIn, slideUp, scaleIn, modal, toast, stagger)                                                                                                                                                                                  |
| Utilities            | `packages/unified-ui/src/utils/`      | ✅ cn, mergeSlots, composeRefs, polymorphic types, focusRingClasses (6 variants)                                                                                                                                                              |
| Barrel Export        | `packages/unified-ui/src/index.ts`    | ✅ single entry point (all 23 components + primitives + tokens)                                                                                                                                                                               |
| Path Aliases         | `packages/unified-ui/tsconfig.json`   | ✅ `@unified-ui/*` → `src/*`, zero relative cross-dir imports                                                                                                                                                                                 |
| Packaging            | `packages/unified-ui/package.json`    | ✅ npm workspace package, tsup build, ESM+CJS+DTS, conditional exports, `npm pack` verified                                                                                                                                                   |
| Build                | `packages/unified-ui/tsup.config.ts`  | ✅ 7 entry points, `"use client"` patching, Radix externals                                                                                                                                                                                   |
| Fonts                | `src/app/layout.tsx`                  | ✅ Outfit, Inter, Lora, JetBrains Mono loaded via next/font                                                                                                                                                                                   |
| Component Docs       | `content/components/`                 | ✅ 22 component MDX pages + index + meta.json at `/components` route                                                                                                                                                                          |
| Design System Docs   | `content/docs/design-system/`         | ✅ 9 pages: overview, tokens, colors, typography, spacing, theming, motion, accessibility                                                                                                                                                     |

### What needs work

- [x] ~~Typography locked to single font (Outfit)~~ — multi-font architecture complete (Phase 2)
- [x] ~~Internal imports use relative paths (`../utils/cn`)~~ — `@unified-ui/` alias in place (Phase 3)
- [x] ~~Not fully packageable~~ — restructured to `packages/unified-ui/`, npm workspace, `npm pack` verified (Phase 4)
- [x] ~~Documentation pages don't reference the new design system at all~~ — 9 core docs + 22 component docs written (Phase 6)
- [x] ~~4 remaining P1/P2 components: Toast, Table, Pagination, Breadcrumb~~ — all built and barrel-exported
- [x] ~~No `"unified-ui"` branding in code or exports~~ — `UNIFIED_UI_VERSION`, README, JSDoc headers done
- [ ] Existing `src/components/ui/button.tsx` still uses old fd-\* tokens (migration not started)
- [x] ~~No CHANGELOG.md yet~~ — `packages/unified-ui/CHANGELOG.md` created
- [x] ~~No design system documentation pages (Phase 6)~~ — complete (6.1 + 6.2 + 6.3 done)
- [ ] ComponentPreview infrastructure not built (Phase 6.4)
- [ ] PropsTable auto-generation not built (Phase 6.5)
- [ ] No GitHub Actions for auto-publish on tag
- [ ] No contrast compliance audit run yet (Phase 7.5)

---

## Phase 1 — Fix Foundations ✅ DONE

> Naming, branding, cleanup. Get the house in order before building more rooms.

### 1.1 — Brand the Design System ✅

- [x] Rename all top-level JSDoc headers from "Design System" to "Unified UI"
- [x] Update `src/design-system/index.ts` header comment
- [x] Add `UNIFIED_UI_VERSION` constant to `src/design-system/index.ts`
    ```ts
    export const UNIFIED_UI_VERSION = "0.1.0";
    ```
- [x] Create `src/design-system/README.md` with quick-start for contributors

### 1.2 — Clean Up CSS Variable Prefix ✅

Current: `--ds-*`
Decision: **keep `--ds-`** (documented — concise, unambiguous, already consistent across all layers)

- [x] **Decision**: document the chosen prefix in `src/design-system/theme/contract.ts`
- [x] Decision rationale documented in `contract.ts` PREFIX constant JSDoc and `README.md`
- N/A — no rename needed; `--ds-` is the permanent prefix

### 1.3 — Remove Dead Code ✅

- [x] Audit `src/design-system/utils/index.ts` — it re-exports `dsStateAttr` twice under different names
- [x] Audit `src/design-system/utils/types.ts` — `dsDataAttrs` and `dsStateAttr` duplicate the same functions in `cn.ts`
- [x] Consolidate: keep one copy of each utility, remove duplicates
    - Removed `dsStateAttr as dsStateAttribute` alias re-export
    - Removed duplicate `PolymorphicProps`, `PolymorphicPropsWithRef`, `PolymorphicRef` re-exports (aliased as `PolymorphicComponent*` variants) — canonical versions live in `./cn`
    - `dsDataAttrs` from `./types` kept as it has a different signature (returns `boolean` values vs `string`)

---

## Phase 2 — Typography System Overhaul ✅ DONE

> Support multiple font families with a `font` prop on Typography. Allow consumers to register custom fonts.

### 2.1 — Expand Font Family Tokens ✅

**File**: `packages/unified-ui/src/tokens/typography.ts`

- [x] Add `display`, `serif`, and `inherit` font family slots:
    ```ts
    export const fontFamily = {
    	/** Headings and hero text — Inter by default */
    	display: "var(--ds-font-display)",
    	/** Body text — Outfit by default */
    	sans: "var(--ds-font-sans)",
    	/** Editorial / accent text — Lora by default */
    	serif: "var(--ds-font-serif)",
    	/** Code blocks and inline code — JetBrains Mono by default */
    	mono: "var(--ds-font-mono)",
    	/** Inherit from parent — useful for mixed contexts */
    	inherit: "var(--ds-font-inherit)",
    } as const;
    ```

### 2.2 — Update CSS Custom Properties ✅

**File**: `packages/unified-ui/styles.css`

- [x] Add CSS custom properties for all font families:
    ```css
    :root {
    	--ds-font-display:
    		var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont,
    		"Segoe UI", Roboto, sans-serif;
    	--ds-font-sans:
    		var(--font-outfit), system-ui, -apple-system, BlinkMacSystemFont,
    		"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    	--ds-font-serif: var(--font-lora), Georgia, "Times New Roman", serif;
    	--ds-font-mono:
    		var(--font-jetbrains), "Fira Code", "SF Mono", "Cascadia Code",
    		Consolas, "Liberation Mono", Menlo, monospace;
    	--ds-font-inherit: inherit;
    }
    ```
- [x] Add Tailwind `@theme` mapping for font families
- [x] No dark-mode overrides needed (fonts don't change with theme)

### 2.3 — Update Theme Contract ✅

**File**: `packages/unified-ui/src/theme/contract.ts`

- [x] Add `fontFamily` to the theme contract object
- [x] Update `buildLightThemeVars()` and `buildDarkThemeVars()` to include font family vars

### 2.4 — Add `font` Prop to Typography Component ✅

**File**: `packages/unified-ui/src/primitives/typography.tsx`

- [x] Add `font` prop to the base Typography component:
    ```ts
    type TypographyFont = "sans" | "display" | "serif" | "mono" | "inherit";
    ```
- [x] Map font names to Tailwind classes:
    ```ts
    const fontClassMap: Record<TypographyFont, string> = {
    	sans: "font-ds-sans",
    	display: "font-ds-display",
    	serif: "font-ds-serif",
    	mono: "font-ds-mono",
    	inherit: "font-ds-inherit",
    };
    ```
- [x] Apply font class in `cn()` call
- [x] Each preset component gets a default `font` (e.g., `Heading` → `display`, `Body` → `sans`)

### 2.5 — Load Multiple Google Fonts in Root Layout ✅

**File**: `src/app/layout.tsx`

- [x] Load 4 fonts using `next/font/google`:
    ```ts
    const outfit = nextFont({ subsets: ["latin"], variable: "--font-outfit" });
    const inter = nextFont({ subsets: ["latin"], variable: "--font-inter" });
    const lora = nextFont({ subsets: ["latin"], variable: "--font-lora" });
    const jetbrainsMono = nextFont({
    	subsets: ["latin"],
    	variable: "--font-jetbrains",
    });
    ```
- [x] Apply all 4 CSS variables to `<html>` tag
- [x] Verified: all 4 font variables inject correctly

### 2.6 — Typography Variant Presets Update ✅

- [x] Each typography preset carries a default font:
      | Preset | Default Font | Size | Weight | Line Height | Tracking |
      | ----------- | ------------ | -------- | -------- | ----------- | -------- |
      | `display1` | `display` | `4xl` | `bold` | `tight` | `tight` |
      | `display2` | `display` | `3xl` | `bold` | `tight` | `tight` |
      | `heading1` | `display` | `2xl` | `semibold` | `tight` | `tight` |
      | `heading2` | `display` | `xl` | `semibold` | `snug` | `normal` |
      | `heading3` | `display` | `lg` | `semibold` | `snug` | `normal` |
      | `body` | `sans` | `base` | `normal` | `relaxed` | `normal` |
      | `bodySm` | `sans` | `sm` | `normal` | `normal` | `normal` |
      | `caption` | `sans` | `xs` | `medium` | `tight` | `wide` |
      | `label` | `sans` | `sm` | `medium` | `none` | `normal` |
      | `code` | `mono` | `sm` | `normal` | `snug` | `normal` |

---

## Phase 3 — Absolute Path Aliases ✅ DONE

> Every file inside `packages/unified-ui/src/` should use `@unified-ui/` prefix instead of relative `../` paths.

### 3.1 — Add TSConfig Path Alias ✅

**File**: `packages/unified-ui/tsconfig.json`

- [x] Add `@unified-ui/*` path:
    ```json
    {
    	"compilerOptions": {
    		"paths": {
    			"@unified-ui/*": ["./src/*"]
    		}
    	}
    }
    ```

### 3.2 — Refactor All Internal Imports ✅

Every file under `packages/unified-ui/src/` that uses relative paths has been updated.

- [x] All component files use `@unified-ui/utils/cn`, `@unified-ui/utils/focus-ring`, etc.
- [x] All token imports use `@unified-ui/tokens/*`
- [x] All theme imports use `@unified-ui/theme/*`
- [x] Zero relative cross-directory imports remain

### 3.3 — Update External Consumer Imports ✅

Files outside `packages/unified-ui/` that consume the design system:

- [x] Docs app CSS import uses `@work-rjkashyap/unified-ui/styles.css` (package export path)
- [x] All MDX and app code imports use `@work-rjkashyap/unified-ui` or `@work-rjkashyap/unified-ui/components`

### 3.4 — Verify Build ✅

- [x] Run `npx tsc --noEmit` — zero errors
- [x] Run `npm run build` — full Next.js build passes
- [x] Run `npm run lint` — biome check passes
- [x] Run `npm run format` — all files formatted
- [x] Verified zero `../` cross-directory imports remain in `packages/unified-ui/src/`

---

## Phase 4 — Package as Library ✅ DONE

> Make the design system consumable as an npm package so external projects can `npm install @work-rjkashyap/unified-ui`.

### 4.1 — Create Standalone Package Structure ✅

- [x] ~~Monolith-first approach~~ — **Restructured** to `packages/unified-ui/` as a standalone npm workspace package.
- [x] Package name: `@work-rjkashyap/unified-ui` (v0.1.0)
- [x] npm workspace configured in root `package.json` (`"workspaces": ["packages/*"]`)
- [x] Workspace symlink in `node_modules/@work-rjkashyap/unified-ui` → `packages/unified-ui/`
- [x] Source code in `packages/unified-ui/src/` with 6 layers (tokens, theme, primitives, components, motion, utils)

### 4.2 — Add Build Pipeline for Library ✅

- [x] Install `tsup` as dev dependency — `tsup@^8.5.1`
- [x] Create `packages/unified-ui/tsup.config.ts` — single-pass build with all 7 entry points, ESM (`.mjs`) + CJS (`.cjs`), DTS (`.d.ts` / `.d.cts`), `outExtension` for correct file naming, expanded externals (react, react-dom, framer-motion, tailwindcss, cva, tailwind-merge, clsx, `@radix-ui/*`), and `onSuccess` hook for selective `"use client"` patching
- [x] Add build script to root `package.json` — `"build:ds": "npm run build --workspace=@work-rjkashyap/unified-ui"`
- [x] **Build verified** — `npm run build:ds` produces clean output with zero warnings, correct file extensions, `"use client"` only on client entry points (index, theme, primitives, components, motion), tokens/utils remain directive-free

### 4.3 — CSS Distribution Strategy ✅

- [x] Stylesheet exported via `@work-rjkashyap/unified-ui/styles.css` in `package.json` exports map
- [x] Document that consumers must import the CSS file
- [ ] Or provide a `UnifiedUIProvider` component that auto-injects styles (deferred — CSS import approach is simpler and more predictable)

### 4.4 — Create Consumer Quick-Start Documentation ✅

- [x] Package README.md with installation, setup, and usage instructions

### 4.5 — Publish Config ✅

- [x] `files` field in `package.json` — `["dist", "styles.css", "README.md", "CHANGELOG.md"]`
- [x] `exports` map with conditional ESM/CJS + types for all 7 entry points + `./styles.css`
- [x] `typesVersions` field for IDE support
- [x] Test local install with `npm pack` — verified tarball contents
- [x] Validate `@arethetypeswrong/cli` — all 7 entry points pass ✅ in node16 (CJS), node16 (ESM), and bundler resolution modes
- [x] Radix UI packages added as optional peer dependencies with `peerDependenciesMeta`
- [ ] Set up GitHub Actions for auto-publish on tag

#### Packaging Fixes Applied

1. **File extension mismatch** — original config produced `.js` (CJS) and `.mjs` (ESM) but `package.json` referenced `.js` for ESM and `.cjs` for CJS. Fixed with `outExtension` returning `.mjs`/`.cjs` explicitly.
2. **Missing `.d.cts` type declarations** — original config used `esbuildOptions` banner approach which only generated `.d.ts`. Fixed by switching to single-config build with proper `"type": "module"` in `package.json`.
3. **`"use client"` noise** — banner approach injected directive into all files (including tokens, utils, and shared chunks), causing rollup warnings. Replaced with `onSuccess` hook that patches only the 5 client entry points post-build.
4. **Radix externals missing** — Radix UI packages were being bundled into the output (inflating chunk sizes). Added `/^@radix-ui\//` regex to `external` and declared them as optional `peerDependencies`.
5. **Race condition with multi-config** — attempted split into two configs (client vs non-client) caused `clean: true` on first config to wipe second config's DTS output. Resolved by merging back to single config with post-build patching.

#### Monorepo Restructure Applied

- Moved design system source from `src/design-system/` to `packages/unified-ui/src/`
- Package identity: `@work-rjkashyap/unified-ui` at `packages/unified-ui/`
- npm workspace resolution: root `package.json` has `"workspaces": ["packages/*"]`
- Docs app consumes via workspace symlink (same as published package API)
- CSS import in docs app uses `@work-rjkashyap/unified-ui/styles.css` (package export)

---

## Phase 5 — Component Buildout ✅ DONE

> Build all core components in strict dependency order. Each component only uses tokens/primitives from the design system — zero hardcoded values.

### Development Order & Rationale

```
Form Inputs (Input, Textarea, Select, Checkbox, Radio, Switch)
  ↓ — Forms are the #1 use case for any design system
Data Display (Card, Badge, Avatar)
  ↓ — Content containers and indicators
Overlay (Tooltip, Popover, Dropdown, Dialog, Sheet)
  ↓ — These compose with form controls and data display
Navigation (Tabs, Accordion)
  ↓ — Layout-level navigation patterns
Feedback (Toast, Alert, Skeleton)
  ↓ — System-level notifications and loading states
Table + Pagination + Breadcrumb
  ↓ — Data-heavy patterns (need most of the above)
```

**All form controls are built first** because:

1. They establish the CVA pattern other components follow
2. They define the input/label/error visual language
3. They're the most-used components in any app

### 5.1 — Input Component ✅ DONE

- [x] `packages/unified-ui/src/components/input.tsx`
- [x] Variants: `default`, `error`, `success`
- [x] Sizes: `sm`, `md`, `lg`
- [x] Features: iconLeft, iconRight, clearable, prefix/suffix
- [x] ARIA: `aria-invalid` auto-set for error variant, `aria-describedby` support
- [x] Barrel exported

### 5.2 — Textarea Component ✅ DONE

- [x] `packages/unified-ui/src/components/textarea.tsx`
- [x] Variants: `default`, `error`, `success`
- [x] Features: auto-resize, character count, min/max rows
- [x] Barrel exported

### 5.3 — Select Component ✅ DONE

- [x] `packages/unified-ui/src/components/select.tsx`
- [x] Built on `@radix-ui/react-select`
- [x] Sub-components: SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator
- [x] Sizes: `sm`, `md`, `lg`
- [x] Features: placeholder, disabled items, groups with labels
- [x] Barrel exported

### 5.4 — Checkbox Component ✅ DONE

- [x] `packages/unified-ui/src/components/checkbox.tsx`
- [x] Built on `@radix-ui/react-checkbox`
- [x] Features: label, description, indeterminate state, CheckboxGroup
- [x] Sizes: `sm`, `md`
- [x] Barrel exported

### 5.5 — Radio Component ✅ DONE

- [x] `packages/unified-ui/src/components/radio.tsx`
- [x] Built on `@radix-ui/react-radio-group`
- [x] Sub-components: RadioGroup, RadioGroupItem, RadioCard
- [x] Features: label, description, card variant
- [x] Barrel exported

### 5.6 — Switch/Toggle Component ✅ DONE

- [x] `packages/unified-ui/src/components/switch.tsx`
- [x] Built on `@radix-ui/react-switch`
- [x] Sizes: `sm`, `md`
- [x] Features: label, description, labelPosition (left/right), spring animation via Framer Motion
- [x] Bug fixed: uncontrolled mode now properly tracks internal state for AnimatedThumb spring animation
- [x] Barrel exported

### 5.7 — Card Component ✅ DONE

- [x] `packages/unified-ui/src/components/card.tsx`
- [x] Variants: `default`, `outlined`, `elevated`, `interactive`
- [x] Sub-components: Card, CardHeader, CardBody, CardFooter
- [x] Features: clickable interactive variant with hover/focus states
- [x] Barrel exported

### 5.8 — Badge Component ✅ DONE

- [x] `packages/unified-ui/src/components/badge.tsx`
- [x] Variants: `default`, `primary`, `success`, `warning`, `danger`, `info`, `outline`
- [x] Sizes: `sm`, `md`
- [x] Features: dot indicator, removable, icon support
- [x] Barrel exported

### 5.9 — Avatar Component ✅ DONE

- [x] `packages/unified-ui/src/components/avatar.tsx`
- [x] Sizes: `xs`, `sm`, `md`, `lg`, `xl`
- [x] Shapes: `circle`, `square`
- [x] Features: image with load error fallback, initials fallback, default icon fallback, status indicator (online/busy/away/offline), AvatarGroup with overflow
- [x] Bug fixed: status dot no longer clipped by `overflow-hidden` — moved clipping to inner content wrapper
- [x] Barrel exported

### 5.10 — Tooltip Component ✅ DONE

- [x] `packages/unified-ui/src/components/tooltip.tsx`
- [x] Built on `@radix-ui/react-tooltip`
- [x] Features: configurable side, delay, arrow, Framer Motion entrance animation
- [x] Barrel exported

### 5.11 — Popover Component ✅ DONE

- [x] `packages/unified-ui/src/components/popover.tsx`
- [x] Built on `@radix-ui/react-popover`
- [x] Sub-components: Popover, PopoverTrigger, PopoverContent, PopoverClose, PopoverArrow
- [x] Features: arrow, close button, Framer Motion animation
- [x] Barrel exported

### 5.12 — Dropdown Menu Component ✅ DONE

- [x] `packages/unified-ui/src/components/dropdown-menu.tsx`
- [x] Built on `@radix-ui/react-dropdown-menu`
- [x] Sub-components: DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuRadioGroup, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuShortcut, DropdownMenuGroup
- [x] Features: keyboard navigation, submenus, checkbox/radio items
- [x] Barrel exported

### 5.13 — Dialog/Modal Component ✅ DONE

- [x] `packages/unified-ui/src/components/dialog.tsx`
- [x] Built on `@radix-ui/react-dialog`
- [x] Sub-components: Dialog, DialogTrigger, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogTitle, DialogDescription, DialogClose
- [x] Sizes: `sm`, `md`, `lg`, `xl`
- [x] Features: focus trap, scroll lock, Framer Motion entrance, overlay backdrop
- [x] Barrel exported

### 5.14 — Sheet/Drawer Component ✅ DONE

- [x] `packages/unified-ui/src/components/sheet.tsx`
- [x] Built on `@radix-ui/react-dialog`
- [x] Sub-components: Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetClose
- [x] Sides: `top`, `right`, `bottom`, `left`
- [x] Features: slide-in animation, overlay backdrop, focus trap
- [x] Barrel exported

### 5.15 — Tabs Component ✅ DONE

- [x] `packages/unified-ui/src/components/tabs.tsx`
- [x] Built on `@radix-ui/react-tabs`
- [x] Variants: `underline`, `pill`, `contained`
- [x] Features: animated active indicator via Framer Motion `layoutId`, vertical support
- [x] Barrel exported

### 5.16 — Accordion Component ✅ DONE

- [x] `packages/unified-ui/src/components/accordion.tsx`
- [x] Built on `@radix-ui/react-accordion`
- [x] Types: `single`, `multiple`
- [x] Features: animated expand/collapse, chevron rotation, single/multiple expand modes
- [x] Barrel exported

### 5.17 — Toast/Notification Component ✅ DONE

- [x] `packages/unified-ui/src/components/toast.tsx`
- [x] Custom implementation (no Radix dependency)
- [x] Variants: `default`, `success`, `warning`, `danger`, `info`
- [x] Positions: `top-right`, `top-left`, `bottom-right`, `bottom-left`, `top-center`
- [x] Features: auto-dismiss, action button, dismiss button, stacking, Framer Motion slide-in
- [x] Barrel exported

### 5.18 — Alert Component ✅ DONE

- [x] `packages/unified-ui/src/components/alert.tsx`
- [x] Variants: `info`, `success`, `warning`, `danger`
- [x] Features: auto icon per variant, dismissible, title + description
- [x] Barrel exported

### 5.19 — Skeleton Component ✅ DONE

- [x] `packages/unified-ui/src/components/skeleton.tsx`
- [x] Shapes: `text`, `circle`, `rect`
- [x] Features: configurable width/height, pulse animation, reduced motion support
- [x] Barrel exported

### 5.20 — Table Component ✅ DONE

- [x] `packages/unified-ui/src/components/table.tsx`
- [x] Sub-components: Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption
- [x] Features: striped rows, hover highlight, density options (compact/default/relaxed), sortable column headers, alignment
- [x] Barrel exported

### 5.21 — Pagination Component ✅ DONE

- [x] `packages/unified-ui/src/components/pagination.tsx`
- [x] Features: smart ellipsis, configurable siblings count, first/last page buttons, compact variant
- [x] Barrel exported

### 5.22 — Breadcrumb Component ✅ DONE

- [x] `packages/unified-ui/src/components/breadcrumb.tsx`
- [x] Sub-components: Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis, BreadcrumbNav
- [x] Features: composable API + declarative `BreadcrumbNav` shortcut, custom separators, `asChild` for framework links
- [x] Barrel exported

### 5.23 — Component Barrel Export Updates ✅ DONE (for all built components)

- [x] `packages/unified-ui/src/components/index.ts` — exports all 23 components
- [x] `packages/unified-ui/src/index.ts` — re-exports everything from components barrel

### 5.24 — Install Required Radix Packages ✅ DONE

- [x] All Radix packages installed as optional peer dependencies + dev dependencies:
    - `@radix-ui/react-accordion`, `@radix-ui/react-checkbox`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-popover`, `@radix-ui/react-radio-group`, `@radix-ui/react-select`, `@radix-ui/react-switch`, `@radix-ui/react-tabs`, `@radix-ui/react-tooltip`

---

## Phase 6 — Documentation Site Overhaul

> Replace the placeholder docs with comprehensive Unified UI design system documentation.

### 6.1 — Create Design System Docs Content Structure ✅ DONE

**Directory**: `content/docs/`

- [x] Create folder structure:

    ```
    content/docs/
      index.mdx                          ← Getting Started
      meta.json                          ← sidebar ordering
      design-system/
        meta.json
        index.mdx                        ← Design System overview
        tokens.mdx                       ← All tokens reference
        colors.mdx                       ← Color palette + semantic colors
        typography.mdx                   ← Typography scale + font families
        spacing.mdx                      ← 4px grid system
        theming.mdx                      ← Light/dark, CSS vars, provider
        motion.mdx                       ← Motion presets + Framer integration
        accessibility.mdx                ← Focus, ARIA, keyboard, contrast
    ```

- [x] Create `content/docs/meta.json`:

    ```json
    {
    	"title": "Documentation",
    	"pages": ["index", "---Design System---", "design-system"]
    }
    ```

- [x] Create `content/docs/design-system/meta.json`:
    ```json
    {
    	"title": "Design System",
    	"icon": "Palette",
    	"pages": [
    		"index",
    		"tokens",
    		"colors",
    		"typography",
    		"spacing",
    		"theming",
    		"motion",
    		"accessibility"
    	]
    }
    ```

### 6.2 — Write Core Documentation Pages ✅ DONE

#### Getting Started (`content/docs/index.mdx`) ✅

- [x] What is Unified UI
- [x] Installation instructions (npm/pnpm/yarn tabs, Steps component)
- [x] Quick start code example (theme provider, component usage)
- [x] Import patterns (barrel + layer-specific)
- [x] Link to design system docs
- [x] Link to components

#### Design System Overview (`content/docs/design-system/index.mdx`) ✅

- [x] 6-layer architecture diagram (ASCII art)
- [x] Layer rules and dependency direction
- [x] File structure explanation
- [x] Design principles (token-driven, accessible, composable, theme-aware)
- [x] CSS custom property prefix table
- [x] Data attribute reference table

#### Tokens (`content/docs/design-system/tokens.mdx`) ✅

- [x] All token categories table with CSS prefix and Tailwind prefix
- [x] Complete spacing scale with use cases
- [x] Typography tokens (families, sizes, weights, line heights, presets)
- [x] Radius, z-index, motion tokens
- [x] How tokens flow: TS → CSS vars → Tailwind utilities
- [x] Import patterns (TS, CSS, Tailwind)
- [x] Token naming conventions table

#### Colors (`content/docs/design-system/colors.mdx`) ✅

- [x] Live color palette grid with inline swatch previews (Brand, Neutral)
- [x] Additional palettes table (Slate, Gray, Blue, Green, Amber, Red, Teal)
- [x] Semantic color tables with Tailwind classes (Light/Dark tabs)
- [x] Backgrounds, Primary, Secondary, Status, Borders, Disabled sections
- [x] Contrast compliance section with design decisions
- [x] Built-in contrast checking utilities (checkHexContrast, auditContrast)
- [x] Usage patterns: backgrounds, status colors, opacity modifier, CSS vars

#### Typography (`content/docs/design-system/typography.mdx`) ✅

- [x] Font family table with CSS variables and Tailwind classes
- [x] Font loading setup with next/font/google
- [x] Font size scale, weight scale, line height scale, letter spacing scale
- [x] Typography presets table (10 presets)
- [x] Component API: `<Heading>`, `<Body>`, `<Caption>`, `<Label>`, `<Overline>`, `<Subheading>`, `<InlineCode>`, `<Typography>`
- [x] Props tables for all typography components
- [x] `font` prop demonstration with mixed typefaces
- [x] `truncate` and `lineClamp` demos
- [x] Color options table
- [x] Best practices (do's and don'ts)

#### Spacing (`content/docs/design-system/spacing.mdx`) ✅

- [x] Complete spacing scale table with rem values
- [x] 4px grid visual explanation
- [x] Tailwind utility usage
- [x] Stack component gap prop examples
- [x] CSS custom property usage
- [x] Responsive spacing guidelines (container padding, section spacing, content width)
- [x] Layout primitives: Container, Stack, Grid, Divider (with props tables)
- [x] Component internal spacing reference
- [x] Grid layout rules
- [x] Do's and don'ts
- [x] Quick reference with common patterns

#### Theming (`content/docs/design-system/theming.mdx`) ✅

- [x] CSS variable architecture (color vars, dark mode, non-color vars)
- [x] Tailwind @theme integration
- [x] DSThemeProvider setup with props table
- [x] useDSTheme() hook API with return value table
- [x] Theme contract (contract object, buildLightThemeVars, buildDarkThemeVars)
- [x] Complete theme toggle implementation example
- [x] Custom themes (CSS overrides + JavaScript runtime approaches)
- [x] Scoped theming (per-subtree overrides)
- [x] Usage without theme provider (static CSS, next-themes integration)
- [x] Full variable reference table (light + dark defaults)

#### Motion (`content/docs/design-system/motion.mdx`) ✅

- [x] Duration, easing, spring token tables
- [x] 30+ animation presets documented (fade, slide, scale, blur, pop, expand)
- [x] Overlay & modal presets (overlayBackdrop, modalContent, toast)
- [x] Micro-interaction presets (hoverLift, press, tapScale, pulse, spin)
- [x] Stagger container usage with variants API
- [x] motionProps() spread helper usage
- [x] Reduced motion: useReducedMotion, useMotion, useMotionProps, useMotionSpringConfig, withReducedMotion, reduceMotion, MotionSafe
- [x] Complete preset quick reference tables
- [x] Best practices (do's and don'ts)

#### Accessibility (`content/docs/design-system/accessibility.mdx`) ✅

- [x] WCAG 2.1 AA compliance targets
- [x] Focus ring system (6 variants with usage examples, array variants)
- [x] Keyboard navigation patterns per component category
- [x] ARIA attributes table per component
- [x] Error state accessibility pattern
- [x] Focus trap and scroll lock
- [x] Color contrast requirements with design decisions table
- [x] Built-in contrast checking (checkHexContrast, auditContrast, WCAG constants)
- [x] Reduced motion behavior per component
- [x] Semantic HTML reference table
- [x] Data attributes for testing
- [x] Accessibility checklist (interactive, forms, overlays, color, content, motion)
- [x] Tools & resources table

### 6.3 — Component Documentation ✅ DONE

**Directory**: `content/components/` (served at `/components` route)

- [x] Update `content/components/meta.json` with all DS components organized by category
- [x] Update `content/components/index.mdx` — catalog page with Cards linking to all components
- [x] Create MDX page for each component (22 pages total):
    - [x] `button.mdx` — references `@work-rjkashyap/unified-ui` Button
    - [x] `input.mdx`
    - [x] `textarea.mdx`
    - [x] `select.mdx`
    - [x] `checkbox.mdx`
    - [x] `radio.mdx`
    - [x] `switch.mdx`
    - [x] `card.mdx`
    - [x] `badge.mdx`
    - [x] `avatar.mdx`
    - [x] `tooltip.mdx`
    - [x] `popover.mdx`
    - [x] `dropdown-menu.mdx`
    - [x] `dialog.mdx`
    - [x] `sheet.mdx`
    - [x] `tabs.mdx`
    - [x] `accordion.mdx`
    - [x] `toast.mdx`
    - [x] `alert.mdx`
    - [x] `skeleton.mdx`
    - [x] `table.mdx`
    - [x] `pagination.mdx`
    - [x] `breadcrumb.mdx`

Each component page includes:

- [x] Live preview (rendered component in MDX)
- [x] All variants showcased
- [x] Props table
- [x] Usage code examples
- [x] Import patterns (barrel + layer-specific)
- [x] Accessibility notes
- [x] Design token references

**Route migration**: Component docs moved from `/docs/design-system/components/*` to `/components/*`. Sidebar tab URL updated. All internal links updated. Next.js build verified with all 24 pages prerendered under `/components/[[...slug]]`.

### 6.4 — Build Component Preview Infrastructure

**File**: `src/components/docs/component-preview.tsx`

- [ ] Create a `<ComponentPreview>` component for MDX:
    - Renders the component in an isolated container with `data-ds` attribute
    - Shows code alongside preview
    - Toggle between light/dark within the preview
    - Copy code button
- [ ] Register in `src/mdx-components.tsx`

### 6.5 — Build Props Table Component

**File**: `src/components/docs/props-table.tsx`

- [ ] Auto-generate from TypeScript types if possible
- [ ] Fallback: manual prop table MDX component
- [ ] Columns: Prop, Type, Default, Description
- [ ] Register in `src/mdx-components.tsx`

---

## Phase 7 — Motion & Accessibility Hardening

### 7.1 — Motion System Polish

- [ ] Add `useMotion()` hook that combines preset selection with `useReducedMotion()`:
    ```ts
    function useMotion(preset: MotionPreset): MotionPreset {
    	const shouldReduce = useReducedMotion();
    	return withReducedMotion(preset, shouldReduce);
    }
    ```
- [ ] Add `<AnimatePresence>` wrapper component that includes stagger container
- [ ] Test all presets actually work (create a motion showcase page)
- [ ] Add `prefersReducedMotion` test to every component that animates

### 7.2 — Focus Ring System ✅ DONE

- [x] Created `focusRingClasses` constant in `packages/unified-ui/src/utils/focus-ring.ts`
    ```ts
    export const focusRingClasses =
    	"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background";
    ```
- [x] Created 6 focus ring variants:
    - `focusRingClasses` — Standard 2px ring with offset (buttons, inputs, selects, checkboxes, switches)
    - `focusRingInsetClasses` — No offset, for elements inside containers (dropdown items, table rows)
    - `focusRingCompactClasses` — 1px offset for small elements (breadcrumb links, pagination)
    - `focusRingVariantOverrides` — Color overrides for error/success/warning/info states
    - `focusRingGroupRingClasses` / `focusRingGroupTriggerClasses` — Group focus pattern
    - `focusWithinRingClasses` — Focus-within for wrapper elements (input wrappers with icons)
- [x] Array variants provided for CVA integration (`focusRingClassList`, `focusRingInsetClassList`, etc.)
- [x] All interactive components use `focusRingClasses` from `@unified-ui/utils/focus-ring`
- [x] Comprehensive JSDoc documentation with contrast compliance notes

### 7.3 — Keyboard Navigation ✅ DONE (via Radix UI)

- [x] All interactive components reachable via Tab — handled by native HTML + Radix
- [x] All interactive components activatable via Enter/Space — Radix primitives
- [x] Dialog: focus trap, return focus on close — `@radix-ui/react-dialog`
- [x] Dropdown: arrow key navigation — `@radix-ui/react-dropdown-menu`
- [x] Tabs: arrow key navigation — `@radix-ui/react-tabs`
- [x] Accordion: arrow key navigation — `@radix-ui/react-accordion`
- [x] Select: arrow key navigation — `@radix-ui/react-select`
- [x] Switch: Space to toggle — `@radix-ui/react-switch`
- [x] Toast: focus management — custom implementation with auto-dismiss

### 7.4 — ARIA Compliance ✅ DONE (via Radix UI + manual implementation)

- [x] Button: `aria-disabled`, `aria-busy` (loading)
- [x] Input: `aria-invalid` (auto-set for error variant), `aria-describedby`, `aria-disabled`
- [x] Dialog: `aria-labelledby`, `aria-describedby`, `role="dialog"`, `aria-modal` — Radix handles
- [x] Toast: `role="status"`, `aria-live` — custom implementation
- [x] Accordion: `aria-expanded`, `aria-controls` — Radix handles
- [x] Tabs: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected` — Radix handles
- [x] Tooltip: `role="tooltip"`, triggered by `aria-describedby` — Radix handles
- [x] Popover: `aria-haspopup`, `aria-expanded` — Radix handles
- [x] Switch: `role="switch"`, `aria-checked` — Radix handles
- [x] Checkbox: `role="checkbox"`, `aria-checked`, indeterminate (`aria-checked="mixed"`) — Radix handles
- [x] Select: `role="listbox"`, `aria-expanded` — Radix handles
- [x] Avatar: status dot has `role="status"` with `aria-label`, initials have `role="img"` with `aria-label`
- [x] Alert: uses semantic `role="alert"` or `role="status"`

### 7.5 — Contrast Compliance

- [ ] Verify all text/background combinations meet WCAG AA (4.5:1 ratio)
- [ ] Test all semantic color combinations (primary, success, warning, danger, info)
- [ ] Test both light and dark themes
- [ ] Document any pairs that fail and provide alternatives
- [ ] Run automated contrast audit script (utilities exist: `checkHexContrast`, `auditContrast`)

---

## Phase 8 — Versioning & Changelog ✅ DONE

> Even inside a monolith, track the design system's evolution formally.

### 8.1 — Semantic Versioning ✅

- [x] Use semver for the `version` field in `packages/unified-ui/package.json` — currently `"0.1.0"`
    - **MAJOR** (1.x.x): Breaking changes to component API or token names
    - **MINOR** (x.1.x): New components, new tokens, new variants
    - **PATCH** (x.x.1): Bug fixes, accessibility fixes, docs updates
- [x] Export version constant — `UNIFIED_UI_VERSION = "0.1.0"` in `packages/unified-ui/src/index.ts`

### 8.2 — Changelog ✅

- [x] Create `packages/unified-ui/CHANGELOG.md` — comprehensive changelog following [Keep a Changelog](https://keepachangelog.com/) format, documenting all v0.1.0 additions across tokens, theme, typography, Tailwind integration, primitives, 23 composite components, motion system, utilities, and package/build infrastructure.

### 8.3 — Change Control Process

- [ ] Document in `packages/unified-ui/README.md`:
    1. All token changes require updating: token file → CSS file → docs
    2. All component API changes require updating: component → docs → changelog
    3. Breaking changes must be documented with migration instructions
    4. Version bump happens in a dedicated commit: `chore(ds): bump to x.y.z`

---

## Phase 9 — Migration Strategy

> Replace the existing `src/components/ui/` components with Unified UI equivalents without breaking the site.

### 9.1 — Audit Existing Components

Current `src/components/ui/`:

- `button.tsx` — uses `fd-*` tokens
- `collapsible.tsx` — Radix-based
- `navigation-menu.tsx` — Radix-based
- `popover.tsx` — Radix-based
- `scroll-area.tsx` — Radix-based

### 9.2 — Parallel Period

- [ ] Keep both `src/components/ui/` (old) and `packages/unified-ui/src/components/` (new)
- [x] New pages/features use Unified UI components (docs site uses `@work-rjkashyap/unified-ui`)
- [x] Old pages continue working with old components (Fumadocs layout uses `fd-*` tokens)

### 9.3 — Gradual Replacement Order

1. [ ] **Button** — Replace `src/components/ui/button.tsx` imports with `@work-rjkashyap/unified-ui`
    - Search for all `from "@/components/ui/button"` imports
    - Map old variants: `default` → `primary`, `outline` → `secondary`, `ghost` → `ghost`
    - Map old sizes: `sm` stays, `icon`/`icon-sm`/`icon-xs` → use `iconOnly` + `size`
    - Test each page after replacement
2. [ ] **Popover** — Replace with Unified UI Popover (already built)
3. [ ] **Collapsible** — Replace with Unified UI Accordion (already built)
4. [ ] **Navigation Menu** — Keep as-is (Fumadocs-specific), or wrap in DS component
5. [ ] **Scroll Area** — Keep as-is (utility component), or wrap

### 9.4 — Cleanup

- [ ] After all replacements, delete `src/components/ui/button.tsx`
- [ ] After all replacements, evaluate if remaining `src/components/ui/` files can be migrated
- [x] ~~Update `content/components/button.mdx` to remove shadcn references~~ — done (replaced with `@work-rjkashyap/unified-ui` Button docs)
- [x] ~~Update `content/components/index.mdx` to showcase Unified UI components~~ — done (catalog page with all 22 components)

### 9.5 — CSS Token Migration

Old components use `fd-*` tokens (Fumadocs). These should NOT be removed because Fumadocs layout components still use them.

- [x] Unified UI components: use only `ds-*` tokens (verified across all 23 components)
- [ ] Fumadocs layout components: continue using `fd-*` tokens
- [ ] Document this dual-token situation in design system README

---

## Component Development Order

Strict build sequence — each component may depend on the ones above it:

| #   | Component  | Depends On                | Priority | Status  |
| --- | ---------- | ------------------------- | -------- | ------- |
| 1   | Typography | tokens                    | P0       | ✅ Done |
| 2   | Container  | tokens                    | P0       | ✅ Done |
| 3   | Stack      | tokens                    | P0       | ✅ Done |
| 4   | Grid       | tokens                    | P0       | ✅ Done |
| 5   | Divider    | tokens                    | P0       | ✅ Done |
| 6   | Button     | tokens, Typography        | P0       | ✅ Done |
| 7   | Input      | tokens, Typography, Label | P0       | ✅ Done |
| 8   | Textarea   | Input                     | P0       | ✅ Done |
| 9   | Select     | Input, Popover            | P1       | ✅ Done |
| 10  | Checkbox   | tokens                    | P1       | ✅ Done |
| 11  | Radio      | tokens                    | P1       | ✅ Done |
| 12  | Switch     | tokens                    | P1       | ✅ Done |
| 13  | Card       | Stack, Typography         | P0       | ✅ Done |
| 14  | Badge      | tokens                    | P1       | ✅ Done |
| 15  | Avatar     | tokens                    | P1       | ✅ Done |
| 16  | Tooltip    | tokens, motion            | P1       | ✅ Done |
| 17  | Popover    | tokens, motion            | P1       | ✅ Done |
| 18  | Dropdown   | Popover, Divider          | P1       | ✅ Done |
| 19  | Dialog     | motion (modalContent)     | P0       | ✅ Done |
| 20  | Sheet      | motion (slideIn)          | P1       | ✅ Done |
| 21  | Tabs       | tokens, motion            | P1       | ✅ Done |
| 22  | Accordion  | motion (expandHeight)     | P1       | ✅ Done |
| 23  | Toast      | motion (toastSlideIn)     | P1       | ✅ Done |
| 24  | Alert      | Badge, Typography         | P2       | ✅ Done |
| 25  | Skeleton   | motion (pulse)            | P2       | ✅ Done |
| 26  | Table      | Typography, Checkbox      | P2       | ✅ Done |
| 27  | Pagination | Button                    | P2       | ✅ Done |
| 28  | Breadcrumb | Typography                | P2       | ✅ Done |

### Priority Key

- **P0**: Must have for MVP — blocks everything else
- **P1**: Core library — needed for most applications
- **P2**: Extended library — nice to have, build on demand

---

## Quick Reference: File Checklist

When building any new component, follow this checklist:

```
□ Create component file:       packages/unified-ui/src/components/{name}.tsx
□ Use "use client" directive
□ Import cn from:              @unified-ui/utils/cn
□ Import focus ring from:      @unified-ui/utils/focus-ring
□ All colors via:              bg-ds-*, text-ds-*, border-ds-*
□ All radii via:               rounded-ds-*
□ All transitions via:         duration-ds-*, ease-ds-*
□ Forward ref:                 forwardRef<HTMLElement, Props>
□ Data attributes:             data-ds="" data-ds-component="{name}"
□ Focus ring:                  focusRingClasses from @unified-ui/utils/focus-ring
□ Disabled state:              disabled:pointer-events-none disabled:opacity-50
□ CVA for variants:            import { cva } from "class-variance-authority"
□ Export from barrel:          packages/unified-ui/src/components/index.ts
□ Export from main:            packages/unified-ui/src/index.ts
□ Create docs page:            content/components/{name}.mdx
□ Update components meta.json: content/components/meta.json
□ Build DS:                    npm run build:ds (passes)
□ Build Next.js:               npx next build (passes)
□ Biome clean:                 npm run lint (passes)
```

---

## Summary: Execution Order

| Phase                                 | Effort   | Blocks                    | Status                                                     |
| ------------------------------------- | -------- | ------------------------- | ---------------------------------------------------------- |
| **Phase 1** — Fix Foundations         | 1 day    | Phase 2, 3                | ✅ Complete                                                |
| **Phase 2** — Typography Multi-Font   | 2 days   | Phase 6 (typography docs) | ✅ Complete                                                |
| **Phase 3** — Absolute Paths          | 1 day    | Phase 4                   | ✅ Complete                                                |
| **Phase 4** — Package as Library      | 2 days   | External consumers        | ✅ Complete (restructured to `packages/unified-ui/`)       |
| **Phase 5** — Components (P0 batch)   | 5 days   | Phase 6 (component docs)  | ✅ Complete                                                |
| **Phase 5** — Components (P1 batch)   | 7 days   | —                         | ✅ Complete                                                |
| **Phase 5** — Components (P2 batch)   | 4 days   | —                         | ✅ Complete                                                |
| **Phase 6** — Documentation Overhaul  | 5 days   | —                         | 🟡 In progress (6.1–6.3 done, 6.4–6.5 remaining)           |
| **Phase 7** — Motion & A11y Hardening | 3 days   | —                         | 🟡 Mostly done (7.2–7.4 done, 7.1 + 7.5 remaining)         |
| **Phase 8** — Versioning & Changelog  | 0.5 days | —                         | ✅ Complete                                                |
| **Phase 9** — Migration               | 2 days   | Phase 5 (parallel Button) | 🟡 Partially started (docs migrated, UI migration pending) |

**Critical path (remaining)**: Phase 6.4–6.5 → Phase 9 (UI migration)

**Parallel work**: Phase 7.1 (motion polish) and Phase 7.5 (contrast audit) can happen alongside Phase 6.

**Phases 1–5 complete**: All foundations, typography, path aliases, packaging, and 23 composite components (+ primitives) are built, barrel-exported, and verified.

**Phase 4 complete**: Package restructured to `packages/unified-ui/` as an npm workspace. Build verified with `npm run build:ds` (zero warnings), `npm pack` verified, `@arethetypeswrong/cli` passes. Workspace symlink provides identical import experience to published package. Only remaining item: GitHub Actions CI/CD for auto-publish.

**Phase 6 mostly complete**: 6.1 (content structure), 6.2 (9 core documentation pages), and 6.3 (22 component documentation pages) all done. Component docs moved to `/components` route. CSS import uses `@work-rjkashyap/unified-ui/styles.css` package export. Remaining: 6.4 (ComponentPreview) and 6.5 (PropsTable).

**Phase 7 mostly complete**: Focus ring system (7.2) fully built with 6 variants used across all components. Keyboard navigation (7.3) and ARIA compliance (7.4) handled by Radix UI primitives + manual implementation. Remaining: 7.1 (motion system polish) and 7.5 (contrast compliance audit).

**Phase 8 complete**: `CHANGELOG.md` created with full v0.1.0 documentation following Keep a Changelog format.

**Phase 9 partially started**: Component docs now use `@work-rjkashyap/unified-ui` imports (no more shadcn references). Actual UI migration (replacing `src/components/ui/` files) not yet started.

**Bug fixes applied**:

- Switch: Fixed uncontrolled mode state tracking for AnimatedThumb spring animation
- Avatar: Fixed status dot clipping by moving `overflow-hidden` to inner content wrapper

---

_Last updated: 2026-02-28 (Phase 6.3 complete, Phase 7.2–7.4 status updated, component docs moved to `/components` route)_
_Design system: Unified UI v0.1.0_
_Package: `@work-rjkashyap/unified-ui` at `packages/unified-ui/`_
