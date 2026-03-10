"use client";

// ============================================================================
// Unified UI — Dialog Component
// ============================================================================
// A production-ready dialog/modal component built on Radix UI's Dialog
// primitive with Framer Motion animations. Uses CVA for variant composition
// and tailwind-merge (via cn) for safe class merging.
//
// Features:
//   - Built on @radix-ui/react-dialog for full accessibility
//   - 4 sizes: sm (480px), md (560px), lg (720px), full
//   - Slot components: DialogHeader, DialogBody, DialogFooter
//   - Framer Motion overlay backdrop (overlayBackdrop) + content spring (modalContent)
//   - Focus trap, Escape to close, Scroll lock (Radix handles this)
//   - Optional close button
//   - Respects prefers-reduced-motion
//   - WCAG AA accessible: focus management, aria-labelledby, aria-describedby
// ============================================================================

import { cva } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Dialog as DialogPrimitive } from "radix-ui";
import {
  type ComponentPropsWithoutRef,
  createContext,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { cn } from "@/lib/cn";
import { focusRingClasses } from "@/lib/focus-ring";
import { modalContent, overlayBackdrop } from "@/lib/motion";

// ---------------------------------------------------------------------------
// CVA Variant Definitions
// ---------------------------------------------------------------------------

/**
 * CVA variants for DialogContent sizing.
 * Animation is handled by Framer Motion (overlayBackdrop + modalContent presets),
 * so no CSS animation classes are included here.
 */
export const dialogContentVariants = cva(
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
    "outline-none",
  ],
  {
    variants: {
      size: {
        sm: "max-w-[480px]",
        md: "max-w-[560px]",
        lg: "max-w-[720px]",
        full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type DialogSize = "sm" | "md" | "lg" | "full";

// ---------------------------------------------------------------------------
// Internal context — shares open state for AnimatePresence exit animations
// ---------------------------------------------------------------------------

interface DialogContextValue {
  open: boolean;
}

const DialogContext = createContext<DialogContextValue>({ open: false });

function useDialogContext() {
  return useContext(DialogContext);
}

export interface DialogProps extends DialogPrimitive.DialogProps {
  children: ReactNode;
}

export interface DialogTriggerProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger> {
  className?: string;
}

export interface DialogContentProps
  extends Omit<
    ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    "asChild"
  > {
  size?: DialogSize;
  showClose?: boolean;
  overlayClassName?: string;
  className?: string;
  children: ReactNode;
}

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export interface DialogBodyProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export interface DialogTitleProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
  className?: string;
  children: ReactNode;
}

export interface DialogDescriptionProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {
  className?: string;
  children: ReactNode;
}

export interface DialogCloseProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Close> {
  className?: string;
}

// ---------------------------------------------------------------------------
// Close Icon (Internal)
// ---------------------------------------------------------------------------

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Dialog Root
// ---------------------------------------------------------------------------

export function Dialog({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  ...rest
}: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  return (
    <DialogContext.Provider value={{ open }}>
      <DialogPrimitive.Root
        open={open}
        onOpenChange={handleOpenChange}
        {...rest}
      >
        {children}
      </DialogPrimitive.Root>
    </DialogContext.Provider>
  );
}
Dialog.displayName = "Dialog";

// ---------------------------------------------------------------------------
// DialogTrigger
// ---------------------------------------------------------------------------

export const DialogTrigger = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Trigger>,
  DialogTriggerProps
>(function DialogTrigger({ className, ...rest }, ref) {
  return (
    <DialogPrimitive.Trigger
      ref={ref}
      className={className}
      data-ds=""
      data-ds-component="dialog-trigger"
      {...rest}
    />
  );
});
DialogTrigger.displayName = "DialogTrigger";

// ---------------------------------------------------------------------------
// Dialog Overlay (Internal — Framer Motion animated)
// ---------------------------------------------------------------------------

const DialogOverlay = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function DialogOverlay({ className, ...rest }, ref) {
  const shouldReduce = useReducedMotion();
  return (
    <DialogPrimitive.Overlay ref={ref} forceMount asChild {...rest}>
      <motion.div
        className={cn(
          "fixed inset-0",
          "z-[var(--z-overlay)]",
          "bg-black/50",
          className,
        )}
        variants={shouldReduce ? undefined : overlayBackdrop.variants}
        initial={shouldReduce ? { opacity: 0 } : "initial"}
        animate={shouldReduce ? { opacity: 1 } : "animate"}
        exit={shouldReduce ? { opacity: 0 } : "exit"}
        transition={
          shouldReduce ? { duration: 0.15 } : overlayBackdrop.transition
        }
        data-ds-animated=""
      />
    </DialogPrimitive.Overlay>
  );
});
DialogOverlay.displayName = "DialogOverlay";

// ---------------------------------------------------------------------------
// DialogContent (Framer Motion animated)
// ---------------------------------------------------------------------------

export const DialogContent = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(function DialogContent(
  {
    size = "md",
    showClose = true,
    overlayClassName,
    className,
    children,
    ...rest
  },
  ref,
) {
  const shouldReduce = useReducedMotion();
  const { open } = useDialogContext();

  return (
    <DialogPrimitive.Portal forceMount>
      <AnimatePresence>
        {open && (
          <>
            <DialogOverlay className={overlayClassName} />
            <DialogPrimitive.Content ref={ref} forceMount asChild {...rest}>
              <motion.div
                className={cn(
                  "not-prose",
                  dialogContentVariants({ size }),
                  className,
                )}
                variants={shouldReduce ? undefined : modalContent.variants}
                initial={shouldReduce ? { opacity: 0 } : "initial"}
                animate={shouldReduce ? { opacity: 1 } : "animate"}
                exit={shouldReduce ? { opacity: 0 } : "exit"}
                transition={
                  shouldReduce ? { duration: 0.2 } : modalContent.transition
                }
                data-ds=""
                data-ds-component="dialog"
                data-ds-size={size}
                data-ds-animated=""
              >
                {children}
                {showClose && (
                  <DialogPrimitive.Close
                    className={cn(
                      "absolute right-4 top-4",
                      "inline-flex items-center justify-center",
                      "rounded-sm p-1",
                      "text-muted-foreground hover:text-foreground",
                      "transition-colors duration-fast",
                      focusRingClasses,
                    )}
                    aria-label="Close"
                  >
                    <CloseIcon className="size-4" />
                  </DialogPrimitive.Close>
                )}
              </motion.div>
            </DialogPrimitive.Content>
          </>
        )}
      </AnimatePresence>
    </DialogPrimitive.Portal>
  );
});
DialogContent.displayName = "DialogContent";

// ---------------------------------------------------------------------------
// DialogHeader / DialogBody / DialogFooter
// ---------------------------------------------------------------------------

export function DialogHeader({
  className,
  children,
  ...rest
}: DialogHeaderProps) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 px-6 pt-6", className)}
      data-ds=""
      data-ds-component="dialog-header"
      {...rest}
    >
      {children}
    </div>
  );
}
DialogHeader.displayName = "DialogHeader";

