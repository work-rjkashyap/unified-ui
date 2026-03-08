{{--
    Unified UI — Toggle Component
    https://unified-ui.space

    A two-state toggle button that can be pressed or unpressed.
    Unlike a switch (which represents on/off), a toggle represents
    a pressed/unpressed state for an action (e.g. bold, italic).

    Usage:
        {{-- Basic toggle --}}
        <x-ui-toggle>
            <svg class="h-4 w-4" ...>...</svg>
        </x-ui-toggle>

        {{-- With text --}}
        <x-ui-toggle>Bold</x-ui-toggle>

        {{-- Variants --}}
        <x-ui-toggle variant="default">A</x-ui-toggle>
        <x-ui-toggle variant="outline">B</x-ui-toggle>

        {{-- Sizes --}}
        <x-ui-toggle size="sm">S</x-ui-toggle>
        <x-ui-toggle size="md">M</x-ui-toggle>
        <x-ui-toggle size="lg">L</x-ui-toggle>

        {{-- Default pressed state --}}
        <x-ui-toggle :pressed="true">On</x-ui-toggle>

        {{-- Disabled --}}
        <x-ui-toggle disabled>Off</x-ui-toggle>

    Props:
        variant  — default|outline (default: default)
        size     — sm|md|lg (default: md)
        pressed  — boolean, initial pressed state (default: false)
        disabled — boolean (default: false)
        name     — optional form input name for hidden input submission
        value    — value submitted when pressed (default: "1")
--}}

@props([
    'variant' => 'default',
    'size' => 'md',
    'pressed' => false,
    'disabled' => false,
    'name' => null,
    'value' => '1',
])

@php
    // ── Variant classes ──────────────────────────────────────────────
    $variantClasses = match ($variant) {
        'outline' => implode(' ', [
            'border',
            'border-[oklch(var(--ui-border))]',
            'bg-transparent',
            'text-[oklch(var(--ui-foreground))]',
            'hover:bg-[oklch(var(--ui-accent))]',
            'hover:text-[oklch(var(--ui-accent-foreground))]',
            'data-[state=on]:bg-[oklch(var(--ui-accent))]',
            'data-[state=on]:text-[oklch(var(--ui-accent-foreground))]',
            'data-[state=on]:border-[oklch(var(--ui-accent))]',
        ]),
        default => implode(' ', [
            'bg-transparent',
            'text-[oklch(var(--ui-foreground))]',
            'hover:bg-[oklch(var(--ui-muted))]',
            'hover:text-[oklch(var(--ui-muted-foreground))]',
            'data-[state=on]:bg-[oklch(var(--ui-accent))]',
            'data-[state=on]:text-[oklch(var(--ui-accent-foreground))]',
        ]),
    };

    // ── Size classes ─────────────────────────────────────────────────
    $sizeClasses = match ($size) {
        'sm' => 'h-8 px-2 text-xs gap-1 rounded-[var(--ui-radius-sm)]',
        'md' => 'h-9 px-3 text-sm gap-1.5 rounded-[var(--ui-radius-md)]',
        'lg' => 'h-10 px-4 text-sm gap-2 rounded-[var(--ui-radius-md)]',
        default => 'h-9 px-3 text-sm gap-1.5 rounded-[var(--ui-radius-md)]',
    };

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'inline-flex items-center justify-center',
        'font-medium',
        'whitespace-nowrap',
        'select-none',
        'transition-colors',
        'duration-[var(--ui-duration-normal)]',
        'ease-[var(--ui-ease-default)]',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-[oklch(var(--ui-ring))]',
        'focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[oklch(var(--ui-background))]',
        'disabled:pointer-events-none',
        'disabled:opacity-50',
    ]);

    $classes = trim("{$baseClasses} {$variantClasses} {$sizeClasses}");
@endphp

<button
    type="button"
    role="switch"
    x-data="{ pressed: @js((bool) $pressed) }"
    x-on:click="pressed = !pressed"
    x-bind:aria-pressed="pressed.toString()"
    x-bind:data-state="pressed ? 'on' : 'off'"
    @if($disabled) disabled aria-disabled="true" @endif
    {{ $attributes->class([$classes]) }}
    data-ui-toggle
>
    {{-- Hidden form input --}}
    @if($name)
        <input
            type="hidden"
            name="{{ $name }}"
            x-bind:value="pressed ? @js($value) : ''"
        />
    @endif

    {{-- Toggle content --}}
    {{ $slot }}
</button>
