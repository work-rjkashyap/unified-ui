@props([
    'value'   => 0,
    'min'     => null,
    'max'     => null,
    'step'    => 1,
    'variant' => 'default',
    'size'    => 'md',
    'disabled'=> false,
    'label'   => 'Number',
    'name'    => null,
    'id'      => null,
])

@php
    $sizeClasses = match ($size) {
        'sm' => 'h-8 text-xs',
        'lg' => 'h-10 text-sm',
        default => 'h-9 text-sm',
    };
    $btnWidth = match ($size) {
        'sm' => 'w-7',
        'lg' => 'w-9',
        default => 'w-8',
    };
    $iconSize = match ($size) {
        'sm' => 'h-3 w-3',
        'lg' => 'h-4 w-4',
        default => 'h-3.5 w-3.5',
    };
    $variantClasses = match ($variant) {
        'primary' => 'border-[oklch(var(--ui-primary)/0.4)] focus-within:border-[oklch(var(--ui-primary))] focus-within:ring-[oklch(var(--ui-primary)/0.2)]',
        default   => 'border-[oklch(var(--ui-input))] focus-within:border-[oklch(var(--ui-ring))] focus-within:ring-[oklch(var(--ui-ring)/0.2)]',
    };
    $containerClasses = implode(' ', [
        'inline-flex items-stretch overflow-hidden',
        'rounded-[var(--ui-radius-md)] border bg-[oklch(var(--ui-background))]',
        'transition-[border-color,box-shadow] duration-[var(--ui-duration-fast)]',
        'focus-within:ring-2',
        $disabled ? 'pointer-events-none opacity-50' : '',
        $sizeClasses,
        $variantClasses,
    ]);
    $btnClasses = implode(' ', [
        'inline-flex items-center justify-center shrink-0',
        'bg-transparent text-[oklch(var(--ui-muted-foreground))]',
        'hover:text-[oklch(var(--ui-foreground))] hover:bg-[oklch(var(--ui-accent))]',
        'active:bg-[oklch(var(--ui-accent)/0.8)]',
        'transition-colors duration-[var(--ui-duration-fast)]',
        'disabled:pointer-events-none disabled:opacity-40 select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[oklch(var(--ui-ring))]',
        $btnWidth,
    ]);
@endphp

<div
    x-data="{
        value:    {{ is_numeric($value) ? $value : 0 }},
        min:      {{ $min !== null ? $min : 'null' }},
        max:      {{ $max !== null ? $max : 'null' }},
        step:     {{ $step }},
        disabled: {{ $disabled ? 'true' : 'false' }},

        clamp(v) {
            if (this.min !== null) v = Math.max(this.min, v);
            if (this.max !== null) v = Math.min(this.max, v);
            return v;
        },
        increment(multiplier = 1) {
            if (this.disabled) return;
            this.value = this.clamp(this.value + this.step * multiplier);
            this.$dispatch('number-input-change', { value: this.value });
        },
        decrement(multiplier = 1) {
            if (this.disabled) return;
            this.value = this.clamp(this.value - this.step * multiplier);
            this.$dispatch('number-input-change', { value: this.value });
        },
        onKeyDown(e) {
            const mult = e.shiftKey ? 10 : 1;
            if (e.key === 'ArrowUp')   { e.preventDefault(); this.increment(mult); }
            if (e.key === 'ArrowDown') { e.preventDefault(); this.decrement(mult); }
            if (e.key === 'Home' && this.min !== null) { e.preventDefault(); this.value = this.min; }
            if (e.key === 'End'  && this.max !== null) { e.preventDefault(); this.value = this.max; }
        },
        onBlur(e) {
            const v = parseFloat(e.target.value);
            this.value = isNaN(v) ? (this.min ?? 0) : this.clamp(v);
        },
        get isAtMin() { return this.min !== null && this.value <= this.min; },
        get isAtMax() { return this.max !== null && this.value >= this.max; },
    }"
    {{ $attributes->class([$containerClasses]) }}
    role="spinbutton"
    :aria-valuenow="value"
    @if($min !== null) aria-valuemin="{{ $min }}" @endif
    @if($max !== null) aria-valuemax="{{ $max }}" @endif
    aria-label="{{ $label }}"
    data-ui-number-input
    data-ui-number-input-variant="{{ $variant }}"
    data-ui-number-input-size="{{ $size }}"
>
    {{-- Decrement --}}
    <button
        type="button"
        x-on:click="decrement()"
        :disabled="disabled || isAtMin"
        class="{{ $btnClasses }} border-r border-[oklch(var(--ui-border))]"
        aria-label="Decrease"
        tabindex="-1"
    >
        <svg class="{{ $iconSize }}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/></svg>
    </button>

    {{-- Input --}}
    <input
        @if($name) name="{{ $name }}" @endif
        @if($id) id="{{ $id }}" @endif
        type="text"
        inputmode="numeric"
        x-model="value"
        x-on:keydown="onKeyDown($event)"
        x-on:blur="onBlur($event)"
        :disabled="disabled"
        class="flex-1 h-full bg-transparent text-center outline-none text-[oklch(var(--ui-foreground))] tabular-nums"
        autocomplete="off"
    />

    {{-- Increment --}}
    <button
        type="button"
        x-on:click="increment()"
        :disabled="disabled || isAtMax"
        class="{{ $btnClasses }} border-l border-[oklch(var(--ui-border))]"
        aria-label="Increase"
        tabindex="-1"
    >
        <svg class="{{ $iconSize }}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
    </button>
</div>
