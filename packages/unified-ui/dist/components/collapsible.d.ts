import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { Collapsible as Collapsible$1 } from 'radix-ui';

interface CollapsibleContextValue {
    open: boolean;
    contentId: string;
}
declare function useCollapsibleContext(): CollapsibleContextValue;
interface CollapsibleProps extends Omit<ComponentPropsWithoutRef<typeof Collapsible$1.Root>, "asChild"> {
    /**
     * Whether the collapsible is expanded.
     * When provided, the component is controlled.
     */
    open?: boolean;
    /**
     * Default open state for uncontrolled mode.
     * @default false
     */
    defaultOpen?: boolean;
    /**
     * Callback fired when the open state changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * Whether the collapsible is disabled.
     * When disabled, the trigger cannot be interacted with.
     * @default false
     */
    disabled?: boolean;
    /** Content to render inside the collapsible root. */
    children: ReactNode;
    /** Additional CSS classes to merge on the root element. */
    className?: string;
}
interface CollapsibleTriggerProps extends ComponentPropsWithoutRef<typeof Collapsible$1.Trigger> {
    /** Additional CSS classes to merge. */
    className?: string;
}
interface CollapsibleContentProps extends Omit<ComponentPropsWithoutRef<typeof Collapsible$1.Content>, "asChild" | "forceMount"> {
    /**
     * Duration of the expand/collapse animation in seconds.
     * @default 0.2
     */
    duration?: number;
    /**
     * Whether to force-mount the content in the DOM even when collapsed.
     * Useful for SEO or when you need to measure the content.
     * @default false
     */
    forceMount?: boolean;
    /** Additional CSS classes to merge on the content wrapper. */
    className?: string;
    /** Content to render inside the collapsible section. */
    children: ReactNode;
}
/**
 * Collapsible — an animated show/hide section.
 *
 * Built on Radix UI's Collapsible primitive for accessibility and Framer
 * Motion for smooth height animations. The root component manages the
 * open/closed state and provides context to child components.
 *
 * Accessibility:
 *   - Radix handles `aria-expanded` on the trigger
 *   - Radix handles `aria-controls` linking trigger → content
 *   - Keyboard: Space/Enter toggles the collapsible
 *   - Disabled state prevents interaction
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Collapsible>
 *   <CollapsibleTrigger asChild>
 *     <Button variant="ghost">Show more</Button>
 *   </CollapsibleTrigger>
 *   <CollapsibleContent>
 *     <p>Hidden content revealed on toggle.</p>
 *   </CollapsibleContent>
 * </Collapsible>
 *
 * // Controlled
 * <Collapsible open={isOpen} onOpenChange={setIsOpen}>
 *   <CollapsibleTrigger asChild>
 *     <Button variant="ghost">
 *       {isOpen ? "Hide" : "Show"} details
 *     </Button>
 *   </CollapsibleTrigger>
 *   <CollapsibleContent>
 *     <p>Controlled collapsible content.</p>
 *   </CollapsibleContent>
 * </Collapsible>
 *
 * // Default open
 * <Collapsible defaultOpen>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>
 *     <p>This content is visible by default.</p>
 *   </CollapsibleContent>
 * </Collapsible>
 * ```
 */
declare function Collapsible({ open: openProp, defaultOpen, onOpenChange, disabled, className, children, ...rest }: CollapsibleProps): react_jsx_runtime.JSX.Element;
declare namespace Collapsible {
    var displayName: string;
}
/**
 * CollapsibleTrigger — the button that toggles the collapsible open/closed.
 *
 * Use `asChild` to render your own trigger element (e.g., a Button)
 * instead of the default `<button>`.
 *
 * @example
 * ```tsx
 * <CollapsibleTrigger asChild>
 *   <Button variant="ghost" size="sm">
 *     <ChevronDown className="size-4" />
 *     Toggle section
 *   </Button>
 * </CollapsibleTrigger>
 * ```
 */
declare const CollapsibleTrigger: react.ForwardRefExoticComponent<CollapsibleTriggerProps & react.RefAttributes<HTMLButtonElement>>;
/**
 * CollapsibleContent — the content section that expands/collapses.
 *
 * Uses Framer Motion's AnimatePresence for enter/exit animations.
 * The content smoothly animates its height from 0 to auto when opening,
 * and from auto to 0 when closing. Overflow is hidden during the
 * animation to prevent content from being visible outside the bounds.
 *
 * The `forceMount` prop can be used to keep the content in the DOM
 * even when collapsed (useful for SEO or measurement purposes). When
 * force-mounted and collapsed, the content is visually hidden with
 * `height: 0` and `overflow: hidden`.
 *
 * @example
 * ```tsx
 * <CollapsibleContent>
 *   <div className="p-4">
 *     <p>This content animates in and out.</p>
 *   </div>
 * </CollapsibleContent>
 *
 * // Custom animation duration
 * <CollapsibleContent duration={0.3}>
 *   <p>Slower animation.</p>
 * </CollapsibleContent>
 *
 * // Force mounted (always in DOM)
 * <CollapsibleContent forceMount>
 *   <p>Always in the DOM, visually hidden when collapsed.</p>
 * </CollapsibleContent>
 * ```
 */
declare const CollapsibleContent: react.ForwardRefExoticComponent<CollapsibleContentProps & react.RefAttributes<HTMLDivElement>>;

export { Collapsible, CollapsibleContent, type CollapsibleContentProps, type CollapsibleProps, CollapsibleTrigger, type CollapsibleTriggerProps, useCollapsibleContext };
