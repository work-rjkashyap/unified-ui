// ============================================================================
// Unified UI — Motion Tokens
// ============================================================================
// Defines duration and easing curves for the Unified UI motion language.
// These tokens are consumed by the Framer Motion preset layer and by
// Tailwind CSS transition utilities.
//
// NEVER hardcode duration or easing values in components. All animation
// timing must reference these tokens to ensure consistent motion across
// the entire application.
//
// Design principles:
//   - Micro-interactions (hover, focus) use `fast` (100–150ms)
//   - Standard transitions (open/close, toggle) use `normal` (200ms)
//   - Emphasis animations (modals, page transitions) use `slow` (300ms)
//   - Orchestrated sequences may use `slower` (400ms) sparingly
//   - Easing follows Material-style naming: standard, decelerate, accelerate
// ============================================================================

// ---------------------------------------------------------------------------
// Durations
// ---------------------------------------------------------------------------
// All values in milliseconds (as numbers) for Framer Motion and as strings
// for CSS consumption.
// ---------------------------------------------------------------------------

export const duration = {
  /** Instant feedback — hover states, color changes */
  instant: 0,
  /** Micro-interactions — focus rings, icon swaps */
  fast: 100,
  /** Snappy transitions — tooltips, small toggles */
  moderate: 150,
  /** Standard transitions — dropdowns, accordions, tabs */
  normal: 200,
  /** Emphasis transitions — modals, drawers, slide-ins */
  slow: 300,
  /** Complex orchestrated animations — page transitions */
  slower: 400,
  /** Long-form animations — skeleton loaders, progress */
  slowest: 500,
} as const;

/** CSS-ready duration strings (e.g. "200ms") */
export const durationCSS = Object.fromEntries(
  Object.entries(duration).map(([key, value]) => [key, `${value}ms`]),
) as Record<keyof typeof duration, string>;

/** Framer Motion-ready duration values in seconds */
export const durationSeconds = Object.fromEntries(
  Object.entries(duration).map(([key, value]) => [key, value / 1000]),
) as Record<keyof typeof duration, number>;

// ---------------------------------------------------------------------------
// Easing Curves
// ---------------------------------------------------------------------------
// Defined as cubic-bezier arrays for Framer Motion and as CSS strings
// for Tailwind / inline styles.
//
// Naming convention:
//   standard    — symmetrical ease for general-purpose transitions
//   decelerate  — starts fast, ends slow (entering elements)
//   accelerate  — starts slow, ends fast (exiting elements)
//   emphasize   — exaggerated deceleration for attention-drawing motion
//   linear      — constant speed (progress bars, loaders)
// ---------------------------------------------------------------------------

export const easing = {
  /** General-purpose — equal acceleration and deceleration */
  standard: [0.2, 0.0, 0.38, 0.9] as const,
  /** Enter animations — element arriving on screen */
  decelerate: [0.0, 0.0, 0.2, 1.0] as const,
  /** Exit animations — element leaving the screen */
  accelerate: [0.4, 0.0, 1.0, 1.0] as const,
  /** Attention / emphasis — overshoots slightly for impact */
  emphasize: [0.0, 0.0, 0.15, 1.0] as const,
  /** Constant rate — spinners, progress bars */
  linear: [0.0, 0.0, 1.0, 1.0] as const,
  /** Spring-like snap — toggle switches, checkboxes */
  snap: [0.2, 0.0, 0.0, 1.0] as const,
} as const;

/** CSS-ready cubic-bezier strings */
export const easingCSS = Object.fromEntries(
  Object.entries(easing).map(([key, value]) => [
    key,
    `cubic-bezier(${value.join(", ")})`,
  ]),
) as Record<keyof typeof easing, string>;

// ---------------------------------------------------------------------------
// Spring Configurations (Framer Motion)
// ---------------------------------------------------------------------------
// For physics-based animations. These provide more natural-feeling motion
// than cubic-bezier curves for interactive elements.
// ---------------------------------------------------------------------------

export const spring = {
  /** Gentle — tooltips, small popovers */
  gentle: {
    type: "spring" as const,
    stiffness: 150,
    damping: 20,
    mass: 1,
  },
  /** Snappy — buttons, toggles, micro-interactions */
  snappy: {
    type: "spring" as const,
    stiffness: 300,
    damping: 25,
    mass: 0.8,
  },
  /** Bouncy — playful emphasis, celebrations */
  bouncy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 15,
    mass: 0.8,
  },
  /** Stiff — immediate, no overshoot (dialogs, drawers) */
  stiff: {
    type: "spring" as const,
    stiffness: 500,
    damping: 35,
    mass: 1,
  },
} as const;

// ---------------------------------------------------------------------------
// Stagger Timing
// ---------------------------------------------------------------------------
// Delays between children in orchestrated list / grid animations.
// ---------------------------------------------------------------------------

export const stagger = {
  /** Rapid list items — 30ms between each */
  fast: 0.03,
  /** Standard stagger — 50ms between each */
  normal: 0.05,
  /** Deliberate reveal — 80ms between each */
  slow: 0.08,
} as const;

// ---------------------------------------------------------------------------
// Type Exports
// ---------------------------------------------------------------------------

export type Duration = keyof typeof duration;
export type Easing = keyof typeof easing;
export type Spring = keyof typeof spring;
export type Stagger = keyof typeof stagger;
