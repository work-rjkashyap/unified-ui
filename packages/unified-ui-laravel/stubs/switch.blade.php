{{--
    Unified UI — Switch Component
    https://unified-ui.space

    An accessible toggle switch built with Alpine.js for boolean on/off
    controls. Visually distinct from the toggle component — a switch
    represents a binary setting (on/off, enabled/disabled) with a
    sliding thumb indicator.

    Usage:
        {{-- Basic switch --}}
        <x-ui-switch name="dark_mode" label="Dark Mode" />

        {{-- Checked by default --}}
        <x-ui-switch name="notifications" label="Enable notifications" :checked="true" />

        {{-- With description --}}
        <x-ui-switch
            name="marketing"
            label="Marketing emails"
            description="Receive occasional promotional content and product updates."
        />

        {{-- Different sizes --}}
        <x-ui-switch name="sm" label="Small" size="sm" />
        <x-ui-switch name="md" label="Medium" size="md" />
        <x-ui-switch name="lg" label="Large" size="lg" />

        {{-- Variant colors --}}
        <x-ui-switch name="primary" label="Primary" variant="primary" :checked="true" />
        <x-ui-switch name="success" label="Success" variant="success" :checked="true" />
        <x-ui-switch name="warning" label="Warning" variant="warning" :checked="true" />
        <x-ui-switch name="destructive" label="Danger" variant="destructive" :checked="true" />

        {{-- Disabled --}}
        <x-ui-switch name="locked" label="Cannot toggle" disabled />
        <x-ui-switch name="locked_on" label="Locked on" :checked="true" disabled />

        {{-- Without label (provide aria-label) --}}
        <x-ui-switch name="toggle" aria-label="Toggle feature" />

        {{-- With icon inside the thumb --}}
        <x-ui-switch name="theme" label="Dark theme" icon />

        {{-- Label on the left side --}}
        <x-ui-switch name="setting" label="Enable feature" label-position="left" />

        {{-- With error message --}}
        <x-ui-switch name="agree" label="I agree to the terms" error="You must accept the terms." />

        {{-- Required --}}
        <x-ui-switch name="consent" label="I consent to data processing" required />

        {{-- With custom on/off labels --}}
        <x-ui-switch name="status" label="Status" on-label="Active" off-label="Inactive" />

        {{-- Controlled via external Alpine state --}}
        <div x-data="{ enabled: false }">
            <x-ui-switch name="feature" label="Feature flag" x-model="enabled" />
            <p x-text="enabled ? 'On' : 'Off'"></p>
        </div>

        {{-- Inside a form group --}}
        <x-ui-form-group label="Preferences" name="prefs">
            <x-ui-switch name="email_notifications" label="Email notifications" />
            <x-ui-switch name="sms_notifications" label="SMS notifications" />
            <x-ui-switch name="push_notifications" label="Push notifications" />
        </x-ui-form-group>

    Props:
        name          — form field name attribute
        id            — optional element id (defaults to name)
        label         — optional label text displayed next to the switch
        description   — optional description text below the label
        checked       — boolean, initial checked/on state (default: false)
        disabled      — boolean (default: false)
        required      — boolean (default: false)
        size          — sm|md|lg (default: md)
        variant       — default|primary|success|warning|destructive (default: default)
        icon          — boolean, show sun/moon icons in the thumb (default: false)
        labelPosition — left|right (default: right) — position of the label relative to the switch
        error         — optional error message string
        value         — the value submitted when the switch is on (default: "1")
        onLabel       — optional text label for the "on" state
        offLabel      — optional text label for the "off" state
--}}

@props([
    'name' => null,
    'id' => null,
    'label' => null,
    'description' => null,
    'checked' => false,
    'disabled' => false,
    'required' => false,
    'size' => 'md',
    'variant' => 'default',
    'icon' => false,
    'labelPosition' => 'right',
    'error' => null,
    'value' => '1',
    'onLabel' => null,
    'offLabel' => null,
])

