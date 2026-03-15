"use client";
import { useMemo, useSyncExternalStore } from "react";
import { motionProps, withReducedMotion } from "./presets";
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
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
function useMotion(preset) {
  const prefersReduced = useReducedMotion();
  return useMemo(
    () => withReducedMotion(preset, prefersReduced),
    [preset, prefersReduced]
  );
}
function useMotionProps(preset) {
  const safePreset = useMotion(preset);
  return useMemo(() => motionProps(safePreset), [safePreset]);
}
const INSTANT_SPRING = {
  stiffness: 1e4,
  damping: 1e4,
  mass: 0.01
};
function useMotionSpringConfig(config) {
  const prefersReduced = useReducedMotion();
  return useMemo(
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
export {
  MotionSafe,
  useMotion,
  useMotionProps,
  useMotionSpringConfig,
  useReducedMotion
};
