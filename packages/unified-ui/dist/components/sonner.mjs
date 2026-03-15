"use client";
import { jsx } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { forwardRef } from "react";
import { Toaster as SonnerPrimitive, toast } from "sonner";
const defaultClassNames = {
  toast: cn(
    "group",
    "!rounded-lg !border !border-border !shadow-lg",
    "!bg-background !text-foreground",
    "!font-sans !text-sm"
  ),
  title: "!font-medium !text-foreground",
  description: "!text-muted-foreground !text-[13px]",
  actionButton: cn(
    "!bg-primary !text-primary-foreground",
    "!rounded-md !px-3 !py-1.5 !text-xs !font-medium",
    "hover:!bg-primary-hover"
  ),
  cancelButton: cn(
    "!bg-secondary !text-secondary-foreground",
    "!rounded-md !px-3 !py-1.5 !text-xs !font-medium",
    "hover:!bg-secondary-hover"
  ),
  closeButton: cn(
    "!bg-background !text-muted-foreground !border-border",
    "hover:!bg-muted hover:!text-foreground"
  ),
  success: "!border-success/30 !bg-success/5 [&_[data-title]]:!text-success",
  error: "!border-danger/30 !bg-danger/5 [&_[data-title]]:!text-danger",
  warning: "!border-warning/30 !bg-warning/5 [&_[data-title]]:!text-warning",
  info: "!border-info/30 !bg-info/5 [&_[data-title]]:!text-info"
};
const SonnerToaster = forwardRef(
  function SonnerToaster2({
    position = "bottom-right",
    richColors = true,
    closeButton = true,
    duration = 4e3,
    visibleToasts = 3,
    expand = true,
    theme = "system",
    offset = 16,
    gap = 14,
    dir = "auto",
    className,
    toastOptions,
    ...rest
  }, ref) {
    const mergedClassNames = {};
    for (const key of Object.keys(defaultClassNames)) {
      mergedClassNames[key] = cn(
        defaultClassNames[key],
        toastOptions?.classNames?.[key]
      );
    }
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        "data-ds": "",
        "data-ds-component": "sonner",
        className: cn(className),
        ...rest,
        children: /* @__PURE__ */ jsx(
          SonnerPrimitive,
          {
            position,
            richColors,
            closeButton,
            duration,
            visibleToasts,
            expand,
            theme,
            offset,
            gap,
            dir,
            toastOptions: {
              className: toastOptions?.className,
              descriptionClassName: toastOptions?.descriptionClassName,
              style: toastOptions?.style,
              classNames: mergedClassNames
            }
          }
        )
      }
    );
  }
);
SonnerToaster.displayName = "SonnerToaster";
export {
  SonnerToaster,
  toast
};
