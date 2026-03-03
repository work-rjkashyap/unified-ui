"use client";

// ============================================================================
// Unified UI — Calendar Component
// ============================================================================
// A production-ready calendar component built on the Unified UI token layer.
// Implements a month/year grid with range selection, disabled dates, and
// smooth month transition animations via Framer Motion.
//
// Features:
//   - Single date and range selection modes
//   - Month/year navigation with animated crossfade transitions
//   - Disabled date support (individual dates or a disabledDate function)
//   - Today highlight
//   - Keyboard navigation (arrow keys, Enter, Space, PageUp/Down, Home/End)
//   - Framer Motion: AnimatePresence + crossfade on month change
//   - Respects prefers-reduced-motion
//   - Full ref forwarding
//   - WCAG AA: role="grid", aria-selected, aria-disabled, aria-label
//
// Usage:
//   <Calendar onSelect={(date) => setDate(date)} />
//   <Calendar mode="range" onSelectRange={(range) => setRange(range)} />
//   <Calendar selected={date} disabledDate={(d) => d < new Date()} />
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  forwardRef,
  type KeyboardEvent,
  useCallback,
  useId,
  useRef,
  useState,
} from "react";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// ---------------------------------------------------------------------------
// Date Utilities
// ---------------------------------------------------------------------------

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function addMonths(date: Date, delta: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + delta);
  return d;
}

function _clampToMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Returns the 6×7 grid of dates for the given month view. */
function buildCalendarGrid(year: number, month: number): (Date | null)[][] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = firstDay.getDay(); // 0 = Sun
  const totalDays = lastDay.getDate();

  const cells: (Date | null)[] = [];

  // Leading empty cells
  for (let i = 0; i < startDow; i++) cells.push(null);

  // Day cells
  for (let d = 1; d <= totalDays; d++) {
    cells.push(new Date(year, month, d));
  }

  // Trailing empty cells to fill 6 weeks
  while (cells.length % 7 !== 0) cells.push(null);

  // Split into weeks
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

// ---------------------------------------------------------------------------
// CVA — Day Button Variants
// ---------------------------------------------------------------------------

