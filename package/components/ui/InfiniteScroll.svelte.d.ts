import type { Snippet } from 'svelte';
type $$ComponentProps = {
    children: Snippet;
    onLoadMore: () => void | Promise<void>;
    loading?: boolean;
    hasMore?: boolean;
    rootMargin?: string;
    endLabel?: string;
};
declare const InfiniteScroll: import("svelte").Component<$$ComponentProps, {}, "">;
type InfiniteScroll = ReturnType<typeof InfiniteScroll>;
export default InfiniteScroll;