@php
    $inputId = $id ?? ($name ? 'switch-' . $name : 'switch-' . \Illuminate\Support\Str::random(6));
    $hasError = !empty($error);
    $isDisabled = (bool) $disabled;

    // ── Variant accent color ─────────────────────────────────────────
    $accentColor = match ($variant) {
        'success'     => '--ui-success',
        'warning'     => '--ui-warning',
        'destructive' => '--ui-destructive',
        'primary'     => '--ui-primary',
        default       => '--ui-primary',
    };

    // ── Size: track dimensions ───────────────────────────────────────
    $trackClasses = match ($size) {
        'sm' => 'h-4 w-7',
        'md' => 'h-5 w-9',
        'lg' => 'h-6 w-11',
        default => 'h-5 w-9',
    };

    // ── Size: thumb dimensions ───────────────────────────────────────
    $thumbClasses = match ($size) {
        'sm' => 'h-3 w-3',
        'md' => 'h-4 w-4',
        'lg' => 'h-5 w-5',
        default => 'h-4 w-4',
    };

    // ── Size: thumb translate when checked ────────────────────────────
    $thumbTranslateClasses = match ($size) {
        'sm' => 'translate-x-3',
        'md' => 'translate-x-4',
        'lg' => 'translate-x-5',
        default => 'translate-x-4',
    };

    // ── Size: icon inside thumb ──────────────────────────────────────
    $iconSizeClasses = match ($size) {
        'sm' => 'h-2 w-2',
        'md' => 'h-2.5 w-2.5',
        'lg' => 'h-3 w-3',
        default => 'h-2.5 w-2.5',
    };

    // ── Size: label and description text ─────────────────────────────
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

    // ── On/Off label size classes ────────────────────────────────────
    $statusLabelSizeClasses = match ($size) {
        'sm' => 'text-[10px]',
        'md' => 'text-xs',
        'lg' => 'text-sm',
        default => 'text-xs',
    };

    // ── Error size classes ───────────────────────────────────────────
    $errorSizeClasses = match ($size) {
        'sm' => 'text-[10px]',
        'md' => 'text-xs',
        'lg' => 'text-sm',
        default => 'text-xs',
    };

    // ── Track base classes ───────────────────────────────────────────
    $trackBaseClasses = implode(' ', [
        'relative',
        'inline-flex',
        'shrink-0',
        'cursor-pointer',
        'rounded-full',
        'border-2',
        'border-transparent',
        'transition-colors',
        'duration-[var(--ui-duration-normal)]',
        'ease-[var(--ui-ease-default)]',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        "focus-visible:ring-[oklch(var({$accentColor})/0.4)]",
        'focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[oklch(var(--ui-background))]',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
        $trackClasses,
    ]);

    // ── Thumb base classes ───────────────────────────────────────────
    $thumbBaseClasses = implode(' ', [
        'pointer-events-none',
        'inline-flex',
        'items-center',
        'justify-center',
        'rounded-full',
        'bg-[oklch(var(--ui-background))]',
        'shadow-lg',
        'ring-0',
        'transition-transform',
        'duration-[var(--ui-duration-normal)]',
        'ease-[var(--ui-ease-default)]',
        $thumbClasses,
    ]);
@endphp

<div
    x-data="{
        on: @js((bool) $checked),
        disabled: @js($isDisabled),
        toggle() {
            if (this.disabled) return;
            this.on = !this.on;
        }
    }"
    {{ $attributes->only('class')->class([
        'flex',
        $labelPosition === 'left' ? 'flex-row-reverse' : 'flex-row',
        'items-start',
        $label || $description ? 'gap-3' : '',
        $isDisabled ? 'opacity-60 cursor-not-allowed' : '',
    ]) }}
    data-ui-switch
    data-ui-switch-variant="{{ $variant }}"
