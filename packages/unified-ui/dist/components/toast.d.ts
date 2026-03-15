import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';

type ToastVariant = "default" | "success" | "warning" | "danger" | "info";
type ToastPosition = "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";
interface ToastAction {
    /** Label text for the action button. */
    label: string;
    /** Callback fired when the action button is clicked. */
    onClick: () => void;
}
interface ToastData {
    /** Unique ID for the toast instance. Auto-generated if not provided. */
    id: string;
    /** Semantic variant controlling color and icon. */
    variant: ToastVariant;
    /** Title text (short, bold). */
    title?: ReactNode;
    /** Description / body text. */
    description?: ReactNode;
    /** Auto-dismiss duration in milliseconds. 0 = no auto-dismiss. */
    duration: number;
    /** Optional action button. */
    action?: ToastAction;
    /** Timestamp when the toast was created. */
    createdAt: number;
}
interface ToastOptions {
    /** Title text. */
    title?: ReactNode;
    /** Description / body text. */
    description?: ReactNode;
    /** Auto-dismiss duration in milliseconds. @default 5000 */
    duration?: number;
    /** Optional action button. */
    action?: ToastAction;
    /** Custom toast ID (for deduplication). */
    id?: string;
}
interface ToastAPI {
    /** Show a default-styled toast. */
    toast: (messageOrOptions: string | ToastOptions) => string;
    /** Show a success toast. */
    success: (messageOrOptions: string | ToastOptions) => string;
    /** Show a warning toast. */
    warning: (messageOrOptions: string | ToastOptions) => string;
    /** Show a danger/error toast. */
    danger: (messageOrOptions: string | ToastOptions) => string;
    /** Show an info toast. */
    info: (messageOrOptions: string | ToastOptions) => string;
    /** Programmatically dismiss a specific toast by ID. */
    dismiss: (id: string) => void;
    /** Dismiss all toasts. */
    dismissAll: () => void;
}
interface ToastProviderProps {
    children: ReactNode;
    /**
     * Position of the toast container on screen.
     * @default "top-right"
     */
    position?: ToastPosition;
    /**
     * Maximum number of visible toasts. Excess toasts are queued.
     * @default 5
     */
    maxVisible?: number;
    /**
     * Default auto-dismiss duration in milliseconds.
     * Individual toasts can override this.
     * @default 5000
     */
    defaultDuration?: number;
    /**
     * Gap between toasts in pixels.
     * @default 8
     */
    gap?: number;
}
interface ToastItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The toast data to render. */
    toast: ToastData;
    /** Callback to dismiss this toast. */
    onDismiss: (id: string) => void;
    /** Whether the toast container is in a bottom position. */
    isBottom: boolean;
}
declare const toastVariants: (props?: ({
    variant?: "info" | "success" | "warning" | "danger" | "default" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
/**
 * ToastItem — a single toast notification.
 *
 * Handles auto-dismiss timing, pause-on-hover, close button, and
 * action button rendering.
 */
declare const ToastItem: react.ForwardRefExoticComponent<ToastItemProps & react.RefAttributes<HTMLDivElement>>;
/**
 * ToastProvider — wraps your application and provides the toast context.
 *
 * Renders a portal-mounted toast container at the specified viewport
 * position. Child components access the toast API via `useToast()`.
 *
 * @example
 * ```tsx
 * // In your root layout or providers
 * <ToastProvider position="top-right" maxVisible={5}>
 *   <App />
 * </ToastProvider>
 *
 * // In any child component
 * function MyComponent() {
 *   const toast = useToast();
 *
 *   return (
 *     <button onClick={() => toast.success("Saved!")}>
 *       Save
 *     </button>
 *   );
 * }
 * ```
 */
declare function ToastProvider({ children, position, maxVisible, defaultDuration, gap, }: ToastProviderProps): react_jsx_runtime.JSX.Element;
declare namespace ToastProvider {
    var displayName: string;
}
/**
 * useToast — imperative hook for showing toast notifications.
 *
 * Must be used within a `<ToastProvider>`.
 *
 * @example
 * ```tsx
 * const toast = useToast();
 *
 * // Simple string message
 * toast.success("File uploaded");
 * toast.danger("Upload failed");
 * toast.info("Processing...");
 * toast.warning("Disk space low");
 *
 * // With options
 * toast.success({
 *   title: "Payment received",
 *   description: "Order #12345 has been confirmed.",
 *   duration: 8000,
 * });
 *
 * // With action button
 * toast.info({
 *   title: "New version available",
 *   description: "v2.1.0 is ready to install.",
 *   action: { label: "Update now", onClick: () => doUpdate() },
 * });
 *
 * // Dismiss programmatically
 * const id = toast.info("Uploading...", { duration: 0 });
 * // ...later
 * toast.dismiss(id);
 *
 * // Dismiss all
 * toast.dismissAll();
 * ```
 */
declare function useToast(): ToastAPI;

export { type ToastAPI, type ToastAction, type ToastData, ToastItem, type ToastItemProps, type ToastOptions, type ToastPosition, ToastProvider, type ToastProviderProps, type ToastVariant, toastVariants, useToast };
