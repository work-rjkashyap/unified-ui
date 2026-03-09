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
