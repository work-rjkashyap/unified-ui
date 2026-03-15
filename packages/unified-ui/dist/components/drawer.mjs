"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { cva } from "class-variance-authority";
import {
  forwardRef
} from "react";
import { Drawer as DrawerPrimitive } from "vaul";
const drawerContentVariants = cva(
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
  return /* @__PURE__ */ jsx(
    DrawerPrimitive.Root,
    {
      shouldScaleBackground,
      ...rest,
      children
    }
  );
}
Drawer.displayName = "Drawer";
const DrawerTrigger = forwardRef(function DrawerTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    DrawerPrimitive.Trigger,
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
const DrawerOverlay = forwardRef(function DrawerOverlay2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    DrawerPrimitive.Overlay,
    {
      ref,
      className: cn(
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("mx-auto mt-4 mb-2 flex justify-center", className),
      "data-ds": "",
      "data-ds-component": "drawer-handle",
      ...rest,
      children: /* @__PURE__ */ jsx("div", { className: "h-1.5 w-12 rounded-full bg-muted-foreground/25" })
    }
  );
}
DrawerHandle.displayName = "DrawerHandle";
const DrawerContent = forwardRef(function DrawerContent2({
  size = "md",
  showHandle = true,
  overlayClassName,
  className,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ jsxs(DrawerPrimitive.Portal, { children: [
    /* @__PURE__ */ jsx(DrawerOverlay, { className: overlayClassName }),
    /* @__PURE__ */ jsxs(
      DrawerPrimitive.Content,
      {
        ref,
        className: cn("not-prose", drawerContentVariants({ size }), className),
        "data-ds": "",
        "data-ds-component": "drawer",
        "data-ds-size": size,
        ...rest,
        children: [
          showHandle && /* @__PURE__ */ jsx(DrawerHandle, {}),
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("flex flex-col gap-1.5 px-6 pt-4 pb-2", className),
      "data-ds": "",
      "data-ds-component": "drawer-header",
      ...rest,
      children
    }
  );
}
DrawerHeader.displayName = "DrawerHeader";
function DrawerBody({ className, children, ...rest }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("flex-1 overflow-y-auto px-6 py-4", className),
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
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
const DrawerTitle = forwardRef(function DrawerTitle2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    DrawerPrimitive.Title,
    {
      ref,
      className: cn(
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
const DrawerDescription = forwardRef(function DrawerDescription2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    DrawerPrimitive.Description,
    {
      ref,
      className: cn("text-sm leading-5 text-muted-foreground", className),
      "data-ds": "",
      "data-ds-component": "drawer-description",
      ...rest,
      children
    }
  );
});
DrawerDescription.displayName = "DrawerDescription";
const DrawerClose = forwardRef(function DrawerClose2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    DrawerPrimitive.Close,
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
export {
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
};
