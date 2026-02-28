"use client";

import { type ReactNode, useState } from "react";
import { cn } from "@/lib/cn";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

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
	const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

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

			{/* Preview / Code Card */}
			<div className="rounded-lg border border-fd-border bg-fd-card overflow-hidden">
				{/* Tab Bar */}
				<div className="flex items-center border-b border-fd-border">
					<button
						type="button"
						onClick={() => setActiveTab("preview")}
						className={cn(
							"relative px-4 py-2.5 text-sm font-medium transition-colors",
							activeTab === "preview"
								? "text-fd-foreground"
								: "text-fd-muted-foreground hover:text-fd-foreground",
						)}
					>
						Preview
						{activeTab === "preview" && (
							<span className="absolute inset-x-0 bottom-0 h-0.5 bg-fd-primary" />
						)}
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("code")}
						className={cn(
							"relative px-4 py-2.5 text-sm font-medium transition-colors",
							activeTab === "code"
								? "text-fd-foreground"
								: "text-fd-muted-foreground hover:text-fd-foreground",
						)}
					>
						Code
						{activeTab === "code" && (
							<span className="absolute inset-x-0 bottom-0 h-0.5 bg-fd-primary" />
						)}
					</button>
				</div>

				{/* Content Area */}
				{activeTab === "preview" ? (
					<div className="relative p-6 sm:p-8 md:p-10 flex items-center justify-center min-h-75">
						{/* Subtle dot grid background */}
						<div
							className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,var(--color-fd-muted-foreground)_0.5px,transparent_0.5px)] bg-size-[16px_16px] opacity-[0.07]"
							aria-hidden="true"
						/>
						<div className="relative z-10 w-full max-w-lg flex justify-center">
							{preview}
						</div>
					</div>
				) : (
					<div className="relative [&_figure]:rounded-none! [&_figure]:shadow-none! [&_figure]:border-0! [&_figure]:my-0! [&_figure]:bg-transparent!">
						{code ? (
							<DynamicCodeBlock
								lang="tsx"
								code={code}
								codeblock={{
									allowCopy: true,
								}}
							/>
						) : (
							<pre className="p-4 text-sm text-fd-muted-foreground overflow-x-auto">
								<code>{"// No code provided"}</code>
							</pre>
						)}
					</div>
				)}
			</div>

			{/* Additional Content (children from MDX) */}
			{children && (
				<div className="prose prose-sm dark:prose-invert max-w-none">
					{children}
				</div>
			)}
		</div>
	);
}
