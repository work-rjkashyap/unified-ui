import * as react from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';

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

export { Pagination, type PaginationProps, type PaginationSize, type PaginationVariant, paginationButtonVariants };
