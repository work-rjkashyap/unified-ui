{{--
    Unified UI — Input Component
    https://unified-ui.space

    A fully-featured text input with optional label, help text, error messages,
    leading/trailing icons, prefix/suffix text, and multiple size variants.

    Usage:
        {{-- Basic input --}}
        <x-ui-input name="email" type="email" placeholder="you@example.com" />

        {{-- With label and help text --}}
        <x-ui-input name="username" label="Username" help="Choose a unique username." />

        {{-- With error state (integrates with Laravel validation) --}}
        <x-ui-input name="email" label="Email" :error="$errors->first('email')" />

        {{-- With icons --}}
        <x-ui-input name="search" placeholder="Search…" icon-left="search" icon-right="x" />

        {{-- With prefix/suffix text --}}
        <x-ui-input name="website" prefix="https://" suffix=".com" />

        {{-- Disabled and readonly --}}
        <x-ui-input name="locked" value="Cannot edit" disabled />
        <x-ui-input name="readonly" value="Read only" readonly />

        {{-- Different sizes --}}
        <x-ui-input name="small" size="sm" placeholder="Small" />
        <x-ui-input name="large" size="lg" placeholder="Large" />

        {{-- Textarea mode --}}
        <x-ui-input name="bio" as="textarea" rows="4" label="Bio" />

    Props:
        name       — input name attribute (also used for id and error bag lookup)
        type       — input type: text|email|password|number|tel|url|search|date|datetime-local|time|file (default: text)
        label      — optional label text displayed above the input
        help       — optional help text displayed below the input
        error      — explicit error message string (overrides automatic $errors lookup)
        placeholder — placeholder text
        value      — input value (also supports wire:model, x-model, etc.)
        size       — xs|sm|md|lg (default: md)
        variant    — default|filled|flushed (default: default)
        as         — HTML element to render: input|textarea (default: input)
        rows       — number of rows when as=textarea (default: 3)
        iconLeft   — icon name for leading icon slot
        iconRight  — icon name for trailing icon slot
        prefix     — static text rendered before the input inside the wrapper
        suffix     — static text rendered after the input inside the wrapper
        disabled   — boolean
        readonly   — boolean
        required   — boolean
        autofocus  — boolean
        fullWidth  — boolean, makes input 100% width (default: true)
        srOnlyLabel — boolean, visually hides the label but keeps it accessible (default: false)
--}}

@props([
    'name' => null,
    'type' => 'text',
    'label' => null,
    'help' => null,
    'error' => null,
    'placeholder' => null,
    'value' => null,
    'size' => 'md',
    'variant' => 'default',
    'as' => 'input',
    'rows' => 3,
    'iconLeft' => null,
    'iconRight' => null,
    'prefix' => null,
    'suffix' => null,
    'disabled' => false,
    'readonly' => false,
    'required' => false,
    'autofocus' => false,
    'fullWidth' => true,
    'srOnlyLabel' => false,
])

