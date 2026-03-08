{{--
    Unified UI — Card Header Sub-Component
    https://unified-ui.space

    The top section of a card, typically contains a title and description.

    Usage:
        <x-ui-card.header>
            <x-ui-card.title>Title</x-ui-card.title>
            <x-ui-card.description>Description</x-ui-card.description>
        </x-ui-card.header>

        {{-- With action slot --}}
        <x-ui-card.header>
            <div>
                <x-ui-card.title>Title</x-ui-card.title>
                <x-ui-card.description>Description</x-ui-card.description>
            </div>
            <x-slot:action>
                <x-ui-button variant="outline" size="sm">Edit</x-ui-button>
            </x-slot:action>
        </x-ui-card.header>

    Props:
        bordered — boolean, show bottom border separator (default: false)
        padding  — sm|md|lg (default: md)
--}}

@props([
    'bordered' => false,
    'padding' => 'md',
])

@php
    $paddingClasses = match ($padding) {
        'sm' => 'px-3 py-2',
        'md' => 'px-6 py-4',
        'lg' => 'px-8 py-6',
        default => 'px-6 py-4',
    };

    $borderClasses = $bordered
        ? 'border-b border-[oklch(var(--ui-border))]'
        : '';

    $classes = trim("flex items-start justify-between gap-4 {$paddingClasses} {$borderClasses}");
@endphp

<div {{ $attributes->class([$classes]) }} data-ui-card-header>
    <div class="flex flex-col gap-1.5 flex-1 min-w-0">
        {{ $slot }}
    </div>

    @if(isset($action))
        <div class="shrink-0 flex items-center">
            {{ $action }}
        </div>
    @endif
</div>
