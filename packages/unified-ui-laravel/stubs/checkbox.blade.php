@props([
    'name' => null,
    'value' => '1',
    'label' => null,
    'description' => null,
    'checked' => false,
    'indeterminate' => false,
    'disabled' => false,
    'required' => false,
    'error' => null,
    'size' => 'md',
    'id' => null,
])

@php
    $inputId = $id ?? ($name ? 'checkbox-' . $name . '-' . Str::random(4) : 'checkbox-' . Str::random(6));

    // ── Size classes ─────────────────────────────────────────────────
    $boxSizeClasses = match ($size) {
        'sm' => 'h-3.5 w-3.5',
        'md' => 'h-4 w-4',
        'lg' => 'h-5 w-5',
        default => 'h-4 w-4',
    };

    $iconSizeClasses = match ($size) {
        'sm' => 'h-2.5 w-2.5',
        'md' => 'h-3 w-3',
        'lg' => 'h-3.5 w-3.5',
        default => 'h-3 w-3',
    };

    $labelSizeClasses = match ($size) {
        'sm' => 'text-xs',
        'md' => 'text-sm',
        'lg' => 'text-base',
        default => 'text-sm',
    };

    // ── Error state ──────────────────────────────────────────────────
    $hasError = !empty($error);
    $borderColor = $hasError
        ? 'border-[oklch(var(--ui-destructive))]'
        : 'border-[oklch(var(--ui-border))]';

    $ringColor = $hasError
        ? 'focus-visible:ring-[oklch(var(--ui-destructive))]'
        : 'focus-visible:ring-[oklch(var(--ui-ring))]';

    // ── Checkbox box classes ─────────────────────────────────────────
    $boxClasses = implode(' ', [
        'peer shrink-0',
        'appearance-none',
        $boxSizeClasses,
        'rounded-[var(--ui-radius-sm)]',
        'border',
        $borderColor,
        'bg-transparent',
        'transition-colors',
        'duration-[var(--ui-duration-fast)]',
        'ease-[var(--ui-ease-default)]',
        'checked:bg-[oklch(var(--ui-primary))]',
        'checked:border-[oklch(var(--ui-primary))]',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        $ringColor,
        'focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[oklch(var(--ui-background))]',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
    ]);
@endphp

<div
    {{ $attributes->only('class')->class(['flex gap-2', $size === 'lg' ? 'gap-3' : 'gap-2']) }}
    x-data="{
        checked: @js((bool) $checked),
        indeterminate: @js((bool) $indeterminate)
    }"
    data-ui-checkbox
>
    {{-- Hidden checkbox container --}}
    <div class="relative flex items-start pt-0.5">
        {{-- Actual input (visually hidden but accessible) --}}
        <input
            type="checkbox"
            @if($name) name="{{ $name }}" @endif
            value="{{ $value }}"
            id="{{ $inputId }}"
            x-model="checked"
            x-ref="checkbox"
            x-init="$refs.checkbox.indeterminate = indeterminate"
            x-effect="$refs.checkbox.indeterminate = indeterminate"
            class="{{ $boxClasses }}"
            @if($disabled) disabled @endif
            @if($required) required @endif
            @if($hasError) aria-invalid="true" aria-describedby="{{ $inputId }}-error" @endif
        />

        {{-- Check icon overlay --}}
        <div
            class="pointer-events-none absolute inset-0 flex items-center justify-center text-[oklch(var(--ui-primary-foreground))]"
            aria-hidden="true"
        >
            {{-- Checkmark icon --}}
            <svg
                class="{{ $iconSizeClasses }}"
                x-show="checked && !indeterminate"
                x-cloak
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <polyline points="20 6 9 17 4 12" />
            </svg>

            {{-- Indeterminate icon (dash) --}}
            <svg
                class="{{ $iconSizeClasses }}"
                x-show="indeterminate"
                x-cloak
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
        </div>
    </div>

    {{-- Label and description --}}
    @if($label || $description || $hasError)
        <div class="flex flex-col gap-0.5">
            @if($label)
                <label
                    for="{{ $inputId }}"
                    class="{{ $labelSizeClasses }} font-medium leading-tight text-[oklch(var(--ui-foreground))] select-none {{ $disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer' }}"
                >
                    {{ $label }}
                    @if($required)
                        <span class="text-[oklch(var(--ui-destructive))] ml-0.5" aria-hidden="true">*</span>
                    @endif
                </label>
            @endif

            @if($description)
                <p class="text-xs text-[oklch(var(--ui-muted-foreground))] leading-normal {{ $disabled ? 'opacity-50' : '' }}">
                    {{ $description }}
                </p>
            @endif

            @if($hasError)
                <p
                    id="{{ $inputId }}-error"
                    class="text-xs text-[oklch(var(--ui-destructive))] leading-normal"
                    role="alert"
                >
                    {{ $error }}
                </p>
            @endif
        </div>
    @endif
</div>
