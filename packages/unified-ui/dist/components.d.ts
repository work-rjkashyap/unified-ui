import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode, ElementType, HTMLAttributes, InputHTMLAttributes } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { Accordion as Accordion$1, AlertDialog as AlertDialog$1, AspectRatio as AspectRatio$1, Checkbox as Checkbox$1, Collapsible as Collapsible$1, ContextMenu as ContextMenu$1, Dialog as Dialog$1, DropdownMenu as DropdownMenu$1, HoverCard as HoverCard$1, Label as Label$1, Menubar as Menubar$1, NavigationMenu as NavigationMenu$1, Popover as Popover$1, RadioGroup as RadioGroup$1, ScrollArea as ScrollArea$1, Select as Select$1, Slider as Slider$1, Switch as Switch$1, Tabs as Tabs$1, Toggle as Toggle$1, ToggleGroup as ToggleGroup$1, Tooltip as Tooltip$1, VisuallyHidden as VisuallyHidden$1 } from 'radix-ui';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import { ColumnDef, SortingState, OnChangeFn, ColumnFiltersState, PaginationState, RowSelectionState, Row, VisibilityState, ColumnPinningState, Table as Table$1 } from '@tanstack/react-table';
export { ColumnDef, ColumnFiltersState, PaginationState, Row, RowSelectionState, SortingState, VisibilityState, createColumnHelper } from '@tanstack/react-table';

