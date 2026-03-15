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
var radius_exports = {};
__export(radius_exports, {
  radius: () => radius
});
module.exports = __toCommonJS(radius_exports);
const radius = {
  /** No rounding */
  none: "0px",
  /** Barely perceptible — tags, micro elements */
  sm: "4px",
  /** Default for buttons, inputs, cards */
  md: "6px",
  /** Dialogs, sheets, popovers, dropdowns */
  lg: "8px",
  /** Larger containers, modals */
  xl: "12px",
  /** Full pill / circle — avatars, toggle pills */
  full: "9999px"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  radius
});
