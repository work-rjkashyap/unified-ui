"use client";
import { jsx } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { forwardRef } from "react";
const sizeClassMap = {
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
const paddingClassMap = {
  /** No horizontal padding */
  none: "",
  /** Tighter padding: px-3 → px-4 → px-6 */
  tight: "px-3 sm:px-4 lg:px-6",
  /** Standard padding: px-4 → px-6 → px-8 (project default) */
  default: "px-4 sm:px-6 lg:px-8",
  /** Wider padding: px-6 → px-8 → px-10 */
  wide: "px-6 sm:px-8 lg:px-10"
};
const Container = forwardRef(
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
export {
  Container
};
