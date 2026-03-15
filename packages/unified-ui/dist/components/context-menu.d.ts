import * as react from 'react';
import { ReactNode, ComponentPropsWithoutRef } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { ContextMenu as ContextMenu$1 } from 'radix-ui';

interface ContextMenuProps {
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
interface ContextMenuTriggerProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.Trigger> {
    /** When true, right-click event propagation is disabled. */
    disabled?: boolean;
    className?: string;
}
interface ContextMenuContentProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.Content> {
    className?: string;
}
type ContextMenuItemVariant = "default" | "danger";
interface ContextMenuItemProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.Item> {
    /** Visual variant of the menu item. */
    variant?: ContextMenuItemVariant;
    /** Icon rendered before the label. */
    icon?: ReactNode;
    className?: string;
}
interface ContextMenuCheckboxItemProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.CheckboxItem> {
    /** Whether the checkbox item is checked. */
    checked?: boolean;
    className?: string;
}
interface ContextMenuRadioGroupProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.RadioGroup> {
    className?: string;
}
interface ContextMenuRadioItemProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.RadioItem> {
    className?: string;
}
interface ContextMenuLabelProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.Label> {
    /** Whether the label should be inset (aligned with items that have icons). */
    inset?: boolean;
    className?: string;
}
interface ContextMenuSeparatorProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.Separator> {
    className?: string;
}
interface ContextMenuGroupProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.Group> {
    className?: string;
}
interface ContextMenuSubProps {
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
interface ContextMenuSubTriggerProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.SubTrigger> {
    /** Whether to inset the trigger (aligned with items that have icons). */
    inset?: boolean;
    /** Icon rendered before the label. */
    icon?: ReactNode;
    className?: string;
}
interface ContextMenuSubContentProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.SubContent> {
    className?: string;
}
interface ContextMenuShortcutProps {
    children: ReactNode;
    className?: string;
}
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
declare function ContextMenu({ children, ...rest }: ContextMenuProps): react_jsx_runtime.JSX.Element;
declare namespace ContextMenu {
    var displayName: string;
}
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
declare const ContextMenuTrigger: react.ForwardRefExoticComponent<ContextMenuTriggerProps & react.RefAttributes<HTMLSpanElement>>;
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
declare const ContextMenuContent: react.ForwardRefExoticComponent<ContextMenuContentProps & react.RefAttributes<HTMLDivElement>>;
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
declare const ContextMenuItem: react.ForwardRefExoticComponent<ContextMenuItemProps & react.RefAttributes<HTMLDivElement>>;
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
declare const ContextMenuCheckboxItem: react.ForwardRefExoticComponent<ContextMenuCheckboxItemProps & react.RefAttributes<HTMLDivElement>>;
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
declare const ContextMenuRadioGroup: react.ForwardRefExoticComponent<ContextMenuRadioGroupProps & react.RefAttributes<HTMLDivElement>>;
/**
 * ContextMenuRadioItem — a selectable radio item inside a radio group.
 *
 * @example
 * ```tsx
 * <ContextMenuRadioItem value="list">List View</ContextMenuRadioItem>
 * ```
 */
declare const ContextMenuRadioItem: react.ForwardRefExoticComponent<ContextMenuRadioItemProps & react.RefAttributes<HTMLDivElement>>;
/**
 * ContextMenuLabel — a non-interactive label for grouping menu items.
 *
 * @example
 * ```tsx
 * <ContextMenuLabel>File Actions</ContextMenuLabel>
 * ```
 */
declare const ContextMenuLabel: react.ForwardRefExoticComponent<ContextMenuLabelProps & react.RefAttributes<HTMLDivElement>>;
/**
 * ContextMenuSeparator — a thin horizontal rule between menu sections.
 *
 * @example
 * ```tsx
 * <ContextMenuSeparator />
 * ```
 */
declare const ContextMenuSeparator: react.ForwardRefExoticComponent<ContextMenuSeparatorProps & react.RefAttributes<HTMLDivElement>>;
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
declare const ContextMenuGroup: react.ForwardRefExoticComponent<ContextMenuGroupProps & react.RefAttributes<HTMLDivElement>>;
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
declare function ContextMenuSub({ children, ...rest }: ContextMenuSubProps): react_jsx_runtime.JSX.Element;
declare namespace ContextMenuSub {
    var displayName: string;
}
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
declare const ContextMenuSubTrigger: react.ForwardRefExoticComponent<ContextMenuSubTriggerProps & react.RefAttributes<HTMLDivElement>>;
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
declare const ContextMenuSubContent: react.ForwardRefExoticComponent<ContextMenuSubContentProps & react.RefAttributes<HTMLDivElement>>;
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
declare function ContextMenuShortcut({ className, children, }: ContextMenuShortcutProps): react_jsx_runtime.JSX.Element;
declare namespace ContextMenuShortcut {
    var displayName: string;
}

export { ContextMenu, ContextMenuCheckboxItem, type ContextMenuCheckboxItemProps, ContextMenuContent, type ContextMenuContentProps, ContextMenuGroup, type ContextMenuGroupProps, ContextMenuItem, type ContextMenuItemProps, type ContextMenuItemVariant, ContextMenuLabel, type ContextMenuLabelProps, type ContextMenuProps, ContextMenuRadioGroup, type ContextMenuRadioGroupProps, ContextMenuRadioItem, type ContextMenuRadioItemProps, ContextMenuSeparator, type ContextMenuSeparatorProps, ContextMenuShortcut, type ContextMenuShortcutProps, ContextMenuSub, ContextMenuSubContent, type ContextMenuSubContentProps, type ContextMenuSubProps, ContextMenuSubTrigger, type ContextMenuSubTriggerProps, ContextMenuTrigger, type ContextMenuTriggerProps };
