"use client";

// ============================================================================
// Unified UI — Sheet Component
// ============================================================================
// A slide-in panel (drawer) component built on Radix UI's Dialog primitive
// and the Unified UI token layer. Uses CVA for variant composition and
// tailwind-merge (via cn) for safe class merging.
//
// Features:
//   - Built on @radix-ui/react-dialog for full accessibility
//   - Side: left, right, top, bottom
//   - Sizes: sm (320px), md (420px), lg (560px)
//   - Overlay backdrop with fade animation
//   - Slide-in animation per side direction
//   - Close button, Escape to close
//   - Focus trap (Radix handles this)
//   - Scroll lock on body
//   - Full ref forwarding
//   - WCAG AA accessible: focus ring, aria attributes, keyboard nav
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetClose } from "@/design-system/components/sheet";
//
//   <Sheet>
//     <SheetTrigger asChild>
//       <Button>Open Sheet</Button>
//     </SheetTrigger>
//     <SheetContent side="right">
//       <SheetHeader>
//         <SheetTitle>Sheet Title</SheetTitle>
//         <SheetDescription>Sheet description text.</SheetDescription>
//       </SheetHeader>
//       <div>Body content</div>
//       <SheetFooter>
//         <SheetClose asChild>
//           <Button variant="secondary">Cancel</Button>
//         </SheetClose>
//         <Button>Save</Button>
//       </SheetFooter>
//     </SheetContent>
//   </Sheet>
// ============================================================================

