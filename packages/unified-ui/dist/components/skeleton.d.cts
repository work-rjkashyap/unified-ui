import * as react from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';

declare const skeletonVariants: (props?: ({
    shape?: "circle" | "rect" | "text" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SkeletonSize = "xs" | "sm" | "md" | "lg" | "xl";
type SkeletonTextSize = "xs" | "sm" | "md" | "lg";
interface SkeletonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">, VariantProps<typeof skeletonVariants> {
    /**
     * Shape of the skeleton placeholder.
     * @default "text"
     */
    shape?: "text" | "circle" | "rect";
    /**
     * Width of the skeleton. Accepts CSS values (number → px, string → raw).
     * For `circle` shape, use `size` prop instead.
     * @default "100%" for text/rect shapes
     */
    width?: number | string;
    /**
     * Height of the skeleton. Accepts CSS values (number → px, string → raw).
     * For `circle` shape, use `size` prop instead.
     * For `text` shape, defaults to the text height based on `textSize`.
     */
    height?: number | string;
    /**
     * Predefined size for circle shapes. Maps to standard avatar sizes.
     * Only applies when `shape="circle"`.
     * @default "md"
     */
    size?: SkeletonSize;
    /**
     * Text height preset for text shapes. Matches typography size scale.
     * Only applies when `shape="text"`.
     * @default "md"
     */
    textSize?: SkeletonTextSize;
    /**
     * Whether the pulse animation is active.
     * Set to false to show a static skeleton (e.g., when paused).
     * @default true
     */
    animate?: boolean;
    /** Additional CSS classes to merge. */
    className?: string;
}
/**
 * Skeleton — a loading placeholder that mimics the shape of content.
 *
 * Built on the design system's token layer. Uses the muted background
 * color and a CSS `animate-pulse` animation to indicate loading state.
 * The animation is automatically disabled when the user prefers reduced
 * motion.
 *
 * Accessibility:
 *   - `aria-hidden="true"` — skeletons are decorative, not content
 *   - `role="presentation"` — excluded from accessibility tree
 *   - Reduced motion respected via global CSS in design-system.css
 *
 * @example
 * ```tsx
 * // Text line placeholder
 * <Skeleton shape="text" />
 * <Skeleton shape="text" width="60%" />
 * <Skeleton shape="text" textSize="lg" />
 *
 * // Circle placeholder (avatars)
 * <Skeleton shape="circle" size="md" />
 * <Skeleton shape="circle" size="lg" />
 *
 * // Rectangle placeholder (images, cards)
 * <Skeleton shape="rect" width={300} height={200} />
 * <Skeleton shape="rect" width="100%" height={160} />
 *
 * // Static (no animation)
 * <Skeleton shape="text" animate={false} />
 *
 * // Custom dimensions
 * <Skeleton shape="rect" width="100%" height="8rem" className="rounded-lg" />
 * ```
 */
declare const Skeleton: react.ForwardRefExoticComponent<SkeletonProps & react.RefAttributes<HTMLDivElement>>;
interface SkeletonTextProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /**
     * Number of text lines to render.
     * @default 3
     */
    lines?: number;
    /**
     * Text height preset for each line.
     * @default "md"
     */
    textSize?: SkeletonTextSize;
    /**
     * Width of the last line (as CSS value).
     * Creates a more natural appearance since real text rarely fills
     * the full width on the last line.
     * @default "60%"
     */
    lastLineWidth?: number | string;
    /**
     * Gap between lines.
     * @default "gap-2.5"
     */
    gap?: string;
    /**
     * Whether the pulse animation is active.
     * @default true
     */
    animate?: boolean;
    /** Additional CSS classes to merge on the wrapper. */
    className?: string;
}
/**
 * SkeletonText — renders multiple skeleton text lines.
 *
 * A convenience wrapper around `Skeleton` that renders multiple text-shaped
 * lines with automatic width variation on the last line.
 *
 * @example
 * ```tsx
 * // Default (3 lines)
 * <SkeletonText />
 *
 * // Custom line count
 * <SkeletonText lines={5} />
 *
 * // Custom last line width
 * <SkeletonText lines={4} lastLineWidth="40%" />
 *
 * // Larger text size
 * <SkeletonText textSize="lg" lines={2} />
 *
 * // With custom gap
 * <SkeletonText lines={3} gap="gap-3" />
 * ```
 */
declare const SkeletonText: react.ForwardRefExoticComponent<SkeletonTextProps & react.RefAttributes<HTMLDivElement>>;
interface SkeletonCircleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /**
     * Predefined size. Maps to standard avatar sizes.
     * @default "md"
     */
    size?: SkeletonSize;
    /**
     * Whether the pulse animation is active.
     * @default true
     */
    animate?: boolean;
    /** Additional CSS classes to merge. */
    className?: string;
}
/**
 * SkeletonCircle — a circle-shaped skeleton placeholder.
 *
 * Shorthand for `<Skeleton shape="circle" />` with a cleaner API.
 *
 * @example
 * ```tsx
 * <SkeletonCircle size="sm" />
 * <SkeletonCircle size="md" />
 * <SkeletonCircle size="lg" />
 * ```
 */
declare const SkeletonCircle: react.ForwardRefExoticComponent<SkeletonCircleProps & react.RefAttributes<HTMLDivElement>>;
interface SkeletonRectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /**
     * Width of the rectangle. Accepts CSS values.
     * @default "100%"
     */
    width?: number | string;
    /**
     * Height of the rectangle. Accepts CSS values.
     * @default 120
     */
    height?: number | string;
    /**
     * Whether the pulse animation is active.
     * @default true
     */
    animate?: boolean;
    /** Additional CSS classes to merge. */
    className?: string;
}
/**
 * SkeletonRect — a rectangle-shaped skeleton placeholder.
 *
 * Shorthand for `<Skeleton shape="rect" />` with sensible defaults.
 * Useful for image placeholders, card thumbnails, and media areas.
 *
 * @example
 * ```tsx
 * <SkeletonRect width={300} height={200} />
 * <SkeletonRect width="100%" height={160} />
 * <SkeletonRect height="12rem" />
 * ```
 */
declare const SkeletonRect: react.ForwardRefExoticComponent<SkeletonRectProps & react.RefAttributes<HTMLDivElement>>;

export { Skeleton, SkeletonCircle, type SkeletonCircleProps, type SkeletonProps, SkeletonRect, type SkeletonRectProps, type SkeletonSize, SkeletonText, type SkeletonTextProps, type SkeletonTextSize, skeletonVariants };
