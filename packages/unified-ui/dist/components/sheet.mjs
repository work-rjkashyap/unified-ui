"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import {
  overlayBackdrop,
  slidePanelBottom,
  slidePanelLeft,
  slidePanelRight,
  slidePanelTop
} from "../motion/index";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Dialog as DialogPrimitive } from "radix-ui";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState
} from "react";
const sheetContentVariants = cva(
  [
    // Layout
    "fixed flex flex-col",
    // Z-index — same as dialog/modal
    "z-[var(--z-modal)]",
    // Visual
    "bg-background",
    "border-border",
    "shadow-xl",
    // Focus
    "outline-none"
    // Note: Animation is handled by Framer Motion (overlayBackdrop + slidePanel presets).
    // CSS animation classes removed in favour of FM spring physics.
  ],
  {
    variants: {
      side: {
        /**
         * Left — slides in from the left edge.
         */
        left: ["inset-y-0 left-0", "border-r"],
        /**
         * Right — slides in from the right edge (most common).
         */
        right: ["inset-y-0 right-0", "border-l"],
        /**
         * Top — slides in from the top edge.
         */
        top: ["inset-x-0 top-0", "border-b"],
        /**
         * Bottom — slides in from the bottom edge.
         */
        bottom: ["inset-x-0 bottom-0", "border-t"]
      },
      size: {
        /**
         * Small — compact panel (320px).
         * Good for navigation menus, simple forms.
         */
        sm: "",
        /**
         * Medium — default size (420px).
         * Good for settings panels, detail views.
         */
        md: "",
        /**
         * Large — wide panel (560px).
         * Good for complex forms, preview panels.
         */
        lg: ""
      }
    },
    compoundVariants: [
      // Horizontal sheets (left/right) — width-based sizing
      {
        side: "left",
        size: "sm",
        className: "w-[320px] max-w-[calc(100vw-2rem)]"
      },
      {
        side: "left",
        size: "md",
        className: "w-[420px] max-w-[calc(100vw-2rem)]"
      },
      {
        side: "left",
        size: "lg",
        className: "w-[560px] max-w-[calc(100vw-2rem)]"
      },
      {
        side: "right",
        size: "sm",
        className: "w-[320px] max-w-[calc(100vw-2rem)]"
      },
      {
        side: "right",
        size: "md",
        className: "w-[420px] max-w-[calc(100vw-2rem)]"
      },
      {
        side: "right",
        size: "lg",
        className: "w-[560px] max-w-[calc(100vw-2rem)]"
      },
      // Vertical sheets (top/bottom) — height-based sizing
      {
        side: "top",
        size: "sm",
        className: "h-[320px] max-h-[calc(100vh-2rem)]"
      },
      {
        side: "top",
        size: "md",
        className: "h-[420px] max-h-[calc(100vh-2rem)]"
      },
      {
        side: "top",
        size: "lg",
        className: "h-[560px] max-h-[calc(100vh-2rem)]"
      },
      {
        side: "bottom",
        size: "sm",
        className: "h-[320px] max-h-[calc(100vh-2rem)]"
      },
      {
        side: "bottom",
        size: "md",
        className: "h-[420px] max-h-[calc(100vh-2rem)]"
      },
      {
        side: "bottom",
        size: "lg",
        className: "h-[560px] max-h-[calc(100vh-2rem)]"
      }
    ],
    defaultVariants: {
      side: "right",
      size: "md"
    }
  }
);
const SheetContext = createContext({ open: false });
function useSheetContext() {
  return useContext(SheetContext);
}
function CloseIcon({ className }) {
  return /* @__PURE__ */ jsxs(
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
      children: [
        /* @__PURE__ */ jsx("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ jsx("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
function Sheet({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  ...rest
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const handleOpenChange = useCallback(
    (next) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );
  return /* @__PURE__ */ jsx(SheetContext.Provider, { value: { open }, children: /* @__PURE__ */ jsx(
    DialogPrimitive.Root,
    {
      open,
      onOpenChange: handleOpenChange,
      ...rest,
      children
    }
  ) });
}
Sheet.displayName = "Sheet";
const SheetTrigger = forwardRef(function SheetTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Trigger,
    {
      ref,
      className,
      "data-ds": "",
      "data-ds-component": "sheet-trigger",
      ...rest
    }
  );
});
SheetTrigger.displayName = "SheetTrigger";
const SheetOverlay = forwardRef(function SheetOverlay2({ className, ...rest }, ref) {
  const shouldReduce = useReducedMotion();
  return /* @__PURE__ */ jsx(DialogPrimitive.Overlay, { ref, forceMount: true, asChild: true, ...rest, children: /* @__PURE__ */ jsx(
    motion.div,
    {
      className: cn(
        "fixed inset-0",
        "z-[var(--z-overlay)]",
        "bg-black/50",
        className
      ),
      variants: shouldReduce ? void 0 : overlayBackdrop.variants,
      initial: shouldReduce ? { opacity: 0 } : "initial",
      animate: shouldReduce ? { opacity: 1 } : "animate",
      exit: shouldReduce ? { opacity: 0 } : "exit",
      transition: shouldReduce ? { duration: 0.15 } : overlayBackdrop.transition,
      "data-ds-animated": ""
    }
  ) });
});
SheetOverlay.displayName = "SheetOverlay";
const sidePresetMap = {
  left: slidePanelLeft,
  right: slidePanelRight,
  top: slidePanelTop,
  bottom: slidePanelBottom
};
const SheetContent = forwardRef(function SheetContent2({
  side = "right",
  size = "md",
  showClose = true,
  overlayClassName,
  className,
  children,
  ...rest
}, ref) {
  const shouldReduce = useReducedMotion();
  const { open } = useSheetContext();
  const preset = sidePresetMap[side];
  return /* @__PURE__ */ jsx(DialogPrimitive.Portal, { forceMount: true, children: /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SheetOverlay, { className: overlayClassName }),
    /* @__PURE__ */ jsx(DialogPrimitive.Content, { ref, forceMount: true, asChild: true, ...rest, children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: cn(
          "not-prose",
          sheetContentVariants({ side, size }),
          className
        ),
        variants: shouldReduce ? void 0 : preset.variants,
        initial: shouldReduce ? { opacity: 0 } : "initial",
        animate: shouldReduce ? { opacity: 1 } : "animate",
        exit: shouldReduce ? { opacity: 0 } : "exit",
        transition: shouldReduce ? { duration: 0.2 } : preset.transition,
        "data-ds": "",
        "data-ds-component": "sheet",
        "data-ds-side": side,
        "data-ds-size": size,
        "data-ds-animated": "",
        children: [
          children,
          showClose && /* @__PURE__ */ jsx(
            DialogPrimitive.Close,
            {
              className: cn(
                "absolute right-4 top-4",
                "inline-flex items-center justify-center",
                "rounded-sm p-1",
                "text-muted-foreground hover:text-foreground",
                "transition-colors duration-fast",
                focusRingClasses
              ),
              "aria-label": "Close",
              children: /* @__PURE__ */ jsx(CloseIcon, { className: "size-4" })
            }
          )
        ]
      }
    ) })
  ] }) }) });
});
SheetContent.displayName = "SheetContent";
function SheetHeader({ className, children }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "flex flex-col gap-1.5 px-6 py-4",
        "border-b border-border",
        className
      ),
      "data-ds": "",
      "data-ds-component": "sheet-header",
      children
    }
  );
}
SheetHeader.displayName = "SheetHeader";
function SheetFooter({ className, children }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "flex items-center justify-end gap-2 px-6 py-4",
        "border-t border-border",
        "mt-auto",
        className
      ),
      "data-ds": "",
      "data-ds-component": "sheet-footer",
      children
    }
  );
}
SheetFooter.displayName = "SheetFooter";
const SheetTitle = forwardRef(function SheetTitle2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    {
      ref,
      className: cn(
        "text-lg font-semibold leading-6 text-foreground",
        className
      ),
      "data-ds": "",
      "data-ds-component": "sheet-title",
      ...rest,
      children
    }
  );
});
SheetTitle.displayName = "SheetTitle";
const SheetDescription = forwardRef(function SheetDescription2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Description,
    {
      ref,
      className: cn("text-sm leading-5 text-muted-foreground", className),
      "data-ds": "",
      "data-ds-component": "sheet-description",
      ...rest,
      children
    }
  );
});
SheetDescription.displayName = "SheetDescription";
const SheetClose = forwardRef(function SheetClose2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Close,
    {
      ref,
      className,
      "data-ds": "",
      "data-ds-component": "sheet-close",
      ...rest
    }
  );
});
SheetClose.displayName = "SheetClose";
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  sheetContentVariants
};
