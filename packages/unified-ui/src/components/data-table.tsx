"use client";

// ============================================================================
// Unified UI — DataTable Component (powered by TanStack Table)
// ============================================================================
// A high-level, feature-rich data table built on @tanstack/react-table that
// renders using the existing Unified UI Table primitives for consistent
// styling.
//
// Features:
//   - Column definitions via TanStack Table's ColumnDef API
//   - Client-side sorting with sort indicators
//   - Client-side filtering (global search + per-column filters)
//   - Client-side pagination with integrated Pagination component
//   - Row selection (single / multi) with checkbox column
//   - Column visibility toggling
//   - Column pinning (left/right)
//   - Empty state / loading state / custom caption
//   - Full design-system styling via existing Table sub-components
//   - Forwarded ref on root wrapper
//   - All visual values from CSS custom properties — no hardcoded values
//
// Usage:
//   import { DataTable } from "@work-rjkashyap/unified-ui/components";
//   import { type ColumnDef } from "@tanstack/react-table";
//
//   const columns: ColumnDef<Person>[] = [
//     { accessorKey: "name", header: "Name" },
//     { accessorKey: "email", header: "Email" },
//     { accessorKey: "age", header: "Age", enableSorting: true },
//   ];
//
//   <DataTable columns={columns} data={people} sorting pagination />
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import {
	type ColumnDef,
	type ColumnFiltersState,
	type ColumnPinningState,
	type OnChangeFn,
	type PaginationState,
	type Row,
	type RowSelectionState,
	type SortingState,
	type Table as TanStackTable,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	type ReactNode,
	forwardRef,
	useCallback,
	useMemo,
	useState,
} from "react";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
	type TableAlign,
	type TableDensity,
	type TableSortDirection,
} from "./table";

// ---------------------------------------------------------------------------
// Re-export TanStack Table types consumers will need
// ---------------------------------------------------------------------------

export type {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	RowSelectionState,
	PaginationState,
	Row,
} from "@tanstack/react-table";

export { createColumnHelper } from "@tanstack/react-table";

// ---------------------------------------------------------------------------
// Extended column meta for Unified UI integration
// ---------------------------------------------------------------------------

/**
 * Extend TanStack Table's ColumnMeta with Unified UI specific properties.
 * Consumers can use these in their ColumnDef `meta` field.
 */
export interface DataTableColumnMeta {
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
}

// ---------------------------------------------------------------------------
// DataTable Props
// ---------------------------------------------------------------------------

export interface DataTableProps<TData> {
	// -- Data & Columns -------------------------------------------------------

	/** The data array to render. Each item becomes a row. */
	data: TData[];

	/**
	 * TanStack Table column definitions.
	 * @see https://tanstack.com/table/latest/docs/guide/column-defs
	 */
	columns: ColumnDef<TData, any>[];

	// -- Sorting --------------------------------------------------------------

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

	// -- Filtering ------------------------------------------------------------

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

	// -- Pagination -----------------------------------------------------------

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

	// -- Row Selection --------------------------------------------------------

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

	// -- Column Visibility ----------------------------------------------------

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

	// -- Column Pinning -------------------------------------------------------

	/**
	 * Controlled column pinning state.
	 */
	columnPinning?: ColumnPinningState;

	/** Callback for controlled column pinning changes. */
	onColumnPinningChange?: OnChangeFn<ColumnPinningState>;

	// -- Table Appearance -----------------------------------------------------

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

	// -- States ---------------------------------------------------------------

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

	// -- Slots & Customization ------------------------------------------------

	/**
	 * Content rendered above the table (e.g., filters, actions toolbar).
	 * Receives the table instance for advanced usage.
	 */
	toolbar?: ReactNode | ((table: TanStackTable<TData>) => ReactNode);

	/**
	 * Content rendered below the table (e.g., custom pagination, summary).
	 * Receives the table instance for advanced usage.
	 */
	footer?: ReactNode | ((table: TanStackTable<TData>) => ReactNode);

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
	onTableInstance?: (table: TanStackTable<TData>) => void;
}