import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Dialog as DialogPrimitive } from "radix-ui";
import {
  type ComponentPropsWithoutRef,
  createContext,
  forwardRef,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { cn } from "@/lib/cn";
import { focusRingClasses } from "@/lib/focus-ring";
import {
  overlayBackdrop,
  slidePanelBottom,
  slidePanelLeft,
  slidePanelRight,
  slidePanelTop,
} from "@/lib/motion";

// ---------------------------------------------------------------------------
// CVA Variant Definitions
// ---------------------------------------------------------------------------

export const sheetContentVariants = cva(
  [
    // Layout
    "fixed flex flex-col",
    // Z-index — same as dialog/modal
    "z-[var(--z-modal)]",
    // Visual
    "bg-background",
    "border-border",
    "shadow-xl",
    // Focus
    "outline-none",
    // Note: Animation is handled by Framer Motion (overlayBackdrop + slidePanel presets).
    // CSS animation classes removed in favour of FM spring physics.
  ],
  {
    variants: {
      side: {
        /**
         * Left — slides in from the left edge.
         */
        left: ["inset-y-0 left-0", "border-r"],

        /**
         * Right — slides in from the right edge (most common).
         */
        right: ["inset-y-0 right-0", "border-l"],

        /**
         * Top — slides in from the top edge.
         */
        top: ["inset-x-0 top-0", "border-b"],

        /**
         * Bottom — slides in from the bottom edge.
         */
        bottom: ["inset-x-0 bottom-0", "border-t"],
      },

      size: {
        /**
         * Small — compact panel (320px).
         * Good for navigation menus, simple forms.
         */
        sm: "",

        /**
         * Medium — default size (420px).
         * Good for settings panels, detail views.
         */
        md: "",

        /**
         * Large — wide panel (560px).
         * Good for complex forms, preview panels.
         */
        lg: "",
      },
    },
    compoundVariants: [
      // Horizontal sheets (left/right) — width-based sizing
      {
        side: "left",
        size: "sm",
        className: "w-[320px] max-w-[calc(100vw-2rem)]",
      },
      {
        side: "left",
        size: "md",
        className: "w-[420px] max-w-[calc(100vw-2rem)]",
      },
      {
        side: "left",
        size: "lg",
        className: "w-[560px] max-w-[calc(100vw-2rem)]",
      },
      {
        side: "right",
        size: "sm",
        className: "w-[320px] max-w-[calc(100vw-2rem)]",
      },
      {
        side: "right",
        size: "md",
        className: "w-[420px] max-w-[calc(100vw-2rem)]",
      },
      {
        side: "right",
        size: "lg",
        className: "w-[560px] max-w-[calc(100vw-2rem)]",
      },
      // Vertical sheets (top/bottom) — height-based sizing
      {
        side: "top",
        size: "sm",
        className: "h-[320px] max-h-[calc(100vh-2rem)]",
      },
      {
        side: "top",
        size: "md",
        className: "h-[420px] max-h-[calc(100vh-2rem)]",
      },
      {
        side: "top",
        size: "lg",
        className: "h-[560px] max-h-[calc(100vh-2rem)]",
      },
      {
        side: "bottom",
        size: "sm",
        className: "h-[320px] max-h-[calc(100vh-2rem)]",
      },
      {
        side: "bottom",
        size: "md",
        className: "h-[420px] max-h-[calc(100vh-2rem)]",
      },
      {
        side: "bottom",
        size: "lg",
        className: "h-[560px] max-h-[calc(100vh-2rem)]",
      },
    ],
    defaultVariants: {
      side: "right",
      size: "md",
    },
  },
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SheetSide = "left" | "right" | "top" | "bottom";
export type SheetSize = "sm" | "md" | "lg";

export interface SheetProps extends DialogPrimitive.DialogProps {
  /** Sheet children (trigger + content). */
  children: ReactNode;
}

// ---------------------------------------------------------------------------
// Internal context — shares open state for AnimatePresence exit animations
// ---------------------------------------------------------------------------

interface SheetContextValue {
  open: boolean;
}

const SheetContext = createContext<SheetContextValue>({ open: false });

function useSheetContext() {
  return useContext(SheetContext);
}

export interface SheetTriggerProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger> {
  /** Additional CSS classes. */
  className?: string;
}

export interface SheetContentProps
  extends Omit<
      ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
      "asChild"
    >,
    VariantProps<typeof sheetContentVariants> {
  /**
   * The side the sheet slides in from.
   * @default "right"
   */
  side?: SheetSide;

  /**
   * The width/height of the sheet panel.
   * @default "md"
   */
  size?: SheetSize;

  /**
   * Whether to show the default close button (X) in the top-right.
   * @default true
   */
  showClose?: boolean;

  /**
   * Additional CSS classes for the overlay backdrop.
   */
  overlayClassName?: string;

  /** Additional CSS classes for the content panel. */
  className?: string;

  /** The sheet body content. */
  children: ReactNode;
}

export interface SheetHeaderProps {
  /** Additional CSS classes. */
  className?: string;
  children: ReactNode;
}

export interface SheetFooterProps {
  /** Additional CSS classes. */
  className?: string;
  children: ReactNode;
}

export interface SheetTitleProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
  /** Additional CSS classes. */
  className?: string;
  children: ReactNode;
}

export interface SheetDescriptionProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {
  /** Additional CSS classes. */
  className?: string;
  children: ReactNode;
}

export interface SheetCloseProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Close> {
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
// Sheet — Root
// ---------------------------------------------------------------------------

/**
 * Sheet — a slide-in panel overlaying the main content.
 *
 * This is a thin wrapper around Radix UI's Dialog.Root.
 *
 * @example
 * ```tsx
 * <Sheet>
 *   <SheetTrigger asChild>
 *     <Button>Open</Button>
 *   </SheetTrigger>
 *   <SheetContent>Panel content</SheetContent>
 * </Sheet>
 * ```
 */
export function Sheet({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  ...rest
}: SheetProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  return (
    <SheetContext.Provider value={{ open }}>
      <DialogPrimitive.Root
        open={open}
        onOpenChange={handleOpenChange}
        {...rest}
      >
        {children}
      </DialogPrimitive.Root>
    </SheetContext.Provider>
  );
}

Sheet.displayName = "Sheet";

// ---------------------------------------------------------------------------
// SheetTrigger
// ---------------------------------------------------------------------------

/**
 * SheetTrigger — the element that opens the sheet.
 *
 * Use `asChild` to compose with your own button/element.
 *
 * @example
 * ```tsx
 * <SheetTrigger asChild>
 *   <Button variant="secondary">Open Panel</Button>
 * </SheetTrigger>
 * ```
 */
export const SheetTrigger = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Trigger>,
  SheetTriggerProps
>(function SheetTrigger({ className, ...rest }, ref) {
  return (
    <DialogPrimitive.Trigger
      ref={ref}
      className={className}
      data-ds=""
      data-ds-component="sheet-trigger"
      {...rest}
    />
  );
});

SheetTrigger.displayName = "SheetTrigger";

// ---------------------------------------------------------------------------
// Sheet Overlay (Internal)
// ---------------------------------------------------------------------------

const SheetOverlay = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function SheetOverlay({ className, ...rest }, ref) {
  const shouldReduce = useReducedMotion();
  return (
    <DialogPrimitive.Overlay ref={ref} forceMount asChild {...rest}>
      <motion.div
        className={cn(
          "fixed inset-0",
          "z-[var(--z-overlay)]",
          "bg-black/50",
          className,
        )}
        variants={shouldReduce ? undefined : overlayBackdrop.variants}
        initial={shouldReduce ? { opacity: 0 } : "initial"}
        animate={shouldReduce ? { opacity: 1 } : "animate"}
        exit={shouldReduce ? { opacity: 0 } : "exit"}
        transition={
          shouldReduce ? { duration: 0.15 } : overlayBackdrop.transition
        }
        data-ds-animated=""
      />
    </DialogPrimitive.Overlay>
  );
});

SheetOverlay.displayName = "SheetOverlay";

// ---------------------------------------------------------------------------
// Side → motion preset mapping
// ---------------------------------------------------------------------------

const sidePresetMap = {
  left: slidePanelLeft,
  right: slidePanelRight,
  top: slidePanelTop,
  bottom: slidePanelBottom,
} as const;

// ---------------------------------------------------------------------------
// SheetContent
// ---------------------------------------------------------------------------

/**
 * SheetContent — the sliding panel that appears over the page.
 *
 * Built on Radix UI Dialog.Content with the design system's token layer.
 * All colors, radii, spacing, shadows, and z-index come from CSS custom
 * properties defined in design-system.css.
 *
 * Accessibility:
 *   - Radix manages focus trap and restoration
 *   - Escape key closes the sheet
 *   - Overlay click closes the sheet
 *   - Proper ARIA attributes (dialog role)
 *   - Scroll lock on body while open
 *
 * @example
 * ```tsx
 * // Right-side sheet (default)
 * <SheetContent>
 *   <SheetHeader>
 *     <SheetTitle>Settings</SheetTitle>
 *     <SheetDescription>Manage your preferences.</SheetDescription>
 *   </SheetHeader>
 *   <div className="flex-1 overflow-y-auto py-4">
 *     Content here
 *   </div>
 *   <SheetFooter>
 *     <Button>Save Changes</Button>
 *   </SheetFooter>
 * </SheetContent>
 *
 * // Left-side navigation
 * <SheetContent side="left" size="sm">
 *   <nav>Navigation items</nav>
 * </SheetContent>
 *
 * // Bottom drawer
 * <SheetContent side="bottom" size="sm">
 *   <p>Bottom sheet content</p>
 * </SheetContent>
 * ```
 */
export const SheetContent = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(function SheetContent(
  {
    side = "right",
    size = "md",
    showClose = true,
    overlayClassName,
    className,
    children,
    ...rest
  },
  ref,
) {
  const shouldReduce = useReducedMotion();
  const { open } = useSheetContext();
  const preset = sidePresetMap[side];

  return (
    <DialogPrimitive.Portal forceMount>
      <AnimatePresence>
        {open && (
          <>
            <SheetOverlay className={overlayClassName} />
            <DialogPrimitive.Content ref={ref} forceMount asChild {...rest}>
              <motion.div
                className={cn(
                  "not-prose",
                  sheetContentVariants({ side, size }),
                  className,
                )}
                variants={shouldReduce ? undefined : preset.variants}
                initial={shouldReduce ? { opacity: 0 } : "initial"}
                animate={shouldReduce ? { opacity: 1 } : "animate"}
                exit={shouldReduce ? { opacity: 0 } : "exit"}
                transition={
                  shouldReduce ? { duration: 0.2 } : preset.transition
                }
                data-ds=""
                data-ds-component="sheet"
                data-ds-side={side}
                data-ds-size={size}
                data-ds-animated=""
              >
                {children}

                {showClose && (
                  <DialogPrimitive.Close
                    className={cn(
                      "absolute right-4 top-4",
                      "inline-flex items-center justify-center",
                      "rounded-sm p-1",
                      "text-muted-foreground hover:text-foreground",
                      "transition-colors duration-fast",
                      focusRingClasses,
                    )}
                    aria-label="Close"
                  >
                    <CloseIcon className="size-4" />
                  </DialogPrimitive.Close>
                )}
              </motion.div>
            </DialogPrimitive.Content>
          </>
        )}
      </AnimatePresence>
    </DialogPrimitive.Portal>
  );
});

SheetContent.displayName = "SheetContent";

// ---------------------------------------------------------------------------
// SheetHeader
// ---------------------------------------------------------------------------

/**
 * SheetHeader — layout component for the sheet title and description.
 *
 * @example
 * ```tsx
 * <SheetHeader>
 *   <SheetTitle>Edit Profile</SheetTitle>
 *   <SheetDescription>Make changes to your profile.</SheetDescription>
 * </SheetHeader>
 * ```
 */
export function SheetHeader({ className, children }: SheetHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 px-6 py-4",
        "border-b border-border",
        className,
      )}
      data-ds=""
      data-ds-component="sheet-header"
    >
      {children}
    </div>
  );
}

