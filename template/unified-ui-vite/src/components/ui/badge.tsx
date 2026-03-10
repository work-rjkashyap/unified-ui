"use client";

// ============================================================================
// Unified UI — Badge Component
// ============================================================================
// A compact label component for categorization, status indicators, and
// metadata display. Built on the Unified UI token layer with CVA for
// variant composition.
//
// This component merges the former Badge and Tag components into a single
// unified API. All Tag features (avatar slot, lg size, secondary variant,
// dismissible, disabled, Framer Motion animation) are now part of Badge.
//
// Features:
//   - 8 visual variants: default, primary, secondary, success, warning, danger, info, outline
//   - 3 sizes: sm, md, lg
//   - Dot indicator variant (colored dot + text)
//   - Removable/dismissible option with dismiss button (X)
//   - Avatar slot for user mention chips
//   - Pill shape by default (rounded-full)
//   - Full ref forwarding
//   - Polymorphic: can render as <span>, <a>, <button>, or any element via `as`
//   - Optional Framer Motion pop animation on mount
//   - Disabled state support
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
//   <Badge variant="primary" dismissible onDismiss={() => handleDismiss()}>
//     React
//   </Badge>
//   <Badge variant="secondary" avatar={<Avatar name="RK" size="xs" />}>
//     @rjkashyap
//   </Badge>
// ============================================================================

import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion } from "framer-motion";
import { type ElementType, forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { focusRingClasses } from "@/lib/focus-ring";
import { popSubtle } from "@/lib/motion";

// ---------------------------------------------------------------------------
// CVA Variant Definition
// ---------------------------------------------------------------------------
// All color values reference design system CSS custom properties via the
// Tailwind utilities defined in design-system.css. This ensures
// automatic light/dark mode support and token compliance.
// ---------------------------------------------------------------------------

export const badgeVariants = cva(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "inline-flex items-center gap-1.5",
    // Shape — pill by default
    "rounded-full",
    // Typography
    "font-medium leading-none whitespace-nowrap",
    // Transition
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
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
        default: ["bg-muted text-foreground", "border border-transparent"],

        /**
         * Primary — uses brand/primary color.
         * Use for highlighting primary categories or active filters.
         */
        primary: [
          "bg-primary-muted text-primary-muted-foreground",
          "border border-transparent",
        ],

        /**
         * Secondary — subdued variant with visible border.
         * Use for archived items, subtle categorization.
         */
        secondary: [
          "bg-secondary text-secondary-foreground",
          "border border-border",
        ],

        /**
         * Success — positive status indicator.
         * Use for "active", "complete", "approved" states.
         */
        success: [
          "bg-success-muted text-success-muted-foreground",
          "border border-transparent",
        ],

        /**
         * Warning — caution status indicator.
         * Use for "pending", "review", "expiring" states.
         */
        warning: [
          "bg-warning-muted text-warning-muted-foreground",
          "border border-transparent",
        ],

        /**
         * Danger — negative/critical status indicator.
         * Use for "error", "failed", "blocked", "critical" states.
         */
        danger: [
          "bg-danger-muted text-danger-muted-foreground",
          "border border-transparent",
        ],

        /**
         * Info — informational status indicator.
         * Use for "new", "beta", "info", "note" labels.
         */
        info: [
          "bg-info-muted text-info-muted-foreground",
          "border border-transparent",
        ],

        /**
         * Outline — transparent background with visible border.
         * Use for subtle categorization that doesn't compete with content.
         */
        outline: ["bg-transparent text-foreground", "border border-border"],
      },

      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — very compact, for inline metadata and dense UIs.
         * Height: ~20px, Font: 11px
         */
        sm: "px-2 py-0.5 text-[11px] gap-1",

        /**
         * Medium — default badge size, comfortable readability.
         * Height: ~24px, Font: 12px
         */
        md: "px-2.5 py-1 text-xs gap-1.5",

        /**
         * Large — prominent badge for larger touch targets and filter chips.
         * Height: ~28px, Font: 14px
         */
        lg: "px-3 py-1.5 text-sm gap-2",
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
  default: "bg-muted-foreground",
  primary: "bg-primary",
  secondary: "bg-foreground",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  outline: "bg-foreground",
};

// ---------------------------------------------------------------------------
// Dot Size Map
// ---------------------------------------------------------------------------

