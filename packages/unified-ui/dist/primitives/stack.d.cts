import * as react from 'react';
import { ElementType, ReactNode } from 'react';

type SpacingToken = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24;
declare const directionClassMap: {
    readonly vertical: "flex-col";
    readonly horizontal: "flex-row";
};
declare const alignClassMap: {
    readonly start: "items-start";
    readonly center: "items-center";
    readonly end: "items-end";
    readonly stretch: "items-stretch";
    readonly baseline: "items-baseline";
};
declare const justifyClassMap: {
    readonly start: "justify-start";
    readonly center: "justify-center";
    readonly end: "justify-end";
    readonly between: "justify-between";
    readonly around: "justify-around";
    readonly evenly: "justify-evenly";
};
type StackDirection = keyof typeof directionClassMap;
type StackAlign = keyof typeof alignClassMap;
type StackJustify = keyof typeof justifyClassMap;
interface StackProps extends React.HTMLAttributes<HTMLElement> {
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
declare const Stack: react.ForwardRefExoticComponent<StackProps & react.RefAttributes<HTMLElement>>;
interface GridProps extends React.HTMLAttributes<HTMLElement> {
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
declare const Grid: react.ForwardRefExoticComponent<GridProps & react.RefAttributes<HTMLElement>>;

export { Grid, type GridProps, Stack, type StackAlign, type StackDirection, type StackJustify, type StackProps };
