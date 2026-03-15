"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import {
  createContext,
  forwardRef,
  useContext
} from "react";
const StepsContext = createContext({
  currentStep: 0,
  orientation: "horizontal",
  variant: "default",
  totalSteps: 0
});
const StepIndexContext = createContext(0);
function CheckIcon({ className }) {
  return /* @__PURE__ */ jsx(
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
      children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" })
    }
  );
}
const Steps = forwardRef(function Steps2({
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
  return /* @__PURE__ */ jsx(
    StepsContext.Provider,
    {
      value: { currentStep, orientation, variant, totalSteps, onStepClick },
      children: /* @__PURE__ */ jsx(
        "ol",
        {
          ref,
          "aria-label": "Steps",
          className: cn(
            "flex",
            orientation === "horizontal" ? "flex-row items-start gap-0" : "flex-col gap-0",
            className
          ),
          "data-ds": "",
          "data-ds-component": "steps",
          "data-ds-orientation": orientation,
          ...rest,
          children: childArray.map((child, index) => /* @__PURE__ */ jsx(StepIndexContext.Provider, { value: index, children: child }, index))
        }
      )
    }
  );
});
Steps.displayName = "Steps";
const Step = forwardRef(function Step2({ icon, title, description, className, children, ...rest }, ref) {
  const { currentStep, orientation, variant, totalSteps, onStepClick } = useContext(StepsContext);
  const index = useContext(StepIndexContext);
  const status = index < currentStep ? "complete" : index === currentStep ? "active" : "upcoming";
  const isLast = index === totalSteps - 1;
  const isClickable = !!onStepClick;
  const indicatorContent = variant === "dots" ? null : status === "complete" && variant !== "outline" ? /* @__PURE__ */ jsx(CheckIcon, {}) : /* @__PURE__ */ jsx("span", { children: index + 1 });
  const indicator = /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "flex shrink-0 items-center justify-center",
        "font-medium text-xs leading-none",
        "transition-colors duration-fast ease-standard",
        // Dot variant
        variant === "dots" ? cn(
          "size-2 rounded-full",
          status === "complete" && "bg-primary",
          status === "active" && "bg-primary",
          status === "upcoming" && "bg-border"
        ) : cn(
          // Default & outline
          "size-7 rounded-full border-2",
          variant === "default" ? cn(
            status === "complete" && "border-primary bg-primary text-primary-foreground",
            status === "active" && "border-primary bg-background text-primary",
            status === "upcoming" && "border-muted bg-background text-muted-foreground"
          ) : cn(
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
  const labelContent = (title || description) && /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        orientation === "horizontal" ? "mt-2 text-center" : "ml-3 text-left"
      ),
      children: [
        title && /* @__PURE__ */ jsx(
          "p",
          {
            className: cn(
              "text-sm font-medium leading-5",
              status === "active" && "text-foreground",
              status === "complete" && "text-foreground",
              status === "upcoming" && "text-muted-foreground"
            ),
            children: title
          }
        ),
        description && /* @__PURE__ */ jsx("p", { className: "text-xs leading-4 text-muted-foreground mt-0.5", children: description })
      ]
    }
  );
  const connector = !isLast && /* @__PURE__ */ jsx(
    "div",
    {
      "aria-hidden": "true",
      className: cn(
        "flex-1 transition-colors duration-fast ease-standard",
        orientation === "horizontal" ? "mx-2 mt-3.5 h-px" : "ml-3.5 my-1 w-px self-stretch",
        index < currentStep ? "bg-primary" : "bg-border"
      )
    }
  );
  const stepContent = /* @__PURE__ */ jsx(Fragment, { children: orientation === "horizontal" ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    indicator,
    labelContent
  ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      indicator,
      !isLast && /* @__PURE__ */ jsx(
        "div",
        {
          "aria-hidden": "true",
          className: cn(
            "mt-1 w-px flex-1 self-stretch transition-colors duration-fast ease-standard",
            "min-h-[24px]",
            index < currentStep ? "bg-primary" : "bg-border"
          )
        }
      )
    ] }),
    labelContent
  ] }) });
  return /* @__PURE__ */ jsx(
    "li",
    {
      ref,
      "aria-current": status === "active" ? "step" : void 0,
      "data-ds": "",
      "data-ds-component": "step",
      "data-ds-status": status,
      className: cn(
        orientation === "horizontal" ? "flex flex-1 items-start" : "flex flex-col",
        className
      ),
      ...rest,
      children: orientation === "horizontal" ? /* @__PURE__ */ jsxs(Fragment, { children: [
        isClickable ? /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => onStepClick(index),
            className: cn(
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
        ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col items-center", children: [
          indicator,
          labelContent
        ] }),
        connector
      ] }) : stepContent
    }
  );
});
Step.displayName = "Step";
export {
  Step,
  Steps
};
