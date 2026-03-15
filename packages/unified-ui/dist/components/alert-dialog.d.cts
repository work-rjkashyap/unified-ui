import * as react from 'react';
import { ReactNode, ComponentPropsWithoutRef } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { AlertDialog as AlertDialog$1 } from 'radix-ui';

interface AlertDialogProps extends React.ComponentPropsWithoutRef<typeof AlertDialog$1.Root> {
    children: ReactNode;
}
declare function AlertDialog({ children, open: controlledOpen, onOpenChange, defaultOpen, ...rest }: AlertDialogProps): react_jsx_runtime.JSX.Element;
declare namespace AlertDialog {
    var displayName: string;
}
declare const AlertDialogTrigger: react.ForwardRefExoticComponent<AlertDialog$1.AlertDialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const AlertDialogPortal: react.FC<AlertDialog$1.AlertDialogPortalProps>;
interface AlertDialogOverlayProps extends ComponentPropsWithoutRef<typeof AlertDialog$1.Overlay> {
    className?: string;
}
declare const AlertDialogOverlay: react.ForwardRefExoticComponent<AlertDialogOverlayProps & react.RefAttributes<HTMLDivElement>>;
interface AlertDialogContentProps extends ComponentPropsWithoutRef<typeof AlertDialog$1.Content> {
    className?: string;
    children?: ReactNode;
}
declare const AlertDialogContent: react.ForwardRefExoticComponent<AlertDialogContentProps & react.RefAttributes<HTMLDivElement>>;
interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: ReactNode;
}
declare function AlertDialogHeader({ className, children, ...rest }: AlertDialogHeaderProps): react_jsx_runtime.JSX.Element;
declare namespace AlertDialogHeader {
    var displayName: string;
}
interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: ReactNode;
}
declare function AlertDialogFooter({ className, children, ...rest }: AlertDialogFooterProps): react_jsx_runtime.JSX.Element;
declare namespace AlertDialogFooter {
    var displayName: string;
}
interface AlertDialogTitleProps extends ComponentPropsWithoutRef<typeof AlertDialog$1.Title> {
    className?: string;
    children?: ReactNode;
}
declare const AlertDialogTitle: react.ForwardRefExoticComponent<AlertDialogTitleProps & react.RefAttributes<HTMLHeadingElement>>;
interface AlertDialogDescriptionProps extends ComponentPropsWithoutRef<typeof AlertDialog$1.Description> {
    className?: string;
    children?: ReactNode;
}
declare const AlertDialogDescription: react.ForwardRefExoticComponent<AlertDialogDescriptionProps & react.RefAttributes<HTMLParagraphElement>>;
interface AlertDialogActionProps extends ComponentPropsWithoutRef<typeof AlertDialog$1.Action> {
    className?: string;
    children?: ReactNode;
}
declare const AlertDialogAction: react.ForwardRefExoticComponent<AlertDialogActionProps & react.RefAttributes<HTMLButtonElement>>;
interface AlertDialogCancelProps extends ComponentPropsWithoutRef<typeof AlertDialog$1.Cancel> {
    className?: string;
    children?: ReactNode;
}
declare const AlertDialogCancel: react.ForwardRefExoticComponent<AlertDialogCancelProps & react.RefAttributes<HTMLButtonElement>>;

export { AlertDialog, AlertDialogAction, type AlertDialogActionProps, AlertDialogCancel, type AlertDialogCancelProps, AlertDialogContent, type AlertDialogContentProps, AlertDialogDescription, type AlertDialogDescriptionProps, AlertDialogFooter, type AlertDialogFooterProps, AlertDialogHeader, type AlertDialogHeaderProps, AlertDialogOverlay, type AlertDialogOverlayProps, AlertDialogPortal, type AlertDialogProps, AlertDialogTitle, type AlertDialogTitleProps, AlertDialogTrigger };
