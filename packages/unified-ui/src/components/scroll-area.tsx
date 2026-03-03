"use client";

// ============================================================================
// Unified UI — ScrollArea Component
// ============================================================================
// A custom scrollbar container built on Radix UI's ScrollArea primitive and
// the Unified UI token layer. Provides a consistent, styled scrollbar
// appearance across all browsers.
//
// Features:
//   - Built on @radix-ui/react-scroll-area for cross-browser consistency
//   - Vertical and horizontal scrollbar support
//   - 2 scrollbar sizes: sm, md
//   - Auto-hide scrollbar option (type="scroll" vs "auto" vs "always" vs "hover")
//   - Corner element for when both scrollbars are visible
//   - Full ref forwarding
//   - WCAG AA accessible: keyboard scrolling preserved, scrollbar is decorative
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { ScrollArea, ScrollBar } from "@/design-system/components/scroll-area";
//
//   <ScrollArea className="h-72 w-full rounded-md border">
//     <div className="p-4">{longContent}</div>
//   </ScrollArea>
//
//   <ScrollArea className="h-48" orientation="horizontal">
//     <div className="flex gap-4 p-4">{horizontalItems}</div>
//   </ScrollArea>
//
//   <ScrollArea className="h-96" scrollbarSize="sm" type="always">
//     {content}
//   </ScrollArea>
// ============================================================================

import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
import { cn } from "@unified-ui/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import {
	type ComponentPropsWithoutRef,
	forwardRef,
	type ReactNode,
} from "react";

// ---------------------------------------------------------------------------
// CVA Variant Definitions — Scrollbar Thumb
// ---------------------------------------------------------------------------

