@props([
    'value'       => '',
    'placeholder' => 'Search...',
    'size'        => 'md',
    'variant'     => 'default',
    'shortcut'    => null,
    'showClear'   => true,
    'loading'     => false,
    'debounce'    => 300,
    'disabled'    => false,
    'name'        => null,
    'id'          => null,
])

@php
    // ── Container classes ────────────────────────────────────────────
    $sizeClasses = match ($size) {
        'sm' => 'h-8 px-3 text-xs',
        'lg' => 'h-10 px-4 text-sm',
        default => 'h-9 px-3 text-sm',
    };

    $variantClasses = match ($variant) {
        'filled' => 'border-transparent bg-[oklch(var(--ui-muted))]',
        default  => 'border-[oklch(var(--ui-input))]',
    };

    $iconSize = match ($size) {
        'sm' => 'h-3.5 w-3.5',
        default => 'h-4 w-4',
    };

    $containerClasses = implode(' ', [
        'flex w-full items-center gap-2',
        'rounded-[var(--ui-radius-md)]',
        'border bg-[oklch(var(--ui-background))]',
        'transition-[border-color,box-shadow] duration-[var(--ui-duration-fast)]',
        'focus-within:border-[oklch(var(--ui-ring))] focus-within:ring-2 focus-within:ring-[oklch(var(--ui-ring)/0.2)]',
        $disabled ? 'pointer-events-none opacity-50' : '',
        $sizeClasses,
        $variantClasses,
    ]);
@endphp

<div
    x-data="{
        value: @js($value),
        loading: {{ $loading ? 'true' : 'false' }},
        debounceTimer: null,
        debounceMs: {{ $debounce }},

        onInput(e) {
            this.value = e.target.value;
            this.$dispatch('search-input-change', { value: this.value });
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                this.$dispatch('search-input-debounced', { value: this.value });
            }, this.debounceMs);
        },

        clear() {
            this.value = '';
            this.$dispatch('search-input-change', { value: '' });
            this.$dispatch('search-input-debounced', { value: '' });
            this.$nextTick(() => this.$refs.input.focus());
        },
    }"
    @if($shortcut)
        x-on:keydown.window="
            if (($event.metaKey || $event.ctrlKey) && $event.key.toLowerCase() === '{{ strtolower($shortcut) }}') {
                $event.preventDefault();
                $refs.input.focus();
            }
        "
    @endif
    {{ $attributes->class([$containerClasses]) }}
    data-ui-search-input
    data-ui-search-input-size="{{ $size }}"
>
    {{-- Leading icon: spinner or search --}}
    <span class="shrink-0 pointer-events-none text-[oklch(var(--ui-muted-foreground))]">
        <template x-if="loading">
            <svg class="{{ $iconSize }} animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        </template>
        <template x-if="!loading">
            <svg class="{{ $iconSize }}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </template>
    </span>

    {{-- Input --}}
    <input
        x-ref="input"
        type="search"
        x-model="value"
        x-on:input="onInput($event)"
        placeholder="{{ $placeholder }}"
        @if($disabled) disabled @endif
        @if($name) name="{{ $name }}" @endif
        @if($id) id="{{ $id }}" @endif
        class="flex-1 h-full bg-transparent outline-none text-[oklch(var(--ui-foreground))] placeholder:text-[oklch(var(--ui-muted-foreground))] [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
        autocomplete="off"
    />

    {{-- Trailing: clear button or shortcut hint --}}
    <div class="flex items-center gap-1 shrink-0">
        {{-- Clear button --}}
        @if($showClear)
            <template x-if="value.length > 0">
                <button
                    type="button"
                    x-on:click="clear()"
                    class="inline-flex items-center justify-center rounded-sm text-[oklch(var(--ui-muted-foreground))] hover:text-[oklch(var(--ui-foreground))] transition-colors duration-[var(--ui-duration-fast)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[oklch(var(--ui-ring))]"
                    aria-label="Clear search"
                >
                    <svg class="{{ $iconSize }}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            </template>
        @endif

        {{-- Keyboard shortcut hint --}}
        @if($shortcut)
            <template x-if="value.length === 0">
                <kbd class="hidden sm:inline-flex items-center gap-0.5 rounded-[var(--ui-radius-sm)] border border-[oklch(var(--ui-border))] bg-[oklch(var(--ui-muted)/0.8)] text-[oklch(var(--ui-muted-foreground))] font-sans font-medium tracking-wide pointer-events-none select-none {{ $size === 'sm' ? 'h-5 px-1 text-[10px]' : 'h-6 px-1.5 text-[11px]' }}">
                    <span class="opacity-70">⌘</span><span>{{ strtoupper($shortcut) }}</span>
                </kbd>
            </template>
        @endif
    </div>
</div>
