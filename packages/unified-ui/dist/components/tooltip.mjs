"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { fadeInFast } from "../motion/index";
import { cn } from "../utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import {
  forwardRef
} from "react";
function TooltipProvider({
  children,
  delayDuration = 300,
  skipDelayDuration = 100,
  ...rest
}) {
  return /* @__PURE__ */ jsx(
    TooltipPrimitive.Provider,
    {
      delayDuration,
      skipDelayDuration,
      ...rest,
      children
    }
  );
}
TooltipProvider.displayName = "TooltipProvider";
const TooltipContent = forwardRef(function TooltipContent2({
  className,
  showArrow = true,
  maxWidth = 220,
  sideOffset = 6,
  children,
  ...rest
}, ref) {
  const shouldReduce = useReducedMotion();
  return /* @__PURE__ */ jsx(
    TooltipPrimitive.Content,
    {
      ref,
      sideOffset,
      asChild: true,
      ...rest,
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: cn(
            // Layout
            "z-[var(--z-tooltip)]",
            "px-3 py-1.5",
            "overflow-hidden",
            // Visual
            "rounded-md",
            "border border-border",
            "bg-foreground text-background",
            "shadow-md",
            // Typography
            "text-xs leading-4",
            className
          ),
          style: { maxWidth },
          variants: shouldReduce ? void 0 : fadeInFast.variants,
          initial: shouldReduce ? { opacity: 0 } : "initial",
          animate: shouldReduce ? { opacity: 1 } : "animate",
          exit: shouldReduce ? { opacity: 0 } : "exit",
          transition: shouldReduce ? { duration: 0.1 } : fadeInFast.transition,
          "data-ds": "",
          "data-ds-component": "tooltip",
          "data-ds-animated": "",
          children: [
            children,
            showArrow && /* @__PURE__ */ jsx(
              TooltipPrimitive.Arrow,
              {
                className: "fill-foreground",
                width: 8,
                height: 4
              }
            )
          ]
        }
      )
    }
  );
});
TooltipContent.displayName = "TooltipContent";
const Tooltip = forwardRef(
  function Tooltip2({
    content,
    children,
    side = "top",
    align = "center",
    sideOffset = 6,
    arrow = true,
    maxWidth = 220,
    delayDuration,
    open,
    onOpenChange,
    contentClassName
  }, _ref) {
    if (!content) {
      return /* @__PURE__ */ jsx(Fragment, { children });
    }
    return /* @__PURE__ */ jsxs(
      TooltipPrimitive.Root,
      {
        open,
        onOpenChange,
        delayDuration,
        children: [
          /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { asChild: true, children }),
          /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx(
            TooltipContent,
            {
              side,
              align,
              sideOffset,
              showArrow: arrow,
              maxWidth,
              className: contentClassName,
              children: content
            }
          ) })
        ]
      }
    );
  }
);
Tooltip.displayName = "Tooltip";
export {
  Tooltip,
  TooltipProvider
};
