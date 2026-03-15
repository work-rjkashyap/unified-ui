import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { Select as Select$1 } from 'radix-ui';

declare const selectTriggerVariants: (props?: ({
    variant?: "success" | "default" | "error" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SelectVariant = "default" | "error" | "success";
type SelectSize = "sm" | "md" | "lg";
interface SelectProps extends Omit<ComponentPropsWithoutRef<typeof Select$1.Root>, "children"> {
    variant?: SelectVariant;
    size?: SelectSize;
    placeholder?: string;
    triggerClassName?: string;
    contentClassName?: string;
    "aria-invalid"?: boolean | "true" | "false";
    "aria-describedby"?: string;
    children: ReactNode;
}
interface SelectItemProps extends ComponentPropsWithoutRef<typeof Select$1.Item> {
    className?: string;
    children: ReactNode;
}
interface SelectGroupProps extends ComponentPropsWithoutRef<typeof Select$1.Group> {
    className?: string;
    children: ReactNode;
}
interface SelectLabelProps extends ComponentPropsWithoutRef<typeof Select$1.Label> {
    className?: string;
    children: ReactNode;
}
interface SelectSeparatorProps extends ComponentPropsWithoutRef<typeof Select$1.Separator> {
    className?: string;
}
declare const Select: react.FC<Select$1.SelectProps>;
interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof Select$1.Trigger> {
    variant?: SelectVariant;
    size?: SelectSize;
}
declare const SelectTrigger: react.ForwardRefExoticComponent<SelectTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const SelectValue: react.ForwardRefExoticComponent<Select$1.SelectValueProps & react.RefAttributes<HTMLSpanElement>>;
type SelectContentProps = React.ComponentPropsWithoutRef<typeof Select$1.Content>;
declare const SelectContent: react.ForwardRefExoticComponent<Omit<Select$1.SelectContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
type SelectScrollUpButtonProps = React.ComponentPropsWithoutRef<typeof Select$1.ScrollUpButton>;
declare const SelectScrollUpButton: react.ForwardRefExoticComponent<Omit<Select$1.SelectScrollUpButtonProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
type SelectScrollDownButtonProps = React.ComponentPropsWithoutRef<typeof Select$1.ScrollDownButton>;
declare const SelectScrollDownButton: react.ForwardRefExoticComponent<Omit<Select$1.SelectScrollDownButtonProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const SelectItem: react.ForwardRefExoticComponent<SelectItemProps & react.RefAttributes<HTMLDivElement>>;
declare const SelectGroup: react.ForwardRefExoticComponent<SelectGroupProps & react.RefAttributes<HTMLDivElement>>;
declare const SelectLabel: react.ForwardRefExoticComponent<SelectLabelProps & react.RefAttributes<HTMLDivElement>>;
declare const SelectSeparator: react.ForwardRefExoticComponent<SelectSeparatorProps & react.RefAttributes<HTMLDivElement>>;

export { Select, SelectContent, type SelectContentProps, SelectGroup, type SelectGroupProps, SelectItem, type SelectItemProps, SelectLabel, type SelectLabelProps, type SelectProps, SelectScrollDownButton, type SelectScrollDownButtonProps, SelectScrollUpButton, type SelectScrollUpButtonProps, SelectSeparator, type SelectSeparatorProps, type SelectSize, SelectTrigger, type SelectTriggerProps, SelectValue, type SelectVariant, selectTriggerVariants };
