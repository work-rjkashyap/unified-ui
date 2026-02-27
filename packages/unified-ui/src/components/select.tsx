"use client";

// ============================================================================
// Unified UI — Select Component
// ============================================================================

import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { cva } from "class-variance-authority";
import {
	type ComponentPropsWithoutRef,
	forwardRef,
	type ReactNode,
} from "react";

// ---------------------------------------------------------------------------
// CVA Variant Definition
// ---------------------------------------------------------------------------

export const selectTriggerVariants = cva(
	[
		"inline-flex items-center justify-between w-full",
		"text-sm leading-5",
		"rounded-ds-md",
		"border",
		"bg-ds-background text-ds-input-foreground",
		"transition-[color,background-color,border-color,box-shadow,opacity]",
		"duration-ds-fast ease-ds-standard",
		focusRingClasses,
		"disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-ds-disabled disabled:text-ds-disabled-foreground",
		"data-[placeholder]:text-ds-input-placeholder",
		"cursor-pointer",
	],
	{
		variants: {
			variant: {
				default: [
					"border-ds-input",
					"hover:border-ds-border-strong",
					"focus-visible:border-ds-focus-ring",
				],
				error: [
					"border-ds-danger",
					"text-ds-foreground",
					"focus-visible:ring-ds-danger",
				],
				success: [
					"border-ds-success",
					"text-ds-foreground",
					"focus-visible:ring-ds-success",
				],
			},
			size: {
				sm: "h-8 px-2.5 text-xs gap-1.5",
				md: "h-9 px-3 text-sm gap-2",
				lg: "h-10 px-3.5 text-sm gap-2",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	},
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SelectVariant = "default" | "error" | "success";
export type SelectSize = "sm" | "md" | "lg";

export interface SelectProps extends Omit<
	ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
	"children"
> {
	variant?: SelectVariant;
	size?: SelectSize;
	placeholder?: string;
	triggerClassName?: string;
	contentClassName?: string;
	"aria-invalid"?: boolean | "true" | "false";
	"aria-describedby"?: string;
	children: ReactNode;
}

export interface SelectItemProps extends ComponentPropsWithoutRef<
	typeof SelectPrimitive.Item
> {
	className?: string;
	children: ReactNode;
}

export interface SelectGroupProps extends ComponentPropsWithoutRef<
	typeof SelectPrimitive.Group
> {
	className?: string;
	children: ReactNode;
}

export interface SelectLabelProps extends ComponentPropsWithoutRef<
	typeof SelectPrimitive.Label
> {
	className?: string;
	children: ReactNode;
}

export interface SelectSeparatorProps extends ComponentPropsWithoutRef<
	typeof SelectPrimitive.Separator
> {
	className?: string;
}

// ---------------------------------------------------------------------------
// Icons (Internal SVGs)
// ---------------------------------------------------------------------------

function ChevronDownIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
	);
}

function ChevronUpIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			<path d="m18 15-6-6-6 6" />
		</svg>
	);
}

function CheckIconInternal({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			<path d="M20 6 9 17l-5-5" />
		</svg>
	);
}

const iconSizeMap: Record<SelectSize, string> = {
	sm: "size-3.5",
	md: "size-4",
	lg: "size-4",
};

