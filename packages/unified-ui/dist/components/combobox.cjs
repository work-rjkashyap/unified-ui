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
var combobox_exports = {};
__export(combobox_exports, {
  Combobox: () => Combobox,
  comboboxTriggerVariants: () => comboboxTriggerVariants
});
module.exports = __toCommonJS(combobox_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_motion = require("../motion/index");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_framer_motion = require("framer-motion");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
const comboboxTriggerVariants = (0, import_class_variance_authority.cva)(
  [
    "inline-flex items-center justify-between gap-2 w-full",
    "rounded-md border bg-background",
    "text-left",
    "transition-[border-color,box-shadow] duration-fast",
    import_focus_ring.focusRingClasses,
    "disabled:pointer-events-none disabled:opacity-50"
  ],
  {
    variants: {
      variant: {
        default: "border-input",
        primary: "border-primary/40"
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-4 text-sm"
      },
      open: {
        true: "border-ring ring-2 ring-ring/20",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      open: false
    }
  }
);
function ChevronsUpDownIcon({ className }) {
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m7 15 5 5 5-5" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m7 9 5-5 5 5" })
      ]
    }
  );
}
function CheckIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      className,
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
function SearchIcon({ className }) {
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m21 21-4.3-4.3" })
      ]
    }
  );
}
function defaultFilter(option, query) {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  return option.label.toLowerCase().includes(q) || option.value.toLowerCase().includes(q) || (option.description?.toLowerCase().includes(q) ?? false);
}
function MultiTag({ label, onRemove, disabled, size }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "span",
    {
      className: (0, import_cn.cn)(
        "inline-flex items-center gap-1 rounded",
        "bg-accent text-accent-foreground",
        "font-normal",
        size === "sm" ? "text-xs px-1.5 py-0.5" : "text-xs px-2 py-0.5"
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "max-w-[100px] truncate", children: label }),
        !disabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: (e) => {
              e.stopPropagation();
              onRemove();
            },
            className: "shrink-0 rounded-sm opacity-60 hover:opacity-100 transition-opacity",
            "aria-label": `Remove ${label}`,
            tabIndex: -1,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XIcon, { className: "size-3" })
          }
        )
      ]
    }
  );
}
const iconSizeMap = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4"
};
const Combobox = (0, import_react.forwardRef)(
  function Combobox2({
    options,
    groups,
    value: controlledValue,
    values: controlledValues,
    defaultValue,
    defaultValues,
    onSelect,
    onMultiSelect,
    multi = false,
    searchable = true,
    placeholder = "Select...",
    searchPlaceholder = "Search...",
    emptyMessage = "No results found.",
    variant = "default",
    size = "md",
    disabled = false,
    clearable = true,
    maxHeight = "240px",
    filterOption,
    renderOption,
    renderValue,
    align = "start",
    matchWidth = true,
    className,
    contentClassName
  }, ref) {
    const shouldReduce = (0, import_framer_motion.useReducedMotion)();
    const id = (0, import_react.useId)();
    const [open, setOpen] = (0, import_react.useState)(false);
    const [query, setQuery] = (0, import_react.useState)("");
    const [activeIndex, setActiveIndex] = (0, import_react.useState)(-1);
    const [internalValue, setInternalValue] = (0, import_react.useState)(
      defaultValue ?? ""
    );
    const [internalValues, setInternalValues] = (0, import_react.useState)(
      defaultValues ?? []
    );
    const selectedValue = multi ? null : controlledValue !== void 0 ? controlledValue : internalValue;
    const selectedValues = multi ? controlledValues !== void 0 ? controlledValues : internalValues : [];
    const optionMap = new Map(options.map((o) => [o.value, o]));
    const selectedOption = selectedValue ? optionMap.get(selectedValue) ?? null : null;
    const selectedOptions = selectedValues.map((v) => optionMap.get(v)).filter(Boolean);
    const resolvedFilter = filterOption ?? defaultFilter;
    const filteredOptions = query ? options.filter((o) => resolvedFilter(o, query)) : options;
    const groupedOptions = [];
    if (groups && groups.length > 0) {
      const ungrouped = filteredOptions.filter((o) => !o.group);
      if (ungrouped.length > 0) {
        groupedOptions.push({ options: ungrouped });
      }
      for (const group of groups) {
        const groupOpts = filteredOptions.filter(
          (o) => o.group === group.value
        );
        if (groupOpts.length > 0) {
          groupedOptions.push({ group, options: groupOpts });
        }
      }
    } else {
      groupedOptions.push({ options: filteredOptions });
    }
    const flatFiltered = groupedOptions.flatMap((g) => g.options);
    (0, import_react.useEffect)(() => {
      setActiveIndex(-1);
    }, [query]);
    const searchRef = (0, import_react.useRef)(null);
    (0, import_react.useEffect)(() => {
      if (open && searchable) {
        setTimeout(() => searchRef.current?.focus(), 10);
      }
      if (!open) {
        setQuery("");
        setActiveIndex(-1);
      }
    }, [open, searchable]);
    const handleSelect = (0, import_react.useCallback)(
      (optionValue) => {
        if (multi) {
          const isSelected = selectedValues.includes(optionValue);
          const next = isSelected ? selectedValues.filter((v) => v !== optionValue) : [...selectedValues, optionValue];
          if (controlledValues === void 0) {
            setInternalValues(next);
          }
          onMultiSelect?.(next);
        } else {
          const isSame = selectedValue === optionValue;
          const next = isSame ? "" : optionValue;
          if (controlledValue === void 0) {
            setInternalValue(next);
          }
          onSelect?.(isSame ? null : optionValue);
          setOpen(false);
        }
      },
      [
        multi,
        selectedValues,
        selectedValue,
        controlledValues,
        controlledValue,
        onMultiSelect,
        onSelect
      ]
    );
    const handleClear = (0, import_react.useCallback)(
      (e) => {
        e.stopPropagation();
        if (multi) {
          if (controlledValues === void 0) setInternalValues([]);
          onMultiSelect?.([]);
        } else {
          if (controlledValue === void 0) setInternalValue("");
          onSelect?.(null);
        }
      },
      [multi, controlledValues, controlledValue, onMultiSelect, onSelect]
    );
    const hasValue = multi ? selectedValues.length > 0 : !!selectedValue;
    const handleDropdownKeyDown = (0, import_react.useCallback)(
      (e) => {
        if (!open) return;
        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            setActiveIndex(
              (prev) => prev < flatFiltered.length - 1 ? prev + 1 : 0
            );
            break;
          case "ArrowUp":
            e.preventDefault();
            setActiveIndex(
              (prev) => prev > 0 ? prev - 1 : flatFiltered.length - 1
            );
            break;
          case "Enter":
            e.preventDefault();
            if (activeIndex >= 0 && flatFiltered[activeIndex]) {
              const opt = flatFiltered[activeIndex];
              if (!opt.disabled) {
                handleSelect(opt.value);
              }
            }
            break;
          case "Escape":
            setOpen(false);
            break;
          case "Tab":
            setOpen(false);
            break;
          default:
            break;
        }
      },
      [open, flatFiltered, activeIndex, handleSelect]
    );
    const triggerContent = (() => {
      if (renderValue) {
        return renderValue(multi ? selectedOptions : selectedOption);
      }
      if (multi) {
        if (selectedOptions.length === 0) {
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-muted-foreground truncate", children: placeholder });
        }
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex flex-wrap gap-1 flex-1 min-w-0 overflow-hidden", children: selectedOptions.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          MultiTag,
          {
            label: opt.label,
            size,
            disabled,
            onRemove: () => handleSelect(opt.value)
          },
          opt.value
        )) });
      }
      return selectedOption ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-center gap-2 min-w-0 flex-1 truncate", children: [
        selectedOption.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "shrink-0", children: selectedOption.icon }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "truncate", children: selectedOption.label })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-muted-foreground truncate flex-1", children: placeholder });
    })();
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_radix_ui.Popover.Root, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Popover.Trigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          ref,
          type: "button",
          disabled,
          role: "combobox",
          "aria-expanded": open,
          "aria-haspopup": "listbox",
          "aria-controls": open ? `${id}-listbox` : void 0,
          className: (0, import_cn.cn)(
            comboboxTriggerVariants({ variant, size, open }),
            multi && "min-h-9 h-auto py-1.5 flex-wrap",
            className
          ),
          "data-ds": "",
          "data-ds-component": "combobox",
          "data-ds-variant": variant,
          "data-ds-size": size,
          "data-ds-multi": multi ? "" : void 0,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex items-center gap-1.5 flex-1 min-w-0 overflow-hidden", children: triggerContent }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-center gap-1 shrink-0 ml-1", children: [
              clearable && hasValue && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "span",
                {
                  role: "button",
                  tabIndex: -1,
                  onClick: handleClear,
                  onKeyDown: (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleClear(e);
                    }
                  },
                  className: (0, import_cn.cn)(
                    "inline-flex items-center justify-center rounded-sm",
                    "text-muted-foreground hover:text-foreground",
                    "transition-colors duration-fast",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  ),
                  "aria-label": "Clear selection",
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XIcon, { className: iconSizeMap[size] })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ChevronsUpDownIcon,
                {
                  className: (0, import_cn.cn)(
                    iconSizeMap[size],
                    "text-muted-foreground transition-transform duration-fast",
                    open && "rotate-180"
                  )
                }
              )
            ] })
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
          onKeyDown: handleDropdownKeyDown,
          onInteractOutside: () => setOpen(false),
          onEscapeKeyDown: () => setOpen(false),
          style: matchWidth ? { width: "var(--radix-popover-trigger-width)" } : void 0,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            import_framer_motion.motion.div,
            {
              id: `${id}-listbox`,
              className: (0, import_cn.cn)(
                "z-popover overflow-hidden rounded-md border border-border bg-popover shadow-lg",
                "outline-none",
                contentClassName
              ),
              variants: import_motion.scaleIn.variants,
              initial: shouldReduce ? { opacity: 0 } : "initial",
              animate: "animate",
              exit: shouldReduce ? { opacity: 0 } : "exit",
              transition: import_motion.scaleIn.transition,
              "data-ds-animated": "",
              children: [
                searchable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center border-b border-border px-3 gap-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchIcon, { className: "size-4 shrink-0 text-muted-foreground" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "input",
                    {
                      ref: searchRef,
                      type: "text",
                      value: query,
                      onChange: (e) => setQuery(e.target.value),
                      placeholder: searchPlaceholder,
                      className: (0, import_cn.cn)(
                        "flex-1 h-9 bg-transparent outline-none",
                        "text-sm placeholder:text-muted-foreground",
                        "text-foreground"
                      ),
                      "aria-label": searchPlaceholder,
                      autoComplete: "off",
                      autoCorrect: "off",
                      autoCapitalize: "off",
                      spellCheck: false
                    }
                  ),
                  query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "button",
                    {
                      type: "button",
                      onClick: () => setQuery(""),
                      className: "text-muted-foreground hover:text-foreground transition-colors",
                      "aria-label": "Clear search",
                      tabIndex: -1,
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XIcon, { className: "size-3.5" })
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "div",
                  {
                    role: "listbox",
                    "aria-multiselectable": multi,
                    "aria-label": placeholder,
                    className: "overflow-y-auto py-1",
                    style: { maxHeight },
                    children: flatFiltered.length === 0 ? (
                      // Empty state
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        import_framer_motion.motion.div,
                        {
                          className: "py-6 text-center text-sm text-muted-foreground",
                          variants: import_motion.fadeIn.variants,
                          initial: "initial",
                          animate: "animate",
                          transition: import_motion.fadeIn.transition,
                          "data-ds-animated": "",
                          children: emptyMessage
                        }
                      )
                    ) : (
                      // Results
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        import_framer_motion.motion.div,
                        {
                          variants: shouldReduce ? void 0 : import_motion.staggerContainerFast.variants,
                          initial: shouldReduce ? void 0 : "initial",
                          animate: shouldReduce ? void 0 : "animate",
                          children: groupedOptions.map((section, sectionIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                            section.group && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: section.group.label }),
                            section.options.map((option) => {
                              const isSelected = multi ? selectedValues.includes(option.value) : selectedValue === option.value;
                              const flatIdx = flatFiltered.indexOf(option);
                              const isActive = flatIdx === activeIndex;
                              return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                import_framer_motion.motion.div,
                                {
                                  role: "option",
                                  id: `${id}-option-${option.value}`,
                                  "aria-selected": isSelected,
                                  "aria-disabled": option.disabled,
                                  variants: shouldReduce ? void 0 : import_motion.slideUpSm.variants,
                                  className: (0, import_cn.cn)(
                                    "relative flex items-center gap-2 px-3 py-2 text-sm rounded-sm mx-1",
                                    "cursor-pointer select-none",
                                    "transition-colors duration-fast",
                                    isActive ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-accent hover:text-accent-foreground",
                                    isSelected && !isActive && "bg-primary/8 text-foreground",
                                    option.disabled && "pointer-events-none opacity-40"
                                  ),
                                  onClick: () => {
                                    if (!option.disabled) {
                                      handleSelect(option.value);
                                    }
                                  },
                                  onMouseEnter: () => setActiveIndex(flatIdx),
                                  children: renderOption ? renderOption(option, isSelected) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                      "span",
                                      {
                                        className: (0, import_cn.cn)(
                                          "flex items-center justify-center shrink-0",
                                          "size-4",
                                          isSelected ? "text-primary" : "text-transparent"
                                        ),
                                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, { className: "size-4" })
                                      }
                                    ),
                                    option.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "shrink-0 text-muted-foreground", children: option.icon }),
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex flex-col min-w-0", children: [
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "truncate", children: option.label }),
                                      option.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xs text-muted-foreground truncate", children: option.description })
                                    ] })
                                  ] })
                                },
                                option.value
                              );
                            }),
                            sectionIdx < groupedOptions.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-1 border-t border-border" })
                          ] }, sectionIdx))
                        }
                      )
                    )
                  }
                )
              ]
            }
          )
        }
      ) }) })
    ] });
  }
);
Combobox.displayName = "Combobox";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Combobox,
  comboboxTriggerVariants
});
