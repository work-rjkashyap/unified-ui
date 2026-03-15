import * as react from 'react';

interface MarkdownProps {
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
declare const Markdown: react.ForwardRefExoticComponent<MarkdownProps & react.RefAttributes<HTMLDivElement>>;

export { Markdown, type MarkdownProps };
