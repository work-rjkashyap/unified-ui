"use client";

// ============================================================================
// Chart Component Previews
// ============================================================================
// Self-contained "use client" preview components for the Chart documentation.
// These use real Recharts charts inside ChartContainer to show proper previews
// in the MDX documentation pages.
//
// Registered in src/mdx-components.tsx and used in content/components/chart.mdx.
// ============================================================================

import {
	ChartContainer,
	ChartTooltipContent,
	chartColors,
} from "@work-rjkashyap/unified-ui";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

// ---------------------------------------------------------------------------
// Sample Data
// ---------------------------------------------------------------------------

const revenueData = [
	{ month: "Jan", revenue: 4000 },
	{ month: "Feb", revenue: 3000 },
	{ month: "Mar", revenue: 5000 },
	{ month: "Apr", revenue: 4500 },
	{ month: "May", revenue: 6000 },
	{ month: "Jun", revenue: 5500 },
];

const weeklySalesData = [
	{ week: "W1", sales: 320 },
	{ week: "W2", sales: 450 },
	{ week: "W3", sales: 280 },
	{ week: "W4", sales: 590 },
	{ week: "W5", sales: 420 },
];

const multiSeriesData = [
	{ month: "Jan", revenue: 4000, expenses: 2800 },
	{ month: "Feb", revenue: 3200, expenses: 2600 },
	{ month: "Mar", revenue: 5100, expenses: 3000 },
	{ month: "Apr", revenue: 4700, expenses: 2900 },
	{ month: "May", revenue: 5800, expenses: 3200 },
	{ month: "Jun", revenue: 6200, expenses: 3400 },
];

const lineData = [
	{ day: "Mon", visitors: 120 },
	{ day: "Tue", visitors: 210 },
	{ day: "Wed", visitors: 180 },
	{ day: "Thu", visitors: 340 },
	{ day: "Fri", visitors: 290 },
	{ day: "Sat", visitors: 430 },
	{ day: "Sun", visitors: 380 },
];

const areaData = [
	{ month: "Jan", users: 400, sessions: 240 },
	{ month: "Feb", users: 600, sessions: 380 },
	{ month: "Mar", users: 550, sessions: 420 },
	{ month: "Apr", users: 780, sessions: 500 },
	{ month: "May", users: 920, sessions: 650 },
	{ month: "Jun", users: 1100, sessions: 780 },
];

const pieData = [
	{ name: "Desktop", value: 55 },
	{ name: "Mobile", value: 30 },
	{ name: "Tablet", value: 15 },
];

const pieColors = [chartColors[0], chartColors[1], chartColors[2]];

// ---------------------------------------------------------------------------
// Shared axis/grid styling
// ---------------------------------------------------------------------------

const axisProps = {
	stroke: "var(--muted-foreground)",
	fontSize: 12,
	tickLine: false,
	axisLine: false,
} as const;

const gridProps = {
	strokeDasharray: "3 3",
	stroke: "var(--border)",
	strokeOpacity: 0.6,
} as const;

// ---------------------------------------------------------------------------
// ChartBarPreview — Basic bar chart
// ---------------------------------------------------------------------------

export function ChartBarPreview() {
	return (
		<div className="w-full max-w-lg">
			<ChartContainer
				title="Monthly Revenue"
				description="Jan – Jun 2025"
				height={240}
			>
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						data={revenueData}
						margin={{ top: 8, right: 8, bottom: 0, left: -12 }}
					>
						<CartesianGrid {...gridProps} vertical={false} />
						<XAxis dataKey="month" {...axisProps} />
						<YAxis {...axisProps} />
						<Tooltip
							content={<ChartTooltipContent />}
							cursor={{ fill: "var(--muted)", opacity: 0.3 }}
						/>
						<Bar
							dataKey="revenue"
							fill={chartColors[0]}
							radius={[4, 4, 0, 0]}
							maxBarSize={40}
						/>
					</BarChart>
				</ResponsiveContainer>
			</ChartContainer>
		</div>
	);
}

// ---------------------------------------------------------------------------
// ChartWeeklySalesPreview — Simple bar chart variant
// ---------------------------------------------------------------------------

export function ChartWeeklySalesPreview() {
	return (
		<div className="w-full max-w-lg">
			<ChartContainer
				title="Weekly Sales"
				description="Last 5 weeks"
				height={220}
			>
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						data={weeklySalesData}
						margin={{ top: 8, right: 8, bottom: 0, left: -12 }}
					>
						<CartesianGrid {...gridProps} vertical={false} />
						<XAxis dataKey="week" {...axisProps} />
						<YAxis {...axisProps} />
						<Tooltip
							content={<ChartTooltipContent />}
							cursor={{ fill: "var(--muted)", opacity: 0.3 }}
						/>
						<Bar
							dataKey="sales"
							fill={chartColors[0]}
							radius={[4, 4, 0, 0]}
							maxBarSize={36}
						/>
					</BarChart>
				</ResponsiveContainer>
			</ChartContainer>
		</div>
	);
}

// ---------------------------------------------------------------------------
// ChartMultiSeriesPreview — Revenue vs Expenses with footer legend
// ---------------------------------------------------------------------------

