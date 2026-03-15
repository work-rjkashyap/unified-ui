"use client";
import { jsx } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import {
  createContext,
  forwardRef,
  useContext
} from "react";
const CardContext = createContext({ padding: "compact" });
function useCardContext() {
  return useContext(CardContext);
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
const cardVariants = cva(
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
          focusRingClasses,
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
const Card = forwardRef(function Card2({
  variant = "default",
  padding = "compact",
  fullWidth = false,
  as: Component = "div",
  className,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ jsx(CardContext.Provider, { value: { padding }, children: /* @__PURE__ */ jsx(
    Component,
    {
      ref,
      className: cn(
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
const CardHeader = forwardRef(
  function CardHeader2({ bordered = true, className, children, ...rest }, ref) {
    const { padding } = useCardContext();
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
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
const CardBody = forwardRef(
  function CardBody2({ className, children, ...rest }, ref) {
    const { padding } = useCardContext();
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
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
const CardFooter = forwardRef(
  function CardFooter2({ bordered = true, align = "end", className, children, ...rest }, ref) {
    const { padding } = useCardContext();
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
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
export {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  cardVariants
};
