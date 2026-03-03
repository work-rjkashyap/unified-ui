"use client";

// ============================================================================
// Unified UI — Toggle Component
// ============================================================================
// A pressable on/off button component built on Radix UI's Toggle primitive
// and the Unified UI token layer. Uses class-variance-authority (CVA) for
// variant composition and tailwind-merge (via cn) for safe class merging.
//
// Distinct from Switch — Toggle acts like a toggle button (e.g. bold,
// italic, mute) rather than a binary on/off switch.
//
// Features:
//   - 3 visual variants: default, outline, ghost
//   - 3 sizes: sm, md, lg
//   - Pressed/unpressed states with visual feedback
//   - Icon support (leading, trailing, or icon-only)
//   - Disabled state
//   - Full ref forwarding
//   - WCAG AA accessible: focus ring, aria-pressed, keyboard toggle
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { Toggle } from "@/design-system/components/toggle";
//
//   <Toggle aria-label="Toggle bold">
//     <BoldIcon className="size-4" />
//   </Toggle>
//
//   <Toggle variant="outline" pressed={isBold} onPressedChange={setIsBold}>
//     <BoldIcon className="size-4" />
//     Bold
//   </Toggle>
//
//   <Toggle variant="ghost" size="sm" disabled>
//     <MuteIcon className="size-4" />
//   </Toggle>
// ============================================================================

import { Toggle as TogglePrimitive } from "radix-ui";
import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// CVA Variant Definition
// ---------------------------------------------------------------------------
// All color values reference design system CSS custom properties via the
// Tailwind utilities defined in design-system.css. This ensures
// automatic light/dark mode support and token compliance.
// ---------------------------------------------------------------------------

export const toggleVariants = cva(
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
				 * Medium visual prominence. The most common toggle style.
				 */
				default: [
					"bg-transparent text-muted-foreground",
					"hover:bg-muted hover:text-foreground",
					"data-[state=on]:bg-secondary data-[state=on]:text-foreground",
				],

				/**
				 * Outline — bordered toggle with visible boundary.
				 * Medium-high visual prominence. Use for toolbar-style toggles.
				 */
				outline: [
					"border border-border",
					"bg-transparent text-muted-foreground",
					"hover:bg-muted hover:text-foreground",
					"data-[state=on]:bg-secondary data-[state=on]:text-foreground",
					"data-[state=on]:border-border-strong",
				],

				/**
				 * Ghost — minimal visual weight. No background until hover.
				 * Low visual prominence. Use for subtle inline toggles.
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
				 * Small — compact toggles for dense UIs, toolbars.
				 * Height: 32px (h-8), Padding: 8px horizontal
				 */
				sm: "h-8 px-2 text-xs gap-1.5",

				/**
				 * Medium — default size for most toggles.
				 * Height: 36px (h-9), Padding: 12px horizontal
				 */
				md: "h-9 px-3 text-sm gap-2",

				/**
				 * Large — prominent toggles for larger touch targets.
				 * Height: 40px (h-10), Padding: 16px horizontal
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

export type ToggleVariant = "default" | "outline" | "ghost";
export type ToggleSize = "sm" | "md" | "lg";

export interface ToggleProps
	extends Omit<
			React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
			"asChild"
		>,
		VariantProps<typeof toggleVariants> {
	/**
	 * Visual variant of the toggle.
	 * @default "default"
	 */
	variant?: ToggleVariant;

	/**
	 * Size of the toggle.
	 * @default "md"
	 */
	size?: ToggleSize;

	/**
	 * Icon to display before the toggle label.
	 */
	iconLeft?: ReactNode;

	/**
	 * Icon to display after the toggle label.
	 */
	iconRight?: ReactNode;

	/** Content to render inside the toggle. */
	children?: ReactNode;

	/** Additional CSS classes to merge. */
	className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Toggle — a pressable on/off button for binary states.
 *
 * Built on Radix UI's Toggle primitive for accessibility and the design
 * system's token layer for styling. Use for toolbar actions (bold, italic),
 * view mode switches, mute/unmute, and other binary toggleable actions.
 *
 * Distinct from Switch: Toggle looks and behaves like a button that stays
 * pressed. Switch looks like a sliding track and is better for settings/preferences.
 *
 * Accessibility:
 *   - Radix handles `aria-pressed` state management
 *   - Focus ring visible on keyboard navigation (focus-visible)
 *   - Disabled state uses both `disabled` attribute and `data-disabled`
 *   - Keyboard toggle via Space and Enter keys (Radix)
 *   - When used as icon-only, provide `aria-label`
 *
 * @example
 * ```tsx
 * // Icon-only toggle (must have aria-label)
 * <Toggle aria-label="Toggle bold">
 *   <BoldIcon className="size-4" />
 * </Toggle>
 *
 * // With text label
 * <Toggle variant="outline">
 *   <BoldIcon className="size-4" />
 *   Bold
 * </Toggle>
 *
 * // Controlled
 * <Toggle
 *   pressed={isMuted}
 *   onPressedChange={setIsMuted}
 *   aria-label="Toggle mute"
 * >
 *   {isMuted ? <VolumeOffIcon /> : <VolumeIcon />}
 * </Toggle>
 *
 * // Sizes
 * <Toggle size="sm" aria-label="Small toggle">
 *   <StarIcon className="size-3.5" />
 * </Toggle>
 * <Toggle size="md" aria-label="Medium toggle">
 *   <StarIcon className="size-4" />
 * </Toggle>
 * <Toggle size="lg" aria-label="Large toggle">
 *   <StarIcon className="size-4" />
 * </Toggle>
 *
 * // Disabled
 * <Toggle disabled aria-label="Disabled toggle">
 *   <LockIcon className="size-4" />
 * </Toggle>
 *
 * // Ghost variant
 * <Toggle variant="ghost" aria-label="Bookmark">
 *   <BookmarkIcon className="size-4" />
 * </Toggle>
 * ```
 */
export const Toggle = forwardRef<
	React.ComponentRef<typeof TogglePrimitive.Root>,
	ToggleProps
>(function Toggle(
	{
		variant = "default",
		size = "md",
		iconLeft,
		iconRight,
		className,
		children,
		...rest
	},
	ref,
) {
	// Icon sizing classes based on toggle size
	const iconSizeClass =
		size === "sm" ? "[&>svg]:size-3.5" : "[&>svg]:size-4";

	return (
		<TogglePrimitive.Root
			ref={ref}
			className={cn(
				toggleVariants({ variant, size }),
				iconSizeClass,
				className,
			)}
			data-ds=""
			data-ds-component="toggle"
			data-ds-variant={variant}
			data-ds-size={size}
			{...rest}
		>
			{/* Leading icon */}
			{iconLeft && (
				<span className="shrink-0" aria-hidden="true">
					{iconLeft}
				</span>
			)}

			{/* Label content */}
			{children}

			{/* Trailing icon */}
			{iconRight && (
				<span className="shrink-0" aria-hidden="true">
					{iconRight}
				</span>
			)}
		</TogglePrimitive.Root>
	);
});

Toggle.displayName = "Toggle";
