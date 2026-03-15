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
var tokens_exports = {};
__export(tokens_exports, {
  amber: () => import_colors.amber,
  blue: () => import_colors.blue,
  brand: () => import_colors.brand,
  duration: () => import_motion.duration,
  durationCSS: () => import_motion.durationCSS,
  durationSeconds: () => import_motion.durationSeconds,
  easing: () => import_motion.easing,
  easingCSS: () => import_motion.easingCSS,
  fontFamily: () => import_typography.fontFamily,
  fontSize: () => import_typography.fontSize,
  fontWeight: () => import_typography.fontWeight,
  gray: () => import_colors.gray,
  green: () => import_colors.green,
  letterSpacing: () => import_typography.letterSpacing,
  lineHeight: () => import_typography.lineHeight,
  neutral: () => import_colors.neutral,
  palettes: () => import_colors.palettes,
  pure: () => import_colors.pure,
  radius: () => import_radius.radius,
  red: () => import_colors.red,
  semanticDark: () => import_colors.semanticDark,
  semanticLight: () => import_colors.semanticLight,
  shadow: () => import_shadows.shadow,
  shadowDark: () => import_shadows.shadowDark,
  slate: () => import_colors.slate,
  spacing: () => import_spacing.spacing,
  spring: () => import_motion.spring,
  stagger: () => import_motion.stagger,
  teal: () => import_colors.teal,
  typographyVariants: () => import_typography.typographyVariants,
  zIndex: () => import_z_index.zIndex,
  zinc: () => import_colors.zinc
});
module.exports = __toCommonJS(tokens_exports);
var import_colors = require("./colors");
var import_motion = require("./motion");
var import_radius = require("./radius");
var import_shadows = require("./shadows");
var import_spacing = require("./spacing");
var import_typography = require("./typography");
var import_z_index = require("./z-index");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  amber,
  blue,
  brand,
  duration,
  durationCSS,
  durationSeconds,
  easing,
  easingCSS,
  fontFamily,
  fontSize,
  fontWeight,
  gray,
  green,
  letterSpacing,
  lineHeight,
  neutral,
  palettes,
  pure,
  radius,
  red,
  semanticDark,
  semanticLight,
  shadow,
  shadowDark,
  slate,
  spacing,
  spring,
  stagger,
  teal,
  typographyVariants,
  zIndex,
  zinc
});
