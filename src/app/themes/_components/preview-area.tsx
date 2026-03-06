"use client";

import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from "@work-rjkashyap/unified-ui";
import {
	LayoutDashboard,
	Table2,
	Layers,
	Tag,
} from "lucide-react";
import { DashboardPreview } from "./dashboard-preview";
import { TablePreview } from "./table-preview";
import { OverlaysPreview } from "./overlays-preview";
import { AlertsPreview } from "./alerts-preview";

// ---------------------------------------------------------------------------
// PreviewArea
// ---------------------------------------------------------------------------
// A tabbed container that renders all the component showcase panels.
// Each tab displays a different category of components, all of which
// respond to theme customizer changes because the CSS variables are
// injected at :root by the ThemeCustomizerProvider.
// ---------------------------------------------------------------------------

export function PreviewArea() {
	return (
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
	);
}
