# Unified UI Changelog
All notable changes to the Unified UI design system will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
---
## [Unreleased]
### Planned
- Migration guide — mapping from legacy `--ds-*` tokens to new plain `--*` tokens
- `UnifiedUIProvider` component for optional auto CSS injection
- Component tests with Vitest + Testing Library
---

## [0.2.1] — 2026-03-06
### Fixed
- **CLI: Registry URL** — Fixed the hardcoded registry base URL in the CLI from `unified-ui.vercel.app` (a different, unrelated Vercel project) to the correct `unified-ui-rajeshwar.vercel.app`. This caused `npx @work-rjkashyap/unified-ui add <component>` to fail with a 404 error for all users of the published npm package.
- **CLI: `$schema` URL** — Updated the default `$schema` reference in `unified-ui.json` config to point to the correct registry domain.

### Changed
- **Homepage text sizes** — Increased font sizes across all homepage sections (Hero, Features, Showcase, Testimonials/Why, CTA, Footer) for improved readability. Bumped headings, descriptions, card titles, labels, code blocks, and stat numbers up by roughly one Tailwind size step (e.g. `text-[10px]` → `text-xs`, `text-xs` → `text-sm`, `text-sm` → `text-base`).

### Added
- **Automated changelog generation** — Added GitHub Actions workflow (`.github/workflows/changelog.yml`) that auto-generates changelog entries from Conventional Commit messages on every push to `main`. Uses `git-cliff` to parse `feat:`, `fix:`, `refactor:`, `chore:` prefixes and appends to `CHANGELOG.md`.

---

## [0.2.0] — 2026-03-05
### Added
#### 40 New Components
- **AlertDialog** — Radix-based modal confirmation dialog with composable header/body/footer
- **AspectRatio** — Radix-based responsive aspect-ratio container
- **Banner** — Full-width notification banner with variants
- **Calendar** — Date calendar component for date selection
- **Callout** — Highlighted contextual message block with icon support
- **Carousel** — Scrollable content carousel with navigation controls
- **Code** — Styled code block with syntax formatting
- **Collapsible** — Radix-based expandable/collapsible content region
- **Combobox** — Searchable dropdown with keyboard navigation and filtering
- **Command** — Command palette / search interface (cmdk-style)
- **ConfirmDialog** — Simplified confirmation dialog with accept/cancel actions
- **ContextMenu** — Radix-based right-click context menu with items, sub-menus, and shortcuts
- **CopyButton** — Click-to-copy button with success feedback
- **DataList** — Key-value display list for structured data
- **DatePicker** — Calendar-powered date input with popover picker
- **EmptyState** — Placeholder for empty content areas with icon, title, description, and action
- **FileUpload** — Drag-and-drop file upload zone with file list management
- **FormField** — Form field wrapper with label, description, error message, and validation state
- **HoverCard** — Radix-based hover-triggered floating card
- **InputGroup** — Grouped input with addon/prefix/suffix slots
- **Kbd** — Keyboard shortcut key display
- **Label** — Standalone form label component (extracted from primitives)
- **Menubar** — Radix-based horizontal menu bar with dropdowns, checkbox items, and radio items
- **NavigationMenu** — Radix-based site navigation with flyout content panels
- **NumberInput** — Numeric input with increment/decrement controls
- **PinInput** — Multi-digit OTP / PIN code input with auto-focus advancement
- **Progress** — Determinate and indeterminate progress bar with label
- **Resizable** — Resizable panel layout powered by `react-resizable-panels`
- **ScrollArea** — Radix-based custom scrollbar container (vertical + horizontal)
- **SearchInput** — Input with search icon, clear button, and keyboard shortcut hint
- **Sidebar** — Collapsible application sidebar with sections, items, and nested groups
- **Slider** — Radix-based range slider with single and multi-thumb support
- **Spinner** — Loading spinner with size variants
- **Stat** — Statistic display with label, value, and trend indicator
- **Steps** — Multi-step progress indicator with vertical/horizontal orientation
- **Tag** — Compact label/tag with removable action
- **Timeline** — Vertical timeline with customizable markers and connectors
- **Toggle** — Radix-based toggle button with multiple visual variants, sizes, and icon support
- **ToggleGroup** — Radix-based single/multi toggle group with shared styling
- **VisuallyHidden** — Accessible screen-reader-only content wrapper

