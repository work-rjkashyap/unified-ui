import * as react from 'react';
import { ElementType, ReactNode } from 'react';
import { FontFamilyKey } from '../tokens/typography.cjs';

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

export { Body, type BodyProps, Caption, type CaptionProps, Heading, type HeadingComponentProps, type HeadingProps, InlineCode, type InlineCodeProps, Label, type LabelProps, Overline, type OverlineProps, Subheading, type SubheadingProps, Typography, type TypographyAlign, type TypographyColor, type TypographyFont, type TypographyOwnProps, type TypographyProps, type TypographyVariant };
