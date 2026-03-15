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
var accordion_exports = {};
__export(accordion_exports, {
  Accordion: () => Accordion,
  AccordionContent: () => AccordionContent,
  AccordionItem: () => AccordionItem,
  AccordionTrigger: () => AccordionTrigger,
  accordionContentVariants: () => accordionContentVariants,
  accordionRootVariants: () => accordionRootVariants,
  accordionTriggerVariants: () => accordionTriggerVariants
});
module.exports = __toCommonJS(accordion_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
const AccordionContext = (0, import_react.createContext)({
  variant: "bordered",
  size: "md"
});
function useAccordionContext() {
  return (0, import_react.useContext)(AccordionContext);
}
const accordionRootVariants = (0, import_class_variance_authority.cva)(["flex flex-col"], {
  variants: {
    variant: {
      /**
       * Bordered — each item has a visible border separator.
       * Default variant for most use cases.
       */
      bordered: "divide-y divide-border",
      /**
       * Borderless — no visible borders between items.
       * Use for tighter layouts or when embedded inside cards.
       */
      borderless: ""
    }
  },
  defaultVariants: {
    variant: "bordered"
  }
});
const accordionTriggerVariants = (0, import_class_variance_authority.cva)(
  [
    // Layout
    "flex flex-1 items-center justify-between w-full",
    // Typography
    "font-medium text-foreground",
    // Transition
    "transition-[color,background-color,opacity]",
    "duration-fast ease-standard",
    // Focus ring
    import_focus_ring.focusRingClasses,
    // Hover
    "hover:text-foreground hover:underline",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    // Cursor
    "cursor-pointer",
    // Chevron rotation on open
    "[&>svg]:transition-transform [&>svg]:duration-normal [&>svg]:ease-standard",
    "[&[data-state=open]>svg]:rotate-180"
  ],
  {
    variants: {
      size: {
        /**
         * Small — compact for dense UIs, sidebars.
         */
        sm: "py-3 text-sm leading-5",
        /**
         * Medium — default size for most accordions.
         */
        md: "py-4 text-sm leading-5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const accordionContentVariants = (0, import_class_variance_authority.cva)(
  [
    // Animate expand/collapse using CSS grid trick
    "overflow-hidden",
    "data-[state=closed]:animate-accordion-up",
    "data-[state=open]:animate-accordion-down"
  ],
  {
    variants: {
      size: {
        sm: "text-sm leading-5",
        md: "text-sm leading-5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const accordionContentInnerVariants = (0, import_class_variance_authority.cva)(["text-muted-foreground"], {
  variants: {
    size: {
      sm: "pb-3",
      md: "pb-4"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
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
const Accordion = (0, import_react.forwardRef)(function Accordion2({ variant = "bordered", size = "md", className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContext.Provider, { value: { variant, size }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Accordion.Root,
    {
      ref,
      className: (0, import_cn.cn)(
        "not-prose",
        accordionRootVariants({ variant }),
        className
      ),
      "data-ds": "",
      "data-ds-component": "accordion",
      "data-ds-variant": variant,
      "data-ds-size": size,
      ...rest,
      children
    }
  ) });
});
Accordion.displayName = "Accordion";
const AccordionItem = (0, import_react.forwardRef)(function AccordionItem2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Accordion.Item,
    {
      ref,
      className: (0, import_cn.cn)("", className),
      "data-ds": "",
      "data-ds-component": "accordion-item",
      ...rest,
      children
    }
  );
});
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = (0, import_react.forwardRef)(function AccordionTrigger2({ className, hideChevron = false, children, ...rest }, ref) {
  const { size } = useAccordionContext();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Accordion.Header, { className: "flex", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.Accordion.Trigger,
    {
      ref,
      className: (0, import_cn.cn)(accordionTriggerVariants({ size }), className),
      "data-ds": "",
      "data-ds-component": "accordion-trigger",
      ...rest,
      children: [
        children,
        !hideChevron && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDownIcon, { className: "size-4 shrink-0 text-muted-foreground" })
      ]
    }
  ) });
});
AccordionTrigger.displayName = "AccordionTrigger";
const AccordionContent = (0, import_react.forwardRef)(function AccordionContent2({ className, children, ...rest }, ref) {
  const { size } = useAccordionContext();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Accordion.Content,
    {
      ref,
      className: (0, import_cn.cn)(accordionContentVariants({ size }), className),
      "data-ds": "",
      "data-ds-component": "accordion-content",
      ...rest,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: (0, import_cn.cn)(accordionContentInnerVariants({ size })), children })
    }
  );
});
AccordionContent.displayName = "AccordionContent";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  accordionContentVariants,
  accordionRootVariants,
  accordionTriggerVariants
});
