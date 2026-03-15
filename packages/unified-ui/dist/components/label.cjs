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
var label_exports = {};
__export(label_exports, {
  Label: () => Label,
  labelVariants: () => labelVariants
});
module.exports = __toCommonJS(label_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_class_variance_authority = require("class-variance-authority");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
const labelVariants = (0, import_class_variance_authority.cva)(
  // Base styles — shared across all sizes
  [
    // Typography
    "font-medium leading-none text-foreground",
    // Prevent text selection on double-click
    "select-none",
    // Peer-disabled styling (when used with peer inputs)
    "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — for compact forms and dense UIs.
         * Font: 12px
         */
        sm: "text-xs leading-4",
        /**
         * Medium — default size for most labels.
         * Font: 14px
         */
        md: "text-sm leading-5",
        /**
         * Large — for prominent form fields.
         * Font: 14px with slightly more weight
         */
        lg: "text-sm leading-5 font-semibold"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
function RequiredIndicator({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: (0, import_cn.cn)("text-danger ml-0.5", className), "aria-hidden": "true", children: "*" });
}
const Label = (0, import_react.forwardRef)(function Label2({
  size = "md",
  required = false,
  disabled = false,
  description,
  descriptionClassName,
  wrapperClassName,
  className,
  children,
  ...rest
}, ref) {
  const descriptionSizeClass = size === "sm" ? "text-[11px] leading-4" : "text-xs leading-4";
  const labelElement = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.Label.Root,
    {
      ref,
      className: (0, import_cn.cn)(
        labelVariants({ size }),
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "cursor-pointer",
        className
      ),
      "data-ds": "",
      "data-ds-component": "label",
      "data-ds-size": size,
      ...disabled ? { "data-ds-disabled": "" } : {},
      ...required ? { "data-ds-required": "" } : {},
      ...rest,
      children: [
        children,
        required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequiredIndicator, {})
      ]
    }
  );
  if (!description) {
    return labelElement;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: (0, import_cn.cn)("flex flex-col gap-1", wrapperClassName),
      "data-ds": "",
      "data-ds-component": "label-group",
      children: [
        labelElement,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "span",
          {
            className: (0, import_cn.cn)(
              descriptionSizeClass,
              "text-muted-foreground",
              disabled && "opacity-50",
              descriptionClassName
            ),
            children: description
          }
        )
      ]
    }
  );
});
Label.displayName = "Label";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Label,
  labelVariants
});
