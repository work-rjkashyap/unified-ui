"use client";

import { fadeIn, staggerContainer } from "@unified-ui/motion";
import { cn } from "@unified-ui/utils/cn";
import { cva } from "class-variance-authority";
// ============================================================================
// Unified UI — DataList Component
// ============================================================================
// Key-value pair list (term + detail) with horizontal/vertical layouts.
// Supports item stagger animation on mount.
import { motion, useReducedMotion } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

export const dataListVariants = cva(["w-full"], {
  variants: {
    orientation: {
      horizontal: "grid grid-cols-[auto_1fr] items-baseline gap-x-6",
      vertical: "flex flex-col gap-2",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: { orientation: "horizontal", size: "md" },
});

export type DataListOrientation = "horizontal" | "vertical";
export type DataListSize = "sm" | "md" | "lg";

export interface DataListItem {
  term: ReactNode;
  detail: ReactNode;
  key?: string;
}

export interface DataListProps {
  items: DataListItem[];
  orientation?: DataListOrientation;
  size?: DataListSize;
  dividers?: boolean;
  animated?: boolean;
  className?: string;
}

export interface DataListTermProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children?: ReactNode;
}

export interface DataListDetailProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children?: ReactNode;
}

export const DataListTerm = forwardRef<HTMLElement, DataListTermProps>(
  function DataListTerm({ className, children, ...rest }, ref) {
    return (
      <dt
        ref={ref}
        className={cn("font-medium text-muted-foreground shrink-0", className)}
        {...rest}
      >
        {children}
      </dt>
    );
  },
);
DataListTerm.displayName = "DataListTerm";

export const DataListDetail = forwardRef<HTMLElement, DataListDetailProps>(
  function DataListDetail({ className, children, ...rest }, ref) {
    return (
      <dd ref={ref} className={cn("text-foreground m-0", className)} {...rest}>
        {children}
      </dd>
    );
  },
);
DataListDetail.displayName = "DataListDetail";

export const DataList = forwardRef<HTMLDListElement, DataListProps>(
  function DataList(
    {
      items,
      orientation = "horizontal",
      size = "md",
      dividers = false,
      animated = true,
      className,
    },
    ref,
  ) {
    const shouldReduce = useReducedMotion();
    const isHorizontal = orientation === "horizontal";

    // In horizontal mode, each dt/dd is a direct grid child (via `contents`).
    // We apply vertical padding to dt/dd to create consistent row spacing
    // and ensure the border-t divider spans the full visual row height.
    const horizontalCellPadding = "py-2";

    return (
      <motion.dl
        ref={ref}
        className={cn(dataListVariants({ orientation, size }), className)}
        variants={
          animated && !shouldReduce ? staggerContainer.variants : undefined
        }
        initial={animated && !shouldReduce ? "initial" : undefined}
        animate={animated && !shouldReduce ? "animate" : undefined}
        data-ds=""
        data-ds-component="data-list"
        data-ds-orientation={orientation}
        data-ds-animated={animated ? "" : undefined}
      >
        {items.map((item, i) => (
          <motion.div
            key={item.key ?? i}
            className={cn(
              isHorizontal ? "contents" : "flex flex-col gap-1",
              dividers &&
                i > 0 &&
                !isHorizontal &&
                "pt-3 border-t border-border",
            )}
            variants={animated && !shouldReduce ? fadeIn.variants : undefined}
            transition={
              animated && !shouldReduce ? fadeIn.transition : undefined
            }
          >
            {isHorizontal ? (
              <>
                <DataListTerm
                  className={cn(
                    horizontalCellPadding,
                    dividers && i > 0 && "border-t border-border",
                  )}
                >
                  {item.term}
                </DataListTerm>
                <DataListDetail
                  className={cn(
                    horizontalCellPadding,
                    dividers && i > 0 && "border-t border-border",
                  )}
                >
                  {item.detail}
                </DataListDetail>
              </>
            ) : (
              <>
                <DataListTerm>{item.term}</DataListTerm>
                <DataListDetail>{item.detail}</DataListDetail>
              </>
            )}
          </motion.div>
        ))}
      </motion.dl>
    );
  },
);
DataList.displayName = "DataList";
