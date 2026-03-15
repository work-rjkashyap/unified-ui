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
var popover_exports = {};
__export(popover_exports, {
  Popover: () => Popover,
  PopoverArrow: () => PopoverArrow,
  PopoverClose: () => PopoverClose,
  PopoverContent: () => PopoverContent,
  PopoverTrigger: () => PopoverTrigger
});
module.exports = __toCommonJS(popover_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_motion = require("../motion/index");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_framer_motion = require("framer-motion");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
function CloseIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
function Popover({ children, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Popover.Root, { ...rest, children });
}
Popover.displayName = "Popover";
const PopoverTrigger = (0, import_react.forwardRef)(function PopoverTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Popover.Trigger,
    {
      ref,
      className,
      "data-ds": "",
      "data-ds-component": "popover-trigger",
      ...rest
    }
  );
});
PopoverTrigger.displayName = "PopoverTrigger";
const PopoverContent = (0, import_react.forwardRef)(function PopoverContent2({
  className,
  showClose = false,
  arrow = false,
  arrowClassName,
  children,
  side = "bottom",
  align = "center",
  sideOffset = 4,
  ...rest
}, ref) {
  const shouldReduce = (0, import_framer_motion.useReducedMotion)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Popover.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Popover.Content,
    {
      ref,
      side,
      align,
      sideOffset,
      asChild: true,
      ...rest,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        import_framer_motion.motion.div,
        {
          className: (0, import_cn.cn)(
            // Layout & sizing
            "w-72",
            // Z-index
            "z-[var(--z-popover)]",
            // Visual
            "rounded-md",
            "border border-border",
            "bg-background",
            "p-4",
            "shadow-lg",
            // Text
            "text-sm text-foreground",
            // Outline
            "outline-none",
            className
          ),
          variants: shouldReduce ? void 0 : import_motion.scaleIn.variants,
          initial: shouldReduce ? { opacity: 0 } : "initial",
          animate: shouldReduce ? { opacity: 1 } : "animate",
          exit: shouldReduce ? { opacity: 0 } : "exit",
          transition: shouldReduce ? { duration: 0.15 } : import_motion.scaleIn.transition,
          "data-ds": "",
          "data-ds-component": "popover-content",
          "data-ds-animated": "",
          children: [
            children,
            showClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_radix_ui.Popover.Close,
              {
                className: (0, import_cn.cn)(
                  "absolute right-2 top-2",
                  "inline-flex items-center justify-center",
                  "rounded-sm p-1",
                  "text-muted-foreground hover:text-foreground",
                  "transition-colors duration-fast",
                  import_focus_ring.focusRingInsetClasses
                ),
                "aria-label": "Close",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, { className: "size-4" })
              }
            ),
            arrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_radix_ui.Popover.Arrow,
              {
                className: (0, import_cn.cn)("fill-background", arrowClassName),
                width: 12,
                height: 6
              }
            )
          ]
        }
      )
    }
  ) });
});
PopoverContent.displayName = "PopoverContent";
const PopoverClose = (0, import_react.forwardRef)(function PopoverClose2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Popover.Close,
    {
      ref,
      className: (0, import_cn.cn)(
        "inline-flex items-center justify-center",
        "rounded-sm",
        "text-muted-foreground hover:text-foreground",
        "transition-colors duration-fast",
        import_focus_ring.focusRingInsetClasses,
        className
      ),
      "data-ds": "",
      "data-ds-component": "popover-close",
      ...rest
    }
  );
});
PopoverClose.displayName = "PopoverClose";
const PopoverArrow = (0, import_react.forwardRef)(function PopoverArrow2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Popover.Arrow,
    {
      ref,
      className: (0, import_cn.cn)("fill-background", className),
      width: 12,
      height: 6,
      ...rest
    }
  );
});
PopoverArrow.displayName = "PopoverArrow";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
});
