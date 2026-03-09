@props([
    'heading' => null,
])

@php
    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'overflow-hidden',
        'py-1',
    ]);

    // ── Heading classes ──────────────────────────────────────────────
    $headingClasses = implode(' ', [
        'px-3',
        'py-1.5',
        'text-xs',
        'font-medium',
        'leading-none',
        'text-[oklch(var(--ui-muted-foreground))]',
        'select-none',
    ]);
@endphp

<div
    {{ $attributes->class([$baseClasses]) }}
    role="group"
    @if($heading) aria-label="{{ $heading }}" @endif
    data-ui-command-group
>
    {{-- Group heading --}}
    @if($heading)
        <div class="{{ $headingClasses }}" aria-hidden="true">
            {{ $heading }}
        </div>
    @endif

    {{-- Group items --}}
    {{ $slot }}
</div>
