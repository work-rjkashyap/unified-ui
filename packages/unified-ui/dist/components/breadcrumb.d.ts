import * as react from 'react';
import { ReactNode } from 'react';

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

export { Breadcrumb, BreadcrumbEllipsis, type BreadcrumbEllipsisProps, BreadcrumbItem, type BreadcrumbItemProps, BreadcrumbLink, type BreadcrumbLinkProps, BreadcrumbList, type BreadcrumbListProps, BreadcrumbNav, type BreadcrumbNavItem, type BreadcrumbNavProps, BreadcrumbPage, type BreadcrumbPageProps, type BreadcrumbProps, BreadcrumbSeparator, type BreadcrumbSeparatorProps };
