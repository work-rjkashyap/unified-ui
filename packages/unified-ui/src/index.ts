// ============================================================================
// Unified UI — Design System Entry Point
// ============================================================================
// Unified UI is a token-driven design system for React applications built
// with Next.js, Tailwind CSS v4, and Framer Motion. This is the single
// top-level entry point — all tokens, theme utilities, primitives,
// components, motion presets, and utility functions are re-exported here.
//
// Recommended import patterns:
//
//   // Import specific items from the top level
//   import { Button, Stack, fadeIn, cn } from "@/design-system";
//
//   // Or import from specific sublayers for clarity in larger files
//   import { spacing, radius } from "@/design-system/tokens";
//   import { DSThemeProvider } from "@/design-system/theme";
//   import { Typography, Heading } from "@/design-system/primitives";
//   import { Button } from "@/design-system/components";
//   import { slideUp, motionProps } from "@/design-system/motion";
//
// CSS custom properties use the `--ds-` prefix to avoid collisions with
// host application styles and third-party libraries.
//
// @see https://github.com/rajeshwar/unified-ui
// ============================================================================

/** Current version of the Unified UI design system. */
export const UNIFIED_UI_VERSION = "0.1.0" as const;

export {
  Accordion,
  AccordionContent,
  type AccordionContentProps,
  AccordionItem,
  type AccordionItemProps,
  type AccordionMultipleProps,
  type AccordionProps,
  type AccordionSingleProps,
  type AccordionSize,
  AccordionTrigger,
  type AccordionTriggerProps,
  type AccordionVariant,
  accordionRootVariants,
  accordionTriggerVariants,
} from "./components/accordion";
export {
  Alert,
  type AlertProps,
  type AlertVariant,
  alertVariants,
} from "./components/alert";
export {
  Avatar,
  AvatarGroup,
  type AvatarGroupProps,
  type AvatarProps,
  type AvatarShape,
  type AvatarSize,
  type AvatarStatus,
  avatarVariants,
} from "./components/avatar";
export {
  Badge,
  type BadgeProps,
  type BadgeSize,
  type BadgeVariant,
  badgeVariants,
} from "./components/badge";
export {
  Breadcrumb,
  BreadcrumbEllipsis,
  type BreadcrumbEllipsisProps,
  BreadcrumbItem,
  type BreadcrumbItemProps,
  BreadcrumbLink,
  type BreadcrumbLinkProps,
  BreadcrumbList,
  type BreadcrumbListProps,
  BreadcrumbNav,
  type BreadcrumbNavItem,
  type BreadcrumbNavProps,
  BreadcrumbPage,
  type BreadcrumbPageProps,
  type BreadcrumbProps,
  BreadcrumbSeparator,
  type BreadcrumbSeparatorProps,
} from "./components/breadcrumb";
// ---------------------------------------------------------------------------
// Layer 4: Composite Components
// ---------------------------------------------------------------------------
// Higher-level Unified UI components built from primitives. These implement
// complex interaction patterns, accessibility requirements, and visual
// design rules.
// ---------------------------------------------------------------------------
export {
  Button,
  type ButtonProps,
  type ButtonSize,
  type ButtonVariant,
  buttonVariants,
} from "./components/button";
export {
  Card,
  CardBody,
  type CardBodyProps,
  CardFooter,
  type CardFooterProps,
  CardHeader,
  type CardHeaderProps,
  type CardProps,
  type CardVariant,
  cardVariants,
} from "./components/card";
export {
  Checkbox,
  CheckboxGroup,
  type CheckboxGroupOrientation,
  type CheckboxGroupProps,
  type CheckboxProps,
  type CheckboxSize,
  checkboxVariants,
  useCheckboxGroupContext,
} from "./components/checkbox";
export {
  Dialog,
  DialogBody,
  type DialogBodyProps,
  DialogClose,
  type DialogCloseProps,
  DialogContent,
  type DialogContentProps,
  DialogDescription,
  type DialogDescriptionProps,
  DialogFooter,
  type DialogFooterProps,
  DialogHeader,
  type DialogHeaderProps,
  type DialogProps,
  type DialogSize,
  DialogTitle,
  type DialogTitleProps,
  DialogTrigger,
  type DialogTriggerProps,
  dialogContentVariants,
} from "./components/dialog";
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  type DropdownMenuCheckboxItemProps,
  DropdownMenuContent,
  type DropdownMenuContentProps,
  DropdownMenuGroup,
  type DropdownMenuGroupProps,
  DropdownMenuItem,
  type DropdownMenuItemProps,
  type DropdownMenuItemVariant,
  DropdownMenuLabel,
  type DropdownMenuLabelProps,
  type DropdownMenuProps,
  DropdownMenuRadioGroup,
  type DropdownMenuRadioGroupProps,
  DropdownMenuRadioItem,
  type DropdownMenuRadioItemProps,
  DropdownMenuSeparator,
  type DropdownMenuSeparatorProps,
  DropdownMenuShortcut,
  type DropdownMenuShortcutProps,
  DropdownMenuSub,
  DropdownMenuSubContent,
  type DropdownMenuSubContentProps,
  type DropdownMenuSubProps,
  DropdownMenuSubTrigger,
  type DropdownMenuSubTriggerProps,
  DropdownMenuTrigger,
  type DropdownMenuTriggerProps,
} from "./components/dropdown-menu";
export {
  Input,
  type InputProps,
  type InputSize,
  type InputVariant,
  inputVariants,
} from "./components/input";
export {
  Pagination,
  type PaginationProps,
  type PaginationSize,
  type PaginationVariant,
  paginationButtonVariants,
} from "./components/pagination";
export {
  Popover,
  PopoverArrow,
  type PopoverArrowProps,
  PopoverClose,
  type PopoverCloseProps,
  PopoverContent,
  type PopoverContentProps,
  type PopoverProps,
  PopoverTrigger,
  type PopoverTriggerProps,
} from "./components/popover";
export {
  RadioCard,
  type RadioCardProps,
  RadioGroup,
  RadioGroupItem,
  type RadioGroupItemProps,
  type RadioGroupProps,
  type RadioOrientation,
  type RadioSize,
  radioCardVariants,
  radioGroupVariants,
  radioIndicatorVariants,
} from "./components/radio";
export {
  Select,
  SelectGroup,
  type SelectGroupProps,
  SelectItem,
  type SelectItemProps,
  SelectLabel,
  type SelectLabelProps,
  type SelectProps,
  SelectSeparator,
  type SelectSeparatorProps,
  type SelectSize,
  type SelectVariant,
  selectTriggerVariants,
} from "./components/select";
export {
  Sheet,
  SheetClose,
  type SheetCloseProps,
  SheetContent,
  type SheetContentProps,
  SheetDescription,
  type SheetDescriptionProps,
  SheetFooter,
  type SheetFooterProps,
  SheetHeader,
  type SheetHeaderProps,
  type SheetProps,
  type SheetSide,
  type SheetSize,
  SheetTitle,
  type SheetTitleProps,
  SheetTrigger,
  type SheetTriggerProps,
  sheetContentVariants,
} from "./components/sheet";
export {
  Skeleton,
  SkeletonCircle,
  type SkeletonCircleProps,
  type SkeletonProps,
  SkeletonRect,
  type SkeletonRectProps,
  type SkeletonSize,
  SkeletonText,
  type SkeletonTextProps,
  type SkeletonTextSize,
  skeletonVariants,
} from "./components/skeleton";
export {
  Switch,
  type SwitchLabelPosition,
  type SwitchProps,
  type SwitchSize,
  switchThumbVariants,
  switchTrackVariants,
} from "./components/switch";
export {
  Table,
  type TableAlign,
  TableBody,
  type TableBodyProps,
  TableCaption,
  type TableCaptionProps,
  TableCell,
  type TableCellProps,
  type TableDensity,
  TableFooter,
  type TableFooterProps,
  TableHead,
  TableHeader,
  type TableHeaderProps,
  type TableHeadProps,
  type TableProps,
  TableRow,
  type TableRowProps,
  type TableSortDirection,
  tableRootVariants,
} from "./components/table";
export {
  Tabs,
  TabsContent,
  type TabsContentProps,
  TabsList,
  type TabsListProps,
  type TabsOrientation,
  type TabsProps,
  type TabsSize,
  TabsTrigger,
  type TabsTriggerProps,
  type TabsVariant,
  tabsListVariants,
  tabsTriggerVariants,
} from "./components/tabs";
export {
  Textarea,
  type TextareaProps,
  type TextareaSize,
  type TextareaVariant,
  textareaVariants,
} from "./components/textarea";
export {
  type ToastAction,
  type ToastAPI,
  type ToastData,
  ToastItem,
  type ToastItemProps,
  type ToastOptions,
  type ToastPosition,
  ToastProvider,
  type ToastProviderProps,
  type ToastVariant,
  toastVariants,
  useToast,
} from "./components/toast";
export {
  Tooltip,
  type TooltipAlign,
  type TooltipProps,
  TooltipProvider,
  type TooltipProviderProps,
  type TooltipSide,
} from "./components/tooltip";
// ---------------------------------------------------------------------------
// Layer 5: Motion System
// ---------------------------------------------------------------------------
// Framer Motion animation presets and utilities built on top of the Unified
// UI motion tokens. Provides a consistent motion language across the
// application.
// ---------------------------------------------------------------------------
export {
  // Blur
  blurIn,
  blurInSubtle,
  // Expand / Collapse
  expandHeight,
  expandHeightSlow,
  // Fade presets
  fadeIn,
  fadeInFast,
  fadeInSlow,
  hoverLift,
  hoverScale,
  // Motion types
  type MotionPreset,
  type MotionPropsResult,
  // Motion hooks & runtime utilities
  MotionSafe,
  type MotionSafeProps,
  modalContent,
  modalContentSpring,
  // Spread helper
  motionProps,
  // Overlay / Modal / Toast
  overlayBackdrop,
  // Pop / Emphasis
  pop,
  popSubtle,
  // Micro-interactions
  press,
  // Loading states
  pulse,
  // Reduced motion utilities
  reduceMotion,
  type SpringConfig,
  // Scale presets
  scaleIn,
  scaleInLg,
  scaleInSpring,
  slideDown,
  slideDownSm,
  slideInFromBottom,
  slideInFromLeft,
  slideInFromRight,
  // Slide horizontal
  slideLeft,
  slideRight,
  // Slide vertical
  slideUp,
  slideUpLg,
  slideUpSm,
  slideUpSpring,
  spin,
  // Stagger containers
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  tapScale,
  toastSlideIn,
  toastSlideUp,
  useMotion,
  useMotionProps,
  useMotionSpringConfig,
  useReducedMotion,
  withReducedMotion,
} from "./motion";

