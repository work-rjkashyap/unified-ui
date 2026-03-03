"use client";

import { expandHeight, fadeIn } from "@unified-ui/motion";
import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { cva } from "class-variance-authority";
// ============================================================================
// Unified UI — Callout Component
// ============================================================================
// Highlighted information block with icon, title, and collapsible content.
// Built on top of Alert with expandHeight animation for collapsible variant.
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { forwardRef, type ReactNode, useState } from "react";

export const calloutVariants = cva(
  ["rounded-lg border p-4 text-sm", "transition-colors duration-fast"],
  {
    variants: {
      variant: {
        info: "bg-info-muted text-info-muted-foreground border-info/25",
        success:
          "bg-success-muted text-success-muted-foreground border-success/25",
        warning:
          "bg-warning-muted text-warning-muted-foreground border-warning/25",
        danger: "bg-danger-muted text-danger-muted-foreground border-danger/25",
        default: "bg-muted text-muted-foreground border-border",
      },
    },
    defaultVariants: { variant: "info" },
  },
);

const iconColorMap: Record<CalloutVariant, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  default: "text-muted-foreground",
};

export type CalloutVariant =
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "default";

export interface CalloutProps {
  variant?: CalloutVariant;
  title?: ReactNode;
  icon?: ReactNode | null;
  collapsible?: boolean;
  defaultOpen?: boolean;
  className?: string;
  children?: ReactNode;
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  function Callout(
    {
      variant = "info",
      title,
      icon,
      collapsible = false,
      defaultOpen = true,
      className,
      children,
    },
    ref,
  ) {
    const shouldReduce = useReducedMotion();
    const [open, setOpen] = useState(defaultOpen);
    const showIcon = icon !== null;
    const resolvedIcon =
      icon !== undefined && icon !== null ? (
        icon
      ) : (
        <InfoIcon className="size-4" />
      );

    return (
      <motion.div
        ref={ref}
        className={cn(calloutVariants({ variant }), className)}
        variants={shouldReduce ? undefined : fadeIn.variants}
        initial={shouldReduce ? undefined : "initial"}
        animate={shouldReduce ? undefined : "animate"}
        transition={shouldReduce ? undefined : fadeIn.transition}
        data-ds=""
        data-ds-component="callout"
        data-ds-variant={variant}
        data-ds-animated=""
      >
        {/* Header — semantic button when collapsible, plain div otherwise */}
        {collapsible ? (
          <button
            type="button"
            className={cn(
              "flex items-start gap-3 w-full text-left cursor-pointer",
              focusRingClasses,
              "rounded-sm",
            )}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
          >
            {showIcon && (
              <span className={cn("mt-0.5 shrink-0", iconColorMap[variant])}>
                {resolvedIcon}
              </span>
            )}
            <div className="flex-1 min-w-0">
              {title && <p className="font-semibold leading-5 mb-1">{title}</p>}
            </div>
            <motion.span
              className="shrink-0 mt-0.5"
              animate={open ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
              data-ds-animated=""
            >
              <ChevronDownIcon className="size-4 opacity-70" />
            </motion.span>
          </button>
        ) : (
          <div className="flex items-start gap-3">
            {showIcon && (
              <span className={cn("mt-0.5 shrink-0", iconColorMap[variant])}>
                {resolvedIcon}
              </span>
            )}
            <div className="flex-1 min-w-0">
              {title && <p className="font-semibold leading-5 mb-1">{title}</p>}
              {children && (
                <div className={cn("leading-5", title && "opacity-90")}>
                  {children}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Collapsible content */}
        {collapsible && (
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                variants={shouldReduce ? undefined : expandHeight.variants}
                initial={shouldReduce ? { opacity: 0 } : "initial"}
                animate={shouldReduce ? { opacity: 1 } : "animate"}
                exit={shouldReduce ? { opacity: 0 } : "exit"}
                transition={
                  shouldReduce ? { duration: 0.15 } : expandHeight.transition
                }
                data-ds-animated=""
              >
                <div
                  className={cn("leading-5 pt-2 pl-7", title && "opacity-90")}
                >
                  {children}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    );
  },
);

Callout.displayName = "Callout";
