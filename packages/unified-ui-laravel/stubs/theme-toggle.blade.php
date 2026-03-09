@props([
    'size'    => 'md',
    'variant' => 'ghost',
])

@php
    $sizeClasses = match ($size) {
        'sm' => 'h-8 w-8',
        'lg' => 'h-10 w-10',
        default => 'h-9 w-9',
    };
    $iconSize = match ($size) {
        'sm' => 'h-3.5 w-3.5',
        'lg' => 'h-5 w-5',
        default => 'h-4 w-4',
    };
    $variantClasses = match ($variant) {
        'outline' => 'border border-[oklch(var(--ui-border))] bg-[oklch(var(--ui-background))] text-[oklch(var(--ui-foreground))] hover:bg-[oklch(var(--ui-accent))]',
        default   => 'bg-transparent text-[oklch(var(--ui-foreground))] hover:bg-[oklch(var(--ui-accent))]',
    };
    $btnClasses = implode(' ', [
        'inline-flex items-center justify-center rounded-[var(--ui-radius-md)]',
        'transition-colors duration-[var(--ui-duration-fast)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--ui-ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(var(--ui-background))]',
        'select-none cursor-pointer',
        $sizeClasses,
        $variantClasses,
    ]);
@endphp

{{--
    ThemeToggle — dark/light/system theme switcher.

    Add this attribute to your <html> element for it to work:
        x-bind:class="theme === 'dark' ? 'dark' : ''"
    Or use your preferred Tailwind dark mode strategy.
--}}

<div
    x-data="{
        theme: localStorage.getItem('theme') ?? 'system',

        init() {
            this.applyTheme();
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                if (this.theme === 'system') this.applyTheme();
            });
        },

        applyTheme() {
            const dark = this.theme === 'dark'
                || (this.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
            document.documentElement.classList.toggle('dark', dark);
        },

        toggle() {
            const order = ['light', 'dark', 'system'];
            const idx = order.indexOf(this.theme);
            this.theme = order[(idx + 1) % order.length];
            localStorage.setItem('theme', this.theme);
            this.applyTheme();
            this.$dispatch('theme-change', { theme: this.theme });
        },

        get isDark() {
            return this.theme === 'dark'
                || (this.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        },
    }"
    data-ui-theme-toggle
>
    <button
        type="button"
        x-on:click="toggle()"
        :title="'Current theme: ' + theme + '. Click to switch.'"
        :aria-label="'Current theme: ' + theme + '. Click to switch.'"
        class="{{ $btnClasses }}"
    >
        {{-- Sun icon (shown in light mode) --}}
        <template x-if="!isDark">
            <svg class="{{ $iconSize }}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
        </template>
        {{-- Moon icon (shown in dark mode) --}}
        <template x-if="isDark">
            <svg class="{{ $iconSize }}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        </template>
    </button>
</div>
