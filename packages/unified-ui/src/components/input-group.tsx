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
    "select-none",
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

const iconSizeMap: Record<InputGroupSize, string> = {
  sm: "[&>svg]:size-3.5",
  md: "[&>svg]:size-4",
  lg: "[&>svg]:size-4",
};

const prefixPaddingMap: Record<InputGroupSize, string> = {
  sm: "pl-2",
  md: "pl-3",
  lg: "pl-3",
};

const suffixPaddingMap: Record<InputGroupSize, string> = {
  sm: "pr-2",
  md: "pr-3",
  lg: "pr-3",
};

const inputLeftPaddingWithPrefix: Record<InputGroupSize, string> = {
  sm: "pl-1.5",
  md: "pl-2",
  lg: "pl-2",
};

const inputLeftPaddingWithAddon: Record<InputGroupSize, string> = {
  sm: "pl-2",
  md: "pl-3",
  lg: "pl-3",
};

const inputLeftPaddingWithoutPrefix: Record<InputGroupSize, string> = {
  sm: "pl-2",
  md: "pl-3",
  lg: "pl-3",
};

const inputRightPaddingWithSuffix: Record<InputGroupSize, string> = {
  sm: "pr-1.5",
  md: "pr-2",
  lg: "pr-2",
};

const inputRightPaddingWithAddon: Record<InputGroupSize, string> = {
  sm: "pr-2",
  md: "pr-3",
  lg: "pr-3",
};

const inputRightPaddingWithoutSuffix: Record<InputGroupSize, string> = {
  sm: "pr-2",
  md: "pr-3",
  lg: "pr-3",
};

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
    const hasPrefix = !!prefix;
    const hasSuffix = !!suffix;
    const hasAddonRight = !!addonRight;

    // Determine input padding based on surrounding elements
    const inputPaddingLeft = hasPrefix
      ? inputLeftPaddingWithPrefix[size]
      : addonLeft
        ? inputLeftPaddingWithAddon[size]
        : inputLeftPaddingWithoutPrefix[size];

    const inputPaddingRight = hasSuffix
      ? inputRightPaddingWithSuffix[size]
      : hasAddonRight
        ? inputRightPaddingWithAddon[size]
        : inputRightPaddingWithoutSuffix[size];

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
              "inline-flex items-center justify-center shrink-0",
              "text-muted-foreground pointer-events-none",
              prefixPaddingMap[size],
              iconSizeMap[size],
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
              "flex-1 h-full bg-transparent outline-none text-foreground min-w-0",
              "placeholder:text-muted-foreground",
              inputPaddingLeft,
              inputPaddingRight,
              inputClassName,
            )}
            {...inputProps}
          />
        )}

        {/* Suffix icon/text */}
        {suffix && (
          <span
            className={cn(
              "inline-flex items-center justify-center shrink-0",
              "text-muted-foreground pointer-events-none",
              suffixPaddingMap[size],
              iconSizeMap[size],
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
