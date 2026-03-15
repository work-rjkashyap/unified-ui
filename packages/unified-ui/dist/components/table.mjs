"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { focusRingCompactClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import { createContext, forwardRef, useContext } from "react";
const TableContext = createContext({
  density: "comfortable",
  striped: false,
  hoverable: false,
  bordered: false
});
function useTableContext() {
  return useContext(TableContext);
}
function SortAscIcon({ className }) {
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
      children: /* @__PURE__ */ jsx("path", { d: "m5 15 7-7 7 7" })
    }
  );
}
function SortDescIcon({ className }) {
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
      children: /* @__PURE__ */ jsx("path", { d: "m19 9-7 7-7-7" })
    }
  );
}
function SortNeutralIcon({ className }) {
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
        /* @__PURE__ */ jsx("path", { d: "m7 15 5 5 5-5" }),
        /* @__PURE__ */ jsx("path", { d: "m7 9 5-5 5 5" })
      ]
    }
  );
}
const tableRootVariants = cva(
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
const Table = forwardRef(function Table2({
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
  const table = /* @__PURE__ */ jsx(TableContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(
    "table",
    {
      ref,
      className: cn(
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
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
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
const TableHeader = forwardRef(function TableHeader2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    "thead",
    {
      ref,
      className: cn(
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
const TableBody = forwardRef(
  function TableBody2({ className, children, ...rest }, ref) {
    const { striped, hoverable, bordered } = useTableContext();
    return /* @__PURE__ */ jsx(
      "tbody",
      {
        ref,
        className: cn(
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
const TableFooter = forwardRef(function TableFooter2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    "tfoot",
    {
      ref,
      className: cn(
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
const TableRow = forwardRef(
  function TableRow2({ selected = false, className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsx(
      "tr",
      {
        ref,
        className: cn(
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
const TableHead = forwardRef(
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
    const content = sortable ? /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: onSort,
        className: cn(
          "inline-flex items-center gap-1",
          "w-full",
          "cursor-pointer select-none",
          "hover:text-foreground",
          "transition-colors duration-fast",
          focusRingCompactClasses,
          "rounded-sm",
          align === "right" && "justify-end",
          align === "center" && "justify-center"
        ),
        "aria-label": sorted === "asc" ? "Sorted ascending. Click to sort descending." : sorted === "desc" ? "Sorted descending. Click to remove sort." : "Click to sort ascending.",
        children: [
          children,
          /* @__PURE__ */ jsx("span", { className: "shrink-0", children: sorted === "asc" ? /* @__PURE__ */ jsx(SortAscIcon, { className: "size-3.5" }) : sorted === "desc" ? /* @__PURE__ */ jsx(SortDescIcon, { className: "size-3.5" }) : /* @__PURE__ */ jsx(SortNeutralIcon, { className: "size-3.5 opacity-30" }) })
        ]
      }
    ) : children;
    return /* @__PURE__ */ jsx(
      "th",
      {
        ref,
        scope: "col",
        className: cn(
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
const TableCell = forwardRef(
  function TableCell2({ align = "left", className, children, ...rest }, ref) {
    const { density } = useTableContext();
    return /* @__PURE__ */ jsx(
      "td",
      {
        ref,
        className: cn(
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
const TableCaption = forwardRef(function TableCaption2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    "caption",
    {
      ref,
      className: cn(
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
export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  tableRootVariants
};
