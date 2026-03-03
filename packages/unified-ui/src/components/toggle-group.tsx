"use client";

// ============================================================================
// Unified UI — ToggleGroup Component
// ============================================================================
// A single or multi-select group of toggle buttons built on Radix UI's
// ToggleGroup primitive and the Unified UI token layer. Uses
// class-variance-authority (CVA) for variant composition and
// tailwind-merge (via cn) for safe class merging.
//
// Features:
//   - Built on @radix-ui/react-toggle-group for accessibility
//   - Single-select and multi-select modes
//   - 3 visual variants: default, outline, ghost
//   - 3 sizes: sm, md, lg
//   - Horizontal and vertical orientations
//   - Disabled state (group-level and item-level)
//   - Full ref forwarding
//   - WCAG AA accessible: focus ring, roving tabindex, aria-pressed
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { ToggleGroup, ToggleGroupItem } from "@/design-system/components/toggle-group";
//
//   <ToggleGroup type="single" value={alignment} onValueChange={setAlignment}>
//     <ToggleGroupItem value="left" aria-label="Align left">
//       <AlignLeftIcon className="size-4" />
//     </ToggleGroupItem>
//     <ToggleGroupItem value="center" aria-label="Align center">
//       <AlignCenterIcon className="size-4" />
//     </ToggleGroupItem>
//     <ToggleGroupItem value="right" aria-label="Align right">
//       <AlignRightIcon className="size-4" />
//     </ToggleGroupItem>
//   </ToggleGroup>
//
//   <ToggleGroup type="multiple" variant="outline" size="sm">
//     <ToggleGroupItem value="bold" aria-label="Bold">
//       <BoldIcon className="size-3.5" />
//     </ToggleGroupItem>
//     <ToggleGroupItem value="italic" aria-label="Italic">
//       <ItalicIcon className="size-3.5" />
//     </ToggleGroupItem>
//   </ToggleGroup>
// ============================================================================

import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { cva, type VariantProps } from "class-variance-authority";
import {
	createContext,
	type ComponentPropsWithoutRef,
	forwardRef,
	type ReactNode,
	useContext,
} from "react";

// ---------------------------------------------------------------------------
// Context — shared variant/size from group to items
// ---------------------------------------------------------------------------

interface ToggleGroupContextValue {
	variant: ToggleGroupVariant;
	size: ToggleGroupSize;
}

const ToggleGroupContext = createContext<ToggleGroupContextValue>({
	variant: "default",
	size: "md",
});

function useToggleGroupContext() {
	return useContext(ToggleGroupContext);
}

// ---------------------------------------------------------------------------
// CVA Variant Definition — Group Root
// ---------------------------------------------------------------------------

export const toggleGroupVariants = cva(
	// Base styles — shared across all orientations
	[
		// Layout
		"inline-flex items-center",
		// Gap between items
		"gap-1",
	],
	{
		variants: {
			// -----------------------------------------------------------------
			// Orientation Variants
			// -----------------------------------------------------------------
			orientation: {
				horizontal: "flex-row",
				vertical: "flex-col",
			},
		},
		defaultVariants: {
			orientation: "horizontal",
		},
	},
);

// ---------------------------------------------------------------------------
// CVA Variant Definition — Group Item
// ---------------------------------------------------------------------------
// The item variants are similar to the Toggle component's variants but
// adapted for grouped usage. When items are adjacent in an outline group,
// intermediate borders are collapsed.
// ---------------------------------------------------------------------------

