"use client";

// ============================================================================
// Unified UI — NavigationMenu Component
// ============================================================================
// A top-level navigation menu built on Radix UI's NavigationMenu primitive.
// Supports dropdown panels, links, icon+description items, and keyboard nav.
//
// Features:
//   - Built on radix-ui NavigationMenu for full accessibility
//   - Horizontal nav bar with animated dropdown viewports
//   - Link items with icon + title + description layout
//   - Plain link items (no submenu)
//   - Animated viewport transitions
//   - Full keyboard navigation (Tab, Arrow keys, Escape)
//   - WCAG AA accessible: aria roles, focus management, keyboard navigation
//
// All visual values come from CSS custom properties. NEVER hardcode values.
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NavigationMenuProps
  extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {
  className?: string;
}

export interface NavigationMenuListProps
  extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List> {
  className?: string;
}

export interface NavigationMenuItemProps
  extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item> {
  className?: string;
}

export interface NavigationMenuTriggerProps
  extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> {
  className?: string;
}

export interface NavigationMenuContentProps
  extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content> {
  className?: string;
}

export interface NavigationMenuLinkProps
  extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> {
  /** Whether this link represents the current page. */
  active?: boolean;
  className?: string;
}

export interface NavigationMenuViewportProps
  extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport> {
  className?: string;
}

export interface NavigationMenuIndicatorProps
  extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator> {
  className?: string;
}

/** Props for a nav link item with icon, title, and optional description. */
export interface NavigationMenuCardLinkProps {
  /** Icon rendered at the left of the card. */
  icon?: ReactNode;
  /** Title of the card link. */
  title: string;
  /** Optional short description beneath the title. */
  description?: string;
  /** The href for the link. */
  href: string;
  /** Whether this link is the current page. */
  active?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Internal icon: chevron down for trigger
// ---------------------------------------------------------------------------
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// NavigationMenu Root
// ---------------------------------------------------------------------------

/**
 * NavigationMenu — the root container for the navigation menu.
 *
 * @example
 * ```tsx
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>Products</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <ul className="grid grid-cols-2 gap-2 p-4 w-[400px]">
 *           <NavigationMenuCardLink
 *             href="/docs"
 *             title="Documentation"
 *             description="Explore the full API reference."
 *           />
 *         </ul>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *     <NavigationMenuItem>
 *       <NavigationMenuLink href="/pricing">Pricing</NavigationMenuLink>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```
 */
export const NavigationMenu = forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Root>,
  NavigationMenuProps
>(function NavigationMenu({ className, children, ...rest }, ref) {
  return (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={cn(
        "relative z-10 flex max-w-max flex-1 items-center justify-center",
        className,
      )}
      data-ds=""
      data-ds-component="navigation-menu"
      {...rest}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  );
});
NavigationMenu.displayName = "NavigationMenu";

// ---------------------------------------------------------------------------
// NavigationMenuList
// ---------------------------------------------------------------------------

/**
 * NavigationMenuList — the ordered list of top-level nav items.
 */
export const NavigationMenuList = forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.List>,
  NavigationMenuListProps
>(function NavigationMenuList({ className, ...rest }, ref) {
  return (
    <NavigationMenuPrimitive.List
      ref={ref}
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className,
      )}
      data-ds=""
      data-ds-component="navigation-menu-list"
      {...rest}
    />
  );
});
NavigationMenuList.displayName = "NavigationMenuList";

// ---------------------------------------------------------------------------
// NavigationMenuItem
// ---------------------------------------------------------------------------

/**
 * NavigationMenuItem — a single item in the navigation menu list.
 */
export const NavigationMenuItem = forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Item>,
  NavigationMenuItemProps
>(function NavigationMenuItem({ className, ...rest }, ref) {
  return (
    <NavigationMenuPrimitive.Item
      ref={ref}
      className={cn("relative", className)}
      data-ds=""
      data-ds-component="navigation-menu-item"
      {...rest}
    />
  );
});
NavigationMenuItem.displayName = "NavigationMenuItem";

// ---------------------------------------------------------------------------
// NavigationMenuTrigger
// ---------------------------------------------------------------------------

/**
 * NavigationMenuTrigger — the button that opens the dropdown content.
 * Renders with an animated chevron indicator.
 */
export const NavigationMenuTrigger = forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Trigger>,
  NavigationMenuTriggerProps
>(function NavigationMenuTrigger({ className, children, ...rest }, ref) {
  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(
        "group inline-flex h-9 w-max items-center justify-center",
        "rounded-md px-4 py-2",
        "bg-background",
        "text-sm font-medium",
        "transition-colors duration-fast ease-standard",
        "hover:bg-muted hover:text-foreground",
        "focus:bg-muted focus:text-foreground focus:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[active]:bg-muted/50",
        "data-[state=open]:bg-muted/50",
        className,
      )}
      data-ds=""
      data-ds-component="navigation-menu-trigger"
      {...rest}
    >
      {children}
      <ChevronDownIcon
        className={cn(
          "relative top-px ml-1 shrink-0 text-muted-foreground",
          "transition-transform duration-200 ease-standard",
          "group-data-[state=open]:rotate-180",
        )}
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
});
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

// ---------------------------------------------------------------------------
// NavigationMenuContent
// ---------------------------------------------------------------------------

