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
var color_picker_exports = {};
__export(color_picker_exports, {
  ColorPicker: () => ColorPicker
});
module.exports = __toCommonJS(color_picker_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_react = require("react");
function hexToHsl(hex) {
  let r = 0, g = 0, b = 0;
  const h6 = hex.replace("#", "");
  if (h6.length === 3) {
    r = parseInt(h6[0] + h6[0], 16) / 255;
    g = parseInt(h6[1] + h6[1], 16) / 255;
    b = parseInt(h6[2] + h6[2], 16) / 255;
  } else if (h6.length === 6) {
    r = parseInt(h6.slice(0, 2), 16) / 255;
    g = parseInt(h6.slice(2, 4), 16) / 255;
    b = parseInt(h6.slice(4, 6), 16) / 255;
  }
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let hue = 0, sat = 0;
  const lit = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    sat = lit > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        hue = ((b - r) / d + 2) / 6;
        break;
      case b:
        hue = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(hue * 360),
    s: Math.round(sat * 100),
    l: Math.round(lit * 100)
  };
}
function hslToHex(h, s, l) {
  const sn = s / 100, ln = l / 100;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
function isValidHex(hex) {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex);
}
const DEFAULT_PRESETS = [
  "#000000",
  "#374151",
  "#6b7280",
  "#9ca3af",
  "#d1d5db",
  "#ffffff",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#06b6d4",
  "#6366f1",
  "#a855f7",
  "#f43f5e"
];
const sizeMap = {
  sm: "size-7",
  md: "size-9",
  lg: "size-11"
};
const ColorPicker = (0, import_react.forwardRef)(
  function ColorPicker2({
    value,
    defaultValue = "#000000",
    onChange,
    presets = DEFAULT_PRESETS,
    showInput = true,
    disabled = false,
    size = "md",
    className,
    label = "Choose color"
  }, ref) {
    const [internalValue, setInternalValue] = (0, import_react.useState)(defaultValue);
    const currentValue = value ?? internalValue;
    const [isOpen, setIsOpen] = (0, import_react.useState)(false);
    const [hexInput, setHexInput] = (0, import_react.useState)(currentValue);
    const popoverRef = (0, import_react.useRef)(null);
    const triggerRef = (0, import_react.useRef)(null);
    const hsl = (0, import_react.useMemo)(() => hexToHsl(currentValue), [currentValue]);
    const [hue, setHue] = (0, import_react.useState)(hsl.h);
    const [sat, setSat] = (0, import_react.useState)(hsl.s);
    const [lit, setLit] = (0, import_react.useState)(hsl.l);
    const [prevValue, setPrevValue] = (0, import_react.useState)(currentValue);
    if (currentValue !== prevValue) {
      setPrevValue(currentValue);
      const parsed = hexToHsl(currentValue);
      setHue(parsed.h);
      setSat(parsed.s);
      setLit(parsed.l);
      setHexInput(currentValue);
    }
    const updateColor = (0, import_react.useCallback)(
      (hex) => {
        if (!value) setInternalValue(hex);
        onChange?.(hex);
        setHexInput(hex);
      },
      [value, onChange]
    );
    const handleHueChange = (0, import_react.useCallback)(
      (newHue) => {
        setHue(newHue);
        updateColor(hslToHex(newHue, sat, lit));
      },
      [sat, lit, updateColor]
    );
    const handleSatLitChange = (0, import_react.useCallback)(
      (newSat, newLit) => {
        setSat(newSat);
        setLit(newLit);
        updateColor(hslToHex(hue, newSat, newLit));
      },
      [hue, updateColor]
    );
    const handleHexInput = (0, import_react.useCallback)(
      (val) => {
        setHexInput(val);
        if (isValidHex(val)) {
          updateColor(val.toLowerCase());
        }
      },
      [updateColor]
    );
    (0, import_react.useEffect)(() => {
      if (!isOpen) return;
      const handler = (e) => {
        if (popoverRef.current && !popoverRef.current.contains(e.target) && triggerRef.current && !triggerRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [isOpen]);
    (0, import_react.useEffect)(() => {
      if (!isOpen) return;
      const handler = (e) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [isOpen]);
    const spectrumRef = (0, import_react.useRef)(null);
    const handleSpectrumPointer = (0, import_react.useCallback)(
      (e) => {
        const rect = spectrumRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = Math.max(
          0,
          Math.min(1, (e.clientX - rect.left) / rect.width)
        );
        const y = Math.max(
          0,
          Math.min(1, (e.clientY - rect.top) / rect.height)
        );
        const newSat = Math.round(x * 100);
        const newLit = Math.round((1 - y) * 100);
        handleSatLitChange(newSat, newLit);
      },
      [handleSatLitChange]
    );
    const handleSpectrumDown = (0, import_react.useCallback)(
      (e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        handleSpectrumPointer(e);
      },
      [handleSpectrumPointer]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref,
        className: (0, import_cn.cn)("relative inline-block", className),
        "data-ds": "",
        "data-ds-component": "color-picker",
        ...disabled ? { "data-ds-disabled": "" } : {},
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              ref: triggerRef,
              type: "button",
              disabled,
              onClick: () => !disabled && setIsOpen(!isOpen),
              className: (0, import_cn.cn)(
                "rounded-md border border-border shadow-sm transition-shadow",
                "hover:shadow-md disabled:opacity-50 disabled:pointer-events-none",
                sizeMap[size],
                import_focus_ring.focusRingClasses
              ),
              style: { backgroundColor: currentValue },
              "aria-label": label,
              "aria-expanded": isOpen,
              "aria-haspopup": "dialog"
            }
          ),
          isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "div",
            {
              ref: popoverRef,
              className: (0, import_cn.cn)(
                "absolute z-50 mt-2 w-64 rounded-lg border border-border bg-background p-3 shadow-lg",
                "animate-in fade-in-0 zoom-in-95"
              ),
              role: "dialog",
              "aria-label": "Color picker",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "div",
                  {
                    ref: spectrumRef,
                    className: "relative h-36 w-full rounded-md cursor-crosshair overflow-hidden mb-3",
                    style: {
                      background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`
                    },
                    onPointerDown: handleSpectrumDown,
                    onPointerMove: (e) => {
                      if (e.buttons > 0) handleSpectrumPointer(e);
                    },
                    "aria-label": "Saturation and lightness",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "div",
                      {
                        className: "absolute size-3.5 rounded-full border-2 border-white shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none",
                        style: {
                          left: `${sat}%`,
                          top: `${100 - lit}%`,
                          backgroundColor: currentValue
                        }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "input",
                  {
                    type: "range",
                    min: 0,
                    max: 360,
                    value: hue,
                    onChange: (e) => handleHueChange(Number(e.target.value)),
                    className: (0, import_cn.cn)(
                      "w-full h-3 rounded-full appearance-none cursor-pointer",
                      "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
                    ),
                    style: {
                      background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"
                    },
                    "aria-label": "Hue"
                  }
                ) }),
                showInput && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 mb-3", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "div",
                    {
                      className: "size-8 rounded-md border border-border shrink-0",
                      style: { backgroundColor: currentValue }
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "input",
                    {
                      type: "text",
                      value: hexInput,
                      onChange: (e) => handleHexInput(e.target.value),
                      onBlur: () => {
                        if (!isValidHex(hexInput)) setHexInput(currentValue);
                      },
                      className: (0, import_cn.cn)(
                        "flex-1 h-8 rounded-md border border-border bg-background px-2.5 text-sm font-mono",
                        "text-foreground placeholder:text-muted-foreground",
                        import_focus_ring.focusRingClasses
                      ),
                      placeholder: "#000000",
                      maxLength: 7,
                      "aria-label": "HEX color value"
                    }
                  )
                ] }),
                presets.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-wrap gap-1.5", children: presets.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: () => updateColor(preset),
                    className: (0, import_cn.cn)(
                      "size-6 rounded-md border transition-shadow",
                      currentValue.toLowerCase() === preset.toLowerCase() ? "border-foreground shadow-sm ring-1 ring-foreground/20" : "border-border hover:shadow-sm",
                      import_focus_ring.focusRingClasses
                    ),
                    style: { backgroundColor: preset },
                    "aria-label": `Select ${preset}`
                  },
                  preset
                )) })
              ]
            }
          )
        ]
      }
    );
  }
);
ColorPicker.displayName = "ColorPicker";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ColorPicker
});
