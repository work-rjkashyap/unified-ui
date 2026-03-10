"use client";

// ============================================================================
// Unified UI — ContextMenu Component
// ============================================================================
// A right-click context menu built on Radix UI's ContextMenu primitive and
// the Unified UI token layer.
//
// Features:
//   - Built on @radix-ui/react-context-menu (via radix-ui) for full accessibility
//   - Menu items: default, danger variants
//   - Icons and keyboard shortcut display
//   - Submenus with nested content
//   - Separators, labels, groups
//   - Checkbox items and radio items
//   - Triggered by right-click / long-press
//   - Full keyboard navigation (Radix handles this)
//   - WCAG AA accessible: focus ring, aria roles, keyboard navigation
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import {
//     ContextMenu, ContextMenuTrigger, ContextMenuContent,
//     ContextMenuItem, ContextMenuSeparator, ContextMenuLabel,
//     ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem,
//     ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent,
//     ContextMenuShortcut, ContextMenuGroup,
//   } from "@work-rjkashyap/unified-ui";
//
//   <ContextMenu>
//     <ContextMenuTrigger>
//       <div>Right-click me</div>
//     </ContextMenuTrigger>
//     <ContextMenuContent>
//       <ContextMenuItem>Open</ContextMenuItem>
//       <ContextMenuItem>Copy Link</ContextMenuItem>
//       <ContextMenuSeparator />
//       <ContextMenuItem variant="danger">Delete</ContextMenuItem>
//     </ContextMenuContent>
//   </ContextMenu>
// ============================================================================

import { ContextMenu as ContextMenuPrimitive } from "radix-ui";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ContextMenuProps {
  children: ReactNode;
  /** Called when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Controlled open state. */
  open?: boolean;
  /** The reading direction of submenus. */
  dir?: "ltr" | "rtl";
  /** The modality of the context menu. */
  modal?: boolean;
}

export interface ContextMenuTriggerProps
  extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Trigger> {
  /** When true, right-click event propagation is disabled. */
  disabled?: boolean;
  className?: string;
}

export interface ContextMenuContentProps
  extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content> {
  className?: string;
}

export type ContextMenuItemVariant = "default" | "danger";

export interface ContextMenuItemProps
  extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> {
  /** Visual variant of the menu item. */
  variant?: ContextMenuItemVariant;
  /** Icon rendered before the label. */
  icon?: ReactNode;
  className?: string;
}

export interface ContextMenuCheckboxItemProps
  extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem> {
  /** Whether the checkbox item is checked. */
  checked?: boolean;
  className?: string;
}

export interface ContextMenuRadioGroupProps
  extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioGroup> {
  className?: string;
}

export interface ContextMenuRadioItemProps
  extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem> {
  className?: string;
}

export interface ContextMenuLabelProps
  extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> {
  /** Whether the label should be inset (aligned with items that have icons). */
  inset?: boolean;
  className?: string;
}

export interface ContextMenuSeparatorProps
  extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator> {
  className?: string;
}

export interface ContextMenuGroupProps
  extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Group> {
  className?: string;
}

export interface ContextMenuSubProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface ContextMenuSubTriggerProps
  extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> {
  /** Whether to inset the trigger (aligned with items that have icons). */
  inset?: boolean;
  /** Icon rendered before the label. */
  icon?: ReactNode;
  className?: string;
}

export interface ContextMenuSubContentProps
  extends ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent> {
  className?: string;
}

export interface ContextMenuShortcutProps {
  children: ReactNode;
  className?: string;
}

// ---------------------------------------------------------------------------
// Internal SVG icons (keeps bundle clean — no lucide-react dependency)
// ---------------------------------------------------------------------------

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function DotIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Shared style constants
// ---------------------------------------------------------------------------

const menuItemBase = [
  "relative flex w-full cursor-pointer select-none items-center",
  "rounded-sm py-1.5 px-2",
  "text-sm leading-5 outline-none",
  "transition-colors duration-fast ease-standard",
  "focus:bg-muted",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
] as const;

const menuContentBase = [
  "z-[var(--z-dropdown)]",
  "min-w-[10rem]",
  "overflow-hidden",
  "rounded-md",
  "border border-border",
  "bg-background",
  "p-1",
  "shadow-lg",
  "text-foreground",
  // Entry animation
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
] as const;

// ---------------------------------------------------------------------------
// ContextMenu Root
// ---------------------------------------------------------------------------

/**
 * ContextMenu — provides right-click context menu functionality.
 *
 * Wrap any element with `ContextMenuTrigger` to make it the trigger target.
 * Right-clicking (or long-pressing on touch) that element opens the menu.
 *
 * @example
 * ```tsx
 * <ContextMenu>
 *   <ContextMenuTrigger>
 *     <div className="border rounded-md p-8">Right-click me</div>
 *   </ContextMenuTrigger>
 *   <ContextMenuContent>
 *     <ContextMenuItem>Open</ContextMenuItem>
 *     <ContextMenuSeparator />
 *     <ContextMenuItem variant="danger">Delete</ContextMenuItem>
 *   </ContextMenuContent>
 * </ContextMenu>
 * ```
 */
export function ContextMenu({ children, ...rest }: ContextMenuProps) {
  return (
    <ContextMenuPrimitive.Root {...rest}>{children}</ContextMenuPrimitive.Root>
  );
}
ContextMenu.displayName = "ContextMenu";

// ---------------------------------------------------------------------------
// ContextMenuTrigger
// ---------------------------------------------------------------------------

/**
 * ContextMenuTrigger — the area that triggers the context menu on right-click.
 *
 * @example
 * ```tsx
 * <ContextMenuTrigger asChild>
 *   <div className="p-4 border rounded-md">Right-click this area</div>
 * </ContextMenuTrigger>
 * ```
 */
export const ContextMenuTrigger = forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Trigger>,
  ContextMenuTriggerProps
>(function ContextMenuTrigger({ className, ...rest }, ref) {
  return (
    <ContextMenuPrimitive.Trigger
      ref={ref}
      className={cn(className)}
      data-ds=""
      data-ds-component="context-menu-trigger"
      {...rest}
    />
  );
});
ContextMenuTrigger.displayName = "ContextMenuTrigger";

// ---------------------------------------------------------------------------
// ContextMenuContent
// ---------------------------------------------------------------------------

/**
 * ContextMenuContent — the panel that contains the menu items.
 *
 * Renders inside a Portal automatically so z-index stacking is correct.
 *
 * @example
 * ```tsx
 * <ContextMenuContent>
 *   <ContextMenuItem>Cut</ContextMenuItem>
 *   <ContextMenuItem>Copy</ContextMenuItem>
 *   <ContextMenuItem>Paste</ContextMenuItem>
 * </ContextMenuContent>
 * ```
 */
export const ContextMenuContent = forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Content>,
  ContextMenuContentProps
>(function ContextMenuContent({ className, children, ...rest }, ref) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        ref={ref}
        className={cn(...menuContentBase, className)}
        data-ds=""
        data-ds-component="context-menu-content"
        {...rest}
      >
        {children}
      </ContextMenuPrimitive.Content>
    </ContextMenuPrimitive.Portal>
  );
});
ContextMenuContent.displayName = "ContextMenuContent";

