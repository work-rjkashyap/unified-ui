import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { ScrollArea as ScrollArea$1 } from 'radix-ui';

declare const scrollbarThumbVariants: (props?: ({
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const scrollbarVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ScrollAreaType = "auto" | "always" | "scroll" | "hover";
type ScrollBarSize = "sm" | "md";
type ScrollBarOrientation = "vertical" | "horizontal";
interface ScrollAreaProps extends Omit<ComponentPropsWithoutRef<typeof ScrollArea$1.Root>, "type"> {
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
interface ScrollBarProps extends ComponentPropsWithoutRef<typeof ScrollArea$1.Scrollbar> {
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
declare const ScrollBar: react.ForwardRefExoticComponent<ScrollBarProps & react.RefAttributes<HTMLDivElement>>;
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
declare const ScrollArea: react.ForwardRefExoticComponent<ScrollAreaProps & react.RefAttributes<HTMLDivElement>>;

export { ScrollArea, type ScrollAreaProps, type ScrollAreaType, ScrollBar, type ScrollBarOrientation, type ScrollBarProps, type ScrollBarSize, scrollbarThumbVariants, scrollbarVariants };
