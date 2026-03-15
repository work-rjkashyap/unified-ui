import * as react from 'react';
import { ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import { Switch as Switch$1 } from 'radix-ui';

declare const switchTrackVariants: (props?: ({
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const switchThumbVariants: (props?: ({
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SwitchSize = "sm" | "md";
type SwitchLabelPosition = "left" | "right";
interface SwitchProps extends Omit<React.ComponentPropsWithoutRef<typeof Switch$1.Root>, "asChild">, VariantProps<typeof switchTrackVariants> {
    /**
     * Size of the switch.
     * @default "md"
     */
    size?: SwitchSize;
    /**
     * Text label for the switch.
     */
    label?: ReactNode;
    /**
     * Description text displayed below the label.
     */
    description?: ReactNode;
    /**
     * Position of the label relative to the switch.
     * @default "right"
     */
    labelPosition?: SwitchLabelPosition;
    /**
     * Additional CSS classes for the outer wrapper element.
     */
    wrapperClassName?: string;
    /**
     * Additional CSS classes for the label element.
     */
    labelClassName?: string;
    /**
     * Additional CSS classes for the description element.
     */
    descriptionClassName?: string;
    /** Additional CSS classes to merge on the switch track element. */
    className?: string;
}
/**
 * Switch — a toggle control for binary on/off states.
 *
 * Built on Radix UI's Switch primitive for accessibility and the design
 * system's token layer for styling. The thumb uses a Framer Motion spring
 * animation for a tactile, snappy feel.
 *
 * Accessibility:
 *   - Radix handles `role="switch"`, `aria-checked`, keyboard toggle (Space)
 *   - Focus ring visible on keyboard navigation (focus-visible)
 *   - Disabled state uses both `disabled` attribute and `aria-disabled`
 *   - Label is associated via `htmlFor` / `id` linkage
 *   - Description linked via `aria-describedby`
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Switch label="Dark mode" />
 *
 * // Controlled
 * <Switch
 *   checked={enabled}
 *   onCheckedChange={setEnabled}
 *   label="Notifications"
 * />
 *
 * // Small with left label
 * <Switch size="sm" label="Auto-save" labelPosition="left" />
 *
 * // With description
 * <Switch
 *   label="Marketing emails"
 *   description="Receive emails about new features and updates"
 * />
 *
 * // Disabled
 * <Switch disabled label="Feature locked" />
 * ```
 */
declare const Switch: react.ForwardRefExoticComponent<SwitchProps & react.RefAttributes<HTMLButtonElement>>;

export { Switch, type SwitchLabelPosition, type SwitchProps, type SwitchSize, switchThumbVariants, switchTrackVariants };
