import * as react from 'react';
import { ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';

declare const spinnerVariants: (props?: ({
    size?: "sm" | "md" | "xs" | "lg" | null | undefined;
    variant?: "default" | "primary" | "secondary" | "muted" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SpinnerSize = "xs" | "sm" | "md" | "lg";
type SpinnerVariant = "default" | "primary" | "secondary" | "muted";
interface SpinnerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">, VariantProps<typeof spinnerVariants> {
    /**
     * Size of the spinner.
     * @default "md"
     */
    size?: SpinnerSize;
    /**
     * Color variant of the spinner.
     * @default "default"
     */
    variant?: SpinnerVariant;
    /**
     * Optional label text displayed alongside the spinner.
     * Provides visible context for the loading state.
     */
    label?: ReactNode;
    /**
     * Position of the label relative to the spinner.
     * @default "right"
     */
    labelPosition?: "right" | "bottom";
    /**
     * Accessible label for screen readers.
     * If `label` is a string, it will be used as the default.
     * @default "Loading"
     */
    "aria-label"?: string;
    /**
     * Thickness of the spinner stroke.
     * @default "2"
     */
    strokeWidth?: number;
    /** Additional CSS classes to merge on the root element. */
    className?: string;
}
/**
 * Spinner — an animated loading indicator.
 *
 * Built on the design system's token layer with CVA for variant composition.
 * Uses Framer Motion for smooth, GPU-accelerated rotation with automatic
 * reduced-motion support (falls back to CSS `animate-spin`).
 *
 * The spinner renders as a circular arc (3/4 circle) that rotates
 * continuously. A faded track circle provides visual context for the
 * rotation path.
 *
 * Accessibility:
 *   - Uses `role="status"` for live region semantics
 *   - Includes screen-reader-only text via `aria-label`
 *   - SVG elements are decorative (`aria-hidden`)
 *   - Respects `prefers-reduced-motion` — uses CSS fallback
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Spinner />
 *
 * // Sizes
 * <Spinner size="xs" />
 * <Spinner size="sm" />
 * <Spinner size="md" />
 * <Spinner size="lg" />
 *
 * // Variants
 * <Spinner variant="primary" />
 * <Spinner variant="secondary" />
 * <Spinner variant="muted" />
 *
 * // With label (inline)
 * <Spinner label="Loading…" />
 *
 * // With label (stacked)
 * <Spinner label="Loading data…" labelPosition="bottom" />
 *
 * // Inside a button
 * <Button disabled>
 *   <Spinner size="xs" variant="default" />
 *   Saving…
 * </Button>
 *
 * // Custom aria-label
 * <Spinner aria-label="Fetching results" />
 *
 * // Custom stroke width
 * <Spinner size="lg" strokeWidth={3} />
 * ```
 */
declare const Spinner: react.ForwardRefExoticComponent<SpinnerProps & react.RefAttributes<HTMLDivElement>>;

export { Spinner, type SpinnerProps, type SpinnerSize, type SpinnerVariant, spinnerVariants };
