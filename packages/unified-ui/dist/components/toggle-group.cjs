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
var toggle_group_exports = {};
__export(toggle_group_exports, {
  ToggleGroup: () => ToggleGroup,
  ToggleGroupItem: () => ToggleGroupItem,
  toggleGroupItemVariants: () => toggleGroupItemVariants,
  toggleGroupVariants: () => toggleGroupVariants,
  useToggleGroupContext: () => useToggleGroupContext
});
module.exports = __toCommonJS(toggle_group_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
const ToggleGroupContext = (0, import_react.createContext)({
  variant: "default",
  size: "md"
});
function useToggleGroupContext() {
  return (0, import_react.useContext)(ToggleGroupContext);
}
const toggleGroupVariants = (0, import_class_variance_authority.cva)(
  // Base styles — shared across all orientations
  [
    // Layout
    "inline-flex items-center",
    // Gap between items
    "gap-1"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Orientation Variants
      // -----------------------------------------------------------------
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
);
const toggleGroupItemVariants = (0, import_class_variance_authority.cva)(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "inline-flex items-center justify-center gap-2",
    // Typography
    "text-sm font-medium leading-5",
    // Shape
    "rounded-md",
    // Transition (uses design system motion tokens)
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    // Focus ring — WCAG AA compliant, visible on keyboard navigation only
    import_focus_ring.focusRingClasses,
    // Disabled — consistent across all variants
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    // Cursor
    "cursor-pointer",
    // Prevent text selection on rapid clicks
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
         * Default — transparent background, fills on press.
         */
        default: [
          "bg-transparent text-muted-foreground",
          "hover:bg-muted hover:text-foreground",
          "data-[state=on]:bg-secondary data-[state=on]:text-foreground"
        ],
        /**
         * Outline — bordered item with visible boundary.
         */
        outline: [
          "border border-border",
          "bg-transparent text-muted-foreground",
          "hover:bg-muted hover:text-foreground",
          "data-[state=on]:bg-secondary data-[state=on]:text-foreground",
          "data-[state=on]:border-border-strong"
        ],
        /**
         * Ghost — minimal visual weight.
         */
        ghost: [
          "bg-transparent text-muted-foreground",
          "hover:bg-muted hover:text-foreground",
          "data-[state=on]:bg-transparent data-[state=on]:text-foreground"
        ]
      },
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — compact for dense UIs, toolbars.
         * Height: 32px (h-8)
         */
        sm: "h-8 px-2 text-xs gap-1.5",
        /**
         * Medium — default size for most toggle groups.
         * Height: 36px (h-9)
         */
        md: "h-9 px-3 text-sm gap-2",
        /**
         * Large — prominent for larger touch targets.
         * Height: 40px (h-10)
         */
        lg: "h-10 px-4 text-sm gap-2"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
const ToggleGroup = (0, import_react.forwardRef)(function ToggleGroup2({
  variant = "default",
  size = "md",
  orientation = "horizontal",
  className,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupContext.Provider, { value: { variant, size }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.ToggleGroup.Root,
    {
      ref,
      orientation,
      className: (0, import_cn.cn)(toggleGroupVariants({ orientation }), className),
      "data-ds": "",
      "data-ds-component": "toggle-group",
      "data-ds-variant": variant,
      "data-ds-size": size,
      "data-ds-orientation": orientation,
      ...rest,
      children
    }
  ) });
});
ToggleGroup.displayName = "ToggleGroup";
const ToggleGroupItem = (0, import_react.forwardRef)(function ToggleGroupItem2({ variant: variantProp, size: sizeProp, className, children, ...rest }, ref) {
  const context = useToggleGroupContext();
  const variant = variantProp ?? context.variant;
  const size = sizeProp ?? context.size;
  const iconSizeClass = size === "sm" ? "[&>svg]:size-3.5" : "[&>svg]:size-4";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.ToggleGroup.Item,
    {
      ref,
      className: (0, import_cn.cn)(
        toggleGroupItemVariants({ variant, size }),
        iconSizeClass,
        className
      ),
      "data-ds": "",
      "data-ds-component": "toggle-group-item",
      "data-ds-variant": variant,
      "data-ds-size": size,
      ...rest,
      children
    }
  );
});
ToggleGroupItem.displayName = "ToggleGroupItem";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ToggleGroup,
  ToggleGroupItem,
  toggleGroupItemVariants,
  toggleGroupVariants,
  useToggleGroupContext
});
