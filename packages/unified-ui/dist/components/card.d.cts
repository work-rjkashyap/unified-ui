import * as react from 'react';
import { ElementType, ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';

type CardPadding = "compact" | "comfortable";
declare const cardVariants: (props?: ({
    variant?: "default" | "outlined" | "elevated" | "interactive" | null | undefined;
    fullWidth?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type CardVariant = "default" | "outlined" | "elevated" | "interactive";
interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">, VariantProps<typeof cardVariants> {
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
declare const Card: react.ForwardRefExoticComponent<CardProps & react.RefAttributes<HTMLDivElement>>;
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
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
interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Additional CSS classes to merge. */
    className?: string;
    /** Content to render inside the card body. */
    children?: ReactNode;
}
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
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
declare const CardHeader: react.ForwardRefExoticComponent<CardHeaderProps & react.RefAttributes<HTMLDivElement>>;
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
declare const CardBody: react.ForwardRefExoticComponent<CardBodyProps & react.RefAttributes<HTMLDivElement>>;
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
declare const CardFooter: react.ForwardRefExoticComponent<CardFooterProps & react.RefAttributes<HTMLDivElement>>;

export { Card, CardBody, type CardBodyProps, CardFooter, type CardFooterProps, CardHeader, type CardHeaderProps, type CardProps, type CardVariant, cardVariants };
