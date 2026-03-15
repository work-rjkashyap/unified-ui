import * as react from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';

declare const pinCellVariants: (props?: ({
    variant?: "default" | "primary" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    state?: "success" | "error" | "filled" | "active" | "empty" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type PinInputVariant = "default" | "primary";
type PinInputSize = "sm" | "md" | "lg";
type PinInputType = "numeric" | "alphanumeric" | "alphabetic";
interface PinInputProps {
    /**
     * Number of input cells.
     * @default 6
     */
    length?: number;
    /**
     * The current value (controlled). Array of single characters.
     */
    value?: string[];
    /**
     * The initial value (uncontrolled).
     */
    defaultValue?: string[];
    /**
     * Called when any cell changes. Receives the full array of cell values.
     */
    onChange?: (value: string[]) => void;
    /**
     * Called when all cells are filled. Receives the joined PIN string.
     */
    onComplete?: (pin: string) => void;
    /**
     * Called when the user clears all cells (backspace on first cell).
     */
    onClear?: () => void;
    /**
     * Input type / allowed characters.
     * - "numeric"       — digits only (0–9)
     * - "alphanumeric"  — letters and digits
     * - "alphabetic"    — letters only
     * @default "numeric"
     */
    type?: PinInputType;
    /**
     * Visual variant.
     * @default "default"
     */
    variant?: PinInputVariant;
    /**
     * Size variant.
     * @default "md"
     */
    size?: PinInputSize;
    /**
     * Whether to mask input (show • instead of character).
     * @default false
     */
    mask?: boolean;
    /**
     * Whether the input is in an error state (triggers shakeX animation).
     * @default false
     */
    error?: boolean;
    /**
     * Whether the input is in a success state.
     * @default false
     */
    success?: boolean;
    /**
     * Whether the input is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Accessible label for the PIN input group.
     * @default "PIN Input"
     */
    "aria-label"?: string;
    /**
     * Whether to automatically focus the first cell on mount.
     * @default false
     */
    autoFocus?: boolean;
    /**
     * Gap between cells.
     * @default "gap-2"
     */
    gap?: string;
    /** Additional CSS classes on the container. */
    className?: string;
}
/**
 * PinInput — OTP / verification code input with auto-advance.
 *
 * @example
 * // Basic 6-digit OTP
 * <PinInput length={6} onComplete={(pin) => verifyOTP(pin)} />
 *
 * // 4-digit masked PIN
 * <PinInput length={4} mask onComplete={handlePin} />
 *
 * // With error state (triggers shake animation)
 * <PinInput length={6} error value={cells} onChange={setCells} />
 *
 * // Alphanumeric (e.g. invite code)
 * <PinInput length={8} type="alphanumeric" variant="primary" size="lg" />
 */
declare const PinInput: react.ForwardRefExoticComponent<PinInputProps & react.RefAttributes<HTMLDivElement>>;

export { PinInput, type PinInputProps, type PinInputSize, type PinInputType, type PinInputVariant, pinCellVariants };
