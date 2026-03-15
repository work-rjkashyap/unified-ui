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
var alert_dialog_exports = {};
__export(alert_dialog_exports, {
  AlertDialog: () => AlertDialog,
  AlertDialogAction: () => AlertDialogAction,
  AlertDialogCancel: () => AlertDialogCancel,
  AlertDialogContent: () => AlertDialogContent,
  AlertDialogDescription: () => AlertDialogDescription,
  AlertDialogFooter: () => AlertDialogFooter,
  AlertDialogHeader: () => AlertDialogHeader,
  AlertDialogOverlay: () => AlertDialogOverlay,
  AlertDialogPortal: () => AlertDialogPortal,
  AlertDialogTitle: () => AlertDialogTitle,
  AlertDialogTrigger: () => AlertDialogTrigger
});
module.exports = __toCommonJS(alert_dialog_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_motion = require("../motion/index");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_framer_motion = require("framer-motion");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
const AlertDialogContext = (0, import_react.createContext)({
  open: false
});
function useAlertDialogContext() {
  return (0, import_react.useContext)(AlertDialogContext);
}
function AlertDialog({
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogContext.Provider, { value: { open }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.AlertDialog.Root,
    {
      open,
      onOpenChange: handleOpenChange,
      ...rest,
      children
    }
  ) });
}
AlertDialog.displayName = "AlertDialog";
const AlertDialogTrigger = import_radix_ui.AlertDialog.Trigger;
AlertDialogTrigger.displayName = "AlertDialogTrigger";
const AlertDialogPortal = import_radix_ui.AlertDialog.Portal;
AlertDialogPortal.displayName = "AlertDialogPortal";
const AlertDialogOverlay = (0, import_react.forwardRef)(function AlertDialogOverlay2({ className, ...rest }, ref) {
  const shouldReduce = (0, import_framer_motion.useReducedMotion)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.AlertDialog.Overlay, { ref, forceMount: true, asChild: true, ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_framer_motion.motion.div,
    {
      className: (0, import_cn.cn)(
        "fixed inset-0 z-overlay bg-black/50 backdrop-blur-sm",
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
AlertDialogOverlay.displayName = "AlertDialogOverlay";
const AlertDialogContent = (0, import_react.forwardRef)(function AlertDialogContent2({ className, children, ...rest }, ref) {
  const shouldReduce = (0, import_framer_motion.useReducedMotion)();
  const { open } = useAlertDialogContext();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.AlertDialog.Portal, { forceMount: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_radix_ui.AlertDialog.Content,
      {
        ref,
        forceMount: true,
        asChild: true,
        ...rest,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_framer_motion.motion.div,
          {
            className: (0, import_cn.cn)(
              "fixed left-[50%] top-[50%] z-modal",
              "-translate-x-[50%] -translate-y-[50%]",
              "w-full max-w-md rounded-lg border border-border bg-background shadow-xl",
              "p-6",
              "outline-none",
              import_focus_ring.focusRingClasses,
              className
            ),
            variants: shouldReduce ? void 0 : import_motion.modalContent.variants,
            initial: shouldReduce ? { opacity: 0 } : "initial",
            animate: shouldReduce ? { opacity: 1 } : "animate",
            exit: shouldReduce ? { opacity: 0 } : "exit",
            transition: shouldReduce ? { duration: 0.2 } : import_motion.modalContent.transition,
            "data-ds": "",
            "data-ds-component": "alert-dialog-content",
            "data-ds-animated": "",
            children
          }
        )
      }
    )
  ] }) }) });
});
AlertDialogContent.displayName = "AlertDialogContent";
function AlertDialogHeader({
  className,
  children,
  ...rest
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: (0, import_cn.cn)("flex flex-col gap-2 mb-4", className), ...rest, children });
}
AlertDialogHeader.displayName = "AlertDialogHeader";
function AlertDialogFooter({
  className,
  children,
  ...rest
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: (0, import_cn.cn)(
        "flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-6",
        className
      ),
      ...rest,
      children
    }
  );
}
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = (0, import_react.forwardRef)(function AlertDialogTitle2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.AlertDialog.Title,
    {
      ref,
      className: (0, import_cn.cn)(
        "text-lg font-semibold text-foreground leading-5",
        className
      ),
      ...rest,
      children
    }
  );
});
AlertDialogTitle.displayName = "AlertDialogTitle";
const AlertDialogDescription = (0, import_react.forwardRef)(function AlertDialogDescription2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.AlertDialog.Description,
    {
      ref,
      className: (0, import_cn.cn)("text-sm text-muted-foreground leading-5", className),
      ...rest,
      children
    }
  );
});
AlertDialogDescription.displayName = "AlertDialogDescription";
const AlertDialogAction = (0, import_react.forwardRef)(function AlertDialogAction2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.AlertDialog.Action,
    {
      ref,
      className: (0, import_cn.cn)(
        "inline-flex items-center justify-center gap-2",
        "h-9 px-4 text-sm font-medium rounded-md",
        "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
        "transition-colors duration-fast",
        "disabled:pointer-events-none disabled:opacity-50",
        import_focus_ring.focusRingClasses,
        className
      ),
      ...rest,
      children
    }
  );
});
AlertDialogAction.displayName = "AlertDialogAction";
const AlertDialogCancel = (0, import_react.forwardRef)(function AlertDialogCancel2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.AlertDialog.Cancel,
    {
      ref,
      className: (0, import_cn.cn)(
        "inline-flex items-center justify-center gap-2",
        "h-9 px-4 text-sm font-medium rounded-md",
        "bg-secondary text-secondary-foreground border border-border",
        "hover:bg-secondary-hover active:bg-secondary-active",
        "transition-colors duration-fast",
        "disabled:pointer-events-none disabled:opacity-50",
        import_focus_ring.focusRingClasses,
        className
      ),
      ...rest,
      children
    }
  );
});
AlertDialogCancel.displayName = "AlertDialogCancel";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger
});
