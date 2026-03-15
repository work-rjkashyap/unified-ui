import * as react from 'react';
import { ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';

declare const alertVariants: (props?: ({
    variant?: "info" | "success" | "warning" | "danger" | "default" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type AlertVariant = "info" | "success" | "warning" | "danger" | "default";
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
     */
    icon?: ReactNode | null;
    /**
     * Whether the alert can be dismissed/closed.
     * When true, a close button (×) is rendered in the top-right corner.
     * Cannot be combined with `collapsible`.
     * @default false
     */
    dismissible?: boolean;
    /**
     * Callback fired when the dismiss (close) button is clicked.
     * Only relevant when `dismissible` is true.
     */
    onDismiss?: () => void;
    /**
     * Accessible label for the dismiss button.
     * @default "Dismiss alert"
     */
    dismissLabel?: string;
    /**
     * Whether the alert body can be toggled open/closed.
     * When true, the title row becomes clickable and a chevron is shown.
     * Cannot be combined with `dismissible`.
     * @default false
     */
    collapsible?: boolean;
    /**
     * Initial open state when `collapsible` is true.
     * @default true
     */
    defaultOpen?: boolean;
    /**
     * Whether to animate the alert entrance with a fade-in animation.
     * Uses the `fadeIn` Framer Motion preset.
     * @default false
     */
    animated?: boolean;
    /**
     * The ARIA role for the alert element.
     * @default "alert" for danger/warning, "status" for info/success/default
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
 * This is the unified Alert component that merges the former Alert and
 * Callout components into a single API. All features from both are available:
 * - Dismissible, collapsible, animated entrance, 5 variants (including
 *   the neutral "default" variant formerly exclusive to Callout).
 *
 * Built on the design system's token layer with CVA for variant composition.
 * All colors, radii, spacing, and transitions come from CSS custom properties
 * defined in design-system.css.
 *
 * Accessibility:
 *   - Danger/warning alerts use `role="alert"` (assertive live region)
 *   - Info/success/default alerts use `role="status"` (polite live region)
 *   - Icon is decorative (`aria-hidden`) — variant meaning conveyed by text
 *   - Dismiss button has configurable `aria-label`
 *   - Collapsible header uses `aria-expanded` for screen readers
 *   - Color is never the sole indicator of meaning — icons + text provide
 *     redundant signaling
 *   - Animated entrance respects `prefers-reduced-motion`
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
 *   Your order #12345 has been confirmed.
 * </Alert>
 *
 * // Warning alert
 * <Alert variant="warning">
 *   Your session will expire in 5 minutes.
 * </Alert>
 *
 * // Danger alert (dismissible)
 * <Alert
 *   variant="danger"
 *   title="Connection failed"
 *   dismissible
 *   onDismiss={() => setShowError(false)}
 * >
 *   Unable to reach the server.
 * </Alert>
 *
 * // Neutral default variant
 * <Alert variant="default" title="Note">
 *   This is a generic note without semantic meaning.
 * </Alert>
 *
 * // Collapsible (formerly Callout feature)
 * <Alert
 *   variant="info"
 *   title="How does billing work?"
 *   collapsible
 *   defaultOpen={false}
 * >
 *   You are billed at the start of each month...
 * </Alert>
 *
 * // Animated entrance
 * <Alert variant="success" title="Deployed" animated>
 *   Version 2.4.1 is live on production.
 * </Alert>
 *
 * // Custom icon
 * <Alert variant="success" icon={<RocketIcon className="size-4" />}>
 *   Your app has been deployed!
 * </Alert>
 *
 * // No icon
 * <Alert variant="warning" icon={null}>
 *   Maintenance scheduled for tomorrow.
 * </Alert>
 * ```
 */
declare const Alert: react.ForwardRefExoticComponent<AlertProps & react.RefAttributes<HTMLDivElement>>;
type CalloutVariant = AlertVariant;
interface CalloutProps extends Omit<AlertProps, "dismissible" | "onDismiss" | "dismissLabel" | "role"> {
    /**
     * Semantic color variant.
     * @default "info"
     */
    variant?: CalloutVariant;
    /**
     * Optional heading rendered in bold above the body.
     */
    title?: ReactNode;
    /**
     * Custom icon. Pass `null` to hide the default icon.
     */
    icon?: ReactNode | null;
    /**
     * Whether the body can be toggled open/closed.
     * @default false
     */
    collapsible?: boolean;
    /**
     * Initial open state when `collapsible` is true.
     * @default true
     */
    defaultOpen?: boolean;
    /**
     * Whether to animate the callout entrance.
     * Callouts default to `true` to preserve original Callout behavior.
     * @default true
     */
    animated?: boolean;
    /** Additional CSS classes on the root element. */
    className?: string;
    /** The body content of the callout. */
    children?: ReactNode;
}
/**
 * Callout — backward-compatible alias for Alert.
 *
 * Renders an animated Alert by default (`animated={true}`) with
 * `rounded-lg` styling to preserve the original Callout appearance.
 *
 * @deprecated Use `Alert` directly with `animated` and `collapsible`
 *   props if needed. The `Callout` alias will be removed in a future
 *   major version.
 *
 * @example
 * ```tsx
 * <Callout variant="info" title="Did you know?">
 *   Unified UI components are fully tree-shakeable.
 * </Callout>
 *
 * // Equivalent Alert usage:
 * <Alert variant="info" title="Did you know?" animated className="rounded-lg">
 *   Unified UI components are fully tree-shakeable.
 * </Alert>
 * ```
 */
declare const Callout: react.ForwardRefExoticComponent<CalloutProps & react.RefAttributes<HTMLDivElement>>;
declare const calloutVariants: (props?: ({
    variant?: "info" | "success" | "warning" | "danger" | "default" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;

export { Alert, type AlertProps, type AlertVariant, Callout, type CalloutProps, type CalloutVariant, alertVariants, calloutVariants };
