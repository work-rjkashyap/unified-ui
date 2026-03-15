import * as react from 'react';
import { ReactNode, ElementType } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';

declare const buttonVariants: (props?: ({
    variant?: "danger" | "primary" | "secondary" | "ghost" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    fullWidth?: boolean | null | undefined;
    iconOnly?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";
interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">, VariantProps<typeof buttonVariants> {
    /**
     * Visual variant of the button.
     * @default "primary"
     */
    variant?: ButtonVariant;
    /**
     * Size of the button.
     * @default "md"
     */
    size?: ButtonSize;
    /**
     * Whether the button stretches to fill its container.
     * @default false
     */
    fullWidth?: boolean;
    /**
     * Whether the button is in a loading state.
     * When true, the button is disabled and shows a spinner.
     * @default false
     */
    loading?: boolean;
    /**
     * Text to display alongside the spinner during loading.
     * If not provided, the original children are hidden and only
     * the spinner is shown.
     */
    loadingText?: string;
    /**
     * Icon to display before the button label.
     */
    iconLeft?: ReactNode;
    /**
     * Icon to display after the button label.
     */
    iconRight?: ReactNode;
    /**
     * Whether this is an icon-only button (no text label).
     * Ensures the button is square and properly sized.
     * When true, you MUST provide an `aria-label` for accessibility.
     * @default false
     */
    iconOnly?: boolean;
    /**
     * Whether the button is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * The HTML element or component to render as.
     * Useful for rendering as an anchor (<a>) or Next.js <Link>.
     * @default "button"
     */
    as?: ElementType;
    /** Content to render inside the button. */
    children?: ReactNode;
    /** Additional CSS classes to merge. */
    className?: string;
}
/**
 * Button — the primary interactive element for triggering actions.
 *
 * Built on the design system's token layer with CVA for variant composition.
 * All colors, radii, spacing, and transitions come from CSS custom properties
 * defined in design-system.css.
 *
 * Accessibility:
 *   - Focus ring visible on keyboard navigation (focus-visible)
 *   - Disabled state uses both `disabled` attribute and `aria-disabled`
 *   - Loading state sets `aria-busy="true"` and disables interaction
 *   - Icon-only buttons require `aria-label`
 *
 * @example
 * ```tsx
 * // Primary action
 * <Button variant="primary" onClick={handleSave}>
 *   Save Changes
 * </Button>
 *
 * // Secondary with icon
 * <Button variant="secondary" iconLeft={<PlusIcon className="size-4" />}>
 *   Add Item
 * </Button>
 *
 * // Loading state
 * <Button variant="primary" loading loadingText="Saving...">
 *   Save
 * </Button>
 *
 * // Icon-only
 * <Button variant="ghost" iconOnly aria-label="Close">
 *   <XIcon className="size-4" />
 * </Button>
 *
 * // Danger / destructive
 * <Button variant="danger" onClick={handleDelete}>
 *   Delete Account
 * </Button>
 *
 * // Rendered as anchor
 * <Button as="a" href="/login" variant="secondary">
 *   Log In
 * </Button>
 *
 * // Full-width
 * <Button variant="primary" fullWidth>
 *   Continue
 * </Button>
 * ```
 */
declare const Button: react.ForwardRefExoticComponent<ButtonProps & react.RefAttributes<HTMLButtonElement>>;

export { Button, type ButtonProps, type ButtonSize, type ButtonVariant, buttonVariants };
