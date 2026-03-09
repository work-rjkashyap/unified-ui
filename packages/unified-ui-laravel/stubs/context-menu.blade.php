@props([
    'width'  => 'md',
])

@php
    $widthClasses = match ($width) {
        'sm'   => 'w-40',
        'lg'   => 'w-56',
        'xl'   => 'w-64',
        'auto' => 'w-auto min-w-[10rem]',
        default => 'w-48',
    };
    $panelClasses = implode(' ', [
        'fixed z-[var(--ui-z-dropdown,50)]',
        $widthClasses,
        'rounded-[var(--ui-radius-lg)] border border-[oklch(var(--ui-border))]',
        'bg-[oklch(var(--ui-popover))] text-[oklch(var(--ui-popover-foreground))]',
        'shadow-[var(--ui-shadow-md)] py-1 outline-none',
    ]);
@endphp

{{--
    ContextMenu — right-click context menu.

    Usage:
        <x-context-menu>
            <x-slot:trigger><div>Right-click me</div></x-slot:trigger>
            <x-dropdown-item>Open</x-dropdown-item>
            <x-dropdown-divider />
            <x-dropdown-item variant="danger">Delete</x-dropdown-item>
        </x-context-menu>
--}}

<div
    x-data="{
        open: false,
        x: 0,
        y: 0,
        items: [],

        show(event) {
            event.preventDefault();
            this.open = false;
            this.$nextTick(() => {
                this.x = event.clientX;
                this.y = event.clientY;
                this.open = true;
                this.$nextTick(() => {
                    this.items = [...(this.$refs.menu?.querySelectorAll('[data-ui-dropdown-item]:not([disabled])') ?? [])];
                    this.$refs.menu?.focus();
                    // Adjust if overflowing viewport
                    const rect = this.$refs.menu?.getBoundingClientRect();
                    if (rect) {
                        if (this.x + rect.width > window.innerWidth)  this.x = window.innerWidth - rect.width - 8;
                        if (this.y + rect.height > window.innerHeight) this.y = window.innerHeight - rect.height - 8;
                    }
                });
            });
        },
        close() { this.open = false; },
    }"
    x-on:contextmenu="show($event)"
    x-on:click.outside="close()"
    x-on:keydown.escape.window="close()"
    class="inline-block"
    {{ $attributes->except(['class']) }}
    data-ui-context-menu
>
    {{-- Target area --}}
    <div data-ui-context-menu-trigger>
        {{ $trigger }}
    </div>

    {{-- Floating menu (teleported for correct stacking) --}}
    <template x-teleport="body">
        <div
            x-ref="menu"
            x-show="open"
            x-cloak
            :style="{ position: 'fixed', left: x + 'px', top: y + 'px' }"
            x-transition:enter="transition ease-[var(--ui-ease-out)] duration-[var(--ui-duration-fast)] origin-top-left"
            x-transition:enter-start="opacity-0 scale-95"
            x-transition:enter-end="opacity-100 scale-100"
            x-transition:leave="transition ease-[var(--ui-ease-in)] duration-[var(--ui-duration-fast)] origin-top-left"
            x-transition:leave-start="opacity-100 scale-100"
            x-transition:leave-end="opacity-0 scale-95"
            class="{{ $panelClasses }}"
            role="menu"
            aria-orientation="vertical"
            tabindex="-1"
            x-on:click="close()"
        >
            {{ $slot }}
        </div>
    </template>
</div>
