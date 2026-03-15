import * as react from 'react';
import { ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';

declare const inputVariants: (props?: ({
    variant?: "success" | "default" | "error" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type InputVariant = "default" | "error" | "success";
type InputSize = "sm" | "md" | "lg";
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof inputVariants> {
    /**
     * Visual variant of the input.
     * @default "default"
     */
    variant?: InputVariant;
    /**
     * Size of the input.
     * @default "md"
     */
    size?: InputSize;
    /**
     * Icon to display on the left side of the input.
     * Typically a Lucide icon component rendered at the appropriate size.
     */
    iconLeft?: ReactNode;
    /**
     * Icon to display on the right side of the input.
     * If `clearable` is true and there is a value, the clear button
     * takes precedence over `iconRight`.
     */
    iconRight?: ReactNode;
    /**
     * Whether to show a clear button when the input has a value.
     * @default false
     */
    clearable?: boolean;
    /**
     * Callback fired when the clear button is clicked.
     * If not provided, the input will dispatch a native change event
     * with an empty string value.
     */
    onClear?: () => void;
    /**
     * Additional CSS classes for the outer wrapper element.
     * Use this when you need to control the width/margin of the input group.
     */
    wrapperClassName?: string;
    /** Additional CSS classes to merge on the input element. */
    className?: string;
}
/**
 * Input — a text input for capturing user data.
 *
 * Built on the design system's token layer with CVA for variant composition.
 * All colors, radii, spacing, and transitions come from CSS custom properties
 * defined in design-system.css.
 *
 * Accessibility:
 *   - Focus ring visible on keyboard navigation (focus-visible)
 *   - Disabled state uses both `disabled` attribute and `aria-disabled`
 *   - Error variant sets `aria-invalid="true"` automatically
 *   - Supports `aria-describedby` for linking to error/helper messages
 *   - Clear button has `aria-label` and is excluded from tab order
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Input placeholder="Enter your name" />
 *
 * // With variant
 * <Input variant="error" aria-describedby="email-error" />
 *
 * // With icons
 * <Input iconLeft={<SearchIcon />} placeholder="Search..." />
 * <Input iconRight={<MailIcon />} placeholder="Email" />
 *
 * // Clearable
 * <Input
 *   clearable
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 *   onClear={() => setValue("")}
 * />
 *
 * // Sizes
 * <Input size="sm" placeholder="Small" />
 * <Input size="md" placeholder="Medium" />
 * <Input size="lg" placeholder="Large" />
 *
 * // Disabled / Read-only
 * <Input disabled placeholder="Disabled" />
 * <Input readOnly value="Read-only value" />
 * ```
 */
declare const Input: react.ForwardRefExoticComponent<InputProps & react.RefAttributes<HTMLInputElement>>;

export { Input, type InputProps, type InputSize, type InputVariant, inputVariants };