// ---------------------------------------------------------------------------
// Layer 3: Primitive Components
// ---------------------------------------------------------------------------
// Foundational Unified UI building blocks — typography, layout, and
// structural elements. These are the lowest-level components that composite
// components are built from. They consume design tokens via Tailwind `ds-*`
// utilities.
// ---------------------------------------------------------------------------
export {
  Body,
  type BodyProps,
  Caption,
  type CaptionProps,
  // Layout
  Container,
  type ContainerPadding,
  type ContainerProps,
  type ContainerSize,
  Divider,
  type DividerProps,
  Grid,
  type GridProps,
  Heading,
  type HeadingComponentProps,
  type HeadingProps,
  InlineCode,
  type InlineCodeProps,
  Label,
  type LabelProps,
  Overline,
  type OverlineProps,
  Stack,
  type StackAlign,
  type StackDirection,
  type StackJustify,
  type StackProps,
  Subheading,
  type SubheadingProps,
  // Typography
  Typography,
  type TypographyAlign,
  type TypographyColor,
  // Primitive types
  type TypographyFont,
  type TypographyOwnProps,
  type TypographyProps,
  type TypographyVariant,
} from "./primitives";
// ---------------------------------------------------------------------------
// Layer 2: Theme System
// ---------------------------------------------------------------------------
// CSS variable contract (`--ds-*`), theme provider, and theme toggle hook.
// The theme layer bridges Unified UI tokens to runtime by mapping them to
// CSS custom properties and providing React context for theme-aware
// components.
// ---------------------------------------------------------------------------
export {
  buildDarkThemeVars,
  buildLightThemeVars,
  buildThemeCSS,
  type ColorVarName,
  // Theme contract & CSS variable utilities
  contract,
  cssVar,
  type DSThemeContextValue,
  // Theme provider & hook
  DSThemeProvider,
  type DSThemeProviderProps,
  type DurationVarName,
  type EasingVarName,
  type FontFamilyVarName,
  type RadiusVarName,
  type ResolvedTheme,
  type ShadowVarName,
  // Theme types
  type ThemeMode,
  type ThemeVars,
  useDSTheme,
  type ZIndexVarName,
} from "./theme";
// ---------------------------------------------------------------------------
// Layer 1: Design Tokens
// ---------------------------------------------------------------------------
// Raw design values — colors, spacing, typography, radius, shadows, z-index,
// and motion timing. These are the single source of truth for all visual
// properties in the Unified UI system.
// ---------------------------------------------------------------------------
export {
  amber,
  blue,
  brand,
  // Token types
  type ColorScale,
  type Duration,
  // Motion tokens
  duration,
  durationCSS,
  durationSeconds,
  type Easing,
  easing,
  easingCSS,
  type FontFamily,
  type FontFamilyKey,
  type FontSize,
  type FontWeight,
  // Typography tokens
  fontFamily,
  fontSize,
  fontWeight,
  gray,
  green,
  type LetterSpacing,
  type LineHeight,
  letterSpacing,
  lineHeight,
  neutral,
  palettes,
  pure,
  type Radius,
  type RadiusValue,
  // Radius
  radius,
  red,
  type SemanticColorKey,
  type SemanticColors,
  type Shadow,
  type ShadowValue,
  type Spring,
  type Stagger,
  semanticDark,
  semanticLight,
  // Shadows
  shadow,
  shadowDark,
  // Color palettes
  slate,
  // Spacing
  spacing,
  spring,
  stagger,
  type TypographyPreset,
  type TypographyVariant as TypographyVariantToken,
  teal,
  typographyVariants,
  type ZIndex,
  type ZIndexValue,
  // Z-Index
  zIndex,
  zinc,
} from "./tokens";

