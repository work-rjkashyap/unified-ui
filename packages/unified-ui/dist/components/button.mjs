"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";
const buttonVariants = cva(
  // Base styles — shared across all variants and sizes
  [
    // Opt out of prose typography overrides (prevents underline on <a> buttons)
    "not-prose no-underline",
    // Layout
    "inline-flex items-center justify-center gap-2",
    // Typography
    "text-sm font-medium leading-5",
    // Shape
    "rounded-md",
    // Transition (uses design system motion tokens)
    "transition-[color,background-color,border-color,box-shadow,opacity,transform]",
    "duration-fast ease-standard",
    // Focus ring — WCAG AA compliant, visible on keyboard navigation only
    focusRingClasses,
    // Disabled — consistent across all variants
    "disabled:pointer-events-none disabled:opacity-50",
    // Cursor
    "cursor-pointer disabled:cursor-not-allowed",
    // Prevent text selection on rapid clicks
    "select-none",
    // Smooth press feedback
    "active:scale-[0.98] disabled:active:scale-100"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Visual Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Primary — the main call-to-action. Uses brand color.
         * High visual prominence. Use sparingly (1–2 per view).
         */
        primary: [
          "bg-primary text-primary-foreground",
          "hover:bg-primary-hover",
          "active:bg-primary-active"
        ],
        /**
         * Secondary — for secondary actions. Uses muted surface color.
         * Medium visual prominence. Pairs with primary buttons.
         */
        secondary: [
          "bg-secondary text-secondary-foreground",
          "border border-border",
          "hover:bg-secondary-hover",
          "active:bg-secondary-active"
        ],
        /**
         * Ghost — minimal visual weight. No background until hover.
         * Low visual prominence. Use for tertiary actions, toolbars, nav.
         */
        ghost: [
          "bg-transparent text-foreground",
          "hover:bg-muted hover:text-foreground",
          "active:bg-secondary-active"
        ],
        /**
         * Danger — destructive actions. Uses danger (red) color.
         * High visual prominence. Use for delete, remove, revoke actions.
         */
        danger: [
          "bg-danger text-danger-foreground",
          "hover:bg-danger-hover",
          "active:bg-danger-active"
        ]
      },
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — compact buttons for dense UIs, tables, toolbars.
         * Height: 32px (h-8), Padding: 12px horizontal, Font: 12px
         */
        sm: "h-8 px-3 text-xs gap-1.5",
        /**
         * Medium — default size for most buttons.
         * Height: var(--ds-control-height), Padding: var(--ds-padding-button-x), Font: 14px
         */
        md: "h-(--ds-control-height) px-(--ds-padding-button-x) text-sm gap-2",
        /**
         * Large — prominent buttons for hero sections, forms.
         * Height: 40px (h-10), Padding: 20px horizontal, Font: 14px
         */
        lg: "h-10 px-5 text-sm gap-2"
      },
      // -----------------------------------------------------------------
      // Width Variants
      // -----------------------------------------------------------------
      fullWidth: {
        true: "w-full",
        false: ""
      },
      // -----------------------------------------------------------------
      // Icon-Only Variant
      // -----------------------------------------------------------------
      iconOnly: {
        true: "!px-0",
        false: ""
      }
    },
    // -------------------------------------------------------------------
    // Compound Variants
    // -------------------------------------------------------------------
    // Handle special combinations that can't be expressed as individual
    // variant values.
    // -------------------------------------------------------------------
    compoundVariants: [
      // Icon-only buttons are square (width = height)
      { iconOnly: true, size: "sm", className: "w-8" },
      { iconOnly: true, size: "md", className: "w-9" },
      { iconOnly: true, size: "lg", className: "w-10" }
    ],
    // -------------------------------------------------------------------
    // Default Variants
    // -------------------------------------------------------------------
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      iconOnly: false
    }
  }
);
function ButtonSpinner({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: cn("animate-spin size-4", className),
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx(
          "circle",
          {
            className: "opacity-25",
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            strokeWidth: "4"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            className: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          }
        )
      ]
    }
  );
}
const Button = forwardRef(
  function Button2({
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    loadingText,
    iconLeft,
    iconRight,
    iconOnly = false,
    disabled = false,
    as: Component = "button",
    className,
    children,
    ...rest
  }, ref) {
    const isDisabled = disabled || loading;
    const iconSizeClass = size === "sm" ? "[&>svg]:size-3.5" : "[&>svg]:size-4";
    return /* @__PURE__ */ jsxs(
      Component,
      {
        ref,
        type: Component === "button" ? "button" : void 0,
        disabled: isDisabled,
        "aria-disabled": isDisabled || void 0,
        "aria-busy": loading || void 0,
        className: cn(
          buttonVariants({ variant, size, fullWidth, iconOnly }),
          iconSizeClass,
          className
        ),
        "data-ds": "",
        "data-ds-component": "button",
        "data-ds-variant": variant,
        "data-ds-size": size,
        ...loading ? { "data-ds-loading": "" } : {},
        ...rest,
        children: [
          loading && /* @__PURE__ */ jsx(ButtonSpinner, { className: size === "sm" ? "size-3.5" : "size-4" }),
          loading && loadingText ? /* @__PURE__ */ jsx("span", { children: loadingText }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            !loading && iconLeft && /* @__PURE__ */ jsx("span", { className: "shrink-0", "aria-hidden": "true", children: iconLeft }),
            children && /* @__PURE__ */ jsx(
              "span",
              {
                className: cn(
                  "inline-flex items-center gap-[inherit]",
                  loading && !loadingText && "invisible"
                ),
                children
              }
            ),
            !loading && iconRight && /* @__PURE__ */ jsx("span", { className: "shrink-0", "aria-hidden": "true", children: iconRight })
          ] })
        ]
      }
    );
  }
);
Button.displayName = "Button";
export {
  Button,
  buttonVariants
};
