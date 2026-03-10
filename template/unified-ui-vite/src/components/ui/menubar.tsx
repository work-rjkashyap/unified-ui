"use client";

// ============================================================================
// Unified UI — Menubar Component
// ============================================================================
// A horizontal menu bar built on Radix UI's Menubar primitive.
// ============================================================================

import { Menubar as MenubarPrimitive } from "radix-ui";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MenubarProps
  extends ComponentPropsWithoutRef<typeof MenubarPrimitive.Root> {
  className?: string;
}
export interface MenubarMenuProps {
  children: ReactNode;
  value?: string;
}
export interface MenubarTriggerProps
  extends ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger> {
  className?: string;
}
export interface MenubarContentProps
  extends ComponentPropsWithoutRef<typeof MenubarPrimitive.Content> {
  className?: string;
}
export type MenubarItemVariant = "default" | "danger";
export interface MenubarItemProps
  extends ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> {
  variant?: MenubarItemVariant;
  icon?: ReactNode;
  inset?: boolean;
  className?: string;
}
export interface MenubarCheckboxItemProps
  extends ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem> {
  checked?: boolean;
  className?: string;
}
export interface MenubarRadioGroupProps
  extends ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioGroup> {
  className?: string;
}
export interface MenubarRadioItemProps
  extends ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem> {
  className?: string;
}
export interface MenubarLabelProps
  extends ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> {
  inset?: boolean;
  className?: string;
}
export interface MenubarSeparatorProps
  extends ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator> {
  className?: string;
}
export interface MenubarGroupProps
  extends ComponentPropsWithoutRef<typeof MenubarPrimitive.Group> {
  className?: string;
}
export interface MenubarSubProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export interface MenubarSubTriggerProps
  extends ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> {
  inset?: boolean;
  icon?: ReactNode;
  className?: string;
}
export interface MenubarSubContentProps
  extends ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent> {
  className?: string;
}
export interface MenubarShortcutProps {
  children: ReactNode;
  className?: string;
}

// ---------------------------------------------------------------------------
// Internal SVG icons
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
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
  "data-[side=top]:slide-in-from-bottom-2",
  "data-[side=bottom]:slide-in-from-top-2",
  "data-[side=left]:slide-in-from-right-2",
  "data-[side=right]:slide-in-from-left-2",
] as const;

// ---------------------------------------------------------------------------
// Menubar Root
// ---------------------------------------------------------------------------
export const Menubar = forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Root>,
  MenubarProps
>(function Menubar({ className, ...rest }, ref) {
  return (
    <MenubarPrimitive.Root
      ref={ref}
      className={cn(
        "flex h-9 items-center gap-1",
        "rounded-md border border-border",
        "bg-background px-1",
        "shadow-sm",
        className,
      )}
      data-ds=""
      data-ds-component="menubar"
      {...rest}
    />
  );
});
Menubar.displayName = "Menubar";

// ---------------------------------------------------------------------------
// MenubarMenu
// ---------------------------------------------------------------------------
export function MenubarMenu({ children, ...rest }: MenubarMenuProps) {
  return <MenubarPrimitive.Menu {...rest}>{children}</MenubarPrimitive.Menu>;
}
MenubarMenu.displayName = "MenubarMenu";

// ---------------------------------------------------------------------------
// MenubarTrigger
// ---------------------------------------------------------------------------
export const MenubarTrigger = forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Trigger>,
  MenubarTriggerProps
>(function MenubarTrigger({ className, ...rest }, ref) {
  return (
    <MenubarPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex cursor-pointer select-none items-center rounded-sm",
        "px-3 py-1 text-sm font-medium outline-none",
        "transition-colors duration-fast ease-standard",
        "hover:bg-muted hover:text-foreground",
        "focus:bg-muted focus:text-foreground",
        "data-[state=open]:bg-muted data-[state=open]:text-foreground",
        className,
      )}
      data-ds=""
      data-ds-component="menubar-trigger"
      {...rest}
    />
  );
});
MenubarTrigger.displayName = "MenubarTrigger";

// ---------------------------------------------------------------------------
// MenubarContent
// ---------------------------------------------------------------------------
export const MenubarContent = forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Content>,
  MenubarContentProps
>(function MenubarContent(
  {
    className,
    align = "start",
    alignOffset = -4,
    sideOffset = 8,
    children,
    ...rest
  },
  ref,
) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(...menuContentBase, className)}
        data-ds=""
        data-ds-component="menubar-content"
        {...rest}
      >
        {children}
      </MenubarPrimitive.Content>
    </MenubarPrimitive.Portal>
  );
});
MenubarContent.displayName = "MenubarContent";

// ---------------------------------------------------------------------------
// MenubarItem
// ---------------------------------------------------------------------------
export const MenubarItem = forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Item>,
  MenubarItemProps
>(function MenubarItem(
  { className, variant = "default", icon, inset, children, ...rest },
  ref,
) {
  return (
    <MenubarPrimitive.Item
      ref={ref}
      className={cn(
        ...menuItemBase,
        inset && "pl-8",
        variant === "danger" &&
          "text-destructive focus:bg-destructive/10 focus:text-destructive",
        className,
      )}
      data-ds=""
      data-ds-component="menubar-item"
      data-ds-variant={variant}
      {...rest}
    >
      {icon && (
        <span className="mr-2 flex size-4 shrink-0 items-center justify-center">
          {icon}
        </span>
      )}
      {children}
    </MenubarPrimitive.Item>
  );
});
MenubarItem.displayName = "MenubarItem";

