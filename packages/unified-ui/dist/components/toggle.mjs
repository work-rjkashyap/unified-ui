"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import { Toggle as TogglePrimitive } from "radix-ui";
import { forwardRef } from "react";
const toggleVariants = cva(
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
const Toggle = forwardRef(function Toggle2({
  variant = "default",
  size = "md",
  iconLeft,
  iconRight,
  className,
  children,
  ...rest
}, ref) {
  const iconSizeClass = size === "sm" ? "[&>svg]:size-3.5" : "[&>svg]:size-4";
  return /* @__PURE__ */ jsxs(
    TogglePrimitive.Root,
    {
      ref,
      className: cn(
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
        iconLeft && /* @__PURE__ */ jsx("span", { className: "shrink-0", "aria-hidden": "true", children: iconLeft }),
        children,
        iconRight && /* @__PURE__ */ jsx("span", { className: "shrink-0", "aria-hidden": "true", children: iconRight })
      ]
    }
  );
});
Toggle.displayName = "Toggle";
export {
  Toggle,
  toggleVariants
};
