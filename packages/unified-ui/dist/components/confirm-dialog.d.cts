import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

type ConfirmDialogVariant = "default" | "danger";
interface ConfirmDialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: ReactNode;
    title?: ReactNode;
    description?: ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: ConfirmDialogVariant;
    onConfirm?: () => void;
    onCancel?: () => void;
    loading?: boolean;
    className?: string;
    children?: ReactNode;
}
declare function ConfirmDialog({ open, onOpenChange, trigger, title, description, confirmLabel, cancelLabel, variant, onConfirm, onCancel, loading, className, children, }: ConfirmDialogProps): react_jsx_runtime.JSX.Element;
declare namespace ConfirmDialog {
    var displayName: string;
}

export { ConfirmDialog, type ConfirmDialogProps, type ConfirmDialogVariant };
