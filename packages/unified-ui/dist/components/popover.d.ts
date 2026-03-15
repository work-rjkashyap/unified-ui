import * as react from 'react';
import { ReactNode, ComponentPropsWithoutRef } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { Popover as Popover$1 } from 'radix-ui';

interface PopoverProps extends Popover$1.PopoverProps {
    /** The popover children (trigger + content). */
    children: ReactNode;
}
interface PopoverTriggerProps extends ComponentPropsWithoutRef<typeof Popover$1.Trigger> {
    /** Additional CSS classes. */
    className?: string;
}
interface PopoverContentProps extends ComponentPropsWithoutRef<typeof Popover$1.Content> {
    /** Additional CSS classes for the content element. */
    className?: string;
    /**
     * Whether to show a close button in the top-right corner.
     * @default false
     */
    showClose?: boolean;
    /**
     * Whether to render an arrow pointing to the trigger.
     * @default false
     */
    arrow?: boolean;
    /**
     * Additional CSS classes for the arrow element.
     */
    arrowClassName?: string;
    /** The popover body content. */
    children: ReactNode;
}
interface PopoverCloseProps extends ComponentPropsWithoutRef<typeof Popover$1.Close> {
    /** Additional CSS classes. */
    className?: string;
}
interface PopoverArrowProps extends ComponentPropsWithoutRef<typeof Popover$1.Arrow> {
    /** Additional CSS classes. */
    className?: string;
}
/**
 * Popover — root component that manages open/closed state.
 *
 * This is a thin wrapper around Radix UI's Popover.Root.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>Open</PopoverTrigger>
 *   <PopoverContent>Content here</PopoverContent>
 * </Popover>
 * ```
 */
declare function Popover({ children, ...rest }: PopoverProps): react_jsx_runtime.JSX.Element;
declare namespace Popover {
    var displayName: string;
}
/**
 * PopoverTrigger — the element that toggles the popover.
 *
 * Use `asChild` to compose with your own button/element.
 *
 * @example
 * ```tsx
 * <PopoverTrigger asChild>
 *   <Button variant="secondary">Open Popover</Button>
 * </PopoverTrigger>
 * ```
 */
declare const PopoverTrigger: react.ForwardRefExoticComponent<PopoverTriggerProps & react.RefAttributes<HTMLButtonElement>>;
/**
 * PopoverContent — the floating content panel of the popover.
 *
 * Built on Radix UI Popover.Content with the design system's token layer.
 * All colors, radii, spacing, shadows, and z-index come from CSS custom
 * properties defined in design-system.css.
 *
 * Accessibility:
 *   - Radix manages focus trap and restoration
 *   - Escape key closes the popover
 *   - Outside click dismisses (configurable via Radix props)
 *   - Proper ARIA attributes applied by Radix
 *
 * @example
 * ```tsx
 * // Basic content
 * <PopoverContent>
 *   <p>Hello world</p>
 * </PopoverContent>
 *
 * // With close button and arrow
 * <PopoverContent showClose arrow side="top" align="center">
 *   <h3>Settings</h3>
 *   <p>Adjust your preferences here.</p>
 * </PopoverContent>
 *
 * // Custom side and alignment
 * <PopoverContent side="right" align="start" sideOffset={8}>
 *   <p>Right-aligned popover</p>
 * </PopoverContent>
 * ```
 */
declare const PopoverContent: react.ForwardRefExoticComponent<PopoverContentProps & react.RefAttributes<HTMLDivElement>>;
declare const PopoverClose: react.ForwardRefExoticComponent<PopoverCloseProps & react.RefAttributes<HTMLButtonElement>>;
declare const PopoverArrow: react.ForwardRefExoticComponent<PopoverArrowProps & react.RefAttributes<SVGSVGElement>>;

export { Popover, PopoverArrow, type PopoverArrowProps, PopoverClose, type PopoverCloseProps, PopoverContent, type PopoverContentProps, type PopoverProps, PopoverTrigger, type PopoverTriggerProps };
