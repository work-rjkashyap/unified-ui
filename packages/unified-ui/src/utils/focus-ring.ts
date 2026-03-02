// ============================================================================
// Unified UI — Focus Ring Utilities
// ============================================================================
// Centralized focus indicator class constants and utilities. Every interactive
// component in the design system MUST use these constants for consistent,
// accessible focus indicators.
//
// The focus system uses:
//   1. `focus-visible` — only shows on keyboard navigation, not mouse clicks
//   2. A very subtle border-color shift — no rings, no outlines, no glow
//   3. Minimal visual difference that signals focus without being distracting
//
// These constants replace ad-hoc focus ring strings scattered across
// component files. When you need to change the focus appearance,
// update it here and every component updates automatically.
//
// Usage:
//   import { focusRingClasses, focusRingInsetClasses } from "@unified-ui/utils/focus-ring";
//
//   // In a CVA base array:
//   const buttonVariants = cva([focusRingClasses, "inline-flex ..."], { ... });
//
//   // In a cn() call:
//   <button className={cn(focusRingClasses, "px-4 py-2")} />
//
//   // For elements inside containers (no offset):
//   <input className={cn(focusRingInsetClasses, "h-9")} />
// ============================================================================

// ---------------------------------------------------------------------------
// Core Focus — Standard (subtle border-color shift)
// ---------------------------------------------------------------------------
// The default focus indicator for standalone interactive elements: buttons,
// links, checkboxes, radios, switches, selects, tabs, accordion triggers.
//
// - `outline-none` removes the default browser outline
// - `focus-visible:border-border-strong` shifts the border slightly darker/lighter
//
// The approach is intentionally minimal: no ring, no glow, no filled
// highlight. Just a very subtle border-color change to indicate focus.
// ---------------------------------------------------------------------------

/**
 * Standard focus classes for interactive elements.
 * Uses `focus-visible` for keyboard-only visibility.
 * Applies a subtle border-color shift — no ring or outline.
 */
export const focusRingClasses =
  "focus-visible:outline-none focus-visible:border-border-strong" as const;

/**
 * Array variant of the standard focus classes.
 * Useful when building CVA base class arrays.
 *
 * @example
 * ```ts
 * const buttonVariants = cva([...focusRingClassList, "inline-flex"], { ... });
 * ```
 */
export const focusRingClassList = [
  "focus-visible:outline-none",
  "focus-visible:border-border-strong",
] as const;

// ---------------------------------------------------------------------------
// Inset Focus — For elements inside containers
// ---------------------------------------------------------------------------
// For elements that are visually flush with their container (e.g., items
// inside a dropdown menu, list items, table cells, close buttons inside
// popovers). Same subtle treatment, no offset needed.
// ---------------------------------------------------------------------------

/**
 * Focus classes without ring-offset, for elements inside containers.
 * Same subtle border-color shift as the standard variant.
 */
export const focusRingInsetClasses =
  "focus-visible:outline-none focus-visible:border-border-strong" as const;

/**
 * Array variant of the inset focus classes.
 */
export const focusRingInsetClassList = [
  "focus-visible:outline-none",
  "focus-visible:border-border-strong",
] as const;

// ---------------------------------------------------------------------------
// Compact Focus — For small interactive elements
// ---------------------------------------------------------------------------
// For compact or small interactive elements (breadcrumb links, pagination
// buttons, small icon buttons) where the standard treatment applies the
// same way — just a subtle border-color shift.
// ---------------------------------------------------------------------------

/**
 * Compact focus classes. For small interactive elements.
 * Same subtle treatment as the standard variant.
 */
export const focusRingCompactClasses =
  "focus-visible:outline-none focus-visible:border-border-strong" as const;

/**
 * Array variant of the compact focus classes.
 */
export const focusRingCompactClassList = [
  "focus-visible:outline-none",
  "focus-visible:border-border-strong",
] as const;

// ---------------------------------------------------------------------------
// Focus with Custom Color
// ---------------------------------------------------------------------------
// For error/success states where the focus indicator should match the
// variant color (e.g., a danger input stays red on focus).
// ---------------------------------------------------------------------------

/**
 * Focus variant strings for use with error/success/warning states.
 * Replace the border color with the appropriate semantic color.
 *
 * @example
 * ```ts
 * cn(
 *   focusRingClasses,
 *   hasError && focusRingVariantOverrides.danger,
 * )
 * ```
 */
export const focusRingVariantOverrides = {
  /** Override focus border color to danger red */
  danger: "focus-visible:border-danger",
  /** Override focus border color to success green */
  success: "focus-visible:border-success",
  /** Override focus border color to warning amber */
  warning: "focus-visible:border-warning",
  /** Override focus border color to info blue */
  info: "focus-visible:border-info",
  /** Override focus border color to current text color */
  current: "focus-visible:border-current",
} as const;

export type FocusRingVariant = keyof typeof focusRingVariantOverrides;

// ---------------------------------------------------------------------------
// Group Focus
// ---------------------------------------------------------------------------
// For composite components where the focus indicator appears on a parent
// container when a child receives focus (via Tailwind's `group` pattern).
// ---------------------------------------------------------------------------

/**
 * Classes to apply on the focusable child element (add `group` to parent).
 */
export const focusRingGroupTriggerClasses =
  "focus-visible:outline-none" as const;

/**
 * Classes to apply on the parent element that shows the focus indicator.
 * The parent must have the `group` class.
 * Uses a subtle border-color shift on the parent when a child is focused.
 */
export const focusRingGroupRingClasses =
  "group-focus-visible:border-border-strong" as const;

// ---------------------------------------------------------------------------
// Focus-Within
// ---------------------------------------------------------------------------
// For wrapper elements that should show a focus indicator when any child
// receives focus (e.g., input wrappers with prefix/suffix icons).
// ---------------------------------------------------------------------------

/**
 * Focus indicator that activates when any descendant receives focus.
 * Apply to the wrapper element (e.g., an input wrapper with icons).
 */
export const focusWithinRingClasses =
  "focus-within:outline-none focus-within:border-border-strong" as const;

/**
 * Array variant of the focus-within classes.
 */
export const focusWithinRingClassList = [
  "focus-within:outline-none",
  "focus-within:border-border-strong",
] as const;
