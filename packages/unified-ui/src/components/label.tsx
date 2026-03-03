"use client";

// ============================================================================
// Unified UI — Label Component
// ============================================================================
// An accessible <label> component built on Radix UI's Label primitive and
// the Unified UI token layer. Uses class-variance-authority (CVA) for variant
// composition and tailwind-merge (via cn) for safe class merging.
//
// Features:
//   - 3 sizes: sm, md, lg (matching Input/Button size scale)
//   - Required indicator (red asterisk) with configurable position
//   - Optional description/helper text below the label
//   - Disabled state with reduced opacity and not-allowed cursor
//   - Full ref forwarding
//   - WCAG AA accessible: proper <label> semantics, htmlFor linkage
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { Label } from "@/design-system/components/label";
//
//   <Label htmlFor="email">Email address</Label>
//   <Label htmlFor="name" required>Full name</Label>
//   <Label htmlFor="bio" size="sm" description="Max 200 characters">Bio</Label>
//   <Label htmlFor="locked" disabled>Locked field</Label>
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { Label as LabelPrimitive } from "radix-ui";
import { forwardRef, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// CVA Variant Definition
// ---------------------------------------------------------------------------

export const labelVariants = cva(
  // Base styles — shared across all sizes
  [
    // Typography
    "font-medium leading-none text-foreground",
    // Prevent text selection on double-click
    "select-none",
    // Peer-disabled styling (when used with peer inputs)
    "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — for compact forms and dense UIs.
         * Font: 12px
         */
        sm: "text-xs leading-4",

        /**
         * Medium — default size for most labels.
         * Font: 14px
         */
        md: "text-sm leading-5",

        /**
         * Large — for prominent form fields.
         * Font: 14px with slightly more weight
         */
        lg: "text-sm leading-5 font-semibold",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type LabelSize = "sm" | "md" | "lg";

export interface LabelProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
      "asChild"
    >,
    VariantProps<typeof labelVariants> {
  /**
   * Size of the label text.
   * @default "md"
   */
  size?: LabelSize;

  /**
   * Whether the associated field is required.
   * When true, a red asterisk (*) is displayed after the label text.
   * @default false
   */
  required?: boolean;

  /**
   * Whether the associated field is disabled.
   * Applies reduced opacity and not-allowed cursor.
   * @default false
   */
  disabled?: boolean;

  /**
   * Optional description or helper text displayed below the label.
   * Useful for providing additional context about the field.
   */
  description?: ReactNode;

  /**
   * Additional CSS classes for the description text.
   */
  descriptionClassName?: string;

  /**
   * Additional CSS classes for the outer wrapper element.
   * Only applied when `description` is provided (wrapper is needed
   * to stack label + description).
   */
  wrapperClassName?: string;

  /** Content to render inside the label. */
  children?: ReactNode;

  /** Additional CSS classes to merge on the label element. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Required Indicator (Internal)
// ---------------------------------------------------------------------------
// A small red asterisk rendered after the label text to indicate that the
// associated field is required. Uses the danger color for high visibility
// against any background.
// ---------------------------------------------------------------------------

function RequiredIndicator({ className }: { className?: string }) {
  return (
    <span className={cn("text-danger ml-0.5", className)} aria-hidden="true">
      *
    </span>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Label — an accessible label for form controls.
 *
 * Built on Radix UI's Label primitive for proper accessibility semantics
 * and the design system's token layer for consistent styling. When used
 * with Radix form controls, clicking the label will focus the associated
 * input automatically.
 *
 * Accessibility:
 *   - Renders as a native `<label>` element for proper semantics
 *   - Use `htmlFor` to associate with the corresponding input's `id`
 *   - Required indicator is decorative (`aria-hidden`) — use `aria-required`
 *     on the input itself for screen reader support
 *   - Disabled state is visual only — disable the input for functional disabling
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Label htmlFor="email">Email address</Label>
 * <Input id="email" type="email" />
 *
 * // Required field
 * <Label htmlFor="name" required>Full name</Label>
 * <Input id="name" aria-required="true" />
 *
 * // With description
 * <Label htmlFor="bio" description="Keep it under 200 characters.">
 *   Bio
 * </Label>
 * <Textarea id="bio" />
 *
 * // Small size for dense UIs
 * <Label htmlFor="code" size="sm">Verification code</Label>
 * <Input id="code" size="sm" />
 *
 * // Disabled
 * <Label htmlFor="locked" disabled>Locked field</Label>
 * <Input id="locked" disabled />
 * ```
 */
export const Label = forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  LabelProps
>(function Label(
  {
    size = "md",
    required = false,
    disabled = false,
    description,
    descriptionClassName,
    wrapperClassName,
    className,
    children,
    ...rest
  },
  ref,
) {
  // Resolve description size based on label size
  const descriptionSizeClass =
    size === "sm" ? "text-[11px] leading-4" : "text-xs leading-4";

  // Build the label element
  const labelElement = (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        labelVariants({ size }),
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "cursor-pointer",
        className,
      )}
      data-ds=""
      data-ds-component="label"
      data-ds-size={size}
      {...(disabled ? { "data-ds-disabled": "" } : {})}
      {...(required ? { "data-ds-required": "" } : {})}
      {...rest}
    >
      {children}
      {required && <RequiredIndicator />}
    </LabelPrimitive.Root>
  );

  // If no description, return just the label
  if (!description) {
    return labelElement;
  }

  // Wrap label + description in a stacked container
  return (
    <div
      className={cn("flex flex-col gap-1", wrapperClassName)}
      data-ds=""
      data-ds-component="label-group"
    >
      {labelElement}
      <span
        className={cn(
          descriptionSizeClass,
          "text-muted-foreground",
          disabled && "opacity-50",
          descriptionClassName,
        )}
      >
        {description}
      </span>
    </div>
  );
});

Label.displayName = "Label";
