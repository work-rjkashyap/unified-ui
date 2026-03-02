"use client";

// ============================================================================
// Unified UI — Table Component
// ============================================================================
// A semantic, accessible data table component built on the Unified UI token
// layer with CVA for variant composition and tailwind-merge (via cn) for
// safe class merging.
//
// Features:
//   - Semantic HTML: <table>, <thead>, <tbody>, <tfoot>, <tr>, <th>, <td>
//   - Striped rows option (alternating background)
//   - Hoverable rows option (highlight on hover)
//   - Sticky header support
//   - Responsive: horizontal scroll wrapper on mobile
//   - Density: compact vs comfortable row heights
//   - Sort indicator integration (visual only — logic is consumer-owned)
//   - Bordered variant (adds cell borders)
//   - Full ref forwarding on all sub-components
//   - WCAG AA accessible: proper scope attributes, caption support
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import {
//     Table, TableHeader, TableBody, TableFooter,
//     TableRow, TableHead, TableCell, TableCaption,
//   } from "@/design-system/components/table";
//
//   <Table striped hoverable>
//     <TableCaption>Monthly revenue</TableCaption>
//     <TableHeader>
//       <TableRow>
//         <TableHead sortable sorted="asc" onSort={handleSort}>Month</TableHead>
//         <TableHead align="right">Revenue</TableHead>
//       </TableRow>
//     </TableHeader>
//     <TableBody>
//       <TableRow>
//         <TableCell>January</TableCell>
//         <TableCell align="right">$12,000</TableCell>
//       </TableRow>
//     </TableBody>
//   </Table>
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { focusRingCompactClasses } from "@unified-ui/utils/focus-ring";
import { cva, type VariantProps } from "class-variance-authority";
import { createContext, forwardRef, useContext } from "react";

// ---------------------------------------------------------------------------
// Table Context
// ---------------------------------------------------------------------------
// Shares configuration (density, striped, hoverable, bordered) from the
// root <Table> down to child sub-components so they don't need individual
// props for every shared concern.
// ---------------------------------------------------------------------------

interface TableContextValue {
	density: TableDensity;
	striped: boolean;
	hoverable: boolean;
	bordered: boolean;
}

const TableContext = createContext<TableContextValue>({
	density: "comfortable",
	striped: false,
	hoverable: false,
	bordered: false,
});

function useTableContext(): TableContextValue {
	return useContext(TableContext);
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TableDensity = "compact" | "comfortable";

export type TableSortDirection = "asc" | "desc";

export type TableAlign = "left" | "center" | "right";

// ---------------------------------------------------------------------------
// Sort Icons (Internal)
// ---------------------------------------------------------------------------

function SortAscIcon({ className }: { className?: string }) {
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
			<path d="m5 15 7-7 7 7" />
		</svg>
	);
}

function SortDescIcon({ className }: { className?: string }) {
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
			<path d="m19 9-7 7-7-7" />
		</svg>
	);
}

function SortNeutralIcon({ className }: { className?: string }) {
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
			<path d="m7 15 5 5 5-5" />
			<path d="m7 9 5-5 5 5" />
		</svg>
	);
}

// ---------------------------------------------------------------------------
// CVA: Table Root Variants
// ---------------------------------------------------------------------------

export const tableRootVariants = cva(
	["w-full", "caption-bottom", "text-sm", "border-collapse", "m-0"],
	{
		variants: {
			density: {
				compact: "",
				comfortable: "",
			},
		},
		defaultVariants: {
			density: "comfortable",
		},
	},
);

// ---------------------------------------------------------------------------
// Density → padding maps
// ---------------------------------------------------------------------------

const densityHeadPadding: Record<TableDensity, string> = {
	compact: "px-3 py-1.5",
	comfortable: "px-4 py-2.5",
};

const densityCellPadding: Record<TableDensity, string> = {
	compact: "px-3 py-1.5",
	comfortable: "px-4 py-2",
};

// ---------------------------------------------------------------------------
// Alignment map
// ---------------------------------------------------------------------------

