export { D as Duration, E as Easing, S as Spring, a as Stagger, d as duration, b as durationCSS, c as durationSeconds, e as easing, f as easingCSS, s as spring, g as stagger } from './motion-D9wQbcKL.js';
import { ReactNode } from 'react';
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
declare function reduceMotion(preset: MotionPreset): MotionPreset;
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

declare function useReducedMotion(): boolean;
declare function useMotion(preset: MotionPreset): MotionPreset;
declare function useMotionProps(preset: MotionPreset): MotionPropsResult;
interface SpringConfig {
    stiffness?: number;
    damping?: number;
    mass?: number;
    duration?: number;
}
declare function useMotionSpringConfig(config: SpringConfig): SpringConfig;
interface MotionSafeProps {
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
declare function MotionSafe({ children, fallback }: MotionSafeProps): ReactNode;

export { type MotionPreset, type MotionPropsResult, MotionSafe, type MotionSafeProps, type SpringConfig, blurIn, blurInSubtle, expandHeight, expandHeightSlow, fadeIn, fadeInFast, fadeInSlow, hoverLift, hoverScale, modalContent, modalContentSpring, motionProps, overlayBackdrop, pop, popSubtle, press, pulse, reduceMotion, scaleIn, scaleInLg, scaleInSpring, slideDown, slideDownSm, slideInFromBottom, slideInFromLeft, slideInFromRight, slideLeft, slideRight, slideUp, slideUpLg, slideUpSm, slideUpSpring, spin, staggerContainer, staggerContainerFast, staggerContainerSlow, tapScale, toastSlideIn, toastSlideUp, useMotion, useMotionProps, useMotionSpringConfig, useReducedMotion, withReducedMotion };
