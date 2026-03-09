@props([
    'name' => null,
    'label' => null,
    'description' => null,
    'help' => null,
    'error' => null,
    'bag' => 'default',
    'required' => false,
    'optional' => false,
    'disabled' => false,
    'size' => 'md',
    'layout' => 'vertical',
    'labelWidth' => 'w-1/3',
    'srOnlyLabel' => false,
    'inlineHint' => null,
    'id' => null,
])

@php
    $inputId = $id ?? $name;
    $isHorizontal = $layout === 'horizontal';

    // ── Auto-detect validation errors from Laravel's error bag ────────
    $resolvedError = $error;
    if ($resolvedError === null && $name) {
        $errorBag = $bag === 'default' ? $errors : ($errors->{$bag} ?? $errors);
        if ($errorBag->has($name)) {
            $resolvedError = $errorBag->first($name);
        }
    }
    $hasError = !empty($resolvedError);

    // ── Aria-describedby IDs ─────────────────────────────────────────
    $describedBy = [];
    if ($description && $inputId) { $describedBy[] = "{$inputId}-description"; }
    if ($help && !$hasError && $inputId) { $describedBy[] = "{$inputId}-help"; }
    if ($hasError && $inputId) { $describedBy[] = "{$inputId}-error"; }

    // ── Size classes ─────────────────────────────────────────────────
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

    $helpSizeClasses = match ($size) {
        'sm' => 'text-[10px]',
        'md' => 'text-xs',
        'lg' => 'text-sm',
        default => 'text-xs',
    };

    $errorSizeClasses = match ($size) {
        'sm' => 'text-[10px]',
        'md' => 'text-xs',
        'lg' => 'text-sm',
        default => 'text-xs',
    };

    $gapClasses = match ($size) {
        'sm' => 'gap-1',
        'md' => 'gap-1.5',
        'lg' => 'gap-2',
        default => 'gap-1.5',
    };

    // ── Label classes ────────────────────────────────────────────────
    $labelClasses = implode(' ', [
        $labelSizeClasses,
        'font-medium',
        'leading-none',
        'text-[oklch(var(--ui-foreground))]',
        $disabled ? 'opacity-50 cursor-not-allowed' : '',
        $srOnlyLabel ? 'sr-only' : '',
    ]);

    // ── Required indicator classes ────────────────────────────────────
    $requiredClasses = 'text-[oklch(var(--ui-destructive))] ml-0.5';

    // ── Optional indicator classes ────────────────────────────────────
    $optionalClasses = 'text-[oklch(var(--ui-muted-foreground))] font-normal ml-1';

    // ── Inline hint classes ──────────────────────────────────────────
    $inlineHintClasses = implode(' ', [
        $descriptionSizeClasses,
        'text-[oklch(var(--ui-muted-foreground))]',
        'font-normal',
        'ml-1.5',
    ]);

    // ── Description classes ──────────────────────────────────────────
    $descriptionClasses = implode(' ', [
        $descriptionSizeClasses,
        'text-[oklch(var(--ui-muted-foreground))]',
        'leading-normal',
    ]);

    // ── Help text classes ────────────────────────────────────────────
    $helpClasses = implode(' ', [
        $helpSizeClasses,
        'text-[oklch(var(--ui-muted-foreground))]',
        'leading-normal',
    ]);

    // ── Error text classes ───────────────────────────────────────────
    $errorClasses = implode(' ', [
        $errorSizeClasses,
        'text-[oklch(var(--ui-destructive))]',
        'leading-normal',
    ]);

    // ── Layout wrapper classes ───────────────────────────────────────
    $wrapperClasses = $isHorizontal
        ? 'flex flex-row items-start gap-4'
        : "flex flex-col {$gapClasses}";

    // ── Disabled wrapper ─────────────────────────────────────────────
    $disabledClasses = $disabled ? 'opacity-60 pointer-events-none' : '';
@endphp

<div
    {{ $attributes->class([trim("{$wrapperClasses} {$disabledClasses}")]) }}
    data-ui-form-group
    @if($hasError) data-ui-form-group-error @endif
    @if($disabled) data-ui-form-group-disabled @endif
>
    {{-- Label column / section --}}
    @if($label)
        <div class="{{ $isHorizontal ? "{$labelWidth} shrink-0 pt-2" : '' }}">
            <label
                @if($inputId) for="{{ $inputId }}" @endif
                class="{{ $labelClasses }}"
                data-ui-form-group-label
            >
                {{-- Label text --}}
                <span class="inline-flex items-center">
                    {{ $label }}

                    {{-- Required asterisk --}}
                    @if($required)
                        <span class="{{ $requiredClasses }}" aria-hidden="true">*</span>
                        <span class="sr-only">(required)</span>
                    @endif

                    {{-- Optional indicator --}}
                    @if($optional && !$required)
                        <span class="{{ $optionalClasses }}">(optional)</span>
                    @endif

                    {{-- Inline hint --}}
                    @if($inlineHint)
                        <span class="{{ $inlineHintClasses }}">{{ $inlineHint }}</span>
                    @endif
                </span>
            </label>

            {{-- Description (below label) --}}
            @if($description && !$srOnlyLabel)
                <p
                    @if($inputId) id="{{ $inputId }}-description" @endif
                    class="{{ $descriptionClasses }} mt-0.5"
                >
                    {{ $description }}
                </p>
            @endif
        </div>
    @endif

    {{-- Control + help/error section --}}
    <div class="{{ $isHorizontal ? 'flex-1 min-w-0' : '' }} flex flex-col {{ $gapClasses }}">
        {{-- Form control (slot content) --}}
        <div data-ui-form-group-control>
            {{ $slot }}
        </div>

        {{-- Help text (hidden when there's an error) --}}
        @if($help && !$hasError)
            <p
                @if($inputId) id="{{ $inputId }}-help" @endif
                class="{{ $helpClasses }}"
                data-ui-form-group-help
            >
                {{ $help }}
            </p>
        @endif

        {{-- Error message --}}
        @if($hasError)
            <p
                @if($inputId) id="{{ $inputId }}-error" @endif
                class="{{ $errorClasses }}"
                role="alert"
                data-ui-form-group-error-message
            >
                {{-- Error icon --}}
                <svg
                    class="inline-block shrink-0 {{ match($size) { 'sm' => 'h-3 w-3', 'lg' => 'h-4 w-4', default => 'h-3.5 w-3.5' } }} mr-1 -mt-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>

                {{ $resolvedError }}
            </p>
        @endif
    </div>
</div>
