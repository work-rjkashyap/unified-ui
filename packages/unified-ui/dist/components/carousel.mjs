"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
const CarouselContext = createContext({
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
  return useContext(CarouselContext);
}
function ChevronLeftIcon({ className }) {
  return /* @__PURE__ */ jsx(
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
      children: /* @__PURE__ */ jsx("path", { d: "m15 18-6-6 6-6" })
    }
  );
}
function ChevronRightIcon({ className }) {
  return /* @__PURE__ */ jsx(
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
      children: /* @__PURE__ */ jsx("path", { d: "m9 18 6-6-6-6" })
    }
  );
}
const Carousel = forwardRef(
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
    const shouldReduce = useReducedMotion();
    const [internalIndex, setInternalIndex] = useState(defaultIndex);
    const [direction, setDirection] = useState("right");
    const autoplayRef = useRef(null);
    const current = controlledIndex !== void 0 ? controlledIndex : internalIndex;
    const total = items.length;
    const goTo = useCallback(
      (i, dir) => {
        const next2 = loop ? (i % total + total) % total : Math.max(0, Math.min(total - 1, i));
        const resolvedDir = dir ?? (next2 > current ? "right" : "left");
        setDirection(resolvedDir);
        if (controlledIndex === void 0) setInternalIndex(next2);
        onIndexChange?.(next2);
      },
      [current, total, loop, controlledIndex, onIndexChange]
    );
    const prev = useCallback(() => goTo(current - 1, "left"), [current, goTo]);
    const next = useCallback(() => goTo(current + 1, "right"), [current, goTo]);
    useEffect(() => {
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
    return /* @__PURE__ */ jsx(
      CarouselContext.Provider,
      {
        value: { current, total, prev, next, goTo, direction, orientation },
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            ref,
            className: cn("relative overflow-hidden rounded-lg", className),
            "data-ds": "",
            "data-ds-component": "carousel",
            "data-ds-orientation": orientation,
            role: "region",
            "aria-roledescription": "carousel",
            "aria-label": "Content carousel",
            children: [
              /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", initial: false, custom: direction, children: /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: cn("w-full", itemClassName),
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
              showArrows && total > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: prev,
                    disabled: !loop && current === 0,
                    className: cn(
                      "absolute left-3 top-1/2 -translate-y-1/2 z-10",
                      "inline-flex items-center justify-center size-9 rounded-full",
                      "bg-background/90 border border-border shadow-sm",
                      "text-foreground hover:bg-background",
                      "transition-colors duration-fast",
                      "disabled:opacity-30 disabled:pointer-events-none",
                      focusRingClasses
                    ),
                    "aria-label": "Previous slide",
                    children: /* @__PURE__ */ jsx(ChevronLeftIcon, { className: "size-4" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: next,
                    disabled: !loop && current === total - 1,
                    className: cn(
                      "absolute right-3 top-1/2 -translate-y-1/2 z-10",
                      "inline-flex items-center justify-center size-9 rounded-full",
                      "bg-background/90 border border-border shadow-sm",
                      "text-foreground hover:bg-background",
                      "transition-colors duration-fast",
                      "disabled:opacity-30 disabled:pointer-events-none",
                      focusRingClasses
                    ),
                    "aria-label": "Next slide",
                    children: /* @__PURE__ */ jsx(ChevronRightIcon, { className: "size-4" })
                  }
                )
              ] }),
              showDots && total > 1 && /* @__PURE__ */ jsx("div", { className: "absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10", children: Array.from({ length: total }, (_, i) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => goTo(i),
                  "aria-label": `Go to slide ${i + 1}`,
                  "aria-current": i === current ? "true" : void 0,
                  className: cn(
                    "rounded-full transition-all duration-fast",
                    "bg-background/80 hover:bg-background",
                    i === current ? "w-4 h-2" : "size-2 opacity-60 hover:opacity-100",
                    focusRingClasses
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
export {
  Carousel,
  useCarouselContext
};
