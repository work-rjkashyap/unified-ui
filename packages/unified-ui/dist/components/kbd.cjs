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
var kbd_exports = {};
__export(kbd_exports, {
  Kbd: () => Kbd,
  kbdVariants: () => kbdVariants
});
module.exports = __toCommonJS(kbd_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_class_variance_authority = require("class-variance-authority");
var import_react = require("react");
const kbdVariants = (0, import_class_variance_authority.cva)(
  [
    "inline-flex items-center gap-0.5",
    "font-mono font-medium leading-none",
    "rounded border border-border",
    "bg-muted text-muted-foreground",
    "shadow-[0_1px_0_1px_hsl(var(--border))]",
    "select-none whitespace-nowrap"
  ],
  {
    variants: {
      size: {
        sm: "px-1.5 py-0.5 text-[10px]",
        md: "px-2 py-1 text-xs",
        lg: "px-2.5 py-1 text-sm"
      }
    },
    defaultVariants: { size: "md" }
  }
);
const Kbd = (0, import_react.forwardRef)(function Kbd2({ size = "md", className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "kbd",
    {
      ref,
      className: (0, import_cn.cn)(kbdVariants({ size }), className),
      "data-ds": "",
      "data-ds-component": "kbd",
      "data-ds-size": size,
      ...rest,
      children
    }
  );
});
Kbd.displayName = "Kbd";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Kbd,
  kbdVariants
});
