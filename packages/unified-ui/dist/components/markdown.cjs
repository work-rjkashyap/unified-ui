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
var markdown_exports = {};
__export(markdown_exports, {
  Markdown: () => Markdown
});
module.exports = __toCommonJS(markdown_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_cn = require("../utils/cn");
var import_react = require("react");
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function parseInline(text) {
  return text.replace(
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
  let _codeBlockLang = "";
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
      _codeBlockLang = line.slice(3).trim();
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
      const text = parseInline(headingMatch[2]);
      const hClasses = {
        1: "text-2xl font-bold mt-6 mb-3",
        2: "text-xl font-semibold mt-5 mb-2",
        3: "text-lg font-semibold mt-4 mb-2",
        4: "text-base font-semibold mt-3 mb-1",
        5: "text-sm font-semibold mt-3 mb-1",
        6: "text-sm font-medium mt-3 mb-1 text-muted-foreground"
      };
      output.push(
        `<h${level} class="${hClasses[level] || ""}">${text}</h${level}>`
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
const sizeClasses = {
  sm: "text-sm [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base",
  base: "text-base",
  lg: "text-lg [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl"
};
const Markdown = (0, import_react.forwardRef)(
  function Markdown2({ content, size = "base", fluid = false, className, allowHtml = false }, ref) {
    const html = (0, import_react.useMemo)(
      () => parseMarkdown(content, allowHtml),
      [content, allowHtml]
    );
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref,
        className: (0, import_cn.cn)(
          "text-foreground",
          sizeClasses[size],
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Markdown
});
