// ============================================================================
// Unified UI — Motion Hooks & Utilities
// ============================================================================
// React hooks and components for integrating the Unified UI motion system
// with runtime reduced-motion detection. These utilities ensure that all
// animated components gracefully degrade when the user has enabled
// `prefers-reduced-motion: reduce` in their OS settings.
//
// Architecture:
//   - `useReducedMotion()` — detects the user's motion preference
//   - `useMotion()` — selects full or reduced preset based on preference
//   - `useMotionProps()` — same as `useMotion` but returns spread-ready props
//   - `MotionSafe` — render-prop / children component that conditionally
//     renders animated vs. static content
//
// These hooks complement the CSS-level `prefers-reduced-motion` rule in
// `design-system.css` (which handles CSS animations/transitions). The hooks
// are specifically needed for Framer Motion animations, which use inline
// styles and are NOT affected by the CSS media query.
//
// Usage:
//   import { useMotion, useMotionProps, useReducedMotion, MotionSafe } from "@unified-ui/motion";
//
//   // Hook — get a motion-safe preset
//   const animation = useMotion(slideUp);
//   <motion.div variants={animation.variants} ... />
//
//   // Hook — get spread-ready props
//   <motion.div {...useMotionProps(fadeIn)} />
//
//   // Component — conditional rendering
//   <MotionSafe fallback={<div>{children}</div>}>
//     <motion.div {...motionProps(fadeIn)}>{children}</motion.div>
//   </MotionSafe>
// ============================================================================

"use client";

import { type ReactNode, useMemo, useSyncExternalStore } from "react";

import type { MotionPreset, MotionPropsResult } from "./presets";
import { motionProps, withReducedMotion } from "./presets";

// ---------------------------------------------------------------------------
// Media Query Singleton
// ---------------------------------------------------------------------------
// We use a module-level singleton for the `matchMedia` query so that
// multiple hook instances share a single event listener. This avoids
// creating N listeners for N components.
// ---------------------------------------------------------------------------

let mediaQuery: MediaQueryList | null = null;

function getMediaQuery(): MediaQueryList | null {
  if (typeof window === "undefined") return null;
  if (!mediaQuery) {
    mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  }
  return mediaQuery;
}

// Snapshot for useSyncExternalStore — returns current matches value
function getSnapshot(): boolean {
  const mq = getMediaQuery();
  return mq ? mq.matches : false;
}

// Server snapshot — assume no preference (animations enabled)
function getServerSnapshot(): boolean {
  return false;
}

// Subscribe to media query changes
function subscribe(callback: () => void): () => void {
  const mq = getMediaQuery();
  if (!mq) return () => {};

  // Modern browsers support addEventListener on MediaQueryList
  mq.addEventListener("change", callback);
  return () => {
    mq.removeEventListener("change", callback);
  };
}

// ---------------------------------------------------------------------------
// useReducedMotion
// ---------------------------------------------------------------------------
// Reactive hook that tracks the user's `prefers-reduced-motion` setting.
// Returns `true` when the user prefers reduced motion, `false` otherwise.
//
// Uses `useSyncExternalStore` for tear-free reads that work with React 18+
// concurrent features and SSR.
//
// @example
//   const prefersReduced = useReducedMotion();
//   if (prefersReduced) {
//     // skip animation or use a simpler one
//   }
// ---------------------------------------------------------------------------

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// ---------------------------------------------------------------------------
// useMotion
// ---------------------------------------------------------------------------
// Returns a motion-safe version of the given preset. When the user prefers
// reduced motion, the preset is replaced with a simple opacity-only fade
// (via `reduceMotion()`). When motion is allowed, the original preset is
// returned unchanged.
//
// This is the primary hook for using motion presets in components that
// animate with Framer Motion (inline styles, not CSS).
//
// @param preset - The full-motion preset to use when motion is allowed
// @returns The preset to use (full or reduced based on user preference)
//
// @example
//   import { useMotion } from "@unified-ui/motion";
//   import { slideUp } from "@unified-ui/motion";
//
//   function MyComponent() {
//     const animation = useMotion(slideUp);
//     return (
//       <motion.div
//         variants={animation.variants}
//         initial="initial"
//         animate="animate"
//         exit="exit"
//         transition={animation.transition}
//       >
//         Content
//       </motion.div>
//     );
//   }
// ---------------------------------------------------------------------------

