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
var menubar_exports = {};
__export(menubar_exports, {
  Menubar: () => Menubar,
  MenubarCheckboxItem: () => MenubarCheckboxItem,
  MenubarContent: () => MenubarContent,
  MenubarGroup: () => MenubarGroup,
  MenubarItem: () => MenubarItem,
  MenubarLabel: () => MenubarLabel,
  MenubarMenu: () => MenubarMenu,
  MenubarRadioGroup: () => MenubarRadioGroup,
  MenubarRadioItem: () => MenubarRadioItem,
  MenubarSeparator: () => MenubarSeparator,
  MenubarShortcut: () => MenubarShortcut,
  MenubarSub: () => MenubarSub,
  MenubarSubContent: () => MenubarSubContent,
  MenubarSubTrigger: () => MenubarSubTrigger,
  MenubarTrigger: () => MenubarTrigger
});
module.exports = __toCommonJS(menubar_exports);
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
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
  "data-[side=top]:slide-in-from-bottom-2",
  "data-[side=bottom]:slide-in-from-top-2",
  "data-[side=left]:slide-in-from-right-2",
  "data-[side=right]:slide-in-from-left-2"
];
const Menubar = (0, import_react.forwardRef)(function Menubar2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Menubar.Root,
    {
      ref,
      className: (0, import_cn.cn)(
        "flex h-9 items-center gap-1",
        "rounded-md border border-border",
        "bg-background px-1",
        "shadow-sm",
        className
      ),
      "data-ds": "",
      "data-ds-component": "menubar",
      ...rest
    }
  );
});
Menubar.displayName = "Menubar";
function MenubarMenu({ children, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Menubar.Menu, { ...rest, children });
}
MenubarMenu.displayName = "MenubarMenu";
const MenubarTrigger = (0, import_react.forwardRef)(function MenubarTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Menubar.Trigger,
    {
      ref,
      className: (0, import_cn.cn)(
        "flex cursor-pointer select-none items-center rounded-sm",
        "px-3 py-1 text-sm font-medium outline-none",
        "transition-colors duration-fast ease-standard",
        "hover:bg-muted hover:text-foreground",
        "focus:bg-muted focus:text-foreground",
        "data-[state=open]:bg-muted data-[state=open]:text-foreground",
        className
      ),
      "data-ds": "",
      "data-ds-component": "menubar-trigger",
      ...rest
    }
  );
});
MenubarTrigger.displayName = "MenubarTrigger";
const MenubarContent = (0, import_react.forwardRef)(function MenubarContent2({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Menubar.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Menubar.Content,
    {
      ref,
      align,
      alignOffset,
      sideOffset,
      className: (0, import_cn.cn)(...menuContentBase, className),
      "data-ds": "",
      "data-ds-component": "menubar-content",
      ...rest,
      children
    }
  ) });
});
MenubarContent.displayName = "MenubarContent";
const MenubarItem = (0, import_react.forwardRef)(function MenubarItem2({ className, variant = "default", icon, inset, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.Menubar.Item,
    {
      ref,
      className: (0, import_cn.cn)(
        ...menuItemBase,
        inset && "pl-8",
        variant === "danger" && "text-destructive focus:bg-destructive/10 focus:text-destructive",
        className
      ),
      "data-ds": "",
      "data-ds-component": "menubar-item",
      "data-ds-variant": variant,
      ...rest,
      children: [
        icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mr-2 flex size-4 shrink-0 items-center justify-center", children: icon }),
        children
      ]
    }
  );
});
MenubarItem.displayName = "MenubarItem";
const MenubarCheckboxItem = (0, import_react.forwardRef)(function MenubarCheckboxItem2({ className, children, checked, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.Menubar.CheckboxItem,
    {
      ref,
      checked,
      className: (0, import_cn.cn)(...menuItemBase, "pl-8", className),
      "data-ds": "",
      "data-ds-component": "menubar-checkbox-item",
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Menubar.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, { className: "text-foreground" }) }) }),
        children
      ]
    }
  );
});
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";
const MenubarRadioGroup = (0, import_react.forwardRef)(function MenubarRadioGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Menubar.RadioGroup,
    {
      ref,
      className: (0, import_cn.cn)(className),
      ...rest
    }
  );
});
MenubarRadioGroup.displayName = "MenubarRadioGroup";
const MenubarRadioItem = (0, import_react.forwardRef)(function MenubarRadioItem2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.Menubar.RadioItem,
    {
      ref,
      className: (0, import_cn.cn)(...menuItemBase, "pl-8", className),
      "data-ds": "",
      "data-ds-component": "menubar-radio-item",
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Menubar.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DotIcon, { className: "text-foreground" }) }) }),
        children
      ]
    }
  );
});
MenubarRadioItem.displayName = "MenubarRadioItem";
const MenubarLabel = (0, import_react.forwardRef)(function MenubarLabel2({ className, inset, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Menubar.Label,
    {
      ref,
      className: (0, import_cn.cn)(
        "px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
        inset && "pl-8",
        className
      ),
      "data-ds": "",
      "data-ds-component": "menubar-label",
      ...rest
    }
  );
});
MenubarLabel.displayName = "MenubarLabel";
const MenubarSeparator = (0, import_react.forwardRef)(function MenubarSeparator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Menubar.Separator,
    {
      ref,
      className: (0, import_cn.cn)("-mx-1 my-1 h-px bg-border", className),
      "data-ds": "",
      "data-ds-component": "menubar-separator",
      ...rest
    }
  );
});
MenubarSeparator.displayName = "MenubarSeparator";
const MenubarGroup = (0, import_react.forwardRef)(function MenubarGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Menubar.Group, { ref, className: (0, import_cn.cn)(className), ...rest });
});
MenubarGroup.displayName = "MenubarGroup";
function MenubarSub({ children, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Menubar.Sub, { ...rest, children });
}
MenubarSub.displayName = "MenubarSub";
const MenubarSubTrigger = (0, import_react.forwardRef)(function MenubarSubTrigger2({ className, inset, icon, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.Menubar.SubTrigger,
    {
      ref,
      className: (0, import_cn.cn)(
        ...menuItemBase,
        "data-[state=open]:bg-muted",
        inset && "pl-8",
        className
      ),
      "data-ds": "",
      "data-ds-component": "menubar-sub-trigger",
      ...rest,
      children: [
        icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mr-2 flex size-4 shrink-0 items-center justify-center", children: icon }),
        children,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRightIcon, { className: "ml-auto text-muted-foreground" })
      ]
    }
  );
});
MenubarSubTrigger.displayName = "MenubarSubTrigger";
const MenubarSubContent = (0, import_react.forwardRef)(function MenubarSubContent2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Menubar.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.Menubar.SubContent,
    {
      ref,
      className: (0, import_cn.cn)(...menuContentBase, className),
      "data-ds": "",
      "data-ds-component": "menubar-sub-content",
      ...rest,
      children
    }
  ) });
});
MenubarSubContent.displayName = "MenubarSubContent";
function MenubarShortcut({ className, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "span",
    {
      className: (0, import_cn.cn)(
        "ml-auto pl-4 text-xs tracking-widest text-muted-foreground",
        className
      ),
      "data-ds": "",
      "data-ds-component": "menubar-shortcut",
      children
    }
  );
}
MenubarShortcut.displayName = "MenubarShortcut";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
});
