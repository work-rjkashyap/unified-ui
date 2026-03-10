// ============================================================================
// Unified UI — Motion Presets
// ============================================================================
// Reusable Framer Motion animation presets built on top of the Unified UI
// motion tokens (duration, easing, spring configurations). These presets
// provide a consistent motion language across the entire application.
//
// Each preset exports a Framer Motion `Variants` object with `initial`,
// `animate`, and `exit` states, plus a `transition` configuration derived
// from the token layer.
//
// NEVER hardcode animation values in components. Always use these presets
// or compose new ones from the motion tokens.
//
// Usage:
//   import { fadeIn, slideUp } from "@/design-system/motion/presets";
//
//   <motion.div variants={fadeIn} initial="initial" animate="animate" exit="exit">
//     ...
//   </motion.div>
//
//   // Or use the spread helper:
//   <motion.div {...motionProps(fadeIn)}>...</motion.div>
// ============================================================================

import type { TargetAndTransition, Transition, Variants } from "framer-motion";
import {
  durationSeconds,
  easing,
  spring,
  stagger as staggerTokens,
} from "../tokens/motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MotionPreset {
  variants: Variants;
  transition: Transition;
}

export interface MotionPropsResult {
  variants: Variants;
  initial: string;
  animate: string;
  exit: string;
}

// ---------------------------------------------------------------------------
// Helper: Build transition from tokens
// ---------------------------------------------------------------------------

type EasingTuple = [number, number, number, number];

function buildTransition(
  duration: number,
  easingCurve: readonly [number, number, number, number],
): Transition {
  return {
    duration,
    ease: [...easingCurve] as EasingTuple,
  };
}

// ---------------------------------------------------------------------------
// Spread Helper
// ---------------------------------------------------------------------------
// Converts a MotionPreset into props that can be spread directly onto a
// motion component. Saves boilerplate in consumer code.
//
//   <motion.div {...motionProps(fadeIn)} />
// ---------------------------------------------------------------------------

export function motionProps(preset: MotionPreset): MotionPropsResult {
  return {
    variants: preset.variants,
    initial: "initial",
    animate: "animate",
    exit: "exit",
  };
}

// ---------------------------------------------------------------------------
// Preset: Fade In
// ---------------------------------------------------------------------------
// Simple opacity transition. Use for elements that appear without movement.
// Best for: overlays, backdrop fades, subtle content reveals.
// ---------------------------------------------------------------------------

export const fadeIn: MotionPreset = {
  variants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  transition: buildTransition(durationSeconds.normal, easing.standard),
};

export const fadeInSlow: MotionPreset = {
  variants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  transition: buildTransition(durationSeconds.slow, easing.decelerate),
};

export const fadeInFast: MotionPreset = {
  variants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  transition: buildTransition(durationSeconds.fast, easing.standard),
};

// ---------------------------------------------------------------------------
// Preset: Scale In
// ---------------------------------------------------------------------------
// Scales from a slightly smaller size while fading in. Use for elements
// that need to "pop" into view from their center point.
// Best for: modals, dialogs, tooltips, popovers, toasts.
// ---------------------------------------------------------------------------

export const scaleIn: MotionPreset = {
  variants: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  transition: buildTransition(durationSeconds.normal, easing.decelerate),
};

export const scaleInSpring: MotionPreset = {
  variants: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  transition: spring.snappy,
};

export const scaleInLg: MotionPreset = {
  variants: {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.85 },
  },
  transition: buildTransition(durationSeconds.slow, easing.decelerate),
};

// ---------------------------------------------------------------------------
// Preset: Slide Up
// ---------------------------------------------------------------------------
// Slides in from below while fading. The most common entrance animation.
// Best for: cards, list items, page sections, bottom sheets.
// ---------------------------------------------------------------------------

export const slideUp: MotionPreset = {
  variants: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 16 },
  },
  transition: buildTransition(durationSeconds.normal, easing.decelerate),
};

export const slideUpSm: MotionPreset = {
  variants: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 8 },
  },
  transition: buildTransition(durationSeconds.moderate, easing.decelerate),
};

export const slideUpLg: MotionPreset = {
  variants: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 24 },
  },
  transition: buildTransition(durationSeconds.slow, easing.decelerate),
};

export const slideUpSpring: MotionPreset = {
  variants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  transition: spring.gentle,
};

// ---------------------------------------------------------------------------
// Preset: Slide Down
// ---------------------------------------------------------------------------
// Slides in from above while fading. Use for dropdown menus, notification
// banners, and elements that descend from a trigger.
// Best for: dropdowns, notifications, top-anchored panels.
// ---------------------------------------------------------------------------

