"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState
} from "react";
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
  "December"
];
function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isSameMonth(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}
function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function addMonths(date, delta) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + delta);
  return d;
}
function _clampToMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) {
    cells.push(new Date(year, month, d));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}
const calendarDayVariants = cva(
  [
    "relative w-9 h-9 p-0 rounded-md",
    "inline-flex items-center justify-center",
    "text-sm font-normal leading-none",
    "transition-colors duration-fast",
    "cursor-pointer select-none",
    focusRingClasses,
    "disabled:pointer-events-none disabled:opacity-30 disabled:cursor-not-allowed"
  ],
  {
    variants: {
      state: {
        default: "text-foreground hover:bg-accent hover:text-accent-foreground",
        today: "font-semibold text-primary ring-1 ring-primary hover:bg-primary/10",
        selected: "bg-primary text-primary-foreground hover:bg-primary-hover font-medium",
        rangeStart: "bg-primary text-primary-foreground rounded-r-none hover:bg-primary-hover",
        rangeEnd: "bg-primary text-primary-foreground rounded-l-none hover:bg-primary-hover",
        rangeMiddle: "bg-primary/15 text-foreground rounded-none hover:bg-primary/25",
        outsideMonth: "text-muted-foreground opacity-50",
        disabled: ""
      }
    },
    defaultVariants: {
      state: "default"
    }
  }
);
function ChevronLeft({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "m15 18-6-6 6-6" })
    }
  );
}
function ChevronRight({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "m9 18 6-6-6-6" })
    }
  );
}
const Calendar = forwardRef(
  function Calendar2({
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
  }, ref) {
    const shouldReduce = useReducedMotion();
    const id = useId();
    const [internalMonth, setInternalMonth] = useState(
      () => startOfMonth(defaultMonth ?? controlledMonth ?? /* @__PURE__ */ new Date())
    );
    const currentMonth = controlledMonth ? startOfMonth(controlledMonth) : internalMonth;
    const [direction, setDirection] = useState(
      "forward"
    );
    const monthKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;
    const [rangeAnchor, setRangeAnchor] = useState(null);
    const [hoverDate, setHoverDate] = useState(null);
    const navigateMonth = useCallback(
      (delta) => {
        setDirection(delta > 0 ? "forward" : "backward");
        const next = addMonths(currentMonth, delta);
        if (controlledMonth) {
          onMonthChange?.(next);
        } else {
          setInternalMonth(next);
          onMonthChange?.(next);
        }
      },
      [currentMonth, controlledMonth, onMonthChange]
    );
    const isDisabled = useCallback(
      (date) => {
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;
        if (disabledDate?.(date)) return true;
        if (disabledDates.some((d) => isSameDay(d, date))) return true;
        return false;
      },
      [minDate, maxDate, disabledDate, disabledDates]
    );
    const getEffectiveRange = useCallback(() => {
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
      (date) => {
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
        if (isSameDay(date, /* @__PURE__ */ new Date())) return "today";
        return "default";
      },
      [mode, selected, currentMonth, isDisabled, getEffectiveRange]
    );
    const handleDayClick = useCallback(
      (date) => {
        if (isDisabled(date)) return;
        if (mode === "single") {
          onSelect?.(date);
        } else {
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
      [mode, rangeAnchor, isDisabled, onSelect, onSelectRange]
    );
    const focusedDateRef = useRef(
      selected ?? selectedRange?.from ?? /* @__PURE__ */ new Date()
    );
    const handleKeyDown = useCallback(
      (e) => {
        const focused = focusedDateRef.current;
        let next = null;
        switch (e.key) {
          case "ArrowRight":
            next = new Date(focused.getTime() + 864e5);
            break;
          case "ArrowLeft":
            next = new Date(focused.getTime() - 864e5);
            break;
          case "ArrowDown":
            next = new Date(focused.getTime() + 7 * 864e5);
            break;
          case "ArrowUp":
            next = new Date(focused.getTime() - 7 * 864e5);
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
          const btn = document.getElementById(
            `${id}-day-${next.toISOString().slice(0, 10)}`
          );
          btn?.focus();
        }
      },
      [currentMonth, navigateMonth, id]
    );
    const weeks = buildCalendarGrid(
      currentMonth.getFullYear(),
      currentMonth.getMonth()
    );
    function getWeekNumber(date) {
      const d = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      return Math.ceil(
        ((d.getTime() - yearStart.getTime()) / 864e5 + 1) / 7
      );
    }
    const motionVariants = {
      initial: shouldReduce ? { opacity: 0 } : { opacity: 0, x: direction === "forward" ? 20 : -20 },
      animate: { opacity: 1, x: 0 },
      exit: shouldReduce ? { opacity: 0 } : { opacity: 0, x: direction === "forward" ? -20 : 20 }
    };
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        role: "application",
        className: cn(
          "inline-flex flex-col gap-3 p-3 rounded-lg border border-border bg-background select-none",
          className
        ),
        "data-ds": "",
        "data-ds-component": "calendar",
        "data-ds-mode": mode,
        onKeyDown: handleKeyDown,
        ...rest,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 px-1", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => navigateMonth(-1),
                className: cn(
                  "inline-flex items-center justify-center size-7 rounded-md",
                  "text-muted-foreground hover:text-foreground hover:bg-accent",
                  "transition-colors duration-fast",
                  focusRingClasses
                ),
                "aria-label": "Previous month",
                children: /* @__PURE__ */ jsx(ChevronLeft, { className: "size-4" })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center text-sm font-semibold leading-none", children: [
              MONTHS[currentMonth.getMonth()],
              " ",
              currentMonth.getFullYear()
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => navigateMonth(1),
                className: cn(
                  "inline-flex items-center justify-center size-7 rounded-md",
                  "text-muted-foreground hover:text-foreground hover:bg-accent",
                  "transition-colors duration-fast",
                  focusRingClasses
                ),
                "aria-label": "Next month",
                children: /* @__PURE__ */ jsx(ChevronRight, { className: "size-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", initial: false, children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              variants: motionVariants,
              initial: "initial",
              animate: "animate",
              exit: "exit",
              transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
              "data-ds-animated": "",
              children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    role: "row",
                    className: cn(
                      "grid gap-1 mb-1",
                      showWeekNumbers ? "grid-cols-8" : "grid-cols-7"
                    ),
                    children: [
                      showWeekNumbers && /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "w-9 h-8 flex items-center justify-center text-xs text-muted-foreground font-medium",
                          "aria-hidden": "true",
                          children: "W"
                        }
                      ),
                      DAYS_OF_WEEK.map((day) => /* @__PURE__ */ jsx(
                        "div",
                        {
                          role: "columnheader",
                          "aria-label": day,
                          className: "w-9 h-8 flex items-center justify-center text-xs text-muted-foreground font-medium",
                          children: day
                        },
                        day
                      ))
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    role: "grid",
                    "aria-label": `${MONTHS[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`,
                    children: weeks.map((week, weekIdx) => /* @__PURE__ */ jsxs(
                      "div",
                      {
                        role: "row",
                        className: cn(
                          "grid gap-1",
                          showWeekNumbers ? "grid-cols-8" : "grid-cols-7"
                        ),
                        children: [
                          showWeekNumbers && /* @__PURE__ */ jsx("div", { className: "w-9 h-9 flex items-center justify-center text-xs text-muted-foreground/60", children: week[0] ? getWeekNumber(week[0]) : "" }),
                          week.map((date, dayIdx) => {
                            if (!date) {
                              return /* @__PURE__ */ jsx(
                                "div",
                                {
                                  role: "gridcell",
                                  "aria-hidden": "true",
                                  className: "w-9 h-9"
                                },
                                `empty-${weekIdx}-${dayIdx}`
                              );
                            }
                            const dayState = getDayState(date);
                            const disabled = dayState === "disabled";
                            const dateStr = date.toISOString().slice(0, 10);
                            const isSelected = dayState === "selected" || dayState === "rangeStart" || dayState === "rangeEnd";
                            return /* @__PURE__ */ jsx(
                              "div",
                              {
                                role: "gridcell",
                                "aria-selected": isSelected ? "true" : void 0,
                                "aria-disabled": disabled ? "true" : void 0,
                                children: /* @__PURE__ */ jsx(
                                  motion.button,
                                  {
                                    id: `${id}-day-${dateStr}`,
                                    type: "button",
                                    className: cn(
                                      calendarDayVariants({ state: dayState })
                                    ),
                                    onClick: () => handleDayClick(date),
                                    onMouseEnter: () => mode === "range" && rangeAnchor && setHoverDate(date),
                                    onMouseLeave: () => mode === "range" && rangeAnchor && setHoverDate(null),
                                    disabled,
                                    "aria-label": date.toLocaleDateString("en-US", {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric"
                                    }),
                                    tabIndex: isSameDay(date, focusedDateRef.current ?? date) ? 0 : -1,
                                    whileHover: !disabled && !shouldReduce ? {
                                      scale: 1.08,
                                      transition: {
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25
                                      }
                                    } : void 0,
                                    whileTap: !disabled && !shouldReduce ? {
                                      scale: 0.95,
                                      transition: {
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30
                                      }
                                    } : void 0,
                                    children: date.getDate()
                                  }
                                )
                              },
                              dateStr
                            );
                          })
                        ]
                      },
                      week.find((d) => d !== null)?.toISOString().slice(0, 10) ?? `week-${weekIdx}`
                    ))
                  }
                )
              ]
            },
            monthKey
          ) }) })
        ]
      }
    );
  }
);
Calendar.displayName = "Calendar";
export {
  Calendar,
  calendarDayVariants
};
