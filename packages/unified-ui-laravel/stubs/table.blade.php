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
