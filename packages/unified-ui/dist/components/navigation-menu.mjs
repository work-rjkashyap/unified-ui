"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";
import {
  forwardRef
} from "react";
function ChevronDownIcon({ className }) {
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
      children: /* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6" })
    }
  );
}
const NavigationMenu = forwardRef(function NavigationMenu2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxs(
    NavigationMenuPrimitive.Root,
    {
      ref,
      className: cn(
        "relative z-10 flex max-w-max flex-1 items-center justify-center",
        className
      ),
      "data-ds": "",
      "data-ds-component": "navigation-menu",
      ...rest,
      children: [
        children,
        /* @__PURE__ */ jsx(NavigationMenuViewport, {})
      ]
    }
  );
});
NavigationMenu.displayName = "NavigationMenu";
const NavigationMenuList = forwardRef(function NavigationMenuList2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.List,
    {
      ref,
      className: cn(
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
const NavigationMenuItem = forwardRef(function NavigationMenuItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Item,
    {
      ref,
      className: cn("relative", className),
      "data-ds": "",
      "data-ds-component": "navigation-menu-item",
      ...rest
    }
  );
});
NavigationMenuItem.displayName = "NavigationMenuItem";
const NavigationMenuTrigger = forwardRef(function NavigationMenuTrigger2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxs(
    NavigationMenuPrimitive.Trigger,
    {
      ref,
      className: cn(
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
        /* @__PURE__ */ jsx(
          ChevronDownIcon,
          {
            className: cn(
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
const NavigationMenuContent = forwardRef(function NavigationMenuContent2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Content,
    {
      ref,
      className: cn(
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
const NavigationMenuLink = forwardRef(function NavigationMenuLink2({ className, active, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Link,
    {
      ref,
      active,
      className: cn(
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
const NavigationMenuViewport = forwardRef(function NavigationMenuViewport2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx("div", { className: cn("absolute left-0 top-full flex justify-center"), children: /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Viewport,
    {
      ref,
      className: cn(
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
const NavigationMenuIndicator = forwardRef(function NavigationMenuIndicator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Indicator,
    {
      ref,
      className: cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        "data-[state=visible]:animate-in data-[state=visible]:fade-in",
        "data-[state=hidden]:animate-out data-[state=hidden]:fade-out",
        className
      ),
      "data-ds": "",
      "data-ds-component": "navigation-menu-indicator",
      ...rest,
      children: /* @__PURE__ */ jsx("div", { className: "relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" })
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
  return /* @__PURE__ */ jsxs(
    NavigationMenuPrimitive.Link,
    {
      href,
      active,
      className: cn(
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
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          icon && /* @__PURE__ */ jsx("span", { className: "flex size-5 shrink-0 items-center justify-center text-foreground", children: icon }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium leading-none text-foreground", children: title })
        ] }),
        description && /* @__PURE__ */ jsx("p", { className: "line-clamp-2 text-xs leading-snug text-muted-foreground", children: description })
      ]
    }
  );
}
NavigationMenuCardLink.displayName = "NavigationMenuCardLink";
export {
  NavigationMenu,
  NavigationMenuCardLink,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
};
