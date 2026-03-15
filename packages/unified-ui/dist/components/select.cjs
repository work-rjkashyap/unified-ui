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
var select_exports = {};
__export(select_exports, {
  Select: () => Select,
  SelectContent: () => SelectContent,
  SelectGroup: () => SelectGroup,
  SelectItem: () => SelectItem,
  SelectLabel: () => SelectLabel,
  SelectScrollDownButton: () => SelectScrollDownButton,
  SelectScrollUpButton: () => SelectScrollUpButton,
  SelectSeparator: () => SelectSeparator,
  SelectTrigger: () => SelectTrigger,
  SelectValue: () => SelectValue,
  selectTriggerVariants: () => selectTriggerVariants
});
module.exports = __toCommonJS(select_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_motion = require("../motion/index");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_framer_motion = require("framer-motion");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
const selectTriggerVariants = (0, import_class_variance_authority.cva)(
  [
    "inline-flex items-center justify-between w-full",
    "text-sm leading-5",
    "rounded-md",
    "border",
    "bg-background text-input-foreground",
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    import_focus_ring.focusRingClasses,
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m6 9 6 6 6-6" })
    }
  );
}
function ChevronUpIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m18 15-6-6-6 6" })
    }
  );
}
function CheckIconInternal({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 6 9 17l-5-5" })
    }
  );
}
const iconSizeMap = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4"
};
const Select = import_radix_ui.Select.Root;
const SelectTrigger = (0, import_react.forwardRef)(function SelectTrigger2({ className, children, variant = "default", size = "md", ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.Select.Trigger,
    {
      ref,
      className: (0, import_cn.cn)(selectTriggerVariants({ variant, size }), className),
      "data-ds": "",
      "data-ds-component": "select-trigger",
      "data-ds-variant": variant,
      "data-ds-size": size,
      ...props,
      children: [
        children,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Select.Icon, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ChevronDownIcon,
          {
            className: (0, import_cn.cn)(iconSizeMap[size], "shrink-0 text-muted-foreground")
          }
        ) })
      ]
    }
  );
});
SelectTrigger.displayName = import_radix_ui.Select.Trigger.displayName;
const SelectValue = import_radix_ui.Select.Value;
const SelectContent = (0, import_react.forwardRef)(function SelectContent2({ className, children, position = "popper", sideOffset = 4, ...props }, ref) {
  const shouldReduce = (0, import_framer_motion.useReducedMotion)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Select.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Select.Content,
    {
      ref,
      position,
      sideOffset,
      asChild: true,
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        import_framer_motion.motion.div,
        {
          className: (0, import_cn.cn)(
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
          variants: shouldReduce ? void 0 : import_motion.scaleIn.variants,
          initial: shouldReduce ? { opacity: 0 } : "initial",
          animate: shouldReduce ? { opacity: 1 } : "animate",
          exit: shouldReduce ? { opacity: 0 } : "exit",
          transition: shouldReduce ? { duration: 0.15 } : import_motion.scaleIn.transition,
          "data-ds-animated": "",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_radix_ui.Select.Viewport,
              {
                className: (0, import_cn.cn)(
                  "p-1",
                  position === "popper" && "w-full min-w-[var(--radix-select-trigger-width)]"
                ),
                children
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
          ]
        }
      )
    }
  ) });
});
SelectContent.displayName = import_radix_ui.Select.Content.displayName;
const SelectScrollUpButton = (0, import_react.forwardRef)(function SelectScrollUpButton2({ className, ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Select.ScrollUpButton,
    {
      ref,
      className: (0, import_cn.cn)(
        "flex items-center justify-center py-1",
        "cursor-default text-muted-foreground",
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUpIcon, { className: "size-4" })
    }
  );
});
SelectScrollUpButton.displayName = import_radix_ui.Select.ScrollUpButton.displayName;
const SelectScrollDownButton = (0, import_react.forwardRef)(function SelectScrollDownButton2({ className, ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Select.ScrollDownButton,
    {
      ref,
      className: (0, import_cn.cn)(
        "flex items-center justify-center py-1",
        "cursor-default text-muted-foreground",
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDownIcon, { className: "size-4" })
    }
  );
});
SelectScrollDownButton.displayName = import_radix_ui.Select.ScrollDownButton.displayName;
const SelectItem = (0, import_react.forwardRef)(function SelectItem2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.Select.Item,
    {
      ref,
      className: (0, import_cn.cn)(
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-2 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Select.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIconInternal, { className: "size-4" }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Select.ItemText, { children })
      ]
    }
  );
});
SelectItem.displayName = "SelectItem";
const SelectGroup = (0, import_react.forwardRef)(function SelectGroup2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Select.Group, { ref, className: (0, import_cn.cn)("", className), ...rest, children });
});
SelectGroup.displayName = "SelectGroup";
const SelectLabel = (0, import_react.forwardRef)(function SelectLabel2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Select.Label,
    {
      ref,
      className: (0, import_cn.cn)(
        "py-1.5 pl-8 pr-2 text-xs font-semibold text-muted-foreground",
        className
      ),
      ...rest,
      children
    }
  );
});
SelectLabel.displayName = "SelectLabel";
const SelectSeparator = (0, import_react.forwardRef)(function SelectSeparator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Select.Separator,
    {
      ref,
      className: (0, import_cn.cn)("-mx-1 my-1 h-px bg-border", className),
      ...rest
    }
  );
});
SelectSeparator.displayName = "SelectSeparator";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