// ---------------------------------------------------------------------------
// Internal: Checkbox component (minimal, avoids importing external dep)
// ---------------------------------------------------------------------------

function DataTableCheckbox({
	checked,
	indeterminate,
	onChange,
	disabled,
	"aria-label": ariaLabel,
}: {
	checked: boolean;
	indeterminate?: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	"aria-label"?: string;
}) {
	const ref = useCallback(
		(el: HTMLInputElement | null) => {
			if (el) {
				el.indeterminate = indeterminate ?? false;
			}
		},
		[indeterminate],
	);

	return (
		<input
			type="checkbox"
			ref={ref}
			checked={checked}
			onChange={onChange}
			disabled={disabled}
			aria-label={ariaLabel}
			className={cn(
				"size-4 cursor-pointer rounded-ds-sm",
				"border border-ds-border",
				"accent-ds-primary",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-focus-ring focus-visible:ring-offset-1",
				"disabled:cursor-not-allowed disabled:opacity-50",
			)}
		/>
	);
}

// ---------------------------------------------------------------------------
// Internal: Global filter input
// ---------------------------------------------------------------------------

function DataTableGlobalFilter({
	value,
	onChange,
	placeholder,
}: {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}) {
	return (
		<input
			type="text"
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder ?? "Search..."}
			className={cn(
				"h-9 w-full max-w-xs rounded-ds-md px-3 text-sm",
				"border border-ds-border bg-ds-background text-ds-foreground",
				"placeholder:text-ds-muted-foreground",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-focus-ring focus-visible:ring-offset-1",
				"transition-colors duration-ds-fast",
			)}
			data-ds=""
			data-ds-component="data-table-search"
		/>
	);
}

// ---------------------------------------------------------------------------
// Internal: Column filter input
// ---------------------------------------------------------------------------

function DataTableColumnFilter({
	value,
	onChange,
	placeholder,
}: {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}) {
	return (
		<input
			type="text"
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder ?? "Filter..."}
			className={cn(
				"mt-1 h-7 w-full rounded-ds-sm px-2 text-xs",
				"border border-ds-border-muted bg-ds-background text-ds-foreground",
				"placeholder:text-ds-muted-foreground",
				"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ds-focus-ring",
				"transition-colors duration-ds-fast",
			)}
			data-ds=""
			data-ds-component="data-table-column-filter"
		/>
	);
}

// ---------------------------------------------------------------------------
// Internal: Column visibility toggle dropdown
// ---------------------------------------------------------------------------

