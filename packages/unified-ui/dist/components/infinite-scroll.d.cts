import * as react from 'react';
import { ReactNode } from 'react';

interface InfiniteScrollProps {
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
declare const InfiniteScroll: react.ForwardRefExoticComponent<InfiniteScrollProps & react.RefAttributes<HTMLDivElement>>;

export { InfiniteScroll, type InfiniteScrollProps };
