"use client";

// ============================================================================
// Unified UI — Pagination Component
// ============================================================================
// A flexible pagination component for navigating paged data sets. Built on
// the Unified UI token layer with CVA for variant composition and
// tailwind-merge (via cn) for safe class merging.
//
// Features:
//   - Page number buttons with smart ellipsis truncation
//   - Previous / Next navigation buttons
//   - 2 sizes: sm, md
//   - Controlled and uncontrolled modes
//   - "Page X of Y" compact display variant
//   - Configurable sibling and boundary page counts
//   - Disabled state for prev/next at boundaries
//   - Full ref forwarding
//   - WCAG AA accessible: nav landmark, aria-label, aria-current, focus ring
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { Pagination } from "@/design-system/components/pagination";
//
//   // Controlled
//   <Pagination
//     page={currentPage}
//     totalPages={20}
//     onPageChange={setCurrentPage}
//   />
//
//   // Uncontrolled (starts at page 1)
//   <Pagination totalPages={10} />
//
//   // Compact "Page X of Y" variant
//   <Pagination
//     page={3}
//     totalPages={10}
//     variant="compact"
//     onPageChange={setPage}
//   />
//
//   // Small size
//   <Pagination totalPages={50} size="sm" />
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { focusRingCompactClasses } from "@unified-ui/utils/focus-ring";
import { cva } from "class-variance-authority";
import { forwardRef, useCallback, useMemo, useState } from "react";

// ---------------------------------------------------------------------------
// Internal Icons
// ---------------------------------------------------------------------------

function ChevronLeftIcon({ className }: { className?: string }) {
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
			<path d="m15 18-6-6 6-6" />
		</svg>
	);
}

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

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PaginationSize = "sm" | "md";

export type PaginationVariant = "default" | "compact";

/** An item in the computed page range — either a page number or an ellipsis. */
type PageItem =
	| { type: "page"; value: number }
	| { type: "ellipsis"; key: string };

// ---------------------------------------------------------------------------
// CVA: Page Button Variants
// ---------------------------------------------------------------------------

export const paginationButtonVariants = cva(
	[
		// Layout
		"inline-flex items-center justify-center",
		// Shape
		"rounded-md",
		// Typography
		"font-medium tabular-nums",
		// Transitions
		"transition-colors duration-fast",
		// Focus
		focusRingCompactClasses,
		// Disabled
		"disabled:pointer-events-none disabled:opacity-40",
		// Cursor
		"cursor-pointer",
		"select-none",
	],
	{
		variants: {
			size: {
				sm: "h-7 min-w-7 px-1.5 text-xs gap-1",
				md: "h-9 min-w-9 px-2 text-sm gap-1.5",
			},
			active: {
				true: "bg-primary text-primary-foreground hover:bg-primary-hover",
				false: "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
			},
		},
		defaultVariants: {
			size: "md",
			active: false,
		},
	},
);

// ---------------------------------------------------------------------------
// Page Range Calculation
// ---------------------------------------------------------------------------
// Generates a list of page items to render, including ellipsis markers
// when the total number of pages exceeds what can be shown.
//
// Algorithm:
//   1. Always show the first `boundary` pages and last `boundary` pages.
//   2. Show `siblings` pages on each side of the current page.
//   3. Insert ellipsis ("…") between gaps.
//
// Example (siblings=1, boundary=1, current=5, total=10):
//   [1, …, 4, 5, 6, …, 10]
// ---------------------------------------------------------------------------

function computePageRange(
	currentPage: number,
	totalPages: number,
	siblings: number,
	boundary: number,
): PageItem[] {
	// Build a set of page numbers that should be visible
	const pages = new Set<number>();

	// Boundary pages (start)
	for (let i = 1; i <= Math.min(boundary, totalPages); i++) {
		pages.add(i);
	}

	// Boundary pages (end)
	for (let i = Math.max(1, totalPages - boundary + 1); i <= totalPages; i++) {
		pages.add(i);
	}

	// Sibling pages around current
	for (
		let i = Math.max(1, currentPage - siblings);
		i <= Math.min(totalPages, currentPage + siblings);
		i++
	) {
		pages.add(i);
	}

	// Sort and convert to items with ellipsis
	const sorted = Array.from(pages).sort((a, b) => a - b);
	const items: PageItem[] = [];

	for (let i = 0; i < sorted.length; i++) {
		const page = sorted[i];

		// Check for gap before this page
		if (i > 0 && page - sorted[i - 1] > 1) {
			items.push({
				type: "ellipsis",
				key: `ellipsis-${sorted[i - 1]}-${page}`,
			});
		}

		items.push({ type: "page", value: page });
	}

	return items;
}

// ---------------------------------------------------------------------------
// Size maps
// ---------------------------------------------------------------------------

const iconSizeMap: Record<PaginationSize, string> = {
	sm: "size-3.5",
	md: "size-4",
};

