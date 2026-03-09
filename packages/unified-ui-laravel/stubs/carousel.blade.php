@props([
    'autoPlay'   => false,
    'interval'   => 4000,
    'showDots'   => true,
    'showArrows' => true,
    'loop'       => true,
])

<div
    x-data="{
        current: 0,
        total: 0,
        autoPlay: {{ $autoPlay ? 'true' : 'false' }},
        interval: {{ $interval }},
        loop: {{ $loop ? 'true' : 'false' }},
        timer: null,

        init() {
            this.total = this.$refs.track.children.length;
            if (this.autoPlay) this.startTimer();
        },

        go(i) {
            if (this.loop) this.current = ((i % this.total) + this.total) % this.total;
            else this.current = Math.max(0, Math.min(this.total - 1, i));
        },
        prev() { this.go(this.current - 1); },
        next() { this.go(this.current + 1); },

        startTimer() {
            this.timer = setInterval(() => this.next(), this.interval);
        },
        stopTimer() { clearInterval(this.timer); },
    }"
    x-on:mouseenter="stopTimer()"
    x-on:mouseleave="autoPlay && startTimer()"
    {{ $attributes->class(['relative overflow-hidden']) }}
    data-ui-carousel
    role="region"
    aria-label="Carousel"
    aria-roledescription="carousel"
>
    {{-- Track --}}
    <div
        x-ref="track"
        class="flex transition-transform duration-[var(--ui-duration-slow)] ease-[var(--ui-ease-default)]"
        :style="`transform: translateX(-${current * 100}%)`"
        data-ui-carousel-track
    >
        {{ $slot }}
    </div>

    {{-- Previous arrow --}}
    @if($showArrows)
        <button
            type="button"
            x-on:click="prev()"
            :disabled="!loop && current === 0"
            class="absolute left-2 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center h-8 w-8 rounded-full bg-[oklch(var(--ui-background)/0.8)] border border-[oklch(var(--ui-border))] text-[oklch(var(--ui-foreground))] shadow hover:bg-[oklch(var(--ui-background))] disabled:opacity-30 disabled:pointer-events-none transition-colors duration-[var(--ui-duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--ui-ring))]"
            aria-label="Previous slide"
        >
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
        </button>

        <button
            type="button"
            x-on:click="next()"
            :disabled="!loop && current === total - 1"
            class="absolute right-2 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center h-8 w-8 rounded-full bg-[oklch(var(--ui-background)/0.8)] border border-[oklch(var(--ui-border))] text-[oklch(var(--ui-foreground))] shadow hover:bg-[oklch(var(--ui-background))] disabled:opacity-30 disabled:pointer-events-none transition-colors duration-[var(--ui-duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--ui-ring))]"
            aria-label="Next slide"
        >
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
        </button>
    @endif

    {{-- Dots --}}
    @if($showDots)
        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10" role="tablist" aria-label="Slide indicators">
            <template x-for="i in total" :key="i">
                <button
                    type="button"
                    x-on:click="go(i - 1)"
                    :class="current === i - 1 ? 'bg-[oklch(var(--ui-foreground))] w-4' : 'bg-[oklch(var(--ui-foreground)/0.4)] w-2'"
                    class="h-2 rounded-full transition-[width,background-color] duration-[var(--ui-duration-normal)]"
                    :aria-label="`Go to slide ${i}`"
                    :aria-selected="(current === i - 1).toString()"
                    role="tab"
                ></button>
            </template>
        </div>
    @endif
</div>
