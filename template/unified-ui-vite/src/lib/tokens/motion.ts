// ============================================================================
// Unified UI — Motion Tokens
// ============================================================================
// Core animation token layer. All motion values (durations, easings, springs,
// stagger timings) are defined here and consumed by the motion presets and
// component animations throughout the design system.
//
// NEVER hardcode animation values in components or presets. Always import
// from this file to ensure consistency across the entire application.
//
// Usage:
//   import { duration, durationSeconds, easing, spring, stagger } from "@/lib/tokens/motion";
// ============================================================================

import type { Transition } from "framer-motion";

// ---------------------------------------------------------------------------
// Duration Tokens
// ---------------------------------------------------------------------------
// Duration values in milliseconds (for CSS) and seconds (for Framer Motion).
// Based on Material Design / HIG guidelines, scaled to feel snappy but not
// jarring at typical screen sizes.
// ---------------------------------------------------------------------------

export type Duration = {
  /** 100ms — icon swaps, micro-feedback */
  fast: number;
  /** 150ms — small state changes, hover transitions */
  moderate: number;
  /** 200ms — standard transitions (default) */
  normal: number;
  /** 300ms — larger reveals, slide-ins */
  slow: number;
  /** 400ms — complex entrances, page-level transitions */
  slowest: number;
};

/** Duration values in milliseconds — for use with CSS `transition-duration` */
export const duration: Duration = {
  fast: 100,
  moderate: 150,
  normal: 200,
  slow: 300,
  slowest: 400,
};

/** Duration values as CSS strings — for direct use in style props */
export const durationCSS: Record<keyof Duration, string> = {
  fast: "100ms",
  moderate: "150ms",
  normal: "200ms",
  slow: "300ms",
  slowest: "400ms",
};

/** Duration values in seconds — for Framer Motion `transition.duration` */
export const durationSeconds: Record<keyof Duration, number> = {
  fast: 0.1,
  moderate: 0.15,
  normal: 0.2,
  slow: 0.3,
  slowest: 0.4,
};

// ---------------------------------------------------------------------------
// Easing Tokens
// ---------------------------------------------------------------------------
// Cubic bezier easing curves. Each curve is a [x1, y1, x2, y2] tuple
// compatible with CSS `cubic-bezier()` and Framer Motion's `ease` option.
//
// Naming follows Material Design motion vocabulary:
//   standard    — general-purpose: gentle in, gentle out
//   decelerate  — elements entering the screen (start fast, end slow)
//   accelerate  — elements leaving the screen (start slow, end fast)
//   linear      — constant speed (looping animations, spinners)
// ---------------------------------------------------------------------------

export type Easing = {
  /** General-purpose symmetric easing */
  standard: readonly [number, number, number, number];
  /** Entering elements — ease out (fast start, slow end) */
  decelerate: readonly [number, number, number, number];
  /** Exiting elements — ease in (slow start, fast end) */
  accelerate: readonly [number, number, number, number];
  /** Constant speed — for looping / continuous animations */
  linear: readonly [number, number, number, number];
};

export const easing: Easing = {
  standard: [0.4, 0.0, 0.2, 1.0],
  decelerate: [0.0, 0.0, 0.2, 1.0],
  accelerate: [0.4, 0.0, 1.0, 1.0],
  linear: [0.0, 0.0, 1.0, 1.0],
};

/** Easing values as CSS `cubic-bezier(...)` strings */
export const easingCSS: Record<keyof Easing, string> = {
  standard: "cubic-bezier(0.4, 0.0, 0.2, 1.0)",
  decelerate: "cubic-bezier(0.0, 0.0, 0.2, 1.0)",
  accelerate: "cubic-bezier(0.4, 0.0, 1.0, 1.0)",
  linear: "cubic-bezier(0.0, 0.0, 1.0, 1.0)",
};

// ---------------------------------------------------------------------------
// Spring Tokens
// ---------------------------------------------------------------------------
// Framer Motion spring transition configs. Springs produce physically-based
// motion that feels more natural than duration + easing for interactive
// elements like modals, drawers, tooltips, and buttons.
//
// Naming:
//   snappy  — fast, responsive (buttons, toggles, small UI)
//   gentle  — smooth, relaxed (panels, cards, overlays)
//   stiff   — quick settle with minimal bounce (modals, dialogs)
//   bouncy  — playful overshoot (success indicators, badges, icons)
// ---------------------------------------------------------------------------

export type Spring = {
  /** Fast, responsive — for buttons, toggles, badges */
  snappy: Transition;
  /** Smooth, relaxed — for panels, drawers, overlays */
  gentle: Transition;
  /** Quick settle, minimal bounce — for modals, dialogs */
  stiff: Transition;
  /** Playful overshoot — for success states, indicators */
  bouncy: Transition;
};

export const spring: Spring = {
  snappy: {
    type: "spring",
    stiffness: 500,
    damping: 35,
    mass: 0.5,
  },
  gentle: {
    type: "spring",
    stiffness: 200,
    damping: 28,
    mass: 0.8,
  },
  stiff: {
    type: "spring",
    stiffness: 600,
    damping: 40,
    mass: 0.6,
  },
  bouncy: {
    type: "spring",
    stiffness: 400,
    damping: 18,
    mass: 0.7,
  },
};

// ---------------------------------------------------------------------------
// Stagger Tokens
// ---------------------------------------------------------------------------
// Delay values in seconds for staggering child animations in a list or grid.
// Used with Framer Motion's `staggerChildren` in container variants.
// ---------------------------------------------------------------------------

export type Stagger = {
  /** 40ms between children — dense lists, rapid reveals */
  fast: number;
  /** 60ms between children — standard card grids, menus */
  normal: number;
  /** 100ms between children — hero sections, prominent lists */
  slow: number;
};

export const stagger: Stagger = {
  fast: 0.04,
  normal: 0.06,
  slow: 0.1,
};
