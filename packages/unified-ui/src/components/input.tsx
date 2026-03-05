"use client";

// ============================================================================
// Unified UI — Input Component
// ============================================================================
// A production-ready text input component built on the Unified UI token layer.
// Uses class-variance-authority (CVA) for variant composition and
// tailwind-merge (via cn) for safe class merging.
//
// Features:
//   - 3 visual variants: default, error, success
//   - 3 sizes: sm, md, lg (matching Button heights: h-8, h-9, h-10)
//   - States: disabled, readonly, focused
//   - Icon support (left and right)
//   - Clearable option with clear button
//   - Full ref forwarding
//   - WCAG AA accessible: focus ring, aria-invalid, aria-describedby
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { Input } from "@/design-system/components/input";
//
//   <Input placeholder="Enter your name" />
//   <Input variant="error" aria-describedby="email-error" />
//   <Input size="sm" iconLeft={<SearchIcon className="size-4" />} />
//   <Input clearable value={value} onClear={() => setValue("")} />
// ============================================================================

import { cn, composeRefs } from "@unified-ui/utils/cn";
import {
  focusRingClasses,
  focusRingInsetClasses,
} from "@unified-ui/utils/focus-ring";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ReactNode, useCallback, useRef } from "react";

// ---------------------------------------------------------------------------
// CVA Variant Definition
// ---------------------------------------------------------------------------

export const inputVariants = cva(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "flex w-full",
    // Typography
    "text-sm leading-5",
    // Shape
    "rounded-md",
    // Border
    "border",
    // Colors
    "bg-background text-input-foreground",
    "placeholder:text-input-placeholder",
    // Transition
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    // Focus ring — WCAG AA compliant, visible on keyboard navigation only
    focusRingClasses,
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled-foreground",
    // Read-only
    "read-only:bg-muted read-only:cursor-default",
    // File input styling
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Visual Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Default — standard input with muted border.
         */
        default: [
          "border-input",
          "hover:border-border-strong",
          "focus-visible:border-border-strong",
        ],

        /**
         * Error — validation failed. Uses danger color.
         */
        error: [
          "border-danger",
          "text-foreground",
          "focus-visible:border-danger",
          "placeholder:text-input-placeholder",
        ],

        /**
         * Success — validation passed. Uses success color.
         */
        success: [
          "border-success",
          "text-foreground",
          "focus-visible:border-success",
          "placeholder:text-input-placeholder",
        ],
      },

      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — compact for dense UIs, tables, toolbars.
         * Height: 32px (h-8)
         */
        sm: "h-8 px-2.5 text-xs",

        /**
         * Medium — default size for most inputs.
         * Height: var(--ds-control-height)
         */
        md: "h-(--ds-control-height) px-3 text-sm",

        /**
         * Large — prominent inputs for hero sections, forms.
         * Height: 40px (h-10)
         */
        lg: "h-10 px-3.5 text-sm",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

// ---------------------------------------------------------------------------
// Wrapper Variants (for icon/clearable support)
// ---------------------------------------------------------------------------

