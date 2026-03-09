@props([
    'side'       => 'bottom',
    'align'      => 'center',
    'openDelay'  => 200,
    'closeDelay' => 150,
    'width'      => '64',
])

@php
    // ── Panel positioning ────────────────────────────────────────────
    $positionClasses = match ($side) {
        'top'   => match ($align) {
            'start' => 'bottom-full left-0 mb-2',
            'end'   => 'bottom-full right-0 mb-2',
            default => 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        },
        'left'  => match ($align) {
            'start' => 'right-full top-0 mr-2',
            'end'   => 'right-full bottom-0 mr-2',
            default => 'right-full top-1/2 -translate-y-1/2 mr-2',
        },
        'right' => match ($align) {
            'start' => 'left-full top-0 ml-2',
            'end'   => 'left-full bottom-0 ml-2',
            default => 'left-full top-1/2 -translate-y-1/2 ml-2',
        },
        default => match ($align) {  // bottom
            'start' => 'top-full left-0 mt-2',
            'end'   => 'top-full right-0 mt-2',
            default => 'top-full left-1/2 -translate-x-1/2 mt-2',
        },
    };

    $panelClasses = implode(' ', [
        'absolute z-[var(--ui-z-popover,50)]',
        $positionClasses,
        'w-' . $width,
        'rounded-[var(--ui-radius-lg)]',
        'border border-[oklch(var(--ui-border))]',
        'bg-[oklch(var(--ui-popover))]',
        'text-sm text-[oklch(var(--ui-popover-foreground))]',
        'p-4 shadow-[var(--ui-shadow-lg)]',
        'outline-none',
    ]);
@endphp

<div
    x-data="{
        open: false,
        openTimer: null,
        closeTimer: null,
        openDelay: {{ $openDelay }},
        closeDelay: {{ $closeDelay }},

        scheduleOpen() {
            clearTimeout(this.closeTimer);
            this.openTimer = setTimeout(() => { this.open = true; }, this.openDelay);
        },
        scheduleClose() {
            clearTimeout(this.openTimer);
            this.closeTimer = setTimeout(() => { this.open = false; }, this.closeDelay);
        },
        cancelClose() { clearTimeout(this.closeTimer); },
    }"
    class="relative inline-flex"
    {{ $attributes->except(['class']) }}
    data-ui-hover-card
>
    {{-- Trigger --}}
    <div
        x-on:mouseenter="scheduleOpen()"
        x-on:mouseleave="scheduleClose()"
        x-on:focus="scheduleOpen()"
        x-on:blur="scheduleClose()"
        class="inline-flex"
    >
        {{ $trigger }}
    </div>

    {{-- Content panel --}}
    <div
        x-show="open"
        x-cloak
        x-transition:enter="transition ease-[var(--ui-ease-out)] duration-[var(--ui-duration-fast)]"
        x-transition:enter-start="opacity-0 scale-95"
        x-transition:enter-end="opacity-100 scale-100"
        x-transition:leave="transition ease-[var(--ui-ease-in)] duration-[var(--ui-duration-fast)]"
        x-transition:leave-start="opacity-100 scale-100"
        x-transition:leave-end="opacity-0 scale-95"
        x-on:mouseenter="cancelClose()"
        x-on:mouseleave="scheduleClose()"
        class="{{ $panelClasses }}"
        role="tooltip"
    >
        {{ $slot }}
    </div>
</div>
