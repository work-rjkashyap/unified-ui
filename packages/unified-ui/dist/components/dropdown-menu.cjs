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
var dropdown_menu_exports = {};
__export(dropdown_menu_exports, {
  DropdownMenu: () => DropdownMenu,
  DropdownMenuCheckboxItem: () => DropdownMenuCheckboxItem,
  DropdownMenuContent: () => DropdownMenuContent,
  DropdownMenuGroup: () => DropdownMenuGroup,
  DropdownMenuItem: () => DropdownMenuItem,
  DropdownMenuLabel: () => DropdownMenuLabel,
  DropdownMenuRadioGroup: () => DropdownMenuRadioGroup,
  DropdownMenuRadioItem: () => DropdownMenuRadioItem,
  DropdownMenuSeparator: () => DropdownMenuSeparator,
  DropdownMenuShortcut: () => DropdownMenuShortcut,
  DropdownMenuSub: () => DropdownMenuSub,
  DropdownMenuSubContent: () => DropdownMenuSubContent,
  DropdownMenuSubTrigger: () => DropdownMenuSubTrigger,
  DropdownMenuTrigger: () => DropdownMenuTrigger
});
module.exports = __toCommonJS(dropdown_menu_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_motion = require("../motion/index");
var import_cn = require("../utils/cn");
var import_framer_motion = require("framer-motion");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
function CheckIcon({ className }) {
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
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 6 9 17l-5-5" })
    }
  );
}
function DotIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
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
  "min-w-[8rem]",
  "overflow-hidden",
  "rounded-md",
  "border border-border",
  "bg-background",
  "p-1",
  "shadow-lg",
  "text-foreground"
  // Note: Animation is handled by Framer Motion (scaleIn preset).
  // CSS animation classes removed in favour of FM spring physics.
];
function DropdownMenu({ children, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.DropdownMenu.Root, { ...rest, children });
}
DropdownMenu.displayName = "DropdownMenu";
const DropdownMenuTrigger = (0, import_react.forwardRef)(function DropdownMenuTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.DropdownMenu.Trigger,
    {
      ref,
      className,
      "data-ds": "",
      "data-ds-component": "dropdown-menu-trigger",
      ...rest
    }
  );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";
