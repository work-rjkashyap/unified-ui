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