// ---------------------------------------------------------------------------
// ContextMenuItem
// ---------------------------------------------------------------------------

/**
 * ContextMenuItem — a single menu item.
 *
 * Supports a `variant` prop for danger-styled destructive actions,
 * and an optional `icon` slot rendered before the label.
 *
 * @example
 * ```tsx
 * <ContextMenuItem icon={<Copy className="size-4" />}>Copy</ContextMenuItem>
 * <ContextMenuItem variant="danger" icon={<Trash2 className="size-4" />}>
 *   Delete
 * </ContextMenuItem>
 * ```
 */
export const ContextMenuItem = forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Item>,
  ContextMenuItemProps
>(function ContextMenuItem(
  { className, variant = "default", icon, children, ...rest },
  ref,
) {
  return (
    <ContextMenuPrimitive.Item
      ref={ref}
      className={cn(
        ...menuItemBase,
        variant === "danger" &&
          "text-destructive focus:bg-destructive/10 focus:text-destructive",
        className,
      )}
      data-ds=""
      data-ds-component="context-menu-item"
      data-ds-variant={variant}
      {...rest}
    >
      {icon && (
        <span className="mr-2 flex size-4 shrink-0 items-center justify-center">
          {icon}
        </span>
      )}
      {children}
    </ContextMenuPrimitive.Item>
  );
});
ContextMenuItem.displayName = "ContextMenuItem";

