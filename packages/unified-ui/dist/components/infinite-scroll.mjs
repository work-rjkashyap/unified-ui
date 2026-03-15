"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { forwardRef, useEffect, useRef } from "react";
const InfiniteScroll = forwardRef(
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
    const sentinelRef = useRef(null);
    const onLoadMoreRef = useRef(onLoadMore);
    useEffect(() => {
      onLoadMoreRef.current = onLoadMore;
    }, [onLoadMore]);
    useEffect(() => {
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
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn(className),
        "data-ds": "",
        "data-ds-component": "infinite-scroll",
        "aria-busy": loading || void 0,
        children: [
          children,
          hasMore && /* @__PURE__ */ jsx(
            "div",
            {
              ref: sentinelRef,
              className: cn("w-full", sentinelClassName),
              "aria-hidden": "true"
            }
          ),
          loading && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-4", children: loadingIndicator ?? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsx("div", { className: "size-4 animate-spin rounded-full border-2 border-border border-t-primary" }),
            /* @__PURE__ */ jsx("span", { children: "Loading more..." })
          ] }) }),
          !hasMore && !loading && endMessage && /* @__PURE__ */ jsx("div", { className: "py-4", children: endMessage })
        ]
      }
    );
  }
);
InfiniteScroll.displayName = "InfiniteScroll";
export {
  InfiniteScroll
};
