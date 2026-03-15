import * as react from 'react';
import { DateRange } from './calendar.js';
import 'class-variance-authority/types';

type DatePickerMode = "single" | "range";
type DatePickerSize = "sm" | "md" | "lg";
interface DatePickerProps {
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
declare const DatePicker: react.ForwardRefExoticComponent<DatePickerProps & react.RefAttributes<HTMLButtonElement>>;

export { DatePicker, type DatePickerMode, type DatePickerProps, type DatePickerSize };
