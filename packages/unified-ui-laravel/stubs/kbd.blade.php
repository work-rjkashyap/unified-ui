@props([
    'size' => 'sm',
    'variant' => 'default',
    'keys' => [],
    'separator' => '',
])

@php
    // ── Size classes ─────────────────────────────────────────────────
    $sizeClasses = match ($size) {
        'xs' => 'min-w-4 h-4 px-1 text-[10px] rounded-[var(--ui-radius-sm)]',
        'sm' => 'min-w-5 h-5 px-1.5 text-[11px] rounded-[var(--ui-radius-sm)]',
        'md' => 'min-w-6 h-6 px-2 text-xs rounded-[var(--ui-radius-md)]',
        'lg' => 'min-w-7 h-7 px-2.5 text-sm rounded-[var(--ui-radius-md)]',
        default => 'min-w-5 h-5 px-1.5 text-[11px] rounded-[var(--ui-radius-sm)]',
    };

    // ── Variant classes ──────────────────────────────────────────────
    $variantClasses = match ($variant) {
        'outline' => implode(' ', [
            'border',
            'border-[oklch(var(--ui-border))]',
            'bg-transparent',
            'text-[oklch(var(--ui-foreground))]',
        ]),
        'ghost' => implode(' ', [
            'border-transparent',
            'bg-[oklch(var(--ui-muted)/0.5)]',
            'text-[oklch(var(--ui-muted-foreground))]',
        ]),
        default => implode(' ', [
            'border',
            'border-[oklch(var(--ui-border))]',
            'bg-[oklch(var(--ui-muted))]',
            'text-[oklch(var(--ui-muted-foreground))]',
            'shadow-[0_1px_0_0_oklch(var(--ui-border))]',
        ]),
    };

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'inline-flex',
        'items-center',
        'justify-center',
        'font-mono',
        'font-medium',
        'leading-none',
        'whitespace-nowrap',
        'select-none',
        'shrink-0',
        'pointer-events-none',
    ]);

    // ── Separator classes ────────────────────────────────────────────
    $separatorClasses = implode(' ', [
        'inline-flex',
        'items-center',
        'justify-center',
        'text-[oklch(var(--ui-muted-foreground)/0.6)]',
        'font-sans',
        match ($size) {
            'xs' => 'text-[9px] mx-0.5',
            'sm' => 'text-[10px] mx-0.5',
            'md' => 'text-xs mx-1',
            'lg' => 'text-sm mx-1',
            default => 'text-[10px] mx-0.5',
        },
    ]);

    $classes = trim("{$baseClasses} {$sizeClasses} {$variantClasses}");
@endphp

@if(count($keys) > 0)
    {{-- Multi-key combination mode via keys prop --}}
    <span
        {{ $attributes->except('class')->class(['inline-flex items-center']) }}
        data-ui-kbd-group
    >
        @foreach($keys as $index => $key)
            {{-- Separator between keys --}}
            @if($index > 0 && $separator !== '')
                <span class="{{ $separatorClasses }}" aria-hidden="true">{{ $separator }}</span>
            @endif

            <kbd
                class="{{ $classes }} {{ $attributes->get('class', '') }}"
                data-ui-kbd
            >{{ $key }}</kbd>
        @endforeach
    </span>
@else
    {{-- Single key mode via slot --}}
    <kbd
        {{ $attributes->class([$classes]) }}
        data-ui-kbd
    >{{ $slot }}</kbd>
@endif
