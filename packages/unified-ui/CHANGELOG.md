# Unified UI Changelog

All notable changes to the Unified UI design system will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned

- Documentation site overhaul (Phase 6) — MDX pages with interactive component previews
- Motion & accessibility hardening (Phase 7) — focus ring standardization, WCAG AA contrast audit, `prefers-reduced-motion` audit
- Migration guide (Phase 9) — mapping from legacy `fd-*` tokens to unified tokens, component replacement strategy
- CI/CD pipeline for automated publishing on git tags
- `UnifiedUIProvider` component for optional auto CSS injection
- Component tests with Vitest + Testing Library

---

## [0.1.1] — 2026-02-28

### Added

#### DataTable Component

- **DataTable** — Full-featured data table powered by TanStack Table (`@tanstack/react-table` ≥ 8.0.0)
  - Column sorting, filtering (text + faceted), row selection, column visibility toggles
  - Built-in pagination with configurable page sizes
  - `useDataTable` hook for headless table state management
  - `createColumnHelper` re-export for type-safe column definitions
  - Exported types: `DataTableProps`, `DataTableColumnMeta`, `DataTableFacetedFilter`, `UseDataTableOptions`, `UseDataTableReturn`, `ColumnDef`, `ColumnFiltersState`, `PaginationState`, `Row`, `RowSelectionState`, `SortingState`, `VisibilityState`
  - `@tanstack/react-table` added as an optional peer dependency

#### Motion Hooks

- `useMotion()` — hook for accessing motion presets with reduced-motion awareness
- `useMotionProps()` — hook that returns spread-ready motion props
- `useMotionSpringConfig()` — hook for accessing spring configuration tokens
- `useReducedMotion()` — hook for detecting `prefers-reduced-motion` user preference
- `MotionSafe` — wrapper component that conditionally renders motion based on user preference

### Changed

- Updated `UNIFIED_UI_VERSION` exported constant from `"0.1.0"` to `"0.1.1"`
- Component count updated from 22 to 23 across documentation and metadata
- Package description updated to reflect 23+ components

### Fixed

- Removed self-referential dependency (`@work-rjkashyap/unified-ui` depending on itself) from `package.json`
- Added missing `homepage` and `bugs` fields to `package.json`
- Added `funding` field to `package.json`
- Expanded `keywords` in `package.json` for better npm discoverability (`tailwind-css-v4`, `design-tokens`, `css-variables`, `theming`, `dark-mode`, `typescript`, `tree-shakeable`)

---

## [0.1.0] — 2026-02-27

### Added

#### Design Tokens

