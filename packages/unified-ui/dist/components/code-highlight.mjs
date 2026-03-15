"use client";
const TOKEN_COLORS = {
  keyword: "var(--code-keyword)",
  string: "var(--code-string)",
  comment: "var(--code-comment)",
  number: "var(--code-number)",
  operator: "var(--code-operator)",
  punctuation: "var(--code-punctuation)",
  function: "var(--code-function)",
  type: "var(--code-type)",
  tag: "var(--code-tag)",
  "attr-name": "var(--code-attr-name)",
  "attr-value": "var(--code-string)",
  // reuse string color
  plain: "var(--code-foreground)",
  component: "var(--code-component)"
};
const JS_KEYWORDS = /* @__PURE__ */ new Set([
  "import",
  "export",
  "from",
  "default",
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "break",
  "continue",
  "new",
  "this",
  "class",
  "extends",
  "super",
  "typeof",
  "instanceof",
  "in",
  "of",
  "try",
  "catch",
  "finally",
  "throw",
  "async",
  "await",
  "yield",
  "null",
  "undefined",
  "true",
  "false",
  "void",
  "delete",
  "as",
  "type",
  "interface",
  "enum",
  "implements",
  "declare",
  "readonly"
]);
const SHELL_KEYWORDS = /* @__PURE__ */ new Set([
  "npm",
  "npx",
  "yarn",
  "pnpm",
  "bun",
  "install",
  "add",
  "run",
  "dev",
  "build",
  "start",
  "test",
  "init",
  "create",
  "exec",
  "sudo",
  "cd",
  "ls",
  "mkdir",
  "rm",
  "cp",
  "mv",
  "cat",
  "echo",
  "git",
  "docker",
  "curl",
  "wget"
]);
function isShellLang(lang) {
  if (!lang) return false;
  const l = lang.toLowerCase();
  return l === "sh" || l === "bash" || l === "zsh" || l === "shell" || l === "terminal";
}
function isJsxLang(lang) {
  if (!lang) return true;
  const l = lang.toLowerCase();
  return l === "tsx" || l === "jsx" || l === "ts" || l === "typescript" || l === "js" || l === "javascript" || l === "react";
}
const RE_SINGLE_LINE_COMMENT = /^(\/\/.*)/;
const RE_BLOCK_COMMENT = /^(\/\*[\s\S]*?\*\/)/;
const RE_TEMPLATE_LITERAL = /^(`(?:[^`\\]|\\.)*`)/;
const RE_DOUBLE_STRING = /^("(?:[^"\\]|\\.)*")/;
const RE_SINGLE_STRING = /^('(?:[^'\\]|\\.)*')/;
const RE_JSX_COMPONENT_WITH_SPACE = /^(<\/?)(\$?[A-Z][$\w.]*)(\s)/;
const RE_JSX_COMPONENT_CLOSED = /^(<\/?)(\$?[A-Z][$\w.]*)(\/?>)/;
const RE_HTML_TAG = /^(<\/?)([\w-]+)(\/?>|\s)/;
const RE_ATTR_NAME = /^([\w-]+)(=)/;
const RE_NUMBER = /^(\b\d+\.?\d*\b)/;
const RE_WORD = /^(\b[\w$]+\b)/;
const RE_OPERATOR = /^([=!<>+\-*/%&|^~?:]+)/;
const RE_PUNCTUATION = /^([{}()[\];,.<>/])/;
const RE_WHITESPACE = /^(\s+)/;
const RE_FOLLOWED_BY_PAREN = /^\s*\(/;
function tokenizeJsx(line) {
  const tokens = [];
  let remaining = line;
  while (remaining.length > 0) {
    const matched = false;
    let m = remaining.match(RE_SINGLE_LINE_COMMENT);
    if (m) {
      tokens.push({ type: "comment", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_BLOCK_COMMENT);
    if (m) {
      tokens.push({ type: "comment", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_TEMPLATE_LITERAL);
    if (m) {
      tokens.push({ type: "string", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_DOUBLE_STRING);
    if (m) {
      tokens.push({ type: "string", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_SINGLE_STRING);
    if (m) {
      tokens.push({ type: "string", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_JSX_COMPONENT_WITH_SPACE);
    if (m) {
      tokens.push({ type: "punctuation", value: m[1] });
      tokens.push({ type: "component", value: m[2] });
      tokens.push({ type: "plain", value: m[3] });
      remaining = remaining.slice(m[0].length);
      continue;
    }
    m = remaining.match(RE_JSX_COMPONENT_CLOSED);
    if (m) {
      tokens.push({ type: "punctuation", value: m[1] });
      tokens.push({ type: "component", value: m[2] });
      tokens.push({ type: "punctuation", value: m[3] });
      remaining = remaining.slice(m[0].length);
      continue;
    }
    m = remaining.match(RE_HTML_TAG);
    if (m) {
      tokens.push({ type: "punctuation", value: m[1] });
      tokens.push({ type: "tag", value: m[2] });
      tokens.push({
        type: m[3].trim() ? "punctuation" : "plain",
        value: m[3]
      });
      remaining = remaining.slice(m[0].length);
      continue;
    }
    m = remaining.match(RE_ATTR_NAME);
    if (m) {
      tokens.push({ type: "attr-name", value: m[1] });
      tokens.push({ type: "operator", value: m[2] });
      remaining = remaining.slice(m[0].length);
      continue;
    }
    m = remaining.match(RE_NUMBER);
    if (m) {
      tokens.push({ type: "number", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_WORD);
    if (m) {
      const word = m[1];
      if (JS_KEYWORDS.has(word)) {
        tokens.push({ type: "keyword", value: word });
      } else if (/^[A-Z]/.test(word)) {
        tokens.push({ type: "type", value: word });
      } else if (RE_FOLLOWED_BY_PAREN.test(remaining.slice(word.length))) {
        tokens.push({ type: "function", value: word });
      } else {
        tokens.push({ type: "plain", value: word });
      }
      remaining = remaining.slice(word.length);
      continue;
    }
    m = remaining.match(RE_OPERATOR);
    if (m) {
      tokens.push({ type: "operator", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_PUNCTUATION);
    if (m) {
      tokens.push({ type: "punctuation", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_WHITESPACE);
    if (m) {
      tokens.push({ type: "plain", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    if (!matched) {
      tokens.push({ type: "plain", value: remaining[0] });
      remaining = remaining.slice(1);
    }
  }
  return tokens;
}
const RE_SHELL_COMMENT = /^(#.*)/;
const RE_SHELL_FLAG = /^(--?[\w-]+)/;
const RE_SHELL_WORD = /^([@\w./-]+)/;
const RE_SHELL_OPERATOR = /^([|&;><]+)/;
function tokenizeShell(line) {
  const tokens = [];
  let remaining = line;
  while (remaining.length > 0) {
    let m;
    m = remaining.match(RE_SHELL_COMMENT);
    if (m) {
      tokens.push({ type: "comment", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_DOUBLE_STRING);
    if (m) {
      tokens.push({ type: "string", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_SINGLE_STRING);
    if (m) {
      tokens.push({ type: "string", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_SHELL_FLAG);
    if (m) {
      tokens.push({ type: "attr-name", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_SHELL_WORD);
    if (m) {
      const word = m[1];
      if (SHELL_KEYWORDS.has(word)) {
        tokens.push({ type: "keyword", value: word });
      } else {
        tokens.push({ type: "plain", value: word });
      }
      remaining = remaining.slice(word.length);
      continue;
    }
    m = remaining.match(RE_SHELL_OPERATOR);
    if (m) {
      tokens.push({ type: "operator", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    m = remaining.match(RE_WHITESPACE);
    if (m) {
      tokens.push({ type: "plain", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }
    tokens.push({ type: "plain", value: remaining[0] });
    remaining = remaining.slice(1);
  }
  return tokens;
}
function tokenizeLine(line, language) {
  if (isShellLang(language)) return tokenizeShell(line);
  if (isJsxLang(language)) return tokenizeJsx(line);
  return tokenizeJsx(line);
}
export {
  TOKEN_COLORS,
  isJsxLang,
  isShellLang,
  tokenizeLine
};
