"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { scaleIn } from "../motion/index";
import { cn } from "../utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import { HoverCard as HoverCardPrimitive } from "radix-ui";
import {
  forwardRef
} from "react";
function HoverCard({
  openDelay = 200,
  closeDelay = 150,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    HoverCardPrimitive.Root,
    {
      openDelay,
      closeDelay,
      ...props
    }
  );
}
HoverCard.displayName = "HoverCard";
const HoverCardTrigger = HoverCardPrimitive.Trigger;
HoverCardTrigger.displayName = "HoverCardTrigger";
const HoverCardContent = forwardRef(function HoverCardContent2({
  side = "bottom",
  align = "center",
  sideOffset = 8,
  className,
  children,
  ...rest
}, ref) {
  const shouldReduce = useReducedMotion();
  return /* @__PURE__ */ jsx(HoverCardPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    HoverCardPrimitive.Content,
    {
      ref,
      side,
      align,
      sideOffset,
      asChild: true,
      ...rest,
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: cn(
            "z-popover w-64 rounded-lg border border-border bg-popover p-4 shadow-lg outline-none",
            "text-sm text-popover-foreground",
            className
          ),
          variants: shouldReduce ? void 0 : scaleIn.variants,
          initial: shouldReduce ? { opacity: 0 } : "initial",
          animate: shouldReduce ? { opacity: 1 } : "animate",
          exit: shouldReduce ? { opacity: 0 } : "exit",
          transition: shouldReduce ? { duration: 0.12 } : scaleIn.transition,
          "data-ds": "",
          "data-ds-component": "hover-card-content",
          "data-ds-animated": "",
          children: [
            children,
            /* @__PURE__ */ jsx(HoverCardPrimitive.Arrow, { className: "fill-border" })
          ]
        }
      )
    }
  ) });
});
HoverCardContent.displayName = "HoverCardContent";
export {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
};
