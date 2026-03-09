"use client";

import { fadeInFast } from "@unified-ui/motion";
import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { cva } from "class-variance-authority";
// ============================================================================
// Unified UI — Code Component
// ============================================================================
// Inline code and block code display with copy button, line numbers,
// built-in syntax highlighting, and a proper code-editor appearance.
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  forwardRef,
  type ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { TOKEN_COLORS, tokenizeLine } from "./code-highlight";

export const inlineCodeVariants = cva([
  "inline font-mono font-medium rounded",
  "px-[0.3em] py-[0.15em]",
  "bg-muted text-muted-foreground",
  "border border-border/50",
  "text-[0.875em] leading-none",
]);

export const codeBlockVariants = cva(
  [
    "relative rounded-lg overflow-hidden",
    "border border-code-border",
    "bg-code-bg text-code-foreground",
    "font-mono text-sm leading-relaxed",
  ],
  {
    variants: {
      variant: {
        default: "",
        dark: "",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export type CodeVariant = "default" | "dark";

export interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children?: ReactNode;
}

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  variant?: CodeVariant;
  language?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  filename?: string;
  className?: string;
  children?: ReactNode;
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// ============================================================================
// HighlightedLine — renders a single line with syntax-colored tokens
// ============================================================================

function HighlightedLine({
  line,
  language,
}: {
  line: string;
  language?: string;
}) {
  const tokens = useMemo(() => tokenizeLine(line, language), [line, language]);

  return (
    <>
      {tokens.map((token, i) => (
        <span
          key={i}
          style={
            token.type !== "plain"
              ? { color: TOKEN_COLORS[token.type] }
              : undefined
          }
        >
          {token.value}
        </span>
      ))}
    </>
  );
}

// ============================================================================
// InlineCode
// ============================================================================

/**
 * InlineCode — renders code in a monospaced, styled span.
 * @example <InlineCode>npm install</InlineCode>
 */
export const InlineCode = forwardRef<HTMLElement, InlineCodeProps>(
  function InlineCode({ className, children, ...rest }, ref) {
    return (
      <code
        ref={ref}
        className={cn(inlineCodeVariants(), className)}
        data-ds=""
        data-ds-component="inline-code"
        {...rest}
      >
        {children}
      </code>
    );
  },
);
InlineCode.displayName = "InlineCode";

// ============================================================================
// CodeBlock
// ============================================================================

/**
 * CodeBlock — a styled code block with optional copy button, line numbers,
 * and filename. Uses a dark editor background with built-in syntax
 * highlighting for JS/TS/JSX/TSX, shell, and more.
 *
 * @example
 * <CodeBlock language="tsx" showCopyButton filename="Button.tsx">
 *   {`export function Button() { ... }`}
 * </CodeBlock>
 */
export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(
  function CodeBlock(
    {
      variant = "default",
      language,
      showLineNumbers = false,
      showCopyButton = true,
      filename,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const shouldReduce = useReducedMotion();
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
      const text = (
        typeof children === "string"
          ? children.replace(/^\n+|\n+$/g, "")
          : ref && "current" in ref && ref.current
            ? (ref.current.textContent ?? "")
            : ""
      ).trim();
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }, [children, ref]);

    const code =
      typeof children === "string" ? children.replace(/^\n+|\n+$/g, "") : "";
    const lines = code.split("\n");

    return (
      <div
        className={cn(codeBlockVariants({ variant }), className)}
        data-ds=""
        data-ds-component="code-block"
        data-ds-variant={variant}
      >
        {/* Header */}
        {(filename || language || showCopyButton) && (
          <div
            className={cn(
              "flex items-center justify-between px-4 py-2 border-b",
              "border-code-header-border bg-code-header-bg",
            )}
          >
            <div className="flex items-center gap-3 min-w-0">
              {filename && (
                <span className="text-xs font-medium text-code-header-foreground truncate">
                  {filename}
                </span>
              )}
              {language && (
                <span
                  className={cn(
                    "text-[10px] px-2 py-0.5 rounded font-mono font-medium leading-none",
                    "bg-code-badge-bg text-code-badge-foreground",
                    "border border-code-badge-border",
                  )}
                >
                  {language}
                </span>
              )}
            </div>
            {showCopyButton && (
              <button
                type="button"
                onClick={handleCopy}
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs shrink-0",
                  "text-code-copy-foreground hover:text-code-copy-hover-foreground",
                  "hover:bg-code-copy-hover-bg",
                  "transition-colors duration-150",
                  focusRingClasses,
                )}
                aria-label={copied ? "Copied!" : "Copy code"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="check"
                      className="flex items-center gap-1"
                      variants={shouldReduce ? undefined : fadeInFast.variants}
                      initial={shouldReduce ? undefined : "initial"}
                      animate={shouldReduce ? undefined : "animate"}
                      exit={shouldReduce ? undefined : "exit"}
                      transition={
                        shouldReduce ? undefined : fadeInFast.transition
                      }
                      data-ds-animated=""
                    >
                      <CheckIcon className="size-3.5 text-code-success" />
                      <span className="text-code-success">Copied!</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      className="flex items-center gap-1"
                      variants={shouldReduce ? undefined : fadeInFast.variants}
                      initial={shouldReduce ? undefined : "initial"}
                      animate={shouldReduce ? undefined : "animate"}
                      exit={shouldReduce ? undefined : "exit"}
                      transition={
                        shouldReduce ? undefined : fadeInFast.transition
                      }
                      data-ds-animated=""
                    >
                      <CopyIcon className="size-3.5" />
                      <span>Copy</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            )}
          </div>
        )}

        {/* Code content with syntax highlighting */}
        <pre
          ref={ref}
          className={cn(
            "overflow-x-auto p-4 m-0",
            "text-[13px] leading-[1.7]",
            "bg-transparent border-0 shadow-none rounded-none",
          )}
          {...rest}
        >
          {code ? (
            <code className="bg-transparent border-0 p-0 rounded-none shadow-none text-inherit">
              {lines.map((line, i) => (
                <span key={i} className="block">
                  {showLineNumbers && (
                    <span
                      className="inline-block w-8 text-right mr-4 text-code-line-number select-none text-xs"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                  )}
                  <HighlightedLine line={line} language={language} />
                </span>
              ))}
            </code>
          ) : (
            <code className="bg-transparent border-0 p-0 rounded-none shadow-none text-inherit">
              {children}
            </code>
          )}
        </pre>
      </div>
    );
  },
);
CodeBlock.displayName = "CodeBlock";
