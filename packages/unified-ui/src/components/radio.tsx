"use client";

// ============================================================================
// Unified UI — Radio Component
// ============================================================================
// A production-ready radio group component built on Radix UI primitives and
// the Unified UI token layer. Uses class-variance-authority (CVA) for variant
// composition and tailwind-merge (via cn) for safe class merging.
//
// Features:
//   - Built on @radix-ui/react-radio-group for full accessibility
//   - 2 sizes: sm, md
//   - Horizontal and vertical layouts
//   - Radio card variant (full card is clickable)
//   - Label integration with clickable label
//   - Description support for each item
//   - Disabled state (group-level and item-level)
//   - Full ref forwarding
//   - WCAG AA accessible: focus ring, aria roles, keyboard navigation
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { RadioGroup, RadioGroupItem, RadioCard } from "@/design-system/components/radio";
//
//   <RadioGroup value={value} onValueChange={setValue}>
//     <RadioGroupItem value="a" label="Option A" />
//     <RadioGroupItem value="b" label="Option B" />
//   </RadioGroup>
//
//   <RadioGroup orientation="horizontal">
//     <RadioCard value="a" label="Card A" description="Description" />
//     <RadioCard value="b" label="Card B" description="Description" />
//   </RadioGroup>
// ============================================================================

import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { cva, type VariantProps } from "class-variance-authority";
import {
	createContext,
	forwardRef,
	type ReactNode,
	useContext,
	useId,
} from "react";

// ---------------------------------------------------------------------------
// Context — shares group-level config with items
// ---------------------------------------------------------------------------

