"use client";

// ============================================================================
// Unified UI — Tooltip Component
// ============================================================================
// A lightweight tooltip component built on Radix UI's Tooltip primitive and
// the Unified UI token layer. Uses tailwind-merge (via cn) for safe class
// merging.
//
// Features:
//   - Built on @radix-ui/react-tooltip for full accessibility
//   - Side placement: top, right, bottom, left
//   - Arrow support (optional)
//   - Max width constraint (default 220px)
//   - Fade + scale animation (CSS-based for performance)
//   - Configurable delay
//   - Uses z-tooltip z-index token
//   - WCAG AA accessible: keyboard accessible, proper ARIA attributes
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { Tooltip, TooltipProvider } from "@/design-system/components/tooltip";
//
//   <TooltipProvider>
//     <Tooltip content="Save your changes">
//       <button>Save</button>
//     </Tooltip>
//   </TooltipProvider>
//
//   <Tooltip content="Delete this item" side="bottom" arrow={false}>
//     <button>Delete</button>
//   </Tooltip>
// ============================================================================

import { motion, useReducedMotion } from "framer-motion";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { fadeInFast } from "@/lib/motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TooltipSide = "top" | "right" | "bottom" | "left";
export type TooltipAlign = "start" | "center" | "end";

export interface TooltipProps {
  /**
   * The tooltip content. Can be a string or ReactNode.
   */
  content: ReactNode;

  /**
   * The trigger element. Must be a single React element that accepts a ref.
   */
  children: ReactNode;

  /**
   * The preferred side of the trigger to render the tooltip.
   * @default "top"
   */
  side?: TooltipSide;

  /**
   * Alignment of the tooltip relative to the trigger.
   * @default "center"
   */
  align?: TooltipAlign;

  /**
   * The distance in pixels from the trigger.
   * @default 6
   */
  sideOffset?: number;

  /**
   * Whether to show an arrow pointing to the trigger.
   * @default true
   */
  arrow?: boolean;

  /**
   * Maximum width of the tooltip content.
   * @default 220
   */
  maxWidth?: number;

  /**
   * Delay in ms before the tooltip opens.
   * @default 300
   */
  delayDuration?: number;

  /**
   * Delay in ms before the tooltip closes after leaving.
   * @default 0
   */
  skipDelayDuration?: number;

  /**
   * Whether the tooltip is open (controlled).
   */
  open?: boolean;

  /**
   * Callback when the open state changes.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Additional CSS classes for the tooltip content element.
   */
  contentClassName?: string;
}

export interface TooltipProviderProps
  extends ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider> {
  children: ReactNode;
}

// ---------------------------------------------------------------------------
// TooltipProvider — wraps application to configure shared tooltip behavior
// ---------------------------------------------------------------------------

/**
 * TooltipProvider — wraps your application (or a subtree) to configure
 * shared tooltip behavior like delay duration.
 *
 * Should be placed near the root of your app, or around any section
 * that uses tooltips.
 *
 * @example
 * ```tsx
 * <TooltipProvider delayDuration={200}>
 *   <App />
 * </TooltipProvider>
 * ```
 */
export function TooltipProvider({
  children,
  delayDuration = 300,
  skipDelayDuration = 100,
  ...rest
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      {...rest}
    >
      {children}
    </TooltipPrimitive.Provider>
  );
}

TooltipProvider.displayName = "TooltipProvider";

// ---------------------------------------------------------------------------
// TooltipContent — the styled content (internal)
// ---------------------------------------------------------------------------

const TooltipContent = forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    showArrow?: boolean;
    maxWidth?: number;
  }
>(function TooltipContent(
  {
    className,
    showArrow = true,
    maxWidth = 220,
    sideOffset = 6,
    children,
    ...rest
  },
  ref,
) {
  const shouldReduce = useReducedMotion();

  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      asChild
      {...rest}
    >
      <motion.div
        className={cn(
          // Layout
          "z-[var(--z-tooltip)]",
          "px-3 py-1.5",
          "overflow-hidden",
          // Visual
          "rounded-md",
          "border border-border",
          "bg-foreground text-background",
          "shadow-md",
          // Typography
          "text-xs leading-4",
          className,
        )}
        style={{ maxWidth }}
        variants={shouldReduce ? undefined : fadeInFast.variants}
        initial={shouldReduce ? { opacity: 0 } : "initial"}
        animate={shouldReduce ? { opacity: 1 } : "animate"}
        exit={shouldReduce ? { opacity: 0 } : "exit"}
        transition={shouldReduce ? { duration: 0.1 } : fadeInFast.transition}
        data-ds=""
        data-ds-component="tooltip"
        data-ds-animated=""
      >
        {children}
        {showArrow && (
          <TooltipPrimitive.Arrow
            className="fill-foreground"
            width={8}
            height={4}
          />
        )}
      </motion.div>
    </TooltipPrimitive.Content>
  );
});

TooltipContent.displayName = "TooltipContent";

// ---------------------------------------------------------------------------
// Tooltip — Main Component
// ---------------------------------------------------------------------------

/**
 * Tooltip — a small popup that displays informative text when hovering
 * or focusing on a trigger element.
 *
 * Built on Radix UI's Tooltip primitive for full accessibility. The tooltip
 * appears after a configurable delay and supports keyboard access.
 *
 * Accessibility:
 *   - Radix handles `role="tooltip"` and `aria-describedby` automatically
 *   - Opens on hover and focus, closes on blur and Escape
 *   - Keyboard accessible: focusable triggers show the tooltip
 *   - Content is announced by screen readers
 *
 * @example
 * ```tsx
 * // Basic usage (wrap app in TooltipProvider first)
 * <Tooltip content="Save your changes">
 *   <button>Save</button>
 * </Tooltip>
 *
 * // With side placement
 * <Tooltip content="More options" side="right">
 *   <button>⋮</button>
 * </Tooltip>
 *
 * // Without arrow
 * <Tooltip content="Delete" arrow={false}>
 *   <button>🗑️</button>
 * </Tooltip>
 *
 * // Custom max width
 * <Tooltip content="This is a longer tooltip that needs more space" maxWidth={300}>
 *   <span>Hover me</span>
 * </Tooltip>
 *
 * // Controlled
 * <Tooltip content="Info" open={isOpen} onOpenChange={setIsOpen}>
 *   <button>i</button>
 * </Tooltip>
 * ```
 */
export const Tooltip = forwardRef<HTMLButtonElement, TooltipProps>(
  function Tooltip(
    {
      content,
      children,
      side = "top",
      align = "center",
      sideOffset = 6,
      arrow = true,
      maxWidth = 220,
      delayDuration,
      open,
      onOpenChange,
      contentClassName,
    },
    _ref,
  ) {
    // Don't render tooltip if there's no content
    if (!content) {
      return <>{children}</>;
    }

    return (
      <TooltipPrimitive.Root
        open={open}
        onOpenChange={onOpenChange}
        delayDuration={delayDuration}
      >
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          <TooltipContent
            side={side}
            align={align}
            sideOffset={sideOffset}
            showArrow={arrow}
            maxWidth={maxWidth}
            className={contentClassName}
          >
            {content}
          </TooltipContent>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    );
  },
);

Tooltip.displayName = "Tooltip";
