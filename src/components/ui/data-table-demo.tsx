"use client";

import {
	DataTable,
	Badge,
	type ColumnDef,
	type DataTableFacetedFilter,
	type DataTableColumnMeta,
} from "@work-rjkashyap/unified-ui";
import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// Sample data type
// ---------------------------------------------------------------------------

type User = {
	id: string;
	name: string;
	email: string;
	role: string;
	status: string;
	amount: number;
};

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

const sampleData: User[] = [
	{
		id: "INV-001",
		name: "Alice Johnson",
		email: "alice@example.com",
		role: "Admin",
		status: "Active",
		amount: 2500,
	},
	{
		id: "INV-002",
		name: "Bob Smith",
		email: "bob@example.com",
		role: "Editor",
		status: "Active",
		amount: 1800,
	},
	{
		id: "INV-003",
		name: "Charlie Brown",
		email: "charlie@example.com",
		role: "Viewer",
		status: "Inactive",
		amount: 950,
	},
	{
		id: "INV-004",
		name: "Diana Prince",
		email: "diana@example.com",
		role: "Admin",
		status: "Active",
		amount: 3200,
	},
	{
		id: "INV-005",
		name: "Eve Wilson",
		email: "eve@example.com",
		role: "Editor",
		status: "Pending",
		amount: 1400,
	},
	{
		id: "INV-006",
		name: "Frank Castle",
		email: "frank@example.com",
		role: "Viewer",
		status: "Inactive",
		amount: 600,
	},
	{
		id: "INV-007",
		name: "Grace Lee",
		email: "grace@example.com",
		role: "Admin",
		status: "Active",
		amount: 4100,
	},
	{
		id: "INV-008",
		name: "Hank Pym",
		email: "hank@example.com",
		role: "Editor",
		status: "Active",
		amount: 2200,
	},
	{
		id: "INV-009",
		name: "Ivy Chen",
		email: "ivy@example.com",
		role: "Viewer",
		status: "Pending",
		amount: 780,
	},
	{
		id: "INV-010",
		name: "Jack Ryan",
		email: "jack@example.com",
		role: "Admin",
		status: "Active",
		amount: 5000,
	},
	{
		id: "INV-011",
		name: "Karen Page",
		email: "karen@example.com",
		role: "Editor",
		status: "Inactive",
		amount: 1100,
	},
	{
		id: "INV-012",
		name: "Leo Fitz",
		email: "leo@example.com",
		role: "Viewer",
		status: "Active",
		amount: 1650,
	},
];

// ---------------------------------------------------------------------------
// Column definitions (with cell render functions)
// ---------------------------------------------------------------------------

const fullColumns: ColumnDef<User, any>[] = [
	{ accessorKey: "id", header: "Invoice" },
	{ accessorKey: "name", header: "Name" },
	{ accessorKey: "email", header: "Email" },
	{ accessorKey: "role", header: "Role" },
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ getValue }) => {
			const status = getValue() as string;
			const variant =
				status === "Active"
					? "success"
					: status === "Pending"
						? "warning"
						: ("default" as const);
			return (
				<Badge variant={variant} size="sm">
					{status}
				</Badge>
			);
		},
	},
	{
		accessorKey: "amount",
		header: "Amount",
		cell: ({ getValue }) => `$${(getValue() as number).toLocaleString()}`,
		meta: { align: "right" as const },
	},
];

const simpleColumns: ColumnDef<User, any>[] = [
	{ accessorKey: "id", header: "Invoice" },
	{ accessorKey: "name", header: "Name" },
	{ accessorKey: "email", header: "Email" },
	{ accessorKey: "role", header: "Role" },
];

const pinnedColumns: ColumnDef<User, any>[] = [
	{ accessorKey: "id", header: "Invoice", size: 100 },
	{ accessorKey: "name", header: "Name", size: 160 },
	{ accessorKey: "email", header: "Email", size: 220 },
	{ accessorKey: "role", header: "Role", size: 120 },
	{
		accessorKey: "status",
		header: "Status",
		size: 120,
		cell: ({ getValue }) => {
			const status = getValue() as string;
			const variant =
				status === "Active"
					? "success"
					: status === "Pending"
						? "warning"
						: ("default" as const);
			return (
				<Badge variant={variant} size="sm">
					{status}
				</Badge>
			);
		},
	},
	{
		accessorKey: "amount",
		header: "Amount",
		size: 120,
		cell: ({ getValue }) => `$${(getValue() as number).toLocaleString()}`,
		meta: { align: "right" as const },
	},
];

