"use client";

import { fadeInFast } from "@unified-ui/motion";
import { cn } from "@unified-ui/utils/cn";
import { cva } from "class-variance-authority";
// ============================================================================
// Unified UI — SearchInput Component
// ============================================================================
// Search field with debounce, clear button, and optional keyboard shortcut hint.
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  type ChangeEvent,
  forwardRef,
  type InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export const searchInputVariants = cva(
  [
    "flex w-full items-center gap-2",
    "rounded-md border bg-background",
    "transition-[border-color,box-shadow] duration-fast",
    "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",
    "has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-4 text-sm",
      },
      variant: {
        default: "border-input",
        filled: "border-transparent bg-muted",
      },
    },
    defaultVariants: { size: "md", variant: "default" },
  },
);

export type SearchInputSize = "sm" | "md" | "lg";
export type SearchInputVariant = "default" | "filled";

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onDebouncedChange?: (value: string) => void;
  debounce?: number;
  size?: SearchInputSize;
  variant?: SearchInputVariant;
  shortcut?: string;
  showClear?: boolean;
  loading?: boolean;
  className?: string;
}

function SearchIcon({ className }: { className?: string }) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
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

function LoaderIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

const iconSizeMap: Record<SearchInputSize, string> = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4",
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      value: controlledValue,
      defaultValue = "",
      onChange,
      onDebouncedChange,
      debounce: debounceMs = 300,
      size = "md",
      variant = "default",
      shortcut,
      showClear = true,
      loading = false,
      placeholder = "Search...",
      className,
      disabled,
      ...rest
    },
    ref,
  ) {
    const shouldReduce = useReducedMotion();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const currentValue =
      controlledValue !== undefined ? controlledValue : internalValue;
    const hasValue = currentValue.length > 0;

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const next = e.target.value;
        if (controlledValue === undefined) setInternalValue(next);
        onChange?.(next);

        if (onDebouncedChange) {
          if (debounceTimer.current) clearTimeout(debounceTimer.current);
          debounceTimer.current = setTimeout(
            () => onDebouncedChange(next),
            debounceMs,
          );
        }
      },
      [controlledValue, onChange, onDebouncedChange, debounceMs],
    );

    const handleClear = useCallback(() => {
      if (controlledValue === undefined) setInternalValue("");
      onChange?.("");
      onDebouncedChange?.("");
      const inputEl =
        (ref as React.RefObject<HTMLInputElement>)?.current ?? inputRef.current;
      inputEl?.focus();
    }, [controlledValue, onChange, onDebouncedChange, ref]);

    // Keyboard shortcut listener
    useEffect(() => {
      if (!shortcut) return;
      const handler = (e: KeyboardEvent) => {
        if (
          (e.metaKey || e.ctrlKey) &&
          e.key.toLowerCase() === shortcut.toLowerCase()
        ) {
          e.preventDefault();
          const inputEl =
            (ref as React.RefObject<HTMLInputElement>)?.current ??
            inputRef.current;
          inputEl?.focus();
        }
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, [shortcut, ref]);

    return (
      <div
        className={cn(searchInputVariants({ size, variant }), className)}
        data-ds=""
        data-ds-component="search-input"
        data-ds-size={size}
      >
        {/* Leading icon */}
        <span className="shrink-0 text-muted-foreground pointer-events-none">
          {loading ? (
            <LoaderIcon className={iconSizeMap[size]} />
          ) : (
            <SearchIcon className={iconSizeMap[size]} />
          )}
        </span>

        {/* Input */}
        <input
          ref={ref ?? inputRef}
          type="search"
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "flex-1 h-full bg-transparent outline-none",
            "text-foreground placeholder:text-muted-foreground",
            "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
          )}
          {...rest}
        />

        {/* Trailing: clear button or shortcut hint */}
        <div className="flex items-center gap-1 shrink-0">
          <AnimatePresence initial={false}>
            {showClear && hasValue && (
              <motion.button
                key="clear"
                type="button"
                onClick={handleClear}
                disabled={disabled}
                aria-label="Clear search"
                className={cn(
                  "inline-flex items-center justify-center rounded-sm",
                  "text-muted-foreground hover:text-foreground transition-colors duration-fast",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
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
                <XIcon className={iconSizeMap[size]} />
              </motion.button>
            )}
          </AnimatePresence>

          {shortcut && !hasValue && (
            <kbd
              className={cn(
                "hidden sm:inline-flex items-center gap-0.5 rounded border border-border",
                "bg-muted text-muted-foreground font-mono font-medium",
                "pointer-events-none select-none",
                size === "sm"
                  ? "px-1 py-0.5 text-[9px]"
                  : "px-1.5 py-0.5 text-[10px]",
              )}
            >
              {shortcut}
            </kbd>
          )}
        </div>
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";
