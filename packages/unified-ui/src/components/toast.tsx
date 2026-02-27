"use client";

// ============================================================================
// Unified UI — Toast Component
// ============================================================================
// A notification toast system with imperative `useToast()` hook for
// displaying transient messages at the viewport edge. Built on the
// Unified UI token layer with CVA for variant composition.
//
// Features:
//   - 5 semantic variants: default, success, warning, danger, info
//   - Portal-rendered at viewport edge (top-right by default)
//   - Auto-dismiss with configurable duration
//   - Pause auto-dismiss on hover
//   - Action button support
//   - Stacking / queuing with max visible limit
//   - Framer Motion animations (toastSlideIn preset)
//   - `useToast()` hook for imperative usage
//   - Full WCAG AA: role="status", aria-live, keyboard dismissible
//   - Respects prefers-reduced-motion
//
// All visual values (colors, radii, spacing, transitions) come from the
// design system's CSS custom properties. NEVER hardcode design values here.
//
// Usage:
//   import { ToastProvider, useToast } from "@/design-system/components/toast";
//
//   // Wrap your app
//   <ToastProvider position="top-right" maxVisible={5}>
//     <App />
//   </ToastProvider>
//
//   // Use imperatively
//   const toast = useToast();
//   toast.success("File uploaded successfully");
//   toast.danger("Something went wrong", { duration: 8000 });
//   toast.info("New update available", {
//     action: { label: "Update", onClick: () => update() },
//   });
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
	createContext,
	forwardRef,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";

// ---------------------------------------------------------------------------
// Internal Icons
// ---------------------------------------------------------------------------

function SuccessIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="10" />
			<path d="m9 12 2 2 4-4" />
		</svg>
	);
}

function InfoIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="10" />
			<path d="M12 16v-4" />
			<path d="M12 8h.01" />
		</svg>
	);
}

function WarningIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
			<path d="M12 9v4" />
			<path d="M12 17h.01" />
		</svg>
	);
}

function DangerIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="10" />
			<path d="m15 9-6 6" />
			<path d="m9 9 6 6" />
		</svg>
	);
}

function CloseIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		</svg>
	);
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ToastVariant =
	| "default"
	| "success"
	| "warning"
	| "danger"
	| "info";

export type ToastPosition =
	| "top-right"
	| "top-left"
	| "top-center"
	| "bottom-right"
	| "bottom-left"
	| "bottom-center";

export interface ToastAction {
	/** Label text for the action button. */
	label: string;
	/** Callback fired when the action button is clicked. */
	onClick: () => void;
}

export interface ToastData {
	/** Unique ID for the toast instance. Auto-generated if not provided. */
	id: string;
	/** Semantic variant controlling color and icon. */
	variant: ToastVariant;
	/** Title text (short, bold). */
	title?: ReactNode;
	/** Description / body text. */
	description?: ReactNode;
	/** Auto-dismiss duration in milliseconds. 0 = no auto-dismiss. */
	duration: number;
	/** Optional action button. */
	action?: ToastAction;
	/** Timestamp when the toast was created. */
	createdAt: number;
}

export interface ToastOptions {
	/** Title text. */
	title?: ReactNode;
	/** Description / body text. */
	description?: ReactNode;
	/** Auto-dismiss duration in milliseconds. @default 5000 */
	duration?: number;
	/** Optional action button. */
	action?: ToastAction;
	/** Custom toast ID (for deduplication). */
	id?: string;
}

export interface ToastAPI {
	/** Show a default-styled toast. */
	toast: (messageOrOptions: string | ToastOptions) => string;
	/** Show a success toast. */
	success: (messageOrOptions: string | ToastOptions) => string;
	/** Show a warning toast. */
	warning: (messageOrOptions: string | ToastOptions) => string;
	/** Show a danger/error toast. */
	danger: (messageOrOptions: string | ToastOptions) => string;
	/** Show an info toast. */
	info: (messageOrOptions: string | ToastOptions) => string;
	/** Programmatically dismiss a specific toast by ID. */
	dismiss: (id: string) => void;
	/** Dismiss all toasts. */
	dismissAll: () => void;
}

