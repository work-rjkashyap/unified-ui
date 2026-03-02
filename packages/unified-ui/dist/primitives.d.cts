import * as react from 'react';
import { ElementType, ReactNode } from 'react';
import { a as FontFamilyKey } from './typography-DlvVjEdE.cjs';

declare const sizeClassMap: {
    /** 640px — narrow forms, single-column content */
    readonly xs: "max-w-screen-sm";
    /** 768px — articles, focused reading content */
    readonly sm: "max-w-screen-md";
    /** 1024px — dashboards, multi-column layouts */
    readonly md: "max-w-screen-lg";
    /** 1280px — default, full-width page content */
    readonly lg: "max-w-7xl";
    /** No max-width constraint — full bleed */
    readonly full: "max-w-full";
};
declare const paddingClassMap: {
    /** No horizontal padding */
    readonly none: "";
    /** Tighter padding: px-3 → px-4 → px-6 */
    readonly tight: "px-3 sm:px-4 lg:px-6";
    /** Standard padding: px-4 → px-6 → px-8 (project default) */
    readonly default: "px-4 sm:px-6 lg:px-8";
    /** Wider padding: px-6 → px-8 → px-10 */
    readonly wide: "px-6 sm:px-8 lg:px-10";
};
type ContainerSize = keyof typeof sizeClassMap;
type ContainerPadding = keyof typeof paddingClassMap;
interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Max-width constraint for the container.
     * @default "lg" (1280px / max-w-7xl)
     */
    size?: ContainerSize;
    /**
     * Horizontal padding preset. Responsive by default.
     * @default "default" (px-4 → px-6 → px-8)
     */
    padding?: ContainerPadding;
    /**
     * Center the container horizontally. Almost always true.
     * @default true
     */
    centered?: boolean;
    /**
     * The HTML element to render as.
     * @default "div"
     */
    as?: ElementType;
    /** Content to render inside the container. */
    children?: ReactNode;
    /** Additional CSS classes to merge. */
    className?: string;
}
/**
 * Container — constrains content width and applies responsive horizontal padding.
 *
 * This is the primary layout wrapper for page-level content. It enforces the
 * design system's max-width and padding guidelines so you never need to
 * remember the responsive padding breakpoints.
 *
 * @example
 * ```tsx
 * // Standard page container (1280px max, responsive padding)
 * <Container>
 *   <h1>Page Title</h1>
 *   <p>Content here is properly constrained and padded.</p>
 * </Container>
 *
 * // Narrow container for a form
 * <Container size="xs" padding="tight">
 *   <form>...</form>
 * </Container>
 *
 * // Full-bleed section with no padding
 * <Container size="full" padding="none" as="section">
 *   <div className="bg-surface py-10">...</div>
 * </Container>
 * ```
 */
declare const Container: react.ForwardRefExoticComponent<ContainerProps & react.RefAttributes<HTMLElement>>;

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
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
declare const Divider: react.ForwardRefExoticComponent<DividerProps & react.RefAttributes<HTMLHRElement>>;

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

