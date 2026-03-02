'use strict';

// src/tokens/motion.ts
var duration = {
  /** Instant feedback — hover states, color changes */
  instant: 0,
  /** Micro-interactions — focus rings, icon swaps */
  fast: 100,
  /** Snappy transitions — tooltips, small toggles */
  moderate: 150,
  /** Standard transitions — dropdowns, accordions, tabs */
  normal: 200,
  /** Emphasis transitions — modals, drawers, slide-ins */
  slow: 300,
  /** Complex orchestrated animations — page transitions */
  slower: 400,
  /** Long-form animations — skeleton loaders, progress */
  slowest: 500
};
var durationCSS = Object.fromEntries(
  Object.entries(duration).map(([key, value]) => [key, `${value}ms`])
);
var durationSeconds = Object.fromEntries(
  Object.entries(duration).map(([key, value]) => [key, value / 1e3])
);
var easing = {
  /** General-purpose — equal acceleration and deceleration */
  standard: [0.2, 0, 0.38, 0.9],
  /** Enter animations — element arriving on screen */
  decelerate: [0, 0, 0.2, 1],
  /** Exit animations — element leaving the screen */
  accelerate: [0.4, 0, 1, 1],
  /** Attention / emphasis — overshoots slightly for impact */
  emphasize: [0, 0, 0.15, 1],
  /** Constant rate — spinners, progress bars */
  linear: [0, 0, 1, 1],
  /** Spring-like snap — toggle switches, checkboxes */
  snap: [0.2, 0, 0, 1]
};
var easingCSS = Object.fromEntries(
  Object.entries(easing).map(([key, value]) => [
    key,
    `cubic-bezier(${value.join(", ")})`
  ])
);
var spring = {
  /** Gentle — tooltips, small popovers */
  gentle: {
    type: "spring",
    stiffness: 150,
    damping: 20,
    mass: 1
  },
  /** Snappy — buttons, toggles, micro-interactions */
  snappy: {
    type: "spring",
    stiffness: 300,
    damping: 25,
    mass: 0.8
  },
  /** Bouncy — playful emphasis, celebrations */
  bouncy: {
    type: "spring",
    stiffness: 400,
    damping: 15,
    mass: 0.8
  },
  /** Stiff — immediate, no overshoot (dialogs, drawers) */
  stiff: {
    type: "spring",
    stiffness: 500,
    damping: 35,
    mass: 1
  }
};
var stagger = {
  /** Rapid list items — 30ms between each */
  fast: 0.03,
  /** Standard stagger — 50ms between each */
  normal: 0.05,
  /** Deliberate reveal — 80ms between each */
  slow: 0.08
};

exports.duration = duration;
exports.durationCSS = durationCSS;
exports.durationSeconds = durationSeconds;
exports.easing = easing;
exports.easingCSS = easingCSS;
exports.spring = spring;
exports.stagger = stagger;
