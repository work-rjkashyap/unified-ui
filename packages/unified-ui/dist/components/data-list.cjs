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
var data_list_exports = {};
__export(data_list_exports, {
  DataList: () => DataList,
  DataListDetail: () => DataListDetail,
  DataListTerm: () => DataListTerm,
  dataListVariants: () => dataListVariants
});
module.exports = __toCommonJS(data_list_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_motion = require("../motion/index");
var import_cn = require("../utils/cn");
var import_class_variance_authority = require("class-variance-authority");
var import_framer_motion = require("framer-motion");
var import_react = require("react");
const dataListVariants = (0, import_class_variance_authority.cva)(["w-full"], {
  variants: {
    orientation: {
      horizontal: "grid grid-cols-[auto_1fr] items-baseline gap-x-6",
      vertical: "flex flex-col gap-2"
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base"
    }
  },
  defaultVariants: { orientation: "horizontal", size: "md" }
});
const DataListTerm = (0, import_react.forwardRef)(
  function DataListTerm2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "dt",
      {
        ref,
        className: (0, import_cn.cn)("font-medium text-muted-foreground shrink-0", className),
        ...rest,
        children
      }
    );
  }
);
DataListTerm.displayName = "DataListTerm";
const DataListDetail = (0, import_react.forwardRef)(
  function DataListDetail2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { ref, className: (0, import_cn.cn)("text-foreground m-0", className), ...rest, children });
  }
);
DataListDetail.displayName = "DataListDetail";
const DataList = (0, import_react.forwardRef)(
  function DataList2({
    items,
    orientation = "horizontal",
    size = "md",
    dividers = false,
    animated = true,
    className
  }, ref) {
    const shouldReduce = (0, import_framer_motion.useReducedMotion)();
    const isHorizontal = orientation === "horizontal";
    const horizontalCellPadding = "py-2";
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_framer_motion.motion.dl,
      {
        ref,
        className: (0, import_cn.cn)(dataListVariants({ orientation, size }), className),
        variants: animated && !shouldReduce ? import_motion.staggerContainer.variants : void 0,
        initial: animated && !shouldReduce ? "initial" : void 0,
        animate: animated && !shouldReduce ? "animate" : void 0,
        "data-ds": "",
        "data-ds-component": "data-list",
        "data-ds-orientation": orientation,
        "data-ds-animated": animated ? "" : void 0,
        children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_framer_motion.motion.div,
          {
            className: (0, import_cn.cn)(
              isHorizontal ? "contents" : "flex flex-col gap-1",
              dividers && i > 0 && !isHorizontal && "pt-3 border-t border-border"
            ),
            variants: animated && !shouldReduce ? import_motion.fadeIn.variants : void 0,
            transition: animated && !shouldReduce ? import_motion.fadeIn.transition : void 0,
            children: isHorizontal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                DataListTerm,
                {
                  className: (0, import_cn.cn)(
                    horizontalCellPadding,
                    dividers && i > 0 && "border-t border-border"
                  ),
                  children: item.term
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                DataListDetail,
                {
                  className: (0, import_cn.cn)(
                    horizontalCellPadding,
                    dividers && i > 0 && "border-t border-border"
                  ),
                  children: item.detail
                }
              )
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataListTerm, { children: item.term }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataListDetail, { children: item.detail })
            ] })
          },
          item.key ?? i
        ))
      }
    );
  }
);
DataList.displayName = "DataList";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataList,
  DataListDetail,
  DataListTerm,
  dataListVariants
});
