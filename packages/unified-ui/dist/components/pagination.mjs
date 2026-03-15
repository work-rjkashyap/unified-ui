"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { focusRingCompactClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import { forwardRef, useCallback, useMemo, useState } from "react";
function ChevronLeftIcon({ className }) {
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
      children: /* @__PURE__ */ jsx("path", { d: "m15 18-6-6 6-6" })
    }
  );
}
function ChevronRightIcon({ className }) {
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
      children: /* @__PURE__ */ jsx("path", { d: "m9 18 6-6-6-6" })
    }
  );
}
const paginationButtonVariants = cva(
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
    focusRingCompactClasses,
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
const Pagination = forwardRef(
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
    const [internalPage, setInternalPage] = useState(defaultPage);
    const isControlled = controlledPage !== void 0;
    const currentPage = Math.max(
      1,
      Math.min(isControlled ? controlledPage : internalPage, totalPages)
    );
    const handlePageChange = useCallback(
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
    const pageItems = useMemo(
      () => variant === "default" ? computePageRange(currentPage, totalPages, siblings, boundary) : [],
      [variant, currentPage, totalPages, siblings, boundary]
    );
    if (variant === "compact") {
      return /* @__PURE__ */ jsxs(
        "nav",
        {
          ref,
          "aria-label": ariaLabel,
          className: cn("inline-flex items-center gap-1", className),
          "data-ds": "",
          "data-ds-component": "pagination",
          "data-ds-variant": "compact",
          "data-ds-size": size,
          ...rest,
          children: [
            showPrevNext && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                disabled: isFirstPage,
                onClick: () => handlePageChange(currentPage - 1),
                className: cn(
                  paginationButtonVariants({
                    size,
                    active: false
                  })
                ),
                "aria-label": prevLabel,
                children: /* @__PURE__ */ jsx(ChevronLeftIcon, { className: iconSizeMap[size] })
              }
            ),
            /* @__PURE__ */ jsxs(
              "span",
              {
                className: cn(
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
            showPrevNext && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                disabled: isLastPage,
                onClick: () => handlePageChange(currentPage + 1),
                className: cn(
                  paginationButtonVariants({
                    size,
                    active: false
                  })
                ),
                "aria-label": nextLabel,
                children: /* @__PURE__ */ jsx(ChevronRightIcon, { className: iconSizeMap[size] })
              }
            )
          ]
        }
      );
    }
    return /* @__PURE__ */ jsxs(
      "nav",
      {
        ref,
        "aria-label": ariaLabel,
        className: cn("inline-flex items-center gap-1", className),
        "data-ds": "",
        "data-ds-component": "pagination",
        "data-ds-variant": "default",
        "data-ds-size": size,
        ...rest,
        children: [
          showPrevNext && /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              disabled: isFirstPage,
              onClick: () => handlePageChange(currentPage - 1),
              className: cn(paginationButtonVariants({ size, active: false })),
              "aria-label": prevLabel,
              children: [
                /* @__PURE__ */ jsx(ChevronLeftIcon, { className: iconSizeMap[size] }),
                /* @__PURE__ */ jsx("span", { className: "sr-only sm:not-sr-only", children: prevLabel })
              ]
            }
          ),
          pageItems.map((item) => {
            if (item.type === "ellipsis") {
              return /* @__PURE__ */ jsx(
                "span",
                {
                  className: cn(
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
            return /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => handlePageChange(item.value),
                className: cn(
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
          showPrevNext && /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              disabled: isLastPage,
              onClick: () => handlePageChange(currentPage + 1),
              className: cn(paginationButtonVariants({ size, active: false })),
              "aria-label": nextLabel,
              children: [
                /* @__PURE__ */ jsx("span", { className: "sr-only sm:not-sr-only", children: nextLabel }),
                /* @__PURE__ */ jsx(ChevronRightIcon, { className: iconSizeMap[size] })
              ]
            }
          )
        ]
      }
    );
  }
);
Pagination.displayName = "Pagination";
export {
  Pagination,
  paginationButtonVariants
};
