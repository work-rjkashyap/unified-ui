"use client";

// ============================================================================
// Unified UI — Drawer Component
// ============================================================================
// A bottom drawer component built on vaul (https://vaul.emilkowal.ski/) and
// the Unified UI token layer. Uses CVA for variant composition and
// tailwind-merge (via cn) for safe class merging.
//
// Features:
//   - Built on vaul for native-feeling drag-to-dismiss
//   - 3 snap points support (configurable)
//   - 4 sizes: sm (30vh), md (50vh), lg (75vh), full (100vh)
//   - Overlay backdrop with fade animation
//   - Slide-up animation with spring physics
//   - Handle indicator for drag affordance
//   - Close on Escape, drag down, or overlay click
//   - Focus trap when open
//   - Scroll lock on body
//   - Full ref forwarding
//   - WCAG AA accessible: focus ring, aria attributes, keyboard nav
//   - Composable slot components: DrawerHeader, DrawerBody, DrawerFooter
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import {
//     Drawer, DrawerTrigger, DrawerContent,
//     DrawerHeader, DrawerBody, DrawerFooter,
//     DrawerTitle, DrawerDescription, DrawerClose,
//     DrawerHandle,
//   } from "@work-rjkashyap/unified-ui/components";
//
//   <Drawer>
//     <DrawerTrigger asChild>
//       <Button>Open Drawer</Button>
//     </DrawerTrigger>
//     <DrawerContent>
//       <DrawerHandle />
//       <DrawerHeader>
//         <DrawerTitle>Edit Profile</DrawerTitle>
//         <DrawerDescription>Make changes to your profile.</DrawerDescription>
//       </DrawerHeader>
//       <DrawerBody>
//         <p>Drawer body content here…</p>
//       </DrawerBody>
//       <DrawerFooter>
//         <Button>Save</Button>
//         <DrawerClose asChild>
//           <Button variant="secondary">Cancel</Button>
//         </DrawerClose>
//       </DrawerFooter>
//     </DrawerContent>
//   </Drawer>
// ============================================================================

import { cva } from "class-variance-authority";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/cn";

// ---------------------------------------------------------------------------
// CVA Variant Definitions
// ---------------------------------------------------------------------------

export const drawerContentVariants = cva(
  [
    // Positioning — vaul handles the transform; we set the shell styles
    "fixed inset-x-0 bottom-0",
    // Z-index
    "z-[var(--z-modal)]",
    // Layout
    "flex flex-col",
    // Visual
    "rounded-t-lg",
    "border border-b-0 border-border",
    "bg-background",
    "shadow-xl",
    // Focus
    "outline-none",
  ],
  {
    variants: {
      size: {
        sm: "max-h-[30vh]",
        md: "max-h-[50vh]",
        lg: "max-h-[75vh]",
        full: "max-h-[calc(100vh-2rem)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type DrawerSize = "sm" | "md" | "lg" | "full";

export interface DrawerProps {
  children: ReactNode;
  /**
   * Whether the drawer should scale the background content when open.
   * Requires `[vaul-drawer-wrapper]` attribute on your app wrapper element.
   * @default true
   */
  shouldScaleBackground?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Whether the drawer starts open. */
  defaultOpen?: boolean;
  /** Whether to dismiss on outside click. @default true */
  dismissible?: boolean;
  /** Direction the drawer opens from. @default "bottom" */
  direction?: "top" | "bottom" | "left" | "right";
  /** Whether to nest inside another drawer. */
  nested?: boolean;
  /** Whether to block body scroll when drawer is open. @default true */
  modal?: boolean;
  /** Called when drawer is closed. */
  onClose?: () => void;
}

export interface DrawerTriggerProps
  extends ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger> {
  className?: string;
}

export interface DrawerContentProps
  extends Omit<
    ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>,
    "asChild"
  > {
  /** Controls the maximum height of the drawer. @default "md" */
  size?: DrawerSize;
  /** Whether to show the drag handle at the top. @default true */
  showHandle?: boolean;
  /** Extra classes for the overlay backdrop. */
  overlayClassName?: string;
  className?: string;
  children: ReactNode;
}

export interface DrawerHandleProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export interface DrawerBodyProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export interface DrawerTitleProps
  extends ComponentPropsWithoutRef<typeof DrawerPrimitive.Title> {
  className?: string;
  children: ReactNode;
}

export interface DrawerDescriptionProps
  extends ComponentPropsWithoutRef<typeof DrawerPrimitive.Description> {
  className?: string;
  children: ReactNode;
}

export interface DrawerCloseProps
  extends ComponentPropsWithoutRef<typeof DrawerPrimitive.Close> {
  className?: string;
}

// ---------------------------------------------------------------------------
// Drawer Root
// ---------------------------------------------------------------------------

/**
 * Drawer — a bottom sheet with drag-to-dismiss interaction.
 *
 * Wraps vaul's `Drawer.Root` with sensible defaults for the Unified UI
 * design system. Set `shouldScaleBackground` to control whether the
 * background content scales down when the drawer opens (requires the
 * `[vaul-drawer-wrapper]` attribute on your app wrapper).
 */
export function Drawer({
  shouldScaleBackground = true,
  children,
  ...rest
}: DrawerProps) {
  return (
    <DrawerPrimitive.Root
      shouldScaleBackground={shouldScaleBackground}
      {...rest}
    >
      {children}
    </DrawerPrimitive.Root>
  );
}
Drawer.displayName = "Drawer";

// ---------------------------------------------------------------------------
// DrawerTrigger
// ---------------------------------------------------------------------------

export const DrawerTrigger = forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Trigger>,
  DrawerTriggerProps
>(function DrawerTrigger({ className, ...rest }, ref) {
  return (
    <DrawerPrimitive.Trigger
      ref={ref}
      className={className}
      data-ds=""
      data-ds-component="drawer-trigger"
      {...rest}
    />
  );
});
DrawerTrigger.displayName = "DrawerTrigger";

// ---------------------------------------------------------------------------
// Drawer Overlay (Internal)
// ---------------------------------------------------------------------------

const DrawerOverlay = forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(function DrawerOverlay({ className, ...rest }, ref) {
  return (
    <DrawerPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0",
        "z-[var(--z-overlay)]",
        "bg-black/50",
        className,
      )}
      {...rest}
    />
  );
});
DrawerOverlay.displayName = "DrawerOverlay";

// ---------------------------------------------------------------------------
// DrawerHandle
// ---------------------------------------------------------------------------

/**
 * A visual drag handle rendered at the top of the drawer content.
 * Provides a clear affordance that the drawer can be dragged to dismiss.
 */
export function DrawerHandle({ className, ...rest }: DrawerHandleProps) {
  return (
    <div
      className={cn("mx-auto mt-4 mb-2 flex justify-center", className)}
      data-ds=""
      data-ds-component="drawer-handle"
      {...rest}
    >
      <div className="h-1.5 w-12 rounded-full bg-muted-foreground/25" />
    </div>
  );
}
DrawerHandle.displayName = "DrawerHandle";

// ---------------------------------------------------------------------------
// DrawerContent
// ---------------------------------------------------------------------------

export const DrawerContent = forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(function DrawerContent(
  {
    size = "md",
    showHandle = true,
    overlayClassName,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerOverlay className={overlayClassName} />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn("not-prose", drawerContentVariants({ size }), className)}
        data-ds=""
        data-ds-component="drawer"
        data-ds-size={size}
        {...rest}
      >
        {showHandle && <DrawerHandle />}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  );
});
DrawerContent.displayName = "DrawerContent";

// ---------------------------------------------------------------------------
// DrawerHeader / DrawerBody / DrawerFooter
// ---------------------------------------------------------------------------

export function DrawerHeader({
  className,
  children,
  ...rest
}: DrawerHeaderProps) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 px-6 pt-4 pb-2", className)}
      data-ds=""
      data-ds-component="drawer-header"
      {...rest}
    >
      {children}
    </div>
  );
}
DrawerHeader.displayName = "DrawerHeader";

