"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
function SearchIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ jsx("path", { d: "m21 21-4.3-4.3" })
      ]
    }
  );
}
function XIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ jsx("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
function ColumnsIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx("rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }),
        /* @__PURE__ */ jsx("line", { x1: "12", x2: "12", y1: "3", y2: "21" }),
        /* @__PURE__ */ jsx("line", { x1: "3", x2: "21", y1: "12", y2: "12" })
      ]
    }
  );
}
function FilterIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" })
    }
  );
}
const DataTableToolbar = forwardRef(function DataTableToolbar2({
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
  className
}, ref) {
  const [localSearch, setLocalSearch] = useState(searchValue);
  const [prevSearchValue, setPrevSearchValue] = useState(searchValue);
  if (searchValue !== prevSearchValue) {
    setPrevSearchValue(searchValue);
    setLocalSearch(searchValue);
  }
  const debounceTimer = useRef(null);
  const handleSearchChange = useCallback(
    (value) => {
      setLocalSearch(value);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        onSearchChange?.(value);
      }, searchDebounce);
    },
    [onSearchChange, searchDebounce]
  );
  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);
  const [openFilter, setOpenFilter] = useState(null);
  const [showColumns, setShowColumns] = useState(false);
  const hasActiveFilters = filters?.some((f) => f.selected.length > 0) ?? false;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn("flex flex-wrap items-center gap-2", className),
      "data-ds": "",
      "data-ds-component": "data-table-toolbar",
      children: [
        onSearchChange && /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-[200px] max-w-sm", children: [
          /* @__PURE__ */ jsx(SearchIcon, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: localSearch,
              onChange: (e) => handleSearchChange(e.target.value),
              placeholder: searchPlaceholder,
              className: cn(
                "h-9 w-full rounded-md border border-border bg-background pl-9 pr-8 text-sm",
                "text-foreground placeholder:text-muted-foreground",
                "transition-colors duration-fast",
                focusRingClasses
              ),
              "aria-label": "Search table"
            }
          ),
          localSearch && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => handleSearchChange(""),
              className: "absolute right-2 top-1/2 -translate-y-1/2 inline-flex size-5 items-center justify-center rounded text-muted-foreground hover:text-foreground",
              "aria-label": "Clear search",
              children: /* @__PURE__ */ jsx(XIcon, { className: "size-3.5" })
            }
          )
        ] }),
        filters?.map((filter) => /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setOpenFilter(openFilter === filter.id ? null : filter.id),
              className: cn(
                "inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm transition-colors",
                filter.selected.length > 0 ? "border-primary/30 bg-primary/5 text-foreground" : "border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted",
                focusRingClasses
              ),
              children: [
                /* @__PURE__ */ jsx(FilterIcon, { className: "size-3.5" }),
                filter.label,
                filter.selected.length > 0 && /* @__PURE__ */ jsx("span", { className: "ml-1 inline-flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[11px] font-medium", children: filter.selected.length })
              ]
            }
          ),
          openFilter === filter.id && /* @__PURE__ */ jsx("div", { className: "absolute top-full left-0 z-50 mt-1 w-52 rounded-lg border border-border bg-background p-1 shadow-lg", children: filter.options.map((opt) => {
            const isSelected = filter.selected.includes(opt.value);
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  const next = isSelected ? filter.selected.filter((v) => v !== opt.value) : [...filter.selected, opt.value];
                  onFilterChange?.(filter.id, next);
                },
                className: cn(
                  "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors",
                  "hover:bg-muted text-foreground"
                ),
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: cn(
                        "size-4 rounded border flex items-center justify-center shrink-0",
                        isSelected ? "bg-primary border-primary text-primary-foreground" : "border-border"
                      ),
                      children: isSelected && /* @__PURE__ */ jsx(
                        "svg",
                        {
                          className: "size-3",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "3",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          children: /* @__PURE__ */ jsx("path", { d: "M20 6 9 17l-5-5" })
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "flex-1 text-left", children: opt.label }),
                  opt.count !== void 0 && /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground tabular-nums", children: opt.count })
                ]
              },
              opt.value
            );
          }) })
        ] }, filter.id)),
        hasActiveFilters && onClearFilters && /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: onClearFilters,
            className: "inline-flex h-9 items-center gap-1 rounded-md px-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
            children: [
              /* @__PURE__ */ jsx(XIcon, { className: "size-3.5" }),
              "Clear"
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex-1" }),
        columns && onColumnVisibilityChange && /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowColumns(!showColumns),
              className: cn(
                "inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-sm text-muted-foreground",
                "hover:text-foreground hover:bg-muted transition-colors",
                focusRingClasses
              ),
              "aria-label": "Toggle column visibility",
              children: [
                /* @__PURE__ */ jsx(ColumnsIcon, { className: "size-3.5" }),
                "Columns"
              ]
            }
          ),
          showColumns && /* @__PURE__ */ jsx("div", { className: "absolute top-full right-0 z-50 mt-1 w-48 rounded-lg border border-border bg-background p-1 shadow-lg", children: columns.map((col) => /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => onColumnVisibilityChange(col.id, !col.visible),
              className: "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm hover:bg-muted text-foreground transition-colors",
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: cn(
                      "size-4 rounded border flex items-center justify-center shrink-0",
                      col.visible ? "bg-primary border-primary text-primary-foreground" : "border-border"
                    ),
                    children: col.visible && /* @__PURE__ */ jsx(
                      "svg",
                      {
                        className: "size-3",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "3",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        children: /* @__PURE__ */ jsx("path", { d: "M20 6 9 17l-5-5" })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx("span", { children: col.label })
              ]
            },
            col.id
          )) })
        ] }),
        viewModes && viewMode && onViewModeChange && /* @__PURE__ */ jsx("div", { className: "inline-flex h-9 items-center rounded-md border border-border bg-background p-0.5", children: viewModes.map((mode) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => onViewModeChange(mode),
            className: cn(
              "inline-flex h-7 items-center justify-center rounded-[5px] px-2.5 text-xs font-medium capitalize transition-colors",
              viewMode === mode ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            ),
            "aria-label": `${mode} view`,
            "aria-pressed": viewMode === mode,
            children: mode
          },
          mode
        )) }),
        actions
      ]
    }
  );
});
DataTableToolbar.displayName = "DataTableToolbar";
export {
  DataTableToolbar
};
