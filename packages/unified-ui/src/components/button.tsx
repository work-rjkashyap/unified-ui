"use client";

// ============================================================================
// Unified UI — Button Component
// ============================================================================
// Production-ready button component built on the Unified UI token layer.
// Uses class-variance-authority (CVA) for variant composition and
// tailwind-merge (via cn) for safe class merging.
//
// Features:
//   - 4 visual variants: primary, secondary, ghost, danger
//   - 3 sizes: sm, md, lg
//   - Loading state with spinner and disabled interaction
//   - Icon support (leading and trailing)
//   - Full ref forwarding
//   - WCAG AA accessible: focus ring, disabled state, aria attributes
//   - Polymorphic: can render as <a>, <Link>, or any element via `as`
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { Button } from "@/design-system/components/button";
//
//   <Button variant="primary" size="md" onClick={handleClick}>
//     Save Changes
//   </Button>
//
//   <Button variant="ghost" size="sm" iconLeft={<SearchIcon />}>
//     Search
//   </Button>
//
//   <Button variant="primary" loading loadingText="Saving...">
//     Save
//   </Button>
//
//   <Button variant="danger" disabled>
//     Delete
//   </Button>
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { cva, type VariantProps } from "class-variance-authority";
import { type ElementType, forwardRef, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// CVA Variant Definition
// ---------------------------------------------------------------------------
// All color values reference design system CSS custom properties via the
// Tailwind utilities defined in design-system.css. This ensures
// automatic light/dark mode support and token compliance.
// ---------------------------------------------------------------------------

export const buttonVariants = cva(
  // Base styles — shared across all variants and sizes
  [
    // Opt out of prose typography overrides (prevents underline on <a> buttons)
    "not-prose no-underline",
    // Layout
    "inline-flex items-center justify-center gap-2",
    // Typography
    "text-sm font-medium leading-5",
    // Shape
    "rounded-md",
    // Transition (uses design system motion tokens)
    "transition-[color,background-color,border-color,box-shadow,opacity,transform]",
    "duration-fast ease-standard",
    // Focus ring — WCAG AA compliant, visible on keyboard navigation only
    focusRingClasses,
    // Disabled — consistent across all variants
    "disabled:pointer-events-none disabled:opacity-50",
    // Cursor
    "cursor-pointer disabled:cursor-not-allowed",
    // Prevent text selection on rapid clicks
    "select-none",
    // Smooth press feedback
    "active:scale-[0.98] disabled:active:scale-100",
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Visual Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Primary — the main call-to-action. Uses brand color.
         * High visual prominence. Use sparingly (1–2 per view).
         */
        primary: [
          "bg-primary text-primary-foreground",
          "hover:bg-primary-hover",
          "active:bg-primary-active",
        ],

        /**
         * Secondary — for secondary actions. Uses muted surface color.
         * Medium visual prominence. Pairs with primary buttons.
         */
        secondary: [
          "bg-secondary text-secondary-foreground",
          "border border-border",
          "hover:bg-secondary-hover",
          "active:bg-secondary-active",
        ],

        /**
         * Ghost — minimal visual weight. No background until hover.
         * Low visual prominence. Use for tertiary actions, toolbars, nav.
         */
        ghost: [
          "bg-transparent text-foreground",
          "hover:bg-muted hover:text-foreground",
          "active:bg-secondary-active",
        ],

        /**
         * Danger — destructive actions. Uses danger (red) color.
         * High visual prominence. Use for delete, remove, revoke actions.
         */
        danger: [
          "bg-danger text-danger-foreground",
          "hover:bg-danger-hover",
          "active:bg-danger-active",
        ],
      },

      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — compact buttons for dense UIs, tables, toolbars.
         * Height: 32px (h-8), Padding: 12px horizontal, Font: 12px
         */
        sm: "h-8 px-3 text-xs gap-1.5",

        /**
         * Medium — default size for most buttons.
         * Height: var(--ds-control-height), Padding: var(--ds-padding-button-x), Font: 14px
         */
        md: "h-(--ds-control-height) px-(--ds-padding-button-x) text-sm gap-2",

        /**
         * Large — prominent buttons for hero sections, forms.
         * Height: 40px (h-10), Padding: 20px horizontal, Font: 14px
         */
        lg: "h-10 px-5 text-sm gap-2",
      },

      // -----------------------------------------------------------------
      // Width Variants
      // -----------------------------------------------------------------
      fullWidth: {
        true: "w-full",
        false: "",
      },

      // -----------------------------------------------------------------
      // Icon-Only Variant
      // -----------------------------------------------------------------
      iconOnly: {
        true: "!px-0",
        false: "",
      },
    },

    // -------------------------------------------------------------------
    // Compound Variants
    // -------------------------------------------------------------------
    // Handle special combinations that can't be expressed as individual
    // variant values.
    // -------------------------------------------------------------------
    compoundVariants: [
      // Icon-only buttons are square (width = height)
      { iconOnly: true, size: "sm", className: "w-8" },
      { iconOnly: true, size: "md", className: "w-9" },
      { iconOnly: true, size: "lg", className: "w-10" },
    ],

    // -------------------------------------------------------------------
    // Default Variants
    // -------------------------------------------------------------------
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      iconOnly: false,
    },
  },
);

