@props([
    'url'       => null,
    'threshold' => 200,
    'loading'   => false,
])

{{--
    InfiniteScroll — automatically loads more content when the sentinel
    element scrolls into view.

    Usage:
        <x-infinite-scroll
            url="/api/posts"
            x-on:infinite-scroll-load="loadMore($event.detail)"
        >
            <div id="posts-list">...</div>
        </x-infinite-scroll>
--}}

<div
    x-data="{
        loading: {{ $loading ? 'true' : 'false' }},
        done: false,
        page: 1,
        url: '{{ $url ?? '' }}',

        async load() {
            if (this.loading || this.done) return;
            this.loading = true;
            this.$dispatch('infinite-scroll-load', { page: this.page, url: this.url });
            // If using built-in fetch:
            if (this.url) {
                try {
                    const sep = this.url.includes('?') ? '&' : '?';
                    const res = await fetch(`${this.url}${sep}page=${this.page}`);
                    if (!res.ok) { this.done = true; return; }
                    const data = await res.json();
                    this.$dispatch('infinite-scroll-data', { data, page: this.page });
                    if (!data || (Array.isArray(data) && data.length === 0)) this.done = true;
                    else this.page++;
                } finally {
                    this.loading = false;
                }
            } else {
                this.loading = false;
                this.page++;
            }
        },

        markDone() { this.done = true; this.loading = false; },
    }"
    x-on:infinite-scroll-done.window="markDone()"
    {{ $attributes->except(['class']) }}
    data-ui-infinite-scroll
>
    {{-- Content --}}
    {{ $slot }}

    {{-- Sentinel element observed by Intersection Observer --}}
    <div
        x-ref="sentinel"
        x-intersect.threshold.{{ $threshold }}="load()"
        class="h-1"
        aria-hidden="true"
    ></div>

    {{-- Loading indicator --}}
    <template x-if="loading">
        <div class="flex justify-center py-6">
            <svg class="h-6 w-6 animate-spin text-[oklch(var(--ui-primary))]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-label="Loading more" role="status"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.2"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.85"/></svg>
        </div>
    </template>

    {{-- End of list --}}
    <template x-if="done && !loading">
        @if(isset($done))
            {{ $done }}
        @else
            <p class="py-6 text-center text-sm text-[oklch(var(--ui-muted-foreground))]">No more items.</p>
        @endif
    </template>
</div>
