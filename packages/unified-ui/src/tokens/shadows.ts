// ============================================================================
// Unified UI — Shadow Tokens
// ============================================================================
// Elevation system using box-shadow values. Shadows are used sparingly —
// the design system prefers borders (`border-border`) over shadows for
// most surface separation. Shadows are reserved for elevated surfaces
// like popovers, dropdowns, dialogs, and toasts.
//
// Each level represents a progressively higher elevation from the base
// surface. The naming follows a semantic elevation model rather than
// arbitrary sizes.
//
// Shadow colors use oklch(0 0 0 / <alpha>) for consistency with the
// oklch-based color token system.
//
// NEVER hardcode box-shadow values in components. Always reference
// these tokens through the theme layer.
// ============================================================================

export const shadow = {
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
  focusRing: "0 0 0 2px oklch(0.708 0 0 / 40%)",
} as const;

// ---------------------------------------------------------------------------
// Dark mode shadow overrides
// ---------------------------------------------------------------------------
// In dark mode, shadows are less effective because the base surface is
// already dark. We use slightly more opaque shadows and a subtle light
// border glow to maintain the perception of elevation.
// ---------------------------------------------------------------------------

export const shadowDark = {
  none: "none",
  xs: "0 1px 2px 0 oklch(0 0 0 / 0.2)",
  sm: "0 1px 3px 0 oklch(0 0 0 / 0.3), 0 1px 2px -1px oklch(0 0 0 / 0.3)",
  md: "0 4px 6px -1px oklch(0 0 0 / 0.35), 0 2px 4px -2px oklch(0 0 0 / 0.3)",
  lg: "0 10px 15px -3px oklch(0 0 0 / 0.35), 0 4px 6px -4px oklch(0 0 0 / 0.3)",
  xl: "0 20px 25px -5px oklch(0 0 0 / 0.4), 0 8px 10px -6px oklch(0 0 0 / 0.35)",
  "2xl": "0 25px 50px -12px oklch(0 0 0 / 0.5)",
  focusRing: "0 0 0 2px oklch(0.556 0 0 / 50%)",
} as const;

// ---------------------------------------------------------------------------
// Type Exports
// ---------------------------------------------------------------------------

export type Shadow = keyof typeof shadow;
export type ShadowValue = (typeof shadow)[Shadow];
