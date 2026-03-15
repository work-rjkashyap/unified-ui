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
var container_exports = {};
__export(container_exports, {
  Container: () => Container
});
module.exports = __toCommonJS(container_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_react = require("react");
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
const Container = (0, import_react.forwardRef)(
  function Container2({
    size = "lg",
    padding = "default",
    centered = true,
    as: Component = "div",
    className,
    children,
    ...rest
  }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Component,
      {
        ref,
        className: (0, import_cn.cn)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Container
});