const inputWrapperVariants = cva(["relative flex items-center w-full"], {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type InputVariant = "default" | "error" | "success";
export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  /**
   * Visual variant of the input.
   * @default "default"
   */
  variant?: InputVariant;

  /**
   * Size of the input.
   * @default "md"
   */
  size?: InputSize;

  /**
   * Icon to display on the left side of the input.
   * Typically a Lucide icon component rendered at the appropriate size.
   */
  iconLeft?: ReactNode;

  /**
   * Icon to display on the right side of the input.
   * If `clearable` is true and there is a value, the clear button
   * takes precedence over `iconRight`.
   */
  iconRight?: ReactNode;

  /**
   * Whether to show a clear button when the input has a value.
   * @default false
   */
  clearable?: boolean;

  /**
   * Callback fired when the clear button is clicked.
   * If not provided, the input will dispatch a native change event
   * with an empty string value.
   */
  onClear?: () => void;

  /**
   * Additional CSS classes for the outer wrapper element.
   * Use this when you need to control the width/margin of the input group.
   */
  wrapperClassName?: string;

  /** Additional CSS classes to merge on the input element. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Icon Size Map
// ---------------------------------------------------------------------------

const iconSizeMap: Record<InputSize, string> = {
  sm: "[&>svg]:size-3.5",
  md: "[&>svg]:size-4",
  lg: "[&>svg]:size-4",
};

const iconPaddingLeftMap: Record<InputSize, string> = {
  sm: "pl-7",
  md: "pl-9",
  lg: "pl-10",
};

const iconPaddingRightMap: Record<InputSize, string> = {
  sm: "pr-7",
  md: "pr-9",
  lg: "pr-10",
};

const iconLeftPositionMap: Record<InputSize, string> = {
  sm: "left-2",
  md: "left-3",
  lg: "left-3.5",
};

const iconRightPositionMap: Record<InputSize, string> = {
  sm: "right-2",
  md: "right-3",
  lg: "right-3.5",
};

// ---------------------------------------------------------------------------
// Clear Button (Internal)
// ---------------------------------------------------------------------------

function ClearButton({
  size,
  onClick,
}: {
  size: InputSize;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "absolute flex items-center justify-center",
        "text-muted-foreground hover:text-foreground",
        "transition-colors duration-fast",
        focusRingInsetClasses,
        "rounded-sm",
        iconRightPositionMap[size],
        iconSizeMap[size],
      )}
      aria-label="Clear input"
      tabIndex={-1}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={size === "sm" ? "size-3.5" : "size-4"}
        aria-hidden="true"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Input — a text input for capturing user data.
 *
 * Built on the design system's token layer with CVA for variant composition.
 * All colors, radii, spacing, and transitions come from CSS custom properties
 * defined in design-system.css.
 *
 * Accessibility:
 *   - Focus ring visible on keyboard navigation (focus-visible)
 *   - Disabled state uses both `disabled` attribute and `aria-disabled`
 *   - Error variant sets `aria-invalid="true"` automatically
 *   - Supports `aria-describedby` for linking to error/helper messages
 *   - Clear button has `aria-label` and is excluded from tab order
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Input placeholder="Enter your name" />
 *
 * // With variant
 * <Input variant="error" aria-describedby="email-error" />
 *
 * // With icons
 * <Input iconLeft={<SearchIcon />} placeholder="Search..." />
 * <Input iconRight={<MailIcon />} placeholder="Email" />
 *
 * // Clearable
 * <Input
 *   clearable
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 *   onClear={() => setValue("")}
 * />
 *
 * // Sizes
 * <Input size="sm" placeholder="Small" />
 * <Input size="md" placeholder="Medium" />
 * <Input size="lg" placeholder="Large" />
 *
 * // Disabled / Read-only
 * <Input disabled placeholder="Disabled" />
 * <Input readOnly value="Read-only value" />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    variant = "default",
    size = "md",
    iconLeft,
    iconRight,
    clearable = false,
    onClear,
    wrapperClassName,
    className,
    disabled,
    readOnly,
    value,
    defaultValue,
    "aria-invalid": ariaInvalid,
    ...rest
  },
  ref,
) {
  const internalRef = useRef<HTMLInputElement>(null);
  const hasIcons = !!iconLeft || !!iconRight || clearable;

  // Determine if clear button should be shown
  const showClear =
    clearable &&
    !disabled &&
    !readOnly &&
    (value !== undefined ? String(value).length > 0 : false);

  // Handle clear action
  const handleClear = useCallback(() => {
    if (onClear) {
      onClear();
    } else if (internalRef.current) {
      // Dispatch a native-like change event for uncontrolled inputs
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value",
      )?.set;
      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(internalRef.current, "");
        internalRef.current.dispatchEvent(
          new Event("input", { bubbles: true }),
        );
      }
    }
    // Refocus the input after clearing
    internalRef.current?.focus();
  }, [onClear]);

  // Determine aria-invalid — auto-set for error variant if not explicitly provided
  const resolvedAriaInvalid =
    ariaInvalid !== undefined
      ? ariaInvalid
      : variant === "error"
        ? true
        : undefined;

  // Build input className
  const inputClasses = cn(
    inputVariants({ variant, size }),
    iconLeft && iconPaddingLeftMap[size],
    (iconRight || showClear) && iconPaddingRightMap[size],
    className,
  );

  // If no icons or clearable, render a simple input
  if (!hasIcons) {
    return (
      <input
        ref={composeRefs(internalRef, ref)}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        defaultValue={defaultValue}
        aria-invalid={resolvedAriaInvalid}
        aria-disabled={disabled || undefined}
        className={inputClasses}
        data-ds=""
        data-ds-component="input"
        data-ds-variant={variant}
        data-ds-size={size}
        {...rest}
      />
    );
  }

  // Render with wrapper for icon/clearable support
  return (
    <div
      className={cn(inputWrapperVariants({ size }), wrapperClassName)}
      data-ds=""
      data-ds-component="input-wrapper"
    >
      {/* Left icon */}
      {iconLeft && (
        <span
          className={cn(
            "pointer-events-none absolute flex items-center justify-center",
            "text-muted-foreground",
            iconLeftPositionMap[size],
            iconSizeMap[size],
          )}
          aria-hidden="true"
        >
          {iconLeft}
        </span>
      )}

      {/* Input element */}
      <input
        ref={composeRefs(internalRef, ref)}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        defaultValue={defaultValue}
        aria-invalid={resolvedAriaInvalid}
        aria-disabled={disabled || undefined}
        className={inputClasses}
        data-ds=""
        data-ds-component="input"
        data-ds-variant={variant}
        data-ds-size={size}
        {...rest}
      />

      {/* Clear button or right icon */}
      {showClear ? (
        <ClearButton size={size} onClick={handleClear} />
      ) : (
        iconRight && (
          <span
            className={cn(
              "pointer-events-none absolute flex items-center justify-center",
              "text-muted-foreground",
              iconRightPositionMap[size],
              iconSizeMap[size],
            )}
            aria-hidden="true"
          >
            {iconRight}
          </span>
        )
      )}
    </div>
  );
});

Input.displayName = "Input";