@php
    // ── Resolve error from error bag if not explicitly provided ──────
    $resolvedError = $error;
    if ($resolvedError === null && $name && isset($errors) && $errors->has($name)) {
        $resolvedError = $errors->first($name);
    }
    $hasError = !empty($resolvedError);

    // ── Generate a unique ID ─────────────────────────────────────────
    $inputId = $name ? 'ui-input-' . $name : 'ui-input-' . \Illuminate\Support\Str::random(8);
    $helpId = $help ? $inputId . '-help' : null;
    $errorId = $hasError ? $inputId . '-error' : null;

    // ── Described-by for accessibility ───────────────────────────────
    $describedBy = collect([$helpId, $errorId])->filter()->implode(' ') ?: null;

    // ── Size classes for the input element ───────────────────────────
    $inputSizeClasses = match ($size) {
        'xs' => 'h-7 px-2 text-xs',
        'sm' => 'h-8 px-2.5 text-sm',
        'md' => 'h-9 px-3 text-sm',
        'lg' => 'h-10 px-4 text-base',
        default => 'h-9 px-3 text-sm',
    };

    // ── Textarea ignores height from size, but keeps horizontal padding
    $textareaSizeClasses = match ($size) {
        'xs' => 'px-2 py-1.5 text-xs',
        'sm' => 'px-2.5 py-2 text-sm',
        'md' => 'px-3 py-2 text-sm',
        'lg' => 'px-4 py-3 text-base',
        default => 'px-3 py-2 text-sm',
    };

    // ── Icon size classes ────────────────────────────────────────────
    $iconSizeClasses = match ($size) {
        'xs' => 'h-3 w-3',
        'sm' => 'h-3.5 w-3.5',
        'md' => 'h-4 w-4',
        'lg' => 'h-5 w-5',
        default => 'h-4 w-4',
    };

    // ── Left/right padding adjustments when icons or prefix/suffix present
    $paddingLeftClass = ($iconLeft || $prefix) ? match ($size) {
        'xs' => 'pl-7',
        'sm' => 'pl-8',
        'md' => 'pl-9',
        'lg' => 'pl-10',
        default => 'pl-9',
    } : '';

    $paddingRightClass = ($iconRight || $suffix) ? match ($size) {
        'xs' => 'pr-7',
        'sm' => 'pr-8',
        'md' => 'pr-9',
        'lg' => 'pr-10',
        default => 'pr-9',
    } : '';

    // ── Variant classes ──────────────────────────────────────────────
    $variantClasses = match ($variant) {
        'default' => implode(' ', [
            'border',
            'border-[oklch(var(--ui-input))]',
            'bg-[oklch(var(--ui-background))]',
            'rounded-[var(--ui-radius-md)]',
        ]),
        'filled' => implode(' ', [
            'border',
            'border-transparent',
            'bg-[oklch(var(--ui-muted))]',
            'rounded-[var(--ui-radius-md)]',
            'focus:bg-[oklch(var(--ui-background))]',
            'focus:border-[oklch(var(--ui-input))]',
        ]),
        'flushed' => implode(' ', [
            'border-b',
            'border-[oklch(var(--ui-input))]',
            'bg-transparent',
            'rounded-none',
            'px-0',
        ]),
        default => implode(' ', [
            'border',
            'border-[oklch(var(--ui-input))]',
            'bg-[oklch(var(--ui-background))]',
            'rounded-[var(--ui-radius-md)]',
        ]),
    };

    // ── Error classes (override border color) ────────────────────────
    $errorClasses = $hasError ? implode(' ', [
        'border-[oklch(var(--ui-destructive))]',
        'focus:ring-[oklch(var(--ui-destructive))]',
        'focus:border-[oklch(var(--ui-destructive))]',
    ]) : '';

    // ── Base input classes ───────────────────────────────────────────
    $baseInputClasses = implode(' ', [
        'w-full',
        'text-[oklch(var(--ui-foreground))]',
        'placeholder:text-[oklch(var(--ui-muted-foreground)/0.6)]',
        'transition-colors',
        'duration-[var(--ui-duration-normal)]',
        'ease-[var(--ui-ease-default)]',
        // Focus styles
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-[oklch(var(--ui-ring))]',
        'focus:ring-offset-0',
        'focus:border-[oklch(var(--ui-ring))]',
        // Disabled
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
        'disabled:bg-[oklch(var(--ui-muted)/0.5)]',
        // Read-only
        'read-only:bg-[oklch(var(--ui-muted)/0.3)]',
        'read-only:focus:ring-0',
        // File input special styles
        'file:border-0',
        'file:bg-transparent',
        'file:text-sm',
        'file:font-medium',
        'file:text-[oklch(var(--ui-foreground))]',
    ]);

    // ── Determine element-specific size classes ──────────────────────
    $elementSizeClasses = ($as === 'textarea') ? $textareaSizeClasses : $inputSizeClasses;

    // ── Merge all input element classes ──────────────────────────────
    $inputClasses = trim("{$baseInputClasses} {$elementSizeClasses} {$variantClasses} {$paddingLeftClass} {$paddingRightClass} {$errorClasses}");

    // ── Container width ──────────────────────────────────────────────
    $containerWidthClass = $fullWidth ? 'w-full' : '';

    // ── Label size classes ───────────────────────────────────────────
    $labelSizeClasses = match ($size) {
        'xs' => 'text-xs',
        'sm' => 'text-xs',
        'md' => 'text-sm',
        'lg' => 'text-sm',
        default => 'text-sm',
    };

    // ── Icon positioning classes ─────────────────────────────────────
    $iconPositionClasses = match ($size) {
        'xs' => 'top-1/2 -translate-y-1/2',
        'sm' => 'top-1/2 -translate-y-1/2',
        'md' => 'top-1/2 -translate-y-1/2',
        'lg' => 'top-1/2 -translate-y-1/2',
        default => 'top-1/2 -translate-y-1/2',
    };

    $iconLeftPositionClasses = match ($size) {
        'xs' => 'left-2',
        'sm' => 'left-2.5',
        'md' => 'left-3',
        'lg' => 'left-3',
        default => 'left-3',
    };

    $iconRightPositionClasses = match ($size) {
        'xs' => 'right-2',
        'sm' => 'right-2.5',
        'md' => 'right-3',
        'lg' => 'right-3',
        default => 'right-3',
    };

    // ── Prefix / suffix positioning ──────────────────────────────────
    $prefixPositionClasses = "left-0 {$iconLeftPositionClasses}";
    $suffixPositionClasses = "right-0 {$iconRightPositionClasses}";

    $prefixSuffixSizeClasses = match ($size) {
        'xs' => 'text-xs',
        'sm' => 'text-sm',
        'md' => 'text-sm',
        'lg' => 'text-base',
        default => 'text-sm',
    };
