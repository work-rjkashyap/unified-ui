"use client";

// ============================================================================
// Unified UI — Progress Component
// ============================================================================
// A linear progress bar component built on the Unified UI token layer.
// Uses class-variance-authority (CVA) for variant composition and
// tailwind-merge (via cn) for safe class merging.
//
// Features:
//   - 4 visual variants: default, primary, success, danger
//   - 3 sizes: sm, md, lg
//   - Determinate mode (0–100%) with animated fill
//   - Indeterminate mode with sliding animation
//   - Striped variant with animated diagonal stripes
//   - Optional label with value display
//   - Full ref forwarding
//   - WCAG AA accessible: role="progressbar", aria-valuenow, aria-valuemin,
//     aria-valuemax, aria-label
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { Progress } from "@/design-system/components/progress";
//
//   <Progress value={60} />
//   <Progress value={80} variant="success" showLabel />
//   <Progress indeterminate />
//   <Progress value={45} striped />
//   <Progress value={45} striped animated />
//   <Progress value={30} size="lg" showLabel label="Uploading..." />
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, useEffect, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// CVA Variant Definition — Track (outer container)
// ---------------------------------------------------------------------------

export const progressTrackVariants = cva(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "relative w-full overflow-hidden",
    // Shape
    "rounded-full",
    // Background
    "bg-muted",
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — thin bar for subtle progress indicators.
         * Height: 6px
         */
        sm: "h-1.5",

        /**
         * Medium — default size for most progress bars.
         * Height: 8px
         */
        md: "h-2",

        /**
         * Large — prominent bar for hero progress, file uploads.
         * Height: 12px
         */
        lg: "h-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

// ---------------------------------------------------------------------------
// CVA Variant Definition — Indicator (inner fill bar)
// ---------------------------------------------------------------------------

export const progressIndicatorVariants = cva(
  // Base styles — shared across all variants
  [
    // Layout
    "h-full",
    // Shape — match track rounding
    "rounded-full",
    // Transition for value changes
    "transition-[width] duration-standard ease-standard",
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Visual Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Default — uses primary brand color.
         */
        default: "bg-primary",

        /**
         * Primary — explicit primary brand color.
         */
        primary: "bg-primary",

        /**
         * Success — positive/complete progress.
         */
        success: "bg-success",

        /**
         * Danger — error/critical progress (e.g., storage almost full).
         */
        danger: "bg-danger",

        /**
         * Warning — caution progress (e.g., approaching limit).
         */
        warning: "bg-warning",

        /**
         * Info — informational progress.
         */
        info: "bg-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ProgressVariant =
  | "default"
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "info";

export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof progressTrackVariants>,
    VariantProps<typeof progressIndicatorVariants> {
  /**
   * Current progress value (0–100).
   * Ignored when `indeterminate` is true.
   * @default 0
   */
  value?: number;

  /**
   * Maximum progress value.
   * @default 100
   */
  max?: number;

  /**
   * Minimum progress value.
   * @default 0
   */
  min?: number;

  /**
   * Visual variant of the progress indicator.
   * @default "default"
   */
  variant?: ProgressVariant;

  /**
   * Size of the progress bar.
   * @default "md"
   */
  size?: ProgressSize;

  /**
   * Whether the progress is indeterminate (unknown completion).
   * When true, the bar displays a looping sliding animation
   * and `value` is ignored.
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Whether to display diagonal stripes on the indicator.
   * @default false
   */
  striped?: boolean;

  /**
   * Whether the stripes should animate (slide).
   * Only applies when `striped` is true.
   * @default false
   */
  animated?: boolean;

  /**
   * Whether to display the progress label.
   * Shows the percentage value or custom label above the bar.
   * @default false
   */
  showLabel?: boolean;

  /**
   * Custom label text displayed above or inside the bar.
   * When provided alongside `showLabel`, replaces the default "X%" text.
   */
  label?: ReactNode;

  /**
   * Custom format function for the value label.
   * Receives the current value and max, returns a string.
   * @default (value, max) => `${Math.round((value / max) * 100)}%`
   */
  formatLabel?: (value: number, max: number) => string;

  /**
   * Accessible label for the progress bar.
   * Use when there's no visible label to describe what's loading.
   */
  "aria-label"?: string;

  /**
   * ID of the element that labels the progress bar.
   */
  "aria-labelledby"?: string;

  /** Additional CSS classes for the track (outer container). */
  className?: string;

  /** Additional CSS classes for the indicator (inner fill). */
  indicatorClassName?: string;
}

// ---------------------------------------------------------------------------
// Striped Pattern Styles
// ---------------------------------------------------------------------------
// CSS for diagonal stripe overlay on the progress indicator.
// Uses a repeating-linear-gradient with semi-transparent white stripes.
// ---------------------------------------------------------------------------

const stripedStyle: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)",
  backgroundSize: "1rem 1rem",
};

// ---------------------------------------------------------------------------
// Keyframe injection for indeterminate and animated stripes
// ---------------------------------------------------------------------------
// We use inline styles with CSS animations. The keyframes are defined as
// a <style> tag injected once. This avoids relying on Tailwind for custom
// keyframes while keeping the component self-contained.
// ---------------------------------------------------------------------------

const PROGRESS_STYLE_ID = "unified-ui-progress-keyframes";

const PROGRESS_KEYFRAMES_CSS = `
@keyframes unified-ui-progress-indeterminate {
  0% { transform: translateX(-100%); width: 50%; }
  50% { transform: translateX(50%); width: 30%; }
  100% { transform: translateX(200%); width: 50%; }
}
@keyframes unified-ui-progress-stripe-slide {
  0% { background-position: 1rem 0; }
  100% { background-position: 0 0; }
}
`;

/**
 * Hook that injects progress keyframe styles into <head> on the client.
 * Uses useEffect to avoid SSR/client hydration mismatches.
 */
function useProgressKeyframes() {
  useEffect(() => {
    if (document.getElementById(PROGRESS_STYLE_ID)) {
      return;
    }
    const style = document.createElement("style");
    style.id = PROGRESS_STYLE_ID;
    style.textContent = PROGRESS_KEYFRAMES_CSS;
    document.head.appendChild(style);
  }, []);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Progress — a linear progress bar for displaying completion or loading state.
 *
 * Built on the design system's token layer with CVA for variant composition.
 * All colors, radii, spacing, and transitions come from CSS custom properties
 * defined in design-system.css.
 *
 * Supports both determinate (with a known value) and indeterminate (unknown
 * completion) modes. Add stripes and animation for visual emphasis.
 *
 * Accessibility:
 *   - Uses `role="progressbar"` with proper ARIA attributes
 *   - `aria-valuenow`, `aria-valuemin`, `aria-valuemax` for determinate mode
 *   - `aria-valuenow` is omitted for indeterminate mode (per WAI-ARIA spec)
 *   - Supports `aria-label` and `aria-labelledby` for screen readers
 *
 * @example
 * ```tsx
 * // Basic determinate progress
 * <Progress value={60} />
 *
 * // With variant and label
 * <Progress value={80} variant="success" showLabel />
 *
 * // Indeterminate (loading)
 * <Progress indeterminate />
 *
 * // Striped with animation
 * <Progress value={45} striped animated />
 *
 * // Large with custom label
 * <Progress value={30} size="lg" showLabel label="Uploading files..." />
 *
 * // Custom format
 * <Progress
 *   value={750}
 *   max={1000}
 *   showLabel
 *   formatLabel={(v, m) => `${v}/${m} MB`}
 * />
 *
 * // Danger variant (e.g. storage warning)
 * <Progress value={92} variant="danger" showLabel />
 * ```
 */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  function Progress(
    {
      value = 0,
      max = 100,
      min = 0,
      variant = "default",
      size = "md",
      indeterminate = false,
      striped = false,
      animated = false,
      showLabel = false,
      label,
      formatLabel,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      className,
      indicatorClassName,
      ...rest
    },
    ref,
  ) {
    // Inject keyframe styles into <head> on mount (client-only)
    useProgressKeyframes();

    // Clamp value between min and max
    const clampedValue = Math.max(min, Math.min(value, max));
    const range = max - min;
    const percentage = range > 0 ? ((clampedValue - min) / range) * 100 : 0;

    // Build label text
    const defaultFormatLabel = (v: number, m: number): string => {
      const pct = m - min > 0 ? ((v - min) / (m - min)) * 100 : 0;
      return `${Math.round(pct)}%`;
    };
    const labelFormatter = formatLabel ?? defaultFormatLabel;
    const _labelText = label ?? labelFormatter(clampedValue, max);

    // Indicator inline styles
    const indicatorStyle: React.CSSProperties = {
      ...(indeterminate
        ? {
            animation:
              "unified-ui-progress-indeterminate 1.5s ease-in-out infinite",
          }
        : {
            width: `${percentage}%`,
          }),
      ...(striped ? stripedStyle : {}),
      ...(striped && animated
        ? {
            animation: indeterminate
              ? "unified-ui-progress-indeterminate 1.5s ease-in-out infinite"
              : "unified-ui-progress-stripe-slide 0.6s linear infinite",
          }
        : {}),
    };

    // ARIA attributes — omit aria-valuenow for indeterminate per spec
    const ariaAttrs: Record<string, unknown> = {
      role: "progressbar",
      "aria-valuemin": min,
      "aria-valuemax": max,
      ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
      ...(ariaLabelledBy ? { "aria-labelledby": ariaLabelledBy } : {}),
    };

    if (!indeterminate) {
      ariaAttrs["aria-valuenow"] = clampedValue;
    }

    return (
      <div
        data-ds=""
        data-ds-component="progress"
        data-ds-variant={variant}
        data-ds-size={size}
        {...(indeterminate ? { "data-ds-indeterminate": "" } : {})}
      >
        {/* Label row */}
        {showLabel && (
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium leading-4 text-foreground">
              {label ?? ""}
            </span>
            <span className="text-xs font-medium leading-4 text-muted-foreground tabular-nums">
              {typeof label === "string" || !label
                ? labelFormatter(clampedValue, max)
                : ""}
            </span>
          </div>
        )}

        {/* Track */}
        <div
          ref={ref}
          className={cn(progressTrackVariants({ size }), className)}
          {...ariaAttrs}
          {...rest}
        >
          {/* Indicator */}
          <div
            className={cn(
              progressIndicatorVariants({ variant }),
              indeterminate && "absolute",
              indicatorClassName,
            )}
            style={indicatorStyle}
          />
        </div>
      </div>
    );
  },
);

Progress.displayName = "Progress";
