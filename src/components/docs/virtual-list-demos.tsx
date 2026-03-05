"use client";

import {
	VirtualList,
	Badge,
	Spinner,
} from "@work-rjkashyap/unified-ui";
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
// Overview demo (rich rows with badges)
// ---------------------------------------------------------------------------

export function DemoOverview() {
	return (
		<VirtualList<BasicItem>
			items={basicItems}
			itemHeight={56}
			height={350}
			renderItem={(user) => (
				<div className="flex items-center justify-between px-4 h-full border-b border-border">
					<div className="flex items-center gap-3">
						<div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
							{user.id}
						</div>
						<div>
							<p className="text-sm font-medium text-foreground">
								{user.name}
							</p>
							<p className="text-xs text-muted-foreground">
								{user.email}
							</p>
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
				<div className="flex items-center gap-3 px-4 h-full border-b border-border">
					<div className="flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-bold">
						{user.id}
					</div>
					<span className="text-sm font-medium text-foreground">
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
				<div className="flex items-center justify-between px-4 h-full border-b border-border">
					<div className="flex items-center gap-3">
						<div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
							{user.name
								.split(" ")
								.map((n) => n[0])
								.join("")}
						</div>
						<div>
							<p className="text-sm font-medium text-foreground">
								{user.name}
							</p>
							<p className="text-xs text-muted-foreground">
								{user.email}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
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
				<div className="flex items-center gap-3 px-4 h-full border-b border-border">
					<span className="text-xs text-muted-foreground tabular-nums w-6">
						{index + 1}
					</span>
					<span className="text-sm text-foreground">{user.name}</span>
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
				<div className="flex items-center gap-3 px-4 h-full border-b border-border">
					<span className="text-xs text-muted-foreground tabular-nums w-6">
						{index + 1}
					</span>
					<span className="text-sm text-foreground">{user.name}</span>
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
				<div className="flex items-center justify-between px-4 h-full border-b border-border">
					<span className="text-sm text-foreground">{user.name}</span>
					<span className="text-xs text-muted-foreground tabular-nums">
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
			<p className="text-xs text-muted-foreground mb-2">
				{items.length} items loaded — scroll to the bottom to load more
			</p>
			<VirtualList
				items={items}
				itemHeight={40}
				height={300}
				loading={loading}
				onEndReached={loadMore}
				endReachedThreshold={200}
				renderItem={(item) => (
					<div className="flex items-center justify-between px-4 h-full border-b border-border">
						<div className="flex items-center gap-3">
							<div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold">
								{item.id}
							</div>
							<span className="text-sm text-foreground">
								{item.name}
							</span>
						</div>
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
				<div className="flex items-center gap-3 px-4 h-full border-b border-border">
					<div className="flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-bold">
						{user.id}
					</div>
					<span className="text-sm text-foreground">{user.name}</span>
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
					<span className="text-sm text-muted-foreground font-medium">
						Loading more users...
					</span>
				</div>
			}
			renderItem={(user) => (
				<div className="flex items-center gap-3 px-4 h-full border-b border-border">
					<span className="text-sm text-foreground">{user.name}</span>
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
				<div className="text-center">
					<p className="text-base font-semibold text-foreground">
						No users found
					</p>
					<p className="text-sm text-muted-foreground mt-1">
						Try adjusting your search or filters.
					</p>
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
				<div className="flex items-center px-4 h-full border-b border-border">
					<span className="text-sm text-foreground">{user.name}</span>
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
				<div className="flex items-center px-4 h-full border-b border-border">
					<span className="text-sm text-foreground">{user.name}</span>
				</div>
			)}
		/>
	);
}