export const slideDown: MotionPreset = {
  variants: {
    initial: { opacity: 0, y: -16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
  },
  transition: buildTransition(durationSeconds.normal, easing.decelerate),
};

export const slideDownSm: MotionPreset = {
  variants: {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  },
  transition: buildTransition(durationSeconds.moderate, easing.decelerate),
};

// ---------------------------------------------------------------------------
// Preset: Slide Left / Right
// ---------------------------------------------------------------------------
// Horizontal slide animations for side panels, drawers, and carousel-like
// transitions.
// Best for: drawers, side panels, slide-over navigation.
// ---------------------------------------------------------------------------

export const slideLeft: MotionPreset = {
  variants: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  transition: buildTransition(durationSeconds.normal, easing.decelerate),
};

export const slideRight: MotionPreset = {
  variants: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  transition: buildTransition(durationSeconds.normal, easing.decelerate),
};

export const slideInFromRight: MotionPreset = {
  variants: {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100%" },
  },
  transition: buildTransition(durationSeconds.slow, easing.decelerate),
};

export const slideInFromLeft: MotionPreset = {
  variants: {
    initial: { opacity: 0, x: "-100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" },
  },
  transition: buildTransition(durationSeconds.slow, easing.decelerate),
};

export const slideInFromBottom: MotionPreset = {
  variants: {
    initial: { opacity: 0, y: "100%" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" },
  },
  transition: buildTransition(durationSeconds.slow, easing.decelerate),
};

// ---------------------------------------------------------------------------
// Preset: Expand / Collapse (Height)
// ---------------------------------------------------------------------------
// Animates height from 0 to auto. Use for accordions, collapsible panels,
// and expandable sections. Note: Framer Motion handles `height: "auto"`
// natively — no JS measurement hacks needed.
// Best for: accordions, expandable sections, detail disclosures.
// ---------------------------------------------------------------------------

export const expandHeight: MotionPreset = {
  variants: {
    initial: { opacity: 0, height: 0, overflow: "hidden" },
    animate: { opacity: 1, height: "auto", overflow: "hidden" },
    exit: { opacity: 0, height: 0, overflow: "hidden" },
  },
  transition: buildTransition(durationSeconds.normal, easing.standard),
};

export const expandHeightSlow: MotionPreset = {
  variants: {
    initial: { opacity: 0, height: 0, overflow: "hidden" },
    animate: { opacity: 1, height: "auto", overflow: "hidden" },
    exit: { opacity: 0, height: 0, overflow: "hidden" },
  },
  transition: buildTransition(durationSeconds.slow, easing.decelerate),
};

// ---------------------------------------------------------------------------
// Preset: Pop
// ---------------------------------------------------------------------------
// A more expressive scale + fade for celebratory or emphasis moments.
// Uses spring physics for a natural feel.
// Best for: success states, badges, notification dots, "new" indicators.
// ---------------------------------------------------------------------------

export const pop: MotionPreset = {
  variants: {
    initial: { opacity: 0, scale: 0.6 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.6 },
  },
  transition: spring.bouncy,
};

export const popSubtle: MotionPreset = {
  variants: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  transition: spring.snappy,
};

// ---------------------------------------------------------------------------
// Preset: Blur In
// ---------------------------------------------------------------------------
// Fades in while removing a blur filter. Creates a focus-pull effect.
// Best for: hero content, image reveals, dramatic entrances.
// ---------------------------------------------------------------------------

export const blurIn: MotionPreset = {
  variants: {
    initial: { opacity: 0, filter: "blur(8px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(8px)" },
  },
  transition: buildTransition(durationSeconds.slow, easing.decelerate),
};

export const blurInSubtle: MotionPreset = {
  variants: {
    initial: { opacity: 0, filter: "blur(4px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(4px)" },
  },
  transition: buildTransition(durationSeconds.normal, easing.decelerate),
};

// ---------------------------------------------------------------------------
// Staggered Container Variants
// ---------------------------------------------------------------------------
// Parent variants for orchestrating staggered children animations.
// Wrap children in a motion container with these variants, then apply
// any child preset to each child element.
//
// Usage:
//   <motion.ul variants={staggerContainer}>
//     {items.map(item => (
//       <motion.li key={item.id} variants={slideUp.variants}>
//         {item.label}
//       </motion.li>
//     ))}
//   </motion.ul>
// ---------------------------------------------------------------------------

export const staggerContainer: MotionPreset = {
  variants: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerTokens.normal,
        delayChildren: 0,
      },
    },
    exit: {
      transition: {
        staggerChildren: staggerTokens.fast,
        staggerDirection: -1,
      },
    },
  },
  transition: {},
};

export const staggerContainerFast: MotionPreset = {
  variants: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerTokens.fast,
        delayChildren: 0,
      },
    },
    exit: {
      transition: {
        staggerChildren: staggerTokens.fast,
        staggerDirection: -1,
      },
    },
  },
  transition: {},
};

