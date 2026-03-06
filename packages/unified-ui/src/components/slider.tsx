"use client";

// ============================================================================
// Unified UI — Slider Component
// ============================================================================
// A production-ready range slider built on Radix UI's Slider primitive
// and the Unified UI token layer. Supports single and dual thumb, marks,
// step snapping, and value tooltip.
//
// Features:
//   - Built on @radix-ui/react-slider (via radix-ui) for full accessibility
//   - Single and dual-thumb range mode
//   - Size variants: sm, md, lg
//   - Visual variants: default, primary, success, danger
//   - Optional step marks
//   - Value tooltip on hover/drag
//   - Framer Motion: whileDrag spring on thumb, fadeInFast for tooltip
//   - Respects prefers-reduced-motion
//   - Full ref forwarding
//   - WCAG AA: keyboard navigation, aria-valuemin/max/now via Radix
//
// Usage:
//   <Slider defaultValue={[50]} />
//   <Slider value={[25, 75]} onValueChange={setRange} />
//   <Slider min={0} max={100} step={10} showMarks />
// ============================================================================

import { fadeInFast } from "@unified-ui/motion";
import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Slider as SliderPrimitive } from "radix-ui";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  type ReactNode,
  useCallback,
  useState,
} from "react";

// ---------------------------------------------------------------------------
// CVA — Track Variants
// ---------------------------------------------------------------------------

