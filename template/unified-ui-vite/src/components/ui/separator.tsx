"use client";

// ============================================================================
// Unified UI — Separator Component
// ============================================================================
// A visual separator between content sections, built on Radix UI's
// Separator primitive with design system tokens.
//
// Features:
//   - Horizontal and vertical orientations
//   - Decorative (default) and semantic modes
//   - Configurable spacing via Tailwind spacing scale
//   - Label support (text or ReactNode rendered centered on the separator)
//   - Gradient variant for subtle visual flair
//   - Full ref forwarding
//   - WCAG AA accessible: proper role and aria-orientation
//   - Uses design system border tokens
//
// Usage:
//   import { Separator } from "@/design-system/components/separator";
//
//   <Separator />
//   <Separator orientation="vertical" />
//   <Separator spacing={6} />
//   <Separator label="OR" />
//   <Separator variant="gradient" />
// ============================================================================

import { cva, type VariantProps } from "class-variance-authority";
import { Separator as SeparatorPrimitive } from "radix-ui";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

// ---------------------------------------------------------------------------
// CVA Variant Definition
// ---------------------------------------------------------------------------

export const separatorVariants = cva(
  // Base styles — shared across all variants
  "shrink-0 bg-border",
  {
    variants: {
      /**
       * Visual variant of the separator line.
       */
      variant: {
        /**
         * Default — solid line using the border token color.
         */
        default: "",

        /**
         * Muted — lighter separator using the muted-foreground color at
         * reduced opacity. Useful for less prominent divisions.
         */
        muted: "bg-muted-foreground/20",

        /**
         * Dashed — renders a dashed border instead of a solid background.
         * Uses border-style rather than background.
         */
        dashed: "bg-transparent !h-auto !w-auto",

        /**
         * Gradient — fades in from transparent at both ends.
         * Creates a more elegant, subtle divider.
         */
        gradient: "bg-transparent",
      },

      /**
       * Orientation of the separator.
       */
      orientation: {
        horizontal: "h-px w-full",
        vertical: "h-full w-px",
      },
    },

    compoundVariants: [
      // Dashed + horizontal
      {
        variant: "dashed",
        orientation: "horizontal",
        class: "border-b border-dashed border-border w-full",
      },
      // Dashed + vertical
      {
        variant: "dashed",
        orientation: "vertical",
        class: "border-l border-dashed border-border h-full",
      },
    ],

    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
    },
  },
);

// ---------------------------------------------------------------------------
// Spacing Maps
// ---------------------------------------------------------------------------

const spacingYMap: Record<number, string> = {
  0: "my-0",
  1: "my-1",
  2: "my-2",
  3: "my-3",
  4: "my-4",
  5: "my-5",
  6: "my-6",
  8: "my-8",
  10: "my-10",
  12: "my-12",
};

const spacingXMap: Record<number, string> = {
  0: "mx-0",
  1: "mx-1",
  2: "mx-2",
  3: "mx-3",
  4: "mx-4",
  5: "mx-5",
  6: "mx-6",
  8: "mx-8",
  10: "mx-10",
  12: "mx-12",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SeparatorVariant = NonNullable<
  VariantProps<typeof separatorVariants>["variant"]
>;

export type SeparatorOrientation = "horizontal" | "vertical";

export type SeparatorSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;

export interface SeparatorProps
  extends ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  /**
   * Visual variant of the separator.
   * @default "default"
   */
  variant?: SeparatorVariant;

  /**
   * Orientation of the separator.
   * @default "horizontal"
   */
  orientation?: SeparatorOrientation;

  /**
   * Whether the separator is purely decorative. When `true`, it is hidden
   * from the accessibility tree. When `false`, it renders as a semantic
   * separator with `role="separator"`.
   * @default true
   */
  decorative?: boolean;

  /**
   * Vertical margin (horizontal orientation) or horizontal margin
   * (vertical orientation), using Tailwind spacing scale.
   * @default 4
   */
  spacing?: SeparatorSpacing;

  /**
   * Optional label to render centered on the separator.
   * Creates a "divider with text" pattern (e.g., "OR", "Continue", etc.).
   * Only supported for horizontal orientation.
   */
  label?: ReactNode;

  /**
   * Additional CSS classes applied to the separator line (or wrapper
   * when a label is present).
   */
  className?: string;
}

