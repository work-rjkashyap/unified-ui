"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import { motion, useReducedMotion } from "framer-motion";
import { Tabs as TabsPrimitive } from "radix-ui";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useState
} from "react";
const TabsContext = createContext({
  variant: "underline",
  size: "md",
  orientation: "horizontal",
  layoutId: "",
  activeValue: ""
});
function useTabsContext() {
  return useContext(TabsContext);
}
const tabsListVariants = cva(["inline-flex items-center", "shrink-0"], {
  variants: {
    variant: {
      underline: ["border-b border-border", "gap-0"],
      pills: ["gap-1", "rounded-md", "bg-muted", "p-1"],
      enclosed: ["border-b border-border", "gap-0"]
    },
    orientation: {
      horizontal: "flex-row w-full",
      vertical: "flex-col w-auto border-b-0"
    },
    fullWidth: {
      true: "",
      false: ""
    }
  },
  compoundVariants: [
    // Vertical orientation adjustments
    {
      variant: "underline",
      orientation: "vertical",
      className: "border-b-0 border-r border-border"
    },
    {
      variant: "enclosed",
      orientation: "vertical",
      className: "border-b-0 border-r border-border"
    }
  ],
  defaultVariants: {
    variant: "underline",
    orientation: "horizontal",
    fullWidth: false
  }
});
const tabsTriggerVariants = cva(
  [
    // Layout
    "relative inline-flex items-center justify-center gap-1.5",
    // Typography
    "font-medium leading-5 whitespace-nowrap",
    // Transition
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    // Focus ring
    focusRingClasses,
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50",
    // Cursor
    "cursor-pointer select-none"
  ],
  {
    variants: {
      variant: {
        underline: [
          "bg-transparent",
          "text-muted-foreground",
          "hover:text-foreground",
          "data-[state=active]:text-foreground",
          // Bottom border space for the active indicator
          "border-b-2 border-transparent -mb-px"
        ],
        pills: [
          "rounded-sm",
          "text-muted-foreground",
          "hover:text-foreground hover:bg-background/60",
          "data-[state=active]:text-foreground"
        ],
        enclosed: [
          "bg-transparent",
          "text-muted-foreground",
          "border border-transparent",
          "hover:text-foreground",
          "data-[state=active]:text-foreground",
          "data-[state=active]:bg-background",
          "data-[state=active]:border-border",
          "data-[state=active]:border-b-transparent",
          "-mb-px"
        ]
      },
      size: {
        sm: "text-xs px-3 py-1.5",
        md: "text-sm px-4 py-2"
      }
    },
    defaultVariants: {
      variant: "underline",
      size: "md"
    }
  }
);
const tabsContentVariants = cva(["mt-2", focusRingClasses, "rounded-sm"], {
  variants: {
    orientation: {
      horizontal: "mt-2",
      vertical: "mt-0 ml-4"
    }
  },
  defaultVariants: {
    orientation: "horizontal"
  }
});
const MotionSpan = motion.create("span");
const indicatorSpringConfig = {
  type: "spring",
  stiffness: 500,
  damping: 35,
  mass: 0.5
};
const indicatorInstantConfig = {
  type: "tween",
  duration: 0
};
function ActiveIndicator({
  variant,
  layoutId
}) {
  const prefersReduced = useReducedMotion();
  const transition = prefersReduced ? indicatorInstantConfig : indicatorSpringConfig;
  if (variant === "enclosed") {
    return null;
  }
  if (variant === "underline") {
    return /* @__PURE__ */ jsx(
      MotionSpan,
      {
        layoutId,
        className: cn(
          "absolute bottom-0 left-0 right-0 h-0.5",
          "bg-primary",
          "rounded-full"
        ),
        transition
      }
    );
  }
  return /* @__PURE__ */ jsx(
    MotionSpan,
    {
      layoutId,
      className: cn(
        "absolute inset-0",
        "bg-background",
        "rounded-sm",
        "shadow-sm"
      ),
      transition
    }
  );
}
const Tabs = forwardRef(function Tabs2({
  variant = "underline",
  size = "md",
  orientation = "horizontal",
  className,
  children,
  value: controlledValue,
  defaultValue,
  onValueChange,
  ...rest
}, ref) {
  const autoId = useId();
  const layoutId = `tabs-indicator-${autoId}`;
  const [internalValue, setInternalValue] = useState(
    controlledValue ?? defaultValue ?? ""
  );
  const activeValue = controlledValue !== void 0 ? controlledValue : internalValue;
  const handleValueChange = useCallback(
    (newValue) => {
      if (controlledValue === void 0) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [controlledValue, onValueChange]
  );
  return /* @__PURE__ */ jsx(
    TabsContext.Provider,
    {
      value: { variant, size, orientation, layoutId, activeValue },
      children: /* @__PURE__ */ jsx(
        TabsPrimitive.Root,
        {
          ref,
          orientation,
          value: controlledValue,
          defaultValue: controlledValue !== void 0 ? void 0 : defaultValue,
          onValueChange: handleValueChange,
          className: cn(
            "not-prose",
            orientation === "vertical" && "flex flex-row",
            className
          ),
          "data-ds": "",
          "data-ds-component": "tabs",
          "data-ds-variant": variant,
          "data-ds-size": size,
          "data-ds-orientation": orientation,
          ...rest,
          children
        }
      )
    }
  );
});
Tabs.displayName = "Tabs";
const TabsList = forwardRef(function TabsList2({ fullWidth = false, className, children, ...rest }, ref) {
  const { variant, orientation } = useTabsContext();
  return /* @__PURE__ */ jsx(
    TabsPrimitive.List,
    {
      ref,
      className: cn(
        tabsListVariants({ variant, orientation, fullWidth }),
        fullWidth && orientation === "horizontal" && "[&>*]:flex-1",
        className
      ),
      "data-ds": "",
      "data-ds-component": "tabs-list",
      ...rest,
      children
    }
  );
});
TabsList.displayName = "TabsList";
const TabsTrigger = forwardRef(function TabsTrigger2({ className, icon, children, disabled, value, ...rest }, ref) {
  const { variant, size, layoutId, activeValue } = useTabsContext();
  const iconSizeClass = size === "sm" ? "[&>svg]:size-3.5" : "[&>svg]:size-4";
  const isActive = value === activeValue;
  return /* @__PURE__ */ jsxs(
    TabsPrimitive.Trigger,
    {
      ref,
      value,
      disabled,
      className: cn(
        tabsTriggerVariants({ variant, size }),
        iconSizeClass,
        // For underline variant, make border transparent — the motion indicator handles the active line
        variant === "underline" && "data-[state=active]:border-transparent",
        className
      ),
      "data-ds": "",
      "data-ds-component": "tabs-trigger",
      ...rest,
      children: [
        variant !== "enclosed" && isActive && /* @__PURE__ */ jsx("span", { className: "absolute inset-0 pointer-events-none", children: /* @__PURE__ */ jsx(ActiveIndicator, { variant, layoutId }) }),
        /* @__PURE__ */ jsxs("span", { className: cn("relative z-[1] inline-flex items-center gap-1.5"), children: [
          icon && /* @__PURE__ */ jsx("span", { className: "shrink-0", "aria-hidden": "true", children: icon }),
          children
        ] })
      ]
    }
  );
});
TabsTrigger.displayName = "TabsTrigger";
const TabsContent = forwardRef(function TabsContent2({ className, children, ...rest }, ref) {
  const { orientation } = useTabsContext();
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Content,
    {
      ref,
      className: cn(tabsContentVariants({ orientation }), className),
      "data-ds": "",
      "data-ds-component": "tabs-content",
      ...rest,
      children
    }
  );
});
TabsContent.displayName = "TabsContent";
export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  tabsListVariants,
  tabsTriggerVariants
};
