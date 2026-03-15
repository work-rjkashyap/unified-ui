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
var sidebar_exports = {};
__export(sidebar_exports, {
  Sidebar: () => Sidebar,
  SidebarContent: () => SidebarContent,
  SidebarFooter: () => SidebarFooter,
  SidebarGroup: () => SidebarGroup,
  SidebarGroupAction: () => SidebarGroupAction,
  SidebarGroupContent: () => SidebarGroupContent,
  SidebarGroupLabel: () => SidebarGroupLabel,
  SidebarHeader: () => SidebarHeader,
  SidebarInput: () => SidebarInput,
  SidebarInset: () => SidebarInset,
  SidebarItem: () => SidebarItem,
  SidebarMenu: () => SidebarMenu,
  SidebarMenuAction: () => SidebarMenuAction,
  SidebarMenuBadge: () => SidebarMenuBadge,
  SidebarMenuButton: () => SidebarMenuButton,
  SidebarMenuItem: () => SidebarMenuItem,
  SidebarMenuSkeleton: () => SidebarMenuSkeleton,
  SidebarMenuSub: () => SidebarMenuSub,
  SidebarMenuSubButton: () => SidebarMenuSubButton,
  SidebarMenuSubItem: () => SidebarMenuSubItem,
  SidebarMobileOverlay: () => SidebarMobileOverlay,
  SidebarProvider: () => SidebarProvider,
  SidebarRail: () => SidebarRail,
  SidebarSection: () => SidebarSection,
  SidebarSeparator: () => SidebarSeparator,
  SidebarToggle: () => SidebarToggle,
  SidebarTrigger: () => SidebarTrigger,
  useSidebar: () => useSidebar,
  useSidebarContext: () => useSidebarContext
});
module.exports = __toCommonJS(sidebar_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_motion = require("../motion/index");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_framer_motion = require("framer-motion");
var import_radix_ui = require("radix-ui");
var import_react = require("react");
const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
function PanelLeftIcon({ className }) {
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 3v18" })
      ]
    }
  );
}
function _ChevronRightIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 18 6-6-6-6" })
    }
  );
}
const SidebarContext = (0, import_react.createContext)({
  state: "expanded",
  open: true,
  setOpen: () => {
  },
  openMobile: false,
  setOpenMobile: () => {
  },
  isMobile: false,
  toggleSidebar: () => {
  },
  variant: "default",
  collapsible: "offcanvas",
  side: "left"
});
function useSidebar() {
  const context = (0, import_react.useContext)(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a <SidebarProvider>");
  }
  return context;
}
const useSidebarContext = useSidebar;
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}
const SidebarProvider = (0, import_react.forwardRef)(
  function SidebarProvider2({
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    variant = "default",
    collapsible = "offcanvas",
    side = "left",
    className,
    style,
    children,
    ...rest
  }, ref) {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = (0, import_react.useState)(false);
    const isControlled = openProp !== void 0;
    const [_open, _setOpen] = (0, import_react.useState)(defaultOpen);
    const open = isControlled ? openProp : _open;
    const setOpen = (0, import_react.useCallback)(
      (value) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }
        try {
          document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
        } catch {
        }
      },
      [setOpenProp, open]
    );
    const toggleSidebar = (0, import_react.useCallback)(() => {
      if (isMobile) {
        setOpenMobile((prev) => !prev);
      } else {
        setOpen((prev) => !prev);
      }
    }, [isMobile, setOpen]);
    (0, import_react.useEffect)(() => {
      const handleKeyDown = (e) => {
        if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          toggleSidebar();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);
    const state = open ? "expanded" : "collapsed";
    const contextValue = (0, import_react.useMemo)(
      () => ({
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
        variant,
        collapsible,
        side
      }),
      [
        state,
        open,
        setOpen,
        openMobile,
        isMobile,
        toggleSidebar,
        variant,
        collapsible,
        side
      ]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Tooltip.Provider, { delayDuration: 0, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref,
        className: (0, import_cn.cn)(
          "group/sidebar-wrapper flex min-h-svh w-full",
          "has-data-[variant=inset]:bg-sidebar",
          className
        ),
        style: {
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...style
        },
        "data-ds": "",
        "data-ds-component": "sidebar-provider",
        ...rest,
        children
      }
    ) }) });
  }
);
SidebarProvider.displayName = "SidebarProvider";
const Sidebar = (0, import_react.forwardRef)(
  function Sidebar2({
    side: sideProp,
    variant: variantProp,
    collapsible: collapsibleProp,
    className,
    children,
    ...rest
  }, ref) {
    const ctx = useSidebar();
    const side = sideProp ?? ctx.side;
    const variant = variantProp ?? ctx.variant;
    const collapsible = collapsibleProp ?? ctx.collapsible;
    const shouldReduce = (0, import_framer_motion.useReducedMotion)();
    if (collapsible === "none") {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          ref,
          className: (0, import_cn.cn)(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className
          ),
          "data-ds": "",
          "data-ds-component": "sidebar",
          ...rest,
          children
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      ctx.isMobile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { children: ctx.openMobile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_framer_motion.motion.div,
          {
            className: "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
            variants: shouldReduce ? void 0 : import_motion.overlayBackdrop.variants,
            initial: shouldReduce ? { opacity: 0 } : "initial",
            animate: shouldReduce ? { opacity: 1 } : "animate",
            exit: shouldReduce ? { opacity: 0 } : "exit",
            transition: shouldReduce ? { duration: 0.15 } : import_motion.overlayBackdrop.transition,
            onClick: () => ctx.setOpenMobile(false),
            "data-ds-animated": ""
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_framer_motion.motion.div,
          {
            className: (0, import_cn.cn)(
              "fixed inset-y-0 z-50 flex w-[--sidebar-width-mobile] flex-col bg-sidebar text-sidebar-foreground",
              "p-0 shadow-lg",
              side === "left" ? "left-0 border-r border-sidebar-border" : "right-0 border-l border-sidebar-border",
              className
            ),
            style: {
              "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE
            },
            initial: {
              x: side === "left" ? "-100%" : "100%",
              opacity: shouldReduce ? 0 : 1
            },
            animate: {
              x: 0,
              opacity: 1
            },
            exit: {
              x: side === "left" ? "-100%" : "100%",
              opacity: shouldReduce ? 0 : 1
            },
            transition: shouldReduce ? { duration: 0.15 } : {
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8
            },
            "data-ds": "",
            "data-ds-component": "sidebar",
            "data-variant": variant,
            "data-side": side,
            "data-mobile": "",
            "data-ds-animated": "",
            children
          }
        )
      ] }) }),
      !ctx.isMobile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          ref,
          className: "group peer hidden md:block text-sidebar-foreground",
          "data-state": ctx.state,
          "data-collapsible": ctx.state === "collapsed" ? collapsible : "",
          "data-variant": variant,
          "data-side": side,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_framer_motion.motion.div,
              {
                className: (0, import_cn.cn)(
                  "relative h-svh bg-transparent",
                  "duration-200 ease-linear",
                  variant === "floating" || variant === "inset" ? "w-[calc(var(--sidebar-width)+(--spacing(4)))]" : "w-[--sidebar-width]"
                ),
                animate: {
                  width: ctx.state === "collapsed" ? collapsible === "offcanvas" ? "0px" : variant === "floating" || variant === "inset" ? "calc(var(--sidebar-width-icon) + theme(spacing.4) + 2px)" : "var(--sidebar-width-icon)" : variant === "floating" || variant === "inset" ? "calc(var(--sidebar-width) + theme(spacing.4))" : "var(--sidebar-width)"
                },
                transition: shouldReduce ? { duration: 0 } : { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_framer_motion.motion.div,
              {
                className: (0, import_cn.cn)(
                  "fixed inset-y-0 z-10 hidden h-svh md:flex flex-col",
                  side === "left" ? "left-0" : "right-0",
                  // Variant styles
                  variant === "floating" && "m-2 rounded-lg border border-sidebar-border shadow-lg overflow-hidden",
                  variant === "inset" && "m-2 rounded-lg overflow-hidden",
                  variant === "default" && (0, import_cn.cn)(
                    "border-sidebar-border",
                    side === "left" ? "border-r" : "border-l"
                  ),
                  "bg-sidebar text-sidebar-foreground",
                  className
                ),
                animate: {
                  width: ctx.state === "collapsed" ? collapsible === "offcanvas" ? "0px" : "var(--sidebar-width-icon)" : "var(--sidebar-width)"
                },
                transition: shouldReduce ? { duration: 0 } : { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
                "data-ds": "",
                "data-ds-component": "sidebar",
                "data-variant": variant,
                "data-side": side,
                "data-state": ctx.state,
                "data-collapsible": ctx.state === "collapsed" ? collapsible : "",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "div",
                  {
                    className: (0, import_cn.cn)(
                      "flex h-full w-full flex-col",
                      "group-data-[collapsible=offcanvas]:opacity-0 group-data-[collapsible=offcanvas]:pointer-events-none"
                    ),
                    "data-sidebar": "content-wrapper",
                    children
                  }
                )
              }
            )
          ]
        }
      )
    ] });
  }
);
Sidebar.displayName = "Sidebar";
const SidebarTrigger = (0, import_react.forwardRef)(function SidebarTrigger2({ className, onClick, children, ...rest }, ref) {
  const { toggleSidebar, state, isMobile: _isMobile } = useSidebar();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "button",
    {
      ref,
      type: "button",
      onClick: (e) => {
        onClick?.(e);
        toggleSidebar();
      },
      "aria-label": state === "expanded" ? "Collapse sidebar" : "Expand sidebar",
      "aria-expanded": state === "expanded",
      className: (0, import_cn.cn)(
        "inline-flex items-center justify-center size-8 shrink-0 rounded-md",
        "text-muted-foreground hover:text-foreground hover:bg-accent",
        "transition-colors duration-fast",
        import_focus_ring.focusRingClasses,
        className
      ),
      "data-ds": "",
      "data-ds-component": "sidebar-trigger",
      ...rest,
      children: [
        children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftIcon, { className: "size-4" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
SidebarTrigger.displayName = "SidebarTrigger";
const SidebarToggle = SidebarTrigger;
const SidebarRail = (0, import_react.forwardRef)(
  function SidebarRail2({ className, ...rest }, ref) {
    const { toggleSidebar, side } = useSidebar();
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        ref,
        type: "button",
        tabIndex: -1,
        "aria-label": "Toggle Sidebar",
        onClick: toggleSidebar,
        title: "Toggle Sidebar",
        className: (0, import_cn.cn)(
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 md:flex items-center justify-center",
          "after:absolute after:inset-y-0 after:left-1/2 after:w-0.5",
          "hover:after:bg-sidebar-border",
          "transition-all duration-fast ease-linear",
          "group-data-[side=left]:right-0 group-data-[side=right]:left-0",
          side === "left" ? "cursor-w-resize group-data-[state=collapsed]:cursor-e-resize" : "cursor-e-resize group-data-[state=collapsed]:cursor-w-resize",
          "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize",
          "[[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
          className
        ),
        "data-ds": "",
        "data-ds-component": "sidebar-rail",
        ...rest
      }
    );
  }
);
SidebarRail.displayName = "SidebarRail";
const SidebarInset = (0, import_react.forwardRef)(
  function SidebarInset2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "main",
      {
        ref,
        className: (0, import_cn.cn)(
          "relative flex min-h-svh flex-1 flex-col bg-background",
          "peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))]",
          "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0",
          "md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm",
          className
        ),
        "data-ds": "",
        "data-ds-component": "sidebar-inset",
        ...rest,
        children
      }
    );
  }
);
SidebarInset.displayName = "SidebarInset";
const SidebarHeader = (0, import_react.forwardRef)(
  function SidebarHeader2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref,
        className: (0, import_cn.cn)(
          "flex flex-col gap-2 p-2",
          "group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-1.5",
          className
        ),
        "data-ds": "",
        "data-ds-component": "sidebar-header",
        "data-sidebar": "header",
        ...rest,
        children
      }
    );
  }
);
SidebarHeader.displayName = "SidebarHeader";
const SidebarContent = (0, import_react.forwardRef)(
  function SidebarContent2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref,
        className: (0, import_cn.cn)(
          "flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden",
          "group-data-[collapsible=icon]:items-center",
          className
        ),
        "data-ds": "",
        "data-ds-component": "sidebar-content",
        "data-sidebar": "content",
        ...rest,
        children
      }
    );
  }
);
SidebarContent.displayName = "SidebarContent";
const SidebarFooter = (0, import_react.forwardRef)(
  function SidebarFooter2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref,
        className: (0, import_cn.cn)(
          "flex flex-col gap-2 p-2",
          "group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-1.5",
          className
        ),
        "data-ds": "",
        "data-ds-component": "sidebar-footer",
        "data-sidebar": "footer",
        ...rest,
        children
      }
    );
  }
);
SidebarFooter.displayName = "SidebarFooter";
const SidebarSeparator = (0, import_react.forwardRef)(function SidebarSeparator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "hr",
    {
      ref,
      className: (0, import_cn.cn)("mx-2 w-auto border-sidebar-border", className),
      "data-ds": "",
      "data-ds-component": "sidebar-separator",
      "data-sidebar": "separator",
      ...rest
    }
  );
});
SidebarSeparator.displayName = "SidebarSeparator";
const SidebarInput = (0, import_react.forwardRef)(
  function SidebarInput2({ className, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "input",
      {
        ref,
        className: (0, import_cn.cn)(
          "h-8 w-full rounded-md border border-sidebar-border bg-background px-3",
          "text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/50",
          "transition-[border-color,box-shadow] duration-fast",
          "focus:border-sidebar-ring focus:outline-none focus:ring-2 focus:ring-sidebar-ring/20",
          className
        ),
        "data-ds": "",
        "data-ds-component": "sidebar-input",
        "data-sidebar": "input",
        ...rest
      }
    );
  }
);
SidebarInput.displayName = "SidebarInput";
const SidebarGroup = (0, import_react.forwardRef)(
  function SidebarGroup2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref,
        className: (0, import_cn.cn)(
          "relative flex w-full min-w-0 flex-col p-2",
          "group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-1.5",
          className
        ),
        "data-ds": "",
        "data-ds-component": "sidebar-group",
        "data-sidebar": "group",
        ...rest,
        children
      }
    );
  }
);
SidebarGroup.displayName = "SidebarGroup";
const SidebarGroupLabel = (0, import_react.forwardRef)(function SidebarGroupLabel2({ className, asChild = false, children, ...rest }, ref) {
  const { state } = useSidebar();
  const classes = (0, import_cn.cn)(
    "flex h-8 shrink-0 items-center rounded-md px-2",
    "text-xs font-medium text-sidebar-foreground/70",
    "outline-none ring-sidebar-ring",
    "transition-[margin,opacity,padding] duration-200 ease-linear",
    // When collapsed to icon mode, hide label
    state === "collapsed" && "opacity-0 overflow-hidden h-0 p-0 m-0",
    className
  );
  if (asChild) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref,
        className: classes,
        "data-ds": "",
        "data-ds-component": "sidebar-group-label",
        "data-sidebar": "group-label",
        ...rest,
        children
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ref,
      className: classes,
      "data-ds": "",
      "data-ds-component": "sidebar-group-label",
      "data-sidebar": "group-label",
      ...rest,
      children
    }
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";
const SidebarGroupAction = (0, import_react.forwardRef)(function SidebarGroupAction2({ className, children, ...rest }, ref) {
  const { state } = useSidebar();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      ref,
      type: "button",
      className: (0, import_cn.cn)(
        "absolute right-3 top-3.5 flex items-center justify-center",
        "size-5 rounded-md p-0",
        "text-sidebar-foreground/70 ring-sidebar-ring",
        "outline-none",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        "transition-transform duration-200",
        import_focus_ring.focusRingClasses,
        "[&>svg]:size-4 [&>svg]:shrink-0",
        // When icon-collapsed, hide
        state === "collapsed" && "hidden",
        className
      ),
      "data-ds": "",
      "data-ds-component": "sidebar-group-action",
      "data-sidebar": "group-action",
      ...rest,
      children
    }
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";
const SidebarGroupContent = (0, import_react.forwardRef)(function SidebarGroupContent2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ref,
      className: (0, import_cn.cn)("w-full text-sm", className),
      "data-ds": "",
      "data-ds-component": "sidebar-group-content",
      "data-sidebar": "group-content",
      ...rest,
      children
    }
  );
});
SidebarGroupContent.displayName = "SidebarGroupContent";
const SidebarMenu = (0, import_react.forwardRef)(
  function SidebarMenu2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "ul",
      {
        ref,
        className: (0, import_cn.cn)(
          "flex w-full min-w-0 flex-col gap-1 list-none m-0 p-0",
          "group-data-[collapsible=icon]:items-center",
          className
        ),
        "data-ds": "",
        "data-ds-component": "sidebar-menu",
        "data-sidebar": "menu",
        ...rest,
        children
      }
    );
  }
);
SidebarMenu.displayName = "SidebarMenu";
const SidebarMenuItem = (0, import_react.forwardRef)(
  function SidebarMenuItem2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "li",
      {
        ref,
        className: (0, import_cn.cn)("group/menu-item relative list-none m-0 p-0", className),
        "data-ds": "",
        "data-ds-component": "sidebar-menu-item",
        "data-sidebar": "menu-item",
        ...rest,
        children
      }
    );
  }
);
SidebarMenuItem.displayName = "SidebarMenuItem";
const SidebarMenuButton = (0, import_react.forwardRef)(function SidebarMenuButton2({
  isActive = false,
  size = "default",
  variant = "default",
  tooltip,
  asChild = false,
  className,
  children,
  ...rest
}, ref) {
  const { state, isMobile, collapsible } = useSidebar();
  const isCollapsed = state === "collapsed" && collapsible === "icon";
  const lgExpandedLayout = !isCollapsed ? [
    "[&>*:nth-child(2)]:flex-1 [&>*:nth-child(2)]:min-w-0",
    "[&>*:nth-child(2)]:grid [&>*:nth-child(2)]:text-left [&>*:nth-child(2)]:text-sm [&>*:nth-child(2)]:leading-tight",
    "[&>*:nth-child(2)_span]:truncate",
    "[&>svg:last-child]:ml-auto [&>svg:last-child]:shrink-0"
  ].join(" ") : "";
  const sizeClasses = {
    sm: "h-7 text-xs",
    default: "h-8 text-sm",
    lg: [
      "h-12 text-sm",
      lgExpandedLayout,
      // lg collapsed: shrink height to match default buttons and scale
      // the first-child wrapper (logo div, Avatar) to 24px so it fits
      // neatly inside the 32px collapsed button.
      "group-data-[collapsible=icon]:!h-8",
      "group-data-[collapsible=icon]:[&>:first-child]:!size-6",
      "group-data-[collapsible=icon]:[&>:first-child]:shrink-0",
      "group-data-[collapsible=icon]:[&>:first-child]:overflow-hidden",
      "group-data-[collapsible=icon]:[&>:first-child]:rounded-md"
    ].join(" ")
  };
  const buttonClasses = (0, import_cn.cn)(
    // Base
    "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2",
    "outline-none ring-sidebar-ring",
    "transition-[width,height,padding] duration-200 ease-linear",
    import_focus_ring.focusRingClasses,
    // Active & hover states
    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
    "active:bg-sidebar-accent active:text-sidebar-accent-foreground",
    // Size
    sizeClasses[size],
    // Variant
    variant === "outline" && "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:shadow-[0_0_0_1px_var(--sidebar-accent)]",
    // Active
    isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
    // Icon collapse — fixed 32px button, no padding, center the icon,
    // hide everything except the first child (icon/avatar).
    // Plain <svg> icons stay at size-4 (16px); lg wrapper divs are
    // handled separately by the lg sizeClass above.
    isCollapsed && "!size-8 !p-0 !gap-0 justify-center [&>*:not(:first-child)]:hidden [&>svg]:size-4",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50",
    // Icon sizing
    "[&>svg]:size-4 [&>svg]:shrink-0",
    className
  );
  const button = asChild ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "span",
    {
      ref,
      className: buttonClasses,
      "data-ds": "",
      "data-ds-component": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive ? "" : void 0,
      children
    }
  ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      ref,
      type: "button",
      className: buttonClasses,
      "aria-current": isActive ? "page" : void 0,
      "data-ds": "",
      "data-ds-component": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive ? "" : void 0,
      ...rest,
      children
    }
  );
  if (!tooltip || isMobile) {
    return button;
  }
  if (!isCollapsed) {
    return button;
  }
  const tooltipContent = typeof tooltip === "string" ? tooltip : tooltip;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_radix_ui.Tooltip.Root, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Tooltip.Trigger, { asChild: true, children: button }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radix_ui.Tooltip.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_radix_ui.Tooltip.Content,
      {
        side: "right",
        align: "center",
        sideOffset: 4,
        className: (0, import_cn.cn)(
          "z-(--z-tooltip,9999)",
          "overflow-hidden rounded-md px-3 py-1.5",
          "bg-sidebar-primary text-sidebar-primary-foreground",
          "text-xs font-medium",
          "animate-in fade-in-0 zoom-in-95",
          "data-[side=right]:slide-in-from-left-2"
        ),
        children: tooltipContent
      }
    ) })
  ] });
});
SidebarMenuButton.displayName = "SidebarMenuButton";
const SidebarMenuAction = (0, import_react.forwardRef)(function SidebarMenuAction2({ showOnHover = false, className, children, ...rest }, ref) {
  const { state } = useSidebar();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      ref,
      type: "button",
      className: (0, import_cn.cn)(
        "absolute right-1 top-1.5 flex items-center justify-center",
        "size-5 rounded-md p-0",
        "text-sidebar-foreground/70 outline-none ring-sidebar-ring",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        "transition-opacity duration-fast",
        import_focus_ring.focusRingClasses,
        "[&>svg]:size-4 [&>svg]:shrink-0",
        // Show on hover only
        showOnHover && "opacity-0 group-hover/menu-item:opacity-100 group-focus-within/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground",
        // Hide when collapsed to icon mode
        state === "collapsed" && "hidden",
        className
      ),
      "data-ds": "",
      "data-ds-component": "sidebar-menu-action",
      "data-sidebar": "menu-action",
      ...rest,
      children
    }
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";
const SidebarMenuBadge = (0, import_react.forwardRef)(function SidebarMenuBadge2({ className, children, ...rest }, ref) {
  const { state } = useSidebar();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ref,
      className: (0, import_cn.cn)(
        "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1",
        "text-xs font-medium tabular-nums text-sidebar-foreground",
        "select-none pointer-events-none",
        // Hide when collapsed
        state === "collapsed" && "hidden",
        className
      ),
      "data-ds": "",
      "data-ds-component": "sidebar-menu-badge",
      "data-sidebar": "menu-badge",
      ...rest,
      children
    }
  );
});
SidebarMenuBadge.displayName = "SidebarMenuBadge";
const SidebarMenuSkeleton = (0, import_react.forwardRef)(function SidebarMenuSkeleton2({ className, showIcon = false, ...rest }, ref) {
  const width = (0, import_react.useMemo)(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      ref,
      className: (0, import_cn.cn)("flex h-8 items-center gap-2 rounded-md px-2", className),
      "data-ds": "",
      "data-ds-component": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      ...rest,
      children: [
        showIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-4 rounded-md bg-sidebar-accent animate-pulse" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: "h-4 max-w-[--skeleton-width] flex-1 rounded-md bg-sidebar-accent animate-pulse",
            style: { "--skeleton-width": width }
          }
        )
      ]
    }
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
const SidebarMenuSub = (0, import_react.forwardRef)(
  function SidebarMenuSub2({ className, children, ...rest }, ref) {
    const { state } = useSidebar();
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "ul",
      {
        ref,
        className: (0, import_cn.cn)(
          "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 list-none m-0 p-0",
          "border-l border-sidebar-border pl-2.5 py-0.5",
          // Hide when collapsed to icon
          state === "collapsed" && "hidden",
          className
        ),
        "data-ds": "",
        "data-ds-component": "sidebar-menu-sub",
        "data-sidebar": "menu-sub",
        ...rest,
        children
      }
    );
  }
);
SidebarMenuSub.displayName = "SidebarMenuSub";
const SidebarMenuSubItem = (0, import_react.forwardRef)(function SidebarMenuSubItem2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "li",
    {
      ref,
      className: (0, import_cn.cn)("list-none m-0 p-0", className),
      "data-ds": "",
      "data-ds-component": "sidebar-menu-sub-item",
      "data-sidebar": "menu-sub-item",
      ...rest,
      children
    }
  );
});
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
const SidebarMenuSubButton = (0, import_react.forwardRef)(function SidebarMenuSubButton2({ isActive = false, size = "md", className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "a",
    {
      ref,
      className: (0, import_cn.cn)(
        "flex min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 no-underline",
        "text-sidebar-foreground/70 outline-none ring-sidebar-ring",
        "transition-colors duration-fast",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:no-underline",
        import_focus_ring.focusRingClasses,
        size === "sm" ? "h-6 text-xs" : "h-7 text-xs",
        isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        className
      ),
      "aria-current": isActive ? "page" : void 0,
      "data-ds": "",
      "data-ds-component": "sidebar-menu-sub-button",
      "data-sidebar": "menu-sub-button",
      "data-active": isActive ? "" : void 0,
      ...rest,
      children
    }
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
const SidebarSection = SidebarGroup;
const SidebarItem = (0, import_react.forwardRef)(
  function SidebarItem2({
    icon,
    label,
    active = false,
    disabled = false,
    badge,
    href,
    className,
    children,
    ...rest
  }, ref) {
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";
    const Tag = href ? "a" : "button";
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      Tag,
      {
        ref,
        href,
        type: href ? void 0 : "button",
        disabled,
        "aria-current": active ? "page" : void 0,
        className: (0, import_cn.cn)(
          "flex items-center gap-3 px-2 py-2 rounded-md w-full",
          "text-sm font-medium leading-none",
          "transition-colors duration-fast",
          "disabled:pointer-events-none disabled:opacity-50",
          import_focus_ring.focusRingClasses,
          active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/60",
          isCollapsed && "justify-center",
          className
        ),
        title: isCollapsed && typeof label === "string" ? label : void 0,
        "data-ds": "",
        "data-ds-component": "sidebar-item",
        "data-ds-active": active ? "" : void 0,
        ...rest,
        children: [
          icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "shrink-0 size-5 flex items-center justify-center", children: icon }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { children: !isCollapsed && (label || children) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_framer_motion.motion.span,
            {
              className: "flex-1 truncate",
              initial: { opacity: 0, width: 0 },
              animate: { opacity: 1, width: "auto" },
              exit: { opacity: 0, width: 0 },
              transition: { duration: 0.15 },
              "data-ds-animated": "",
              children: label ?? children
            }
          ) }),
          badge && !isCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "shrink-0", children: badge })
        ]
      }
    );
  }
);
SidebarItem.displayName = "SidebarItem";
function SidebarMobileOverlay(_props) {
  return null;
}
SidebarMobileOverlay.displayName = "SidebarMobileOverlay";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarItem,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMobileOverlay,
  SidebarProvider,
  SidebarRail,
  SidebarSection,
  SidebarSeparator,
  SidebarToggle,
  SidebarTrigger,
  useSidebar,
  useSidebarContext
});
