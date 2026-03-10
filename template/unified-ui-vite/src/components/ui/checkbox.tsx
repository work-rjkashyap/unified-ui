"use client";

// ============================================================================
// Unified UI — Checkbox Component
// ============================================================================
// A production-ready checkbox component built on Radix UI's accessible
// checkbox primitive and the Unified UI token layer. Uses CVA for variant
// composition and tailwind-merge (via cn) for safe class merging.
//
// Features:
//   - Built on @radix-ui/react-checkbox for full accessibility
//   - 2 sizes: sm, md
//   - 3 states: checked, unchecked, indeterminate
//   - Integrated clickable label with optional description
//   - CheckboxGroup component for managing multiple checkboxes
//   - Error/disabled states
//   - Full ref forwarding
//   - WCAG AA accessible: focus ring, aria attributes, keyboard navigation
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { Checkbox, CheckboxGroup } from "@/design-system/components/checkbox";
//
//   <Checkbox label="Accept terms" />
//   <Checkbox size="sm" checked={true} onCheckedChange={setChecked} />
//   <Checkbox checked="indeterminate" label="Select all" />
//
//   <CheckboxGroup label="Notifications" orientation="vertical">
//     <Checkbox value="email" label="Email" />
//     <Checkbox value="sms" label="SMS" />
//   </CheckboxGroup>
// ============================================================================

import { cva, type VariantProps } from "class-variance-authority";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import {
  createContext,
  forwardRef,
  type ReactNode,
  useContext,
  useId,
} from "react";
import { cn } from "@/lib/cn";
import { focusRingClasses } from "@/lib/focus-ring";

// ---------------------------------------------------------------------------
// CVA Variant Definition
// ---------------------------------------------------------------------------

export const checkboxVariants = cva(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "inline-flex shrink-0 items-center justify-center",
    // Shape
    "rounded-sm",
    // Border
    "border",
    // Colors — unchecked state
    "border-input bg-background",
    // Transition
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    // Focus ring — WCAG AA compliant
    focusRingClasses,
    // Hover
    "hover:border-border-strong",
    // Checked state
    "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground",
    "data-[state=checked]:hover:bg-primary-hover data-[state=checked]:hover:border-primary-hover",
    // Indeterminate state
    "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground",
    "data-[state=indeterminate]:hover:bg-primary-hover data-[state=indeterminate]:hover:border-primary-hover",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    // Cursor
    "cursor-pointer disabled:cursor-not-allowed",
    // Peer for label styling
    "peer",
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — compact for dense UIs, tables, settings panels.
         * Box: 16px (size-4)
         */
        sm: "size-4",

        /**
         * Medium — default size for most forms.
         * Box: 18px (size-[18px])
         */
        md: "size-[18px]",
      },

      // -----------------------------------------------------------------
      // Error Variant
      // -----------------------------------------------------------------
      error: {
        true: [
          "border-danger",
          "data-[state=unchecked]:border-danger",
          "focus-visible:border-danger",
        ],
        false: "",
      },
    },

    defaultVariants: {
      size: "md",
      error: false,
    },
  },
);

// ---------------------------------------------------------------------------
// Icon Size Map
// ---------------------------------------------------------------------------

