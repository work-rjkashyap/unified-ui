"use client";

// ============================================================================
// Unified UI — Spinner Component
// ============================================================================
// An animated loading spinner component built on the Unified UI token layer.
// Uses Framer Motion for smooth rotation animation with reduced-motion
// support. Uses class-variance-authority (CVA) for variant composition and
// tailwind-merge (via cn) for safe class merging.
//
// Features:
//   - 4 sizes: xs, sm, md, lg
//   - 4 visual variants: default, primary, secondary, muted
//   - Framer Motion rotation with reduced-motion fallback (CSS animation)
//   - Optional label text (displayed below or beside the spinner)
//   - Accessible: role="status", aria-label, screen-reader-only live text
//   - Full ref forwarding
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { Spinner } from "@/design-system/components/spinner";
//
//   <Spinner />
//   <Spinner size="lg" variant="primary" />
//   <Spinner label="Loading data…" />
//   <Spinner size="sm" variant="muted" />
// ============================================================================

import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion } from "framer-motion";
import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

// ---------------------------------------------------------------------------
// CVA Variant Definition — Spinner SVG
// ---------------------------------------------------------------------------

export const spinnerVariants = cva(
  // Base styles — shared across all variants and sizes
  [
    // Ensure the spinner is inline and doesn't collapse
    "shrink-0",
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Extra Small — for inline indicators, buttons, badges.
         * 14px (size-3.5)
         */
        xs: "size-3.5",

        /**
         * Small — for compact UIs, table cells, small buttons.
         * 16px (size-4)
         */
        sm: "size-4",

        /**
         * Medium — default size for most loading states.
         * 20px (size-5)
         */
        md: "size-5",

        /**
         * Large — for prominent loading indicators, empty states.
         * 24px (size-6)
         */
        lg: "size-6",
      },

      // -----------------------------------------------------------------
      // Color Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Default — uses the current text color.
         * Inherits from the parent element's color.
         */
        default: "text-current",

        /**
         * Primary — uses the brand/primary color.
         * For prominent loading states on neutral backgrounds.
         */
        primary: "text-primary",

        /**
         * Secondary — uses the secondary/foreground color.
         * For subtle loading indicators.
         */
        secondary: "text-foreground",

        /**
         * Muted — uses the muted-foreground color.
         * For very subtle, non-intrusive loading states.
         */
        muted: "text-muted-foreground",
      },
    },

    defaultVariants: {
      size: "md",
      variant: "default",
    },
  },
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SpinnerSize = "xs" | "sm" | "md" | "lg";
export type SpinnerVariant = "default" | "primary" | "secondary" | "muted";

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof spinnerVariants> {
  /**
   * Size of the spinner.
   * @default "md"
   */
  size?: SpinnerSize;

  /**
   * Color variant of the spinner.
   * @default "default"
   */
  variant?: SpinnerVariant;

  /**
   * Optional label text displayed alongside the spinner.
   * Provides visible context for the loading state.
   */
  label?: ReactNode;

  /**
   * Position of the label relative to the spinner.
   * @default "right"
   */
  labelPosition?: "right" | "bottom";

  /**
   * Accessible label for screen readers.
   * If `label` is a string, it will be used as the default.
   * @default "Loading"
   */
  "aria-label"?: string;

  /**
   * Thickness of the spinner stroke.
   * @default "2"
   */
  strokeWidth?: number;

  /** Additional CSS classes to merge on the root element. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Label Size Map
// ---------------------------------------------------------------------------

const labelSizeMap: Record<SpinnerSize, string> = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-sm",
};

// ---------------------------------------------------------------------------
// Framer Motion — Rotation Config
// ---------------------------------------------------------------------------

const spinTransition = {
  rotate: {
    duration: 0.8,
    ease: "linear" as const,
    repeat: Number.POSITIVE_INFINITY,
  },
};

const spinAnimate = {
  rotate: 360,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Spinner — an animated loading indicator.
 *
 * Built on the design system's token layer with CVA for variant composition.
 * Uses Framer Motion for smooth, GPU-accelerated rotation with automatic
 * reduced-motion support (falls back to CSS `animate-spin`).
 *
 * The spinner renders as a circular arc (3/4 circle) that rotates
 * continuously. A faded track circle provides visual context for the
 * rotation path.
 *
 * Accessibility:
 *   - Uses `role="status"` for live region semantics
 *   - Includes screen-reader-only text via `aria-label`
 *   - SVG elements are decorative (`aria-hidden`)
 *   - Respects `prefers-reduced-motion` — uses CSS fallback
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Spinner />
 *
 * // Sizes
 * <Spinner size="xs" />
 * <Spinner size="sm" />
 * <Spinner size="md" />
 * <Spinner size="lg" />
 *
 * // Variants
 * <Spinner variant="primary" />
 * <Spinner variant="secondary" />
 * <Spinner variant="muted" />
 *
 * // With label (inline)
 * <Spinner label="Loading…" />
 *
 * // With label (stacked)
 * <Spinner label="Loading data…" labelPosition="bottom" />
 *
 * // Inside a button
 * <Button disabled>
 *   <Spinner size="xs" variant="default" />
 *   Saving…
 * </Button>
 *
 * // Custom aria-label
 * <Spinner aria-label="Fetching results" />
 *
 * // Custom stroke width
 * <Spinner size="lg" strokeWidth={3} />
 * ```
 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  function Spinner(
    {
      size = "md",
      variant = "default",
      label,
      labelPosition = "right",
      "aria-label": ariaLabel,
      strokeWidth = 2.5,
      className,
      ...rest
    },
    ref,
  ) {
    const prefersReduced = useReducedMotion();

    // Resolve accessible label
    const resolvedAriaLabel =
      ariaLabel ?? (typeof label === "string" ? label : "Loading");

    // The SVG spinner element
    const MotionSvg = motion.svg;

    const spinnerElement = prefersReduced ? (
      // Reduced motion fallback — uses CSS animate-spin (a simple
      // rotation that the browser can optimize or skip per OS settings)
      <svg
        className={cn("animate-spin", spinnerVariants({ size, variant }))}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {/* Track circle */}
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="opacity-20"
        />
        {/* Arc */}
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    ) : (
      // Full Framer Motion animation
      <MotionSvg
        className={cn(spinnerVariants({ size, variant }))}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        animate={spinAnimate}
        transition={spinTransition}
        aria-hidden="true"
      >
        {/* Track circle */}
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="opacity-20"
        />
        {/* Arc */}
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </MotionSvg>
    );

    return (
      <div
        ref={ref}
        role="status"
        aria-label={resolvedAriaLabel}
        className={cn(
          "inline-flex items-center",
          labelPosition === "bottom" ? "flex-col gap-2" : "flex-row gap-2",
          className,
        )}
        data-ds=""
        data-ds-component="spinner"
        data-ds-size={size}
        data-ds-variant={variant}
        {...rest}
      >
        {spinnerElement}

        {/* Visible label */}
        {label && (
          <span
            className={cn(
              "leading-5",
              labelSizeMap[size],
              variant === "muted" ? "text-muted-foreground" : "text-foreground",
            )}
          >
            {label}
          </span>
        )}

        {/* Screen-reader-only fallback text (always present even without label) */}
        {!label && <span className="sr-only">{resolvedAriaLabel}</span>}
      </div>
    );
  },
);

Spinner.displayName = "Spinner";
