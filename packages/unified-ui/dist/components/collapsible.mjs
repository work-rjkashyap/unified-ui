"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useState
} from "react";
const CollapsibleContext = createContext({
  open: false,
  contentId: ""
});
function useCollapsibleContext() {
  return useContext(CollapsibleContext);
}
const collapseTransition = {
  duration: 0.2,
  ease: [0.25, 0.1, 0.25, 1]
};
const reducedMotionTransition = {
  duration: 0.01,
  ease: "linear"
};
function Collapsible({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  className,
  children,
  ...rest
}) {
  const contentId = useId();
  const isControlled = openProp !== void 0;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isControlled ? openProp : internalOpen;
  const handleOpenChange = useCallback(
    (value) => {
      if (!isControlled) {
        setInternalOpen(value);
      }
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange]
  );
  return /* @__PURE__ */ jsx(CollapsibleContext.Provider, { value: { open, contentId }, children: /* @__PURE__ */ jsx(
    CollapsiblePrimitive.Root,
    {
      open,
      onOpenChange: handleOpenChange,
      disabled,
      className: cn(className),
      "data-ds": "",
      "data-ds-component": "collapsible",
      ...open ? { "data-ds-open": "" } : {},
      ...rest,
      children
    }
  ) });
}
Collapsible.displayName = "Collapsible";
const CollapsibleTrigger = forwardRef(function CollapsibleTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    CollapsiblePrimitive.Trigger,
    {
      ref,
      className: cn(className),
      "data-ds": "",
      "data-ds-component": "collapsible-trigger",
      ...rest
    }
  );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";
const MotionDiv = motion.div;
function AnimatedCollapsibleInner({
  duration = 0.2,
  className,
  children
}) {
  const prefersReduced = useReducedMotion();
  const transition = prefersReduced ? reducedMotionTransition : { ...collapseTransition, duration };
  return /* @__PURE__ */ jsx(
    MotionDiv,
    {
      initial: { height: 0, opacity: 0, overflow: "hidden" },
      animate: {
        height: "auto",
        opacity: 1,
        overflow: "hidden",
        transitionEnd: { overflow: "visible" }
      },
      exit: { height: 0, opacity: 0, overflow: "hidden" },
      transition,
      className: cn(className),
      "data-ds": "",
      "data-ds-component": "collapsible-content",
      children
    }
  );
}
const CollapsibleContent = forwardRef(function CollapsibleContent2({ duration = 0.2, forceMount = false, className, children, ...rest }, ref) {
  const { open } = useCollapsibleContext();
  if (forceMount) {
    return /* @__PURE__ */ jsxs(CollapsiblePrimitive.Content, { forceMount: true, ref, ...rest, children: [
      /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsx(AnimatedCollapsibleInner, { duration, className, children }) }),
      !open && /* @__PURE__ */ jsx("div", { style: { height: 0, overflow: "hidden" }, "aria-hidden": "true" })
    ] });
  }
  return /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsx(CollapsiblePrimitive.Content, { forceMount: true, ref, ...rest, children: /* @__PURE__ */ jsx(AnimatedCollapsibleInner, { duration, className, children }) }) });
});
CollapsibleContent.displayName = "CollapsibleContent";
export {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  useCollapsibleContext
};
