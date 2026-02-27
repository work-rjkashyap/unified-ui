// ============================================================================
// Unified UI — Z-Index Tokens
// ============================================================================
// A structured z-index scale that prevents arbitrary stacking values from
// accumulating across the codebase. Every z-index in the application must
// reference one of these tokens.
//
// The scale is designed with intentional gaps so new layers can be inserted
// without renumbering the entire stack.
//
// Stacking order (bottom → top):
//   base       →  0    — default document flow
//   dropdown   →  10   — dropdowns, select menus, popovers
//   sticky     →  20   — sticky headers, floating toolbars
//   overlay    →  30   — backdrop overlays behind modals
//   modal      →  40   — dialogs, sheets, drawers
//   popover    →  50   — popovers that sit above modals (rare)
//   toast      →  60   — toast notifications (always visible)
//   tooltip    →  70   — tooltips (highest interactive layer)
//   max        →  9999 — escape hatch for truly exceptional cases
//
// NEVER hardcode z-index values in components. Always use these tokens.
// ============================================================================

export const zIndex = {
  /** Default document flow — no explicit stacking */
  base: "0",
  /** Dropdowns, select menus, autocomplete lists */
  dropdown: "10",
  /** Sticky headers, floating action bars, pinned columns */
  sticky: "20",
  /** Backdrop overlays behind modals and drawers */
  overlay: "30",
  /** Modals, dialogs, sheets, drawers */
  modal: "40",
  /** Popovers that must render above modals */
  popover: "50",
  /** Toast notifications — always visible above all content */
  toast: "60",
  /** Tooltips — highest interactive z-layer */
  tooltip: "70",
  /** Emergency escape hatch — use sparingly and document why */
  max: "9999",
} as const;

// ---------------------------------------------------------------------------
// Type Exports
// ---------------------------------------------------------------------------

export type ZIndex = keyof typeof zIndex;
export type ZIndexValue = (typeof zIndex)[ZIndex];
