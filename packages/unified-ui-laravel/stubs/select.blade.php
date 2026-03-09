@props([
    'name' => null,
    'id' => null,
    'value' => null,
    'placeholder' => null,
    'label' => null,
    'hint' => null,
    'error' => null,
    'size' => 'md',
    'variant' => 'default',
    'disabled' => false,
    'required' => false,
    'options' => [],
    'fullWidth' => true,
])

@php
    $inputId = $id ?? $name;
    $hasError = !empty($error);
    $describedBy = [];
    if ($hint && !$hasError) { $describedBy[] = "{$inputId}-hint"; }
    if ($hasError) { $describedBy[] = "{$inputId}-error"; }

    // ── Size classes ─────────────────────────────────────────────────
    $sizeClasses = match ($size) {
        'sm' => 'h-8 px-2.5 pr-8 text-xs rounded-[var(--ui-radius-sm)]',
        'md' => 'h-9 px-3 pr-9 text-sm rounded-[var(--ui-radius-md)]',
        'lg' => 'h-10 px-4 pr-10 text-base rounded-[var(--ui-radius-md)]',
        default => 'h-9 px-3 pr-9 text-sm rounded-[var(--ui-radius-md)]',
    };

    // ── Variant classes ──────────────────────────────────────────────
    $variantClasses = match ($variant) {
        'ghost' => implode(' ', [
            'border-transparent',
            'bg-transparent',
            'hover:bg-[oklch(var(--ui-accent))]',
        ]),
        default => implode(' ', [
            'border-[oklch(var(--ui-input))]',
            'bg-[oklch(var(--ui-background))]',
        ]),
    };

    // ── Error state ──────────────────────────────────────────────────
    $errorClasses = $hasError
        ? 'border-[oklch(var(--ui-destructive))] focus:ring-[oklch(var(--ui-destructive))]'
        : '';

    // ── Width ────────────────────────────────────────────────────────
    $widthClass = $fullWidth ? 'w-full' : '';

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'appearance-none',
        'border',
        'text-[oklch(var(--ui-foreground))]',
        'shadow-sm',
        'transition-colors',
        'duration-[var(--ui-duration-normal)]',
        'ease-[var(--ui-ease-default)]',
        'cursor-pointer',
        // Focus ring
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-[oklch(var(--ui-ring))]',
        'focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[oklch(var(--ui-background))]',
        // Placeholder / unselected
        'invalid:text-[oklch(var(--ui-muted-foreground))]',
        // Disabled
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
    ]);

    // ── Chevron icon size ────────────────────────────────────────────
    $chevronSizeClasses = match ($size) {
        'sm' => 'h-3.5 w-3.5 right-2',
        'md' => 'h-4 w-4 right-3',
        'lg' => 'h-4.5 w-4.5 right-3.5',
        default => 'h-4 w-4 right-3',
    };

    $classes = trim("{$baseClasses} {$sizeClasses} {$variantClasses} {$errorClasses} {$widthClass}");
@endphp

<div
    class="{{ $fullWidth ? 'w-full' : 'inline-flex flex-col' }}"
    data-ui-select
>
    {{-- Label --}}
    @if($label)
        <label
            @if($inputId) for="{{ $inputId }}" @endif
            class="mb-1.5 block text-sm font-medium text-[oklch(var(--ui-foreground))]"
        >
            {{ $label }}
            @if($required)
                <span class="text-[oklch(var(--ui-destructive))]" aria-hidden="true">*</span>
            @endif
        </label>
    @endif

    {{-- Select wrapper --}}
    <div class="relative">
        <select
            @if($name) name="{{ $name }}" @endif
            @if($inputId) id="{{ $inputId }}" @endif
            @if($disabled) disabled @endif
            @if($required) required aria-required="true" @endif
            @if($hasError) aria-invalid="true" @endif
            @if(!empty($describedBy)) aria-describedby="{{ implode(' ', $describedBy) }}" @endif
            {{ $attributes->class([$classes]) }}
        >
            {{-- Placeholder option --}}
            @if($placeholder)
                <option value="" disabled @unless($value) selected @endunless>
                    {{ $placeholder }}
                </option>
            @endif

            {{-- Options from prop --}}
            @foreach($options as $optValue => $optLabel)
                <option
                    value="{{ $optValue }}"
                    @if((string) $value === (string) $optValue) selected @endif
                >
                    {{ $optLabel }}
                </option>
            @endforeach

            {{-- Options from slot --}}
            {{ $slot }}
        </select>

        {{-- Chevron icon --}}
        <span
            class="pointer-events-none absolute inset-y-0 {{ $chevronSizeClasses }} flex items-center text-[oklch(var(--ui-muted-foreground))]"
            aria-hidden="true"
        >
            <svg
                class="h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d="m6 9 6 6 6-6" />
            </svg>
        </span>
    </div>

    {{-- Hint text --}}
    @if($hint && !$hasError)
        <p
            id="{{ $inputId }}-hint"
            class="mt-1.5 text-xs text-[oklch(var(--ui-muted-foreground))]"
        >
            {{ $hint }}
        </p>
    @endif

    {{-- Error message --}}
    @if($hasError)
        <p
            id="{{ $inputId }}-error"
            class="mt-1.5 text-xs text-[oklch(var(--ui-destructive))]"
            role="alert"
        >
            {{ $error }}
        </p>
    @endif
</div>
