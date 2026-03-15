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
var command_exports = {};
__export(command_exports, {
  Command: () => Command,
  CommandTrigger: () => CommandTrigger
});
module.exports = __toCommonJS(command_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_motion = require("../motion/index");
var import_cn = require("../utils/cn");
var import_framer_motion = require("framer-motion");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
var import_kbd = require("./kbd");
function SearchIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m21 21-4.3-4.3" })
      ]
    }
  );
}
function ShortcutKeys({ keys }) {
  const modifiers = /* @__PURE__ */ new Set(["\u2318", "\u21E7", "\u2325", "\u2303"]);
  const tokens = [];
  let rest = keys;
  while (rest.length > 0) {
    if (modifiers.has(rest[0])) {
      tokens.push(rest[0]);
      rest = rest.slice(1);
    } else {
      tokens.push(rest);
      break;
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex items-center gap-0.5", children: tokens.map((token, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_kbd.Kbd, { size: "sm", children: token }, i)) });
}
function matchesSearch(item, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  return item.label.toLowerCase().includes(q) || (item.description?.toLowerCase().includes(q) ?? false);
}
function Command({
  open,
  onOpenChange,
  groups,
  placeholder = "Search commands...",
  emptyText = "No results found.",
  shortcutKey = "k"
}) {
  const [query, setQuery] = (0, import_react.useState)("");
  const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
  const inputRef = (0, import_react.useRef)(null);
  const listRef = (0, import_react.useRef)(null);
  const inputId = (0, import_react.useId)();
  const listboxId = (0, import_react.useId)();
  (0, import_react.useEffect)(() => {
    function handleKeyDown2(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === shortcutKey) {
        e.preventDefault();
        onOpenChange(!open);
      }
    }
    document.addEventListener("keydown", handleKeyDown2);
    return () => document.removeEventListener("keydown", handleKeyDown2);
  }, [open, onOpenChange, shortcutKey]);
  (0, import_react.useEffect)(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [open]);
  const filteredGroups = (0, import_react.useMemo)(() => {
    return groups.map((group) => ({
      ...group,
      items: group.items.filter((item) => matchesSearch(item, query))
    })).filter((group) => group.items.length > 0);
  }, [groups, query]);
  const flatItems = (0, import_react.useMemo)(
    () => filteredGroups.flatMap((g) => g.items).filter((i) => !i.disabled),
    [filteredGroups]
  );
  const clampedIndex = Math.min(activeIndex, Math.max(0, flatItems.length - 1));
  function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const active = flatItems[clampedIndex];
      if (active) {
        active.onSelect();
        onOpenChange(false);
      }
    } else if (e.key === "Escape") {
      onOpenChange(false);
    }
  }
  (0, import_react.useEffect)(() => {
    const el = listRef.current?.querySelector(
      `[data-cmd-item][data-active="true"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, []);
  let flatIndex = 0;
  const shouldReduce = (0, import_framer_motion.useReducedMotion)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Dialog.Root, { open, onOpenChange, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Dialog.Portal, { forceMount: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Dialog.Overlay, { forceMount: true, asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_framer_motion.motion.div,
      {
        className: (0, import_cn.cn)("fixed inset-0 z-[var(--z-modal)] bg-black/50"),
        variants: shouldReduce ? void 0 : import_motion.overlayBackdrop.variants,
        initial: shouldReduce ? { opacity: 0 } : "initial",
        animate: shouldReduce ? { opacity: 1 } : "animate",
        exit: shouldReduce ? { opacity: 0 } : "exit",
        transition: shouldReduce ? { duration: 0.15 } : import_motion.overlayBackdrop.transition,
        "data-ds-animated": ""
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Dialog.Content, { forceMount: true, asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      import_framer_motion.motion.div,
      {
        className: (0, import_cn.cn)(
          "fixed left-1/2 top-[20%] z-[var(--z-modal)]",
          "w-full max-w-lg -translate-x-1/2",
          "rounded-lg border border-border bg-background shadow-xl",
          "overflow-hidden"
        ),
        variants: shouldReduce ? void 0 : import_motion.modalContent.variants,
        initial: shouldReduce ? { opacity: 0 } : "initial",
        animate: shouldReduce ? { opacity: 1 } : "animate",
        exit: shouldReduce ? { opacity: 0 } : "exit",
        transition: shouldReduce ? { duration: 0.2 } : import_motion.modalContent.transition,
        "data-ds": "",
        "data-ds-component": "command",
        "data-ds-animated": "",
        "aria-label": "Command Palette",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Dialog.Title, { className: "sr-only", children: "Command Palette" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Dialog.Description, { className: "sr-only", children: "Search and run commands using the keyboard or mouse." }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 border-b border-border px-3 py-2.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchIcon, { className: "shrink-0 text-muted-foreground" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                ref: inputRef,
                id: inputId,
                type: "text",
                role: "combobox",
                "aria-expanded": filteredGroups.length > 0,
                "aria-controls": listboxId,
                "aria-activedescendant": flatItems[clampedIndex] ? `cmd-item-${flatItems[clampedIndex].id}` : void 0,
                "aria-autocomplete": "list",
                autoComplete: "off",
                spellCheck: false,
                value: query,
                onChange: (e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                },
                onKeyDown: handleKeyDown,
                placeholder,
                className: (0, import_cn.cn)(
                  "flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutKeys, { keys: "Esc" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              ref: listRef,
              id: listboxId,
              role: "listbox",
              "aria-label": "Commands",
              className: "max-h-[320px] overflow-y-auto p-1",
              children: filteredGroups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "py-6 text-center text-sm text-muted-foreground", children: emptyText }) : filteredGroups.map((group, gi) => {
                return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { role: "group", "aria-label": group.heading, children: [
                  group.heading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: group.heading }),
                  group.items.map((item) => {
                    const isActive = !item.disabled && flatIndex === clampedIndex;
                    if (!item.disabled) flatIndex++;
                    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                      "div",
                      {
                        id: `cmd-item-${item.id}`,
                        role: "option",
                        "aria-selected": isActive,
                        "aria-disabled": item.disabled,
                        "data-cmd-item": "",
                        "data-active": isActive ? "true" : void 0,
                        onMouseEnter: () => {
                          if (!item.disabled) {
                            const idx = flatItems.findIndex(
                              (f) => f.id === item.id
                            );
                            if (idx !== -1) setActiveIndex(idx);
                          }
                        },
                        onClick: () => {
                          if (!item.disabled) {
                            item.onSelect();
                            onOpenChange(false);
                          }
                        },
                        onKeyDown: (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            if (!item.disabled) {
                              item.onSelect();
                              onOpenChange(false);
                            }
                          }
                        },
                        className: (0, import_cn.cn)(
                          "flex cursor-pointer select-none items-center gap-2",
                          "rounded-md px-2 py-2",
                          "text-sm leading-5 outline-none",
                          "transition-colors duration-fast ease-standard",
                          isActive && "bg-muted text-foreground",
                          item.disabled && "pointer-events-none opacity-50"
                        ),
                        children: [
                          item.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex size-4 shrink-0 items-center justify-center text-muted-foreground", children: item.icon }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex-1 min-w-0", children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "truncate font-medium", children: item.label }),
                            item.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "truncate text-xs text-muted-foreground", children: item.description })
                          ] }),
                          item.shortcut && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutKeys, { keys: item.shortcut })
                        ]
                      },
                      item.id
                    );
                  })
                ] }, gi);
              })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3 border-t border-border px-3 py-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutKeys, { keys: "\u2191\u2193" }),
              " navigate"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutKeys, { keys: "\u21B5" }),
              " select"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutKeys, { keys: "Esc" }),
              " close"
            ] })
          ] })
        ]
      }
    ) })
  ] }) }) }) });
}
Command.displayName = "Command";
const CommandTrigger = (0, import_react.forwardRef)(function CommandTrigger2({ label = "Search commands...", onClick, className }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "button",
    {
      ref,
      type: "button",
      onClick,
      className: (0, import_cn.cn)(
        "inline-flex h-9 items-center gap-2",
        "rounded-md border border-border bg-background",
        "px-3 text-sm text-muted-foreground",
        "transition-colors duration-fast ease-standard",
        "hover:border-primary/50 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        "w-48 md:w-64",
        className
      ),
      "data-ds": "",
      "data-ds-component": "command-trigger",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchIcon, { className: "size-3.5 shrink-0" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1 truncate text-left", children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutKeys, { keys: "\u2318K" })
      ]
    }
  );
});
CommandTrigger.displayName = "CommandTrigger";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Command,
  CommandTrigger
});
