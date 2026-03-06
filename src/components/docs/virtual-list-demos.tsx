"use client";

import { VirtualList, Badge, Spinner } from "@work-rjkashyap/unified-ui";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Shared data
// ---------------------------------------------------------------------------

const basicItems = Array.from({ length: 1000 }, (_, i) => ({
	id: i + 1,
	name: `User ${i + 1}`,
	email: `user${i + 1}@example.com`,
	role: (["Admin", "Editor", "Viewer"] as const)[i % 3],
}));

type BasicItem = (typeof basicItems)[number];

// ---------------------------------------------------------------------------
// Helper: avatar initials circle
// ---------------------------------------------------------------------------

function AvatarCircle({
	label,
	size = "md",
	variant = "primary",
}: {
	label: string | number;
	size?: "sm" | "md";
	variant?: "primary" | "muted";
}) {
	const sizeClass = size === "sm" ? "size-7 text-[10px]" : "size-8 text-xs";
	const variantClass =
		variant === "primary"
			? "bg-primary/10 text-primary"
			: "bg-muted text-muted-foreground";

	return (
		<div
			className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${sizeClass} ${variantClass}`}
		>
			{label}
		</div>
	);
}

// ---------------------------------------------------------------------------
// Overview demo (rich rows with badges)
// ---------------------------------------------------------------------------

export function DemoOverview() {
	return (
		<VirtualList<BasicItem>
			items={basicItems}
			itemHeight={56}
			height={350}
			renderItem={(user) => (
				<div className="flex w-full items-center justify-between gap-3 px-3">
					<div className="flex min-w-0 items-center gap-3">
						<AvatarCircle label={user.id} />
						<div className="min-w-0">
							<span className="block truncate text-sm font-medium leading-snug text-foreground">
								{user.name}
							</span>
							<span className="block truncate text-xs leading-snug text-muted-foreground">
								{user.email}
							</span>
						</div>
					</div>
					<Badge variant="secondary" size="sm">
						{user.role}
					</Badge>
				</div>
			)}
		/>
	);
}

// ---------------------------------------------------------------------------
// Basic list
// ---------------------------------------------------------------------------

export function DemoBasic() {
	return (
		<VirtualList<BasicItem>
			items={basicItems}
			itemHeight={48}
			height={300}
			renderItem={(user) => (
				<div className="flex w-full items-center gap-3 px-3">
					<AvatarCircle label={user.id} size="sm" variant="muted" />
					<span className="truncate text-sm font-medium text-foreground">
						{user.name}
					</span>
				</div>
			)}
		/>
	);
}

// ---------------------------------------------------------------------------
// Rich content rows
// ---------------------------------------------------------------------------

export function DemoRich() {
	return (
		<VirtualList<BasicItem>
			items={basicItems.slice(0, 500)}
			itemHeight={64}
			height={320}
			renderItem={(user) => (
				<div className="flex w-full items-center justify-between gap-3 px-3">
					<div className="flex min-w-0 items-center gap-3">
						<AvatarCircle
							label={user.name
								.split(" ")
								.map((n) => n[0])
								.join("")}
						/>
						<div className="min-w-0">
							<span className="block truncate text-sm font-medium leading-snug text-foreground">
								{user.name}
							</span>
							<span className="block truncate text-xs leading-snug text-muted-foreground">
								{user.email}
							</span>
						</div>
					</div>
					<Badge
						variant={
							user.role === "Admin"
								? "primary"
								: user.role === "Editor"
									? "info"
									: "secondary"
						}
						size="sm"
					>
						{user.role}
					</Badge>
				</div>
			)}
		/>
	);
}

// ---------------------------------------------------------------------------
// Overscan demos
// ---------------------------------------------------------------------------

export function DemoOverscanLow() {
	return (
		<VirtualList<BasicItem>
			items={basicItems.slice(0, 200)}
			itemHeight={40}
			height={200}
			overscan={2}
			renderItem={(user, index) => (
				<div className="flex w-full items-center gap-3 px-3">
					<span className="w-6 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
						{index + 1}
					</span>
					<span className="truncate text-sm text-foreground">
						{user.name}
					</span>
				</div>
			)}
		/>
	);
}

export function DemoOverscanHigh() {
	return (
		<VirtualList<BasicItem>
			items={basicItems.slice(0, 200)}
			itemHeight={40}
			height={200}
			overscan={10}
			renderItem={(user, index) => (
				<div className="flex w-full items-center gap-3 px-3">
					<span className="w-6 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
						{index + 1}
					</span>
					<span className="truncate text-sm text-foreground">
						{user.name}
					</span>
				</div>
			)}
		/>
	);
}

// ---------------------------------------------------------------------------
// Custom keys
// ---------------------------------------------------------------------------

export function DemoKeys() {
	return (
		<VirtualList<BasicItem>
			items={basicItems.slice(0, 200)}
			itemHeight={44}
			height={250}
			getItemKey={(item) => item.id}
			renderItem={(user) => (
				<div className="flex w-full items-center justify-between px-3">
					<span className="truncate text-sm text-foreground">
						{user.name}
					</span>
					<span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-xs tabular-nums text-muted-foreground">
						ID: {user.id}
					</span>
				</div>
			)}
		/>
	);
}

// ---------------------------------------------------------------------------
// End-reached / infinite loading
// ---------------------------------------------------------------------------

export function DemoEndReached() {
	const [items, setItems] = useState(() =>
		Array.from({ length: 50 }, (_, i) => ({
			id: i + 1,
			name: `Record ${i + 1}`,
		})),
	);
	const [loading, setLoading] = useState(false);

	const loadMore = () => {
		if (loading) return;
		setLoading(true);
		setTimeout(() => {
			setItems((prev) => {
				const next = Array.from({ length: 50 }, (_, i) => ({
					id: prev.length + i + 1,
					name: `Record ${prev.length + i + 1}`,
				}));
				return [...prev, ...next];
			});
			setLoading(false);
		}, 1000);
	};

	return (
		<div className="w-full">
			<span className="mb-2 block text-xs text-muted-foreground">
				{items.length} items loaded — scroll to the bottom to load more
			</span>
			<VirtualList
				items={items}
				itemHeight={40}
				height={300}
				loading={loading}
				onEndReached={loadMore}
				endReachedThreshold={200}
				renderItem={(item) => (
					<div className="flex w-full items-center gap-3 px-3">
						<AvatarCircle label={item.id} size="sm" />
						<span className="truncate text-sm text-foreground">
							{item.name}
						</span>
					</div>
				)}
			/>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Loading state
// ---------------------------------------------------------------------------

export function DemoLoading() {
	return (
		<VirtualList<BasicItem>
			items={basicItems.slice(0, 20)}
			itemHeight={44}
			height={250}
			loading={true}
			renderItem={(user) => (
				<div className="flex w-full items-center gap-3 px-3">
					<AvatarCircle label={user.id} size="sm" variant="muted" />
					<span className="truncate text-sm text-foreground">
						{user.name}
					</span>
				</div>
			)}
		/>
	);
}

// ---------------------------------------------------------------------------
// Custom loading indicator
// ---------------------------------------------------------------------------

export function DemoCustomLoading() {
	return (
		<VirtualList<BasicItem>
			items={basicItems.slice(0, 15)}
			itemHeight={44}
			height={250}
			loading={true}
			loadingIndicator={
				<div className="flex items-center justify-center gap-2 py-3">
					<Spinner size="sm" />
					<span className="text-sm font-medium text-muted-foreground">
						Loading more users...
					</span>
				</div>
			}
			renderItem={(user) => (
				<div className="flex w-full items-center gap-3 px-3">
					<span className="truncate text-sm text-foreground">
						{user.name}
					</span>
				</div>
			)}
		/>
	);
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

export function DemoEmpty() {
	return (
		<VirtualList
			items={[]}
			itemHeight={48}
			height={250}
			emptyContent={
				<div className="flex flex-col items-center gap-1.5 text-center">
					<div className="flex size-10 items-center justify-center rounded-full bg-muted">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-muted-foreground"
							aria-hidden="true"
						>
							<circle cx="11" cy="11" r="8" />
							<path d="m21 21-4.3-4.3" />
						</svg>
					</div>
					<span className="block text-sm font-semibold text-foreground">
						No users found
					</span>
					<span className="block text-xs text-muted-foreground">
						Try adjusting your search or filters.
					</span>
				</div>
			}
			renderItem={() => null}
		/>
	);
}

// ---------------------------------------------------------------------------
// Height demos
// ---------------------------------------------------------------------------

export function DemoHeightSmall() {
	return (
		<VirtualList<BasicItem>
			items={basicItems.slice(0, 100)}
			itemHeight={36}
			height={150}
			renderItem={(user) => (
				<div className="flex w-full items-center px-3">
					<span className="truncate text-sm text-foreground">
						{user.name}
					</span>
				</div>
			)}
		/>
	);
}

export function DemoHeightLarge() {
	return (
		<VirtualList<BasicItem>
			items={basicItems.slice(0, 100)}
			itemHeight={36}
			height={300}
			renderItem={(user) => (
				<div className="flex w-full items-center px-3">
					<span className="truncate text-sm text-foreground">
						{user.name}
					</span>
				</div>
			)}
		/>
	);
}
