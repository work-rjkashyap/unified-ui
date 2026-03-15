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
var timeline_exports = {};
__export(timeline_exports, {
  Timeline: () => Timeline,
  TimelineItem: () => TimelineItem
});
module.exports = __toCommonJS(timeline_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_motion = require("../motion/index");
var import_cn = require("../utils/cn");
var import_framer_motion = require("framer-motion");
var import_react = require("react");
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
const TimelineItem = (0, import_react.forwardRef)(
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
    const shouldReduce = (0, import_framer_motion.useReducedMotion)();
    const slidePreset = side === "left" ? import_motion.slideInFromRight : import_motion.slideInFromLeft;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      import_framer_motion.motion.div,
      {
        ref,
        className: (0, import_cn.cn)("flex gap-4 relative", className),
        variants: animated && !shouldReduce ? slidePreset.variants : void 0,
        transition: animated && !shouldReduce ? slidePreset.transition : void 0,
        "data-ds-animated": animated ? "" : void 0,
        ...rest,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col items-center", children: [
            icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "div",
              {
                className: (0, import_cn.cn)(
                  "flex items-center justify-center rounded-full shrink-0 z-10",
                  iconSizeMap[size],
                  statusIconColorMap[status]
                ),
                children: icon
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "div",
              {
                className: (0, import_cn.cn)(
                  "rounded-full shrink-0 z-10 mt-1.5",
                  dotSizeMap[size],
                  statusDotMap[status]
                )
              }
            ),
            !isLast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 w-px bg-border mt-2 mb-0" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: (0, import_cn.cn)("flex-1 pb-8", isLast && "pb-0"), children: [
            timestamp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xs text-muted-foreground mb-1 leading-none", children: timestamp }),
            title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "p",
              {
                className: (0, import_cn.cn)(
                  "font-semibold text-foreground leading-5",
                  size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"
                ),
                children: title
              }
            ),
            description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "p",
              {
                className: (0, import_cn.cn)(
                  "text-muted-foreground leading-5 mt-0.5",
                  size === "sm" ? "text-xs" : "text-sm"
                ),
                children: description
              }
            ),
            children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-2", children })
          ] })
        ]
      }
    );
  }
);
TimelineItem.displayName = "TimelineItem";
const Timeline = (0, import_react.forwardRef)(
  function Timeline2({ items, align = "left", size = "md", animated = true, className, ...rest }, ref) {
    const shouldReduce = (0, import_framer_motion.useReducedMotion)();
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_framer_motion.motion.div,
      {
        ref,
        className: (0, import_cn.cn)("relative", className),
        variants: animated && !shouldReduce ? import_motion.staggerContainerSlow.variants : void 0,
        initial: animated && !shouldReduce ? "initial" : void 0,
        animate: animated && !shouldReduce ? "animate" : void 0,
        "data-ds": "",
        "data-ds-component": "timeline",
        "data-ds-align": align,
        "data-ds-animated": animated ? "" : void 0,
        ...rest,
        children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Timeline,
  TimelineItem
});
