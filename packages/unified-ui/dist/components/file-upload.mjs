"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { slideUpSm, staggerContainerFast } from "../motion/index";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState
} from "react";
const fileUploadZoneVariants = cva(
  [
    "relative flex flex-col items-center justify-center gap-3",
    "w-full rounded-lg border-2 border-dashed",
    "text-center",
    "transition-colors duration-fast",
    "cursor-pointer select-none outline-none",
    focusRingClasses
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
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
        /* @__PURE__ */ jsx("polyline", { points: "17 8 12 3 7 8" }),
        /* @__PURE__ */ jsx("line", { x1: "12", x2: "12", y1: "3", y2: "15" })
      ]
    }
  );
}
function FileIcon({ className }) {
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }),
        /* @__PURE__ */ jsx("path", { d: "M14 2v4a2 2 0 0 0 2 2h4" })
      ]
    }
  );
}
function ImageFileIcon({ className }) {
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }),
        /* @__PURE__ */ jsx("circle", { cx: "9", cy: "9", r: "2" }),
        /* @__PURE__ */ jsx("path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" })
      ]
    }
  );
}
function XIcon({ className }) {
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
function AlertCircleIcon({ className }) {
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
        /* @__PURE__ */ jsx("line", { x1: "12", x2: "12", y1: "8", y2: "12" }),
        /* @__PURE__ */ jsx("line", { x1: "12", x2: "12.01", y1: "16", y2: "16" })
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
const FileUpload = forwardRef(
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
    const shouldReduce = useReducedMotion();
    const id = useId();
    const inputRef = useRef(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);
    const addFiles = useCallback(
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
    const removeFile = useCallback(
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
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn("flex flex-col gap-3 w-full", className),
        "data-ds": "",
        "data-ds-component": "file-upload",
        "data-ds-size": size,
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              role: "region",
              "aria-label": ariaLabel,
              tabIndex: disabled ? -1 : 0,
              className: cn(fileUploadZoneVariants({ size, state: zoneState })),
              onClick: handleZoneClick,
              onKeyDown: handleZoneKeyDown,
              onDragOver: handleDragOver,
              onDragEnter: handleDragOver,
              onDragLeave: handleDragLeave,
              onDrop: handleDrop,
              "data-ds-drag-over": isDragOver ? "" : void 0,
              children: [
                /* @__PURE__ */ jsx(
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
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    animate: isDragOver && !shouldReduce ? { scale: 1.1 } : { scale: 1 },
                    transition: { type: "spring", stiffness: 400, damping: 25 },
                    "data-ds-animated": "",
                    children: /* @__PURE__ */ jsx(
                      UploadIcon,
                      {
                        className: cn(
                          "text-muted-foreground",
                          size === "sm" ? "size-8" : size === "md" ? "size-10" : "size-12",
                          isDragOver && "text-primary"
                        )
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 text-center", children: [
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: cn(
                        "font-medium text-foreground",
                        size === "sm" ? "text-xs" : "text-sm"
                      ),
                      children: label ?? /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsx("span", { className: "text-primary underline-offset-2 hover:underline", children: "Click to upload" }),
                        " ",
                        "or drag and drop"
                      ] })
                    }
                  ),
                  description && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: description }),
                  accept && !description && /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    accept,
                    maxSize ? ` \xB7 max ${formatFileSize(maxSize)}` : ""
                  ] })
                ] }),
                error && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs text-danger", children: [
                  /* @__PURE__ */ jsx(AlertCircleIcon, { className: "size-3.5 shrink-0" }),
                  /* @__PURE__ */ jsx("span", { children: error })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: files.length > 0 && /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "flex flex-col gap-2",
              variants: shouldReduce ? void 0 : staggerContainerFast.variants,
              initial: shouldReduce ? void 0 : "initial",
              animate: shouldReduce ? void 0 : "animate",
              "data-ds-animated": "",
              children: files.map((item) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  layout: true,
                  variants: shouldReduce ? void 0 : slideUpSm.variants,
                  initial: shouldReduce ? { opacity: 0 } : "initial",
                  animate: shouldReduce ? { opacity: 1 } : "animate",
                  exit: shouldReduce ? { opacity: 0 } : {
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.15 }
                  },
                  className: cn(
                    "flex items-center gap-3 p-3 rounded-md border border-border bg-background",
                    item.status === "error" && "border-danger/40 bg-danger-muted",
                    item.status === "success" && "border-success/40"
                  ),
                  "data-ds-animated": "",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "shrink-0 size-10 rounded-md overflow-hidden bg-muted flex items-center justify-center", children: item.preview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: item.preview,
                          alt: item.file.name,
                          className: "w-full h-full object-cover"
                        }
                      )
                    ) : item.file.type.startsWith("image/") ? /* @__PURE__ */ jsx(ImageFileIcon, { className: "size-5 text-muted-foreground" }) : /* @__PURE__ */ jsx(FileIcon, { className: "size-5 text-muted-foreground" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-foreground truncate", children: item.file.name }),
                      /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        formatFileSize(item.file.size),
                        item.status === "error" && item.error && /* @__PURE__ */ jsxs("span", { className: "text-danger ml-1", children: [
                          "\u2014 ",
                          item.error
                        ] })
                      ] }),
                      item.status === "uploading" && item.progress !== void 0 && /* @__PURE__ */ jsx("div", { className: "mt-1.5 w-full h-1 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
                        motion.div,
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
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => removeFile(item.id),
                        className: cn(
                          "shrink-0 inline-flex items-center justify-center size-7 rounded-md",
                          "text-muted-foreground hover:text-foreground hover:bg-accent",
                          "transition-colors duration-fast",
                          focusRingClasses
                        ),
                        "aria-label": `Remove ${item.file.name}`,
                        children: /* @__PURE__ */ jsx(XIcon, { className: "size-4" })
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
export {
  FileUpload,
  fileUploadZoneVariants
};
