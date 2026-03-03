"use client";

// ============================================================================
// Navigation Component Previews
// ============================================================================
// Stateful preview wrapper components for MDX documentation pages.
// These are registered in src/mdx-components.tsx and used in the preview=
// prop of <ComponentPage> in content/components/*.mdx files.
//
// Each component is a self-contained "use client" island that manages its
// own state, keeping the MDX files free of React hooks.
// ============================================================================

import { useState } from "react";
import {
	// ContextMenu
	ContextMenu,
	ContextMenuTrigger,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuCheckboxItem,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuLabel,
	ContextMenuSeparator,
	// Menubar
	Menubar,
	MenubarMenu,
	MenubarTrigger,
	MenubarContent,
	MenubarItem,
	MenubarCheckboxItem,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarLabel,
	MenubarSeparator,
	// Steps
	Steps,
	Step,
	// Command
	Command,
	CommandTrigger,
	type CommandGroup,
} from "@work-rjkashyap/unified-ui";

// ---------------------------------------------------------------------------
// ContextMenu — Checkbox Items Preview
// ---------------------------------------------------------------------------

export function ContextMenuCheckboxPreview() {
	const [showStatusBar, setShowStatusBar] = useState(true);
	const [showActivityBar, setShowActivityBar] = useState(false);
	const [showPanel, setShowPanel] = useState(false);

	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<div className="flex h-28 w-64 items-center justify-center rounded-md border-2 border-dashed border-border text-sm text-muted-foreground select-none cursor-context-menu">
					Right-click here
				</div>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuLabel>Panels</ContextMenuLabel>
				<ContextMenuCheckboxItem
					checked={showStatusBar}
					onCheckedChange={setShowStatusBar}
				>
					Status Bar
				</ContextMenuCheckboxItem>
				<ContextMenuCheckboxItem
					checked={showActivityBar}
					onCheckedChange={setShowActivityBar}
				>
					Activity Bar
				</ContextMenuCheckboxItem>
				<ContextMenuCheckboxItem
					checked={showPanel}
					onCheckedChange={setShowPanel}
				>
					Panel
				</ContextMenuCheckboxItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}

// ---------------------------------------------------------------------------
// ContextMenu — Radio Items Preview
// ---------------------------------------------------------------------------

export function ContextMenuRadioPreview() {
	const [view, setView] = useState("list");

	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<div className="flex h-28 w-64 items-center justify-center rounded-md border-2 border-dashed border-border text-sm text-muted-foreground select-none cursor-context-menu">
					Right-click here
				</div>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuLabel>View</ContextMenuLabel>
				<ContextMenuRadioGroup value={view} onValueChange={setView}>
					<ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
					<ContextMenuRadioItem value="grid">Grid</ContextMenuRadioItem>
					<ContextMenuRadioItem value="columns">Columns</ContextMenuRadioItem>
				</ContextMenuRadioGroup>
			</ContextMenuContent>
		</ContextMenu>
	);
}

// ---------------------------------------------------------------------------
// Menubar — Checkbox + Radio Items Preview
// ---------------------------------------------------------------------------

