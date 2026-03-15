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
var checkbox_exports = {};
__export(checkbox_exports, {
  Checkbox: () => Checkbox,
  CheckboxGroup: () => CheckboxGroup,
  checkboxVariants: () => checkboxVariants,
  useCheckboxGroupContext: () => useCheckboxGroupContext
});
module.exports = __toCommonJS(checkbox_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
const checkboxVariants = (0, import_class_variance_authority.cva)(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "inline-flex shrink-0 items-center justify-center",
    // Shape
    "rounded-sm",
    // Border
    "border",
    // Colors — unchecked state
    "border-input bg-background",
    // Transition
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    // Focus ring — WCAG AA compliant
    import_focus_ring.focusRingClasses,
    // Hover
    "hover:border-border-strong",
    // Checked state
    "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground",
    "data-[state=checked]:hover:bg-primary-hover data-[state=checked]:hover:border-primary-hover",
    // Indeterminate state
    "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground",
    "data-[state=indeterminate]:hover:bg-primary-hover data-[state=indeterminate]:hover:border-primary-hover",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    // Cursor
    "cursor-pointer disabled:cursor-not-allowed",
    // Peer for label styling
    "peer"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — compact for dense UIs, tables, settings panels.
         * Box: 16px (size-4)
         */
        sm: "size-4",
        /**
         * Medium — default size for most forms.
         * Box: 18px (size-[18px])
         */
        md: "size-[18px]"
      },
      // -----------------------------------------------------------------
      // Error Variant
      // -----------------------------------------------------------------
      error: {
        true: [
          "border-danger",
          "data-[state=unchecked]:border-danger",
          "focus-visible:border-danger"
        ],
        false: ""
      }
    },
    defaultVariants: {
      size: "md",
      error: false
    }
  }
);
const iconSizeMap = {
  sm: "size-3",
  md: "size-3.5"
};
function CheckIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "3",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 6 9 17l-5-5" })
    }
  );
}
function IndeterminateIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "3",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 12h14" })
    }
  );
}
const Checkbox = (0, import_react.forwardRef)(function Checkbox2({
  size = "md",
  error = false,
  label,
  description,
  wrapperClassName,
  labelClassName,
  className,
  id: idProp,
  disabled,
  checked,
  "aria-invalid": ariaInvalid,
  ...rest
}, ref) {
  const generatedId = (0, import_react.useId)();
  const id = idProp ?? generatedId;
  const descriptionId = description ? `${id}-description` : void 0;
  const resolvedAriaInvalid = ariaInvalid !== void 0 ? ariaInvalid : error ? true : void 0;
  const labelTextClass = size === "sm" ? "text-xs" : "text-sm";
  const descriptionTextClass = "text-xs";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: (0, import_cn.cn)(
        "flex items-start gap-2",
        disabled && "cursor-not-allowed opacity-50",
        wrapperClassName
      ),
      "data-ds": "",
      "data-ds-component": "checkbox",
      "data-ds-size": size,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_radix_ui.Checkbox.Root,
          {
            ref,
            id,
            checked,
            disabled,
            "aria-invalid": resolvedAriaInvalid,
            "aria-describedby": descriptionId,
            className: (0, import_cn.cn)(
              checkboxVariants({ size, error }),
              // Slight top offset to align with label text baseline
              label && "mt-0.5",
              className
            ),
            ...rest,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_radix_ui.Checkbox.Indicator,
              {
                className: (0, import_cn.cn)(
                  "flex items-center justify-center",
                  // Animate the indicator
                  "data-[state=checked]:animate-in data-[state=checked]:zoom-in-75",
                  "data-[state=unchecked]:animate-out data-[state=unchecked]:zoom-out-75"
                ),
                children: checked === "indeterminate" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndeterminateIcon, { className: iconSizeMap[size] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, { className: iconSizeMap[size] })
              }
            )
          }
        ),
        (label || description) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-0.5 flex-1 min-w-0", children: [
          label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "label",
            {
              htmlFor: id,
              className: (0, import_cn.cn)(
                labelTextClass,
                "leading-5 font-medium",
                "text-foreground",
                "cursor-pointer select-none",
                "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                error && "text-danger",
                labelClassName
              ),
              children: label
            }
          ),
          description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              id: descriptionId,
              className: (0, import_cn.cn)(
                descriptionTextClass,
                "leading-4 text-muted-foreground"
              ),
              children: description
            }
          )
        ] })
      ]
    }
  );
});
Checkbox.displayName = "Checkbox";
const CheckboxGroupContext = (0, import_react.createContext)({});
function useCheckboxGroupContext() {
  return (0, import_react.useContext)(CheckboxGroupContext);
}
function CheckboxGroup({
  label,
  description,
  orientation = "vertical",
  size,
  disabled = false,
  error = false,
  errorMessage,
  children,
  className
}) {
  const groupId = (0, import_react.useId)();
  const labelId = label ? `${groupId}-label` : void 0;
  const descriptionId = description ? `${groupId}-description` : void 0;
  const errorId = errorMessage ? `${groupId}-error` : void 0;
  const contextValue = {
    size,
    disabled,
    error
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxGroupContext.Provider, { value: contextValue, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "fieldset",
    {
      "aria-labelledby": labelId,
      "aria-describedby": (0, import_cn.cn)(descriptionId ?? "", errorId ?? "").trim() || void 0,
      "aria-invalid": error || void 0,
      disabled,
      className: (0, import_cn.cn)("flex flex-col gap-2", className),
      "data-ds": "",
      "data-ds-component": "checkbox-group",
      children: [
        label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "legend",
          {
            id: labelId,
            className: (0, import_cn.cn)(
              "text-sm font-medium leading-5 text-foreground",
              error && "text-danger"
            ),
            children: label
          }
        ),
        description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "span",
          {
            id: descriptionId,
            className: "text-xs leading-4 text-muted-foreground",
            children: description
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: (0, import_cn.cn)(
              "flex",
              orientation === "vertical" ? "flex-col gap-2" : "flex-row gap-4"
            ),
            children
          }
        ),
        error && errorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "span",
          {
            id: errorId,
            className: "text-xs leading-4 text-danger",
            role: "alert",
            children: errorMessage
          }
        )
      ]
    }
  ) });
}
CheckboxGroup.displayName = "CheckboxGroup";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Checkbox,
  CheckboxGroup,
  checkboxVariants,
  useCheckboxGroupContext
});
