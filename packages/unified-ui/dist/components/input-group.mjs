"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";
const containerVariants = cva(
  [
    "flex w-full items-stretch overflow-hidden",
    "rounded-md border bg-background",
    "transition-[border-color,box-shadow] duration-fast",
    "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",
    "has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50"
  ],
  {
    variants: {
      variant: {
        default: "border-input",
        filled: "border-transparent bg-muted"
      },
      size: {
        sm: "h-8 text-xs",
        md: "h-9 text-sm",
        lg: "h-10 text-sm"
      },
      error: {
        true: "border-danger focus-within:border-danger focus-within:ring-danger/20",
        false: ""
      }
    },
    defaultVariants: { variant: "default", size: "md", error: false }
  }
);
const addonVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "bg-muted text-muted-foreground font-medium",
    "select-none",
    "border-border"
  ],
  {
    variants: {
      position: {
        left: "border-r",
        right: "border-l"
      },
      size: {
        sm: "text-xs px-2",
        md: "text-sm px-3",
        lg: "text-sm px-3"
      }
    },
    defaultVariants: { position: "left", size: "md" }
  }
);
const iconSizeMap = {
  sm: "[&>svg]:size-3.5",
  md: "[&>svg]:size-4",
  lg: "[&>svg]:size-4"
};
const prefixPaddingMap = {
  sm: "pl-2",
  md: "pl-3",
  lg: "pl-3"
};
const suffixPaddingMap = {
  sm: "pr-2",
  md: "pr-3",
  lg: "pr-3"
};
const inputLeftPaddingWithPrefix = {
  sm: "pl-1.5",
  md: "pl-2",
  lg: "pl-2"
};
const inputLeftPaddingWithAddon = {
  sm: "pl-2",
  md: "pl-3",
  lg: "pl-3"
};
const inputLeftPaddingWithoutPrefix = {
  sm: "pl-2",
  md: "pl-3",
  lg: "pl-3"
};
const inputRightPaddingWithSuffix = {
  sm: "pr-1.5",
  md: "pr-2",
  lg: "pr-2"
};
const inputRightPaddingWithAddon = {
  sm: "pr-2",
  md: "pr-3",
  lg: "pr-3"
};
const inputRightPaddingWithoutSuffix = {
  sm: "pr-2",
  md: "pr-3",
  lg: "pr-3"
};
const InputGroup = forwardRef(
  function InputGroup2({
    size = "md",
    variant = "default",
    prefix,
    suffix,
    addonLeft,
    addonRight,
    disabled = false,
    error = false,
    className,
    inputClassName,
    inputProps,
    children
  }, ref) {
    const hasPrefix = !!prefix;
    const hasSuffix = !!suffix;
    const hasAddonRight = !!addonRight;
    const inputPaddingLeft = hasPrefix ? inputLeftPaddingWithPrefix[size] : addonLeft ? inputLeftPaddingWithAddon[size] : inputLeftPaddingWithoutPrefix[size];
    const inputPaddingRight = hasSuffix ? inputRightPaddingWithSuffix[size] : hasAddonRight ? inputRightPaddingWithAddon[size] : inputRightPaddingWithoutSuffix[size];
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn(containerVariants({ variant, size, error }), className),
        "data-ds": "",
        "data-ds-component": "input-group",
        "data-ds-size": size,
        "data-ds-error": error ? "" : void 0,
        children: [
          addonLeft && /* @__PURE__ */ jsx("div", { className: cn(addonVariants({ position: "left", size })), children: addonLeft }),
          prefix && /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "inline-flex items-center justify-center shrink-0",
                "text-muted-foreground pointer-events-none",
                prefixPaddingMap[size],
                iconSizeMap[size]
              ),
              children: prefix
            }
          ),
          children ? /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center min-w-0", children }) : /* @__PURE__ */ jsx(
            "input",
            {
              disabled,
              className: cn(
                "flex-1 h-full bg-transparent outline-none text-foreground min-w-0",
                "placeholder:text-muted-foreground",
                inputPaddingLeft,
                inputPaddingRight,
                inputClassName
              ),
              ...inputProps
            }
          ),
          suffix && /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "inline-flex items-center justify-center shrink-0",
                "text-muted-foreground pointer-events-none",
                suffixPaddingMap[size],
                iconSizeMap[size]
              ),
              children: suffix
            }
          ),
          addonRight && /* @__PURE__ */ jsx("div", { className: cn(addonVariants({ position: "right", size })), children: addonRight })
        ]
      }
    );
  }
);
InputGroup.displayName = "InputGroup";
export {
  InputGroup
};
