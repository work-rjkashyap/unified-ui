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
var tooltip_exports = {};
__export(tooltip_exports, {
  Tooltip: () => Tooltip,
  TooltipProvider: () => TooltipProvider
});
module.exports = __toCommonJS(tooltip_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_motion = require("../motion/index");
var import_cn = require("../utils/cn");
var import_framer_motion = require("framer-motion");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
function TooltipProvider({
  children,
  delayDuration = 300,
  skipDelayDuration = 100,
  ...rest
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Tooltip.Provider,
    {
      delayDuration,
      skipDelayDuration,
      ...rest,
      children
    }
  );
}
TooltipProvider.displayName = "TooltipProvider";
const TooltipContent = (0, import_react.forwardRef)(function TooltipContent2({
  className,
  showArrow = true,
  maxWidth = 220,
  sideOffset = 6,
  children,
  ...rest
}, ref) {
  const shouldReduce = (0, import_framer_motion.useReducedMotion)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Tooltip.Content,
    {
      ref,
      sideOffset,
      asChild: true,
      ...rest,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        import_framer_motion.motion.div,
        {
          className: (0, import_cn.cn)(
            // Layout
            "z-[var(--z-tooltip)]",
            "px-3 py-1.5",
            "overflow-hidden",
            // Visual
            "rounded-md",
            "border border-border",
            "bg-foreground text-background",
            "shadow-md",
            // Typography
            "text-xs leading-4",
            className
          ),
          style: { maxWidth },
          variants: shouldReduce ? void 0 : import_motion.fadeInFast.variants,
          initial: shouldReduce ? { opacity: 0 } : "initial",
          animate: shouldReduce ? { opacity: 1 } : "animate",
          exit: shouldReduce ? { opacity: 0 } : "exit",
          transition: shouldReduce ? { duration: 0.1 } : import_motion.fadeInFast.transition,
          "data-ds": "",
          "data-ds-component": "tooltip",
          "data-ds-animated": "",
          children: [
            children,
            showArrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_radix_ui.Tooltip.Arrow,
              {
                className: "fill-foreground",
                width: 8,
                height: 4
              }
            )
          ]
        }
      )
    }
  );
});
TooltipContent.displayName = "TooltipContent";
const Tooltip = (0, import_react.forwardRef)(
  function Tooltip2({
    content,
    children,
    side = "top",
    align = "center",
    sideOffset = 6,
    arrow = true,
    maxWidth = 220,
    delayDuration,
    open,
    onOpenChange,
    contentClassName
  }, _ref) {
    if (!content) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      import_radix_ui.Tooltip.Root,
      {
        open,
        onOpenChange,
        delayDuration,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Tooltip.Trigger, { asChild: true, children }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Tooltip.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            TooltipContent,
            {
              side,
              align,
              sideOffset,
              showArrow: arrow,
              maxWidth,
              className: contentClassName,
              children: content
            }
          ) })
        ]
      }
    );
  }
);
Tooltip.displayName = "Tooltip";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Tooltip,
  TooltipProvider
});