export function ChartMultiSeriesPreview() {
	return (
		<div className="w-full max-w-lg">
			<ChartContainer
				title="Revenue vs Expenses"
				description="Q1 – Q2 2025"
				height={240}
				footer={
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-1.5">
							<div className="size-2.5 rounded-full bg-primary" />
							<span>Revenue</span>
						</div>
						<div className="flex items-center gap-1.5">
							<div
								className="size-2.5 rounded-full"
								style={{ backgroundColor: chartColors[4] }}
							/>
							<span>Expenses</span>
						</div>
					</div>
				}
			>
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						data={multiSeriesData}
						margin={{ top: 8, right: 8, bottom: 0, left: -12 }}
					>
						<CartesianGrid {...gridProps} vertical={false} />
						<XAxis dataKey="month" {...axisProps} />
						<YAxis {...axisProps} />
						<Tooltip
							content={<ChartTooltipContent />}
							cursor={{ fill: "var(--muted)", opacity: 0.3 }}
						/>
						<Bar
							dataKey="revenue"
							fill={chartColors[0]}
							radius={[4, 4, 0, 0]}
							maxBarSize={28}
						/>
						<Bar
							dataKey="expenses"
							fill={chartColors[4]}
							radius={[4, 4, 0, 0]}
							maxBarSize={28}
						/>
					</BarChart>
				</ResponsiveContainer>
			</ChartContainer>
		</div>
	);
}

// ---------------------------------------------------------------------------
// ChartLinePreview — Line chart
// ---------------------------------------------------------------------------

export function ChartLinePreview() {
	return (
		<div className="w-full max-w-lg">
			<ChartContainer
				title="Daily Visitors"
				description="This week"
				height={240}
			>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={lineData}
						margin={{ top: 8, right: 8, bottom: 0, left: -12 }}
					>
						<CartesianGrid {...gridProps} />
						<XAxis dataKey="day" {...axisProps} />
						<YAxis {...axisProps} />
						<Tooltip content={<ChartTooltipContent />} />
						<Line
							type="monotone"
							dataKey="visitors"
							stroke={chartColors[1]}
							strokeWidth={2}
							dot={{ r: 4, fill: chartColors[1] }}
							activeDot={{ r: 6, fill: chartColors[1] }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</ChartContainer>
		</div>
	);
}

// ---------------------------------------------------------------------------
// ChartAreaPreview — Stacked area chart
// ---------------------------------------------------------------------------

export function ChartAreaPreview() {
	return (
		<div className="w-full max-w-lg">
			<ChartContainer
				title="Users & Sessions"
				description="Growth over 6 months"
				height={240}
				footer={
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-1.5">
							<div
								className="size-2.5 rounded-full"
								style={{ backgroundColor: chartColors[1] }}
							/>
							<span>Users</span>
						</div>
						<div className="flex items-center gap-1.5">
							<div
								className="size-2.5 rounded-full"
								style={{ backgroundColor: chartColors[2] }}
							/>
							<span>Sessions</span>
						</div>
					</div>
				}
			>
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart
						data={areaData}
						margin={{ top: 8, right: 8, bottom: 0, left: -12 }}
					>
						<defs>
							<linearGradient
								id="colorUsers"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor={chartColors[1]}
									stopOpacity={0.3}
								/>
								<stop
									offset="95%"
									stopColor={chartColors[1]}
									stopOpacity={0}
								/>
							</linearGradient>
							<linearGradient
								id="colorSessions"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor={chartColors[2]}
									stopOpacity={0.3}
								/>
								<stop
									offset="95%"
									stopColor={chartColors[2]}
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid {...gridProps} />
						<XAxis dataKey="month" {...axisProps} />
						<YAxis {...axisProps} />
						<Tooltip content={<ChartTooltipContent />} />
						<Area
							type="monotone"
							dataKey="users"
							stroke={chartColors[1]}
							strokeWidth={2}
							fill="url(#colorUsers)"
						/>
						<Area
							type="monotone"
							dataKey="sessions"
							stroke={chartColors[2]}
							strokeWidth={2}
							fill="url(#colorSessions)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</ChartContainer>
		</div>
	);
}

// ---------------------------------------------------------------------------
// ChartPiePreview — Donut / Pie chart
// ---------------------------------------------------------------------------

export function ChartPiePreview() {
	return (
		<div className="w-full max-w-lg">
			<ChartContainer
				title="Traffic Sources"
				description="Device breakdown"
				height={240}
				footer={
					<div className="flex items-center justify-center gap-4">
						{pieData.map((entry, i) => (
							<div
								key={entry.name}
								className="flex items-center gap-1.5"
							>
								<div
									className="size-2.5 rounded-full"
									style={{
										backgroundColor: pieColors[i],
									}}
								/>
								<span>
									{entry.name} ({entry.value}%)
								</span>
							</div>
						))}
					</div>
				}
			>
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Tooltip content={<ChartTooltipContent />} />
						<Pie
							data={pieData}
							cx="50%"
							cy="50%"
							innerRadius={50}
							outerRadius={80}
							paddingAngle={3}
							dataKey="value"
							nameKey="name"
							strokeWidth={0}
						>
							{pieData.map((entry, index) => (
								<Cell
									key={entry.name}
									fill={pieColors[index]}
								/>
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</ChartContainer>
		</div>
	);
}
