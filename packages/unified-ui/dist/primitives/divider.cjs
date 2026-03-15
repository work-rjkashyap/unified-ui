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
var divider_exports = {};
__export(divider_exports, {
  Divider: () => Divider
});
module.exports = __toCommonJS(divider_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_react = require("react");
const spacingYMap = {
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
const spacingXMap = {
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
const Divider = (0, import_react.forwardRef)(function Divider2({ spacing = 4, orientation = "horizontal", className, ...rest }, ref) {
  const isVertical = orientation === "vertical";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "hr",
    {
      ref,
      "aria-orientation": orientation,
      className: (0, import_cn.cn)(
        "border-none shrink-0",
        isVertical ? (0, import_cn.cn)("w-px self-stretch bg-border", spacingXMap[spacing] ?? "mx-4") : (0, import_cn.cn)("h-px w-full bg-border", spacingYMap[spacing] ?? "my-4"),
        className
      ),
      "data-ds": "",
      "data-ds-component": "divider",
      ...rest
    }
  );
});
Divider.displayName = "Divider";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Divider
});
