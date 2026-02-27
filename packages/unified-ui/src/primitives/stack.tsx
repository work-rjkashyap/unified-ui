"use client";

// ============================================================================
// Stack Primitive
// ============================================================================
// Arranges children vertically or horizontally with uniform spacing derived
// from the design system's 4px grid spacing tokens. Stack is the primary
// layout primitive for composing elements with consistent gaps.
//
// Design rules:
//   - All gap values come from the spacing token scale (multiples of 4px)
//   - Default direction is vertical (column)
//   - Supports responsive direction and alignment
//   - Uses CSS Flexbox under the hood
//
// Usage:
//   import { Stack } from "@/design-system/primitives/stack";
//
//   <Stack gap={4}>
//     <Heading level={1}>Title</Heading>
//     <Body>Description text</Body>
//     <Button>Action</Button>
//   </Stack>
//
//   <Stack direction="horizontal" gap={3} align="center">
//     <Avatar />
//     <Body>Username</Body>
//   </Stack>
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { type ElementType, forwardRef, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// Spacing Token Type
// ---------------------------------------------------------------------------

type SpacingToken =
  | 0
  | 0.5
  | 1
  | 1.5
  | 2
  | 2.5
  | 3
  | 3.5
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 14
  | 16
  | 20
  | 24;

// ---------------------------------------------------------------------------
// Gap → Tailwind Class Mapping
// ---------------------------------------------------------------------------
// Maps spacing token keys to Tailwind gap utility classes. These classes
// reference the default Tailwind spacing scale which aligns with our
// 4px-based token system.
// ---------------------------------------------------------------------------

const gapClassMap: Record<SpacingToken, string> = {
  0: "gap-0",
  0.5: "gap-0.5",
  1: "gap-1",
  1.5: "gap-1.5",
  2: "gap-2",
  2.5: "gap-2.5",
  3: "gap-3",
  3.5: "gap-3.5",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  7: "gap-7",
  8: "gap-8",
  9: "gap-9",
  10: "gap-10",
  11: "gap-11",
  12: "gap-12",
  14: "gap-14",
  16: "gap-16",
  20: "gap-20",
  24: "gap-24",
};

// ---------------------------------------------------------------------------
// Direction / Alignment / Justify / Wrap Mappings
// ---------------------------------------------------------------------------

const directionClassMap = {
  vertical: "flex-col",
  horizontal: "flex-row",
} as const;

const alignClassMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
} as const;

const justifyClassMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
} as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type StackDirection = keyof typeof directionClassMap;
export type StackAlign = keyof typeof alignClassMap;
export type StackJustify = keyof typeof justifyClassMap;

export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Spacing between children. Uses the design system's spacing token scale.
   * Each unit = 4px (e.g. gap={4} → 16px).
   * @default 4
   */
  gap?: SpacingToken;

  /**
   * Layout direction.
   * @default "vertical"
   */
  direction?: StackDirection;

  /**
   * Cross-axis alignment (align-items).
   * @default "stretch"
   */
  align?: StackAlign;

  /**
   * Main-axis distribution (justify-content).
   * @default "start"
   */
  justify?: StackJustify;

  /**
   * Whether children should wrap when they overflow.
   * @default false
   */
  wrap?: boolean;

  /**
   * The HTML element to render as.
   * @default "div"
   */
  as?: ElementType;

  /** Content to render. */
  children?: ReactNode;

  /** Additional CSS classes. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Stack — arranges children with consistent spacing along a single axis.
 *
 * Built on CSS Flexbox. All gap values come from the design system's
 * 4px grid spacing tokens, ensuring visual rhythm is maintained.
 *
 * @example
 * ```tsx
 * // Vertical stack with 16px gap (default)
 * <Stack gap={4}>
 *   <Heading level={1}>Title</Heading>
 *   <Body>Description</Body>
 * </Stack>
 *
 * // Horizontal stack with center alignment
 * <Stack direction="horizontal" gap={3} align="center">
 *   <Avatar />
 *   <Body>Username</Body>
 * </Stack>
 *
 * // Space-between row
 * <Stack direction="horizontal" justify="between" align="center">
 *   <Body>Left</Body>
 *   <Button>Right</Button>
 * </Stack>
 * ```
 */
export const Stack = forwardRef<HTMLElement, StackProps>(function Stack(
  {
    gap = 4,
    direction = "vertical",
    align,
    justify,
    wrap = false,
    as: Component = "div",
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn(
        "flex",
        directionClassMap[direction],
        gapClassMap[gap],
        align && alignClassMap[align],
        justify && justifyClassMap[justify],
        wrap && "flex-wrap",
        className,
      )}
      data-ds=""
      data-ds-component="stack"
      {...rest}
    >
      {children}
    </Component>
  );
});

Stack.displayName = "Stack";

// ===========================================================================
// Grid Component
// ===========================================================================
// CSS Grid wrapper with responsive column control. Columns follow the
// project guidelines:
//   Desktop: max grid-cols-3 (4 for small icon grids)
//   Tablet:  grid-cols-2
//   Mobile:  grid-cols-1
//
// Usage:
//   <Grid cols={3} gap={4}>
//     <Card /><Card /><Card />
//   </Grid>
//
//   <Grid cols={3} colsSm={1} colsMd={2} gap={6}>
//     {items.map(item => <Card key={item.id} />)}
//   </Grid>
// ===========================================================================

const colsClassMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

const colsSmClassMap: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

const colsMdClassMap: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

const colsLgClassMap: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Number of columns at the base (mobile) breakpoint.
   * @default 1
   */
  cols?: 1 | 2 | 3 | 4 | 5 | 6;

  /** Columns at the sm breakpoint (640px+). */
  colsSm?: 1 | 2 | 3 | 4;

  /** Columns at the md breakpoint (768px+). */
  colsMd?: 1 | 2 | 3 | 4;

  /** Columns at the lg breakpoint (1024px+). */
  colsLg?: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * Gap between grid cells. Uses the spacing token scale.
   * @default 4
   */
  gap?: SpacingToken;

  /**
   * The HTML element to render as.
   * @default "div"
   */
  as?: ElementType;

  /** Content to render. */
  children?: ReactNode;

  /** Additional CSS classes. */
  className?: string;
}

/**
 * Grid — CSS Grid wrapper with responsive column control.
 *
 * @example
 * ```tsx
 * // Responsive 3-column grid (1 on mobile, 2 on tablet, 3 on desktop)
 * <Grid cols={1} colsMd={2} colsLg={3} gap={4}>
 *   <Card /><Card /><Card />
 * </Grid>
 * ```
 */
export const Grid = forwardRef<HTMLElement, GridProps>(function Grid(
  {
    cols = 1,
    colsSm,
    colsMd,
    colsLg,
    gap = 4,
    as: Component = "div",
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn(
        "grid",
        colsClassMap[cols],
        colsSm && colsSmClassMap[colsSm],
        colsMd && colsMdClassMap[colsMd],
        colsLg && colsLgClassMap[colsLg],
        gapClassMap[gap],
        className,
      )}
      data-ds=""
      data-ds-component="grid"
      {...rest}
    >
      {children}
    </Component>
  );
});

Grid.displayName = "Grid";
