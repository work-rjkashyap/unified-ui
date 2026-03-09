// Vercel best practice: async-suspense-boundaries
// Streaming skeleton for docs pages — shown while async page component resolves.

export default function DocsLoading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      {/* Title */}
      <div className="h-8 w-2/3 rounded-md bg-fd-muted" />
      {/* Description */}
      <div className="h-5 w-full max-w-lg rounded-md bg-fd-muted" />
      {/* Action bar */}
      <div className="flex gap-2 border-b pb-6">
        <div className="h-8 w-24 rounded-md bg-fd-muted" />
        <div className="h-8 w-24 rounded-md bg-fd-muted" />
      </div>
      {/* Body lines */}
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-fd-muted" />
        <div className="h-4 w-5/6 rounded bg-fd-muted" />
        <div className="h-4 w-4/5 rounded bg-fd-muted" />
        <div className="h-4 w-full rounded bg-fd-muted" />
        <div className="h-4 w-3/4 rounded bg-fd-muted" />
      </div>
      {/* Code block placeholder */}
      <div className="h-40 w-full rounded-lg bg-fd-muted" />
      {/* More body lines */}
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-fd-muted" />
        <div className="h-4 w-2/3 rounded bg-fd-muted" />
      </div>
    </div>
  );
}