#### 13 New Motion Presets
- **`shakeX`** — Horizontal shake for invalid input feedback
- **`springHover`** — Spring-based hover micro-interaction
- **`springPress`** — Spring-based press micro-interaction
- **`countUp`** — Animated number count-up
- **`crossfade`** — Crossfade transition between elements
- **`dragDismiss`** — Drag-to-dismiss gesture preset
- **`numberRoll`** — Rolling number transition
- **`revealMask`** — Mask-based content reveal
- **`slidePanelTop`** — Directional slide panel from top
- **`slidePanelBottom`** — Directional slide panel from bottom
- **`slidePanelLeft`** — Directional slide panel from left
- **`slidePanelRight`** — Directional slide panel from right

### Changed
#### Component Refactors
- **Accordion** — Major rewrite with improved variant composition and accessibility
- **Breadcrumb** — Refactored with enhanced composability and truncation logic
- **Button** — Expanded with new variants and improved styles (618 lines changed)
- **Card** — Restructured composable sub-components
- **Checkbox** — Overhauled with `CheckboxGroup` improvements
- **DataTable** — Major refactor with enhanced filtering, sorting, and pagination (3480 lines changed)
- **Dialog** — Restructured with improved sizing and scroll behavior
- **DropdownMenu** — Refactored sub-component exports and styling
- **Input** — Enhanced with new slot patterns and error states
- **Pagination** — Rewritten with improved responsive behavior
- **Popover** — Cleaned up code structure and formatting
- **Radio** — Refactored `RadioGroup` / `RadioGroupItem` / `RadioCard` styling
- **Select** — Updated compositional sub-component pattern
- **Sheet** — Improved directional slide-out behavior
- **Switch** — Enhanced with new size and label options
- **Table** — Expanded density and styling options
- **Tabs** — Reworked variant composition for underline/segment/pills
- **Textarea** — Improved auto-resize and character count logic
- **Toast** — Major refactor with improved stacking and animations (1209 lines changed)

#### Code Cleanup
- Cleaned up formatting and structure in **NavigationMenu**, **Popover**, and **ScrollArea** components
- Updated `styles.css` with restructured CSS custom properties and new token categories
- Improved `tokens/colors.ts` with expanded palette definitions
- Updated `utils/contrast.ts` with refined WCAG checking utilities
- Updated `motion/presets.ts` — `reduceMotion()` signature cleaned up (unused parameter prefixed with `_`)

