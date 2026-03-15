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
var empty_state_exports = {};
__export(empty_state_exports, {
  EmptyState: () => EmptyState
});
module.exports = __toCommonJS(empty_state_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_motion = require("../motion/index");
var import_cn = require("../utils/cn");
var import_framer_motion = require("framer-motion");
var import_react = require("react");
function InboxIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" })
      ]
    }
  );
}
const EmptyState = (0, import_react.forwardRef)(
  function EmptyState2({
    icon,
    title,
    description,
    action,
    animated = true,
    className,
    children,
    ...rest
  }, ref) {
    const shouldReduce = (0, import_framer_motion.useReducedMotion)();
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref,
        className: (0, import_cn.cn)(
          "flex flex-col items-center justify-center text-center gap-4 py-12 px-6",
          className
        ),
        "data-ds": "",
        "data-ds-component": "empty-state",
        "data-ds-animated": animated ? "" : void 0,
        ...rest,
        children: [
          (icon !== void 0 ? icon : true) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_framer_motion.motion.div,
            {
              className: "flex items-center justify-center size-16 rounded-full bg-muted text-muted-foreground",
              variants: animated && !shouldReduce ? import_motion.scaleIn.variants : void 0,
              initial: animated && !shouldReduce ? "initial" : void 0,
              animate: animated && !shouldReduce ? "animate" : void 0,
              transition: animated && !shouldReduce ? import_motion.scaleIn.transition : void 0,
              "data-ds-animated": animated ? "" : void 0,
              children: icon ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InboxIcon, { className: "size-8" })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            import_framer_motion.motion.div,
            {
              className: "flex flex-col gap-1.5 max-w-xs",
              variants: animated && !shouldReduce ? import_motion.fadeIn.variants : void 0,
              initial: animated && !shouldReduce ? "initial" : void 0,
              animate: animated && !shouldReduce ? "animate" : void 0,
              transition: animated && !shouldReduce ? { ...import_motion.fadeIn.transition, delay: 0.15 } : void 0,
              "data-ds-animated": animated ? "" : void 0,
              children: [
                title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-base font-semibold text-foreground leading-5", children: title }),
                description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-muted-foreground leading-5", children: description })
              ]
            }
          ),
          children,
          action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_framer_motion.motion.div,
            {
              variants: animated && !shouldReduce ? import_motion.fadeIn.variants : void 0,
              initial: animated && !shouldReduce ? "initial" : void 0,
              animate: animated && !shouldReduce ? "animate" : void 0,
              transition: animated && !shouldReduce ? { ...import_motion.fadeIn.transition, delay: 0.25 } : void 0,
              "data-ds-animated": animated ? "" : void 0,
              children: action
            }
          )
        ]
      }
    );
  }
);
EmptyState.displayName = "EmptyState";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmptyState
});
