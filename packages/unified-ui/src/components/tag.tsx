"use client";

import { popSubtle } from "@unified-ui/motion";
import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { cva, type VariantProps } from "class-variance-authority";
// ============================================================================
// Unified UI — Tag Component
// ============================================================================
import { motion, useReducedMotion } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

export const tagVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-full",
    "font-medium leading-none",
    "transition-colors duration-fast",
    "select-none",
  ],
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        primary: "bg-primary/15 text-primary",
        secondary:
          "bg-secondary text-secondary-foreground border border-border",
        success: "bg-success-muted text-success",
        warning: "bg-warning-muted text-warning",
        danger: "bg-danger-muted text-danger",
        info: "bg-info-muted text-info",
      },
      size: {
        sm: "px-2 py-0.5 text-xs gap-1",
        md: "px-2.5 py-1 text-xs gap-1.5",
        lg: "px-3 py-1.5 text-sm gap-2",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export type TagVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";
export type TagSize = "sm" | "md" | "lg";

export interface TagProps extends VariantProps<typeof tagVariants> {
  variant?: TagVariant;
  size?: TagSize;
  /** Leading avatar or icon slot. */
  avatar?: ReactNode;
  /** Trailing icon (shown before close button). */
  icon?: ReactNode;
  /** Whether the tag can be dismissed. */
  dismissible?: boolean;
  /** Called when the dismiss button is clicked. */
  onDismiss?: () => void;
  /** Accessible label for the dismiss button. */
  dismissLabel?: string;
  /** Whether the tag is disabled. */
  disabled?: boolean;
  /** Additional CSS classes. */
  className?: string;
  children?: ReactNode;
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    variant = "default",
    size = "md",
    avatar,
    icon,
    dismissible = false,
    onDismiss,
    dismissLabel = "Remove tag",
    disabled = false,
    className,
    children,
  },
  ref,
) {
  const shouldReduce = useReducedMotion();

  const iconSize = size === "lg" ? "size-3.5" : "size-3";

  return (
    <motion.span
      ref={ref}
      className={cn(
        tagVariants({ variant, size }),
        disabled && "opacity-50 pointer-events-none",
        className,
      )}
      variants={shouldReduce ? undefined : popSubtle.variants}
      initial={shouldReduce ? undefined : "initial"}
      animate={shouldReduce ? undefined : "animate"}
      transition={shouldReduce ? undefined : popSubtle.transition}
      data-ds=""
      data-ds-component="tag"
      data-ds-variant={variant}
      data-ds-size={size}
      data-ds-animated=""
    >
      {avatar && <span className="shrink-0 -ml-0.5">{avatar}</span>}
      {icon && <span className="shrink-0 opacity-70">{icon}</span>}
      <span className="truncate">{children}</span>
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          disabled={disabled}
          className={cn(
            "shrink-0 inline-flex items-center justify-center rounded-full",
            "opacity-60 hover:opacity-100 transition-opacity duration-fast",
            "-mr-0.5",
            focusRingClasses,
          )}
          aria-label={dismissLabel}
          tabIndex={0}
        >
          <XIcon className={iconSize} />
        </button>
      )}
    </motion.span>
  );
});

Tag.displayName = "Tag";
