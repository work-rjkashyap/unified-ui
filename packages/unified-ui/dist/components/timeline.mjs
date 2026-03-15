"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import {
  slideInFromLeft,
  slideInFromRight,
  staggerContainerSlow
} from "../motion/index";
import { cn } from "../utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import { forwardRef } from "react";
const statusDotMap = {
  default: "bg-border",
  active: "bg-primary ring-4 ring-primary/20",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  pending: "bg-muted border-2 border-border"
};
const statusIconColorMap = {
  default: "bg-muted border border-border text-muted-foreground",
  active: "bg-primary text-primary-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  danger: "bg-danger text-danger-foreground",
  pending: "bg-muted border border-border/60 text-muted-foreground"
};
const dotSizeMap = {
  sm: "size-2",
  md: "size-3",
  lg: "size-4"
};
const iconSizeMap = {
  sm: "size-6",
  md: "size-8",
  lg: "size-10"
};
const TimelineItem = forwardRef(
  function TimelineItem2({
    title,
    description,
    timestamp,
    icon,
    status = "default",
    isLast = false,
    size = "md",
    animated = true,
    side = "right",
    className,
    children,
    ...rest
  }, ref) {
    const shouldReduce = useReducedMotion();
    const slidePreset = side === "left" ? slideInFromRight : slideInFromLeft;
    return /* @__PURE__ */ jsxs(
      motion.div,
      {
        ref,
        className: cn("flex gap-4 relative", className),
        variants: animated && !shouldReduce ? slidePreset.variants : void 0,
        transition: animated && !shouldReduce ? slidePreset.transition : void 0,
        "data-ds-animated": animated ? "" : void 0,
        ...rest,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
            icon ? /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "flex items-center justify-center rounded-full shrink-0 z-10",
                  iconSizeMap[size],
                  statusIconColorMap[status]
                ),
                children: icon
              }
            ) : /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "rounded-full shrink-0 z-10 mt-1.5",
                  dotSizeMap[size],
                  statusDotMap[status]
                )
              }
            ),
            !isLast && /* @__PURE__ */ jsx("div", { className: "flex-1 w-px bg-border mt-2 mb-0" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: cn("flex-1 pb-8", isLast && "pb-0"), children: [
            timestamp && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mb-1 leading-none", children: timestamp }),
            title && /* @__PURE__ */ jsx(
              "p",
              {
                className: cn(
                  "font-semibold text-foreground leading-5",
                  size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"
                ),
                children: title
              }
            ),
            description && /* @__PURE__ */ jsx(
              "p",
              {
                className: cn(
                  "text-muted-foreground leading-5 mt-0.5",
                  size === "sm" ? "text-xs" : "text-sm"
                ),
                children: description
              }
            ),
            children && /* @__PURE__ */ jsx("div", { className: "mt-2", children })
          ] })
        ]
      }
    );
  }
);
TimelineItem.displayName = "TimelineItem";
const Timeline = forwardRef(
  function Timeline2({ items, align = "left", size = "md", animated = true, className, ...rest }, ref) {
    const shouldReduce = useReducedMotion();
    return /* @__PURE__ */ jsx(
      motion.div,
      {
        ref,
        className: cn("relative", className),
        variants: animated && !shouldReduce ? staggerContainerSlow.variants : void 0,
        initial: animated && !shouldReduce ? "initial" : void 0,
        animate: animated && !shouldReduce ? "animate" : void 0,
        "data-ds": "",
        "data-ds-component": "timeline",
        "data-ds-align": align,
        "data-ds-animated": animated ? "" : void 0,
        ...rest,
        children: items.map((item, i) => /* @__PURE__ */ jsx(
          TimelineItem,
          {
            title: item.title,
            description: item.description,
            timestamp: item.timestamp,
            icon: item.icon,
            status: item.status ?? "default",
            isLast: i === items.length - 1,
            size,
            animated,
            side: align === "alternate" ? i % 2 === 0 ? "right" : "left" : "right",
            children: item.content
          },
          item.id ?? i
        ))
      }
    );
  }
);
Timeline.displayName = "Timeline";
export {
  Timeline,
  TimelineItem
};
