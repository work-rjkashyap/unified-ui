"use client";

// ============================================================================
// Unified UI — Markdown Component
// ============================================================================
// Rendered markdown content with design system prose styling.
// Transforms raw markdown strings into styled HTML using a minimal
// built-in parser (no external markdown libraries required).
//
// Features:
//   - Renders markdown to styled HTML
//   - Design system prose styles: headings, paragraphs, lists, code, etc.
//   - Dark mode aware
//   - Supports: headings, bold, italic, inline code, code blocks, links,
//     unordered and ordered lists, blockquotes, horizontal rules, images
//   - Configurable max-width and text size
//   - Full ref forwarding
//   - XSS-safe: HTML tags are escaped by default
//
// For full MDX rendering, use Fumadocs or a dedicated MDX processor.
// This component is for simple markdown-to-HTML display use cases.
//
// Usage:
//   import { Markdown } from "@work-rjkashyap/unified-ui/components";
//   <Markdown content="# Hello\n\nSome **bold** text." />
// ============================================================================

import { forwardRef, useMemo } from "react";
import { cn } from "@/lib/cn";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MarkdownProps {
  /** Markdown string to render. */
  content: string;
  /** Text size variant. @default "base" */
  size?: "sm" | "base" | "lg";
  /** Whether to remove max-width constraint. @default false */
  fluid?: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Whether to allow raw HTML in the markdown. @default false */
  allowHtml?: boolean;
}

// ---------------------------------------------------------------------------
// Minimal Markdown Parser
// ---------------------------------------------------------------------------

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function parseInline(text: string): string {
  return (
    text
      // Images: ![alt](src)
      .replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g,
        '<img src="$2" alt="$1" class="rounded-md max-w-full" loading="lazy" />',
      )
      // Links: [text](url)
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-primary underline underline-offset-2 hover:text-primary-hover" target="_blank" rel="noopener noreferrer">$1</a>',
      )
      // Bold: **text** or __text__
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/__(.+?)__/g, "<strong>$1</strong>")
      // Italic: *text* or _text_
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/_(.+?)_/g, "<em>$1</em>")
      // Strikethrough: ~~text~~
      .replace(/~~(.+?)~~/g, "<del>$1</del>")
      // Inline code: `code`
      .replace(
        /`([^`]+)`/g,
        '<code class="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.875em]">$1</code>',
      )
  );
}

function parseMarkdown(input: string, allowHtml: boolean): string {
  const lines = input.split("\n");
  const output: string[] = [];
  let inCodeBlock = false;
  let _codeBlockLang = "";
  let codeBuffer: string[] = [];
  let inList = false;
  let listType: "ul" | "ol" = "ul";

  function closeList() {
    if (inList) {
      output.push(`</${listType}>`);
      inList = false;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        // Close code block
        output.push(
          `<pre class="rounded-lg bg-muted p-4 overflow-x-auto text-sm font-mono"><code>${escapeHtml(codeBuffer.join("\n"))}</code></pre>`,
        );
        codeBuffer = [];
        inCodeBlock = false;
        continue;
      }
      closeList();
      inCodeBlock = true;
      _codeBlockLang = line.slice(3).trim();
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Escape HTML if not allowed
    const safeLine = allowHtml ? line : escapeHtml(line);
    const trimmed = safeLine.trim();

    // Empty line
    if (trimmed === "") {
      closeList();
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      closeList();
      output.push('<hr class="border-border my-4" />');
      continue;
    }

    // Headings
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      closeList();
      const level = headingMatch[1].length;
      const text = parseInline(headingMatch[2]);
      const hClasses: Record<number, string> = {
        1: "text-2xl font-bold mt-6 mb-3",
        2: "text-xl font-semibold mt-5 mb-2",
        3: "text-lg font-semibold mt-4 mb-2",
        4: "text-base font-semibold mt-3 mb-1",
        5: "text-sm font-semibold mt-3 mb-1",
        6: "text-sm font-medium mt-3 mb-1 text-muted-foreground",
      };
      output.push(
        `<h${level} class="${hClasses[level] || ""}">${text}</h${level}>`,
      );
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("&gt; ") || trimmed.startsWith("> ")) {
      closeList();
      const quoteText = trimmed.replace(/^(&gt;\s?|>\s?)/, "");
      output.push(
        `<blockquote class="border-l-2 border-border pl-4 text-muted-foreground italic my-3">${parseInline(quoteText)}</blockquote>`,
      );
      continue;
    }

    // Unordered list
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

    // Ordered list
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

    // Paragraph
    closeList();
    output.push(`<p class="my-2 leading-relaxed">${parseInline(trimmed)}</p>`);
  }

  // Close any open blocks
  closeList();
  if (inCodeBlock) {
    output.push(
      `<pre class="rounded-lg bg-muted p-4 overflow-x-auto text-sm font-mono"><code>${escapeHtml(codeBuffer.join("\n"))}</code></pre>`,
    );
  }

  return output.join("\n");
}

// ---------------------------------------------------------------------------
// Size classes
// ---------------------------------------------------------------------------

const sizeClasses = {
  sm: "text-sm [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base",
  base: "text-base",
  lg: "text-lg [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl",
};

// ---------------------------------------------------------------------------
// Markdown
// ---------------------------------------------------------------------------

/**
 * `Markdown` — renders a markdown string with design system prose styles.
 *
 * For simple markdown display use cases. For full MDX support, use
 * Fumadocs or a dedicated MDX processor.
 *
 * @example
 * ```tsx
 * <Markdown content={`
 * # Hello World
 *
 * Some **bold** and *italic* text with \`inline code\`.
 *
 * - Item one
 * - Item two
 *
 * > A blockquote
 *
 * \`\`\`tsx
 * const x = 42;
 * \`\`\`
 * `} />
 * ```
 */
export const Markdown = forwardRef<HTMLDivElement, MarkdownProps>(
  function Markdown(
    { content, size = "base", fluid = false, className, allowHtml = false },
    ref,
  ) {
    const html = useMemo(
      () => parseMarkdown(content, allowHtml),
      [content, allowHtml],
    );

    return (
      <div
        ref={ref}
        className={cn(
          "text-foreground",
          sizeClasses[size],
          !fluid && "max-w-prose",
          className,
        )}
        data-ds=""
        data-ds-component="markdown"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  },
);
Markdown.displayName = "Markdown";
