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
//   sticky     →  10   — sticky headers, floating toolbars
//   overlay    →  40   — backdrop overlays behind modals
//   modal      →  50   — dialogs, sheets, drawers
//   dropdown   →  60   — dropdowns, select menus, context menus (above modals)
//   popover    →  70   — popovers, comboboxes, date pickers (above modals)
//   toast      →  80   — toast notifications (always visible)
//   tooltip    →  90   — tooltips (highest interactive layer)
//   max        →  9999 — escape hatch for truly exceptional cases
//
// IMPORTANT: dropdown and popover are intentionally higher than modal so that
// floating UI elements (Select, DropdownMenu, Combobox, Popover, DatePicker)
// render correctly when opened from inside a Dialog, Sheet, or Drawer.
//
// NEVER hardcode z-index values in components. Always use these tokens.
// ============================================================================

export const zIndex = {
  /** Default document flow — no explicit stacking */
  base: "0",
  /** Sticky headers, floating action bars, pinned columns */
  sticky: "10",
  /** Backdrop overlays behind modals and drawers */
  overlay: "40",
  /** Modals, dialogs, sheets, drawers */
  modal: "50",
  /** Dropdowns, select menus, context menus — renders above modals */
  dropdown: "60",
  /** Popovers, comboboxes, date pickers — renders above modals */
  popover: "70",
  /** Toast notifications — always visible above all content */
  toast: "80",
  /** Tooltips — highest interactive z-layer */
  tooltip: "90",
  /** Emergency escape hatch — use sparingly and document why */
  max: "9999",
} as const;

// ---------------------------------------------------------------------------
// Type Exports
// ---------------------------------------------------------------------------

export type ZIndex = keyof typeof zIndex;
export type ZIndexValue = (typeof zIndex)[ZIndex];
