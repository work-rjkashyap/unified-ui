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
var textarea_exports = {};
__export(textarea_exports, {
  Textarea: () => Textarea,
  textareaVariants: () => textareaVariants
});
module.exports = __toCommonJS(textarea_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_react = require("react");
const textareaVariants = (0, import_class_variance_authority.cva)(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "flex w-full min-h-[60px]",
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
    // Resize handle
    "resize-vertical"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Visual Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Default — standard textarea with muted border.
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
         * Small — compact for dense UIs.
         * Padding and font match Input sm.
         */
        sm: "px-2.5 py-1.5 text-xs",
        /**
         * Medium — default size for most textareas.
         * Padding and font match Input md.
         */
        md: "px-3 py-2 text-sm",
        /**
         * Large — prominent textareas for long-form content.
         * Padding and font match Input lg.
         */
        lg: "px-3.5 py-2.5 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
function useAutoResize(textareaRef, autoResize, maxHeight) {
  const adjustHeight = (0, import_react.useCallback)(() => {
    const textarea = textareaRef.current;
    if (!textarea || !autoResize) return;
    textarea.style.height = "auto";
    const newHeight = textarea.scrollHeight;
    if (maxHeight && newHeight > maxHeight) {
      textarea.style.height = `${maxHeight}px`;
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY = "hidden";
    }
  }, [textareaRef, autoResize, maxHeight]);
  (0, import_react.useEffect)(() => {
    adjustHeight();
  }, [adjustHeight]);
  return adjustHeight;
}
function CharacterCount({
  current,
  max,
  variant,
  className
}) {
  const isOverLimit = max !== void 0 && current > max;
  const isNearLimit = max !== void 0 && current >= max * 0.9;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "span",
    {
      className: (0, import_cn.cn)(
        "text-xs leading-4 tabular-nums select-none",
        // Default muted text
        "text-muted-foreground",
        // Near limit warning
        isNearLimit && !isOverLimit && "text-warning",
        // Over limit or error variant
        (isOverLimit || variant === "error") && "text-danger",
        className
      ),
      "aria-live": "polite",
      "aria-atomic": "true",
      children: max !== void 0 ? `${current} / ${max}` : current
    }
  );
}
const Textarea = (0, import_react.forwardRef)(
  function Textarea2({
    variant = "default",
    size = "md",
    autoResize = false,
    maxHeight,
    minRows = 3,
    showCount = false,
    wrapperClassName,
    countClassName,
    className,
    disabled,
    readOnly,
    value,
    defaultValue,
    maxLength,
    onChange,
    "aria-invalid": ariaInvalid,
    ...rest
  }, ref) {
    const internalRef = (0, import_react.useRef)(null);
    const [uncontrolledCharCount, setUncontrolledCharCount] = (0, import_react.useState)(
      () => {
        if (defaultValue !== void 0) return String(defaultValue).length;
        return 0;
      }
    );
    const charCount = value !== void 0 ? String(value).length : uncontrolledCharCount;
    const adjustHeight = useAutoResize(internalRef, autoResize, maxHeight);
    const handleChange = (0, import_react.useCallback)(
      (e) => {
        setUncontrolledCharCount(e.target.value.length);
        adjustHeight();
        onChange?.(e);
      },
      [onChange, adjustHeight]
    );
    const resolvedAriaInvalid = ariaInvalid !== void 0 ? ariaInvalid : variant === "error" ? true : void 0;
    const textareaClasses = (0, import_cn.cn)(
      textareaVariants({ variant, size }),
      autoResize && "resize-none overflow-hidden",
      className
    );
    const textareaElement = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "textarea",
      {
        ref: (0, import_cn.composeRefs)(internalRef, ref),
        rows: minRows,
        disabled,
        readOnly,
        value,
        defaultValue,
        maxLength,
        onChange: handleChange,
        "aria-invalid": resolvedAriaInvalid,
        "aria-disabled": disabled || void 0,
        className: textareaClasses,
        "data-ds": "",
        "data-ds-component": "textarea",
        "data-ds-variant": variant,
        "data-ds-size": size,
        ...autoResize ? { "data-ds-auto-resize": "" } : {},
        ...rest
      }
    );
    if (!showCount) {
      return textareaElement;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: (0, import_cn.cn)("flex flex-col gap-1.5 w-full", wrapperClassName),
        "data-ds": "",
        "data-ds-component": "textarea-wrapper",
        children: [
          textareaElement,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex justify-end px-0.5", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            CharacterCount,
            {
              current: charCount,
              max: maxLength,
              variant,
              className: countClassName
            }
          ) })
        ]
      }
    );
  }
);
Textarea.displayName = "Textarea";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Textarea,
  textareaVariants
});
