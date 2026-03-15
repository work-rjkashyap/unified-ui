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
var input_exports = {};
__export(input_exports, {
  Input: () => Input,
  inputVariants: () => inputVariants
});
module.exports = __toCommonJS(input_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_react = require("react");
const inputVariants = (0, import_class_variance_authority.cva)(
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
    import_focus_ring.focusRingClasses,
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
const inputWrapperVariants = (0, import_class_variance_authority.cva)(["relative flex items-center w-full"], {
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      type: "button",
      onClick,
      className: (0, import_cn.cn)(
        "absolute flex items-center justify-center",
        "text-muted-foreground hover:text-foreground",
        "transition-colors duration-fast",
        import_focus_ring.focusRingInsetClasses,
        "rounded-sm",
        iconRightPositionMap[size],
        iconSizeMap[size]
      ),
      "aria-label": "Clear input",
      tabIndex: -1,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 6 6 18" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m6 6 12 12" })
          ]
        }
      )
    }
  );
}
const Input = (0, import_react.forwardRef)(function Input2({
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
  const internalRef = (0, import_react.useRef)(null);
  const hasIcons = !!iconLeft || !!iconRight || clearable;
  const showClear = clearable && !disabled && !readOnly && (value !== void 0 ? String(value).length > 0 : false);
  const handleClear = (0, import_react.useCallback)(() => {
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
  const inputClasses = (0, import_cn.cn)(
    inputVariants({ variant, size }),
    iconLeft && iconPaddingLeftMap[size],
    (iconRight || showClear) && iconPaddingRightMap[size],
    className
  );
  if (!hasIcons) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "input",
      {
        ref: (0, import_cn.composeRefs)(internalRef, ref),
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: (0, import_cn.cn)(inputWrapperVariants({ size }), wrapperClassName),
      "data-ds": "",
      "data-ds-component": "input-wrapper",
      children: [
        iconLeft && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "span",
          {
            className: (0, import_cn.cn)(
              "pointer-events-none absolute flex items-center justify-center",
              "text-muted-foreground",
              iconLeftPositionMap[size],
              iconSizeMap[size]
            ),
            "aria-hidden": "true",
            children: iconLeft
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            ref: (0, import_cn.composeRefs)(internalRef, ref),
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
        showClear ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClearButton, { size, onClick: handleClear }) : iconRight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "span",
          {
            className: (0, import_cn.cn)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Input,
  inputVariants
});
