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

Current: plain `--*` (no namespace infix)
Decision: **removed `--ds-` prefix** — all non-color tokens now use plain `--` prefix (e.g. `--radius-md`, `--shadow-lg`, `--z-modal`, `--duration-fast`, `--easing-standard`, `--font-sans`), matching the same convention already used by color tokens.

- [x] **Decision**: document the chosen prefix in `src/design-system/theme/contract.ts`
- [x] Decision rationale documented in `contract.ts` and `README.md`
- [x] Removed `--ds-` prefix from all CSS custom properties, Tailwind @theme mappings, utility classes, and documentation

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
    	display: "var(--font-display)",
    	/** Body text — Outfit by default */
    	sans: "var(--font-sans)",
    	/** Editorial / accent text — Lora by default */
    	serif: "var(--font-serif)",
    	/** Code blocks and inline code — JetBrains Mono by default */
    	mono: "var(--font-mono)",
    	/** Inherit from parent — useful for mixed contexts */
    	inherit: "var(--font-inherit)",
    } as const;
    ```

### 2.2 — Update CSS Custom Properties ✅

**File**: `packages/unified-ui/styles.css`

- [x] Add CSS custom properties for all font families:
    ```css
    :root {
    	--font-display:
    		var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont,
    		"Segoe UI", Roboto, sans-serif;
    	--font-sans:
    		var(--font-outfit), system-ui, -apple-system, BlinkMacSystemFont,
    		"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    	--font-serif: var(--font-lora), Georgia, "Times New Roman", serif;
    	--font-mono:
    		var(--font-jetbrains), "Fira Code", "SF Mono", "Cascadia Code",
    		Consolas, "Liberation Mono", Menlo, monospace;
    	--font-inherit: inherit;
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
    	sans: "font-sans",
    	display: "font-display",
    	serif: "font-serif",
    	mono: "font-mono",
    	inherit: "font-inherit",
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

- [x] Unified UI components: use only design system tokens (verified across all 23 components)
- [ ] Fumadocs layout components: continue using `fd-*` tokens
- [ ] Document this dual-token situation in design system README

---

## Phase 10 — Extended Component Buildout

> Expand the design system with additional components commonly needed in production applications. Organized into priority tiers based on frequency of use and dependency chains.

### 10.1 — Form Components (P1)

These complete the form story and are needed for any non-trivial application.

| #   | Component   | Depends On               | Description                                                                | Status |
| --- | ----------- | ------------------------ | -------------------------------------------------------------------------- | ------ |
| 29  | Label       | Typography               | Accessible `<label>` with required indicator, sizing, and disabled state   | ✅     |
| 30  | FormField   | Label, Input, Textarea   | Composable field wrapper: label + control + description + error message    | ✅     |
| 31  | Slider      | tokens                   | Range slider with single/dual thumb, marks, and step snapping (Radix)      | ☐      |
| 32  | DatePicker  | Popover, Calendar, Input | Date input with calendar popover, range mode, and locale support           | ☐      |
| 33  | Calendar    | tokens, Button           | Month/year grid calendar with range selection and disabled dates           | ☐      |
| 34  | Toggle      | tokens                   | Pressable on/off button (distinct from Switch — acts like a toggle button) | ✅     |
| 35  | ToggleGroup | Toggle                   | Single or multi-select group of toggle buttons (Radix)                     | ✅     |
| 36  | NumberInput | Input, Button            | Stepper input with increment/decrement, min/max, and keyboard support      | ☐      |
| 37  | PinInput    | Input                    | OTP / verification code input with auto-advance between digits             | ☐      |
| 38  | ColorPicker | Popover, Input           | Color swatch + popover with spectrum, HEX/RGB/OKLCH input                  | ☐      |
| 39  | FileUpload  | Button, Card             | Drag-and-drop zone with file list, progress, and preview thumbnails        | ☐      |
| 40  | Combobox    | Popover, Input, Command  | Searchable select with autocomplete, multi-select, and async loading       | ☐      |

### 10.2 — Data Display Components (P1)

Components for presenting structured data, stats, and status information.

| #   | Component  | Depends On          | Description                                                                 | Status |
| --- | ---------- | ------------------- | --------------------------------------------------------------------------- | ------ |
| 41  | DataList   | Typography          | Key-value pair list (term + detail) with horizontal/vertical layouts        | ☐      |
| 42  | Stat       | Typography, Card    | KPI card with value, label, trend indicator, and sparkline slot             | ☐      |
| 43  | Timeline   | Typography, Divider | Vertical timeline with icons, connectors, and alternating sides             | ☐      |
| 44  | EmptyState | Typography, Button  | Placeholder for empty lists/tables with icon, message, and CTA              | ☐      |
| 45  | Tag        | Badge               | Dismissible chip/tag with close button, avatar slot, and color variants     | ☐      |
| 46  | Kbd        | Typography          | Keyboard shortcut display (`⌘K`) with proper styling                        | ☐      |
| 47  | Code       | Typography          | Inline code and code block with copy button, line numbers, syntax highlight | ☐      |
| 48  | Callout    | Alert               | Highlighted information block with icon, title, and collapsible content     | ☐      |
| 49  | HoverCard  | Popover             | Rich preview card that appears on hover (Radix)                             | ☐      |

### 10.3 — Navigation & Layout Components (P1)

Structural components for app chrome, routing, and page organization.

| #   | Component      | Depends On             | Description                                                                  | Status |
| --- | -------------- | ---------------------- | ---------------------------------------------------------------------------- | ------ |
| 50  | NavigationMenu | Popover, Button        | Top-level nav with dropdowns, mega-menu support, and mobile collapse (Radix) | ✅     |
| 51  | Sidebar        | Sheet, Button, Tooltip | Collapsible app sidebar with sections, icons, nested items, and resize       | ☐      |
| 52  | CommandPalette | Dialog, Input          | `⌘K` command palette with fuzzy search, groups, and keyboard navigation      | ✅     |
| 53  | Menubar        | DropdownMenu           | Horizontal menu bar with nested submenus (Radix)                             | ✅     |
| 54  | ContextMenu    | DropdownMenu           | Right-click context menu with nested submenus (Radix)                        | ✅     |
| 55  | Steps          | Typography, Divider    | Step indicator / wizard progress with horizontal and vertical orientations   | ✅     |
| 56  | ScrollArea     | tokens                 | Custom scrollbar container with fade indicators (Radix)                      | ✅     |
| 57  | Resizable      | tokens                 | Resizable split panels with drag handle (react-resizable-panels)             | ☐      |
| 58  | AspectRatio    | tokens                 | Constrains child to a given aspect ratio (Radix)                             | ☐      |
| 59  | Collapsible    | motion                 | Animated show/hide section (Radix) — building block for Sidebar, Tree, etc.  | ✅     |

### 10.4 — Feedback & Overlay Components (P2)

Loading states, confirmations, and transient UI.

| #   | Component   | Depends On     | Description                                                             | Status |
| --- | ----------- | -------------- | ----------------------------------------------------------------------- | ------ |
| 60  | Progress    | tokens         | Linear progress bar with indeterminate, striped, and labeled variants   | ✅     |
| 61  | Spinner     | tokens, motion | Animated loading spinner with size variants (replaces raw SVG spinners) | ✅     |
| 62  | AlertDialog | Dialog, Button | Confirmation dialog with required action — no dismiss on overlay click  | ☐      |
| 63  | Drawer      | Sheet          | Bottom drawer variant of Sheet with drag-to-dismiss (vaul)              | ☐      |
| 64  | Banner      | Alert, Button  | Full-width dismissible banner for announcements, fixed top/bottom       | ☐      |
| 65  | Sonner      | Toast          | Stacked toast system with promise/loading states (sonner integration)   | ☐      |

### 10.5 — Rich Content Components (P2)

Advanced display components for media, charts, and complex content.

| #   | Component    | Depends On            | Description                                                                 | Status |
| --- | ------------ | --------------------- | --------------------------------------------------------------------------- | ------ |
| 66  | Carousel     | Button, motion        | Horizontal/vertical carousel with autoplay, dots, and swipe (embla)         | ☐      |
| 67  | ImageGallery | Dialog, Carousel      | Lightbox gallery with zoom, thumbnails, and keyboard navigation             | ☐      |
| 68  | VideoPlayer  | tokens                | Styled video wrapper with custom controls, poster, and aspect ratio         | ☐      |
| 69  | Chart        | Card, Typography      | Chart wrapper for Recharts with consistent theme tokens and responsive size | ☐      |
| 70  | TreeView     | Collapsible, Checkbox | Expandable tree with checkable nodes, drag-and-drop reorder, and icons      | ☐      |
| 71  | VirtualList  | ScrollArea            | Virtualized list/grid for large datasets (tanstack-virtual integration)     | ☐      |
| 72  | Markdown     | Typography, Code      | Rendered markdown/MDX content with design system prose styles               | ☐      |

### 10.6 — Utility & Compound Components (P3)

Higher-level patterns composed from primitives.

| #   | Component        | Depends On             | Description                                                              | Status |
| --- | ---------------- | ---------------------- | ------------------------------------------------------------------------ | ------ |
| 73  | CopyButton       | Button, Tooltip, Toast | Click-to-copy with animated check feedback and tooltip                   | ☐      |
| 74  | ThemeToggle      | Button, DropdownMenu   | Light/dark/system mode switcher with icon animation                      | ☐      |
| 75  | VisuallyHidden   | tokens                 | Screen-reader-only content wrapper (Radix)                               | ☐      |
| 76  | InputGroup       | Input, Button, Select  | Composed input with prefix/suffix addons, icon slots, and inline button  | ☐      |
| 77  | ConfirmDialog    | AlertDialog            | Pre-composed confirm/cancel dialog with title, description, and variants | ☐      |
| 78  | SearchInput      | Input, Kbd             | Search field with debounce, clear button, and `⌘K` shortcut hint         | ☐      |
| 79  | DataTableToolbar | Input, Select, Button  | Filtering, sorting, column visibility toolbar for DataTable              | ☐      |
| 80  | InfiniteScroll   | VirtualList, Spinner   | Scroll-triggered loading with intersection observer                      | ☐      |

### 10.7 — Suggested Build Order

Build in this sequence to maximize reuse and minimize blockers:

**Wave 1 — Foundations** ✅ DONE (needed by many others):
`Label` → `FormField` → `Toggle` → `ToggleGroup` → `ScrollArea` → `Collapsible` → `Progress` → `Spinner`

**Wave 2 — Navigation & Commands** ✅ DONE (except Sidebar):
`NavigationMenu` ✅ → `Sidebar` → `CommandPalette` ✅ → `ContextMenu` ✅ → `Menubar` ✅ → `Steps` ✅

**Wave 3 — Advanced Forms**:
`Slider` → `Calendar` → `DatePicker` → `NumberInput` → `PinInput` → `Combobox` → `FileUpload`

**Wave 4 — Data & Display**:
`Tag` → `Kbd` → `Code` → `Callout` → `DataList` → `Stat` → `Timeline` → `EmptyState` → `HoverCard`

**Wave 5 — Overlays & Feedback**:
`AlertDialog` → `Drawer` → `Banner` → `Sonner`

**Wave 6 — Rich Content**:
`Carousel` → `ImageGallery` → `Chart` → `TreeView` → `VirtualList`

**Wave 7 — Utility Compounds**:
`CopyButton` → `ThemeToggle` → `VisuallyHidden` → `InputGroup` → `SearchInput` → `ConfirmDialog` → `DataTableToolbar` → `InfiniteScroll`

---

## Phase 11 — Framer Motion Integration (All Components)

> Upgrade every existing component and establish the pattern for all new components to use Framer Motion (`framer-motion`) for polished, physics-based animations that respect `prefers-reduced-motion`. The motion layer already exists at `packages/unified-ui/src/motion/` with 40+ presets, hooks (`useMotion`, `useReducedMotion`, `useMotionProps`), and a `MotionSafe` component. This phase wires it into every component.

### Current State

Only **3 of 25** component files use Framer Motion today:

| Component | What it uses                                                                 | Status    |
| --------- | ---------------------------------------------------------------------------- | --------- |
| Switch    | `motion`, `useMotionValue`, `useSpring`, `useReducedMotion` — animated thumb | ✅ Has FM |
| Tabs      | `motion`, `useReducedMotion` — animated active indicator                     | ✅ Has FM |
| Toast     | `AnimatePresence`, `motion`, `useReducedMotion` — enter/exit/swipe           | ✅ Has FM |

The remaining **22 components** use only CSS `animate-in`/`animate-out` Tailwind classes or no animation at all.

### 11.1 — Motion Integration Principles

Every Framer Motion addition MUST follow these rules:

1. **Always use `useReducedMotion()`** — skip or simplify animation when the user prefers reduced motion.
2. **Use existing presets** from `@unified-ui/motion` (`fadeIn`, `scaleIn`, `slideUp`, `pop`, etc.) instead of hardcoded values.
3. **Use `AnimatePresence`** for any component that mounts/unmounts (dialogs, sheets, dropdowns, tooltips, popovers, toasts, alerts).
4. **Use `motion.*` elements** (e.g., `motion.div`, `motion.button`) — never raw `animate()` calls.
5. **Spring physics** for interactive elements (drag, toggle, press). Tween for entrance/exit.
6. **`layout` prop** for components that shift position (tabs indicator, sidebar collapse, accordion).
7. **`whileHover` / `whileTap`** for micro-interactions on buttons, cards, badges, avatars.
8. **Keep CSS animations as fallback** — the Tailwind `animate-in`/`animate-out` classes should remain for consumers who don't want the JS motion runtime.
9. **Tree-shake friendly** — import `motion` and `AnimatePresence` only in components that need them. Don't import in pure layout/token components.

### 11.2 — Existing Components — Upgrade Plan

#### Batch A — Overlays & Portals (highest visual impact)

Replace CSS `data-[state=open]:animate-in` / `data-[state=closed]:animate-out` with Framer Motion `AnimatePresence` + `motion.div` for smoother, interruptible, physics-based enter/exit.

| Component         | Animation Type               | Motion Preset                                                                                | Details                                                                                      |
| ----------------- | ---------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Dialog**        | overlay fade + content scale | `overlayBackdrop` + `modalContent`                                                           | `AnimatePresence` wrapping overlay + content. Spring scale-in, fade overlay.                 |
| **Sheet**         | overlay fade + panel slide   | `overlayBackdrop` + `slideInFromRight` / `slideInFromLeft` / `slideInFromBottom` / `slideUp` | Direction-aware slide based on `side` prop. Drag-to-dismiss with `drag` + `dragConstraints`. |
| **Dropdown Menu** | content scale + fade         | `scaleIn` or `popSubtle`                                                                     | `AnimatePresence` on menu content. Stagger children with `staggerContainerFast`.             |
| **Popover**       | content scale + fade         | `scaleIn`                                                                                    | Same pattern as dropdown — `AnimatePresence` + `motion.div` on content.                      |
| **Tooltip**       | fade + slight translate      | `fadeInFast` + `slideUpSm`                                                                   | Quick fade-in (150ms). Spring for position shifts.                                           |
| **Select**        | content scale + fade         | `scaleIn`                                                                                    | `AnimatePresence` on portal content. Stagger items with `staggerContainerFast`.              |

#### Batch B — Expand/Collapse Components

| Component               | Animation Type        | Motion Preset          | Details                                                                                            |
| ----------------------- | --------------------- | ---------------------- | -------------------------------------------------------------------------------------------------- |
| **Accordion**           | content height expand | `expandHeight`         | `motion.div` with `animate={{ height: "auto" }}` for smooth height transitions. Use `layout` prop. |
| **Alert** (dismissible) | exit slide + fade     | `fadeIn` + `slideUpSm` | `AnimatePresence` for dismiss animation.                                                           |

#### Batch C — Interactive Micro-Interactions

| Component    | Animation Type           | Motion Preset                                           | Details                                                                                |
| ------------ | ------------------------ | ------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Button**   | press scale + hover lift | `whileTap={{ scale: 0.97 }}` + `whileHover={{ y: -1 }}` | Subtle press feedback. Loading state: `spin` preset for spinner icon.                  |
| **Card**     | hover lift + shadow      | `whileHover={{ y: -2, shadow }}`                        | Optional `interactive` prop enables hover lift. Use `hoverLift` preset.                |
| **Badge**    | mount pop                | `popSubtle`                                             | Badges animate in with a subtle scale pop on mount.                                    |
| **Avatar**   | mount fade + scale       | `scaleIn`                                               | Fade-in on image load. Group avatars stagger with `staggerContainerFast`.              |
| **Checkbox** | check icon scale         | `pop`                                                   | Check icon springs in with `pop` preset.                                               |
| **Radio**    | indicator scale          | `pop`                                                   | Radio dot springs in.                                                                  |
| **Switch**   | _(already done)_         | —                                                       | Already uses `useSpring` for thumb. No changes needed.                                 |
| **Input**    | focus ring transition    | CSS transitions (keep as-is)                            | Focus ring is CSS-only — no FM needed. Add `motion.div` shake on error via `variants`. |
| **Textarea** | focus ring transition    | CSS transitions (keep as-is)                            | Same as Input. Add shake-on-error.                                                     |

#### Batch D — Navigation & Data Components

| Component      | Animation Type          | Motion Preset                     | Details                                                                                    |
| -------------- | ----------------------- | --------------------------------- | ------------------------------------------------------------------------------------------ |
| **Tabs**       | _(already done)_        | —                                 | Already uses `motion` for active indicator. No changes needed.                             |
| **Pagination** | page number crossfade   | `fadeInFast`                      | Animate page number changes with `AnimatePresence` + `mode="wait"`.                        |
| **Breadcrumb** | item stagger on mount   | `staggerContainerFast` + `fadeIn` | Optional entrance stagger for breadcrumb items.                                            |
| **Table**      | row enter/exit          | `fadeIn` + `slideUpSm`            | Optional `animated` prop. Rows fade-in on mount. Sort transitions with `layout`.           |
| **Skeleton**   | pulse + reveal          | `pulse` → crossfade to content    | Already pulses via CSS. Add `AnimatePresence` crossfade when content replaces skeleton.    |
| **Data Table** | sort/filter transitions | `layout` + `fadeIn`               | Rows animate position changes on sort with `layout`. Filter in/out with `AnimatePresence`. |

### 11.3 — New Components (Phase 10) — Motion Requirements

All Phase 10 components MUST include Framer Motion from day one. Here is the motion spec per component:

#### Form Components

| Component   | Motion                                                                                                                                 |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Label       | None needed (static)                                                                                                                   |
| FormField   | Error message: `AnimatePresence` + `expandHeight` for show/hide                                                                        |
| Slider      | Thumb: `whileDrag` + spring. Value tooltip: `fadeInFast`                                                                               |
| DatePicker  | Calendar popover: `scaleIn`. Month transition: `AnimatePresence` + `slideLeft`/`slideRight`                                            |
| Calendar    | Month/year grid crossfade: `AnimatePresence` + `fadeIn`. Date hover: `whileHover`                                                      |
| Toggle      | Press: `whileTap={{ scale: 0.95 }}`. State change: spring `backgroundColor` transition                                                 |
| ToggleGroup | Active indicator: `motion.div` with `layout` (sliding highlight like Tabs)                                                             |
| NumberInput | Value change: `AnimatePresence` + number roll animation                                                                                |
| PinInput    | Digit entry: `pop` per character. Shake on error: custom variant                                                                       |
| ColorPicker | Spectrum popover: `scaleIn`. Swatch hover: `whileHover={{ scale: 1.15 }}`                                                              |
| FileUpload  | Drop zone: `whileHover` pulse border. File item enter: `staggerContainerFast` + `slideUpSm`. Remove: `AnimatePresence` + `fadeIn` exit |
| Combobox    | Dropdown: `scaleIn`. Results: `staggerContainerFast`. Empty state: `fadeIn`                                                            |

#### Data Display Components

| Component  | Motion                                                                                                                                   |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| DataList   | Item stagger: `staggerContainer` + `fadeIn`                                                                                              |
| Stat       | Value count-up: `motion.span` with `animate={{ value }}` via `useMotionValue` + `useTransform`. Trend arrow: `slideUpSm` / `slideDownSm` |
| Timeline   | Item stagger: `staggerContainerSlow` + `slideInFromLeft` (alternating `slideInFromRight`)                                                |
| EmptyState | Illustration: `scaleIn`. Text: `fadeIn` with delay                                                                                       |
| Tag        | Mount: `popSubtle`. Dismiss: `AnimatePresence` + scale-out                                                                               |
| Kbd        | None needed (static)                                                                                                                     |
| Code       | Copy button feedback: icon swap with `AnimatePresence`                                                                                   |
| Callout    | Collapsible variant: `expandHeight`. Mount: `fadeIn`                                                                                     |
| HoverCard  | Enter: `scaleIn` with 200ms open delay. Exit: `fadeInFast` reverse                                                                       |

#### Navigation & Layout Components

| Component      | Motion                                                                                                                                                          |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NavigationMenu | Dropdown: `scaleIn`. Content crossfade: `AnimatePresence` + `mode="wait"` + `fadeIn`. Mobile collapse: `expandHeight`                                           |
| Sidebar        | Collapse/expand: `motion.aside` with `animate={{ width }}` spring. Items stagger: `staggerContainerFast`. Mobile overlay: `overlayBackdrop` + `slideInFromLeft` |
| CommandPalette | Dialog: `modalContentSpring`. Results stagger: `staggerContainerFast` + `slideUpSm`. Empty→results crossfade: `AnimatePresence`                                 |
| Menubar        | Submenu: `scaleIn`. Item hover indicator: `motion.div` with `layout`                                                                                            |
| ContextMenu    | Same as DropdownMenu — `scaleIn` + stagger                                                                                                                      |
| Steps          | Active step indicator: `motion.div` with `layout` (sliding). Completed checkmark: `pop`                                                                         |
| ScrollArea     | Scrollbar fade: `fadeInFast` on scroll activity                                                                                                                 |
| Resizable      | Handle hover: `whileHover` opacity/scale. Panel resize: spring width/height                                                                                     |
| AspectRatio    | None needed (pure CSS container)                                                                                                                                |
| Collapsible    | Content: `expandHeight`. Trigger icon: `motion.svg` with `animate={{ rotate }}`                                                                                 |

#### Feedback & Overlay Components

| Component   | Motion                                                                                                                                    |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Progress    | Bar fill: `motion.div` with spring `animate={{ width: percent + "%" }}`. Indeterminate: CSS `@keyframes` (keep as CSS for infinite loops) |
| Spinner     | Rotation: `spin` preset. Mount/unmount: `AnimatePresence` + `fadeIn`                                                                      |
| AlertDialog | Same as Dialog: `overlayBackdrop` + `modalContent`. Action buttons: `whileTap`                                                            |
| Drawer      | Drag-to-dismiss: `motion.div` with `drag="y"` + `dragConstraints` + `onDragEnd` snap. Overlay: `overlayBackdrop`                          |
| Banner      | Enter: `slideDown` from top (or `slideUp` from bottom). Dismiss: `AnimatePresence` + exit reverse                                         |
| Sonner      | Stack: `AnimatePresence` + `toastSlideIn`. Height transitions: `layout`                                                                   |

#### Rich Content Components

| Component    | Motion                                                                                                                              |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Carousel     | Slide transition: `AnimatePresence` + `slideLeft`/`slideRight` based on direction. Autoplay indicator: `motion.div` width animation |
| ImageGallery | Lightbox: `overlayBackdrop` + `scaleInLg`. Image crossfade: `AnimatePresence` + `mode="wait"`                                       |
| VideoPlayer  | Controls fade: `fadeInFast` on hover/focus. Play button: `pop`                                                                      |
| Chart        | Bars/lines: staggered entrance with `staggerContainerSlow`. Tooltip: `fadeInFast`                                                   |
| TreeView     | Node expand: `expandHeight`. Checkbox: `pop`. Drag reorder: `layout` + `Reorder.Group`                                              |
| VirtualList  | Item mount: `fadeInFast` as items enter viewport. Scroll-linked parallax optional                                                   |
| Markdown     | Headings/blocks: `staggerContainer` + `fadeIn` for page-load entrance (optional)                                                    |

#### Utility & Compound Components

| Component        | Motion                                                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| CopyButton       | Icon swap: `AnimatePresence` + `pop` (clipboard → checkmark → clipboard). Tooltip: `fadeInFast` |
| ThemeToggle      | Icon rotation: `motion.svg` with `animate={{ rotate: 360 }}` spring on theme change             |
| VisuallyHidden   | None needed (invisible by design)                                                               |
| InputGroup       | Focus ring expansion: CSS transitions (keep as-is)                                              |
| ConfirmDialog    | Same as AlertDialog: `overlayBackdrop` + `modalContent`                                         |
| SearchInput      | Clear button: `AnimatePresence` + `fadeInFast`. Results dropdown: `scaleIn`                     |
| DataTableToolbar | Filter pills enter/exit: `AnimatePresence` + `popSubtle`. Active filter count: `pop`            |
| InfiniteScroll   | Loader: `AnimatePresence` + `fadeIn`. New items: `staggerContainerFast` + `slideUpSm`           |

### 11.4 — Implementation Checklist Per Component

When adding Framer Motion to any component (existing or new), follow this checklist:

```
□ Import from "framer-motion" (motion, AnimatePresence, useReducedMotion, etc.)
□ Import presets from "@unified-ui/motion" — do NOT hardcode durations/easings
□ Call useReducedMotion() or useMotion(preset) at top of component
□ Wrap mount/unmount content in <AnimatePresence>
□ Use motion.div (or motion.button, etc.) for animated elements
□ Set initial, animate, exit props (or use variants via motionProps())
□ Add whileTap/whileHover for interactive elements where appropriate
□ Use layout prop for position/size transitions (tabs indicator, accordion, sidebar)
□ Test with prefers-reduced-motion: reduce — must degrade gracefully
□ Keep existing CSS animation classes as fallback for SSR / no-JS
□ Verify bundle size — motion imports should be tree-shaken per component
□ Update component docs page to mention animation behaviour
□ Add data-ds-animated="" attribute to animated wrapper for testing
```

### 11.5 — New Motion Presets to Add

Some components need presets not yet in `motion/presets.ts`:

| Preset        | Purpose                                        | Used By                                      |
| ------------- | ---------------------------------------------- | -------------------------------------------- |
| `shakeX`      | Horizontal shake for invalid inputs            | Input, Textarea, PinInput, FormField         |
| `numberRoll`  | Vertical digit roll for value changes          | NumberInput, Stat, Pagination                |
| `crossfade`   | Fade-out old → fade-in new (mode="wait")       | Calendar month, Carousel slide, ImageGallery |
| `slidePanel`  | Configurable direction slide for panels        | Sheet, Drawer, Sidebar, NavigationMenu       |
| `dragDismiss` | Drag + velocity threshold → exit               | Sheet, Drawer, Toast                         |
| `countUp`     | Animated number interpolation                  | Stat, Progress label                         |
| `revealMask`  | Clip-path reveal animation                     | Skeleton → content transition                |
| `springPress` | `whileTap: { scale: 0.97 }` with spring config | Button, Toggle, Card (interactive)           |
| `springHover` | `whileHover: { y: -2 }` with spring config     | Card, Button (elevated variant)              |

Add these to `packages/unified-ui/src/motion/presets.ts` and export from the barrel.

### 11.6 — Estimated Effort & Execution Order

| Batch                            | Components                                                    | Effort                         | Priority                   |
| -------------------------------- | ------------------------------------------------------------- | ------------------------------ | -------------------------- |
| **Batch A** — Overlays           | Dialog, Sheet, Dropdown, Popover, Tooltip, Select             | 3 days                         | P0 — highest visual impact |
| **Batch B** — Expand/Collapse    | Accordion, Alert (dismissible)                                | 1 day                          | P0                         |
| **Batch C** — Micro-Interactions | Button, Card, Badge, Avatar, Checkbox, Radio, Input, Textarea | 2 days                         | P1                         |
| **Batch D** — Nav & Data         | Pagination, Breadcrumb, Table, Skeleton, DataTable            | 2 days                         | P1                         |
| **New presets**                  | 9 new presets in motion/presets.ts                            | 1 day                          | P0 — blocks Batch A        |
| **Phase 10 components**          | Built with FM from day one (no retrofit needed)               | included in Phase 10 estimates | —                          |

**Total retrofit effort**: ~9 days for existing components + new presets.
**Execution order**: New presets → Batch A → Batch B → Batch C → Batch D.

---

## Component Development Order

Strict build sequence — each component may depend on the ones above it:

### Phase 5 — Core Components (Complete)

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

### Phase 10 — Extended Components (Planned)

| #   | Component        | Depends On               | Priority | Status  |
| --- | ---------------- | ------------------------ | -------- | ------- |
| 29  | Label            | Typography               | P1       | ✅ Done |
| 30  | FormField        | Label, Input, Textarea   | P1       | ✅ Done |
| 31  | Slider           | tokens                   | P1       | ☐       |
| 32  | Toggle           | tokens                   | P1       | ✅ Done |
| 33  | ToggleGroup      | Toggle                   | P1       | ✅ Done |
| 34  | ScrollArea       | tokens                   | P1       | ✅ Done |
| 35  | Collapsible      | motion                   | P1       | ✅ Done |
| 36  | Progress         | tokens                   | P1       | ✅ Done |
| 37  | Spinner          | tokens, motion           | P1       | ✅ Done |
| 38  | NavigationMenu   | Popover, Button          | P1       | ☐       |
| 39  | Sidebar          | Sheet, Button, Tooltip   | P1       | ☐       |
| 40  | CommandPalette   | Dialog, Input            | P1       | ☐       |
| 41  | ContextMenu      | DropdownMenu             | P1       | ☐       |
| 42  | Menubar          | DropdownMenu             | P1       | ☐       |
| 43  | Steps            | Typography, Divider      | P1       | ☐       |
| 44  | Calendar         | tokens, Button           | P1       | ☐       |
| 45  | DatePicker       | Popover, Calendar, Input | P1       | ☐       |
| 46  | NumberInput      | Input, Button            | P1       | ☐       |
| 47  | PinInput         | Input                    | P1       | ☐       |
| 48  | Combobox         | Popover, Input, Command  | P1       | ☐       |
| 49  | FileUpload       | Button, Card             | P1       | ☐       |
| 50  | ColorPicker      | Popover, Input           | P2       | ☐       |
| 51  | Tag              | Badge                    | P2       | ☐       |
| 52  | Kbd              | Typography               | P2       | ☐       |
| 53  | Code             | Typography               | P2       | ☐       |
| 54  | Callout          | Alert                    | P2       | ☐       |
| 55  | DataList         | Typography               | P2       | ☐       |
| 56  | Stat             | Typography, Card         | P2       | ☐       |
| 57  | Timeline         | Typography, Divider      | P2       | ☐       |
| 58  | EmptyState       | Typography, Button       | P2       | ☐       |
| 59  | HoverCard        | Popover                  | P2       | ☐       |
| 60  | AlertDialog      | Dialog, Button           | P2       | ☐       |
| 61  | Drawer           | Sheet                    | P2       | ☐       |
| 62  | Banner           | Alert, Button            | P2       | ☐       |
| 63  | Sonner           | Toast                    | P2       | ☐       |
| 64  | AspectRatio      | tokens                   | P2       | ☐       |
| 65  | Resizable        | tokens                   | P2       | ☐       |
| 66  | Carousel         | Button, motion           | P2       | ☐       |
| 67  | ImageGallery     | Dialog, Carousel         | P3       | ☐       |
| 68  | VideoPlayer      | tokens                   | P3       | ☐       |
| 69  | Chart            | Card, Typography         | P3       | ☐       |
| 70  | TreeView         | Collapsible, Checkbox    | P3       | ☐       |
| 71  | VirtualList      | ScrollArea               | P3       | ☐       |
| 72  | Markdown         | Typography, Code         | P3       | ☐       |
| 73  | CopyButton       | Button, Tooltip, Toast   | P3       | ☐       |
| 74  | ThemeToggle      | Button, DropdownMenu     | P3       | ☐       |
| 75  | VisuallyHidden   | tokens                   | P3       | ☐       |
| 76  | InputGroup       | Input, Button, Select    | P3       | ☐       |
| 77  | ConfirmDialog    | AlertDialog              | P3       | ☐       |
| 78  | SearchInput      | Input, Kbd               | P3       | ☐       |
| 79  | DataTableToolbar | Input, Select, Button    | P3       | ☐       |
| 80  | InfiniteScroll   | VirtualList, Spinner     | P3       | ☐       |

### Priority Key

- **P0**: Must have for MVP — blocks everything else
- **P1**: Core library — needed for most applications
- **P2**: Extended library — nice to have, build on demand
- **P3**: Compound / advanced — composed from lower-level primitives, build last

---

## Quick Reference: File Checklist

When building any new component, follow this checklist:

```
□ Create component file:       packages/unified-ui/src/components/{name}.tsx
□ Use "use client" directive
□ Import cn from:              @unified-ui/utils/cn
□ Import focus ring from:      @unified-ui/utils/focus-ring
□ All colors via:              bg-*, text-*, border-* (e.g. bg-primary, text-foreground)
□ All radii via:               rounded-*
□ All transitions via:         duration-*, ease-*
□ Forward ref:                 forwardRef<HTMLElement, Props>
□ Data attributes:             data-ds="" data-ds-component="{name}"
□ Focus ring:                  focusRingClasses from @unified-ui/utils/focus-ring
□ Disabled state:              disabled:pointer-events-none disabled:opacity-50
□ CVA for variants:            import { cva } from "class-variance-authority"
□ Framer Motion:               import { motion, AnimatePresence } from "framer-motion"
□ Motion presets:              import presets from "@unified-ui/motion" (NOT hardcoded values)
□ Reduced motion:              call useReducedMotion() or useMotion(preset) in every animated component
□ AnimatePresence:             wrap any mount/unmount content (overlays, toasts, alerts, dropdowns)
□ whileTap / whileHover:       add to all interactive elements (buttons, cards, toggles)
□ layout prop:                 use for position/size transitions (sliding indicators, accordions)
□ data-ds-animated:            add to animated wrapper elements for test selectors
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
| **Phase 10** — Extended Components    | 15 days  | Phase 5                   | ☐ Not started (52 components planned across 7 waves)       |
| **Phase 11** — Framer Motion (all)    | 9 days   | Phase 5, motion layer     | ☐ Not started (22 existing + 52 new components)            |

**Critical path (remaining)**: Phase 6.4–6.5 → Phase 9 (UI migration)

**Parallel work**: Phase 7.1 (motion polish), Phase 7.5 (contrast audit), and Phase 11 (Framer Motion retrofit) can happen alongside Phase 6.

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

_Last updated: 2025-07-13 (Phase 10 component roadmap added, Phase 11 Framer Motion integration plan added)_
_Design system: Unified UI v0.1.0_
_Package: `@work-rjkashyap/unified-ui` at `packages/unified-ui/`_
_Total components: 28 built + 52 planned = 80_
_Motion: 3/25 components use Framer Motion today → target 80/80 with Phase 11_
