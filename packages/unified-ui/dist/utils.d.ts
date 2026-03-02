import { ClassValue } from 'clsx';
import { ReactNode, ReactElement, ElementType, ComponentPropsWithoutRef, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';

declare function cn(...inputs: ClassValue[]): string;
type SlotClasses<S extends string = string> = Partial<Record<S, string>>;
/**
 * Merge default slot classes with user-provided overrides.
 * Each slot is merged independently using `cn()`.
 */
declare function mergeSlots<S extends string>(defaults: SlotClasses<S>, overrides?: SlotClasses<S>): Record<S, string>;
/**
 * The `as` prop type — constrains to valid React element types.
 */
type AsProp$1<C extends React.ElementType = React.ElementType> = {
    as?: C;
};
/**
 * Extracts the props of the given element type, omitting keys that
 * the component itself defines (to prevent collisions).
 */
type PolymorphicProps$1<C extends React.ElementType, OwnProps = object> = OwnProps & AsProp$1<C> & Omit<React.ComponentPropsWithoutRef<C>, keyof OwnProps | "as">;
/**
 * Ref type for a polymorphic component.
 */
type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>["ref"];
/**
 * Full polymorphic component props including the ref.
 */
type PolymorphicPropsWithRef<C extends React.ElementType, OwnProps = object> = PolymorphicProps$1<C, OwnProps> & {
    ref?: PolymorphicRef<C>;
};
/**
 * Returns the data attribute object for a design system component.
 *
 * @example
 *   dsAttr("button") → { "data-ds": "", "data-ds-component": "button" }
 */
declare function dsAttr(componentName: string): Record<string, string>;
/**
 * Returns a data attribute object for a specific component state.
 *
 * @example
 *   dsStateAttr("loading", true) → { "data-ds-loading": "" }
 *   dsStateAttr("loading", false) → {}
 */
declare function dsStateAttr(state: string, active: boolean): Record<string, string>;
/**
 * Returns a CSS `var()` reference to a design system custom property.
 *
 * @param category - The token category (e.g. "color", "radius", "z")
 * @param name - The token name within that category
 * @param fallback - Optional CSS fallback value
 */
declare function dsVar(category: string, name: string, fallback?: string): string;
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
declare function dsColorVar(name: string, alpha?: number): string;
type PossibleRef<T> = React.Ref<T> | undefined;
/**
 * Compose multiple refs into a single ref callback.
 *
 * @example
 *   const Component = forwardRef<HTMLDivElement, Props>((props, ref) => {
 *     const internalRef = useRef<HTMLDivElement>(null);
 *     return <div ref={composeRefs(ref, internalRef)} />;
 *   });
 */
declare function composeRefs<T>(...refs: PossibleRef<T>[]): (node: T | null) => void;
/**
 * Type-safe Object.keys that preserves key literal types.
 */
declare function typedKeys<T extends Record<string, unknown>>(obj: T): (keyof T)[];
/** A no-operation function. Useful as a default callback. */
declare const noop: () => void;

/** An RGB color represented as a tuple of [red, green, blue] (0–255 each). */
type RGB = readonly [number, number, number];
/** Text size category for WCAG contrast thresholds. */
type TextSize = "normal" | "large";
/** Full result of a contrast check between two colors. */
interface ContrastResult {
    /** The computed contrast ratio (e.g. 4.56). Always ≥ 1. */
    ratio: number;
    /** Meets WCAG AA for normal text (≥ 4.5:1). */
    aa: boolean;
    /** Meets WCAG AA for large text (≥ 3:1). */
    aaLarge: boolean;
    /** Meets WCAG AAA for normal text (≥ 7:1). */
    aaa: boolean;
    /** Meets WCAG AAA for large text (≥ 4.5:1). */
    aaaLarge: boolean;
    /** Meets WCAG AA for non-text UI components (≥ 3:1). */
    nonTextAA: boolean;
}
/** Minimum contrast ratio for WCAG AA normal text. */
declare const WCAG_AA_NORMAL = 4.5;
/** Minimum contrast ratio for WCAG AA large text. */
declare const WCAG_AA_LARGE = 3;
/** Minimum contrast ratio for WCAG AAA normal text. */
declare const WCAG_AAA_NORMAL = 7;
/** Minimum contrast ratio for WCAG AAA large text. */
declare const WCAG_AAA_LARGE = 4.5;
/** Minimum contrast ratio for WCAG AA non-text UI components (SC 1.4.11). */
declare const WCAG_NON_TEXT_AA = 3;
/**
 * Calculate the relative luminance of an sRGB color.
 *
 * @param color - RGB tuple [r, g, b] with values in 0–255 range
 * @returns Relative luminance in 0–1 range (0 = black, 1 = white)
 *
 * @example
 * ```ts
 * relativeLuminance([255, 255, 255]) // → 1.0 (white)
 * relativeLuminance([0, 0, 0])       // → 0.0 (black)
 * relativeLuminance([79, 70, 229])   // → ~0.067 (indigo)
 * ```
 */
declare function relativeLuminance(color: RGB): number;
/**
 * Calculate the WCAG contrast ratio between two colors.
 *
 * @param foreground - RGB tuple [r, g, b] for the foreground (text) color
 * @param background - RGB tuple [r, g, b] for the background color
 * @returns Contrast ratio ≥ 1.0 (e.g. 4.5 means "4.5:1")
 *
 * @example
 * ```ts
 * contrastRatio([0, 0, 0], [255, 255, 255])   // → 21.0 (max)
 * contrastRatio([255, 255, 255], [0, 0, 0])   // → 21.0 (order doesn't matter)
 * contrastRatio([79, 70, 229], [255, 255, 255]) // → ~4.56
 * ```
 */
declare function contrastRatio(foreground: RGB, background: RGB): number;
/**
 * Check if a contrast ratio meets WCAG AA requirements.
 *
 * @param ratio - The contrast ratio to check
 * @param textSize - "normal" (default, ≥ 4.5:1) or "large" (≥ 3:1)
 * @returns `true` if the ratio meets the AA threshold
 */
declare function meetsAA(ratio: number, textSize?: TextSize): boolean;
/**
 * Check if a contrast ratio meets WCAG AAA requirements.
 *
 * @param ratio - The contrast ratio to check
 * @param textSize - "normal" (default, ≥ 7:1) or "large" (≥ 4.5:1)
 * @returns `true` if the ratio meets the AAA threshold
 */
declare function meetsAAA(ratio: number, textSize?: TextSize): boolean;
/**
 * Check if a contrast ratio meets WCAG AA for non-text elements (SC 1.4.11).
 * This applies to UI component boundaries, focus indicators, and graphical objects.
 *
 * @param ratio - The contrast ratio to check
 * @returns `true` if the ratio meets ≥ 3:1
 */
declare function meetsNonTextAA(ratio: number): boolean;
/**
 * Parse a space-separated RGB string (as used in `design-system.css`) into
 * an RGB tuple.
 *
 * @param rgbString - Space-separated RGB channels, e.g. "79 70 229"
 * @returns RGB tuple [r, g, b]
 * @throws {Error} If the string is not a valid 3-channel RGB value
 *
 * @example
 * ```ts
 * parseRGBString("79 70 229")     // → [79, 70, 229]
 * parseRGBString("255 255 255")   // → [255, 255, 255]
 * ```
 */
declare function parseRGBString(rgbString: string): RGB;
/**
 * Convert an RGB tuple back to a space-separated string.
 *
 * @param color - RGB tuple [r, g, b]
 * @returns Space-separated string, e.g. "79 70 229"
 */
declare function toRGBString(color: RGB): string;
/**
 * Parse a hex color string into an RGB tuple.
 *
 * @param hex - Hex color string (with or without #), supports 3 or 6 digits
 * @returns RGB tuple [r, g, b]
 * @throws {Error} If the string is not a valid hex color
 *
 * @example
 * ```ts
 * parseHex("#4F46E5")    // → [79, 70, 229]
 * parseHex("4F46E5")     // → [79, 70, 229]
 * parseHex("#fff")       // → [255, 255, 255]
 * ```
 */
declare function parseHex(hex: string): RGB;
/**
 * Perform a comprehensive WCAG contrast check between two colors.
 * Accepts the space-separated RGB strings used in `design-system.css`.
 *
 * @param fgRGBString - Foreground color as "R G B" string (e.g. "255 255 255")
 * @param bgRGBString - Background color as "R G B" string (e.g. "79 70 229")
 * @returns Full contrast result with ratio and pass/fail for each WCAG level
 *
 * @example
 * ```ts
 * const result = checkDSContrast("255 255 255", "79 70 229");
 * // → {
 * //   ratio: 4.56,
 * //   aa: true,
 * //   aaLarge: true,
 * //   aaa: false,
 * //   aaaLarge: true,
 * //   nonTextAA: true,
 * // }
 * ```
 */
declare function checkDSContrast(fgRGBString: string, bgRGBString: string): ContrastResult;
/**
 * Perform a comprehensive WCAG contrast check between two hex colors.
 *
 * @param fgHex - Foreground hex color (e.g. "#FFFFFF")
 * @param bgHex - Background hex color (e.g. "#4F46E5")
 * @returns Full contrast result with ratio and pass/fail for each WCAG level
 */
declare function checkHexContrast(fgHex: string, bgHex: string): ContrastResult;
/** A named color pair for batch auditing. */
interface ColorPair {
    /** Human-readable label for the pair (e.g. "primary on background"). */
    label: string;
    /** Foreground color as space-separated RGB string. */
    fg: string;
    /** Background color as space-separated RGB string. */
    bg: string;
}
/** Result of a single pair in a batch audit. */
interface AuditResult extends ContrastResult {
    /** The label from the input pair. */
    label: string;
    /** The foreground RGB string. */
    fg: string;
    /** The background RGB string. */
    bg: string;
}
/**
 * Audit multiple color pairs against WCAG contrast requirements.
 * Returns results for each pair, making it easy to identify failing
 * combinations during design system QA.
 *
 * @param pairs - Array of labeled color pairs to check
 * @returns Array of audit results, one per input pair
 *
 * @example
 * ```ts
 * const results = auditContrast([
 *   { label: "primary text on bg", fg: "79 70 229", bg: "255 255 255" },
 *   { label: "muted text on bg", fg: "113 113 122", bg: "255 255 255" },
 *   { label: "danger on white", fg: "220 38 38", bg: "255 255 255" },
 * ]);
 *
 * // Filter to just the failures:
 * const failures = results.filter((r) => !r.aa);
 * ```
 */
declare function auditContrast(pairs: ColorPair[]): AuditResult[];
/**
 * Critical color pairs from the Unified UI light theme that must meet
 * WCAG AA contrast. Use with `auditContrast()` for automated checks.
 *
 * @example
 * ```ts
 * const results = auditContrast(DS_LIGHT_CRITICAL_PAIRS);
 * const failures = results.filter((r) => !r.aa);
 * if (failures.length > 0) {
 *   console.error("WCAG AA failures:", failures);
 * }
 * ```
 */
declare const DS_LIGHT_CRITICAL_PAIRS: ColorPair[];
/**
 * Critical color pairs from the Unified UI dark theme that must meet
 * WCAG AA contrast. Use with `auditContrast()` for automated checks.
 */
declare const DS_DARK_CRITICAL_PAIRS: ColorPair[];

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

/**
 * Extracts the `as` prop from a set of props.
 *
 * @template Default - The default element type when `as` is not specified.
 */
type AsProp<Default extends ElementType = "div"> = {
    /**
     * The HTML element or React component to render as.
     * @default Default (varies per component)
     */
    as?: ElementType;
};
/**
 * Merges a component's own props with the intrinsic props of the target
 * element type specified by `as`, omitting any keys that the component
 * already defines (component props take precedence).
 *
 * @template OwnProps - The component's own prop interface.
 * @template E - The element type (from `as` prop or default).
 */
type MergedProps<OwnProps, E extends ElementType> = OwnProps & Omit<ComponentPropsWithoutRef<E>, keyof OwnProps>;
/**
 * The complete prop type for a polymorphic component, including `as`,
 * the component's own props, and the target element's intrinsic props.
 *
 * @template OwnProps - The component's own prop interface.
 * @template Default - The default element type when `as` is not specified.
 *
 * @example
 * ```tsx
 * type TextProps = PolymorphicProps<{ variant: "body" | "caption" }, "p">;
 * ```
 */
type PolymorphicProps<OwnProps = Record<string, never>, Default extends ElementType = "div"> = AsProp<Default> & MergedProps<OwnProps, Default>;
/**
 * Represents a polymorphic forward-ref component. Use this as the return
 * type when defining polymorphic components with `React.forwardRef`.
 *
 * @template OwnProps - The component's own prop interface.
 * @template Default - The default element type.
 */
type PolymorphicComponent<OwnProps = Record<string, never>, Default extends ElementType = "div"> = ForwardRefExoticComponent<PropsWithoutRef<PolymorphicProps<OwnProps, Default>> & RefAttributes<Element>>;
/**
 * Configuration for a single slot within a composite component.
 * Each slot can be customized with className, style, or replaced entirely.
 */
interface SlotConfig {
    /** Additional CSS classes to merge with the slot's default classes */
    className?: string;
    /** Inline style overrides for the slot element */
    style?: React.CSSProperties;
}
/**
 * A render function slot — replaces the default slot rendering entirely.
 * Receives the default children and props so the consumer can wrap or
 * augment the default behavior.
 */
type SlotRenderFn<P = Record<string, never>> = (props: P & {
    children?: ReactNode;
    className?: string;
}) => ReactElement;
/**
 * A slot definition that accepts either a static config or a render function.
 */
type SlotDefinition<P = Record<string, never>> = SlotConfig | SlotRenderFn<P>;
/**
 * Creates a typed slots interface for a composite component.
 *
 * @template SlotNames - A union of string literal slot names.
 *
 * @example
 * ```tsx
 * type CardSlots = Slots<"header" | "body" | "footer">;
 *
 * interface CardProps {
 *   slots?: CardSlots;
 * }
 * ```
 */
type Slots<SlotNames extends string> = Partial<Record<SlotNames, SlotDefinition>>;
/**
 * Extracts the variant keys from a variant configuration object.
 *
 * @example
 * ```tsx
 * const variants = { primary: "...", secondary: "...", ghost: "..." } as const;
 * type ButtonVariant = VariantKey<typeof variants>;
 * // → "primary" | "secondary" | "ghost"
 * ```
 */
type VariantKey<T extends Record<string, unknown>> = keyof T & string;
/**
 * Standard size scale used across interactive components.
 * Components should support at minimum `sm`, `md`, and `lg`.
 */
type ComponentSize = "sm" | "md" | "lg";
/**
 * Standard intent/purpose variants used across interactive components.
 */
type ComponentIntent = "primary" | "secondary" | "danger" | "ghost";
/**
 * A component that accepts `children` as its only required prop.
 * Useful for layout primitives (Stack, Container, Grid).
 */
interface ChildrenProps {
    children: ReactNode;
}
/**
 * A component that accepts optional `children`.
 */
interface OptionalChildrenProps {
    children?: ReactNode;
}
/**
 * A render-prop pattern where children is a function.
 *
 * @template T - The argument type passed to the render function.
 */
interface RenderChildrenProps<T = undefined> {
    children: T extends undefined ? () => ReactNode : (value: T) => ReactNode;
}
/**
 * Generates a data attribute object for a design system component.
 * All DS components should include `data-ds` for scoping and
 * `data-ds-component` for identification.
 *
 * @param name - The component name (e.g. "button", "input", "card").
 * @returns An object with the data attributes to spread onto the element.
 *
 * @example
 * ```tsx
 * <div {...dsDataAttrs("card")} className={...}>
 *   {children}
 * </div>
 * // Renders: <div data-ds data-ds-component="card">
 * ```
 */
declare function dsDataAttrs(name: string): Record<string, string | boolean>;
/**
 * Makes specific keys of T required while keeping the rest unchanged.
 */
type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;
/**
 * Makes all properties of T optional except for the specified keys.
 */
type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;
/**
 * Removes `undefined` from the value type of each property in T.
 */
type Defined<T> = {
    [K in keyof T]-?: Exclude<T[K], undefined>;
};

export { type AsProp$1 as AsProp, type AuditResult, type ChildrenProps, type ColorPair, type ComponentIntent, type ComponentSize, type ContrastResult, DS_DARK_CRITICAL_PAIRS, DS_LIGHT_CRITICAL_PAIRS, type Defined, type FocusRingVariant, type MergedProps, type OptionalChildrenProps, type PartialExcept, type PolymorphicComponent, type PolymorphicProps$1 as PolymorphicProps, type PolymorphicPropsWithRef, type PolymorphicRef, type RGB, type RenderChildrenProps, type RequireKeys, type SlotClasses, type SlotConfig, type SlotDefinition, type SlotRenderFn, type Slots, type TextSize, type VariantKey, WCAG_AAA_LARGE, WCAG_AAA_NORMAL, WCAG_AA_LARGE, WCAG_AA_NORMAL, WCAG_NON_TEXT_AA, auditContrast, checkDSContrast, checkHexContrast, cn, composeRefs, contrastRatio, dsAttr, dsColorVar, dsDataAttrs, dsStateAttr, dsVar, focusRingClassList, focusRingClasses, focusRingCompactClassList, focusRingCompactClasses, focusRingGroupRingClasses, focusRingGroupTriggerClasses, focusRingInsetClassList, focusRingInsetClasses, focusRingVariantOverrides, focusWithinRingClassList, focusWithinRingClasses, meetsAA, meetsAAA, meetsNonTextAA, mergeSlots, noop, parseHex, parseRGBString, relativeLuminance, toRGBString, typedKeys };
