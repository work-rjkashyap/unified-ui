{{--
    Unified UI — Collapsible Component
    https://unified-ui.space

    An Alpine.js powered expandable/collapsible content section.
    Useful for toggling visibility of supplementary content, FAQs,
    and progressive disclosure patterns.

    Usage:
        {{-- Basic collapsible --}}
        <x-ui-collapsible>
            <x-slot:trigger>
                <button type="button">Toggle content</button>
            </x-slot:trigger>
            <p>This content can be shown or hidden.</p>
        </x-ui-collapsible>

        {{-- Default open --}}
        <x-ui-collapsible :open="true">
            <x-slot:trigger>
                <button type="button">Details</button>
            </x-slot:trigger>
            <p>Visible by default, can be collapsed.</p>
        </x-ui-collapsible>

        {{-- Disabled --}}
        <x-ui-collapsible disabled>
            <x-slot:trigger>
                <button type="button" disabled>Cannot toggle</button>
            </x-slot:trigger>
            <p>This content is locked.</p>
        </x-ui-collapsible>

        {{-- With animation --}}
        <x-ui-collapsible animated>
            <x-slot:trigger>
                <button type="button">Animated reveal</button>
            </x-slot:trigger>
            <p>Smoothly transitions open and closed.</p>
        </x-ui-collapsible>

        {{-- Styled variant --}}
        <x-ui-collapsible variant="bordered">
            <x-slot:trigger>
                <span class="font-medium">Show more</span>
            </x-slot:trigger>
            <p>Bordered collapsible section content.</p>
        </x-ui-collapsible>

    Props:
        open     — boolean, initial open state (default: false)
        disabled — boolean, prevents toggling (default: false)
        animated — boolean, enables smooth height transition (default: true)
        variant  — default|bordered|ghost (default: default)
--}}

@props([
    'open' => false,
    'disabled' => false,
    'animated' => true,
    'variant' => 'default',
])

@php
    // ── Variant classes ──────────────────────────────────────────────
    $wrapperClasses = match ($variant) {
        'bordered' => implode(' ', [
            'border',
            'border-[oklch(var(--ui-border))]',
            'rounded-[var(--ui-radius-lg)]',
            'overflow-hidden',
        ]),
        'ghost' => '',
        default => '',
    };

    // ── Content padding by variant ───────────────────────────────────
    $contentClasses = match ($variant) {
        'bordered' => 'px-4 pb-4',
        default => 'pt-1.5',
    };

    // ── Trigger wrapper padding by variant ───────────────────────────
    $triggerWrapperClasses = match ($variant) {
        'bordered' => 'px-4 py-3',
        default => '',
    };
@endphp

<div
    x-data="{
        open: @js((bool) $open),
        disabled: @js((bool) $disabled),
        toggle() {
            if (this.disabled) return;
            this.open = !this.open;
        }
    }"
    {{ $attributes->class([$wrapperClasses]) }}
    data-ui-collapsible
    x-bind:data-state="open ? 'open' : 'closed'"
>
    {{-- Trigger --}}
    <div
        class="{{ $triggerWrapperClasses }} flex items-center"
        x-on:click="toggle()"
        x-bind:aria-expanded="open.toString()"
        x-bind:aria-disabled="disabled.toString()"
        role="button"
        tabindex="0"
        x-on:keydown.enter.prevent="toggle()"
        x-on:keydown.space.prevent="toggle()"
        @if($disabled) aria-disabled="true" @endif
        data-ui-collapsible-trigger
    >
        {{ $trigger }}
    </div>

    {{-- Content --}}
    @if($animated)
        <div
            x-show="open"
            x-collapse
            x-cloak
            data-ui-collapsible-content
        >
            <div class="{{ $contentClasses }}">
                {{ $slot }}
            </div>
        </div>
    @else
        <div
            x-show="open"
            x-cloak
            data-ui-collapsible-content
        >
            <div class="{{ $contentClasses }}">
                {{ $slot }}
            </div>
        </div>
    @endif
</div>
