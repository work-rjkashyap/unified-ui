// Vercel best practice: async-suspense-boundaries
// Streaming skeleton for the themes page.

export default function ThemesLoading() {
	return (
		<div className="min-h-screen animate-pulse">
			{/* Hero header skeleton */}
			<section className="border-b border-border bg-linear-to-b from-muted/30 to-background">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
					<div className="flex flex-col items-center text-center max-w-2xl mx-auto gap-4">
						<div className="size-12 rounded-xl bg-muted" />
						<div className="h-5 w-32 rounded-full bg-muted" />
						<div className="h-9 w-64 rounded-md bg-muted" />
						<div className="h-5 w-80 rounded-md bg-muted" />
					</div>
				</div>
			</section>

			{/* Content area skeleton */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
				<div className="flex flex-col lg:flex-row gap-6">
					{/* Sidebar skeleton */}
					<div className="w-full lg:w-85 xl:w-90 shrink-0">
						<div className="rounded-lg border border-border bg-card p-4 space-y-4">
							<div className="flex items-center justify-between">
								<div className="space-y-1.5">
									<div className="h-4 w-28 rounded-md bg-muted" />
									<div className="h-3 w-40 rounded-md bg-muted" />
								</div>
								<div className="h-8 w-24 rounded-md bg-muted" />
							</div>
							<div className="border-t border-border" />
							<div className="space-y-3">
								<div className="h-4 w-20 rounded-md bg-muted" />
								<div className="grid grid-cols-5 gap-2">
									{Array.from({ length: 5 }).map((_, i) => (
										<div
											key={i}
											className="h-8 rounded-md bg-muted"
										/>
									))}
								</div>
							</div>
							<div className="space-y-3">
								<div className="h-4 w-16 rounded-md bg-muted" />
								<div className="grid grid-cols-4 gap-2">
									{Array.from({ length: 8 }).map((_, i) => (
										<div
											key={i}
											className="h-8 rounded-full bg-muted"
										/>
									))}
								</div>
							</div>
							<div className="space-y-3">
								<div className="h-4 w-14 rounded-md bg-muted" />
								<div className="grid grid-cols-5 gap-2">
									{Array.from({ length: 5 }).map((_, i) => (
										<div
											key={i}
											className="h-8 rounded-md bg-muted"
										/>
									))}
								</div>
							</div>
							<div className="flex gap-2 pt-2">
								<div className="h-9 flex-1 rounded-md bg-muted" />
								<div className="h-9 flex-1 rounded-md bg-muted" />
							</div>
						</div>
					</div>

					{/* Preview area skeleton */}
					<div className="flex-1 min-w-0 space-y-4">
						{/* Tabs skeleton */}
						<div className="flex gap-2">
							{Array.from({ length: 4 }).map((_, i) => (
								<div
									key={i}
									className="h-9 w-24 rounded-md bg-muted"
								/>
							))}
						</div>
						{/* Bento grid skeleton */}
						<div className="grid grid-cols-6 gap-3">
							<div className="col-span-3 h-32 rounded-lg bg-muted" />
							<div className="col-span-3 h-32 rounded-lg bg-muted" />
							<div className="col-span-4 h-48 rounded-lg bg-muted" />
							<div className="col-span-2 h-48 rounded-lg bg-muted" />
							<div className="col-span-3 h-40 rounded-lg bg-muted" />
							<div className="col-span-3 h-40 rounded-lg bg-muted" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
