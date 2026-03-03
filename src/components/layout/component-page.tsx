import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import type { ReactNode } from "react";
import { ComponentPageTabShell } from "./component-page-tab-shell";

// ---------------------------------------------------------------------------
// Server Component — no "use client" directive.
//
// The `preview` prop is a ReactNode that may contain components with function
// props (e.g. formatValue, formatTooltip). By keeping this file as a Server
// Component, the preview tree is rendered on the server and passed as an
// already-resolved ReactNode slot to the thin client shell below. This means
// no function props ever have to cross the RSC → Client serialisation boundary,
// which is what caused the "Functions cannot be passed directly to Client
// Components" error.
// ---------------------------------------------------------------------------

interface ComponentPageProps {
	title: string;
	description?: string;
	preview?: ReactNode;
	code?: string;
	children?: ReactNode;
}

export function ComponentPage({
	title,
	description,
	preview,
	code,
	children,
}: ComponentPageProps) {
	const previewSlot = (
		<div className="relative p-6 sm:p-8 md:p-10 flex items-center justify-center min-h-75">
			{/* Subtle dot-grid background */}
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,var(--color-fd-muted-foreground)_0.5px,transparent_0.5px)] bg-size-[16px_16px] opacity-[0.07]"
				aria-hidden="true"
			/>
			<div className="relative z-10 w-full max-w-lg flex justify-center">
				{preview}
			</div>
		</div>
	);

	const codeSlot = (
		<div className="relative [&_figure]:rounded-none! [&_figure]:shadow-none! [&_figure]:border-0! [&_figure]:my-0! [&_figure]:bg-transparent!">
			{code ? (
				<DynamicCodeBlock
					lang="tsx"
					code={code}
					codeblock={{ allowCopy: true }}
				/>
			) : (
				<pre className="p-4 text-sm text-fd-muted-foreground overflow-x-auto">
					<code>{"// No code provided"}</code>
				</pre>
			)}
		</div>
	);

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="space-y-1.5">
				<h1 className="text-3xl font-bold tracking-tight">{title}</h1>
				{description && (
					<p className="text-base text-fd-muted-foreground leading-relaxed">
						{description}
					</p>
				)}
			</div>

			{/* Preview / Code Card — tab state lives in the client shell */}
			<ComponentPageTabShell
				previewSlot={previewSlot}
				codeSlot={codeSlot}
			/>

			{/* Additional MDX content (children) */}
			{children && (
				<div className="prose prose-sm dark:prose-invert max-w-none">
					{children}
				</div>
			)}
		</div>
	);
}