export interface ToastProviderProps {
	children: ReactNode;
	/**
	 * Position of the toast container on screen.
	 * @default "top-right"
	 */
	position?: ToastPosition;
	/**
	 * Maximum number of visible toasts. Excess toasts are queued.
	 * @default 5
	 */
	maxVisible?: number;
	/**
	 * Default auto-dismiss duration in milliseconds.
	 * Individual toasts can override this.
	 * @default 5000
	 */
	defaultDuration?: number;
	/**
	 * Gap between toasts in pixels.
	 * @default 8
	 */
	gap?: number;
}

export interface ToastItemProps extends React.HTMLAttributes<HTMLDivElement> {
	/** The toast data to render. */
	toast: ToastData;
	/** Callback to dismiss this toast. */
	onDismiss: (id: string) => void;
	/** Whether the toast container is in a bottom position. */
	isBottom: boolean;
}

// ---------------------------------------------------------------------------
// CVA Variant Definition
// ---------------------------------------------------------------------------

export const toastVariants = cva(
	[
		// Layout
		"relative flex items-start gap-3",
		// Shape
		"rounded-ds-lg",
		// Padding
		"px-4 py-3",
		// Shadow (elevated)
		"shadow-ds-lg",
		// Border
		"border",
		// Width
		"w-full max-w-[360px]",
		// Typography
		"text-sm leading-5",
		// Pointer
		"pointer-events-auto",
	],
	{
		variants: {
			variant: {
				default: [
					"bg-ds-surface-raised",
					"text-ds-foreground",
					"border-ds-border",
				],
				success: [
					"bg-ds-success-muted",
					"text-ds-success-muted-foreground",
					"border-ds-success/20",
				],
				warning: [
					"bg-ds-warning-muted",
					"text-ds-warning-muted-foreground",
					"border-ds-warning/20",
				],
				danger: [
					"bg-ds-danger-muted",
					"text-ds-danger-muted-foreground",
					"border-ds-danger/20",
				],
				info: [
					"bg-ds-info-muted",
					"text-ds-info-muted-foreground",
					"border-ds-info/20",
				],
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

// ---------------------------------------------------------------------------
// Icon and color maps
// ---------------------------------------------------------------------------

const defaultIconMap: Record<
	Exclude<ToastVariant, "default">,
	React.FC<{ className?: string }>
> = {
	success: SuccessIcon,
	warning: WarningIcon,
	danger: DangerIcon,
	info: InfoIcon,
};

const iconColorMap: Record<ToastVariant, string> = {
	default: "text-ds-muted-foreground",
	success: "text-ds-success",
	warning: "text-ds-warning",
	danger: "text-ds-danger",
	info: "text-ds-info",
};

// ---------------------------------------------------------------------------
// Position classes
// ---------------------------------------------------------------------------

const positionClasses: Record<ToastPosition, string> = {
	"top-right": "top-0 right-0 items-end",
	"top-left": "top-0 left-0 items-start",
	"top-center": "top-0 left-1/2 -translate-x-1/2 items-center",
	"bottom-right": "bottom-0 right-0 items-end",
	"bottom-left": "bottom-0 left-0 items-start",
	"bottom-center": "bottom-0 left-1/2 -translate-x-1/2 items-center",
};

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

function getMotionVariants(position: ToastPosition) {
	const isRight = position.includes("right");
	const isLeft = position.includes("left");
	const isBottom = position.includes("bottom");
	const isCenter = position.includes("center");

	const xOffset = isRight ? 24 : isLeft ? -24 : 0;
	const yOffset = isCenter ? (isBottom ? 16 : -16) : 0;

	return {
		initial: {
			opacity: 0,
			x: xOffset,
			y: yOffset,
			scale: 0.95,
		},
		animate: {
			opacity: 1,
			x: 0,
			y: 0,
			scale: 1,
		},
		exit: {
			opacity: 0,
			x: xOffset,
			y: yOffset,
			scale: 0.95,
			transition: { duration: 0.15 },
		},
	};
}

const springTransition = {
	type: "spring" as const,
	stiffness: 400,
	damping: 30,
	mass: 0.8,
};

// Instant transition for users who prefer reduced motion.
const instantTransition = {
	type: "tween" as const,
	duration: 0.15,
};

/**
 * Returns motion variants that respect reduced motion preference.
 * When reduced motion is preferred, only opacity fades are used
 * (no slide or scale transforms).
 */
function getReducedMotionVariants() {
	return {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0, transition: { duration: 0.1 } },
	};
}

// ---------------------------------------------------------------------------
// ID Generator
// ---------------------------------------------------------------------------

let toastIdCounter = 0;

function generateToastId(): string {
	toastIdCounter += 1;
	return `ds-toast-${toastIdCounter}-${Date.now()}`;
}

// ---------------------------------------------------------------------------
// Toast Context
// ---------------------------------------------------------------------------

const ToastContext = createContext<ToastAPI | null>(null);

// ---------------------------------------------------------------------------
// Toast Item Component
// ---------------------------------------------------------------------------

/**
 * ToastItem — a single toast notification.
 *
 * Handles auto-dismiss timing, pause-on-hover, close button, and
 * action button rendering.
 */
export const ToastItem = forwardRef<HTMLDivElement, ToastItemProps>(
	function ToastItem(
		{ toast: toastData, onDismiss, isBottom, ...rest },
		ref,
	) {
		const { id, variant, title, description, duration, action } = toastData;
		const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
		const remainingRef = useRef(duration);
		const startTimeRef = useRef(Date.now());
		const [isPaused, setIsPaused] = useState(false);

		// ----- Auto-dismiss timer -----
		const startTimer = useCallback(() => {
			if (remainingRef.current <= 0) return;
			startTimeRef.current = Date.now();
			timerRef.current = setTimeout(() => {
				onDismiss(id);
			}, remainingRef.current);
		}, [id, onDismiss]);

		const pauseTimer = useCallback(() => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
				timerRef.current = null;
				const elapsed = Date.now() - startTimeRef.current;
				remainingRef.current = Math.max(
					0,
					remainingRef.current - elapsed,
				);
			}
		}, []);

		useEffect(() => {
			if (duration > 0) {
				startTimer();
			}
			return () => {
				if (timerRef.current) {
					clearTimeout(timerRef.current);
				}
			};
		}, [duration, startTimer]);

		const handleMouseEnter = useCallback(() => {
			if (duration > 0) {
				pauseTimer();
				setIsPaused(true);
			}
		}, [duration, pauseTimer]);

		const handleMouseLeave = useCallback(() => {
			if (duration > 0) {
				startTimer();
				setIsPaused(false);
			}
		}, [duration, startTimer]);

		const handleKeyDown = useCallback(
			(e: React.KeyboardEvent) => {
				if (e.key === "Escape") {
					onDismiss(id);
				}
			},
			[id, onDismiss],
		);

		// Resolve icon
		const IconComponent =
			variant !== "default" ? defaultIconMap[variant] : null;

		return (
			<div
				ref={ref}
				role="status"
				aria-live="polite"
				aria-atomic="true"
				tabIndex={0}
				className={cn(toastVariants({ variant }))}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onKeyDown={handleKeyDown}
				data-ds=""
				data-ds-component="toast"
				data-ds-variant={variant}
				{...rest}
			>
				{/* Icon */}
				{IconComponent && (
					<span
						className={cn("shrink-0 mt-0.5", iconColorMap[variant])}
					>
						<IconComponent className="size-4" />
					</span>
				)}

				{/* Content */}
				<div className="flex-1 min-w-0">
					{title && (
						<div className="font-semibold leading-5">{title}</div>
					)}
					{description && (
						<div
							className={cn(
								"leading-5",
								title && "mt-0.5 opacity-90",
							)}
						>
							{description}
						</div>
					)}
					{action && (
						<button
							type="button"
							onClick={() => {
								action.onClick();
								onDismiss(id);
							}}
							className={cn(
								"mt-2 inline-flex items-center",
								"text-xs font-semibold",
								"underline underline-offset-2",
								"hover:no-underline",
								"transition-all duration-ds-fast",
								"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-1 rounded-ds-sm",
							)}
						>
							{action.label}
						</button>
					)}
				</div>

				{/* Close button */}
				<button
					type="button"
					onClick={() => onDismiss(id)}
					className={cn(
						"shrink-0",
						"inline-flex items-center justify-center",
						"size-5 rounded-ds-sm",
						"text-current opacity-40",
						"hover:opacity-100",
						"transition-opacity duration-ds-fast",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-1",
					)}
					aria-label="Dismiss notification"
				>
					<CloseIcon className="size-3.5" />
				</button>

				{/* Progress bar for auto-dismiss */}
				{duration > 0 && (
					<div
						className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden rounded-b-ds-lg"
						aria-hidden="true"
					>
						<div
							className={cn(
								"h-full origin-left",
								variant === "default" &&
									"bg-ds-muted-foreground/30",
								variant === "success" && "bg-ds-success/30",
								variant === "warning" && "bg-ds-warning/30",
								variant === "danger" && "bg-ds-danger/30",
								variant === "info" && "bg-ds-info/30",
							)}
							style={{
								animation: isPaused
									? "none"
									: `ds-toast-progress ${duration}ms linear forwards`,
								animationPlayState: isPaused
									? "paused"
									: "running",
							}}
						/>
					</div>
				)}
			</div>
		);
	},
);

ToastItem.displayName = "ToastItem";

// ---------------------------------------------------------------------------
// Toast Container Component
// ---------------------------------------------------------------------------

interface ToastContainerProps {
	toasts: ToastData[];
	position: ToastPosition;
	gap: number;
	onDismiss: (id: string) => void;
}

function ToastContainer({
	toasts,
	position,
	gap,
	onDismiss,
}: ToastContainerProps) {
	const [mounted, setMounted] = useState(false);
	const isBottom = position.includes("bottom");
	const prefersReduced = useReducedMotion();
	const motionVariants = prefersReduced
		? getReducedMotionVariants()
		: getMotionVariants(position);
	const transition = prefersReduced ? instantTransition : springTransition;

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const container = (
		<div
			className={cn(
				"fixed z-[var(--ds-z-toast)]",
				"flex flex-col",
				"p-4",
				"pointer-events-none",
				"max-h-screen overflow-hidden",
				positionClasses[position],
			)}
			style={{ gap: `${gap}px` }}
			data-ds=""
			data-ds-component="toast-container"
			data-ds-position={position}
		>
			{/* Inject the progress bar keyframes */}
			<style
				dangerouslySetInnerHTML={{
					__html: `@keyframes ds-toast-progress { from { transform: scaleX(1); } to { transform: scaleX(0); } }`,
				}}
			/>
			<AnimatePresence initial={false} mode="popLayout">
				{(isBottom ? [...toasts].reverse() : toasts).map((toast) => (
					<motion.div
						key={toast.id}
						layout
						variants={motionVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={transition}
					>
						<ToastItem
							toast={toast}
							onDismiss={onDismiss}
							isBottom={isBottom}
						/>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);

	return createPortal(container, document.body);
}

// ---------------------------------------------------------------------------
// Toast Provider
// ---------------------------------------------------------------------------

/**
 * ToastProvider — wraps your application and provides the toast context.
 *
 * Renders a portal-mounted toast container at the specified viewport
 * position. Child components access the toast API via `useToast()`.
 *
 * @example
 * ```tsx
 * // In your root layout or providers
 * <ToastProvider position="top-right" maxVisible={5}>
 *   <App />
 * </ToastProvider>
 *
 * // In any child component
 * function MyComponent() {
 *   const toast = useToast();
 *
 *   return (
 *     <button onClick={() => toast.success("Saved!")}>
 *       Save
 *     </button>
 *   );
 * }
 * ```
 */
export function ToastProvider({
	children,
	position = "top-right",
	maxVisible = 5,
	defaultDuration = 5000,
	gap = 8,
}: ToastProviderProps) {
	const [toasts, setToasts] = useState<ToastData[]>([]);

	const dismiss = useCallback((id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}, []);

	const dismissAll = useCallback(() => {
		setToasts([]);
	}, []);

	const addToast = useCallback(
		(
			variant: ToastVariant,
			messageOrOptions: string | ToastOptions,
		): string => {
			const options: ToastOptions =
				typeof messageOrOptions === "string"
					? { description: messageOrOptions }
					: messageOrOptions;

			const id = options.id ?? generateToastId();

			const newToast: ToastData = {
				id,
				variant,
				title: options.title,
				description: options.description,
				duration: options.duration ?? defaultDuration,
				action: options.action,
				createdAt: Date.now(),
			};

			setToasts((prev) => {
				// If a toast with the same ID already exists, replace it
				const existing = prev.findIndex((t) => t.id === id);
				if (existing >= 0) {
					const updated = [...prev];
					updated[existing] = newToast;
					return updated;
				}
				// Otherwise add new, respecting max visible limit
				const next = [...prev, newToast];
				if (next.length > maxVisible) {
					return next.slice(next.length - maxVisible);
				}
				return next;
			});

			return id;
		},
		[defaultDuration, maxVisible],
	);

	const api: ToastAPI = useMemo(
		() => ({
			toast: (msg) => addToast("default", msg),
			success: (msg) => addToast("success", msg),
			warning: (msg) => addToast("warning", msg),
			danger: (msg) => addToast("danger", msg),
			info: (msg) => addToast("info", msg),
			dismiss,
			dismissAll,
		}),
		[addToast, dismiss, dismissAll],
	);

	return (
		<ToastContext.Provider value={api}>
			{children}
			<ToastContainer
				toasts={toasts}
				position={position}
				gap={gap}
				onDismiss={dismiss}
			/>
		</ToastContext.Provider>
	);
}

ToastProvider.displayName = "ToastProvider";

// ---------------------------------------------------------------------------
// useToast Hook
// ---------------------------------------------------------------------------

/**
 * useToast — imperative hook for showing toast notifications.
 *
 * Must be used within a `<ToastProvider>`.
 *
 * @example
 * ```tsx
 * const toast = useToast();
 *
 * // Simple string message
 * toast.success("File uploaded");
 * toast.danger("Upload failed");
 * toast.info("Processing...");
 * toast.warning("Disk space low");
 *
 * // With options
 * toast.success({
 *   title: "Payment received",
 *   description: "Order #12345 has been confirmed.",
 *   duration: 8000,
 * });
 *
 * // With action button
 * toast.info({
 *   title: "New version available",
 *   description: "v2.1.0 is ready to install.",
 *   action: { label: "Update now", onClick: () => doUpdate() },
 * });
 *
 * // Dismiss programmatically
 * const id = toast.info("Uploading...", { duration: 0 });
 * // ...later
 * toast.dismiss(id);
 *
 * // Dismiss all
 * toast.dismissAll();
 * ```
 */
export function useToast(): ToastAPI {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error(
			"useToast must be used within a <ToastProvider>. " +
				"Wrap your application (or a subtree) with <ToastProvider> to use the toast API.",
		);
	}
	return context;
}
