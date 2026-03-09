@props([
    'selected' => false,
])

@php
    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'border-b',
        'border-[oklch(var(--ui-border))]',
        'transition-colors',
        'duration-[var(--ui-duration-fast)]',
        'ease-[var(--ui-ease-default)]',
    ]);

    // ── Selected state ───────────────────────────────────────────────
    $selectedClasses = $selected
        ? 'bg-[oklch(var(--ui-muted))]'
        : '';

    $classes = trim("{$baseClasses} {$selectedClasses}");
@endphp

<tr
    {{ $attributes->class([$classes]) }}
    @if($selected) data-ui-table-row-selected @endif
    data-ui-table-row
>
    {{ $slot }}
</tr>
