{{--
    Unified UI — Table Component
    https://unified-ui.space

    A styled data table wrapper with header, body, row, and cell
    sub-components. Supports striped, hoverable, and compact variants
    with full design token integration.

    Usage:
        {{-- Basic table --}}
        <x-ui-table>
            <x-ui-table.header>
                <x-ui-table.row>
                    <x-ui-table.head>Name</x-ui-table.head>
                    <x-ui-table.head>Email</x-ui-table.head>
                    <x-ui-table.head>Role</x-ui-table.head>
                </x-ui-table.row>
            </x-ui-table.header>
            <x-ui-table.body>
                <x-ui-table.row>
                    <x-ui-table.cell>Jane Doe</x-ui-table.cell>
                    <x-ui-table.cell>jane@example.com</x-ui-table.cell>
                    <x-ui-table.cell>Admin</x-ui-table.cell>
                </x-ui-table.row>
                <x-ui-table.row>
                    <x-ui-table.cell>John Smith</x-ui-table.cell>
                    <x-ui-table.cell>john@example.com</x-ui-table.cell>
                    <x-ui-table.cell>Editor</x-ui-table.cell>
                </x-ui-table.row>
            </x-ui-table.body>
        </x-ui-table>

        {{-- Striped rows --}}
        <x-ui-table striped>...</x-ui-table>

        {{-- Hoverable rows --}}
        <x-ui-table hoverable>...</x-ui-table>

        {{-- Compact density --}}
        <x-ui-table dense>...</x-ui-table>

        {{-- Bordered variant --}}
        <x-ui-table bordered>...</x-ui-table>

        {{-- Combined --}}
        <x-ui-table striped hoverable bordered dense>...</x-ui-table>

        {{-- With caption --}}
        <x-ui-table caption="A list of recent invoices.">...</x-ui-table>

    Props:
        striped   — boolean, alternating row background colors (default: false)
        hoverable — boolean, highlight rows on hover (default: false)
        bordered  — boolean, add borders to all cells (default: false)
        dense     — boolean, reduced padding for compact display (default: false)
        caption   — optional table caption text
--}}

@props([
    'striped' => false,
    'hoverable' => false,
    'bordered' => false,
    'dense' => false,
    'caption' => null,
])

@php
    // ── Wrapper classes ──────────────────────────────────────────────
    $wrapperClasses = implode(' ', [
        'relative',
        'w-full',
        'overflow-auto',
    ]);

    // ── Table base classes ───────────────────────────────────────────
    $tableClasses = implode(' ', [
        'w-full',
        'caption-bottom',
        'text-sm',
        'border-collapse',
        'text-[oklch(var(--ui-foreground))]',
    ]);

    // ── Data attributes for sub-component styling ────────────────────
    // Sub-components read these to apply striped/hoverable/dense styles
@endphp

<div
    {{ $attributes->class([$wrapperClasses]) }}
    data-ui-table-wrapper
>
    <table
        class="{{ $tableClasses }}"
        data-ui-table
        @if($striped) data-ui-table-striped @endif
        @if($hoverable) data-ui-table-hoverable @endif
        @if($bordered) data-ui-table-bordered @endif
        @if($dense) data-ui-table-dense @endif
    >
        {{-- Caption --}}
        @if($caption)
            <caption class="mt-4 text-sm text-[oklch(var(--ui-muted-foreground))]">
                {{ $caption }}
            </caption>
        @endif

        {{-- Table content (header, body, footer slots) --}}
        {{ $slot }}
    </table>
</div>
