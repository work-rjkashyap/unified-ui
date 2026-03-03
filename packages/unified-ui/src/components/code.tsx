"use client";

import { fadeInFast } from "@unified-ui/motion";
import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { cva } from "class-variance-authority";
// ============================================================================
// Unified UI — Code Component
// ============================================================================
// Inline code and block code display with copy button and line numbers.
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { forwardRef, type ReactNode, useCallback, useState } from "react";

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
    "border border-border",
    "bg-muted/50",
    "font-mono text-sm leading-relaxed",
  ],
  {
    variants: {
      variant: {
        default: "bg-muted/50",
        dark: "bg-[oklch(0.12_0_0)] text-[oklch(0.9_0_0)] border-border/30",
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

/**
 * CodeBlock — a styled code block with optional copy button, line numbers, and filename.
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
      const text =
        typeof children === "string"
          ? children
          : ref && "current" in ref && ref.current
            ? (ref.current.textContent ?? "")
            : "";
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }, [children, ref]);

    const code = typeof children === "string" ? children : "";
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
              variant === "dark"
                ? "border-border/20 bg-[oklch(0.10_0_0)]"
                : "border-border bg-muted",
            )}
          >
            <div className="flex items-center gap-3">
              {filename && (
                <span className="text-xs font-medium text-muted-foreground">
                  {filename}
                </span>
              )}
              {language && (
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full font-mono",
                    variant === "dark"
                      ? "bg-[oklch(0.20_0_0)] text-[oklch(0.7_0_0)]"
                      : "bg-background text-muted-foreground border border-border",
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
                  "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs",
                  "text-muted-foreground hover:text-foreground",
                  "transition-colors duration-fast",
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
                      <CheckIcon className="size-3.5 text-success" />
                      <span>Copied!</span>
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

        {/* Code content */}
        <pre
          ref={ref}
          className={cn(
            "overflow-x-auto p-4 m-0",
            variant === "dark" ? "text-[oklch(0.88_0_0)]" : "text-foreground",
          )}
          {...rest}
        >
          {showLineNumbers && code ? (
            <code>
              {lines.map((line, i) => (
                <span key={i} className="block">
                  <span
                    className="inline-block w-8 text-right mr-4 text-muted-foreground/50 select-none text-xs"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  {line}
                </span>
              ))}
            </code>
          ) : (
            <code>{children}</code>
          )}
        </pre>
      </div>
    );
  },
);
CodeBlock.displayName = "CodeBlock";
