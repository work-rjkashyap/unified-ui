@props([
    'active' => '',
    'orientation' => 'horizontal',
    'variant' => 'default',
])

@php
    $isVertical = $orientation === 'vertical';

    // ── Layout classes ───────────────────────────────────────────────
    $layoutClasses = $isVertical
        ? 'flex flex-row gap-4'
        : 'flex flex-col gap-3';
@endphp

<div
    x-data="{
        activeTab: @js($active),
        orientation: @js($orientation),
        variant: @js($variant),
        select(value) {
            this.activeTab = value;
        },
        isActive(value) {
            return this.activeTab === value;
        }
    }"
    {{ $attributes->class([$layoutClasses]) }}
    data-ui-tabs
    data-ui-tabs-orientation="{{ $orientation }}"
    data-ui-tabs-variant="{{ $variant }}"
>
    {{ $slot }}
</div>
