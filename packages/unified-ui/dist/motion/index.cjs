"use client";
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
var motion_exports = {};
__export(motion_exports, {
  MotionSafe: () => import_hooks.MotionSafe,
  blurIn: () => import_presets.blurIn,
  blurInSubtle: () => import_presets.blurInSubtle,
  countUp: () => import_presets.countUp,
  crossfade: () => import_presets.crossfade,
  dragDismiss: () => import_presets.dragDismiss,
  duration: () => import_motion.duration,
  durationCSS: () => import_motion.durationCSS,
  durationSeconds: () => import_motion.durationSeconds,
  easing: () => import_motion.easing,
  easingCSS: () => import_motion.easingCSS,
  expandHeight: () => import_presets.expandHeight,
  expandHeightSlow: () => import_presets.expandHeightSlow,
  fadeIn: () => import_presets.fadeIn,
  fadeInFast: () => import_presets.fadeInFast,
  fadeInSlow: () => import_presets.fadeInSlow,
  hoverLift: () => import_presets.hoverLift,
  hoverScale: () => import_presets.hoverScale,
  modalContent: () => import_presets.modalContent,
  modalContentSpring: () => import_presets.modalContentSpring,
  motionProps: () => import_presets.motionProps,
  numberRoll: () => import_presets.numberRoll,
  overlayBackdrop: () => import_presets.overlayBackdrop,
  pop: () => import_presets.pop,
  popSubtle: () => import_presets.popSubtle,
  press: () => import_presets.press,
  pulse: () => import_presets.pulse,
  reduceMotion: () => import_presets.reduceMotion,
  revealMask: () => import_presets.revealMask,
  scaleIn: () => import_presets.scaleIn,
  scaleInLg: () => import_presets.scaleInLg,
  scaleInSpring: () => import_presets.scaleInSpring,
  shakeX: () => import_presets.shakeX,
  slideDown: () => import_presets.slideDown,
  slideDownSm: () => import_presets.slideDownSm,
  slideInFromBottom: () => import_presets.slideInFromBottom,
  slideInFromLeft: () => import_presets.slideInFromLeft,
  slideInFromRight: () => import_presets.slideInFromRight,
  slideLeft: () => import_presets.slideLeft,
  slidePanelBottom: () => import_presets.slidePanelBottom,
  slidePanelLeft: () => import_presets.slidePanelLeft,
  slidePanelRight: () => import_presets.slidePanelRight,
  slidePanelTop: () => import_presets.slidePanelTop,
  slideRight: () => import_presets.slideRight,
  slideUp: () => import_presets.slideUp,
  slideUpLg: () => import_presets.slideUpLg,
  slideUpSm: () => import_presets.slideUpSm,
  slideUpSpring: () => import_presets.slideUpSpring,
  spin: () => import_presets.spin,
  spring: () => import_motion.spring,
  springHover: () => import_presets.springHover,
  springPress: () => import_presets.springPress,
  stagger: () => import_motion.stagger,
  staggerContainer: () => import_presets.staggerContainer,
  staggerContainerFast: () => import_presets.staggerContainerFast,
  staggerContainerSlow: () => import_presets.staggerContainerSlow,
  tapScale: () => import_presets.tapScale,
  toastSlideIn: () => import_presets.toastSlideIn,
  toastSlideUp: () => import_presets.toastSlideUp,
  useMotion: () => import_hooks.useMotion,
  useMotionProps: () => import_hooks.useMotionProps,
  useMotionSpringConfig: () => import_hooks.useMotionSpringConfig,
  useReducedMotion: () => import_hooks.useReducedMotion,
  withReducedMotion: () => import_presets.withReducedMotion
});
module.exports = __toCommonJS(motion_exports);
var import_motion = require("../tokens/motion");
var import_hooks = require("./hooks");
var import_presets = require("./presets");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MotionSafe,
  blurIn,
  blurInSubtle,
  countUp,
  crossfade,
  dragDismiss,
  duration,
  durationCSS,
  durationSeconds,
  easing,
  easingCSS,
  expandHeight,
  expandHeightSlow,
  fadeIn,
  fadeInFast,
  fadeInSlow,
  hoverLift,
  hoverScale,
  modalContent,
  modalContentSpring,
  motionProps,
  numberRoll,
  overlayBackdrop,
  pop,
  popSubtle,
  press,
  pulse,
  reduceMotion,
  revealMask,
  scaleIn,
  scaleInLg,
  scaleInSpring,
  shakeX,
  slideDown,
  slideDownSm,
  slideInFromBottom,
  slideInFromLeft,
  slideInFromRight,
  slideLeft,
  slidePanelBottom,
  slidePanelLeft,
  slidePanelRight,
  slidePanelTop,
  slideRight,
  slideUp,
  slideUpLg,
  slideUpSm,
  slideUpSpring,
  spin,
  spring,
  springHover,
  springPress,
  stagger,
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  tapScale,
  toastSlideIn,
  toastSlideUp,
  useMotion,
  useMotionProps,
  useMotionSpringConfig,
  useReducedMotion,
  withReducedMotion
});
