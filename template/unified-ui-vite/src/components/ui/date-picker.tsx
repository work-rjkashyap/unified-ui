"use client";

// ============================================================================
// Unified UI — DatePicker Component
// ============================================================================
// A production-ready date picker built by composing Popover + Calendar + Input.
// Supports single date and range mode, locale formatting, and keyboard navigation.
//
// Features:
//   - Composes Popover, Calendar, and Input primitives
//   - Single date and range selection modes
//   - Locale-aware date formatting
//   - Animated popover (scaleIn via Framer Motion)
//   - Clearable input
//   - Disabled state
//   - Size variants: sm, md, lg
//   - Full ref forwarding
//   - WCAG AA: aria-expanded, aria-haspopup, role="dialog"
//
// Usage:
//   <DatePicker onSelect={(date) => setDate(date)} />
//   <DatePicker mode="range" onSelectRange={(r) => setRange(r)} />
//   <DatePicker placeholder="Pick a date" size="lg" />
// ============================================================================

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Popover as PopoverPrimitive } from "radix-ui";
import { forwardRef, useCallback, useState } from "react";
import { cn } from "@/lib/cn";
import { focusRingClasses } from "@/lib/focus-ring";
import { scaleIn } from "@/lib/motion";
import { Calendar, type DateRange } from "./calendar";

// ---------------------------------------------------------------------------
// Icons (Internal)
// ---------------------------------------------------------------------------

function CalendarIcon({ className }: { className?: string }) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
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

// ---------------------------------------------------------------------------
// Date Formatting
// ---------------------------------------------------------------------------

