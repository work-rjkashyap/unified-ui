'use strict';

// src/utils/focus-ring.ts
var focusRingClasses = "focus-visible:outline-none focus-visible:border-border-strong";
var focusRingClassList = [
  "focus-visible:outline-none",
  "focus-visible:border-border-strong"
];
var focusRingInsetClasses = "focus-visible:outline-none focus-visible:border-border-strong";
var focusRingInsetClassList = [
  "focus-visible:outline-none",
  "focus-visible:border-border-strong"
];
var focusRingCompactClasses = "focus-visible:outline-none focus-visible:border-border-strong";
var focusRingCompactClassList = [
  "focus-visible:outline-none",
  "focus-visible:border-border-strong"
];
var focusRingVariantOverrides = {
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
var focusRingGroupTriggerClasses = "focus-visible:outline-none";
var focusRingGroupRingClasses = "group-focus-visible:border-border-strong";
var focusWithinRingClasses = "focus-within:outline-none focus-within:border-border-strong";
var focusWithinRingClassList = [
  "focus-within:outline-none",
  "focus-within:border-border-strong"
];

exports.focusRingClassList = focusRingClassList;
exports.focusRingClasses = focusRingClasses;
exports.focusRingCompactClassList = focusRingCompactClassList;
exports.focusRingCompactClasses = focusRingCompactClasses;
exports.focusRingGroupRingClasses = focusRingGroupRingClasses;
exports.focusRingGroupTriggerClasses = focusRingGroupTriggerClasses;
exports.focusRingInsetClassList = focusRingInsetClassList;
exports.focusRingInsetClasses = focusRingInsetClasses;
exports.focusRingVariantOverrides = focusRingVariantOverrides;
exports.focusWithinRingClassList = focusWithinRingClassList;
exports.focusWithinRingClasses = focusWithinRingClasses;
