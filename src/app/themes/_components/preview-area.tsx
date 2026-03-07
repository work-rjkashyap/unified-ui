"use client";

import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
	Card,
	CardBody,
	CardHeader,
	TooltipProvider,
} from "@work-rjkashyap/unified-ui";
import { LayoutDashboard, Table2, Layers, Tag } from "lucide-react";
import { DashboardPreview } from "./dashboard-preview";
import { TablePreview } from "./table-preview";
import { OverlaysPreview } from "./overlays-preview";
import { AlertsPreview } from "./alerts-preview";

// =============================================================================
// Shared BentoCard wrapper — used by all tab panels
// =============================================================================

export function BentoCard({
	title,
	description,
	icon: Icon,
	children,
	className = "",
}: {
	title: string;
	description?: string;
	icon?: React.ComponentType<{ className?: string }>;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<Card className={`overflow-hidden h-full ${className}`}>
			<CardHeader className="pb-2">
				<div className="flex items-center gap-2">
					{Icon && (
						<div className="flex items-center justify-center size-7 rounded-md bg-primary/10 text-primary shrink-0">
							<Icon className="size-3.5" />
						</div>
					)}
					<div className="min-w-0">
						<h3 className="text-sm font-semibold leading-tight truncate">
							{title}
						</h3>
						{description && (
							<p className="text-xs text-muted-foreground mt-0.5 leading-snug">
								{description}
							</p>
						)}
					</div>
				</div>
			</CardHeader>
			<CardBody className="pt-1">{children}</CardBody>
		</Card>
	);
}

// =============================================================================
// PreviewArea — tabbed container with bento-card grids inside each tab
// =============================================================================

export function PreviewArea() {
	return (
		<TooltipProvider>
			<Tabs defaultValue="dashboard" className="w-full">
				<TabsList className="mb-4">
					<TabsTrigger value="dashboard">
						<LayoutDashboard className="size-3.5" />
						<span className="hidden sm:inline">Dashboard</span>
					</TabsTrigger>
					<TabsTrigger value="table">
						<Table2 className="size-3.5" />
						<span className="hidden sm:inline">Table</span>
					</TabsTrigger>
					<TabsTrigger value="overlays">
						<Layers className="size-3.5" />
						<span className="hidden sm:inline">Overlays</span>
					</TabsTrigger>
					<TabsTrigger value="labels">
						<Tag className="size-3.5" />
						<span className="hidden sm:inline">Labels</span>
					</TabsTrigger>
				</TabsList>

				<TabsContent value="dashboard">
					<DashboardPreview />
				</TabsContent>

				<TabsContent value="table">
					<TablePreview />
				</TabsContent>

				<TabsContent value="overlays">
					<OverlaysPreview />
				</TabsContent>

				<TabsContent value="labels">
					<AlertsPreview />
				</TabsContent>
			</Tabs>
		</TooltipProvider>
	);
}
