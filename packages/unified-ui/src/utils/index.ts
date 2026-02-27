// ============================================================================
// Unified UI — Utility Layer Barrel Export
// ============================================================================
// Single entry point for all design system utility functions and types.
// Import from here rather than from individual utility files.
//
// Usage:
//   import { cn, mergeSlots, dsAttr, composeRefs } from "@/design-system/utils";
//
// IMPORTANT: This barrel avoids duplicate re-exports. Each symbol is
// exported exactly once from its canonical source file:
//   - Class/DOM/ref utilities  → ./cn
//   - Type utilities & slots   → ./types
// ============================================================================

// ---------------------------------------------------------------------------
// Class Name, DOM, & Ref Utilities (from ./cn)
// ---------------------------------------------------------------------------
export {
  type AsProp,
  cn,
  composeRefs,
  dsAttr,
  dsColorVar,
  dsStateAttr,
  dsVar,
  mergeSlots,
  noop,
  type PolymorphicProps,
  type PolymorphicPropsWithRef,
  type PolymorphicRef,
  type SlotClasses,
  typedKeys,
} from "./cn";
// ---------------------------------------------------------------------------
// WCAG Contrast Checking Utilities (from ./contrast)
// ---------------------------------------------------------------------------
export {
  type AuditResult,
  auditContrast,
  type ColorPair,
  type ContrastResult,
  checkDSContrast,
  checkHexContrast,
  contrastRatio,
  DS_DARK_CRITICAL_PAIRS,
  DS_LIGHT_CRITICAL_PAIRS,
  meetsAA,
  meetsAAA,
  meetsNonTextAA,
  parseHex,
  parseRGBString,
  type RGB,
  relativeLuminance,
  type TextSize,
  toRGBString,
  WCAG_AA_LARGE,
  WCAG_AA_NORMAL,
  WCAG_AAA_LARGE,
  WCAG_AAA_NORMAL,
  WCAG_NON_TEXT_AA,
} from "./contrast";

// ---------------------------------------------------------------------------
// Focus Ring Utilities (from ./focus-ring)
// ---------------------------------------------------------------------------
export {
  type FocusRingVariant,
  focusRingClasses,
  focusRingClassList,
  focusRingCompactClasses,
  focusRingCompactClassList,
  focusRingGroupRingClasses,
  focusRingGroupTriggerClasses,
  focusRingInsetClasses,
  focusRingInsetClassList,
  focusRingVariantOverrides,
  focusWithinRingClasses,
  focusWithinRingClassList,
} from "./focus-ring";
// ---------------------------------------------------------------------------
// Type Utilities, Slots, & Variant Types (from ./types)
//
// NOTE: Polymorphic types in ./types use a different signature than those
// in ./cn (different generic defaults and conventions). We export only the
// types from ./types that do NOT collide with ./cn exports. If you need
// the ./types polymorphic variants specifically, import from ./types
// directly.
// ---------------------------------------------------------------------------
export {
  type ChildrenProps,
  type ComponentIntent,
  type ComponentSize,
  type Defined,
  dsDataAttrs,
  type MergedProps,
  type OptionalChildrenProps,
  type PartialExcept,
  type PolymorphicComponent,
  type RenderChildrenProps,
  type RequireKeys,
  type SlotConfig,
  type SlotDefinition,
  type SlotRenderFn,
  type Slots,
  type VariantKey,
} from "./types";
