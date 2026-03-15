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
var copy_button_exports = {};
__export(copy_button_exports, {
  CopyButton: () => CopyButton,
  copyButtonVariants: () => copyButtonVariants
});
module.exports = __toCommonJS(copy_button_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_motion = require("../motion/index");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_framer_motion = require("framer-motion");
var import_react = require("react");
const copyButtonVariants = (0, import_class_variance_authority.cva)(
  [
    "relative inline-flex items-center justify-center gap-2",
    "rounded-md border font-medium",
    "transition-colors duration-fast",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
    import_focus_ring.focusRingClasses
  ],
  {
    variants: {
      variant: {
        default: "bg-background border-border text-muted-foreground hover:text-foreground hover:bg-accent",
        ghost: "border-transparent bg-transparent text-muted-foreground hover:text-foreground hover:bg-accent"
      },
      size: {
        sm: "h-7 w-7 text-xs",
        md: "h-8 w-8 text-sm",
        lg: "h-9 w-9 text-base"
      }
    },
    defaultVariants: { variant: "default", size: "md" }
  }
);
function CopyIcon({ className }) {
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
      ]
    }
  );
}
function CheckIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 6 9 17l-5-5" })
    }
  );
}
const iconSizeMap = {
  sm: "size-3",
  md: "size-3.5",
  lg: "size-4"
};
const CopyButton = (0, import_react.forwardRef)(
  function CopyButton2({
    text,
    variant = "default",
    size = "md",
    tooltip = "Copy",
    successDuration = 2e3,
    onCopy,
    onCopyError,
    className
  }, ref) {
    const shouldReduce = (0, import_framer_motion.useReducedMotion)();
    const [copied, setCopied] = (0, import_react.useState)(false);
    const [showTooltip, setShowTooltip] = (0, import_react.useState)(false);
    const handleCopy = (0, import_react.useCallback)(async () => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        onCopy?.(text);
        setTimeout(() => setCopied(false), successDuration);
      } catch (err) {
        onCopyError?.(err instanceof Error ? err : new Error(String(err)));
      }
    }, [text, successDuration, onCopy, onCopyError]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative inline-flex", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { children: showTooltip && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        import_framer_motion.motion.div,
        {
          className: (0, import_cn.cn)(
            "absolute -top-8 left-1/2 -translate-x-1/2",
            "px-2 py-1 rounded-md",
            "bg-foreground text-background text-xs font-medium whitespace-nowrap",
            "pointer-events-none z-tooltip"
          ),
          variants: shouldReduce ? void 0 : import_motion.fadeInFast.variants,
          initial: shouldReduce ? { opacity: 0 } : "initial",
          animate: shouldReduce ? { opacity: 1 } : "animate",
          exit: shouldReduce ? { opacity: 0 } : "exit",
          transition: shouldReduce ? { duration: 0.1 } : import_motion.fadeInFast.transition,
          "data-ds-animated": "",
          children: [
            copied ? "Copied!" : tooltip,
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "span",
              {
                className: "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground",
                "aria-hidden": "true"
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          ref,
          type: "button",
          onClick: handleCopy,
          onMouseEnter: () => setShowTooltip(true),
          onMouseLeave: () => setShowTooltip(false),
          onFocus: () => setShowTooltip(true),
          onBlur: () => setShowTooltip(false),
          "aria-label": copied ? "Copied!" : tooltip,
          className: (0, import_cn.cn)(copyButtonVariants({ variant, size }), className),
          "data-ds": "",
          "data-ds-component": "copy-button",
          "data-ds-size": size,
          "data-ds-copied": copied ? "" : void 0,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { mode: "wait", initial: false, children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_framer_motion.motion.span,
            {
              className: (0, import_cn.cn)("text-success", iconSizeMap[size]),
              variants: shouldReduce ? void 0 : import_motion.pop.variants,
              initial: shouldReduce ? { opacity: 0 } : "initial",
              animate: shouldReduce ? { opacity: 1 } : "animate",
              exit: shouldReduce ? { opacity: 0 } : "exit",
              transition: shouldReduce ? { duration: 0.1 } : import_motion.pop.transition,
              "data-ds-animated": "",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, { className: iconSizeMap[size] })
            },
            "check"
          ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_framer_motion.motion.span,
            {
              variants: shouldReduce ? void 0 : import_motion.fadeInFast.variants,
              initial: shouldReduce ? { opacity: 0 } : "initial",
              animate: shouldReduce ? { opacity: 1 } : "animate",
              exit: shouldReduce ? { opacity: 0 } : "exit",
              transition: shouldReduce ? { duration: 0.1 } : import_motion.fadeInFast.transition,
              "data-ds-animated": "",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyIcon, { className: iconSizeMap[size] })
            },
            "copy"
          ) })
        }
      )
    ] });
  }
);
CopyButton.displayName = "CopyButton";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CopyButton,
  copyButtonVariants
});
