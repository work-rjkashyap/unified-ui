"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { focusRingCompactClasses } from "../utils/focus-ring";
import { forwardRef, useMemo } from "react";
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
function MoreHorizontalIcon({ className }) {
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
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "1" }),
        /* @__PURE__ */ jsx("circle", { cx: "19", cy: "12", r: "1" }),
        /* @__PURE__ */ jsx("circle", { cx: "5", cy: "12", r: "1" })
      ]
    }
  );
}
const Breadcrumb = forwardRef(
  function Breadcrumb2({ "aria-label": ariaLabel = "Breadcrumb", className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsx(
      "nav",
      {
        ref,
        "aria-label": ariaLabel,
        className: cn("not-prose", className),
        "data-ds": "",
        "data-ds-component": "breadcrumb",
        ...rest,
        children
      }
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";
const BreadcrumbList = forwardRef(
  function BreadcrumbList2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsx(
      "ol",
      {
        ref,
        className: cn(
          "flex flex-wrap items-center gap-1.5",
          "text-xs leading-4 tracking-wide",
          "text-muted-foreground",
          className
        ),
        "data-ds": "",
        "data-ds-component": "breadcrumb-list",
        ...rest,
        children
      }
    );
  }
);
BreadcrumbList.displayName = "BreadcrumbList";
const BreadcrumbItem = forwardRef(
  function BreadcrumbItem2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsx(
      "li",
      {
        ref,
        className: cn("inline-flex items-center gap-1.5", className),
        "data-ds": "",
        "data-ds-component": "breadcrumb-item",
        ...rest,
        children
      }
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";
const BreadcrumbLink = forwardRef(function BreadcrumbLink2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    "a",
    {
      ref,
      className: cn(
        "no-underline",
        "text-muted-foreground",
        "transition-colors duration-fast",
        "hover:text-foreground",
        focusRingCompactClasses,
        "rounded-sm",
        className
      ),
      "data-ds": "",
      "data-ds-component": "breadcrumb-link",
      ...rest,
      children
    }
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";
const BreadcrumbPage = forwardRef(
  function BreadcrumbPage2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsx(
      "span",
      {
        ref,
        "aria-current": "page",
        className: cn("font-medium", "text-foreground", className),
        "data-ds": "",
        "data-ds-component": "breadcrumb-page",
        ...rest,
        children
      }
    );
  }
);
BreadcrumbPage.displayName = "BreadcrumbPage";
const BreadcrumbSeparator = forwardRef(function BreadcrumbSeparator2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      ref,
      role: "presentation",
      "aria-hidden": "true",
      className: cn(
        "inline-flex items-center",
        "text-muted-foreground/60",
        "[&>svg]:size-3",
        className
      ),
      "data-ds": "",
      "data-ds-component": "breadcrumb-separator",
      ...rest,
      children: children ?? /* @__PURE__ */ jsx(ChevronRightIcon, {})
    }
  );
});
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
const BreadcrumbEllipsis = forwardRef(function BreadcrumbEllipsis2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      ref,
      role: "presentation",
      "aria-hidden": "true",
      className: cn(
        "inline-flex items-center justify-center size-5",
        "text-muted-foreground",
        className
      ),
      "data-ds": "",
      "data-ds-component": "breadcrumb-ellipsis",
      ...rest,
      children: [
        /* @__PURE__ */ jsx(MoreHorizontalIcon, { className: "size-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "More pages" })
      ]
    }
  );
});
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
const BreadcrumbNav = forwardRef(
  function BreadcrumbNav2({
    items,
    maxItems = Number.POSITIVE_INFINITY,
    separator,
    className,
    ...rest
  }, ref) {
    const visibleItems = useMemo(() => {
      if (items.length <= maxItems || maxItems < 2 || !Number.isFinite(maxItems)) {
        return { items, truncated: false };
      }
      const tailCount = maxItems - 2;
      const first = items[0];
      const tail = items.slice(items.length - Math.max(tailCount, 1));
      return {
        items: [first, ...tail],
        truncated: true
      };
    }, [items, maxItems]);
    return /* @__PURE__ */ jsx(Breadcrumb, { ref, className, ...rest, children: /* @__PURE__ */ jsx(BreadcrumbList, { children: visibleItems.items.flatMap((item, index) => {
      const itemKey = item.href ?? `page-${index}`;
      const isLast = index === visibleItems.items.length - 1;
      const isFirst = index === 0;
      const showEllipsis = visibleItems.truncated && isFirst;
      const elements = [];
      elements.push(
        /* @__PURE__ */ jsx(BreadcrumbItem, { children: isLast && !item.href ? /* @__PURE__ */ jsx(BreadcrumbPage, { children: item.label }) : /* @__PURE__ */ jsx(BreadcrumbLink, { href: item.href, children: item.label }) }, `item-${itemKey}`)
      );
      if (showEllipsis) {
        elements.push(
          /* @__PURE__ */ jsx(BreadcrumbSeparator, { children: separator }, "sep-ellipsis-before"),
          /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbEllipsis, {}) }, "ellipsis")
        );
      }
      if (!isLast) {
        elements.push(
          /* @__PURE__ */ jsx(BreadcrumbSeparator, { children: separator }, `sep-${itemKey}`)
        );
      }
      return elements;
    }) }) });
  }
);
BreadcrumbNav.displayName = "BreadcrumbNav";
export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbNav,
  BreadcrumbPage,
  BreadcrumbSeparator
};
