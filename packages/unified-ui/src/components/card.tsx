"use client";

// ============================================================================
// Unified UI — Card Component
// ============================================================================
// A versatile card container component built on the Unified UI token layer.
// Composed from the Stack primitive internally, with slot-based customization
// for header, body, and footer sections.
//
// Features:
//   - 4 visual variants: default, outlined, elevated, interactive
//   - Slot-based composition: header, body, footer sub-components
//   - Interactive variant with hover lift animation
//   - Padding options: compact (p-4) and comfortable (p-6)
//   - Full ref forwarding
//   - Polymorphic: can render as any element via `as` prop
//   - WCAG AA accessible: proper focus ring on interactive variant
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { Card, CardHeader, CardBody, CardFooter } from "@/design-system/components/card";
//
//   <Card>
//     <CardHeader>Title</CardHeader>
//     <CardBody>Content goes here</CardBody>
//     <CardFooter>Actions</CardFooter>
//   </Card>
//
//   <Card variant="interactive" as="a" href="/details">
//     <CardBody>Clickable card</CardBody>
//   </Card>
//
//   <Card variant="elevated" padding="comfortable">
//     <CardBody>Elevated card with more padding</CardBody>
//   </Card>
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { cva, type VariantProps } from "class-variance-authority";
import {
  createContext,
  type ElementType,
  forwardRef,
  type ReactNode,
  useContext,
} from "react";

// ---------------------------------------------------------------------------
// Card Context (Internal)
// ---------------------------------------------------------------------------
// Shares padding preference from Card root to slot sub-components so they
// can apply consistent internal padding without the consumer needing to
// pass `padding` to each slot individually.
// ---------------------------------------------------------------------------

type CardPadding = "compact" | "comfortable";

interface CardContextValue {
  padding: CardPadding;
}

const CardContext = createContext<CardContextValue>({ padding: "compact" });

function useCardContext(): CardContextValue {
  return useContext(CardContext);
}

// ---------------------------------------------------------------------------
// Padding Maps
// ---------------------------------------------------------------------------

const cardPaddingMap: Record<CardPadding, string> = {
  compact: "p-4",
  comfortable: "p-6",
};

const slotPaddingXMap: Record<CardPadding, string> = {
  compact: "px-4",
  comfortable: "px-6",
};

const slotPaddingTopMap: Record<CardPadding, string> = {
  compact: "pt-4",
  comfortable: "pt-6",
};

const slotPaddingBottomMap: Record<CardPadding, string> = {
  compact: "pb-4",
  comfortable: "pb-6",
};

// ---------------------------------------------------------------------------
// CVA Variant Definition — Card Root
// ---------------------------------------------------------------------------

export const cardVariants = cva(
  // Base styles — shared across all variants
  [
    // Layout
    "flex flex-col",
    // Shape
    "rounded-md",
    // Overflow
    "overflow-hidden",
    // Typography defaults
    "text-sm text-foreground",
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Visual Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Default — subtle background with border.
         * The most common card style, blends into the page.
         */
        default: ["bg-surface", "border border-border"],

        /**
         * Outlined — transparent background with stronger border.
         * Use when the card sits on a colored or complex background.
         */
        outlined: ["bg-transparent", "border border-border-strong"],

        /**
         * Elevated — raised card with shadow.
         * Use to draw attention or lift content above the page surface.
         */
        elevated: [
          "bg-surface-raised",
          "border border-border-muted",
          "shadow-md",
        ],

        /**
         * Interactive — clickable card with hover/focus states.
         * Includes hover lift animation and cursor pointer.
         * Renders well as <a>, <button>, or <Link>.
         */
        interactive: [
          "bg-surface",
          "border border-border",
          // Transition
          "transition-[border-color,box-shadow,transform]",
          "duration-normal ease-standard",
          // Hover
          "hover:border-border-strong",
          "hover:shadow-md",
          "hover:-translate-y-0.5",
          // Active / press
          "active:translate-y-0 active:shadow-sm",
          // Focus
          focusRingClasses,
          // Cursor
          "cursor-pointer",
          // Remove text decoration for anchor usage
          "no-underline",
        ],
      },

      // -----------------------------------------------------------------
      // Full Width
      // -----------------------------------------------------------------
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },

    defaultVariants: {
      variant: "default",
      fullWidth: false,
    },
  },
);

