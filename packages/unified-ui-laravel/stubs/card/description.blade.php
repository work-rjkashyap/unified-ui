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