const alignClassMap: Record<TableAlign, string> = {
	left: "text-left",
	center: "text-center",
	right: "text-right",
};

// ===========================================================================
// Table (Root)
// ===========================================================================

export interface TableProps
	extends
		React.HTMLAttributes<HTMLTableElement>,
		VariantProps<typeof tableRootVariants> {
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
export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
	{
		density = "comfortable",
		striped = false,
		hoverable = false,
		bordered = false,
		responsive = true,
		wrapperClassName,
		className,
		children,
		...rest
	},
	ref,
) {
	const contextValue: TableContextValue = {
		density,
		striped,
		hoverable,
		bordered,
	};

	const table = (
		<TableContext.Provider value={contextValue}>
			<table
				ref={ref}
				className={cn(
					"not-prose",
					tableRootVariants({ density }),
					bordered && !responsive && "border border-border rounded-md",
					className,
				)}
				data-ds=""
				data-ds-component="table"
				data-ds-density={density}
				{...rest}
			>
				{children}
			</table>
		</TableContext.Provider>
	);

	if (responsive) {
		return (
			<div
				className={cn(
					"not-prose",
					"w-full overflow-x-auto overflow-y-hidden",
					"rounded-md border border-border",
					wrapperClassName,
				)}
				data-ds=""
				data-ds-component="table-wrapper"
			>
				{table}
			</div>
		);
	}

	return table;
});

Table.displayName = "Table";

// ===========================================================================
// TableHeader (<thead>)
// ===========================================================================

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
	/** Additional CSS classes. */
	className?: string;
}

/**
 * TableHeader — wraps `<thead>` with design-system styles.
 */
export const TableHeader = forwardRef<
	HTMLTableSectionElement,
	TableHeaderProps
>(function TableHeader({ className, children, ...rest }, ref) {
	return (
		<thead
			ref={ref}
			className={cn(
				"bg-muted/50",
				"[&_tr]:border-b [&_tr]:border-border",
				className,
			)}
			data-ds=""
			data-ds-component="table-header"
			{...rest}
		>
			{children}
		</thead>
	);
});

TableHeader.displayName = "TableHeader";

// ===========================================================================
// TableBody (<tbody>)
// ===========================================================================

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
	/** Additional CSS classes. */
	className?: string;
}

/**
 * TableBody — wraps `<tbody>` with design-system styles.
 */
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
	function TableBody({ className, children, ...rest }, ref) {
		const { striped, hoverable, bordered } = useTableContext();

		return (
			<tbody
				ref={ref}
				className={cn(
					// Last row: no bottom border (the wrapper/table border handles it)
					"[&_tr:last-child]:border-b-0",
					// Row borders
					"[&_tr]:border-b [&_tr]:border-border-muted",
					// Striped rows
					striped && "**:data-[ds-row-index=odd]:bg-muted/30",
					// Hoverable rows
					hoverable &&
						"[&_tr]:transition-colors [&_tr]:duration-fast [&_tr:hover]:bg-muted/50",
					// Bordered cells
					bordered &&
						"[&_td]:border-r [&_td]:border-border-muted [&_td:last-child]:border-r-0",
					className,
				)}
				data-ds=""
				data-ds-component="table-body"
				{...rest}
			>
				{children}
			</tbody>
		);
	},
);

TableBody.displayName = "TableBody";

// ===========================================================================
// TableFooter (<tfoot>)
// ===========================================================================

export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
	/** Additional CSS classes. */
	className?: string;
}

/**
 * TableFooter — wraps `<tfoot>` with design-system styles.
 */
export const TableFooter = forwardRef<
	HTMLTableSectionElement,
	TableFooterProps
>(function TableFooter({ className, children, ...rest }, ref) {
	return (
		<tfoot
			ref={ref}
			className={cn(
				"bg-muted/50",
				"border-t border-border",
				"font-medium",
				"[&_tr]:border-b-0",
				className,
			)}
			data-ds=""
			data-ds-component="table-footer"
			{...rest}
		>
			{children}
		</tfoot>
	);
});

