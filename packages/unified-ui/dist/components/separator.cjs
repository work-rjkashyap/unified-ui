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
var separator_exports = {};
__export(separator_exports, {
  Separator: () => Separator,
  separatorVariants: () => separatorVariants
});
module.exports = __toCommonJS(separator_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_class_variance_authority = require("class-variance-authority");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
const separatorVariants = (0, import_class_variance_authority.cva)(
  // Base styles — shared across all variants
  "shrink-0 bg-border",
  {
    variants: {
      /**
       * Visual variant of the separator line.
       */
      variant: {
        /**
         * Default — solid line using the border token color.
         */
        default: "",
        /**
         * Muted — lighter separator using the muted-foreground color at
         * reduced opacity. Useful for less prominent divisions.
         */
        muted: "bg-muted-foreground/20",
        /**
         * Dashed — renders a dashed border instead of a solid background.
         * Uses border-style rather than background.
         */
        dashed: "bg-transparent !h-auto !w-auto",
        /**
         * Gradient — fades in from transparent at both ends.
         * Creates a more elegant, subtle divider.
         */
        gradient: "bg-transparent"
      },
      /**
       * Orientation of the separator.
       */
      orientation: {
        horizontal: "h-px w-full",
        vertical: "h-full w-px"
      }
    },
    compoundVariants: [
      // Dashed + horizontal
      {
        variant: "dashed",
        orientation: "horizontal",
        class: "border-b border-dashed border-border w-full"
      },
      // Dashed + vertical
      {
        variant: "dashed",
        orientation: "vertical",
        class: "border-l border-dashed border-border h-full"
      }
    ],
    defaultVariants: {
      variant: "default",
      orientation: "horizontal"
    }
  }
);
const spacingYMap = {
  0: "my-0",
  1: "my-1",
  2: "my-2",
  3: "my-3",
  4: "my-4",
  5: "my-5",
  6: "my-6",
  8: "my-8",
  10: "my-10",
  12: "my-12"
};
const spacingXMap = {
  0: "mx-0",
  1: "mx-1",
  2: "mx-2",
  3: "mx-3",
  4: "mx-4",
  5: "mx-5",
  6: "mx-6",
  8: "mx-8",
  10: "mx-10",
  12: "mx-12"
};
const gradientHorizontal = "bg-gradient-to-r from-transparent via-border to-transparent";
const gradientVertical = "bg-gradient-to-b from-transparent via-border to-transparent";
const Separator = (0, import_react.forwardRef)(function Separator2({
  variant = "default",
  orientation = "horizontal",
  decorative = true,
  spacing = 4,
  label,
  className,
  ...rest
}, ref) {
  const isVertical = orientation === "vertical";
  const spacingClass = isVertical ? spacingXMap[spacing] ?? "mx-4" : spacingYMap[spacing] ?? "my-4";
  const gradientClass = variant === "gradient" ? isVertical ? gradientVertical : gradientHorizontal : void 0;
  if (label && !isVertical) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: (0, import_cn.cn)("flex items-center w-full", spacingClass, className),
        role: decorative ? "none" : "separator",
        "aria-orientation": decorative ? void 0 : orientation,
        "data-ds": "",
        "data-ds-component": "separator",
        "data-ds-variant": variant,
        "data-ds-orientation": orientation,
        "data-ds-labeled": "",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_radix_ui.Separator.Root,
            {
              decorative: true,
              orientation,
              className: (0, import_cn.cn)(
                separatorVariants({ variant, orientation }),
                gradientClass,
                "flex-1"
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "px-3 text-xs text-muted-foreground font-medium select-none shrink-0", children: label }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_radix_ui.Separator.Root,
            {
              decorative: true,
              orientation,
              className: (0, import_cn.cn)(
                separatorVariants({ variant, orientation }),
                gradientClass,
                "flex-1"
              )
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Separator.Root,
    {
      ref,
      decorative,
      orientation,
      className: (0, import_cn.cn)(
        separatorVariants({ variant, orientation }),
        gradientClass,
        spacingClass,
        className
      ),
      "data-ds": "",
      "data-ds-component": "separator",
      "data-ds-variant": variant,
      "data-ds-orientation": orientation,
      ...rest
    }
  );
});
Separator.displayName = "Separator";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Separator,
  separatorVariants
});
