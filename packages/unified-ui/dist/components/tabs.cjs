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
var tabs_exports = {};
__export(tabs_exports, {
  Tabs: () => Tabs,
  TabsContent: () => TabsContent,
  TabsList: () => TabsList,
  TabsTrigger: () => TabsTrigger,
  tabsListVariants: () => tabsListVariants,
  tabsTriggerVariants: () => tabsTriggerVariants
});
module.exports = __toCommonJS(tabs_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_framer_motion = require("framer-motion");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
const TabsContext = (0, import_react.createContext)({
  variant: "underline",
  size: "md",
  orientation: "horizontal",
  layoutId: "",
  activeValue: ""
});
function useTabsContext() {
  return (0, import_react.useContext)(TabsContext);
}
const tabsListVariants = (0, import_class_variance_authority.cva)(["inline-flex items-center", "shrink-0"], {
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
const tabsTriggerVariants = (0, import_class_variance_authority.cva)(
  [
    // Layout
    "relative inline-flex items-center justify-center gap-1.5",
    // Typography
    "font-medium leading-5 whitespace-nowrap",
    // Transition
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    // Focus ring
    import_focus_ring.focusRingClasses,
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
const tabsContentVariants = (0, import_class_variance_authority.cva)(["mt-2", import_focus_ring.focusRingClasses, "rounded-sm"], {
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
const MotionSpan = import_framer_motion.motion.create("span");
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
  const prefersReduced = (0, import_framer_motion.useReducedMotion)();
  const transition = prefersReduced ? indicatorInstantConfig : indicatorSpringConfig;
  if (variant === "enclosed") {
    return null;
  }
  if (variant === "underline") {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      MotionSpan,
      {
        layoutId,
        className: (0, import_cn.cn)(
          "absolute bottom-0 left-0 right-0 h-0.5",
          "bg-primary",
          "rounded-full"
        ),
        transition
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    MotionSpan,
    {
      layoutId,
      className: (0, import_cn.cn)(
        "absolute inset-0",
        "bg-background",
        "rounded-sm",
        "shadow-sm"
      ),
      transition
    }
  );
}
const Tabs = (0, import_react.forwardRef)(function Tabs2({
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
  const autoId = (0, import_react.useId)();
  const layoutId = `tabs-indicator-${autoId}`;
  const [internalValue, setInternalValue] = (0, import_react.useState)(
    controlledValue ?? defaultValue ?? ""
  );
  const activeValue = controlledValue !== void 0 ? controlledValue : internalValue;
  const handleValueChange = (0, import_react.useCallback)(
    (newValue) => {
      if (controlledValue === void 0) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [controlledValue, onValueChange]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    TabsContext.Provider,
    {
      value: { variant, size, orientation, layoutId, activeValue },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_radix_ui.Tabs.Root,
        {
          ref,
          orientation,
          value: controlledValue,
          defaultValue: controlledValue !== void 0 ? void 0 : defaultValue,
          onValueChange: handleValueChange,
          className: (0, import_cn.cn)(
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
const TabsList = (0, import_react.forwardRef)(function TabsList2({ fullWidth = false, className, children, ...rest }, ref) {
  const { variant, orientation } = useTabsContext();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Tabs.List,
    {
      ref,
      className: (0, import_cn.cn)(
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
const TabsTrigger = (0, import_react.forwardRef)(function TabsTrigger2({ className, icon, children, disabled, value, ...rest }, ref) {
  const { variant, size, layoutId, activeValue } = useTabsContext();
  const iconSizeClass = size === "sm" ? "[&>svg]:size-3.5" : "[&>svg]:size-4";
  const isActive = value === activeValue;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.Tabs.Trigger,
    {
      ref,
      value,
      disabled,
      className: (0, import_cn.cn)(
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
        variant !== "enclosed" && isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 pointer-events-none", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveIndicator, { variant, layoutId }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: (0, import_cn.cn)("relative z-[1] inline-flex items-center gap-1.5"), children: [
          icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "shrink-0", "aria-hidden": "true", children: icon }),
          children
        ] })
      ]
    }
  );
});
TabsTrigger.displayName = "TabsTrigger";
const TabsContent = (0, import_react.forwardRef)(function TabsContent2({ className, children, ...rest }, ref) {
  const { orientation } = useTabsContext();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Tabs.Content,
    {
      ref,
      className: (0, import_cn.cn)(tabsContentVariants({ orientation }), className),
      "data-ds": "",
      "data-ds-component": "tabs-content",
      ...rest,
      children
    }
  );
});
TabsContent.displayName = "TabsContent";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  tabsListVariants,
  tabsTriggerVariants
});
