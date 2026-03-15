import * as react from 'react';
import { ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import { Toggle as Toggle$1 } from 'radix-ui';

declare const toggleVariants: (props?: ({
    variant?: "outline" | "default" | "ghost" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ToggleVariant = "default" | "outline" | "ghost";
type ToggleSize = "sm" | "md" | "lg";
interface ToggleProps extends Omit<React.ComponentPropsWithoutRef<typeof Toggle$1.Root>, "asChild">, VariantProps<typeof toggleVariants> {
    /**
     * Visual variant of the toggle.
     * @default "default"
     */
    variant?: ToggleVariant;
    /**
     * Size of the toggle.
     * @default "md"
     */
    size?: ToggleSize;
    /**
     * Icon to display before the toggle label.
     */
    iconLeft?: ReactNode;
    /**
     * Icon to display after the toggle label.
     */
    iconRight?: ReactNode;
    /** Content to render inside the toggle. */
    children?: ReactNode;
    /** Additional CSS classes to merge. */
    className?: string;
}
/**
 * Toggle — a pressable on/off button for binary states.
 *
 * Built on Radix UI's Toggle primitive for accessibility and the design
 * system's token layer for styling. Use for toolbar actions (bold, italic),
 * view mode switches, mute/unmute, and other binary toggleable actions.
 *
 * Distinct from Switch: Toggle looks and behaves like a button that stays
 * pressed. Switch looks like a sliding track and is better for settings/preferences.
 *
 * Accessibility:
 *   - Radix handles `aria-pressed` state management
 *   - Focus ring visible on keyboard navigation (focus-visible)
 *   - Disabled state uses both `disabled` attribute and `data-disabled`
 *   - Keyboard toggle via Space and Enter keys (Radix)
 *   - When used as icon-only, provide `aria-label`
 *
 * @example
 * ```tsx
 * // Icon-only toggle (must have aria-label)
 * <Toggle aria-label="Toggle bold">
 *   <BoldIcon className="size-4" />
 * </Toggle>
 *
 * // With text label
 * <Toggle variant="outline">
 *   <BoldIcon className="size-4" />
 *   Bold
 * </Toggle>
 *
 * // Controlled
 * <Toggle
 *   pressed={isMuted}
 *   onPressedChange={setIsMuted}
 *   aria-label="Toggle mute"
 * >
 *   {isMuted ? <VolumeOffIcon /> : <VolumeIcon />}
 * </Toggle>
 *
 * // Sizes
 * <Toggle size="sm" aria-label="Small toggle">
 *   <StarIcon className="size-3.5" />
 * </Toggle>
 * <Toggle size="md" aria-label="Medium toggle">
 *   <StarIcon className="size-4" />
 * </Toggle>
 * <Toggle size="lg" aria-label="Large toggle">
 *   <StarIcon className="size-4" />
 * </Toggle>
 *
 * // Disabled
 * <Toggle disabled aria-label="Disabled toggle">
 *   <LockIcon className="size-4" />
 * </Toggle>
 *
 * // Ghost variant
 * <Toggle variant="ghost" aria-label="Bookmark">
 *   <BookmarkIcon className="size-4" />
 * </Toggle>
 * ```
 */
declare const Toggle: react.ForwardRefExoticComponent<ToggleProps & react.RefAttributes<HTMLButtonElement>>;

export { Toggle, type ToggleProps, type ToggleSize, type ToggleVariant, toggleVariants };
