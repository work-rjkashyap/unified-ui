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
var steps_exports = {};
__export(steps_exports, {
  Step: () => Step,
  Steps: () => Steps
});
module.exports = __toCommonJS(steps_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_react = require("react");
const StepsContext = (0, import_react.createContext)({
  currentStep: 0,
  orientation: "horizontal",
  variant: "default",
  totalSteps: 0
});
const StepIndexContext = (0, import_react.createContext)(0);
function CheckIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "20 6 9 17 4 12" })
    }
  );
}
const Steps = (0, import_react.forwardRef)(function Steps2({
  currentStep,
  orientation = "horizontal",
  variant = "default",
  onStepClick,
  className,
  children,
  ...rest
}, ref) {
  const childArray = Array.isArray(children) ? children : children ? [children] : [];
  const totalSteps = childArray.length;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    StepsContext.Provider,
    {
      value: { currentStep, orientation, variant, totalSteps, onStepClick },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "ol",
        {
          ref,
          "aria-label": "Steps",
          className: (0, import_cn.cn)(
            "flex",
            orientation === "horizontal" ? "flex-row items-start gap-0" : "flex-col gap-0",
            className
          ),
          "data-ds": "",
          "data-ds-component": "steps",
          "data-ds-orientation": orientation,
          ...rest,
          children: childArray.map((child, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepIndexContext.Provider, { value: index, children: child }, index))
        }
      )
    }
  );
});
Steps.displayName = "Steps";
const Step = (0, import_react.forwardRef)(function Step2({ icon, title, description, className, children, ...rest }, ref) {
  const { currentStep, orientation, variant, totalSteps, onStepClick } = (0, import_react.useContext)(StepsContext);
  const index = (0, import_react.useContext)(StepIndexContext);
  const status = index < currentStep ? "complete" : index === currentStep ? "active" : "upcoming";
  const isLast = index === totalSteps - 1;
  const isClickable = !!onStepClick;
  const indicatorContent = variant === "dots" ? null : status === "complete" && variant !== "outline" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: index + 1 });
  const indicator = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: (0, import_cn.cn)(
        "flex shrink-0 items-center justify-center",
        "font-medium text-xs leading-none",
        "transition-colors duration-fast ease-standard",
        // Dot variant
        variant === "dots" ? (0, import_cn.cn)(
          "size-2 rounded-full",
          status === "complete" && "bg-primary",
          status === "active" && "bg-primary",
          status === "upcoming" && "bg-border"
        ) : (0, import_cn.cn)(
          // Default & outline
          "size-7 rounded-full border-2",
          variant === "default" ? (0, import_cn.cn)(
            status === "complete" && "border-primary bg-primary text-primary-foreground",
            status === "active" && "border-primary bg-background text-primary",
            status === "upcoming" && "border-muted bg-background text-muted-foreground"
          ) : (0, import_cn.cn)(
            // outline variant
            status === "complete" && "border-primary bg-primary/10 text-primary",
            status === "active" && "border-primary bg-background text-primary",
            status === "upcoming" && "border-muted bg-background text-muted-foreground"
          )
        )
      ),
      "aria-hidden": variant === "dots",
      children: indicatorContent
    }
  );
  const labelContent = (title || description) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: (0, import_cn.cn)(
        orientation === "horizontal" ? "mt-2 text-center" : "ml-3 text-left"
      ),
      children: [
        title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "p",
          {
            className: (0, import_cn.cn)(
              "text-sm font-medium leading-5",
              status === "active" && "text-foreground",
              status === "complete" && "text-foreground",
              status === "upcoming" && "text-muted-foreground"
            ),
            children: title
          }
        ),
        description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xs leading-4 text-muted-foreground mt-0.5", children: description })
      ]
    }
  );
  const connector = !isLast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      "aria-hidden": "true",
      className: (0, import_cn.cn)(
        "flex-1 transition-colors duration-fast ease-standard",
        orientation === "horizontal" ? "mx-2 mt-3.5 h-px" : "ml-3.5 my-1 w-px self-stretch",
        index < currentStep ? "bg-primary" : "bg-border"
      )
    }
  );
  const stepContent = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: orientation === "horizontal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col items-center", children: [
    indicator,
    labelContent
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-start", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col items-center", children: [
      indicator,
      !isLast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          "aria-hidden": "true",
          className: (0, import_cn.cn)(
            "mt-1 w-px flex-1 self-stretch transition-colors duration-fast ease-standard",
            "min-h-[24px]",
            index < currentStep ? "bg-primary" : "bg-border"
          )
        }
      )
    ] }),
    labelContent
  ] }) });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "li",
    {
      ref,
      "aria-current": status === "active" ? "step" : void 0,
      "data-ds": "",
      "data-ds-component": "step",
      "data-ds-status": status,
      className: (0, import_cn.cn)(
        orientation === "horizontal" ? "flex flex-1 items-start" : "flex flex-col",
        className
      ),
      ...rest,
      children: orientation === "horizontal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        isClickable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            type: "button",
            onClick: () => onStepClick(index),
            className: (0, import_cn.cn)(
              "flex flex-1 flex-col items-center",
              isClickable && "cursor-pointer",
              status === "upcoming" && !isClickable && "cursor-default"
            ),
            "aria-label": title ? `Go to step: ${title}` : `Go to step ${index + 1}`,
            children: [
              indicator,
              labelContent
            ]
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-1 flex-col items-center", children: [
          indicator,
          labelContent
        ] }),
        connector
      ] }) : stepContent
    }
  );
});
Step.displayName = "Step";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Step,
  Steps
});
