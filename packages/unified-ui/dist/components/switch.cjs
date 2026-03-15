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
var switch_exports = {};
__export(switch_exports, {
  Switch: () => Switch,
  switchThumbVariants: () => switchThumbVariants,
  switchTrackVariants: () => switchTrackVariants
});
module.exports = __toCommonJS(switch_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_framer_motion = require("framer-motion");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
const switchTrackVariants = (0, import_class_variance_authority.cva)(
  [
    // Layout
    "relative inline-flex shrink-0 cursor-pointer items-center",
    // Shape
    "rounded-full",
    // Border
    "border-2 border-transparent",
    // Transition
    "transition-[background-color,box-shadow] duration-fast ease-standard",
    // Focus ring
    import_focus_ring.focusRingClasses,
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    // Unchecked state
    "data-[state=unchecked]:bg-input",
    // Checked state
    "data-[state=checked]:bg-primary"
  ],
  {
    variants: {
      size: {
        /**
         * Small — compact for dense UIs, settings panels.
         * Track: 36px × 20px
         */
        sm: "h-5 w-9",
        /**
         * Medium — default size for most switches.
         * Track: 44px × 24px
         */
        md: "h-6 w-11"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const switchThumbVariants = (0, import_class_variance_authority.cva)(
  [
    // Shape
    "pointer-events-none block rounded-full",
    // Color
    "bg-white",
    // Shadow
    "shadow-sm"
  ],
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const thumbSpringConfig = {
  stiffness: 500,
  damping: 30,
  mass: 0.5
};
const thumbTravel = {
  sm: { off: 0, on: 16 },
  md: { off: 0, on: 20 }
};
const MotionThumb = import_framer_motion.motion.create("span");
const instantSpringConfig = {
  stiffness: 1e4,
  damping: 1e4,
  mass: 0.01
};
function AnimatedThumb({
  size = "md",
  checked
}) {
  const prefersReduced = (0, import_framer_motion.useReducedMotion)();
  const travel = thumbTravel[size];
  const x = (0, import_framer_motion.useMotionValue)(checked ? travel.on : travel.off);
  const springConfig = prefersReduced ? instantSpringConfig : thumbSpringConfig;
  const springX = (0, import_framer_motion.useSpring)(x, springConfig);
  (0, import_react.useEffect)(() => {
    x.set(checked ? travel.on : travel.off);
  }, [checked, travel, x]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Switch.Thumb, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    MotionThumb,
    {
      className: (0, import_cn.cn)(switchThumbVariants({ size })),
      style: { x: springX },
      "aria-hidden": "true"
    }
  ) });
}
const Switch = (0, import_react.forwardRef)(function Switch2({
  size = "md",
  label,
  description,
  labelPosition = "right",
  wrapperClassName,
  labelClassName,
  descriptionClassName,
  className,
  id: idProp,
  checked,
  defaultChecked,
  disabled,
  onCheckedChange,
  ...rest
}, ref) {
  const autoId = (0, import_react.useId)();
  const id = idProp ?? autoId;
  const descriptionId = description ? `${id}-description` : void 0;
  const isControlled = checked !== void 0;
  const [internalChecked, setInternalChecked] = (0, import_react.useState)(
    checked ?? defaultChecked ?? false
  );
  const [prevChecked, setPrevChecked] = (0, import_react.useState)(checked);
  if (isControlled && checked !== prevChecked) {
    setPrevChecked(checked);
    setInternalChecked(checked);
  }
  const handleCheckedChange = (0, import_react.useCallback)(
    (value) => {
      if (!isControlled) {
        setInternalChecked(value);
      }
      onCheckedChange?.(value);
    },
    [isControlled, onCheckedChange]
  );
  const isChecked = isControlled ? checked : internalChecked;
  const switchElement = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Switch.Root,
    {
      ref,
      id,
      checked: isControlled ? checked : void 0,
      defaultChecked: isControlled ? void 0 : defaultChecked,
      disabled,
      onCheckedChange: handleCheckedChange,
      "aria-describedby": descriptionId,
      className: (0, import_cn.cn)(switchTrackVariants({ size }), className),
      "data-ds": "",
      "data-ds-component": "switch",
      "data-ds-size": size,
      ...rest,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedThumb, { size, checked: isChecked })
    }
  );
  if (!label) {
    return switchElement;
  }
  const labelBlock = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-0.5 flex-1 min-w-0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "label",
      {
        htmlFor: id,
        className: (0, import_cn.cn)(
          "text-sm font-medium leading-5 text-foreground",
          "select-none",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "cursor-pointer",
          labelClassName
        ),
        children: label
      }
    ),
    description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "span",
      {
        id: descriptionId,
        className: (0, import_cn.cn)(
          "text-xs leading-4 text-muted-foreground",
          disabled && "opacity-50",
          descriptionClassName
        ),
        children: description
      }
    )
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: (0, import_cn.cn)(
        "flex items-center gap-3",
        // Reverse order when label is on the left
        labelPosition === "left" ? "flex-row" : "flex-row-reverse",
        // Align to start when description is present
        description && "items-start",
        wrapperClassName
      ),
      "data-ds": "",
      "data-ds-component": "switch-group",
      children: [
        switchElement,
        labelBlock
      ]
    }
  );
});
Switch.displayName = "Switch";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Switch,
  switchThumbVariants,
  switchTrackVariants
});
