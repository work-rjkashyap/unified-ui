import * as react from 'react';
import { ReactNode, HTMLAttributes, ComponentPropsWithoutRef } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { Dialog as Dialog$1 } from 'radix-ui';

/**
 * CVA variants for DialogContent sizing.
 * Animation is handled by Framer Motion (overlayBackdrop + modalContent presets),
 * so no CSS animation classes are included here.
 */
declare const dialogContentVariants: (props?: ({
    size?: "sm" | "md" | "lg" | "full" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type DialogSize = "sm" | "md" | "lg" | "full";
interface DialogProps extends Dialog$1.DialogProps {
    children: ReactNode;
}
interface DialogTriggerProps extends ComponentPropsWithoutRef<typeof Dialog$1.Trigger> {
    className?: string;
}
interface DialogContentProps extends Omit<ComponentPropsWithoutRef<typeof Dialog$1.Content>, "asChild"> {
    size?: DialogSize;
    showClose?: boolean;
    overlayClassName?: string;
    className?: string;
    children: ReactNode;
}
interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
}
interface DialogBodyProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
}
interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
}
interface DialogTitleProps extends ComponentPropsWithoutRef<typeof Dialog$1.Title> {
    className?: string;
    children: ReactNode;
}
interface DialogDescriptionProps extends ComponentPropsWithoutRef<typeof Dialog$1.Description> {
    className?: string;
    children: ReactNode;
}
interface DialogCloseProps extends ComponentPropsWithoutRef<typeof Dialog$1.Close> {
    className?: string;
}
declare function Dialog({ children, open: controlledOpen, onOpenChange, defaultOpen, ...rest }: DialogProps): react_jsx_runtime.JSX.Element;
declare namespace Dialog {
    var displayName: string;
}
declare const DialogTrigger: react.ForwardRefExoticComponent<DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const DialogContent: react.ForwardRefExoticComponent<DialogContentProps & react.RefAttributes<HTMLDivElement>>;
declare function DialogHeader({ className, children, ...rest }: DialogHeaderProps): react_jsx_runtime.JSX.Element;
declare namespace DialogHeader {
    var displayName: string;
}
declare function DialogBody({ className, children, ...rest }: DialogBodyProps): react_jsx_runtime.JSX.Element;
declare namespace DialogBody {
    var displayName: string;
}
declare function DialogFooter({ className, children, ...rest }: DialogFooterProps): react_jsx_runtime.JSX.Element;
declare namespace DialogFooter {
    var displayName: string;
}
declare const DialogTitle: react.ForwardRefExoticComponent<DialogTitleProps & react.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: react.ForwardRefExoticComponent<DialogDescriptionProps & react.RefAttributes<HTMLParagraphElement>>;
declare const DialogClose: react.ForwardRefExoticComponent<DialogCloseProps & react.RefAttributes<HTMLButtonElement>>;

export { Dialog, DialogBody, type DialogBodyProps, DialogClose, type DialogCloseProps, DialogContent, type DialogContentProps, DialogDescription, type DialogDescriptionProps, DialogFooter, type DialogFooterProps, DialogHeader, type DialogHeaderProps, type DialogProps, type DialogSize, DialogTitle, type DialogTitleProps, DialogTrigger, type DialogTriggerProps, dialogContentVariants };
