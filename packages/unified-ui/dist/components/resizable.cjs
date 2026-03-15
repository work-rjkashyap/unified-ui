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
var resizable_exports = {};
__export(resizable_exports, {
  ResizableHandle: () => ResizableHandle,
  ResizablePanel: () => ResizablePanel,
  ResizablePanelGroup: () => ResizablePanelGroup
});
module.exports = __toCommonJS(resizable_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_framer_motion = require("framer-motion");
var import_react_resizable_panels = require("react-resizable-panels");
function ResizablePanelGroup({
  direction = "horizontal",
  className,
  ...rest
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react_resizable_panels.Group,
    {
      orientation: direction,
      className: (0, import_cn.cn)(
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
const ResizablePanel = import_react_resizable_panels.Panel;
function GripIcon({ className }) {
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "9", cy: "12", r: "1" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "9", cy: "5", r: "1" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "9", cy: "19", r: "1" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "15", cy: "12", r: "1" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "15", cy: "5", r: "1" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "15", cy: "19", r: "1" })
      ]
    }
  );
}
function ResizableHandle({
  withHandle = false,
  className,
  ...rest
}) {
  const shouldReduce = (0, import_framer_motion.useReducedMotion)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react_resizable_panels.Separator,
    {
      className: (0, import_cn.cn)(
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
      children: withHandle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_framer_motion.motion.div,
        {
          className: (0, import_cn.cn)(
            "z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-border bg-border"
          ),
          whileHover: shouldReduce ? void 0 : { opacity: 1, scale: 1.15 },
          initial: { opacity: 0.7 },
          "data-ds-animated": "",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripIcon, { className: "size-2.5 text-muted-foreground" })
        }
      )
    }
  );
}
ResizableHandle.displayName = "ResizableHandle";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
});