export const sliderTrackVariants = cva(
  [
    "relative flex touch-none select-none",
    "rounded-full",
    "bg-muted",
    "overflow-hidden",
  ],
  {
    variants: {
      orientation: {
        horizontal: "w-full items-center",
        vertical: "h-full flex-col justify-center",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    compoundVariants: [
      { orientation: "horizontal", size: "sm", className: "h-1" },
      { orientation: "horizontal", size: "md", className: "h-1.5" },
      { orientation: "horizontal", size: "lg", className: "h-2" },
      { orientation: "vertical", size: "sm", className: "w-1" },
      { orientation: "vertical", size: "md", className: "w-1.5" },
      { orientation: "vertical", size: "lg", className: "w-2" },
    ],
    defaultVariants: {
      orientation: "horizontal",
      size: "md",
    },
  },
);

export const sliderRangeVariants = cva(["absolute rounded-full"], {
  variants: {
    variant: {
      default: "bg-primary",
      primary: "bg-primary",
      success: "bg-success",
      danger: "bg-danger",
    },
    orientation: {
      horizontal: "h-full",
      vertical: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    orientation: "horizontal",
  },
});

export const sliderThumbVariants = cva(
  [
    "block rounded-full",
    "bg-background border-2",
    "shadow-md",
    "transition-colors duration-fast",
    focusRingClasses,
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-grab active:cursor-grabbing",
  ],
  {
    variants: {
      variant: {
        default: "border-primary",
        primary: "border-primary",
        success: "border-success",
        danger: "border-danger",
      },
      size: {
        sm: "size-3",
        md: "size-4",
        lg: "size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SliderVariant = "default" | "primary" | "success" | "danger";
export type SliderSize = "sm" | "md" | "lg";
export type SliderOrientation = "horizontal" | "vertical";

export interface SliderMark {
  value: number;
  label?: ReactNode;
}

export interface SliderProps
  extends Omit<
    ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    "orientation"
  > {
  /**
   * Visual variant of the slider range and thumb.
   * @default "default"
   */
  variant?: SliderVariant;

  /**
   * Size of the slider track and thumb.
   * @default "md"
   */
  size?: SliderSize;

  /**
   * Orientation of the slider.
   * @default "horizontal"
   */
  orientation?: SliderOrientation;

  /**
   * Whether to show step marks along the track.
   * @default false
   */
  showMarks?: boolean;

  /**
   * Custom marks to render along the track.
   * When provided, overrides auto-generated step marks.
   */
  marks?: SliderMark[];

  /**
   * Whether to show a value tooltip above/beside the thumb on hover/drag.
   * @default false
   */
  showTooltip?: boolean;

  /**
   * Format the tooltip value for display.
   * @default (v) => String(v)
   */
  formatTooltip?: (value: number) => string;

  /** Additional CSS classes. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Tooltip (Internal)
// ---------------------------------------------------------------------------

function SliderTooltip({
  value,
  visible,
  format,
}: {
  value: number;
  visible: boolean;
  format: (v: number) => string;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={cn(
            "absolute -top-8 left-1/2 -translate-x-1/2",
            "px-2 py-0.5 rounded-md",
            "bg-foreground text-background",
            "text-xs font-medium whitespace-nowrap",
            "pointer-events-none select-none",
            "z-tooltip",
          )}
          variants={fadeInFast.variants}
          initial={shouldReduce ? false : "initial"}
          animate="animate"
          exit="exit"
          transition={fadeInFast.transition}
          data-ds-animated=""
        >
          {format(value)}
          {/* Arrow */}
          <span
            className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground"
            aria-hidden="true"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Animated Thumb (Internal)
// ---------------------------------------------------------------------------

const MotionThumb = motion.create(SliderPrimitive.Thumb);

interface SliderThumbItemProps {
  variant?: SliderVariant;
  size?: SliderSize;
  value: number;
  showTooltip?: boolean;
  formatTooltip: (v: number) => string;
  shouldReduce: boolean;
}

function SliderThumbItem({
  variant = "default",
  size = "md",
  value,
  showTooltip = false,
  formatTooltip,
  shouldReduce,
}: SliderThumbItemProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <MotionThumb
      className={cn("relative overflow-visible", sliderThumbVariants({ variant, size }))}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      whileTap={
        shouldReduce
          ? undefined
          : {
              scale: 1.2,
              transition: { type: "spring", stiffness: 400, damping: 25 },
            }
      }
      whileHover={
        shouldReduce
          ? undefined
          : {
              scale: 1.1,
              transition: { type: "spring", stiffness: 400, damping: 30 },
            }
      }
      data-ds-animated=""
    >
      {showTooltip && (
        <SliderTooltip
          value={value}
          visible={isActive}
          format={formatTooltip}
        />
      )}
    </MotionThumb>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Slider — a range input built on Radix UI's Slider primitive.
 *
 * @example
 * // Single thumb
 * <Slider defaultValue={[50]} />
 *
 * // Range (dual thumb)
 * <Slider defaultValue={[25, 75]} min={0} max={100} />
 *
 * // With marks and tooltip
 * <Slider defaultValue={[50]} step={10} showMarks showTooltip />
 *
 * // Danger variant
 * <Slider variant="danger" defaultValue={[80]} />
 */
export const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(function Slider(
  {
    variant = "default",
    size = "md",
    orientation = "horizontal",
    showMarks = false,
    marks,
    showTooltip = false,
    formatTooltip = (v) => String(v),
    className,
    value,
    defaultValue,
    min = 0,
    max = 100,
    step = 1,
    onValueChange,
    ...rest
  },
  ref,
) {
  const shouldReduce = useReducedMotion();

  // Track internal value for thumb rendering
  const [internalValue, setInternalValue] = useState<number[]>(
    value ?? defaultValue ?? [min],
  );

  const handleValueChange = useCallback(
    (newValue: number[]) => {
      setInternalValue(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange],
  );

  // Sync controlled value
  const currentValue = value ?? internalValue;

  // Generate marks
  const resolvedMarks: SliderMark[] =
    marks ??
    (showMarks && step
      ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => ({
          value: min + i * step,
        }))
      : []);

  const isVertical = orientation === "vertical";

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex touch-none select-none items-center",
        isVertical ? "flex-col h-full w-fit" : "w-full h-fit",
        className,
      )}
      orientation={orientation}
      min={min}
      max={max}
      step={step}
      value={value}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      data-ds=""
      data-ds-component="slider"
      data-ds-variant={variant}
      data-ds-size={size}
      data-ds-orientation={orientation}
      {...rest}
    >
      {/* Track */}
      <SliderPrimitive.Track
        className={cn(sliderTrackVariants({ orientation, size }))}
      >
        <SliderPrimitive.Range
          className={cn(sliderRangeVariants({ variant, orientation }))}
        />
      </SliderPrimitive.Track>

      {/* Marks */}
      {resolvedMarks.length > 0 && (
        <div
          className={cn(
            "absolute",
            isVertical
              ? "left-1/2 -translate-x-1/2 h-full flex-col"
              : "top-1/2 -translate-y-1/2 w-full",
            "flex items-center justify-between pointer-events-none",
          )}
          aria-hidden="true"
        >
          {resolvedMarks.map((mark) => {
            const pct = ((mark.value - min) / (max - min)) * 100;
            return (
              <div
                key={mark.value}
                className="absolute flex flex-col items-center"
                style={
                  isVertical
                    ? { bottom: `${pct}%` }
                    : { left: `${pct}%`, transform: "translateX(-50%)" }
                }
              >
                <div
                  className={cn(
                    "rounded-full bg-border",
                    size === "sm"
                      ? "size-1"
                      : size === "md"
                        ? "size-1.5"
                        : "size-2",
                  )}
                />
                {mark.label && (
                  <span className="mt-2 text-xs text-muted-foreground">
                    {mark.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Thumbs */}
      {currentValue.map((thumbValue, index) => (
        <SliderThumbItem
          key={index}
          variant={variant}
          size={size}
          value={thumbValue}
          showTooltip={showTooltip}
          formatTooltip={formatTooltip}
          shouldReduce={shouldReduce ?? false}
        />
      ))}
    </SliderPrimitive.Root>
  );
});

Slider.displayName = "Slider";
