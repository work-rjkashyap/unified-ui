"use client";

// ============================================================================
// Unified UI — Alert Component
// ============================================================================
// A static notification component for displaying contextual feedback messages.
// Built on the Unified UI token layer with CVA for variant composition.
//
// Features:
//   - 4 semantic variants: info, success, warning, danger
//   - Auto-selected icon per variant (can be overridden or hidden)
//   - Title + description slots for structured content
//   - Dismissible option with close button and onDismiss callback
//   - Full ref forwarding
//   - WCAG AA accessible: role="alert", aria-live, proper color contrast
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { Alert } from "@/design-system/components/alert";
//
//   <Alert variant="info" title="Note">
//     This is an informational message.
//   </Alert>
//
//   <Alert variant="danger" dismissible onDismiss={() => setVisible(false)}>
//     Something went wrong. Please try again.
//   </Alert>
//
//   <Alert variant="success" title="Payment received">
//     Your order has been confirmed and is being processed.
//   </Alert>
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ReactNode, useState } from "react";

// ---------------------------------------------------------------------------
// Default Icons (Internal)
// ---------------------------------------------------------------------------
// Lightweight inline SVG icons used as default per-variant indicators.
// Each icon communicates the semantic meaning of the alert variant.
// Consumers can override these via the `icon` prop.
// ---------------------------------------------------------------------------

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function SuccessIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function DangerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Icon Map
// ---------------------------------------------------------------------------
// Maps alert variants to their default icon component. Each icon visually
// reinforces the semantic meaning of the variant without relying on color
// alone (WCAG requirement).
// ---------------------------------------------------------------------------

const defaultIconMap: Record<AlertVariant, React.FC<{ className?: string }>> = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon,
};

// ---------------------------------------------------------------------------
// CVA Variant Definition
// ---------------------------------------------------------------------------
// All color values reference design system CSS custom properties via the
// Tailwind utilities defined in design-system.css. Uses the semantic
// "muted" color variants for background (subtle) with the corresponding
// "muted-foreground" for text (higher contrast against the muted bg).
// ---------------------------------------------------------------------------

export const alertVariants = cva(
  // Base styles — shared across all variants
  [
    // Layout
    "relative flex gap-3",
    // Shape
    "rounded-md",
    // Padding
    "p-4",
    // Typography
    "text-sm leading-5",
    // Border
    "border",
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Semantic Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Info — informational messages, tips, notes.
         * Uses info-muted bg with info-muted-foreground text.
         */
        info: ["bg-info-muted", "text-info-muted-foreground", "border-info/20"],

        /**
         * Success — positive outcomes, confirmations.
         * Uses success-muted bg with success-muted-foreground text.
         */
        success: [
          "bg-success-muted",
          "text-success-muted-foreground",
          "border-success/20",
        ],

        /**
         * Warning — caution messages, deprecation notices.
         * Uses warning-muted bg with warning-muted-foreground text.
         */
        warning: [
          "bg-warning-muted",
          "text-warning-muted-foreground",
          "border-warning/20",
        ],

        /**
         * Danger — error messages, destructive action warnings.
         * Uses danger-muted bg with danger-muted-foreground text.
         */
        danger: [
          "bg-danger-muted",
          "text-danger-muted-foreground",
          "border-danger/20",
        ],
      },
    },

    defaultVariants: {
      variant: "info",
    },
  },
);

// ---------------------------------------------------------------------------
// Icon color classes per variant
// ---------------------------------------------------------------------------
// The icon uses the solid (non-muted) semantic color for high visibility
// against the muted background.
// ---------------------------------------------------------------------------

const iconColorMap: Record<AlertVariant, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
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

// ---------------------------------------------------------------------------
// Default role map
// ---------------------------------------------------------------------------
// Danger and warning alerts use role="alert" (assertive) because they
// typically require user attention. Info and success use role="status"
// (polite) because they are informational.
// ---------------------------------------------------------------------------

const defaultRoleMap: Record<AlertVariant, "alert" | "status"> = {
  info: "status",
  success: "status",
  warning: "alert",
  danger: "alert",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

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
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    variant = "info",
    title,
    icon,
    dismissible = false,
    onDismiss,
    dismissLabel = "Dismiss alert",
    role: roleProp,
    className,
    children,
    ...rest
  },
  ref,
) {
  // Internal visibility state for self-managed dismissible alerts
  const [visible, setVisible] = useState(true);

  // If dismissed and no external onDismiss handler, hide the alert
  if (!visible && !onDismiss) {
    return null;
  }

  // Resolve ARIA role
  const resolvedRole = roleProp ?? defaultRoleMap[variant];

  // Resolve icon — use default variant icon unless explicitly overridden
  const DefaultIcon = defaultIconMap[variant];
  const showIcon = icon !== null;
  const resolvedIcon =
    icon !== undefined && icon !== null ? (
      <span className={cn("shrink-0 mt-0.5", iconColorMap[variant])}>
        {icon}
      </span>
    ) : icon === null ? null : (
      <span className={cn("shrink-0 mt-0.5", iconColorMap[variant])}>
        <DefaultIcon className="size-4" />
      </span>
    );

  // Handle dismiss
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      setVisible(false);
    }
  };

  return (
    <div
      ref={ref}
      role={resolvedRole}
      className={cn("not-prose", alertVariants({ variant }), className)}
      data-ds=""
      data-ds-component="alert"
      data-ds-variant={variant}
      {...rest}
    >
      {/* Icon */}
      {showIcon && resolvedIcon}

      {/* Content area */}
      <div className="flex-1 min-w-0">
        {/* Title */}
        {title && <div className="font-semibold leading-5 mb-1">{title}</div>}

        {/* Description / body */}
        {children && (
          <div className={cn("leading-5", title && "opacity-90")}>
            {children}
          </div>
        )}
      </div>

      {/* Dismiss button */}
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className={cn(
            "absolute top-3 right-3",
            "inline-flex items-center justify-center",
            "size-6 rounded-sm",
            "text-current opacity-50",
            "hover:opacity-100",
            "transition-opacity duration-fast",
            "focus-visible:outline-none focus-visible:border-current",
          )}
          aria-label={dismissLabel}
        >
          <CloseIcon className="size-4" />
        </button>
      )}
    </div>
  );
});

Alert.displayName = "Alert";
