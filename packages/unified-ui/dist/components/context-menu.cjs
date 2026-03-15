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
var context_menu_exports = {};
__export(context_menu_exports, {
  ContextMenu: () => ContextMenu,
  ContextMenuCheckboxItem: () => ContextMenuCheckboxItem,
  ContextMenuContent: () => ContextMenuContent,
  ContextMenuGroup: () => ContextMenuGroup,
  ContextMenuItem: () => ContextMenuItem,
  ContextMenuLabel: () => ContextMenuLabel,
  ContextMenuRadioGroup: () => ContextMenuRadioGroup,
  ContextMenuRadioItem: () => ContextMenuRadioItem,
  ContextMenuSeparator: () => ContextMenuSeparator,
  ContextMenuShortcut: () => ContextMenuShortcut,
  ContextMenuSub: () => ContextMenuSub,
  ContextMenuSubContent: () => ContextMenuSubContent,
  ContextMenuSubTrigger: () => ContextMenuSubTrigger,
  ContextMenuTrigger: () => ContextMenuTrigger
});
module.exports = __toCommonJS(context_menu_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
function CheckIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "12",
      height: "12",
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
function DotIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "4" })
    }
  );
}
function ChevronRightIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 18 6-6-6-6" })
    }
  );
}
const menuItemBase = [
  "relative flex w-full cursor-pointer select-none items-center",
  "rounded-sm py-1.5 px-2",
  "text-sm leading-5 outline-none",
  "transition-colors duration-fast ease-standard",
  "focus:bg-muted",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
];
const menuContentBase = [
  "z-[var(--z-dropdown)]",
  "min-w-[10rem]",
  "overflow-hidden",
  "rounded-md",
  "border border-border",
  "bg-background",
  "p-1",
  "shadow-lg",
  "text-foreground",
  // Entry animation
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
];
function ContextMenu({ children, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.ContextMenu.Root, { ...rest, children });
}
ContextMenu.displayName = "ContextMenu";
const ContextMenuTrigger = (0, import_react.forwardRef)(function ContextMenuTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.ContextMenu.Trigger,
    {
      ref,
      className: (0, import_cn.cn)(className),
      "data-ds": "",
      "data-ds-component": "context-menu-trigger",
      ...rest
    }
  );
});
ContextMenuTrigger.displayName = "ContextMenuTrigger";
const ContextMenuContent = (0, import_react.forwardRef)(function ContextMenuContent2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.ContextMenu.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.ContextMenu.Content,
    {
      ref,
      className: (0, import_cn.cn)(...menuContentBase, className),
      "data-ds": "",
      "data-ds-component": "context-menu-content",
      ...rest,
      children
    }
  ) });
});
ContextMenuContent.displayName = "ContextMenuContent";
const ContextMenuItem = (0, import_react.forwardRef)(function ContextMenuItem2({ className, variant = "default", icon, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.ContextMenu.Item,
    {
      ref,
      className: (0, import_cn.cn)(
        ...menuItemBase,
        variant === "danger" && "text-destructive focus:bg-destructive/10 focus:text-destructive",
        className
      ),
      "data-ds": "",
      "data-ds-component": "context-menu-item",
      "data-ds-variant": variant,
      ...rest,
      children: [
        icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mr-2 flex size-4 shrink-0 items-center justify-center", children: icon }),
        children
      ]
    }
  );
});
ContextMenuItem.displayName = "ContextMenuItem";
const ContextMenuCheckboxItem = (0, import_react.forwardRef)(function ContextMenuCheckboxItem2({ className, children, checked, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.ContextMenu.CheckboxItem,
    {
      ref,
      checked,
      className: (0, import_cn.cn)(...menuItemBase, "pl-8", className),
      "data-ds": "",
      "data-ds-component": "context-menu-checkbox-item",
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.ContextMenu.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, { className: "text-foreground" }) }) }),
        children
      ]
    }
  );
});
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";
const ContextMenuRadioGroup = (0, import_react.forwardRef)(function ContextMenuRadioGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.ContextMenu.RadioGroup,
    {
      ref,
      className: (0, import_cn.cn)(className),
      ...rest
    }
  );
});
ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup";
const ContextMenuRadioItem = (0, import_react.forwardRef)(function ContextMenuRadioItem2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.ContextMenu.RadioItem,
    {
      ref,
      className: (0, import_cn.cn)(...menuItemBase, "pl-8", className),
      "data-ds": "",
      "data-ds-component": "context-menu-radio-item",
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.ContextMenu.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DotIcon, { className: "text-foreground" }) }) }),
        children
      ]
    }
  );
});
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";
const ContextMenuLabel = (0, import_react.forwardRef)(function ContextMenuLabel2({ className, inset, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.ContextMenu.Label,
    {
      ref,
      className: (0, import_cn.cn)(
        "px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
        inset && "pl-8",
        className
      ),
      "data-ds": "",
      "data-ds-component": "context-menu-label",
      ...rest
    }
  );
});
ContextMenuLabel.displayName = "ContextMenuLabel";
const ContextMenuSeparator = (0, import_react.forwardRef)(function ContextMenuSeparator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.ContextMenu.Separator,
    {
      ref,
      className: (0, import_cn.cn)("-mx-1 my-1 h-px bg-border", className),
      "data-ds": "",
      "data-ds-component": "context-menu-separator",
      ...rest
    }
  );
});
ContextMenuSeparator.displayName = "ContextMenuSeparator";
const ContextMenuGroup = (0, import_react.forwardRef)(function ContextMenuGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.ContextMenu.Group, { ref, className: (0, import_cn.cn)(className), ...rest });
});
ContextMenuGroup.displayName = "ContextMenuGroup";
function ContextMenuSub({ children, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.ContextMenu.Sub, { ...rest, children });
}
ContextMenuSub.displayName = "ContextMenuSub";
const ContextMenuSubTrigger = (0, import_react.forwardRef)(function ContextMenuSubTrigger2({ className, inset, icon, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.ContextMenu.SubTrigger,
    {
      ref,
      className: (0, import_cn.cn)(
        ...menuItemBase,
        "data-[state=open]:bg-muted",
        inset && "pl-8",
        className
      ),
      "data-ds": "",
      "data-ds-component": "context-menu-sub-trigger",
      ...rest,
      children: [
        icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mr-2 flex size-4 shrink-0 items-center justify-center", children: icon }),
        children,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRightIcon, { className: "ml-auto text-muted-foreground" })
      ]
    }
  );
});
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";
const ContextMenuSubContent = (0, import_react.forwardRef)(function ContextMenuSubContent2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.ContextMenu.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.ContextMenu.SubContent,
    {
      ref,
      className: (0, import_cn.cn)(...menuContentBase, className),
      "data-ds": "",
      "data-ds-component": "context-menu-sub-content",
      ...rest,
      children
    }
  ) });
});
ContextMenuSubContent.displayName = "ContextMenuSubContent";
function ContextMenuShortcut({
  className,
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "span",
    {
      className: (0, import_cn.cn)(
        "ml-auto pl-4 text-xs tracking-widest text-muted-foreground",
        className
      ),
      "data-ds": "",
      "data-ds-component": "context-menu-shortcut",
      children
    }
  );
}
ContextMenuShortcut.displayName = "ContextMenuShortcut";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
});
