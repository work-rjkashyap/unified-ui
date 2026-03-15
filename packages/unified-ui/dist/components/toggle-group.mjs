"use client";
import { jsx } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import {
  createContext,
  forwardRef,
  useContext
} from "react";
const ToggleGroupContext = createContext({
  variant: "default",
  size: "md"
});
function useToggleGroupContext() {
  return useContext(ToggleGroupContext);
}
const toggleGroupVariants = cva(
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
const toggleGroupItemVariants = cva(
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
    focusRingClasses,
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
const ToggleGroup = forwardRef(function ToggleGroup2({
  variant = "default",
  size = "md",
  orientation = "horizontal",
  className,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ jsx(ToggleGroupContext.Provider, { value: { variant, size }, children: /* @__PURE__ */ jsx(
    ToggleGroupPrimitive.Root,
    {
      ref,
      orientation,
      className: cn(toggleGroupVariants({ orientation }), className),
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
const ToggleGroupItem = forwardRef(function ToggleGroupItem2({ variant: variantProp, size: sizeProp, className, children, ...rest }, ref) {
  const context = useToggleGroupContext();
  const variant = variantProp ?? context.variant;
  const size = sizeProp ?? context.size;
  const iconSizeClass = size === "sm" ? "[&>svg]:size-3.5" : "[&>svg]:size-4";
  return /* @__PURE__ */ jsx(
    ToggleGroupPrimitive.Item,
    {
      ref,
      className: cn(
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
export {
  ToggleGroup,
  ToggleGroupItem,
  toggleGroupItemVariants,
  toggleGroupVariants,
  useToggleGroupContext
};
