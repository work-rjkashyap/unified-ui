import * as react from 'react';
import { ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';

declare const comboboxTriggerVariants: (props?: ({
    variant?: "default" | "primary" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    open?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ComboboxVariant = "default" | "primary";
type ComboboxSize = "sm" | "md" | "lg";
interface ComboboxOption {
    /**
     * The unique key for this option.
     */
    value: string;
    /**
     * The display label for this option.
     */
    label: string;
    /**
     * Optional description shown below the label.
     */
    description?: string;
    /**
     * Optional leading icon/element for the option.
     */
    icon?: ReactNode;
    /**
     * Whether this option is disabled.
     */
    disabled?: boolean;
    /**
     * Group key — options with the same group are rendered together.
     */
    group?: string;
}
interface ComboboxGroup {
    /** Group label */
    label: string;
    /** Group key — matches option.group */
    value: string;
}
interface ComboboxProps {
    /**
     * The list of options to display.
     */
    options: ComboboxOption[];
    /**
     * Grouped section definitions (optional).
     */
    groups?: ComboboxGroup[];
    /**
     * The currently selected value (single mode, controlled).
     */
    value?: string;
    /**
     * The currently selected values (multi mode, controlled).
     */
    values?: string[];
    /**
     * Default value (single mode, uncontrolled).
     */
    defaultValue?: string;
    /**
     * Default values (multi mode, uncontrolled).
     */
    defaultValues?: string[];
    /**
     * Called when a single value is selected/deselected.
     */
    onSelect?: (value: string | null) => void;
    /**
     * Called when multi-select values change.
     */
    onMultiSelect?: (values: string[]) => void;
    /**
     * Enable multi-select mode.
     * @default false
     */
    multi?: boolean;
    /**
     * Enable search / filter input.
     * @default true
     */
    searchable?: boolean;
    /**
     * Placeholder text on the trigger when nothing is selected.
     * @default "Select..."
     */
    placeholder?: string;
    /**
     * Placeholder text in the search input.
     * @default "Search..."
     */
    searchPlaceholder?: string;
    /**
     * Message shown when no options match the search query.
     * @default "No results found."
     */
    emptyMessage?: string;
    /**
     * Visual variant.
     * @default "default"
     */
    variant?: ComboboxVariant;
    /**
     * Size variant.
     * @default "md"
     */
    size?: ComboboxSize;
    /**
     * Whether the combobox is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether to show a clear button when a value is selected.
     * @default true
     */
    clearable?: boolean;
    /**
     * Max height of the dropdown list (CSS value).
     * @default "240px"
     */
    maxHeight?: string;
    /**
     * Custom filter function. By default does case-insensitive label matching.
     */
    filterOption?: (option: ComboboxOption, query: string) => boolean;
    /**
     * Custom render for option items.
     */
    renderOption?: (option: ComboboxOption, isSelected: boolean) => ReactNode;
    /**
     * Custom render for the trigger value display.
     */
    renderValue?: (selected: ComboboxOption | ComboboxOption[] | null) => ReactNode;
    /**
     * Alignment of the dropdown relative to the trigger.
     * @default "start"
     */
    align?: "start" | "center" | "end";
    /**
     * Whether the dropdown width should match the trigger width.
     * @default true
     */
    matchWidth?: boolean;
    /** Additional CSS classes on the trigger. */
    className?: string;
    /** Additional CSS classes on the dropdown content. */
    contentClassName?: string;
}
/**
 * Combobox — a searchable select with single and multi-select support.
 *
 * @example
 * // Single select
 * <Combobox
 *   options={[
 *     { value: "react", label: "React" },
 *     { value: "vue", label: "Vue" },
 *   ]}
 *   onSelect={(v) => setValue(v)}
 * />
 *
 * // Multi-select
 * <Combobox
 *   multi
 *   options={options}
 *   values={selected}
 *   onMultiSelect={setSelected}
 * />
 *
 * // With groups
 * <Combobox
 *   options={options}
 *   groups={[{ value: "fruits", label: "Fruits" }]}
 * />
 */
declare const Combobox: react.ForwardRefExoticComponent<ComboboxProps & react.RefAttributes<HTMLButtonElement>>;

export { Combobox, type ComboboxGroup, type ComboboxOption, type ComboboxProps, type ComboboxSize, type ComboboxVariant, comboboxTriggerVariants };
