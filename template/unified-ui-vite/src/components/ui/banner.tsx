"use client";

import { cva } from "class-variance-authority";
// ============================================================================
// Unified UI — Banner Component
// ============================================================================
// Full-width dismissible banner for announcements, positioned at top or bottom.
// Slides in from the relevant direction and animates out on dismiss.
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { forwardRef, type ReactNode, useState } from "react";
import { cn } from "@/lib/cn";
import { focusRingClasses } from "@/lib/focus-ring";
import { slideDown, slideUp } from "@/lib/motion";

export const bannerVariants = cva(
  ["w-full flex items-center gap-3 px-4 py-3 text-sm font-medium"],
  {
    variants: {
      variant: {
        default: "bg-foreground text-background",
        info: "bg-info text-info-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        danger: "bg-danger text-danger-foreground",
        primary: "bg-primary text-primary-foreground",
      },
      position: {
        top: "sticky top-0 left-0 right-0 z-banner",
        bottom: "sticky bottom-0 left-0 right-0 z-banner",
        inline: "rounded-md",
      },
    },
    defaultVariants: { variant: "default", position: "inline" },
  },
);

export type BannerVariant =
  | "default"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "primary";
export type BannerPosition = "top" | "bottom" | "inline";

export interface BannerProps {
  variant?: BannerVariant;
  position?: BannerPosition;
  dismissible?: boolean;
  onDismiss?: () => void;
  dismissLabel?: string;
  icon?: ReactNode;
  action?: ReactNode;
  visible?: boolean;
  defaultVisible?: boolean;
  className?: string;
  children?: ReactNode;
  id?: string;
  style?: React.CSSProperties;
  role?: string;
  "aria-label"?: string;
  "aria-live"?: "off" | "assertive" | "polite";
}

function XIcon({ className }: { className?: string }) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  {
    variant = "default",
    position = "inline",
    dismissible = false,
    onDismiss,
    dismissLabel = "Dismiss",
    icon,
    action,
    visible: controlledVisible,
    defaultVisible = true,
    className,
    children,
    id,
    style,
    role,
    "aria-label": ariaLabel,
    "aria-live": ariaLive,
  },
  ref,
) {
  const shouldReduce = useReducedMotion();
  const [internalVisible, setInternalVisible] = useState(defaultVisible);

  const isVisible =
    controlledVisible !== undefined ? controlledVisible : internalVisible;

  const handleDismiss = () => {
    if (controlledVisible === undefined) setInternalVisible(false);
    onDismiss?.();
  };

  const slidePreset = position === "bottom" ? slideUp : slideDown;

  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.div
          ref={ref}
          className={cn(bannerVariants({ variant, position }), className)}
          variants={shouldReduce ? undefined : slidePreset.variants}
          initial={shouldReduce ? { opacity: 0 } : "initial"}
          animate={shouldReduce ? { opacity: 1 } : "animate"}
          exit={shouldReduce ? { opacity: 0 } : "exit"}
          transition={shouldReduce ? { duration: 0.2 } : slidePreset.transition}
          data-ds=""
          data-ds-component="banner"
          data-ds-variant={variant}
          data-ds-position={position}
          data-ds-animated=""
          id={id}
          style={style}
          role={role}
          aria-label={ariaLabel}
          aria-live={ariaLive}
        >
          {icon && <span className="shrink-0">{icon}</span>}

          <span className="flex-1 min-w-0">{children}</span>

          {action && <span className="shrink-0">{action}</span>}

          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              className={cn(
                "shrink-0 inline-flex items-center justify-center size-6 rounded-sm",
                "opacity-70 hover:opacity-100 transition-opacity duration-fast",
                focusRingClasses,
              )}
              aria-label={dismissLabel}
            >
              <XIcon className="size-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
});
Banner.displayName = "Banner";
