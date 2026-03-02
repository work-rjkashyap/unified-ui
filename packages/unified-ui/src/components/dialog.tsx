"use client";

// ============================================================================
// Unified UI — Dialog Component
// ============================================================================
// A production-ready dialog/modal component built on Radix UI's Dialog
// primitive and the Unified UI token layer. Uses CVA for variant composition
// and tailwind-merge (via cn) for safe class merging.
//
// Features:
//   - Built on @radix-ui/react-dialog for full accessibility
//   - 4 sizes: sm (480px), md (560px), lg (720px), full
//   - Slot components: DialogHeader, DialogBody, DialogFooter
//   - Overlay backdrop with fade animation
//   - Modal content with scale + slide animation
//   - Focus trap (Radix handles this)
//   - Close on Escape (Radix handles this)
//   - Scroll lock on body (Radix handles this)
//   - Optional close button
//   - Uses z-modal (content) and z-overlay (backdrop)
//   - rounded-lg per project guideline for dialogs
//   - WCAG AA accessible: focus management, aria-labelledby, aria-describedby
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import {
//     Dialog, DialogTrigger, DialogContent,
//     DialogHeader, DialogBody, DialogFooter,
//     DialogTitle, DialogDescription, DialogClose
//   } from "@/design-system/components/dialog";
//
//   <Dialog>
//     <DialogTrigger asChild>
//       <Button>Open Dialog</Button>
//     </DialogTrigger>
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>Edit Profile</DialogTitle>
//         <DialogDescription>Make changes to your profile.</DialogDescription>
//       </DialogHeader>
//       <DialogBody>
//         <Input placeholder="Name" />
//       </DialogBody>
//       <DialogFooter>
//         <DialogClose asChild>
//           <Button variant="secondary">Cancel</Button>
//         </DialogClose>
//         <Button>Save</Button>
//       </DialogFooter>
//     </DialogContent>
//   </Dialog>
// ============================================================================

import { Dialog as DialogPrimitive } from "radix-ui";
import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { cva } from "class-variance-authority";
import {
	type ComponentPropsWithoutRef,
	forwardRef,
	type HTMLAttributes,
	type ReactNode,
} from "react";

// ---------------------------------------------------------------------------
// CVA Variant Definitions
// ---------------------------------------------------------------------------

export const dialogContentVariants = cva(
	[
		// Positioning
		"fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
		// Z-index
		"z-[var(--z-modal)]",
		// Layout
		"flex flex-col",
		"w-full",
		// Visual
		"rounded-lg",
		"border border-border",
		"bg-background",
		"shadow-xl",
		// Overflow
		"max-h-[85vh]",
		// Animation
		"data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
		"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 to-top-[48%]",
		// Focus
		"outline-none",
	],
	{
		variants: {
			size: {
				sm: "max-w-[480px]",
				md: "max-w-[560px]",
				lg: "max-w-[720px]",
				full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type DialogSize = "sm" | "md" | "lg" | "full";

export interface DialogProps extends DialogPrimitive.DialogProps {
	children: ReactNode;
}

export interface DialogTriggerProps extends ComponentPropsWithoutRef<
	typeof DialogPrimitive.Trigger
> {
	className?: string;
}

export interface DialogContentProps extends Omit<
	ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
	"asChild"
> {
	size?: DialogSize;
	showClose?: boolean;
	overlayClassName?: string;
	className?: string;
	children: ReactNode;
}

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children: ReactNode;
}

export interface DialogBodyProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children: ReactNode;
}

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children: ReactNode;
}

export interface DialogTitleProps extends ComponentPropsWithoutRef<
	typeof DialogPrimitive.Title
> {
	className?: string;
	children: ReactNode;
}

export interface DialogDescriptionProps extends ComponentPropsWithoutRef<
	typeof DialogPrimitive.Description
> {
	className?: string;
	children: ReactNode;
}

export interface DialogCloseProps extends ComponentPropsWithoutRef<
	typeof DialogPrimitive.Close
> {
	className?: string;
}

// ---------------------------------------------------------------------------
// Close Icon (Internal)
// ---------------------------------------------------------------------------

function CloseIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		</svg>
	);
}

// ---------------------------------------------------------------------------
// Dialog Root
// ---------------------------------------------------------------------------

export function Dialog({ children, ...rest }: DialogProps) {
	return <DialogPrimitive.Root {...rest}>{children}</DialogPrimitive.Root>;
}
Dialog.displayName = "Dialog";

// ---------------------------------------------------------------------------
// DialogTrigger
// ---------------------------------------------------------------------------

export const DialogTrigger = forwardRef<
	React.ComponentRef<typeof DialogPrimitive.Trigger>,
	DialogTriggerProps
>(function DialogTrigger({ className, ...rest }, ref) {
	return (
		<DialogPrimitive.Trigger
			ref={ref}
			className={className}
			data-ds=""
			data-ds-component="dialog-trigger"
			{...rest}
		/>
	);
});
DialogTrigger.displayName = "DialogTrigger";

