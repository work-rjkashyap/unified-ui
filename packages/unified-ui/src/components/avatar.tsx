"use client";

// ============================================================================
// Unified UI — Avatar Component
// ============================================================================
// A user identity component for displaying profile images, initials, or icon
// fallbacks. Built on the Unified UI token layer with CVA for variant
// composition.
//
// Features:
//   - 5 sizes: xs (24px), sm (32px), md (40px), lg (48px), xl (64px)
//   - 2 shapes: circle (default), square (rounded-md)
//   - Image with automatic fallback (initials or icon)
//   - Status indicator dot (online, offline, busy, away)
//   - AvatarGroup for stacked display with "+N" overflow
//   - Full ref forwarding
//   - WCAG AA accessible: alt text, role="img" for fallback, status aria-label
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { Avatar, AvatarGroup } from "@/design-system/components/avatar";
//
//   <Avatar src="/photo.jpg" alt="Jane Doe" />
//   <Avatar name="Jane Doe" />
//   <Avatar name="Jane Doe" status="online" />
//   <Avatar src="/photo.jpg" alt="Jane Doe" shape="square" size="lg" />
//
//   <AvatarGroup max={3}>
//     <Avatar src="/a.jpg" alt="Alice" />
//     <Avatar src="/b.jpg" alt="Bob" />
//     <Avatar src="/c.jpg" alt="Charlie" />
//     <Avatar src="/d.jpg" alt="Diana" />
//   </AvatarGroup>
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useEffect,
  useState,
} from "react";

// ---------------------------------------------------------------------------
// CVA Variant Definition — Avatar Root
// ---------------------------------------------------------------------------

export const avatarVariants = cva(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "relative inline-flex items-center justify-center shrink-0",
    // Typography for fallback initials
    "font-medium leading-none select-none",
    // Default colors for fallback state
    "bg-muted text-muted-foreground",
    // Border for visual separation on grouped/colored backgrounds
    "ring-2 ring-background",
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Extra small — 24px. Inline metadata, compact lists.
         */
        xs: "size-6 text-[10px]",

        /**
         * Small — 32px. Table rows, compact cards.
         */
        sm: "size-8 text-xs",

        /**
         * Medium — 40px. Default, cards, comments.
         */
        md: "size-10 text-sm",

        /**
         * Large — 48px. Profile headers, featured content.
         */
        lg: "size-12 text-base",

        /**
         * Extra large — 64px. Profile pages, hero sections.
         */
        xl: "size-16 text-lg",
      },

      // -----------------------------------------------------------------
      // Shape Variants
      // -----------------------------------------------------------------
      shape: {
        /**
         * Circle — default, standard avatar shape.
         */
        circle: "rounded-full",

        /**
         * Square — rounded rectangle, for app icons or org logos.
         */
        square: "rounded-md",
      },
    },

    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  },
);

// ---------------------------------------------------------------------------
// Status Indicator Styles
// ---------------------------------------------------------------------------

export type AvatarStatus = "online" | "offline" | "busy" | "away";

const statusColorMap: Record<AvatarStatus, string> = {
  online: "bg-success",
  offline: "bg-muted-foreground",
  busy: "bg-danger",
  away: "bg-warning",
};

const statusLabelMap: Record<AvatarStatus, string> = {
  online: "Online",
  offline: "Offline",
  busy: "Busy",
  away: "Away",
};

// Status dot sizes relative to avatar size
const statusSizeMap: Record<AvatarSize, string> = {
  xs: "size-1.5",
  sm: "size-2",
  md: "size-2.5",
  lg: "size-3",
  xl: "size-3.5",
};

