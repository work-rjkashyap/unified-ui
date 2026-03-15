import * as react from 'react';
import { ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';

declare const avatarVariants: (props?: ({
    size?: "sm" | "md" | "xs" | "lg" | "xl" | null | undefined;
    shape?: "circle" | "square" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type AvatarStatus = "online" | "offline" | "busy" | "away";
type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
type AvatarShape = "circle" | "square";
interface AvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">, VariantProps<typeof avatarVariants> {
    /**
     * Image source URL for the avatar.
     * When provided, the component renders an `<img>` element.
     * If the image fails to load, it falls back to initials or icon.
     */
    src?: string | null;
    /**
     * Alt text for the avatar image.
     * Required for accessibility when `src` is provided.
     * Also used as tooltip/title text.
     */
    alt?: string;
    /**
     * Full name of the user. Used to:
     * 1. Generate initials for the fallback display
     * 2. Provide alt text if `alt` is not explicitly set
     *
     * Initials are derived from the first letter of the first and last
     * name segments (e.g. "Jane Doe" → "JD", "Alice" → "A").
     */
    name?: string;
    /**
     * Size of the avatar.
     * @default "md"
     */
    size?: AvatarSize;
    /**
     * Shape of the avatar.
     * @default "circle"
     */
    shape?: AvatarShape;
    /**
     * Status indicator displayed as a colored dot on the avatar.
     * Position is automatically adjusted based on the avatar size.
     */
    status?: AvatarStatus;
    /**
     * Custom accessible label for the status indicator.
     * Overrides the default label derived from the status value.
     */
    statusLabel?: string;
    /**
     * Custom fallback icon to display when no `src` or `name` is provided.
     * Defaults to a generic user silhouette SVG.
     */
    fallbackIcon?: ReactNode;
    /**
     * Custom background color class for the fallback state.
     * Useful for generating unique colors per user.
     *
     * @example "bg-indigo-100 text-indigo-700"
     */
    fallbackClassName?: string;
    /** Additional CSS classes to merge on the root element. */
    className?: string;
    /** Content to render inside the avatar (overrides all fallback logic). */
    children?: ReactNode;
}
/**
 * Avatar — displays a user's profile image, initials, or a fallback icon.
 *
 * Built on the design system's token layer with CVA for variant composition.
 * All colors, radii, spacing, and transitions come from CSS custom properties
 * defined in design-system.css.
 *
 * The component automatically handles image loading and gracefully falls
 * back to initials (derived from `name`) or a default user icon.
 *
 * Accessibility:
 *   - Images include `alt` text (falls back to `name` if not provided)
 *   - Fallback initials container has `role="img"` and `aria-label`
 *   - Status dot has `role="status"` and descriptive `aria-label`
 *
 * @example
 * ```tsx
 * // With image
 * <Avatar src="/photo.jpg" alt="Jane Doe" />
 *
 * // Initials fallback
 * <Avatar name="Jane Doe" />
 * <Avatar name="Jane Doe" size="lg" />
 *
 * // With status indicator
 * <Avatar src="/photo.jpg" alt="Jane" status="online" />
 * <Avatar name="Bob" status="busy" />
 * <Avatar name="Charlie" status="away" size="sm" />
 *
 * // Square shape (for orgs/apps)
 * <Avatar src="/logo.png" alt="Acme Inc" shape="square" />
 *
 * // All sizes
 * <Avatar name="A" size="xs" />
 * <Avatar name="A" size="sm" />
 * <Avatar name="A" size="md" />
 * <Avatar name="A" size="lg" />
 * <Avatar name="A" size="xl" />
 *
 * // Custom fallback styling
 * <Avatar name="Jane" fallbackClassName="bg-indigo-100 text-indigo-700" />
 *
 * // Custom fallback icon
 * <Avatar fallbackIcon={<BotIcon className="size-[60%]" />} />
 *
 * // Custom children (overrides all fallback logic)
 * <Avatar>
 *   <span>🎉</span>
 * </Avatar>
 * ```
 */
declare const Avatar: react.ForwardRefExoticComponent<AvatarProps & react.RefAttributes<HTMLSpanElement>>;
interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Maximum number of avatars to display before showing the "+N" overflow.
     * Set to `0` or `Infinity` to disable truncation.
     * @default 5
     */
    max?: number;
    /**
     * Size applied to all child avatars and the overflow indicator.
     * Overrides the `size` prop on individual Avatar children.
     * @default "md"
     */
    size?: AvatarSize;
    /**
     * Shape applied to all child avatars and the overflow indicator.
     * Overrides the `shape` prop on individual Avatar children.
     * @default "circle"
     */
    shape?: AvatarShape;
    /**
     * Spacing between overlapping avatars (as a negative margin).
     * @default "default" — uses size-appropriate overlap
     */
    spacing?: "tight" | "default" | "loose";
    /** Content — should be Avatar components. */
    children?: ReactNode;
    /** Additional CSS classes to merge on the wrapper. */
    className?: string;
}
/**
 * AvatarGroup — stacks multiple avatars with overlap and "+N" overflow.
 *
 * Renders child Avatar components in a horizontal stack with negative
 * margins for overlap. When the number of children exceeds `max`, the
 * excess avatars are hidden and a "+N" overflow indicator is shown.
 *
 * The group enforces consistent `size` and `shape` across all children
 * by cloning them with the group's props.
 *
 * @example
 * ```tsx
 * // Basic group
 * <AvatarGroup>
 *   <Avatar src="/a.jpg" alt="Alice" />
 *   <Avatar src="/b.jpg" alt="Bob" />
 *   <Avatar name="Charlie" />
 * </AvatarGroup>
 *
 * // With max and overflow
 * <AvatarGroup max={3}>
 *   <Avatar name="Alice" />
 *   <Avatar name="Bob" />
 *   <Avatar name="Charlie" />
 *   <Avatar name="Diana" />
 *   <Avatar name="Eve" />
 * </AvatarGroup>
 * // Renders: [Alice] [Bob] [Charlie] [+2]
 *
 * // Custom size and spacing
 * <AvatarGroup size="lg" spacing="tight">
 *   <Avatar name="A" />
 *   <Avatar name="B" />
 *   <Avatar name="C" />
 * </AvatarGroup>
 *
 * // Square group (for org logos)
 * <AvatarGroup shape="square" size="sm">
 *   <Avatar src="/logo1.png" alt="Org 1" />
 *   <Avatar src="/logo2.png" alt="Org 2" />
 * </AvatarGroup>
 * ```
 */
declare const AvatarGroup: react.ForwardRefExoticComponent<AvatarGroupProps & react.RefAttributes<HTMLDivElement>>;

export { Avatar, AvatarGroup, type AvatarGroupProps, type AvatarProps, type AvatarShape, type AvatarSize, type AvatarStatus, avatarVariants };
