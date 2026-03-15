import * as react from 'react';

interface ColorPickerProps {
    /** Current color value in HEX format (e.g., "#ff0000"). */
    value?: string;
    /** Default color for uncontrolled mode. @default "#000000" */
    defaultValue?: string;
    /** Callback when color changes. */
    onChange?: (color: string) => void;
    /** Preset color swatches to display. */
    presets?: string[];
    /** Whether to show the HEX input field. @default true */
    showInput?: boolean;
    /** Whether the picker is disabled. @default false */
    disabled?: boolean;
    /** Size of the trigger swatch. @default "md" */
    size?: "sm" | "md" | "lg";
    /** Additional CSS classes. */
    className?: string;
    /** Placeholder label for accessibility. @default "Choose color" */
    label?: string;
}
/**
 * `ColorPicker` — a color selection component with spectrum, hue slider,
 * HEX input, and preset swatches.
 *
 * @example
 * ```tsx
 * <ColorPicker value={color} onChange={setColor} />
 * <ColorPicker defaultValue="#3b82f6" presets={["#ef4444", "#22c55e", "#3b82f6"]} />
 * ```
 */
declare const ColorPicker: react.ForwardRefExoticComponent<ColorPickerProps & react.RefAttributes<HTMLDivElement>>;

export { ColorPicker, type ColorPickerProps };
