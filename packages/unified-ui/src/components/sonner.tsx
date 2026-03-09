"use client";

// ============================================================================
// Unified UI — Sonner Component
// ============================================================================
// Pre-styled toast notification system built on the `sonner` library.
// Provides Unified UI design token integration so toasts match the DS.
//
// Features:
//   - Built on `sonner` for stacked toast management
//   - Automatically syncs with page theme (light/dark/system)
//   - Pre-styled with design system tokens
//   - Supports all sonner toast types: success, error, warning, info, loading
//   - Promise-based toasts for async operations
//   - Custom toast rendering via JSX
//   - Action and cancel button support
//   - Configurable position, duration, max visible count
//   - Accessible: keyboard dismissible
//   - Respects prefers-reduced-motion
//
// Usage:
//   import { SonnerToaster, toast } from "@work-rjkashyap/unified-ui/components";
//
//   <SonnerToaster position="bottom-right" />
//   toast.success("Saved!");
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { Toaster as SonnerPrimitive, toast } from "sonner";

// ---------------------------------------------------------------------------
// Re-export toast function
// ---------------------------------------------------------------------------

export { toast };

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SonnerPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface SonnerToasterProps
  extends Omit<ComponentPropsWithoutRef<"div">, "dir"> {
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

// ---------------------------------------------------------------------------
// Default class names — apply DS tokens to sonner elements
// ---------------------------------------------------------------------------

const defaultClassNames: Record<string, string> = {
  toast: cn(
    "group",
    "!rounded-lg !border !border-border !shadow-lg",
    "!bg-background !text-foreground",
    "!font-sans !text-sm",
  ),
  title: "!font-medium !text-foreground",
  description: "!text-muted-foreground !text-[13px]",
  actionButton: cn(
    "!bg-primary !text-primary-foreground",
    "!rounded-md !px-3 !py-1.5 !text-xs !font-medium",
    "hover:!bg-primary-hover",
  ),
  cancelButton: cn(
    "!bg-secondary !text-secondary-foreground",
    "!rounded-md !px-3 !py-1.5 !text-xs !font-medium",
    "hover:!bg-secondary-hover",
  ),
  closeButton: cn(
    "!bg-background !text-muted-foreground !border-border",
    "hover:!bg-muted hover:!text-foreground",
  ),
  success: "!border-success/30 !bg-success/5 [&_[data-title]]:!text-success",
  error: "!border-danger/30 !bg-danger/5 [&_[data-title]]:!text-danger",
  warning: "!border-warning/30 !bg-warning/5 [&_[data-title]]:!text-warning",
  info: "!border-info/30 !bg-info/5 [&_[data-title]]:!text-info",
};

// ---------------------------------------------------------------------------
// SonnerToaster
// ---------------------------------------------------------------------------

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
export const SonnerToaster = forwardRef<HTMLDivElement, SonnerToasterProps>(
  function SonnerToaster(
    {
      position = "bottom-right",
      richColors = true,
      closeButton = true,
      duration = 4000,
      visibleToasts = 3,
      expand = true,
      theme = "system",
      offset = 16,
      gap = 14,
      dir = "auto",
      className,
      toastOptions,
      ...rest
    },
    ref,
  ) {
    // Merge user classNames with defaults
    const mergedClassNames: Record<string, string> = {};
    for (const key of Object.keys(defaultClassNames)) {
      mergedClassNames[key] = cn(
        defaultClassNames[key],
        toastOptions?.classNames?.[key],
      );
    }

    return (
      <div
        ref={ref}
        data-ds=""
        data-ds-component="sonner"
        className={cn(className)}
        {...rest}
      >
        <SonnerPrimitive
          position={position}
          richColors={richColors}
          closeButton={closeButton}
          duration={duration}
          visibleToasts={visibleToasts}
          expand={expand}
          theme={theme}
          offset={offset}
          gap={gap}
          dir={dir}
          toastOptions={{
            className: toastOptions?.className,
            descriptionClassName: toastOptions?.descriptionClassName,
            style: toastOptions?.style,
            classNames: mergedClassNames,
          }}
        />
      </div>
    );
  },
);
SonnerToaster.displayName = "SonnerToaster";

// Re-export types
export type { ExternalToast as SonnerToastOptions } from "sonner";
