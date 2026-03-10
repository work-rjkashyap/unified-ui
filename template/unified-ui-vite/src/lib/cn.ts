// ============================================================================
// Unified UI — Core Utilities
// ============================================================================
// Core utility functions used throughout the Unified UI design system.
// These are the foundational helpers that every component depends on.
//
// Includes class-name merging (clsx + tailwind-merge), slot composition,
// polymorphic component types, data-attribute generators, CSS variable
// reference helpers, and ref composition.
// ============================================================================

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ---------------------------------------------------------------------------
// cn — Class Name Merger
// ---------------------------------------------------------------------------
// Combines clsx (conditional class joining) with tailwind-merge (intelligent
// Tailwind class deduplication). This is the ONLY way to merge class names
// in design system components.
//
// Usage:
//   cn("px-4 py-2", isActive && "bg-primary", className)
//   cn("text-sm font-medium", { "opacity-50": disabled })
// ---------------------------------------------------------------------------

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ---------------------------------------------------------------------------
// Slot Class Merging
// ---------------------------------------------------------------------------
// Design system components often expose multiple styling "slots" (e.g. a
// Button has a root slot, an icon slot, and a label slot). This utility
// merges user-provided slot classes with the component's default slot classes.
//
// Usage:
//   const defaults = { root: "flex items-center", icon: "size-4", label: "text-sm" };
//   const merged = mergeSlots(defaults, { root: "gap-2", icon: "text-red-500" });
//   // → { root: "flex items-center gap-2", icon: "size-4 text-red-500", label: "text-sm" }
// ---------------------------------------------------------------------------

export type SlotClasses<S extends string = string> = Partial<Record<S, string>>;

/**
 * Merge default slot classes with user-provided overrides.
 * Each slot is merged independently using `cn()`.
 */
export function mergeSlots<S extends string>(
  defaults: SlotClasses<S>,
  overrides?: SlotClasses<S>,
): Record<S, string> {
  if (!overrides) {
    return defaults as Record<S, string>;
  }

  const allKeys = new Set([
    ...Object.keys(defaults),
    ...Object.keys(overrides),
  ]) as Set<S>;

  const result = {} as Record<S, string>;

  for (const key of allKeys) {
    result[key] = cn(defaults[key] ?? "", overrides[key] ?? "");
  }

  return result;
}

// ---------------------------------------------------------------------------
// Polymorphic Component Helper Types
// ---------------------------------------------------------------------------
// Allows components to render as different HTML elements while preserving
// type safety for the element's native props.
//
// Usage:
//   type ButtonProps = PolymorphicProps<"button", { variant: "primary" | "ghost" }>;
//
//   // Consumer can use: <Button as="a" href="/foo" variant="primary" />
// ---------------------------------------------------------------------------

/**
 * The `as` prop type — constrains to valid React element types.
 */
export type AsProp<C extends React.ElementType = React.ElementType> = {
  as?: C;
};

/**
 * Extracts the props of the given element type, omitting keys that
 * the component itself defines (to prevent collisions).
 */
export type PolymorphicProps<
  C extends React.ElementType,
  OwnProps = object,
> = OwnProps &
  AsProp<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof OwnProps | "as">;

/**
 * Ref type for a polymorphic component.
 */
export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

/**
 * Full polymorphic component props including the ref.
 */
export type PolymorphicPropsWithRef<
  C extends React.ElementType,
  OwnProps = object,
> = PolymorphicProps<C, OwnProps> & {
  ref?: PolymorphicRef<C>;
};

// ---------------------------------------------------------------------------
// Data Attribute Helpers
// ---------------------------------------------------------------------------
// Design system components use `data-ds` attributes for scoping CSS and
// for testing. These helpers ensure consistent attribute naming.
// ---------------------------------------------------------------------------

/**
 * Returns the data attribute object for a design system component.
 *
 * @example
 *   dsAttr("button") → { "data-ds": "", "data-ds-component": "button" }
 */
