"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { cva } from "class-variance-authority";
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
import {
  forwardRef
} from "react";
const scrollbarThumbVariants = cva(
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
const scrollbarVariants = cva(
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
const ScrollBar = forwardRef(function ScrollBar2({ orientation = "vertical", size = "md", className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    ScrollAreaPrimitive.Scrollbar,
    {
      ref,
      orientation,
      className: cn(scrollbarVariants({ orientation, size }), className),
      "data-ds": "",
      "data-ds-component": "scroll-bar",
      "data-ds-orientation": orientation,
      "data-ds-size": size,
      ...rest,
      children: /* @__PURE__ */ jsx(
        ScrollAreaPrimitive.Thumb,
        {
          className: cn(scrollbarThumbVariants({ size }))
        }
      )
    }
  );
});
ScrollBar.displayName = "ScrollBar";
const ScrollArea = forwardRef(function ScrollArea2({
  type = "hover",
  scrollbarSize = "md",
  showVertical = true,
  showHorizontal = false,
  viewportClassName,
  className,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ jsxs(
    ScrollAreaPrimitive.Root,
    {
      ref,
      type,
      className: cn("relative overflow-hidden", className),
      "data-ds": "",
      "data-ds-component": "scroll-area",
      ...rest,
      children: [
        /* @__PURE__ */ jsx(
          ScrollAreaPrimitive.Viewport,
          {
            className: cn(
              "size-full rounded-[inherit]",
              // Ensure the viewport stretches children to full width
              "[&>div]:!block",
              viewportClassName
            ),
            children
          }
        ),
        showVertical && /* @__PURE__ */ jsx(ScrollBar, { orientation: "vertical", size: scrollbarSize }),
        showHorizontal && /* @__PURE__ */ jsx(ScrollBar, { orientation: "horizontal", size: scrollbarSize }),
        showVertical && showHorizontal && /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, { className: "bg-muted/50" })
      ]
    }
  );
});
ScrollArea.displayName = "ScrollArea";
export {
  ScrollArea,
  ScrollBar,
  scrollbarThumbVariants,
  scrollbarVariants
};