const ellipsisSizeMap: Record<PaginationSize, string> = {
	sm: "h-7 min-w-7 text-xs",
	md: "h-9 min-w-9 text-sm",
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface PaginationProps extends Omit<
	React.HTMLAttributes<HTMLElement>,
	"onChange"
> {
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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

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
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
	function Pagination(
		{
			totalPages,
			page: controlledPage,
			defaultPage = 1,
			onPageChange,
			variant = "default",
			size = "md",
			siblings = 1,
			boundary = 1,
			showPrevNext = true,
			prevLabel = "Previous",
			nextLabel = "Next",
			"aria-label": ariaLabel = "Pagination",
			className,
			...rest
		},
		ref,
	) {
		// Uncontrolled state
		const [internalPage, setInternalPage] = useState(defaultPage);
		const isControlled = controlledPage !== undefined;
		const currentPage = Math.max(
			1,
			Math.min(isControlled ? controlledPage : internalPage, totalPages),
		);

		const handlePageChange = useCallback(
			(newPage: number) => {
				const clamped = Math.max(1, Math.min(newPage, totalPages));
				if (!isControlled) {
					setInternalPage(clamped);
				}
				onPageChange?.(clamped);
			},
			[isControlled, totalPages, onPageChange],
		);

		const isFirstPage = currentPage === 1;
		const isLastPage = currentPage === totalPages;

		// Compute page items for the default variant
		const pageItems = useMemo(
			() =>
				variant === "default"
					? computePageRange(
							currentPage,
							totalPages,
							siblings,
							boundary,
						)
					: [],
			[variant, currentPage, totalPages, siblings, boundary],
		);

		// ----- Compact variant -----
		if (variant === "compact") {
			return (
				<nav
					ref={ref}
					aria-label={ariaLabel}
					className={cn("inline-flex items-center gap-1", className)}
					data-ds=""
					data-ds-component="pagination"
					data-ds-variant="compact"
					data-ds-size={size}
					{...rest}
				>
					{showPrevNext && (
						<button
							type="button"
							disabled={isFirstPage}
							onClick={() => handlePageChange(currentPage - 1)}
							className={cn(
								paginationButtonVariants({
									size,
									active: false,
								}),
							)}
							aria-label={prevLabel}
						>
							<ChevronLeftIcon className={iconSizeMap[size]} />
						</button>
					)}

					<span
						className={cn(
							"inline-flex items-center justify-center px-3",
							"text-foreground font-medium tabular-nums",
							size === "sm" ? "text-xs" : "text-sm",
						)}
					>
						Page {currentPage} of {totalPages}
					</span>

					{showPrevNext && (
						<button
							type="button"
							disabled={isLastPage}
							onClick={() => handlePageChange(currentPage + 1)}
							className={cn(
								paginationButtonVariants({
									size,
									active: false,
								}),
							)}
							aria-label={nextLabel}
						>
							<ChevronRightIcon className={iconSizeMap[size]} />
						</button>
					)}
				</nav>
			);
		}

		// ----- Default variant -----
		return (
			<nav
				ref={ref}
				aria-label={ariaLabel}
				className={cn("inline-flex items-center gap-1", className)}
				data-ds=""
				data-ds-component="pagination"
				data-ds-variant="default"
				data-ds-size={size}
				{...rest}
			>
				{/* Previous button */}
				{showPrevNext && (
					<button
						type="button"
						disabled={isFirstPage}
						onClick={() => handlePageChange(currentPage - 1)}
						className={cn(
							paginationButtonVariants({ size, active: false }),
						)}
						aria-label={prevLabel}
					>
						<ChevronLeftIcon className={iconSizeMap[size]} />
						<span className="sr-only sm:not-sr-only">
							{prevLabel}
						</span>
					</button>
				)}

				{/* Page numbers */}
				{pageItems.map((item) => {
					if (item.type === "ellipsis") {
						return (
							<span
								key={item.key}
								className={cn(
									"inline-flex items-center justify-center",
									"text-muted-foreground select-none",
									ellipsisSizeMap[size],
								)}
								aria-hidden="true"
							>
								…
							</span>
						);
					}

					const isActive = item.value === currentPage;
					return (
						<button
							key={item.value}
							type="button"
							onClick={() => handlePageChange(item.value)}
							className={cn(
								paginationButtonVariants({
									size,
									active: isActive,
								}),
							)}
							aria-current={isActive ? "page" : undefined}
							aria-label={`Page ${item.value}`}
						>
							{item.value}
						</button>
					);
				})}

				{/* Next button */}
				{showPrevNext && (
					<button
						type="button"
						disabled={isLastPage}
						onClick={() => handlePageChange(currentPage + 1)}
						className={cn(
							paginationButtonVariants({ size, active: false }),
						)}
						aria-label={nextLabel}
					>
						<span className="sr-only sm:not-sr-only">
							{nextLabel}
						</span>
						<ChevronRightIcon className={iconSizeMap[size]} />
					</button>
				)}
			</nav>
		);
	},
);

Pagination.displayName = "Pagination";
