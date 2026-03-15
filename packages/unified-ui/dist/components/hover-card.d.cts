import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { HoverCard as HoverCard$1 } from 'radix-ui';

type HoverCardSide = "top" | "right" | "bottom" | "left";
type HoverCardAlign = "start" | "center" | "end";
interface HoverCardProps extends ComponentPropsWithoutRef<typeof HoverCard$1.Root> {
    openDelay?: number;
    closeDelay?: number;
}
interface HoverCardTriggerProps extends ComponentPropsWithoutRef<typeof HoverCard$1.Trigger> {
}
interface HoverCardContentProps extends ComponentPropsWithoutRef<typeof HoverCard$1.Content> {
    side?: HoverCardSide;
    align?: HoverCardAlign;
    sideOffset?: number;
    className?: string;
    children?: ReactNode;
}
declare function HoverCard({ openDelay, closeDelay, ...props }: HoverCardProps): react_jsx_runtime.JSX.Element;
declare namespace HoverCard {
    var displayName: string;
}
declare const HoverCardTrigger: react.ForwardRefExoticComponent<HoverCard$1.HoverCardTriggerProps & react.RefAttributes<HTMLAnchorElement>>;
declare const HoverCardContent: react.ForwardRefExoticComponent<HoverCardContentProps & react.RefAttributes<HTMLDivElement>>;

export { HoverCard, type HoverCardAlign, HoverCardContent, type HoverCardContentProps, type HoverCardProps, type HoverCardSide, HoverCardTrigger, type HoverCardTriggerProps };
