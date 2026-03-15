import { Variants, Transition, TargetAndTransition } from 'framer-motion';

interface MotionPreset {
    variants: Variants;
    transition: Transition;
}
interface MotionPropsResult {
    variants: Variants;
    initial: string;
    animate: string;
    exit: string;
}
declare function motionProps(preset: MotionPreset): MotionPropsResult;
declare const fadeIn: MotionPreset;
declare const fadeInSlow: MotionPreset;
declare const fadeInFast: MotionPreset;
declare const scaleIn: MotionPreset;
declare const scaleInSpring: MotionPreset;
declare const scaleInLg: MotionPreset;
declare const slideUp: MotionPreset;
declare const slideUpSm: MotionPreset;
declare const slideUpLg: MotionPreset;
declare const slideUpSpring: MotionPreset;
declare const slideDown: MotionPreset;
declare const slideDownSm: MotionPreset;
declare const slideLeft: MotionPreset;
declare const slideRight: MotionPreset;
declare const slideInFromRight: MotionPreset;
declare const slideInFromLeft: MotionPreset;
declare const slideInFromBottom: MotionPreset;
declare const expandHeight: MotionPreset;
declare const expandHeightSlow: MotionPreset;
declare const pop: MotionPreset;
declare const popSubtle: MotionPreset;
declare const blurIn: MotionPreset;
declare const blurInSubtle: MotionPreset;
declare const staggerContainer: MotionPreset;
declare const staggerContainerFast: MotionPreset;
declare const staggerContainerSlow: MotionPreset;
declare const overlayBackdrop: MotionPreset;
declare const modalContent: MotionPreset;
declare const modalContentSpring: MotionPreset;
declare const toastSlideIn: MotionPreset;
declare const toastSlideUp: MotionPreset;
/** Subtle press-down effect for buttons */
declare const press: MotionPreset;
/** Tap animation target — use with whileTap */
declare const tapScale: TargetAndTransition;
/** Hover animation target — use with whileHover */
declare const hoverScale: TargetAndTransition;
/** Hover lift effect — use with whileHover for cards */
declare const hoverLift: TargetAndTransition;
declare const pulse: MotionPreset;
declare const spin: MotionPreset;
/**
 * Returns a preset that only uses opacity (no transform) for users who
 * prefer reduced motion. Falls back to the original preset otherwise.
 *
 * @param preset - The original motion preset
 * @returns A reduced-motion-safe version of the preset
 */
declare function reduceMotion(_preset: MotionPreset): MotionPreset;
/**
 * shakeX — Horizontal shake for invalid inputs.
 * Use with AnimatePresence on error state, or trigger via `animate` prop.
 */
declare const shakeX: MotionPreset;
/**
 * numberRoll — Vertical digit roll for value changes (NumberInput, Stat, Pagination).
 * Animate old value out upward, new value in from below.
 */
declare const numberRoll: MotionPreset;
/**
 * crossfade — Fade-out old, fade-in new with mode="wait".
 * Use for Calendar month transitions, Carousel slides, ImageGallery.
 */
declare const crossfade: MotionPreset;
/**
 * slidePanel — Configurable direction slide for panels (Sheet, Drawer, Sidebar).
 * Use the direction-specific variants: slidePanelRight, slidePanelLeft,
 * slidePanelBottom, slidePanelTop.
 */
declare const slidePanelRight: MotionPreset;
declare const slidePanelLeft: MotionPreset;
declare const slidePanelBottom: MotionPreset;
declare const slidePanelTop: MotionPreset;
/**
 * dragDismiss — Drag + velocity threshold → exit.
 * Use for Sheet (bottom), Drawer, swipeable Toast.
 * Apply `drag`, `dragConstraints`, and `onDragEnd` on the motion.div.
 */
declare const dragDismiss: MotionPreset;
/**
 * countUp — Animated number interpolation for Stat, Progress label.
 * Use with Framer Motion's `useMotionValue` + `useTransform` + `animate()`.
 * This preset provides the enter/exit wrapper animation.
 */
declare const countUp: MotionPreset;
/**
 * revealMask — Clip-path reveal animation for Skeleton → content transition.
 * Animates from a clipped (invisible) state to fully revealed.
 */
declare const revealMask: MotionPreset;
/**
 * springPress — whileTap spring press for buttons, toggles, cards.
 * Use as: `whileTap={springPress}`
 */
declare const springPress: TargetAndTransition;
/**
 * springHover — whileHover lift for cards and elevated buttons.
 * Use as: `whileHover={springHover}`
 */
declare const springHover: TargetAndTransition;
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
declare function withReducedMotion(preset: MotionPreset, prefersReduced: boolean | null): MotionPreset;

export { type MotionPreset, type MotionPropsResult, blurIn, blurInSubtle, countUp, crossfade, dragDismiss, expandHeight, expandHeightSlow, fadeIn, fadeInFast, fadeInSlow, hoverLift, hoverScale, modalContent, modalContentSpring, motionProps, numberRoll, overlayBackdrop, pop, popSubtle, press, pulse, reduceMotion, revealMask, scaleIn, scaleInLg, scaleInSpring, shakeX, slideDown, slideDownSm, slideInFromBottom, slideInFromLeft, slideInFromRight, slideLeft, slidePanelBottom, slidePanelLeft, slidePanelRight, slidePanelTop, slideRight, slideUp, slideUpLg, slideUpSm, slideUpSpring, spin, springHover, springPress, staggerContainer, staggerContainerFast, staggerContainerSlow, tapScale, toastSlideIn, toastSlideUp, withReducedMotion };