// ---------------------------------------------------------------------------
// Types — Card Root
// ---------------------------------------------------------------------------

export type CardVariant = "default" | "outlined" | "elevated" | "interactive";

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof cardVariants> {
  /**
   * Visual variant of the card.
   * @default "default"
   */
  variant?: CardVariant;

  /**
   * Padding scale applied to slot sub-components.
   * - `"compact"` → p-4 (16px) — good for dense UIs and smaller cards
   * - `"comfortable"` → p-6 (24px) — good for prominent content cards
   *
   * This does NOT apply padding to the card root itself (to allow
   * edge-to-edge images/content). Padding is applied to CardHeader,
   * CardBody, and CardFooter sub-components.
   *
   * @default "compact"
   */
  padding?: CardPadding;

  /**
   * Whether the card stretches to fill its container width.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * The HTML element or component to render as.
   * Use `"a"` or a Link component for interactive cards.
   * @default "div"
   */
  as?: ElementType;

  /** Content to render inside the card. */
  children?: ReactNode;

  /** Additional CSS classes to merge. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Card Root Component
// ---------------------------------------------------------------------------

/**
 * Card — a versatile container for grouping related content and actions.
 *
 * Built on the design system's token layer with CVA for variant composition.
 * All colors, radii, spacing, and transitions come from CSS custom properties
 * defined in design-system.css.
 *
 * The card uses a slot-based pattern with `CardHeader`, `CardBody`, and
 * `CardFooter` sub-components. Padding flows from the root `padding` prop
 * to all slot children via context.
 *
 * Accessibility:
 *   - Interactive variant has focus ring on keyboard navigation
 *   - When used as a link (`as="a"`), supports standard link semantics
 *   - Content within cards should maintain proper heading hierarchy
 *
 * @example
 * ```tsx
 * // Basic card with all slots
 * <Card>
 *   <CardHeader>
 *     <h3>Card Title</h3>
 *   </CardHeader>
 *   <CardBody>
 *     <p>Card content goes here.</p>
 *   </CardBody>
 *   <CardFooter>
 *     <Button variant="primary" size="sm">Action</Button>
 *   </CardFooter>
 * </Card>
 *
 * // Elevated card with comfortable padding
 * <Card variant="elevated" padding="comfortable">
 *   <CardBody>
 *     <p>More spacious card content.</p>
 *   </CardBody>
 * </Card>
 *
 * // Interactive card (clickable)
 * <Card variant="interactive" as="a" href="/details">
 *   <CardBody>
 *     <p>Click to view details</p>
 *   </CardBody>
 * </Card>
 *
 * // Outlined card, full width
 * <Card variant="outlined" fullWidth>
 *   <CardBody>Full-width outlined card</CardBody>
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = "default",
    padding = "compact",
    fullWidth = false,
    as: Component = "div",
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <CardContext.Provider value={{ padding }}>
      <Component
        ref={ref}
        className={cn(
          "not-prose",
          cardVariants({ variant, fullWidth }),
          className,
        )}
        data-ds=""
        data-ds-component="card"
        data-ds-variant={variant}
        {...rest}
      >
        {children}
      </Component>
    </CardContext.Provider>
  );
});

Card.displayName = "Card";

// ---------------------------------------------------------------------------
// Types — Card Slots
// ---------------------------------------------------------------------------

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to show a bottom border separator.
   * @default true
   */
  bordered?: boolean;

  /** Additional CSS classes to merge. */
  className?: string;

  /** Content to render inside the card header. */
  children?: ReactNode;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes to merge. */
  className?: string;

  /** Content to render inside the card body. */
  children?: ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to show a top border separator.
   * @default true
   */
  bordered?: boolean;

  /**
   * Horizontal alignment of footer content.
   * @default "end"
   */
  align?: "start" | "center" | "end" | "between";

  /** Additional CSS classes to merge. */
  className?: string;

  /** Content to render inside the card footer. */
  children?: ReactNode;
}

