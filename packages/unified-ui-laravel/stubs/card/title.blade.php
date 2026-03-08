{{--
    Unified UI — Card Title Sub-Component
    https://unified-ui.space

    Usage:
        <x-ui-card.title>My Card Title</x-ui-card.title>
        <x-ui-card.title as="h2">Heading Level 2</x-ui-card.title>
        <x-ui-card.title as="h4" class="text-lg">Custom styled</x-ui-card.title>

    Props:
        as — HTML tag: h1|h2|h3|h4|h5|h6|p|span (default: h3)
--}}

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
