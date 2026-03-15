import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import { Checkbox as Checkbox$1 } from 'radix-ui';

declare const checkboxVariants: (props?: ({
    size?: "sm" | "md" | null | undefined;
    error?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type CheckboxSize = "sm" | "md";
interface CheckboxProps extends Omit<Checkbox$1.CheckboxProps, "children" | "asChild" | "defaultChecked">, VariantProps<typeof checkboxVariants> {
    /**
     * Size of the checkbox.
     * @default "md"
     */
    size?: CheckboxSize;
    /**
     * Whether the checkbox is in an error state.
     * @default false
     */
    error?: boolean;
    /**
     * Label text displayed next to the checkbox.
     * Clicking the label toggles the checkbox.
     */
    label?: ReactNode;
    /**
     * Optional description text displayed below the label.
     * Useful for providing additional context about the option.
     */
    description?: ReactNode;
    /**
     * Additional CSS classes for the root wrapper element.
     */
    wrapperClassName?: string;
    /**
     * Additional CSS classes for the label element.
     */
    labelClassName?: string;
    /**
     * Additional CSS classes for the checkbox element.
     */
    className?: string;
    /**
     * The value of the checkbox when used within a CheckboxGroup.
     */
    value?: string;
}
/**
 * Checkbox — a toggle control for binary or indeterminate selections.
 *
 * Built on Radix UI's checkbox primitive for full accessibility support,
 * including keyboard navigation (Space to toggle), focus management,
 * and proper ARIA attributes.
 *
 * Accessibility:
 *   - Focus ring visible on keyboard navigation (focus-visible)
 *   - Disabled state uses both native disabled and visual cues
 *   - Error state applies `aria-invalid="true"`
 *   - Label is properly associated via `htmlFor`/`id`
 *   - Supports indeterminate state with proper ARIA
 *   - Space key toggles the checkbox
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Checkbox label="Accept terms and conditions" />
 *
 * // Controlled
 * <Checkbox
 *   checked={isChecked}
 *   onCheckedChange={setIsChecked}
 *   label="Enable notifications"
 * />
 *
 * // Indeterminate
 * <Checkbox checked="indeterminate" label="Select all" />
 *
 * // With description
 * <Checkbox
 *   label="Marketing emails"
 *   description="Receive emails about new products and features."
 * />
 *
 * // Sizes
 * <Checkbox size="sm" label="Small checkbox" />
 * <Checkbox size="md" label="Medium checkbox" />
 *
 * // Error state
 * <Checkbox error label="You must accept the terms" />
 *
 * // Disabled
 * <Checkbox disabled label="Cannot change this" />
 * <Checkbox disabled checked label="Locked selection" />
 * ```
 */
declare const Checkbox: react.ForwardRefExoticComponent<CheckboxProps & react.RefAttributes<HTMLButtonElement>>;
interface CheckboxGroupContextValue {
    /** Size to apply to all child checkboxes. */
    size?: CheckboxSize;
    /** Whether all children are disabled. */
    disabled?: boolean;
    /** Whether all children are in error state. */
    error?: boolean;
}
/** Hook to access CheckboxGroup context from child Checkbox components. */
declare function useCheckboxGroupContext(): CheckboxGroupContextValue;
type CheckboxGroupOrientation = "horizontal" | "vertical";
interface CheckboxGroupProps {
    /**
     * Group label displayed above the checkboxes.
     * Required for accessibility.
     */
    label?: ReactNode;
    /**
     * Optional description below the group label.
     */
    description?: ReactNode;
    /**
     * Layout orientation of the checkboxes.
     * @default "vertical"
     */
    orientation?: CheckboxGroupOrientation;
    /**
     * Size to apply to all child checkboxes.
     * Individual checkbox size props will override this.
     */
    size?: CheckboxSize;
    /**
     * Whether all checkboxes in the group are disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the group is in an error state.
     * @default false
     */
    error?: boolean;
    /**
     * Error message displayed below the group.
     */
    errorMessage?: ReactNode;
    /** Checkbox children. */
    children: ReactNode;
    /** Additional CSS classes for the group container. */
    className?: string;
}
/**
 * CheckboxGroup — groups related checkboxes with accessible semantics.
 *
 * Uses `role="group"` with `aria-labelledby` for proper screen reader
 * announcement. Provides consistent spacing and optional orientation.
 *
 * @example
 * ```tsx
 * <CheckboxGroup label="Notification preferences" orientation="vertical">
 *   <Checkbox value="email" label="Email notifications" />
 *   <Checkbox value="sms" label="SMS notifications" />
 *   <Checkbox value="push" label="Push notifications" />
 * </CheckboxGroup>
 *
 * // Horizontal layout
 * <CheckboxGroup label="Options" orientation="horizontal">
 *   <Checkbox value="a" label="Option A" />
 *   <Checkbox value="b" label="Option B" />
 * </CheckboxGroup>
 *
 * // With error
 * <CheckboxGroup label="Required" error errorMessage="Please select at least one.">
 *   <Checkbox value="a" label="Option A" />
 *   <Checkbox value="b" label="Option B" />
 * </CheckboxGroup>
 * ```
 */
declare function CheckboxGroup({ label, description, orientation, size, disabled, error, errorMessage, children, className, }: CheckboxGroupProps): react_jsx_runtime.JSX.Element;
declare namespace CheckboxGroup {
    var displayName: string;
}

export { Checkbox, CheckboxGroup, type CheckboxGroupOrientation, type CheckboxGroupProps, type CheckboxProps, type CheckboxSize, checkboxVariants, useCheckboxGroupContext };
