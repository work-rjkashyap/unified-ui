"use client";

import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
	Badge,
	Avatar,
	Button,
	Checkbox,
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuLabel,
	Input,
} from "@work-rjkashyap/unified-ui";
import {
	MoreHorizontal,
	ArrowUpDown,
	Search,
	SlidersHorizontal,
	Download,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

interface Payment {
	id: string;
	name: string;
	email: string;
	amount: number;
	status: "success" | "warning" | "danger" | "info" | "default";
	statusLabel: string;
	method: string;
	date: string;
}

const PAYMENTS: Payment[] = [
	{
		id: "INV-001",
		name: "Olivia Martin",
		email: "olivia.martin@example.com",
		amount: 1999.0,
		status: "success",
		statusLabel: "Paid",
		method: "Credit Card",
		date: "2024-12-01",
	},
	{
		id: "INV-002",
		name: "Jackson Lee",
		email: "jackson.lee@example.com",
		amount: 39.0,
		status: "warning",
		statusLabel: "Pending",
		method: "PayPal",
		date: "2024-12-03",
	},
	{
		id: "INV-003",
		name: "Isabella Nguyen",
		email: "isabella.nguyen@example.com",
		amount: 299.0,
		status: "success",
		statusLabel: "Paid",
		method: "Bank Transfer",
		date: "2024-12-05",
	},
	{
		id: "INV-004",
		name: "William Kim",
		email: "will.kim@example.com",
		amount: 99.0,
		status: "danger",
		statusLabel: "Failed",
		method: "Credit Card",
		date: "2024-12-07",
	},
	{
		id: "INV-005",
		name: "Sofia Davis",
		email: "sofia.davis@example.com",
		amount: 450.0,
		status: "info",
		statusLabel: "Processing",
		method: "Credit Card",
		date: "2024-12-09",
	},
	{
		id: "INV-006",
		name: "Liam Johnson",
		email: "liam.johnson@example.com",
		amount: 2150.0,
		status: "success",
		statusLabel: "Paid",
		method: "Bank Transfer",
		date: "2024-12-10",
	},
	{
		id: "INV-007",
		name: "Emma Wilson",
		email: "emma.wilson@example.com",
		amount: 175.0,
		status: "warning",
		statusLabel: "Pending",
		method: "PayPal",
		date: "2024-12-12",
	},
	{
		id: "INV-008",
		name: "Noah Brown",
		email: "noah.brown@example.com",
		amount: 850.0,
		status: "success",
		statusLabel: "Paid",
		method: "Credit Card",
		date: "2024-12-14",
	},
];

// ---------------------------------------------------------------------------
// Format helpers
// ---------------------------------------------------------------------------

function formatCurrency(amount: number): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(amount);
}

function formatDate(date: string): string {
	return new Date(date).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

// ---------------------------------------------------------------------------
// Row Action Menu
// ---------------------------------------------------------------------------

function RowActions({ payment }: { payment: Payment }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					iconOnly
					aria-label={`Actions for ${payment.id}`}
				>
					<MoreHorizontal className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuItem
					onSelect={() => navigator.clipboard.writeText(payment.id)}
				>
					Copy invoice ID
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>View details</DropdownMenuItem>
				<DropdownMenuItem>View customer</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="danger">
					Delete invoice
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

// ---------------------------------------------------------------------------
// TablePreview
// ---------------------------------------------------------------------------

export function TablePreview() {
	return (
		<div className="space-y-4">
			{/* Toolbar */}
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
				<div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
					<div className="relative flex-1 sm:max-w-[280px]">
						<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
						<Input
							placeholder="Filter invoices..."
							className="pl-8"
							size="sm"
						/>
					</div>
					<Button
						variant="secondary"
						size="sm"
						iconLeft={<SlidersHorizontal className="size-3.5" />}
					>
						<span className="hidden sm:inline">Filter</span>
					</Button>
				</div>
				<div className="flex items-center gap-2">
					<Button
						variant="secondary"
						size="sm"
						iconLeft={<Download className="size-3.5" />}
					>
						<span className="hidden sm:inline">Export</span>
					</Button>
					<Badge variant="default" size="sm">
						{PAYMENTS.length} results
					</Badge>
				</div>
			</div>

			{/* Table */}
			<div className="rounded-md border border-border overflow-hidden">
				<Table hoverable density="comfortable">
					<TableHeader>
						<TableRow>
							<TableHead className="w-10">
								<Checkbox size="sm" aria-label="Select all" />
							</TableHead>
							<TableHead className="min-w-[100px]">
								<div className="flex items-center gap-1 cursor-pointer select-none">
									Invoice
									<ArrowUpDown className="size-3.5 text-muted-foreground" />
								</div>
							</TableHead>
							<TableHead className="min-w-[200px]">
								Customer
							</TableHead>
							<TableHead>
								<div className="flex items-center gap-1 cursor-pointer select-none">
									Status
									<ArrowUpDown className="size-3.5 text-muted-foreground" />
								</div>
							</TableHead>
							<TableHead>Method</TableHead>
							<TableHead>
								<div className="flex items-center gap-1 cursor-pointer select-none">
									Date
									<ArrowUpDown className="size-3.5 text-muted-foreground" />
								</div>
							</TableHead>
							<TableHead align="right">
								<div className="flex items-center justify-end gap-1 cursor-pointer select-none">
									Amount
									<ArrowUpDown className="size-3.5 text-muted-foreground" />
								</div>
							</TableHead>
							<TableHead className="w-10" />
						</TableRow>
					</TableHeader>
					<TableBody>
						{PAYMENTS.map((payment) => (
							<TableRow key={payment.id}>
								<TableCell>
									<Checkbox
										size="sm"
										aria-label={`Select ${payment.id}`}
									/>
								</TableCell>
								<TableCell>
									<span className="font-mono text-xs">
										{payment.id}
									</span>
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2.5">
										<Avatar name={payment.name} size="sm" />
										<div className="min-w-0">
											<p className="text-sm font-medium leading-none truncate">
												{payment.name}
											</p>
											<p className="text-xs text-muted-foreground mt-0.5 truncate">
												{payment.email}
											</p>
										</div>
									</div>
								</TableCell>
								<TableCell>
									<Badge
										variant={payment.status}
										size="sm"
										dot
									>
										{payment.statusLabel}
									</Badge>
								</TableCell>
								<TableCell>
									<span className="text-sm text-muted-foreground">
										{payment.method}
									</span>
								</TableCell>
								<TableCell>
									<span className="text-sm text-muted-foreground tabular-nums">
										{formatDate(payment.date)}
									</span>
								</TableCell>
								<TableCell align="right">
									<span className="text-sm font-medium tabular-nums">
										{formatCurrency(payment.amount)}
									</span>
								</TableCell>
								<TableCell>
									<RowActions payment={payment} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{/* Footer */}
			<div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
				<p>0 of {PAYMENTS.length} row(s) selected.</p>
				<div className="flex items-center gap-2">
					<Button variant="secondary" size="sm" disabled>
						Previous
					</Button>
					<div className="flex items-center gap-1">
						<Button
							variant="primary"
							size="sm"
							className="min-w-[2rem]"
						>
							1
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className="min-w-[2rem]"
						>
							2
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className="min-w-[2rem]"
						>
							3
						</Button>
					</div>
					<Button variant="secondary" size="sm">
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
