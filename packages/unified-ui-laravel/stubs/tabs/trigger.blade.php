@props([
    'value' => '',
    'disabled' => false,
])

@php
    $isDisabled = (bool) $disabled;

    // ── Base classes (shared across all variants) ─────────────────────
    $baseClasses = implode(' ', [
        'inline-flex',
        'items-center',
        'justify-center',
        'gap-2',
        'whitespace-nowrap',
        'text-sm',
        'font-medium',
        'leading-none',
        'select-none',
        'outline-none',
        'transition-all',
        'duration-[var(--ui-duration-fast)]',
        'ease-[var(--ui-ease-default)]',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-[oklch(var(--ui-ring))]',
        'focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[oklch(var(--ui-background))]',
        'disabled:pointer-events-none',
        'disabled:opacity-50',
    ]);
@endphp

<button
    type="button"
    role="tab"
    x-on:click="select(@js($value))"
    x-bind:aria-selected="isActive(@js($value)).toString()"
    x-bind:tabindex="isActive(@js($value)) ? '0' : '-1'"
    x-bind:data-state="isActive(@js($value)) ? 'active' : 'inactive'"
    x-on:keydown.arrow-right.prevent="$el.nextElementSibling?.focus(); $el.nextElementSibling?.click()"
    x-on:keydown.arrow-left.prevent="$el.previousElementSibling?.focus(); $el.previousElementSibling?.click()"
    x-on:keydown.arrow-down.prevent="$el.nextElementSibling?.focus(); $el.nextElementSibling?.click()"
    x-on:keydown.arrow-up.prevent="$el.previousElementSibling?.focus(); $el.previousElementSibling?.click()"
    x-on:keydown.home.prevent="$el.parentElement?.firstElementChild?.focus(); $el.parentElement?.firstElementChild?.click()"
    x-on:keydown.end.prevent="$el.parentElement?.lastElementChild?.focus(); $el.parentElement?.lastElementChild?.click()"
    x-bind:class="{
        'px-3 py-1.5 rounded-[var(--ui-radius-md)] text-[oklch(var(--ui-muted-foreground))]': variant === 'default' && !isActive(@js($value)),
        'px-3 py-1.5 rounded-[var(--ui-radius-md)] bg-[oklch(var(--ui-background))] text-[oklch(var(--ui-foreground))] shadow-sm': variant === 'default' && isActive(@js($value)),

        'px-3 py-1.5 rounded-[var(--ui-radius-md)] text-[oklch(var(--ui-muted-foreground))] hover:text-[oklch(var(--ui-foreground))] hover:bg-[oklch(var(--ui-muted)/0.5)]': variant === 'pills' && !isActive(@js($value)),
        'px-3 py-1.5 rounded-[var(--ui-radius-md)] bg-[oklch(var(--ui-primary))] text-[oklch(var(--ui-primary-foreground))] shadow-sm': variant === 'pills' && isActive(@js($value)),

        'px-3 py-2 border-b-2 border-transparent text-[oklch(var(--ui-muted-foreground))] hover:text-[oklch(var(--ui-foreground))] hover:border-[oklch(var(--ui-border))] -mb-px': variant === 'underline' && orientation === 'horizontal' && !isActive(@js($value)),
        'px-3 py-2 border-b-2 border-[oklch(var(--ui-primary))] text-[oklch(var(--ui-foreground))] -mb-px': variant === 'underline' && orientation === 'horizontal' && isActive(@js($value)),

        'px-3 py-2 border-l-2 border-transparent text-[oklch(var(--ui-muted-foreground))] hover:text-[oklch(var(--ui-foreground))] hover:border-[oklch(var(--ui-border))] -ml-px': variant === 'underline' && orientation === 'vertical' && !isActive(@js($value)),
        'px-3 py-2 border-l-2 border-[oklch(var(--ui-primary))] text-[oklch(var(--ui-foreground))] -ml-px': variant === 'underline' && orientation === 'vertical' && isActive(@js($value)),
    }"
    @if($isDisabled) disabled aria-disabled="true" @endif
    {{ $attributes->class([$baseClasses]) }}
    data-ui-tabs-trigger
>
    {{ $slot }}
</button>
