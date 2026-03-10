"use client";

// ============================================================================
// Unified UI — EmptyState Component
// ============================================================================
// Placeholder for empty lists/tables with icon, message, and CTA.
import { motion, useReducedMotion } from "framer-motion";
import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { fadeIn, scaleIn } from "@/lib/motion";

export interface EmptyStateProps {
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  animated?: boolean;
  className?: string;
  children?: ReactNode;
}

function InboxIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(
    {
      icon,
      title,
      description,
      action,
      animated = true,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const shouldReduce = useReducedMotion();

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center text-center gap-4 py-12 px-6",
          className,
        )}
        data-ds=""
        data-ds-component="empty-state"
        data-ds-animated={animated ? "" : undefined}
        {...rest}
      >
        {/* Icon */}
        {(icon !== undefined ? icon : true) && (
          <motion.div
            className="flex items-center justify-center size-16 rounded-full bg-muted text-muted-foreground"
            variants={animated && !shouldReduce ? scaleIn.variants : undefined}
            initial={animated && !shouldReduce ? "initial" : undefined}
            animate={animated && !shouldReduce ? "animate" : undefined}
            transition={
              animated && !shouldReduce ? scaleIn.transition : undefined
            }
            data-ds-animated={animated ? "" : undefined}
          >
            {icon ?? <InboxIcon className="size-8" />}
          </motion.div>
        )}

        {/* Text content */}
        <motion.div
          className="flex flex-col gap-1.5 max-w-xs"
          variants={animated && !shouldReduce ? fadeIn.variants : undefined}
          initial={animated && !shouldReduce ? "initial" : undefined}
          animate={animated && !shouldReduce ? "animate" : undefined}
          transition={
            animated && !shouldReduce
              ? { ...fadeIn.transition, delay: 0.15 }
              : undefined
          }
          data-ds-animated={animated ? "" : undefined}
        >
          {title && (
            <p className="text-base font-semibold text-foreground leading-5">
              {title}
            </p>
          )}
          {description && (
            <p className="text-sm text-muted-foreground leading-5">
              {description}
            </p>
          )}
        </motion.div>

        {/* Children */}
        {children}

        {/* Action */}
        {action && (
          <motion.div
            variants={animated && !shouldReduce ? fadeIn.variants : undefined}
            initial={animated && !shouldReduce ? "initial" : undefined}
            animate={animated && !shouldReduce ? "animate" : undefined}
            transition={
              animated && !shouldReduce
                ? { ...fadeIn.transition, delay: 0.25 }
                : undefined
            }
            data-ds-animated={animated ? "" : undefined}
          >
            {action}
          </motion.div>
        )}
      </div>
    );
  },
);
EmptyState.displayName = "EmptyState";
