import * as react from 'react';
import { HTMLAttributes } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';

declare const numberInputVariants: (props?: ({
    variant?: "default" | "primary" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type NumberInputVariant = "default" | "primary";
type NumberInputSize = "sm" | "md" | "lg";
interface NumberInputProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    /**
     * The current value (controlled).
     */
    value?: number;
    /**
     * The initial value (uncontrolled).
     * @default 0
     */
    defaultValue?: number;
    /**
     * Callback when the value changes.
     */
    onChange?: (value: number) => void;
    /**
     * Minimum allowed value.
     */
    min?: number;
    /**
     * Maximum allowed value.
     */
    max?: number;
    /**
     * Step increment/decrement amount.
     * @default 1
     */
    step?: number;
    /**
     * Number of decimal places to display/allow.
     * @default 0
     */
    precision?: number;
    /**
     * Visual variant.
     * @default "default"
     */
    variant?: NumberInputVariant;
    /**
     * Size variant.
     * @default "md"
     */
    size?: NumberInputSize;
    /**
     * Whether the input is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the input is read-only.
     * @default false
     */
    readOnly?: boolean;
    /**
     * Accessible label for the input (required for icon-only usage).
     */
    "aria-label"?: string;
    /**
     * Custom format function for the displayed value.
     */
    formatValue?: (value: number) => string;
    /**
     * Custom parse function for converting input string to number.
     */
    parseValue?: (raw: string) => number;
    /**
     * Accessible label for the increment button.
     * @default "Increment"
     */
    incrementLabel?: string;
    /**
     * Accessible label for the decrement button.
     * @default "Decrement"
     */
    decrementLabel?: string;
    /** Additional CSS classes on the container. */
    className?: string;
}
/**
 * NumberInput — a stepper input for numeric values.
 *
 * @example
 * // Basic
 * <NumberInput defaultValue={0} min={0} max={100} />
 *
 * // Controlled
 * <NumberInput value={qty} onChange={setQty} step={5} min={0} max={50} />
 *
 * // Currency
 * <NumberInput
 *   defaultValue={9.99}
 *   precision={2}
 *   step={0.01}
 *   formatValue={(v) => `$${v.toFixed(2)}`}
 * />
 *
 * // Small / read-only
 * <NumberInput size="sm" readOnly value={42} />
 */
declare const NumberInput: react.ForwardRefExoticComponent<NumberInputProps & react.RefAttributes<HTMLDivElement>>;

export { NumberInput, type NumberInputProps, type NumberInputSize, type NumberInputVariant, numberInputVariants };
