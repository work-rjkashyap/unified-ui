"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { fadeInFast } from "../motion/index";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Slider as SliderPrimitive } from "radix-ui";
import {
  forwardRef,
  useCallback,
  useState
} from "react";
const sliderTrackVariants = cva(
  [
    "relative flex touch-none select-none",
    "rounded-full",
    "bg-muted",
    "overflow-hidden"
  ],
  {
    variants: {
      orientation: {
        horizontal: "w-full items-center",
        vertical: "h-full flex-col justify-center"
      },
      size: {
        sm: "",
        md: "",
        lg: ""
      }
    },
    compoundVariants: [
      { orientation: "horizontal", size: "sm", className: "h-1" },
      { orientation: "horizontal", size: "md", className: "h-1.5" },
      { orientation: "horizontal", size: "lg", className: "h-2" },
      { orientation: "vertical", size: "sm", className: "w-1" },
      { orientation: "vertical", size: "md", className: "w-1.5" },
      { orientation: "vertical", size: "lg", className: "w-2" }
    ],
    defaultVariants: {
      orientation: "horizontal",
      size: "md"
    }
  }
);
const sliderRangeVariants = cva(["absolute rounded-full"], {
  variants: {
    variant: {
      default: "bg-primary",
      primary: "bg-primary",
      success: "bg-success",
      danger: "bg-danger"
    },
    orientation: {
      horizontal: "h-full",
      vertical: "w-full"
    }
  },
  defaultVariants: {
    variant: "default",
    orientation: "horizontal"
  }
});
const sliderThumbVariants = cva(
  [
    "block rounded-full",
    "bg-background border-2",
    "shadow-md",
    "transition-colors duration-fast",
    focusRingClasses,
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-grab active:cursor-grabbing"
  ],
  {
    variants: {
      variant: {
        default: "border-primary",
        primary: "border-primary",
        success: "border-success",
        danger: "border-danger"
      },
      size: {
        sm: "size-3",
        md: "size-4",
        lg: "size-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
function SliderTooltip({
  value,
  visible,
  format
}) {
  const shouldReduce = useReducedMotion();
  return /* @__PURE__ */ jsx(AnimatePresence, { children: visible && /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: cn(
        "absolute -top-8 left-1/2 -translate-x-1/2",
        "px-2 py-0.5 rounded-md",
        "bg-foreground text-background",
        "text-xs font-medium whitespace-nowrap",
        "pointer-events-none select-none",
        "z-tooltip"
      ),
      variants: fadeInFast.variants,
      initial: shouldReduce ? false : "initial",
      animate: "animate",
      exit: "exit",
      transition: fadeInFast.transition,
      "data-ds-animated": "",
      children: [
        format(value),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground",
            "aria-hidden": "true"
          }
        )
      ]
    }
  ) });
}
const MotionThumb = motion.create(SliderPrimitive.Thumb);
function SliderThumbItem({
  variant = "default",
  size = "md",
  value,
  showTooltip = false,
  formatTooltip,
  shouldReduce
}) {
  const [isActive, setIsActive] = useState(false);
  return /* @__PURE__ */ jsx(
    MotionThumb,
    {
      className: cn(
        "relative overflow-visible",
        sliderThumbVariants({ variant, size })
      ),
      onMouseEnter: () => setIsActive(true),
      onMouseLeave: () => setIsActive(false),
      onFocus: () => setIsActive(true),
      onBlur: () => setIsActive(false),
      whileTap: shouldReduce ? void 0 : {
        scale: 1.2,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      },
      whileHover: shouldReduce ? void 0 : {
        scale: 1.1,
        transition: { type: "spring", stiffness: 400, damping: 30 }
      },
      "data-ds-animated": "",
      children: showTooltip && /* @__PURE__ */ jsx(
        SliderTooltip,
        {
          value,
          visible: isActive,
          format: formatTooltip
        }
      )
    }
  );
}
const Slider = forwardRef(function Slider2({
  variant = "default",
  size = "md",
  orientation = "horizontal",
  showMarks = false,
  marks,
  showTooltip = false,
  formatTooltip = (v) => String(v),
  className,
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  ...rest
}, ref) {
  const shouldReduce = useReducedMotion();
  const [internalValue, setInternalValue] = useState(
    value ?? defaultValue ?? [min]
  );
  const handleValueChange = useCallback(
    (newValue) => {
      setInternalValue(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange]
  );
  const currentValue = value ?? internalValue;
  const resolvedMarks = marks ?? (showMarks && step ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => ({
    value: min + i * step
  })) : []);
  const isVertical = orientation === "vertical";
  return /* @__PURE__ */ jsxs(
    SliderPrimitive.Root,
    {
      ref,
      className: cn(
        "relative flex touch-none select-none items-center",
        isVertical ? "flex-col h-full w-fit" : "w-full h-fit",
        className
      ),
      orientation,
      min,
      max,
      step,
      value,
      defaultValue,
      onValueChange: handleValueChange,
      "data-ds": "",
      "data-ds-component": "slider",
      "data-ds-variant": variant,
      "data-ds-size": size,
      "data-ds-orientation": orientation,
      ...rest,
      children: [
        /* @__PURE__ */ jsx(
          SliderPrimitive.Track,
          {
            className: cn(sliderTrackVariants({ orientation, size })),
            children: /* @__PURE__ */ jsx(
              SliderPrimitive.Range,
              {
                className: cn(sliderRangeVariants({ variant, orientation }))
              }
            )
          }
        ),
        resolvedMarks.length > 0 && /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "absolute",
              isVertical ? "left-1/2 -translate-x-1/2 h-full flex-col" : "top-1/2 -translate-y-1/2 w-full",
              "flex items-center justify-between pointer-events-none"
            ),
            "aria-hidden": "true",
            children: resolvedMarks.map((mark) => {
              const pct = (mark.value - min) / (max - min) * 100;
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "absolute flex flex-col items-center",
                  style: isVertical ? { bottom: `${pct}%` } : { left: `${pct}%`, transform: "translateX(-50%)" },
                  children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: cn(
                          "rounded-full bg-border",
                          size === "sm" ? "size-1" : size === "md" ? "size-1.5" : "size-2"
                        )
                      }
                    ),
                    mark.label && /* @__PURE__ */ jsx("span", { className: "mt-2 text-xs text-muted-foreground", children: mark.label })
                  ]
                },
                mark.value
              );
            })
          }
        ),
        currentValue.map((thumbValue, index) => /* @__PURE__ */ jsx(
          SliderThumbItem,
          {
            variant,
            size,
            value: thumbValue,
            showTooltip,
            formatTooltip,
            shouldReduce: shouldReduce ?? false
          },
          index
        ))
      ]
    }
  );
});
Slider.displayName = "Slider";
export {
  Slider,
  sliderRangeVariants,
  sliderThumbVariants,
  sliderTrackVariants
};
