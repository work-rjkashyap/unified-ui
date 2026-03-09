@props([
    'bordered' => false,
    'padding' => 'md',
    'justify' => 'end',
])

@php
    $footerPaddingClasses = match ($padding) {
        'sm' => 'px-3 py-2',
        'md' => 'px-6 py-4',
        'lg' => 'px-8 py-6',
        default => 'px-6 py-4',
    };

    $footerBorderClasses = $bordered
        ? 'border-t border-[oklch(var(--ui-border))]'
        : '';

    $footerJustifyClasses = match ($justify) {
        'start' => 'justify-start',
        'end' => 'justify-end',
        'center' => 'justify-center',
        'between' => 'justify-between',
        'around' => 'justify-around',
        'evenly' => 'justify-evenly',
        default => 'justify-end',
    };

    $footerClasses = trim("flex items-center gap-3 {$footerPaddingClasses} {$footerBorderClasses} {$footerJustifyClasses}");
@endphp

<div {{ $attributes->class([$footerClasses]) }} data-ui-card-footer>
    {{ $slot }}
</div>
