import * as react from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';

declare const calendarDayVariants: (props?: ({
    state?: "disabled" | "default" | "selected" | "today" | "rangeStart" | "rangeEnd" | "rangeMiddle" | "outsideMonth" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type CalendarMode = "single" | "range";
interface DateRange {
    from: Date;
    to?: Date;
}
interface CalendarProps {
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
declare const Calendar: react.ForwardRefExoticComponent<CalendarProps & react.RefAttributes<HTMLDivElement>>;

export { Calendar, type CalendarMode, type CalendarProps, type DateRange, calendarDayVariants };
