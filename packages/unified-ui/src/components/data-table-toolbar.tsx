"use client";

// ============================================================================
// Unified UI — DataTableToolbar Component
// ============================================================================
// Filtering, sorting, column visibility toolbar for use with DataTable.
// Provides a composable toolbar with search input, filter dropdowns,
// column visibility toggle, and view mode switcher.
//
// Features:
//   - Global search input with debounce
//   - Filter dropdowns (faceted filters)
//   - Column visibility toggle dropdown
//   - View mode switcher (table/grid/list)
//   - Slot-based composition for custom actions
//   - Responsive: stacks on mobile
//   - Design system token styling
//   - Full ref forwarding
//
// Usage:
//   import { DataTableToolbar } from "@work-rjkashyap/unified-ui/components";
//
//   <DataTableToolbar
//     searchValue={search}
//     onSearchChange={setSearch}
//     filters={filters}
//     onFilterChange={handleFilter}
//   />
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import {
  forwardRef,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// ---------------------------------------------------------------------------
// Icons (internal)
// ---------------------------------------------------------------------------

function SearchIcon({ className }: { className?: string }) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
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

function ColumnsIcon({ className }: { className?: string }) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="12" x2="12" y1="3" y2="21" />
      <line x1="3" x2="21" y1="12" y2="12" />
    </svg>
  );
}

function FilterIcon({ className }: { className?: string }) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DataTableFilter {
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

export interface ColumnVisibility {
  /** Column identifier. */
  id: string;
  /** Display label. */
  label: string;
  /** Whether the column is visible. */
  visible: boolean;
}

export type ViewMode = "table" | "grid" | "list";

export interface DataTableToolbarProps {
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

// ---------------------------------------------------------------------------
// DataTableToolbar
// ---------------------------------------------------------------------------

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
export const DataTableToolbar = forwardRef<
  HTMLDivElement,
  DataTableToolbarProps
>(function DataTableToolbar(
  {
    searchValue = "",
    onSearchChange,
    searchPlaceholder = "Search...",
    searchDebounce = 300,
    filters,
    onFilterChange,
    onClearFilters,
    columns,
    onColumnVisibilityChange,
    viewMode,
    viewModes,
    onViewModeChange,
    actions,
    className,
  },
  ref,
) {
  // Debounced search
  // Vercel best practice: rerender-derived-state-no-effect
  // Reset local search during render when the controlled value changes,
  // instead of syncing via useEffect (avoids an extra re-render cycle).
  const [localSearch, setLocalSearch] = useState(searchValue);
  const [prevSearchValue, setPrevSearchValue] = useState(searchValue);
  if (searchValue !== prevSearchValue) {
    setPrevSearchValue(searchValue);
    setLocalSearch(searchValue);
  }
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = useCallback(
    (value: string) => {
      setLocalSearch(value);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        onSearchChange?.(value);
      }, searchDebounce);
    },
    [onSearchChange, searchDebounce],
  );

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  // Filter dropdown state
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [showColumns, setShowColumns] = useState(false);

  const hasActiveFilters = filters?.some((f) => f.selected.length > 0) ?? false;

  return (
    <div
      ref={ref}
      className={cn("flex flex-wrap items-center gap-2", className)}
      data-ds=""
      data-ds-component="data-table-toolbar"
    >
      {/* Search */}
      {onSearchChange && (
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className={cn(
              "h-9 w-full rounded-md border border-border bg-background pl-9 pr-8 text-sm",
              "text-foreground placeholder:text-muted-foreground",
              "transition-colors duration-fast",
              focusRingClasses,
            )}
            aria-label="Search table"
          />
          {localSearch && (
            <button
              type="button"
              onClick={() => handleSearchChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex size-5 items-center justify-center rounded text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <XIcon className="size-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Filters */}
      {filters?.map((filter) => (
        <div key={filter.id} className="relative">
          <button
            type="button"
            onClick={() =>
              setOpenFilter(openFilter === filter.id ? null : filter.id)
            }
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm transition-colors",
              filter.selected.length > 0
                ? "border-primary/30 bg-primary/5 text-foreground"
                : "border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted",
              focusRingClasses,
            )}
          >
            <FilterIcon className="size-3.5" />
            {filter.label}
            {filter.selected.length > 0 && (
              <span className="ml-1 inline-flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[11px] font-medium">
                {filter.selected.length}
              </span>
            )}
          </button>

          {/* Filter dropdown */}
          {openFilter === filter.id && (
            <div className="absolute top-full left-0 z-50 mt-1 w-52 rounded-lg border border-border bg-background p-1 shadow-lg">
              {filter.options.map((opt) => {
                const isSelected = filter.selected.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      const next = isSelected
                        ? filter.selected.filter((v) => v !== opt.value)
                        : [...filter.selected, opt.value];
                      onFilterChange?.(filter.id, next);
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors",
                      "hover:bg-muted text-foreground",
                    )}
                  >
                    <div
                      className={cn(
                        "size-4 rounded border flex items-center justify-center shrink-0",
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-border",
                      )}
                    >
                      {isSelected && (
                        <svg
                          className="size-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      )}
                    </div>
                    <span className="flex-1 text-left">{opt.label}</span>
                    {opt.count !== undefined && (
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {opt.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}

      {/* Clear filters */}
      {hasActiveFilters && onClearFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="inline-flex h-9 items-center gap-1 rounded-md px-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <XIcon className="size-3.5" />
          Clear
        </button>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Column visibility */}
      {columns && onColumnVisibilityChange && (
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowColumns(!showColumns)}
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-sm text-muted-foreground",
              "hover:text-foreground hover:bg-muted transition-colors",
              focusRingClasses,
            )}
            aria-label="Toggle column visibility"
          >
            <ColumnsIcon className="size-3.5" />
            Columns
          </button>

          {showColumns && (
            <div className="absolute top-full right-0 z-50 mt-1 w-48 rounded-lg border border-border bg-background p-1 shadow-lg">
              {columns.map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => onColumnVisibilityChange(col.id, !col.visible)}
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm hover:bg-muted text-foreground transition-colors"
                >
                  <div
                    className={cn(
                      "size-4 rounded border flex items-center justify-center shrink-0",
                      col.visible
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-border",
                    )}
                  >
                    {col.visible && (
                      <svg
                        className="size-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </div>
                  <span>{col.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* View mode switcher */}
      {viewModes && viewMode && onViewModeChange && (
        <div className="inline-flex h-9 items-center rounded-md border border-border bg-background p-0.5">
          {viewModes.map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => onViewModeChange(mode)}
              className={cn(
                "inline-flex h-7 items-center justify-center rounded-[5px] px-2.5 text-xs font-medium capitalize transition-colors",
                viewMode === mode
                  ? "bg-muted text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-label={`${mode} view`}
              aria-pressed={viewMode === mode}
            >
              {mode}
            </button>
          ))}
        </div>
      )}

      {/* Custom actions */}
      {actions}
    </div>
  );
});
DataTableToolbar.displayName = "DataTableToolbar";
