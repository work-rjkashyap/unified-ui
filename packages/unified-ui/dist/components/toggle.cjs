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
var toggle_exports = {};
__export(toggle_exports, {
  Toggle: () => Toggle,
  toggleVariants: () => toggleVariants
});
module.exports = __toCommonJS(toggle_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
const toggleVariants = (0, import_class_variance_authority.cva)(
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
         * Medium visual prominence. The most common toggle style.
         */
        default: [
          "bg-transparent text-muted-foreground",
          "hover:bg-muted hover:text-foreground",
          "data-[state=on]:bg-secondary data-[state=on]:text-foreground"
        ],
        /**
         * Outline — bordered toggle with visible boundary.
         * Medium-high visual prominence. Use for toolbar-style toggles.
         */
        outline: [
          "border border-border",
          "bg-transparent text-muted-foreground",
          "hover:bg-muted hover:text-foreground",
          "data-[state=on]:bg-secondary data-[state=on]:text-foreground",
          "data-[state=on]:border-border-strong"
        ],
        /**
         * Ghost — minimal visual weight. No background until hover.
         * Low visual prominence. Use for subtle inline toggles.
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
         * Small — compact toggles for dense UIs, toolbars.
         * Height: 32px (h-8), Padding: 8px horizontal
         */
        sm: "h-8 px-2 text-xs gap-1.5",
        /**
         * Medium — default size for most toggles.
         * Height: 36px (h-9), Padding: 12px horizontal
         */
        md: "h-9 px-3 text-sm gap-2",
        /**
         * Large — prominent toggles for larger touch targets.
         * Height: 40px (h-10), Padding: 16px horizontal
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
const Toggle = (0, import_react.forwardRef)(function Toggle2({
  variant = "default",
  size = "md",
  iconLeft,
  iconRight,
  className,
  children,
  ...rest
}, ref) {
  const iconSizeClass = size === "sm" ? "[&>svg]:size-3.5" : "[&>svg]:size-4";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.Toggle.Root,
    {
      ref,
      className: (0, import_cn.cn)(
        toggleVariants({ variant, size }),
        iconSizeClass,
        className
      ),
      "data-ds": "",
      "data-ds-component": "toggle",
      "data-ds-variant": variant,
      "data-ds-size": size,
      ...rest,
      children: [
        iconLeft && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "shrink-0", "aria-hidden": "true", children: iconLeft }),
        children,
        iconRight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "shrink-0", "aria-hidden": "true", children: iconRight })
      ]
    }
  );
});
Toggle.displayName = "Toggle";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Toggle,
  toggleVariants
});
