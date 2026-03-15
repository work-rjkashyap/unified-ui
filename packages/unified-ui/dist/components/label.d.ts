import * as react from 'react';
import { ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import { Label as Label$1 } from 'radix-ui';

declare const labelVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type LabelSize = "sm" | "md" | "lg";
interface LabelProps extends Omit<React.ComponentPropsWithoutRef<typeof Label$1.Root>, "asChild">, VariantProps<typeof labelVariants> {
    /**
     * Size of the label text.
     * @default "md"
     */
    size?: LabelSize;
    /**
     * Whether the associated field is required.
     * When true, a red asterisk (*) is displayed after the label text.
     * @default false
     */
    required?: boolean;
    /**
     * Whether the associated field is disabled.
     * Applies reduced opacity and not-allowed cursor.
     * @default false
     */
    disabled?: boolean;
    /**
     * Optional description or helper text displayed below the label.
     * Useful for providing additional context about the field.
     */
    description?: ReactNode;
    /**
     * Additional CSS classes for the description text.
     */
    descriptionClassName?: string;
    /**
     * Additional CSS classes for the outer wrapper element.
     * Only applied when `description` is provided (wrapper is needed
     * to stack label + description).
     */
    wrapperClassName?: string;
    /** Content to render inside the label. */
    children?: ReactNode;
    /** Additional CSS classes to merge on the label element. */
    className?: string;
}
/**
 * Label — an accessible label for form controls.
 *
 * Built on Radix UI's Label primitive for proper accessibility semantics
 * and the design system's token layer for consistent styling. When used
 * with Radix form controls, clicking the label will focus the associated
 * input automatically.
 *
 * Accessibility:
 *   - Renders as a native `<label>` element for proper semantics
 *   - Use `htmlFor` to associate with the corresponding input's `id`
 *   - Required indicator is decorative (`aria-hidden`) — use `aria-required`
 *     on the input itself for screen reader support
 *   - Disabled state is visual only — disable the input for functional disabling
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Label htmlFor="email">Email address</Label>
 * <Input id="email" type="email" />
 *
 * // Required field
 * <Label htmlFor="name" required>Full name</Label>
 * <Input id="name" aria-required="true" />
 *
 * // With description
 * <Label htmlFor="bio" description="Keep it under 200 characters.">
 *   Bio
 * </Label>
 * <Textarea id="bio" />
 *
 * // Small size for dense UIs
 * <Label htmlFor="code" size="sm">Verification code</Label>
 * <Input id="code" size="sm" />
 *
 * // Disabled
 * <Label htmlFor="locked" disabled>Locked field</Label>
 * <Input id="locked" disabled />
 * ```
 */
declare const Label: react.ForwardRefExoticComponent<LabelProps & react.RefAttributes<HTMLLabelElement>>;

export { Label, type LabelProps, type LabelSize, labelVariants };
