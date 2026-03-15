import * as react from 'react';
import { ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';

declare const progressTrackVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const progressIndicatorVariants: (props?: ({
    variant?: "info" | "success" | "warning" | "danger" | "default" | "primary" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ProgressVariant = "default" | "primary" | "success" | "danger" | "warning" | "info";
type ProgressSize = "sm" | "md" | "lg";
interface ProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">, VariantProps<typeof progressTrackVariants>, VariantProps<typeof progressIndicatorVariants> {
    /**
     * Current progress value (0–100).
     * Ignored when `indeterminate` is true.
     * @default 0
     */
    value?: number;
    /**
     * Maximum progress value.
     * @default 100
     */
    max?: number;
    /**
     * Minimum progress value.
     * @default 0
     */
    min?: number;
    /**
     * Visual variant of the progress indicator.
     * @default "default"
     */
    variant?: ProgressVariant;
    /**
     * Size of the progress bar.
     * @default "md"
     */
    size?: ProgressSize;
    /**
     * Whether the progress is indeterminate (unknown completion).
     * When true, the bar displays a looping sliding animation
     * and `value` is ignored.
     * @default false
     */
    indeterminate?: boolean;
    /**
     * Whether to display diagonal stripes on the indicator.
     * @default false
     */
    striped?: boolean;
    /**
     * Whether the stripes should animate (slide).
     * Only applies when `striped` is true.
     * @default false
     */
    animated?: boolean;
    /**
     * Whether to display the progress label.
     * Shows the percentage value or custom label above the bar.
     * @default false
     */
    showLabel?: boolean;
    /**
     * Custom label text displayed above or inside the bar.
     * When provided alongside `showLabel`, replaces the default "X%" text.
     */
    label?: ReactNode;
    /**
     * Custom format function for the value label.
     * Receives the current value and max, returns a string.
     * @default (value, max) => `${Math.round((value / max) * 100)}%`
     */
    formatLabel?: (value: number, max: number) => string;
    /**
     * Accessible label for the progress bar.
     * Use when there's no visible label to describe what's loading.
     */
    "aria-label"?: string;
    /**
     * ID of the element that labels the progress bar.
     */
    "aria-labelledby"?: string;
    /** Additional CSS classes for the track (outer container). */
    className?: string;
    /** Additional CSS classes for the indicator (inner fill). */
    indicatorClassName?: string;
}
/**
 * Progress — a linear progress bar for displaying completion or loading state.
 *
 * Built on the design system's token layer with CVA for variant composition.
 * All colors, radii, spacing, and transitions come from CSS custom properties
 * defined in design-system.css.
 *
 * Supports both determinate (with a known value) and indeterminate (unknown
 * completion) modes. Add stripes and animation for visual emphasis.
 *
 * Accessibility:
 *   - Uses `role="progressbar"` with proper ARIA attributes
 *   - `aria-valuenow`, `aria-valuemin`, `aria-valuemax` for determinate mode
 *   - `aria-valuenow` is omitted for indeterminate mode (per WAI-ARIA spec)
 *   - Supports `aria-label` and `aria-labelledby` for screen readers
 *
 * @example
 * ```tsx
 * // Basic determinate progress
 * <Progress value={60} />
 *
 * // With variant and label
 * <Progress value={80} variant="success" showLabel />
 *
 * // Indeterminate (loading)
 * <Progress indeterminate />
 *
 * // Striped with animation
 * <Progress value={45} striped animated />
 *
 * // Large with custom label
 * <Progress value={30} size="lg" showLabel label="Uploading files..." />
 *
 * // Custom format
 * <Progress
 *   value={750}
 *   max={1000}
 *   showLabel
 *   formatLabel={(v, m) => `${v}/${m} MB`}
 * />
 *
 * // Danger variant (e.g. storage warning)
 * <Progress value={92} variant="danger" showLabel />
 * ```
 */
declare const Progress: react.ForwardRefExoticComponent<ProgressProps & react.RefAttributes<HTMLDivElement>>;

export { Progress, type ProgressProps, type ProgressSize, type ProgressVariant, progressIndicatorVariants, progressTrackVariants };