const DropdownMenuContent = (0, import_react.forwardRef)(function DropdownMenuContent2({ className, children, sideOffset = 4, ...rest }, ref) {
  const shouldReduce = (0, import_framer_motion.useReducedMotion)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.DropdownMenu.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.DropdownMenu.Content,
    {
      ref,
      sideOffset,
      asChild: true,
      ...rest,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_framer_motion.motion.div,
        {
          className: (0, import_cn.cn)(...menuContentBase, className),
          variants: shouldReduce ? void 0 : import_motion.scaleIn.variants,
          initial: shouldReduce ? { opacity: 0 } : "initial",
          animate: shouldReduce ? { opacity: 1 } : "animate",
          exit: shouldReduce ? { opacity: 0 } : "exit",
          transition: shouldReduce ? { duration: 0.15 } : import_motion.scaleIn.transition,
          "data-ds": "",
          "data-ds-component": "dropdown-menu-content",
          "data-ds-animated": "",
          children
        }
      )
    }
  ) });
});
DropdownMenuContent.displayName = "DropdownMenuContent";
const DropdownMenuItem = (0, import_react.forwardRef)(function DropdownMenuItem2({ className, variant = "default", icon, shortcut, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.DropdownMenu.Item,
    {
      ref,
      className: (0, import_cn.cn)(
        ...menuItemBase,
        "gap-2",
        variant === "danger" && "text-danger focus:bg-danger-muted focus:text-danger-muted-foreground",
        variant === "default" && "text-foreground",
        className
      ),
      "data-ds": "",
      "data-ds-component": "dropdown-menu-item",
      ...rest,
      children: [
        icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "shrink-0 [&>svg]:size-4", "aria-hidden": "true", children: icon }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1 flex items-center gap-2 [&>svg]:shrink-0 [&>svg]:size-4", children }),
        shortcut && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuShortcut, { children: shortcut })
      ]
    }
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";
const DropdownMenuCheckboxItem = (0, import_react.forwardRef)(function DropdownMenuCheckboxItem2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.DropdownMenu.CheckboxItem,
    {
      ref,
      className: (0, import_cn.cn)(...menuItemBase, "gap-2 pl-8", className),
      "data-ds": "",
      "data-ds-component": "dropdown-menu-checkbox-item",
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-2 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.DropdownMenu.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1 flex items-center gap-2 [&>svg]:shrink-0 [&>svg]:size-4", children })
      ]
    }
  );
});
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";
const DropdownMenuRadioGroup = (0, import_react.forwardRef)(function DropdownMenuRadioGroup2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.DropdownMenu.RadioGroup, { ref, className, ...rest, children });
});
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";
const DropdownMenuRadioItem = (0, import_react.forwardRef)(function DropdownMenuRadioItem2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.DropdownMenu.RadioItem,
    {
      ref,
      className: (0, import_cn.cn)(...menuItemBase, "gap-2 pl-8", className),
      "data-ds": "",
      "data-ds-component": "dropdown-menu-radio-item",
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-2 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.DropdownMenu.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DotIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1 flex items-center gap-2 [&>svg]:shrink-0 [&>svg]:size-4", children })
      ]
    }
  );
});
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";
const DropdownMenuLabel = (0, import_react.forwardRef)(function DropdownMenuLabel2({ className, inset, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.DropdownMenu.Label,
    {
      ref,
      className: (0, import_cn.cn)(
        "px-2 py-1.5 text-xs font-semibold text-muted-foreground",
        inset && "pl-8",
        className
      ),
      ...rest,
      children
    }
  );
});
DropdownMenuLabel.displayName = "DropdownMenuLabel";
const DropdownMenuSeparator = (0, import_react.forwardRef)(function DropdownMenuSeparator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.DropdownMenu.Separator,
    {
      ref,
      className: (0, import_cn.cn)("-mx-1 my-1 h-px bg-border", className),
      ...rest
    }
  );
});
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
const DropdownMenuGroup = (0, import_react.forwardRef)(function DropdownMenuGroup2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.DropdownMenu.Group, { ref, className, ...rest, children });
});
DropdownMenuGroup.displayName = "DropdownMenuGroup";
function DropdownMenuSub({ children, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.DropdownMenu.Sub, { ...rest, children });
}
DropdownMenuSub.displayName = "DropdownMenuSub";
const DropdownMenuSubTrigger = (0, import_react.forwardRef)(function DropdownMenuSubTrigger2({ className, inset, icon, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.DropdownMenu.SubTrigger,
    {
      ref,
      className: (0, import_cn.cn)(
        ...menuItemBase,
        "gap-2 data-[state=open]:bg-muted",
        inset && "pl-8",
        className
      ),
      "data-ds": "",
      "data-ds-component": "dropdown-menu-sub-trigger",
      ...rest,
      children: [
        icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "shrink-0 [&>svg]:size-4", "aria-hidden": "true", children: icon }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1 flex items-center gap-2 [&>svg]:shrink-0 [&>svg]:size-4", children }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRightIcon, { className: "ml-auto size-4 text-muted-foreground" })
      ]
    }
  );
});
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";
const DropdownMenuSubContent = (0, import_react.forwardRef)(function DropdownMenuSubContent2({ className, children, ...rest }, ref) {
  const shouldReduce = (0, import_framer_motion.useReducedMotion)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.DropdownMenu.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.DropdownMenu.SubContent, { ref, asChild: true, ...rest, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_framer_motion.motion.div,
    {
      className: (0, import_cn.cn)(...menuContentBase, className),
      variants: shouldReduce ? void 0 : import_motion.scaleIn.variants,
      initial: shouldReduce ? { opacity: 0 } : "initial",
      animate: shouldReduce ? { opacity: 1 } : "animate",
      exit: shouldReduce ? { opacity: 0 } : "exit",
      transition: shouldReduce ? { duration: 0.15 } : import_motion.scaleIn.transition,
      "data-ds": "",
      "data-ds-component": "dropdown-menu-sub-content",
      "data-ds-animated": "",
      children
    }
  ) }) });
});
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
function DropdownMenuShortcut({
  className,
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "span",
    {
      className: (0, import_cn.cn)(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      ),
      children
    }
  );
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
});
