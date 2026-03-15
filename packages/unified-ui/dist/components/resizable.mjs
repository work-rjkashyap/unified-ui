"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import {
  Group,
  Panel,
  Separator
} from "react-resizable-panels";
function ResizablePanelGroup({
  direction = "horizontal",
  className,
  ...rest
}) {
  return /* @__PURE__ */ jsx(
    Group,
    {
      orientation: direction,
      className: cn(
        "flex h-full w-full",
        direction === "vertical" && "flex-col",
        className
      ),
      "data-ds": "",
      "data-ds-component": "resizable-panel-group",
      "data-ds-direction": direction,
      ...rest
    }
  );
}
ResizablePanelGroup.displayName = "ResizablePanelGroup";
const ResizablePanel = Panel;
function GripIcon({ className }) {
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
        /* @__PURE__ */ jsx("circle", { cx: "9", cy: "12", r: "1" }),
        /* @__PURE__ */ jsx("circle", { cx: "9", cy: "5", r: "1" }),
        /* @__PURE__ */ jsx("circle", { cx: "9", cy: "19", r: "1" }),
        /* @__PURE__ */ jsx("circle", { cx: "15", cy: "12", r: "1" }),
        /* @__PURE__ */ jsx("circle", { cx: "15", cy: "5", r: "1" }),
        /* @__PURE__ */ jsx("circle", { cx: "15", cy: "19", r: "1" })
      ]
    }
  );
}
function ResizableHandle({
  withHandle = false,
  className,
  ...rest
}) {
  const shouldReduce = useReducedMotion();
  return /* @__PURE__ */ jsx(
    Separator,
    {
      className: cn(
        "relative flex w-px items-center justify-center bg-border",
        "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
        "[&[aria-orientation=horizontal]]:h-px [&[aria-orientation=horizontal]]:w-full",
        "[&[aria-orientation=horizontal]]:after:left-0 [&[aria-orientation=horizontal]]:after:h-1",
        "[&[aria-orientation=horizontal]]:after:w-full [&[aria-orientation=horizontal]]:after:-translate-y-1/2",
        "[&[aria-orientation=horizontal]]:after:translate-x-0",
        "[&[aria-orientation=horizontal]>div]:rotate-90",
        className
      ),
      "data-ds-component": "resizable-handle",
      ...rest,
      children: withHandle && /* @__PURE__ */ jsx(
        motion.div,
        {
          className: cn(
            "z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-border bg-border"
          ),
          whileHover: shouldReduce ? void 0 : { opacity: 1, scale: 1.15 },
          initial: { opacity: 0.7 },
          "data-ds-animated": "",
          children: /* @__PURE__ */ jsx(GripIcon, { className: "size-2.5 text-muted-foreground" })
        }
      )
    }
  );
}
ResizableHandle.displayName = "ResizableHandle";
export {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
};