const dotSizeMap: Record<BadgeSize, string> = {
  sm: "size-1.5",
  md: "size-2",
  lg: "size-2",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "outline";

export type BadgeSize = "sm" | "md" | "lg";

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
   * Alias for `dismissible` — both work identically.
   * @default false
   */
  removable?: boolean;

  /**
   * Whether the badge can be dismissed/removed.
   * When true, a small "×" button is rendered after the text.
   * Alias for `removable` — both work identically.
   * @default false
   */
  dismissible?: boolean;

  /**
   * Callback fired when the remove/dismiss (×) button is clicked.
   * Only relevant when `removable` or `dismissible` is true.
   */
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Callback fired when the remove/dismiss (×) button is clicked.
   * Alias for `onRemove` — both work identically.
   * Only relevant when `removable` or `dismissible` is true.
   */
  onDismiss?: (event?: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Accessible label for the remove/dismiss button.
   * Screen readers will announce this when the remove button is focused.
   * @default "Remove"
   */
  removeLabel?: string;

  /**
   * Accessible label for the remove/dismiss button.
   * Alias for `removeLabel` — both work identically.
   * @default "Remove"
   */
  dismissLabel?: string;

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

  /**
   * Avatar element to display before the label.
   * Common for user-mention chips and team tags.
   */
  avatar?: ReactNode;

  /**
   * Whether the badge is disabled.
   * Reduces opacity and disables pointer events.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to animate the badge entrance with a subtle pop animation.
   * Uses the `popSubtle` Framer Motion preset.
   * @default false
   */
  animated?: boolean;

  /** Content to render inside the badge. */
  children?: ReactNode;

  /** Additional CSS classes to merge. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Remove / Dismiss Button (Internal)
// ---------------------------------------------------------------------------
// A small inline button for dismissing/removing the badge. Renders as an
// "×" icon that inherits the badge's text color.
// ---------------------------------------------------------------------------

function RemoveButton({
  size,
  label,
  disabled,
  onClick,
}: {
  size: BadgeSize;
  label: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center shrink-0",
        "rounded-full",
        "text-current opacity-60",
        "hover:opacity-100",
        "transition-opacity duration-fast",
        "focus-visible:outline-none focus-visible:border-current",
        "disabled:pointer-events-none disabled:opacity-40",
        // Slightly negative margin to visually tuck the button in
        "-mr-0.5 ml-0.5",
        size === "sm" ? "size-3" : size === "lg" ? "size-4" : "size-3.5",
        focusRingClasses,
      )}
      aria-label={label}
      tabIndex={0}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={
          size === "sm" ? "size-2.5" : size === "lg" ? "size-3.5" : "size-3"
        }
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
        "shrink-0 rounded-full",
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
 * This is the unified Badge component that merges the former Badge and Tag
 * components into a single API. All features from both are available:
 * - Dot indicators, icons, avatars, removable/dismissible, polymorphic `as`,
 *   disabled state, and optional Framer Motion animation.
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
 *   - Remove/dismiss button has a configurable `aria-label` (defaults to "Remove")
 *   - Semantic colors meet WCAG AA contrast on their muted backgrounds
 *   - Disabled state applies `pointer-events-none` and reduced opacity
 *
 * @example
 * ```tsx
 * // Basic variants
 * <Badge>Default</Badge>
 * <Badge variant="primary">Primary</Badge>
 * <Badge variant="secondary">Secondary</Badge>
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning">Pending</Badge>
 * <Badge variant="danger">Critical</Badge>
 * <Badge variant="info">New</Badge>
 * <Badge variant="outline">Draft</Badge>
 *
 * // Sizes
 * <Badge size="sm">Small</Badge>
 * <Badge size="md">Medium</Badge>
 * <Badge size="lg">Large</Badge>
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
 * // With avatar (user mention chips)
 * <Badge variant="secondary" avatar={<Avatar name="RK" size="xs" className="size-4" />}>
 *   @rjkashyap
 * </Badge>
 *
 * // Removable (Badge-style API)
 * <Badge variant="primary" removable onRemove={handleRemove}>
 *   Tag Name
 * </Badge>
 *
 * // Dismissible (Tag-style API — both work identically)
 * <Badge variant="primary" dismissible onDismiss={handleDismiss}>
 *   React
 * </Badge>
 *
 * // Animated entrance
 * <Badge variant="success" animated>Live</Badge>
 *
 * // Disabled
 * <Badge variant="primary" disabled>Disabled</Badge>
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
    dismissible = false,
    onRemove,
    onDismiss,
    removeLabel,
    dismissLabel,
    as: Component = "span",
    icon,
    avatar,
    disabled = false,
    animated = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  const shouldReduce = useReducedMotion();

  // Merge removable/dismissible — either flag enables the dismiss button
  const showDismiss = removable || dismissible;

  // Merge onRemove/onDismiss — prefer onRemove if both provided
  const handleDismissClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onRemove?.(e);
    onDismiss?.(e);
  };

  // Merge removeLabel/dismissLabel — prefer removeLabel if both provided
  const resolvedLabel = removeLabel ?? dismissLabel ?? "Remove";

  // Resolve icon size class
  const iconSizeClass =
    size === "sm"
      ? "[&>svg]:size-2.5"
      : size === "lg"
        ? "[&>svg]:size-3.5"
        : "[&>svg]:size-3";

  // Build the inner content
  const content = (
    <>
      {/* Avatar */}
      {avatar && <span className="shrink-0 -ml-0.5">{avatar}</span>}

      {/* Dot indicator */}
      {dot && <DotIndicator variant={variant} size={size} />}

      {/* Leading icon */}
      {icon && (
        <span className={cn("shrink-0", iconSizeClass)} aria-hidden="true">
          {icon}
        </span>
      )}

      {/* Label content */}
      <span className="truncate">{children}</span>

      {/* Remove / dismiss button */}
      {showDismiss && (
        <RemoveButton
          size={size}
          label={resolvedLabel}
          disabled={disabled}
          onClick={handleDismissClick}
        />
      )}
    </>
  );

  // Shared class names
  const classes = cn(
    badgeVariants({ variant, size }),
    disabled && "opacity-50 pointer-events-none",
    className,
  );

  // Shared data attributes
  const dataAttrs = {
    "data-ds": "",
    "data-ds-component": "badge",
    "data-ds-variant": variant,
    "data-ds-size": size,
    ...(disabled ? { "data-ds-disabled": "" } : {}),
    ...(animated ? { "data-ds-animated": "" } : {}),
  };

  // When animated, wrap in motion component
  if (animated && !shouldReduce) {
    return (
      <motion.span
        ref={ref}
        className={classes}
        variants={popSubtle.variants}
        initial="initial"
        animate="animate"
        transition={popSubtle.transition}
        {...dataAttrs}
      >
        {content}
      </motion.span>
    );
  }

  // Default: render with polymorphic `as` prop
  return (
    <Component
      ref={ref}
      className={classes}
      aria-disabled={disabled || undefined}
      {...dataAttrs}
      {...rest}
    >
      {content}
    </Component>
  );
});

