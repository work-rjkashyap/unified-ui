@props([
    'justify' => 'start',
])

@php
    // ── Justify classes (horizontal only) ────────────────────────────
    $justifyClasses = match ($justify) {
        'center'  => 'justify-center',
        'end'     => 'justify-end',
        'between' => 'justify-between',
        default   => 'justify-start',
    };

    // ── Base classes shared across variants ───────────────────────────
    $baseClasses = implode(' ', [
        'inline-flex',
        'items-center',
        'gap-1',
        'shrink-0',
    ]);
@endphp

<div
    {{ $attributes->class([$baseClasses]) }}
    x-bind:class="{
        'flex-row {{ $justifyClasses }}': orientation === 'horizontal',
        'flex-col items-stretch': orientation === 'vertical',
        'bg-[oklch(var(--ui-muted))] rounded-[var(--ui-radius-lg)] p-1': variant === 'default',
        'gap-1': variant === 'pills',
        'border-b border-[oklch(var(--ui-border))] gap-0 pb-0': variant === 'underline' && orientation === 'horizontal',
        'border-l border-[oklch(var(--ui-border))] gap-0 pl-0': variant === 'underline' && orientation === 'vertical',
    }"
    role="tablist"
    x-bind:aria-orientation="orientation"
    data-ui-tabs-list
>
    {{ $slot }}
</div>
