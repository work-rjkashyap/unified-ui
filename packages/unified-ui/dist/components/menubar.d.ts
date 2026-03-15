import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Menubar as Menubar$1 } from 'radix-ui';

interface MenubarProps extends ComponentPropsWithoutRef<typeof Menubar$1.Root> {
    className?: string;
}
interface MenubarMenuProps {
    children: ReactNode;
    value?: string;
}
interface MenubarTriggerProps extends ComponentPropsWithoutRef<typeof Menubar$1.Trigger> {
    className?: string;
}
interface MenubarContentProps extends ComponentPropsWithoutRef<typeof Menubar$1.Content> {
    className?: string;
}
type MenubarItemVariant = "default" | "danger";
interface MenubarItemProps extends ComponentPropsWithoutRef<typeof Menubar$1.Item> {
    variant?: MenubarItemVariant;
    icon?: ReactNode;
    inset?: boolean;
    className?: string;
}
interface MenubarCheckboxItemProps extends ComponentPropsWithoutRef<typeof Menubar$1.CheckboxItem> {
    checked?: boolean;
    className?: string;
}
interface MenubarRadioGroupProps extends ComponentPropsWithoutRef<typeof Menubar$1.RadioGroup> {
    className?: string;
}
interface MenubarRadioItemProps extends ComponentPropsWithoutRef<typeof Menubar$1.RadioItem> {
    className?: string;
}
interface MenubarLabelProps extends ComponentPropsWithoutRef<typeof Menubar$1.Label> {
    inset?: boolean;
    className?: string;
}
interface MenubarSeparatorProps extends ComponentPropsWithoutRef<typeof Menubar$1.Separator> {
    className?: string;
}
interface MenubarGroupProps extends ComponentPropsWithoutRef<typeof Menubar$1.Group> {
    className?: string;
}
interface MenubarSubProps {
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
interface MenubarSubTriggerProps extends ComponentPropsWithoutRef<typeof Menubar$1.SubTrigger> {
    inset?: boolean;
    icon?: ReactNode;
    className?: string;
}
interface MenubarSubContentProps extends ComponentPropsWithoutRef<typeof Menubar$1.SubContent> {
    className?: string;
}
interface MenubarShortcutProps {
    children: ReactNode;
    className?: string;
}
declare const Menubar: react.ForwardRefExoticComponent<MenubarProps & react.RefAttributes<HTMLDivElement>>;
declare function MenubarMenu({ children, ...rest }: MenubarMenuProps): react_jsx_runtime.JSX.Element;
declare namespace MenubarMenu {
    var displayName: string;
}
declare const MenubarTrigger: react.ForwardRefExoticComponent<MenubarTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const MenubarContent: react.ForwardRefExoticComponent<MenubarContentProps & react.RefAttributes<HTMLDivElement>>;
declare const MenubarItem: react.ForwardRefExoticComponent<MenubarItemProps & react.RefAttributes<HTMLDivElement>>;
declare const MenubarCheckboxItem: react.ForwardRefExoticComponent<MenubarCheckboxItemProps & react.RefAttributes<HTMLDivElement>>;
declare const MenubarRadioGroup: react.ForwardRefExoticComponent<MenubarRadioGroupProps & react.RefAttributes<HTMLDivElement>>;
declare const MenubarRadioItem: react.ForwardRefExoticComponent<MenubarRadioItemProps & react.RefAttributes<HTMLDivElement>>;
declare const MenubarLabel: react.ForwardRefExoticComponent<MenubarLabelProps & react.RefAttributes<HTMLDivElement>>;
declare const MenubarSeparator: react.ForwardRefExoticComponent<MenubarSeparatorProps & react.RefAttributes<HTMLDivElement>>;
declare const MenubarGroup: react.ForwardRefExoticComponent<MenubarGroupProps & react.RefAttributes<HTMLDivElement>>;
declare function MenubarSub({ children, ...rest }: MenubarSubProps): react_jsx_runtime.JSX.Element;
declare namespace MenubarSub {
    var displayName: string;
}
declare const MenubarSubTrigger: react.ForwardRefExoticComponent<MenubarSubTriggerProps & react.RefAttributes<HTMLDivElement>>;
declare const MenubarSubContent: react.ForwardRefExoticComponent<MenubarSubContentProps & react.RefAttributes<HTMLDivElement>>;
declare function MenubarShortcut({ className, children }: MenubarShortcutProps): react_jsx_runtime.JSX.Element;
declare namespace MenubarShortcut {
    var displayName: string;
}

export { Menubar, MenubarCheckboxItem, type MenubarCheckboxItemProps, MenubarContent, type MenubarContentProps, MenubarGroup, type MenubarGroupProps, MenubarItem, type MenubarItemProps, type MenubarItemVariant, MenubarLabel, type MenubarLabelProps, MenubarMenu, type MenubarMenuProps, type MenubarProps, MenubarRadioGroup, type MenubarRadioGroupProps, MenubarRadioItem, type MenubarRadioItemProps, MenubarSeparator, type MenubarSeparatorProps, MenubarShortcut, type MenubarShortcutProps, MenubarSub, MenubarSubContent, type MenubarSubContentProps, type MenubarSubProps, MenubarSubTrigger, type MenubarSubTriggerProps, MenubarTrigger, type MenubarTriggerProps };
