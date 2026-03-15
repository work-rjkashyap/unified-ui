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
var input_group_exports = {};
__export(input_group_exports, {
  InputGroup: () => InputGroup
});
module.exports = __toCommonJS(input_group_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_class_variance_authority = require("class-variance-authority");
var import_react = require("react");
const containerVariants = (0, import_class_variance_authority.cva)(
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
const addonVariants = (0, import_class_variance_authority.cva)(
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
const InputGroup = (0, import_react.forwardRef)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref,
        className: (0, import_cn.cn)(containerVariants({ variant, size, error }), className),
        "data-ds": "",
        "data-ds-component": "input-group",
        "data-ds-size": size,
        "data-ds-error": error ? "" : void 0,
        children: [
          addonLeft && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: (0, import_cn.cn)(addonVariants({ position: "left", size })), children: addonLeft }),
          prefix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              className: (0, import_cn.cn)(
                "inline-flex items-center justify-center shrink-0",
                "text-muted-foreground pointer-events-none",
                prefixPaddingMap[size],
                iconSizeMap[size]
              ),
              children: prefix
            }
          ),
          children ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 flex items-center min-w-0", children }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              disabled,
              className: (0, import_cn.cn)(
                "flex-1 h-full bg-transparent outline-none text-foreground min-w-0",
                "placeholder:text-muted-foreground",
                inputPaddingLeft,
                inputPaddingRight,
                inputClassName
              ),
              ...inputProps
            }
          ),
          suffix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              className: (0, import_cn.cn)(
                "inline-flex items-center justify-center shrink-0",
                "text-muted-foreground pointer-events-none",
                suffixPaddingMap[size],
                iconSizeMap[size]
              ),
              children: suffix
            }
          ),
          addonRight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: (0, import_cn.cn)(addonVariants({ position: "right", size })), children: addonRight })
        ]
      }
    );
  }
);
InputGroup.displayName = "InputGroup";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InputGroup
});
