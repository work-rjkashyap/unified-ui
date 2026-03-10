"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
// ============================================================================
// Unified UI — AlertDialog Component
// ============================================================================
// Confirmation dialog with required action — no dismiss on overlay click.
// Built on Radix UI AlertDialog with Framer Motion animations.
import { AlertDialog as AlertDialogPrimitive } from "radix-ui";
import {
  type ComponentPropsWithoutRef,
  createContext,
  type ElementRef,
  forwardRef,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { cn } from "@/lib/cn";
import { focusRingClasses } from "@/lib/focus-ring";
import { modalContent, overlayBackdrop } from "@/lib/motion";

// ---------------------------------------------------------------------------
// Internal context — shares open state for AnimatePresence exit animations
// ---------------------------------------------------------------------------

interface AlertDialogContextValue {
  open: boolean;
}

const AlertDialogContext = createContext<AlertDialogContextValue>({
  open: false,
});

function useAlertDialogContext() {
  return useContext(AlertDialogContext);
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AlertDialogProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root> {
  children: ReactNode;
}

export function AlertDialog({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  ...rest
}: AlertDialogProps) {
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
    <AlertDialogContext.Provider value={{ open }}>
      <AlertDialogPrimitive.Root
        open={open}
        onOpenChange={handleOpenChange}
        {...rest}
      >
        {children}
      </AlertDialogPrimitive.Root>
    </AlertDialogContext.Provider>
  );
}
AlertDialog.displayName = "AlertDialog";

export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
AlertDialogTrigger.displayName = "AlertDialogTrigger";

export const AlertDialogPortal = AlertDialogPrimitive.Portal;
AlertDialogPortal.displayName = "AlertDialogPortal";

export interface AlertDialogOverlayProps
  extends ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> {
  className?: string;
}

export const AlertDialogOverlay = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Overlay>,
  AlertDialogOverlayProps
>(function AlertDialogOverlay({ className, ...rest }, ref) {
  const shouldReduce = useReducedMotion();
  return (
    <AlertDialogPrimitive.Overlay ref={ref} forceMount asChild {...rest}>
      <motion.div
        className={cn(
          "fixed inset-0 z-overlay bg-black/50 backdrop-blur-sm",
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
    </AlertDialogPrimitive.Overlay>
  );
});
AlertDialogOverlay.displayName = "AlertDialogOverlay";

export interface AlertDialogContentProps
  extends ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {
  className?: string;
  children?: ReactNode;
}

export const AlertDialogContent = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Content>,
  AlertDialogContentProps
>(function AlertDialogContent({ className, children, ...rest }, ref) {
  const shouldReduce = useReducedMotion();
  const { open } = useAlertDialogContext();

  return (
    <AlertDialogPrimitive.Portal forceMount>
      <AnimatePresence>
        {open && (
          <>
            <AlertDialogOverlay />
            <AlertDialogPrimitive.Content
              ref={ref}
              forceMount
              asChild
              {...rest}
            >
              <motion.div
                className={cn(
                  "fixed left-[50%] top-[50%] z-modal",
                  "-translate-x-[50%] -translate-y-[50%]",
                  "w-full max-w-md rounded-lg border border-border bg-background shadow-xl",
                  "p-6",
                  "outline-none",
                  focusRingClasses,
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
                data-ds-component="alert-dialog-content"
                data-ds-animated=""
              >
                {children}
              </motion.div>
            </AlertDialogPrimitive.Content>
          </>
        )}
      </AnimatePresence>
    </AlertDialogPrimitive.Portal>
  );
});
AlertDialogContent.displayName = "AlertDialogContent";

export interface AlertDialogHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

export function AlertDialogHeader({
  className,
  children,
  ...rest
}: AlertDialogHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-2 mb-4", className)} {...rest}>
      {children}
    </div>
  );
}
AlertDialogHeader.displayName = "AlertDialogHeader";

export interface AlertDialogFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

export function AlertDialogFooter({
  className,
  children,
  ...rest
}: AlertDialogFooterProps) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-6",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
AlertDialogFooter.displayName = "AlertDialogFooter";

export interface AlertDialogTitleProps
  extends ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> {
  className?: string;
  children?: ReactNode;
}

export const AlertDialogTitle = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Title>,
  AlertDialogTitleProps
>(function AlertDialogTitle({ className, children, ...rest }, ref) {
  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      className={cn(
        "text-lg font-semibold text-foreground leading-5",
        className,
      )}
      {...rest}
    >
      {children}
    </AlertDialogPrimitive.Title>
  );
});
AlertDialogTitle.displayName = "AlertDialogTitle";

export interface AlertDialogDescriptionProps
  extends ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> {
  className?: string;
  children?: ReactNode;
}

export const AlertDialogDescription = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Description>,
  AlertDialogDescriptionProps
>(function AlertDialogDescription({ className, children, ...rest }, ref) {
  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-muted-foreground leading-5", className)}
      {...rest}
    >
      {children}
    </AlertDialogPrimitive.Description>
  );
});
AlertDialogDescription.displayName = "AlertDialogDescription";

export interface AlertDialogActionProps
  extends ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> {
  className?: string;
  children?: ReactNode;
}

export const AlertDialogAction = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Action>,
  AlertDialogActionProps
>(function AlertDialogAction({ className, children, ...rest }, ref) {
  return (
    <AlertDialogPrimitive.Action
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "h-9 px-4 text-sm font-medium rounded-md",
        "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
        "transition-colors duration-fast",
        "disabled:pointer-events-none disabled:opacity-50",
        focusRingClasses,
        className,
      )}
      {...rest}
    >
      {children}
    </AlertDialogPrimitive.Action>
  );
});
AlertDialogAction.displayName = "AlertDialogAction";

export interface AlertDialogCancelProps
  extends ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> {
  className?: string;
  children?: ReactNode;
}

export const AlertDialogCancel = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Cancel>,
  AlertDialogCancelProps
>(function AlertDialogCancel({ className, children, ...rest }, ref) {
  return (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "h-9 px-4 text-sm font-medium rounded-md",
        "bg-secondary text-secondary-foreground border border-border",
        "hover:bg-secondary-hover active:bg-secondary-active",
        "transition-colors duration-fast",
        "disabled:pointer-events-none disabled:opacity-50",
        focusRingClasses,
        className,
      )}
      {...rest}
    >
      {children}
    </AlertDialogPrimitive.Cancel>
  );
});
AlertDialogCancel.displayName = "AlertDialogCancel";