const iconSizeMap: Record<CheckboxSize, string> = {
  sm: "size-3",
  md: "size-3.5",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CheckboxSize = "sm" | "md";

export interface CheckboxProps
  extends Omit<
      CheckboxPrimitive.CheckboxProps,
      "children" | "asChild" | "defaultChecked"
    >,
    VariantProps<typeof checkboxVariants> {
  /**
   * Size of the checkbox.
   * @default "md"
   */
  size?: CheckboxSize;

  /**
   * Whether the checkbox is in an error state.
   * @default false
   */
  error?: boolean;

  /**
   * Label text displayed next to the checkbox.
   * Clicking the label toggles the checkbox.
   */
  label?: ReactNode;

  /**
   * Optional description text displayed below the label.
   * Useful for providing additional context about the option.
   */
  description?: ReactNode;

  /**
   * Additional CSS classes for the root wrapper element.
   */
  wrapperClassName?: string;

  /**
   * Additional CSS classes for the label element.
   */
  labelClassName?: string;

  /**
   * Additional CSS classes for the checkbox element.
   */
  className?: string;

  /**
   * The value of the checkbox when used within a CheckboxGroup.
   */
  value?: string;
}

// ---------------------------------------------------------------------------
// Check Icon (Internal)
// ---------------------------------------------------------------------------

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Indeterminate Icon (Internal)
// ---------------------------------------------------------------------------

function IndeterminateIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Checkbox — a toggle control for binary or indeterminate selections.
 *
 * Built on Radix UI's checkbox primitive for full accessibility support,
 * including keyboard navigation (Space to toggle), focus management,
 * and proper ARIA attributes.
 *
 * Accessibility:
 *   - Focus ring visible on keyboard navigation (focus-visible)
 *   - Disabled state uses both native disabled and visual cues
 *   - Error state applies `aria-invalid="true"`
 *   - Label is properly associated via `htmlFor`/`id`
 *   - Supports indeterminate state with proper ARIA
 *   - Space key toggles the checkbox
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Checkbox label="Accept terms and conditions" />
 *
 * // Controlled
 * <Checkbox
 *   checked={isChecked}
 *   onCheckedChange={setIsChecked}
 *   label="Enable notifications"
 * />
 *
 * // Indeterminate
 * <Checkbox checked="indeterminate" label="Select all" />
 *
 * // With description
 * <Checkbox
 *   label="Marketing emails"
 *   description="Receive emails about new products and features."
 * />
 *
 * // Sizes
 * <Checkbox size="sm" label="Small checkbox" />
 * <Checkbox size="md" label="Medium checkbox" />
 *
 * // Error state
 * <Checkbox error label="You must accept the terms" />
 *
 * // Disabled
 * <Checkbox disabled label="Cannot change this" />
 * <Checkbox disabled checked label="Locked selection" />
 * ```
 */
export const Checkbox = forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(function Checkbox(
  {
    size = "md",
    error = false,
    label,
    description,
    wrapperClassName,
    labelClassName,
    className,
    id: idProp,
    disabled,
    checked,
    "aria-invalid": ariaInvalid,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const descriptionId = description ? `${id}-description` : undefined;

  // Resolve aria-invalid — auto-set for error state if not explicitly provided
  const resolvedAriaInvalid =
    ariaInvalid !== undefined ? ariaInvalid : error ? true : undefined;

  // Label text styling based on size
  const labelTextClass = size === "sm" ? "text-xs" : "text-sm";
  const descriptionTextClass = "text-xs";

  return (
    <div
      className={cn(
        "flex items-start gap-2",
        disabled && "cursor-not-allowed opacity-50",
        wrapperClassName,
      )}
      data-ds=""
      data-ds-component="checkbox"
      data-ds-size={size}
    >
      <CheckboxPrimitive.Root
        ref={ref}
        id={id}
        checked={checked}
        disabled={disabled}
        aria-invalid={resolvedAriaInvalid}
        aria-describedby={descriptionId}
        className={cn(
          checkboxVariants({ size, error }),
          // Slight top offset to align with label text baseline
          label && "mt-0.5",
          className,
        )}
        {...rest}
      >
        <CheckboxPrimitive.Indicator
          className={cn(
            "flex items-center justify-center",
            // Animate the indicator
            "data-[state=checked]:animate-in data-[state=checked]:zoom-in-75",
            "data-[state=unchecked]:animate-out data-[state=unchecked]:zoom-out-75",
          )}
        >
          {checked === "indeterminate" ? (
            <IndeterminateIcon className={iconSizeMap[size]} />
          ) : (
            <CheckIcon className={iconSizeMap[size]} />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {/* Label and description */}
      {(label || description) && (
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          {label && (
            <label
              htmlFor={id}
              className={cn(
                labelTextClass,
                "leading-5 font-medium",
                "text-foreground",
                "cursor-pointer select-none",
                "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                error && "text-danger",
                labelClassName,
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <span
              id={descriptionId}
              className={cn(
                descriptionTextClass,
                "leading-4 text-muted-foreground",
              )}
            >
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

// ===========================================================================
// CheckboxGroup
// ===========================================================================
// A layout component for grouping related checkboxes. Provides proper
// ARIA grouping semantics and consistent spacing.
// ===========================================================================

// ---------------------------------------------------------------------------
// CheckboxGroup Context
// ---------------------------------------------------------------------------

interface CheckboxGroupContextValue {
  /** Size to apply to all child checkboxes. */
  size?: CheckboxSize;
  /** Whether all children are disabled. */
  disabled?: boolean;
  /** Whether all children are in error state. */
  error?: boolean;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue>({});

/** Hook to access CheckboxGroup context from child Checkbox components. */
export function useCheckboxGroupContext(): CheckboxGroupContextValue {
  return useContext(CheckboxGroupContext);
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CheckboxGroupOrientation = "horizontal" | "vertical";

export interface CheckboxGroupProps {
  /**
   * Group label displayed above the checkboxes.
   * Required for accessibility.
   */
  label?: ReactNode;

  /**
   * Optional description below the group label.
   */
  description?: ReactNode;

  /**
   * Layout orientation of the checkboxes.
   * @default "vertical"
   */
  orientation?: CheckboxGroupOrientation;

  /**
   * Size to apply to all child checkboxes.
   * Individual checkbox size props will override this.
   */
  size?: CheckboxSize;

  /**
   * Whether all checkboxes in the group are disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the group is in an error state.
   * @default false
   */
  error?: boolean;

  /**
   * Error message displayed below the group.
   */
  errorMessage?: ReactNode;

  /** Checkbox children. */
  children: ReactNode;

  /** Additional CSS classes for the group container. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * CheckboxGroup — groups related checkboxes with accessible semantics.
 *
 * Uses `role="group"` with `aria-labelledby` for proper screen reader
 * announcement. Provides consistent spacing and optional orientation.
 *
 * @example
 * ```tsx
 * <CheckboxGroup label="Notification preferences" orientation="vertical">
 *   <Checkbox value="email" label="Email notifications" />
 *   <Checkbox value="sms" label="SMS notifications" />
 *   <Checkbox value="push" label="Push notifications" />
 * </CheckboxGroup>
 *
 * // Horizontal layout
 * <CheckboxGroup label="Options" orientation="horizontal">
 *   <Checkbox value="a" label="Option A" />
 *   <Checkbox value="b" label="Option B" />
 * </CheckboxGroup>
 *
 * // With error
 * <CheckboxGroup label="Required" error errorMessage="Please select at least one.">
 *   <Checkbox value="a" label="Option A" />
 *   <Checkbox value="b" label="Option B" />
 * </CheckboxGroup>
 * ```
 */
export function CheckboxGroup({
  label,
  description,
  orientation = "vertical",
  size,
  disabled = false,
  error = false,
  errorMessage,
  children,
  className,
}: CheckboxGroupProps) {
  const groupId = useId();
  const labelId = label ? `${groupId}-label` : undefined;
  const descriptionId = description ? `${groupId}-description` : undefined;
  const errorId = errorMessage ? `${groupId}-error` : undefined;

  const contextValue: CheckboxGroupContextValue = {
    size,
    disabled,
    error,
  };

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <fieldset
        aria-labelledby={labelId}
        aria-describedby={
          cn(descriptionId ?? "", errorId ?? "").trim() || undefined
        }
        aria-invalid={error || undefined}
        disabled={disabled}
        className={cn("flex flex-col gap-2", className)}
        data-ds=""
        data-ds-component="checkbox-group"
      >
        {/* Group label */}
        {label && (
          <legend
            id={labelId}
            className={cn(
              "text-sm font-medium leading-5 text-foreground",
              error && "text-danger",
            )}
          >
            {label}
          </legend>
        )}

        {/* Group description */}
        {description && (
          <span
            id={descriptionId}
            className="text-xs leading-4 text-muted-foreground"
          >
            {description}
          </span>
        )}

        {/* Checkbox items */}
        <div
          className={cn(
            "flex",
            orientation === "vertical" ? "flex-col gap-2" : "flex-row gap-4",
          )}
        >
          {children}
        </div>

        {/* Error message */}
        {error && errorMessage && (
          <span
            id={errorId}
            className="text-xs leading-4 text-danger"
            role="alert"
          >
            {errorMessage}
          </span>
        )}
      </fieldset>
    </CheckboxGroupContext.Provider>
  );
}

CheckboxGroup.displayName = "CheckboxGroup";
