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
var customizer_exports = {};
__export(customizer_exports, {
  ThemeCustomizer: () => ThemeCustomizer
});
module.exports = __toCommonJS(customizer_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_react = require("react");
var import_customizer_store = require("./customizer-store");
var import_presets = require("./presets");
function Section({
  title,
  children,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: (0, import_cn.cn)("space-y-2", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: title }),
    children
  ] });
}
function CheckIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      className: (0, import_cn.cn)("size-4 shrink-0", className),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 6 9 17l-5-5" })
    }
  );
}
function RadiusOption({
  preset,
  isActive,
  onClick
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "button",
    {
      type: "button",
      onClick,
      className: (0, import_cn.cn)(
        "flex flex-col items-center justify-center gap-1 rounded-md border px-3 py-2 text-center transition-all duration-fast ease-standard",
        "hover:border-border-strong hover:bg-muted/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive ? "border-primary bg-muted/60 shadow-sm" : "border-border bg-transparent"
      ),
      title: `${preset.name} (${preset.label})`,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "span",
          {
            className: "size-8 border-2 border-foreground/30 bg-muted",
            style: { borderRadius: preset.value },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "span",
          {
            className: (0, import_cn.cn)(
              "text-[11px] font-medium leading-none",
              isActive ? "text-foreground" : "text-muted-foreground"
            ),
            children: preset.label
          }
        )
      ]
    }
  );
}
function ChevronDownIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      className: (0, import_cn.cn)("size-4 shrink-0", className),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m6 9 6 6 6-6" })
    }
  );
}
function SearchIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      className: (0, import_cn.cn)("size-4 shrink-0", className),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m21 21-4.3-4.3" })
      ]
    }
  );
}
function FontCombobox({
  presets,
  activeKey,
  onSelect
}) {
  const [open, setOpen] = (0, import_react.useState)(false);
  const [search, setSearch] = (0, import_react.useState)("");
  const [highlightIndex, setHighlightIndex] = (0, import_react.useState)(-1);
  const containerRef = (0, import_react.useRef)(null);
  const listRef = (0, import_react.useRef)(null);
  const inputRef = (0, import_react.useRef)(null);
  const activePreset = (0, import_react.useMemo)(
    () => presets.find((p) => p.key === activeKey) ?? presets[0],
    [presets, activeKey]
  );
  const filtered = (0, import_react.useMemo)(() => {
    if (!search.trim()) return presets;
    const q = search.toLowerCase();
    return presets.filter((p) => p.name.toLowerCase().includes(q));
  }, [presets, search]);
  (0, import_react.useEffect)(() => {
    setHighlightIndex(0);
  }, []);
  (0, import_react.useEffect)(() => {
    if (!open) return;
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);
  (0, import_react.useEffect)(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);
  (0, import_react.useEffect)(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setSearch("");
      setHighlightIndex(-1);
    }
  }, [open]);
  (0, import_react.useEffect)(() => {
    if (!open || highlightIndex < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-font-item]");
    items[highlightIndex]?.scrollIntoView({ block: "nearest" });
  }, [highlightIndex, open]);
  const handleSelect = (0, import_react.useCallback)(
    (key) => {
      onSelect(key);
      setOpen(false);
    },
    [onSelect]
  );
  const handleKeyDown = (0, import_react.useCallback)(
    (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (highlightIndex >= 0 && highlightIndex < filtered.length) {
          handleSelect(filtered[highlightIndex].key);
        }
      }
    },
    [filtered, highlightIndex, handleSelect]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: containerRef, className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        type: "button",
        onClick: () => setOpen((prev) => !prev),
        className: (0, import_cn.cn)(
          "flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-all duration-fast ease-standard",
          "hover:border-border-strong hover:bg-muted/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          open ? "border-primary shadow-sm" : "border-border"
        ),
        "aria-haspopup": "listbox",
        "aria-expanded": open,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              className: "text-sm font-semibold leading-none text-muted-foreground",
              style: { fontFamily: activePreset.value },
              children: activePreset.sample
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1 truncate font-medium text-foreground", children: activePreset.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ChevronDownIcon,
            {
              className: (0, import_cn.cn)(
                "text-muted-foreground transition-transform duration-fast",
                open && "rotate-180"
              )
            }
          )
        ]
      }
    ),
    open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: (0, import_cn.cn)(
          "absolute left-0 z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-md",
          "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
        ),
        role: "dialog",
        "aria-label": "Select font",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 border-b border-border px-3 py-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchIcon, { className: "text-muted-foreground" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                ref: inputRef,
                type: "text",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                onKeyDown: handleKeyDown,
                placeholder: "Search fonts\u2026",
                className: "flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none",
                "aria-label": "Search fonts",
                autoComplete: "off",
                spellCheck: false
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              ref: listRef,
              className: "max-h-52 overflow-y-auto overscroll-contain p-1",
              role: "listbox",
              children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-3 py-4 text-center text-sm text-muted-foreground", children: "No fonts found" }) : filtered.map((preset, index) => {
                const isActive = preset.key === activeKey;
                const isHighlighted = index === highlightIndex;
                return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "button",
                  {
                    type: "button",
                    "data-font-item": "",
                    role: "option",
                    "aria-selected": isActive,
                    onClick: () => handleSelect(preset.key),
                    onMouseEnter: () => setHighlightIndex(index),
                    className: (0, import_cn.cn)(
                      "flex w-full items-center gap-2.5 rounded-sm px-2.5 py-1.5 text-left text-sm transition-colors",
                      "outline-none",
                      isHighlighted && "bg-muted",
                      isActive && "text-foreground font-medium",
                      !isActive && "text-muted-foreground"
                    ),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        "span",
                        {
                          className: "w-6 text-center text-base font-semibold leading-none",
                          style: { fontFamily: preset.value },
                          "aria-hidden": "true",
                          children: preset.sample
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1 truncate", children: preset.name }),
                      isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, { className: "text-primary shrink-0" })
                    ]
                  },
                  preset.key
                );
              })
            }
          )
        ]
      }
    )
  ] });
}
function ColorCombobox({
  presets,
  activeKey,
  onSelect
}) {
  const [open, setOpen] = (0, import_react.useState)(false);
  const [search, setSearch] = (0, import_react.useState)("");
  const [highlightIndex, setHighlightIndex] = (0, import_react.useState)(-1);
  const containerRef = (0, import_react.useRef)(null);
  const listRef = (0, import_react.useRef)(null);
  const inputRef = (0, import_react.useRef)(null);
  const activePreset = (0, import_react.useMemo)(
    () => presets.find((p) => p.key === activeKey) ?? presets[0],
    [presets, activeKey]
  );
  const filtered = (0, import_react.useMemo)(() => {
    if (!search.trim()) return presets;
    const q = search.toLowerCase();
    return presets.filter((p) => p.name.toLowerCase().includes(q));
  }, [presets, search]);
  (0, import_react.useEffect)(() => {
    setHighlightIndex(0);
  }, []);
  (0, import_react.useEffect)(() => {
    if (!open) return;
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);
  (0, import_react.useEffect)(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);
  (0, import_react.useEffect)(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setSearch("");
      setHighlightIndex(-1);
    }
  }, [open]);
  (0, import_react.useEffect)(() => {
    if (!open || highlightIndex < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-color-item]");
    items[highlightIndex]?.scrollIntoView({ block: "nearest" });
  }, [highlightIndex, open]);
  const handleSelect = (0, import_react.useCallback)(
    (key) => {
      onSelect(key);
      setOpen(false);
    },
    [onSelect]
  );
  const handleKeyDown = (0, import_react.useCallback)(
    (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (highlightIndex >= 0 && highlightIndex < filtered.length) {
          handleSelect(filtered[highlightIndex].key);
        }
      }
    },
    [filtered, highlightIndex, handleSelect]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: containerRef, className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        type: "button",
        onClick: () => setOpen((prev) => !prev),
        className: (0, import_cn.cn)(
          "flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-all duration-fast ease-standard",
          "hover:border-border-strong hover:bg-muted/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          open ? "border-primary shadow-sm" : "border-border"
        ),
        "aria-haspopup": "listbox",
        "aria-expanded": open,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              className: (0, import_cn.cn)(
                "size-5 shrink-0 rounded-full border shadow-xs",
                "border-border"
              ),
              style: { backgroundColor: activePreset.swatch },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1 truncate font-medium text-foreground", children: activePreset.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ChevronDownIcon,
            {
              className: (0, import_cn.cn)(
                "text-muted-foreground transition-transform duration-fast",
                open && "rotate-180"
              )
            }
          )
        ]
      }
    ),
    open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: (0, import_cn.cn)(
          "absolute left-0 z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-md",
          "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
        ),
        role: "dialog",
        "aria-label": "Select color",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 border-b border-border px-3 py-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchIcon, { className: "text-muted-foreground" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                ref: inputRef,
                type: "text",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                onKeyDown: handleKeyDown,
                placeholder: "Search colors\u2026",
                className: "flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none",
                "aria-label": "Search colors",
                autoComplete: "off",
                spellCheck: false
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              ref: listRef,
              className: "max-h-52 overflow-y-auto overscroll-contain p-1",
              role: "listbox",
              children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-3 py-4 text-center text-sm text-muted-foreground", children: "No colors found" }) : filtered.map((preset, index) => {
                const isActive = preset.key === activeKey;
                const isHighlighted = index === highlightIndex;
                return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "button",
                  {
                    type: "button",
                    "data-color-item": "",
                    role: "option",
                    "aria-selected": isActive,
                    onClick: () => handleSelect(preset.key),
                    onMouseEnter: () => setHighlightIndex(index),
                    className: (0, import_cn.cn)(
                      "flex w-full items-center gap-2.5 rounded-sm px-2.5 py-1.5 text-left text-sm transition-colors",
                      "outline-none",
                      isHighlighted && "bg-muted",
                      isActive && "text-foreground font-medium",
                      !isActive && "text-muted-foreground"
                    ),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        "span",
                        {
                          className: (0, import_cn.cn)(
                            "size-4 shrink-0 rounded-full border shadow-xs",
                            isActive ? "border-primary/50 ring-2 ring-primary/20" : "border-border"
                          ),
                          style: { backgroundColor: preset.swatch },
                          "aria-hidden": "true"
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1 truncate", children: preset.name }),
                      isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, { className: "text-primary shrink-0" })
                    ]
                  },
                  preset.key
                );
              })
            }
          )
        ]
      }
    )
  ] });
}
function PillToggle({
  label,
  isActive,
  onClick,
  description
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      type: "button",
      onClick,
      className: (0, import_cn.cn)(
        "rounded-md border px-3 py-2 text-left text-sm transition-all duration-fast ease-standard",
        "hover:border-border-strong hover:bg-muted/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive ? "border-primary bg-muted/60 shadow-sm font-medium text-foreground" : "border-border bg-transparent text-muted-foreground"
      ),
      title: description,
      children: label
    }
  );
}
function StyleOption({
  preset,
  isActive,
  onClick
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "button",
    {
      type: "button",
      onClick,
      className: (0, import_cn.cn)(
        "flex items-start gap-3 rounded-md border px-3 py-3 text-left transition-all duration-fast ease-standard",
        "hover:border-border-strong hover:bg-muted/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive ? "border-primary bg-muted/60 shadow-sm" : "border-border bg-transparent"
      ),
      title: preset.description,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "svg",
          {
            className: (0, import_cn.cn)(
              "size-5 shrink-0 mt-0.5",
              isActive ? "text-primary" : "text-muted-foreground"
            ),
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: preset.iconPath })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              className: (0, import_cn.cn)(
                "text-sm font-semibold leading-tight",
                isActive ? "text-foreground" : "text-foreground"
              ),
              children: preset.name
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              className: (0, import_cn.cn)(
                "mt-0.5 text-xs leading-snug",
                isActive ? "text-muted-foreground" : "text-muted-foreground/70"
              ),
              children: preset.description
            }
          )
        ] }),
        isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, { className: "shrink-0 mt-0.5 text-primary" })
      ]
    }
  );
}
function CopyButton({
  getText,
  className,
  children
}) {
  const [copied, setCopied] = (0, import_react.useState)(false);
  const timeoutRef = (0, import_react.useRef)(null);
  const handleCopy = (0, import_react.useCallback)(() => {
    const text = getText();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2e3);
    });
  }, [getText]);
  (0, import_react.useEffect)(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      type: "button",
      onClick: handleCopy,
      className: (0, import_cn.cn)(
        "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-all duration-fast ease-standard",
        "hover:bg-secondary-hover active:bg-secondary-active",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      ),
      children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, { className: "text-success" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Copied!" })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "svg",
          {
            className: "size-4",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: children ?? "Copy CSS" })
      ] })
    }
  );
}
function ThemeCustomizer({
  className,
  showCopyButton = true,
  showResetButton = true
}) {
  const {
    config,
    setStyle,
    setColorPreset,
    setRadius,
    setFont,
    setShadow,
    setSurfaceStyle,
    setMenuColor,
    setMenuAccent,
    resetConfig,
    isDefault,
    generateCSS
  } = (0, import_customizer_store.useThemeCustomizer)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: (0, import_cn.cn)("space-y-6", className),
      "data-ds": "",
      "data-ds-component": "theme-customizer",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { title: "Style", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid grid-cols-1 gap-2", children: import_presets.STYLE_PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          StyleOption,
          {
            preset,
            isActive: config.style === preset.key,
            onClick: () => setStyle(preset.key)
          },
          preset.key
        )) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { title: "Color", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ColorCombobox,
          {
            presets: import_presets.COLOR_PRESETS,
            activeKey: config.colorPreset,
            onSelect: setColorPreset
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { title: "Radius", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-wrap gap-2", children: import_presets.RADIUS_PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          RadiusOption,
          {
            preset,
            isActive: config.radius === preset.key,
            onClick: () => setRadius(preset.key)
          },
          preset.key
        )) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { title: "Font", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          FontCombobox,
          {
            presets: import_presets.FONT_PRESETS,
            activeKey: config.font,
            onSelect: setFont
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { title: "Shadow", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-wrap gap-2", children: import_presets.SHADOW_PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          PillToggle,
          {
            label: preset.name,
            isActive: config.shadow === preset.key,
            onClick: () => setShadow(preset.key),
            description: preset.description
          },
          preset.key
        )) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { title: "Surface", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-wrap gap-2", children: import_presets.SURFACE_STYLE_PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          PillToggle,
          {
            label: preset.name,
            isActive: config.surfaceStyle === preset.key,
            onClick: () => setSurfaceStyle(preset.key),
            description: preset.description
          },
          preset.key
        )) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { title: "Menu Color", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-wrap gap-2", children: import_presets.MENU_COLOR_PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          PillToggle,
          {
            label: preset.name,
            isActive: config.menuColor === preset.key,
            onClick: () => setMenuColor(preset.key),
            description: preset.description
          },
          preset.key
        )) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { title: "Menu Accent", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-wrap gap-2", children: import_presets.MENU_ACCENT_PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          PillToggle,
          {
            label: preset.name,
            isActive: config.menuAccent === preset.key,
            onClick: () => setMenuAccent(preset.key),
            description: preset.description
          },
          preset.key
        )) }) }),
        (showCopyButton || showResetButton) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 border-t border-border pt-4", children: [
          showCopyButton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, { getText: generateCSS, className: "flex-1" }),
          showResetButton && !isDefault && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              type: "button",
              onClick: resetConfig,
              className: (0, import_cn.cn)(
                "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-fast ease-standard",
                "hover:bg-muted hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              ),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "svg",
                  {
                    className: "size-4",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    "aria-hidden": "true",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 3v5h5" })
                    ]
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reset" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
ThemeCustomizer.displayName = "ThemeCustomizer";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ThemeCustomizer
});
