"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { scaleIn } from "../motion/index";
import { cn } from "../utils/cn";
import { focusRingInsetClasses } from "../utils/focus-ring";
import { motion, useReducedMotion } from "framer-motion";
import { Popover as PopoverPrimitive } from "radix-ui";
import {
  forwardRef
} from "react";
function CloseIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ jsx("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
function Popover({ children, ...rest }) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Root, { ...rest, children });
}
Popover.displayName = "Popover";
const PopoverTrigger = forwardRef(function PopoverTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    PopoverPrimitive.Trigger,
    {
      ref,
      className,
      "data-ds": "",
      "data-ds-component": "popover-trigger",
      ...rest
    }
  );
});
PopoverTrigger.displayName = "PopoverTrigger";
const PopoverContent = forwardRef(function PopoverContent2({
  className,
  showClose = false,
  arrow = false,
  arrowClassName,
  children,
  side = "bottom",
  align = "center",
  sideOffset = 4,
  ...rest
}, ref) {
  const shouldReduce = useReducedMotion();
  return /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    PopoverPrimitive.Content,
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
            // Layout & sizing
            "w-72",
            // Z-index
            "z-[var(--z-popover)]",
            // Visual
            "rounded-md",
            "border border-border",
            "bg-background",
            "p-4",
            "shadow-lg",
            // Text
            "text-sm text-foreground",
            // Outline
            "outline-none",
            className
          ),
          variants: shouldReduce ? void 0 : scaleIn.variants,
          initial: shouldReduce ? { opacity: 0 } : "initial",
          animate: shouldReduce ? { opacity: 1 } : "animate",
          exit: shouldReduce ? { opacity: 0 } : "exit",
          transition: shouldReduce ? { duration: 0.15 } : scaleIn.transition,
          "data-ds": "",
          "data-ds-component": "popover-content",
          "data-ds-animated": "",
          children: [
            children,
            showClose && /* @__PURE__ */ jsx(
              PopoverPrimitive.Close,
              {
                className: cn(
                  "absolute right-2 top-2",
                  "inline-flex items-center justify-center",
                  "rounded-sm p-1",
                  "text-muted-foreground hover:text-foreground",
                  "transition-colors duration-fast",
                  focusRingInsetClasses
                ),
                "aria-label": "Close",
                children: /* @__PURE__ */ jsx(CloseIcon, { className: "size-4" })
              }
            ),
            arrow && /* @__PURE__ */ jsx(
              PopoverPrimitive.Arrow,
              {
                className: cn("fill-background", arrowClassName),
                width: 12,
                height: 6
              }
            )
          ]
        }
      )
    }
  ) });
});
PopoverContent.displayName = "PopoverContent";
const PopoverClose = forwardRef(function PopoverClose2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    PopoverPrimitive.Close,
    {
      ref,
      className: cn(
        "inline-flex items-center justify-center",
        "rounded-sm",
        "text-muted-foreground hover:text-foreground",
        "transition-colors duration-fast",
        focusRingInsetClasses,
        className
      ),
      "data-ds": "",
      "data-ds-component": "popover-close",
      ...rest
    }
  );
});
PopoverClose.displayName = "PopoverClose";
const PopoverArrow = forwardRef(function PopoverArrow2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    PopoverPrimitive.Arrow,
    {
      ref,
      className: cn("fill-background", className),
      width: 12,
      height: 6,
      ...rest
    }
  );
});
PopoverArrow.displayName = "PopoverArrow";
export {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
};
