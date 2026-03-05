"use client";

// ============================================================================
// Unified UI — DropdownMenu Component
// ============================================================================
// A production-ready dropdown menu component built on Radix UI's DropdownMenu
// primitive and the Unified UI token layer. Uses tailwind-merge (via cn) for
// safe class merging.
//
// Features:
//   - Built on @radix-ui/react-dropdown-menu for full accessibility
//   - Menu items: default, danger
//   - Icons and keyboard shortcut display
//   - Submenus with nested content
//   - Separators
//   - Checkbox items and radio items
//   - Uses z-ds-dropdown z-index
//   - slideDownSm-style CSS animation
//   - Disabled state per item
//   - Full keyboard navigation (Radix handles this)
//   - WCAG AA accessible: focus ring, aria roles, keyboard navigation
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import {
//     DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
//     DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel,
//     DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem,
//     DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
//     DropdownMenuShortcut, DropdownMenuGroup,
//   } from "@/design-system/components/dropdown-menu";
//
//   <DropdownMenu>
//     <DropdownMenuTrigger asChild>
//       <Button>Open</Button>
//     </DropdownMenuTrigger>
//     <DropdownMenuContent>
//       <DropdownMenuLabel>Actions</DropdownMenuLabel>
//       <DropdownMenuItem>Edit</DropdownMenuItem>
//       <DropdownMenuItem>Duplicate</DropdownMenuItem>
//       <DropdownMenuSeparator />
//       <DropdownMenuItem variant="danger">Delete</DropdownMenuItem>
//     </DropdownMenuContent>
//   </DropdownMenu>
// ============================================================================

import { scaleIn } from "@unified-ui/motion";
import { cn } from "@unified-ui/utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DropdownMenuProps
  extends DropdownMenuPrimitive.DropdownMenuProps {
  children: ReactNode;
}

export interface DropdownMenuTriggerProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger> {
  className?: string;
}

export interface DropdownMenuContentProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
  className?: string;
  children: ReactNode;
}

export type DropdownMenuItemVariant = "default" | "danger";

export interface DropdownMenuItemProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  className?: string;
  /** Visual variant. @default "default" */
  variant?: DropdownMenuItemVariant;
  /** Optional icon displayed before the label. */
  icon?: ReactNode;
  /** Optional keyboard shortcut displayed on the right. */
  shortcut?: string;
  children: ReactNode;
}

export interface DropdownMenuCheckboxItemProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> {
  className?: string;
  children: ReactNode;
}

export interface DropdownMenuRadioGroupProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioGroup> {
  className?: string;
  children: ReactNode;
}

export interface DropdownMenuRadioItemProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> {
  className?: string;
  children: ReactNode;
}

export interface DropdownMenuLabelProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {
  className?: string;
  /** Whether the label is inset (aligned with items that have icons). */
  inset?: boolean;
  children: ReactNode;
}

export interface DropdownMenuSeparatorProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> {
  className?: string;
}

export interface DropdownMenuGroupProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group> {
  className?: string;
  children: ReactNode;
}

export interface DropdownMenuSubProps
  extends DropdownMenuPrimitive.DropdownMenuSubProps {
  children: ReactNode;
}

export interface DropdownMenuSubTriggerProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> {
  className?: string;
  /** Whether the sub-trigger is inset (aligned with items that have icons). */
  inset?: boolean;
  /** Optional icon displayed before the label. */
  icon?: ReactNode;
  children: ReactNode;
}

export interface DropdownMenuSubContentProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> {
  className?: string;
  children: ReactNode;
}

export interface DropdownMenuShortcutProps {
  className?: string;
  children: ReactNode;
}

// ---------------------------------------------------------------------------
// Icons (Internal SVGs)
// ---------------------------------------------------------------------------

function CheckIcon({ className }: { className?: string }) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function DotIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
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
// Shared item styles
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
  "min-w-[8rem]",
  "overflow-hidden",
  "rounded-md",
  "border border-border",
  "bg-background",
  "p-1",
  "shadow-lg",
  "text-foreground",
  // Note: Animation is handled by Framer Motion (scaleIn preset).
  // CSS animation classes removed in favour of FM spring physics.
] as const;

// ---------------------------------------------------------------------------
// DropdownMenu Root
// ---------------------------------------------------------------------------

export function DropdownMenu({ children, ...rest }: DropdownMenuProps) {
  return (
    <DropdownMenuPrimitive.Root {...rest}>
      {children}
    </DropdownMenuPrimitive.Root>
  );
}
DropdownMenu.displayName = "DropdownMenu";

// ---------------------------------------------------------------------------
// DropdownMenuTrigger
// ---------------------------------------------------------------------------

export const DropdownMenuTrigger = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Trigger>,
  DropdownMenuTriggerProps
