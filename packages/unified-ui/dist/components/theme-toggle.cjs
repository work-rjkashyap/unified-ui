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
var theme_toggle_exports = {};
__export(theme_toggle_exports, {
  ThemeToggle: () => ThemeToggle
});
module.exports = __toCommonJS(theme_toggle_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_react = require("react");
function SunIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "5" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", y1: "1", x2: "12", y2: "3" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", y1: "21", x2: "12", y2: "23" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "4.22", y1: "4.22", x2: "5.64", y2: "5.64" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "18.36", y1: "18.36", x2: "19.78", y2: "19.78" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "1", y1: "12", x2: "3", y2: "12" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "21", y1: "12", x2: "23", y2: "12" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "18.36", y1: "5.64", x2: "19.78", y2: "4.22" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "4.22", y1: "19.78", x2: "5.64", y2: "18.36" })
      ]
    }
  );
}
function MoonIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" })
    }
  );
}
function MonitorIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", ry: "2" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "8", y1: "21", x2: "16", y2: "21" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", y1: "17", x2: "12", y2: "21" })
      ]
    }
  );
}
const iconButtonVariants = (0, import_class_variance_authority.cva)(
  [
    "inline-flex items-center justify-center",
    "rounded-md",
    "border border-border",
    "bg-secondary text-secondary-foreground",
    "transition-[color,background-color,border-color,box-shadow,opacity,transform]",
    "duration-fast ease-standard",
    "hover:bg-secondary-hover hover:text-foreground",
    "active:scale-[0.97]",
    import_focus_ring.focusRingClasses,
    "cursor-pointer",
    "select-none"
  ],
  {
    variants: {
      size: {
        sm: "size-7 [&>svg]:size-3.5",
        md: "size-9 [&>svg]:size-4",
        lg: "size-10 [&>svg]:size-5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const segmentedContainerVariants = (0, import_class_variance_authority.cva)(
  [
    "inline-flex items-center",
    "rounded-md",
    "border border-border",
    "bg-muted",
    "p-0.5",
    "gap-0.5"
  ],
  {
    variants: {
      size: {
        sm: "[&>button]:size-6 [&>button>svg]:size-3",
        md: "[&>button]:size-7 [&>button>svg]:size-3.5",
        lg: "[&>button]:size-8 [&>button>svg]:size-4"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
const ICON_MAP = {
  light: SunIcon,
  dark: MoonIcon,
  system: MonitorIcon
};
const LABEL_MAP = {
  light: "Light mode",
  dark: "Dark mode",
  system: "System theme"
};
function getNextTheme(current, mode) {
  if (mode === "light-dark") {
    return current === "light" ? "dark" : "light";
  }
  const order = ["light", "dark", "system"];
  const idx = order.indexOf(current);
  return order[(idx + 1) % order.length];
}
const ThemeToggleIcon = (0, import_react.forwardRef)(
  function ThemeToggleIcon2({ value, onChange, mode = "light-dark", size = "md", className, ...rest }, ref) {
    const handleClick = (0, import_react.useCallback)(() => {
      onChange(getNextTheme(value, mode));
    }, [value, mode, onChange]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        ref,
        type: "button",
        onClick: handleClick,
        className: (0, import_cn.cn)(iconButtonVariants({ size }), className),
        "aria-label": `Switch to ${LABEL_MAP[getNextTheme(value, mode)] ?? "next theme"}`,
        "data-ds": "",
        "data-ds-component": "theme-toggle",
        "data-ds-variant": "icon",
        "data-ds-size": size,
        "data-ds-theme-value": value,
        ...rest,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            SunIcon,
            {
              className: (0, import_cn.cn)(
                "absolute transition-all duration-300",
                value !== "light" && "scale-0 rotate-90 opacity-0"
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            MoonIcon,
            {
              className: (0, import_cn.cn)(
                "absolute transition-all duration-300",
                value !== "dark" && "scale-0 -rotate-90 opacity-0"
              )
            }
          ),
          mode === "light-dark-system" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            MonitorIcon,
            {
              className: (0, import_cn.cn)(
                "absolute transition-all duration-300",
                value !== "system" && "scale-0 rotate-90 opacity-0"
              )
            }
          )
        ]
      }
    );
  }
);
ThemeToggleIcon.displayName = "ThemeToggleIcon";
const ThemeToggleSegmented = (0, import_react.forwardRef)(
  function ThemeToggleSegmented2({ value, onChange, mode = "light-dark", size = "md", className }, ref) {
    const options = mode === "light-dark-system" ? ["light", "dark", "system"] : ["light", "dark"];
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref,
        role: "radiogroup",
        "aria-label": "Theme selection",
        className: (0, import_cn.cn)(segmentedContainerVariants({ size }), className),
        "data-ds": "",
        "data-ds-component": "theme-toggle",
        "data-ds-variant": "segmented",
        "data-ds-size": size,
        "data-ds-theme-value": value,
        children: options.map((option) => {
          const Icon = ICON_MAP[option];
          const isActive = value === option;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": isActive,
              "aria-label": LABEL_MAP[option],
              onClick: () => onChange(option),
              className: (0, import_cn.cn)(
                "inline-flex items-center justify-center rounded-sm transition-all duration-fast ease-standard",
                import_focus_ring.focusRingClasses,
                isActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              ),
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {})
            },
            option
          );
        })
      }
    );
  }
);
ThemeToggleSegmented.displayName = "ThemeToggleSegmented";
const ThemeToggle = (0, import_react.forwardRef)(
  function ThemeToggle2({ variant = "icon", ...rest }, ref) {
    if (variant === "segmented") {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ThemeToggleSegmented,
        {
          ref,
          variant,
          ...rest
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ThemeToggleIcon,
      {
        ref,
        variant,
        ...rest
      }
    );
  }
);
ThemeToggle.displayName = "ThemeToggle";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ThemeToggle
});
