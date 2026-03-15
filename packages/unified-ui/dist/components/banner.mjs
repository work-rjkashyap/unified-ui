"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { slideDown, slideUp } from "../motion/index";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { forwardRef, useState } from "react";
const bannerVariants = cva(
  ["w-full flex items-center gap-3 px-4 py-3 text-sm font-medium"],
  {
    variants: {
      variant: {
        default: "bg-foreground text-background",
        info: "bg-info text-info-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        danger: "bg-danger text-danger-foreground",
        primary: "bg-primary text-primary-foreground"
      },
      position: {
        top: "sticky top-0 left-0 right-0 z-banner",
        bottom: "sticky bottom-0 left-0 right-0 z-banner",
        inline: "rounded-md"
      }
    },
    defaultVariants: { variant: "default", position: "inline" }
  }
);
function XIcon({ className }) {
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
        /* @__PURE__ */ jsx("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ jsx("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
const Banner = forwardRef(function Banner2({
  variant = "default",
  position = "inline",
  dismissible = false,
  onDismiss,
  dismissLabel = "Dismiss",
  icon,
  action,
  visible: controlledVisible,
  defaultVisible = true,
  className,
  children,
  id,
  style,
  role,
  "aria-label": ariaLabel,
  "aria-live": ariaLive
}, ref) {
  const shouldReduce = useReducedMotion();
  const [internalVisible, setInternalVisible] = useState(defaultVisible);
  const isVisible = controlledVisible !== void 0 ? controlledVisible : internalVisible;
  const handleDismiss = () => {
    if (controlledVisible === void 0) setInternalVisible(false);
    onDismiss?.();
  };
  const slidePreset = position === "bottom" ? slideUp : slideDown;
  return /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: isVisible && /* @__PURE__ */ jsxs(
    motion.div,
    {
      ref,
      className: cn(bannerVariants({ variant, position }), className),
      variants: shouldReduce ? void 0 : slidePreset.variants,
      initial: shouldReduce ? { opacity: 0 } : "initial",
      animate: shouldReduce ? { opacity: 1 } : "animate",
      exit: shouldReduce ? { opacity: 0 } : "exit",
      transition: shouldReduce ? { duration: 0.2 } : slidePreset.transition,
      "data-ds": "",
      "data-ds-component": "banner",
      "data-ds-variant": variant,
      "data-ds-position": position,
      "data-ds-animated": "",
      id,
      style,
      role,
      "aria-label": ariaLabel,
      "aria-live": ariaLive,
      children: [
        icon && /* @__PURE__ */ jsx("span", { className: "shrink-0", children: icon }),
        /* @__PURE__ */ jsx("span", { className: "flex-1 min-w-0", children }),
        action && /* @__PURE__ */ jsx("span", { className: "shrink-0", children: action }),
        dismissible && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleDismiss,
            className: cn(
              "shrink-0 inline-flex items-center justify-center size-6 rounded-sm",
              "opacity-70 hover:opacity-100 transition-opacity duration-fast",
              focusRingClasses
            ),
            "aria-label": dismissLabel,
            children: /* @__PURE__ */ jsx(XIcon, { className: "size-4" })
          }
        )
      ]
    }
  ) });
});
Banner.displayName = "Banner";
export {
  Banner,
  bannerVariants
};
