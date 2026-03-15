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
var pagination_exports = {};
__export(pagination_exports, {
  Pagination: () => Pagination,
  paginationButtonVariants: () => paginationButtonVariants
});
module.exports = __toCommonJS(pagination_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_react = require("react");
function ChevronLeftIcon({ className }) {
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
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m15 18-6-6 6-6" })
    }
  );
}
function ChevronRightIcon({ className }) {
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
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 18 6-6-6-6" })
    }
  );
}
const paginationButtonVariants = (0, import_class_variance_authority.cva)(
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
    import_focus_ring.focusRingCompactClasses,
    // Disabled
    "disabled:pointer-events-none disabled:opacity-40",
    // Cursor
    "cursor-pointer",
    "select-none"
  ],
  {
    variants: {
      size: {
        sm: "h-7 min-w-7 px-1.5 text-xs gap-1",
        md: "h-9 min-w-9 px-2 text-sm gap-1.5"
      },
      active: {
        true: "bg-primary text-primary-foreground hover:bg-primary-hover",
        false: "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
      }
    },
    defaultVariants: {
      size: "md",
      active: false
    }
  }
);
function computePageRange(currentPage, totalPages, siblings, boundary) {
  const pages = /* @__PURE__ */ new Set();
  for (let i = 1; i <= Math.min(boundary, totalPages); i++) {
    pages.add(i);
  }
  for (let i = Math.max(1, totalPages - boundary + 1); i <= totalPages; i++) {
    pages.add(i);
  }
  for (let i = Math.max(1, currentPage - siblings); i <= Math.min(totalPages, currentPage + siblings); i++) {
    pages.add(i);
  }
  const sorted = Array.from(pages).sort((a, b) => a - b);
  const items = [];
  for (let i = 0; i < sorted.length; i++) {
    const page = sorted[i];
    if (i > 0 && page - sorted[i - 1] > 1) {
      items.push({
        type: "ellipsis",
        key: `ellipsis-${sorted[i - 1]}-${page}`
      });
    }
    items.push({ type: "page", value: page });
  }
  return items;
}
const iconSizeMap = {
  sm: "size-3.5",
  md: "size-4"
};
const ellipsisSizeMap = {
  sm: "h-7 min-w-7 text-xs",
  md: "h-9 min-w-9 text-sm"
};
const Pagination = (0, import_react.forwardRef)(
  function Pagination2({
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
  }, ref) {
    const [internalPage, setInternalPage] = (0, import_react.useState)(defaultPage);
    const isControlled = controlledPage !== void 0;
    const currentPage = Math.max(
      1,
      Math.min(isControlled ? controlledPage : internalPage, totalPages)
    );
    const handlePageChange = (0, import_react.useCallback)(
      (newPage) => {
        const clamped = Math.max(1, Math.min(newPage, totalPages));
        if (!isControlled) {
          setInternalPage(clamped);
        }
        onPageChange?.(clamped);
      },
      [isControlled, totalPages, onPageChange]
    );
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    const pageItems = (0, import_react.useMemo)(
      () => variant === "default" ? computePageRange(currentPage, totalPages, siblings, boundary) : [],
      [variant, currentPage, totalPages, siblings, boundary]
    );
    if (variant === "compact") {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "nav",
        {
          ref,
          "aria-label": ariaLabel,
          className: (0, import_cn.cn)("inline-flex items-center gap-1", className),
          "data-ds": "",
          "data-ds-component": "pagination",
          "data-ds-variant": "compact",
          "data-ds-size": size,
          ...rest,
          children: [
            showPrevNext && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                disabled: isFirstPage,
                onClick: () => handlePageChange(currentPage - 1),
                className: (0, import_cn.cn)(
                  paginationButtonVariants({
                    size,
                    active: false
                  })
                ),
                "aria-label": prevLabel,
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeftIcon, { className: iconSizeMap[size] })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "span",
              {
                className: (0, import_cn.cn)(
                  "inline-flex items-center justify-center px-3",
                  "text-foreground font-medium tabular-nums",
                  size === "sm" ? "text-xs" : "text-sm"
                ),
                children: [
                  "Page ",
                  currentPage,
                  " of ",
                  totalPages
                ]
              }
            ),
            showPrevNext && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                disabled: isLastPage,
                onClick: () => handlePageChange(currentPage + 1),
                className: (0, import_cn.cn)(
                  paginationButtonVariants({
                    size,
                    active: false
                  })
                ),
                "aria-label": nextLabel,
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRightIcon, { className: iconSizeMap[size] })
              }
            )
          ]
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "nav",
      {
        ref,
        "aria-label": ariaLabel,
        className: (0, import_cn.cn)("inline-flex items-center gap-1", className),
        "data-ds": "",
        "data-ds-component": "pagination",
        "data-ds-variant": "default",
        "data-ds-size": size,
        ...rest,
        children: [
          showPrevNext && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              type: "button",
              disabled: isFirstPage,
              onClick: () => handlePageChange(currentPage - 1),
              className: (0, import_cn.cn)(paginationButtonVariants({ size, active: false })),
              "aria-label": prevLabel,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeftIcon, { className: iconSizeMap[size] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "sr-only sm:not-sr-only", children: prevLabel })
              ]
            }
          ),
          pageItems.map((item) => {
            if (item.type === "ellipsis") {
              return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "span",
                {
                  className: (0, import_cn.cn)(
                    "inline-flex items-center justify-center",
                    "text-muted-foreground select-none",
                    ellipsisSizeMap[size]
                  ),
                  "aria-hidden": "true",
                  children: "\u2026"
                },
                item.key
              );
            }
            const isActive = item.value === currentPage;
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                onClick: () => handlePageChange(item.value),
                className: (0, import_cn.cn)(
                  paginationButtonVariants({
                    size,
                    active: isActive
                  })
                ),
                "aria-current": isActive ? "page" : void 0,
                "aria-label": `Page ${item.value}`,
                children: item.value
              },
              item.value
            );
          }),
          showPrevNext && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              type: "button",
              disabled: isLastPage,
              onClick: () => handlePageChange(currentPage + 1),
              className: (0, import_cn.cn)(paginationButtonVariants({ size, active: false })),
              "aria-label": nextLabel,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "sr-only sm:not-sr-only", children: nextLabel }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRightIcon, { className: iconSizeMap[size] })
              ]
            }
          )
        ]
      }
    );
  }
);
Pagination.displayName = "Pagination";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Pagination,
  paginationButtonVariants
});
