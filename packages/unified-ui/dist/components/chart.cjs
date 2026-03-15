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
var chart_exports = {};
__export(chart_exports, {
  ChartContainer: () => ChartContainer,
  ChartTooltipContent: () => ChartTooltipContent,
  chartColors: () => chartColors
});
module.exports = __toCommonJS(chart_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_react = require("react");
const chartColors = [
  "var(--primary)",
  "var(--info)",
  "var(--success)",
  "var(--warning)",
  "var(--danger)",
  "var(--secondary)",
  "var(--muted-foreground)",
  "oklch(0.65 0.15 250)",
  // sky
  "oklch(0.65 0.15 160)",
  // emerald
  "oklch(0.65 0.15 30)"
  // amber
];
const ChartContainer = (0, import_react.forwardRef)(
  function ChartContainer2({
    title,
    description,
    height = 350,
    children,
    footer,
    loading = false,
    loadingIndicator,
    emptyContent,
    className
  }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref,
        className: (0, import_cn.cn)(
          "rounded-lg border border-border bg-background p-4",
          className
        ),
        "data-ds": "",
        "data-ds-component": "chart",
        children: [
          (title || description) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-4 space-y-1", children: [
            title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-base font-semibold text-foreground", children: title }),
            description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-muted-foreground", children: description })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "relative", style: { height }, children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 flex items-center justify-center", children: loadingIndicator ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-6 animate-spin rounded-full border-2 border-border border-t-primary" }) }) : emptyContent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 flex items-center justify-center text-sm text-muted-foreground", children: emptyContent }) : children }),
          footer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 border-t border-border pt-3 text-sm text-muted-foreground", children: footer })
        ]
      }
    );
  }
);
ChartContainer.displayName = "ChartContainer";
function ChartTooltipContent({
  label,
  payload,
  active,
  formatter,
  className
}) {
  if (!active || !payload?.length) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: (0, import_cn.cn)(
        "rounded-lg border border-border bg-background px-3 py-2 shadow-lg",
        "text-sm",
        className
      ),
      children: [
        label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "font-medium text-foreground mb-1", children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "space-y-0.5", children: payload.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              className: "size-2.5 rounded-full shrink-0",
              style: { backgroundColor: entry.color ?? entry.fill }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-muted-foreground", children: [
            entry.name,
            ":"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-medium text-foreground ml-auto tabular-nums", children: formatter ? formatter(entry.value, entry.name) : entry.value })
        ] }, entry.name)) })
      ]
    }
  );
}
ChartTooltipContent.displayName = "ChartTooltipContent";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChartContainer,
  ChartTooltipContent,
  chartColors
});
