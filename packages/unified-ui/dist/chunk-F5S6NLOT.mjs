import { typographyVariants } from './chunk-ITBG42M5.mjs';
import { cn } from './chunk-ZT3PCXDF.mjs';
import { forwardRef } from 'react';
import { jsx } from 'react/jsx-runtime';

var sizeClassMap = {
  /** 640px — narrow forms, single-column content */
  xs: "max-w-screen-sm",
  /** 768px — articles, focused reading content */
  sm: "max-w-screen-md",
  /** 1024px — dashboards, multi-column layouts */
  md: "max-w-screen-lg",
  /** 1280px — default, full-width page content */
  lg: "max-w-7xl",
  /** No max-width constraint — full bleed */
  full: "max-w-full"
};
var paddingClassMap = {
  /** No horizontal padding */
  none: "",
  /** Tighter padding: px-3 → px-4 → px-6 */
  tight: "px-3 sm:px-4 lg:px-6",
  /** Standard padding: px-4 → px-6 → px-8 (project default) */
  default: "px-4 sm:px-6 lg:px-8",
  /** Wider padding: px-6 → px-8 → px-10 */
  wide: "px-6 sm:px-8 lg:px-10"
};
var Container = forwardRef(
  function Container2({
    size = "lg",
    padding = "default",
    centered = true,
    as: Component = "div",
    className,
    children,
    ...rest
  }, ref) {
    return /* @__PURE__ */ jsx(
      Component,
      {
        ref,
        className: cn(
          // Max-width constraint
          sizeClassMap[size],
          // Responsive horizontal padding
          paddingClassMap[padding],
          // Centering
          centered && "mx-auto",
          // Width fills available space up to max-width
          "w-full",
          // Consumer overrides
          className
        ),
        "data-ds": "",
        "data-ds-component": "container",
        ...rest,
        children
      }
    );
  }
);
Container.displayName = "Container";
var spacingYMap = {
  0: "my-0",
  1: "my-1",
  2: "my-2",
  3: "my-3",
  4: "my-4",
  5: "my-5",
  6: "my-6",
  8: "my-8",
  10: "my-10",
  12: "my-12"
};
var spacingXMap = {
  0: "mx-0",
  1: "mx-1",
  2: "mx-2",
  3: "mx-3",
  4: "mx-4",
  5: "mx-5",
  6: "mx-6",
  8: "mx-8",
  10: "mx-10",
  12: "mx-12"
};
var Divider = forwardRef(function Divider2({ spacing = 4, orientation = "horizontal", className, ...rest }, ref) {
  const isVertical = orientation === "vertical";
  return /* @__PURE__ */ jsx(
    "hr",
    {
      ref,
      role: "separator",
      "aria-orientation": orientation,
      className: cn(
        "border-none shrink-0",
        isVertical ? cn("w-px self-stretch bg-border", spacingXMap[spacing] ?? "mx-4") : cn("h-px w-full bg-border", spacingYMap[spacing] ?? "my-4"),
        className
      ),
      "data-ds": "",
      "data-ds-component": "divider",
      ...rest
    }
  );
});
Divider.displayName = "Divider";
var gapClassMap = {
  0: "gap-0",
  0.5: "gap-0.5",
  1: "gap-1",
  1.5: "gap-1.5",
  2: "gap-2",
  2.5: "gap-2.5",
  3: "gap-3",
  3.5: "gap-3.5",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  7: "gap-7",
  8: "gap-8",
  9: "gap-9",
  10: "gap-10",
  11: "gap-11",
  12: "gap-12",
  14: "gap-14",
  16: "gap-16",
  20: "gap-20",
  24: "gap-24"
};
var directionClassMap = {
  vertical: "flex-col",
  horizontal: "flex-row"
};
var alignClassMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline"
};
var justifyClassMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly"
};
var Stack = forwardRef(function Stack2({
  gap = 4,
  direction = "vertical",
  align,
  justify,
  wrap = false,
  as: Component = "div",
  className,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ jsx(
    Component,
    {
      ref,
      className: cn(
        "flex",
        directionClassMap[direction],
        gapClassMap[gap],
        align && alignClassMap[align],
        justify && justifyClassMap[justify],
        wrap && "flex-wrap",
        className
      ),
      "data-ds": "",
      "data-ds-component": "stack",
      ...rest,
      children
    }
  );
});
Stack.displayName = "Stack";
var colsClassMap = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6"
};
var colsSmClassMap = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4"
};
var colsMdClassMap = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4"
};
var colsLgClassMap = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6"
};
var Grid = forwardRef(function Grid2({
  cols = 1,
  colsSm,
  colsMd,
  colsLg,
  gap = 4,
  as: Component = "div",
  className,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ jsx(
    Component,
    {
      ref,
      className: cn(
        "grid",
        colsClassMap[cols],
        colsSm && colsSmClassMap[colsSm],
        colsMd && colsMdClassMap[colsMd],
        colsLg && colsLgClassMap[colsLg],
        gapClassMap[gap],
        className
      ),
      "data-ds": "",
      "data-ds-component": "grid",
      ...rest,
      children
    }
  );
});
Grid.displayName = "Grid";
var fontClassMap = {
  display: "font-display",
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
  inherit: "font-[inherit]"
};
var variantDefaultFont = {
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
var defaultElementMap = {
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
var variantClassMap = {
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
var colorClassMap = {
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
var alignClassMap2 = {
  left: "text-left",
  center: "text-center",
  right: "text-right"
};
var lineClampClassMap = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6"
};
var Typography = forwardRef(
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
      align && alignClassMap2[align],
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
var headingVariantMap = {
  1: "heading1",
  2: "heading2",
  3: "heading3"
};
var Heading = forwardRef(
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
var Subheading = forwardRef(
  function Subheading2(props, ref) {
    return /* @__PURE__ */ jsx(Typography, { ref, variant: "subheading", ...props });
  }
);
Subheading.displayName = "Subheading";
var Body = forwardRef(function Body2({ small = false, ...rest }, ref) {
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
var Caption = forwardRef(function Caption2({ color = "muted", ...rest }, ref) {
  return /* @__PURE__ */ jsx(Typography, { ref, variant: "caption", color, ...rest });
});
Caption.displayName = "Caption";
var Label = forwardRef(function Label2({
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
    align && alignClassMap2[align],
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
var Overline = forwardRef(
  function Overline2({ color = "muted", ...rest }, ref) {
    return /* @__PURE__ */ jsx(Typography, { ref, variant: "overline", color, ...rest });
  }
);
Overline.displayName = "Overline";
var InlineCode = forwardRef(
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

export { Body, Caption, Container, Divider, Grid, Heading, InlineCode, Label, Overline, Stack, Subheading, Typography };
