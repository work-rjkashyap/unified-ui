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
var typography_exports = {};
__export(typography_exports, {
  Body: () => Body,
  Caption: () => Caption,
  Heading: () => Heading,
  InlineCode: () => InlineCode,
  Label: () => Label,
  Overline: () => Overline,
  Subheading: () => Subheading,
  Typography: () => Typography
});
module.exports = __toCommonJS(typography_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_typography = require("../tokens/typography");
var import_cn = require("../utils/cn");
var import_react = require("react");
const fontClassMap = {
  display: "font-display",
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
  inherit: "font-[inherit]"
};
const variantDefaultFont = {
  heading1: import_typography.typographyVariants.heading1.fontFamily,
  heading2: import_typography.typographyVariants.heading2.fontFamily,
  heading3: import_typography.typographyVariants.heading3.fontFamily,
  subheading: import_typography.typographyVariants.subheading.fontFamily,
  body: import_typography.typographyVariants.body.fontFamily,
  bodySm: import_typography.typographyVariants.bodySm.fontFamily,
  caption: import_typography.typographyVariants.caption.fontFamily,
  label: import_typography.typographyVariants.label.fontFamily,
  overline: import_typography.typographyVariants.overline.fontFamily,
  code: import_typography.typographyVariants.code.fontFamily
};
const defaultElementMap = {
  heading1: "h1",
  heading2: "h2",
  heading3: "h3",
  subheading: "h4",
  body: "p",
  bodySm: "p",
  caption: "span",
  label: "label",
  overline: "span",
  code: "code"
};
const variantClassMap = {
  heading1: "text-[30px] leading-[36px] font-bold tracking-tight text-foreground",
  heading2: "text-[24px] leading-[32px] font-semibold tracking-tight text-foreground",
  heading3: "text-[20px] leading-[28px] font-semibold tracking-normal text-foreground",
  subheading: "text-[18px] leading-[28px] font-medium tracking-normal text-foreground",
  body: "text-[16px] leading-[24px] font-normal tracking-normal text-foreground",
  bodySm: "text-[14px] leading-[20px] font-normal tracking-normal text-foreground",
  caption: "text-[12px] leading-[16px] font-normal tracking-wide text-muted-foreground",
  label: "text-[14px] leading-[20px] font-medium tracking-normal text-foreground",
  overline: "text-[12px] leading-[16px] font-semibold tracking-wider uppercase text-muted-foreground",
  code: "text-[14px] leading-[20px] font-normal tracking-normal text-foreground"
};
const colorClassMap = {
  default: "",
  foreground: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
  inherit: "text-inherit"
};
const alignClassMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right"
};
const lineClampClassMap = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6"
};
const Typography = (0, import_react.forwardRef)(
  function Typography2({
    variant = "body",
    font,
    color = "default",
    align,
    as,
    truncate = false,
    lineClamp,
    noMargin = true,
    className,
    children,
    ...rest
  }, ref) {
    const Component = as ?? defaultElementMap[variant];
    const resolvedFont = font ?? variantDefaultFont[variant];
    const classes = (0, import_cn.cn)(
      // Base variant styles (size, weight, line-height, tracking, default color)
      variantClassMap[variant],
      // Font family (resolved from prop or variant default)
      fontClassMap[resolvedFont],
      // Color override (only applied if not "default" — default keeps variant's color)
      color !== "default" && colorClassMap[color],
      // Alignment
      align && alignClassMap[align],
      // Truncation
      truncate && "truncate",
      // Line clamping
      lineClamp && lineClampClassMap[lineClamp],
      // Margin reset
      noMargin && "m-0",
      // Consumer overrides
      className
    );
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Component,
      {
        ref,
        className: classes,
        "data-ds": "",
        "data-ds-component": "typography",
        "data-ds-variant": variant,
        ...rest,
        children
      }
    );
  }
);
Typography.displayName = "Typography";
const headingVariantMap = {
  1: "heading1",
  2: "heading2",
  3: "heading3"
};
const Heading = (0, import_react.forwardRef)(
  function Heading2({ level = 1, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Typography,
      {
        ref,
        variant: headingVariantMap[level],
        ...rest
      }
    );
  }
);
Heading.displayName = "Heading";
const Subheading = (0, import_react.forwardRef)(
  function Subheading2(props, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, { ref, variant: "subheading", ...props });
  }
);
Subheading.displayName = "Subheading";
const Body = (0, import_react.forwardRef)(function Body2({ small = false, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Typography,
    {
      ref,
      variant: small ? "bodySm" : "body",
      ...rest
    }
  );
});
Body.displayName = "Body";
const Caption = (0, import_react.forwardRef)(function Caption2({ color = "muted", ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, { ref, variant: "caption", color, ...rest });
});
Caption.displayName = "Caption";
const Label = (0, import_react.forwardRef)(function Label2({
  htmlFor,
  font,
  color,
  align,
  as,
  truncate,
  lineClamp,
  noMargin = true,
  className,
  children,
  ...rest
}, ref) {
  const resolvedFont = font ?? variantDefaultFont.label;
  const classes = (0, import_cn.cn)(
    variantClassMap.label,
    fontClassMap[resolvedFont],
    color && color !== "default" && colorClassMap[color],
    align && alignClassMap[align],
    truncate && "truncate",
    lineClamp && lineClampClassMap[lineClamp],
    noMargin && "m-0",
    className
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "label",
    {
      ref,
      htmlFor,
      className: classes,
      "data-ds": "",
      "data-ds-component": "typography",
      "data-ds-variant": "label",
      ...rest,
      children
    }
  );
});
Label.displayName = "Label";
const Overline = (0, import_react.forwardRef)(
  function Overline2({ color = "muted", ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, { ref, variant: "overline", color, ...rest });
  }
);
Overline.displayName = "Overline";
const InlineCode = (0, import_react.forwardRef)(
  function InlineCode2({ className, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Typography,
      {
        ref,
        variant: "code",
        className: (0, import_cn.cn)("rounded-sm bg-muted px-1.5 py-0.5", className),
        ...rest
      }
    );
  }
);
InlineCode.displayName = "InlineCode";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Body,
  Caption,
  Heading,
  InlineCode,
  Label,
  Overline,
  Subheading,
  Typography
});
