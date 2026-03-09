@props([
    'position' => 'bottom',
    'align' => 'start',
    'width' => 'md',
    'header' => null,
    'offset' => 4,
])

@php
    // ── Width classes ─────────────────────────────────────────────────
    $widthClasses = match ($width) {
        'sm'   => 'w-40',
        'md'   => 'w-48',
        'lg'   => 'w-56',
        'xl'   => 'w-64',
        'full' => 'w-full',
        'auto' => 'w-auto min-w-[8rem]',
        default => 'w-48',
    };

    // ── Position classes ─────────────────────────────────────────────
    $positionClasses = match ($position) {
        'top' => match ($align) {
            'end'    => 'bottom-full right-0 mb-' . ($offset / 4),
            'center' => 'bottom-full left-1/2 -translate-x-1/2 mb-' . ($offset / 4),
            default  => 'bottom-full left-0 mb-' . ($offset / 4),
        },
        default => match ($align) {
            'end'    => 'top-full right-0 mt-' . ($offset / 4),
            'center' => 'top-full left-1/2 -translate-x-1/2 mt-' . ($offset / 4),
            default  => 'top-full left-0 mt-' . ($offset / 4),
        },
    };

    // ── Animation origin ─────────────────────────────────────────────
    $originClass = match ($position) {
        'top'   => 'origin-bottom',
        default => 'origin-top',
    };

    // ── Panel classes ────────────────────────────────────────────────
    $panelClasses = implode(' ', [
        'absolute',
        'z-[var(--ui-z-dropdown,50)]',
        $positionClasses,
        $widthClasses,
        'rounded-[var(--ui-radius-lg)]',
        'border',
        'border-[oklch(var(--ui-border))]',
        'bg-[oklch(var(--ui-popover))]',
        'text-[oklch(var(--ui-popover-foreground))]',
        'shadow-[var(--ui-shadow-md)]',
        'py-1',
        'outline-none',
    ]);
@endphp

<div
    x-data="{
        open: false,
        activeIndex: -1,
        items: [],
        toggle() {
            this.open ? this.close() : this.openMenu();
        },
        openMenu() {
            this.open = true;
            this.activeIndex = -1;
            this.$nextTick(() => {
                this.items = [...this.$refs.menu.querySelectorAll('[data-ui-dropdown-item]:not([disabled])')];
            });
        },
        close() {
            this.open = false;
            this.activeIndex = -1;
        },
        next() {
            if (!this.items.length) return;
            this.activeIndex = (this.activeIndex + 1) % this.items.length;
            this.items[this.activeIndex]?.focus();
        },
        prev() {
            if (!this.items.length) return;
            this.activeIndex = (this.activeIndex - 1 + this.items.length) % this.items.length;
            this.items[this.activeIndex]?.focus();
        },
        first() {
            if (!this.items.length) return;
            this.activeIndex = 0;
            this.items[0]?.focus();
        },
        last() {
            if (!this.items.length) return;
            this.activeIndex = this.items.length - 1;
            this.items[this.activeIndex]?.focus();
        },
    }"
    x-on:keydown.escape.window="close()"
    x-on:click.outside="close()"
    {{ $attributes->class(['relative inline-flex']) }}
    data-ui-dropdown
>
    {{-- Trigger --}}
    <div
        x-on:click="toggle()"
        x-on:keydown.enter.prevent="toggle()"
        x-on:keydown.space.prevent="toggle()"
        x-on:keydown.arrow-down.prevent="openMenu(); $nextTick(() => first())"
        x-on:keydown.arrow-up.prevent="openMenu(); $nextTick(() => last())"
        aria-haspopup="menu"
        x-bind:aria-expanded="open.toString()"
    >
        {{ $trigger }}
    </div>

    {{-- Menu panel --}}
    <div
        x-ref="menu"
        x-show="open"
        x-cloak
        x-transition:enter="transition ease-[var(--ui-ease-out)] duration-[var(--ui-duration-normal)] {{ $originClass }}"
        x-transition:enter-start="opacity-0 scale-95"
        x-transition:enter-end="opacity-100 scale-100"
        x-transition:leave="transition ease-[var(--ui-ease-in)] duration-[var(--ui-duration-fast)] {{ $originClass }}"
        x-transition:leave-start="opacity-100 scale-100"
        x-transition:leave-end="opacity-0 scale-95"
        class="{{ $panelClasses }}"
        role="menu"
        aria-orientation="vertical"
        x-on:keydown.arrow-down.prevent="next()"
        x-on:keydown.arrow-up.prevent="prev()"
        x-on:keydown.home.prevent="first()"
        x-on:keydown.end.prevent="last()"
        x-on:keydown.tab="close()"
    >
        {{-- Optional header --}}
        @if($header)
            <div class="px-3 py-1.5 text-xs font-semibold text-[oklch(var(--ui-muted-foreground))]">
                {{ $header }}
            </div>
        @endif

        {{-- Menu items (slot) --}}
        {{ $slot }}
    </div>
</div>
