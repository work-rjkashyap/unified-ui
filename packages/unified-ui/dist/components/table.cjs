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
var table_exports = {};
__export(table_exports, {
  Table: () => Table,
  TableBody: () => TableBody,
  TableCaption: () => TableCaption,
  TableCell: () => TableCell,
  TableFooter: () => TableFooter,
  TableHead: () => TableHead,
  TableHeader: () => TableHeader,
  TableRow: () => TableRow,
  tableRootVariants: () => tableRootVariants
});
module.exports = __toCommonJS(table_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_react = require("react");
const TableContext = (0, import_react.createContext)({
  density: "comfortable",
  striped: false,
  hoverable: false,
  bordered: false
});
function useTableContext() {
  return (0, import_react.useContext)(TableContext);
}
function SortAscIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m5 15 7-7 7 7" })
    }
  );
}
function SortDescIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m19 9-7 7-7-7" })
    }
  );
}
function SortNeutralIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m7 15 5 5 5-5" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m7 9 5-5 5 5" })
      ]
    }
  );
}
const tableRootVariants = (0, import_class_variance_authority.cva)(
  ["w-full", "caption-bottom", "text-sm", "border-collapse", "m-0"],
  {
    variants: {
      density: {
        compact: "",
        comfortable: ""
      }
    },
    defaultVariants: {
      density: "comfortable"
    }
  }
);
const densityHeadPadding = {
  compact: "px-3 py-1.5",
  comfortable: "px-4 py-2.5"
};
const densityCellPadding = {
  compact: "px-3 py-1.5",
  comfortable: "px-4 py-2"
};
const alignClassMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right"
};
const Table = (0, import_react.forwardRef)(function Table2({
  density = "comfortable",
  striped = false,
  hoverable = false,
  bordered = false,
  responsive = true,
  wrapperClassName,
  className,
  children,
  ...rest
}, ref) {
  const contextValue = {
    density,
    striped,
    hoverable,
    bordered
  };
  const table = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableContext.Provider, { value: contextValue, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "table",
    {
      ref,
      className: (0, import_cn.cn)(
        "not-prose",
        tableRootVariants({ density }),
        bordered && !responsive && "border border-border rounded-md",
        className
      ),
      "data-ds": "",
      "data-ds-component": "table",
      "data-ds-density": density,
      ...rest,
      children
    }
  ) });
  if (responsive) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: (0, import_cn.cn)(
          "not-prose",
          "w-full overflow-x-auto overflow-y-hidden",
          "rounded-md border border-border",
          wrapperClassName
        ),
        "data-ds": "",
        "data-ds-component": "table-wrapper",
        children: table
      }
    );
  }
  return table;
});
Table.displayName = "Table";
const TableHeader = (0, import_react.forwardRef)(function TableHeader2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "thead",
    {
      ref,
      className: (0, import_cn.cn)(
        "bg-muted/50",
        "[&_tr]:border-b [&_tr]:border-border",
        className
      ),
      "data-ds": "",
      "data-ds-component": "table-header",
      ...rest,
      children
    }
  );
});
TableHeader.displayName = "TableHeader";
const TableBody = (0, import_react.forwardRef)(
  function TableBody2({ className, children, ...rest }, ref) {
    const { striped, hoverable, bordered } = useTableContext();
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "tbody",
      {
        ref,
        className: (0, import_cn.cn)(
          // Last row: no bottom border (the wrapper/table border handles it)
          "[&_tr:last-child]:border-b-0",
          // Row borders
          "[&_tr]:border-b [&_tr]:border-border-muted",
          // Striped rows
          striped && "**:data-[ds-row-index=odd]:bg-muted/30",
          // Hoverable rows
          hoverable && "[&_tr]:transition-colors [&_tr]:duration-fast [&_tr:hover]:bg-muted/50",
          // Bordered cells
          bordered && "[&_td]:border-r [&_td]:border-border-muted [&_td:last-child]:border-r-0",
          className
        ),
        "data-ds": "",
        "data-ds-component": "table-body",
        ...rest,
        children
      }
    );
  }
);
TableBody.displayName = "TableBody";
const TableFooter = (0, import_react.forwardRef)(function TableFooter2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "tfoot",
    {
      ref,
      className: (0, import_cn.cn)(
        "bg-muted/50",
        "border-t border-border",
        "font-medium",
        "[&_tr]:border-b-0",
        className
      ),
      "data-ds": "",
      "data-ds-component": "table-footer",
      ...rest,
      children
    }
  );
});
TableFooter.displayName = "TableFooter";
const TableRow = (0, import_react.forwardRef)(
  function TableRow2({ selected = false, className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "tr",
      {
        ref,
        className: (0, import_cn.cn)(
          "transition-colors duration-fast",
          selected && "bg-primary-muted",
          className
        ),
        "data-ds": "",
        "data-ds-component": "table-row",
        "aria-selected": selected || void 0,
        ...rest,
        children
      }
    );
  }
);
TableRow.displayName = "TableRow";
const TableHead = (0, import_react.forwardRef)(
  function TableHead2({
    align = "left",
    sortable = false,
    sorted,
    onSort,
    sticky = false,
    className,
    children,
    ...rest
  }, ref) {
    const { density, bordered } = useTableContext();
    const content = sortable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        type: "button",
        onClick: onSort,
        className: (0, import_cn.cn)(
          "inline-flex items-center gap-1",
          "w-full",
          "cursor-pointer select-none",
          "hover:text-foreground",
          "transition-colors duration-fast",
          import_focus_ring.focusRingCompactClasses,
          "rounded-sm",
          align === "right" && "justify-end",
          align === "center" && "justify-center"
        ),
        "aria-label": sorted === "asc" ? "Sorted ascending. Click to sort descending." : sorted === "desc" ? "Sorted descending. Click to remove sort." : "Click to sort ascending.",
        children: [
          children,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "shrink-0", children: sorted === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortAscIcon, { className: "size-3.5" }) : sorted === "desc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortDescIcon, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortNeutralIcon, { className: "size-3.5 opacity-30" }) })
        ]
      }
    ) : children;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "th",
      {
        ref,
        scope: "col",
        className: (0, import_cn.cn)(
          densityHeadPadding[density],
          alignClassMap[align],
          "text-muted-foreground",
          "font-semibold",
          "whitespace-nowrap",
          sticky && "sticky top-0 z-[var(--z-sticky)] bg-muted/95 backdrop-blur-sm",
          bordered && "border-r border-border-muted last:border-r-0",
          className
        ),
        "data-ds": "",
        "data-ds-component": "table-head",
        "aria-sort": sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : sortable ? "none" : void 0,
        ...rest,
        children: content
      }
    );
  }
);
TableHead.displayName = "TableHead";
const TableCell = (0, import_react.forwardRef)(
  function TableCell2({ align = "left", className, children, ...rest }, ref) {
    const { density } = useTableContext();
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "td",
      {
        ref,
        className: (0, import_cn.cn)(
          densityCellPadding[density],
          alignClassMap[align],
          "text-foreground",
          className
        ),
        "data-ds": "",
        "data-ds-component": "table-cell",
        ...rest,
        children
      }
    );
  }
);
TableCell.displayName = "TableCell";
const TableCaption = (0, import_react.forwardRef)(function TableCaption2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "caption",
    {
      ref,
      className: (0, import_cn.cn)(
        "mt-2 px-4 pb-0.5",
        "text-xs leading-5",
        "text-muted-foreground",
        className
      ),
      "data-ds": "",
      "data-ds-component": "table-caption",
      ...rest,
      children
    }
  );
});
TableCaption.displayName = "TableCaption";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  tableRootVariants
});
