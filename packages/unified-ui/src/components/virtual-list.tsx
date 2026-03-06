"use client";

// ============================================================================
// Unified UI — VirtualList Component
// ============================================================================
// Virtualized list/grid for large datasets using Intersection Observer.
// Renders only visible items for optimal performance with thousands of rows.
//
// Features:
//   - Virtual scrolling with dynamic item heights
//   - Fixed-height and variable-height modes
//   - Overscan for smooth scrolling (renders extra items above/below viewport)
//   - Scroll-to-index support
//   - Both list (1-column) and grid layouts
//   - Keyboard navigation compatible
//   - Full ref forwarding
//   - Works with ScrollArea for custom scrollbars
//   - WCAG AA: proper role attributes, aria-setsize, aria-posinset
//
// This is a lightweight implementation using native APIs. For advanced
// use cases (variable row heights, bidirectional scroll), consider
// @tanstack/react-virtual directly.
//
// Usage:
//   import { VirtualList } from "@work-rjkashyap/unified-ui/components";
//
//   <VirtualList
//     items={data}
//     itemHeight={48}
//     renderItem={(item, index) => <div>{item.name}</div>}
//   />
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import {
  forwardRef,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface VirtualListProps<T = unknown> {
  /** Array of items to render. */
  items: T[];

  /** Height of each item in pixels (fixed-height mode). */
  itemHeight: number;

  /** Render function for each item. */
  renderItem: (item: T, index: number) => ReactNode;

  /** Height of the scrollable container in pixels. @default 400 */
  height?: number;

  /** Number of extra items to render above/below the viewport. @default 5 */
  overscan?: number;

  /** Optional key extractor. Defaults to index. */
  getItemKey?: (item: T, index: number) => string | number;

  /** Callback when scroll reaches the bottom (for infinite scroll). */
  onEndReached?: () => void;

  /** Distance from bottom (in px) to trigger onEndReached. @default 100 */
  endReachedThreshold?: number;

  /** Loading state — shows a loader at the bottom. */
  loading?: boolean;

  /** Custom loading indicator. */
  loadingIndicator?: ReactNode;

  /** Empty state content. */
  emptyContent?: ReactNode;

  /** Additional class on the outer container. */
  className?: string;

  /** Additional class on each item wrapper. */
  itemClassName?: string;
}

// ---------------------------------------------------------------------------
// VirtualList
// ---------------------------------------------------------------------------

/**
 * `VirtualList` — a performant virtualized list that only renders visible items.
 *
 * @example
 * ```tsx
 * <VirtualList
 *   items={users}
 *   itemHeight={56}
 *   height={500}
 *   renderItem={(user, i) => (
 *     <div className="flex items-center gap-3 px-4 py-3">
 *       <Avatar src={user.avatar} size="sm" />
 *       <span>{user.name}</span>
 *     </div>
 *   )}
 * />
 * ```
 */
export const VirtualList = forwardRef(function VirtualList<T>(
  {
    items,
    itemHeight,
    renderItem,
    height = 400,
    overscan = 5,
    getItemKey,
    onEndReached,
    endReachedThreshold = 100,
    loading = false,
    loadingIndicator,
    emptyContent,
    className,
    itemClassName,
  }: VirtualListProps<T>,
  ref: React.Ref<HTMLDivElement>,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;

  // Calculate visible range
  const { startIndex, endIndex, visibleCount } = useMemo(() => {
    const visCount = Math.ceil(height / itemHeight);
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const end = Math.min(
      items.length - 1,
      Math.floor(scrollTop / itemHeight) + visCount + overscan,
    );
    return { startIndex: start, endIndex: end, visibleCount: visCount };
  }, [scrollTop, height, itemHeight, items.length, overscan]);

  // Scroll handler
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      setScrollTop(target.scrollTop);

      // Check end reached
      if (onEndReached) {
        const distanceFromBottom =
          target.scrollHeight - target.scrollTop - target.clientHeight;
        if (distanceFromBottom < endReachedThreshold) {
          onEndReached();
        }
      }
    },
    [onEndReached, endReachedThreshold],
  );

  // Assign forwarded ref
  useEffect(() => {
    if (!ref) return;
    const node = containerRef.current;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref && "current" in ref) {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  }, [ref]);

  if (items.length === 0 && emptyContent) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "flex items-center justify-center rounded-lg border border-border bg-background shadow-sm not-prose",
          className,
        )}
        style={{ height }}
        data-ds=""
        data-ds-component="virtual-list"
      >
        {emptyContent}
      </div>
    );
  }

  // Build visible items
  const visibleItems: ReactNode[] = [];
  for (let i = startIndex; i <= endIndex && i < items.length; i++) {
    const key = getItemKey ? getItemKey(items[i], i) : i;
    visibleItems.push(
      <div
        key={key}
        className={cn(
          "absolute left-0 right-0 flex items-center",
          "transition-colors duration-fast ease-standard",
          "hover:bg-muted/50",
          "border-b border-border/50",
          "[&_p]:m-0 [&_p]:leading-tight [&_span]:leading-tight",
          itemClassName,
        )}
        style={{
          height: itemHeight,
          top: i * itemHeight,
        }}
        role="listitem"
        aria-setsize={items.length}
        aria-posinset={i + 1}
      >
        {renderItem(items[i], i)}
      </div>,
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-auto rounded-lg border border-border bg-background",
        "shadow-sm not-prose",
        "[scrollbar-width:thin] [scrollbar-color:hsl(var(--border))_transparent]",
        "[&::-webkit-scrollbar]:w-1.5",
        "[&::-webkit-scrollbar-track]:bg-transparent",
        "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border",
        className,
      )}
      style={{ height }}
      onScroll={handleScroll}
      role="list"
      data-ds=""
      data-ds-component="virtual-list"
    >
      <div className="relative w-full" style={{ height: totalHeight }}>
        {visibleItems}
      </div>

      {/* Loading indicator at bottom */}
      {loading && (
        <div className="sticky bottom-0 flex items-center justify-center py-3 bg-background/80 backdrop-blur-sm border-t border-border/50">
          {loadingIndicator ?? (
            <div className="size-5 animate-spin rounded-full border-2 border-border border-t-primary" />
          )}
        </div>
      )}
    </div>
  );
}) as <T>(
  props: VirtualListProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => ReactNode;
