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
var sonner_exports = {};
__export(sonner_exports, {
  SonnerToaster: () => SonnerToaster,
  toast: () => import_sonner.toast
});
module.exports = __toCommonJS(sonner_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_react = require("react");
var import_sonner = require("sonner");
const defaultClassNames = {
  toast: (0, import_cn.cn)(
    "group",
    "!rounded-lg !border !border-border !shadow-lg",
    "!bg-background !text-foreground",
    "!font-sans !text-sm"
  ),
  title: "!font-medium !text-foreground",
  description: "!text-muted-foreground !text-[13px]",
  actionButton: (0, import_cn.cn)(
    "!bg-primary !text-primary-foreground",
    "!rounded-md !px-3 !py-1.5 !text-xs !font-medium",
    "hover:!bg-primary-hover"
  ),
  cancelButton: (0, import_cn.cn)(
    "!bg-secondary !text-secondary-foreground",
    "!rounded-md !px-3 !py-1.5 !text-xs !font-medium",
    "hover:!bg-secondary-hover"
  ),
  closeButton: (0, import_cn.cn)(
    "!bg-background !text-muted-foreground !border-border",
    "hover:!bg-muted hover:!text-foreground"
  ),
  success: "!border-success/30 !bg-success/5 [&_[data-title]]:!text-success",
  error: "!border-danger/30 !bg-danger/5 [&_[data-title]]:!text-danger",
  warning: "!border-warning/30 !bg-warning/5 [&_[data-title]]:!text-warning",
  info: "!border-info/30 !bg-info/5 [&_[data-title]]:!text-info"
};
const SonnerToaster = (0, import_react.forwardRef)(
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
      mergedClassNames[key] = (0, import_cn.cn)(
        defaultClassNames[key],
        toastOptions?.classNames?.[key]
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref,
        "data-ds": "",
        "data-ds-component": "sonner",
        className: (0, import_cn.cn)(className),
        ...rest,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_sonner.Toaster,
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SonnerToaster,
  toast
});
