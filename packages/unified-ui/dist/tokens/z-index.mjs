const zIndex = {
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
  max: "9999"
};
export {
  zIndex
};
