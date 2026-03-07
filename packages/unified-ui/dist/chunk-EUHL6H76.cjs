'use strict';

var chunkF4JJFWWU_cjs = require('./chunk-F4JJFWWU.cjs');
var chunk3EHT6IOA_cjs = require('./chunk-3EHT6IOA.cjs');
var chunk4ON3M3OM_cjs = require('./chunk-4ON3M3OM.cjs');
var classVarianceAuthority = require('class-variance-authority');
var radixUi = require('radix-ui');
var React = require('react');
var jsxRuntime = require('react/jsx-runtime');
var framerMotion = require('framer-motion');
var reactResizablePanels = require('react-resizable-panels');
var vaul = require('vaul');
var reactDom = require('react-dom');
var sonner = require('sonner');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

var AccordionContext = React.createContext({
  variant: "bordered",
  size: "md"
});
function useAccordionContext() {
  return React.useContext(AccordionContext);
}
var accordionRootVariants = classVarianceAuthority.cva(["flex flex-col"], {
  variants: {
    variant: {
      /**
       * Bordered — each item has a visible border separator.
       * Default variant for most use cases.
       */
      bordered: "divide-y divide-border",
      /**
       * Borderless — no visible borders between items.
       * Use for tighter layouts or when embedded inside cards.
       */
      borderless: ""
    }
  },
  defaultVariants: {
    variant: "bordered"
  }
});
var accordionTriggerVariants = classVarianceAuthority.cva(
  [
    // Layout
    "flex flex-1 items-center justify-between w-full",
    // Typography
    "font-medium text-foreground",
    // Transition
    "transition-[color,background-color,opacity]",
    "duration-fast ease-standard",
    // Focus ring
    chunk3EHT6IOA_cjs.focusRingClasses,
    // Hover
    "hover:text-foreground hover:underline",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    // Cursor
    "cursor-pointer",
    // Chevron rotation on open
    "[&>svg]:transition-transform [&>svg]:duration-normal [&>svg]:ease-standard",
    "[&[data-state=open]>svg]:rotate-180"
  ],
  {
    variants: {
      size: {
        /**
         * Small — compact for dense UIs, sidebars.
         */
        sm: "py-3 text-sm leading-5",
        /**
         * Medium — default size for most accordions.
         */
        md: "py-4 text-sm leading-5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var accordionContentVariants = classVarianceAuthority.cva(
  [
    // Animate expand/collapse using CSS grid trick
    "overflow-hidden",
    "data-[state=closed]:animate-accordion-up",
    "data-[state=open]:animate-accordion-down"
  ],
  {
    variants: {
      size: {
        sm: "text-sm leading-5",
        md: "text-sm leading-5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var accordionContentInnerVariants = classVarianceAuthority.cva(["text-muted-foreground"], {
  variants: {
    size: {
      sm: "pb-3",
      md: "pb-4"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
function ChevronDownIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 9 6 6 6-6" })
    }
  );
}
var Accordion = React.forwardRef(function Accordion2({ variant = "bordered", size = "md", className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(AccordionContext.Provider, { value: { variant, size }, children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Accordion.Root,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "not-prose",
        accordionRootVariants({ variant }),
        className
      ),
      "data-ds": "",
      "data-ds-component": "accordion",
      "data-ds-variant": variant,
      "data-ds-size": size,
      ...rest,
      children
    }
  ) });
});
Accordion.displayName = "Accordion";
var AccordionItem = React.forwardRef(function AccordionItem2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Accordion.Item,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn("", className),
      "data-ds": "",
      "data-ds-component": "accordion-item",
      ...rest,
      children
    }
  );
});
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React.forwardRef(function AccordionTrigger2({ className, hideChevron = false, children, ...rest }, ref) {
  const { size } = useAccordionContext();
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Accordion.Header, { className: "flex", children: /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.Accordion.Trigger,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(accordionTriggerVariants({ size }), className),
      "data-ds": "",
      "data-ds-component": "accordion-trigger",
      ...rest,
      children: [
        children,
        !hideChevron && /* @__PURE__ */ jsxRuntime.jsx(ChevronDownIcon, { className: "size-4 shrink-0 text-muted-foreground" })
      ]
    }
  ) });
});
AccordionTrigger.displayName = "AccordionTrigger";
var AccordionContent = React.forwardRef(function AccordionContent2({ className, children, ...rest }, ref) {
  const { size } = useAccordionContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Accordion.Content,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(accordionContentVariants({ size }), className),
      "data-ds": "",
      "data-ds-component": "accordion-content",
      ...rest,
      children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunk4ON3M3OM_cjs.cn(accordionContentInnerVariants({ size })), children })
    }
  );
});
AccordionContent.displayName = "AccordionContent";
function InfoIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 16v-4" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 8h.01" })
      ]
    }
  );
}
function SuccessIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m9 12 2 2 4-4" })
      ]
    }
  );
}
function WarningIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 9v4" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 17h.01" })
      ]
    }
  );
}
function DangerIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m15 9-6 6" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m9 9 6 6" })
      ]
    }
  );
}
function CloseIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
function ChevronDownIcon2({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 9 6 6 6-6" })
    }
  );
}
var defaultIconMap = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon,
  default: InfoIcon
};
var alertVariants = classVarianceAuthority.cva(
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
var iconColorMap = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  default: "text-muted-foreground"
};
var defaultRoleMap = {
  info: "status",
  success: "status",
  warning: "alert",
  danger: "alert",
  default: "status"
};
var Alert = React.forwardRef(function Alert2({
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
  const shouldReduce = framerMotion.useReducedMotion();
  const [visible, setVisible] = React.useState(true);
  const [open, setOpen] = React.useState(defaultOpen);
  if (!visible && !onDismiss) {
    return null;
  }
  const resolvedRole = roleProp ?? defaultRoleMap[variant];
  const DefaultIcon = defaultIconMap[variant];
  const showIcon = icon !== null;
  const resolvedIcon = icon !== void 0 && icon !== null ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: chunk4ON3M3OM_cjs.cn("shrink-0 mt-0.5", iconColorMap[variant]), children: icon }) : icon === null ? null : /* @__PURE__ */ jsxRuntime.jsx("span", { className: chunk4ON3M3OM_cjs.cn("shrink-0 mt-0.5", iconColorMap[variant]), children: /* @__PURE__ */ jsxRuntime.jsx(DefaultIcon, { className: "size-4" }) });
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      setVisible(false);
    }
  };
  const useAnimation = animated && !shouldReduce;
  const rootClasses = chunk4ON3M3OM_cjs.cn("not-prose", alertVariants({ variant }), className);
  const rootDataAttrs = {
    "data-ds": "",
    "data-ds-component": "alert",
    "data-ds-variant": variant,
    ...animated ? { "data-ds-animated": "" } : {}
  };
  const collapsibleInner = collapsible ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        type: "button",
        className: chunk4ON3M3OM_cjs.cn(
          "flex items-start gap-3 w-full text-left cursor-pointer",
          chunk3EHT6IOA_cjs.focusRingClasses,
          "rounded-sm"
        ),
        onClick: () => setOpen((o) => !o),
        "aria-expanded": open,
        children: [
          showIcon && resolvedIcon,
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1 min-w-0", children: title && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "font-semibold leading-5", children: title }) }),
          /* @__PURE__ */ jsxRuntime.jsx(
            framerMotion.motion.span,
            {
              className: "shrink-0 mt-0.5",
              animate: open ? { rotate: 180 } : { rotate: 0 },
              transition: { duration: 0.2 },
              "data-ds-animated": "",
              children: /* @__PURE__ */ jsxRuntime.jsx(ChevronDownIcon2, { className: "size-4 opacity-70" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntime.jsx(
      framerMotion.motion.div,
      {
        variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.expandHeight.variants,
        initial: shouldReduce ? { opacity: 0 } : "initial",
        animate: shouldReduce ? { opacity: 1 } : "animate",
        exit: shouldReduce ? { opacity: 0 } : "exit",
        transition: shouldReduce ? { duration: 0.15 } : chunkF4JJFWWU_cjs.expandHeight.transition,
        "data-ds-animated": "",
        children: /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: chunk4ON3M3OM_cjs.cn(
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
  const standardInner = !collapsible ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    showIcon && resolvedIcon,
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1 min-w-0", children: [
      title && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "font-semibold leading-5 mb-1", children: title }),
      children && /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunk4ON3M3OM_cjs.cn("leading-5", title && "opacity-90"), children })
    ] }),
    dismissible && /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        type: "button",
        onClick: handleDismiss,
        className: chunk4ON3M3OM_cjs.cn(
          "absolute top-3 right-3",
          "inline-flex items-center justify-center",
          "size-6 rounded-sm",
          "text-current opacity-50",
          "hover:opacity-100",
          "transition-opacity duration-fast",
          "focus-visible:outline-none focus-visible:border-current"
        ),
        "aria-label": dismissLabel,
        children: /* @__PURE__ */ jsxRuntime.jsx(CloseIcon, { className: "size-4" })
      }
    )
  ] }) : null;
  if (useAnimation) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      framerMotion.motion.div,
      {
        ref,
        role: resolvedRole,
        className: rootClasses,
        variants: chunkF4JJFWWU_cjs.fadeIn.variants,
        initial: "initial",
        animate: "animate",
        transition: chunkF4JJFWWU_cjs.fadeIn.transition,
        ...rootDataAttrs,
        children: collapsible ? collapsibleInner : standardInner
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
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
var Callout = React.forwardRef(
  function Callout2({ animated = true, className, ...rest }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      Alert,
      {
        ref,
        animated,
        className: chunk4ON3M3OM_cjs.cn("rounded-lg", className),
        ...rest
      }
    );
  }
);
Callout.displayName = "Callout";
var calloutVariants = alertVariants;
var AlertDialogContext = React.createContext({
  open: false
});
function useAlertDialogContext() {
  return React.useContext(AlertDialogContext);
}
function AlertDialog({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  ...rest
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const handleOpenChange = React.useCallback(
    (next) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(AlertDialogContext.Provider, { value: { open }, children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.AlertDialog.Root,
    {
      open,
      onOpenChange: handleOpenChange,
      ...rest,
      children
    }
  ) });
}
AlertDialog.displayName = "AlertDialog";
var AlertDialogTrigger = radixUi.AlertDialog.Trigger;
AlertDialogTrigger.displayName = "AlertDialogTrigger";
var AlertDialogPortal = radixUi.AlertDialog.Portal;
AlertDialogPortal.displayName = "AlertDialogPortal";
var AlertDialogOverlay = React.forwardRef(function AlertDialogOverlay2({ className, ...rest }, ref) {
  const shouldReduce = framerMotion.useReducedMotion();
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.AlertDialog.Overlay, { ref, forceMount: true, asChild: true, ...rest, children: /* @__PURE__ */ jsxRuntime.jsx(
    framerMotion.motion.div,
    {
      className: chunk4ON3M3OM_cjs.cn(
        "fixed inset-0 z-overlay bg-black/50 backdrop-blur-sm",
        className
      ),
      variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.overlayBackdrop.variants,
      initial: shouldReduce ? { opacity: 0 } : "initial",
      animate: shouldReduce ? { opacity: 1 } : "animate",
      exit: shouldReduce ? { opacity: 0 } : "exit",
      transition: shouldReduce ? { duration: 0.15 } : chunkF4JJFWWU_cjs.overlayBackdrop.transition,
      "data-ds-animated": ""
    }
  ) });
});
AlertDialogOverlay.displayName = "AlertDialogOverlay";
var AlertDialogContent = React.forwardRef(function AlertDialogContent2({ className, children, ...rest }, ref) {
  const shouldReduce = framerMotion.useReducedMotion();
  const { open } = useAlertDialogContext();
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.AlertDialog.Portal, { forceMount: true, children: /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntime.jsx(radixUi.AlertDialog.Content, { ref, forceMount: true, asChild: true, ...rest, children: /* @__PURE__ */ jsxRuntime.jsx(
      framerMotion.motion.div,
      {
        className: chunk4ON3M3OM_cjs.cn(
          "fixed left-[50%] top-[50%] z-modal",
          "-translate-x-[50%] -translate-y-[50%]",
          "w-full max-w-md rounded-lg border border-border bg-background shadow-xl",
          "p-6",
          "outline-none",
          chunk3EHT6IOA_cjs.focusRingClasses,
          className
        ),
        variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.modalContent.variants,
        initial: shouldReduce ? { opacity: 0 } : "initial",
        animate: shouldReduce ? { opacity: 1 } : "animate",
        exit: shouldReduce ? { opacity: 0 } : "exit",
        transition: shouldReduce ? { duration: 0.2 } : chunkF4JJFWWU_cjs.modalContent.transition,
        "data-ds": "",
        "data-ds-component": "alert-dialog-content",
        "data-ds-animated": "",
        children
      }
    ) })
  ] }) }) });
});
AlertDialogContent.displayName = "AlertDialogContent";
function AlertDialogHeader({
  className,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunk4ON3M3OM_cjs.cn("flex flex-col gap-2 mb-4", className), ...rest, children });
}
AlertDialogHeader.displayName = "AlertDialogHeader";
function AlertDialogFooter({
  className,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: chunk4ON3M3OM_cjs.cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-6",
        className
      ),
      ...rest,
      children
    }
  );
}
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = React.forwardRef(function AlertDialogTitle2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.AlertDialog.Title,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "text-lg font-semibold text-foreground leading-5",
        className
      ),
      ...rest,
      children
    }
  );
});
AlertDialogTitle.displayName = "AlertDialogTitle";
var AlertDialogDescription = React.forwardRef(function AlertDialogDescription2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.AlertDialog.Description,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn("text-sm text-muted-foreground leading-5", className),
      ...rest,
      children
    }
  );
});
AlertDialogDescription.displayName = "AlertDialogDescription";
var AlertDialogAction = React.forwardRef(function AlertDialogAction2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.AlertDialog.Action,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "inline-flex items-center justify-center gap-2",
        "h-9 px-4 text-sm font-medium rounded-md",
        "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
        "transition-colors duration-fast",
        "disabled:pointer-events-none disabled:opacity-50",
        chunk3EHT6IOA_cjs.focusRingClasses,
        className
      ),
      ...rest,
      children
    }
  );
});
AlertDialogAction.displayName = "AlertDialogAction";
var AlertDialogCancel = React.forwardRef(function AlertDialogCancel2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.AlertDialog.Cancel,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "inline-flex items-center justify-center gap-2",
        "h-9 px-4 text-sm font-medium rounded-md",
        "bg-secondary text-secondary-foreground border border-border",
        "hover:bg-secondary-hover active:bg-secondary-active",
        "transition-colors duration-fast",
        "disabled:pointer-events-none disabled:opacity-50",
        chunk3EHT6IOA_cjs.focusRingClasses,
        className
      ),
      ...rest,
      children
    }
  );
});
AlertDialogCancel.displayName = "AlertDialogCancel";
var AspectRatio = React.forwardRef(function AspectRatio2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.AspectRatio.Root,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn("relative overflow-hidden", className),
      "data-ds": "",
      "data-ds-component": "aspect-ratio",
      ...rest
    }
  );
});
AspectRatio.displayName = "AspectRatio";
var avatarVariants = classVarianceAuthority.cva(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "relative inline-flex items-center justify-center shrink-0",
    // Typography for fallback initials
    "font-medium leading-none select-none",
    // Default colors for fallback state
    "bg-muted text-muted-foreground"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Extra small — 24px. Inline metadata, compact lists.
         */
        xs: "size-6 text-[10px]",
        /**
         * Small — 32px. Table rows, compact cards.
         */
        sm: "size-8 text-xs",
        /**
         * Medium — 40px. Default, cards, comments.
         */
        md: "size-10 text-sm",
        /**
         * Large — 48px. Profile headers, featured content.
         */
        lg: "size-12 text-base",
        /**
         * Extra large — 64px. Profile pages, hero sections.
         */
        xl: "size-16 text-lg"
      },
      // -----------------------------------------------------------------
      // Shape Variants
      // -----------------------------------------------------------------
      shape: {
        /**
         * Circle — default, standard avatar shape.
         */
        circle: "rounded-full",
        /**
         * Square — rounded rectangle, for app icons or org logos.
         */
        square: "rounded-md"
      }
    },
    defaultVariants: {
      size: "md",
      shape: "circle"
    }
  }
);
var statusColorMap = {
  online: "bg-success",
  offline: "bg-muted-foreground",
  busy: "bg-danger",
  away: "bg-warning"
};
var statusLabelMap = {
  online: "Online",
  offline: "Offline",
  busy: "Busy",
  away: "Away"
};
var statusSizeMap = {
  xs: "size-1.5",
  sm: "size-2",
  md: "size-2.5",
  lg: "size-3",
  xl: "size-3.5"
};
var statusPositionMap = {
  xs: "bottom-0 right-0",
  sm: "bottom-0 right-0",
  md: "bottom-0.5 right-0.5",
  lg: "bottom-0.5 right-0.5",
  xl: "bottom-1 right-1"
};
function getInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
function DefaultFallbackIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "svg",
    {
      className: chunk4ON3M3OM_cjs.cn("size-8 translate-y-px text-current opacity-70", className),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "7", r: "4" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 14c-4.42 0-8 2.24-8 5v5h16v-5c0-2.76-3.58-5-8-5z" })
      ]
    }
  );
}
function StatusDot({
  status,
  size,
  label,
  shape
}) {
  const resolvedLabel = label ?? statusLabelMap[status];
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: chunk4ON3M3OM_cjs.cn(
        "absolute block",
        "rounded-full",
        "ring-2 ring-background",
        statusSizeMap[size],
        statusColorMap[status],
        // Position based on shape — circle uses corner, square uses edge
        shape === "circle" ? statusPositionMap[size] : "bottom-0 right-0"
      ),
      role: "status",
      "aria-label": resolvedLabel
    }
  );
}
function useImageLoadStatus(src) {
  const [status, setStatus] = React.useState(
    () => src ? "loading" : "error"
  );
  React.useEffect(() => {
    if (!src) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    const img = new Image();
    const handleLoad = () => setStatus("loaded");
    const handleError = () => setStatus("error");
    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleError);
    img.src = src;
    if (img.complete) {
      setStatus("loaded");
    }
    return () => {
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
    };
  }, [src]);
  return status;
}
var Avatar = React.forwardRef(function Avatar2({
  src,
  alt,
  name,
  size = "md",
  shape = "circle",
  status,
  statusLabel,
  fallbackIcon,
  fallbackClassName,
  className,
  children,
  ...rest
}, ref) {
  const imageStatus = useImageLoadStatus(src);
  const showImage = imageStatus === "loaded" && src;
  const initials = name ? getInitials(name) : "";
  const resolvedAlt = alt ?? name ?? "Avatar";
  const imgEl = showImage ? /* @__PURE__ */ jsxRuntime.jsx(
    "img",
    {
      src,
      alt: resolvedAlt,
      className: "size-full object-cover",
      draggable: false
    }
  ) : null;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "span",
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        avatarVariants({ size, shape }),
        !showImage && fallbackClassName,
        className
      ),
      "data-ds": "",
      "data-ds-component": "avatar",
      "data-ds-size": size,
      "data-ds-shape": shape,
      ...rest,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute inset-0 overflow-hidden rounded-[inherit] flex items-center justify-center", children: children ? children : showImage ? (
          /* Priority 2: Loaded image */
          imgEl
        ) : initials ? (
          /* Priority 3: Initials from name */
          /* @__PURE__ */ jsxRuntime.jsx("span", { role: "img", "aria-label": resolvedAlt, children: initials })
        ) : (
          /* Priority 4: Fallback icon */
          /* @__PURE__ */ jsxRuntime.jsx("span", { role: "img", "aria-label": resolvedAlt, children: fallbackIcon ?? /* @__PURE__ */ jsxRuntime.jsx(DefaultFallbackIcon, {}) })
        ) }),
        status && /* @__PURE__ */ jsxRuntime.jsx(
          StatusDot,
          {
            status,
            size,
            label: statusLabel,
            shape
          }
        )
      ]
    }
  );
});
Avatar.displayName = "Avatar";
var overlapMap = {
  xs: { tight: "-ml-3", default: "-ml-2.5", loose: "-ml-1.5" },
  sm: { tight: "-ml-4", default: "-ml-3", loose: "-ml-2" },
  md: { tight: "-ml-5", default: "-ml-4", loose: "-ml-3" },
  lg: { tight: "-ml-6", default: "-ml-5", loose: "-ml-3.5" },
  xl: { tight: "-ml-8", default: "-ml-6", loose: "-ml-4" }
};
var AvatarGroup = React.forwardRef(
  function AvatarGroup2({
    max: max2 = 5,
    size = "md",
    shape = "circle",
    spacing = "default",
    className,
    children,
    ...rest
  }, ref) {
    const childArray = React.Children.toArray(children).filter(React.isValidElement);
    const totalCount = childArray.length;
    const overflowCount = max2 > 0 && totalCount > max2 ? totalCount - max2 : 0;
    const visibleChildren = overflowCount > 0 ? childArray.slice(0, max2) : childArray;
    const overlapClass = overlapMap[size][spacing];
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn("inline-flex items-center", className),
        role: "group",
        "aria-label": `Group of ${totalCount} avatars`,
        "data-ds": "",
        "data-ds-component": "avatar-group",
        ...rest,
        children: [
          visibleChildren.map((child, index) => {
            if (!React.isValidElement(child)) return child;
            return /* @__PURE__ */ jsxRuntime.jsx(
              "span",
              {
                className: chunk4ON3M3OM_cjs.cn(
                  index > 0 && overlapClass,
                  // Ensure proper stacking order (first avatar on top)
                  // z-index is set via CSS var so hover:z-50! (Tailwind) can override it
                  "relative inline-flex cursor-pointer transition-transform duration-150 ease-out",
                  "z-(--ag-z)",
                  "hover:z-50! hover:scale-110"
                ),
                style: { "--ag-z": totalCount - index },
                children: React.cloneElement(child, {
                  size,
                  shape,
                  className: chunk4ON3M3OM_cjs.cn(
                    child.props?.className,
                    "ring-2 ring-background"
                  )
                })
              },
              child.props?.alt ?? child.props?.name ?? index
            );
          }),
          overflowCount > 0 && /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              className: chunk4ON3M3OM_cjs.cn(
                overlapClass,
                "relative inline-flex z-(--ag-z)"
              ),
              style: { "--ag-z": 0 },
              children: /* @__PURE__ */ jsxRuntime.jsxs(
                "span",
                {
                  className: chunk4ON3M3OM_cjs.cn(
                    avatarVariants({ size, shape }),
                    "ring-2 ring-background",
                    "bg-muted text-muted-foreground",
                    "font-semibold"
                  ),
                  role: "img",
                  "aria-label": `${overflowCount} more`,
                  "data-ds": "",
                  "data-ds-component": "avatar-overflow",
                  children: [
                    "+",
                    overflowCount
                  ]
                }
              )
            }
          )
        ]
      }
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";
var badgeVariants = classVarianceAuthority.cva(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "inline-flex items-center gap-1.5",
    // Shape — pill by default
    "rounded-full",
    // Typography
    "font-medium leading-none whitespace-nowrap",
    // Transition
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    // Prevent text selection
    "select-none",
    // Shrink protection
    "shrink-0"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Visual Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Default — neutral, muted background.
         * Use for generic labels, tags, and metadata.
         */
        default: ["bg-muted text-foreground", "border border-transparent"],
        /**
         * Primary — uses brand/primary color.
         * Use for highlighting primary categories or active filters.
         */
        primary: [
          "bg-primary-muted text-primary-muted-foreground",
          "border border-transparent"
        ],
        /**
         * Secondary — subdued variant with visible border.
         * Use for archived items, subtle categorization.
         */
        secondary: [
          "bg-secondary text-secondary-foreground",
          "border border-border"
        ],
        /**
         * Success — positive status indicator.
         * Use for "active", "complete", "approved" states.
         */
        success: [
          "bg-success-muted text-success-muted-foreground",
          "border border-transparent"
        ],
        /**
         * Warning — caution status indicator.
         * Use for "pending", "review", "expiring" states.
         */
        warning: [
          "bg-warning-muted text-warning-muted-foreground",
          "border border-transparent"
        ],
        /**
         * Danger — negative/critical status indicator.
         * Use for "error", "failed", "blocked", "critical" states.
         */
        danger: [
          "bg-danger-muted text-danger-muted-foreground",
          "border border-transparent"
        ],
        /**
         * Info — informational status indicator.
         * Use for "new", "beta", "info", "note" labels.
         */
        info: [
          "bg-info-muted text-info-muted-foreground",
          "border border-transparent"
        ],
        /**
         * Outline — transparent background with visible border.
         * Use for subtle categorization that doesn't compete with content.
         */
        outline: ["bg-transparent text-foreground", "border border-border"]
      },
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — very compact, for inline metadata and dense UIs.
         * Height: ~20px, Font: 11px
         */
        sm: "px-2 py-0.5 text-[11px] gap-1",
        /**
         * Medium — default badge size, comfortable readability.
         * Height: ~24px, Font: 12px
         */
        md: "px-2.5 py-1 text-xs gap-1.5",
        /**
         * Large — prominent badge for larger touch targets and filter chips.
         * Height: ~28px, Font: 14px
         */
        lg: "px-3 py-1.5 text-sm gap-2"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var dotColorMap = {
  default: "bg-muted-foreground",
  primary: "bg-primary",
  secondary: "bg-foreground",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  outline: "bg-foreground"
};
var dotSizeMap = {
  sm: "size-1.5",
  md: "size-2",
  lg: "size-2"
};
function RemoveButton({
  size,
  label,
  disabled,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      type: "button",
      onClick,
      disabled,
      className: chunk4ON3M3OM_cjs.cn(
        "inline-flex items-center justify-center shrink-0",
        "rounded-full",
        "text-current opacity-60",
        "hover:opacity-100",
        "transition-opacity duration-fast",
        "focus-visible:outline-none focus-visible:border-current",
        "disabled:pointer-events-none disabled:opacity-40",
        // Slightly negative margin to visually tuck the button in
        "-mr-0.5 ml-0.5",
        size === "sm" ? "size-3" : size === "lg" ? "size-4" : "size-3.5",
        chunk3EHT6IOA_cjs.focusRingClasses
      ),
      "aria-label": label,
      tabIndex: 0,
      children: /* @__PURE__ */ jsxRuntime.jsxs(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: size === "sm" ? "size-2.5" : size === "lg" ? "size-3.5" : "size-3",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M18 6 6 18" }),
            /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 6 12 12" })
          ]
        }
      )
    }
  );
}
function DotIndicator({
  variant,
  size
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: chunk4ON3M3OM_cjs.cn(
        "shrink-0 rounded-full",
        dotSizeMap[size],
        dotColorMap[variant]
      ),
      "aria-hidden": "true"
    }
  );
}
var Badge = React.forwardRef(function Badge2({
  variant = "default",
  size = "md",
  dot = false,
  removable = false,
  dismissible = false,
  onRemove,
  onDismiss,
  removeLabel,
  dismissLabel,
  as: Component = "span",
  icon,
  avatar,
  disabled = false,
  animated = false,
  className,
  children,
  ...rest
}, ref) {
  const shouldReduce = framerMotion.useReducedMotion();
  const showDismiss = removable || dismissible;
  const handleDismissClick = (e) => {
    onRemove?.(e);
    onDismiss?.(e);
  };
  const resolvedLabel = removeLabel ?? dismissLabel ?? "Remove";
  const iconSizeClass = size === "sm" ? "[&>svg]:size-2.5" : size === "lg" ? "[&>svg]:size-3.5" : "[&>svg]:size-3";
  const content = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    avatar && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0 -ml-0.5", children: avatar }),
    dot && /* @__PURE__ */ jsxRuntime.jsx(DotIndicator, { variant, size }),
    icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: chunk4ON3M3OM_cjs.cn("shrink-0", iconSizeClass), "aria-hidden": "true", children: icon }),
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", children }),
    showDismiss && /* @__PURE__ */ jsxRuntime.jsx(
      RemoveButton,
      {
        size,
        label: resolvedLabel,
        disabled,
        onClick: handleDismissClick
      }
    )
  ] });
  const classes = chunk4ON3M3OM_cjs.cn(
    badgeVariants({ variant, size }),
    disabled && "opacity-50 pointer-events-none",
    className
  );
  const dataAttrs = {
    "data-ds": "",
    "data-ds-component": "badge",
    "data-ds-variant": variant,
    "data-ds-size": size,
    ...disabled ? { "data-ds-disabled": "" } : {},
    ...animated ? { "data-ds-animated": "" } : {}
  };
  if (animated && !shouldReduce) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      framerMotion.motion.span,
      {
        ref,
        className: classes,
        variants: chunkF4JJFWWU_cjs.popSubtle.variants,
        initial: "initial",
        animate: "animate",
        transition: chunkF4JJFWWU_cjs.popSubtle.transition,
        ...dataAttrs,
        children: content
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    Component,
    {
      ref,
      className: classes,
      "aria-disabled": disabled || void 0,
      ...dataAttrs,
      ...rest,
      children: content
    }
  );
});
Badge.displayName = "Badge";
var Tag = React.forwardRef(function Tag2({ animated = true, dismissLabel = "Remove tag", ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Badge,
    {
      ref,
      animated,
      dismissLabel,
      ...rest
    }
  );
});
Tag.displayName = "Tag";
var tagVariants = badgeVariants;
var bannerVariants = classVarianceAuthority.cva(
  ["w-full flex items-center gap-3 px-4 py-3 text-sm font-medium"],
  {
    variants: {
      variant: {
        default: "bg-foreground text-background",
        info: "bg-info text-info-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        danger: "bg-danger text-danger-foreground",
        primary: "bg-primary text-primary-foreground"
      },
      position: {
        top: "sticky top-0 left-0 right-0 z-banner",
        bottom: "sticky bottom-0 left-0 right-0 z-banner",
        inline: "rounded-md"
      }
    },
    defaultVariants: { variant: "default", position: "inline" }
  }
);
function XIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
var Banner = React.forwardRef(function Banner2({
  variant = "default",
  position = "inline",
  dismissible = false,
  onDismiss,
  dismissLabel = "Dismiss",
  icon,
  action,
  visible: controlledVisible,
  defaultVisible = true,
  className,
  children,
  id,
  style,
  role,
  "aria-label": ariaLabel,
  "aria-live": ariaLive
}, ref) {
  const shouldReduce = framerMotion.useReducedMotion();
  const [internalVisible, setInternalVisible] = React.useState(defaultVisible);
  const isVisible = controlledVisible !== void 0 ? controlledVisible : internalVisible;
  const handleDismiss = () => {
    if (controlledVisible === void 0) setInternalVisible(false);
    onDismiss?.();
  };
  const slidePreset = position === "bottom" ? chunkF4JJFWWU_cjs.slideUp : chunkF4JJFWWU_cjs.slideDown;
  return /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { initial: false, children: isVisible && /* @__PURE__ */ jsxRuntime.jsxs(
    framerMotion.motion.div,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(bannerVariants({ variant, position }), className),
      variants: shouldReduce ? void 0 : slidePreset.variants,
      initial: shouldReduce ? { opacity: 0 } : "initial",
      animate: shouldReduce ? { opacity: 1 } : "animate",
      exit: shouldReduce ? { opacity: 0 } : "exit",
      transition: shouldReduce ? { duration: 0.2 } : slidePreset.transition,
      "data-ds": "",
      "data-ds-component": "banner",
      "data-ds-variant": variant,
      "data-ds-position": position,
      "data-ds-animated": "",
      id,
      style,
      role,
      "aria-label": ariaLabel,
      "aria-live": ariaLive,
      children: [
        icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0", children: icon }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex-1 min-w-0", children }),
        action && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0", children: action }),
        dismissible && /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            onClick: handleDismiss,
            className: chunk4ON3M3OM_cjs.cn(
              "shrink-0 inline-flex items-center justify-center size-6 rounded-sm",
              "opacity-70 hover:opacity-100 transition-opacity duration-fast",
              chunk3EHT6IOA_cjs.focusRingClasses
            ),
            "aria-label": dismissLabel,
            children: /* @__PURE__ */ jsxRuntime.jsx(XIcon, { className: "size-4" })
          }
        )
      ]
    }
  ) });
});
Banner.displayName = "Banner";
function ChevronRightIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m9 18 6-6-6-6" })
    }
  );
}
function MoreHorizontalIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "1" }),
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "19", cy: "12", r: "1" }),
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "5", cy: "12", r: "1" })
      ]
    }
  );
}
var Breadcrumb = React.forwardRef(
  function Breadcrumb2({ "aria-label": ariaLabel = "Breadcrumb", className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "nav",
      {
        ref,
        "aria-label": ariaLabel,
        className: chunk4ON3M3OM_cjs.cn("not-prose", className),
        "data-ds": "",
        "data-ds-component": "breadcrumb",
        ...rest,
        children
      }
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";
var BreadcrumbList = React.forwardRef(
  function BreadcrumbList2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "ol",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(
          "flex flex-wrap items-center gap-1.5",
          "text-xs leading-4 tracking-wide",
          "text-muted-foreground",
          className
        ),
        "data-ds": "",
        "data-ds-component": "breadcrumb-list",
        ...rest,
        children
      }
    );
  }
);
BreadcrumbList.displayName = "BreadcrumbList";
var BreadcrumbItem = React.forwardRef(
  function BreadcrumbItem2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "li",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn("inline-flex items-center gap-1.5", className),
        "data-ds": "",
        "data-ds-component": "breadcrumb-item",
        ...rest,
        children
      }
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";
var BreadcrumbLink = React.forwardRef(function BreadcrumbLink2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "a",
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "no-underline",
        "text-muted-foreground",
        "transition-colors duration-fast",
        "hover:text-foreground",
        chunk3EHT6IOA_cjs.focusRingCompactClasses,
        "rounded-sm",
        className
      ),
      "data-ds": "",
      "data-ds-component": "breadcrumb-link",
      ...rest,
      children
    }
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";
var BreadcrumbPage = React.forwardRef(
  function BreadcrumbPage2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "span",
      {
        ref,
        "aria-current": "page",
        className: chunk4ON3M3OM_cjs.cn("font-medium", "text-foreground", className),
        "data-ds": "",
        "data-ds-component": "breadcrumb-page",
        ...rest,
        children
      }
    );
  }
);
BreadcrumbPage.displayName = "BreadcrumbPage";
var BreadcrumbSeparator = React.forwardRef(function BreadcrumbSeparator2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "li",
    {
      ref,
      role: "presentation",
      "aria-hidden": "true",
      className: chunk4ON3M3OM_cjs.cn(
        "inline-flex items-center",
        "text-muted-foreground/60",
        "[&>svg]:size-3",
        className
      ),
      "data-ds": "",
      "data-ds-component": "breadcrumb-separator",
      ...rest,
      children: children ?? /* @__PURE__ */ jsxRuntime.jsx(ChevronRightIcon, {})
    }
  );
});
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
var BreadcrumbEllipsis = React.forwardRef(function BreadcrumbEllipsis2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "span",
    {
      ref,
      role: "presentation",
      "aria-hidden": "true",
      className: chunk4ON3M3OM_cjs.cn(
        "inline-flex items-center justify-center size-5",
        "text-muted-foreground",
        className
      ),
      "data-ds": "",
      "data-ds-component": "breadcrumb-ellipsis",
      ...rest,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(MoreHorizontalIcon, { className: "size-4" }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "More pages" })
      ]
    }
  );
});
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
var BreadcrumbNav = React.forwardRef(
  function BreadcrumbNav2({
    items,
    maxItems = Number.POSITIVE_INFINITY,
    separator,
    className,
    ...rest
  }, ref) {
    const visibleItems = React.useMemo(() => {
      if (items.length <= maxItems || maxItems < 2 || !Number.isFinite(maxItems)) {
        return { items, truncated: false };
      }
      const tailCount = maxItems - 2;
      const first = items[0];
      const tail = items.slice(items.length - Math.max(tailCount, 1));
      return {
        items: [first, ...tail],
        truncated: true
      };
    }, [items, maxItems]);
    return /* @__PURE__ */ jsxRuntime.jsx(Breadcrumb, { ref, className, ...rest, children: /* @__PURE__ */ jsxRuntime.jsx(BreadcrumbList, { children: visibleItems.items.flatMap((item, index) => {
      const itemKey = item.href ?? `page-${index}`;
      const isLast = index === visibleItems.items.length - 1;
      const isFirst = index === 0;
      const showEllipsis = visibleItems.truncated && isFirst;
      const elements = [];
      elements.push(
        /* @__PURE__ */ jsxRuntime.jsx(BreadcrumbItem, { children: isLast && !item.href ? /* @__PURE__ */ jsxRuntime.jsx(BreadcrumbPage, { children: item.label }) : /* @__PURE__ */ jsxRuntime.jsx(BreadcrumbLink, { href: item.href, children: item.label }) }, `item-${itemKey}`)
      );
      if (showEllipsis) {
        elements.push(
          /* @__PURE__ */ jsxRuntime.jsx(BreadcrumbSeparator, { children: separator }, "sep-ellipsis-before"),
          /* @__PURE__ */ jsxRuntime.jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsxRuntime.jsx(BreadcrumbEllipsis, {}) }, "ellipsis")
        );
      }
      if (!isLast) {
        elements.push(
          /* @__PURE__ */ jsxRuntime.jsx(BreadcrumbSeparator, { children: separator }, `sep-${itemKey}`)
        );
      }
      return elements;
    }) }) });
  }
);
BreadcrumbNav.displayName = "BreadcrumbNav";
var buttonVariants = classVarianceAuthority.cva(
  // Base styles — shared across all variants and sizes
  [
    // Opt out of prose typography overrides (prevents underline on <a> buttons)
    "not-prose no-underline",
    // Layout
    "inline-flex items-center justify-center gap-2",
    // Typography
    "text-sm font-medium leading-5",
    // Shape
    "rounded-md",
    // Transition (uses design system motion tokens)
    "transition-[color,background-color,border-color,box-shadow,opacity,transform]",
    "duration-fast ease-standard",
    // Focus ring — WCAG AA compliant, visible on keyboard navigation only
    chunk3EHT6IOA_cjs.focusRingClasses,
    // Disabled — consistent across all variants
    "disabled:pointer-events-none disabled:opacity-50",
    // Cursor
    "cursor-pointer disabled:cursor-not-allowed",
    // Prevent text selection on rapid clicks
    "select-none",
    // Smooth press feedback
    "active:scale-[0.98] disabled:active:scale-100"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Visual Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Primary — the main call-to-action. Uses brand color.
         * High visual prominence. Use sparingly (1–2 per view).
         */
        primary: [
          "bg-primary text-primary-foreground",
          "hover:bg-primary-hover",
          "active:bg-primary-active"
        ],
        /**
         * Secondary — for secondary actions. Uses muted surface color.
         * Medium visual prominence. Pairs with primary buttons.
         */
        secondary: [
          "bg-secondary text-secondary-foreground",
          "border border-border",
          "hover:bg-secondary-hover",
          "active:bg-secondary-active"
        ],
        /**
         * Ghost — minimal visual weight. No background until hover.
         * Low visual prominence. Use for tertiary actions, toolbars, nav.
         */
        ghost: [
          "bg-transparent text-foreground",
          "hover:bg-muted hover:text-foreground",
          "active:bg-secondary-active"
        ],
        /**
         * Danger — destructive actions. Uses danger (red) color.
         * High visual prominence. Use for delete, remove, revoke actions.
         */
        danger: [
          "bg-danger text-danger-foreground",
          "hover:bg-danger-hover",
          "active:bg-danger-active"
        ]
      },
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — compact buttons for dense UIs, tables, toolbars.
         * Height: 32px (h-8), Padding: 12px horizontal, Font: 12px
         */
        sm: "h-8 px-3 text-xs gap-1.5",
        /**
         * Medium — default size for most buttons.
         * Height: var(--ds-control-height), Padding: var(--ds-padding-button-x), Font: 14px
         */
        md: "h-(--ds-control-height) px-(--ds-padding-button-x) text-sm gap-2",
        /**
         * Large — prominent buttons for hero sections, forms.
         * Height: 40px (h-10), Padding: 20px horizontal, Font: 14px
         */
        lg: "h-10 px-5 text-sm gap-2"
      },
      // -----------------------------------------------------------------
      // Width Variants
      // -----------------------------------------------------------------
      fullWidth: {
        true: "w-full",
        false: ""
      },
      // -----------------------------------------------------------------
      // Icon-Only Variant
      // -----------------------------------------------------------------
      iconOnly: {
        true: "!px-0",
        false: ""
      }
    },
    // -------------------------------------------------------------------
    // Compound Variants
    // -------------------------------------------------------------------
    // Handle special combinations that can't be expressed as individual
    // variant values.
    // -------------------------------------------------------------------
    compoundVariants: [
      // Icon-only buttons are square (width = height)
      { iconOnly: true, size: "sm", className: "w-8" },
      { iconOnly: true, size: "md", className: "w-9" },
      { iconOnly: true, size: "lg", className: "w-10" }
    ],
    // -------------------------------------------------------------------
    // Default Variants
    // -------------------------------------------------------------------
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      iconOnly: false
    }
  }
);
function ButtonSpinner({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "svg",
    {
      className: chunk4ON3M3OM_cjs.cn("animate-spin size-4", className),
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "circle",
          {
            className: "opacity-25",
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            strokeWidth: "4"
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "path",
          {
            className: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          }
        )
      ]
    }
  );
}
var Button = React.forwardRef(
  function Button2({
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    loadingText,
    iconLeft,
    iconRight,
    iconOnly = false,
    disabled = false,
    as: Component = "button",
    className,
    children,
    ...rest
  }, ref) {
    const isDisabled = disabled || loading;
    const iconSizeClass = size === "sm" ? "[&>svg]:size-3.5" : "[&>svg]:size-4";
    return /* @__PURE__ */ jsxRuntime.jsxs(
      Component,
      {
        ref,
        type: Component === "button" ? "button" : void 0,
        disabled: isDisabled,
        "aria-disabled": isDisabled || void 0,
        "aria-busy": loading || void 0,
        className: chunk4ON3M3OM_cjs.cn(
          buttonVariants({ variant, size, fullWidth, iconOnly }),
          iconSizeClass,
          className
        ),
        "data-ds": "",
        "data-ds-component": "button",
        "data-ds-variant": variant,
        "data-ds-size": size,
        ...loading ? { "data-ds-loading": "" } : {},
        ...rest,
        children: [
          loading && /* @__PURE__ */ jsxRuntime.jsx(ButtonSpinner, { className: size === "sm" ? "size-3.5" : "size-4" }),
          loading && loadingText ? /* @__PURE__ */ jsxRuntime.jsx("span", { children: loadingText }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            !loading && iconLeft && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0", "aria-hidden": "true", children: iconLeft }),
            children && /* @__PURE__ */ jsxRuntime.jsx("span", { className: chunk4ON3M3OM_cjs.cn("inline-flex items-center gap-[inherit]", loading && !loadingText && "invisible"), children }),
            !loading && iconRight && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0", "aria-hidden": "true", children: iconRight })
          ] })
        ]
      }
    );
  }
);
Button.displayName = "Button";
var DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
var MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isSameMonth(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}
function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function addMonths(date, delta) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + delta);
  return d;
}
function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) {
    cells.push(new Date(year, month, d));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}
var calendarDayVariants = classVarianceAuthority.cva(
  [
    "relative w-9 h-9 p-0 rounded-md",
    "inline-flex items-center justify-center",
    "text-sm font-normal leading-none",
    "transition-colors duration-fast",
    "cursor-pointer select-none",
    chunk3EHT6IOA_cjs.focusRingClasses,
    "disabled:pointer-events-none disabled:opacity-30 disabled:cursor-not-allowed"
  ],
  {
    variants: {
      state: {
        default: "text-foreground hover:bg-accent hover:text-accent-foreground",
        today: "font-semibold text-primary ring-1 ring-primary hover:bg-primary/10",
        selected: "bg-primary text-primary-foreground hover:bg-primary-hover font-medium",
        rangeStart: "bg-primary text-primary-foreground rounded-r-none hover:bg-primary-hover",
        rangeEnd: "bg-primary text-primary-foreground rounded-l-none hover:bg-primary-hover",
        rangeMiddle: "bg-primary/15 text-foreground rounded-none hover:bg-primary/25",
        outsideMonth: "text-muted-foreground opacity-50",
        disabled: ""
      }
    },
    defaultVariants: {
      state: "default"
    }
  }
);
function ChevronLeft({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m15 18-6-6 6-6" })
    }
  );
}
function ChevronRight({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m9 18 6-6-6-6" })
    }
  );
}
var Calendar = React.forwardRef(
  function Calendar2({
    mode = "single",
    selected,
    selectedRange,
    onSelect,
    onSelectRange,
    defaultMonth,
    month: controlledMonth,
    onMonthChange,
    disabledDate,
    disabledDates = [],
    minDate,
    maxDate,
    showWeekNumbers = false,
    className,
    ...rest
  }, ref) {
    const shouldReduce = framerMotion.useReducedMotion();
    const id = React.useId();
    const [internalMonth, setInternalMonth] = React.useState(
      () => startOfMonth(defaultMonth ?? controlledMonth ?? /* @__PURE__ */ new Date())
    );
    const currentMonth = controlledMonth ? startOfMonth(controlledMonth) : internalMonth;
    const [direction, setDirection] = React.useState(
      "forward"
    );
    const monthKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;
    const [rangeAnchor, setRangeAnchor] = React.useState(null);
    const [hoverDate, setHoverDate] = React.useState(null);
    const navigateMonth = React.useCallback(
      (delta) => {
        setDirection(delta > 0 ? "forward" : "backward");
        const next = addMonths(currentMonth, delta);
        if (controlledMonth) {
          onMonthChange?.(next);
        } else {
          setInternalMonth(next);
          onMonthChange?.(next);
        }
      },
      [currentMonth, controlledMonth, onMonthChange]
    );
    const isDisabled = React.useCallback(
      (date) => {
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;
        if (disabledDate?.(date)) return true;
        if (disabledDates.some((d) => isSameDay(d, date))) return true;
        return false;
      },
      [minDate, maxDate, disabledDate, disabledDates]
    );
    const getEffectiveRange = React.useCallback(() => {
      if (mode !== "range") return null;
      if (selectedRange) return selectedRange;
      if (rangeAnchor && hoverDate) {
        const from = rangeAnchor <= hoverDate ? rangeAnchor : hoverDate;
        const to = rangeAnchor <= hoverDate ? hoverDate : rangeAnchor;
        return { from, to };
      }
      return null;
    }, [mode, selectedRange, rangeAnchor, hoverDate]);
    const getDayState = React.useCallback(
      (date) => {
        if (!date) return "default";
        if (isDisabled(date)) return "disabled";
        if (!isSameMonth(date, currentMonth)) return "outsideMonth";
        if (mode === "single" && selected && isSameDay(date, selected)) {
          return "selected";
        }
        if (mode === "range") {
          const range = getEffectiveRange();
          if (range) {
            if (isSameDay(date, range.from)) return "rangeStart";
            if (range.to && isSameDay(date, range.to)) return "rangeEnd";
            if (range.to && date > range.from && date < range.to) {
              return "rangeMiddle";
            }
          }
        }
        if (isSameDay(date, /* @__PURE__ */ new Date())) return "today";
        return "default";
      },
      [mode, selected, currentMonth, isDisabled, getEffectiveRange]
    );
    const handleDayClick = React.useCallback(
      (date) => {
        if (isDisabled(date)) return;
        if (mode === "single") {
          onSelect?.(date);
        } else {
          if (!rangeAnchor) {
            setRangeAnchor(date);
          } else {
            const from = rangeAnchor <= date ? rangeAnchor : date;
            const to = rangeAnchor <= date ? date : rangeAnchor;
            onSelectRange?.({ from, to });
            setRangeAnchor(null);
            setHoverDate(null);
          }
        }
      },
      [mode, rangeAnchor, isDisabled, onSelect, onSelectRange]
    );
    const focusedDateRef = React.useRef(
      selected ?? selectedRange?.from ?? /* @__PURE__ */ new Date()
    );
    const handleKeyDown = React.useCallback(
      (e) => {
        const focused = focusedDateRef.current;
        let next = null;
        switch (e.key) {
          case "ArrowRight":
            next = new Date(focused.getTime() + 864e5);
            break;
          case "ArrowLeft":
            next = new Date(focused.getTime() - 864e5);
            break;
          case "ArrowDown":
            next = new Date(focused.getTime() + 7 * 864e5);
            break;
          case "ArrowUp":
            next = new Date(focused.getTime() - 7 * 864e5);
            break;
          case "Home":
            next = startOfMonth(focused);
            break;
          case "End":
            next = endOfMonth(focused);
            break;
          case "PageUp":
            next = addMonths(focused, -1);
            break;
          case "PageDown":
            next = addMonths(focused, 1);
            break;
          default:
            return;
        }
        if (next) {
          e.preventDefault();
          focusedDateRef.current = next;
          if (!isSameMonth(next, currentMonth)) {
            navigateMonth(next > currentMonth ? 1 : -1);
          }
          const btn = document.getElementById(
            `${id}-day-${next.toISOString().slice(0, 10)}`
          );
          btn?.focus();
        }
      },
      [currentMonth, navigateMonth, id]
    );
    const weeks = buildCalendarGrid(
      currentMonth.getFullYear(),
      currentMonth.getMonth()
    );
    function getWeekNumber(date) {
      const d = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      return Math.ceil(
        ((d.getTime() - yearStart.getTime()) / 864e5 + 1) / 7
      );
    }
    const motionVariants = {
      initial: shouldReduce ? { opacity: 0 } : { opacity: 0, x: direction === "forward" ? 20 : -20 },
      animate: { opacity: 1, x: 0 },
      exit: shouldReduce ? { opacity: 0 } : { opacity: 0, x: direction === "forward" ? -20 : 20 }
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        role: "application",
        className: chunk4ON3M3OM_cjs.cn(
          "inline-flex flex-col gap-3 p-3 rounded-lg border border-border bg-background select-none",
          className
        ),
        "data-ds": "",
        "data-ds-component": "calendar",
        "data-ds-mode": mode,
        onKeyDown: handleKeyDown,
        ...rest,
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between gap-2 px-1", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                onClick: () => navigateMonth(-1),
                className: chunk4ON3M3OM_cjs.cn(
                  "inline-flex items-center justify-center size-7 rounded-md",
                  "text-muted-foreground hover:text-foreground hover:bg-accent",
                  "transition-colors duration-fast",
                  chunk3EHT6IOA_cjs.focusRingClasses
                ),
                "aria-label": "Previous month",
                children: /* @__PURE__ */ jsxRuntime.jsx(ChevronLeft, { className: "size-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1 text-center text-sm font-semibold leading-none", children: [
              MONTHS[currentMonth.getMonth()],
              " ",
              currentMonth.getFullYear()
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                onClick: () => navigateMonth(1),
                className: chunk4ON3M3OM_cjs.cn(
                  "inline-flex items-center justify-center size-7 rounded-md",
                  "text-muted-foreground hover:text-foreground hover:bg-accent",
                  "transition-colors duration-fast",
                  chunk3EHT6IOA_cjs.focusRingClasses
                ),
                "aria-label": "Next month",
                children: /* @__PURE__ */ jsxRuntime.jsx(ChevronRight, { className: "size-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { mode: "wait", initial: false, children: /* @__PURE__ */ jsxRuntime.jsxs(
            framerMotion.motion.div,
            {
              variants: motionVariants,
              initial: "initial",
              animate: "animate",
              exit: "exit",
              transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
              "data-ds-animated": "",
              children: [
                /* @__PURE__ */ jsxRuntime.jsxs(
                  "div",
                  {
                    role: "row",
                    className: chunk4ON3M3OM_cjs.cn(
                      "grid gap-1 mb-1",
                      showWeekNumbers ? "grid-cols-8" : "grid-cols-7"
                    ),
                    children: [
                      showWeekNumbers && /* @__PURE__ */ jsxRuntime.jsx(
                        "div",
                        {
                          className: "w-9 h-8 flex items-center justify-center text-xs text-muted-foreground font-medium",
                          "aria-hidden": "true",
                          children: "W"
                        }
                      ),
                      DAYS_OF_WEEK.map((day) => /* @__PURE__ */ jsxRuntime.jsx(
                        "div",
                        {
                          role: "columnheader",
                          "aria-label": day,
                          className: "w-9 h-8 flex items-center justify-center text-xs text-muted-foreground font-medium",
                          children: day
                        },
                        day
                      ))
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  "div",
                  {
                    role: "grid",
                    "aria-label": `${MONTHS[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`,
                    children: weeks.map((week, weekIdx) => /* @__PURE__ */ jsxRuntime.jsxs(
                      "div",
                      {
                        role: "row",
                        className: chunk4ON3M3OM_cjs.cn(
                          "grid gap-1",
                          showWeekNumbers ? "grid-cols-8" : "grid-cols-7"
                        ),
                        children: [
                          showWeekNumbers && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-9 h-9 flex items-center justify-center text-xs text-muted-foreground/60", children: week[0] ? getWeekNumber(week[0]) : "" }),
                          week.map((date, dayIdx) => {
                            if (!date) {
                              return /* @__PURE__ */ jsxRuntime.jsx(
                                "div",
                                {
                                  role: "gridcell",
                                  "aria-hidden": "true",
                                  className: "w-9 h-9"
                                },
                                `empty-${weekIdx}-${dayIdx}`
                              );
                            }
                            const dayState = getDayState(date);
                            const disabled = dayState === "disabled";
                            const dateStr = date.toISOString().slice(0, 10);
                            const isSelected = dayState === "selected" || dayState === "rangeStart" || dayState === "rangeEnd";
                            return /* @__PURE__ */ jsxRuntime.jsx(
                              "div",
                              {
                                role: "gridcell",
                                "aria-selected": isSelected ? "true" : void 0,
                                "aria-disabled": disabled ? "true" : void 0,
                                children: /* @__PURE__ */ jsxRuntime.jsx(
                                  framerMotion.motion.button,
                                  {
                                    id: `${id}-day-${dateStr}`,
                                    type: "button",
                                    className: chunk4ON3M3OM_cjs.cn(
                                      calendarDayVariants({ state: dayState })
                                    ),
                                    onClick: () => handleDayClick(date),
                                    onMouseEnter: () => mode === "range" && rangeAnchor && setHoverDate(date),
                                    onMouseLeave: () => mode === "range" && rangeAnchor && setHoverDate(null),
                                    disabled,
                                    "aria-label": date.toLocaleDateString("en-US", {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric"
                                    }),
                                    tabIndex: isSameDay(date, focusedDateRef.current ?? date) ? 0 : -1,
                                    whileHover: !disabled && !shouldReduce ? {
                                      scale: 1.08,
                                      transition: {
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25
                                      }
                                    } : void 0,
                                    whileTap: !disabled && !shouldReduce ? {
                                      scale: 0.95,
                                      transition: {
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30
                                      }
                                    } : void 0,
                                    children: date.getDate()
                                  }
                                )
                              },
                              dateStr
                            );
                          })
                        ]
                      },
                      week.find((d) => d !== null)?.toISOString().slice(0, 10) ?? `week-${weekIdx}`
                    ))
                  }
                )
              ]
            },
            monthKey
          ) }) })
        ]
      }
    );
  }
);
Calendar.displayName = "Calendar";
var CardContext = React.createContext({ padding: "compact" });
function useCardContext() {
  return React.useContext(CardContext);
}
var slotPaddingXMap = {
  compact: "px-(--ds-padding-card)",
  comfortable: "px-6"
};
var cardVerticalPaddingMap = {
  compact: "py-(--ds-padding-card)",
  comfortable: "py-6"
};
var cardGapMap = {
  compact: "gap-(--ds-gap-default,0.75rem)",
  comfortable: "gap-4"
};
var cardVariants = classVarianceAuthority.cva(
  // Base styles — shared across all variants
  [
    // Layout
    "flex flex-col",
    // Shape
    "rounded-md",
    // Overflow
    "overflow-hidden",
    // Typography defaults
    "text-sm text-foreground"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Visual Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Default — subtle background with border.
         * The most common card style, blends into the page.
         */
        default: ["bg-surface", "border border-border"],
        /**
         * Outlined — transparent background with stronger border.
         * Use when the card sits on a colored or complex background.
         */
        outlined: ["bg-transparent", "border border-border-strong"],
        /**
         * Elevated — raised card with shadow.
         * Use to draw attention or lift content above the page surface.
         */
        elevated: [
          "bg-surface-raised",
          "border border-border-muted",
          "shadow-md"
        ],
        /**
         * Interactive — clickable card with hover/focus states.
         * Includes hover lift animation and cursor pointer.
         * Renders well as <a>, <button>, or <Link>.
         */
        interactive: [
          "bg-surface",
          "border border-border",
          // Transition
          "transition-[border-color,box-shadow,transform]",
          "duration-normal ease-standard",
          // Hover
          "hover:border-border-strong",
          "hover:shadow-md",
          "hover:-translate-y-0.5",
          // Active / press
          "active:translate-y-0 active:shadow-sm",
          // Focus
          chunk3EHT6IOA_cjs.focusRingClasses,
          // Cursor
          "cursor-pointer",
          // Remove text decoration for anchor usage
          "no-underline"
        ]
      },
      // -----------------------------------------------------------------
      // Full Width
      // -----------------------------------------------------------------
      fullWidth: {
        true: "w-full",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      fullWidth: false
    }
  }
);
var Card = React.forwardRef(function Card2({
  variant = "default",
  padding = "compact",
  fullWidth = false,
  as: Component = "div",
  className,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(CardContext.Provider, { value: { padding }, children: /* @__PURE__ */ jsxRuntime.jsx(
    Component,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "not-prose",
        cardVariants({ variant, fullWidth }),
        cardVerticalPaddingMap[padding],
        cardGapMap[padding],
        className
      ),
      "data-ds": "",
      "data-ds-component": "card",
      "data-ds-variant": variant,
      ...rest,
      children
    }
  ) });
});
Card.displayName = "Card";
var alignMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between"
};
var CardHeader = React.forwardRef(
  function CardHeader2({ bordered = true, className, children, ...rest }, ref) {
    const { padding } = useCardContext();
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(
          "flex flex-col gap-1.5",
          slotPaddingXMap[padding],
          bordered && "pb-(--ds-padding-card) border-b border-border-muted",
          className
        ),
        "data-ds": "",
        "data-ds-component": "card-header",
        ...rest,
        children
      }
    );
  }
);
CardHeader.displayName = "CardHeader";
var CardBody = React.forwardRef(
  function CardBody2({ className, children, ...rest }, ref) {
    const { padding } = useCardContext();
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(
          "flex flex-col gap-2 flex-1",
          slotPaddingXMap[padding],
          className
        ),
        "data-ds": "",
        "data-ds-component": "card-body",
        ...rest,
        children
      }
    );
  }
);
CardBody.displayName = "CardBody";
var CardFooter = React.forwardRef(
  function CardFooter2({ bordered = true, align = "end", className, children, ...rest }, ref) {
    const { padding } = useCardContext();
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(
          "flex items-center gap-2",
          slotPaddingXMap[padding],
          bordered && "pt-(--ds-padding-card) border-t border-border-muted",
          alignMap[align],
          className
        ),
        "data-ds": "",
        "data-ds-component": "card-footer",
        ...rest,
        children
      }
    );
  }
);
CardFooter.displayName = "CardFooter";
var CarouselContext = React.createContext({
  current: 0,
  total: 0,
  prev: () => {
  },
  next: () => {
  },
  goTo: () => {
  },
  direction: "right",
  orientation: "horizontal"
});
function useCarouselContext() {
  return React.useContext(CarouselContext);
}
function ChevronLeftIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m15 18-6-6 6-6" })
    }
  );
}
function ChevronRightIcon2({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m9 18 6-6-6-6" })
    }
  );
}
var Carousel = React.forwardRef(
  function Carousel2({
    items,
    defaultIndex = 0,
    index: controlledIndex,
    onIndexChange,
    orientation = "horizontal",
    autoplay = false,
    autoplayInterval = 3e3,
    loop = true,
    showArrows = true,
    showDots = true,
    className,
    itemClassName
  }, ref) {
    const shouldReduce = framerMotion.useReducedMotion();
    const [internalIndex, setInternalIndex] = React.useState(defaultIndex);
    const [direction, setDirection] = React.useState("right");
    const autoplayRef = React.useRef(null);
    const current = controlledIndex !== void 0 ? controlledIndex : internalIndex;
    const total = items.length;
    const goTo = React.useCallback(
      (i, dir) => {
        const next2 = loop ? (i % total + total) % total : Math.max(0, Math.min(total - 1, i));
        const resolvedDir = dir ?? (next2 > current ? "right" : "left");
        setDirection(resolvedDir);
        if (controlledIndex === void 0) setInternalIndex(next2);
        onIndexChange?.(next2);
      },
      [current, total, loop, controlledIndex, onIndexChange]
    );
    const prev = React.useCallback(() => goTo(current - 1, "left"), [current, goTo]);
    const next = React.useCallback(() => goTo(current + 1, "right"), [current, goTo]);
    React.useEffect(() => {
      if (!autoplay) return;
      autoplayRef.current = setInterval(next, autoplayInterval);
      return () => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
      };
    }, [autoplay, autoplayInterval, next]);
    const isHorizontal = orientation === "horizontal";
    const slideVariants = {
      initial: shouldReduce ? { opacity: 0 } : {
        opacity: 0,
        x: isHorizontal ? direction === "right" ? "100%" : "-100%" : 0,
        y: !isHorizontal ? direction === "right" ? "100%" : "-100%" : 0
      },
      animate: { opacity: 1, x: 0, y: 0 },
      exit: shouldReduce ? { opacity: 0 } : {
        opacity: 0,
        x: isHorizontal ? direction === "right" ? "-100%" : "100%" : 0,
        y: !isHorizontal ? direction === "right" ? "-100%" : "100%" : 0
      }
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      CarouselContext.Provider,
      {
        value: { current, total, prev, next, goTo, direction, orientation },
        children: /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            ref,
            className: chunk4ON3M3OM_cjs.cn("relative overflow-hidden rounded-lg", className),
            "data-ds": "",
            "data-ds-component": "carousel",
            "data-ds-orientation": orientation,
            role: "region",
            "aria-roledescription": "carousel",
            "aria-label": "Content carousel",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative overflow-hidden", children: /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { mode: "wait", initial: false, custom: direction, children: /* @__PURE__ */ jsxRuntime.jsx(
                framerMotion.motion.div,
                {
                  className: chunk4ON3M3OM_cjs.cn("w-full", itemClassName),
                  variants: slideVariants,
                  initial: "initial",
                  animate: "animate",
                  exit: "exit",
                  transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                  "aria-roledescription": "slide",
                  "aria-label": `Slide ${current + 1} of ${total}`,
                  "data-ds-animated": "",
                  children: items[current]
                },
                current
              ) }) }),
              showArrows && total > 1 && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: prev,
                    disabled: !loop && current === 0,
                    className: chunk4ON3M3OM_cjs.cn(
                      "absolute left-3 top-1/2 -translate-y-1/2 z-10",
                      "inline-flex items-center justify-center size-9 rounded-full",
                      "bg-background/90 border border-border shadow-sm",
                      "text-foreground hover:bg-background",
                      "transition-colors duration-fast",
                      "disabled:opacity-30 disabled:pointer-events-none",
                      chunk3EHT6IOA_cjs.focusRingClasses
                    ),
                    "aria-label": "Previous slide",
                    children: /* @__PURE__ */ jsxRuntime.jsx(ChevronLeftIcon, { className: "size-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: next,
                    disabled: !loop && current === total - 1,
                    className: chunk4ON3M3OM_cjs.cn(
                      "absolute right-3 top-1/2 -translate-y-1/2 z-10",
                      "inline-flex items-center justify-center size-9 rounded-full",
                      "bg-background/90 border border-border shadow-sm",
                      "text-foreground hover:bg-background",
                      "transition-colors duration-fast",
                      "disabled:opacity-30 disabled:pointer-events-none",
                      chunk3EHT6IOA_cjs.focusRingClasses
                    ),
                    "aria-label": "Next slide",
                    children: /* @__PURE__ */ jsxRuntime.jsx(ChevronRightIcon2, { className: "size-4" })
                  }
                )
              ] }),
              showDots && total > 1 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10", children: Array.from({ length: total }, (_, i) => /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => goTo(i),
                  "aria-label": `Go to slide ${i + 1}`,
                  "aria-current": i === current ? "true" : void 0,
                  className: chunk4ON3M3OM_cjs.cn(
                    "rounded-full transition-all duration-fast",
                    "bg-background/80 hover:bg-background",
                    i === current ? "w-4 h-2" : "size-2 opacity-60 hover:opacity-100",
                    chunk3EHT6IOA_cjs.focusRingClasses
                  )
                },
                `slide-${i}`
              )) })
            ]
          }
        )
      }
    );
  }
);
Carousel.displayName = "Carousel";
var checkboxVariants = classVarianceAuthority.cva(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "inline-flex shrink-0 items-center justify-center",
    // Shape
    "rounded-sm",
    // Border
    "border",
    // Colors — unchecked state
    "border-input bg-background",
    // Transition
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    // Focus ring — WCAG AA compliant
    chunk3EHT6IOA_cjs.focusRingClasses,
    // Hover
    "hover:border-border-strong",
    // Checked state
    "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground",
    "data-[state=checked]:hover:bg-primary-hover data-[state=checked]:hover:border-primary-hover",
    // Indeterminate state
    "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground",
    "data-[state=indeterminate]:hover:bg-primary-hover data-[state=indeterminate]:hover:border-primary-hover",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    // Cursor
    "cursor-pointer disabled:cursor-not-allowed",
    // Peer for label styling
    "peer"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — compact for dense UIs, tables, settings panels.
         * Box: 16px (size-4)
         */
        sm: "size-4",
        /**
         * Medium — default size for most forms.
         * Box: 18px (size-[18px])
         */
        md: "size-[18px]"
      },
      // -----------------------------------------------------------------
      // Error Variant
      // -----------------------------------------------------------------
      error: {
        true: [
          "border-danger",
          "data-[state=unchecked]:border-danger",
          "focus-visible:border-danger"
        ],
        false: ""
      }
    },
    defaultVariants: {
      size: "md",
      error: false
    }
  }
);
var iconSizeMap = {
  sm: "size-3",
  md: "size-3.5"
};
function CheckIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "3",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M20 6 9 17l-5-5" })
    }
  );
}
function IndeterminateIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "3",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M5 12h14" })
    }
  );
}
var Checkbox = React.forwardRef(function Checkbox2({
  size = "md",
  error = false,
  label,
  description,
  wrapperClassName,
  labelClassName,
  className,
  id: idProp,
  disabled,
  checked,
  "aria-invalid": ariaInvalid,
  ...rest
}, ref) {
  const generatedId = React.useId();
  const id = idProp ?? generatedId;
  const descriptionId = description ? `${id}-description` : void 0;
  const resolvedAriaInvalid = ariaInvalid !== void 0 ? ariaInvalid : error ? true : void 0;
  const labelTextClass = size === "sm" ? "text-xs" : "text-sm";
  const descriptionTextClass = "text-xs";
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: chunk4ON3M3OM_cjs.cn(
        "flex items-start gap-2",
        disabled && "cursor-not-allowed opacity-50",
        wrapperClassName
      ),
      "data-ds": "",
      "data-ds-component": "checkbox",
      "data-ds-size": size,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          radixUi.Checkbox.Root,
          {
            ref,
            id,
            checked,
            disabled,
            "aria-invalid": resolvedAriaInvalid,
            "aria-describedby": descriptionId,
            className: chunk4ON3M3OM_cjs.cn(
              checkboxVariants({ size, error }),
              // Slight top offset to align with label text baseline
              label && "mt-0.5",
              className
            ),
            ...rest,
            children: /* @__PURE__ */ jsxRuntime.jsx(
              radixUi.Checkbox.Indicator,
              {
                className: chunk4ON3M3OM_cjs.cn(
                  "flex items-center justify-center",
                  // Animate the indicator
                  "data-[state=checked]:animate-in data-[state=checked]:zoom-in-75",
                  "data-[state=unchecked]:animate-out data-[state=unchecked]:zoom-out-75"
                ),
                children: checked === "indeterminate" ? /* @__PURE__ */ jsxRuntime.jsx(IndeterminateIcon, { className: iconSizeMap[size] }) : /* @__PURE__ */ jsxRuntime.jsx(CheckIcon, { className: iconSizeMap[size] })
              }
            )
          }
        ),
        (label || description) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-0.5 flex-1 min-w-0", children: [
          label && /* @__PURE__ */ jsxRuntime.jsx(
            "label",
            {
              htmlFor: id,
              className: chunk4ON3M3OM_cjs.cn(
                labelTextClass,
                "leading-5 font-medium",
                "text-foreground",
                "cursor-pointer select-none",
                "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                error && "text-danger",
                labelClassName
              ),
              children: label
            }
          ),
          description && /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              id: descriptionId,
              className: chunk4ON3M3OM_cjs.cn(
                descriptionTextClass,
                "leading-4 text-muted-foreground"
              ),
              children: description
            }
          )
        ] })
      ]
    }
  );
});
Checkbox.displayName = "Checkbox";
var CheckboxGroupContext = React.createContext({});
function useCheckboxGroupContext() {
  return React.useContext(CheckboxGroupContext);
}
function CheckboxGroup({
  label,
  description,
  orientation = "vertical",
  size,
  disabled = false,
  error = false,
  errorMessage,
  children,
  className
}) {
  const groupId = React.useId();
  const labelId = label ? `${groupId}-label` : void 0;
  const descriptionId = description ? `${groupId}-description` : void 0;
  const errorId = errorMessage ? `${groupId}-error` : void 0;
  const contextValue = {
    size,
    disabled,
    error
  };
  return /* @__PURE__ */ jsxRuntime.jsx(CheckboxGroupContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxRuntime.jsxs(
    "fieldset",
    {
      "aria-labelledby": labelId,
      "aria-describedby": chunk4ON3M3OM_cjs.cn(descriptionId ?? "", errorId ?? "").trim() || void 0,
      "aria-invalid": error || void 0,
      disabled,
      className: chunk4ON3M3OM_cjs.cn("flex flex-col gap-2", className),
      "data-ds": "",
      "data-ds-component": "checkbox-group",
      children: [
        label && /* @__PURE__ */ jsxRuntime.jsx(
          "legend",
          {
            id: labelId,
            className: chunk4ON3M3OM_cjs.cn(
              "text-sm font-medium leading-5 text-foreground",
              error && "text-danger"
            ),
            children: label
          }
        ),
        description && /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            id: descriptionId,
            className: "text-xs leading-4 text-muted-foreground",
            children: description
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: chunk4ON3M3OM_cjs.cn(
              "flex",
              orientation === "vertical" ? "flex-col gap-2" : "flex-row gap-4"
            ),
            children
          }
        ),
        error && errorMessage && /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            id: errorId,
            className: "text-xs leading-4 text-danger",
            role: "alert",
            children: errorMessage
          }
        )
      ]
    }
  ) });
}
CheckboxGroup.displayName = "CheckboxGroup";

// src/components/code-highlight.ts
var TOKEN_COLORS = {
  keyword: "var(--code-keyword)",
  string: "var(--code-string)",
  comment: "var(--code-comment)",
  number: "var(--code-number)",
  operator: "var(--code-operator)",
  punctuation: "var(--code-punctuation)",
  function: "var(--code-function)",
  type: "var(--code-type)",
  tag: "var(--code-tag)",
  "attr-name": "var(--code-attr-name)",
  "attr-value": "var(--code-string)",
  // reuse string color
  plain: "var(--code-foreground)",
  component: "var(--code-component)"
};
var JS_KEYWORDS = /* @__PURE__ */ new Set([
  "import",
  "export",
  "from",
  "default",
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "break",
  "continue",
  "new",
  "this",
  "class",
  "extends",
  "super",
  "typeof",
  "instanceof",
  "in",
  "of",
  "try",
  "catch",
  "finally",
  "throw",
  "async",
  "await",
  "yield",
  "null",
  "undefined",
  "true",
  "false",
  "void",
  "delete",
  "as",
  "type",
  "interface",
  "enum",
  "implements",
  "declare",
  "readonly"
]);
var SHELL_KEYWORDS = /* @__PURE__ */ new Set([
  "npm",
  "npx",
  "yarn",
  "pnpm",
  "bun",
  "install",
  "add",
  "run",
  "dev",
  "build",
  "start",
  "test",
  "init",
  "create",
  "exec",
  "sudo",
  "cd",
  "ls",
  "mkdir",
  "rm",
  "cp",
  "mv",
  "cat",
  "echo",
  "git",
  "docker",
  "curl",
  "wget"
]);
function isShellLang(lang) {
  if (!lang) return false;
  const l = lang.toLowerCase();
  return l === "sh" || l === "bash" || l === "zsh" || l === "shell" || l === "terminal";
}
function isJsxLang(lang) {
  if (!lang) return true;
  const l = lang.toLowerCase();
  return l === "tsx" || l === "jsx" || l === "ts" || l === "typescript" || l === "js" || l === "javascript" || l === "react";
}
var RE_SINGLE_LINE_COMMENT = /^(\/\/.*)/;
var RE_BLOCK_COMMENT = /^(\/\*[\s\S]*?\*\/)/;
var RE_TEMPLATE_LITERAL = /^(`(?:[^`\\]|\\.)*`)/;
var RE_DOUBLE_STRING = /^("(?:[^"\\]|\\.)*")/;
var RE_SINGLE_STRING = /^('(?:[^'\\]|\\.)*')/;
var RE_JSX_COMPONENT_WITH_SPACE = /^(<\/?)(\$?[A-Z][$\w.]*)(\s)/;
var RE_JSX_COMPONENT_CLOSED = /^(<\/?)(\$?[A-Z][$\w.]*)(\/?>)/;
var RE_HTML_TAG = /^(<\/?)([\w-]+)(\/?>|\s)/;
var RE_ATTR_NAME = /^([\w-]+)(=)/;
var RE_NUMBER = /^(\b\d+\.?\d*\b)/;
var RE_WORD = /^(\b[\w$]+\b)/;
var RE_OPERATOR = /^([=!<>+\-*/%&|^~?:]+)/;
var RE_PUNCTUATION = /^([{}()[\];,.<>/])/;
var RE_WHITESPACE = /^(\s+)/;
var RE_FOLLOWED_BY_PAREN = /^\s*\(/;
function tokenizeJsx(line) {
  const tokens = [];
  let remaining = line;
  while (remaining.length > 0) {
    let m = remaining.match(RE_SINGLE_LINE_COMMENT);
    if (m) {
      tokens.push({ type: "comment", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_BLOCK_COMMENT);
    if (m) {
      tokens.push({ type: "comment", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_TEMPLATE_LITERAL);
    if (m) {
      tokens.push({ type: "string", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_DOUBLE_STRING);
    if (m) {
      tokens.push({ type: "string", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_SINGLE_STRING);
    if (m) {
      tokens.push({ type: "string", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_JSX_COMPONENT_WITH_SPACE);
    if (m) {
      tokens.push({ type: "punctuation", value: m[1] });
      tokens.push({ type: "component", value: m[2] });
      tokens.push({ type: "plain", value: m[3] });
      remaining = remaining.slice(m[0].length);
      continue;
    }
    m = remaining.match(RE_JSX_COMPONENT_CLOSED);
    if (m) {
      tokens.push({ type: "punctuation", value: m[1] });
      tokens.push({ type: "component", value: m[2] });
      tokens.push({ type: "punctuation", value: m[3] });
      remaining = remaining.slice(m[0].length);
      continue;
    }
    m = remaining.match(RE_HTML_TAG);
    if (m) {
      tokens.push({ type: "punctuation", value: m[1] });
      tokens.push({ type: "tag", value: m[2] });
      tokens.push({
        type: m[3].trim() ? "punctuation" : "plain",
        value: m[3]
      });
      remaining = remaining.slice(m[0].length);
      continue;
    }
    m = remaining.match(RE_ATTR_NAME);
    if (m) {
      tokens.push({ type: "attr-name", value: m[1] });
      tokens.push({ type: "operator", value: m[2] });
      remaining = remaining.slice(m[0].length);
      continue;
    }
    m = remaining.match(RE_NUMBER);
    if (m) {
      tokens.push({ type: "number", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_WORD);
    if (m) {
      const word = m[1];
      if (JS_KEYWORDS.has(word)) {
        tokens.push({ type: "keyword", value: word });
      } else if (/^[A-Z]/.test(word)) {
        tokens.push({ type: "type", value: word });
      } else if (RE_FOLLOWED_BY_PAREN.test(remaining.slice(word.length))) {
        tokens.push({ type: "function", value: word });
      } else {
        tokens.push({ type: "plain", value: word });
      }
      remaining = remaining.slice(word.length);
      continue;
    }
    m = remaining.match(RE_OPERATOR);
    if (m) {
      tokens.push({ type: "operator", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_PUNCTUATION);
    if (m) {
      tokens.push({ type: "punctuation", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_WHITESPACE);
    if (m) {
      tokens.push({ type: "plain", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    {
      tokens.push({ type: "plain", value: remaining[0] });
      remaining = remaining.slice(1);
    }
  }
  return tokens;
}
var RE_SHELL_COMMENT = /^(#.*)/;
var RE_SHELL_FLAG = /^(--?[\w-]+)/;
var RE_SHELL_WORD = /^([@\w./-]+)/;
var RE_SHELL_OPERATOR = /^([|&;><]+)/;
function tokenizeShell(line) {
  const tokens = [];
  let remaining = line;
  while (remaining.length > 0) {
    let m;
    m = remaining.match(RE_SHELL_COMMENT);
    if (m) {
      tokens.push({ type: "comment", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_DOUBLE_STRING);
    if (m) {
      tokens.push({ type: "string", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_SINGLE_STRING);
    if (m) {
      tokens.push({ type: "string", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_SHELL_FLAG);
    if (m) {
      tokens.push({ type: "attr-name", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_SHELL_WORD);
    if (m) {
      const word = m[1];
      if (SHELL_KEYWORDS.has(word)) {
        tokens.push({ type: "keyword", value: word });
      } else {
        tokens.push({ type: "plain", value: word });
      }
      remaining = remaining.slice(word.length);
      continue;
    }
    m = remaining.match(RE_SHELL_OPERATOR);
    if (m) {
      tokens.push({ type: "operator", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_WHITESPACE);
    if (m) {
      tokens.push({ type: "plain", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    tokens.push({ type: "plain", value: remaining[0] });
    remaining = remaining.slice(1);
  }
  return tokens;
}
function tokenizeLine(line, language) {
  if (isShellLang(language)) return tokenizeShell(line);
  if (isJsxLang(language)) return tokenizeJsx(line);
  return tokenizeJsx(line);
}
var inlineCodeVariants = classVarianceAuthority.cva([
  "inline font-mono font-medium rounded",
  "px-[0.3em] py-[0.15em]",
  "bg-muted text-muted-foreground",
  "border border-border/50",
  "text-[0.875em] leading-none"
]);
var codeBlockVariants = classVarianceAuthority.cva(
  [
    "relative rounded-lg overflow-hidden",
    "border border-code-border",
    "bg-code-bg text-code-foreground",
    "font-mono text-sm leading-relaxed"
  ],
  {
    variants: {
      variant: {
        default: "",
        dark: ""
      }
    },
    defaultVariants: { variant: "default" }
  }
);
function CopyIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
      ]
    }
  );
}
function CheckIcon2({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M20 6 9 17l-5-5" })
    }
  );
}
function HighlightedLine({
  line,
  language
}) {
  const tokens = React.useMemo(() => tokenizeLine(line, language), [line, language]);
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: tokens.map((token, i) => /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      style: token.type !== "plain" ? { color: TOKEN_COLORS[token.type] } : void 0,
      children: token.value
    },
    i
  )) });
}
var InlineCode = React.forwardRef(
  function InlineCode2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "code",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(inlineCodeVariants(), className),
        "data-ds": "",
        "data-ds-component": "inline-code",
        ...rest,
        children
      }
    );
  }
);
InlineCode.displayName = "InlineCode";
var CodeBlock = React.forwardRef(
  function CodeBlock2({
    variant = "default",
    language,
    showLineNumbers = false,
    showCopyButton = true,
    filename,
    className,
    children,
    ...rest
  }, ref) {
    const shouldReduce = framerMotion.useReducedMotion();
    const [copied, setCopied] = React.useState(false);
    const handleCopy = React.useCallback(() => {
      const text2 = (typeof children === "string" ? children.replace(/^\n+|\n+$/g, "") : ref && "current" in ref && ref.current ? ref.current.textContent ?? "" : "").trim();
      navigator.clipboard.writeText(text2).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2e3);
      });
    }, [children, ref]);
    const code = typeof children === "string" ? children.replace(/^\n+|\n+$/g, "") : "";
    const lines = code.split("\n");
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        className: chunk4ON3M3OM_cjs.cn(codeBlockVariants({ variant }), className),
        "data-ds": "",
        "data-ds-component": "code-block",
        "data-ds-variant": variant,
        children: [
          (filename || language || showCopyButton) && /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              className: chunk4ON3M3OM_cjs.cn(
                "flex items-center justify-between px-4 py-2 border-b",
                "border-code-header-border bg-code-header-bg"
              ),
              children: [
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                  filename && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs font-medium text-code-header-foreground truncate", children: filename }),
                  language && /* @__PURE__ */ jsxRuntime.jsx(
                    "span",
                    {
                      className: chunk4ON3M3OM_cjs.cn(
                        "text-[10px] px-2 py-0.5 rounded font-mono font-medium leading-none",
                        "bg-code-badge-bg text-code-badge-foreground",
                        "border border-code-badge-border"
                      ),
                      children: language
                    }
                  )
                ] }),
                showCopyButton && /* @__PURE__ */ jsxRuntime.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleCopy,
                    className: chunk4ON3M3OM_cjs.cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs shrink-0",
                      "text-code-copy-foreground hover:text-code-copy-hover-foreground",
                      "hover:bg-code-copy-hover-bg",
                      "transition-colors duration-150",
                      chunk3EHT6IOA_cjs.focusRingClasses
                    ),
                    "aria-label": copied ? "Copied!" : "Copy code",
                    children: /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { mode: "wait", initial: false, children: copied ? /* @__PURE__ */ jsxRuntime.jsxs(
                      framerMotion.motion.span,
                      {
                        className: "flex items-center gap-1",
                        variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.fadeInFast.variants,
                        initial: shouldReduce ? void 0 : "initial",
                        animate: shouldReduce ? void 0 : "animate",
                        exit: shouldReduce ? void 0 : "exit",
                        transition: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.fadeInFast.transition,
                        "data-ds-animated": "",
                        children: [
                          /* @__PURE__ */ jsxRuntime.jsx(CheckIcon2, { className: "size-3.5 text-code-success" }),
                          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-code-success", children: "Copied!" })
                        ]
                      },
                      "check"
                    ) : /* @__PURE__ */ jsxRuntime.jsxs(
                      framerMotion.motion.span,
                      {
                        className: "flex items-center gap-1",
                        variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.fadeInFast.variants,
                        initial: shouldReduce ? void 0 : "initial",
                        animate: shouldReduce ? void 0 : "animate",
                        exit: shouldReduce ? void 0 : "exit",
                        transition: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.fadeInFast.transition,
                        "data-ds-animated": "",
                        children: [
                          /* @__PURE__ */ jsxRuntime.jsx(CopyIcon, { className: "size-3.5" }),
                          /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Copy" })
                        ]
                      },
                      "copy"
                    ) })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            "pre",
            {
              ref,
              className: chunk4ON3M3OM_cjs.cn(
                "overflow-x-auto p-4 m-0",
                "text-[13px] leading-[1.7]",
                "bg-transparent border-0 shadow-none rounded-none"
              ),
              ...rest,
              children: code ? /* @__PURE__ */ jsxRuntime.jsx(
                "code",
                {
                  className: "bg-transparent border-0 p-0 rounded-none shadow-none text-inherit",
                  children: lines.map((line, i) => /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "block", children: [
                    showLineNumbers && /* @__PURE__ */ jsxRuntime.jsx(
                      "span",
                      {
                        className: "inline-block w-8 text-right mr-4 text-code-line-number select-none text-xs",
                        "aria-hidden": "true",
                        children: i + 1
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx(HighlightedLine, { line, language })
                  ] }, i))
                }
              ) : /* @__PURE__ */ jsxRuntime.jsx(
                "code",
                {
                  className: "bg-transparent border-0 p-0 rounded-none shadow-none text-inherit",
                  children
                }
              )
            }
          )
        ]
      }
    );
  }
);
CodeBlock.displayName = "CodeBlock";
var CollapsibleContext = React.createContext({
  open: false,
  contentId: ""
});
function useCollapsibleContext() {
  return React.useContext(CollapsibleContext);
}
var collapseTransition = {
  duration: 0.2,
  ease: [0.25, 0.1, 0.25, 1]
};
var reducedMotionTransition = {
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
  const contentId = React.useId();
  const isControlled = openProp !== void 0;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = isControlled ? openProp : internalOpen;
  const handleOpenChange = React.useCallback(
    (value) => {
      if (!isControlled) {
        setInternalOpen(value);
      }
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(CollapsibleContext.Provider, { value: { open, contentId }, children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Collapsible.Root,
    {
      open,
      onOpenChange: handleOpenChange,
      disabled,
      className: chunk4ON3M3OM_cjs.cn(className),
      "data-ds": "",
      "data-ds-component": "collapsible",
      ...open ? { "data-ds-open": "" } : {},
      ...rest,
      children
    }
  ) });
}
Collapsible.displayName = "Collapsible";
var CollapsibleTrigger = React.forwardRef(function CollapsibleTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Collapsible.Trigger,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(className),
      "data-ds": "",
      "data-ds-component": "collapsible-trigger",
      ...rest
    }
  );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";
var MotionDiv = framerMotion.motion.div;
function AnimatedCollapsibleInner({
  duration = 0.2,
  className,
  children
}) {
  const prefersReduced = framerMotion.useReducedMotion();
  const transition = prefersReduced ? reducedMotionTransition : { ...collapseTransition, duration };
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      className: chunk4ON3M3OM_cjs.cn(className),
      "data-ds": "",
      "data-ds-component": "collapsible-content",
      children
    }
  );
}
var CollapsibleContent = React.forwardRef(function CollapsibleContent2({ duration = 0.2, forceMount = false, className, children, ...rest }, ref) {
  const { open } = useCollapsibleContext();
  if (forceMount) {
    return /* @__PURE__ */ jsxRuntime.jsxs(radixUi.Collapsible.Content, { forceMount: true, ref, ...rest, children: [
      /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntime.jsx(AnimatedCollapsibleInner, { duration, className, children }) }),
      !open && /* @__PURE__ */ jsxRuntime.jsx("div", { style: { height: 0, overflow: "hidden" }, "aria-hidden": "true" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntime.jsx(radixUi.Collapsible.Content, { forceMount: true, ref, ...rest, children: /* @__PURE__ */ jsxRuntime.jsx(AnimatedCollapsibleInner, { duration, className, children }) }) });
});
CollapsibleContent.displayName = "CollapsibleContent";
var comboboxTriggerVariants = classVarianceAuthority.cva(
  [
    "inline-flex items-center justify-between gap-2 w-full",
    "rounded-md border bg-background",
    "text-left",
    "transition-[border-color,box-shadow] duration-fast",
    chunk3EHT6IOA_cjs.focusRingClasses,
    "disabled:pointer-events-none disabled:opacity-50"
  ],
  {
    variants: {
      variant: {
        default: "border-input",
        primary: "border-primary/40"
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-4 text-sm"
      },
      open: {
        true: "border-ring ring-2 ring-ring/20",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      open: false
    }
  }
);
function ChevronsUpDownIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m7 15 5 5 5-5" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m7 9 5-5 5 5" })
      ]
    }
  );
}
function CheckIcon3({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M20 6 9 17l-5-5" })
    }
  );
}
function XIcon2({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
function SearchIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m21 21-4.3-4.3" })
      ]
    }
  );
}
function defaultFilter(option, query) {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  return option.label.toLowerCase().includes(q) || option.value.toLowerCase().includes(q) || (option.description?.toLowerCase().includes(q) ?? false);
}
function MultiTag({ label, onRemove, disabled, size }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "span",
    {
      className: chunk4ON3M3OM_cjs.cn(
        "inline-flex items-center gap-1 rounded",
        "bg-accent text-accent-foreground",
        "font-normal",
        size === "sm" ? "text-xs px-1.5 py-0.5" : "text-xs px-2 py-0.5"
      ),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "max-w-[100px] truncate", children: label }),
        !disabled && /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            onClick: (e) => {
              e.stopPropagation();
              onRemove();
            },
            className: "shrink-0 rounded-sm opacity-60 hover:opacity-100 transition-opacity",
            "aria-label": `Remove ${label}`,
            tabIndex: -1,
            children: /* @__PURE__ */ jsxRuntime.jsx(XIcon2, { className: "size-3" })
          }
        )
      ]
    }
  );
}
var iconSizeMap2 = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4"
};
var Combobox = React.forwardRef(
  function Combobox2({
    options,
    groups,
    value: controlledValue,
    values: controlledValues,
    defaultValue,
    defaultValues,
    onSelect,
    onMultiSelect,
    multi = false,
    searchable = true,
    placeholder = "Select...",
    searchPlaceholder = "Search...",
    emptyMessage = "No results found.",
    variant = "default",
    size = "md",
    disabled = false,
    clearable = true,
    maxHeight = "240px",
    filterOption,
    renderOption,
    renderValue,
    align = "start",
    matchWidth = true,
    className,
    contentClassName
  }, ref) {
    const shouldReduce = framerMotion.useReducedMotion();
    const id = React.useId();
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [activeIndex, setActiveIndex] = React.useState(-1);
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? ""
    );
    const [internalValues, setInternalValues] = React.useState(
      defaultValues ?? []
    );
    const selectedValue = multi ? null : controlledValue !== void 0 ? controlledValue : internalValue;
    const selectedValues = multi ? controlledValues !== void 0 ? controlledValues : internalValues : [];
    const optionMap = new Map(options.map((o) => [o.value, o]));
    const selectedOption = selectedValue ? optionMap.get(selectedValue) ?? null : null;
    const selectedOptions = selectedValues.map((v) => optionMap.get(v)).filter(Boolean);
    const resolvedFilter = filterOption ?? defaultFilter;
    const filteredOptions = query ? options.filter((o) => resolvedFilter(o, query)) : options;
    const groupedOptions = [];
    if (groups && groups.length > 0) {
      const ungrouped = filteredOptions.filter((o) => !o.group);
      if (ungrouped.length > 0) {
        groupedOptions.push({ options: ungrouped });
      }
      for (const group of groups) {
        const groupOpts = filteredOptions.filter(
          (o) => o.group === group.value
        );
        if (groupOpts.length > 0) {
          groupedOptions.push({ group, options: groupOpts });
        }
      }
    } else {
      groupedOptions.push({ options: filteredOptions });
    }
    const flatFiltered = groupedOptions.flatMap((g) => g.options);
    React.useEffect(() => {
      setActiveIndex(-1);
    }, [query]);
    const searchRef = React.useRef(null);
    React.useEffect(() => {
      if (open && searchable) {
        setTimeout(() => searchRef.current?.focus(), 10);
      }
      if (!open) {
        setQuery("");
        setActiveIndex(-1);
      }
    }, [open, searchable]);
    const handleSelect = React.useCallback(
      (optionValue) => {
        if (multi) {
          const isSelected = selectedValues.includes(optionValue);
          const next = isSelected ? selectedValues.filter((v) => v !== optionValue) : [...selectedValues, optionValue];
          if (controlledValues === void 0) {
            setInternalValues(next);
          }
          onMultiSelect?.(next);
        } else {
          const isSame = selectedValue === optionValue;
          const next = isSame ? "" : optionValue;
          if (controlledValue === void 0) {
            setInternalValue(next);
          }
          onSelect?.(isSame ? null : optionValue);
          setOpen(false);
        }
      },
      [
        multi,
        selectedValues,
        selectedValue,
        controlledValues,
        controlledValue,
        onMultiSelect,
        onSelect
      ]
    );
    const handleClear = React.useCallback(
      (e) => {
        e.stopPropagation();
        if (multi) {
          if (controlledValues === void 0) setInternalValues([]);
          onMultiSelect?.([]);
        } else {
          if (controlledValue === void 0) setInternalValue("");
          onSelect?.(null);
        }
      },
      [multi, controlledValues, controlledValue, onMultiSelect, onSelect]
    );
    const hasValue = multi ? selectedValues.length > 0 : !!selectedValue;
    const handleDropdownKeyDown = React.useCallback(
      (e) => {
        if (!open) return;
        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            setActiveIndex(
              (prev) => prev < flatFiltered.length - 1 ? prev + 1 : 0
            );
            break;
          case "ArrowUp":
            e.preventDefault();
            setActiveIndex(
              (prev) => prev > 0 ? prev - 1 : flatFiltered.length - 1
            );
            break;
          case "Enter":
            e.preventDefault();
            if (activeIndex >= 0 && flatFiltered[activeIndex]) {
              const opt = flatFiltered[activeIndex];
              if (!opt.disabled) {
                handleSelect(opt.value);
              }
            }
            break;
          case "Escape":
            setOpen(false);
            break;
          case "Tab":
            setOpen(false);
            break;
        }
      },
      [open, flatFiltered, activeIndex, handleSelect]
    );
    const triggerContent = (() => {
      if (renderValue) {
        return renderValue(multi ? selectedOptions : selectedOption);
      }
      if (multi) {
        if (selectedOptions.length === 0) {
          return /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground truncate", children: placeholder });
        }
        return /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex flex-wrap gap-1 flex-1 min-w-0 overflow-hidden", children: selectedOptions.map((opt) => /* @__PURE__ */ jsxRuntime.jsx(
          MultiTag,
          {
            label: opt.label,
            size,
            disabled,
            onRemove: () => handleSelect(opt.value)
          },
          opt.value
        )) });
      }
      return selectedOption ? /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex items-center gap-2 min-w-0 flex-1 truncate", children: [
        selectedOption.icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0", children: selectedOption.icon }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", children: selectedOption.label })
      ] }) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground truncate flex-1", children: placeholder });
    })();
    return /* @__PURE__ */ jsxRuntime.jsxs(radixUi.Popover.Root, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsxRuntime.jsx(radixUi.Popover.Trigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          ref,
          type: "button",
          disabled,
          role: "combobox",
          "aria-expanded": open,
          "aria-haspopup": "listbox",
          "aria-controls": open ? `${id}-listbox` : void 0,
          className: chunk4ON3M3OM_cjs.cn(
            comboboxTriggerVariants({ variant, size, open }),
            multi && "min-h-9 h-auto py-1.5 flex-wrap",
            className
          ),
          "data-ds": "",
          "data-ds-component": "combobox",
          "data-ds-variant": variant,
          "data-ds-size": size,
          "data-ds-multi": multi ? "" : void 0,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex items-center gap-1.5 flex-1 min-w-0 overflow-hidden", children: triggerContent }),
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex items-center gap-1 shrink-0 ml-1", children: [
              clearable && hasValue && /* @__PURE__ */ jsxRuntime.jsx(
                "span",
                {
                  role: "button",
                  tabIndex: -1,
                  onClick: handleClear,
                  onKeyDown: (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleClear(e);
                    }
                  },
                  className: chunk4ON3M3OM_cjs.cn(
                    "inline-flex items-center justify-center rounded-sm",
                    "text-muted-foreground hover:text-foreground",
                    "transition-colors duration-fast",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  ),
                  "aria-label": "Clear selection",
                  children: /* @__PURE__ */ jsxRuntime.jsx(XIcon2, { className: iconSizeMap2[size] })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                ChevronsUpDownIcon,
                {
                  className: chunk4ON3M3OM_cjs.cn(
                    iconSizeMap2[size],
                    "text-muted-foreground transition-transform duration-fast",
                    open && "rotate-180"
                  )
                }
              )
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(radixUi.Popover.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntime.jsx(
        radixUi.Popover.Content,
        {
          asChild: true,
          align,
          sideOffset: 6,
          forceMount: true,
          onKeyDown: handleDropdownKeyDown,
          onInteractOutside: () => setOpen(false),
          onEscapeKeyDown: () => setOpen(false),
          style: matchWidth ? { width: "var(--radix-popover-trigger-width)" } : void 0,
          children: /* @__PURE__ */ jsxRuntime.jsxs(
            framerMotion.motion.div,
            {
              id: `${id}-listbox`,
              className: chunk4ON3M3OM_cjs.cn(
                "z-popover overflow-hidden rounded-md border border-border bg-popover shadow-lg",
                "outline-none",
                contentClassName
              ),
              variants: chunkF4JJFWWU_cjs.scaleIn.variants,
              initial: shouldReduce ? { opacity: 0 } : "initial",
              animate: "animate",
              exit: shouldReduce ? { opacity: 0 } : "exit",
              transition: chunkF4JJFWWU_cjs.scaleIn.transition,
              "data-ds-animated": "",
              children: [
                searchable && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center border-b border-border px-3 gap-2", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(SearchIcon, { className: "size-4 shrink-0 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    "input",
                    {
                      ref: searchRef,
                      type: "text",
                      value: query,
                      onChange: (e) => setQuery(e.target.value),
                      placeholder: searchPlaceholder,
                      className: chunk4ON3M3OM_cjs.cn(
                        "flex-1 h-9 bg-transparent outline-none",
                        "text-sm placeholder:text-muted-foreground",
                        "text-foreground"
                      ),
                      "aria-label": searchPlaceholder,
                      autoComplete: "off",
                      autoCorrect: "off",
                      autoCapitalize: "off",
                      spellCheck: false
                    }
                  ),
                  query && /* @__PURE__ */ jsxRuntime.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setQuery(""),
                      className: "text-muted-foreground hover:text-foreground transition-colors",
                      "aria-label": "Clear search",
                      tabIndex: -1,
                      children: /* @__PURE__ */ jsxRuntime.jsx(XIcon2, { className: "size-3.5" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  "div",
                  {
                    role: "listbox",
                    "aria-multiselectable": multi,
                    "aria-label": placeholder,
                    className: "overflow-y-auto py-1",
                    style: { maxHeight },
                    children: flatFiltered.length === 0 ? (
                      // Empty state
                      /* @__PURE__ */ jsxRuntime.jsx(
                        framerMotion.motion.div,
                        {
                          className: "py-6 text-center text-sm text-muted-foreground",
                          variants: chunkF4JJFWWU_cjs.fadeIn.variants,
                          initial: "initial",
                          animate: "animate",
                          transition: chunkF4JJFWWU_cjs.fadeIn.transition,
                          "data-ds-animated": "",
                          children: emptyMessage
                        }
                      )
                    ) : (
                      // Results
                      /* @__PURE__ */ jsxRuntime.jsx(
                        framerMotion.motion.div,
                        {
                          variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.staggerContainerFast.variants,
                          initial: shouldReduce ? void 0 : "initial",
                          animate: shouldReduce ? void 0 : "animate",
                          children: groupedOptions.map((section, sectionIdx) => /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                            section.group && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: section.group.label }),
                            section.options.map((option) => {
                              const isSelected = multi ? selectedValues.includes(option.value) : selectedValue === option.value;
                              const flatIdx = flatFiltered.indexOf(option);
                              const isActive = flatIdx === activeIndex;
                              return /* @__PURE__ */ jsxRuntime.jsx(
                                framerMotion.motion.div,
                                {
                                  role: "option",
                                  id: `${id}-option-${option.value}`,
                                  "aria-selected": isSelected,
                                  "aria-disabled": option.disabled,
                                  variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.slideUpSm.variants,
                                  className: chunk4ON3M3OM_cjs.cn(
                                    "relative flex items-center gap-2 px-3 py-2 text-sm rounded-sm mx-1",
                                    "cursor-pointer select-none",
                                    "transition-colors duration-fast",
                                    isActive ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-accent hover:text-accent-foreground",
                                    isSelected && !isActive && "bg-primary/8 text-foreground",
                                    option.disabled && "pointer-events-none opacity-40"
                                  ),
                                  onClick: () => {
                                    if (!option.disabled) {
                                      handleSelect(option.value);
                                    }
                                  },
                                  onMouseEnter: () => setActiveIndex(flatIdx),
                                  children: renderOption ? renderOption(option, isSelected) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                                    /* @__PURE__ */ jsxRuntime.jsx(
                                      "span",
                                      {
                                        className: chunk4ON3M3OM_cjs.cn(
                                          "flex items-center justify-center shrink-0",
                                          "size-4",
                                          isSelected ? "text-primary" : "text-transparent"
                                        ),
                                        children: /* @__PURE__ */ jsxRuntime.jsx(CheckIcon3, { className: "size-4" })
                                      }
                                    ),
                                    option.icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0 text-muted-foreground", children: option.icon }),
                                    /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex flex-col min-w-0", children: [
                                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", children: option.label }),
                                      option.description && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs text-muted-foreground truncate", children: option.description })
                                    ] })
                                  ] })
                                },
                                option.value
                              );
                            }),
                            sectionIdx < groupedOptions.length - 1 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "my-1 border-t border-border" })
                          ] }, sectionIdx))
                        }
                      )
                    )
                  }
                )
              ]
            }
          )
        }
      ) }) })
    ] });
  }
);
Combobox.displayName = "Combobox";
var kbdVariants = classVarianceAuthority.cva(
  [
    "inline-flex items-center gap-0.5",
    "font-mono font-medium leading-none",
    "rounded border border-border",
    "bg-muted text-muted-foreground",
    "shadow-[0_1px_0_1px_hsl(var(--border))]",
    "select-none whitespace-nowrap"
  ],
  {
    variants: {
      size: {
        sm: "px-1.5 py-0.5 text-[10px]",
        md: "px-2 py-1 text-xs",
        lg: "px-2.5 py-1 text-sm"
      }
    },
    defaultVariants: { size: "md" }
  }
);
var Kbd = React.forwardRef(function Kbd2({ size = "md", className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "kbd",
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(kbdVariants({ size }), className),
      "data-ds": "",
      "data-ds-component": "kbd",
      "data-ds-size": size,
      ...rest,
      children
    }
  );
});
Kbd.displayName = "Kbd";
function SearchIcon2({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m21 21-4.3-4.3" })
      ]
    }
  );
}
function ShortcutKeys({ keys }) {
  const modifiers = /* @__PURE__ */ new Set(["\u2318", "\u21E7", "\u2325", "\u2303"]);
  const tokens = [];
  let rest = keys;
  while (rest.length > 0) {
    if (modifiers.has(rest[0])) {
      tokens.push(rest[0]);
      rest = rest.slice(1);
    } else {
      tokens.push(rest);
      break;
    }
  }
  return /* @__PURE__ */ jsxRuntime.jsx("span", { className: "inline-flex items-center gap-0.5", children: tokens.map((token, i) => /* @__PURE__ */ jsxRuntime.jsx(Kbd, { size: "sm", children: token }, i)) });
}
function matchesSearch(item, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  return item.label.toLowerCase().includes(q) || (item.description?.toLowerCase().includes(q) ?? false);
}
function Command({
  open,
  onOpenChange,
  groups,
  placeholder = "Search commands...",
  emptyText = "No results found.",
  shortcutKey = "k"
}) {
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const inputRef = React.useRef(null);
  const listRef = React.useRef(null);
  const inputId = React.useId();
  const listboxId = React.useId();
  React.useEffect(() => {
    function handleKeyDown2(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === shortcutKey) {
        e.preventDefault();
        onOpenChange(!open);
      }
    }
    document.addEventListener("keydown", handleKeyDown2);
    return () => document.removeEventListener("keydown", handleKeyDown2);
  }, [open, onOpenChange, shortcutKey]);
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [open]);
  const filteredGroups = React.useMemo(() => {
    return groups.map((group) => ({
      ...group,
      items: group.items.filter((item) => matchesSearch(item, query))
    })).filter((group) => group.items.length > 0);
  }, [groups, query]);
  const flatItems = React.useMemo(
    () => filteredGroups.flatMap((g) => g.items).filter((i) => !i.disabled),
    [filteredGroups]
  );
  const clampedIndex = Math.min(activeIndex, Math.max(0, flatItems.length - 1));
  function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const active = flatItems[clampedIndex];
      if (active) {
        active.onSelect();
        onOpenChange(false);
      }
    } else if (e.key === "Escape") {
      onOpenChange(false);
    }
  }
  React.useEffect(() => {
    const el = listRef.current?.querySelector(
      `[data-cmd-item][data-active="true"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, []);
  let flatIndex = 0;
  const shouldReduce = framerMotion.useReducedMotion();
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Dialog.Root, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntime.jsx(radixUi.Dialog.Portal, { forceMount: true, children: /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(radixUi.Dialog.Overlay, { forceMount: true, asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(
      framerMotion.motion.div,
      {
        className: chunk4ON3M3OM_cjs.cn(
          "fixed inset-0 z-[var(--z-modal)] bg-black/50"
        ),
        variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.overlayBackdrop.variants,
        initial: shouldReduce ? { opacity: 0 } : "initial",
        animate: shouldReduce ? { opacity: 1 } : "animate",
        exit: shouldReduce ? { opacity: 0 } : "exit",
        transition: shouldReduce ? { duration: 0.15 } : chunkF4JJFWWU_cjs.overlayBackdrop.transition,
        "data-ds-animated": ""
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(radixUi.Dialog.Content, { forceMount: true, asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
      framerMotion.motion.div,
      {
        className: chunk4ON3M3OM_cjs.cn(
          "fixed left-1/2 top-[20%] z-[var(--z-modal)]",
          "w-full max-w-lg -translate-x-1/2",
          "rounded-lg border border-border bg-background shadow-xl",
          "overflow-hidden"
        ),
        variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.modalContent.variants,
        initial: shouldReduce ? { opacity: 0 } : "initial",
        animate: shouldReduce ? { opacity: 1 } : "animate",
        exit: shouldReduce ? { opacity: 0 } : "exit",
        transition: shouldReduce ? { duration: 0.2 } : chunkF4JJFWWU_cjs.modalContent.transition,
        "data-ds": "",
        "data-ds-component": "command",
        "data-ds-animated": "",
        "aria-label": "Command Palette",
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(radixUi.Dialog.Title, { className: "sr-only", children: "Command Palette" }),
          /* @__PURE__ */ jsxRuntime.jsx(radixUi.Dialog.Description, { className: "sr-only", children: "Search and run commands using the keyboard or mouse." }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 border-b border-border px-3 py-2.5", children: [
            /* @__PURE__ */ jsxRuntime.jsx(SearchIcon2, { className: "shrink-0 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              "input",
              {
                ref: inputRef,
                id: inputId,
                type: "text",
                role: "combobox",
                "aria-expanded": filteredGroups.length > 0,
                "aria-controls": listboxId,
                "aria-activedescendant": flatItems[clampedIndex] ? `cmd-item-${flatItems[clampedIndex].id}` : void 0,
                "aria-autocomplete": "list",
                autoComplete: "off",
                spellCheck: false,
                value: query,
                onChange: (e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                },
                onKeyDown: handleKeyDown,
                placeholder,
                className: chunk4ON3M3OM_cjs.cn(
                  "flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                )
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(ShortcutKeys, { keys: "Esc" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              ref: listRef,
              id: listboxId,
              role: "listbox",
              "aria-label": "Commands",
              className: "max-h-[320px] overflow-y-auto p-1",
              children: filteredGroups.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "py-6 text-center text-sm text-muted-foreground", children: emptyText }) : filteredGroups.map((group, gi) => {
                return /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "group", "aria-label": group.heading, children: [
                  group.heading && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: group.heading }),
                  group.items.map((item) => {
                    const isActive = !item.disabled && flatIndex === clampedIndex;
                    if (!item.disabled) flatIndex++;
                    return /* @__PURE__ */ jsxRuntime.jsxs(
                      "div",
                      {
                        id: `cmd-item-${item.id}`,
                        role: "option",
                        "aria-selected": isActive,
                        "aria-disabled": item.disabled,
                        "data-cmd-item": "",
                        "data-active": isActive ? "true" : void 0,
                        onMouseEnter: () => {
                          if (!item.disabled) {
                            const idx = flatItems.findIndex(
                              (f) => f.id === item.id
                            );
                            if (idx !== -1) setActiveIndex(idx);
                          }
                        },
                        onClick: () => {
                          if (!item.disabled) {
                            item.onSelect();
                            onOpenChange(false);
                          }
                        },
                        onKeyDown: (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            if (!item.disabled) {
                              item.onSelect();
                              onOpenChange(false);
                            }
                          }
                        },
                        className: chunk4ON3M3OM_cjs.cn(
                          "flex cursor-pointer select-none items-center gap-2",
                          "rounded-md px-2 py-2",
                          "text-sm leading-5 outline-none",
                          "transition-colors duration-fast ease-standard",
                          isActive && "bg-muted text-foreground",
                          item.disabled && "pointer-events-none opacity-50"
                        ),
                        children: [
                          item.icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex size-4 shrink-0 items-center justify-center text-muted-foreground", children: item.icon }),
                          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1 min-w-0", children: [
                            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "truncate font-medium", children: item.label }),
                            item.description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "truncate text-xs text-muted-foreground", children: item.description })
                          ] }),
                          item.shortcut && /* @__PURE__ */ jsxRuntime.jsx(ShortcutKeys, { keys: item.shortcut })
                        ]
                      },
                      item.id
                    );
                  })
                ] }, gi);
              })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3 border-t border-border px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntime.jsx(ShortcutKeys, { keys: "\u2191\u2193" }),
              " navigate"
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntime.jsx(ShortcutKeys, { keys: "\u21B5" }),
              " select"
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntime.jsx(ShortcutKeys, { keys: "Esc" }),
              " close"
            ] })
          ] })
        ]
      }
    ) })
  ] }) }) }) });
}
Command.displayName = "Command";
var CommandTrigger = React.forwardRef(function CommandTrigger2({ label = "Search commands...", onClick, className }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "button",
    {
      ref,
      type: "button",
      onClick,
      className: chunk4ON3M3OM_cjs.cn(
        "inline-flex h-9 items-center gap-2",
        "rounded-md border border-border bg-background",
        "px-3 text-sm text-muted-foreground",
        "transition-colors duration-fast ease-standard",
        "hover:border-primary/50 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        "w-48 md:w-64",
        className
      ),
      "data-ds": "",
      "data-ds-component": "command-trigger",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(SearchIcon2, { className: "size-3.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex-1 truncate text-left", children: label }),
        /* @__PURE__ */ jsxRuntime.jsx(ShortcutKeys, { keys: "\u2318K" })
      ]
    }
  );
});
CommandTrigger.displayName = "CommandTrigger";
function SpinnerIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      className: chunk4ON3M3OM_cjs.cn("animate-spin", className),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" })
    }
  );
}
function ConfirmDialog({
  open,
  onOpenChange,
  trigger,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
  loading = false,
  className,
  children
}) {
  const isDanger = variant === "danger";
  return /* @__PURE__ */ jsxRuntime.jsxs(AlertDialog, { open, onOpenChange, children: [
    trigger && /* @__PURE__ */ jsxRuntime.jsx(AlertDialogTrigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      AlertDialogContent,
      {
        className,
        "data-ds-component": "confirm-dialog",
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(AlertDialogTitle, { children: title }),
            description && /* @__PURE__ */ jsxRuntime.jsx(AlertDialogDescription, { children: description })
          ] }),
          children && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "py-2 text-sm text-foreground", children }),
          /* @__PURE__ */ jsxRuntime.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(AlertDialogCancel, { onClick: onCancel, disabled: loading, children: cancelLabel }),
            /* @__PURE__ */ jsxRuntime.jsxs(
              AlertDialogAction,
              {
                onClick: onConfirm,
                disabled: loading,
                className: chunk4ON3M3OM_cjs.cn(
                  isDanger && "bg-danger text-danger-foreground hover:bg-danger-hover active:bg-danger-active"
                ),
                children: [
                  loading && /* @__PURE__ */ jsxRuntime.jsx(SpinnerIcon, { className: "size-4" }),
                  confirmLabel
                ]
              }
            )
          ] })
        ]
      }
    )
  ] });
}
ConfirmDialog.displayName = "ConfirmDialog";
function CheckIcon4({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntime.jsx("polyline", { points: "20 6 9 17 4 12" })
    }
  );
}
function DotIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "4" })
    }
  );
}
function ChevronRightIcon3({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m9 18 6-6-6-6" })
    }
  );
}
var menuItemBase = [
  "relative flex w-full cursor-pointer select-none items-center",
  "rounded-sm py-1.5 px-2",
  "text-sm leading-5 outline-none",
  "transition-colors duration-fast ease-standard",
  "focus:bg-muted",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
];
var menuContentBase = [
  "z-[var(--z-dropdown)]",
  "min-w-[10rem]",
  "overflow-hidden",
  "rounded-md",
  "border border-border",
  "bg-background",
  "p-1",
  "shadow-lg",
  "text-foreground",
  // Entry animation
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
];
function ContextMenu({ children, ...rest }) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.ContextMenu.Root, { ...rest, children });
}
ContextMenu.displayName = "ContextMenu";
var ContextMenuTrigger = React.forwardRef(function ContextMenuTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.ContextMenu.Trigger,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(className),
      "data-ds": "",
      "data-ds-component": "context-menu-trigger",
      ...rest
    }
  );
});
ContextMenuTrigger.displayName = "ContextMenuTrigger";
var ContextMenuContent = React.forwardRef(function ContextMenuContent2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.ContextMenu.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.ContextMenu.Content,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(...menuContentBase, className),
      "data-ds": "",
      "data-ds-component": "context-menu-content",
      ...rest,
      children
    }
  ) });
});
ContextMenuContent.displayName = "ContextMenuContent";
var ContextMenuItem = React.forwardRef(function ContextMenuItem2({ className, variant = "default", icon, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.ContextMenu.Item,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        ...menuItemBase,
        variant === "danger" && "text-destructive focus:bg-destructive/10 focus:text-destructive",
        className
      ),
      "data-ds": "",
      "data-ds-component": "context-menu-item",
      "data-ds-variant": variant,
      ...rest,
      children: [
        icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "mr-2 flex size-4 shrink-0 items-center justify-center", children: icon }),
        children
      ]
    }
  );
});
ContextMenuItem.displayName = "ContextMenuItem";
var ContextMenuCheckboxItem = React.forwardRef(function ContextMenuCheckboxItem2({ className, children, checked, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.ContextMenu.CheckboxItem,
    {
      ref,
      checked,
      className: chunk4ON3M3OM_cjs.cn(...menuItemBase, "pl-8", className),
      "data-ds": "",
      "data-ds-component": "context-menu-checkbox-item",
      ...rest,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute left-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(radixUi.ContextMenu.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(CheckIcon4, { className: "text-foreground" }) }) }),
        children
      ]
    }
  );
});
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";
var ContextMenuRadioGroup = React.forwardRef(function ContextMenuRadioGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.ContextMenu.RadioGroup,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(className),
      ...rest
    }
  );
});
ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup";
var ContextMenuRadioItem = React.forwardRef(function ContextMenuRadioItem2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.ContextMenu.RadioItem,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(...menuItemBase, "pl-8", className),
      "data-ds": "",
      "data-ds-component": "context-menu-radio-item",
      ...rest,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute left-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(radixUi.ContextMenu.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(DotIcon, { className: "text-foreground" }) }) }),
        children
      ]
    }
  );
});
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";
var ContextMenuLabel = React.forwardRef(function ContextMenuLabel2({ className, inset, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.ContextMenu.Label,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
        inset && "pl-8",
        className
      ),
      "data-ds": "",
      "data-ds-component": "context-menu-label",
      ...rest
    }
  );
});
ContextMenuLabel.displayName = "ContextMenuLabel";
var ContextMenuSeparator = React.forwardRef(function ContextMenuSeparator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.ContextMenu.Separator,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn("-mx-1 my-1 h-px bg-border", className),
      "data-ds": "",
      "data-ds-component": "context-menu-separator",
      ...rest
    }
  );
});
ContextMenuSeparator.displayName = "ContextMenuSeparator";
var ContextMenuGroup = React.forwardRef(function ContextMenuGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.ContextMenu.Group, { ref, className: chunk4ON3M3OM_cjs.cn(className), ...rest });
});
ContextMenuGroup.displayName = "ContextMenuGroup";
function ContextMenuSub({ children, ...rest }) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.ContextMenu.Sub, { ...rest, children });
}
ContextMenuSub.displayName = "ContextMenuSub";
var ContextMenuSubTrigger = React.forwardRef(function ContextMenuSubTrigger2({ className, inset, icon, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.ContextMenu.SubTrigger,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        ...menuItemBase,
        "data-[state=open]:bg-muted",
        inset && "pl-8",
        className
      ),
      "data-ds": "",
      "data-ds-component": "context-menu-sub-trigger",
      ...rest,
      children: [
        icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "mr-2 flex size-4 shrink-0 items-center justify-center", children: icon }),
        children,
        /* @__PURE__ */ jsxRuntime.jsx(ChevronRightIcon3, { className: "ml-auto text-muted-foreground" })
      ]
    }
  );
});
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";
var ContextMenuSubContent = React.forwardRef(function ContextMenuSubContent2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.ContextMenu.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.ContextMenu.SubContent,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(...menuContentBase, className),
      "data-ds": "",
      "data-ds-component": "context-menu-sub-content",
      ...rest,
      children
    }
  ) });
});
ContextMenuSubContent.displayName = "ContextMenuSubContent";
function ContextMenuShortcut({
  className,
  children
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: chunk4ON3M3OM_cjs.cn(
        "ml-auto pl-4 text-xs tracking-widest text-muted-foreground",
        className
      ),
      "data-ds": "",
      "data-ds-component": "context-menu-shortcut",
      children
    }
  );
}
ContextMenuShortcut.displayName = "ContextMenuShortcut";
var copyButtonVariants = classVarianceAuthority.cva(
  [
    "relative inline-flex items-center justify-center gap-2",
    "rounded-md border font-medium",
    "transition-colors duration-fast",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
    chunk3EHT6IOA_cjs.focusRingClasses
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
function CopyIcon2({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
      ]
    }
  );
}
function CheckIcon5({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M20 6 9 17l-5-5" })
    }
  );
}
var iconSizeMap3 = {
  sm: "size-3",
  md: "size-3.5",
  lg: "size-4"
};
var CopyButton = React.forwardRef(
  function CopyButton2({
    text: text2,
    variant = "default",
    size = "md",
    tooltip = "Copy",
    successDuration = 2e3,
    onCopy,
    onCopyError,
    className
  }, ref) {
    const shouldReduce = framerMotion.useReducedMotion();
    const [copied, setCopied] = React.useState(false);
    const [showTooltip, setShowTooltip] = React.useState(false);
    const handleCopy = React.useCallback(async () => {
      try {
        await navigator.clipboard.writeText(text2);
        setCopied(true);
        onCopy?.(text2);
        setTimeout(() => setCopied(false), successDuration);
      } catch (err) {
        onCopyError?.(err instanceof Error ? err : new Error(String(err)));
      }
    }, [text2, successDuration, onCopy, onCopyError]);
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative inline-flex", children: [
      /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { children: showTooltip && /* @__PURE__ */ jsxRuntime.jsxs(
        framerMotion.motion.div,
        {
          className: chunk4ON3M3OM_cjs.cn(
            "absolute -top-8 left-1/2 -translate-x-1/2",
            "px-2 py-1 rounded-md",
            "bg-foreground text-background text-xs font-medium whitespace-nowrap",
            "pointer-events-none z-tooltip"
          ),
          variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.fadeInFast.variants,
          initial: shouldReduce ? { opacity: 0 } : "initial",
          animate: shouldReduce ? { opacity: 1 } : "animate",
          exit: shouldReduce ? { opacity: 0 } : "exit",
          transition: shouldReduce ? { duration: 0.1 } : chunkF4JJFWWU_cjs.fadeInFast.transition,
          "data-ds-animated": "",
          children: [
            copied ? "Copied!" : tooltip,
            /* @__PURE__ */ jsxRuntime.jsx(
              "span",
              {
                className: "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground",
                "aria-hidden": "true"
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(
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
          className: chunk4ON3M3OM_cjs.cn(copyButtonVariants({ variant, size }), className),
          "data-ds": "",
          "data-ds-component": "copy-button",
          "data-ds-size": size,
          "data-ds-copied": copied ? "" : void 0,
          children: /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { mode: "wait", initial: false, children: copied ? /* @__PURE__ */ jsxRuntime.jsx(
            framerMotion.motion.span,
            {
              className: chunk4ON3M3OM_cjs.cn("text-success", iconSizeMap3[size]),
              variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.pop.variants,
              initial: shouldReduce ? { opacity: 0 } : "initial",
              animate: shouldReduce ? { opacity: 1 } : "animate",
              exit: shouldReduce ? { opacity: 0 } : "exit",
              transition: shouldReduce ? { duration: 0.1 } : chunkF4JJFWWU_cjs.pop.transition,
              "data-ds-animated": "",
              children: /* @__PURE__ */ jsxRuntime.jsx(CheckIcon5, { className: iconSizeMap3[size] })
            },
            "check"
          ) : /* @__PURE__ */ jsxRuntime.jsx(
            framerMotion.motion.span,
            {
              variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.fadeInFast.variants,
              initial: shouldReduce ? { opacity: 0 } : "initial",
              animate: shouldReduce ? { opacity: 1 } : "animate",
              exit: shouldReduce ? { opacity: 0 } : "exit",
              transition: shouldReduce ? { duration: 0.1 } : chunkF4JJFWWU_cjs.fadeInFast.transition,
              "data-ds-animated": "",
              children: /* @__PURE__ */ jsxRuntime.jsx(CopyIcon2, { className: iconSizeMap3[size] })
            },
            "copy"
          ) })
        }
      )
    ] });
  }
);
CopyButton.displayName = "CopyButton";
var dataListVariants = classVarianceAuthority.cva(["w-full"], {
  variants: {
    orientation: {
      horizontal: "grid grid-cols-[auto_1fr] items-baseline gap-x-6",
      vertical: "flex flex-col gap-2"
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base"
    }
  },
  defaultVariants: { orientation: "horizontal", size: "md" }
});
var DataListTerm = React.forwardRef(
  function DataListTerm2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "dt",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn("font-medium text-muted-foreground shrink-0", className),
        ...rest,
        children
      }
    );
  }
);
DataListTerm.displayName = "DataListTerm";
var DataListDetail = React.forwardRef(
  function DataListDetail2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx("dd", { ref, className: chunk4ON3M3OM_cjs.cn("text-foreground m-0", className), ...rest, children });
  }
);
DataListDetail.displayName = "DataListDetail";
var DataList = React.forwardRef(
  function DataList2({
    items,
    orientation = "horizontal",
    size = "md",
    dividers = false,
    animated = true,
    className
  }, ref) {
    const shouldReduce = framerMotion.useReducedMotion();
    const isHorizontal = orientation === "horizontal";
    const horizontalCellPadding = "py-2";
    return /* @__PURE__ */ jsxRuntime.jsx(
      framerMotion.motion.dl,
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(dataListVariants({ orientation, size }), className),
        variants: animated && !shouldReduce ? chunkF4JJFWWU_cjs.staggerContainer.variants : void 0,
        initial: animated && !shouldReduce ? "initial" : void 0,
        animate: animated && !shouldReduce ? "animate" : void 0,
        "data-ds": "",
        "data-ds-component": "data-list",
        "data-ds-orientation": orientation,
        "data-ds-animated": animated ? "" : void 0,
        children: items.map((item, i) => /* @__PURE__ */ jsxRuntime.jsx(
          framerMotion.motion.div,
          {
            className: chunk4ON3M3OM_cjs.cn(
              isHorizontal ? "contents" : "flex flex-col gap-1",
              dividers && i > 0 && !isHorizontal && "pt-3 border-t border-border"
            ),
            variants: animated && !shouldReduce ? chunkF4JJFWWU_cjs.fadeIn.variants : void 0,
            transition: animated && !shouldReduce ? chunkF4JJFWWU_cjs.fadeIn.transition : void 0,
            children: isHorizontal ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                DataListTerm,
                {
                  className: chunk4ON3M3OM_cjs.cn(
                    horizontalCellPadding,
                    dividers && i > 0 && "border-t border-border"
                  ),
                  children: item.term
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                DataListDetail,
                {
                  className: chunk4ON3M3OM_cjs.cn(
                    horizontalCellPadding,
                    dividers && i > 0 && "border-t border-border"
                  ),
                  children: item.detail
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(DataListTerm, { children: item.term }),
              /* @__PURE__ */ jsxRuntime.jsx(DataListDetail, { children: item.detail })
            ] })
          },
          item.key ?? i
        ))
      }
    );
  }
);
DataList.displayName = "DataList";

// ../../node_modules/@tanstack/table-core/build/lib/index.mjs
function createColumnHelper() {
  return {
    accessor: (accessor, column) => {
      return typeof accessor === "function" ? {
        ...column,
        accessorFn: accessor
      } : {
        ...column,
        accessorKey: accessor
      };
    },
    display: (column) => column,
    group: (column) => column
  };
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function makeStateUpdater(key, instance) {
  return (updater) => {
    instance.setState((old) => {
      return {
        ...old,
        [key]: functionalUpdate(updater, old[key])
      };
    });
  };
}
function isFunction(d) {
  return d instanceof Function;
}
function isNumberArray(d) {
  return Array.isArray(d) && d.every((val) => typeof val === "number");
}
function flattenBy(arr, getChildren) {
  const flat = [];
  const recurse = (subArr) => {
    subArr.forEach((item) => {
      flat.push(item);
      const children = getChildren(item);
      if (children != null && children.length) {
        recurse(children);
      }
    });
  };
  recurse(arr);
  return flat;
}
function memo(getDeps, fn, opts) {
  let deps = [];
  let result;
  return (depArgs) => {
    let depTime;
    if (opts.key && opts.debug) depTime = Date.now();
    const newDeps = getDeps(depArgs);
    const depsChanged = newDeps.length !== deps.length || newDeps.some((dep, index) => deps[index] !== dep);
    if (!depsChanged) {
      return result;
    }
    deps = newDeps;
    let resultTime;
    if (opts.key && opts.debug) resultTime = Date.now();
    result = fn(...newDeps);
    opts == null || opts.onChange == null || opts.onChange(result);
    if (opts.key && opts.debug) {
      if (opts != null && opts.debug()) {
        const depEndTime = Math.round((Date.now() - depTime) * 100) / 100;
        const resultEndTime = Math.round((Date.now() - resultTime) * 100) / 100;
        const resultFpsPercentage = resultEndTime / 16;
        const pad = (str, num) => {
          str = String(str);
          while (str.length < num) {
            str = " " + str;
          }
          return str;
        };
        console.info(`%c\u23F1 ${pad(resultEndTime, 5)} /${pad(depEndTime, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * resultFpsPercentage, 120))}deg 100% 31%);`, opts == null ? void 0 : opts.key);
      }
    }
    return result;
  };
}
function getMemoOptions(tableOptions, debugLevel, key, onChange) {
  return {
    debug: () => {
      var _tableOptions$debugAl;
      return (_tableOptions$debugAl = tableOptions == null ? void 0 : tableOptions.debugAll) != null ? _tableOptions$debugAl : tableOptions[debugLevel];
    },
    key: process.env.NODE_ENV === "development" && key,
    onChange
  };
}
function createCell(table, row, column, columnId) {
  const getRenderValue = () => {
    var _cell$getValue;
    return (_cell$getValue = cell.getValue()) != null ? _cell$getValue : table.options.renderFallbackValue;
  };
  const cell = {
    id: `${row.id}_${column.id}`,
    row,
    column,
    getValue: () => row.getValue(columnId),
    renderValue: getRenderValue,
    getContext: memo(() => [table, column, row, cell], (table2, column2, row2, cell2) => ({
      table: table2,
      column: column2,
      row: row2,
      cell: cell2,
      getValue: cell2.getValue,
      renderValue: cell2.renderValue
    }), getMemoOptions(table.options, "debugCells", "cell.getContext"))
  };
  table._features.forEach((feature) => {
    feature.createCell == null || feature.createCell(cell, column, row, table);
  }, {});
  return cell;
}
function createColumn(table, columnDef, depth, parent) {
  var _ref, _resolvedColumnDef$id;
  const defaultColumn = table._getDefaultColumnDef();
  const resolvedColumnDef = {
    ...defaultColumn,
    ...columnDef
  };
  const accessorKey = resolvedColumnDef.accessorKey;
  let id = (_ref = (_resolvedColumnDef$id = resolvedColumnDef.id) != null ? _resolvedColumnDef$id : accessorKey ? typeof String.prototype.replaceAll === "function" ? accessorKey.replaceAll(".", "_") : accessorKey.replace(/\./g, "_") : void 0) != null ? _ref : typeof resolvedColumnDef.header === "string" ? resolvedColumnDef.header : void 0;
  let accessorFn;
  if (resolvedColumnDef.accessorFn) {
    accessorFn = resolvedColumnDef.accessorFn;
  } else if (accessorKey) {
    if (accessorKey.includes(".")) {
      accessorFn = (originalRow) => {
        let result = originalRow;
        for (const key of accessorKey.split(".")) {
          var _result;
          result = (_result = result) == null ? void 0 : _result[key];
          if (process.env.NODE_ENV !== "production" && result === void 0) {
            console.warn(`"${key}" in deeply nested key "${accessorKey}" returned undefined.`);
          }
        }
        return result;
      };
    } else {
      accessorFn = (originalRow) => originalRow[resolvedColumnDef.accessorKey];
    }
  }
  if (!id) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error(resolvedColumnDef.accessorFn ? `Columns require an id when using an accessorFn` : `Columns require an id when using a non-string header`);
    }
    throw new Error();
  }
  let column = {
    id: `${String(id)}`,
    accessorFn,
    parent,
    depth,
    columnDef: resolvedColumnDef,
    columns: [],
    getFlatColumns: memo(() => [true], () => {
      var _column$columns;
      return [column, ...(_column$columns = column.columns) == null ? void 0 : _column$columns.flatMap((d) => d.getFlatColumns())];
    }, getMemoOptions(table.options, "debugColumns", "column.getFlatColumns")),
    getLeafColumns: memo(() => [table._getOrderColumnsFn()], (orderColumns2) => {
      var _column$columns2;
      if ((_column$columns2 = column.columns) != null && _column$columns2.length) {
        let leafColumns = column.columns.flatMap((column2) => column2.getLeafColumns());
        return orderColumns2(leafColumns);
      }
      return [column];
    }, getMemoOptions(table.options, "debugColumns", "column.getLeafColumns"))
  };
  for (const feature of table._features) {
    feature.createColumn == null || feature.createColumn(column, table);
  }
  return column;
}
var debug = "debugHeaders";
function createHeader(table, column, options) {
  var _options$id;
  const id = (_options$id = options.id) != null ? _options$id : column.id;
  let header = {
    id,
    column,
    index: options.index,
    isPlaceholder: !!options.isPlaceholder,
    placeholderId: options.placeholderId,
    depth: options.depth,
    subHeaders: [],
    colSpan: 0,
    rowSpan: 0,
    headerGroup: null,
    getLeafHeaders: () => {
      const leafHeaders = [];
      const recurseHeader = (h) => {
        if (h.subHeaders && h.subHeaders.length) {
          h.subHeaders.map(recurseHeader);
        }
        leafHeaders.push(h);
      };
      recurseHeader(header);
      return leafHeaders;
    },
    getContext: () => ({
      table,
      header,
      column
    })
  };
  table._features.forEach((feature) => {
    feature.createHeader == null || feature.createHeader(header, table);
  });
  return header;
}
var Headers = {
  createTable: (table) => {
    table.getHeaderGroups = memo(() => [table.getAllColumns(), table.getVisibleLeafColumns(), table.getState().columnPinning.left, table.getState().columnPinning.right], (allColumns, leafColumns, left, right) => {
      var _left$map$filter, _right$map$filter;
      const leftColumns = (_left$map$filter = left == null ? void 0 : left.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) != null ? _left$map$filter : [];
      const rightColumns = (_right$map$filter = right == null ? void 0 : right.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) != null ? _right$map$filter : [];
      const centerColumns = leafColumns.filter((column) => !(left != null && left.includes(column.id)) && !(right != null && right.includes(column.id)));
      const headerGroups = buildHeaderGroups(allColumns, [...leftColumns, ...centerColumns, ...rightColumns], table);
      return headerGroups;
    }, getMemoOptions(table.options, debug, "getHeaderGroups"));
    table.getCenterHeaderGroups = memo(() => [table.getAllColumns(), table.getVisibleLeafColumns(), table.getState().columnPinning.left, table.getState().columnPinning.right], (allColumns, leafColumns, left, right) => {
      leafColumns = leafColumns.filter((column) => !(left != null && left.includes(column.id)) && !(right != null && right.includes(column.id)));
      return buildHeaderGroups(allColumns, leafColumns, table, "center");
    }, getMemoOptions(table.options, debug, "getCenterHeaderGroups"));
    table.getLeftHeaderGroups = memo(() => [table.getAllColumns(), table.getVisibleLeafColumns(), table.getState().columnPinning.left], (allColumns, leafColumns, left) => {
      var _left$map$filter2;
      const orderedLeafColumns = (_left$map$filter2 = left == null ? void 0 : left.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) != null ? _left$map$filter2 : [];
      return buildHeaderGroups(allColumns, orderedLeafColumns, table, "left");
    }, getMemoOptions(table.options, debug, "getLeftHeaderGroups"));
    table.getRightHeaderGroups = memo(() => [table.getAllColumns(), table.getVisibleLeafColumns(), table.getState().columnPinning.right], (allColumns, leafColumns, right) => {
      var _right$map$filter2;
      const orderedLeafColumns = (_right$map$filter2 = right == null ? void 0 : right.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) != null ? _right$map$filter2 : [];
      return buildHeaderGroups(allColumns, orderedLeafColumns, table, "right");
    }, getMemoOptions(table.options, debug, "getRightHeaderGroups"));
    table.getFooterGroups = memo(() => [table.getHeaderGroups()], (headerGroups) => {
      return [...headerGroups].reverse();
    }, getMemoOptions(table.options, debug, "getFooterGroups"));
    table.getLeftFooterGroups = memo(() => [table.getLeftHeaderGroups()], (headerGroups) => {
      return [...headerGroups].reverse();
    }, getMemoOptions(table.options, debug, "getLeftFooterGroups"));
    table.getCenterFooterGroups = memo(() => [table.getCenterHeaderGroups()], (headerGroups) => {
      return [...headerGroups].reverse();
    }, getMemoOptions(table.options, debug, "getCenterFooterGroups"));
    table.getRightFooterGroups = memo(() => [table.getRightHeaderGroups()], (headerGroups) => {
      return [...headerGroups].reverse();
    }, getMemoOptions(table.options, debug, "getRightFooterGroups"));
    table.getFlatHeaders = memo(() => [table.getHeaderGroups()], (headerGroups) => {
      return headerGroups.map((headerGroup) => {
        return headerGroup.headers;
      }).flat();
    }, getMemoOptions(table.options, debug, "getFlatHeaders"));
    table.getLeftFlatHeaders = memo(() => [table.getLeftHeaderGroups()], (left) => {
      return left.map((headerGroup) => {
        return headerGroup.headers;
      }).flat();
    }, getMemoOptions(table.options, debug, "getLeftFlatHeaders"));
    table.getCenterFlatHeaders = memo(() => [table.getCenterHeaderGroups()], (left) => {
      return left.map((headerGroup) => {
        return headerGroup.headers;
      }).flat();
    }, getMemoOptions(table.options, debug, "getCenterFlatHeaders"));
    table.getRightFlatHeaders = memo(() => [table.getRightHeaderGroups()], (left) => {
      return left.map((headerGroup) => {
        return headerGroup.headers;
      }).flat();
    }, getMemoOptions(table.options, debug, "getRightFlatHeaders"));
    table.getCenterLeafHeaders = memo(() => [table.getCenterFlatHeaders()], (flatHeaders) => {
      return flatHeaders.filter((header) => {
        var _header$subHeaders;
        return !((_header$subHeaders = header.subHeaders) != null && _header$subHeaders.length);
      });
    }, getMemoOptions(table.options, debug, "getCenterLeafHeaders"));
    table.getLeftLeafHeaders = memo(() => [table.getLeftFlatHeaders()], (flatHeaders) => {
      return flatHeaders.filter((header) => {
        var _header$subHeaders2;
        return !((_header$subHeaders2 = header.subHeaders) != null && _header$subHeaders2.length);
      });
    }, getMemoOptions(table.options, debug, "getLeftLeafHeaders"));
    table.getRightLeafHeaders = memo(() => [table.getRightFlatHeaders()], (flatHeaders) => {
      return flatHeaders.filter((header) => {
        var _header$subHeaders3;
        return !((_header$subHeaders3 = header.subHeaders) != null && _header$subHeaders3.length);
      });
    }, getMemoOptions(table.options, debug, "getRightLeafHeaders"));
    table.getLeafHeaders = memo(() => [table.getLeftHeaderGroups(), table.getCenterHeaderGroups(), table.getRightHeaderGroups()], (left, center, right) => {
      var _left$0$headers, _left$, _center$0$headers, _center$, _right$0$headers, _right$;
      return [...(_left$0$headers = (_left$ = left[0]) == null ? void 0 : _left$.headers) != null ? _left$0$headers : [], ...(_center$0$headers = (_center$ = center[0]) == null ? void 0 : _center$.headers) != null ? _center$0$headers : [], ...(_right$0$headers = (_right$ = right[0]) == null ? void 0 : _right$.headers) != null ? _right$0$headers : []].map((header) => {
        return header.getLeafHeaders();
      }).flat();
    }, getMemoOptions(table.options, debug, "getLeafHeaders"));
  }
};
function buildHeaderGroups(allColumns, columnsToGroup, table, headerFamily) {
  var _headerGroups$0$heade, _headerGroups$;
  let maxDepth = 0;
  const findMaxDepth = function(columns, depth) {
    if (depth === void 0) {
      depth = 1;
    }
    maxDepth = Math.max(maxDepth, depth);
    columns.filter((column) => column.getIsVisible()).forEach((column) => {
      var _column$columns;
      if ((_column$columns = column.columns) != null && _column$columns.length) {
        findMaxDepth(column.columns, depth + 1);
      }
    }, 0);
  };
  findMaxDepth(allColumns);
  let headerGroups = [];
  const createHeaderGroup = (headersToGroup, depth) => {
    const headerGroup = {
      depth,
      id: [headerFamily, `${depth}`].filter(Boolean).join("_"),
      headers: []
    };
    const pendingParentHeaders = [];
    headersToGroup.forEach((headerToGroup) => {
      const latestPendingParentHeader = [...pendingParentHeaders].reverse()[0];
      const isLeafHeader = headerToGroup.column.depth === headerGroup.depth;
      let column;
      let isPlaceholder = false;
      if (isLeafHeader && headerToGroup.column.parent) {
        column = headerToGroup.column.parent;
      } else {
        column = headerToGroup.column;
        isPlaceholder = true;
      }
      if (latestPendingParentHeader && (latestPendingParentHeader == null ? void 0 : latestPendingParentHeader.column) === column) {
        latestPendingParentHeader.subHeaders.push(headerToGroup);
      } else {
        const header = createHeader(table, column, {
          id: [headerFamily, depth, column.id, headerToGroup == null ? void 0 : headerToGroup.id].filter(Boolean).join("_"),
          isPlaceholder,
          placeholderId: isPlaceholder ? `${pendingParentHeaders.filter((d) => d.column === column).length}` : void 0,
          depth,
          index: pendingParentHeaders.length
        });
        header.subHeaders.push(headerToGroup);
        pendingParentHeaders.push(header);
      }
      headerGroup.headers.push(headerToGroup);
      headerToGroup.headerGroup = headerGroup;
    });
    headerGroups.push(headerGroup);
    if (depth > 0) {
      createHeaderGroup(pendingParentHeaders, depth - 1);
    }
  };
  const bottomHeaders = columnsToGroup.map((column, index) => createHeader(table, column, {
    depth: maxDepth,
    index
  }));
  createHeaderGroup(bottomHeaders, maxDepth - 1);
  headerGroups.reverse();
  const recurseHeadersForSpans = (headers) => {
    const filteredHeaders = headers.filter((header) => header.column.getIsVisible());
    return filteredHeaders.map((header) => {
      let colSpan = 0;
      let rowSpan = 0;
      let childRowSpans = [0];
      if (header.subHeaders && header.subHeaders.length) {
        childRowSpans = [];
        recurseHeadersForSpans(header.subHeaders).forEach((_ref) => {
          let {
            colSpan: childColSpan,
            rowSpan: childRowSpan
          } = _ref;
          colSpan += childColSpan;
          childRowSpans.push(childRowSpan);
        });
      } else {
        colSpan = 1;
      }
      const minChildRowSpan = Math.min(...childRowSpans);
      rowSpan = rowSpan + minChildRowSpan;
      header.colSpan = colSpan;
      header.rowSpan = rowSpan;
      return {
        colSpan,
        rowSpan
      };
    });
  };
  recurseHeadersForSpans((_headerGroups$0$heade = (_headerGroups$ = headerGroups[0]) == null ? void 0 : _headerGroups$.headers) != null ? _headerGroups$0$heade : []);
  return headerGroups;
}
var createRow = (table, id, original, rowIndex, depth, subRows, parentId) => {
  let row = {
    id,
    index: rowIndex,
    original,
    depth,
    parentId,
    _valuesCache: {},
    _uniqueValuesCache: {},
    getValue: (columnId) => {
      if (row._valuesCache.hasOwnProperty(columnId)) {
        return row._valuesCache[columnId];
      }
      const column = table.getColumn(columnId);
      if (!(column != null && column.accessorFn)) {
        return void 0;
      }
      row._valuesCache[columnId] = column.accessorFn(row.original, rowIndex);
      return row._valuesCache[columnId];
    },
    getUniqueValues: (columnId) => {
      if (row._uniqueValuesCache.hasOwnProperty(columnId)) {
        return row._uniqueValuesCache[columnId];
      }
      const column = table.getColumn(columnId);
      if (!(column != null && column.accessorFn)) {
        return void 0;
      }
      if (!column.columnDef.getUniqueValues) {
        row._uniqueValuesCache[columnId] = [row.getValue(columnId)];
        return row._uniqueValuesCache[columnId];
      }
      row._uniqueValuesCache[columnId] = column.columnDef.getUniqueValues(row.original, rowIndex);
      return row._uniqueValuesCache[columnId];
    },
    renderValue: (columnId) => {
      var _row$getValue;
      return (_row$getValue = row.getValue(columnId)) != null ? _row$getValue : table.options.renderFallbackValue;
    },
    subRows: [],
    getLeafRows: () => flattenBy(row.subRows, (d) => d.subRows),
    getParentRow: () => row.parentId ? table.getRow(row.parentId, true) : void 0,
    getParentRows: () => {
      let parentRows = [];
      let currentRow = row;
      while (true) {
        const parentRow = currentRow.getParentRow();
        if (!parentRow) break;
        parentRows.push(parentRow);
        currentRow = parentRow;
      }
      return parentRows.reverse();
    },
    getAllCells: memo(() => [table.getAllLeafColumns()], (leafColumns) => {
      return leafColumns.map((column) => {
        return createCell(table, row, column, column.id);
      });
    }, getMemoOptions(table.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: memo(() => [row.getAllCells()], (allCells) => {
      return allCells.reduce((acc, cell) => {
        acc[cell.column.id] = cell;
        return acc;
      }, {});
    }, getMemoOptions(table.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let i = 0; i < table._features.length; i++) {
    const feature = table._features[i];
    feature == null || feature.createRow == null || feature.createRow(row, table);
  }
  return row;
};
var ColumnFaceting = {
  createColumn: (column, table) => {
    column._getFacetedRowModel = table.options.getFacetedRowModel && table.options.getFacetedRowModel(table, column.id);
    column.getFacetedRowModel = () => {
      if (!column._getFacetedRowModel) {
        return table.getPreFilteredRowModel();
      }
      return column._getFacetedRowModel();
    };
    column._getFacetedUniqueValues = table.options.getFacetedUniqueValues && table.options.getFacetedUniqueValues(table, column.id);
    column.getFacetedUniqueValues = () => {
      if (!column._getFacetedUniqueValues) {
        return /* @__PURE__ */ new Map();
      }
      return column._getFacetedUniqueValues();
    };
    column._getFacetedMinMaxValues = table.options.getFacetedMinMaxValues && table.options.getFacetedMinMaxValues(table, column.id);
    column.getFacetedMinMaxValues = () => {
      if (!column._getFacetedMinMaxValues) {
        return void 0;
      }
      return column._getFacetedMinMaxValues();
    };
  }
};
var includesString = (row, columnId, filterValue) => {
  var _filterValue$toString, _row$getValue;
  const search = filterValue == null || (_filterValue$toString = filterValue.toString()) == null ? void 0 : _filterValue$toString.toLowerCase();
  return Boolean((_row$getValue = row.getValue(columnId)) == null || (_row$getValue = _row$getValue.toString()) == null || (_row$getValue = _row$getValue.toLowerCase()) == null ? void 0 : _row$getValue.includes(search));
};
includesString.autoRemove = (val) => testFalsey(val);
var includesStringSensitive = (row, columnId, filterValue) => {
  var _row$getValue2;
  return Boolean((_row$getValue2 = row.getValue(columnId)) == null || (_row$getValue2 = _row$getValue2.toString()) == null ? void 0 : _row$getValue2.includes(filterValue));
};
includesStringSensitive.autoRemove = (val) => testFalsey(val);
var equalsString = (row, columnId, filterValue) => {
  var _row$getValue3;
  return ((_row$getValue3 = row.getValue(columnId)) == null || (_row$getValue3 = _row$getValue3.toString()) == null ? void 0 : _row$getValue3.toLowerCase()) === (filterValue == null ? void 0 : filterValue.toLowerCase());
};
equalsString.autoRemove = (val) => testFalsey(val);
var arrIncludes = (row, columnId, filterValue) => {
  var _row$getValue4;
  return (_row$getValue4 = row.getValue(columnId)) == null ? void 0 : _row$getValue4.includes(filterValue);
};
arrIncludes.autoRemove = (val) => testFalsey(val);
var arrIncludesAll = (row, columnId, filterValue) => {
  return !filterValue.some((val) => {
    var _row$getValue5;
    return !((_row$getValue5 = row.getValue(columnId)) != null && _row$getValue5.includes(val));
  });
};
arrIncludesAll.autoRemove = (val) => testFalsey(val) || !(val != null && val.length);
var arrIncludesSome = (row, columnId, filterValue) => {
  return filterValue.some((val) => {
    var _row$getValue6;
    return (_row$getValue6 = row.getValue(columnId)) == null ? void 0 : _row$getValue6.includes(val);
  });
};
arrIncludesSome.autoRemove = (val) => testFalsey(val) || !(val != null && val.length);
var equals = (row, columnId, filterValue) => {
  return row.getValue(columnId) === filterValue;
};
equals.autoRemove = (val) => testFalsey(val);
var weakEquals = (row, columnId, filterValue) => {
  return row.getValue(columnId) == filterValue;
};
weakEquals.autoRemove = (val) => testFalsey(val);
var inNumberRange = (row, columnId, filterValue) => {
  let [min2, max2] = filterValue;
  const rowValue = row.getValue(columnId);
  return rowValue >= min2 && rowValue <= max2;
};
inNumberRange.resolveFilterValue = (val) => {
  let [unsafeMin, unsafeMax] = val;
  let parsedMin = typeof unsafeMin !== "number" ? parseFloat(unsafeMin) : unsafeMin;
  let parsedMax = typeof unsafeMax !== "number" ? parseFloat(unsafeMax) : unsafeMax;
  let min2 = unsafeMin === null || Number.isNaN(parsedMin) ? -Infinity : parsedMin;
  let max2 = unsafeMax === null || Number.isNaN(parsedMax) ? Infinity : parsedMax;
  if (min2 > max2) {
    const temp = min2;
    min2 = max2;
    max2 = temp;
  }
  return [min2, max2];
};
inNumberRange.autoRemove = (val) => testFalsey(val) || testFalsey(val[0]) && testFalsey(val[1]);
var filterFns = {
  includesString,
  includesStringSensitive,
  equalsString,
  arrIncludes,
  arrIncludesAll,
  arrIncludesSome,
  equals,
  weakEquals,
  inNumberRange
};
function testFalsey(val) {
  return val === void 0 || val === null || val === "";
}
var ColumnFiltering = {
  getDefaultColumnDef: () => {
    return {
      filterFn: "auto"
    };
  },
  getInitialState: (state) => {
    return {
      columnFilters: [],
      ...state
    };
  },
  getDefaultOptions: (table) => {
    return {
      onColumnFiltersChange: makeStateUpdater("columnFilters", table),
      filterFromLeafRows: false,
      maxLeafRowFilterDepth: 100
    };
  },
  createColumn: (column, table) => {
    column.getAutoFilterFn = () => {
      const firstRow = table.getCoreRowModel().flatRows[0];
      const value = firstRow == null ? void 0 : firstRow.getValue(column.id);
      if (typeof value === "string") {
        return filterFns.includesString;
      }
      if (typeof value === "number") {
        return filterFns.inNumberRange;
      }
      if (typeof value === "boolean") {
        return filterFns.equals;
      }
      if (value !== null && typeof value === "object") {
        return filterFns.equals;
      }
      if (Array.isArray(value)) {
        return filterFns.arrIncludes;
      }
      return filterFns.weakEquals;
    };
    column.getFilterFn = () => {
      var _table$options$filter, _table$options$filter2;
      return isFunction(column.columnDef.filterFn) ? column.columnDef.filterFn : column.columnDef.filterFn === "auto" ? column.getAutoFilterFn() : (
        // @ts-ignore
        (_table$options$filter = (_table$options$filter2 = table.options.filterFns) == null ? void 0 : _table$options$filter2[column.columnDef.filterFn]) != null ? _table$options$filter : filterFns[column.columnDef.filterFn]
      );
    };
    column.getCanFilter = () => {
      var _column$columnDef$ena, _table$options$enable, _table$options$enable2;
      return ((_column$columnDef$ena = column.columnDef.enableColumnFilter) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableColumnFilters) != null ? _table$options$enable : true) && ((_table$options$enable2 = table.options.enableFilters) != null ? _table$options$enable2 : true) && !!column.accessorFn;
    };
    column.getIsFiltered = () => column.getFilterIndex() > -1;
    column.getFilterValue = () => {
      var _table$getState$colum;
      return (_table$getState$colum = table.getState().columnFilters) == null || (_table$getState$colum = _table$getState$colum.find((d) => d.id === column.id)) == null ? void 0 : _table$getState$colum.value;
    };
    column.getFilterIndex = () => {
      var _table$getState$colum2, _table$getState$colum3;
      return (_table$getState$colum2 = (_table$getState$colum3 = table.getState().columnFilters) == null ? void 0 : _table$getState$colum3.findIndex((d) => d.id === column.id)) != null ? _table$getState$colum2 : -1;
    };
    column.setFilterValue = (value) => {
      table.setColumnFilters((old) => {
        const filterFn = column.getFilterFn();
        const previousFilter = old == null ? void 0 : old.find((d) => d.id === column.id);
        const newFilter = functionalUpdate(value, previousFilter ? previousFilter.value : void 0);
        if (shouldAutoRemoveFilter(filterFn, newFilter, column)) {
          var _old$filter;
          return (_old$filter = old == null ? void 0 : old.filter((d) => d.id !== column.id)) != null ? _old$filter : [];
        }
        const newFilterObj = {
          id: column.id,
          value: newFilter
        };
        if (previousFilter) {
          var _old$map;
          return (_old$map = old == null ? void 0 : old.map((d) => {
            if (d.id === column.id) {
              return newFilterObj;
            }
            return d;
          })) != null ? _old$map : [];
        }
        if (old != null && old.length) {
          return [...old, newFilterObj];
        }
        return [newFilterObj];
      });
    };
  },
  createRow: (row, _table) => {
    row.columnFilters = {};
    row.columnFiltersMeta = {};
  },
  createTable: (table) => {
    table.setColumnFilters = (updater) => {
      const leafColumns = table.getAllLeafColumns();
      const updateFn = (old) => {
        var _functionalUpdate;
        return (_functionalUpdate = functionalUpdate(updater, old)) == null ? void 0 : _functionalUpdate.filter((filter) => {
          const column = leafColumns.find((d) => d.id === filter.id);
          if (column) {
            const filterFn = column.getFilterFn();
            if (shouldAutoRemoveFilter(filterFn, filter.value, column)) {
              return false;
            }
          }
          return true;
        });
      };
      table.options.onColumnFiltersChange == null || table.options.onColumnFiltersChange(updateFn);
    };
    table.resetColumnFilters = (defaultState) => {
      var _table$initialState$c, _table$initialState;
      table.setColumnFilters(defaultState ? [] : (_table$initialState$c = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.columnFilters) != null ? _table$initialState$c : []);
    };
    table.getPreFilteredRowModel = () => table.getCoreRowModel();
    table.getFilteredRowModel = () => {
      if (!table._getFilteredRowModel && table.options.getFilteredRowModel) {
        table._getFilteredRowModel = table.options.getFilteredRowModel(table);
      }
      if (table.options.manualFiltering || !table._getFilteredRowModel) {
        return table.getPreFilteredRowModel();
      }
      return table._getFilteredRowModel();
    };
  }
};
function shouldAutoRemoveFilter(filterFn, value, column) {
  return (filterFn && filterFn.autoRemove ? filterFn.autoRemove(value, column) : false) || typeof value === "undefined" || typeof value === "string" && !value;
}
var sum = (columnId, _leafRows, childRows) => {
  return childRows.reduce((sum2, next) => {
    const nextValue = next.getValue(columnId);
    return sum2 + (typeof nextValue === "number" ? nextValue : 0);
  }, 0);
};
var min = (columnId, _leafRows, childRows) => {
  let min2;
  childRows.forEach((row) => {
    const value = row.getValue(columnId);
    if (value != null && (min2 > value || min2 === void 0 && value >= value)) {
      min2 = value;
    }
  });
  return min2;
};
var max = (columnId, _leafRows, childRows) => {
  let max2;
  childRows.forEach((row) => {
    const value = row.getValue(columnId);
    if (value != null && (max2 < value || max2 === void 0 && value >= value)) {
      max2 = value;
    }
  });
  return max2;
};
var extent = (columnId, _leafRows, childRows) => {
  let min2;
  let max2;
  childRows.forEach((row) => {
    const value = row.getValue(columnId);
    if (value != null) {
      if (min2 === void 0) {
        if (value >= value) min2 = max2 = value;
      } else {
        if (min2 > value) min2 = value;
        if (max2 < value) max2 = value;
      }
    }
  });
  return [min2, max2];
};
var mean = (columnId, leafRows) => {
  let count2 = 0;
  let sum2 = 0;
  leafRows.forEach((row) => {
    let value = row.getValue(columnId);
    if (value != null && (value = +value) >= value) {
      ++count2, sum2 += value;
    }
  });
  if (count2) return sum2 / count2;
  return;
};
var median = (columnId, leafRows) => {
  if (!leafRows.length) {
    return;
  }
  const values = leafRows.map((row) => row.getValue(columnId));
  if (!isNumberArray(values)) {
    return;
  }
  if (values.length === 1) {
    return values[0];
  }
  const mid = Math.floor(values.length / 2);
  const nums = values.sort((a, b) => a - b);
  return values.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
var unique = (columnId, leafRows) => {
  return Array.from(new Set(leafRows.map((d) => d.getValue(columnId))).values());
};
var uniqueCount = (columnId, leafRows) => {
  return new Set(leafRows.map((d) => d.getValue(columnId))).size;
};
var count = (_columnId, leafRows) => {
  return leafRows.length;
};
var aggregationFns = {
  sum,
  min,
  max,
  extent,
  mean,
  median,
  unique,
  uniqueCount,
  count
};
var ColumnGrouping = {
  getDefaultColumnDef: () => {
    return {
      aggregatedCell: (props) => {
        var _toString, _props$getValue;
        return (_toString = (_props$getValue = props.getValue()) == null || _props$getValue.toString == null ? void 0 : _props$getValue.toString()) != null ? _toString : null;
      },
      aggregationFn: "auto"
    };
  },
  getInitialState: (state) => {
    return {
      grouping: [],
      ...state
    };
  },
  getDefaultOptions: (table) => {
    return {
      onGroupingChange: makeStateUpdater("grouping", table),
      groupedColumnMode: "reorder"
    };
  },
  createColumn: (column, table) => {
    column.toggleGrouping = () => {
      table.setGrouping((old) => {
        if (old != null && old.includes(column.id)) {
          return old.filter((d) => d !== column.id);
        }
        return [...old != null ? old : [], column.id];
      });
    };
    column.getCanGroup = () => {
      var _column$columnDef$ena, _table$options$enable;
      return ((_column$columnDef$ena = column.columnDef.enableGrouping) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableGrouping) != null ? _table$options$enable : true) && (!!column.accessorFn || !!column.columnDef.getGroupingValue);
    };
    column.getIsGrouped = () => {
      var _table$getState$group;
      return (_table$getState$group = table.getState().grouping) == null ? void 0 : _table$getState$group.includes(column.id);
    };
    column.getGroupedIndex = () => {
      var _table$getState$group2;
      return (_table$getState$group2 = table.getState().grouping) == null ? void 0 : _table$getState$group2.indexOf(column.id);
    };
    column.getToggleGroupingHandler = () => {
      const canGroup = column.getCanGroup();
      return () => {
        if (!canGroup) return;
        column.toggleGrouping();
      };
    };
    column.getAutoAggregationFn = () => {
      const firstRow = table.getCoreRowModel().flatRows[0];
      const value = firstRow == null ? void 0 : firstRow.getValue(column.id);
      if (typeof value === "number") {
        return aggregationFns.sum;
      }
      if (Object.prototype.toString.call(value) === "[object Date]") {
        return aggregationFns.extent;
      }
    };
    column.getAggregationFn = () => {
      var _table$options$aggreg, _table$options$aggreg2;
      if (!column) {
        throw new Error();
      }
      return isFunction(column.columnDef.aggregationFn) ? column.columnDef.aggregationFn : column.columnDef.aggregationFn === "auto" ? column.getAutoAggregationFn() : (_table$options$aggreg = (_table$options$aggreg2 = table.options.aggregationFns) == null ? void 0 : _table$options$aggreg2[column.columnDef.aggregationFn]) != null ? _table$options$aggreg : aggregationFns[column.columnDef.aggregationFn];
    };
  },
  createTable: (table) => {
    table.setGrouping = (updater) => table.options.onGroupingChange == null ? void 0 : table.options.onGroupingChange(updater);
    table.resetGrouping = (defaultState) => {
      var _table$initialState$g, _table$initialState;
      table.setGrouping(defaultState ? [] : (_table$initialState$g = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.grouping) != null ? _table$initialState$g : []);
    };
    table.getPreGroupedRowModel = () => table.getFilteredRowModel();
    table.getGroupedRowModel = () => {
      if (!table._getGroupedRowModel && table.options.getGroupedRowModel) {
        table._getGroupedRowModel = table.options.getGroupedRowModel(table);
      }
      if (table.options.manualGrouping || !table._getGroupedRowModel) {
        return table.getPreGroupedRowModel();
      }
      return table._getGroupedRowModel();
    };
  },
  createRow: (row, table) => {
    row.getIsGrouped = () => !!row.groupingColumnId;
    row.getGroupingValue = (columnId) => {
      if (row._groupingValuesCache.hasOwnProperty(columnId)) {
        return row._groupingValuesCache[columnId];
      }
      const column = table.getColumn(columnId);
      if (!(column != null && column.columnDef.getGroupingValue)) {
        return row.getValue(columnId);
      }
      row._groupingValuesCache[columnId] = column.columnDef.getGroupingValue(row.original);
      return row._groupingValuesCache[columnId];
    };
    row._groupingValuesCache = {};
  },
  createCell: (cell, column, row, table) => {
    cell.getIsGrouped = () => column.getIsGrouped() && column.id === row.groupingColumnId;
    cell.getIsPlaceholder = () => !cell.getIsGrouped() && column.getIsGrouped();
    cell.getIsAggregated = () => {
      var _row$subRows;
      return !cell.getIsGrouped() && !cell.getIsPlaceholder() && !!((_row$subRows = row.subRows) != null && _row$subRows.length);
    };
  }
};
function orderColumns(leafColumns, grouping, groupedColumnMode) {
  if (!(grouping != null && grouping.length) || !groupedColumnMode) {
    return leafColumns;
  }
  const nonGroupingColumns = leafColumns.filter((col) => !grouping.includes(col.id));
  if (groupedColumnMode === "remove") {
    return nonGroupingColumns;
  }
  const groupingColumns = grouping.map((g) => leafColumns.find((col) => col.id === g)).filter(Boolean);
  return [...groupingColumns, ...nonGroupingColumns];
}
var ColumnOrdering = {
  getInitialState: (state) => {
    return {
      columnOrder: [],
      ...state
    };
  },
  getDefaultOptions: (table) => {
    return {
      onColumnOrderChange: makeStateUpdater("columnOrder", table)
    };
  },
  createColumn: (column, table) => {
    column.getIndex = memo((position) => [_getVisibleLeafColumns(table, position)], (columns) => columns.findIndex((d) => d.id === column.id), getMemoOptions(table.options, "debugColumns", "getIndex"));
    column.getIsFirstColumn = (position) => {
      var _columns$;
      const columns = _getVisibleLeafColumns(table, position);
      return ((_columns$ = columns[0]) == null ? void 0 : _columns$.id) === column.id;
    };
    column.getIsLastColumn = (position) => {
      var _columns;
      const columns = _getVisibleLeafColumns(table, position);
      return ((_columns = columns[columns.length - 1]) == null ? void 0 : _columns.id) === column.id;
    };
  },
  createTable: (table) => {
    table.setColumnOrder = (updater) => table.options.onColumnOrderChange == null ? void 0 : table.options.onColumnOrderChange(updater);
    table.resetColumnOrder = (defaultState) => {
      var _table$initialState$c;
      table.setColumnOrder(defaultState ? [] : (_table$initialState$c = table.initialState.columnOrder) != null ? _table$initialState$c : []);
    };
    table._getOrderColumnsFn = memo(() => [table.getState().columnOrder, table.getState().grouping, table.options.groupedColumnMode], (columnOrder, grouping, groupedColumnMode) => (columns) => {
      let orderedColumns = [];
      if (!(columnOrder != null && columnOrder.length)) {
        orderedColumns = columns;
      } else {
        const columnOrderCopy = [...columnOrder];
        const columnsCopy = [...columns];
        while (columnsCopy.length && columnOrderCopy.length) {
          const targetColumnId = columnOrderCopy.shift();
          const foundIndex = columnsCopy.findIndex((d) => d.id === targetColumnId);
          if (foundIndex > -1) {
            orderedColumns.push(columnsCopy.splice(foundIndex, 1)[0]);
          }
        }
        orderedColumns = [...orderedColumns, ...columnsCopy];
      }
      return orderColumns(orderedColumns, grouping, groupedColumnMode);
    }, getMemoOptions(table.options, "debugTable", "_getOrderColumnsFn"));
  }
};
var getDefaultColumnPinningState = () => ({
  left: [],
  right: []
});
var ColumnPinning = {
  getInitialState: (state) => {
    return {
      columnPinning: getDefaultColumnPinningState(),
      ...state
    };
  },
  getDefaultOptions: (table) => {
    return {
      onColumnPinningChange: makeStateUpdater("columnPinning", table)
    };
  },
  createColumn: (column, table) => {
    column.pin = (position) => {
      const columnIds = column.getLeafColumns().map((d) => d.id).filter(Boolean);
      table.setColumnPinning((old) => {
        var _old$left3, _old$right3;
        if (position === "right") {
          var _old$left, _old$right;
          return {
            left: ((_old$left = old == null ? void 0 : old.left) != null ? _old$left : []).filter((d) => !(columnIds != null && columnIds.includes(d))),
            right: [...((_old$right = old == null ? void 0 : old.right) != null ? _old$right : []).filter((d) => !(columnIds != null && columnIds.includes(d))), ...columnIds]
          };
        }
        if (position === "left") {
          var _old$left2, _old$right2;
          return {
            left: [...((_old$left2 = old == null ? void 0 : old.left) != null ? _old$left2 : []).filter((d) => !(columnIds != null && columnIds.includes(d))), ...columnIds],
            right: ((_old$right2 = old == null ? void 0 : old.right) != null ? _old$right2 : []).filter((d) => !(columnIds != null && columnIds.includes(d)))
          };
        }
        return {
          left: ((_old$left3 = old == null ? void 0 : old.left) != null ? _old$left3 : []).filter((d) => !(columnIds != null && columnIds.includes(d))),
          right: ((_old$right3 = old == null ? void 0 : old.right) != null ? _old$right3 : []).filter((d) => !(columnIds != null && columnIds.includes(d)))
        };
      });
    };
    column.getCanPin = () => {
      const leafColumns = column.getLeafColumns();
      return leafColumns.some((d) => {
        var _d$columnDef$enablePi, _ref, _table$options$enable;
        return ((_d$columnDef$enablePi = d.columnDef.enablePinning) != null ? _d$columnDef$enablePi : true) && ((_ref = (_table$options$enable = table.options.enableColumnPinning) != null ? _table$options$enable : table.options.enablePinning) != null ? _ref : true);
      });
    };
    column.getIsPinned = () => {
      const leafColumnIds = column.getLeafColumns().map((d) => d.id);
      const {
        left,
        right
      } = table.getState().columnPinning;
      const isLeft = leafColumnIds.some((d) => left == null ? void 0 : left.includes(d));
      const isRight = leafColumnIds.some((d) => right == null ? void 0 : right.includes(d));
      return isLeft ? "left" : isRight ? "right" : false;
    };
    column.getPinnedIndex = () => {
      var _table$getState$colum, _table$getState$colum2;
      const position = column.getIsPinned();
      return position ? (_table$getState$colum = (_table$getState$colum2 = table.getState().columnPinning) == null || (_table$getState$colum2 = _table$getState$colum2[position]) == null ? void 0 : _table$getState$colum2.indexOf(column.id)) != null ? _table$getState$colum : -1 : 0;
    };
  },
  createRow: (row, table) => {
    row.getCenterVisibleCells = memo(() => [row._getAllVisibleCells(), table.getState().columnPinning.left, table.getState().columnPinning.right], (allCells, left, right) => {
      const leftAndRight = [...left != null ? left : [], ...right != null ? right : []];
      return allCells.filter((d) => !leftAndRight.includes(d.column.id));
    }, getMemoOptions(table.options, "debugRows", "getCenterVisibleCells"));
    row.getLeftVisibleCells = memo(() => [row._getAllVisibleCells(), table.getState().columnPinning.left], (allCells, left) => {
      const cells = (left != null ? left : []).map((columnId) => allCells.find((cell) => cell.column.id === columnId)).filter(Boolean).map((d) => ({
        ...d,
        position: "left"
      }));
      return cells;
    }, getMemoOptions(table.options, "debugRows", "getLeftVisibleCells"));
    row.getRightVisibleCells = memo(() => [row._getAllVisibleCells(), table.getState().columnPinning.right], (allCells, right) => {
      const cells = (right != null ? right : []).map((columnId) => allCells.find((cell) => cell.column.id === columnId)).filter(Boolean).map((d) => ({
        ...d,
        position: "right"
      }));
      return cells;
    }, getMemoOptions(table.options, "debugRows", "getRightVisibleCells"));
  },
  createTable: (table) => {
    table.setColumnPinning = (updater) => table.options.onColumnPinningChange == null ? void 0 : table.options.onColumnPinningChange(updater);
    table.resetColumnPinning = (defaultState) => {
      var _table$initialState$c, _table$initialState;
      return table.setColumnPinning(defaultState ? getDefaultColumnPinningState() : (_table$initialState$c = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.columnPinning) != null ? _table$initialState$c : getDefaultColumnPinningState());
    };
    table.getIsSomeColumnsPinned = (position) => {
      var _pinningState$positio;
      const pinningState = table.getState().columnPinning;
      if (!position) {
        var _pinningState$left, _pinningState$right;
        return Boolean(((_pinningState$left = pinningState.left) == null ? void 0 : _pinningState$left.length) || ((_pinningState$right = pinningState.right) == null ? void 0 : _pinningState$right.length));
      }
      return Boolean((_pinningState$positio = pinningState[position]) == null ? void 0 : _pinningState$positio.length);
    };
    table.getLeftLeafColumns = memo(() => [table.getAllLeafColumns(), table.getState().columnPinning.left], (allColumns, left) => {
      return (left != null ? left : []).map((columnId) => allColumns.find((column) => column.id === columnId)).filter(Boolean);
    }, getMemoOptions(table.options, "debugColumns", "getLeftLeafColumns"));
    table.getRightLeafColumns = memo(() => [table.getAllLeafColumns(), table.getState().columnPinning.right], (allColumns, right) => {
      return (right != null ? right : []).map((columnId) => allColumns.find((column) => column.id === columnId)).filter(Boolean);
    }, getMemoOptions(table.options, "debugColumns", "getRightLeafColumns"));
    table.getCenterLeafColumns = memo(() => [table.getAllLeafColumns(), table.getState().columnPinning.left, table.getState().columnPinning.right], (allColumns, left, right) => {
      const leftAndRight = [...left != null ? left : [], ...right != null ? right : []];
      return allColumns.filter((d) => !leftAndRight.includes(d.id));
    }, getMemoOptions(table.options, "debugColumns", "getCenterLeafColumns"));
  }
};
function safelyAccessDocument(_document) {
  return _document || (typeof document !== "undefined" ? document : null);
}
var defaultColumnSizing = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
};
var getDefaultColumnSizingInfoState = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: false,
  columnSizingStart: []
});
var ColumnSizing = {
  getDefaultColumnDef: () => {
    return defaultColumnSizing;
  },
  getInitialState: (state) => {
    return {
      columnSizing: {},
      columnSizingInfo: getDefaultColumnSizingInfoState(),
      ...state
    };
  },
  getDefaultOptions: (table) => {
    return {
      columnResizeMode: "onEnd",
      columnResizeDirection: "ltr",
      onColumnSizingChange: makeStateUpdater("columnSizing", table),
      onColumnSizingInfoChange: makeStateUpdater("columnSizingInfo", table)
    };
  },
  createColumn: (column, table) => {
    column.getSize = () => {
      var _column$columnDef$min, _ref, _column$columnDef$max;
      const columnSize = table.getState().columnSizing[column.id];
      return Math.min(Math.max((_column$columnDef$min = column.columnDef.minSize) != null ? _column$columnDef$min : defaultColumnSizing.minSize, (_ref = columnSize != null ? columnSize : column.columnDef.size) != null ? _ref : defaultColumnSizing.size), (_column$columnDef$max = column.columnDef.maxSize) != null ? _column$columnDef$max : defaultColumnSizing.maxSize);
    };
    column.getStart = memo((position) => [position, _getVisibleLeafColumns(table, position), table.getState().columnSizing], (position, columns) => columns.slice(0, column.getIndex(position)).reduce((sum2, column2) => sum2 + column2.getSize(), 0), getMemoOptions(table.options, "debugColumns", "getStart"));
    column.getAfter = memo((position) => [position, _getVisibleLeafColumns(table, position), table.getState().columnSizing], (position, columns) => columns.slice(column.getIndex(position) + 1).reduce((sum2, column2) => sum2 + column2.getSize(), 0), getMemoOptions(table.options, "debugColumns", "getAfter"));
    column.resetSize = () => {
      table.setColumnSizing((_ref2) => {
        let {
          [column.id]: _,
          ...rest
        } = _ref2;
        return rest;
      });
    };
    column.getCanResize = () => {
      var _column$columnDef$ena, _table$options$enable;
      return ((_column$columnDef$ena = column.columnDef.enableResizing) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableColumnResizing) != null ? _table$options$enable : true);
    };
    column.getIsResizing = () => {
      return table.getState().columnSizingInfo.isResizingColumn === column.id;
    };
  },
  createHeader: (header, table) => {
    header.getSize = () => {
      let sum2 = 0;
      const recurse = (header2) => {
        if (header2.subHeaders.length) {
          header2.subHeaders.forEach(recurse);
        } else {
          var _header$column$getSiz;
          sum2 += (_header$column$getSiz = header2.column.getSize()) != null ? _header$column$getSiz : 0;
        }
      };
      recurse(header);
      return sum2;
    };
    header.getStart = () => {
      if (header.index > 0) {
        const prevSiblingHeader = header.headerGroup.headers[header.index - 1];
        return prevSiblingHeader.getStart() + prevSiblingHeader.getSize();
      }
      return 0;
    };
    header.getResizeHandler = (_contextDocument) => {
      const column = table.getColumn(header.column.id);
      const canResize = column == null ? void 0 : column.getCanResize();
      return (e) => {
        if (!column || !canResize) {
          return;
        }
        e.persist == null || e.persist();
        if (isTouchStartEvent(e)) {
          if (e.touches && e.touches.length > 1) {
            return;
          }
        }
        const startSize = header.getSize();
        const columnSizingStart = header ? header.getLeafHeaders().map((d) => [d.column.id, d.column.getSize()]) : [[column.id, column.getSize()]];
        const clientX = isTouchStartEvent(e) ? Math.round(e.touches[0].clientX) : e.clientX;
        const newColumnSizing = {};
        const updateOffset = (eventType, clientXPos) => {
          if (typeof clientXPos !== "number") {
            return;
          }
          table.setColumnSizingInfo((old) => {
            var _old$startOffset, _old$startSize;
            const deltaDirection = table.options.columnResizeDirection === "rtl" ? -1 : 1;
            const deltaOffset = (clientXPos - ((_old$startOffset = old == null ? void 0 : old.startOffset) != null ? _old$startOffset : 0)) * deltaDirection;
            const deltaPercentage = Math.max(deltaOffset / ((_old$startSize = old == null ? void 0 : old.startSize) != null ? _old$startSize : 0), -0.999999);
            old.columnSizingStart.forEach((_ref3) => {
              let [columnId, headerSize] = _ref3;
              newColumnSizing[columnId] = Math.round(Math.max(headerSize + headerSize * deltaPercentage, 0) * 100) / 100;
            });
            return {
              ...old,
              deltaOffset,
              deltaPercentage
            };
          });
          if (table.options.columnResizeMode === "onChange" || eventType === "end") {
            table.setColumnSizing((old) => ({
              ...old,
              ...newColumnSizing
            }));
          }
        };
        const onMove = (clientXPos) => updateOffset("move", clientXPos);
        const onEnd = (clientXPos) => {
          updateOffset("end", clientXPos);
          table.setColumnSizingInfo((old) => ({
            ...old,
            isResizingColumn: false,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        };
        const contextDocument = safelyAccessDocument(_contextDocument);
        const mouseEvents = {
          moveHandler: (e2) => onMove(e2.clientX),
          upHandler: (e2) => {
            contextDocument == null || contextDocument.removeEventListener("mousemove", mouseEvents.moveHandler);
            contextDocument == null || contextDocument.removeEventListener("mouseup", mouseEvents.upHandler);
            onEnd(e2.clientX);
          }
        };
        const touchEvents = {
          moveHandler: (e2) => {
            if (e2.cancelable) {
              e2.preventDefault();
              e2.stopPropagation();
            }
            onMove(e2.touches[0].clientX);
            return false;
          },
          upHandler: (e2) => {
            var _e$touches$;
            contextDocument == null || contextDocument.removeEventListener("touchmove", touchEvents.moveHandler);
            contextDocument == null || contextDocument.removeEventListener("touchend", touchEvents.upHandler);
            if (e2.cancelable) {
              e2.preventDefault();
              e2.stopPropagation();
            }
            onEnd((_e$touches$ = e2.touches[0]) == null ? void 0 : _e$touches$.clientX);
          }
        };
        const passiveIfSupported = passiveEventSupported() ? {
          passive: false
        } : false;
        if (isTouchStartEvent(e)) {
          contextDocument == null || contextDocument.addEventListener("touchmove", touchEvents.moveHandler, passiveIfSupported);
          contextDocument == null || contextDocument.addEventListener("touchend", touchEvents.upHandler, passiveIfSupported);
        } else {
          contextDocument == null || contextDocument.addEventListener("mousemove", mouseEvents.moveHandler, passiveIfSupported);
          contextDocument == null || contextDocument.addEventListener("mouseup", mouseEvents.upHandler, passiveIfSupported);
        }
        table.setColumnSizingInfo((old) => ({
          ...old,
          startOffset: clientX,
          startSize,
          deltaOffset: 0,
          deltaPercentage: 0,
          columnSizingStart,
          isResizingColumn: column.id
        }));
      };
    };
  },
  createTable: (table) => {
    table.setColumnSizing = (updater) => table.options.onColumnSizingChange == null ? void 0 : table.options.onColumnSizingChange(updater);
    table.setColumnSizingInfo = (updater) => table.options.onColumnSizingInfoChange == null ? void 0 : table.options.onColumnSizingInfoChange(updater);
    table.resetColumnSizing = (defaultState) => {
      var _table$initialState$c;
      table.setColumnSizing(defaultState ? {} : (_table$initialState$c = table.initialState.columnSizing) != null ? _table$initialState$c : {});
    };
    table.resetHeaderSizeInfo = (defaultState) => {
      var _table$initialState$c2;
      table.setColumnSizingInfo(defaultState ? getDefaultColumnSizingInfoState() : (_table$initialState$c2 = table.initialState.columnSizingInfo) != null ? _table$initialState$c2 : getDefaultColumnSizingInfoState());
    };
    table.getTotalSize = () => {
      var _table$getHeaderGroup, _table$getHeaderGroup2;
      return (_table$getHeaderGroup = (_table$getHeaderGroup2 = table.getHeaderGroups()[0]) == null ? void 0 : _table$getHeaderGroup2.headers.reduce((sum2, header) => {
        return sum2 + header.getSize();
      }, 0)) != null ? _table$getHeaderGroup : 0;
    };
    table.getLeftTotalSize = () => {
      var _table$getLeftHeaderG, _table$getLeftHeaderG2;
      return (_table$getLeftHeaderG = (_table$getLeftHeaderG2 = table.getLeftHeaderGroups()[0]) == null ? void 0 : _table$getLeftHeaderG2.headers.reduce((sum2, header) => {
        return sum2 + header.getSize();
      }, 0)) != null ? _table$getLeftHeaderG : 0;
    };
    table.getCenterTotalSize = () => {
      var _table$getCenterHeade, _table$getCenterHeade2;
      return (_table$getCenterHeade = (_table$getCenterHeade2 = table.getCenterHeaderGroups()[0]) == null ? void 0 : _table$getCenterHeade2.headers.reduce((sum2, header) => {
        return sum2 + header.getSize();
      }, 0)) != null ? _table$getCenterHeade : 0;
    };
    table.getRightTotalSize = () => {
      var _table$getRightHeader, _table$getRightHeader2;
      return (_table$getRightHeader = (_table$getRightHeader2 = table.getRightHeaderGroups()[0]) == null ? void 0 : _table$getRightHeader2.headers.reduce((sum2, header) => {
        return sum2 + header.getSize();
      }, 0)) != null ? _table$getRightHeader : 0;
    };
  }
};
var passiveSupported = null;
function passiveEventSupported() {
  if (typeof passiveSupported === "boolean") return passiveSupported;
  let supported = false;
  try {
    const options = {
      get passive() {
        supported = true;
        return false;
      }
    };
    const noop = () => {
    };
    window.addEventListener("test", noop, options);
    window.removeEventListener("test", noop);
  } catch (err) {
    supported = false;
  }
  passiveSupported = supported;
  return passiveSupported;
}
function isTouchStartEvent(e) {
  return e.type === "touchstart";
}
var ColumnVisibility = {
  getInitialState: (state) => {
    return {
      columnVisibility: {},
      ...state
    };
  },
  getDefaultOptions: (table) => {
    return {
      onColumnVisibilityChange: makeStateUpdater("columnVisibility", table)
    };
  },
  createColumn: (column, table) => {
    column.toggleVisibility = (value) => {
      if (column.getCanHide()) {
        table.setColumnVisibility((old) => ({
          ...old,
          [column.id]: value != null ? value : !column.getIsVisible()
        }));
      }
    };
    column.getIsVisible = () => {
      var _ref, _table$getState$colum;
      const childColumns = column.columns;
      return (_ref = childColumns.length ? childColumns.some((c) => c.getIsVisible()) : (_table$getState$colum = table.getState().columnVisibility) == null ? void 0 : _table$getState$colum[column.id]) != null ? _ref : true;
    };
    column.getCanHide = () => {
      var _column$columnDef$ena, _table$options$enable;
      return ((_column$columnDef$ena = column.columnDef.enableHiding) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableHiding) != null ? _table$options$enable : true);
    };
    column.getToggleVisibilityHandler = () => {
      return (e) => {
        column.toggleVisibility == null || column.toggleVisibility(e.target.checked);
      };
    };
  },
  createRow: (row, table) => {
    row._getAllVisibleCells = memo(() => [row.getAllCells(), table.getState().columnVisibility], (cells) => {
      return cells.filter((cell) => cell.column.getIsVisible());
    }, getMemoOptions(table.options, "debugRows", "_getAllVisibleCells"));
    row.getVisibleCells = memo(() => [row.getLeftVisibleCells(), row.getCenterVisibleCells(), row.getRightVisibleCells()], (left, center, right) => [...left, ...center, ...right], getMemoOptions(table.options, "debugRows", "getVisibleCells"));
  },
  createTable: (table) => {
    const makeVisibleColumnsMethod = (key, getColumns) => {
      return memo(() => [getColumns(), getColumns().filter((d) => d.getIsVisible()).map((d) => d.id).join("_")], (columns) => {
        return columns.filter((d) => d.getIsVisible == null ? void 0 : d.getIsVisible());
      }, getMemoOptions(table.options, "debugColumns", key));
    };
    table.getVisibleFlatColumns = makeVisibleColumnsMethod("getVisibleFlatColumns", () => table.getAllFlatColumns());
    table.getVisibleLeafColumns = makeVisibleColumnsMethod("getVisibleLeafColumns", () => table.getAllLeafColumns());
    table.getLeftVisibleLeafColumns = makeVisibleColumnsMethod("getLeftVisibleLeafColumns", () => table.getLeftLeafColumns());
    table.getRightVisibleLeafColumns = makeVisibleColumnsMethod("getRightVisibleLeafColumns", () => table.getRightLeafColumns());
    table.getCenterVisibleLeafColumns = makeVisibleColumnsMethod("getCenterVisibleLeafColumns", () => table.getCenterLeafColumns());
    table.setColumnVisibility = (updater) => table.options.onColumnVisibilityChange == null ? void 0 : table.options.onColumnVisibilityChange(updater);
    table.resetColumnVisibility = (defaultState) => {
      var _table$initialState$c;
      table.setColumnVisibility(defaultState ? {} : (_table$initialState$c = table.initialState.columnVisibility) != null ? _table$initialState$c : {});
    };
    table.toggleAllColumnsVisible = (value) => {
      var _value;
      value = (_value = value) != null ? _value : !table.getIsAllColumnsVisible();
      table.setColumnVisibility(table.getAllLeafColumns().reduce((obj, column) => ({
        ...obj,
        [column.id]: !value ? !(column.getCanHide != null && column.getCanHide()) : value
      }), {}));
    };
    table.getIsAllColumnsVisible = () => !table.getAllLeafColumns().some((column) => !(column.getIsVisible != null && column.getIsVisible()));
    table.getIsSomeColumnsVisible = () => table.getAllLeafColumns().some((column) => column.getIsVisible == null ? void 0 : column.getIsVisible());
    table.getToggleAllColumnsVisibilityHandler = () => {
      return (e) => {
        var _target;
        table.toggleAllColumnsVisible((_target = e.target) == null ? void 0 : _target.checked);
      };
    };
  }
};
function _getVisibleLeafColumns(table, position) {
  return !position ? table.getVisibleLeafColumns() : position === "center" ? table.getCenterVisibleLeafColumns() : position === "left" ? table.getLeftVisibleLeafColumns() : table.getRightVisibleLeafColumns();
}
var GlobalFaceting = {
  createTable: (table) => {
    table._getGlobalFacetedRowModel = table.options.getFacetedRowModel && table.options.getFacetedRowModel(table, "__global__");
    table.getGlobalFacetedRowModel = () => {
      if (table.options.manualFiltering || !table._getGlobalFacetedRowModel) {
        return table.getPreFilteredRowModel();
      }
      return table._getGlobalFacetedRowModel();
    };
    table._getGlobalFacetedUniqueValues = table.options.getFacetedUniqueValues && table.options.getFacetedUniqueValues(table, "__global__");
    table.getGlobalFacetedUniqueValues = () => {
      if (!table._getGlobalFacetedUniqueValues) {
        return /* @__PURE__ */ new Map();
      }
      return table._getGlobalFacetedUniqueValues();
    };
    table._getGlobalFacetedMinMaxValues = table.options.getFacetedMinMaxValues && table.options.getFacetedMinMaxValues(table, "__global__");
    table.getGlobalFacetedMinMaxValues = () => {
      if (!table._getGlobalFacetedMinMaxValues) {
        return;
      }
      return table._getGlobalFacetedMinMaxValues();
    };
  }
};
var GlobalFiltering = {
  getInitialState: (state) => {
    return {
      globalFilter: void 0,
      ...state
    };
  },
  getDefaultOptions: (table) => {
    return {
      onGlobalFilterChange: makeStateUpdater("globalFilter", table),
      globalFilterFn: "auto",
      getColumnCanGlobalFilter: (column) => {
        var _table$getCoreRowMode;
        const value = (_table$getCoreRowMode = table.getCoreRowModel().flatRows[0]) == null || (_table$getCoreRowMode = _table$getCoreRowMode._getAllCellsByColumnId()[column.id]) == null ? void 0 : _table$getCoreRowMode.getValue();
        return typeof value === "string" || typeof value === "number";
      }
    };
  },
  createColumn: (column, table) => {
    column.getCanGlobalFilter = () => {
      var _column$columnDef$ena, _table$options$enable, _table$options$enable2, _table$options$getCol;
      return ((_column$columnDef$ena = column.columnDef.enableGlobalFilter) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableGlobalFilter) != null ? _table$options$enable : true) && ((_table$options$enable2 = table.options.enableFilters) != null ? _table$options$enable2 : true) && ((_table$options$getCol = table.options.getColumnCanGlobalFilter == null ? void 0 : table.options.getColumnCanGlobalFilter(column)) != null ? _table$options$getCol : true) && !!column.accessorFn;
    };
  },
  createTable: (table) => {
    table.getGlobalAutoFilterFn = () => {
      return filterFns.includesString;
    };
    table.getGlobalFilterFn = () => {
      var _table$options$filter, _table$options$filter2;
      const {
        globalFilterFn
      } = table.options;
      return isFunction(globalFilterFn) ? globalFilterFn : globalFilterFn === "auto" ? table.getGlobalAutoFilterFn() : (_table$options$filter = (_table$options$filter2 = table.options.filterFns) == null ? void 0 : _table$options$filter2[globalFilterFn]) != null ? _table$options$filter : filterFns[globalFilterFn];
    };
    table.setGlobalFilter = (updater) => {
      table.options.onGlobalFilterChange == null || table.options.onGlobalFilterChange(updater);
    };
    table.resetGlobalFilter = (defaultState) => {
      table.setGlobalFilter(defaultState ? void 0 : table.initialState.globalFilter);
    };
  }
};
var RowExpanding = {
  getInitialState: (state) => {
    return {
      expanded: {},
      ...state
    };
  },
  getDefaultOptions: (table) => {
    return {
      onExpandedChange: makeStateUpdater("expanded", table),
      paginateExpandedRows: true
    };
  },
  createTable: (table) => {
    let registered = false;
    let queued = false;
    table._autoResetExpanded = () => {
      var _ref, _table$options$autoRe;
      if (!registered) {
        table._queue(() => {
          registered = true;
        });
        return;
      }
      if ((_ref = (_table$options$autoRe = table.options.autoResetAll) != null ? _table$options$autoRe : table.options.autoResetExpanded) != null ? _ref : !table.options.manualExpanding) {
        if (queued) return;
        queued = true;
        table._queue(() => {
          table.resetExpanded();
          queued = false;
        });
      }
    };
    table.setExpanded = (updater) => table.options.onExpandedChange == null ? void 0 : table.options.onExpandedChange(updater);
    table.toggleAllRowsExpanded = (expanded) => {
      if (expanded != null ? expanded : !table.getIsAllRowsExpanded()) {
        table.setExpanded(true);
      } else {
        table.setExpanded({});
      }
    };
    table.resetExpanded = (defaultState) => {
      var _table$initialState$e, _table$initialState;
      table.setExpanded(defaultState ? {} : (_table$initialState$e = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.expanded) != null ? _table$initialState$e : {});
    };
    table.getCanSomeRowsExpand = () => {
      return table.getPrePaginationRowModel().flatRows.some((row) => row.getCanExpand());
    };
    table.getToggleAllRowsExpandedHandler = () => {
      return (e) => {
        e.persist == null || e.persist();
        table.toggleAllRowsExpanded();
      };
    };
    table.getIsSomeRowsExpanded = () => {
      const expanded = table.getState().expanded;
      return expanded === true || Object.values(expanded).some(Boolean);
    };
    table.getIsAllRowsExpanded = () => {
      const expanded = table.getState().expanded;
      if (typeof expanded === "boolean") {
        return expanded === true;
      }
      if (!Object.keys(expanded).length) {
        return false;
      }
      if (table.getRowModel().flatRows.some((row) => !row.getIsExpanded())) {
        return false;
      }
      return true;
    };
    table.getExpandedDepth = () => {
      let maxDepth = 0;
      const rowIds = table.getState().expanded === true ? Object.keys(table.getRowModel().rowsById) : Object.keys(table.getState().expanded);
      rowIds.forEach((id) => {
        const splitId = id.split(".");
        maxDepth = Math.max(maxDepth, splitId.length);
      });
      return maxDepth;
    };
    table.getPreExpandedRowModel = () => table.getSortedRowModel();
    table.getExpandedRowModel = () => {
      if (!table._getExpandedRowModel && table.options.getExpandedRowModel) {
        table._getExpandedRowModel = table.options.getExpandedRowModel(table);
      }
      if (table.options.manualExpanding || !table._getExpandedRowModel) {
        return table.getPreExpandedRowModel();
      }
      return table._getExpandedRowModel();
    };
  },
  createRow: (row, table) => {
    row.toggleExpanded = (expanded) => {
      table.setExpanded((old) => {
        var _expanded;
        const exists = old === true ? true : !!(old != null && old[row.id]);
        let oldExpanded = {};
        if (old === true) {
          Object.keys(table.getRowModel().rowsById).forEach((rowId) => {
            oldExpanded[rowId] = true;
          });
        } else {
          oldExpanded = old;
        }
        expanded = (_expanded = expanded) != null ? _expanded : !exists;
        if (!exists && expanded) {
          return {
            ...oldExpanded,
            [row.id]: true
          };
        }
        if (exists && !expanded) {
          const {
            [row.id]: _,
            ...rest
          } = oldExpanded;
          return rest;
        }
        return old;
      });
    };
    row.getIsExpanded = () => {
      var _table$options$getIsR;
      const expanded = table.getState().expanded;
      return !!((_table$options$getIsR = table.options.getIsRowExpanded == null ? void 0 : table.options.getIsRowExpanded(row)) != null ? _table$options$getIsR : expanded === true || (expanded == null ? void 0 : expanded[row.id]));
    };
    row.getCanExpand = () => {
      var _table$options$getRow, _table$options$enable, _row$subRows;
      return (_table$options$getRow = table.options.getRowCanExpand == null ? void 0 : table.options.getRowCanExpand(row)) != null ? _table$options$getRow : ((_table$options$enable = table.options.enableExpanding) != null ? _table$options$enable : true) && !!((_row$subRows = row.subRows) != null && _row$subRows.length);
    };
    row.getIsAllParentsExpanded = () => {
      let isFullyExpanded = true;
      let currentRow = row;
      while (isFullyExpanded && currentRow.parentId) {
        currentRow = table.getRow(currentRow.parentId, true);
        isFullyExpanded = currentRow.getIsExpanded();
      }
      return isFullyExpanded;
    };
    row.getToggleExpandedHandler = () => {
      const canExpand = row.getCanExpand();
      return () => {
        if (!canExpand) return;
        row.toggleExpanded();
      };
    };
  }
};
var defaultPageIndex = 0;
var defaultPageSize = 10;
var getDefaultPaginationState = () => ({
  pageIndex: defaultPageIndex,
  pageSize: defaultPageSize
});
var RowPagination = {
  getInitialState: (state) => {
    return {
      ...state,
      pagination: {
        ...getDefaultPaginationState(),
        ...state == null ? void 0 : state.pagination
      }
    };
  },
  getDefaultOptions: (table) => {
    return {
      onPaginationChange: makeStateUpdater("pagination", table)
    };
  },
  createTable: (table) => {
    let registered = false;
    let queued = false;
    table._autoResetPageIndex = () => {
      var _ref, _table$options$autoRe;
      if (!registered) {
        table._queue(() => {
          registered = true;
        });
        return;
      }
      if ((_ref = (_table$options$autoRe = table.options.autoResetAll) != null ? _table$options$autoRe : table.options.autoResetPageIndex) != null ? _ref : !table.options.manualPagination) {
        if (queued) return;
        queued = true;
        table._queue(() => {
          table.resetPageIndex();
          queued = false;
        });
      }
    };
    table.setPagination = (updater) => {
      const safeUpdater = (old) => {
        let newState = functionalUpdate(updater, old);
        return newState;
      };
      return table.options.onPaginationChange == null ? void 0 : table.options.onPaginationChange(safeUpdater);
    };
    table.resetPagination = (defaultState) => {
      var _table$initialState$p;
      table.setPagination(defaultState ? getDefaultPaginationState() : (_table$initialState$p = table.initialState.pagination) != null ? _table$initialState$p : getDefaultPaginationState());
    };
    table.setPageIndex = (updater) => {
      table.setPagination((old) => {
        let pageIndex = functionalUpdate(updater, old.pageIndex);
        const maxPageIndex = typeof table.options.pageCount === "undefined" || table.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : table.options.pageCount - 1;
        pageIndex = Math.max(0, Math.min(pageIndex, maxPageIndex));
        return {
          ...old,
          pageIndex
        };
      });
    };
    table.resetPageIndex = (defaultState) => {
      var _table$initialState$p2, _table$initialState;
      table.setPageIndex(defaultState ? defaultPageIndex : (_table$initialState$p2 = (_table$initialState = table.initialState) == null || (_table$initialState = _table$initialState.pagination) == null ? void 0 : _table$initialState.pageIndex) != null ? _table$initialState$p2 : defaultPageIndex);
    };
    table.resetPageSize = (defaultState) => {
      var _table$initialState$p3, _table$initialState2;
      table.setPageSize(defaultState ? defaultPageSize : (_table$initialState$p3 = (_table$initialState2 = table.initialState) == null || (_table$initialState2 = _table$initialState2.pagination) == null ? void 0 : _table$initialState2.pageSize) != null ? _table$initialState$p3 : defaultPageSize);
    };
    table.setPageSize = (updater) => {
      table.setPagination((old) => {
        const pageSize = Math.max(1, functionalUpdate(updater, old.pageSize));
        const topRowIndex = old.pageSize * old.pageIndex;
        const pageIndex = Math.floor(topRowIndex / pageSize);
        return {
          ...old,
          pageIndex,
          pageSize
        };
      });
    };
    table.setPageCount = (updater) => table.setPagination((old) => {
      var _table$options$pageCo;
      let newPageCount = functionalUpdate(updater, (_table$options$pageCo = table.options.pageCount) != null ? _table$options$pageCo : -1);
      if (typeof newPageCount === "number") {
        newPageCount = Math.max(-1, newPageCount);
      }
      return {
        ...old,
        pageCount: newPageCount
      };
    });
    table.getPageOptions = memo(() => [table.getPageCount()], (pageCount) => {
      let pageOptions = [];
      if (pageCount && pageCount > 0) {
        pageOptions = [...new Array(pageCount)].fill(null).map((_, i) => i);
      }
      return pageOptions;
    }, getMemoOptions(table.options, "debugTable", "getPageOptions"));
    table.getCanPreviousPage = () => table.getState().pagination.pageIndex > 0;
    table.getCanNextPage = () => {
      const {
        pageIndex
      } = table.getState().pagination;
      const pageCount = table.getPageCount();
      if (pageCount === -1) {
        return true;
      }
      if (pageCount === 0) {
        return false;
      }
      return pageIndex < pageCount - 1;
    };
    table.previousPage = () => {
      return table.setPageIndex((old) => old - 1);
    };
    table.nextPage = () => {
      return table.setPageIndex((old) => {
        return old + 1;
      });
    };
    table.firstPage = () => {
      return table.setPageIndex(0);
    };
    table.lastPage = () => {
      return table.setPageIndex(table.getPageCount() - 1);
    };
    table.getPrePaginationRowModel = () => table.getExpandedRowModel();
    table.getPaginationRowModel = () => {
      if (!table._getPaginationRowModel && table.options.getPaginationRowModel) {
        table._getPaginationRowModel = table.options.getPaginationRowModel(table);
      }
      if (table.options.manualPagination || !table._getPaginationRowModel) {
        return table.getPrePaginationRowModel();
      }
      return table._getPaginationRowModel();
    };
    table.getPageCount = () => {
      var _table$options$pageCo2;
      return (_table$options$pageCo2 = table.options.pageCount) != null ? _table$options$pageCo2 : Math.ceil(table.getRowCount() / table.getState().pagination.pageSize);
    };
    table.getRowCount = () => {
      var _table$options$rowCou;
      return (_table$options$rowCou = table.options.rowCount) != null ? _table$options$rowCou : table.getPrePaginationRowModel().rows.length;
    };
  }
};
var getDefaultRowPinningState = () => ({
  top: [],
  bottom: []
});
var RowPinning = {
  getInitialState: (state) => {
    return {
      rowPinning: getDefaultRowPinningState(),
      ...state
    };
  },
  getDefaultOptions: (table) => {
    return {
      onRowPinningChange: makeStateUpdater("rowPinning", table)
    };
  },
  createRow: (row, table) => {
    row.pin = (position, includeLeafRows, includeParentRows) => {
      const leafRowIds = includeLeafRows ? row.getLeafRows().map((_ref) => {
        let {
          id
        } = _ref;
        return id;
      }) : [];
      const parentRowIds = includeParentRows ? row.getParentRows().map((_ref2) => {
        let {
          id
        } = _ref2;
        return id;
      }) : [];
      const rowIds = /* @__PURE__ */ new Set([...parentRowIds, row.id, ...leafRowIds]);
      table.setRowPinning((old) => {
        var _old$top3, _old$bottom3;
        if (position === "bottom") {
          var _old$top, _old$bottom;
          return {
            top: ((_old$top = old == null ? void 0 : old.top) != null ? _old$top : []).filter((d) => !(rowIds != null && rowIds.has(d))),
            bottom: [...((_old$bottom = old == null ? void 0 : old.bottom) != null ? _old$bottom : []).filter((d) => !(rowIds != null && rowIds.has(d))), ...Array.from(rowIds)]
          };
        }
        if (position === "top") {
          var _old$top2, _old$bottom2;
          return {
            top: [...((_old$top2 = old == null ? void 0 : old.top) != null ? _old$top2 : []).filter((d) => !(rowIds != null && rowIds.has(d))), ...Array.from(rowIds)],
            bottom: ((_old$bottom2 = old == null ? void 0 : old.bottom) != null ? _old$bottom2 : []).filter((d) => !(rowIds != null && rowIds.has(d)))
          };
        }
        return {
          top: ((_old$top3 = old == null ? void 0 : old.top) != null ? _old$top3 : []).filter((d) => !(rowIds != null && rowIds.has(d))),
          bottom: ((_old$bottom3 = old == null ? void 0 : old.bottom) != null ? _old$bottom3 : []).filter((d) => !(rowIds != null && rowIds.has(d)))
        };
      });
    };
    row.getCanPin = () => {
      var _ref3;
      const {
        enableRowPinning,
        enablePinning
      } = table.options;
      if (typeof enableRowPinning === "function") {
        return enableRowPinning(row);
      }
      return (_ref3 = enableRowPinning != null ? enableRowPinning : enablePinning) != null ? _ref3 : true;
    };
    row.getIsPinned = () => {
      const rowIds = [row.id];
      const {
        top,
        bottom
      } = table.getState().rowPinning;
      const isTop = rowIds.some((d) => top == null ? void 0 : top.includes(d));
      const isBottom = rowIds.some((d) => bottom == null ? void 0 : bottom.includes(d));
      return isTop ? "top" : isBottom ? "bottom" : false;
    };
    row.getPinnedIndex = () => {
      var _ref4, _visiblePinnedRowIds$;
      const position = row.getIsPinned();
      if (!position) return -1;
      const visiblePinnedRowIds = (_ref4 = position === "top" ? table.getTopRows() : table.getBottomRows()) == null ? void 0 : _ref4.map((_ref5) => {
        let {
          id
        } = _ref5;
        return id;
      });
      return (_visiblePinnedRowIds$ = visiblePinnedRowIds == null ? void 0 : visiblePinnedRowIds.indexOf(row.id)) != null ? _visiblePinnedRowIds$ : -1;
    };
  },
  createTable: (table) => {
    table.setRowPinning = (updater) => table.options.onRowPinningChange == null ? void 0 : table.options.onRowPinningChange(updater);
    table.resetRowPinning = (defaultState) => {
      var _table$initialState$r, _table$initialState;
      return table.setRowPinning(defaultState ? getDefaultRowPinningState() : (_table$initialState$r = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.rowPinning) != null ? _table$initialState$r : getDefaultRowPinningState());
    };
    table.getIsSomeRowsPinned = (position) => {
      var _pinningState$positio;
      const pinningState = table.getState().rowPinning;
      if (!position) {
        var _pinningState$top, _pinningState$bottom;
        return Boolean(((_pinningState$top = pinningState.top) == null ? void 0 : _pinningState$top.length) || ((_pinningState$bottom = pinningState.bottom) == null ? void 0 : _pinningState$bottom.length));
      }
      return Boolean((_pinningState$positio = pinningState[position]) == null ? void 0 : _pinningState$positio.length);
    };
    table._getPinnedRows = (visibleRows, pinnedRowIds, position) => {
      var _table$options$keepPi;
      const rows = ((_table$options$keepPi = table.options.keepPinnedRows) != null ? _table$options$keepPi : true) ? (
        //get all rows that are pinned even if they would not be otherwise visible
        //account for expanded parent rows, but not pagination or filtering
        (pinnedRowIds != null ? pinnedRowIds : []).map((rowId) => {
          const row = table.getRow(rowId, true);
          return row.getIsAllParentsExpanded() ? row : null;
        })
      ) : (
        //else get only visible rows that are pinned
        (pinnedRowIds != null ? pinnedRowIds : []).map((rowId) => visibleRows.find((row) => row.id === rowId))
      );
      return rows.filter(Boolean).map((d) => ({
        ...d,
        position
      }));
    };
    table.getTopRows = memo(() => [table.getRowModel().rows, table.getState().rowPinning.top], (allRows, topPinnedRowIds) => table._getPinnedRows(allRows, topPinnedRowIds, "top"), getMemoOptions(table.options, "debugRows", "getTopRows"));
    table.getBottomRows = memo(() => [table.getRowModel().rows, table.getState().rowPinning.bottom], (allRows, bottomPinnedRowIds) => table._getPinnedRows(allRows, bottomPinnedRowIds, "bottom"), getMemoOptions(table.options, "debugRows", "getBottomRows"));
    table.getCenterRows = memo(() => [table.getRowModel().rows, table.getState().rowPinning.top, table.getState().rowPinning.bottom], (allRows, top, bottom) => {
      const topAndBottom = /* @__PURE__ */ new Set([...top != null ? top : [], ...bottom != null ? bottom : []]);
      return allRows.filter((d) => !topAndBottom.has(d.id));
    }, getMemoOptions(table.options, "debugRows", "getCenterRows"));
  }
};
var RowSelection = {
  getInitialState: (state) => {
    return {
      rowSelection: {},
      ...state
    };
  },
  getDefaultOptions: (table) => {
    return {
      onRowSelectionChange: makeStateUpdater("rowSelection", table),
      enableRowSelection: true,
      enableMultiRowSelection: true,
      enableSubRowSelection: true
      // enableGroupingRowSelection: false,
      // isAdditiveSelectEvent: (e: unknown) => !!e.metaKey,
      // isInclusiveSelectEvent: (e: unknown) => !!e.shiftKey,
    };
  },
  createTable: (table) => {
    table.setRowSelection = (updater) => table.options.onRowSelectionChange == null ? void 0 : table.options.onRowSelectionChange(updater);
    table.resetRowSelection = (defaultState) => {
      var _table$initialState$r;
      return table.setRowSelection(defaultState ? {} : (_table$initialState$r = table.initialState.rowSelection) != null ? _table$initialState$r : {});
    };
    table.toggleAllRowsSelected = (value) => {
      table.setRowSelection((old) => {
        value = typeof value !== "undefined" ? value : !table.getIsAllRowsSelected();
        const rowSelection = {
          ...old
        };
        const preGroupedFlatRows = table.getPreGroupedRowModel().flatRows;
        if (value) {
          preGroupedFlatRows.forEach((row) => {
            if (!row.getCanSelect()) {
              return;
            }
            rowSelection[row.id] = true;
          });
        } else {
          preGroupedFlatRows.forEach((row) => {
            delete rowSelection[row.id];
          });
        }
        return rowSelection;
      });
    };
    table.toggleAllPageRowsSelected = (value) => table.setRowSelection((old) => {
      const resolvedValue = typeof value !== "undefined" ? value : !table.getIsAllPageRowsSelected();
      const rowSelection = {
        ...old
      };
      table.getRowModel().rows.forEach((row) => {
        mutateRowIsSelected(rowSelection, row.id, resolvedValue, true, table);
      });
      return rowSelection;
    });
    table.getPreSelectedRowModel = () => table.getCoreRowModel();
    table.getSelectedRowModel = memo(() => [table.getState().rowSelection, table.getCoreRowModel()], (rowSelection, rowModel) => {
      if (!Object.keys(rowSelection).length) {
        return {
          rows: [],
          flatRows: [],
          rowsById: {}
        };
      }
      return selectRowsFn(table, rowModel);
    }, getMemoOptions(table.options, "debugTable", "getSelectedRowModel"));
    table.getFilteredSelectedRowModel = memo(() => [table.getState().rowSelection, table.getFilteredRowModel()], (rowSelection, rowModel) => {
      if (!Object.keys(rowSelection).length) {
        return {
          rows: [],
          flatRows: [],
          rowsById: {}
        };
      }
      return selectRowsFn(table, rowModel);
    }, getMemoOptions(table.options, "debugTable", "getFilteredSelectedRowModel"));
    table.getGroupedSelectedRowModel = memo(() => [table.getState().rowSelection, table.getSortedRowModel()], (rowSelection, rowModel) => {
      if (!Object.keys(rowSelection).length) {
        return {
          rows: [],
          flatRows: [],
          rowsById: {}
        };
      }
      return selectRowsFn(table, rowModel);
    }, getMemoOptions(table.options, "debugTable", "getGroupedSelectedRowModel"));
    table.getIsAllRowsSelected = () => {
      const preGroupedFlatRows = table.getFilteredRowModel().flatRows;
      const {
        rowSelection
      } = table.getState();
      let isAllRowsSelected = Boolean(preGroupedFlatRows.length && Object.keys(rowSelection).length);
      if (isAllRowsSelected) {
        if (preGroupedFlatRows.some((row) => row.getCanSelect() && !rowSelection[row.id])) {
          isAllRowsSelected = false;
        }
      }
      return isAllRowsSelected;
    };
    table.getIsAllPageRowsSelected = () => {
      const paginationFlatRows = table.getPaginationRowModel().flatRows.filter((row) => row.getCanSelect());
      const {
        rowSelection
      } = table.getState();
      let isAllPageRowsSelected = !!paginationFlatRows.length;
      if (isAllPageRowsSelected && paginationFlatRows.some((row) => !rowSelection[row.id])) {
        isAllPageRowsSelected = false;
      }
      return isAllPageRowsSelected;
    };
    table.getIsSomeRowsSelected = () => {
      var _table$getState$rowSe;
      const totalSelected = Object.keys((_table$getState$rowSe = table.getState().rowSelection) != null ? _table$getState$rowSe : {}).length;
      return totalSelected > 0 && totalSelected < table.getFilteredRowModel().flatRows.length;
    };
    table.getIsSomePageRowsSelected = () => {
      const paginationFlatRows = table.getPaginationRowModel().flatRows;
      return table.getIsAllPageRowsSelected() ? false : paginationFlatRows.filter((row) => row.getCanSelect()).some((d) => d.getIsSelected() || d.getIsSomeSelected());
    };
    table.getToggleAllRowsSelectedHandler = () => {
      return (e) => {
        table.toggleAllRowsSelected(e.target.checked);
      };
    };
    table.getToggleAllPageRowsSelectedHandler = () => {
      return (e) => {
        table.toggleAllPageRowsSelected(e.target.checked);
      };
    };
  },
  createRow: (row, table) => {
    row.toggleSelected = (value, opts) => {
      const isSelected = row.getIsSelected();
      table.setRowSelection((old) => {
        var _opts$selectChildren;
        value = typeof value !== "undefined" ? value : !isSelected;
        if (row.getCanSelect() && isSelected === value) {
          return old;
        }
        const selectedRowIds = {
          ...old
        };
        mutateRowIsSelected(selectedRowIds, row.id, value, (_opts$selectChildren = opts == null ? void 0 : opts.selectChildren) != null ? _opts$selectChildren : true, table);
        return selectedRowIds;
      });
    };
    row.getIsSelected = () => {
      const {
        rowSelection
      } = table.getState();
      return isRowSelected(row, rowSelection);
    };
    row.getIsSomeSelected = () => {
      const {
        rowSelection
      } = table.getState();
      return isSubRowSelected(row, rowSelection) === "some";
    };
    row.getIsAllSubRowsSelected = () => {
      const {
        rowSelection
      } = table.getState();
      return isSubRowSelected(row, rowSelection) === "all";
    };
    row.getCanSelect = () => {
      var _table$options$enable;
      if (typeof table.options.enableRowSelection === "function") {
        return table.options.enableRowSelection(row);
      }
      return (_table$options$enable = table.options.enableRowSelection) != null ? _table$options$enable : true;
    };
    row.getCanSelectSubRows = () => {
      var _table$options$enable2;
      if (typeof table.options.enableSubRowSelection === "function") {
        return table.options.enableSubRowSelection(row);
      }
      return (_table$options$enable2 = table.options.enableSubRowSelection) != null ? _table$options$enable2 : true;
    };
    row.getCanMultiSelect = () => {
      var _table$options$enable3;
      if (typeof table.options.enableMultiRowSelection === "function") {
        return table.options.enableMultiRowSelection(row);
      }
      return (_table$options$enable3 = table.options.enableMultiRowSelection) != null ? _table$options$enable3 : true;
    };
    row.getToggleSelectedHandler = () => {
      const canSelect = row.getCanSelect();
      return (e) => {
        var _target;
        if (!canSelect) return;
        row.toggleSelected((_target = e.target) == null ? void 0 : _target.checked);
      };
    };
  }
};
var mutateRowIsSelected = (selectedRowIds, id, value, includeChildren, table) => {
  var _row$subRows;
  const row = table.getRow(id, true);
  if (value) {
    if (!row.getCanMultiSelect()) {
      Object.keys(selectedRowIds).forEach((key) => delete selectedRowIds[key]);
    }
    if (row.getCanSelect()) {
      selectedRowIds[id] = true;
    }
  } else {
    delete selectedRowIds[id];
  }
  if (includeChildren && (_row$subRows = row.subRows) != null && _row$subRows.length && row.getCanSelectSubRows()) {
    row.subRows.forEach((row2) => mutateRowIsSelected(selectedRowIds, row2.id, value, includeChildren, table));
  }
};
function selectRowsFn(table, rowModel) {
  const rowSelection = table.getState().rowSelection;
  const newSelectedFlatRows = [];
  const newSelectedRowsById = {};
  const recurseRows = function(rows, depth) {
    return rows.map((row) => {
      var _row$subRows2;
      const isSelected = isRowSelected(row, rowSelection);
      if (isSelected) {
        newSelectedFlatRows.push(row);
        newSelectedRowsById[row.id] = row;
      }
      if ((_row$subRows2 = row.subRows) != null && _row$subRows2.length) {
        row = {
          ...row,
          subRows: recurseRows(row.subRows)
        };
      }
      if (isSelected) {
        return row;
      }
    }).filter(Boolean);
  };
  return {
    rows: recurseRows(rowModel.rows),
    flatRows: newSelectedFlatRows,
    rowsById: newSelectedRowsById
  };
}
function isRowSelected(row, selection) {
  var _selection$row$id;
  return (_selection$row$id = selection[row.id]) != null ? _selection$row$id : false;
}
function isSubRowSelected(row, selection, table) {
  var _row$subRows3;
  if (!((_row$subRows3 = row.subRows) != null && _row$subRows3.length)) return false;
  let allChildrenSelected = true;
  let someSelected = false;
  row.subRows.forEach((subRow) => {
    if (someSelected && !allChildrenSelected) {
      return;
    }
    if (subRow.getCanSelect()) {
      if (isRowSelected(subRow, selection)) {
        someSelected = true;
      } else {
        allChildrenSelected = false;
      }
    }
    if (subRow.subRows && subRow.subRows.length) {
      const subRowChildrenSelected = isSubRowSelected(subRow, selection);
      if (subRowChildrenSelected === "all") {
        someSelected = true;
      } else if (subRowChildrenSelected === "some") {
        someSelected = true;
        allChildrenSelected = false;
      } else {
        allChildrenSelected = false;
      }
    }
  });
  return allChildrenSelected ? "all" : someSelected ? "some" : false;
}
var reSplitAlphaNumeric = /([0-9]+)/gm;
var alphanumeric = (rowA, rowB, columnId) => {
  return compareAlphanumeric(toString(rowA.getValue(columnId)).toLowerCase(), toString(rowB.getValue(columnId)).toLowerCase());
};
var alphanumericCaseSensitive = (rowA, rowB, columnId) => {
  return compareAlphanumeric(toString(rowA.getValue(columnId)), toString(rowB.getValue(columnId)));
};
var text = (rowA, rowB, columnId) => {
  return compareBasic(toString(rowA.getValue(columnId)).toLowerCase(), toString(rowB.getValue(columnId)).toLowerCase());
};
var textCaseSensitive = (rowA, rowB, columnId) => {
  return compareBasic(toString(rowA.getValue(columnId)), toString(rowB.getValue(columnId)));
};
var datetime = (rowA, rowB, columnId) => {
  const a = rowA.getValue(columnId);
  const b = rowB.getValue(columnId);
  return a > b ? 1 : a < b ? -1 : 0;
};
var basic = (rowA, rowB, columnId) => {
  return compareBasic(rowA.getValue(columnId), rowB.getValue(columnId));
};
function compareBasic(a, b) {
  return a === b ? 0 : a > b ? 1 : -1;
}
function toString(a) {
  if (typeof a === "number") {
    if (isNaN(a) || a === Infinity || a === -Infinity) {
      return "";
    }
    return String(a);
  }
  if (typeof a === "string") {
    return a;
  }
  return "";
}
function compareAlphanumeric(aStr, bStr) {
  const a = aStr.split(reSplitAlphaNumeric).filter(Boolean);
  const b = bStr.split(reSplitAlphaNumeric).filter(Boolean);
  while (a.length && b.length) {
    const aa = a.shift();
    const bb = b.shift();
    const an = parseInt(aa, 10);
    const bn = parseInt(bb, 10);
    const combo = [an, bn].sort();
    if (isNaN(combo[0])) {
      if (aa > bb) {
        return 1;
      }
      if (bb > aa) {
        return -1;
      }
      continue;
    }
    if (isNaN(combo[1])) {
      return isNaN(an) ? -1 : 1;
    }
    if (an > bn) {
      return 1;
    }
    if (bn > an) {
      return -1;
    }
  }
  return a.length - b.length;
}
var sortingFns = {
  alphanumeric,
  alphanumericCaseSensitive,
  text,
  textCaseSensitive,
  datetime,
  basic
};
var RowSorting = {
  getInitialState: (state) => {
    return {
      sorting: [],
      ...state
    };
  },
  getDefaultColumnDef: () => {
    return {
      sortingFn: "auto",
      sortUndefined: 1
    };
  },
  getDefaultOptions: (table) => {
    return {
      onSortingChange: makeStateUpdater("sorting", table),
      isMultiSortEvent: (e) => {
        return e.shiftKey;
      }
    };
  },
  createColumn: (column, table) => {
    column.getAutoSortingFn = () => {
      const firstRows = table.getFilteredRowModel().flatRows.slice(10);
      let isString = false;
      for (const row of firstRows) {
        const value = row == null ? void 0 : row.getValue(column.id);
        if (Object.prototype.toString.call(value) === "[object Date]") {
          return sortingFns.datetime;
        }
        if (typeof value === "string") {
          isString = true;
          if (value.split(reSplitAlphaNumeric).length > 1) {
            return sortingFns.alphanumeric;
          }
        }
      }
      if (isString) {
        return sortingFns.text;
      }
      return sortingFns.basic;
    };
    column.getAutoSortDir = () => {
      const firstRow = table.getFilteredRowModel().flatRows[0];
      const value = firstRow == null ? void 0 : firstRow.getValue(column.id);
      if (typeof value === "string") {
        return "asc";
      }
      return "desc";
    };
    column.getSortingFn = () => {
      var _table$options$sortin, _table$options$sortin2;
      if (!column) {
        throw new Error();
      }
      return isFunction(column.columnDef.sortingFn) ? column.columnDef.sortingFn : column.columnDef.sortingFn === "auto" ? column.getAutoSortingFn() : (_table$options$sortin = (_table$options$sortin2 = table.options.sortingFns) == null ? void 0 : _table$options$sortin2[column.columnDef.sortingFn]) != null ? _table$options$sortin : sortingFns[column.columnDef.sortingFn];
    };
    column.toggleSorting = (desc, multi) => {
      const nextSortingOrder = column.getNextSortingOrder();
      const hasManualValue = typeof desc !== "undefined" && desc !== null;
      table.setSorting((old) => {
        const existingSorting = old == null ? void 0 : old.find((d) => d.id === column.id);
        const existingIndex = old == null ? void 0 : old.findIndex((d) => d.id === column.id);
        let newSorting = [];
        let sortAction;
        let nextDesc = hasManualValue ? desc : nextSortingOrder === "desc";
        if (old != null && old.length && column.getCanMultiSort() && multi) {
          if (existingSorting) {
            sortAction = "toggle";
          } else {
            sortAction = "add";
          }
        } else {
          if (old != null && old.length && existingIndex !== old.length - 1) {
            sortAction = "replace";
          } else if (existingSorting) {
            sortAction = "toggle";
          } else {
            sortAction = "replace";
          }
        }
        if (sortAction === "toggle") {
          if (!hasManualValue) {
            if (!nextSortingOrder) {
              sortAction = "remove";
            }
          }
        }
        if (sortAction === "add") {
          var _table$options$maxMul;
          newSorting = [...old, {
            id: column.id,
            desc: nextDesc
          }];
          newSorting.splice(0, newSorting.length - ((_table$options$maxMul = table.options.maxMultiSortColCount) != null ? _table$options$maxMul : Number.MAX_SAFE_INTEGER));
        } else if (sortAction === "toggle") {
          newSorting = old.map((d) => {
            if (d.id === column.id) {
              return {
                ...d,
                desc: nextDesc
              };
            }
            return d;
          });
        } else if (sortAction === "remove") {
          newSorting = old.filter((d) => d.id !== column.id);
        } else {
          newSorting = [{
            id: column.id,
            desc: nextDesc
          }];
        }
        return newSorting;
      });
    };
    column.getFirstSortDir = () => {
      var _ref, _column$columnDef$sor;
      const sortDescFirst = (_ref = (_column$columnDef$sor = column.columnDef.sortDescFirst) != null ? _column$columnDef$sor : table.options.sortDescFirst) != null ? _ref : column.getAutoSortDir() === "desc";
      return sortDescFirst ? "desc" : "asc";
    };
    column.getNextSortingOrder = (multi) => {
      var _table$options$enable, _table$options$enable2;
      const firstSortDirection = column.getFirstSortDir();
      const isSorted = column.getIsSorted();
      if (!isSorted) {
        return firstSortDirection;
      }
      if (isSorted !== firstSortDirection && ((_table$options$enable = table.options.enableSortingRemoval) != null ? _table$options$enable : true) && // If enableSortRemove, enable in general
      (multi ? (_table$options$enable2 = table.options.enableMultiRemove) != null ? _table$options$enable2 : true : true)) {
        return false;
      }
      return isSorted === "desc" ? "asc" : "desc";
    };
    column.getCanSort = () => {
      var _column$columnDef$ena, _table$options$enable3;
      return ((_column$columnDef$ena = column.columnDef.enableSorting) != null ? _column$columnDef$ena : true) && ((_table$options$enable3 = table.options.enableSorting) != null ? _table$options$enable3 : true) && !!column.accessorFn;
    };
    column.getCanMultiSort = () => {
      var _ref2, _column$columnDef$ena2;
      return (_ref2 = (_column$columnDef$ena2 = column.columnDef.enableMultiSort) != null ? _column$columnDef$ena2 : table.options.enableMultiSort) != null ? _ref2 : !!column.accessorFn;
    };
    column.getIsSorted = () => {
      var _table$getState$sorti;
      const columnSort = (_table$getState$sorti = table.getState().sorting) == null ? void 0 : _table$getState$sorti.find((d) => d.id === column.id);
      return !columnSort ? false : columnSort.desc ? "desc" : "asc";
    };
    column.getSortIndex = () => {
      var _table$getState$sorti2, _table$getState$sorti3;
      return (_table$getState$sorti2 = (_table$getState$sorti3 = table.getState().sorting) == null ? void 0 : _table$getState$sorti3.findIndex((d) => d.id === column.id)) != null ? _table$getState$sorti2 : -1;
    };
    column.clearSorting = () => {
      table.setSorting((old) => old != null && old.length ? old.filter((d) => d.id !== column.id) : []);
    };
    column.getToggleSortingHandler = () => {
      const canSort = column.getCanSort();
      return (e) => {
        if (!canSort) return;
        e.persist == null || e.persist();
        column.toggleSorting == null || column.toggleSorting(void 0, column.getCanMultiSort() ? table.options.isMultiSortEvent == null ? void 0 : table.options.isMultiSortEvent(e) : false);
      };
    };
  },
  createTable: (table) => {
    table.setSorting = (updater) => table.options.onSortingChange == null ? void 0 : table.options.onSortingChange(updater);
    table.resetSorting = (defaultState) => {
      var _table$initialState$s, _table$initialState;
      table.setSorting(defaultState ? [] : (_table$initialState$s = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.sorting) != null ? _table$initialState$s : []);
    };
    table.getPreSortedRowModel = () => table.getGroupedRowModel();
    table.getSortedRowModel = () => {
      if (!table._getSortedRowModel && table.options.getSortedRowModel) {
        table._getSortedRowModel = table.options.getSortedRowModel(table);
      }
      if (table.options.manualSorting || !table._getSortedRowModel) {
        return table.getPreSortedRowModel();
      }
      return table._getSortedRowModel();
    };
  }
};
var builtInFeatures = [
  Headers,
  ColumnVisibility,
  ColumnOrdering,
  ColumnPinning,
  ColumnFaceting,
  ColumnFiltering,
  GlobalFaceting,
  //depends on ColumnFaceting
  GlobalFiltering,
  //depends on ColumnFiltering
  RowSorting,
  ColumnGrouping,
  //depends on RowSorting
  RowExpanding,
  RowPagination,
  RowPinning,
  RowSelection,
  ColumnSizing
];
function createTable(options) {
  var _options$_features, _options$initialState;
  if (process.env.NODE_ENV !== "production" && (options.debugAll || options.debugTable)) {
    console.info("Creating Table Instance...");
  }
  const _features = [...builtInFeatures, ...(_options$_features = options._features) != null ? _options$_features : []];
  let table = {
    _features
  };
  const defaultOptions = table._features.reduce((obj, feature) => {
    return Object.assign(obj, feature.getDefaultOptions == null ? void 0 : feature.getDefaultOptions(table));
  }, {});
  const mergeOptions = (options2) => {
    if (table.options.mergeOptions) {
      return table.options.mergeOptions(defaultOptions, options2);
    }
    return {
      ...defaultOptions,
      ...options2
    };
  };
  const coreInitialState = {};
  let initialState = {
    ...coreInitialState,
    ...(_options$initialState = options.initialState) != null ? _options$initialState : {}
  };
  table._features.forEach((feature) => {
    var _feature$getInitialSt;
    initialState = (_feature$getInitialSt = feature.getInitialState == null ? void 0 : feature.getInitialState(initialState)) != null ? _feature$getInitialSt : initialState;
  });
  const queued = [];
  let queuedTimeout = false;
  const coreInstance = {
    _features,
    options: {
      ...defaultOptions,
      ...options
    },
    initialState,
    _queue: (cb) => {
      queued.push(cb);
      if (!queuedTimeout) {
        queuedTimeout = true;
        Promise.resolve().then(() => {
          while (queued.length) {
            queued.shift()();
          }
          queuedTimeout = false;
        }).catch((error) => setTimeout(() => {
          throw error;
        }));
      }
    },
    reset: () => {
      table.setState(table.initialState);
    },
    setOptions: (updater) => {
      const newOptions = functionalUpdate(updater, table.options);
      table.options = mergeOptions(newOptions);
    },
    getState: () => {
      return table.options.state;
    },
    setState: (updater) => {
      table.options.onStateChange == null || table.options.onStateChange(updater);
    },
    _getRowId: (row, index, parent) => {
      var _table$options$getRow;
      return (_table$options$getRow = table.options.getRowId == null ? void 0 : table.options.getRowId(row, index, parent)) != null ? _table$options$getRow : `${parent ? [parent.id, index].join(".") : index}`;
    },
    getCoreRowModel: () => {
      if (!table._getCoreRowModel) {
        table._getCoreRowModel = table.options.getCoreRowModel(table);
      }
      return table._getCoreRowModel();
    },
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => {
      return table.getPaginationRowModel();
    },
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (id, searchAll) => {
      let row = (searchAll ? table.getPrePaginationRowModel() : table.getRowModel()).rowsById[id];
      if (!row) {
        row = table.getCoreRowModel().rowsById[id];
        if (!row) {
          if (process.env.NODE_ENV !== "production") {
            throw new Error(`getRow could not find row with ID: ${id}`);
          }
          throw new Error();
        }
      }
      return row;
    },
    _getDefaultColumnDef: memo(() => [table.options.defaultColumn], (defaultColumn) => {
      var _defaultColumn;
      defaultColumn = (_defaultColumn = defaultColumn) != null ? _defaultColumn : {};
      return {
        header: (props) => {
          const resolvedColumnDef = props.header.column.columnDef;
          if (resolvedColumnDef.accessorKey) {
            return resolvedColumnDef.accessorKey;
          }
          if (resolvedColumnDef.accessorFn) {
            return resolvedColumnDef.id;
          }
          return null;
        },
        // footer: props => props.header.column.id,
        cell: (props) => {
          var _props$renderValue$to, _props$renderValue;
          return (_props$renderValue$to = (_props$renderValue = props.renderValue()) == null || _props$renderValue.toString == null ? void 0 : _props$renderValue.toString()) != null ? _props$renderValue$to : null;
        },
        ...table._features.reduce((obj, feature) => {
          return Object.assign(obj, feature.getDefaultColumnDef == null ? void 0 : feature.getDefaultColumnDef());
        }, {}),
        ...defaultColumn
      };
    }, getMemoOptions(options, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => table.options.columns,
    getAllColumns: memo(() => [table._getColumnDefs()], (columnDefs) => {
      const recurseColumns = function(columnDefs2, parent, depth) {
        if (depth === void 0) {
          depth = 0;
        }
        return columnDefs2.map((columnDef) => {
          const column = createColumn(table, columnDef, depth, parent);
          const groupingColumnDef = columnDef;
          column.columns = groupingColumnDef.columns ? recurseColumns(groupingColumnDef.columns, column, depth + 1) : [];
          return column;
        });
      };
      return recurseColumns(columnDefs);
    }, getMemoOptions(options, "debugColumns", "getAllColumns")),
    getAllFlatColumns: memo(() => [table.getAllColumns()], (allColumns) => {
      return allColumns.flatMap((column) => {
        return column.getFlatColumns();
      });
    }, getMemoOptions(options, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: memo(() => [table.getAllFlatColumns()], (flatColumns) => {
      return flatColumns.reduce((acc, column) => {
        acc[column.id] = column;
        return acc;
      }, {});
    }, getMemoOptions(options, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: memo(() => [table.getAllColumns(), table._getOrderColumnsFn()], (allColumns, orderColumns2) => {
      let leafColumns = allColumns.flatMap((column) => column.getLeafColumns());
      return orderColumns2(leafColumns);
    }, getMemoOptions(options, "debugColumns", "getAllLeafColumns")),
    getColumn: (columnId) => {
      const column = table._getAllFlatColumnsById()[columnId];
      if (process.env.NODE_ENV !== "production" && !column) {
        console.error(`[Table] Column with id '${columnId}' does not exist.`);
      }
      return column;
    }
  };
  Object.assign(table, coreInstance);
  for (let index = 0; index < table._features.length; index++) {
    const feature = table._features[index];
    feature == null || feature.createTable == null || feature.createTable(table);
  }
  return table;
}
function getCoreRowModel() {
  return (table) => memo(() => [table.options.data], (data) => {
    const rowModel = {
      rows: [],
      flatRows: [],
      rowsById: {}
    };
    const accessRows = function(originalRows, depth, parentRow) {
      if (depth === void 0) {
        depth = 0;
      }
      const rows = [];
      for (let i = 0; i < originalRows.length; i++) {
        const row = createRow(table, table._getRowId(originalRows[i], i, parentRow), originalRows[i], i, depth, void 0, parentRow == null ? void 0 : parentRow.id);
        rowModel.flatRows.push(row);
        rowModel.rowsById[row.id] = row;
        rows.push(row);
        if (table.options.getSubRows) {
          var _row$originalSubRows;
          row.originalSubRows = table.options.getSubRows(originalRows[i], i);
          if ((_row$originalSubRows = row.originalSubRows) != null && _row$originalSubRows.length) {
            row.subRows = accessRows(row.originalSubRows, depth + 1, row);
          }
        }
      }
      return rows;
    };
    rowModel.rows = accessRows(data);
    return rowModel;
  }, getMemoOptions(table.options, "debugTable", "getRowModel", () => table._autoResetPageIndex()));
}
function expandRows(rowModel) {
  const expandedRows = [];
  const handleRow = (row) => {
    var _row$subRows;
    expandedRows.push(row);
    if ((_row$subRows = row.subRows) != null && _row$subRows.length && row.getIsExpanded()) {
      row.subRows.forEach(handleRow);
    }
  };
  rowModel.rows.forEach(handleRow);
  return {
    rows: expandedRows,
    flatRows: rowModel.flatRows,
    rowsById: rowModel.rowsById
  };
}
function filterRows(rows, filterRowImpl, table) {
  if (table.options.filterFromLeafRows) {
    return filterRowModelFromLeafs(rows, filterRowImpl, table);
  }
  return filterRowModelFromRoot(rows, filterRowImpl, table);
}
function filterRowModelFromLeafs(rowsToFilter, filterRow, table) {
  var _table$options$maxLea;
  const newFilteredFlatRows = [];
  const newFilteredRowsById = {};
  const maxDepth = (_table$options$maxLea = table.options.maxLeafRowFilterDepth) != null ? _table$options$maxLea : 100;
  const recurseFilterRows = function(rowsToFilter2, depth) {
    if (depth === void 0) {
      depth = 0;
    }
    const rows = [];
    for (let i = 0; i < rowsToFilter2.length; i++) {
      var _row$subRows;
      let row = rowsToFilter2[i];
      const newRow = createRow(table, row.id, row.original, row.index, row.depth, void 0, row.parentId);
      newRow.columnFilters = row.columnFilters;
      if ((_row$subRows = row.subRows) != null && _row$subRows.length && depth < maxDepth) {
        newRow.subRows = recurseFilterRows(row.subRows, depth + 1);
        row = newRow;
        if (filterRow(row) && !newRow.subRows.length) {
          rows.push(row);
          newFilteredRowsById[row.id] = row;
          newFilteredFlatRows.push(row);
          continue;
        }
        if (filterRow(row) || newRow.subRows.length) {
          rows.push(row);
          newFilteredRowsById[row.id] = row;
          newFilteredFlatRows.push(row);
          continue;
        }
      } else {
        row = newRow;
        if (filterRow(row)) {
          rows.push(row);
          newFilteredRowsById[row.id] = row;
          newFilteredFlatRows.push(row);
        }
      }
    }
    return rows;
  };
  return {
    rows: recurseFilterRows(rowsToFilter),
    flatRows: newFilteredFlatRows,
    rowsById: newFilteredRowsById
  };
}
function filterRowModelFromRoot(rowsToFilter, filterRow, table) {
  var _table$options$maxLea2;
  const newFilteredFlatRows = [];
  const newFilteredRowsById = {};
  const maxDepth = (_table$options$maxLea2 = table.options.maxLeafRowFilterDepth) != null ? _table$options$maxLea2 : 100;
  const recurseFilterRows = function(rowsToFilter2, depth) {
    if (depth === void 0) {
      depth = 0;
    }
    const rows = [];
    for (let i = 0; i < rowsToFilter2.length; i++) {
      let row = rowsToFilter2[i];
      const pass = filterRow(row);
      if (pass) {
        var _row$subRows2;
        if ((_row$subRows2 = row.subRows) != null && _row$subRows2.length && depth < maxDepth) {
          const newRow = createRow(table, row.id, row.original, row.index, row.depth, void 0, row.parentId);
          newRow.subRows = recurseFilterRows(row.subRows, depth + 1);
          row = newRow;
        }
        rows.push(row);
        newFilteredFlatRows.push(row);
        newFilteredRowsById[row.id] = row;
      }
    }
    return rows;
  };
  return {
    rows: recurseFilterRows(rowsToFilter),
    flatRows: newFilteredFlatRows,
    rowsById: newFilteredRowsById
  };
}
function getFacetedRowModel() {
  return (table, columnId) => memo(() => [table.getPreFilteredRowModel(), table.getState().columnFilters, table.getState().globalFilter, table.getFilteredRowModel()], (preRowModel, columnFilters, globalFilter) => {
    if (!preRowModel.rows.length || !(columnFilters != null && columnFilters.length) && !globalFilter) {
      return preRowModel;
    }
    const filterableIds = [...columnFilters.map((d) => d.id).filter((d) => d !== columnId), globalFilter ? "__global__" : void 0].filter(Boolean);
    const filterRowsImpl = (row) => {
      for (let i = 0; i < filterableIds.length; i++) {
        if (row.columnFilters[filterableIds[i]] === false) {
          return false;
        }
      }
      return true;
    };
    return filterRows(preRowModel.rows, filterRowsImpl, table);
  }, getMemoOptions(table.options, "debugTable", "getFacetedRowModel"));
}
function getFacetedUniqueValues() {
  return (table, columnId) => memo(() => {
    var _table$getColumn;
    return [(_table$getColumn = table.getColumn(columnId)) == null ? void 0 : _table$getColumn.getFacetedRowModel()];
  }, (facetedRowModel) => {
    if (!facetedRowModel) return /* @__PURE__ */ new Map();
    let facetedUniqueValues = /* @__PURE__ */ new Map();
    for (let i = 0; i < facetedRowModel.flatRows.length; i++) {
      const values = facetedRowModel.flatRows[i].getUniqueValues(columnId);
      for (let j = 0; j < values.length; j++) {
        const value = values[j];
        if (facetedUniqueValues.has(value)) {
          var _facetedUniqueValues$;
          facetedUniqueValues.set(value, ((_facetedUniqueValues$ = facetedUniqueValues.get(value)) != null ? _facetedUniqueValues$ : 0) + 1);
        } else {
          facetedUniqueValues.set(value, 1);
        }
      }
    }
    return facetedUniqueValues;
  }, getMemoOptions(table.options, "debugTable", `getFacetedUniqueValues_${columnId}`));
}
function getFilteredRowModel() {
  return (table) => memo(() => [table.getPreFilteredRowModel(), table.getState().columnFilters, table.getState().globalFilter], (rowModel, columnFilters, globalFilter) => {
    if (!rowModel.rows.length || !(columnFilters != null && columnFilters.length) && !globalFilter) {
      for (let i = 0; i < rowModel.flatRows.length; i++) {
        rowModel.flatRows[i].columnFilters = {};
        rowModel.flatRows[i].columnFiltersMeta = {};
      }
      return rowModel;
    }
    const resolvedColumnFilters = [];
    const resolvedGlobalFilters = [];
    (columnFilters != null ? columnFilters : []).forEach((d) => {
      var _filterFn$resolveFilt;
      const column = table.getColumn(d.id);
      if (!column) {
        return;
      }
      const filterFn = column.getFilterFn();
      if (!filterFn) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(`Could not find a valid 'column.filterFn' for column with the ID: ${column.id}.`);
        }
        return;
      }
      resolvedColumnFilters.push({
        id: d.id,
        filterFn,
        resolvedValue: (_filterFn$resolveFilt = filterFn.resolveFilterValue == null ? void 0 : filterFn.resolveFilterValue(d.value)) != null ? _filterFn$resolveFilt : d.value
      });
    });
    const filterableIds = (columnFilters != null ? columnFilters : []).map((d) => d.id);
    const globalFilterFn = table.getGlobalFilterFn();
    const globallyFilterableColumns = table.getAllLeafColumns().filter((column) => column.getCanGlobalFilter());
    if (globalFilter && globalFilterFn && globallyFilterableColumns.length) {
      filterableIds.push("__global__");
      globallyFilterableColumns.forEach((column) => {
        var _globalFilterFn$resol;
        resolvedGlobalFilters.push({
          id: column.id,
          filterFn: globalFilterFn,
          resolvedValue: (_globalFilterFn$resol = globalFilterFn.resolveFilterValue == null ? void 0 : globalFilterFn.resolveFilterValue(globalFilter)) != null ? _globalFilterFn$resol : globalFilter
        });
      });
    }
    let currentColumnFilter;
    let currentGlobalFilter;
    for (let j = 0; j < rowModel.flatRows.length; j++) {
      const row = rowModel.flatRows[j];
      row.columnFilters = {};
      if (resolvedColumnFilters.length) {
        for (let i = 0; i < resolvedColumnFilters.length; i++) {
          currentColumnFilter = resolvedColumnFilters[i];
          const id = currentColumnFilter.id;
          row.columnFilters[id] = currentColumnFilter.filterFn(row, id, currentColumnFilter.resolvedValue, (filterMeta) => {
            row.columnFiltersMeta[id] = filterMeta;
          });
        }
      }
      if (resolvedGlobalFilters.length) {
        for (let i = 0; i < resolvedGlobalFilters.length; i++) {
          currentGlobalFilter = resolvedGlobalFilters[i];
          const id = currentGlobalFilter.id;
          if (currentGlobalFilter.filterFn(row, id, currentGlobalFilter.resolvedValue, (filterMeta) => {
            row.columnFiltersMeta[id] = filterMeta;
          })) {
            row.columnFilters.__global__ = true;
            break;
          }
        }
        if (row.columnFilters.__global__ !== true) {
          row.columnFilters.__global__ = false;
        }
      }
    }
    const filterRowsImpl = (row) => {
      for (let i = 0; i < filterableIds.length; i++) {
        if (row.columnFilters[filterableIds[i]] === false) {
          return false;
        }
      }
      return true;
    };
    return filterRows(rowModel.rows, filterRowsImpl, table);
  }, getMemoOptions(table.options, "debugTable", "getFilteredRowModel", () => table._autoResetPageIndex()));
}
function getPaginationRowModel(opts) {
  return (table) => memo(() => [table.getState().pagination, table.getPrePaginationRowModel(), table.options.paginateExpandedRows ? void 0 : table.getState().expanded], (pagination, rowModel) => {
    if (!rowModel.rows.length) {
      return rowModel;
    }
    const {
      pageSize,
      pageIndex
    } = pagination;
    let {
      rows,
      flatRows,
      rowsById
    } = rowModel;
    const pageStart = pageSize * pageIndex;
    const pageEnd = pageStart + pageSize;
    rows = rows.slice(pageStart, pageEnd);
    let paginatedRowModel;
    if (!table.options.paginateExpandedRows) {
      paginatedRowModel = expandRows({
        rows,
        flatRows,
        rowsById
      });
    } else {
      paginatedRowModel = {
        rows,
        flatRows,
        rowsById
      };
    }
    paginatedRowModel.flatRows = [];
    const handleRow = (row) => {
      paginatedRowModel.flatRows.push(row);
      if (row.subRows.length) {
        row.subRows.forEach(handleRow);
      }
    };
    paginatedRowModel.rows.forEach(handleRow);
    return paginatedRowModel;
  }, getMemoOptions(table.options, "debugTable", "getPaginationRowModel"));
}
function getSortedRowModel() {
  return (table) => memo(() => [table.getState().sorting, table.getPreSortedRowModel()], (sorting, rowModel) => {
    if (!rowModel.rows.length || !(sorting != null && sorting.length)) {
      return rowModel;
    }
    const sortingState = table.getState().sorting;
    const sortedFlatRows = [];
    const availableSorting = sortingState.filter((sort) => {
      var _table$getColumn;
      return (_table$getColumn = table.getColumn(sort.id)) == null ? void 0 : _table$getColumn.getCanSort();
    });
    const columnInfoById = {};
    availableSorting.forEach((sortEntry) => {
      const column = table.getColumn(sortEntry.id);
      if (!column) return;
      columnInfoById[sortEntry.id] = {
        sortUndefined: column.columnDef.sortUndefined,
        invertSorting: column.columnDef.invertSorting,
        sortingFn: column.getSortingFn()
      };
    });
    const sortData = (rows) => {
      const sortedData = rows.map((row) => ({
        ...row
      }));
      sortedData.sort((rowA, rowB) => {
        for (let i = 0; i < availableSorting.length; i += 1) {
          var _sortEntry$desc;
          const sortEntry = availableSorting[i];
          const columnInfo = columnInfoById[sortEntry.id];
          const sortUndefined = columnInfo.sortUndefined;
          const isDesc = (_sortEntry$desc = sortEntry == null ? void 0 : sortEntry.desc) != null ? _sortEntry$desc : false;
          let sortInt = 0;
          if (sortUndefined) {
            const aValue = rowA.getValue(sortEntry.id);
            const bValue = rowB.getValue(sortEntry.id);
            const aUndefined = aValue === void 0;
            const bUndefined = bValue === void 0;
            if (aUndefined || bUndefined) {
              if (sortUndefined === "first") return aUndefined ? -1 : 1;
              if (sortUndefined === "last") return aUndefined ? 1 : -1;
              sortInt = aUndefined && bUndefined ? 0 : aUndefined ? sortUndefined : -sortUndefined;
            }
          }
          if (sortInt === 0) {
            sortInt = columnInfo.sortingFn(rowA, rowB, sortEntry.id);
          }
          if (sortInt !== 0) {
            if (isDesc) {
              sortInt *= -1;
            }
            if (columnInfo.invertSorting) {
              sortInt *= -1;
            }
            return sortInt;
          }
        }
        return rowA.index - rowB.index;
      });
      sortedData.forEach((row) => {
        var _row$subRows;
        sortedFlatRows.push(row);
        if ((_row$subRows = row.subRows) != null && _row$subRows.length) {
          row.subRows = sortData(row.subRows);
        }
      });
      return sortedData;
    };
    return {
      rows: sortData(rowModel.rows),
      flatRows: sortedFlatRows,
      rowsById: rowModel.rowsById
    };
  }, getMemoOptions(table.options, "debugTable", "getSortedRowModel", () => table._autoResetPageIndex()));
}
var TableContext = React.createContext({
  density: "comfortable",
  striped: false,
  hoverable: false,
  bordered: false
});
function useTableContext() {
  return React.useContext(TableContext);
}
function SortAscIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m5 15 7-7 7 7" })
    }
  );
}
function SortDescIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m19 9-7 7-7-7" })
    }
  );
}
function SortNeutralIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m7 15 5 5 5-5" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m7 9 5-5 5 5" })
      ]
    }
  );
}
var tableRootVariants = classVarianceAuthority.cva(
  ["w-full", "caption-bottom", "text-sm", "border-collapse", "m-0"],
  {
    variants: {
      density: {
        compact: "",
        comfortable: ""
      }
    },
    defaultVariants: {
      density: "comfortable"
    }
  }
);
var densityHeadPadding = {
  compact: "px-3 py-1.5",
  comfortable: "px-4 py-2.5"
};
var densityCellPadding = {
  compact: "px-3 py-1.5",
  comfortable: "px-4 py-2"
};
var alignClassMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right"
};
var Table = React.forwardRef(function Table2({
  density = "comfortable",
  striped = false,
  hoverable = false,
  bordered = false,
  responsive = true,
  wrapperClassName,
  className,
  children,
  ...rest
}, ref) {
  const contextValue = {
    density,
    striped,
    hoverable,
    bordered
  };
  const table = /* @__PURE__ */ jsxRuntime.jsx(TableContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxRuntime.jsx(
    "table",
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "not-prose",
        tableRootVariants({ density }),
        bordered && !responsive && "border border-border rounded-md",
        className
      ),
      "data-ds": "",
      "data-ds-component": "table",
      "data-ds-density": density,
      ...rest,
      children
    }
  ) });
  if (responsive) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: chunk4ON3M3OM_cjs.cn(
          "not-prose",
          "w-full overflow-x-auto overflow-y-hidden",
          "rounded-md border border-border",
          wrapperClassName
        ),
        "data-ds": "",
        "data-ds-component": "table-wrapper",
        children: table
      }
    );
  }
  return table;
});
Table.displayName = "Table";
var TableHeader = React.forwardRef(function TableHeader2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "thead",
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "bg-muted/50",
        "[&_tr]:border-b [&_tr]:border-border",
        className
      ),
      "data-ds": "",
      "data-ds-component": "table-header",
      ...rest,
      children
    }
  );
});
TableHeader.displayName = "TableHeader";
var TableBody = React.forwardRef(
  function TableBody2({ className, children, ...rest }, ref) {
    const { striped, hoverable, bordered } = useTableContext();
    return /* @__PURE__ */ jsxRuntime.jsx(
      "tbody",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(
          // Last row: no bottom border (the wrapper/table border handles it)
          "[&_tr:last-child]:border-b-0",
          // Row borders
          "[&_tr]:border-b [&_tr]:border-border-muted",
          // Striped rows
          striped && "**:data-[ds-row-index=odd]:bg-muted/30",
          // Hoverable rows
          hoverable && "[&_tr]:transition-colors [&_tr]:duration-fast [&_tr:hover]:bg-muted/50",
          // Bordered cells
          bordered && "[&_td]:border-r [&_td]:border-border-muted [&_td:last-child]:border-r-0",
          className
        ),
        "data-ds": "",
        "data-ds-component": "table-body",
        ...rest,
        children
      }
    );
  }
);
TableBody.displayName = "TableBody";
var TableFooter = React.forwardRef(function TableFooter2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "tfoot",
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "bg-muted/50",
        "border-t border-border",
        "font-medium",
        "[&_tr]:border-b-0",
        className
      ),
      "data-ds": "",
      "data-ds-component": "table-footer",
      ...rest,
      children
    }
  );
});
TableFooter.displayName = "TableFooter";
var TableRow = React.forwardRef(
  function TableRow2({ selected = false, className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "tr",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(
          "transition-colors duration-fast",
          selected && "bg-primary-muted",
          className
        ),
        "data-ds": "",
        "data-ds-component": "table-row",
        "aria-selected": selected || void 0,
        ...rest,
        children
      }
    );
  }
);
TableRow.displayName = "TableRow";
var TableHead = React.forwardRef(
  function TableHead2({
    align = "left",
    sortable = false,
    sorted,
    onSort,
    sticky = false,
    className,
    children,
    ...rest
  }, ref) {
    const { density, bordered } = useTableContext();
    const content = sortable ? /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        type: "button",
        onClick: onSort,
        className: chunk4ON3M3OM_cjs.cn(
          "inline-flex items-center gap-1",
          "w-full",
          "cursor-pointer select-none",
          "hover:text-foreground",
          "transition-colors duration-fast",
          chunk3EHT6IOA_cjs.focusRingCompactClasses,
          "rounded-sm",
          align === "right" && "justify-end",
          align === "center" && "justify-center"
        ),
        "aria-label": sorted === "asc" ? "Sorted ascending. Click to sort descending." : sorted === "desc" ? "Sorted descending. Click to remove sort." : "Click to sort ascending.",
        children: [
          children,
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0", children: sorted === "asc" ? /* @__PURE__ */ jsxRuntime.jsx(SortAscIcon, { className: "size-3.5" }) : sorted === "desc" ? /* @__PURE__ */ jsxRuntime.jsx(SortDescIcon, { className: "size-3.5" }) : /* @__PURE__ */ jsxRuntime.jsx(SortNeutralIcon, { className: "size-3.5 opacity-30" }) })
        ]
      }
    ) : children;
    return /* @__PURE__ */ jsxRuntime.jsx(
      "th",
      {
        ref,
        scope: "col",
        className: chunk4ON3M3OM_cjs.cn(
          densityHeadPadding[density],
          alignClassMap[align],
          "text-muted-foreground",
          "font-semibold",
          "whitespace-nowrap",
          sticky && "sticky top-0 z-[var(--z-sticky)] bg-muted/95 backdrop-blur-sm",
          bordered && "border-r border-border-muted last:border-r-0",
          className
        ),
        "data-ds": "",
        "data-ds-component": "table-head",
        "aria-sort": sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : sortable ? "none" : void 0,
        ...rest,
        children: content
      }
    );
  }
);
TableHead.displayName = "TableHead";
var TableCell = React.forwardRef(
  function TableCell2({ align = "left", className, children, ...rest }, ref) {
    const { density } = useTableContext();
    return /* @__PURE__ */ jsxRuntime.jsx(
      "td",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(
          densityCellPadding[density],
          alignClassMap[align],
          "text-foreground",
          className
        ),
        "data-ds": "",
        "data-ds-component": "table-cell",
        ...rest,
        children
      }
    );
  }
);
TableCell.displayName = "TableCell";
var TableCaption = React.forwardRef(function TableCaption2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "caption",
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "mt-2 px-4 pb-0.5",
        "text-xs leading-5",
        "text-muted-foreground",
        className
      ),
      "data-ds": "",
      "data-ds-component": "table-caption",
      ...rest,
      children
    }
  );
});
TableCaption.displayName = "TableCaption";
function flexRender(Comp, props) {
  return !Comp ? null : isReactComponent(Comp) ? /* @__PURE__ */ React__namespace.createElement(Comp, props) : Comp;
}
function isReactComponent(component) {
  return isClassComponent(component) || typeof component === "function" || isExoticComponent(component);
}
function isClassComponent(component) {
  return typeof component === "function" && (() => {
    const proto = Object.getPrototypeOf(component);
    return proto.prototype && proto.prototype.isReactComponent;
  })();
}
function isExoticComponent(component) {
  return typeof component === "object" && typeof component.$$typeof === "symbol" && ["react.memo", "react.forward_ref"].includes(component.$$typeof.description);
}
function useReactTable(options) {
  const resolvedOptions = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...options
  };
  const [tableRef] = React__namespace.useState(() => ({
    current: createTable(resolvedOptions)
  }));
  const [state, setState] = React__namespace.useState(() => tableRef.current.initialState);
  tableRef.current.setOptions((prev) => ({
    ...prev,
    ...options,
    state: {
      ...state,
      ...options.state
    },
    // Similarly, we'll maintain both our internal state and any user-provided
    // state.
    onStateChange: (updater) => {
      setState(updater);
      options.onStateChange == null || options.onStateChange(updater);
    }
  }));
  return tableRef.current;
}
function Dropdown({
  trigger,
  children,
  align = "start"
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, className: "relative", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        onClick: () => setOpen((v) => !v),
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
        },
        children: trigger
      }
    ),
    open && /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: chunk4ON3M3OM_cjs.cn(
          "absolute top-full z-[var(--z-dropdown)] mt-1",
          align === "end" ? "right-0" : "left-0",
          "min-w-[8rem] rounded-md py-1",
          "border border-border bg-popover text-popover-foreground",
          "shadow-md"
        ),
        role: "menu",
        "data-ds": "",
        "data-ds-component": "data-table-dropdown",
        children
      }
    )
  ] });
}
function DropdownItem({
  children,
  onClick,
  active
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      type: "button",
      role: "menuitem",
      onClick,
      className: chunk4ON3M3OM_cjs.cn(
        "flex w-full items-center gap-2 px-2 py-1.5 text-sm",
        "cursor-pointer rounded-sm",
        active ? "bg-muted text-foreground" : "text-foreground hover:bg-muted/50",
        "transition-colors duration-fast"
      ),
      children
    }
  );
}
function DataTableColumnHeaderMenu({
  column,
  title
}) {
  const isSorted = column.getIsSorted();
  return /* @__PURE__ */ jsxRuntime.jsx(
    Dropdown,
    {
      trigger: /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          type: "button",
          className: chunk4ON3M3OM_cjs.cn(
            "inline-flex items-center gap-1 -ml-1 px-1 py-0.5",
            "cursor-pointer select-none rounded-sm",
            "hover:bg-muted/50",
            "transition-colors duration-fast",
            "text-muted-foreground font-semibold whitespace-nowrap"
          ),
          children: [
            title,
            isSorted === "asc" ? /* @__PURE__ */ jsxRuntime.jsxs(
              "svg",
              {
                className: "size-3.5",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m5 12 7-7 7 7" }),
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 19V5" })
                ]
              }
            ) : isSorted === "desc" ? /* @__PURE__ */ jsxRuntime.jsxs(
              "svg",
              {
                className: "size-3.5",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 5v14" }),
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m19 12-7 7-7-7" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntime.jsxs(
              "svg",
              {
                className: "size-3.5 opacity-40",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m7 15 5 5 5-5" }),
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m7 9 5-5 5 5" })
                ]
              }
            )
          ]
        }
      ),
      children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "px-1", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(
          DropdownItem,
          {
            onClick: () => column.toggleSorting(false),
            active: isSorted === "asc",
            children: [
              /* @__PURE__ */ jsxRuntime.jsxs(
                "svg",
                {
                  className: "size-3.5",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  "aria-hidden": "true",
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m5 12 7-7 7 7" }),
                    /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 19V5" })
                  ]
                }
              ),
              "Asc"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs(
          DropdownItem,
          {
            onClick: () => column.toggleSorting(true),
            active: isSorted === "desc",
            children: [
              /* @__PURE__ */ jsxRuntime.jsxs(
                "svg",
                {
                  className: "size-3.5",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  "aria-hidden": "true",
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 5v14" }),
                    /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m19 12-7 7-7-7" })
                  ]
                }
              ),
              "Desc"
            ]
          }
        ),
        column.getCanHide() && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "my-1 h-px bg-border" }),
          /* @__PURE__ */ jsxRuntime.jsxs(DropdownItem, { onClick: () => column.toggleVisibility(false), children: [
            /* @__PURE__ */ jsxRuntime.jsxs(
              "svg",
              {
                className: "size-3.5",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" }),
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242" }),
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.749 10.749 0 0 1 4.446-5.143" }),
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m2 2 20 20" })
                ]
              }
            ),
            "Hide"
          ] })
        ] })
      ] })
    }
  );
}
function DataTableFacetedFilterButton({
  column,
  title,
  icon,
  options: explicitOptions
}) {
  if (!column) return null;
  const facets = column.getFacetedUniqueValues();
  const selectedValues = new Set(column.getFilterValue() ?? []);
  const options = explicitOptions ?? Array.from(facets.keys()).sort().map((value) => ({ label: String(value), value: String(value) }));
  const toggleValue = (value) => {
    const next = new Set(selectedValues);
    if (next.has(value)) {
      next.delete(value);
    } else {
      next.add(value);
    }
    const filterValue = next.size > 0 ? Array.from(next) : void 0;
    column.setFilterValue(filterValue);
  };
  const clearFilter = () => {
    column.setFilterValue(void 0);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    Dropdown,
    {
      trigger: /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          type: "button",
          className: chunk4ON3M3OM_cjs.cn(
            "inline-flex items-center gap-1.5 rounded-md px-3 h-8",
            "text-xs font-medium text-foreground",
            "border border-dashed border-border bg-background",
            "hover:bg-muted/50",
            "focus-visible:outline-none focus-visible:border-border-strong",
            "transition-colors duration-fast"
          ),
          "data-ds": "",
          "data-ds-component": "data-table-faceted-filter",
          children: [
            icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "size-3.5", children: icon }),
            title,
            selectedValues.size > 0 && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "mx-0.5 h-4 w-px bg-border" }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "inline-flex items-center justify-center rounded-sm bg-muted px-1.5 text-[10px] font-semibold", children: selectedValues.size })
            ] })
          ]
        }
      ),
      children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "px-1 max-h-64 overflow-y-auto", children: [
        options.map((option) => {
          const isSelected = selectedValues.has(option.value);
          const count2 = facets.get(option.value);
          return /* @__PURE__ */ jsxRuntime.jsxs(
            "label",
            {
              className: chunk4ON3M3OM_cjs.cn(
                "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5",
                "text-sm text-foreground",
                "hover:bg-muted/50",
                "transition-colors duration-fast"
              ),
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: isSelected,
                    onChange: () => toggleValue(option.value),
                    className: "size-3.5 rounded-sm accent-primary"
                  }
                ),
                option.icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "size-3.5 shrink-0", children: option.icon }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex-1 truncate", children: option.label }),
                count2 !== void 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ml-auto text-xs text-muted-foreground tabular-nums", children: count2 })
              ]
            },
            option.value
          );
        }),
        selectedValues.size > 0 && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "my-1 h-px bg-border" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              onClick: clearFilter,
              className: chunk4ON3M3OM_cjs.cn(
                "w-full rounded-sm px-2 py-1.5 text-center text-sm",
                "text-foreground hover:bg-muted/50",
                "transition-colors duration-fast"
              ),
              children: "Clear filter"
            }
          )
        ] })
      ] })
    }
  );
}
function DataTableSortBadge({ table }) {
  const sorting = table.getState().sorting;
  if (sorting.length === 0) return null;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Dropdown,
    {
      align: "end",
      trigger: /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          type: "button",
          className: chunk4ON3M3OM_cjs.cn(
            "inline-flex items-center gap-1.5 rounded-md px-3 h-8",
            "text-xs font-medium text-foreground",
            "border border-border bg-background",
            "hover:bg-muted/50",
            "focus-visible:outline-none focus-visible:border-border-strong",
            "transition-colors duration-fast"
          ),
          "data-ds": "",
          "data-ds-component": "data-table-sort-badge",
          children: [
            /* @__PURE__ */ jsxRuntime.jsxs(
              "svg",
              {
                className: "size-3.5",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m21 16-4 4-4-4" }),
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M17 20V4" }),
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m3 8 4-4 4 4" }),
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M7 4v16" })
                ]
              }
            ),
            "Sort",
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "inline-flex size-4 items-center justify-center rounded-full bg-foreground text-background text-[10px] font-bold", children: sorting.length })
          ]
        }
      ),
      children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "px-1", children: [
        sorting.map((sort) => {
          const col = table.getColumn(sort.id);
          const label = col && typeof col.columnDef.header === "string" ? col.columnDef.header : sort.id;
          return /* @__PURE__ */ jsxRuntime.jsxs(DropdownItem, { onClick: () => col?.clearSorting(), children: [
            sort.desc ? /* @__PURE__ */ jsxRuntime.jsxs(
              "svg",
              {
                className: "size-3.5",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 5v14" }),
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m19 12-7 7-7-7" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntime.jsxs(
              "svg",
              {
                className: "size-3.5",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m5 12 7-7 7 7" }),
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 19V5" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex-1", children: label }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs text-muted-foreground", children: sort.desc ? "desc" : "asc" })
          ] }, sort.id);
        }),
        sorting.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "my-1 h-px bg-border" }),
          /* @__PURE__ */ jsxRuntime.jsx(DropdownItem, { onClick: () => table.resetSorting(), children: "Clear all sorts" })
        ] })
      ] })
    }
  );
}
function DataTableViewButton({
  table
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Dropdown,
    {
      align: "end",
      trigger: /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          type: "button",
          className: chunk4ON3M3OM_cjs.cn(
            "inline-flex items-center gap-1.5 rounded-md px-3 h-8",
            "text-xs font-medium text-foreground",
            "border border-border bg-background",
            "hover:bg-muted/50",
            "focus-visible:outline-none focus-visible:border-border-strong",
            "transition-colors duration-fast"
          ),
          "data-ds": "",
          "data-ds-component": "data-table-view-button",
          children: [
            /* @__PURE__ */ jsxRuntime.jsxs(
              "svg",
              {
                className: "size-3.5",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "21", x2: "14", y1: "4", y2: "4" }),
                  /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "10", x2: "3", y1: "4", y2: "4" }),
                  /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "21", x2: "12", y1: "12", y2: "12" }),
                  /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "8", x2: "3", y1: "12", y2: "12" }),
                  /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "21", x2: "16", y1: "20", y2: "20" }),
                  /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "12", x2: "3", y1: "20", y2: "20" })
                ]
              }
            ),
            "View"
          ]
        }
      ),
      children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "px-1", children: table.getAllLeafColumns().map((column) => {
        if (column.id === "select" || !column.getCanHide()) return null;
        return /* @__PURE__ */ jsxRuntime.jsxs(
          "label",
          {
            className: chunk4ON3M3OM_cjs.cn(
              "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5",
              "text-sm text-foreground",
              "hover:bg-muted/50",
              "transition-colors duration-fast"
            ),
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: column.getIsVisible(),
                  onChange: column.getToggleVisibilityHandler(),
                  className: "size-3.5 rounded-sm accent-primary"
                }
              ),
              typeof column.columnDef.header === "string" ? column.columnDef.header : column.id
            ]
          },
          column.id
        );
      }) })
    }
  );
}
function DataTableCheckbox({
  checked,
  indeterminate,
  onChange,
  disabled,
  "aria-label": ariaLabel
}) {
  const ref = React.useCallback(
    (el) => {
      if (el) {
        el.indeterminate = indeterminate ?? false;
      }
    },
    [indeterminate]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    "input",
    {
      type: "checkbox",
      ref,
      checked,
      onChange,
      disabled,
      "aria-label": ariaLabel,
      className: chunk4ON3M3OM_cjs.cn(
        "size-4 cursor-pointer rounded-sm",
        "border border-border",
        "accent-primary",
        "focus-visible:outline-none focus-visible:border-border-strong",
        "disabled:cursor-not-allowed disabled:opacity-50"
      )
    }
  );
}
function DataTableGlobalFilter({
  value,
  onChange,
  placeholder
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "input",
    {
      type: "text",
      value,
      onChange: (e) => onChange(e.target.value),
      placeholder: placeholder ?? "Search...",
      className: chunk4ON3M3OM_cjs.cn(
        "h-9 w-full max-w-xs rounded-md px-3 text-sm",
        "border border-border bg-background text-foreground",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:border-border-strong",
        "transition-colors duration-fast"
      ),
      "data-ds": "",
      "data-ds-component": "data-table-search"
    }
  );
}
function DataTableColumnFilter({
  value,
  onChange,
  placeholder
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "input",
    {
      type: "text",
      value,
      onChange: (e) => onChange(e.target.value),
      placeholder: placeholder ?? "Filter...",
      className: chunk4ON3M3OM_cjs.cn(
        "mt-1 h-7 w-full rounded-sm px-2 text-xs",
        "border border-border-muted bg-background text-foreground",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:border-border-strong",
        "transition-colors duration-fast"
      ),
      "data-ds": "",
      "data-ds-component": "data-table-column-filter"
    }
  );
}
function DataTablePagination({
  table,
  pageSizeOptions
}) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getFilteredRowModel().rows.length;
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: chunk4ON3M3OM_cjs.cn(
        "flex flex-col gap-3 px-2 py-3",
        "sm:flex-row sm:items-center sm:justify-between"
      ),
      "data-ds": "",
      "data-ds-component": "data-table-pagination",
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-xs text-muted-foreground", children: [
          selectedCount,
          " of ",
          totalRows,
          " row(s) selected."
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-6", children: [
          pageSizeOptions !== false && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-xs text-foreground", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "whitespace-nowrap", children: "Rows per page" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              "select",
              {
                value: pageSize,
                onChange: (e) => table.setPageSize(Number(e.target.value)),
                className: chunk4ON3M3OM_cjs.cn(
                  "h-8 rounded-md border border-border bg-background px-2 text-xs text-foreground",
                  "focus-visible:outline-none focus-visible:border-border-strong",
                  "appearance-none cursor-pointer pr-6",
                  "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23888%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')]",
                  "bg-[position:right_0.4rem_center] bg-no-repeat"
                ),
                children: (pageSizeOptions || [10, 20, 30, 50, 100]).map((size) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: size, children: size }, size))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-xs text-foreground whitespace-nowrap", children: [
            "Page ",
            pageIndex + 1,
            " of ",
            pageCount || 1
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              PaginationButton,
              {
                onClick: () => table.firstPage(),
                disabled: !table.getCanPreviousPage(),
                "aria-label": "Go to first page",
                children: /* @__PURE__ */ jsxRuntime.jsxs(
                  "svg",
                  {
                    className: "size-3.5",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    "aria-hidden": "true",
                    children: [
                      /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m11 17-5-5 5-5" }),
                      /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m18 17-5-5 5-5" })
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              PaginationButton,
              {
                onClick: () => table.previousPage(),
                disabled: !table.getCanPreviousPage(),
                "aria-label": "Go to previous page",
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  "svg",
                  {
                    className: "size-3.5",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m15 18-6-6 6-6" })
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              PaginationButton,
              {
                onClick: () => table.nextPage(),
                disabled: !table.getCanNextPage(),
                "aria-label": "Go to next page",
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  "svg",
                  {
                    className: "size-3.5",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m9 18 6-6-6-6" })
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              PaginationButton,
              {
                onClick: () => table.lastPage(),
                disabled: !table.getCanNextPage(),
                "aria-label": "Go to last page",
                children: /* @__PURE__ */ jsxRuntime.jsxs(
                  "svg",
                  {
                    className: "size-3.5",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    "aria-hidden": "true",
                    children: [
                      /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m13 17 5-5-5-5" }),
                      /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 17 5-5-5-5" })
                    ]
                  }
                )
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function PaginationButton({
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      type: "button",
      ...props,
      className: chunk4ON3M3OM_cjs.cn(
        "inline-flex size-8 items-center justify-center rounded-md",
        "border border-border bg-background text-foreground",
        "hover:bg-muted/50",
        "focus-visible:outline-none focus-visible:border-border-strong",
        "disabled:pointer-events-none disabled:opacity-50",
        "transition-colors duration-fast"
      ),
      children
    }
  );
}
function DataTableSkeleton({
  columnCount,
  rowCount = 5,
  density
}) {
  const heightClass = density === "compact" ? "h-3" : "h-4";
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: Array.from({ length: rowCount }).map((_, rowIndex) => /* @__PURE__ */ jsxRuntime.jsx(TableRow, { className: "animate-pulse", children: Array.from({ length: columnCount }).map((_2, colIndex) => /* @__PURE__ */ jsxRuntime.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: chunk4ON3M3OM_cjs.cn(
        heightClass,
        "rounded-sm bg-muted",
        colIndex === 0 ? "w-3/4" : colIndex === columnCount - 1 ? "w-1/3" : "w-2/3"
      )
    }
  ) }, colIndex)) }, rowIndex)) });
}
var DataTable = React.forwardRef(
  function DataTable2({
    // Data
    data,
    columns: userColumns,
    // Faceted filters
    facetedFilters,
    // Sorting
    sorting: enableSorting = false,
    sortingState: controlledSorting,
    onSortingChange: onControlledSortingChange,
    multiSort = false,
    // Filtering
    filtering: enableFiltering = false,
    globalFilter: controlledGlobalFilter,
    onGlobalFilterChange: onControlledGlobalFilterChange,
    columnFilters: controlledColumnFilters,
    onColumnFiltersChange: onControlledColumnFiltersChange,
    showGlobalFilter = false,
    globalFilterPlaceholder,
    // Pagination
    pagination: enablePagination = false,
    pageSize = 10,
    paginationState: controlledPagination,
    onPaginationChange: onControlledPaginationChange,
    pageSizeOptions,
    // Row selection
    rowSelection: rowSelectionMode = false,
    rowSelectionState: controlledRowSelection,
    onRowSelectionChange: onControlledRowSelectionChange,
    onSelectedRowsChange,
    enableRowSelection = true,
    getRowId,
    // Column visibility
    columnVisibility: enableColumnVisibility = false,
    columnVisibilityState: controlledColumnVisibility,
    onColumnVisibilityChange: onControlledColumnVisibilityChange,
    // Column pinning
    columnPinning: controlledColumnPinning,
    onColumnPinningChange: onControlledColumnPinningChange,
    // Faceted filtering requires filtering to be enabled
    // (handled below in table config)
    // Appearance
    density = "comfortable",
    striped = false,
    hoverable = true,
    bordered = false,
    responsive = true,
    // States
    loading = false,
    emptyState,
    caption,
    showFooter = false,
    // Slots
    toolbar,
    footer,
    // Classes
    className,
    tableClassName,
    wrapperClassName,
    // Events
    onRowClick,
    onTableInstance
  }, ref) {
    const [internalSorting, setInternalSorting] = React.useState([]);
    const [internalGlobalFilter, setInternalGlobalFilter] = React.useState("");
    const [internalColumnFilters, setInternalColumnFilters] = React.useState([]);
    const [internalPagination, setInternalPagination] = React.useState({
      pageIndex: 0,
      pageSize
    });
    const [internalRowSelection, setInternalRowSelection] = React.useState({});
    const [internalColumnVisibility, setInternalColumnVisibility] = React.useState({});
    const [internalColumnPinning, setInternalColumnPinning] = React.useState({});
    const sortingValue = controlledSorting ?? internalSorting;
    const onSortingChange = onControlledSortingChange ?? setInternalSorting;
    const globalFilterValue = controlledGlobalFilter ?? internalGlobalFilter;
    const onGlobalFilterChange = onControlledGlobalFilterChange ?? setInternalGlobalFilter;
    const columnFiltersValue = controlledColumnFilters ?? internalColumnFilters;
    const onColumnFiltersChange = onControlledColumnFiltersChange ?? setInternalColumnFilters;
    const paginationValue = controlledPagination ?? internalPagination;
    const onPaginationChange = onControlledPaginationChange ?? setInternalPagination;
    const rowSelectionValue = controlledRowSelection ?? internalRowSelection;
    const onRowSelectionChange = onControlledRowSelectionChange ?? setInternalRowSelection;
    const columnVisibilityValue = controlledColumnVisibility ?? internalColumnVisibility;
    const onColumnVisibilityChange = onControlledColumnVisibilityChange ?? setInternalColumnVisibility;
    const columnPinningValue = controlledColumnPinning ?? internalColumnPinning;
    const onColumnPinningChange = onControlledColumnPinningChange ?? setInternalColumnPinning;
    const columns = React.useMemo(() => {
      if (!rowSelectionMode) return userColumns;
      const selectionColumn = {
        id: "select",
        header: rowSelectionMode === "multi" ? ({ table: t }) => /* @__PURE__ */ jsxRuntime.jsx(
          DataTableCheckbox,
          {
            checked: t.getIsAllPageRowsSelected(),
            indeterminate: t.getIsSomePageRowsSelected(),
            onChange: t.getToggleAllPageRowsSelectedHandler(),
            "aria-label": "Select all rows"
          }
        ) : void 0,
        cell: ({ row }) => /* @__PURE__ */ jsxRuntime.jsx(
          DataTableCheckbox,
          {
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
            "aria-label": `Select row ${row.index + 1}`
          }
        ),
        size: 40,
        enableSorting: false,
        enableHiding: false
      };
      return [selectionColumn, ...userColumns];
    }, [userColumns, rowSelectionMode]);
    const hasFacetedFilters = !!(facetedFilters && facetedFilters.length > 0);
    const table = useReactTable({
      data,
      columns,
      getRowId,
      state: {
        sorting: sortingValue,
        globalFilter: globalFilterValue,
        columnFilters: columnFiltersValue,
        pagination: paginationValue,
        rowSelection: rowSelectionValue,
        columnVisibility: columnVisibilityValue,
        columnPinning: columnPinningValue
      },
      // Sorting
      onSortingChange,
      enableSorting,
      enableMultiSort: multiSort,
      getSortedRowModel: enableSorting ? getSortedRowModel() : void 0,
      // Filtering
      onGlobalFilterChange,
      onColumnFiltersChange,
      enableFilters: enableFiltering || hasFacetedFilters,
      getFilteredRowModel: enableFiltering || hasFacetedFilters ? getFilteredRowModel() : void 0,
      // Faceted models (for unique value counts in filter popovers)
      ...hasFacetedFilters ? {
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues()
      } : {},
      // Pagination
      onPaginationChange,
      getPaginationRowModel: enablePagination ? getPaginationRowModel() : void 0,
      // Row selection
      onRowSelectionChange: (updater) => {
        onRowSelectionChange(updater);
        if (onSelectedRowsChange) {
          const next = typeof updater === "function" ? updater(rowSelectionValue) : updater;
          setTimeout(() => {
            const selectedRows = table.getRowModel().rows.filter((row) => next[row.id]);
            onSelectedRowsChange(selectedRows);
          }, 0);
        }
      },
      enableRowSelection: rowSelectionMode === false ? false : enableRowSelection,
      enableMultiRowSelection: rowSelectionMode === "multi",
      // Column visibility
      onColumnVisibilityChange,
      // Column pinning
      onColumnPinningChange,
      // Core
      getCoreRowModel: getCoreRowModel()
    });
    if (onTableInstance) {
      onTableInstance(table);
    }
    const headerGroups = table.getHeaderGroups();
    const rows = table.getRowModel().rows;
    const footerGroups = table.getFooterGroups();
    const visibleColumnCount = table.getVisibleLeafColumns().length;
    const hasToolbar = showGlobalFilter || enableColumnVisibility || toolbar || hasFacetedFilters || enableSorting && sortingValue.length > 0;
    const toSortDir = (dir) => {
      if (dir === "asc") return "asc";
      if (dir === "desc") return "desc";
      return void 0;
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn("not-prose", "flex flex-col gap-3", className),
        "data-ds": "",
        "data-ds-component": "data-table",
        children: [
          hasToolbar && /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              className: "flex flex-wrap items-center gap-2",
              "data-ds": "",
              "data-ds-component": "data-table-toolbar",
              children: [
                showGlobalFilter && (enableFiltering || hasFacetedFilters) && /* @__PURE__ */ jsxRuntime.jsx(
                  DataTableGlobalFilter,
                  {
                    value: globalFilterValue,
                    onChange: onGlobalFilterChange,
                    placeholder: globalFilterPlaceholder
                  }
                ),
                hasFacetedFilters && facetedFilters.map((filter) => /* @__PURE__ */ jsxRuntime.jsx(
                  DataTableFacetedFilterButton,
                  {
                    column: table.getColumn(filter.columnId),
                    title: filter.title,
                    icon: filter.icon,
                    options: filter.options
                  },
                  filter.columnId
                )),
                /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1" }),
                typeof toolbar === "function" ? toolbar(table) : toolbar,
                enableSorting && sortingValue.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(DataTableSortBadge, { table }),
                enableColumnVisibility && /* @__PURE__ */ jsxRuntime.jsx(DataTableViewButton, { table })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs(
            Table,
            {
              density,
              striped,
              hoverable,
              bordered,
              responsive,
              wrapperClassName,
              className: tableClassName,
              children: [
                caption && /* @__PURE__ */ jsxRuntime.jsx(TableCaption, { children: caption }),
                /* @__PURE__ */ jsxRuntime.jsx(TableHeader, { children: headerGroups.map((headerGroup) => /* @__PURE__ */ jsxRuntime.jsx(TableRow, { children: headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta;
                  const canSort = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();
                  const canFilter = enableFiltering && header.column.getCanFilter() && meta?.filterable !== false;
                  const showColumnFilter = canFilter && meta?.filterable === true;
                  const useHeaderMenu = meta?.enableHeaderMenu && canSort;
                  return /* @__PURE__ */ jsxRuntime.jsxs(
                    TableHead,
                    {
                      colSpan: header.colSpan > 1 ? header.colSpan : void 0,
                      align: meta?.align,
                      sortable: !useHeaderMenu && canSort,
                      sorted: !useHeaderMenu ? toSortDir(sortDir) : void 0,
                      onSort: !useHeaderMenu && canSort ? () => header.column.toggleSorting() : void 0,
                      sticky: meta?.sticky,
                      className: chunk4ON3M3OM_cjs.cn(
                        header.column.id === "select" && "w-[40px]",
                        meta?.headerClassName
                      ),
                      style: header.column.getSize() !== 150 ? {
                        width: header.column.getSize(),
                        minWidth: header.column.getSize()
                      } : void 0,
                      children: [
                        header.isPlaceholder ? null : useHeaderMenu ? /* @__PURE__ */ jsxRuntime.jsx(
                          DataTableColumnHeaderMenu,
                          {
                            column: header.column,
                            title: typeof header.column.columnDef.header === "string" ? header.column.columnDef.header : header.column.id
                          }
                        ) : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        ),
                        showColumnFilter && /* @__PURE__ */ jsxRuntime.jsx(
                          DataTableColumnFilter,
                          {
                            value: header.column.getFilterValue() ?? "",
                            onChange: (val) => header.column.setFilterValue(val || void 0),
                            placeholder: meta?.filterPlaceholder
                          }
                        )
                      ]
                    },
                    header.id
                  );
                }) }, headerGroup.id)) }),
                /* @__PURE__ */ jsxRuntime.jsx(TableBody, { children: loading ? /* @__PURE__ */ jsxRuntime.jsx(
                  DataTableSkeleton,
                  {
                    columnCount: visibleColumnCount,
                    density
                  }
                ) : rows.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntime.jsx(
                  TableCell,
                  {
                    colSpan: visibleColumnCount,
                    className: "h-24 text-center",
                    children: emptyState ?? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "No results." })
                  }
                ) }) : rows.map((row, rowIndex) => /* @__PURE__ */ jsxRuntime.jsx(
                  TableRow,
                  {
                    selected: row.getIsSelected(),
                    onClick: onRowClick ? (e) => onRowClick(row, e) : void 0,
                    className: chunk4ON3M3OM_cjs.cn(onRowClick && "cursor-pointer"),
                    "data-ds-row-index": rowIndex % 2 === 0 ? "even" : "odd",
                    children: row.getVisibleCells().map((cell) => {
                      const meta = cell.column.columnDef.meta;
                      return /* @__PURE__ */ jsxRuntime.jsx(
                        TableCell,
                        {
                          align: meta?.align,
                          className: meta?.cellClassName,
                          style: cell.column.getSize() !== 150 ? {
                            width: cell.column.getSize(),
                            minWidth: cell.column.getSize()
                          } : void 0,
                          children: flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        },
                        cell.id
                      );
                    })
                  },
                  row.id
                )) }),
                showFooter && /* @__PURE__ */ jsxRuntime.jsx(TableFooter, { children: footerGroups.map((footerGroup) => /* @__PURE__ */ jsxRuntime.jsx(TableRow, { children: footerGroup.headers.map((header) => /* @__PURE__ */ jsxRuntime.jsx(TableCell, { children: header.isPlaceholder ? null : flexRender(
                  header.column.columnDef.footer,
                  header.getContext()
                ) }, header.id)) }, footerGroup.id)) })
              ]
            }
          ),
          enablePagination && /* @__PURE__ */ jsxRuntime.jsx(
            DataTablePagination,
            {
              table,
              pageSizeOptions
            }
          ),
          footer && (typeof footer === "function" ? footer(table) : footer)
        ]
      }
    );
  }
);
DataTable.displayName = "DataTable";
function useDataTable(options) {
  const [sorting, onSortingChange] = React.useState(
    options.initialSorting ?? []
  );
  const [globalFilter, onGlobalFilterChange] = React.useState(
    options.initialGlobalFilter ?? ""
  );
  const [columnFilters, onColumnFiltersChange] = React.useState(
    options.initialColumnFilters ?? []
  );
  const [pagination, onPaginationChange] = React.useState({
    pageIndex: 0,
    pageSize: 10,
    ...options.initialPagination
  });
  const [rowSelection, onRowSelectionChange] = React.useState(
    options.initialRowSelection ?? {}
  );
  const [columnVisibility, onColumnVisibilityChange] = React.useState(options.initialColumnVisibility ?? {});
  const reset = React.useCallback(() => {
    onSortingChange(options.initialSorting ?? []);
    onGlobalFilterChange(options.initialGlobalFilter ?? "");
    onColumnFiltersChange(options.initialColumnFilters ?? []);
    onPaginationChange({
      pageIndex: 0,
      pageSize: 10,
      ...options.initialPagination
    });
    onRowSelectionChange(options.initialRowSelection ?? {});
    onColumnVisibilityChange(options.initialColumnVisibility ?? {});
  }, [options]);
  return {
    sorting,
    onSortingChange,
    globalFilter,
    onGlobalFilterChange,
    columnFilters,
    onColumnFiltersChange,
    pagination,
    onPaginationChange,
    rowSelection,
    onRowSelectionChange,
    columnVisibility,
    onColumnVisibilityChange,
    tableProps: {
      sortingState: sorting,
      onSortingChange,
      globalFilter,
      onGlobalFilterChange,
      columnFilters,
      onColumnFiltersChange,
      paginationState: pagination,
      onPaginationChange,
      rowSelectionState: rowSelection,
      onRowSelectionChange,
      columnVisibilityState: columnVisibility,
      onColumnVisibilityChange
    },
    reset
  };
}
function CalendarIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", ry: "2" }),
        /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "16", x2: "16", y1: "2", y2: "6" }),
        /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "8", x2: "8", y1: "2", y2: "6" }),
        /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "3", x2: "21", y1: "10", y2: "10" })
      ]
    }
  );
}
function XIcon3({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
function formatDate(date, locale = "en-US") {
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function formatRange(range, locale = "en-US") {
  const from = formatDate(range.from, locale);
  const to = range.to ? formatDate(range.to, locale) : "...";
  return `${from} \u2014 ${to}`;
}
var sizeClasses = {
  sm: "h-8 px-3 text-xs gap-2 rounded-md",
  md: "h-9 px-3 text-sm gap-2 rounded-md",
  lg: "h-10 px-4 text-sm gap-2 rounded-md"
};
var iconSizeClasses = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4"
};
var DatePicker = React.forwardRef(
  function DatePicker2({
    mode = "single",
    value,
    valueRange,
    onSelect,
    onSelectRange,
    placeholder = "Pick a date",
    size = "md",
    disabled = false,
    clearable = true,
    locale = "en-US",
    disabledDate,
    minDate,
    maxDate,
    defaultMonth,
    align = "start",
    className,
    contentClassName
  }, ref) {
    const shouldReduce = framerMotion.useReducedMotion();
    const [open, setOpen] = React.useState(false);
    const [internalDate, setInternalDate] = React.useState(null);
    const [internalRange, setInternalRange] = React.useState(null);
    const selectedDate = value !== void 0 ? value : internalDate;
    const selectedRange = valueRange !== void 0 ? valueRange : internalRange;
    const hasValue = mode === "single" ? selectedDate !== null : selectedRange !== null;
    const displayValue = (() => {
      if (mode === "single") {
        return selectedDate ? formatDate(selectedDate, locale) : null;
      }
      return selectedRange ? formatRange(selectedRange, locale) : null;
    })();
    const handleSelect = React.useCallback(
      (date) => {
        if (value === void 0) setInternalDate(date);
        onSelect?.(date);
        if (mode === "single") setOpen(false);
      },
      [mode, value, onSelect]
    );
    const handleSelectRange = React.useCallback(
      (range) => {
        if (valueRange === void 0) setInternalRange(range);
        onSelectRange?.(range);
        if (range.to) setOpen(false);
      },
      [valueRange, onSelectRange]
    );
    const handleClear = React.useCallback(
      (e) => {
        e.stopPropagation();
        if (value === void 0) setInternalDate(null);
        if (valueRange === void 0) setInternalRange(null);
        onSelect?.(null);
        onSelectRange?.(null);
      },
      [value, valueRange, onSelect, onSelectRange]
    );
    return /* @__PURE__ */ jsxRuntime.jsxs(radixUi.Popover.Root, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsxRuntime.jsx(radixUi.Popover.Trigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          ref,
          type: "button",
          disabled,
          "aria-expanded": open,
          "aria-haspopup": "dialog",
          className: chunk4ON3M3OM_cjs.cn(
            // Layout
            "inline-flex items-center justify-between",
            // Base styles
            "border border-input bg-background",
            "text-left",
            // Transitions
            "transition-colors duration-fast",
            // Disabled
            "disabled:pointer-events-none disabled:opacity-50",
            // Focus
            chunk3EHT6IOA_cjs.focusRingClasses,
            // Size
            sizeClasses[size],
            // Open state
            open && "border-ring ring-2 ring-ring/20",
            className
          ),
          "data-ds": "",
          "data-ds-component": "date-picker",
          "data-ds-size": size,
          "data-ds-mode": mode,
          "data-state": open ? "open" : "closed",
          children: [
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex items-center gap-2 min-w-0", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                CalendarIcon,
                {
                  className: chunk4ON3M3OM_cjs.cn(
                    "shrink-0 text-muted-foreground",
                    iconSizeClasses[size]
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                "span",
                {
                  className: chunk4ON3M3OM_cjs.cn(
                    "truncate",
                    !displayValue && "text-muted-foreground"
                  ),
                  children: displayValue ?? placeholder
                }
              )
            ] }),
            clearable && hasValue && /* @__PURE__ */ jsxRuntime.jsx(
              "span",
              {
                role: "button",
                tabIndex: 0,
                onClick: handleClear,
                onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === " ")
                    handleClear(e);
                },
                className: chunk4ON3M3OM_cjs.cn(
                  "shrink-0 ml-1",
                  "inline-flex items-center justify-center rounded-sm",
                  "text-muted-foreground hover:text-foreground",
                  "transition-colors duration-fast",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                ),
                "aria-label": "Clear date",
                children: /* @__PURE__ */ jsxRuntime.jsx(XIcon3, { className: iconSizeClasses[size] })
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(radixUi.Popover.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntime.jsx(
        radixUi.Popover.Content,
        {
          asChild: true,
          align,
          sideOffset: 6,
          forceMount: true,
          onInteractOutside: () => setOpen(false),
          onEscapeKeyDown: () => setOpen(false),
          children: /* @__PURE__ */ jsxRuntime.jsx(
            framerMotion.motion.div,
            {
              className: chunk4ON3M3OM_cjs.cn(
                "z-popover rounded-lg border border-border bg-background shadow-lg",
                "outline-none",
                contentClassName
              ),
              variants: chunkF4JJFWWU_cjs.scaleIn.variants,
              initial: shouldReduce ? { opacity: 0 } : "initial",
              animate: "animate",
              exit: shouldReduce ? { opacity: 0 } : "exit",
              transition: chunkF4JJFWWU_cjs.scaleIn.transition,
              "data-ds-animated": "",
              children: /* @__PURE__ */ jsxRuntime.jsx(
                Calendar,
                {
                  mode,
                  selected: mode === "single" ? selectedDate ?? void 0 : void 0,
                  selectedRange: mode === "range" ? selectedRange ?? void 0 : void 0,
                  onSelect: mode === "single" ? handleSelect : void 0,
                  onSelectRange: mode === "range" ? handleSelectRange : void 0,
                  defaultMonth: defaultMonth ?? (mode === "single" ? selectedDate ?? void 0 : selectedRange?.from ?? void 0),
                  disabledDate,
                  minDate,
                  maxDate
                }
              )
            }
          )
        }
      ) }) })
    ] });
  }
);
DatePicker.displayName = "DatePicker";
var dialogContentVariants = classVarianceAuthority.cva(
  [
    // Positioning
    "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    // Z-index
    "z-[var(--z-modal)]",
    // Layout
    "flex flex-col",
    "w-full",
    // Visual
    "rounded-lg",
    "border border-border",
    "bg-background",
    "shadow-xl",
    // Overflow
    "max-h-[85vh]",
    // Focus
    "outline-none"
  ],
  {
    variants: {
      size: {
        sm: "max-w-[480px]",
        md: "max-w-[560px]",
        lg: "max-w-[720px]",
        full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var DialogContext = React.createContext({ open: false });
function useDialogContext() {
  return React.useContext(DialogContext);
}
function CloseIcon2({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
function Dialog({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  ...rest
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const handleOpenChange = React.useCallback(
    (next) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(DialogContext.Provider, { value: { open }, children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Dialog.Root,
    {
      open,
      onOpenChange: handleOpenChange,
      ...rest,
      children
    }
  ) });
}
Dialog.displayName = "Dialog";
var DialogTrigger = React.forwardRef(function DialogTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Dialog.Trigger,
    {
      ref,
      className,
      "data-ds": "",
      "data-ds-component": "dialog-trigger",
      ...rest
    }
  );
});
DialogTrigger.displayName = "DialogTrigger";
var DialogOverlay = React.forwardRef(function DialogOverlay2({ className, ...rest }, ref) {
  const shouldReduce = framerMotion.useReducedMotion();
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Dialog.Overlay, { ref, forceMount: true, asChild: true, ...rest, children: /* @__PURE__ */ jsxRuntime.jsx(
    framerMotion.motion.div,
    {
      className: chunk4ON3M3OM_cjs.cn(
        "fixed inset-0",
        "z-[var(--z-overlay)]",
        "bg-black/50",
        className
      ),
      variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.overlayBackdrop.variants,
      initial: shouldReduce ? { opacity: 0 } : "initial",
      animate: shouldReduce ? { opacity: 1 } : "animate",
      exit: shouldReduce ? { opacity: 0 } : "exit",
      transition: shouldReduce ? { duration: 0.15 } : chunkF4JJFWWU_cjs.overlayBackdrop.transition,
      "data-ds-animated": ""
    }
  ) });
});
DialogOverlay.displayName = "DialogOverlay";
var DialogContent = React.forwardRef(function DialogContent2({
  size = "md",
  showClose = true,
  overlayClassName,
  className,
  children,
  ...rest
}, ref) {
  const shouldReduce = framerMotion.useReducedMotion();
  const { open } = useDialogContext();
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Dialog.Portal, { forceMount: true, children: /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(DialogOverlay, { className: overlayClassName }),
    /* @__PURE__ */ jsxRuntime.jsx(radixUi.Dialog.Content, { ref, forceMount: true, asChild: true, ...rest, children: /* @__PURE__ */ jsxRuntime.jsxs(
      framerMotion.motion.div,
      {
        className: chunk4ON3M3OM_cjs.cn(
          "not-prose",
          dialogContentVariants({ size }),
          className
        ),
        variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.modalContent.variants,
        initial: shouldReduce ? { opacity: 0 } : "initial",
        animate: shouldReduce ? { opacity: 1 } : "animate",
        exit: shouldReduce ? { opacity: 0 } : "exit",
        transition: shouldReduce ? { duration: 0.2 } : chunkF4JJFWWU_cjs.modalContent.transition,
        "data-ds": "",
        "data-ds-component": "dialog",
        "data-ds-size": size,
        "data-ds-animated": "",
        children: [
          children,
          showClose && /* @__PURE__ */ jsxRuntime.jsx(
            radixUi.Dialog.Close,
            {
              className: chunk4ON3M3OM_cjs.cn(
                "absolute right-4 top-4",
                "inline-flex items-center justify-center",
                "rounded-sm p-1",
                "text-muted-foreground hover:text-foreground",
                "transition-colors duration-fast",
                chunk3EHT6IOA_cjs.focusRingClasses
              ),
              "aria-label": "Close",
              children: /* @__PURE__ */ jsxRuntime.jsx(CloseIcon2, { className: "size-4" })
            }
          )
        ]
      }
    ) })
  ] }) }) });
});
DialogContent.displayName = "DialogContent";
function DialogHeader({
  className,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: chunk4ON3M3OM_cjs.cn("flex flex-col gap-1.5 px-6 pt-6", className),
      "data-ds": "",
      "data-ds-component": "dialog-header",
      ...rest,
      children
    }
  );
}
DialogHeader.displayName = "DialogHeader";
function DialogBody({ className, children, ...rest }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: chunk4ON3M3OM_cjs.cn("flex-1 overflow-y-auto px-6 py-4", className),
      "data-ds": "",
      "data-ds-component": "dialog-body",
      ...rest,
      children
    }
  );
}
DialogBody.displayName = "DialogBody";
function DialogFooter({
  className,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: chunk4ON3M3OM_cjs.cn(
        "flex items-center justify-end gap-2 px-6 pb-6 pt-2",
        className
      ),
      "data-ds": "",
      "data-ds-component": "dialog-footer",
      ...rest,
      children
    }
  );
}
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React.forwardRef(function DialogTitle2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Dialog.Title,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "text-lg font-semibold leading-6 text-foreground",
        className
      ),
      "data-ds": "",
      "data-ds-component": "dialog-title",
      ...rest,
      children
    }
  );
});
DialogTitle.displayName = "DialogTitle";
var DialogDescription = React.forwardRef(function DialogDescription2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Dialog.Description,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn("text-sm leading-5 text-muted-foreground", className),
      "data-ds": "",
      "data-ds-component": "dialog-description",
      ...rest,
      children
    }
  );
});
DialogDescription.displayName = "DialogDescription";
var DialogClose = React.forwardRef(function DialogClose2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Dialog.Close,
    {
      ref,
      className,
      "data-ds": "",
      "data-ds-component": "dialog-close",
      ...rest
    }
  );
});
DialogClose.displayName = "DialogClose";
function CheckIcon6({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M20 6 9 17l-5-5" })
    }
  );
}
function DotIcon2({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "4" })
    }
  );
}
function ChevronRightIcon4({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m9 18 6-6-6-6" })
    }
  );
}
var menuItemBase2 = [
  "relative flex w-full cursor-pointer select-none items-center",
  "rounded-sm py-1.5 px-2",
  "text-sm leading-5 outline-none",
  "transition-colors duration-fast ease-standard",
  "focus:bg-muted",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
];
var menuContentBase2 = [
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
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.DropdownMenu.Root, { ...rest, children });
}
DropdownMenu.displayName = "DropdownMenu";
var DropdownMenuTrigger = React.forwardRef(function DropdownMenuTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.DropdownMenu.Trigger,
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
var DropdownMenuContent = React.forwardRef(function DropdownMenuContent2({ className, children, sideOffset = 4, ...rest }, ref) {
  const shouldReduce = framerMotion.useReducedMotion();
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.DropdownMenu.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.DropdownMenu.Content,
    {
      ref,
      sideOffset,
      asChild: true,
      ...rest,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        framerMotion.motion.div,
        {
          className: chunk4ON3M3OM_cjs.cn(...menuContentBase2, className),
          variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.scaleIn.variants,
          initial: shouldReduce ? { opacity: 0 } : "initial",
          animate: shouldReduce ? { opacity: 1 } : "animate",
          exit: shouldReduce ? { opacity: 0 } : "exit",
          transition: shouldReduce ? { duration: 0.15 } : chunkF4JJFWWU_cjs.scaleIn.transition,
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
var DropdownMenuItem = React.forwardRef(function DropdownMenuItem2({ className, variant = "default", icon, shortcut, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.DropdownMenu.Item,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        ...menuItemBase2,
        "gap-2",
        variant === "danger" && "text-danger focus:bg-danger-muted focus:text-danger-muted-foreground",
        variant === "default" && "text-foreground",
        className
      ),
      "data-ds": "",
      "data-ds-component": "dropdown-menu-item",
      ...rest,
      children: [
        icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0 [&>svg]:size-4", "aria-hidden": "true", children: icon }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex-1 flex items-center gap-2 [&>svg]:shrink-0 [&>svg]:size-4", children }),
        shortcut && /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuShortcut, { children: shortcut })
      ]
    }
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";
var DropdownMenuCheckboxItem = React.forwardRef(function DropdownMenuCheckboxItem2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.DropdownMenu.CheckboxItem,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(...menuItemBase2, "gap-2 pl-8", className),
      "data-ds": "",
      "data-ds-component": "dropdown-menu-checkbox-item",
      ...rest,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute left-2 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(radixUi.DropdownMenu.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(CheckIcon6, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex-1 flex items-center gap-2 [&>svg]:shrink-0 [&>svg]:size-4", children })
      ]
    }
  );
});
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";
var DropdownMenuRadioGroup = React.forwardRef(function DropdownMenuRadioGroup2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.DropdownMenu.RadioGroup, { ref, className, ...rest, children });
});
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";
var DropdownMenuRadioItem = React.forwardRef(function DropdownMenuRadioItem2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.DropdownMenu.RadioItem,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(...menuItemBase2, "gap-2 pl-8", className),
      "data-ds": "",
      "data-ds-component": "dropdown-menu-radio-item",
      ...rest,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute left-2 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(radixUi.DropdownMenu.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(DotIcon2, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex-1 flex items-center gap-2 [&>svg]:shrink-0 [&>svg]:size-4", children })
      ]
    }
  );
});
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";
var DropdownMenuLabel = React.forwardRef(function DropdownMenuLabel2({ className, inset, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.DropdownMenu.Label,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
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
var DropdownMenuSeparator = React.forwardRef(function DropdownMenuSeparator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.DropdownMenu.Separator,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn("-mx-1 my-1 h-px bg-border", className),
      ...rest
    }
  );
});
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
var DropdownMenuGroup = React.forwardRef(function DropdownMenuGroup2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.DropdownMenu.Group, { ref, className, ...rest, children });
});
DropdownMenuGroup.displayName = "DropdownMenuGroup";
function DropdownMenuSub({ children, ...rest }) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.DropdownMenu.Sub, { ...rest, children });
}
DropdownMenuSub.displayName = "DropdownMenuSub";
var DropdownMenuSubTrigger = React.forwardRef(function DropdownMenuSubTrigger2({ className, inset, icon, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.DropdownMenu.SubTrigger,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        ...menuItemBase2,
        "gap-2 data-[state=open]:bg-muted",
        inset && "pl-8",
        className
      ),
      "data-ds": "",
      "data-ds-component": "dropdown-menu-sub-trigger",
      ...rest,
      children: [
        icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0 [&>svg]:size-4", "aria-hidden": "true", children: icon }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex-1 flex items-center gap-2 [&>svg]:shrink-0 [&>svg]:size-4", children }),
        /* @__PURE__ */ jsxRuntime.jsx(ChevronRightIcon4, { className: "ml-auto size-4 text-muted-foreground" })
      ]
    }
  );
});
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";
var DropdownMenuSubContent = React.forwardRef(function DropdownMenuSubContent2({ className, children, ...rest }, ref) {
  const shouldReduce = framerMotion.useReducedMotion();
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.DropdownMenu.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.DropdownMenu.SubContent,
    {
      ref,
      asChild: true,
      ...rest,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        framerMotion.motion.div,
        {
          className: chunk4ON3M3OM_cjs.cn(...menuContentBase2, className),
          variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.scaleIn.variants,
          initial: shouldReduce ? { opacity: 0 } : "initial",
          animate: shouldReduce ? { opacity: 1 } : "animate",
          exit: shouldReduce ? { opacity: 0 } : "exit",
          transition: shouldReduce ? { duration: 0.15 } : chunkF4JJFWWU_cjs.scaleIn.transition,
          "data-ds": "",
          "data-ds-component": "dropdown-menu-sub-content",
          "data-ds-animated": "",
          children
        }
      )
    }
  ) });
});
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
function DropdownMenuShortcut({
  className,
  children
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: chunk4ON3M3OM_cjs.cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      ),
      children
    }
  );
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
function InboxIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" })
      ]
    }
  );
}
var EmptyState = React.forwardRef(
  function EmptyState2({
    icon,
    title,
    description,
    action,
    animated = true,
    className,
    children,
    ...rest
  }, ref) {
    const shouldReduce = framerMotion.useReducedMotion();
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(
          "flex flex-col items-center justify-center text-center gap-4 py-12 px-6",
          className
        ),
        "data-ds": "",
        "data-ds-component": "empty-state",
        "data-ds-animated": animated ? "" : void 0,
        ...rest,
        children: [
          (icon !== void 0 ? icon : true) && /* @__PURE__ */ jsxRuntime.jsx(
            framerMotion.motion.div,
            {
              className: "flex items-center justify-center size-16 rounded-full bg-muted text-muted-foreground",
              variants: animated && !shouldReduce ? chunkF4JJFWWU_cjs.scaleIn.variants : void 0,
              initial: animated && !shouldReduce ? "initial" : void 0,
              animate: animated && !shouldReduce ? "animate" : void 0,
              transition: animated && !shouldReduce ? chunkF4JJFWWU_cjs.scaleIn.transition : void 0,
              "data-ds-animated": animated ? "" : void 0,
              children: icon ?? /* @__PURE__ */ jsxRuntime.jsx(InboxIcon, { className: "size-8" })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs(
            framerMotion.motion.div,
            {
              className: "flex flex-col gap-1.5 max-w-xs",
              variants: animated && !shouldReduce ? chunkF4JJFWWU_cjs.fadeIn.variants : void 0,
              initial: animated && !shouldReduce ? "initial" : void 0,
              animate: animated && !shouldReduce ? "animate" : void 0,
              transition: animated && !shouldReduce ? { ...chunkF4JJFWWU_cjs.fadeIn.transition, delay: 0.15 } : void 0,
              "data-ds-animated": animated ? "" : void 0,
              children: [
                title && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-base font-semibold text-foreground leading-5", children: title }),
                description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground leading-5", children: description })
              ]
            }
          ),
          children,
          action && /* @__PURE__ */ jsxRuntime.jsx(
            framerMotion.motion.div,
            {
              variants: animated && !shouldReduce ? chunkF4JJFWWU_cjs.fadeIn.variants : void 0,
              initial: animated && !shouldReduce ? "initial" : void 0,
              animate: animated && !shouldReduce ? "animate" : void 0,
              transition: animated && !shouldReduce ? { ...chunkF4JJFWWU_cjs.fadeIn.transition, delay: 0.25 } : void 0,
              "data-ds-animated": animated ? "" : void 0,
              children: action
            }
          )
        ]
      }
    );
  }
);
EmptyState.displayName = "EmptyState";
var fileUploadZoneVariants = classVarianceAuthority.cva(
  [
    "relative flex flex-col items-center justify-center gap-3",
    "w-full rounded-lg border-2 border-dashed",
    "text-center",
    "transition-colors duration-fast",
    "cursor-pointer select-none outline-none",
    chunk3EHT6IOA_cjs.focusRingClasses
  ],
  {
    variants: {
      size: {
        sm: "p-6 min-h-[120px]",
        md: "p-8 min-h-[160px]",
        lg: "p-10 min-h-[200px]"
      },
      state: {
        idle: "border-border hover:border-primary/50 hover:bg-accent/40",
        dragOver: "border-primary bg-primary/8",
        error: "border-danger bg-danger-muted",
        disabled: "border-border opacity-50 cursor-not-allowed pointer-events-none"
      }
    },
    defaultVariants: { size: "md", state: "idle" }
  }
);
function UploadIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
        /* @__PURE__ */ jsxRuntime.jsx("polyline", { points: "17 8 12 3 7 8" }),
        /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "12", x2: "12", y1: "3", y2: "15" })
      ]
    }
  );
}
function FileIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M14 2v4a2 2 0 0 0 2 2h4" })
      ]
    }
  );
}
function ImageFileIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }),
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "9", cy: "9", r: "2" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" })
      ]
    }
  );
}
function XIcon4({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
function AlertCircleIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "12", x2: "12", y1: "8", y2: "12" }),
        /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "12", x2: "12.01", y1: "16", y2: "16" })
      ]
    }
  );
}
function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}
var FileUpload = React.forwardRef(
  function FileUpload2({
    onFilesChange,
    onFileAdd,
    onFileRemove,
    accept,
    multiple = true,
    maxFiles = 10,
    maxSize,
    size = "md",
    disabled = false,
    label,
    description,
    className,
    "aria-label": ariaLabel = "File upload"
  }, ref) {
    const shouldReduce = framerMotion.useReducedMotion();
    const id = React.useId();
    const inputRef = React.useRef(null);
    const [isDragOver, setIsDragOver] = React.useState(false);
    const [files, setFiles] = React.useState([]);
    const [error, setError] = React.useState(null);
    const addFiles = React.useCallback(
      (newFiles) => {
        setError(null);
        const allowed = newFiles.slice(0, maxFiles - files.length);
        const rejected = [];
        const items = [];
        for (const file of allowed) {
          if (maxSize && file.size > maxSize) {
            rejected.push(`"${file.name}" exceeds ${formatFileSize(maxSize)}`);
            continue;
          }
          const isImage = file.type.startsWith("image/");
          const preview = isImage ? URL.createObjectURL(file) : void 0;
          items.push({
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            file,
            preview,
            progress: 0,
            status: "idle"
          });
          onFileAdd?.(file);
        }
        if (rejected.length > 0) {
          setError(rejected.join(", "));
        }
        const next = [...files, ...items];
        setFiles(next);
        onFilesChange?.(next);
      },
      [files, maxFiles, maxSize, onFileAdd, onFilesChange]
    );
    const removeFile = React.useCallback(
      (itemId) => {
        const item = files.find((f) => f.id === itemId);
        if (item?.preview) URL.revokeObjectURL(item.preview);
        const next = files.filter((f) => f.id !== itemId);
        setFiles(next);
        onFileRemove?.(itemId);
        onFilesChange?.(next);
      },
      [files, onFileRemove, onFilesChange]
    );
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragOver(true);
    };
    const handleDragLeave = (e) => {
      e.preventDefault();
      setIsDragOver(false);
    };
    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragOver(false);
      if (disabled) return;
      const droppedFiles = Array.from(e.dataTransfer.files);
      addFiles(droppedFiles);
    };
    const handleInputChange = (e) => {
      if (e.target.files) {
        addFiles(Array.from(e.target.files));
        e.target.value = "";
      }
    };
    const handleZoneClick = () => {
      if (!disabled) inputRef.current?.click();
    };
    const handleZoneKeyDown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleZoneClick();
      }
    };
    const zoneState = disabled ? "disabled" : isDragOver ? "dragOver" : error ? "error" : "idle";
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn("flex flex-col gap-3 w-full", className),
        "data-ds": "",
        "data-ds-component": "file-upload",
        "data-ds-size": size,
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              role: "region",
              "aria-label": ariaLabel,
              tabIndex: disabled ? -1 : 0,
              className: chunk4ON3M3OM_cjs.cn(fileUploadZoneVariants({ size, state: zoneState })),
              onClick: handleZoneClick,
              onKeyDown: handleZoneKeyDown,
              onDragOver: handleDragOver,
              onDragEnter: handleDragOver,
              onDragLeave: handleDragLeave,
              onDrop: handleDrop,
              "data-ds-drag-over": isDragOver ? "" : void 0,
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  "input",
                  {
                    ref: inputRef,
                    type: "file",
                    accept,
                    multiple,
                    disabled,
                    onChange: handleInputChange,
                    className: "sr-only",
                    "aria-hidden": "true",
                    id: `${id}-input`,
                    tabIndex: -1
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  framerMotion.motion.div,
                  {
                    animate: isDragOver && !shouldReduce ? { scale: 1.1 } : { scale: 1 },
                    transition: { type: "spring", stiffness: 400, damping: 25 },
                    "data-ds-animated": "",
                    children: /* @__PURE__ */ jsxRuntime.jsx(
                      UploadIcon,
                      {
                        className: chunk4ON3M3OM_cjs.cn(
                          "text-muted-foreground",
                          size === "sm" ? "size-8" : size === "md" ? "size-10" : "size-12",
                          isDragOver && "text-primary"
                        )
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-1 text-center", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(
                    "p",
                    {
                      className: chunk4ON3M3OM_cjs.cn(
                        "font-medium text-foreground",
                        size === "sm" ? "text-xs" : "text-sm"
                      ),
                      children: label ?? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-primary underline-offset-2 hover:underline", children: "Click to upload" }),
                        " ",
                        "or drag and drop"
                      ] })
                    }
                  ),
                  description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: description }),
                  accept && !description && /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    accept,
                    maxSize ? ` \xB7 max ${formatFileSize(maxSize)}` : ""
                  ] })
                ] }),
                error && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-danger", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(AlertCircleIcon, { className: "size-3.5 shrink-0" }),
                  /* @__PURE__ */ jsxRuntime.jsx("span", { children: error })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { initial: false, children: files.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(
            framerMotion.motion.div,
            {
              className: "flex flex-col gap-2",
              variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.staggerContainerFast.variants,
              initial: shouldReduce ? void 0 : "initial",
              animate: shouldReduce ? void 0 : "animate",
              "data-ds-animated": "",
              children: files.map((item) => /* @__PURE__ */ jsxRuntime.jsxs(
                framerMotion.motion.div,
                {
                  layout: true,
                  variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.slideUpSm.variants,
                  initial: shouldReduce ? { opacity: 0 } : "initial",
                  animate: shouldReduce ? { opacity: 1 } : "animate",
                  exit: shouldReduce ? { opacity: 0 } : {
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.15 }
                  },
                  className: chunk4ON3M3OM_cjs.cn(
                    "flex items-center gap-3 p-3 rounded-md border border-border bg-background",
                    item.status === "error" && "border-danger/40 bg-danger-muted",
                    item.status === "success" && "border-success/40"
                  ),
                  "data-ds-animated": "",
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "shrink-0 size-10 rounded-md overflow-hidden bg-muted flex items-center justify-center", children: item.preview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      /* @__PURE__ */ jsxRuntime.jsx(
                        "img",
                        {
                          src: item.preview,
                          alt: item.file.name,
                          className: "w-full h-full object-cover"
                        }
                      )
                    ) : item.file.type.startsWith("image/") ? /* @__PURE__ */ jsxRuntime.jsx(ImageFileIcon, { className: "size-5 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntime.jsx(FileIcon, { className: "size-5 text-muted-foreground" }) }),
                    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: item.file.name }),
                      /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        formatFileSize(item.file.size),
                        item.status === "error" && item.error && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-danger ml-1", children: [
                          "\u2014 ",
                          item.error
                        ] })
                      ] }),
                      item.status === "uploading" && item.progress !== void 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-1.5 w-full h-1 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntime.jsx(
                        framerMotion.motion.div,
                        {
                          className: "h-full bg-primary rounded-full",
                          initial: { width: "0%" },
                          animate: { width: `${item.progress}%` },
                          transition: {
                            duration: 0.3,
                            ease: [0.4, 0, 0.2, 1]
                          },
                          "data-ds-animated": ""
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => removeFile(item.id),
                        className: chunk4ON3M3OM_cjs.cn(
                          "shrink-0 inline-flex items-center justify-center size-7 rounded-md",
                          "text-muted-foreground hover:text-foreground hover:bg-accent",
                          "transition-colors duration-fast",
                          chunk3EHT6IOA_cjs.focusRingClasses
                        ),
                        "aria-label": `Remove ${item.file.name}`,
                        children: /* @__PURE__ */ jsxRuntime.jsx(XIcon4, { className: "size-4" })
                      }
                    )
                  ]
                },
                item.id
              ))
            }
          ) })
        ]
      }
    );
  }
);
FileUpload.displayName = "FileUpload";
var labelSizeMap = {
  sm: "text-xs leading-4 font-medium",
  md: "text-sm leading-5 font-medium",
  lg: "text-sm leading-5 font-semibold"
};
var descriptionSizeMap = {
  sm: "text-[11px] leading-4",
  md: "text-xs leading-4",
  lg: "text-xs leading-4"
};
var errorSizeMap = {
  sm: "text-[11px] leading-4",
  md: "text-xs leading-4",
  lg: "text-xs leading-4"
};
var gapSizeMap = {
  sm: "gap-1",
  md: "gap-1.5",
  lg: "gap-2"
};
var horizontalLabelWidthMap = {
  sm: "w-24 shrink-0",
  md: "w-32 shrink-0",
  lg: "w-40 shrink-0"
};
function RequiredIndicator() {
  return /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-danger ml-0.5", "aria-hidden": "true", children: "*" });
}
var FormField = React.forwardRef(
  function FormField2({
    label,
    description,
    error,
    size = "md",
    orientation = "vertical",
    required = false,
    disabled = false,
    htmlFor: htmlForProp,
    labelClassName,
    descriptionClassName,
    errorClassName,
    controlClassName,
    children,
    className,
    ...rest
  }, ref) {
    const autoId = React.useId();
    const fieldId = htmlForProp ?? autoId;
    const descriptionId = description ? `${fieldId}-description` : void 0;
    const errorId = error ? `${fieldId}-error` : void 0;
    const hasError = !!error;
    const ariaDescribedBy = hasError ? errorId : descriptionId ? descriptionId : void 0;
    const controlProps = {
      id: fieldId,
      ...ariaDescribedBy ? { "aria-describedby": ariaDescribedBy } : {},
      ...hasError ? { "aria-invalid": true } : {},
      ...required ? { "aria-required": true } : {},
      ...disabled ? { disabled: true } : {}
    };
    const renderedChildren = typeof children === "function" ? children(controlProps) : children;
    const isHorizontal = orientation === "horizontal";
    const labelElement = label ? /* @__PURE__ */ jsxRuntime.jsxs(
      "label",
      {
        htmlFor: fieldId,
        className: chunk4ON3M3OM_cjs.cn(
          labelSizeMap[size],
          "text-foreground",
          "select-none",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "cursor-pointer",
          isHorizontal && horizontalLabelWidthMap[size],
          isHorizontal && "pt-2",
          // Align with control baseline
          labelClassName
        ),
        children: [
          label,
          required && /* @__PURE__ */ jsxRuntime.jsx(RequiredIndicator, {})
        ]
      }
    ) : null;
    const descriptionElement = description && !hasError ? /* @__PURE__ */ jsxRuntime.jsx(
      "span",
      {
        id: descriptionId,
        className: chunk4ON3M3OM_cjs.cn(
          descriptionSizeMap[size],
          "text-muted-foreground",
          disabled && "opacity-50",
          descriptionClassName
        ),
        children: description
      }
    ) : null;
    const errorElement = hasError ? /* @__PURE__ */ jsxRuntime.jsx(
      "span",
      {
        id: errorId,
        role: "alert",
        className: chunk4ON3M3OM_cjs.cn(
          errorSizeMap[size],
          "text-danger",
          disabled && "opacity-50",
          errorClassName
        ),
        children: error
      }
    ) : null;
    if (!isHorizontal) {
      return /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          ref,
          className: chunk4ON3M3OM_cjs.cn("flex flex-col", gapSizeMap[size], className),
          "data-ds": "",
          "data-ds-component": "form-field",
          "data-ds-size": size,
          "data-ds-orientation": orientation,
          ...hasError ? { "data-ds-error": "" } : {},
          ...disabled ? { "data-ds-disabled": "" } : {},
          ...required ? { "data-ds-required": "" } : {},
          ...rest,
          children: [
            (labelElement || descriptionElement) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-0.5", children: [
              labelElement,
              descriptionElement
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunk4ON3M3OM_cjs.cn(controlClassName), children: renderedChildren }),
            errorElement
          ]
        }
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn("flex flex-row items-start", gapSizeMap[size], className),
        "data-ds": "",
        "data-ds-component": "form-field",
        "data-ds-size": size,
        "data-ds-orientation": orientation,
        ...hasError ? { "data-ds-error": "" } : {},
        ...disabled ? { "data-ds-disabled": "" } : {},
        ...required ? { "data-ds-required": "" } : {},
        ...rest,
        children: [
          labelElement,
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunk4ON3M3OM_cjs.cn("flex flex-1 flex-col", gapSizeMap[size]), children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunk4ON3M3OM_cjs.cn(controlClassName), children: renderedChildren }),
            descriptionElement,
            errorElement
          ] })
        ]
      }
    );
  }
);
FormField.displayName = "FormField";
function HoverCard({
  openDelay = 200,
  closeDelay = 150,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.HoverCard.Root,
    {
      openDelay,
      closeDelay,
      ...props
    }
  );
}
HoverCard.displayName = "HoverCard";
var HoverCardTrigger = radixUi.HoverCard.Trigger;
HoverCardTrigger.displayName = "HoverCardTrigger";
var HoverCardContent = React.forwardRef(function HoverCardContent2({
  side = "bottom",
  align = "center",
  sideOffset = 8,
  className,
  children,
  ...rest
}, ref) {
  const shouldReduce = framerMotion.useReducedMotion();
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.HoverCard.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.HoverCard.Content,
    {
      ref,
      side,
      align,
      sideOffset,
      asChild: true,
      ...rest,
      children: /* @__PURE__ */ jsxRuntime.jsxs(
        framerMotion.motion.div,
        {
          className: chunk4ON3M3OM_cjs.cn(
            "z-popover w-64 rounded-lg border border-border bg-popover p-4 shadow-lg outline-none",
            "text-sm text-popover-foreground",
            className
          ),
          variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.scaleIn.variants,
          initial: shouldReduce ? { opacity: 0 } : "initial",
          animate: shouldReduce ? { opacity: 1 } : "animate",
          exit: shouldReduce ? { opacity: 0 } : "exit",
          transition: shouldReduce ? { duration: 0.12 } : chunkF4JJFWWU_cjs.scaleIn.transition,
          "data-ds": "",
          "data-ds-component": "hover-card-content",
          "data-ds-animated": "",
          children: [
            children,
            /* @__PURE__ */ jsxRuntime.jsx(radixUi.HoverCard.Arrow, { className: "fill-border" })
          ]
        }
      )
    }
  ) });
});
HoverCardContent.displayName = "HoverCardContent";
var inputVariants = classVarianceAuthority.cva(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "flex w-full",
    // Typography
    "text-sm leading-5",
    // Shape
    "rounded-md",
    // Border
    "border",
    // Colors
    "bg-background text-input-foreground",
    "placeholder:text-input-placeholder",
    // Transition
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    // Focus ring — WCAG AA compliant, visible on keyboard navigation only
    chunk3EHT6IOA_cjs.focusRingClasses,
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled-foreground",
    // Read-only
    "read-only:bg-muted read-only:cursor-default",
    // File input styling
    "file:border-0 file:bg-transparent file:text-sm file:font-medium"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Visual Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Default — standard input with muted border.
         */
        default: [
          "border-input",
          "hover:border-border-strong",
          "focus-visible:border-border-strong"
        ],
        /**
         * Error — validation failed. Uses danger color.
         */
        error: [
          "border-danger",
          "text-foreground",
          "focus-visible:border-danger",
          "placeholder:text-input-placeholder"
        ],
        /**
         * Success — validation passed. Uses success color.
         */
        success: [
          "border-success",
          "text-foreground",
          "focus-visible:border-success",
          "placeholder:text-input-placeholder"
        ]
      },
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — compact for dense UIs, tables, toolbars.
         * Height: 32px (h-8)
         */
        sm: "h-8 px-2.5 text-xs",
        /**
         * Medium — default size for most inputs.
         * Height: var(--ds-control-height)
         */
        md: "h-(--ds-control-height) px-3 text-sm",
        /**
         * Large — prominent inputs for hero sections, forms.
         * Height: 40px (h-10)
         */
        lg: "h-10 px-3.5 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var inputWrapperVariants = classVarianceAuthority.cva(["relative flex items-center w-full"], {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: ""
    }
  },
  defaultVariants: {
    size: "md"
  }
});
var iconSizeMap4 = {
  sm: "[&>svg]:size-3.5",
  md: "[&>svg]:size-4",
  lg: "[&>svg]:size-4"
};
var iconPaddingLeftMap = {
  sm: "pl-7",
  md: "pl-9",
  lg: "pl-10"
};
var iconPaddingRightMap = {
  sm: "pr-7",
  md: "pr-9",
  lg: "pr-10"
};
var iconLeftPositionMap = {
  sm: "left-2",
  md: "left-3",
  lg: "left-3.5"
};
var iconRightPositionMap = {
  sm: "right-2",
  md: "right-3",
  lg: "right-3.5"
};
function ClearButton({
  size,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      type: "button",
      onClick,
      className: chunk4ON3M3OM_cjs.cn(
        "absolute flex items-center justify-center",
        "text-muted-foreground hover:text-foreground",
        "transition-colors duration-fast",
        chunk3EHT6IOA_cjs.focusRingInsetClasses,
        "rounded-sm",
        iconRightPositionMap[size],
        iconSizeMap4[size]
      ),
      "aria-label": "Clear input",
      tabIndex: -1,
      children: /* @__PURE__ */ jsxRuntime.jsxs(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: size === "sm" ? "size-3.5" : "size-4",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M18 6 6 18" }),
            /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 6 12 12" })
          ]
        }
      )
    }
  );
}
var Input = React.forwardRef(function Input2({
  variant = "default",
  size = "md",
  iconLeft,
  iconRight,
  clearable = false,
  onClear,
  wrapperClassName,
  className,
  disabled,
  readOnly,
  value,
  defaultValue,
  "aria-invalid": ariaInvalid,
  ...rest
}, ref) {
  const internalRef = React.useRef(null);
  const hasIcons = !!iconLeft || !!iconRight || clearable;
  const showClear = clearable && !disabled && !readOnly && (value !== void 0 ? String(value).length > 0 : false);
  const handleClear = React.useCallback(() => {
    if (onClear) {
      onClear();
    } else if (internalRef.current) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(internalRef.current, "");
        internalRef.current.dispatchEvent(
          new Event("input", { bubbles: true })
        );
      }
    }
    internalRef.current?.focus();
  }, [onClear]);
  const resolvedAriaInvalid = ariaInvalid !== void 0 ? ariaInvalid : variant === "error" ? true : void 0;
  const inputClasses = chunk4ON3M3OM_cjs.cn(
    inputVariants({ variant, size }),
    iconLeft && iconPaddingLeftMap[size],
    (iconRight || showClear) && iconPaddingRightMap[size],
    className
  );
  if (!hasIcons) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "input",
      {
        ref: chunk4ON3M3OM_cjs.composeRefs(internalRef, ref),
        disabled,
        readOnly,
        value,
        defaultValue,
        "aria-invalid": resolvedAriaInvalid,
        "aria-disabled": disabled || void 0,
        className: inputClasses,
        "data-ds": "",
        "data-ds-component": "input",
        "data-ds-variant": variant,
        "data-ds-size": size,
        ...rest
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: chunk4ON3M3OM_cjs.cn(inputWrapperVariants({ size }), wrapperClassName),
      "data-ds": "",
      "data-ds-component": "input-wrapper",
      children: [
        iconLeft && /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            className: chunk4ON3M3OM_cjs.cn(
              "pointer-events-none absolute flex items-center justify-center",
              "text-muted-foreground",
              iconLeftPositionMap[size],
              iconSizeMap4[size]
            ),
            "aria-hidden": "true",
            children: iconLeft
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            ref: chunk4ON3M3OM_cjs.composeRefs(internalRef, ref),
            disabled,
            readOnly,
            value,
            defaultValue,
            "aria-invalid": resolvedAriaInvalid,
            "aria-disabled": disabled || void 0,
            className: inputClasses,
            "data-ds": "",
            "data-ds-component": "input",
            "data-ds-variant": variant,
            "data-ds-size": size,
            ...rest
          }
        ),
        showClear ? /* @__PURE__ */ jsxRuntime.jsx(ClearButton, { size, onClick: handleClear }) : iconRight && /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            className: chunk4ON3M3OM_cjs.cn(
              "pointer-events-none absolute flex items-center justify-center",
              "text-muted-foreground",
              iconRightPositionMap[size],
              iconSizeMap4[size]
            ),
            "aria-hidden": "true",
            children: iconRight
          }
        )
      ]
    }
  );
});
Input.displayName = "Input";
var containerVariants = classVarianceAuthority.cva(
  [
    "flex w-full items-stretch overflow-hidden",
    "rounded-md border bg-background",
    "transition-[border-color,box-shadow] duration-fast",
    "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",
    "has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50"
  ],
  {
    variants: {
      variant: {
        default: "border-input",
        filled: "border-transparent bg-muted"
      },
      size: {
        sm: "h-8 text-xs",
        md: "h-9 text-sm",
        lg: "h-10 text-sm"
      },
      error: {
        true: "border-danger focus-within:border-danger focus-within:ring-danger/20",
        false: ""
      }
    },
    defaultVariants: { variant: "default", size: "md", error: false }
  }
);
var addonVariants = classVarianceAuthority.cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "bg-muted text-muted-foreground font-medium",
    "select-none",
    "border-border"
  ],
  {
    variants: {
      position: {
        left: "border-r",
        right: "border-l"
      },
      size: {
        sm: "text-xs px-2",
        md: "text-sm px-3",
        lg: "text-sm px-3"
      }
    },
    defaultVariants: { position: "left", size: "md" }
  }
);
var iconSizeMap5 = {
  sm: "[&>svg]:size-3.5",
  md: "[&>svg]:size-4",
  lg: "[&>svg]:size-4"
};
var prefixPaddingMap = {
  sm: "pl-2",
  md: "pl-3",
  lg: "pl-3"
};
var suffixPaddingMap = {
  sm: "pr-2",
  md: "pr-3",
  lg: "pr-3"
};
var inputLeftPaddingWithPrefix = {
  sm: "pl-1.5",
  md: "pl-2",
  lg: "pl-2"
};
var inputLeftPaddingWithAddon = {
  sm: "pl-2",
  md: "pl-3",
  lg: "pl-3"
};
var inputLeftPaddingWithoutPrefix = {
  sm: "pl-2",
  md: "pl-3",
  lg: "pl-3"
};
var inputRightPaddingWithSuffix = {
  sm: "pr-1.5",
  md: "pr-2",
  lg: "pr-2"
};
var inputRightPaddingWithAddon = {
  sm: "pr-2",
  md: "pr-3",
  lg: "pr-3"
};
var inputRightPaddingWithoutSuffix = {
  sm: "pr-2",
  md: "pr-3",
  lg: "pr-3"
};
var InputGroup = React.forwardRef(
  function InputGroup2({
    size = "md",
    variant = "default",
    prefix,
    suffix,
    addonLeft,
    addonRight,
    disabled = false,
    error = false,
    className,
    inputClassName,
    inputProps,
    children
  }, ref) {
    const hasPrefix = !!prefix;
    const hasSuffix = !!suffix;
    const hasAddonRight = !!addonRight;
    const inputPaddingLeft = hasPrefix ? inputLeftPaddingWithPrefix[size] : addonLeft ? inputLeftPaddingWithAddon[size] : inputLeftPaddingWithoutPrefix[size];
    const inputPaddingRight = hasSuffix ? inputRightPaddingWithSuffix[size] : hasAddonRight ? inputRightPaddingWithAddon[size] : inputRightPaddingWithoutSuffix[size];
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(containerVariants({ variant, size, error }), className),
        "data-ds": "",
        "data-ds-component": "input-group",
        "data-ds-size": size,
        "data-ds-error": error ? "" : void 0,
        children: [
          addonLeft && /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunk4ON3M3OM_cjs.cn(addonVariants({ position: "left", size })), children: addonLeft }),
          prefix && /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              className: chunk4ON3M3OM_cjs.cn(
                "inline-flex items-center justify-center shrink-0",
                "text-muted-foreground pointer-events-none",
                prefixPaddingMap[size],
                iconSizeMap5[size]
              ),
              children: prefix
            }
          ),
          children ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1 flex items-center min-w-0", children }) : /* @__PURE__ */ jsxRuntime.jsx(
            "input",
            {
              disabled,
              className: chunk4ON3M3OM_cjs.cn(
                "flex-1 h-full bg-transparent outline-none text-foreground min-w-0",
                "placeholder:text-muted-foreground",
                inputPaddingLeft,
                inputPaddingRight,
                inputClassName
              ),
              ...inputProps
            }
          ),
          suffix && /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              className: chunk4ON3M3OM_cjs.cn(
                "inline-flex items-center justify-center shrink-0",
                "text-muted-foreground pointer-events-none",
                suffixPaddingMap[size],
                iconSizeMap5[size]
              ),
              children: suffix
            }
          ),
          addonRight && /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunk4ON3M3OM_cjs.cn(addonVariants({ position: "right", size })), children: addonRight })
        ]
      }
    );
  }
);
InputGroup.displayName = "InputGroup";
var labelVariants = classVarianceAuthority.cva(
  // Base styles — shared across all sizes
  [
    // Typography
    "font-medium leading-none text-foreground",
    // Prevent text selection on double-click
    "select-none",
    // Peer-disabled styling (when used with peer inputs)
    "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — for compact forms and dense UIs.
         * Font: 12px
         */
        sm: "text-xs leading-4",
        /**
         * Medium — default size for most labels.
         * Font: 14px
         */
        md: "text-sm leading-5",
        /**
         * Large — for prominent form fields.
         * Font: 14px with slightly more weight
         */
        lg: "text-sm leading-5 font-semibold"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
function RequiredIndicator2({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx("span", { className: chunk4ON3M3OM_cjs.cn("text-danger ml-0.5", className), "aria-hidden": "true", children: "*" });
}
var Label = React.forwardRef(function Label2({
  size = "md",
  required = false,
  disabled = false,
  description,
  descriptionClassName,
  wrapperClassName,
  className,
  children,
  ...rest
}, ref) {
  const descriptionSizeClass = size === "sm" ? "text-[11px] leading-4" : "text-xs leading-4";
  const labelElement = /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.Label.Root,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        labelVariants({ size }),
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "cursor-pointer",
        className
      ),
      "data-ds": "",
      "data-ds-component": "label",
      "data-ds-size": size,
      ...disabled ? { "data-ds-disabled": "" } : {},
      ...required ? { "data-ds-required": "" } : {},
      ...rest,
      children: [
        children,
        required && /* @__PURE__ */ jsxRuntime.jsx(RequiredIndicator2, {})
      ]
    }
  );
  if (!description) {
    return labelElement;
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: chunk4ON3M3OM_cjs.cn("flex flex-col gap-1", wrapperClassName),
      "data-ds": "",
      "data-ds-component": "label-group",
      children: [
        labelElement,
        /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            className: chunk4ON3M3OM_cjs.cn(
              descriptionSizeClass,
              "text-muted-foreground",
              disabled && "opacity-50",
              descriptionClassName
            ),
            children: description
          }
        )
      ]
    }
  );
});
Label.displayName = "Label";
function CheckIcon7({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntime.jsx("polyline", { points: "20 6 9 17 4 12" })
    }
  );
}
function DotIcon3({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "4" })
    }
  );
}
function ChevronRightIcon5({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m9 18 6-6-6-6" })
    }
  );
}
var menuItemBase3 = [
  "relative flex w-full cursor-pointer select-none items-center",
  "rounded-sm py-1.5 px-2",
  "text-sm leading-5 outline-none",
  "transition-colors duration-fast ease-standard",
  "focus:bg-muted",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
];
var menuContentBase3 = [
  "z-[var(--z-dropdown)]",
  "min-w-[10rem]",
  "overflow-hidden",
  "rounded-md",
  "border border-border",
  "bg-background",
  "p-1",
  "shadow-lg",
  "text-foreground",
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
  "data-[side=top]:slide-in-from-bottom-2",
  "data-[side=bottom]:slide-in-from-top-2",
  "data-[side=left]:slide-in-from-right-2",
  "data-[side=right]:slide-in-from-left-2"
];
var Menubar = React.forwardRef(function Menubar2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Menubar.Root,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "flex h-9 items-center gap-1",
        "rounded-md border border-border",
        "bg-background px-1",
        "shadow-sm",
        className
      ),
      "data-ds": "",
      "data-ds-component": "menubar",
      ...rest
    }
  );
});
Menubar.displayName = "Menubar";
function MenubarMenu({ children, ...rest }) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Menubar.Menu, { ...rest, children });
}
MenubarMenu.displayName = "MenubarMenu";
var MenubarTrigger = React.forwardRef(function MenubarTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Menubar.Trigger,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "flex cursor-pointer select-none items-center rounded-sm",
        "px-3 py-1 text-sm font-medium outline-none",
        "transition-colors duration-fast ease-standard",
        "hover:bg-muted hover:text-foreground",
        "focus:bg-muted focus:text-foreground",
        "data-[state=open]:bg-muted data-[state=open]:text-foreground",
        className
      ),
      "data-ds": "",
      "data-ds-component": "menubar-trigger",
      ...rest
    }
  );
});
MenubarTrigger.displayName = "MenubarTrigger";
var MenubarContent = React.forwardRef(function MenubarContent2({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Menubar.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Menubar.Content,
    {
      ref,
      align,
      alignOffset,
      sideOffset,
      className: chunk4ON3M3OM_cjs.cn(...menuContentBase3, className),
      "data-ds": "",
      "data-ds-component": "menubar-content",
      ...rest,
      children
    }
  ) });
});
MenubarContent.displayName = "MenubarContent";
var MenubarItem = React.forwardRef(function MenubarItem2({ className, variant = "default", icon, inset, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.Menubar.Item,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        ...menuItemBase3,
        inset && "pl-8",
        variant === "danger" && "text-destructive focus:bg-destructive/10 focus:text-destructive",
        className
      ),
      "data-ds": "",
      "data-ds-component": "menubar-item",
      "data-ds-variant": variant,
      ...rest,
      children: [
        icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "mr-2 flex size-4 shrink-0 items-center justify-center", children: icon }),
        children
      ]
    }
  );
});
MenubarItem.displayName = "MenubarItem";
var MenubarCheckboxItem = React.forwardRef(function MenubarCheckboxItem2({ className, children, checked, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.Menubar.CheckboxItem,
    {
      ref,
      checked,
      className: chunk4ON3M3OM_cjs.cn(...menuItemBase3, "pl-8", className),
      "data-ds": "",
      "data-ds-component": "menubar-checkbox-item",
      ...rest,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute left-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(radixUi.Menubar.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(CheckIcon7, { className: "text-foreground" }) }) }),
        children
      ]
    }
  );
});
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";
var MenubarRadioGroup = React.forwardRef(function MenubarRadioGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Menubar.RadioGroup,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(className),
      ...rest
    }
  );
});
MenubarRadioGroup.displayName = "MenubarRadioGroup";
var MenubarRadioItem = React.forwardRef(function MenubarRadioItem2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.Menubar.RadioItem,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(...menuItemBase3, "pl-8", className),
      "data-ds": "",
      "data-ds-component": "menubar-radio-item",
      ...rest,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute left-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(radixUi.Menubar.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(DotIcon3, { className: "text-foreground" }) }) }),
        children
      ]
    }
  );
});
MenubarRadioItem.displayName = "MenubarRadioItem";
var MenubarLabel = React.forwardRef(function MenubarLabel2({ className, inset, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Menubar.Label,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
        inset && "pl-8",
        className
      ),
      "data-ds": "",
      "data-ds-component": "menubar-label",
      ...rest
    }
  );
});
MenubarLabel.displayName = "MenubarLabel";
var MenubarSeparator = React.forwardRef(function MenubarSeparator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Menubar.Separator,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn("-mx-1 my-1 h-px bg-border", className),
      "data-ds": "",
      "data-ds-component": "menubar-separator",
      ...rest
    }
  );
});
MenubarSeparator.displayName = "MenubarSeparator";
var MenubarGroup = React.forwardRef(function MenubarGroup2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Menubar.Group, { ref, className: chunk4ON3M3OM_cjs.cn(className), ...rest });
});
MenubarGroup.displayName = "MenubarGroup";
function MenubarSub({ children, ...rest }) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Menubar.Sub, { ...rest, children });
}
MenubarSub.displayName = "MenubarSub";
var MenubarSubTrigger = React.forwardRef(function MenubarSubTrigger2({ className, inset, icon, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.Menubar.SubTrigger,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        ...menuItemBase3,
        "data-[state=open]:bg-muted",
        inset && "pl-8",
        className
      ),
      "data-ds": "",
      "data-ds-component": "menubar-sub-trigger",
      ...rest,
      children: [
        icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "mr-2 flex size-4 shrink-0 items-center justify-center", children: icon }),
        children,
        /* @__PURE__ */ jsxRuntime.jsx(ChevronRightIcon5, { className: "ml-auto text-muted-foreground" })
      ]
    }
  );
});
MenubarSubTrigger.displayName = "MenubarSubTrigger";
var MenubarSubContent = React.forwardRef(function MenubarSubContent2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Menubar.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Menubar.SubContent,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(...menuContentBase3, className),
      "data-ds": "",
      "data-ds-component": "menubar-sub-content",
      ...rest,
      children
    }
  ) });
});
MenubarSubContent.displayName = "MenubarSubContent";
function MenubarShortcut({ className, children }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: chunk4ON3M3OM_cjs.cn(
        "ml-auto pl-4 text-xs tracking-widest text-muted-foreground",
        className
      ),
      "data-ds": "",
      "data-ds-component": "menubar-shortcut",
      children
    }
  );
}
MenubarShortcut.displayName = "MenubarShortcut";
function ChevronDownIcon3({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 9 6 6 6-6" })
    }
  );
}
var NavigationMenu = React.forwardRef(function NavigationMenu2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.NavigationMenu.Root,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "relative z-10 flex max-w-max flex-1 items-center justify-center",
        className
      ),
      "data-ds": "",
      "data-ds-component": "navigation-menu",
      ...rest,
      children: [
        children,
        /* @__PURE__ */ jsxRuntime.jsx(NavigationMenuViewport, {})
      ]
    }
  );
});
NavigationMenu.displayName = "NavigationMenu";
var NavigationMenuList = React.forwardRef(function NavigationMenuList2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.NavigationMenu.List,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
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
var NavigationMenuItem = React.forwardRef(function NavigationMenuItem2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.NavigationMenu.Item,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn("relative", className),
      "data-ds": "",
      "data-ds-component": "navigation-menu-item",
      ...rest
    }
  );
});
NavigationMenuItem.displayName = "NavigationMenuItem";
var NavigationMenuTrigger = React.forwardRef(function NavigationMenuTrigger2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.NavigationMenu.Trigger,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
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
        /* @__PURE__ */ jsxRuntime.jsx(
          ChevronDownIcon3,
          {
            className: chunk4ON3M3OM_cjs.cn(
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
var NavigationMenuContent = React.forwardRef(function NavigationMenuContent2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.NavigationMenu.Content,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
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
var NavigationMenuLink = React.forwardRef(function NavigationMenuLink2({ className, active, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.NavigationMenu.Link,
    {
      ref,
      active,
      className: chunk4ON3M3OM_cjs.cn(
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
var NavigationMenuViewport = React.forwardRef(function NavigationMenuViewport2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunk4ON3M3OM_cjs.cn("absolute left-0 top-full flex justify-center"), children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.NavigationMenu.Viewport,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
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
var NavigationMenuIndicator = React.forwardRef(function NavigationMenuIndicator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.NavigationMenu.Indicator,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        "data-[state=visible]:animate-in data-[state=visible]:fade-in",
        "data-[state=hidden]:animate-out data-[state=hidden]:fade-out",
        className
      ),
      "data-ds": "",
      "data-ds-component": "navigation-menu-indicator",
      ...rest,
      children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" })
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
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.NavigationMenu.Link,
    {
      href,
      active,
      className: chunk4ON3M3OM_cjs.cn(
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
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
          icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex size-5 shrink-0 items-center justify-center text-foreground", children: icon }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm font-medium leading-none text-foreground", children: title })
        ] }),
        description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "line-clamp-2 text-xs leading-snug text-muted-foreground", children: description })
      ]
    }
  );
}
NavigationMenuCardLink.displayName = "NavigationMenuCardLink";
var numberInputVariants = classVarianceAuthority.cva(
  [
    "inline-flex items-stretch overflow-hidden",
    "rounded-md border bg-background",
    "transition-[border-color,box-shadow] duration-fast",
    "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",
    "has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50"
  ],
  {
    variants: {
      variant: {
        default: "border-input",
        primary: "border-primary/40 focus-within:border-primary focus-within:ring-primary/20"
      },
      size: {
        sm: "h-8 text-xs",
        md: "h-9 text-sm",
        lg: "h-10 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var stepperButtonBase = [
  "inline-flex items-center justify-center shrink-0",
  "bg-transparent",
  "text-muted-foreground hover:text-foreground hover:bg-accent",
  "transition-colors duration-fast",
  "disabled:pointer-events-none disabled:opacity-40",
  "select-none",
  "active:bg-accent/80",
  chunk3EHT6IOA_cjs.focusRingClasses
];
function PlusIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 5v14M5 12h14" })
    }
  );
}
function MinusIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M5 12h14" })
    }
  );
}
function clamp(value, min2, max2) {
  let v = value;
  if (min2 !== void 0) v = Math.max(min2, v);
  if (max2 !== void 0) v = Math.min(max2, v);
  return v;
}
function roundToPrecision(value, precision) {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}
var ROLL_DISTANCE = 12;
var ROLL_TRANSITION = {
  duration: 0.2,
  ease: [0.4, 0, 0.2, 1]
};
function AnimatedValue({
  value,
  formatValue,
  shouldReduce,
  direction
}) {
  const [displayValue, setDisplayValue] = React.useState(value);
  const [key, setKey] = React.useState(0);
  React.useEffect(() => {
    setDisplayValue(value);
    setKey((k) => k + 1);
  }, [value]);
  if (shouldReduce) {
    return /* @__PURE__ */ jsxRuntime.jsx("span", { className: "tabular-nums", children: formatValue(displayValue) });
  }
  const enterY = direction === "down" ? -ROLL_DISTANCE : ROLL_DISTANCE;
  const exitY = direction === "down" ? ROLL_DISTANCE : -ROLL_DISTANCE;
  const variants = {
    initial: { opacity: 0, y: enterY },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: exitY }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: "relative inline-block overflow-hidden leading-none",
      "aria-live": "polite",
      "aria-atomic": "true",
      children: /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { mode: "wait", initial: false, children: /* @__PURE__ */ jsxRuntime.jsx(
        framerMotion.motion.span,
        {
          className: "inline-block tabular-nums",
          variants,
          initial: "initial",
          animate: "animate",
          exit: "exit",
          transition: ROLL_TRANSITION,
          "data-ds-animated": "",
          children: formatValue(displayValue)
        },
        key
      ) })
    }
  );
}
var buttonWidthMap = {
  sm: "w-7",
  md: "w-8",
  lg: "w-9"
};
var iconSizeMap6 = {
  sm: "size-3",
  md: "size-3.5",
  lg: "size-4"
};
var inputPaddingMap = {
  sm: "px-2 min-w-[3.5rem]",
  md: "px-3 min-w-[4rem]",
  lg: "px-3 min-w-[4.5rem]"
};
var NumberInput = React.forwardRef(
  function NumberInput2({
    value: controlledValue,
    defaultValue = 0,
    onChange,
    min: min2,
    max: max2,
    step = 1,
    precision = 0,
    variant = "default",
    size = "md",
    disabled = false,
    readOnly = false,
    "aria-label": ariaLabel,
    formatValue,
    parseValue,
    incrementLabel = "Increment",
    decrementLabel = "Decrement",
    className,
    ...rest
  }, ref) {
    const shouldReduce = framerMotion.useReducedMotion();
    const [internalValue, setInternalValue] = React.useState(
      () => roundToPrecision(clamp(defaultValue, min2, max2), precision)
    );
    const [inputRaw, setInputRaw] = React.useState(null);
    const [direction, setDirection] = React.useState("none");
    const inputRef = React.useRef(null);
    const prevValueRef = React.useRef(
      controlledValue ?? roundToPrecision(clamp(defaultValue, min2, max2), precision)
    );
    const currentValue = controlledValue !== void 0 ? controlledValue : internalValue;
    React.useEffect(() => {
      if (controlledValue !== void 0 && controlledValue !== prevValueRef.current) {
        setDirection(controlledValue > prevValueRef.current ? "up" : "down");
        prevValueRef.current = controlledValue;
      }
    }, [controlledValue]);
    const resolvedFormat = formatValue ?? ((v) => v.toFixed(precision));
    const resolvedParse = parseValue ?? ((raw) => Number.parseFloat(raw.replace(/[^0-9.-]/g, "")));
    const commit = React.useCallback(
      (next) => {
        const clamped = roundToPrecision(clamp(next, min2, max2), precision);
        if (clamped !== currentValue) {
          setDirection(clamped > currentValue ? "up" : "down");
          prevValueRef.current = clamped;
        }
        if (controlledValue === void 0) {
          setInternalValue(clamped);
        }
        if (clamped !== currentValue) {
          onChange?.(clamped);
        }
        return clamped;
      },
      [controlledValue, min2, max2, precision, currentValue, onChange]
    );
    const increment = React.useCallback(
      (multiplier = 1) => commit(currentValue + step * multiplier),
      [commit, currentValue, step]
    );
    const decrement = React.useCallback(
      (multiplier = 1) => commit(currentValue - step * multiplier),
      [commit, currentValue, step]
    );
    const isAtMin = min2 !== void 0 && currentValue <= min2;
    const isAtMax = max2 !== void 0 && currentValue >= max2;
    const handleKeyDown = React.useCallback(
      (e) => {
        if (disabled || readOnly) return;
        const multiplier = e.shiftKey ? 10 : 1;
        switch (e.key) {
          case "ArrowUp":
            e.preventDefault();
            increment(multiplier);
            break;
          case "ArrowDown":
            e.preventDefault();
            decrement(multiplier);
            break;
          case "Home":
            if (min2 !== void 0) {
              e.preventDefault();
              commit(min2);
            }
            break;
          case "End":
            if (max2 !== void 0) {
              e.preventDefault();
              commit(max2);
            }
            break;
        }
      },
      [disabled, readOnly, increment, decrement, commit, min2, max2]
    );
    const handleInputFocus = React.useCallback(() => {
      setInputRaw(String(currentValue));
    }, [currentValue]);
    const handleInputChange = React.useCallback(
      (e) => {
        setInputRaw(e.target.value);
      },
      []
    );
    const handleInputBlur = React.useCallback(() => {
      if (inputRaw !== null) {
        const parsed = resolvedParse(inputRaw);
        if (!Number.isNaN(parsed)) {
          commit(parsed);
        }
        setInputRaw(null);
      }
    }, [inputRaw, resolvedParse, commit]);
    const handleInputKeyDown = React.useCallback(
      (e) => {
        if (e.key === "Enter") {
          inputRef.current?.blur();
        }
        if (e.key === "Escape") {
          setInputRaw(null);
          inputRef.current?.blur();
        }
      },
      []
    );
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        role: "spinbutton",
        "aria-valuenow": currentValue,
        "aria-valuemin": min2,
        "aria-valuemax": max2,
        "aria-label": ariaLabel,
        "aria-disabled": disabled,
        "aria-readonly": readOnly,
        tabIndex: -1,
        onKeyDown: handleKeyDown,
        className: chunk4ON3M3OM_cjs.cn(numberInputVariants({ variant, size }), className),
        "data-ds": "",
        "data-ds-component": "number-input",
        "data-ds-variant": variant,
        "data-ds-size": size,
        ...rest,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              tabIndex: 0,
              onClick: () => decrement(),
              disabled: disabled || readOnly || isAtMin,
              "aria-label": decrementLabel,
              className: chunk4ON3M3OM_cjs.cn(
                stepperButtonBase,
                buttonWidthMap[size],
                "border-r border-input/60"
              ),
              children: /* @__PURE__ */ jsxRuntime.jsx(MinusIcon, { className: iconSizeMap6[size] })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative flex-1 flex items-center justify-center", children: inputRaw !== null ? (
            // Editing mode: show raw <input>
            /* @__PURE__ */ jsxRuntime.jsx(
              "input",
              {
                ref: inputRef,
                type: "text",
                inputMode: "decimal",
                value: inputRaw,
                onChange: handleInputChange,
                onBlur: handleInputBlur,
                onKeyDown: handleInputKeyDown,
                disabled,
                readOnly,
                className: chunk4ON3M3OM_cjs.cn(
                  "w-full h-full bg-transparent text-center outline-none",
                  "tabular-nums text-foreground",
                  inputPaddingMap[size]
                )
              }
            )
          ) : (
            // Display mode: animated value
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                tabIndex: 0,
                disabled: disabled || readOnly,
                onFocus: handleInputFocus,
                onClick: handleInputFocus,
                className: chunk4ON3M3OM_cjs.cn(
                  "w-full h-full flex items-center justify-center",
                  "bg-transparent outline-none",
                  "text-foreground",
                  "cursor-text",
                  inputPaddingMap[size],
                  chunk3EHT6IOA_cjs.focusRingClasses
                ),
                "aria-label": `Current value: ${resolvedFormat(currentValue)}, press to edit`,
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  AnimatedValue,
                  {
                    value: currentValue,
                    formatValue: resolvedFormat,
                    shouldReduce: shouldReduce ?? false,
                    direction
                  }
                )
              }
            )
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              tabIndex: 0,
              onClick: () => increment(),
              disabled: disabled || readOnly || isAtMax,
              "aria-label": incrementLabel,
              className: chunk4ON3M3OM_cjs.cn(
                stepperButtonBase,
                buttonWidthMap[size],
                "border-l border-input/60"
              ),
              children: /* @__PURE__ */ jsxRuntime.jsx(PlusIcon, { className: iconSizeMap6[size] })
            }
          )
        ]
      }
    );
  }
);
NumberInput.displayName = "NumberInput";
function ChevronLeftIcon2({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m15 18-6-6 6-6" })
    }
  );
}
function ChevronRightIcon6({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m9 18 6-6-6-6" })
    }
  );
}
var paginationButtonVariants = classVarianceAuthority.cva(
  [
    // Layout
    "inline-flex items-center justify-center",
    // Shape
    "rounded-md",
    // Typography
    "font-medium tabular-nums",
    // Transitions
    "transition-colors duration-fast",
    // Focus
    chunk3EHT6IOA_cjs.focusRingCompactClasses,
    // Disabled
    "disabled:pointer-events-none disabled:opacity-40",
    // Cursor
    "cursor-pointer",
    "select-none"
  ],
  {
    variants: {
      size: {
        sm: "h-7 min-w-7 px-1.5 text-xs gap-1",
        md: "h-9 min-w-9 px-2 text-sm gap-1.5"
      },
      active: {
        true: "bg-primary text-primary-foreground hover:bg-primary-hover",
        false: "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
      }
    },
    defaultVariants: {
      size: "md",
      active: false
    }
  }
);
function computePageRange(currentPage, totalPages, siblings, boundary) {
  const pages = /* @__PURE__ */ new Set();
  for (let i = 1; i <= Math.min(boundary, totalPages); i++) {
    pages.add(i);
  }
  for (let i = Math.max(1, totalPages - boundary + 1); i <= totalPages; i++) {
    pages.add(i);
  }
  for (let i = Math.max(1, currentPage - siblings); i <= Math.min(totalPages, currentPage + siblings); i++) {
    pages.add(i);
  }
  const sorted = Array.from(pages).sort((a, b) => a - b);
  const items = [];
  for (let i = 0; i < sorted.length; i++) {
    const page = sorted[i];
    if (i > 0 && page - sorted[i - 1] > 1) {
      items.push({
        type: "ellipsis",
        key: `ellipsis-${sorted[i - 1]}-${page}`
      });
    }
    items.push({ type: "page", value: page });
  }
  return items;
}
var iconSizeMap7 = {
  sm: "size-3.5",
  md: "size-4"
};
var ellipsisSizeMap = {
  sm: "h-7 min-w-7 text-xs",
  md: "h-9 min-w-9 text-sm"
};
var Pagination = React.forwardRef(
  function Pagination2({
    totalPages,
    page: controlledPage,
    defaultPage = 1,
    onPageChange,
    variant = "default",
    size = "md",
    siblings = 1,
    boundary = 1,
    showPrevNext = true,
    prevLabel = "Previous",
    nextLabel = "Next",
    "aria-label": ariaLabel = "Pagination",
    className,
    ...rest
  }, ref) {
    const [internalPage, setInternalPage] = React.useState(defaultPage);
    const isControlled = controlledPage !== void 0;
    const currentPage = Math.max(
      1,
      Math.min(isControlled ? controlledPage : internalPage, totalPages)
    );
    const handlePageChange = React.useCallback(
      (newPage) => {
        const clamped = Math.max(1, Math.min(newPage, totalPages));
        if (!isControlled) {
          setInternalPage(clamped);
        }
        onPageChange?.(clamped);
      },
      [isControlled, totalPages, onPageChange]
    );
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    const pageItems = React.useMemo(
      () => variant === "default" ? computePageRange(currentPage, totalPages, siblings, boundary) : [],
      [variant, currentPage, totalPages, siblings, boundary]
    );
    if (variant === "compact") {
      return /* @__PURE__ */ jsxRuntime.jsxs(
        "nav",
        {
          ref,
          "aria-label": ariaLabel,
          className: chunk4ON3M3OM_cjs.cn("inline-flex items-center gap-1", className),
          "data-ds": "",
          "data-ds-component": "pagination",
          "data-ds-variant": "compact",
          "data-ds-size": size,
          ...rest,
          children: [
            showPrevNext && /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                disabled: isFirstPage,
                onClick: () => handlePageChange(currentPage - 1),
                className: chunk4ON3M3OM_cjs.cn(
                  paginationButtonVariants({
                    size,
                    active: false
                  })
                ),
                "aria-label": prevLabel,
                children: /* @__PURE__ */ jsxRuntime.jsx(ChevronLeftIcon2, { className: iconSizeMap7[size] })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsxs(
              "span",
              {
                className: chunk4ON3M3OM_cjs.cn(
                  "inline-flex items-center justify-center px-3",
                  "text-foreground font-medium tabular-nums",
                  size === "sm" ? "text-xs" : "text-sm"
                ),
                children: [
                  "Page ",
                  currentPage,
                  " of ",
                  totalPages
                ]
              }
            ),
            showPrevNext && /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                disabled: isLastPage,
                onClick: () => handlePageChange(currentPage + 1),
                className: chunk4ON3M3OM_cjs.cn(
                  paginationButtonVariants({
                    size,
                    active: false
                  })
                ),
                "aria-label": nextLabel,
                children: /* @__PURE__ */ jsxRuntime.jsx(ChevronRightIcon6, { className: iconSizeMap7[size] })
              }
            )
          ]
        }
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "nav",
      {
        ref,
        "aria-label": ariaLabel,
        className: chunk4ON3M3OM_cjs.cn("inline-flex items-center gap-1", className),
        "data-ds": "",
        "data-ds-component": "pagination",
        "data-ds-variant": "default",
        "data-ds-size": size,
        ...rest,
        children: [
          showPrevNext && /* @__PURE__ */ jsxRuntime.jsxs(
            "button",
            {
              type: "button",
              disabled: isFirstPage,
              onClick: () => handlePageChange(currentPage - 1),
              className: chunk4ON3M3OM_cjs.cn(paginationButtonVariants({ size, active: false })),
              "aria-label": prevLabel,
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(ChevronLeftIcon2, { className: iconSizeMap7[size] }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only sm:not-sr-only", children: prevLabel })
              ]
            }
          ),
          pageItems.map((item) => {
            if (item.type === "ellipsis") {
              return /* @__PURE__ */ jsxRuntime.jsx(
                "span",
                {
                  className: chunk4ON3M3OM_cjs.cn(
                    "inline-flex items-center justify-center",
                    "text-muted-foreground select-none",
                    ellipsisSizeMap[size]
                  ),
                  "aria-hidden": "true",
                  children: "\u2026"
                },
                item.key
              );
            }
            const isActive = item.value === currentPage;
            return /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                onClick: () => handlePageChange(item.value),
                className: chunk4ON3M3OM_cjs.cn(
                  paginationButtonVariants({
                    size,
                    active: isActive
                  })
                ),
                "aria-current": isActive ? "page" : void 0,
                "aria-label": `Page ${item.value}`,
                children: item.value
              },
              item.value
            );
          }),
          showPrevNext && /* @__PURE__ */ jsxRuntime.jsxs(
            "button",
            {
              type: "button",
              disabled: isLastPage,
              onClick: () => handlePageChange(currentPage + 1),
              className: chunk4ON3M3OM_cjs.cn(paginationButtonVariants({ size, active: false })),
              "aria-label": nextLabel,
              children: [
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only sm:not-sr-only", children: nextLabel }),
                /* @__PURE__ */ jsxRuntime.jsx(ChevronRightIcon6, { className: iconSizeMap7[size] })
              ]
            }
          )
        ]
      }
    );
  }
);
Pagination.displayName = "Pagination";
var pinCellVariants = classVarianceAuthority.cva(
  [
    // Layout
    "inline-flex items-center justify-center shrink-0",
    "rounded-md border bg-background",
    // Typography
    "text-center font-semibold tabular-nums leading-none",
    // Transition
    "transition-[border-color,box-shadow,background-color] duration-fast",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50",
    // Cursor
    "cursor-text",
    // Remove native input styling
    "outline-none appearance-none",
    // Selection
    "select-none",
    // Hide caret — we use a custom one
    "caret-transparent"
  ],
  {
    variants: {
      variant: {
        default: [
          "border-input",
          "focus:border-ring focus:ring-2 focus:ring-ring/20"
        ],
        primary: [
          "border-primary/40",
          "focus:border-primary focus:ring-2 focus:ring-primary/20"
        ]
      },
      size: {
        sm: "w-8 h-10 text-base",
        md: "w-10 h-12 text-lg",
        lg: "w-12 h-14 text-xl"
      },
      state: {
        empty: "",
        filled: "bg-accent/30",
        active: "",
        error: "border-danger focus:border-danger focus:ring-danger/20",
        success: "border-success focus:border-success focus:ring-success/20"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      state: "empty"
    }
  }
);
var allowedPatterns = {
  numeric: /^[0-9]$/,
  alphanumeric: /^[a-zA-Z0-9]$/,
  alphabetic: /^[a-zA-Z]$/
};
var MASK_CHAR = "\u2022";
var PinInput = React.forwardRef(
  function PinInput2({
    length = 6,
    value: controlledValue,
    defaultValue,
    onChange,
    onComplete,
    onClear,
    type = "numeric",
    variant = "default",
    size = "md",
    mask = false,
    error = false,
    success = false,
    disabled = false,
    "aria-label": ariaLabel = "PIN Input",
    autoFocus = false,
    gap = "gap-2",
    className
  }, ref) {
    const shouldReduce = framerMotion.useReducedMotion();
    const [internalValue, setInternalValue] = React.useState(() => {
      const initial = defaultValue ?? controlledValue ?? [];
      return Array.from({ length }, (_, i) => initial[i] ?? "");
    });
    const cells = controlledValue !== void 0 ? Array.from({ length }, (_, i) => controlledValue[i] ?? "") : internalValue;
    const [animatedIndex, setAnimatedIndex] = React.useState(null);
    const [shakeKey, setShakeKey] = React.useState(0);
    const inputRefs = React.useRef([]);
    const containerRef = React.useRef(null);
    React.useImperativeHandle(ref, () => containerRef.current);
    React.useEffect(() => {
      if (autoFocus) {
        inputRefs.current[0]?.focus();
      }
    }, [autoFocus]);
    const prevErrorRef = React.useRef(error);
    React.useEffect(() => {
      if (error && !prevErrorRef.current) {
        setShakeKey((k) => k + 1);
      }
      prevErrorRef.current = error;
    }, [error]);
    const commit = React.useCallback(
      (newCells) => {
        if (controlledValue === void 0) {
          setInternalValue(newCells);
        }
        onChange?.(newCells);
        const allFilled = newCells.every((c) => c.length === 1);
        if (allFilled) {
          onComplete?.(newCells.join(""));
        }
      },
      [controlledValue, onChange, onComplete]
    );
    const handleKeyDown = React.useCallback(
      (e, index) => {
        const pattern = allowedPatterns[type];
        if (e.key === "Backspace") {
          e.preventDefault();
          const newCells = [...cells];
          if (newCells[index]) {
            newCells[index] = "";
            commit(newCells);
          } else if (index > 0) {
            newCells[index - 1] = "";
            commit(newCells);
            inputRefs.current[index - 1]?.focus();
          } else {
            const cleared = Array.from({ length }, () => "");
            commit(cleared);
            onClear?.();
          }
          return;
        }
        if (e.key === "Delete") {
          e.preventDefault();
          const newCells = [...cells];
          newCells[index] = "";
          commit(newCells);
          return;
        }
        if (e.key === "ArrowLeft" && index > 0) {
          e.preventDefault();
          inputRefs.current[index - 1]?.focus();
          return;
        }
        if (e.key === "ArrowRight" && index < length - 1) {
          e.preventDefault();
          inputRefs.current[index + 1]?.focus();
          return;
        }
        if (e.key === "Home") {
          e.preventDefault();
          inputRefs.current[0]?.focus();
          return;
        }
        if (e.key === "End") {
          e.preventDefault();
          inputRefs.current[length - 1]?.focus();
          return;
        }
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          const char = e.key.toUpperCase();
          if (!pattern.test(type === "numeric" ? e.key : char)) return;
          const newCells = [...cells];
          newCells[index] = type === "numeric" ? e.key : char;
          commit(newCells);
          setAnimatedIndex(index);
          setTimeout(() => setAnimatedIndex(null), 400);
          if (index < length - 1) {
            inputRefs.current[index + 1]?.focus();
          }
        }
      },
      [cells, commit, length, type, onClear]
    );
    const handlePaste = React.useCallback(
      (e, startIndex) => {
        e.preventDefault();
        const raw = e.clipboardData.getData("text");
        const pattern = allowedPatterns[type];
        const chars = raw.split("").filter((c) => pattern.test(type === "numeric" ? c : c.toUpperCase())).map((c) => type === "numeric" ? c : c.toUpperCase());
        if (chars.length === 0) return;
        const newCells = [...cells];
        let lastFilled = startIndex;
        for (let i = 0; i < chars.length && startIndex + i < length; i++) {
          newCells[startIndex + i] = chars[i];
          lastFilled = startIndex + i;
        }
        commit(newCells);
        const focusTarget = Math.min(lastFilled + 1, length - 1);
        inputRefs.current[focusTarget]?.focus();
      },
      [cells, commit, length, type]
    );
    const handleClick = React.useCallback(
      (index) => {
        const firstEmpty = cells.findIndex((c) => !c);
        if (firstEmpty !== -1 && firstEmpty < index) {
          inputRefs.current[firstEmpty]?.focus();
        } else {
          inputRefs.current[index]?.focus();
        }
      },
      [cells]
    );
    const containerState = error ? "error" : success ? "success" : void 0;
    return /* @__PURE__ */ jsxRuntime.jsx(
      framerMotion.motion.div,
      {
        ref: containerRef,
        className: chunk4ON3M3OM_cjs.cn("inline-flex", gap, className),
        variants: chunkF4JJFWWU_cjs.shakeX.variants,
        initial: shakeKey === 0 ? false : "initial",
        animate: shakeKey > 0 ? "animate" : "initial",
        transition: chunkF4JJFWWU_cjs.shakeX.transition,
        "aria-label": ariaLabel,
        "data-ds": "",
        "data-ds-component": "pin-input",
        "data-ds-variant": variant,
        "data-ds-size": size,
        "data-ds-animated": "",
        children: Array.from({ length }, (_, index) => {
          const cellValue = cells[index] ?? "";
          const isFilled = cellValue.length === 1;
          const cellState = containerState ?? (isFilled ? "filled" : "empty");
          return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { children: animatedIndex === index && isFilled && !shouldReduce && /* @__PURE__ */ jsxRuntime.jsx(
              framerMotion.motion.div,
              {
                className: "absolute inset-0 rounded-md bg-primary/15 pointer-events-none",
                variants: chunkF4JJFWWU_cjs.pop.variants,
                initial: "initial",
                animate: "animate",
                exit: "exit",
                transition: chunkF4JJFWWU_cjs.pop.transition,
                "data-ds-animated": ""
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              "input",
              {
                ref: (el) => {
                  inputRefs.current[index] = el;
                },
                type: mask ? "password" : "text",
                inputMode: type === "numeric" ? "numeric" : "text",
                pattern: type === "numeric" ? "[0-9]*" : type === "alphabetic" ? "[a-zA-Z]*" : "[a-zA-Z0-9]*",
                maxLength: 1,
                value: mask && isFilled ? MASK_CHAR : cellValue,
                readOnly: true,
                autoComplete: index === 0 ? "one-time-code" : "off",
                autoCorrect: "off",
                autoCapitalize: "none",
                spellCheck: false,
                disabled,
                onClick: () => handleClick(index),
                onKeyDown: (e) => handleKeyDown(e, index),
                onPaste: (e) => handlePaste(e, index),
                onChange: () => {
                },
                className: chunk4ON3M3OM_cjs.cn(
                  pinCellVariants({
                    variant,
                    size,
                    state: cellState
                  }),
                  // Override focus ring with our variant-specific ring
                  "focus:outline-none"
                ),
                "aria-label": `Digit ${index + 1} of ${length}`,
                "aria-invalid": error ? "true" : void 0,
                "data-ds-cell-index": index,
                "data-ds-filled": isFilled ? "" : void 0
              }
            )
          ] }, index);
        })
      },
      shakeKey
    );
  }
);
PinInput.displayName = "PinInput";
function CloseIcon3({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
function Popover({ children, ...rest }) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Popover.Root, { ...rest, children });
}
Popover.displayName = "Popover";
var PopoverTrigger = React.forwardRef(function PopoverTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Popover.Trigger,
    {
      ref,
      className,
      "data-ds": "",
      "data-ds-component": "popover-trigger",
      ...rest
    }
  );
});
PopoverTrigger.displayName = "PopoverTrigger";
var PopoverContent = React.forwardRef(function PopoverContent2({
  className,
  showClose = false,
  arrow = false,
  arrowClassName,
  children,
  side = "bottom",
  align = "center",
  sideOffset = 4,
  ...rest
}, ref) {
  const shouldReduce = framerMotion.useReducedMotion();
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Popover.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Popover.Content,
    {
      ref,
      side,
      align,
      sideOffset,
      asChild: true,
      ...rest,
      children: /* @__PURE__ */ jsxRuntime.jsxs(
        framerMotion.motion.div,
        {
          className: chunk4ON3M3OM_cjs.cn(
            // Layout & sizing
            "w-72",
            // Z-index
            "z-[var(--z-popover)]",
            // Visual
            "rounded-md",
            "border border-border",
            "bg-background",
            "p-4",
            "shadow-lg",
            // Text
            "text-sm text-foreground",
            // Outline
            "outline-none",
            className
          ),
          variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.scaleIn.variants,
          initial: shouldReduce ? { opacity: 0 } : "initial",
          animate: shouldReduce ? { opacity: 1 } : "animate",
          exit: shouldReduce ? { opacity: 0 } : "exit",
          transition: shouldReduce ? { duration: 0.15 } : chunkF4JJFWWU_cjs.scaleIn.transition,
          "data-ds": "",
          "data-ds-component": "popover-content",
          "data-ds-animated": "",
          children: [
            children,
            showClose && /* @__PURE__ */ jsxRuntime.jsx(
              radixUi.Popover.Close,
              {
                className: chunk4ON3M3OM_cjs.cn(
                  "absolute right-2 top-2",
                  "inline-flex items-center justify-center",
                  "rounded-sm p-1",
                  "text-muted-foreground hover:text-foreground",
                  "transition-colors duration-fast",
                  chunk3EHT6IOA_cjs.focusRingInsetClasses
                ),
                "aria-label": "Close",
                children: /* @__PURE__ */ jsxRuntime.jsx(CloseIcon3, { className: "size-4" })
              }
            ),
            arrow && /* @__PURE__ */ jsxRuntime.jsx(
              radixUi.Popover.Arrow,
              {
                className: chunk4ON3M3OM_cjs.cn("fill-background", arrowClassName),
                width: 12,
                height: 6
              }
            )
          ]
        }
      )
    }
  ) });
});
PopoverContent.displayName = "PopoverContent";
var PopoverClose = React.forwardRef(function PopoverClose2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Popover.Close,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "inline-flex items-center justify-center",
        "rounded-sm",
        "text-muted-foreground hover:text-foreground",
        "transition-colors duration-fast",
        chunk3EHT6IOA_cjs.focusRingInsetClasses,
        className
      ),
      "data-ds": "",
      "data-ds-component": "popover-close",
      ...rest
    }
  );
});
PopoverClose.displayName = "PopoverClose";
var PopoverArrow = React.forwardRef(function PopoverArrow2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Popover.Arrow,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn("fill-background", className),
      width: 12,
      height: 6,
      ...rest
    }
  );
});
PopoverArrow.displayName = "PopoverArrow";
var progressTrackVariants = classVarianceAuthority.cva(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "relative w-full overflow-hidden",
    // Shape
    "rounded-full",
    // Background
    "bg-muted"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — thin bar for subtle progress indicators.
         * Height: 6px
         */
        sm: "h-1.5",
        /**
         * Medium — default size for most progress bars.
         * Height: 8px
         */
        md: "h-2",
        /**
         * Large — prominent bar for hero progress, file uploads.
         * Height: 12px
         */
        lg: "h-3"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var progressIndicatorVariants = classVarianceAuthority.cva(
  // Base styles — shared across all variants
  [
    // Layout
    "h-full",
    // Shape — match track rounding
    "rounded-full",
    // Transition for value changes
    "transition-[width] duration-standard ease-standard"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Visual Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Default — uses primary brand color.
         */
        default: "bg-primary",
        /**
         * Primary — explicit primary brand color.
         */
        primary: "bg-primary",
        /**
         * Success — positive/complete progress.
         */
        success: "bg-success",
        /**
         * Danger — error/critical progress (e.g., storage almost full).
         */
        danger: "bg-danger",
        /**
         * Warning — caution progress (e.g., approaching limit).
         */
        warning: "bg-warning",
        /**
         * Info — informational progress.
         */
        info: "bg-info"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var stripedStyle = {
  backgroundImage: "linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)",
  backgroundSize: "1rem 1rem"
};
var PROGRESS_STYLE_ID = "unified-ui-progress-keyframes";
var PROGRESS_KEYFRAMES_CSS = `
@keyframes unified-ui-progress-indeterminate {
  0% { transform: translateX(-100%); width: 50%; }
  50% { transform: translateX(50%); width: 30%; }
  100% { transform: translateX(200%); width: 50%; }
}
@keyframes unified-ui-progress-stripe-slide {
  0% { background-position: 1rem 0; }
  100% { background-position: 0 0; }
}
`;
function useProgressKeyframes() {
  React.useEffect(() => {
    if (document.getElementById(PROGRESS_STYLE_ID)) {
      return;
    }
    const style = document.createElement("style");
    style.id = PROGRESS_STYLE_ID;
    style.textContent = PROGRESS_KEYFRAMES_CSS;
    document.head.appendChild(style);
  }, []);
}
var Progress = React.forwardRef(
  function Progress2({
    value = 0,
    max: max2 = 100,
    min: min2 = 0,
    variant = "default",
    size = "md",
    indeterminate = false,
    striped = false,
    animated = false,
    showLabel = false,
    label,
    formatLabel,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    className,
    indicatorClassName,
    ...rest
  }, ref) {
    useProgressKeyframes();
    const clampedValue = Math.max(min2, Math.min(value, max2));
    const range = max2 - min2;
    const percentage = range > 0 ? (clampedValue - min2) / range * 100 : 0;
    const defaultFormatLabel = (v, m) => {
      const pct = m - min2 > 0 ? (v - min2) / (m - min2) * 100 : 0;
      return `${Math.round(pct)}%`;
    };
    const labelFormatter = formatLabel ?? defaultFormatLabel;
    label ?? labelFormatter(clampedValue, max2);
    const indicatorStyle = {
      ...indeterminate ? {
        animation: "unified-ui-progress-indeterminate 1.5s ease-in-out infinite"
      } : {
        width: `${percentage}%`
      },
      ...striped ? stripedStyle : {},
      ...striped && animated ? {
        animation: indeterminate ? "unified-ui-progress-indeterminate 1.5s ease-in-out infinite" : "unified-ui-progress-stripe-slide 0.6s linear infinite"
      } : {}
    };
    const ariaAttrs = {
      role: "progressbar",
      "aria-valuemin": min2,
      "aria-valuemax": max2,
      ...ariaLabel ? { "aria-label": ariaLabel } : {},
      ...ariaLabelledBy ? { "aria-labelledby": ariaLabelledBy } : {}
    };
    if (!indeterminate) {
      ariaAttrs["aria-valuenow"] = clampedValue;
    }
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        "data-ds": "",
        "data-ds-component": "progress",
        "data-ds-variant": variant,
        "data-ds-size": size,
        ...indeterminate ? { "data-ds-indeterminate": "" } : {},
        children: [
          showLabel && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs font-medium leading-4 text-foreground", children: label ?? "" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs font-medium leading-4 text-muted-foreground tabular-nums", children: typeof label === "string" || !label ? labelFormatter(clampedValue, max2) : "" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              ref,
              className: chunk4ON3M3OM_cjs.cn(progressTrackVariants({ size }), className),
              ...ariaAttrs,
              ...rest,
              children: /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  className: chunk4ON3M3OM_cjs.cn(
                    progressIndicatorVariants({ variant }),
                    indeterminate && "absolute",
                    indicatorClassName
                  ),
                  style: indicatorStyle
                }
              )
            }
          )
        ]
      }
    );
  }
);
Progress.displayName = "Progress";
var RadioGroupContext = React.createContext({
  size: "md"
});
function useRadioGroupContext() {
  return React.useContext(RadioGroupContext);
}
var radioGroupVariants = classVarianceAuthority.cva(["flex"], {
  variants: {
    orientation: {
      vertical: "flex-col gap-3",
      horizontal: "flex-row flex-wrap gap-4"
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
});
var radioIndicatorVariants = classVarianceAuthority.cva(
  [
    // Layout
    "relative shrink-0",
    // Shape
    "rounded-full",
    // Border
    "border",
    // Colors
    "border-input bg-background",
    // Transition
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    // Focus ring — WCAG AA compliant
    chunk3EHT6IOA_cjs.focusRingClasses,
    // Hover
    "hover:border-border-strong",
    // Checked state
    "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-disabled"
  ],
  {
    variants: {
      size: {
        /**
         * Small — compact for dense UIs, tables, toolbars.
         * Diameter: 16px
         */
        sm: "size-4",
        /**
         * Medium — default size for most radio buttons.
         * Diameter: 20px
         */
        md: "size-5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var radioInnerDotVariants = classVarianceAuthority.cva(
  [
    "absolute inset-0 flex items-center justify-center",
    "after:block after:rounded-full after:bg-primary-foreground"
  ],
  {
    variants: {
      size: {
        sm: "after:size-1.5",
        md: "after:size-2"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var radioCardVariants = classVarianceAuthority.cva(
  [
    // Layout
    "relative flex items-start gap-3",
    // Shape
    "rounded-md",
    // Border
    "border border-input",
    // Colors
    "bg-background",
    // Transition
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    // Hover
    "hover:border-border-strong hover:bg-surface",
    // Cursor
    "cursor-pointer",
    // Checked state
    "has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-muted",
    // Disabled
    "has-[[data-disabled]]:pointer-events-none has-[[data-disabled]]:opacity-50 has-[[data-disabled]]:cursor-not-allowed",
    // Focus within
    "has-[:focus-visible]:border-border-strong"
  ],
  {
    variants: {
      size: {
        sm: "p-3",
        md: "p-4"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var labelSizeMap2 = {
  sm: "text-xs",
  md: "text-sm"
};
var descriptionSizeMap2 = {
  sm: "text-xs",
  md: "text-xs"
};
var RadioGroup = React.forwardRef(function RadioGroup2({
  orientation = "vertical",
  size = "md",
  disabled,
  className,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(RadioGroupContext.Provider, { value: { size, disabled }, children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.RadioGroup.Root,
    {
      ref,
      orientation,
      disabled,
      className: chunk4ON3M3OM_cjs.cn(radioGroupVariants({ orientation }), className),
      "data-ds": "",
      "data-ds-component": "radio-group",
      "data-ds-orientation": orientation,
      "data-ds-size": size,
      ...rest,
      children
    }
  ) });
});
RadioGroup.displayName = "RadioGroup";
var RadioGroupItem = React.forwardRef(function RadioGroupItem2({ value, label, description, size: sizeProp, disabled, className, ...rest }, ref) {
  const { size: groupSize, disabled: groupDisabled } = useRadioGroupContext();
  const size = sizeProp ?? groupSize;
  const isDisabled = disabled ?? groupDisabled;
  const generatedId = React.useId();
  const itemId = rest.id ?? `radio-${generatedId}`;
  const labelId = label ? `${itemId}-label` : void 0;
  const descriptionId = description ? `${itemId}-desc` : void 0;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: chunk4ON3M3OM_cjs.cn(
        "flex items-start gap-2",
        isDisabled && "opacity-50 cursor-not-allowed",
        className
      ),
      "data-ds": "",
      "data-ds-component": "radio-item-wrapper",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          radixUi.RadioGroup.Item,
          {
            ref,
            id: itemId,
            value,
            disabled: isDisabled,
            "aria-labelledby": labelId,
            "aria-describedby": descriptionId,
            className: chunk4ON3M3OM_cjs.cn(radioIndicatorVariants({ size }), "mt-0.5"),
            "data-ds": "",
            "data-ds-component": "radio-item",
            "data-ds-size": size,
            ...rest,
            children: /* @__PURE__ */ jsxRuntime.jsx(
              radixUi.RadioGroup.Indicator,
              {
                className: chunk4ON3M3OM_cjs.cn(radioInnerDotVariants({ size }))
              }
            )
          }
        ),
        (label || description) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-0.5 min-w-0 flex-1", children: [
          label && /* @__PURE__ */ jsxRuntime.jsx(
            "label",
            {
              id: labelId,
              htmlFor: itemId,
              className: chunk4ON3M3OM_cjs.cn(
                "font-medium leading-5 text-foreground",
                "cursor-pointer",
                isDisabled && "cursor-not-allowed",
                labelSizeMap2[size]
              ),
              children: label
            }
          ),
          description && /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              id: descriptionId,
              className: chunk4ON3M3OM_cjs.cn(
                "text-muted-foreground leading-4",
                descriptionSizeMap2[size]
              ),
              children: description
            }
          )
        ] })
      ]
    }
  );
});
RadioGroupItem.displayName = "RadioGroupItem";
var RadioCard = React.forwardRef(function RadioCard2({
  value,
  label,
  description,
  size: sizeProp,
  disabled,
  className,
  children,
  ...rest
}, ref) {
  const { size: groupSize, disabled: groupDisabled } = useRadioGroupContext();
  const size = sizeProp ?? groupSize;
  const isDisabled = disabled ?? groupDisabled;
  const generatedId = React.useId();
  const itemId = rest.id ?? `radio-card-${generatedId}`;
  const labelId = label ? `${itemId}-label` : void 0;
  const descriptionId = description ? `${itemId}-desc` : void 0;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "label",
    {
      htmlFor: itemId,
      className: chunk4ON3M3OM_cjs.cn(
        radioCardVariants({ size }),
        isDisabled && "cursor-not-allowed",
        className
      ),
      "data-ds": "",
      "data-ds-component": "radio-card",
      "data-ds-size": size,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          radixUi.RadioGroup.Item,
          {
            ref,
            id: itemId,
            value,
            disabled: isDisabled,
            "aria-labelledby": labelId,
            "aria-describedby": descriptionId,
            className: chunk4ON3M3OM_cjs.cn(radioIndicatorVariants({ size }), "mt-0.5 shrink-0"),
            "data-ds": "",
            "data-ds-component": "radio-card-item",
            "data-ds-size": size,
            ...rest,
            children: /* @__PURE__ */ jsxRuntime.jsx(
              radixUi.RadioGroup.Indicator,
              {
                className: chunk4ON3M3OM_cjs.cn(radioInnerDotVariants({ size }))
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-0.5 min-w-0 flex-1", children: [
          label && /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              id: labelId,
              className: chunk4ON3M3OM_cjs.cn(
                "font-medium leading-5 text-foreground",
                labelSizeMap2[size]
              ),
              children: label
            }
          ),
          description && /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              id: descriptionId,
              className: chunk4ON3M3OM_cjs.cn(
                "text-muted-foreground leading-4",
                descriptionSizeMap2[size]
              ),
              children: description
            }
          ),
          children
        ] })
      ]
    }
  );
});
RadioCard.displayName = "RadioCard";
function ResizablePanelGroup({
  direction = "horizontal",
  className,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactResizablePanels.Group,
    {
      orientation: direction,
      className: chunk4ON3M3OM_cjs.cn(
        "flex h-full w-full",
        direction === "vertical" && "flex-col",
        className
      ),
      "data-ds": "",
      "data-ds-component": "resizable-panel-group",
      "data-ds-direction": direction,
      ...rest
    }
  );
}
ResizablePanelGroup.displayName = "ResizablePanelGroup";
var ResizablePanel = reactResizablePanels.Panel;
function GripIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "9", cy: "12", r: "1" }),
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "9", cy: "5", r: "1" }),
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "9", cy: "19", r: "1" }),
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "15", cy: "12", r: "1" }),
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "15", cy: "5", r: "1" }),
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "15", cy: "19", r: "1" })
      ]
    }
  );
}
function ResizableHandle({
  withHandle = false,
  className,
  ...rest
}) {
  const shouldReduce = framerMotion.useReducedMotion();
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactResizablePanels.Separator,
    {
      className: chunk4ON3M3OM_cjs.cn(
        "relative flex w-px items-center justify-center bg-border",
        "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
        "[&[aria-orientation=horizontal]]:h-px [&[aria-orientation=horizontal]]:w-full",
        "[&[aria-orientation=horizontal]]:after:left-0 [&[aria-orientation=horizontal]]:after:h-1",
        "[&[aria-orientation=horizontal]]:after:w-full [&[aria-orientation=horizontal]]:after:-translate-y-1/2",
        "[&[aria-orientation=horizontal]]:after:translate-x-0",
        "[&[aria-orientation=horizontal]>div]:rotate-90",
        className
      ),
      "data-ds-component": "resizable-handle",
      ...rest,
      children: withHandle && /* @__PURE__ */ jsxRuntime.jsx(
        framerMotion.motion.div,
        {
          className: chunk4ON3M3OM_cjs.cn(
            "z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-border bg-border"
          ),
          whileHover: shouldReduce ? void 0 : { opacity: 1, scale: 1.15 },
          initial: { opacity: 0.7 },
          "data-ds-animated": "",
          children: /* @__PURE__ */ jsxRuntime.jsx(GripIcon, { className: "size-2.5 text-muted-foreground" })
        }
      )
    }
  );
}
ResizableHandle.displayName = "ResizableHandle";
var scrollbarThumbVariants = classVarianceAuthority.cva(
  [
    // Shape
    "relative rounded-full",
    // Color
    "bg-border",
    // Transition
    "transition-[background-color] duration-fast ease-standard",
    // Hover
    "hover:bg-muted-foreground/50"
  ],
  {
    variants: {
      size: {
        sm: "",
        md: ""
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var scrollbarVariants = classVarianceAuthority.cva(
  [
    // Layout
    "flex touch-none select-none",
    // Transition
    "transition-[background-color,opacity] duration-fast ease-standard",
    // Background
    "bg-transparent",
    // Hover — subtle track background
    "hover:bg-muted/50",
    // Border
    "border-transparent"
  ],
  {
    variants: {
      orientation: {
        vertical: "h-full border-l border-l-transparent p-px",
        horizontal: "flex-col border-t border-t-transparent p-px"
      },
      size: {
        /**
         * Small — thin scrollbar for compact UIs.
         * Track width/height: 6px
         */
        sm: "",
        /**
         * Medium — default scrollbar width.
         * Track width/height: 10px
         */
        md: ""
      }
    },
    compoundVariants: [
      { orientation: "vertical", size: "sm", className: "w-1.5" },
      { orientation: "vertical", size: "md", className: "w-2.5" },
      { orientation: "horizontal", size: "sm", className: "h-1.5" },
      { orientation: "horizontal", size: "md", className: "h-2.5" }
    ],
    defaultVariants: {
      orientation: "vertical",
      size: "md"
    }
  }
);
var ScrollBar = React.forwardRef(function ScrollBar2({ orientation = "vertical", size = "md", className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.ScrollArea.Scrollbar,
    {
      ref,
      orientation,
      className: chunk4ON3M3OM_cjs.cn(scrollbarVariants({ orientation, size }), className),
      "data-ds": "",
      "data-ds-component": "scroll-bar",
      "data-ds-orientation": orientation,
      "data-ds-size": size,
      ...rest,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        radixUi.ScrollArea.Thumb,
        {
          className: chunk4ON3M3OM_cjs.cn(scrollbarThumbVariants({ size }))
        }
      )
    }
  );
});
ScrollBar.displayName = "ScrollBar";
var ScrollArea = React.forwardRef(function ScrollArea2({
  type = "hover",
  scrollbarSize = "md",
  showVertical = true,
  showHorizontal = false,
  viewportClassName,
  className,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.ScrollArea.Root,
    {
      ref,
      type,
      className: chunk4ON3M3OM_cjs.cn("relative overflow-hidden", className),
      "data-ds": "",
      "data-ds-component": "scroll-area",
      ...rest,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          radixUi.ScrollArea.Viewport,
          {
            className: chunk4ON3M3OM_cjs.cn(
              "size-full rounded-[inherit]",
              // Ensure the viewport stretches children to full width
              "[&>div]:!block",
              viewportClassName
            ),
            children
          }
        ),
        showVertical && /* @__PURE__ */ jsxRuntime.jsx(ScrollBar, { orientation: "vertical", size: scrollbarSize }),
        showHorizontal && /* @__PURE__ */ jsxRuntime.jsx(ScrollBar, { orientation: "horizontal", size: scrollbarSize }),
        showVertical && showHorizontal && /* @__PURE__ */ jsxRuntime.jsx(radixUi.ScrollArea.Corner, { className: "bg-muted/50" })
      ]
    }
  );
});
ScrollArea.displayName = "ScrollArea";
var searchInputVariants = classVarianceAuthority.cva(
  [
    "flex w-full items-center gap-2",
    "rounded-md border bg-background",
    "transition-[border-color,box-shadow] duration-fast",
    "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",
    "has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50"
  ],
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-4 text-sm"
      },
      variant: {
        default: "border-input",
        filled: "border-transparent bg-muted"
      }
    },
    defaultVariants: { size: "md", variant: "default" }
  }
);
function SearchIcon3({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m21 21-4.3-4.3" })
      ]
    }
  );
}
function XIcon5({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
function LoaderIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      className: chunk4ON3M3OM_cjs.cn("animate-spin", className),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" })
    }
  );
}
var iconSizeMap8 = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4"
};
function useIsMac() {
  const [isMac, setIsMac] = React.useState(false);
  React.useEffect(() => {
    setIsMac(
      typeof navigator !== "undefined" && /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent)
    );
  }, []);
  return isMac;
}
var SearchInput = React.forwardRef(
  function SearchInput2({
    value: controlledValue,
    defaultValue = "",
    onChange,
    onDebouncedChange,
    debounce: debounceMs = 300,
    size = "md",
    variant = "default",
    shortcut,
    showClear = true,
    loading = false,
    placeholder = "Search...",
    className,
    disabled,
    ...rest
  }, ref) {
    const shouldReduce = framerMotion.useReducedMotion();
    const isMac = useIsMac();
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const debounceTimer = React.useRef(null);
    const inputRef = React.useRef(null);
    React.useImperativeHandle(ref, () => inputRef.current);
    const currentValue = controlledValue !== void 0 ? controlledValue : internalValue;
    const hasValue = currentValue.length > 0;
    const handleChange = React.useCallback(
      (e) => {
        const next = e.target.value;
        if (controlledValue === void 0) setInternalValue(next);
        onChange?.(next);
        if (onDebouncedChange) {
          if (debounceTimer.current) clearTimeout(debounceTimer.current);
          debounceTimer.current = setTimeout(
            () => onDebouncedChange(next),
            debounceMs
          );
        }
      },
      [controlledValue, onChange, onDebouncedChange, debounceMs]
    );
    const handleClear = React.useCallback(() => {
      if (controlledValue === void 0) setInternalValue("");
      onChange?.("");
      onDebouncedChange?.("");
      inputRef.current?.focus();
    }, [controlledValue, onChange, onDebouncedChange]);
    React.useEffect(() => {
      if (!shortcut) return;
      const handler = (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === shortcut.toLowerCase()) {
          e.preventDefault();
          inputRef.current?.focus();
        }
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, [shortcut]);
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        className: chunk4ON3M3OM_cjs.cn(searchInputVariants({ size, variant }), className),
        "data-ds": "",
        "data-ds-component": "search-input",
        "data-ds-size": size,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0 text-muted-foreground pointer-events-none", children: loading ? /* @__PURE__ */ jsxRuntime.jsx(LoaderIcon, { className: iconSizeMap8[size] }) : /* @__PURE__ */ jsxRuntime.jsx(SearchIcon3, { className: iconSizeMap8[size] }) }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "input",
            {
              ref: inputRef,
              type: "search",
              value: currentValue,
              onChange: handleChange,
              placeholder,
              disabled,
              className: chunk4ON3M3OM_cjs.cn(
                "flex-1 h-full bg-transparent outline-none",
                "text-foreground placeholder:text-muted-foreground",
                "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
              ),
              ...rest
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
            /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { initial: false, children: showClear && hasValue && /* @__PURE__ */ jsxRuntime.jsx(
              framerMotion.motion.button,
              {
                type: "button",
                onClick: handleClear,
                disabled,
                "aria-label": "Clear search",
                className: chunk4ON3M3OM_cjs.cn(
                  "inline-flex items-center justify-center rounded-sm",
                  "text-muted-foreground hover:text-foreground transition-colors duration-fast",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                ),
                variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.fadeInFast.variants,
                initial: shouldReduce ? { opacity: 0 } : "initial",
                animate: shouldReduce ? { opacity: 1 } : "animate",
                exit: shouldReduce ? { opacity: 0 } : "exit",
                transition: shouldReduce ? { duration: 0.1 } : chunkF4JJFWWU_cjs.fadeInFast.transition,
                "data-ds-animated": "",
                children: /* @__PURE__ */ jsxRuntime.jsx(XIcon5, { className: iconSizeMap8[size] })
              },
              "clear"
            ) }),
            shortcut && !hasValue && /* @__PURE__ */ jsxRuntime.jsxs(
              "kbd",
              {
                className: chunk4ON3M3OM_cjs.cn(
                  "hidden sm:inline-flex items-center gap-0.5",
                  "rounded-md border border-border",
                  "bg-muted/80 text-muted-foreground",
                  "font-sans font-medium tracking-wide",
                  "shadow-[0_1px_0_1px_rgba(0,0,0,0.15)] dark:shadow-[0_1px_0_1px_rgba(255,255,255,0.06)]",
                  "pointer-events-none select-none",
                  size === "sm" ? "h-5 min-w-5 px-1 text-[10px]" : "h-6 min-w-6 px-1.5 text-[11px]"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("span", { className: "opacity-70", children: isMac ? "\u2318" : "Ctrl" }),
                  /* @__PURE__ */ jsxRuntime.jsx("span", { children: shortcut.toUpperCase() })
                ]
              }
            )
          ] })
        ]
      }
    );
  }
);
SearchInput.displayName = "SearchInput";
var selectTriggerVariants = classVarianceAuthority.cva(
  [
    "inline-flex items-center justify-between w-full",
    "text-sm leading-5",
    "rounded-md",
    "border",
    "bg-background text-input-foreground",
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    chunk3EHT6IOA_cjs.focusRingClasses,
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled-foreground",
    "data-[placeholder]:text-input-placeholder",
    "cursor-pointer"
  ],
  {
    variants: {
      variant: {
        default: [
          "border-input",
          "hover:border-border-strong",
          "focus-visible:border-border-strong"
        ],
        error: [
          "border-danger",
          "text-foreground",
          "focus-visible:border-danger"
        ],
        success: [
          "border-success",
          "text-foreground",
          "focus-visible:border-success"
        ]
      },
      size: {
        sm: "h-8 px-2.5 text-xs gap-1.5",
        md: "h-9 px-3 text-sm gap-2",
        lg: "h-10 px-3.5 text-sm gap-2"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
function ChevronDownIcon4({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 9 6 6 6-6" })
    }
  );
}
function ChevronUpIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m18 15-6-6-6 6" })
    }
  );
}
function CheckIconInternal({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M20 6 9 17l-5-5" })
    }
  );
}
var iconSizeMap9 = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4"
};
var Select = radixUi.Select.Root;
var SelectTrigger = React.forwardRef(function SelectTrigger2({ className, children, variant = "default", size = "md", ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.Select.Trigger,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(selectTriggerVariants({ variant, size }), className),
      "data-ds": "",
      "data-ds-component": "select-trigger",
      "data-ds-variant": variant,
      "data-ds-size": size,
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntime.jsx(radixUi.Select.Icon, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(
          ChevronDownIcon4,
          {
            className: chunk4ON3M3OM_cjs.cn(iconSizeMap9[size], "shrink-0 text-muted-foreground")
          }
        ) })
      ]
    }
  );
});
SelectTrigger.displayName = radixUi.Select.Trigger.displayName;
var SelectValue = radixUi.Select.Value;
var SelectContent = React.forwardRef(function SelectContent2({ className, children, position = "popper", sideOffset = 4, ...props }, ref) {
  const shouldReduce = framerMotion.useReducedMotion();
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Select.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Select.Content,
    {
      ref,
      position,
      sideOffset,
      asChild: true,
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsxs(
        framerMotion.motion.div,
        {
          className: chunk4ON3M3OM_cjs.cn(
            "relative z-[var(--z-popover)]",
            "min-w-[var(--radix-select-trigger-width)]",
            "max-h-[min(var(--radix-select-content-available-height),320px)]",
            "overflow-hidden",
            "rounded-md",
            "border border-border",
            "bg-background",
            "shadow-lg",
            className
          ),
          variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.scaleIn.variants,
          initial: shouldReduce ? { opacity: 0 } : "initial",
          animate: shouldReduce ? { opacity: 1 } : "animate",
          exit: shouldReduce ? { opacity: 0 } : "exit",
          transition: shouldReduce ? { duration: 0.15 } : chunkF4JJFWWU_cjs.scaleIn.transition,
          "data-ds-animated": "",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(SelectScrollUpButton, {}),
            /* @__PURE__ */ jsxRuntime.jsx(
              radixUi.Select.Viewport,
              {
                className: chunk4ON3M3OM_cjs.cn(
                  "p-1",
                  position === "popper" && "w-full min-w-[var(--radix-select-trigger-width)]"
                ),
                children
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(SelectScrollDownButton, {})
          ]
        }
      )
    }
  ) });
});
SelectContent.displayName = radixUi.Select.Content.displayName;
var SelectScrollUpButton = React.forwardRef(function SelectScrollUpButton2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Select.ScrollUpButton,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "flex items-center justify-center py-1",
        "cursor-default text-muted-foreground",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(ChevronUpIcon, { className: "size-4" })
    }
  );
});
SelectScrollUpButton.displayName = radixUi.Select.ScrollUpButton.displayName;
var SelectScrollDownButton = React.forwardRef(function SelectScrollDownButton2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Select.ScrollDownButton,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "flex items-center justify-center py-1",
        "cursor-default text-muted-foreground",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(ChevronDownIcon4, { className: "size-4" })
    }
  );
});
SelectScrollDownButton.displayName = radixUi.Select.ScrollDownButton.displayName;
var SelectItem = React.forwardRef(function SelectItem2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.Select.Item,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "relative flex w-full cursor-pointer select-none items-center",
        "rounded-sm py-1.5 pl-8 pr-2",
        "text-sm leading-5 text-foreground",
        "outline-none",
        "focus:bg-muted focus:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      ),
      "data-ds": "",
      "data-ds-component": "select-item",
      ...rest,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute left-2 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(radixUi.Select.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(CheckIconInternal, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(radixUi.Select.ItemText, { children })
      ]
    }
  );
});
SelectItem.displayName = "SelectItem";
var SelectGroup = React.forwardRef(function SelectGroup2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Select.Group, { ref, className: chunk4ON3M3OM_cjs.cn("", className), ...rest, children });
});
SelectGroup.displayName = "SelectGroup";
var SelectLabel = React.forwardRef(function SelectLabel2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Select.Label,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "py-1.5 pl-8 pr-2 text-xs font-semibold text-muted-foreground",
        className
      ),
      ...rest,
      children
    }
  );
});
SelectLabel.displayName = "SelectLabel";
var SelectSeparator = React.forwardRef(function SelectSeparator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Select.Separator,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn("-mx-1 my-1 h-px bg-border", className),
      ...rest
    }
  );
});
SelectSeparator.displayName = "SelectSeparator";
var separatorVariants = classVarianceAuthority.cva(
  // Base styles — shared across all variants
  "shrink-0 bg-border",
  {
    variants: {
      /**
       * Visual variant of the separator line.
       */
      variant: {
        /**
         * Default — solid line using the border token color.
         */
        default: "",
        /**
         * Muted — lighter separator using the muted-foreground color at
         * reduced opacity. Useful for less prominent divisions.
         */
        muted: "bg-muted-foreground/20",
        /**
         * Dashed — renders a dashed border instead of a solid background.
         * Uses border-style rather than background.
         */
        dashed: "bg-transparent !h-auto !w-auto",
        /**
         * Gradient — fades in from transparent at both ends.
         * Creates a more elegant, subtle divider.
         */
        gradient: "bg-transparent"
      },
      /**
       * Orientation of the separator.
       */
      orientation: {
        horizontal: "h-px w-full",
        vertical: "h-full w-px"
      }
    },
    compoundVariants: [
      // Dashed + horizontal
      {
        variant: "dashed",
        orientation: "horizontal",
        class: "border-b border-dashed border-border w-full"
      },
      // Dashed + vertical
      {
        variant: "dashed",
        orientation: "vertical",
        class: "border-l border-dashed border-border h-full"
      }
    ],
    defaultVariants: {
      variant: "default",
      orientation: "horizontal"
    }
  }
);
var spacingYMap = {
  0: "my-0",
  1: "my-1",
  2: "my-2",
  3: "my-3",
  4: "my-4",
  5: "my-5",
  6: "my-6",
  8: "my-8",
  10: "my-10",
  12: "my-12"
};
var spacingXMap = {
  0: "mx-0",
  1: "mx-1",
  2: "mx-2",
  3: "mx-3",
  4: "mx-4",
  5: "mx-5",
  6: "mx-6",
  8: "mx-8",
  10: "mx-10",
  12: "mx-12"
};
var gradientHorizontal = "bg-gradient-to-r from-transparent via-border to-transparent";
var gradientVertical = "bg-gradient-to-b from-transparent via-border to-transparent";
var Separator2 = React.forwardRef(function Separator3({
  variant = "default",
  orientation = "horizontal",
  decorative = true,
  spacing = 4,
  label,
  className,
  ...rest
}, ref) {
  const isVertical = orientation === "vertical";
  const spacingClass = isVertical ? spacingXMap[spacing] ?? "mx-4" : spacingYMap[spacing] ?? "my-4";
  const gradientClass = variant === "gradient" ? isVertical ? gradientVertical : gradientHorizontal : void 0;
  if (label && !isVertical) {
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        className: chunk4ON3M3OM_cjs.cn(
          "flex items-center w-full",
          spacingClass,
          className
        ),
        role: decorative ? "none" : "separator",
        "aria-orientation": decorative ? void 0 : orientation,
        "data-ds": "",
        "data-ds-component": "separator",
        "data-ds-variant": variant,
        "data-ds-orientation": orientation,
        "data-ds-labeled": "",
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            radixUi.Separator.Root,
            {
              decorative: true,
              orientation,
              className: chunk4ON3M3OM_cjs.cn(
                separatorVariants({ variant, orientation }),
                gradientClass,
                "flex-1"
              )
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "px-3 text-xs text-muted-foreground font-medium select-none shrink-0", children: label }),
          /* @__PURE__ */ jsxRuntime.jsx(
            radixUi.Separator.Root,
            {
              decorative: true,
              orientation,
              className: chunk4ON3M3OM_cjs.cn(
                separatorVariants({ variant, orientation }),
                gradientClass,
                "flex-1"
              )
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Separator.Root,
    {
      ref,
      decorative,
      orientation,
      className: chunk4ON3M3OM_cjs.cn(
        separatorVariants({ variant, orientation }),
        gradientClass,
        spacingClass,
        className
      ),
      "data-ds": "",
      "data-ds-component": "separator",
      "data-ds-variant": variant,
      "data-ds-orientation": orientation,
      ...rest
    }
  );
});
Separator2.displayName = "Separator";
var sheetContentVariants = classVarianceAuthority.cva(
  [
    // Layout
    "fixed flex flex-col",
    // Z-index — same as dialog/modal
    "z-[var(--z-modal)]",
    // Visual
    "bg-background",
    "border-border",
    "shadow-xl",
    // Focus
    "outline-none"
    // Note: Animation is handled by Framer Motion (overlayBackdrop + slidePanel presets).
    // CSS animation classes removed in favour of FM spring physics.
  ],
  {
    variants: {
      side: {
        /**
         * Left — slides in from the left edge.
         */
        left: [
          "inset-y-0 left-0",
          "border-r"
        ],
        /**
         * Right — slides in from the right edge (most common).
         */
        right: [
          "inset-y-0 right-0",
          "border-l"
        ],
        /**
         * Top — slides in from the top edge.
         */
        top: [
          "inset-x-0 top-0",
          "border-b"
        ],
        /**
         * Bottom — slides in from the bottom edge.
         */
        bottom: [
          "inset-x-0 bottom-0",
          "border-t"
        ]
      },
      size: {
        /**
         * Small — compact panel (320px).
         * Good for navigation menus, simple forms.
         */
        sm: "",
        /**
         * Medium — default size (420px).
         * Good for settings panels, detail views.
         */
        md: "",
        /**
         * Large — wide panel (560px).
         * Good for complex forms, preview panels.
         */
        lg: ""
      }
    },
    compoundVariants: [
      // Horizontal sheets (left/right) — width-based sizing
      {
        side: "left",
        size: "sm",
        className: "w-[320px] max-w-[calc(100vw-2rem)]"
      },
      {
        side: "left",
        size: "md",
        className: "w-[420px] max-w-[calc(100vw-2rem)]"
      },
      {
        side: "left",
        size: "lg",
        className: "w-[560px] max-w-[calc(100vw-2rem)]"
      },
      {
        side: "right",
        size: "sm",
        className: "w-[320px] max-w-[calc(100vw-2rem)]"
      },
      {
        side: "right",
        size: "md",
        className: "w-[420px] max-w-[calc(100vw-2rem)]"
      },
      {
        side: "right",
        size: "lg",
        className: "w-[560px] max-w-[calc(100vw-2rem)]"
      },
      // Vertical sheets (top/bottom) — height-based sizing
      {
        side: "top",
        size: "sm",
        className: "h-[320px] max-h-[calc(100vh-2rem)]"
      },
      {
        side: "top",
        size: "md",
        className: "h-[420px] max-h-[calc(100vh-2rem)]"
      },
      {
        side: "top",
        size: "lg",
        className: "h-[560px] max-h-[calc(100vh-2rem)]"
      },
      {
        side: "bottom",
        size: "sm",
        className: "h-[320px] max-h-[calc(100vh-2rem)]"
      },
      {
        side: "bottom",
        size: "md",
        className: "h-[420px] max-h-[calc(100vh-2rem)]"
      },
      {
        side: "bottom",
        size: "lg",
        className: "h-[560px] max-h-[calc(100vh-2rem)]"
      }
    ],
    defaultVariants: {
      side: "right",
      size: "md"
    }
  }
);
var SheetContext = React.createContext({ open: false });
function useSheetContext() {
  return React.useContext(SheetContext);
}
function CloseIcon4({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
function Sheet({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  ...rest
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const handleOpenChange = React.useCallback(
    (next) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(SheetContext.Provider, { value: { open }, children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Dialog.Root,
    {
      open,
      onOpenChange: handleOpenChange,
      ...rest,
      children
    }
  ) });
}
Sheet.displayName = "Sheet";
var SheetTrigger = React.forwardRef(function SheetTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Dialog.Trigger,
    {
      ref,
      className,
      "data-ds": "",
      "data-ds-component": "sheet-trigger",
      ...rest
    }
  );
});
SheetTrigger.displayName = "SheetTrigger";
var SheetOverlay = React.forwardRef(function SheetOverlay2({ className, ...rest }, ref) {
  const shouldReduce = framerMotion.useReducedMotion();
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Dialog.Overlay, { ref, forceMount: true, asChild: true, ...rest, children: /* @__PURE__ */ jsxRuntime.jsx(
    framerMotion.motion.div,
    {
      className: chunk4ON3M3OM_cjs.cn(
        "fixed inset-0",
        "z-[var(--z-overlay)]",
        "bg-black/50",
        className
      ),
      variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.overlayBackdrop.variants,
      initial: shouldReduce ? { opacity: 0 } : "initial",
      animate: shouldReduce ? { opacity: 1 } : "animate",
      exit: shouldReduce ? { opacity: 0 } : "exit",
      transition: shouldReduce ? { duration: 0.15 } : chunkF4JJFWWU_cjs.overlayBackdrop.transition,
      "data-ds-animated": ""
    }
  ) });
});
SheetOverlay.displayName = "SheetOverlay";
var sidePresetMap = {
  left: chunkF4JJFWWU_cjs.slidePanelLeft,
  right: chunkF4JJFWWU_cjs.slidePanelRight,
  top: chunkF4JJFWWU_cjs.slidePanelTop,
  bottom: chunkF4JJFWWU_cjs.slidePanelBottom
};
var SheetContent = React.forwardRef(function SheetContent2({
  side = "right",
  size = "md",
  showClose = true,
  overlayClassName,
  className,
  children,
  ...rest
}, ref) {
  const shouldReduce = framerMotion.useReducedMotion();
  const { open } = useSheetContext();
  const preset = sidePresetMap[side];
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Dialog.Portal, { forceMount: true, children: /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(SheetOverlay, { className: overlayClassName }),
    /* @__PURE__ */ jsxRuntime.jsx(radixUi.Dialog.Content, { ref, forceMount: true, asChild: true, ...rest, children: /* @__PURE__ */ jsxRuntime.jsxs(
      framerMotion.motion.div,
      {
        className: chunk4ON3M3OM_cjs.cn(
          "not-prose",
          sheetContentVariants({ side, size }),
          className
        ),
        variants: shouldReduce ? void 0 : preset.variants,
        initial: shouldReduce ? { opacity: 0 } : "initial",
        animate: shouldReduce ? { opacity: 1 } : "animate",
        exit: shouldReduce ? { opacity: 0 } : "exit",
        transition: shouldReduce ? { duration: 0.2 } : preset.transition,
        "data-ds": "",
        "data-ds-component": "sheet",
        "data-ds-side": side,
        "data-ds-size": size,
        "data-ds-animated": "",
        children: [
          children,
          showClose && /* @__PURE__ */ jsxRuntime.jsx(
            radixUi.Dialog.Close,
            {
              className: chunk4ON3M3OM_cjs.cn(
                "absolute right-4 top-4",
                "inline-flex items-center justify-center",
                "rounded-sm p-1",
                "text-muted-foreground hover:text-foreground",
                "transition-colors duration-fast",
                chunk3EHT6IOA_cjs.focusRingClasses
              ),
              "aria-label": "Close",
              children: /* @__PURE__ */ jsxRuntime.jsx(CloseIcon4, { className: "size-4" })
            }
          )
        ]
      }
    ) })
  ] }) }) });
});
SheetContent.displayName = "SheetContent";
function SheetHeader({ className, children }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: chunk4ON3M3OM_cjs.cn(
        "flex flex-col gap-1.5 px-6 py-4",
        "border-b border-border",
        className
      ),
      "data-ds": "",
      "data-ds-component": "sheet-header",
      children
    }
  );
}
SheetHeader.displayName = "SheetHeader";
function SheetFooter({ className, children }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: chunk4ON3M3OM_cjs.cn(
        "flex items-center justify-end gap-2 px-6 py-4",
        "border-t border-border",
        "mt-auto",
        className
      ),
      "data-ds": "",
      "data-ds-component": "sheet-footer",
      children
    }
  );
}
SheetFooter.displayName = "SheetFooter";
var SheetTitle = React.forwardRef(function SheetTitle2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Dialog.Title,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "text-lg font-semibold leading-6 text-foreground",
        className
      ),
      "data-ds": "",
      "data-ds-component": "sheet-title",
      ...rest,
      children
    }
  );
});
SheetTitle.displayName = "SheetTitle";
var SheetDescription = React.forwardRef(function SheetDescription2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Dialog.Description,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn("text-sm leading-5 text-muted-foreground", className),
      "data-ds": "",
      "data-ds-component": "sheet-description",
      ...rest,
      children
    }
  );
});
SheetDescription.displayName = "SheetDescription";
var SheetClose = React.forwardRef(function SheetClose2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Dialog.Close,
    {
      ref,
      className,
      "data-ds": "",
      "data-ds-component": "sheet-close",
      ...rest
    }
  );
});
SheetClose.displayName = "SheetClose";
var drawerContentVariants = classVarianceAuthority.cva(
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    vaul.Drawer.Root,
    {
      shouldScaleBackground,
      ...rest,
      children
    }
  );
}
Drawer.displayName = "Drawer";
var DrawerTrigger = React.forwardRef(function DrawerTrigger2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    vaul.Drawer.Trigger,
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
var DrawerOverlay = React.forwardRef(function DrawerOverlay2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    vaul.Drawer.Overlay,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: chunk4ON3M3OM_cjs.cn("mx-auto mt-4 mb-2 flex justify-center", className),
      "data-ds": "",
      "data-ds-component": "drawer-handle",
      ...rest,
      children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-1.5 w-12 rounded-full bg-muted-foreground/25" })
    }
  );
}
DrawerHandle.displayName = "DrawerHandle";
var DrawerContent = React.forwardRef(function DrawerContent2({
  size = "md",
  showHandle = true,
  overlayClassName,
  className,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(vaul.Drawer.Portal, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(DrawerOverlay, { className: overlayClassName }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      vaul.Drawer.Content,
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn("not-prose", drawerContentVariants({ size }), className),
        "data-ds": "",
        "data-ds-component": "drawer",
        "data-ds-size": size,
        ...rest,
        children: [
          showHandle && /* @__PURE__ */ jsxRuntime.jsx(DrawerHandle, {}),
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: chunk4ON3M3OM_cjs.cn("flex flex-col gap-1.5 px-6 pt-4 pb-2", className),
      "data-ds": "",
      "data-ds-component": "drawer-header",
      ...rest,
      children
    }
  );
}
DrawerHeader.displayName = "DrawerHeader";
function DrawerBody({ className, children, ...rest }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: chunk4ON3M3OM_cjs.cn("flex-1 overflow-y-auto px-6 py-4", className),
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: chunk4ON3M3OM_cjs.cn(
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
var DrawerTitle = React.forwardRef(function DrawerTitle2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    vaul.Drawer.Title,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
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
var DrawerDescription = React.forwardRef(function DrawerDescription2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    vaul.Drawer.Description,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn("text-sm leading-5 text-muted-foreground", className),
      "data-ds": "",
      "data-ds-component": "drawer-description",
      ...rest,
      children
    }
  );
});
DrawerDescription.displayName = "DrawerDescription";
var DrawerClose = React.forwardRef(function DrawerClose2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    vaul.Drawer.Close,
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
var SIDEBAR_COOKIE_NAME = "sidebar:state";
var SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
function PanelLeftIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M9 3v18" })
      ]
    }
  );
}
var SidebarContext = React.createContext({
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
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a <SidebarProvider>");
  }
  return context;
}
var useSidebarContext = useSidebar;
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}
var SidebarProvider = React.forwardRef(
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
    const [openMobile, setOpenMobile] = React.useState(false);
    const isControlled = openProp !== void 0;
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = isControlled ? openProp : _open;
    const setOpen = React.useCallback(
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
    const toggleSidebar = React.useCallback(() => {
      if (isMobile) {
        setOpenMobile((prev) => !prev);
      } else {
        setOpen((prev) => !prev);
      }
    }, [isMobile, setOpen]);
    React.useEffect(() => {
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
    const contextValue = React.useMemo(
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
        setOpenMobile,
        isMobile,
        toggleSidebar,
        variant,
        collapsible,
        side
      ]
    );
    return /* @__PURE__ */ jsxRuntime.jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxRuntime.jsx(radixUi.Tooltip.Provider, { delayDuration: 0, children: /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(
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
var Sidebar = React.forwardRef(
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
    const shouldReduce = framerMotion.useReducedMotion();
    if (collapsible === "none") {
      return /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          ref,
          className: chunk4ON3M3OM_cjs.cn(
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
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      ctx.isMobile && /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { children: ctx.openMobile && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          framerMotion.motion.div,
          {
            className: "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
            variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.overlayBackdrop.variants,
            initial: shouldReduce ? { opacity: 0 } : "initial",
            animate: shouldReduce ? { opacity: 1 } : "animate",
            exit: shouldReduce ? { opacity: 0 } : "exit",
            transition: shouldReduce ? { duration: 0.15 } : chunkF4JJFWWU_cjs.overlayBackdrop.transition,
            onClick: () => ctx.setOpenMobile(false),
            "data-ds-animated": ""
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          framerMotion.motion.div,
          {
            className: chunk4ON3M3OM_cjs.cn(
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
      !ctx.isMobile && /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          ref,
          className: "group peer hidden md:block text-sidebar-foreground",
          "data-state": ctx.state,
          "data-collapsible": ctx.state === "collapsed" ? collapsible : "",
          "data-variant": variant,
          "data-side": side,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              framerMotion.motion.div,
              {
                className: chunk4ON3M3OM_cjs.cn(
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
            /* @__PURE__ */ jsxRuntime.jsx(
              framerMotion.motion.div,
              {
                className: chunk4ON3M3OM_cjs.cn(
                  "fixed inset-y-0 z-10 hidden h-svh md:flex flex-col",
                  side === "left" ? "left-0" : "right-0",
                  // Variant styles
                  variant === "floating" && "m-2 rounded-lg border border-sidebar-border shadow-lg overflow-hidden",
                  variant === "inset" && "m-2 rounded-lg overflow-hidden",
                  variant === "default" && chunk4ON3M3OM_cjs.cn(
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
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  "div",
                  {
                    className: chunk4ON3M3OM_cjs.cn(
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
var SidebarTrigger = React.forwardRef(function SidebarTrigger2({ className, onClick, children, ...rest }, ref) {
  const { toggleSidebar, state, isMobile } = useSidebar();
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
      className: chunk4ON3M3OM_cjs.cn(
        "inline-flex items-center justify-center size-8 shrink-0 rounded-md",
        "text-muted-foreground hover:text-foreground hover:bg-accent",
        "transition-colors duration-fast",
        chunk3EHT6IOA_cjs.focusRingClasses,
        className
      ),
      "data-ds": "",
      "data-ds-component": "sidebar-trigger",
      ...rest,
      children: [
        children ?? /* @__PURE__ */ jsxRuntime.jsx(PanelLeftIcon, { className: "size-4" }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
SidebarTrigger.displayName = "SidebarTrigger";
var SidebarToggle = SidebarTrigger;
var SidebarRail = React.forwardRef(
  function SidebarRail2({ className, ...rest }, ref) {
    const { toggleSidebar, side } = useSidebar();
    return /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        ref,
        type: "button",
        tabIndex: -1,
        "aria-label": "Toggle Sidebar",
        onClick: toggleSidebar,
        title: "Toggle Sidebar",
        className: chunk4ON3M3OM_cjs.cn(
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
var SidebarInset = React.forwardRef(
  function SidebarInset2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "main",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(
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
var SidebarHeader = React.forwardRef(
  function SidebarHeader2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(
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
var SidebarContent = React.forwardRef(
  function SidebarContent2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(
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
var SidebarFooter = React.forwardRef(
  function SidebarFooter2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(
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
var SidebarSeparator = React.forwardRef(function SidebarSeparator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "hr",
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn("mx-2 w-auto border-sidebar-border", className),
      "data-ds": "",
      "data-ds-component": "sidebar-separator",
      "data-sidebar": "separator",
      ...rest
    }
  );
});
SidebarSeparator.displayName = "SidebarSeparator";
var SidebarInput = React.forwardRef(
  function SidebarInput2({ className, ...rest }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "input",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(
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
var SidebarGroup = React.forwardRef(
  function SidebarGroup2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(
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
var SidebarGroupLabel = React.forwardRef(function SidebarGroupLabel2({ className, asChild = false, children, ...rest }, ref) {
  const { state } = useSidebar();
  const classes = chunk4ON3M3OM_cjs.cn(
    "flex h-8 shrink-0 items-center rounded-md px-2",
    "text-xs font-medium text-sidebar-foreground/70",
    "outline-none ring-sidebar-ring",
    "transition-[margin,opacity,padding] duration-200 ease-linear",
    // When collapsed to icon mode, hide label
    state === "collapsed" && "opacity-0 overflow-hidden h-0 p-0 m-0",
    className
  );
  if (asChild) {
    return /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx(
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
var SidebarGroupAction = React.forwardRef(function SidebarGroupAction2({ className, children, ...rest }, ref) {
  const { state } = useSidebar();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ref,
      type: "button",
      className: chunk4ON3M3OM_cjs.cn(
        "absolute right-3 top-3.5 flex items-center justify-center",
        "size-5 rounded-md p-0",
        "text-sidebar-foreground/70 ring-sidebar-ring",
        "outline-none",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        "transition-transform duration-200",
        chunk3EHT6IOA_cjs.focusRingClasses,
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
var SidebarGroupContent = React.forwardRef(function SidebarGroupContent2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn("w-full text-sm", className),
      "data-ds": "",
      "data-ds-component": "sidebar-group-content",
      "data-sidebar": "group-content",
      ...rest,
      children
    }
  );
});
SidebarGroupContent.displayName = "SidebarGroupContent";
var SidebarMenu = React.forwardRef(
  function SidebarMenu2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "ul",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(
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
var SidebarMenuItem = React.forwardRef(function SidebarMenuItem2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "li",
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn("group/menu-item relative list-none m-0 p-0", className),
      "data-ds": "",
      "data-ds-component": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      ...rest,
      children
    }
  );
});
SidebarMenuItem.displayName = "SidebarMenuItem";
var SidebarMenuButton = React.forwardRef(function SidebarMenuButton2({
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
  const sizeClasses3 = {
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
  const buttonClasses = chunk4ON3M3OM_cjs.cn(
    // Base
    "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2",
    "outline-none ring-sidebar-ring",
    "transition-[width,height,padding] duration-200 ease-linear",
    chunk3EHT6IOA_cjs.focusRingClasses,
    // Active & hover states
    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
    "active:bg-sidebar-accent active:text-sidebar-accent-foreground",
    // Size
    sizeClasses3[size],
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
  const button = asChild ? /* @__PURE__ */ jsxRuntime.jsx(
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
  ) : /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsxs(radixUi.Tooltip.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(radixUi.Tooltip.Trigger, { asChild: true, children: button }),
    /* @__PURE__ */ jsxRuntime.jsx(radixUi.Tooltip.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
      radixUi.Tooltip.Content,
      {
        side: "right",
        align: "center",
        sideOffset: 4,
        className: chunk4ON3M3OM_cjs.cn(
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
var SidebarMenuAction = React.forwardRef(function SidebarMenuAction2({ showOnHover = false, className, children, ...rest }, ref) {
  const { state } = useSidebar();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ref,
      type: "button",
      className: chunk4ON3M3OM_cjs.cn(
        "absolute right-1 top-1.5 flex items-center justify-center",
        "size-5 rounded-md p-0",
        "text-sidebar-foreground/70 outline-none ring-sidebar-ring",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        "transition-opacity duration-fast",
        chunk3EHT6IOA_cjs.focusRingClasses,
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
var SidebarMenuBadge = React.forwardRef(function SidebarMenuBadge2({ className, children, ...rest }, ref) {
  const { state } = useSidebar();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
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
var SidebarMenuSkeleton = React.forwardRef(function SidebarMenuSkeleton2({ className, showIcon = false, ...rest }, ref) {
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "flex h-8 items-center gap-2 rounded-md px-2",
        className
      ),
      "data-ds": "",
      "data-ds-component": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      ...rest,
      children: [
        showIcon && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "size-4 rounded-md bg-sidebar-accent animate-pulse" }),
        /* @__PURE__ */ jsxRuntime.jsx(
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
var SidebarMenuSub = React.forwardRef(function SidebarMenuSub2({ className, children, ...rest }, ref) {
  const { state } = useSidebar();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "ul",
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
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
});
SidebarMenuSub.displayName = "SidebarMenuSub";
var SidebarMenuSubItem = React.forwardRef(function SidebarMenuSubItem2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "li",
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn("list-none m-0 p-0", className),
      "data-ds": "",
      "data-ds-component": "sidebar-menu-sub-item",
      "data-sidebar": "menu-sub-item",
      ...rest,
      children
    }
  );
});
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
var SidebarMenuSubButton = React.forwardRef(function SidebarMenuSubButton2({ isActive = false, size = "md", className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "a",
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "flex min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 no-underline",
        "text-sidebar-foreground/70 outline-none ring-sidebar-ring",
        "transition-colors duration-fast",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:no-underline",
        chunk3EHT6IOA_cjs.focusRingClasses,
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
var SidebarSection = SidebarGroup;
var SidebarItem = React.forwardRef(
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
    const Tag3 = href ? "a" : "button";
    return /* @__PURE__ */ jsxRuntime.jsxs(
      Tag3,
      {
        ref,
        href,
        type: href ? void 0 : "button",
        disabled,
        "aria-current": active ? "page" : void 0,
        className: chunk4ON3M3OM_cjs.cn(
          "flex items-center gap-3 px-2 py-2 rounded-md w-full",
          "text-sm font-medium leading-none",
          "transition-colors duration-fast",
          "disabled:pointer-events-none disabled:opacity-50",
          chunk3EHT6IOA_cjs.focusRingClasses,
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
          icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0 size-5 flex items-center justify-center", children: icon }),
          /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { children: !isCollapsed && (label || children) && /* @__PURE__ */ jsxRuntime.jsx(
            framerMotion.motion.span,
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
          badge && !isCollapsed && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0", children: badge })
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
var skeletonVariants = classVarianceAuthority.cva(
  // Base styles — shared across all shapes
  [
    // Background
    "bg-muted",
    // Animation — gentle pulse
    "animate-pulse",
    // Ensure it doesn't collapse
    "shrink-0"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Shape Variants
      // -----------------------------------------------------------------
      shape: {
        /**
         * Text — a horizontal line placeholder for text content.
         * Default height matches body text line-height.
         * Rounded for a softer appearance.
         */
        text: "h-4 w-full rounded-sm",
        /**
         * Circle — a circular placeholder for avatars, icons.
         * Uses border-radius: 9999px (full circle).
         */
        circle: "rounded-full aspect-square",
        /**
         * Rect — a rectangular placeholder for images, cards, media.
         * Uses standard border-radius.
         */
        rect: "rounded-md"
      }
    },
    defaultVariants: {
      shape: "text"
    }
  }
);
var circleSizeMap = {
  xs: "size-6",
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
  xl: "size-16"
};
var textHeightMap = {
  xs: "h-3",
  sm: "h-3.5",
  md: "h-4",
  lg: "h-5"
};
function resolveDimension(value) {
  if (value === void 0) return void 0;
  if (typeof value === "number") return `${value}px`;
  return value;
}
var Skeleton = React.forwardRef(
  function Skeleton2({
    shape = "text",
    width,
    height,
    size = "md",
    textSize = "md",
    animate: animate2 = true,
    className,
    style,
    ...rest
  }, ref) {
    const dimensionStyles = {
      ...style,
      width: resolveDimension(width),
      height: resolveDimension(height)
    };
    if (dimensionStyles.width === void 0) delete dimensionStyles.width;
    if (dimensionStyles.height === void 0) delete dimensionStyles.height;
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        role: "presentation",
        "aria-hidden": "true",
        className: chunk4ON3M3OM_cjs.cn(
          skeletonVariants({ shape }),
          // Circle: apply size class
          shape === "circle" && !width && !height && circleSizeMap[size],
          // Text: apply text height class (unless custom height provided)
          shape === "text" && !height && textHeightMap[textSize],
          // Disable animation
          !animate2 && "animate-none",
          className
        ),
        style: Object.keys(dimensionStyles).length > 0 ? dimensionStyles : void 0,
        "data-ds": "",
        "data-ds-component": "skeleton",
        "data-ds-shape": shape,
        ...rest
      }
    );
  }
);
Skeleton.displayName = "Skeleton";
var SkeletonText = React.forwardRef(
  function SkeletonText2({
    lines = 3,
    textSize = "md",
    lastLineWidth = "60%",
    gap = "gap-2.5",
    animate: animate2 = true,
    className,
    ...rest
  }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        role: "presentation",
        "aria-hidden": "true",
        className: chunk4ON3M3OM_cjs.cn("flex flex-col w-full", gap, className),
        "data-ds": "",
        "data-ds-component": "skeleton-text",
        ...rest,
        children: Array.from({ length: lines }, (_, i) => /* @__PURE__ */ jsxRuntime.jsx(
          Skeleton,
          {
            shape: "text",
            textSize,
            width: i === lines - 1 && lines > 1 ? lastLineWidth : void 0,
            animate: animate2
          },
          i
        ))
      }
    );
  }
);
SkeletonText.displayName = "SkeletonText";
var SkeletonCircle = React.forwardRef(
  function SkeletonCircle2({ size = "md", animate: animate2 = true, className, ...rest }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      Skeleton,
      {
        ref,
        shape: "circle",
        size,
        animate: animate2,
        className,
        ...rest
      }
    );
  }
);
SkeletonCircle.displayName = "SkeletonCircle";
var SkeletonRect = React.forwardRef(
  function SkeletonRect2({ width = "100%", height = 120, animate: animate2 = true, className, ...rest }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      Skeleton,
      {
        ref,
        shape: "rect",
        width,
        height,
        animate: animate2,
        className,
        ...rest
      }
    );
  }
);
SkeletonRect.displayName = "SkeletonRect";
var sliderTrackVariants = classVarianceAuthority.cva(
  [
    "relative flex touch-none select-none",
    "rounded-full",
    "bg-muted",
    "overflow-hidden"
  ],
  {
    variants: {
      orientation: {
        horizontal: "w-full items-center",
        vertical: "h-full flex-col justify-center"
      },
      size: {
        sm: "",
        md: "",
        lg: ""
      }
    },
    compoundVariants: [
      { orientation: "horizontal", size: "sm", className: "h-1" },
      { orientation: "horizontal", size: "md", className: "h-1.5" },
      { orientation: "horizontal", size: "lg", className: "h-2" },
      { orientation: "vertical", size: "sm", className: "w-1" },
      { orientation: "vertical", size: "md", className: "w-1.5" },
      { orientation: "vertical", size: "lg", className: "w-2" }
    ],
    defaultVariants: {
      orientation: "horizontal",
      size: "md"
    }
  }
);
var sliderRangeVariants = classVarianceAuthority.cva(["absolute rounded-full"], {
  variants: {
    variant: {
      default: "bg-primary",
      primary: "bg-primary",
      success: "bg-success",
      danger: "bg-danger"
    },
    orientation: {
      horizontal: "h-full",
      vertical: "w-full"
    }
  },
  defaultVariants: {
    variant: "default",
    orientation: "horizontal"
  }
});
var sliderThumbVariants = classVarianceAuthority.cva(
  [
    "block rounded-full",
    "bg-background border-2",
    "shadow-md",
    "transition-colors duration-fast",
    chunk3EHT6IOA_cjs.focusRingClasses,
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-grab active:cursor-grabbing"
  ],
  {
    variants: {
      variant: {
        default: "border-primary",
        primary: "border-primary",
        success: "border-success",
        danger: "border-danger"
      },
      size: {
        sm: "size-3",
        md: "size-4",
        lg: "size-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
function SliderTooltip({
  value,
  visible,
  format
}) {
  const shouldReduce = framerMotion.useReducedMotion();
  return /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { children: visible && /* @__PURE__ */ jsxRuntime.jsxs(
    framerMotion.motion.div,
    {
      className: chunk4ON3M3OM_cjs.cn(
        "absolute -top-8 left-1/2 -translate-x-1/2",
        "px-2 py-0.5 rounded-md",
        "bg-foreground text-background",
        "text-xs font-medium whitespace-nowrap",
        "pointer-events-none select-none",
        "z-tooltip"
      ),
      variants: chunkF4JJFWWU_cjs.fadeInFast.variants,
      initial: shouldReduce ? false : "initial",
      animate: "animate",
      exit: "exit",
      transition: chunkF4JJFWWU_cjs.fadeInFast.transition,
      "data-ds-animated": "",
      children: [
        format(value),
        /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            className: "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground",
            "aria-hidden": "true"
          }
        )
      ]
    }
  ) });
}
var MotionThumb = framerMotion.motion.create(radixUi.Slider.Thumb);
function SliderThumbItem({
  variant = "default",
  size = "md",
  value,
  showTooltip = false,
  formatTooltip,
  shouldReduce
}) {
  const [isActive, setIsActive] = React.useState(false);
  return /* @__PURE__ */ jsxRuntime.jsx(
    MotionThumb,
    {
      className: chunk4ON3M3OM_cjs.cn("relative overflow-visible", sliderThumbVariants({ variant, size })),
      onMouseEnter: () => setIsActive(true),
      onMouseLeave: () => setIsActive(false),
      onFocus: () => setIsActive(true),
      onBlur: () => setIsActive(false),
      whileTap: shouldReduce ? void 0 : {
        scale: 1.2,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      },
      whileHover: shouldReduce ? void 0 : {
        scale: 1.1,
        transition: { type: "spring", stiffness: 400, damping: 30 }
      },
      "data-ds-animated": "",
      children: showTooltip && /* @__PURE__ */ jsxRuntime.jsx(
        SliderTooltip,
        {
          value,
          visible: isActive,
          format: formatTooltip
        }
      )
    }
  );
}
var Slider = React.forwardRef(function Slider2({
  variant = "default",
  size = "md",
  orientation = "horizontal",
  showMarks = false,
  marks,
  showTooltip = false,
  formatTooltip = (v) => String(v),
  className,
  value,
  defaultValue,
  min: min2 = 0,
  max: max2 = 100,
  step = 1,
  onValueChange,
  ...rest
}, ref) {
  const shouldReduce = framerMotion.useReducedMotion();
  const [internalValue, setInternalValue] = React.useState(
    value ?? defaultValue ?? [min2]
  );
  const handleValueChange = React.useCallback(
    (newValue) => {
      setInternalValue(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange]
  );
  const currentValue = value ?? internalValue;
  const resolvedMarks = marks ?? (showMarks && step ? Array.from({ length: Math.floor((max2 - min2) / step) + 1 }, (_, i) => ({
    value: min2 + i * step
  })) : []);
  const isVertical = orientation === "vertical";
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.Slider.Root,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "relative flex touch-none select-none items-center",
        isVertical ? "flex-col h-full w-fit" : "w-full h-fit",
        className
      ),
      orientation,
      min: min2,
      max: max2,
      step,
      value,
      defaultValue,
      onValueChange: handleValueChange,
      "data-ds": "",
      "data-ds-component": "slider",
      "data-ds-variant": variant,
      "data-ds-size": size,
      "data-ds-orientation": orientation,
      ...rest,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          radixUi.Slider.Track,
          {
            className: chunk4ON3M3OM_cjs.cn(sliderTrackVariants({ orientation, size })),
            children: /* @__PURE__ */ jsxRuntime.jsx(
              radixUi.Slider.Range,
              {
                className: chunk4ON3M3OM_cjs.cn(sliderRangeVariants({ variant, orientation }))
              }
            )
          }
        ),
        resolvedMarks.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: chunk4ON3M3OM_cjs.cn(
              "absolute",
              isVertical ? "left-1/2 -translate-x-1/2 h-full flex-col" : "top-1/2 -translate-y-1/2 w-full",
              "flex items-center justify-between pointer-events-none"
            ),
            "aria-hidden": "true",
            children: resolvedMarks.map((mark) => {
              const pct = (mark.value - min2) / (max2 - min2) * 100;
              return /* @__PURE__ */ jsxRuntime.jsxs(
                "div",
                {
                  className: "absolute flex flex-col items-center",
                  style: isVertical ? { bottom: `${pct}%` } : { left: `${pct}%`, transform: "translateX(-50%)" },
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
                      "div",
                      {
                        className: chunk4ON3M3OM_cjs.cn(
                          "rounded-full bg-border",
                          size === "sm" ? "size-1" : size === "md" ? "size-1.5" : "size-2"
                        )
                      }
                    ),
                    mark.label && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "mt-2 text-xs text-muted-foreground", children: mark.label })
                  ]
                },
                mark.value
              );
            })
          }
        ),
        currentValue.map((thumbValue, index) => /* @__PURE__ */ jsxRuntime.jsx(
          SliderThumbItem,
          {
            variant,
            size,
            value: thumbValue,
            showTooltip,
            formatTooltip,
            shouldReduce: shouldReduce ?? false
          },
          index
        ))
      ]
    }
  );
});
Slider.displayName = "Slider";
var spinnerVariants = classVarianceAuthority.cva(
  // Base styles — shared across all variants and sizes
  [
    // Ensure the spinner is inline and doesn't collapse
    "shrink-0"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Extra Small — for inline indicators, buttons, badges.
         * 14px (size-3.5)
         */
        xs: "size-3.5",
        /**
         * Small — for compact UIs, table cells, small buttons.
         * 16px (size-4)
         */
        sm: "size-4",
        /**
         * Medium — default size for most loading states.
         * 20px (size-5)
         */
        md: "size-5",
        /**
         * Large — for prominent loading indicators, empty states.
         * 24px (size-6)
         */
        lg: "size-6"
      },
      // -----------------------------------------------------------------
      // Color Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Default — uses the current text color.
         * Inherits from the parent element's color.
         */
        default: "text-current",
        /**
         * Primary — uses the brand/primary color.
         * For prominent loading states on neutral backgrounds.
         */
        primary: "text-primary",
        /**
         * Secondary — uses the secondary/foreground color.
         * For subtle loading indicators.
         */
        secondary: "text-foreground",
        /**
         * Muted — uses the muted-foreground color.
         * For very subtle, non-intrusive loading states.
         */
        muted: "text-muted-foreground"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default"
    }
  }
);
var labelSizeMap3 = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-sm"
};
var spinTransition = {
  rotate: {
    duration: 0.8,
    ease: "linear",
    repeat: Number.POSITIVE_INFINITY
  }
};
var spinAnimate = {
  rotate: 360
};
var Spinner = React.forwardRef(
  function Spinner2({
    size = "md",
    variant = "default",
    label,
    labelPosition = "right",
    "aria-label": ariaLabel,
    strokeWidth = 2.5,
    className,
    ...rest
  }, ref) {
    const prefersReduced = framerMotion.useReducedMotion();
    const resolvedAriaLabel = ariaLabel ?? (typeof label === "string" ? label : "Loading");
    const MotionSvg = framerMotion.motion.svg;
    const spinnerElement = prefersReduced ? (
      // Reduced motion fallback — uses CSS animate-spin (a simple
      // rotation that the browser can optimize or skip per OS settings)
      /* @__PURE__ */ jsxRuntime.jsxs(
        "svg",
        {
          className: chunk4ON3M3OM_cjs.cn("animate-spin", spinnerVariants({ size, variant })),
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "circle",
              {
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "currentColor",
                strokeWidth,
                className: "opacity-20"
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              "path",
              {
                d: "M12 2a10 10 0 0 1 10 10",
                stroke: "currentColor",
                strokeWidth,
                strokeLinecap: "round"
              }
            )
          ]
        }
      )
    ) : (
      // Full Framer Motion animation
      /* @__PURE__ */ jsxRuntime.jsxs(
        MotionSvg,
        {
          className: chunk4ON3M3OM_cjs.cn(spinnerVariants({ size, variant })),
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          animate: spinAnimate,
          transition: spinTransition,
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "circle",
              {
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "currentColor",
                strokeWidth,
                className: "opacity-20"
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              "path",
              {
                d: "M12 2a10 10 0 0 1 10 10",
                stroke: "currentColor",
                strokeWidth,
                strokeLinecap: "round"
              }
            )
          ]
        }
      )
    );
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        role: "status",
        "aria-label": resolvedAriaLabel,
        className: chunk4ON3M3OM_cjs.cn(
          "inline-flex items-center",
          labelPosition === "bottom" ? "flex-col gap-2" : "flex-row gap-2",
          className
        ),
        "data-ds": "",
        "data-ds-component": "spinner",
        "data-ds-size": size,
        "data-ds-variant": variant,
        ...rest,
        children: [
          spinnerElement,
          label && /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              className: chunk4ON3M3OM_cjs.cn(
                "leading-5",
                labelSizeMap3[size],
                variant === "muted" ? "text-muted-foreground" : "text-foreground"
              ),
              children: label
            }
          ),
          !label && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: resolvedAriaLabel })
        ]
      }
    );
  }
);
Spinner.displayName = "Spinner";
var statVariants = classVarianceAuthority.cva([
  "rounded-lg border border-border bg-card p-4 flex flex-col gap-2"
]);
function TrendUpIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m22 7-8.5 8.5-5-5L2 17" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M16 7h6v6" })
      ]
    }
  );
}
function TrendDownIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m22 17-8.5-8.5-5 5L2 7" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M16 17h6v-6" })
      ]
    }
  );
}
function AnimatedNumber({
  value,
  prefix,
  suffix
}) {
  const shouldReduce = framerMotion.useReducedMotion();
  const motionVal = framerMotion.useMotionValue(0);
  React.useEffect(() => {
    if (shouldReduce) {
      motionVal.set(value);
      return;
    }
    const controls = framerMotion.animate(motionVal, value, {
      duration: 1,
      ease: [0.4, 0, 0.2, 1]
    });
    return controls.stop;
  }, [value, motionVal, shouldReduce]);
  const rounded = framerMotion.useTransform(
    motionVal,
    (v) => `${prefix ?? ""}${Math.round(v).toLocaleString()}${suffix ?? ""}`
  );
  return /* @__PURE__ */ jsxRuntime.jsx(framerMotion.motion.span, { "data-ds-animated": "", children: rounded });
}
var Stat = React.forwardRef(function Stat2({
  label,
  value,
  previousValue,
  trend,
  trendLabel,
  sparkline,
  prefix,
  suffix,
  animated = true,
  className,
  ...rest
}, ref) {
  const shouldReduce = framerMotion.useReducedMotion();
  const isNumeric = typeof value === "number";
  const trendColor = trend === "up" ? "text-success" : trend === "down" ? "text-danger" : "text-muted-foreground";
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(statVariants(), className),
      "data-ds": "",
      "data-ds-component": "stat",
      "data-ds-trend": trend,
      ...rest,
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm font-medium text-muted-foreground leading-none", children: label }),
          sparkline && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-8 flex items-center", children: sparkline })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(
          framerMotion.motion.div,
          {
            className: "text-2xl font-bold text-foreground leading-none tabular-nums",
            variants: animated && !shouldReduce ? chunkF4JJFWWU_cjs.countUp.variants : void 0,
            initial: animated && !shouldReduce ? "initial" : void 0,
            animate: animated && !shouldReduce ? "animate" : void 0,
            transition: animated && !shouldReduce ? chunkF4JJFWWU_cjs.countUp.transition : void 0,
            "data-ds-animated": animated ? "" : void 0,
            children: isNumeric && animated ? /* @__PURE__ */ jsxRuntime.jsx(
              AnimatedNumber,
              {
                value,
                prefix,
                suffix
              }
            ) : /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
              prefix,
              String(value),
              suffix
            ] })
          }
        ),
        (trend || trendLabel) && /* @__PURE__ */ jsxRuntime.jsxs(
          framerMotion.motion.div,
          {
            className: chunk4ON3M3OM_cjs.cn(
              "flex items-center gap-1 text-xs font-medium",
              trendColor
            ),
            variants: animated && !shouldReduce ? chunkF4JJFWWU_cjs.slideUpSm.variants : void 0,
            initial: animated && !shouldReduce ? "initial" : void 0,
            animate: animated && !shouldReduce ? "animate" : void 0,
            transition: animated && !shouldReduce ? { ...chunkF4JJFWWU_cjs.slideUpSm.transition, delay: 0.3 } : void 0,
            "data-ds-animated": animated ? "" : void 0,
            children: [
              trend === "up" && /* @__PURE__ */ jsxRuntime.jsx(TrendUpIcon, { className: "size-3.5" }),
              trend === "down" && /* @__PURE__ */ jsxRuntime.jsx(TrendDownIcon, { className: "size-3.5" }),
              trendLabel && /* @__PURE__ */ jsxRuntime.jsx("span", { children: trendLabel })
            ]
          }
        )
      ]
    }
  );
});
Stat.displayName = "Stat";
var StepsContext = React.createContext({
  currentStep: 0,
  orientation: "horizontal",
  variant: "default",
  totalSteps: 0
});
var StepIndexContext = React.createContext(0);
function CheckIcon8({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntime.jsx("polyline", { points: "20 6 9 17 4 12" })
    }
  );
}
var Steps = React.forwardRef(function Steps2({
  currentStep,
  orientation = "horizontal",
  variant = "default",
  onStepClick,
  className,
  children,
  ...rest
}, ref) {
  const childArray = Array.isArray(children) ? children : children ? [children] : [];
  const totalSteps = childArray.length;
  return /* @__PURE__ */ jsxRuntime.jsx(
    StepsContext.Provider,
    {
      value: { currentStep, orientation, variant, totalSteps, onStepClick },
      children: /* @__PURE__ */ jsxRuntime.jsx(
        "ol",
        {
          ref,
          "aria-label": "Steps",
          className: chunk4ON3M3OM_cjs.cn(
            "flex",
            orientation === "horizontal" ? "flex-row items-start gap-0" : "flex-col gap-0",
            className
          ),
          "data-ds": "",
          "data-ds-component": "steps",
          "data-ds-orientation": orientation,
          ...rest,
          children: childArray.map((child, index) => /* @__PURE__ */ jsxRuntime.jsx(StepIndexContext.Provider, { value: index, children: child }, index))
        }
      )
    }
  );
});
Steps.displayName = "Steps";
var Step = React.forwardRef(function Step2({ icon, title, description, className, children, ...rest }, ref) {
  const { currentStep, orientation, variant, totalSteps, onStepClick } = React.useContext(StepsContext);
  const index = React.useContext(StepIndexContext);
  const status = index < currentStep ? "complete" : index === currentStep ? "active" : "upcoming";
  const isLast = index === totalSteps - 1;
  const isClickable = !!onStepClick;
  const indicatorContent = variant === "dots" ? null : status === "complete" && variant !== "outline" ? /* @__PURE__ */ jsxRuntime.jsx(CheckIcon8, {}) : /* @__PURE__ */ jsxRuntime.jsx("span", { children: index + 1 });
  const indicator = /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: chunk4ON3M3OM_cjs.cn(
        "flex shrink-0 items-center justify-center",
        "font-medium text-xs leading-none",
        "transition-colors duration-fast ease-standard",
        // Dot variant
        variant === "dots" ? chunk4ON3M3OM_cjs.cn(
          "size-2 rounded-full",
          status === "complete" && "bg-primary",
          status === "active" && "bg-primary",
          status === "upcoming" && "bg-border"
        ) : chunk4ON3M3OM_cjs.cn(
          // Default & outline
          "size-7 rounded-full border-2",
          variant === "default" ? chunk4ON3M3OM_cjs.cn(
            status === "complete" && "border-primary bg-primary text-primary-foreground",
            status === "active" && "border-primary bg-background text-primary",
            status === "upcoming" && "border-muted bg-background text-muted-foreground"
          ) : chunk4ON3M3OM_cjs.cn(
            // outline variant
            status === "complete" && "border-primary bg-primary/10 text-primary",
            status === "active" && "border-primary bg-background text-primary",
            status === "upcoming" && "border-muted bg-background text-muted-foreground"
          )
        )
      ),
      "aria-hidden": variant === "dots",
      children: indicatorContent
    }
  );
  const labelContent = (title || description) && /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: chunk4ON3M3OM_cjs.cn(
        orientation === "horizontal" ? "mt-2 text-center" : "ml-3 text-left"
      ),
      children: [
        title && /* @__PURE__ */ jsxRuntime.jsx(
          "p",
          {
            className: chunk4ON3M3OM_cjs.cn(
              "text-sm font-medium leading-5",
              status === "active" && "text-foreground",
              status === "complete" && "text-foreground",
              status === "upcoming" && "text-muted-foreground"
            ),
            children: title
          }
        ),
        description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs leading-4 text-muted-foreground mt-0.5", children: description })
      ]
    }
  );
  const connector = !isLast && /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "aria-hidden": "true",
      className: chunk4ON3M3OM_cjs.cn(
        "flex-1 transition-colors duration-fast ease-standard",
        orientation === "horizontal" ? "mx-2 mt-3.5 h-px" : "ml-3.5 my-1 w-px self-stretch",
        index < currentStep ? "bg-primary" : "bg-border"
      )
    }
  );
  const stepContent = /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: orientation === "horizontal" ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col items-center", children: [
    indicator,
    labelContent
  ] }) : /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col items-center", children: [
      indicator,
      !isLast && /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          "aria-hidden": "true",
          className: chunk4ON3M3OM_cjs.cn(
            "mt-1 w-px flex-1 self-stretch transition-colors duration-fast ease-standard",
            "min-h-[24px]",
            index < currentStep ? "bg-primary" : "bg-border"
          )
        }
      )
    ] }),
    labelContent
  ] }) });
  return /* @__PURE__ */ jsxRuntime.jsx(
    "li",
    {
      ref,
      "aria-current": status === "active" ? "step" : void 0,
      "data-ds": "",
      "data-ds-component": "step",
      "data-ds-status": status,
      className: chunk4ON3M3OM_cjs.cn(
        orientation === "horizontal" ? "flex flex-1 items-start" : "flex flex-col",
        className
      ),
      ...rest,
      children: orientation === "horizontal" ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        isClickable ? /* @__PURE__ */ jsxRuntime.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onStepClick(index),
            className: chunk4ON3M3OM_cjs.cn(
              "flex flex-1 flex-col items-center",
              isClickable && "cursor-pointer",
              status === "upcoming" && !isClickable && "cursor-default"
            ),
            "aria-label": title ? `Go to step: ${title}` : `Go to step ${index + 1}`,
            children: [
              indicator,
              labelContent
            ]
          }
        ) : /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-1 flex-col items-center", children: [
          indicator,
          labelContent
        ] }),
        connector
      ] }) : stepContent
    }
  );
});
Step.displayName = "Step";
var switchTrackVariants = classVarianceAuthority.cva(
  [
    // Layout
    "relative inline-flex shrink-0 cursor-pointer items-center",
    // Shape
    "rounded-full",
    // Border
    "border-2 border-transparent",
    // Transition
    "transition-[background-color,box-shadow] duration-fast ease-standard",
    // Focus ring
    chunk3EHT6IOA_cjs.focusRingClasses,
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    // Unchecked state
    "data-[state=unchecked]:bg-input",
    // Checked state
    "data-[state=checked]:bg-primary"
  ],
  {
    variants: {
      size: {
        /**
         * Small — compact for dense UIs, settings panels.
         * Track: 36px × 20px
         */
        sm: "h-5 w-9",
        /**
         * Medium — default size for most switches.
         * Track: 44px × 24px
         */
        md: "h-6 w-11"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var switchThumbVariants = classVarianceAuthority.cva(
  [
    // Shape
    "pointer-events-none block rounded-full",
    // Color
    "bg-white",
    // Shadow
    "shadow-sm"
  ],
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var thumbSpringConfig = {
  stiffness: 500,
  damping: 30,
  mass: 0.5
};
var thumbTravel = {
  sm: { off: 0, on: 16 },
  md: { off: 0, on: 20 }
};
var MotionThumb2 = framerMotion.motion.create("span");
var instantSpringConfig = {
  stiffness: 1e4,
  damping: 1e4,
  mass: 0.01
};
function AnimatedThumb({
  size = "md",
  checked
}) {
  const prefersReduced = framerMotion.useReducedMotion();
  const travel = thumbTravel[size];
  const x = framerMotion.useMotionValue(checked ? travel.on : travel.off);
  const springConfig = prefersReduced ? instantSpringConfig : thumbSpringConfig;
  const springX = framerMotion.useSpring(x, springConfig);
  React.useEffect(() => {
    x.set(checked ? travel.on : travel.off);
  }, [checked, travel, x]);
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Switch.Thumb, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(
    MotionThumb2,
    {
      className: chunk4ON3M3OM_cjs.cn(switchThumbVariants({ size })),
      style: { x: springX },
      "aria-hidden": "true"
    }
  ) });
}
var Switch = React.forwardRef(function Switch2({
  size = "md",
  label,
  description,
  labelPosition = "right",
  wrapperClassName,
  labelClassName,
  descriptionClassName,
  className,
  id: idProp,
  checked,
  defaultChecked,
  disabled,
  onCheckedChange,
  ...rest
}, ref) {
  const autoId = React.useId();
  const id = idProp ?? autoId;
  const descriptionId = description ? `${id}-description` : void 0;
  const isControlled = checked !== void 0;
  const [internalChecked, setInternalChecked] = React.useState(
    checked ?? defaultChecked ?? false
  );
  const [prevChecked, setPrevChecked] = React.useState(checked);
  if (isControlled && checked !== prevChecked) {
    setPrevChecked(checked);
    setInternalChecked(checked);
  }
  const handleCheckedChange = React.useCallback(
    (value) => {
      if (!isControlled) {
        setInternalChecked(value);
      }
      onCheckedChange?.(value);
    },
    [isControlled, onCheckedChange]
  );
  const isChecked = isControlled ? checked : internalChecked;
  const switchElement = /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Switch.Root,
    {
      ref,
      id,
      checked: isControlled ? checked : void 0,
      defaultChecked: isControlled ? void 0 : defaultChecked,
      disabled,
      onCheckedChange: handleCheckedChange,
      "aria-describedby": descriptionId,
      className: chunk4ON3M3OM_cjs.cn(switchTrackVariants({ size }), className),
      "data-ds": "",
      "data-ds-component": "switch",
      "data-ds-size": size,
      ...rest,
      children: /* @__PURE__ */ jsxRuntime.jsx(AnimatedThumb, { size, checked: isChecked })
    }
  );
  if (!label) {
    return switchElement;
  }
  const labelBlock = /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-0.5 flex-1 min-w-0", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "label",
      {
        htmlFor: id,
        className: chunk4ON3M3OM_cjs.cn(
          "text-sm font-medium leading-5 text-foreground",
          "select-none",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "cursor-pointer",
          labelClassName
        ),
        children: label
      }
    ),
    description && /* @__PURE__ */ jsxRuntime.jsx(
      "span",
      {
        id: descriptionId,
        className: chunk4ON3M3OM_cjs.cn(
          "text-xs leading-4 text-muted-foreground",
          disabled && "opacity-50",
          descriptionClassName
        ),
        children: description
      }
    )
  ] });
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: chunk4ON3M3OM_cjs.cn(
        "flex items-center gap-3",
        // Reverse order when label is on the left
        labelPosition === "left" ? "flex-row" : "flex-row-reverse",
        // Align to start when description is present
        description && "items-start",
        wrapperClassName
      ),
      "data-ds": "",
      "data-ds-component": "switch-group",
      children: [
        switchElement,
        labelBlock
      ]
    }
  );
});
Switch.displayName = "Switch";
var TabsContext = React.createContext({
  variant: "underline",
  size: "md",
  orientation: "horizontal",
  layoutId: "",
  activeValue: ""
});
function useTabsContext() {
  return React.useContext(TabsContext);
}
var tabsListVariants = classVarianceAuthority.cva(["inline-flex items-center", "shrink-0"], {
  variants: {
    variant: {
      underline: ["border-b border-border", "gap-0"],
      pills: ["gap-1", "rounded-md", "bg-muted", "p-1"],
      enclosed: ["border-b border-border", "gap-0"]
    },
    orientation: {
      horizontal: "flex-row w-full",
      vertical: "flex-col w-auto border-b-0"
    },
    fullWidth: {
      true: "",
      false: ""
    }
  },
  compoundVariants: [
    // Vertical orientation adjustments
    {
      variant: "underline",
      orientation: "vertical",
      className: "border-b-0 border-r border-border"
    },
    {
      variant: "enclosed",
      orientation: "vertical",
      className: "border-b-0 border-r border-border"
    }
  ],
  defaultVariants: {
    variant: "underline",
    orientation: "horizontal",
    fullWidth: false
  }
});
var tabsTriggerVariants = classVarianceAuthority.cva(
  [
    // Layout
    "relative inline-flex items-center justify-center gap-1.5",
    // Typography
    "font-medium leading-5 whitespace-nowrap",
    // Transition
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    // Focus ring
    chunk3EHT6IOA_cjs.focusRingClasses,
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50",
    // Cursor
    "cursor-pointer select-none"
  ],
  {
    variants: {
      variant: {
        underline: [
          "bg-transparent",
          "text-muted-foreground",
          "hover:text-foreground",
          "data-[state=active]:text-foreground",
          // Bottom border space for the active indicator
          "border-b-2 border-transparent -mb-px"
        ],
        pills: [
          "rounded-sm",
          "text-muted-foreground",
          "hover:text-foreground hover:bg-background/60",
          "data-[state=active]:text-foreground"
        ],
        enclosed: [
          "bg-transparent",
          "text-muted-foreground",
          "border border-transparent",
          "hover:text-foreground",
          "data-[state=active]:text-foreground",
          "data-[state=active]:bg-background",
          "data-[state=active]:border-border",
          "data-[state=active]:border-b-transparent",
          "-mb-px"
        ]
      },
      size: {
        sm: "text-xs px-3 py-1.5",
        md: "text-sm px-4 py-2"
      }
    },
    defaultVariants: {
      variant: "underline",
      size: "md"
    }
  }
);
var tabsContentVariants = classVarianceAuthority.cva(["mt-2", chunk3EHT6IOA_cjs.focusRingClasses, "rounded-sm"], {
  variants: {
    orientation: {
      horizontal: "mt-2",
      vertical: "mt-0 ml-4"
    }
  },
  defaultVariants: {
    orientation: "horizontal"
  }
});
var MotionSpan = framerMotion.motion.create("span");
var indicatorSpringConfig = {
  type: "spring",
  stiffness: 500,
  damping: 35,
  mass: 0.5
};
var indicatorInstantConfig = {
  type: "tween",
  duration: 0
};
function ActiveIndicator({
  variant,
  layoutId
}) {
  const prefersReduced = framerMotion.useReducedMotion();
  const transition = prefersReduced ? indicatorInstantConfig : indicatorSpringConfig;
  if (variant === "enclosed") {
    return null;
  }
  if (variant === "underline") {
    return /* @__PURE__ */ jsxRuntime.jsx(
      MotionSpan,
      {
        layoutId,
        className: chunk4ON3M3OM_cjs.cn(
          "absolute bottom-0 left-0 right-0 h-0.5",
          "bg-primary",
          "rounded-full"
        ),
        transition
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    MotionSpan,
    {
      layoutId,
      className: chunk4ON3M3OM_cjs.cn(
        "absolute inset-0",
        "bg-background",
        "rounded-sm",
        "shadow-sm"
      ),
      transition
    }
  );
}
var Tabs = React.forwardRef(function Tabs2({
  variant = "underline",
  size = "md",
  orientation = "horizontal",
  className,
  children,
  value: controlledValue,
  defaultValue,
  onValueChange,
  ...rest
}, ref) {
  const autoId = React.useId();
  const layoutId = `tabs-indicator-${autoId}`;
  const [internalValue, setInternalValue] = React.useState(
    controlledValue ?? defaultValue ?? ""
  );
  const activeValue = controlledValue !== void 0 ? controlledValue : internalValue;
  const handleValueChange = React.useCallback(
    (newValue) => {
      if (controlledValue === void 0) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [controlledValue, onValueChange]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    TabsContext.Provider,
    {
      value: { variant, size, orientation, layoutId, activeValue },
      children: /* @__PURE__ */ jsxRuntime.jsx(
        radixUi.Tabs.Root,
        {
          ref,
          orientation,
          value: controlledValue,
          defaultValue: controlledValue !== void 0 ? void 0 : defaultValue,
          onValueChange: handleValueChange,
          className: chunk4ON3M3OM_cjs.cn(
            "not-prose",
            orientation === "vertical" && "flex flex-row",
            className
          ),
          "data-ds": "",
          "data-ds-component": "tabs",
          "data-ds-variant": variant,
          "data-ds-size": size,
          "data-ds-orientation": orientation,
          ...rest,
          children
        }
      )
    }
  );
});
Tabs.displayName = "Tabs";
var TabsList = React.forwardRef(function TabsList2({ fullWidth = false, className, children, ...rest }, ref) {
  const { variant, orientation } = useTabsContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Tabs.List,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        tabsListVariants({ variant, orientation, fullWidth }),
        fullWidth && orientation === "horizontal" && "[&>*]:flex-1",
        className
      ),
      "data-ds": "",
      "data-ds-component": "tabs-list",
      ...rest,
      children
    }
  );
});
TabsList.displayName = "TabsList";
var TabsTrigger = React.forwardRef(function TabsTrigger2({ className, icon, children, disabled, value, ...rest }, ref) {
  const { variant, size, layoutId, activeValue } = useTabsContext();
  const iconSizeClass = size === "sm" ? "[&>svg]:size-3.5" : "[&>svg]:size-4";
  const isActive = value === activeValue;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.Tabs.Trigger,
    {
      ref,
      value,
      disabled,
      className: chunk4ON3M3OM_cjs.cn(
        tabsTriggerVariants({ variant, size }),
        iconSizeClass,
        // For underline variant, make border transparent — the motion indicator handles the active line
        variant === "underline" && "data-[state=active]:border-transparent",
        className
      ),
      "data-ds": "",
      "data-ds-component": "tabs-trigger",
      ...rest,
      children: [
        variant !== "enclosed" && isActive && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute inset-0 pointer-events-none", children: /* @__PURE__ */ jsxRuntime.jsx(ActiveIndicator, { variant, layoutId }) }),
        /* @__PURE__ */ jsxRuntime.jsxs("span", { className: chunk4ON3M3OM_cjs.cn("relative z-[1] inline-flex items-center gap-1.5"), children: [
          icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0", "aria-hidden": "true", children: icon }),
          children
        ] })
      ]
    }
  );
});
TabsTrigger.displayName = "TabsTrigger";
var TabsContent = React.forwardRef(function TabsContent2({ className, children, ...rest }, ref) {
  const { orientation } = useTabsContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Tabs.Content,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(tabsContentVariants({ orientation }), className),
      "data-ds": "",
      "data-ds-component": "tabs-content",
      ...rest,
      children
    }
  );
});
TabsContent.displayName = "TabsContent";
var textareaVariants = classVarianceAuthority.cva(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "flex w-full min-h-[60px]",
    // Typography
    "text-sm leading-5",
    // Shape
    "rounded-md",
    // Border
    "border",
    // Colors
    "bg-background text-input-foreground",
    "placeholder:text-input-placeholder",
    // Transition
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    // Focus ring — WCAG AA compliant, visible on keyboard navigation only
    chunk3EHT6IOA_cjs.focusRingClasses,
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled-foreground",
    // Read-only
    "read-only:bg-muted read-only:cursor-default",
    // Resize handle
    "resize-vertical"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Visual Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Default — standard textarea with muted border.
         */
        default: [
          "border-input",
          "hover:border-border-strong",
          "focus-visible:border-border-strong"
        ],
        /**
         * Error — validation failed. Uses danger color.
         */
        error: [
          "border-danger",
          "text-foreground",
          "focus-visible:border-danger",
          "placeholder:text-input-placeholder"
        ],
        /**
         * Success — validation passed. Uses success color.
         */
        success: [
          "border-success",
          "text-foreground",
          "focus-visible:border-success",
          "placeholder:text-input-placeholder"
        ]
      },
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — compact for dense UIs.
         * Padding and font match Input sm.
         */
        sm: "px-2.5 py-1.5 text-xs",
        /**
         * Medium — default size for most textareas.
         * Padding and font match Input md.
         */
        md: "px-3 py-2 text-sm",
        /**
         * Large — prominent textareas for long-form content.
         * Padding and font match Input lg.
         */
        lg: "px-3.5 py-2.5 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
function useAutoResize(textareaRef, autoResize, maxHeight) {
  const adjustHeight = React.useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea || !autoResize) return;
    textarea.style.height = "auto";
    const newHeight = textarea.scrollHeight;
    if (maxHeight && newHeight > maxHeight) {
      textarea.style.height = `${maxHeight}px`;
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY = "hidden";
    }
  }, [textareaRef, autoResize, maxHeight]);
  React.useEffect(() => {
    adjustHeight();
  }, [adjustHeight]);
  return adjustHeight;
}
function CharacterCount({
  current,
  max: max2,
  variant,
  className
}) {
  const isOverLimit = max2 !== void 0 && current > max2;
  const isNearLimit = max2 !== void 0 && current >= max2 * 0.9;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: chunk4ON3M3OM_cjs.cn(
        "text-xs leading-4 tabular-nums select-none",
        // Default muted text
        "text-muted-foreground",
        // Near limit warning
        isNearLimit && !isOverLimit && "text-warning",
        // Over limit or error variant
        (isOverLimit || variant === "error") && "text-danger",
        className
      ),
      "aria-live": "polite",
      "aria-atomic": "true",
      children: max2 !== void 0 ? `${current} / ${max2}` : current
    }
  );
}
var Textarea = React.forwardRef(
  function Textarea2({
    variant = "default",
    size = "md",
    autoResize = false,
    maxHeight,
    minRows = 3,
    showCount = false,
    wrapperClassName,
    countClassName,
    className,
    disabled,
    readOnly,
    value,
    defaultValue,
    maxLength,
    onChange,
    "aria-invalid": ariaInvalid,
    ...rest
  }, ref) {
    const internalRef = React.useRef(null);
    const [uncontrolledCharCount, setUncontrolledCharCount] = React.useState(
      () => {
        if (defaultValue !== void 0) return String(defaultValue).length;
        return 0;
      }
    );
    const charCount = value !== void 0 ? String(value).length : uncontrolledCharCount;
    const adjustHeight = useAutoResize(internalRef, autoResize, maxHeight);
    const handleChange = React.useCallback(
      (e) => {
        setUncontrolledCharCount(e.target.value.length);
        adjustHeight();
        onChange?.(e);
      },
      [onChange, adjustHeight]
    );
    const resolvedAriaInvalid = ariaInvalid !== void 0 ? ariaInvalid : variant === "error" ? true : void 0;
    const textareaClasses = chunk4ON3M3OM_cjs.cn(
      textareaVariants({ variant, size }),
      autoResize && "resize-none overflow-hidden",
      className
    );
    const textareaElement = /* @__PURE__ */ jsxRuntime.jsx(
      "textarea",
      {
        ref: chunk4ON3M3OM_cjs.composeRefs(internalRef, ref),
        rows: minRows,
        disabled,
        readOnly,
        value,
        defaultValue,
        maxLength,
        onChange: handleChange,
        "aria-invalid": resolvedAriaInvalid,
        "aria-disabled": disabled || void 0,
        className: textareaClasses,
        "data-ds": "",
        "data-ds-component": "textarea",
        "data-ds-variant": variant,
        "data-ds-size": size,
        ...autoResize ? { "data-ds-auto-resize": "" } : {},
        ...rest
      }
    );
    if (!showCount) {
      return textareaElement;
    }
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        className: chunk4ON3M3OM_cjs.cn("flex flex-col gap-1.5 w-full", wrapperClassName),
        "data-ds": "",
        "data-ds-component": "textarea-wrapper",
        children: [
          textareaElement,
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-end px-0.5", children: /* @__PURE__ */ jsxRuntime.jsx(
            CharacterCount,
            {
              current: charCount,
              max: maxLength,
              variant,
              className: countClassName
            }
          ) })
        ]
      }
    );
  }
);
Textarea.displayName = "Textarea";
var statusDotMap = {
  default: "bg-border",
  active: "bg-primary ring-4 ring-primary/20",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  pending: "bg-muted border-2 border-border"
};
var statusIconColorMap = {
  default: "bg-muted border border-border text-muted-foreground",
  active: "bg-primary text-primary-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  danger: "bg-danger text-danger-foreground",
  pending: "bg-muted border border-border/60 text-muted-foreground"
};
var dotSizeMap2 = {
  sm: "size-2",
  md: "size-3",
  lg: "size-4"
};
var iconSizeMap10 = {
  sm: "size-6",
  md: "size-8",
  lg: "size-10"
};
var TimelineItem = React.forwardRef(
  function TimelineItem2({
    title,
    description,
    timestamp,
    icon,
    status = "default",
    isLast = false,
    size = "md",
    animated = true,
    side = "right",
    className,
    children,
    ...rest
  }, ref) {
    const shouldReduce = framerMotion.useReducedMotion();
    const slidePreset = side === "left" ? chunkF4JJFWWU_cjs.slideInFromRight : chunkF4JJFWWU_cjs.slideInFromLeft;
    return /* @__PURE__ */ jsxRuntime.jsxs(
      framerMotion.motion.div,
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn("flex gap-4 relative", className),
        variants: animated && !shouldReduce ? slidePreset.variants : void 0,
        transition: animated && !shouldReduce ? slidePreset.transition : void 0,
        "data-ds-animated": animated ? "" : void 0,
        ...rest,
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col items-center", children: [
            icon ? /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                className: chunk4ON3M3OM_cjs.cn(
                  "flex items-center justify-center rounded-full shrink-0 z-10",
                  iconSizeMap10[size],
                  statusIconColorMap[status]
                ),
                children: icon
              }
            ) : /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                className: chunk4ON3M3OM_cjs.cn(
                  "rounded-full shrink-0 z-10 mt-1.5",
                  dotSizeMap2[size],
                  statusDotMap[status]
                )
              }
            ),
            !isLast && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1 w-px bg-border mt-2 mb-0" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunk4ON3M3OM_cjs.cn("flex-1 pb-8", isLast && "pb-0"), children: [
            timestamp && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground mb-1 leading-none", children: timestamp }),
            title && /* @__PURE__ */ jsxRuntime.jsx(
              "p",
              {
                className: chunk4ON3M3OM_cjs.cn(
                  "font-semibold text-foreground leading-5",
                  size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"
                ),
                children: title
              }
            ),
            description && /* @__PURE__ */ jsxRuntime.jsx(
              "p",
              {
                className: chunk4ON3M3OM_cjs.cn(
                  "text-muted-foreground leading-5 mt-0.5",
                  size === "sm" ? "text-xs" : "text-sm"
                ),
                children: description
              }
            ),
            children && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-2", children })
          ] })
        ]
      }
    );
  }
);
TimelineItem.displayName = "TimelineItem";
var Timeline = React.forwardRef(
  function Timeline2({ items, align = "left", size = "md", animated = true, className, ...rest }, ref) {
    const shouldReduce = framerMotion.useReducedMotion();
    return /* @__PURE__ */ jsxRuntime.jsx(
      framerMotion.motion.div,
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn("relative", className),
        variants: animated && !shouldReduce ? chunkF4JJFWWU_cjs.staggerContainerSlow.variants : void 0,
        initial: animated && !shouldReduce ? "initial" : void 0,
        animate: animated && !shouldReduce ? "animate" : void 0,
        "data-ds": "",
        "data-ds-component": "timeline",
        "data-ds-align": align,
        "data-ds-animated": animated ? "" : void 0,
        ...rest,
        children: items.map((item, i) => /* @__PURE__ */ jsxRuntime.jsx(
          TimelineItem,
          {
            title: item.title,
            description: item.description,
            timestamp: item.timestamp,
            icon: item.icon,
            status: item.status ?? "default",
            isLast: i === items.length - 1,
            size,
            animated,
            side: align === "alternate" ? i % 2 === 0 ? "right" : "left" : "right",
            children: item.content
          },
          item.id ?? i
        ))
      }
    );
  }
);
Timeline.displayName = "Timeline";
function SuccessIcon2({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m9 12 2 2 4-4" })
      ]
    }
  );
}
function InfoIcon2({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 16v-4" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 8h.01" })
      ]
    }
  );
}
function WarningIcon2({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 9v4" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 17h.01" })
      ]
    }
  );
}
function DangerIcon2({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m15 9-6 6" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m9 9 6 6" })
      ]
    }
  );
}
function CloseIcon5({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
var toastVariants = classVarianceAuthority.cva(
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
var defaultIconMap2 = {
  success: SuccessIcon2,
  warning: WarningIcon2,
  danger: DangerIcon2,
  info: InfoIcon2
};
var iconColorMap2 = {
  default: "text-muted-foreground",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info"
};
var positionClasses = {
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
var springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.8
};
var instantTransition = {
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
var toastIdCounter = 0;
function generateToastId() {
  toastIdCounter += 1;
  return `ds-toast-${toastIdCounter}-${Date.now()}`;
}
var ToastContext = React.createContext(null);
var ToastItem = React.forwardRef(
  function ToastItem2({ toast: toastData, onDismiss, isBottom, ...rest }, ref) {
    const { id, variant, title, description, duration, action } = toastData;
    const timerRef = React.useRef(null);
    const remainingRef = React.useRef(duration);
    const startTimeRef = React.useRef(Date.now());
    const [isPaused, setIsPaused] = React.useState(false);
    const startTimer = React.useCallback(() => {
      if (remainingRef.current <= 0) return;
      startTimeRef.current = Date.now();
      timerRef.current = setTimeout(() => {
        onDismiss(id);
      }, remainingRef.current);
    }, [id, onDismiss]);
    const pauseTimer = React.useCallback(() => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        const elapsed = Date.now() - startTimeRef.current;
        remainingRef.current = Math.max(0, remainingRef.current - elapsed);
      }
    }, []);
    React.useEffect(() => {
      if (duration > 0) {
        startTimer();
      }
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, [duration, startTimer]);
    const handleMouseEnter = React.useCallback(() => {
      if (duration > 0) {
        pauseTimer();
        setIsPaused(true);
      }
    }, [duration, pauseTimer]);
    const handleMouseLeave = React.useCallback(() => {
      if (duration > 0) {
        startTimer();
        setIsPaused(false);
      }
    }, [duration, startTimer]);
    const handleKeyDown = React.useCallback(
      (e) => {
        if (e.key === "Escape") {
          onDismiss(id);
        }
      },
      [id, onDismiss]
    );
    const IconComponent = variant !== "default" ? defaultIconMap2[variant] : null;
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        role: "status",
        "aria-live": "polite",
        "aria-atomic": "true",
        className: chunk4ON3M3OM_cjs.cn(toastVariants({ variant })),
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onKeyDown: handleKeyDown,
        "data-ds": "",
        "data-ds-component": "toast",
        "data-ds-variant": variant,
        ...rest,
        children: [
          IconComponent && /* @__PURE__ */ jsxRuntime.jsx("span", { className: chunk4ON3M3OM_cjs.cn("shrink-0 mt-0.5", iconColorMap2[variant]), children: /* @__PURE__ */ jsxRuntime.jsx(IconComponent, { className: "size-4" }) }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1 min-w-0", children: [
            title && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "font-semibold leading-5", children: title }),
            description && /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunk4ON3M3OM_cjs.cn("leading-5", title && "mt-0.5 opacity-90"), children: description }),
            action && /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  action.onClick();
                  onDismiss(id);
                },
                className: chunk4ON3M3OM_cjs.cn(
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
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              onClick: () => onDismiss(id),
              className: chunk4ON3M3OM_cjs.cn(
                "shrink-0",
                "inline-flex items-center justify-center",
                "size-5 rounded-sm",
                "text-current opacity-40",
                "hover:opacity-100",
                "transition-opacity duration-fast",
                "focus-visible:outline-none focus-visible:border-current"
              ),
              "aria-label": "Dismiss notification",
              children: /* @__PURE__ */ jsxRuntime.jsx(CloseIcon5, { className: "size-3.5" })
            }
          ),
          duration > 0 && /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              className: "absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden rounded-b-lg",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  className: chunk4ON3M3OM_cjs.cn(
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
  const [mounted, setMounted] = React.useState(false);
  const isBottom = position.includes("bottom");
  const prefersReduced = framerMotion.useReducedMotion();
  const motionVariants = prefersReduced ? getReducedMotionVariants() : getMotionVariants(position);
  const transition = prefersReduced ? instantTransition : springTransition;
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const container = /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: chunk4ON3M3OM_cjs.cn(
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
        /* @__PURE__ */ jsxRuntime.jsx(
          "style",
          {
            dangerouslySetInnerHTML: {
              __html: `@keyframes ds-toast-progress { from { transform: scaleX(1); } to { transform: scaleX(0); } }`
            }
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { initial: false, mode: "popLayout", children: (isBottom ? [...toasts].reverse() : toasts).map((toast2) => /* @__PURE__ */ jsxRuntime.jsx(
          framerMotion.motion.div,
          {
            layout: true,
            variants: motionVariants,
            initial: "initial",
            animate: "animate",
            exit: "exit",
            transition,
            children: /* @__PURE__ */ jsxRuntime.jsx(
              ToastItem,
              {
                toast: toast2,
                onDismiss,
                isBottom
              }
            )
          },
          toast2.id
        )) })
      ]
    }
  );
  return reactDom.createPortal(container, document.body);
}
function ToastProvider({
  children,
  position = "top-right",
  maxVisible = 5,
  defaultDuration = 5e3,
  gap = 8
}) {
  const [toasts, setToasts] = React.useState([]);
  const dismiss = React.useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const dismissAll = React.useCallback(() => {
    setToasts([]);
  }, []);
  const addToast = React.useCallback(
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
  const api = React.useMemo(
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
  return /* @__PURE__ */ jsxRuntime.jsxs(ToastContext.Provider, { value: api, children: [
    children,
    /* @__PURE__ */ jsxRuntime.jsx(
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
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error(
      "useToast must be used within a <ToastProvider>. Wrap your application (or a subtree) with <ToastProvider> to use the toast API."
    );
  }
  return context;
}
var toggleVariants = classVarianceAuthority.cva(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "inline-flex items-center justify-center gap-2",
    // Typography
    "text-sm font-medium leading-5",
    // Shape
    "rounded-md",
    // Transition (uses design system motion tokens)
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    // Focus ring — WCAG AA compliant, visible on keyboard navigation only
    chunk3EHT6IOA_cjs.focusRingClasses,
    // Disabled — consistent across all variants
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    // Cursor
    "cursor-pointer",
    // Prevent text selection on rapid clicks
    "select-none",
    // Shrink protection
    "shrink-0"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Visual Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Default — transparent background, fills on press.
         * Medium visual prominence. The most common toggle style.
         */
        default: [
          "bg-transparent text-muted-foreground",
          "hover:bg-muted hover:text-foreground",
          "data-[state=on]:bg-secondary data-[state=on]:text-foreground"
        ],
        /**
         * Outline — bordered toggle with visible boundary.
         * Medium-high visual prominence. Use for toolbar-style toggles.
         */
        outline: [
          "border border-border",
          "bg-transparent text-muted-foreground",
          "hover:bg-muted hover:text-foreground",
          "data-[state=on]:bg-secondary data-[state=on]:text-foreground",
          "data-[state=on]:border-border-strong"
        ],
        /**
         * Ghost — minimal visual weight. No background until hover.
         * Low visual prominence. Use for subtle inline toggles.
         */
        ghost: [
          "bg-transparent text-muted-foreground",
          "hover:bg-muted hover:text-foreground",
          "data-[state=on]:bg-transparent data-[state=on]:text-foreground"
        ]
      },
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — compact toggles for dense UIs, toolbars.
         * Height: 32px (h-8), Padding: 8px horizontal
         */
        sm: "h-8 px-2 text-xs gap-1.5",
        /**
         * Medium — default size for most toggles.
         * Height: 36px (h-9), Padding: 12px horizontal
         */
        md: "h-9 px-3 text-sm gap-2",
        /**
         * Large — prominent toggles for larger touch targets.
         * Height: 40px (h-10), Padding: 16px horizontal
         */
        lg: "h-10 px-4 text-sm gap-2"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var Toggle = React.forwardRef(function Toggle2({
  variant = "default",
  size = "md",
  iconLeft,
  iconRight,
  className,
  children,
  ...rest
}, ref) {
  const iconSizeClass = size === "sm" ? "[&>svg]:size-3.5" : "[&>svg]:size-4";
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.Toggle.Root,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        toggleVariants({ variant, size }),
        iconSizeClass,
        className
      ),
      "data-ds": "",
      "data-ds-component": "toggle",
      "data-ds-variant": variant,
      "data-ds-size": size,
      ...rest,
      children: [
        iconLeft && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0", "aria-hidden": "true", children: iconLeft }),
        children,
        iconRight && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0", "aria-hidden": "true", children: iconRight })
      ]
    }
  );
});
Toggle.displayName = "Toggle";
var ToggleGroupContext = React.createContext({
  variant: "default",
  size: "md"
});
function useToggleGroupContext() {
  return React.useContext(ToggleGroupContext);
}
var toggleGroupVariants = classVarianceAuthority.cva(
  // Base styles — shared across all orientations
  [
    // Layout
    "inline-flex items-center",
    // Gap between items
    "gap-1"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Orientation Variants
      // -----------------------------------------------------------------
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
);
var toggleGroupItemVariants = classVarianceAuthority.cva(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "inline-flex items-center justify-center gap-2",
    // Typography
    "text-sm font-medium leading-5",
    // Shape
    "rounded-md",
    // Transition (uses design system motion tokens)
    "transition-[color,background-color,border-color,box-shadow,opacity]",
    "duration-fast ease-standard",
    // Focus ring — WCAG AA compliant, visible on keyboard navigation only
    chunk3EHT6IOA_cjs.focusRingClasses,
    // Disabled — consistent across all variants
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    // Cursor
    "cursor-pointer",
    // Prevent text selection on rapid clicks
    "select-none",
    // Shrink protection
    "shrink-0"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Visual Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Default — transparent background, fills on press.
         */
        default: [
          "bg-transparent text-muted-foreground",
          "hover:bg-muted hover:text-foreground",
          "data-[state=on]:bg-secondary data-[state=on]:text-foreground"
        ],
        /**
         * Outline — bordered item with visible boundary.
         */
        outline: [
          "border border-border",
          "bg-transparent text-muted-foreground",
          "hover:bg-muted hover:text-foreground",
          "data-[state=on]:bg-secondary data-[state=on]:text-foreground",
          "data-[state=on]:border-border-strong"
        ],
        /**
         * Ghost — minimal visual weight.
         */
        ghost: [
          "bg-transparent text-muted-foreground",
          "hover:bg-muted hover:text-foreground",
          "data-[state=on]:bg-transparent data-[state=on]:text-foreground"
        ]
      },
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — compact for dense UIs, toolbars.
         * Height: 32px (h-8)
         */
        sm: "h-8 px-2 text-xs gap-1.5",
        /**
         * Medium — default size for most toggle groups.
         * Height: 36px (h-9)
         */
        md: "h-9 px-3 text-sm gap-2",
        /**
         * Large — prominent for larger touch targets.
         * Height: 40px (h-10)
         */
        lg: "h-10 px-4 text-sm gap-2"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var ToggleGroup = React.forwardRef(function ToggleGroup2({
  variant = "default",
  size = "md",
  orientation = "horizontal",
  className,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(ToggleGroupContext.Provider, { value: { variant, size }, children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.ToggleGroup.Root,
    {
      ref,
      orientation,
      className: chunk4ON3M3OM_cjs.cn(toggleGroupVariants({ orientation }), className),
      "data-ds": "",
      "data-ds-component": "toggle-group",
      "data-ds-variant": variant,
      "data-ds-size": size,
      "data-ds-orientation": orientation,
      ...rest,
      children
    }
  ) });
});
ToggleGroup.displayName = "ToggleGroup";
var ToggleGroupItem = React.forwardRef(function ToggleGroupItem2({ variant: variantProp, size: sizeProp, className, children, ...rest }, ref) {
  const context = useToggleGroupContext();
  const variant = variantProp ?? context.variant;
  const size = sizeProp ?? context.size;
  const iconSizeClass = size === "sm" ? "[&>svg]:size-3.5" : "[&>svg]:size-4";
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.ToggleGroup.Item,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        toggleGroupItemVariants({ variant, size }),
        iconSizeClass,
        className
      ),
      "data-ds": "",
      "data-ds-component": "toggle-group-item",
      "data-ds-variant": variant,
      "data-ds-size": size,
      ...rest,
      children
    }
  );
});
ToggleGroupItem.displayName = "ToggleGroupItem";
function SunIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "5" }),
        /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "12", y1: "1", x2: "12", y2: "3" }),
        /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "12", y1: "21", x2: "12", y2: "23" }),
        /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "4.22", y1: "4.22", x2: "5.64", y2: "5.64" }),
        /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "18.36", y1: "18.36", x2: "19.78", y2: "19.78" }),
        /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "1", y1: "12", x2: "3", y2: "12" }),
        /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "21", y1: "12", x2: "23", y2: "12" }),
        /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "18.36", y1: "5.64", x2: "19.78", y2: "4.22" }),
        /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "4.22", y1: "19.78", x2: "5.64", y2: "18.36" })
      ]
    }
  );
}
function MoonIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" })
    }
  );
}
function MonitorIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", ry: "2" }),
        /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "8", y1: "21", x2: "16", y2: "21" }),
        /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "12", y1: "17", x2: "12", y2: "21" })
      ]
    }
  );
}
var iconButtonVariants = classVarianceAuthority.cva(
  [
    "inline-flex items-center justify-center",
    "rounded-md",
    "border border-border",
    "bg-secondary text-secondary-foreground",
    "transition-[color,background-color,border-color,box-shadow,opacity,transform]",
    "duration-fast ease-standard",
    "hover:bg-secondary-hover hover:text-foreground",
    "active:scale-[0.97]",
    chunk3EHT6IOA_cjs.focusRingClasses,
    "cursor-pointer",
    "select-none"
  ],
  {
    variants: {
      size: {
        sm: "size-7 [&>svg]:size-3.5",
        md: "size-9 [&>svg]:size-4",
        lg: "size-10 [&>svg]:size-5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var segmentedContainerVariants = classVarianceAuthority.cva(
  [
    "inline-flex items-center",
    "rounded-md",
    "border border-border",
    "bg-muted",
    "p-0.5",
    "gap-0.5"
  ],
  {
    variants: {
      size: {
        sm: "[&>button]:size-6 [&>button>svg]:size-3",
        md: "[&>button]:size-7 [&>button>svg]:size-3.5",
        lg: "[&>button]:size-8 [&>button>svg]:size-4"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var ICON_MAP = {
  light: SunIcon,
  dark: MoonIcon,
  system: MonitorIcon
};
var LABEL_MAP = {
  light: "Light mode",
  dark: "Dark mode",
  system: "System theme"
};
function getNextTheme(current, mode) {
  if (mode === "light-dark") {
    return current === "light" ? "dark" : "light";
  }
  const order = ["light", "dark", "system"];
  const idx = order.indexOf(current);
  return order[(idx + 1) % order.length];
}
var ThemeToggleIcon = React.forwardRef(
  function ThemeToggleIcon2({ value, onChange, mode = "light-dark", size = "md", className, ...rest }, ref) {
    const handleClick = React.useCallback(() => {
      onChange(getNextTheme(value, mode));
    }, [value, mode, onChange]);
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        ref,
        type: "button",
        onClick: handleClick,
        className: chunk4ON3M3OM_cjs.cn(iconButtonVariants({ size }), className),
        "aria-label": `Switch to ${LABEL_MAP[getNextTheme(value, mode)] ?? "next theme"}`,
        "data-ds": "",
        "data-ds-component": "theme-toggle",
        "data-ds-variant": "icon",
        "data-ds-size": size,
        "data-ds-theme-value": value,
        ...rest,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            SunIcon,
            {
              className: chunk4ON3M3OM_cjs.cn(
                "absolute transition-all duration-300",
                value !== "light" && "scale-0 rotate-90 opacity-0"
              )
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            MoonIcon,
            {
              className: chunk4ON3M3OM_cjs.cn(
                "absolute transition-all duration-300",
                value !== "dark" && "scale-0 -rotate-90 opacity-0"
              )
            }
          ),
          mode === "light-dark-system" && /* @__PURE__ */ jsxRuntime.jsx(
            MonitorIcon,
            {
              className: chunk4ON3M3OM_cjs.cn(
                "absolute transition-all duration-300",
                value !== "system" && "scale-0 rotate-90 opacity-0"
              )
            }
          )
        ]
      }
    );
  }
);
ThemeToggleIcon.displayName = "ThemeToggleIcon";
var ThemeToggleSegmented = React.forwardRef(
  function ThemeToggleSegmented2({ value, onChange, mode = "light-dark", size = "md", className }, ref) {
    const options = mode === "light-dark-system" ? ["light", "dark", "system"] : ["light", "dark"];
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        role: "radiogroup",
        "aria-label": "Theme selection",
        className: chunk4ON3M3OM_cjs.cn(segmentedContainerVariants({ size }), className),
        "data-ds": "",
        "data-ds-component": "theme-toggle",
        "data-ds-variant": "segmented",
        "data-ds-size": size,
        "data-ds-theme-value": value,
        children: options.map((option) => {
          const Icon = ICON_MAP[option];
          const isActive = value === option;
          return /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": isActive,
              "aria-label": LABEL_MAP[option],
              onClick: () => onChange(option),
              className: chunk4ON3M3OM_cjs.cn(
                "inline-flex items-center justify-center rounded-sm transition-all duration-fast ease-standard",
                chunk3EHT6IOA_cjs.focusRingClasses,
                isActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              ),
              children: /* @__PURE__ */ jsxRuntime.jsx(Icon, {})
            },
            option
          );
        })
      }
    );
  }
);
ThemeToggleSegmented.displayName = "ThemeToggleSegmented";
var ThemeToggle = React.forwardRef(
  function ThemeToggle2({ variant = "icon", ...rest }, ref) {
    if (variant === "segmented") {
      return /* @__PURE__ */ jsxRuntime.jsx(
        ThemeToggleSegmented,
        {
          ref,
          variant,
          ...rest
        }
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      ThemeToggleIcon,
      {
        ref,
        variant,
        ...rest
      }
    );
  }
);
ThemeToggle.displayName = "ThemeToggle";
function hexToHsl(hex) {
  let r = 0, g = 0, b = 0;
  const h6 = hex.replace("#", "");
  if (h6.length === 3) {
    r = parseInt(h6[0] + h6[0], 16) / 255;
    g = parseInt(h6[1] + h6[1], 16) / 255;
    b = parseInt(h6[2] + h6[2], 16) / 255;
  } else if (h6.length === 6) {
    r = parseInt(h6.slice(0, 2), 16) / 255;
    g = parseInt(h6.slice(2, 4), 16) / 255;
    b = parseInt(h6.slice(4, 6), 16) / 255;
  }
  const max2 = Math.max(r, g, b), min2 = Math.min(r, g, b);
  let hue = 0, sat = 0;
  const lit = (max2 + min2) / 2;
  if (max2 !== min2) {
    const d = max2 - min2;
    sat = lit > 0.5 ? d / (2 - max2 - min2) : d / (max2 + min2);
    switch (max2) {
      case r:
        hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        hue = ((b - r) / d + 2) / 6;
        break;
      case b:
        hue = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(hue * 360),
    s: Math.round(sat * 100),
    l: Math.round(lit * 100)
  };
}
function hslToHex(h, s, l) {
  const sn = s / 100, ln = l / 100;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
function isValidHex(hex) {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex);
}
var DEFAULT_PRESETS = [
  "#000000",
  "#374151",
  "#6b7280",
  "#9ca3af",
  "#d1d5db",
  "#ffffff",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#06b6d4",
  "#6366f1",
  "#a855f7",
  "#f43f5e"
];
var sizeMap = {
  sm: "size-7",
  md: "size-9",
  lg: "size-11"
};
var ColorPicker = React.forwardRef(
  function ColorPicker2({
    value,
    defaultValue = "#000000",
    onChange,
    presets = DEFAULT_PRESETS,
    showInput = true,
    disabled = false,
    size = "md",
    className,
    label = "Choose color"
  }, ref) {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value ?? internalValue;
    const [isOpen, setIsOpen] = React.useState(false);
    const [hexInput, setHexInput] = React.useState(currentValue);
    const popoverRef = React.useRef(null);
    const triggerRef = React.useRef(null);
    const hsl = React.useMemo(() => hexToHsl(currentValue), [currentValue]);
    const [hue, setHue] = React.useState(hsl.h);
    const [sat, setSat] = React.useState(hsl.s);
    const [lit, setLit] = React.useState(hsl.l);
    const [prevValue, setPrevValue] = React.useState(currentValue);
    if (currentValue !== prevValue) {
      setPrevValue(currentValue);
      const parsed = hexToHsl(currentValue);
      setHue(parsed.h);
      setSat(parsed.s);
      setLit(parsed.l);
      setHexInput(currentValue);
    }
    const updateColor = React.useCallback(
      (hex) => {
        if (!value) setInternalValue(hex);
        onChange?.(hex);
        setHexInput(hex);
      },
      [value, onChange]
    );
    const handleHueChange = React.useCallback(
      (newHue) => {
        setHue(newHue);
        updateColor(hslToHex(newHue, sat, lit));
      },
      [sat, lit, updateColor]
    );
    const handleSatLitChange = React.useCallback(
      (newSat, newLit) => {
        setSat(newSat);
        setLit(newLit);
        updateColor(hslToHex(hue, newSat, newLit));
      },
      [hue, updateColor]
    );
    const handleHexInput = React.useCallback(
      (val) => {
        setHexInput(val);
        if (isValidHex(val)) {
          updateColor(val.toLowerCase());
        }
      },
      [updateColor]
    );
    React.useEffect(() => {
      if (!isOpen) return;
      const handler = (e) => {
        if (popoverRef.current && !popoverRef.current.contains(e.target) && triggerRef.current && !triggerRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [isOpen]);
    React.useEffect(() => {
      if (!isOpen) return;
      const handler = (e) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [isOpen]);
    const spectrumRef = React.useRef(null);
    const handleSpectrumPointer = React.useCallback(
      (e) => {
        const rect = spectrumRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = Math.max(
          0,
          Math.min(1, (e.clientX - rect.left) / rect.width)
        );
        const y = Math.max(
          0,
          Math.min(1, (e.clientY - rect.top) / rect.height)
        );
        const newSat = Math.round(x * 100);
        const newLit = Math.round((1 - y) * 100);
        handleSatLitChange(newSat, newLit);
      },
      [handleSatLitChange]
    );
    const handleSpectrumDown = React.useCallback(
      (e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        handleSpectrumPointer(e);
      },
      [handleSpectrumPointer]
    );
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn("relative inline-block", className),
        "data-ds": "",
        "data-ds-component": "color-picker",
        ...disabled ? { "data-ds-disabled": "" } : {},
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              ref: triggerRef,
              type: "button",
              disabled,
              onClick: () => !disabled && setIsOpen(!isOpen),
              className: chunk4ON3M3OM_cjs.cn(
                "rounded-md border border-border shadow-sm transition-shadow",
                "hover:shadow-md disabled:opacity-50 disabled:pointer-events-none",
                sizeMap[size],
                chunk3EHT6IOA_cjs.focusRingClasses
              ),
              style: { backgroundColor: currentValue },
              "aria-label": label,
              "aria-expanded": isOpen,
              "aria-haspopup": "dialog"
            }
          ),
          isOpen && /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              ref: popoverRef,
              className: chunk4ON3M3OM_cjs.cn(
                "absolute z-50 mt-2 w-64 rounded-lg border border-border bg-background p-3 shadow-lg",
                "animate-in fade-in-0 zoom-in-95"
              ),
              role: "dialog",
              "aria-label": "Color picker",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  "div",
                  {
                    ref: spectrumRef,
                    className: "relative h-36 w-full rounded-md cursor-crosshair overflow-hidden mb-3",
                    style: {
                      background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`
                    },
                    onPointerDown: handleSpectrumDown,
                    onPointerMove: (e) => {
                      if (e.buttons > 0) handleSpectrumPointer(e);
                    },
                    "aria-label": "Saturation and lightness",
                    children: /* @__PURE__ */ jsxRuntime.jsx(
                      "div",
                      {
                        className: "absolute size-3.5 rounded-full border-2 border-white shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none",
                        style: {
                          left: `${sat}%`,
                          top: `${100 - lit}%`,
                          backgroundColor: currentValue
                        }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxRuntime.jsx(
                  "input",
                  {
                    type: "range",
                    min: 0,
                    max: 360,
                    value: hue,
                    onChange: (e) => handleHueChange(Number(e.target.value)),
                    className: chunk4ON3M3OM_cjs.cn(
                      "w-full h-3 rounded-full appearance-none cursor-pointer",
                      "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
                    ),
                    style: {
                      background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"
                    },
                    "aria-label": "Hue"
                  }
                ) }),
                showInput && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(
                    "div",
                    {
                      className: "size-8 rounded-md border border-border shrink-0",
                      style: { backgroundColor: currentValue }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    "input",
                    {
                      type: "text",
                      value: hexInput,
                      onChange: (e) => handleHexInput(e.target.value),
                      onBlur: () => {
                        if (!isValidHex(hexInput)) setHexInput(currentValue);
                      },
                      className: chunk4ON3M3OM_cjs.cn(
                        "flex-1 h-8 rounded-md border border-border bg-background px-2.5 text-sm font-mono",
                        "text-foreground placeholder:text-muted-foreground",
                        chunk3EHT6IOA_cjs.focusRingClasses
                      ),
                      placeholder: "#000000",
                      maxLength: 7,
                      "aria-label": "HEX color value"
                    }
                  )
                ] }),
                presets.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-wrap gap-1.5", children: presets.map((preset) => /* @__PURE__ */ jsxRuntime.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => updateColor(preset),
                    className: chunk4ON3M3OM_cjs.cn(
                      "size-6 rounded-md border transition-shadow",
                      currentValue.toLowerCase() === preset.toLowerCase() ? "border-foreground shadow-sm ring-1 ring-foreground/20" : "border-border hover:shadow-sm",
                      chunk3EHT6IOA_cjs.focusRingClasses
                    ),
                    style: { backgroundColor: preset },
                    "aria-label": `Select ${preset}`
                  },
                  preset
                )) })
              ]
            }
          )
        ]
      }
    );
  }
);
ColorPicker.displayName = "ColorPicker";
var defaultClassNames = {
  toast: chunk4ON3M3OM_cjs.cn(
    "group",
    "!rounded-lg !border !border-border !shadow-lg",
    "!bg-background !text-foreground",
    "!font-sans !text-sm"
  ),
  title: "!font-medium !text-foreground",
  description: "!text-muted-foreground !text-[13px]",
  actionButton: chunk4ON3M3OM_cjs.cn(
    "!bg-primary !text-primary-foreground",
    "!rounded-md !px-3 !py-1.5 !text-xs !font-medium",
    "hover:!bg-primary-hover"
  ),
  cancelButton: chunk4ON3M3OM_cjs.cn(
    "!bg-secondary !text-secondary-foreground",
    "!rounded-md !px-3 !py-1.5 !text-xs !font-medium",
    "hover:!bg-secondary-hover"
  ),
  closeButton: chunk4ON3M3OM_cjs.cn(
    "!bg-background !text-muted-foreground !border-border",
    "hover:!bg-muted hover:!text-foreground"
  ),
  success: "!border-success/30 !bg-success/5 [&_[data-title]]:!text-success",
  error: "!border-danger/30 !bg-danger/5 [&_[data-title]]:!text-danger",
  warning: "!border-warning/30 !bg-warning/5 [&_[data-title]]:!text-warning",
  info: "!border-info/30 !bg-info/5 [&_[data-title]]:!text-info"
};
var SonnerToaster = React.forwardRef(
  function SonnerToaster2({
    position = "bottom-right",
    richColors = true,
    closeButton = true,
    duration = 4e3,
    visibleToasts = 3,
    expand = true,
    theme = "system",
    offset = 16,
    gap = 14,
    dir = "auto",
    className,
    toastOptions,
    ...rest
  }, ref) {
    const mergedClassNames = {};
    for (const key of Object.keys(defaultClassNames)) {
      mergedClassNames[key] = chunk4ON3M3OM_cjs.cn(
        defaultClassNames[key],
        toastOptions?.classNames?.[key]
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        "data-ds": "",
        "data-ds-component": "sonner",
        className: chunk4ON3M3OM_cjs.cn(className),
        ...rest,
        children: /* @__PURE__ */ jsxRuntime.jsx(
          sonner.Toaster,
          {
            position,
            richColors,
            closeButton,
            duration,
            visibleToasts,
            expand,
            theme,
            offset,
            gap,
            dir,
            toastOptions: {
              className: toastOptions?.className,
              descriptionClassName: toastOptions?.descriptionClassName,
              style: toastOptions?.style,
              classNames: mergedClassNames
            }
          }
        )
      }
    );
  }
);
SonnerToaster.displayName = "SonnerToaster";
function ChevronRightIcon7({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m9 18 6-6-6-6" })
    }
  );
}
function FileIcon2({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M14 2v4a2 2 0 0 0 2 2h4" })
      ]
    }
  );
}
function FolderIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" })
    }
  );
}
function FolderOpenIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" })
    }
  );
}
function CheckIcon9({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M20 6 9 17l-5-5" })
    }
  );
}
function MinusIcon2({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M5 12h14" })
    }
  );
}
var TreeContext = React.createContext({
  expanded: /* @__PURE__ */ new Set(),
  toggleExpand: () => {
  },
  checkable: false,
  checkedSet: /* @__PURE__ */ new Set(),
  toggleCheck: () => {
  },
  getCheckState: () => "unchecked",
  showLines: true,
  showIcons: true,
  shouldReduce: false
});
function collectAllIds(node) {
  const ids = [node.id];
  if (node.children) {
    for (const child of node.children) {
      ids.push(...collectAllIds(child));
    }
  }
  return ids;
}
function TreeItem({ node, depth }) {
  const {
    expanded,
    toggleExpand,
    checkable,
    checkedSet,
    toggleCheck,
    getCheckState,
    onNodeSelect,
    selectedId,
    showLines,
    showIcons,
    shouldReduce
  } = React.useContext(TreeContext);
  const hasChildren = Boolean(node.children && node.children.length > 0);
  const isExpanded = expanded.has(node.id);
  const isSelected = selectedId === node.id;
  const checkState = checkable ? getCheckState(node) : "unchecked";
  const handleToggle = React.useCallback(() => {
    if (node.disabled) return;
    if (hasChildren) {
      toggleExpand(node.id);
    }
    onNodeSelect?.(node.id);
  }, [node.id, node.disabled, hasChildren, toggleExpand, onNodeSelect]);
  const handleKeyDown = React.useCallback(
    (e) => {
      if (node.disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggle();
      }
      if (e.key === "ArrowRight" && hasChildren && !isExpanded) {
        e.preventDefault();
        toggleExpand(node.id);
      }
      if (e.key === "ArrowLeft" && hasChildren && isExpanded) {
        e.preventDefault();
        toggleExpand(node.id);
      }
    },
    [
      node.id,
      node.disabled,
      hasChildren,
      isExpanded,
      handleToggle,
      toggleExpand
    ]
  );
  const handleCheckClick = React.useCallback(
    (e) => {
      e.stopPropagation();
      if (node.disabled) return;
      toggleCheck(node.id);
    },
    [node.id, node.disabled, toggleCheck]
  );
  let iconNode = null;
  if (node.icon) {
    iconNode = node.icon;
  } else if (showIcons) {
    if (hasChildren) {
      iconNode = isExpanded ? /* @__PURE__ */ jsxRuntime.jsx(FolderOpenIcon, { className: "size-4 text-muted-foreground shrink-0" }) : /* @__PURE__ */ jsxRuntime.jsx(FolderIcon, { className: "size-4 text-muted-foreground shrink-0" });
    } else {
      iconNode = /* @__PURE__ */ jsxRuntime.jsx(FileIcon2, { className: "size-4 text-muted-foreground shrink-0" });
    }
  }
  const motionTransition = shouldReduce ? { duration: 0.01 } : {
    duration: 0.2,
    ease: [0.25, 0.1, 0.25, 1]
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "li",
    {
      role: "treeitem",
      "aria-expanded": hasChildren ? isExpanded : void 0,
      "aria-selected": isSelected,
      "aria-disabled": node.disabled || void 0,
      "data-ds": "",
      "data-ds-component": "tree-item",
      ...isSelected ? { "data-ds-selected": "" } : {},
      ...node.disabled ? { "data-ds-disabled": "" } : {},
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            className: chunk4ON3M3OM_cjs.cn(
              "group/item flex items-center gap-1.5 py-1 px-1.5 rounded-md cursor-pointer select-none",
              "text-sm text-foreground transition-colors duration-fast",
              "hover:bg-muted/50",
              isSelected && "bg-muted text-foreground",
              node.disabled && "opacity-50 pointer-events-none",
              chunk3EHT6IOA_cjs.focusRingClasses
            ),
            style: { paddingLeft: `${depth * 16 + 4}px` },
            onClick: handleToggle,
            onKeyDown: handleKeyDown,
            tabIndex: node.disabled ? -1 : 0,
            children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "inline-flex size-4 items-center justify-center shrink-0", children: hasChildren && /* @__PURE__ */ jsxRuntime.jsx(
                ChevronRightIcon7,
                {
                  className: chunk4ON3M3OM_cjs.cn(
                    "size-3.5 text-muted-foreground transition-transform duration-fast",
                    isExpanded && "rotate-90"
                  )
                }
              ) }),
              checkable && /* @__PURE__ */ jsxRuntime.jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleCheckClick,
                  className: chunk4ON3M3OM_cjs.cn(
                    "inline-flex size-4 shrink-0 items-center justify-center rounded-[3px] border border-border",
                    "transition-colors duration-fast",
                    checkState === "checked" && "bg-primary border-primary text-primary-foreground",
                    checkState === "indeterminate" && "bg-primary border-primary text-primary-foreground",
                    chunk3EHT6IOA_cjs.focusRingClasses
                  ),
                  "aria-checked": checkState === "checked" ? true : checkState === "indeterminate" ? "mixed" : false,
                  "aria-label": `Select ${node.label}`,
                  tabIndex: -1,
                  children: [
                    checkState === "checked" && /* @__PURE__ */ jsxRuntime.jsx(CheckIcon9, { className: "size-3" }),
                    checkState === "indeterminate" && /* @__PURE__ */ jsxRuntime.jsx(MinusIcon2, { className: "size-3" })
                  ]
                }
              ),
              iconNode && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0", children: iconNode }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", children: node.label })
            ]
          }
        ),
        hasChildren && /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { initial: false, children: isExpanded && /* @__PURE__ */ jsxRuntime.jsx(
          framerMotion.motion.ul,
          {
            role: "group",
            initial: { height: 0, opacity: 0, overflow: "hidden" },
            animate: {
              height: "auto",
              opacity: 1,
              overflow: "hidden",
              transitionEnd: { overflow: "visible" }
            },
            exit: { height: 0, opacity: 0, overflow: "hidden" },
            transition: motionTransition,
            className: chunk4ON3M3OM_cjs.cn(
              "relative list-none",
              showLines && "before:absolute before:left-[calc(var(--tree-indent))] before:top-0 before:bottom-2 before:w-px before:bg-border"
            ),
            style: {
              "--tree-indent": `${(depth + 1) * 16 + 10}px`
            },
            children: node.children.map((child) => /* @__PURE__ */ jsxRuntime.jsx(TreeItem, { node: child, depth: depth + 1 }, child.id))
          }
        ) })
      ]
    }
  );
}
var TreeView = React.forwardRef(
  function TreeView2({
    items,
    defaultExpanded = [],
    expanded: expandedProp,
    onExpandedChange,
    checkable = false,
    defaultChecked = [],
    checked: checkedProp,
    onCheckedChange,
    onNodeSelect,
    selectedId,
    showLines = true,
    showIcons = true,
    className
  }, ref) {
    const shouldReduce = framerMotion.useReducedMotion();
    const [internalExpanded, setInternalExpanded] = React.useState(
      () => new Set(defaultExpanded)
    );
    const expanded = expandedProp ? new Set(expandedProp) : internalExpanded;
    const toggleExpand = React.useCallback(
      (id) => {
        const next = new Set(expanded);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        if (!expandedProp) {
          setInternalExpanded(next);
        }
        onExpandedChange?.(Array.from(next));
      },
      [expanded, expandedProp, onExpandedChange]
    );
    const [internalChecked, setInternalChecked] = React.useState(
      () => new Set(defaultChecked)
    );
    const checkedSet = checkedProp ? new Set(checkedProp) : internalChecked;
    const toggleCheck = React.useCallback(
      (id) => {
        function findNode(nodes) {
          for (const n of nodes) {
            if (n.id === id) return n;
            if (n.children) {
              const found = findNode(n.children);
              if (found) return found;
            }
          }
          return null;
        }
        const node = findNode(items);
        if (!node) return;
        const next = new Set(checkedSet);
        const allIds = collectAllIds(node);
        const allChecked = allIds.every((nid) => next.has(nid));
        for (const nid of allIds) {
          if (allChecked) {
            next.delete(nid);
          } else {
            next.add(nid);
          }
        }
        if (!checkedProp) {
          setInternalChecked(next);
        }
        onCheckedChange?.(Array.from(next));
      },
      [items, checkedSet, checkedProp, onCheckedChange]
    );
    const getCheckState = React.useCallback(
      (node) => {
        const allIds = collectAllIds(node);
        const checkedCount = allIds.filter((id) => checkedSet.has(id)).length;
        if (checkedCount === 0) return "unchecked";
        if (checkedCount === allIds.length) return "checked";
        return "indeterminate";
      },
      [checkedSet]
    );
    const ctx = React.useMemo(
      () => ({
        expanded,
        toggleExpand,
        checkable,
        checkedSet,
        toggleCheck,
        getCheckState,
        onNodeSelect,
        selectedId,
        showLines,
        showIcons,
        shouldReduce
      }),
      [
        expanded,
        toggleExpand,
        checkable,
        checkedSet,
        toggleCheck,
        getCheckState,
        onNodeSelect,
        selectedId,
        showLines,
        showIcons,
        shouldReduce
      ]
    );
    return /* @__PURE__ */ jsxRuntime.jsx(TreeContext.Provider, { value: ctx, children: /* @__PURE__ */ jsxRuntime.jsx(
      "ul",
      {
        ref,
        role: "tree",
        className: chunk4ON3M3OM_cjs.cn("list-none text-sm", className),
        "data-ds": "",
        "data-ds-component": "tree-view",
        children: items.map((item) => /* @__PURE__ */ jsxRuntime.jsx(TreeItem, { node: item, depth: 0 }, item.id))
      }
    ) });
  }
);
TreeView.displayName = "TreeView";
var VirtualList = React.forwardRef(function VirtualList2({
  items,
  itemHeight,
  renderItem,
  height = 400,
  overscan = 5,
  getItemKey,
  onEndReached,
  endReachedThreshold = 100,
  loading = false,
  loadingIndicator,
  emptyContent,
  className,
  itemClassName
}, ref) {
  const containerRef = React.useRef(null);
  const [scrollTop, setScrollTop] = React.useState(0);
  const totalHeight = items.length * itemHeight;
  const { startIndex, endIndex, visibleCount } = React.useMemo(() => {
    const visCount = Math.ceil(height / itemHeight);
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const end = Math.min(
      items.length - 1,
      Math.floor(scrollTop / itemHeight) + visCount + overscan
    );
    return { startIndex: start, endIndex: end, visibleCount: visCount };
  }, [scrollTop, height, itemHeight, items.length, overscan]);
  const handleScroll = React.useCallback(
    (e) => {
      const target = e.currentTarget;
      setScrollTop(target.scrollTop);
      if (onEndReached) {
        const distanceFromBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
        if (distanceFromBottom < endReachedThreshold) {
          onEndReached();
        }
      }
    },
    [onEndReached, endReachedThreshold]
  );
  React.useEffect(() => {
    if (!ref) return;
    const node = containerRef.current;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref && "current" in ref) {
      ref.current = node;
    }
  }, [ref]);
  if (items.length === 0 && emptyContent) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref: containerRef,
        className: chunk4ON3M3OM_cjs.cn(
          "flex items-center justify-center rounded-lg border border-border bg-background shadow-sm not-prose",
          className
        ),
        style: { height },
        "data-ds": "",
        "data-ds-component": "virtual-list",
        children: emptyContent
      }
    );
  }
  const visibleItems = [];
  for (let i = startIndex; i <= endIndex && i < items.length; i++) {
    const key = getItemKey ? getItemKey(items[i], i) : i;
    visibleItems.push(
      /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          className: chunk4ON3M3OM_cjs.cn(
            "absolute left-0 right-0 flex items-center",
            "transition-colors duration-fast ease-standard",
            "hover:bg-muted/50",
            "border-b border-border/50",
            "[&_p]:m-0 [&_p]:leading-tight [&_span]:leading-tight",
            itemClassName
          ),
          style: {
            height: itemHeight,
            top: i * itemHeight
          },
          role: "listitem",
          "aria-setsize": items.length,
          "aria-posinset": i + 1,
          children: renderItem(items[i], i)
        },
        key
      )
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref: containerRef,
      className: chunk4ON3M3OM_cjs.cn(
        "relative overflow-auto rounded-lg border border-border bg-background",
        "shadow-sm not-prose",
        "[scrollbar-width:thin] [scrollbar-color:hsl(var(--border))_transparent]",
        "[&::-webkit-scrollbar]:w-1.5",
        "[&::-webkit-scrollbar-track]:bg-transparent",
        "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border",
        className
      ),
      style: { height },
      onScroll: handleScroll,
      role: "list",
      "data-ds": "",
      "data-ds-component": "virtual-list",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative w-full", style: { height: totalHeight }, children: visibleItems }),
        loading && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "sticky bottom-0 flex items-center justify-center py-3 bg-background/80 backdrop-blur-sm border-t border-border/50", children: loadingIndicator ?? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "size-5 animate-spin rounded-full border-2 border-border border-t-primary" }) })
      ]
    }
  );
});
function XIcon6({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
function ChevronLeftIcon3({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m15 18-6-6 6-6" })
    }
  );
}
function ChevronRightIcon8({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m9 18 6-6-6-6" })
    }
  );
}
function ZoomInIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m21 21-4.3-4.3" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M11 8v6" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M8 11h6" })
      ]
    }
  );
}
function ZoomOutIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m21 21-4.3-4.3" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M8 11h6" })
      ]
    }
  );
}
function Lightbox({
  images,
  initialIndex,
  onClose
}) {
  const [current, setCurrent] = React.useState(initialIndex);
  const [zoomed, setZoomed] = React.useState(false);
  const shouldReduce = framerMotion.useReducedMotion();
  const goTo = React.useCallback(
    (i) => {
      setCurrent((i % images.length + images.length) % images.length);
      setZoomed(false);
    },
    [images.length]
  );
  const prev = React.useCallback(() => goTo(current - 1), [current, goTo]);
  const next = React.useCallback(() => goTo(current + 1), [current, goTo]);
  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);
  const image = images[current];
  const transition = shouldReduce ? { duration: 0.01 } : { duration: 0.25, ease: "easeOut" };
  return reactDom.createPortal(
    /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        className: "fixed inset-0 z-50 flex flex-col",
        "data-ds": "",
        "data-ds-component": "image-gallery-lightbox",
        role: "dialog",
        "aria-label": `Image ${current + 1} of ${images.length}`,
        "aria-modal": "true",
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            framerMotion.motion.div,
            {
              className: "absolute inset-0 bg-black/90",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition,
              onClick: onClose
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative z-10 flex items-center justify-between px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-sm text-white/70 font-medium", children: [
              current + 1,
              " / ",
              images.length
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setZoomed(!zoomed),
                  className: "inline-flex size-9 items-center justify-center rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors",
                  "aria-label": zoomed ? "Zoom out" : "Zoom in",
                  children: zoomed ? /* @__PURE__ */ jsxRuntime.jsx(ZoomOutIcon, { className: "size-4" }) : /* @__PURE__ */ jsxRuntime.jsx(ZoomInIcon, { className: "size-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "inline-flex size-9 items-center justify-center rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors",
                  "aria-label": "Close gallery",
                  children: /* @__PURE__ */ jsxRuntime.jsx(XIcon6, { className: "size-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative z-10 flex-1 flex items-center justify-center px-12 min-h-0", children: [
            images.length > 1 && /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                onClick: prev,
                className: "absolute left-3 z-10 inline-flex size-10 items-center justify-center rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-white transition-colors",
                "aria-label": "Previous image",
                children: /* @__PURE__ */ jsxRuntime.jsx(ChevronLeftIcon3, { className: "size-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntime.jsx(
              framerMotion.motion.img,
              {
                src: image.src,
                alt: image.alt,
                className: chunk4ON3M3OM_cjs.cn(
                  "max-h-full max-w-full object-contain select-none transition-transform duration-200",
                  zoomed ? "cursor-zoom-out scale-150" : "cursor-zoom-in"
                ),
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.95 },
                transition,
                onClick: () => setZoomed(!zoomed),
                draggable: false
              },
              current
            ) }),
            images.length > 1 && /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                onClick: next,
                className: "absolute right-3 z-10 inline-flex size-10 items-center justify-center rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-white transition-colors",
                "aria-label": "Next image",
                children: /* @__PURE__ */ jsxRuntime.jsx(ChevronRightIcon8, { className: "size-5" })
              }
            )
          ] }),
          image.caption && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative z-10 text-center py-2 px-4", children: /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-white/70", children: image.caption }) }),
          images.length > 1 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative z-10 flex items-center justify-center gap-1.5 py-3 px-4 overflow-x-auto", children: images.map((img, i) => /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              onClick: () => goTo(i),
              className: chunk4ON3M3OM_cjs.cn(
                "shrink-0 size-12 rounded-md overflow-hidden border-2 transition-all",
                i === current ? "border-white opacity-100" : "border-transparent opacity-50 hover:opacity-80"
              ),
              "aria-label": `Go to image ${i + 1}`,
              "aria-current": i === current ? "true" : void 0,
              children: /* @__PURE__ */ jsxRuntime.jsx(
                "img",
                {
                  src: img.thumbnail ?? img.src,
                  alt: "",
                  className: "size-full object-cover",
                  draggable: false
                }
              )
            },
            `thumb-${img.src}`
          )) })
        ]
      }
    ),
    document.body
  );
}
var colsMap = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4"
};
var aspectMap = {
  square: "aspect-square",
  video: "aspect-video",
  auto: ""
};
var ImageGallery = React.forwardRef(
  function ImageGallery2({
    images,
    columns = 3,
    gap = 8,
    aspectRatio = "square",
    lightbox = true,
    className,
    renderThumbnail
  }, ref) {
    const [lightboxIndex, setLightboxIndex] = React.useState(null);
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          ref,
          className: chunk4ON3M3OM_cjs.cn("not-prose grid", colsMap[columns], className),
          style: { gap },
          "data-ds": "",
          "data-ds-component": "image-gallery",
          role: "group",
          "aria-label": "Image gallery",
          children: images.map((image, index) => /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              onClick: () => lightbox && setLightboxIndex(index),
              className: chunk4ON3M3OM_cjs.cn(
                "block overflow-hidden rounded-lg border border-border bg-muted p-0",
                "transition-shadow hover:shadow-md",
                lightbox && "cursor-pointer",
                !lightbox && "cursor-default",
                aspectMap[aspectRatio],
                chunk3EHT6IOA_cjs.focusRingClasses
              ),
              "aria-label": image.alt,
              disabled: !lightbox,
              children: renderThumbnail ? renderThumbnail(image, index) : /* @__PURE__ */ jsxRuntime.jsx(
                "img",
                {
                  src: image.thumbnail ?? image.src,
                  alt: image.alt,
                  className: "block size-full object-cover",
                  loading: "lazy",
                  draggable: false
                }
              )
            },
            `gallery-${image.src}`
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { children: lightboxIndex !== null && /* @__PURE__ */ jsxRuntime.jsx(
        Lightbox,
        {
          images,
          initialIndex: lightboxIndex,
          onClose: () => setLightboxIndex(null)
        }
      ) })
    ] });
  }
);
ImageGallery.displayName = "ImageGallery";
function PlayIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M8 5v14l11-7z" })
    }
  );
}
function PauseIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z" })
    }
  );
}
function VolumeIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M15.54 8.46a5 5 0 0 1 0 7.07" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14" })
      ]
    }
  );
}
function VolumeMuteIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }),
        /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "23", y1: "9", x2: "17", y2: "15" }),
        /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "17", y1: "9", x2: "23", y2: "15" })
      ]
    }
  );
}
function FullscreenIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M8 3H5a2 2 0 0 0-2 2v3" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M21 8V5a2 2 0 0 0-2-2h-3" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M3 16v3a2 2 0 0 0 2 2h3" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M16 21h3a2 2 0 0 0 2-2v-3" })
      ]
    }
  );
}
function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
var aspectMap2 = {
  video: "aspect-video",
  square: "aspect-square",
  "4/3": "aspect-4/3",
  auto: ""
};
var VideoPlayer = React.forwardRef(
  function VideoPlayer2({
    src,
    poster,
    aspectRatio = "video",
    autoPlay = false,
    loop = false,
    muted: mutedProp = false,
    controls = true,
    className,
    onEnded
  }, ref) {
    const videoRef = React.useRef(null);
    const wrapperRef = React.useRef(null);
    const [playing, setPlaying] = React.useState(autoPlay);
    const [isMuted, setIsMuted] = React.useState(mutedProp);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [showControls, setShowControls] = React.useState(true);
    const hideTimer = React.useRef(null);
    const progress = duration > 0 ? currentTime / duration * 100 : 0;
    const resetHideTimer = React.useCallback(() => {
      setShowControls(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (playing) {
        hideTimer.current = setTimeout(() => setShowControls(false), 3e3);
      }
    }, [playing]);
    React.useEffect(() => {
      return () => {
        if (hideTimer.current) clearTimeout(hideTimer.current);
      };
    }, []);
    const togglePlay = React.useCallback(() => {
      const video = videoRef.current;
      if (!video) return;
      if (video.paused) {
        video.play();
        setPlaying(true);
      } else {
        video.pause();
        setPlaying(false);
      }
      resetHideTimer();
    }, [resetHideTimer]);
    const toggleMute = React.useCallback(() => {
      const video = videoRef.current;
      if (!video) return;
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }, []);
    const handleSeek = React.useCallback(
      (e) => {
        const video = videoRef.current;
        if (!video) return;
        const time = Number(e.target.value) / 100 * duration;
        video.currentTime = time;
        setCurrentTime(time);
      },
      [duration]
    );
    const toggleFullscreen = React.useCallback(() => {
      const el = wrapperRef.current;
      if (!el) return;
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        el.requestFullscreen();
      }
    }, []);
    const handleKeyDown = React.useCallback(
      (e) => {
        if (e.key === " " || e.key === "k") {
          e.preventDefault();
          togglePlay();
        }
        if (e.key === "m") toggleMute();
        if (e.key === "f") toggleFullscreen();
        if (e.key === "ArrowRight" && videoRef.current) {
          videoRef.current.currentTime = Math.min(duration, currentTime + 5);
        }
        if (e.key === "ArrowLeft" && videoRef.current) {
          videoRef.current.currentTime = Math.max(0, currentTime - 5);
        }
      },
      [togglePlay, toggleMute, toggleFullscreen, duration, currentTime]
    );
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref: (node) => {
          wrapperRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            ref.current = node;
        },
        className: chunk4ON3M3OM_cjs.cn(
          "relative group overflow-hidden rounded-lg border border-border bg-black",
          aspectMap2[aspectRatio],
          chunk3EHT6IOA_cjs.focusRingClasses,
          className
        ),
        onMouseMove: resetHideTimer,
        onMouseEnter: () => setShowControls(true),
        onKeyDown: handleKeyDown,
        tabIndex: 0,
        "data-ds": "",
        "data-ds-component": "video-player",
        role: "region",
        "aria-label": "Video player",
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "video",
            {
              ref: videoRef,
              src,
              poster,
              autoPlay,
              loop,
              muted: mutedProp,
              playsInline: true,
              className: "size-full object-contain",
              onClick: togglePlay,
              onTimeUpdate: () => setCurrentTime(videoRef.current?.currentTime ?? 0),
              onLoadedMetadata: () => setDuration(videoRef.current?.duration ?? 0),
              onEnded: () => {
                setPlaying(false);
                onEnded?.();
              },
              onPlay: () => setPlaying(true),
              onPause: () => setPlaying(false)
            }
          ),
          !playing && /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              onClick: togglePlay,
              className: "absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity",
              "aria-label": "Play video",
              children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "inline-flex size-16 items-center justify-center rounded-full bg-white/90 text-black shadow-lg", children: /* @__PURE__ */ jsxRuntime.jsx(PlayIcon, { className: "size-8 ml-1" }) })
            }
          ),
          controls && /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              className: chunk4ON3M3OM_cjs.cn(
                "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 transition-opacity duration-200",
                showControls ? "opacity-100" : "opacity-0 pointer-events-none"
              ),
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  "input",
                  {
                    type: "range",
                    min: 0,
                    max: 100,
                    value: progress,
                    onChange: handleSeek,
                    className: "w-full h-1 mb-2 cursor-pointer appearance-none rounded-full bg-white/30 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white",
                    "aria-label": "Seek"
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: togglePlay,
                        className: "inline-flex size-8 items-center justify-center text-white/90 hover:text-white transition-colors",
                        "aria-label": playing ? "Pause" : "Play",
                        children: playing ? /* @__PURE__ */ jsxRuntime.jsx(PauseIcon, { className: "size-4" }) : /* @__PURE__ */ jsxRuntime.jsx(PlayIcon, { className: "size-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: toggleMute,
                        className: "inline-flex size-8 items-center justify-center text-white/90 hover:text-white transition-colors",
                        "aria-label": isMuted ? "Unmute" : "Mute",
                        children: isMuted ? /* @__PURE__ */ jsxRuntime.jsx(VolumeMuteIcon, { className: "size-4" }) : /* @__PURE__ */ jsxRuntime.jsx(VolumeIcon, { className: "size-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-xs text-white/70 font-mono tabular-nums", children: [
                      formatTime(currentTime),
                      " / ",
                      formatTime(duration)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: toggleFullscreen,
                      className: "inline-flex size-8 items-center justify-center text-white/90 hover:text-white transition-colors",
                      "aria-label": "Toggle fullscreen",
                      children: /* @__PURE__ */ jsxRuntime.jsx(FullscreenIcon, { className: "size-4" })
                    }
                  )
                ] })
              ]
            }
          )
        ]
      }
    );
  }
);
VideoPlayer.displayName = "VideoPlayer";
var chartColors = [
  "var(--primary)",
  "var(--info)",
  "var(--success)",
  "var(--warning)",
  "var(--danger)",
  "var(--secondary)",
  "var(--muted-foreground)",
  "oklch(0.65 0.15 250)",
  // sky
  "oklch(0.65 0.15 160)",
  // emerald
  "oklch(0.65 0.15 30)"
  // amber
];
var ChartContainer = React.forwardRef(
  function ChartContainer2({
    title,
    description,
    height = 350,
    children,
    footer,
    loading = false,
    loadingIndicator,
    emptyContent,
    className
  }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(
          "rounded-lg border border-border bg-background p-4",
          className
        ),
        "data-ds": "",
        "data-ds-component": "chart",
        children: [
          (title || description) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mb-4 space-y-1", children: [
            title && /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "text-base font-semibold text-foreground", children: title }),
            description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: description })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative", style: { height }, children: loading ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: loadingIndicator ?? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "size-6 animate-spin rounded-full border-2 border-border border-t-primary" }) }) : emptyContent ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute inset-0 flex items-center justify-center text-sm text-muted-foreground", children: emptyContent }) : children }),
          footer && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-4 border-t border-border pt-3 text-sm text-muted-foreground", children: footer })
        ]
      }
    );
  }
);
ChartContainer.displayName = "ChartContainer";
function ChartTooltipContent({
  label,
  payload,
  active,
  formatter,
  className
}) {
  if (!active || !payload?.length) return null;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: chunk4ON3M3OM_cjs.cn(
        "rounded-lg border border-border bg-background px-3 py-2 shadow-lg",
        "text-sm",
        className
      ),
      children: [
        label && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "font-medium text-foreground mb-1", children: label }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-0.5", children: payload.map((entry) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              className: "size-2.5 rounded-full shrink-0",
              style: { backgroundColor: entry.color ?? entry.fill }
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-muted-foreground", children: [
            entry.name,
            ":"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium text-foreground ml-auto tabular-nums", children: formatter ? formatter(entry.value, entry.name) : entry.value })
        ] }, entry.name)) })
      ]
    }
  );
}
ChartTooltipContent.displayName = "ChartTooltipContent";
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function parseInline(text2) {
  return text2.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="rounded-md max-w-full" loading="lazy" />'
  ).replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-primary underline underline-offset-2 hover:text-primary-hover" target="_blank" rel="noopener noreferrer">$1</a>'
  ).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/__(.+?)__/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/_(.+?)_/g, "<em>$1</em>").replace(/~~(.+?)~~/g, "<del>$1</del>").replace(
    /`([^`]+)`/g,
    '<code class="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.875em]">$1</code>'
  );
}
function parseMarkdown(input, allowHtml) {
  const lines = input.split("\n");
  const output = [];
  let inCodeBlock = false;
  let codeBuffer = [];
  let inList = false;
  let listType = "ul";
  function closeList() {
    if (inList) {
      output.push(`</${listType}>`);
      inList = false;
    }
  }
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        output.push(
          `<pre class="rounded-lg bg-muted p-4 overflow-x-auto text-sm font-mono"><code>${escapeHtml(codeBuffer.join("\n"))}</code></pre>`
        );
        codeBuffer = [];
        inCodeBlock = false;
        continue;
      }
      closeList();
      inCodeBlock = true;
      line.slice(3).trim();
      continue;
    }
    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }
    const safeLine = allowHtml ? line : escapeHtml(line);
    const trimmed = safeLine.trim();
    if (trimmed === "") {
      closeList();
      continue;
    }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      closeList();
      output.push('<hr class="border-border my-4" />');
      continue;
    }
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      closeList();
      const level = headingMatch[1].length;
      const text2 = parseInline(headingMatch[2]);
      const hClasses = {
        1: "text-2xl font-bold mt-6 mb-3",
        2: "text-xl font-semibold mt-5 mb-2",
        3: "text-lg font-semibold mt-4 mb-2",
        4: "text-base font-semibold mt-3 mb-1",
        5: "text-sm font-semibold mt-3 mb-1",
        6: "text-sm font-medium mt-3 mb-1 text-muted-foreground"
      };
      output.push(
        `<h${level} class="${hClasses[level] || ""}">${text2}</h${level}>`
      );
      continue;
    }
    if (trimmed.startsWith("&gt; ") || trimmed.startsWith("> ")) {
      closeList();
      const quoteText = trimmed.replace(/^(&gt;\s?|>\s?)/, "");
      output.push(
        `<blockquote class="border-l-2 border-border pl-4 text-muted-foreground italic my-3">${parseInline(quoteText)}</blockquote>`
      );
      continue;
    }
    const ulMatch = trimmed.match(/^[-*+]\s+(.+)$/);
    if (ulMatch) {
      if (!inList || listType !== "ul") {
        closeList();
        output.push('<ul class="list-disc pl-6 my-2 space-y-1">');
        inList = true;
        listType = "ul";
      }
      output.push(`<li>${parseInline(ulMatch[1])}</li>`);
      continue;
    }
    const olMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      if (!inList || listType !== "ol") {
        closeList();
        output.push('<ol class="list-decimal pl-6 my-2 space-y-1">');
        inList = true;
        listType = "ol";
      }
      output.push(`<li>${parseInline(olMatch[1])}</li>`);
      continue;
    }
    closeList();
    output.push(`<p class="my-2 leading-relaxed">${parseInline(trimmed)}</p>`);
  }
  closeList();
  if (inCodeBlock) {
    output.push(
      `<pre class="rounded-lg bg-muted p-4 overflow-x-auto text-sm font-mono"><code>${escapeHtml(codeBuffer.join("\n"))}</code></pre>`
    );
  }
  return output.join("\n");
}
var sizeClasses2 = {
  sm: "text-sm [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base",
  base: "text-base",
  lg: "text-lg [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl"
};
var Markdown = React.forwardRef(
  function Markdown2({ content, size = "base", fluid = false, className, allowHtml = false }, ref) {
    const html = React.useMemo(
      () => parseMarkdown(content, allowHtml),
      [content, allowHtml]
    );
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(
          "text-foreground",
          sizeClasses2[size],
          !fluid && "max-w-prose",
          className
        ),
        "data-ds": "",
        "data-ds-component": "markdown",
        dangerouslySetInnerHTML: { __html: html }
      }
    );
  }
);
Markdown.displayName = "Markdown";
function SearchIcon4({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m21 21-4.3-4.3" })
      ]
    }
  );
}
function XIcon7({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 6 12 12" })
      ]
    }
  );
}
function ColumnsIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        /* @__PURE__ */ jsxRuntime.jsx("rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }),
        /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "12", x2: "12", y1: "3", y2: "21" }),
        /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "3", x2: "21", y1: "12", y2: "12" })
      ]
    }
  );
}
function FilterIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" })
    }
  );
}
var DataTableToolbar = React.forwardRef(function DataTableToolbar2({
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  searchDebounce = 300,
  filters,
  onFilterChange,
  onClearFilters,
  columns,
  onColumnVisibilityChange,
  viewMode,
  viewModes,
  onViewModeChange,
  actions,
  className
}, ref) {
  const [localSearch, setLocalSearch] = React.useState(searchValue);
  const [prevSearchValue, setPrevSearchValue] = React.useState(searchValue);
  if (searchValue !== prevSearchValue) {
    setPrevSearchValue(searchValue);
    setLocalSearch(searchValue);
  }
  const debounceTimer = React.useRef(null);
  const handleSearchChange = React.useCallback(
    (value) => {
      setLocalSearch(value);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        onSearchChange?.(value);
      }, searchDebounce);
    },
    [onSearchChange, searchDebounce]
  );
  React.useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);
  const [openFilter, setOpenFilter] = React.useState(null);
  const [showColumns, setShowColumns] = React.useState(false);
  const hasActiveFilters = filters?.some((f) => f.selected.length > 0) ?? false;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn("flex flex-wrap items-center gap-2", className),
      "data-ds": "",
      "data-ds-component": "data-table-toolbar",
      children: [
        onSearchChange && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative flex-1 min-w-[200px] max-w-sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx(SearchIcon4, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "input",
            {
              type: "text",
              value: localSearch,
              onChange: (e) => handleSearchChange(e.target.value),
              placeholder: searchPlaceholder,
              className: chunk4ON3M3OM_cjs.cn(
                "h-9 w-full rounded-md border border-border bg-background pl-9 pr-8 text-sm",
                "text-foreground placeholder:text-muted-foreground",
                "transition-colors duration-fast",
                chunk3EHT6IOA_cjs.focusRingClasses
              ),
              "aria-label": "Search table"
            }
          ),
          localSearch && /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleSearchChange(""),
              className: "absolute right-2 top-1/2 -translate-y-1/2 inline-flex size-5 items-center justify-center rounded text-muted-foreground hover:text-foreground",
              "aria-label": "Clear search",
              children: /* @__PURE__ */ jsxRuntime.jsx(XIcon7, { className: "size-3.5" })
            }
          )
        ] }),
        filters?.map((filter) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setOpenFilter(openFilter === filter.id ? null : filter.id),
              className: chunk4ON3M3OM_cjs.cn(
                "inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm transition-colors",
                filter.selected.length > 0 ? "border-primary/30 bg-primary/5 text-foreground" : "border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted",
                chunk3EHT6IOA_cjs.focusRingClasses
              ),
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(FilterIcon, { className: "size-3.5" }),
                filter.label,
                filter.selected.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ml-1 inline-flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[11px] font-medium", children: filter.selected.length })
              ]
            }
          ),
          openFilter === filter.id && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute top-full left-0 z-50 mt-1 w-52 rounded-lg border border-border bg-background p-1 shadow-lg", children: filter.options.map((opt) => {
            const isSelected = filter.selected.includes(opt.value);
            return /* @__PURE__ */ jsxRuntime.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  const next = isSelected ? filter.selected.filter((v) => v !== opt.value) : [...filter.selected, opt.value];
                  onFilterChange?.(filter.id, next);
                },
                className: chunk4ON3M3OM_cjs.cn(
                  "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors",
                  "hover:bg-muted text-foreground"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(
                    "div",
                    {
                      className: chunk4ON3M3OM_cjs.cn(
                        "size-4 rounded border flex items-center justify-center shrink-0",
                        isSelected ? "bg-primary border-primary text-primary-foreground" : "border-border"
                      ),
                      children: isSelected && /* @__PURE__ */ jsxRuntime.jsx(
                        "svg",
                        {
                          className: "size-3",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "3",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M20 6 9 17l-5-5" })
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex-1 text-left", children: opt.label }),
                  opt.count !== void 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs text-muted-foreground tabular-nums", children: opt.count })
                ]
              },
              opt.value
            );
          }) })
        ] }, filter.id)),
        hasActiveFilters && onClearFilters && /* @__PURE__ */ jsxRuntime.jsxs(
          "button",
          {
            type: "button",
            onClick: onClearFilters,
            className: "inline-flex h-9 items-center gap-1 rounded-md px-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(XIcon7, { className: "size-3.5" }),
              "Clear"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1" }),
        columns && onColumnVisibilityChange && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowColumns(!showColumns),
              className: chunk4ON3M3OM_cjs.cn(
                "inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-sm text-muted-foreground",
                "hover:text-foreground hover:bg-muted transition-colors",
                chunk3EHT6IOA_cjs.focusRingClasses
              ),
              "aria-label": "Toggle column visibility",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(ColumnsIcon, { className: "size-3.5" }),
                "Columns"
              ]
            }
          ),
          showColumns && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute top-full right-0 z-50 mt-1 w-48 rounded-lg border border-border bg-background p-1 shadow-lg", children: columns.map((col) => /* @__PURE__ */ jsxRuntime.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onColumnVisibilityChange(col.id, !col.visible),
              className: "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm hover:bg-muted text-foreground transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  "div",
                  {
                    className: chunk4ON3M3OM_cjs.cn(
                      "size-4 rounded border flex items-center justify-center shrink-0",
                      col.visible ? "bg-primary border-primary text-primary-foreground" : "border-border"
                    ),
                    children: col.visible && /* @__PURE__ */ jsxRuntime.jsx(
                      "svg",
                      {
                        className: "size-3",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "3",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M20 6 9 17l-5-5" })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx("span", { children: col.label })
              ]
            },
            col.id
          )) })
        ] }),
        viewModes && viewMode && onViewModeChange && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "inline-flex h-9 items-center rounded-md border border-border bg-background p-0.5", children: viewModes.map((mode) => /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            onClick: () => onViewModeChange(mode),
            className: chunk4ON3M3OM_cjs.cn(
              "inline-flex h-7 items-center justify-center rounded-[5px] px-2.5 text-xs font-medium capitalize transition-colors",
              viewMode === mode ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            ),
            "aria-label": `${mode} view`,
            "aria-pressed": viewMode === mode,
            children: mode
          },
          mode
        )) }),
        actions
      ]
    }
  );
});
DataTableToolbar.displayName = "DataTableToolbar";
var InfiniteScroll = React.forwardRef(
  function InfiniteScroll2({
    children,
    loading = false,
    hasMore = true,
    onLoadMore,
    threshold = "200px",
    loadingIndicator,
    endMessage,
    className,
    sentinelClassName
  }, ref) {
    const sentinelRef = React.useRef(null);
    const onLoadMoreRef = React.useRef(onLoadMore);
    React.useEffect(() => {
      onLoadMoreRef.current = onLoadMore;
    }, [onLoadMore]);
    React.useEffect(() => {
      const sentinel = sentinelRef.current;
      if (!sentinel || !hasMore || loading) return;
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting) {
            onLoadMoreRef.current();
          }
        },
        {
          rootMargin: `0px 0px ${threshold} 0px`,
          threshold: 0
        }
      );
      observer.observe(sentinel);
      return () => observer.disconnect();
    }, [hasMore, loading, threshold]);
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn(className),
        "data-ds": "",
        "data-ds-component": "infinite-scroll",
        "aria-busy": loading || void 0,
        children: [
          children,
          hasMore && /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              ref: sentinelRef,
              className: chunk4ON3M3OM_cjs.cn("w-full", sentinelClassName),
              "aria-hidden": "true"
            }
          ),
          loading && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center py-4", children: loadingIndicator ?? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "size-4 animate-spin rounded-full border-2 border-border border-t-primary" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Loading more..." })
          ] }) }),
          !hasMore && !loading && endMessage && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "py-4", children: endMessage })
        ]
      }
    );
  }
);
InfiniteScroll.displayName = "InfiniteScroll";
function TooltipProvider({
  children,
  delayDuration = 300,
  skipDelayDuration = 100,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Tooltip.Provider,
    {
      delayDuration,
      skipDelayDuration,
      ...rest,
      children
    }
  );
}
TooltipProvider.displayName = "TooltipProvider";
var TooltipContent = React.forwardRef(function TooltipContent2({
  className,
  showArrow = true,
  maxWidth = 220,
  sideOffset = 6,
  children,
  ...rest
}, ref) {
  const shouldReduce = framerMotion.useReducedMotion();
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Tooltip.Content,
    {
      ref,
      sideOffset,
      asChild: true,
      ...rest,
      children: /* @__PURE__ */ jsxRuntime.jsxs(
        framerMotion.motion.div,
        {
          className: chunk4ON3M3OM_cjs.cn(
            // Layout
            "z-[var(--z-tooltip)]",
            "px-3 py-1.5",
            "overflow-hidden",
            // Visual
            "rounded-md",
            "border border-border",
            "bg-foreground text-background",
            "shadow-md",
            // Typography
            "text-xs leading-4",
            className
          ),
          style: { maxWidth },
          variants: shouldReduce ? void 0 : chunkF4JJFWWU_cjs.fadeInFast.variants,
          initial: shouldReduce ? { opacity: 0 } : "initial",
          animate: shouldReduce ? { opacity: 1 } : "animate",
          exit: shouldReduce ? { opacity: 0 } : "exit",
          transition: shouldReduce ? { duration: 0.1 } : chunkF4JJFWWU_cjs.fadeInFast.transition,
          "data-ds": "",
          "data-ds-component": "tooltip",
          "data-ds-animated": "",
          children: [
            children,
            showArrow && /* @__PURE__ */ jsxRuntime.jsx(
              radixUi.Tooltip.Arrow,
              {
                className: "fill-foreground",
                width: 8,
                height: 4
              }
            )
          ]
        }
      )
    }
  );
});
TooltipContent.displayName = "TooltipContent";
var Tooltip = React.forwardRef(
  function Tooltip2({
    content,
    children,
    side = "top",
    align = "center",
    sideOffset = 6,
    arrow = true,
    maxWidth = 220,
    delayDuration,
    open,
    onOpenChange,
    contentClassName
  }, _ref) {
    if (!content) {
      return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children });
    }
    return /* @__PURE__ */ jsxRuntime.jsxs(
      radixUi.Tooltip.Root,
      {
        open,
        onOpenChange,
        delayDuration,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(radixUi.Tooltip.Trigger, { asChild: true, children }),
          /* @__PURE__ */ jsxRuntime.jsx(radixUi.Tooltip.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
            TooltipContent,
            {
              side,
              align,
              sideOffset,
              showArrow: arrow,
              maxWidth,
              className: contentClassName,
              children: content
            }
          ) })
        ]
      }
    );
  }
);
Tooltip.displayName = "Tooltip";
var VisuallyHidden = React.forwardRef(function VisuallyHidden2(props, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.VisuallyHidden.Root,
    {
      ref,
      "data-ds": "",
      "data-ds-component": "visually-hidden",
      ...props
    }
  );
});
VisuallyHidden.displayName = "VisuallyHidden";
/*! Bundled license information:

@tanstack/table-core/build/lib/index.mjs:
  (**
     * table-core
     *
     * Copyright (c) TanStack
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.md file in the root directory of this source tree.
     *
     * @license MIT
     *)

@tanstack/react-table/build/lib/index.mjs:
  (**
     * react-table
     *
     * Copyright (c) TanStack
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.md file in the root directory of this source tree.
     *
     * @license MIT
     *)
*/

Object.defineProperty(exports, "toast", {
  enumerable: true,
  get: function () { return sonner.toast; }
});
exports.Accordion = Accordion;
exports.AccordionContent = AccordionContent;
exports.AccordionItem = AccordionItem;
exports.AccordionTrigger = AccordionTrigger;
exports.Alert = Alert;
exports.AlertDialog = AlertDialog;
exports.AlertDialogAction = AlertDialogAction;
exports.AlertDialogCancel = AlertDialogCancel;
exports.AlertDialogContent = AlertDialogContent;
exports.AlertDialogDescription = AlertDialogDescription;
exports.AlertDialogFooter = AlertDialogFooter;
exports.AlertDialogHeader = AlertDialogHeader;
exports.AlertDialogOverlay = AlertDialogOverlay;
exports.AlertDialogPortal = AlertDialogPortal;
exports.AlertDialogTitle = AlertDialogTitle;
exports.AlertDialogTrigger = AlertDialogTrigger;
exports.AspectRatio = AspectRatio;
exports.Avatar = Avatar;
exports.AvatarGroup = AvatarGroup;
exports.Badge = Badge;
exports.Banner = Banner;
exports.Breadcrumb = Breadcrumb;
exports.BreadcrumbEllipsis = BreadcrumbEllipsis;
exports.BreadcrumbItem = BreadcrumbItem;
exports.BreadcrumbLink = BreadcrumbLink;
exports.BreadcrumbList = BreadcrumbList;
exports.BreadcrumbNav = BreadcrumbNav;
exports.BreadcrumbPage = BreadcrumbPage;
exports.BreadcrumbSeparator = BreadcrumbSeparator;
exports.Button = Button;
exports.Calendar = Calendar;
exports.Callout = Callout;
exports.Card = Card;
exports.CardBody = CardBody;
exports.CardFooter = CardFooter;
exports.CardHeader = CardHeader;
exports.Carousel = Carousel;
exports.ChartContainer = ChartContainer;
exports.ChartTooltipContent = ChartTooltipContent;
exports.Checkbox = Checkbox;
exports.CheckboxGroup = CheckboxGroup;
exports.CodeBlock = CodeBlock;
exports.Collapsible = Collapsible;
exports.CollapsibleContent = CollapsibleContent;
exports.CollapsibleTrigger = CollapsibleTrigger;
exports.ColorPicker = ColorPicker;
exports.Combobox = Combobox;
exports.Command = Command;
exports.CommandTrigger = CommandTrigger;
exports.ConfirmDialog = ConfirmDialog;
exports.ContextMenu = ContextMenu;
exports.ContextMenuCheckboxItem = ContextMenuCheckboxItem;
exports.ContextMenuContent = ContextMenuContent;
exports.ContextMenuGroup = ContextMenuGroup;
exports.ContextMenuItem = ContextMenuItem;
exports.ContextMenuLabel = ContextMenuLabel;
exports.ContextMenuRadioGroup = ContextMenuRadioGroup;
exports.ContextMenuRadioItem = ContextMenuRadioItem;
exports.ContextMenuSeparator = ContextMenuSeparator;
exports.ContextMenuShortcut = ContextMenuShortcut;
exports.ContextMenuSub = ContextMenuSub;
exports.ContextMenuSubContent = ContextMenuSubContent;
exports.ContextMenuSubTrigger = ContextMenuSubTrigger;
exports.ContextMenuTrigger = ContextMenuTrigger;
exports.CopyButton = CopyButton;
exports.DataList = DataList;
exports.DataListDetail = DataListDetail;
exports.DataListTerm = DataListTerm;
exports.DataTable = DataTable;
exports.DataTableToolbar = DataTableToolbar;
exports.DatePicker = DatePicker;
exports.Dialog = Dialog;
exports.DialogBody = DialogBody;
exports.DialogClose = DialogClose;
exports.DialogContent = DialogContent;
exports.DialogDescription = DialogDescription;
exports.DialogFooter = DialogFooter;
exports.DialogHeader = DialogHeader;
exports.DialogTitle = DialogTitle;
exports.DialogTrigger = DialogTrigger;
exports.Drawer = Drawer;
exports.DrawerBody = DrawerBody;
exports.DrawerClose = DrawerClose;
exports.DrawerContent = DrawerContent;
exports.DrawerDescription = DrawerDescription;
exports.DrawerFooter = DrawerFooter;
exports.DrawerHandle = DrawerHandle;
exports.DrawerHeader = DrawerHeader;
exports.DrawerTitle = DrawerTitle;
exports.DrawerTrigger = DrawerTrigger;
exports.DropdownMenu = DropdownMenu;
exports.DropdownMenuCheckboxItem = DropdownMenuCheckboxItem;
exports.DropdownMenuContent = DropdownMenuContent;
exports.DropdownMenuGroup = DropdownMenuGroup;
exports.DropdownMenuItem = DropdownMenuItem;
exports.DropdownMenuLabel = DropdownMenuLabel;
exports.DropdownMenuRadioGroup = DropdownMenuRadioGroup;
exports.DropdownMenuRadioItem = DropdownMenuRadioItem;
exports.DropdownMenuSeparator = DropdownMenuSeparator;
exports.DropdownMenuShortcut = DropdownMenuShortcut;
exports.DropdownMenuSub = DropdownMenuSub;
exports.DropdownMenuSubContent = DropdownMenuSubContent;
exports.DropdownMenuSubTrigger = DropdownMenuSubTrigger;
exports.DropdownMenuTrigger = DropdownMenuTrigger;
exports.EmptyState = EmptyState;
exports.FileUpload = FileUpload;
exports.FormField = FormField;
exports.HoverCard = HoverCard;
exports.HoverCardContent = HoverCardContent;
exports.HoverCardTrigger = HoverCardTrigger;
exports.ImageGallery = ImageGallery;
exports.InfiniteScroll = InfiniteScroll;
exports.InlineCode = InlineCode;
exports.Input = Input;
exports.InputGroup = InputGroup;
exports.Kbd = Kbd;
exports.Label = Label;
exports.Markdown = Markdown;
exports.Menubar = Menubar;
exports.MenubarCheckboxItem = MenubarCheckboxItem;
exports.MenubarContent = MenubarContent;
exports.MenubarGroup = MenubarGroup;
exports.MenubarItem = MenubarItem;
exports.MenubarLabel = MenubarLabel;
exports.MenubarMenu = MenubarMenu;
exports.MenubarRadioGroup = MenubarRadioGroup;
exports.MenubarRadioItem = MenubarRadioItem;
exports.MenubarSeparator = MenubarSeparator;
exports.MenubarShortcut = MenubarShortcut;
exports.MenubarSub = MenubarSub;
exports.MenubarSubContent = MenubarSubContent;
exports.MenubarSubTrigger = MenubarSubTrigger;
exports.MenubarTrigger = MenubarTrigger;
exports.NavigationMenu = NavigationMenu;
exports.NavigationMenuCardLink = NavigationMenuCardLink;
exports.NavigationMenuContent = NavigationMenuContent;
exports.NavigationMenuIndicator = NavigationMenuIndicator;
exports.NavigationMenuItem = NavigationMenuItem;
exports.NavigationMenuLink = NavigationMenuLink;
exports.NavigationMenuList = NavigationMenuList;
exports.NavigationMenuTrigger = NavigationMenuTrigger;
exports.NavigationMenuViewport = NavigationMenuViewport;
exports.NumberInput = NumberInput;
exports.Pagination = Pagination;
exports.PinInput = PinInput;
exports.Popover = Popover;
exports.PopoverArrow = PopoverArrow;
exports.PopoverClose = PopoverClose;
exports.PopoverContent = PopoverContent;
exports.PopoverTrigger = PopoverTrigger;
exports.Progress = Progress;
exports.RadioCard = RadioCard;
exports.RadioGroup = RadioGroup;
exports.RadioGroupItem = RadioGroupItem;
exports.ResizableHandle = ResizableHandle;
exports.ResizablePanel = ResizablePanel;
exports.ResizablePanelGroup = ResizablePanelGroup;
exports.ScrollArea = ScrollArea;
exports.ScrollBar = ScrollBar;
exports.SearchInput = SearchInput;
exports.Select = Select;
exports.SelectContent = SelectContent;
exports.SelectGroup = SelectGroup;
exports.SelectItem = SelectItem;
exports.SelectLabel = SelectLabel;
exports.SelectScrollDownButton = SelectScrollDownButton;
exports.SelectScrollUpButton = SelectScrollUpButton;
exports.SelectSeparator = SelectSeparator;
exports.SelectTrigger = SelectTrigger;
exports.SelectValue = SelectValue;
exports.Separator = Separator2;
exports.Sheet = Sheet;
exports.SheetClose = SheetClose;
exports.SheetContent = SheetContent;
exports.SheetDescription = SheetDescription;
exports.SheetFooter = SheetFooter;
exports.SheetHeader = SheetHeader;
exports.SheetTitle = SheetTitle;
exports.SheetTrigger = SheetTrigger;
exports.Sidebar = Sidebar;
exports.SidebarContent = SidebarContent;
exports.SidebarFooter = SidebarFooter;
exports.SidebarGroup = SidebarGroup;
exports.SidebarGroupAction = SidebarGroupAction;
exports.SidebarGroupContent = SidebarGroupContent;
exports.SidebarGroupLabel = SidebarGroupLabel;
exports.SidebarHeader = SidebarHeader;
exports.SidebarInput = SidebarInput;
exports.SidebarInset = SidebarInset;
exports.SidebarItem = SidebarItem;
exports.SidebarMenu = SidebarMenu;
exports.SidebarMenuAction = SidebarMenuAction;
exports.SidebarMenuBadge = SidebarMenuBadge;
exports.SidebarMenuButton = SidebarMenuButton;
exports.SidebarMenuItem = SidebarMenuItem;
exports.SidebarMenuSkeleton = SidebarMenuSkeleton;
exports.SidebarMenuSub = SidebarMenuSub;
exports.SidebarMenuSubButton = SidebarMenuSubButton;
exports.SidebarMenuSubItem = SidebarMenuSubItem;
exports.SidebarMobileOverlay = SidebarMobileOverlay;
exports.SidebarProvider = SidebarProvider;
exports.SidebarRail = SidebarRail;
exports.SidebarSection = SidebarSection;
exports.SidebarSeparator = SidebarSeparator;
exports.SidebarToggle = SidebarToggle;
exports.SidebarTrigger = SidebarTrigger;
exports.Skeleton = Skeleton;
exports.SkeletonCircle = SkeletonCircle;
exports.SkeletonRect = SkeletonRect;
exports.SkeletonText = SkeletonText;
exports.Slider = Slider;
exports.SonnerToaster = SonnerToaster;
exports.Spinner = Spinner;
exports.Stat = Stat;
exports.Step = Step;
exports.Steps = Steps;
exports.Switch = Switch;
exports.Table = Table;
exports.TableBody = TableBody;
exports.TableCaption = TableCaption;
exports.TableCell = TableCell;
exports.TableFooter = TableFooter;
exports.TableHead = TableHead;
exports.TableHeader = TableHeader;
exports.TableRow = TableRow;
exports.Tabs = Tabs;
exports.TabsContent = TabsContent;
exports.TabsList = TabsList;
exports.TabsTrigger = TabsTrigger;
exports.Tag = Tag;
exports.Textarea = Textarea;
exports.ThemeToggle = ThemeToggle;
exports.Timeline = Timeline;
exports.TimelineItem = TimelineItem;
exports.ToastItem = ToastItem;
exports.ToastProvider = ToastProvider;
exports.Toggle = Toggle;
exports.ToggleGroup = ToggleGroup;
exports.ToggleGroupItem = ToggleGroupItem;
exports.Tooltip = Tooltip;
exports.TooltipProvider = TooltipProvider;
exports.TreeView = TreeView;
exports.VideoPlayer = VideoPlayer;
exports.VirtualList = VirtualList;
exports.VisuallyHidden = VisuallyHidden;
exports.accordionRootVariants = accordionRootVariants;
exports.accordionTriggerVariants = accordionTriggerVariants;
exports.alertVariants = alertVariants;
exports.avatarVariants = avatarVariants;
exports.badgeVariants = badgeVariants;
exports.bannerVariants = bannerVariants;
exports.buttonVariants = buttonVariants;
exports.calendarDayVariants = calendarDayVariants;
exports.calloutVariants = calloutVariants;
exports.cardVariants = cardVariants;
exports.chartColors = chartColors;
exports.checkboxVariants = checkboxVariants;
exports.codeBlockVariants = codeBlockVariants;
exports.comboboxTriggerVariants = comboboxTriggerVariants;
exports.copyButtonVariants = copyButtonVariants;
exports.createColumnHelper = createColumnHelper;
exports.dataListVariants = dataListVariants;
exports.dialogContentVariants = dialogContentVariants;
exports.drawerContentVariants = drawerContentVariants;
exports.fileUploadZoneVariants = fileUploadZoneVariants;
exports.inlineCodeVariants = inlineCodeVariants;
exports.inputVariants = inputVariants;
exports.kbdVariants = kbdVariants;
exports.labelVariants = labelVariants;
exports.numberInputVariants = numberInputVariants;
exports.paginationButtonVariants = paginationButtonVariants;
exports.pinCellVariants = pinCellVariants;
exports.progressIndicatorVariants = progressIndicatorVariants;
exports.progressTrackVariants = progressTrackVariants;
exports.radioCardVariants = radioCardVariants;
exports.radioGroupVariants = radioGroupVariants;
exports.radioIndicatorVariants = radioIndicatorVariants;
exports.scrollbarThumbVariants = scrollbarThumbVariants;
exports.scrollbarVariants = scrollbarVariants;
exports.searchInputVariants = searchInputVariants;
exports.selectTriggerVariants = selectTriggerVariants;
exports.separatorVariants = separatorVariants;
exports.sheetContentVariants = sheetContentVariants;
exports.skeletonVariants = skeletonVariants;
exports.sliderRangeVariants = sliderRangeVariants;
exports.sliderThumbVariants = sliderThumbVariants;
exports.sliderTrackVariants = sliderTrackVariants;
exports.spinnerVariants = spinnerVariants;
exports.statVariants = statVariants;
exports.switchThumbVariants = switchThumbVariants;
exports.switchTrackVariants = switchTrackVariants;
exports.tableRootVariants = tableRootVariants;
exports.tabsListVariants = tabsListVariants;
exports.tabsTriggerVariants = tabsTriggerVariants;
exports.tagVariants = tagVariants;
exports.textareaVariants = textareaVariants;
exports.toastVariants = toastVariants;
exports.toggleGroupItemVariants = toggleGroupItemVariants;
exports.toggleGroupVariants = toggleGroupVariants;
exports.toggleVariants = toggleVariants;
exports.useCarouselContext = useCarouselContext;
exports.useCheckboxGroupContext = useCheckboxGroupContext;
exports.useCollapsibleContext = useCollapsibleContext;
exports.useDataTable = useDataTable;
exports.useSidebar = useSidebar;
exports.useSidebarContext = useSidebarContext;
exports.useToast = useToast;
exports.useToggleGroupContext = useToggleGroupContext;
