"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { ContextMenu as ContextMenuPrimitive } from "radix-ui";
import {
  forwardRef
} from "react";
function CheckIcon({ className }) {
  return /* @__PURE__ */ jsx(
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
      children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" })
    }
  );
}
function DotIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "4" })
    }
  );
}
function ChevronRightIcon({ className }) {
  return /* @__PURE__ */ jsx(
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
      children: /* @__PURE__ */ jsx("path", { d: "m9 18 6-6-6-6" })
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
  return /* @__PURE__ */ jsx(ContextMenuPrimitive.Root, { ...rest, children });
}
ContextMenu.displayName = "ContextMenu";
const ContextMenuTrigger = forwardRef(function ContextMenuTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    ContextMenuPrimitive.Trigger,
    {
      ref,
      className: cn(className),
      "data-ds": "",
      "data-ds-component": "context-menu-trigger",
      ...rest
    }
  );
});
ContextMenuTrigger.displayName = "ContextMenuTrigger";
const ContextMenuContent = forwardRef(function ContextMenuContent2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(ContextMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    ContextMenuPrimitive.Content,
    {
      ref,
      className: cn(...menuContentBase, className),
      "data-ds": "",
      "data-ds-component": "context-menu-content",
      ...rest,
      children
    }
  ) });
});
ContextMenuContent.displayName = "ContextMenuContent";
const ContextMenuItem = forwardRef(function ContextMenuItem2({ className, variant = "default", icon, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxs(
    ContextMenuPrimitive.Item,
    {
      ref,
      className: cn(
        ...menuItemBase,
        variant === "danger" && "text-destructive focus:bg-destructive/10 focus:text-destructive",
        className
      ),
      "data-ds": "",
      "data-ds-component": "context-menu-item",
      "data-ds-variant": variant,
      ...rest,
      children: [
        icon && /* @__PURE__ */ jsx("span", { className: "mr-2 flex size-4 shrink-0 items-center justify-center", children: icon }),
        children
      ]
    }
  );
});
ContextMenuItem.displayName = "ContextMenuItem";
const ContextMenuCheckboxItem = forwardRef(function ContextMenuCheckboxItem2({ className, children, checked, ...rest }, ref) {
  return /* @__PURE__ */ jsxs(
    ContextMenuPrimitive.CheckboxItem,
    {
      ref,
      checked,
      className: cn(...menuItemBase, "pl-8", className),
      "data-ds": "",
      "data-ds-component": "context-menu-checkbox-item",
      ...rest,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ jsx(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "text-foreground" }) }) }),
        children
      ]
    }
  );
});
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";
const ContextMenuRadioGroup = forwardRef(function ContextMenuRadioGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    ContextMenuPrimitive.RadioGroup,
    {
      ref,
      className: cn(className),
      ...rest
    }
  );
});
ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup";
const ContextMenuRadioItem = forwardRef(function ContextMenuRadioItem2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxs(
    ContextMenuPrimitive.RadioItem,
    {
      ref,
      className: cn(...menuItemBase, "pl-8", className),
      "data-ds": "",
      "data-ds-component": "context-menu-radio-item",
      ...rest,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ jsx(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(DotIcon, { className: "text-foreground" }) }) }),
        children
      ]
    }
  );
});
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";
const ContextMenuLabel = forwardRef(function ContextMenuLabel2({ className, inset, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    ContextMenuPrimitive.Label,
    {
      ref,
      className: cn(
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
const ContextMenuSeparator = forwardRef(function ContextMenuSeparator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    ContextMenuPrimitive.Separator,
    {
      ref,
      className: cn("-mx-1 my-1 h-px bg-border", className),
      "data-ds": "",
      "data-ds-component": "context-menu-separator",
      ...rest
    }
  );
});
ContextMenuSeparator.displayName = "ContextMenuSeparator";
const ContextMenuGroup = forwardRef(function ContextMenuGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(ContextMenuPrimitive.Group, { ref, className: cn(className), ...rest });
});
ContextMenuGroup.displayName = "ContextMenuGroup";
function ContextMenuSub({ children, ...rest }) {
  return /* @__PURE__ */ jsx(ContextMenuPrimitive.Sub, { ...rest, children });
}
ContextMenuSub.displayName = "ContextMenuSub";
const ContextMenuSubTrigger = forwardRef(function ContextMenuSubTrigger2({ className, inset, icon, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxs(
    ContextMenuPrimitive.SubTrigger,
    {
      ref,
      className: cn(
        ...menuItemBase,
        "data-[state=open]:bg-muted",
        inset && "pl-8",
        className
      ),
      "data-ds": "",
      "data-ds-component": "context-menu-sub-trigger",
      ...rest,
      children: [
        icon && /* @__PURE__ */ jsx("span", { className: "mr-2 flex size-4 shrink-0 items-center justify-center", children: icon }),
        children,
        /* @__PURE__ */ jsx(ChevronRightIcon, { className: "ml-auto text-muted-foreground" })
      ]
    }
  );
});
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";
const ContextMenuSubContent = forwardRef(function ContextMenuSubContent2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(ContextMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    ContextMenuPrimitive.SubContent,
    {
      ref,
      className: cn(...menuContentBase, className),
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
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
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
export {
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
};
