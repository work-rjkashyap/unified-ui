"use client";

import { DataTable, Badge, type ColumnDef } from "@work-rjkashyap/unified-ui";
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

// ---------------------------------------------------------------------------
// Demo variants
// ---------------------------------------------------------------------------

export type DataTableDemoVariant =
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
	| "kitchen-sink";

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

		default:
			return null;
	}
}
