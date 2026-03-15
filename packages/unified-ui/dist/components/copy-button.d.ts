import * as react from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';

declare const copyButtonVariants: (props?: ({
    variant?: "default" | "ghost" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type CopyButtonVariant = "default" | "ghost";
type CopyButtonSize = "sm" | "md" | "lg";
interface CopyButtonProps {
    text: string;
    variant?: CopyButtonVariant;
    size?: CopyButtonSize;
    tooltip?: string;
    successDuration?: number;
    onCopy?: (text: string) => void;
    onCopyError?: (error: Error) => void;
    className?: string;
}
declare const CopyButton: react.ForwardRefExoticComponent<CopyButtonProps & react.RefAttributes<HTMLButtonElement>>;

export { CopyButton, type CopyButtonProps, type CopyButtonSize, type CopyButtonVariant, copyButtonVariants };
