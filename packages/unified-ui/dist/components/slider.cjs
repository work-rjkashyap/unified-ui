"use strict";
"use client";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var slider_exports = {};
__export(slider_exports, {
  Slider: () => Slider,
  sliderRangeVariants: () => sliderRangeVariants,
  sliderThumbVariants: () => sliderThumbVariants,
  sliderTrackVariants: () => sliderTrackVariants
});
module.exports = __toCommonJS(slider_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_motion = require("../motion/index");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_framer_motion = require("framer-motion");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
const sliderTrackVariants = (0, import_class_variance_authority.cva)(
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
const sliderRangeVariants = (0, import_class_variance_authority.cva)(["absolute rounded-full"], {
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
const sliderThumbVariants = (0, import_class_variance_authority.cva)(
  [
    "block rounded-full",
    "bg-background border-2",
    "shadow-md",
    "transition-colors duration-fast",
    import_focus_ring.focusRingClasses,
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
  const shouldReduce = (0, import_framer_motion.useReducedMotion)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { children: visible && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_framer_motion.motion.div,
    {
      className: (0, import_cn.cn)(
        "absolute -top-8 left-1/2 -translate-x-1/2",
        "px-2 py-0.5 rounded-md",
        "bg-foreground text-background",
        "text-xs font-medium whitespace-nowrap",
        "pointer-events-none select-none",
        "z-tooltip"
      ),
      variants: import_motion.fadeInFast.variants,
      initial: shouldReduce ? false : "initial",
      animate: "animate",
      exit: "exit",
      transition: import_motion.fadeInFast.transition,
      "data-ds-animated": "",
      children: [
        format(value),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
const MotionThumb = import_framer_motion.motion.create(import_radix_ui.Slider.Thumb);
function SliderThumbItem({
  variant = "default",
  size = "md",
  value,
  showTooltip = false,
  formatTooltip,
  shouldReduce
}) {
  const [isActive, setIsActive] = (0, import_react.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    MotionThumb,
    {
      className: (0, import_cn.cn)(
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
      children: showTooltip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
const Slider = (0, import_react.forwardRef)(function Slider2({
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
  const shouldReduce = (0, import_framer_motion.useReducedMotion)();
  const [internalValue, setInternalValue] = (0, import_react.useState)(
    value ?? defaultValue ?? [min]
  );
  const handleValueChange = (0, import_react.useCallback)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.Slider.Root,
    {
      ref,
      className: (0, import_cn.cn)(
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_radix_ui.Slider.Track,
          {
            className: (0, import_cn.cn)(sliderTrackVariants({ orientation, size })),
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_radix_ui.Slider.Range,
              {
                className: (0, import_cn.cn)(sliderRangeVariants({ variant, orientation }))
              }
            )
          }
        ),
        resolvedMarks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: (0, import_cn.cn)(
              "absolute",
              isVertical ? "left-1/2 -translate-x-1/2 h-full flex-col" : "top-1/2 -translate-y-1/2 w-full",
              "flex items-center justify-between pointer-events-none"
            ),
            "aria-hidden": "true",
            children: resolvedMarks.map((mark) => {
              const pct = (mark.value - min) / (max - min) * 100;
              return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "div",
                {
                  className: "absolute flex flex-col items-center",
                  style: isVertical ? { bottom: `${pct}%` } : { left: `${pct}%`, transform: "translateX(-50%)" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "div",
                      {
                        className: (0, import_cn.cn)(
                          "rounded-full bg-border",
                          size === "sm" ? "size-1" : size === "md" ? "size-1.5" : "size-2"
                        )
                      }
                    ),
                    mark.label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 text-xs text-muted-foreground", children: mark.label })
                  ]
                },
                mark.value
              );
            })
          }
        ),
        currentValue.map((thumbValue, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Slider,
  sliderRangeVariants,
  sliderThumbVariants,
  sliderTrackVariants
});