type TypographyFont = FontFamilyKey;
type TypographyVariant = "heading1" | "heading2" | "heading3" | "subheading" | "body" | "bodySm" | "caption" | "label" | "overline" | "code";
type TypographyColor = "default" | "foreground" | "muted" | "primary" | "success" | "warning" | "danger" | "info" | "inherit";
type TypographyAlign = "left" | "center" | "right";
interface TypographyOwnProps {
    /** The typographic variant to render. Determines size, weight, and default element. */
    variant?: TypographyVariant;
    /**
     * Font family to use. Overrides the variant's default font.
     *
     * - `"sans"` — primary UI typeface (Outfit)
     * - `"display"` — display/heading typeface (Inter)
     * - `"serif"` — long-form reading typeface (Lora)
     * - `"mono"` — code/technical typeface (JetBrains Mono)
     * - `"inherit"` — inherit from parent element
     *
     * If not specified, the variant's default font is used (e.g. `code` → `"mono"`,
     * all others → `"sans"`).
     */
    font?: TypographyFont;
    /** Semantic text color. Overrides the variant's default color. */
    color?: TypographyColor;
    /** Text alignment. */
    align?: TypographyAlign;
    /**
     * Override the rendered HTML element. By default, each variant renders
     * as its semantically appropriate element (e.g. heading1 → <h1>).
     */
    as?: ElementType;
    /**
     * Truncate text with an ellipsis after a single line.
     * Mutually exclusive with `lineClamp`.
     */
    truncate?: boolean;
    /**
     * Clamp text to the specified number of lines with an ellipsis.
     * Mutually exclusive with `truncate`.
     */
    lineClamp?: 1 | 2 | 3 | 4 | 5 | 6;
    /** If true, removes the default bottom margin. */
    noMargin?: boolean;
    /** Additional CSS classes to merge. */
    className?: string;
    /** Content to render. */
    children?: ReactNode;
}
type TypographyProps = TypographyOwnProps & Omit<React.HTMLAttributes<HTMLElement>, keyof TypographyOwnProps>;
/**
 * Typography — the foundational text rendering primitive for the Unified UI
 * design system.
 *
 * Enforces consistent typographic styling through variant-based presets
 * derived from the token layer. Supports polymorphic rendering, multi-font
 * families, semantic colors, truncation, and line clamping.
 *
 * @example
 * ```tsx
 * <Typography variant="heading1">Welcome</Typography>
 * <Typography variant="heading1" font="display">Marketing Hero</Typography>
 * <Typography variant="body" color="muted">Some description text.</Typography>
 * <Typography variant="body" font="serif">Long editorial paragraph.</Typography>
 * <Typography variant="caption" truncate>Very long text that might overflow...</Typography>
 * <Typography variant="label" as="span">Inline label</Typography>
 * ```
 */
declare const Typography: react.ForwardRefExoticComponent<TypographyOwnProps & Omit<react.HTMLAttributes<HTMLElement>, keyof TypographyOwnProps> & react.RefAttributes<HTMLElement>>;
interface HeadingProps extends Omit<TypographyOwnProps, "variant"> {
    /** Heading level: 1, 2, or 3. Maps to heading1, heading2, heading3 variants. */
    level?: 1 | 2 | 3;
}
type HeadingComponentProps = HeadingProps & Omit<React.HTMLAttributes<HTMLHeadingElement>, keyof HeadingProps>;
/**
 * Heading — renders an <h1>, <h2>, or <h3> with the appropriate typographic preset.
 *
 * @example
 * ```tsx
 * <Heading level={1}>Page Title</Heading>
 * <Heading level={1} font="display">Marketing Title</Heading>
 * <Heading level={2}>Section Title</Heading>
 * <Heading level={3} color="muted">Subsection</Heading>
 * ```
 */
declare const Heading: react.ForwardRefExoticComponent<HeadingProps & Omit<react.HTMLAttributes<HTMLHeadingElement>, keyof HeadingProps> & react.RefAttributes<HTMLHeadingElement>>;
type SubheadingProps = Omit<TypographyOwnProps, "variant"> & Omit<React.HTMLAttributes<HTMLElement>, keyof TypographyOwnProps>;
/**
 * Subheading — renders an <h4> with the subheading typographic preset.
 */
declare const Subheading: react.ForwardRefExoticComponent<Omit<TypographyOwnProps, "variant"> & Omit<react.HTMLAttributes<HTMLElement>, keyof TypographyOwnProps> & react.RefAttributes<HTMLElement>>;
type BodyProps = Omit<TypographyOwnProps, "variant"> & {
    /** Use the smaller body variant (14px instead of 16px). */
    small?: boolean;
} & Omit<React.HTMLAttributes<HTMLParagraphElement>, keyof TypographyOwnProps | "small">;
/**
 * Body — renders a <p> with the body or bodySm typographic preset.
 *
 * @example
 * ```tsx
 * <Body>Standard body text at 16px.</Body>
 * <Body small>Compact body text at 14px.</Body>
 * <Body font="serif">Editorial long-form content.</Body>
 * ```
 */
