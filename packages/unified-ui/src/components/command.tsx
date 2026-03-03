"use client";

// ============================================================================
// Unified UI — Command / Command Palette Component
// ============================================================================
// A keyboard-navigable command palette built on top of the Dialog primitive
// and native browser APIs. Provides fuzzy search over grouped commands.
//
// Features:
//   - Modal dialog triggered by ⌘K (or custom shortcut)
//   - Real-time fuzzy/substring search across command groups
//   - Keyboard navigation (Arrow up/down, Enter to execute, Escape to close)
//   - Command groups with optional headings
//   - Empty state when no results match
//   - Fully accessible: role="combobox", aria-activedescendant, role="listbox"
//
// All visual values come from CSS custom properties. NEVER hardcode values.
// ============================================================================

import { Dialog as DialogPrimitive } from "radix-ui";
import { cn } from "@unified-ui/utils/cn";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
	type ComponentPropsWithoutRef,
	type KeyboardEvent,
	type ReactNode,
	forwardRef,
} from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CommandItem {
	/** Unique identifier for the command. */
	id: string;
	/** The display label for the command. */
	label: string;
	/** Optional description shown below the label. */
	description?: string;
	/** Optional icon rendered before the label. */
	icon?: ReactNode;
	/** Optional keyboard shortcut hint. */
	shortcut?: string;
	/** Callback executed when the command is selected. */
	onSelect: () => void;
	/** Whether this command is disabled. */
	disabled?: boolean;
}

export interface CommandGroup {
	/** Heading label for this group. */
	heading?: string;
	/** Commands in this group. */
	items: CommandItem[];
}

export interface CommandProps {
	/** Whether the command palette is open. */
	open: boolean;
	/** Callback when open state changes. */
	onOpenChange: (open: boolean) => void;
	/** Groups of commands to display. */
	groups: CommandGroup[];
	/** Placeholder text for the search input. @default "Search commands..." */
	placeholder?: string;
	/** Text shown when no commands match. @default "No results found." */
	emptyText?: string;
	/** Custom keyboard shortcut to open (modifier + key). @default "k" */
	shortcutKey?: string;
}

export interface CommandInputProps
	extends ComponentPropsWithoutRef<"input"> {
	className?: string;
}

// ---------------------------------------------------------------------------
// Internal SVG icons
// ---------------------------------------------------------------------------
function SearchIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	);
}

function KbdHint({ keys }: { keys: string }) {
	return (
		<kbd className="inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
			{keys}
		</kbd>
	);
}

// ---------------------------------------------------------------------------
// Utility: simple substring search
// ---------------------------------------------------------------------------
function matchesSearch(item: CommandItem, query: string): boolean {
	if (!query) return true;
	const q = query.toLowerCase();
	return (
		item.label.toLowerCase().includes(q) ||
		(item.description?.toLowerCase().includes(q) ?? false)
	);
}

// ---------------------------------------------------------------------------
// Command (full palette)
// ---------------------------------------------------------------------------

/**
 * Command — a keyboard-navigable command palette modal.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * const groups = [
 *   {
 *     heading: "Navigation",
 *     items: [
 *       { id: "home", label: "Go to Home", icon: <Home />, onSelect: () => router.push("/") },
 *       { id: "docs", label: "Open Docs", icon: <BookOpen />, onSelect: () => router.push("/docs") },
 *     ],
 *   },
 *   {
 *     heading: "Actions",
 *     items: [
 *       { id: "new", label: "New Document", shortcut: "⌘N", onSelect: handleNew },
 *     ],
 *   },
 * ];
 *
 * return (
 *   <>
 *     <Button onClick={() => setOpen(true)}>Open Command Palette</Button>
 *     <Command open={open} onOpenChange={setOpen} groups={groups} />
 *   </>
 * );
 * ```
 */