// ---------------------------------------------------------------------------
// Dialog Overlay (Internal)
// ---------------------------------------------------------------------------

const DialogOverlay = forwardRef<
	React.ComponentRef<typeof DialogPrimitive.Overlay>,
	ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function DialogOverlay({ className, ...rest }, ref) {
	return (
		<DialogPrimitive.Overlay
			ref={ref}
			className={cn(
				"fixed inset-0",
				"z-[var(--z-overlay)]",
				"bg-black/50",
				"data-[state=open]:animate-in data-[state=open]:fade-in-0",
				"data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
				className,
			)}
			{...rest}
		/>
	);
});
DialogOverlay.displayName = "DialogOverlay";

// ---------------------------------------------------------------------------
// DialogContent
// ---------------------------------------------------------------------------

export const DialogContent = forwardRef<
	React.ComponentRef<typeof DialogPrimitive.Content>,
	DialogContentProps
>(function DialogContent(
	{
		size = "md",
		showClose = true,
		overlayClassName,
		className,
		children,
		...rest
	},
	ref,
) {
	return (
		<DialogPrimitive.Portal>
			<DialogOverlay className={overlayClassName} />
			<DialogPrimitive.Content
				ref={ref}
				className={cn("not-prose", dialogContentVariants({ size }), className)}
				data-ds=""
				data-ds-component="dialog"
				data-ds-size={size}
				{...rest}
			>
				{children}
				{showClose && (
					<DialogPrimitive.Close
						className={cn(
							"absolute right-4 top-4",
							"inline-flex items-center justify-center",
							"rounded-sm p-1",
							"text-muted-foreground hover:text-foreground",
							"transition-colors duration-fast",
							focusRingClasses,
						)}
						aria-label="Close"
					>
						<CloseIcon className="size-4" />
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	);
});
DialogContent.displayName = "DialogContent";

// ---------------------------------------------------------------------------
// DialogHeader / DialogBody / DialogFooter
// ---------------------------------------------------------------------------

export function DialogHeader({
	className,
	children,
	...rest
}: DialogHeaderProps) {
	return (
		<div
			className={cn("flex flex-col gap-1.5 px-6 pt-6", className)}
			data-ds=""
			data-ds-component="dialog-header"
			{...rest}
		>
			{children}
		</div>
	);
}
DialogHeader.displayName = "DialogHeader";

export function DialogBody({ className, children, ...rest }: DialogBodyProps) {
	return (
		<div
			className={cn("flex-1 overflow-y-auto px-6 py-4", className)}
			data-ds=""
			data-ds-component="dialog-body"
			{...rest}
		>
			{children}
		</div>
	);
}
DialogBody.displayName = "DialogBody";

export function DialogFooter({
	className,
	children,
	...rest
}: DialogFooterProps) {
	return (
		<div
			className={cn(
				"flex items-center justify-end gap-2 px-6 pb-6 pt-2",
				className,
			)}
			data-ds=""
			data-ds-component="dialog-footer"
			{...rest}
		>
			{children}
		</div>
	);
}
DialogFooter.displayName = "DialogFooter";

// ---------------------------------------------------------------------------
// DialogTitle / DialogDescription
// ---------------------------------------------------------------------------

export const DialogTitle = forwardRef<
	React.ComponentRef<typeof DialogPrimitive.Title>,
	DialogTitleProps
>(function DialogTitle({ className, children, ...rest }, ref) {
	return (
		<DialogPrimitive.Title
			ref={ref}
			className={cn(
				"text-lg font-semibold leading-6 text-foreground",
				className,
			)}
			data-ds=""
			data-ds-component="dialog-title"
			{...rest}
		>
			{children}
		</DialogPrimitive.Title>
	);
});
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = forwardRef<
	React.ComponentRef<typeof DialogPrimitive.Description>,
	DialogDescriptionProps
>(function DialogDescription({ className, children, ...rest }, ref) {
	return (
		<DialogPrimitive.Description
			ref={ref}
			className={cn(
				"text-sm leading-5 text-muted-foreground",
				className,
			)}
			data-ds=""
			data-ds-component="dialog-description"
			{...rest}
		>
			{children}
		</DialogPrimitive.Description>
	);
});
DialogDescription.displayName = "DialogDescription";

// ---------------------------------------------------------------------------
// DialogClose
// ---------------------------------------------------------------------------

export const DialogClose = forwardRef<
	React.ComponentRef<typeof DialogPrimitive.Close>,
	DialogCloseProps
>(function DialogClose({ className, ...rest }, ref) {
	return (
		<DialogPrimitive.Close
			ref={ref}
			className={className}
			data-ds=""
			data-ds-component="dialog-close"
			{...rest}
		/>
	);
});
DialogClose.displayName = "DialogClose";
