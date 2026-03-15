import * as react from 'react';
import { ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';

declare const kbdVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type KbdSize = "sm" | "md" | "lg";
interface KbdProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof kbdVariants> {
    size?: KbdSize;
    className?: string;
    children?: ReactNode;
}
/**
 * Kbd — keyboard shortcut display.
 *
 * @example
 * <Kbd>⌘K</Kbd>
 * <Kbd>Ctrl</Kbd><span>+</span><Kbd>S</Kbd>
 * <Kbd size="sm">Enter</Kbd>
 */
declare const Kbd: react.ForwardRefExoticComponent<KbdProps & react.RefAttributes<HTMLElement>>;

export { Kbd, type KbdProps, type KbdSize, kbdVariants };
