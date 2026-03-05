"use client";

import {
	SonnerToaster,
	toast,
	Button,
} from "@work-rjkashyap/unified-ui";
import { Mail, Trash2, Upload } from "lucide-react";

// ---------------------------------------------------------------------------
// Overview demo — all five toast types
// ---------------------------------------------------------------------------

export function DemoOverview() {
	return (
		<div className="flex flex-col gap-3 items-center">
			<div className="flex flex-wrap gap-2 items-center justify-center">
				<Button
					size="sm"
					variant="secondary"
					onClick={() => toast("Event has been created")}
				>
					Default
				</Button>
				<Button
					size="sm"
					variant="secondary"
					onClick={() => toast.success("Profile updated!")}
				>
					Success
				</Button>
				<Button
					size="sm"
					variant="secondary"
					onClick={() => toast.error("Something went wrong")}
				>
					Error
				</Button>
				<Button
					size="sm"
					variant="secondary"
					onClick={() => toast.warning("This action is irreversible")}
				>
					Warning
				</Button>
				<Button
					size="sm"
					variant="secondary"
					onClick={() => toast.info("New version available")}
				>
					Info
				</Button>
			</div>
			<SonnerToaster />
		</div>
	);
}

// ---------------------------------------------------------------------------
// Basic toast types
// ---------------------------------------------------------------------------

export function DemoBasicTypes() {
	return (
		<div className="flex flex-wrap gap-2 items-center justify-center">
			<Button
				size="sm"
				variant="secondary"
				onClick={() => toast("A simple notification")}
			>
				Default
			</Button>
			<Button
				size="sm"
				variant="secondary"
				onClick={() => toast.success("Changes saved successfully")}
			>
				Success
			</Button>
			<Button
				size="sm"
				variant="secondary"
				onClick={() => toast.error("Failed to save changes")}
			>
				Error
			</Button>
			<Button
				size="sm"
				variant="secondary"
				onClick={() => toast.warning("Storage almost full")}
			>
				Warning
			</Button>
			<Button
				size="sm"
				variant="secondary"
				onClick={() => toast.info("Update available")}
			>
				Info
			</Button>
		</div>
	);
}

// ---------------------------------------------------------------------------
// With description
// ---------------------------------------------------------------------------

export function DemoWithDescription() {
	return (
		<div className="flex flex-wrap gap-2 items-center justify-center">
			<Button
				size="sm"
				variant="secondary"
				onClick={() =>
					toast.success("Profile updated", {
						description:
							"Your changes have been saved and will be visible to others.",
					})
				}
			>
				With Description
			</Button>
			<Button
				size="sm"
				variant="secondary"
				onClick={() =>
					toast.error("Upload failed", {
						description:
							"The file exceeds the 10MB size limit. Please compress and try again.",
					})
				}
			>
				Error + Description
			</Button>
		</div>
	);
}

// ---------------------------------------------------------------------------
// With action
// ---------------------------------------------------------------------------

export function DemoWithAction() {
	return (
		<div className="flex flex-wrap gap-2 items-center justify-center">
			<Button
				size="sm"
				variant="secondary"
				iconLeft={<Trash2 className="size-4" />}
				onClick={() =>
					toast("File deleted", {
						description: "report-q4.pdf was moved to trash.",
						action: {
							label: "Undo",
							onClick: () => toast.success("File restored!"),
						},
					})
				}
			>
				Delete with Undo
			</Button>
			<Button
				size="sm"
				variant="secondary"
				onClick={() =>
					toast.error("Connection lost", {
						description: "Unable to reach the server.",
						action: {
							label: "Retry",
							onClick: () => toast.success("Reconnected!"),
						},
					})
				}
			>
				Error with Retry
			</Button>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Promise-based
// ---------------------------------------------------------------------------

export function DemoPromise() {
	return (
		<div className="flex flex-wrap gap-2 items-center justify-center">
			<Button
				size="sm"
				variant="secondary"
				iconLeft={<Upload className="size-4" />}
				onClick={() =>
					toast.promise(
						new Promise((resolve) => setTimeout(resolve, 2000)),
						{
							loading: "Uploading file...",
							success: "File uploaded successfully!",
							error: "Upload failed. Please try again.",
						},
					)
				}
			>
				Upload (Success)
			</Button>
			<Button
				size="sm"
				variant="secondary"
				onClick={() =>
					toast.promise(
						new Promise((_, reject) =>
							setTimeout(
								() => reject(new Error("timeout")),
								2000,
							),
						),
						{
							loading: "Sending email...",
							success: "Email sent!",
							error: "Failed to send email.",
						},
					)
				}
			>
				Send (Fails)
			</Button>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Loading toast
// ---------------------------------------------------------------------------

export function DemoLoading() {
	return (
		<div className="flex flex-wrap gap-2 items-center justify-center">
			<Button
				size="sm"
				variant="secondary"
				onClick={() => {
					const id = toast.loading("Processing payment...");
					setTimeout(() => {
						toast.success("Payment complete!", { id });
					}, 2500);
				}}
			>
				Process Payment
			</Button>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Custom duration
// ---------------------------------------------------------------------------

export function DemoCustomDuration() {
	return (
		<div className="flex flex-wrap gap-2 items-center justify-center">
			<Button
				size="sm"
				variant="secondary"
				onClick={() =>
					toast.info("This disappears quickly", { duration: 1500 })
				}
			>
				1.5s Duration
			</Button>
			<Button
				size="sm"
				variant="secondary"
				onClick={() =>
					toast.warning("This stays for 10 seconds", {
						duration: 10000,
					})
				}
			>
				10s Duration
			</Button>
			<Button
				size="sm"
				variant="secondary"
				onClick={() =>
					toast.info("This stays until you dismiss it", {
						duration: Number.POSITIVE_INFINITY,
					})
				}
			>
				Persistent
			</Button>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Custom JSX
// ---------------------------------------------------------------------------

export function DemoCustomJSX() {
	return (
		<div className="flex flex-wrap gap-2 items-center justify-center">
			<Button
				size="sm"
				variant="secondary"
				iconLeft={<Mail className="size-4" />}
				onClick={() =>
					toast.custom((id) => (
						<div className="flex items-center gap-3 bg-background border border-border rounded-lg p-3 shadow-lg">
							<div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
								<Mail className="size-4" />
							</div>
							<div className="flex-1 min-w-0">
								<p className="font-medium text-sm text-foreground">
									New message
								</p>
								<p className="text-xs text-muted-foreground truncate">
									Hey! Are you available for a quick call?
								</p>
							</div>
							<Button
								size="sm"
								variant="ghost"
								onClick={() => toast.dismiss(id)}
							>
								Dismiss
							</Button>
						</div>
					))
				}
			>
				Custom Toast
			</Button>
		</div>
	);
}
