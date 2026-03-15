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
var hover_card_exports = {};
__export(hover_card_exports, {
  HoverCard: () => HoverCard,
  HoverCardContent: () => HoverCardContent,
  HoverCardTrigger: () => HoverCardTrigger
});
module.exports = __toCommonJS(hover_card_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_motion = require("../motion/index");
var import_cn = require("../utils/cn");
var import_framer_motion = require("framer-motion");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
function HoverCard({
  openDelay = 200,
  closeDelay = 150,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.HoverCard.Root,
    {
      openDelay,
      closeDelay,
      ...props
    }
  );
}
HoverCard.displayName = "HoverCard";
const HoverCardTrigger = import_radix_ui.HoverCard.Trigger;
HoverCardTrigger.displayName = "HoverCardTrigger";
const HoverCardContent = (0, import_react.forwardRef)(function HoverCardContent2({
  side = "bottom",
  align = "center",
  sideOffset = 8,
  className,
  children,
  ...rest
}, ref) {
  const shouldReduce = (0, import_framer_motion.useReducedMotion)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.HoverCard.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.HoverCard.Content,
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
            "z-popover w-64 rounded-lg border border-border bg-popover p-4 shadow-lg outline-none",
            "text-sm text-popover-foreground",
            className
          ),
          variants: shouldReduce ? void 0 : import_motion.scaleIn.variants,
          initial: shouldReduce ? { opacity: 0 } : "initial",
          animate: shouldReduce ? { opacity: 1 } : "animate",
          exit: shouldReduce ? { opacity: 0 } : "exit",
          transition: shouldReduce ? { duration: 0.12 } : import_motion.scaleIn.transition,
          "data-ds": "",
          "data-ds-component": "hover-card-content",
          "data-ds-animated": "",
          children: [
            children,
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.HoverCard.Arrow, { className: "fill-border" })
          ]
        }
      )
    }
  ) });
});
HoverCardContent.displayName = "HoverCardContent";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
});
