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
var stack_exports = {};
__export(stack_exports, {
  Grid: () => Grid,
  Stack: () => Stack
});
module.exports = __toCommonJS(stack_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_react = require("react");
const gapClassMap = {
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
const directionClassMap = {
  vertical: "flex-col",
  horizontal: "flex-row"
};
const alignClassMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline"
};
const justifyClassMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly"
};
const Stack = (0, import_react.forwardRef)(function Stack2({
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Component,
    {
      ref,
      className: (0, import_cn.cn)(
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
const colsClassMap = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6"
};
const colsSmClassMap = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4"
};
const colsMdClassMap = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4"
};
const colsLgClassMap = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6"
};
const Grid = (0, import_react.forwardRef)(function Grid2({
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Component,
    {
      ref,
      className: (0, import_cn.cn)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Grid,
  Stack
});
