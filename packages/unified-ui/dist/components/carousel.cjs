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
var carousel_exports = {};
__export(carousel_exports, {
  Carousel: () => Carousel,
  useCarouselContext: () => useCarouselContext
});
module.exports = __toCommonJS(carousel_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_framer_motion = require("framer-motion");
var import_react = require("react");
const CarouselContext = (0, import_react.createContext)({
  current: 0,
  total: 0,
  prev: () => {
  },
  next: () => {
  },
  goTo: () => {
  },
  direction: "right",
  orientation: "horizontal"
});
function useCarouselContext() {
  return (0, import_react.useContext)(CarouselContext);
}
function ChevronLeftIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m15 18-6-6 6-6" })
    }
  );
}
function ChevronRightIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 18 6-6-6-6" })
    }
  );
}
const Carousel = (0, import_react.forwardRef)(
  function Carousel2({
    items,
    defaultIndex = 0,
    index: controlledIndex,
    onIndexChange,
    orientation = "horizontal",
    autoplay = false,
    autoplayInterval = 3e3,
    loop = true,
    showArrows = true,
    showDots = true,
    className,
    itemClassName
  }, ref) {
    const shouldReduce = (0, import_framer_motion.useReducedMotion)();
    const [internalIndex, setInternalIndex] = (0, import_react.useState)(defaultIndex);
    const [direction, setDirection] = (0, import_react.useState)("right");
    const autoplayRef = (0, import_react.useRef)(null);
    const current = controlledIndex !== void 0 ? controlledIndex : internalIndex;
    const total = items.length;
    const goTo = (0, import_react.useCallback)(
      (i, dir) => {
        const next2 = loop ? (i % total + total) % total : Math.max(0, Math.min(total - 1, i));
        const resolvedDir = dir ?? (next2 > current ? "right" : "left");
        setDirection(resolvedDir);
        if (controlledIndex === void 0) setInternalIndex(next2);
        onIndexChange?.(next2);
      },
      [current, total, loop, controlledIndex, onIndexChange]
    );
    const prev = (0, import_react.useCallback)(() => goTo(current - 1, "left"), [current, goTo]);
    const next = (0, import_react.useCallback)(() => goTo(current + 1, "right"), [current, goTo]);
    (0, import_react.useEffect)(() => {
      if (!autoplay) return;
      autoplayRef.current = setInterval(next, autoplayInterval);
      return () => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
      };
    }, [autoplay, autoplayInterval, next]);
    const isHorizontal = orientation === "horizontal";
    const slideVariants = {
      initial: shouldReduce ? { opacity: 0 } : {
        opacity: 0,
        x: isHorizontal ? direction === "right" ? "100%" : "-100%" : 0,
        y: !isHorizontal ? direction === "right" ? "100%" : "-100%" : 0
      },
      animate: { opacity: 1, x: 0, y: 0 },
      exit: shouldReduce ? { opacity: 0 } : {
        opacity: 0,
        x: isHorizontal ? direction === "right" ? "-100%" : "100%" : 0,
        y: !isHorizontal ? direction === "right" ? "-100%" : "100%" : 0
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      CarouselContext.Provider,
      {
        value: { current, total, prev, next, goTo, direction, orientation },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            ref,
            className: (0, import_cn.cn)("relative overflow-hidden rounded-lg", className),
            "data-ds": "",
            "data-ds-component": "carousel",
            "data-ds-orientation": orientation,
            role: "region",
            "aria-roledescription": "carousel",
            "aria-label": "Content carousel",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "relative overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { mode: "wait", initial: false, custom: direction, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_framer_motion.motion.div,
                {
                  className: (0, import_cn.cn)("w-full", itemClassName),
                  variants: slideVariants,
                  initial: "initial",
                  animate: "animate",
                  exit: "exit",
                  transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                  "aria-roledescription": "slide",
                  "aria-label": `Slide ${current + 1} of ${total}`,
                  "data-ds-animated": "",
                  children: items[current]
                },
                current
              ) }) }),
              showArrows && total > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: prev,
                    disabled: !loop && current === 0,
                    className: (0, import_cn.cn)(
                      "absolute left-3 top-1/2 -translate-y-1/2 z-10",
                      "inline-flex items-center justify-center size-9 rounded-full",
                      "bg-background/90 border border-border shadow-sm",
                      "text-foreground hover:bg-background",
                      "transition-colors duration-fast",
                      "disabled:opacity-30 disabled:pointer-events-none",
                      import_focus_ring.focusRingClasses
                    ),
                    "aria-label": "Previous slide",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeftIcon, { className: "size-4" })
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: next,
                    disabled: !loop && current === total - 1,
                    className: (0, import_cn.cn)(
                      "absolute right-3 top-1/2 -translate-y-1/2 z-10",
                      "inline-flex items-center justify-center size-9 rounded-full",
                      "bg-background/90 border border-border shadow-sm",
                      "text-foreground hover:bg-background",
                      "transition-colors duration-fast",
                      "disabled:opacity-30 disabled:pointer-events-none",
                      import_focus_ring.focusRingClasses
                    ),
                    "aria-label": "Next slide",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRightIcon, { className: "size-4" })
                  }
                )
              ] }),
              showDots && total > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10", children: Array.from({ length: total }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  type: "button",
                  onClick: () => goTo(i),
                  "aria-label": `Go to slide ${i + 1}`,
                  "aria-current": i === current ? "true" : void 0,
                  className: (0, import_cn.cn)(
                    "rounded-full transition-all duration-fast",
                    "bg-background/80 hover:bg-background",
                    i === current ? "w-4 h-2" : "size-2 opacity-60 hover:opacity-100",
                    import_focus_ring.focusRingClasses
                  )
                },
                `slide-${i}`
              )) })
            ]
          }
        )
      }
    );
  }
);
Carousel.displayName = "Carousel";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Carousel,
  useCarouselContext
});
