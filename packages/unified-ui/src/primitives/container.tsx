"use client";

// ============================================================================
// Container Primitive
// ============================================================================
// Constrains content width and provides consistent horizontal padding.
// All page-level content should be wrapped in a Container to maintain
// the design system's max-width and responsive padding discipline.
//
// Design rules (from project guidelines):
//   - Max width: max-w-7xl (1280px)
//   - Horizontal padding: px-4 (mobile), px-6 (tablet), px-8 (desktop)
//   - Always centered: mx-auto
//
// Usage:
//   import { Container } from "@/design-system/primitives/container";
//
//   <Container>
//     <Heading level={1}>Page Title</Heading>
//     <Body>Content goes here.</Body>
//   </Container>
//
//   <Container size="sm" padding="tight">
//     <Body>Narrow, tight-padded content.</Body>
//   </Container>
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { type ElementType, forwardRef, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// Size Mapping
// ---------------------------------------------------------------------------
// Controls the max-width of the container. "default" matches the project
// guideline of max-w-7xl (1280px). Smaller sizes are available for
// focused content like forms, articles, and dialogs.
// ---------------------------------------------------------------------------

const sizeClassMap = {
  /** 640px — narrow forms, single-column content */
  xs: "max-w-screen-sm",
  /** 768px — articles, focused reading content */
  sm: "max-w-screen-md",
  /** 1024px — dashboards, multi-column layouts */
  md: "max-w-screen-lg",
  /** 1280px — default, full-width page content */
  lg: "max-w-7xl",
  /** No max-width constraint — full bleed */
  full: "max-w-full",
} as const;

// ---------------------------------------------------------------------------
// Padding Mapping
// ---------------------------------------------------------------------------
// Responsive horizontal padding presets. "default" follows the project
// guideline: px-4 → px-6 → px-8.
// ---------------------------------------------------------------------------

const paddingClassMap = {
  /** No horizontal padding */
  none: "",
  /** Tighter padding: px-3 → px-4 → px-6 */
  tight: "px-3 sm:px-4 lg:px-6",
  /** Standard padding: px-4 → px-6 → px-8 (project default) */
  default: "px-4 sm:px-6 lg:px-8",
  /** Wider padding: px-6 → px-8 → px-10 */
  wide: "px-6 sm:px-8 lg:px-10",
} as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ContainerSize = keyof typeof sizeClassMap;
export type ContainerPadding = keyof typeof paddingClassMap;

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

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
export const Container = forwardRef<HTMLElement, ContainerProps>(
  function Container(
    {
      size = "lg",
      padding = "default",
      centered = true,
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
          // Max-width constraint
          sizeClassMap[size],
          // Responsive horizontal padding
          paddingClassMap[padding],
          // Centering
          centered && "mx-auto",
          // Width fills available space up to max-width
          "w-full",
          // Consumer overrides
          className,
        )}
        data-ds=""
        data-ds-component="container"
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Container.displayName = "Container";
