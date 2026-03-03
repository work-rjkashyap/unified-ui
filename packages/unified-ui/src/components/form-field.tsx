"use client";

// ============================================================================
// Unified UI — FormField Component
// ============================================================================
// A composable form field wrapper that combines a Label, form control slot,
// optional description/helper text, and error message into a consistent,
// accessible layout. Built on the Unified UI token layer.
//
// Features:
//   - Composes Label, description, and error message into a single layout
//   - 3 sizes: sm, md, lg (matching Input/Button/Label size scale)
//   - Horizontal and vertical layout orientations
//   - Automatic id generation and aria linking (label → input, error → input)
//   - Required indicator via Label
//   - Disabled state propagation
//   - Error state with danger-colored message
//   - Full ref forwarding on the outer wrapper
//   - WCAG AA accessible: aria-describedby, aria-invalid, htmlFor linkage
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { FormField } from "@/design-system/components/form-field";
//
//   <FormField label="Email" description="We'll never share your email.">
//     <Input id="email" type="email" />
//   </FormField>
//
//   <FormField label="Password" required error="Password is required.">
//     <Input id="password" type="password" variant="error" />
//   </FormField>
//
//   <FormField label="Bio" description="Max 200 characters" size="sm">
//     <Textarea id="bio" />
//   </FormField>
//
//   <FormField
//     label="Full name"
//     orientation="horizontal"
//     required
//   >
//     <Input id="name" />
//   </FormField>
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { forwardRef, type ReactNode, useId } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type FormFieldSize = "sm" | "md" | "lg";
export type FormFieldOrientation = "vertical" | "horizontal";

export interface FormFieldProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
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
	children:
		| ReactNode
		| ((props: FormFieldControlProps) => ReactNode);

	/** Additional CSS classes to merge on the root element. */
	className?: string;
}

/**
 * Props passed to the render-function form of `children`.
 * Spread these on your form control for full accessibility.
 */
export interface FormFieldControlProps {
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

// ---------------------------------------------------------------------------
// Size Configuration
// ---------------------------------------------------------------------------

const labelSizeMap: Record<FormFieldSize, string> = {
	sm: "text-xs leading-4 font-medium",
	md: "text-sm leading-5 font-medium",
	lg: "text-sm leading-5 font-semibold",
};

const descriptionSizeMap: Record<FormFieldSize, string> = {
	sm: "text-[11px] leading-4",
	md: "text-xs leading-4",
	lg: "text-xs leading-4",
};

const errorSizeMap: Record<FormFieldSize, string> = {
	sm: "text-[11px] leading-4",
	md: "text-xs leading-4",
	lg: "text-xs leading-4",
};

const gapSizeMap: Record<FormFieldSize, string> = {
	sm: "gap-1",
	md: "gap-1.5",
	lg: "gap-2",
};

const horizontalLabelWidthMap: Record<FormFieldSize, string> = {
	sm: "w-24 shrink-0",
	md: "w-32 shrink-0",
	lg: "w-40 shrink-0",
};

// ---------------------------------------------------------------------------
// Required Indicator (Internal)
// ---------------------------------------------------------------------------

function RequiredIndicator() {
	return (
		<span className="text-danger ml-0.5" aria-hidden="true">
			*
		</span>
	);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

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
export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
	function FormField(
		{
			label,
			description,
			error,
			size = "md",
			orientation = "vertical",
			required = false,
			disabled = false,
			htmlFor: htmlForProp,
			labelClassName,
			descriptionClassName,
			errorClassName,
			controlClassName,
			children,
			className,
			...rest
		},
		ref,
	) {
		const autoId = useId();
		const fieldId = htmlForProp ?? autoId;
		const descriptionId = description ? `${fieldId}-description` : undefined;
		const errorId = error ? `${fieldId}-error` : undefined;
		const hasError = !!error;

		// Build aria-describedby — error takes precedence over description
		const ariaDescribedBy = hasError
			? errorId
			: descriptionId
				? descriptionId
				: undefined;

		// Build the control props (for render-function children)
		const controlProps: FormFieldControlProps = {
			id: fieldId,
			...(ariaDescribedBy
				? { "aria-describedby": ariaDescribedBy }
				: {}),
			...(hasError ? { "aria-invalid": true } : {}),
			...(required ? { "aria-required": true } : {}),
			...(disabled ? { disabled: true } : {}),
		};

		// Resolve children — either render function or plain ReactNode
		const renderedChildren =
			typeof children === "function" ? children(controlProps) : children;

		const isHorizontal = orientation === "horizontal";

		// --- Label element ---
		const labelElement = label ? (
			<label
				htmlFor={fieldId}
				className={cn(
					labelSizeMap[size],
					"text-foreground",
					"select-none",
					disabled && "opacity-50 cursor-not-allowed",
					!disabled && "cursor-pointer",
					isHorizontal && horizontalLabelWidthMap[size],
					isHorizontal && "pt-2", // Align with control baseline
					labelClassName,
				)}
			>
				{label}
				{required && <RequiredIndicator />}
			</label>
		) : null;

		// --- Description element ---
		const descriptionElement =
			description && !hasError ? (
				<span
					id={descriptionId}
					className={cn(
						descriptionSizeMap[size],
						"text-muted-foreground",
						disabled && "opacity-50",
						descriptionClassName,
					)}
				>
					{description}
				</span>
			) : null;

		// --- Error element ---
		const errorElement = hasError ? (
			<span
				id={errorId}
				role="alert"
				className={cn(
					errorSizeMap[size],
					"text-danger",
					disabled && "opacity-50",
					errorClassName,
				)}
			>
				{error}
			</span>
		) : null;

		// --- Vertical layout ---
		if (!isHorizontal) {
			return (
				<div
					ref={ref}
					className={cn(
						"flex flex-col",
						gapSizeMap[size],
						className,
					)}
					data-ds=""
					data-ds-component="form-field"
					data-ds-size={size}
					data-ds-orientation={orientation}
					{...(hasError ? { "data-ds-error": "" } : {})}
					{...(disabled ? { "data-ds-disabled": "" } : {})}
					{...(required ? { "data-ds-required": "" } : {})}
					{...rest}
				>
					{/* Label + description (above control) */}
					{(labelElement || descriptionElement) && (
						<div className="flex flex-col gap-0.5">
							{labelElement}
							{descriptionElement}
						</div>
					)}

					{/* Control */}
					<div className={cn(controlClassName)}>
						{renderedChildren}
					</div>

					{/* Error message (below control) */}
					{errorElement}
				</div>
			);
		}

		// --- Horizontal layout ---
		return (
			<div
				ref={ref}
				className={cn(
					"flex flex-row items-start",
					gapSizeMap[size],
					className,
				)}
				data-ds=""
				data-ds-component="form-field"
				data-ds-size={size}
				data-ds-orientation={orientation}
				{...(hasError ? { "data-ds-error": "" } : {})}
				{...(disabled ? { "data-ds-disabled": "" } : {})}
				{...(required ? { "data-ds-required": "" } : {})}
				{...rest}
			>
				{/* Label column */}
				{labelElement}

				{/* Control + description/error column */}
				<div className={cn("flex flex-1 flex-col", gapSizeMap[size])}>
					<div className={cn(controlClassName)}>
						{renderedChildren}
					</div>
					{descriptionElement}
					{errorElement}
				</div>
			</div>
		);
	},
);

FormField.displayName = "FormField";
