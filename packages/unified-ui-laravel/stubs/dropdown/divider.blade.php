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
