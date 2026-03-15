"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn, composeRefs } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
const textareaVariants = cva(
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
    focusRingClasses,
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
  const adjustHeight = useCallback(() => {
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
  useEffect(() => {
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
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
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
const Textarea = forwardRef(
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
    const internalRef = useRef(null);
    const [uncontrolledCharCount, setUncontrolledCharCount] = useState(
      () => {
        if (defaultValue !== void 0) return String(defaultValue).length;
        return 0;
      }
    );
    const charCount = value !== void 0 ? String(value).length : uncontrolledCharCount;
    const adjustHeight = useAutoResize(internalRef, autoResize, maxHeight);
    const handleChange = useCallback(
      (e) => {
        setUncontrolledCharCount(e.target.value.length);
        adjustHeight();
        onChange?.(e);
      },
      [onChange, adjustHeight]
    );
    const resolvedAriaInvalid = ariaInvalid !== void 0 ? ariaInvalid : variant === "error" ? true : void 0;
    const textareaClasses = cn(
      textareaVariants({ variant, size }),
      autoResize && "resize-none overflow-hidden",
      className
    );
    const textareaElement = /* @__PURE__ */ jsx(
      "textarea",
      {
        ref: composeRefs(internalRef, ref),
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
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn("flex flex-col gap-1.5 w-full", wrapperClassName),
        "data-ds": "",
        "data-ds-component": "textarea-wrapper",
        children: [
          textareaElement,
          /* @__PURE__ */ jsx("div", { className: "flex justify-end px-0.5", children: /* @__PURE__ */ jsx(
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
export {
  Textarea,
  textareaVariants
};
