"use client";

// ============================================================================
// Unified UI — Alert Component
// ============================================================================
// A static notification component for displaying contextual feedback messages.
// Built on the Unified UI token layer with CVA for variant composition.
//
// This component merges the former Alert and Callout components into a single
// unified API. All Callout features (collapsible mode, Framer Motion animation,
// default variant, expandHeight animation) are now part of Alert.
//
// Features:
//   - 5 semantic variants: info, success, warning, danger, default
//   - Auto-selected icon per variant (can be overridden or hidden)
//   - Title + description slots for structured content
//   - Dismissible option with close button and onDismiss callback
//   - Collapsible option with animated expand/collapse
//   - Optional Framer Motion entrance animation (fadeIn)
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
//   <Alert variant="info" title="FAQ" collapsible defaultOpen={false}>
//     Expandable content goes here.
//   </Alert>
// ============================================================================

import { expandHeight, fadeIn } from "@unified-ui/motion";
import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { forwardRef, type ReactNode, useState } from "react";

// ---------------------------------------------------------------------------
// Default Icons (Internal)
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

function ChevronDownIcon({ className }: { className?: string }) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Icon Map
// ---------------------------------------------------------------------------

const defaultIconMap: Record<AlertVariant, React.FC<{ className?: string }>> = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon,
  default: InfoIcon,
};

// ---------------------------------------------------------------------------
// CVA Variant Definition
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
    // Transition
    "transition-colors duration-fast",
  ],
  {
    variants: {
      variant: {
        /**
         * Info — informational messages, tips, notes.
         */
        info: ["bg-info-muted", "text-info-muted-foreground", "border-info/20"],

        /**
         * Success — positive outcomes, confirmations.
         */
        success: [
          "bg-success-muted",
          "text-success-muted-foreground",
          "border-success/20",
        ],

        /**
         * Warning — caution messages, deprecation notices.
         */
        warning: [
          "bg-warning-muted",
          "text-warning-muted-foreground",
          "border-warning/20",
        ],

        /**
         * Danger — error messages, destructive action warnings.
         */
        danger: [
          "bg-danger-muted",
          "text-danger-muted-foreground",
          "border-danger/20",
        ],

        /**
         * Default — neutral, generic notes without semantic meaning.
         * (Formerly only available in Callout.)
         */
        default: ["bg-muted", "text-muted-foreground", "border-border"],
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

const iconColorMap: Record<AlertVariant, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  default: "text-muted-foreground",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AlertVariant =
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "default";

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

// ---------------------------------------------------------------------------
// Default role map
// ---------------------------------------------------------------------------

const defaultRoleMap: Record<AlertVariant, "alert" | "status"> = {
  info: "status",
  success: "status",
  warning: "alert",
  danger: "alert",
  default: "status",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

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
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    variant = "info",
    title,
    icon,
    dismissible = false,
    onDismiss,
    dismissLabel = "Dismiss alert",
    collapsible = false,
    defaultOpen = true,
    animated = false,
    role: roleProp,
    className,
    children,
    ...rest
  },
  ref,
) {
  const shouldReduce = useReducedMotion();

  // Internal visibility state for self-managed dismissible alerts
  const [visible, setVisible] = useState(true);

  // Collapsible open/close state
  const [open, setOpen] = useState(defaultOpen);

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

  // Determine if we should use Framer Motion for entrance animation
  const useAnimation = animated && !shouldReduce;

  // Shared root props
  const rootClasses = cn("not-prose", alertVariants({ variant }), className);
  const rootDataAttrs = {
    "data-ds": "",
    "data-ds-component": "alert",
    "data-ds-variant": variant,
    ...(animated ? { "data-ds-animated": "" } : {}),
  };

  // Collapsible inner content (shared between animated / non-animated)
  const collapsibleInner = collapsible ? (
    <>
      {/* Collapsible header — button for a11y */}
      <button
        type="button"
        className={cn(
          "flex items-start gap-3 w-full text-left cursor-pointer",
          focusRingClasses,
          "rounded-sm",
        )}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {showIcon && resolvedIcon}
        <div className="flex-1 min-w-0">
          {title && <div className="font-semibold leading-5">{title}</div>}
        </div>
        <motion.span
          className="shrink-0 mt-0.5"
          animate={open ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.2 }}
          data-ds-animated=""
        >
          <ChevronDownIcon className="size-4 opacity-70" />
        </motion.span>
      </button>

      {/* Collapsible content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            variants={shouldReduce ? undefined : expandHeight.variants}
            initial={shouldReduce ? { opacity: 0 } : "initial"}
            animate={shouldReduce ? { opacity: 1 } : "animate"}
            exit={shouldReduce ? { opacity: 0 } : "exit"}
            transition={
              shouldReduce ? { duration: 0.15 } : expandHeight.transition
            }
            data-ds-animated=""
          >
            <div
              className={cn(
                "leading-5 pt-2",
                showIcon && "pl-7",
                title && "opacity-90",
              )}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  ) : null;

  // Standard inner content (shared between animated / non-animated)
  const standardInner = !collapsible ? (
    <>
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
    </>
  ) : null;

  // --- Animated root (motion.div) ---
  if (useAnimation) {
    return (
      <motion.div
        ref={ref}
        role={resolvedRole}
        className={rootClasses}
        variants={fadeIn.variants}
        initial="initial"
        animate="animate"
        transition={fadeIn.transition}
        {...rootDataAttrs}
      >
        {collapsible ? collapsibleInner : standardInner}
      </motion.div>
    );
  }

  // --- Static root (plain div) ---
  return (
    <div
      ref={ref}
      role={resolvedRole}
      className={rootClasses}
      {...rootDataAttrs}
      {...rest}
    >
      {collapsible ? collapsibleInner : standardInner}
    </div>
  );
});

Alert.displayName = "Alert";

// ---------------------------------------------------------------------------
// Callout — backward-compatible alias
// ---------------------------------------------------------------------------
// The Callout component has been merged into Alert. This alias preserves
// backward compatibility for existing imports. All Callout props map
// directly to Alert props:
//   - `collapsible` → `collapsible`
//   - `defaultOpen` → `defaultOpen`
//   - `variant="default"` → `variant="default"`
//
// Callout always renders with `animated={true}` to preserve the original
// Callout behavior of animating on mount with the fadeIn preset.
// ---------------------------------------------------------------------------

export type CalloutVariant = AlertVariant;

export interface CalloutProps
  extends Omit<
    AlertProps,
    "dismissible" | "onDismiss" | "dismissLabel" | "role"
  > {
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
export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  function Callout({ animated = true, className, ...rest }, ref) {
    return (
      <Alert
        ref={ref}
        animated={animated}
        className={cn("rounded-lg", className)}
        {...rest}
      />
    );
  },
);

Callout.displayName = "Callout";

export const calloutVariants = alertVariants;
