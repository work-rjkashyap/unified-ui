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
var scroll_area_exports = {};
__export(scroll_area_exports, {
  ScrollArea: () => ScrollArea,
  ScrollBar: () => ScrollBar,
  scrollbarThumbVariants: () => scrollbarThumbVariants,
  scrollbarVariants: () => scrollbarVariants
});
module.exports = __toCommonJS(scroll_area_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_class_variance_authority = require("class-variance-authority");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
const scrollbarThumbVariants = (0, import_class_variance_authority.cva)(
  [
    // Shape
    "relative rounded-full",
    // Color
    "bg-border",
    // Transition
    "transition-[background-color] duration-fast ease-standard",
    // Hover
    "hover:bg-muted-foreground/50"
  ],
  {
    variants: {
      size: {
        sm: "",
        md: ""
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const scrollbarVariants = (0, import_class_variance_authority.cva)(
  [
    // Layout
    "flex touch-none select-none",
    // Transition
    "transition-[background-color,opacity] duration-fast ease-standard",
    // Background
    "bg-transparent",
    // Hover — subtle track background
    "hover:bg-muted/50",
    // Border
    "border-transparent"
  ],
  {
    variants: {
      orientation: {
        vertical: "h-full border-l border-l-transparent p-px",
        horizontal: "flex-col border-t border-t-transparent p-px"
      },
      size: {
        /**
         * Small — thin scrollbar for compact UIs.
         * Track width/height: 6px
         */
        sm: "",
        /**
         * Medium — default scrollbar width.
         * Track width/height: 10px
         */
        md: ""
      }
    },
    compoundVariants: [
      { orientation: "vertical", size: "sm", className: "w-1.5" },
      { orientation: "vertical", size: "md", className: "w-2.5" },
      { orientation: "horizontal", size: "sm", className: "h-1.5" },
      { orientation: "horizontal", size: "md", className: "h-2.5" }
    ],
    defaultVariants: {
      orientation: "vertical",
      size: "md"
    }
  }
);
const ScrollBar = (0, import_react.forwardRef)(function ScrollBar2({ orientation = "vertical", size = "md", className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.ScrollArea.Scrollbar,
    {
      ref,
      orientation,
      className: (0, import_cn.cn)(scrollbarVariants({ orientation, size }), className),
      "data-ds": "",
      "data-ds-component": "scroll-bar",
      "data-ds-orientation": orientation,
      "data-ds-size": size,
      ...rest,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_radix_ui.ScrollArea.Thumb,
        {
          className: (0, import_cn.cn)(scrollbarThumbVariants({ size }))
        }
      )
    }
  );
});
ScrollBar.displayName = "ScrollBar";
const ScrollArea = (0, import_react.forwardRef)(function ScrollArea2({
  type = "hover",
  scrollbarSize = "md",
  showVertical = true,
  showHorizontal = false,
  viewportClassName,
  className,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.ScrollArea.Root,
    {
      ref,
      type,
      className: (0, import_cn.cn)("relative overflow-hidden", className),
      "data-ds": "",
      "data-ds-component": "scroll-area",
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_radix_ui.ScrollArea.Viewport,
          {
            className: (0, import_cn.cn)(
              "size-full rounded-[inherit]",
              // Ensure the viewport stretches children to full width
              "[&>div]:!block",
              viewportClassName
            ),
            children
          }
        ),
        showVertical && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, { orientation: "vertical", size: scrollbarSize }),
        showHorizontal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, { orientation: "horizontal", size: scrollbarSize }),
        showVertical && showHorizontal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.ScrollArea.Corner, { className: "bg-muted/50" })
      ]
    }
  );
});
ScrollArea.displayName = "ScrollArea";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ScrollArea,
  ScrollBar,
  scrollbarThumbVariants,
  scrollbarVariants
});