export const scrollbarThumbVariants = cva(
	[
		// Shape
		"relative rounded-full",
		// Color
		"bg-border",
		// Transition
		"transition-[background-color] duration-fast ease-standard",
		// Hover
		"hover:bg-muted-foreground/50",
	],
	{
		variants: {
			size: {
				sm: "",
				md: "",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

// ---------------------------------------------------------------------------
// CVA Variant Definitions — Scrollbar Track
// ---------------------------------------------------------------------------

export const scrollbarVariants = cva(
	[
		// Layout
		"flex touch-none select-none",
		// Transition
		"transition-[background-color,opacity] duration-fast ease-standard",
		// Background
		"bg-transparent",
		// Hover — subtle track background
		"hover:bg-muted/50",
		// Border
		"border-transparent",
	],
	{
		variants: {
			orientation: {
				vertical: "h-full border-l border-l-transparent p-px",
				horizontal: "flex-col border-t border-t-transparent p-px",
			},
			size: {
				/**
				 * Small — thin scrollbar for compact UIs.
				 * Track width/height: 6px
				 */
				sm: "",
				/**
				 * Medium — default scrollbar width.
				 * Track width/height: 10px
				 */
				md: "",
			},
		},
		compoundVariants: [
			{ orientation: "vertical", size: "sm", className: "w-1.5" },
			{ orientation: "vertical", size: "md", className: "w-2.5" },
			{ orientation: "horizontal", size: "sm", className: "h-1.5" },
			{ orientation: "horizontal", size: "md", className: "h-2.5" },
		],
		defaultVariants: {
			orientation: "vertical",
			size: "md",
		},
	},
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ScrollAreaType = "auto" | "always" | "scroll" | "hover";
export type ScrollBarSize = "sm" | "md";
export type ScrollBarOrientation = "vertical" | "horizontal";

export interface ScrollAreaProps
	extends Omit<
		ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>,
		"type"
	> {
	/**
	 * The scrollbar visibility behavior.
	 * - `"auto"` — scrollbars visible when content overflows
	 * - `"always"` — scrollbars always visible
	 * - `"scroll"` — scrollbars visible during scrolling only
	 * - `"hover"` — scrollbars visible on hover only
	 * @default "hover"
	 */
	type?: ScrollAreaType;

	/**
	 * Size of the scrollbar track.
	 * @default "md"
	 */
	scrollbarSize?: ScrollBarSize;

	/**
	 * Whether to show the vertical scrollbar.
	 * @default true
	 */
	showVertical?: boolean;

	/**
	 * Whether to show the horizontal scrollbar.
	 * @default false
	 */
	showHorizontal?: boolean;

	/**
	 * Additional CSS classes for the viewport element.
	 */
	viewportClassName?: string;

	/** Additional CSS classes to merge on the root element. */
	className?: string;

	/** Content to render inside the scrollable area. */
	children?: ReactNode;
}

export interface ScrollBarProps
	extends ComponentPropsWithoutRef<
		typeof ScrollAreaPrimitive.Scrollbar
	> {
	/**
	 * Orientation of the scrollbar.
	 * @default "vertical"
	 */
	orientation?: ScrollBarOrientation;

	/**
	 * Size of the scrollbar.
	 * @default "md"
	 */
	size?: ScrollBarSize;

	/** Additional CSS classes to merge. */
	className?: string;
}

// ---------------------------------------------------------------------------
// ScrollBar Component
// ---------------------------------------------------------------------------

/**
 * ScrollBar — a styled scrollbar track and thumb.
 *
 * Used internally by ScrollArea but can also be used standalone when
 * composing custom scroll area layouts.
 *
 * @example
 * ```tsx
 * <ScrollArea.Root>
 *   <ScrollArea.Viewport>{content}</ScrollArea.Viewport>
 *   <ScrollBar orientation="vertical" size="sm" />
 *   <ScrollBar orientation="horizontal" size="sm" />
 * </ScrollArea.Root>
 * ```
 */
export const ScrollBar = forwardRef<
	React.ComponentRef<typeof ScrollAreaPrimitive.Scrollbar>,
	ScrollBarProps
>(function ScrollBar(
	{ orientation = "vertical", size = "md", className, ...rest },
	ref,
) {
	return (
		<ScrollAreaPrimitive.Scrollbar
			ref={ref}
			orientation={orientation}
			className={cn(
				scrollbarVariants({ orientation, size }),
				className,
			)}
			data-ds=""
			data-ds-component="scroll-bar"
			data-ds-orientation={orientation}
			data-ds-size={size}
			{...rest}
		>
			<ScrollAreaPrimitive.Thumb
				className={cn(scrollbarThumbVariants({ size }))}
			/>
		</ScrollAreaPrimitive.Scrollbar>
	);
});

ScrollBar.displayName = "ScrollBar";

// ---------------------------------------------------------------------------
// ScrollArea Component
// ---------------------------------------------------------------------------

/**
 * ScrollArea — a custom scrollbar container for consistent cross-browser
 * scroll appearance.
 *
 * Built on Radix UI's ScrollArea primitive. Replaces native browser
 * scrollbars with styled, consistent scrollbar tracks and thumbs that
 * match the design system's visual language.
 *
 * Accessibility:
 *   - Keyboard scrolling works natively (not intercepted)
 *   - Custom scrollbars are decorative — assistive technology uses the
 *     native scrollable region
 *   - Focus management and tab order are preserved
 *   - Scroll position is announced by screen readers naturally
 *
 * @example
 * ```tsx
 * // Basic vertical scroll
 * <ScrollArea className="h-72 w-full rounded-md border">
 *   <div className="p-4">
 *     {longContent}
 *   </div>
 * </ScrollArea>
 *
 * // Horizontal scroll
 * <ScrollArea className="w-96" showHorizontal showVertical={false}>
 *   <div className="flex gap-4 p-4 w-max">
 *     {horizontalItems}
 *   </div>
 * </ScrollArea>
 *
 * // Both scrollbars with small size
 * <ScrollArea className="h-64 w-64" showHorizontal scrollbarSize="sm">
 *   <div className="w-[800px] h-[800px]">
 *     {largeContent}
 *   </div>
 * </ScrollArea>
 *
 * // Always visible scrollbars
 * <ScrollArea className="h-48" type="always">
 *   {content}
 * </ScrollArea>
 *
 * // Scroll on hover only
 * <ScrollArea className="h-48" type="hover">
 *   {content}
 * </ScrollArea>
 * ```
 */
export const ScrollArea = forwardRef<
	React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
	ScrollAreaProps
>(function ScrollArea(
	{
		type = "hover",
		scrollbarSize = "md",
		showVertical = true,
		showHorizontal = false,
		viewportClassName,
		className,
		children,
		...rest
	},
	ref,
) {
	return (
		<ScrollAreaPrimitive.Root
			ref={ref}
			type={type}
			className={cn("relative overflow-hidden", className)}
			data-ds=""
			data-ds-component="scroll-area"
			{...rest}
		>
			<ScrollAreaPrimitive.Viewport
				className={cn(
					"size-full rounded-[inherit]",
					// Ensure the viewport stretches children to full width
					"[&>div]:!block",
					viewportClassName,
				)}
			>
				{children}
			</ScrollAreaPrimitive.Viewport>

			{showVertical && (
				<ScrollBar orientation="vertical" size={scrollbarSize} />
			)}

			{showHorizontal && (
				<ScrollBar orientation="horizontal" size={scrollbarSize} />
			)}

			{/* Corner element shown when both scrollbars are visible */}
			{showVertical && showHorizontal && (
				<ScrollAreaPrimitive.Corner className="bg-muted/50" />
			)}
		</ScrollAreaPrimitive.Root>
	);
});

ScrollArea.displayName = "ScrollArea";
