// ============================================================================
// Unified UI — Focus Ring Utilities
// ============================================================================
// Centralized focus ring class constants and utilities. Every interactive
// component in the design system MUST use these constants for consistent,
// WCAG AA-compliant focus indicators.
//
// The focus ring system uses:
//   1. `focus-visible` — only shows on keyboard navigation, not mouse clicks
//   2. `ring-ds-focus-ring` — uses the design system's focus color token
//   3. `ring-offset-ds-background` — offset matches the current theme bg
//
// These constants replace ad-hoc focus ring strings scattered across
// component files. When you need to change the focus ring appearance,
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
// Core Focus Ring — Standard (with offset)
// ---------------------------------------------------------------------------
// The default focus ring for standalone interactive elements: buttons,
// links, checkboxes, radios, switches, selects, tabs, accordion triggers.
//
// - `outline-none` removes the default browser outline
// - `ring-2` applies a 2px ring (box-shadow-based in Tailwind)
// - `ring-ds-focus-ring` uses the DS focus color token
// - `ring-offset-2` adds 2px of space between the element and the ring
// - `ring-offset-ds-background` colors the offset gap with the theme bg
//
// Contrast: The indigo-based focus ring (#6366f1 light / #818cf8 dark)
// provides ≥3:1 contrast against both light and dark backgrounds,
// meeting WCAG 2.1 SC 1.4.11 (Non-text Contrast).
// ---------------------------------------------------------------------------

/**
 * Standard focus ring classes for interactive elements.
 * Uses `focus-visible` for keyboard-only visibility.
 * Includes a 2px offset to separate the ring from the element.
 */
export const focusRingClasses =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ds-background" as const;

/**
 * Array variant of the standard focus ring classes.
 * Useful when building CVA base class arrays.
 *
 * @example
 * ```ts
 * const buttonVariants = cva([...focusRingClassList, "inline-flex"], { ... });
 * ```
 */
export const focusRingClassList = [
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-ds-focus-ring",
  "focus-visible:ring-offset-2",
  "focus-visible:ring-offset-ds-background",
] as const;

// ---------------------------------------------------------------------------
// Inset Focus Ring — No offset
// ---------------------------------------------------------------------------
// For elements that are visually flush with their container (e.g., items
// inside a dropdown menu, list items, table cells, close buttons inside
// popovers). The ring sits directly on the element border without offset.
// ---------------------------------------------------------------------------

/**
 * Focus ring classes without ring-offset, for elements inside containers.
 * Avoids the offset gap that can look odd when the element is flush
 * against a parent boundary.
 */
export const focusRingInsetClasses =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-focus-ring" as const;

/**
 * Array variant of the inset focus ring classes.
 */
export const focusRingInsetClassList = [
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-ds-focus-ring",
] as const;

// ---------------------------------------------------------------------------
// Compact Focus Ring — 1px offset
// ---------------------------------------------------------------------------
// For compact or small interactive elements (breadcrumb links, pagination
// buttons, small icon buttons) where a 2px offset feels too large.
// ---------------------------------------------------------------------------

/**
 * Compact focus ring with a 1px offset. For small interactive elements.
 */
export const focusRingCompactClasses =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-focus-ring focus-visible:ring-offset-1" as const;

/**
 * Array variant of the compact focus ring classes.
 */
export const focusRingCompactClassList = [
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-ds-focus-ring",
  "focus-visible:ring-offset-1",
] as const;

// ---------------------------------------------------------------------------
// Focus Ring with Custom Color
// ---------------------------------------------------------------------------
// For error/success states where the focus ring should match the variant
// color (e.g., a danger button's focus ring uses the danger color).
// ---------------------------------------------------------------------------

/**
 * Focus ring variant strings for use with error/success/warning states.
 * Replace the ring color with the appropriate semantic color.
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
  /** Override ring color to danger red */
  danger: "focus-visible:ring-ds-danger",
  /** Override ring color to success green */
  success: "focus-visible:ring-ds-success",
  /** Override ring color to warning amber */
  warning: "focus-visible:ring-ds-warning",
  /** Override ring color to info blue */
  info: "focus-visible:ring-ds-info",
  /** Override ring color to current text color */
  current: "focus-visible:ring-current",
} as const;

export type FocusRingVariant = keyof typeof focusRingVariantOverrides;

// ---------------------------------------------------------------------------
// Group Focus Ring
// ---------------------------------------------------------------------------
// For composite components where the focus ring appears on a parent
// container when a child receives focus (via Tailwind's `group` pattern).
// ---------------------------------------------------------------------------

/**
 * Classes to apply on the focusable child element (add `group` to parent).
 */
export const focusRingGroupTriggerClasses =
  "focus-visible:outline-none" as const;

/**
 * Classes to apply on the parent element that shows the ring.
 * The parent must have the `group` class.
 */
export const focusRingGroupRingClasses =
  "group-focus-visible:ring-2 group-focus-visible:ring-ds-focus-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-ds-background" as const;

// ---------------------------------------------------------------------------
// Focus-Within Ring
// ---------------------------------------------------------------------------
// For wrapper elements that should show a focus ring when any child
// receives focus (e.g., input wrappers with prefix/suffix icons).
// ---------------------------------------------------------------------------

/**
 * Focus ring that activates when any descendant receives focus.
 * Apply to the wrapper element (e.g., an input wrapper with icons).
 */
export const focusWithinRingClasses =
  "focus-within:outline-none focus-within:ring-2 focus-within:ring-ds-focus-ring focus-within:ring-offset-2 focus-within:ring-offset-ds-background" as const;

/**
 * Array variant of the focus-within ring classes.
 */
export const focusWithinRingClassList = [
  "focus-within:outline-none",
  "focus-within:ring-2",
  "focus-within:ring-ds-focus-ring",
  "focus-within:ring-offset-2",
  "focus-within:ring-offset-ds-background",
] as const;
