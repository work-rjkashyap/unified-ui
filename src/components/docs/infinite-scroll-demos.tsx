"use client";

import { useState } from "react";
import {
	InfiniteScroll,
	Badge,
	Spinner,
} from "@work-rjkashyap/unified-ui";

// ---------------------------------------------------------------------------
// Basic list demo
// ---------------------------------------------------------------------------

export function DemoBasic() {
	const [items, setItems] = useState(() =>
		Array.from({ length: 10 }, (_, i) => ({
			id: i + 1,
			name: `Item ${i + 1}`,
		})),
	);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const loadMore = () => {
		if (loading) return;
		setLoading(true);
		setTimeout(() => {
			setItems((prev) => {
				const next = Array.from({ length: 10 }, (_, i) => ({
					id: prev.length + i + 1,
					name: `Item ${prev.length + i + 1}`,
				}));
				const all = [...prev, ...next];
				if (all.length >= 40) setHasMore(false);
				return all;
			});
			setLoading(false);
		}, 1000);
	};

	return (
		<div className="h-[300px] overflow-auto rounded-lg border border-border">
			<InfiniteScroll
				loading={loading}
				hasMore={hasMore}
				onLoadMore={loadMore}
				endMessage={
					<p className="text-center text-sm text-muted-foreground py-4">
						You've reached the end!
					</p>
				}
			>
				<div className="divide-y divide-border">
					{items.map((item) => (
						<div
							key={item.id}
							className="flex items-center justify-between px-4 py-3"
						>
							<div className="flex items-center gap-3">
								<div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
									{item.id}
								</div>
								<span className="text-sm font-medium text-foreground">
									{item.name}
								</span>
							</div>
							<Badge variant="secondary" size="sm">
								row
							</Badge>
						</div>
					))}
				</div>
			</InfiniteScroll>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Card grid demo
// ---------------------------------------------------------------------------

export function DemoCards() {
	const [items, setItems] = useState(() =>
		Array.from({ length: 6 }, (_, i) => ({
			id: i + 1,
			title: `Card ${i + 1}`,
			desc: `Description for card ${i + 1}. This is some placeholder content.`,
		})),
	);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const loadMore = () => {
		if (loading) return;
		setLoading(true);
		setTimeout(() => {
			setItems((prev) => {
				const next = Array.from({ length: 6 }, (_, i) => ({
					id: prev.length + i + 1,
					title: `Card ${prev.length + i + 1}`,
					desc: `Description for card ${prev.length + i + 1}. This is some placeholder content.`,
				}));
				const all = [...prev, ...next];
				if (all.length >= 24) setHasMore(false);
				return all;
			});
			setLoading(false);
		}, 1200);
	};

	return (
		<div className="h-[350px] overflow-auto rounded-lg border border-border p-4">
			<InfiniteScroll
				loading={loading}
				hasMore={hasMore}
				onLoadMore={loadMore}
				endMessage={
					<p className="text-center text-sm text-muted-foreground py-4">
						All cards loaded.
					</p>
				}
			>
				<div className="grid grid-cols-2 gap-3">
					{items.map((item) => (
						<div
							key={item.id}
							className="rounded-lg border border-border bg-background p-4"
						>
							<h4 className="text-sm font-semibold text-foreground">
								{item.title}
							</h4>
							<p className="text-xs text-muted-foreground mt-1">
								{item.desc}
							</p>
						</div>
					))}
				</div>
			</InfiniteScroll>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Custom loading indicator demo
// ---------------------------------------------------------------------------

export function DemoCustomLoader() {
	const [items, setItems] = useState(() =>
		Array.from({ length: 8 }, (_, i) => ({
			id: i + 1,
			name: `Record ${i + 1}`,
		})),
	);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const loadMore = () => {
		if (loading) return;
		setLoading(true);
		setTimeout(() => {
			setItems((prev) => {
				const next = Array.from({ length: 8 }, (_, i) => ({
					id: prev.length + i + 1,
					name: `Record ${prev.length + i + 1}`,
				}));
				const all = [...prev, ...next];
				if (all.length >= 32) setHasMore(false);
				return all;
			});
			setLoading(false);
		}, 1500);
	};

	return (
		<div className="h-[300px] overflow-auto rounded-lg border border-border">
			<InfiniteScroll
				loading={loading}
				hasMore={hasMore}
				onLoadMore={loadMore}
				loadingIndicator={
					<div className="flex items-center justify-center gap-2 py-4">
						<Spinner size="sm" />
						<span className="text-sm text-muted-foreground font-medium">
							Fetching more records...
						</span>
					</div>
				}
				endMessage={
					<div className="text-center py-4">
						<p className="text-sm font-medium text-foreground">
							All done!
						</p>
						<p className="text-xs text-muted-foreground mt-0.5">
							{items.length} records loaded
						</p>
					</div>
				}
			>
				<div className="divide-y divide-border">
					{items.map((item) => (
						<div
							key={item.id}
							className="flex items-center gap-3 px-4 py-3"
						>
							<div className="size-2 rounded-full bg-success shrink-0" />
							<span className="text-sm text-foreground">
								{item.name}
							</span>
						</div>
					))}
				</div>
			</InfiniteScroll>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Loading state demo (static)
// ---------------------------------------------------------------------------

export function DemoLoading() {
	return (
		<div className="h-[200px] overflow-auto rounded-lg border border-border">
			<InfiniteScroll loading={true} hasMore={true} onLoadMore={() => {}}>
				<div className="divide-y divide-border">
					{Array.from({ length: 5 }, (_, i) => (
						<div
							key={i}
							className="flex items-center gap-3 px-4 py-3"
						>
							<div className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-bold">
								{i + 1}
							</div>
							<span className="text-sm text-foreground">
								Item {i + 1}
							</span>
						</div>
					))}
				</div>
			</InfiniteScroll>
		</div>
	);
}

// ---------------------------------------------------------------------------
// End of list demo (static)
// ---------------------------------------------------------------------------

export function DemoEnd() {
	return (
		<div className="h-[200px] overflow-auto rounded-lg border border-border">
			<InfiniteScroll
				loading={false}
				hasMore={false}
				onLoadMore={() => {}}
				endMessage={
					<p className="text-center text-sm text-muted-foreground py-4">
						🎉 You've seen everything!
					</p>
				}
			>
				<div className="divide-y divide-border">
					{Array.from({ length: 5 }, (_, i) => (
						<div
							key={i}
							className="flex items-center gap-3 px-4 py-3"
						>
							<div className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-bold">
								{i + 1}
							</div>
							<span className="text-sm text-foreground">
								Item {i + 1}
							</span>
						</div>
					))}
				</div>
			</InfiniteScroll>
		</div>
	);
}
