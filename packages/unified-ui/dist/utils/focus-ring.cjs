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
var focus_ring_exports = {};
__export(focus_ring_exports, {
  focusRingClassList: () => focusRingClassList,
  focusRingClasses: () => focusRingClasses,
  focusRingCompactClassList: () => focusRingCompactClassList,
  focusRingCompactClasses: () => focusRingCompactClasses,
  focusRingGroupRingClasses: () => focusRingGroupRingClasses,
  focusRingGroupTriggerClasses: () => focusRingGroupTriggerClasses,
  focusRingInsetClassList: () => focusRingInsetClassList,
  focusRingInsetClasses: () => focusRingInsetClasses,
  focusRingVariantOverrides: () => focusRingVariantOverrides,
  focusWithinRingClassList: () => focusWithinRingClassList,
  focusWithinRingClasses: () => focusWithinRingClasses
});
module.exports = __toCommonJS(focus_ring_exports);
const focusRingClasses = "focus-visible:outline-none focus-visible:border-border-strong";
const focusRingClassList = [
  "focus-visible:outline-none",
  "focus-visible:border-border-strong"
];
const focusRingInsetClasses = "focus-visible:outline-none focus-visible:border-border-strong";
const focusRingInsetClassList = [
  "focus-visible:outline-none",
  "focus-visible:border-border-strong"
];
const focusRingCompactClasses = "focus-visible:outline-none focus-visible:border-border-strong";
const focusRingCompactClassList = [
  "focus-visible:outline-none",
  "focus-visible:border-border-strong"
];
const focusRingVariantOverrides = {
  /** Override focus border color to danger red */
  danger: "focus-visible:border-danger",
  /** Override focus border color to success green */
  success: "focus-visible:border-success",
  /** Override focus border color to warning amber */
  warning: "focus-visible:border-warning",
  /** Override focus border color to info blue */
  info: "focus-visible:border-info",
  /** Override focus border color to current text color */
  current: "focus-visible:border-current"
};
const focusRingGroupTriggerClasses = "focus-visible:outline-none";
const focusRingGroupRingClasses = "group-focus-visible:border-border-strong";
const focusWithinRingClasses = "focus-within:outline-none focus-within:border-border-strong";
const focusWithinRingClassList = [
  "focus-within:outline-none",
  "focus-within:border-border-strong"
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  focusRingClassList,
  focusRingClasses,
  focusRingCompactClassList,
  focusRingCompactClasses,
  focusRingGroupRingClasses,
  focusRingGroupTriggerClasses,
  focusRingInsetClassList,
  focusRingInsetClasses,
  focusRingVariantOverrides,
  focusWithinRingClassList,
  focusWithinRingClasses
});
