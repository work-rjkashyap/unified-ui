import * as react from 'react';
import { ReactNode, InputHTMLAttributes } from 'react';

type InputGroupSize = "sm" | "md" | "lg";
type InputGroupVariant = "default" | "filled";
interface InputGroupProps {
    size?: InputGroupSize;
    variant?: InputGroupVariant;
    prefix?: ReactNode;
    suffix?: ReactNode;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    disabled?: boolean;
    error?: boolean;
    className?: string;
    inputClassName?: string;
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
    children?: ReactNode;
}
declare const InputGroup: react.ForwardRefExoticComponent<InputGroupProps & react.RefAttributes<HTMLDivElement>>;

export { InputGroup, type InputGroupProps, type InputGroupSize, type InputGroupVariant };
