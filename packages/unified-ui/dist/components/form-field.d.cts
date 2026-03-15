import * as react from 'react';
import { ReactNode } from 'react';

type FormFieldSize = "sm" | "md" | "lg";
type FormFieldOrientation = "vertical" | "horizontal";
interface FormFieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /**
     * Label text for the form field.
     * Rendered as a `<label>` element linked to the control via `htmlFor`.
     */
    label?: ReactNode;
    /**
     * Description / helper text displayed below the label (or below the
     * control in vertical orientation).
     * Linked to the control via `aria-describedby`.
     */
    description?: ReactNode;
    /**
     * Error message displayed below the control.
     * When provided, the field is treated as invalid and the error
     * replaces the description.
     * Linked to the control via `aria-describedby`.
     */
    error?: ReactNode;
    /**
     * Size of the form field. Controls label text size, spacing, and
     * provides the correct sizing context for child controls.
     * @default "md"
     */
    size?: FormFieldSize;
    /**
     * Layout orientation for the label + control pair.
     * - `"vertical"` — label stacked above control (default)
     * - `"horizontal"` — label to the left, control to the right
     * @default "vertical"
     */
    orientation?: FormFieldOrientation;
    /**
     * Whether the field is required.
     * Displays a red asterisk (*) after the label text.
     * @default false
     */
    required?: boolean;
    /**
     * Whether the field is disabled.
     * Reduces opacity on all elements (label, description, error).
     * @default false
     */
    disabled?: boolean;
    /**
     * The HTML `id` attribute for the form control.
     * When provided, the label's `htmlFor` will point to this id, and
     * `aria-describedby` / `aria-errormessage` ids are derived from it.
     * When omitted, a unique id is auto-generated.
     */
    htmlFor?: string;
    /**
     * Additional CSS classes for the label element.
     */
    labelClassName?: string;
    /**
     * Additional CSS classes for the description element.
     */
    descriptionClassName?: string;
    /**
     * Additional CSS classes for the error message element.
     */
    errorClassName?: string;
    /**
     * Additional CSS classes for the control wrapper element
     * (the container around the children).
     */
    controlClassName?: string;
    /**
     * The form control(s) to render inside the field.
     * Can be a single element or a render function that receives
     * accessibility props to spread on the control.
     */
    children: ReactNode | ((props: FormFieldControlProps) => ReactNode);
    /** Additional CSS classes to merge on the root element. */
    className?: string;
}
/**
 * Props passed to the render-function form of `children`.
 * Spread these on your form control for full accessibility.
 */
interface FormFieldControlProps {
    /** The id to set on the control element. */
    id: string;
    /** Space-separated ids of description and/or error elements. */
    "aria-describedby"?: string;
    /** Whether the control is in an invalid state. */
    "aria-invalid"?: boolean;
    /** Whether the control is required. */
    "aria-required"?: boolean;
    /** Whether the control is disabled. */
    disabled?: boolean;
}
/**
 * FormField — a composable form field wrapper that handles label,
 * description, error message, and accessibility attributes.
 *
 * Wraps any form control (Input, Textarea, Select, Checkbox, etc.) with
 * consistent layout, labeling, and error display. Automatically generates
 * and wires up `htmlFor`, `aria-describedby`, and `aria-invalid` attributes.
 *
 * For maximum accessibility, use the render-function form of `children`
 * to receive and spread the control props:
 *
 * ```tsx
 * <FormField label="Email" error={errors.email}>
 *   {(controlProps) => <Input {...controlProps} type="email" />}
 * </FormField>
 * ```
 *
 * Alternatively, pass a single child element and manually set its `id`
 * to match the `htmlFor` prop (or rely on auto-generated ids and the
 * native label click behavior).
 *
 * Accessibility:
 *   - Label is linked to the control via `htmlFor` / `id`
 *   - Description is linked via `aria-describedby`
 *   - Error message is linked via `aria-describedby` (replaces description)
 *   - Error state sets `aria-invalid="true"` on the control (via render fn)
 *   - Required state adds visual indicator and `aria-required` (via render fn)
 *   - Disabled state is propagated to all visual elements
 *
 * @example
 * ```tsx
 * // Basic vertical layout
 * <FormField label="Email" description="We'll never share your email.">
 *   <Input id="email" type="email" />
 * </FormField>
 *
 * // With error
 * <FormField label="Password" required error="Password is required.">
 *   <Input id="password" type="password" variant="error" />
 * </FormField>
 *
 * // Render function for auto-wired accessibility
 * <FormField label="Name" required error={errors.name}>
 *   {(props) => <Input {...props} placeholder="Enter your name" />}
 * </FormField>
 *
 * // Horizontal layout
 * <FormField label="Username" orientation="horizontal">
 *   <Input id="username" />
 * </FormField>
 *
 * // Small size
 * <FormField label="Code" size="sm" description="6-digit code">
 *   <Input id="code" size="sm" />
 * </FormField>
 *
 * // Disabled
 * <FormField label="Locked" disabled>
 *   <Input id="locked" disabled value="Cannot edit" />
 * </FormField>
 * ```
 */
declare const FormField: react.ForwardRefExoticComponent<FormFieldProps & react.RefAttributes<HTMLDivElement>>;

export { FormField, type FormFieldControlProps, type FormFieldOrientation, type FormFieldProps, type FormFieldSize };
