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
var hooks_exports = {};
__export(hooks_exports, {
  MotionSafe: () => MotionSafe,
  useMotion: () => useMotion,
  useMotionProps: () => useMotionProps,
  useMotionSpringConfig: () => useMotionSpringConfig,
  useReducedMotion: () => useReducedMotion
});
module.exports = __toCommonJS(hooks_exports);
var import_react = require("react");
var import_presets = require("./presets");
let mediaQuery = null;
function getMediaQuery() {
  if (typeof window === "undefined") return null;
  if (!mediaQuery) {
    mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  }
  return mediaQuery;
}
function getSnapshot() {
  const mq = getMediaQuery();
  return mq ? mq.matches : false;
}
function getServerSnapshot() {
  return false;
}
function subscribe(callback) {
  const mq = getMediaQuery();
  if (!mq) return () => {
  };
  mq.addEventListener("change", callback);
  return () => {
    mq.removeEventListener("change", callback);
  };
}
function useReducedMotion() {
  return (0, import_react.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot);
}
function useMotion(preset) {
  const prefersReduced = useReducedMotion();
  return (0, import_react.useMemo)(
    () => (0, import_presets.withReducedMotion)(preset, prefersReduced),
    [preset, prefersReduced]
  );
}
function useMotionProps(preset) {
  const safePreset = useMotion(preset);
  return (0, import_react.useMemo)(() => (0, import_presets.motionProps)(safePreset), [safePreset]);
}
const INSTANT_SPRING = {
  stiffness: 1e4,
  damping: 1e4,
  mass: 0.01
};
function useMotionSpringConfig(config) {
  const prefersReduced = useReducedMotion();
  return (0, import_react.useMemo)(
    () => prefersReduced ? INSTANT_SPRING : config,
    [prefersReduced, config]
  );
}
function MotionSafe({ children, fallback }) {
  const prefersReduced = useReducedMotion();
  if (typeof children === "function") {
    return children(prefersReduced);
  }
  if (prefersReduced && fallback !== void 0) {
    return fallback;
  }
  return children;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MotionSafe,
  useMotion,
  useMotionProps,
  useMotionSpringConfig,
  useReducedMotion
});
