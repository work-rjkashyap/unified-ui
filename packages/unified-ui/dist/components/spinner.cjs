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
var spinner_exports = {};
__export(spinner_exports, {
  Spinner: () => Spinner,
  spinnerVariants: () => spinnerVariants
});
module.exports = __toCommonJS(spinner_exports);
var import_jsx_runtime = (
  // Reduced motion fallback — uses CSS animate-spin (a simple
  // rotation that the browser can optimize or skip per OS settings)
  require("react/jsx-runtime")
);
var import_cn = require("../utils/cn");
var import_class_variance_authority = require("class-variance-authority");
var import_framer_motion = require("framer-motion");
var import_react = require("react");
const spinnerVariants = (0, import_class_variance_authority.cva)(
  // Base styles — shared across all variants and sizes
  [
    // Ensure the spinner is inline and doesn't collapse
    "shrink-0"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Extra Small — for inline indicators, buttons, badges.
         * 14px (size-3.5)
         */
        xs: "size-3.5",
        /**
         * Small — for compact UIs, table cells, small buttons.
         * 16px (size-4)
         */
        sm: "size-4",
        /**
         * Medium — default size for most loading states.
         * 20px (size-5)
         */
        md: "size-5",
        /**
         * Large — for prominent loading indicators, empty states.
         * 24px (size-6)
         */
        lg: "size-6"
      },
      // -----------------------------------------------------------------
      // Color Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Default — uses the current text color.
         * Inherits from the parent element's color.
         */
        default: "text-current",
        /**
         * Primary — uses the brand/primary color.
         * For prominent loading states on neutral backgrounds.
         */
        primary: "text-primary",
        /**
         * Secondary — uses the secondary/foreground color.
         * For subtle loading indicators.
         */
        secondary: "text-foreground",
        /**
         * Muted — uses the muted-foreground color.
         * For very subtle, non-intrusive loading states.
         */
        muted: "text-muted-foreground"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default"
    }
  }
);
const labelSizeMap = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-sm"
};
const spinTransition = {
  rotate: {
    duration: 0.8,
    ease: "linear",
    repeat: Number.POSITIVE_INFINITY
  }
};
const spinAnimate = {
  rotate: 360
};
const Spinner = (0, import_react.forwardRef)(
  function Spinner2({
    size = "md",
    variant = "default",
    label,
    labelPosition = "right",
    "aria-label": ariaLabel,
    strokeWidth = 2.5,
    className,
    ...rest
  }, ref) {
    const prefersReduced = (0, import_framer_motion.useReducedMotion)();
    const resolvedAriaLabel = ariaLabel ?? (typeof label === "string" ? label : "Loading");
    const MotionSvg = import_framer_motion.motion.svg;
    const spinnerElement = prefersReduced ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "svg",
      {
        className: (0, import_cn.cn)("animate-spin", spinnerVariants({ size, variant })),
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "circle",
            {
              cx: "12",
              cy: "12",
              r: "10",
              stroke: "currentColor",
              strokeWidth,
              className: "opacity-20"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              d: "M12 2a10 10 0 0 1 10 10",
              stroke: "currentColor",
              strokeWidth,
              strokeLinecap: "round"
            }
          )
        ]
      }
    ) : (
      // Full Framer Motion animation
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        MotionSvg,
        {
          className: (0, import_cn.cn)(spinnerVariants({ size, variant })),
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          animate: spinAnimate,
          transition: spinTransition,
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "circle",
              {
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "currentColor",
                strokeWidth,
                className: "opacity-20"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "path",
              {
                d: "M12 2a10 10 0 0 1 10 10",
                stroke: "currentColor",
                strokeWidth,
                strokeLinecap: "round"
              }
            )
          ]
        }
      )
    );
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref,
        role: "status",
        "aria-label": resolvedAriaLabel,
        className: (0, import_cn.cn)(
          "inline-flex items-center",
          labelPosition === "bottom" ? "flex-col gap-2" : "flex-row gap-2",
          className
        ),
        "data-ds": "",
        "data-ds-component": "spinner",
        "data-ds-size": size,
        "data-ds-variant": variant,
        ...rest,
        children: [
          spinnerElement,
          label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              className: (0, import_cn.cn)(
                "leading-5",
                labelSizeMap[size],
                variant === "muted" ? "text-muted-foreground" : "text-foreground"
              ),
              children: label
            }
          ),
          !label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "sr-only", children: resolvedAriaLabel })
        ]
      }
    );
  }
);
Spinner.displayName = "Spinner";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Spinner,
  spinnerVariants
});
