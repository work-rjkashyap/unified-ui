import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { ToggleGroup as ToggleGroup$1 } from 'radix-ui';

interface ToggleGroupContextValue {
    variant: ToggleGroupVariant;
    size: ToggleGroupSize;
}
declare function useToggleGroupContext(): ToggleGroupContextValue;
declare const toggleGroupVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const toggleGroupItemVariants: (props?: ({
    variant?: "outline" | "default" | "ghost" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ToggleGroupVariant = "default" | "outline" | "ghost";
type ToggleGroupSize = "sm" | "md" | "lg";
type ToggleGroupOrientation = "horizontal" | "vertical";
interface ToggleGroupSingleProps extends Omit<ComponentPropsWithoutRef<typeof ToggleGroup$1.Root>, "type" | "asChild" | "rovingFocus" | "orientation"> {
    /**
     * Selection mode: only one item can be active at a time.
     */
    type: "single";
    /**
     * The controlled value of the active item.
     */
    value?: string;
    /**
     * The default value for uncontrolled usage.
     */
    defaultValue?: string;
    /**
     * Callback fired when the active item changes.
     */
    onValueChange?: (value: string) => void;
    /**
     * Visual variant applied to all items in the group.
     * @default "default"
     */
    variant?: ToggleGroupVariant;
    /**
     * Size applied to all items in the group.
     * @default "md"
     */
    size?: ToggleGroupSize;
    /**
     * Orientation of the toggle group.
     * @default "horizontal"
     */
    orientation?: ToggleGroupOrientation;
    /**
     * Whether the group is disabled.
     * @default false
     */
    disabled?: boolean;
    /** Content to render inside the group (ToggleGroupItem children). */
    children: ReactNode;
    /** Additional CSS classes to merge. */
    className?: string;
}
interface ToggleGroupMultipleProps extends Omit<ComponentPropsWithoutRef<typeof ToggleGroup$1.Root>, "type" | "asChild" | "rovingFocus" | "orientation"> {
    /**
     * Selection mode: multiple items can be active simultaneously.
     */
    type: "multiple";
    /**
     * The controlled value of the active items.
     */
    value?: string[];
    /**
     * The default value for uncontrolled usage.
     */
    defaultValue?: string[];
    /**
     * Callback fired when the active items change.
     */
    onValueChange?: (value: string[]) => void;
    /**
     * Visual variant applied to all items in the group.
     * @default "default"
     */
    variant?: ToggleGroupVariant;
    /**
     * Size applied to all items in the group.
     * @default "md"
     */
    size?: ToggleGroupSize;
    /**
     * Orientation of the toggle group.
     * @default "horizontal"
     */
    orientation?: ToggleGroupOrientation;
    /**
     * Whether the group is disabled.
     * @default false
     */
    disabled?: boolean;
    /** Content to render inside the group (ToggleGroupItem children). */
    children: ReactNode;
    /** Additional CSS classes to merge. */
    className?: string;
}
type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps;
interface ToggleGroupItemProps extends Omit<ComponentPropsWithoutRef<typeof ToggleGroup$1.Item>, "asChild"> {
    /**
     * The unique value for this item.
     */
    value: string;
    /**
     * Override the group-level variant for this specific item.
     */
    variant?: ToggleGroupVariant;
    /**
     * Override the group-level size for this specific item.
     */
    size?: ToggleGroupSize;
    /** Content to render inside the toggle item. */
    children?: ReactNode;
    /** Additional CSS classes to merge. */
    className?: string;
}
/**
 * ToggleGroup — a group of toggle buttons with single or multi-select behavior.
 *
 * Built on Radix UI's ToggleGroup primitive for accessibility and the
 * design system's token layer for styling. Supports both single-select
 * (radio-like) and multi-select (checkbox-like) modes.
 *
 * The group shares variant and size context with its items, so you only
 * need to set these once on the group level. Individual items can override
 * these if needed.
 *
 * Accessibility:
 *   - Radix handles `role="group"` on the root
 *   - Radix handles `aria-pressed` on each item
 *   - Roving tabindex for keyboard navigation (arrow keys move between items)
 *   - Space/Enter toggles the focused item
 *   - Disabled state on group propagates to all items
 *   - Each icon-only item should have an `aria-label`
 *
 * @example
 * ```tsx
 * // Single-select: text alignment
 * <ToggleGroup type="single" value={align} onValueChange={setAlign}>
 *   <ToggleGroupItem value="left" aria-label="Align left">
 *     <AlignLeftIcon className="size-4" />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="center" aria-label="Align center">
 *     <AlignCenterIcon className="size-4" />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="right" aria-label="Align right">
 *     <AlignRightIcon className="size-4" />
 *   </ToggleGroupItem>
 * </ToggleGroup>
 *
 * // Multi-select: text formatting
 * <ToggleGroup type="multiple" variant="outline" size="sm">
 *   <ToggleGroupItem value="bold" aria-label="Bold">
 *     <BoldIcon className="size-3.5" />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="italic" aria-label="Italic">
 *     <ItalicIcon className="size-3.5" />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="underline" aria-label="Underline">
 *     <UnderlineIcon className="size-3.5" />
 *   </ToggleGroupItem>
 * </ToggleGroup>
 *
 * // Vertical orientation
 * <ToggleGroup type="single" orientation="vertical">
 *   <ToggleGroupItem value="list">List view</ToggleGroupItem>
 *   <ToggleGroupItem value="grid">Grid view</ToggleGroupItem>
 *   <ToggleGroupItem value="board">Board view</ToggleGroupItem>
 * </ToggleGroup>
 *
 * // Disabled
 * <ToggleGroup type="single" disabled>
 *   <ToggleGroupItem value="a">A</ToggleGroupItem>
 *   <ToggleGroupItem value="b">B</ToggleGroupItem>
 * </ToggleGroup>
 * ```
 */
declare const ToggleGroup: react.ForwardRefExoticComponent<ToggleGroupProps & react.RefAttributes<HTMLDivElement>>;
/**
 * ToggleGroupItem — an individual toggle button within a ToggleGroup.
 *
 * Inherits variant and size from the parent ToggleGroup context, but
 * can override them per-item if needed.
 *
 * When used as an icon-only item, always provide an `aria-label` for
 * accessibility.
 *
 * @example
 * ```tsx
 * <ToggleGroupItem value="bold" aria-label="Bold">
 *   <BoldIcon className="size-4" />
 * </ToggleGroupItem>
 *
 * // With text label
 * <ToggleGroupItem value="grid">
 *   <GridIcon className="size-4" />
 *   Grid view
 * </ToggleGroupItem>
 *
 * // Override group variant/size
 * <ToggleGroupItem value="special" variant="outline" size="lg">
 *   Special
 * </ToggleGroupItem>
 * ```
 */
declare const ToggleGroupItem: react.ForwardRefExoticComponent<ToggleGroupItemProps & react.RefAttributes<HTMLButtonElement>>;

export { ToggleGroup, ToggleGroupItem, type ToggleGroupItemProps, type ToggleGroupMultipleProps, type ToggleGroupOrientation, type ToggleGroupProps, type ToggleGroupSingleProps, type ToggleGroupSize, type ToggleGroupVariant, toggleGroupItemVariants, toggleGroupVariants, useToggleGroupContext };