// ---------------------------------------------------------------------------
// Select Root
// ---------------------------------------------------------------------------

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
	function Select(
		{
			variant = "default",
			size = "md",
			placeholder,
			triggerClassName,
			contentClassName,
			children,
			disabled,
			value,
			defaultValue,
			onValueChange,
			open,
			defaultOpen,
			onOpenChange,
			name,
			required,
			"aria-invalid": ariaInvalid,
			"aria-describedby": ariaDescribedBy,
			...rest
		},
		ref,
	) {
		const resolvedAriaInvalid =
			ariaInvalid !== undefined
				? ariaInvalid
				: variant === "error"
					? true
					: undefined;

		return (
			<SelectPrimitive.Root
				value={value}
				defaultValue={defaultValue}
				onValueChange={onValueChange}
				open={open}
				defaultOpen={defaultOpen}
				onOpenChange={onOpenChange}
				disabled={disabled}
				name={name}
				required={required}
				{...rest}
			>
				<SelectPrimitive.Trigger
					ref={ref}
					className={cn(
						selectTriggerVariants({ variant, size }),
						triggerClassName,
					)}
					aria-invalid={resolvedAriaInvalid}
					aria-describedby={ariaDescribedBy}
					data-ds=""
					data-ds-component="select"
					data-ds-variant={variant}
					data-ds-size={size}
				>
					<SelectPrimitive.Value placeholder={placeholder} />
					<SelectPrimitive.Icon asChild>
						<ChevronDownIcon
							className={cn(
								iconSizeMap[size],
								"shrink-0 text-ds-muted-foreground",
							)}
						/>
					</SelectPrimitive.Icon>
				</SelectPrimitive.Trigger>

				<SelectPrimitive.Portal>
					<SelectPrimitive.Content
						className={cn(
							"relative z-[var(--ds-z-popover)]",
							"min-w-[var(--radix-select-trigger-width)]",
							"max-h-[min(var(--radix-select-content-available-height),320px)]",
							"overflow-hidden",
							"rounded-ds-md",
							"border border-ds-border",
							"bg-ds-background",
							"shadow-ds-lg",
							"data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
							"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
							"data-[side=top]:slide-in-from-bottom-2",
							"data-[side=bottom]:slide-in-from-top-2",
							"data-[side=left]:slide-in-from-right-2",
							"data-[side=right]:slide-in-from-left-2",
							contentClassName,
						)}
						position="popper"
						sideOffset={4}
					>
						<SelectPrimitive.ScrollUpButton
							className={cn(
								"flex items-center justify-center py-1",
								"cursor-default text-ds-muted-foreground",
							)}
						>
							<ChevronUpIcon className="size-4" />
						</SelectPrimitive.ScrollUpButton>

						<SelectPrimitive.Viewport className="p-1">
							{children}
						</SelectPrimitive.Viewport>

						<SelectPrimitive.ScrollDownButton
							className={cn(
								"flex items-center justify-center py-1",
								"cursor-default text-ds-muted-foreground",
							)}
						>
							<ChevronDownIcon className="size-4" />
						</SelectPrimitive.ScrollDownButton>
					</SelectPrimitive.Content>
				</SelectPrimitive.Portal>
			</SelectPrimitive.Root>
		);
	},
);

Select.displayName = "Select";

// ---------------------------------------------------------------------------
// SelectItem
// ---------------------------------------------------------------------------

export const SelectItem = forwardRef<
	React.ComponentRef<typeof SelectPrimitive.Item>,
	SelectItemProps
>(function SelectItem({ className, children, ...rest }, ref) {
	return (
		<SelectPrimitive.Item
			ref={ref}
			className={cn(
				"relative flex w-full cursor-pointer select-none items-center",
				"rounded-ds-sm py-1.5 pl-8 pr-2",
				"text-sm leading-5 text-ds-foreground",
				"outline-none",
				"focus:bg-ds-muted focus:text-ds-foreground",
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				className,
			)}
			data-ds=""
			data-ds-component="select-item"
			{...rest}
		>
			<span className="absolute left-2 flex items-center justify-center">
				<SelectPrimitive.ItemIndicator>
					<CheckIconInternal className="size-4" />
				</SelectPrimitive.ItemIndicator>
			</span>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
});

SelectItem.displayName = "SelectItem";

// ---------------------------------------------------------------------------
// SelectGroup
// ---------------------------------------------------------------------------

export const SelectGroup = forwardRef<
	React.ComponentRef<typeof SelectPrimitive.Group>,
	SelectGroupProps
>(function SelectGroup({ className, children, ...rest }, ref) {
	return (
		<SelectPrimitive.Group
			ref={ref}
			className={cn("", className)}
			{...rest}
		>
			{children}
		</SelectPrimitive.Group>
	);
});

SelectGroup.displayName = "SelectGroup";

// ---------------------------------------------------------------------------
// SelectLabel
// ---------------------------------------------------------------------------

export const SelectLabel = forwardRef<
	React.ComponentRef<typeof SelectPrimitive.Label>,
	SelectLabelProps
>(function SelectLabel({ className, children, ...rest }, ref) {
	return (
		<SelectPrimitive.Label
			ref={ref}
			className={cn(
				"py-1.5 pl-8 pr-2 text-xs font-semibold text-ds-muted-foreground",
				className,
			)}
			{...rest}
		>
			{children}
		</SelectPrimitive.Label>
	);
});

SelectLabel.displayName = "SelectLabel";

// ---------------------------------------------------------------------------
// SelectSeparator
// ---------------------------------------------------------------------------

export const SelectSeparator = forwardRef<
	React.ComponentRef<typeof SelectPrimitive.Separator>,
	SelectSeparatorProps
>(function SelectSeparator({ className, ...rest }, ref) {
	return (
		<SelectPrimitive.Separator
			ref={ref}
			className={cn("-mx-1 my-1 h-px bg-ds-border", className)}
			{...rest}
		/>
	);
});

SelectSeparator.displayName = "SelectSeparator";
