"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { modalContent, overlayBackdrop } from "../motion/index";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertDialog as AlertDialogPrimitive } from "radix-ui";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState
} from "react";
const AlertDialogContext = createContext({
  open: false
});
function useAlertDialogContext() {
  return useContext(AlertDialogContext);
}
function AlertDialog({
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
  return /* @__PURE__ */ jsx(AlertDialogContext.Provider, { value: { open }, children: /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Root,
    {
      open,
      onOpenChange: handleOpenChange,
      ...rest,
      children
    }
  ) });
}
AlertDialog.displayName = "AlertDialog";
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
AlertDialogTrigger.displayName = "AlertDialogTrigger";
const AlertDialogPortal = AlertDialogPrimitive.Portal;
AlertDialogPortal.displayName = "AlertDialogPortal";
const AlertDialogOverlay = forwardRef(function AlertDialogOverlay2({ className, ...rest }, ref) {
  const shouldReduce = useReducedMotion();
  return /* @__PURE__ */ jsx(AlertDialogPrimitive.Overlay, { ref, forceMount: true, asChild: true, ...rest, children: /* @__PURE__ */ jsx(
    motion.div,
    {
      className: cn(
        "fixed inset-0 z-overlay bg-black/50 backdrop-blur-sm",
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
AlertDialogOverlay.displayName = "AlertDialogOverlay";
const AlertDialogContent = forwardRef(function AlertDialogContent2({ className, children, ...rest }, ref) {
  const shouldReduce = useReducedMotion();
  const { open } = useAlertDialogContext();
  return /* @__PURE__ */ jsx(AlertDialogPrimitive.Portal, { forceMount: true, children: /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsx(
      AlertDialogPrimitive.Content,
      {
        ref,
        forceMount: true,
        asChild: true,
        ...rest,
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            className: cn(
              "fixed left-[50%] top-[50%] z-modal",
              "-translate-x-[50%] -translate-y-[50%]",
              "w-full max-w-md rounded-lg border border-border bg-background shadow-xl",
              "p-6",
              "outline-none",
              focusRingClasses,
              className
            ),
            variants: shouldReduce ? void 0 : modalContent.variants,
            initial: shouldReduce ? { opacity: 0 } : "initial",
            animate: shouldReduce ? { opacity: 1 } : "animate",
            exit: shouldReduce ? { opacity: 0 } : "exit",
            transition: shouldReduce ? { duration: 0.2 } : modalContent.transition,
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
  return /* @__PURE__ */ jsx("div", { className: cn("flex flex-col gap-2 mb-4", className), ...rest, children });
}
AlertDialogHeader.displayName = "AlertDialogHeader";
function AlertDialogFooter({
  className,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-6",
        className
      ),
      ...rest,
      children
    }
  );
}
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = forwardRef(function AlertDialogTitle2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Title,
    {
      ref,
      className: cn(
        "text-lg font-semibold text-foreground leading-5",
        className
      ),
      ...rest,
      children
    }
  );
});
AlertDialogTitle.displayName = "AlertDialogTitle";
const AlertDialogDescription = forwardRef(function AlertDialogDescription2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Description,
    {
      ref,
      className: cn("text-sm text-muted-foreground leading-5", className),
      ...rest,
      children
    }
  );
});
AlertDialogDescription.displayName = "AlertDialogDescription";
const AlertDialogAction = forwardRef(function AlertDialogAction2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Action,
    {
      ref,
      className: cn(
        "inline-flex items-center justify-center gap-2",
        "h-9 px-4 text-sm font-medium rounded-md",
        "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
        "transition-colors duration-fast",
        "disabled:pointer-events-none disabled:opacity-50",
        focusRingClasses,
        className
      ),
      ...rest,
      children
    }
  );
});
AlertDialogAction.displayName = "AlertDialogAction";
const AlertDialogCancel = forwardRef(function AlertDialogCancel2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Cancel,
    {
      ref,
      className: cn(
        "inline-flex items-center justify-center gap-2",
        "h-9 px-4 text-sm font-medium rounded-md",
        "bg-secondary text-secondary-foreground border border-border",
        "hover:bg-secondary-hover active:bg-secondary-active",
        "transition-colors duration-fast",
        "disabled:pointer-events-none disabled:opacity-50",
        focusRingClasses,
        className
      ),
      ...rest,
      children
    }
  );
});
AlertDialogCancel.displayName = "AlertDialogCancel";
export {
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
};
