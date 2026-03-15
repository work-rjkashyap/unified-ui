import * as react from 'react';
import { ReactNode, HTMLAttributes, ComponentPropsWithoutRef } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { Drawer as Drawer$1 } from 'vaul';

declare const drawerContentVariants: (props?: ({
    size?: "sm" | "md" | "lg" | "full" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type DrawerSize = "sm" | "md" | "lg" | "full";
interface DrawerProps {
    children: ReactNode;
    /**
     * Whether the drawer should scale the background content when open.
     * Requires `[vaul-drawer-wrapper]` attribute on your app wrapper element.
     * @default true
     */
    shouldScaleBackground?: boolean;
    /** Controlled open state. */
    open?: boolean;
    /** Callback when open state changes. */
    onOpenChange?: (open: boolean) => void;
    /** Whether the drawer starts open. */
    defaultOpen?: boolean;
    /** Whether to dismiss on outside click. @default true */
    dismissible?: boolean;
    /** Direction the drawer opens from. @default "bottom" */
    direction?: "top" | "bottom" | "left" | "right";
    /** Whether to nest inside another drawer. */
    nested?: boolean;
    /** Whether to block body scroll when drawer is open. @default true */
    modal?: boolean;
    /** Called when drawer is closed. */
    onClose?: () => void;
}
interface DrawerTriggerProps extends ComponentPropsWithoutRef<typeof Drawer$1.Trigger> {
    className?: string;
}
interface DrawerContentProps extends Omit<ComponentPropsWithoutRef<typeof Drawer$1.Content>, "asChild"> {
    /** Controls the maximum height of the drawer. @default "md" */
    size?: DrawerSize;
    /** Whether to show the drag handle at the top. @default true */
    showHandle?: boolean;
    /** Extra classes for the overlay backdrop. */
    overlayClassName?: string;
    className?: string;
    children: ReactNode;
}
interface DrawerHandleProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}
interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
}
interface DrawerBodyProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
}
interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
}
interface DrawerTitleProps extends ComponentPropsWithoutRef<typeof Drawer$1.Title> {
    className?: string;
    children: ReactNode;
}
interface DrawerDescriptionProps extends ComponentPropsWithoutRef<typeof Drawer$1.Description> {
    className?: string;
    children: ReactNode;
}
interface DrawerCloseProps extends ComponentPropsWithoutRef<typeof Drawer$1.Close> {
    className?: string;
}
/**
 * Drawer — a bottom sheet with drag-to-dismiss interaction.
 *
 * Wraps vaul's `Drawer.Root` with sensible defaults for the Unified UI
 * design system. Set `shouldScaleBackground` to control whether the
 * background content scales down when the drawer opens (requires the
 * `[vaul-drawer-wrapper]` attribute on your app wrapper).
 */
declare function Drawer({ shouldScaleBackground, children, ...rest }: DrawerProps): react_jsx_runtime.JSX.Element;
declare namespace Drawer {
    var displayName: string;
}
declare const DrawerTrigger: react.ForwardRefExoticComponent<DrawerTriggerProps & react.RefAttributes<HTMLButtonElement>>;
/**
 * A visual drag handle rendered at the top of the drawer content.
 * Provides a clear affordance that the drawer can be dragged to dismiss.
 */
declare function DrawerHandle({ className, ...rest }: DrawerHandleProps): react_jsx_runtime.JSX.Element;
declare namespace DrawerHandle {
    var displayName: string;
}
declare const DrawerContent: react.ForwardRefExoticComponent<DrawerContentProps & react.RefAttributes<HTMLDivElement>>;
declare function DrawerHeader({ className, children, ...rest }: DrawerHeaderProps): react_jsx_runtime.JSX.Element;
declare namespace DrawerHeader {
    var displayName: string;
}
declare function DrawerBody({ className, children, ...rest }: DrawerBodyProps): react_jsx_runtime.JSX.Element;
declare namespace DrawerBody {
    var displayName: string;
}
declare function DrawerFooter({ className, children, ...rest }: DrawerFooterProps): react_jsx_runtime.JSX.Element;
declare namespace DrawerFooter {
    var displayName: string;
}
declare const DrawerTitle: react.ForwardRefExoticComponent<DrawerTitleProps & react.RefAttributes<HTMLHeadingElement>>;
declare const DrawerDescription: react.ForwardRefExoticComponent<DrawerDescriptionProps & react.RefAttributes<HTMLParagraphElement>>;
declare const DrawerClose: react.ForwardRefExoticComponent<DrawerCloseProps & react.RefAttributes<HTMLButtonElement>>;

export { Drawer, DrawerBody, type DrawerBodyProps, DrawerClose, type DrawerCloseProps, DrawerContent, type DrawerContentProps, DrawerDescription, type DrawerDescriptionProps, DrawerFooter, type DrawerFooterProps, DrawerHandle, type DrawerHandleProps, DrawerHeader, type DrawerHeaderProps, type DrawerProps, type DrawerSize, DrawerTitle, type DrawerTitleProps, DrawerTrigger, type DrawerTriggerProps, drawerContentVariants };
