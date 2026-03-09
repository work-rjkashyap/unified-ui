import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import type { ReactNode } from "react";
import { PreviewCardShell } from "./preview-card-shell";

// ---------------------------------------------------------------------------
// PreviewCard — Minimal IntentUI-style preview/code card
// ---------------------------------------------------------------------------
// Server Component (no "use client" directive). The preview ReactNode is
// rendered on the server and passed as a slot to the thin client shell,
// avoiding RSC → Client serialisation issues with function props.
//
// Usage in MDX:
//
//   <PreviewCard
//     preview={<Button variant="primary">Label</Button>}
//     code={`"use client"\n\nimport { Button } from "@work-rjkashyap/unified-ui"\n\nexport function Component() {\n  return <Button variant="primary">Label</Button>\n}`}
//   />
//
// The card renders:
//   - A clean Preview pane (centered component, no dot-grid, no extras)
//   - A Code tab showing the full, copy-pasteable component file
//   - A Copy button in the tab bar
// ---------------------------------------------------------------------------

interface PreviewCardProps {
  /** The live component(s) to render in the preview pane. */
  preview?: ReactNode;
  /**
   * Raw source code string — should be a complete, copy-pasteable
   * component file (with "use client", imports, export function).
   */
  code?: string;
  /**
   * If true, the preview pane stretches to full width instead of
   * constraining content with max-w-lg.
   * @default false
   */
  fluid?: boolean;
  /**
   * If true, the preview pane has no padding or centering — the preview
   * content fills edge-to-edge. Ideal for full-bleed layouts like
   * sidebars, app shells, or split-pane demos.
   * @default false
   */
  noPadding?: boolean;
}

export function PreviewCard({
  preview,
  code,
  fluid = false,
  noPadding = false,
}: PreviewCardProps) {
  const previewSlot = noPadding ? (
    <div className="w-full">{preview}</div>
  ) : (
    <div className="flex items-center justify-center p-6 sm:p-8 md:p-10 min-h-35">
      <div
        className={
          fluid
            ? "w-full flex justify-center"
            : "w-full max-w-lg flex justify-center"
        }
      >
        {preview}
      </div>
    </div>
  );

  const codeSlot = code ? (
    <div className="overflow-auto max-h-120 [&_figure]:bg-transparent! [&_figure]:m-0! [&_figure]:rounded-none! [&_figure]:border-0! [&_figure]:shadow-none! [&_pre]:bg-transparent! [&_pre]:m-0! [&_pre]:rounded-none! [&_pre]:border-0! [&_pre]:shadow-none! [&_figure_button]:hidden! [&_figure>div:first-child:has(figcaption)]:hidden! [&_figure>.absolute]:hidden! [&_pre]:text-[13px]! [&_pre]:leading-relaxed!">
      <DynamicCodeBlock lang="tsx" code={code} />
    </div>
  ) : (
    <pre className="p-4 text-sm text-fd-muted-foreground overflow-x-auto">
      <code>{"// No code provided"}</code>
    </pre>
  );

  return (
    <PreviewCardShell
      previewSlot={previewSlot}
      codeSlot={codeSlot}
      code={code}
    />
  );
}
