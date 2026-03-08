{{--
    Unified UI — Dropdown Divider Sub-Component
    https://unified-ui.space

    A visual separator line between groups of dropdown menu items.

    Usage:
        <x-ui-dropdown>
            <x-slot:trigger>
                <x-ui-button variant="outline">Options</x-ui-button>
            </x-slot:trigger>
            <x-ui-dropdown.item>Edit</x-ui-dropdown.item>
            <x-ui-dropdown.item>Duplicate</x-ui-dropdown.item>
            <x-ui-dropdown.divider />
            <x-ui-dropdown.item variant="destructive">Delete</x-ui-dropdown.item>
        </x-ui-dropdown>

        {{-- With spacing variants --}}
        <x-ui-dropdown.divider spacing="sm" />
        <x-ui-dropdown.divider spacing="lg" />

    Props:
        spacing — sm|md|lg (default: md) — vertical margin around the divider
--}}

@props([
    'spacing' => 'md',
])

@php
    // ── Spacing classes ──────────────────────────────────────────────
    $spacingClasses = match ($spacing) {
        'sm' => 'my-0.5',
        'md' => 'my-1',
        'lg' => 'my-2',
        default => 'my-1',
    };

    // ── Base classes ─────────────────────────────────────────────────
    $classes = implode(' ', [
        'h-px',
        'w-full',
        'bg-[oklch(var(--ui-border))]',
        $spacingClasses,
    ]);
@endphp

<div
    {{ $attributes->class([$classes]) }}
    role="separator"
    aria-orientation="horizontal"
    data-ui-dropdown-divider
></div>
