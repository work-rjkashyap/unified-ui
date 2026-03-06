"use client";

import { Check, Clipboard } from "lucide-react";
import {
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { cn } from "@/lib/cn";

interface PreviewCardShellProps {
	previewSlot: ReactNode;
	codeSlot: ReactNode;
	code?: string;
}

export function PreviewCardShell({
	previewSlot,
	codeSlot,
	code,
}: PreviewCardShellProps) {
	const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
	const [copied, setCopied] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleCopy = useCallback(() => {
		if (!code) return;
		navigator.clipboard.writeText(code).then(() => {
			setCopied(true);
			if (timerRef.current) clearTimeout(timerRef.current);
			timerRef.current = setTimeout(() => setCopied(false), 2000);
		});
	}, [code]);

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	return (
		<div className="rounded-lg border border-fd-border bg-fd-card overflow-hidden">
			{/* Tab Bar */}
			<div className="flex items-center justify-between border-b border-fd-border">
				{/* Left: tabs */}
				<div className="flex items-center">
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

				{/* Right: copy button */}
				{code && (
					<div className="flex items-center gap-1 pr-3">
						<button
							type="button"
							onClick={handleCopy}
							className={cn(
								"inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors",
								copied
									? "text-green-500"
									: "text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-muted",
							)}
							aria-label={copied ? "Copied!" : "Copy code"}
						>
							{copied ? (
								<>
									<Check className="size-3.5" />
									<span>Copied</span>
								</>
							) : (
								<>
									<Clipboard className="size-3.5" />
									<span>Copy</span>
								</>
							)}
						</button>
					</div>
				)}
			</div>

			{/* Content — both panels stay mounted; visibility toggled via CSS */}
			<div
				className={cn(activeTab === "preview" ? undefined : "hidden")}
				suppressHydrationWarning
			>
				{previewSlot}
			</div>
			<div className={cn(activeTab === "code" ? undefined : "hidden")}>
				{codeSlot}
			</div>
		</div>
	);
}
