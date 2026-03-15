import * as react from 'react';
import { ReactNode, ComponentPropsWithoutRef } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { Tooltip as Tooltip$1 } from 'radix-ui';

type TooltipSide = "top" | "right" | "bottom" | "left";
type TooltipAlign = "start" | "center" | "end";
interface TooltipProps {
    /**
     * The tooltip content. Can be a string or ReactNode.
     */
    content: ReactNode;
    /**
     * The trigger element. Must be a single React element that accepts a ref.
     */
    children: ReactNode;
    /**
     * The preferred side of the trigger to render the tooltip.
     * @default "top"
     */
    side?: TooltipSide;
    /**
     * Alignment of the tooltip relative to the trigger.
     * @default "center"
     */
    align?: TooltipAlign;
    /**
     * The distance in pixels from the trigger.
     * @default 6
     */
    sideOffset?: number;
    /**
     * Whether to show an arrow pointing to the trigger.
     * @default true
     */
    arrow?: boolean;
    /**
     * Maximum width of the tooltip content.
     * @default 220
     */
    maxWidth?: number;
    /**
     * Delay in ms before the tooltip opens.
     * @default 300
     */
    delayDuration?: number;
    /**
     * Delay in ms before the tooltip closes after leaving.
     * @default 0
     */
    skipDelayDuration?: number;
    /**
     * Whether the tooltip is open (controlled).
     */
    open?: boolean;
    /**
     * Callback when the open state changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * Additional CSS classes for the tooltip content element.
     */
    contentClassName?: string;
}
interface TooltipProviderProps extends ComponentPropsWithoutRef<typeof Tooltip$1.Provider> {
    children: ReactNode;
}
/**
 * TooltipProvider — wraps your application (or a subtree) to configure
 * shared tooltip behavior like delay duration.
 *
 * Should be placed near the root of your app, or around any section
 * that uses tooltips.
 *
 * @example
 * ```tsx
 * <TooltipProvider delayDuration={200}>
 *   <App />
 * </TooltipProvider>
 * ```
 */
declare function TooltipProvider({ children, delayDuration, skipDelayDuration, ...rest }: TooltipProviderProps): react_jsx_runtime.JSX.Element;
declare namespace TooltipProvider {
    var displayName: string;
}
/**
 * Tooltip — a small popup that displays informative text when hovering
 * or focusing on a trigger element.
 *
 * Built on Radix UI's Tooltip primitive for full accessibility. The tooltip
 * appears after a configurable delay and supports keyboard access.
 *
 * Accessibility:
 *   - Radix handles `role="tooltip"` and `aria-describedby` automatically
 *   - Opens on hover and focus, closes on blur and Escape
 *   - Keyboard accessible: focusable triggers show the tooltip
 *   - Content is announced by screen readers
 *
 * @example
 * ```tsx
 * // Basic usage (wrap app in TooltipProvider first)
 * <Tooltip content="Save your changes">
 *   <button>Save</button>
 * </Tooltip>
 *
 * // With side placement
 * <Tooltip content="More options" side="right">
 *   <button>⋮</button>
 * </Tooltip>
 *
 * // Without arrow
 * <Tooltip content="Delete" arrow={false}>
 *   <button>🗑️</button>
 * </Tooltip>
 *
 * // Custom max width
 * <Tooltip content="This is a longer tooltip that needs more space" maxWidth={300}>
 *   <span>Hover me</span>
 * </Tooltip>
 *
 * // Controlled
 * <Tooltip content="Info" open={isOpen} onOpenChange={setIsOpen}>
 *   <button>i</button>
 * </Tooltip>
 * ```
 */
declare const Tooltip: react.ForwardRefExoticComponent<TooltipProps & react.RefAttributes<HTMLButtonElement>>;

export { Tooltip, type TooltipAlign, type TooltipProps, TooltipProvider, type TooltipProviderProps, type TooltipSide };