// Status dot position — anchored to bottom-right corner
const statusPositionMap: Record<AvatarSize, string> = {
  xs: "bottom-0 right-0",
  sm: "bottom-0 right-0",
  md: "bottom-0.5 right-0.5",
  lg: "bottom-0.5 right-0.5",
  xl: "bottom-1 right-1",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "square";

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof avatarVariants> {
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

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

/**
 * Extracts initials from a full name string.
 * Takes the first character of the first and last name segments.
 *
 * @example
 *   getInitials("Jane Doe")     → "JD"
 *   getInitials("Alice")        → "A"
 *   getInitials("John A. Smith") → "JS"
 *   getInitials("")             → ""
 */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// ---------------------------------------------------------------------------
// Default Fallback Icon (Internal)
// ---------------------------------------------------------------------------
// A minimal user silhouette SVG used when no image, name, or custom
// fallback icon is provided.
// ---------------------------------------------------------------------------

function DefaultFallbackIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-[60%] text-current opacity-60", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 1.79-7 4v1a1 1 0 001 1h12a1 1 0 001-1v-1c0-2.21-3.134-4-7-4z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Status Dot (Internal)
// ---------------------------------------------------------------------------

function StatusDot({
  status,
  size,
  label,
  shape,
}: {
  status: AvatarStatus;
  size: AvatarSize;
  label?: string;
  shape: AvatarShape;
}) {
  const resolvedLabel = label ?? statusLabelMap[status];

  return (
    <span
      className={cn(
        "absolute block",
        "rounded-full",
        "ring-2 ring-background",
        statusSizeMap[size],
        statusColorMap[status],
        // Position based on shape — circle uses corner, square uses edge
        shape === "circle" ? statusPositionMap[size] : "bottom-0 right-0",
      )}
      role="status"
      aria-label={resolvedLabel}
    />
  );
}

// ---------------------------------------------------------------------------
// Image Loader Hook (Internal)
// ---------------------------------------------------------------------------
// Tracks image loading state to enable graceful fallback when the src
// fails to load or hasn't loaded yet.
// ---------------------------------------------------------------------------

type ImageLoadStatus = "loading" | "loaded" | "error";

function useImageLoadStatus(src?: string | null): ImageLoadStatus {
  const [status, setStatus] = useState<ImageLoadStatus>(() =>
    src ? "loading" : "error",
  );

  useEffect(() => {
    if (!src) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    const img = new Image();

    const handleLoad = () => setStatus("loaded");
    const handleError = () => setStatus("error");

    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleError);
    img.src = src;

    // If the image is already cached, the load event might not fire
    if (img.complete) {
      setStatus("loaded");
    }

    return () => {
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
    };
  }, [src]);

  return status;
}

// ---------------------------------------------------------------------------
// Avatar Component
// ---------------------------------------------------------------------------

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
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  {
    src,
    alt,
    name,
    size = "md",
    shape = "circle",
    status,
    statusLabel,
    fallbackIcon,
    fallbackClassName,
    className,
    children,
    ...rest
  },
  ref,
) {
  const imageStatus = useImageLoadStatus(src);
  const showImage = imageStatus === "loaded" && src;
  const initials = name ? getInitials(name) : "";
  const resolvedAlt = alt ?? name ?? "Avatar";

  const imgEl = showImage ? (
    <img
      src={src}
      alt={resolvedAlt}
      className="size-full object-cover"
      draggable={false}
    />
  ) : null;

  return (
    <span
      ref={ref}
      className={cn(
        avatarVariants({ size, shape }),
        !showImage && fallbackClassName,
        className,
      )}
      data-ds=""
      data-ds-component="avatar"
      data-ds-size={size}
      data-ds-shape={shape}
      {...rest}
    >
      {/* Inner container — clips content to the avatar shape */}
      <span className="absolute inset-0 overflow-hidden rounded-[inherit] flex items-center justify-center">
        {/* Priority 1: Custom children override everything */}
        {children ? (
          children
        ) : showImage ? (
          /* Priority 2: Loaded image */
          imgEl
        ) : initials ? (
          /* Priority 3: Initials from name */
          <span role="img" aria-label={resolvedAlt}>
            {initials}
          </span>
        ) : (
          /* Priority 4: Fallback icon */
          <span role="img" aria-label={resolvedAlt}>
            {fallbackIcon ?? <DefaultFallbackIcon />}
          </span>
        )}
      </span>

      {/* Status indicator */}
      {status && (
        <StatusDot
          status={status}
          size={size}
          label={statusLabel}
          shape={shape}
        />
      )}
    </span>
  );
});

Avatar.displayName = "Avatar";

// ===========================================================================
// AvatarGroup Component
// ===========================================================================
// Stacks multiple avatars with overlap and shows a "+N" overflow indicator
// when the number of avatars exceeds the `max` prop.
// ===========================================================================

// ---------------------------------------------------------------------------
// Types — AvatarGroup
// ---------------------------------------------------------------------------

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
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

// ---------------------------------------------------------------------------
// Overlap Spacing Maps
// ---------------------------------------------------------------------------

const overlapMap: Record<AvatarSize, Record<string, string>> = {
  xs: { tight: "-ml-2", default: "-ml-1.5", loose: "-ml-1" },
  sm: { tight: "-ml-3", default: "-ml-2", loose: "-ml-1.5" },
  md: { tight: "-ml-4", default: "-ml-3", loose: "-ml-2" },
  lg: { tight: "-ml-5", default: "-ml-3.5", loose: "-ml-2.5" },
  xl: { tight: "-ml-6", default: "-ml-4", loose: "-ml-3" },
};

// ---------------------------------------------------------------------------
// AvatarGroup Component
// ---------------------------------------------------------------------------

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
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup(
    {
      max = 5,
      size = "md",
      shape = "circle",
      spacing = "default",
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const childArray = Children.toArray(children).filter(isValidElement);
    const totalCount = childArray.length;
    const overflowCount = max > 0 && totalCount > max ? totalCount - max : 0;
    const visibleChildren =
      overflowCount > 0 ? childArray.slice(0, max) : childArray;

    const overlapClass = overlapMap[size][spacing];

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center", className)}
        role="group"
        aria-label={`Group of ${totalCount} avatars`}
        data-ds=""
        data-ds-component="avatar-group"
        {...rest}
      >
        {visibleChildren.map((child, index) => {
          if (!isValidElement(child)) return child;

          return (
            <span
              key={
                (
                  child as ReactElement<{
                    alt?: string;
                    name?: string;
                  }>
                ).props?.alt ??
                (
                  child as ReactElement<{
                    alt?: string;
                    name?: string;
                  }>
                ).props?.name ??
                index
              }
              className={cn(
                index > 0 && overlapClass,
                // Ensure proper stacking order (first avatar on top)
                "relative",
              )}
              style={{ zIndex: totalCount - index }}
            >
              {cloneElement(child as ReactElement<AvatarProps>, {
                size,
                shape,
              })}
            </span>
          );
        })}

        {/* Overflow indicator */}
        {overflowCount > 0 && (
          <span className={cn(overlapClass, "relative")} style={{ zIndex: 0 }}>
            <span
              className={cn(
                avatarVariants({ size, shape }),
                "bg-muted text-muted-foreground",
                "font-semibold",
              )}
              role="img"
              aria-label={`${overflowCount} more`}
              data-ds=""
              data-ds-component="avatar-overflow"
            >
              +{overflowCount}
            </span>
          </span>
        )}
      </div>
    );
  },
);

AvatarGroup.displayName = "AvatarGroup";
