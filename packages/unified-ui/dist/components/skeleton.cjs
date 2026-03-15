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
var skeleton_exports = {};
__export(skeleton_exports, {
  Skeleton: () => Skeleton,
  SkeletonCircle: () => SkeletonCircle,
  SkeletonRect: () => SkeletonRect,
  SkeletonText: () => SkeletonText,
  skeletonVariants: () => skeletonVariants
});
module.exports = __toCommonJS(skeleton_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_class_variance_authority = require("class-variance-authority");
var import_react = require("react");
const skeletonVariants = (0, import_class_variance_authority.cva)(
  // Base styles — shared across all shapes
  [
    // Background
    "bg-muted",
    // Animation — gentle pulse
    "animate-pulse",
    // Ensure it doesn't collapse
    "shrink-0"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Shape Variants
      // -----------------------------------------------------------------
      shape: {
        /**
         * Text — a horizontal line placeholder for text content.
         * Default height matches body text line-height.
         * Rounded for a softer appearance.
         */
        text: "h-4 w-full rounded-sm",
        /**
         * Circle — a circular placeholder for avatars, icons.
         * Uses border-radius: 9999px (full circle).
         */
        circle: "rounded-full aspect-square",
        /**
         * Rect — a rectangular placeholder for images, cards, media.
         * Uses standard border-radius.
         */
        rect: "rounded-md"
      }
    },
    defaultVariants: {
      shape: "text"
    }
  }
);
const circleSizeMap = {
  xs: "size-6",
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
  xl: "size-16"
};
const textHeightMap = {
  xs: "h-3",
  sm: "h-3.5",
  md: "h-4",
  lg: "h-5"
};
function resolveDimension(value) {
  if (value === void 0) return void 0;
  if (typeof value === "number") return `${value}px`;
  return value;
}
const Skeleton = (0, import_react.forwardRef)(
  function Skeleton2({
    shape = "text",
    width,
    height,
    size = "md",
    textSize = "md",
    animate = true,
    className,
    style,
    ...rest
  }, ref) {
    const dimensionStyles = {
      ...style,
      width: resolveDimension(width),
      height: resolveDimension(height)
    };
    if (dimensionStyles.width === void 0) delete dimensionStyles.width;
    if (dimensionStyles.height === void 0) delete dimensionStyles.height;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref,
        role: "presentation",
        "aria-hidden": "true",
        className: (0, import_cn.cn)(
          skeletonVariants({ shape }),
          // Circle: apply size class
          shape === "circle" && !width && !height && circleSizeMap[size],
          // Text: apply text height class (unless custom height provided)
          shape === "text" && !height && textHeightMap[textSize],
          // Disable animation
          !animate && "animate-none",
          className
        ),
        style: Object.keys(dimensionStyles).length > 0 ? dimensionStyles : void 0,
        "data-ds": "",
        "data-ds-component": "skeleton",
        "data-ds-shape": shape,
        ...rest
      }
    );
  }
);
Skeleton.displayName = "Skeleton";
const SkeletonText = (0, import_react.forwardRef)(
  function SkeletonText2({
    lines = 3,
    textSize = "md",
    lastLineWidth = "60%",
    gap = "gap-2.5",
    animate = true,
    className,
    ...rest
  }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref,
        role: "presentation",
        "aria-hidden": "true",
        className: (0, import_cn.cn)("flex flex-col w-full", gap, className),
        "data-ds": "",
        "data-ds-component": "skeleton-text",
        ...rest,
        children: Array.from({ length: lines }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          Skeleton,
          {
            shape: "text",
            textSize,
            width: i === lines - 1 && lines > 1 ? lastLineWidth : void 0,
            animate
          },
          i
        ))
      }
    );
  }
);
SkeletonText.displayName = "SkeletonText";
const SkeletonCircle = (0, import_react.forwardRef)(
  function SkeletonCircle2({ size = "md", animate = true, className, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Skeleton,
      {
        ref,
        shape: "circle",
        size,
        animate,
        className,
        ...rest
      }
    );
  }
);
SkeletonCircle.displayName = "SkeletonCircle";
const SkeletonRect = (0, import_react.forwardRef)(
  function SkeletonRect2({ width = "100%", height = 120, animate = true, className, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Skeleton,
      {
        ref,
        shape: "rect",
        width,
        height,
        animate,
        className,
        ...rest
      }
    );
  }
);
SkeletonRect.displayName = "SkeletonRect";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Skeleton,
  SkeletonCircle,
  SkeletonRect,
  SkeletonText,
  skeletonVariants
});
