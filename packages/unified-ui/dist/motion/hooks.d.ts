import { ReactNode } from 'react';
import { MotionPreset, MotionPropsResult } from './presets.js';
import 'framer-motion';

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

export { MotionSafe, type MotionSafeProps, type SpringConfig, useMotion, useMotionProps, useMotionSpringConfig, useReducedMotion };
