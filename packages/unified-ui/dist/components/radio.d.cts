import * as react from 'react';
import { ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import { RadioGroup as RadioGroup$1 } from 'radix-ui';

declare const radioGroupVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const radioIndicatorVariants: (props?: ({
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const radioCardVariants: (props?: ({
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type RadioSize = "sm" | "md";
type RadioOrientation = "vertical" | "horizontal";
interface RadioGroupProps extends Omit<RadioGroup$1.RadioGroupProps, "orientation" | "asChild">, VariantProps<typeof radioGroupVariants> {
    /**
     * Layout direction of the radio group.
     * @default "vertical"
     */
    orientation?: RadioOrientation;
    /**
     * Size of all radio items in the group.
     * @default "md"
     */
    size?: RadioSize;
    /** Additional CSS classes to merge on the root element. */
    className?: string;
    /** The radio group items. */
    children?: ReactNode;
}
interface RadioGroupItemProps extends Omit<RadioGroup$1.RadioGroupItemProps, "asChild"> {
    /**
     * The value of this radio item.
     */
    value: string;
    /**
     * Label text displayed next to the radio indicator.
     */
    label?: ReactNode;
    /**
     * Optional description displayed below the label.
     */
    description?: ReactNode;
    /**
     * Override the group-level size for this specific item.
     */
    size?: RadioSize;
    /** Additional CSS classes to merge on the wrapper element. */
    className?: string;
}
interface RadioCardProps extends Omit<RadioGroup$1.RadioGroupItemProps, "asChild"> {
    /**
     * The value of this radio card.
     */
    value: string;
    /**
     * Label text for the card.
     */
    label?: ReactNode;
    /**
     * Description text displayed below the label.
     */
    description?: ReactNode;
    /**
     * Override the group-level size for this specific card.
     */
    size?: RadioSize;
    /** Additional CSS classes to merge on the card wrapper. */
    className?: string;
    /** Additional content to render inside the card. */
    children?: ReactNode;
}
/**
 * RadioGroup — a group of radio buttons for selecting a single value.
 *
 * Built on Radix UI's RadioGroup primitive for full keyboard navigation
 * and ARIA compliance. All colors, radii, and transitions come from CSS
 * custom properties defined in design-system.css.
 *
 * Accessibility:
 *   - Radix UI provides `role="radiogroup"` and manages `aria-checked`
 *   - Arrow key navigation between items
 *   - Supports `aria-label` and `aria-labelledby`
 *   - Disabled state propagated to all children
 *
 * @example
 * ```tsx
 * <RadioGroup value={value} onValueChange={setValue}>
 *   <RadioGroupItem value="option-1" label="Option 1" />
 *   <RadioGroupItem value="option-2" label="Option 2" />
 *   <RadioGroupItem value="option-3" label="Option 3" disabled />
 * </RadioGroup>
 *
 * // Horizontal layout
 * <RadioGroup orientation="horizontal" size="sm">
 *   <RadioGroupItem value="a" label="A" />
 *   <RadioGroupItem value="b" label="B" />
 * </RadioGroup>
 * ```
 */
declare const RadioGroup: react.ForwardRefExoticComponent<RadioGroupProps & react.RefAttributes<HTMLDivElement>>;
/**
 * RadioGroupItem — a single radio button with optional label and description.
 *
 * Must be used as a child of `RadioGroup`.
 *
 * @example
 * ```tsx
 * <RadioGroupItem value="newsletter" label="Subscribe to newsletter" />
 * <RadioGroupItem
 *   value="updates"
 *   label="Product updates"
 *   description="Get notified about new features and improvements"
 * />
 * ```
 */
declare const RadioGroupItem: react.ForwardRefExoticComponent<RadioGroupItemProps & react.RefAttributes<HTMLButtonElement>>;
/**
 * RadioCard — a card-style radio button where the entire card is clickable.
 *
 * Must be used as a child of `RadioGroup`. Provides a richer visual
 * treatment for radio options, useful for plan selectors, theme pickers, etc.
 *
 * @example
 * ```tsx
 * <RadioGroup value={plan} onValueChange={setPlan}>
 *   <RadioCard
 *     value="free"
 *     label="Free Plan"
 *     description="Basic features, limited storage"
 *   />
 *   <RadioCard
 *     value="pro"
 *     label="Pro Plan"
 *     description="All features, unlimited storage"
 *   />
 * </RadioGroup>
 * ```
 */
declare const RadioCard: react.ForwardRefExoticComponent<RadioCardProps & react.RefAttributes<HTMLButtonElement>>;

export { RadioCard, type RadioCardProps, RadioGroup, RadioGroupItem, type RadioGroupItemProps, type RadioGroupProps, type RadioOrientation, type RadioSize, radioCardVariants, radioGroupVariants, radioIndicatorVariants };
