"use client";

// ============================================================================
// Unified UI — AspectRatio Component
// ============================================================================
// Constrains child to a given aspect ratio using Radix UI AspectRatio.
import { AspectRatio as AspectRatioPrimitive } from "radix-ui";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { cn } from "@/lib/cn";

export interface AspectRatioProps
  extends ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  className?: string;
}

export const AspectRatio = forwardRef<
  ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(function AspectRatio({ className, ...rest }, ref) {
  return (
    <AspectRatioPrimitive.Root
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      data-ds=""
      data-ds-component="aspect-ratio"
      {...rest}
    />
  );
});
AspectRatio.displayName = "AspectRatio";
