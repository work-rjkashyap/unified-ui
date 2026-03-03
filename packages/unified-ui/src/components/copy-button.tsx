"use client";

import { fadeInFast, pop } from "@unified-ui/motion";
import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { cva } from "class-variance-authority";
// ============================================================================
// Unified UI — CopyButton Component
// ============================================================================
// Click-to-copy button with animated clipboard → checkmark feedback and tooltip.
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { forwardRef, useCallback, useState } from "react";

export const copyButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2",
    "rounded-md border font-medium",
    "transition-colors duration-fast",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
    focusRingClasses,
  ],
  {
    variants: {
      variant: {
        default:
          "bg-background border-border text-muted-foreground hover:text-foreground hover:bg-accent",
        ghost:
          "border-transparent bg-transparent text-muted-foreground hover:text-foreground hover:bg-accent",
      },
      size: {
        sm: "h-7 w-7 text-xs",
        md: "h-8 w-8 text-sm",
        lg: "h-9 w-9 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export type CopyButtonVariant = "default" | "ghost";
export type CopyButtonSize = "sm" | "md" | "lg";

export interface CopyButtonProps {
  text: string;
  variant?: CopyButtonVariant;
  size?: CopyButtonSize;
  tooltip?: string;
  successDuration?: number;
  onCopy?: (text: string) => void;
  onCopyError?: (error: Error) => void;
  className?: string;
}

function CopyIcon({ className }: { className?: string }) {
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
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

const iconSizeMap: Record<CopyButtonSize, string> = {
  sm: "size-3",
  md: "size-3.5",
  lg: "size-4",
};

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  function CopyButton(
    {
      text,
      variant = "default",
      size = "md",
      tooltip = "Copy",
      successDuration = 2000,
      onCopy,
      onCopyError,
      className,
    },
    ref,
  ) {
    const shouldReduce = useReducedMotion();
    const [copied, setCopied] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const handleCopy = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        onCopy?.(text);
        setTimeout(() => setCopied(false), successDuration);
      } catch (err) {
        onCopyError?.(err instanceof Error ? err : new Error(String(err)));
      }
    }, [text, successDuration, onCopy, onCopyError]);

    return (
      <div className="relative inline-flex">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              className={cn(
                "absolute -top-8 left-1/2 -translate-x-1/2",
                "px-2 py-1 rounded-md",
                "bg-foreground text-background text-xs font-medium whitespace-nowrap",
                "pointer-events-none z-tooltip",
              )}
              variants={shouldReduce ? undefined : fadeInFast.variants}
              initial={shouldReduce ? { opacity: 0 } : "initial"}
              animate={shouldReduce ? { opacity: 1 } : "animate"}
              exit={shouldReduce ? { opacity: 0 } : "exit"}
              transition={
                shouldReduce ? { duration: 0.1 } : fadeInFast.transition
              }
              data-ds-animated=""
            >
              {copied ? "Copied!" : tooltip}
              <span
                className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground"
                aria-hidden="true"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          ref={ref}
          type="button"
          onClick={handleCopy}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          aria-label={copied ? "Copied!" : tooltip}
          className={cn(copyButtonVariants({ variant, size }), className)}
          data-ds=""
          data-ds-component="copy-button"
          data-ds-size={size}
          data-ds-copied={copied ? "" : undefined}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                className={cn("text-success", iconSizeMap[size])}
                variants={shouldReduce ? undefined : pop.variants}
                initial={shouldReduce ? { opacity: 0 } : "initial"}
                animate={shouldReduce ? { opacity: 1 } : "animate"}
                exit={shouldReduce ? { opacity: 0 } : "exit"}
                transition={shouldReduce ? { duration: 0.1 } : pop.transition}
                data-ds-animated=""
              >
                <CheckIcon className={iconSizeMap[size]} />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                variants={shouldReduce ? undefined : fadeInFast.variants}
                initial={shouldReduce ? { opacity: 0 } : "initial"}
                animate={shouldReduce ? { opacity: 1 } : "animate"}
                exit={shouldReduce ? { opacity: 0 } : "exit"}
                transition={
                  shouldReduce ? { duration: 0.1 } : fadeInFast.transition
                }
                data-ds-animated=""
              >
                <CopyIcon className={iconSizeMap[size]} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    );
  },
);
CopyButton.displayName = "CopyButton";
