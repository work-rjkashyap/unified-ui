import { ColumnDef, SortingState, OnChangeFn, ColumnFiltersState, PaginationState, RowSelectionState, Row, VisibilityState, ColumnPinningState, Table } from '@tanstack/react-table';
export { ColumnDef, ColumnFiltersState, PaginationState, Row, RowSelectionState, SortingState, VisibilityState, createColumnHelper } from '@tanstack/react-table';
import { ReactNode } from 'react';
import { TableDensity, TableAlign } from './table.cjs';
import 'class-variance-authority/types';
import 'class-variance-authority';

/**
 * Extend TanStack Table's ColumnMeta with Unified UI specific properties.
 * Consumers can use these in their ColumnDef `meta` field.
 */
interface DataTableColumnMeta {
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
    /**
     * Enable a dropdown header menu (Asc / Desc / Hide) on this column.
     * When `true`, clicking the column header opens a dropdown instead of
     * directly toggling the sort direction.
     * @default false
     */
    enableHeaderMenu?: boolean;
}
/**
 * Configuration for a faceted filter button shown in the toolbar.
 * Each entry creates a pill-style button that opens a popover with
 * checkbox options derived from the column's unique values.
 */
interface DataTableFacetedFilter {
    /** The column ID to filter on (must match a `ColumnDef` accessorKey or id). */
    columnId: string;
    /** Display label for the filter button. */
    title: string;
    /**
     * Optional icon rendered before the title.
     * Pass a React element (e.g. a Lucide icon).
     */
    icon?: ReactNode;
    /**
     * Explicit list of filter options. If omitted the component will
     * derive options from the column's unique faceted values.
     */
    options?: {
        label: string;
        value: string;
        icon?: ReactNode;
    }[];
}
interface DataTableProps<TData> {
    /** The data array to render. Each item becomes a row. */
    data: TData[];
    /**
     * TanStack Table column definitions.
     * @see https://tanstack.com/table/latest/docs/guide/column-defs
     */
    columns: ColumnDef<TData, any>[];
    /**
     * Faceted filter buttons rendered in the toolbar.
     * Each entry creates a pill-style button that opens a checkbox popover
     * filtered by that column's unique values.
     */
    facetedFilters?: DataTableFacetedFilter[];
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
    /**
     * Controlled column pinning state.
     */
    columnPinning?: ColumnPinningState;
    /** Callback for controlled column pinning changes. */
    onColumnPinningChange?: OnChangeFn<ColumnPinningState>;
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
    /**
     * Content rendered above the table (e.g., filters, actions toolbar).
     * Receives the table instance for advanced usage.
     */
    toolbar?: ReactNode | ((table: Table<TData>) => ReactNode);
    /**
     * Content rendered below the table (e.g., custom pagination, summary).
     * Receives the table instance for advanced usage.
     */
    footer?: ReactNode | ((table: Table<TData>) => ReactNode);
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
    onTableInstance?: (table: Table<TData>) => void;
}
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
declare const DataTable: <TData>(props: DataTableProps<TData> & {
    ref?: React.Ref<HTMLDivElement>;
}) => React.ReactElement;
interface UseDataTableOptions<TData> {
    data: TData[];
    columns: ColumnDef<TData, any>[];
    initialSorting?: SortingState;
    initialPagination?: Partial<PaginationState>;
    initialColumnFilters?: ColumnFiltersState;
    initialRowSelection?: RowSelectionState;
    initialColumnVisibility?: VisibilityState;
    initialGlobalFilter?: string;
}
interface UseDataTableReturn<_TData> {
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
declare function useDataTable<TData>(options: UseDataTableOptions<TData>): UseDataTableReturn<TData>;

export { DataTable, type DataTableColumnMeta, type DataTableFacetedFilter, type DataTableProps, type UseDataTableOptions, type UseDataTableReturn, useDataTable };
