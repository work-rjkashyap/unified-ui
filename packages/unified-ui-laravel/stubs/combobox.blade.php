@props([
    'options'      => [],
    'value'        => null,
    'multiple'     => false,
    'placeholder'  => 'Select an option…',
    'searchPlaceholder' => 'Search…',
    'empty'        => 'No results found.',
    'variant'      => 'default',
    'size'         => 'md',
    'disabled'     => false,
    'clearable'    => false,
    'name'         => null,
])

@php
    $sizeClasses = match ($size) {
        'sm' => 'h-8 px-3 text-xs',
        'lg' => 'h-10 px-3 text-sm',
        default => 'h-9 px-3 text-sm',
    };
    $variantClasses = match ($variant) {
        'primary' => 'border-[oklch(var(--ui-primary)/0.4)]',
        default   => 'border-[oklch(var(--ui-input))]',
    };
    $triggerClasses = implode(' ', [
        'flex w-full items-center justify-between gap-2',
        'rounded-[var(--ui-radius-md)] border bg-[oklch(var(--ui-background))]',
        'text-[oklch(var(--ui-foreground))]',
        'transition-[border-color,box-shadow] duration-[var(--ui-duration-fast)]',
        'focus:outline-none focus:ring-2 focus:ring-[oklch(var(--ui-ring)/0.2)] focus:border-[oklch(var(--ui-ring))]',
        $disabled ? 'pointer-events-none opacity-50 cursor-not-allowed' : 'cursor-pointer',
        $sizeClasses,
        $variantClasses,
    ]);
@endphp

<div
    x-data="{
        open: false,
        query: '',
        multiple: {{ $multiple ? 'true' : 'false' }},
        disabled: {{ $disabled ? 'true' : 'false' }},
        options: @json($options),
        // single
        single: @json($value),
        // multi
        selected: @json($multiple && is_array($value) ? $value : []),

        get filtered() {
            if (!this.query.trim()) return this.options;
            const q = this.query.toLowerCase();
            return this.options.filter(o => (o.label ?? o).toString().toLowerCase().includes(q));
        },

        isSelected(val) {
            return this.multiple ? this.selected.includes(val) : this.single === val;
        },

        select(option) {
            const val = option.value ?? option;
            const lbl = option.label ?? option;
            if (this.multiple) {
                const idx = this.selected.indexOf(val);
                if (idx === -1) this.selected.push(val);
                else this.selected.splice(idx, 1);
                this.$dispatch('combobox-change', { value: [...this.selected] });
            } else {
                this.single = val;
                this.open = false;
                this.$dispatch('combobox-change', { value: val, label: lbl });
            }
        },

        clear() {
            if (this.multiple) { this.selected = []; }
            else { this.single = null; }
            this.$dispatch('combobox-change', { value: this.multiple ? [] : null });
        },

        get displayLabel() {
            if (this.multiple) {
                if (!this.selected.length) return '';
                return this.selected.length + ' selected';
            }
            const opt = this.options.find(o => (o.value ?? o) === this.single);
            return opt ? (opt.label ?? opt) : '';
        },

        get hasValue() {
            return this.multiple ? this.selected.length > 0 : this.single !== null && this.single !== '';
        },
    }"
    x-on:click.outside="open = false"
    x-on:keydown.escape="open = false"
    class="relative w-full"
    {{ $attributes->except(['class']) }}
    data-ui-combobox
