// ============================================================================
// Unified UI — Design Tokens Barrel Export
// ============================================================================
// Single entry point for all Unified UI design tokens. Import from here
// rather than from individual token files to keep imports clean and
// refactoring simple.
//
// Usage:
//   import { spacing, radius, brand, duration } from "@/design-system/tokens";
// ============================================================================

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------
export {
  amber,
  blue,
  brand,
  type ColorScale,
  gray,
  green,
  neutral,
  palettes,
  pure,
  red,
  type SemanticColorKey,
  type SemanticColors,
  semanticDark,
  semanticLight,
  slate,
  teal,
  zinc,
} from "./colors";
// ---------------------------------------------------------------------------
// Motion
// ---------------------------------------------------------------------------
export {
  type Duration,
  duration,
  durationCSS,
  durationSeconds,
  type Easing,
  easing,
  easingCSS,
  type Spring,
  type Stagger,
  spring,
  stagger,
} from "./motion";
// ---------------------------------------------------------------------------
// Radius
// ---------------------------------------------------------------------------
export { type Radius, type RadiusValue, radius } from "./radius";
// ---------------------------------------------------------------------------
// Shadows
// ---------------------------------------------------------------------------
export { type Shadow, type ShadowValue, shadow, shadowDark } from "./shadows";
// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------
export { spacing } from "./spacing";
// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------
export {
  type FontFamily,
  type FontFamilyKey,
  type FontSize,
  type FontWeight,
  fontFamily,
  fontSize,
  fontWeight,
  type LetterSpacing,
  type LineHeight,
  letterSpacing,
  lineHeight,
  type TypographyPreset,
  type TypographyVariant,
  typographyVariants,
} from "./typography";
// ---------------------------------------------------------------------------
// Z-Index
// ---------------------------------------------------------------------------
export { type ZIndex, type ZIndexValue, zIndex } from "./z-index";