export function Command({
	open,
	onOpenChange,
	groups,
	placeholder = "Search commands...",
	emptyText = "No results found.",
	shortcutKey = "k",
}: CommandProps) {
	const [query, setQuery] = useState("");
	const [activeIndex, setActiveIndex] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const listRef = useRef<HTMLDivElement>(null);
	const inputId = useId();
	const listboxId = useId();

	// Register global ⌘K shortcut
	useEffect(() => {
		function handleKeyDown(e: globalThis.KeyboardEvent) {
			if ((e.metaKey || e.ctrlKey) && e.key === shortcutKey) {
				e.preventDefault();
				onOpenChange(!open);
			}
		}
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [open, onOpenChange, shortcutKey]);

	// Reset state on open
	useEffect(() => {
		if (open) {
			setQuery("");
			setActiveIndex(0);
			// Focus input after dialog animation
			const timer = setTimeout(() => inputRef.current?.focus(), 50);
			return () => clearTimeout(timer);
		}
	}, [open]);

	// Filtered groups
	const filteredGroups = useMemo(() => {
		return groups
			.map((group) => ({
				...group,
				items: group.items.filter((item) => matchesSearch(item, query)),
			}))
			.filter((group) => group.items.length > 0);
	}, [groups, query]);

	// Flat list of visible (non-disabled) items for keyboard nav
	const flatItems = useMemo(
		() => filteredGroups.flatMap((g) => g.items).filter((i) => !i.disabled),
		[filteredGroups],
	);

	// Clamp activeIndex when list shrinks
	const clampedIndex = Math.min(activeIndex, Math.max(0, flatItems.length - 1));

	function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setActiveIndex((i) => Math.max(i - 1, 0));
		} else if (e.key === "Enter") {
			e.preventDefault();
			const active = flatItems[clampedIndex];
			if (active) {
				active.onSelect();
				onOpenChange(false);
			}
		} else if (e.key === "Escape") {
			onOpenChange(false);
		}
	}

	// Scroll active item into view
	useEffect(() => {
		const el = listRef.current?.querySelector<HTMLElement>(
			`[data-cmd-item][data-active="true"]`,
		);
		el?.scrollIntoView({ block: "nearest" });
	}, [clampedIndex]);

	// Track flat index across groups for keyboard nav
	let flatIndex = 0;

	return (
		<DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Overlay
					className={cn(
						"fixed inset-0 z-[var(--z-modal)] bg-black/50",
						"data-[state=open]:animate-in data-[state=open]:fade-in-0",
						"data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
					)}
				/>
				<DialogPrimitive.Content
					className={cn(
						"fixed left-1/2 top-[20%] z-[var(--z-modal)]",
						"w-full max-w-lg -translate-x-1/2",
						"rounded-lg border border-border bg-background shadow-xl",
						"overflow-hidden",
						"data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-4",
						"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
					)}
					data-ds=""
					data-ds-component="command"
					aria-label="Command Palette"
				>
					{/* Visually hidden title satisfies Radix's DialogContent accessibility requirement */}
					<DialogPrimitive.Title className="sr-only">
						Command Palette
					</DialogPrimitive.Title>
					<DialogPrimitive.Description className="sr-only">
						Search and run commands using the keyboard or mouse.
					</DialogPrimitive.Description>
					{/* Search input */}
					<div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
						<SearchIcon className="shrink-0 text-muted-foreground" />
						<input
							ref={inputRef}
							id={inputId}
							type="text"
							role="combobox"
							aria-expanded={filteredGroups.length > 0}
							aria-controls={listboxId}
							aria-activedescendant={
								flatItems[clampedIndex]
									? `cmd-item-${flatItems[clampedIndex].id}`
									: undefined
							}
							aria-autocomplete="list"
							autoComplete="off"
							spellCheck={false}
							value={query}
							onChange={(e) => {
								setQuery(e.target.value);
								setActiveIndex(0);
							}}
							onKeyDown={handleKeyDown}
							placeholder={placeholder}
							className={cn(
								"flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground",
							)}
						/>
						<KbdHint keys="Esc" />
					</div>

					{/* Results list */}
					<div
						ref={listRef}
						id={listboxId}
						role="listbox"
						aria-label="Commands"
						className="max-h-[320px] overflow-y-auto p-1"
					>
						{filteredGroups.length === 0 ? (
							<p className="py-6 text-center text-sm text-muted-foreground">
								{emptyText}
							</p>
						) : (
							filteredGroups.map((group, gi) => {
								return (
									<div key={gi} role="group" aria-label={group.heading}>
										{group.heading && (
											<p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
												{group.heading}
											</p>
										)}
										{group.items.map((item) => {
											// We need to check if item is disabled to skip counting it
											const isActive = !item.disabled && flatIndex === clampedIndex;
											if (!item.disabled) flatIndex++;

											return (
												<div
													key={item.id}
													id={`cmd-item-${item.id}`}
													role="option"
													aria-selected={isActive}
													aria-disabled={item.disabled}
													data-cmd-item=""
													data-active={isActive ? "true" : undefined}
													onMouseEnter={() => {
														if (!item.disabled) {
															const idx = flatItems.findIndex((f) => f.id === item.id);
															if (idx !== -1) setActiveIndex(idx);
														}
													}}
													onClick={() => {
														if (!item.disabled) {
															item.onSelect();
															onOpenChange(false);
														}
													}}
													className={cn(
														"flex cursor-pointer select-none items-center gap-2",
														"rounded-md px-2 py-2",
														"text-sm leading-5 outline-none",
														"transition-colors duration-fast ease-standard",
														isActive && "bg-muted text-foreground",
														item.disabled && "pointer-events-none opacity-50",
													)}
												>
													{item.icon && (
														<span className="flex size-4 shrink-0 items-center justify-center text-muted-foreground">
															{item.icon}
														</span>
													)}
													<div className="flex-1 min-w-0">
														<p className="truncate font-medium">{item.label}</p>
														{item.description && (
															<p className="truncate text-xs text-muted-foreground">
																{item.description}
															</p>
														)}
													</div>
													{item.shortcut && (
														<KbdHint keys={item.shortcut} />
													)}
												</div>
											);
										})}
									</div>
								);
							})
						)}
					</div>

					{/* Footer hint */}
					<div className="flex items-center gap-3 border-t border-border px-3 py-2">
						<span className="flex items-center gap-1 text-xs text-muted-foreground">
							<KbdHint keys="↑↓" /> navigate
						</span>
						<span className="flex items-center gap-1 text-xs text-muted-foreground">
							<KbdHint keys="↵" /> select
						</span>
						<span className="flex items-center gap-1 text-xs text-muted-foreground">
							<KbdHint keys="Esc" /> close
						</span>
					</div>
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	);
}
Command.displayName = "Command";