export const staggerContainerSlow: MotionPreset = {
  variants: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerTokens.slow,
        delayChildren: 0.05,
      },
    },
    exit: {
      transition: {
        staggerChildren: staggerTokens.normal,
        staggerDirection: -1,
      },
    },
  },
  transition: {},
};

// ---------------------------------------------------------------------------
// Overlay / Backdrop Preset
// ---------------------------------------------------------------------------
// Specifically tuned for modal/dialog backdrops. Fades in quickly and
// exits slightly faster than the content it covers.
// Best for: modal backdrops, overlay screens, light-dismiss layers.
// ---------------------------------------------------------------------------

export const overlayBackdrop: MotionPreset = {
  variants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  transition: buildTransition(durationSeconds.moderate, easing.standard),
};

// ---------------------------------------------------------------------------
// Modal Content Preset
// ---------------------------------------------------------------------------
// Combined scale + slide + fade for modal content. Enters from below
// center with a slight scale-up for a polished feel.
// Best for: dialogs, command palettes, full-featured modals.
// ---------------------------------------------------------------------------

export const modalContent: MotionPreset = {
  variants: {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.97, y: 4 },
  },
  transition: spring.stiff,
};

export const modalContentSpring: MotionPreset = {
  variants: {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.97, y: 4 },
  },
  transition: spring.stiff,
};

// ---------------------------------------------------------------------------
// Toast Preset
// ---------------------------------------------------------------------------
// Slides in from the right edge with a subtle scale. Designed for
// notification toasts that appear in the corner of the viewport.
// Best for: toast notifications, snackbars, alerts.
// ---------------------------------------------------------------------------

export const toastSlideIn: MotionPreset = {
  variants: {
    initial: { opacity: 0, x: 24, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 24, scale: 0.95 },
  },
  transition: spring.snappy,
};

export const toastSlideUp: MotionPreset = {
  variants: {
    initial: { opacity: 0, y: 16, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 16, scale: 0.95 },
  },
  transition: spring.snappy,
};

// ---------------------------------------------------------------------------
// Micro-interaction Presets
// ---------------------------------------------------------------------------
// Small, fast animations for hover states, button presses, and other
// micro-interactions. These use the fastest durations and are intentionally
// subtle to avoid feeling sluggish on repeated triggers.
// ---------------------------------------------------------------------------

/** Subtle press-down effect for buttons */
export const press: MotionPreset = {
  variants: {
    initial: { scale: 1 },
    animate: { scale: 1 },
    exit: { scale: 1 },
  },
  transition: spring.snappy,
};

/** Tap animation target — use with whileTap */
export const tapScale: TargetAndTransition = {
  scale: 0.97,
  transition: spring.snappy,
};

/** Hover animation target — use with whileHover */
export const hoverScale: TargetAndTransition = {
  scale: 1.02,
  transition: spring.snappy,
};

/** Hover lift effect — use with whileHover for cards */
export const hoverLift: TargetAndTransition = {
  y: -2,
  transition: {
    duration: durationSeconds.fast,
    ease: [...easing.decelerate] as EasingTuple,
  },
};

// ---------------------------------------------------------------------------
// Skeleton / Loading Presets
// ---------------------------------------------------------------------------
// Pulsing and shimmer animations for loading states.
// ---------------------------------------------------------------------------

export const pulse: MotionPreset = {
  variants: {
    initial: { opacity: 1 },
    animate: {
      opacity: [1, 0.5, 1],
      transition: {
        duration: durationSeconds.slowest * 3,
        ease: [...easing.linear] as EasingTuple,
        repeat: Number.POSITIVE_INFINITY,
      },
    },
    exit: { opacity: 0 },
  },
  transition: {},
};

export const spin: MotionPreset = {
  variants: {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: durationSeconds.slowest * 2,
        ease: [...easing.linear] as EasingTuple,
        repeat: Number.POSITIVE_INFINITY,
      },
    },
    exit: { opacity: 0 },
  },
  transition: {},
};

// ---------------------------------------------------------------------------
// Reduced Motion Fallbacks
// ---------------------------------------------------------------------------
// When the user has `prefers-reduced-motion: reduce` enabled, all motion
// presets should gracefully degrade. Framer Motion respects this by default
// when using `useReducedMotion()`, but these utilities make it explicit.
// ---------------------------------------------------------------------------

/**
 * Returns a preset that only uses opacity (no transform) for users who
 * prefer reduced motion. Falls back to the original preset otherwise.
 *
 * @param preset - The original motion preset
 * @returns A reduced-motion-safe version of the preset
 */
