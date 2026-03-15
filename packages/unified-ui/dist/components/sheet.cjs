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
var sheet_exports = {};
__export(sheet_exports, {
  Sheet: () => Sheet,
  SheetClose: () => SheetClose,
  SheetContent: () => SheetContent,
  SheetDescription: () => SheetDescription,
  SheetFooter: () => SheetFooter,
  SheetHeader: () => SheetHeader,
  SheetTitle: () => SheetTitle,
  SheetTrigger: () => SheetTrigger,
  sheetContentVariants: () => sheetContentVariants
});
module.exports = __toCommonJS(sheet_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_motion = require("../motion/index");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_framer_motion = require("framer-motion");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
const sheetContentVariants = (0, import_class_variance_authority.cva)(
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
const SheetContext = (0, import_react.createContext)({ open: false });
function useSheetContext() {
  return (0, import_react.useContext)(SheetContext);
}
function CloseIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m6 6 12 12" })
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
  const [uncontrolledOpen, setUncontrolledOpen] = (0, import_react.useState)(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const handleOpenChange = (0, import_react.useCallback)(
    (next) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContext.Provider, { value: { open }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Dialog.Root,
    {
      open,
      onOpenChange: handleOpenChange,
      ...rest,
      children
    }
  ) });
}
Sheet.displayName = "Sheet";
const SheetTrigger = (0, import_react.forwardRef)(function SheetTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Dialog.Trigger,
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
const SheetOverlay = (0, import_react.forwardRef)(function SheetOverlay2({ className, ...rest }, ref) {
  const shouldReduce = (0, import_framer_motion.useReducedMotion)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Dialog.Overlay, { ref, forceMount: true, asChild: true, ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_framer_motion.motion.div,
    {
      className: (0, import_cn.cn)(
        "fixed inset-0",
        "z-[var(--z-overlay)]",
        "bg-black/50",
        className
      ),
      variants: shouldReduce ? void 0 : import_motion.overlayBackdrop.variants,
      initial: shouldReduce ? { opacity: 0 } : "initial",
      animate: shouldReduce ? { opacity: 1 } : "animate",
      exit: shouldReduce ? { opacity: 0 } : "exit",
      transition: shouldReduce ? { duration: 0.15 } : import_motion.overlayBackdrop.transition,
      "data-ds-animated": ""
    }
  ) });
});
SheetOverlay.displayName = "SheetOverlay";
const sidePresetMap = {
  left: import_motion.slidePanelLeft,
  right: import_motion.slidePanelRight,
  top: import_motion.slidePanelTop,
  bottom: import_motion.slidePanelBottom
};
const SheetContent = (0, import_react.forwardRef)(function SheetContent2({
  side = "right",
  size = "md",
  showClose = true,
  overlayClassName,
  className,
  children,
  ...rest
}, ref) {
  const shouldReduce = (0, import_framer_motion.useReducedMotion)();
  const { open } = useSheetContext();
  const preset = sidePresetMap[side];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Dialog.Portal, { forceMount: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, { className: overlayClassName }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Dialog.Content, { ref, forceMount: true, asChild: true, ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      import_framer_motion.motion.div,
      {
        className: (0, import_cn.cn)(
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
          showClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_radix_ui.Dialog.Close,
            {
              className: (0, import_cn.cn)(
                "absolute right-4 top-4",
                "inline-flex items-center justify-center",
                "rounded-sm p-1",
                "text-muted-foreground hover:text-foreground",
                "transition-colors duration-fast",
                import_focus_ring.focusRingClasses
              ),
              "aria-label": "Close",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, { className: "size-4" })
            }
          )
        ]
      }
    ) })
  ] }) }) });
});
SheetContent.displayName = "SheetContent";
function SheetHeader({ className, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: (0, import_cn.cn)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: (0, import_cn.cn)(
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
const SheetTitle = (0, import_react.forwardRef)(function SheetTitle2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Dialog.Title,
    {
      ref,
      className: (0, import_cn.cn)(
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
const SheetDescription = (0, import_react.forwardRef)(function SheetDescription2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Dialog.Description,
    {
      ref,
      className: (0, import_cn.cn)("text-sm leading-5 text-muted-foreground", className),
      "data-ds": "",
      "data-ds-component": "sheet-description",
      ...rest,
      children
    }
  );
});
SheetDescription.displayName = "SheetDescription";
const SheetClose = (0, import_react.forwardRef)(function SheetClose2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Dialog.Close,
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  sheetContentVariants
});
