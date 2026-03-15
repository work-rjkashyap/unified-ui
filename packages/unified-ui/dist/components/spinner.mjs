"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { cva } from "class-variance-authority";
import { motion, useReducedMotion } from "framer-motion";
import { forwardRef } from "react";
const spinnerVariants = cva(
  // Base styles — shared across all variants and sizes
  [
    // Ensure the spinner is inline and doesn't collapse
    "shrink-0"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Extra Small — for inline indicators, buttons, badges.
         * 14px (size-3.5)
         */
        xs: "size-3.5",
        /**
         * Small — for compact UIs, table cells, small buttons.
         * 16px (size-4)
         */
        sm: "size-4",
        /**
         * Medium — default size for most loading states.
         * 20px (size-5)
         */
        md: "size-5",
        /**
         * Large — for prominent loading indicators, empty states.
         * 24px (size-6)
         */
        lg: "size-6"
      },
      // -----------------------------------------------------------------
      // Color Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Default — uses the current text color.
         * Inherits from the parent element's color.
         */
        default: "text-current",
        /**
         * Primary — uses the brand/primary color.
         * For prominent loading states on neutral backgrounds.
         */
        primary: "text-primary",
        /**
         * Secondary — uses the secondary/foreground color.
         * For subtle loading indicators.
         */
        secondary: "text-foreground",
        /**
         * Muted — uses the muted-foreground color.
         * For very subtle, non-intrusive loading states.
         */
        muted: "text-muted-foreground"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default"
    }
  }
);
const labelSizeMap = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-sm"
};
const spinTransition = {
  rotate: {
    duration: 0.8,
    ease: "linear",
    repeat: Number.POSITIVE_INFINITY
  }
};
const spinAnimate = {
  rotate: 360
};
const Spinner = forwardRef(
  function Spinner2({
    size = "md",
    variant = "default",
    label,
    labelPosition = "right",
    "aria-label": ariaLabel,
    strokeWidth = 2.5,
    className,
    ...rest
  }, ref) {
    const prefersReduced = useReducedMotion();
    const resolvedAriaLabel = ariaLabel ?? (typeof label === "string" ? label : "Loading");
    const MotionSvg = motion.svg;
    const spinnerElement = prefersReduced ? (
      // Reduced motion fallback — uses CSS animate-spin (a simple
      // rotation that the browser can optimize or skip per OS settings)
      /* @__PURE__ */ jsxs(
        "svg",
        {
          className: cn("animate-spin", spinnerVariants({ size, variant })),
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsx(
              "circle",
              {
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "currentColor",
                strokeWidth,
                className: "opacity-20"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M12 2a10 10 0 0 1 10 10",
                stroke: "currentColor",
                strokeWidth,
                strokeLinecap: "round"
              }
            )
          ]
        }
      )
    ) : (
      // Full Framer Motion animation
      /* @__PURE__ */ jsxs(
        MotionSvg,
        {
          className: cn(spinnerVariants({ size, variant })),
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          animate: spinAnimate,
          transition: spinTransition,
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsx(
              "circle",
              {
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "currentColor",
                strokeWidth,
                className: "opacity-20"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M12 2a10 10 0 0 1 10 10",
                stroke: "currentColor",
                strokeWidth,
                strokeLinecap: "round"
              }
            )
          ]
        }
      )
    );
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        role: "status",
        "aria-label": resolvedAriaLabel,
        className: cn(
          "inline-flex items-center",
          labelPosition === "bottom" ? "flex-col gap-2" : "flex-row gap-2",
          className
        ),
        "data-ds": "",
        "data-ds-component": "spinner",
        "data-ds-size": size,
        "data-ds-variant": variant,
        ...rest,
        children: [
          spinnerElement,
          label && /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "leading-5",
                labelSizeMap[size],
                variant === "muted" ? "text-muted-foreground" : "text-foreground"
              ),
              children: label
            }
          ),
          !label && /* @__PURE__ */ jsx("span", { className: "sr-only", children: resolvedAriaLabel })
        ]
      }
    );
  }
);
Spinner.displayName = "Spinner";
export {
  Spinner,
  spinnerVariants
};
