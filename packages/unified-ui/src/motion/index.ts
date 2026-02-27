// ============================================================================
// Motion System — Barrel Export
// ============================================================================
// Single entry point for all motion presets, tokens, and utilities.
// Import from here rather than from individual motion files.
//
// Usage:
//   import { fadeIn, slideUp, motionProps, scaleIn } from "@/design-system/motion";
//   import { durationSeconds, easing, spring } from "@/design-system/motion";
// ============================================================================

// ---------------------------------------------------------------------------
// Raw Motion Tokens (re-exported for direct access)
// ---------------------------------------------------------------------------
export {
  type Duration,
  duration,
  durationCSS,
  durationSeconds,
  type Easing,
  easing,
  easingCSS,
  type Spring,
  type Stagger,
  spring,
  stagger,
} from "@unified-ui/tokens/motion";
// ---------------------------------------------------------------------------
// Motion Hooks & Runtime Utilities
// ---------------------------------------------------------------------------
export {
  // Conditional render component
  MotionSafe,
  type MotionSafeProps,
  type SpringConfig,
  // Hooks
  useMotion,
  useMotionProps,
  useMotionSpringConfig,
  useReducedMotion,
} from "./hooks";
// ---------------------------------------------------------------------------
// Motion Presets
// ---------------------------------------------------------------------------
export {
  // Blur
  blurIn,
  blurInSubtle,
  // Expand / Collapse
  expandHeight,
  expandHeightSlow,
  // Fade presets
  fadeIn,
  fadeInFast,
  fadeInSlow,
  hoverLift,
  hoverScale,
  // Types
  type MotionPreset,
  type MotionPropsResult,
  modalContent,
  modalContentSpring,
  // Spread helper
  motionProps,
  // Overlay / Modal / Toast
  overlayBackdrop,
  // Pop / Emphasis
  pop,
  popSubtle,
  // Micro-interactions
  press,
  // Loading states
  pulse,
  // Reduced motion utilities
  reduceMotion,
  // Scale presets
  scaleIn,
  scaleInLg,
  scaleInSpring,
  slideDown,
  slideDownSm,
  slideInFromBottom,
  slideInFromLeft,
  slideInFromRight,
  // Slide horizontal
  slideLeft,
  slideRight,
  // Slide vertical
  slideUp,
  slideUpLg,
  slideUpSm,
  slideUpSpring,
  spin,
  // Stagger containers
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  tapScale,
  toastSlideIn,
  toastSlideUp,
  withReducedMotion,
} from "./presets";