export function reduceMotion(_preset: MotionPreset): MotionPreset {
  return {
    variants: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    transition: {
      duration: durationSeconds.fast,
      ease: [...easing.standard] as EasingTuple,
    },
  };
}

// ---------------------------------------------------------------------------
// New Phase 11 Presets
// ---------------------------------------------------------------------------

/**
 * shakeX — Horizontal shake for invalid inputs.
 * Use with AnimatePresence on error state, or trigger via `animate` prop.
 */
export const shakeX: MotionPreset = {
  variants: {
    initial: { x: 0, opacity: 1 },
    animate: {
      x: [0, -8, 8, -6, 6, -4, 4, 0],
      opacity: 1,
      transition: {
        duration: durationSeconds.slow,
        ease: [...easing.standard] as EasingTuple,
      },
    },
    exit: { x: 0, opacity: 1 },
  },
  transition: {
    duration: durationSeconds.slow,
    ease: [...easing.standard] as EasingTuple,
  },
};

/**
 * numberRoll — Vertical digit roll for value changes (NumberInput, Stat, Pagination).
 * Animate old value out upward, new value in from below.
 */
export const numberRoll: MotionPreset = {
  variants: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  },
  transition: {
    duration: durationSeconds.normal,
    ease: [...easing.decelerate] as EasingTuple,
  },
};

/**
 * crossfade — Fade-out old, fade-in new with mode="wait".
 * Use for Calendar month transitions, Carousel slides, ImageGallery.
 */
export const crossfade: MotionPreset = {
  variants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  transition: {
    duration: durationSeconds.fast,
    ease: [...easing.standard] as EasingTuple,
  },
};

/**
 * slidePanel — Configurable direction slide for panels (Sheet, Drawer, Sidebar).
 * Use the direction-specific variants: slidePanelRight, slidePanelLeft,
 * slidePanelBottom, slidePanelTop.
 */
export const slidePanelRight: MotionPreset = {
  variants: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
  },
  transition: spring.stiff,
};

export const slidePanelLeft: MotionPreset = {
  variants: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
  },
  transition: spring.stiff,
};

export const slidePanelBottom: MotionPreset = {
  variants: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
  },
  transition: spring.stiff,
};

export const slidePanelTop: MotionPreset = {
  variants: {
    initial: { y: "-100%" },
    animate: { y: 0 },
    exit: { y: "-100%" },
  },
  transition: spring.stiff,
};

/**
 * dragDismiss — Drag + velocity threshold → exit.
 * Use for Sheet (bottom), Drawer, swipeable Toast.
 * Apply `drag`, `dragConstraints`, and `onDragEnd` on the motion.div.
 */
export const dragDismiss: MotionPreset = {
  variants: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: {
      y: "100%",
      opacity: 0,
      transition: { duration: durationSeconds.fast },
    },
  },
  transition: spring.gentle,
};

/**
 * countUp — Animated number interpolation for Stat, Progress label.
 * Use with Framer Motion's `useMotionValue` + `useTransform` + `animate()`.
 * This preset provides the enter/exit wrapper animation.
 */
export const countUp: MotionPreset = {
  variants: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  },
  transition: {
    duration: durationSeconds.normal,
    ease: [...easing.decelerate] as EasingTuple,
  },
};

/**
 * revealMask — Clip-path reveal animation for Skeleton → content transition.
 * Animates from a clipped (invisible) state to fully revealed.
 */
export const revealMask: MotionPreset = {
  variants: {
    initial: { clipPath: "inset(0 100% 0 0)", opacity: 1 },
    animate: { clipPath: "inset(0 0% 0 0)", opacity: 1 },
    exit: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  },
  transition: {
    duration: durationSeconds.slow,
    ease: [...easing.decelerate] as EasingTuple,
  },
};

/**
 * springPress — whileTap spring press for buttons, toggles, cards.
 * Use as: `whileTap={springPress}`
 */
export const springPress: TargetAndTransition = {
  scale: 0.97,
  transition: spring.snappy,
};

/**
 * springHover — whileHover lift for cards and elevated buttons.
 * Use as: `whileHover={springHover}`
 */
export const springHover: TargetAndTransition = {
  y: -2,
  transition: spring.gentle,
};

/**
 * Conditionally returns the full or reduced preset based on a boolean flag.
 * Use with Framer Motion's `useReducedMotion()` hook.
 *
 * @example
 * ```tsx
 * const shouldReduce = useReducedMotion();
 * const animation = withReducedMotion(slideUp, shouldReduce);
 * ```
 */
export function withReducedMotion(
  preset: MotionPreset,
  prefersReduced: boolean | null,
): MotionPreset {
  if (prefersReduced) {
    return reduceMotion(preset);
  }
  return preset;
}
