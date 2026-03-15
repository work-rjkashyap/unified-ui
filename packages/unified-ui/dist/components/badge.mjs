"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { popSubtle } from "../motion/index";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import { motion, useReducedMotion } from "framer-motion";
import { forwardRef } from "react";
const badgeVariants = cva(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "inline-flex items-center gap-1.5",
    // Shape — pill by default
    "rounded-full",
    // Typography
    "font-medium leading-none whitespace-nowrap",
    // Transition
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    // Prevent text selection
    "select-none",
    // Shrink protection
    "shrink-0"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Visual Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Default — neutral, muted background.
         * Use for generic labels, tags, and metadata.
         */
        default: ["bg-muted text-foreground", "border border-transparent"],
        /**
         * Primary — uses brand/primary color.
         * Use for highlighting primary categories or active filters.
         */
        primary: [
          "bg-primary-muted text-primary-muted-foreground",
          "border border-transparent"
        ],
        /**
         * Secondary — subdued variant with visible border.
         * Use for archived items, subtle categorization.
         */
        secondary: [
          "bg-secondary text-secondary-foreground",
          "border border-border"
        ],
        /**
         * Success — positive status indicator.
         * Use for "active", "complete", "approved" states.
         */
        success: [
          "bg-success-muted text-success-muted-foreground",
          "border border-transparent"
        ],
        /**
         * Warning — caution status indicator.
         * Use for "pending", "review", "expiring" states.
         */
        warning: [
          "bg-warning-muted text-warning-muted-foreground",
          "border border-transparent"
        ],
        /**
         * Danger — negative/critical status indicator.
         * Use for "error", "failed", "blocked", "critical" states.
         */
        danger: [
          "bg-danger-muted text-danger-muted-foreground",
          "border border-transparent"
        ],
        /**
         * Info — informational status indicator.
         * Use for "new", "beta", "info", "note" labels.
         */
        info: [
          "bg-info-muted text-info-muted-foreground",
          "border border-transparent"
        ],
        /**
         * Outline — transparent background with visible border.
         * Use for subtle categorization that doesn't compete with content.
         */
        outline: ["bg-transparent text-foreground", "border border-border"]
      },
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — very compact, for inline metadata and dense UIs.
         * Height: ~20px, Font: 11px
         */
        sm: "px-2 py-0.5 text-[11px] gap-1",
        /**
         * Medium — default badge size, comfortable readability.
         * Height: ~24px, Font: 12px
         */
        md: "px-2.5 py-1 text-xs gap-1.5",
        /**
         * Large — prominent badge for larger touch targets and filter chips.
         * Height: ~28px, Font: 14px
         */
        lg: "px-3 py-1.5 text-sm gap-2"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
const dotColorMap = {
  default: "bg-muted-foreground",
  primary: "bg-primary",
  secondary: "bg-foreground",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  outline: "bg-foreground"
};
const dotSizeMap = {
  sm: "size-1.5",
  md: "size-2",
  lg: "size-2"
};
function RemoveButton({
  size,
  label,
  disabled,
  onClick
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick,
      disabled,
      className: cn(
        "inline-flex items-center justify-center shrink-0",
        "rounded-full",
        "text-current opacity-60",
        "hover:opacity-100",
        "transition-opacity duration-fast",
        "focus-visible:outline-none focus-visible:border-current",
        "disabled:pointer-events-none disabled:opacity-40",
        // Slightly negative margin to visually tuck the button in
        "-mr-0.5 ml-0.5",
        size === "sm" ? "size-3" : size === "lg" ? "size-4" : "size-3.5",
        focusRingClasses
      ),
      "aria-label": label,
      tabIndex: 0,
      children: /* @__PURE__ */ jsxs(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: size === "sm" ? "size-2.5" : size === "lg" ? "size-3.5" : "size-3",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsx("path", { d: "M18 6 6 18" }),
            /* @__PURE__ */ jsx("path", { d: "m6 6 12 12" })
          ]
        }
      )
    }
  );
}
function DotIndicator({
  variant,
  size
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "shrink-0 rounded-full",
        dotSizeMap[size],
        dotColorMap[variant]
      ),
      "aria-hidden": "true"
    }
  );
}
const Badge = forwardRef(function Badge2({
  variant = "default",
  size = "md",
  dot = false,
  removable = false,
  dismissible = false,
  onRemove,
  onDismiss,
  removeLabel,
  dismissLabel,
  as: Component = "span",
  icon,
  avatar,
  disabled = false,
  animated = false,
  className,
  children,
  ...rest
}, ref) {
  const shouldReduce = useReducedMotion();
  const showDismiss = removable || dismissible;
  const handleDismissClick = (e) => {
    onRemove?.(e);
    onDismiss?.(e);
  };
  const resolvedLabel = removeLabel ?? dismissLabel ?? "Remove";
  const iconSizeClass = size === "sm" ? "[&>svg]:size-2.5" : size === "lg" ? "[&>svg]:size-3.5" : "[&>svg]:size-3";
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    avatar && /* @__PURE__ */ jsx("span", { className: "shrink-0 -ml-0.5", children: avatar }),
    dot && /* @__PURE__ */ jsx(DotIndicator, { variant, size }),
    icon && /* @__PURE__ */ jsx("span", { className: cn("shrink-0", iconSizeClass), "aria-hidden": "true", children: icon }),
    /* @__PURE__ */ jsx("span", { className: "truncate", children }),
    showDismiss && /* @__PURE__ */ jsx(
      RemoveButton,
      {
        size,
        label: resolvedLabel,
        disabled,
        onClick: handleDismissClick
      }
    )
  ] });
  const classes = cn(
    badgeVariants({ variant, size }),
    disabled && "opacity-50 pointer-events-none",
    className
  );
  const dataAttrs = {
    "data-ds": "",
    "data-ds-component": "badge",
    "data-ds-variant": variant,
    "data-ds-size": size,
    ...disabled ? { "data-ds-disabled": "" } : {},
    ...animated ? { "data-ds-animated": "" } : {}
  };
  if (animated && !shouldReduce) {
    return /* @__PURE__ */ jsx(
      motion.span,
      {
        ref,
        className: classes,
        variants: popSubtle.variants,
        initial: "initial",
        animate: "animate",
        transition: popSubtle.transition,
        ...dataAttrs,
        children: content
      }
    );
  }
  return /* @__PURE__ */ jsx(
    Component,
    {
      ref,
      className: classes,
      "aria-disabled": disabled || void 0,
      ...dataAttrs,
      ...rest,
      children: content
    }
  );
});
Badge.displayName = "Badge";
const Tag = forwardRef(function Tag2({ animated = true, dismissLabel = "Remove tag", ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    Badge,
    {
      ref,
      animated,
      dismissLabel,
      ...rest
    }
  );
});
Tag.displayName = "Tag";
const tagVariants = badgeVariants;
export {
  Badge,
  Tag,
  badgeVariants,
  tagVariants
};
