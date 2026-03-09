@props([
    'text'            => '',
    'variant'         => 'default',
    'size'            => 'md',
    'tooltip'         => 'Copy',
    'successDuration' => 2000,
])

@php
    $sizeClasses = match ($size) {
        'sm' => 'h-7 w-7',
        'lg' => 'h-9 w-9',
        default => 'h-8 w-8',
    };
    $iconSize = match ($size) {
        'sm' => 'h-3 w-3',
        'lg' => 'h-4 w-4',
        default => 'h-3.5 w-3.5',
    };
    $variantClasses = match ($variant) {
        'ghost' => 'border-transparent bg-transparent text-[oklch(var(--ui-muted-foreground))] hover:text-[oklch(var(--ui-foreground))] hover:bg-[oklch(var(--ui-accent))]',
        default => 'bg-[oklch(var(--ui-background))] border-[oklch(var(--ui-border))] text-[oklch(var(--ui-muted-foreground))] hover:text-[oklch(var(--ui-foreground))] hover:bg-[oklch(var(--ui-accent))]',
    };
    $baseClasses = implode(' ', [
        'relative inline-flex items-center justify-center rounded-[var(--ui-radius-md)] border font-medium',
        'transition-colors duration-[var(--ui-duration-fast)]',
        'disabled:pointer-events-none disabled:opacity-50 select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--ui-ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(var(--ui-background))]',
        $sizeClasses,
        $variantClasses,
    ]);
@endphp

<div
    x-data="{
        copied: false,
        showTooltip: false,
        text: @js($text),
        successDuration: {{ $successDuration }},

        async copy() {
            try {
                await navigator.clipboard.writeText(this.text);
                this.copied = true;
                this.$dispatch('copy-button:copied', { text: this.text });
                setTimeout(() => { this.copied = false; }, this.successDuration);
            } catch(e) {
                this.$dispatch('copy-button:error', { error: e });
            }
        },
    }"
    class="relative inline-flex"
    data-ui-copy-button
>
    {{-- Tooltip --}}
    <div
        x-show="showTooltip"
        x-transition:enter="transition ease-out duration-[var(--ui-duration-fast)]"
        x-transition:enter-start="opacity-0 scale-95"
        x-transition:enter-end="opacity-100 scale-100"
        x-transition:leave="transition ease-in duration-[var(--ui-duration-fast)]"
        x-transition:leave-start="opacity-100 scale-100"
        x-transition:leave-end="opacity-0 scale-95"
        class="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-[var(--ui-radius-sm)] bg-[oklch(var(--ui-foreground))] text-[oklch(var(--ui-background))] text-xs font-medium whitespace-nowrap pointer-events-none z-[var(--ui-z-tooltip)]"
        aria-hidden="true"
    >
        <span x-text="copied ? 'Copied!' : '{{ $tooltip }}'"></span>
        <span class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[oklch(var(--ui-foreground))]"></span>
    </div>

    <button
        type="button"
        x-on:click="copy()"
        x-on:mouseenter="showTooltip = true"
        x-on:mouseleave="showTooltip = false"
        x-on:focus="showTooltip = true"
        x-on:blur="showTooltip = false"
        :aria-label="copied ? 'Copied!' : '{{ $tooltip }}'"
        :data-ui-copied="copied ? '' : null"
        class="{{ $baseClasses }}"
    >
        {{-- Copy icon --}}
        <template x-if="!copied">
            <svg class="{{ $iconSize }}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        </template>
        {{-- Check icon --}}
        <template x-if="copied">
            <svg class="{{ $iconSize }} text-[oklch(var(--ui-success))]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
        </template>
    </button>
</div>
