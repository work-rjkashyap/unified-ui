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
