/** Token types for syntax highlighting */
type TokenType = "keyword" | "string" | "comment" | "number" | "operator" | "punctuation" | "function" | "type" | "tag" | "attr-name" | "attr-value" | "plain" | "component";
interface Token {
    type: TokenType;
    value: string;
}
/**
 * CSS custom property references for each token type.
 * These resolve to different oklch values in light vs dark mode
 * via the `--code-*` custom properties defined in styles.css.
 */
declare const TOKEN_COLORS: Record<TokenType, string>;
declare function isShellLang(lang?: string): boolean;
declare function isJsxLang(lang?: string): boolean;
/** Tokenize a single line of code based on the given language. */
declare function tokenizeLine(line: string, language?: string): Token[];

export { TOKEN_COLORS, type Token, type TokenType, isJsxLang, isShellLang, tokenizeLine };
