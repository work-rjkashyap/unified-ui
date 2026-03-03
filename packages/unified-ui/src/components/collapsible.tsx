"use client";

// ============================================================================
// Unified UI — Collapsible Component
// ============================================================================
// An animated show/hide section built on Radix UI's Collapsible primitive
// and Framer Motion for smooth height transitions. This is a foundational
// building block used by Sidebar, TreeView, and other expandable components.
//
// Features:
//   - Built on @radix-ui/react-collapsible for accessibility
//   - Smooth animated height expansion/collapse via Framer Motion
//   - Respects prefers-reduced-motion
//   - Controlled and uncontrolled modes
//   - Full ref forwarding
//   - WCAG AA accessible: aria-expanded, aria-controls, keyboard toggle
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import {
//     Collapsible, CollapsibleTrigger, CollapsibleContent
//   } from "@/design-system/components/collapsible";
//
//   <Collapsible>
//     <CollapsibleTrigger asChild>
//       <Button variant="ghost">Toggle</Button>
//     </CollapsibleTrigger>
//     <CollapsibleContent>
//       <p>Collapsible content goes here.</p>
//     </CollapsibleContent>
//   </Collapsible>
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import {
  type ComponentPropsWithoutRef,
  createContext,
  forwardRef,
  type ReactNode,
  useCallback,
  useContext,
  useId,
  useState,
} from "react";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
// Internal context to share open state with CollapsibleContent so it can
// coordinate its AnimatePresence enter/exit animations.
// ---------------------------------------------------------------------------

interface CollapsibleContextValue {
  open: boolean;
  contentId: string;
}

const CollapsibleContext = createContext<CollapsibleContextValue>({
  open: false,
  contentId: "",
});

function useCollapsibleContext() {
  return useContext(CollapsibleContext);
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CollapsibleProps
  extends Omit<
    ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>,
    "asChild"
  > {
  /**
   * Whether the collapsible is expanded.
   * When provided, the component is controlled.
   */
  open?: boolean;

  /**
   * Default open state for uncontrolled mode.
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback fired when the open state changes.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Whether the collapsible is disabled.
   * When disabled, the trigger cannot be interacted with.
   * @default false
   */
  disabled?: boolean;

  /** Content to render inside the collapsible root. */
  children: ReactNode;

  /** Additional CSS classes to merge on the root element. */
  className?: string;
}

export interface CollapsibleTriggerProps
  extends ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger> {
  /** Additional CSS classes to merge. */
  className?: string;
}

export interface CollapsibleContentProps
  extends Omit<
    ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>,
    "asChild" | "forceMount"
  > {
  /**
   * Duration of the expand/collapse animation in seconds.
   * @default 0.2
   */
  duration?: number;

  /**
   * Whether to force-mount the content in the DOM even when collapsed.
   * Useful for SEO or when you need to measure the content.
   * @default false
   */
  forceMount?: boolean;

  /** Additional CSS classes to merge on the content wrapper. */
  className?: string;

  /** Content to render inside the collapsible section. */
  children: ReactNode;
}

// ---------------------------------------------------------------------------
// Motion Config
// ---------------------------------------------------------------------------

const collapseTransition = {
  duration: 0.2,
  ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
};

const reducedMotionTransition = {
  duration: 0.01,
  ease: "linear" as const,
};

// ---------------------------------------------------------------------------
// Collapsible Root
// ---------------------------------------------------------------------------

/**
 * Collapsible — an animated show/hide section.
 *
 * Built on Radix UI's Collapsible primitive for accessibility and Framer
 * Motion for smooth height animations. The root component manages the
 * open/closed state and provides context to child components.
 *
 * Accessibility:
 *   - Radix handles `aria-expanded` on the trigger
 *   - Radix handles `aria-controls` linking trigger → content
 *   - Keyboard: Space/Enter toggles the collapsible
 *   - Disabled state prevents interaction
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Collapsible>
 *   <CollapsibleTrigger asChild>
 *     <Button variant="ghost">Show more</Button>
 *   </CollapsibleTrigger>
 *   <CollapsibleContent>
 *     <p>Hidden content revealed on toggle.</p>
 *   </CollapsibleContent>
 * </Collapsible>
 *
 * // Controlled
 * <Collapsible open={isOpen} onOpenChange={setIsOpen}>
 *   <CollapsibleTrigger asChild>
 *     <Button variant="ghost">
 *       {isOpen ? "Hide" : "Show"} details
 *     </Button>
 *   </CollapsibleTrigger>
 *   <CollapsibleContent>
 *     <p>Controlled collapsible content.</p>
 *   </CollapsibleContent>
 * </Collapsible>
 *
 * // Default open
 * <Collapsible defaultOpen>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>
 *     <p>This content is visible by default.</p>
 *   </CollapsibleContent>
 * </Collapsible>
 * ```
 */
export function Collapsible({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  className,
  children,
  ...rest
}: CollapsibleProps) {
  const contentId = useId();

  // Track internal open state for AnimatePresence coordination
  const isControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isControlled ? openProp : internalOpen;

  const handleOpenChange = useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setInternalOpen(value);
      }
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange],
  );

  return (
    <CollapsibleContext.Provider value={{ open, contentId }}>
      <CollapsiblePrimitive.Root
        open={open}
        onOpenChange={handleOpenChange}
        disabled={disabled}
        className={cn(className)}
        data-ds=""
        data-ds-component="collapsible"
        {...(open ? { "data-ds-open": "" } : {})}
        {...rest}
      >
        {children}
      </CollapsiblePrimitive.Root>
    </CollapsibleContext.Provider>
  );
}
Collapsible.displayName = "Collapsible";

