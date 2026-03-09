// ============================================================================
// Unified UI — Syntax Highlighting Utilities
// ============================================================================
// Simple regex-based tokenizer for JS/TS/JSX/TSX and shell code.
// Produces token arrays that can be rendered with colored spans.

/** Token types for syntax highlighting */
export type TokenType =
  | "keyword"
  | "string"
  | "comment"
  | "number"
  | "operator"
  | "punctuation"
  | "function"
  | "type"
  | "tag"
  | "attr-name"
  | "attr-value"
  | "plain"
  | "component";

export interface Token {
  type: TokenType;
  value: string;
}

/**
 * CSS custom property references for each token type.
 * These resolve to different oklch values in light vs dark mode
 * via the `--code-*` custom properties defined in styles.css.
 */
export const TOKEN_COLORS: Record<TokenType, string> = {
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
  "attr-value": "var(--code-string)", // reuse string color
  plain: "var(--code-foreground)",
  component: "var(--code-component)",
};

const JS_KEYWORDS = new Set([
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
  "readonly",
]);

const SHELL_KEYWORDS = new Set([
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
  "wget",
]);

export function isShellLang(lang?: string): boolean {
  if (!lang) return false;
  const l = lang.toLowerCase();
  return (
    l === "sh" ||
    l === "bash" ||
    l === "zsh" ||
    l === "shell" ||
    l === "terminal"
  );
}

export function isJsxLang(lang?: string): boolean {
  if (!lang) return true; // default assumption
  const l = lang.toLowerCase();
  return (
    l === "tsx" ||
    l === "jsx" ||
    l === "ts" ||
    l === "typescript" ||
    l === "js" ||
    l === "javascript" ||
    l === "react"
  );
}

// ---------------------------------------------------------------------------
// JSX/TS tokenizer
// ---------------------------------------------------------------------------

// Regex patterns — compiled once
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

function tokenizeJsx(line: string): Token[] {
  const tokens: Token[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    const matched = false;

    // Single-line comment
    let m = remaining.match(RE_SINGLE_LINE_COMMENT);
    if (m) {
      tokens.push({ type: "comment", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // Block comment
    m = remaining.match(RE_BLOCK_COMMENT);
    if (m) {
      tokens.push({ type: "comment", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // Template literal
    m = remaining.match(RE_TEMPLATE_LITERAL);
    if (m) {
      tokens.push({ type: "string", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // Double-quoted string
    m = remaining.match(RE_DOUBLE_STRING);
    if (m) {
      tokens.push({ type: "string", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // Single-quoted string
    m = remaining.match(RE_SINGLE_STRING);
    if (m) {
      tokens.push({ type: "string", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // JSX component with trailing space: <Component ...
    m = remaining.match(RE_JSX_COMPONENT_WITH_SPACE);
    if (m) {
      tokens.push({ type: "punctuation", value: m[1] });
      tokens.push({ type: "component", value: m[2] });
      tokens.push({ type: "plain", value: m[3] });
      remaining = remaining.slice(m[0].length);
      continue;
    }

    // JSX component closed: <Component> or </Component> or <Component/>
    m = remaining.match(RE_JSX_COMPONENT_CLOSED);
    if (m) {
      tokens.push({ type: "punctuation", value: m[1] });
      tokens.push({ type: "component", value: m[2] });
      tokens.push({ type: "punctuation", value: m[3] });
      remaining = remaining.slice(m[0].length);
      continue;
    }

    // HTML-like tags: <div>, </span>, etc.
    m = remaining.match(RE_HTML_TAG);
    if (m) {
      tokens.push({ type: "punctuation", value: m[1] });
      tokens.push({ type: "tag", value: m[2] });
      tokens.push({
        type: m[3].trim() ? "punctuation" : "plain",
        value: m[3],
      });
      remaining = remaining.slice(m[0].length);
      continue;
    }

    // JSX attribute name (word followed by =)
    m = remaining.match(RE_ATTR_NAME);
    if (m) {
      tokens.push({ type: "attr-name", value: m[1] });
      tokens.push({ type: "operator", value: m[2] });
      remaining = remaining.slice(m[0].length);
      continue;
    }

    // Numbers
    m = remaining.match(RE_NUMBER);
    if (m) {
      tokens.push({ type: "number", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // Keywords and identifiers
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

    // Operators
    m = remaining.match(RE_OPERATOR);
    if (m) {
      tokens.push({ type: "operator", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // Punctuation
    m = remaining.match(RE_PUNCTUATION);
    if (m) {
      tokens.push({ type: "punctuation", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // Whitespace
    m = remaining.match(RE_WHITESPACE);
    if (m) {
      tokens.push({ type: "plain", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // Fallback: single character
    if (!matched) {
      tokens.push({ type: "plain", value: remaining[0] });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
}

// ---------------------------------------------------------------------------
// Shell tokenizer
// ---------------------------------------------------------------------------

const RE_SHELL_COMMENT = /^(#.*)/;
const RE_SHELL_FLAG = /^(--?[\w-]+)/;
const RE_SHELL_WORD = /^([@\w./-]+)/;
const RE_SHELL_OPERATOR = /^([|&;><]+)/;

function tokenizeShell(line: string): Token[] {
  const tokens: Token[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    let m: RegExpMatchArray | null;

    // Comment
    m = remaining.match(RE_SHELL_COMMENT);
    if (m) {
      tokens.push({ type: "comment", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // Double-quoted string
    m = remaining.match(RE_DOUBLE_STRING);
    if (m) {
      tokens.push({ type: "string", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // Single-quoted string
    m = remaining.match(RE_SINGLE_STRING);
    if (m) {
      tokens.push({ type: "string", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // Flags (--flag or -f)
    m = remaining.match(RE_SHELL_FLAG);
    if (m) {
      tokens.push({ type: "attr-name", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // Words (including scoped packages like @scope/pkg)
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

    // Operators / pipes
    m = remaining.match(RE_SHELL_OPERATOR);
    if (m) {
      tokens.push({ type: "operator", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // Whitespace
    m = remaining.match(RE_WHITESPACE);
    if (m) {
      tokens.push({ type: "plain", value: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // Fallback
    tokens.push({ type: "plain", value: remaining[0] });
    remaining = remaining.slice(1);
  }

  return tokens;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Tokenize a single line of code based on the given language. */
export function tokenizeLine(line: string, language?: string): Token[] {
  if (isShellLang(language)) return tokenizeShell(line);
  if (isJsxLang(language)) return tokenizeJsx(line);
  // For CSS, JSON, etc. — use JSX tokenizer as a reasonable fallback
  return tokenizeJsx(line);
}
