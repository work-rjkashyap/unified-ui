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
var dialog_exports = {};
__export(dialog_exports, {
  Dialog: () => Dialog,
  DialogBody: () => DialogBody,
  DialogClose: () => DialogClose,
  DialogContent: () => DialogContent,
  DialogDescription: () => DialogDescription,
  DialogFooter: () => DialogFooter,
  DialogHeader: () => DialogHeader,
  DialogTitle: () => DialogTitle,
  DialogTrigger: () => DialogTrigger,
  dialogContentVariants: () => dialogContentVariants
});
module.exports = __toCommonJS(dialog_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_motion = require("../motion/index");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_framer_motion = require("framer-motion");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
const dialogContentVariants = (0, import_class_variance_authority.cva)(
  [
    // Positioning
    "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    // Z-index
    "z-[var(--z-modal)]",
    // Layout
    "flex flex-col",
    "w-full",
    // Visual
    "rounded-lg",
    "border border-border",
    "bg-background",
    "shadow-xl",
    // Overflow
    "max-h-[85vh]",
    // Focus
    "outline-none"
  ],
  {
    variants: {
      size: {
        sm: "max-w-[480px]",
        md: "max-w-[560px]",
        lg: "max-w-[720px]",
        full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const DialogContext = (0, import_react.createContext)({ open: false });
function useDialogContext() {
  return (0, import_react.useContext)(DialogContext);
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
function Dialog({
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContext.Provider, { value: { open }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Dialog.Root,
    {
      open,
      onOpenChange: handleOpenChange,
      ...rest,
      children
    }
  ) });
}
Dialog.displayName = "Dialog";
const DialogTrigger = (0, import_react.forwardRef)(function DialogTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Dialog.Trigger,
    {
      ref,
      className,
      "data-ds": "",
      "data-ds-component": "dialog-trigger",
      ...rest
    }
  );
});
DialogTrigger.displayName = "DialogTrigger";
const DialogOverlay = (0, import_react.forwardRef)(function DialogOverlay2({ className, ...rest }, ref) {
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
DialogOverlay.displayName = "DialogOverlay";
const DialogContent = (0, import_react.forwardRef)(function DialogContent2({
  size = "md",
  showClose = true,
  overlayClassName,
  className,
  children,
  ...rest
}, ref) {
  const shouldReduce = (0, import_framer_motion.useReducedMotion)();
  const { open } = useDialogContext();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Dialog.Portal, { forceMount: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: overlayClassName }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Dialog.Content, { ref, forceMount: true, asChild: true, ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      import_framer_motion.motion.div,
      {
        className: (0, import_cn.cn)(
          "not-prose",
          dialogContentVariants({ size }),
          className
        ),
        variants: shouldReduce ? void 0 : import_motion.modalContent.variants,
        initial: shouldReduce ? { opacity: 0 } : "initial",
        animate: shouldReduce ? { opacity: 1 } : "animate",
        exit: shouldReduce ? { opacity: 0 } : "exit",
        transition: shouldReduce ? { duration: 0.2 } : import_motion.modalContent.transition,
        "data-ds": "",
        "data-ds-component": "dialog",
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
DialogContent.displayName = "DialogContent";
function DialogHeader({
  className,
  children,
  ...rest
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: (0, import_cn.cn)("flex flex-col gap-1.5 px-6 pt-6", className),
      "data-ds": "",
      "data-ds-component": "dialog-header",
      ...rest,
      children
    }
  );
}
DialogHeader.displayName = "DialogHeader";
function DialogBody({ className, children, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: (0, import_cn.cn)("flex-1 overflow-y-auto px-6 py-4", className),
      "data-ds": "",
      "data-ds-component": "dialog-body",
      ...rest,
      children
    }
  );
}
DialogBody.displayName = "DialogBody";
function DialogFooter({
  className,
  children,
  ...rest
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: (0, import_cn.cn)(
        "flex items-center justify-end gap-2 px-6 pb-6 pt-2",
        className
      ),
      "data-ds": "",
      "data-ds-component": "dialog-footer",
      ...rest,
      children
    }
  );
}
DialogFooter.displayName = "DialogFooter";
const DialogTitle = (0, import_react.forwardRef)(function DialogTitle2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Dialog.Title,
    {
      ref,
      className: (0, import_cn.cn)(
        "text-lg font-semibold leading-6 text-foreground",
        className
      ),
      "data-ds": "",
      "data-ds-component": "dialog-title",
      ...rest,
      children
    }
  );
});
DialogTitle.displayName = "DialogTitle";
const DialogDescription = (0, import_react.forwardRef)(function DialogDescription2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Dialog.Description,
    {
      ref,
      className: (0, import_cn.cn)("text-sm leading-5 text-muted-foreground", className),
      "data-ds": "",
      "data-ds-component": "dialog-description",
      ...rest,
      children
    }
  );
});
DialogDescription.displayName = "DialogDescription";
const DialogClose = (0, import_react.forwardRef)(function DialogClose2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Dialog.Close,
    {
      ref,
      className,
      "data-ds": "",
      "data-ds-component": "dialog-close",
      ...rest
    }
  );
});
DialogClose.displayName = "DialogClose";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  dialogContentVariants
});
