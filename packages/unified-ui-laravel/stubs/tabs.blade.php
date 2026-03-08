{{--
    Unified UI — Tabs Component
    https://unified-ui.space

    An accessible tabbed interface powered by Alpine.js with horizontal
    and vertical orientation, variant styles, and keyboard navigation.

    Usage:
        {{-- Basic tabs --}}
        <x-ui-tabs active="overview">
            <x-ui-tabs.list>
                <x-ui-tabs.trigger value="overview">Overview</x-ui-tabs.trigger>
                <x-ui-tabs.trigger value="settings">Settings</x-ui-tabs.trigger>
            </x-ui-tabs.list>
            <x-ui-tabs.content value="overview">Overview content here.</x-ui-tabs.content>
            <x-ui-tabs.content value="settings">Settings content here.</x-ui-tabs.content>
        </x-ui-tabs>

        {{-- Vertical orientation --}}
        <x-ui-tabs active="tab1" orientation="vertical">
            <x-ui-tabs.list>
                <x-ui-tabs.trigger value="tab1">Tab 1</x-ui-tabs.trigger>
                <x-ui-tabs.trigger value="tab2">Tab 2</x-ui-tabs.trigger>
            </x-ui-tabs.list>
            <x-ui-tabs.content value="tab1">Content 1</x-ui-tabs.content>
            <x-ui-tabs.content value="tab2">Content 2</x-ui-tabs.content>
        </x-ui-tabs>

        {{-- Variant styles --}}
        <x-ui-tabs active="a" variant="pills">...</x-ui-tabs>
        <x-ui-tabs active="a" variant="underline">...</x-ui-tabs>

    Props:
        active      — the value of the initially active tab (required)
        orientation — horizontal|vertical (default: horizontal)
        variant     — default|pills|underline (default: default)
--}}

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
