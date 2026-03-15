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
var collapsible_exports = {};
__export(collapsible_exports, {
  Collapsible: () => Collapsible,
  CollapsibleContent: () => CollapsibleContent,
  CollapsibleTrigger: () => CollapsibleTrigger,
  useCollapsibleContext: () => useCollapsibleContext
});
module.exports = __toCommonJS(collapsible_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_framer_motion = require("framer-motion");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
const CollapsibleContext = (0, import_react.createContext)({
  open: false,
  contentId: ""
});
function useCollapsibleContext() {
  return (0, import_react.useContext)(CollapsibleContext);
}
const collapseTransition = {
  duration: 0.2,
  ease: [0.25, 0.1, 0.25, 1]
};
const reducedMotionTransition = {
  duration: 0.01,
  ease: "linear"
};
function Collapsible({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  className,
  children,
  ...rest
}) {
  const contentId = (0, import_react.useId)();
  const isControlled = openProp !== void 0;
  const [internalOpen, setInternalOpen] = (0, import_react.useState)(defaultOpen);
  const open = isControlled ? openProp : internalOpen;
  const handleOpenChange = (0, import_react.useCallback)(
    (value) => {
      if (!isControlled) {
        setInternalOpen(value);
      }
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleContext.Provider, { value: { open, contentId }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Collapsible.Root,
    {
      open,
      onOpenChange: handleOpenChange,
      disabled,
      className: (0, import_cn.cn)(className),
      "data-ds": "",
      "data-ds-component": "collapsible",
      ...open ? { "data-ds-open": "" } : {},
      ...rest,
      children
    }
  ) });
}
Collapsible.displayName = "Collapsible";
const CollapsibleTrigger = (0, import_react.forwardRef)(function CollapsibleTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Collapsible.Trigger,
    {
      ref,
      className: (0, import_cn.cn)(className),
      "data-ds": "",
      "data-ds-component": "collapsible-trigger",
      ...rest
    }
  );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";
const MotionDiv = import_framer_motion.motion.div;
function AnimatedCollapsibleInner({
  duration = 0.2,
  className,
  children
}) {
  const prefersReduced = (0, import_framer_motion.useReducedMotion)();
  const transition = prefersReduced ? reducedMotionTransition : { ...collapseTransition, duration };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    MotionDiv,
    {
      initial: { height: 0, opacity: 0, overflow: "hidden" },
      animate: {
        height: "auto",
        opacity: 1,
        overflow: "hidden",
        transitionEnd: { overflow: "visible" }
      },
      exit: { height: 0, opacity: 0, overflow: "hidden" },
      transition,
      className: (0, import_cn.cn)(className),
      "data-ds": "",
      "data-ds-component": "collapsible-content",
      children
    }
  );
}
const CollapsibleContent = (0, import_react.forwardRef)(function CollapsibleContent2({ duration = 0.2, forceMount = false, className, children, ...rest }, ref) {
  const { open } = useCollapsibleContext();
  if (forceMount) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_radix_ui.Collapsible.Content, { forceMount: true, ref, ...rest, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { initial: false, children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCollapsibleInner, { duration, className, children }) }),
      !open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: 0, overflow: "hidden" }, "aria-hidden": "true" })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { initial: false, children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Collapsible.Content, { forceMount: true, ref, ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCollapsibleInner, { duration, className, children }) }) });
});
CollapsibleContent.displayName = "CollapsibleContent";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  useCollapsibleContext
});
