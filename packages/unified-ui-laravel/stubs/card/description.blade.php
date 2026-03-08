{{--
    Unified UI — Card Description Sub-Component
    https://unified-ui.space

    A muted text element for card descriptions, typically placed inside <x-ui-card.header>.

    Usage:
        <x-ui-card.description>Some explanatory text below the title.</x-ui-card.description>
        <x-ui-card.description class="line-clamp-2">Truncated long description…</x-ui-card.description>

    Props:
        (none beyond standard Blade $attributes)
--}}

@php
    $classes = implode(' ', [
        'text-sm',
        'text-[oklch(var(--ui-muted-foreground))]',
        'leading-normal',
    ]);
@endphp

<p {{ $attributes->class([$classes]) }} data-ui-card-description>
    {{ $slot }}
</p>
