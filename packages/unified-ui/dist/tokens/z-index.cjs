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
var z_index_exports = {};
__export(z_index_exports, {
  zIndex: () => zIndex
});
module.exports = __toCommonJS(z_index_exports);
const zIndex = {
  /** Default document flow — no explicit stacking */
  base: "0",
  /** Sticky headers, floating action bars, pinned columns */
  sticky: "10",
  /** Backdrop overlays behind modals and drawers */
  overlay: "40",
  /** Modals, dialogs, sheets, drawers */
  modal: "50",
  /** Dropdowns, select menus, context menus — renders above modals */
  dropdown: "60",
  /** Popovers, comboboxes, date pickers — renders above modals */
  popover: "70",
  /** Toast notifications — always visible above all content */
  toast: "80",
  /** Tooltips — highest interactive z-layer */
  tooltip: "90",
  /** Emergency escape hatch — use sparingly and document why */
  max: "9999"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  zIndex
});
