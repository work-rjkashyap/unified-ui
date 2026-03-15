import { ClassValue } from 'clsx';

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
type AsProp<C extends React.ElementType = React.ElementType> = {
    as?: C;
};
/**
 * Extracts the props of the given element type, omitting keys that
 * the component itself defines (to prevent collisions).
 */
type PolymorphicProps<C extends React.ElementType, OwnProps = object> = OwnProps & AsProp<C> & Omit<React.ComponentPropsWithoutRef<C>, keyof OwnProps | "as">;
/**
 * Ref type for a polymorphic component.
 */
type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>["ref"];
/**
 * Full polymorphic component props including the ref.
 */
type PolymorphicPropsWithRef<C extends React.ElementType, OwnProps = object> = PolymorphicProps<C, OwnProps> & {
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

export { type AsProp, type PolymorphicProps, type PolymorphicPropsWithRef, type PolymorphicRef, type SlotClasses, cn, composeRefs, dsAttr, dsColorVar, dsStateAttr, dsVar, mergeSlots, noop, typedKeys };
