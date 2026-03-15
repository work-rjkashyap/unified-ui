"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { cva } from "class-variance-authority";
import { forwardRef, useEffect } from "react";
const progressTrackVariants = cva(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "relative w-full overflow-hidden",
    // Shape
    "rounded-full",
    // Background
    "bg-muted"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — thin bar for subtle progress indicators.
         * Height: 6px
         */
        sm: "h-1.5",
        /**
         * Medium — default size for most progress bars.
         * Height: 8px
         */
        md: "h-2",
        /**
         * Large — prominent bar for hero progress, file uploads.
         * Height: 12px
         */
        lg: "h-3"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const progressIndicatorVariants = cva(
  // Base styles — shared across all variants
  [
    // Layout
    "h-full",
    // Shape — match track rounding
    "rounded-full",
    // Transition for value changes
    "transition-[width] duration-standard ease-standard"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Visual Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Default — uses primary brand color.
         */
        default: "bg-primary",
        /**
         * Primary — explicit primary brand color.
         */
        primary: "bg-primary",
        /**
         * Success — positive/complete progress.
         */
        success: "bg-success",
        /**
         * Danger — error/critical progress (e.g., storage almost full).
         */
        danger: "bg-danger",
        /**
         * Warning — caution progress (e.g., approaching limit).
         */
        warning: "bg-warning",
        /**
         * Info — informational progress.
         */
        info: "bg-info"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const stripedStyle = {
  backgroundImage: "linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)",
  backgroundSize: "1rem 1rem"
};
const PROGRESS_STYLE_ID = "unified-ui-progress-keyframes";
const PROGRESS_KEYFRAMES_CSS = `
@keyframes unified-ui-progress-indeterminate {
  0% { transform: translateX(-100%); width: 50%; }
  50% { transform: translateX(50%); width: 30%; }
  100% { transform: translateX(200%); width: 50%; }
}
@keyframes unified-ui-progress-stripe-slide {
  0% { background-position: 1rem 0; }
  100% { background-position: 0 0; }
}
`;
function useProgressKeyframes() {
  useEffect(() => {
    if (document.getElementById(PROGRESS_STYLE_ID)) {
      return;
    }
    const style = document.createElement("style");
    style.id = PROGRESS_STYLE_ID;
    style.textContent = PROGRESS_KEYFRAMES_CSS;
    document.head.appendChild(style);
  }, []);
}
const Progress = forwardRef(
  function Progress2({
    value = 0,
    max = 100,
    min = 0,
    variant = "default",
    size = "md",
    indeterminate = false,
    striped = false,
    animated = false,
    showLabel = false,
    label,
    formatLabel,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    className,
    indicatorClassName,
    ...rest
  }, ref) {
    useProgressKeyframes();
    const clampedValue = Math.max(min, Math.min(value, max));
    const range = max - min;
    const percentage = range > 0 ? (clampedValue - min) / range * 100 : 0;
    const defaultFormatLabel = (v, m) => {
      const pct = m - min > 0 ? (v - min) / (m - min) * 100 : 0;
      return `${Math.round(pct)}%`;
    };
    const labelFormatter = formatLabel ?? defaultFormatLabel;
    const _labelText = label ?? labelFormatter(clampedValue, max);
    const indicatorStyle = {
      ...indeterminate ? {
        animation: "unified-ui-progress-indeterminate 1.5s ease-in-out infinite"
      } : {
        width: `${percentage}%`
      },
      ...striped ? stripedStyle : {},
      ...striped && animated ? {
        animation: indeterminate ? "unified-ui-progress-indeterminate 1.5s ease-in-out infinite" : "unified-ui-progress-stripe-slide 0.6s linear infinite"
      } : {}
    };
    const ariaAttrs = {
      role: "progressbar",
      "aria-valuemin": min,
      "aria-valuemax": max,
      ...ariaLabel ? { "aria-label": ariaLabel } : {},
      ...ariaLabelledBy ? { "aria-labelledby": ariaLabelledBy } : {}
    };
    if (!indeterminate) {
      ariaAttrs["aria-valuenow"] = clampedValue;
    }
    return /* @__PURE__ */ jsxs(
      "div",
      {
        "data-ds": "",
        "data-ds-component": "progress",
        "data-ds-variant": variant,
        "data-ds-size": size,
        ...indeterminate ? { "data-ds-indeterminate": "" } : {},
        children: [
          showLabel && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium leading-4 text-foreground", children: label ?? "" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium leading-4 text-muted-foreground tabular-nums", children: typeof label === "string" || !label ? labelFormatter(clampedValue, max) : "" })
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              ref,
              className: cn(progressTrackVariants({ size }), className),
              ...ariaAttrs,
              ...rest,
              children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn(
                    progressIndicatorVariants({ variant }),
                    indeterminate && "absolute",
                    indicatorClassName
                  ),
                  style: indicatorStyle
                }
              )
            }
          )
        ]
      }
    );
  }
);
Progress.displayName = "Progress";
export {
  Progress,
  progressIndicatorVariants,
  progressTrackVariants
};
