import * as react from 'react';
import { ReactNode } from 'react';

interface DataTableFilter {
    /** Unique identifier for this filter. */
    id: string;
    /** Display label. */
    label: string;
    /** Available options for this filter. */
    options: Array<{
        label: string;
        value: string;
        count?: number;
    }>;
    /** Currently selected values. */
    selected: string[];
}
interface ColumnVisibility {
    /** Column identifier. */
    id: string;
    /** Display label. */
    label: string;
    /** Whether the column is visible. */
    visible: boolean;
}
type ViewMode = "table" | "grid" | "list";
interface DataTableToolbarProps {
    /** Current search value. */
    searchValue?: string;
    /** Callback when search value changes. */
    onSearchChange?: (value: string) => void;
    /** Search placeholder text. @default "Search..." */
    searchPlaceholder?: string;
    /** Debounce delay for search in ms. @default 300 */
    searchDebounce?: number;
    /** Filter definitions and their current state. */
    filters?: DataTableFilter[];
    /** Callback when a filter's selected values change. */
    onFilterChange?: (filterId: string, selected: string[]) => void;
    /** Callback to clear all filters. */
    onClearFilters?: () => void;
    /** Column visibility state. */
    columns?: ColumnVisibility[];
    /** Callback when column visibility changes. */
    onColumnVisibilityChange?: (columnId: string, visible: boolean) => void;
    /** Current view mode. */
    viewMode?: ViewMode;
    /** Available view modes. */
    viewModes?: ViewMode[];
    /** Callback when view mode changes. */
    onViewModeChange?: (mode: ViewMode) => void;
    /** Extra actions to render on the right side of the toolbar. */
    actions?: ReactNode;
    /** Additional CSS classes. */
    className?: string;
}
/**
 * `DataTableToolbar` — a composable toolbar for DataTable with search,
 * filters, column visibility, and view mode controls.
 *
 * @example
 * ```tsx
 * <DataTableToolbar
 *   searchValue={search}
 *   onSearchChange={setSearch}
 *   filters={[
 *     {
 *       id: "status",
 *       label: "Status",
 *       options: [
 *         { label: "Active", value: "active", count: 12 },
 *         { label: "Inactive", value: "inactive", count: 5 },
 *       ],
 *       selected: selectedStatuses,
 *     },
 *   ]}
 *   onFilterChange={handleFilter}
 *   onClearFilters={() => setFilters({})}
 * />
 * ```
 */
declare const DataTableToolbar: react.ForwardRefExoticComponent<DataTableToolbarProps & react.RefAttributes<HTMLDivElement>>;

export { type ColumnVisibility, type DataTableFilter, DataTableToolbar, type DataTableToolbarProps, type ViewMode };