export function useMotion(preset: MotionPreset): MotionPreset {
  const prefersReduced = useReducedMotion();
  return useMemo(
    () => withReducedMotion(preset, prefersReduced),
    [preset, prefersReduced],
  );
}

// ---------------------------------------------------------------------------
// useMotionProps
// ---------------------------------------------------------------------------
// Convenience hook that combines `useMotion()` with `motionProps()` to
// return an object that can be spread directly onto a `motion.*` component.
//
// @param preset - The full-motion preset to use when motion is allowed
// @returns Spread-ready props: { variants, initial, animate, exit }
//
// @example
//   import { useMotionProps } from "@unified-ui/motion";
//   import { fadeIn } from "@unified-ui/motion";
//
//   function FadeInCard({ children }) {
//     return <motion.div {...useMotionProps(fadeIn)}>{children}</motion.div>;
//   }
// ---------------------------------------------------------------------------

export function useMotionProps(preset: MotionPreset): MotionPropsResult {
  const safePreset = useMotion(preset);
  return useMemo(() => motionProps(safePreset), [safePreset]);
}

// ---------------------------------------------------------------------------
// useMotionValue — conditional spring config
// ---------------------------------------------------------------------------
// Returns a spring configuration that respects reduced motion. When the
// user prefers reduced motion, returns an instant (no-spring) config.
// Use this for Framer Motion's `useSpring` where you need to conditionally
// disable the spring animation.
//
// @example
//   const springConfig = useMotionSpringConfig({ stiffness: 400, damping: 30 });
//   const x = useSpring(motionValue, springConfig);
// ---------------------------------------------------------------------------

export interface SpringConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
  duration?: number;
}

const INSTANT_SPRING: SpringConfig = {
  stiffness: 10000,
  damping: 10000,
  mass: 0.01,
};

export function useMotionSpringConfig(config: SpringConfig): SpringConfig {
  const prefersReduced = useReducedMotion();
  return useMemo(
    () => (prefersReduced ? INSTANT_SPRING : config),
    [prefersReduced, config],
  );
}

// ---------------------------------------------------------------------------
// MotionSafe — Conditional Render Component
// ---------------------------------------------------------------------------
// A component that conditionally renders its children based on the user's
// motion preference. When motion is allowed, renders `children`. When
// reduced motion is preferred, renders `fallback` instead.
//
// This is useful when you want to render a completely different tree
// (e.g., static content vs. animated content) rather than just swapping
// animation parameters.
//
// @example
//   <MotionSafe
//     fallback={<div className="opacity-100">{content}</div>}
//   >
//     <motion.div {...motionProps(fadeIn)}>{content}</motion.div>
//   </MotionSafe>
//
//   // Or with render function:
//   <MotionSafe>
//     {(prefersReduced) =>
//       prefersReduced
//         ? <div>{content}</div>
//         : <motion.div {...motionProps(slideUp)}>{content}</motion.div>
//     }
//   </MotionSafe>
// ---------------------------------------------------------------------------

export interface MotionSafeProps {
  /**
   * Content to render when motion is allowed.
   * Can be a ReactNode or a render function that receives the
   * `prefersReduced` boolean.
   */
  children: ReactNode | ((prefersReduced: boolean) => ReactNode);

  /**
   * Content to render when the user prefers reduced motion.
   * Only used when `children` is a ReactNode (not a render function).
   * If not provided and children is a ReactNode, children are rendered
   * regardless (you should use `useMotion` inside instead).
   */
  fallback?: ReactNode;
}

export function MotionSafe({ children, fallback }: MotionSafeProps): ReactNode {
  const prefersReduced = useReducedMotion();

  // Render function pattern
  if (typeof children === "function") {
    return children(prefersReduced);
  }

  // Static children with fallback
  if (prefersReduced && fallback !== undefined) {
    return fallback;
  }

  return children;
}
