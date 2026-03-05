"use client";

// ============================================================================
// Unified UI — Resizable Component
// ============================================================================
// Resizable split panels built on top of `react-resizable-panels` v4.
// Provides ResizablePanelGroup, ResizablePanel, and ResizableHandle with
// consistent design-system styling, optional grip handle, and Framer Motion
// hover animation on the handle.

import { cn } from "@unified-ui/utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps } from "react";
import {
  Group,
  Panel,
  Separator,
  type GroupProps,
  type PanelProps,
  type SeparatorProps,
} from "react-resizable-panels";

// ---------------------------------------------------------------------------
// ResizablePanelGroup
// ---------------------------------------------------------------------------

export interface ResizablePanelGroupProps
  extends Omit<GroupProps, "orientation"> {
  /** Resize direction — maps to the underlying `orientation` prop. */
  direction?: "horizontal" | "vertical";
}

export function ResizablePanelGroup({
  direction = "horizontal",
  className,
  ...rest
}: ResizablePanelGroupProps) {
  return (
    <Group
      orientation={direction}
      className={cn(
        "flex h-full w-full",
        direction === "vertical" && "flex-col",
        className,
      )}
      data-ds=""
      data-ds-component="resizable-panel-group"
      data-ds-direction={direction}
      {...rest}
    />
  );
}
ResizablePanelGroup.displayName = "ResizablePanelGroup";

// ---------------------------------------------------------------------------
// ResizablePanel
// ---------------------------------------------------------------------------

export type ResizablePanelProps = PanelProps;

export const ResizablePanel = Panel;

// ---------------------------------------------------------------------------
// ResizableHandle
// ---------------------------------------------------------------------------

export interface ResizableHandleProps extends SeparatorProps {
  /** Show a visible grip handle in the center of the separator. */
  withHandle?: boolean;
}

function GripIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="12" r="1" />
      <circle cx="9" cy="5" r="1" />
      <circle cx="9" cy="19" r="1" />
      <circle cx="15" cy="12" r="1" />
      <circle cx="15" cy="5" r="1" />
      <circle cx="15" cy="19" r="1" />
    </svg>
  );
}

export function ResizableHandle({
  withHandle = false,
  className,
  ...rest
}: ResizableHandleProps) {
  const shouldReduce = useReducedMotion();

  return (
    <Separator
      className={cn(
        "relative flex w-px items-center justify-center bg-border",
        "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
        "[&[aria-orientation=horizontal]]:h-px [&[aria-orientation=horizontal]]:w-full",
        "[&[aria-orientation=horizontal]]:after:left-0 [&[aria-orientation=horizontal]]:after:h-1",
        "[&[aria-orientation=horizontal]]:after:w-full [&[aria-orientation=horizontal]]:after:-translate-y-1/2",
        "[&[aria-orientation=horizontal]]:after:translate-x-0",
        "[&[aria-orientation=horizontal]>div]:rotate-90",
        className,
      )}
      data-ds-component="resizable-handle"
      {...rest}
    >
      {withHandle && (
        <motion.div
          className={cn(
            "z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-border bg-border",
          )}
          whileHover={shouldReduce ? undefined : { opacity: 1, scale: 1.15 }}
          initial={{ opacity: 0.7 }}
          data-ds-animated=""
        >
          <GripIcon className="size-2.5 text-muted-foreground" />
        </motion.div>
      )}
    </Separator>
  );
}
ResizableHandle.displayName = "ResizableHandle";
