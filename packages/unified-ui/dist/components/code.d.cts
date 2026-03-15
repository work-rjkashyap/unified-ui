import * as react from 'react';
import { ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';

declare const inlineCodeVariants: (props?: class_variance_authority_types.ClassProp | undefined) => string;
declare const codeBlockVariants: (props?: ({
    variant?: "default" | "dark" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type CodeVariant = "default" | "dark";
interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    children?: ReactNode;
}
interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
    variant?: CodeVariant;
    language?: string;
    showLineNumbers?: boolean;
    showCopyButton?: boolean;
    filename?: string;
    className?: string;
    children?: ReactNode;
}
/**
 * InlineCode — renders code in a monospaced, styled span.
 * @example <InlineCode>npm install</InlineCode>
 */
declare const InlineCode: react.ForwardRefExoticComponent<InlineCodeProps & react.RefAttributes<HTMLElement>>;
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
declare const CodeBlock: react.ForwardRefExoticComponent<CodeBlockProps & react.RefAttributes<HTMLPreElement>>;

export { CodeBlock, type CodeBlockProps, type CodeVariant, InlineCode, type InlineCodeProps, codeBlockVariants, inlineCodeVariants };
