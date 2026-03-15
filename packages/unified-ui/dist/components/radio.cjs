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
var radio_exports = {};
__export(radio_exports, {
  RadioCard: () => RadioCard,
  RadioGroup: () => RadioGroup,
  RadioGroupItem: () => RadioGroupItem,
  radioCardVariants: () => radioCardVariants,
  radioGroupVariants: () => radioGroupVariants,
  radioIndicatorVariants: () => radioIndicatorVariants
});
module.exports = __toCommonJS(radio_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
const RadioGroupContext = (0, import_react.createContext)({
  size: "md"
});
function useRadioGroupContext() {
  return (0, import_react.useContext)(RadioGroupContext);
}
const radioGroupVariants = (0, import_class_variance_authority.cva)(["flex"], {
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
const radioIndicatorVariants = (0, import_class_variance_authority.cva)(
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
    import_focus_ring.focusRingClasses,
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
const radioInnerDotVariants = (0, import_class_variance_authority.cva)(
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
const radioCardVariants = (0, import_class_variance_authority.cva)(
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
const RadioGroup = (0, import_react.forwardRef)(function RadioGroup2({
  orientation = "vertical",
  size = "md",
  disabled,
  className,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupContext.Provider, { value: { size, disabled }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.RadioGroup.Root,
    {
      ref,
      orientation,
      disabled,
      className: (0, import_cn.cn)(radioGroupVariants({ orientation }), className),
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
const RadioGroupItem = (0, import_react.forwardRef)(function RadioGroupItem2({ value, label, description, size: sizeProp, disabled, className, ...rest }, ref) {
  const { size: groupSize, disabled: groupDisabled } = useRadioGroupContext();
  const size = sizeProp ?? groupSize;
  const isDisabled = disabled ?? groupDisabled;
  const generatedId = (0, import_react.useId)();
  const itemId = rest.id ?? `radio-${generatedId}`;
  const labelId = label ? `${itemId}-label` : void 0;
  const descriptionId = description ? `${itemId}-desc` : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: (0, import_cn.cn)(
        "flex items-start gap-2",
        isDisabled && "opacity-50 cursor-not-allowed",
        className
      ),
      "data-ds": "",
      "data-ds-component": "radio-item-wrapper",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_radix_ui.RadioGroup.Item,
          {
            ref,
            id: itemId,
            value,
            disabled: isDisabled,
            "aria-labelledby": labelId,
            "aria-describedby": descriptionId,
            className: (0, import_cn.cn)(radioIndicatorVariants({ size }), "mt-0.5"),
            "data-ds": "",
            "data-ds-component": "radio-item",
            "data-ds-size": size,
            ...rest,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_radix_ui.RadioGroup.Indicator,
              {
                className: (0, import_cn.cn)(radioInnerDotVariants({ size }))
              }
            )
          }
        ),
        (label || description) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-0.5 min-w-0 flex-1", children: [
          label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "label",
            {
              id: labelId,
              htmlFor: itemId,
              className: (0, import_cn.cn)(
                "font-medium leading-5 text-foreground",
                "cursor-pointer",
                isDisabled && "cursor-not-allowed",
                labelSizeMap[size]
              ),
              children: label
            }
          ),
          description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              id: descriptionId,
              className: (0, import_cn.cn)(
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
const RadioCard = (0, import_react.forwardRef)(function RadioCard2({
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
  const generatedId = (0, import_react.useId)();
  const itemId = rest.id ?? `radio-card-${generatedId}`;
  const labelId = label ? `${itemId}-label` : void 0;
  const descriptionId = description ? `${itemId}-desc` : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "label",
    {
      htmlFor: itemId,
      className: (0, import_cn.cn)(
        radioCardVariants({ size }),
        isDisabled && "cursor-not-allowed",
        className
      ),
      "data-ds": "",
      "data-ds-component": "radio-card",
      "data-ds-size": size,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_radix_ui.RadioGroup.Item,
          {
            ref,
            id: itemId,
            value,
            disabled: isDisabled,
            "aria-labelledby": labelId,
            "aria-describedby": descriptionId,
            className: (0, import_cn.cn)(radioIndicatorVariants({ size }), "mt-0.5 shrink-0"),
            "data-ds": "",
            "data-ds-component": "radio-card-item",
            "data-ds-size": size,
            ...rest,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_radix_ui.RadioGroup.Indicator,
              {
                className: (0, import_cn.cn)(radioInnerDotVariants({ size }))
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-0.5 min-w-0 flex-1", children: [
          label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              id: labelId,
              className: (0, import_cn.cn)(
                "font-medium leading-5 text-foreground",
                labelSizeMap[size]
              ),
              children: label
            }
          ),
          description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              id: descriptionId,
              className: (0, import_cn.cn)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RadioCard,
  RadioGroup,
  RadioGroupItem,
  radioCardVariants,
  radioGroupVariants,
  radioIndicatorVariants
});
