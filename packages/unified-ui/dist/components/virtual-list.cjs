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
var virtual_list_exports = {};
__export(virtual_list_exports, {
  VirtualList: () => VirtualList
});
module.exports = __toCommonJS(virtual_list_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_react = require("react");
const VirtualList = (0, import_react.forwardRef)(function VirtualList2({
  items,
  itemHeight,
  renderItem,
  height = 400,
  overscan = 5,
  getItemKey,
  onEndReached,
  endReachedThreshold = 100,
  loading = false,
  loadingIndicator,
  emptyContent,
  className,
  itemClassName
}, ref) {
  const containerRef = (0, import_react.useRef)(null);
  const [scrollTop, setScrollTop] = (0, import_react.useState)(0);
  const totalHeight = items.length * itemHeight;
  const { startIndex, endIndex } = (0, import_react.useMemo)(() => {
    const visCount = Math.ceil(height / itemHeight);
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const end = Math.min(
      items.length - 1,
      Math.floor(scrollTop / itemHeight) + visCount + overscan
    );
    return {
      startIndex: start,
      endIndex: end,
      visibleCount: visCount
    };
  }, [scrollTop, height, itemHeight, items.length, overscan]);
  const handleScroll = (0, import_react.useCallback)(
    (e) => {
      const target = e.currentTarget;
      setScrollTop(target.scrollTop);
      if (onEndReached) {
        const distanceFromBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
        if (distanceFromBottom < endReachedThreshold) {
          onEndReached();
        }
      }
    },
    [onEndReached, endReachedThreshold]
  );
  (0, import_react.useEffect)(() => {
    if (!ref) return;
    const node = containerRef.current;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref && "current" in ref) {
      ref.current = node;
    }
  }, [ref]);
  if (items.length === 0 && emptyContent) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref: containerRef,
        className: (0, import_cn.cn)(
          "flex items-center justify-center rounded-lg border border-border bg-background shadow-sm not-prose",
          className
        ),
        style: { height },
        "data-ds": "",
        "data-ds-component": "virtual-list",
        children: emptyContent
      }
    );
  }
  const visibleItems = [];
  for (let i = startIndex; i <= endIndex && i < items.length; i++) {
    const key = getItemKey ? getItemKey(items[i], i) : i;
    visibleItems.push(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: (0, import_cn.cn)(
            "absolute left-0 right-0 flex items-center",
            "transition-colors duration-fast ease-standard",
            "hover:bg-muted/50",
            "border-b border-border/50",
            "[&_p]:m-0 [&_p]:leading-tight [&_span]:leading-tight",
            itemClassName
          ),
          style: {
            height: itemHeight,
            top: i * itemHeight
          },
          role: "listitem",
          "aria-setsize": items.length,
          "aria-posinset": i + 1,
          children: renderItem(items[i], i)
        },
        key
      )
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      ref: containerRef,
      className: (0, import_cn.cn)(
        "relative overflow-auto rounded-lg border border-border bg-background",
        "shadow-sm not-prose",
        "[scrollbar-width:thin] [scrollbar-color:hsl(var(--border))_transparent]",
        "[&::-webkit-scrollbar]:w-1.5",
        "[&::-webkit-scrollbar-track]:bg-transparent",
        "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border",
        className
      ),
      style: { height },
      onScroll: handleScroll,
      role: "list",
      "data-ds": "",
      "data-ds-component": "virtual-list",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "relative w-full", style: { height: totalHeight }, children: visibleItems }),
        loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "sticky bottom-0 flex items-center justify-center py-3 bg-background/80 backdrop-blur-sm border-t border-border/50", children: loadingIndicator ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-5 animate-spin rounded-full border-2 border-border border-t-primary" }) })
      ]
    }
  );
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VirtualList
});
