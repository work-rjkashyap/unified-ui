"use client";

// ============================================================================
// Unified UI — Badge Component
// ============================================================================
// A compact label component for categorization, status indicators, and
// metadata display. Built on the Unified UI token layer with CVA for
// variant composition.
//
// Features:
//   - 7 visual variants: default, primary, success, warning, danger, info, outline
//   - 2 sizes: sm, md
//   - Dot indicator variant (colored dot + text)
//   - Removable option with dismiss button (X)
//   - Pill shape by default (rounded-full)
//   - Full ref forwarding
//   - Polymorphic: can render as <span>, <a>, <button>, or any element via `as`
//   - WCAG AA accessible: proper color contrast, dismiss button has aria-label
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { Badge } from "@/design-system/components/badge";
//
//   <Badge>Default</Badge>
//   <Badge variant="success">Active</Badge>
//   <Badge variant="danger" size="sm">Critical</Badge>
//   <Badge variant="info" dot>Online</Badge>
//   <Badge variant="warning" removable onRemove={() => handleRemove()}>
//     Pending Review
//   </Badge>
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { type ElementType, forwardRef, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// CVA Variant Definition
// ---------------------------------------------------------------------------
// All color values reference design system CSS custom properties via the
// Tailwind `ds-*` utilities defined in design-system.css. This ensures
// automatic light/dark mode support and token compliance.
// ---------------------------------------------------------------------------

export const badgeVariants = cva(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "inline-flex items-center gap-1.5",
    // Shape — pill by default
    "rounded-ds-full",
    // Typography
    "font-medium leading-none whitespace-nowrap",
    // Transition
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-ds-fast ease-ds-standard",
    // Prevent text selection
    "select-none",
    // Shrink protection
    "shrink-0",
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Visual Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Default — neutral, muted background.
         * Use for generic labels, tags, and metadata.
         */
        default: [
          "bg-ds-muted text-ds-foreground",
          "border border-transparent",
        ],

        /**
         * Primary — uses brand/primary color.
         * Use for highlighting primary categories or active filters.
         */
        primary: [
          "bg-ds-primary-muted text-ds-primary-muted-foreground",
          "border border-transparent",
        ],

        /**
         * Success — positive status indicator.
         * Use for "active", "complete", "approved" states.
         */
        success: [
          "bg-ds-success-muted text-ds-success-muted-foreground",
          "border border-transparent",
        ],

        /**
         * Warning — caution status indicator.
         * Use for "pending", "review", "expiring" states.
         */
        warning: [
          "bg-ds-warning-muted text-ds-warning-muted-foreground",
          "border border-transparent",
        ],

        /**
         * Danger — negative/critical status indicator.
         * Use for "error", "failed", "blocked", "critical" states.
         */
        danger: [
          "bg-ds-danger-muted text-ds-danger-muted-foreground",
          "border border-transparent",
        ],

        /**
         * Info — informational status indicator.
         * Use for "new", "beta", "info", "note" labels.
         */
        info: [
          "bg-ds-info-muted text-ds-info-muted-foreground",
          "border border-transparent",
        ],

        /**
         * Outline — transparent background with visible border.
         * Use for subtle categorization that doesn't compete with content.
         */
        outline: [
          "bg-transparent text-ds-foreground",
          "border border-ds-border",
        ],
      },

      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — very compact, for inline metadata and dense UIs.
         * Height: ~20px, Font: 11px
         */
        sm: "px-2 py-0.5 text-[11px]",

        /**
         * Medium — default badge size, comfortable readability.
         * Height: ~24px, Font: 12px
         */
        md: "px-2.5 py-1 text-xs",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

// ---------------------------------------------------------------------------
// Dot Color Map
// ---------------------------------------------------------------------------
// Maps badge variants to their corresponding dot indicator color classes.
// The dot uses the solid (non-muted) semantic color for high visibility.
// ---------------------------------------------------------------------------

const dotColorMap: Record<BadgeVariant, string> = {
  default: "bg-ds-muted-foreground",
  primary: "bg-ds-primary",
  success: "bg-ds-success",
  warning: "bg-ds-warning",
  danger: "bg-ds-danger",
  info: "bg-ds-info",
  outline: "bg-ds-foreground",
};

// ---------------------------------------------------------------------------
// Dot Size Map
// ---------------------------------------------------------------------------

const dotSizeMap: Record<BadgeSize, string> = {
  sm: "size-1.5",
  md: "size-2",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "outline";

export type BadgeSize = "sm" | "md";

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof badgeVariants> {
  /**
   * Visual variant of the badge.
   * @default "default"
   */
  variant?: BadgeVariant;

  /**
   * Size of the badge.
   * @default "md"
   */
  size?: BadgeSize;

  /**
   * Whether to show a colored dot indicator before the text.
   * Useful for status indicators (online/offline, active/inactive).
   * The dot color automatically matches the badge variant.
   * @default false
   */
  dot?: boolean;

  /**
   * Whether the badge can be dismissed/removed.
   * When true, a small "×" button is rendered after the text.
   * @default false
   */
  removable?: boolean;

  /**
   * Callback fired when the remove (×) button is clicked.
   * Only relevant when `removable` is true.
   */
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Accessible label for the remove button.
   * Screen readers will announce this when the remove button is focused.
   * @default "Remove"
   */
  removeLabel?: string;

  /**
   * The HTML element or component to render as.
   * @default "span"
   */
  as?: ElementType;

  /**
   * Icon to display before the text (after the dot if both are present).
   * Typically a small Lucide icon.
   */
  icon?: ReactNode;

  /** Content to render inside the badge. */
  children?: ReactNode;

  /** Additional CSS classes to merge. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Remove Button (Internal)
// ---------------------------------------------------------------------------
// A small inline button for dismissing/removing the badge. Renders as an
// "×" icon that inherits the badge's text color. Excluded from tab order
// by default but focusable for keyboard-only users via aria patterns.
// ---------------------------------------------------------------------------

function RemoveButton({
  size,
  label,
  onClick,
}: {
  size: BadgeSize;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center shrink-0",
        "rounded-ds-full",
        "text-current opacity-60",
        "hover:opacity-100",
        "transition-opacity duration-ds-fast",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current",
        // Slightly negative margin to visually tuck the button in
        "-mr-0.5 ml-0.5",
        size === "sm" ? "size-3" : "size-3.5",
      )}
      aria-label={label}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={size === "sm" ? "size-2.5" : "size-3"}
        aria-hidden="true"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Dot Indicator (Internal)
// ---------------------------------------------------------------------------

function DotIndicator({
  variant,
  size,
}: {
  variant: BadgeVariant;
  size: BadgeSize;
}) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-ds-full",
        dotSizeMap[size],
        dotColorMap[variant],
      )}
      aria-hidden="true"
    />
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Badge — a compact inline label for categorization, status, and metadata.
 *
 * Built on the design system's token layer with CVA for variant composition.
 * All colors, radii, spacing, and transitions come from CSS custom properties
 * defined in design-system.css.
 *
 * Badges are non-interactive by default (rendered as `<span>`). For
 * clickable badges, use `as="button"` or `as="a"` and add appropriate
 * event handlers.
 *
 * Accessibility:
 *   - Color is never the sole means of conveying information — use text labels
 *   - Dot indicators are decorative (`aria-hidden`)
 *   - Remove button has a configurable `aria-label` (defaults to "Remove")
 *   - Semantic colors meet WCAG AA contrast on their muted backgrounds
 *
 * @example
 * ```tsx
 * // Basic variants
 * <Badge>Default</Badge>
 * <Badge variant="primary">Primary</Badge>
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning">Pending</Badge>
 * <Badge variant="danger">Critical</Badge>
 * <Badge variant="info">New</Badge>
 * <Badge variant="outline">Draft</Badge>
 *
 * // Sizes
 * <Badge size="sm">Small</Badge>
 * <Badge size="md">Medium</Badge>
 *
 * // Dot indicator (status badges)
 * <Badge variant="success" dot>Online</Badge>
 * <Badge variant="danger" dot>Offline</Badge>
 * <Badge variant="warning" dot>Away</Badge>
 *
 * // With icon
 * <Badge variant="info" icon={<StarIcon className="size-3" />}>
 *   Featured
 * </Badge>
 *
 * // Removable
 * <Badge variant="primary" removable onRemove={handleRemove}>
 *   Tag Name
 * </Badge>
 *
 * // Custom remove label for accessibility
 * <Badge
 *   variant="danger"
 *   removable
 *   onRemove={handleRemove}
 *   removeLabel="Remove critical alert"
 * >
 *   Alert
 * </Badge>
 *
 * // As a link
 * <Badge as="a" href="/category/react" variant="primary">
 *   React
 * </Badge>
 *
 * // As a button
 * <Badge as="button" variant="outline" onClick={handleClick}>
 *   Filter
 * </Badge>
 * ```
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = "default",
    size = "md",
    dot = false,
    removable = false,
    onRemove,
    removeLabel = "Remove",
    as: Component = "span",
    icon,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      data-ds=""
      data-ds-component="badge"
      data-ds-variant={variant}
      data-ds-size={size}
      {...rest}
    >
      {/* Dot indicator */}
      {dot && <DotIndicator variant={variant} size={size} />}

      {/* Leading icon */}
      {icon && (
        <span className="shrink-0 [&>svg]:size-3" aria-hidden="true">
          {icon}
        </span>
      )}

      {/* Label content */}
      {children}

      {/* Remove button */}
      {removable && (
        <RemoveButton size={size} label={removeLabel} onClick={onRemove} />
      )}
    </Component>
  );
});

Badge.displayName = "Badge";
