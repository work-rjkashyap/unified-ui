"use client";

import {
	Alert,
	Badge,
	Button,
	Card,
	CardBody,
	CardHeader,
	Progress,
	Tooltip,
	TooltipProvider,
} from "@work-rjkashyap/unified-ui";
import {
	AlertCircle,
	CheckCircle2,
	Info,
	AlertTriangle,
	MessageSquare,
	Shield,
	Zap,
	Star,
	Clock,
	Tag,
	Hash,
	Globe,
	Lock,
	Unlock,
	Eye,
	Heart,
	Flame,
	Sparkles,
	CircleDot,
	ArrowRight,
} from "lucide-react";

// ---------------------------------------------------------------------------
// AlertsPreview
// ---------------------------------------------------------------------------

export function AlertsPreview() {
	return (
		<TooltipProvider>
			<div className="space-y-4">
				{/* Alerts — All Variants */}
				<Card>
					<CardHeader>
						<h3 className="text-sm font-semibold">Alerts</h3>
						<p className="text-xs text-muted-foreground">
							Contextual feedback messages for user actions and
							system status.
						</p>
					</CardHeader>
					<CardBody className="space-y-3">
						<Alert variant="info" title="Info">
							This is an informational note. It provides helpful
							context or guidance.
						</Alert>
						<Alert variant="warning" title="Warning">
							This is a warning note. Please review before
							proceeding.
						</Alert>
						<Alert variant="danger" title="Danger">
							This is a danger note. Immediate action may be
							required.
						</Alert>
						<Alert variant="success" title="Success">
							This is a success note. Your action completed
							successfully.
						</Alert>
						<Alert variant="default" title="Default">
							This is a default note with neutral styling for
							general messages.
						</Alert>
					</CardBody>
				</Card>

				{/* Dismissible Alerts */}
				<Card>
					<CardHeader>
						<h3 className="text-sm font-semibold">
							Dismissible Alerts
						</h3>
						<p className="text-xs text-muted-foreground">
							Alerts that can be dismissed by the user.
						</p>
					</CardHeader>
					<CardBody className="space-y-3">
						<Alert
							variant="info"
							title="New feature available"
							dismissible
						>
							We've added dark mode support. Try it out in your
							settings.
						</Alert>
						<Alert
							variant="success"
							title="Deployment complete"
							dismissible
						>
							Your latest changes have been deployed to production
							successfully.
						</Alert>
					</CardBody>
				</Card>

				{/* Badges — All Variants */}
				<Card>
					<CardHeader>
						<h3 className="text-sm font-semibold">Badges</h3>
						<p className="text-xs text-muted-foreground">
							Compact labels for status, categories, and metadata.
						</p>
					</CardHeader>
					<CardBody className="space-y-4">
						{/* Variant showcase */}
						<div>
							<p className="text-xs font-medium text-muted-foreground mb-2">
								Variants
							</p>
							<div className="flex flex-wrap gap-2">
								<Badge variant="default">Default</Badge>
								<Badge variant="primary">Primary</Badge>
								<Badge variant="secondary">Secondary</Badge>
								<Badge variant="success">Success</Badge>
								<Badge variant="warning">Warning</Badge>
								<Badge variant="danger">Danger</Badge>
								<Badge variant="info">Info</Badge>
								<Badge variant="outline">Outline</Badge>
							</div>
						</div>

						{/* Sizes */}
						<div>
							<p className="text-xs font-medium text-muted-foreground mb-2">
								Sizes
							</p>
							<div className="flex flex-wrap items-center gap-2">
								<Badge variant="primary" size="sm">
									Small
								</Badge>
								<Badge variant="primary" size="md">
									Medium
								</Badge>
								<Badge variant="primary" size="lg">
									Large
								</Badge>
							</div>
						</div>

						{/* With dot indicator */}
						<div>
							<p className="text-xs font-medium text-muted-foreground mb-2">
								Dot indicator
							</p>
							<div className="flex flex-wrap gap-2">
								<Badge variant="success" dot>
									Online
								</Badge>
								<Badge variant="warning" dot>
									Away
								</Badge>
								<Badge variant="danger" dot>
									Offline
								</Badge>
								<Badge variant="info" dot>
									Busy
								</Badge>
								<Badge variant="default" dot>
									Idle
								</Badge>
							</div>
						</div>

						{/* Removable */}
						<div>
							<p className="text-xs font-medium text-muted-foreground mb-2">
								Removable
							</p>
							<div className="flex flex-wrap gap-2">
								<Badge
									variant="primary"
									removable
									onRemove={() => {}}
								>
									React
								</Badge>
								<Badge
									variant="info"
									removable
									onRemove={() => {}}
								>
									TypeScript
								</Badge>
								<Badge
									variant="success"
									removable
									onRemove={() => {}}
								>
									Tailwind CSS
								</Badge>
								<Badge
									variant="warning"
									removable
									onRemove={() => {}}
								>
									Next.js
								</Badge>
								<Badge
									variant="danger"
									removable
									onRemove={() => {}}
								>
									Breaking change
								</Badge>
							</div>
						</div>
					</CardBody>
				</Card>

				{/* Buttons — All Variants */}
				<Card>
					<CardHeader>
						<h3 className="text-sm font-semibold">Buttons</h3>
						<p className="text-xs text-muted-foreground">
							All button variants and sizes for interactive
							actions.
						</p>
					</CardHeader>
					<CardBody className="space-y-4">
						{/* Variants */}
						<div>
							<p className="text-xs font-medium text-muted-foreground mb-2">
								Variants
							</p>
							<div className="flex flex-wrap gap-2">
								<Button variant="primary">Primary</Button>
								<Button variant="secondary">Secondary</Button>
								<Button variant="ghost">Ghost</Button>
								<Button variant="danger">Danger</Button>
							</div>
						</div>

						{/* Sizes */}
						<div>
							<p className="text-xs font-medium text-muted-foreground mb-2">
								Sizes
							</p>
							<div className="flex flex-wrap items-center gap-2">
								<Button variant="primary" size="sm">
									Small
								</Button>
								<Button variant="primary" size="md">
									Medium
								</Button>
								<Button variant="primary" size="lg">
									Large
								</Button>
							</div>
						</div>

						{/* With icons */}
						<div>
							<p className="text-xs font-medium text-muted-foreground mb-2">
								With icons
							</p>
							<div className="flex flex-wrap gap-2">
								<Button
									variant="primary"
									size="sm"
									iconLeft={<Zap className="size-3.5" />}
								>
									Quick action
								</Button>
								<Button
									variant="secondary"
									size="sm"
									iconLeft={<Shield className="size-3.5" />}
								>
									Security
								</Button>
								<Button
									variant="ghost"
									size="sm"
									iconLeft={<Star className="size-3.5" />}
								>
									Favorite
								</Button>
								<Button
									variant="danger"
									size="sm"
									iconLeft={
										<AlertCircle className="size-3.5" />
									}
								>
									Report
								</Button>
							</div>
						</div>

						{/* Loading */}
						<div>
							<p className="text-xs font-medium text-muted-foreground mb-2">
								States
							</p>
							<div className="flex flex-wrap items-center gap-2">
								<Button
									variant="primary"
									size="sm"
									loading
									loadingText="Saving..."
								>
									Save
								</Button>
								<Button variant="secondary" size="sm" disabled>
									Disabled
								</Button>
								<Button
									variant="primary"
									size="sm"
									iconOnly
									aria-label="Notifications"
								>
									<Heart className="size-3.5" />
								</Button>
								<Button
									variant="secondary"
									size="sm"
									iconOnly
									aria-label="Settings"
								>
									<Sparkles className="size-3.5" />
								</Button>
							</div>
						</div>
					</CardBody>
				</Card>

				{/* Progress Bars */}
				<Card>
					<CardHeader>
						<h3 className="text-sm font-semibold">Progress</h3>
						<p className="text-xs text-muted-foreground">
							Visual indicators for completion, loading, and
							status tracking.
						</p>
					</CardHeader>
					<CardBody className="space-y-4">
						<div className="space-y-3">
							<div className="space-y-1.5">
								<div className="flex items-center justify-between">
									<span className="text-xs font-medium">
										Default
									</span>
									<span className="text-xs text-muted-foreground tabular-nums">
										60%
									</span>
								</div>
								<Progress value={60} />
							</div>
							<div className="space-y-1.5">
								<div className="flex items-center justify-between">
									<span className="text-xs font-medium">
										Primary
									</span>
									<span className="text-xs text-muted-foreground tabular-nums">
										75%
									</span>
								</div>
								<Progress value={75} variant="primary" />
							</div>
							<div className="space-y-1.5">
								<div className="flex items-center justify-between">
									<span className="text-xs font-medium">
										Success
									</span>
									<span className="text-xs text-muted-foreground tabular-nums">
										100%
									</span>
								</div>
								<Progress value={100} variant="success" />
							</div>
							<div className="space-y-1.5">
								<div className="flex items-center justify-between">
									<span className="text-xs font-medium">
										Danger
									</span>
									<span className="text-xs text-muted-foreground tabular-nums">
										25%
									</span>
								</div>
								<Progress value={25} variant="danger" />
							</div>
							<div className="space-y-1.5">
								<span className="text-xs font-medium">
									Indeterminate
								</span>
								<Progress indeterminate />
							</div>
							<div className="space-y-1.5">
								<span className="text-xs font-medium">
									Striped
								</span>
								<Progress value={45} striped animated />
							</div>
						</div>
					</CardBody>
				</Card>

				{/* Pricing Cards */}
				<div>
					<h3 className="text-sm font-semibold mb-3">
						Pricing Cards
					</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
						{[
							{
								name: "Free",
								description: "For personal projects.",
								price: "$0",
								features: [
									"Up to 3 projects",
									"1 team member",
									"Basic analytics",
								],
								cta: "Get started",
								variant: "secondary" as const,
							},
							{
								name: "Pro",
								description: "Advanced features.",
								price: "$19",
								features: [
									"Unlimited projects",
									"5 team members",
									"Advanced analytics",
									"Priority support",
								],
								cta: "Upgrade to Pro",
								variant: "primary" as const,
								popular: true,
							},
							{
								name: "Team",
								description: "Collaboration at scale.",
								price: "$49",
								features: [
									"Everything in Pro",
									"Unlimited members",
									"SSO & SAML",
									"Custom domains",
								],
								cta: "Start trial",
								variant: "secondary" as const,
							},
							{
								name: "Enterprise",
								description: "Custom security and SLAs.",
								price: "Custom",
								features: [
									"Everything in Team",
									"Dedicated support",
									"SLA guarantee",
									"On-premise option",
								],
								cta: "Contact sales",
								variant: "secondary" as const,
							},
						].map((plan) => (
							<Card
								key={plan.name}
								className={
									plan.popular
										? "border-primary shadow-sm ring-1 ring-primary/20"
										: ""
								}
							>
								<CardBody className="p-4 flex flex-col">
									<div className="flex items-center gap-2 mb-1">
										<h4 className="text-sm font-semibold">
											{plan.name}
										</h4>
										{plan.popular && (
											<Badge variant="primary" size="sm">
												Popular
											</Badge>
										)}
									</div>
									<p className="text-xs text-muted-foreground mb-3">
										{plan.description}
									</p>
									<p className="text-2xl font-bold tracking-tight mb-4">
										{plan.price}
										{plan.price !== "Custom" && (
											<span className="text-xs font-normal text-muted-foreground">
												/mo
											</span>
										)}
									</p>
									<ul className="space-y-1.5 mb-4 flex-1">
										{plan.features.map((feature) => (
											<li
												key={feature}
												className="flex items-center gap-2 text-xs text-muted-foreground"
											>
												<CheckCircle2 className="size-3.5 text-success shrink-0" />
												{feature}
											</li>
										))}
									</ul>
									<Button
										variant={plan.variant}
										size="sm"
										fullWidth
									>
										{plan.cta}
									</Button>
								</CardBody>
							</Card>
						))}
					</div>
				</div>
			</div>
		</TooltipProvider>
	);
}
