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
var infinite_scroll_exports = {};
__export(infinite_scroll_exports, {
  InfiniteScroll: () => InfiniteScroll
});
module.exports = __toCommonJS(infinite_scroll_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_react = require("react");
const InfiniteScroll = (0, import_react.forwardRef)(
  function InfiniteScroll2({
    children,
    loading = false,
    hasMore = true,
    onLoadMore,
    threshold = "200px",
    loadingIndicator,
    endMessage,
    className,
    sentinelClassName
  }, ref) {
    const sentinelRef = (0, import_react.useRef)(null);
    const onLoadMoreRef = (0, import_react.useRef)(onLoadMore);
    (0, import_react.useEffect)(() => {
      onLoadMoreRef.current = onLoadMore;
    }, [onLoadMore]);
    (0, import_react.useEffect)(() => {
      const sentinel = sentinelRef.current;
      if (!sentinel || !hasMore || loading) return;
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting) {
            onLoadMoreRef.current();
          }
        },
        {
          rootMargin: `0px 0px ${threshold} 0px`,
          threshold: 0
        }
      );
      observer.observe(sentinel);
      return () => observer.disconnect();
    }, [hasMore, loading, threshold]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref,
        className: (0, import_cn.cn)(className),
        "data-ds": "",
        "data-ds-component": "infinite-scroll",
        "aria-busy": loading || void 0,
        children: [
          children,
          hasMore && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              ref: sentinelRef,
              className: (0, import_cn.cn)("w-full", sentinelClassName),
              "aria-hidden": "true"
            }
          ),
          loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex items-center justify-center py-4", children: loadingIndicator ?? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-4 animate-spin rounded-full border-2 border-border border-t-primary" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Loading more..." })
          ] }) }),
          !hasMore && !loading && endMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "py-4", children: endMessage })
        ]
      }
    );
  }
);
InfiniteScroll.displayName = "InfiniteScroll";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InfiniteScroll
});