#### Other
- Updated `UNIFIED_UI_VERSION` exported constant from `"0.1.2"` to `"0.2.0"`
- Component count increased from 23 to 63+
- Barrel exports in `components/index.ts` and `src/index.ts` expanded for all new components
---
## [0.1.2] — 2026-03-03
### Added
#### Theme Customizer System
- **`ThemeCustomizerProvider`** — React context provider for runtime theme management with `localStorage` persistence and cross-tab sync via `StorageEvent`
- **`useThemeCustomizer()`** — hook exposing `config`, `setColorPreset`, `setRadius`, `setFont`, `setShadow`, `setSurfaceStyle`, `resetConfig`, `isDefault`, `generateCSS`
- **`ThemeCustomizer`** — drop-in UI component with color swatch picker, radius preview, font preview, shadow/surface style toggles, "Copy CSS" button, and reset
- **13 color presets**: 5 neutral (`Zinc`, `Slate`, `Gray`, `Stone`, `Neutral`) + 8 chromatic (`Blue`, `Green`, `Violet`, `Rose`, `Orange`, `Red`, `Teal`, `Brand`)
- **7 radius presets**: None (0px) through XL (16px), default 10px
- **5 font presets**: Outfit, Inter, System, Serif, Mono
- **4 shadow presets**: None, Subtle, Default, Heavy (each with light/dark scales)
- **3 surface style presets**: Bordered, Elevated, Mixed
- `ThemeConfig` type, `DEFAULT_THEME_CONFIG`, `buildThemeOverrides()`, `generateThemeCSS()` utilities
- `COLOR_PRESET_KEYS`, `COLOR_PRESETS`, `getColorPreset`, `getFontPreset`, `getRadiusPreset`, `getShadowPreset` helpers
- Exported types: `ColorPreset`, `ColorPresetKey`, `FontPreset`, `RadiusPreset`, `ShadowPreset`, `SurfaceStylePreset`, `PresetSemanticColors`, `ThemeCustomizerContextValue`, `ThemeCustomizerProps`, `ThemeCustomizerProviderProps`
#### New Tokens
- `neutral` color palette added to `tokens/colors`
- New CSS custom properties: `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--accent`, `--accent-foreground`, `--destructive`, `--destructive-foreground`, `--ring`, `--radius`, `--chart-1` through `--chart-5`, `--sidebar-*` (8 tokens)
#### Select Sub-component Exports
- Newly exported: `SelectContent`, `SelectContentProps`, `SelectTrigger`, `SelectTriggerProps`, `SelectValue`, `SelectScrollUpButton`, `SelectScrollUpButtonProps`, `SelectScrollDownButton`, `SelectScrollDownButtonProps`
### Changed
#### Color Format: RGB → oklch
- All color tokens migrated from RGB channel strings (e.g. `"79 70 229"`) to complete `oklch()` values (e.g. `"oklch(0.585 0.233 277.117)"`)
- Affects all palettes: `slate`, `gray`, `zinc`, `brand`, `blue`, `green`, `red`, `amber`, `teal`
- Semantic colors (light + dark) updated to use oklch values
- Shadow tokens updated from `rgba()` to `oklch()` syntax
- `dsColorVar()` now returns `var(--{name})` and uses `color-mix(in oklch, ...)` for alpha variants instead of `rgb(... / alpha)`
#### CSS Variable Prefix Removal (`--ds-*` → `--*`)
- Removed the `PREFIX` constant from `contract.ts`
- All CSS custom properties simplified: `--ds-color-primary` → `--primary`, `--ds-radius-md` → `--radius-md`, `--ds-shadow-lg` → `--shadow-lg`, `--ds-z-modal` → `--z-modal`, `--ds-duration-fast` → `--duration-fast`, `--ds-easing-standard` → `--easing-standard`, `--ds-font-sans` → `--font-sans`
- All Tailwind utility classes updated: `bg-ds-primary` → `bg-primary`, `text-ds-foreground` → `text-foreground`, `rounded-ds-md` → `rounded-md`, etc.
- All 25 components, 3 primitives, and all utilities updated for the new naming
#### Focus Ring System Overhaul
- Redesigned from ring-based (`focus-visible:ring-2 focus-visible:ring-ds-focus-ring focus-visible:ring-offset-2`) to border-based (`focus-visible:border-border-strong`) focus indicators
- All focus ring variants updated: `focusRingClasses`, `focusRingInsetClasses`, `focusRingCompactClasses`, `focusWithinRingClasses`, `focusRingGroupRingClasses`, `focusRingGroupTriggerClasses`
#### Component Updates
- **Button** — Added `not-prose no-underline` to base styles to prevent prose typography overrides on `<a>` buttons
- **Select** — Refactored to compositional sub-component pattern; removed `SelectProps` type (use sub-component props instead)
- **DropdownMenu** — Major refactor (618 lines changed)
- **Popover** — Major refactor (332 lines changed)
- **DataTable** — Updated for new token naming and focus styles
#### Other
- Updated `UNIFIED_UI_VERSION` exported constant from `"0.1.1"` to `"0.1.2"`
- `@theme` block in `styles.css` completely rewritten with plain `--{name}` properties and new token categories
- `dsVar()` now generates `--{category}-{name}` (was `--ds-{category}-{name}`)
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