// ---------------------------------------------------------------------------
// ContextMenuCheckboxItem
// ---------------------------------------------------------------------------

/**
 * ContextMenuCheckboxItem — a menu item with a checkbox indicator.
 *
 * @example
 * ```tsx
 * <ContextMenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
 *   Show Grid
 * </ContextMenuCheckboxItem>
 * ```
 */
export const ContextMenuCheckboxItem = forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.CheckboxItem>,
  ContextMenuCheckboxItemProps
>(function ContextMenuCheckboxItem(
  { className, children, checked, ...rest },
  ref,
) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      className={cn(...menuItemBase, "pl-8", className)}
      data-ds=""
      data-ds-component="context-menu-checkbox-item"
      {...rest}
    >
      {/* Indicator slot */}
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className="text-foreground" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
});
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

// ---------------------------------------------------------------------------
// ContextMenuRadioGroup
// ---------------------------------------------------------------------------

/**
 * ContextMenuRadioGroup — groups radio items so only one can be selected.
 *
 * @example
 * ```tsx
 * <ContextMenuRadioGroup value={view} onValueChange={setView}>
 *   <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
 *   <ContextMenuRadioItem value="grid">Grid</ContextMenuRadioItem>
 * </ContextMenuRadioGroup>
 * ```
 */
export const ContextMenuRadioGroup = forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.RadioGroup>,
  ContextMenuRadioGroupProps
>(function ContextMenuRadioGroup({ className, ...rest }, ref) {
  return (
    <ContextMenuPrimitive.RadioGroup
      ref={ref}
      className={cn(className)}
      {...rest}
    />
  );
});
ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup";

// ---------------------------------------------------------------------------
// ContextMenuRadioItem
// ---------------------------------------------------------------------------

/**
 * ContextMenuRadioItem — a selectable radio item inside a radio group.
 *
 * @example
 * ```tsx
 * <ContextMenuRadioItem value="list">List View</ContextMenuRadioItem>
 * ```
 */
export const ContextMenuRadioItem = forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.RadioItem>,
  ContextMenuRadioItemProps
>(function ContextMenuRadioItem({ className, children, ...rest }, ref) {
  return (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      className={cn(...menuItemBase, "pl-8", className)}
      data-ds=""
      data-ds-component="context-menu-radio-item"
      {...rest}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <DotIcon className="text-foreground" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
});
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

// ---------------------------------------------------------------------------
// ContextMenuLabel
// ---------------------------------------------------------------------------

/**
 * ContextMenuLabel — a non-interactive label for grouping menu items.
 *
 * @example
 * ```tsx
 * <ContextMenuLabel>File Actions</ContextMenuLabel>
 * ```
 */
export const ContextMenuLabel = forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Label>,
  ContextMenuLabelProps
>(function ContextMenuLabel({ className, inset, ...rest }, ref) {
  return (
    <ContextMenuPrimitive.Label
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
        inset && "pl-8",
        className,
      )}
      data-ds=""
      data-ds-component="context-menu-label"
      {...rest}
    />
  );
});
ContextMenuLabel.displayName = "ContextMenuLabel";

// ---------------------------------------------------------------------------
// ContextMenuSeparator
// ---------------------------------------------------------------------------

/**
 * ContextMenuSeparator — a thin horizontal rule between menu sections.
 *
 * @example
 * ```tsx
 * <ContextMenuSeparator />
 * ```
 */
export const ContextMenuSeparator = forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Separator>,
  ContextMenuSeparatorProps
>(function ContextMenuSeparator({ className, ...rest }, ref) {
  return (
    <ContextMenuPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      data-ds=""
      data-ds-component="context-menu-separator"
      {...rest}
    />
  );
});
ContextMenuSeparator.displayName = "ContextMenuSeparator";

// ---------------------------------------------------------------------------
// ContextMenuGroup
// ---------------------------------------------------------------------------

/**
 * ContextMenuGroup — groups multiple menu items together logically.
 *
 * @example
 * ```tsx
 * <ContextMenuGroup>
 *   <ContextMenuLabel>Edit</ContextMenuLabel>
 *   <ContextMenuItem>Cut</ContextMenuItem>
 *   <ContextMenuItem>Copy</ContextMenuItem>
 * </ContextMenuGroup>
 * ```
 */
