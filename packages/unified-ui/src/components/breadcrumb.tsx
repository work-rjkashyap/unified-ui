"use client";

// ============================================================================
// Unified UI — Breadcrumb Component
// ============================================================================
// A navigation breadcrumb component for showing the user's current location
// within a hierarchical site structure. Built on the Unified UI token layer
// with tailwind-merge (via cn) for safe class merging.
//
// Features:
//   - Composable sub-components for full control
//   - BreadcrumbNav shorthand for common use cases
//   - Auto-truncation with ellipsis for long paths (configurable maxItems)
//   - Custom separator support (string or ReactNode)
//   - Current page highlight (non-linked, aria-current="page")
//   - Uses Caption typography sizing for compact appearance
//   - Full ref forwarding on all sub-components
//   - WCAG AA accessible: nav landmark, aria-label, ordered list, focus ring
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import {
//     Breadcrumb, BreadcrumbList, BreadcrumbItem,
//     BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
//     BreadcrumbEllipsis, BreadcrumbNav,
//   } from "@/design-system/components/breadcrumb";
//
//   // Composable API
//   <Breadcrumb>
//     <BreadcrumbList>
//       <BreadcrumbItem>
//         <BreadcrumbLink href="/">Home</BreadcrumbLink>
//       </BreadcrumbItem>
//       <BreadcrumbSeparator />
//       <BreadcrumbItem>
//         <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
//       </BreadcrumbItem>
//       <BreadcrumbSeparator />
//       <BreadcrumbItem>
//         <BreadcrumbPage>Getting Started</BreadcrumbPage>
//       </BreadcrumbItem>
//     </BreadcrumbList>
//   </Breadcrumb>
//
//   // Shorthand API
//   <BreadcrumbNav
//     items={[
//       { label: "Home", href: "/" },
//       { label: "Docs", href: "/docs" },
//       { label: "Components", href: "/docs/components" },
//       { label: "Breadcrumb" },
//     ]}
//     maxItems={4}
//   />
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { focusRingCompactClasses } from "@unified-ui/utils/focus-ring";
import { forwardRef, type ReactNode, useMemo } from "react";

// ---------------------------------------------------------------------------
// Internal Icons
// ---------------------------------------------------------------------------

function ChevronRightIcon({ className }: { className?: string }) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function MoreHorizontalIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}

// ===========================================================================
// Breadcrumb (Root) — <nav>
// ===========================================================================

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
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
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb(
    { "aria-label": ariaLabel = "Breadcrumb", className, children, ...rest },
    ref,
  ) {
    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={cn("not-prose", className)}
        data-ds=""
        data-ds-component="breadcrumb"
        {...rest}
      >
        {children}
      </nav>
    );
  },
);

Breadcrumb.displayName = "Breadcrumb";

// ===========================================================================
// BreadcrumbList — <ol>
// ===========================================================================

export interface BreadcrumbListProps
  extends React.HTMLAttributes<HTMLOListElement> {
  /** Additional CSS classes. */
  className?: string;
  /** List children. */
  children?: ReactNode;
}

/**
 * BreadcrumbList — an ordered list containing breadcrumb items.
 */
export const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  function BreadcrumbList({ className, children, ...rest }, ref) {
    return (
      <ol
        ref={ref}
        className={cn(
          "flex flex-wrap items-center gap-1.5",
          "text-xs leading-4 tracking-wide",
          "text-muted-foreground",
          className,
        )}
        data-ds=""
        data-ds-component="breadcrumb-list"
        {...rest}
      >
        {children}
      </ol>
    );
  },
);

BreadcrumbList.displayName = "BreadcrumbList";

// ===========================================================================
// BreadcrumbItem — <li>
// ===========================================================================

export interface BreadcrumbItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  /** Additional CSS classes. */
  className?: string;
}

/**
 * BreadcrumbItem — a single item in the breadcrumb trail.
 */
export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ className, children, ...rest }, ref) {
    return (
      <li
        ref={ref}
        className={cn("inline-flex items-center gap-1.5", className)}
        data-ds=""
        data-ds-component="breadcrumb-item"
        {...rest}
      >
        {children}
      </li>
    );
  },
);

BreadcrumbItem.displayName = "BreadcrumbItem";

// ===========================================================================
// BreadcrumbLink — <a>
// ===========================================================================

export interface BreadcrumbLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
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
export const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(function BreadcrumbLink({ className, children, ...rest }, ref) {
  return (
    <a
      ref={ref}
      className={cn(
        "no-underline",
        "text-muted-foreground",
        "transition-colors duration-fast",
        "hover:text-foreground",
        focusRingCompactClasses,
        "rounded-sm",
        className,
      )}
      data-ds=""
      data-ds-component="breadcrumb-link"
      {...rest}
    >
      {children}
    </a>
  );
});

BreadcrumbLink.displayName = "BreadcrumbLink";