function formatDate(date: Date, locale = "en-US"): string {
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatRange(range: DateRange, locale = "en-US"): string {
  const from = formatDate(range.from, locale);
  const to = range.to ? formatDate(range.to, locale) : "...";
  return `${from} — ${to}`;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type DatePickerMode = "single" | "range";
export type DatePickerSize = "sm" | "md" | "lg";

export interface DatePickerProps {
  /**
   * Selection mode.
   * @default "single"
   */
  mode?: DatePickerMode;

  /**
   * The currently selected date (single mode).
   */
  value?: Date | null;

  /**
   * The currently selected range (range mode).
   */
  valueRange?: DateRange | null;

  /**
   * Callback for single-date selection.
   */
  onSelect?: (date: Date | null) => void;

  /**
   * Callback for range selection.
   */
  onSelectRange?: (range: DateRange | null) => void;

  /**
   * Placeholder text shown when no date is selected.
   * @default "Pick a date"
   */
  placeholder?: string;

  /**
   * Size of the trigger input.
   * @default "md"
   */
  size?: DatePickerSize;

  /**
   * Whether the picker is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to show a clear (×) button when a date is selected.
   * @default true
   */
  clearable?: boolean;

  /**
   * Locale string for date formatting.
   * @default "en-US"
   */
  locale?: string;

  /**
   * A function that returns `true` for dates that should be disabled.
   */
  disabledDate?: (date: Date) => boolean;

  /**
   * Minimum selectable date.
   */
  minDate?: Date;

  /**
   * Maximum selectable date.
   */
  maxDate?: Date;

  /**
   * Default month to display when no date is selected.
   */
  defaultMonth?: Date;

  /**
   * Alignment of the popover relative to the trigger.
   * @default "start"
   */
  align?: "start" | "center" | "end";

  /** Additional CSS classes on the trigger button. */
  className?: string;

  /** Additional CSS classes on the popover content. */
  contentClassName?: string;
}

// ---------------------------------------------------------------------------
// Trigger Button (Internal)
// ---------------------------------------------------------------------------

const sizeClasses: Record<DatePickerSize, string> = {
  sm: "h-8 px-3 text-xs gap-2 rounded-md",
  md: "h-9 px-3 text-sm gap-2 rounded-md",
  lg: "h-10 px-4 text-sm gap-2 rounded-md",
};

const iconSizeClasses: Record<DatePickerSize, string> = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * DatePicker — a date or date-range input with calendar popover.
 *
 * @example
 * // Single date
 * const [date, setDate] = useState<Date | null>(null);
 * <DatePicker value={date} onSelect={setDate} />
 *
 * // Range
 * const [range, setRange] = useState<DateRange | null>(null);
 * <DatePicker mode="range" valueRange={range} onSelectRange={setRange} />
 *
 * // Disabled past dates
 * <DatePicker disabledDate={(d) => d < new Date()} placeholder="Future only" />
 */
export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  function DatePicker(
    {
      mode = "single",
      value,
      valueRange,
      onSelect,
      onSelectRange,
      placeholder = "Pick a date",
      size = "md",
      disabled = false,
      clearable = true,
      locale = "en-US",
      disabledDate,
      minDate,
      maxDate,
      defaultMonth,
      align = "start",
      className,
      contentClassName,
    },
    ref,
  ) {
    const shouldReduce = useReducedMotion();
    const [open, setOpen] = useState(false);

    // Internal state for uncontrolled mode
    const [internalDate, setInternalDate] = useState<Date | null>(null);
    const [internalRange, setInternalRange] = useState<DateRange | null>(null);

    const selectedDate = value !== undefined ? value : internalDate;
    const selectedRange = valueRange !== undefined ? valueRange : internalRange;

    const hasValue =
      mode === "single" ? selectedDate !== null : selectedRange !== null;

    // Formatted display value
    const displayValue = (() => {
      if (mode === "single") {
        return selectedDate ? formatDate(selectedDate, locale) : null;
      }
      return selectedRange ? formatRange(selectedRange, locale) : null;
    })();

    // Handlers
    const handleSelect = useCallback(
      (date: Date) => {
        if (value === undefined) setInternalDate(date);
        onSelect?.(date);
        if (mode === "single") setOpen(false);
      },
      [mode, value, onSelect],
    );

    const handleSelectRange = useCallback(
      (range: DateRange) => {
        if (valueRange === undefined) setInternalRange(range);
        onSelectRange?.(range);
        // Close when both ends of range are selected
        if (range.to) setOpen(false);
      },
      [valueRange, onSelectRange],
    );

    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (value === undefined) setInternalDate(null);
        if (valueRange === undefined) setInternalRange(null);
        onSelect?.(null);
        onSelectRange?.(null);
      },
      [value, valueRange, onSelect, onSelectRange],
    );

    return (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger asChild>
          <button
            ref={ref}
            type="button"
            disabled={disabled}
            aria-expanded={open}
            aria-haspopup="dialog"
            className={cn(
              // Layout
              "inline-flex items-center justify-between",
              // Base styles
              "border border-input bg-background",
              "text-left",
              // Transitions
              "transition-colors duration-fast",
              // Disabled
              "disabled:pointer-events-none disabled:opacity-50",
              // Focus
              focusRingClasses,
              // Size
              sizeClasses[size],
              // Open state
              open && "border-ring ring-2 ring-ring/20",
              className,
            )}
            data-ds=""
            data-ds-component="date-picker"
            data-ds-size={size}
            data-ds-mode={mode}
            data-state={open ? "open" : "closed"}
          >
            {/* Left: icon + value */}
            <span className="flex items-center gap-2 min-w-0">
              <CalendarIcon
                className={cn(
                  "shrink-0 text-muted-foreground",
                  iconSizeClasses[size],
                )}
              />
              <span
                className={cn(
                  "truncate",
                  !displayValue && "text-muted-foreground",
                )}
              >
                {displayValue ?? placeholder}
              </span>
            </span>

            {/* Right: clear button */}
            {clearable && hasValue && (
              <span
                role="button"
                tabIndex={0}
                onClick={handleClear}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    handleClear(e as unknown as React.MouseEvent);
                }}
                className={cn(
                  "shrink-0 ml-1",
                  "inline-flex items-center justify-center rounded-sm",
                  "text-muted-foreground hover:text-foreground",
                  "transition-colors duration-fast",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                )}
                aria-label="Clear date"
              >
                <XIcon className={iconSizeClasses[size]} />
              </span>
            )}
          </button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <AnimatePresence>
            {open && (
              <PopoverPrimitive.Content
                asChild
                align={align}
                sideOffset={6}
                forceMount
                onInteractOutside={() => setOpen(false)}
                onEscapeKeyDown={() => setOpen(false)}
              >
                <motion.div
                  className={cn(
                    "z-popover rounded-lg border border-border bg-background shadow-lg",
                    "outline-none",
                    contentClassName,
                  )}
                  variants={scaleIn.variants}
                  initial={shouldReduce ? { opacity: 0 } : "initial"}
                  animate="animate"
                  exit={shouldReduce ? { opacity: 0 } : "exit"}
                  transition={scaleIn.transition}
                  data-ds-animated=""
                >
                  <Calendar
                    mode={mode}
                    selected={
                      mode === "single"
                        ? (selectedDate ?? undefined)
                        : undefined
                    }
                    selectedRange={
                      mode === "range"
                        ? (selectedRange ?? undefined)
                        : undefined
                    }
                    onSelect={mode === "single" ? handleSelect : undefined}
                    onSelectRange={
                      mode === "range" ? handleSelectRange : undefined
                    }
                    defaultMonth={
                      defaultMonth ??
                      (mode === "single"
                        ? (selectedDate ?? undefined)
                        : (selectedRange?.from ?? undefined))
                    }
                    disabledDate={disabledDate}
                    minDate={minDate}
                    maxDate={maxDate}
                  />
                </motion.div>
              </PopoverPrimitive.Content>
            )}
          </AnimatePresence>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  },
);

DatePicker.displayName = "DatePicker";