// ---------------------------------------------------------------------------
// Alignment Map
// ---------------------------------------------------------------------------

const alignMap: Record<string, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

// ---------------------------------------------------------------------------
// CardHeader Component
// ---------------------------------------------------------------------------

/**
 * CardHeader — the top section of a Card, typically for titles and actions.
 *
 * Inherits padding from the parent Card's `padding` prop via context.
 * Renders a bottom border by default to separate from the body.
 *
 * @example
 * ```tsx
 * <CardHeader>
 *   <h3 className="text-base font-semibold">Card Title</h3>
 *   <p className="text-muted-foreground text-sm">Subtitle text</p>
 * </CardHeader>
 *
 * <CardHeader bordered={false}>
 *   <h3>No border header</h3>
 * </CardHeader>
 * ```
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader({ bordered = true, className, children, ...rest }, ref) {
    const { padding } = useCardContext();

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-1.5",
          slotPaddingXMap[padding],
          slotPaddingTopMap[padding],
          slotPaddingBottomMap[padding],
          bordered && "border-b border-border-muted",
          className,
        )}
        data-ds=""
        data-ds-component="card-header"
        {...rest}
      >
        {children}
      </div>
    );
  },
);

CardHeader.displayName = "CardHeader";

// ---------------------------------------------------------------------------
// CardBody Component
// ---------------------------------------------------------------------------

/**
 * CardBody — the main content area of a Card.
 *
 * Inherits padding from the parent Card's `padding` prop via context.
 * This is the primary slot where card content should be placed.
 *
 * @example
 * ```tsx
 * <CardBody>
 *   <p>This is the main content of the card.</p>
 * </CardBody>
 * ```
 */
export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  function CardBody({ className, children, ...rest }, ref) {
    const { padding } = useCardContext();

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2 flex-1",
          cardPaddingMap[padding],
          className,
        )}
        data-ds=""
        data-ds-component="card-body"
        {...rest}
      >
        {children}
      </div>
    );
  },
);

CardBody.displayName = "CardBody";

// ---------------------------------------------------------------------------
// CardFooter Component
// ---------------------------------------------------------------------------

/**
 * CardFooter — the bottom section of a Card, typically for actions/buttons.
 *
 * Inherits padding from the parent Card's `padding` prop via context.
 * Renders a top border by default to separate from the body.
 * Footer content is right-aligned by default (common pattern for action buttons).
 *
 * @example
 * ```tsx
 * <CardFooter>
 *   <Button variant="ghost" size="sm">Cancel</Button>
 *   <Button variant="primary" size="sm">Save</Button>
 * </CardFooter>
 *
 * <CardFooter align="between">
 *   <span className="text-sm text-muted-foreground">Step 2 of 4</span>
 *   <Button variant="primary" size="sm">Next</Button>
 * </CardFooter>
 *
 * <CardFooter bordered={false} align="start">
 *   <Button variant="ghost" size="sm">Learn more</Button>
 * </CardFooter>
 * ```
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter(
    { bordered = true, align = "end", className, children, ...rest },
    ref,
  ) {
    const { padding } = useCardContext();

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2",
          slotPaddingXMap[padding],
          slotPaddingTopMap[padding],
          slotPaddingBottomMap[padding],
          bordered && "border-t border-border-muted",
          alignMap[align],
          className,
        )}
        data-ds=""
        data-ds-component="card-footer"
        {...rest}
      >
        {children}
      </div>
    );
  },
);

CardFooter.displayName = "CardFooter";
