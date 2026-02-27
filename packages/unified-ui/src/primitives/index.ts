// ============================================================================
// Unified UI — Primitives Barrel Export
// ============================================================================
// Single entry point for all Unified UI primitive components. Import from
// here rather than from individual primitive files.
//
// Usage:
//   import { Typography, Heading, Body, Caption, Label } from "@/design-system/primitives";
//   import { Container, Stack, Grid } from "@/design-system/primitives";
//   import { Divider } from "@/design-system/primitives";
// ============================================================================

// ---------------------------------------------------------------------------
// Layout — Container
// ---------------------------------------------------------------------------
export {
  Container,
  type ContainerPadding,
  type ContainerProps,
  type ContainerSize,
} from "./container";
// ---------------------------------------------------------------------------
// Divider
// ---------------------------------------------------------------------------
export { Divider, type DividerProps } from "./divider";

// ---------------------------------------------------------------------------
// Layout — Stack & Grid
// ---------------------------------------------------------------------------
export {
  Grid,
  type GridProps,
  Stack,
  type StackAlign,
  type StackDirection,
  type StackJustify,
  type StackProps,
} from "./stack";
// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------
export {
  Body,
  type BodyProps,
  Caption,
  type CaptionProps,
  Heading,
  type HeadingComponentProps,
  type HeadingProps,
  InlineCode,
  type InlineCodeProps,
  Label,
  type LabelProps,
  Overline,
  type OverlineProps,
  Subheading,
  type SubheadingProps,
  Typography,
  type TypographyAlign,
  type TypographyColor,
  type TypographyFont,
  type TypographyOwnProps,
  type TypographyProps,
  type TypographyVariant,
} from "./typography";
