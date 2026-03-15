"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { fadeIn, scaleIn } from "../motion/index";
import { cn } from "../utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import { forwardRef } from "react";
function InboxIcon({ className }) {
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12" }),
        /* @__PURE__ */ jsx("path", { d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" })
      ]
    }
  );
}
const EmptyState = forwardRef(
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
    const shouldReduce = useReducedMotion();
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn(
          "flex flex-col items-center justify-center text-center gap-4 py-12 px-6",
          className
        ),
        "data-ds": "",
        "data-ds-component": "empty-state",
        "data-ds-animated": animated ? "" : void 0,
        ...rest,
        children: [
          (icon !== void 0 ? icon : true) && /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "flex items-center justify-center size-16 rounded-full bg-muted text-muted-foreground",
              variants: animated && !shouldReduce ? scaleIn.variants : void 0,
              initial: animated && !shouldReduce ? "initial" : void 0,
              animate: animated && !shouldReduce ? "animate" : void 0,
              transition: animated && !shouldReduce ? scaleIn.transition : void 0,
              "data-ds-animated": animated ? "" : void 0,
              children: icon ?? /* @__PURE__ */ jsx(InboxIcon, { className: "size-8" })
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "flex flex-col gap-1.5 max-w-xs",
              variants: animated && !shouldReduce ? fadeIn.variants : void 0,
              initial: animated && !shouldReduce ? "initial" : void 0,
              animate: animated && !shouldReduce ? "animate" : void 0,
              transition: animated && !shouldReduce ? { ...fadeIn.transition, delay: 0.15 } : void 0,
              "data-ds-animated": animated ? "" : void 0,
              children: [
                title && /* @__PURE__ */ jsx("p", { className: "text-base font-semibold text-foreground leading-5", children: title }),
                description && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground leading-5", children: description })
              ]
            }
          ),
          children,
          action && /* @__PURE__ */ jsx(
            motion.div,
            {
              variants: animated && !shouldReduce ? fadeIn.variants : void 0,
              initial: animated && !shouldReduce ? "initial" : void 0,
              animate: animated && !shouldReduce ? "animate" : void 0,
              transition: animated && !shouldReduce ? { ...fadeIn.transition, delay: 0.25 } : void 0,
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
export {
  EmptyState
};
