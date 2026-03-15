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
var drawer_exports = {};
__export(drawer_exports, {
  Drawer: () => Drawer,
  DrawerBody: () => DrawerBody,
  DrawerClose: () => DrawerClose,
  DrawerContent: () => DrawerContent,
  DrawerDescription: () => DrawerDescription,
  DrawerFooter: () => DrawerFooter,
  DrawerHandle: () => DrawerHandle,
  DrawerHeader: () => DrawerHeader,
  DrawerTitle: () => DrawerTitle,
  DrawerTrigger: () => DrawerTrigger,
  drawerContentVariants: () => drawerContentVariants
});
module.exports = __toCommonJS(drawer_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_class_variance_authority = require("class-variance-authority");
var import_react = require("react");
var import_vaul = require("vaul");
const drawerContentVariants = (0, import_class_variance_authority.cva)(
  [
    // Positioning — vaul handles the transform; we set the shell styles
    "fixed inset-x-0 bottom-0",
    // Z-index
    "z-[var(--z-modal)]",
    // Layout
    "flex flex-col",
    // Visual
    "rounded-t-lg",
    "border border-b-0 border-border",
    "bg-background",
    "shadow-xl",
    // Focus
    "outline-none"
  ],
  {
    variants: {
      size: {
        sm: "max-h-[30vh]",
        md: "max-h-[50vh]",
        lg: "max-h-[75vh]",
        full: "max-h-[calc(100vh-2rem)]"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
function Drawer({
  shouldScaleBackground = true,
  children,
  ...rest
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_vaul.Drawer.Root,
    {
      shouldScaleBackground,
      ...rest,
      children
    }
  );
}
Drawer.displayName = "Drawer";
const DrawerTrigger = (0, import_react.forwardRef)(function DrawerTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_vaul.Drawer.Trigger,
    {
      ref,
      className,
      "data-ds": "",
      "data-ds-component": "drawer-trigger",
      ...rest
    }
  );
});
DrawerTrigger.displayName = "DrawerTrigger";
const DrawerOverlay = (0, import_react.forwardRef)(function DrawerOverlay2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_vaul.Drawer.Overlay,
    {
      ref,
      className: (0, import_cn.cn)(
        "fixed inset-0",
        "z-[var(--z-overlay)]",
        "bg-black/50",
        className
      ),
      ...rest
    }
  );
});
DrawerOverlay.displayName = "DrawerOverlay";
function DrawerHandle({ className, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: (0, import_cn.cn)("mx-auto mt-4 mb-2 flex justify-center", className),
      "data-ds": "",
      "data-ds-component": "drawer-handle",
      ...rest,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-12 rounded-full bg-muted-foreground/25" })
    }
  );
}
DrawerHandle.displayName = "DrawerHandle";
const DrawerContent = (0, import_react.forwardRef)(function DrawerContent2({
  size = "md",
  showHandle = true,
  overlayClassName,
  className,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_vaul.Drawer.Portal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerOverlay, { className: overlayClassName }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      import_vaul.Drawer.Content,
      {
        ref,
        className: (0, import_cn.cn)("not-prose", drawerContentVariants({ size }), className),
        "data-ds": "",
        "data-ds-component": "drawer",
        "data-ds-size": size,
        ...rest,
        children: [
          showHandle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHandle, {}),
          children
        ]
      }
    )
  ] });
});
DrawerContent.displayName = "DrawerContent";
function DrawerHeader({
  className,
  children,
  ...rest
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: (0, import_cn.cn)("flex flex-col gap-1.5 px-6 pt-4 pb-2", className),
      "data-ds": "",
      "data-ds-component": "drawer-header",
      ...rest,
      children
    }
  );
}
DrawerHeader.displayName = "DrawerHeader";
function DrawerBody({ className, children, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: (0, import_cn.cn)("flex-1 overflow-y-auto px-6 py-4", className),
      "data-ds": "",
      "data-ds-component": "drawer-body",
      ...rest,
      children
    }
  );
}
DrawerBody.displayName = "DrawerBody";
function DrawerFooter({
  className,
  children,
  ...rest
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: (0, import_cn.cn)(
        "flex flex-col-reverse gap-2 px-6 pb-6 pt-2 sm:flex-row sm:justify-end",
        className
      ),
      "data-ds": "",
      "data-ds-component": "drawer-footer",
      ...rest,
      children
    }
  );
}
DrawerFooter.displayName = "DrawerFooter";
const DrawerTitle = (0, import_react.forwardRef)(function DrawerTitle2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_vaul.Drawer.Title,
    {
      ref,
      className: (0, import_cn.cn)(
        "text-lg font-semibold leading-6 text-foreground",
        className
      ),
      "data-ds": "",
      "data-ds-component": "drawer-title",
      ...rest,
      children
    }
  );
});
DrawerTitle.displayName = "DrawerTitle";
const DrawerDescription = (0, import_react.forwardRef)(function DrawerDescription2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_vaul.Drawer.Description,
    {
      ref,
      className: (0, import_cn.cn)("text-sm leading-5 text-muted-foreground", className),
      "data-ds": "",
      "data-ds-component": "drawer-description",
      ...rest,
      children
    }
  );
});
DrawerDescription.displayName = "DrawerDescription";
const DrawerClose = (0, import_react.forwardRef)(function DrawerClose2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_vaul.Drawer.Close,
    {
      ref,
      className,
      "data-ds": "",
      "data-ds-component": "drawer-close",
      ...rest
    }
  );
});
DrawerClose.displayName = "DrawerClose";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  drawerContentVariants
});
