"use client";
import { jsx } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { forwardRef } from "react";
const spacingYMap = {
  0: "my-0",
  1: "my-1",
  2: "my-2",
  3: "my-3",
  4: "my-4",
  5: "my-5",
  6: "my-6",
  8: "my-8",
  10: "my-10",
  12: "my-12"
};
const spacingXMap = {
  0: "mx-0",
  1: "mx-1",
  2: "mx-2",
  3: "mx-3",
  4: "mx-4",
  5: "mx-5",
  6: "mx-6",
  8: "mx-8",
  10: "mx-10",
  12: "mx-12"
};
const Divider = forwardRef(function Divider2({ spacing = 4, orientation = "horizontal", className, ...rest }, ref) {
  const isVertical = orientation === "vertical";
  return /* @__PURE__ */ jsx(
    "hr",
    {
      ref,
      "aria-orientation": orientation,
      className: cn(
        "border-none shrink-0",
        isVertical ? cn("w-px self-stretch bg-border", spacingXMap[spacing] ?? "mx-4") : cn("h-px w-full bg-border", spacingYMap[spacing] ?? "my-4"),
        className
      ),
      "data-ds": "",
      "data-ds-component": "divider",
      ...rest
    }
  );
});
Divider.displayName = "Divider";
export {
  Divider
};
