"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring
} from "framer-motion";
import { Switch as SwitchPrimitive } from "radix-ui";
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useState
} from "react";
const switchTrackVariants = cva(
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
    focusRingClasses,
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
const switchThumbVariants = cva(
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
const MotionThumb = motion.create("span");
const instantSpringConfig = {
  stiffness: 1e4,
  damping: 1e4,
  mass: 0.01
};
function AnimatedThumb({
  size = "md",
  checked
}) {
  const prefersReduced = useReducedMotion();
  const travel = thumbTravel[size];
  const x = useMotionValue(checked ? travel.on : travel.off);
  const springConfig = prefersReduced ? instantSpringConfig : thumbSpringConfig;
  const springX = useSpring(x, springConfig);
  useEffect(() => {
    x.set(checked ? travel.on : travel.off);
  }, [checked, travel, x]);
  return /* @__PURE__ */ jsx(SwitchPrimitive.Thumb, { asChild: true, children: /* @__PURE__ */ jsx(
    MotionThumb,
    {
      className: cn(switchThumbVariants({ size })),
      style: { x: springX },
      "aria-hidden": "true"
    }
  ) });
}
const Switch = forwardRef(function Switch2({
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
  const autoId = useId();
  const id = idProp ?? autoId;
  const descriptionId = description ? `${id}-description` : void 0;
  const isControlled = checked !== void 0;
  const [internalChecked, setInternalChecked] = useState(
    checked ?? defaultChecked ?? false
  );
  const [prevChecked, setPrevChecked] = useState(checked);
  if (isControlled && checked !== prevChecked) {
    setPrevChecked(checked);
    setInternalChecked(checked);
  }
  const handleCheckedChange = useCallback(
    (value) => {
      if (!isControlled) {
        setInternalChecked(value);
      }
      onCheckedChange?.(value);
    },
    [isControlled, onCheckedChange]
  );
  const isChecked = isControlled ? checked : internalChecked;
  const switchElement = /* @__PURE__ */ jsx(
    SwitchPrimitive.Root,
    {
      ref,
      id,
      checked: isControlled ? checked : void 0,
      defaultChecked: isControlled ? void 0 : defaultChecked,
      disabled,
      onCheckedChange: handleCheckedChange,
      "aria-describedby": descriptionId,
      className: cn(switchTrackVariants({ size }), className),
      "data-ds": "",
      "data-ds-component": "switch",
      "data-ds-size": size,
      ...rest,
      children: /* @__PURE__ */ jsx(AnimatedThumb, { size, checked: isChecked })
    }
  );
  if (!label) {
    return switchElement;
  }
  const labelBlock = /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5 flex-1 min-w-0", children: [
    /* @__PURE__ */ jsx(
      "label",
      {
        htmlFor: id,
        className: cn(
          "text-sm font-medium leading-5 text-foreground",
          "select-none",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "cursor-pointer",
          labelClassName
        ),
        children: label
      }
    ),
    description && /* @__PURE__ */ jsx(
      "span",
      {
        id: descriptionId,
        className: cn(
          "text-xs leading-4 text-muted-foreground",
          disabled && "opacity-50",
          descriptionClassName
        ),
        children: description
      }
    )
  ] });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
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
export {
  Switch,
  switchThumbVariants,
  switchTrackVariants
};
