"use client";

// ============================================================================
// Badge Component Previews
// ============================================================================
// Self-contained "use client" preview components for Badge (formerly Tag).
// These are registered in src/mdx-components.tsx and used in place of inline
// arrow functions inside the preview= prop of <ComponentPage> in MDX files.
//
// Why this exists: MDX files rendered via RSC cannot pass function props
// (e.g. onDismiss) across the RSC → Client serialisation boundary.
//
// The fix: encapsulate all previews that use function props into named
// "use client" components here. They are then referenced by name in MDX,
// never requiring a function to be passed as a prop across the boundary.
// ============================================================================

import { Badge } from "@work-rjkashyap/unified-ui";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Badge — Dismissible Preview (formerly TagDismissiblePreview)
// ---------------------------------------------------------------------------

export function TagDismissiblePreview() {
  const [tags, setTags] = useState([
    { label: "React", variant: "primary" as const },
    { label: "TypeScript", variant: "success" as const },
    { label: "Tailwind CSS", variant: "info" as const },
    { label: "Framer Motion", variant: "default" as const },
  ]);

  return (
    <div className="flex flex-wrap gap-2 items-center justify-center">
      {tags.map((tag) => (
        <Badge
          key={tag.label}
          variant={tag.variant}
          dismissible
          animated
          onDismiss={() =>
            setTags((prev) => prev.filter((t) => t.label !== tag.label))
          }
        >
          {tag.label}
        </Badge>
      ))}
      {tags.length === 0 && (
        <p className="text-sm text-muted-foreground">
          All tags dismissed.{" "}
          <button
            type="button"
            className="underline underline-offset-2 text-primary"
            onClick={() =>
              setTags([
                { label: "React", variant: "primary" },
                { label: "TypeScript", variant: "success" },
                { label: "Tailwind CSS", variant: "info" },
                { label: "Framer Motion", variant: "default" },
              ])
            }
          >
            Reset
          </button>
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Badge — Disabled + Dismissible Preview (formerly TagDisabledDismissiblePreview)
// ---------------------------------------------------------------------------

export function TagDisabledDismissiblePreview() {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-center">
      <Badge variant="primary" disabled>
        Disabled
      </Badge>
      <Badge variant="success" dismissible disabled onDismiss={() => {}}>
        Can&apos;t Remove
      </Badge>
    </div>
  );
}
