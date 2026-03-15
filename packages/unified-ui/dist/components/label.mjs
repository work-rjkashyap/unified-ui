"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { cva } from "class-variance-authority";
import { Label as LabelPrimitive } from "radix-ui";
import { forwardRef } from "react";
const labelVariants = cva(
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
  return /* @__PURE__ */ jsx("span", { className: cn("text-danger ml-0.5", className), "aria-hidden": "true", children: "*" });
}
const Label = forwardRef(function Label2({
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
  const labelElement = /* @__PURE__ */ jsxs(
    LabelPrimitive.Root,
    {
      ref,
      className: cn(
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
        required && /* @__PURE__ */ jsx(RequiredIndicator, {})
      ]
    }
  );
  if (!description) {
    return labelElement;
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("flex flex-col gap-1", wrapperClassName),
      "data-ds": "",
      "data-ds-component": "label-group",
      children: [
        labelElement,
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
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
export {
  Label,
  labelVariants
};
