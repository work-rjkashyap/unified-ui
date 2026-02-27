// ============================================================================
// Unified UI — Radius Tokens
// ============================================================================
// Border radius values for the design system. Kept intentionally subtle
// to avoid excessive decoration. Components reference these tokens —
// never hardcode border-radius values.
//
// Design principle: prefer `md` (6px) as the default for interactive
// elements (buttons, inputs, cards). Use `lg` (8px) only for dialogs,
// sheets, and popovers. Avoid fully rounded (`full`) except for avatars
// and pills.
// ============================================================================

export const radius = {
  /** No rounding */
  none: "0px",
  /** Barely perceptible — tags, micro elements */
  sm: "4px",
  /** Default for buttons, inputs, cards */
  md: "6px",
  /** Dialogs, sheets, popovers, dropdowns */
  lg: "8px",
  /** Larger containers, modals */
  xl: "12px",
  /** Full pill / circle — avatars, toggle pills */
  full: "9999px",
} as const;

// ---------------------------------------------------------------------------
// Type Exports
// ---------------------------------------------------------------------------

export type Radius = keyof typeof radius;
export type RadiusValue = (typeof radius)[Radius];
