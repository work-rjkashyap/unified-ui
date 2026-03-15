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
var alert_exports = {};
__export(alert_exports, {
  Alert: () => Alert,
  Callout: () => Callout,
  alertVariants: () => alertVariants,
  calloutVariants: () => calloutVariants
});
module.exports = __toCommonJS(alert_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_motion = require("../motion/index");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_framer_motion = require("framer-motion");
var import_react = require("react");
function InfoIcon({ className }) {
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 16v-4" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 8h.01" })
      ]
    }
  );
}
function SuccessIcon({ className }) {
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 12 2 2 4-4" })
      ]
    }
  );
}
function WarningIcon({ className }) {
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 9v4" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 17h.01" })
      ]
    }
  );
}
function DangerIcon({ className }) {
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m15 9-6 6" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 9 6 6" })
      ]
    }
  );
}
function CloseIcon({ className }) {
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
function ChevronDownIcon({ className }) {
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
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m6 9 6 6 6-6" })
    }
  );
}
const defaultIconMap = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon,
  default: InfoIcon
};
const alertVariants = (0, import_class_variance_authority.cva)(
  // Base styles — shared across all variants
  [
    // Layout
    "relative flex gap-3",
    // Shape
    "rounded-md",
    // Padding
    "p-4",
    // Typography
    "text-sm leading-5",
    // Border
    "border",
    // Transition
    "transition-colors duration-fast"
  ],
  {
    variants: {
      variant: {
        /**
         * Info — informational messages, tips, notes.
         */
        info: ["bg-info-muted", "text-info-muted-foreground", "border-info/20"],
        /**
         * Success — positive outcomes, confirmations.
         */
        success: [
          "bg-success-muted",
          "text-success-muted-foreground",
          "border-success/20"
        ],
        /**
         * Warning — caution messages, deprecation notices.
         */
        warning: [
          "bg-warning-muted",
          "text-warning-muted-foreground",
          "border-warning/20"
        ],
        /**
         * Danger — error messages, destructive action warnings.
         */
        danger: [
          "bg-danger-muted",
          "text-danger-muted-foreground",
          "border-danger/20"
        ],
        /**
         * Default — neutral, generic notes without semantic meaning.
         * (Formerly only available in Callout.)
         */
        default: ["bg-muted", "text-muted-foreground", "border-border"]
      }
    },
    defaultVariants: {
      variant: "info"
    }
  }
);
const iconColorMap = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  default: "text-muted-foreground"
};
const defaultRoleMap = {
  info: "status",
  success: "status",
  warning: "alert",
  danger: "alert",
  default: "status"
};
const Alert = (0, import_react.forwardRef)(function Alert2({
  variant = "info",
  title,
  icon,
  dismissible = false,
  onDismiss,
  dismissLabel = "Dismiss alert",
  collapsible = false,
  defaultOpen = true,
  animated = false,
  role: roleProp,
  className,
  children,
  ...rest
}, ref) {
  const shouldReduce = (0, import_framer_motion.useReducedMotion)();
  const [visible, setVisible] = (0, import_react.useState)(true);
  const [open, setOpen] = (0, import_react.useState)(defaultOpen);
  if (!visible && !onDismiss) {
    return null;
  }
  const resolvedRole = roleProp ?? defaultRoleMap[variant];
  const DefaultIcon = defaultIconMap[variant];
  const showIcon = icon !== null;
  const resolvedIcon = icon !== void 0 && icon !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: (0, import_cn.cn)("shrink-0 mt-0.5", iconColorMap[variant]), children: icon }) : icon === null ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: (0, import_cn.cn)("shrink-0 mt-0.5", iconColorMap[variant]), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultIcon, { className: "size-4" }) });
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      setVisible(false);
    }
  };
  const useAnimation = animated && !shouldReduce;
  const rootClasses = (0, import_cn.cn)("not-prose", alertVariants({ variant }), className);
  const rootDataAttrs = {
    "data-ds": "",
    "data-ds-component": "alert",
    "data-ds-variant": variant,
    ...animated ? { "data-ds-animated": "" } : {}
  };
  const collapsibleInner = collapsible ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        type: "button",
        className: (0, import_cn.cn)(
          "flex items-start gap-3 w-full text-left cursor-pointer",
          import_focus_ring.focusRingClasses,
          "rounded-sm"
        ),
        onClick: () => setOpen((o) => !o),
        "aria-expanded": open,
        children: [
          showIcon && resolvedIcon,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 min-w-0", children: title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "font-semibold leading-5", children: title }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_framer_motion.motion.span,
            {
              className: "shrink-0 mt-0.5",
              animate: open ? { rotate: 180 } : { rotate: 0 },
              transition: { duration: 0.2 },
              "data-ds-animated": "",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDownIcon, { className: "size-4 opacity-70" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { initial: false, children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_framer_motion.motion.div,
      {
        variants: shouldReduce ? void 0 : import_motion.expandHeight.variants,
        initial: shouldReduce ? { opacity: 0 } : "initial",
        animate: shouldReduce ? { opacity: 1 } : "animate",
        exit: shouldReduce ? { opacity: 0 } : "exit",
        transition: shouldReduce ? { duration: 0.15 } : import_motion.expandHeight.transition,
        "data-ds-animated": "",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: (0, import_cn.cn)(
              "leading-5 pt-2",
              showIcon && "pl-7",
              title && "opacity-90"
            ),
            children
          }
        )
      }
    ) })
  ] }) : null;
  const standardInner = !collapsible ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    showIcon && resolvedIcon,
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex-1 min-w-0", children: [
      title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "font-semibold leading-5 mb-1", children: title }),
      children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: (0, import_cn.cn)("leading-5", title && "opacity-90"), children })
    ] }),
    dismissible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        type: "button",
        onClick: handleDismiss,
        className: (0, import_cn.cn)(
          "absolute top-3 right-3",
          "inline-flex items-center justify-center",
          "size-6 rounded-sm",
          "text-current opacity-50",
          "hover:opacity-100",
          "transition-opacity duration-fast",
          "focus-visible:outline-none focus-visible:border-current"
        ),
        "aria-label": dismissLabel,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, { className: "size-4" })
      }
    )
  ] }) : null;
  if (useAnimation) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_framer_motion.motion.div,
      {
        ref,
        role: resolvedRole,
        className: rootClasses,
        variants: import_motion.fadeIn.variants,
        initial: "initial",
        animate: "animate",
        transition: import_motion.fadeIn.transition,
        ...rootDataAttrs,
        children: collapsible ? collapsibleInner : standardInner
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ref,
      role: resolvedRole,
      className: rootClasses,
      ...rootDataAttrs,
      ...rest,
      children: collapsible ? collapsibleInner : standardInner
    }
  );
});
Alert.displayName = "Alert";
const Callout = (0, import_react.forwardRef)(
  function Callout2({ animated = true, className, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Alert,
      {
        ref,
        animated,
        className: (0, import_cn.cn)("rounded-lg", className),
        ...rest
      }
    );
  }
);
Callout.displayName = "Callout";
const calloutVariants = alertVariants;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Alert,
  Callout,
  alertVariants,
  calloutVariants
});
