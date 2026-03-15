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
var breadcrumb_exports = {};
__export(breadcrumb_exports, {
  Breadcrumb: () => Breadcrumb,
  BreadcrumbEllipsis: () => BreadcrumbEllipsis,
  BreadcrumbItem: () => BreadcrumbItem,
  BreadcrumbLink: () => BreadcrumbLink,
  BreadcrumbList: () => BreadcrumbList,
  BreadcrumbNav: () => BreadcrumbNav,
  BreadcrumbPage: () => BreadcrumbPage,
  BreadcrumbSeparator: () => BreadcrumbSeparator
});
module.exports = __toCommonJS(breadcrumb_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_react = require("react");
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
function MoreHorizontalIcon({ className }) {
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "1" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "19", cy: "12", r: "1" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "5", cy: "12", r: "1" })
      ]
    }
  );
}
const Breadcrumb = (0, import_react.forwardRef)(
  function Breadcrumb2({ "aria-label": ariaLabel = "Breadcrumb", className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "nav",
      {
        ref,
        "aria-label": ariaLabel,
        className: (0, import_cn.cn)("not-prose", className),
        "data-ds": "",
        "data-ds-component": "breadcrumb",
        ...rest,
        children
      }
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";
const BreadcrumbList = (0, import_react.forwardRef)(
  function BreadcrumbList2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "ol",
      {
        ref,
        className: (0, import_cn.cn)(
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
const BreadcrumbItem = (0, import_react.forwardRef)(
  function BreadcrumbItem2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "li",
      {
        ref,
        className: (0, import_cn.cn)("inline-flex items-center gap-1.5", className),
        "data-ds": "",
        "data-ds-component": "breadcrumb-item",
        ...rest,
        children
      }
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";
const BreadcrumbLink = (0, import_react.forwardRef)(function BreadcrumbLink2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "a",
    {
      ref,
      className: (0, import_cn.cn)(
        "no-underline",
        "text-muted-foreground",
        "transition-colors duration-fast",
        "hover:text-foreground",
        import_focus_ring.focusRingCompactClasses,
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
const BreadcrumbPage = (0, import_react.forwardRef)(
  function BreadcrumbPage2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "span",
      {
        ref,
        "aria-current": "page",
        className: (0, import_cn.cn)("font-medium", "text-foreground", className),
        "data-ds": "",
        "data-ds-component": "breadcrumb-page",
        ...rest,
        children
      }
    );
  }
);
BreadcrumbPage.displayName = "BreadcrumbPage";
const BreadcrumbSeparator = (0, import_react.forwardRef)(function BreadcrumbSeparator2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "li",
    {
      ref,
      role: "presentation",
      "aria-hidden": "true",
      className: (0, import_cn.cn)(
        "inline-flex items-center",
        "text-muted-foreground/60",
        "[&>svg]:size-3",
        className
      ),
      "data-ds": "",
      "data-ds-component": "breadcrumb-separator",
      ...rest,
      children: children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRightIcon, {})
    }
  );
});
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
const BreadcrumbEllipsis = (0, import_react.forwardRef)(function BreadcrumbEllipsis2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "span",
    {
      ref,
      role: "presentation",
      "aria-hidden": "true",
      className: (0, import_cn.cn)(
        "inline-flex items-center justify-center size-5",
        "text-muted-foreground",
        className
      ),
      "data-ds": "",
      "data-ds-component": "breadcrumb-ellipsis",
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoreHorizontalIcon, { className: "size-4" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "sr-only", children: "More pages" })
      ]
    }
  );
});
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
const BreadcrumbNav = (0, import_react.forwardRef)(
  function BreadcrumbNav2({
    items,
    maxItems = Number.POSITIVE_INFINITY,
    separator,
    className,
    ...rest
  }, ref) {
    const visibleItems = (0, import_react.useMemo)(() => {
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
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumb, { ref, className, ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbList, { children: visibleItems.items.flatMap((item, index) => {
      const itemKey = item.href ?? `page-${index}`;
      const isLast = index === visibleItems.items.length - 1;
      const isFirst = index === 0;
      const showEllipsis = visibleItems.truncated && isFirst;
      const elements = [];
      elements.push(
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbItem, { children: isLast && !item.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbPage, { children: item.label }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbLink, { href: item.href, children: item.label }) }, `item-${itemKey}`)
      );
      if (showEllipsis) {
        elements.push(
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbSeparator, { children: separator }, "sep-ellipsis-before"),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbEllipsis, {}) }, "ellipsis")
        );
      }
      if (!isLast) {
        elements.push(
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbSeparator, { children: separator }, `sep-${itemKey}`)
        );
      }
      return elements;
    }) }) });
  }
);
BreadcrumbNav.displayName = "BreadcrumbNav";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbNav,
  BreadcrumbPage,
  BreadcrumbSeparator
});