export const ContextMenuGroup = forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Group>,
  ContextMenuGroupProps
>(function ContextMenuGroup({ className, ...rest }, ref) {
  return (
    <ContextMenuPrimitive.Group ref={ref} className={cn(className)} {...rest} />
  );
});
ContextMenuGroup.displayName = "ContextMenuGroup";

// ---------------------------------------------------------------------------
// ContextMenuSub
// ---------------------------------------------------------------------------

/**
 * ContextMenuSub — a submenu root that nests inside a context menu.
 *
 * @example
 * ```tsx
 * <ContextMenuSub>
 *   <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
 *   <ContextMenuSubContent>
 *     <ContextMenuItem>Email</ContextMenuItem>
 *     <ContextMenuItem>Copy Link</ContextMenuItem>
 *   </ContextMenuSubContent>
 * </ContextMenuSub>
 * ```
 */
export function ContextMenuSub({ children, ...rest }: ContextMenuSubProps) {
  return (
    <ContextMenuPrimitive.Sub {...rest}>{children}</ContextMenuPrimitive.Sub>
  );
}
ContextMenuSub.displayName = "ContextMenuSub";

// ---------------------------------------------------------------------------
// ContextMenuSubTrigger
// ---------------------------------------------------------------------------

/**
 * ContextMenuSubTrigger — the item that opens the nested submenu on hover.
 *
 * @example
 * ```tsx
 * <ContextMenuSubTrigger icon={<Share className="size-4" />}>
 *   Share
 * </ContextMenuSubTrigger>
 * ```
 */
export const ContextMenuSubTrigger = forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.SubTrigger>,
  ContextMenuSubTriggerProps
>(function ContextMenuSubTrigger(
  { className, inset, icon, children, ...rest },
  ref,
) {
  return (
    <ContextMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        ...menuItemBase,
        "data-[state=open]:bg-muted",
        inset && "pl-8",
        className,
      )}
      data-ds=""
      data-ds-component="context-menu-sub-trigger"
      {...rest}
    >
      {icon && (
        <span className="mr-2 flex size-4 shrink-0 items-center justify-center">
          {icon}
        </span>
      )}
      {children}
      {/* Chevron pushed to the far right */}
      <ChevronRightIcon className="ml-auto text-muted-foreground" />
    </ContextMenuPrimitive.SubTrigger>
  );
});
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";

// ---------------------------------------------------------------------------
// ContextMenuSubContent
// ---------------------------------------------------------------------------

/**
 * ContextMenuSubContent — the content panel for a nested submenu.
 *
 * @example
 * ```tsx
 * <ContextMenuSubContent>
 *   <ContextMenuItem>Email link</ContextMenuItem>
 *   <ContextMenuItem>Copy link</ContextMenuItem>
 * </ContextMenuSubContent>
 * ```
 */
export const ContextMenuSubContent = forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.SubContent>,
  ContextMenuSubContentProps
>(function ContextMenuSubContent({ className, children, ...rest }, ref) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.SubContent
        ref={ref}
        className={cn(...menuContentBase, className)}
        data-ds=""
        data-ds-component="context-menu-sub-content"
        {...rest}
      >
        {children}
      </ContextMenuPrimitive.SubContent>
    </ContextMenuPrimitive.Portal>
  );
});
ContextMenuSubContent.displayName = "ContextMenuSubContent";

// ---------------------------------------------------------------------------
// ContextMenuShortcut
// ---------------------------------------------------------------------------

/**
 * ContextMenuShortcut — displays a keyboard shortcut hint aligned to the right.
 *
 * @example
 * ```tsx
 * <ContextMenuItem>
 *   Copy
 *   <ContextMenuShortcut>⌘C</ContextMenuShortcut>
 * </ContextMenuItem>
 * ```
 */
export function ContextMenuShortcut({
  className,
  children,
}: ContextMenuShortcutProps) {
  return (
    <span
      className={cn(
        "ml-auto pl-4 text-xs tracking-widest text-muted-foreground",
        className,
      )}
      data-ds=""
      data-ds-component="context-menu-shortcut"
    >
      {children}
    </span>
  );
}
ContextMenuShortcut.displayName = "ContextMenuShortcut";
