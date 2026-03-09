@props([
    'variant' => 'primary',
    'size' => 'md',
    'as' => 'button',
    'type' => 'button',
    'href' => null,
    'loading' => false,
    'disabled' => false,
    'icon' => null,
    'iconRight' => null,
    'fullWidth' => false,
])

@php
    // ── Variant classes ──────────────────────────────────────────────
    $variantClasses = match ($variant) {
        'primary' => implode(' ', [
            'bg-[oklch(var(--ui-primary))]',
            'text-[oklch(var(--ui-primary-foreground))]',
            'hover:bg-[oklch(var(--ui-primary)/0.9)]',
            'active:bg-[oklch(var(--ui-primary)/0.8)]',
            'shadow-sm',
        ]),
        'secondary' => implode(' ', [
            'bg-[oklch(var(--ui-secondary))]',
            'text-[oklch(var(--ui-secondary-foreground))]',
            'hover:bg-[oklch(var(--ui-secondary)/0.8)]',
            'active:bg-[oklch(var(--ui-secondary)/0.7)]',
            'shadow-sm',
        ]),
        'destructive' => implode(' ', [
            'bg-[oklch(var(--ui-destructive))]',
            'text-[oklch(var(--ui-destructive-foreground))]',
            'hover:bg-[oklch(var(--ui-destructive)/0.9)]',
            'active:bg-[oklch(var(--ui-destructive)/0.8)]',
            'shadow-sm',
        ]),
        'outline' => implode(' ', [
            'border',
            'border-[oklch(var(--ui-border))]',
            'bg-transparent',
            'text-[oklch(var(--ui-foreground))]',
            'hover:bg-[oklch(var(--ui-accent))]',
            'hover:text-[oklch(var(--ui-accent-foreground))]',
            'active:bg-[oklch(var(--ui-accent)/0.8)]',
        ]),
        'ghost' => implode(' ', [
            'bg-transparent',
            'text-[oklch(var(--ui-foreground))]',
            'hover:bg-[oklch(var(--ui-accent))]',
            'hover:text-[oklch(var(--ui-accent-foreground))]',
            'active:bg-[oklch(var(--ui-accent)/0.8)]',
        ]),
        'link' => implode(' ', [
            'bg-transparent',
            'text-[oklch(var(--ui-primary))]',
            'underline-offset-4',
            'hover:underline',
            'active:opacity-80',
        ]),
        default => implode(' ', [
            'bg-[oklch(var(--ui-primary))]',
            'text-[oklch(var(--ui-primary-foreground))]',
            'hover:bg-[oklch(var(--ui-primary)/0.9)]',
            'shadow-sm',
        ]),
    };

    // ── Size classes ─────────────────────────────────────────────────
    $sizeClasses = match ($size) {
        'xs' => 'h-7 px-2.5 text-xs gap-1 rounded-[var(--ui-radius-sm)]',
        'sm' => 'h-8 px-3 text-sm gap-1.5 rounded-[var(--ui-radius-sm)]',
        'md' => 'h-9 px-4 text-sm gap-2 rounded-[var(--ui-radius-md)]',
        'lg' => 'h-10 px-6 text-base gap-2 rounded-[var(--ui-radius-md)]',
        'icon' => 'h-9 w-9 rounded-[var(--ui-radius-md)] justify-center',
        default => 'h-9 px-4 text-sm gap-2 rounded-[var(--ui-radius-md)]',
    };

    // ── Base classes (shared across all variants / sizes) ────────────
    $baseClasses = implode(' ', [
        'inline-flex items-center justify-center',
        'font-medium',
        'whitespace-nowrap',
        'select-none',
        'transition-colors',
        'duration-[var(--ui-duration-normal)]',
        'ease-[var(--ui-ease-default)]',
        // Focus ring
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-[oklch(var(--ui-ring))]',
        'focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[oklch(var(--ui-background))]',
        // Disabled state
        'disabled:pointer-events-none',
        'disabled:opacity-50',
        // Aria-disabled (for anchor tags)
        'aria-disabled:pointer-events-none',
        'aria-disabled:opacity-50',
    ]);

    // ── Conditional modifiers ────────────────────────────────────────
    $widthClass = $fullWidth ? 'w-full' : '';
    $loadingClass = $loading ? 'relative cursor-wait' : '';

    // ── Merge all classes ────────────────────────────────────────────
    $classes = trim("{$baseClasses} {$variantClasses} {$sizeClasses} {$widthClass} {$loadingClass}");

    // ── Determine which tag to render ────────────────────────────────
    $tag = $href ? 'a' : $as;
    $isButton = $tag === 'button';
    $isAnchor = $tag === 'a';
    $isDisabled = $disabled || $loading;
@endphp

@if($isAnchor)
<a
    href="{{ $isDisabled ? null : $href }}"
    role="button"
    @if($isDisabled) aria-disabled="true" tabindex="-1" @endif
    {{ $attributes->class([$classes]) }}
>
@else
<{{ $tag }}
    @if($isButton) type="{{ $type }}" @endif
    @if($isDisabled) disabled aria-disabled="true" @endif
    @if($loading) aria-busy="true" @endif
    {{ $attributes->class([$classes]) }}
>
@endif

    {{-- Loading spinner overlay --}}
    @if($loading)
        <span class="absolute inset-0 flex items-center justify-center">
            <svg
                class="h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <circle
                    class="opacity-25"
                    cx="12" cy="12" r="10"
                    stroke="currentColor"
                    stroke-width="4"
                />
                <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        </span>
    @endif

    {{-- Content (invisible when loading to keep width, but hidden from screen readers) --}}
    <span @if($loading) class="invisible" aria-hidden="true" @endif>
        {{ $slot }}
    </span>

@if($isAnchor)
</a>
@else
</{{ $tag }}>
@endif
