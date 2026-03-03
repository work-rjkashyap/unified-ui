"use client";

import { type ReactNode, useState } from "react";
import { cn } from "@/lib/cn";

interface ComponentPageTabShellProps {
	previewSlot: ReactNode;
	codeSlot: ReactNode;
}

export function ComponentPageTabShell({
	previewSlot,
	codeSlot,
}: ComponentPageTabShellProps) {
	const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

	return (
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

			{/* Content Area — both panels stay mounted; visibility is toggled via
          CSS so React never unmounts the preview tree. This also prevents a
          second serialisation attempt when the user switches tabs. */}
			<div className={activeTab === "preview" ? undefined : "hidden"}>
				{previewSlot}
			</div>
			<div className={activeTab === "code" ? undefined : "hidden"}>
				{codeSlot}
			</div>
		</div>
	);
}
