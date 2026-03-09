@props([
    'name' => null,
    'value' => null,
    'label' => null,
    'description' => null,
    'checked' => false,
    'disabled' => false,
    'size' => 'md',
    'variant' => 'default',
    'id' => null,
])

@php
    // ── Generate a unique ID ─────────────────────────────────────────
    $inputId = $id ?? ('ui-radio-' . ($name ? \Illuminate\Support\Str::slug($name) . '-' : '') . ($value !== null ? \Illuminate\Support\Str::slug((string) $value) : \Illuminate\Support\Str::random(6)));

    // ── Size classes ─────────────────────────────────────────────────
    $radioSizeClasses = match ($size) {
        'sm' => 'h-3.5 w-3.5',
        'md' => 'h-4 w-4',
        'lg' => 'h-5 w-5',
        default => 'h-4 w-4',
    };

    $dotSizeClasses = match ($size) {
        'sm' => 'h-1.5 w-1.5',
        'md' => 'h-2 w-2',
        'lg' => 'h-2.5 w-2.5',
        default => 'h-2 w-2',
    };

    $labelSizeClasses = match ($size) {
        'sm' => 'text-xs',
        'md' => 'text-sm',
        'lg' => 'text-base',
        default => 'text-sm',
    };

    $descriptionSizeClasses = match ($size) {
        'sm' => 'text-[10px]',
        'md' => 'text-xs',
        'lg' => 'text-sm',
        default => 'text-xs',
    };

    // ── Variant accent color ─────────────────────────────────────────
    $accentColor = match ($variant) {
        'primary' => '--ui-primary',
        'success' => '--ui-success',
        'destructive' => '--ui-destructive',
        default => '--ui-primary',
    };

    // ── Radio visual classes ─────────────────────────────────────────
    $radioClasses = implode(' ', [
        $radioSizeClasses,
        'shrink-0',
        'rounded-full',
        'border',
        'border-[oklch(var(--ui-border))]',
        'bg-[oklch(var(--ui-background))]',
        'transition-colors',
        'duration-[var(--ui-duration-fast)]',
        'ease-[var(--ui-ease-default)]',
        'flex items-center justify-center',
        // Checked state
        "peer-checked:border-[oklch(var({$accentColor}))]",
        "peer-checked:bg-[oklch(var({$accentColor}))]",
        // Focus
        'peer-focus-visible:ring-2',
        "peer-focus-visible:ring-[oklch(var({$accentColor})/0.4)]",
        'peer-focus-visible:ring-offset-2',
        'peer-focus-visible:ring-offset-[oklch(var(--ui-background))]',
        // Disabled
        'peer-disabled:cursor-not-allowed',
        'peer-disabled:opacity-50',
    ]);
@endphp

<label
    class="inline-flex items-start gap-2 {{ $disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer' }} group"
    @if($disabled) aria-disabled="true" @endif
    data-ui-radio
>
    {{-- Hidden native radio input --}}
    <input
        type="radio"
        class="peer sr-only"
        id="{{ $inputId }}"
        @if($name) name="{{ $name }}" @endif
        @if($value !== null) value="{{ $value }}" @endif
        @if($checked) checked @endif
        @if($disabled) disabled @endif
        {{ $attributes->except(['class', 'id', 'name', 'value', 'checked', 'disabled']) }}
    />

    {{-- Custom radio circle --}}
    <span class="{{ $radioClasses }}" aria-hidden="true">
        {{-- Inner dot (visible when checked) --}}
        <span class="{{ $dotSizeClasses }} rounded-full bg-transparent peer-checked:group-[]:bg-[oklch(var(--ui-primary-foreground))] transition-transform duration-[var(--ui-duration-fast)] scale-0 peer-checked:group-[]:scale-100"></span>
    </span>

    {{-- Label and description --}}
    @if($label || $description)
        <span class="flex flex-col gap-0.5 select-none">
            @if($label)
                <span class="{{ $labelSizeClasses }} font-medium leading-tight text-[oklch(var(--ui-foreground))]">
                    {{ $label }}
                </span>
            @endif
            @if($description)
                <span class="{{ $descriptionSizeClasses }} leading-tight text-[oklch(var(--ui-muted-foreground))]">
                    {{ $description }}
                </span>
            @endif
        </span>
    @endif
</label>
