@props([
    'as' => 'h3',
])

@php
    $classes = implode(' ', [
        'text-base',
        'font-semibold',
        'leading-tight',
        'tracking-tight',
        'text-[oklch(var(--ui-card-foreground))]',
    ]);
@endphp

<{{ $as }} {{ $attributes->class([$classes]) }} data-ui-card-title>
    {{ $slot }}
</{{ $as }}>
