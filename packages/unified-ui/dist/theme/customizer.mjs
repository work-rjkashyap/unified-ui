"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { useThemeCustomizer } from "./customizer-store";
import {
  COLOR_PRESETS,
  FONT_PRESETS,
  MENU_ACCENT_PRESETS,
  MENU_COLOR_PRESETS,
  RADIUS_PRESETS,
  SHADOW_PRESETS,
  STYLE_PRESETS,
  SURFACE_STYLE_PRESETS
} from "./presets";
function Section({
  title,
  children,
  className
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-2", className), children: [
    /* @__PURE__ */ jsx("h4", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: title }),
    children
  ] });
}
function CheckIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: cn("size-4 shrink-0", className),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "M20 6 9 17l-5-5" })
    }
  );
}
function RadiusOption({
  preset,
  isActive,
  onClick
}) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: cn(
        "flex flex-col items-center justify-center gap-1 rounded-md border px-3 py-2 text-center transition-all duration-fast ease-standard",
        "hover:border-border-strong hover:bg-muted/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive ? "border-primary bg-muted/60 shadow-sm" : "border-border bg-transparent"
      ),
      title: `${preset.name} (${preset.label})`,
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "size-8 border-2 border-foreground/30 bg-muted",
            style: { borderRadius: preset.value },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
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
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: cn("size-4 shrink-0", className),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6" })
    }
  );
}
function SearchIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: cn("size-4 shrink-0", className),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ jsx("path", { d: "m21 21-4.3-4.3" })
      ]
    }
  );
}
function FontCombobox({
  presets,
  activeKey,
  onSelect
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const activePreset = useMemo(
    () => presets.find((p) => p.key === activeKey) ?? presets[0],
    [presets, activeKey]
  );
  const filtered = useMemo(() => {
    if (!search.trim()) return presets;
    const q = search.toLowerCase();
    return presets.filter((p) => p.name.toLowerCase().includes(q));
  }, [presets, search]);
  useEffect(() => {
    setHighlightIndex(0);
  }, []);
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setSearch("");
      setHighlightIndex(-1);
    }
  }, [open]);
  useEffect(() => {
    if (!open || highlightIndex < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-font-item]");
    items[highlightIndex]?.scrollIntoView({ block: "nearest" });
  }, [highlightIndex, open]);
  const handleSelect = useCallback(
    (key) => {
      onSelect(key);
      setOpen(false);
    },
    [onSelect]
  );
  const handleKeyDown = useCallback(
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
  return /* @__PURE__ */ jsxs("div", { ref: containerRef, className: "relative", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((prev) => !prev),
        className: cn(
          "flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-all duration-fast ease-standard",
          "hover:border-border-strong hover:bg-muted/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          open ? "border-primary shadow-sm" : "border-border"
        ),
        "aria-haspopup": "listbox",
        "aria-expanded": open,
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "text-sm font-semibold leading-none text-muted-foreground",
              style: { fontFamily: activePreset.value },
              children: activePreset.sample
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "flex-1 truncate font-medium text-foreground", children: activePreset.name }),
          /* @__PURE__ */ jsx(
            ChevronDownIcon,
            {
              className: cn(
                "text-muted-foreground transition-transform duration-fast",
                open && "rotate-180"
              )
            }
          )
        ]
      }
    ),
    open && /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "absolute left-0 z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-md",
          "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
        ),
        role: "dialog",
        "aria-label": "Select font",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 border-b border-border px-3 py-2", children: [
            /* @__PURE__ */ jsx(SearchIcon, { className: "text-muted-foreground" }),
            /* @__PURE__ */ jsx(
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
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: listRef,
              className: "max-h-52 overflow-y-auto overscroll-contain p-1",
              role: "listbox",
              children: filtered.length === 0 ? /* @__PURE__ */ jsx("div", { className: "px-3 py-4 text-center text-sm text-muted-foreground", children: "No fonts found" }) : filtered.map((preset, index) => {
                const isActive = preset.key === activeKey;
                const isHighlighted = index === highlightIndex;
                return /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    "data-font-item": "",
                    role: "option",
                    "aria-selected": isActive,
                    onClick: () => handleSelect(preset.key),
                    onMouseEnter: () => setHighlightIndex(index),
                    className: cn(
                      "flex w-full items-center gap-2.5 rounded-sm px-2.5 py-1.5 text-left text-sm transition-colors",
                      "outline-none",
                      isHighlighted && "bg-muted",
                      isActive && "text-foreground font-medium",
                      !isActive && "text-muted-foreground"
                    ),
                    children: [
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "w-6 text-center text-base font-semibold leading-none",
                          style: { fontFamily: preset.value },
                          "aria-hidden": "true",
                          children: preset.sample
                        }
                      ),
                      /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: preset.name }),
                      isActive && /* @__PURE__ */ jsx(CheckIcon, { className: "text-primary shrink-0" })
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
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const activePreset = useMemo(
    () => presets.find((p) => p.key === activeKey) ?? presets[0],
    [presets, activeKey]
  );
  const filtered = useMemo(() => {
    if (!search.trim()) return presets;
    const q = search.toLowerCase();
    return presets.filter((p) => p.name.toLowerCase().includes(q));
  }, [presets, search]);
  useEffect(() => {
    setHighlightIndex(0);
  }, []);
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setSearch("");
      setHighlightIndex(-1);
    }
  }, [open]);
  useEffect(() => {
    if (!open || highlightIndex < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-color-item]");
    items[highlightIndex]?.scrollIntoView({ block: "nearest" });
  }, [highlightIndex, open]);
  const handleSelect = useCallback(
    (key) => {
      onSelect(key);
      setOpen(false);
    },
    [onSelect]
  );
  const handleKeyDown = useCallback(
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
  return /* @__PURE__ */ jsxs("div", { ref: containerRef, className: "relative", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((prev) => !prev),
        className: cn(
          "flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-all duration-fast ease-standard",
          "hover:border-border-strong hover:bg-muted/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          open ? "border-primary shadow-sm" : "border-border"
        ),
        "aria-haspopup": "listbox",
        "aria-expanded": open,
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "size-5 shrink-0 rounded-full border shadow-xs",
                "border-border"
              ),
              style: { backgroundColor: activePreset.swatch },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "flex-1 truncate font-medium text-foreground", children: activePreset.name }),
          /* @__PURE__ */ jsx(
            ChevronDownIcon,
            {
              className: cn(
                "text-muted-foreground transition-transform duration-fast",
                open && "rotate-180"
              )
            }
          )
        ]
      }
    ),
    open && /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "absolute left-0 z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-md",
          "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
        ),
        role: "dialog",
        "aria-label": "Select color",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 border-b border-border px-3 py-2", children: [
            /* @__PURE__ */ jsx(SearchIcon, { className: "text-muted-foreground" }),
            /* @__PURE__ */ jsx(
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
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: listRef,
              className: "max-h-52 overflow-y-auto overscroll-contain p-1",
              role: "listbox",
              children: filtered.length === 0 ? /* @__PURE__ */ jsx("div", { className: "px-3 py-4 text-center text-sm text-muted-foreground", children: "No colors found" }) : filtered.map((preset, index) => {
                const isActive = preset.key === activeKey;
                const isHighlighted = index === highlightIndex;
                return /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    "data-color-item": "",
                    role: "option",
                    "aria-selected": isActive,
                    onClick: () => handleSelect(preset.key),
                    onMouseEnter: () => setHighlightIndex(index),
                    className: cn(
                      "flex w-full items-center gap-2.5 rounded-sm px-2.5 py-1.5 text-left text-sm transition-colors",
                      "outline-none",
                      isHighlighted && "bg-muted",
                      isActive && "text-foreground font-medium",
                      !isActive && "text-muted-foreground"
                    ),
                    children: [
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: cn(
                            "size-4 shrink-0 rounded-full border shadow-xs",
                            isActive ? "border-primary/50 ring-2 ring-primary/20" : "border-border"
                          ),
                          style: { backgroundColor: preset.swatch },
                          "aria-hidden": "true"
                        }
                      ),
                      /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: preset.name }),
                      isActive && /* @__PURE__ */ jsx(CheckIcon, { className: "text-primary shrink-0" })
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
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick,
      className: cn(
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
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: cn(
        "flex items-start gap-3 rounded-md border px-3 py-3 text-left transition-all duration-fast ease-standard",
        "hover:border-border-strong hover:bg-muted/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive ? "border-primary bg-muted/60 shadow-sm" : "border-border bg-transparent"
      ),
      title: preset.description,
      children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: cn(
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
            children: /* @__PURE__ */ jsx("path", { d: preset.iconPath })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "text-sm font-semibold leading-tight",
                isActive ? "text-foreground" : "text-foreground"
              ),
              children: preset.name
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "mt-0.5 text-xs leading-snug",
                isActive ? "text-muted-foreground" : "text-muted-foreground/70"
              ),
              children: preset.description
            }
          )
        ] }),
        isActive && /* @__PURE__ */ jsx(CheckIcon, { className: "shrink-0 mt-0.5 text-primary" })
      ]
    }
  );
}
function CopyButton({
  getText,
  className,
  children
}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);
  const handleCopy = useCallback(() => {
    const text = getText();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2e3);
    });
  }, [getText]);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: handleCopy,
      className: cn(
        "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-all duration-fast ease-standard",
        "hover:bg-secondary-hover active:bg-secondary-active",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      ),
      children: copied ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(CheckIcon, { className: "text-success" }),
        /* @__PURE__ */ jsx("span", { children: "Copied!" })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(
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
              /* @__PURE__ */ jsx("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }),
              /* @__PURE__ */ jsx("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("span", { children: children ?? "Copy CSS" })
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
  } = useThemeCustomizer();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("space-y-6", className),
      "data-ds": "",
      "data-ds-component": "theme-customizer",
      children: [
        /* @__PURE__ */ jsx(Section, { title: "Style", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-2", children: STYLE_PRESETS.map((preset) => /* @__PURE__ */ jsx(
          StyleOption,
          {
            preset,
            isActive: config.style === preset.key,
            onClick: () => setStyle(preset.key)
          },
          preset.key
        )) }) }),
        /* @__PURE__ */ jsx(Section, { title: "Color", children: /* @__PURE__ */ jsx(
          ColorCombobox,
          {
            presets: COLOR_PRESETS,
            activeKey: config.colorPreset,
            onSelect: setColorPreset
          }
        ) }),
        /* @__PURE__ */ jsx(Section, { title: "Radius", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: RADIUS_PRESETS.map((preset) => /* @__PURE__ */ jsx(
          RadiusOption,
          {
            preset,
            isActive: config.radius === preset.key,
            onClick: () => setRadius(preset.key)
          },
          preset.key
        )) }) }),
        /* @__PURE__ */ jsx(Section, { title: "Font", children: /* @__PURE__ */ jsx(
          FontCombobox,
          {
            presets: FONT_PRESETS,
            activeKey: config.font,
            onSelect: setFont
          }
        ) }),
        /* @__PURE__ */ jsx(Section, { title: "Shadow", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: SHADOW_PRESETS.map((preset) => /* @__PURE__ */ jsx(
          PillToggle,
          {
            label: preset.name,
            isActive: config.shadow === preset.key,
            onClick: () => setShadow(preset.key),
            description: preset.description
          },
          preset.key
        )) }) }),
        /* @__PURE__ */ jsx(Section, { title: "Surface", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: SURFACE_STYLE_PRESETS.map((preset) => /* @__PURE__ */ jsx(
          PillToggle,
          {
            label: preset.name,
            isActive: config.surfaceStyle === preset.key,
            onClick: () => setSurfaceStyle(preset.key),
            description: preset.description
          },
          preset.key
        )) }) }),
        /* @__PURE__ */ jsx(Section, { title: "Menu Color", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: MENU_COLOR_PRESETS.map((preset) => /* @__PURE__ */ jsx(
          PillToggle,
          {
            label: preset.name,
            isActive: config.menuColor === preset.key,
            onClick: () => setMenuColor(preset.key),
            description: preset.description
          },
          preset.key
        )) }) }),
        /* @__PURE__ */ jsx(Section, { title: "Menu Accent", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: MENU_ACCENT_PRESETS.map((preset) => /* @__PURE__ */ jsx(
          PillToggle,
          {
            label: preset.name,
            isActive: config.menuAccent === preset.key,
            onClick: () => setMenuAccent(preset.key),
            description: preset.description
          },
          preset.key
        )) }) }),
        (showCopyButton || showResetButton) && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 border-t border-border pt-4", children: [
          showCopyButton && /* @__PURE__ */ jsx(CopyButton, { getText: generateCSS, className: "flex-1" }),
          showResetButton && !isDefault && /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: resetConfig,
              className: cn(
                "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-fast ease-standard",
                "hover:bg-muted hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              ),
              children: [
                /* @__PURE__ */ jsxs(
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
                      /* @__PURE__ */ jsx("path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }),
                      /* @__PURE__ */ jsx("path", { d: "M3 3v5h5" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("span", { children: "Reset" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
ThemeCustomizer.displayName = "ThemeCustomizer";
export {
  ThemeCustomizer
};