// ---------------------------------------------------------------------------
// MenubarCheckboxItem
// ---------------------------------------------------------------------------
export const MenubarCheckboxItem = forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.CheckboxItem>,
  MenubarCheckboxItemProps
>(function MenubarCheckboxItem({ className, children, checked, ...rest }, ref) {
  return (
    <MenubarPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      className={cn(...menuItemBase, "pl-8", className)}
      data-ds=""
      data-ds-component="menubar-checkbox-item"
      {...rest}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="text-foreground" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
});
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

// ---------------------------------------------------------------------------
// MenubarRadioGroup
// ---------------------------------------------------------------------------
export const MenubarRadioGroup = forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.RadioGroup>,
  MenubarRadioGroupProps
>(function MenubarRadioGroup({ className, ...rest }, ref) {
  return (
    <MenubarPrimitive.RadioGroup
      ref={ref}
      className={cn(className)}
      {...rest}
    />
  );
});
MenubarRadioGroup.displayName = "MenubarRadioGroup";

// ---------------------------------------------------------------------------
// MenubarRadioItem
// ---------------------------------------------------------------------------
export const MenubarRadioItem = forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.RadioItem>,
  MenubarRadioItemProps
>(function MenubarRadioItem({ className, children, ...rest }, ref) {
  return (
    <MenubarPrimitive.RadioItem
      ref={ref}
      className={cn(...menuItemBase, "pl-8", className)}
      data-ds=""
      data-ds-component="menubar-radio-item"
      {...rest}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <DotIcon className="text-foreground" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  );
});
MenubarRadioItem.displayName = "MenubarRadioItem";

// ---------------------------------------------------------------------------
// MenubarLabel
// ---------------------------------------------------------------------------
export const MenubarLabel = forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Label>,
  MenubarLabelProps
>(function MenubarLabel({ className, inset, ...rest }, ref) {
  return (
    <MenubarPrimitive.Label
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
        inset && "pl-8",
        className,
      )}
      data-ds=""
      data-ds-component="menubar-label"
      {...rest}
    />
  );
});
MenubarLabel.displayName = "MenubarLabel";

// ---------------------------------------------------------------------------
// MenubarSeparator
// ---------------------------------------------------------------------------
export const MenubarSeparator = forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Separator>,
  MenubarSeparatorProps
>(function MenubarSeparator({ className, ...rest }, ref) {
  return (
    <MenubarPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      data-ds=""
      data-ds-component="menubar-separator"
      {...rest}
    />
  );
});
MenubarSeparator.displayName = "MenubarSeparator";

// ---------------------------------------------------------------------------
// MenubarGroup
// ---------------------------------------------------------------------------
export const MenubarGroup = forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Group>,
  MenubarGroupProps
>(function MenubarGroup({ className, ...rest }, ref) {
  return (
    <MenubarPrimitive.Group ref={ref} className={cn(className)} {...rest} />
  );
});
MenubarGroup.displayName = "MenubarGroup";

// ---------------------------------------------------------------------------
// MenubarSub
// ---------------------------------------------------------------------------
export function MenubarSub({ children, ...rest }: MenubarSubProps) {
  return <MenubarPrimitive.Sub {...rest}>{children}</MenubarPrimitive.Sub>;
}
MenubarSub.displayName = "MenubarSub";

// ---------------------------------------------------------------------------
// MenubarSubTrigger
// ---------------------------------------------------------------------------
export const MenubarSubTrigger = forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.SubTrigger>,
  MenubarSubTriggerProps
>(function MenubarSubTrigger(
  { className, inset, icon, children, ...rest },
  ref,
) {
  return (
    <MenubarPrimitive.SubTrigger
      ref={ref}
      className={cn(
        ...menuItemBase,
        "data-[state=open]:bg-muted",
        inset && "pl-8",
        className,
      )}
      data-ds=""
      data-ds-component="menubar-sub-trigger"
      {...rest}
    >
      {icon && (
        <span className="mr-2 flex size-4 shrink-0 items-center justify-center">
          {icon}
        </span>
      )}
      {children}
      <ChevronRightIcon className="ml-auto text-muted-foreground" />
    </MenubarPrimitive.SubTrigger>
  );
});
MenubarSubTrigger.displayName = "MenubarSubTrigger";

// ---------------------------------------------------------------------------
// MenubarSubContent
// ---------------------------------------------------------------------------
export const MenubarSubContent = forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.SubContent>,
  MenubarSubContentProps
>(function MenubarSubContent({ className, children, ...rest }, ref) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.SubContent
        ref={ref}
        className={cn(...menuContentBase, className)}
        data-ds=""
        data-ds-component="menubar-sub-content"
        {...rest}
      >
        {children}
      </MenubarPrimitive.SubContent>
    </MenubarPrimitive.Portal>
  );
});
MenubarSubContent.displayName = "MenubarSubContent";

// ---------------------------------------------------------------------------
// MenubarShortcut
// ---------------------------------------------------------------------------
export function MenubarShortcut({ className, children }: MenubarShortcutProps) {
  return (
    <span
      className={cn(
        "ml-auto pl-4 text-xs tracking-widest text-muted-foreground",
        className,
      )}
      data-ds=""
      data-ds-component="menubar-shortcut"
    >
      {children}
    </span>
  );
}
MenubarShortcut.displayName = "MenubarShortcut";
