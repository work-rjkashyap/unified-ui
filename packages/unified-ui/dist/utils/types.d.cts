import { ReactNode, ReactElement, ElementType, ComponentPropsWithoutRef, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes, ComponentPropsWithRef } from 'react';

/**
 * Extracts the `as` prop from a set of props.
 *
 * @template Default - The default element type when `as` is not specified.
 */
type AsProp<_Default extends ElementType = "div"> = {
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
 * The complete prop type for a polymorphic component that supports `ref`.
 * Use this when your component is wrapped in `React.forwardRef`.
 *
 * @template OwnProps - The component's own prop interface.
 * @template E - The element type (from `as` prop or default).
 */
type PolymorphicPropsWithRef<OwnProps, E extends ElementType> = AsProp<E> & MergedProps<OwnProps, E> & {
    ref?: PolymorphicRef<E>;
};
/**
 * Extracts the correct ref type for a given element type.
 *
 * @template E - The element type.
 */
type PolymorphicRef<E extends ElementType> = ComponentPropsWithRef<E>["ref"];
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
 * Generates a data attribute for component state (e.g. active, loading).
 * Use this for styling hooks that don't have native HTML equivalents.
 *
 * @param state - The state name (e.g. "loading", "active", "expanded").
 * @param active - Whether the state is currently active.
 *
 * @example
 * ```tsx
 * <button {...dsStateAttr("loading", isLoading)}>
 * // Renders: <button data-ds-loading="true"> (when isLoading is true)
 * // Renders: <button> (when isLoading is false — attribute omitted)
 * ```
 */
declare function dsStateAttr(state: string, active: boolean): Record<string, string> | Record<string, never>;
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

export { type AsProp, type ChildrenProps, type ComponentIntent, type ComponentSize, type Defined, type MergedProps, type OptionalChildrenProps, type PartialExcept, type PolymorphicComponent, type PolymorphicProps, type PolymorphicPropsWithRef, type PolymorphicRef, type RenderChildrenProps, type RequireKeys, type SlotConfig, type SlotDefinition, type SlotRenderFn, type Slots, type VariantKey, dsDataAttrs, dsStateAttr };
