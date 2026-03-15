"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import {
  createContext,
  forwardRef,
  useContext,
  useId
} from "react";
const RadioGroupContext = createContext({
  size: "md"
});
function useRadioGroupContext() {
  return useContext(RadioGroupContext);
}
const radioGroupVariants = cva(["flex"], {
  variants: {
    orientation: {
      vertical: "flex-col gap-3",
      horizontal: "flex-row flex-wrap gap-4"
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
});
const radioIndicatorVariants = cva(
  [
    // Layout
    "relative shrink-0",
    // Shape
    "rounded-full",
    // Border
    "border",
    // Colors
    "border-input bg-background",
    // Transition
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    // Focus ring — WCAG AA compliant
    focusRingClasses,
    // Hover
    "hover:border-border-strong",
    // Checked state
    "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-disabled"
  ],
  {
    variants: {
      size: {
        /**
         * Small — compact for dense UIs, tables, toolbars.
         * Diameter: 16px
         */
        sm: "size-4",
        /**
         * Medium — default size for most radio buttons.
         * Diameter: 20px
         */
        md: "size-5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const radioInnerDotVariants = cva(
  [
    "absolute inset-0 flex items-center justify-center",
    "after:block after:rounded-full after:bg-primary-foreground"
  ],
  {
    variants: {
      size: {
        sm: "after:size-1.5",
        md: "after:size-2"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const radioCardVariants = cva(
  [
    // Layout
    "relative flex items-start gap-3",
    // Shape
    "rounded-md",
    // Border
    "border border-input",
    // Colors
    "bg-background",
    // Transition
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    // Hover
    "hover:border-border-strong hover:bg-surface",
    // Cursor
    "cursor-pointer",
    // Checked state
    "has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-muted",
    // Disabled
    "has-[[data-disabled]]:pointer-events-none has-[[data-disabled]]:opacity-50 has-[[data-disabled]]:cursor-not-allowed",
    // Focus within
    "has-[:focus-visible]:border-border-strong"
  ],
  {
    variants: {
      size: {
        sm: "p-3",
        md: "p-4"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const labelSizeMap = {
  sm: "text-xs",
  md: "text-sm"
};
const descriptionSizeMap = {
  sm: "text-xs",
  md: "text-xs"
};
const RadioGroup = forwardRef(function RadioGroup2({
  orientation = "vertical",
  size = "md",
  disabled,
  className,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ jsx(RadioGroupContext.Provider, { value: { size, disabled }, children: /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Root,
    {
      ref,
      orientation,
      disabled,
      className: cn(radioGroupVariants({ orientation }), className),
      "data-ds": "",
      "data-ds-component": "radio-group",
      "data-ds-orientation": orientation,
      "data-ds-size": size,
      ...rest,
      children
    }
  ) });
});
RadioGroup.displayName = "RadioGroup";
const RadioGroupItem = forwardRef(function RadioGroupItem2({ value, label, description, size: sizeProp, disabled, className, ...rest }, ref) {
  const { size: groupSize, disabled: groupDisabled } = useRadioGroupContext();
  const size = sizeProp ?? groupSize;
  const isDisabled = disabled ?? groupDisabled;
  const generatedId = useId();
  const itemId = rest.id ?? `radio-${generatedId}`;
  const labelId = label ? `${itemId}-label` : void 0;
  const descriptionId = description ? `${itemId}-desc` : void 0;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex items-start gap-2",
        isDisabled && "opacity-50 cursor-not-allowed",
        className
      ),
      "data-ds": "",
      "data-ds-component": "radio-item-wrapper",
      children: [
        /* @__PURE__ */ jsx(
          RadioGroupPrimitive.Item,
          {
            ref,
            id: itemId,
            value,
            disabled: isDisabled,
            "aria-labelledby": labelId,
            "aria-describedby": descriptionId,
            className: cn(radioIndicatorVariants({ size }), "mt-0.5"),
            "data-ds": "",
            "data-ds-component": "radio-item",
            "data-ds-size": size,
            ...rest,
            children: /* @__PURE__ */ jsx(
              RadioGroupPrimitive.Indicator,
              {
                className: cn(radioInnerDotVariants({ size }))
              }
            )
          }
        ),
        (label || description) && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5 min-w-0 flex-1", children: [
          label && /* @__PURE__ */ jsx(
            "label",
            {
              id: labelId,
              htmlFor: itemId,
              className: cn(
                "font-medium leading-5 text-foreground",
                "cursor-pointer",
                isDisabled && "cursor-not-allowed",
                labelSizeMap[size]
              ),
              children: label
            }
          ),
          description && /* @__PURE__ */ jsx(
            "span",
            {
              id: descriptionId,
              className: cn(
                "text-muted-foreground leading-4",
                descriptionSizeMap[size]
              ),
              children: description
            }
          )
        ] })
      ]
    }
  );
});
RadioGroupItem.displayName = "RadioGroupItem";
const RadioCard = forwardRef(function RadioCard2({
  value,
  label,
  description,
  size: sizeProp,
  disabled,
  className,
  children,
  ...rest
}, ref) {
  const { size: groupSize, disabled: groupDisabled } = useRadioGroupContext();
  const size = sizeProp ?? groupSize;
  const isDisabled = disabled ?? groupDisabled;
  const generatedId = useId();
  const itemId = rest.id ?? `radio-card-${generatedId}`;
  const labelId = label ? `${itemId}-label` : void 0;
  const descriptionId = description ? `${itemId}-desc` : void 0;
  return /* @__PURE__ */ jsxs(
    "label",
    {
      htmlFor: itemId,
      className: cn(
        radioCardVariants({ size }),
        isDisabled && "cursor-not-allowed",
        className
      ),
      "data-ds": "",
      "data-ds-component": "radio-card",
      "data-ds-size": size,
      children: [
        /* @__PURE__ */ jsx(
          RadioGroupPrimitive.Item,
          {
            ref,
            id: itemId,
            value,
            disabled: isDisabled,
            "aria-labelledby": labelId,
            "aria-describedby": descriptionId,
            className: cn(radioIndicatorVariants({ size }), "mt-0.5 shrink-0"),
            "data-ds": "",
            "data-ds-component": "radio-card-item",
            "data-ds-size": size,
            ...rest,
            children: /* @__PURE__ */ jsx(
              RadioGroupPrimitive.Indicator,
              {
                className: cn(radioInnerDotVariants({ size }))
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5 min-w-0 flex-1", children: [
          label && /* @__PURE__ */ jsx(
            "span",
            {
              id: labelId,
              className: cn(
                "font-medium leading-5 text-foreground",
                labelSizeMap[size]
              ),
              children: label
            }
          ),
          description && /* @__PURE__ */ jsx(
            "span",
            {
              id: descriptionId,
              className: cn(
                "text-muted-foreground leading-4",
                descriptionSizeMap[size]
              ),
              children: description
            }
          ),
          children
        ] })
      ]
    }
  );
});
RadioCard.displayName = "RadioCard";
export {
  RadioCard,
  RadioGroup,
  RadioGroupItem,
  radioCardVariants,
  radioGroupVariants,
  radioIndicatorVariants
};