export function DialogBody({ className, children, ...rest }: DialogBodyProps) {
  return (
    <div
      className={cn("flex-1 overflow-y-auto px-6 py-4", className)}
      data-ds=""
      data-ds-component="dialog-body"
      {...rest}
    >
      {children}
    </div>
  );
}
DialogBody.displayName = "DialogBody";

export function DialogFooter({
  className,
  children,
  ...rest
}: DialogFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 px-6 pb-6 pt-2",
        className,
      )}
      data-ds=""
      data-ds-component="dialog-footer"
      {...rest}
    >
      {children}
    </div>
  );
}
DialogFooter.displayName = "DialogFooter";

// ---------------------------------------------------------------------------
// DialogTitle / DialogDescription
// ---------------------------------------------------------------------------

export const DialogTitle = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  DialogTitleProps
>(function DialogTitle({ className, children, ...rest }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-6 text-foreground",
        className,
      )}
      data-ds=""
      data-ds-component="dialog-title"
      {...rest}
    >
      {children}
    </DialogPrimitive.Title>
  );
});
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(function DialogDescription({ className, children, ...rest }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm leading-5 text-muted-foreground", className)}
      data-ds=""
      data-ds-component="dialog-description"
      {...rest}
    >
      {children}
    </DialogPrimitive.Description>
  );
});
DialogDescription.displayName = "DialogDescription";

// ---------------------------------------------------------------------------
// DialogClose
// ---------------------------------------------------------------------------

export const DialogClose = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Close>,
  DialogCloseProps
>(function DialogClose({ className, ...rest }, ref) {
  return (
    <DialogPrimitive.Close
      ref={ref}
      className={className}
      data-ds=""
      data-ds-component="dialog-close"
      {...rest}
    />
  );
});
DialogClose.displayName = "DialogClose";
