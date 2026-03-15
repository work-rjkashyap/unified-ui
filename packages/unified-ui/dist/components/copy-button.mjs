"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { fadeInFast, pop } from "../motion/index";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { forwardRef, useCallback, useState } from "react";
const copyButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2",
    "rounded-md border font-medium",
    "transition-colors duration-fast",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
    focusRingClasses
  ],
  {
    variants: {
      variant: {
        default: "bg-background border-border text-muted-foreground hover:text-foreground hover:bg-accent",
        ghost: "border-transparent bg-transparent text-muted-foreground hover:text-foreground hover:bg-accent"
      },
      size: {
        sm: "h-7 w-7 text-xs",
        md: "h-8 w-8 text-sm",
        lg: "h-9 w-9 text-base"
      }
    },
    defaultVariants: { variant: "default", size: "md" }
  }
);
function CopyIcon({ className }) {
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
        /* @__PURE__ */ jsx("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }),
        /* @__PURE__ */ jsx("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
      ]
    }
  );
}
function CheckIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "M20 6 9 17l-5-5" })
    }
  );
}
const iconSizeMap = {
  sm: "size-3",
  md: "size-3.5",
  lg: "size-4"
};
const CopyButton = forwardRef(
  function CopyButton2({
    text,
    variant = "default",
    size = "md",
    tooltip = "Copy",
    successDuration = 2e3,
    onCopy,
    onCopyError,
    className
  }, ref) {
    const shouldReduce = useReducedMotion();
    const [copied, setCopied] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const handleCopy = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        onCopy?.(text);
        setTimeout(() => setCopied(false), successDuration);
      } catch (err) {
        onCopyError?.(err instanceof Error ? err : new Error(String(err)));
      }
    }, [text, successDuration, onCopy, onCopyError]);
    return /* @__PURE__ */ jsxs("div", { className: "relative inline-flex", children: [
      /* @__PURE__ */ jsx(AnimatePresence, { children: showTooltip && /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: cn(
            "absolute -top-8 left-1/2 -translate-x-1/2",
            "px-2 py-1 rounded-md",
            "bg-foreground text-background text-xs font-medium whitespace-nowrap",
            "pointer-events-none z-tooltip"
          ),
          variants: shouldReduce ? void 0 : fadeInFast.variants,
          initial: shouldReduce ? { opacity: 0 } : "initial",
          animate: shouldReduce ? { opacity: 1 } : "animate",
          exit: shouldReduce ? { opacity: 0 } : "exit",
          transition: shouldReduce ? { duration: 0.1 } : fadeInFast.transition,
          "data-ds-animated": "",
          children: [
            copied ? "Copied!" : tooltip,
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground",
                "aria-hidden": "true"
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          ref,
          type: "button",
          onClick: handleCopy,
          onMouseEnter: () => setShowTooltip(true),
          onMouseLeave: () => setShowTooltip(false),
          onFocus: () => setShowTooltip(true),
          onBlur: () => setShowTooltip(false),
          "aria-label": copied ? "Copied!" : tooltip,
          className: cn(copyButtonVariants({ variant, size }), className),
          "data-ds": "",
          "data-ds-component": "copy-button",
          "data-ds-size": size,
          "data-ds-copied": copied ? "" : void 0,
          children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", initial: false, children: copied ? /* @__PURE__ */ jsx(
            motion.span,
            {
              className: cn("text-success", iconSizeMap[size]),
              variants: shouldReduce ? void 0 : pop.variants,
              initial: shouldReduce ? { opacity: 0 } : "initial",
              animate: shouldReduce ? { opacity: 1 } : "animate",
              exit: shouldReduce ? { opacity: 0 } : "exit",
              transition: shouldReduce ? { duration: 0.1 } : pop.transition,
              "data-ds-animated": "",
              children: /* @__PURE__ */ jsx(CheckIcon, { className: iconSizeMap[size] })
            },
            "check"
          ) : /* @__PURE__ */ jsx(
            motion.span,
            {
              variants: shouldReduce ? void 0 : fadeInFast.variants,
              initial: shouldReduce ? { opacity: 0 } : "initial",
              animate: shouldReduce ? { opacity: 1 } : "animate",
              exit: shouldReduce ? { opacity: 0 } : "exit",
              transition: shouldReduce ? { duration: 0.1 } : fadeInFast.transition,
              "data-ds-animated": "",
              children: /* @__PURE__ */ jsx(CopyIcon, { className: iconSizeMap[size] })
            },
            "copy"
          ) })
        }
      )
    ] });
  }
);
CopyButton.displayName = "CopyButton";
export {
  CopyButton,
  copyButtonVariants
};
