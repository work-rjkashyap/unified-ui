{{--
    Unified UI — Label Component
    https://unified-ui.space

    An accessible form label element with optional required indicator
    and disabled styling. Pairs with input, select, textarea, and
    other form controls.

    Usage:
        {{-- Basic label --}}
        <x-ui-label for="email">Email address</x-ui-label>

        {{-- Required field --}}
        <x-ui-label for="name" required>Full name</x-ui-label>

        {{-- Optional indicator --}}
        <x-ui-label for="bio" optional>Bio</x-ui-label>

        {{-- Disabled appearance --}}
        <x-ui-label for="code" disabled>Invite code</x-ui-label>

        {{-- Different sizes --}}
        <x-ui-label for="sm" size="sm">Small label</x-ui-label>
        <x-ui-label for="lg" size="lg">Large label</x-ui-label>

        {{-- As a span (non-semantic, e.g. for radio groups) --}}
        <x-ui-label as="span" id="group-label">Choose a plan</x-ui-label>

        {{-- With hint text --}}
        <x-ui-label for="password" hint="Must be at least 8 characters">
            Password
        </x-ui-label>

    Props:
        for      — the id of the form control this label is associated with
        as       — HTML tag: label|span (default: label)
        size     — sm|md|lg (default: md)
        required — boolean, shows a red asterisk after the text (default: false)
        optional — boolean, shows "(optional)" after the text (default: false)
        disabled — boolean, applies muted/disabled styling (default: false)
        hint     — optional hint text displayed below the label
        srOnly   — boolean, visually hides the label but keeps it accessible (default: false)
--}}

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
