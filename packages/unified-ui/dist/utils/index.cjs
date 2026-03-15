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
var utils_exports = {};
__export(utils_exports, {
  DS_DARK_CRITICAL_PAIRS: () => import_contrast.DS_DARK_CRITICAL_PAIRS,
  DS_LIGHT_CRITICAL_PAIRS: () => import_contrast.DS_LIGHT_CRITICAL_PAIRS,
  WCAG_AAA_LARGE: () => import_contrast.WCAG_AAA_LARGE,
  WCAG_AAA_NORMAL: () => import_contrast.WCAG_AAA_NORMAL,
  WCAG_AA_LARGE: () => import_contrast.WCAG_AA_LARGE,
  WCAG_AA_NORMAL: () => import_contrast.WCAG_AA_NORMAL,
  WCAG_NON_TEXT_AA: () => import_contrast.WCAG_NON_TEXT_AA,
  auditContrast: () => import_contrast.auditContrast,
  checkDSContrast: () => import_contrast.checkDSContrast,
  checkHexContrast: () => import_contrast.checkHexContrast,
  cn: () => import_cn.cn,
  composeRefs: () => import_cn.composeRefs,
  contrastRatio: () => import_contrast.contrastRatio,
  dsAttr: () => import_cn.dsAttr,
  dsColorVar: () => import_cn.dsColorVar,
  dsDataAttrs: () => import_types.dsDataAttrs,
  dsStateAttr: () => import_cn.dsStateAttr,
  dsVar: () => import_cn.dsVar,
  focusRingClassList: () => import_focus_ring.focusRingClassList,
  focusRingClasses: () => import_focus_ring.focusRingClasses,
  focusRingCompactClassList: () => import_focus_ring.focusRingCompactClassList,
  focusRingCompactClasses: () => import_focus_ring.focusRingCompactClasses,
  focusRingGroupRingClasses: () => import_focus_ring.focusRingGroupRingClasses,
  focusRingGroupTriggerClasses: () => import_focus_ring.focusRingGroupTriggerClasses,
  focusRingInsetClassList: () => import_focus_ring.focusRingInsetClassList,
  focusRingInsetClasses: () => import_focus_ring.focusRingInsetClasses,
  focusRingVariantOverrides: () => import_focus_ring.focusRingVariantOverrides,
  focusWithinRingClassList: () => import_focus_ring.focusWithinRingClassList,
  focusWithinRingClasses: () => import_focus_ring.focusWithinRingClasses,
  meetsAA: () => import_contrast.meetsAA,
  meetsAAA: () => import_contrast.meetsAAA,
  meetsNonTextAA: () => import_contrast.meetsNonTextAA,
  mergeSlots: () => import_cn.mergeSlots,
  noop: () => import_cn.noop,
  parseHex: () => import_contrast.parseHex,
  parseRGBString: () => import_contrast.parseRGBString,
  relativeLuminance: () => import_contrast.relativeLuminance,
  toRGBString: () => import_contrast.toRGBString,
  typedKeys: () => import_cn.typedKeys
});
module.exports = __toCommonJS(utils_exports);
var import_cn = require("./cn");
var import_contrast = require("./contrast");
var import_focus_ring = require("./focus-ring");
var import_types = require("./types");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DS_DARK_CRITICAL_PAIRS,
  DS_LIGHT_CRITICAL_PAIRS,
  WCAG_AAA_LARGE,
  WCAG_AAA_NORMAL,
  WCAG_AA_LARGE,
  WCAG_AA_NORMAL,
  WCAG_NON_TEXT_AA,
  auditContrast,
  checkDSContrast,
  checkHexContrast,
  cn,
  composeRefs,
  contrastRatio,
  dsAttr,
  dsColorVar,
  dsDataAttrs,
  dsStateAttr,
  dsVar,
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
  focusWithinRingClasses,
  meetsAA,
  meetsAAA,
  meetsNonTextAA,
  mergeSlots,
  noop,
  parseHex,
  parseRGBString,
  relativeLuminance,
  toRGBString,
  typedKeys
});
