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
