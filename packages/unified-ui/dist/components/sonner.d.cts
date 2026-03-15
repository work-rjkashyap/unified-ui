import * as react from 'react';
import { ComponentPropsWithoutRef } from 'react';
export { ExternalToast as SonnerToastOptions, toast } from 'sonner';

type SonnerPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
interface SonnerToasterProps extends Omit<ComponentPropsWithoutRef<"div">, "dir"> {
    /** @default "bottom-right" */
    position?: SonnerPosition;
    /** @default true */
    richColors?: boolean;
    /** @default true */
    closeButton?: boolean;
    /** @default 4000 */
    duration?: number;
    /** @default 3 */
    visibleToasts?: number;
    /** @default true */
    expand?: boolean;
    /** @default "system" */
    theme?: "light" | "dark" | "system";
    /** @default 16 */
    offset?: number | string;
    /** @default 14 */
    gap?: number;
    dir?: "ltr" | "rtl" | "auto";
    className?: string;
    toastOptions?: {
        className?: string;
        descriptionClassName?: string;
        style?: React.CSSProperties;
        classNames?: Partial<Record<string, string>>;
    };
}
/**
 * `SonnerToaster` — design-system-styled toast container.
 *
 * Place once in your root layout. Uses the `sonner` library under the hood
 * with Unified UI token styling applied automatically.
 *
 * @example
 * ```tsx
 * import { SonnerToaster, toast } from "@work-rjkashyap/unified-ui/components";
 *
 * // In layout:
 * <SonnerToaster />
 *
 * // Anywhere:
 * toast("Hello!");
 * toast.success("Saved!");
 * toast.error("Failed!");
 * toast.promise(saveData(), {
 *   loading: "Saving...",
 *   success: "Done!",
 *   error: "Error!",
 * });
 * ```
 */
declare const SonnerToaster: react.ForwardRefExoticComponent<SonnerToasterProps & react.RefAttributes<HTMLDivElement>>;

export { type SonnerPosition, SonnerToaster, type SonnerToasterProps };