// ---------------------------------------------------------------------------
// Gradient Background Helper
// ---------------------------------------------------------------------------

const gradientHorizontal =
  "bg-gradient-to-r from-transparent via-border to-transparent";
const gradientVertical =
  "bg-gradient-to-b from-transparent via-border to-transparent";

// ---------------------------------------------------------------------------
// Separator Component
// ---------------------------------------------------------------------------

/**
 * Separator — a visual divider between content sections.
 *
 * Built on Radix UI's Separator primitive with design system tokens for
 * consistent styling. Supports horizontal and vertical orientations,
 * optional labels, and multiple visual variants.
 *
 * Accessibility:
 *   - `decorative={true}` (default) → `role="none"`, hidden from AT
 *   - `decorative={false}` → `role="separator"` + `aria-orientation`
 *   - Label text is visible but does not affect semantics when decorative
 *
 * @example
 * ```tsx
 * // Basic horizontal separator
 * <Separator />
 *
 * // With custom spacing
 * <Separator spacing={6} />
 *
 * // Vertical separator (e.g., in a toolbar)
 * <Separator orientation="vertical" />
 *
 * // With a label
 * <Separator label="OR" />
 * <Separator label={<span className="text-muted-foreground">Section</span>} />
 *
 * // Muted variant
 * <Separator variant="muted" />
 *
 * // Dashed variant
 * <Separator variant="dashed" />
 *
 * // Gradient variant
 * <Separator variant="gradient" />
 *
 * // Semantic (non-decorative) separator
 * <Separator decorative={false} />
 * ```
 */
export const Separator = forwardRef<
  ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(function Separator(
  {
    variant = "default",
    orientation = "horizontal",
    decorative = true,
    spacing = 4,
    label,
    className,
    ...rest
  },
  ref,
) {
  const isVertical = orientation === "vertical";
  const spacingClass = isVertical
    ? (spacingXMap[spacing] ?? "mx-4")
    : (spacingYMap[spacing] ?? "my-4");

  // Resolve gradient classes for the gradient variant
  const gradientClass =
    variant === "gradient"
      ? isVertical
        ? gradientVertical
        : gradientHorizontal
      : undefined;

  // -------------------------------------------------------------------------
  // Labeled separator (horizontal only)
  // -------------------------------------------------------------------------
  if (label && !isVertical) {
    return (
      <div
        className={cn("flex items-center w-full", spacingClass, className)}
        role={decorative ? "none" : "separator"}
        aria-orientation={decorative ? undefined : orientation}
        data-ds=""
        data-ds-component="separator"
        data-ds-variant={variant}
        data-ds-orientation={orientation}
        data-ds-labeled=""
      >
        <SeparatorPrimitive.Root
          decorative
          orientation={orientation}
          className={cn(
            separatorVariants({ variant, orientation }),
            gradientClass,
            "flex-1",
          )}
        />
        <span className="px-3 text-xs text-muted-foreground font-medium select-none shrink-0">
          {label}
        </span>
        <SeparatorPrimitive.Root
          decorative
          orientation={orientation}
          className={cn(
            separatorVariants({ variant, orientation }),
            gradientClass,
            "flex-1",
          )}
        />
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Standard separator (no label)
  // -------------------------------------------------------------------------
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        separatorVariants({ variant, orientation }),
        gradientClass,
        spacingClass,
        className,
      )}
      data-ds=""
      data-ds-component="separator"
      data-ds-variant={variant}
      data-ds-orientation={orientation}
      {...rest}
    />
  );
});

Separator.displayName = "Separator";
