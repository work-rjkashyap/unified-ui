"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { countUp, slideUpSm } from "../motion/index";
import { cn } from "../utils/cn";
import { cva } from "class-variance-authority";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform
} from "framer-motion";
import { forwardRef, useEffect } from "react";
const statVariants = cva([
  "rounded-lg border border-border bg-card p-4 flex flex-col gap-2"
]);
function TrendUpIcon({ className }) {
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("path", { d: "m22 7-8.5 8.5-5-5L2 17" }),
        /* @__PURE__ */ jsx("path", { d: "M16 7h6v6" })
      ]
    }
  );
}
function TrendDownIcon({ className }) {
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("path", { d: "m22 17-8.5-8.5-5 5L2 7" }),
        /* @__PURE__ */ jsx("path", { d: "M16 17h6v-6" })
      ]
    }
  );
}
function AnimatedNumber({
  value,
  prefix,
  suffix
}) {
  const shouldReduce = useReducedMotion();
  const motionVal = useMotionValue(0);
  useEffect(() => {
    if (shouldReduce) {
      motionVal.set(value);
      return;
    }
    const controls = animate(motionVal, value, {
      duration: 1,
      ease: [0.4, 0, 0.2, 1]
    });
    return controls.stop;
  }, [value, motionVal, shouldReduce]);
  const rounded = useTransform(
    motionVal,
    (v) => `${prefix ?? ""}${Math.round(v).toLocaleString()}${suffix ?? ""}`
  );
  return /* @__PURE__ */ jsx(motion.span, { "data-ds-animated": "", children: rounded });
}
const Stat = forwardRef(function Stat2({
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
  const shouldReduce = useReducedMotion();
  const isNumeric = typeof value === "number";
  const trendColor = trend === "up" ? "text-success" : trend === "down" ? "text-danger" : "text-muted-foreground";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn(statVariants(), className),
      "data-ds": "",
      "data-ds-component": "stat",
      "data-ds-trend": trend,
      ...rest,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-muted-foreground leading-none", children: label }),
          sparkline && /* @__PURE__ */ jsx("div", { className: "h-8 flex items-center", children: sparkline })
        ] }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "text-2xl font-bold text-foreground leading-none tabular-nums",
            variants: animated && !shouldReduce ? countUp.variants : void 0,
            initial: animated && !shouldReduce ? "initial" : void 0,
            animate: animated && !shouldReduce ? "animate" : void 0,
            transition: animated && !shouldReduce ? countUp.transition : void 0,
            "data-ds-animated": animated ? "" : void 0,
            children: isNumeric && animated ? /* @__PURE__ */ jsx(
              AnimatedNumber,
              {
                value,
                prefix,
                suffix
              }
            ) : /* @__PURE__ */ jsxs("span", { children: [
              prefix,
              String(value),
              suffix
            ] })
          }
        ),
        (trend || trendLabel) && /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: cn(
              "flex items-center gap-1 text-xs font-medium",
              trendColor
            ),
            variants: animated && !shouldReduce ? slideUpSm.variants : void 0,
            initial: animated && !shouldReduce ? "initial" : void 0,
            animate: animated && !shouldReduce ? "animate" : void 0,
            transition: animated && !shouldReduce ? { ...slideUpSm.transition, delay: 0.3 } : void 0,
            "data-ds-animated": animated ? "" : void 0,
            children: [
              trend === "up" && /* @__PURE__ */ jsx(TrendUpIcon, { className: "size-3.5" }),
              trend === "down" && /* @__PURE__ */ jsx(TrendDownIcon, { className: "size-3.5" }),
              trendLabel && /* @__PURE__ */ jsx("span", { children: trendLabel })
            ]
          }
        )
      ]
    }
  );
});
Stat.displayName = "Stat";
export {
  Stat,
  statVariants
};
