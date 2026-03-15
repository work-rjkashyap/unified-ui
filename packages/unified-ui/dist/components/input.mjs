"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn, composeRefs } from "../utils/cn";
import {
  focusRingClasses,
  focusRingInsetClasses
} from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import { forwardRef, useCallback, useRef } from "react";
const inputVariants = cva(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "flex w-full",
    // Typography
    "text-sm leading-5",
    // Shape
    "rounded-md",
    // Border
    "border",
    // Colors
    "bg-background text-input-foreground",
    "placeholder:text-input-placeholder",
    // Transition
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    // Focus ring — WCAG AA compliant, visible on keyboard navigation only
    focusRingClasses,
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled-foreground",
    // Read-only
    "read-only:bg-muted read-only:cursor-default",
    // File input styling
    "file:border-0 file:bg-transparent file:text-sm file:font-medium"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Visual Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Default — standard input with muted border.
         */
        default: [
          "border-input",
          "hover:border-border-strong",
          "focus-visible:border-border-strong"
        ],
        /**
         * Error — validation failed. Uses danger color.
         */
        error: [
          "border-danger",
          "text-foreground",
          "focus-visible:border-danger",
          "placeholder:text-input-placeholder"
        ],
        /**
         * Success — validation passed. Uses success color.
         */
        success: [
          "border-success",
          "text-foreground",
          "focus-visible:border-success",
          "placeholder:text-input-placeholder"
        ]
      },
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — compact for dense UIs, tables, toolbars.
         * Height: 32px (h-8)
         */
        sm: "h-8 px-2.5 text-xs",
        /**
         * Medium — default size for most inputs.
         * Height: var(--ds-control-height)
         */
        md: "h-(--ds-control-height) px-3 text-sm",
        /**
         * Large — prominent inputs for hero sections, forms.
         * Height: 40px (h-10)
         */
        lg: "h-10 px-3.5 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
const inputWrapperVariants = cva(["relative flex items-center w-full"], {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: ""
    }
  },
  defaultVariants: {
    size: "md"
  }
});
const iconSizeMap = {
  sm: "[&>svg]:size-3.5",
  md: "[&>svg]:size-4",
  lg: "[&>svg]:size-4"
};
const iconPaddingLeftMap = {
  sm: "pl-7",
  md: "pl-9",
  lg: "pl-10"
};
const iconPaddingRightMap = {
  sm: "pr-7",
  md: "pr-9",
  lg: "pr-10"
};
const iconLeftPositionMap = {
  sm: "left-2",
  md: "left-3",
  lg: "left-3.5"
};
const iconRightPositionMap = {
  sm: "right-2",
  md: "right-3",
  lg: "right-3.5"
};
function ClearButton({
  size,
  onClick
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick,
      className: cn(
        "absolute flex items-center justify-center",
        "text-muted-foreground hover:text-foreground",
        "transition-colors duration-fast",
        focusRingInsetClasses,
        "rounded-sm",
        iconRightPositionMap[size],
        iconSizeMap[size]
      ),
      "aria-label": "Clear input",
      tabIndex: -1,
      children: /* @__PURE__ */ jsxs(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: size === "sm" ? "size-3.5" : "size-4",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsx("path", { d: "M18 6 6 18" }),
            /* @__PURE__ */ jsx("path", { d: "m6 6 12 12" })
          ]
        }
      )
    }
  );
}
const Input = forwardRef(function Input2({
  variant = "default",
  size = "md",
  iconLeft,
  iconRight,
  clearable = false,
  onClear,
  wrapperClassName,
  className,
  disabled,
  readOnly,
  value,
  defaultValue,
  "aria-invalid": ariaInvalid,
  ...rest
}, ref) {
  const internalRef = useRef(null);
  const hasIcons = !!iconLeft || !!iconRight || clearable;
  const showClear = clearable && !disabled && !readOnly && (value !== void 0 ? String(value).length > 0 : false);
  const handleClear = useCallback(() => {
    if (onClear) {
      onClear();
    } else if (internalRef.current) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(internalRef.current, "");
        internalRef.current.dispatchEvent(
          new Event("input", { bubbles: true })
        );
      }
    }
    internalRef.current?.focus();
  }, [onClear]);
  const resolvedAriaInvalid = ariaInvalid !== void 0 ? ariaInvalid : variant === "error" ? true : void 0;
  const inputClasses = cn(
    inputVariants({ variant, size }),
    iconLeft && iconPaddingLeftMap[size],
    (iconRight || showClear) && iconPaddingRightMap[size],
    className
  );
  if (!hasIcons) {
    return /* @__PURE__ */ jsx(
      "input",
      {
        ref: composeRefs(internalRef, ref),
        disabled,
        readOnly,
        value,
        defaultValue,
        "aria-invalid": resolvedAriaInvalid,
        "aria-disabled": disabled || void 0,
        className: inputClasses,
        "data-ds": "",
        "data-ds-component": "input",
        "data-ds-variant": variant,
        "data-ds-size": size,
        ...rest
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(inputWrapperVariants({ size }), wrapperClassName),
      "data-ds": "",
      "data-ds-component": "input-wrapper",
      children: [
        iconLeft && /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "pointer-events-none absolute flex items-center justify-center",
              "text-muted-foreground",
              iconLeftPositionMap[size],
              iconSizeMap[size]
            ),
            "aria-hidden": "true",
            children: iconLeft
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: composeRefs(internalRef, ref),
            disabled,
            readOnly,
            value,
            defaultValue,
            "aria-invalid": resolvedAriaInvalid,
            "aria-disabled": disabled || void 0,
            className: inputClasses,
            "data-ds": "",
            "data-ds-component": "input",
            "data-ds-variant": variant,
            "data-ds-size": size,
            ...rest
          }
        ),
        showClear ? /* @__PURE__ */ jsx(ClearButton, { size, onClick: handleClear }) : iconRight && /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "pointer-events-none absolute flex items-center justify-center",
              "text-muted-foreground",
              iconRightPositionMap[size],
              iconSizeMap[size]
            ),
            "aria-hidden": "true",
            children: iconRight
          }
        )
      ]
    }
  );
});
Input.displayName = "Input";
export {
  Input,
  inputVariants
};
