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
var code_exports = {};
__export(code_exports, {
  CodeBlock: () => CodeBlock,
  InlineCode: () => InlineCode,
  codeBlockVariants: () => codeBlockVariants,
  inlineCodeVariants: () => inlineCodeVariants
});
module.exports = __toCommonJS(code_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_motion = require("../motion/index");
var import_cn = require("../utils/cn");
var import_focus_ring = require("../utils/focus-ring");
var import_class_variance_authority = require("class-variance-authority");
var import_framer_motion = require("framer-motion");
var import_react = require("react");
var import_code_highlight = require("./code-highlight");
const inlineCodeVariants = (0, import_class_variance_authority.cva)([
  "inline font-mono font-medium rounded",
  "px-[0.3em] py-[0.15em]",
  "bg-muted text-muted-foreground",
  "border border-border/50",
  "text-[0.875em] leading-none"
]);
const codeBlockVariants = (0, import_class_variance_authority.cva)(
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
function HighlightedLine({
  line,
  language
}) {
  const tokens = (0, import_react.useMemo)(() => (0, import_code_highlight.tokenizeLine)(line, language), [line, language]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: tokens.map((token, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "span",
    {
      style: token.type !== "plain" ? { color: import_code_highlight.TOKEN_COLORS[token.type] } : void 0,
      children: token.value
    },
    i
  )) });
}
const InlineCode = (0, import_react.forwardRef)(
  function InlineCode2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "code",
      {
        ref,
        className: (0, import_cn.cn)(inlineCodeVariants(), className),
        "data-ds": "",
        "data-ds-component": "inline-code",
        ...rest,
        children
      }
    );
  }
);
InlineCode.displayName = "InlineCode";
const CodeBlock = (0, import_react.forwardRef)(
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
    const shouldReduce = (0, import_framer_motion.useReducedMotion)();
    const [copied, setCopied] = (0, import_react.useState)(false);
    const handleCopy = (0, import_react.useCallback)(() => {
      const text = (typeof children === "string" ? children.replace(/^\n+|\n+$/g, "") : ref && "current" in ref && ref.current ? ref.current.textContent ?? "" : "").trim();
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2e3);
      });
    }, [children, ref]);
    const code = typeof children === "string" ? children.replace(/^\n+|\n+$/g, "") : "";
    const lines = code.split("\n");
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: (0, import_cn.cn)(codeBlockVariants({ variant }), className),
        "data-ds": "",
        "data-ds-component": "code-block",
        "data-ds-variant": variant,
        children: [
          (filename || language || showCopyButton) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "div",
            {
              className: (0, import_cn.cn)(
                "flex items-center justify-between px-4 py-2 border-b",
                "border-code-header-border bg-code-header-bg"
              ),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3 min-w-0", children: [
                  filename && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xs font-medium text-code-header-foreground truncate", children: filename }),
                  language && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "span",
                    {
                      className: (0, import_cn.cn)(
                        "text-[10px] px-2 py-0.5 rounded font-mono font-medium leading-none",
                        "bg-code-badge-bg text-code-badge-foreground",
                        "border border-code-badge-border"
                      ),
                      children: language
                    }
                  )
                ] }),
                showCopyButton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: handleCopy,
                    className: (0, import_cn.cn)(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs shrink-0",
                      "text-code-copy-foreground hover:text-code-copy-hover-foreground",
                      "hover:bg-code-copy-hover-bg",
                      "transition-colors duration-150",
                      import_focus_ring.focusRingClasses
                    ),
                    "aria-label": copied ? "Copied!" : "Copy code",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { mode: "wait", initial: false, children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                      import_framer_motion.motion.span,
                      {
                        className: "flex items-center gap-1",
                        variants: shouldReduce ? void 0 : import_motion.fadeInFast.variants,
                        initial: shouldReduce ? void 0 : "initial",
                        animate: shouldReduce ? void 0 : "animate",
                        exit: shouldReduce ? void 0 : "exit",
                        transition: shouldReduce ? void 0 : import_motion.fadeInFast.transition,
                        "data-ds-animated": "",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, { className: "size-3.5 text-code-success" }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-code-success", children: "Copied!" })
                        ]
                      },
                      "check"
                    ) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                      import_framer_motion.motion.span,
                      {
                        className: "flex items-center gap-1",
                        variants: shouldReduce ? void 0 : import_motion.fadeInFast.variants,
                        initial: shouldReduce ? void 0 : "initial",
                        animate: shouldReduce ? void 0 : "animate",
                        exit: shouldReduce ? void 0 : "exit",
                        transition: shouldReduce ? void 0 : import_motion.fadeInFast.transition,
                        "data-ds-animated": "",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyIcon, { className: "size-3.5" }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Copy" })
                        ]
                      },
                      "copy"
                    ) })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "pre",
            {
              ref,
              className: (0, import_cn.cn)(
                "overflow-x-auto p-4 m-0",
                "text-[13px] leading-[1.7]",
                "bg-transparent border-0 shadow-none rounded-none"
              ),
              ...rest,
              children: code ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { className: "bg-transparent border-0 p-0 rounded-none shadow-none text-inherit", children: lines.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "block", children: [
                showLineNumbers && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "span",
                  {
                    className: "inline-block w-8 text-right mr-4 text-code-line-number select-none text-xs",
                    "aria-hidden": "true",
                    children: i + 1
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HighlightedLine, { line, language })
              ] }, i)) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { className: "bg-transparent border-0 p-0 rounded-none shadow-none text-inherit", children })
            }
          )
        ]
      }
    );
  }
);
CodeBlock.displayName = "CodeBlock";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CodeBlock,
  InlineCode,
  codeBlockVariants,
  inlineCodeVariants
});
