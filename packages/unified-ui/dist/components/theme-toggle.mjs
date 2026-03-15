"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import { forwardRef, useCallback } from "react";
function SunIcon({ className }) {
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "5" }),
        /* @__PURE__ */ jsx("line", { x1: "12", y1: "1", x2: "12", y2: "3" }),
        /* @__PURE__ */ jsx("line", { x1: "12", y1: "21", x2: "12", y2: "23" }),
        /* @__PURE__ */ jsx("line", { x1: "4.22", y1: "4.22", x2: "5.64", y2: "5.64" }),
        /* @__PURE__ */ jsx("line", { x1: "18.36", y1: "18.36", x2: "19.78", y2: "19.78" }),
        /* @__PURE__ */ jsx("line", { x1: "1", y1: "12", x2: "3", y2: "12" }),
        /* @__PURE__ */ jsx("line", { x1: "21", y1: "12", x2: "23", y2: "12" }),
        /* @__PURE__ */ jsx("line", { x1: "18.36", y1: "5.64", x2: "19.78", y2: "4.22" }),
        /* @__PURE__ */ jsx("line", { x1: "4.22", y1: "19.78", x2: "5.64", y2: "18.36" })
      ]
    }
  );
}
function MoonIcon({ className }) {
  return /* @__PURE__ */ jsx(
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
      children: /* @__PURE__ */ jsx("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" })
    }
  );
}
function MonitorIcon({ className }) {
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", ry: "2" }),
        /* @__PURE__ */ jsx("line", { x1: "8", y1: "21", x2: "16", y2: "21" }),
        /* @__PURE__ */ jsx("line", { x1: "12", y1: "17", x2: "12", y2: "21" })
      ]
    }
  );
}
const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-md",
    "border border-border",
    "bg-secondary text-secondary-foreground",
    "transition-[color,background-color,border-color,box-shadow,opacity,transform]",
    "duration-fast ease-standard",
    "hover:bg-secondary-hover hover:text-foreground",
    "active:scale-[0.97]",
    focusRingClasses,
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
const segmentedContainerVariants = cva(
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
const ThemeToggleIcon = forwardRef(
  function ThemeToggleIcon2({ value, onChange, mode = "light-dark", size = "md", className, ...rest }, ref) {
    const handleClick = useCallback(() => {
      onChange(getNextTheme(value, mode));
    }, [value, mode, onChange]);
    return /* @__PURE__ */ jsxs(
      "button",
      {
        ref,
        type: "button",
        onClick: handleClick,
        className: cn(iconButtonVariants({ size }), className),
        "aria-label": `Switch to ${LABEL_MAP[getNextTheme(value, mode)] ?? "next theme"}`,
        "data-ds": "",
        "data-ds-component": "theme-toggle",
        "data-ds-variant": "icon",
        "data-ds-size": size,
        "data-ds-theme-value": value,
        ...rest,
        children: [
          /* @__PURE__ */ jsx(
            SunIcon,
            {
              className: cn(
                "absolute transition-all duration-300",
                value !== "light" && "scale-0 rotate-90 opacity-0"
              )
            }
          ),
          /* @__PURE__ */ jsx(
            MoonIcon,
            {
              className: cn(
                "absolute transition-all duration-300",
                value !== "dark" && "scale-0 -rotate-90 opacity-0"
              )
            }
          ),
          mode === "light-dark-system" && /* @__PURE__ */ jsx(
            MonitorIcon,
            {
              className: cn(
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
const ThemeToggleSegmented = forwardRef(
  function ThemeToggleSegmented2({ value, onChange, mode = "light-dark", size = "md", className }, ref) {
    const options = mode === "light-dark-system" ? ["light", "dark", "system"] : ["light", "dark"];
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "radiogroup",
        "aria-label": "Theme selection",
        className: cn(segmentedContainerVariants({ size }), className),
        "data-ds": "",
        "data-ds-component": "theme-toggle",
        "data-ds-variant": "segmented",
        "data-ds-size": size,
        "data-ds-theme-value": value,
        children: options.map((option) => {
          const Icon = ICON_MAP[option];
          const isActive = value === option;
          return /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": isActive,
              "aria-label": LABEL_MAP[option],
              onClick: () => onChange(option),
              className: cn(
                "inline-flex items-center justify-center rounded-sm transition-all duration-fast ease-standard",
                focusRingClasses,
                isActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              ),
              children: /* @__PURE__ */ jsx(Icon, {})
            },
            option
          );
        })
      }
    );
  }
);
ThemeToggleSegmented.displayName = "ThemeToggleSegmented";
const ThemeToggle = forwardRef(
  function ThemeToggle2({ variant = "icon", ...rest }, ref) {
    if (variant === "segmented") {
      return /* @__PURE__ */ jsx(
        ThemeToggleSegmented,
        {
          ref,
          variant,
          ...rest
        }
      );
    }
    return /* @__PURE__ */ jsx(
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
export {
  ThemeToggle
};
