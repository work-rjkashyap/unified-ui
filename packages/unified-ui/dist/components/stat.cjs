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
var stat_exports = {};
__export(stat_exports, {
  Stat: () => Stat,
  statVariants: () => statVariants
});
module.exports = __toCommonJS(stat_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_motion = require("../motion/index");
var import_cn = require("../utils/cn");
var import_class_variance_authority = require("class-variance-authority");
var import_framer_motion = require("framer-motion");
var import_react = require("react");
const statVariants = (0, import_class_variance_authority.cva)([
  "rounded-lg border border-border bg-card p-4 flex flex-col gap-2"
]);
function TrendUpIcon({ className }) {
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m22 7-8.5 8.5-5-5L2 17" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 7h6v6" })
      ]
    }
  );
}
function TrendDownIcon({ className }) {
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m22 17-8.5-8.5-5 5L2 7" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 17h6v-6" })
      ]
    }
  );
}
function AnimatedNumber({
  value,
  prefix,
  suffix
}) {
  const shouldReduce = (0, import_framer_motion.useReducedMotion)();
  const motionVal = (0, import_framer_motion.useMotionValue)(0);
  (0, import_react.useEffect)(() => {
    if (shouldReduce) {
      motionVal.set(value);
      return;
    }
    const controls = (0, import_framer_motion.animate)(motionVal, value, {
      duration: 1,
      ease: [0.4, 0, 0.2, 1]
    });
    return controls.stop;
  }, [value, motionVal, shouldReduce]);
  const rounded = (0, import_framer_motion.useTransform)(
    motionVal,
    (v) => `${prefix ?? ""}${Math.round(v).toLocaleString()}${suffix ?? ""}`
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.motion.span, { "data-ds-animated": "", children: rounded });
}
const Stat = (0, import_react.forwardRef)(function Stat2({
  label,
  value,
  previousValue,
  trend,
  trendLabel,
  sparkline,
  prefix,
  suffix,
  animated = true,
  className,
  ...rest
}, ref) {
  const shouldReduce = (0, import_framer_motion.useReducedMotion)();
  const isNumeric = typeof value === "number";
  const trendColor = trend === "up" ? "text-success" : trend === "down" ? "text-danger" : "text-muted-foreground";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      ref,
      className: (0, import_cn.cn)(statVariants(), className),
      "data-ds": "",
      "data-ds-component": "stat",
      "data-ds-trend": trend,
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-sm font-medium text-muted-foreground leading-none", children: label }),
          sparkline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 flex items-center", children: sparkline })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_framer_motion.motion.div,
          {
            className: "text-2xl font-bold text-foreground leading-none tabular-nums",
            variants: animated && !shouldReduce ? import_motion.countUp.variants : void 0,
            initial: animated && !shouldReduce ? "initial" : void 0,
            animate: animated && !shouldReduce ? "animate" : void 0,
            transition: animated && !shouldReduce ? import_motion.countUp.transition : void 0,
            "data-ds-animated": animated ? "" : void 0,
            children: isNumeric && animated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              AnimatedNumber,
              {
                value,
                prefix,
                suffix
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
              prefix,
              String(value),
              suffix
            ] })
          }
        ),
        (trend || trendLabel) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          import_framer_motion.motion.div,
          {
            className: (0, import_cn.cn)(
              "flex items-center gap-1 text-xs font-medium",
              trendColor
            ),
            variants: animated && !shouldReduce ? import_motion.slideUpSm.variants : void 0,
            initial: animated && !shouldReduce ? "initial" : void 0,
            animate: animated && !shouldReduce ? "animate" : void 0,
            transition: animated && !shouldReduce ? { ...import_motion.slideUpSm.transition, delay: 0.3 } : void 0,
            "data-ds-animated": animated ? "" : void 0,
            children: [
              trend === "up" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendUpIcon, { className: "size-3.5" }),
              trend === "down" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendDownIcon, { className: "size-3.5" }),
              trendLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: trendLabel })
            ]
          }
        )
      ]
    }
  );
});
Stat.displayName = "Stat";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Stat,
  statVariants
});