>
    {{-- Trigger button --}}
    <button
        type="button"
        x-on:click="if (!disabled) open = !open"
        :aria-expanded="open.toString()"
        aria-haspopup="listbox"
        :disabled="disabled"
        class="{{ $triggerClasses }}"
        data-ui-combobox-trigger
    >
        <span
            x-text="hasValue ? displayLabel : '{{ $placeholder }}'"
            :class="hasValue ? 'text-[oklch(var(--ui-foreground))]' : 'text-[oklch(var(--ui-muted-foreground))]'"
            class="truncate"
        ></span>
        <span class="flex items-center gap-1 shrink-0">
            {{-- Clear button --}}
            @if($clearable)
                <template x-if="hasValue">
                    <span
                        x-on:click.stop="clear()"
                        class="text-[oklch(var(--ui-muted-foreground))] hover:text-[oklch(var(--ui-foreground))] cursor-pointer"
                        role="button"
                        aria-label="Clear"
                    >
                        <svg class="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </span>
                </template>
            @endif
            {{-- Chevron --}}
            <svg class="h-4 w-4 text-[oklch(var(--ui-muted-foreground))] transition-transform duration-[var(--ui-duration-fast)]" :class="open ? 'rotate-180' : ''" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </span>
    </button>

    {{-- Dropdown panel --}}
    <div
        x-show="open"
        x-cloak
        x-transition:enter="transition ease-[var(--ui-ease-out)] duration-[var(--ui-duration-normal)] origin-top"
        x-transition:enter-start="opacity-0 scale-95"
        x-transition:enter-end="opacity-100 scale-100"
        x-transition:leave="transition ease-[var(--ui-ease-in)] duration-[var(--ui-duration-fast)] origin-top"
        x-transition:leave-start="opacity-100 scale-100"
        x-transition:leave-end="opacity-0 scale-95"
        class="absolute top-full left-0 z-[var(--ui-z-dropdown,50)] mt-1 w-full rounded-[var(--ui-radius-lg)] border border-[oklch(var(--ui-border))] bg-[oklch(var(--ui-popover))] shadow-[var(--ui-shadow-md)] overflow-hidden"
        role="listbox"
        :aria-multiselectable="multiple.toString()"
    >
        {{-- Search --}}
        <div class="flex items-center gap-2 border-b border-[oklch(var(--ui-border))] px-3">
            <svg class="h-4 w-4 shrink-0 text-[oklch(var(--ui-muted-foreground))]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
                type="text"
                x-model="query"
                x-ref="search"
                x-on:click.stop
                placeholder="{{ $searchPlaceholder }}"
                class="flex h-9 w-full bg-transparent text-sm text-[oklch(var(--ui-foreground))] placeholder:text-[oklch(var(--ui-muted-foreground))] outline-none"
                autocomplete="off"
            />
        </div>

        {{-- Options --}}
        <ul class="max-h-60 overflow-y-auto py-1" role="presentation">
            <template x-for="opt in filtered" :key="opt.value ?? opt">
                <li
                    x-on:click="select(opt)"
                    :aria-selected="isSelected(opt.value ?? opt).toString()"
                    :class="isSelected(opt.value ?? opt) ? 'bg-[oklch(var(--ui-accent))] text-[oklch(var(--ui-accent-foreground))]' : 'text-[oklch(var(--ui-popover-foreground))] hover:bg-[oklch(var(--ui-accent))] hover:text-[oklch(var(--ui-accent-foreground))]'"
                    class="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-3 py-2 text-sm outline-none transition-colors duration-[var(--ui-duration-fast)]"
                    role="option"
                    data-ui-combobox-option
                >
                    {{-- Check --}}
                    <template x-if="isSelected(opt.value ?? opt)">
                        <svg class="h-4 w-4 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
                    </template>
                    <template x-if="!isSelected(opt.value ?? opt)">
                        <span class="h-4 w-4 shrink-0"></span>
                    </template>
                    <span x-text="opt.label ?? opt"></span>
                </li>
            </template>

            {{-- Empty state --}}
            <template x-if="filtered.length === 0">
                <li class="py-6 text-center text-sm text-[oklch(var(--ui-muted-foreground))]">{{ $empty }}</li>
            </template>
        </ul>
    </div>

    {{-- Hidden input for form submission --}}
    @if($name)
        @if($multiple)
            <template x-for="v in selected" :key="v">
                <input type="hidden" name="{{ $name }}[]" :value="v" />
            </template>
        @else
            <input type="hidden" name="{{ $name }}" :value="single ?? ''" />
        @endif
    @endif
</div>