export const calendarDayVariants = cva(
  [
    "relative w-9 h-9 p-0 rounded-md",
    "inline-flex items-center justify-center",
    "text-sm font-normal leading-none",
    "transition-colors duration-fast",
    "cursor-pointer select-none",
    focusRingClasses,
    "disabled:pointer-events-none disabled:opacity-30 disabled:cursor-not-allowed",
  ],
  {
    variants: {
      state: {
        default: "text-foreground hover:bg-accent hover:text-accent-foreground",
        today:
          "font-semibold text-primary ring-1 ring-primary hover:bg-primary/10",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary-hover font-medium",
        rangeStart:
          "bg-primary text-primary-foreground rounded-r-none hover:bg-primary-hover",
        rangeEnd:
          "bg-primary text-primary-foreground rounded-l-none hover:bg-primary-hover",
        rangeMiddle:
          "bg-primary/15 text-foreground rounded-none hover:bg-primary/25",
        outsideMonth: "text-muted-foreground opacity-50",
        disabled: "",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CalendarMode = "single" | "range";

export interface DateRange {
  from: Date;
  to?: Date;
}

export interface CalendarProps {
  /**
   * Selection mode.
   * @default "single"
   */
  mode?: CalendarMode;

  /**
   * The currently selected date (single mode).
   */
  selected?: Date | null;

  /**
   * The currently selected range (range mode).
   */
  selectedRange?: DateRange | null;

  /**
   * Callback for single-date selection.
   */
  onSelect?: (date: Date) => void;

  /**
   * Callback for range selection.
   */
  onSelectRange?: (range: DateRange) => void;

  /**
   * The month/year to display initially.
   * @default current month
   */
  defaultMonth?: Date;

  /**
   * Controlled displayed month.
   */
  month?: Date;

  /**
   * Called when the displayed month changes.
   */
  onMonthChange?: (month: Date) => void;

  /**
   * A function that returns `true` for dates that should be disabled.
   */
  disabledDate?: (date: Date) => boolean;

  /**
   * Array of individually disabled dates.
   */
  disabledDates?: Date[];

  /**
   * Minimum selectable date.
   */
  minDate?: Date;

  /**
   * Maximum selectable date.
   */
  maxDate?: Date;

  /**
   * Show the week number column.
   * @default false
   */
  showWeekNumbers?: boolean;

  /** Additional CSS classes. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Navigation Icon (Internal)
// ---------------------------------------------------------------------------

function ChevronLeft({ className }: { className?: string }) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Calendar — a month/year grid with single or range selection.
 *
 * @example
 * // Uncontrolled single selection
 * <Calendar onSelect={(date) => console.log(date)} />
 *
 * // Controlled with disabled dates
 * <Calendar
 *   selected={date}
 *   onSelect={setDate}
 *   disabledDate={(d) => d < new Date()}
 * />
 *
 * // Range mode
 * <Calendar
 *   mode="range"
 *   selectedRange={range}
 *   onSelectRange={setRange}
 * />
 */
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  function Calendar(
    {
      mode = "single",
      selected,
      selectedRange,
      onSelect,
      onSelectRange,
      defaultMonth,
      month: controlledMonth,
      onMonthChange,
      disabledDate,
      disabledDates = [],
      minDate,
      maxDate,
      showWeekNumbers = false,
      className,
      ...rest
    },
    ref,
  ) {
    const shouldReduce = useReducedMotion();
    const id = useId();

    // ----- Month state -----
    const [internalMonth, setInternalMonth] = useState<Date>(() =>
      startOfMonth(defaultMonth ?? controlledMonth ?? new Date()),
    );
    const currentMonth = controlledMonth
      ? startOfMonth(controlledMonth)
      : internalMonth;

    // Track direction for slide animation
    const [direction, setDirection] = useState<"forward" | "backward">(
      "forward",
    );
    const monthKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;

    // ----- Range selection state -----
    const [rangeAnchor, setRangeAnchor] = useState<Date | null>(null);
    const [hoverDate, setHoverDate] = useState<Date | null>(null);

    const navigateMonth = useCallback(
      (delta: number) => {
        setDirection(delta > 0 ? "forward" : "backward");
        const next = addMonths(currentMonth, delta);
        if (controlledMonth) {
          onMonthChange?.(next);
        } else {
          setInternalMonth(next);
          onMonthChange?.(next);
        }
      },
      [currentMonth, controlledMonth, onMonthChange],
    );

    // ----- Date state helpers -----
    const isDisabled = useCallback(
      (date: Date): boolean => {
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;
        if (disabledDate?.(date)) return true;
        if (disabledDates.some((d) => isSameDay(d, date))) return true;
        return false;
      },
      [minDate, maxDate, disabledDate, disabledDates],
    );

    // ----- Range helpers -----
    const getEffectiveRange = useCallback((): DateRange | null => {
      if (mode !== "range") return null;
      if (selectedRange) return selectedRange;
      if (rangeAnchor && hoverDate) {
        const from = rangeAnchor <= hoverDate ? rangeAnchor : hoverDate;
        const to = rangeAnchor <= hoverDate ? hoverDate : rangeAnchor;
        return { from, to };
      }
      return null;
    }, [mode, selectedRange, rangeAnchor, hoverDate]);

    const getDayState = useCallback(
      (
        date: Date | null,
      ):
        | "default"
        | "today"
        | "selected"
        | "rangeStart"
        | "rangeEnd"
        | "rangeMiddle"
        | "outsideMonth"
        | "disabled" => {
        if (!date) return "default";
        if (isDisabled(date)) return "disabled";
        if (!isSameMonth(date, currentMonth)) return "outsideMonth";

        if (mode === "single" && selected && isSameDay(date, selected)) {
          return "selected";
        }

        if (mode === "range") {
          const range = getEffectiveRange();
          if (range) {
            if (isSameDay(date, range.from)) return "rangeStart";
            if (range.to && isSameDay(date, range.to)) return "rangeEnd";
            if (range.to && date > range.from && date < range.to) {
              return "rangeMiddle";
            }
          }
        }

        if (isSameDay(date, new Date())) return "today";
        return "default";
      },
      [mode, selected, currentMonth, isDisabled, getEffectiveRange],
    );

    // ----- Click handler -----
    const handleDayClick = useCallback(
      (date: Date) => {
        if (isDisabled(date)) return;

        if (mode === "single") {
          onSelect?.(date);
        } else {
          // Range mode: first click sets anchor, second click completes range
          if (!rangeAnchor) {
            setRangeAnchor(date);
          } else {
            const from = rangeAnchor <= date ? rangeAnchor : date;
            const to = rangeAnchor <= date ? date : rangeAnchor;
            onSelectRange?.({ from, to });
            setRangeAnchor(null);
            setHoverDate(null);
          }
        }
      },
      [mode, rangeAnchor, isDisabled, onSelect, onSelectRange],
    );

    // ----- Keyboard navigation -----
    const focusedDateRef = useRef<Date>(
      selected ?? selectedRange?.from ?? new Date(),
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        const focused = focusedDateRef.current;
        let next: Date | null = null;

        switch (e.key) {
          case "ArrowRight":
            next = new Date(focused.getTime() + 86400000);
            break;
          case "ArrowLeft":
            next = new Date(focused.getTime() - 86400000);
            break;
          case "ArrowDown":
            next = new Date(focused.getTime() + 7 * 86400000);
            break;
          case "ArrowUp":
            next = new Date(focused.getTime() - 7 * 86400000);
            break;
          case "Home":
            next = startOfMonth(focused);
            break;
          case "End":
            next = endOfMonth(focused);
            break;
          case "PageUp":
            next = addMonths(focused, -1);
            break;
          case "PageDown":
            next = addMonths(focused, 1);
            break;
          default:
            return;
        }

        if (next) {
          e.preventDefault();
          focusedDateRef.current = next;
          if (!isSameMonth(next, currentMonth)) {
            navigateMonth(next > currentMonth ? 1 : -1);
          }
          // Focus the button for the next date
          const btn = document.getElementById(
            `${id}-day-${next.toISOString().slice(0, 10)}`,
          );
          btn?.focus();
        }
      },
      [currentMonth, navigateMonth, id],
    );

    // ----- Grid -----
    const weeks = buildCalendarGrid(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
    );

    // Week number utility
    function getWeekNumber(date: Date): number {
      const d = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
      );
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      return Math.ceil(
        ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
      );
    }

    // Motion variants for month crossfade
    const motionVariants = {
      initial: shouldReduce
        ? { opacity: 0 }
        : { opacity: 0, x: direction === "forward" ? 20 : -20 },
      animate: { opacity: 1, x: 0 },
      exit: shouldReduce
        ? { opacity: 0 }
        : { opacity: 0, x: direction === "forward" ? -20 : 20 },
    };

    return (
      <div
        ref={ref}
        role="application"
        className={cn(
          "inline-flex flex-col gap-3 p-3 rounded-lg border border-border bg-background select-none",
          className,
        )}
        data-ds=""
        data-ds-component="calendar"
        data-ds-mode={mode}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {/* Header — month/year + navigation */}
        <div className="flex items-center justify-between gap-2 px-1">
          <button
            type="button"
            onClick={() => navigateMonth(-1)}
            className={cn(
              "inline-flex items-center justify-center size-7 rounded-md",
              "text-muted-foreground hover:text-foreground hover:bg-accent",
              "transition-colors duration-fast",
              focusRingClasses,
            )}
            aria-label="Previous month"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex-1 text-center text-sm font-semibold leading-none">
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </div>

          <button
            type="button"
            onClick={() => navigateMonth(1)}
            className={cn(
              "inline-flex items-center justify-center size-7 rounded-md",
              "text-muted-foreground hover:text-foreground hover:bg-accent",
              "transition-colors duration-fast",
              focusRingClasses,
            )}
            aria-label="Next month"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Calendar grid with month crossfade */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={monthKey}
              variants={motionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
              data-ds-animated=""
            >
              {/* Day-of-week header */}
              <div
                role="row"
                className={cn(
                  "grid gap-1 mb-1",
                  showWeekNumbers ? "grid-cols-8" : "grid-cols-7",
                )}
              >
                {showWeekNumbers && (
                  <div
                    className="w-9 h-8 flex items-center justify-center text-xs text-muted-foreground font-medium"
                    aria-hidden="true"
                  >
                    W
                  </div>
                )}
                {DAYS_OF_WEEK.map((day) => (
                  <div
                    key={day}
                    role="columnheader"
                    aria-label={day}
                    className="w-9 h-8 flex items-center justify-center text-xs text-muted-foreground font-medium"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Weeks */}
              <div
                role="grid"
                aria-label={`${MONTHS[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`}
              >
                {weeks.map((week, weekIdx) => (
                  <div
                    key={
                      week
                        .find((d) => d !== null)
                        ?.toISOString()
                        .slice(0, 10) ?? `week-${weekIdx}`
                    }
                    role="row"
                    className={cn(
                      "grid gap-1",
                      showWeekNumbers ? "grid-cols-8" : "grid-cols-7",
                    )}
                  >
                    {showWeekNumbers && (
                      <div className="w-9 h-9 flex items-center justify-center text-xs text-muted-foreground/60">
                        {week[0] ? getWeekNumber(week[0]) : ""}
                      </div>
                    )}
                    {week.map((date, dayIdx) => {
                      if (!date) {
                        return (
                          <div
                            key={`empty-${weekIdx}-${dayIdx}`}
                            role="gridcell"
                            aria-hidden="true"
                            className="w-9 h-9"
                          />
                        );
                      }

                      const dayState = getDayState(date);
                      const disabled = dayState === "disabled";
                      const dateStr = date.toISOString().slice(0, 10);
                      const isSelected =
                        dayState === "selected" ||
                        dayState === "rangeStart" ||
                        dayState === "rangeEnd";

                      return (
                        <div
                          key={dateStr}
                          role="gridcell"
                          aria-selected={isSelected ? "true" : undefined}
                          aria-disabled={disabled ? "true" : undefined}
                        >
                          <motion.button
                            id={`${id}-day-${dateStr}`}
                            type="button"
                            className={cn(
                              calendarDayVariants({ state: dayState }),
                            )}
                            onClick={() => handleDayClick(date)}
                            onMouseEnter={() =>
                              mode === "range" &&
                              rangeAnchor &&
                              setHoverDate(date)
                            }
                            onMouseLeave={() =>
                              mode === "range" &&
                              rangeAnchor &&
                              setHoverDate(null)
                            }
                            disabled={disabled}
                            aria-label={date.toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                            tabIndex={
                              isSameDay(date, focusedDateRef.current ?? date)
                                ? 0
                                : -1
                            }
                            whileHover={
                              !disabled && !shouldReduce
                                ? {
                                    scale: 1.08,
                                    transition: {
                                      type: "spring",
                                      stiffness: 400,
                                      damping: 25,
                                    },
                                  }
                                : undefined
                            }
                            whileTap={
                              !disabled && !shouldReduce
                                ? {
                                    scale: 0.95,
                                    transition: {
                                      type: "spring",
                                      stiffness: 500,
                                      damping: 30,
                                    },
                                  }
                                : undefined
                            }
                          >
                            {date.getDate()}
                          </motion.button>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  },
);

Calendar.displayName = "Calendar";
