"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { forwardRef, useId } from "react";
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
  return /* @__PURE__ */ jsx("span", { className: "text-danger ml-0.5", "aria-hidden": "true", children: "*" });
}
const FormField = forwardRef(
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
    const autoId = useId();
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
    const labelElement = label ? /* @__PURE__ */ jsxs(
      "label",
      {
        htmlFor: fieldId,
        className: cn(
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
          required && /* @__PURE__ */ jsx(RequiredIndicator, {})
        ]
      }
    ) : null;
    const descriptionElement = description && !hasError ? /* @__PURE__ */ jsx(
      "span",
      {
        id: descriptionId,
        className: cn(
          descriptionSizeMap[size],
          "text-muted-foreground",
          disabled && "opacity-50",
          descriptionClassName
        ),
        children: description
      }
    ) : null;
    const errorElement = hasError ? /* @__PURE__ */ jsx(
      "span",
      {
        id: errorId,
        role: "alert",
        className: cn(
          errorSizeMap[size],
          "text-danger",
          disabled && "opacity-50",
          errorClassName
        ),
        children: error
      }
    ) : null;
    if (!isHorizontal) {
      return /* @__PURE__ */ jsxs(
        "div",
        {
          ref,
          className: cn("flex flex-col", gapSizeMap[size], className),
          "data-ds": "",
          "data-ds-component": "form-field",
          "data-ds-size": size,
          "data-ds-orientation": orientation,
          ...hasError ? { "data-ds-error": "" } : {},
          ...disabled ? { "data-ds-disabled": "" } : {},
          ...required ? { "data-ds-required": "" } : {},
          ...rest,
          children: [
            (labelElement || descriptionElement) && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5", children: [
              labelElement,
              descriptionElement
            ] }),
            /* @__PURE__ */ jsx("div", { className: cn(controlClassName), children: renderedChildren }),
            errorElement
          ]
        }
      );
    }
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn("flex flex-row items-start", gapSizeMap[size], className),
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
          /* @__PURE__ */ jsxs("div", { className: cn("flex flex-1 flex-col", gapSizeMap[size]), children: [
            /* @__PURE__ */ jsx("div", { className: cn(controlClassName), children: renderedChildren }),
            descriptionElement,
            errorElement
          ] })
        ]
      }
    );
  }
);
FormField.displayName = "FormField";
export {
  FormField
};
