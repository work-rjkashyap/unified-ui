@props([
    'side'        => 'left',
    'variant'     => 'default',
    'collapsible' => true,
    'defaultOpen' => true,
    'width'       => '16rem',
    'collapsedWidth' => '3.5rem',
])

@php
    $sideClasses = $side === 'right' ? 'right-0' : 'left-0';
    $borderClasses = $side === 'right'
        ? 'border-l border-[oklch(var(--ui-border))]'
        : 'border-r border-[oklch(var(--ui-border))]';
@endphp

{{--
    Sidebar — collapsible navigation sidebar.

    Usage:
        <x-sidebar>
            <x-slot:header><x-heading size="sm">App</x-heading></x-slot:header>
            <nav>...</nav>
            <x-slot:footer>...</x-slot:footer>
        </x-sidebar>
--}}

<div
    x-data="{
        open: {{ $defaultOpen ? 'true' : 'false' }},
        collapsible: {{ $collapsible ? 'true' : 'false' }},
        isMobile: window.innerWidth < 768,
        toggle() { if (this.collapsible) this.open = !this.open; },
        get isOpen() { return this.isMobile ? false : this.open; },
    }"
    x-on:sidebar-toggle.window="toggle()"
    x-on:resize.window="isMobile = window.innerWidth < 768"
    {{ $attributes->except(['class']) }}
    data-ui-sidebar
    data-ui-sidebar-side="{{ $side }}"
>
    {{-- Desktop sidebar --}}
    <aside
        :style="`width: ${isOpen ? '{{ $width }}' : '{{ $collapsedWidth }}'}`"
        class="hidden md:flex flex-col h-screen sticky top-0 {{ $sideClasses }} {{ $borderClasses }} bg-[oklch(var(--ui-background))] transition-[width] duration-[var(--ui-duration-normal)] ease-[var(--ui-ease-default)] overflow-hidden shrink-0"
        aria-label="Sidebar navigation"
        :aria-expanded="open.toString()"
    >
        {{-- Header --}}
        @if(isset($header))
            <div class="flex items-center justify-between gap-2 px-4 py-3 border-b border-[oklch(var(--ui-border))] shrink-0">
                <div class="overflow-hidden" :class="isOpen ? 'opacity-100' : 'opacity-0 w-0'">
                    {{ $header }}
                </div>
                @if($collapsible)
                    <button
                        type="button"
                        x-on:click="toggle()"
                        class="inline-flex items-center justify-center h-7 w-7 rounded-[var(--ui-radius-sm)] text-[oklch(var(--ui-muted-foreground))] hover:bg-[oklch(var(--ui-accent))] hover:text-[oklch(var(--ui-foreground))] transition-colors duration-[var(--ui-duration-fast)] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--ui-ring))]"
                        :aria-label="isOpen ? 'Collapse sidebar' : 'Expand sidebar'"
                    >
                        <svg class="h-4 w-4 transition-transform duration-[var(--ui-duration-normal)]" :class="isOpen ? '{{ $side === 'right' ? 'rotate-0' : 'rotate-0' }}' : 'rotate-180'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                @endif
            </div>
        @endif

        {{-- Body --}}
        <div class="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3">
            {{ $slot }}
        </div>

        {{-- Footer --}}
        @if(isset($footer))
            <div class="shrink-0 border-t border-[oklch(var(--ui-border))] px-2 py-3">
                {{ $footer }}
            </div>
        @endif
    </aside>

    {{-- Mobile overlay sidebar --}}
    <div
        x-data="{ mobileOpen: false }"
        x-on:sidebar-mobile-open.window="mobileOpen = true"
        x-on:sidebar-mobile-close.window="mobileOpen = false"
        x-on:sidebar-mobile-toggle.window="mobileOpen = !mobileOpen"
        class="md:hidden"
    >
        {{-- Overlay --}}
        <div
            x-show="mobileOpen"
            x-cloak
            x-transition:enter="transition ease-out duration-[var(--ui-duration-normal)]"
            x-transition:enter-start="opacity-0"
            x-transition:enter-end="opacity-100"
            x-transition:leave="transition ease-in duration-[var(--ui-duration-fast)]"
            x-transition:leave-start="opacity-100"
            x-transition:leave-end="opacity-0"
            x-on:click="mobileOpen = false"
            class="fixed inset-0 z-[var(--ui-z-overlay)] bg-[oklch(var(--ui-background)/0.6)] backdrop-blur-sm"
            aria-hidden="true"
        ></div>

        {{-- Panel --}}
        <aside
            x-show="mobileOpen"
            x-cloak
            x-transition:enter="transition ease-out duration-[var(--ui-duration-slow)]"
            x-transition:enter-start="{{ $side === 'right' ? 'translate-x-full' : '-translate-x-full' }}"
            x-transition:enter-end="translate-x-0"
            x-transition:leave="transition ease-in duration-[var(--ui-duration-normal)]"
            x-transition:leave-start="translate-x-0"
            x-transition:leave-end="{{ $side === 'right' ? 'translate-x-full' : '-translate-x-full' }}"
            class="fixed inset-y-0 {{ $sideClasses }} z-[var(--ui-z-modal)] flex flex-col w-72 {{ $borderClasses }} bg-[oklch(var(--ui-background))] shadow-xl"
        >
            <div class="flex-1 overflow-y-auto px-2 py-4">
                {{ $slot }}
            </div>
        </aside>
    </div>
</div>