function DataTableColumnVisibility<TData>({
	table,
}: {
	table: TanStackTable<TData>;
}) {
	const [open, setOpen] = useState(false);

	return (
		<div className="relative">
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className={cn(
					"inline-flex items-center gap-1.5 rounded-ds-md px-3 py-1.5",
					"text-sm font-medium text-ds-foreground",
					"border border-ds-border bg-ds-background",
					"hover:bg-ds-muted/50",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-focus-ring focus-visible:ring-offset-1",
					"transition-colors duration-ds-fast",
				)}
				data-ds=""
				data-ds-component="data-table-column-toggle"
			>
				<svg
					className="size-4"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<path d="M12 3v18" />
					<rect width="6" height="18" x="3" y="3" rx="2" />
					<rect width="6" height="18" x="15" y="3" rx="2" />
				</svg>
				Columns
			</button>

			{open && (
				<>
					{/* Backdrop to close on click outside */}
					<div
						className="fixed inset-0 z-[var(--ds-z-dropdown,40)]"
						onClick={() => setOpen(false)}
						onKeyDown={(e) => {
							if (e.key === "Escape") setOpen(false);
						}}
						aria-hidden="true"
					/>
					<div
						className={cn(
							"absolute right-0 top-full z-[var(--ds-z-dropdown,40)] mt-1",
							"min-w-[10rem] rounded-ds-md p-1",
							"border border-ds-border bg-ds-popover text-ds-popover-foreground",
							"shadow-ds-md",
							"animate-in fade-in-0 zoom-in-95",
						)}
						role="menu"
						data-ds=""
						data-ds-component="data-table-column-menu"
					>
						{table.getAllLeafColumns().map((column) => {
							if (column.id === "select") return null;

							return (
								<label
									key={column.id}
									className={cn(
										"flex cursor-pointer items-center gap-2 rounded-ds-sm px-2 py-1.5",
										"text-sm text-ds-foreground",
										"hover:bg-ds-muted/50",
										"transition-colors duration-ds-fast",
									)}
								>
									<input
										type="checkbox"
										checked={column.getIsVisible()}
										onChange={column.getToggleVisibilityHandler()}
										className={cn(
											"size-3.5 rounded-ds-sm",
											"accent-ds-primary",
										)}
									/>
									{typeof column.columnDef.header === "string"
										? column.columnDef.header
										: column.id}
								</label>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}

// ---------------------------------------------------------------------------
// Internal: Pagination bar
// ---------------------------------------------------------------------------

function DataTablePagination<TData>({
	table,
	pageSizeOptions,
}: {
	table: TanStackTable<TData>;
	pageSizeOptions?: number[] | false;
}) {
	const pageIndex = table.getState().pagination.pageIndex;
	const pageCount = table.getPageCount();
	const pageSize = table.getState().pagination.pageSize;
	const totalRows = table.getFilteredRowModel().rows.length;
	const selectedCount = table.getFilteredSelectedRowModel().rows.length;
	const hasSelection = selectedCount > 0;

	return (
		<div
			className={cn(
				"flex flex-col gap-3 px-2 py-3",
				"sm:flex-row sm:items-center sm:justify-between",
			)}
			data-ds=""
			data-ds-component="data-table-pagination"
		>
			{/* Left: selection info + page size */}
			<div className="flex items-center gap-4 text-xs text-ds-muted-foreground">
				{hasSelection && (
					<span>
						{selectedCount} of {totalRows} row(s) selected
					</span>
				)}
				{!hasSelection && (
					<span>{totalRows} row(s) total</span>
				)}

				{pageSizeOptions !== false && (
					<div className="flex items-center gap-1.5">
						<span>Rows:</span>
						<select
							value={pageSize}
							onChange={(e) =>
								table.setPageSize(Number(e.target.value))
							}
							className={cn(
								"h-7 rounded-ds-sm border border-ds-border bg-ds-background px-1.5 text-xs text-ds-foreground",
								"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ds-focus-ring",
							)}
						>
							{(pageSizeOptions || [10, 20, 30, 50, 100]).map(
								(size) => (
									<option key={size} value={size}>
										{size}
									</option>
								),
							)}
						</select>
					</div>
				)}
			</div>

			{/* Right: page navigation */}
			<div className="flex items-center gap-1.5">
				<span className="mr-2 text-xs text-ds-muted-foreground">
					Page {pageIndex + 1} of {pageCount || 1}
				</span>

				<PaginationButton
					onClick={() => table.firstPage()}
					disabled={!table.getCanPreviousPage()}
					aria-label="Go to first page"
				>
					<svg
						className="size-3.5"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<path d="m11 17-5-5 5-5" />
						<path d="m18 17-5-5 5-5" />
					</svg>
				</PaginationButton>

				<PaginationButton
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
					aria-label="Go to previous page"
				>
					<svg
						className="size-3.5"
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
				</PaginationButton>

				<PaginationButton
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
					aria-label="Go to next page"
				>
					<svg
						className="size-3.5"
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
				</PaginationButton>

				<PaginationButton
					onClick={() => table.lastPage()}
					disabled={!table.getCanNextPage()}
					aria-label="Go to last page"
				>
					<svg
						className="size-3.5"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<path d="m13 17 5-5-5-5" />
						<path d="m6 17 5-5-5-5" />
					</svg>
				</PaginationButton>
			</div>
		</div>
	);
}

function PaginationButton({
	children,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			type="button"
			{...props}
			className={cn(
				"inline-flex size-8 items-center justify-center rounded-ds-md",
				"border border-ds-border bg-ds-background text-ds-foreground",
				"hover:bg-ds-muted/50",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-focus-ring focus-visible:ring-offset-1",
				"disabled:pointer-events-none disabled:opacity-50",
				"transition-colors duration-ds-fast",
			)}
		>
			{children}
		</button>
	);
}

// ---------------------------------------------------------------------------
// Internal: Loading skeleton rows
// ---------------------------------------------------------------------------

function DataTableSkeleton({
	columnCount,
	rowCount = 5,
	density,
}: {
	columnCount: number;
	rowCount?: number;
	density: TableDensity;
}) {
	const heightClass = density === "compact" ? "h-3" : "h-4";

	return (
		<>
			{Array.from({ length: rowCount }).map((_, rowIndex) => (
				<TableRow
					// biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows are purely visual
					key={rowIndex}
					className="animate-pulse"
				>
					{Array.from({ length: columnCount }).map((_, colIndex) => (
						<TableCell
							// biome-ignore lint/suspicious/noArrayIndexKey: skeleton cells are purely visual
							key={colIndex}
						>
							<div
								className={cn(
									heightClass,
									"rounded-ds-sm bg-ds-muted",
									colIndex === 0
										? "w-3/4"
										: colIndex === columnCount - 1
											? "w-1/3"
											: "w-2/3",
								)}
							/>
						</TableCell>
					))}
				</TableRow>
			))}
		</>
	);
}

// ===========================================================================
// DataTable Component
// ===========================================================================

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
export const DataTable = forwardRef<HTMLDivElement, DataTableProps<any>>(
	function DataTable(
		{
			// Data
			data,
			columns: userColumns,

			// Sorting
			sorting: enableSorting = false,
			sortingState: controlledSorting,
			onSortingChange: onControlledSortingChange,
			multiSort = false,

			// Filtering
			filtering: enableFiltering = false,
			globalFilter: controlledGlobalFilter,
			onGlobalFilterChange: onControlledGlobalFilterChange,
			columnFilters: controlledColumnFilters,
			onColumnFiltersChange: onControlledColumnFiltersChange,
			showGlobalFilter = false,
			globalFilterPlaceholder,

			// Pagination
			pagination: enablePagination = false,
			pageSize = 10,
			paginationState: controlledPagination,
			onPaginationChange: onControlledPaginationChange,
			pageSizeOptions,

			// Row selection
			rowSelection: rowSelectionMode = false,
			rowSelectionState: controlledRowSelection,
			onRowSelectionChange: onControlledRowSelectionChange,
			onSelectedRowsChange,
			enableRowSelection = true,
			getRowId,

			// Column visibility
			columnVisibility: enableColumnVisibility = false,
			columnVisibilityState: controlledColumnVisibility,
			onColumnVisibilityChange: onControlledColumnVisibilityChange,

			// Column pinning
			columnPinning: controlledColumnPinning,
			onColumnPinningChange: onControlledColumnPinningChange,

			// Appearance
			density = "comfortable",
			striped = false,
			hoverable = true,
			bordered = false,
			responsive = true,

			// States
			loading = false,
			emptyState,
			caption,
			showFooter = false,

			// Slots
			toolbar,
			footer,

			// Classes
			className,
			tableClassName,
			wrapperClassName,

			// Events
			onRowClick,
			onTableInstance,
		},
		ref,
	) {
		// -- Internal state (uncontrolled mode) ---------------------------------

		const [internalSorting, setInternalSorting] = useState<SortingState>([]);
		const [internalGlobalFilter, setInternalGlobalFilter] =
			useState<string>("");
		const [internalColumnFilters, setInternalColumnFilters] =
			useState<ColumnFiltersState>([]);
		const [internalPagination, setInternalPagination] =
			useState<PaginationState>({
				pageIndex: 0,
				pageSize,
			});
		const [internalRowSelection, setInternalRowSelection] =
			useState<RowSelectionState>({});
		const [internalColumnVisibility, setInternalColumnVisibility] =
			useState<VisibilityState>({});
		const [internalColumnPinning, setInternalColumnPinning] =
			useState<ColumnPinningState>({});

		// -- Resolve controlled vs uncontrolled ---------------------------------

		const sortingValue = controlledSorting ?? internalSorting;
		const onSortingChange = onControlledSortingChange ?? setInternalSorting;

		const globalFilterValue =
			controlledGlobalFilter ?? internalGlobalFilter;
		const onGlobalFilterChange =
			onControlledGlobalFilterChange ?? setInternalGlobalFilter;

		const columnFiltersValue =
			controlledColumnFilters ?? internalColumnFilters;
		const onColumnFiltersChange =
			onControlledColumnFiltersChange ?? setInternalColumnFilters;

		const paginationValue = controlledPagination ?? internalPagination;
		const onPaginationChange =
			onControlledPaginationChange ?? setInternalPagination;

		const rowSelectionValue =
			controlledRowSelection ?? internalRowSelection;
		const onRowSelectionChange =
			onControlledRowSelectionChange ?? setInternalRowSelection;

		const columnVisibilityValue =
			controlledColumnVisibility ?? internalColumnVisibility;
		const onColumnVisibilityChange =
			onControlledColumnVisibilityChange ?? setInternalColumnVisibility;

		const columnPinningValue =
			controlledColumnPinning ?? internalColumnPinning;
		const onColumnPinningChange =
			onControlledColumnPinningChange ?? setInternalColumnPinning;

		// -- Build selection column if needed ------------------------------------

		const columns = useMemo(() => {
			if (!rowSelectionMode) return userColumns;

			const selectionColumn: ColumnDef<any, any> = {
				id: "select",
				header:
					rowSelectionMode === "multi"
						? ({ table: t }) => (
								<DataTableCheckbox
									checked={t.getIsAllPageRowsSelected()}
									indeterminate={t.getIsSomePageRowsSelected()}
									onChange={t.getToggleAllPageRowsSelectedHandler()}
									aria-label="Select all rows"
								/>
							)
						: undefined,
				cell: ({ row }) => (
					<DataTableCheckbox
						checked={row.getIsSelected()}
						disabled={!row.getCanSelect()}
						indeterminate={row.getIsSomeSelected()}
						onChange={row.getToggleSelectedHandler()}
						aria-label={`Select row ${row.index + 1}`}
					/>
				),
				size: 40,
				enableSorting: false,
				enableHiding: false,
			};

			return [selectionColumn, ...userColumns];
		}, [userColumns, rowSelectionMode]);

		// -- Initialize TanStack Table ------------------------------------------

		const table = useReactTable({
			data,
			columns,
			getRowId,
			state: {
				sorting: sortingValue,
				globalFilter: globalFilterValue,
				columnFilters: columnFiltersValue,
				pagination: paginationValue,
				rowSelection: rowSelectionValue,
				columnVisibility: columnVisibilityValue,
				columnPinning: columnPinningValue,
			},

			// Sorting
			onSortingChange,
			enableSorting,
			enableMultiSort: multiSort,
			getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,

			// Filtering
			onGlobalFilterChange,
			onColumnFiltersChange,
			enableFilters: enableFiltering,
			getFilteredRowModel: enableFiltering
				? getFilteredRowModel()
				: undefined,

			// Pagination
			onPaginationChange,
			getPaginationRowModel: enablePagination
				? getPaginationRowModel()
				: undefined,

			// Row selection
			onRowSelectionChange: (updater) => {
				onRowSelectionChange(updater);
				// Fire convenience callback
				if (onSelectedRowsChange) {
					const next =
						typeof updater === "function"
							? updater(rowSelectionValue)
							: updater;
					// We schedule this to fire after state is applied
					setTimeout(() => {
						const selectedRows = table
							.getRowModel()
							.rows.filter((row) => next[row.id]);
						onSelectedRowsChange(selectedRows);
					}, 0);
				}
			},
			enableRowSelection:
				rowSelectionMode === false
					? false
					: enableRowSelection,
			enableMultiRowSelection: rowSelectionMode === "multi",

			// Column visibility
			onColumnVisibilityChange,

			// Column pinning
			onColumnPinningChange,

			// Core
			getCoreRowModel: getCoreRowModel(),
		});

		// Expose table instance
		if (onTableInstance) {
			onTableInstance(table);
		}

		// -- Helpers --------------------------------------------------------------

		const headerGroups = table.getHeaderGroups();
		const rows = table.getRowModel().rows;
		const footerGroups = table.getFooterGroups();
		const visibleColumnCount = table.getVisibleLeafColumns().length;

		const hasToolbar =
			showGlobalFilter || enableColumnVisibility || toolbar;

		// Map TanStack sort direction to our TableSortDirection
		const toSortDir = (
			dir: false | "asc" | "desc",
		): TableSortDirection | undefined => {
			if (dir === "asc") return "asc";
			if (dir === "desc") return "desc";
			return undefined;
		};

		// -- Render ---------------------------------------------------------------

		return (
			<div
				ref={ref}
				className={cn("flex flex-col gap-3", className)}
				data-ds=""
				data-ds-component="data-table"
			>
				{/* Toolbar */}
				{hasToolbar && (
					<div
						className="flex flex-wrap items-center gap-2"
						data-ds=""
						data-ds-component="data-table-toolbar"
					>
						{showGlobalFilter && enableFiltering && (
							<DataTableGlobalFilter
								value={globalFilterValue}
								onChange={onGlobalFilterChange}
								placeholder={globalFilterPlaceholder}
							/>
						)}

						{/* Push remaining toolbar items to the right */}
						<div className="flex-1" />

						{typeof toolbar === "function"
							? toolbar(table)
							: toolbar}

						{enableColumnVisibility && (
							<DataTableColumnVisibility table={table} />
						)}
					</div>
				)}

				{/* Table */}
				<Table
					density={density}
					striped={striped}
					hoverable={hoverable}
					bordered={bordered}
					responsive={responsive}
					wrapperClassName={wrapperClassName}
					className={tableClassName}
				>
					{caption && <TableCaption>{caption}</TableCaption>}

					<TableHeader>
						{headerGroups.map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									const meta = header.column.columnDef
										.meta as DataTableColumnMeta | undefined;
									const canSort =
										header.column.getCanSort();
									const sortDir = header.column.getIsSorted();
									const canFilter =
										enableFiltering &&
										header.column.getCanFilter() &&
										meta?.filterable !== false;
									const showColumnFilter =
										canFilter && meta?.filterable === true;

									return (
										<TableHead
											key={header.id}
											colSpan={
												header.colSpan > 1
													? header.colSpan
													: undefined
											}
											align={meta?.align}
											sortable={canSort}
											sorted={toSortDir(sortDir)}
											onSort={
												canSort
													? () => header.column.toggleSorting()
													: undefined
											}
											sticky={meta?.sticky}
											className={cn(
												header.column.id === "select" &&
													"w-[40px]",
												meta?.headerClassName,
											)}
											style={
												header.column.getSize() !== 150
													? {
															width: header.column.getSize(),
															minWidth:
																header.column.getSize(),
														}
													: undefined
											}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext(),
													)}

											{/* Per-column filter */}
											{showColumnFilter && (
												<DataTableColumnFilter
													value={
														(header.column.getFilterValue() as string) ??
														""
													}
													onChange={(val) =>
														header.column.setFilterValue(
															val || undefined,
														)
													}
													placeholder={
														meta?.filterPlaceholder
													}
												/>
											)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{loading ? (
							<DataTableSkeleton
								columnCount={visibleColumnCount}
								density={density}
							/>
						) : rows.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={visibleColumnCount}
									className="h-24 text-center"
								>
									{emptyState ?? (
										<span className="text-ds-muted-foreground">
											No results.
										</span>
									)}
								</TableCell>
							</TableRow>
						) : (
							rows.map((row, rowIndex) => (
								<TableRow
									key={row.id}
									selected={row.getIsSelected()}
									onClick={
										onRowClick
											? (e) => onRowClick(row, e)
											: undefined
									}
									className={cn(
										onRowClick && "cursor-pointer",
									)}
									data-ds-row-index={
										rowIndex % 2 === 0 ? "even" : "odd"
									}
								>
									{row.getVisibleCells().map((cell) => {
										const meta = cell.column.columnDef
											.meta as
											| DataTableColumnMeta
											| undefined;

										return (
											<TableCell
												key={cell.id}
												align={meta?.align}
												className={meta?.cellClassName}
												style={
													cell.column.getSize() !==
													150
														? {
																width: cell.column.getSize(),
																minWidth:
																	cell.column.getSize(),
															}
														: undefined
												}
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										);
									})}
								</TableRow>
							))
						)}
					</TableBody>

					{showFooter && (
						<TableFooter>
							{footerGroups.map((footerGroup) => (
								<TableRow key={footerGroup.id}>
									{footerGroup.headers.map((header) => (
										<TableCell key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column
															.columnDef.footer,
														header.getContext(),
													)}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableFooter>
					)}
				</Table>

				{/* Pagination */}
				{enablePagination && (
					<DataTablePagination
						table={table}
						pageSizeOptions={pageSizeOptions}
					/>
				)}

				{/* Custom footer */}
				{footer &&
					(typeof footer === "function" ? footer(table) : footer)}
			</div>
		);
	},
) as <TData>(
	props: DataTableProps<TData> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;

(DataTable as any).displayName = "DataTable";

// ---------------------------------------------------------------------------
// useDataTable hook — convenience for advanced controlled usage
// ---------------------------------------------------------------------------

export interface UseDataTableOptions<TData> {
	data: TData[];
	columns: ColumnDef<TData, any>[];
	initialSorting?: SortingState;
	initialPagination?: Partial<PaginationState>;
	initialColumnFilters?: ColumnFiltersState;
	initialRowSelection?: RowSelectionState;
	initialColumnVisibility?: VisibilityState;
	initialGlobalFilter?: string;
}

export interface UseDataTableReturn<TData> {
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
export function useDataTable<TData>(
	options: UseDataTableOptions<TData>,
): UseDataTableReturn<TData> {
	const [sorting, onSortingChange] = useState<SortingState>(
		options.initialSorting ?? [],
	);
	const [globalFilter, onGlobalFilterChange] = useState<string>(
		options.initialGlobalFilter ?? "",
	);
	const [columnFilters, onColumnFiltersChange] =
		useState<ColumnFiltersState>(options.initialColumnFilters ?? []);
	const [pagination, onPaginationChange] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
		...options.initialPagination,
	});
	const [rowSelection, onRowSelectionChange] =
		useState<RowSelectionState>(options.initialRowSelection ?? {});
	const [columnVisibility, onColumnVisibilityChange] =
		useState<VisibilityState>(options.initialColumnVisibility ?? {});

	const reset = useCallback(() => {
		onSortingChange(options.initialSorting ?? []);
		onGlobalFilterChange(options.initialGlobalFilter ?? "");
		onColumnFiltersChange(options.initialColumnFilters ?? []);
		onPaginationChange({
			pageIndex: 0,
			pageSize: 10,
			...options.initialPagination,
		});
		onRowSelectionChange(options.initialRowSelection ?? {});
		onColumnVisibilityChange(options.initialColumnVisibility ?? {});
	}, [options]);

	return {
		sorting,
		onSortingChange,
		globalFilter,
		onGlobalFilterChange,
		columnFilters,
		onColumnFiltersChange,
		pagination,
		onPaginationChange,
		rowSelection,
		onRowSelectionChange,
		columnVisibility,
		onColumnVisibilityChange,
		tableProps: {
			sortingState: sorting,
			onSortingChange,
			globalFilter,
			onGlobalFilterChange,
			columnFilters,
			onColumnFiltersChange,
			paginationState: pagination,
			onPaginationChange,
			rowSelectionState: rowSelection,
			onRowSelectionChange,
			columnVisibilityState: columnVisibility,
			onColumnVisibilityChange,
		},
		reset,
	};
}
