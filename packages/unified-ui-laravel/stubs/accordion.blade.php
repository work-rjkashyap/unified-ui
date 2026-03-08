{{--
    Unified UI — Accordion Component
    https://unified-ui.space

    An expandable/collapsible content panel set powered by Alpine.js.
    Supports single (only one open at a time) or multiple open items,
    with smooth height animations and full keyboard navigation.

    Usage:
        {{-- Basic accordion (single mode) --}}
        <x-ui-accordion>
            <x-ui-accordion.item>
                <x-ui-accordion.trigger>Question 1</x-ui-accordion.trigger>
                <x-ui-accordion.content>Answer 1</x-ui-accordion.content>
            </x-ui-accordion.item>
            <x-ui-accordion.item>
                <x-ui-accordion.trigger>Question 2</x-ui-accordion.trigger>
                <x-ui-accordion.content>Answer 2</x-ui-accordion.content>
            </x-ui-accordion.item>
        </x-ui-accordion>

        {{-- Multiple items open at once --}}
        <x-ui-accordion type="multiple">
            <x-ui-accordion.item>
                <x-ui-accordion.trigger>Section A</x-ui-accordion.trigger>
                <x-ui-accordion.content>Content A</x-ui-accordion.content>
            </x-ui-accordion.item>
            <x-ui-accordion.item>
                <x-ui-accordion.trigger>Section B</x-ui-accordion.trigger>
                <x-ui-accordion.content>Content B</x-ui-accordion.content>
            </x-ui-accordion.item>
        </x-ui-accordion>

        {{-- With default open item --}}
        <x-ui-accordion default="item-1">
            <x-ui-accordion.item value="item-1">
                <x-ui-accordion.trigger>Open by default</x-ui-accordion.trigger>
                <x-ui-accordion.content>This panel is open initially.</x-ui-accordion.content>
            </x-ui-accordion.item>
        </x-ui-accordion>

        {{-- Bordered variant --}}
        <x-ui-accordion variant="bordered">...</x-ui-accordion>

        {{-- Separated cards --}}
        <x-ui-accordion variant="separated">...</x-ui-accordion>

    Props:
        type      — single|multiple (default: single)
        default   — value(s) of initially open item(s); string for single, array for multiple (default: null)
        variant   — default|bordered|separated (default: default)
        collapsible — boolean, in single mode allows closing the open item (default: true)
--}}

@props([
    'type' => 'single',
    'default' => null,
    'variant' => 'default',
    'collapsible' => true,
])

@php
    // ── Variant wrapper classes ───────────────────────────────────────
    $wrapperClasses = match ($variant) {
        'bordered' => implode(' ', [
            'border',
            'border-[oklch(var(--ui-border))]',
            'rounded-[var(--ui-radius-lg)]',
            'overflow-hidden',
            'divide-y',
            'divide-[oklch(var(--ui-border))]',
        ]),
        'separated' => 'flex flex-col gap-3',
        default => implode(' ', [
            'divide-y',
            'divide-[oklch(var(--ui-border))]',
        ]),
    };

    // ── Resolve default open value(s) ────────────────────────────────
    $defaultValue = $default;
    if ($type === 'multiple') {
        $defaultValue = is_array($default) ? $default : ($default !== null ? [$default] : []);
    }
@endphp

<div
    x-data="{
        type: @js($type),
        variant: @js($variant),
        collapsible: @js((bool) $collapsible),

        {{-- For single mode: string or null; for multiple mode: array --}}
        @if($type === 'multiple')
            openItems: @js($defaultValue),
        @else
            openItem: @js($defaultValue),
        @endif

        isOpen(value) {
            if (this.type === 'multiple') {
                return this.openItems.includes(value);
            }
            return this.openItem === value;
        },

        toggle(value) {
            if (this.type === 'multiple') {
                if (this.openItems.includes(value)) {
                    this.openItems = this.openItems.filter(v => v !== value);
                } else {
                    this.openItems.push(value);
                }
            } else {
                if (this.openItem === value) {
                    if (this.collapsible) {
                        this.openItem = null;
                    }
                } else {
                    this.openItem = value;
                }
            }
        }
    }"
    {{ $attributes->class([$wrapperClasses]) }}
    data-ui-accordion
    data-ui-accordion-type="{{ $type }}"
    data-ui-accordion-variant="{{ $variant }}"
>
    {{ $slot }}
</div>