interface RadioGroupContextValue {
	size: RadioSize;
	disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({
	size: "md",
});

function useRadioGroupContext(): RadioGroupContextValue {
	return useContext(RadioGroupContext);
}

// ---------------------------------------------------------------------------
// CVA Variant Definitions
// ---------------------------------------------------------------------------

export const radioGroupVariants = cva(["flex"], {
	variants: {
		orientation: {
			vertical: "flex-col gap-3",
			horizontal: "flex-row flex-wrap gap-4",
		},
	},
	defaultVariants: {
		orientation: "vertical",
	},
});

export const radioIndicatorVariants = cva(
	[
		// Layout
		"relative shrink-0",
		// Shape
		"rounded-full",
		// Border
		"border",
		// Colors
		"border-input bg-background",
		// Transition
		"transition-[color,background-color,border-color,box-shadow,opacity]",
		"duration-fast ease-standard",
		// Focus ring — WCAG AA compliant
		focusRingClasses,
		// Hover
		"hover:border-border-strong",
		// Checked state
		"data-[state=checked]:border-primary data-[state=checked]:bg-primary",
		// Disabled
		"disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-disabled",
	],
	{
		variants: {
			size: {
				/**
				 * Small — compact for dense UIs, tables, toolbars.
				 * Diameter: 16px
				 */
				sm: "size-4",

				/**
				 * Medium — default size for most radio buttons.
				 * Diameter: 20px
				 */
				md: "size-5",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

const radioInnerDotVariants = cva(
	[
		"absolute inset-0 flex items-center justify-center",
		"after:block after:rounded-full after:bg-primary-foreground",
	],
	{
		variants: {
			size: {
				sm: "after:size-1.5",
				md: "after:size-2",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

export const radioCardVariants = cva(
	[
		// Layout
		"relative flex items-start gap-3",
		// Shape
		"rounded-md",
		// Border
		"border border-input",
		// Colors
		"bg-background",
		// Transition
		"transition-[color,background-color,border-color,box-shadow,opacity]",
		"duration-fast ease-standard",
		// Hover
		"hover:border-border-strong hover:bg-surface",
		// Cursor
		"cursor-pointer",
		// Checked state
		"has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-muted",
		// Disabled
		"has-[[data-disabled]]:pointer-events-none has-[[data-disabled]]:opacity-50 has-[[data-disabled]]:cursor-not-allowed",
		// Focus within
		"has-[:focus-visible]:border-border-strong",
	],
	{
		variants: {
			size: {
				sm: "p-3",
				md: "p-4",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type RadioSize = "sm" | "md";
export type RadioOrientation = "vertical" | "horizontal";

export interface RadioGroupProps
	extends
		Omit<RadioGroupPrimitive.RadioGroupProps, "orientation" | "asChild">,
		VariantProps<typeof radioGroupVariants> {
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

export interface RadioGroupItemProps extends Omit<
	RadioGroupPrimitive.RadioGroupItemProps,
	"asChild"
> {
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

export interface RadioCardProps extends Omit<
	RadioGroupPrimitive.RadioGroupItemProps,
	"asChild"
> {
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

// ---------------------------------------------------------------------------
// Label size map
// ---------------------------------------------------------------------------

const labelSizeMap: Record<RadioSize, string> = {
	sm: "text-xs",
	md: "text-sm",
};

const descriptionSizeMap: Record<RadioSize, string> = {
	sm: "text-xs",
	md: "text-xs",
};

// ---------------------------------------------------------------------------
// RadioGroup — Root Container
// ---------------------------------------------------------------------------

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
export const RadioGroup = forwardRef<
	React.ComponentRef<typeof RadioGroupPrimitive.Root>,
	RadioGroupProps
>(function RadioGroup(
	{
		orientation = "vertical",
		size = "md",
		disabled,
		className,
		children,
		...rest
	},
	ref,
) {
	return (
		<RadioGroupContext.Provider value={{ size, disabled }}>
			<RadioGroupPrimitive.Root
				ref={ref}
				orientation={orientation}
				disabled={disabled}
				className={cn(radioGroupVariants({ orientation }), className)}
				data-ds=""
				data-ds-component="radio-group"
				data-ds-orientation={orientation}
				data-ds-size={size}
				{...rest}
			>
				{children}
			</RadioGroupPrimitive.Root>
		</RadioGroupContext.Provider>
	);
});

RadioGroup.displayName = "RadioGroup";

// ---------------------------------------------------------------------------
// RadioGroupItem — Individual Radio Button
// ---------------------------------------------------------------------------

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
export const RadioGroupItem = forwardRef<
	React.ComponentRef<typeof RadioGroupPrimitive.Item>,
	RadioGroupItemProps
>(function RadioGroupItem(
	{ value, label, description, size: sizeProp, disabled, className, ...rest },
	ref,
) {
	const { size: groupSize, disabled: groupDisabled } = useRadioGroupContext();
	const size = sizeProp ?? groupSize;
	const isDisabled = disabled ?? groupDisabled;
	const generatedId = useId();
	const itemId = rest.id ?? `radio-${generatedId}`;
	const labelId = label ? `${itemId}-label` : undefined;
	const descriptionId = description ? `${itemId}-desc` : undefined;

	return (
		<div
			className={cn(
				"flex items-start gap-2",
				isDisabled && "opacity-50 cursor-not-allowed",
				className,
			)}
			data-ds=""
			data-ds-component="radio-item-wrapper"
		>
			<RadioGroupPrimitive.Item
				ref={ref}
				id={itemId}
				value={value}
				disabled={isDisabled}
				aria-labelledby={labelId}
				aria-describedby={descriptionId}
				className={cn(radioIndicatorVariants({ size }), "mt-0.5")}
				data-ds=""
				data-ds-component="radio-item"
				data-ds-size={size}
				{...rest}
			>
				<RadioGroupPrimitive.Indicator
					className={cn(radioInnerDotVariants({ size }))}
				/>
			</RadioGroupPrimitive.Item>

			{(label || description) && (
				<div className="flex flex-col gap-0.5 min-w-0">
					{label && (
						<label
							id={labelId}
							htmlFor={itemId}
							className={cn(
								"font-medium leading-5 text-foreground",
								"cursor-pointer",
								isDisabled && "cursor-not-allowed",
								labelSizeMap[size],
							)}
						>
							{label}
						</label>
					)}
					{description && (
						<span
							id={descriptionId}
							className={cn(
								"text-muted-foreground leading-4",
								descriptionSizeMap[size],
							)}
						>
							{description}
						</span>
					)}
				</div>
			)}
		</div>
	);
});

RadioGroupItem.displayName = "RadioGroupItem";

// ---------------------------------------------------------------------------
// RadioCard — Card-Style Radio Button
// ---------------------------------------------------------------------------

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
export const RadioCard = forwardRef<
	React.ComponentRef<typeof RadioGroupPrimitive.Item>,
	RadioCardProps
>(function RadioCard(
	{
		value,
		label,
		description,
		size: sizeProp,
		disabled,
		className,
		children,
		...rest
	},
	ref,
) {
	const { size: groupSize, disabled: groupDisabled } = useRadioGroupContext();
	const size = sizeProp ?? groupSize;
	const isDisabled = disabled ?? groupDisabled;
	const generatedId = useId();
	const itemId = rest.id ?? `radio-card-${generatedId}`;
	const labelId = label ? `${itemId}-label` : undefined;
	const descriptionId = description ? `${itemId}-desc` : undefined;

	return (
		<label
			htmlFor={itemId}
			className={cn(
				radioCardVariants({ size }),
				isDisabled && "cursor-not-allowed",
				className,
			)}
			data-ds=""
			data-ds-component="radio-card"
			data-ds-size={size}
		>
			<RadioGroupPrimitive.Item
				ref={ref}
				id={itemId}
				value={value}
				disabled={isDisabled}
				aria-labelledby={labelId}
				aria-describedby={descriptionId}
				className={cn(
					radioIndicatorVariants({ size }),
					"mt-0.5 shrink-0",
				)}
				data-ds=""
				data-ds-component="radio-card-item"
				data-ds-size={size}
				{...rest}
			>
				<RadioGroupPrimitive.Indicator
					className={cn(radioInnerDotVariants({ size }))}
				/>
			</RadioGroupPrimitive.Item>

			<div className="flex flex-col gap-0.5 min-w-0 flex-1">
				{label && (
					<span
						id={labelId}
						className={cn(
							"font-medium leading-5 text-foreground",
							labelSizeMap[size],
						)}
					>
						{label}
					</span>
				)}
				{description && (
					<span
						id={descriptionId}
						className={cn(
							"text-muted-foreground leading-4",
							descriptionSizeMap[size],
						)}
					>
						{description}
					</span>
				)}
				{children}
			</div>
		</label>
	);
});

RadioCard.displayName = "RadioCard";
