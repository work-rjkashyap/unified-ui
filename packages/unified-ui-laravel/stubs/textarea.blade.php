@props([
    'variant' => 'default',
    'size' => 'md',
    'rows' => 3,
    'maxlength' => null,
    'showCount' => false,
    'autoResize' => false,
    'disabled' => false,
    'readonly' => false,
    'name' => null,
    'value' => null,
    'placeholder' => null,
])

@php
    // ── Variant border / ring colors ─────────────────────────────────
    $variantClasses = match ($variant) {
        'error' => implode(' ', [
            'border-[oklch(var(--ui-destructive))]',
            'focus:ring-[oklch(var(--ui-destructive))]',
            'text-[oklch(var(--ui-foreground))]',
            'placeholder:text-[oklch(var(--ui-destructive)/0.5)]',
        ]),
        'success' => implode(' ', [
            'border-[oklch(var(--ui-success))]',
            'focus:ring-[oklch(var(--ui-success))]',
            'text-[oklch(var(--ui-foreground))]',
            'placeholder:text-[oklch(var(--ui-muted-foreground))]',
        ]),
        default => implode(' ', [
            'border-[oklch(var(--ui-border))]',
            'focus:ring-[oklch(var(--ui-ring))]',
            'text-[oklch(var(--ui-foreground))]',
            'placeholder:text-[oklch(var(--ui-muted-foreground))]',
        ]),
    };

    // ── Size classes ─────────────────────────────────────────────────
    $sizeClasses = match ($size) {
        'sm' => 'px-2.5 py-1.5 text-xs rounded-[var(--ui-radius-sm)]',
        'md' => 'px-3 py-2 text-sm rounded-[var(--ui-radius-md)]',
        'lg' => 'px-4 py-3 text-base rounded-[var(--ui-radius-lg)]',
        default => 'px-3 py-2 text-sm rounded-[var(--ui-radius-md)]',
    };

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'flex',
        'w-full',
        'border',
        'bg-[oklch(var(--ui-background))]',
        'transition-colors',
        'duration-[var(--ui-duration-normal)]',
        'ease-[var(--ui-ease-default)]',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-offset-2',
        'focus:ring-offset-[oklch(var(--ui-background))]',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
        'read-only:bg-[oklch(var(--ui-muted)/0.5)]',
        'read-only:focus:ring-0',
    ]);

    // ── Auto-resize class ────────────────────────────────────────────
    $resizeClass = $autoResize ? 'resize-none overflow-hidden' : 'resize-y';

    $classes = trim("{$baseClasses} {$variantClasses} {$sizeClasses} {$resizeClass}");

    // ── Determine the initial value ──────────────────────────────────
    $textValue = $value ?? ($slot->isNotEmpty() ? $slot->toHtml() : null);
@endphp

<div
    @if($autoResize || $showCount)
        x-data="{
            value: @js($textValue ?? ''),
            maxlength: @js($maxlength ? (int) $maxlength : null),
            resize() {
                if (!@js((bool) $autoResize)) return;
                let el = this.$refs.textarea;
                el.style.height = 'auto';
                el.style.height = el.scrollHeight + 'px';
            },
            get count() {
                return this.value.length;
            },
            get remaining() {
                return this.maxlength !== null ? this.maxlength - this.value.length : null;
            }
        }"
        x-init="$nextTick(() => resize())"
    @endif
    class="w-full"
    data-ui-textarea-wrapper
>
    <textarea
        @if($autoResize || $showCount)
            x-ref="textarea"
            x-model="value"
            x-on:input="resize()"
        @endif
        @if($name) name="{{ $name }}" @endif
        @if($placeholder) placeholder="{{ $placeholder }}" @endif
        @if($maxlength) maxlength="{{ $maxlength }}" @endif
        @if($disabled) disabled @endif
        @if($readonly) readonly @endif
        rows="{{ $rows }}"
        {{ $attributes->class([$classes]) }}
        data-ui-textarea
        data-ui-textarea-variant="{{ $variant }}"
    >{{ $textValue }}</textarea>

    {{-- Character count --}}
    @if($showCount)
        <div class="mt-1.5 flex justify-end">
            <span
                class="text-xs text-[oklch(var(--ui-muted-foreground))]"
                x-text="maxlength !== null
                    ? count + ' / ' + maxlength
                    : count + ' characters'"
                x-bind:class="remaining !== null && remaining < 0 ? 'text-[oklch(var(--ui-destructive))]' : ''"
            ></span>
        </div>
    @endif
</div>