// ---------------------------------------------------------------------------
// Spinner Component (Internal)
// ---------------------------------------------------------------------------
// A lightweight CSS-only spinner used for the button's loading state.
// Sized relative to the button's font size so it scales with size variants.
// ---------------------------------------------------------------------------

function ButtonSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin size-4", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonVariants> {
  /**
   * Visual variant of the button.
   * @default "primary"
   */
  variant?: ButtonVariant;

  /**
   * Size of the button.
   * @default "md"
   */
  size?: ButtonSize;

  /**
   * Whether the button stretches to fill its container.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Whether the button is in a loading state.
   * When true, the button is disabled and shows a spinner.
   * @default false
   */
  loading?: boolean;

  /**
   * Text to display alongside the spinner during loading.
   * If not provided, the original children are hidden and only
   * the spinner is shown.
   */
  loadingText?: string;

  /**
   * Icon to display before the button label.
   */
  iconLeft?: ReactNode;

  /**
   * Icon to display after the button label.
   */
  iconRight?: ReactNode;

  /**
   * Whether this is an icon-only button (no text label).
   * Ensures the button is square and properly sized.
   * When true, you MUST provide an `aria-label` for accessibility.
   * @default false
   */
  iconOnly?: boolean;

  /**
   * Whether the button is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * The HTML element or component to render as.
   * Useful for rendering as an anchor (<a>) or Next.js <Link>.
   * @default "button"
   */
  as?: ElementType;

  /** Content to render inside the button. */
  children?: ReactNode;

  /** Additional CSS classes to merge. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Button — the primary interactive element for triggering actions.
 *
 * Built on the design system's token layer with CVA for variant composition.
 * All colors, radii, spacing, and transitions come from CSS custom properties
 * defined in design-system.css.
 *
 * Accessibility:
 *   - Focus ring visible on keyboard navigation (focus-visible)
 *   - Disabled state uses both `disabled` attribute and `aria-disabled`
 *   - Loading state sets `aria-busy="true"` and disables interaction
 *   - Icon-only buttons require `aria-label`
 *
 * @example
 * ```tsx
 * // Primary action
 * <Button variant="primary" onClick={handleSave}>
 *   Save Changes
 * </Button>
 *
 * // Secondary with icon
 * <Button variant="secondary" iconLeft={<PlusIcon className="size-4" />}>
 *   Add Item
 * </Button>
 *
 * // Loading state
 * <Button variant="primary" loading loadingText="Saving...">
 *   Save
 * </Button>
 *
 * // Icon-only
 * <Button variant="ghost" iconOnly aria-label="Close">
 *   <XIcon className="size-4" />
 * </Button>
 *
 * // Danger / destructive
 * <Button variant="danger" onClick={handleDelete}>
 *   Delete Account
 * </Button>
 *
 * // Rendered as anchor
 * <Button as="a" href="/login" variant="secondary">
 *   Log In
 * </Button>
 *
 * // Full-width
 * <Button variant="primary" fullWidth>
 *   Continue
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      loadingText,
      iconLeft,
      iconRight,
      iconOnly = false,
      disabled = false,
      as: Component = "button",
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const isDisabled = disabled || loading;

    // Icon sizing classes based on button size
    const iconSizeClass = size === "sm" ? "[&>svg]:size-3.5" : "[&>svg]:size-4";

    return (
      <Component
        ref={ref}
        type={Component === "button" ? "button" : undefined}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        className={cn(
          buttonVariants({ variant, size, fullWidth, iconOnly }),
          iconSizeClass,
          className,
        )}
        data-ds=""
        data-ds-component="button"
        data-ds-variant={variant}
        data-ds-size={size}
        {...(loading ? { "data-ds-loading": "" } : {})}
        {...rest}
      >
        {/* Loading state */}
        {loading && (
          <ButtonSpinner className={size === "sm" ? "size-3.5" : "size-4"} />
        )}

        {/* Loading text or original content */}
        {loading && loadingText ? (
          <span>{loadingText}</span>
        ) : (
          <>
            {/* Leading icon (hidden during loading to avoid double icon) */}
            {!loading && iconLeft && (
              <span className="shrink-0" aria-hidden="true">
                {iconLeft}
              </span>
            )}

            {/* Label */}
            {children && (
              <span
                className={cn(
                  "inline-flex items-center gap-[inherit]",
                  loading && !loadingText && "invisible",
                )}
              >
                {children}
              </span>
            )}

            {/* Trailing icon */}
            {!loading && iconRight && (
              <span className="shrink-0" aria-hidden="true">
                {iconRight}
              </span>
            )}
          </>
        )}
      </Component>
    );
  },
);

Button.displayName = "Button";
