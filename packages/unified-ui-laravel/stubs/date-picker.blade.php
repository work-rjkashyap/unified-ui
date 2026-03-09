@props([
    'value'       => null,
    'placeholder' => 'Pick a date',
    'min'         => null,
    'max'         => null,
    'disabled'    => false,
    'name'        => null,
    'size'        => 'md',
    'format'      => 'Y-m-d',
])

@php
    $sizeClasses = match ($size) {
        'sm' => 'h-8 px-3 text-xs',
        'lg' => 'h-10 px-3 text-sm',
        default => 'h-9 px-3 text-sm',
    };
    $triggerClasses = implode(' ', [
        'flex w-full items-center justify-between gap-2',
        'rounded-[var(--ui-radius-md)] border border-[oklch(var(--ui-input))] bg-[oklch(var(--ui-background))]',
        'transition-[border-color,box-shadow] duration-[var(--ui-duration-fast)]',
        'focus:outline-none focus:ring-2 focus:ring-[oklch(var(--ui-ring)/0.2)] focus:border-[oklch(var(--ui-ring))]',
        $disabled ? 'pointer-events-none opacity-50 cursor-not-allowed' : 'cursor-pointer',
        $sizeClasses,
    ]);
@endphp

<div
    x-data="{
        open: false,
        selected: '{{ $value ?? '' }}',
        disabled: {{ $disabled ? 'true' : 'false' }},

        get displayValue() {
            if (!this.selected) return '';
            const d = new Date(this.selected + 'T00:00:00');
            return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        },

        onCalendarChange(e) {
            this.selected = e.detail.date;
            this.open = false;
            this.$dispatch('date-picker-change', { date: this.selected });
        },
    }"
    x-on:click.outside="open = false"
    x-on:keydown.escape="open = false"
    x-on:calendar-change.stop="onCalendarChange($event)"
    class="relative w-full"
    {{ $attributes->except(['class']) }}
    data-ui-date-picker
>
    {{-- Trigger --}}
    <button
        type="button"
        x-on:click="if (!disabled) open = !open"
        :aria-expanded="open.toString()"
        :disabled="disabled"
        class="{{ $triggerClasses }}"
    >
        <span
            x-text="displayValue || '{{ $placeholder }}'"
            :class="selected ? 'text-[oklch(var(--ui-foreground))]' : 'text-[oklch(var(--ui-muted-foreground))]'"
        ></span>
        <svg class="h-4 w-4 shrink-0 text-[oklch(var(--ui-muted-foreground))]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
    </button>

    {{-- Calendar dropdown --}}
    <div
        x-show="open"
        x-cloak
        x-transition:enter="transition ease-[var(--ui-ease-out)] duration-[var(--ui-duration-normal)] origin-top"
        x-transition:enter-start="opacity-0 translate-y-1 scale-95"
        x-transition:enter-end="opacity-100 translate-y-0 scale-100"
        x-transition:leave="transition ease-[var(--ui-ease-in)] duration-[var(--ui-duration-fast)] origin-top"
        x-transition:leave-start="opacity-100 translate-y-0 scale-100"
        x-transition:leave-end="opacity-0 translate-y-1 scale-95"
        class="absolute top-full left-0 z-[var(--ui-z-dropdown,50)] mt-1"
    >
        <x-calendar
            :value="$value"
            :min="$min"
            :max="$max"
            :disabled="$disabled"
        />
    </div>

    @if($name)
        <input type="hidden" name="{{ $name }}" :value="selected" />
    @endif
</div>