- Color palettes: `slate`, `gray`, `zinc`, `neutral`, `red`, `green`, `blue`, `amber`, `teal`, `brand`, `pure`
- Semantic color mappings for light and dark themes (`semanticLight`, `semanticDark`)
- Spacing scale (0–96 + custom values)
- Typography tokens: `fontFamily` (display, sans, serif, mono, inherit), `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, typography variant presets
- Radius scale (`none` through `full`)
- Shadow scale with light and dark variants
- Z-index scale (`hide`, `base`, `dropdown`, `sticky`, `overlay`, `modal`, `popover`, `toast`, `max`)
- Motion tokens: `duration`, `easing`, `spring`, `stagger` (with CSS and seconds variants)

#### Theme System

- CSS variable contract mapping all tokens to plain CSS custom properties
- `DSThemeProvider` component with light/dark/system mode support
- `useDSTheme()` hook for programmatic theme access
- `buildLightThemeVars()` / `buildDarkThemeVars()` / `buildThemeCSS()` utilities
- `cssVar()` helper for type-safe CSS variable references

#### Typography System

- Multi-font architecture with four font families:
  - **Outfit** (`--font-outfit`) — primary sans-serif UI typeface
  - **Inter** (`--font-inter`) — display / headings
  - **Lora** (`--font-lora`) — serif / editorial
  - **JetBrains Mono** (`--font-jetbrains`) — monospace / code
- `font` prop on `Typography` component for runtime font switching
- Graceful fallback to system font stacks when web fonts are unavailable

#### Tailwind CSS v4 Integration

- `styles.css` with full `@theme` block mapping all tokens to Tailwind utilities
- Direct Tailwind utilities for colors, radius, shadows, transitions, fonts (no prefix)
- Font CSS custom properties (`--font-outfit`, `--font-inter`, `--font-lora`, `--font-jetbrains`)

#### Primitive Components

- **Typography** — polymorphic text component with `variant`, `font`, `color`, `align`, `truncate` props
- **Heading** — semantic heading (h1–h6) with automatic size mapping
- **Subheading** — secondary heading variant
- **Body** — paragraph text with size variants
- **Caption** — small supporting text
- **Label** — form label with required indicator support
- **Overline** — uppercase label text
- **InlineCode** — inline code formatting
- **Container** — responsive max-width wrapper (`sm` through `2xl`)
- **Stack** — flexbox layout with `direction`, `gap`, `align`, `justify`
- **Grid** — CSS grid layout with responsive column configuration
- **Divider** — horizontal/vertical separator with label support

#### Composite Components (22 total)

- **Button** — primary, secondary, outline, ghost, danger, link variants; sm/md/lg sizes; icon-only mode; loading state
- **Input** — text input with prefix/suffix slots, error state, disabled state
- **Textarea** — auto-resize support, character count, error state
- **Select** — Radix-based with groups, labels, separators; searchable variant
- **Checkbox** — with `CheckboxGroup` for managing groups; indeterminate state
- **Radio** — `RadioGroup` + `RadioGroupItem` + `RadioCard` variant
- **Switch** — toggle with label positioning (start/end), sizes
- **Card** — composable `Card` / `CardHeader` / `CardBody` / `CardFooter`; elevated, outline, ghost variants
- **Badge** — default, secondary, outline, success, warning, danger variants; sm/md/lg sizes
- **Avatar** — image with fallback initials, status indicator, `AvatarGroup` stacking
- **Tooltip** — Radix-based with configurable side, align, delay
- **Popover** — Radix-based with arrow, close button, controlled/uncontrolled
- **DropdownMenu** — full Radix menu with items, checkbox items, radio items, sub-menus, shortcuts
- **Dialog** — modal with sm/md/lg/xl/full sizes; composable header/body/footer; scroll locking
- **Sheet** — slide-out drawer from top/right/bottom/left; sm/md/lg/xl sizes
- **Tabs** — underline, segment, pills variants; horizontal/vertical orientation
- **Accordion** — single/multiple mode; default/bordered/ghost variants; sm/md/lg sizes
- **Toast** — portal-based with stacking, auto-dismiss, pause-on-hover, progress bar, `useToast()` hook
- **Alert** — info, success, warning, error variants with icon, title, description
- **Skeleton** — base `Skeleton` + `SkeletonText`, `SkeletonCircle`, `SkeletonRect` presets; pulse animation
- **Table** — semantic table with striped rows, hover highlight, sticky header, responsive wrapper; compact/default/relaxed density
- **Pagination** — page numbers with ellipsis, prev/next, compact variant, controlled/uncontrolled
- **Breadcrumb** — composable sub-components + `BreadcrumbNav` shorthand; truncation with ellipsis

#### Motion System

- Fade presets: `fadeIn`, `fadeInFast`, `fadeInSlow`
- Slide presets: `slideUp`, `slideUpSm`, `slideUpLg`, `slideUpSpring`, `slideDown`, `slideDownSm`, `slideLeft`, `slideRight`, `slideInFromLeft`, `slideInFromRight`, `slideInFromBottom`
- Scale presets: `scaleIn`, `scaleInLg`, `scaleInSpring`
- Blur presets: `blurIn`, `blurInSubtle`
- Overlay/modal: `overlayBackdrop`, `modalContent`, `modalContentSpring`
- Toast: `toastSlideIn`, `toastSlideUp`
- Expand/collapse: `expandHeight`, `expandHeightSlow`
- Micro-interactions: `press`, `tapScale`, `hoverScale`, `hoverLift`, `pop`, `popSubtle`
- Loading: `pulse`, `spin`
- Stagger containers: `staggerContainer`, `staggerContainerFast`, `staggerContainerSlow`
- `motionProps()` spread helper for clean JSX usage
- `reduceMotion` / `withReducedMotion()` utilities for `prefers-reduced-motion` support

#### Utilities

- `cn()` — class name merger (clsx + tailwind-merge)
- `mergeSlots()` — slot-based class merging for composite components
- `composeRefs()` — compose multiple React refs into one
- `dsAttr()` / `dsDataAttrs()` — data attribute generators for component identification
- `dsStateAttr()` — conditional data attribute for component states
- `dsVar()` / `dsColorVar()` — CSS custom property reference helpers
- `typedKeys()` — type-safe `Object.keys`
- `noop` — no-operation function
- Focus ring utilities: `focusRingClasses`, `focusRingInsetClasses`, `focusRingCompactClasses`, `focusWithinRingClasses`, `focusRingGroupRingClasses`, `focusRingGroupTriggerClasses`, `focusRingVariantOverrides`
- WCAG contrast checking: `checkHexContrast`, `checkDSContrast`, `auditContrast`, `contrastRatio`, `relativeLuminance`, `meetsAA`, `meetsAAA`, `meetsNonTextAA`, `parseHex`, `parseRGBString`, `toRGBString`
- Polymorphic component types: `AsProp`, `PolymorphicProps`, `PolymorphicPropsWithRef`, `PolymorphicRef`, `PolymorphicComponent`
- Slot types: `SlotClasses`, `SlotConfig`, `SlotDefinition`, `SlotRenderFn`, `Slots`
- Component types: `ComponentSize`, `ComponentIntent`, `ChildrenProps`, `OptionalChildrenProps`

#### Package & Build

- `tsup` build pipeline producing ESM (`.mjs`) and CJS (`.cjs`) with TypeScript declarations (`.d.ts` / `.d.cts`)
- 7 entry points: `index`, `tokens`, `theme`, `primitives`, `components`, `motion`, `utils`
- Selective `"use client"` directive — applied only to client entry points (not tokens/utils)
- Radix UI packages externalized as optional peer dependencies
- Tree-shakeable with code splitting enabled
- `styles.css` exported as `@work-rjkashyap/unified-ui/styles.css` for Tailwind `@theme` integration
- `@unified-ui/*` TypeScript path aliases (zero relative cross-directory imports)

#### Infrastructure

- `UNIFIED_UI_VERSION` exported constant for runtime version checking
- `.npmignore` for clean package distribution
- `sideEffects` field for optimal tree-shaking
- Conditional `exports` map with full `import`/`require`/`types` resolution
- `typesVersions` fallback for older TypeScript resolvers

---

_Design system: Unified UI_
_Maintainer: Rajeshwar Kashyap_
_Repository: [github.com/imrj05/unified-ui](https://github.com/imrj05/unified-ui)_
