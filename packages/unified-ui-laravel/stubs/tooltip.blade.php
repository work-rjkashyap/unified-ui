{{--
    Unified UI — Tooltip Component
    https://unified-ui.space

    A lightweight tooltip that appears on hover or focus, powered by Alpine.js.
    Supports multiple positions, custom content via slot, and design token styling.

    Usage:
        {{-- Basic tooltip --}}
        <x-ui-tooltip content="This is a tooltip">
            <button>Hover me</button>
        </x-ui-tooltip>

        {{-- Positions --}}
        <x-ui-tooltip content="Top tooltip" position="top">
            <button>Top</button>
        </x-ui-tooltip>
        <x-ui-tooltip content="Bottom tooltip" position="bottom">
            <button>Bottom</button>
        </x-ui-tooltip>
        <x-ui-tooltip content="Left tooltip" position="left">
            <button>Left</button>
        </x-ui-tooltip>
        <x-ui-tooltip content="Right tooltip" position="right">
            <button>Right</button>
        </x-ui-tooltip>

        {{-- With rich content via slot --}}
        <x-ui-tooltip>
            <x-slot:tooltip>
                <strong>Bold</strong> and <em>italic</em> content.
            </x-slot:tooltip>
            <button>Rich tooltip</button>
        </x-ui-tooltip>

        {{-- With delay --}}
        <x-ui-tooltip content="Delayed tooltip" :delay="500">
            <button>Slow hover</button>
        </x-ui-tooltip>

        {{-- Disabled (no tooltip shown) --}}
        <x-ui-tooltip content="Won't show" disabled>
            <button>No tooltip</button>
        </x-ui-tooltip>

        {{-- Custom offset --}}
        <x-ui-tooltip content="Offset tooltip" :offset="12">
            <button>Offset</button>
        </x-ui-tooltip>

        {{-- Arrow --}}
        <x-ui-tooltip content="With arrow" arrow>
            <button>Arrow</button>
        </x-ui-tooltip>

    Props:
        content   — tooltip text content (alternative to the tooltip slot)
        position  — top|bottom|left|right (default: top)
        delay     — delay in ms before showing the tooltip (default: 200)
        duration  — hide delay in ms after mouse leaves (default: 0)
        offset    — pixel distance between trigger and tooltip (default: 8)
        disabled  — boolean, prevents tooltip from appearing (default: false)
        arrow     — boolean, renders a small arrow pointing to the trigger (default: false)
        maxWidth  — max-width CSS value for the tooltip panel (default: 200px)
        id        — optional explicit id for ARIA association
--}}

@props([
    'content' => null,
    'position' => 'top',
    'delay' => 200,
    'duration' => 0,
    'offset' => 8,
    'disabled' => false,
    'arrow' => false,
    'maxWidth' => '200px',
    'id' => null,
])

@php
    $tooltipId = $id ?? 'ui-tooltip-' . \Illuminate\Support\Str::random(6);

    // ── Position classes ─────────────────────────────────────────────
    $positionClasses = match ($position) {
        'bottom' => 'top-full left-1/2 -translate-x-1/2',
        'left'   => 'right-full top-1/2 -translate-y-1/2',
        'right'  => 'left-full top-1/2 -translate-y-1/2',
        default  => 'bottom-full left-1/2 -translate-x-1/2',  // top
    };

    // ── Offset margin ────────────────────────────────────────────────
    $offsetStyle = match ($position) {
        'bottom' => "margin-top: {$offset}px;",
        'left'   => "margin-right: {$offset}px;",
        'right'  => "margin-left: {$offset}px;",
        default  => "margin-bottom: {$offset}px;",  // top
    };

    // ── Arrow classes ────────────────────────────────────────────────
    $arrowPositionClasses = match ($position) {
        'bottom' => 'bottom-full left-1/2 -translate-x-1/2 border-b-[oklch(var(--ui-popover))] border-t-transparent border-l-transparent border-r-transparent',
        'left'   => 'left-full top-1/2 -translate-y-1/2 border-l-[oklch(var(--ui-popover))] border-t-transparent border-b-transparent border-r-transparent',
        'right'  => 'right-full top-1/2 -translate-y-1/2 border-r-[oklch(var(--ui-popover))] border-t-transparent border-b-transparent border-l-transparent',
        default  => 'top-full left-1/2 -translate-x-1/2 border-t-[oklch(var(--ui-popover))] border-b-transparent border-l-transparent border-r-transparent',
    };

    // ── Enter/Leave animation origin ─────────────────────────────────
    $enterStart = match ($position) {
        'bottom' => 'opacity-0 translate-y-1',
        'left'   => 'opacity-0 -translate-x-1',
        'right'  => 'opacity-0 translate-x-1',
        default  => 'opacity-0 -translate-y-1',
    };

    // ── Tooltip panel classes ────────────────────────────────────────
    $panelClasses = implode(' ', [
        'absolute',
        'z-[var(--ui-z-tooltip)]',
        $positionClasses,
        'px-2.5 py-1.5',
        'text-xs',
        'font-medium',
        'leading-normal',
        'whitespace-normal',
        'break-words',
        'rounded-[var(--ui-radius-md)]',
        'bg-[oklch(var(--ui-popover))]',
        'text-[oklch(var(--ui-popover-foreground))]',
        'border',
        'border-[oklch(var(--ui-border))]',
        'shadow-md',
        'pointer-events-none',
        'select-none',
    ]);

    $hasContent = $content || isset($tooltip);
@endphp

@if($disabled || !$hasContent)
    {{-- When disabled or no content, just render the trigger slot --}}
    {{ $slot }}
@else
    <span
        x-data="{
            show: false,
            timeout: null,
            open() {
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => { this.show = true; }, {{ (int) $delay }});
            },
            close() {
                clearTimeout(this.timeout);
                @if((int) $duration > 0)
                    this.timeout = setTimeout(() => { this.show = false; }, {{ (int) $duration }});
                @else
                    this.show = false;
                @endif
            }
        }"
        x-on:mouseenter="open()"
        x-on:mouseleave="close()"
        x-on:focusin="open()"
        x-on:focusout="close()"
        x-on:keydown.escape.window="show = false"
        class="relative inline-flex"
        data-ui-tooltip
    >
        {{-- Trigger element --}}
        <span aria-describedby="{{ $tooltipId }}">
            {{ $slot }}
        </span>

        {{-- Tooltip panel --}}
        <span
            x-show="show"
            x-cloak
            x-transition:enter="transition ease-out duration-[var(--ui-duration-fast)]"
            x-transition:enter-start="{{ $enterStart }}"
            x-transition:enter-end="opacity-100 translate-x-0 translate-y-0"
            x-transition:leave="transition ease-in duration-[var(--ui-duration-fast)]"
            x-transition:leave-start="opacity-100 translate-x-0 translate-y-0"
            x-transition:leave-end="{{ $enterStart }}"
            id="{{ $tooltipId }}"
            role="tooltip"
            class="{{ $panelClasses }}"
            style="{{ $offsetStyle }} max-width: {{ $maxWidth }};"
        >
            {{-- Arrow --}}
            @if($arrow)
                <span
                    class="absolute border-4 {{ $arrowPositionClasses }}"
                    aria-hidden="true"
                ></span>
            @endif

            {{-- Content --}}
            @if(isset($tooltip))
                {{ $tooltip }}
            @else
                {{ $content }}
            @endif
        </span>
    </span>
@endif
