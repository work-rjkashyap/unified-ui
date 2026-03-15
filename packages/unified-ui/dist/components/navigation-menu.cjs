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
var navigation_menu_exports = {};
__export(navigation_menu_exports, {
  NavigationMenu: () => NavigationMenu,
  NavigationMenuCardLink: () => NavigationMenuCardLink,
  NavigationMenuContent: () => NavigationMenuContent,
  NavigationMenuIndicator: () => NavigationMenuIndicator,
  NavigationMenuItem: () => NavigationMenuItem,
  NavigationMenuLink: () => NavigationMenuLink,
  NavigationMenuList: () => NavigationMenuList,
  NavigationMenuTrigger: () => NavigationMenuTrigger,
  NavigationMenuViewport: () => NavigationMenuViewport
});
module.exports = __toCommonJS(navigation_menu_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
function ChevronDownIcon({ className }) {
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
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m6 9 6 6 6-6" })
    }
  );
}
const NavigationMenu = (0, import_react.forwardRef)(function NavigationMenu2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.NavigationMenu.Root,
    {
      ref,
      className: (0, import_cn.cn)(
        "relative z-10 flex max-w-max flex-1 items-center justify-center",
        className
      ),
      "data-ds": "",
      "data-ds-component": "navigation-menu",
      ...rest,
      children: [
        children,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavigationMenuViewport, {})
      ]
    }
  );
});
NavigationMenu.displayName = "NavigationMenu";
const NavigationMenuList = (0, import_react.forwardRef)(function NavigationMenuList2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.NavigationMenu.List,
    {
      ref,
      className: (0, import_cn.cn)(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className
      ),
      "data-ds": "",
      "data-ds-component": "navigation-menu-list",
      ...rest
    }
  );
});
NavigationMenuList.displayName = "NavigationMenuList";
const NavigationMenuItem = (0, import_react.forwardRef)(function NavigationMenuItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.NavigationMenu.Item,
    {
      ref,
      className: (0, import_cn.cn)("relative", className),
      "data-ds": "",
      "data-ds-component": "navigation-menu-item",
      ...rest
    }
  );
});
NavigationMenuItem.displayName = "NavigationMenuItem";
const NavigationMenuTrigger = (0, import_react.forwardRef)(function NavigationMenuTrigger2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.NavigationMenu.Trigger,
    {
      ref,
      className: (0, import_cn.cn)(
        "group inline-flex h-9 w-max items-center justify-center",
        "rounded-md px-4 py-2",
        "bg-background",
        "text-sm font-medium",
        "transition-colors duration-fast ease-standard",
        "hover:bg-muted hover:text-foreground",
        "focus:bg-muted focus:text-foreground focus:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[active]:bg-muted/50",
        "data-[state=open]:bg-muted/50",
        className
      ),
      "data-ds": "",
      "data-ds-component": "navigation-menu-trigger",
      ...rest,
      children: [
        children,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ChevronDownIcon,
          {
            className: (0, import_cn.cn)(
              "relative top-px ml-1 shrink-0 text-muted-foreground",
              "transition-transform duration-200 ease-standard",
              "group-data-[state=open]:rotate-180"
            ),
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
});
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";
const NavigationMenuContent = (0, import_react.forwardRef)(function NavigationMenuContent2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.NavigationMenu.Content,
    {
      ref,
      className: (0, import_cn.cn)(
        "left-0 top-0 w-full",
        "md:absolute md:w-auto",
        // Animations
        "data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in",
        "data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out",
        "data-[motion=from-end]:slide-in-from-right-52",
        "data-[motion=from-start]:slide-in-from-left-52",
        "data-[motion=to-end]:slide-out-to-right-52",
        "data-[motion=to-start]:slide-out-to-left-52",
        className
      ),
      "data-ds": "",
      "data-ds-component": "navigation-menu-content",
      ...rest
    }
  );
});
NavigationMenuContent.displayName = "NavigationMenuContent";
const NavigationMenuLink = (0, import_react.forwardRef)(function NavigationMenuLink2({ className, active, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.NavigationMenu.Link,
    {
      ref,
      active,
      className: (0, import_cn.cn)(
        "inline-flex h-9 w-max items-center justify-center",
        "rounded-md px-4 py-2",
        "bg-background",
        "text-sm font-medium",
        "transition-colors duration-fast ease-standard",
        "hover:bg-muted hover:text-foreground",
        "focus:bg-muted focus:text-foreground focus:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[active]:bg-muted/50",
        className
      ),
      "data-ds": "",
      "data-ds-component": "navigation-menu-link",
      ...rest
    }
  );
});
NavigationMenuLink.displayName = "NavigationMenuLink";
const NavigationMenuViewport = (0, import_react.forwardRef)(function NavigationMenuViewport2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: (0, import_cn.cn)("absolute left-0 top-full flex justify-center"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.NavigationMenu.Viewport,
    {
      ref,
      className: (0, import_cn.cn)(
        "origin-top-center",
        "relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)]",
        "w-full overflow-hidden rounded-md border border-border",
        "bg-background shadow-lg",
        "md:w-[var(--radix-navigation-menu-viewport-width)]",
        // Animations
        "data-[state=open]:animate-in data-[state=open]:zoom-in-90",
        "data-[state=closed]:animate-out data-[state=closed]:zoom-out-95",
        className
      ),
      "data-ds": "",
      "data-ds-component": "navigation-menu-viewport",
      ...rest
    }
  ) });
});
NavigationMenuViewport.displayName = "NavigationMenuViewport";
const NavigationMenuIndicator = (0, import_react.forwardRef)(function NavigationMenuIndicator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_radix_ui.NavigationMenu.Indicator,
    {
      ref,
      className: (0, import_cn.cn)(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        "data-[state=visible]:animate-in data-[state=visible]:fade-in",
        "data-[state=hidden]:animate-out data-[state=hidden]:fade-out",
        className
      ),
      "data-ds": "",
      "data-ds-component": "navigation-menu-indicator",
      ...rest,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" })
    }
  );
});
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";
function NavigationMenuCardLink({
  icon,
  title,
  description,
  href,
  active,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_radix_ui.NavigationMenu.Link,
    {
      href,
      active,
      className: (0, import_cn.cn)(
        "group block select-none space-y-1 rounded-md p-3",
        "leading-none no-underline outline-none",
        "transition-colors duration-fast ease-standard",
        "hover:bg-muted focus:bg-muted",
        "data-[active]:bg-muted/50",
        className
      ),
      "data-ds": "",
      "data-ds-component": "navigation-menu-card-link",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2", children: [
          icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex size-5 shrink-0 items-center justify-center text-foreground", children: icon }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-sm font-medium leading-none text-foreground", children: title })
        ] }),
        description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "line-clamp-2 text-xs leading-snug text-muted-foreground", children: description })
      ]
    }
  );
}
NavigationMenuCardLink.displayName = "NavigationMenuCardLink";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NavigationMenu,
  NavigationMenuCardLink,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
});
