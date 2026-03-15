"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { fadeIn, staggerContainer } from "../motion/index";
import { cn } from "../utils/cn";
import { cva } from "class-variance-authority";
import { motion, useReducedMotion } from "framer-motion";
import { forwardRef } from "react";
const dataListVariants = cva(["w-full"], {
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
const DataListTerm = forwardRef(
  function DataListTerm2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsx(
      "dt",
      {
        ref,
        className: cn("font-medium text-muted-foreground shrink-0", className),
        ...rest,
        children
      }
    );
  }
);
DataListTerm.displayName = "DataListTerm";
const DataListDetail = forwardRef(
  function DataListDetail2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsx("dd", { ref, className: cn("text-foreground m-0", className), ...rest, children });
  }
);
DataListDetail.displayName = "DataListDetail";
const DataList = forwardRef(
  function DataList2({
    items,
    orientation = "horizontal",
    size = "md",
    dividers = false,
    animated = true,
    className
  }, ref) {
    const shouldReduce = useReducedMotion();
    const isHorizontal = orientation === "horizontal";
    const horizontalCellPadding = "py-2";
    return /* @__PURE__ */ jsx(
      motion.dl,
      {
        ref,
        className: cn(dataListVariants({ orientation, size }), className),
        variants: animated && !shouldReduce ? staggerContainer.variants : void 0,
        initial: animated && !shouldReduce ? "initial" : void 0,
        animate: animated && !shouldReduce ? "animate" : void 0,
        "data-ds": "",
        "data-ds-component": "data-list",
        "data-ds-orientation": orientation,
        "data-ds-animated": animated ? "" : void 0,
        children: items.map((item, i) => /* @__PURE__ */ jsx(
          motion.div,
          {
            className: cn(
              isHorizontal ? "contents" : "flex flex-col gap-1",
              dividers && i > 0 && !isHorizontal && "pt-3 border-t border-border"
            ),
            variants: animated && !shouldReduce ? fadeIn.variants : void 0,
            transition: animated && !shouldReduce ? fadeIn.transition : void 0,
            children: isHorizontal ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                DataListTerm,
                {
                  className: cn(
                    horizontalCellPadding,
                    dividers && i > 0 && "border-t border-border"
                  ),
                  children: item.term
                }
              ),
              /* @__PURE__ */ jsx(
                DataListDetail,
                {
                  className: cn(
                    horizontalCellPadding,
                    dividers && i > 0 && "border-t border-border"
                  ),
                  children: item.detail
                }
              )
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(DataListTerm, { children: item.term }),
              /* @__PURE__ */ jsx(DataListDetail, { children: item.detail })
            ] })
          },
          item.key ?? i
        ))
      }
    );
  }
);
DataList.displayName = "DataList";
export {
  DataList,
  DataListDetail,
  DataListTerm,
  dataListVariants
};