// ---------------------------------------------------------------------------
// Layer 6: Utilities
// ---------------------------------------------------------------------------
// Shared utility functions and types used across the Unified UI design
// system.
// ---------------------------------------------------------------------------
export {
  type AsProp,
  cn,
  composeRefs,
  dsAttr,
  dsColorVar,
  dsStateAttr,
  dsVar,
  mergeSlots,
  noop,
  type PolymorphicProps,
  type PolymorphicPropsWithRef,
  type PolymorphicRef,
  type SlotClasses,
  typedKeys,
} from "./utils/cn";
// ---------------------------------------------------------------------------
// Layer 8: WCAG Contrast Checking Utilities
// ---------------------------------------------------------------------------
export {
  type AuditResult,
  auditContrast,
  type ColorPair,
  type ContrastResult,
  checkDSContrast,
  checkHexContrast,
  contrastRatio,
  DS_DARK_CRITICAL_PAIRS,
  DS_LIGHT_CRITICAL_PAIRS,
  meetsAA,
  meetsAAA,
  meetsNonTextAA,
  parseHex,
  parseRGBString,
  type RGB,
  relativeLuminance,
  type TextSize,
  toRGBString,
  WCAG_AA_LARGE,
  WCAG_AA_NORMAL,
  WCAG_AAA_LARGE,
  WCAG_AAA_NORMAL,
  WCAG_NON_TEXT_AA,
} from "./utils/contrast";

// ---------------------------------------------------------------------------
// Layer 7: Focus Ring Utilities
// ---------------------------------------------------------------------------
export {
  type FocusRingVariant,
  focusRingClasses,
  focusRingClassList,
  focusRingCompactClasses,
  focusRingCompactClassList,
  focusRingGroupRingClasses,
  focusRingGroupTriggerClasses,
  focusRingInsetClasses,
  focusRingInsetClassList,
  focusRingVariantOverrides,
  focusWithinRingClasses,
  focusWithinRingClassList,
} from "./utils/focus-ring";
export {
  type ChildrenProps,
  type ComponentIntent,
  type ComponentSize,
  dsDataAttrs,
  type OptionalChildrenProps,
  type SlotConfig,
  type Slots,
} from "./utils/types";