declare const accordionRootVariants: (props?: ({
    variant?: "bordered" | "borderless" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const accordionTriggerVariants: (props?: ({
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type AccordionVariant = "bordered" | "borderless";
type AccordionSize = "sm" | "md";
/**
 * Props for a single-mode accordion (only one item open at a time).
 */
interface AccordionSingleProps extends Omit<ComponentPropsWithoutRef<typeof Accordion$1.Root>, "type" | "asChild">, VariantProps<typeof accordionRootVariants> {
    type: "single";
    /** Visual variant of the accordion. @default "bordered" */
    variant?: AccordionVariant;
    /** Size of the accordion items. @default "md" */
    size?: AccordionSize;
    /** Additional CSS classes. */
    className?: string;
    children: ReactNode;
}
/**
 * Props for a multiple-mode accordion (multiple items can be open).
 */
interface AccordionMultipleProps extends Omit<ComponentPropsWithoutRef<typeof Accordion$1.Root>, "type" | "asChild">, VariantProps<typeof accordionRootVariants> {
    type: "multiple";
    /** Visual variant of the accordion. @default "bordered" */
    variant?: AccordionVariant;
    /** Size of the accordion items. @default "md" */
    size?: AccordionSize;
    /** Additional CSS classes. */
    className?: string;
    children: ReactNode;
}
type AccordionProps = AccordionSingleProps | AccordionMultipleProps;
interface AccordionItemProps extends ComponentPropsWithoutRef<typeof Accordion$1.Item> {
    /** Additional CSS classes. */
    className?: string;
    children: ReactNode;
}
interface AccordionTriggerProps extends ComponentPropsWithoutRef<typeof Accordion$1.Trigger> {
    /** Additional CSS classes. */
    className?: string;
    /** Whether to hide the chevron icon. @default false */
    hideChevron?: boolean;
    children: ReactNode;
}
interface AccordionContentProps extends ComponentPropsWithoutRef<typeof Accordion$1.Content> {
    /** Additional CSS classes. */
    className?: string;
    children: ReactNode;
}
/**
 * Accordion — a vertically stacked set of interactive headings that each
 * reveal a section of content.
 *
 * Built on Radix UI's Accordion primitive for full keyboard navigation
 * and ARIA compliance. All colors, radii, and transitions come from CSS
 * custom properties defined in design-system.css.
 *
 * Accessibility:
 *   - Radix handles `aria-expanded`, `aria-controls`, arrow key navigation
 *   - Focus ring visible on keyboard navigation (focus-visible)
 *   - Disabled items are skipped in keyboard navigation
 *   - Supports both single and multiple expand modes
 *
 * @example
 * ```tsx
 * // Single mode (only one open at a time)
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="faq-1">
 *     <AccordionTrigger>What is Unified UI?</AccordionTrigger>
 *     <AccordionContent>
 *       A token-driven design system for React applications.
 *     </AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 *
 * // Multiple mode
 * <Accordion type="multiple" variant="borderless" size="sm">
 *   <AccordionItem value="a">
 *     <AccordionTrigger>Section A</AccordionTrigger>
 *     <AccordionContent>Content A</AccordionContent>
 *   </AccordionItem>
 *   <AccordionItem value="b">
 *     <AccordionTrigger>Section B</AccordionTrigger>
 *     <AccordionContent>Content B</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
declare const Accordion: react.ForwardRefExoticComponent<AccordionProps & react.RefAttributes<HTMLDivElement>>;
/**
 * AccordionItem — a single collapsible section within the Accordion.
 *
 * Must be used as a direct child of `Accordion`.
 *
 * @example
 * ```tsx
 * <AccordionItem value="unique-value">
 *   <AccordionTrigger>Click to expand</AccordionTrigger>
 *   <AccordionContent>Expanded content here</AccordionContent>
 * </AccordionItem>
 * ```
 */
declare const AccordionItem: react.ForwardRefExoticComponent<AccordionItemProps & react.RefAttributes<HTMLDivElement>>;
/**
 * AccordionTrigger — the clickable heading that toggles an AccordionItem.
 *
 * Must be used inside an `AccordionItem`. Renders as a button within a
 * heading element for proper accessibility semantics.
 *
 * @example
 * ```tsx
 * <AccordionTrigger>Frequently asked question?</AccordionTrigger>
 * <AccordionTrigger hideChevron>No arrow here</AccordionTrigger>
 * ```
 */
declare const AccordionTrigger: react.ForwardRefExoticComponent<AccordionTriggerProps & react.RefAttributes<HTMLButtonElement>>;
/**
 * AccordionContent — the collapsible content area of an AccordionItem.
 *
 * Uses CSS `animate-accordion-down` / `animate-accordion-up` keyframes
 * for smooth expand/collapse animation. This relies on the Radix
 * `--radix-accordion-content-height` CSS variable.
 *
 * Note: You must define the following keyframes and animation utilities
 * in your Tailwind / CSS configuration for the animations to work:
 *
 *   @keyframes accordion-down {
 *     from { height: 0; }
 *     to { height: var(--radix-accordion-content-height); }
 *   }
 *   @keyframes accordion-up {
 *     from { height: var(--radix-accordion-content-height); }
 *     to { height: 0; }
 *   }
 *
 * @example
 * ```tsx
 * <AccordionContent>
 *   <p>This content expands and collapses smoothly.</p>
 * </AccordionContent>
 * ```
 */
declare const AccordionContent: react.ForwardRefExoticComponent<AccordionContentProps & react.RefAttributes<HTMLDivElement>>;

declare const alertVariants: (props?: ({
    variant?: "info" | "success" | "warning" | "danger" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type AlertVariant = "info" | "success" | "warning" | "danger";
interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">, VariantProps<typeof alertVariants> {
    /**
     * Semantic variant of the alert.
     * Determines background color, text color, border, and default icon.
     * @default "info"
     */
    variant?: AlertVariant;
    /**
     * Title text displayed prominently at the top of the alert.
     * When provided, the alert renders a two-line layout (title + description).
     * When omitted, the alert renders a single-line layout (description only).
     */
    title?: ReactNode;
    /**
     * Custom icon to display instead of the default variant icon.
     * Pass `null` to hide the icon entirely.
     * The icon is sized to match the alert's text and colored to match the variant.
     */
    icon?: ReactNode | null;
    /**
     * Whether the alert can be dismissed/closed.
     * When true, a close button (×) is rendered in the top-right corner.
     * @default false
     */
    dismissible?: boolean;
    /**
     * Callback fired when the dismiss (close) button is clicked.
     * Only relevant when `dismissible` is true.
     * If not provided when `dismissible` is true, the alert manages its
     * own visibility internally.
     */
    onDismiss?: () => void;
    /**
     * Accessible label for the dismiss button.
     * @default "Dismiss alert"
     */
    dismissLabel?: string;
    /**
     * The ARIA role for the alert element.
     * - `"alert"` — for important messages that require immediate attention
     *   (assertive live region). Use for errors and critical warnings.
     * - `"status"` — for informational messages that don't require immediate
     *   attention (polite live region). Use for success/info messages.
     *
     * @default "alert" for danger/warning, "status" for info/success
     */
    role?: "alert" | "status";
    /** Description content. Rendered as the alert body text. */
    children?: ReactNode;
    /** Additional CSS classes to merge on the root element. */
    className?: string;
}
/**
 * Alert — a static notification component for contextual feedback.
 *
 * Built on the design system's token layer with CVA for variant composition.
 * All colors, radii, spacing, and transitions come from CSS custom properties
 * defined in design-system.css.
 *
 * Alerts are non-interactive by default. They communicate important
 * information to the user within the normal page flow (unlike Toast, which
 * appears as an overlay). Use alerts for inline validation feedback, system
 * status messages, and contextual tips.
 *
 * Accessibility:
 *   - Danger/warning alerts use `role="alert"` (assertive live region)
 *   - Info/success alerts use `role="status"` (polite live region)
 *   - Icon is decorative (`aria-hidden`) — variant meaning conveyed by text
 *   - Dismiss button has configurable `aria-label`
 *   - Color is never the sole indicator of meaning — icons + text provide
 *     redundant signaling
 *
 * @example
 * ```tsx
 * // Info alert (default)
 * <Alert title="Tip">
 *   You can press Ctrl+S to save your work at any time.
 * </Alert>
 *
 * // Success alert
 * <Alert variant="success" title="Payment received">
 *   Your order #12345 has been confirmed and is being processed.
 * </Alert>
 *
 * // Warning alert
 * <Alert variant="warning">
 *   Your session will expire in 5 minutes. Save your work.
 * </Alert>
 *
 * // Danger alert (dismissible)
 * <Alert
 *   variant="danger"
 *   title="Connection failed"
 *   dismissible
 *   onDismiss={() => setShowError(false)}
 * >
 *   Unable to reach the server. Check your network connection and try again.
 * </Alert>
 *
 * // Without title (single-line)
 * <Alert variant="info">
 *   This feature is currently in beta.
 * </Alert>
 *
 * // Custom icon
 * <Alert variant="success" icon={<RocketIcon className="size-4" />}>
 *   Your app has been deployed successfully!
 * </Alert>
 *
 * // No icon
 * <Alert variant="warning" icon={null}>
 *   Maintenance scheduled for tomorrow at 3:00 AM UTC.
 * </Alert>
 *
 * // Self-managed dismissible (no onDismiss callback)
 * <Alert variant="info" dismissible>
 *   This alert will hide itself when dismissed.
 * </Alert>
 * ```
 */
declare const Alert: react.ForwardRefExoticComponent<AlertProps & react.RefAttributes<HTMLDivElement>>;

declare const AlertDialog: react.FC<AlertDialog$1.AlertDialogProps>;
declare const AlertDialogTrigger: react.ForwardRefExoticComponent<AlertDialog$1.AlertDialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const AlertDialogPortal: react.FC<AlertDialog$1.AlertDialogPortalProps>;
interface AlertDialogOverlayProps extends ComponentPropsWithoutRef<typeof AlertDialog$1.Overlay> {
    className?: string;
}
declare const AlertDialogOverlay: react.ForwardRefExoticComponent<AlertDialogOverlayProps & react.RefAttributes<HTMLDivElement>>;
interface AlertDialogContentProps extends ComponentPropsWithoutRef<typeof AlertDialog$1.Content> {
    className?: string;
    children?: ReactNode;
}
declare const AlertDialogContent: react.ForwardRefExoticComponent<AlertDialogContentProps & react.RefAttributes<HTMLDivElement>>;
interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: ReactNode;
}
declare function AlertDialogHeader({ className, children, ...rest }: AlertDialogHeaderProps): react_jsx_runtime.JSX.Element;
declare namespace AlertDialogHeader {
    var displayName: string;
}
interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: ReactNode;
}
declare function AlertDialogFooter({ className, children, ...rest }: AlertDialogFooterProps): react_jsx_runtime.JSX.Element;
declare namespace AlertDialogFooter {
    var displayName: string;
}
interface AlertDialogTitleProps extends ComponentPropsWithoutRef<typeof AlertDialog$1.Title> {
    className?: string;
    children?: ReactNode;
}
declare const AlertDialogTitle: react.ForwardRefExoticComponent<AlertDialogTitleProps & react.RefAttributes<HTMLHeadingElement>>;
interface AlertDialogDescriptionProps extends ComponentPropsWithoutRef<typeof AlertDialog$1.Description> {
    className?: string;
    children?: ReactNode;
}
declare const AlertDialogDescription: react.ForwardRefExoticComponent<AlertDialogDescriptionProps & react.RefAttributes<HTMLParagraphElement>>;
interface AlertDialogActionProps extends ComponentPropsWithoutRef<typeof AlertDialog$1.Action> {
    className?: string;
    children?: ReactNode;
}
declare const AlertDialogAction: react.ForwardRefExoticComponent<AlertDialogActionProps & react.RefAttributes<HTMLButtonElement>>;
interface AlertDialogCancelProps extends ComponentPropsWithoutRef<typeof AlertDialog$1.Cancel> {
    className?: string;
    children?: ReactNode;
}
declare const AlertDialogCancel: react.ForwardRefExoticComponent<AlertDialogCancelProps & react.RefAttributes<HTMLButtonElement>>;

interface AspectRatioProps extends ComponentPropsWithoutRef<typeof AspectRatio$1.Root> {
    className?: string;
}
declare const AspectRatio: react.ForwardRefExoticComponent<AspectRatioProps & react.RefAttributes<HTMLDivElement>>;

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

declare const badgeVariants: (props?: ({
    variant?: "info" | "success" | "warning" | "danger" | "outline" | "default" | "primary" | null | undefined;
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger" | "info" | "outline";
type BadgeSize = "sm" | "md";
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
     * @default false
     */
    removable?: boolean;
    /**
     * Callback fired when the remove (×) button is clicked.
     * Only relevant when `removable` is true.
     */
    onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * Accessible label for the remove button.
     * Screen readers will announce this when the remove button is focused.
     * @default "Remove"
     */
    removeLabel?: string;
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
    /** Content to render inside the badge. */
    children?: ReactNode;
    /** Additional CSS classes to merge. */
    className?: string;
}
/**
 * Badge — a compact inline label for categorization, status, and metadata.
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
 *   - Remove button has a configurable `aria-label` (defaults to "Remove")
 *   - Semantic colors meet WCAG AA contrast on their muted backgrounds
 *
 * @example
 * ```tsx
 * // Basic variants
 * <Badge>Default</Badge>
 * <Badge variant="primary">Primary</Badge>
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning">Pending</Badge>
 * <Badge variant="danger">Critical</Badge>
 * <Badge variant="info">New</Badge>
 * <Badge variant="outline">Draft</Badge>
 *
 * // Sizes
 * <Badge size="sm">Small</Badge>
 * <Badge size="md">Medium</Badge>
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
 * // Removable
 * <Badge variant="primary" removable onRemove={handleRemove}>
 *   Tag Name
 * </Badge>
 *
 * // Custom remove label for accessibility
 * <Badge
 *   variant="danger"
 *   removable
 *   onRemove={handleRemove}
 *   removeLabel="Remove critical alert"
 * >
 *   Alert
 * </Badge>
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

declare const bannerVariants: (props?: ({
    variant?: "info" | "success" | "warning" | "danger" | "default" | "primary" | null | undefined;
    position?: "inline" | "bottom" | "top" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type BannerVariant = "default" | "info" | "success" | "warning" | "danger" | "primary";
type BannerPosition = "top" | "bottom" | "inline";
interface BannerProps {
    variant?: BannerVariant;
    position?: BannerPosition;
    dismissible?: boolean;
    onDismiss?: () => void;
    dismissLabel?: string;
    icon?: ReactNode;
    action?: ReactNode;
    visible?: boolean;
    defaultVisible?: boolean;
    className?: string;
    children?: ReactNode;
    id?: string;
    style?: React.CSSProperties;
    role?: string;
    "aria-label"?: string;
    "aria-live"?: "off" | "assertive" | "polite";
}
declare const Banner: react.ForwardRefExoticComponent<BannerProps & react.RefAttributes<HTMLDivElement>>;

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Custom separator to render between items.
     * Defaults to a chevron-right icon.
     */
    separator?: ReactNode;
    /**
     * Accessible label for the breadcrumb navigation landmark.
     * @default "Breadcrumb"
     */
    "aria-label"?: string;
    /** Additional CSS classes. */
    className?: string;
}
/**
 * Breadcrumb — the root `<nav>` container for breadcrumb navigation.
 *
 * Wraps children in a semantic navigation landmark. Use with
 * `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, etc.
 */
declare const Breadcrumb: react.ForwardRefExoticComponent<BreadcrumbProps & react.RefAttributes<HTMLElement>>;
interface BreadcrumbListProps extends React.HTMLAttributes<HTMLOListElement> {
    /** Additional CSS classes. */
    className?: string;
    /** List children. */
    children?: ReactNode;
}
/**
 * BreadcrumbList — an ordered list containing breadcrumb items.
 */
declare const BreadcrumbList: react.ForwardRefExoticComponent<BreadcrumbListProps & react.RefAttributes<HTMLOListElement>>;
interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    /** Additional CSS classes. */
    className?: string;
}
/**
 * BreadcrumbItem — a single item in the breadcrumb trail.
 */
declare const BreadcrumbItem: react.ForwardRefExoticComponent<BreadcrumbItemProps & react.RefAttributes<HTMLLIElement>>;
interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Additional CSS classes. */
    className?: string;
}
/**
 * BreadcrumbLink — a navigable link within a breadcrumb item.
 *
 * Renders as an `<a>` element. For framework-specific link components
 * (e.g. Next.js `Link`), wrap the framework component or pass it via
 * composition:
 *
 * ```tsx
 * <BreadcrumbItem>
 *   <Link href="/docs" className="...breadcrumb link styles...">Docs</Link>
 * </BreadcrumbItem>
 * ```
 */
declare const BreadcrumbLink: react.ForwardRefExoticComponent<BreadcrumbLinkProps & react.RefAttributes<HTMLAnchorElement>>;
interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Additional CSS classes. */
    className?: string;
}
/**
 * BreadcrumbPage — the current (non-linked) page in the breadcrumb trail.
 *
 * Rendered with `aria-current="page"` and a distinct foreground color
 * to indicate the user's current location.
 */
declare const BreadcrumbPage: react.ForwardRefExoticComponent<BreadcrumbPageProps & react.RefAttributes<HTMLSpanElement>>;
interface BreadcrumbSeparatorProps extends React.LiHTMLAttributes<HTMLLIElement> {
    /** Custom separator content. Defaults to a chevron-right icon. */
    children?: ReactNode;
    /** Additional CSS classes. */
    className?: string;
}
/**
 * BreadcrumbSeparator — visual divider between breadcrumb items.
 *
 * Defaults to a chevron-right icon. Pass custom children (string or
 * ReactNode) to use a different separator.
 */
declare const BreadcrumbSeparator: react.ForwardRefExoticComponent<BreadcrumbSeparatorProps & react.RefAttributes<HTMLLIElement>>;
interface BreadcrumbEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Additional CSS classes. */
    className?: string;
}
/**
 * BreadcrumbEllipsis — a "…" placeholder indicating truncated items.
 *
 * Used by `BreadcrumbNav` when items exceed `maxItems`. Can also be
 * used manually in the composable API.
 */
declare const BreadcrumbEllipsis: react.ForwardRefExoticComponent<BreadcrumbEllipsisProps & react.RefAttributes<HTMLSpanElement>>;
interface BreadcrumbNavItem {
    /** Display label for the breadcrumb segment. */
    label: ReactNode;
    /**
     * URL to navigate to. When omitted, the item is rendered as the
     * current page (non-linked, last item).
     */
    href?: string;
}
interface BreadcrumbNavProps extends Omit<BreadcrumbProps, "children"> {
    /** Breadcrumb items in order from root to current page. */
    items: BreadcrumbNavItem[];
    /**
     * Maximum number of items to show before collapsing middle items
     * into an ellipsis. Set to 0 or Infinity to disable truncation.
     *
     * When truncating, the first item and the last `maxItems - 2` items
     * are always visible, with an ellipsis in between.
     *
     * @default Infinity (no truncation)
     */
    maxItems?: number;
    /**
     * Custom separator to use between items.
     * @default <ChevronRightIcon /> (via BreadcrumbSeparator)
     */
    separator?: ReactNode;
    /** Additional CSS classes on the root nav. */
    className?: string;
}
/**
 * BreadcrumbNav — a composed breadcrumb component that renders a full
 * breadcrumb trail from an array of items.
 *
 * Handles separator insertion, truncation with ellipsis, and
 * current-page detection automatically.
 *
 * @example
 * ```tsx
 * <BreadcrumbNav
 *   items={[
 *     { label: "Home", href: "/" },
 *     { label: "Products", href: "/products" },
 *     { label: "Electronics", href: "/products/electronics" },
 *     { label: "Laptops", href: "/products/electronics/laptops" },
 *     { label: "MacBook Pro" },
 *   ]}
 *   maxItems={4}
 * />
 * // Renders: Home > … > Laptops > MacBook Pro
 *
 * <BreadcrumbNav
 *   items={[
 *     { label: "Home", href: "/" },
 *     { label: "Docs", href: "/docs" },
 *     { label: "Getting Started" },
 *   ]}
 * />
 * // Renders: Home > Docs > Getting Started
 * ```
 */
declare const BreadcrumbNav: react.ForwardRefExoticComponent<BreadcrumbNavProps & react.RefAttributes<HTMLElement>>;

declare const buttonVariants: (props?: ({
    variant?: "danger" | "primary" | "secondary" | "ghost" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    fullWidth?: boolean | null | undefined;
    iconOnly?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";
interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">, VariantProps<typeof buttonVariants> {
    /**
     * Visual variant of the button.
     * @default "primary"
     */
    variant?: ButtonVariant;
    /**
     * Size of the button.
     * @default "md"
     */
    size?: ButtonSize;
    /**
     * Whether the button stretches to fill its container.
     * @default false
     */
    fullWidth?: boolean;
    /**
     * Whether the button is in a loading state.
     * When true, the button is disabled and shows a spinner.
     * @default false
     */
    loading?: boolean;
    /**
     * Text to display alongside the spinner during loading.
     * If not provided, the original children are hidden and only
     * the spinner is shown.
     */
    loadingText?: string;
    /**
     * Icon to display before the button label.
     */
    iconLeft?: ReactNode;
    /**
     * Icon to display after the button label.
     */
    iconRight?: ReactNode;
    /**
     * Whether this is an icon-only button (no text label).
     * Ensures the button is square and properly sized.
     * When true, you MUST provide an `aria-label` for accessibility.
     * @default false
     */
    iconOnly?: boolean;
    /**
     * Whether the button is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * The HTML element or component to render as.
     * Useful for rendering as an anchor (<a>) or Next.js <Link>.
     * @default "button"
     */
    as?: ElementType;
    /** Content to render inside the button. */
    children?: ReactNode;
    /** Additional CSS classes to merge. */
    className?: string;
}
/**
 * Button — the primary interactive element for triggering actions.
 *
 * Built on the design system's token layer with CVA for variant composition.
 * All colors, radii, spacing, and transitions come from CSS custom properties
 * defined in design-system.css.
 *
 * Accessibility:
 *   - Focus ring visible on keyboard navigation (focus-visible)
 *   - Disabled state uses both `disabled` attribute and `aria-disabled`
 *   - Loading state sets `aria-busy="true"` and disables interaction
 *   - Icon-only buttons require `aria-label`
 *
 * @example
 * ```tsx
 * // Primary action
 * <Button variant="primary" onClick={handleSave}>
 *   Save Changes
 * </Button>
 *
 * // Secondary with icon
 * <Button variant="secondary" iconLeft={<PlusIcon className="size-4" />}>
 *   Add Item
 * </Button>
 *
 * // Loading state
 * <Button variant="primary" loading loadingText="Saving...">
 *   Save
 * </Button>
 *
 * // Icon-only
 * <Button variant="ghost" iconOnly aria-label="Close">
 *   <XIcon className="size-4" />
 * </Button>
 *
 * // Danger / destructive
 * <Button variant="danger" onClick={handleDelete}>
 *   Delete Account
 * </Button>
 *
 * // Rendered as anchor
 * <Button as="a" href="/login" variant="secondary">
 *   Log In
 * </Button>
 *
 * // Full-width
 * <Button variant="primary" fullWidth>
 *   Continue
 * </Button>
 * ```
 */
declare const Button: react.ForwardRefExoticComponent<ButtonProps & react.RefAttributes<HTMLButtonElement>>;

declare const calendarDayVariants: (props?: ({
    state?: "disabled" | "default" | "selected" | "today" | "rangeStart" | "rangeEnd" | "rangeMiddle" | "outsideMonth" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type CalendarMode = "single" | "range";
interface DateRange {
    from: Date;
    to?: Date;
}
interface CalendarProps {
    /**
     * Selection mode.
     * @default "single"
     */
    mode?: CalendarMode;
    /**
     * The currently selected date (single mode).
     */
    selected?: Date | null;
    /**
     * The currently selected range (range mode).
     */
    selectedRange?: DateRange | null;
    /**
     * Callback for single-date selection.
     */
    onSelect?: (date: Date) => void;
    /**
     * Callback for range selection.
     */
    onSelectRange?: (range: DateRange) => void;
    /**
     * The month/year to display initially.
     * @default current month
     */
    defaultMonth?: Date;
    /**
     * Controlled displayed month.
     */
    month?: Date;
    /**
     * Called when the displayed month changes.
     */
    onMonthChange?: (month: Date) => void;
    /**
     * A function that returns `true` for dates that should be disabled.
     */
    disabledDate?: (date: Date) => boolean;
    /**
     * Array of individually disabled dates.
     */
    disabledDates?: Date[];
    /**
     * Minimum selectable date.
     */
    minDate?: Date;
    /**
     * Maximum selectable date.
     */
    maxDate?: Date;
    /**
     * Show the week number column.
     * @default false
     */
    showWeekNumbers?: boolean;
    /** Additional CSS classes. */
    className?: string;
}
/**
 * Calendar — a month/year grid with single or range selection.
 *
 * @example
 * // Uncontrolled single selection
 * <Calendar onSelect={(date) => console.log(date)} />
 *
 * // Controlled with disabled dates
 * <Calendar
 *   selected={date}
 *   onSelect={setDate}
 *   disabledDate={(d) => d < new Date()}
 * />
 *
 * // Range mode
 * <Calendar
 *   mode="range"
 *   selectedRange={range}
 *   onSelectRange={setRange}
 * />
 */
declare const Calendar: react.ForwardRefExoticComponent<CalendarProps & react.RefAttributes<HTMLDivElement>>;

declare const calloutVariants: (props?: ({
    variant?: "info" | "success" | "warning" | "danger" | "default" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type CalloutVariant = "info" | "success" | "warning" | "danger" | "default";
interface CalloutProps {
    variant?: CalloutVariant;
    title?: ReactNode;
    icon?: ReactNode | null;
    collapsible?: boolean;
    defaultOpen?: boolean;
    className?: string;
    children?: ReactNode;
}
declare const Callout: react.ForwardRefExoticComponent<CalloutProps & react.RefAttributes<HTMLDivElement>>;

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

interface CarouselContextValue {
    current: number;
    total: number;
    prev: () => void;
    next: () => void;
    goTo: (index: number) => void;
    direction: "left" | "right";
    orientation: "horizontal" | "vertical";
}
declare function useCarouselContext(): CarouselContextValue;
interface CarouselProps {
    items: ReactNode[];
    defaultIndex?: number;
    index?: number;
    onIndexChange?: (i: number) => void;
    orientation?: "horizontal" | "vertical";
    autoplay?: boolean;
    autoplayInterval?: number;
    loop?: boolean;
    showArrows?: boolean;
    showDots?: boolean;
    className?: string;
    itemClassName?: string;
}
declare const Carousel: react.ForwardRefExoticComponent<CarouselProps & react.RefAttributes<HTMLDivElement>>;

declare const checkboxVariants: (props?: ({
    size?: "sm" | "md" | null | undefined;
    error?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type CheckboxSize = "sm" | "md";
interface CheckboxProps extends Omit<Checkbox$1.CheckboxProps, "children" | "asChild" | "defaultChecked">, VariantProps<typeof checkboxVariants> {
    /**
     * Size of the checkbox.
     * @default "md"
     */
    size?: CheckboxSize;
    /**
     * Whether the checkbox is in an error state.
     * @default false
     */
    error?: boolean;
    /**
     * Label text displayed next to the checkbox.
     * Clicking the label toggles the checkbox.
     */
    label?: ReactNode;
    /**
     * Optional description text displayed below the label.
     * Useful for providing additional context about the option.
     */
    description?: ReactNode;
    /**
     * Additional CSS classes for the root wrapper element.
     */
    wrapperClassName?: string;
    /**
     * Additional CSS classes for the label element.
     */
    labelClassName?: string;
    /**
     * Additional CSS classes for the checkbox element.
     */
    className?: string;
    /**
     * The value of the checkbox when used within a CheckboxGroup.
     */
    value?: string;
}
/**
 * Checkbox — a toggle control for binary or indeterminate selections.
 *
 * Built on Radix UI's checkbox primitive for full accessibility support,
 * including keyboard navigation (Space to toggle), focus management,
 * and proper ARIA attributes.
 *
 * Accessibility:
 *   - Focus ring visible on keyboard navigation (focus-visible)
 *   - Disabled state uses both native disabled and visual cues
 *   - Error state applies `aria-invalid="true"`
 *   - Label is properly associated via `htmlFor`/`id`
 *   - Supports indeterminate state with proper ARIA
 *   - Space key toggles the checkbox
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Checkbox label="Accept terms and conditions" />
 *
 * // Controlled
 * <Checkbox
 *   checked={isChecked}
 *   onCheckedChange={setIsChecked}
 *   label="Enable notifications"
 * />
 *
 * // Indeterminate
 * <Checkbox checked="indeterminate" label="Select all" />
 *
 * // With description
 * <Checkbox
 *   label="Marketing emails"
 *   description="Receive emails about new products and features."
 * />
 *
 * // Sizes
 * <Checkbox size="sm" label="Small checkbox" />
 * <Checkbox size="md" label="Medium checkbox" />
 *
 * // Error state
 * <Checkbox error label="You must accept the terms" />
 *
 * // Disabled
 * <Checkbox disabled label="Cannot change this" />
 * <Checkbox disabled checked label="Locked selection" />
 * ```
 */
declare const Checkbox: react.ForwardRefExoticComponent<CheckboxProps & react.RefAttributes<HTMLButtonElement>>;
interface CheckboxGroupContextValue {
    /** Size to apply to all child checkboxes. */
    size?: CheckboxSize;
    /** Whether all children are disabled. */
    disabled?: boolean;
    /** Whether all children are in error state. */
    error?: boolean;
}
/** Hook to access CheckboxGroup context from child Checkbox components. */
declare function useCheckboxGroupContext(): CheckboxGroupContextValue;
type CheckboxGroupOrientation = "horizontal" | "vertical";
interface CheckboxGroupProps {
    /**
     * Group label displayed above the checkboxes.
     * Required for accessibility.
     */
    label?: ReactNode;
    /**
     * Optional description below the group label.
     */
    description?: ReactNode;
    /**
     * Layout orientation of the checkboxes.
     * @default "vertical"
     */
    orientation?: CheckboxGroupOrientation;
    /**
     * Size to apply to all child checkboxes.
     * Individual checkbox size props will override this.
     */
    size?: CheckboxSize;
    /**
     * Whether all checkboxes in the group are disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the group is in an error state.
     * @default false
     */
    error?: boolean;
    /**
     * Error message displayed below the group.
     */
    errorMessage?: ReactNode;
    /** Checkbox children. */
    children: ReactNode;
    /** Additional CSS classes for the group container. */
    className?: string;
}
/**
 * CheckboxGroup — groups related checkboxes with accessible semantics.
 *
 * Uses `role="group"` with `aria-labelledby` for proper screen reader
 * announcement. Provides consistent spacing and optional orientation.
 *
 * @example
 * ```tsx
 * <CheckboxGroup label="Notification preferences" orientation="vertical">
 *   <Checkbox value="email" label="Email notifications" />
 *   <Checkbox value="sms" label="SMS notifications" />
 *   <Checkbox value="push" label="Push notifications" />
 * </CheckboxGroup>
 *
 * // Horizontal layout
 * <CheckboxGroup label="Options" orientation="horizontal">
 *   <Checkbox value="a" label="Option A" />
 *   <Checkbox value="b" label="Option B" />
 * </CheckboxGroup>
 *
 * // With error
 * <CheckboxGroup label="Required" error errorMessage="Please select at least one.">
 *   <Checkbox value="a" label="Option A" />
 *   <Checkbox value="b" label="Option B" />
 * </CheckboxGroup>
 * ```
 */
declare function CheckboxGroup({ label, description, orientation, size, disabled, error, errorMessage, children, className, }: CheckboxGroupProps): react_jsx_runtime.JSX.Element;
declare namespace CheckboxGroup {
    var displayName: string;
}

declare const inlineCodeVariants: (props?: class_variance_authority_types.ClassProp | undefined) => string;
declare const codeBlockVariants: (props?: ({
    variant?: "default" | "dark" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type CodeVariant = "default" | "dark";
interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    children?: ReactNode;
}
interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
    variant?: CodeVariant;
    language?: string;
    showLineNumbers?: boolean;
    showCopyButton?: boolean;
    filename?: string;
    className?: string;
    children?: ReactNode;
}
/**
 * InlineCode — renders code in a monospaced, styled span.
 * @example <InlineCode>npm install</InlineCode>
 */
declare const InlineCode: react.ForwardRefExoticComponent<InlineCodeProps & react.RefAttributes<HTMLElement>>;
/**
 * CodeBlock — a styled code block with optional copy button, line numbers, and filename.
 *
 * @example
 * <CodeBlock language="tsx" showCopyButton filename="Button.tsx">
 *   {`export function Button() { ... }`}
 * </CodeBlock>
 */
declare const CodeBlock: react.ForwardRefExoticComponent<CodeBlockProps & react.RefAttributes<HTMLPreElement>>;

interface CollapsibleContextValue {
    open: boolean;
    contentId: string;
}
declare function useCollapsibleContext(): CollapsibleContextValue;
interface CollapsibleProps extends Omit<ComponentPropsWithoutRef<typeof Collapsible$1.Root>, "asChild"> {
    /**
     * Whether the collapsible is expanded.
     * When provided, the component is controlled.
     */
    open?: boolean;
    /**
     * Default open state for uncontrolled mode.
     * @default false
     */
    defaultOpen?: boolean;
    /**
     * Callback fired when the open state changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * Whether the collapsible is disabled.
     * When disabled, the trigger cannot be interacted with.
     * @default false
     */
    disabled?: boolean;
    /** Content to render inside the collapsible root. */
    children: ReactNode;
    /** Additional CSS classes to merge on the root element. */
    className?: string;
}
interface CollapsibleTriggerProps extends ComponentPropsWithoutRef<typeof Collapsible$1.Trigger> {
    /** Additional CSS classes to merge. */
    className?: string;
}
interface CollapsibleContentProps extends Omit<ComponentPropsWithoutRef<typeof Collapsible$1.Content>, "asChild" | "forceMount"> {
    /**
     * Duration of the expand/collapse animation in seconds.
     * @default 0.2
     */
    duration?: number;
    /**
     * Whether to force-mount the content in the DOM even when collapsed.
     * Useful for SEO or when you need to measure the content.
     * @default false
     */
    forceMount?: boolean;
    /** Additional CSS classes to merge on the content wrapper. */
    className?: string;
    /** Content to render inside the collapsible section. */
    children: ReactNode;
}
/**
 * Collapsible — an animated show/hide section.
 *
 * Built on Radix UI's Collapsible primitive for accessibility and Framer
 * Motion for smooth height animations. The root component manages the
 * open/closed state and provides context to child components.
 *
 * Accessibility:
 *   - Radix handles `aria-expanded` on the trigger
 *   - Radix handles `aria-controls` linking trigger → content
 *   - Keyboard: Space/Enter toggles the collapsible
 *   - Disabled state prevents interaction
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Collapsible>
 *   <CollapsibleTrigger asChild>
 *     <Button variant="ghost">Show more</Button>
 *   </CollapsibleTrigger>
 *   <CollapsibleContent>
 *     <p>Hidden content revealed on toggle.</p>
 *   </CollapsibleContent>
 * </Collapsible>
 *
 * // Controlled
 * <Collapsible open={isOpen} onOpenChange={setIsOpen}>
 *   <CollapsibleTrigger asChild>
 *     <Button variant="ghost">
 *       {isOpen ? "Hide" : "Show"} details
 *     </Button>
 *   </CollapsibleTrigger>
 *   <CollapsibleContent>
 *     <p>Controlled collapsible content.</p>
 *   </CollapsibleContent>
 * </Collapsible>
 *
 * // Default open
 * <Collapsible defaultOpen>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>
 *     <p>This content is visible by default.</p>
 *   </CollapsibleContent>
 * </Collapsible>
 * ```
 */
declare function Collapsible({ open: openProp, defaultOpen, onOpenChange, disabled, className, children, ...rest }: CollapsibleProps): react_jsx_runtime.JSX.Element;
declare namespace Collapsible {
    var displayName: string;
}
/**
 * CollapsibleTrigger — the button that toggles the collapsible open/closed.
 *
 * Use `asChild` to render your own trigger element (e.g., a Button)
 * instead of the default `<button>`.
 *
 * @example
 * ```tsx
 * <CollapsibleTrigger asChild>
 *   <Button variant="ghost" size="sm">
 *     <ChevronDown className="size-4" />
 *     Toggle section
 *   </Button>
 * </CollapsibleTrigger>
 * ```
 */
declare const CollapsibleTrigger: react.ForwardRefExoticComponent<CollapsibleTriggerProps & react.RefAttributes<HTMLButtonElement>>;
/**
 * CollapsibleContent — the content section that expands/collapses.
 *
 * Uses Framer Motion's AnimatePresence for enter/exit animations.
 * The content smoothly animates its height from 0 to auto when opening,
 * and from auto to 0 when closing. Overflow is hidden during the
 * animation to prevent content from being visible outside the bounds.
 *
 * The `forceMount` prop can be used to keep the content in the DOM
 * even when collapsed (useful for SEO or measurement purposes). When
 * force-mounted and collapsed, the content is visually hidden with
 * `height: 0` and `overflow: hidden`.
 *
 * @example
 * ```tsx
 * <CollapsibleContent>
 *   <div className="p-4">
 *     <p>This content animates in and out.</p>
 *   </div>
 * </CollapsibleContent>
 *
 * // Custom animation duration
 * <CollapsibleContent duration={0.3}>
 *   <p>Slower animation.</p>
 * </CollapsibleContent>
 *
 * // Force mounted (always in DOM)
 * <CollapsibleContent forceMount>
 *   <p>Always in the DOM, visually hidden when collapsed.</p>
 * </CollapsibleContent>
 * ```
 */
declare const CollapsibleContent: react.ForwardRefExoticComponent<CollapsibleContentProps & react.RefAttributes<HTMLDivElement>>;

declare const comboboxTriggerVariants: (props?: ({
    variant?: "default" | "primary" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    open?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ComboboxVariant = "default" | "primary";
type ComboboxSize = "sm" | "md" | "lg";
interface ComboboxOption {
    /**
     * The unique key for this option.
     */
    value: string;
    /**
     * The display label for this option.
     */
    label: string;
    /**
     * Optional description shown below the label.
     */
    description?: string;
    /**
     * Optional leading icon/element for the option.
     */
    icon?: ReactNode;
    /**
     * Whether this option is disabled.
     */
    disabled?: boolean;
    /**
     * Group key — options with the same group are rendered together.
     */
    group?: string;
}
interface ComboboxGroup {
    /** Group label */
    label: string;
    /** Group key — matches option.group */
    value: string;
}
interface ComboboxProps {
    /**
     * The list of options to display.
     */
    options: ComboboxOption[];
    /**
     * Grouped section definitions (optional).
     */
    groups?: ComboboxGroup[];
    /**
     * The currently selected value (single mode, controlled).
     */
    value?: string;
    /**
     * The currently selected values (multi mode, controlled).
     */
    values?: string[];
    /**
     * Default value (single mode, uncontrolled).
     */
    defaultValue?: string;
    /**
     * Default values (multi mode, uncontrolled).
     */
    defaultValues?: string[];
    /**
     * Called when a single value is selected/deselected.
     */
    onSelect?: (value: string | null) => void;
    /**
     * Called when multi-select values change.
     */
    onMultiSelect?: (values: string[]) => void;
    /**
     * Enable multi-select mode.
     * @default false
     */
    multi?: boolean;
    /**
     * Enable search / filter input.
     * @default true
     */
    searchable?: boolean;
    /**
     * Placeholder text on the trigger when nothing is selected.
     * @default "Select..."
     */
    placeholder?: string;
    /**
     * Placeholder text in the search input.
     * @default "Search..."
     */
    searchPlaceholder?: string;
    /**
     * Message shown when no options match the search query.
     * @default "No results found."
     */
    emptyMessage?: string;
    /**
     * Visual variant.
     * @default "default"
     */
    variant?: ComboboxVariant;
    /**
     * Size variant.
     * @default "md"
     */
    size?: ComboboxSize;
    /**
     * Whether the combobox is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether to show a clear button when a value is selected.
     * @default true
     */
    clearable?: boolean;
    /**
     * Max height of the dropdown list (CSS value).
     * @default "240px"
     */
    maxHeight?: string;
    /**
     * Custom filter function. By default does case-insensitive label matching.
     */
    filterOption?: (option: ComboboxOption, query: string) => boolean;
    /**
     * Custom render for option items.
     */
    renderOption?: (option: ComboboxOption, isSelected: boolean) => ReactNode;
    /**
     * Custom render for the trigger value display.
     */
    renderValue?: (selected: ComboboxOption | ComboboxOption[] | null) => ReactNode;
    /**
     * Alignment of the dropdown relative to the trigger.
     * @default "start"
     */
    align?: "start" | "center" | "end";
    /**
     * Whether the dropdown width should match the trigger width.
     * @default true
     */
    matchWidth?: boolean;
    /** Additional CSS classes on the trigger. */
    className?: string;
    /** Additional CSS classes on the dropdown content. */
    contentClassName?: string;
}
/**
 * Combobox — a searchable select with single and multi-select support.
 *
 * @example
 * // Single select
 * <Combobox
 *   options={[
 *     { value: "react", label: "React" },
 *     { value: "vue", label: "Vue" },
 *   ]}
 *   onSelect={(v) => setValue(v)}
 * />
 *
 * // Multi-select
 * <Combobox
 *   multi
 *   options={options}
 *   values={selected}
 *   onMultiSelect={setSelected}
 * />
 *
 * // With groups
 * <Combobox
 *   options={options}
 *   groups={[{ value: "fruits", label: "Fruits" }]}
 * />
 */
declare const Combobox: react.ForwardRefExoticComponent<ComboboxProps & react.RefAttributes<HTMLButtonElement>>;

interface CommandItem {
    /** Unique identifier for the command. */
    id: string;
    /** The display label for the command. */
    label: string;
    /** Optional description shown below the label. */
    description?: string;
    /** Optional icon rendered before the label. */
    icon?: ReactNode;
    /** Optional keyboard shortcut hint. */
    shortcut?: string;
    /** Callback executed when the command is selected. */
    onSelect: () => void;
    /** Whether this command is disabled. */
    disabled?: boolean;
}
interface CommandGroup {
    /** Heading label for this group. */
    heading?: string;
    /** Commands in this group. */
    items: CommandItem[];
}
interface CommandProps {
    /** Whether the command palette is open. */
    open: boolean;
    /** Callback when open state changes. */
    onOpenChange: (open: boolean) => void;
    /** Groups of commands to display. */
    groups: CommandGroup[];
    /** Placeholder text for the search input. @default "Search commands..." */
    placeholder?: string;
    /** Text shown when no commands match. @default "No results found." */
    emptyText?: string;
    /** Custom keyboard shortcut to open (modifier + key). @default "k" */
    shortcutKey?: string;
}
/**
 * Command — a keyboard-navigable command palette modal.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * const groups = [
 *   {
 *     heading: "Navigation",
 *     items: [
 *       { id: "home", label: "Go to Home", icon: <Home />, onSelect: () => router.push("/") },
 *       { id: "docs", label: "Open Docs", icon: <BookOpen />, onSelect: () => router.push("/docs") },
 *     ],
 *   },
 *   {
 *     heading: "Actions",
 *     items: [
 *       { id: "new", label: "New Document", shortcut: "⌘N", onSelect: handleNew },
 *     ],
 *   },
 * ];
 *
 * return (
 *   <>
 *     <Button onClick={() => setOpen(true)}>Open Command Palette</Button>
 *     <Command open={open} onOpenChange={setOpen} groups={groups} />
 *   </>
 * );
 * ```
 */
declare function Command({ open, onOpenChange, groups, placeholder, emptyText, shortcutKey, }: CommandProps): react_jsx_runtime.JSX.Element;
declare namespace Command {
    var displayName: string;
}
interface CommandTriggerProps {
    /** Label for the trigger button. @default "Search commands..." */
    label?: string;
    /** Called when the trigger button is clicked. */
    onClick: () => void;
    /** Additional CSS classes. */
    className?: string;
}
/**
 * CommandTrigger — a search-bar-style button that opens the command palette.
 *
 * @example
 * ```tsx
 * <CommandTrigger onClick={() => setOpen(true)} label="Search..." />
 * ```
 */
declare const CommandTrigger: react.ForwardRefExoticComponent<CommandTriggerProps & react.RefAttributes<HTMLButtonElement>>;

type ConfirmDialogVariant = "default" | "danger";
interface ConfirmDialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: ReactNode;
    title?: ReactNode;
    description?: ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: ConfirmDialogVariant;
    onConfirm?: () => void;
    onCancel?: () => void;
    loading?: boolean;
    className?: string;
    children?: ReactNode;
}
declare function ConfirmDialog({ open, onOpenChange, trigger, title, description, confirmLabel, cancelLabel, variant, onConfirm, onCancel, loading, className, children, }: ConfirmDialogProps): react_jsx_runtime.JSX.Element;
declare namespace ConfirmDialog {
    var displayName: string;
}

interface ContextMenuProps {
    children: ReactNode;
    /** Called when the open state changes. */
    onOpenChange?: (open: boolean) => void;
    /** Controlled open state. */
    open?: boolean;
    /** The reading direction of submenus. */
    dir?: "ltr" | "rtl";
    /** The modality of the context menu. */
    modal?: boolean;
}
interface ContextMenuTriggerProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.Trigger> {
    /** When true, right-click event propagation is disabled. */
    disabled?: boolean;
    className?: string;
}
interface ContextMenuContentProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.Content> {
    className?: string;
}
type ContextMenuItemVariant = "default" | "danger";
interface ContextMenuItemProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.Item> {
    /** Visual variant of the menu item. */
    variant?: ContextMenuItemVariant;
    /** Icon rendered before the label. */
    icon?: ReactNode;
    className?: string;
}
interface ContextMenuCheckboxItemProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.CheckboxItem> {
    /** Whether the checkbox item is checked. */
    checked?: boolean;
    className?: string;
}
interface ContextMenuRadioGroupProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.RadioGroup> {
    className?: string;
}
interface ContextMenuRadioItemProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.RadioItem> {
    className?: string;
}
interface ContextMenuLabelProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.Label> {
    /** Whether the label should be inset (aligned with items that have icons). */
    inset?: boolean;
    className?: string;
}
interface ContextMenuSeparatorProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.Separator> {
    className?: string;
}
interface ContextMenuGroupProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.Group> {
    className?: string;
}
interface ContextMenuSubProps {
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
interface ContextMenuSubTriggerProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.SubTrigger> {
    /** Whether to inset the trigger (aligned with items that have icons). */
    inset?: boolean;
    /** Icon rendered before the label. */
    icon?: ReactNode;
    className?: string;
}
interface ContextMenuSubContentProps extends ComponentPropsWithoutRef<typeof ContextMenu$1.SubContent> {
    className?: string;
}
interface ContextMenuShortcutProps {
    children: ReactNode;
    className?: string;
}
/**
 * ContextMenu — provides right-click context menu functionality.
 *
 * Wrap any element with `ContextMenuTrigger` to make it the trigger target.
 * Right-clicking (or long-pressing on touch) that element opens the menu.
 *
 * @example
 * ```tsx
 * <ContextMenu>
 *   <ContextMenuTrigger>
 *     <div className="border rounded-md p-8">Right-click me</div>
 *   </ContextMenuTrigger>
 *   <ContextMenuContent>
 *     <ContextMenuItem>Open</ContextMenuItem>
 *     <ContextMenuSeparator />
 *     <ContextMenuItem variant="danger">Delete</ContextMenuItem>
 *   </ContextMenuContent>
 * </ContextMenu>
 * ```
 */
declare function ContextMenu({ children, ...rest }: ContextMenuProps): react_jsx_runtime.JSX.Element;
declare namespace ContextMenu {
    var displayName: string;
}
/**
 * ContextMenuTrigger — the area that triggers the context menu on right-click.
 *
 * @example
 * ```tsx
 * <ContextMenuTrigger asChild>
 *   <div className="p-4 border rounded-md">Right-click this area</div>
 * </ContextMenuTrigger>
 * ```
 */
declare const ContextMenuTrigger: react.ForwardRefExoticComponent<ContextMenuTriggerProps & react.RefAttributes<HTMLSpanElement>>;
/**
 * ContextMenuContent — the panel that contains the menu items.
 *
 * Renders inside a Portal automatically so z-index stacking is correct.
 *
 * @example
 * ```tsx
 * <ContextMenuContent>
 *   <ContextMenuItem>Cut</ContextMenuItem>
 *   <ContextMenuItem>Copy</ContextMenuItem>
 *   <ContextMenuItem>Paste</ContextMenuItem>
 * </ContextMenuContent>
 * ```
 */
declare const ContextMenuContent: react.ForwardRefExoticComponent<ContextMenuContentProps & react.RefAttributes<HTMLDivElement>>;
/**
 * ContextMenuItem — a single menu item.
 *
 * Supports a `variant` prop for danger-styled destructive actions,
 * and an optional `icon` slot rendered before the label.
 *
 * @example
 * ```tsx
 * <ContextMenuItem icon={<Copy className="size-4" />}>Copy</ContextMenuItem>
 * <ContextMenuItem variant="danger" icon={<Trash2 className="size-4" />}>
 *   Delete
 * </ContextMenuItem>
 * ```
 */
declare const ContextMenuItem: react.ForwardRefExoticComponent<ContextMenuItemProps & react.RefAttributes<HTMLDivElement>>;
/**
 * ContextMenuCheckboxItem — a menu item with a checkbox indicator.
 *
 * @example
 * ```tsx
 * <ContextMenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
 *   Show Grid
 * </ContextMenuCheckboxItem>
 * ```
 */
declare const ContextMenuCheckboxItem: react.ForwardRefExoticComponent<ContextMenuCheckboxItemProps & react.RefAttributes<HTMLDivElement>>;
/**
 * ContextMenuRadioGroup — groups radio items so only one can be selected.
 *
 * @example
 * ```tsx
 * <ContextMenuRadioGroup value={view} onValueChange={setView}>
 *   <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
 *   <ContextMenuRadioItem value="grid">Grid</ContextMenuRadioItem>
 * </ContextMenuRadioGroup>
 * ```
 */
declare const ContextMenuRadioGroup: react.ForwardRefExoticComponent<ContextMenuRadioGroupProps & react.RefAttributes<HTMLDivElement>>;
/**
 * ContextMenuRadioItem — a selectable radio item inside a radio group.
 *
 * @example
 * ```tsx
 * <ContextMenuRadioItem value="list">List View</ContextMenuRadioItem>
 * ```
 */
declare const ContextMenuRadioItem: react.ForwardRefExoticComponent<ContextMenuRadioItemProps & react.RefAttributes<HTMLDivElement>>;
/**
 * ContextMenuLabel — a non-interactive label for grouping menu items.
 *
 * @example
 * ```tsx
 * <ContextMenuLabel>File Actions</ContextMenuLabel>
 * ```
 */
declare const ContextMenuLabel: react.ForwardRefExoticComponent<ContextMenuLabelProps & react.RefAttributes<HTMLDivElement>>;
/**
 * ContextMenuSeparator — a thin horizontal rule between menu sections.
 *
 * @example
 * ```tsx
 * <ContextMenuSeparator />
 * ```
 */
declare const ContextMenuSeparator: react.ForwardRefExoticComponent<ContextMenuSeparatorProps & react.RefAttributes<HTMLDivElement>>;
/**
 * ContextMenuGroup — groups multiple menu items together logically.
 *
 * @example
 * ```tsx
 * <ContextMenuGroup>
 *   <ContextMenuLabel>Edit</ContextMenuLabel>
 *   <ContextMenuItem>Cut</ContextMenuItem>
 *   <ContextMenuItem>Copy</ContextMenuItem>
 * </ContextMenuGroup>
 * ```
 */
declare const ContextMenuGroup: react.ForwardRefExoticComponent<ContextMenuGroupProps & react.RefAttributes<HTMLDivElement>>;
/**
 * ContextMenuSub — a submenu root that nests inside a context menu.
 *
 * @example
 * ```tsx
 * <ContextMenuSub>
 *   <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
 *   <ContextMenuSubContent>
 *     <ContextMenuItem>Email</ContextMenuItem>
 *     <ContextMenuItem>Copy Link</ContextMenuItem>
 *   </ContextMenuSubContent>
 * </ContextMenuSub>
 * ```
 */
declare function ContextMenuSub({ children, ...rest }: ContextMenuSubProps): react_jsx_runtime.JSX.Element;
declare namespace ContextMenuSub {
    var displayName: string;
}
/**
 * ContextMenuSubTrigger — the item that opens the nested submenu on hover.
 *
 * @example
 * ```tsx
 * <ContextMenuSubTrigger icon={<Share className="size-4" />}>
 *   Share
 * </ContextMenuSubTrigger>
 * ```
 */
declare const ContextMenuSubTrigger: react.ForwardRefExoticComponent<ContextMenuSubTriggerProps & react.RefAttributes<HTMLDivElement>>;
/**
 * ContextMenuSubContent — the content panel for a nested submenu.
 *
 * @example
 * ```tsx
 * <ContextMenuSubContent>
 *   <ContextMenuItem>Email link</ContextMenuItem>
 *   <ContextMenuItem>Copy link</ContextMenuItem>
 * </ContextMenuSubContent>
 * ```
 */
declare const ContextMenuSubContent: react.ForwardRefExoticComponent<ContextMenuSubContentProps & react.RefAttributes<HTMLDivElement>>;
/**
 * ContextMenuShortcut — displays a keyboard shortcut hint aligned to the right.
 *
 * @example
 * ```tsx
 * <ContextMenuItem>
 *   Copy
 *   <ContextMenuShortcut>⌘C</ContextMenuShortcut>
 * </ContextMenuItem>
 * ```
 */
declare function ContextMenuShortcut({ className, children, }: ContextMenuShortcutProps): react_jsx_runtime.JSX.Element;
declare namespace ContextMenuShortcut {
    var displayName: string;
}

declare const copyButtonVariants: (props?: ({
    variant?: "default" | "ghost" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type CopyButtonVariant = "default" | "ghost";
type CopyButtonSize = "sm" | "md" | "lg";
interface CopyButtonProps {
    text: string;
    variant?: CopyButtonVariant;
    size?: CopyButtonSize;
    tooltip?: string;
    successDuration?: number;
    onCopy?: (text: string) => void;
    onCopyError?: (error: Error) => void;
    className?: string;
}
declare const CopyButton: react.ForwardRefExoticComponent<CopyButtonProps & react.RefAttributes<HTMLButtonElement>>;

declare const dataListVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type DataListOrientation = "horizontal" | "vertical";
type DataListSize = "sm" | "md" | "lg";
interface DataListItem {
    term: ReactNode;
    detail: ReactNode;
    key?: string;
}
interface DataListProps {
    items: DataListItem[];
    orientation?: DataListOrientation;
    size?: DataListSize;
    dividers?: boolean;
    animated?: boolean;
    className?: string;
}
interface DataListTermProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    children?: ReactNode;
}
interface DataListDetailProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    children?: ReactNode;
}
declare const DataListTerm: react.ForwardRefExoticComponent<DataListTermProps & react.RefAttributes<HTMLElement>>;
declare const DataListDetail: react.ForwardRefExoticComponent<DataListDetailProps & react.RefAttributes<HTMLElement>>;
declare const DataList: react.ForwardRefExoticComponent<DataListProps & react.RefAttributes<HTMLDListElement>>;

type TableDensity = "compact" | "comfortable";
type TableSortDirection = "asc" | "desc";
type TableAlign = "left" | "center" | "right";
declare const tableRootVariants: (props?: ({
    density?: "compact" | "comfortable" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface TableProps extends React.HTMLAttributes<HTMLTableElement>, VariantProps<typeof tableRootVariants> {
    /**
     * Row height density.
     * @default "comfortable"
     */
    density?: TableDensity;
    /**
     * Alternate row background color for readability.
     * @default false
     */
    striped?: boolean;
    /**
     * Highlight rows on hover.
     * @default false
     */
    hoverable?: boolean;
    /**
     * Add borders between cells.
     * @default false
     */
    bordered?: boolean;
    /**
     * Wrap the table in a horizontally-scrollable container
     * so it doesn't overflow on small screens.
     * @default true
     */
    responsive?: boolean;
    /** Additional CSS classes for the wrapper (when responsive). */
    wrapperClassName?: string;
    /** Additional CSS classes for the table element. */
    className?: string;
}
/**
 * Table — semantic `<table>` element with design-system tokens.
 *
 * Provides context for density, striping, hovering, and borders to all
 * sub-components.
 *
 * @example
 * ```tsx
 * <Table striped hoverable density="compact" bordered>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead align="right">Amount</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>Alice</TableCell>
 *       <TableCell align="right">$1,200</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
declare const Table: react.ForwardRefExoticComponent<TableProps & react.RefAttributes<HTMLTableElement>>;
interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    /** Additional CSS classes. */
    className?: string;
}
/**
 * TableHeader — wraps `<thead>` with design-system styles.
 */
declare const TableHeader: react.ForwardRefExoticComponent<TableHeaderProps & react.RefAttributes<HTMLTableSectionElement>>;
interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    /** Additional CSS classes. */
    className?: string;
}
/**
 * TableBody — wraps `<tbody>` with design-system styles.
 */
declare const TableBody: react.ForwardRefExoticComponent<TableBodyProps & react.RefAttributes<HTMLTableSectionElement>>;
interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    /** Additional CSS classes. */
    className?: string;
}
/**
 * TableFooter — wraps `<tfoot>` with design-system styles.
 */
declare const TableFooter: react.ForwardRefExoticComponent<TableFooterProps & react.RefAttributes<HTMLTableSectionElement>>;
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    /**
     * Whether this row is selected / highlighted.
     * @default false
     */
    selected?: boolean;
    /** Additional CSS classes. */
    className?: string;
}
/**
 * TableRow — wraps `<tr>` with design-system styles.
 */
declare const TableRow: react.ForwardRefExoticComponent<TableRowProps & react.RefAttributes<HTMLTableRowElement>>;
interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
    /**
     * Text alignment within the cell.
     * @default "left"
     */
    align?: TableAlign;
    /**
     * Whether this column is sortable.
     * When true, renders a sort indicator and makes the header clickable.
     * @default false
     */
    sortable?: boolean;
    /**
     * Current sort direction. Only relevant when `sortable` is true.
     * - `"asc"` — ascending (renders up chevron)
     * - `"desc"` — descending (renders down chevron)
     * - `undefined` — not currently sorted (renders neutral indicator)
     */
    sorted?: TableSortDirection;
    /**
     * Callback fired when the sortable header is clicked.
     * Only relevant when `sortable` is true.
     */
    onSort?: () => void;
    /**
     * Whether the header should stick to the top of the scroll container.
     * @default false
     */
    sticky?: boolean;
    /** Additional CSS classes. */
    className?: string;
}
/**
 * TableHead — wraps `<th>` with design-system styles.
 *
 * Supports sort indicators for sortable columns. The sort logic is
 * consumer-owned — this component only provides the visual indicator
 * and click handler.
 *
 * @example
 * ```tsx
 * <TableHead
 *   sortable
 *   sorted="asc"
 *   onSort={() => toggleSort("name")}
 * >
 *   Name
 * </TableHead>
 * ```
 */
declare const TableHead: react.ForwardRefExoticComponent<TableHeadProps & react.RefAttributes<HTMLTableCellElement>>;
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    /**
     * Text alignment within the cell.
     * @default "left"
     */
    align?: TableAlign;
    /** Additional CSS classes. */
    className?: string;
}
/**
 * TableCell — wraps `<td>` with design-system styles.
 */
declare const TableCell: react.ForwardRefExoticComponent<TableCellProps & react.RefAttributes<HTMLTableCellElement>>;
interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
    /** Additional CSS classes. */
    className?: string;
}
/**
 * TableCaption — wraps `<caption>` with design-system styles.
 *
 * Renders at the bottom of the table by default (via `caption-bottom`
 * on the root `<table>`).
 */
declare const TableCaption: react.ForwardRefExoticComponent<TableCaptionProps & react.RefAttributes<HTMLTableCaptionElement>>;

/**
 * Extend TanStack Table's ColumnMeta with Unified UI specific properties.
 * Consumers can use these in their ColumnDef `meta` field.
 */
interface DataTableColumnMeta {
    /** Text alignment for the column header and cells. */
    align?: TableAlign;
    /** Whether this column should have a sticky header. */
    sticky?: boolean;
    /** Custom CSS class for header cells. */
    headerClassName?: string;
    /** Custom CSS class for body cells. */
    cellClassName?: string;
    /** Whether to show a filter input for this column. */
    filterable?: boolean;
    /** Placeholder text for the column filter input. */
    filterPlaceholder?: string;
    /**
     * Enable a dropdown header menu (Asc / Desc / Hide) on this column.
     * When `true`, clicking the column header opens a dropdown instead of
     * directly toggling the sort direction.
     * @default false
     */
    enableHeaderMenu?: boolean;
}
/**
 * Configuration for a faceted filter button shown in the toolbar.
 * Each entry creates a pill-style button that opens a popover with
 * checkbox options derived from the column's unique values.
 */
interface DataTableFacetedFilter {
    /** The column ID to filter on (must match a `ColumnDef` accessorKey or id). */
    columnId: string;
    /** Display label for the filter button. */
    title: string;
    /**
     * Optional icon rendered before the title.
     * Pass a React element (e.g. a Lucide icon).
     */
    icon?: ReactNode;
    /**
     * Explicit list of filter options. If omitted the component will
     * derive options from the column's unique faceted values.
     */
    options?: {
        label: string;
        value: string;
        icon?: ReactNode;
    }[];
}
interface DataTableProps<TData> {
    /** The data array to render. Each item becomes a row. */
    data: TData[];
    /**
     * TanStack Table column definitions.
     * @see https://tanstack.com/table/latest/docs/guide/column-defs
     */
    columns: ColumnDef<TData, any>[];
    /**
     * Faceted filter buttons rendered in the toolbar.
     * Each entry creates a pill-style button that opens a checkbox popover
     * filtered by that column's unique values.
     */
    facetedFilters?: DataTableFacetedFilter[];
    /**
     * Enable client-side sorting.
     * @default false
     */
    sorting?: boolean;
    /**
     * Controlled sorting state. When provided, sorting becomes controlled.
     * Use with `onSortingChange`.
     */
    sortingState?: SortingState;
    /** Callback for controlled sorting state changes. */
    onSortingChange?: OnChangeFn<SortingState>;
    /**
     * Enable multi-column sorting (hold Shift to sort by multiple columns).
     * @default false
     */
    multiSort?: boolean;
    /**
     * Enable client-side filtering (global + per-column).
     * @default false
     */
    filtering?: boolean;
    /**
     * Controlled global filter value.
     */
    globalFilter?: string;
    /** Callback for controlled global filter changes. */
    onGlobalFilterChange?: OnChangeFn<string>;
    /**
     * Controlled column filters state.
     */
    columnFilters?: ColumnFiltersState;
    /** Callback for controlled column filter changes. */
    onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
    /**
     * Show a global search input above the table.
     * Requires `filtering` to be enabled.
     * @default false
     */
    showGlobalFilter?: boolean;
    /** Placeholder for the global search input. */
    globalFilterPlaceholder?: string;
    /**
     * Enable client-side pagination.
     * @default false
     */
    pagination?: boolean;
    /**
     * Number of rows per page.
     * @default 10
     */
    pageSize?: number;
    /**
     * Controlled pagination state.
     */
    paginationState?: PaginationState;
    /** Callback for controlled pagination changes. */
    onPaginationChange?: OnChangeFn<PaginationState>;
    /**
     * Available page size options for the page-size selector.
     * Set to `false` to hide the selector.
     * @default [10, 20, 30, 50, 100]
     */
    pageSizeOptions?: number[] | false;
    /**
     * Enable row selection.
     * - `"single"` — only one row at a time
     * - `"multi"` — multiple rows via checkboxes
     * - `false` — disabled
     * @default false
     */
    rowSelection?: "single" | "multi" | false;
    /**
     * Controlled row selection state.
     * Keys are row IDs (by default the row index).
     */
    rowSelectionState?: RowSelectionState;
    /** Callback for controlled row selection changes. */
    onRowSelectionChange?: OnChangeFn<RowSelectionState>;
    /**
     * Callback when selected rows change. Receives the full Row objects.
     * Convenience wrapper around `onRowSelectionChange`.
     */
    onSelectedRowsChange?: (rows: Row<TData>[]) => void;
    /**
     * Function to determine if a row can be selected.
     */
    enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
    /**
     * Custom row ID accessor. By default, the row index is used.
     */
    getRowId?: (originalRow: TData, index: number) => string;
    /**
     * Enable column visibility toggling.
     * @default false
     */
    columnVisibility?: boolean;
    /**
     * Controlled column visibility state.
     */
    columnVisibilityState?: VisibilityState;
    /** Callback for controlled column visibility changes. */
    onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
    /**
     * Controlled column pinning state.
     */
    columnPinning?: ColumnPinningState;
    /** Callback for controlled column pinning changes. */
    onColumnPinningChange?: OnChangeFn<ColumnPinningState>;
    /**
     * Row height density.
     * @default "comfortable"
     */
    density?: TableDensity;
    /**
     * Alternate row background color for readability.
     * @default false
     */
    striped?: boolean;
    /**
     * Highlight rows on hover.
     * @default true
     */
    hoverable?: boolean;
    /**
     * Add borders between cells.
     * @default false
     */
    bordered?: boolean;
    /**
     * Wrap the table in a horizontally-scrollable container.
     * @default true
     */
    responsive?: boolean;
    /**
     * Show a loading skeleton overlay.
     * @default false
     */
    loading?: boolean;
    /**
     * Custom content to show when data is empty.
     */
    emptyState?: ReactNode;
    /**
     * Table caption (accessibility).
     */
    caption?: ReactNode;
    /**
     * Render a footer row. If true, column footers from ColumnDef are rendered.
     * @default false
     */
    showFooter?: boolean;
    /**
     * Content rendered above the table (e.g., filters, actions toolbar).
     * Receives the table instance for advanced usage.
     */
    toolbar?: ReactNode | ((table: Table$1<TData>) => ReactNode);
    /**
     * Content rendered below the table (e.g., custom pagination, summary).
     * Receives the table instance for advanced usage.
     */
    footer?: ReactNode | ((table: Table$1<TData>) => ReactNode);
    /** Additional CSS classes for the outermost wrapper. */
    className?: string;
    /** Additional CSS classes for the table element. */
    tableClassName?: string;
    /** Additional CSS classes for the responsive wrapper. */
    wrapperClassName?: string;
    /**
     * Callback when a row is clicked.
     */
    onRowClick?: (row: Row<TData>, event: React.MouseEvent) => void;
    /**
     * Expose the table instance to the parent via ref callback.
     */
    onTableInstance?: (table: Table$1<TData>) => void;
}
/**
 * DataTable — a feature-rich data table powered by TanStack Table,
 * rendered with Unified UI's styled Table primitives.
 *
 * Supports sorting, filtering, pagination, row selection, column visibility,
 * loading/empty states, and custom toolbar/footer slots.
 *
 * @example
 * ```tsx
 * import { DataTable, type ColumnDef } from "@work-rjkashyap/unified-ui";
 *
 * type Person = { name: string; email: string; age: number };
 *
 * const columns: ColumnDef<Person>[] = [
 *   { accessorKey: "name", header: "Name" },
 *   { accessorKey: "email", header: "Email" },
 *   { accessorKey: "age", header: "Age" },
 * ];
 *
 * <DataTable
 *   data={people}
 *   columns={columns}
 *   sorting
 *   pagination
 *   pageSize={20}
 *   striped
 *   hoverable
 * />
 * ```
 */
declare const DataTable: <TData>(props: DataTableProps<TData> & {
    ref?: React.Ref<HTMLDivElement>;
}) => React.ReactElement;
interface UseDataTableOptions<TData> {
    data: TData[];
    columns: ColumnDef<TData, any>[];
    initialSorting?: SortingState;
    initialPagination?: Partial<PaginationState>;
    initialColumnFilters?: ColumnFiltersState;
    initialRowSelection?: RowSelectionState;
    initialColumnVisibility?: VisibilityState;
    initialGlobalFilter?: string;
}
interface UseDataTableReturn<_TData> {
    sorting: SortingState;
    onSortingChange: OnChangeFn<SortingState>;
    globalFilter: string;
    onGlobalFilterChange: OnChangeFn<string>;
    columnFilters: ColumnFiltersState;
    onColumnFiltersChange: OnChangeFn<ColumnFiltersState>;
    pagination: PaginationState;
    onPaginationChange: OnChangeFn<PaginationState>;
    rowSelection: RowSelectionState;
    onRowSelectionChange: OnChangeFn<RowSelectionState>;
    columnVisibility: VisibilityState;
    onColumnVisibilityChange: OnChangeFn<VisibilityState>;
    /** Spread these into <DataTable /> for full controlled mode. */
    tableProps: {
        sortingState: SortingState;
        onSortingChange: OnChangeFn<SortingState>;
        globalFilter: string;
        onGlobalFilterChange: OnChangeFn<string>;
        columnFilters: ColumnFiltersState;
        onColumnFiltersChange: OnChangeFn<ColumnFiltersState>;
        paginationState: PaginationState;
        onPaginationChange: OnChangeFn<PaginationState>;
        rowSelectionState: RowSelectionState;
        onRowSelectionChange: OnChangeFn<RowSelectionState>;
        columnVisibilityState: VisibilityState;
        onColumnVisibilityChange: OnChangeFn<VisibilityState>;
    };
    /** Reset all state back to initial values. */
    reset: () => void;
}
/**
 * useDataTable — a convenience hook that manages all table state in one place.
 *
 * Spread `tableProps` into `<DataTable />` for fully controlled usage:
 *
 * @example
 * ```tsx
 * const { tableProps, sorting, rowSelection, reset } = useDataTable({
 *   data,
 *   columns,
 *   initialSorting: [{ id: "name", desc: false }],
 *   initialPagination: { pageSize: 20 },
 * });
 *
 * <DataTable
 *   data={data}
 *   columns={columns}
 *   sorting
 *   pagination
 *   rowSelection="multi"
 *   {...tableProps}
 * />
 * ```
 */
declare function useDataTable<TData>(options: UseDataTableOptions<TData>): UseDataTableReturn<TData>;

type DatePickerMode = "single" | "range";
type DatePickerSize = "sm" | "md" | "lg";
interface DatePickerProps {
    /**
     * Selection mode.
     * @default "single"
     */
    mode?: DatePickerMode;
    /**
     * The currently selected date (single mode).
     */
    value?: Date | null;
    /**
     * The currently selected range (range mode).
     */
    valueRange?: DateRange | null;
    /**
     * Callback for single-date selection.
     */
    onSelect?: (date: Date | null) => void;
    /**
     * Callback for range selection.
     */
    onSelectRange?: (range: DateRange | null) => void;
    /**
     * Placeholder text shown when no date is selected.
     * @default "Pick a date"
     */
    placeholder?: string;
    /**
     * Size of the trigger input.
     * @default "md"
     */
    size?: DatePickerSize;
    /**
     * Whether the picker is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether to show a clear (×) button when a date is selected.
     * @default true
     */
    clearable?: boolean;
    /**
     * Locale string for date formatting.
     * @default "en-US"
     */
    locale?: string;
    /**
     * A function that returns `true` for dates that should be disabled.
     */
    disabledDate?: (date: Date) => boolean;
    /**
     * Minimum selectable date.
     */
    minDate?: Date;
    /**
     * Maximum selectable date.
     */
    maxDate?: Date;
    /**
     * Default month to display when no date is selected.
     */
    defaultMonth?: Date;
    /**
     * Alignment of the popover relative to the trigger.
     * @default "start"
     */
    align?: "start" | "center" | "end";
    /** Additional CSS classes on the trigger button. */
    className?: string;
    /** Additional CSS classes on the popover content. */
    contentClassName?: string;
}
/**
 * DatePicker — a date or date-range input with calendar popover.
 *
 * @example
 * // Single date
 * const [date, setDate] = useState<Date | null>(null);
 * <DatePicker value={date} onSelect={setDate} />
 *
 * // Range
 * const [range, setRange] = useState<DateRange | null>(null);
 * <DatePicker mode="range" valueRange={range} onSelectRange={setRange} />
 *
 * // Disabled past dates
 * <DatePicker disabledDate={(d) => d < new Date()} placeholder="Future only" />
 */
declare const DatePicker: react.ForwardRefExoticComponent<DatePickerProps & react.RefAttributes<HTMLButtonElement>>;

declare const dialogContentVariants: (props?: ({
    size?: "sm" | "md" | "lg" | "full" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type DialogSize = "sm" | "md" | "lg" | "full";
interface DialogProps extends Dialog$1.DialogProps {
    children: ReactNode;
}
interface DialogTriggerProps extends ComponentPropsWithoutRef<typeof Dialog$1.Trigger> {
    className?: string;
}
interface DialogContentProps extends Omit<ComponentPropsWithoutRef<typeof Dialog$1.Content>, "asChild"> {
    size?: DialogSize;
    showClose?: boolean;
    overlayClassName?: string;
    className?: string;
    children: ReactNode;
}
interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
}
interface DialogBodyProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
}
interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
}
interface DialogTitleProps extends ComponentPropsWithoutRef<typeof Dialog$1.Title> {
    className?: string;
    children: ReactNode;
}
interface DialogDescriptionProps extends ComponentPropsWithoutRef<typeof Dialog$1.Description> {
    className?: string;
    children: ReactNode;
}
interface DialogCloseProps extends ComponentPropsWithoutRef<typeof Dialog$1.Close> {
    className?: string;
}
declare function Dialog({ children, ...rest }: DialogProps): react_jsx_runtime.JSX.Element;
declare namespace Dialog {
    var displayName: string;
}
declare const DialogTrigger: react.ForwardRefExoticComponent<DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const DialogContent: react.ForwardRefExoticComponent<DialogContentProps & react.RefAttributes<HTMLDivElement>>;
declare function DialogHeader({ className, children, ...rest }: DialogHeaderProps): react_jsx_runtime.JSX.Element;
declare namespace DialogHeader {
    var displayName: string;
}
declare function DialogBody({ className, children, ...rest }: DialogBodyProps): react_jsx_runtime.JSX.Element;
declare namespace DialogBody {
    var displayName: string;
}
declare function DialogFooter({ className, children, ...rest }: DialogFooterProps): react_jsx_runtime.JSX.Element;
declare namespace DialogFooter {
    var displayName: string;
}
declare const DialogTitle: react.ForwardRefExoticComponent<DialogTitleProps & react.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: react.ForwardRefExoticComponent<DialogDescriptionProps & react.RefAttributes<HTMLParagraphElement>>;
declare const DialogClose: react.ForwardRefExoticComponent<DialogCloseProps & react.RefAttributes<HTMLButtonElement>>;

interface DropdownMenuProps extends DropdownMenu$1.DropdownMenuProps {
    children: ReactNode;
}
interface DropdownMenuTriggerProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.Trigger> {
    className?: string;
}
interface DropdownMenuContentProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.Content> {
    className?: string;
    children: ReactNode;
}
type DropdownMenuItemVariant = "default" | "danger";
interface DropdownMenuItemProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.Item> {
    className?: string;
    /** Visual variant. @default "default" */
    variant?: DropdownMenuItemVariant;
    /** Optional icon displayed before the label. */
    icon?: ReactNode;
    /** Optional keyboard shortcut displayed on the right. */
    shortcut?: string;
    children: ReactNode;
}
interface DropdownMenuCheckboxItemProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.CheckboxItem> {
    className?: string;
    children: ReactNode;
}
interface DropdownMenuRadioGroupProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.RadioGroup> {
    className?: string;
    children: ReactNode;
}
interface DropdownMenuRadioItemProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.RadioItem> {
    className?: string;
    children: ReactNode;
}
interface DropdownMenuLabelProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.Label> {
    className?: string;
    /** Whether the label is inset (aligned with items that have icons). */
    inset?: boolean;
    children: ReactNode;
}
interface DropdownMenuSeparatorProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.Separator> {
    className?: string;
}
interface DropdownMenuGroupProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.Group> {
    className?: string;
    children: ReactNode;
}
interface DropdownMenuSubProps extends DropdownMenu$1.DropdownMenuSubProps {
    children: ReactNode;
}
interface DropdownMenuSubTriggerProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.SubTrigger> {
    className?: string;
    /** Whether the sub-trigger is inset (aligned with items that have icons). */
    inset?: boolean;
    /** Optional icon displayed before the label. */
    icon?: ReactNode;
    children: ReactNode;
}
interface DropdownMenuSubContentProps extends ComponentPropsWithoutRef<typeof DropdownMenu$1.SubContent> {
    className?: string;
    children: ReactNode;
}
interface DropdownMenuShortcutProps {
    className?: string;
    children: ReactNode;
}
declare function DropdownMenu({ children, ...rest }: DropdownMenuProps): react_jsx_runtime.JSX.Element;
declare namespace DropdownMenu {
    var displayName: string;
}
declare const DropdownMenuTrigger: react.ForwardRefExoticComponent<DropdownMenuTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuContent: react.ForwardRefExoticComponent<DropdownMenuContentProps & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuItem: react.ForwardRefExoticComponent<DropdownMenuItemProps & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuCheckboxItem: react.ForwardRefExoticComponent<DropdownMenuCheckboxItemProps & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuRadioGroup: react.ForwardRefExoticComponent<DropdownMenuRadioGroupProps & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuRadioItem: react.ForwardRefExoticComponent<DropdownMenuRadioItemProps & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuLabel: react.ForwardRefExoticComponent<DropdownMenuLabelProps & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSeparator: react.ForwardRefExoticComponent<DropdownMenuSeparatorProps & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuGroup: react.ForwardRefExoticComponent<DropdownMenuGroupProps & react.RefAttributes<HTMLDivElement>>;
declare function DropdownMenuSub({ children, ...rest }: DropdownMenuSubProps): react_jsx_runtime.JSX.Element;
declare namespace DropdownMenuSub {
    var displayName: string;
}
declare const DropdownMenuSubTrigger: react.ForwardRefExoticComponent<DropdownMenuSubTriggerProps & react.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubContent: react.ForwardRefExoticComponent<DropdownMenuSubContentProps & react.RefAttributes<HTMLDivElement>>;
declare function DropdownMenuShortcut({ className, children, }: DropdownMenuShortcutProps): react_jsx_runtime.JSX.Element;
declare namespace DropdownMenuShortcut {
    var displayName: string;
}

interface EmptyStateProps {
    icon?: ReactNode;
    title?: ReactNode;
    description?: ReactNode;
    action?: ReactNode;
    animated?: boolean;
    className?: string;
    children?: ReactNode;
}
declare const EmptyState: react.ForwardRefExoticComponent<EmptyStateProps & react.RefAttributes<HTMLDivElement>>;

declare const fileUploadZoneVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    state?: "disabled" | "error" | "idle" | "dragOver" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type FileUploadSize = "sm" | "md" | "lg";
interface FileUploadItem {
    id: string;
    file: File;
    preview?: string;
    progress?: number;
    error?: string;
    status: "idle" | "uploading" | "success" | "error";
}
interface FileUploadProps {
    onFilesChange?: (files: FileUploadItem[]) => void;
    onFileAdd?: (file: File) => void;
    onFileRemove?: (id: string) => void;
    accept?: string;
    multiple?: boolean;
    maxFiles?: number;
    maxSize?: number;
    size?: FileUploadSize;
    disabled?: boolean;
    label?: ReactNode;
    description?: ReactNode;
    className?: string;
    "aria-label"?: string;
}
declare const FileUpload: react.ForwardRefExoticComponent<FileUploadProps & react.RefAttributes<HTMLDivElement>>;

type FormFieldSize = "sm" | "md" | "lg";
type FormFieldOrientation = "vertical" | "horizontal";
interface FormFieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /**
     * Label text for the form field.
     * Rendered as a `<label>` element linked to the control via `htmlFor`.
     */
    label?: ReactNode;
    /**
     * Description / helper text displayed below the label (or below the
     * control in vertical orientation).
     * Linked to the control via `aria-describedby`.
     */
    description?: ReactNode;
    /**
     * Error message displayed below the control.
     * When provided, the field is treated as invalid and the error
     * replaces the description.
     * Linked to the control via `aria-describedby`.
     */
    error?: ReactNode;
    /**
     * Size of the form field. Controls label text size, spacing, and
     * provides the correct sizing context for child controls.
     * @default "md"
     */
    size?: FormFieldSize;
    /**
     * Layout orientation for the label + control pair.
     * - `"vertical"` — label stacked above control (default)
     * - `"horizontal"` — label to the left, control to the right
     * @default "vertical"
     */
    orientation?: FormFieldOrientation;
    /**
     * Whether the field is required.
     * Displays a red asterisk (*) after the label text.
     * @default false
     */
    required?: boolean;
    /**
     * Whether the field is disabled.
     * Reduces opacity on all elements (label, description, error).
     * @default false
     */
    disabled?: boolean;
    /**
     * The HTML `id` attribute for the form control.
     * When provided, the label's `htmlFor` will point to this id, and
     * `aria-describedby` / `aria-errormessage` ids are derived from it.
     * When omitted, a unique id is auto-generated.
     */
    htmlFor?: string;
    /**
     * Additional CSS classes for the label element.
     */
    labelClassName?: string;
    /**
     * Additional CSS classes for the description element.
     */
    descriptionClassName?: string;
    /**
     * Additional CSS classes for the error message element.
     */
    errorClassName?: string;
    /**
     * Additional CSS classes for the control wrapper element
     * (the container around the children).
     */
    controlClassName?: string;
    /**
     * The form control(s) to render inside the field.
     * Can be a single element or a render function that receives
     * accessibility props to spread on the control.
     */
    children: ReactNode | ((props: FormFieldControlProps) => ReactNode);
    /** Additional CSS classes to merge on the root element. */
    className?: string;
}
/**
 * Props passed to the render-function form of `children`.
 * Spread these on your form control for full accessibility.
 */
interface FormFieldControlProps {
    /** The id to set on the control element. */
    id: string;
    /** Space-separated ids of description and/or error elements. */
    "aria-describedby"?: string;
    /** Whether the control is in an invalid state. */
    "aria-invalid"?: boolean;
    /** Whether the control is required. */
    "aria-required"?: boolean;
    /** Whether the control is disabled. */
    disabled?: boolean;
}
/**
 * FormField — a composable form field wrapper that handles label,
 * description, error message, and accessibility attributes.
 *
 * Wraps any form control (Input, Textarea, Select, Checkbox, etc.) with
 * consistent layout, labeling, and error display. Automatically generates
 * and wires up `htmlFor`, `aria-describedby`, and `aria-invalid` attributes.
 *
 * For maximum accessibility, use the render-function form of `children`
 * to receive and spread the control props:
 *
 * ```tsx
 * <FormField label="Email" error={errors.email}>
 *   {(controlProps) => <Input {...controlProps} type="email" />}
 * </FormField>
 * ```
 *
 * Alternatively, pass a single child element and manually set its `id`
 * to match the `htmlFor` prop (or rely on auto-generated ids and the
 * native label click behavior).
 *
 * Accessibility:
 *   - Label is linked to the control via `htmlFor` / `id`
 *   - Description is linked via `aria-describedby`
 *   - Error message is linked via `aria-describedby` (replaces description)
 *   - Error state sets `aria-invalid="true"` on the control (via render fn)
 *   - Required state adds visual indicator and `aria-required` (via render fn)
 *   - Disabled state is propagated to all visual elements
 *
 * @example
 * ```tsx
 * // Basic vertical layout
 * <FormField label="Email" description="We'll never share your email.">
 *   <Input id="email" type="email" />
 * </FormField>
 *
 * // With error
 * <FormField label="Password" required error="Password is required.">
 *   <Input id="password" type="password" variant="error" />
 * </FormField>
 *
 * // Render function for auto-wired accessibility
 * <FormField label="Name" required error={errors.name}>
 *   {(props) => <Input {...props} placeholder="Enter your name" />}
 * </FormField>
 *
 * // Horizontal layout
 * <FormField label="Username" orientation="horizontal">
 *   <Input id="username" />
 * </FormField>
 *
 * // Small size
 * <FormField label="Code" size="sm" description="6-digit code">
 *   <Input id="code" size="sm" />
 * </FormField>
 *
 * // Disabled
 * <FormField label="Locked" disabled>
 *   <Input id="locked" disabled value="Cannot edit" />
 * </FormField>
 * ```
 */
declare const FormField: react.ForwardRefExoticComponent<FormFieldProps & react.RefAttributes<HTMLDivElement>>;

type HoverCardSide = "top" | "right" | "bottom" | "left";
type HoverCardAlign = "start" | "center" | "end";
interface HoverCardProps extends ComponentPropsWithoutRef<typeof HoverCard$1.Root> {
    openDelay?: number;
    closeDelay?: number;
}
interface HoverCardTriggerProps extends ComponentPropsWithoutRef<typeof HoverCard$1.Trigger> {
}
interface HoverCardContentProps extends ComponentPropsWithoutRef<typeof HoverCard$1.Content> {
    side?: HoverCardSide;
    align?: HoverCardAlign;
    sideOffset?: number;
    className?: string;
    children?: ReactNode;
}
declare function HoverCard({ openDelay, closeDelay, ...props }: HoverCardProps): react_jsx_runtime.JSX.Element;
declare namespace HoverCard {
    var displayName: string;
}
declare const HoverCardTrigger: react.ForwardRefExoticComponent<HoverCard$1.HoverCardTriggerProps & react.RefAttributes<HTMLAnchorElement>>;
declare const HoverCardContent: react.ForwardRefExoticComponent<HoverCardContentProps & react.RefAttributes<HTMLDivElement>>;

declare const inputVariants: (props?: ({
    variant?: "success" | "error" | "default" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type InputVariant = "default" | "error" | "success";
type InputSize = "sm" | "md" | "lg";
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof inputVariants> {
    /**
     * Visual variant of the input.
     * @default "default"
     */
    variant?: InputVariant;
    /**
     * Size of the input.
     * @default "md"
     */
    size?: InputSize;
    /**
     * Icon to display on the left side of the input.
     * Typically a Lucide icon component rendered at the appropriate size.
     */
    iconLeft?: ReactNode;
    /**
     * Icon to display on the right side of the input.
     * If `clearable` is true and there is a value, the clear button
     * takes precedence over `iconRight`.
     */
    iconRight?: ReactNode;
    /**
     * Whether to show a clear button when the input has a value.
     * @default false
     */
    clearable?: boolean;
    /**
     * Callback fired when the clear button is clicked.
     * If not provided, the input will dispatch a native change event
     * with an empty string value.
     */
    onClear?: () => void;
    /**
     * Additional CSS classes for the outer wrapper element.
     * Use this when you need to control the width/margin of the input group.
     */
    wrapperClassName?: string;
    /** Additional CSS classes to merge on the input element. */
    className?: string;
}
/**
 * Input — a text input for capturing user data.
 *
 * Built on the design system's token layer with CVA for variant composition.
 * All colors, radii, spacing, and transitions come from CSS custom properties
 * defined in design-system.css.
 *
 * Accessibility:
 *   - Focus ring visible on keyboard navigation (focus-visible)
 *   - Disabled state uses both `disabled` attribute and `aria-disabled`
 *   - Error variant sets `aria-invalid="true"` automatically
 *   - Supports `aria-describedby` for linking to error/helper messages
 *   - Clear button has `aria-label` and is excluded from tab order
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Input placeholder="Enter your name" />
 *
 * // With variant
 * <Input variant="error" aria-describedby="email-error" />
 *
 * // With icons
 * <Input iconLeft={<SearchIcon />} placeholder="Search..." />
 * <Input iconRight={<MailIcon />} placeholder="Email" />
 *
 * // Clearable
 * <Input
 *   clearable
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 *   onClear={() => setValue("")}
 * />
 *
 * // Sizes
 * <Input size="sm" placeholder="Small" />
 * <Input size="md" placeholder="Medium" />
 * <Input size="lg" placeholder="Large" />
 *
 * // Disabled / Read-only
 * <Input disabled placeholder="Disabled" />
 * <Input readOnly value="Read-only value" />
 * ```
 */
declare const Input: react.ForwardRefExoticComponent<InputProps & react.RefAttributes<HTMLInputElement>>;

type InputGroupSize = "sm" | "md" | "lg";
type InputGroupVariant = "default" | "filled";
interface InputGroupProps {
    size?: InputGroupSize;
    variant?: InputGroupVariant;
    prefix?: ReactNode;
    suffix?: ReactNode;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    disabled?: boolean;
    error?: boolean;
    className?: string;
    inputClassName?: string;
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
    children?: ReactNode;
}
declare const InputGroup: react.ForwardRefExoticComponent<InputGroupProps & react.RefAttributes<HTMLDivElement>>;

declare const kbdVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type KbdSize = "sm" | "md" | "lg";
interface KbdProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof kbdVariants> {
    size?: KbdSize;
    className?: string;
    children?: ReactNode;
}
/**
 * Kbd — keyboard shortcut display.
 *
 * @example
 * <Kbd>⌘K</Kbd>
 * <Kbd>Ctrl</Kbd><span>+</span><Kbd>S</Kbd>
 * <Kbd size="sm">Enter</Kbd>
 */
declare const Kbd: react.ForwardRefExoticComponent<KbdProps & react.RefAttributes<HTMLElement>>;

declare const labelVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type LabelSize = "sm" | "md" | "lg";
interface LabelProps extends Omit<React.ComponentPropsWithoutRef<typeof Label$1.Root>, "asChild">, VariantProps<typeof labelVariants> {
    /**
     * Size of the label text.
     * @default "md"
     */
    size?: LabelSize;
    /**
     * Whether the associated field is required.
     * When true, a red asterisk (*) is displayed after the label text.
     * @default false
     */
    required?: boolean;
    /**
     * Whether the associated field is disabled.
     * Applies reduced opacity and not-allowed cursor.
     * @default false
     */
    disabled?: boolean;
    /**
     * Optional description or helper text displayed below the label.
     * Useful for providing additional context about the field.
     */
    description?: ReactNode;
    /**
     * Additional CSS classes for the description text.
     */
    descriptionClassName?: string;
    /**
     * Additional CSS classes for the outer wrapper element.
     * Only applied when `description` is provided (wrapper is needed
     * to stack label + description).
     */
    wrapperClassName?: string;
    /** Content to render inside the label. */
    children?: ReactNode;
    /** Additional CSS classes to merge on the label element. */
    className?: string;
}
/**
 * Label — an accessible label for form controls.
 *
 * Built on Radix UI's Label primitive for proper accessibility semantics
 * and the design system's token layer for consistent styling. When used
 * with Radix form controls, clicking the label will focus the associated
 * input automatically.
 *
 * Accessibility:
 *   - Renders as a native `<label>` element for proper semantics
 *   - Use `htmlFor` to associate with the corresponding input's `id`
 *   - Required indicator is decorative (`aria-hidden`) — use `aria-required`
 *     on the input itself for screen reader support
 *   - Disabled state is visual only — disable the input for functional disabling
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Label htmlFor="email">Email address</Label>
 * <Input id="email" type="email" />
 *
 * // Required field
 * <Label htmlFor="name" required>Full name</Label>
 * <Input id="name" aria-required="true" />
 *
 * // With description
 * <Label htmlFor="bio" description="Keep it under 200 characters.">
 *   Bio
 * </Label>
 * <Textarea id="bio" />
 *
 * // Small size for dense UIs
 * <Label htmlFor="code" size="sm">Verification code</Label>
 * <Input id="code" size="sm" />
 *
 * // Disabled
 * <Label htmlFor="locked" disabled>Locked field</Label>
 * <Input id="locked" disabled />
 * ```
 */
declare const Label: react.ForwardRefExoticComponent<LabelProps & react.RefAttributes<HTMLLabelElement>>;

interface MenubarProps extends ComponentPropsWithoutRef<typeof Menubar$1.Root> {
    className?: string;
}
interface MenubarMenuProps {
    children: ReactNode;
    value?: string;
}
interface MenubarTriggerProps extends ComponentPropsWithoutRef<typeof Menubar$1.Trigger> {
    className?: string;
}
interface MenubarContentProps extends ComponentPropsWithoutRef<typeof Menubar$1.Content> {
    className?: string;
}
type MenubarItemVariant = "default" | "danger";
interface MenubarItemProps extends ComponentPropsWithoutRef<typeof Menubar$1.Item> {
    variant?: MenubarItemVariant;
    icon?: ReactNode;
    inset?: boolean;
    className?: string;
}
interface MenubarCheckboxItemProps extends ComponentPropsWithoutRef<typeof Menubar$1.CheckboxItem> {
    checked?: boolean;
    className?: string;
}
interface MenubarRadioGroupProps extends ComponentPropsWithoutRef<typeof Menubar$1.RadioGroup> {
    className?: string;
}
interface MenubarRadioItemProps extends ComponentPropsWithoutRef<typeof Menubar$1.RadioItem> {
    className?: string;
}
interface MenubarLabelProps extends ComponentPropsWithoutRef<typeof Menubar$1.Label> {
    inset?: boolean;
    className?: string;
}
interface MenubarSeparatorProps extends ComponentPropsWithoutRef<typeof Menubar$1.Separator> {
    className?: string;
}
interface MenubarGroupProps extends ComponentPropsWithoutRef<typeof Menubar$1.Group> {
    className?: string;
}
interface MenubarSubProps {
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
interface MenubarSubTriggerProps extends ComponentPropsWithoutRef<typeof Menubar$1.SubTrigger> {
    inset?: boolean;
    icon?: ReactNode;
    className?: string;
}
interface MenubarSubContentProps extends ComponentPropsWithoutRef<typeof Menubar$1.SubContent> {
    className?: string;
}
interface MenubarShortcutProps {
    children: ReactNode;
    className?: string;
}
declare const Menubar: react.ForwardRefExoticComponent<MenubarProps & react.RefAttributes<HTMLDivElement>>;
declare function MenubarMenu({ children, ...rest }: MenubarMenuProps): react_jsx_runtime.JSX.Element;
declare namespace MenubarMenu {
    var displayName: string;
}
declare const MenubarTrigger: react.ForwardRefExoticComponent<MenubarTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const MenubarContent: react.ForwardRefExoticComponent<MenubarContentProps & react.RefAttributes<HTMLDivElement>>;
declare const MenubarItem: react.ForwardRefExoticComponent<MenubarItemProps & react.RefAttributes<HTMLDivElement>>;
declare const MenubarCheckboxItem: react.ForwardRefExoticComponent<MenubarCheckboxItemProps & react.RefAttributes<HTMLDivElement>>;
declare const MenubarRadioGroup: react.ForwardRefExoticComponent<MenubarRadioGroupProps & react.RefAttributes<HTMLDivElement>>;
declare const MenubarRadioItem: react.ForwardRefExoticComponent<MenubarRadioItemProps & react.RefAttributes<HTMLDivElement>>;
declare const MenubarLabel: react.ForwardRefExoticComponent<MenubarLabelProps & react.RefAttributes<HTMLDivElement>>;
declare const MenubarSeparator: react.ForwardRefExoticComponent<MenubarSeparatorProps & react.RefAttributes<HTMLDivElement>>;
declare const MenubarGroup: react.ForwardRefExoticComponent<MenubarGroupProps & react.RefAttributes<HTMLDivElement>>;
declare function MenubarSub({ children, ...rest }: MenubarSubProps): react_jsx_runtime.JSX.Element;
declare namespace MenubarSub {
    var displayName: string;
}
declare const MenubarSubTrigger: react.ForwardRefExoticComponent<MenubarSubTriggerProps & react.RefAttributes<HTMLDivElement>>;
declare const MenubarSubContent: react.ForwardRefExoticComponent<MenubarSubContentProps & react.RefAttributes<HTMLDivElement>>;
declare function MenubarShortcut({ className, children }: MenubarShortcutProps): react_jsx_runtime.JSX.Element;
declare namespace MenubarShortcut {
    var displayName: string;
}

interface NavigationMenuProps extends ComponentPropsWithoutRef<typeof NavigationMenu$1.Root> {
    className?: string;
}
interface NavigationMenuListProps extends ComponentPropsWithoutRef<typeof NavigationMenu$1.List> {
    className?: string;
}
interface NavigationMenuItemProps extends ComponentPropsWithoutRef<typeof NavigationMenu$1.Item> {
    className?: string;
}
interface NavigationMenuTriggerProps extends ComponentPropsWithoutRef<typeof NavigationMenu$1.Trigger> {
    className?: string;
}
interface NavigationMenuContentProps extends ComponentPropsWithoutRef<typeof NavigationMenu$1.Content> {
    className?: string;
}
interface NavigationMenuLinkProps extends ComponentPropsWithoutRef<typeof NavigationMenu$1.Link> {
    /** Whether this link represents the current page. */
    active?: boolean;
    className?: string;
}
interface NavigationMenuViewportProps extends ComponentPropsWithoutRef<typeof NavigationMenu$1.Viewport> {
    className?: string;
}
interface NavigationMenuIndicatorProps extends ComponentPropsWithoutRef<typeof NavigationMenu$1.Indicator> {
    className?: string;
}
/** Props for a nav link item with icon, title, and optional description. */
interface NavigationMenuCardLinkProps {
    /** Icon rendered at the left of the card. */
    icon?: ReactNode;
    /** Title of the card link. */
    title: string;
    /** Optional short description beneath the title. */
    description?: string;
    /** The href for the link. */
    href: string;
    /** Whether this link is the current page. */
    active?: boolean;
    className?: string;
}
/**
 * NavigationMenu — the root container for the navigation menu.
 *
 * @example
 * ```tsx
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>Products</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <ul className="grid grid-cols-2 gap-2 p-4 w-[400px]">
 *           <NavigationMenuCardLink
 *             href="/docs"
 *             title="Documentation"
 *             description="Explore the full API reference."
 *           />
 *         </ul>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *     <NavigationMenuItem>
 *       <NavigationMenuLink href="/pricing">Pricing</NavigationMenuLink>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```
 */
declare const NavigationMenu: react.ForwardRefExoticComponent<NavigationMenuProps & react.RefAttributes<HTMLElement>>;
/**
 * NavigationMenuList — the ordered list of top-level nav items.
 */
declare const NavigationMenuList: react.ForwardRefExoticComponent<NavigationMenuListProps & react.RefAttributes<HTMLUListElement>>;
/**
 * NavigationMenuItem — a single item in the navigation menu list.
 */
declare const NavigationMenuItem: react.ForwardRefExoticComponent<NavigationMenuItemProps & react.RefAttributes<HTMLLIElement>>;
/**
 * NavigationMenuTrigger — the button that opens the dropdown content.
 * Renders with an animated chevron indicator.
 */
declare const NavigationMenuTrigger: react.ForwardRefExoticComponent<NavigationMenuTriggerProps & react.RefAttributes<HTMLButtonElement>>;
/**
 * NavigationMenuContent — the dropdown panel that appears below the trigger.
 */
declare const NavigationMenuContent: react.ForwardRefExoticComponent<NavigationMenuContentProps & react.RefAttributes<HTMLDivElement>>;
/**
 * NavigationMenuLink — a plain navigation link without a dropdown.
 * Use as a direct child of NavigationMenuItem for top-level links.
 */
declare const NavigationMenuLink: react.ForwardRefExoticComponent<NavigationMenuLinkProps & react.RefAttributes<HTMLAnchorElement>>;
/**
 * NavigationMenuViewport — the animated container that houses content panels.
 * Automatically added by NavigationMenu root; do not add manually.
 */
declare const NavigationMenuViewport: react.ForwardRefExoticComponent<NavigationMenuViewportProps & react.RefAttributes<HTMLDivElement>>;
/**
 * NavigationMenuIndicator — an optional arrow indicator under the active trigger.
 */
declare const NavigationMenuIndicator: react.ForwardRefExoticComponent<NavigationMenuIndicatorProps & react.RefAttributes<HTMLDivElement>>;
/**
 * NavigationMenuCardLink — a card-style link item for use inside NavigationMenuContent.
 * Renders an icon, title, and optional description in a compact layout.
 *
 * @example
 * ```tsx
 * <NavigationMenuCardLink
 *   href="/docs"
 *   icon={<BookOpen className="size-5" />}
 *   title="Documentation"
 *   description="Browse the full component API reference."
 * />
 * ```
 */
declare function NavigationMenuCardLink({ icon, title, description, href, active, className, }: NavigationMenuCardLinkProps): react_jsx_runtime.JSX.Element;
declare namespace NavigationMenuCardLink {
    var displayName: string;
}

declare const numberInputVariants: (props?: ({
    variant?: "default" | "primary" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type NumberInputVariant = "default" | "primary";
type NumberInputSize = "sm" | "md" | "lg";
interface NumberInputProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    /**
     * The current value (controlled).
     */
    value?: number;
    /**
     * The initial value (uncontrolled).
     * @default 0
     */
    defaultValue?: number;
    /**
     * Callback when the value changes.
     */
    onChange?: (value: number) => void;
    /**
     * Minimum allowed value.
     */
    min?: number;
    /**
     * Maximum allowed value.
     */
    max?: number;
    /**
     * Step increment/decrement amount.
     * @default 1
     */
    step?: number;
    /**
     * Number of decimal places to display/allow.
     * @default 0
     */
    precision?: number;
    /**
     * Visual variant.
     * @default "default"
     */
    variant?: NumberInputVariant;
    /**
     * Size variant.
     * @default "md"
     */
    size?: NumberInputSize;
    /**
     * Whether the input is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the input is read-only.
     * @default false
     */
    readOnly?: boolean;
    /**
     * Accessible label for the input (required for icon-only usage).
     */
    "aria-label"?: string;
    /**
     * Custom format function for the displayed value.
     */
    formatValue?: (value: number) => string;
    /**
     * Custom parse function for converting input string to number.
     */
    parseValue?: (raw: string) => number;
    /**
     * Accessible label for the increment button.
     * @default "Increment"
     */
    incrementLabel?: string;
    /**
     * Accessible label for the decrement button.
     * @default "Decrement"
     */
    decrementLabel?: string;
    /** Additional CSS classes on the container. */
    className?: string;
}
/**
 * NumberInput — a stepper input for numeric values.
 *
 * @example
 * // Basic
 * <NumberInput defaultValue={0} min={0} max={100} />
 *
 * // Controlled
 * <NumberInput value={qty} onChange={setQty} step={5} min={0} max={50} />
 *
 * // Currency
 * <NumberInput
 *   defaultValue={9.99}
 *   precision={2}
 *   step={0.01}
 *   formatValue={(v) => `$${v.toFixed(2)}`}
 * />
 *
 * // Small / read-only
 * <NumberInput size="sm" readOnly value={42} />
 */
declare const NumberInput: react.ForwardRefExoticComponent<NumberInputProps & react.RefAttributes<HTMLDivElement>>;

type PaginationSize = "sm" | "md";
type PaginationVariant = "default" | "compact";
declare const paginationButtonVariants: (props?: ({
    size?: "sm" | "md" | null | undefined;
    active?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
    /**
     * Total number of pages.
     */
    totalPages: number;
    /**
     * Current page (1-indexed). When provided, the component is controlled.
     * When omitted, the component manages its own state starting at page 1.
     */
    page?: number;
    /**
     * Default page for uncontrolled mode (1-indexed).
     * Only used when `page` is not provided.
     * @default 1
     */
    defaultPage?: number;
    /**
     * Callback fired when the page changes.
     */
    onPageChange?: (page: number) => void;
    /**
     * Display variant.
     * - `"default"` — full page numbers with ellipsis
     * - `"compact"` — "Page X of Y" with prev/next only
     * @default "default"
     */
    variant?: PaginationVariant;
    /**
     * Size of the pagination buttons.
     * @default "md"
     */
    size?: PaginationSize;
    /**
     * Number of sibling pages to show on each side of the current page.
     * @default 1
     */
    siblings?: number;
    /**
     * Number of boundary pages to always show at the start and end.
     * @default 1
     */
    boundary?: number;
    /**
     * Whether to show previous/next buttons.
     * @default true
     */
    showPrevNext?: boolean;
    /**
     * Label for the previous button.
     * @default "Previous"
     */
    prevLabel?: string;
    /**
     * Label for the next button.
     * @default "Next"
     */
    nextLabel?: string;
    /**
     * Accessible label for the nav element.
     * @default "Pagination"
     */
    "aria-label"?: string;
    /** Additional CSS classes for the root nav element. */
    className?: string;
}
/**
 * Pagination — a page navigation component for paged data sets.
 *
 * Renders page number buttons with smart ellipsis truncation, or a compact
 * "Page X of Y" indicator. Supports controlled and uncontrolled modes.
 *
 * Accessibility:
 *   - Wrapped in `<nav>` landmark with `aria-label`
 *   - Current page indicated with `aria-current="page"`
 *   - Prev/next buttons disabled at boundaries
 *   - Focus ring on all interactive elements
 *   - Keyboard navigable (Tab + Enter/Space)
 *
 * @example
 * ```tsx
 * // Full page numbers
 * <Pagination
 *   page={currentPage}
 *   totalPages={20}
 *   onPageChange={setCurrentPage}
 * />
 *
 * // Compact variant
 * <Pagination
 *   page={3}
 *   totalPages={10}
 *   variant="compact"
 *   onPageChange={setPage}
 * />
 *
 * // Uncontrolled with small size
 * <Pagination totalPages={50} size="sm" />
 *
 * // No prev/next buttons, more siblings
 * <Pagination
 *   totalPages={100}
 *   siblings={2}
 *   boundary={2}
 *   showPrevNext={false}
 * />
 * ```
 */
declare const Pagination: react.ForwardRefExoticComponent<PaginationProps & react.RefAttributes<HTMLElement>>;

declare const pinCellVariants: (props?: ({
    variant?: "default" | "primary" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    state?: "success" | "error" | "filled" | "active" | "empty" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type PinInputVariant = "default" | "primary";
type PinInputSize = "sm" | "md" | "lg";
type PinInputType = "numeric" | "alphanumeric" | "alphabetic";
interface PinInputProps {
    /**
     * Number of input cells.
     * @default 6
     */
    length?: number;
    /**
     * The current value (controlled). Array of single characters.
     */
    value?: string[];
    /**
     * The initial value (uncontrolled).
     */
    defaultValue?: string[];
    /**
     * Called when any cell changes. Receives the full array of cell values.
     */
    onChange?: (value: string[]) => void;
    /**
     * Called when all cells are filled. Receives the joined PIN string.
     */
    onComplete?: (pin: string) => void;
    /**
     * Called when the user clears all cells (backspace on first cell).
     */
    onClear?: () => void;
    /**
     * Input type / allowed characters.
     * - "numeric"       — digits only (0–9)
     * - "alphanumeric"  — letters and digits
     * - "alphabetic"    — letters only
     * @default "numeric"
     */
    type?: PinInputType;
    /**
     * Visual variant.
     * @default "default"
     */
    variant?: PinInputVariant;
    /**
     * Size variant.
     * @default "md"
     */
    size?: PinInputSize;
    /**
     * Whether to mask input (show • instead of character).
     * @default false
     */
    mask?: boolean;
    /**
     * Whether the input is in an error state (triggers shakeX animation).
     * @default false
     */
    error?: boolean;
    /**
     * Whether the input is in a success state.
     * @default false
     */
    success?: boolean;
    /**
     * Whether the input is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Accessible label for the PIN input group.
     * @default "PIN Input"
     */
    "aria-label"?: string;
    /**
     * Whether to automatically focus the first cell on mount.
     * @default false
     */
    autoFocus?: boolean;
    /**
     * Gap between cells.
     * @default "gap-2"
     */
    gap?: string;
    /** Additional CSS classes on the container. */
    className?: string;
}
/**
 * PinInput — OTP / verification code input with auto-advance.
 *
 * @example
 * // Basic 6-digit OTP
 * <PinInput length={6} onComplete={(pin) => verifyOTP(pin)} />
 *
 * // 4-digit masked PIN
 * <PinInput length={4} mask onComplete={handlePin} />
 *
 * // With error state (triggers shake animation)
 * <PinInput length={6} error value={cells} onChange={setCells} />
 *
 * // Alphanumeric (e.g. invite code)
 * <PinInput length={8} type="alphanumeric" variant="primary" size="lg" />
 */
declare const PinInput: react.ForwardRefExoticComponent<PinInputProps & react.RefAttributes<HTMLDivElement>>;

interface PopoverProps extends Popover$1.PopoverProps {
    /** The popover children (trigger + content). */
    children: ReactNode;
}
interface PopoverTriggerProps extends ComponentPropsWithoutRef<typeof Popover$1.Trigger> {
    /** Additional CSS classes. */
    className?: string;
}
interface PopoverContentProps extends ComponentPropsWithoutRef<typeof Popover$1.Content> {
    /** Additional CSS classes for the content element. */
    className?: string;
    /**
     * Whether to show a close button in the top-right corner.
     * @default false
     */
    showClose?: boolean;
    /**
     * Whether to render an arrow pointing to the trigger.
     * @default false
     */
    arrow?: boolean;
    /**
     * Additional CSS classes for the arrow element.
     */
    arrowClassName?: string;
    /** The popover body content. */
    children: ReactNode;
}
interface PopoverCloseProps extends ComponentPropsWithoutRef<typeof Popover$1.Close> {
    /** Additional CSS classes. */
    className?: string;
}
interface PopoverArrowProps extends ComponentPropsWithoutRef<typeof Popover$1.Arrow> {
    /** Additional CSS classes. */
    className?: string;
}
/**
 * Popover — root component that manages open/closed state.
 *
 * This is a thin wrapper around Radix UI's Popover.Root.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>Open</PopoverTrigger>
 *   <PopoverContent>Content here</PopoverContent>
 * </Popover>
 * ```
 */
declare function Popover({ children, ...rest }: PopoverProps): react_jsx_runtime.JSX.Element;
declare namespace Popover {
    var displayName: string;
}
/**
 * PopoverTrigger — the element that toggles the popover.
 *
 * Use `asChild` to compose with your own button/element.
 *
 * @example
 * ```tsx
 * <PopoverTrigger asChild>
 *   <Button variant="secondary">Open Popover</Button>
 * </PopoverTrigger>
 * ```
 */
declare const PopoverTrigger: react.ForwardRefExoticComponent<PopoverTriggerProps & react.RefAttributes<HTMLButtonElement>>;
/**
 * PopoverContent — the floating content panel of the popover.
 *
 * Built on Radix UI Popover.Content with the design system's token layer.
 * All colors, radii, spacing, shadows, and z-index come from CSS custom
 * properties defined in design-system.css.
 *
 * Accessibility:
 *   - Radix manages focus trap and restoration
 *   - Escape key closes the popover
 *   - Outside click dismisses (configurable via Radix props)
 *   - Proper ARIA attributes applied by Radix
 *
 * @example
 * ```tsx
 * // Basic content
 * <PopoverContent>
 *   <p>Hello world</p>
 * </PopoverContent>
 *
 * // With close button and arrow
 * <PopoverContent showClose arrow side="top" align="center">
 *   <h3>Settings</h3>
 *   <p>Adjust your preferences here.</p>
 * </PopoverContent>
 *
 * // Custom side and alignment
 * <PopoverContent side="right" align="start" sideOffset={8}>
 *   <p>Right-aligned popover</p>
 * </PopoverContent>
 * ```
 */
declare const PopoverContent: react.ForwardRefExoticComponent<PopoverContentProps & react.RefAttributes<HTMLDivElement>>;
declare const PopoverClose: react.ForwardRefExoticComponent<PopoverCloseProps & react.RefAttributes<HTMLButtonElement>>;
declare const PopoverArrow: react.ForwardRefExoticComponent<PopoverArrowProps & react.RefAttributes<SVGSVGElement>>;

declare const progressTrackVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const progressIndicatorVariants: (props?: ({
    variant?: "info" | "success" | "warning" | "danger" | "default" | "primary" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ProgressVariant = "default" | "primary" | "success" | "danger" | "warning" | "info";
type ProgressSize = "sm" | "md" | "lg";
interface ProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">, VariantProps<typeof progressTrackVariants>, VariantProps<typeof progressIndicatorVariants> {
    /**
     * Current progress value (0–100).
     * Ignored when `indeterminate` is true.
     * @default 0
     */
    value?: number;
    /**
     * Maximum progress value.
     * @default 100
     */
    max?: number;
    /**
     * Minimum progress value.
     * @default 0
     */
    min?: number;
    /**
     * Visual variant of the progress indicator.
     * @default "default"
     */
    variant?: ProgressVariant;
    /**
     * Size of the progress bar.
     * @default "md"
     */
    size?: ProgressSize;
    /**
     * Whether the progress is indeterminate (unknown completion).
     * When true, the bar displays a looping sliding animation
     * and `value` is ignored.
     * @default false
     */
    indeterminate?: boolean;
    /**
     * Whether to display diagonal stripes on the indicator.
     * @default false
     */
    striped?: boolean;
    /**
     * Whether the stripes should animate (slide).
     * Only applies when `striped` is true.
     * @default false
     */
    animated?: boolean;
    /**
     * Whether to display the progress label.
     * Shows the percentage value or custom label above the bar.
     * @default false
     */
    showLabel?: boolean;
    /**
     * Custom label text displayed above or inside the bar.
     * When provided alongside `showLabel`, replaces the default "X%" text.
     */
    label?: ReactNode;
    /**
     * Custom format function for the value label.
     * Receives the current value and max, returns a string.
     * @default (value, max) => `${Math.round((value / max) * 100)}%`
     */
    formatLabel?: (value: number, max: number) => string;
    /**
     * Accessible label for the progress bar.
     * Use when there's no visible label to describe what's loading.
     */
    "aria-label"?: string;
    /**
     * ID of the element that labels the progress bar.
     */
    "aria-labelledby"?: string;
    /** Additional CSS classes for the track (outer container). */
    className?: string;
    /** Additional CSS classes for the indicator (inner fill). */
    indicatorClassName?: string;
}
/**
 * Progress — a linear progress bar for displaying completion or loading state.
 *
 * Built on the design system's token layer with CVA for variant composition.
 * All colors, radii, spacing, and transitions come from CSS custom properties
 * defined in design-system.css.
 *
 * Supports both determinate (with a known value) and indeterminate (unknown
 * completion) modes. Add stripes and animation for visual emphasis.
 *
 * Accessibility:
 *   - Uses `role="progressbar"` with proper ARIA attributes
 *   - `aria-valuenow`, `aria-valuemin`, `aria-valuemax` for determinate mode
 *   - `aria-valuenow` is omitted for indeterminate mode (per WAI-ARIA spec)
 *   - Supports `aria-label` and `aria-labelledby` for screen readers
 *
 * @example
 * ```tsx
 * // Basic determinate progress
 * <Progress value={60} />
 *
 * // With variant and label
 * <Progress value={80} variant="success" showLabel />
 *
 * // Indeterminate (loading)
 * <Progress indeterminate />
 *
 * // Striped with animation
 * <Progress value={45} striped animated />
 *
 * // Large with custom label
 * <Progress value={30} size="lg" showLabel label="Uploading files..." />
 *
 * // Custom format
 * <Progress
 *   value={750}
 *   max={1000}
 *   showLabel
 *   formatLabel={(v, m) => `${v}/${m} MB`}
 * />
 *
 * // Danger variant (e.g. storage warning)
 * <Progress value={92} variant="danger" showLabel />
 * ```
 */
declare const Progress: react.ForwardRefExoticComponent<ProgressProps & react.RefAttributes<HTMLDivElement>>;

declare const radioGroupVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const radioIndicatorVariants: (props?: ({
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const radioCardVariants: (props?: ({
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type RadioSize = "sm" | "md";
type RadioOrientation = "vertical" | "horizontal";
interface RadioGroupProps extends Omit<RadioGroup$1.RadioGroupProps, "orientation" | "asChild">, VariantProps<typeof radioGroupVariants> {
    /**
     * Layout direction of the radio group.
     * @default "vertical"
     */
    orientation?: RadioOrientation;
    /**
     * Size of all radio items in the group.
     * @default "md"
     */
    size?: RadioSize;
    /** Additional CSS classes to merge on the root element. */
    className?: string;
    /** The radio group items. */
    children?: ReactNode;
}
interface RadioGroupItemProps extends Omit<RadioGroup$1.RadioGroupItemProps, "asChild"> {
    /**
     * The value of this radio item.
     */
    value: string;
    /**
     * Label text displayed next to the radio indicator.
     */
    label?: ReactNode;
    /**
     * Optional description displayed below the label.
     */
    description?: ReactNode;
    /**
     * Override the group-level size for this specific item.
     */
    size?: RadioSize;
    /** Additional CSS classes to merge on the wrapper element. */
    className?: string;
}
interface RadioCardProps extends Omit<RadioGroup$1.RadioGroupItemProps, "asChild"> {
    /**
     * The value of this radio card.
     */
    value: string;
    /**
     * Label text for the card.
     */
    label?: ReactNode;
    /**
     * Description text displayed below the label.
     */
    description?: ReactNode;
    /**
     * Override the group-level size for this specific card.
     */
    size?: RadioSize;
    /** Additional CSS classes to merge on the card wrapper. */
    className?: string;
    /** Additional content to render inside the card. */
    children?: ReactNode;
}
/**
 * RadioGroup — a group of radio buttons for selecting a single value.
 *
 * Built on Radix UI's RadioGroup primitive for full keyboard navigation
 * and ARIA compliance. All colors, radii, and transitions come from CSS
 * custom properties defined in design-system.css.
 *
 * Accessibility:
 *   - Radix UI provides `role="radiogroup"` and manages `aria-checked`
 *   - Arrow key navigation between items
 *   - Supports `aria-label` and `aria-labelledby`
 *   - Disabled state propagated to all children
 *
 * @example
 * ```tsx
 * <RadioGroup value={value} onValueChange={setValue}>
 *   <RadioGroupItem value="option-1" label="Option 1" />
 *   <RadioGroupItem value="option-2" label="Option 2" />
 *   <RadioGroupItem value="option-3" label="Option 3" disabled />
 * </RadioGroup>
 *
 * // Horizontal layout
 * <RadioGroup orientation="horizontal" size="sm">
 *   <RadioGroupItem value="a" label="A" />
 *   <RadioGroupItem value="b" label="B" />
 * </RadioGroup>
 * ```
 */
declare const RadioGroup: react.ForwardRefExoticComponent<RadioGroupProps & react.RefAttributes<HTMLDivElement>>;
/**
 * RadioGroupItem — a single radio button with optional label and description.
 *
 * Must be used as a child of `RadioGroup`.
 *
 * @example
 * ```tsx
 * <RadioGroupItem value="newsletter" label="Subscribe to newsletter" />
 * <RadioGroupItem
 *   value="updates"
 *   label="Product updates"
 *   description="Get notified about new features and improvements"
 * />
 * ```
 */
declare const RadioGroupItem: react.ForwardRefExoticComponent<RadioGroupItemProps & react.RefAttributes<HTMLButtonElement>>;
/**
 * RadioCard — a card-style radio button where the entire card is clickable.
 *
 * Must be used as a child of `RadioGroup`. Provides a richer visual
 * treatment for radio options, useful for plan selectors, theme pickers, etc.
 *
 * @example
 * ```tsx
 * <RadioGroup value={plan} onValueChange={setPlan}>
 *   <RadioCard
 *     value="free"
 *     label="Free Plan"
 *     description="Basic features, limited storage"
 *   />
 *   <RadioCard
 *     value="pro"
 *     label="Pro Plan"
 *     description="All features, unlimited storage"
 *   />
 * </RadioGroup>
 * ```
 */
declare const RadioCard: react.ForwardRefExoticComponent<RadioCardProps & react.RefAttributes<HTMLButtonElement>>;

interface ResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: "horizontal" | "vertical";
    defaultSizes?: number[];
    className?: string;
    children?: ReactNode;
}
interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
    minSize?: number;
    maxSize?: number;
    defaultSize?: number;
    className?: string;
    children?: ReactNode;
}
interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
    withHandle?: boolean;
    className?: string;
}
declare const ResizablePanelGroup: react.ForwardRefExoticComponent<ResizablePanelGroupProps & react.RefAttributes<HTMLDivElement>>;
declare const ResizablePanel: react.ForwardRefExoticComponent<ResizablePanelProps & react.RefAttributes<HTMLDivElement>>;
declare const ResizableHandle: react.ForwardRefExoticComponent<ResizableHandleProps & react.RefAttributes<HTMLDivElement>>;

declare const scrollbarThumbVariants: (props?: ({
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const scrollbarVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ScrollAreaType = "auto" | "always" | "scroll" | "hover";
type ScrollBarSize = "sm" | "md";
type ScrollBarOrientation = "vertical" | "horizontal";
interface ScrollAreaProps extends Omit<ComponentPropsWithoutRef<typeof ScrollArea$1.Root>, "type"> {
    /**
     * The scrollbar visibility behavior.
     * - `"auto"` — scrollbars visible when content overflows
     * - `"always"` — scrollbars always visible
     * - `"scroll"` — scrollbars visible during scrolling only
     * - `"hover"` — scrollbars visible on hover only
     * @default "hover"
     */
    type?: ScrollAreaType;
    /**
     * Size of the scrollbar track.
     * @default "md"
     */
    scrollbarSize?: ScrollBarSize;
    /**
     * Whether to show the vertical scrollbar.
     * @default true
     */
    showVertical?: boolean;
    /**
     * Whether to show the horizontal scrollbar.
     * @default false
     */
    showHorizontal?: boolean;
    /**
     * Additional CSS classes for the viewport element.
     */
    viewportClassName?: string;
    /** Additional CSS classes to merge on the root element. */
    className?: string;
    /** Content to render inside the scrollable area. */
    children?: ReactNode;
}
interface ScrollBarProps extends ComponentPropsWithoutRef<typeof ScrollArea$1.Scrollbar> {
    /**
     * Orientation of the scrollbar.
     * @default "vertical"
     */
    orientation?: ScrollBarOrientation;
    /**
     * Size of the scrollbar.
     * @default "md"
     */
    size?: ScrollBarSize;
    /** Additional CSS classes to merge. */
    className?: string;
}
/**
 * ScrollBar — a styled scrollbar track and thumb.
 *
 * Used internally by ScrollArea but can also be used standalone when
 * composing custom scroll area layouts.
 *
 * @example
 * ```tsx
 * <ScrollArea.Root>
 *   <ScrollArea.Viewport>{content}</ScrollArea.Viewport>
 *   <ScrollBar orientation="vertical" size="sm" />
 *   <ScrollBar orientation="horizontal" size="sm" />
 * </ScrollArea.Root>
 * ```
 */
declare const ScrollBar: react.ForwardRefExoticComponent<ScrollBarProps & react.RefAttributes<HTMLDivElement>>;
/**
 * ScrollArea — a custom scrollbar container for consistent cross-browser
 * scroll appearance.
 *
 * Built on Radix UI's ScrollArea primitive. Replaces native browser
 * scrollbars with styled, consistent scrollbar tracks and thumbs that
 * match the design system's visual language.
 *
 * Accessibility:
 *   - Keyboard scrolling works natively (not intercepted)
 *   - Custom scrollbars are decorative — assistive technology uses the
 *     native scrollable region
 *   - Focus management and tab order are preserved
 *   - Scroll position is announced by screen readers naturally
 *
 * @example
 * ```tsx
 * // Basic vertical scroll
 * <ScrollArea className="h-72 w-full rounded-md border">
 *   <div className="p-4">
 *     {longContent}
 *   </div>
 * </ScrollArea>
 *
 * // Horizontal scroll
 * <ScrollArea className="w-96" showHorizontal showVertical={false}>
 *   <div className="flex gap-4 p-4 w-max">
 *     {horizontalItems}
 *   </div>
 * </ScrollArea>
 *
 * // Both scrollbars with small size
 * <ScrollArea className="h-64 w-64" showHorizontal scrollbarSize="sm">
 *   <div className="w-[800px] h-[800px]">
 *     {largeContent}
 *   </div>
 * </ScrollArea>
 *
 * // Always visible scrollbars
 * <ScrollArea className="h-48" type="always">
 *   {content}
 * </ScrollArea>
 *
 * // Scroll on hover only
 * <ScrollArea className="h-48" type="hover">
 *   {content}
 * </ScrollArea>
 * ```
 */
declare const ScrollArea: react.ForwardRefExoticComponent<ScrollAreaProps & react.RefAttributes<HTMLDivElement>>;

declare const searchInputVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    variant?: "default" | "filled" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SearchInputSize = "sm" | "md" | "lg";
type SearchInputVariant = "default" | "filled";
interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    onDebouncedChange?: (value: string) => void;
    debounce?: number;
    size?: SearchInputSize;
    variant?: SearchInputVariant;
    shortcut?: string;
    showClear?: boolean;
    loading?: boolean;
    className?: string;
}
declare const SearchInput: react.ForwardRefExoticComponent<SearchInputProps & react.RefAttributes<HTMLInputElement>>;

declare const selectTriggerVariants: (props?: ({
    variant?: "success" | "error" | "default" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SelectVariant = "default" | "error" | "success";
type SelectSize = "sm" | "md" | "lg";
interface SelectItemProps extends ComponentPropsWithoutRef<typeof Select$1.Item> {
    className?: string;
    children: ReactNode;
}
interface SelectGroupProps extends ComponentPropsWithoutRef<typeof Select$1.Group> {
    className?: string;
    children: ReactNode;
}
interface SelectLabelProps extends ComponentPropsWithoutRef<typeof Select$1.Label> {
    className?: string;
    children: ReactNode;
}
interface SelectSeparatorProps extends ComponentPropsWithoutRef<typeof Select$1.Separator> {
    className?: string;
}
declare const Select: react.FC<Select$1.SelectProps>;
interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof Select$1.Trigger> {
    variant?: SelectVariant;
    size?: SelectSize;
}
declare const SelectTrigger: react.ForwardRefExoticComponent<SelectTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const SelectValue: react.ForwardRefExoticComponent<Select$1.SelectValueProps & react.RefAttributes<HTMLSpanElement>>;
type SelectContentProps = React.ComponentPropsWithoutRef<typeof Select$1.Content>;
declare const SelectContent: react.ForwardRefExoticComponent<Omit<Select$1.SelectContentProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
type SelectScrollUpButtonProps = React.ComponentPropsWithoutRef<typeof Select$1.ScrollUpButton>;
declare const SelectScrollUpButton: react.ForwardRefExoticComponent<Omit<Select$1.SelectScrollUpButtonProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
type SelectScrollDownButtonProps = React.ComponentPropsWithoutRef<typeof Select$1.ScrollDownButton>;
declare const SelectScrollDownButton: react.ForwardRefExoticComponent<Omit<Select$1.SelectScrollDownButtonProps & react.RefAttributes<HTMLDivElement>, "ref"> & react.RefAttributes<HTMLDivElement>>;
declare const SelectItem: react.ForwardRefExoticComponent<SelectItemProps & react.RefAttributes<HTMLDivElement>>;
declare const SelectGroup: react.ForwardRefExoticComponent<SelectGroupProps & react.RefAttributes<HTMLDivElement>>;
declare const SelectLabel: react.ForwardRefExoticComponent<SelectLabelProps & react.RefAttributes<HTMLDivElement>>;
declare const SelectSeparator: react.ForwardRefExoticComponent<SelectSeparatorProps & react.RefAttributes<HTMLDivElement>>;

declare const sheetContentVariants: (props?: ({
    side?: "bottom" | "left" | "right" | "top" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SheetSide = "left" | "right" | "top" | "bottom";
type SheetSize = "sm" | "md" | "lg";
interface SheetProps extends Dialog$1.DialogProps {
    /** Sheet children (trigger + content). */
    children: ReactNode;
}
interface SheetTriggerProps extends ComponentPropsWithoutRef<typeof Dialog$1.Trigger> {
    /** Additional CSS classes. */
    className?: string;
}
interface SheetContentProps extends Omit<ComponentPropsWithoutRef<typeof Dialog$1.Content>, "asChild">, VariantProps<typeof sheetContentVariants> {
    /**
     * The side the sheet slides in from.
     * @default "right"
     */
    side?: SheetSide;
    /**
     * The width/height of the sheet panel.
     * @default "md"
     */
    size?: SheetSize;
    /**
     * Whether to show the default close button (X) in the top-right.
     * @default true
     */
    showClose?: boolean;
    /**
     * Additional CSS classes for the overlay backdrop.
     */
    overlayClassName?: string;
    /** Additional CSS classes for the content panel. */
    className?: string;
    /** The sheet body content. */
    children: ReactNode;
}
interface SheetHeaderProps {
    /** Additional CSS classes. */
    className?: string;
    children: ReactNode;
}
interface SheetFooterProps {
    /** Additional CSS classes. */
    className?: string;
    children: ReactNode;
}
interface SheetTitleProps extends ComponentPropsWithoutRef<typeof Dialog$1.Title> {
    /** Additional CSS classes. */
    className?: string;
    children: ReactNode;
}
interface SheetDescriptionProps extends ComponentPropsWithoutRef<typeof Dialog$1.Description> {
    /** Additional CSS classes. */
    className?: string;
    children: ReactNode;
}
interface SheetCloseProps extends ComponentPropsWithoutRef<typeof Dialog$1.Close> {
    /** Additional CSS classes. */
    className?: string;
}
/**
 * Sheet — a slide-in panel overlaying the main content.
 *
 * This is a thin wrapper around Radix UI's Dialog.Root.
 *
 * @example
 * ```tsx
 * <Sheet>
 *   <SheetTrigger asChild>
 *     <Button>Open</Button>
 *   </SheetTrigger>
 *   <SheetContent>Panel content</SheetContent>
 * </Sheet>
 * ```
 */
declare function Sheet({ children, ...rest }: SheetProps): react_jsx_runtime.JSX.Element;
declare namespace Sheet {
    var displayName: string;
}
/**
 * SheetTrigger — the element that opens the sheet.
 *
 * Use `asChild` to compose with your own button/element.
 *
 * @example
 * ```tsx
 * <SheetTrigger asChild>
 *   <Button variant="secondary">Open Panel</Button>
 * </SheetTrigger>
 * ```
 */
declare const SheetTrigger: react.ForwardRefExoticComponent<SheetTriggerProps & react.RefAttributes<HTMLButtonElement>>;
/**
 * SheetContent — the sliding panel that appears over the page.
 *
 * Built on Radix UI Dialog.Content with the design system's token layer.
 * All colors, radii, spacing, shadows, and z-index come from CSS custom
 * properties defined in design-system.css.
 *
 * Accessibility:
 *   - Radix manages focus trap and restoration
 *   - Escape key closes the sheet
 *   - Overlay click closes the sheet
 *   - Proper ARIA attributes (dialog role)
 *   - Scroll lock on body while open
 *
 * @example
 * ```tsx
 * // Right-side sheet (default)
 * <SheetContent>
 *   <SheetHeader>
 *     <SheetTitle>Settings</SheetTitle>
 *     <SheetDescription>Manage your preferences.</SheetDescription>
 *   </SheetHeader>
 *   <div className="flex-1 overflow-y-auto py-4">
 *     Content here
 *   </div>
 *   <SheetFooter>
 *     <Button>Save Changes</Button>
 *   </SheetFooter>
 * </SheetContent>
 *
 * // Left-side navigation
 * <SheetContent side="left" size="sm">
 *   <nav>Navigation items</nav>
 * </SheetContent>
 *
 * // Bottom drawer
 * <SheetContent side="bottom" size="sm">
 *   <p>Bottom sheet content</p>
 * </SheetContent>
 * ```
 */
declare const SheetContent: react.ForwardRefExoticComponent<SheetContentProps & react.RefAttributes<HTMLDivElement>>;
/**
 * SheetHeader — layout component for the sheet title and description.
 *
 * @example
 * ```tsx
 * <SheetHeader>
 *   <SheetTitle>Edit Profile</SheetTitle>
 *   <SheetDescription>Make changes to your profile.</SheetDescription>
 * </SheetHeader>
 * ```
 */
declare function SheetHeader({ className, children }: SheetHeaderProps): react_jsx_runtime.JSX.Element;
declare namespace SheetHeader {
    var displayName: string;
}
/**
 * SheetFooter — layout component for the sheet action buttons.
 *
 * @example
 * ```tsx
 * <SheetFooter>
 *   <SheetClose asChild>
 *     <Button variant="secondary">Cancel</Button>
 *   </SheetClose>
 *   <Button>Save</Button>
 * </SheetFooter>
 * ```
 */
declare function SheetFooter({ className, children }: SheetFooterProps): react_jsx_runtime.JSX.Element;
declare namespace SheetFooter {
    var displayName: string;
}
/**
 * SheetTitle — the title text of the sheet.
 *
 * Renders a Radix Dialog.Title for proper accessibility.
 *
 * @example
 * ```tsx
 * <SheetTitle>Edit Profile</SheetTitle>
 * ```
 */
declare const SheetTitle: react.ForwardRefExoticComponent<SheetTitleProps & react.RefAttributes<HTMLHeadingElement>>;
/**
 * SheetDescription — the description text below the sheet title.
 *
 * Renders a Radix Dialog.Description for proper accessibility.
 *
 * @example
 * ```tsx
 * <SheetDescription>
 *   Make changes to your profile here. Click save when you're done.
 * </SheetDescription>
 * ```
 */
declare const SheetDescription: react.ForwardRefExoticComponent<SheetDescriptionProps & react.RefAttributes<HTMLParagraphElement>>;
/**
 * SheetClose — a button that closes the sheet.
 *
 * Use `asChild` to compose with your own button component.
 *
 * @example
 * ```tsx
 * // As a standalone close button
 * <SheetClose>Close</SheetClose>
 *
 * // Composed with Button
 * <SheetClose asChild>
 *   <Button variant="secondary">Cancel</Button>
 * </SheetClose>
 * ```
 */
declare const SheetClose: react.ForwardRefExoticComponent<SheetCloseProps & react.RefAttributes<HTMLButtonElement>>;

interface SidebarContextValue {
    collapsed: boolean;
    setCollapsed: (v: boolean) => void;
    isMobile: boolean;
    mobileOpen: boolean;
    setMobileOpen: (v: boolean) => void;
}
declare function useSidebarContext(): SidebarContextValue;
interface SidebarProviderProps {
    defaultCollapsed?: boolean;
    collapsed?: boolean;
    onCollapsedChange?: (v: boolean) => void;
    children?: ReactNode;
}
interface SidebarProps {
    side?: "left" | "right";
    collapsedWidth?: string;
    expandedWidth?: string;
    className?: string;
    children?: ReactNode;
}
interface SidebarSectionProps {
    title?: string;
    className?: string;
    children?: ReactNode;
}
interface SidebarItemProps {
    icon?: ReactNode;
    label?: ReactNode;
    active?: boolean;
    disabled?: boolean;
    badge?: ReactNode;
    href?: string;
    className?: string;
    children?: ReactNode;
}
interface SidebarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children?: ReactNode;
}
declare function SidebarProvider({ defaultCollapsed, collapsed: controlledCollapsed, onCollapsedChange, children, }: SidebarProviderProps): react_jsx_runtime.JSX.Element;
declare namespace SidebarProvider {
    var displayName: string;
}
declare const Sidebar: react.ForwardRefExoticComponent<SidebarProps & react.RefAttributes<HTMLElement>>;
declare const SidebarToggle: react.ForwardRefExoticComponent<SidebarToggleProps & react.RefAttributes<HTMLButtonElement>>;
interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: ReactNode;
}
declare const SidebarHeader: react.ForwardRefExoticComponent<SidebarHeaderProps & react.RefAttributes<HTMLDivElement>>;
interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: ReactNode;
}
declare const SidebarContent: react.ForwardRefExoticComponent<SidebarContentProps & react.RefAttributes<HTMLDivElement>>;
interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: ReactNode;
}
declare const SidebarFooter: react.ForwardRefExoticComponent<SidebarFooterProps & react.RefAttributes<HTMLDivElement>>;
declare const SidebarSection: react.ForwardRefExoticComponent<SidebarSectionProps & react.RefAttributes<HTMLDivElement>>;
declare const SidebarItem: react.ForwardRefExoticComponent<SidebarItemProps & react.RefAttributes<HTMLButtonElement>>;
interface SidebarMobileOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}
declare function SidebarMobileOverlay({ className }: SidebarMobileOverlayProps): react_jsx_runtime.JSX.Element;
declare namespace SidebarMobileOverlay {
    var displayName: string;
}

declare const skeletonVariants: (props?: ({
    shape?: "circle" | "rect" | "text" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SkeletonSize = "xs" | "sm" | "md" | "lg" | "xl";
type SkeletonTextSize = "xs" | "sm" | "md" | "lg";
interface SkeletonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">, VariantProps<typeof skeletonVariants> {
    /**
     * Shape of the skeleton placeholder.
     * @default "text"
     */
    shape?: "text" | "circle" | "rect";
    /**
     * Width of the skeleton. Accepts CSS values (number → px, string → raw).
     * For `circle` shape, use `size` prop instead.
     * @default "100%" for text/rect shapes
     */
    width?: number | string;
    /**
     * Height of the skeleton. Accepts CSS values (number → px, string → raw).
     * For `circle` shape, use `size` prop instead.
     * For `text` shape, defaults to the text height based on `textSize`.
     */
    height?: number | string;
    /**
     * Predefined size for circle shapes. Maps to standard avatar sizes.
     * Only applies when `shape="circle"`.
     * @default "md"
     */
    size?: SkeletonSize;
    /**
     * Text height preset for text shapes. Matches typography size scale.
     * Only applies when `shape="text"`.
     * @default "md"
     */
    textSize?: SkeletonTextSize;
    /**
     * Whether the pulse animation is active.
     * Set to false to show a static skeleton (e.g., when paused).
     * @default true
     */
    animate?: boolean;
    /** Additional CSS classes to merge. */
    className?: string;
}
/**
 * Skeleton — a loading placeholder that mimics the shape of content.
 *
 * Built on the design system's token layer. Uses the muted background
 * color and a CSS `animate-pulse` animation to indicate loading state.
 * The animation is automatically disabled when the user prefers reduced
 * motion.
 *
 * Accessibility:
 *   - `aria-hidden="true"` — skeletons are decorative, not content
 *   - `role="presentation"` — excluded from accessibility tree
 *   - Reduced motion respected via global CSS in design-system.css
 *
 * @example
 * ```tsx
 * // Text line placeholder
 * <Skeleton shape="text" />
 * <Skeleton shape="text" width="60%" />
 * <Skeleton shape="text" textSize="lg" />
 *
 * // Circle placeholder (avatars)
 * <Skeleton shape="circle" size="md" />
 * <Skeleton shape="circle" size="lg" />
 *
 * // Rectangle placeholder (images, cards)
 * <Skeleton shape="rect" width={300} height={200} />
 * <Skeleton shape="rect" width="100%" height={160} />
 *
 * // Static (no animation)
 * <Skeleton shape="text" animate={false} />
 *
 * // Custom dimensions
 * <Skeleton shape="rect" width="100%" height="8rem" className="rounded-lg" />
 * ```
 */
declare const Skeleton: react.ForwardRefExoticComponent<SkeletonProps & react.RefAttributes<HTMLDivElement>>;
interface SkeletonTextProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /**
     * Number of text lines to render.
     * @default 3
     */
    lines?: number;
    /**
     * Text height preset for each line.
     * @default "md"
     */
    textSize?: SkeletonTextSize;
    /**
     * Width of the last line (as CSS value).
     * Creates a more natural appearance since real text rarely fills
     * the full width on the last line.
     * @default "60%"
     */
    lastLineWidth?: number | string;
    /**
     * Gap between lines.
     * @default "gap-2.5"
     */
    gap?: string;
    /**
     * Whether the pulse animation is active.
     * @default true
     */
    animate?: boolean;
    /** Additional CSS classes to merge on the wrapper. */
    className?: string;
}
/**
 * SkeletonText — renders multiple skeleton text lines.
 *
 * A convenience wrapper around `Skeleton` that renders multiple text-shaped
 * lines with automatic width variation on the last line.
 *
 * @example
 * ```tsx
 * // Default (3 lines)
 * <SkeletonText />
 *
 * // Custom line count
 * <SkeletonText lines={5} />
 *
 * // Custom last line width
 * <SkeletonText lines={4} lastLineWidth="40%" />
 *
 * // Larger text size
 * <SkeletonText textSize="lg" lines={2} />
 *
 * // With custom gap
 * <SkeletonText lines={3} gap="gap-3" />
 * ```
 */
declare const SkeletonText: react.ForwardRefExoticComponent<SkeletonTextProps & react.RefAttributes<HTMLDivElement>>;
interface SkeletonCircleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /**
     * Predefined size. Maps to standard avatar sizes.
     * @default "md"
     */
    size?: SkeletonSize;
    /**
     * Whether the pulse animation is active.
     * @default true
     */
    animate?: boolean;
    /** Additional CSS classes to merge. */
    className?: string;
}
/**
 * SkeletonCircle — a circle-shaped skeleton placeholder.
 *
 * Shorthand for `<Skeleton shape="circle" />` with a cleaner API.
 *
 * @example
 * ```tsx
 * <SkeletonCircle size="sm" />
 * <SkeletonCircle size="md" />
 * <SkeletonCircle size="lg" />
 * ```
 */
declare const SkeletonCircle: react.ForwardRefExoticComponent<SkeletonCircleProps & react.RefAttributes<HTMLDivElement>>;
interface SkeletonRectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /**
     * Width of the rectangle. Accepts CSS values.
     * @default "100%"
     */
    width?: number | string;
    /**
     * Height of the rectangle. Accepts CSS values.
     * @default 120
     */
    height?: number | string;
    /**
     * Whether the pulse animation is active.
     * @default true
     */
    animate?: boolean;
    /** Additional CSS classes to merge. */
    className?: string;
}
/**
 * SkeletonRect — a rectangle-shaped skeleton placeholder.
 *
 * Shorthand for `<Skeleton shape="rect" />` with sensible defaults.
 * Useful for image placeholders, card thumbnails, and media areas.
 *
 * @example
 * ```tsx
 * <SkeletonRect width={300} height={200} />
 * <SkeletonRect width="100%" height={160} />
 * <SkeletonRect height="12rem" />
 * ```
 */
declare const SkeletonRect: react.ForwardRefExoticComponent<SkeletonRectProps & react.RefAttributes<HTMLDivElement>>;

declare const sliderTrackVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const sliderRangeVariants: (props?: ({
    variant?: "success" | "danger" | "default" | "primary" | null | undefined;
    orientation?: "horizontal" | "vertical" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const sliderThumbVariants: (props?: ({
    variant?: "success" | "danger" | "default" | "primary" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SliderVariant = "default" | "primary" | "success" | "danger";
type SliderSize = "sm" | "md" | "lg";
type SliderOrientation = "horizontal" | "vertical";
interface SliderMark {
    value: number;
    label?: ReactNode;
}
interface SliderProps extends Omit<ComponentPropsWithoutRef<typeof Slider$1.Root>, "orientation"> {
    /**
     * Visual variant of the slider range and thumb.
     * @default "default"
     */
    variant?: SliderVariant;
    /**
     * Size of the slider track and thumb.
     * @default "md"
     */
    size?: SliderSize;
    /**
     * Orientation of the slider.
     * @default "horizontal"
     */
    orientation?: SliderOrientation;
    /**
     * Whether to show step marks along the track.
     * @default false
     */
    showMarks?: boolean;
    /**
     * Custom marks to render along the track.
     * When provided, overrides auto-generated step marks.
     */
    marks?: SliderMark[];
    /**
     * Whether to show a value tooltip above/beside the thumb on hover/drag.
     * @default false
     */
    showTooltip?: boolean;
    /**
     * Format the tooltip value for display.
     * @default (v) => String(v)
     */
    formatTooltip?: (value: number) => string;
    /** Additional CSS classes. */
    className?: string;
}
/**
 * Slider — a range input built on Radix UI's Slider primitive.
 *
 * @example
 * // Single thumb
 * <Slider defaultValue={[50]} />
 *
 * // Range (dual thumb)
 * <Slider defaultValue={[25, 75]} min={0} max={100} />
 *
 * // With marks and tooltip
 * <Slider defaultValue={[50]} step={10} showMarks showTooltip />
 *
 * // Danger variant
 * <Slider variant="danger" defaultValue={[80]} />
 */
declare const Slider: react.ForwardRefExoticComponent<SliderProps & react.RefAttributes<HTMLSpanElement>>;

declare const spinnerVariants: (props?: ({
    size?: "sm" | "md" | "xs" | "lg" | null | undefined;
    variant?: "default" | "primary" | "secondary" | "muted" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SpinnerSize = "xs" | "sm" | "md" | "lg";
type SpinnerVariant = "default" | "primary" | "secondary" | "muted";
interface SpinnerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">, VariantProps<typeof spinnerVariants> {
    /**
     * Size of the spinner.
     * @default "md"
     */
    size?: SpinnerSize;
    /**
     * Color variant of the spinner.
     * @default "default"
     */
    variant?: SpinnerVariant;
    /**
     * Optional label text displayed alongside the spinner.
     * Provides visible context for the loading state.
     */
    label?: ReactNode;
    /**
     * Position of the label relative to the spinner.
     * @default "right"
     */
    labelPosition?: "right" | "bottom";
    /**
     * Accessible label for screen readers.
     * If `label` is a string, it will be used as the default.
     * @default "Loading"
     */
    "aria-label"?: string;
    /**
     * Thickness of the spinner stroke.
     * @default "2"
     */
    strokeWidth?: number;
    /** Additional CSS classes to merge on the root element. */
    className?: string;
}
/**
 * Spinner — an animated loading indicator.
 *
 * Built on the design system's token layer with CVA for variant composition.
 * Uses Framer Motion for smooth, GPU-accelerated rotation with automatic
 * reduced-motion support (falls back to CSS `animate-spin`).
 *
 * The spinner renders as a circular arc (3/4 circle) that rotates
 * continuously. A faded track circle provides visual context for the
 * rotation path.
 *
 * Accessibility:
 *   - Uses `role="status"` for live region semantics
 *   - Includes screen-reader-only text via `aria-label`
 *   - SVG elements are decorative (`aria-hidden`)
 *   - Respects `prefers-reduced-motion` — uses CSS fallback
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Spinner />
 *
 * // Sizes
 * <Spinner size="xs" />
 * <Spinner size="sm" />
 * <Spinner size="md" />
 * <Spinner size="lg" />
 *
 * // Variants
 * <Spinner variant="primary" />
 * <Spinner variant="secondary" />
 * <Spinner variant="muted" />
 *
 * // With label (inline)
 * <Spinner label="Loading…" />
 *
 * // With label (stacked)
 * <Spinner label="Loading data…" labelPosition="bottom" />
 *
 * // Inside a button
 * <Button disabled>
 *   <Spinner size="xs" variant="default" />
 *   Saving…
 * </Button>
 *
 * // Custom aria-label
 * <Spinner aria-label="Fetching results" />
 *
 * // Custom stroke width
 * <Spinner size="lg" strokeWidth={3} />
 * ```
 */
declare const Spinner: react.ForwardRefExoticComponent<SpinnerProps & react.RefAttributes<HTMLDivElement>>;

declare const statVariants: (props?: class_variance_authority_types.ClassProp | undefined) => string;
type StatTrend = "up" | "down" | "neutral";
interface StatProps {
    label: ReactNode;
    value: string | number;
    previousValue?: number;
    trend?: StatTrend;
    trendLabel?: ReactNode;
    sparkline?: ReactNode;
    prefix?: string;
    suffix?: string;
    animated?: boolean;
    className?: string;
}
declare const Stat: react.ForwardRefExoticComponent<StatProps & react.RefAttributes<HTMLDivElement>>;

type StepsOrientation = "horizontal" | "vertical";
type StepsVariant = "default" | "outline" | "dots";
type StepStatus = "complete" | "active" | "upcoming";
interface StepsProps extends ComponentPropsWithoutRef<"ol"> {
    /** The index of the currently active step (0-based). */
    currentStep: number;
    /** Orientation of the steps. @default "horizontal" */
    orientation?: StepsOrientation;
    /** Visual variant. @default "default" */
    variant?: StepsVariant;
    /** Total number of steps — derived from children if not provided. */
    count?: number;
    /** Callback when a step is clicked (for clickable wizards). */
    onStepClick?: (index: number) => void;
    className?: string;
    children: ReactNode;
}
interface StepProps extends ComponentPropsWithoutRef<"li"> {
    /** Optional custom icon to override the default number/check. */
    icon?: ReactNode;
    /** Optional title for the step. */
    title?: string;
    /** Optional description beneath the title. */
    description?: string;
    className?: string;
    children?: ReactNode;
}
/**
 * Steps — a wizard progress indicator.
 *
 * Wrap `Step` components as children. The `currentStep` prop (0-based index)
 * drives the visual state of each step (complete, active, upcoming).
 *
 * @example
 * ```tsx
 * <Steps currentStep={1}>
 *   <Step title="Account" description="Create your account" />
 *   <Step title="Profile" description="Fill in your details" />
 *   <Step title="Confirm" description="Review and submit" />
 * </Steps>
 *
 * // Vertical orientation
 * <Steps currentStep={0} orientation="vertical">
 *   <Step title="Step 1" description="First step" />
 *   <Step title="Step 2" description="Second step" />
 * </Steps>
 *
 * // Clickable steps
 * <Steps currentStep={activeStep} onStepClick={setActiveStep}>
 *   <Step title="Step 1" />
 *   <Step title="Step 2" />
 *   <Step title="Step 3" />
 * </Steps>
 * ```
 */
declare const Steps: react.ForwardRefExoticComponent<StepsProps & react.RefAttributes<HTMLOListElement>>;
/**
 * Step — a single step in the Steps wizard.
 *
 * Must be a direct child of `Steps`. Automatically derives its visual state
 * (complete, active, upcoming) from the parent `currentStep` prop.
 *
 * @example
 * ```tsx
 * <Step title="Account" description="Set up your account" />
 *
 * // With a custom icon
 * <Step title="Upload" icon={<Upload className="size-4" />} />
 * ```
 */
declare const Step: react.ForwardRefExoticComponent<StepProps & react.RefAttributes<HTMLLIElement>>;

declare const switchTrackVariants: (props?: ({
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const switchThumbVariants: (props?: ({
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SwitchSize = "sm" | "md";
type SwitchLabelPosition = "left" | "right";
interface SwitchProps extends Omit<React.ComponentPropsWithoutRef<typeof Switch$1.Root>, "asChild">, VariantProps<typeof switchTrackVariants> {
    /**
     * Size of the switch.
     * @default "md"
     */
    size?: SwitchSize;
    /**
     * Text label for the switch.
     */
    label?: ReactNode;
    /**
     * Description text displayed below the label.
     */
    description?: ReactNode;
    /**
     * Position of the label relative to the switch.
     * @default "right"
     */
    labelPosition?: SwitchLabelPosition;
    /**
     * Additional CSS classes for the outer wrapper element.
     */
    wrapperClassName?: string;
    /**
     * Additional CSS classes for the label element.
     */
    labelClassName?: string;
    /**
     * Additional CSS classes for the description element.
     */
    descriptionClassName?: string;
    /** Additional CSS classes to merge on the switch track element. */
    className?: string;
}
/**
 * Switch — a toggle control for binary on/off states.
 *
 * Built on Radix UI's Switch primitive for accessibility and the design
 * system's token layer for styling. The thumb uses a Framer Motion spring
 * animation for a tactile, snappy feel.
 *
 * Accessibility:
 *   - Radix handles `role="switch"`, `aria-checked`, keyboard toggle (Space)
 *   - Focus ring visible on keyboard navigation (focus-visible)
 *   - Disabled state uses both `disabled` attribute and `aria-disabled`
 *   - Label is associated via `htmlFor` / `id` linkage
 *   - Description linked via `aria-describedby`
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Switch label="Dark mode" />
 *
 * // Controlled
 * <Switch
 *   checked={enabled}
 *   onCheckedChange={setEnabled}
 *   label="Notifications"
 * />
 *
 * // Small with left label
 * <Switch size="sm" label="Auto-save" labelPosition="left" />
 *
 * // With description
 * <Switch
 *   label="Marketing emails"
 *   description="Receive emails about new features and updates"
 * />
 *
 * // Disabled
 * <Switch disabled label="Feature locked" />
 * ```
 */
declare const Switch: react.ForwardRefExoticComponent<SwitchProps & react.RefAttributes<HTMLButtonElement>>;

declare const tabsListVariants: (props?: ({
    variant?: "underline" | "pills" | "enclosed" | null | undefined;
    orientation?: "horizontal" | "vertical" | null | undefined;
    fullWidth?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const tabsTriggerVariants: (props?: ({
    variant?: "underline" | "pills" | "enclosed" | null | undefined;
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TabsVariant = "underline" | "pills" | "enclosed";
type TabsSize = "sm" | "md";
type TabsOrientation = "horizontal" | "vertical";
interface TabsProps extends Omit<ComponentPropsWithoutRef<typeof Tabs$1.Root>, "orientation"> {
    /** Visual variant of the tab list. @default "underline" */
    variant?: TabsVariant;
    /** Size of the tab triggers. @default "md" */
    size?: TabsSize;
    /** Layout orientation. @default "horizontal" */
    orientation?: TabsOrientation;
    /** Additional CSS classes. */
    className?: string;
    /** Tab content. */
    children?: ReactNode;
}
interface TabsListProps extends ComponentPropsWithoutRef<typeof Tabs$1.List> {
    /** Whether tabs stretch to fill the available width. @default false */
    fullWidth?: boolean;
    /** Additional CSS classes. */
    className?: string;
    /** Tab triggers. */
    children?: ReactNode;
}
interface TabsTriggerProps extends ComponentPropsWithoutRef<typeof Tabs$1.Trigger> {
    /** Additional CSS classes. */
    className?: string;
    /** Optional icon to display before the label. */
    icon?: ReactNode;
    /** The trigger label. */
    children?: ReactNode;
}
interface TabsContentProps extends ComponentPropsWithoutRef<typeof Tabs$1.Content> {
    /** Additional CSS classes. */
    className?: string;
    /** The panel content. */
    children?: ReactNode;
}
/**
 * Tabs — a tabbed interface for organizing content into panels.
 *
 * Built on Radix UI's Tabs primitive for full keyboard navigation
 * and ARIA compliance. Supports three visual variants with an animated
 * active indicator powered by Framer Motion layoutId.
 *
 * Accessibility:
 *   - Radix provides `role="tablist"`, `role="tab"`, `role="tabpanel"`
 *   - Arrow key navigation between triggers
 *   - Automatic `aria-selected`, `aria-controls`, `aria-labelledby`
 *   - Focus management follows WAI-ARIA Tabs pattern
 *
 * @example
 * ```tsx
 * // Basic underline tabs
 * <Tabs defaultValue="overview">
 *   <TabsList>
 *     <TabsTrigger value="overview">Overview</TabsTrigger>
 *     <TabsTrigger value="analytics">Analytics</TabsTrigger>
 *     <TabsTrigger value="settings">Settings</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="overview">Overview content</TabsContent>
 *   <TabsContent value="analytics">Analytics content</TabsContent>
 *   <TabsContent value="settings">Settings content</TabsContent>
 * </Tabs>
 *
 * // Pills variant, small size
 * <Tabs variant="pills" size="sm" defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   ...
 * </Tabs>
 *
 * // Full-width tabs
 * <Tabs defaultValue="tab1">
 *   <TabsList fullWidth>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   ...
 * </Tabs>
 *
 * // Vertical orientation
 * <Tabs orientation="vertical" defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 * </Tabs>
 * ```
 */
declare const Tabs: react.ForwardRefExoticComponent<TabsProps & react.RefAttributes<HTMLDivElement>>;
/**
 * TabsList — the container for tab triggers (the tab bar).
 *
 * @example
 * ```tsx
 * <TabsList>
 *   <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *   <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 * </TabsList>
 *
 * // Full-width stretch
 * <TabsList fullWidth>
 *   <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *   <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 * </TabsList>
 * ```
 */
declare const TabsList: react.ForwardRefExoticComponent<TabsListProps & react.RefAttributes<HTMLDivElement>>;
/**
 * TabsTrigger — an individual tab button within the TabsList.
 *
 * Renders a Framer Motion active indicator when the tab is selected,
 * creating a smooth sliding animation between active tabs. The indicator
 * is only mounted on the currently active trigger so that Framer Motion's
 * layoutId animation works correctly (only one element per layoutId).
 *
 * @example
 * ```tsx
 * <TabsTrigger value="overview">Overview</TabsTrigger>
 * <TabsTrigger value="analytics" icon={<BarChartIcon />}>Analytics</TabsTrigger>
 * <TabsTrigger value="locked" disabled>Locked</TabsTrigger>
 * ```
 */
declare const TabsTrigger: react.ForwardRefExoticComponent<TabsTriggerProps & react.RefAttributes<HTMLButtonElement>>;
/**
 * TabsContent — the content panel associated with a tab trigger.
 *
 * @example
 * ```tsx
 * <TabsContent value="overview">
 *   <p>Overview content goes here.</p>
 * </TabsContent>
 * ```
 */
declare const TabsContent: react.ForwardRefExoticComponent<TabsContentProps & react.RefAttributes<HTMLDivElement>>;

declare const tagVariants: (props?: ({
    variant?: "info" | "success" | "warning" | "danger" | "default" | "primary" | "secondary" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TagVariant = "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "info";
type TagSize = "sm" | "md" | "lg";
interface TagProps extends VariantProps<typeof tagVariants> {
    variant?: TagVariant;
    size?: TagSize;
    /** Leading avatar or icon slot. */
    avatar?: ReactNode;
    /** Trailing icon (shown before close button). */
    icon?: ReactNode;
    /** Whether the tag can be dismissed. */
    dismissible?: boolean;
    /** Called when the dismiss button is clicked. */
    onDismiss?: () => void;
    /** Accessible label for the dismiss button. */
    dismissLabel?: string;
    /** Whether the tag is disabled. */
    disabled?: boolean;
    /** Additional CSS classes. */
    className?: string;
    children?: ReactNode;
}
declare const Tag: react.ForwardRefExoticComponent<TagProps & react.RefAttributes<HTMLSpanElement>>;

declare const textareaVariants: (props?: ({
    variant?: "success" | "error" | "default" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TextareaVariant = "default" | "error" | "success";
type TextareaSize = "sm" | "md" | "lg";
interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">, VariantProps<typeof textareaVariants> {
    /**
     * Visual variant of the textarea.
     * @default "default"
     */
    variant?: TextareaVariant;
    /**
     * Size of the textarea.
     * @default "md"
     */
    size?: TextareaSize;
    /**
     * Whether the textarea should automatically resize to fit its content.
     * When enabled, the native resize handle is hidden and the textarea
     * grows vertically as the user types.
     * @default false
     */
    autoResize?: boolean;
    /**
     * Maximum height (in pixels) for the textarea when `autoResize` is enabled.
     * After reaching this height, the textarea will scroll instead of growing.
     * Only applies when `autoResize` is true.
     * @default undefined (no max height constraint)
     */
    maxHeight?: number;
    /**
     * Minimum number of rows to display.
     * This sets the initial height of the textarea.
     * @default 3
     */
    minRows?: number;
    /**
     * Whether to show the character count below the textarea.
     * When `maxLength` is also set, displays "current / max".
     * Otherwise, displays just the current count.
     * @default false
     */
    showCount?: boolean;
    /**
     * Additional CSS classes for the outer wrapper element.
     * Use this when you need to control the width/margin of the textarea group.
     */
    wrapperClassName?: string;
    /**
     * Additional CSS classes for the character count text.
     */
    countClassName?: string;
    /** Additional CSS classes to merge on the textarea element. */
    className?: string;
}
/**
 * Textarea — a multi-line text input for capturing longer user content.
 *
 * Built on the design system's token layer with CVA for variant composition.
 * Shares the same visual language as the Input component for consistency.
 * All colors, radii, spacing, and transitions come from CSS custom properties
 * defined in design-system.css.
 *
 * Accessibility:
 *   - Focus ring visible on keyboard navigation (focus-visible)
 *   - Disabled state uses both `disabled` attribute and `aria-disabled`
 *   - Error variant sets `aria-invalid="true"` automatically
 *   - Supports `aria-describedby` for linking to error/helper messages
 *   - Character count uses `aria-live="polite"` for screen reader updates
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Textarea placeholder="Write something..." />
 *
 * // With variant
 * <Textarea variant="error" aria-describedby="desc-error" />
 * <Textarea variant="success" />
 *
 * // Auto-resize
 * <Textarea autoResize placeholder="This will grow as you type..." />
 * <Textarea autoResize maxHeight={200} placeholder="Grows up to 200px" />
 *
 * // Character count
 * <Textarea showCount placeholder="With counter" />
 * <Textarea showCount maxLength={500} placeholder="Max 500 chars" />
 *
 * // Sizes
 * <Textarea size="sm" placeholder="Small" />
 * <Textarea size="md" placeholder="Medium" />
 * <Textarea size="lg" placeholder="Large" />
 *
 * // Controlled with min rows
 * <Textarea
 *   minRows={5}
 *   value={text}
 *   onChange={(e) => setText(e.target.value)}
 * />
 *
 * // Disabled / Read-only
 * <Textarea disabled placeholder="Disabled" />
 * <Textarea readOnly value="Read-only value" />
 * ```
 */
declare const Textarea: react.ForwardRefExoticComponent<TextareaProps & react.RefAttributes<HTMLTextAreaElement>>;

type TimelineVariant = "default" | "outlined" | "filled";
type TimelineSize = "sm" | "md" | "lg";
type TimelineAlign = "left" | "right" | "alternate";
type TimelineItemStatus = "default" | "active" | "success" | "warning" | "danger" | "pending";
interface TimelineItemData {
    id?: string;
    title?: ReactNode;
    description?: ReactNode;
    timestamp?: ReactNode;
    icon?: ReactNode;
    status?: TimelineItemStatus;
    content?: ReactNode;
}
interface TimelineProps {
    items: TimelineItemData[];
    align?: TimelineAlign;
    size?: TimelineSize;
    animated?: boolean;
    className?: string;
}
interface TimelineItemProps {
    title?: ReactNode;
    description?: ReactNode;
    timestamp?: ReactNode;
    icon?: ReactNode;
    status?: TimelineItemStatus;
    isLast?: boolean;
    align?: "left" | "right";
    size?: TimelineSize;
    animated?: boolean;
    side?: "left" | "right";
    className?: string;
    children?: ReactNode;
}
declare const TimelineItem: react.ForwardRefExoticComponent<TimelineItemProps & react.RefAttributes<HTMLDivElement>>;
declare const Timeline: react.ForwardRefExoticComponent<TimelineProps & react.RefAttributes<HTMLDivElement>>;

type ToastVariant = "default" | "success" | "warning" | "danger" | "info";
type ToastPosition = "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";
interface ToastAction {
    /** Label text for the action button. */
    label: string;
    /** Callback fired when the action button is clicked. */
    onClick: () => void;
}
interface ToastData {
    /** Unique ID for the toast instance. Auto-generated if not provided. */
    id: string;
    /** Semantic variant controlling color and icon. */
    variant: ToastVariant;
    /** Title text (short, bold). */
    title?: ReactNode;
    /** Description / body text. */
    description?: ReactNode;
    /** Auto-dismiss duration in milliseconds. 0 = no auto-dismiss. */
    duration: number;
    /** Optional action button. */
    action?: ToastAction;
    /** Timestamp when the toast was created. */
    createdAt: number;
}
interface ToastOptions {
    /** Title text. */
    title?: ReactNode;
    /** Description / body text. */
    description?: ReactNode;
    /** Auto-dismiss duration in milliseconds. @default 5000 */
    duration?: number;
    /** Optional action button. */
    action?: ToastAction;
    /** Custom toast ID (for deduplication). */
    id?: string;
}
interface ToastAPI {
    /** Show a default-styled toast. */
    toast: (messageOrOptions: string | ToastOptions) => string;
    /** Show a success toast. */
    success: (messageOrOptions: string | ToastOptions) => string;
    /** Show a warning toast. */
    warning: (messageOrOptions: string | ToastOptions) => string;
    /** Show a danger/error toast. */
    danger: (messageOrOptions: string | ToastOptions) => string;
    /** Show an info toast. */
    info: (messageOrOptions: string | ToastOptions) => string;
    /** Programmatically dismiss a specific toast by ID. */
    dismiss: (id: string) => void;
    /** Dismiss all toasts. */
    dismissAll: () => void;
}
interface ToastProviderProps {
    children: ReactNode;
    /**
     * Position of the toast container on screen.
     * @default "top-right"
     */
    position?: ToastPosition;
    /**
     * Maximum number of visible toasts. Excess toasts are queued.
     * @default 5
     */
    maxVisible?: number;
    /**
     * Default auto-dismiss duration in milliseconds.
     * Individual toasts can override this.
     * @default 5000
     */
    defaultDuration?: number;
    /**
     * Gap between toasts in pixels.
     * @default 8
     */
    gap?: number;
}
interface ToastItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The toast data to render. */
    toast: ToastData;
    /** Callback to dismiss this toast. */
    onDismiss: (id: string) => void;
    /** Whether the toast container is in a bottom position. */
    isBottom: boolean;
}
declare const toastVariants: (props?: ({
    variant?: "info" | "success" | "warning" | "danger" | "default" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
/**
 * ToastItem — a single toast notification.
 *
 * Handles auto-dismiss timing, pause-on-hover, close button, and
 * action button rendering.
 */
declare const ToastItem: react.ForwardRefExoticComponent<ToastItemProps & react.RefAttributes<HTMLDivElement>>;
/**
 * ToastProvider — wraps your application and provides the toast context.
 *
 * Renders a portal-mounted toast container at the specified viewport
 * position. Child components access the toast API via `useToast()`.
 *
 * @example
 * ```tsx
 * // In your root layout or providers
 * <ToastProvider position="top-right" maxVisible={5}>
 *   <App />
 * </ToastProvider>
 *
 * // In any child component
 * function MyComponent() {
 *   const toast = useToast();
 *
 *   return (
 *     <button onClick={() => toast.success("Saved!")}>
 *       Save
 *     </button>
 *   );
 * }
 * ```
 */
declare function ToastProvider({ children, position, maxVisible, defaultDuration, gap, }: ToastProviderProps): react_jsx_runtime.JSX.Element;
declare namespace ToastProvider {
    var displayName: string;
}
/**
 * useToast — imperative hook for showing toast notifications.
 *
 * Must be used within a `<ToastProvider>`.
 *
 * @example
 * ```tsx
 * const toast = useToast();
 *
 * // Simple string message
 * toast.success("File uploaded");
 * toast.danger("Upload failed");
 * toast.info("Processing...");
 * toast.warning("Disk space low");
 *
 * // With options
 * toast.success({
 *   title: "Payment received",
 *   description: "Order #12345 has been confirmed.",
 *   duration: 8000,
 * });
 *
 * // With action button
 * toast.info({
 *   title: "New version available",
 *   description: "v2.1.0 is ready to install.",
 *   action: { label: "Update now", onClick: () => doUpdate() },
 * });
 *
 * // Dismiss programmatically
 * const id = toast.info("Uploading...", { duration: 0 });
 * // ...later
 * toast.dismiss(id);
 *
 * // Dismiss all
 * toast.dismissAll();
 * ```
 */
declare function useToast(): ToastAPI;

declare const toggleVariants: (props?: ({
    variant?: "outline" | "default" | "ghost" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ToggleVariant = "default" | "outline" | "ghost";
type ToggleSize = "sm" | "md" | "lg";
interface ToggleProps extends Omit<React.ComponentPropsWithoutRef<typeof Toggle$1.Root>, "asChild">, VariantProps<typeof toggleVariants> {
    /**
     * Visual variant of the toggle.
     * @default "default"
     */
    variant?: ToggleVariant;
    /**
     * Size of the toggle.
     * @default "md"
     */
    size?: ToggleSize;
    /**
     * Icon to display before the toggle label.
     */
    iconLeft?: ReactNode;
    /**
     * Icon to display after the toggle label.
     */
    iconRight?: ReactNode;
    /** Content to render inside the toggle. */
    children?: ReactNode;
    /** Additional CSS classes to merge. */
    className?: string;
}
/**
 * Toggle — a pressable on/off button for binary states.
 *
 * Built on Radix UI's Toggle primitive for accessibility and the design
 * system's token layer for styling. Use for toolbar actions (bold, italic),
 * view mode switches, mute/unmute, and other binary toggleable actions.
 *
 * Distinct from Switch: Toggle looks and behaves like a button that stays
 * pressed. Switch looks like a sliding track and is better for settings/preferences.
 *
 * Accessibility:
 *   - Radix handles `aria-pressed` state management
 *   - Focus ring visible on keyboard navigation (focus-visible)
 *   - Disabled state uses both `disabled` attribute and `data-disabled`
 *   - Keyboard toggle via Space and Enter keys (Radix)
 *   - When used as icon-only, provide `aria-label`
 *
 * @example
 * ```tsx
 * // Icon-only toggle (must have aria-label)
 * <Toggle aria-label="Toggle bold">
 *   <BoldIcon className="size-4" />
 * </Toggle>
 *
 * // With text label
 * <Toggle variant="outline">
 *   <BoldIcon className="size-4" />
 *   Bold
 * </Toggle>
 *
 * // Controlled
 * <Toggle
 *   pressed={isMuted}
 *   onPressedChange={setIsMuted}
 *   aria-label="Toggle mute"
 * >
 *   {isMuted ? <VolumeOffIcon /> : <VolumeIcon />}
 * </Toggle>
 *
 * // Sizes
 * <Toggle size="sm" aria-label="Small toggle">
 *   <StarIcon className="size-3.5" />
 * </Toggle>
 * <Toggle size="md" aria-label="Medium toggle">
 *   <StarIcon className="size-4" />
 * </Toggle>
 * <Toggle size="lg" aria-label="Large toggle">
 *   <StarIcon className="size-4" />
 * </Toggle>
 *
 * // Disabled
 * <Toggle disabled aria-label="Disabled toggle">
 *   <LockIcon className="size-4" />
 * </Toggle>
 *
 * // Ghost variant
 * <Toggle variant="ghost" aria-label="Bookmark">
 *   <BookmarkIcon className="size-4" />
 * </Toggle>
 * ```
 */
declare const Toggle: react.ForwardRefExoticComponent<ToggleProps & react.RefAttributes<HTMLButtonElement>>;

interface ToggleGroupContextValue {
    variant: ToggleGroupVariant;
    size: ToggleGroupSize;
}
declare function useToggleGroupContext(): ToggleGroupContextValue;
declare const toggleGroupVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const toggleGroupItemVariants: (props?: ({
    variant?: "outline" | "default" | "ghost" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ToggleGroupVariant = "default" | "outline" | "ghost";
type ToggleGroupSize = "sm" | "md" | "lg";
type ToggleGroupOrientation = "horizontal" | "vertical";
interface ToggleGroupSingleProps extends Omit<ComponentPropsWithoutRef<typeof ToggleGroup$1.Root>, "type" | "asChild" | "rovingFocus" | "orientation"> {
    /**
     * Selection mode: only one item can be active at a time.
     */
    type: "single";
    /**
     * The controlled value of the active item.
     */
    value?: string;
    /**
     * The default value for uncontrolled usage.
     */
    defaultValue?: string;
    /**
     * Callback fired when the active item changes.
     */
    onValueChange?: (value: string) => void;
    /**
     * Visual variant applied to all items in the group.
     * @default "default"
     */
    variant?: ToggleGroupVariant;
    /**
     * Size applied to all items in the group.
     * @default "md"
     */
    size?: ToggleGroupSize;
    /**
     * Orientation of the toggle group.
     * @default "horizontal"
     */
    orientation?: ToggleGroupOrientation;
    /**
     * Whether the group is disabled.
     * @default false
     */
    disabled?: boolean;
    /** Content to render inside the group (ToggleGroupItem children). */
    children: ReactNode;
    /** Additional CSS classes to merge. */
    className?: string;
}
interface ToggleGroupMultipleProps extends Omit<ComponentPropsWithoutRef<typeof ToggleGroup$1.Root>, "type" | "asChild" | "rovingFocus" | "orientation"> {
    /**
     * Selection mode: multiple items can be active simultaneously.
     */
    type: "multiple";
    /**
     * The controlled value of the active items.
     */
    value?: string[];
    /**
     * The default value for uncontrolled usage.
     */
    defaultValue?: string[];
    /**
     * Callback fired when the active items change.
     */
    onValueChange?: (value: string[]) => void;
    /**
     * Visual variant applied to all items in the group.
     * @default "default"
     */
    variant?: ToggleGroupVariant;
    /**
     * Size applied to all items in the group.
     * @default "md"
     */
    size?: ToggleGroupSize;
    /**
     * Orientation of the toggle group.
     * @default "horizontal"
     */
    orientation?: ToggleGroupOrientation;
    /**
     * Whether the group is disabled.
     * @default false
     */
    disabled?: boolean;
    /** Content to render inside the group (ToggleGroupItem children). */
    children: ReactNode;
    /** Additional CSS classes to merge. */
    className?: string;
}
type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps;
interface ToggleGroupItemProps extends Omit<ComponentPropsWithoutRef<typeof ToggleGroup$1.Item>, "asChild"> {
    /**
     * The unique value for this item.
     */
    value: string;
    /**
     * Override the group-level variant for this specific item.
     */
    variant?: ToggleGroupVariant;
    /**
     * Override the group-level size for this specific item.
     */
    size?: ToggleGroupSize;
    /** Content to render inside the toggle item. */
    children?: ReactNode;
    /** Additional CSS classes to merge. */
    className?: string;
}
/**
 * ToggleGroup — a group of toggle buttons with single or multi-select behavior.
 *
 * Built on Radix UI's ToggleGroup primitive for accessibility and the
 * design system's token layer for styling. Supports both single-select
 * (radio-like) and multi-select (checkbox-like) modes.
 *
 * The group shares variant and size context with its items, so you only
 * need to set these once on the group level. Individual items can override
 * these if needed.
 *
 * Accessibility:
 *   - Radix handles `role="group"` on the root
 *   - Radix handles `aria-pressed` on each item
 *   - Roving tabindex for keyboard navigation (arrow keys move between items)
 *   - Space/Enter toggles the focused item
 *   - Disabled state on group propagates to all items
 *   - Each icon-only item should have an `aria-label`
 *
 * @example
 * ```tsx
 * // Single-select: text alignment
 * <ToggleGroup type="single" value={align} onValueChange={setAlign}>
 *   <ToggleGroupItem value="left" aria-label="Align left">
 *     <AlignLeftIcon className="size-4" />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="center" aria-label="Align center">
 *     <AlignCenterIcon className="size-4" />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="right" aria-label="Align right">
 *     <AlignRightIcon className="size-4" />
 *   </ToggleGroupItem>
 * </ToggleGroup>
 *
 * // Multi-select: text formatting
 * <ToggleGroup type="multiple" variant="outline" size="sm">
 *   <ToggleGroupItem value="bold" aria-label="Bold">
 *     <BoldIcon className="size-3.5" />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="italic" aria-label="Italic">
 *     <ItalicIcon className="size-3.5" />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="underline" aria-label="Underline">
 *     <UnderlineIcon className="size-3.5" />
 *   </ToggleGroupItem>
 * </ToggleGroup>
 *
 * // Vertical orientation
 * <ToggleGroup type="single" orientation="vertical">
 *   <ToggleGroupItem value="list">List view</ToggleGroupItem>
 *   <ToggleGroupItem value="grid">Grid view</ToggleGroupItem>
 *   <ToggleGroupItem value="board">Board view</ToggleGroupItem>
 * </ToggleGroup>
 *
 * // Disabled
 * <ToggleGroup type="single" disabled>
 *   <ToggleGroupItem value="a">A</ToggleGroupItem>
 *   <ToggleGroupItem value="b">B</ToggleGroupItem>
 * </ToggleGroup>
 * ```
 */
declare const ToggleGroup: react.ForwardRefExoticComponent<ToggleGroupProps & react.RefAttributes<HTMLDivElement>>;
/**
 * ToggleGroupItem — an individual toggle button within a ToggleGroup.
 *
 * Inherits variant and size from the parent ToggleGroup context, but
 * can override them per-item if needed.
 *
 * When used as an icon-only item, always provide an `aria-label` for
 * accessibility.
 *
 * @example
 * ```tsx
 * <ToggleGroupItem value="bold" aria-label="Bold">
 *   <BoldIcon className="size-4" />
 * </ToggleGroupItem>
 *
 * // With text label
 * <ToggleGroupItem value="grid">
 *   <GridIcon className="size-4" />
 *   Grid view
 * </ToggleGroupItem>
 *
 * // Override group variant/size
 * <ToggleGroupItem value="special" variant="outline" size="lg">
 *   Special
 * </ToggleGroupItem>
 * ```
 */
declare const ToggleGroupItem: react.ForwardRefExoticComponent<ToggleGroupItemProps & react.RefAttributes<HTMLButtonElement>>;

type TooltipSide = "top" | "right" | "bottom" | "left";
type TooltipAlign = "start" | "center" | "end";
interface TooltipProps {
    /**
     * The tooltip content. Can be a string or ReactNode.
     */
    content: ReactNode;
    /**
     * The trigger element. Must be a single React element that accepts a ref.
     */
    children: ReactNode;
    /**
     * The preferred side of the trigger to render the tooltip.
     * @default "top"
     */
    side?: TooltipSide;
    /**
     * Alignment of the tooltip relative to the trigger.
     * @default "center"
     */
    align?: TooltipAlign;
    /**
     * The distance in pixels from the trigger.
     * @default 6
     */
    sideOffset?: number;
    /**
     * Whether to show an arrow pointing to the trigger.
     * @default true
     */
    arrow?: boolean;
    /**
     * Maximum width of the tooltip content.
     * @default 220
     */
    maxWidth?: number;
    /**
     * Delay in ms before the tooltip opens.
     * @default 300
     */
    delayDuration?: number;
    /**
     * Delay in ms before the tooltip closes after leaving.
     * @default 0
     */
    skipDelayDuration?: number;
    /**
     * Whether the tooltip is open (controlled).
     */
    open?: boolean;
    /**
     * Callback when the open state changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * Additional CSS classes for the tooltip content element.
     */
    contentClassName?: string;
}
interface TooltipProviderProps extends ComponentPropsWithoutRef<typeof Tooltip$1.Provider> {
    children: ReactNode;
}
/**
 * TooltipProvider — wraps your application (or a subtree) to configure
 * shared tooltip behavior like delay duration.
 *
 * Should be placed near the root of your app, or around any section
 * that uses tooltips.
 *
 * @example
 * ```tsx
 * <TooltipProvider delayDuration={200}>
 *   <App />
 * </TooltipProvider>
 * ```
 */
declare function TooltipProvider({ children, delayDuration, skipDelayDuration, ...rest }: TooltipProviderProps): react_jsx_runtime.JSX.Element;
declare namespace TooltipProvider {
    var displayName: string;
}
/**
 * Tooltip — a small popup that displays informative text when hovering
 * or focusing on a trigger element.
 *
 * Built on Radix UI's Tooltip primitive for full accessibility. The tooltip
 * appears after a configurable delay and supports keyboard access.
 *
 * Accessibility:
 *   - Radix handles `role="tooltip"` and `aria-describedby` automatically
 *   - Opens on hover and focus, closes on blur and Escape
 *   - Keyboard accessible: focusable triggers show the tooltip
 *   - Content is announced by screen readers
 *
 * @example
 * ```tsx
 * // Basic usage (wrap app in TooltipProvider first)
 * <Tooltip content="Save your changes">
 *   <button>Save</button>
 * </Tooltip>
 *
 * // With side placement
 * <Tooltip content="More options" side="right">
 *   <button>⋮</button>
 * </Tooltip>
 *
 * // Without arrow
 * <Tooltip content="Delete" arrow={false}>
 *   <button>🗑️</button>
 * </Tooltip>
 *
 * // Custom max width
 * <Tooltip content="This is a longer tooltip that needs more space" maxWidth={300}>
 *   <span>Hover me</span>
 * </Tooltip>
 *
 * // Controlled
 * <Tooltip content="Info" open={isOpen} onOpenChange={setIsOpen}>
 *   <button>i</button>
 * </Tooltip>
 * ```
 */
declare const Tooltip: react.ForwardRefExoticComponent<TooltipProps & react.RefAttributes<HTMLButtonElement>>;

interface VisuallyHiddenProps extends ComponentPropsWithoutRef<typeof VisuallyHidden$1.Root> {
}
declare const VisuallyHidden: react.ForwardRefExoticComponent<VisuallyHiddenProps & react.RefAttributes<HTMLSpanElement>>;

export { Accordion, AccordionContent, type AccordionContentProps, AccordionItem, type AccordionItemProps, type AccordionMultipleProps, type AccordionProps, type AccordionSingleProps, type AccordionSize, AccordionTrigger, type AccordionTriggerProps, type AccordionVariant, Alert, AlertDialog, AlertDialogAction, type AlertDialogActionProps, AlertDialogCancel, type AlertDialogCancelProps, AlertDialogContent, type AlertDialogContentProps, AlertDialogDescription, type AlertDialogDescriptionProps, AlertDialogFooter, type AlertDialogFooterProps, AlertDialogHeader, type AlertDialogHeaderProps, AlertDialogOverlay, type AlertDialogOverlayProps, AlertDialogPortal, AlertDialogTitle, type AlertDialogTitleProps, AlertDialogTrigger, type AlertProps, type AlertVariant, AspectRatio, type AspectRatioProps, Avatar, AvatarGroup, type AvatarGroupProps, type AvatarProps, type AvatarShape, type AvatarSize, type AvatarStatus, Badge, type BadgeProps, type BadgeSize, type BadgeVariant, Banner, type BannerPosition, type BannerProps, type BannerVariant, Breadcrumb, BreadcrumbEllipsis, type BreadcrumbEllipsisProps, BreadcrumbItem, type BreadcrumbItemProps, BreadcrumbLink, type BreadcrumbLinkProps, BreadcrumbList, type BreadcrumbListProps, BreadcrumbNav, type BreadcrumbNavItem, type BreadcrumbNavProps, BreadcrumbPage, type BreadcrumbPageProps, type BreadcrumbProps, BreadcrumbSeparator, type BreadcrumbSeparatorProps, Button, type ButtonProps, type ButtonSize, type ButtonVariant, Calendar, type CalendarMode, type CalendarProps, Callout, type CalloutProps, type CalloutVariant, Card, CardBody, type CardBodyProps, CardFooter, type CardFooterProps, CardHeader, type CardHeaderProps, type CardProps, type CardVariant, Carousel, type CarouselProps, Checkbox, CheckboxGroup, type CheckboxGroupOrientation, type CheckboxGroupProps, type CheckboxProps, type CheckboxSize, CodeBlock, type CodeBlockProps, InlineCode as CodeInline, type InlineCodeProps as CodeInlineProps, type CodeVariant, Collapsible, CollapsibleContent, type CollapsibleContentProps, type CollapsibleProps, CollapsibleTrigger, type CollapsibleTriggerProps, Combobox, type ComboboxGroup, type ComboboxOption, type ComboboxProps, type ComboboxSize, type ComboboxVariant, Command, type CommandGroup, type CommandItem, type CommandProps, CommandTrigger, type CommandTriggerProps, ConfirmDialog, type ConfirmDialogProps, type ConfirmDialogVariant, ContextMenu, ContextMenuCheckboxItem, type ContextMenuCheckboxItemProps, ContextMenuContent, type ContextMenuContentProps, ContextMenuGroup, type ContextMenuGroupProps, ContextMenuItem, type ContextMenuItemProps, type ContextMenuItemVariant, ContextMenuLabel, type ContextMenuLabelProps, type ContextMenuProps, ContextMenuRadioGroup, type ContextMenuRadioGroupProps, ContextMenuRadioItem, type ContextMenuRadioItemProps, ContextMenuSeparator, type ContextMenuSeparatorProps, ContextMenuShortcut, type ContextMenuShortcutProps, ContextMenuSub, ContextMenuSubContent, type ContextMenuSubContentProps, type ContextMenuSubProps, ContextMenuSubTrigger, type ContextMenuSubTriggerProps, ContextMenuTrigger, type ContextMenuTriggerProps, CopyButton, type CopyButtonProps, type CopyButtonSize, type CopyButtonVariant, DataList, DataListDetail, type DataListDetailProps, type DataListItem, type DataListOrientation, type DataListProps, type DataListSize, DataListTerm, type DataListTermProps, DataTable, type DataTableColumnMeta, type DataTableFacetedFilter, type DataTableProps, DatePicker, type DatePickerMode, type DatePickerProps, type DatePickerSize, type DateRange, Dialog, DialogBody, type DialogBodyProps, DialogClose, type DialogCloseProps, DialogContent, type DialogContentProps, DialogDescription, type DialogDescriptionProps, DialogFooter, type DialogFooterProps, DialogHeader, type DialogHeaderProps, type DialogProps, type DialogSize, DialogTitle, type DialogTitleProps, DialogTrigger, type DialogTriggerProps, DropdownMenu, DropdownMenuCheckboxItem, type DropdownMenuCheckboxItemProps, DropdownMenuContent, type DropdownMenuContentProps, DropdownMenuGroup, type DropdownMenuGroupProps, DropdownMenuItem, type DropdownMenuItemProps, type DropdownMenuItemVariant, DropdownMenuLabel, type DropdownMenuLabelProps, type DropdownMenuProps, DropdownMenuRadioGroup, type DropdownMenuRadioGroupProps, DropdownMenuRadioItem, type DropdownMenuRadioItemProps, DropdownMenuSeparator, type DropdownMenuSeparatorProps, DropdownMenuShortcut, type DropdownMenuShortcutProps, DropdownMenuSub, DropdownMenuSubContent, type DropdownMenuSubContentProps, type DropdownMenuSubProps, DropdownMenuSubTrigger, type DropdownMenuSubTriggerProps, DropdownMenuTrigger, type DropdownMenuTriggerProps, EmptyState, type EmptyStateProps, FileUpload, type FileUploadItem, type FileUploadProps, type FileUploadSize, FormField, type FormFieldControlProps, type FormFieldOrientation, type FormFieldProps, type FormFieldSize, HoverCard, HoverCardContent, type HoverCardContentProps, type HoverCardProps, HoverCardTrigger, type HoverCardTriggerProps, Input, InputGroup, type InputGroupProps, type InputGroupSize, type InputGroupVariant, type InputProps, type InputSize, type InputVariant, Kbd, type KbdProps, type KbdSize, Label, type LabelProps, type LabelSize, Menubar, MenubarCheckboxItem, type MenubarCheckboxItemProps, MenubarContent, type MenubarContentProps, MenubarGroup, type MenubarGroupProps, MenubarItem, type MenubarItemProps, type MenubarItemVariant, MenubarLabel, type MenubarLabelProps, MenubarMenu, type MenubarMenuProps, type MenubarProps, MenubarRadioGroup, type MenubarRadioGroupProps, MenubarRadioItem, type MenubarRadioItemProps, MenubarSeparator, type MenubarSeparatorProps, MenubarShortcut, type MenubarShortcutProps, MenubarSub, MenubarSubContent, type MenubarSubContentProps, type MenubarSubProps, MenubarSubTrigger, type MenubarSubTriggerProps, MenubarTrigger, type MenubarTriggerProps, NavigationMenu, NavigationMenuCardLink, type NavigationMenuCardLinkProps, NavigationMenuContent, type NavigationMenuContentProps, NavigationMenuIndicator, type NavigationMenuIndicatorProps, NavigationMenuItem, type NavigationMenuItemProps, NavigationMenuLink, type NavigationMenuLinkProps, NavigationMenuList, type NavigationMenuListProps, type NavigationMenuProps, NavigationMenuTrigger, type NavigationMenuTriggerProps, NavigationMenuViewport, type NavigationMenuViewportProps, NumberInput, type NumberInputProps, type NumberInputSize, type NumberInputVariant, Pagination, type PaginationProps, type PaginationSize, type PaginationVariant, PinInput, type PinInputProps, type PinInputSize, type PinInputType, type PinInputVariant, Popover, PopoverArrow, type PopoverArrowProps, PopoverClose, type PopoverCloseProps, PopoverContent, type PopoverContentProps, type PopoverProps, PopoverTrigger, type PopoverTriggerProps, Progress, type ProgressProps, type ProgressSize, type ProgressVariant, RadioCard, type RadioCardProps, RadioGroup, RadioGroupItem, type RadioGroupItemProps, type RadioGroupProps, type RadioOrientation, type RadioSize, ResizableHandle, type ResizableHandleProps, ResizablePanel, ResizablePanelGroup, type ResizablePanelGroupProps, type ResizablePanelProps, ScrollArea, type ScrollAreaProps, type ScrollAreaType, ScrollBar, type ScrollBarOrientation, type ScrollBarProps, type ScrollBarSize, SearchInput, type SearchInputProps, type SearchInputSize, type SearchInputVariant, Select, SelectContent, type SelectContentProps, SelectGroup, type SelectGroupProps, SelectItem, type SelectItemProps, SelectLabel, type SelectLabelProps, SelectScrollDownButton, type SelectScrollDownButtonProps, SelectScrollUpButton, type SelectScrollUpButtonProps, SelectSeparator, type SelectSeparatorProps, type SelectSize, SelectTrigger, type SelectTriggerProps, SelectValue, type SelectVariant, Sheet, SheetClose, type SheetCloseProps, SheetContent, type SheetContentProps, SheetDescription, type SheetDescriptionProps, SheetFooter, type SheetFooterProps, SheetHeader, type SheetHeaderProps, type SheetProps, type SheetSide, type SheetSize, SheetTitle, type SheetTitleProps, SheetTrigger, type SheetTriggerProps, Sidebar, SidebarContent, type SidebarContentProps, SidebarFooter, type SidebarFooterProps, SidebarHeader, type SidebarHeaderProps, SidebarItem, type SidebarItemProps, SidebarMobileOverlay, type SidebarMobileOverlayProps, type SidebarProps, SidebarProvider, type SidebarProviderProps, SidebarSection, type SidebarSectionProps, SidebarToggle, type SidebarToggleProps, Skeleton, SkeletonCircle, type SkeletonCircleProps, type SkeletonProps, SkeletonRect, type SkeletonRectProps, type SkeletonSize, SkeletonText, type SkeletonTextProps, type SkeletonTextSize, Slider, type SliderMark, type SliderOrientation, type SliderProps, type SliderSize, type SliderVariant, Spinner, type SpinnerProps, type SpinnerSize, type SpinnerVariant, Stat, type StatProps, type StatTrend, Step, type StepProps, type StepStatus, Steps, type StepsOrientation, type StepsProps, type StepsVariant, Switch, type SwitchLabelPosition, type SwitchProps, type SwitchSize, Table, type TableAlign, TableBody, type TableBodyProps, TableCaption, type TableCaptionProps, TableCell, type TableCellProps, type TableDensity, TableFooter, type TableFooterProps, TableHead, type TableHeadProps, TableHeader, type TableHeaderProps, type TableProps, TableRow, type TableRowProps, type TableSortDirection, Tabs, TabsContent, type TabsContentProps, TabsList, type TabsListProps, type TabsOrientation, type TabsProps, type TabsSize, TabsTrigger, type TabsTriggerProps, type TabsVariant, Tag, type TagProps, type TagSize, type TagVariant, Textarea, type TextareaProps, type TextareaSize, type TextareaVariant, Timeline, type TimelineAlign, TimelineItem, type TimelineItemData, type TimelineItemProps, type TimelineItemStatus, type TimelineProps, type TimelineSize, type TimelineVariant, type ToastAPI, type ToastAction, type ToastData, ToastItem, type ToastItemProps, type ToastOptions, type ToastPosition, ToastProvider, type ToastProviderProps, type ToastVariant, Toggle, ToggleGroup, ToggleGroupItem, type ToggleGroupItemProps, type ToggleGroupMultipleProps, type ToggleGroupOrientation, type ToggleGroupProps, type ToggleGroupSingleProps, type ToggleGroupSize, type ToggleGroupVariant, type ToggleProps, type ToggleSize, type ToggleVariant, Tooltip, type TooltipAlign, type TooltipProps, TooltipProvider, type TooltipProviderProps, type TooltipSide, type UseDataTableOptions, type UseDataTableReturn, VisuallyHidden, type VisuallyHiddenProps, accordionRootVariants, accordionTriggerVariants, alertVariants, avatarVariants, badgeVariants, bannerVariants, buttonVariants, calendarDayVariants, calloutVariants, cardVariants, checkboxVariants, codeBlockVariants, comboboxTriggerVariants, copyButtonVariants, dataListVariants, dialogContentVariants, fileUploadZoneVariants, inlineCodeVariants, inputVariants, kbdVariants, labelVariants, numberInputVariants, paginationButtonVariants, pinCellVariants, progressIndicatorVariants, progressTrackVariants, radioCardVariants, radioGroupVariants, radioIndicatorVariants, scrollbarThumbVariants, scrollbarVariants, searchInputVariants, selectTriggerVariants, sheetContentVariants, skeletonVariants, sliderRangeVariants, sliderThumbVariants, sliderTrackVariants, spinnerVariants, statVariants, switchThumbVariants, switchTrackVariants, tableRootVariants, tabsListVariants, tabsTriggerVariants, tagVariants, textareaVariants, toastVariants, toggleGroupItemVariants, toggleGroupVariants, toggleVariants, useCarouselContext, useCheckboxGroupContext, useCollapsibleContext, useDataTable, useSidebarContext, useToast, useToggleGroupContext };