Badge.displayName = "Badge";

// ---------------------------------------------------------------------------
// Tag — backward-compatible alias
// ---------------------------------------------------------------------------
// The Tag component has been merged into Badge. This alias preserves
// backward compatibility for existing imports. All Tag props map directly
// to Badge props:
//   - `dismissible` → `dismissible` (also: `removable`)
//   - `onDismiss` → `onDismiss` (also: `onRemove`)
//   - `dismissLabel` → `dismissLabel` (also: `removeLabel`)
//   - `avatar` → `avatar`
//   - `disabled` → `disabled`
//
// Tag always renders with `animated={true}` to preserve the original
// Tag behavior of animating on mount with the popSubtle preset.
// ---------------------------------------------------------------------------

export type TagVariant = BadgeVariant;
export type TagSize = BadgeSize;

export interface TagProps
  extends Omit<
    BadgeProps,
    "as" | "dot" | "removable" | "onRemove" | "removeLabel"
  > {
  /**
   * Visual variant of the tag.
   * @default "default"
   */
  variant?: TagVariant;

  /**
   * Size of the tag.
   * @default "md"
   */
  size?: TagSize;

  /**
   * Leading avatar or icon slot.
   */
  avatar?: ReactNode;

  /**
   * Trailing icon (shown before close button).
   */
  icon?: ReactNode;

  /**
   * Whether the tag can be dismissed.
   */
  dismissible?: boolean;

  /**
   * Called when the dismiss button is clicked.
   */
  onDismiss?: () => void;

  /**
   * Accessible label for the dismiss button.
   * @default "Remove tag"
   */
  dismissLabel?: string;

  /**
   * Whether the tag is disabled.
   */
  disabled?: boolean;

  /**
   * Whether to animate the badge entrance.
   * Tags default to `true` to preserve original Tag behavior.
   * @default true
   */
  animated?: boolean;

  /** Additional CSS classes. */
  className?: string;

  children?: ReactNode;
}

/**
 * Tag — backward-compatible alias for Badge.
 *
 * Renders an animated Badge by default (`animated={true}`).
 * All Tag-specific props (dismissible, onDismiss, avatar, disabled)
 * map directly to Badge props.
 *
 * @deprecated Use `Badge` directly with `animated` prop if entrance
 *   animation is desired. The `Tag` alias will be removed in a future
 *   major version.
 *
 * @example
 * ```tsx
 * <Tag variant="primary" dismissible onDismiss={handleDismiss}>
 *   React
 * </Tag>
 *
 * // Equivalent Badge usage:
 * <Badge variant="primary" dismissible onDismiss={handleDismiss} animated>
 *   React
 * </Badge>
 * ```
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { animated = true, dismissLabel = "Remove tag", ...rest },
  ref,
) {
  return (
    <Badge
      ref={ref}
      animated={animated}
      dismissLabel={dismissLabel}
      {...rest}
    />
  );
});

Tag.displayName = "Tag";

export const tagVariants = badgeVariants;
