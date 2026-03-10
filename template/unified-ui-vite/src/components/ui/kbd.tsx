"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ReactNode } from "react";
// ============================================================================
// Unified UI — Kbd Component
// ============================================================================
import { cn } from "@/lib/cn";

export const kbdVariants = cva(
  [
    "inline-flex items-center gap-0.5",
    "font-mono font-medium leading-none",
    "rounded border border-border",
    "bg-muted text-muted-foreground",
    "shadow-[0_1px_0_1px_hsl(var(--border))]",
    "select-none whitespace-nowrap",
  ],
  {
    variants: {
      size: {
        sm: "px-1.5 py-0.5 text-[10px]",
        md: "px-2 py-1 text-xs",
        lg: "px-2.5 py-1 text-sm",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type KbdSize = "sm" | "md" | "lg";

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {
  size?: KbdSize;
  className?: string;
  children?: ReactNode;
}

/**
 * Kbd — keyboard shortcut display.
 *
 * @example
 * <Kbd>⌘K</Kbd>
 * <Kbd>Ctrl</Kbd><span>+</span><Kbd>S</Kbd>
 * <Kbd size="sm">Enter</Kbd>
 */
export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { size = "md", className, children, ...rest },
  ref,
) {
  return (
    <kbd
      ref={ref}
      className={cn(kbdVariants({ size }), className)}
      data-ds=""
      data-ds-component="kbd"
      data-ds-size={size}
      {...rest}
    >
      {children}
    </kbd>
  );
});

Kbd.displayName = "Kbd";
