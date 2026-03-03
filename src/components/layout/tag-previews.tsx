"use client";

// ============================================================================
// Tag Component Previews
// ============================================================================
// Self-contained "use client" preview components for Tag.
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

import { Tag } from "@work-rjkashyap/unified-ui";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Tag — Dismissible Preview
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
				<Tag
					key={tag.label}
					variant={tag.variant}
					dismissible
					onDismiss={() =>
						setTags((prev) => prev.filter((t) => t.label !== tag.label))
					}
				>
					{tag.label}
				</Tag>
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
// Tag — Disabled + Dismissible Preview
// ---------------------------------------------------------------------------

export function TagDisabledDismissiblePreview() {
	return (
		<div className="flex flex-wrap gap-2 items-center justify-center">
			<Tag variant="primary" disabled>
				Disabled
			</Tag>
			<Tag variant="success" dismissible disabled onDismiss={() => {}}>
				Can&apos;t Remove
			</Tag>
		</div>
	);
}
