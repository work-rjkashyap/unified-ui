"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { forwardRef } from "react";
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
const ChartContainer = forwardRef(
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
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn(
          "rounded-lg border border-border bg-background p-4",
          className
        ),
        "data-ds": "",
        "data-ds-component": "chart",
        children: [
          (title || description) && /* @__PURE__ */ jsxs("div", { className: "mb-4 space-y-1", children: [
            title && /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-foreground", children: title }),
            description && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: description })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative", style: { height }, children: loading ? /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: loadingIndicator ?? /* @__PURE__ */ jsx("div", { className: "size-6 animate-spin rounded-full border-2 border-border border-t-primary" }) }) : emptyContent ? /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center text-sm text-muted-foreground", children: emptyContent }) : children }),
          footer && /* @__PURE__ */ jsx("div", { className: "mt-4 border-t border-border pt-3 text-sm text-muted-foreground", children: footer })
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "rounded-lg border border-border bg-background px-3 py-2 shadow-lg",
        "text-sm",
        className
      ),
      children: [
        label && /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground mb-1", children: label }),
        /* @__PURE__ */ jsx("div", { className: "space-y-0.5", children: payload.map((entry) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "size-2.5 rounded-full shrink-0",
              style: { backgroundColor: entry.color ?? entry.fill }
            }
          ),
          /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
            entry.name,
            ":"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground ml-auto tabular-nums", children: formatter ? formatter(entry.value, entry.name) : entry.value })
        ] }, entry.name)) })
      ]
    }
  );
}
ChartTooltipContent.displayName = "ChartTooltipContent";
export {
  ChartContainer,
  ChartTooltipContent,
  chartColors
};
