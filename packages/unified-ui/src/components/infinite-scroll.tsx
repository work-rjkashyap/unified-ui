"use client";

// ============================================================================
// Unified UI — InfiniteScroll Component
// ============================================================================
// Scroll-triggered loading with Intersection Observer for infinite lists.
//
// Features:
//   - Intersection Observer for efficient scroll detection
//   - Configurable threshold (distance from bottom to trigger)
//   - Loading spinner / custom indicator
//   - End-of-list detection and messaging
//   - Works with any scrollable container or the viewport
//   - Accessible: aria-busy for loading state
//   - Full ref forwarding
//
// Usage:
//   import { InfiniteScroll } from "@work-rjkashyap/unified-ui/components";
//
//   <InfiniteScroll
//     loading={isFetching}
//     hasMore={hasNextPage}
//     onLoadMore={fetchNextPage}
//   >
//     {items.map(item => <Card key={item.id}>{item.name}</Card>)}
//   </InfiniteScroll>
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import {
  forwardRef,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface InfiniteScrollProps {
  /** Content to render (the list items). */
  children: ReactNode;

  /** Whether more data is currently being loaded. */
  loading?: boolean;

  /** Whether there is more data to load. */
  hasMore?: boolean;

  /** Callback to trigger loading more data. */
  onLoadMore: () => void;

  /**
   * IntersectionObserver rootMargin value. Controls how far from the
   * bottom the trigger fires.
   * @default "200px"
   */
  threshold?: string;

  /** Custom loading indicator. */
  loadingIndicator?: ReactNode;

  /** Content to show when all data has been loaded. */
  endMessage?: ReactNode;

  /** Additional CSS classes on the container. */
  className?: string;

  /** Additional CSS classes on the sentinel element. */
  sentinelClassName?: string;
}

// ---------------------------------------------------------------------------
// InfiniteScroll
// ---------------------------------------------------------------------------

/**
 * `InfiniteScroll` — scroll-triggered infinite loading.
 *
 * Renders children with a sentinel element at the bottom. When the
 * sentinel enters the viewport (via IntersectionObserver), it calls
 * `onLoadMore`. Shows a loading indicator while fetching and an optional
 * end message when `hasMore` is false.
 *
 * @example
 * ```tsx
 * const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(...);
 *
 * <InfiniteScroll
 *   loading={isFetchingNextPage}
 *   hasMore={hasNextPage}
 *   onLoadMore={fetchNextPage}
 *   endMessage={<p className="text-center text-sm text-muted-foreground py-4">That's all!</p>}
 * >
 *   {data.pages.flat().map(item => (
 *     <Card key={item.id}>{item.name}</Card>
 *   ))}
 * </InfiniteScroll>
 * ```
 */
export const InfiniteScroll = forwardRef<HTMLDivElement, InfiniteScrollProps>(
  function InfiniteScroll(
    {
      children,
      loading = false,
      hasMore = true,
      onLoadMore,
      threshold = "200px",
      loadingIndicator,
      endMessage,
      className,
      sentinelClassName,
    },
    ref,
  ) {
    const sentinelRef = useRef<HTMLDivElement>(null);
    const onLoadMoreRef = useRef(onLoadMore);

    // Keep callback ref up to date
    useEffect(() => {
      onLoadMoreRef.current = onLoadMore;
    }, [onLoadMore]);

    // Set up IntersectionObserver
    useEffect(() => {
      const sentinel = sentinelRef.current;
      if (!sentinel || !hasMore || loading) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting) {
            onLoadMoreRef.current();
          }
        },
        {
          rootMargin: `0px 0px ${threshold} 0px`,
          threshold: 0,
        },
      );

      observer.observe(sentinel);
      return () => observer.disconnect();
    }, [hasMore, loading, threshold]);

    return (
      <div
        ref={ref}
        className={cn(className)}
        data-ds=""
        data-ds-component="infinite-scroll"
        aria-busy={loading || undefined}
      >
        {children}

        {/* Sentinel element — observed by IntersectionObserver */}
        {hasMore && (
          <div
            ref={sentinelRef}
            className={cn("w-full", sentinelClassName)}
            aria-hidden="true"
          />
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="flex items-center justify-center py-4">
            {loadingIndicator ?? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="size-4 animate-spin rounded-full border-2 border-border border-t-primary" />
                <span>Loading more...</span>
              </div>
            )}
          </div>
        )}

        {/* End message */}
        {!hasMore && !loading && endMessage && (
          <div className="py-4">{endMessage}</div>
        )}
      </div>
    );
  },
);
InfiniteScroll.displayName = "InfiniteScroll";