// ===========================================================================
// BreadcrumbPage — current page (non-linked)
// ===========================================================================

export interface BreadcrumbPageProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Additional CSS classes. */
  className?: string;
}

/**
 * BreadcrumbPage — the current (non-linked) page in the breadcrumb trail.
 *
 * Rendered with `aria-current="page"` and a distinct foreground color
 * to indicate the user's current location.
 */
export const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  function BreadcrumbPage({ className, children, ...rest }, ref) {
    return (
      <span
        ref={ref}
        aria-current="page"
        className={cn("font-medium", "text-foreground", className)}
        data-ds=""
        data-ds-component="breadcrumb-page"
        {...rest}
      >
        {children}
      </span>
    );
  },
);

BreadcrumbPage.displayName = "BreadcrumbPage";

// ===========================================================================
// BreadcrumbSeparator
// ===========================================================================

export interface BreadcrumbSeparatorProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
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
export const BreadcrumbSeparator = forwardRef<
  HTMLLIElement,
  BreadcrumbSeparatorProps
>(function BreadcrumbSeparator({ className, children, ...rest }, ref) {
  return (
    <li
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn(
        "inline-flex items-center",
        "text-muted-foreground/60",
        "[&>svg]:size-3",
        className,
      )}
      data-ds=""
      data-ds-component="breadcrumb-separator"
      {...rest}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  );
});

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

// ===========================================================================
// BreadcrumbEllipsis
// ===========================================================================

export interface BreadcrumbEllipsisProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Additional CSS classes. */
  className?: string;
}

/**
 * BreadcrumbEllipsis — a "…" placeholder indicating truncated items.
 *
 * Used by `BreadcrumbNav` when items exceed `maxItems`. Can also be
 * used manually in the composable API.
 */
export const BreadcrumbEllipsis = forwardRef<
  HTMLSpanElement,
  BreadcrumbEllipsisProps
>(function BreadcrumbEllipsis({ className, ...rest }, ref) {
  return (
    <span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn(
        "inline-flex items-center justify-center size-5",
        "text-muted-foreground",
        className,
      )}
      data-ds=""
      data-ds-component="breadcrumb-ellipsis"
      {...rest}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
});

BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

// ===========================================================================
// BreadcrumbNav — composed shorthand
// ===========================================================================
// A convenience component that accepts an array of items and renders the
// full breadcrumb structure automatically, including truncation via
// ellipsis when the item count exceeds `maxItems`.
// ===========================================================================

export interface BreadcrumbNavItem {
  /** Display label for the breadcrumb segment. */
  label: ReactNode;
  /**
   * URL to navigate to. When omitted, the item is rendered as the
   * current page (non-linked, last item).
   */
  href?: string;
}

export interface BreadcrumbNavProps extends Omit<BreadcrumbProps, "children"> {
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
export const BreadcrumbNav = forwardRef<HTMLElement, BreadcrumbNavProps>(
  function BreadcrumbNav(
    {
      items,
      maxItems = Number.POSITIVE_INFINITY,
      separator,
      className,
      ...rest
    },
    ref,
  ) {
    // Compute visible items (with potential truncation)
    const visibleItems = useMemo(() => {
      if (
        items.length <= maxItems ||
        maxItems < 2 ||
        !Number.isFinite(maxItems)
      ) {
        return { items, truncated: false };
      }

      // Always show first item + last (maxItems - 2) items, with ellipsis
      const tailCount = maxItems - 2; // -1 for first, -1 for ellipsis
      const first = items[0];
      const tail = items.slice(items.length - Math.max(tailCount, 1));

      return {
        items: [first, ...tail],
        truncated: true,
      };
    }, [items, maxItems]);

    return (
      <Breadcrumb ref={ref} className={className} {...rest}>
        <BreadcrumbList>
          {visibleItems.items.flatMap((item, index) => {
            const itemKey = item.href ?? `page-${index}`;
            const isLast = index === visibleItems.items.length - 1;
            const isFirst = index === 0;
            const showEllipsis = visibleItems.truncated && isFirst;

            const elements: ReactNode[] = [];

            elements.push(
              <BreadcrumbItem key={`item-${itemKey}`}>
                {isLast && !item.href ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>,
            );

            // Ellipsis after first item
            if (showEllipsis) {
              elements.push(
                <BreadcrumbSeparator key="sep-ellipsis-before">
                  {separator}
                </BreadcrumbSeparator>,
                <BreadcrumbItem key="ellipsis">
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>,
              );
            }

            // Separator (not after last item)
            if (!isLast) {
              elements.push(
                <BreadcrumbSeparator key={`sep-${itemKey}`}>
                  {separator}
                </BreadcrumbSeparator>,
              );
            }

            return elements;
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );
  },
);

BreadcrumbNav.displayName = "BreadcrumbNav";
