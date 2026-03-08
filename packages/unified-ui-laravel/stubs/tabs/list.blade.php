{{--
    Unified UI — Tabs List Sub-Component
    https://unified-ui.space

    The container for tab trigger buttons. Renders as a horizontal or
    vertical list depending on the parent tabs orientation, with variant
    styling inherited from the parent context.

    Usage:
        <x-ui-tabs active="overview">
            <x-ui-tabs.list>
                <x-ui-tabs.trigger value="overview">Overview</x-ui-tabs.trigger>
                <x-ui-tabs.trigger value="settings">Settings</x-ui-tabs.trigger>
            </x-ui-tabs.list>
            <x-ui-tabs.content value="overview">…</x-ui-tabs.content>
            <x-ui-tabs.content value="settings">…</x-ui-tabs.content>
        </x-ui-tabs>

        {{-- With custom alignment --}}
        <x-ui-tabs.list justify="center">
            <x-ui-tabs.trigger value="a">A</x-ui-tabs.trigger>
            <x-ui-tabs.trigger value="b">B</x-ui-tabs.trigger>
        </x-ui-tabs.list>

    Props:
        justify — start|center|end|between (default: start) — only applies to horizontal orientation
--}}

@props([
    'justify' => 'start',
])

@php
    // ── Justify classes (horizontal only) ────────────────────────────
    $justifyClasses = match ($justify) {
        'center'  => 'justify-center',
        'end'     => 'justify-end',
        'between' => 'justify-between',
        default   => 'justify-start',
    };

    // ── Base classes shared across variants ───────────────────────────
    $baseClasses = implode(' ', [
        'inline-flex',
        'items-center',
        'gap-1',
        'shrink-0',
    ]);
@endphp

<div
    {{ $attributes->class([$baseClasses]) }}
    x-bind:class="{
        'flex-row {{ $justifyClasses }}': orientation === 'horizontal',
        'flex-col items-stretch': orientation === 'vertical',
        'bg-[oklch(var(--ui-muted))] rounded-[var(--ui-radius-lg)] p-1': variant === 'default',
        'gap-1': variant === 'pills',
        'border-b border-[oklch(var(--ui-border))] gap-0 pb-0': variant === 'underline' && orientation === 'horizontal',
        'border-l border-[oklch(var(--ui-border))] gap-0 pl-0': variant === 'underline' && orientation === 'vertical',
    }"
    role="tablist"
    x-bind:aria-orientation="orientation"
    data-ui-tabs-list
>
    {{ $slot }}
</div>
