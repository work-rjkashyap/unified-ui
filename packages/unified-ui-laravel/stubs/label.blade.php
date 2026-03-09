@props([
    'for' => null,
    'as' => 'label',
    'size' => 'md',
    'required' => false,
    'optional' => false,
    'disabled' => false,
    'hint' => null,
    'srOnly' => false,
])

@php
    // ── Size classes ─────────────────────────────────────────────────
    $sizeClasses = match ($size) {
        'sm' => 'text-xs',
        'md' => 'text-sm',
        'lg' => 'text-base',
        default => 'text-sm',
    };

    // ── Disabled styling ─────────────────────────────────────────────
    $disabledClasses = $disabled
        ? 'opacity-50 cursor-not-allowed'
        : 'cursor-default';

    // ── Screen-reader only ───────────────────────────────────────────
    $srOnlyClasses = $srOnly
        ? 'sr-only'
        : '';

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'inline-flex',
        'items-center',
        'gap-1',
        'font-medium',
        'leading-none',
        'text-[oklch(var(--ui-foreground))]',
        'peer-disabled:opacity-50',
        'peer-disabled:cursor-not-allowed',
    ]);

    $classes = trim("{$baseClasses} {$sizeClasses} {$disabledClasses} {$srOnlyClasses}");

    // ── Hint text size ───────────────────────────────────────────────
    $hintSizeClasses = match ($size) {
        'sm' => 'text-[10px]',
        'md' => 'text-xs',
        'lg' => 'text-sm',
        default => 'text-xs',
    };
@endphp

@if($hint)
    {{-- Label with hint: wrapped in a div for stacking --}}
    <div class="flex flex-col gap-1" data-ui-label-group>
        <{{ $as }}
            @if($as === 'label' && $for) for="{{ $for }}" @endif
            {{ $attributes->class([$classes]) }}
            data-ui-label
        >
            {{-- Label text --}}
            {{ $slot }}

            {{-- Required asterisk --}}
            @if($required)
                <span
                    class="text-[oklch(var(--ui-destructive))] ml-0.5"
                    aria-hidden="true"
                >*</span>
                <span class="sr-only">(required)</span>
            @endif

            {{-- Optional indicator --}}
            @if($optional && !$required)
                <span class="text-[oklch(var(--ui-muted-foreground))] font-normal ml-1">(optional)</span>
            @endif
        </{{ $as }}>

        {{-- Hint text --}}
        <p class="{{ $hintSizeClasses }} text-[oklch(var(--ui-muted-foreground))] leading-normal">
            {{ $hint }}
        </p>
    </div>
@else
    {{-- Label without hint --}}
    <{{ $as }}
        @if($as === 'label' && $for) for="{{ $for }}" @endif
        {{ $attributes->class([$classes]) }}
        data-ui-label
    >
        {{-- Label text --}}
        {{ $slot }}

        {{-- Required asterisk --}}
        @if($required)
            <span
                class="text-[oklch(var(--ui-destructive))] ml-0.5"
                aria-hidden="true"
            >*</span>
            <span class="sr-only">(required)</span>
        @endif

        {{-- Optional indicator --}}
        @if($optional && !$required)
            <span class="text-[oklch(var(--ui-muted-foreground))] font-normal ml-1">(optional)</span>
        @endif
    </{{ $as }}>
@endif
