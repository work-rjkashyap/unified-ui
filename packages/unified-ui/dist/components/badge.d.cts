import * as react from 'react';
import { ElementType, ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';

declare const badgeVariants: (props?: ({
    variant?: "outline" | "info" | "success" | "warning" | "danger" | "default" | "primary" | "secondary" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type BadgeVariant = "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "outline";
type BadgeSize = "sm" | "md" | "lg";
interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">, VariantProps<typeof badgeVariants> {
    /**
     * Visual variant of the badge.
     * @default "default"
     */
    variant?: BadgeVariant;
    /**
     * Size of the badge.
     * @default "md"
     */
    size?: BadgeSize;
    /**
     * Whether to show a colored dot indicator before the text.
     * Useful for status indicators (online/offline, active/inactive).
     * The dot color automatically matches the badge variant.
     * @default false
     */
    dot?: boolean;
    /**
     * Whether the badge can be dismissed/removed.
     * When true, a small "×" button is rendered after the text.
     * Alias for `dismissible` — both work identically.
     * @default false
     */
    removable?: boolean;
    /**
     * Whether the badge can be dismissed/removed.
     * When true, a small "×" button is rendered after the text.
     * Alias for `removable` — both work identically.
     * @default false
     */
    dismissible?: boolean;
    /**
     * Callback fired when the remove/dismiss (×) button is clicked.
     * Only relevant when `removable` or `dismissible` is true.
     */
    onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * Callback fired when the remove/dismiss (×) button is clicked.
     * Alias for `onRemove` — both work identically.
     * Only relevant when `removable` or `dismissible` is true.
     */
    onDismiss?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * Accessible label for the remove/dismiss button.
     * Screen readers will announce this when the remove button is focused.
     * @default "Remove"
     */
    removeLabel?: string;
    /**
     * Accessible label for the remove/dismiss button.
     * Alias for `removeLabel` — both work identically.
     * @default "Remove"
     */
    dismissLabel?: string;
    /**
     * The HTML element or component to render as.
     * @default "span"
     */
    as?: ElementType;
    /**
     * Icon to display before the text (after the dot if both are present).
     * Typically a small Lucide icon.
     */
    icon?: ReactNode;
    /**
     * Avatar element to display before the label.
     * Common for user-mention chips and team tags.
     */
    avatar?: ReactNode;
    /**
     * Whether the badge is disabled.
     * Reduces opacity and disables pointer events.
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether to animate the badge entrance with a subtle pop animation.
     * Uses the `popSubtle` Framer Motion preset.
     * @default false
     */
    animated?: boolean;
    /** Content to render inside the badge. */
    children?: ReactNode;
    /** Additional CSS classes to merge. */
    className?: string;
}
/**
 * Badge — a compact inline label for categorization, status, and metadata.
 *
 * This is the unified Badge component that merges the former Badge and Tag
 * components into a single API. All features from both are available:
 * - Dot indicators, icons, avatars, removable/dismissible, polymorphic `as`,
 *   disabled state, and optional Framer Motion animation.
 *
 * Built on the design system's token layer with CVA for variant composition.
 * All colors, radii, spacing, and transitions come from CSS custom properties
 * defined in design-system.css.
 *
 * Badges are non-interactive by default (rendered as `<span>`). For
 * clickable badges, use `as="button"` or `as="a"` and add appropriate
 * event handlers.
 *
 * Accessibility:
 *   - Color is never the sole means of conveying information — use text labels
 *   - Dot indicators are decorative (`aria-hidden`)
 *   - Remove/dismiss button has a configurable `aria-label` (defaults to "Remove")
 *   - Semantic colors meet WCAG AA contrast on their muted backgrounds
 *   - Disabled state applies `pointer-events-none` and reduced opacity
 *
 * @example
 * ```tsx
 * // Basic variants
 * <Badge>Default</Badge>
 * <Badge variant="primary">Primary</Badge>
 * <Badge variant="secondary">Secondary</Badge>
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning">Pending</Badge>
 * <Badge variant="danger">Critical</Badge>
 * <Badge variant="info">New</Badge>
 * <Badge variant="outline">Draft</Badge>
 *
 * // Sizes
 * <Badge size="sm">Small</Badge>
 * <Badge size="md">Medium</Badge>
 * <Badge size="lg">Large</Badge>
 *
 * // Dot indicator (status badges)
 * <Badge variant="success" dot>Online</Badge>
 * <Badge variant="danger" dot>Offline</Badge>
 * <Badge variant="warning" dot>Away</Badge>
 *
 * // With icon
 * <Badge variant="info" icon={<StarIcon className="size-3" />}>
 *   Featured
 * </Badge>
 *
 * // With avatar (user mention chips)
 * <Badge variant="secondary" avatar={<Avatar name="RK" size="xs" className="size-4" />}>
 *   @rjkashyap
 * </Badge>
 *
 * // Removable (Badge-style API)
 * <Badge variant="primary" removable onRemove={handleRemove}>
 *   Tag Name
 * </Badge>
 *
 * // Dismissible (Tag-style API — both work identically)
 * <Badge variant="primary" dismissible onDismiss={handleDismiss}>
 *   React
 * </Badge>
 *
 * // Animated entrance
 * <Badge variant="success" animated>Live</Badge>
 *
 * // Disabled
 * <Badge variant="primary" disabled>Disabled</Badge>
 *
 * // As a link
 * <Badge as="a" href="/category/react" variant="primary">
 *   React
 * </Badge>
 *
 * // As a button
 * <Badge as="button" variant="outline" onClick={handleClick}>
 *   Filter
 * </Badge>
 * ```
 */
declare const Badge: react.ForwardRefExoticComponent<BadgeProps & react.RefAttributes<HTMLSpanElement>>;
type TagVariant = BadgeVariant;
type TagSize = BadgeSize;
interface TagProps extends Omit<BadgeProps, "as" | "dot" | "removable" | "onRemove" | "removeLabel"> {
    /**
     * Visual variant of the tag.
     * @default "default"
     */
    variant?: TagVariant;
    /**
     * Size of the tag.
     * @default "md"
     */
    size?: TagSize;
    /**
     * Leading avatar or icon slot.
     */
    avatar?: ReactNode;
    /**
     * Trailing icon (shown before close button).
     */
    icon?: ReactNode;
    /**
     * Whether the tag can be dismissed.
     */
    dismissible?: boolean;
    /**
     * Called when the dismiss button is clicked.
     */
    onDismiss?: () => void;
    /**
     * Accessible label for the dismiss button.
     * @default "Remove tag"
     */
    dismissLabel?: string;
    /**
     * Whether the tag is disabled.
     */
    disabled?: boolean;
    /**
     * Whether to animate the badge entrance.
     * Tags default to `true` to preserve original Tag behavior.
     * @default true
     */
    animated?: boolean;
    /** Additional CSS classes. */
    className?: string;
    children?: ReactNode;
}
/**
 * Tag — backward-compatible alias for Badge.
 *
 * Renders an animated Badge by default (`animated={true}`).
 * All Tag-specific props (dismissible, onDismiss, avatar, disabled)
 * map directly to Badge props.
 *
 * @deprecated Use `Badge` directly with `animated` prop if entrance
 *   animation is desired. The `Tag` alias will be removed in a future
 *   major version.
 *
 * @example
 * ```tsx
 * <Tag variant="primary" dismissible onDismiss={handleDismiss}>
 *   React
 * </Tag>
 *
 * // Equivalent Badge usage:
 * <Badge variant="primary" dismissible onDismiss={handleDismiss} animated>
 *   React
 * </Badge>
 * ```
 */
declare const Tag: react.ForwardRefExoticComponent<TagProps & react.RefAttributes<HTMLSpanElement>>;
declare const tagVariants: (props?: ({
    variant?: "outline" | "info" | "success" | "warning" | "danger" | "default" | "primary" | "secondary" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;

export { Badge, type BadgeProps, type BadgeSize, type BadgeVariant, Tag, type TagProps, type TagSize, type TagVariant, badgeVariants, tagVariants };
