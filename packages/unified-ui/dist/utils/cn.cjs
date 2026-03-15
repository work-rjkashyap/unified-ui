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
var cn_exports = {};
__export(cn_exports, {
  cn: () => cn,
  composeRefs: () => composeRefs,
  dsAttr: () => dsAttr,
  dsColorVar: () => dsColorVar,
  dsStateAttr: () => dsStateAttr,
  dsVar: () => dsVar,
  mergeSlots: () => mergeSlots,
  noop: () => noop,
  typedKeys: () => typedKeys
});
module.exports = __toCommonJS(cn_exports);
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}
function mergeSlots(defaults, overrides) {
  if (!overrides) {
    return defaults;
  }
  const allKeys = /* @__PURE__ */ new Set([
    ...Object.keys(defaults),
    ...Object.keys(overrides)
  ]);
  const result = {};
  for (const key of allKeys) {
    result[key] = cn(defaults[key] ?? "", overrides[key] ?? "");
  }
  return result;
}
function dsAttr(componentName) {
  return {
    "data-ds": "",
    "data-ds-component": componentName
  };
}
function dsStateAttr(state, active) {
  if (!active) return {};
  return { [`data-ds-${state}`]: "" };
}
function dsVar(category, name, fallback) {
  const varName = `--${category}-${name}`;
  return fallback ? `var(${varName}, ${fallback})` : `var(${varName})`;
}
function dsColorVar(name, alpha) {
  const varRef = `var(--${name})`;
  if (alpha !== void 0) {
    return `color-mix(in oklch, ${varRef} ${Math.round(alpha * 100)}%, transparent)`;
  }
  return varRef;
}
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    for (const ref of refs) {
      setRef(ref, node);
    }
  };
}
function typedKeys(obj) {
  return Object.keys(obj);
}
const noop = () => {
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cn,
  composeRefs,
  dsAttr,
  dsColorVar,
  dsStateAttr,
  dsVar,
  mergeSlots,
  noop,
  typedKeys
});
