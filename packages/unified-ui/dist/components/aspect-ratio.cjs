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
var aspect_ratio_exports = {};
__export(aspect_ratio_exports, {
  AspectRatio: () => AspectRatio
});
module.exports = __toCommonJS(aspect_ratio_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
const AspectRatio = (0, import_react.forwardRef)(function AspectRatio2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.AspectRatio.Root,
    {
      ref,
      className: (0, import_cn.cn)("relative overflow-hidden", className),
      "data-ds": "",
      "data-ds-component": "aspect-ratio",
      ...rest
    }
  );
});
AspectRatio.displayName = "AspectRatio";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AspectRatio
});