// ---------------------------------------------------------------------------
// CollapsibleTrigger
// ---------------------------------------------------------------------------

/**
 * CollapsibleTrigger — the button that toggles the collapsible open/closed.
 *
 * Use `asChild` to render your own trigger element (e.g., a Button)
 * instead of the default `<button>`.
 *
 * @example
 * ```tsx
 * <CollapsibleTrigger asChild>
 *   <Button variant="ghost" size="sm">
 *     <ChevronDown className="size-4" />
 *     Toggle section
 *   </Button>
 * </CollapsibleTrigger>
 * ```
 */
export const CollapsibleTrigger = forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.Trigger>,
  CollapsibleTriggerProps
>(function CollapsibleTrigger({ className, ...rest }, ref) {
  return (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      className={cn(className)}
      data-ds=""
      data-ds-component="collapsible-trigger"
      {...rest}
    />
  );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";

// ---------------------------------------------------------------------------
// Animated Content Wrapper (Internal)
// ---------------------------------------------------------------------------
// Uses Framer Motion to animate height from 0 to "auto" with overflow
// hidden during the animation. This creates a smooth expand/collapse
// effect that respects the natural content height.
// ---------------------------------------------------------------------------

const MotionDiv = motion.div;

function AnimatedCollapsibleInner({
  duration = 0.2,
  className,
  children,
}: {
  duration?: number;
  className?: string;
  children: ReactNode;
}) {
  const prefersReduced = useReducedMotion();
  const transition = prefersReduced
    ? reducedMotionTransition
    : { ...collapseTransition, duration };

  return (
    <MotionDiv
      initial={{ height: 0, opacity: 0, overflow: "hidden" }}
      animate={{
        height: "auto",
        opacity: 1,
        overflow: "hidden",
        transitionEnd: { overflow: "visible" },
      }}
      exit={{ height: 0, opacity: 0, overflow: "hidden" }}
      transition={transition}
      className={cn(className)}
      data-ds=""
      data-ds-component="collapsible-content"
    >
      {children}
    </MotionDiv>
  );
}

// ---------------------------------------------------------------------------
// CollapsibleContent
// ---------------------------------------------------------------------------

/**
 * CollapsibleContent — the content section that expands/collapses.
 *
 * Uses Framer Motion's AnimatePresence for enter/exit animations.
 * The content smoothly animates its height from 0 to auto when opening,
 * and from auto to 0 when closing. Overflow is hidden during the
 * animation to prevent content from being visible outside the bounds.
 *
 * The `forceMount` prop can be used to keep the content in the DOM
 * even when collapsed (useful for SEO or measurement purposes). When
 * force-mounted and collapsed, the content is visually hidden with
 * `height: 0` and `overflow: hidden`.
 *
 * @example
 * ```tsx
 * <CollapsibleContent>
 *   <div className="p-4">
 *     <p>This content animates in and out.</p>
 *   </div>
 * </CollapsibleContent>
 *
 * // Custom animation duration
 * <CollapsibleContent duration={0.3}>
 *   <p>Slower animation.</p>
 * </CollapsibleContent>
 *
 * // Force mounted (always in DOM)
 * <CollapsibleContent forceMount>
 *   <p>Always in the DOM, visually hidden when collapsed.</p>
 * </CollapsibleContent>
 * ```
 */
export const CollapsibleContent = forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(function CollapsibleContent(
  { duration = 0.2, forceMount = false, className, children, ...rest },
  ref,
) {
  const { open } = useCollapsibleContext();

  // When forceMount is true, we use Radix's forceMount to keep the
  // content in the DOM, and use AnimatePresence to handle animation.
  // When forceMount is false, AnimatePresence handles mount/unmount.

  if (forceMount) {
    return (
      <CollapsiblePrimitive.Content forceMount ref={ref} {...rest}>
        <AnimatePresence initial={false}>
          {open && (
            <AnimatedCollapsibleInner duration={duration} className={className}>
              {children}
            </AnimatedCollapsibleInner>
          )}
        </AnimatePresence>
        {/* When collapsed and force-mounted, render hidden placeholder */}
        {!open && (
          <div style={{ height: 0, overflow: "hidden" }} aria-hidden="true" />
        )}
      </CollapsiblePrimitive.Content>
    );
  }

  return (
    <AnimatePresence initial={false}>
      {open && (
        <CollapsiblePrimitive.Content forceMount ref={ref} {...rest}>
          <AnimatedCollapsibleInner duration={duration} className={className}>
            {children}
          </AnimatedCollapsibleInner>
        </CollapsiblePrimitive.Content>
      )}
    </AnimatePresence>
  );
});
CollapsibleContent.displayName = "CollapsibleContent";

// ---------------------------------------------------------------------------
// Re-export context hook for advanced usage
// ---------------------------------------------------------------------------

export { useCollapsibleContext };
