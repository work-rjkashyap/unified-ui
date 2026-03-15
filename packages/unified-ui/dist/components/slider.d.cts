import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { Slider as Slider$1 } from 'radix-ui';

declare const sliderTrackVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const sliderRangeVariants: (props?: ({
    variant?: "success" | "danger" | "default" | "primary" | null | undefined;
    orientation?: "horizontal" | "vertical" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const sliderThumbVariants: (props?: ({
    variant?: "success" | "danger" | "default" | "primary" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SliderVariant = "default" | "primary" | "success" | "danger";
type SliderSize = "sm" | "md" | "lg";
type SliderOrientation = "horizontal" | "vertical";
interface SliderMark {
    value: number;
    label?: ReactNode;
}
interface SliderProps extends Omit<ComponentPropsWithoutRef<typeof Slider$1.Root>, "orientation"> {
    /**
     * Visual variant of the slider range and thumb.
     * @default "default"
     */
    variant?: SliderVariant;
    /**
     * Size of the slider track and thumb.
     * @default "md"
     */
    size?: SliderSize;
    /**
     * Orientation of the slider.
     * @default "horizontal"
     */
    orientation?: SliderOrientation;
    /**
     * Whether to show step marks along the track.
     * @default false
     */
    showMarks?: boolean;
    /**
     * Custom marks to render along the track.
     * When provided, overrides auto-generated step marks.
     */
    marks?: SliderMark[];
    /**
     * Whether to show a value tooltip above/beside the thumb on hover/drag.
     * @default false
     */
    showTooltip?: boolean;
    /**
     * Format the tooltip value for display.
     * @default (v) => String(v)
     */
    formatTooltip?: (value: number) => string;
    /** Additional CSS classes. */
    className?: string;
}
/**
 * Slider — a range input built on Radix UI's Slider primitive.
 *
 * @example
 * // Single thumb
 * <Slider defaultValue={[50]} />
 *
 * // Range (dual thumb)
 * <Slider defaultValue={[25, 75]} min={0} max={100} />
 *
 * // With marks and tooltip
 * <Slider defaultValue={[50]} step={10} showMarks showTooltip />
 *
 * // Danger variant
 * <Slider variant="danger" defaultValue={[80]} />
 */
declare const Slider: react.ForwardRefExoticComponent<SliderProps & react.RefAttributes<HTMLSpanElement>>;

export { Slider, type SliderMark, type SliderOrientation, type SliderProps, type SliderSize, type SliderVariant, sliderRangeVariants, sliderThumbVariants, sliderTrackVariants };