declare const Body: react.ForwardRefExoticComponent<Omit<TypographyOwnProps, "variant"> & {
    /** Use the smaller body variant (14px instead of 16px). */
    small?: boolean;
} & Omit<react.HTMLAttributes<HTMLParagraphElement>, "small" | keyof TypographyOwnProps> & react.RefAttributes<HTMLParagraphElement>>;
type CaptionProps = Omit<TypographyOwnProps, "variant"> & Omit<React.HTMLAttributes<HTMLElement>, keyof TypographyOwnProps>;
/**
 * Caption — renders a <span> with the caption typographic preset.
 * Default color is muted.
 */
declare const Caption: react.ForwardRefExoticComponent<Omit<TypographyOwnProps, "variant"> & Omit<react.HTMLAttributes<HTMLElement>, keyof TypographyOwnProps> & react.RefAttributes<HTMLElement>>;
type LabelProps = Omit<TypographyOwnProps, "variant"> & {
    /** The form element this label is for. Maps to the htmlFor attribute. */
    htmlFor?: string;
} & Omit<React.LabelHTMLAttributes<HTMLLabelElement>, keyof TypographyOwnProps | "htmlFor">;
/**
 * Label — renders a <label> with the label typographic preset.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email address</Label>
 * ```
 */
declare const Label: react.ForwardRefExoticComponent<Omit<TypographyOwnProps, "variant"> & {
    /** The form element this label is for. Maps to the htmlFor attribute. */
    htmlFor?: string;
} & Omit<react.LabelHTMLAttributes<HTMLLabelElement>, "htmlFor" | keyof TypographyOwnProps> & react.RefAttributes<HTMLLabelElement>>;
type OverlineProps = Omit<TypographyOwnProps, "variant"> & Omit<React.HTMLAttributes<HTMLElement>, keyof TypographyOwnProps>;
/**
 * Overline — renders a <span> with the overline typographic preset.
 * Text is automatically uppercased via the variant's CSS.
 *
 * @example
 * ```tsx
 * <Overline>Getting started</Overline>
 * ```
 */
declare const Overline: react.ForwardRefExoticComponent<Omit<TypographyOwnProps, "variant"> & Omit<react.HTMLAttributes<HTMLElement>, keyof TypographyOwnProps> & react.RefAttributes<HTMLElement>>;
type InlineCodeProps = Omit<TypographyOwnProps, "variant"> & Omit<React.HTMLAttributes<HTMLElement>, keyof TypographyOwnProps>;
/**
 * InlineCode — renders a <code> element with the code typographic preset.
 * Includes a subtle background for visual distinction from body text.
 * Automatically uses the mono font family.
 *
 * @example
 * ```tsx
 * <Body>Run <InlineCode>npm install</InlineCode> to get started.</Body>
 * ```
 */
declare const InlineCode: react.ForwardRefExoticComponent<Omit<TypographyOwnProps, "variant"> & Omit<react.HTMLAttributes<HTMLElement>, keyof TypographyOwnProps> & react.RefAttributes<HTMLElement>>;

export { Body, type BodyProps, Caption, type CaptionProps, Container, type ContainerPadding, type ContainerProps, type ContainerSize, Divider, type DividerProps, Grid, type GridProps, Heading, type HeadingComponentProps, type HeadingProps, InlineCode, type InlineCodeProps, Label, type LabelProps, Overline, type OverlineProps, Stack, type StackAlign, type StackDirection, type StackJustify, type StackProps, Subheading, type SubheadingProps, Typography, type TypographyAlign, type TypographyColor, type TypographyFont, type TypographyOwnProps, type TypographyProps, type TypographyVariant };