@endphp

<div class="flex flex-col gap-1.5 {{ $containerWidthClass }}">
    {{-- Label --}}
    @if($label)
        <label
            for="{{ $inputId }}"
            @class([
                'font-medium text-[oklch(var(--ui-foreground))]',
                $labelSizeClasses,
                'sr-only' => $srOnlyLabel,
            ])
        >
            {{ $label }}
            @if($required)
                <span class="text-[oklch(var(--ui-destructive))] ml-0.5" aria-hidden="true">*</span>
            @endif
        </label>
    @endif

    {{-- Input wrapper (for icons, prefix, suffix positioning) --}}
    <div class="relative {{ $containerWidthClass }}">
        {{-- Leading icon --}}
        @if($iconLeft)
            <span
                class="absolute {{ $iconLeftPositionClasses }} {{ $iconPositionClasses }} pointer-events-none text-[oklch(var(--ui-muted-foreground))]"
                aria-hidden="true"
            >
                <svg class="{{ $iconSizeClasses }}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    @switch($iconLeft)
                        @case('search')
                            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                            @break
                        @case('mail')
                            <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            @break
                        @case('lock')
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            @break
                        @case('user')
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                            @break
                        @case('phone')
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                            @break
                        @case('link')
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            @break
                        @default
                            {{-- Generic circle as fallback --}}
                            <circle cx="12" cy="12" r="10" />
                    @endswitch
                </svg>
            </span>
        @endif

        {{-- Prefix text --}}
        @if($prefix)
            <span
                class="absolute {{ $prefixPositionClasses }} {{ $iconPositionClasses }} pointer-events-none text-[oklch(var(--ui-muted-foreground))] {{ $prefixSuffixSizeClasses }} select-none"
                aria-hidden="true"
            >{{ $prefix }}</span>
        @endif

        {{-- Input element --}}
        @if($as === 'textarea')
            <textarea
                id="{{ $inputId }}"
                @if($name) name="{{ $name }}" @endif
                rows="{{ $rows }}"
                placeholder="{{ $placeholder }}"
                @if($disabled) disabled @endif
                @if($readonly) readonly @endif
                @if($required) required aria-required="true" @endif
                @if($autofocus) autofocus @endif
                @if($hasError) aria-invalid="true" @endif
                @if($describedBy) aria-describedby="{{ $describedBy }}" @endif
                {{ $attributes->class([$inputClasses, 'resize-y min-h-[60px]']) }}
            >{{ old($name, $value) }}</textarea>
        @else
            <input
                id="{{ $inputId }}"
                type="{{ $type }}"
                @if($name) name="{{ $name }}" @endif
                value="{{ old($name, $value) }}"
                placeholder="{{ $placeholder }}"
                @if($disabled) disabled @endif
                @if($readonly) readonly @endif
                @if($required) required aria-required="true" @endif
                @if($autofocus) autofocus @endif
                @if($hasError) aria-invalid="true" @endif
                @if($describedBy) aria-describedby="{{ $describedBy }}" @endif
                {{ $attributes->class([$inputClasses]) }}
            />
        @endif

        {{-- Trailing icon --}}
        @if($iconRight)
            <span
                class="absolute {{ $iconRightPositionClasses }} {{ $iconPositionClasses }} pointer-events-none text-[oklch(var(--ui-muted-foreground))]"
                aria-hidden="true"
            >
                <svg class="{{ $iconSizeClasses }}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    @switch($iconRight)
                        @case('x')
                            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                            @break
                        @case('eye')
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
                            @break
                        @case('eye-off')
                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" />
                            @break
                        @case('chev
