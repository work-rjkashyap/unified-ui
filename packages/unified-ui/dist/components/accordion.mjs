"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import { Accordion as AccordionPrimitive } from "radix-ui";
import {
  createContext,
  forwardRef,
  useContext
} from "react";
const AccordionContext = createContext({
  variant: "bordered",
  size: "md"
});
function useAccordionContext() {
  return useContext(AccordionContext);
}
const accordionRootVariants = cva(["flex flex-col"], {
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
const accordionTriggerVariants = cva(
  [
    // Layout
    "flex flex-1 items-center justify-between w-full",
    // Typography
    "font-medium text-foreground",
    // Transition
    "transition-[color,background-color,opacity]",
    "duration-fast ease-standard",
    // Focus ring
    focusRingClasses,
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
const accordionContentVariants = cva(
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
const accordionContentInnerVariants = cva(["text-muted-foreground"], {
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
const Accordion = forwardRef(function Accordion2({ variant = "bordered", size = "md", className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(AccordionContext.Provider, { value: { variant, size }, children: /* @__PURE__ */ jsx(
    AccordionPrimitive.Root,
    {
      ref,
      className: cn(
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
const AccordionItem = forwardRef(function AccordionItem2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    AccordionPrimitive.Item,
    {
      ref,
      className: cn("", className),
      "data-ds": "",
      "data-ds-component": "accordion-item",
      ...rest,
      children
    }
  );
});
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = forwardRef(function AccordionTrigger2({ className, hideChevron = false, children, ...rest }, ref) {
  const { size } = useAccordionContext();
  return /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
    AccordionPrimitive.Trigger,
    {
      ref,
      className: cn(accordionTriggerVariants({ size }), className),
      "data-ds": "",
      "data-ds-component": "accordion-trigger",
      ...rest,
      children: [
        children,
        !hideChevron && /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4 shrink-0 text-muted-foreground" })
      ]
    }
  ) });
});
AccordionTrigger.displayName = "AccordionTrigger";
const AccordionContent = forwardRef(function AccordionContent2({ className, children, ...rest }, ref) {
  const { size } = useAccordionContext();
  return /* @__PURE__ */ jsx(
    AccordionPrimitive.Content,
    {
      ref,
      className: cn(accordionContentVariants({ size }), className),
      "data-ds": "",
      "data-ds-component": "accordion-content",
      ...rest,
      children: /* @__PURE__ */ jsx("div", { className: cn(accordionContentInnerVariants({ size })), children })
    }
  );
});
AccordionContent.displayName = "AccordionContent";
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  accordionContentVariants,
  accordionRootVariants,
  accordionTriggerVariants
};
