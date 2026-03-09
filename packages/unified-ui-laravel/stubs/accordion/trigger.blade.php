@php
    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'flex',
        'items-center',
        'justify-between',
        'w-full',
        'gap-3',
        'py-4',
        'px-0',
        'text-sm',
        'font-medium',
        'leading-tight',
        'text-left',
        'text-[oklch(var(--ui-foreground))]',
        'select-none',
        'cursor-pointer',
        'transition-all',
        'duration-[var(--ui-duration-normal)]',
        'ease-[var(--ui-ease-default)]',
        'hover:underline',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-[oklch(var(--ui-ring))]',
        'focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[oklch(var(--ui-background))]',
        'disabled:pointer-events-none',
        'disabled:opacity-50',
    ]);

    // ── Padded variants get horizontal padding ───────────────────────
    $paddedClasses = 'px-4';
@endphp

<button
    type="button"
    x-on:click="!disabled && toggle(itemValue)"
    x-bind:aria-expanded="isOpen(itemValue).toString()"
    x-bind:disabled="disabled"
    x-bind:class="{
        'px-4': variant === 'bordered' || variant === 'separated',
    }"
    {{ $attributes->class([$baseClasses]) }}
    data-ui-accordion-trigger
>
    {{-- Trigger content --}}
    <span class="flex items-center gap-2 flex-1 min-w-0">
        @if(isset($icon))
            <span class="shrink-0" aria-hidden="true">
                {{ $icon }}
            </span>
        @endif
        <span class="truncate">{{ $slot }}</span>
    </span>

    {{-- Chevron indicator --}}
    <svg
        class="h-4 w-4 shrink-0 text-[oklch(var(--ui-muted-foreground))] transition-transform duration-[var(--ui-duration-normal)] ease-[var(--ui-ease-default)]"
        x-bind:class="{ 'rotate-180': isOpen(itemValue) }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
    >
        <path d="m6 9 6 6 6-6" />
    </svg>
</button>
