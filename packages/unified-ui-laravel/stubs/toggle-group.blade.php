@props([
    'type'        => 'single',
    'value'       => null,
    'variant'     => 'default',
    'size'        => 'md',
    'orientation' => 'horizontal',
    'disabled'    => false,
])

@php
    // ── Group layout classes ─────────────────────────────────────────
    $groupClasses = implode(' ', [
        'inline-flex items-center gap-1',
        $orientation === 'vertical' ? 'flex-col' : 'flex-row',
    ]);
@endphp

{{--
    ToggleGroup — single or multi-select group of toggle buttons.

    Usage (single):
        <x-toggle-group type="single" :value="$alignment">
            <x-toggle-group-item value="left" aria-label="Align left">L</x-toggle-group-item>
            <x-toggle-group-item value="center">C</x-toggle-group-item>
        </x-toggle-group>

    Usage (multiple):
        <x-toggle-group type="multiple" :value="$formats">
            <x-toggle-group-item value="bold">B</x-toggle-group-item>
            <x-toggle-group-item value="italic">I</x-toggle-group-item>
        </x-toggle-group>
--}}

<div
    x-data="{
        type:     '{{ $type }}',
        variant:  '{{ $variant }}',
        size:     '{{ $size }}',
        disabled: {{ $disabled ? 'true' : 'false' }},
        // Single-select state
        single:   '{{ $type === 'single' && $value ? $value : '' }}',
        // Multi-select state
        multiple: @json($type === 'multiple' && is_array($value) ? $value : []),

        isOn(val) {
            return this.type === 'single'
                ? this.single === val
                : this.multiple.includes(val);
        },

        toggle(val) {
            if (this.disabled) return;
            if (this.type === 'single') {
                this.single = this.single === val ? '' : val;
                this.$dispatch('toggle-group-change', { value: this.single });
            } else {
                const idx = this.multiple.indexOf(val);
                if (idx === -1) this.multiple.push(val);
                else this.multiple.splice(idx, 1);
                this.$dispatch('toggle-group-change', { value: [...this.multiple] });
            }
        },

        itemClasses(val) {
            const on = this.isOn(val);
            const base = {
                default: on
                    ? 'bg-[oklch(var(--ui-secondary))] text-[oklch(var(--ui-foreground))]'
                    : 'bg-transparent text-[oklch(var(--ui-muted-foreground))] hover:bg-[oklch(var(--ui-muted))] hover:text-[oklch(var(--ui-foreground))]',
                outline: on
                    ? 'bg-[oklch(var(--ui-secondary))] border-[oklch(var(--ui-border-strong,var(--ui-border)))] text-[oklch(var(--ui-foreground))]'
                    : 'border border-[oklch(var(--ui-border))] bg-transparent text-[oklch(var(--ui-muted-foreground))] hover:bg-[oklch(var(--ui-muted))] hover:text-[oklch(var(--ui-foreground))]',
                ghost: on
                    ? 'bg-transparent text-[oklch(var(--ui-foreground))]'
                    : 'bg-transparent text-[oklch(var(--ui-muted-foreground))] hover:bg-[oklch(var(--ui-muted))] hover:text-[oklch(var(--ui-foreground))]',
            }[this.variant] ?? '';
            const sizes = { sm: 'h-8 px-2 text-xs', md: 'h-9 px-3 text-sm', lg: 'h-10 px-4 text-sm' };
            return base + ' ' + (sizes[this.size] ?? sizes.md);
        },
    }"
    role="{{ $type === 'single' ? 'radiogroup' : 'group' }}"
    @if($disabled) aria-disabled="true" @endif
    {{ $attributes->class([$groupClasses]) }}
    data-ui-toggle-group
    data-ui-toggle-group-type="{{ $type }}"
    data-ui-toggle-group-variant="{{ $variant }}"
    data-ui-toggle-group-orientation="{{ $orientation }}"
>
    {{ $slot }}
</div>
