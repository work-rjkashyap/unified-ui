import * as react from 'react';
import { ReactNode, ComponentPropsWithoutRef } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import { Dialog } from 'radix-ui';

declare const sheetContentVariants: (props?: ({
    side?: "bottom" | "left" | "right" | "top" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SheetSide = "left" | "right" | "top" | "bottom";
type SheetSize = "sm" | "md" | "lg";
interface SheetProps extends Dialog.DialogProps {
    /** Sheet children (trigger + content). */
    children: ReactNode;
}
interface SheetTriggerProps extends ComponentPropsWithoutRef<typeof Dialog.Trigger> {
    /** Additional CSS classes. */
    className?: string;
}
interface SheetContentProps extends Omit<ComponentPropsWithoutRef<typeof Dialog.Content>, "asChild">, VariantProps<typeof sheetContentVariants> {
    /**
     * The side the sheet slides in from.
     * @default "right"
     */
    side?: SheetSide;
    /**
     * The width/height of the sheet panel.
     * @default "md"
     */
    size?: SheetSize;
    /**
     * Whether to show the default close button (X) in the top-right.
     * @default true
     */
    showClose?: boolean;
    /**
     * Additional CSS classes for the overlay backdrop.
     */
    overlayClassName?: string;
    /** Additional CSS classes for the content panel. */
    className?: string;
    /** The sheet body content. */
    children: ReactNode;
}
interface SheetHeaderProps {
    /** Additional CSS classes. */
    className?: string;
    children: ReactNode;
}
interface SheetFooterProps {
    /** Additional CSS classes. */
    className?: string;
    children: ReactNode;
}
interface SheetTitleProps extends ComponentPropsWithoutRef<typeof Dialog.Title> {
    /** Additional CSS classes. */
    className?: string;
    children: ReactNode;
}
interface SheetDescriptionProps extends ComponentPropsWithoutRef<typeof Dialog.Description> {
    /** Additional CSS classes. */
    className?: string;
    children: ReactNode;
}
interface SheetCloseProps extends ComponentPropsWithoutRef<typeof Dialog.Close> {
    /** Additional CSS classes. */
    className?: string;
}
/**
 * Sheet — a slide-in panel overlaying the main content.
 *
 * This is a thin wrapper around Radix UI's Dialog.Root.
 *
 * @example
 * ```tsx
 * <Sheet>
 *   <SheetTrigger asChild>
 *     <Button>Open</Button>
 *   </SheetTrigger>
 *   <SheetContent>Panel content</SheetContent>
 * </Sheet>
 * ```
 */
declare function Sheet({ children, open: controlledOpen, onOpenChange, defaultOpen, ...rest }: SheetProps): react_jsx_runtime.JSX.Element;
declare namespace Sheet {
    var displayName: string;
}
/**
 * SheetTrigger — the element that opens the sheet.
 *
 * Use `asChild` to compose with your own button/element.
 *
 * @example
 * ```tsx
 * <SheetTrigger asChild>
 *   <Button variant="secondary">Open Panel</Button>
 * </SheetTrigger>
 * ```
 */
declare const SheetTrigger: react.ForwardRefExoticComponent<SheetTriggerProps & react.RefAttributes<HTMLButtonElement>>;
/**
 * SheetContent — the sliding panel that appears over the page.
 *
 * Built on Radix UI Dialog.Content with the design system's token layer.
 * All colors, radii, spacing, shadows, and z-index come from CSS custom
 * properties defined in design-system.css.
 *
 * Accessibility:
 *   - Radix manages focus trap and restoration
 *   - Escape key closes the sheet
 *   - Overlay click closes the sheet
 *   - Proper ARIA attributes (dialog role)
 *   - Scroll lock on body while open
 *
 * @example
 * ```tsx
 * // Right-side sheet (default)
 * <SheetContent>
 *   <SheetHeader>
 *     <SheetTitle>Settings</SheetTitle>
 *     <SheetDescription>Manage your preferences.</SheetDescription>
 *   </SheetHeader>
 *   <div className="flex-1 overflow-y-auto py-4">
 *     Content here
 *   </div>
 *   <SheetFooter>
 *     <Button>Save Changes</Button>
 *   </SheetFooter>
 * </SheetContent>
 *
 * // Left-side navigation
 * <SheetContent side="left" size="sm">
 *   <nav>Navigation items</nav>
 * </SheetContent>
 *
 * // Bottom drawer
 * <SheetContent side="bottom" size="sm">
 *   <p>Bottom sheet content</p>
 * </SheetContent>
 * ```
 */
declare const SheetContent: react.ForwardRefExoticComponent<SheetContentProps & react.RefAttributes<HTMLDivElement>>;
/**
 * SheetHeader — layout component for the sheet title and description.
 *
 * @example
 * ```tsx
 * <SheetHeader>
 *   <SheetTitle>Edit Profile</SheetTitle>
 *   <SheetDescription>Make changes to your profile.</SheetDescription>
 * </SheetHeader>
 * ```
 */
declare function SheetHeader({ className, children }: SheetHeaderProps): react_jsx_runtime.JSX.Element;
declare namespace SheetHeader {
    var displayName: string;
}
/**
 * SheetFooter — layout component for the sheet action buttons.
 *
 * @example
 * ```tsx
 * <SheetFooter>
 *   <SheetClose asChild>
 *     <Button variant="secondary">Cancel</Button>
 *   </SheetClose>
 *   <Button>Save</Button>
 * </SheetFooter>
 * ```
 */
declare function SheetFooter({ className, children }: SheetFooterProps): react_jsx_runtime.JSX.Element;
declare namespace SheetFooter {
    var displayName: string;
}
/**
 * SheetTitle — the title text of the sheet.
 *
 * Renders a Radix Dialog.Title for proper accessibility.
 *
 * @example
 * ```tsx
 * <SheetTitle>Edit Profile</SheetTitle>
 * ```
 */
declare const SheetTitle: react.ForwardRefExoticComponent<SheetTitleProps & react.RefAttributes<HTMLHeadingElement>>;
/**
 * SheetDescription — the description text below the sheet title.
 *
 * Renders a Radix Dialog.Description for proper accessibility.
 *
 * @example
 * ```tsx
 * <SheetDescription>
 *   Make changes to your profile here. Click save when you're done.
 * </SheetDescription>
 * ```
 */
declare const SheetDescription: react.ForwardRefExoticComponent<SheetDescriptionProps & react.RefAttributes<HTMLParagraphElement>>;
/**
 * SheetClose — a button that closes the sheet.
 *
 * Use `asChild` to compose with your own button component.
 *
 * @example
 * ```tsx
 * // As a standalone close button
 * <SheetClose>Close</SheetClose>
 *
 * // Composed with Button
 * <SheetClose asChild>
 *   <Button variant="secondary">Cancel</Button>
 * </SheetClose>
 * ```
 */
declare const SheetClose: react.ForwardRefExoticComponent<SheetCloseProps & react.RefAttributes<HTMLButtonElement>>;

export { Sheet, SheetClose, type SheetCloseProps, SheetContent, type SheetContentProps, SheetDescription, type SheetDescriptionProps, SheetFooter, type SheetFooterProps, SheetHeader, type SheetHeaderProps, type SheetProps, type SheetSide, type SheetSize, SheetTitle, type SheetTitleProps, SheetTrigger, type SheetTriggerProps, sheetContentVariants };