// ---------------------------------------------------------------------------
// CommandTrigger — convenience button with ⌘K hint
// ---------------------------------------------------------------------------

export interface CommandTriggerProps {
	/** Label for the trigger button. @default "Search commands..." */
	label?: string;
	/** Called when the trigger button is clicked. */
	onClick: () => void;
	/** Additional CSS classes. */
	className?: string;
}

/**
 * CommandTrigger — a search-bar-style button that opens the command palette.
 *
 * @example
 * ```tsx
 * <CommandTrigger onClick={() => setOpen(true)} label="Search..." />
 * ```
 */
export const CommandTrigger = forwardRef<HTMLButtonElement, CommandTriggerProps>(
	function CommandTrigger({ label = "Search commands...", onClick, className }, ref) {
		return (
			<button
				ref={ref}
				type="button"
				onClick={onClick}
				className={cn(
					"inline-flex h-9 items-center gap-2",
					"rounded-md border border-border bg-background",
					"px-3 text-sm text-muted-foreground",
					"transition-colors duration-fast ease-standard",
					"hover:border-primary/50 hover:text-foreground",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
					"w-48 md:w-64",
					className,
				)}
				data-ds=""
				data-ds-component="command-trigger"
			>
				<SearchIcon className="size-3.5 shrink-0" />
				<span className="flex-1 truncate text-left">{label}</span>
				<KbdHint keys="⌘K" />
			</button>
		);
	},
);
CommandTrigger.displayName = "CommandTrigger";
