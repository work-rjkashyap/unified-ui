"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { modalContent, overlayBackdrop } from "../motion/index";
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
const dialogContentVariants = cva(
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
const DialogContext = createContext({ open: false });
function useDialogContext() {
  return useContext(DialogContext);
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
function Dialog({
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
  return /* @__PURE__ */ jsx(DialogContext.Provider, { value: { open }, children: /* @__PURE__ */ jsx(
    DialogPrimitive.Root,
    {
      open,
      onOpenChange: handleOpenChange,
      ...rest,
      children
    }
  ) });
}
Dialog.displayName = "Dialog";
const DialogTrigger = forwardRef(function DialogTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Trigger,
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
const DialogOverlay = forwardRef(function DialogOverlay2({ className, ...rest }, ref) {
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
DialogOverlay.displayName = "DialogOverlay";
const DialogContent = forwardRef(function DialogContent2({
  size = "md",
  showClose = true,
  overlayClassName,
  className,
  children,
  ...rest
}, ref) {
  const shouldReduce = useReducedMotion();
  const { open } = useDialogContext();
  return /* @__PURE__ */ jsx(DialogPrimitive.Portal, { forceMount: true, children: /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(DialogOverlay, { className: overlayClassName }),
    /* @__PURE__ */ jsx(DialogPrimitive.Content, { ref, forceMount: true, asChild: true, ...rest, children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: cn(
          "not-prose",
          dialogContentVariants({ size }),
          className
        ),
        variants: shouldReduce ? void 0 : modalContent.variants,
        initial: shouldReduce ? { opacity: 0 } : "initial",
        animate: shouldReduce ? { opacity: 1 } : "animate",
        exit: shouldReduce ? { opacity: 0 } : "exit",
        transition: shouldReduce ? { duration: 0.2 } : modalContent.transition,
        "data-ds": "",
        "data-ds-component": "dialog",
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
DialogContent.displayName = "DialogContent";
function DialogHeader({
  className,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("flex flex-col gap-1.5 px-6 pt-6", className),
      "data-ds": "",
      "data-ds-component": "dialog-header",
      ...rest,
      children
    }
  );
}
DialogHeader.displayName = "DialogHeader";
function DialogBody({ className, children, ...rest }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("flex-1 overflow-y-auto px-6 py-4", className),
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
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
const DialogTitle = forwardRef(function DialogTitle2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    {
      ref,
      className: cn(
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
const DialogDescription = forwardRef(function DialogDescription2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Description,
    {
      ref,
      className: cn("text-sm leading-5 text-muted-foreground", className),
      "data-ds": "",
      "data-ds-component": "dialog-description",
      ...rest,
      children
    }
  );
});
DialogDescription.displayName = "DialogDescription";
const DialogClose = forwardRef(function DialogClose2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Close,
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
export {
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
};
