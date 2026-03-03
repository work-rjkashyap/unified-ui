"use client";

// ============================================================================
// Unified UI — Popover Component
// ============================================================================
// A production-ready popover component built on Radix UI's Popover primitive
// and the Unified UI token layer. Uses tailwind-merge (via cn) for safe
// class merging.
//
// Features:
//   - Built on @radix-ui/react-popover for full accessibility
//   - Side: top, right, bottom, left
//   - Alignment: start, center, end
//   - Uses z-ds-popover z-index
//   - slideDownSm-style CSS animation
//   - Optional close button
//   - Dismissible on outside click (Radix default)
//   - Optional arrow
//   - Full ref forwarding
//   - WCAG AA accessible: focus trap, Escape to close, aria attributes
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { Popover, PopoverTrigger, PopoverContent, PopoverClose, PopoverArrow } from "@/design-system/components/popover";
//
//   <Popover>
//     <PopoverTrigger asChild>
//       <Button>Open</Button>
//     </PopoverTrigger>
//     <PopoverContent>
//       <p>Popover content here.</p>
//     </PopoverContent>
//   </Popover>
//
//   <Popover>
//     <PopoverTrigger asChild>
//       <Button>Settings</Button>
//     </PopoverTrigger>
//     <PopoverContent showClose arrow>
//       <p>Settings panel with close button and arrow.</p>
//     </PopoverContent>
//   </Popover>
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { focusRingInsetClasses } from "@unified-ui/utils/focus-ring";
import { Popover as PopoverPrimitive } from "radix-ui";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PopoverProps extends PopoverPrimitive.PopoverProps {
  /** The popover children (trigger + content). */
  children: ReactNode;
}

export interface PopoverTriggerProps
  extends ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> {
  /** Additional CSS classes. */
  className?: string;
}

export interface PopoverContentProps
  extends ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  /** Additional CSS classes for the content element. */
  className?: string;

  /**
   * Whether to show a close button in the top-right corner.
   * @default false
   */
  showClose?: boolean;

  /**
   * Whether to render an arrow pointing to the trigger.
   * @default false
   */
  arrow?: boolean;

  /**
   * Additional CSS classes for the arrow element.
   */
  arrowClassName?: string;

  /** The popover body content. */
  children: ReactNode;
}

export interface PopoverCloseProps
  extends ComponentPropsWithoutRef<typeof PopoverPrimitive.Close> {
  /** Additional CSS classes. */
  className?: string;
}

export interface PopoverArrowProps
  extends ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow> {
  /** Additional CSS classes. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Close Icon (Internal SVG)
// ---------------------------------------------------------------------------

function CloseIcon({ className }: { className?: string }) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Popover — Root
// ---------------------------------------------------------------------------

/**
 * Popover — root component that manages open/closed state.
 *
 * This is a thin wrapper around Radix UI's Popover.Root.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>Open</PopoverTrigger>
 *   <PopoverContent>Content here</PopoverContent>
 * </Popover>
 * ```
 */
export function Popover({ children, ...rest }: PopoverProps) {
  return <PopoverPrimitive.Root {...rest}>{children}</PopoverPrimitive.Root>;
}

Popover.displayName = "Popover";

// ---------------------------------------------------------------------------
// PopoverTrigger
// ---------------------------------------------------------------------------

/**
 * PopoverTrigger — the element that toggles the popover.
 *
 * Use `asChild` to compose with your own button/element.
 *
 * @example
 * ```tsx
 * <PopoverTrigger asChild>
 *   <Button variant="secondary">Open Popover</Button>
 * </PopoverTrigger>
 * ```
 */
export const PopoverTrigger = forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Trigger>,
  PopoverTriggerProps
>(function PopoverTrigger({ className, ...rest }, ref) {
  return (
    <PopoverPrimitive.Trigger
      ref={ref}
      className={className}
      data-ds=""
      data-ds-component="popover-trigger"
      {...rest}
    />
  );
});

PopoverTrigger.displayName = "PopoverTrigger";

// ---------------------------------------------------------------------------
// PopoverContent
// ---------------------------------------------------------------------------

/**
 * PopoverContent — the floating content panel of the popover.
 *
 * Built on Radix UI Popover.Content with the design system's token layer.
 * All colors, radii, spacing, shadows, and z-index come from CSS custom
 * properties defined in design-system.css.
 *
 * Accessibility:
 *   - Radix manages focus trap and restoration
 *   - Escape key closes the popover
 *   - Outside click dismisses (configurable via Radix props)
 *   - Proper ARIA attributes applied by Radix
 *
 * @example
 * ```tsx
 * // Basic content
 * <PopoverContent>
 *   <p>Hello world</p>
 * </PopoverContent>
 *
 * // With close button and arrow
 * <PopoverContent showClose arrow side="top" align="center">
 *   <h3>Settings</h3>
 *   <p>Adjust your preferences here.</p>
 * </PopoverContent>
 *
 * // Custom side and alignment
 * <PopoverContent side="right" align="start" sideOffset={8}>
 *   <p>Right-aligned popover</p>
 * </PopoverContent>
 * ```
 */
export const PopoverContent = forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(function PopoverContent(
  {
    className,
    showClose = false,
    arrow = false,
    arrowClassName,
    children,
    side = "bottom",
    align = "center",
    sideOffset = 4,
    ...rest
  },
  ref,
) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          // Layout & sizing
          "w-72",
          // Z-index
          "z-[var(--z-popover)]",
          // Visual
          "rounded-md",
          "border border-border",
          "bg-background",
          "p-4",
          "shadow-lg",
          // Text
          "text-sm text-foreground",
          // Animation — CSS-based for Radix data attributes
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=top]:slide-in-from-bottom-2",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          // Outline
          "outline-none",
          className,
        )}
        data-ds=""
        data-ds-component="popover-content"
        {...rest}
      >
        {children}

        {showClose && (
          <PopoverPrimitive.Close
            className={cn(
              "absolute right-2 top-2",
              "inline-flex items-center justify-center",
              "rounded-sm p-1",
              "text-muted-foreground hover:text-foreground",
              "transition-colors duration-fast",
              focusRingInsetClasses,
            )}
            aria-label="Close"
          >
            <CloseIcon className="size-4" />
          </PopoverPrimitive.Close>
        )}

        {arrow && (
          <PopoverPrimitive.Arrow
            className={cn("fill-background", arrowClassName)}
            width={12}
            height={6}
          />
        )}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
});

PopoverContent.displayName = "PopoverContent";

// ---------------------------------------------------------------------------
// PopoverClose
// ---------------------------------------------------------------------------

export const PopoverClose = forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Close>,
  PopoverCloseProps
>(function PopoverClose({ className, ...rest }, ref) {
  return (
    <PopoverPrimitive.Close
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-sm",
        "text-muted-foreground hover:text-foreground",
        "transition-colors duration-fast",
        focusRingInsetClasses,
        className,
      )}
      data-ds=""
      data-ds-component="popover-close"
      {...rest}
    />
  );
});

PopoverClose.displayName = "PopoverClose";

// ---------------------------------------------------------------------------
// PopoverArrow
// ---------------------------------------------------------------------------

export const PopoverArrow = forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Arrow>,
  PopoverArrowProps
>(function PopoverArrow({ className, ...rest }, ref) {
  return (
    <PopoverPrimitive.Arrow
      ref={ref}
      className={cn("fill-background", className)}
      width={12}
      height={6}
      {...rest}
    />
  );
});

PopoverArrow.displayName = "PopoverArrow";
