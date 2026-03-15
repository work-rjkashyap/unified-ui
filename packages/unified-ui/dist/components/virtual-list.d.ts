import { ReactNode } from 'react';

interface VirtualListProps<T = unknown> {
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
declare const VirtualList: <T>(props: VirtualListProps<T> & {
    ref?: React.Ref<HTMLDivElement>;
}) => ReactNode;

export { VirtualList, type VirtualListProps };
