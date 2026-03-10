"use client";

// ============================================================================
// Unified UI — Skeleton Component
// ============================================================================
// A loading placeholder component that mimics the shape of content before
// it loads. Built on the Unified UI token layer with CVA for variant
// composition.
//
// Features:
//   - 3 shapes: text (line), circle, rect (rectangle)
//   - Pulse animation using design system motion tokens
//   - Configurable width and height
//   - Composable sub-components: Skeleton.Text, Skeleton.Circle, Skeleton.Rect
//   - Full ref forwarding
//   - WCAG AA accessible: aria-hidden, role="presentation"
//   - Respects prefers-reduced-motion
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { Skeleton, SkeletonText, SkeletonCircle, SkeletonRect } from "@/design-system/components/skeleton";
//
//   <Skeleton shape="text" />
//   <Skeleton shape="circle" size="md" />
//   <Skeleton shape="rect" width={200} height={120} />
//
//   <SkeletonText lines={3} />
//   <SkeletonCircle size="lg" />
//   <SkeletonRect width="100%" height={160} />
// ============================================================================

import { cva, type VariantProps } from "class-variance-authority";
import { type CSSProperties, forwardRef } from "react";
import { cn } from "@/lib/cn";

// ---------------------------------------------------------------------------
// CVA Variant Definition
// ---------------------------------------------------------------------------
// The skeleton uses the muted background color for the placeholder surface
// and a subtle pulse animation to indicate loading state. The animation
// is automatically disabled when the user prefers reduced motion (handled
// by the global reduced-motion CSS in design-system.css).
// ---------------------------------------------------------------------------

export const skeletonVariants = cva(
  // Base styles — shared across all shapes
  [
    // Background
    "bg-muted",
    // Animation — gentle pulse
    "animate-pulse",
    // Ensure it doesn't collapse
    "shrink-0",
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Shape Variants
      // -----------------------------------------------------------------
      shape: {
        /**
         * Text — a horizontal line placeholder for text content.
         * Default height matches body text line-height.
         * Rounded for a softer appearance.
         */
        text: "h-4 w-full rounded-sm",

        /**
         * Circle — a circular placeholder for avatars, icons.
         * Uses border-radius: 9999px (full circle).
         */
        circle: "rounded-full aspect-square",

        /**
         * Rect — a rectangular placeholder for images, cards, media.
         * Uses standard border-radius.
         */
        rect: "rounded-md",
      },
    },

    defaultVariants: {
      shape: "text",
    },
  },
);

// ---------------------------------------------------------------------------
// Size Maps
// ---------------------------------------------------------------------------
// Predefined sizes for circle shape that correspond to common avatar sizes.
// Text and rect shapes use explicit width/height props instead.
// ---------------------------------------------------------------------------

export type SkeletonSize = "xs" | "sm" | "md" | "lg" | "xl";

const circleSizeMap: Record<SkeletonSize, string> = {
  xs: "size-6",
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
  xl: "size-16",
};

// ---------------------------------------------------------------------------
// Text line height maps — match typography variants
// ---------------------------------------------------------------------------

export type SkeletonTextSize = "xs" | "sm" | "md" | "lg";

const textHeightMap: Record<SkeletonTextSize, string> = {
  xs: "h-3",
  sm: "h-3.5",
  md: "h-4",
  lg: "h-5",
};

// ---------------------------------------------------------------------------
// Types — Skeleton (base)
// ---------------------------------------------------------------------------

export interface SkeletonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof skeletonVariants> {
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

// ---------------------------------------------------------------------------
// Dimension Resolver (Internal)
// ---------------------------------------------------------------------------

function resolveDimension(
  value: number | string | undefined,
): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "number") return `${value}px`;
  return value;
}

// ---------------------------------------------------------------------------
// Skeleton Component
// ---------------------------------------------------------------------------

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
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
    {
      shape = "text",
      width,
      height,
      size = "md",
      textSize = "md",
      animate = true,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    // Build inline styles for custom dimensions
    const dimensionStyles: CSSProperties = {
      ...style,
      width: resolveDimension(width),
      height: resolveDimension(height),
    };

    // Clean undefined values so they don't override CSS classes
    if (dimensionStyles.width === undefined) delete dimensionStyles.width;
    if (dimensionStyles.height === undefined) delete dimensionStyles.height;

    return (
      <div
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={cn(
          skeletonVariants({ shape }),
          // Circle: apply size class
          shape === "circle" && !width && !height && circleSizeMap[size],
          // Text: apply text height class (unless custom height provided)
          shape === "text" && !height && textHeightMap[textSize],
          // Disable animation
          !animate && "animate-none",
          className,
        )}
        style={
          Object.keys(dimensionStyles).length > 0 ? dimensionStyles : undefined
        }
        data-ds=""
        data-ds-component="skeleton"
        data-ds-shape={shape}
        {...rest}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";

// ===========================================================================
// SkeletonText — Multi-line text placeholder
// ===========================================================================
// Renders multiple skeleton text lines with optional width variation on
// the last line (common pattern: last line is shorter to mimic real text).
// ===========================================================================

// ---------------------------------------------------------------------------
// Types — SkeletonText
// ---------------------------------------------------------------------------

export interface SkeletonTextProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
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

// ---------------------------------------------------------------------------
// SkeletonText Component
// ---------------------------------------------------------------------------

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
export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  function SkeletonText(
    {
      lines = 3,
      textSize = "md",
      lastLineWidth = "60%",
      gap = "gap-2.5",
      animate = true,
      className,
      ...rest
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={cn("flex flex-col w-full", gap, className)}
        data-ds=""
        data-ds-component="skeleton-text"
        {...rest}
      >
        {Array.from({ length: lines }, (_, i) => (
          <Skeleton
            key={i}
            shape="text"
            textSize={textSize}
            width={i === lines - 1 && lines > 1 ? lastLineWidth : undefined}
            animate={animate}
          />
        ))}
      </div>
    );
  },
);

SkeletonText.displayName = "SkeletonText";

// ===========================================================================
// SkeletonCircle — Circle placeholder shorthand
// ===========================================================================

// ---------------------------------------------------------------------------
// Types — SkeletonCircle
// ---------------------------------------------------------------------------

export interface SkeletonCircleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
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

// ---------------------------------------------------------------------------
// SkeletonCircle Component
// ---------------------------------------------------------------------------

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
export const SkeletonCircle = forwardRef<HTMLDivElement, SkeletonCircleProps>(
  function SkeletonCircle(
    { size = "md", animate = true, className, ...rest },
    ref,
  ) {
    return (
      <Skeleton
        ref={ref}
        shape="circle"
        size={size}
        animate={animate}
        className={className}
        {...rest}
      />
    );
  },
);

SkeletonCircle.displayName = "SkeletonCircle";

// ===========================================================================
// SkeletonRect — Rectangle placeholder shorthand
// ===========================================================================

// ---------------------------------------------------------------------------
// Types — SkeletonRect
// ---------------------------------------------------------------------------

export interface SkeletonRectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
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

// ---------------------------------------------------------------------------
// SkeletonRect Component
// ---------------------------------------------------------------------------

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
export const SkeletonRect = forwardRef<HTMLDivElement, SkeletonRectProps>(
  function SkeletonRect(
    { width = "100%", height = 120, animate = true, className, ...rest },
    ref,
  ) {
    return (
      <Skeleton
        ref={ref}
        shape="rect"
        width={width}
        height={height}
        animate={animate}
        className={className}
        {...rest}
      />
    );
  },
);

SkeletonRect.displayName = "SkeletonRect";
