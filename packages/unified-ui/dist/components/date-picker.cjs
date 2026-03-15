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
var date_picker_exports = {};
__export(date_picker_exports, {
  DatePicker: () => DatePicker
});
module.exports = __toCommonJS(date_picker_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_motion = require("../motion/index");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_framer_motion = require("framer-motion");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
var import_calendar = require("./calendar");
function CalendarIcon({ className }) {
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", ry: "2" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "16", x2: "16", y1: "2", y2: "6" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "8", x2: "8", y1: "2", y2: "6" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "3", x2: "21", y1: "10", y2: "10" })
      ]
    }
  );
}
function XIcon({ className }) {
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
function formatDate(date, locale = "en-US") {
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function formatRange(range, locale = "en-US") {
  const from = formatDate(range.from, locale);
  const to = range.to ? formatDate(range.to, locale) : "...";
  return `${from} \u2014 ${to}`;
}
const sizeClasses = {
  sm: "h-8 px-3 text-xs gap-2 rounded-md",
  md: "h-9 px-3 text-sm gap-2 rounded-md",
  lg: "h-10 px-4 text-sm gap-2 rounded-md"
};
const iconSizeClasses = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4"
};
const DatePicker = (0, import_react.forwardRef)(
  function DatePicker2({
    mode = "single",
    value,
    valueRange,
    onSelect,
    onSelectRange,
    placeholder = "Pick a date",
    size = "md",
    disabled = false,
    clearable = true,
    locale = "en-US",
    disabledDate,
    minDate,
    maxDate,
    defaultMonth,
    align = "start",
    className,
    contentClassName
  }, ref) {
    const shouldReduce = (0, import_framer_motion.useReducedMotion)();
    const [open, setOpen] = (0, import_react.useState)(false);
    const [internalDate, setInternalDate] = (0, import_react.useState)(null);
    const [internalRange, setInternalRange] = (0, import_react.useState)(null);
    const selectedDate = value !== void 0 ? value : internalDate;
    const selectedRange = valueRange !== void 0 ? valueRange : internalRange;
    const hasValue = mode === "single" ? selectedDate !== null : selectedRange !== null;
    const displayValue = (() => {
      if (mode === "single") {
        return selectedDate ? formatDate(selectedDate, locale) : null;
      }
      return selectedRange ? formatRange(selectedRange, locale) : null;
    })();
    const handleSelect = (0, import_react.useCallback)(
      (date) => {
        if (value === void 0) setInternalDate(date);
        onSelect?.(date);
        if (mode === "single") setOpen(false);
      },
      [mode, value, onSelect]
    );
    const handleSelectRange = (0, import_react.useCallback)(
      (range) => {
        if (valueRange === void 0) setInternalRange(range);
        onSelectRange?.(range);
        if (range.to) setOpen(false);
      },
      [valueRange, onSelectRange]
    );
    const handleClear = (0, import_react.useCallback)(
      (e) => {
        e.stopPropagation();
        if (value === void 0) setInternalDate(null);
        if (valueRange === void 0) setInternalRange(null);
        onSelect?.(null);
        onSelectRange?.(null);
      },
      [value, valueRange, onSelect, onSelectRange]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_radix_ui.Popover.Root, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Popover.Trigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          ref,
          type: "button",
          disabled,
          "aria-expanded": open,
          "aria-haspopup": "dialog",
          className: (0, import_cn.cn)(
            // Layout
            "inline-flex items-center justify-between",
            // Base styles
            "border border-input bg-background",
            "text-left",
            // Transitions
            "transition-colors duration-fast",
            // Disabled
            "disabled:pointer-events-none disabled:opacity-50",
            // Focus
            import_focus_ring.focusRingClasses,
            // Size
            sizeClasses[size],
            // Open state
            open && "border-ring ring-2 ring-ring/20",
            className
          ),
          "data-ds": "",
          "data-ds-component": "date-picker",
          "data-ds-size": size,
          "data-ds-mode": mode,
          "data-state": open ? "open" : "closed",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-center gap-2 min-w-0", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                CalendarIcon,
                {
                  className: (0, import_cn.cn)(
                    "shrink-0 text-muted-foreground",
                    iconSizeClasses[size]
                  )
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "span",
                {
                  className: (0, import_cn.cn)(
                    "truncate",
                    !displayValue && "text-muted-foreground"
                  ),
                  children: displayValue ?? placeholder
                }
              )
            ] }),
            clearable && hasValue && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "span",
              {
                role: "button",
                tabIndex: 0,
                onClick: handleClear,
                onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === " ")
                    handleClear(e);
                },
                className: (0, import_cn.cn)(
                  "shrink-0 ml-1",
                  "inline-flex items-center justify-center rounded-sm",
                  "text-muted-foreground hover:text-foreground",
                  "transition-colors duration-fast",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                ),
                "aria-label": "Clear date",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XIcon, { className: iconSizeClasses[size] })
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Popover.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_radix_ui.Popover.Content,
        {
          asChild: true,
          align,
          sideOffset: 6,
          forceMount: true,
          onInteractOutside: () => setOpen(false),
          onEscapeKeyDown: () => setOpen(false),
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_framer_motion.motion.div,
            {
              className: (0, import_cn.cn)(
                "z-popover rounded-lg border border-border bg-background shadow-lg",
                "outline-none",
                contentClassName
              ),
              variants: import_motion.scaleIn.variants,
              initial: shouldReduce ? { opacity: 0 } : "initial",
              animate: "animate",
              exit: shouldReduce ? { opacity: 0 } : "exit",
              transition: import_motion.scaleIn.transition,
              "data-ds-animated": "",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_calendar.Calendar,
                {
                  mode,
                  selected: mode === "single" ? selectedDate ?? void 0 : void 0,
                  selectedRange: mode === "range" ? selectedRange ?? void 0 : void 0,
                  onSelect: mode === "single" ? handleSelect : void 0,
                  onSelectRange: mode === "range" ? handleSelectRange : void 0,
                  defaultMonth: defaultMonth ?? (mode === "single" ? selectedDate ?? void 0 : selectedRange?.from ?? void 0),
                  disabledDate,
                  minDate,
                  maxDate
                }
              )
            }
          )
        }
      ) }) })
    ] });
  }
);
DatePicker.displayName = "DatePicker";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DatePicker
});