export function dsAttr(componentName: string): Record<string, string> {
  return {
    "data-ds": "",
    "data-ds-component": componentName,
  };
}

/**
 * Returns a data attribute object for a specific component state.
 *
 * @example
 *   dsStateAttr("loading", true) → { "data-ds-loading": "" }
 *   dsStateAttr("loading", false) → {}
 */
export function dsStateAttr(
  state: string,
  active: boolean,
): Record<string, string> {
  if (!active) return {};
  return { [`data-ds-${state}`]: "" };
}

// ---------------------------------------------------------------------------
// CSS Variable Reference Helper
// ---------------------------------------------------------------------------
// Shorthand for referencing design system CSS custom properties in inline
// styles. Useful when you need dynamic styles that can't be expressed
// with utility classes alone.
//
// For non-color tokens (radius, shadow, z-index, duration, easing, font):
//   style={{ gap: dsVar("spacing", "4") }}
//   → "var(--spacing-4)"
//
// For color tokens, use dsColorVar() instead.
// ---------------------------------------------------------------------------

/**
 * Returns a CSS `var()` reference to a design system custom property.
 *
 * @param category - The token category (e.g. "color", "radius", "z")
 * @param name - The token name within that category
 * @param fallback - Optional CSS fallback value
 */
export function dsVar(
  category: string,
  name: string,
  fallback?: string,
): string {
  const varName = `--${category}-${name}`;
  return fallback ? `var(${varName}, ${fallback})` : `var(${varName})`;
}

/**
 * Returns a `var(...)` reference for color tokens. Colors are stored as
 * complete oklch() values in CSS custom properties with no prefix.
 *
 * For alpha-modified colors, uses `color-mix(in oklch, ...)` for broad
 * browser support.
 *
 * @example
 *   dsColorVar("primary")       → "var(--primary)"
 *   dsColorVar("primary", 0.5)  → "color-mix(in oklch, var(--primary) 50%, transparent)"
 */
export function dsColorVar(name: string, alpha?: number): string {
  const varRef = `var(--${name})`;
  if (alpha !== undefined) {
    return `color-mix(in oklch, ${varRef} ${Math.round(alpha * 100)}%, transparent)`;
  }
  return varRef;
}

// ---------------------------------------------------------------------------
// Compose Refs
// ---------------------------------------------------------------------------
// Utility to compose multiple refs into a single ref callback. Essential
// for forwarded ref components that also need an internal ref.
//
// Usage:
//   const internalRef = useRef(null);
//   <div ref={composeRefs(internalRef, forwardedRef)} />
// ---------------------------------------------------------------------------

type PossibleRef<T> = React.Ref<T> | undefined;

/**
 * Set a value on a ref, handling both callback refs and ref objects.
 */
function setRef<T>(ref: PossibleRef<T>, value: T): void {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

/**
 * Compose multiple refs into a single ref callback.
 *
 * @example
 *   const Component = forwardRef<HTMLDivElement, Props>((props, ref) => {
 *     const internalRef = useRef<HTMLDivElement>(null);
 *     return <div ref={composeRefs(ref, internalRef)} />;
 *   });
 */
export function composeRefs<T>(
  ...refs: PossibleRef<T>[]
): (node: T | null) => void {
  return (node: T | null) => {
    for (const ref of refs) {
      setRef(ref, node as T);
    }
  };
}

// ---------------------------------------------------------------------------
// Type-safe Object.keys
// ---------------------------------------------------------------------------
// TypeScript's Object.keys returns string[], which loses type information.
// This helper preserves the key types.
// ---------------------------------------------------------------------------

/**
 * Type-safe Object.keys that preserves key literal types.
 */
export function typedKeys<T extends Record<string, unknown>>(
  obj: T,
): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

// ---------------------------------------------------------------------------
// Noop
// ---------------------------------------------------------------------------

/** A no-operation function. Useful as a default callback. */
export const noop = (): void => {};
