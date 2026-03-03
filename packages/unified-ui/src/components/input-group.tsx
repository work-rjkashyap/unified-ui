"use client";

// ============================================================================
// Unified UI — InputGroup Component
// ============================================================================
// Composed input with prefix/suffix addons, icon slots, and inline button.
import { cn } from "@unified-ui/utils/cn";
import { cva } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

export type InputGroupSize = "sm" | "md" | "lg";
export type InputGroupVariant = "default" | "filled";

export interface InputGroupProps {
  size?: InputGroupSize;
  variant?: InputGroupVariant;
  prefix?: ReactNode;
  suffix?: ReactNode;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  inputClassName?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  children?: ReactNode;
}

const containerVariants = cva(
  [
    "flex w-full items-stretch overflow-hidden",
    "rounded-md border bg-background",
    "transition-[border-color,box-shadow] duration-fast",
    "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",
    "has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "border-input",
        filled: "border-transparent bg-muted",
      },
      size: {
        sm: "h-8 text-xs",
        md: "h-9 text-sm",
        lg: "h-10 text-sm",
      },
      error: {
        true: "border-danger focus-within:border-danger focus-within:ring-danger/20",
        false: "",
      },
    },
    defaultVariants: { variant: "default", size: "md", error: false },
  },
);

const addonVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "bg-muted text-muted-foreground font-medium",
    "px-3 select-none",
    "border-border",
  ],
  {
    variants: {
      position: {
        left: "border-r",
        right: "border-l",
      },
      size: {
        sm: "text-xs px-2",
        md: "text-sm px-3",
        lg: "text-sm px-3",
      },
    },
    defaultVariants: { position: "left", size: "md" },
  },
);

const prefixSuffixVariants = cva(
  [
    "inline-flex items-center shrink-0",
    "text-muted-foreground pointer-events-none",
  ],
  {
    variants: {
      position: {
        left: "pl-3",
        right: "pr-3",
      },
    },
    defaultVariants: { position: "left" },
  },
);

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroup(
    {
      size = "md",
      variant = "default",
      prefix,
      suffix,
      addonLeft,
      addonRight,
      disabled = false,
      error = false,
      className,
      inputClassName,
      inputProps,
      children,
    },
    ref,
  ) {
    const iconSize = size === "lg" ? "size-4" : "size-3.5";

    return (
      <div
        ref={ref}
        className={cn(containerVariants({ variant, size, error }), className)}
        data-ds=""
        data-ds-component="input-group"
        data-ds-size={size}
        data-ds-error={error ? "" : undefined}
      >
        {/* Left addon (styled separately, border) */}
        {addonLeft && (
          <div className={cn(addonVariants({ position: "left", size }))}>
            {addonLeft}
          </div>
        )}

        {/* Prefix icon/text (inside the input area, no border) */}
        {prefix && (
          <span
            className={cn(
              prefixSuffixVariants({ position: "left" }),
              `[&>svg]:${iconSize}`,
            )}
          >
            {prefix}
          </span>
        )}

        {/* Input slot */}
        {children ? (
          <div className="flex-1 flex items-center min-w-0">{children}</div>
        ) : (
          <input
            disabled={disabled}
            className={cn(
              "flex-1 h-full bg-transparent outline-none text-foreground",
              "placeholder:text-muted-foreground",
              !prefix && "pl-3",
              !suffix && !addonRight && "pr-3",
              inputClassName,
            )}
            {...inputProps}
          />
        )}

        {/* Suffix icon/text */}
        {suffix && (
          <span
            className={cn(
              prefixSuffixVariants({ position: "right" }),
              `[&>svg]:${iconSize}`,
            )}
          >
            {suffix}
          </span>
        )}

        {/* Right addon */}
        {addonRight && (
          <div className={cn(addonVariants({ position: "right", size }))}>
            {addonRight}
          </div>
        )}
      </div>
    );
  },
);
InputGroup.displayName = "InputGroup";
