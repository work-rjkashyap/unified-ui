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
var banner_exports = {};
__export(banner_exports, {
  Banner: () => Banner,
  bannerVariants: () => bannerVariants
});
module.exports = __toCommonJS(banner_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_motion = require("../motion/index");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_framer_motion = require("framer-motion");
var import_react = require("react");
const bannerVariants = (0, import_class_variance_authority.cva)(
  ["w-full flex items-center gap-3 px-4 py-3 text-sm font-medium"],
  {
    variants: {
      variant: {
        default: "bg-foreground text-background",
        info: "bg-info text-info-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        danger: "bg-danger text-danger-foreground",
        primary: "bg-primary text-primary-foreground"
      },
      position: {
        top: "sticky top-0 left-0 right-0 z-banner",
        bottom: "sticky bottom-0 left-0 right-0 z-banner",
        inline: "rounded-md"
      }
    },
    defaultVariants: { variant: "default", position: "inline" }
  }
);
function XIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
const Banner = (0, import_react.forwardRef)(function Banner2({
  variant = "default",
  position = "inline",
  dismissible = false,
  onDismiss,
  dismissLabel = "Dismiss",
  icon,
  action,
  visible: controlledVisible,
  defaultVisible = true,
  className,
  children,
  id,
  style,
  role,
  "aria-label": ariaLabel,
  "aria-live": ariaLive
}, ref) {
  const shouldReduce = (0, import_framer_motion.useReducedMotion)();
  const [internalVisible, setInternalVisible] = (0, import_react.useState)(defaultVisible);
  const isVisible = controlledVisible !== void 0 ? controlledVisible : internalVisible;
  const handleDismiss = () => {
    if (controlledVisible === void 0) setInternalVisible(false);
    onDismiss?.();
  };
  const slidePreset = position === "bottom" ? import_motion.slideUp : import_motion.slideDown;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { initial: false, children: isVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_framer_motion.motion.div,
    {
      ref,
      className: (0, import_cn.cn)(bannerVariants({ variant, position }), className),
      variants: shouldReduce ? void 0 : slidePreset.variants,
      initial: shouldReduce ? { opacity: 0 } : "initial",
      animate: shouldReduce ? { opacity: 1 } : "animate",
      exit: shouldReduce ? { opacity: 0 } : "exit",
      transition: shouldReduce ? { duration: 0.2 } : slidePreset.transition,
      "data-ds": "",
      "data-ds-component": "banner",
      "data-ds-variant": variant,
      "data-ds-position": position,
      "data-ds-animated": "",
      id,
      style,
      role,
      "aria-label": ariaLabel,
      "aria-live": ariaLive,
      children: [
        icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "shrink-0", children: icon }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1 min-w-0", children }),
        action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "shrink-0", children: action }),
        dismissible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: handleDismiss,
            className: (0, import_cn.cn)(
              "shrink-0 inline-flex items-center justify-center size-6 rounded-sm",
              "opacity-70 hover:opacity-100 transition-opacity duration-fast",
              import_focus_ring.focusRingClasses
            ),
            "aria-label": dismissLabel,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XIcon, { className: "size-4" })
          }
        )
      ]
    }
  ) });
});
Banner.displayName = "Banner";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Banner,
  bannerVariants
});
