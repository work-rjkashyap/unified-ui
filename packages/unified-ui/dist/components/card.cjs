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
var card_exports = {};
__export(card_exports, {
  Card: () => Card,
  CardBody: () => CardBody,
  CardFooter: () => CardFooter,
  CardHeader: () => CardHeader,
  cardVariants: () => cardVariants
});
module.exports = __toCommonJS(card_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_react = require("react");
const CardContext = (0, import_react.createContext)({ padding: "compact" });
function useCardContext() {
  return (0, import_react.useContext)(CardContext);
}
const slotPaddingXMap = {
  compact: "px-(--ds-padding-card)",
  comfortable: "px-6"
};
const cardVerticalPaddingMap = {
  compact: "py-(--ds-padding-card)",
  comfortable: "py-6"
};
const cardGapMap = {
  compact: "gap-(--ds-gap-default,0.75rem)",
  comfortable: "gap-4"
};
const cardVariants = (0, import_class_variance_authority.cva)(
  // Base styles — shared across all variants
  [
    // Layout
    "flex flex-col",
    // Shape
    "rounded-md",
    // Overflow
    "overflow-hidden",
    // Typography defaults
    "text-sm text-foreground"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Visual Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Default — subtle background with border.
         * The most common card style, blends into the page.
         */
        default: ["bg-surface", "border border-border"],
        /**
         * Outlined — transparent background with stronger border.
         * Use when the card sits on a colored or complex background.
         */
        outlined: ["bg-transparent", "border border-border-strong"],
        /**
         * Elevated — raised card with shadow.
         * Use to draw attention or lift content above the page surface.
         */
        elevated: [
          "bg-surface-raised",
          "border border-border-muted",
          "shadow-md"
        ],
        /**
         * Interactive — clickable card with hover/focus states.
         * Includes hover lift animation and cursor pointer.
         * Renders well as <a>, <button>, or <Link>.
         */
        interactive: [
          "bg-surface",
          "border border-border",
          // Transition
          "transition-[border-color,box-shadow,transform]",
          "duration-normal ease-standard",
          // Hover
          "hover:border-border-strong",
          "hover:shadow-md",
          "hover:-translate-y-0.5",
          // Active / press
          "active:translate-y-0 active:shadow-sm",
          // Focus
          import_focus_ring.focusRingClasses,
          // Cursor
          "cursor-pointer",
          // Remove text decoration for anchor usage
          "no-underline"
        ]
      },
      // -----------------------------------------------------------------
      // Full Width
      // -----------------------------------------------------------------
      fullWidth: {
        true: "w-full",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      fullWidth: false
    }
  }
);
const Card = (0, import_react.forwardRef)(function Card2({
  variant = "default",
  padding = "compact",
  fullWidth = false,
  as: Component = "div",
  className,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContext.Provider, { value: { padding }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Component,
    {
      ref,
      className: (0, import_cn.cn)(
        "not-prose",
        cardVariants({ variant, fullWidth }),
        cardVerticalPaddingMap[padding],
        cardGapMap[padding],
        className
      ),
      "data-ds": "",
      "data-ds-component": "card",
      "data-ds-variant": variant,
      ...rest,
      children
    }
  ) });
});
Card.displayName = "Card";
const alignMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between"
};
const CardHeader = (0, import_react.forwardRef)(
  function CardHeader2({ bordered = true, className, children, ...rest }, ref) {
    const { padding } = useCardContext();
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref,
        className: (0, import_cn.cn)(
          "flex flex-col gap-1.5",
          slotPaddingXMap[padding],
          bordered && "pb-(--ds-padding-card) border-b border-border-muted",
          className
        ),
        "data-ds": "",
        "data-ds-component": "card-header",
        ...rest,
        children
      }
    );
  }
);
CardHeader.displayName = "CardHeader";
const CardBody = (0, import_react.forwardRef)(
  function CardBody2({ className, children, ...rest }, ref) {
    const { padding } = useCardContext();
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref,
        className: (0, import_cn.cn)(
          "flex flex-col gap-2 flex-1",
          slotPaddingXMap[padding],
          className
        ),
        "data-ds": "",
        "data-ds-component": "card-body",
        ...rest,
        children
      }
    );
  }
);
CardBody.displayName = "CardBody";
const CardFooter = (0, import_react.forwardRef)(
  function CardFooter2({ bordered = true, align = "end", className, children, ...rest }, ref) {
    const { padding } = useCardContext();
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref,
        className: (0, import_cn.cn)(
          "flex items-center gap-2",
          slotPaddingXMap[padding],
          bordered && "pt-(--ds-padding-card) border-t border-border-muted",
          alignMap[align],
          className
        ),
        "data-ds": "",
        "data-ds-component": "card-footer",
        ...rest,
        children
      }
    );
  }
);
CardFooter.displayName = "CardFooter";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  cardVariants
});