>(function DropdownMenuTrigger({ className, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.Trigger
      ref={ref}
      className={className}
      data-ds=""
      data-ds-component="dropdown-menu-trigger"
      {...rest}
    />
  );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

// ---------------------------------------------------------------------------
// DropdownMenuContent
// ---------------------------------------------------------------------------

export const DropdownMenuContent = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(function DropdownMenuContent(
  { className, children, sideOffset = 4, ...rest },
  ref,
) {
  const shouldReduce = useReducedMotion();

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        asChild
        {...rest}
      >
        <motion.div
          className={cn(...menuContentBase, className)}
          variants={shouldReduce ? undefined : scaleIn.variants}
          initial={shouldReduce ? { opacity: 0 } : "initial"}
          animate={shouldReduce ? { opacity: 1 } : "animate"}
          exit={shouldReduce ? { opacity: 0 } : "exit"}
          transition={
            shouldReduce ? { duration: 0.15 } : scaleIn.transition
          }
          data-ds=""
          data-ds-component="dropdown-menu-content"
          data-ds-animated=""
        >
          {children}
        </motion.div>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
});
DropdownMenuContent.displayName = "DropdownMenuContent";

// ---------------------------------------------------------------------------
// DropdownMenuItem
// ---------------------------------------------------------------------------

export const DropdownMenuItem = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(function DropdownMenuItem(
  { className, variant = "default", icon, shortcut, children, ...rest },
  ref,
) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        ...menuItemBase,
        variant === "danger" &&
          "text-danger focus:bg-danger-muted focus:text-danger-muted-foreground",
        variant === "default" && "text-foreground",
        icon && "gap-2",
        className,
      )}
      data-ds=""
      data-ds-component="dropdown-menu-item"
      {...rest}
    >
      {icon && (
        <span className="shrink-0 [&>svg]:size-4" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="flex-1">{children}</span>
      {shortcut && <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>}
    </DropdownMenuPrimitive.Item>
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

// ---------------------------------------------------------------------------
// DropdownMenuCheckboxItem
// ---------------------------------------------------------------------------

export const DropdownMenuCheckboxItem = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(function DropdownMenuCheckboxItem({ className, children, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(...menuItemBase, "pl-8", className)}
      data-ds=""
      data-ds-component="dropdown-menu-checkbox-item"
      {...rest}
    >
      <span className="absolute left-2 flex items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

// ---------------------------------------------------------------------------
// DropdownMenuRadioGroup / DropdownMenuRadioItem
// ---------------------------------------------------------------------------

export const DropdownMenuRadioGroup = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioGroup>,
  DropdownMenuRadioGroupProps
>(function DropdownMenuRadioGroup({ className, children, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.RadioGroup ref={ref} className={className} {...rest}>
      {children}
    </DropdownMenuPrimitive.RadioGroup>
  );
});
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

export const DropdownMenuRadioItem = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(function DropdownMenuRadioItem({ className, children, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn(...menuItemBase, "pl-8", className)}
      data-ds=""
      data-ds-component="dropdown-menu-radio-item"
      {...rest}
    >
      <span className="absolute left-2 flex items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <DotIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
});
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

// ---------------------------------------------------------------------------
// DropdownMenuLabel / DropdownMenuSeparator / DropdownMenuGroup
// ---------------------------------------------------------------------------

export const DropdownMenuLabel = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(function DropdownMenuLabel({ className, inset, children, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-xs font-semibold text-muted-foreground",
        inset && "pl-8",
        className,
      )}
      {...rest}
    >
      {children}
    </DropdownMenuPrimitive.Label>
  );
});
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownMenuSeparator = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuSeparatorProps
>(function DropdownMenuSeparator({ className, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...rest}
    />
  );
});
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export const DropdownMenuGroup = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Group>,
  DropdownMenuGroupProps
>(function DropdownMenuGroup({ className, children, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.Group ref={ref} className={className} {...rest}>
      {children}
    </DropdownMenuPrimitive.Group>
  );
});
DropdownMenuGroup.displayName = "DropdownMenuGroup";

// ---------------------------------------------------------------------------
// DropdownMenuSub / DropdownMenuSubTrigger / DropdownMenuSubContent
// ---------------------------------------------------------------------------

export function DropdownMenuSub({ children, ...rest }: DropdownMenuSubProps) {
  return (
    <DropdownMenuPrimitive.Sub {...rest}>{children}</DropdownMenuPrimitive.Sub>
  );
}
DropdownMenuSub.displayName = "DropdownMenuSub";

export const DropdownMenuSubTrigger = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(function DropdownMenuSubTrigger(
  { className, inset, icon, children, ...rest },
  ref,
) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        ...menuItemBase,
        "data-[state=open]:bg-muted",
        icon && "gap-2",
        inset && "pl-8",
        className,
      )}
      data-ds=""
      data-ds-component="dropdown-menu-sub-trigger"
      {...rest}
    >
      {icon && (
        <span className="shrink-0 [&>svg]:size-4" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="flex-1">{children}</span>
      <ChevronRightIcon className="ml-auto size-4 text-muted-foreground" />
    </DropdownMenuPrimitive.SubTrigger>
  );
});
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

export const DropdownMenuSubContent = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  DropdownMenuSubContentProps
>(function DropdownMenuSubContent({ className, children, ...rest }, ref) {
  const shouldReduce = useReducedMotion();

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        ref={ref}
        asChild
        {...rest}
      >
        <motion.div
          className={cn(...menuContentBase, className)}
          variants={shouldReduce ? undefined : scaleIn.variants}
          initial={shouldReduce ? { opacity: 0 } : "initial"}
          animate={shouldReduce ? { opacity: 1 } : "animate"}
          exit={shouldReduce ? { opacity: 0 } : "exit"}
          transition={
            shouldReduce ? { duration: 0.15 } : scaleIn.transition
          }
          data-ds=""
          data-ds-component="dropdown-menu-sub-content"
          data-ds-animated=""
        >
          {children}
        </motion.div>
      </DropdownMenuPrimitive.SubContent>
    </DropdownMenuPrimitive.Portal>
  );
});
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

// ---------------------------------------------------------------------------
// DropdownMenuShortcut
// ---------------------------------------------------------------------------

export function DropdownMenuShortcut({
  className,
  children,
}: DropdownMenuShortcutProps) {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
