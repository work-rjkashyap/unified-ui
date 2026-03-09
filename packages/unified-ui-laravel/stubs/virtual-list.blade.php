@props([
    'items'      => [],
    'itemHeight' => 48,
    'height'     => 400,
    'overscan'   => 3,
])

{{--
    VirtualList — renders only the visible rows for performance.
    Best used with large arrays passed via Alpine $data or Livewire.

    Usage:
        <x-virtual-list :items="$items" item-height="48" height="400">
            <x-slot:item>
                <span x-text="item.name"></span>
            </x-slot:item>
        </x-virtual-list>
--}}

<div
    x-data="{
        allItems: @json($items),
        itemHeight: {{ $itemHeight }},
        height: {{ $height }},
        overscan: {{ $overscan }},
        scrollTop: 0,

        get visibleStart() {
            return Math.max(0, Math.floor(this.scrollTop / this.itemHeight) - this.overscan);
        },
        get visibleEnd() {
            return Math.min(
                this.allItems.length,
                Math.ceil((this.scrollTop + this.height) / this.itemHeight) + this.overscan
            );
        },
        get visibleItems() {
            return this.allItems.slice(this.visibleStart, this.visibleEnd).map((item, i) => ({
                item,
                index: this.visibleStart + i,
                top: (this.visibleStart + i) * this.itemHeight,
            }));
        },
        get totalHeight() { return this.allItems.length * this.itemHeight; },
        onScroll(e) { this.scrollTop = e.target.scrollTop; },
    }"
    x-on:scroll="onScroll($event)"
    style="height: {{ $height }}px; overflow-y: auto;"
    {{ $attributes->except(['class', 'style']) }}
    data-ui-virtual-list
>
    <div :style="`height: ${totalHeight}px; position: relative;`">
        <template x-for="row in visibleItems" :key="row.index">
            <div
                :style="`position: absolute; top: ${row.top}px; left: 0; right: 0; height: {{ $itemHeight }}px;`"
                :data-ui-virtual-item="row.index"
            >
                @if(isset($item))
                    {{ $item }}
                @else
                    <span x-text="typeof row.item === 'string' ? row.item : JSON.stringify(row.item)"></span>
                @endif
            </div>
        </template>
    </div>
</div>
