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
var image_gallery_exports = {};
__export(image_gallery_exports, {
  ImageGallery: () => ImageGallery
});
module.exports = __toCommonJS(image_gallery_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_framer_motion = require("framer-motion");
var import_react = require("react");
var import_react_dom = require("react-dom");
function XIcon({ className }) {
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
function ChevronLeftIcon({ className }) {
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
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m15 18-6-6 6-6" })
    }
  );
}
function ChevronRightIcon({ className }) {
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
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 18 6-6-6-6" })
    }
  );
}
function ZoomInIcon({ className }) {
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m21 21-4.3-4.3" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M11 8v6" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 11h6" })
      ]
    }
  );
}
function ZoomOutIcon({ className }) {
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m21 21-4.3-4.3" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 11h6" })
      ]
    }
  );
}
function Lightbox({
  images,
  initialIndex,
  onClose
}) {
  const [current, setCurrent] = (0, import_react.useState)(initialIndex);
  const [zoomed, setZoomed] = (0, import_react.useState)(false);
  const shouldReduce = (0, import_framer_motion.useReducedMotion)();
  const goTo = (0, import_react.useCallback)(
    (i) => {
      setCurrent((i % images.length + images.length) % images.length);
      setZoomed(false);
    },
    [images.length]
  );
  const prev = (0, import_react.useCallback)(() => goTo(current - 1), [current, goTo]);
  const next = (0, import_react.useCallback)(() => goTo(current + 1), [current, goTo]);
  (0, import_react.useEffect)(() => {
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
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: "fixed inset-0 z-50 flex flex-col",
        "data-ds": "",
        "data-ds-component": "image-gallery-lightbox",
        role: "dialog",
        "aria-label": `Image ${current + 1} of ${images.length}`,
        "aria-modal": "true",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_framer_motion.motion.div,
            {
              className: "absolute inset-0 bg-black/90",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition,
              onClick: onClose
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative z-10 flex items-center justify-between px-4 py-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-sm text-white/70 font-medium", children: [
              current + 1,
              " / ",
              images.length
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  type: "button",
                  onClick: () => setZoomed(!zoomed),
                  className: "inline-flex size-9 items-center justify-center rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors",
                  "aria-label": zoomed ? "Zoom out" : "Zoom in",
                  children: zoomed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOutIcon, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomInIcon, { className: "size-4" })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "inline-flex size-9 items-center justify-center rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors",
                  "aria-label": "Close gallery",
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XIcon, { className: "size-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative z-10 flex-1 flex items-center justify-center px-12 min-h-0", children: [
            images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                onClick: prev,
                className: "absolute left-3 z-10 inline-flex size-10 items-center justify-center rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-white transition-colors",
                "aria-label": "Previous image",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeftIcon, { className: "size-5" })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { mode: "wait", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_framer_motion.motion.img,
              {
                src: image.src,
                alt: image.alt,
                className: (0, import_cn.cn)(
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
            images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                onClick: next,
                className: "absolute right-3 z-10 inline-flex size-10 items-center justify-center rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-white transition-colors",
                "aria-label": "Next image",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRightIcon, { className: "size-5" })
              }
            )
          ] }),
          image.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "relative z-10 text-center py-2 px-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-white/70", children: image.caption }) }),
          images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "relative z-10 flex items-center justify-center gap-1.5 py-3 px-4 overflow-x-auto", children: images.map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              type: "button",
              onClick: () => goTo(i),
              className: (0, import_cn.cn)(
                "shrink-0 size-12 rounded-md overflow-hidden border-2 transition-all",
                i === current ? "border-white opacity-100" : "border-transparent opacity-50 hover:opacity-80"
              ),
              "aria-label": `Go to image ${i + 1}`,
              "aria-current": i === current ? "true" : void 0,
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
const colsMap = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4"
};
const aspectMap = {
  square: "aspect-square",
  video: "aspect-video",
  auto: ""
};
const ImageGallery = (0, import_react.forwardRef)(
  function ImageGallery2({
    images,
    columns = 3,
    gap = 8,
    aspectRatio = "square",
    lightbox = true,
    className,
    renderThumbnail
  }, ref) {
    const [lightboxIndex, setLightboxIndex] = (0, import_react.useState)(null);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          ref,
          className: (0, import_cn.cn)("not-prose grid", colsMap[columns], className),
          style: { gap },
          "data-ds": "",
          "data-ds-component": "image-gallery",
          role: "group",
          "aria-label": "Image gallery",
          children: images.map((image, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              type: "button",
              onClick: () => lightbox && setLightboxIndex(index),
              className: (0, import_cn.cn)(
                "block overflow-hidden rounded-lg border border-border bg-muted p-0",
                "transition-shadow hover:shadow-md",
                lightbox && "cursor-pointer",
                !lightbox && "cursor-default",
                aspectMap[aspectRatio],
                import_focus_ring.focusRingClasses
              ),
              "aria-label": image.alt,
              disabled: !lightbox,
              children: renderThumbnail ? renderThumbnail(image, index) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { children: lightboxIndex !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ImageGallery
});
