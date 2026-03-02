"use client";
// ============================================================================
// Unified UI — Select Component
// ============================================================================
import { Select as SelectPrimitive } from "radix-ui";
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
        "rounded-md",
        "border",
        "bg-background text-input-foreground",
        "transition-[color,background-color,border-color,box-shadow,opacity]",
        "duration-fast ease-standard",
        focusRingClasses,
        "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled-foreground",
        "data-[placeholder]:text-input-placeholder",
        "cursor-pointer",
    ],
    {
        variants: {
            variant: {
                default: [
                    "border-input",
                    "hover:border-border-strong",
                    "focus-visible:border-border-strong",
                ],
                error: [
                    "border-danger",
                    "text-foreground",
                    "focus-visible:border-danger",
                ],
                success: [
                    "border-success",
                    "text-foreground",
                    "focus-visible:border-success",
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
export const Select = SelectPrimitive.Root;
// ---------------------------------------------------------------------------
// SelectTrigger
// ---------------------------------------------------------------------------
export interface SelectTriggerProps
    extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
    variant?: SelectVariant;
    size?: SelectSize;
}
export const SelectTrigger = forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Trigger>,
    SelectTriggerProps
>(function SelectTrigger(
    { className, children, variant = "default", size = "md", ...props },
    ref,
) {
    return (
        <SelectPrimitive.Trigger
            ref={ref}
            className={cn(selectTriggerVariants({ variant, size }), className)}
            data-ds=""
            data-ds-component="select-trigger"
            data-ds-variant={variant}
            data-ds-size={size}
            {...props}
        >
            {children}
            <SelectPrimitive.Icon asChild>
                <ChevronDownIcon
                    className={cn(
                        iconSizeMap[size],
                        "shrink-0 text-muted-foreground",
                    )}
                />
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
// ---------------------------------------------------------------------------
// SelectValue
// ---------------------------------------------------------------------------
export const SelectValue = SelectPrimitive.Value;
// ---------------------------------------------------------------------------
// SelectContent
// ---------------------------------------------------------------------------
export type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>;
export const SelectContent = forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Content>,
    SelectContentProps
>(function SelectContent(
    { className, children, position = "popper", sideOffset = 4, ...props },
    ref,
) {
    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content
                ref={ref}
                className={cn(
                    "relative z-[var(--z-popover)]",
                    "min-w-[var(--radix-select-trigger-width)]",
                    "max-h-[min(var(--radix-select-content-available-height),320px)]",
                    "overflow-hidden",
                    "rounded-md",
                    "border border-border",
                    "bg-background",
                    "shadow-lg",
                    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
                    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                    "data-[side=top]:slide-in-from-bottom-2",
                    "data-[side=bottom]:slide-in-from-top-2",
                    "data-[side=left]:slide-in-from-right-2",
                    "data-[side=right]:slide-in-from-left-2",
                    className,
                )}
                position={position}
                sideOffset={sideOffset}
                {...props}
            >
                <SelectScrollUpButton />
                <SelectPrimitive.Viewport
                    className={cn(
                        "p-1",
                        position === "popper" &&
                        "w-full min-w-[var(--radix-select-trigger-width)]",
                    )}
                >
                    {children}
                </SelectPrimitive.Viewport>
                <SelectScrollDownButton />
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    );
});
SelectContent.displayName = SelectPrimitive.Content.displayName;
// ---------------------------------------------------------------------------
// SelectScrollUpButton
// ---------------------------------------------------------------------------
export type SelectScrollUpButtonProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>;
export const SelectScrollUpButton = forwardRef<
    React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
    SelectScrollUpButtonProps
>(function SelectScrollUpButton({ className, ...props }, ref) {
    return (
        <SelectPrimitive.ScrollUpButton
            ref={ref}
            className={cn(
                "flex items-center justify-center py-1",
                "cursor-default text-muted-foreground",
                className,
            )}
            {...props}
        >
            <ChevronUpIcon className="size-4" />
        </SelectPrimitive.ScrollUpButton>
    );
});
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
// ---------------------------------------------------------------------------
// SelectScrollDownButton
// ---------------------------------------------------------------------------
export type SelectScrollDownButtonProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>;
export const SelectScrollDownButton = forwardRef<
    React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>,
    SelectScrollDownButtonProps
>(function SelectScrollDownButton({ className, ...props }, ref) {
    return (
        <SelectPrimitive.ScrollDownButton
            ref={ref}
            className={cn(
                "flex items-center justify-center py-1",
                "cursor-default text-muted-foreground",
                className,
            )}
            {...props}
        >
            <ChevronDownIcon className="size-4" />
        </SelectPrimitive.ScrollDownButton>
    );
});
SelectScrollDownButton.displayName =
    SelectPrimitive.ScrollDownButton.displayName;
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
                "rounded-sm py-1.5 pl-8 pr-2",
                "text-sm leading-5 text-foreground",
                "outline-none",
                "focus:bg-muted focus:text-foreground",
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
                "py-1.5 pl-8 pr-2 text-xs font-semibold text-muted-foreground",
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
            className={cn("-mx-1 my-1 h-px bg-border", className)}
            {...rest}
        />
    );
});
SelectSeparator.displayName = "SelectSeparator";
