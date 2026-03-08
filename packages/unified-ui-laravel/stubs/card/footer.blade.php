{{--
    Unified UI — Card Footer Sub-Component
    https://unified-ui.space

    The bottom section of a card, typically contains actions or meta info.

    Usage:
        <x-ui-card.footer>
            <x-ui-button variant="primary">Save</x-ui-button>
            <x-ui-button variant="outline">Cancel</x-ui-button>
        </x-ui-card.footer>

        <x-ui-card.footer justify="between">
            <span class="text-sm text-muted">Last updated 2h ago</span>
            <x-ui-button variant="ghost" size="sm">View</x-ui-button>
        </x-ui-card.footer>

    Props:
        bordered — boolean, show top border separator (default: false)
        padding  — sm|md|lg (default: md)
        justify  — start|end|center|between|around|evenly (default: end)
--}}

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