export function DrawerBody({ className, children, ...rest }: DrawerBodyProps) {
  return (
    <div
      className={cn("flex-1 overflow-y-auto px-6 py-4", className)}
      data-ds=""
      data-ds-component="drawer-body"
      {...rest}
    >
      {children}
    </div>
  );
}
DrawerBody.displayName = "DrawerBody";

export function DrawerFooter({
  className,
  children,
  ...rest
}: DrawerFooterProps) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 px-6 pb-6 pt-2 sm:flex-row sm:justify-end",
        className,
      )}
      data-ds=""
      data-ds-component="drawer-footer"
      {...rest}
    >
      {children}
    </div>
  );
}
DrawerFooter.displayName = "DrawerFooter";

// ---------------------------------------------------------------------------
// DrawerTitle / DrawerDescription
// ---------------------------------------------------------------------------

export const DrawerTitle = forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Title>,
  DrawerTitleProps
>(function DrawerTitle({ className, children, ...rest }, ref) {
  return (
    <DrawerPrimitive.Title
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-6 text-foreground",
        className,
      )}
      data-ds=""
      data-ds-component="drawer-title"
      {...rest}
    >
      {children}
    </DrawerPrimitive.Title>
  );
});
DrawerTitle.displayName = "DrawerTitle";

export const DrawerDescription = forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Description>,
  DrawerDescriptionProps
>(function DrawerDescription({ className, children, ...rest }, ref) {
  return (
    <DrawerPrimitive.Description
      ref={ref}
      className={cn("text-sm leading-5 text-muted-foreground", className)}
      data-ds=""
      data-ds-component="drawer-description"
      {...rest}
    >
      {children}
    </DrawerPrimitive.Description>
  );
});
DrawerDescription.displayName = "DrawerDescription";

// ---------------------------------------------------------------------------
// DrawerClose
// ---------------------------------------------------------------------------

export const DrawerClose = forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Close>,
  DrawerCloseProps
>(function DrawerClose({ className, ...rest }, ref) {
  return (
    <DrawerPrimitive.Close
      ref={ref}
      className={className}
      data-ds=""
      data-ds-component="drawer-close"
      {...rest}
    />
  );
});
DrawerClose.displayName = "DrawerClose";