SheetHeader.displayName = "SheetHeader";

// ---------------------------------------------------------------------------
// SheetFooter
// ---------------------------------------------------------------------------

/**
 * SheetFooter — layout component for the sheet action buttons.
 *
 * @example
 * ```tsx
 * <SheetFooter>
 *   <SheetClose asChild>
 *     <Button variant="secondary">Cancel</Button>
 *   </SheetClose>
 *   <Button>Save</Button>
 * </SheetFooter>
 * ```
 */
export function SheetFooter({ className, children }: SheetFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 px-6 py-4",
        "border-t border-border",
        "mt-auto",
        className,
      )}
      data-ds=""
      data-ds-component="sheet-footer"
    >
      {children}
    </div>
  );
}

SheetFooter.displayName = "SheetFooter";

// ---------------------------------------------------------------------------
// SheetTitle
// ---------------------------------------------------------------------------

/**
 * SheetTitle — the title text of the sheet.
 *
 * Renders a Radix Dialog.Title for proper accessibility.
 *
 * @example
 * ```tsx
 * <SheetTitle>Edit Profile</SheetTitle>
 * ```
 */
export const SheetTitle = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  SheetTitleProps
>(function SheetTitle({ className, children, ...rest }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-6 text-foreground",
        className,
      )}
      data-ds=""
      data-ds-component="sheet-title"
      {...rest}
    >
      {children}
    </DialogPrimitive.Title>
  );
});

