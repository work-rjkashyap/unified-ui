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
  // Count / Number animations
  countUp,
  // Crossfade
  crossfade,
  // Drag dismiss
  dragDismiss,
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
  // Number roll
  numberRoll,
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
  // Reveal mask
  revealMask,
  // Scale presets
  scaleIn,
  scaleInLg,
  scaleInSpring,
  // Shake
  shakeX,
  slideDown,
  slideDownSm,
  slideInFromBottom,
  slideInFromLeft,
  slideInFromRight,
  // Slide horizontal
  slideLeft,
  // Slide panel (directional)
  slidePanelBottom,
  slidePanelLeft,
  slidePanelRight,
  slidePanelTop,
  slideRight,
  // Slide vertical
  slideUp,
  slideUpLg,
  slideUpSm,
  slideUpSpring,
  spin,
  // Spring micro-interactions
  springHover,
  springPress,
  // Stagger containers
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  tapScale,
  toastSlideIn,
  toastSlideUp,
  withReducedMotion,
} from "./presets";
