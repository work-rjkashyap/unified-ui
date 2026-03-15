/**
 * Standard focus classes for interactive elements.
 * Uses `focus-visible` for keyboard-only visibility.
 * Applies a subtle border-color shift — no ring or outline.
 */
declare const focusRingClasses: "focus-visible:outline-none focus-visible:border-border-strong";
/**
 * Array variant of the standard focus classes.
 * Useful when building CVA base class arrays.
 *
 * @example
 * ```ts
 * const buttonVariants = cva([...focusRingClassList, "inline-flex"], { ... });
 * ```
 */
declare const focusRingClassList: readonly ["focus-visible:outline-none", "focus-visible:border-border-strong"];
/**
 * Focus classes without ring-offset, for elements inside containers.
 * Same subtle border-color shift as the standard variant.
 */
declare const focusRingInsetClasses: "focus-visible:outline-none focus-visible:border-border-strong";
/**
 * Array variant of the inset focus classes.
 */
declare const focusRingInsetClassList: readonly ["focus-visible:outline-none", "focus-visible:border-border-strong"];
/**
 * Compact focus classes. For small interactive elements.
 * Same subtle treatment as the standard variant.
 */
declare const focusRingCompactClasses: "focus-visible:outline-none focus-visible:border-border-strong";
/**
 * Array variant of the compact focus classes.
 */
declare const focusRingCompactClassList: readonly ["focus-visible:outline-none", "focus-visible:border-border-strong"];
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
declare const focusRingVariantOverrides: {
    /** Override focus border color to danger red */
    readonly danger: "focus-visible:border-danger";
    /** Override focus border color to success green */
    readonly success: "focus-visible:border-success";
    /** Override focus border color to warning amber */
    readonly warning: "focus-visible:border-warning";
    /** Override focus border color to info blue */
    readonly info: "focus-visible:border-info";
    /** Override focus border color to current text color */
    readonly current: "focus-visible:border-current";
};
type FocusRingVariant = keyof typeof focusRingVariantOverrides;
/**
 * Classes to apply on the focusable child element (add `group` to parent).
 */
declare const focusRingGroupTriggerClasses: "focus-visible:outline-none";
/**
 * Classes to apply on the parent element that shows the focus indicator.
 * The parent must have the `group` class.
 * Uses a subtle border-color shift on the parent when a child is focused.
 */
declare const focusRingGroupRingClasses: "group-focus-visible:border-border-strong";
/**
 * Focus indicator that activates when any descendant receives focus.
 * Apply to the wrapper element (e.g., an input wrapper with icons).
 */
declare const focusWithinRingClasses: "focus-within:outline-none focus-within:border-border-strong";
/**
 * Array variant of the focus-within classes.
 */
declare const focusWithinRingClassList: readonly ["focus-within:outline-none", "focus-within:border-border-strong"];

export { type FocusRingVariant, focusRingClassList, focusRingClasses, focusRingCompactClassList, focusRingCompactClasses, focusRingGroupRingClasses, focusRingGroupTriggerClasses, focusRingInsetClassList, focusRingInsetClasses, focusRingVariantOverrides, focusWithinRingClassList, focusWithinRingClasses };
