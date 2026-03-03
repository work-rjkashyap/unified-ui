"use client";

import { scaleIn } from "@unified-ui/motion";
import { cn } from "@unified-ui/utils/cn";
// ============================================================================
// Unified UI — HoverCard Component
// ============================================================================
// Rich preview card that appears on hover (Radix HoverCard).
// Features scaleIn animation with a 200ms open delay.
import { motion, useReducedMotion } from "framer-motion";
import { HoverCard as HoverCardPrimitive } from "radix-ui";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  type ReactNode,
} from "react";

export type HoverCardSide = "top" | "right" | "bottom" | "left";
export type HoverCardAlign = "start" | "center" | "end";

export interface HoverCardProps
  extends ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root> {
  openDelay?: number;
  closeDelay?: number;
}

export interface HoverCardTriggerProps
  extends ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger> {}

export interface HoverCardContentProps
  extends ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> {
  side?: HoverCardSide;
  align?: HoverCardAlign;
  sideOffset?: number;
  className?: string;
  children?: ReactNode;
}

export function HoverCard({
  openDelay = 200,
  closeDelay = 150,
  ...props
}: HoverCardProps) {
  return (
    <HoverCardPrimitive.Root
      openDelay={openDelay}
      closeDelay={closeDelay}
      {...props}
    />
  );
}
HoverCard.displayName = "HoverCard";

export const HoverCardTrigger = HoverCardPrimitive.Trigger;
HoverCardTrigger.displayName = "HoverCardTrigger";

export const HoverCardContent = forwardRef<
  ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(function HoverCardContent(
  {
    side = "bottom",
    align = "center",
    sideOffset = 8,
    className,
    children,
    ...rest
  },
  ref,
) {
  const shouldReduce = useReducedMotion();

  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        ref={ref}
        side={side}
        align={align}
        sideOffset={sideOffset}
        asChild
        {...rest}
      >
        <motion.div
          className={cn(
            "z-popover w-64 rounded-lg border border-border bg-popover p-4 shadow-lg outline-none",
            "text-sm text-popover-foreground",
            className,
          )}
          variants={shouldReduce ? undefined : scaleIn.variants}
          initial={shouldReduce ? { opacity: 0 } : "initial"}
          animate={shouldReduce ? { opacity: 1 } : "animate"}
          exit={shouldReduce ? { opacity: 0 } : "exit"}
          transition={shouldReduce ? { duration: 0.12 } : scaleIn.transition}
          data-ds=""
          data-ds-component="hover-card-content"
          data-ds-animated=""
        >
          {children}
          <HoverCardPrimitive.Arrow className="fill-border" />
        </motion.div>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
});
HoverCardContent.displayName = "HoverCardContent";