SheetTitle.displayName = "SheetTitle";

// ---------------------------------------------------------------------------
// SheetDescription
// ---------------------------------------------------------------------------

/**
 * SheetDescription — the description text below the sheet title.
 *
 * Renders a Radix Dialog.Description for proper accessibility.
 *
 * @example
 * ```tsx
 * <SheetDescription>
 *   Make changes to your profile here. Click save when you're done.
 * </SheetDescription>
 * ```
 */
export const SheetDescription = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  SheetDescriptionProps
>(function SheetDescription({ className, children, ...rest }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm leading-5 text-muted-foreground", className)}
      data-ds=""
      data-ds-component="sheet-description"
      {...rest}
    >
      {children}
    </DialogPrimitive.Description>
  );
});

SheetDescription.displayName = "SheetDescription";

// ---------------------------------------------------------------------------
// SheetClose
// ---------------------------------------------------------------------------

/**
 * SheetClose — a button that closes the sheet.
 *
 * Use `asChild` to compose with your own button component.
 *
 * @example
 * ```tsx
 * // As a standalone close button
 * <SheetClose>Close</SheetClose>
 *
 * // Composed with Button
 * <SheetClose asChild>
 *   <Button variant="secondary">Cancel</Button>
 * </SheetClose>
 * ```
 */
export const SheetClose = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Close>,
  SheetCloseProps
>(function SheetClose({ className, ...rest }, ref) {
  return (
    <DialogPrimitive.Close
      ref={ref}
      className={className}
      data-ds=""
      data-ds-component="sheet-close"
      {...rest}
    />
  );
});

SheetClose.displayName = "SheetClose";
