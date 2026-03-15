"use strict";
"use client";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var confirm_dialog_exports = {};
__export(confirm_dialog_exports, {
  ConfirmDialog: () => ConfirmDialog
});
module.exports = __toCommonJS(confirm_dialog_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_alert_dialog = require("./alert-dialog");
function SpinnerIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      className: (0, import_cn.cn)("animate-spin", className),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" })
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_alert_dialog.AlertDialog, { open, onOpenChange, children: [
    trigger && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_alert_dialog.AlertDialogTrigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      import_alert_dialog.AlertDialogContent,
      {
        className,
        "data-ds-component": "confirm-dialog",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_alert_dialog.AlertDialogHeader, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_alert_dialog.AlertDialogTitle, { children: title }),
            description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_alert_dialog.AlertDialogDescription, { children: description })
          ] }),
          children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "py-2 text-sm text-foreground", children }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_alert_dialog.AlertDialogFooter, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_alert_dialog.AlertDialogCancel, { onClick: onCancel, disabled: loading, children: cancelLabel }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              import_alert_dialog.AlertDialogAction,
              {
                onClick: onConfirm,
                disabled: loading,
                className: (0, import_cn.cn)(
                  isDanger && "bg-danger text-danger-foreground hover:bg-danger-hover active:bg-danger-active"
                ),
                children: [
                  loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinnerIcon, { className: "size-4" }),
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConfirmDialog
});