export const toggleGroupItemVariants = cva(
	// Base styles — shared across all variants and sizes
	[
		// Layout
		"inline-flex items-center justify-center gap-2",
		// Typography
		"text-sm font-medium leading-5",
		// Shape
		"rounded-md",
		// Transition (uses design system motion tokens)
		"transition-[color,background-color,border-color,box-shadow,opacity]",
		"duration-fast ease-standard",
		// Focus ring — WCAG AA compliant, visible on keyboard navigation only
		focusRingClasses,
		// Disabled — consistent across all variants
		"disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
		// Cursor
		"cursor-pointer",
		// Prevent text selection on rapid clicks
		"select-none",
		// Shrink protection
		"shrink-0",
	],
	{
		variants: {
			// -----------------------------------------------------------------
			// Visual Variants
			// -----------------------------------------------------------------
			variant: {
				/**
				 * Default — transparent background, fills on press.
				 */
				default: [
					"bg-transparent text-muted-foreground",
					"hover:bg-muted hover:text-foreground",
					"data-[state=on]:bg-secondary data-[state=on]:text-foreground",
				],

				/**
				 * Outline — bordered item with visible boundary.
				 */
				outline: [
					"border border-border",
					"bg-transparent text-muted-foreground",
					"hover:bg-muted hover:text-foreground",
					"data-[state=on]:bg-secondary data-[state=on]:text-foreground",
					"data-[state=on]:border-border-strong",
				],

				/**
				 * Ghost — minimal visual weight.
				 */
				ghost: [
					"bg-transparent text-muted-foreground",
					"hover:bg-muted hover:text-foreground",
					"data-[state=on]:bg-transparent data-[state=on]:text-foreground",
				],
			},

			// -----------------------------------------------------------------
			// Size Variants
			// -----------------------------------------------------------------
			size: {
				/**
				 * Small — compact for dense UIs, toolbars.
				 * Height: 32px (h-8)
				 */
				sm: "h-8 px-2 text-xs gap-1.5",

				/**
				 * Medium — default size for most toggle groups.
				 * Height: 36px (h-9)
				 */
				md: "h-9 px-3 text-sm gap-2",

				/**
				 * Large — prominent for larger touch targets.
				 * Height: 40px (h-10)
				 */
				lg: "h-10 px-4 text-sm gap-2",
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

export type ToggleGroupVariant = "default" | "outline" | "ghost";
export type ToggleGroupSize = "sm" | "md" | "lg";
export type ToggleGroupOrientation = "horizontal" | "vertical";

// --- Single mode ---

export interface ToggleGroupSingleProps
	extends Omit<
		ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>,
		"type" | "asChild" | "rovingFocus" | "orientation"
	> {
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

// --- Multiple mode ---

export interface ToggleGroupMultipleProps
	extends Omit<
		ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>,
		"type" | "asChild" | "rovingFocus" | "orientation"
	> {
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

export type ToggleGroupProps =
	| ToggleGroupSingleProps
	| ToggleGroupMultipleProps;

export interface ToggleGroupItemProps
	extends Omit<
		ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>,
		"asChild"
	> {
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

// ---------------------------------------------------------------------------
// ToggleGroup Component
// ---------------------------------------------------------------------------

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
export const ToggleGroup = forwardRef<
	React.ComponentRef<typeof ToggleGroupPrimitive.Root>,
	ToggleGroupProps
>(function ToggleGroup(
	{
		variant = "default",
		size = "md",
		orientation = "horizontal",
		className,
		children,
		...rest
	},
	ref,
) {
	return (
		<ToggleGroupContext.Provider value={{ variant, size }}>
			<ToggleGroupPrimitive.Root
				ref={ref}
				orientation={orientation}
				className={cn(toggleGroupVariants({ orientation }), className)}
				data-ds=""
				data-ds-component="toggle-group"
				data-ds-variant={variant}
				data-ds-size={size}
				data-ds-orientation={orientation}
				{...rest}
			>
				{children}
			</ToggleGroupPrimitive.Root>
		</ToggleGroupContext.Provider>
	);
});

ToggleGroup.displayName = "ToggleGroup";

// ---------------------------------------------------------------------------
// ToggleGroupItem Component
// ---------------------------------------------------------------------------

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
export const ToggleGroupItem = forwardRef<
	React.ComponentRef<typeof ToggleGroupPrimitive.Item>,
	ToggleGroupItemProps
>(function ToggleGroupItem(
	{
		variant: variantProp,
		size: sizeProp,
		className,
		children,
		...rest
	},
	ref,
) {
	const context = useToggleGroupContext();
	const variant = variantProp ?? context.variant;
	const size = sizeProp ?? context.size;

	// Icon sizing classes based on item size
	const iconSizeClass =
		size === "sm" ? "[&>svg]:size-3.5" : "[&>svg]:size-4";

	return (
		<ToggleGroupPrimitive.Item
			ref={ref}
			className={cn(
				toggleGroupItemVariants({ variant, size }),
				iconSizeClass,
				className,
			)}
			data-ds=""
			data-ds-component="toggle-group-item"
			data-ds-variant={variant}
			data-ds-size={size}
			{...rest}
		>
			{children}
		</ToggleGroupPrimitive.Item>
	);
});

ToggleGroupItem.displayName = "ToggleGroupItem";

// ---------------------------------------------------------------------------
// Re-export context hook for advanced usage
// ---------------------------------------------------------------------------

export { useToggleGroupContext };
