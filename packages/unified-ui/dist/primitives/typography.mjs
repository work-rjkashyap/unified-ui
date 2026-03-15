"use client";
import { jsx } from "react/jsx-runtime";
import { typographyVariants } from "../tokens/typography";
import { cn } from "../utils/cn";
import { forwardRef } from "react";
const fontClassMap = {
  display: "font-display",
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
  inherit: "font-[inherit]"
};
const variantDefaultFont = {
  heading1: typographyVariants.heading1.fontFamily,
  heading2: typographyVariants.heading2.fontFamily,
  heading3: typographyVariants.heading3.fontFamily,
  subheading: typographyVariants.subheading.fontFamily,
  body: typographyVariants.body.fontFamily,
  bodySm: typographyVariants.bodySm.fontFamily,
  caption: typographyVariants.caption.fontFamily,
  label: typographyVariants.label.fontFamily,
  overline: typographyVariants.overline.fontFamily,
  code: typographyVariants.code.fontFamily
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
const Typography = forwardRef(
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
    const classes = cn(
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
    return /* @__PURE__ */ jsx(
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
const Heading = forwardRef(
  function Heading2({ level = 1, ...rest }, ref) {
    return /* @__PURE__ */ jsx(
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
const Subheading = forwardRef(
  function Subheading2(props, ref) {
    return /* @__PURE__ */ jsx(Typography, { ref, variant: "subheading", ...props });
  }
);
Subheading.displayName = "Subheading";
const Body = forwardRef(function Body2({ small = false, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    Typography,
    {
      ref,
      variant: small ? "bodySm" : "body",
      ...rest
    }
  );
});
Body.displayName = "Body";
const Caption = forwardRef(function Caption2({ color = "muted", ...rest }, ref) {
  return /* @__PURE__ */ jsx(Typography, { ref, variant: "caption", color, ...rest });
});
Caption.displayName = "Caption";
const Label = forwardRef(function Label2({
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
  const classes = cn(
    variantClassMap.label,
    fontClassMap[resolvedFont],
    color && color !== "default" && colorClassMap[color],
    align && alignClassMap[align],
    truncate && "truncate",
    lineClamp && lineClampClassMap[lineClamp],
    noMargin && "m-0",
    className
  );
  return /* @__PURE__ */ jsx(
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
const Overline = forwardRef(
  function Overline2({ color = "muted", ...rest }, ref) {
    return /* @__PURE__ */ jsx(Typography, { ref, variant: "overline", color, ...rest });
  }
);
Overline.displayName = "Overline";
const InlineCode = forwardRef(
  function InlineCode2({ className, ...rest }, ref) {
    return /* @__PURE__ */ jsx(
      Typography,
      {
        ref,
        variant: "code",
        className: cn("rounded-sm bg-muted px-1.5 py-0.5", className),
        ...rest
      }
    );
  }
);
InlineCode.displayName = "InlineCode";
export {
  Body,
  Caption,
  Heading,
  InlineCode,
  Label,
  Overline,
  Subheading,
  Typography
};
