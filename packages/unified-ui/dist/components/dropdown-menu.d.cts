import * as react from 'react';
import { ReactNode, ComponentPropsWithoutRef } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { DropdownMenu as DropdownMenu$1 } from 'radix-ui';

interface DropdownMenuProps extends DropdownMenu$1.DropdownMenuProps {
    children: ReactNode;
}
interface DropdownMenuTriggerProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.Trigger> {
    className?: string;
}
interface DropdownMenuContentProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.Content> {
    className?: string;
    children: ReactNode;
}
type DropdownMenuItemVariant = "default" | "danger";
interface DropdownMenuItemProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.Item> {
    className?: string;
    /** Visual variant. @default "default" */
    variant?: DropdownMenuItemVariant;
    /** Optional icon displayed before the label. */
    icon?: ReactNode;
    /** Optional keyboard shortcut displayed on the right. */
    shortcut?: string;
    children: ReactNode;
}
interface DropdownMenuCheckboxItemProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.CheckboxItem> {
    className?: string;
    children: ReactNode;
}
interface DropdownMenuRadioGroupProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.RadioGroup> {
    className?: string;
    children: ReactNode;
}
interface DropdownMenuRadioItemProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.RadioItem> {
    className?: string;
    children: ReactNode;
}
interface DropdownMenuLabelProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.Label> {
    className?: string;
    /** Whether the label is inset (aligned with items that have icons). */
    inset?: boolean;
    children: ReactNode;
}
interface DropdownMenuSeparatorProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.Separator> {
    className?: string;
}
interface DropdownMenuGroupProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.Group> {
    className?: string;
    children: ReactNode;
}
interface DropdownMenuSubProps extends DropdownMenu$1.DropdownMenuSubProps {
    children: ReactNode;
}
interface DropdownMenuSubTriggerProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.SubTrigger> {
    className?: string;
    /** Whether the sub-trigger is inset (aligned with items that have icons). */
    inset?: boolean;
    /** Optional icon displayed before the label. */
    icon?: ReactNode;
    children: ReactNode;
}
interface DropdownMenuSubContentProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.SubContent> {
    className?: string;
    children: ReactNode;
}
interface DropdownMenuShortcutProps {
    className?: string;
    children: ReactNode;
}
declare function DropdownMenu({ children, ...rest }: DropdownMenuProps): react_jsx_runtime.JSX.Element;
declare namespace DropdownMenu {
    var displayName: string;
}
declare const DropdownMenuTrigger: react.ForwardRefExoticComponent<DropdownMenuTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuContent: react.ForwardRefExoticComponent<DropdownMenuContentProps & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuItem: react.ForwardRefExoticComponent<DropdownMenuItemProps & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuCheckboxItem: react.ForwardRefExoticComponent<DropdownMenuCheckboxItemProps & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuRadioGroup: react.ForwardRefExoticComponent<DropdownMenuRadioGroupProps & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuRadioItem: react.ForwardRefExoticComponent<DropdownMenuRadioItemProps & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuLabel: react.ForwardRefExoticComponent<DropdownMenuLabelProps & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSeparator: react.ForwardRefExoticComponent<DropdownMenuSeparatorProps & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuGroup: react.ForwardRefExoticComponent<DropdownMenuGroupProps & react.RefAttributes<HTMLDivElement>>;
declare function DropdownMenuSub({ children, ...rest }: DropdownMenuSubProps): react_jsx_runtime.JSX.Element;
declare namespace DropdownMenuSub {
    var displayName: string;
}
declare const DropdownMenuSubTrigger: react.ForwardRefExoticComponent<DropdownMenuSubTriggerProps & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubContent: react.ForwardRefExoticComponent<DropdownMenuSubContentProps & react.RefAttributes<HTMLDivElement>>;
declare function DropdownMenuShortcut({ className, children, }: DropdownMenuShortcutProps): react_jsx_runtime.JSX.Element;
declare namespace DropdownMenuShortcut {
    var displayName: string;
}

export { DropdownMenu, DropdownMenuCheckboxItem, type DropdownMenuCheckboxItemProps, DropdownMenuContent, type DropdownMenuContentProps, DropdownMenuGroup, type DropdownMenuGroupProps, DropdownMenuItem, type DropdownMenuItemProps, type DropdownMenuItemVariant, DropdownMenuLabel, type DropdownMenuLabelProps, type DropdownMenuProps, DropdownMenuRadioGroup, type DropdownMenuRadioGroupProps, DropdownMenuRadioItem, type DropdownMenuRadioItemProps, DropdownMenuSeparator, type DropdownMenuSeparatorProps, DropdownMenuShortcut, type DropdownMenuShortcutProps, DropdownMenuSub, DropdownMenuSubContent, type DropdownMenuSubContentProps, type DropdownMenuSubProps, DropdownMenuSubTrigger, type DropdownMenuSubTriggerProps, DropdownMenuTrigger, type DropdownMenuTriggerProps };
