@props([
    'direction' => 'horizontal',
    'minSize'   => 20,
    'maxSize'   => 80,
    'defaultSize' => 50,
])

{{--
    Resizable — a split-pane layout with a draggable divider.

    Usage:
        <x-resizable direction="horizontal">
            <x-slot:first><div class="p-4">Left panel</div></x-slot:first>
            <x-slot:second><div class="p-4">Right panel</div></x-slot:second>
        </x-resizable>
--}}

<div
    x-data="{
        size: {{ $defaultSize }},
        minSize: {{ $minSize }},
        maxSize: {{ $maxSize }},
        direction: '{{ $direction }}',
        dragging: false,

        startDrag(e) {
            this.dragging = true;
            document.body.style.userSelect = 'none';
            document.body.style.cursor = this.direction === 'horizontal' ? 'col-resize' : 'row-resize';
            const onMove = (ev) => { ev.preventDefault(); this.onDrag(ev.touches ? ev.touches[0] : ev); };
            const onUp   = () => {
                this.dragging = false;
                document.body.style.userSelect = '';
                document.body.style.cursor = '';
                window.removeEventListener('mousemove', onMove);
                window.removeEventListener('mouseup', onUp);
                window.removeEventListener('touchmove', onMove);
                window.removeEventListener('touchend', onUp);
            };
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onUp);
            window.addEventListener('touchmove', onMove, { passive: false });
            window.addEventListener('touchend', onUp);
        },

        onDrag(e) {
            const rect = this.$refs.container.getBoundingClientRect();
            let pct;
            if (this.direction === 'horizontal') {
                pct = ((e.clientX - rect.left) / rect.width) * 100;
            } else {
                pct = ((e.clientY - rect.top) / rect.height) * 100;
            }
            this.size = Math.min(this.maxSize, Math.max(this.minSize, pct));
        },

        get firstStyle() {
            return this.direction === 'horizontal'
                ? `width: ${this.size}%; flex: none;`
                : `height: ${this.size}%; flex: none;`;
        },

        get secondStyle() {
            return this.direction === 'horizontal'
                ? `width: ${100 - this.size}%; flex: none;`
                : `height: ${100 - this.size}%; flex: none;`;
        },
    }"
    x-ref="container"
    {{ $attributes->class([
        'flex overflow-hidden',
        $direction === 'vertical' ? 'flex-col' : 'flex-row',
    ]) }}
    data-ui-resizable
    data-ui-resizable-direction="{{ $direction }}"
>
    {{-- First panel --}}
    <div :style="firstStyle" class="min-w-0 min-h-0 overflow-auto" data-ui-resizable-panel>
        {{ $first }}
    </div>

    {{-- Drag handle --}}
    <div
        x-on:mousedown.prevent="startDrag($event)"
        x-on:touchstart.prevent="startDrag($event)"
        :class="dragging ? 'bg-[oklch(var(--ui-primary)/0.5)]' : 'bg-[oklch(var(--ui-border))] hover:bg-[oklch(var(--ui-ring)/0.4)]'"
        class="
            {{ $direction === 'horizontal'
                ? 'w-1 cursor-col-resize flex-none'
                : 'h-1 cursor-row-resize flex-none' }}
            relative z-10 transition-colors duration-[var(--ui-duration-fast)]
            flex items-center justify-center group
        "
        role="separator"
        :aria-orientation="direction"
        aria-label="Resize panels"
        tabindex="0"
        x-on:keydown="
            if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes($event.key)) {
                $event.preventDefault();
                const delta = $event.shiftKey ? 10 : 1;
                const dir = ['ArrowRight','ArrowDown'].includes($event.key) ? 1 : -1;
                size = Math.min(maxSize, Math.max(minSize, size + delta * dir));
            }
        "
        data-ui-resizable-handle
    >
        {{-- Visual dots --}}
        <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--ui-duration-fast)]">
            @if($direction === 'horizontal')
                <div class="flex flex-col gap-0.5">
                    <div class="h-1 w-1 rounded-full bg-[oklch(var(--ui-muted-foreground))]"></div>
                    <div class="h-1 w-1 rounded-full bg-[oklch(var(--ui-muted-foreground))]"></div>
                    <div class="h-1 w-1 rounded-full bg-[oklch(var(--ui-muted-foreground))]"></div>
                </div>
            @else
                <div class="flex flex-row gap-0.5">
                    <div class="h-1 w-1 rounded-full bg-[oklch(var(--ui-muted-foreground))]"></div>
                    <div class="h-1 w-1 rounded-full bg-[oklch(var(--ui-muted-foreground))]"></div>
                    <div class="h-1 w-1 rounded-full bg-[oklch(var(--ui-muted-foreground))]"></div>
                </div>
            @endif
        </div>
    </div>

    {{-- Second panel --}}
    <div :style="secondStyle" class="min-w-0 min-h-0 overflow-auto" data-ui-resizable-panel>
        {{ $second }}
    </div>
</div>
