"use client";

// ============================================================================
// Unified UI — VisuallyHidden Component
// ============================================================================
// Screen-reader-only content wrapper using Radix UI VisuallyHidden.
import { VisuallyHidden as VisuallyHiddenPrimitive } from "radix-ui";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";

export interface VisuallyHiddenProps
  extends ComponentPropsWithoutRef<typeof VisuallyHiddenPrimitive.Root> {}

export const VisuallyHidden = forwardRef<
  ElementRef<typeof VisuallyHiddenPrimitive.Root>,
  VisuallyHiddenProps
>(function VisuallyHidden(props, ref) {
  return (
    <VisuallyHiddenPrimitive.Root
      ref={ref}
      data-ds=""
      data-ds-component="visually-hidden"
      {...props}
    />
  );
});
VisuallyHidden.displayName = "VisuallyHidden";
