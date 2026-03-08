{{--
    Unified UI — Accordion Item Sub-Component
    https://unified-ui.space

    A single collapsible item within an accordion. Contains a trigger
    (header) and content (panel) pair. The item's open/closed state is
    managed by the parent accordion's Alpine.js context.

    Usage:
        <x-ui-accordion>
            <x-ui-accordion.item>
                <x-ui-accordion.trigger>Question 1</x-ui-accordion.trigger>
                <x-ui-accordion.content>Answer 1</x-ui-accordion.content>
            </x-ui-accordion.item>
        </x-ui-accordion>

        {{-- With explicit value --}}
        <x-ui-accordion default="faq-1">
            <x-ui-accordion.item value="faq-1">
                <x-ui-accordion.trigger>What is Unified UI?</x-ui-accordion.trigger>
                <x-ui-accordion.content>
                    A design-token-driven component library for Laravel Blade.
                </x-ui-accordion.content>
            </x-ui-accordion.item>
            <x-ui-accordion.item value="faq-2">
                <x-ui-accordion.trigger>How do I install it?</x-ui-accordion.trigger>
                <x-ui-accordion.content>
                    Run <code>composer require unified-ui/laravel</code>.
                </x-ui-accordion.content>
            </x-ui-accordion.item>
        </x-ui-accordion>

        {{-- Disabled item --}}
        <x-ui-accordion.item disabled>
            <x-ui-accordion.trigger>Unavailable Section</x-ui-accordion.trigger>
            <x-ui-accordion.content>This content cannot be toggled.</x-ui-accordion.content>
        </x-ui-accordion.item>

    Props:
        value    — unique identifier for this item within the accordion (auto-generated if omitted)
        disabled — boolean, prevents opening/closing this item (default: false)
--}}

@props([
    'value' => null,
    'disabled' => false,
])

@php
    // ── Auto-generate a value if none was provided ───────────────────
    $itemValue = $value ?? 'accordion-item-' . \Illuminate\Support\Str::random(6);

    $isDisabled = (bool) $disabled;

    // ── Separated variant gets its own card-like styling ─────────────
    // The parent accordion provides variant via Alpine.js x-data
@endphp

<div
    x-data="{ itemValue: @js($itemValue), disabled: @js($isDisabled) }"
    x-bind:data-state="isOpen(itemValue) ? 'open' : 'closed'"
    x-bind:data-disabled="disabled ? '' : undefined"
    x-bind:class="{
        'border border-[oklch(var(--ui-border))] rounded-[var(--ui-radius-lg)] overflow-hidden': variant === 'separated',
    }"
    {{ $attributes }}
    data-ui-accordion-item
>
    {{ $slot }}
</div>