>
    {{-- Hidden form input --}}
    @if($name)
        {{-- Unchecked value (ensures a value is always submitted) --}}
        <input type="hidden" name="{{ $name }}" value="" x-bind:disabled="on" />
        <input
            type="checkbox"
            name="{{ $name }}"
            value="{{ $value }}"
            id="{{ $inputId }}"
            class="sr-only"
            x-model="on"
            @if($isDisabled) disabled @endif
            @if($required) required @endif
            @if($hasError) aria-invalid="true" aria-describedby="{{ $inputId }}-error" @endif
            tabindex="-1"
        />
    @endif

    {{-- Switch track --}}
    <button
        type="button"
        role="switch"
        x-bind:aria-checked="on.toString()"
        x-on:click="toggle()"
        x-on:keydown.enter.prevent="toggle()"
        x-on:keydown.space.prevent="toggle()"
        x-bind:class="on
            ? 'bg-[oklch(var({{ $accentColor }}))]'
            : 'bg-[oklch(var(--ui-muted-foreground)/0.3)]'"
        @if($isDisabled) disabled aria-disabled="true" @endif
        @if($label) aria-labelledby="{{ $inputId }}-label" @endif
        class="{{ $trackBaseClasses }}"
        data-ui-switch-track
    >
        <span class="sr-only">
            @if($label)
                {{ $label }}
            @else
                Toggle
            @endif
        </span>

        {{-- Thumb --}}
        <span
            aria-hidden="true"
            class="{{ $thumbBaseClasses }}"
            x-bind:class="on ? '{{ $thumbTranslateClasses }}' : 'translate-x-0'"
        >
            @if($icon)
                {{-- Off state icon (e.g. moon / X) --}}
                <svg
                    x-show="!on"
                    class="{{ $iconSizeClasses }} text-[oklch(var(--ui-muted-foreground))]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>

                {{-- On state icon (e.g. sun / check) --}}
                <svg
                    x-show="on"
                    x-cloak
                    class="{{ $iconSizeClasses }} text-[oklch(var({{ $accentColor }}))]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            @endif
        </span>
    </button>

    {{-- Label, description, on/off label, and error --}}
    @if($label || $description || $onLabel || $offLabel || $hasError)
        <div class="flex flex-col gap-0.5 select-none {{ $isDisabled ? 'pointer-events-none' : '' }}">
            @if($label)
                <label
                    id="{{ $inputId }}-label"
                    for="{{ $inputId }}"
                    class="{{ $labelSizeClasses }} font-medium leading-tight text-[oklch(var(--ui-foreground))] {{ $isDisabled ? 'cursor-not-allowed' : 'cursor-pointer' }}"
                    x-on:click="toggle()"
                    data-ui-switch-label
                >
                    {{ $label }}
                    @if($required)
                        <span class="text-[oklch(var(--ui-destructive))] ml-0.5" aria-hidden="true">*</span>
                        <span class="sr-only">(required)</span>
                    @endif
                </label>
            @endif

            @if($description)
                <p class="{{ $descriptionSizeClasses }} leading-normal text-[oklch(var(--ui-muted-foreground))]">
                    {{ $description }}
                </p>
            @endif

            @if($onLabel || $offLabel)
                <p class="{{ $statusLabelSizeClasses }} leading-normal text-[oklch(var(--ui-muted-foreground))] tabular-nums">
                    <span x-show="on" x-cloak>{{ $onLabel ?? 'On' }}</span>
                    <span x-show="!on">{{ $offLabel ?? 'Off' }}</span>
                </p>
            @endif

            @if($hasError)
                <p
                    id="{{ $inputId }}-error"
                    class="{{ $errorSizeClasses }} text-[oklch(var(--ui-destructive))] leading-normal mt-0.5"
                    role="alert"
                >
                    <svg
                        class="inline-block shrink-0 h-3.5 w-3.5 mr-0.5 -mt-0.5"
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
                    {{ $error }}
                </p>
            @endif
        </div>
    @endif
</div>