/**
 * NavigationMenuContent — the dropdown panel that appears below the trigger.
 */
export const NavigationMenuContent = forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Content>,
  NavigationMenuContentProps
>(function NavigationMenuContent({ className, ...rest }, ref) {
  return (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cn(
        "left-0 top-0 w-full",
        "md:absolute md:w-auto",
        // Animations
        "data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in",
        "data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out",
        "data-[motion=from-end]:slide-in-from-right-52",
        "data-[motion=from-start]:slide-in-from-left-52",
        "data-[motion=to-end]:slide-out-to-right-52",
        "data-[motion=to-start]:slide-out-to-left-52",
        className,
      )}
      data-ds=""
      data-ds-component="navigation-menu-content"
      {...rest}
    />
  );
});
NavigationMenuContent.displayName = "NavigationMenuContent";

// ---------------------------------------------------------------------------
// NavigationMenuLink
// ---------------------------------------------------------------------------

/**
 * NavigationMenuLink — a plain navigation link without a dropdown.
 * Use as a direct child of NavigationMenuItem for top-level links.
 */
export const NavigationMenuLink = forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Link>,
  NavigationMenuLinkProps
>(function NavigationMenuLink({ className, active, ...rest }, ref) {
  return (
    <NavigationMenuPrimitive.Link
      ref={ref}
      active={active}
      className={cn(
        "inline-flex h-9 w-max items-center justify-center",
        "rounded-md px-4 py-2",
        "bg-background",
        "text-sm font-medium",
        "transition-colors duration-fast ease-standard",
        "hover:bg-muted hover:text-foreground",
        "focus:bg-muted focus:text-foreground focus:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[active]:bg-muted/50",
        className,
      )}
      data-ds=""
      data-ds-component="navigation-menu-link"
      {...rest}
    />
  );
});
NavigationMenuLink.displayName = "NavigationMenuLink";

// ---------------------------------------------------------------------------
// NavigationMenuViewport
// ---------------------------------------------------------------------------

/**
 * NavigationMenuViewport — the animated container that houses content panels.
 * Automatically added by NavigationMenu root; do not add manually.
 */
export const NavigationMenuViewport = forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Viewport>,
  NavigationMenuViewportProps
>(function NavigationMenuViewport({ className, ...rest }, ref) {
  return (
    <div className={cn("absolute left-0 top-full flex justify-center")}>
      <NavigationMenuPrimitive.Viewport
        ref={ref}
        className={cn(
          "origin-top-center",
          "relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)]",
          "w-full overflow-hidden rounded-md border border-border",
          "bg-background shadow-lg",
          "md:w-[var(--radix-navigation-menu-viewport-width)]",
          // Animations
          "data-[state=open]:animate-in data-[state=open]:zoom-in-90",
          "data-[state=closed]:animate-out data-[state=closed]:zoom-out-95",
          className,
        )}
        data-ds=""
        data-ds-component="navigation-menu-viewport"
        {...rest}
      />
    </div>
  );
});
NavigationMenuViewport.displayName = "NavigationMenuViewport";

// ---------------------------------------------------------------------------
// NavigationMenuIndicator
// ---------------------------------------------------------------------------

/**
 * NavigationMenuIndicator — an optional arrow indicator under the active trigger.
 */
export const NavigationMenuIndicator = forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Indicator>,
  NavigationMenuIndicatorProps
>(function NavigationMenuIndicator({ className, ...rest }, ref) {
  return (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        "data-[state=visible]:animate-in data-[state=visible]:fade-in",
        "data-[state=hidden]:animate-out data-[state=hidden]:fade-out",
        className,
      )}
      data-ds=""
      data-ds-component="navigation-menu-indicator"
      {...rest}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  );
});
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";

// ---------------------------------------------------------------------------
// NavigationMenuCardLink — compound card item for dropdown content
// ---------------------------------------------------------------------------

/**
 * NavigationMenuCardLink — a card-style link item for use inside NavigationMenuContent.
 * Renders an icon, title, and optional description in a compact layout.
 *
 * @example
 * ```tsx
 * <NavigationMenuCardLink
 *   href="/docs"
 *   icon={<BookOpen className="size-5" />}
 *   title="Documentation"
 *   description="Browse the full component API reference."
 * />
 * ```
 */
export function NavigationMenuCardLink({
  icon,
  title,
  description,
  href,
  active,
  className,
}: NavigationMenuCardLinkProps) {
  return (
    <NavigationMenuPrimitive.Link
      href={href}
      active={active}
      className={cn(
        "group block select-none space-y-1 rounded-md p-3",
        "leading-none no-underline outline-none",
        "transition-colors duration-fast ease-standard",
        "hover:bg-muted focus:bg-muted",
        "data-[active]:bg-muted/50",
        className,
      )}
      data-ds=""
      data-ds-component="navigation-menu-card-link"
    >
      <div className="flex items-center gap-2">
        {icon && (
          <span className="flex size-5 shrink-0 items-center justify-center text-foreground">
            {icon}
          </span>
        )}
        <span className="text-sm font-medium leading-none text-foreground">
          {title}
        </span>
      </div>
      {description && (
        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
          {description}
        </p>
      )}
    </NavigationMenuPrimitive.Link>
  );
}
NavigationMenuCardLink.displayName = "NavigationMenuCardLink";
