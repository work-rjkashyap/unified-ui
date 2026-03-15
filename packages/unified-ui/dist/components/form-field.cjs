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
var form_field_exports = {};
__export(form_field_exports, {
  FormField: () => FormField
});
module.exports = __toCommonJS(form_field_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_react = require("react");
const labelSizeMap = {
  sm: "text-xs leading-4 font-medium",
  md: "text-sm leading-5 font-medium",
  lg: "text-sm leading-5 font-semibold"
};
const descriptionSizeMap = {
  sm: "text-[11px] leading-4",
  md: "text-xs leading-4",
  lg: "text-xs leading-4"
};
const errorSizeMap = {
  sm: "text-[11px] leading-4",
  md: "text-xs leading-4",
  lg: "text-xs leading-4"
};
const gapSizeMap = {
  sm: "gap-1",
  md: "gap-1.5",
  lg: "gap-2"
};
const horizontalLabelWidthMap = {
  sm: "w-24 shrink-0",
  md: "w-32 shrink-0",
  lg: "w-40 shrink-0"
};
function RequiredIndicator() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-danger ml-0.5", "aria-hidden": "true", children: "*" });
}
const FormField = (0, import_react.forwardRef)(
  function FormField2({
    label,
    description,
    error,
    size = "md",
    orientation = "vertical",
    required = false,
    disabled = false,
    htmlFor: htmlForProp,
    labelClassName,
    descriptionClassName,
    errorClassName,
    controlClassName,
    children,
    className,
    ...rest
  }, ref) {
    const autoId = (0, import_react.useId)();
    const fieldId = htmlForProp ?? autoId;
    const descriptionId = description ? `${fieldId}-description` : void 0;
    const errorId = error ? `${fieldId}-error` : void 0;
    const hasError = !!error;
    const ariaDescribedBy = hasError ? errorId : descriptionId ? descriptionId : void 0;
    const controlProps = {
      id: fieldId,
      ...ariaDescribedBy ? { "aria-describedby": ariaDescribedBy } : {},
      ...hasError ? { "aria-invalid": true } : {},
      ...required ? { "aria-required": true } : {},
      ...disabled ? { disabled: true } : {}
    };
    const renderedChildren = typeof children === "function" ? children(controlProps) : children;
    const isHorizontal = orientation === "horizontal";
    const labelElement = label ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "label",
      {
        htmlFor: fieldId,
        className: (0, import_cn.cn)(
          labelSizeMap[size],
          "text-foreground",
          "select-none",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "cursor-pointer",
          isHorizontal && horizontalLabelWidthMap[size],
          isHorizontal && "pt-2",
          // Align with control baseline
          labelClassName
        ),
        children: [
          label,
          required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequiredIndicator, {})
        ]
      }
    ) : null;
    const descriptionElement = description && !hasError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "span",
      {
        id: descriptionId,
        className: (0, import_cn.cn)(
          descriptionSizeMap[size],
          "text-muted-foreground",
          disabled && "opacity-50",
          descriptionClassName
        ),
        children: description
      }
    ) : null;
    const errorElement = hasError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "span",
      {
        id: errorId,
        role: "alert",
        className: (0, import_cn.cn)(
          errorSizeMap[size],
          "text-danger",
          disabled && "opacity-50",
          errorClassName
        ),
        children: error
      }
    ) : null;
    if (!isHorizontal) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          ref,
          className: (0, import_cn.cn)("flex flex-col", gapSizeMap[size], className),
          "data-ds": "",
          "data-ds-component": "form-field",
          "data-ds-size": size,
          "data-ds-orientation": orientation,
          ...hasError ? { "data-ds-error": "" } : {},
          ...disabled ? { "data-ds-disabled": "" } : {},
          ...required ? { "data-ds-required": "" } : {},
          ...rest,
          children: [
            (labelElement || descriptionElement) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-0.5", children: [
              labelElement,
              descriptionElement
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: (0, import_cn.cn)(controlClassName), children: renderedChildren }),
            errorElement
          ]
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref,
        className: (0, import_cn.cn)("flex flex-row items-start", gapSizeMap[size], className),
        "data-ds": "",
        "data-ds-component": "form-field",
        "data-ds-size": size,
        "data-ds-orientation": orientation,
        ...hasError ? { "data-ds-error": "" } : {},
        ...disabled ? { "data-ds-disabled": "" } : {},
        ...required ? { "data-ds-required": "" } : {},
        ...rest,
        children: [
          labelElement,
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: (0, import_cn.cn)("flex flex-1 flex-col", gapSizeMap[size]), children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: (0, import_cn.cn)(controlClassName), children: renderedChildren }),
            descriptionElement,
            errorElement
          ] })
        ]
      }
    );
  }
);
FormField.displayName = "FormField";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FormField
});
