"use client";

import { cn } from "@unified-ui/utils/cn";
// ============================================================================
// Unified UI — Resizable Component
// ============================================================================
// Resizable split panels using CSS resize or a drag handle.
// Provides a simple layout primitive without heavy dependencies.
import { motion, useReducedMotion } from "framer-motion";
import {
  createContext,
  forwardRef,
  type ReactNode,
  useContext,
  useState,
} from "react";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface ResizableContextValue {
  direction: "horizontal" | "vertical";
  sizes: number[];
  setSizes: (sizes: number[]) => void;
}

const ResizableContext = createContext<ResizableContextValue>({
  direction: "horizontal",
  sizes: [],
  setSizes: () => {},
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ResizablePanelGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical";
  defaultSizes?: number[];
  className?: string;
  children?: ReactNode;
}

export interface ResizablePanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
  className?: string;
  children?: ReactNode;
}

export interface ResizableHandleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  withHandle?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

export const ResizablePanelGroup = forwardRef<
  HTMLDivElement,
  ResizablePanelGroupProps
>(function ResizablePanelGroup(
  { direction = "horizontal", defaultSizes, className, children, ...rest },
  ref,
) {
  const [sizes, setSizes] = useState<number[]>(defaultSizes ?? []);

  return (
    <ResizableContext.Provider value={{ direction, sizes, setSizes }}>
      <div
        ref={ref}
        className={cn(
          "flex w-full h-full",
          direction === "vertical" ? "flex-col" : "flex-row",
          className,
        )}
        data-ds=""
        data-ds-component="resizable-panel-group"
        data-ds-direction={direction}
        {...rest}
      >
        {children}
      </div>
    </ResizableContext.Provider>
  );
});
ResizablePanelGroup.displayName = "ResizablePanelGroup";

export const ResizablePanel = forwardRef<HTMLDivElement, ResizablePanelProps>(
  function ResizablePanel(
    { minSize = 10, maxSize = 90, defaultSize, className, children, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn("relative overflow-auto", className)}
        style={
          defaultSize !== undefined
            ? {
                flexBasis: `${defaultSize}%`,
                minWidth: `${minSize}%`,
                maxWidth: `${maxSize}%`,
              }
            : { flex: "1 1 0%" }
        }
        data-ds-component="resizable-panel"
        {...rest}
      >
        {children}
      </div>
    );
  },
);
ResizablePanel.displayName = "ResizablePanel";

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

export const ResizableHandle = forwardRef<HTMLDivElement, ResizableHandleProps>(
  function ResizableHandle({ withHandle = false, className, ...rest }, ref) {
    const shouldReduce = useReducedMotion();
    const { direction } = useContext(ResizableContext);
    const isHorizontal = direction === "horizontal";

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={isHorizontal ? "vertical" : "horizontal"}
        aria-valuenow={50}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        className={cn(
          "relative flex shrink-0 items-center justify-center",
          "bg-border",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "transition-colors duration-fast",
          "hover:bg-primary/40",
          "cursor-col-resize",
          isHorizontal
            ? "w-px h-full after:absolute after:inset-y-0 after:left-1/2 after:-translate-x-1/2 after:w-4 after:cursor-col-resize"
            : "h-px w-full cursor-row-resize after:absolute after:inset-x-0 after:top-1/2 after:-translate-y-1/2 after:h-4",
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
      </div>
    );
  },
);
ResizableHandle.displayName = "ResizableHandle";
