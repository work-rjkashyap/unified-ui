"use strict";
"use client";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var data_table_exports = {};
__export(data_table_exports, {
  DataTable: () => DataTable,
  createColumnHelper: () => import_react_table2.createColumnHelper,
  useDataTable: () => useDataTable
});
module.exports = __toCommonJS(data_table_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react_table = require("@tanstack/react-table");
var import_cn = require("../utils/cn");
var import_react = require("react");
var import_table = require("./table");
var import_react_table2 = require("@tanstack/react-table");
function Dropdown({
  trigger,
  children,
  align = "start"
}) {
  const [open, setOpen] = (0, import_react.useState)(false);
  const ref = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    if (!open) return;
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref, className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        onClick: () => setOpen((v) => !v),
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
        },
        children: trigger
      }
    ),
    open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: (0, import_cn.cn)(
          "absolute top-full z-[var(--z-dropdown)] mt-1",
          align === "end" ? "right-0" : "left-0",
          "min-w-[8rem] rounded-md py-1",
          "border border-border bg-popover text-popover-foreground",
          "shadow-md"
        ),
        role: "menu",
        "data-ds": "",
        "data-ds-component": "data-table-dropdown",
        children
      }
    )
  ] });
}
function DropdownItem({
  children,
  onClick,
  active
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      type: "button",
      role: "menuitem",
      onClick,
      className: (0, import_cn.cn)(
        "flex w-full items-center gap-2 px-2 py-1.5 text-sm",
        "cursor-pointer rounded-sm",
        active ? "bg-muted text-foreground" : "text-foreground hover:bg-muted/50",
        "transition-colors duration-fast"
      ),
      children
    }
  );
}
function DataTableColumnHeaderMenu({
  column,
  title
}) {
  const isSorted = column.getIsSorted();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Dropdown,
    {
      trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          type: "button",
          className: (0, import_cn.cn)(
            "inline-flex items-center gap-1 -ml-1 px-1 py-0.5",
            "cursor-pointer select-none rounded-sm",
            "hover:bg-muted/50",
            "transition-colors duration-fast",
            "text-muted-foreground font-semibold whitespace-nowrap"
          ),
          children: [
            title,
            isSorted === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "svg",
              {
                className: "size-3.5",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m5 12 7-7 7 7" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 19V5" })
                ]
              }
            ) : isSorted === "desc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "svg",
              {
                className: "size-3.5",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 5v14" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m19 12-7 7-7-7" })
                ]
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "svg",
              {
                className: "size-3.5 opacity-40",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m7 15 5 5 5-5" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m7 9 5-5 5 5" })
                ]
              }
            )
          ]
        }
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "px-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          DropdownItem,
          {
            onClick: () => column.toggleSorting(false),
            active: isSorted === "asc",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "svg",
                {
                  className: "size-3.5",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  "aria-hidden": "true",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m5 12 7-7 7 7" }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 19V5" })
                  ]
                }
              ),
              "Asc"
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          DropdownItem,
          {
            onClick: () => column.toggleSorting(true),
            active: isSorted === "desc",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "svg",
                {
                  className: "size-3.5",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  "aria-hidden": "true",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 5v14" }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m19 12-7 7-7-7" })
                  ]
                }
              ),
              "Desc"
            ]
          }
        ),
        column.getCanHide() && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-1 h-px bg-border" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownItem, { onClick: () => column.toggleVisibility(false), children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "svg",
              {
                className: "size-3.5",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.749 10.749 0 0 1 4.446-5.143" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m2 2 20 20" })
                ]
              }
            ),
            "Hide"
          ] })
        ] })
      ] })
    }
  );
}
function DataTableFacetedFilterButton({
  column,
  title,
  icon,
  options: explicitOptions
}) {
  if (!column) return null;
  const facets = column.getFacetedUniqueValues();
  const selectedValues = new Set(column.getFilterValue() ?? []);
  const options = explicitOptions ?? Array.from(facets.keys()).sort().map((value) => ({ label: String(value), value: String(value) }));
  const toggleValue = (value) => {
    const next = new Set(selectedValues);
    if (next.has(value)) {
      next.delete(value);
    } else {
      next.add(value);
    }
    const filterValue = next.size > 0 ? Array.from(next) : void 0;
    column.setFilterValue(filterValue);
  };
  const clearFilter = () => {
    column.setFilterValue(void 0);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Dropdown,
    {
      trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          type: "button",
          className: (0, import_cn.cn)(
            "inline-flex items-center gap-1.5 rounded-md px-3 h-8",
            "text-xs font-medium text-foreground",
            "border border-dashed border-border bg-background",
            "hover:bg-muted/50",
            "focus-visible:outline-none focus-visible:border-border-strong",
            "transition-colors duration-fast"
          ),
          "data-ds": "",
          "data-ds-component": "data-table-faceted-filter",
          children: [
            icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3.5", children: icon }),
            title,
            selectedValues.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mx-0.5 h-4 w-px bg-border" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex items-center justify-center rounded-sm bg-muted px-1.5 text-[10px] font-semibold", children: selectedValues.size })
            ] })
          ]
        }
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "px-1 max-h-64 overflow-y-auto", children: [
        options.map((option) => {
          const isSelected = selectedValues.has(option.value);
          const count = facets.get(option.value);
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "label",
            {
              className: (0, import_cn.cn)(
                "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5",
                "text-sm text-foreground",
                "hover:bg-muted/50",
                "transition-colors duration-fast"
              ),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "input",
                  {
                    type: "checkbox",
                    checked: isSelected,
                    onChange: () => toggleValue(option.value),
                    className: "size-3.5 rounded-sm accent-primary"
                  }
                ),
                option.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3.5 shrink-0", children: option.icon }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1 truncate", children: option.label }),
                count !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ml-auto text-xs text-muted-foreground tabular-nums", children: count })
              ]
            },
            option.value
          );
        }),
        selectedValues.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-1 h-px bg-border" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              type: "button",
              onClick: clearFilter,
              className: (0, import_cn.cn)(
                "w-full rounded-sm px-2 py-1.5 text-center text-sm",
                "text-foreground hover:bg-muted/50",
                "transition-colors duration-fast"
              ),
              children: "Clear filter"
            }
          )
        ] })
      ] })
    }
  );
}
function DataTableSortBadge({ table }) {
  const sorting = table.getState().sorting;
  if (sorting.length === 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Dropdown,
    {
      align: "end",
      trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          type: "button",
          className: (0, import_cn.cn)(
            "inline-flex items-center gap-1.5 rounded-md px-3 h-8",
            "text-xs font-medium text-foreground",
            "border border-border bg-background",
            "hover:bg-muted/50",
            "focus-visible:outline-none focus-visible:border-border-strong",
            "transition-colors duration-fast"
          ),
          "data-ds": "",
          "data-ds-component": "data-table-sort-badge",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "svg",
              {
                className: "size-3.5",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m21 16-4 4-4-4" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17 20V4" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m3 8 4-4 4 4" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 4v16" })
                ]
              }
            ),
            "Sort",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex size-4 items-center justify-center rounded-full bg-foreground text-background text-[10px] font-bold", children: sorting.length })
          ]
        }
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "px-1", children: [
        sorting.map((sort) => {
          const col = table.getColumn(sort.id);
          const label = col && typeof col.columnDef.header === "string" ? col.columnDef.header : sort.id;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownItem, { onClick: () => col?.clearSorting(), children: [
            sort.desc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "svg",
              {
                className: "size-3.5",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 5v14" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m19 12-7 7-7-7" })
                ]
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "svg",
              {
                className: "size-3.5",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m5 12 7-7 7 7" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 19V5" })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1", children: label }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xs text-muted-foreground", children: sort.desc ? "desc" : "asc" })
          ] }, sort.id);
        }),
        sorting.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-1 h-px bg-border" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownItem, { onClick: () => table.resetSorting(), children: "Clear all sorts" })
        ] })
      ] })
    }
  );
}
function DataTableViewButton({
  table
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Dropdown,
    {
      align: "end",
      trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          type: "button",
          className: (0, import_cn.cn)(
            "inline-flex items-center gap-1.5 rounded-md px-3 h-8",
            "text-xs font-medium text-foreground",
            "border border-border bg-background",
            "hover:bg-muted/50",
            "focus-visible:outline-none focus-visible:border-border-strong",
            "transition-colors duration-fast"
          ),
          "data-ds": "",
          "data-ds-component": "data-table-view-button",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "svg",
              {
                className: "size-3.5",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "21", x2: "14", y1: "4", y2: "4" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "10", x2: "3", y1: "4", y2: "4" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "21", x2: "12", y1: "12", y2: "12" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "8", x2: "3", y1: "12", y2: "12" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "21", x2: "16", y1: "20", y2: "20" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", x2: "3", y1: "20", y2: "20" })
                ]
              }
            ),
            "View"
          ]
        }
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-1", children: table.getAllLeafColumns().map((column) => {
        if (column.id === "select" || !column.getCanHide()) return null;
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "label",
          {
            className: (0, import_cn.cn)(
              "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5",
              "text-sm text-foreground",
              "hover:bg-muted/50",
              "transition-colors duration-fast"
            ),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  type: "checkbox",
                  checked: column.getIsVisible(),
                  onChange: column.getToggleVisibilityHandler(),
                  className: "size-3.5 rounded-sm accent-primary"
                }
              ),
              typeof column.columnDef.header === "string" ? column.columnDef.header : column.id
            ]
          },
          column.id
        );
      }) })
    }
  );
}
function DataTableCheckbox({
  checked,
  indeterminate,
  onChange,
  disabled,
  "aria-label": ariaLabel
}) {
  const ref = (0, import_react.useCallback)(
    (el) => {
      if (el) {
        el.indeterminate = indeterminate ?? false;
      }
    },
    [indeterminate]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "input",
    {
      type: "checkbox",
      ref,
      checked,
      onChange,
      disabled,
      "aria-label": ariaLabel,
      className: (0, import_cn.cn)(
        "size-4 cursor-pointer rounded-sm",
        "border border-border",
        "accent-primary",
        "focus-visible:outline-none focus-visible:border-border-strong",
        "disabled:cursor-not-allowed disabled:opacity-50"
      )
    }
  );
}
function DataTableGlobalFilter({
  value,
  onChange,
  placeholder
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "input",
    {
      type: "text",
      value,
      onChange: (e) => onChange(e.target.value),
      placeholder: placeholder ?? "Search...",
      className: (0, import_cn.cn)(
        "h-9 w-full max-w-xs rounded-md px-3 text-sm",
        "border border-border bg-background text-foreground",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:border-border-strong",
        "transition-colors duration-fast"
      ),
      "data-ds": "",
      "data-ds-component": "data-table-search"
    }
  );
}
function DataTableColumnFilter({
  value,
  onChange,
  placeholder
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "input",
    {
      type: "text",
      value,
      onChange: (e) => onChange(e.target.value),
      placeholder: placeholder ?? "Filter...",
      className: (0, import_cn.cn)(
        "mt-1 h-7 w-full rounded-sm px-2 text-xs",
        "border border-border-muted bg-background text-foreground",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:border-border-strong",
        "transition-colors duration-fast"
      ),
      "data-ds": "",
      "data-ds-component": "data-table-column-filter"
    }
  );
}
function _DataTableColumnVisibility({
  table
}) {
  const [open, setOpen] = (0, import_react.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        type: "button",
        onClick: () => setOpen(!open),
        className: (0, import_cn.cn)(
          "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5",
          "text-sm font-medium text-foreground",
          "border border-border bg-background",
          "hover:bg-muted/50",
          "focus-visible:outline-none focus-visible:border-border-strong",
          "transition-colors duration-fast"
        ),
        "data-ds": "",
        "data-ds-component": "data-table-column-toggle",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "svg",
            {
              className: "size-4",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 3v18" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { width: "6", height: "18", x: "3", y: "3", rx: "2" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { width: "6", height: "18", x: "15", y: "3", rx: "2" })
              ]
            }
          ),
          "Columns"
        ]
      }
    ),
    open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: "fixed inset-0 z-[var(--z-dropdown)]",
          onClick: () => setOpen(false),
          onKeyDown: (e) => {
            if (e.key === "Escape") setOpen(false);
          },
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: (0, import_cn.cn)(
            "absolute right-0 top-full z-[var(--z-dropdown)] mt-1",
            "min-w-[10rem] rounded-md p-1",
            "border border-border bg-popover text-popover-foreground",
            "shadow-md",
            "animate-in fade-in-0 zoom-in-95"
          ),
          role: "menu",
          "data-ds": "",
          "data-ds-component": "data-table-column-menu",
          children: table.getAllLeafColumns().map((column) => {
            if (column.id === "select") return null;
            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "label",
              {
                className: (0, import_cn.cn)(
                  "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5",
                  "text-sm text-foreground",
                  "hover:bg-muted/50",
                  "transition-colors duration-fast"
                ),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "input",
                    {
                      type: "checkbox",
                      checked: column.getIsVisible(),
                      onChange: column.getToggleVisibilityHandler(),
                      className: (0, import_cn.cn)("size-3.5 rounded-sm", "accent-primary")
                    }
                  ),
                  typeof column.columnDef.header === "string" ? column.columnDef.header : column.id
                ]
              },
              column.id
            );
          })
        }
      )
    ] })
  ] });
}
function DataTablePagination({
  table,
  pageSizeOptions
}) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getFilteredRowModel().rows.length;
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: (0, import_cn.cn)(
        "flex flex-col gap-3 px-2 py-3",
        "sm:flex-row sm:items-center sm:justify-between"
      ),
      "data-ds": "",
      "data-ds-component": "data-table-pagination",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-xs text-muted-foreground", children: [
          selectedCount,
          " of ",
          totalRows,
          " row(s) selected."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-6", children: [
          pageSizeOptions !== false && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 text-xs text-foreground", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "whitespace-nowrap", children: "Rows per page" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "select",
              {
                value: pageSize,
                onChange: (e) => table.setPageSize(Number(e.target.value)),
                className: (0, import_cn.cn)(
                  "h-8 rounded-md border border-border bg-background px-2 text-xs text-foreground",
                  "focus-visible:outline-none focus-visible:border-border-strong",
                  "appearance-none cursor-pointer pr-6",
                  "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23888%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')]",
                  "bg-[position:right_0.4rem_center] bg-no-repeat"
                ),
                children: (pageSizeOptions || [10, 20, 30, 50, 100]).map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: size, children: size }, size))
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-xs text-foreground whitespace-nowrap", children: [
            "Page ",
            pageIndex + 1,
            " of ",
            pageCount || 1
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              PaginationButton,
              {
                onClick: () => table.firstPage(),
                disabled: !table.getCanPreviousPage(),
                "aria-label": "Go to first page",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "svg",
                  {
                    className: "size-3.5",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    "aria-hidden": "true",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m11 17-5-5 5-5" }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m18 17-5-5 5-5" })
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              PaginationButton,
              {
                onClick: () => table.previousPage(),
                disabled: !table.getCanPreviousPage(),
                "aria-label": "Go to previous page",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "svg",
                  {
                    className: "size-3.5",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m15 18-6-6 6-6" })
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              PaginationButton,
              {
                onClick: () => table.nextPage(),
                disabled: !table.getCanNextPage(),
                "aria-label": "Go to next page",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "svg",
                  {
                    className: "size-3.5",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 18 6-6-6-6" })
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              PaginationButton,
              {
                onClick: () => table.lastPage(),
                disabled: !table.getCanNextPage(),
                "aria-label": "Go to last page",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "svg",
                  {
                    className: "size-3.5",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    "aria-hidden": "true",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m13 17 5-5-5-5" }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m6 17 5-5-5-5" })
                    ]
                  }
                )
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function PaginationButton({
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      type: "button",
      ...props,
      className: (0, import_cn.cn)(
        "inline-flex size-8 items-center justify-center rounded-md",
        "border border-border bg-background text-foreground",
        "hover:bg-muted/50",
        "focus-visible:outline-none focus-visible:border-border-strong",
        "disabled:pointer-events-none disabled:opacity-50",
        "transition-colors duration-fast"
      ),
      children
    }
  );
}
function DataTableSkeleton({
  columnCount,
  rowCount = 5,
  density
}) {
  const heightClass = density === "compact" ? "h-3" : "h-4";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: Array.from({ length: rowCount }).map((_, rowIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableRow, { className: "animate-pulse", children: Array.from({ length: columnCount }).map((_2, colIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: (0, import_cn.cn)(
        heightClass,
        "rounded-sm bg-muted",
        colIndex === 0 ? "w-3/4" : colIndex === columnCount - 1 ? "w-1/3" : "w-2/3"
      )
    }
  ) }, colIndex)) }, rowIndex)) });
}
const DataTable = (0, import_react.forwardRef)(
  function DataTable2({
    // Data
    data,
    columns: userColumns,
    // Faceted filters
    facetedFilters,
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
    // Faceted filtering requires filtering to be enabled
    // (handled below in table config)
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
    onTableInstance
  }, ref) {
    const [internalSorting, setInternalSorting] = (0, import_react.useState)([]);
    const [internalGlobalFilter, setInternalGlobalFilter] = (0, import_react.useState)("");
    const [internalColumnFilters, setInternalColumnFilters] = (0, import_react.useState)([]);
    const [internalPagination, setInternalPagination] = (0, import_react.useState)({
      pageIndex: 0,
      pageSize
    });
    const [internalRowSelection, setInternalRowSelection] = (0, import_react.useState)({});
    const [internalColumnVisibility, setInternalColumnVisibility] = (0, import_react.useState)({});
    const [internalColumnPinning, setInternalColumnPinning] = (0, import_react.useState)({});
    const sortingValue = controlledSorting ?? internalSorting;
    const onSortingChange = onControlledSortingChange ?? setInternalSorting;
    const globalFilterValue = controlledGlobalFilter ?? internalGlobalFilter;
    const onGlobalFilterChange = onControlledGlobalFilterChange ?? setInternalGlobalFilter;
    const columnFiltersValue = controlledColumnFilters ?? internalColumnFilters;
    const onColumnFiltersChange = onControlledColumnFiltersChange ?? setInternalColumnFilters;
    const paginationValue = controlledPagination ?? internalPagination;
    const onPaginationChange = onControlledPaginationChange ?? setInternalPagination;
    const rowSelectionValue = controlledRowSelection ?? internalRowSelection;
    const onRowSelectionChange = onControlledRowSelectionChange ?? setInternalRowSelection;
    const columnVisibilityValue = controlledColumnVisibility ?? internalColumnVisibility;
    const onColumnVisibilityChange = onControlledColumnVisibilityChange ?? setInternalColumnVisibility;
    const columnPinningValue = controlledColumnPinning ?? internalColumnPinning;
    const onColumnPinningChange = onControlledColumnPinningChange ?? setInternalColumnPinning;
    const columns = (0, import_react.useMemo)(() => {
      if (!rowSelectionMode) return userColumns;
      const selectionColumn = {
        id: "select",
        header: rowSelectionMode === "multi" ? ({ table: t }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          DataTableCheckbox,
          {
            checked: t.getIsAllPageRowsSelected(),
            indeterminate: t.getIsSomePageRowsSelected(),
            onChange: t.getToggleAllPageRowsSelectedHandler(),
            "aria-label": "Select all rows"
          }
        ) : void 0,
        cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          DataTableCheckbox,
          {
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
            "aria-label": `Select row ${row.index + 1}`
          }
        ),
        size: 40,
        enableSorting: false,
        enableHiding: false
      };
      return [selectionColumn, ...userColumns];
    }, [userColumns, rowSelectionMode]);
    const hasFacetedFilters = !!(facetedFilters && facetedFilters.length > 0);
    const table = (0, import_react_table.useReactTable)({
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
        columnPinning: columnPinningValue
      },
      // Sorting
      onSortingChange,
      enableSorting,
      enableMultiSort: multiSort,
      getSortedRowModel: enableSorting ? (0, import_react_table.getSortedRowModel)() : void 0,
      // Filtering
      onGlobalFilterChange,
      onColumnFiltersChange,
      enableFilters: enableFiltering || hasFacetedFilters,
      getFilteredRowModel: enableFiltering || hasFacetedFilters ? (0, import_react_table.getFilteredRowModel)() : void 0,
      // Faceted models (for unique value counts in filter popovers)
      ...hasFacetedFilters ? {
        getFacetedRowModel: (0, import_react_table.getFacetedRowModel)(),
        getFacetedUniqueValues: (0, import_react_table.getFacetedUniqueValues)()
      } : {},
      // Pagination
      onPaginationChange,
      getPaginationRowModel: enablePagination ? (0, import_react_table.getPaginationRowModel)() : void 0,
      // Row selection
      onRowSelectionChange: (updater) => {
        onRowSelectionChange(updater);
        if (onSelectedRowsChange) {
          const next = typeof updater === "function" ? updater(rowSelectionValue) : updater;
          setTimeout(() => {
            const selectedRows = table.getRowModel().rows.filter((row) => next[row.id]);
            onSelectedRowsChange(selectedRows);
          }, 0);
        }
      },
      enableRowSelection: rowSelectionMode === false ? false : enableRowSelection,
      enableMultiRowSelection: rowSelectionMode === "multi",
      // Column visibility
      onColumnVisibilityChange,
      // Column pinning
      onColumnPinningChange,
      // Core
      getCoreRowModel: (0, import_react_table.getCoreRowModel)()
    });
    if (onTableInstance) {
      onTableInstance(table);
    }
    const headerGroups = table.getHeaderGroups();
    const rows = table.getRowModel().rows;
    const footerGroups = table.getFooterGroups();
    const visibleColumnCount = table.getVisibleLeafColumns().length;
    const hasToolbar = showGlobalFilter || enableColumnVisibility || toolbar || hasFacetedFilters || enableSorting && sortingValue.length > 0;
    const toSortDir = (dir) => {
      if (dir === "asc") return "asc";
      if (dir === "desc") return "desc";
      return void 0;
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref,
        className: (0, import_cn.cn)("not-prose", "flex flex-col gap-3", className),
        "data-ds": "",
        "data-ds-component": "data-table",
        children: [
          hasToolbar && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "div",
            {
              className: "flex flex-wrap items-center gap-2",
              "data-ds": "",
              "data-ds-component": "data-table-toolbar",
              children: [
                showGlobalFilter && (enableFiltering || hasFacetedFilters) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  DataTableGlobalFilter,
                  {
                    value: globalFilterValue,
                    onChange: onGlobalFilterChange,
                    placeholder: globalFilterPlaceholder
                  }
                ),
                hasFacetedFilters && facetedFilters.map((filter) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  DataTableFacetedFilterButton,
                  {
                    column: table.getColumn(filter.columnId),
                    title: filter.title,
                    icon: filter.icon,
                    options: filter.options
                  },
                  filter.columnId
                )),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
                typeof toolbar === "function" ? toolbar(table) : toolbar,
                enableSorting && sortingValue.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableSortBadge, { table }),
                enableColumnVisibility && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableViewButton, { table })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            import_table.Table,
            {
              density,
              striped,
              hoverable,
              bordered,
              responsive,
              wrapperClassName,
              className: tableClassName,
              children: [
                caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableCaption, { children: caption }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableHeader, { children: headerGroups.map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableRow, { children: headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta;
                  const canSort = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();
                  const canFilter = enableFiltering && header.column.getCanFilter() && meta?.filterable !== false;
                  const showColumnFilter = canFilter && meta?.filterable === true;
                  const useHeaderMenu = meta?.enableHeaderMenu && canSort;
                  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    import_table.TableHead,
                    {
                      colSpan: header.colSpan > 1 ? header.colSpan : void 0,
                      align: meta?.align,
                      sortable: !useHeaderMenu && canSort,
                      sorted: !useHeaderMenu ? toSortDir(sortDir) : void 0,
                      onSort: !useHeaderMenu && canSort ? () => header.column.toggleSorting() : void 0,
                      sticky: meta?.sticky,
                      className: (0, import_cn.cn)(
                        header.column.id === "select" && "w-[40px]",
                        meta?.headerClassName
                      ),
                      style: header.column.getSize() !== 150 ? {
                        width: header.column.getSize(),
                        minWidth: header.column.getSize()
                      } : void 0,
                      children: [
                        header.isPlaceholder ? null : useHeaderMenu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          DataTableColumnHeaderMenu,
                          {
                            column: header.column,
                            title: typeof header.column.columnDef.header === "string" ? header.column.columnDef.header : header.column.id
                          }
                        ) : (0, import_react_table.flexRender)(
                          header.column.columnDef.header,
                          header.getContext()
                        ),
                        showColumnFilter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          DataTableColumnFilter,
                          {
                            value: header.column.getFilterValue() ?? "",
                            onChange: (val) => header.column.setFilterValue(val || void 0),
                            placeholder: meta?.filterPlaceholder
                          }
                        )
                      ]
                    },
                    header.id
                  );
                }) }, headerGroup.id)) }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableBody, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  DataTableSkeleton,
                  {
                    columnCount: visibleColumnCount,
                    density
                  }
                ) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  import_table.TableCell,
                  {
                    colSpan: visibleColumnCount,
                    className: "h-24 text-center",
                    children: emptyState ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-muted-foreground", children: "No results." })
                  }
                ) }) : rows.map((row, rowIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  import_table.TableRow,
                  {
                    selected: row.getIsSelected(),
                    onClick: onRowClick ? (e) => onRowClick(row, e) : void 0,
                    className: (0, import_cn.cn)(onRowClick && "cursor-pointer"),
                    "data-ds-row-index": rowIndex % 2 === 0 ? "even" : "odd",
                    children: row.getVisibleCells().map((cell) => {
                      const meta = cell.column.columnDef.meta;
                      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        import_table.TableCell,
                        {
                          align: meta?.align,
                          className: meta?.cellClassName,
                          style: cell.column.getSize() !== 150 ? {
                            width: cell.column.getSize(),
                            minWidth: cell.column.getSize()
                          } : void 0,
                          children: (0, import_react_table.flexRender)(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        },
                        cell.id
                      );
                    })
                  },
                  row.id
                )) }),
                showFooter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableFooter, { children: footerGroups.map((footerGroup) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableRow, { children: footerGroup.headers.map((header) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableCell, { children: header.isPlaceholder ? null : (0, import_react_table.flexRender)(
                  header.column.columnDef.footer,
                  header.getContext()
                ) }, header.id)) }, footerGroup.id)) })
              ]
            }
          ),
          enablePagination && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            DataTablePagination,
            {
              table,
              pageSizeOptions
            }
          ),
          footer && (typeof footer === "function" ? footer(table) : footer)
        ]
      }
    );
  }
);
DataTable.displayName = "DataTable";
function useDataTable(options) {
  const [sorting, onSortingChange] = (0, import_react.useState)(
    options.initialSorting ?? []
  );
  const [globalFilter, onGlobalFilterChange] = (0, import_react.useState)(
    options.initialGlobalFilter ?? ""
  );
  const [columnFilters, onColumnFiltersChange] = (0, import_react.useState)(
    options.initialColumnFilters ?? []
  );
  const [pagination, onPaginationChange] = (0, import_react.useState)({
    pageIndex: 0,
    pageSize: 10,
    ...options.initialPagination
  });
  const [rowSelection, onRowSelectionChange] = (0, import_react.useState)(
    options.initialRowSelection ?? {}
  );
  const [columnVisibility, onColumnVisibilityChange] = (0, import_react.useState)(options.initialColumnVisibility ?? {});
  const reset = (0, import_react.useCallback)(() => {
    onSortingChange(options.initialSorting ?? []);
    onGlobalFilterChange(options.initialGlobalFilter ?? "");
    onColumnFiltersChange(options.initialColumnFilters ?? []);
    onPaginationChange({
      pageIndex: 0,
      pageSize: 10,
      ...options.initialPagination
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
      onColumnVisibilityChange
    },
    reset
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataTable,
  createColumnHelper,
  useDataTable
});
