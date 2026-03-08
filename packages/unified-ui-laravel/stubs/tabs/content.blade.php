{{--
    Unified UI — Tabs Content Sub-Component
    https://unified-ui.space

    The content panel associated with a tab trigger. Only visible when
    its value matches the currently active tab in the parent Alpine.js context.

    Usage:
        <x-ui-tabs active="overview">
            <x-ui-tabs.list>
                <x-ui-tabs.trigger value="overview">Overview</x-ui-tabs.trigger>
                <x-ui-tabs.trigger value="settings">Settings</x-ui-tabs.trigger>
            </x-ui-tabs.list>
            <x-ui-tabs.content value="overview">
                <p>Overview panel content goes here.</p>
            </x-ui-tabs.content>
            <x-ui-tabs.content value="settings">
                <p>Settings panel content goes here.</p>
            </x-ui-tabs.content>
        </x-ui-tabs>

        {{-- With custom padding --}}
        <x-ui-tabs.content value="details" class="p-6">
            Detailed information here.
        </x-ui-tabs.content>

    Props:
        value — unique identifier that matches the corresponding tabs.trigger value (required)
--}}

@props([
    'value' => '',
])

@php
    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'flex-1',
        'outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-[oklch(var(--ui-ring))]',
        'focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[oklch(var(--ui-background))]',
        'rounded-[var(--ui-radius-md)]',
    ]);
@endphp

<div
    x-show="isActive(@js($value))"
    x-cloak
    x-transition:enter="transition ease-[var(--ui-ease-out)] duration-[var(--ui-duration-normal)]"
    x-transition:enter-start="opacity-0 translate-y-0.5"
    x-transition:enter-end="opacity-100 translate-y-0"
    role="tabpanel"
    tabindex="0"
    x-bind:data-state="isActive(@js($value)) ? 'active' : 'inactive'"
    {{ $attributes->class([$baseClasses]) }}
    data-ui-tabs-content
>
    {{ $slot }}
</div>
