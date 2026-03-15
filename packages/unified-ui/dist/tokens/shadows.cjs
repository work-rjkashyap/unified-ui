"use strict";
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
var shadows_exports = {};
__export(shadows_exports, {
  shadow: () => shadow,
  shadowDark: () => shadowDark
});
module.exports = __toCommonJS(shadows_exports);
const shadow = {
  /** No shadow — flush with the surface */
  none: "none",
  /** Subtle lift — cards on hover, slightly raised surfaces */
  xs: "0 1px 2px 0 oklch(0 0 0 / 0.05)",
  /** Default card elevation — raised cards, wells */
  sm: "0 1px 3px 0 oklch(0 0 0 / 0.1), 0 1px 2px -1px oklch(0 0 0 / 0.1)",
  /** Dropdowns, autocomplete menus, select panels */
  md: "0 4px 6px -1px oklch(0 0 0 / 0.1), 0 2px 4px -2px oklch(0 0 0 / 0.1)",
  /** Popovers, floating toolbars, sticky headers */
  lg: "0 10px 15px -3px oklch(0 0 0 / 0.1), 0 4px 6px -4px oklch(0 0 0 / 0.1)",
  /** Dialogs, modals, command palettes */
  xl: "0 20px 25px -5px oklch(0 0 0 / 0.1), 0 8px 10px -6px oklch(0 0 0 / 0.1)",
  /** Toast notifications, top-level overlays */
  "2xl": "0 25px 50px -12px oklch(0 0 0 / 0.25)",
  /** Focus ring shadow — used alongside outline for focus indication */
  focusRing: "0 0 0 2px oklch(0.708 0 0 / 40%)"
};
const shadowDark = {
  none: "none",
  xs: "0 1px 2px 0 oklch(0 0 0 / 0.2)",
  sm: "0 1px 3px 0 oklch(0 0 0 / 0.3), 0 1px 2px -1px oklch(0 0 0 / 0.3)",
  md: "0 4px 6px -1px oklch(0 0 0 / 0.35), 0 2px 4px -2px oklch(0 0 0 / 0.3)",
  lg: "0 10px 15px -3px oklch(0 0 0 / 0.35), 0 4px 6px -4px oklch(0 0 0 / 0.3)",
  xl: "0 20px 25px -5px oklch(0 0 0 / 0.4), 0 8px 10px -6px oklch(0 0 0 / 0.35)",
  "2xl": "0 25px 50px -12px oklch(0 0 0 / 0.5)",
  focusRing: "0 0 0 2px oklch(0.556 0 0 / 50%)"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  shadow,
  shadowDark
});