const customCellColumns: ColumnDef<User, any>[] = [
	{
		accessorKey: "name",
		header: "User",
		cell: ({ row }) => (
			<div className="flex flex-col">
				<span className="font-medium text-ds-foreground">
					{row.original.name}
				</span>
				<span className="text-xs text-ds-muted-foreground">
					{row.original.email}
				</span>
			</div>
		),
	},
	{
		accessorKey: "role",
		header: "Role",
		cell: ({ getValue }) => {
			const role = getValue() as string;
			const variant =
				role === "Admin"
					? "primary"
					: role === "Editor"
						? "info"
						: ("default" as const);
			return (
				<Badge variant={variant} size="sm">
					{role}
				</Badge>
			);
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ getValue }) => {
			const status = getValue() as string;
			const isActive = status === "Active";
			return (
				<div className="flex items-center gap-1.5">
					<span
						className={`inline-block size-2 rounded-full ${isActive ? "bg-green-500" : status === "Pending" ? "bg-yellow-500" : "bg-zinc-400"}`}
					/>
					<span className="text-sm">{status}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "amount",
		header: "Amount",
		cell: ({ getValue }) => {
			const amount = getValue() as number;
			return (
				<span
					className={`font-mono text-sm tabular-nums ${amount >= 2000 ? "text-green-600 dark:text-green-400" : "text-ds-foreground"}`}
				>
					${amount.toLocaleString()}
				</span>
			);
		},
		meta: { align: "right" as const },
	},
];

const wideColumns: ColumnDef<User, any>[] = [
	{ accessorKey: "id", header: "Invoice", size: 120 },
	{ accessorKey: "name", header: "Full Name", size: 200 },
	{ accessorKey: "email", header: "Email Address", size: 250 },
	{ accessorKey: "role", header: "Role", size: 140 },
	{
		accessorKey: "status",
		header: "Account Status",
		size: 160,
		cell: ({ getValue }) => {
			const status = getValue() as string;
			const variant =
				status === "Active"
					? "success"
					: status === "Pending"
						? "warning"
						: ("default" as const);
			return (
				<Badge variant={variant} size="sm">
					{status}
				</Badge>
			);
		},
	},
	{
		accessorKey: "amount",
		header: "Total Amount",
		size: 150,
		cell: ({ getValue }) => `$${(getValue() as number).toLocaleString()}`,
		meta: { align: "right" as const },
	},
	{
		id: "created",
		header: "Created At",
		size: 160,
		cell: () => "2024-01-15",
	},
	{
		id: "updated",
		header: "Last Updated",
		size: 160,
		cell: () => "2025-06-10",
	},
];

// ---------------------------------------------------------------------------
// Demo variants
// ---------------------------------------------------------------------------

type DataTableDemoVariant =
	| "basic"
	| "sorting"
	| "filtering"
	| "pagination"
	| "row-selection"
	| "column-visibility"
	| "density-comfortable"
	| "density-compact"
	| "striped-bordered"
	| "loading"
	| "empty"
	| "column-pinning"
	| "custom-cells"
	| "responsive"
	| "caption"
	| "toolbar-footer"
	| "kitchen-sink"
	| "tasks";

// ---------------------------------------------------------------------------
// Task management data & columns (matches screenshot)
// ---------------------------------------------------------------------------

type Task = {
	id: string;
	title: string;
	label: "feature" | "bug" | "enhancement" | "documentation";
	status: "Todo" | "In-Progress" | "Done" | "Cancelled";
	priority: "Low" | "Medium" | "High";
	estHours: number;
	createdAt: string;
};

const taskData: Task[] = [
	{
		id: "TASK-7493",
		title: "The OCR matrix is down, navigate the virtual feed so we can program the ...",
		label: "feature",
		status: "In-Progress",
		priority: "Low",
		estHours: 14,
		createdAt: "February 28, 2026",
	},
	{
		id: "TASK-2048",
		title: "I'll back up the virtual VGA sensor, that should protocol the SDD applicati...",
		label: "enhancement",
		status: "In-Progress",
		priority: "Low",
		estHours: 19,
		createdAt: "February 28, 2026",
	},
	{
		id: "TASK-8557",
		title: "Try to hack the GB transmitter, maybe it will generate the multi-byte firew...",
		label: "bug",
		status: "Todo",
		priority: "Low",
		estHours: 24,
		createdAt: "February 28, 2026",
	},
	{
		id: "TASK-4375",
		title: "If we bypass the interface, we can get to the THX panel through the back-...",
		label: "enhancement",
		status: "In-Progress",
		priority: "Low",
		estHours: 19,
		createdAt: "February 27, 2026",
	},
	{
		id: "TASK-3202",
		title: "I'll program the online HDD array, that should bus the DRAM matrix!",
		label: "documentation",
		status: "In-Progress",
		priority: "Low",
		estHours: 10,
		createdAt: "February 27, 2026",
	},
	{
		id: "TASK-2496",
		title: "Connecting the pixel won't do anything, we need to connect the multi-byt...",
		label: "feature",
		status: "In-Progress",
		priority: "Low",
		estHours: 19,
		createdAt: "February 27, 2026",
	},
	{
		id: "TASK-3513",
		title: "You can't input the feed without generating the virtual VGA card!",
		label: "feature",
		status: "Done",
		priority: "Low",
		estHours: 18,
		createdAt: "February 27, 2026",
	},
	{
		id: "TASK-4272",
		title: "Programming the protocol won't do anything, we need to calculate the sol...",
		label: "feature",
		status: "In-Progress",
		priority: "Medium",
		estHours: 11,
		createdAt: "February 27, 2026",
	},
	{
		id: "TASK-8142",
		title: "Use the primary GB capacitor, then you can parse the bluetooth microchip!",
		label: "enhancement",
		status: "In-Progress",
		priority: "Low",
		estHours: 22,
		createdAt: "February 27, 2026",
	},
	{
		id: "TASK-5700",
		title: "I'll compress the mobile GB card, that should alarm the UDP application!",
		label: "feature",
		status: "In-Progress",
		priority: "Medium",
		estHours: 8,
		createdAt: "February 27, 2026",
	},
	{
		id: "TASK-1234",
		title: "We need to bypass the neural SSD card to index the wireless bus!",
		label: "bug",
		status: "Todo",
		priority: "High",
		estHours: 32,
		createdAt: "February 26, 2026",
	},
	{
		id: "TASK-9876",
		title: "The TCP interface is down, quantify the digital panel so we can hack...",
		label: "feature",
		status: "Done",
		priority: "Medium",
		estHours: 16,
		createdAt: "February 26, 2026",
	},
	{
		id: "TASK-5432",
		title: "Synthesizing the driver won't do anything, we need to navigate the back-end...",
		label: "documentation",
		status: "In-Progress",
		priority: "Low",
		estHours: 6,
		createdAt: "February 26, 2026",
	},
	{
		id: "TASK-6789",
		title: "Try to override the SAS transmitter, maybe it will override the cross-platform...",
		label: "bug",
		status: "Cancelled",
		priority: "High",
		estHours: 28,
		createdAt: "February 25, 2026",
	},
];

const labelVariantMap: Record<
	Task["label"],
	"default" | "primary" | "info" | "warning"
> = {
	feature: "primary",
	bug: "warning",
	enhancement: "info",
	documentation: "default",
};

const statusIconMap: Record<Task["status"], string> = {
	Todo: "◎",
	"In-Progress": "◑",
	Done: "◉",
	Cancelled: "◌",
};

const priorityIconMap: Record<Task["priority"], string> = {
	Low: "↓",
	Medium: "→",
	High: "↑",
};

const taskColumns: ColumnDef<Task, any>[] = [
	{
		accessorKey: "id",
		header: "Task",
		size: 110,
		enableSorting: false,
		enableHiding: false,
		cell: ({ getValue }) => (
			<span className="font-medium text-ds-foreground">
				{getValue() as string}
			</span>
		),
	},
	{
		accessorKey: "title",
		header: "Title",
		size: 500,
		meta: {
			enableHeaderMenu: true,
		} satisfies DataTableColumnMeta,
		cell: ({ row }) => (
			<div className="flex items-center gap-2 max-w-125">
				<Badge variant={labelVariantMap[row.original.label]} size="sm">
					{row.original.label}
				</Badge>
				<span className="truncate text-ds-foreground">
					{row.original.title}
				</span>
			</div>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		size: 130,
		meta: {
			enableHeaderMenu: true,
		} satisfies DataTableColumnMeta,
		filterFn: (row, id, value: string[]) => {
			return value.includes(row.getValue(id));
		},
		cell: ({ getValue }) => {
			const status = getValue() as Task["status"];
			return (
				<div className="flex items-center gap-1.5">
					<span className="text-ds-muted-foreground">
						{statusIconMap[status]}
					</span>
					<span className="text-sm">{status}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "priority",
		header: "Priority",
		size: 120,
		meta: {
			enableHeaderMenu: true,
		} satisfies DataTableColumnMeta,
		filterFn: (row, id, value: string[]) => {
			return value.includes(row.getValue(id));
		},
		cell: ({ getValue }) => {
			const priority = getValue() as Task["priority"];
			return (
				<div className="flex items-center gap-1.5">
					<span className="text-ds-muted-foreground">
						{priorityIconMap[priority]}
					</span>
					<span className="text-sm">{priority}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "estHours",
		header: "Est. Hours",
		size: 110,
		meta: {
			align: "right" as const,
			enableHeaderMenu: true,
		} satisfies DataTableColumnMeta,
		cell: ({ getValue }) => (
			<span className="text-sm tabular-nums">{getValue() as number}</span>
		),
	},
	{
		accessorKey: "createdAt",
		header: "Created At",
		size: 170,
		meta: {
			enableHeaderMenu: true,
		} satisfies DataTableColumnMeta,
		cell: ({ getValue }) => (
			<span className="text-sm text-ds-muted-foreground">
				{getValue() as string}
			</span>
		),
	},
	{
		id: "actions",
		size: 40,
		enableSorting: false,
		enableHiding: false,
		cell: () => (
			<button
				type="button"
				className="inline-flex size-8 items-center justify-center rounded-ds-md text-ds-muted-foreground hover:text-ds-foreground hover:bg-ds-muted/50 transition-colors"
				aria-label="Row actions"
			>
				<svg
					className="size-4"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="12" cy="12" r="1" />
					<circle cx="12" cy="5" r="1" />
					<circle cx="12" cy="19" r="1" />
				</svg>
			</button>
		),
	},
];

const taskFacetedFilters: DataTableFacetedFilter[] = [
	{
		columnId: "status",
		title: "Status",
		icon: (
			<svg
				className="size-3.5"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="12" cy="12" r="10" />
				<path d="M12 6v6l4 2" />
			</svg>
		),
		options: [
			{ label: "Todo", value: "Todo", icon: <span>◎</span> },
			{
				label: "In-Progress",
				value: "In-Progress",
				icon: <span>◑</span>,
			},
			{ label: "Done", value: "Done", icon: <span>◉</span> },
			{ label: "Cancelled", value: "Cancelled", icon: <span>◌</span> },
		],
	},
	{
		columnId: "priority",
		title: "Priority",
		icon: (
			<svg
				className="size-3.5"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="m21 16-4 4-4-4" />
				<path d="M17 20V4" />
				<path d="m3 8 4-4 4 4" />
				<path d="M7 4v16" />
			</svg>
		),
		options: [
			{ label: "Low", value: "Low", icon: <span>↓</span> },
			{ label: "Medium", value: "Medium", icon: <span>→</span> },
			{ label: "High", value: "High", icon: <span>↑</span> },
		],
	},
	{
		columnId: "estHours",
		title: "Est. Hours",
		icon: (
			<svg
				className="size-3.5"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="12" cy="12" r="10" />
				<polyline points="12 6 12 12 16 14" />
			</svg>
		),
	},
	{
		columnId: "createdAt",
		title: "Created At",
		icon: (
			<svg
				className="size-3.5"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
				<line x1="16" x2="16" y1="2" y2="6" />
				<line x1="8" x2="8" y1="2" y2="6" />
				<line x1="3" x2="21" y1="10" y2="10" />
			</svg>
		),
	},
];

export interface DataTableDemoProps {
	variant?: DataTableDemoVariant;
	emptyState?: ReactNode;
}

export function DataTableDemo({
	variant = "basic",
	emptyState,
}: DataTableDemoProps) {
	switch (variant) {
		case "basic":
			return (
				<DataTable
					data={sampleData.slice(0, 5)}
					columns={fullColumns}
					sorting
					hoverable
				/>
			);

		case "sorting":
			return (
				<DataTable
					data={sampleData.slice(0, 6)}
					columns={fullColumns}
					sorting
					hoverable
					density="compact"
				/>
			);

		case "filtering":
			return (
				<DataTable
					data={sampleData}
					columns={fullColumns}
					filtering
					showGlobalFilter
					globalFilterPlaceholder="Search users..."
					hoverable
					density="compact"
					pagination
					pageSize={5}
				/>
			);

		case "pagination":
			return (
				<DataTable
					data={sampleData}
					columns={fullColumns}
					pagination
					pageSize={5}
					hoverable
					striped
					density="compact"
				/>
			);

		case "row-selection":
			return (
				<DataTable
					data={sampleData.slice(0, 6)}
					columns={fullColumns}
					rowSelection="multi"
					hoverable
					density="compact"
				/>
			);

		case "column-visibility":
			return (
				<DataTable
					data={sampleData.slice(0, 5)}
					columns={fullColumns}
					columnVisibility
					sorting
					hoverable
					density="compact"
				/>
			);

		case "density-comfortable":
			return (
				<DataTable
					data={sampleData.slice(0, 3)}
					columns={simpleColumns}
					density="comfortable"
				/>
			);

		case "density-compact":
			return (
				<DataTable
					data={sampleData.slice(0, 3)}
					columns={simpleColumns}
					density="compact"
				/>
			);

		case "striped-bordered":
			return (
				<DataTable
					data={sampleData.slice(0, 5)}
					columns={simpleColumns}
					striped
					bordered
					density="compact"
				/>
			);

		case "loading":
			return (
				<DataTable
					data={[]}
					columns={simpleColumns}
					loading
					density="compact"
				/>
			);

		case "empty":
			return (
				<DataTable
					data={[]}
					columns={simpleColumns}
					density="compact"
					emptyState={
						emptyState ?? (
							<div className="flex flex-col items-center gap-1.5 py-4">
								<span className="text-sm font-medium text-ds-foreground">
									No users found
								</span>
								<span className="text-xs text-ds-muted-foreground">
									Try adjusting your search or filters.
								</span>
							</div>
						)
					}
				/>
			);

		case "column-pinning":
			return (
				<div className="max-w-125 overflow-hidden">
					<DataTable
						data={sampleData.slice(0, 5)}
						columns={pinnedColumns}
						columnPinning={{ left: ["id"], right: ["amount"] }}
						hoverable
						density="compact"
						responsive
					/>
				</div>
			);

		case "custom-cells":
			return (
				<DataTable
					data={sampleData.slice(0, 6)}
					columns={customCellColumns}
					sorting
					hoverable
					density="compact"
				/>
			);

		case "responsive":
			return (
				<div className="max-w-120 overflow-hidden">
					<DataTable
						data={sampleData.slice(0, 5)}
						columns={wideColumns}
						responsive
						hoverable
						density="compact"
					/>
				</div>
			);

		case "caption":
			return (
				<DataTable
					data={sampleData.slice(0, 4)}
					columns={fullColumns}
					caption="Q4 2024 invoice summary — all amounts in USD."
					hoverable
					density="compact"
				/>
			);

		case "toolbar-footer":
			return (
				<DataTable
					data={sampleData.slice(0, 6)}
					columns={fullColumns}
					sorting
					filtering
					showGlobalFilter
					globalFilterPlaceholder="Quick search..."
					columnVisibility
					pagination
					pageSize={5}
					rowSelection="multi"
					hoverable
					density="compact"
					toolbar={(table) => {
						const count =
							table.getFilteredSelectedRowModel().rows.length;
						return count > 0 ? (
							<span className="text-xs font-medium text-ds-primary">
								{count} row(s) selected
							</span>
						) : null;
					}}
					footer={(table) => (
						<div className="flex items-center justify-between px-2 text-xs text-ds-muted-foreground">
							<span>
								Showing {table.getRowModel().rows.length} of{" "}
								{table.getFilteredRowModel().rows.length} rows
							</span>
							<span>Last updated: just now</span>
						</div>
					)}
				/>
			);

		case "kitchen-sink":
			return (
				<DataTable
					data={sampleData}
					columns={fullColumns}
					sorting
					multiSort
					filtering
					showGlobalFilter
					globalFilterPlaceholder="Search everything..."
					pagination
					pageSize={5}
					rowSelection="multi"
					columnVisibility
					striped
					hoverable
					density="compact"
					caption="User management table"
				/>
			);

		case "tasks":
			return (
				<DataTable
					data={taskData}
					columns={taskColumns}
					sorting
					multiSort
					filtering
					showGlobalFilter
					globalFilterPlaceholder="Filter tasks..."
					pagination
					pageSize={10}
					pageSizeOptions={[10, 20, 30, 40, 50]}
					rowSelection="multi"
					columnVisibility
					hoverable
					density="compact"
					facetedFilters={taskFacetedFilters}
					toolbar={(table) => {
						const count =
							table.getFilteredSelectedRowModel().rows.length;
						return count > 0 ? (
							<span className="text-xs font-medium text-ds-primary">
								{count} of{" "}
								{table.getFilteredRowModel().rows.length} row(s)
								selected
							</span>
						) : null;
					}}
				/>
			);

		default:
			return null;
	}
}
