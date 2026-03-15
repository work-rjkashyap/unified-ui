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
var visually_hidden_exports = {};
__export(visually_hidden_exports, {
  VisuallyHidden: () => VisuallyHidden
});
module.exports = __toCommonJS(visually_hidden_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
const VisuallyHidden = (0, import_react.forwardRef)(function VisuallyHidden2(props, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.VisuallyHidden.Root,
    {
      ref,
      "data-ds": "",
      "data-ds-component": "visually-hidden",
      ...props
    }
  );
});
VisuallyHidden.displayName = "VisuallyHidden";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VisuallyHidden
});
