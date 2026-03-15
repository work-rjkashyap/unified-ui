const shadow = {
  /** No shadow — flush with the surface */
  none: "none",
  /** Subtle lift — cards on hover, slightly raised surfaces */
  xs: "0 1px 2px 0 oklch(0 0 0 / 0.05)",
  /** Default card elevation — raised cards, wells */
  sm: "0 1px 3px 0 oklch(0 0 0 / 0.1), 0 1px 2px -1px oklch(0 0 0 / 0.1)",
  /** Dropdowns, autocomplete menus, select panels */
  md: "0 4px 6px -1px oklch(0 0 0 / 0.1), 0 2px 4px -2px oklch(0 0 0 / 0.1)",
  /** Popovers, floating toolbars, sticky headers */
  lg: "0 10px 15px -3px oklch(0 0 0 / 0.1), 0 4px 6px -4px oklch(0 0 0 / 0.1)",
  /** Dialogs, modals, command palettes */
  xl: "0 20px 25px -5px oklch(0 0 0 / 0.1), 0 8px 10px -6px oklch(0 0 0 / 0.1)",
  /** Toast notifications, top-level overlays */
  "2xl": "0 25px 50px -12px oklch(0 0 0 / 0.25)",
  /** Focus ring shadow — used alongside outline for focus indication */
  focusRing: "0 0 0 2px oklch(0.708 0 0 / 40%)"
};
const shadowDark = {
  none: "none",
  xs: "0 1px 2px 0 oklch(0 0 0 / 0.2)",
  sm: "0 1px 3px 0 oklch(0 0 0 / 0.3), 0 1px 2px -1px oklch(0 0 0 / 0.3)",
  md: "0 4px 6px -1px oklch(0 0 0 / 0.35), 0 2px 4px -2px oklch(0 0 0 / 0.3)",
  lg: "0 10px 15px -3px oklch(0 0 0 / 0.35), 0 4px 6px -4px oklch(0 0 0 / 0.3)",
  xl: "0 20px 25px -5px oklch(0 0 0 / 0.4), 0 8px 10px -6px oklch(0 0 0 / 0.35)",
  "2xl": "0 25px 50px -12px oklch(0 0 0 / 0.5)",
  focusRing: "0 0 0 2px oklch(0.556 0 0 / 50%)"
};
export {
  shadow,
  shadowDark
};
