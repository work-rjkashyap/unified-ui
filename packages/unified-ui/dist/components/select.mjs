"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { scaleIn } from "../motion/index";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import { motion, useReducedMotion } from "framer-motion";
import { Select as SelectPrimitive } from "radix-ui";
import {
  forwardRef
} from "react";
const selectTriggerVariants = cva(
  [
    "inline-flex items-center justify-between w-full",
    "text-sm leading-5",
    "rounded-md",
    "border",
    "bg-background text-input-foreground",
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    focusRingClasses,
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled-foreground",
    "data-[placeholder]:text-input-placeholder",
    "cursor-pointer"
  ],
  {
    variants: {
      variant: {
        default: [
          "border-input",
          "hover:border-border-strong",
          "focus-visible:border-border-strong"
        ],
        error: [
          "border-danger",
          "text-foreground",
          "focus-visible:border-danger"
        ],
        success: [
          "border-success",
          "text-foreground",
          "focus-visible:border-success"
        ]
      },
      size: {
        sm: "h-8 px-2.5 text-xs gap-1.5",
        md: "h-9 px-3 text-sm gap-2",
        lg: "h-10 px-3.5 text-sm gap-2"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
function ChevronDownIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6" })
    }
  );
}
function ChevronUpIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "m18 15-6-6-6 6" })
    }
  );
}
function CheckIconInternal({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "M20 6 9 17l-5-5" })
    }
  );
}
const iconSizeMap = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4"
};
const Select = SelectPrimitive.Root;
const SelectTrigger = forwardRef(function SelectTrigger2({ className, children, variant = "default", size = "md", ...props }, ref) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Trigger,
    {
      ref,
      className: cn(selectTriggerVariants({ variant, size }), className),
      "data-ds": "",
      "data-ds-component": "select-trigger",
      "data-ds-variant": variant,
      "data-ds-size": size,
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(
          ChevronDownIcon,
          {
            className: cn(iconSizeMap[size], "shrink-0 text-muted-foreground")
          }
        ) })
      ]
    }
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectValue = SelectPrimitive.Value;
const SelectContent = forwardRef(function SelectContent2({ className, children, position = "popper", sideOffset = 4, ...props }, ref) {
  const shouldReduce = useReducedMotion();
  return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    SelectPrimitive.Content,
    {
      ref,
      position,
      sideOffset,
      asChild: true,
      ...props,
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: cn(
            "relative z-[var(--z-popover)]",
            "min-w-[var(--radix-select-trigger-width)]",
            "max-h-[min(var(--radix-select-content-available-height),320px)]",
            "overflow-hidden",
            "rounded-md",
            "border border-border",
            "bg-background",
            "shadow-lg",
            className
          ),
          variants: shouldReduce ? void 0 : scaleIn.variants,
          initial: shouldReduce ? { opacity: 0 } : "initial",
          animate: shouldReduce ? { opacity: 1 } : "animate",
          exit: shouldReduce ? { opacity: 0 } : "exit",
          transition: shouldReduce ? { duration: 0.15 } : scaleIn.transition,
          "data-ds-animated": "",
          children: [
            /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
            /* @__PURE__ */ jsx(
              SelectPrimitive.Viewport,
              {
                className: cn(
                  "p-1",
                  position === "popper" && "w-full min-w-[var(--radix-select-trigger-width)]"
                ),
                children
              }
            ),
            /* @__PURE__ */ jsx(SelectScrollDownButton, {})
          ]
        }
      )
    }
  ) });
});
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectScrollUpButton = forwardRef(function SelectScrollUpButton2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollUpButton,
    {
      ref,
      className: cn(
        "flex items-center justify-center py-1",
        "cursor-default text-muted-foreground",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronUpIcon, { className: "size-4" })
    }
  );
});
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = forwardRef(function SelectScrollDownButton2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollDownButton,
    {
      ref,
      className: cn(
        "flex items-center justify-center py-1",
        "cursor-default text-muted-foreground",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4" })
    }
  );
});
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectItem = forwardRef(function SelectItem2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      ref,
      className: cn(
        "relative flex w-full cursor-pointer select-none items-center",
        "rounded-sm py-1.5 pl-8 pr-2",
        "text-sm leading-5 text-foreground",
        "outline-none",
        "focus:bg-muted focus:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      ),
      "data-ds": "",
      "data-ds-component": "select-item",
      ...rest,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIconInternal, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
      ]
    }
  );
});
SelectItem.displayName = "SelectItem";
const SelectGroup = forwardRef(function SelectGroup2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Group, { ref, className: cn("", className), ...rest, children });
});
SelectGroup.displayName = "SelectGroup";
const SelectLabel = forwardRef(function SelectLabel2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.Label,
    {
      ref,
      className: cn(
        "py-1.5 pl-8 pr-2 text-xs font-semibold text-muted-foreground",
        className
      ),
      ...rest,
      children
    }
  );
});
SelectLabel.displayName = "SelectLabel";
const SelectSeparator = forwardRef(function SelectSeparator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.Separator,
    {
      ref,
      className: cn("-mx-1 my-1 h-px bg-border", className),
      ...rest
    }
  );
});
SelectSeparator.displayName = "SelectSeparator";
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  selectTriggerVariants
};