TableFooter.displayName = "TableFooter";

// ===========================================================================
// TableRow (<tr>)
// ===========================================================================

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
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
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
	function TableRow({ selected = false, className, children, ...rest }, ref) {
		return (
			<tr
				ref={ref}
				className={cn(
					"transition-colors duration-fast",
					selected && "bg-primary-muted",
					className,
				)}
				data-ds=""
				data-ds-component="table-row"
				aria-selected={selected || undefined}
				{...rest}
			>
				{children}
			</tr>
		);
	},
);

TableRow.displayName = "TableRow";

// ===========================================================================
// TableHead (<th>)
// ===========================================================================

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
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
export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
	function TableHead(
		{
			align = "left",
			sortable = false,
			sorted,
			onSort,
			sticky = false,
			className,
			children,
			...rest
		},
		ref,
	) {
		const { density, bordered } = useTableContext();

		const content = sortable ? (
			<button
				type="button"
				onClick={onSort}
				className={cn(
					"inline-flex items-center gap-1",
					"w-full",
					"cursor-pointer select-none",
					"hover:text-foreground",
					"transition-colors duration-fast",
					focusRingCompactClasses,
					"rounded-sm",
					align === "right" && "justify-end",
					align === "center" && "justify-center",
				)}
				aria-label={
					sorted === "asc"
						? "Sorted ascending. Click to sort descending."
						: sorted === "desc"
							? "Sorted descending. Click to remove sort."
							: "Click to sort ascending."
				}
			>
				{children}
				<span className="shrink-0">
					{sorted === "asc" ? (
						<SortAscIcon className="size-3.5" />
					) : sorted === "desc" ? (
						<SortDescIcon className="size-3.5" />
					) : (
						<SortNeutralIcon className="size-3.5 opacity-30" />
					)}
				</span>
			</button>
		) : (
			children
		);

		return (
			<th
				ref={ref}
				scope="col"
				className={cn(
					densityHeadPadding[density],
					alignClassMap[align],
					"text-muted-foreground",
					"font-semibold",
					"whitespace-nowrap",
					sticky &&
						"sticky top-0 z-[var(--z-sticky)] bg-muted/95 backdrop-blur-sm",
					bordered &&
						"border-r border-border-muted last:border-r-0",
					className,
				)}
				data-ds=""
				data-ds-component="table-head"
				aria-sort={
					sorted === "asc"
						? "ascending"
						: sorted === "desc"
							? "descending"
							: sortable
								? "none"
								: undefined
				}
				{...rest}
			>
				{content}
			</th>
		);
	},
);

TableHead.displayName = "TableHead";

// ===========================================================================
// TableCell (<td>)
// ===========================================================================

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
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
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
	function TableCell({ align = "left", className, children, ...rest }, ref) {
		const { density } = useTableContext();

		return (
			<td
				ref={ref}
				className={cn(
					densityCellPadding[density],
					alignClassMap[align],
					"text-foreground",
					className,
				)}
				data-ds=""
				data-ds-component="table-cell"
				{...rest}
			>
				{children}
			</td>
		);
	},
);

TableCell.displayName = "TableCell";

// ===========================================================================
// TableCaption (<caption>)
// ===========================================================================

export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
	/** Additional CSS classes. */
	className?: string;
}

/**
 * TableCaption — wraps `<caption>` with design-system styles.
 *
 * Renders at the bottom of the table by default (via `caption-bottom`
 * on the root `<table>`).
 */
export const TableCaption = forwardRef<
	HTMLTableCaptionElement,
	TableCaptionProps
>(function TableCaption({ className, children, ...rest }, ref) {
	return (
		<caption
			ref={ref}
			className={cn(
				"mt-2 px-4 pb-0.5",
				"text-xs leading-5",
				"text-muted-foreground",
				className,
			)}
			data-ds=""
			data-ds-component="table-caption"
			{...rest}
		>
			{children}
		</caption>
	);
});

TableCaption.displayName = "TableCaption";
