{{--
    Unified UI — Table Row Sub-Component
    https://unified-ui.space

    A <tr> element with consistent styling for use within table header
    and body sections. Supports selected state highlighting and inherits
    striped/hoverable/dense behavior from the parent table's data attributes.

    Usage:
        <x-ui-table>
            <x-ui-table.header>
                <x-ui-table.row>
                    <x-ui-table.head>Name</x-ui-table.head>
                    <x-ui-table.head>Email</x-ui-table.head>
                </x-ui-table.row>
            </x-ui-table.header>
            <x-ui-table.body>
                <x-ui-table.row>
                    <x-ui-table.cell>Jane Doe</x-ui-table.cell>
                    <x-ui-table.cell>jane@example.com</x-ui-table.cell>
                </x-ui-table.row>
            </x-ui-table.body>
        </x-ui-table>

        {{-- Selected / highlighted row --}}
        <x-ui-table.row selected>
            <x-ui-table.cell>Selected row</x-ui-table.cell>
            <x-ui-table.cell>highlighted</x-ui-table.cell>
        </x-ui-table.row>

        {{-- Clickable row --}}
        <x-ui-table.row class="cursor-pointer" onclick="window.location='/users/1'">
            <x-ui-table.cell>Jane Doe</x-ui-table.cell>
            <x-ui-table.cell>jane@example.com</x-ui-table.cell>
        </x-ui-table.row>

    Props:
        selected — boolean, applies a highlighted background to indicate selection (default: false)
--}}

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
