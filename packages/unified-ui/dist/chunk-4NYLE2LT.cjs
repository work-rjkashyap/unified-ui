'use strict';

var chunk3EHT6IOA_cjs = require('./chunk-3EHT6IOA.cjs');
var chunk4ON3M3OM_cjs = require('./chunk-4ON3M3OM.cjs');
var radixUi = require('radix-ui');
var classVarianceAuthority = require('class-variance-authority');
var React = require('react');
var jsxRuntime = require('react/jsx-runtime');
var framerMotion = require('framer-motion');
var reactDom = require('react-dom');

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
      className: chunk4ON3M3OM_cjs.cn("not-prose", accordionRootVariants({ variant }), className),
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
var defaultIconMap = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon
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
    "border"
  ],
  {
    variants: {
      // -----------------------------------------------------------------
      // Semantic Variants
      // -----------------------------------------------------------------
      variant: {
        /**
         * Info — informational messages, tips, notes.
         * Uses info-muted bg with info-muted-foreground text.
         */
        info: [
          "bg-info-muted",
          "text-info-muted-foreground",
          "border-info/20"
        ],
        /**
         * Success — positive outcomes, confirmations.
         * Uses success-muted bg with success-muted-foreground text.
         */
        success: [
          "bg-success-muted",
          "text-success-muted-foreground",
          "border-success/20"
        ],
        /**
         * Warning — caution messages, deprecation notices.
         * Uses warning-muted bg with warning-muted-foreground text.
         */
        warning: [
          "bg-warning-muted",
          "text-warning-muted-foreground",
          "border-warning/20"
        ],
        /**
         * Danger — error messages, destructive action warnings.
         * Uses danger-muted bg with danger-muted-foreground text.
         */
        danger: [
          "bg-danger-muted",
          "text-danger-muted-foreground",
          "border-danger/20"
        ]
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
  danger: "text-danger"
};
var defaultRoleMap = {
  info: "status",
  success: "status",
  warning: "alert",
  danger: "alert"
};
var Alert = React.forwardRef(function Alert2({
  variant = "info",
  title,
  icon,
  dismissible = false,
  onDismiss,
  dismissLabel = "Dismiss alert",
  role: roleProp,
  className,
  children,
  ...rest
}, ref) {
  const [visible, setVisible] = React.useState(true);
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
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref,
      role: resolvedRole,
      className: chunk4ON3M3OM_cjs.cn("not-prose", alertVariants({ variant }), className),
      "data-ds": "",
      "data-ds-component": "alert",
      "data-ds-variant": variant,
      ...rest,
      children: [
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
      ]
    }
  );
});
Alert.displayName = "Alert";
var avatarVariants = classVarianceAuthority.cva(
  // Base styles — shared across all variants and sizes
  [
    // Layout
    "relative inline-flex items-center justify-center shrink-0",
    // Typography for fallback initials
    "font-medium leading-none select-none",
    // Default colors for fallback state
    "bg-muted text-muted-foreground",
    // Border for visual separation on grouped/colored backgrounds
    "ring-2 ring-background"
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      className: chunk4ON3M3OM_cjs.cn("size-[60%] text-current opacity-60", className),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 1.79-7 4v1a1 1 0 001 1h12a1 1 0 001-1v-1c0-2.21-3.134-4-7-4z" })
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
          /* @__PURE__ */ jsxRuntime.jsx(
            "img",
            {
              src,
              alt: resolvedAlt,
              className: "size-full object-cover",
              draggable: false
            }
          )
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
  xs: { tight: "-ml-2", default: "-ml-1.5", loose: "-ml-1" },
  sm: { tight: "-ml-3", default: "-ml-2", loose: "-ml-1.5" },
  md: { tight: "-ml-4", default: "-ml-3", loose: "-ml-2" },
  lg: { tight: "-ml-5", default: "-ml-3.5", loose: "-ml-2.5" },
  xl: { tight: "-ml-6", default: "-ml-4", loose: "-ml-3" }
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
                  "relative"
                ),
                style: { zIndex: totalCount - index },
                children: React.cloneElement(child, {
                  size,
                  shape
                })
              },
              child.props?.alt ?? child.props?.name ?? index
            );
          }),
          overflowCount > 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: chunk4ON3M3OM_cjs.cn(overlapClass, "relative"), style: { zIndex: 0 }, children: /* @__PURE__ */ jsxRuntime.jsxs(
            "span",
            {
              className: chunk4ON3M3OM_cjs.cn(
                avatarVariants({ size, shape }),
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
          ) })
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
        default: [
          "bg-muted text-foreground",
          "border border-transparent"
        ],
        /**
         * Primary — uses brand/primary color.
         * Use for highlighting primary categories or active filters.
         */
        primary: [
          "bg-primary-muted text-primary-muted-foreground",
          "border border-transparent"
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
        outline: [
          "bg-transparent text-foreground",
          "border border-border"
        ]
      },
      // -----------------------------------------------------------------
      // Size Variants
      // -----------------------------------------------------------------
      size: {
        /**
         * Small — very compact, for inline metadata and dense UIs.
         * Height: ~20px, Font: 11px
         */
        sm: "px-2 py-0.5 text-[11px]",
        /**
         * Medium — default badge size, comfortable readability.
         * Height: ~24px, Font: 12px
         */
        md: "px-2.5 py-1 text-xs"
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
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  outline: "bg-foreground"
};
var dotSizeMap = {
  sm: "size-1.5",
  md: "size-2"
};
function RemoveButton({
  size,
  label,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      type: "button",
      onClick,
      className: chunk4ON3M3OM_cjs.cn(
        "inline-flex items-center justify-center shrink-0",
        "rounded-full",
        "text-current opacity-60",
        "hover:opacity-100",
        "transition-opacity duration-fast",
        "focus-visible:outline-none focus-visible:border-current",
        // Slightly negative margin to visually tuck the button in
        "-mr-0.5 ml-0.5",
        size === "sm" ? "size-3" : "size-3.5"
      ),
      "aria-label": label,
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
          className: size === "sm" ? "size-2.5" : "size-3",
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
  onRemove,
  removeLabel = "Remove",
  as: Component = "span",
  icon,
  className,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    Component,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(badgeVariants({ variant, size }), className),
      "data-ds": "",
      "data-ds-component": "badge",
      "data-ds-variant": variant,
      "data-ds-size": size,
      ...rest,
      children: [
        dot && /* @__PURE__ */ jsxRuntime.jsx(DotIndicator, { variant, size }),
        icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0 [&>svg]:size-3", "aria-hidden": "true", children: icon }),
        children,
        removable && /* @__PURE__ */ jsxRuntime.jsx(RemoveButton, { size, label: removeLabel, onClick: onRemove })
      ]
    }
  );
});
Badge.displayName = "Badge";
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
  function Breadcrumb2({
    "aria-label": ariaLabel = "Breadcrumb",
    className,
    children,
    ...rest
  }, ref) {
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
         * Height: 36px (h-9), Padding: 16px horizontal, Font: 14px
         */
        md: "h-9 px-4 text-sm gap-2",
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
          loading && /* @__PURE__ */ jsxRuntime.jsx(
            ButtonSpinner,
            {
              className: size === "sm" ? "size-3.5" : "size-4"
            }
          ),
          loading && loadingText ? /* @__PURE__ */ jsxRuntime.jsx("span", { children: loadingText }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            !loading && iconLeft && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0", "aria-hidden": "true", children: iconLeft }),
            children && /* @__PURE__ */ jsxRuntime.jsx(
              "span",
              {
                className: chunk4ON3M3OM_cjs.cn(
                  loading && !loadingText && "invisible"
                ),
                children
              }
            ),
            !loading && iconRight && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0", "aria-hidden": "true", children: iconRight })
          ] })
        ]
      }
    );
  }
);
Button.displayName = "Button";
var CardContext = React.createContext({ padding: "compact" });
function useCardContext() {
  return React.useContext(CardContext);
}
var cardPaddingMap = {
  compact: "p-4",
  comfortable: "p-6"
};
var slotPaddingXMap = {
  compact: "px-4",
  comfortable: "px-6"
};
var slotPaddingTopMap = {
  compact: "pt-4",
  comfortable: "pt-6"
};
var slotPaddingBottomMap = {
  compact: "pb-4",
  comfortable: "pb-6"
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
      className: chunk4ON3M3OM_cjs.cn("not-prose", cardVariants({ variant, fullWidth }), className),
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
          slotPaddingTopMap[padding],
          slotPaddingBottomMap[padding],
          bordered && "border-b border-border-muted",
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
          cardPaddingMap[padding],
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
          slotPaddingTopMap[padding],
          slotPaddingBottomMap[padding],
          bordered && "border-t border-border-muted",
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
        (label || description) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-0.5", children: [
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
    // Animation
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 to-top-[48%]",
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
function Dialog({ children, ...rest }) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Dialog.Root, { ...rest, children });
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Dialog.Overlay,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "fixed inset-0",
        "z-[var(--z-overlay)]",
        "bg-black/50",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        className
      ),
      ...rest
    }
  );
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
  return /* @__PURE__ */ jsxRuntime.jsxs(radixUi.Dialog.Portal, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(DialogOverlay, { className: overlayClassName }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      radixUi.Dialog.Content,
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn("not-prose", dialogContentVariants({ size }), className),
        "data-ds": "",
        "data-ds-component": "dialog",
        "data-ds-size": size,
        ...rest,
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
    )
  ] });
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
      className: chunk4ON3M3OM_cjs.cn(
        "text-sm leading-5 text-muted-foreground",
        className
      ),
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
function CheckIcon2({ className }) {
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
function DotIcon({ className }) {
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
function ChevronRightIcon2({ className }) {
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
  "min-w-[8rem]",
  "overflow-hidden",
  "rounded-md",
  "border border-border",
  "bg-background",
  "p-1",
  "shadow-lg",
  "text-foreground",
  // Animation
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
  "data-[side=top]:slide-in-from-bottom-2",
  "data-[side=bottom]:slide-in-from-top-2",
  "data-[side=left]:slide-in-from-right-2",
  "data-[side=right]:slide-in-from-left-2"
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
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.DropdownMenu.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.DropdownMenu.Content,
    {
      ref,
      sideOffset,
      className: chunk4ON3M3OM_cjs.cn(...menuContentBase, className),
      "data-ds": "",
      "data-ds-component": "dropdown-menu-content",
      ...rest,
      children
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
        ...menuItemBase,
        variant === "danger" && "text-danger focus:bg-danger-muted focus:text-danger-muted-foreground",
        variant === "default" && "text-foreground",
        icon && "gap-2",
        className
      ),
      "data-ds": "",
      "data-ds-component": "dropdown-menu-item",
      ...rest,
      children: [
        icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0 [&>svg]:size-4", "aria-hidden": "true", children: icon }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex-1", children }),
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
      className: chunk4ON3M3OM_cjs.cn(...menuItemBase, "pl-8", className),
      "data-ds": "",
      "data-ds-component": "dropdown-menu-checkbox-item",
      ...rest,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute left-2 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(radixUi.DropdownMenu.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(CheckIcon2, { className: "size-4" }) }) }),
        children
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
      className: chunk4ON3M3OM_cjs.cn(...menuItemBase, "pl-8", className),
      "data-ds": "",
      "data-ds-component": "dropdown-menu-radio-item",
      ...rest,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute left-2 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(radixUi.DropdownMenu.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(DotIcon, { className: "size-4" }) }) }),
        children
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
        ...menuItemBase,
        "data-[state=open]:bg-muted",
        icon && "gap-2",
        inset && "pl-8",
        className
      ),
      "data-ds": "",
      "data-ds-component": "dropdown-menu-sub-trigger",
      ...rest,
      children: [
        icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0 [&>svg]:size-4", "aria-hidden": "true", children: icon }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex-1", children }),
        /* @__PURE__ */ jsxRuntime.jsx(ChevronRightIcon2, { className: "ml-auto size-4 text-muted-foreground" })
      ]
    }
  );
});
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";
var DropdownMenuSubContent = React.forwardRef(function DropdownMenuSubContent2({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.DropdownMenu.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.DropdownMenu.SubContent,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(...menuContentBase, className),
      "data-ds": "",
      "data-ds-component": "dropdown-menu-sub-content",
      ...rest,
      children
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
         * Height: 36px (h-9)
         */
        md: "h-9 px-3 text-sm",
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
var iconSizeMap2 = {
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
        iconSizeMap2[size]
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
              iconSizeMap2[size]
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
              iconSizeMap2[size]
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
function ChevronRightIcon3({ className }) {
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
var iconSizeMap3 = {
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
    const [internalPage, setInternalPage] = React.useState(1);
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
      () => variant === "default" ? computePageRange(
        currentPage,
        totalPages,
        siblings,
        boundary
      ) : [],
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
                children: /* @__PURE__ */ jsxRuntime.jsx(ChevronLeftIcon, { className: iconSizeMap3[size] })
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
                children: /* @__PURE__ */ jsxRuntime.jsx(ChevronRightIcon3, { className: iconSizeMap3[size] })
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
              className: chunk4ON3M3OM_cjs.cn(
                paginationButtonVariants({ size, active: false })
              ),
              "aria-label": prevLabel,
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(ChevronLeftIcon, { className: iconSizeMap3[size] }),
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
              className: chunk4ON3M3OM_cjs.cn(
                paginationButtonVariants({ size, active: false })
              ),
              "aria-label": nextLabel,
              children: [
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only sm:not-sr-only", children: nextLabel }),
                /* @__PURE__ */ jsxRuntime.jsx(ChevronRightIcon3, { className: iconSizeMap3[size] })
              ]
            }
          )
        ]
      }
    );
  }
);
Pagination.displayName = "Pagination";
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
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Popover.Portal, { children: /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.Popover.Content,
    {
      ref,
      side,
      align,
      sideOffset,
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
        // Animation — CSS-based for Radix data attributes
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=top]:slide-in-from-bottom-2",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        // Outline
        "outline-none",
        className
      ),
      "data-ds": "",
      "data-ds-component": "popover-content",
      ...rest,
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
var labelSizeMap = {
  sm: "text-xs",
  md: "text-sm"
};
var descriptionSizeMap = {
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
        (label || description) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-0.5 min-w-0", children: [
          label && /* @__PURE__ */ jsxRuntime.jsx(
            "label",
            {
              id: labelId,
              htmlFor: itemId,
              className: chunk4ON3M3OM_cjs.cn(
                "font-medium leading-5 text-foreground",
                "cursor-pointer",
                isDisabled && "cursor-not-allowed",
                labelSizeMap[size]
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
                descriptionSizeMap[size]
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
            className: chunk4ON3M3OM_cjs.cn(
              radioIndicatorVariants({ size }),
              "mt-0.5 shrink-0"
            ),
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
                labelSizeMap[size]
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
                descriptionSizeMap[size]
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
function ChevronDownIcon2({ className }) {
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
var iconSizeMap4 = {
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
          ChevronDownIcon2,
          {
            className: chunk4ON3M3OM_cjs.cn(
              iconSizeMap4[size],
              "shrink-0 text-muted-foreground"
            )
          }
        ) })
      ]
    }
  );
});
SelectTrigger.displayName = radixUi.Select.Trigger.displayName;
var SelectValue = radixUi.Select.Value;
var SelectContent = React.forwardRef(function SelectContent2({ className, children, position = "popper", sideOffset = 4, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Select.Portal, { children: /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.Select.Content,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "relative z-[var(--z-popover)]",
        "min-w-[var(--radix-select-trigger-width)]",
        "max-h-[min(var(--radix-select-content-available-height),320px)]",
        "overflow-hidden",
        "rounded-md",
        "border border-border",
        "bg-background",
        "shadow-lg",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=top]:slide-in-from-bottom-2",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        className
      ),
      position,
      sideOffset,
      ...props,
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
      children: /* @__PURE__ */ jsxRuntime.jsx(ChevronDownIcon2, { className: "size-4" })
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Select.Group,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn("", className),
      ...rest,
      children
    }
  );
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
    "outline-none",
    // Animation base
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=open]:duration-300 data-[state=closed]:duration-200"
  ],
  {
    variants: {
      side: {
        /**
         * Left — slides in from the left edge.
         */
        left: [
          "inset-y-0 left-0",
          "border-r",
          "data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left"
        ],
        /**
         * Right — slides in from the right edge (most common).
         */
        right: [
          "inset-y-0 right-0",
          "border-l",
          "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right"
        ],
        /**
         * Top — slides in from the top edge.
         */
        top: [
          "inset-x-0 top-0",
          "border-b",
          "data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top"
        ],
        /**
         * Bottom — slides in from the bottom edge.
         */
        bottom: [
          "inset-x-0 bottom-0",
          "border-t",
          "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom"
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
function Sheet({ children, ...rest }) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Dialog.Root, { ...rest, children });
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Dialog.Overlay,
    {
      ref,
      className: chunk4ON3M3OM_cjs.cn(
        "fixed inset-0",
        "z-[var(--z-overlay)]",
        "bg-black/50",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        className
      ),
      ...rest
    }
  );
});
SheetOverlay.displayName = "SheetOverlay";
var SheetContent = React.forwardRef(function SheetContent2({
  side = "right",
  size = "md",
  showClose = true,
  overlayClassName,
  className,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(radixUi.Dialog.Portal, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(SheetOverlay, { className: overlayClassName }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      radixUi.Dialog.Content,
      {
        ref,
        className: chunk4ON3M3OM_cjs.cn("not-prose", sheetContentVariants({ side, size }), className),
        "data-ds": "",
        "data-ds-component": "sheet",
        "data-ds-side": side,
        "data-ds-size": size,
        ...rest,
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
    )
  ] });
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
      className: chunk4ON3M3OM_cjs.cn(
        "text-sm leading-5 text-muted-foreground",
        className
      ),
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
    animate = true,
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
          !animate && "animate-none",
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
    animate = true,
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
            animate
          },
          i
        ))
      }
    );
  }
);
SkeletonText.displayName = "SkeletonText";
var SkeletonCircle = React.forwardRef(
  function SkeletonCircle2({ size = "md", animate = true, className, ...rest }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      Skeleton,
      {
        ref,
        shape: "circle",
        size,
        animate,
        className,
        ...rest
      }
    );
  }
);
SkeletonCircle.displayName = "SkeletonCircle";
var SkeletonRect = React.forwardRef(
  function SkeletonRect2({ width = "100%", height = 120, animate = true, className, ...rest }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      Skeleton,
      {
        ref,
        shape: "rect",
        width,
        height,
        animate,
        className,
        ...rest
      }
    );
  }
);
SkeletonRect.displayName = "SkeletonRect";
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
var MotionThumb = framerMotion.motion.create("span");
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
    MotionThumb,
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
  React.useEffect(() => {
    if (isControlled) {
      setInternalChecked(checked);
    }
  }, [isControlled, checked]);
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
  const labelBlock = /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-0.5", children: [
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
        "inline-flex items-center gap-3",
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
          "absolute top-full z-[var(--z-dropdown,40)] mt-1",
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
            isSorted === "asc" ? /* @__PURE__ */ jsxRuntime.jsxs("svg", { className: "size-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m5 12 7-7 7 7" }),
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 19V5" })
            ] }) : isSorted === "desc" ? /* @__PURE__ */ jsxRuntime.jsxs("svg", { className: "size-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 5v14" }),
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m19 12-7 7-7-7" })
            ] }) : /* @__PURE__ */ jsxRuntime.jsxs("svg", { className: "size-3.5 opacity-40", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m7 15 5 5 5-5" }),
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m7 9 5-5 5 5" })
            ] })
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
              /* @__PURE__ */ jsxRuntime.jsxs("svg", { className: "size-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
                /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m5 12 7-7 7 7" }),
                /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 19V5" })
              ] }),
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
              /* @__PURE__ */ jsxRuntime.jsxs("svg", { className: "size-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
                /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 5v14" }),
                /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m19 12-7 7-7-7" })
              ] }),
              "Desc"
            ]
          }
        ),
        column.getCanHide() && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "my-1 h-px bg-border" }),
          /* @__PURE__ */ jsxRuntime.jsxs(DropdownItem, { onClick: () => column.toggleVisibility(false), children: [
            /* @__PURE__ */ jsxRuntime.jsxs("svg", { className: "size-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" }),
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242" }),
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.749 10.749 0 0 1 4.446-5.143" }),
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m2 2 20 20" })
            ] }),
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
  const selectedValues = new Set(
    column.getFilterValue() ?? []
  );
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
function DataTableSortBadge({
  table
}) {
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
            /* @__PURE__ */ jsxRuntime.jsxs("svg", { className: "size-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m21 16-4 4-4-4" }),
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M17 20V4" }),
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m3 8 4-4 4 4" }),
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M7 4v16" })
            ] }),
            "Sort",
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "inline-flex size-4 items-center justify-center rounded-full bg-foreground text-background text-[10px] font-bold", children: sorting.length })
          ]
        }
      ),
      children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "px-1", children: [
        sorting.map((sort) => {
          const col = table.getColumn(sort.id);
          const label = col && typeof col.columnDef.header === "string" ? col.columnDef.header : sort.id;
          return /* @__PURE__ */ jsxRuntime.jsxs(
            DropdownItem,
            {
              onClick: () => col?.clearSorting(),
              children: [
                sort.desc ? /* @__PURE__ */ jsxRuntime.jsxs("svg", { className: "size-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 5v14" }),
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m19 12-7 7-7-7" })
                ] }) : /* @__PURE__ */ jsxRuntime.jsxs("svg", { className: "size-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m5 12 7-7 7 7" }),
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 19V5" })
                ] }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex-1", children: label }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs text-muted-foreground", children: sort.desc ? "desc" : "asc" })
              ]
            },
            sort.id
          );
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
            /* @__PURE__ */ jsxRuntime.jsxs("svg", { className: "size-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "21", x2: "14", y1: "4", y2: "4" }),
              /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "10", x2: "3", y1: "4", y2: "4" }),
              /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "21", x2: "12", y1: "12", y2: "12" }),
              /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "8", x2: "3", y1: "12", y2: "12" }),
              /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "21", x2: "16", y1: "20", y2: "20" }),
              /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "12", x2: "3", y1: "20", y2: "20" })
            ] }),
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
                children: (pageSizeOptions || [10, 20, 30, 50, 100]).map(
                  (size) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: size, children: size }, size)
                )
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
                children: /* @__PURE__ */ jsxRuntime.jsxs("svg", { className: "size-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m11 17-5-5 5-5" }),
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m18 17-5-5 5-5" })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              PaginationButton,
              {
                onClick: () => table.previousPage(),
                disabled: !table.getCanPreviousPage(),
                "aria-label": "Go to previous page",
                children: /* @__PURE__ */ jsxRuntime.jsx("svg", { className: "size-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m15 18-6-6 6-6" }) })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              PaginationButton,
              {
                onClick: () => table.nextPage(),
                disabled: !table.getCanNextPage(),
                "aria-label": "Go to next page",
                children: /* @__PURE__ */ jsxRuntime.jsx("svg", { className: "size-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m9 18 6-6-6-6" }) })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              PaginationButton,
              {
                onClick: () => table.lastPage(),
                disabled: !table.getCanNextPage(),
                "aria-label": "Go to last page",
                children: /* @__PURE__ */ jsxRuntime.jsxs("svg", { className: "size-3.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m13 17 5-5-5-5" }),
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 17 5-5-5-5" })
                ] })
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
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: Array.from({ length: rowCount }).map((_, rowIndex) => /* @__PURE__ */ jsxRuntime.jsx(
    TableRow,
    {
      className: "animate-pulse",
      children: Array.from({ length: columnCount }).map((_2, colIndex) => /* @__PURE__ */ jsxRuntime.jsx(
        TableCell,
        {
          children: /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              className: chunk4ON3M3OM_cjs.cn(
                heightClass,
                "rounded-sm bg-muted",
                colIndex === 0 ? "w-3/4" : colIndex === columnCount - 1 ? "w-1/3" : "w-2/3"
              )
            }
          )
        },
        colIndex
      ))
    },
    rowIndex
  )) });
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
                            onChange: (val) => header.column.setFilterValue(
                              val || void 0
                            ),
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
                    className: chunk4ON3M3OM_cjs.cn(
                      onRowClick && "cursor-pointer"
                    ),
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
  const [columnFilters, onColumnFiltersChange] = React.useState(options.initialColumnFilters ?? []);
  const [pagination, onPaginationChange] = React.useState({
    pageIndex: 0,
    pageSize: 10,
    ...options.initialPagination
  });
  const [rowSelection, onRowSelectionChange] = React.useState(options.initialRowSelection ?? {});
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
var TabsContext = React.createContext({
  variant: "underline",
  size: "md",
  orientation: "horizontal",
  layoutId: ""
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
  ...rest
}, ref) {
  const autoId = React.useId();
  const layoutId = `tabs-indicator-${autoId}`;
  return /* @__PURE__ */ jsxRuntime.jsx(TabsContext.Provider, { value: { variant, size, orientation, layoutId }, children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Tabs.Root,
    {
      ref,
      orientation,
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
  ) });
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
var TabsTrigger = React.forwardRef(function TabsTrigger2({ className, icon, children, disabled, ...rest }, ref) {
  const { variant, size, layoutId } = useTabsContext();
  const iconSizeClass = size === "sm" ? "[&>svg]:size-3.5" : "[&>svg]:size-4";
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.Tabs.Trigger,
    {
      ref,
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
        variant !== "enclosed" && /* @__PURE__ */ jsxRuntime.jsx(radixUi.Tabs.Trigger, { asChild: true, ...rest, disabled, children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute inset-0 pointer-events-none" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(ActiveIndicatorWrapper, { variant, layoutId }),
        /* @__PURE__ */ jsxRuntime.jsxs(
          "span",
          {
            className: chunk4ON3M3OM_cjs.cn(
              "relative z-[1] inline-flex items-center gap-1.5"
            ),
            children: [
              icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0", "aria-hidden": "true", children: icon }),
              children
            ]
          }
        )
      ]
    }
  );
});
TabsTrigger.displayName = "TabsTrigger";
function ActiveIndicatorWrapper({
  variant,
  layoutId
}) {
  if (variant === "enclosed") {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: chunk4ON3M3OM_cjs.cn(
        "absolute inset-0 pointer-events-none",
        // Only show when parent trigger has data-state=active
        "hidden [[data-state=active]>&]:block"
      ),
      children: /* @__PURE__ */ jsxRuntime.jsx(ActiveIndicator, { variant, layoutId })
    }
  );
}
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
    const [charCount, setCharCount] = React.useState(() => {
      if (value !== void 0) return String(value).length;
      if (defaultValue !== void 0) return String(defaultValue).length;
      return 0;
    });
    const adjustHeight = useAutoResize(internalRef, autoResize, maxHeight);
    React.useEffect(() => {
      if (value !== void 0) {
        setCharCount(String(value).length);
      }
    }, [value]);
    const handleChange = React.useCallback(
      (e) => {
        setCharCount(e.target.value.length);
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
        default: [
          "bg-surface-raised",
          "text-foreground",
          "border-border"
        ],
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
        info: [
          "bg-info-muted",
          "text-info-muted-foreground",
          "border-info/20"
        ]
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
        remainingRef.current = Math.max(
          0,
          remainingRef.current - elapsed
        );
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
        tabIndex: 0,
        className: chunk4ON3M3OM_cjs.cn(toastVariants({ variant })),
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onKeyDown: handleKeyDown,
        "data-ds": "",
        "data-ds-component": "toast",
        "data-ds-variant": variant,
        ...rest,
        children: [
          IconComponent && /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              className: chunk4ON3M3OM_cjs.cn("shrink-0 mt-0.5", iconColorMap2[variant]),
              children: /* @__PURE__ */ jsxRuntime.jsx(IconComponent, { className: "size-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1 min-w-0", children: [
            title && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "font-semibold leading-5", children: title }),
            description && /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                className: chunk4ON3M3OM_cjs.cn(
                  "leading-5",
                  title && "mt-0.5 opacity-90"
                ),
                children: description
              }
            ),
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
        /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { initial: false, mode: "popLayout", children: (isBottom ? [...toasts].reverse() : toasts).map((toast) => /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.Tooltip.Content,
    {
      ref,
      sideOffset,
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
        // Animation
        "data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=top]:slide-in-from-bottom-2",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        className
      ),
      style: { maxWidth },
      "data-ds": "",
      "data-ds-component": "tooltip",
      ...rest,
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

exports.Accordion = Accordion;
exports.AccordionContent = AccordionContent;
exports.AccordionItem = AccordionItem;
exports.AccordionTrigger = AccordionTrigger;
exports.Alert = Alert;
exports.Avatar = Avatar;
exports.AvatarGroup = AvatarGroup;
exports.Badge = Badge;
exports.Breadcrumb = Breadcrumb;
exports.BreadcrumbEllipsis = BreadcrumbEllipsis;
exports.BreadcrumbItem = BreadcrumbItem;
exports.BreadcrumbLink = BreadcrumbLink;
exports.BreadcrumbList = BreadcrumbList;
exports.BreadcrumbNav = BreadcrumbNav;
exports.BreadcrumbPage = BreadcrumbPage;
exports.BreadcrumbSeparator = BreadcrumbSeparator;
exports.Button = Button;
exports.Card = Card;
exports.CardBody = CardBody;
exports.CardFooter = CardFooter;
exports.CardHeader = CardHeader;
exports.Checkbox = Checkbox;
exports.CheckboxGroup = CheckboxGroup;
exports.DataTable = DataTable;
exports.Dialog = Dialog;
exports.DialogBody = DialogBody;
exports.DialogClose = DialogClose;
exports.DialogContent = DialogContent;
exports.DialogDescription = DialogDescription;
exports.DialogFooter = DialogFooter;
exports.DialogHeader = DialogHeader;
exports.DialogTitle = DialogTitle;
exports.DialogTrigger = DialogTrigger;
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
exports.Input = Input;
exports.Pagination = Pagination;
exports.Popover = Popover;
exports.PopoverArrow = PopoverArrow;
exports.PopoverClose = PopoverClose;
exports.PopoverContent = PopoverContent;
exports.PopoverTrigger = PopoverTrigger;
exports.RadioCard = RadioCard;
exports.RadioGroup = RadioGroup;
exports.RadioGroupItem = RadioGroupItem;
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
exports.Sheet = Sheet;
exports.SheetClose = SheetClose;
exports.SheetContent = SheetContent;
exports.SheetDescription = SheetDescription;
exports.SheetFooter = SheetFooter;
exports.SheetHeader = SheetHeader;
exports.SheetTitle = SheetTitle;
exports.SheetTrigger = SheetTrigger;
exports.Skeleton = Skeleton;
exports.SkeletonCircle = SkeletonCircle;
exports.SkeletonRect = SkeletonRect;
exports.SkeletonText = SkeletonText;
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
exports.Textarea = Textarea;
exports.ToastItem = ToastItem;
exports.ToastProvider = ToastProvider;
exports.Tooltip = Tooltip;
exports.TooltipProvider = TooltipProvider;
exports.accordionRootVariants = accordionRootVariants;
exports.accordionTriggerVariants = accordionTriggerVariants;
exports.alertVariants = alertVariants;
exports.avatarVariants = avatarVariants;
exports.badgeVariants = badgeVariants;
exports.buttonVariants = buttonVariants;
exports.cardVariants = cardVariants;
exports.checkboxVariants = checkboxVariants;
exports.createColumnHelper = createColumnHelper;
exports.dialogContentVariants = dialogContentVariants;
exports.inputVariants = inputVariants;
exports.paginationButtonVariants = paginationButtonVariants;
exports.radioCardVariants = radioCardVariants;
exports.radioGroupVariants = radioGroupVariants;
exports.radioIndicatorVariants = radioIndicatorVariants;
exports.selectTriggerVariants = selectTriggerVariants;
exports.sheetContentVariants = sheetContentVariants;
exports.skeletonVariants = skeletonVariants;
exports.switchThumbVariants = switchThumbVariants;
exports.switchTrackVariants = switchTrackVariants;
exports.tableRootVariants = tableRootVariants;
exports.tabsListVariants = tabsListVariants;
exports.tabsTriggerVariants = tabsTriggerVariants;
exports.textareaVariants = textareaVariants;
exports.toastVariants = toastVariants;
exports.useCheckboxGroupContext = useCheckboxGroupContext;
exports.useDataTable = useDataTable;
exports.useToast = useToast;
