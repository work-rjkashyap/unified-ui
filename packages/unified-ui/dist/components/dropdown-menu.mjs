"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { scaleIn } from "../motion/index";
import { cn } from "../utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import {
  forwardRef
} from "react";
function CheckIcon({ className }) {
  return /* @__PURE__ */ jsx(
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
      children: /* @__PURE__ */ jsx("path", { d: "M20 6 9 17l-5-5" })
    }
  );
}
function DotIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
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
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, { ...rest, children });
}
DropdownMenu.displayName = "DropdownMenu";
const DropdownMenuTrigger = forwardRef(function DropdownMenuTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Trigger,
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
const DropdownMenuContent = forwardRef(function DropdownMenuContent2({ className, children, sideOffset = 4, ...rest }, ref) {
  const shouldReduce = useReducedMotion();
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      ref,
      sideOffset,
      asChild: true,
      ...rest,
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          className: cn(...menuContentBase, className),
          variants: shouldReduce ? void 0 : scaleIn.variants,
          initial: shouldReduce ? { opacity: 0 } : "initial",
          animate: shouldReduce ? { opacity: 1 } : "animate",
          exit: shouldReduce ? { opacity: 0 } : "exit",
          transition: shouldReduce ? { duration: 0.15 } : scaleIn.transition,
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
const DropdownMenuItem = forwardRef(function DropdownMenuItem2({ className, variant = "default", icon, shortcut, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.Item,
    {
      ref,
      className: cn(
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
        icon && /* @__PURE__ */ jsx("span", { className: "shrink-0 [&>svg]:size-4", "aria-hidden": "true", children: icon }),
        /* @__PURE__ */ jsx("span", { className: "flex-1 flex items-center gap-2 [&>svg]:shrink-0 [&>svg]:size-4", children }),
        shortcut && /* @__PURE__ */ jsx(DropdownMenuShortcut, { children: shortcut })
      ]
    }
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";
const DropdownMenuCheckboxItem = forwardRef(function DropdownMenuCheckboxItem2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.CheckboxItem,
    {
      ref,
      className: cn(...menuItemBase, "gap-2 pl-8", className),
      "data-ds": "",
      "data-ds-component": "dropdown-menu-checkbox-item",
      ...rest,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsx("span", { className: "flex-1 flex items-center gap-2 [&>svg]:shrink-0 [&>svg]:size-4", children })
      ]
    }
  );
});
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";
const DropdownMenuRadioGroup = forwardRef(function DropdownMenuRadioGroup2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.RadioGroup, { ref, className, ...rest, children });
});
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";
const DropdownMenuRadioItem = forwardRef(function DropdownMenuRadioItem2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.RadioItem,
    {
      ref,
      className: cn(...menuItemBase, "gap-2 pl-8", className),
      "data-ds": "",
      "data-ds-component": "dropdown-menu-radio-item",
      ...rest,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(DotIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsx("span", { className: "flex-1 flex items-center gap-2 [&>svg]:shrink-0 [&>svg]:size-4", children })
      ]
    }
  );
});
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";
const DropdownMenuLabel = forwardRef(function DropdownMenuLabel2({ className, inset, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Label,
    {
      ref,
      className: cn(
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
const DropdownMenuSeparator = forwardRef(function DropdownMenuSeparator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Separator,
    {
      ref,
      className: cn("-mx-1 my-1 h-px bg-border", className),
      ...rest
    }
  );
});
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
const DropdownMenuGroup = forwardRef(function DropdownMenuGroup2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Group, { ref, className, ...rest, children });
});
DropdownMenuGroup.displayName = "DropdownMenuGroup";
function DropdownMenuSub({ children, ...rest }) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Sub, { ...rest, children });
}
DropdownMenuSub.displayName = "DropdownMenuSub";
const DropdownMenuSubTrigger = forwardRef(function DropdownMenuSubTrigger2({ className, inset, icon, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.SubTrigger,
    {
      ref,
      className: cn(
        ...menuItemBase,
        "gap-2 data-[state=open]:bg-muted",
        inset && "pl-8",
        className
      ),
      "data-ds": "",
      "data-ds-component": "dropdown-menu-sub-trigger",
      ...rest,
      children: [
        icon && /* @__PURE__ */ jsx("span", { className: "shrink-0 [&>svg]:size-4", "aria-hidden": "true", children: icon }),
        /* @__PURE__ */ jsx("span", { className: "flex-1 flex items-center gap-2 [&>svg]:shrink-0 [&>svg]:size-4", children }),
        /* @__PURE__ */ jsx(ChevronRightIcon, { className: "ml-auto size-4 text-muted-foreground" })
      ]
    }
  );
});
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";
const DropdownMenuSubContent = forwardRef(function DropdownMenuSubContent2({ className, children, ...rest }, ref) {
  const shouldReduce = useReducedMotion();
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.SubContent, { ref, asChild: true, ...rest, children: /* @__PURE__ */ jsx(
    motion.div,
    {
      className: cn(...menuContentBase, className),
      variants: shouldReduce ? void 0 : scaleIn.variants,
      initial: shouldReduce ? { opacity: 0 } : "initial",
      animate: shouldReduce ? { opacity: 1 } : "animate",
      exit: shouldReduce ? { opacity: 0 } : "exit",
      transition: shouldReduce ? { duration: 0.15 } : scaleIn.transition,
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
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      ),
      children
    }
  );
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
export {
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
};
