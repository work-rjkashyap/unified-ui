import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
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
export {
  cn,
  composeRefs,
  dsAttr,
  dsColorVar,
  dsStateAttr,
  dsVar,
  mergeSlots,
  noop,
  typedKeys
};
