"use client";

import { cn } from "@unified-ui/utils/cn";
import { forwardRef } from "react";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  /**
   * Vertical margin above and below (horizontal) or horizontal margin
   * left and right (vertical) of the divider, using Tailwind spacing scale.
   * @default 4
   */
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;

  /**
   * Orientation of the divider.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";

  /** Additional CSS classes. */
  className?: string;
}

const spacingYMap: Record<number, string> = {
  0: "my-0",
  1: "my-1",
  2: "my-2",
  3: "my-3",
  4: "my-4",
  5: "my-5",
  6: "my-6",
  8: "my-8",
  10: "my-10",
  12: "my-12",
};

const spacingXMap: Record<number, string> = {
  0: "mx-0",
  1: "mx-1",
  2: "mx-2",
  3: "mx-3",
  4: "mx-4",
  5: "mx-5",
  6: "mx-6",
  8: "mx-8",
  10: "mx-10",
  12: "mx-12",
};

/**
 * Divider — a visual separator line that uses design system border tokens.
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider spacing={6} />
 * <Divider orientation="vertical" />
 * ```
 */
export const Divider = forwardRef<HTMLHRElement, DividerProps>(function Divider(
  { spacing = 4, orientation = "horizontal", className, ...rest },
  ref,
) {
  const isVertical = orientation === "vertical";

  return (
    <hr
      ref={ref}
      aria-orientation={orientation}
      className={cn(
        "border-none shrink-0",
        isVertical
          ? cn("w-px self-stretch bg-border", spacingXMap[spacing] ?? "mx-4")
          : cn("h-px w-full bg-border", spacingYMap[spacing] ?? "my-4"),
        className,
      )}
      data-ds=""
      data-ds-component="divider"
      {...rest}
    />
  );
});

Divider.displayName = "Divider";