export function MenubarCheckboxRadioPreview() {
	const [showGrid, setShowGrid] = useState(true);
	const [showRuler, setShowRuler] = useState(false);
	const [theme, setTheme] = useState("system");

	return (
		<Menubar>
			<MenubarMenu>
				<MenubarTrigger>View</MenubarTrigger>
				<MenubarContent>
					<MenubarLabel>Panels</MenubarLabel>
					<MenubarCheckboxItem
						checked={showGrid}
						onCheckedChange={setShowGrid}
					>
						Show Grid
					</MenubarCheckboxItem>
					<MenubarCheckboxItem
						checked={showRuler}
						onCheckedChange={setShowRuler}
					>
						Show Ruler
					</MenubarCheckboxItem>
					<MenubarSeparator />
					<MenubarLabel>Theme</MenubarLabel>
					<MenubarRadioGroup value={theme} onValueChange={setTheme}>
						<MenubarRadioItem value="light">Light</MenubarRadioItem>
						<MenubarRadioItem value="dark">Dark</MenubarRadioItem>
						<MenubarRadioItem value="system">System</MenubarRadioItem>
					</MenubarRadioGroup>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
}

// ---------------------------------------------------------------------------
// Steps — Clickable Wizard Preview
// ---------------------------------------------------------------------------

export function StepsClickablePreview() {
	const [active, setActive] = useState(0);

	return (
		<div className="w-full max-w-lg flex flex-col gap-4">
			<Steps currentStep={active} onStepClick={setActive}>
				<Step title="Account" description="Create your account" />
				<Step title="Profile" description="Fill in your details" />
				<Step title="Payment" description="Add payment method" />
				<Step title="Confirm" description="Review and submit" />
			</Steps>
			<div className="flex gap-2 justify-center">
				<button
					type="button"
					onClick={() => setActive(Math.max(0, active - 1))}
					disabled={active === 0}
					className="text-xs px-3 py-1.5 rounded-md border border-border hover:bg-muted transition-colors disabled:opacity-40 disabled:pointer-events-none"
				>
					Back
				</button>
				<button
					type="button"
					onClick={() => setActive(Math.min(3, active + 1))}
					disabled={active === 3}
					className="text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40 disabled:pointer-events-none"
				>
					Continue
				</button>
			</div>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Command — Basic Preview
// ---------------------------------------------------------------------------

const COMMAND_GROUPS_BASIC: CommandGroup[] = [
	{
		heading: "Navigation",
		items: [
			{
				id: "home",
				label: "Go to Home",
				description: "Navigate to the home page",
				onSelect: () => {},
			},
			{
				id: "docs",
				label: "Open Documentation",
				description: "Browse the full API reference",
				onSelect: () => {},
			},
			{
				id: "components",
				label: "View Components",
				description: "See all available components",
				onSelect: () => {},
			},
		],
	},
	{
		heading: "Actions",
		items: [
			{ id: "new-file", label: "New File", shortcut: "⌘N", onSelect: () => {} },
			{ id: "search", label: "Search...", shortcut: "⌘F", onSelect: () => {} },
			{
				id: "settings",
				label: "Open Settings",
				shortcut: "⌘,",
				onSelect: () => {},
			},
		],
	},
	{
		heading: "Appearance",
		items: [
			{ id: "light", label: "Switch to Light Mode", onSelect: () => {} },
			{ id: "dark", label: "Switch to Dark Mode", onSelect: () => {} },
			{ id: "system", label: "Use System Theme", onSelect: () => {} },
		],
	},
];

export function CommandBasicPreview() {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex flex-col items-center gap-4">
			<CommandTrigger
				onClick={() => setOpen(true)}
				label="Search commands..."
			/>
			<p className="text-xs text-muted-foreground">or press ⌘K</p>
			<Command
				open={open}
				onOpenChange={setOpen}
				groups={COMMAND_GROUPS_BASIC}
				placeholder="Search commands..."
			/>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Command — With Icons Preview
// ---------------------------------------------------------------------------

function HomeIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
			<polyline points="9 22 9 12 15 12 15 22" />
		</svg>
	);
}

function SettingsIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
			<circle cx="12" cy="12" r="3" />
		</svg>
	);
}

function FileIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
			<polyline points="14 2 14 8 20 8" />
		</svg>
	);
}

const COMMAND_GROUPS_ICONS: CommandGroup[] = [
	{
		heading: "Navigation",
		items: [
			{
				id: "home",
				label: "Home",
				icon: <HomeIcon />,
				shortcut: "⌘H",
				onSelect: () => {},
			},
			{
				id: "settings",
				label: "Settings",
				icon: <SettingsIcon />,
				shortcut: "⌘,",
				onSelect: () => {},
			},
		],
	},
	{
		heading: "Files",
		items: [
			{
				id: "new",
				label: "New File",
				icon: <FileIcon />,
				shortcut: "⌘N",
				onSelect: () => {},
			},
			{
				id: "open",
				label: "Open File",
				icon: <FileIcon />,
				shortcut: "⌘O",
				onSelect: () => {},
			},
		],
	},
];

export function CommandIconsPreview() {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex flex-col items-center gap-4">
			<CommandTrigger onClick={() => setOpen(true)} label="Type a command..." />
			<Command
				open={open}
				onOpenChange={setOpen}
				groups={COMMAND_GROUPS_ICONS}
			/>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Command — Disabled Items Preview
// ---------------------------------------------------------------------------

const COMMAND_GROUPS_DISABLED: CommandGroup[] = [
	{
		heading: "Account",
		items: [
			{ id: "profile", label: "Edit Profile", onSelect: () => {} },
			{
				id: "billing",
				label: "Billing",
				description: "Upgrade required",
				disabled: true,
				onSelect: () => {},
			},
			{
				id: "export",
				label: "Export Data",
				description: "Coming soon",
				disabled: true,
				onSelect: () => {},
			},
			{ id: "logout", label: "Log Out", shortcut: "⇧⌘Q", onSelect: () => {} },
		],
	},
];

export function CommandDisabledPreview() {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex flex-col items-center gap-4">
			<CommandTrigger onClick={() => setOpen(true)} label="Search..." />
			<Command
				open={open}
				onOpenChange={setOpen}
				groups={COMMAND_GROUPS_DISABLED}
			/>
		</div>
	);
}
