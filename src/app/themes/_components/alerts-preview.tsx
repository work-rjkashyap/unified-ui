"use client";

import {
	Alert,
	Badge,
	Button,
	Card,
	CardBody,
	EmptyState,
	Progress,
	Tooltip,
	TooltipProvider,
	ToggleGroup,
	ToggleGroupItem,
} from "@work-rjkashyap/unified-ui";
import {
	AlertCircle,
	AlignCenter,
	AlignLeft,
	AlignRight,
	ArrowRight,
	Bold,
	Bookmark,
	CheckCircle2,
	Copy,
	Download,
	Edit,
	Heart,
	Inbox,
	Info,
	Italic,
	Layers,
	Mail,
	Paintbrush,
	Share2,
	Shield,
	Sparkles,
	Star,
	Strikethrough,
	Trash2,
	Underline,
	Zap,
} from "lucide-react";
import { BentoCard } from "./preview-area";

// ---------------------------------------------------------------------------
// AlertsPreview — dense bento grid, no empty space
// ---------------------------------------------------------------------------

export function AlertsPreview() {
	return (
		<TooltipProvider>
			<div className="grid grid-cols-6 gap-3">
				{/* ── Row 1 — Alerts (4/6) + Buttons + Tooltips (2/6) ── */}
				<div className="col-span-6 lg:col-span-4">
					<BentoCard
						title="Alerts"
						description="Contextual feedback messages"
						icon={AlertCircle}
					>
						<div className="space-y-2">
							<Alert variant="info" title="Info">
								This is an informational note. It provides
								helpful context or guidance.
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
						</div>
					</BentoCard>
				</div>

				<div className="col-span-6 lg:col-span-2">
					<div className="grid grid-rows-2 gap-3 h-full">
						<BentoCard
							title="Buttons"
							description="Variants & states"
							icon={Zap}
						>
							<div className="space-y-2">
								<div className="flex flex-wrap gap-1.5">
									<Button variant="primary" size="sm">
										Primary
									</Button>
									<Button variant="secondary" size="sm">
										Secondary
									</Button>
									<Button variant="ghost" size="sm">
										Ghost
									</Button>
									<Button variant="danger" size="sm">
										Danger
									</Button>
								</div>
								<div className="flex flex-wrap gap-1.5">
									<Button
										variant="primary"
										size="sm"
										iconLeft={<Zap className="size-3.5" />}
									>
										Action
									</Button>
									<Button
										variant="secondary"
										size="sm"
										disabled
									>
										Disabled
									</Button>
									<Button
										variant="primary"
										size="sm"
										loading
										loadingText="Saving..."
									>
										Save
									</Button>
								</div>
								<div className="flex flex-wrap gap-1.5">
									<Button
										variant="primary"
										size="sm"
										iconOnly
										aria-label="Like"
									>
										<Heart className="size-3.5" />
									</Button>
									<Button
										variant="secondary"
										size="sm"
										iconOnly
										aria-label="Shield"
									>
										<Shield className="size-3.5" />
									</Button>
									<Button
										variant="ghost"
										size="sm"
										iconOnly
										aria-label="Star"
									>
										<Star className="size-3.5" />
									</Button>
									<Button
										variant="secondary"
										size="sm"
										iconOnly
										aria-label="Sparkle"
									>
										<Sparkles className="size-3.5" />
									</Button>
								</div>
							</div>
						</BentoCard>

						<BentoCard
							title="Tooltips"
							description="Hover for info"
							icon={Info}
						>
							<div className="flex flex-wrap gap-1.5">
								<Tooltip content="Edit this item">
									<Button
										variant="secondary"
										size="sm"
										iconOnly
										aria-label="Edit"
									>
										<Edit className="size-3.5" />
									</Button>
								</Tooltip>
								<Tooltip content="Copy to clipboard">
									<Button
										variant="secondary"
										size="sm"
										iconOnly
										aria-label="Copy"
									>
										<Copy className="size-3.5" />
									</Button>
								</Tooltip>
								<Tooltip content="Share with team">
									<Button
										variant="secondary"
										size="sm"
										iconOnly
										aria-label="Share"
									>
										<Share2 className="size-3.5" />
									</Button>
								</Tooltip>
								<Tooltip content="Download file">
									<Button
										variant="secondary"
										size="sm"
										iconOnly
										aria-label="Download"
									>
										<Download className="size-3.5" />
									</Button>
								</Tooltip>
								<Tooltip content="Bookmark this">
									<Button
										variant="secondary"
										size="sm"
										iconOnly
										aria-label="Bookmark"
									>
										<Bookmark className="size-3.5" />
									</Button>
								</Tooltip>
								<Tooltip content="Delete permanently">
									<Button
										variant="danger"
										size="sm"
										iconOnly
										aria-label="Delete"
									>
										<Trash2 className="size-3.5" />
									</Button>
								</Tooltip>
							</div>
						</BentoCard>
					</div>
				</div>

				{/* ── Row 2 — Dismissible Alerts (3/6) + Badges (3/6) ── */}
				<div className="col-span-6 md:col-span-3">
					<BentoCard
						title="Dismissible Alerts"
						description="Alerts that can be dismissed"
						icon={AlertCircle}
					>
						<div className="space-y-2">
							<Alert
								variant="info"
								title="New feature available"
								dismissible
							>
								We've added dark mode support. Try it out in
								your settings.
							</Alert>
							<Alert
								variant="success"
								title="Deployment complete"
								dismissible
							>
								Your latest changes have been deployed to
								production successfully.
							</Alert>
							<Alert
								variant="warning"
								title="Disk usage high"
								dismissible
							>
								Your storage is 90% full. Consider upgrading
								your plan.
							</Alert>
						</div>
					</BentoCard>
				</div>

				<div className="col-span-6 md:col-span-3">
					<BentoCard
						title="Badges"
						description="Compact labels for status & metadata"
						icon={Layers}
					>
						<div className="space-y-3">
							<div>
								<p className="text-xs font-medium text-muted-foreground mb-1.5">
									Variants
								</p>
								<div className="flex flex-wrap gap-1.5">
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
							<div>
								<p className="text-xs font-medium text-muted-foreground mb-1.5">
									Sizes
								</p>
								<div className="flex flex-wrap items-center gap-1.5">
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
							<div>
								<p className="text-xs font-medium text-muted-foreground mb-1.5">
									Dot indicator
								</p>
								<div className="flex flex-wrap gap-1.5">
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
							<div>
								<p className="text-xs font-medium text-muted-foreground mb-1.5">
									Removable
								</p>
								<div className="flex flex-wrap gap-1.5">
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
								</div>
							</div>
						</div>
					</BentoCard>
				</div>

				{/* ── Row 3 — Progress (3/6) + Toggle Groups (3/6) ── */}
				<div className="col-span-6 md:col-span-3">
					<BentoCard
						title="Progress"
						description="Visual completion indicators"
						icon={ArrowRight}
					>
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
					</BentoCard>
				</div>

				<div className="col-span-6 md:col-span-3">
					<BentoCard
						title="Toggle Groups"
						description="Multi-option selections"
						icon={Paintbrush}
					>
						<div className="space-y-4">
							<div>
								<p className="text-xs font-medium text-muted-foreground mb-2">
									Text alignment
								</p>
								<ToggleGroup type="single" defaultValue="left">
									<ToggleGroupItem
										value="left"
										aria-label="Align left"
									>
										<AlignLeft className="size-4" />
									</ToggleGroupItem>
									<ToggleGroupItem
										value="center"
										aria-label="Align center"
									>
										<AlignCenter className="size-4" />
									</ToggleGroupItem>
									<ToggleGroupItem
										value="right"
										aria-label="Align right"
									>
										<AlignRight className="size-4" />
									</ToggleGroupItem>
								</ToggleGroup>
							</div>
							<div>
								<p className="text-xs font-medium text-muted-foreground mb-2">
									Text formatting
								</p>
								<ToggleGroup
									type="multiple"
									defaultValue={["bold"]}
								>
									<ToggleGroupItem
										value="bold"
										aria-label="Bold"
									>
										<Bold className="size-4" />
									</ToggleGroupItem>
									<ToggleGroupItem
										value="italic"
										aria-label="Italic"
									>
										<Italic className="size-4" />
									</ToggleGroupItem>
									<ToggleGroupItem
										value="underline"
										aria-label="Underline"
									>
										<Underline className="size-4" />
									</ToggleGroupItem>
									<ToggleGroupItem
										value="strikethrough"
										aria-label="Strikethrough"
									>
										<Strikethrough className="size-4" />
									</ToggleGroupItem>
								</ToggleGroup>
							</div>
						</div>
					</BentoCard>
				</div>

				{/* ── Row 4 — Pricing Cards (full width) ── */}
				<div className="col-span-6">
					<BentoCard
						title="Pricing Cards"
						description="Plan comparison"
						icon={Star}
					>
						<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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
												<Badge
													variant="primary"
													size="sm"
												>
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
											{plan.features.map((f) => (
												<li
													key={f}
													className="flex items-center gap-2 text-xs text-muted-foreground"
												>
													<CheckCircle2 className="size-3.5 text-success shrink-0" />
													{f}
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
					</BentoCard>
				</div>

				{/* ── Row 5 — Empty State (full width) ── */}
				<div className="col-span-6">
					<BentoCard
						title="Empty States"
						description="Placeholder views"
						icon={Inbox}
					>
						<EmptyState
							icon={<Inbox className="size-8" />}
							title="No messages yet"
							description="When you receive messages, they will appear here."
							action={
								<Button
									variant="primary"
									size="sm"
									iconLeft={<Mail className="size-3.5" />}
								>
									Compose message
								</Button>
							}
						/>
					</BentoCard>
				</div>
			</div>
		</TooltipProvider>
	);
}
