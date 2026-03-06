"use client";

import {
	Card,
	CardBody,
	CardHeader,
	Badge,
	Button,
	Progress,
	Switch,
	Slider,
	RadioGroup,
	RadioCard,
	Avatar,
	AvatarGroup,
	Input,
	Checkbox,
	Tooltip,
	TooltipProvider,
} from "@work-rjkashyap/unified-ui";
import {
	ArrowUpRight,
	ArrowDownRight,
	DollarSign,
	Users,
	Activity,
	CreditCard,
	Search,
	MoreHorizontal,
	TrendingUp,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Mini stat card used inside the dashboard
// ---------------------------------------------------------------------------

function StatCard({
	label,
	value,
	change,
	changeLabel,
	trend,
	icon: Icon,
}: {
	label: string;
	value: string;
	change: string;
	changeLabel: string;
	trend: "up" | "down";
	icon: React.ComponentType<{ className?: string }>;
}) {
	return (
		<Card>
			<CardBody className="p-4">
				<div className="flex items-center justify-between">
					<p className="text-xs font-medium text-muted-foreground">
						{label}
					</p>
					<div className="size-8 rounded-md bg-muted flex items-center justify-center">
						<Icon className="size-4 text-muted-foreground" />
					</div>
				</div>
				<div className="mt-2">
					<p className="text-2xl font-bold tracking-tight">{value}</p>
					<div className="flex items-center gap-1 mt-1">
						{trend === "up" ? (
							<ArrowUpRight className="size-3.5 text-success" />
						) : (
							<ArrowDownRight className="size-3.5 text-danger" />
						)}
						<span
							className={`text-xs font-medium ${trend === "up" ? "text-success" : "text-danger"}`}
						>
							{change}
						</span>
						<span className="text-xs text-muted-foreground">
							{changeLabel}
						</span>
					</div>
				</div>
			</CardBody>
		</Card>
	);
}

// ---------------------------------------------------------------------------
// Recent activity row
// ---------------------------------------------------------------------------

function ActivityRow({
	name,
	email,
	amount,
	status,
}: {
	name: string;
	email: string;
	amount: string;
	status: "success" | "warning" | "danger" | "info";
}) {
	return (
		<div className="flex items-center gap-3 py-2">
			<Avatar name={name} size="sm" />
			<div className="flex-1 min-w-0">
				<p className="text-sm font-medium leading-none truncate">
					{name}
				</p>
				<p className="text-xs text-muted-foreground mt-0.5 truncate">
					{email}
				</p>
			</div>
			<div className="text-right shrink-0">
				<p className="text-sm font-semibold">{amount}</p>
				<Badge variant={status} size="sm" className="mt-0.5">
					{status === "success"
						? "Paid"
						: status === "warning"
							? "Pending"
							: status === "danger"
								? "Failed"
								: "Processing"}
				</Badge>
			</div>
		</div>
	);
}

// ---------------------------------------------------------------------------
// DashboardPreview
// ---------------------------------------------------------------------------

export function DashboardPreview() {
	return (
		<TooltipProvider>
			<div className="space-y-4">
				{/* Stats Row */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
					<StatCard
						label="Revenue"
						value="$45,231"
						change="+20.1%"
						changeLabel="from last month"
						trend="up"
						icon={DollarSign}
					/>
					<StatCard
						label="Subscriptions"
						value="+2,350"
						change="+180.1%"
						changeLabel="from last month"
						trend="up"
						icon={Users}
					/>
					<StatCard
						label="Sales"
						value="+12,234"
						change="+19%"
						changeLabel="from last month"
						trend="up"
						icon={CreditCard}
					/>
					<StatCard
						label="Active Now"
						value="+573"
						change="-2.4%"
						changeLabel="from last hour"
						trend="down"
						icon={Activity}
					/>
				</div>

				{/* Main content: Chart area + Sidebar */}
				<div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
					{/* Chart Card (left, wider) */}
					<Card className="lg:col-span-4">
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-sm font-semibold">
										Revenue Overview
									</h3>
									<p className="text-xs text-muted-foreground mt-0.5">
										Monthly revenue for the current year
									</p>
								</div>
								<Tooltip content="View full report">
									<Button
										variant="ghost"
										size="sm"
										iconOnly
										aria-label="More options"
									>
										<MoreHorizontal className="size-4" />
									</Button>
								</Tooltip>
							</div>
						</CardHeader>
						<CardBody>
							{/* Faux bar chart using div bars */}
							<div className="flex items-end gap-1.5 h-[140px] mt-2">
								{[
									40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95,
									50,
								].map((h, i) => (
									<Tooltip
										key={i}
										content={`$${(h * 450 + 1200).toLocaleString()}`}
									>
										<div
											className="flex-1 rounded-t-sm bg-primary/80 hover:bg-primary transition-colors duration-fast cursor-default"
											style={{ height: `${h}%` }}
										/>
									</Tooltip>
								))}
							</div>
							<div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
								<span>Jan</span>
								<span>Feb</span>
								<span>Mar</span>
								<span>Apr</span>
								<span>May</span>
								<span>Jun</span>
								<span>Jul</span>
								<span>Aug</span>
								<span>Sep</span>
								<span>Oct</span>
								<span>Nov</span>
								<span>Dec</span>
							</div>
							<div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
								<TrendingUp className="size-3.5 text-success" />
								<span>
									Trending up by{" "}
									<span className="font-medium text-foreground">
										5.2%
									</span>{" "}
									this month
								</span>
							</div>
						</CardBody>
					</Card>

					{/* Recent Sales (right, narrower) */}
					<Card className="lg:col-span-3">
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-sm font-semibold">
										Recent Sales
									</h3>
									<p className="text-xs text-muted-foreground mt-0.5">
										You made 265 sales this month.
									</p>
								</div>
								<AvatarGroup max={3} size="xs">
									<Avatar name="Olivia Martin" />
									<Avatar name="Jackson Lee" />
									<Avatar name="Isabella Nguyen" />
									<Avatar name="William Kim" />
								</AvatarGroup>
							</div>
						</CardHeader>
						<CardBody>
							<div className="divide-y divide-border">
								<ActivityRow
									name="Olivia Martin"
									email="olivia@example.com"
									amount="+$1,999.00"
									status="success"
								/>
								<ActivityRow
									name="Jackson Lee"
									email="jackson@example.com"
									amount="+$39.00"
									status="success"
								/>
								<ActivityRow
									name="Isabella Nguyen"
									email="isabella@example.com"
									amount="+$299.00"
									status="warning"
								/>
								<ActivityRow
									name="William Kim"
									email="will@example.com"
									amount="+$99.00"
									status="danger"
								/>
								<ActivityRow
									name="Sofia Davis"
									email="sofia@example.com"
									amount="+$450.00"
									status="info"
								/>
							</div>
						</CardBody>
					</Card>
				</div>

				{/* Controls Row */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Settings Card */}
					<Card>
						<CardHeader>
							<h3 className="text-sm font-semibold">Settings</h3>
						</CardHeader>
						<CardBody className="space-y-4">
							<Switch
								label="Auto updates"
								description="Install updates automatically to stay current."
								defaultChecked
							/>
							<Switch
								label="Dark mode"
								description="Use a darker theme across the app."
							/>
							<Switch
								label="Usage analytics"
								description="Share anonymous usage data to help improve the product."
								defaultChecked
							/>
							<Switch
								label="Two factor authentication"
								description="Require an extra verification step when signing in."
							/>
						</CardBody>
					</Card>

					{/* Adjustments Card */}
					<Card>
						<CardHeader>
							<h3 className="text-sm font-semibold">
								Adjustments
							</h3>
						</CardHeader>
						<CardBody className="space-y-5">
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<label className="text-xs font-medium text-muted-foreground">
										X
									</label>
									<span className="text-xs tabular-nums text-muted-foreground">
										50
									</span>
								</div>
								<Slider defaultValue={[50]} max={100} />
								<p className="text-[11px] text-muted-foreground">
									Horizontal position
								</p>
							</div>
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<label className="text-xs font-medium text-muted-foreground">
										Y
									</label>
									<span className="text-xs tabular-nums text-muted-foreground">
										50
									</span>
								</div>
								<Slider defaultValue={[50]} max={100} />
								<p className="text-[11px] text-muted-foreground">
									Vertical position
								</p>
							</div>
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<label className="text-xs font-medium text-muted-foreground">
										Zoom
									</label>
									<span className="text-xs tabular-nums text-muted-foreground">
										50
									</span>
								</div>
								<Slider defaultValue={[50]} max={100} />
								<p className="text-[11px] text-muted-foreground">
									Scale
								</p>
							</div>
						</CardBody>
					</Card>
				</div>

				{/* Billing Radios */}
				<Card>
					<CardHeader>
						<h3 className="text-sm font-semibold">
							Billing Period
						</h3>
					</CardHeader>
					<CardBody>
						<RadioGroup
							defaultValue="monthly"
							orientation="vertical"
						>
							<RadioCard
								value="monthly"
								label="Bill monthly"
								description="Pay every month and cancel anytime."
							/>
							<RadioCard
								value="quarterly"
								label="Bill quarterly"
								description="Pay every 3 months with fewer invoices to manage."
							/>
							<RadioCard
								value="yearly"
								label="Bill yearly"
								description="Save 20% with an annual plan billed once per year."
							/>
							<RadioCard
								value="biennial"
								label="Bill every 2 years"
								description="Lock in the best rate with a single payment every 24 months."
							/>
						</RadioGroup>
					</CardBody>
				</Card>

				{/* Notifications */}
				<Card>
					<CardHeader>
						<h3 className="text-sm font-semibold">
							Notification Preferences
						</h3>
					</CardHeader>
					<CardBody className="space-y-3">
						<Checkbox
							label="Security alerts"
							description="Get notified about password changes, new sign-ins, and suspicious activity."
							checked
						/>
						<Checkbox
							label="Product updates"
							description="Release notes and major improvements, sent at most once a week."
							checked
						/>
						<Checkbox
							label="Weekly summary"
							description="A digest of your workspace activity delivered every Monday."
						/>
						<Checkbox
							label="Marketing emails"
							description="Tips, tutorials, and promotions tailored to your usage."
						/>
					</CardBody>
				</Card>
			</div>
		</TooltipProvider>
	);
}
