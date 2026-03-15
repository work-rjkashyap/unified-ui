"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "./alert-dialog";
function SpinnerIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: cn("animate-spin", className),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" })
    }
  );
}
function ConfirmDialog({
  open,
  onOpenChange,
  trigger,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
  loading = false,
  className,
  children
}) {
  const isDanger = variant === "danger";
  return /* @__PURE__ */ jsxs(AlertDialog, { open, onOpenChange, children: [
    trigger && /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsxs(
      AlertDialogContent,
      {
        className,
        "data-ds-component": "confirm-dialog",
        children: [
          /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsx(AlertDialogTitle, { children: title }),
            description && /* @__PURE__ */ jsx(AlertDialogDescription, { children: description })
          ] }),
          children && /* @__PURE__ */ jsx("div", { className: "py-2 text-sm text-foreground", children }),
          /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsx(AlertDialogCancel, { onClick: onCancel, disabled: loading, children: cancelLabel }),
            /* @__PURE__ */ jsxs(
              AlertDialogAction,
              {
                onClick: onConfirm,
                disabled: loading,
                className: cn(
                  isDanger && "bg-danger text-danger-foreground hover:bg-danger-hover active:bg-danger-active"
                ),
                children: [
                  loading && /* @__PURE__ */ jsx(SpinnerIcon, { className: "size-4" }),
                  confirmLabel
                ]
              }
            )
          ] })
        ]
      }
    )
  ] });
}
ConfirmDialog.displayName = "ConfirmDialog";
export {
  ConfirmDialog
};
