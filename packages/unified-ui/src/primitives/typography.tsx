"use client";

// ============================================================================
// Unified UI — Typography Primitive
// ============================================================================
// A polymorphic text component that enforces the Unified UI typographic
// scale. All text rendering in the application should go through this
// component (or its convenience aliases) to ensure visual consistency.
//
// Features:
//   - Variant-based styling mapped to typography tokens
//   - Multi-font support via the `font` prop (sans, display, serif, mono, inherit)
//   - Polymorphic `as` prop — renders the correct HTML element by default
//     but allows override (e.g. render a heading as a <span>)
//   - Supports semantic color tokens for text color
//   - Truncation and line clamping utilities
//   - Full ref forwarding
//   - Accessible by default (semantic HTML elements per variant)
//
// Usage:
//   import { Typography, Heading, Body, Caption } from "@/design-system/primitives/typography";
//
//   <Heading level={1}>Page Title</Heading>
//   <Heading level={1} font="display">Marketing Title</Heading>
//   <Body>Regular paragraph text</Body>
//   <Body font="serif">Editorial long-form text</Body>
//   <Caption color="muted">Updated 2 hours ago</Caption>
//   <Typography variant="overline">SECTION LABEL</Typography>
// ============================================================================

import type { FontFamilyKey } from "@unified-ui/tokens/typography";
import { typographyVariants } from "@unified-ui/tokens/typography";
import { cn } from "@unified-ui/utils/cn";
import { type ElementType, forwardRef, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// Font Family Type (re-exported for consumers)
// ---------------------------------------------------------------------------

export type TypographyFont = FontFamilyKey;

// ---------------------------------------------------------------------------
// Font → Tailwind Class Mapping
// ---------------------------------------------------------------------------
// Maps each font family key to the corresponding Tailwind utility class
// generated from the @theme block in design-system.css. The "inherit"
// key uses an arbitrary value since there's no --font-inherit in the
// Tailwind theme (it's just the CSS keyword).
// ---------------------------------------------------------------------------

const fontClassMap: Record<TypographyFont, string> = {
  display: "font-display",
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
  inherit: "font-[inherit]",
};

// ---------------------------------------------------------------------------
// Variant → Default Font Mapping
// ---------------------------------------------------------------------------
// Each variant has a default font family derived from its token preset.
// This ensures that the code variant uses mono, while headings/body use
// sans. Consumers can override with the `font` prop.
// ---------------------------------------------------------------------------

const variantDefaultFont: Record<TypographyVariant, TypographyFont> = {
  heading1: typographyVariants.heading1.fontFamily,
  heading2: typographyVariants.heading2.fontFamily,
  heading3: typographyVariants.heading3.fontFamily,
  subheading: typographyVariants.subheading.fontFamily,
  body: typographyVariants.body.fontFamily,
  bodySm: typographyVariants.bodySm.fontFamily,
  caption: typographyVariants.caption.fontFamily,
  label: typographyVariants.label.fontFamily,
  overline: typographyVariants.overline.fontFamily,
  code: typographyVariants.code.fontFamily,
};

// ---------------------------------------------------------------------------
// Variant → Default Element Mapping
// ---------------------------------------------------------------------------
// Each typography variant maps to a semantically appropriate HTML element.
// Consumers can override this with the `as` prop when needed.
// ---------------------------------------------------------------------------

const defaultElementMap: Record<TypographyVariant, ElementType> = {
  heading1: "h1",
  heading2: "h2",
  heading3: "h3",
  subheading: "h4",
  body: "p",
  bodySm: "p",
  caption: "span",
  label: "label",
  overline: "span",
  code: "code",
};

// ---------------------------------------------------------------------------
// Variant → Tailwind Class Mapping
// ---------------------------------------------------------------------------
// These classes map 1:1 to the typographic presets defined in the token layer.
// All values reference design system CSS custom properties through Tailwind
// utilities — no hardcoded font sizes, weights, or line heights.
//
// NOTE: Font family classes are NOT included here — they are applied
// separately via the `font` prop / variant default font so that consumers
// can override the font independently from the variant.
//
// Class structure per variant:
//   fontSize + lineHeight + fontWeight + letterSpacing + defaultColor
// ---------------------------------------------------------------------------

const variantClassMap: Record<TypographyVariant, string> = {
  heading1:
    "text-[30px] leading-[36px] font-bold tracking-tight text-foreground",
  heading2:
    "text-[24px] leading-[32px] font-semibold tracking-tight text-foreground",
  heading3:
    "text-[20px] leading-[28px] font-semibold tracking-normal text-foreground",
  subheading:
    "text-[18px] leading-[28px] font-medium tracking-normal text-foreground",
  body: "text-[16px] leading-[24px] font-normal tracking-normal text-foreground",
  bodySm:
    "text-[14px] leading-[20px] font-normal tracking-normal text-foreground",
  caption:
    "text-[12px] leading-[16px] font-normal tracking-wide text-muted-foreground",
  label:
    "text-[14px] leading-[20px] font-medium tracking-normal text-foreground",
  overline:
    "text-[12px] leading-[16px] font-semibold tracking-wider uppercase text-muted-foreground",
  code: "text-[14px] leading-[20px] font-normal tracking-normal text-foreground",
};

// ---------------------------------------------------------------------------
// Color Mapping
// ---------------------------------------------------------------------------
// Semantic color shortcuts that map to design system color tokens.
// Consumers use `color="muted"` instead of manually applying classes.
// ---------------------------------------------------------------------------

const colorClassMap: Record<TypographyColor, string> = {
  default: "",
  foreground: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
  inherit: "text-inherit",
};

// ---------------------------------------------------------------------------
// Alignment Mapping
// ---------------------------------------------------------------------------

const alignClassMap: Record<TypographyAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TypographyVariant =
  | "heading1"
  | "heading2"
  | "heading3"
  | "subheading"
  | "body"
  | "bodySm"
  | "caption"
  | "label"
  | "overline"
  | "code";

export type TypographyColor =
  | "default"
  | "foreground"
  | "muted"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "inherit";

export type TypographyAlign = "left" | "center" | "right";

export interface TypographyOwnProps {
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

// We need to accept all HTML attributes of the rendered element,
// but since the element is polymorphic, we use a broad intersection.
export type TypographyProps = TypographyOwnProps &
  Omit<React.HTMLAttributes<HTMLElement>, keyof TypographyOwnProps>;

// ---------------------------------------------------------------------------
// Line Clamp Classes
// ---------------------------------------------------------------------------

const lineClampClassMap: Record<number, string> = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

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
export const Typography = forwardRef<HTMLElement, TypographyProps>(
  function Typography(
    {
      variant = "body",
      font,
      color = "default",
      align,
      as,
      truncate = false,
      lineClamp,
      noMargin = true,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const Component = as ?? defaultElementMap[variant];

    // Resolve the font: explicit `font` prop takes precedence, otherwise
    // use the variant's default font family from the token presets.
    const resolvedFont = font ?? variantDefaultFont[variant];

    const classes = cn(
      // Base variant styles (size, weight, line-height, tracking, default color)
      variantClassMap[variant],
      // Font family (resolved from prop or variant default)
      fontClassMap[resolvedFont],
      // Color override (only applied if not "default" — default keeps variant's color)
      color !== "default" && colorClassMap[color],
      // Alignment
      align && alignClassMap[align],
      // Truncation
      truncate && "truncate",
      // Line clamping
      lineClamp && lineClampClassMap[lineClamp],
      // Margin reset
      noMargin && "m-0",
      // Consumer overrides
      className,
    );

    return (
      <Component
        ref={ref}
        className={classes}
        data-ds=""
        data-ds-component="typography"
        data-ds-variant={variant}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Typography.displayName = "Typography";

// ---------------------------------------------------------------------------
// Convenience Aliases
// ---------------------------------------------------------------------------
// These are thin wrappers around Typography that pre-set the variant.
// They reduce boilerplate and improve readability in consumer code.
//
// Usage:
//   <Heading level={2}>Section Title</Heading>
//   <Heading level={1} font="display">Marketing Hero</Heading>
//   <Body>Paragraph text.</Body>
//   <Body font="serif">Editorial content.</Body>
//   <Caption color="muted">Timestamp</Caption>
// ---------------------------------------------------------------------------

// --- Heading ---

export interface HeadingProps extends Omit<TypographyOwnProps, "variant"> {
  /** Heading level: 1, 2, or 3. Maps to heading1, heading2, heading3 variants. */
  level?: 1 | 2 | 3;
}

export type HeadingComponentProps = HeadingProps &
  Omit<React.HTMLAttributes<HTMLHeadingElement>, keyof HeadingProps>;

const headingVariantMap: Record<1 | 2 | 3, TypographyVariant> = {
  1: "heading1",
  2: "heading2",
  3: "heading3",
};

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
export const Heading = forwardRef<HTMLHeadingElement, HeadingComponentProps>(
  function Heading({ level = 1, ...rest }, ref) {
    return (
      <Typography
        ref={ref as React.Ref<HTMLElement>}
        variant={headingVariantMap[level]}
        {...rest}
      />
    );
  },
);

Heading.displayName = "Heading";

// --- Subheading ---

export type SubheadingProps = Omit<TypographyOwnProps, "variant"> &
  Omit<React.HTMLAttributes<HTMLElement>, keyof TypographyOwnProps>;

/**
 * Subheading — renders an <h4> with the subheading typographic preset.
 */
export const Subheading = forwardRef<HTMLElement, SubheadingProps>(
  function Subheading(props, ref) {
    return <Typography ref={ref} variant="subheading" {...props} />;
  },
);

Subheading.displayName = "Subheading";

// --- Body ---

export type BodyProps = Omit<TypographyOwnProps, "variant"> & {
  /** Use the smaller body variant (14px instead of 16px). */
  small?: boolean;
} & Omit<
    React.HTMLAttributes<HTMLParagraphElement>,
    keyof TypographyOwnProps | "small"
  >;

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
export const Body = forwardRef<HTMLParagraphElement, BodyProps>(function Body(
  { small = false, ...rest },
  ref,
) {
  return (
    <Typography
      ref={ref as React.Ref<HTMLElement>}
      variant={small ? "bodySm" : "body"}
      {...rest}
    />
  );
});

Body.displayName = "Body";

// --- Caption ---

export type CaptionProps = Omit<TypographyOwnProps, "variant"> &
  Omit<React.HTMLAttributes<HTMLElement>, keyof TypographyOwnProps>;

/**
 * Caption — renders a <span> with the caption typographic preset.
 * Default color is muted.
 */
export const Caption = forwardRef<HTMLElement, CaptionProps>(function Caption(
  { color = "muted", ...rest },
  ref,
) {
  return <Typography ref={ref} variant="caption" color={color} {...rest} />;
});

Caption.displayName = "Caption";

// --- Label ---

export type LabelProps = Omit<TypographyOwnProps, "variant"> & {
  /** The form element this label is for. Maps to the htmlFor attribute. */
  htmlFor?: string;
} & Omit<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    keyof TypographyOwnProps | "htmlFor"
  >;

/**
 * Label — renders a <label> with the label typographic preset.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email address</Label>
 * ```
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  {
    htmlFor,
    font,
    color,
    align,
    as,
    truncate,
    lineClamp,
    noMargin = true,
    className,
    children,
    ...rest
  },
  ref,
) {
  // Resolve font for label variant
  const resolvedFont = font ?? variantDefaultFont.label;

  const classes = cn(
    variantClassMap.label,
    fontClassMap[resolvedFont],
    color && color !== "default" && colorClassMap[color],
    align && alignClassMap[align],
    truncate && "truncate",
    lineClamp && lineClampClassMap[lineClamp],
    noMargin && "m-0",
    className,
  );

  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={classes}
      data-ds=""
      data-ds-component="typography"
      data-ds-variant="label"
      {...rest}
    >
      {children}
    </label>
  );
});

Label.displayName = "Label";

// --- Overline ---

export type OverlineProps = Omit<TypographyOwnProps, "variant"> &
  Omit<React.HTMLAttributes<HTMLElement>, keyof TypographyOwnProps>;

/**
 * Overline — renders a <span> with the overline typographic preset.
 * Text is automatically uppercased via the variant's CSS.
 *
 * @example
 * ```tsx
 * <Overline>Getting started</Overline>
 * ```
 */
export const Overline = forwardRef<HTMLElement, OverlineProps>(
  function Overline({ color = "muted", ...rest }, ref) {
    return <Typography ref={ref} variant="overline" color={color} {...rest} />;
  },
);

Overline.displayName = "Overline";

// --- Code (inline) ---

export type InlineCodeProps = Omit<TypographyOwnProps, "variant"> &
  Omit<React.HTMLAttributes<HTMLElement>, keyof TypographyOwnProps>;

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
export const InlineCode = forwardRef<HTMLElement, InlineCodeProps>(
  function InlineCode({ className, ...rest }, ref) {
    return (
      <Typography
        ref={ref}
        variant="code"
        className={cn("rounded-sm bg-muted px-1.5 py-0.5", className)}
        {...rest}
      />
    );
  },
);

InlineCode.displayName = "InlineCode";
