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
var avatar_exports = {};
__export(avatar_exports, {
  Avatar: () => Avatar,
  AvatarGroup: () => AvatarGroup,
  avatarVariants: () => avatarVariants
});
module.exports = __toCommonJS(avatar_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_class_variance_authority = require("class-variance-authority");
var import_react = require("react");
const avatarVariants = (0, import_class_variance_authority.cva)(
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
const statusColorMap = {
  online: "bg-success",
  offline: "bg-muted-foreground",
  busy: "bg-danger",
  away: "bg-warning"
};
const statusLabelMap = {
  online: "Online",
  offline: "Offline",
  busy: "Busy",
  away: "Away"
};
const statusSizeMap = {
  xs: "size-1.5",
  sm: "size-2",
  md: "size-2.5",
  lg: "size-3",
  xl: "size-3.5"
};
const statusPositionMap = {
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      className: (0, import_cn.cn)("size-8 translate-y-px text-current opacity-70", className),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "7", r: "4" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 14c-4.42 0-8 2.24-8 5v5h16v-5c0-2.76-3.58-5-8-5z" })
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "span",
    {
      className: (0, import_cn.cn)(
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
  const [status, setStatus] = (0, import_react.useState)(
    () => src ? "loading" : "error"
  );
  (0, import_react.useEffect)(() => {
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
const Avatar = (0, import_react.forwardRef)(function Avatar2({
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
  const imgEl = showImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "img",
    {
      src,
      alt: resolvedAlt,
      className: "size-full object-cover",
      draggable: false
    }
  ) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "span",
    {
      ref,
      className: (0, import_cn.cn)(
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 overflow-hidden rounded-[inherit] flex items-center justify-center", children: children ? children : showImage ? (
          /* Priority 2: Loaded image */
          imgEl
        ) : initials ? (
          /* Priority 3: Initials from name */
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { role: "img", "aria-label": resolvedAlt, children: initials })
        ) : (
          /* Priority 4: Fallback icon */
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { role: "img", "aria-label": resolvedAlt, children: fallbackIcon ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultFallbackIcon, {}) })
        ) }),
        status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
const overlapMap = {
  xs: { tight: "-ml-3", default: "-ml-2.5", loose: "-ml-1.5" },
  sm: { tight: "-ml-4", default: "-ml-3", loose: "-ml-2" },
  md: { tight: "-ml-5", default: "-ml-4", loose: "-ml-3" },
  lg: { tight: "-ml-6", default: "-ml-5", loose: "-ml-3.5" },
  xl: { tight: "-ml-8", default: "-ml-6", loose: "-ml-4" }
};
const AvatarGroup = (0, import_react.forwardRef)(
  function AvatarGroup2({
    max = 5,
    size = "md",
    shape = "circle",
    spacing = "default",
    className,
    children,
    ...rest
  }, ref) {
    const childArray = import_react.Children.toArray(children).filter(import_react.isValidElement);
    const totalCount = childArray.length;
    const overflowCount = max > 0 && totalCount > max ? totalCount - max : 0;
    const visibleChildren = overflowCount > 0 ? childArray.slice(0, max) : childArray;
    const overlapClass = overlapMap[size][spacing];
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref,
        className: (0, import_cn.cn)("inline-flex items-center", className),
        role: "group",
        "aria-label": `Group of ${totalCount} avatars`,
        "data-ds": "",
        "data-ds-component": "avatar-group",
        ...rest,
        children: [
          visibleChildren.map((child, index) => {
            if (!(0, import_react.isValidElement)(child)) return child;
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "span",
              {
                className: (0, import_cn.cn)(
                  index > 0 && overlapClass,
                  // Ensure proper stacking order (first avatar on top)
                  // z-index is set via CSS var so hover:z-50! (Tailwind) can override it
                  "relative inline-flex cursor-pointer transition-transform duration-150 ease-out",
                  "z-(--ag-z)",
                  "hover:z-50! hover:scale-110"
                ),
                style: { "--ag-z": totalCount - index },
                children: (0, import_react.cloneElement)(child, {
                  size,
                  shape,
                  className: (0, import_cn.cn)(
                    child.props?.className,
                    "ring-2 ring-background"
                  )
                })
              },
              child.props?.alt ?? child.props?.name ?? index
            );
          }),
          overflowCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              className: (0, import_cn.cn)(overlapClass, "relative inline-flex z-(--ag-z)"),
              style: { "--ag-z": 0 },
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "span",
                {
                  className: (0, import_cn.cn)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Avatar,
  AvatarGroup,
  avatarVariants
});
