@props([
    'orientation' => 'horizontal',
])

{{--
    NavigationMenu — top-level navigation with mega-menu dropdowns.

    Usage:
        <x-navigation-menu>
            <x-navigation-menu-item label="Products" :has-dropdown="true">
                <x-slot:content>
                    <div class="grid grid-cols-2 gap-3 p-4">...</div>
                </x-slot:content>
            </x-navigation-menu-item>
            <x-navigation-menu-item href="/about" label="About" />
        </x-navigation-menu>
--}}

<nav
    aria-label="Main navigation"
    {{ $attributes->class([
        'relative flex items-center',
        $orientation === 'vertical' ? 'flex-col items-start' : 'flex-row',
    ]) }}
    data-ui-navigation-menu
    x-data="{
        activeItem: null,
        closeTimer: null,
        open(id) { clearTimeout(this.closeTimer); this.activeItem = id; },
        scheduleClose() {
            this.closeTimer = setTimeout(() => { this.activeItem = null; }, 150);
        },
        cancelClose() { clearTimeout(this.closeTimer); },
    }"
    x-on:keydown.escape="activeItem = null"
>
    <ul class="flex items-center gap-1 list-none m-0 p-0" role="list">
        {{ $slot }}
    </ul>
</nav>
