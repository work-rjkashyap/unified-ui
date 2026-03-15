"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";
function SuccessIcon({ className }) {
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ jsx("path", { d: "m9 12 2 2 4-4" })
      ]
    }
  );
}
function InfoIcon({ className }) {
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ jsx("path", { d: "M12 16v-4" }),
        /* @__PURE__ */ jsx("path", { d: "M12 8h.01" })
      ]
    }
  );
}
function WarningIcon({ className }) {
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" }),
        /* @__PURE__ */ jsx("path", { d: "M12 9v4" }),
        /* @__PURE__ */ jsx("path", { d: "M12 17h.01" })
      ]
    }
  );
}
function DangerIcon({ className }) {
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ jsx("path", { d: "m15 9-6 6" }),
        /* @__PURE__ */ jsx("path", { d: "m9 9 6 6" })
      ]
    }
  );
}
function CloseIcon({ className }) {
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ jsx("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
const toastVariants = cva(
  [
    // Layout
    "relative flex items-start gap-3",
    // Shape
    "rounded-lg",
    // Padding
    "px-4 py-3",
    // Shadow (elevated)
    "shadow-lg",
    // Border
    "border",
    // Width
    "w-full max-w-[360px]",
    // Typography
    "text-sm leading-5",
    // Pointer
    "pointer-events-auto"
  ],
  {
    variants: {
      variant: {
        default: ["bg-surface-raised", "text-foreground", "border-border"],
        success: [
          "bg-success-muted",
          "text-success-muted-foreground",
          "border-success/20"
        ],
        warning: [
          "bg-warning-muted",
          "text-warning-muted-foreground",
          "border-warning/20"
        ],
        danger: [
          "bg-danger-muted",
          "text-danger-muted-foreground",
          "border-danger/20"
        ],
        info: ["bg-info-muted", "text-info-muted-foreground", "border-info/20"]
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const defaultIconMap = {
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon,
  info: InfoIcon
};
const iconColorMap = {
  default: "text-muted-foreground",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info"
};
const positionClasses = {
  "top-right": "top-0 right-0 items-end",
  "top-left": "top-0 left-0 items-start",
  "top-center": "top-0 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-0 right-0 items-end",
  "bottom-left": "bottom-0 left-0 items-start",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 items-center"
};
function getMotionVariants(position) {
  const isRight = position.includes("right");
  const isLeft = position.includes("left");
  const isBottom = position.includes("bottom");
  const isCenter = position.includes("center");
  const xOffset = isRight ? 24 : isLeft ? -24 : 0;
  const yOffset = isCenter ? isBottom ? 16 : -16 : 0;
  return {
    initial: {
      opacity: 0,
      x: xOffset,
      y: yOffset,
      scale: 0.95
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    exit: {
      opacity: 0,
      x: xOffset,
      y: yOffset,
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  };
}
const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.8
};
const instantTransition = {
  type: "tween",
  duration: 0.15
};
function getReducedMotionVariants() {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.1 } }
  };
}
let toastIdCounter = 0;
function generateToastId() {
  toastIdCounter += 1;
  return `ds-toast-${toastIdCounter}-${Date.now()}`;
}
const ToastContext = createContext(null);
const ToastItem = forwardRef(
  function ToastItem2({ toast: toastData, onDismiss, isBottom, ...rest }, ref) {
    const { id, variant, title, description, duration, action } = toastData;
    const timerRef = useRef(null);
    const remainingRef = useRef(duration);
    const startTimeRef = useRef(Date.now());
    const [isPaused, setIsPaused] = useState(false);
    const startTimer = useCallback(() => {
      if (remainingRef.current <= 0) return;
      startTimeRef.current = Date.now();
      timerRef.current = setTimeout(() => {
        onDismiss(id);
      }, remainingRef.current);
    }, [id, onDismiss]);
    const pauseTimer = useCallback(() => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        const elapsed = Date.now() - startTimeRef.current;
        remainingRef.current = Math.max(0, remainingRef.current - elapsed);
      }
    }, []);
    useEffect(() => {
      if (duration > 0) {
        startTimer();
      }
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, [duration, startTimer]);
    const handleMouseEnter = useCallback(() => {
      if (duration > 0) {
        pauseTimer();
        setIsPaused(true);
      }
    }, [duration, pauseTimer]);
    const handleMouseLeave = useCallback(() => {
      if (duration > 0) {
        startTimer();
        setIsPaused(false);
      }
    }, [duration, startTimer]);
    const handleKeyDown = useCallback(
      (e) => {
        if (e.key === "Escape") {
          onDismiss(id);
        }
      },
      [id, onDismiss]
    );
    const IconComponent = variant !== "default" ? defaultIconMap[variant] : null;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        role: "status",
        "aria-live": "polite",
        "aria-atomic": "true",
        className: cn(toastVariants({ variant })),
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onKeyDown: handleKeyDown,
        "data-ds": "",
        "data-ds-component": "toast",
        "data-ds-variant": variant,
        ...rest,
        children: [
          IconComponent && /* @__PURE__ */ jsx("span", { className: cn("shrink-0 mt-0.5", iconColorMap[variant]), children: /* @__PURE__ */ jsx(IconComponent, { className: "size-4" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            title && /* @__PURE__ */ jsx("div", { className: "font-semibold leading-5", children: title }),
            description && /* @__PURE__ */ jsx("div", { className: cn("leading-5", title && "mt-0.5 opacity-90"), children: description }),
            action && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  action.onClick();
                  onDismiss(id);
                },
                className: cn(
                  "mt-2 inline-flex items-center",
                  "text-xs font-semibold",
                  "underline underline-offset-2",
                  "hover:no-underline",
                  "transition-all duration-fast",
                  "focus-visible:outline-none focus-visible:border-current rounded-sm"
                ),
                children: action.label
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => onDismiss(id),
              className: cn(
                "shrink-0",
                "inline-flex items-center justify-center",
                "size-5 rounded-sm",
                "text-current opacity-40",
                "hover:opacity-100",
                "transition-opacity duration-fast",
                "focus-visible:outline-none focus-visible:border-current"
              ),
              "aria-label": "Dismiss notification",
              children: /* @__PURE__ */ jsx(CloseIcon, { className: "size-3.5" })
            }
          ),
          duration > 0 && /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden rounded-b-lg",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn(
                    "h-full origin-left",
                    variant === "default" && "bg-muted-foreground/30",
                    variant === "success" && "bg-success/30",
                    variant === "warning" && "bg-warning/30",
                    variant === "danger" && "bg-danger/30",
                    variant === "info" && "bg-info/30"
                  ),
                  style: {
                    animation: isPaused ? "none" : `ds-toast-progress ${duration}ms linear forwards`,
                    animationPlayState: isPaused ? "paused" : "running"
                  }
                }
              )
            }
          )
        ]
      }
    );
  }
);
ToastItem.displayName = "ToastItem";
function ToastContainer({
  toasts,
  position,
  gap,
  onDismiss
}) {
  const [mounted, setMounted] = useState(false);
  const isBottom = position.includes("bottom");
  const prefersReduced = useReducedMotion();
  const motionVariants = prefersReduced ? getReducedMotionVariants() : getMotionVariants(position);
  const transition = prefersReduced ? instantTransition : springTransition;
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const container = /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "fixed z-[var(--z-toast)]",
        "flex flex-col",
        "p-4",
        "pointer-events-none",
        "max-h-screen overflow-hidden",
        positionClasses[position]
      ),
      style: { gap: `${gap}px` },
      "data-ds": "",
      "data-ds-component": "toast-container",
      "data-ds-position": position,
      children: [
        /* @__PURE__ */ jsx(
          "style",
          {
            dangerouslySetInnerHTML: {
              __html: `@keyframes ds-toast-progress { from { transform: scaleX(1); } to { transform: scaleX(0); } }`
            }
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "popLayout", children: (isBottom ? [...toasts].reverse() : toasts).map((toast) => /* @__PURE__ */ jsx(
          motion.div,
          {
            layout: true,
            variants: motionVariants,
            initial: "initial",
            animate: "animate",
            exit: "exit",
            transition,
            children: /* @__PURE__ */ jsx(
              ToastItem,
              {
                toast,
                onDismiss,
                isBottom
              }
            )
          },
          toast.id
        )) })
      ]
    }
  );
  return createPortal(container, document.body);
}
function ToastProvider({
  children,
  position = "top-right",
  maxVisible = 5,
  defaultDuration = 5e3,
  gap = 8
}) {
  const [toasts, setToasts] = useState([]);
  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);
  const addToast = useCallback(
    (variant, messageOrOptions) => {
      const options = typeof messageOrOptions === "string" ? { description: messageOrOptions } : messageOrOptions;
      const id = options.id ?? generateToastId();
      const newToast = {
        id,
        variant,
        title: options.title,
        description: options.description,
        duration: options.duration ?? defaultDuration,
        action: options.action,
        createdAt: Date.now()
      };
      setToasts((prev) => {
        const existing = prev.findIndex((t) => t.id === id);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = newToast;
          return updated;
        }
        const next = [...prev, newToast];
        if (next.length > maxVisible) {
          return next.slice(next.length - maxVisible);
        }
        return next;
      });
      return id;
    },
    [defaultDuration, maxVisible]
  );
  const api = useMemo(
    () => ({
      toast: (msg) => addToast("default", msg),
      success: (msg) => addToast("success", msg),
      warning: (msg) => addToast("warning", msg),
      danger: (msg) => addToast("danger", msg),
      info: (msg) => addToast("info", msg),
      dismiss,
      dismissAll
    }),
    [addToast, dismiss, dismissAll]
  );
  return /* @__PURE__ */ jsxs(ToastContext.Provider, { value: api, children: [
    children,
    /* @__PURE__ */ jsx(
      ToastContainer,
      {
        toasts,
        position,
        gap,
        onDismiss: dismiss
      }
    )
  ] });
}
ToastProvider.displayName = "ToastProvider";
function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      "useToast must be used within a <ToastProvider>. Wrap your application (or a subtree) with <ToastProvider> to use the toast API."
    );
  }
  return context;
}
export {
  ToastItem,
  ToastProvider,
  toastVariants,
  useToast
};
