{{--
    Unified UI — Select Component
    https://unified-ui.space

    A styled native select dropdown with support for placeholders,
    option groups, disabled states, and form integration.

    Usage:
        {{-- Basic select --}}
        <x-ui-select name="country">
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
        </x-ui-select>

        {{-- With placeholder --}}
        <x-ui-select name="role" placeholder="Select a role">
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
        </x-ui-select>

        {{-- With label and error --}}
        <x-ui-select name="plan" label="Plan" error="Please select a plan">
            <option value="free">Free</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
        </x-ui-select>

        {{-- Sizes --}}
        <x-ui-select name="size_sm" size="sm" placeholder="Small">
            <option value="1">One</option>
        </x-ui-select>

        {{-- Disabled --}}
        <x-ui-select name="locked" disabled placeholder="Locked">
            <option value="a">A</option>
        </x-ui-select>

        {{-- With option groups passed via slot --}}
        <x-ui-select name="animal" placeholder="Pick an animal">
            <optgroup label="Mammals">
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
            </optgroup>
            <optgroup label="Birds">
                <option value="eagle">Eagle</option>
                <option value="parrot">Parrot</option>
            </optgroup>
        </x-ui-select>

        {{-- With options prop (array) --}}
        <x-ui-select name="fruit" placeholder="Pick a fruit" :options="['apple' => 'Apple', 'banana' => 'Banana']" />

    Props:
        name        — form field name
        id          — element id (defaults to name)
        value       — currently selected value (default: null)
        placeholder — placeholder text shown as a disabled first option (default: null)
        label       — optional label text rendered above the select
        hint        — optional hint/help text rendered below the select
        error       — optional error message (overrides hint when present)
        size        — sm|md|lg (default: md)
        variant     — default|ghost (default: default)
        disabled    — boolean (default: false)
        required    — boolean (default: false)
        options     — optional associative array of value => label pairs
        fullWidth   — boolean, makes select 100% width (default: true)
--}}

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
