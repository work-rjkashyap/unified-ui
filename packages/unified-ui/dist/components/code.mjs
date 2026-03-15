"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { fadeInFast } from "../motion/index";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  forwardRef,
  useCallback,
  useMemo,
  useState
} from "react";
import { TOKEN_COLORS, tokenizeLine } from "./code-highlight";
const inlineCodeVariants = cva([
  "inline font-mono font-medium rounded",
  "px-[0.3em] py-[0.15em]",
  "bg-muted text-muted-foreground",
  "border border-border/50",
  "text-[0.875em] leading-none"
]);
const codeBlockVariants = cva(
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
        /* @__PURE__ */ jsx("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }),
        /* @__PURE__ */ jsx("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
      ]
    }
  );
}
function CheckIcon({ className }) {
  return /* @__PURE__ */ jsx(
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
      children: /* @__PURE__ */ jsx("path", { d: "M20 6 9 17l-5-5" })
    }
  );
}
function HighlightedLine({
  line,
  language
}) {
  const tokens = useMemo(() => tokenizeLine(line, language), [line, language]);
  return /* @__PURE__ */ jsx(Fragment, { children: tokens.map((token, i) => /* @__PURE__ */ jsx(
    "span",
    {
      style: token.type !== "plain" ? { color: TOKEN_COLORS[token.type] } : void 0,
      children: token.value
    },
    i
  )) });
}
const InlineCode = forwardRef(
  function InlineCode2({ className, children, ...rest }, ref) {
    return /* @__PURE__ */ jsx(
      "code",
      {
        ref,
        className: cn(inlineCodeVariants(), className),
        "data-ds": "",
        "data-ds-component": "inline-code",
        ...rest,
        children
      }
    );
  }
);
InlineCode.displayName = "InlineCode";
const CodeBlock = forwardRef(
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
    const shouldReduce = useReducedMotion();
    const [copied, setCopied] = useState(false);
    const handleCopy = useCallback(() => {
      const text = (typeof children === "string" ? children.replace(/^\n+|\n+$/g, "") : ref && "current" in ref && ref.current ? ref.current.textContent ?? "" : "").trim();
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2e3);
      });
    }, [children, ref]);
    const code = typeof children === "string" ? children.replace(/^\n+|\n+$/g, "") : "";
    const lines = code.split("\n");
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(codeBlockVariants({ variant }), className),
        "data-ds": "",
        "data-ds-component": "code-block",
        "data-ds-variant": variant,
        children: [
          (filename || language || showCopyButton) && /* @__PURE__ */ jsxs(
            "div",
            {
              className: cn(
                "flex items-center justify-between px-4 py-2 border-b",
                "border-code-header-border bg-code-header-bg"
              ),
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                  filename && /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-code-header-foreground truncate", children: filename }),
                  language && /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: cn(
                        "text-[10px] px-2 py-0.5 rounded font-mono font-medium leading-none",
                        "bg-code-badge-bg text-code-badge-foreground",
                        "border border-code-badge-border"
                      ),
                      children: language
                    }
                  )
                ] }),
                showCopyButton && /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleCopy,
                    className: cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs shrink-0",
                      "text-code-copy-foreground hover:text-code-copy-hover-foreground",
                      "hover:bg-code-copy-hover-bg",
                      "transition-colors duration-150",
                      focusRingClasses
                    ),
                    "aria-label": copied ? "Copied!" : "Copy code",
                    children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", initial: false, children: copied ? /* @__PURE__ */ jsxs(
                      motion.span,
                      {
                        className: "flex items-center gap-1",
                        variants: shouldReduce ? void 0 : fadeInFast.variants,
                        initial: shouldReduce ? void 0 : "initial",
                        animate: shouldReduce ? void 0 : "animate",
                        exit: shouldReduce ? void 0 : "exit",
                        transition: shouldReduce ? void 0 : fadeInFast.transition,
                        "data-ds-animated": "",
                        children: [
                          /* @__PURE__ */ jsx(CheckIcon, { className: "size-3.5 text-code-success" }),
                          /* @__PURE__ */ jsx("span", { className: "text-code-success", children: "Copied!" })
                        ]
                      },
                      "check"
                    ) : /* @__PURE__ */ jsxs(
                      motion.span,
                      {
                        className: "flex items-center gap-1",
                        variants: shouldReduce ? void 0 : fadeInFast.variants,
                        initial: shouldReduce ? void 0 : "initial",
                        animate: shouldReduce ? void 0 : "animate",
                        exit: shouldReduce ? void 0 : "exit",
                        transition: shouldReduce ? void 0 : fadeInFast.transition,
                        "data-ds-animated": "",
                        children: [
                          /* @__PURE__ */ jsx(CopyIcon, { className: "size-3.5" }),
                          /* @__PURE__ */ jsx("span", { children: "Copy" })
                        ]
                      },
                      "copy"
                    ) })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "pre",
            {
              ref,
              className: cn(
                "overflow-x-auto p-4 m-0",
                "text-[13px] leading-[1.7]",
                "bg-transparent border-0 shadow-none rounded-none"
              ),
              ...rest,
              children: code ? /* @__PURE__ */ jsx("code", { className: "bg-transparent border-0 p-0 rounded-none shadow-none text-inherit", children: lines.map((line, i) => /* @__PURE__ */ jsxs("span", { className: "block", children: [
                showLineNumbers && /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "inline-block w-8 text-right mr-4 text-code-line-number select-none text-xs",
                    "aria-hidden": "true",
                    children: i + 1
                  }
                ),
                /* @__PURE__ */ jsx(HighlightedLine, { line, language })
              ] }, i)) }) : /* @__PURE__ */ jsx("code", { className: "bg-transparent border-0 p-0 rounded-none shadow-none text-inherit", children })
            }
          )
        ]
      }
    );
  }
);
CodeBlock.displayName = "CodeBlock";
export {
  CodeBlock,
  InlineCode,
  codeBlockVariants,
  inlineCodeVariants
};
